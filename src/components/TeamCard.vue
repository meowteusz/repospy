<script setup>
import { ref } from 'vue'

const props = defineProps({
  data: Object,
  octokit: Object,
})

const emit = defineEmits(['response'])

const deleting = ref(false)
const deleting_text = ref('Delete')

async function delete_team(team_name) {
  deleting.value = true
  deleting_text.value = 'Wait...'

  let res = await octokit.request('DELETE /repos/NUMLDS/{repo}', {
    repo: repo_name,
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

  setTimeout(() => emit('response', repo_name), 500)
}

</script>

<template>
  <div class="card shadow-sm">

    <div class="card-body">
      <div class="d-flex flex-nowrap">

        <!-- Left div group -->
        <div>
          <div class="card-title fs-4">
            <RouterLink :to="`/team/${data.slug}`" class="nav-link stretched-link">{{ data.name }}</RouterLink>
          </div>

          <h6 class="card-text fw-light">{{ data.description }}</h6>
        </div>

      </div>
    </div>

    <div class="card-footer d-flex">
      <div>
        <div>
        </div>
      </div>


      <!-- Right button cluster -->
      <div class="ms-auto d-flex flex-nowrap mt-1">
        <div>
          <button type="button" class="btn btn-outline-danger" @click="delete_team(data.name)"
            :disabled="deleting === true">
            {{ deleting_text }}
            <span v-if="deleting === true" class="spinner-border spinner-border-sm" aria-hidden="true"></span>
          </button>
        </div>
      </div>
    </div>

  </div>
</template>
