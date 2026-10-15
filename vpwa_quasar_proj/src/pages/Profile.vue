<template>
  <q-page class="page">
    <div class="text-h4 text-center q-pt-xl">Welcome, {{ nickname }}!</div>

    <div class="profile">
      <q-btn flat no-caps class="profile-btn">
        <q-avatar size="4rem" color="primary" text-color="black" icon="person">
          <q-badge floating rounded :color="current.color" class="status-dot" />
        </q-avatar>

        <div class="column items-start q-ml-sm">
          <span class="text-weight-medium">{{ nickname }}</span>
          <span class="text-caption">{{ current.label }}</span>
        </div>

        <q-menu anchor="top left" self="bottom left" :offset="[0, 8]">
          <q-list style="min-width: 180px">
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
    </div>
  </q-page>
</template>

<script setup>
import { ref, computed } from "vue";
import { useRouter } from "vue-router";

const router = useRouter();
const nickname = localStorage.getItem("nickname") || "";

const options = [
  { value: "online", label: "Online", color: "positive" },
  { value: "invisible", label: "Invisible", color: "grey" },
  { value: "busy", label: "Busy", color: "negative" },
  { value: "away", label: "Away", color: "warning" },
];

const status = ref(localStorage.getItem("status") || "online");

const current = computed(
  () => options.find((o) => o.value === status.value) || options[0]
);

function setStatus(value) {
  status.value = value;
  localStorage.setItem("status", value);
}

function onLogout() {
  localStorage.removeItem("nickname");
  localStorage.removeItem("status");
  router.push("/register");
}
</script>

<style scoped>
.page {
  position: relative;
}

.profile {
  position: absolute;
  left: 16px;
  bottom: 16px;
}

.profile-btn {
  padding: 6px 12px;
  border-radius: 12px;
  background-color: #ffffff;
  padding-left: 3px;
}

.status-dot {
  width: 14px;
  height: 14px;
  border: 2px solid white;
}
</style>