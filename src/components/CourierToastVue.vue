<template>
  <div class="courier-toast-vue">
    <courier-toast />
  </div>
</template>

<script lang="ts" setup>
import { watch } from 'vue';
import { ToastProps } from '../types/toast';
import { useCourier } from '../ts/useCourier';

// booleans get cast to false unless otherwise defaulted to another value
const props = withDefaults(defineProps<ToastProps>(), {
  autoClose: undefined,
  defaultIcon: undefined,
  hideProgressBar: undefined,
  openLinksInNewTab: undefined
});

const { toast } = useCourier();

watch(props, p => toast.mergeConfig(p), { immediate: true, flush: 'pre' });
</script>
