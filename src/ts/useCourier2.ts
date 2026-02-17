import { Courier, CourierProps } from '@trycourier/courier-ui-inbox';
import { computed, onBeforeMount, onBeforeUnmount, ref } from 'vue';

export const useCourier = () => {
  const activeUserId = ref<string>();

  const listenForUserChanges = (payload: { userId?: string }) => {
    activeUserId.value = payload.userId ?? undefined;
  };

  // Include user information here
  onBeforeMount(() => {
    activeUserId.value = Courier.shared.client?.options.userId;
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

export const useCourierInbox = () => {
  const inbox = Courier.shared.client!.inbox;
  return { inbox };
};

export const useCourierBrands = () => {
  return { brands: Courier.shared.client!.brands };
};

export const useCourierLists = () => {
  return { lists: Courier.shared.client!.lists };
};

export const useCourierPreferences = () => {
  return { preferences: Courier.shared.client!.preferences };
};

export const useCourierTokens = () => {
  return { tokens: Courier.shared.client!.tokens };
};

export const useCourierTracking = () => {
  return { tracking: Courier.shared.client!.tracking };
};
