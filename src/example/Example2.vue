<template>
  <div class="inbox-container" :class="inboxPlacement">
    <CourierInboxPopupMenuVue v-if="visible" :popup-alignment :render-header @message:clicked="onClick" />
  </div>
  <div style="padding: 2rem">
    <div class="card" style="margin-top: 2rem">
      <div class="title">Settings</div>
      <hr />
      <div class="d-flex gap-2 align-center">
        <div>Controls</div>
        <button @click="signIn()">Sign In</button>
        <button @click="signOut()">Sign Out</button>
        <button @click="visible = !visible">Toggle Visibility</button>
      </div>

      <hr />

      <div class="d-flex gap-2 align-center">
        <AlignmentSelector v-model="inboxPlacement" />
        <div>Placement</div>
        <AlignmentSelector v-model="popupAlignment" />
        <div>Alignment</div>
      </div>

      <div class="d-flex gap-2 align-center"></div>
    </div>
  </div>
</template>

<script setup lang="ts">
import CourierInboxPopupMenuVue from '@/components/CourierInboxPopupMenuVue.vue';
import { useCourier } from '@/ts/useCourier2';
import { onMounted, ref } from 'vue';
import AlignmentSelector from './AlignmentSelector.vue';
import { CourierInboxHeaderFactoryProps } from '@trycourier/courier-ui-inbox';

const props = defineProps<{ userId: string; jwt: string }>();

const { Courier, userId } = useCourier();

const visible = ref(true);
const inboxPlacement = ref('top-left');
const popupAlignment = ref('top-left');

onMounted(() => {
  console.dir(Courier.shared);
  signIn();
});

const signIn = () => {
  try {
    Courier.shared.signIn({
      userId: props.userId,
      jwt: props.jwt
    });
    console.log('[auth] signed in');
  } catch (error) {
    console.error('[auth] unable to sign in', error);
  }
};

const signOut = () => {
  try {
    Courier.shared.signOut();
    console.log('[auth] signed out');
  } catch (error) {
    console.error('[auth] unable to sign out', error);
  }
};

const onClick = (data: any) => {
  console.dir(data);
};

const renderHeader = (props: CourierInboxHeaderFactoryProps | undefined | null) => {
  console.dir(props);
  return document.createElement('div');
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

.inbox-container {
  position: absolute;
  width: 3rem;
  height: 3rem;
  padding-left: 0.25rem;
  padding-top: 0.4rem;
  border: 1px solid orange;
  border-radius: 100%;
  background-color: rgba(255, 166, 0, 0.123);
}

.inbox-container.top-left {
  top: 0.5rem;
  left: 0.5rem;
}

.inbox-container.top-center {
  top: 0.5rem;
  left: 50vw;
}

.inbox-container.top-right {
  top: 0.5rem;
  right: 0.5rem;
}

.inbox-container.center-left {
  top: 50vh;
  left: 0.5rem;
}

.inbox-container.center-center {
  top: 50vh;
  left: 50vw;
}

.inbox-container.center-right {
  top: 50vh;
  right: 0.5rem;
}

.inbox-container.bottom-left {
  bottom: 0.5rem;
  left: 0.5rem;
}

.inbox-container.bottom-center {
  bottom: 0.5rem;
  left: 50vw;
}

.inbox-container.bottom-right {
  bottom: 0.5rem;
  right: 0.5rem;
}
</style>
