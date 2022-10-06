import getters from './getters.js';
import actions from './actions.js';
import mutations from './mutations.js';


export default {
  state() {
    return {
      myEmail: null,
      movieNight: {
        id: null,
        creator: null,
        date: null,
        time: null,
        location: null,
        nominations: null,
        
      }
    };
  },
  getters,
  actions,
  mutations
};
