<template>
  <div class="courier-inbox-popup-menu-vue" :class="{ disabled: !userId }">
    <courier-inbox-popup-menu ref="inbox" v-bind="propsBinding" />

    <div style="display: none">
      <div v-if="menuButton.hasSlot" :ref="menuButton.name">
        <slot name="menu-button" v-bind="{ props: menuButton.props.value }" :inbox="inbox!" />
      </div>
      <!-- <div v-if="header.hasSlot" :ref="header.name">
        <slot name="header" v-bind="header.props.value" :inbox="inbox!" />
      </div> -->
      <!-- <div v-if="listItem.hasSlot" :ref="listItem.name">
        <slot name="list-item" v-bind="listItem.props.value" :inbox="inbox!" />
      </div> -->
      <div v-if="emptyState.hasSlot" :ref="emptyState.name">
        <slot name="empty-state" v-bind="emptyState.props.value" :inbox="inbox!" />
      </div>
      <div v-if="errorState.hasSlot" :ref="errorState.name">
        <slot name="error-state" v-bind="errorState.props.value" :inbox="inbox!" />
      </div>
      <div v-if="loadingState.hasSlot" :ref="loadingState.name">
        <slot name="loading-item" v-bind="loadingState.props.value" :inbox="inbox!" />
      </div>
      <div v-if="paginationItem.hasSlot" :ref="paginationItem.name">
        <slot name="pagination-item" v-bind="paginationItem.props.value" :inbox="inbox!" />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { onMounted, ref, useSlots, useTemplateRef, watch } from 'vue';
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
import { useInboxMultiRenderer, useInboxRenderer } from './useInboxRenderer';

type Props = Omit<
  CourierInboxPopupMenuProps,
  | 'renderMenuButton'
  | 'renderHeader'
  | 'renderListItem'
  | 'renderEmptyState'
  | 'renderErrorState'
  | 'renderLoadingState'
  | 'renderPaginationItem'
>;

const props = withDefaults(defineProps<Props>(), { mode: 'light' });
const propsBinding = useKebabBinding(props);

const { userId } = useCourier();

const slots = useSlots();

const inbox = useTemplateRef<CourierInboxPopupMenu>('inbox');

const menuButton = useInboxRenderer<CourierInboxMenuButtonFactoryProps>(inbox, 'menu-button', ibx => ibx.setMenuButton);
const header = useInboxRenderer<CourierInboxHeaderFactoryProps>(inbox, 'header', ibx => ibx.setHeader);
// const listItem = useInboxRenderer<CourierInboxListItemFactoryProps>(inbox, 'item', ibx => ibx.setListItem);
const listItem = useInboxMultiRenderer<CourierInboxListItemFactoryProps>(
  inbox,
  'list-item',
  ibx => ibx.setListItem,
  p => p.message.messageId
);
const emptyState = useInboxRenderer<CourierInboxStateEmptyFactoryProps>(inbox, 'empty-state', ibx => ibx.setEmptyState);
const errorState = useInboxRenderer<CourierInboxStateErrorFactoryProps>(inbox, 'error-state', ibx => ibx.setErrorState);
const loadingState = useInboxRenderer<CourierInboxStateLoadingFactoryProps>(
  inbox,
  'loading-state',
  ibx => ibx.setLoadingState
);
const paginationItem = useInboxRenderer<CourierInboxPaginationItemFactoryProps>(
  inbox,
  'pagination-item',
  ibx => ibx.setPaginationItem
);

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

  // ibx.setListItem(p => {
  //   console.log(p);
  //   const el = document.createElement('courier-inbox-list-item');
  //   el.id = p?.message.messageId;
  //   el.classList.add('bacon');
  //   el.innerText = p?.message.messageId;
  //   el.message = p?.message;
  //   return el;
  // });
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
