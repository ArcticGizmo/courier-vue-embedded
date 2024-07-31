import type { ICourierConfig, CourierSDK, EventPayload } from '../types/courier';
import { Deferred } from './helpers';
import { InboxClient } from './inboxClient';
import { PreferencesClient } from './preferencesClient';
import { ToastClient } from './toastClient';

// This follows the versioning of https://github.com/trycourier/courier-react
const ID = 'courier-script';
const VERSION = 'https://components.courier.com/v6.2.1.js';

const importCourier = async () => {
  const existing = document.body.querySelector(`#${ID}`);

  if (existing) {
    existing.remove();
  }

  const script = document.createElement('script');
  script.id = ID;
  script.async = true;
  script.setAttribute('src', VERSION);
  document.body.appendChild(script);
};

window.courierConfig = {
  initOnLoad: false
};

export class CourierClient {
  private onceLoaded = Deferred<void>();
  private onceReady = Deferred<void>();

  public inbox = new InboxClient();
  public preferences = new PreferencesClient();
  public toast = new ToastClient();

  public isReady = false;

  private get sdk(): CourierSDK {
    return window.courier;
  }

  constructor() {
    window.courierAsyncInit = () => {
      this.onceLoaded.resolve();
    };
    importCourier();
  }

  async init(config: ICourierConfig) {
    await this.onceLoaded;

    this.sdk.on('root/init', () => {
      this.onceReady.resolve();
      this.isReady = true;

      this.inbox.init();
      this.preferences.init();
      this.toast.init();
    });

    this.sdk.init(config);
  }

  async whenReady(callback: () => void) {
    await this.onceReady;
    callback();
  }

  onAny<T = unknown>(callback: (payload: EventPayload<T>) => void) {
    return this.on('*', callback);
  }

  on<T = unknown>(action: string, callback: (payload: EventPayload<T>) => void) {
    this.sdk.on(action, callback);
    return this;
  }

  async renewSession(token: string) {
    await this.isReady;
    this.sdk.renewSession(token);
  }
}
