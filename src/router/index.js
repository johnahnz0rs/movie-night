import { createRouter, createWebHistory } from 'vue-router';

import HomeView from '../views/home/HomeView.vue';
import CreateEventView from '../views/create/CreateEventView.vue';
import MovieNightView from '../views/mn/MovieNightView.vue';
import DashView from '../views/dash/DashView.vue';
import SteveHarvey from '../steve-harvey/SteveHarvey.vue';

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

  // dev
  {
    path: '/dash',
    name: 'dash',
    component: DashView
  },
  {
    path: '/steve',
    name: 'steve',
    component: SteveHarvey
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes
});

export default router;
