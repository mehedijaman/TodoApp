<template>
    <div>
      <h2 class="text-xl font-bold mb-2">Backlog</h2>
      <div class="flex mb-4">
        <input
          v-model="searchTerm"
          class="p-2 flex-1 border rounded"
          type="text"
          placeholder="Search"
        />
        <button
          @click="sortByDate"
          class="ml-2 p-2 bg-blue-500 text-white rounded"
        >
          Sort by Date
        </button>
        <button
          @click="sortByName"
          class="ml-2 p-2 bg-blue-500 text-white rounded"
        >
          Sort by Name
        </button>
      </div>
      <ul v-if="filteredBacklog.length">
        <li
          v-for="todo in filteredBacklog"
          :key="todo.id"
          class="flex justify-between items-center mb-2 p-2 bg-gray-100 border"
        >
          <div>
            <span>{{ todo.text }}</span>
            <p class="text-xs text-gray-500">{{ formatDate(todo.created_at) }}</p>
          </div>
          <button @click="() => handleMoveToList(todo)" class="text-blue-500">
            Move to List
          </button>
        </li>
      </ul>
      <p v-else>No backlog items found.</p>
    </div>
  </template>
  
  <script setup lang="ts">
  import { computed, ref, onMounted } from "vue";
  import { useTodos } from "@/stores/todos";
  
  const { backlog, moveToTodos } = useTodos();
  const searchTerm = ref("");
  
  const handleMoveToList = async (todo) => {
    console.log(`Moving todo with ID ${todo.id} to list`);
    await moveToTodos(todo);
  };
  
  const formatDate = (dateString) => {
    const options = {
      year: "numeric",
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    };
  
    const date = new Date(dateString);
  
    return date.toLocaleDateString("en-US", options);
  };
  
  const sortByDate = () => {
    backlog.sort((a, b) => new Date(a.created_at) - new Date(b.created_at));
  };
  
  const sortByName = () => {
    backlog.sort((a, b) => a.text.localeCompare(b.text));
  };
  
  const filteredBacklog = computed(() => {
    return backlog.filter((todo) =>
      todo.text.toLowerCase().includes(searchTerm.value.toLowerCase())
    );
  });
  
  onMounted(() => {
    // Initialize sorting
    sortByDate();
  });
  </script>
  
  <style scoped>
  /* Add any custom styles here */
  </style>
  
  