export default {

  view(state, payload) {
    state.view = payload;
  },
  creatorId(state, payload) {
    state.creatorId = payload;
  },
  creatorName(state, payload) {
    state.creatorName = payload;
  },
  date(state, payload) {
    state.date = payload;
  },
  time(state, payload) {
    state.time = payload;
  },
  location(state, payload) {
    state.location = payload;
  },
  allGuests(state, payload) {
    state.allGuests = payload;
  },
  nomsPerGuest(state, payload) {
    state.nomsPerGuest = payload;
  },
  voteStatus(state, payload) {
    state.voteStatus = payload;
  },
  nominationType(state, payload) {
    state.nominationType = payload;
  },
  nominations(state, payload) {
    state.nominations = payload;
  },
  creatorNominations(state, payload) {
    state.creatorNominations = payload;
  },


};