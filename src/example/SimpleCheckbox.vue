<template>
  <div :class="{ disabled }">
    <input v-model="model" type="checkbox" :disabled />
    <label>{{ label }}</label>
  </div>
</template>

<script setup lang="ts">
const model = defineModel<boolean>({ required: true });
defineProps<{
  label: string;
  disabled?: boolean;
}>();
</script>

<style scoped>
.disabled {
  opacity: 0.8;
}

label {
  font-size: 0.9rem;
}

input {
  width: 1rem;
  height: 1rem;
  accent-color: rgb(129, 235, 251);
}
</style>
