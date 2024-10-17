export default {
  async update_member() {
    try {
        await userApproved.run();
        navigateTo("ApprovalList(foradmins)");
      
    } catch (error) {
      // Handle any errors
      showAlert(`Error: ${error.message}`);
      console.error("Error updating member:", error);
    }
  }
}

