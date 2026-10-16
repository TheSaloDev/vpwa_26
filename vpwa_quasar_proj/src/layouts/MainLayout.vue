<template>
  <q-layout view="hHh lpR fFf">

    <q-drawer v-model="drawer" show-if-above side="left" bordered>
  <q-list>
    <q-item-label header>Channels</q-item-label>
    <q-item
      v-for="c in channels"
      :key="c.id"
      clickable
      :to="`/channel/${c.id}`"
      active-class="bg-grey-3"
    >
      <q-item-section avatar><q-icon name="tag" /></q-item-section>
      <q-item-section>{{ c.name }}</q-item-section>
    </q-item>
  </q-list>
</q-drawer>

    <q-page-container>
      <router-view />
    </q-page-container>

    <q-footer v-if="isLoggedIn" class="footer">
      <div class="footer-row">
        <UserProfile />
        <div class="command-wrap">
          <CommandLine />
        </div>
      </div>
    </q-footer>

  </q-layout>
</template>

<script setup>
import { onMounted } from 'vue'
import { useRouter } from 'vue-router'
import UserProfile from '@/components/UserProfile.vue'
import CommandLine from '@/components/CommandLine.vue'

const router = useRouter()

const isLoggedIn = !!localStorage.getItem('nickname')

onMounted(() => {
  if (!isLoggedIn) router.replace('/register')
})


import { ref } from 'vue'
import { channels } from '@/data/channels'
const drawer = ref(true)
</script>

<style scoped>
.footer {
  background: transparent;
}

.footer-row {
  display: flex;
  align-items: flex-end;   /* профиль и строка выровнены по нижнему краю */
  gap: 16px;
  padding: 8px 16px;
}

.command-wrap {
  flex: 1;
}
</style>