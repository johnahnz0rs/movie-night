import { createRouter, createWebHistory } from 'vue-router';

import HomeView from '../views/HomeView.vue';
import CreateEventView from '../views/create/CreateEvent.vue';
import MovieNightView from '../views/mn/MovieNightView.vue';

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
];

const router = createRouter({
  history: createWebHistory(),
  routes
});

export default router;
