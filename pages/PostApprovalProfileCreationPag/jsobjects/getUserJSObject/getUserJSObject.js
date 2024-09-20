export default {
  userData () {
    // Get users and roles data
    const users = fetchUser.data || [];
    const community_id = fetchCommunityID.data[0] || 'not provided';
		showAlert(community_id);

    // Map through users and replace role_id with role_name
    const updatedUsers = users.map(user => {
      return {
        ...user, // Keep other user fields
        community_id: community_id ? community_id : null, // Replace role_id with role_name, or set null if no match
        membership_id: undefined // Remove role_id from the final output
      };
    });

    return {
      "user": updatedUsers
    };
  }
}