export default {
  async result() {
    storeValue("results", []);
    const selected_uni = inp_uni.selectedOptionValue;
    const selected_school = inp_school.selectedOptionValue;
    const selected_org = inp_org.selectedOptionValue;
    const search_input = inp_search.text;

    // If no search input or filters are applied, return an empty array
    if (!search_input && !selected_uni && !selected_school && !selected_org) {
      return [];
    }

    let filterSets = [];

    // Fetch profile IDs from the selected university
    if (selected_uni) {
      await fetch_educations.run({ selected_uni });
      const inst_fil = fetch_educations.data || []; // Ensure data is not undefined
      const inst_profileIds = inst_fil.map(experience => experience.profile_id);

      // If no IDs are found for the selected university, return an empty array
      if (inst_profileIds.length === 0) {
        return [];
      }

      filterSets.push(new Set(inst_profileIds));
    }

    // Fetch profile IDs from the selected school
    if (selected_school) {
      await fetch_educations.run({ selected_school });
      const school_fil = fetch_educations.data || [];
      const school_profileIds = school_fil.map(experience => experience.profile_id);

      // If no IDs are found for the selected school, return an empty array
      if (school_profileIds.length === 0) {
        return [];
      }

      filterSets.push(new Set(school_profileIds));
    }

    // Fetch profile IDs from the selected organization
    if (selected_org) {
      await fetch_work_experience.run({ selected_org });
      const org_fil = fetch_work_experience.data || [];
      const org_profileIds = org_fil.map(experience => experience.profile_id);

      // If no IDs are found for the selected organization, return an empty array
      if (org_profileIds.length === 0) {
        return [];
      }

      filterSets.push(new Set(org_profileIds));
    }

    // Perform intersection of all sets
    let profileIdArray = [];
    if (filterSets.length > 0) {
      profileIdArray = Array.from(
        filterSets.reduce((intersection, currentSet) => 
          new Set([...intersection].filter(id => currentSet.has(id)))
        )
      );
    }

    // If the intersection or single filter results in no profile IDs, return an empty array
    if (profileIdArray.length === 0) {
      return [];
    }

    // Fetch and return results based on filtered profile IDs
    console.log(profileIdArray);
    await fetch_results.run({ profileIdArray });
    storeValue("results", fetch_results.data);
    return fetch_results.data;
  }
};
