import type { CourierSDK } from '../types/courier';
import type {
  FetchMessagesDonePayload,
  FetchUnreadMessageCountPayload,
  IFetchMessagesParams,
  IGetMessagesParams,
  IInboxMessagePreview,
  InboxProps,
  InboxView
} from '../types/inbox';
import { Deferred, withoutUndefinedValues } from './helpers';

export class InboxClient {
  private onceReady = Deferred<void>();

  private _fetchMessagesDefered = Deferred<FetchMessagesDonePayload>();
  private _fetchUnreadMessageCountDefered = Deferred<FetchUnreadMessageCountPayload>();

  private get sdk(): CourierSDK {
    return window.courier;
  }

  init() {
    this.sdk.on('inbox/init', () => {
      this.onceReady.resolve();
    });

    this.sdk.on('inbox/FETCH_MESSAGES/DONE', resp => {
      this._fetchMessagesDefered.resolve(resp.payload);
    });

    this.sdk.on('inbox/FETCH_UNREAD_MESSAGE_COUNT/DONE', resp => {
      this._fetchUnreadMessageCountDefered.resolve(resp.payload);
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
    await this.onceReady;
    this.sdk.inbox.markAllAsRead(fromWS);
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

  async addMessage(message: IInboxMessagePreview) {
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

  async toggleVisibility() {
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
    const toMerge = withoutUndefinedValues(config);
    this.sdk.inbox.setConfig(toMerge);
  }

  async mergeConfig(config: InboxProps) {
    await this.onceReady;
    const toMerge = withoutUndefinedValues(config);
    this.sdk.inbox.mergeConfig(toMerge);
  }
}
