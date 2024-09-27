export default {
	async addUser() {
		const name = inp_name.text.trim();
		const email = inp_email.text.trim();
		const password = inp_password.text;
		const confirmPassword = inp_confirmpassword.text;
		//const community_id = inp_comid.text.trim();

		// Validate inputs
		if (!name || !email || !password) {
			showAlert("Name, email, or password must not be empty.");
			return;
		}

		if (password !== confirmPassword) {
			showAlert("Passwords do not match.");
			return;
		}

		/*let membership_id = null;

		if (community_id) {
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
			const membership_id = create_membership.data[0].membership_id;
			await create_user_for_approval.run({membership_id});

			// If successful, show the modal
			showModal(RegisteredModel.name);
		} catch (error) {
			// If there's an error, show it as an alert
			showAlert(`You might already have an account, please try loging in`);
		}
	}
}
