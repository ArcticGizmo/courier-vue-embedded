<template>
  <courier-inbox v-bind="props" />
</template>

<script setup lang="ts">
import type { InboxPlacement, InboxTheme, Brand, Labels, InboxTrigger } from '../types/inbox';

const props = defineProps<{
  brand?: Brand;
  className?: string;
  openLinksInNewTab?: boolean;
  showUnreadMessageCount?: boolean;
  from?: number;
  formatDate?: (isoDate: string) => string;
  labels?: Labels;
  defaultIcon?: [false, string];
  placement?: InboxPlacement;
  theme?: InboxTheme;
  title?: string;
  trigger?: InboxTrigger;
}>();
</script>
