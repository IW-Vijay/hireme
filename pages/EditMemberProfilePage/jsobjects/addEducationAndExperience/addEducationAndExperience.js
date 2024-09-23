export default {
	modifyUser: async () => {
		try {
			let membership_id = getUserJSObject.userData.data.user.membership_id? getUserJSObject.userData.data.user.membership_id : '';
			 if (inp_comid.text !== "") {
				 let membership_details = fetchMembershipDetails.data;
				  if (!membership_details || membership_details.length === 0) {
							// Create a new membership and wait for the result
							await createNewMembership.run();

							// Ensure that createNewMembership has completed and data is available
							membership_id = createNewMembership.data[0].membership_id;
						 }
				 	else {
						membership_id = membership_details[0].membership_id;
					}
			 	}
			// Step 1: Update user details
			await updateUserDetails.run({membership_id});

			// Step 2: Get user_id from store and fetch existing institutions and organizations
			const user_id = getUserJSObject.userData.data.user.profile_id;
			const institutions = getEducationsJSObject.educationData.data.institutions;
			const organisations = getWorkexsJSObject.workexData.data.organizations;

			// Step 3: Delete existing educations and experiences
			await deleteEducations.run();
			await deleteWorkexs.run();

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
							//await fetchNewInstitution.run({institution_name});
							institution_id = addInstitution.data[0]?.institution_id;
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
							//await fetchNewOrganization.run({ organization_name });
							organization_id = addOrganization.data[0]?.organization_id;
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

			// Step 7: Navigate to profile page
			await navigateTo('AllMembersPage');

		} catch (err) {
			console.error("Error during user modification:", err);
		}
	}
}


