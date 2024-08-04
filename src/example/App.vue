<template>
  <template v-if="!clientKey"> <strong>VITE_APP_CLIENT_KEY </strong> must be set for this to work </template>

  <template v-else>
    <CourierInboxVue />
    <CourierToastVue />
    <CourierPreferencesVue />
    <div class="playground">
      <button @click="onCreate()">Create Toast</button>
    </div>
  </template>
</template>

<script setup lang="ts">
import { useCourier, CourierToastVue, CourierInboxVue, CourierPreferencesVue } from '@/index';

const clientKey = import.meta.env['VITE_APP_CLIENT_KEY'];
const userId = 'courier-vue-embedded';

const courier = useCourier();

courier.init({
  userId,
  clientKey
});

const onCreate = () => {
  courier.toast.create({
    title: 'title',
    preview: 'preview'
  });
};
</script>
