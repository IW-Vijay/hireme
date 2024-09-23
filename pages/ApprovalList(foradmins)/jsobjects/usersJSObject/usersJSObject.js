export default {
  async usersData() {
    await gettinguserslistforapproval.run(); // Wait for the approval list to be fetched
    const users = gettinguserslistforapproval.data || [];

    // Prepare an array to hold updated users
    const updatedUsers = [];

    for (const user of users) {
      let com_id = '';

      if (user.membership_id) {
        const membership_id = user.membership_id;
        await fetchCommunityID.run({ membership_id }); // Wait for fetchCommunityID to complete
        
        // Check if the data is available
        if (fetchCommunityID.data && fetchCommunityID.data.length > 0) {
          com_id = fetchCommunityID.data[0].community_member_id; // Get community_member_id
        }
      }

      updatedUsers.push({
        ...user,
        community_id: com_id,
      });
    }

    return {
      users: updatedUsers,
    };
  },
};
