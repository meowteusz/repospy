<script setup>
const props = defineProps({
  title: String,
  content: String
})
</script>

<template>
  <div class="card me-2 mb-2">
    <div class="card-body">
      <h5 class="card-title text-center">{{ props.title }}</h5>
      <h1 class="card-text text-center">{{ props.content }}</h1>
    </div>
  </div>
</template>
