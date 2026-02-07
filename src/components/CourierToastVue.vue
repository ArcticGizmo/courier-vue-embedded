<template>
  <div class="courier-inbox-vue">
    <courier-toast ref="inbox" v-bind="$props" />
  </div>
</template>

<script setup lang="ts">
import { useTemplateRef } from 'vue';

import type { CourierInboxProps } from '../types/inbox';
import type { CourierToast, CourierToastItemActionClickEvent, CourierToastItemClickEvent } from '@trycourier/courier-ui-toast';

const inbox = useTemplateRef<CourierToast>('inbox');

const props = defineProps<CourierInboxProps>();

const emits = defineEmits<{
  (e: 'onToastItemClick', value: CourierToastItemClickEvent): void;
  (e: 'onToastItemActionClick', value: CourierToastItemActionClickEvent): void;
}>();

inbox.value?.onToastItemClick((props) => emits('onToastItemClick', props))
inbox.value?.onToastItemActionClick((props) => emits('onToastItemActionClick', props))
</script>
