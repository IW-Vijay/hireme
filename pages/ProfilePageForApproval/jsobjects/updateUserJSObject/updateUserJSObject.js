export default {
  async update_member() {
    try {
      if (inp_membershipid.text !== "") {
        // Pass membership ID as a parameter
        //await createNewMembership.run({ membership_id: inp_membershipid.text });

        // Assuming createNewMembership.data is an array and the first item has membership_id
        //const membership_id = createNewMembership.data[0].membership_id;

        // Pass the obtained membership_id to userApproved function
				const community_member_id = inp_membershipid.text
        await userApproved.run({community_member_id});

        // Navigate to the approval list page
        navigateTo("ApprovalList(foradmins)");
      } else {
        // Show an alert if Membership ID is empty
        showAlert('Membership ID cannot be empty.');
      }
    } catch (error) {
      // Handle any errors
      showAlert(`Error: ${error.message}`);
      console.error("Error updating member:", error);
    }
  }
}

