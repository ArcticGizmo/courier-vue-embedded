<template>
  <courier-toast v-bind="props" />
</template>

<script setup lang="ts">
import type { ToastTheme, ToastPosition, ToastRole, ToastTransition } from '../types/toast';

const props = defineProps<{
  autoClose?: boolean | number;
  defaultIcon?: string;
  hideProgressBar?: boolean;
  position?: ToastPosition;
  role?: ToastRole;
  theme?: ToastTheme;
  transition?: ToastTransition;
}>();
</script>
