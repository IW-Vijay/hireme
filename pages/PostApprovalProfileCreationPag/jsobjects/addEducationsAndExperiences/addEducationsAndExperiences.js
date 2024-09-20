export default {
	modifyUser : async () => {
		try {
			// Run update user details
			await updateUserDetails.run();

			// Get user_id from query parameters
			const user_id = getUserJSObject.userData.data.user[0].profile_id;

			const educations = educationWidget.model.educations || [];
			const experiences = experienceWidget.model.experiences || [];
			
			const institutions = getInstisAndOrgsJSObject.instiAndOrgData.data[0].institutions;
			const organisations = getInstisAndOrgsJSObject.instiAndOrgData.data[1].organizations;
			
			let max_institution_id = 1;
			if(institutions) {
				max_institution_id = institutions.reduce((maxId, institution) => 
    Math.max(maxId, institution.institution_id), 1);
			}
			
			let max_organization_id = 1;
			if(organisations) {
				max_organization_id = organisations.reduce((maxId, organization) => 
    Math.max(maxId, organization.organization_id), 1);
			}
			

			// Add education details
			if (educations.length > 0) {
				const educationPromises = educations.map((education) => {
					const { school, degree, specialization,dateStarted: startdate, dateEnded: enddate, marks } = education;
					const institution = institutions.find(inst => inst.name === school);
    			let institution_id = institution?.institution_id;
					if(!institution_id){
						institution_id = max_institution_id +1;
						showAlert(institution_id);
						addInstitution.run({institution_id,school});
					}

					return addEducation.run({ user_id, institution_id, degree, specialization, startdate, enddate, marks })
						.then(() => console.log("Education added:", education))
						.catch((err) => console.error("Error adding education:", err));
				});
				await Promise.all(educationPromises); // Wait for all education entries to be added
			} else {
				console.log("No educations to add or invalid format.");
			}

			// Add experience details
			if (experiences.length > 0) {
				console.log("Adding experiences...");
				const experiencePromises = experiences.map((experience) => {
					const { organisation: organization, role, startDate: startdate, endDate: enddate, skills, type } = experience;
					const organisation = organisations.find(inst => inst.name === organization);
    			let organization_id = organisation?.organization_id;
					
					if(!organization_id){
						organization_id =max_organization_id +1;
						addOrganization.run({organization_id ,organization});
					}

					// Add experience to database
					return addExperience.run({ user_id, organization_id, role, startdate, enddate, skills, type })
						.then(() => console.log("Experience added:", experience))
						.catch((err) => console.error("Error adding experience:", err));
				});
				await Promise.all(experiencePromises); // Wait for all experience entries to be added
			} else {
				console.log("No experiences to add or invalid format.");
			}
			
			// Step 6: Fetch updated user data
      await fetchUpdatedUser.run();
      storeValue("user", fetchUpdatedUser.data[0]);
			// After adding educations and experiences, navigate to HomePage
			navigateTo('HomePage');

		} catch (err) {
			console.error("Error updating user details:", err);
		}
	}
}
