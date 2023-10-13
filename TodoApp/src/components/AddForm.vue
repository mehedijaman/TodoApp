<script setup lang="ts">
import { ref, watch } from "vue";
import { useTodos } from "@/stores/todos";

const newTodoText = ref("");

const {
  todos,
  addTodo,
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
</script>

<template>
    <form enctype="multipart/form-data" class="max-w-4xl w-full flex gap-2 mt-10 fixed bottom-6 pr-6">
        <input v-model="newTodoText" @keyup.enter="handleAddTodo" class="w-[80%] md:w-[90%] text-[15px] p-2 border-[#AAAAAA] focus:outline-none focus:border-[#AAAAAA] focus:shadow-lg rounded-md" type="text" name="task" placeholder="Enter new Task Description">
        <input @click.prevent="handleAddTodo" class="w-[20%] md:w-[10%]  text-[15px] text-white rounded-md bg-[#0080FF] hover:bg-[#41A0FF]  hover:cursor-pointer" type="submit" name="submit" value="Add Item">
    </form> 
</template>