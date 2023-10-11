// todos.js

import { defineStore } from "pinia";

export const useTodos = defineStore("todos", {
  state: () => ({
    todos: [] as {
      id: number;
      text: string;
      created_at: string;
      state: string;
    }[],
    backlog: [] as {
      id: number;
      text: string;
      created_at: string;
      state: string;
    }[],
  }),
  actions: {
    addTodo(todo: { text: string; created_at: string; state: string }) {
      const randomId = Math.floor(Math.random() * 1000000);
      this.todos.push({ id: randomId, ...todo });
    },

    removeTodo(id: number) {
      this.todos = this.todos.filter((todo) => todo.id !== id);
    },

    addToBacklog(todo) {
      this.backlog.push(todo);
      this.removeTodo(todo.id);
    },

    removeBacklog(id: number) {
      this.backlog = this.backlog.filter((todo) => todo.id !== id);
    },

    moveToTodos(todo) {
      this.todos.push(todo);
      this.removeBacklog(todo.id);
    },
  },
});
