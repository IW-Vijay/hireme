export default {
	async usersObject () {
		await fetch_users.run();
		return {"users" : fetch_users.data}
	}
}