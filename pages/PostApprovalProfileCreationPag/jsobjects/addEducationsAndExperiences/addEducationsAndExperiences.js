export default {
	modifyUser: async () => {
		try {
			// Step 1: Update user details
			await updateUserDetails.run();

			// Step 2: Get user_id from store and fetch existing institutions and organizations
			const user_id = appsmith.store.user.profile_id;
			const institutions = getInstisAndOrgsJSObject.instiAndOrgData.data[0].institutions;
			const organisations = getInstisAndOrgsJSObject.instiAndOrgData.data[1].organizations;

			// Step 4: Handle adding educations
			const educations = educationWidget?.model?.educations || [];

			if (educations.length > 0) {
				for (const education of educations) {
					let { institution_id, institution_name , degree, specialization, start_date, end_date, marks } = education;



					if (!institution_id) {
						let institution = institutions.find(inst => inst.name.trim() === institution_name.trim());
						institution_id = institution?.institution_id;
						// Add new institution and fetch the new institution ID
						if (!institution_id) {
							await addInstitution.run({institution_name});
							await fetchNewInstitution.run({institution_name});
							institution_id = fetchNewInstitution.data[0]?.institution_id;
						}

						if (!institution_id) {
							throw new Error(`Failed to fetch new institution ID for school: ${institution_name}`);
						}
					}

					// Add education record for the user
					await addEducation.run({
						user_id, 
						institution_id,
						degree,
						specialization, 
						start_date, 
						end_date, 
						marks
					});
					console.log("Education added:", education);
				}
			} else {
				console.log("No educations to add.");
			}

			// Step 5: Handle adding experiences
			const experiences = experienceWidget?.model?.workexs || [];

			if (experiences.length > 0) {
				for (const experience of experiences) {
					let { organization_id, organization_name, position, start_date, end_date, skills, type } = experience;

					// Check if the organization exists


					if (!organization_id) {
						let organisation = organisations.find(org => org.name === organization_name);
						organization_id = organisation?.organization_id;
						// Add new organization and fetch the new organization ID
						if (!organization_id) {
							await addOrganization.run({ organization_name });
							await fetchNewOrganization.run({ organization_name });
							organization_id = fetchNewOrganization.data[0]?.organization_id;
						}

						if (!organization_id) {
							throw new Error(`Failed to fetch new organization ID for organization: ${organization_name}`);
						}
					}

					// Add experience record for the user
					await addExperience.run({
						user_id, 
						organization_id, 
						position, 
						start_date, 
						end_date, 
						skills,
						type
					});
					console.log("Experience added:", experience);
				}
			} else {
				console.log("No experiences to add.");
			}

			// Step 6: Fetch updated user data and store it
			await fetchUpdatedUser.run();
			await storeValue("user", fetchUpdatedUser.data[0]);

			// Step 7: Navigate to profile page
			await navigateTo('Homepage');

		} catch (err) {
			console.error("Error during user modification:", err);
		}
	}
}
