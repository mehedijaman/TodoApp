<template>
  <div class="max-w-md mx-auto">
    <h1 class="text-2xl font-bold mb-4">Todo List</h1>
    <div class="flex mb-4">
      <input
        v-model="newTodoText"
        @keyup.enter="handleAddTodo"
        class="p-2 flex-1 border rounded"
        type="text"
        placeholder="Add a new todo"
      />
      <button
        @click="handleAddTodo"
        class="ml-2 p-2 bg-blue-500 text-white rounded"
      >
        Add
      </button>
    </div>
    <div class="mb-4">Completed Todos: {{ numCompletedTodos }}</div>
    <ul>
      <!-- Display Completed Todos -->
      <li
        v-for="todo in completedTodos"
        :key="todo.id"
        class="flex justify-between items-center mb-2 p-2 bg-green-100 border"
      >
        <div>
          <span
            ><s>{{ todo.text }}</s></span
          >
          <p class="text-xs text-gray-500">{{ formatDate(todo.created_at) }}</p>
        </div>
        <button @click="handleMarkAsIncomplete(todo)" class="text-blue-500">
          Mark as Incomplete
        </button>
      </li>

      <!-- Display Active Todos -->
      <li
        v-for="todo in todos"
        :key="todo.id"
        class="flex justify-between items-center mb-2 p-2 bg-gray-100 border"
      >
        <div>
          <span>{{ todo.text }}</span>
          <p class="text-xs text-gray-500">{{ formatDate(todo.created_at) }}</p>
        </div>
        <button @click="handleRemoveTodo(todo.id)" class="text-red-500">
          Remove
        </button>
        <button @click="handleSetBacklog(todo)" class="text-blue-500">
          Backlog
        </button>
        <button @click="handleMarkAsCompleted(todo)" class="text-green-500">
          Mark as Completed
        </button>
      </li>
    </ul>
  </div>
</template>

<script setup lang="ts">
import { ref, watch, computed } from "vue";
import { useTodos } from "@/stores/todos";

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
  markAsIncomplete, // New function to mark as incomplete
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

const handleMarkAsIncomplete = async (todo) => {
  console.log(`Marking todo with ID ${todo.id} as incomplete`);
  await markAsIncomplete(todo);
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

const numCompletedTodos = computed(() => completedTodos.length);

// Watch for changes in todos
watch(todos, (newTodos) => {
  console.log("Updated todos:", newTodos);
});

// Watch for changes in backlog
watch(backlog, (newBacklog) => {
  console.log("Updated backlog:", newBacklog);
});
</script>

<style scoped>
/* Add any custom styles here */
</style>
