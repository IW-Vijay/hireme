export default {
	createHash: (password) => {
		return dcodeIO.bcrypt.hashSync(password, 10);
	},
	verifyHash: (password, hash) => {
		return dcodeIO.bcrypt.compareSync(password, hash)
	},
	signin: (user, password) => {
    if (user) {
				storeValue("user" , user);
        if (user.status === 'approved' && this.verifyHash(password, user.password_hash)) {
            navigateTo('PARegistrationPageReimagine');
        }
        else if (user.status === 'appuser' && this.verifyHash(password, user.password_hash)) {
            navigateTo('HomePage');
        }else if (user.status === 'pending' && this.verifyHash(password, user.password_hash)) {
            showAlert('Your registration is not approved, try again later', 'error');
        }
        else {
            showAlert('Wrong Password', 'error');
        }
    }
    else {
        showAlert('No user with this Email, Please register', 'error');
    }
}
}