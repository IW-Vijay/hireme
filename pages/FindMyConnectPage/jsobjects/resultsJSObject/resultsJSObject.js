export default {
  async result() {
    const selected_uni = inp_uni.selectedOptionValue;
    const selected_org = inp_org.selectedOptionValue;
		const search_input = inp_search.text;
		
		if(!search_input && !selected_org && !selected_uni){
			return [];
		}
    
    let uniProfileIdSet = new Set();
    let orgProfileIdSet = new Set();
    
    // Fetch and store profile IDs from the selected university
    if (selected_uni !== '') {
      await fetch_educations.run({ selected_uni });
      const inst_fil = fetch_educations.data || []; // Ensure data is not undefined
      const inst_profileIds = inst_fil.map((experience) => experience.profile_id);
      inst_profileIds.forEach(id => uniProfileIdSet.add(id));
    }
    
    // Fetch and store profile IDs from the selected organization
    if (selected_org !== '') {
      await fetch_work_experience.run({ selected_org });
      const org_fil = fetch_work_experience.data || []; // Ensure data is not undefined
      const org_profileIds = org_fil.map((experience) => experience.profile_id);
      org_profileIds.forEach(id => orgProfileIdSet.add(id));
    }

    let profileIdArray = [];

    // If both university and organization are selected, perform intersection
    if (selected_uni !== '' && selected_org !== '') {
      profileIdArray = Array.from([...uniProfileIdSet].filter(id => orgProfileIdSet.has(id)));
    } 
    // If only university is selected, use university profile IDs
    else if (selected_uni !== '') {
      profileIdArray = Array.from(uniProfileIdSet);
    }
    // If only organization is selected, use organization profile IDs
    else if (selected_org !== '') {
      profileIdArray = Array.from(orgProfileIdSet);
    }

    // Fetch and return results based on filtered profile IDs
    await fetch_results.run({ profileIdArray });
    storeValue("results", fetch_results.data);
    return fetch_results.data;
  }
}
