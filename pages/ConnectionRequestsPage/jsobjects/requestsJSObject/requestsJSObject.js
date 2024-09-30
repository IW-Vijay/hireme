export default {
	async requests() {
		await fetchConnectionRequests.run();
		const requests = fetchConnectionRequests.data;

		// Use for...of loop for asynchronous operations
		for (const request of requests) {
			// Fetch the requester profile
			await fetchUser.run({"profile_id": request.requester});
			const requester = fetchUser.data[0];

			// Fetch the requested profile
			await fetchUser.run({"profile_id": request.requested});
			const requested = fetchUser.data[0];

			// Update the request object with profile names
			request.requester = requester;
			request.requested = requested;
		}

		return requests;
	}
}