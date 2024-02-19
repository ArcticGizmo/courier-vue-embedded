<template>
  <div id="app">
    <CourierToastVue />
    <CourierInboxVue />
    <CourierPreferencesVue />
    <button @click="onFetchMessages">Fetch messages</button>
    <button @click="onFetchUnreadCount">Fetch unread count</button>
    <button @click="onMarkAllRead">Mark all ready</button>
    <button @click="onNewMessage">new message</button>
    <button @click="onTrackClick">track click</button>
    <button @click="onSetConfig">set config</button>
    <button @click="onFetchRecipientPreferences">get recipient prefs</button>
    <button @click="onFetchPreferencePage">get pref page</button>
    <button @click="onAddToast">Add toast</button>
  </div>
</template>

<script setup lang="ts">
import { CourierInboxVue, useCourier, CourierPreferencesVue, CourierToastVue } from '../../../src/index';
const props = defineProps<{ clientKey: string }>();

const { client } = useCourier({
  clientKey: props.clientKey,
  userId: 'courier-vue-embedded'
});

const onFetchMessages = async () => {
  const resp = await client.inbox.fetchMessages();
  console.dir(resp);
};

const onFetchUnreadCount = async () => {
  const resp = await client.inbox.getUnreadMessageCount();
  console.dir(resp);
};

const onMarkAllRead = async () => {
  const resp = await client.inbox.markAllAsRead(true);
  console.dir(resp);
};

const onNewMessage = async () => {
  await client.inbox.newMessage({
    messageId: '5',
    title: 'Hello',
    preview: 'something',
    created: '2024-02-19T00:00:00Z'
  });
};

const onSetConfig = async () => {
  await client.inbox.setConfig({ placement: 'bottom' });
};

const onTrackClick = async () => {
  await client.inbox.trackClick('555', '555');
};

const onFetchRecipientPreferences = async () => {
  const resp = await client.preferences.fetchRecipientPreferences();
  console.dir(resp);
};

const onFetchPreferencePage = async () => {
  const resp = await client.preferences.fetchPreferencePage(undefined, true);
  console.dir(resp);
};

const onAddToast = async () => {
  await client.toast.create({ title: 'Hello', preview: 'body' });
};
</script>

<style>
courier-inbox {
  position: fixed;
  z-index: 1000;
  right: 2rem;
  top: 1rem;
  width: 2rem;
  height: 2rem;
}
</style>
