<template>
  <div>
    <CourierToastVue v-if="visible" :mode :auto-dismiss :auto-dismiss-timeout-ms dismiss-button="hover" />
    <div style="padding: 2rem">
      <div class="card" style="margin-top: 2rem">
        <div class="title">Settings</div>

        <hr />

        <div class="d-flex gap-2 align-center">
          <div>Controls</div>
          <button @click="emits('sign-in')">Sign In</button>
          <button @click="emits('sign-out')">Sign Out</button>
          <button @click="visible = !visible">Toggle Visibility ({{ visible ? 'visible' : 'not visible' }})</button>
          <button @click="onAddMessage()">Add message</button>
        </div>

        <hr />

        <div class="d-flex gap-2 align-center">
          <div>Mode:</div>
          <SimpleSelector v-model="mode" :options="['light', 'dark', 'system']" />
        </div>

        <hr />

        <div class="d-flex gap-2 align-center">
          <SimpleCheckbox v-model="autoDismiss" label="Auto Dismiss" />
          <SimpleNumericInput v-model="autoDismissTimeoutMs" label="Dismiss After (ms)" />
          <SimpleSelector v-model="dismissButton" :options="['auto', 'hidden', 'hover', 'visible']" />
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
import SimpleCheckbox from './SimpleCheckbox.vue';
import SimpleInput from './SimpleInput.vue';
import SimpleNumericInput from './SimpleNumericInput.vue';
import SimpleSelector from './SimpleSelector.vue';

type Mode = 'light' | 'dark' | 'system';
type DimissButtonMode = 'visible' | 'hidden' | 'hover' | 'auto';

const emits = defineEmits(['sign-in', 'sign-out']);

const { addMessage, removeMessage } = useCourierToast();

const visible = ref(true);
const mode = ref<Mode>('light');
const autoDismiss = ref(true);
const autoDismissTimeoutMs = ref(5_000);
const dismissButton = ref<DimissButtonMode>('auto');

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
</style>
