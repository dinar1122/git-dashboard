

import { createRouter, createWebHistory } from 'vue-router';
import MainPage from '../views/MainPage.vue'
import ReposReview from '../views/ReposReview.vue'



const routes = [
  { path: '/', 
  component: MainPage },
  {
    path: '/repo/:ownerLogin/:id',
    name: 'repo',
    component: ReposReview
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes})

export default router;
