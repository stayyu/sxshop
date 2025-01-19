import { createRouter, createWebHistory } from 'vue-router'


const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'main',
      component: () => import('../views/Main.vue'),
      redirect: '/login',
      children: [{
        path: '/home',
        name: 'home',
        component: () => import('../views/Home.vue'),
      },
      {
        path: '/user',
        name: 'user',
        component: () => import('../views/User.vue'),
      },
      {
        path: '/goodscategory',
        name: 'goodscategory',
        component: () => import('../views/Good/Goodscategory.vue'),
      },
      {
        path: '/goodslist',
        name: 'goodslist',
        component: () => import('../views/Good/Goodlist.vue'),
      },
      {
        path: '/brand',
        name: 'brand',
        component: () => import('../views/Brand/Brand.vue'),
      },
      {
        path: '/brandsCategory',
        name: 'brandsCategory',
        component: () => import('../views/Brand/BrandsCategory.vue'),
      },
      {
        path: '/order',
        name: 'order',
        component: () => import('../views/Orders.vue'),
      },
      ]
    },
    {
      path: '/login',
      name: 'login',
      component: () => import('../views/Login.vue'),
    },
    {
      path: '/404',
      name: '404',
      component: () => import('../views/404.vue'),
    },
  ]
})

export default router
