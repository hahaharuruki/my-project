import { createRouter, createWebHistory } from 'vue-router';
import TextCounter from '../views/TextCounter.vue';
import WordSearchReplace from '../views/WordSearchReplace.vue';

const routes = [
  {
    path: '/text-counter',
    name: 'TextCounter',
    component: TextCounter
  },
  {
    path: '/word-search-replace',
    name: 'WordSearchReplace',
    component: WordSearchReplace
  }
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
});

export default router;