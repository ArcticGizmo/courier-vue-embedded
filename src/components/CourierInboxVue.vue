<template>
  <courier-inbox v-bind="props" />
</template>

<script setup lang="ts">
import { PropType } from 'vue';
import type { InboxPlacement, InboxTheme, Brand } from '../types/inbox';

type Trigger = 'click' | 'hover';

const props = defineProps({
  brand: { type: Object as PropType<Brand> },
  className: String,
  defaultIcon: { type: [Boolean, String] },
  placement: { type: String as PropType<InboxPlacement> },
  theme: { type: Object as PropType<InboxTheme> },
  title: String,
  trigger: { type: String as PropType<Trigger> }
});
</script>

<style>
courier-inbox div[class^='styled__MessageList'] {
  overflow-x: hidden;
}
</style>
