<template>
  <div class="courier-inbox-vue">
    <courier-inbox ref="inbox" v-bind="$props" />
  </div>
</template>

<script setup lang="ts">
import { useTemplateRef } from 'vue';

import type { CourierInboxProps } from '../types/inbox';
import { type CourierInbox, CourierInboxListItemActionFactoryProps, CourierInboxListItemFactoryProps } from '@trycourier/courier-ui-inbox';

const inbox = useTemplateRef<CourierInbox>('inbox');

const props = defineProps<CourierInboxProps>();

const emits = defineEmits<{
  (e: 'messageClicked', value: CourierInboxListItemFactoryProps): void;
  (e: 'messageActionClicked', value: CourierInboxListItemActionFactoryProps): void;
  (e: 'messageLongPressed', value: CourierInboxListItemFactoryProps): void;
}>();


inbox.value?.onMessageClick((props) => emits('messageClicked', props))
inbox.value?.onMessageActionClick((props) => emits('messageActionClicked', props))
inbox.value?.onMessageLongPress((props) => emits('messageLongPressed', props))

</script>
