<template>
  <div class="courier-inbox-popup-menu-vue" :class="{ disabled: !userId }">
    <courier-inbox-popup-menu ref="inbox" v-bind="propsBinding" />
  </div>
</template>

<script setup lang="ts">
import { onMounted, ref, toRef, useTemplateRef, watch } from 'vue';
import type { CourierInboxPopupMenuProps } from '../types';
import type {
  CourierInboxPopupMenu,
  CourierInboxListItemActionFactoryProps,
  CourierInboxListItemFactoryProps,
  CourierInboxMenuButtonFactoryProps,
  CourierInboxHeaderFactoryProps,
  CourierInboxStateEmptyFactoryProps,
  CourierInboxStateErrorFactoryProps,
  CourierInboxStateLoadingFactoryProps,
  CourierInboxPaginationItemFactoryProps
} from '@trycourier/courier-ui-inbox';
import { useKebabBinding } from '@/ts/useKebabBinding';
import { useCourier } from '@/ts/useCourier2';
import { useInboxSlotRenderer } from './useInboxSlotRenderer';

type SlotProps<T> = T & { ctx: CourierInboxPopupMenu };

const props = withDefaults(defineProps<CourierInboxPopupMenuProps>(), { mode: 'light' });
const propsBinding = useKebabBinding(props);

const slots = defineSlots<{
  button(props: SlotProps<CourierInboxMenuButtonFactoryProps>): any;
  header(props: SlotProps<CourierInboxHeaderFactoryProps>): any;
  item(props: SlotProps<CourierInboxListItemFactoryProps>): any;
  empty(props: SlotProps<CourierInboxStateEmptyFactoryProps>): any;
  error(props: SlotProps<CourierInboxStateErrorFactoryProps>): any;
  loading(props: SlotProps<CourierInboxStateLoadingFactoryProps>): any;
  pagination(props: SlotProps<CourierInboxPaginationItemFactoryProps>): any;
}>();

const { userId } = useCourier();

const inbox = useTemplateRef<CourierInboxPopupMenu>('inbox');

useInboxSlotRenderer(toRef(slots, 'button'), inbox, ibx => ibx.setMenuButton);
useInboxSlotRenderer(toRef(slots, 'header'), inbox, ibx => ibx.setHeader);
useInboxSlotRenderer(toRef(slots, 'item'), inbox, ibx => ibx.setListItem);
useInboxSlotRenderer(toRef(slots, 'empty'), inbox, ibx => ibx.setEmptyState);
useInboxSlotRenderer(toRef(slots, 'error'), inbox, ibx => ibx.setErrorState);
useInboxSlotRenderer(toRef(slots, 'loading'), inbox, ibx => ibx.setLoadingState);
useInboxSlotRenderer(toRef(slots, 'pagination'), inbox, ibx => ibx.setPaginationItem);

const emits = defineEmits<{
  (e: 'message:clicked', value: CourierInboxListItemFactoryProps): void;
  (e: 'message:actionClicked', value: CourierInboxListItemActionFactoryProps): void;
  (e: 'message:longPressed', value: CourierInboxListItemFactoryProps): void;
}>();

watch(inbox, ibx => {
  if (!ibx) {
    return;
  }

  ibx.onMessageClick(props => emits('message:clicked', props));
  ibx.onMessageActionClick(props => emits('message:actionClicked', props));
  ibx.onMessageLongPress(props => emits('message:longPressed', props));
});
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
