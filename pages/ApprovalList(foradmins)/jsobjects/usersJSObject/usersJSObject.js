export default {
  usersData () {
    // Get users and roles data
    const users = gettinguserslistforapproval.data || [];
    const roles = fetchRoles.data || [];

    // Map through users and replace role_id with role_name
    const updatedUsers = users.map(user => {
      // Find the matching role for the user
      const role = roles.find(role => role.role_id === user.role_id);
      
      return {
        ...user, // Keep other user fields
        role: role ? role.role_name : null, // Replace role_id with role_name, or set null if no match
        role_id: undefined // Remove role_id from the final output
      };
    });

    return {
      "users": updatedUsers
    };
  }
}