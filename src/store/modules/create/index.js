import getters from './getters.js';
import actions from './actions.js';
import mutations from './mutations.js';

export default {
  namespaced: true,
  state() {
    return {
      // ux
      view: 1,
      // step 1 - get user
      creatorId: null,
      creatorName: null,
      // step 2 - event info
      date: {
        monthName: null,
        month: null,
        day: null,
        year: null,
      },
      time: {
        hour: null,
        minute: null,
        meridian: null,
      },
      location: null,
      // step 3 - add guests
      allGuests: null,
      // step 4 - nominationType
      nominationType: null, // 'manual' or 'nPG'
      allNominations: null, // [ {movie1}, {movie2}, ... ]
      voteStatus: null, // 'nominate', 'vote', or 'selected'      
    };
  },
  getters,
  actions,
  mutations
};
