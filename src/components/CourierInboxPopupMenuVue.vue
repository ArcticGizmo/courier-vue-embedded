<template>
  <div class="courier-inbox-vue">
    <courier-inbox-popup-menu ref="inbox" v-bind="propsBinding" />
  </div>
</template>

<script setup lang="ts">
import { useTemplateRef } from 'vue';
import type { CourierInboxPopupMenuProps } from '../types';
import {
  type CourierInboxPopupMenu,
  type CourierInboxListItemActionFactoryProps,
  type CourierInboxListItemFactoryProps
} from '@trycourier/courier-ui-inbox';
import { useKebabBinding } from '@/ts/useKebabBinding';

const inbox = useTemplateRef<CourierInboxPopupMenu>('inbox');

const props = withDefaults(defineProps<CourierInboxPopupMenuProps>(), { mode: 'light' });

const propsBinding = useKebabBinding(props);

const emits = defineEmits<{
  (e: 'messageClicked', value: CourierInboxListItemFactoryProps): void;
  (e: 'messageActionClicked', value: CourierInboxListItemActionFactoryProps): void;
  (e: 'messageLongPressed', value: CourierInboxListItemFactoryProps): void;
}>();

inbox.value?.onMessageClick(props => emits('messageClicked', props));
inbox.value?.onMessageActionClick(props => emits('messageActionClicked', props));
inbox.value?.onMessageLongPress(props => emits('messageLongPressed', props));
</script>
