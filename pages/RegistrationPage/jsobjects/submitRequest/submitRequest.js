export default {
	addUser () {
		
		const name = inp_name.text.trim();
    const email = inp_email.text.trim();
    const password = inp_password.text;
    const confirmPassword = inp_confirmpassword.text;

    // Validate inputs
    if (!name || !email || !password) {
        showAlert("Name, email or password must not be empty.");
        return;
    }

    if (password !== confirmPassword) {
        showAlert("Passwords do not match.");
        return;
    };
		create_user_for_approval.run();
	}
}