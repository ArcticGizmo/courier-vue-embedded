<template>
  <div id="app">
    <div id="append-to"></div>
    <CourierToastVue />
    <CourierInboxVue append-to="#append-to" />
  </div>
</template>

<script setup lang="ts">
import { CourierToastVue, CourierInboxVue, useCourier } from '../../../src/index';

const props = defineProps<{ clientKey: string }>();

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
