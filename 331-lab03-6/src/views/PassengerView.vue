<script setup lang="ts">
import { ref, onMounted } from 'vue'
import PassengerCard from '@/components/PassengerCard.vue'
import PassengerService from '@/services/PassengerService'

const passengers = ref([])
const currentPage = ref(0)
const totalPages = ref(0)

const fetchPassengers = async (page: number) => {
  try {
    const response = await PassengerService.getPassengers(page, 20)  // Fetch 20 passengers for 10 rows x 2 columns
    passengers.value = response.data.data
    totalPages.value = Math.ceil(response.data.totalPassengers / 20)  // Assuming the API response includes total passengers
  } catch (error) {
    console.error('Failed to fetch passengers', error)
  }
}

onMounted(() => {
  fetchPassengers(currentPage.value)
})

const nextPage = () => {
  if (currentPage.value < totalPages.value - 1) {
    currentPage.value += 1
    fetchPassengers(currentPage.value)
  }
}

const prevPage = () => {
  if (currentPage.value > 0) {
    currentPage.value -= 1
    fetchPassengers(currentPage.value)
  }
}
</script>

<template>
  <div class="passengers">
    <div class="passenger-grid">
      <PassengerCard v-for="passenger in passengers" :key="passenger._id" :passenger="passenger" />
    </div>
    <div class="pagination">
      <button @click="prevPage" :disabled="currentPage === 0">Previous</button>
      <span>Page {{ currentPage + 1 }} of {{ totalPages }}</span>
      <button @click="nextPage" :disabled="currentPage >= totalPages - 1">Next</button>
    </div>
  </div>
</template>

<style scoped>
.passengers {
  display: flex;
  flex-direction: column;
  align-items: center;
}
</style>
