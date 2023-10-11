<template>
  <div>
    <nav class="bg-blue-500 p-4 text-white">
      <div class="container mx-auto flex justify-between items-center">
        <div>
          <RouterLink to="/todos" class="mr-4">TodoList</RouterLink>
          <RouterLink to="/backlog">Backlog</RouterLink>
        </div>
      </div>
    </nav>

    <div class="container mt-8">
      <RouterView />
    </div>
  </div>
</template>

<script setup lang="ts">
import { RouterLink, RouterView } from "vue-router";
</script>

<style scoped>
/* Add any additional custom styles here */
</style>
