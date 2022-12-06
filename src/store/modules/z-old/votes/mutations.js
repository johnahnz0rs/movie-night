export default {

  
  nomsPerFriend(state, payload) {
    state.nomsPerFriend = payload;
  },
  nomsFinished(state, payload) {
    state.nomsFinished = payload;
  },
  nominations(state, payload) {
    state.nominations = payload;
  },
  myNoms(state, payload) {
    state.myNoms = payload;
  },
  votesFinished(state, payload) {
    state.votesFinished = payload;
  },
  myVotes(state, payload) {
    state.myVotes = payload;
  },
  votes(state, payload) {
    state.votes = payload;
  },
  winner(state, payload) {
    state.winner = payload;
  },

};
