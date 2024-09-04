export default {
	customWidgetData () {
		return {
			"user" : appsmith.store.user,
			"education" : user_education.data,
			"workex" : user_workex.data
		}
	}
}