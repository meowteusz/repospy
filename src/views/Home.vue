<script setup>
// Vue Imports
import { ref, watch } from 'vue'

const props = defineProps({
    octokit: Object,
})

let limits = ref(1)
let refresh = ref(0)

async function get_limits() {
    const res = await props.octokit.request('GET /rate_limit', {
        headers: {
            'X-GitHub-Api-Version': '2022-11-28'
        }
    })

    console.log(res.data)
    limits.value = res.data
}

get_limits()
watch(refresh, get_limits)
</script>

<template>
    <div class="py-4">
        <h4>Resource Limits</h4>
        <button @click="refresh++" class="btn btn-outline-success">Refresh</button>
        <pre>
            {{ limits }}
        </pre>
    </div>
</template>