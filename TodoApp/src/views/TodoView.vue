<template>
  <div class="mb-4 border-b border-gray-200 dark:border-gray-700">
    <ul
      class="flex flex-wrap -mb-px text-sm font-medium text-center"
      id="myTab"
      data-tabs-toggle="#TodoAppTab"
      role="tablist"
    >
      <li class="mr-2" role="presentation">
        <button
          class="inline-block p-4 border-b-2 rounded-t-lg"
          id="todo-tab"
          data-tabs-target="#todo"
          type="button"
          role="tab"
          aria-controls="todo"
          aria-selected="false"
        >
          To Do List
        </button>
      </li>
      <li class="mr-2" role="presentation">
        <button
          class="inline-block p-4 border-b-2 border-transparent rounded-t-lg hover:text-gray-600 hover:border-gray-300 dark:hover:text-gray-300"
          id="backlog-tab"
          data-tabs-target="#backlog"
          type="button"
          role="tab"
          aria-controls="backlog"
          aria-selected="false"
        >
          Backlog
        </button>
      </li>
    </ul>
  </div>

  <div id="TodoAppTab">
    <div
      class="hidden p-4 rounded-lg bg-gray-50 dark:bg-gray-800"
      id="todo"
      role="tabpanel"
      aria-labelledby="todo-tab"
    >
      <div
        id="accordion-flush"
        data-accordion="collapse"
        data-active-classes="bg-white dark:bg-gray-900 text-gray-900 dark:text-white"
        data-inactive-classes="text-gray-500 dark:text-gray-400"
      >
        <h2 id="accordion-flush-heading-1">
          <button
            type="button"
            class="flex items-center justify-between w-full px-5 py-5 font-medium text-left text-gray-500 border-b border-gray-200 dark:border-gray-700 dark:text-gray-400"
            data-accordion-target="#accordion-flush-body-1"
            aria-expanded="true"
            aria-controls="accordion-flush-body-1"
          >
            <span>5 Done</span>
            <svg
              data-accordion-icon
              class="w-3 h-3 rotate-180 shrink-0"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 10 6"
            >
              <path
                stroke="currentColor"
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M9 5 5 1 1 5"
              />
            </svg>
          </button>
        </h2>
        <div
          id="accordion-flush-body-1"
          class="hidden"
          aria-labelledby="accordion-flush-heading-1"
        >
          <div v-for="todo in completedTodos" :key="todo.id">
            <input class="hidden" type="checkbox" id="task_1" checked />
            <label
              class="flex items-center h-10 px-2 rounded cursor-pointer hover:bg-gray-100"
              for="task_1"
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
              <p class="text-xs text-gray-500 px-2">
                {{ formatDate(todo.created_at) }}
              </p>
            </label>
          </div>
        </div>
      </div>
      <!-- / Accordion -->
      <hr />

      <div v-for="(todo, index) in todos" :key="index" class="mb-10">
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
          <span @click="handleMarkAsCompleted(todo)" class="ml-4 text-sm">{{
            todo.text
          }}</span>
          <p class="text-xs text-gray-500 px-2">
            {{ formatDate(todo.created_at) }}
          </p>

          <button
            :id="`dropdownMenuIconHorizontalButton-${index}`"
            :data-dropdown-toggle="`dropdownDotsHorizontal-${index}`"
            class="inline-flex items-center absolute right-0 p-2 text-sm font-medium text-center text-gray-900 bg-white rounded-lg hover:bg-gray-100 focus:ring-4 focus:outline-none dark:text-white focus:ring-gray-50 dark:bg-gray-800 dark:hover:bg-gray-700 dark:focus:ring-gray-600"
            type="button"
          >
            <svg
              class="w-5 h-5"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="currentColor"
              viewBox="0 0 16 3"
            >
              <path
                d="M2 0a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3Zm6.041 0a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3ZM14 0a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3Z"
              />
            </svg>
          </button>

          <!-- Dropdown menu -->
          <div
            :id="`dropdownDotsHorizontal-${index}`"
            class="z-10 bg-white divide-y divide-gray-100 rounded-lg shadow w-44 dark:bg-gray-700 dark:divide-gray-600"
          >
            <ul
              class="py-2 text-sm text-gray-700 dark:text-gray-200"
              :aria-labelledby="`dropdownMenuIconHorizontalButton-${index}`"
            >
              <li>
                <a
                  @click.prevent="handleRemoveTodo(todo.id)"
                  href="#"
                  class="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
                  >Delete</a
                >
              </li>
              <li>
                <a
                  @click.prevent="handleSetBacklog(todo)"
                  href="#"
                  class="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
                  >Move to Backlog</a
                >
              </li>
            </ul>
          </div>
        </label>
      </div>

      <form
        enctype="multipart/form-data"
        class="w-full grid grid-cols-12 gap-2 mt-10 fixed bottom-2"
      >
        <div class="col-span-8">
          <input
            v-model="newTodoText"
            @keyup.enter="handleAddTodo"
            class="w-full p-2 border focus:outline-none focus:border-green-200 focus:shadow-lg"
            type="text"
            name="task"
            placeholder="Enter new Task Description"
          />
        </div>
        <div class="col-span-4 flex items-center">
          <input
            @click.prevent="handleAddTodo"
            class="px-2 py-2 bg-sky-400 text-white rounded-md hover:bg-sky-500 hover:cursor-pointer"
            type="submit"
            name="submit"
            value="Add Item"
          />
        </div>
      </form>
    </div>
    <!-- /Tab Content -->

    <div
      class="hidden p-4 rounded-lg bg-gray-50 dark:bg-gray-800"
      id="backlog"
      role="tabpanel"
      aria-labelledby="backlog-tab"
    >
      <BacklogView />
    </div>
    <!-- /Tab Content -->
  </div>
</template>

<script setup lang="ts">
import { ref, watch } from "vue";
import { useTodos } from "@/stores/todos";
import BacklogView from "./BacklogView.vue";
import { storeToRefs } from "pinia";
const { todos, backlog, completedTodos } = storeToRefs(useTodos());
const { addTodo, removeTodo, addToBacklog, removeBacklog, markAsCompleted } =
  useTodos();
const newTodoText = ref("");

const handleAddTodo = () => {
  if (newTodoText.value.trim() !== "") {
    const created_at = new Date().toLocaleString();
    addTodo({ text: newTodoText.value, created_at });
    newTodoText.value = "";
  }
};

watch(todos, (newTodos) => {
  console.log("Updated todos:", newTodos);
});

const handleRemoveTodo = (id: number) => {
  console.log(`Removing todo with ID ${id}`);
  removeTodo(id);
  console.log(todos); // Verify if the todo was removed
};

const handleSetBacklog = (todo) => {
  console.log(`Setting todo with ID ${todo.id} to backlog`);
  addToBacklog(todo);
};

const handleMarkAsCompleted = (todo) => {
  console.log(`Marking todo with ID ${todo.id} as completed`);
  markAsCompleted(todo);
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

// Watch for changes in backlog
watch(backlog, (newBacklog) => {
  console.log("Updated backlog:", newBacklog);
});
</script>

<style scoped>
input[type="checkbox"]:checked + label span:first-of-type {
  background-color: #10b981;
  border-color: #10b981;
  color: #fff;
}

input[type="checkbox"]:checked + label span:nth-of-type(2) {
  text-decoration: line-through;
  color: #9ca3af;
}
</style>
