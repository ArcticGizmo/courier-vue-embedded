<template>
  <div>
    <CourierToastVue v-if="visible" :mode />
    <div style="padding: 2rem">
      <div class="card" style="margin-top: 2rem">
        <div class="title">Settings</div>

        <hr />

        <div class="d-flex gap-2 align-center">
          <div>Controls</div>
          <button @click="emits('sign-in')">Sign In</button>
          <button @click="emits('sign-out')">Sign Out</button>
          <button @click="visible = !visible">Toggle Visibility</button>
          <button @click="onAddMessage()">Add message</button>
        </div>

        <hr />

        <div class="d-flex gap-2 align-center">
          <div>Mode:</div>
          <div class="selector">
            <button :class="{ selected: mode === 'light' }" @click="mode = 'light'">Light</button>
            <button :class="{ selected: mode === 'dark' }" @click="mode = 'dark'">Dark</button>
            <button :class="{ selected: mode === 'system' }" @click="mode = 'system'">System</button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import CourierToastVue from '@/components/CourierToastVue.vue';
import { useCourierToast } from '@/ts/useCourier2';
import { InboxMessage } from '@trycourier/courier-ui-inbox';
import { ref } from 'vue';

type Mode = 'light' | 'dark' | 'system';

const emits = defineEmits(['sign-in', 'sign-out']);

const { addMessage, removeMessage } = useCourierToast();

const visible = ref(true);
const mode = ref<Mode>('light');

const onAddMessage = () => {
  const message: InboxMessage = {
    title: 'Example message'
  };
  addMessage(message);
};
</script>

<style scoped>
.card {
  padding: 1rem;
  border: 1px solid grey;
  min-height: 4rem;
  width: 100%;
  border-radius: 0.5rem;
  box-sizing: border-box;
}

.title {
  font-size: 1.25rem;
}

.selector button:not(.selected) {
  background-color: transparent;
}
</style>
