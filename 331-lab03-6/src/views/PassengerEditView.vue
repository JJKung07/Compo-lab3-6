<script setup lang="ts">
import { defineProps } from 'vue'
import { useRouter } from 'vue-router'
import { useMessageStore } from '@/stores/message'
import { storeToRefs } from 'pinia'

// Define the props
const props = defineProps({
  _id: {
    type: String,
    required: true
  }
})

// Initialize the router
const router = useRouter()

// Get the store and refs
const store = useMessageStore()
const { message } = storeToRefs(store)

// Edit function to update the message and navigate
const edit = () => {
  const updateMessage = `The update is in progress for ${props._id}`
  store.updateMessage(updateMessage)

  setTimeout(() => {
    store.resetMessage()
  }, 5000)

  setTimeout(() => {
    router.push({ name: 'passenger-view', params: { id: props._id } })
  }, 5000)
}
</script>

<template>
  <div style="display: flex; flex-direction: column">
    <div id="flashMessage" v-if="message">
      <h4>{{ message }}</h4>
    </div>
    <nav style="text-align: center">
      <router-link :to="{ name: 'passenger-detail-view' }">Details</router-link> |
      <router-link :to="{ name: 'passenger-edit-view' }">Edit</router-link>
    </nav>
    <div style="display: flex; justify-content: center">
      <button @click="edit">Edit</button>
    </div>
  </div>
</template>

<style scoped>

nav {
  margin-bottom: 1rem;
}
nav a {
  padding: 0 1rem;
  font-weight: bold;
  color: #2c3e50;
}
nav a.router-link-exact-active {
  color: #42b983;
}
button {
  padding: 0.5rem 1rem;
  background-color: #42b983;
  color: white;
  border: none;
  cursor: pointer;
}
button:hover {
  background-color: #369a76;
}
@keyframes yellofade {
    from {
      background-color: yellow;
    }

    to {
      background-color: transparent;
    }
  }

  #flashMessage {
    animation: yellofade 3s ease-in-out;
  }
</style>