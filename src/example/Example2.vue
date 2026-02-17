<template>
  <div style="padding: 2rem">
    <div class="card">
      <CourierInboxPopupMenuVue />
    </div>
    <!-- settings here -->
  </div>
</template>

<script setup lang="ts">
import CourierInboxPopupMenuVue from '@/components/CourierInboxPopupMenuVue.vue';
import { useCourier } from '@/ts/useCourier2';
import { onMounted } from 'vue';

const props = defineProps<{ userId: string; jwt: string }>();

const { Courier } = useCourier();

onMounted(() => {
  try {
    Courier.shared.signIn({
      userId: props.userId,
      jwt: props.jwt
    });
  } catch (error) {
    console.error('[signin] unable to sign in', error);
  }
});
</script>

<style scoped>
.card {
  padding: 1rem;
  border: 1px solid grey;
  min-height: 10rem;
  width: 100%;
  border-radius: 0.5rem;
  box-sizing: border-box;
}
</style>
