export default {
	async usersObject () {
		await fetch_users.run();
		await fetch_roles.run();
		return {
			"users" : fetch_users.data,
			"roles" : fetch_roles.data
		}
	}
}