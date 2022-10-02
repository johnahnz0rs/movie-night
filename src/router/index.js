import { createRouter, createWebHistory } from 'vue-router';
import HomeView from '../views/HomeView.vue';
import AccountView from '../views/AccountView.vue';
import CreateEvent from '../views/CreateEvent.vue';
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
    path: '/create-event',
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
  }
];

const router = createRouter({
  history: createWebHistory(),
  routes
});

export default router;
