<template>
  <div class="mb-[15px] md:mb-5">
    <div>
      <label>Image</label>
      <span v-if="errorMessage" class="text-red-500 text-sm ml-2">
        {{ errorMessage }}
      </span>
    </div>
    <div class="md:flex gap-x-6">
      <div class="mb-[22px] md:mb-0 md:w-[56%]">
        <BaseButton text="Upload Image" class="py-[13px]" @click="triggerFileInput" />
        <input
          ref="fileInput"
          type="file"
          class="hidden"
          accept="image/*"
          @change="handleFileUpload"
        />
        <p class="text-center my-2">or</p>
        <input
          v-model="localImageUrl"
          class="form-input w-full"
          type="url"
          placeholder="請輸入圖片網址"
          @change="handleUrlChange"
        />
      </div>
      <div class="md:w-[44%]">
        <div class="rounded-[10px] w-full h-[150px] bg-gray">
          <img
            v-if="previewUrl"
            :src="previewUrl"
            alt="Preview Image"
            class="rounded-inherit size-full object-cover"
            @error="handleImageError"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import BaseButton from '@renderer/components/common/BaseButton.vue'
import { ref, watch } from 'vue'

const props = defineProps({
  image: {
    type: File,
    default: null
  },
  imageUrl: {
    type: String,
    default: ''
  }
})

const emit = defineEmits(['update:image'])

const fileInput = ref(null)
const errorMessage = ref('')
const previewUrl = ref('')
const localImageUrl = ref(props.imageUrl)

const handleFileUpload = (event) => {
  const file = event.target.files[0]
  if (file) {
    if (!file.type.match('image.*')) {
      errorMessage.value = 'Please select an image file'
      emit('update:image', { image: null, imageUrl: '' })
      return
    }

    const reader = new FileReader()
    reader.onload = (e) => {
      previewUrl.value = e.target.result
      localImageUrl.value = ''
      errorMessage.value = ''
      emit('update:image', { image: file, imageUrl: '' })
    }
    reader.readAsDataURL(file)
  }
}

const handleUrlChange = () => {
  if (localImageUrl.value.trim()) {
    previewUrl.value = localImageUrl.value
    errorMessage.value = ''
    if (fileInput.value) {
      fileInput.value.value = ''
    }
    emit('update:image', { image: null, imageUrl: localImageUrl.value })
  }
}

const handleImageError = () => {
  errorMessage.value = 'Failed to load image. Please check the URL.'
  previewUrl.value = ''
}

const triggerFileInput = () => {
  fileInput.value.click()
}

watch(
  () => props.imageUrl,
  (newValue) => {
    localImageUrl.value = newValue
    if (newValue) {
      previewUrl.value = newValue
    } else {
      previewUrl.value = ''
    }
    errorMessage.value = ''
  }
)

watch(
  () => props.image,
  (newValue) => {
    if (newValue) {
      const reader = new FileReader()
      reader.onload = (e) => {
        previewUrl.value = e.target.result
      }
      reader.readAsDataURL(newValue)
    } else {
      previewUrl.value = ''
    }
    errorMessage.value = ''
  }
)
</script>
