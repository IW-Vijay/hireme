export default {
	async addUser() {
		const name = inp_name.text.trim();
		const email = inp_email.text.trim();
		let membership_id;
		//const inp_membership_id = inp_membershipid.text.trim();

		// Validate inputs
		if (!name) {
			storeValue("alert_name", "Name must not be empty.");
			return;
		}
		if (!email) {
			storeValue("alert_mail", "Email must not be empty.");
			return;
		}

		
		await fetch_user.run();
		const user = fetch_user.data;
		console.log(user);

		// If user exists (check based on how your backend returns data)
		if (user.length > 0) {
			storeValue("alert_mail", "User with this email already exists, please try logging in.");
			return;
		}
		if (false){
			/* check for email and name existance in admin database will happen here*/
			storeValue("alert_mail", "This email is not associated with any membership. Please contact Admin.") 
		}
		try {
			await create_membership.run();
			membership_id = create_membership.data[0].membership_id;
			//const about = inp_about.text.replace()(/'/g, "''");
			
		} catch (error) {
					showAlert("Membership for this email already exists.");
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
