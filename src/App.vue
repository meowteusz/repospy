<script setup>
// Vue Imports
import { RouterView } from 'vue-router'

// Component Imports
import Navbar from '@comp/Navbar.vue'

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
  <div>
    <Navbar :title="`MLDS`" />
    <div class="container-fluid" style="max-width: 85%;">
      <RouterView :octokit="octokit" />
    </div>
    <footer class="pt-3 mt-4 text-body-secondary border-top">© 2023 MLDS IT</footer>
  </div>
</template>
