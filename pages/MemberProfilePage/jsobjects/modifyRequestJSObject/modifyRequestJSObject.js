export default {
	async request () {
		await fetchConnectionRequest.run();
		const existing_request = fetchConnectionRequest.data[0];
		if(existing_request){
			await modifyRequest.run({"id" : existing_request.id});
		}
		else {
			await sendConnectionRequest.run();
		}
	}
}