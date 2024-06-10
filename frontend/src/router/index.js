import { createRouter, createWebHistory } from 'vue-router';
import Home from '../components/Home.vue';
import Login from '../components/Login.vue';
import User from '../components/User.vue';
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
    path: '/users/:userId',
    name: 'User',
    component: User
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
