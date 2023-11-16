<script setup>
//Vue Imports
import { useRoute } from 'vue-router'
import { ref, watch } from 'vue'

// Component Imports
import Title from '@comp/Title.vue'
import UserCard from '@comp/UserCard.vue';

const props = defineProps({
    octokit: Object,
})

const route = useRoute()

const users = ref(null)
const page = ref(1)


async function get_users() {
    users.value = null

    const res = await props.octokit.request('GET /orgs/MSIA/teams/' + route.params.id + '/members', {
        headers: {
            'X-GitHub-Api-Version': '2022-11-28'
        }
    })

    users.value = res.data
}

function remove_card(name) {
    users.value = users.value.filter((e) => e.name !== name)
}

get_users()
watch(page, get_users)
</script>

<template>
    <div>
        <Title :title="route.params.id" class="py-4" />

        <div class="d-flex flex-wrap">
            <UserCard class="me-2 mb-3" style="width: 32%;" @response="(name) => remove_card(name)" v-for="user in users"
                :key="user.id" :data="user" :octokit="props.octokit" />
        </div>
    </div>
</template>