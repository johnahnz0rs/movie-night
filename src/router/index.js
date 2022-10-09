import { createRouter, createWebHistory } from 'vue-router';
import HomeView from '../views/HomeView.vue';
import AuthView from '../views/AuthView.vue';
import CreateEvent from '../views/CreateEvent.vue';
import VotesView from '../views/VotesView.vue';

import AccountView from '../views/AccountView.vue';
import UpcomingEvents from '../views/UpcomingEvents.vue';
import PastEvents from '../views/PastEvents.vue';
import QuickPick from '../views/QuickPick.vue';

const routes = [
  {
    path: '/',
    name: 'home',
    component: HomeView
  },
  {
    path: '/account',
    name: 'account',
    component: AccountView
  },
  {
    path: '/create',
    name: 'create',
    component: CreateEvent
  },
  {
    path: '/upcoming-events',
    name: 'upcoming',
    component: UpcomingEvents
  },
  {
    path: '/past-events',
    name: 'past',
    component: PastEvents
  },
  {
    path: '/quick-pick',
    name: 'quickpick',
    component: QuickPick
  },
  {
    path: '/auth',
    name: 'auth',
    component: AuthView
  },
  {
    path: '/votes/:uId/:date/:friendId',
    name: 'votes',
    component: VotesView
  },
  // this.$router.push(`votes/${movieNight.uId}/${movieNight.year}-${movieNight.month}-${movieNight.day}-${movieNight.hour}-${movieNight.minute}-${movieNight.meridian}/${movieNight.uId}`);
  // { path: '/users/:id', component: User },
  // template: '<div>User {{ $route.params.id }}</div>',
];

const router = createRouter({
  history: createWebHistory(),
  routes
});

export default router;
