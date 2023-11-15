<script setup>
// Vue Imports
import { ref, watch } from 'vue'

// Component Imports
import TeamCard from '@comp/TeamCard.vue'
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
const teams = ref(null)

function remove_card(name) {
  teams.value = teams.value.filter((e) => e.name !== name)
}

async function get_teams() {
  teams.value = null

  const res = await octokit.request('GET /orgs/{org}/teams', {
    org: 'MSIA',
    page: page,
    headers: {
      'X-GitHub-Api-Version': '2022-11-28'
    }
  })

  teams.value = res.data
}

get_teams()
watch(page, get_teams)
</script>

<template>
      <div class="container-fluid">
    <div class="row">
      <div class="col-md-3 ms-sm-auto col-lg-2 px-md-4">
        <Sidebar />
      </div>

      <main class="col-md-9 ms-sm-auto col-lg-10 px-md-4">
        <Title :title="`MLDS Teams`" class="py-4" />

        <div class="d-flex flex-wrap">
          <TeamCard 
          class="me-2 mb-3" 
          style="width: 49%;" 
          @response="(name) => remove_card(name)" 
          v-for="team in teams"
          :key="team.id" 
          :data="team"
          :octokit="octokit" 
          />
        </div>
      </main>
    </div>

    <footer class="pt-3 mt-4 text-body-secondary border-top">© 2023 MLDS IT</footer>
  </div>
</template>