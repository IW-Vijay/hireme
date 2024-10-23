export default {
	alert : null,
	alert_mail : null,
	alert_pass : null,
	createHash: (password ) => {
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
		return dcodeIO.bcrypt.compareSync(password, hash)
	},
	htmlencoding(text) {
		const encoded_string = encodeURIComponent(text);
		return encoded_string;
	},
	removeAlerts: (alert_name) => {
		if (alert_name === 'alert') {
			this.alert = null;
		} else if (alert_name === 'alert_mail') {
			this.alert_mail = null;
		} else if (alert_name === 'alert_pass') {
			this.alert_pass = null;
		}
		return this[alert_name];
	},
	signin: async () => {
		this.alert = null;
		this.alert_mail = null;
		this.alert_pass = null;
		const email = inp_email.text.trim();
		const password = inp_pass.text;
		if (!email) {
			this.alert_mail = "Email must not be empty.";
			return this.alert_mail;
		}
		if (!password) {
			this.alert_pass= "Password must not be empty.";
			return 	this.alert_pass;
		}
		await getUser.run();
		const user = getUser.data[0]
		if (user) {

			// Wait for the membership status to be fetched before proceeding
			await fetchMembershipStatus.run({ membership_id: user.membership_id });
			
	

			// Fetch status after ensuring fetchMembershipStatus has completed
			const status = fetchMembershipStatus.data[0].status_id;

			user.community_member_id = fetchMembershipStatus.data[0].community_member_id;
			storeValue("user", user);

			// Check if the user is not deleted and the status is approved (status = 2)
			if (user.isdisabled === 0 && status === 2 && this.verifyHash(password, user.password_hash)) {
				navigateTo('LandingPage');
			} 
			// If the user is not deleted but the status is pending approval (status = 1)
			else if (user.isdisabled === 0 && status === 1 && this.verifyHash(password, user.password_hash)) {
				//showAlert('Your registration is not approved yet, try again later.', 'error');
				this.alert =  "Your registration is not approved yet, try again later.";
				return 	this.alert;
			} 
			else if (user.isdisabled === 0 && status === 3 && this.verifyHash(password, user.password_hash)) {
				//showAlert('Your membership has been disabled, please contact memebership owner.', 'error');
				this.alert =   "Your membership has been disabled, please contact membership owner.";
				return 	this.alert;
			} 
			else if (user.isdisabled === 0 && status === 4 && this.verifyHash(password, user.password_hash)) {
				//showAlert('Your membership request has been rejected, please contact admin.', 'error');
				this.alert =  "Your membership request has been rejected, please contact admin.";
				return 	this.alert;
			} 
			else if (user.isdisabled === 1){
				//showAlert('Your account has been removed, please contact membership owner or admin.');
				this.alert =  "Your account has been removed, please contact membership owner or admin.";
				return 	this.alert;
			}
			// If the password is incorrect
			else {
				//showAlert('Wrong Password', 'error');
				this.alert_pass =   "Wrong Password!";
				return 	this.alert;
			}
		} 
		// If no user with the provided email is found
		else {
			//showAlert('No user with this Email, Please register.', 'error');
			this.alert_mail =   "No user with this Email, Please register.";
			return 	this.alert_mail;
		}
	}
}