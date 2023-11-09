<script setup>
import Card from '@comp/SimpleCard.vue'
import { Octokit } from 'octokit'

const auth_key = import.meta.env.VITE_REPOSPY_KEY;

const octokit = new Octokit({
  auth: auth_key
})

const props = defineProps({
  data: Object
})

// Request a weekday along with a long date
const options = {
  weekday: 'long',
  year: 'numeric',
  month: 'long',
  day: 'numeric'
}

function format_date(date) {
  let timestamp = Date.parse(date)
  return new Date(timestamp).toLocaleString('en-US', options)
}

function last_updated(date) {
  let updated = Date.parse(date);
  let current = Date.now();

  return Math.floor((current - updated) / 86400000)
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
  console.log(res.location)
  // window.open(res, '_blank');
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

        <!-- Right button cluster -->
        <div class="ms-auto d-flex flex-nowrap">
          <div>
            <button type="button" class="btn btn-outline-secondary me-2" @click="download_repo(data.owner.login, data.name, data.owner.login)">Download</button>
            <button type="button" class="btn btn-outline-danger">Delete</button>
          </div>
        </div>

      </div>
    </div>

    <div class="card-footer">
      <div class="me-auto fw-lighter">Last updated {{ last_updated(data.updated_at) }} days ago</div>
      <div>
            <span class="badge bg-secondary">{{ data.visibility }}</span>
            <span class="badge bg-secondary">{{ data.fork }}</span>
          </div>
    </div>

  </div>
</template>
