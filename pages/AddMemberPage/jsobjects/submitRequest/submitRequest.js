export default {
	async addUser() {
		const name = inp_name.text.trim();
		const email = inp_email.text.trim();
		const password = inp_password.text;
		const confirmPassword = inp_confirmpassword.text;
		//const community_id = inp_comid.text.trim();

		// Validate inputs
		if (!name || !email || !password) {
			showAlert("Name, email, or password must not be empty.");
			return;
		}

		if (password !== confirmPassword) {
			showAlert("Passwords do not match.");
			return;
		}

		try {
			await add_member.run();
			navigateTo('MembershipPage');

		} catch (error) {
			showAlert(`Member might already have an account, please try loging in`);
		}
	}
}
