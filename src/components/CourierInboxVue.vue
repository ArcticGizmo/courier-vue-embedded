<template>
  <div class="courier-inbox-vue">
    <courier-inbox />
  </div>
</template>

<script setup lang="ts">
import { watch } from 'vue';

import type { InboxProps } from '../types/inbox';
import { useCourier } from '../ts/useCourier';

const { on, whenReady, inbox } = useCourier();

// booleans get cast to false unless otherwise defaulted to another value
const props = withDefaults(defineProps<InboxProps>(), {
  isOpen: undefined,
  openLinksInNewTab: undefined,
  showUnreadMessageCount: undefined,
  views: () => []
});

const emits = defineEmits<{
  (e: 'update:isOpen', value: boolean): void;
}>();

whenReady(() => {
  on('inbox/TOGGLE_INBOX', resp => {
    emits('update:isOpen', !props.isOpen);
  });
});

watch(props, p => inbox.mergeConfig({ ...p }), { immediate: true, flush: 'pre' });
</script>
