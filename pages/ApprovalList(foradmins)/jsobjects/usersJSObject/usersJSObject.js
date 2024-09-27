export default {
  async usersData() {
    await gettinguserslistforapproval.run(); // Wait for the approval list to be fetched
    const users = gettinguserslistforapproval.data || [];


    return {
      users: users,
    };
  },
};
