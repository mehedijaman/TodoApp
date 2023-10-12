// todos.ts

import { defineStore } from "pinia";
import { reactive, computed } from "vue";

interface Todo {
  id: number;
  text: string;
  created_at: string;
}

export const useTodos = defineStore("todos", {
  state: () => ({
    todos: reactive([] as Todo[]),
    backlog: reactive([] as Todo[]),
    completedTodos: reactive([] as Todo[]),
    searchTerm: "",
    sortField: "",
  }),
  getters: {
    filteredBacklog(): Todo[] {
      return this.backlog.filter((todo) =>
        todo.text.toLowerCase().includes(this.searchTerm.toLowerCase())
      );
    },
    sortedBacklog(): Todo[] {
      if (this.sortField === "date") {
        console.log(this.sortField);
        return this.backlog
          .slice()
          .sort((a, b) => new Date(a.created_at) - new Date(b.created_at));
      } else if (this.sortField === "name") {
        console.log(this.sortField);
        return this.backlog
          .slice()
          .sort((a, b) => a.text.localeCompare(b.text));
      } else {
        return this.backlog.slice();
      }
    },
  },
  actions: {
    sortBacklog() {
      if (this.sortField === "date") {
        this.backlog = this.backlog
          .slice()
          .sort((a, b) => new Date(a.created_at) - new Date(b.created_at));
      } else if (this.sortField === "name") {
        this.backlog = this.backlog
          .slice()
          .sort((a, b) => a.text.localeCompare(b.text));
      }
    },
    setSearchTerm(term: string) {
      this.searchTerm = term;
    },
    setSortField(field: string) {
      this.sortField = field;
    },
    addTodo(todo: { text: string; created_at: string }) {
      const randomId = Math.floor(Math.random() * 1000000);
      this.todos.push({ id: randomId, ...todo });
    },
    removeTodo(id: number) {
      console.log(id, "is deleted");
      this.todos = this.todos.filter((todo) => todo.id !== id);
      console.log(this.todos);
    },
    addToBacklog(todo: Todo) {
      this.backlog.push(todo);
      this.removeTodo(todo.id);
      console.log(this.todos, "current todos");
    },
    removeBacklog(id: number) {
      this.backlog = this.backlog.filter((todo) => todo.id !== id);
    },
    moveToTodos(todo: Todo) {
      this.todos.push(todo);
      this.removeBacklog(todo.id);
    },
    markAsCompleted(todo: Todo) {
      this.completedTodos.push(todo);
      this.removeTodo(todo.id);
    },
  },
});
