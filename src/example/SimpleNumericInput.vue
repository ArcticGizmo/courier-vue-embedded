<template>
  <div class="simple-numeric-input">
    <div class="label">{{ label }}</div>
    <input v-model="model" type="number" :disabled />
  </div>
</template>

<script setup lang="ts">
const model = defineModel<number>();
defineProps<{
  label: string;
  disabled?: boolean;
}>();
</script>

<style scoped>
.label {
  font-size: 0.9rem;
}

input {
  height: 2rem;
  border: 1px solid grey;
  border-radius: 0.25rem;
  background-color: rgba(0, 0, 0, 0.093);
}

input[disabled] {
  opacity: 0.5;
}
</style>
