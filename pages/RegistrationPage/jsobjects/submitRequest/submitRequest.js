export default {
	async addUser() {
		const name = inp_name.text.trim();
		const email = inp_email.text.trim();
		const password = inp_password.text;
		const confirmPassword = inp_confirmpassword.text;
		let membership_id;
		//const inp_membership_id = inp_membershipid.text.trim();

		// Validate inputs
		if (!name || !email || !password) {
			showAlert("Name, email, or password must not be empty.");
			return;
		}

		if (password !== confirmPassword) {
			showAlert("Passwords do not match.");
			return;
		}
		
		
		await fetch_user.run();
		const user = fetch_user.data;
		console.log(user);

		// If user exists (check based on how your backend returns data)
		if (user.length > 0) {
			showAlert("User with this email already exists, please try logging in.");
			return;
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
			//const about = inp_about.text.replace()(/'/g, "''");
			
		} catch (error) {
					showAlert("Membership id or membership for this email already exists.");
					return;
		}
		try {
			await create_user_for_approval.run({membership_id});

			// If successful, show the modal
			showModal(RegisteredModel.name);
		} catch (error) {
			delete_membership.run({membership_id})
			showAlert("Unable to register.");
		}
	}
}
