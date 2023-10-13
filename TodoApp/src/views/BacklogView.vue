<template>
  <form
    enctype="multipart/form-data"
    class="flex flex-col md:flex-row gap-2 mb-10"
  >
    <!-- <div class="col-span-8"> -->
      <input
        v-model="searchTerm"
        class="md:w-[65%] p-2 border focus:outline-none focus:border-green-200 focus:shadow-lg rounded-md"
        type="text"
        name="task"
        placeholder="Search"
      />
    <!-- </div> -->
    <div class="flex justify-center">
      <button
        @click="handleSortByName"
        type="button"
        class="justify-center col-span-2 text-white text-[15px] bg-[#0080FF] hover:bg-[#41A0FF] focus:ring-4 focus:outline-none focus:ring-blue-300 rounded-lg px-5 py-2.5 text-center inline-flex items-center mr-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
      >
        Sort by Name
      </button>

      <button
        @click="handleSortByDate"
        type="button"
        class="justify-center col-span-2 text-white text-[15px] bg-[#0080FF] hover:bg-[##41A0FF] focus:ring-4 focus:outline-none focus:ring-blue-300 rounded-lg px-5 py-2.5 text-center inline-flex items-center mr-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
      >
        Sort by Date
      </button>
    </div>
  </form>

  <div v-if="filteredBacklog.length">
    <div
      v-for="(todo, index) in filteredBacklog"
      :key="index"
      class="mb-2 flex justify-between"
    >
      <span class="flex items-center rounded cursor-pointer hover:bg-gray-100">
        <svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" class="w-5 h-5 text-[#AAAAAA]" viewBox="0 0 16 16">
          <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14zm0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16z"/>
        </svg>

        <span>
          <span class="ml-4 text-[15px]" >{{ todo.text }}</span>
          <p class="text-[10px] text-gray-500 px-4">
            {{ formatDate(todo.created_at) }}
          </p>
        </span>
      </span>

      <button
        @click="() => handleMoveToList(todo)"
        class="h-8 px-2 text-[15px] text-center text-[#0080FF] ring-1 ring-[#AAAAAA] bg-white rounded-lg hover:bg-gray-100 focus:ring-4 focus:outline-none dark:text-white focus:ring-gray-50 dark:bg-gray-800 dark:hover:bg-gray-700 dark:focus:ring-gray-600"
        type="button"
      >
        Move to List
      </button>
    </div>
  </div>
  <p v-else class="text-[15px]">No backlog items found.</p>
  <AddForm></AddForm>
</template>

<script setup lang="ts">
import { useTodos } from "@/stores/todos";
import { ref, watch, computed } from "vue";
const { filterBacklog, setSearchTerm, setSortField, moveToTodos, sortBacklog } =
  useTodos();
import { storeToRefs } from "pinia";
import AddForm from '@/components/AddForm.vue';


const { backlog } = storeToRefs(useTodos());

const searchTerm = ref("");

const handleMoveToList = (todo) => {
  moveToTodos(todo);
};

const handleSortByDate = () => {
  setSortField("date");
  sortBacklog();
};

const handleSortByName = () => {
  setSortField("name");
  sortBacklog();
};

const formatDate = (dateString: string) => {
  const options = {
    year: "numeric",
    month: "short",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  };
  return new Date(dateString).toLocaleDateString("en-US", options);
};

const filteredBacklog = computed(() => {
  return backlog.value.filter((todo) =>
    todo.text.toLowerCase().includes(searchTerm.value.toLowerCase())
  );
});
</script>

<style scoped>
/* Your custom styles here */
</style>
