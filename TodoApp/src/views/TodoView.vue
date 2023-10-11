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
    <ul>
      <li
        v-for="todo in todos"
        :key="todo.id"
        class="flex justify-between items-center mb-2 p-2 bg-gray-100 border"
      >
        <input
          type="radio"
          v-model="todo.done"
          @change="handleTodoStatusChange(todo)"
          class="mr-2"
        />
        <span>{{ todo.text }}</span>
        <button @click="handleRemoveTodo(todo.id)" class="text-red-500">
          Remove
        </button>
      </li>
    </ul>
    <h2 class="text-2xl font-bold mb-2">Done</h2>
    <ul>
      <li
        v-for="(todo, index) in doneTodos"
        :key="index"
        class="flex justify-between items-center mb-2 p-2 bg-green-100 border"
      >
        <span>{{ index + 1 }} Done - {{ todo.text }}</span>
      </li>
    </ul>
  </div>
</template>

<script setup lang="ts">
import { ref, watch } from "vue";
import { useTodos } from "@/stores/todos";

const newTodoText = ref("");
const { todos, addTodo, removeTodo } = useTodos();

const handleAddTodo = () => {
  if (newTodoText.value.trim() !== "") {
    addTodo(newTodoText.value);
    newTodoText.value = "";
  }
};

const handleRemoveTodo = (id: number) => {
  console.log(`Removing todo with ID ${id}`);
  removeTodo(id);
};

const handleTodoStatusChange = (todo) => {
  if (todo.done) {
    // Move todo to done section
    todos.value = todos.value.filter((t) => t !== todo);
    todo.text = todo.text; // Modify the text if needed
    doneTodos.value.push(todo);
  }
};

const doneTodos = ref([]);

// Watch for changes in todos
watch(todos, (newTodos) => {
  console.log("Updated todos:", newTodos);
});
</script>

<style scoped>
/* Add any custom styles here */
</style>
