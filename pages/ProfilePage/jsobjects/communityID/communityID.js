export default {
	myFun1 () {
		fetchCommunityID.run();
		storeValue("community_id", fetchCommunityID.data[0]);
		return (fetchCommunityID.data[0]);
	}
}