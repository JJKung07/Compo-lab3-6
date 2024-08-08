<script setup lang="ts">
import Passenger from '@/types/Passenger';
defineProps<{
  passenger: Passenger
}>()
</script>

<template>
    <div class="event-card">
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
