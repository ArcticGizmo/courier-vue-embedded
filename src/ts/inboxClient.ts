import { CourierSDK } from '../types/courier';
import { InboxProps } from '../types/inbox';
import { Deferred } from './helpers';

export type InboxView = 'messages' | 'preferences';

export interface IActionElemental {
  background_color?: string;
  content: string;
  data?: Record<string, any>;
  href: string;
  type: 'text';
}

export interface IInboxMessagePreview {
  actions?: IActionElemental[];
  archived?: string;
  created: string;
  data?: Record<string, any>;
  messageId: string;
  opened?: string;
  preview?: string;
  read?: string;
  tags?: string[];
  title?: string;
}

export interface IElementalInbox {
  tenantId?: string;
  brand?: Brand;
  from?: number;
  isLoading?: boolean;
  isOpen?: boolean;
  lastMessagesFetched?: number;
  messages?: Array<IInboxMessagePreview>;
  startCursor?: string;
  unreadMessageCount?: number;
  view?: InboxView;
}

export type IElementalInboxMessage = IInboxMessage;
export type IElementalInboxMessagePreview = IInboxMessagePreview;

export interface FetchMessagesDonePayload {
  messages: IElementalInboxMessagePreview[];
  appendMessages?: boolean;
  startCursor?: string;
}

export interface FetchUnreadMessageCountPayload {
  count: number;
}

export interface MarkAllReadDonePayload {
  ids: string[];
}

export interface IGetMessagesParams {
  tenantId?: string;
  from?: number;
  isRead?: boolean;
  limit?: number;
  tags?: string[];
}

export interface IFetchMessagesParams {
  params?: IGetMessagesParams;
  after?: string;
}

export interface InboxSdk {
  fetchMessages: (params?: IFetchMessagesParams) => void;
  getUnreadMessageCount: (params?: IGetMessagesParams) => void;
  init: (inbox?: IInbox) => void;
  markAllAsRead: (fromWS?: boolean) => void;
  markMessageArchived: (messageId: string, fromWS?: boolean) => Promise<void>;
  markMessageOpened: (messageId: string, fromWS?: boolean) => Promise<void>;
  markMessageRead: (messageId: string, fromWS?: boolean) => Promise<void>;
  markMessageUnread: (messageId: string, fromWS?: boolean) => Promise<void>;
  newMessage: (transportMessage: IInboxMessagePreview) => void;
  resetLastFetched: () => void;
  setView: (view: InboxView) => void;
  toggleInbox: (isOpen?: boolean) => void;
  unpinMessage: (messageId: string, fromWS?: boolean) => Promise<void>;
  trackClick: (messageId: string, trackingId: string) => Promise<void>;
  setConfig: (config: InboxProps) => void;
  mergeConfig: (config: InboxProps) => void;
}

export class InboxClient {
  private onceReady = Deferred<void>();

  private _fetchMessagesDefered = Deferred<FetchMessagesDonePayload>();
  private _fetchUnreadMessageCountDefered = Deferred<FetchUnreadMessageCountPayload>();
  private _markAllReadDefered = Deferred<MarkAllReadDonePayload>();

  private get sdk(): CourierSDK {
    return window.courier;
  }

  init() {
    this.sdk.on('inbox/init', () => {
      this.onceReady.resolve();
      console.dir(window.courier.inbox);
    });

    this.sdk.on('inbox/FETCH_MESSAGES/DONE', resp => {
      this._fetchMessagesDefered.resolve(resp.payload);
    });

    this.sdk.on('inbox/FETCH_UNREAD_MESSAGE_COUNT/DONE', resp => {
      this._fetchUnreadMessageCountDefered.resolve(resp.payload);
    });

    // TODO: is this actually called?
    this.sdk.on('inbox/MARK_ALL_READ/DONE', resp => {
      this._fetchUnreadMessageCountDefered.resolve(resp.payload);
    });

    // TODO: does this actually happen?
    this.sdk.on('inbox/MARK_ALL_READ/ERROR', resp => {
      console.log('--- error', resp);
    });

    this.sdk.on('inbox/TOGGLE_INBOX', resp => {
      // TODO: make this emit events from a vue component
      console.log('toggle', resp);
    });
  }

  async fetchMessages(params?: IFetchMessagesParams) {
    await this.onceReady;
    this._fetchMessagesDefered = Deferred<FetchMessagesDonePayload>();
    this.sdk.inbox.fetchMessages(params);
    return await this._fetchMessagesDefered;
  }

  async getUnreadMessageCount(params?: IGetMessagesParams) {
    await this.onceReady;
    this._fetchUnreadMessageCountDefered = Deferred<FetchUnreadMessageCountPayload>();
    this.sdk.inbox.getUnreadMessageCount(params);
    return await this._fetchUnreadMessageCountDefered;
  }

  async markAllAsRead(fromWS?: boolean) {
    // TODO: there might be a bug for this one
    await this.onceReady;
    this._markAllReadDefered = Deferred<MarkAllReadDonePayload>();
    this.sdk.inbox.markAllAsRead(fromWS);
    return await this._markAllReadDefered;
  }

  async markMessageArchived(messageId: string, fromWS?: boolean) {
    await this.onceReady;
    await this.sdk.inbox.markMessageArchived(messageId, fromWS);
  }

  async markMessageOpened(messageId: string, fromWS?: boolean) {
    await this.onceReady;
    await this.sdk.inbox.markMessageOpened(messageId, fromWS);
  }

  async markMessageRead(messageId: string, fromWS?: boolean) {
    await this.onceReady;
    await this.sdk.inbox?.markMessageRead(messageId, fromWS);
  }

  async newMessage(message: IInboxMessagePreview) {
    await this.onceReady;
    this.sdk.inbox.newMessage(message);
  }

  async resetLastFetched() {
    await this.onceReady;
    this.sdk.inbox.resetLastFetched();
  }

  async setView(view: InboxView) {
    await this.onceReady;
    this.sdk.inbox.setView(view);
  }

  async toggleInbox() {
    await this.onceReady;
    this.sdk.inbox.toggleInbox();
  }

  async open() {
    await this.onceReady;
    this.sdk.inbox.toggleInbox(true);
  }

  async close() {
    await this.onceReady;
    this.sdk.inbox.toggleInbox(false);
  }

  async unpinMessage(messageId: string, fromWS?: false) {
    await this.onceReady;
    await this.sdk.inbox.unpinMessage(messageId, fromWS);
  }

  async trackClick(messageId: string, trackingId: string) {
    await this.onceReady;
    await this.sdk.inbox.trackClick(messageId, trackingId);
  }

  async setConfig(config: InboxProps) {
    await this.onceReady;
    this.sdk.inbox.setConfig(config);
  }

  async mergeConfig(config: InboxProps) {
    await this.onceReady;
    this.sdk.inbox.mergeConfig(config);
  }
}
