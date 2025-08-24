<template>
  <div class="courier-inbox-vue">
    <courier-inbox-popup-menu ref="inbox" :popup-alignment="props.popupAlignment" :popup-width="props.popupWidth"
      :popup-height="props.popupHeight" :left="props.left" :top="props.top" :right="props.right" :bottom="props.bottom"
      :light-theme="props.lightTheme ? JSON.stringify(props.lightTheme) : undefined"
      :dark-theme="props.darkTheme ? JSON.stringify(props.darkTheme) : undefined" 
      :mode="props.mode"
      />
  </div>
</template>

<script setup lang="ts">
import { useTemplateRef } from 'vue';
import type { CourierInboxPopupMenuProps } from '../types';
import { type CourierInboxPopupMenu, type CourierInboxListItemActionFactoryProps, type CourierInboxListItemFactoryProps } from '@trycourier/courier-ui-inbox';

const inbox = useTemplateRef<CourierInboxPopupMenu>('inbox');

const props = withDefaults(defineProps<CourierInboxPopupMenuProps>(), {mode: "light"});

const emits = defineEmits<{
  (e: 'messageClicked', value: CourierInboxListItemFactoryProps): void;
  (e: 'messageActionClicked', value: CourierInboxListItemActionFactoryProps): void;
  (e: 'messageLongPressed', value: CourierInboxListItemFactoryProps): void;
}>();


inbox.value?.onMessageClick((props) => emits('messageClicked', props))
inbox.value?.onMessageActionClick((props) => emits('messageActionClicked', props))
inbox.value?.onMessageLongPress((props) => emits('messageLongPressed', props))

</script>
