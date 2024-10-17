export default {
	show_new_fields: false,
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

	verifyoldpassword: async () => {
		this.alert = null;

		// Check if old password matches the stored password hash
		if (this.verifyHash(inp_old_pass.text.trim(), appsmith.store.user.password_hash)) {
			this.show_new_fields = true;
			return this.show_new_fields;
		} else {
			this.alert = "Wrong Password!";
			return this.alert;
		}
	},

	changepassword: async () => {
		const newPass = inp_new_pass.text.trim();
		const confirmPass = inp_confirm_pass.text.trim();

		// Check if new password is empty
		if (!newPass) {
			this.alert = "New password must not be empty.";
			return this.alert;
		}

		// Check if new password and confirm password match
		if (newPass !== confirmPass) {
			this.alert = "Passwords do not match.";
			return this.alert;
		}

		// Update the password
		await updatePassword.run();
		showModal(SuccessfulModel.name); // Make sure `showModal` is defined elsewhere in your app
	}
}
