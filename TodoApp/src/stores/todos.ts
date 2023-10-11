// todos.ts

import { defineStore } from "pinia";

interface Todo {
  id: number;
  text: string;
  created_at: string;
  state: string;
}

export const useTodos = defineStore("todos", {
  state: () => ({
    todos: [] as Todo[],
    backlog: [] as Todo[],
    completedTodos: [] as Todo[], // New array for completed todos
  }),
  actions: {
    addTodo(todo: { text: string; created_at: string; state: string }) {
      const randomId = Math.floor(Math.random() * 1000000);
      this.todos.push({ id: randomId, ...todo });
    },

    removeTodo(id: number) {
      this.todos = this.todos.filter((todo) => todo.id !== id);
    },

    addToBacklog(todo: Todo) {
      this.backlog.push(todo);
      this.removeTodo(todo.id);
    },

    removeBacklog(id: number) {
      this.backlog = this.backlog.filter((todo) => todo.id !== id);
    },
    removeCompletedTodos(id: number) {
      this.backlog = this.completedTodos.filter((todo) => todo.id !== id);
    },

    moveToTodos(todo: Todo) {
      this.todos.push(todo);
      this.removeBacklog(todo.id);
    },
    markAsIncomplete(todo: Todo) {
      console.log("Marking as incomplete:", todo);
      this.todos.push(todo);
      this.removeCompletedTodos(todo.id);
    },
    // Action to mark a todo as completed
    markAsCompleted(todo: Todo) {
      this.completedTodos.push(todo);
      this.removeTodo(todo.id);
    },
  },
});
