<script setup>
import { ref } from 'vue'

const props = defineProps({
    data: Object,
    octokit: Object,
})

const emit = defineEmits(['response'])

const deleting = ref(false)
const deleting_text = ref('X')

async function delete_user(username) {
    deleting.value = true
    deleting_text.value = 'Wait...'

    let res = await props.octokit.request('DELETE /orgs/{org}/members/{username}', {
        org: 'MSIA',
        username: username,
        headers: {
            'X-GitHub-Api-Version': '2022-11-28'
        }
    })

    if (res.status === 204) {
        deleting_text.value = '☑️'
    } else {
        deleting.value = false
        console.error(res)
        return
    }
    
    setTimeout(() => emit('response', username), 500)
}

</script>

<template>
    <div class="card mb-3" style="max-width: 540px;">
        <div class="row g-0">
            <div class="col-md-4">
                <img :src="data.avatar_url" class="img-fluid rounded-start">
            </div>
            <div class="col-md-8">
                <div class="card-body">
                    <h5 class="card-title d-flex">{{ data.login }}
                        <button type="button" class="btn btn-outline-danger ms-auto" @click="delete_user(data.login)"
                            :disabled="deleting === true">
                            {{ deleting_text }}
                            <span v-if="deleting === true" class="spinner-border spinner-border-sm"
                                aria-hidden="true"></span>
                        </button>
                    </h5>
                    <p class="card-text"><small class="text-body-secondary">{{ data.type }}</small></p>

                </div>
            </div>

        </div>

    </div>
</template>

<style>
img {
    border-radius: 50%;
}
</style>
