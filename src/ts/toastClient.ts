import { type CourierSDK } from '../types/courier';
import type { ToastParams, ToastProps } from '../types/toast';
import { Deferred } from './helpers';

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

  async create(params: ToastParams) {
    await this.onceReady;
    this.sdk.toast.toast(params);
  }

  async getConfig() {
    await this.onceReady;
    return this.sdk.toast.config;
  }

  async setConfig(config: ToastProps) {
    await this.onceReady;
    this.sdk.toast.setConfig(config);
  }

  async mergeConfig(config: ToastProps) {
    await this.onceReady;
    this.sdk.toast.mergeConfig(config);
  }
}
