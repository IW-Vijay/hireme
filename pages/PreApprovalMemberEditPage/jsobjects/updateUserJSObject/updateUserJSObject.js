export default {
  async update_member() {
    if (inp_comid.text !== "") {
      let membership_details = fetchMembershipDetails.data;

      // Check if membership details are available
      if (!membership_details || membership_details.length === 0) {
        // Create a new membership and wait for the result
        await createNewMembership.run();
        
        // Ensure that createNewMembership has completed and data is available
        const membership_id = createNewMembership.data[0].membership_id;
        await updateMember.run({ membership_id }); // Wait for update to complete
      } else {
        const membership_id = membership_details[0].membership_id;
        await updateMember.run({ membership_id }); // Wait for update to complete
      }

      navigateTo("ApprovalList(foradmins)"); // Navigate after updates
    } else {
      const membership_id = "";
      await updateMember.run({ membership_id }); // Wait for update to complete
      navigateTo("ApprovalList(foradmins)"); // Navigate after updates
    }
  }
}
