export default {
	alert_name : null,
	
	removeAlerts: () => {
		this.alert_name = null;
	},
	async addInstitution () {
		removeValue('alert_name');
		if(!inp_name.text){
			this.alert_name = "Institution name must not be empty";
			return this.alert_name;
		}
		await addInstitution.run();
		if(addInstitution.data){
			navigateTo("EditOrganizationPage", {
  "organization": appsmith.URL.queryParams.organization,
  "institution": addInstitution.data[0].institution_id
});
		}else {
				this.alert_name = "Error while adding institute, please check all the fields";
				return this.alert_name;
			}
	}
}