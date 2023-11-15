<script setup>
// Vue Imports
import { RouterView } from 'vue-router'

// Component Imports
import Sidebar from '@comp/Sidebar.vue'

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

</script>

<template>
    <div class="container-fluid">
    <div class="row">
      <div class="col-md-3 ms-sm-auto col-lg-2 px-md-4">
        <Sidebar />
      </div>

      <main class="col-md-9 ms-sm-auto col-lg-10 px-md-4">
        <RouterView :octokit="octokit" />
      </main>
    </div>

    <footer class="pt-3 mt-4 text-body-secondary border-top">© 2023 MLDS IT</footer>
  </div>
</template>
