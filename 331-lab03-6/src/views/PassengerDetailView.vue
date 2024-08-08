<script setup lang="ts">
import { ref, onMounted, defineProps } from 'vue';
import Passenger from '@/types/Passenger'
import PassengerService from '@/services/EventService';
const passenger = ref<Passenger>(null);
const props = defineProps({
    _id: {
        type: String,
        required: true
    }
})
onMounted(() => {
  PassengerService.getPassengerId(props._id)
    .then((response) => {
      passenger.value = response.data
    })
    .catch((error) => {
      console.error('There was an error!', error)
    })
})
</script>

<template>
  <div v-if="passenger">
    <h2><strong>ID:</strong> {{ passenger._id }}</h2>
    <h2><strong>Name:</strong> {{ passenger.name }}</h2>
    <h2><strong>Trips:</strong> {{ passenger.trips }}</h2>
  </div>
</template>