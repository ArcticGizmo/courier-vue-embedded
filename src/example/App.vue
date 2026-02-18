<template>
  <div class="app">
    <div v-if="!jwt"><strong>VITE_APP_COURIER_JWT </strong> must be set for this to work</div>
    <div v-else>
      <SimpleSelector class="tab-selector" v-model="tab" :options="['popup', 'inbox', 'toast']" />

      <div style="position: relative">
        <ExamplePopupMenu v-show="tab === 'popup'" @sign-in="onSignIn()" @sign-out="onSignOut()" />
        <div v-show="tab === 'inbox'">inbox</div>
        <ExampleToast v-show="tab === 'toast'" @sign-in="onSignIn()" @sign-out="onSignOut()" />
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
import SimpleSelector from './SimpleSelector.vue';

type Tab = 'popup' | 'inbox' | 'toast';

const userId = 'courier-vue-embedded';
const jwt = import.meta.env['VITE_APP_COURIER_JWT'];

const tab = ref<Tab>('toast');

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
.tab-selector {
  width: 100%;
  display: flex;
}

:deep(.tab-selector) button {
  width: 100%;
}
</style>
