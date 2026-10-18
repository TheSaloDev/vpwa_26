<template>
  <q-btn flat dense no-caps icon="people" :label="users.length">
    <q-menu anchor="bottom right" self="top right" :offset="[0, 8]" class="members-menu">
      <q-list style="min-width: 240px">
        <q-item-label header>Members, {{ users.length }}</q-item-label>

        <q-scroll-area style="height: 260px">
          <q-item v-for="u in users" :key="u.nickname">
            <q-item-section avatar>
              <q-avatar size="40px" color="primary" text-color="black" icon="person">
                <q-badge floating rounded :color="statusOf(u.status).color" class="status-dot" />
              </q-avatar>
            </q-item-section>

            <q-item-section>
              <q-item-label class="ellipsis">{{ u.nickname }}</q-item-label>
              <q-item-label caption>{{ statusOf(u.status).label }}</q-item-label>
            </q-item-section>
          </q-item>
        </q-scroll-area>
      </q-list>
    </q-menu>
  </q-btn>
</template>

<script setup>
defineProps({
  users: { type: Array, default: () => [] },
})

const statuses = {  //TODO maybe to different file
  online: { label: 'Online', color: 'positive' },
  invisible: { label: 'Offline', color: 'grey' },
  busy: { label: 'Busy', color: 'negative' },
  away: { label: 'Away', color: 'warning' },
}

const statusOf = (s) => statuses[s] || statuses.online
</script>

<style scoped>
.status-dot {
  width: 12px;
  height: 12px;
  border: 2px solid white;
}
</style>