<template>
  <q-btn flat no-caps class="profile-btn">
    <q-avatar size="4rem" color="primary" text-color="black" icon="person">
      <q-badge floating rounded :color="current.color" class="status-dot" />
    </q-avatar>

    <div class="column items-start q-ml-sm info">
        <span class="text-weight-medium ellipsis">{{ nickname }}</span>
        <span class="text-caption ellipsis">{{ current.label }}</span>
    </div>

    <q-menu anchor="top left" self="bottom left" :offset="[0, 8]">
      <q-list style="width: 180px">
        <q-item
          v-for="opt in options"
          :key="opt.value"
          clickable
          v-close-popup
          :active="opt.value === status"
          @click="setStatus(opt.value)"
        >
          <q-item-section avatar>
            <q-icon name="circle" :color="opt.color" size="14px" />
          </q-item-section>
          <q-item-section>{{ opt.label }}</q-item-section>
        </q-item>

        <q-separator />

        <q-item clickable v-close-popup @click="onLogout">
          <q-item-section avatar>
            <q-icon name="logout" color="negative" />
          </q-item-section>
          <q-item-section class="text-negative">Log out</q-item-section>
        </q-item>
      </q-list>
    </q-menu>
  </q-btn>
</template>

<script setup>
import { ref, computed } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()
const nickname = localStorage.getItem('nickname') || ''

const options = [
  { value: 'online', label: 'Online', color: 'positive' },
  { value: 'invisible', label: 'Invisible', color: 'grey' },
  { value: 'busy', label: 'Busy', color: 'negative' },
  { value: 'away', label: 'Away', color: 'warning' },
]

const status = ref(localStorage.getItem('status') || 'online')

const current = computed(
  () => options.find((o) => o.value === status.value) || options[0]
)

function setStatus(value) {
  status.value = value
  localStorage.setItem('status', value)
}

function onLogout() {
  localStorage.removeItem('nickname')
  localStorage.removeItem('status')
  router.push('/login')
}
</script>

<style scoped>
.profile-btn {
  width: 220px;
  justify-content: flex-start;
  padding: 6px 12px 6px 3px;
  border-radius: 12px;
  background-color: #ffffff;
  color: #1d1d1d;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.15);
}

.profile-btn :deep(.q-focus-helper) {
  display: none;
}

.status-dot {
  width: 14px;
  height: 14px;
  border: 2px solid white;
}

.profile-btn :deep(.q-btn__content) {
  justify-content: flex-start;
  flex-wrap: nowrap;
  width: 100%;
}
</style>