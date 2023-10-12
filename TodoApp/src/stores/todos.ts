import { defineStore } from "pinia";
import {ref,reactive } from 'vue';

interface Todo {
  id: number;
  text: string;
  created_at: string;
  state: string;
}

export const useTodos = defineStore("todos", {
  state: () => ({
    todos: reactive([] as Todo[]),
    backlog: reactive([] as Todo[]),
    completedTodos: reactive([] as Todo[]), // New array for completed todos
  }),
  getters:{
    countTotalCompleted: (state) => state.completedTodos.length as number,
  },
  actions: {
    addTodo(todo: { text: string; created_at: string; state: string }) {
      const randomId = Math.floor(Math.random() * 1000000);
      this.todos.push({ id: randomId, ...todo });
    },

    removeTodo(id: number) {
      const index = this.todos.findIndex(todo => todo.id == id);
      this.todos.splice(index, 1);

      // const newList = this.todos.filter((todo) => todo.id !== id);
      // console.log(newList);
      // Object.assign(this.todos, newList);
    },

    addToBacklog(todo: Todo) {
      this.backlog.push(todo);
      this.removeTodo(todo.id);
    },

    removeBacklog(id: number) {
      this.backlog = this.backlog.filter((todo) => todo.id !== id);
    },

    moveToTodos(todo: Todo) {
      this.todos.push(todo);
      this.removeBacklog(todo.id);
    },

    // Action to mark a todo as completed
    markAsCompleted(todo: Todo) {
      this.completedTodos.push(todo);
      this.removeTodo(todo.id);
    },

    markAsPending(todo: Todo) {
      this.todos.push(todo);

      const index = this.completedTodos.findIndex(item => item.id == todo.id);
      this.completedTodos.splice(index, 1);
    }
    
  },
});
