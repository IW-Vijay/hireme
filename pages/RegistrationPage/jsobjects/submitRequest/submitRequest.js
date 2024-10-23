export default {
	alert : null,
	alert_name : null,
	alert_mail : null,
	alert_pass : null,
	
	removeAlerts: (alert_name) => {
		if (alert_name === 'alert') {
			this.alert = null;
		} else if (alert_name === 'alert_name') {
			this.alert_name = null;
		} else if (alert_name === 'alert_mail') {
			this.alert_mail = null;
		}
		else if (alert_name === 'alert_pass') {
			this.alert_pass = null;
		}
		return this[alert_name];
	},
	htmlencoding(text = "Admin@123") {
		const encoded_string = encodeURIComponent(text);
		return encoded_string;
	},
	
	async addUser() {
		const name = inp_name.text.trim();
		const email = inp_email.text.trim();
		const password = inp_password.text;
		const confirmPassword = inp_confirmpassword.text;
		let membership_id;
		//const inp_membership_id = inp_membershipid.text.trim();

		// Validate inputs
		if (!name) {
			this.alert_name = "Name; must not be empty.";
			return this.alert_name;
		}
		if (!email) {
			this.alert_mail = "Email must not be empty.";
			return this.alert_mail;
		}
		if ( !password) {
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
				return 	this.alert_pass;
		}
		
		
		await fetch_user.run();
		const user = fetch_user.data;
		console.log(user);

		// If user exists (check based on how your backend returns data)
		if (user.length > 0) {
				this.alert = "User with this email already exists, please try logging in.";
				return 	this.alert;
		}
		

		/*let membership_id = null;

		if (inp_membership_id) {
			await fetch_membership_id.run();
			membership_id = fetch_membership_id.data[0].membership_id;

			if (!membership_id) {
				showAlert("This Community ID does not exist, please try again.");
				return;
			}
		}*/
		try {
			// Try to create the user
			//showAlert(membership_id);
			//await create_user_for_approval.run({membership_id});
			await create_membership.run();
			membership_id = create_membership.data[0].membership_id;
			//storeValue("mem" , membership_id);
			showAlert(membership_id);
			//delete_membership.run({membership_id})
			//return;
			//const about = inp_about.text.replace()(/'/g, "''");
			
		} catch (error) {
					this.alert_mail = "Membership for this email already exists.";
					return this.alert_mail;
		}
		try {
			await create_user_for_approval.run({membership_id});

			// If successful, show the modal
			showModal(RegisteredModel.name);
			
			send_activation_link.run();
			
		} catch (error) {
			delete_membership.run({membership_id})
			this.alert = "Unable to register.";
			return this.alert;
		}
	}
}
