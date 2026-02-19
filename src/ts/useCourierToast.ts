import { defaultLightTheme, InboxMessage } from '@trycourier/courier-ui-inbox';
import {
  CourierToastDatastore,
  CourierToastDatastoreEvents,
  CourierToastDatastoreListener,
  CourierToastItem,
  CourierToastThemeManager
} from '@trycourier/courier-ui-toast';
import { onMounted, onUnmounted, watch } from 'vue';
import { useCourier } from './useCourier';

type ToastEvent = keyof CourierToastDatastoreEvents;

export const useCourierToast = () => {
  const { userId } = useCourier();
  let pendingListeners: CourierToastDatastoreListener[] = [];
  let listeners: CourierToastDatastoreListener[] = [];

  const addMessage = (message: InboxMessage) => {
    CourierToastDatastore.shared.addMessage(message);
  };

  const removeMessage = (messageId: string) => {
    CourierToastDatastore.shared.removeMessage({ messageId });
  };

  const dismissToast = (messageId: string) => {
    if (!messageId) {
      console.warn('[courier] cannot dismiss toast without a valid message ID');
      return;
    }
    const containers: HTMLElement[] = [...document.getElementsByTagName('courier-toast')];
    const items: HTMLElement[] = containers.flatMap(c => [...c.childNodes]);

    for (const item of items) {
      if (item.getAttribute('data-courier-message-id') === messageId) {
        item.remove();
      }
    }
  };

  const handleEvent = <K extends ToastEvent>(event: K, callback: NonNullable<CourierToastDatastoreEvents[K]>) => {
    const listener = new CourierToastDatastoreListener({
      [event]: callback
    });

    if (!CourierToastDatastore.shared.addDatastoreListener) {
      pendingListeners.push(listener);
    } else {
      CourierToastDatastore.shared.addDatastoreListener(listener);
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
  });

  return {
    addMessage,
    removeMessage,
    handleEvent,
    dismissToast
  };
};
