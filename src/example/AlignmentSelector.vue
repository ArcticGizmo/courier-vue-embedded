<template>
  <div class="alignment-selector">
    <input
      v-for="opt in options"
      :class="{ 'no-pointer-events': value === opt }"
      :key="opt"
      :checked="value === opt"
      type="checkbox"
      @click="value = opt"
    />
  </div>
</template>

<script setup lang="ts">
import { CourierInboxPopupAlignment } from '@trycourier/courier-ui-inbox';

const value = defineModel<CourierInboxPopupAlignment>({ required: true });

const options: CourierInboxPopupAlignment[] = [
  'top-left',
  'top-center',
  'top-right',
  'center-left',
  'center-center',
  'center-right',
  'bottom-left',
  'bottom-center',
  'bottom-right'
];
</script>

<style scoped>
.alignment-selector {
  margin: 0.5rem;
  display: grid;
  grid-template-columns: repeat(3, auto);
  grid-template-rows: repeat(3, auto);
  gap: 0.25rem;
  width: 4rem;
}

.no-pointer-events {
  pointer-events: none;
}

input {
  width: 1rem;
  height: 1rem;
}
</style>
