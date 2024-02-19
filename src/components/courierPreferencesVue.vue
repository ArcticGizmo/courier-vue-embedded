<template>
  <div class="courier-preferences-vue">
    <courier-preferences v-bind="props" />
  </div>
</template>

<script lang="ts" setup>
import type { PreferencesProps } from '../types/preferences';

const props = defineProps<PreferencesProps>();
</script>
../types/preferences.types