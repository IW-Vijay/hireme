export default {
	member () {
		return {
			"member" : JSON.parse(appsmith.URL.queryParams.requester)
		}
	}
}