<template>
  <form
    enctype="multipart/form-data"
    class="w-full grid grid-cols-12 gap-2 mb-10"
  >
    <div class="col-span-6">
      <input
        v-model="searchTerm"
        class="w-full p-2 border focus:outline-none focus:border-green-200 focus:shadow-lg rounded-md"
        type="text"
        name="task"
        placeholder="Search"
      />
    </div>
    <button
      @click="handleSortByName"
      type="button"
      class="col-span-3 w-full text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center mr-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800 text-xs"
    >
      <svg
        class="w-[18px] h-[18px] text-white dark:text-white"
        aria-hidden="true"
        xmlns="http://www.w3.org/2000/svg"
        fill="currentColor"
        viewBox="0 0 24 24"
      >
        <path
          d="M8.574 11.024h6.852a2.075 2.075 0 0 0 1.847-1.086 1.9 1.9 0 0 0-.11-1.986L13.736 2.9a2.122 2.122 0 0 0-3.472 0L6.837 7.952a1.9 1.9 0 0 0-.11 1.986 2.074 2.074 0 0 0 1.847 1.086Zm6.852 1.952H8.574a2.072 2.072 0 0 0-1.847 1.087 1.9 1.9 0 0 0 .11 1.985l3.426 5.05a2.123 2.123 0 0 0 3.472 0l3.427-5.05a1.9 1.9 0 0 0 .11-1.985 2.074 2.074 0 0 0-1.846-1.087Z"
        />
      </svg>
      Name
    </button>

    <button
      @click="handleSortByDate"
      type="button"
      class="col-span-3 w-full text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center mr-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800 text-xs"
    >
      <svg
        class="w-[18px] h-[18px] text-white dark:text-white"
        aria-hidden="true"
        xmlns="http://www.w3.org/2000/svg"
        fill="currentColor"
        viewBox="0 0 24 24"
      >
        <path
          d="M8.574 11.024h6.852a2.075 2.075 0 0 0 1.847-1.086 1.9 1.9 0 0 0-.11-1.986L13.736 2.9a2.122 2.122 0 0 0-3.472 0L6.837 7.952a1.9 1.9 0 0 0-.11 1.986 2.074 2.074 0 0 0 1.847 1.086Zm6.852 1.952H8.574a2.072 2.072 0 0 0-1.847 1.087 1.9 1.9 0 0 0 .11 1.985l3.426 5.05a2.123 2.123 0 0 0 3.472 0l3.427-5.05a1.9 1.9 0 0 0 .11-1.985 2.074 2.074 0 0 0-1.846-1.087Z"
        />
      </svg>
      Date
    </button>
  </form>

  <div v-if="backlog.length">
    <div v-for="todo in backlog" :key="todo.id" class="mb-10">
      <input class="hidden" type="checkbox" id="task_5" />
      <label
        class="flex items-center h-10 px-2 rounded cursor-pointer hover:bg-gray-100"
        for="task_5"
      >
        <span
          class="flex items-center justify-center w-5 h-5 text-transparent border-2 border-gray-300 rounded-full"
        >
          <svg
            class="w-4 h-4 fill-current"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 20 20"
            fill="currentColor"
          >
            <path
              fill-rule="evenodd"
              d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
              clip-rule="evenodd"
            />
          </svg>
        </span>
        <span class="ml-4 text-sm">{{ todo.text }}</span>

        <button
          @click="() => handleMoveToList(todo)"
          class="inline-flex items-center absolute right-2 p-2 text-sm font-medium text-center text-blue-900 bg-white rounded-lg hover:bg-gray-100 focus:ring-4 focus:outline-none dark:text-white focus:ring-gray-50 dark:bg-gray-800 dark:hover:bg-gray-700 dark:focus:ring-gray-600"
          type="button"
        >
          Move to List
        </button>
      </label>
    </div>
  </div>
  <p v-else>No backlog items found.</p>
</template>

<script setup lang="ts">
import { useTodos } from "@/stores/todos";
import { ref, watch } from "vue";
const {
  filteredBacklog,
  filterBacklog,
  sortedBacklog,
  setSearchTerm,
  setSortField,
  moveToTodos,
  sortBacklog,
} = useTodos();
import { storeToRefs } from "pinia";
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

watch(searchTerm, (newSearchTerm) => {
  setSearchTerm(newSearchTerm);
  if (!newSearchTerm.trim()) {
    filterBacklog();
  }
  filterBacklog();
});
</script>

<style scoped>
/* Your custom styles here */
</style>
