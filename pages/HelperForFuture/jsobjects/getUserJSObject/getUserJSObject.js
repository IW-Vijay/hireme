export default {
	userData () {
		return {
			"user" : JSON.parse(appsmith.URL.queryParams.member)
	}
}
}