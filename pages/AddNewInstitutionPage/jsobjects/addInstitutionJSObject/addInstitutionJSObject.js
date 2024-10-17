export default {
	async addInstitution () {
		removeValue('alert_name');
		if(!inp_name.text){
			storeValue("alert_name" , "Institution name must not be empty");
			return;
		}
		await addInstitution.run();
		if(addInstitution.data){
			navigateTo("EditOrganizationPage", {
  "organization": appsmith.URL.queryParams.organization,
  "institution": addInstitution.data[0].institution_id
});
		}else {
				storeValue("alert_name" , "Error while adding institute, please check all the fields");
				return;
			}
	}
}