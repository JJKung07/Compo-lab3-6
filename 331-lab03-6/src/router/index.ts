import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import PassengerView from '@/views/PassengerView.vue'
import PassengerDetailView from '@/views/PassengerDetailView.vue'
import AirplaneDetailView from '@/views/AirlineDetailView.vue'
import NotFoundView from '@/views/NotFoundView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'passenger-view',
      component: PassengerView
    },
    {
      path: '/passenger/:_id',
      name: 'passenger-detail-view',
      component: PassengerDetailView,
      props: true
      ,
      children: [
        {
          path: 'airline/:airlineId',
          name: 'airline-detail-view',
          component: AirplaneDetailView,
          props: true
        }
      ]
    },
    {
      path: '/:catchAll(.*)',
      name: 'not-found',
      component: NotFoundView
    }
  ]
})

export default router
