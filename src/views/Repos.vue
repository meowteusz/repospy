<script setup>
// Vue Imports
import { ref, watch } from 'vue'

// Component Imports
import RepoCard from '@comp/RepoCard.vue'
import Title from '@comp/Title.vue'

const props = defineProps({
  octokit: Object,
})

const page = ref('1')
const repos = ref(null)

function remove_card(name) {
  repos.value = repos.value.filter((e) => e.name !== name)
}

async function get_repos() {
  repos.value = null
  const res = await props.octokit.request('GET /orgs/{org}/repos', {
    org: 'MSIA',
    page: page,
    per_page: 40,
    sort: 'updated',
    direction: 'asc',
    headers: {
      'X-GitHub-Api-Version': '2022-11-28'
    }
  })

  repos.value = res.data
}

get_repos()
watch(page, get_repos)
</script>

<template>
  <Title :title="`MLDS GitHub Repos`" class="py-4" />

  <div class="d-flex flex-wrap">
    <RepoCard 
      class="me-2 mb-3" 
      style="width: 49%;" 
      @response="(name) => remove_card(name)" 
      v-for="repo in repos"
      :key="repo.id" 
      :data="repo" 
      :octokit="props.octokit" />
  </div>
</template>
