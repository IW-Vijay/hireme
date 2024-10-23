export default {
	alert: null,

	createHash: (password) => {
		dcodeIO.bcrypt.setRandomFallback((len) => {
			const randomBytes = [];
			for (let i = 0; i < len; i++) {
				randomBytes.push(Math.floor(Math.random() * 256));
			}
			return randomBytes;
		});
		return dcodeIO.bcrypt.hashSync(password, 10);
	},

	verifyHash: (password, hash) => {
		return dcodeIO.bcrypt.compareSync(password, hash);
	},

	removeAlerts: () => {
			this.alert = null;
	},

	changepassword: async () => {
		const newPass = inp_password.text.trim();
		const confirmPass = inp_confirmpassword.text.trim();
		await getUser.run();
		const user = getUser.data[0];
		if(!user){
			this.alert = "User with this email does not exist. Please check you email.";
			return this.alert;
		}
		storeValue("user" , user);

		// Check if new password is empty
		if (!newPass) {
			this.alert = "New password must not be empty.";
			return this.alert;
		}else {
			const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;

			if (!passwordRegex.test(newPass)) {
					this.alert = "Password must be at least 8 characters long and include at least 1 uppercase letter, 1 lowercase letter, 1 number, and 1 special character.";
					return this.alert;
			}
		}

		// Check if new password and confirm password match
		if (newPass !== confirmPass) {
			this.alert = "Passwords do not match.";
			return this.alert;
		}

		// Update the password
		await updatePassword.run();
		navigateTo("LandingPage")
	}
}
