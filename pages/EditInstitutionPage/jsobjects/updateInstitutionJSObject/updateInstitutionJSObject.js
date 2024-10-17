export default {
	async updateInstitution () {
		removeValue('alert_name');
		if(!inp_name.text){
			storeValue("alert_name" , "Institution name must not be empty");
			return;
		}
		await updateInstitution.run();
		if(updateInstitution.data){
			navigateTo("InstitutionPage", {
  "institution": JSON.stringify(updateInstitution.data[0])
});
		}else {
				storeValue("alert_name" , "Error while updating institute, please check all the fields");
				return;
			}
	}
}