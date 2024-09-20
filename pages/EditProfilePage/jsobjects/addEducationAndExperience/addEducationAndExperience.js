export default {
  modifyUser: async () => {
    try {
      // Step 1: Update user details
      await updateUserDetails.run();
      
      // Step 2: Get user_id from store
      const user_id = appsmith.store.user.profile_id;
			const institutions = getEducationsJSObject.educationData.data.institutions;
			const organisations = getWorkexsJSObject.workexData.data.organizations;
			
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
			
			
      // Step 3: Delete existing educations and experiences
      await deleteEducations.run();
      await deleteWorkexs.run();
      
      // Step 4: Handle adding educations
      const educations = educationWidget?.model?.educations || [];
			
      if (educations.length > 0) {
        for (const education of educations) {
          const { school,degree, specialization, startdate, enddate, marks } = education;
					const institution = institutions.find(inst => inst.name === school);
    			let institution_id = institution.institution_id;
					if(!institution_id){
						addInstitution.run(school);
						institution_id = max_institution_id;
					}
          await addEducation.run({
            user_id, 
						institution_id,
						degree,
            specialization, 
            startdate, 
            enddate, 
            marks
          });
          console.log("Education added:", education);
        }
      } else {
        console.log("No educations to add.");
      }
      
      // Step 5: Handle adding experiences
      const experiences = experienceWidget?.model?.experiences || [];
      if (experiences.length > 0) {
        for (const experience of experiences) {
          const { organisation: organization, role, startDate: startdate, endDate: enddate, skills, type } = experience;
					const organisation = organisations.find(inst => inst.name === organization);
    			let organization_id = organisation.organization_id;
					if(!organization_id){
						addOrganization.run(organization);
						organization_id =max_organization_id;
					}
          await addExperience.run({
            user_id, 
            organization_id, 
            role, 
            startdate, 
            enddate, 
            skills,
						type
          });
          console.log("Experience added:", experience);
        }
      } else {
        console.log("No experiences to add.");
      }
      
      // Step 6: Fetch updated user data
      await fetchUpdatedUser.run();
      storeValue("user", fetchUpdatedUser.data[0]);
      
      // Step 7: Navigate to profile page
      navigateTo('ProfilePage');
      
    } catch (err) {
      console.error("Error during user modification:", err);
    }
  }
}
