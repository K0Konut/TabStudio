import { createRouter, createWebHistory } from 'vue-router'

import LibraryPage from '../pages/LibraryPage.vue'
import ReaderPage from '../pages/ReaderPage.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
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
      path: '/:pathMatch(.*)*',
      redirect: '/',
    },
  ],
})

export default router
