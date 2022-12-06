export default {
  view(context, data) {
    context.commit('view', data.view);
  },
  creatorId(context, data) {
    context.commit('creatorId', data.creatorId);
  },
  creatorName(context, data) {
    context.commit('creatorName', data.creatorName);
  },
  date(context, data) {
    context.commit('date', data.date);
  },
  time(context, data) {
    context.commit('time', data.time);
  },
  location(context, data) {
    context.commit('location', data.location);
  },
  allGuests(context, data) {
    context.commit('allGuests', data.allGuests);
  },
  nomsPerGuest(context, data) {
    context.commit('nomsPerGuest', data.nomsPerGuest);
  },
  voteStatus(context, data) {
    context.commit('voteStatus', data.voteStatus);
  },
  nominationType(context, data) {
    context.commit('nominationType', data.nominationType);
  },
  nominations(context, data) {
    context.commit('nominations', data.nominations);
  },
  creatorNominations(context, data) {
    context.commit('creatorNominations', data.creatorNominations);
  },
  
};