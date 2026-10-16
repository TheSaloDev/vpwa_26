<template>
  <q-page>
    <div class="text-h4 text-center q-pt-xl">Welcome, {{ nickname }}!</div>
  </q-page>
</template>

<script setup>
const nickname = localStorage.getItem('nickname') || ''
</script>