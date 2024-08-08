<script setup lang="ts">
import Passenger from '@/types/Passenger'
import { useRouter } from 'vue-router'
const props = defineProps<{
  passenger: Passenger
}>();

const router = useRouter();
const navigateToPassengerDetail = () => {
  router.push({ name: 'passenger-detail', params: { id: props.passenger._id } });
};
</script>


<template>
    <div class="event-card" @click="navigateToPassengerDetail">
      <h3>Name: {{ passenger.name }}</h3>
      <h3>ID: {{ passenger._id }}</h3>
      <h3>Trips: {{ passenger.trips }}</h3>
    </div>
</template>

<style scoped>
.event-card {
  padding: 20px;
  width: auto;
  cursor: pointer;
  border: 1px solid #39495c;
  margin-bottom: 18px;
}
.event-card:hover {
  transform: scale(1.01);
  box-shadow: 0 3px 12px 0 rgba(0, 0, 0, 0.2);
}
.event-link {
  text-decoration: none;
  color: #2c3e50;
}
</style>
