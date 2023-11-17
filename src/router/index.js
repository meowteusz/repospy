import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      props: true,
      component: () => import('@views/Home.vue'),
    },
    {
      path: '/repos',
      name: 'repos',
      props: true,
      component: () => import('@views/Repos.vue'),
    },
    {
      path: '/users',
      name: 'users',
      props: true,
      component: () => import('@views/Users.vue'),

    },
    {
      path: '/teams',
      name: 'teams',
      props: true,
      component: () => import('@views/Teams.vue'),
    },
    {
      // We don't want a null team so if they browse
      // manually to /team and don't supply an ID we
      // send them to /teams instead.
      path: '/team',
      redirect: { name: 'teams' }
    },
    {
      path: '/team/:id',
      name: 'team',
      props: true,
      component: () => import('@views/TeamDetail.vue'),
    },
  ]
})

export default router