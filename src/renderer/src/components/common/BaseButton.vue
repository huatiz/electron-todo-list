<template>
  <button class="btn-primary" :class="className" :disabled="disabled" @click="click">
    {{ text }}
  </button>
</template>

<script setup>
let {
  text,
  class: className,
  click,
  disabled
} = defineProps(['text', 'class', 'click', 'disabled'])
</script>
