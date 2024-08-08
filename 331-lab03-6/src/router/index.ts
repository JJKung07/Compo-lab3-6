import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import PassengerView from '@/views/PassengerView.vue'
import PassengerDetailView from '@/views/PassengerDetailView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'passenger-view',
      component: PassengerView
    },
    {
      path: '/passenger/:id',
      name: 'passenger-detail',
      component: PassengerDetailView,
      props: true
    }
  ]
})

export default router
