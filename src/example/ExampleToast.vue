<template>
  <div>
    <CourierToastVue v-if="visible" />
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
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import CourierToastVue from '@/components/CourierToastVue.vue';
import { useCourierToast } from '@/ts/useCourier2';
import { InboxMessage } from '@trycourier/courier-ui-inbox';
import { ref } from 'vue';

const emits = defineEmits(['sign-in', 'sign-out']);

const { addMessage, removeMessage } = useCourierToast();

const visible = ref(true);

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
