<template>
  <CourierInboxVue
    v-model:isOpen="isOpen"
    :views="views"
    :show-unread-message-count="inboxShowUnreadMessageCount"
    :open-links-in-new-tab="inboxOpenLinksInNewTab"
    :labels="inboxLabels"
    :title="inboxTitle"
  />
  <CourierToastVue :appendTo="appendTo" :auto-close="autoClose" :hide-progress-bar="toastHideProgressBar" />
  <div class="configuration">
    <h2>Inbox</h2>
    <button @click="isOpen = !isOpen">Toggle Open</button>
    <h4>Views</h4>
    <div>Note: this does not update while the inbox is open</div>
    <ul style="padding-left: 1rem">
      <li><SimpleCheckbox v-model="viewMessages" label="Messages" /></li>
      <li><SimpleCheckbox v-model="viewArchived" label="Archived" /></li>
      <li><SimpleCheckbox v-model="viewPreferences" label="Preferences" /></li>
    </ul>

    <SimpleInput v-model="inboxTitle" label="Fallback title (when all views are off)" />
    <h4>Labels</h4>
    <div>Note: controls wording within the mailbox (used for localisation)</div>
    <div class="grid">
      <SimpleInput v-model="inboxLabels.archiveMessage" label="Archive Message" placeholder="Archived Message" />
      <SimpleInput v-model="inboxLabels.backToInbox" label="Back to Inbox" />
      <SimpleInput v-model="inboxLabels.closeInbox" label="Close Inbox" placeholder="Close Inbox" />
      <SimpleInput
        v-model="inboxLabels.emptyState"
        label="Empty State (no messages)"
        placeholder="You’re all caught up"
      />
      <SimpleInput v-model="inboxLabels.markAllAsRead" label="Mark All As Read" />
      <SimpleInput v-model="inboxLabels.markAsRead" label="Mark as Read" placeholder="Mark as Read" />
      <SimpleInput v-model="inboxLabels.markAsUnread" label="Mark as Unread" placeholder="Mark Unread" />
      <SimpleInput v-model="inboxLabels.scrollTop" label="Scroll Top" />
    </div>

    <h4>Config</h4>
    <div class="grid">
      <SimpleCheckbox v-model="inboxOpenLinksInNewTab" label="Open Links in New Tab" />
      <SimpleCheckbox v-model="inboxShowUnreadMessageCount" label="Show unread count on bell" />
    </div>

    <br />
    <h2>Toast</h2>
    <div class="grid">
      <SimpleInput v-model="toastTitle" label="Title" />
      <SimpleInput v-model="toastPreview" label="Preview" />
      <SimpleNumericInput
        v-model="toastAutoCloseDuration"
        label="Auto-close after (ms)"
        :disabled="toastDisableAutoClose"
      />
      <SimpleCheckbox v-model="toastDisableAutoClose" label="No autoclose" />
      <SimpleCheckbox v-model="toastHideProgressBar" label="Hide Progress" />
      <SimpleCheckbox v-model="toastOpenLinksInNewTab" label="Open Links in New Tab" />
    </div>

    <button @click="onCreateToast()">Create Toast</button>

    <h2>Preferences</h2>
    <CourierPreferencesVue />
  </div>
</template>

<script setup lang="ts">
import { useCourier, CourierToastVue, CourierInboxVue, CourierPreferencesVue, View, InboxLabels } from '@/index';
import { computed, reactive, ref } from 'vue';
import type { IInboxMessagePreview } from '@/types/core';

import SimpleInput from './SimpleInput.vue';
import SimpleNumericInput from './SimpleNumericInput.vue';
import SimpleCheckbox from './SimpleCheckbox.vue';
const props = withDefaults(defineProps<{ userId?: string; appendTo?: string }>(), { userId: 'courier-vue-embedded' });

const clientKey = import.meta.env['VITE_APP_CLIENT_KEY'];

const courier = useCourier();

const isOpen = ref(false);

const toastTitle = ref('');
const toastPreview = ref('');
const toastAutoCloseDuration = ref<number>();
const toastDisableAutoClose = ref(false);
const toastHideProgressBar = ref(false);
const toastOpenLinksInNewTab = ref(false);

const inboxTitle = ref('');
const viewMessages = ref(true);
const viewArchived = ref(true);
const viewPreferences = ref(true);
const inboxOpenLinksInNewTab = ref(true);
const inboxShowUnreadMessageCount = ref(false);
const inboxLabels = ref<InboxLabels>({
  archiveMessage: undefined,
  backToInbox: undefined,
  closeInbox: undefined,
  emptyState: undefined,
  markAllAsRead: undefined,
  markAsRead: undefined,
  markAsUnread: undefined,
  scrollTop: undefined
});

const views = computed(() => {
  const v: View[] = [];

  if (viewMessages.value) v.push({ id: 'messages', label: 'Messages' });
  if (viewArchived.value) v.push({ id: 'archived', label: 'Archived', params: { archived: true } });
  if (viewPreferences.value) v.push({ id: 'preferences', label: 'Preferences' });

  return v;
});

const autoClose = computed(() => {
  if (toastDisableAutoClose.value) {
    return false;
  }
  return toastAutoCloseDuration.value;
});

courier.init({
  userId: props.userId,
  clientKey
});

const onCreateToast = () => {
  courier.toast.create({
    title: toastTitle.value || undefined,
    preview: toastPreview.value || undefined
  });
};
</script>

<style>
courier-inbox {
  position: fixed;
  z-index: 1000;
  right: 2rem;
  top: 1rem;
}
</style>

<style scoped>
h2 {
  border-bottom: 1px solid grey;
}

.configuration > * {
  margin-bottom: 0.5rem;
}

.configuration button {
  width: 165px;
}

button {
  background-color: rgb(129, 235, 251);
  height: 2rem;
  border-width: 0;
  outline: none;
  border-radius: 2px;
  box-shadow: 0 1px 4px rgba(0, 0, 0, 0.6);
  cursor: pointer;
}

button:hover,
button:focus {
  background-color: rgb(86, 233, 255);
}

.grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
}

.grid > * {
  margin-top: 0.5rem;
}
</style>
