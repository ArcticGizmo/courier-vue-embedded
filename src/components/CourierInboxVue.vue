<template>
  <div class="courier-inbox-vue">
    <courier-inbox ref="inbox" 
    :height="props.height" 
    :light-theme="props.lightTheme ? JSON.stringify(props.lightTheme) : undefined"
    :dark-theme="props.darkTheme ? JSON.stringify(props.darkTheme) : undefined"
    :mode="props.mode"
    />
  </div>
</template>

<script setup lang="ts">
import { useTemplateRef, watch } from 'vue';

import type { CourierInboxProps } from '../types/inbox';
import { CourierInbox, CourierInboxListItemActionFactoryProps, CourierInboxListItemFactoryProps } from '@trycourier/courier-ui-inbox';

const inbox = useTemplateRef('inbox');

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
