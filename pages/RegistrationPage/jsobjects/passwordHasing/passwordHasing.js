export default {
	createHash: (password) => {
		return dcodeIO.bcrypt.hashSync(password, 10);
	},
	verifyHash: (password, hash) => {
		return dcodeIO.bcrypt.compareSync(password, hash)
	},
	signin: (user, password) => {
    if (user) {
        // Check if the user's status is 'pending' and the password is correct
        if (user.status === 'approved' && this.verifyHash(password, user.password_hash)) {
            navigateTo('PostApprovalProfileCreationPag', user);
        }
        // Check if the user's status is 'approved' and the password is correct
        else if (user.status === 'appuser' && this.verifyHash(password, user.password_hash)) {
            navigateTo('HomePage', user);
        }else if (user.status === 'pending' && this.verifyHash(password, user.password_hash)) {
            showAlert('Your registration is not approved, try again later', 'error');
        }
        // If the status is correct but the password is wrong
        else {
            showAlert('Wrong Password', 'error');
        }
    }
    // If no user is found
    else {
        showAlert('No user with this Email, Please register', 'error');
    }
}
}