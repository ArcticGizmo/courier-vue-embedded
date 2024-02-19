import { CourierConfig, CourierSDK } from '../types/courier';
import { Deferred } from './helpers';
import { InboxClient } from './inboxClient';
import { PreferencesClient } from './preferencesClient';
import { ToastClient } from './toastClient';

// This follows the versioning of https://github.com/trycourier/courier-react
const ID = 'courier-script';
const VERSION = 'https://components.courier.com/v4.11.2.js';

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

  async init(config: CourierConfig) {
    await this.onceLoaded;

    this.sdk.on('*', e => {
      // console.log(e.type);
      if (e.type.startsWith('inbox')) {
        console.dir(e.type, e.payload);
      }
    });

    this.sdk.on('root/init', () => {
      this.onceReady.resolve();
      this.isReady = true;

      this.inbox.init();
      this.preferences.init();
      this.toast.init();
    });

    this.sdk.on('toast/init', () => {
      setTimeout(() => {
        console.dir(window.courier.toast);
      }, 4500);
    });

    this.sdk.init(config);
  }

  async whenReady(callback: (client: CourierClient) => void) {
    await this.onceLoaded;
    callback(this);
  }

  onAny(callback: (payload: any) => void) {
    return this.on('*', callback);
  }

  on(action: string, callback: (payload: any) => void) {
    this.sdk.on(action, callback);
    return this;
  }
}
