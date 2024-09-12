export default {
	educationData () {
		return {
			"educations" : JSON.parse(appsmith.URL.queryParams.educations)
		}
	}
}