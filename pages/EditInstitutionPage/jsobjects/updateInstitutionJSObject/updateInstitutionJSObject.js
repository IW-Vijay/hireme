export default {
	alert_name : null,
	
	removeAlerts: () => {
		this.alert_name = null;
	},
	async updateInstitution () {
		removeValue('alert_name');
		if(!inp_name.text){
			this.alert_name = "Institution name must not be empty";
			return this.alert_name;
		}
		await updateInstitution.run();
		if(updateInstitution.data){
			navigateTo("InstitutionPage", {
  "institution": JSON.stringify(updateInstitution.data[0])
});
		}else {
				this.alert_name = "Error while updating institute, please check all the fields";
				return this.alert_name;
			}
	}
}