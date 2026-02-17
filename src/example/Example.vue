<template>
  <CourierInboxPopupMenu />

  <CourierToastVue :auto-dismiss="true" :auto-dismiss-timeout-ms="toastAutoCloseDuration" />
  <div class="configuration">
    <h2>Inbox</h2>
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
      <!--<SimpleInput v-model="inboxLabels.archiveMessage" label="Archive Message" placeholder="Archived Message" />
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
      <SimpleInput v-model="inboxLabels.scrollTop" label="Scroll Top" />-->
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
import { useCourier } from '@/index';
import { computed, ref } from 'vue';

import SimpleInput from './SimpleInput.vue';
import SimpleNumericInput from './SimpleNumericInput.vue';
import SimpleCheckbox from './SimpleCheckbox.vue';
import CourierInboxPopupMenu from '@/components/CourierInboxPopupMenuVue.vue';
import CourierToastVue from '@/components/CourierToastVue.vue';
const props = defineProps<{ userId: string }>();

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
/*const inboxLabels = ref<InboxLabels>({
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
});*/

const autoClose = computed(() => {
  if (toastDisableAutoClose.value) {
    return false;
  }
  return toastAutoCloseDuration.value;
});

try {
  courier.auth.value.signIn({
    userId: props.userId,
    publicApiKey: clientKey
  });
} catch (error) {
  console.error('unable to sign in', error);
}

const onCreateToast = () => {
  courier.toast.value.addMessage({
    messageId: `message-${Math.random() * 400}`,
    title: toastTitle.value || undefined,
    preview: toastPreview.value || undefined
  });
};
</script>

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

.grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
}

.grid > * {
  margin-top: 0.5rem;
}
</style>
