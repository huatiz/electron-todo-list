<template>
  <div v-if="showSidebar" class="z-40 fixed inset-0 bg-black/50 md:hidden"></div>
  <div
    class="z-[1500] fixed top-0 bottom-0 left-0 duration-300 md:static w-[250px] shrink-0 h-screen bg-primary-medium flex flex-col justify-between"
    :class="showSidebar ? 'left-0' : 'left-[-250px]'"
  >
    <div>
      <div class="flex justify-between items-center px-5 pt-3 pb-2">
        <h1 class="font-medium leading-11">Demo Todo List</h1>
        <button
          class="cursor-pointer hover:scale-110 duration-0.3 md:hidden mr-1"
          @click="emit('toggle:sidebar')"
        >
          <IconClose />
        </button>
      </div>
      <div
        class="h-[calc(100vh-164px)] overflow-y-auto [&::-webkit-scrollbar]:w-1 [&::-webkit-scrollbar-track]:bg-gray [&::-webkit-scrollbar-thumb]:bg-gray"
      >
        <ol class="mb-5">
          <li
            v-for="(todo, index) in todos"
            :key="todo.id"
            class="px-[13px] py-1 mb-2 bg-primary-dark leading-10 cursor-pointer relative"
            :class="{
              'font-bold': todo.id === selectedId,
              'after:content-[\'\'] after:absolute after:right-0 after:top-0 after:border-t-[24px] after:border-t-transparent after:border-b-[24px] after:border-b-transparent after:border-l-[24px] after:border-l-transparent after:border-r-[24px] after:border-r-white':
                todo.id === selectedId
            }"
            @click="handleSelect(todo.id)"
          >
            {{ index + 1 }}. {{ todo.title }}
          </li>
        </ol>
        <div ref="addButtonElem" class="px-5">
          <BaseButton text="Add Item" class="py-[9px]" :disabled="disabled" @click="handleAdd" />
        </div>
      </div>
    </div>
    <div class="p-5">
      <RandomImage />
    </div>
  </div>
</template>

<script setup>
import IconClose from '@renderer/assets/icons/close.svg?component'
import BaseButton from '@renderer/components/common/BaseButton.vue'
import RandomImage from '@renderer/components/RandomImage.vue'

import { ref, nextTick } from 'vue'

const addButtonElem = ref(null)

const { todos, selectedId, disabled } = defineProps({
  todos: {
    type: Array,
    required: true,
    default: () => []
  },
  selectedId: {
    type: Number,
    required: true,
    default: 0
  },
  disabled: {
    type: Boolean,
    required: true,
    default: false
  },
  showSidebar: {
    type: Boolean,
    required: true,
    default: false
  }
})

const emit = defineEmits(['select:todo', 'add:todo', 'toggle:sidebar'])

const handleSelect = (id) => {
  emit('select:todo', id)
}

const handleAdd = () => {
  emit('add:todo')
  // scroll to the bottom of the list after adding a new item
  nextTick(() => {
    addButtonElem.value.scrollIntoView({ behavior: 'smooth' })
  })
}
</script>
