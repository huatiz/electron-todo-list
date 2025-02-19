<template>
  <div class="col-span-2 flex flex-col relative">
    <label>Content</label>
    <textarea
      v-model="content"
      :maxlength="maxLength"
      placeholder="請輸入內容"
      class="form-input h-[145px] resize-none"
      @input="emit('update:modelValue', content)"
    ></textarea>
    <div
      class="w-14 md:w-17 absolute bottom-0 right-0 py-1 pr-2 md:py-3 md:pr-3 bg-primary-light rounded-ee-[10px] text-sm text-right after:content-[''] after:absolute after:top-0 after:right-full after:w-0 after:h-0 after:block after:border-l-[24px] after:border-l-transparent after:border-b-[28px] after:border-b-primary-light md:after:border-l-[38px] md:after:border-b-[44px]"
    >
      {{ maxLength }}/{{ content.length }}
    </div>
  </div>
</template>

<script setup>
import { ref, watch } from 'vue'

const props = defineProps({
  modelValue: {
    type: String,
    required: true
  },
  maxLength: {
    type: Number,
    default: 200
  }
})

const emit = defineEmits(['update:modelValue'])

const content = ref(props.modelValue)

watch(
  () => props.modelValue,
  (newValue) => {
    content.value = newValue
  }
)
</script>
