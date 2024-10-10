export default {
  async result() {
    storeValue("results", []);
    const selected_uni = inp_uni.selectedOptionValue;
    const selected_school = inp_school.selectedOptionValue;
    const selected_org = inp_org.selectedOptionValue;
    const search_input = inp_search.text;
		const schools = inp_school.options.map(item => item.value);
		const unis = inp_uni.options.map(item => item.value);
		const orgs = inp_org.options.map(item => item.value);
		
		//showAlert(selected_uni.toString());

    // If no search input or filters are applied, return an empty array
    if (!search_input && !selected_uni && !selected_school && !selected_org) {
      return [];
    }

    let filterSets = [];
		

    // Fetch profile IDs from the selected university
    if (selected_uni) {
      await fetch_educations.run({ selected_uni, "institutionList" : unis });
			await fetch_work_experience_from_ins.run({ "selected_inst" : selected_uni, "insts" : unis });
			//console.log(fetch_work_experience_from_ins.data[0]);
			const inst_org_fil = fetch_work_experience_from_ins.data || []
			const inst_org_profileIds = inst_org_fil.map(experience => experience.profile_id);
      const inst_fil = fetch_educations.data || []; // Ensure data is not undefined
      const inst_profileIds = inst_fil.map(experience => experience.profile_id);
			const final_inst_profileIds = inst_profileIds.concat(inst_org_profileIds);
			//console.log(final_inst_profileIds);
      // If no IDs are found for the selected university, return an empty array
      if (final_inst_profileIds.length === 0) {
        return [];
      }
				filterSets.push(new Set(final_inst_profileIds));
			}
			
      

    // Fetch profile IDs from the selected school
    if (selected_school) {
      await fetch_educations.run({"selected_uni" : selected_school, "institutionList" : schools});
			await fetch_work_experience_from_ins.run({ "selected_inst" : selected_school, "insts" : schools });
			//console.log(fetch_work_experience_from_ins.data[0]);
			const school_org_fil = fetch_work_experience_from_ins.data || []
			const school_org_profileIds = school_org_fil.map(experience => experience.profile_id);
      const school_fil = fetch_educations.data || [];
      const school_profileIds = school_fil.map(experience => experience.profile_id);
			const final_school_profileIds = school_profileIds.concat(school_org_profileIds);

      // If no IDs are found for the selected school, return an empty array
      if (final_school_profileIds.length === 0) {
        return [];
      }

      filterSets.push(new Set(final_school_profileIds));
    }

    // Fetch profile IDs from the selected organization
    if (selected_org) {
      await fetch_work_experience.run({ selected_org, orgs });
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
    if (profileIdArray.length === 0 && !search_input) {
      return [];
    }

    // Fetch and return results based on filtered profile IDs
    //console.log(profileIdArray);
    await fetch_results.run({ profileIdArray });
    storeValue("results", fetch_results.data);
    return fetch_results.data;
  }
};
