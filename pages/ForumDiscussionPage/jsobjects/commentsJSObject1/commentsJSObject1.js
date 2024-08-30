export default {
  async getusername(user_id = 61) {
    await fetch_username.run({ user_id });  // Ensure fetch_username.run completes before accessing data
    return fetch_username.data[0].name;
  },
  
  async customWidgetData() {
    // Get the comments data
    const comments = forum_comments.data;

    // Fetch usernames for each comment
    const updatedComments = await Promise.all(
      comments.map(async comment => {
        const user_name = await this.getusername(comment.user_id);
        return {
          ...comment,
          "user_name": user_name
        };
      })
    );

    // Convert the updated comments array to a JSON string
    const commentsJsonString = JSON.stringify(updatedComments);

    // Return the string inside another JSON object
    return JSON.stringify({
      comments: commentsJsonString,
			user : appsmith.store.user,
			forum_id : JSON.parse(appsmith.URL.queryParams.forum).id
    });
  }
}
