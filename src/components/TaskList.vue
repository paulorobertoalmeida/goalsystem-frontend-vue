<template>
  <div class="main">
    <input
        type="checkbox"
        id="toggle-all"
        className="toggle-all"
        @change="{() => toggleAll()}"
        checked="{allItemsCompleted()}"
      />
      <label htmlFor="toggle-all" />
    <ul class="todo-list">
      <TaskItem v-for="item in items" :key="item" v-bind="item" />
    </ul>
  </div>
</template>

<script setup lang="ts">
import { useTaskStore } from "@/store/task";

const List = ({ list, setList, filter }: ListProps) => {
  const allItemsCompleted = () => {
    return list.every((item: Item) => item.completed);
  };

  const toggleAll = () => {
    const _list = [...list];
    setList(
      _list.map((item: Item) => {
        return { ...item, completed: !allItemsCompleted() };
      })
    );
  };

  const filteredList = () => {
    return list.filter((item) => {
      if (filter) {
        return filter === "active" ? !item.completed : item.completed;
      }
      return true;
    });
  };
</script>

<style>
.main {
  position: relative;
  z-index: 2;
  border-top: 1px solid #e6e6e6;
}

.toggle-all {
  text-align: center;
  border: none; /* Mobile Safari */
  opacity: 0;
  position: absolute;
}

.toggle-all + label {
  width: 60px;
  height: 34px;
  font-size: 0;
  position: absolute;
  top: -52px;
  left: -13px;
  -webkit-transform: rotate(90deg);
  transform: rotate(90deg);
}

.toggle-all + label:before {
  content: "❯";
  font-size: 22px;
  color: #e6e6e6;
  padding: 10px 27px 10px 27px;
}

.toggle-all:checked + label:before {
  color: #737373;
}

.todo-list {
  margin: 0;
  padding: 0;
  list-style: none;
}

/*
	Hack to remove background from Mobile Safari.
	Can't use it globally since it destroys checkboxes in Firefox
*/
@media screen and (-webkit-min-device-pixel-ratio: 0) {
  .toggle-all,
  .todo-list li .toggle {
    background: none;
  }

  .todo-list li .toggle {
    height: 40px;
  }
}
</style>