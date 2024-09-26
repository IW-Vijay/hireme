export default {
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
		return dcodeIO.bcrypt.compareSync(password, hash)
	},
	signin: (user, password) => {
    if (user) {
				storeValue("user" , user);
				fetchMembershipStatus.run({membership_id : user.membership_id});
				const status = fetchMembershipStatus.data[0].status_id;
				//showAlert(user.isdeleted.toString());
			if (user.isdeleted === 0 && status === 2 && this.verifyHash(password, user.password_hash)) {
            navigateTo('LandingPage');
        }else if (user.isdeleted === 0 && status === 1 && this.verifyHash(password, user.password_hash)) {
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