<template>
  <div class="courier-inbox-popup-menu-vue" :class="{ disabled: !userId }">
    <courier-inbox-popup-menu ref="inbox" v-bind="propsBinding" />
    <div v-show="menuButton.hasSlot" :ref="menuButton.name">
      <slot :name="menuButton.name" v-bind="{ props: menuButton.props! }" />
    </div>
  </div>
</template>

<script setup lang="ts">
import { onMounted, ref, useTemplateRef, watch } from 'vue';
import type { CourierInboxPopupMenuProps } from '../types';
import type {
  CourierInboxPopupMenu,
  CourierInboxListItemActionFactoryProps,
  CourierInboxListItemFactoryProps,
  CourierInboxMenuButtonFactoryProps
} from '@trycourier/courier-ui-inbox';
import { useKebabBinding } from '@/ts/useKebabBinding';
import { useCourier } from '@/ts/useCourier2';
import { useInboxRenderer } from './useInboxRenderer';

const props = withDefaults(defineProps<CourierInboxPopupMenuProps>(), { mode: 'light' });
const propsBinding = useKebabBinding(props);

const { userId } = useCourier();

const inbox = useTemplateRef<CourierInboxPopupMenu>('inbox');
const menuButton = useInboxRenderer<CourierInboxMenuButtonFactoryProps>(inbox, 'menu-button', ibx => ibx.setMenuButton);

const emits = defineEmits<{
  (e: 'message:clicked', value: CourierInboxListItemFactoryProps): void;
  (e: 'message:actionClicked', value: CourierInboxListItemActionFactoryProps): void;
  (e: 'message:longPressed', value: CourierInboxListItemFactoryProps): void;
}>();

watch(inbox, ibx => {
  ibx?.onMessageClick(props => emits('message:clicked', props));
  ibx?.onMessageActionClick(props => emits('message:actionClicked', props));
  ibx?.onMessageLongPress(props => emits('message:longPressed', props));
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
