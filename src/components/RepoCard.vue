<script setup>
import Card from '@comp/SimpleCard.vue'
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

const props = defineProps({
  data: Object
})

function format_date(date) {
  // Request a weekday along with a long date
  let options = {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  }

  return new Date(Date.parse(date)).toLocaleString('en-US', options)
}

function last_updated(date) {
  let updated = Date.parse(date)

  return Math.floor((Date.now() - updated) / 86400000)
}

async function download_repo(owner, repo_name, ref) {
  let res = await octokit.request('GET /repos/{owner}/{repo}/zipball', {
    owner: owner,
    repo: repo_name,
    ref: ref,
    headers: {
      'X-GitHub-Api-Version': '2022-11-28'
    }

  })
}

async function delete_repo(repo) {
  let res = await octokit.request('DELETE /repos/MSIA/{repo}', {
    repo: repo,
    headers: {
      'X-GitHub-Api-Version': '2022-11-28'
    }
  })
  }

function visibility(vis){
  return vis === 'private' ? 'bg-secondary' : 'bg-success'
}

</script>

<template>
  <div class="card shadow-sm">

    <div class="card-body">
      <div class="d-flex flex-nowrap">

        <!-- Left div group -->
        <div>
          <div class="card-title fs-4">
            <a :href="data.html_url" class="nav-link">{{ data.name }}</a>
          </div>

          <h6 class="card-text fw-light">{{ data.description }}</h6>
        </div>

      </div>
    </div>

    <div class="card-footer d-flex">
      <div>
        <div class="me-auto fw-lighter">Last updated {{ last_updated(data.updated_at) }} days ago</div>
        <div>
          <span :class="visibility(data.visibility)" class="badge me-2">{{ data.visibility }}</span>
          <span v-if="data.fork == 'true'" class="badge bg-primary">{{ data.fork }}</span>
        </div>
      </div>


      <!-- Right button cluster -->
      <div class="ms-auto d-flex flex-nowrap mt-1">
        <div>
          <button type="button" class="btn btn-outline-secondary me-2" @click="test()">Download</button>
          <button type="button" class="btn btn-outline-danger" @click="delete_repo(data.name)">Delete</button>
        </div>
      </div>
    </div>

  </div>
</template>
