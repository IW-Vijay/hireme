export default {
	async educations() {
		// Ensure that the fetchEducation.run() is awaited
		await fetchEducation.run();
		let educationList = fetchEducation.data;

		// Check if educationList is defined and is an array
		if (!educationList || !Array.isArray(educationList)) {
			showAlert('No education data found or invalid data format');
			return { "education": [] }; // Return an empty array if the data is undefined or not an array
		}

		// Loop through the education list and replace institution_id with the fetched name
		let educationWithNames = await Promise.all(educationList.map(async (education) => {
			await fetchInstitutionName.run({ "institution_id": education.institution_id });
			showAlert(education.institution_id);

			// Replace institution_id with institution name
			return {
				...education,
				institution_name: fetchInstitutionName.data[0]?.name || 'Unknown'
			};
		}));

		return { "education": educationWithNames };
	},

	async workexs() {
		await fetchWorkex.run();
		let workexList = fetchWorkex.data;

		if (!workexList || !Array.isArray(workexList)) {
			showAlert('No work experience data found or invalid data format');
			return { "workex": [] };
		}

		// Loop through the workex list and replace organization_id with the fetched name
		let workexWithNames = await Promise.all(workexList.map(async (workex) => {
			await fetchOrganizationName.run({ "organization_id": workex.organization_id });
			showAlert(workex.organization_id);

			// Replace organization_id with organization name
			return {
				...workex,
				organization_name: fetchOrganizationName.data[0]?.name || 'Unknown'
			};
		}));

		return { "workex": workexWithNames };
	}
}
