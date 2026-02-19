import {
  Courier,
  CourierInboxDatastore,
  CourierInboxDatastoreEvents,
  CourierInboxDataStoreListener,
  type InboxMessage
} from '@trycourier/courier-ui-inbox';
import { CourierToastDatastore, CourierToastDatastoreListener } from '@trycourier/courier-ui-toast';
import { computed, onBeforeMount, onBeforeUnmount, onMounted, onUnmounted, ref, watch } from 'vue';

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
    userId: computed(() => activeUserId.value)
  };
};

type InboxEvent = keyof CourierInboxDatastoreEvents;

export const useCourierInbox = () => {
  const { userId } = useCourier();
  const inbox = computed(() => Courier.shared.client!.inbox);
  let pendingListeners: CourierInboxDataStoreListener[] = [];
  let listeners: CourierInboxDataStoreListener[] = [];

  const handleEvent = <K extends InboxEvent>(event: K, callback: NonNullable<CourierInboxDatastoreEvents[K]>) => {
    const listener = new CourierInboxDataStoreListener({
      [event]: callback
    });

    if (!CourierInboxDatastore.shared.addDataStoreListener) {
      pendingListeners.push(listener);
    } else {
      CourierInboxDatastore.shared.addDataStoreListener(listener);
      listeners.push(listener);
    }
  };

  watch(userId, usrId => {
    if (usrId) {
      for (const l of pendingListeners) {
        CourierInboxDatastore.shared.addDataStoreListener(l);
      }
      pendingListeners = [];
    }
  });

  onUnmounted(() => {
    for (const listener of listeners) {
      listener.remove();
    }
    listeners = [];
    pendingListeners = [];
  });

  return { inbox, handleEvent };
};

export const useCourierBrands = () => {
  const brands = computed(() => Courier.shared.client!.brands);
  return { brands };
};

export const useCourierLists = () => {
  const lists = computed(() => Courier.shared.client!.lists);
  return { lists };
};

export const useCourierPreferences = () => {
  const preferences = computed(() => Courier.shared.client!.preferences);
  return { preferences };
};

export const useCourierTokens = () => {
  const tokens = computed(() => Courier.shared.client!.tokens);
  return { tokens };
};

export const useCourierTracking = () => {
  const tracking = computed(() => Courier.shared.client!.tracking);
  return { tracking };
};
