export default {
	modifyUser : () => {
		updateUserDetails.run()
			.then(() => {

			// Get user_id from query parameters
			const user_id = appsmith.URL.queryParams.user_id;

			const ed_len = educationWidget.model.educations.length;

			const ex_len = experienceWidget.model.experiences.length;

			// Ensure educations is an array and not undefined
			if (ed_len > 0) {
				for (let i = 0; i < ed_len; i++) {
					const education = educationWidget.model.educations[i];
					const school = education.school
					const specialization = education.specialization
					const startdate = education.dateStarted
					const enddate = education.dateEnded
					const marks =education.marks
					addEducation.run({user_id, school, specialization, startdate,enddate, marks}
					).then(() => {
						console.log("Education added:", education);
					}).catch((err) => {
						console.error("Error adding education:", err);
					});
				}
			} else {
				console.log("No educations to add or invalid format.");
			}

			// Ensure experiences is an array and not undefined
			if (ex_len > 0) {
				console.log("Adding experiences...");
				for (let i = 0; i < ex_len; i++) {
					const experience = experienceWidget.model.experiences[i];
					const organization = experience.organisation 
					const role = experience.role
					const startdate = experience.startDate
					const enddate = experience.endDate
					const skills = experience.skills
					console.log("Adding experience:", experience);
					addExperience.run({user_id, organization, role, startdate, enddate, skills}
					).then(() => {
						console.log("Experience added:", experience);
					}).catch((err) => {
						console.error("Error adding experience:", err);
					});
				}
			} else {
				console.log("No experiences to add or invalid format.");
			}
		})
			.catch((err) => {
			console.error("Error updating user details:", err);
		});
	}
}