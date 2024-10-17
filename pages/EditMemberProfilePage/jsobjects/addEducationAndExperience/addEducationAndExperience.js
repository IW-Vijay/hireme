export default {
	alert : null,
	alert_education : null,
	alert_workex : null,
	removeAlerts: (alert_name) => {
		if (alert_name === 'alert') {
			this.alert = null;
		} else if (alert_name === 'alert_education') {
			this.alert_education = null;
		} else if (alert_name === 'alert_workex') {
			this.alert_workex = null;
		}
		return this[alert_name];
	},
	modifyUser: async () => {
		try {
			removeValue("alert");
			removeValue("alert_education");
			removeValue("alert_workex");
			// Step 1: Update user details
			await updateUserDetails.run();

			// Step 2: Get user_id from store and fetch existing institutions and organizations
			const user_id = getUserJSObject.userData.data.user.profile_id;
			const institutions = getEducationsJSObject.educationData.data.institutions;
			const organisations = getWorkexsJSObject.workexData.data.organizations;



			// Step 4: Handle adding educations
			const educations = educationWidget?.model?.educations || [];
			const experiences = experienceWidget?.model?.workexs || [];

			const hasEmptyInstitution = educations.some((education) => education.institution_name === "");

			if (hasEmptyInstitution) {
				this.alert_education = "One or more education records have an empty institution name.";
				return this.alert_education;
			}

			const hasEmptyOrganization = experiences.some((experience) => experience.organization_name === "");

			if (hasEmptyOrganization) {
				this.alert_workex = "One or more work experience records have an empty organization name.";
				return this.alert_workex;
			}

			// Step 3: Delete existing educations and experiences
			await deleteEducations.run();
			await deleteWorkexs.run();

			if (educations.length > 0) {
				for (const education of educations) {
					let { institution_id, institution_name , degree, specialization, start_date, end_date, marks, isSchool } = education;



					if (!institution_id) {
						let institution = institutions.find(inst => inst.name.trim() === institution_name.trim());
						institution_id = institution?.institution_id;
						// Add new institution and fetch the new institution ID
						if (!institution_id) {
							await addInstitution.run({institution_name, isSchool});
							institution_id = addInstitution.data[0].institution_id;
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


			if (experiences.length > 0) {
				for (const experience of experiences) {
					let { organization_id, organization_name, position, start_date, end_date, skills, type, institution_id, isInstitute, isSchool } = experience;

					// Check if the organization exists


					if (!organization_id) {
						if(!isInstitute){
							let organisation = organisations.find(org => org.name === organization_name);
							organization_id = organisation?.organization_id;
						}
						// Add new organization and fetch the new organization ID
						if (!organization_id) {
							if (isInstitute) {
								let institution = institutions.find(inst => inst.name.trim() === organization_name.trim());
								institution_id = institution?.institution_id;
								// Add new institution and fetch the new institution ID
								if (!institution_id) {
									await addInstitution.run({"institution_name" : organization_name, isSchool});
									institution_id = addInstitution.data[0].institution_id;
									showAlert(institution_id);
								}
							}

							await addOrganization.run({ organization_name, institution_id });
							organization_id = addOrganization.data[0].organization_id;

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
			await navigateTo('MemberProfilePage', {
				"member": JSON.stringify(updateUserDetails.data[0]),
				"rownumber": appsmith.URL.queryParams.rownumber,
				"community_id": appsmith.store.user.community_member_id,
				"role": inp_role.selectedOptionLabel
			});

		} catch (err) {
			this.alert = "Error during update, Please check all the fields.";
			return this.alert;
		}
	}
}
