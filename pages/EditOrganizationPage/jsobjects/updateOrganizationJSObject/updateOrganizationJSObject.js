export default {
	async updateOrganization () {
		removeValue('alert_name');
		if(!inp_name.text){
			storeValue("alert_name" , "Organization name must not be empty.");
			return;
		}
		await updateOrganization.run();
		if(updateOrganization.data){
			navigateTo("OrganizationPage", {
  "organization": JSON.stringify(updateOrganization.data[0])
});
		}else {
				storeValue("alert_name" , "Error while updating organization, please check all the fields.");
				return;
			}
	}
}