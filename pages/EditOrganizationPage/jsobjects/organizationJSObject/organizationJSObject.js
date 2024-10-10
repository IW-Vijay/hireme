export default {
	organizationData () {
		return {
			"organization" : JSON.parse(appsmith.URL.queryParams.organization)
		}
	}
}