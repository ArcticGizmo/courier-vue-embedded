<template>
  <div class="courier-toast-vue">
    <courier-toast />
  </div>
</template>

<script lang="ts" setup>
import { watch } from 'vue';
import { ToastProps } from '../types/toast';
import { useCourier } from '../ts/useCourier';

const props = defineProps<ToastProps>();

const { toast } = useCourier();

watch(props, p => toast.mergeConfig(p), { immediate: true, flush: 'pre' });
</script>
