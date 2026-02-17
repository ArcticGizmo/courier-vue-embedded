<template>
  <div class="courier-toast-vue">
    <courier-toast ref="inbox" v-bind="propsBinding"/>
  </div>
</template>

<script setup lang="ts">
import { useTemplateRef } from 'vue';
import type { CourierToast, CourierToastItemActionClickEvent, CourierToastItemClickEvent } from '@trycourier/courier-ui-toast';
import { CourierToastProps } from '@/types';
import { useKebabBinding } from '@/ts/useKebabBinding';

const inbox = useTemplateRef<CourierToast>('inbox');

const props = defineProps<CourierToastProps>();
const propsBinding = useKebabBinding(props);

const emits = defineEmits<{
  (e: 'onToastItemClick', value: CourierToastItemClickEvent): void;
  (e: 'onToastItemActionClick', value: CourierToastItemActionClickEvent): void;
}>();

inbox.value?.onToastItemClick((props) => emits('onToastItemClick', props))
inbox.value?.onToastItemActionClick((props) => emits('onToastItemActionClick', props))
</script>
