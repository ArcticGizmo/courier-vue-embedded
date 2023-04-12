<template>
  <courier-preferences v-bind="props" />
</template>

<script setup lang="ts">
const props = defineProps<{
  draft?: boolean;
}>();
</script>
