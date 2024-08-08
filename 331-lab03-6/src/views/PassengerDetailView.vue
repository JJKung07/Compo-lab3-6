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
  <div>
    <div v-if="error" class="error-message">
      <h2>{{ error }}</h2>
      <router-link to="/">Go to Home</router-link>
    </div>
    <div v-else-if="passenger">
      <nav class="navigation">
        <router-link :to="{ name: 'passenger-detail-view' }">Details</router-link> |
        <router-link :to="{ name: 'passenger-edit-view' }">Edit</router-link>
      </nav>
      <div class="personal-info">
        <h1>Personal Information</h1>
        <h2><strong>ID:</strong> {{ passenger._id }}</h2>
        <h2><strong>Name:</strong> {{ passenger.name }}</h2>
        <h2><strong>Trips:</strong> {{ passenger.trips }}</h2>
      </div>
      <div class="airline-info">
        <h1>Airline Information</h1>
        <div v-for="airline in passenger.airline" :key="airline._id" class="airline">
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
    </div>
  </div>
</template>

<style scoped>
.error-message {
  background-color: #f8d7da;
  color: #721c24;
  padding: 1rem;
  text-align: center;
  margin-bottom: 1rem;
  border: 1px solid #f5c6cb;
  border-radius: 0.25rem;
}

.navigation {
  text-align: center;
  margin-bottom: 1rem;
}

.navigation a {
  padding: 0 1rem;
  font-weight: bold;
  color: #2c3e50;
}

.navigation a.router-link-exact-active {
  color: #42b983;
}

.personal-info,
.airline-info {
  text-align: center;
  margin-bottom: 2rem;
}

.airline {
  margin-bottom: 1rem;
}

.airline img {
  max-width: 100px;
  display: block;
  margin: 0.5rem auto;
}

@media (min-width: 1024px) {
    #app {
        display: grid;
        grid-template-columns: 1fr;
        padding: 0 2rem;
    }
}
</style>