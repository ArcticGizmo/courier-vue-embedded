<template>
  <div id="app">
    <CourierToastVue />
    <CourierInboxVue />
  </div>
</template>

<script setup lang="ts">
import { CourierToastVue, CourierInboxVue, Courier } from '../../../src/index';

const props = defineProps<{ clientKey: string }>();

Courier.init({
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
