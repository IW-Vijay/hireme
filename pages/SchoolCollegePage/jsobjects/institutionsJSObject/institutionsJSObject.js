export default {
	async getInstitutions() {
		await fetch_institutions.run()
		return  {
			"institutions" : fetch_institutions.data
		}
  }
}
