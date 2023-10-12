<script setup lang="ts">
import { ref, watch } from "vue";
import { useTodos } from "@/stores/todos";
import BacklogView from "./BacklogView.vue";
import { storeToRefs } from "pinia";

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
} = useTodos();

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

// Watch for changes in backlog
watch(backlog, (newBacklog) => {
  console.log("Updated backlog:", newBacklog);
});

/* Toggle Dropdown */
// const openDropdownIndexes = ref([]);
// const toggleDropdown = (index:number) => {
//   // Check if the dropdown is already open
//   const isOpen = openDropdownIndexes.value.includes(index);

//   if (isOpen) {
//     // If it's open, close it by removing it from the array
//     openDropdownIndexes.value = openDropdownIndexes.value.filter(i => i !== index);
//   } else {
//     // If it's closed, open it by adding it to the array
//     openDropdownIndexes.value = [...openDropdownIndexes.value, index];
//   }
// };
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
                <span>0 Done</span>
                <svg data-accordion-icon class="w-3 h-3 rotate-180 shrink-0" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 10 6">
                  <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5 5 1 1 5"/>
                </svg>
              </button>
            </h2>
            <div id="accordion-flush-body-1" class="hidden" aria-labelledby="accordion-flush-heading-1">
              <div v-for="todo in completedTodos" :key="todo.id">
                <label @click="handleMarkAsPending(todo)" class="flex items-center h-10 px-2 rounded cursor-pointer hover:bg-gray-100">
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" class="w-6 h-6 text-blue-600">
                    <path fill-rule="evenodd" d="M2.25 12c0-5.385 4.365-9.75 9.75-9.75s9.75 4.365 9.75 9.75-4.365 9.75-9.75 9.75S2.25 17.385 2.25 12zm13.36-1.814a.75.75 0 10-1.22-.872l-3.236 4.53L9.53 12.22a.75.75 0 00-1.06 1.06l2.25 2.25a.75.75 0 001.14-.094l3.75-5.25z" clip-rule="evenodd" />
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
          <hr class="my-4">
      
          <div v-for="(todo, index) in todos" :key="index" class="mb-10 flex justify-between">          
            <span @click="handleMarkAsCompleted(todo)" class="flex items-center rounded cursor-pointer hover:bg-gray-100">
              <svg xmlns="http://www.w3.org/2000/svg" class="w-6 h-6 text-blue-600" viewBox="0 0 512 512">
                <path d="M464 256A208 208 0 1 0 48 256a208 208 0 1 0 416 0zM0 256a256 256 0 1 1 512 0A256 256 0 1 1 0 256z"/>
              </svg>

              <span>
                <span class="ml-4 text-sm">{{ todo.text }}</span>
                <p class="text-xs text-gray-500 px-4"> {{ formatDate(todo.created_at) }}</p>
              </span>
            </span>

            
            <!-- <button @click="toggleDropdown(index)" :id="`dropDownMenuBtn-${index}`" :data-dropdown-toggle="`dropdownDotsHorizontal-${index}`" class="inline-flex items-end p-2 text-sm font-medium text-center text-gray-900 bg-white rounded-lg hover:bg-gray-100 focus:ring-4 focus:outline-none dark:text-white focus:ring-gray-50 dark:bg-gray-800 dark:hover:bg-gray-700 dark:focus:ring-gray-600" type="button"> 
              <svg class="w-5 h-5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 16 3">
                <path d="M2 0a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3Zm6.041 0a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3ZM14 0a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3Z"/>
              </svg>
            </button>
            <div :id="`dropdownDotsHorizontal-${index}`" class="z-10 hidden bg-white divide-y divide-gray-100 rounded-lg shadow w-44 dark:bg-gray-700 dark:divide-gray-600">
                <ul class="py-2 text-sm text-gray-700 dark:text-gray-200" :aria-labelledby="`dropDownMenuBtn-${index}`">
                  <li>
                    <a @click.prevent="handleRemoveTodo(todo.id)" href="#" class="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">Delete</a>
                  </li>
                  <li>
                    <a @click.prevent="handleSetBacklog(todo)" href="#" class="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">Move to Backlog</a>
                  </li>
                </ul>
            </div> -->
            <span class="flex">
              <button @click.prevent="handleSetBacklog(todo)">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6 text-blue-500">
                  <path stroke-linecap="round" stroke-linejoin="round" d="M15 15l6-6m0 0l-6-6m6 6H9a6 6 0 000 12h3" />
                </svg>            
              </button>
              <button @click.prevent="handleRemoveTodo(todo.id)" >
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6 text-red-500">
                  <path stroke-linecap="round" stroke-linejoin="round" d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0" />
                </svg>
              </button>
            </span>
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

<style scoped></style>
