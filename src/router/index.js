import { createRouter, createWebHistory } from 'vue-router'

import AboutPage from '../pages/AboutPage.vue'
import HomePage from '../pages/HomePage.vue'
import LibraryPage from '../pages/LibraryPage.vue'
import ReaderPage from '../pages/ReaderPage.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomePage,
    },
    {
      path: '/library',
      name: 'library',
      component: LibraryPage,
    },
    {
      path: '/reader/:id',
      name: 'reader',
      component: ReaderPage,
      props: true,
    },
    {
      path: '/about',
      name: 'about',
      component: AboutPage,
    },
    {
      path: '/:pathMatch(.*)*',
      redirect: '/',
    },
  ],
})

export default router
