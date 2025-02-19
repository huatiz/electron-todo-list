<template>
  <div class="w-full px-6 py-4">
    <div class="flex justify-between items-center mb-6">
      <div>
        <button
          v-if="!showSidebar"
          class="cursor-pointer hover:scale-110 duration-0.3 md:hidden"
          @click="emit('toggle:sidebar')"
        >
          <IconMenu />
        </button>
      </div>
      <div v-if="formData">
        <button class="cursor-pointer hover:scale-110 duration-0.3" @click="handleDelete">
          <IconDelete />
        </button>
      </div>
    </div>
    <div v-if="formData">
      <div class="md:flex gap-x-6">
        <div class="flex flex-col mb-[15px] md:mb-5 md:w-[56%]">
          <label>Title</label>
          <input
            v-model="formData.title"
            class="form-input"
            type="text"
            placeholder="請輸入標題"
            @input="emit('update:todo', formData)"
          />
        </div>
        <div class="flex flex-col mb-[15px] md:mb-5 md:w-[44%]">
          <label>Date</label>
          <DateRangePicker
            v-model="formData.dateRange"
            @update:model-value="handleDateRangeUpdate"
          />
        </div>
      </div>
      <ImageUploader
        :image="formData.image"
        :image-url="formData.imageUrl"
        @update:image="handleImageUpdate"
      />
      <ContentEditor
        v-model="formData.content"
        :max-length="contentMaxLength"
        @update:model-value="handleContentUpdate"
      />
    </div>
  </div>
</template>

<script setup>
import IconMenu from '@renderer/assets/icons/menu.svg?component'
import IconDelete from '@renderer/assets/icons/delete.svg?component'
import DateRangePicker from '@renderer/components/form/DateRangePicker.vue'
import ImageUploader from '@renderer/components/form/ImageUploader.vue'
import ContentEditor from '@renderer/components/form/ContentEditor.vue'
import { ref, watch } from 'vue'

const props = defineProps({
  todo: {
    type: Object,
    required: false,
    default: null
  },
  showSidebar: {
    type: Boolean,
    required: true,
    default: false
  }
})

const emit = defineEmits(['update:todo', 'delete:todo', 'toggle:sidebar'])

const formData = ref(null)
const contentMaxLength = 200

const handleDelete = () => {
  emit('delete:todo', formData.value.id)
  emit('toggle:sidebar')
  formData.value = null
}

const handleDateRangeUpdate = (newDateRange) => {
  formData.value.dateRange = newDateRange
  emit('update:todo', formData.value)
}

const handleImageUpdate = ({ image, imageUrl }) => {
  formData.value = {
    ...formData.value,
    image,
    imageUrl
  }
  emit('update:todo', formData.value)
}

const handleContentUpdate = (newContent) => {
  formData.value.content = newContent
  emit('update:todo', formData.value)
}

watch(
  () => props.todo,
  (newTodo) => {
    if (newTodo) {
      formData.value = { ...newTodo }
    }
  },
  { immediate: true }
)
</script>
