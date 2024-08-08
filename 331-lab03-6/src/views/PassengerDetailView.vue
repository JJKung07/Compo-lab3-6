<script setup lang="ts">
import { ref, onMounted, defineProps } from 'vue'
import type { Passenger, Airline } from '@/types'
import PassengerService from '@/services/EventService'

const passenger = ref<Passenger | null>(null)
const airlines = ref<Airline[]>([])
const props = defineProps({
  _id: {
    type: String,
    required: true
  }
})
onMounted(async () => {
  try {
    const response = await PassengerService.getPassengerId(props._id)
    passenger.value = response.data

    // Ensure passenger and airline data exist
    if (passenger.value?.airline && Array.isArray(passenger.value.airline)) {
      // Fetch the airline details
      const airlinePromises = passenger.value.airline.map((airline) =>
        PassengerService.getAirline(airline._id).then((res) => res.data)
      )
      airlines.value = await Promise.all(airlinePromises)
    }
  } catch (error) {
    console.error('There was an error!', error)
  }
})
</script>

<template>
  <div v-if="passenger">
    <h1>Personal Information</h1>
    <h2><strong>ID:</strong> {{ passenger._id }}</h2>
    <h2><strong>Name:</strong> {{ passenger.name }}</h2>
    <h2><strong>Trips:</strong> {{ passenger.trips }}</h2>
    &nbsp;
    <h1>Airline Information</h1>
    <div v-for="airline in airlines" :key="airline._id">
      <h3>{{ airline.name }}</h3>
      <img :src="airline.logo" :alt="airline.name" />
      <p><strong>Country:</strong> {{ airline.country }}</p>
      <p><strong>Slogan:</strong> {{ airline.slogan }}</p>
      <p><strong>Headquarters:</strong> {{ airline.head_quaters }}</p>
      <p>
        <strong>Website:</strong>
        <a :href="airline.website" target="_blank">{{ airline.website }}</a>
      </p>
      <p><strong>Established:</strong> {{ airline.established }}</p>
    </div>
  </div>
  <router-link to="/">Go to Home</router-link>
</template>