<template>
  <div class="h-15 rounded-[10px] bg-gray">
    <img
      :src="imageUrl"
      alt="Random Image"
      class="size-full rounded-inherit cursor-pointer object-cover"
      @click="updateImage"
    />
  </div>
</template>

<script setup>
import { ref } from 'vue'

const sourceUrl = 'https://picsum.photos/600/400'
const imageUrl = ref(sourceUrl)

const updateImage = () => {
  imageUrl.value = `${sourceUrl}?t=${Date.now()}`
}
</script>
