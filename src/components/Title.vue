<script setup>
const props = defineProps({
    title: String
})
</script>

<template>
    <header class="pb-3 mb-4 border-bottom">
        <a href="/" class="d-flex align-items-center text-body-emphasis text-decoration-none">
            <span class="fs-4">{{ title }}</span>
        </a>
    </header>
</template>