import { defineStore } from "pinia";

export const useTaskStore = defineStore("tasks", {

    state: () => ({
        task: null,
        items: [],
    }),
    actions: {
        function useStore() {
            return store as Store;
          }

    },
}),