<template>
  <div class="app">
    <div v-if="!jwt"><strong>VITE_APP_COURIER_JWT </strong> must be set for this to work</div>
    <div v-else>
      <div class="selector">
        <button :class="{ selected: tabs === 'popup' }" @click="tabs = 'popup'">Popup</button>
        <button :class="{ selected: tabs === 'inbox' }" @click="tabs = 'inbox'">Inbox</button>
        <button :class="{ selected: tabs === 'toast' }" @click="tabs = 'toast'">Toast</button>
      </div>
      <div style="position: relative">
        <ExamplePopupMenu v-show="tabs === 'popup'" />
        <div v-show="tabs === 'inbox'">inbox</div>
        <ExampleToast v-show="tabs === 'toast'" />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { onMounted, ref } from 'vue';
import ExamplePopupMenu from './ExamplePopupMenu.vue';
import Example2 from './ExamplePopupMenu.vue';
import ExampleToast from './ExampleToast.vue';
import { useCourier } from '@/ts/useCourier2';

type Tab = 'popup' | 'inbox' | 'toast';

const userId = 'courier-vue-embedded';
const jwt = import.meta.env['VITE_APP_COURIER_JWT'];

const tabs = ref<Tab>('toast');

const { Courier } = useCourier();

onMounted(() => {
  onSignIn();
});

const onSignIn = () => {
  try {
    Courier.shared.signIn({
      userId,
      jwt
    });
    console.log('[auth] signed in', userId);
  } catch (error) {
    console.error('[auth] unable to sign in', error);
  }
};

const onSignOut = () => {
  try {
    Courier.shared.signOut();
    console.log('[auth] signed out');
  } catch (error) {
    console.error('[auth] unable to sign out', error);
  }
};
</script>

<style scoped>
.selector {
  display: flex;
  width: 100%;
}

.selector button {
  width: 100%;
}

.selector button:not(.selected) {
  background-color: transparent;
}
</style>
