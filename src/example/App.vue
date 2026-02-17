<template>
  <div class="app">
    <div v-if="!jwt"><strong>VITE_APP_COURIER_JWT </strong> must be set for this to work</div>
    <Example2 v-else user-id="courier-vue-embedded" :jwt />
  </div>
</template>

<script setup lang="ts">
import Example2 from './Example2.vue';

const jwt = import.meta.env['VITE_APP_COURIER_JWT'];
</script>
