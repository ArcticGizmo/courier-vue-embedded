<template>
  <div class="simple-selector">
    <button v-for="option of options" :key="option" :class="{ selected: value === option }" @click="value = option">
      {{ option }}
    </button>
  </div>
</template>

<script setup lang="ts" generic="T extends string">
const value = defineModel<T>({ required: true });

defineProps<{ options: T[] }>();
</script>

<style scoped>
.simple-selector button:not(.selected) {
  background-color: transparent;
}
</style>
