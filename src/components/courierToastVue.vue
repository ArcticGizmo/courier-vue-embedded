<template>
  <div class="courier-toast-vue">
    <courier-toast />
  </div>
</template>

<script lang="ts" setup>
import { watch } from 'vue';
import { ToastProps } from '../types/toast';
// import { Courier } from '../ts/courier';

const props = defineProps<ToastProps>();

// watch(props, p => Courier.updateToast(p), { immediate: true, flush: 'pre' });
</script>
