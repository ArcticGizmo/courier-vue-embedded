<template>
  <CourierInboxVue :is-open="isOpen" />
  <CourierToastVue :appendTo="appendTo" />
  <CourierPreferencesVue />
  <div class="playground">
    <button @click="onCreate()">Create Toast</button>
    <button @click="isOpen = !isOpen">Toggle Open</button>
  </div>
</template>

<script setup lang="ts">
import { useCourier, CourierToastVue, CourierInboxVue, CourierPreferencesVue } from '@/index';
import { ref } from 'vue';
const props = withDefaults(defineProps<{ userId?: string; appendTo?: string }>(), { userId: 'courier-vue-embedded' });

const clientKey = import.meta.env['VITE_APP_CLIENT_KEY'];

const courier = useCourier();

const isOpen = ref(false);

courier.init({
  userId: props.userId,
  clientKey
});

const onCreate = () => {
  courier.toast.create({
    title: 'title',
    preview: 'preview'
  });
};
</script>
