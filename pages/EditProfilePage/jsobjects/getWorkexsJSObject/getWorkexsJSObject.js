export default {
	workexData () {
		return {
			"workexs" : JSON.parse(appsmith.URL.queryParams.workexs),
			"organizations" : getInstisAndOrgsJSObject.instiAndOrgData.data[1].organizations,
			"institutions" : getInstisAndOrgsJSObject.instiAndOrgData.data[0].institutions
		}
	}
}