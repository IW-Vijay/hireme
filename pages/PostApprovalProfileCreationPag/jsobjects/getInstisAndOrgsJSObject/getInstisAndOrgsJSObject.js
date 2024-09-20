export default {
  async instiAndOrgData() {
    try {
      await fetchInstitutions.run();
      await fetchOrganizations.run();

      // Extracting names and joining them with commas for each list
      const institutionsNames = fetchInstitutions.data;
      const organizationsNames = fetchOrganizations.data;

      return [
				{institutions: institutionsNames},
				{organizations: organizationsNames}
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