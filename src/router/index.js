import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/repos',
      name: 'repos',
      component: () => import('@views/Repos.vue')
    },
    {
      path: '/users',
      name: 'users',
      component: () => import('@views/Users.vue')
    },
    {
      path: '/teams',
      name: 'teams',
      component: () => import('@views/Teams.vue')
    },
  ]
})

export default router