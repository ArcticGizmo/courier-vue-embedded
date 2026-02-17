<template>
  <div style="padding: 2rem">
    <div class="card">
      <CourierInboxPopupMenuVue />
    </div>
    <div class="card" style="margin-top: 2rem">
      <div class="title">Settings</div>
      <hr />
      <div class="d-flex gap-2">
        <button @click="signIn()">Sign In</button>
        <button @click="signOut()">Sign Out</button>
      </div>
    </div>
    <!-- settings here -->
  </div>
</template>

<script setup lang="ts">
import CourierInboxPopupMenuVue from '@/components/CourierInboxPopupMenuVue.vue';
import { useCourier } from '@/ts/useCourier2';
import { onMounted } from 'vue';

const props = defineProps<{ userId: string; jwt: string }>();

const { Courier, userId } = useCourier();

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
