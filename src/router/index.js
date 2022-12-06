import { createRouter, createWebHistory } from 'vue-router';
import HomeView from '../views/HomeView.vue';
import CreateEventView from '../views/create/CreateEvent.vue';
import MovieNightView from '../views/mn/MovieNightView.vue';
// import VotesView from '../views/VotesView.vue';
// import AccountView from '../views/-AccountView.vue';
// import UpcomingEvents from '../views/UpcomingEvents.vue';
// import PastEvents from '../views/PastEvents.vue';
// import QuickPick from '../views/QuickPick.vue';

const routes = [
  {
    path: '/',
    name: 'home',
    component: HomeView
  },
  {
    path: '/create',
    name: 'create',
    component: CreateEventView
  },
  {
    path: '/mn/:mnId',
    name: 'mn',
    component: MovieNightView,
  },
  // {
  //   path: '/mn/:uIdAdmin/:mnId/:voterId',
  //   name: 'movieNight',
  //   component: MovieNightView
  // },




  // "not sure" or "v2" routes
  // "not sure" or "v2" routes
  // "not sure" or "v2" routes
  // {
  //   path: '/account',
  //   name: 'account',
  //   component: AccountView
  // },
  // {
  //   path: '/upcoming-events',
  //   name: 'upcoming',
  //   component: UpcomingEvents
  // },
  // {
  //   path: '/past-events',
  //   name: 'past',
  //   component: PastEvents
  // },
  // {
  //   path: '/quick-pick',
  //   name: 'quickpick',
  //   component: QuickPick
  // },
  // {
  //   path: '/votes/:uIdAdmin/:date/:myId',
  //   name: 'votes',
  //   component: VotesView
  // },
  // this.$router.push(`votes/${movieNight.uId}/${movieNight.year}-${movieNight.month}-${movieNight.day}-${movieNight.hour}-${movieNight.minute}-${movieNight.meridian}/${movieNight.uId}`);
  // { path: '/users/:id', component: User },
  // template: '<div>User {{ $route.params.id }}</div>',
];

const router = createRouter({
  history: createWebHistory(),
  routes
});

export default router;
