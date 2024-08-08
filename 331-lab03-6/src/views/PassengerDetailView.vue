<script setup lang="ts">
import { ref, onMounted } from 'vue';
import { useRoute } from 'vue-router';
import EventService from '@/services/EventService';

const route = useRoute();
const passenger = ref(null);

onMounted(async () => {
  try {
    const response = await EventService.getPassengerById(route.params.id as string);
    passenger.value = response.data;
  } catch (error) {
    console.error('Failed to fetch passenger details', error);
  }
});
</script>

<template>
  <div v-if="passenger">
    <h2>Passenger Details</h2>
    <p>Name: {{ passenger.name }}</p>
    <p>ID: {{ passenger._id }}</p>
    <p>Trips: {{ passenger.trips }}</p>
  </div>
  <div v-else>
    <p>Loading...</p>
  </div>
</template>

<style scoped>
</style>
