export default {
	modifyUser : async () => {
		try {
			// Run update user details
			await updateUserDetails.run();

			// Get user_id from query parameters
			const user_id = getUserJSObject.userData.data.user[0].user_id;

			const educations = educationWidget.model.educations || [];
			const experiences = experienceWidget.model.experiences || [];

			// Add education details
			if (educations.length > 0) {
				const educationPromises = educations.map((education) => {
					const { school, degree, specialization,dateStarted: startdate, dateEnded: enddate, marks } = education;

					// Add education to database
					return addEducation.run({ user_id, school, degree, specialization, startdate, enddate, marks })
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

					// Add experience to database
					return addExperience.run({ user_id, organization, role, startdate, enddate, skills, type })
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
