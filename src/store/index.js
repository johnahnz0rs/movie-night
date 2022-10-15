import { createStore } from 'vuex';

// import userModule from './modules/user/index.js';
import eventsModule from './modules/events/index.js';
import votesModule from './modules/votes/index.js';
import movieNightsModule from './modules/movienights/index.js';


const store = createStore({
  modules: {
    // user: userModule,
    events: eventsModule,
    votes: votesModule,
    movieNights: movieNightsModule,
  },
});

export default store;

