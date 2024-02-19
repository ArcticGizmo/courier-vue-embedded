import { CourierSDK } from '../types/courier';
import { ToastProps } from '../types/toast';
import { Deferred } from './helpers';
import { IInboxMessagePreview } from './inboxClient';

export interface ToastPreview {
  preview?: string;
  title?: string;
}

export type ToastParams = string | IInboxMessagePreview | ToastPreview;

export interface ToastSdk {
  config: ToastProps;
  mergeConfig: (config: ToastProps) => void;
  setConfig: (config: ToastProps) => void;
  toast: (params: ToastParams) => void;
}

export class ToastClient {
  private onceReady = Deferred<void>();

  private get sdk(): CourierSDK {
    return window.courier;
  }

  init() {
    this.sdk.on('inbox/init', () => {
      this.onceReady.resolve();
    });
  }

  // TODO: merge / add config everywhere
  // TODO: consider making components not take any parameters at all

  async create(params: ToastParams) {
    await this.onceReady;
    this.sdk.toast.toast(params);
  }

  async getConfig() {
    await this.onceReady;
    return this.sdk.toast.config;
  }

  async setConfig(config: ToastProps) {
    // TODO: does this need undefined culling?
    await this.onceReady;
    this.sdk.toast.setConfig(config);
  }

  async mergeConfig(config: ToastProps) {
    await this.onceReady;
    this.sdk.toast.mergeConfig(config);
  }
}
