import { createRouter, createWebHistory } from 'vue-router'

const routes = [
    {
      path: '/',
      name: 'landingPage',
      component: () => import('../view/LandingPage.vue')
    },
    {
      path: '/books',
      name: 'books',
      component: () => import('../view/HomeIndex.vue')
    },
    {
      path: '/published',
      name: 'published',
      component: () => import('../view/PublishedBook.vue')
    },
    {
      path: '/books/:id',
      name: 'publishedBook',
      params:true,
      component: () => import('../view/ShowBook.vue')
    },
    {
      path: '/books/findbook',
      name: 'findBooks',
      component: () => import('../view/findBook.vue')
    },
]
  
const router = createRouter({
    history: createWebHistory(process.env.BASE_URL),
    routes
})
  
export default router