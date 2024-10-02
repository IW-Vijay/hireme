export default {
	async institutionData () {
		return {
			"institution" : JSON.parse(appsmith.URL.queryParams.institution)
		}
	}
}