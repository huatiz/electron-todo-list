<template>
  <div class="w-full flex items-center">
    <VueDatePicker
      v-model="dateRange.start"
      class="form-input p-0 w-1/2"
      :max-date="startMaxDate"
      :enable-time-picker="false"
      :format="dateFormat"
      :clearable="false"
      :auto-apply="true"
      @update:model-value="handleStartDateChange"
    />
    <span class="mx-2">~</span>
    <VueDatePicker
      v-model="dateRange.end"
      class="form-input p-0 w-1/2"
      :min-date="endMinDate"
      :enable-time-picker="false"
      :format="dateFormat"
      :clearable="false"
      :auto-apply="true"
      @update:model-value="handleEndDateChange"
    />
  </div>
</template>

<script setup>
import { ref, watch } from 'vue'

const props = defineProps({
  modelValue: {
    type: Object,
    required: true
  }
})

const emit = defineEmits(['update:modelValue'])

const dateRange = ref(props.modelValue)
const startMaxDate = ref(null)
const endMinDate = ref(null)
const dateFormat = 'yyyy/MM/dd'

const formatDate = (date) => {
  if (!date) return ''
  const d = new Date(date)
  if (isNaN(d.getTime())) return ''

  const year = d.getFullYear()
  const month = String(d.getMonth() + 1).padStart(2, '0')
  const day = String(d.getDate()).padStart(2, '0')
  return `${year}-${month}-${day}`
}

const handleStartDateChange = (newDate) => {
  try {
    if (newDate) {
      dateRange.value.start = formatDate(newDate)
      const nextDay = new Date(newDate)
      nextDay.setDate(nextDay.getDate() + 1)
      endMinDate.value = nextDay
    } else {
      dateRange.value.start = ''
      endMinDate.value = null
    }
    emit('update:modelValue', dateRange.value)
  } catch (error) {
    console.error('Error in handleStartDateChange:', error)
    dateRange.value.start = ''
    endMinDate.value = null
  }
}

const handleEndDateChange = (newDate) => {
  try {
    if (newDate) {
      dateRange.value.end = formatDate(newDate)
      const prevDay = new Date(newDate)
      prevDay.setDate(prevDay.getDate() - 1)
      startMaxDate.value = prevDay
    } else {
      dateRange.value.end = ''
      startMaxDate.value = null
    }
    emit('update:modelValue', dateRange.value)
  } catch (error) {
    console.error('Error in handleEndDateChange:', error)
    dateRange.value.end = ''
    startMaxDate.value = null
  }
}

watch(
  () => props.modelValue,
  (newValue) => {
    dateRange.value = newValue
  },
  { deep: true }
)
</script>

<style scoped>
.dp__main :deep(.dp__input) {
  border: none;
  background-color: transparent;
  font-size: 20px;
  padding: 0.25rem 0.75rem;
  text-align: center;
  line-height: 40px;
  border-radius: 10px;
}
</style>
