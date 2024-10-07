export default {
	async getOrganizations() {
		await fetch_organizations.run();
		return {
			"organizations" : fetch_organizations.data
		}
  }
}