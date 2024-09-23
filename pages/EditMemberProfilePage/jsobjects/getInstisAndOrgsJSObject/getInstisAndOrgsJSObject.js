export default {
  async instiAndOrgData() {
    try {
      await fetchInstitutions.run();
      await fetchOrganizations.run();

      
			return [
				{institutions: fetchInstitutions.data},
				{organizations:  fetchOrganizations.data}
      ];
    } catch (error) {
      console.error('Error fetching data:', error);
      return {
        institutions: [],
        organizations: []
      };
    }
  }
}