export default {
  modifyUser: async () => {
    try {
      // Step 1: Update user details
      await updateUserDetails.run();
      
      // Step 2: Get user_id from store
      const user_id = JSON.parse(appsmith.URL.queryParams.member).user_id;
      
      // Step 3: Delete existing educations and experiences
      await deleteEducations.run();
      await deleteWorkexs.run();
			
      
      // Step 4: Handle adding educations
      const educations = educationWidget.model.educations || [];
			
			showAlert("edrupdated");
			showAlert(educations.length);
      if (educations.length > 0) {
        for (const education of educations) {
          const { school, specialization, startdate, enddate, marks } = education;
          await addEducation.run({
            user_id, 
            school, 
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
      const experiences = experienceWidget.model.experiences || [];
      if (experiences.length > 0) {
        for (const experience of experiences) {
          const { organisation: organization, role, startDate: startdate, endDate: enddate, skills } = experience;
          await addExperience.run({
            user_id, 
            organization, 
            role, 
            startdate, 
            enddate, 
            skills
          });
          console.log("Experience added:", experience);
        }
      } else {
        console.log("No experiences to add.");
      }
            
      navigateTo('AllMembersPage', {"selectedmember" : appsmith.URL.queryParams.rownumber});
      
    } catch (err) {
      console.error("Error during user modification:", err);
    }
  }
}