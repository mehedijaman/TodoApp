<script setup lang="ts">
import { ref, watch } from "vue";
import { useTodos } from "@/stores/todos";
import BacklogView from './BacklogView.vue';

const newTodoText = ref("");

const {
  todos,
  backlog,
  completedTodos,
  addTodo,
  removeTodo,
  addToBacklog,
  removeBacklog,
  markAsCompleted,
  markAsPending,
  countTotalCompleted
} = useTodos();

const handleAddTodo = () => {
  if (newTodoText.value.trim() !== "") {
    const created_at = new Date().toLocaleString();
    addTodo({ text: newTodoText.value, created_at, state: "todo" });
    newTodoText.value = "";
  }
};

const handleRemoveTodo = (id: number) => {
  console.log(`Removing todo with ID ${id}`);
  removeTodo(id);
};

const handleSetBacklog = (todo) => {
  console.log(`Setting todo with ID ${todo.id} to backlog`);
  addToBacklog(todo);
};

const handleMarkAsCompleted = (todo) => {
  console.log(`Marking todo with ID ${todo.id} as completed`);
  markAsCompleted(todo);
};

const handleMarkAsPending = (todo) => {
  console.log(`Undo todo with ID ${todo.id} as Pending`);
  markAsPending(todo);
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

// Watch for changes in todos
watch(todos, (newTodos) => {
  console.log("Updated todos:", newTodos);
});

// Watch for changes in backlog
watch(backlog, (newBacklog) => {
  console.log("Updated backlog:", newBacklog);
});

</script>

<template>
  <div class="mb-4 border-b border-gray-200 dark:border-gray-700">
      <ul class="flex flex-wrap -mb-px text-sm font-medium text-center" id="myTab" data-tabs-toggle="#TodoAppTab" role="tablist">
          <li class="mr-2" role="presentation">
              <button class="inline-block p-4 border-b-2 rounded-t-lg" id="todo-tab" data-tabs-target="#todo" type="button" role="tab" aria-controls="todo" aria-selected="false">To Do List </button>
          </li>
          <li class="mr-2" role="presentation">
              <button class="inline-block p-4 border-b-2 border-transparent rounded-t-lg hover:text-gray-600 hover:border-gray-300 dark:hover:text-gray-300" id="backlog-tab" data-tabs-target="#backlog" type="button" role="tab" aria-controls="backlog" aria-selected="false">Backlog</button>
          </li>
      </ul>
  </div>
  
  <div id="TodoAppTab">
      <div class="hidden p-4 rounded-lg bg-gray-50 dark:bg-gray-800" id="todo" role="tabpanel" aria-labelledby="todo-tab">
        <div id="accordion-flush" data-accordion="collapse" data-active-classes="bg-white dark:bg-gray-900 text-gray-900 dark:text-white" data-inactive-classes="text-gray-500 dark:text-gray-400">
          <h2 id="accordion-flush-heading-1">
            <button type="button" class="flex items-center justify-between w-full px-5 py-5 font-medium text-left text-gray-500 border-b border-gray-200 dark:border-gray-700 dark:text-gray-400" data-accordion-target="#accordion-flush-body-1" aria-expanded="true" aria-controls="accordion-flush-body-1">
              <span>{{ countTotalCompleted }} Done</span>
              <svg data-accordion-icon class="w-3 h-3 rotate-180 shrink-0" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 10 6">
                <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5 5 1 1 5"/>
              </svg>
            </button>
          </h2>
          <div id="accordion-flush-body-1" class="hidden" aria-labelledby="accordion-flush-heading-1">
            <div v-for="todo in completedTodos" :key="todo.id">
              <label @click="handleMarkAsPending(todo)" class="flex items-center h-10 px-2 rounded cursor-pointer hover:bg-gray-100">
                <svg  xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" class="w-6 h-6 text-blue-700">
                  <path fill-rule="evenodd" d="M8.603 3.799A4.49 4.49 0 0112 2.25c1.357 0 2.573.6 3.397 1.549a4.49 4.49 0 013.498 1.307 4.491 4.491 0 011.307 3.497A4.49 4.49 0 0121.75 12a4.49 4.49 0 01-1.549 3.397 4.491 4.491 0 01-1.307 3.497 4.491 4.491 0 01-3.497 1.307A4.49 4.49 0 0112 21.75a4.49 4.49 0 01-3.397-1.549 4.49 4.49 0 01-3.498-1.306 4.491 4.491 0 01-1.307-3.498A4.49 4.49 0 012.25 12c0-1.357.6-2.573 1.549-3.397a4.49 4.49 0 011.307-3.497 4.49 4.49 0 013.497-1.307zm7.007 6.387a.75.75 0 10-1.22-.872l-3.236 4.53L9.53 12.22a.75.75 0 00-1.06 1.06l2.25 2.25a.75.75 0 001.14-.094l3.75-5.25z" clip-rule="evenodd" />
                </svg>
                <span>
                  <span class="ml-4 text-sm">{{ todo.text }}</span>
                  <p class="text-xs text-gray-500 px-2">{{ formatDate(todo.created_at) }}</p>
                </span>
              </label>	
            </div>
          </div>  
        </div>
        <!-- / Accordion -->
        <hr>
    
        <div v-for="(todo, index) in todos" :key="index" class="mb-10 flex justify-between">          
          <span @click="handleMarkAsCompleted(todo)" class="flex items-center rounded cursor-pointer hover:bg-gray-100">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" class="w-6 h-6">
              <path fill-rule="evenodd" d="M17.303 5.197A7.5 7.5 0 006.697 15.803a.75.75 0 01-1.061 1.061A9 9 0 1121 10.5a.75.75 0 01-1.5 0c0-1.92-.732-3.839-2.197-5.303zm-2.121 2.121a4.5 4.5 0 00-6.364 6.364.75.75 0 11-1.06 1.06A6 6 0 1118 10.5a.75.75 0 01-1.5 0c0-1.153-.44-2.303-1.318-3.182zm-3.634 1.314a.75.75 0 01.82.311l5.228 7.917a.75.75 0 01-.777 1.148l-2.097-.43 1.045 3.9a.75.75 0 01-1.45.388l-1.044-3.899-1.601 1.42a.75.75 0 01-1.247-.606l.569-9.47a.75.75 0 01.554-.68z" clip-rule="evenodd" />
            </svg>

            <span>
              <span class="ml-4 text-sm">{{ todo.text }}</span>
              <p class="text-xs text-gray-500 px-4"> {{ formatDate(todo.created_at) }}</p>
            </span>
          </span>

          
          <button :id="`dropDownMenuBtn-${index}`" :data-dropdown-toggle="`dropdownDotsHorizontal-${index}`" class="inline-flex items-end p-2 text-sm font-medium text-center text-gray-900 bg-white rounded-lg hover:bg-gray-100 focus:ring-4 focus:outline-none dark:text-white focus:ring-gray-50 dark:bg-gray-800 dark:hover:bg-gray-700 dark:focus:ring-gray-600" type="button"> 
            <svg class="w-5 h-5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 16 3">
              <path d="M2 0a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3Zm6.041 0a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3ZM14 0a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3Z"/>
            </svg>
          </button>
          <!-- Dropdown menu -->
          <div :id="`dropdownDotsHorizontal-${index}`" class="z-10 hidden bg-white divide-y divide-gray-100 rounded-lg shadow w-44 dark:bg-gray-700 dark:divide-gray-600">
              <ul class="py-2 text-sm text-gray-700 dark:text-gray-200" :aria-labelledby="`dropDownMenuBtn-${index}`">
                <li>
                  <a @click.prevent="handleRemoveTodo(todo.id)" href="#" class="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">Delete</a>
                </li>
                <li>
                  <a @click.prevent="handleSetBacklog(todo)" href="#" class="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">Move to Backlog</a>
                </li>
              </ul>
          </div>
        </div>



        <form enctype="multipart/form-data" class="w-full grid grid-cols-12 gap-2 mt-10 fixed bottom-2">
            <div class="col-span-8">
                <input v-model="newTodoText" @keyup.enter="handleAddTodo" class="w-full p-2 border focus:outline-none focus:border-green-200 focus:shadow-lg" type="text" name="task" placeholder="Enter new Task Description">
            </div>
            <div class="col-span-4 flex items-center">
                <input @click.prevent="handleAddTodo" class="px-2 py-2 bg-sky-400 text-white rounded-md hover:bg-sky-500  hover:cursor-pointer" type="submit" name="submit" value="Add Item">
            </div>
        </form> 
      </div>
      <!-- /Tab Content -->

      <div class="hidden p-4 rounded-lg bg-gray-50 dark:bg-gray-800" id="backlog" role="tabpanel" aria-labelledby="backlog-tab">
        <BacklogView/>
      </div>
      <!-- /Tab Content -->
  </div>
</template>


<style scoped>

</style>
