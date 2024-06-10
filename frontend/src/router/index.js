import { createRouter, createWebHistory } from 'vue-router';
import Home from '../components/Home.vue';
import Login from '../components/Login.vue';
import Project from '../components/Project.vue';

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/login',
    name: 'Login',
    component: Login
  },
  {
    path: '/projects/:projectId',
    name: 'Project',
    component: Project
  }
];

const router = createRouter({
  history: createWebHistory(),
  routes
});

export default router;
