<template>
  <div class="courier-inbox-vue" :style="{ height }">
    <courier-inbox ref="inbox" v-bind="propsBinding" />
  </div>
</template>

<script setup lang="ts">
import { toRef, useTemplateRef } from 'vue';

import type { CourierInboxProps } from '../types/inbox';
import {
  type CourierInbox,
  CourierInboxHeaderFactoryProps,
  CourierInboxListItemActionFactoryProps,
  CourierInboxListItemFactoryProps,
  CourierInboxPaginationItemFactoryProps,
  CourierInboxStateEmptyFactoryProps,
  CourierInboxStateErrorFactoryProps,
  CourierInboxStateLoadingFactoryProps
} from '@trycourier/courier-ui-inbox';
import { useKebabBinding } from '@/ts/useKebabBinding';
import { useInboxSlotRenderer } from './useInboxSlotRenderer';

const props = defineProps<CourierInboxProps>();
const propsBinding = useKebabBinding(props);

const inbox = useTemplateRef<CourierInbox>('inbox');

const slots = defineSlots<{
  header(props: CourierInboxHeaderFactoryProps): any;
  item(props: CourierInboxListItemFactoryProps): any;
  empty(props: CourierInboxStateEmptyFactoryProps): any;
  loading(props: CourierInboxStateLoadingFactoryProps): any;
  error(props: CourierInboxStateErrorFactoryProps): any;
  pagination(props: CourierInboxPaginationItemFactoryProps): any;
}>();

useInboxSlotRenderer(toRef(slots, 'header'), inbox, ibx => ibx.setHeader);
useInboxSlotRenderer(toRef(slots, 'item'), inbox, ibx => ibx.setListItem);
useInboxSlotRenderer(toRef(slots, 'empty'), inbox, ibx => ibx.setEmptyState);
useInboxSlotRenderer(toRef(slots, 'loading'), inbox, ibx => ibx.setLoadingState);
useInboxSlotRenderer(toRef(slots, 'error'), inbox, ibx => ibx.setErrorState);
useInboxSlotRenderer(toRef(slots, 'pagination'), inbox, ibx => ibx.setPaginationItem);

const emits = defineEmits<{
  (e: 'message:clicked', value: CourierInboxListItemFactoryProps): void;
  (e: 'message:actionClicked', value: CourierInboxListItemActionFactoryProps): void;
  (e: 'message:longPressed', value: CourierInboxListItemFactoryProps): void;
}>();

inbox.value?.onMessageClick(props => emits('message:clicked', props));
inbox.value?.onMessageActionClick(props => emits('message:actionClicked', props));
inbox.value?.onMessageLongPress(props => emits('message:longPressed', props));
</script>
