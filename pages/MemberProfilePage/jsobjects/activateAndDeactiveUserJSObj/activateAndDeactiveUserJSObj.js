export default {
	async activateordeactivate () {
		if(userDataJSObject.user.data.user.isdisabled !== 1) {
			await activateDeactivateUser.run();
			navigateTo("MembershipPage");
			return;
		}
		else {
			await fetchNumberOfMembers.run();
				if (fetchNumberOfMembers.data[0].count >= 4){
				showAlert("Will exceed 4 members limit per membership");
				return;
			}
			else {
			await activateDeactivateUser.run();
			navigateTo("MembershipPage");
		}
		}
	}
}