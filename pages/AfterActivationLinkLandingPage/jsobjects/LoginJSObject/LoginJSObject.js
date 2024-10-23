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
	signin: async () => {
		const email = appsmith.URL.queryParams.email.trim();
		const password = appsmith.URL.queryParams.pass;
		
		await getUser.run();
		const user = getUser.data[0]
		storeValue("user", user);
		if (user) {
			if(this.verifyHash(password, user.password_hash)){
				await activateMembership.run({ membership_id: user.membership_id });
			} else {
				navigateTo("ErrorActivationPage", {user : user});
			}
		}
		else {
			navigateTo("ErrorActivationPage");
		}
	} 
}