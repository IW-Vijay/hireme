export default {
	async educations() {
		await fetchEducation.run();
		let educationList = fetchEducation.data;

		// Loop through the workex list and replace organization_id with the fetched name
		let educationWithNames = await Promise.all(educationList.map(async (education) => {
			await fetchInstitutionName.run({ "institution_id": education.institution_id });
			showAlert(education.organization_id);

			// Replace organization_id with organization name
			return {
				...education,
				institution_name: fetchInstitutionName.data[0]?.name || 'Unknown',
				isschool : fetchInstitutionName.data[0]?.isschool || false,
				institution : fetchInstitutionName.data
			};
		}));

		return { "education": educationWithNames };
	},
	async workexs() {
		await fetchWorkex.run();
		let workexList = fetchWorkex.data;

		// Loop through the workex list and replace organization_id with the fetched name
		let workexWithNames = await Promise.all(workexList.map(async (workex) => {
			await fetchOrganizationName.run({ "organization_id": workex.organization_id });
			showAlert(workex.organization_id);

			// Replace organization_id with organization name
			return {
				...workex,
				organization_name: fetchOrganizationName.data[0]?.name || 'Unknown',
				institution_id : fetchOrganizationName.data[0]?.institution_id,
				organization :  fetchOrganizationName.data
			};
		}));

		return { "workex": workexWithNames };
	}
}
