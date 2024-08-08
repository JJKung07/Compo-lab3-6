<script setup lang="ts">
import { ref, onMounted, defineProps } from 'vue'
import type { Airline } from '@/types'
import PassengerService from '@/services/EventService'
const airline = ref<Airline | null>(null)
const props = defineProps({
  airlineId: {
    type: String,
    required: true
  }
})
onMounted(async () => {
  try {
    const response = await PassengerService.getAirline(props.airlineId)
    airline.value = response.data
  } catch (error) {
    console.error('There was an error!', error)
  }
})
</script>

<template>
  <div v-if="airline">
    <h2><strong>Name:</strong> {{ airline.name }}</h2>
    <p><strong>Country:</strong> {{ airline.country }}</p>
    <p><strong>Slogan:</strong> {{ airline.slogan }}</p>
    <p><strong>Headquarters:</strong> {{ airline.head_quaters }}</p>
    <p>
      <strong>Website:</strong> <a :href="airline.website" target="_blank">{{ airline.website }}</a>
    </p>
    <p><strong>Established:</strong> {{ airline.established }}</p>
  </div>
</template>