<template>
  <template v-if="!clientKey"> <strong>VITE_APP_CLIENT_KEY </strong> must be set for this to work </template>

  <template v-else>
    <Example userId="courier-vue-embedded" appendTo="body" />
  </template>
</template>

<script setup lang="ts">
import Example from './Example.vue';
const clientKey = import.meta.env['VITE_APP_CLIENT_KEY'];
</script>
