export default {
	async organizationData () {
		return {
			"organization" : JSON.parse(appsmith.URL.queryParams.organization)
		}
	}
}