import { createRouter, createWebHistory } from 'vue-router'
import PassengerView from '../views/PassengerView.vue'
import PassengerDetailView from '@/views/PassengerDetailView.vue'
import PassengerEditView from '@/views/PassengerEditView.vue'
import AirlineDetailView from '@/views/AirlineDetailView.vue'
import NotFoundView from '@/views/NotFoundView.vue'
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
      props: true,
      children: [
        {
          path: 'airline/:airlineId',
          name: 'airline-detail-view',
          component: AirlineDetailView,
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
  ],
  
  scrollBehavior(to, from, savedPosition) {
  console.log('scrollBehavior called:', { to, from, savedPosition });
  if (savedPosition) {
    console.log('Restoring to savedPosition:', savedPosition);
    return savedPosition;
  } else {
    console.log('Scrolling to top');
    return { top: 0 };
  }
  }

})

router.beforeEach(() => {
  nProgress.start()
})

router.afterEach(() => {
  nProgress.done()
})

export default router
