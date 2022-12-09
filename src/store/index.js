import { createStore } from 'vuex';

import createModule from './modules/create/index.js';
import mnModule from './modules/mn/index.js';

const store = createStore({
  modules: {
    create: createModule,
    mn: mnModule,
  },
});

export default store;

