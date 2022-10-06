import { createStore } from 'vuex';

import userModule from './modules/user/index.js';
import eventsModule from './modules/events/index.js';


const store = createStore({
  modules: {
    events: eventsModule,
    user: userModule,
  },
});

export default store;

// export default createStore({
//   state: {
//   },
//   getters: {
//   },
//   mutations: {
//   },
//   actions: {
//   },
//   modules: {
//   }
// })
