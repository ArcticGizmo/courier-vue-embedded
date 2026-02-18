<template>
  <div>
    <CourierToastVue v-if="visible" :mode :auto-dismiss :auto-dismiss-timeout-ms :dismiss-button />
    <div style="padding: 2rem">
      <div class="card" style="margin-top: 2rem">
        <div class="title">Settings</div>

        <hr />

        <div class="d-flex gap-2 align-center">
          <div>Controls</div>
          <button @click="emits('sign-in')">Sign In</button>
          <button @click="emits('sign-out')">Sign Out</button>
          <button @click="visible = !visible">Toggle Visibility ({{ visible ? 'visible' : 'not visible' }})</button>
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

        <hr />

        <div class="title">Test from Here</div>
        <SimpleInput v-model="message.title" label="Title" />
        <SimpleInput v-model="message.body" label="Body" />
        <button style="margin-top: 1rem" @click="onAddMessage()">Add message</button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import CourierToastVue from '@/components/CourierToastVue.vue';
import { InboxMessage } from '@trycourier/courier-ui-inbox';
import { reactive, ref } from 'vue';
import SimpleCheckbox from './SimpleCheckbox.vue';
import SimpleInput from './SimpleInput.vue';
import SimpleNumericInput from './SimpleNumericInput.vue';
import SimpleSelector from './SimpleSelector.vue';
import { useCourierToast } from '@/ts/useCourierToast';

type Mode = 'light' | 'dark' | 'system';
type DimissButtonMode = 'visible' | 'hidden' | 'hover' | 'auto';

const emits = defineEmits(['sign-in', 'sign-out']);

const { addMessage, removeMessage, handleEvent } = useCourierToast();

const visible = ref(true);
const mode = ref<Mode>('light');
const autoDismiss = ref(false);
const autoDismissTimeoutMs = ref(5_000);
const dismissButton = ref<DimissButtonMode>('auto');

const message = reactive<InboxMessage>({ title: 'Test Message', preview: 'lol' });

handleEvent('onMessageAdd', toast => console.log(toast.title));

// handleEvent(msg => );
// handleEvent();

const onAddMessage = () => {
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
