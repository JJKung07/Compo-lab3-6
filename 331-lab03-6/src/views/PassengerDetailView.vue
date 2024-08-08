<script setup lang="ts">
import { ref, onMounted, defineProps } from 'vue';
import type { Passenger } from '@/types';
import PassengerService from '@/services/PassengerService';

const passenger = ref<Passenger | null>(null);
const error = ref<string | null>(null);
const props = defineProps({
    _id: {
        type: String,
        required: true
    }
});

onMounted(async () => {
  try {
    const response = await PassengerService.getPassenger(props._id);
    if (response.data) {
      passenger.value = response.data;
    } else {
      error.value = 'Passenger does not exist';
    }
  } catch (error) {
    console.error('There was an error!', error);
    error.value = 'Passenger does not exist';
  }
});
</script>

<template>
  <div v-if="error">
    <h2>{{ error }}</h2>
    <router-link to="/">Go to Home</router-link>
  </div>
  <div v-else-if="passenger">
    <h1>Personal Information</h1>
    <h2><strong>ID:</strong> {{ passenger._id }}</h2>
    <h2><strong>Name:</strong> {{ passenger.name }}</h2>
    <h2><strong>Trips:</strong> {{ passenger.trips }}</h2>
    &nbsp;
    <h1>Airline Information</h1>
    <div v-for="airline in passenger.airline" :key="airline._id">
      <h3>{{ airline.name }}</h3>
      <img :src="airline.logo" :alt="airline.name" />
      <p><strong>Country:</strong> {{ airline.country }}</p>
      <p><strong>Slogan:</strong> {{ airline.slogan }}</p>
      <p><strong>Headquarters:</strong> {{ airline.head_quaters }}</p>
      <p><strong>Website:</strong> <a :href="airline.website" target="_blank">{{ airline.website }}</a></p>
      <p><strong>Established:</strong> {{ airline.established }}</p>
    </div>
  </div>
</template>
