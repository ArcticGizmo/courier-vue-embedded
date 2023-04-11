<template>
  <courier-inbox v-bind="props" />
</template>

<script setup lang="ts">
import type { InboxPlacement, InboxTheme, Brand, Labels } from '../types/inbox';

type Trigger = 'click' | 'hover';

const props = defineProps<{
  brand?: Brand,
  className?: string,
  openLinksInNewTab?: boolean,
  showUnreadMessageCount?: boolean,
  from?: number,
  formatDate?: (isoDate: string) => string;
  labels?: Labels,
  defaultIcon?: [false, string],
  placement?: InboxPlacement,
  theme?: InboxTheme,
  title?: string,
  trigger?: Trigger
}>();
</script>
