export default {
	async deleteUser () {
		await deleteEducations.run();
		await deleteWorkex.run();
		await deleteMember.run();
		navigateTo('MembershipPage');
	}
}