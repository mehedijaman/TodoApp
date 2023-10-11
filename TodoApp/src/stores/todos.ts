import { defineStore } from "pinia";

export const useTodos = defineStore("todos", {
  state: () => ({
    todos: [] as { id: number; text: string }[],
  }),
  actions: {
    addTodo(text: string) {
      const randomId = Math.floor(Math.random() * 1000000);
      this.todos.push({ id: randomId, text });
    },

    removeTodo(id: number) {
      this.todos = this.todos.filter((todo) => todo.id !== id);
    },
  },
});
