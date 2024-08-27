<script setup>
// Vue Imports
import { ref, watch } from 'vue'

// Component Imports
import TeamCard from '@comp/TeamCard.vue'
import Title from '@comp/Title.vue'

const props = defineProps({
  octokit: Object,
})

const page = ref('1')
const teams = ref(null)

function remove_card(name) {
  teams.value = teams.value.filter((e) => e.name !== name)
}

async function get_teams() {
  teams.value = null

  const res = await props.octokit.request('GET /orgs/{org}/teams', {
    org: 'NUMLDS',
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
  <Title :title="`MLDS Teams`" class="py-4" />

  <div class="d-flex flex-wrap">
    <TeamCard 
      class="me-2 mb-3" 
      style="width: 49%;" 
      @response="(name) => remove_card(name)" 
      v-for="team in teams"
      :key="team.id" 
      :data="team" 
      :octokit="props.octokit" />
  </div>
</template>