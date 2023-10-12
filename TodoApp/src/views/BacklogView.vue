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

  <div v-if="filteredBacklog.length">
    <div
      v-for="(todo, index) in filteredBacklog"
      :key="index"
      class="mb-10 flex justify-between"
    >
      <span class="flex items-center rounded cursor-pointer hover:bg-gray-100">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          class="w-6 h-6 text-blue-600"
          viewBox="0 0 512 512"
        >
          <path
            d="M464 256A208 208 0 1 0 48 256a208 208 0 1 0 416 0zM0 256a256 256 0 1 1 512 0A256 256 0 1 1 0 256z"
          />
        </svg>

        <span>
          <span class="ml-4 text-sm">{{ todo.text }}</span>
          <p class="text-xs text-gray-500 px-4">
            {{ formatDate(todo.created_at) }}
          </p>
        </span>
      </span>

      <button
        @click="() => handleMoveToList(todo)"
        class="p-2 text-sm font-medium text-center text-blue-900 bg-white rounded-lg hover:bg-gray-100 focus:ring-4 focus:outline-none dark:text-white focus:ring-gray-50 dark:bg-gray-800 dark:hover:bg-gray-700 dark:focus:ring-gray-600"
        type="button"
      >
        Move to List
      </button>
    </div>
  </div>
  <p v-else>No backlog items found.</p>
</template>

<script setup lang="ts">
import { useTodos } from "@/stores/todos";
import { ref, watch, computed } from "vue";
const { filterBacklog, setSearchTerm, setSortField, moveToTodos, sortBacklog } =
  useTodos();
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
