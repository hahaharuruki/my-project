import { createRouter, createWebHistory } from 'vue-router';
import Home from '../views/Home.vue';
import HowToUse from '../views/HowToUse.vue';

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/how-to-use',
    name: 'HowToUse',
    component: HowToUse
  }
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
});

export default router;