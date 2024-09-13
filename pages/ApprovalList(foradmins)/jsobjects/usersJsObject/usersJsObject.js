export default {
  sync customWidgetData() {
    try {
      // Fetch the user list data asynchronously
      await gettinguserslistforapproval.run();
      
      // Return the data once it's available
      return {
        users: gettinguserslistforapproval.data
      };
    } catch (error) {
      console.error("Error fetching user list:", error);
      return {
        users: []
      }; // Return an empty array in case of error
    }
  }
}
