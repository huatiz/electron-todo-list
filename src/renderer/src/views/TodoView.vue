<template>
  <div class="flex text-xl">
    <Sidebar
      :todos="todos"
      :selected-id="selectedTodo?.id"
      :disabled="disableTodos"
      :show-sidebar="showSidebar"
      @select:todo="selectTodo"
      @add:todo="addTodo"
      @toggle:sidebar="toggleSidebar"
    />
    <MainContent
      :todo="selectedTodo"
      :show-sidebar="showSidebar"
      @update:todo="updateTodo"
      @delete:todo="deleteTodo"
      @toggle:sidebar="toggleSidebar"
    />
  </div>
</template>

<script setup>
import Sidebar from '@renderer/components/todo/Sidebar.vue'
import MainContent from '@renderer/components/todo/MainContent.vue'
import { useTodos } from '@renderer/composables/useTodos'
import { ref } from 'vue'

const { todos, selectedTodo, selectTodo, disableTodos, updateTodo, addTodo, deleteTodo } =
  useTodos()

const showSidebar = ref(false)

const toggleSidebar = () => {
  showSidebar.value = !showSidebar.value
}
</script>
