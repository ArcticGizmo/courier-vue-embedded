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

// expressly force isOpen to be undefined by default to allow courier to
// detected a controlled value
const props = withDefaults(defineProps<InboxProps>(), {
  isOpen: undefined
});

const emits = defineEmits<{
  (e: 'update:isOpen', value: boolean): void;
}>();

whenReady(() => {
  on('inbox/TOGGLE_INBOX', resp => {
    emits('update:isOpen', resp.payload || false);
  });
});

watch(props, p => inbox.mergeConfig({ ...p }), { immediate: true, flush: 'pre' });
</script>
