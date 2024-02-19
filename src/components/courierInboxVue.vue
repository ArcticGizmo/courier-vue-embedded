<template>
  <div class="courier-inbox-vue">
    <courier-inbox />
  </div>
</template>

<script setup lang="ts">
import { watch } from 'vue';

import type { InboxProps } from '../types/inbox';
// import { Courier } from '../ts/courier';

// expressly force isOpen to be undefined by default to allow courier to detected a controlled value
const props = withDefaults(defineProps<InboxProps>(), {
  isOpen: undefined
});

// watch(props, p => Courier.updateInbox(p), { immediate: true, flush: 'pre' });
</script>
