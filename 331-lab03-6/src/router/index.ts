import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import PassengerView from '@/views/PassengerView.vue'
import PassengerDetailView from '@/views/PassengerDetailView.vue'
import AirplaneDetailView from '@/views/AirlineDetailView.vue'
import NotFoundView from '@/views/NotFoundView.vue'
import PassengerEditView from '@/views/PassengerEditView.vue'
import nProgress from 'nprogress'

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
      path: '/passenger/:_id/edit',
      name: 'passenger-edit-view',
      component: PassengerEditView,
      props: true
    },
    {
      path: '/:catchAll(.*)',
      name: 'not-found',
      component: NotFoundView
    }
  ]
})
router.beforeEach(() => {
  nProgress.start()
})

router.afterEach(() => {
  nProgress.done()
})

export default router
