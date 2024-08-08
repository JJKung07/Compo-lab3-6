<script setup lang="ts">
import { ref, onMounted } from 'vue'
import PassengerCard from '@/components/PassengerCard.vue'
import PassengerService from '@/services/PassengerService'

const passengers = ref([])

onMounted(async () => {
  try {
    const response = await PassengerService.getPassengers()
    passengers.value = response.data.data
  } catch (error) {
    console.error('Failed to fetch passengers', error)
  }
})
</script>

<template>
  <div class="passengers" v-for="passenger in passengers" :key="passenger._id">
    <PassengerCard :passenger="passenger" />
  </div>
</template>

<style scoped>
.passengers {
  display: flex;
  flex-direction: column;
  align-items: center;
}
</style>
