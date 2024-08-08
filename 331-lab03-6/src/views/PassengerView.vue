<script setup lang="ts">
import { ref, onMounted } from 'vue';
import PassengerCard from '@/components/PassengerCard.vue';
import EventService from '@/services/EventService';
const passengers = ref([]);
onMounted(async () => {
  try {
    const response = await EventService.getPassenger();
    passengers.value = response.data.data;
  } catch (error) {
    console.error('Failed to fetch passengers', error);
  }
});
</script>

<template>
  <div v-for="passenger in passengers" :key="passenger._id">
    <PassengerCard :passenger="passenger" />
  </div>
</template>

<style scoped>
</style>