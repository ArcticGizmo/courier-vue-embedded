<template>
  <div class="courier-inbox-popup-menu-vue" :class="{ disabled: !userId }">
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
import { useCourier } from '@/ts/useCourier2';

const inbox = useTemplateRef<CourierInboxPopupMenu>('inbox');

const props = withDefaults(defineProps<CourierInboxPopupMenuProps>(), { mode: 'light' });

const { userId } = useCourier();

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

<style>
.courier-inbox-popup-menu-vue.disabled {
  opacity: 0.5;
  pointer-events: none;
}

.courier-inbox-popup-menu-vue.disabled courier-inbox-popup-menu #unread-badge {
  display: none !important;
}
</style>
