import { Courier, CourierProps } from '@trycourier/courier-ui-inbox';
import { computed, onBeforeMount, onBeforeUnmount, ref } from 'vue';

export const useCourier = () => {
  const activeUserId = ref<string>();

  const listenForUserChanges = (payload: { userId?: string }) => {
    activeUserId.value = payload.userId ?? undefined;
  };

  // Include user information here
  onBeforeMount(() => {
    Courier.shared.addAuthenticationListener(listenForUserChanges);
  });

  onBeforeUnmount(() => {
    Courier.shared.removeAuthenticationListener(listenForUserChanges);
  });

  return {
    Courier,
    signIn: Courier.shared.signIn,
    signOut: Courier.shared.signOut,
    userId: computed(() => activeUserId.value)
  };
};

export const useCourierInbox = () => {};
