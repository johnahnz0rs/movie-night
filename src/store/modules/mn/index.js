import getters from './getters.js';
import actions from './actions.js';
import mutations from './mutations.js';

export default {
  namespaced: true,
  state() {
    return {
      mn: null,
      userId: null,
      userName: null,
      userAllowed: null,
      userIsAdmin: null,
    };
  },
  getters, 
  actions,
  mutations,
};