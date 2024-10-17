export default {
	alert : null,
	alert_name : null,
	alert_mail : null,
	alert_pass : null,
	
	removeAlerts: (alert_name) => {
		if (alert_name === 'alert') {
			this.alert = null;
		} else if (alert_name === 'alert_mail') {
			this.alert_mail = null;
		} else if (alert_name === 'alert_pass') {
			this.alert_pass = null;
		} else if (alert_name === 'alert_name') {
			this.alert_name = null;
		}
		return this[alert_name];
	},
	async addUser()  {
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
			this.alert_name = "Name must not be empty.";
			return this.alert_name;
		}
		if (!email) {
			this.alert_mail = "Email must not be empty.";
			return this.alert_mai;
		}
		if (!password) {
			this.alert_pass = "Password must not be empty.";
			return this.alert_pass;
		}else {
			const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;

			if (!passwordRegex.test(password)) {
					this.alert_pass = "Password must be at least 8 characters long and include at least 1 uppercase letter, 1 lowercase letter, 1 number, and 1 special character.";
					return this.alert_pass;
			}
		}

		if (password !== confirmPassword) {
			this.alert_pass = "Passwords do not match.";
			return this.alert_pass;
		}

		try {
			await add_member.run();
			navigateTo('MembershipPage');

		} catch (error) {
		 	this.alert = "Member might already have an account, please try logging in.";
			return this.alert;
		}
	}
}
