export default {
	educationData () {
		return {
			"educations" : JSON.parse(appsmith.URL.queryParams.educations),
			"institutions" : getInstisAndOrgsJSObject.instiAndOrgData.data[0].institutions
		}
	}
}