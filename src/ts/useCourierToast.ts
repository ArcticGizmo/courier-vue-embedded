import { InboxMessage } from '@trycourier/courier-ui-inbox';
import {
  CourierToastDatastore,
  CourierToastDatastoreEvents,
  CourierToastDatastoreListener
} from '@trycourier/courier-ui-toast';
import { onMounted, onUnmounted } from 'vue';

type ToastEvent = keyof CourierToastDatastoreEvents;
type ToastCallback = CourierToastDatastoreEvents[ToastEvent];

export const useCourierToast = () => {
  let listeners: CourierToastDatastoreListener[] = [];

  const addMessage = (message: InboxMessage) => {
    CourierToastDatastore.shared.addMessage(message);
  };

  const removeMessage = (messageId: string) => {
    CourierToastDatastore.shared.removeMessage({ messageId });
  };

  const handleEvent = <K extends ToastEvent>(event: K, callback: NonNullable<CourierToastDatastoreEvents[K]>) => {
    const listener = new CourierToastDatastoreListener({
      [event]: callback
    });
    listeners.push(listener);
    CourierToastDatastore.shared.addDatastoreListener(listener);
  };

  onUnmounted(() => {
    for (const listener of listeners) {
      listener.remove();
    }
    listeners = [];
  });

  return {
    addMessage,
    removeMessage,
    handleEvent
  };
};
