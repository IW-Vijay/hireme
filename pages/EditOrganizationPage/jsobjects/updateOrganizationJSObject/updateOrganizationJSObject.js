export default {
	alert_name : null,
	
	removeAlerts: () => {
		this.alert_name = null;
	},
	async updateOrganization () {
		removeValue('alert_name');
		if(!inp_name.text){
			this.alert_name = "Organization name must not be empty.";
			return this.alert_name;
		}
		await updateOrganization.run();
		if(updateOrganization.data){
			navigateTo("OrganizationPage", {
  "organization": JSON.stringify(updateOrganization.data[0])
});
		}else {
				this.alert_name = "Error while updating organization, please check all the fields.";
				return this.alert_name;
			}
	}
}