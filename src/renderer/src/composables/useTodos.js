import { ref, computed } from 'vue'

export function useTodos() {
  const todosLimit = 10
  const todos = ref([])
  const todosCount = ref(0)

  const selectedTodoId = ref(1)

  const selectedTodo = computed(() => todos.value.find((todo) => todo.id === selectedTodoId.value))

  const selectTodo = (id) => {
    selectedTodoId.value = id
  }

  const updateTodo = (updatedTodo) => {
    const index = todos.value.findIndex((todo) => todo.id === updatedTodo.id)
    if (index !== -1) {
      todos.value[index] = updatedTodo
    }
  }

  const disableTodos = computed(() => todos.value.length >= todosLimit)

  const addTodo = () => {
    if (disableTodos.value) return

    todosCount.value++

    const newTodo = {
      id: todosCount.value,
      title: 'New Item',
      dateRange: {
        start: '',
        end: ''
      },
      image: null,
      imageUrl: '',
      content: ''
    }
    todos.value.push(newTodo)
  }

  const deleteTodo = (id) => {
    const index = todos.value.findIndex((todo) => todo.id === id)
    if (index !== -1) {
      todos.value.splice(index, 1)
    }
  }

  return {
    todos,
    selectedTodo,
    selectTodo,
    updateTodo,
    disableTodos,
    addTodo,
    deleteTodo
  }
}
