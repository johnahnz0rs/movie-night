import getters from './getters.js';
import actions from './actions.js';
import mutations from './mutations.js';

export default {
  namespaced: true,
  state() {
    return {
      // general
      view: 1,
      nominationType: null, // "manual" or "nPG"
      voteStatus: null, // "nominate", "vote", or "selected"
      creatorNominations: null, // [ {movie1}, {movie2}, ... ]
      // nominations: null, // { guestId: [{movie1}, {movie2}, ...], ... }
      // votes: null, // { guestId: [{movie1}, {movie2}, ...], ... }
      // selections: null, // [ {movie1}, {movie2}, ... ]
      // step 1
      creatorId: null,
      creatorName: null,
      // step 2
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
      // step 3
      allGuests: null,
      // step 4
      nomsPerGuest: null,
    };
  },
  getters,
  actions,
  mutations
};
