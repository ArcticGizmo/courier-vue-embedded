<template>
  <div id="app">
    <CourierToastVue />
    <CourierInboxVue />
    <CourierPreferencesVue v-if="showPreferences" />
  </div>
</template>

<script setup lang="ts">
import { CourierInboxVue, useCourier, CourierToastVue, CourierPreferencesVue } from '../../../src/index';
const props = defineProps<{ clientKey: string; showPreferences?: boolean }>();

useCourier({
  clientKey: props.clientKey,
  userId: 'courier-vue-embedded'
});
</script>

<style>
courier-inbox {
  position: fixed;
  z-index: 1000;
  right: 2rem;
  top: 1rem;
  width: 2rem;
  height: 2rem;
}
</style>
