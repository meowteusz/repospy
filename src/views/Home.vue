<script setup>
import { ref, watch } from 'vue'
import { Octokit } from 'octokit'

import RepoCard from '@comp/RepoCard.vue'

const page = ref('1')
const repos = ref(null)

const octokit = new Octokit({
  auth: import.meta.env.VITE_REPOSPY_KEY
})

function remove_card(name){
  repos.value = repos.value.filter((e) => e.name !== name)
}

async function get_repos() {
  repos.value = null
  const res = await octokit.request('GET /orgs/{org}/repos', {
    org: 'MSIA',
    page: page,
    sort: 'updated',
    direction: 'asc',
    headers: {
      'X-GitHub-Api-Version': '2022-11-28'
    }
  })

  repos.value = res.data;
}

get_repos()
watch(page, get_repos)
</script>

<template>
  <div class="container py-4">
    <header class="pb-3 mb-4 border-bottom">
      <a href="/" class="d-flex align-items-center text-body-emphasis text-decoration-none">
        <span class="fs-4">MLDS GitHub Repos</span>
      </a>
    </header>

    <div class="d-flex flex-wrap">
      <RepoCard 
        class="me-2 mb-3" 
        style="width: 49%;"
        @response="(name) => remove_card(name)"
        v-for="repo in repos" 
        :key="repo.id" 
        :data="repo" />
    </div>

    <footer class="pt-3 mt-4 text-body-secondary border-top">© 2023</footer>
  </div>
</template>
