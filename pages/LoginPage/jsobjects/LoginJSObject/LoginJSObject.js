export default {
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
	signin: async (user, password) => {
		if(inp_pass.text.length < 5){
			storeValue("alert" , "Password should be atleast 5 chars");
			return;
		}
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
						storeValue("alert" , "Your registration is not approved yet, try again later.");
        } 
				else if (user.isdisabled === 0 && status === 3 && this.verifyHash(password, user.password_hash)) {
            //showAlert('Your membership has been disabled, please contact memebership owner.', 'error');
						storeValue("alert" , "Your membership has been disabled, please contact memebership owner.");
        } 
				else if (user.isdisabled === 0 && status === 4 && this.verifyHash(password, user.password_hash)) {
            //showAlert('Your membership request has been rejected, please contact admin.', 'error');
						storeValue("alert" , "Your membership request has been rejected, please contact admin.");
        } 
			else if (user.isdisabled === 1){
				//showAlert('Your account has been removed, please contact membership owner or admin.');
				storeValue("alert" , "Your account has been removed, please contact membership owner or admin.");
			}
        // If the password is incorrect
        else {
            //showAlert('Wrong Password', 'error');
						storeValue("alert_pass" , "Wrong Password!");
        }
    } 
    // If no user with the provided email is found
    else {
        //showAlert('No user with this Email, Please register.', 'error');
				storeValue("alert_mail" , "No user with this Email, Please register.");
    }
}
}