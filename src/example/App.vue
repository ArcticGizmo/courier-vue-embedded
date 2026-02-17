<template>
  <div class="app">
    <div v-if="!jwt"><strong>VITE_APP_COURIER_JWT </strong> must be set for this to work</div>
    <div v-else>
      <Example2 user-id="courier-vue-embedded" :jwt />
    </div>
  </div>

  <!-- <template v-else>
    <Example user-id="courier-vue-embedded" />
  </template> -->
</template>

<script setup lang="ts">
import Example from './Example.vue';
import Example2 from './Example2.vue';
const jwt = import.meta.env['VITE_APP_COURIER_JWT'];
</script>

<style>
* {
  box-sizing: border-box;
}

body {
  margin: 0;
}

.app {
  width: 100vw;
}
</style>
