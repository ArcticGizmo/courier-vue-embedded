import { onMounted, onUnmounted, ref } from 'vue';
import { Courier, CourierProps, InboxMessage } from '@trycourier/courier-js';
import { CourierInboxDatastore, CourierInboxDataStoreListener, CourierInboxFeedType, InboxDataSet } from '@trycourier/courier-ui-inbox';

type AuthenticationState = {
  userId?: string,
  signIn: (props: CourierProps) => void,
  signOut: () => void
}

type InboxState = {
  load: (props?: { canUseCache: boolean }) => Promise<void>,
  fetchNextPageOfMessages: (props: { feedType: CourierInboxFeedType }) => Promise<InboxDataSet | null>,
  setPaginationLimit: (limit: number) => void,
  readMessage: (message: InboxMessage) => Promise<void>,
  unreadMessage: (message: InboxMessage) => Promise<void>,
  clickMessage: (message: InboxMessage) => Promise<void>,
  archiveMessage: (message: InboxMessage) => Promise<void>,
  openMessage: (message: InboxMessage) => Promise<void>,
  unarchiveMessage: (message: InboxMessage) => Promise<void>,
  readAllMessages: () => Promise<void>,
  inbox?: InboxDataSet,
  archive?: InboxDataSet,
  unreadCount?: number,
  error?: Error
}

// A composable for managing the shared state of Courier
// If you want to use more functions, checkout the Courier JS SDK which
// can be used directly by importing from '@trycourier/courier-js'
export const useCourier = () => {

  // Authentication Functions
  const signIn = (props: CourierProps) => Courier.shared.signIn(props);
  const signOut = () => Courier.shared.signOut();

  // Inbox Functions
  const loadInbox = (props?: { canUseCache: boolean }) => CourierInboxDatastore.shared.load(props);
  const fetchNextPageOfMessages = (props: { feedType: CourierInboxFeedType }) => CourierInboxDatastore.shared.fetchNextPageOfMessages(props);
  const setPaginationLimit = (limit: number) => Courier.shared.paginationLimit = limit;
  const readMessage = (message: InboxMessage) => CourierInboxDatastore.shared.readMessage({ message });
  const unreadMessage = (message: InboxMessage) => CourierInboxDatastore.shared.unreadMessage({ message });
  const clickMessage = (message: InboxMessage) => CourierInboxDatastore.shared.clickMessage({ message });
  const archiveMessage = (message: InboxMessage) => CourierInboxDatastore.shared.archiveMessage({ message });
  const openMessage = (message: InboxMessage) => CourierInboxDatastore.shared.openMessage({ message });
  const unarchiveMessage = (message: InboxMessage) => CourierInboxDatastore.shared.unarchiveMessage({ message });
  const readAllMessages = () => CourierInboxDatastore.shared.readAllMessages();

  const auth = ref<AuthenticationState>({
    userId: undefined,
    signIn,
    signOut
  });

  const inbox = ref<InboxState>({
    load: loadInbox,
    fetchNextPageOfMessages,
    setPaginationLimit,
    readMessage,
    unreadMessage,
    clickMessage,
    archiveMessage,
    openMessage,
    unarchiveMessage,
    readAllMessages
  });

  // Lifecycle management
  let authListener: any;
  let inboxListener: CourierInboxDataStoreListener;

  const setupListeners = () => {
    // Add a listener to the Courier instance
    authListener = Courier.shared.addAuthenticationListener(() => refreshAuth());

    // Add inbox data store listener
    inboxListener = new CourierInboxDataStoreListener({
      onError: (error: Error) => refreshInbox(error),
      onDataSetChange: () => refreshInbox(),
      onPageAdded: () => refreshInbox(),
      onMessageAdd: () => refreshInbox(),
      onMessageRemove: () => refreshInbox(),
      onMessageUpdate: () => refreshInbox(),
      onUnreadCountChange: () => refreshInbox()
    });
    CourierInboxDatastore.shared.addDataStoreListener(inboxListener);

    // Set initial values
    refreshAuth();
    refreshInbox();
  };

  const cleanupListeners = () => {
    // Remove listeners when the component unmounts
    if (authListener) {
      authListener.remove();
    }
    if (inboxListener) {
      inboxListener.remove();
    }
  };

  const refreshAuth = () => {
    const options = Courier.shared.client?.options;
    auth.value = {
      ...auth.value,
      userId: options?.userId,
    };
  };

  const refreshInbox = (error?: Error) => {
    const datastore = CourierInboxDatastore.shared;
    inbox.value = {
      ...inbox.value,
      inbox: datastore.inboxDataSet,
      archive: datastore.archiveDataSet,
      unreadCount: datastore.unreadCount,
      error: error,
    };
  };

  // Setup listeners on mount
  onMounted(() => {
    setupListeners();
  });

  // Cleanup listeners on unmount
  onUnmounted(() => {
    cleanupListeners();
  });

  return {
    shared: Courier.shared,
    auth: auth,
    inbox: inbox
  };
};
