export default {
  async instiAndOrgData() {
    try {
      await fetchInstitutions.run();
      await fetchOrganizations.run();

      // Extracting names and joining them with commas for each list
      const institutionsNames = fetchInstitutions.data.map(inst => inst.name);
      const organizationsNames = fetchOrganizations.data.map(org => org.name);

      
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