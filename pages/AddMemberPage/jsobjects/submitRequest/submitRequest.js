export default {
	async addUser() {
		removeValue('alert');
		removeValue('alert_name');
		removeValue('alert_mail');
		removeValue('alert_pass');
		const name = inp_name.text.trim();
		const email = inp_email.text.trim();
		const password = inp_password.text;
		const confirmPassword = inp_confirmpassword.text;
		//const community_id = inp_comid.text.trim();

		// Validate inputs
		if (!name) {
			storeValue("alert_name" , "Name must not be empty.");
			return;
		}
		if (!email) {
			storeValue("alert_mail" , "Email must not be empty.");
			return;
		}
		if (!password) {
			storeValue("alert_pass" , "Password must not be empty.");
			return;
		}

		if (password !== confirmPassword) {
			storeValue("alert_pass" , "Passwords do not match.");
			return;
		}

		try {
			await add_member.run();
			navigateTo('MembershipPage');

		} catch (error) {
			storeValue("alert" , "Member might already have an account, please try logging in");
		}
	}
}
