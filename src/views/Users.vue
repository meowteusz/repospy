<script setup>
// Vue Imports
import { ref, watch } from 'vue'

// Component Imports
import UserCard from '@comp/UserCard.vue'
import Title from '@comp/Title.vue'

const props = defineProps({
    octokit: Object,
})

const page = ref('1')
const users = ref(null)

function remove_card(name) {
    users.value = users.value.filter((e) => e.name !== name)
}

async function get_users() {
    users.value = null

    const res = await props.octokit.request('GET /orgs/MSIA/members', {
        headers: {
            'X-GitHub-Api-Version': '2022-11-28'
        }
    })

    users.value = res.data
}

get_users()
watch(page, get_users)
</script>

<template>
    <Title :title="`MLDS Users`" class="py-4" />

    <div class="d-flex flex-wrap">
        <UserCard 
        class="me-2 mb-3" 
        style="width: 32%;" 
        @response="(name) => remove_card(name)" 
        v-for="user in users"
        :key="user.id" 
        :data="user" 
        :octokit="props.octokit" />
    </div>
</template>