import { createRouter, createWebHistory } from 'vue-router'

/* eslint-disable */
export const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: () => import('../views/Today.vue')
    },
    {
      path: '/tomorrow',
      name: 'tomorrow',
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import('../views/Tomorrow.vue')
    },
    {
      path: '/yesterday',
      name: 'yesterday',
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import('../views/Yesterday.vue')
    },
    {
      path: '/train',
      name: 'train',
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import('../views/FileUpload.vue')
    }
  ]
})

export default router
