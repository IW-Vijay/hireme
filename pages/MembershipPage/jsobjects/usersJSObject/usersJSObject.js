export default {
	async usersObject () {
		fetch_users.run();
		fetch_roles.run();
		return {
			"users" : fetch_users.data,
			"roles" : fetch_roles.data
		}
	}
}