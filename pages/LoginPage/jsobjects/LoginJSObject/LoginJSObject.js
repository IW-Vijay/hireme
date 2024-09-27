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
	signin: async (user, password) => {
    if (user) {
        // Store the user information
        storeValue("user", user);

        // Wait for the membership status to be fetched before proceeding
        await fetchMembershipStatus.run({ membership_id: user.membership_id });

        // Fetch status after ensuring fetchMembershipStatus has completed
        const status = fetchMembershipStatus.data[0]?.status_id;

        // Check if the user is not deleted and the status is approved (status = 2)
        if (user.isdeleted === 0 && status === 2 && this.verifyHash(password, user.password_hash)) {
            navigateTo('LandingPage');
        } 
        // If the user is not deleted but the status is pending approval (status = 1)
        else if (user.isdeleted === 0 && status === 1 && this.verifyHash(password, user.password_hash)) {
            showAlert('Your registration is not approved, try again later', 'error');
        } 
        // If the password is incorrect
        else {
            showAlert('Wrong Password', 'error');
        }
    } 
    // If no user with the provided email is found
    else {
        showAlert('No user with this Email, Please register', 'error');
    }
}
}