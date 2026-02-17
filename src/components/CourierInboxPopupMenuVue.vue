<template>
  <div class="courier-inbox-popup-menu-vue" :class="{ disabled: !userId }">
    <courier-inbox-popup-menu ref="inbox" v-bind="propsBinding" />
  </div>
</template>

<script setup lang="ts">
import { onMounted, useTemplateRef, watch } from 'vue';
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
  (e: 'message:clicked', value: CourierInboxListItemFactoryProps): void;
  (e: 'message:actionClicked', value: CourierInboxListItemActionFactoryProps): void;
  (e: 'message:longPressed', value: CourierInboxListItemFactoryProps): void;
}>();

watch(
  inbox,
  i => {
    inbox.value?.onMessageClick(props => emits('message:clicked', props));
    inbox.value?.onMessageActionClick(props => emits('message:actionClicked', props));
    inbox.value?.onMessageLongPress(props => emits('message:longPressed', props));
  },
  { once: true }
);
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
