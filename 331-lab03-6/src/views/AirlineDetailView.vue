<script setup lang="ts">
import { ref, onMounted, defineProps } from 'vue';
import type { Airline } from '@/types';
import PassengerService from '@/services/PassengerService';

const airline = ref<Airline | null>(null);
const error = ref<string | null>(null);
const props = defineProps({
    airlineId: {
        type: String,
        required: true
    }
});

onMounted(async () => {
  try {
    const response = await PassengerService.getAirline(props.airlineId);
    if (response.data) {
      airline.value = response.data;
    } else {
      error.value = 'Airline not found';
    }
  } catch (error) {
    console.error('There was an error!', error);
    error.value = 'Airline not found';
  }
});
</script>

<template>
  <div v-if="error">
    <h2>{{ error }}</h2>
    <router-link to="/">Go to Home</router-link>
  </div>
  <div v-else-if="airline">
    <h2><strong>Name:</strong> {{ airline.name }}</h2>
    <img :src="airline.logo" :alt="airline.name" />
    <p><strong>Country:</strong> {{ airline.country }}</p>
    <p><strong>Slogan:</strong> {{ airline.slogan }}</p>
    <p><strong>Headquarters:</strong> {{ airline.head_quaters }}</p>
    <p><strong>Website:</strong> <a :href="airline.website" target="_blank">{{ airline.website }}</a></p>
    <p><strong>Established:</strong> {{ airline.established }}</p>
  </div>
</template>
