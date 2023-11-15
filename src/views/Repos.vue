<script setup>
// Vue Imports
import { ref, watch } from 'vue'

// Component Imports
import RepoCard from '@comp/RepoCard.vue'
import Sidebar from '@comp/Sidebar.vue'
import Title from '@comp/Title.vue'

// Octokit Imports
import { Octokit } from 'octokit'
import { createAppAuth } from '@octokit/auth-app'

const octokit = new Octokit({
  authStrategy: createAppAuth,
  auth: {
    appId: 473003,
    privateKey: import.meta.env.VITE_REPOSPY_PKEY,
    clientId: import.meta.env.VITE_REPOSPY_CLIENT_ID,
    clientSecret: import.meta.env.VITE_REPOSPY_CLIENT_SECRET,
    type: "app",
    installationId: 44024455,
  },
});

const page = ref('1')
const repos = ref(null)

function remove_card(name) {
  repos.value = repos.value.filter((e) => e.name !== name)
}

async function get_repos() {
  repos.value = null
  const res = await octokit.request('GET /orgs/{org}/repos', {
    org: 'MSIA',
    page: page,
    per_page: 100,
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
  <div class="container-fluid">
    <div class="row">
      <div class="col-md-3 ms-sm-auto col-lg-2 px-md-4">
        <Sidebar />
      </div>

      <main class="col-md-9 ms-sm-auto col-lg-10 px-md-4">
        <Title :title="`MLDS GitHub Repos`" class="py-4" />

        <div class="d-flex flex-wrap">
          <RepoCard 
          class="me-2 mb-3" 
          style="width: 49%;" 
          @response="(name) => remove_card(name)" 
          v-for="repo in repos"
          :key="repo.id" 
          :data="repo"
          :octokit="octokit" 
          />
        </div>
      </main>
    </div>

    <footer class="pt-3 mt-4 text-body-secondary border-top">© 2023 MLDS IT</footer>
  </div>
</template>
