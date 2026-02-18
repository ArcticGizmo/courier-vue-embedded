<template>
  <div class="courier-toast-vue">
    <courier-toast ref="toast" v-bind="propsBinding" />
  </div>
</template>

<script setup lang="ts">
import { useTemplateRef, watch } from 'vue';
import type {
  CourierToast,
  CourierToastItemActionClickEvent,
  CourierToastItemClickEvent
} from '@trycourier/courier-ui-toast';
import { CourierToastProps } from '@/types';
import { useKebabBinding } from '@/ts/useKebabBinding';

const toast = useTemplateRef<CourierToast>('toast');

const props = defineProps<CourierToastProps>();
const propsBinding = useKebabBinding(props);

const emits = defineEmits<{
  (e: 'item:click', value: CourierToastItemClickEvent): void;
  (e: 'action:click', value: CourierToastItemActionClickEvent): void;
}>();

watch(toast, t => {
  if (!t) {
    return;
  }

  console.dir(t);

  // t.onToastItemClick(props => emits('item:click', props));
  // t.onToastItemActionClick(props => emits('action:click', props));
});
</script>
