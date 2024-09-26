export default {
  async update_member() {
    await updateMember.run();
    
    // Use query parameters to pass the updated data
    navigateTo("ProfilePageForApproval", {
      requester: JSON.stringify(updateMember.data[0])
    });
  }
}