<template>
  <div class="courier-toast-vue">
    <courier-toast ref="toast" v-bind="propsBinding" />
  </div>
</template>

<script setup lang="ts">
import { useTemplateRef, toRef, watch } from 'vue';
import type {
  CourierToast,
  CourierToastItemActionClickEvent,
  CourierToastItemClickEvent,
  CourierToastItemFactoryProps
} from '@trycourier/courier-ui-toast';
import { CourierToastProps, ToastActionClickEvent, ToastClickEvent } from '@/types';
import { useKebabBinding } from '@/ts/useKebabBinding';
import { useToastSlotRenderer } from './useToastSlotRenderer';
import { useCourierToast } from '@/ts/useCourierToast';

type SlotProps<T> = T & { ctx: CourierToast; dismiss: () => void };

const props = defineProps<CourierToastProps>();
const propsBinding = useKebabBinding(props);

const slots = defineSlots<{
  item(props: SlotProps<CourierToastItemFactoryProps>): any;
  'item-content'(props: SlotProps<CourierToastItemFactoryProps>): any;
}>();

const toast = useTemplateRef<CourierToast>('toast');
const { dismissToast } = useCourierToast();

useToastSlotRenderer(toRef(slots, 'item'), toast, t => t.setToastItem);
useToastSlotRenderer(toRef(slots, 'item-content'), toast, t => t.setToastItemContent);

const emits = defineEmits<{
  (e: 'item:click', value: ToastClickEvent): void;
  (e: 'action:click', value: ToastActionClickEvent): void;
}>();

watch(toast, t => {
  if (!t) {
    return;
  }

  t.onToastItemClick(props => {
    emits('item:click', { ...props, dismiss: () => dismissToast(props.message.messageId) });
  });
  t.onToastItemActionClick(props => {
    emits('action:click', { ...props, dismiss: () => dismissToast(props.message.messageId) });
  });
});
</script>
