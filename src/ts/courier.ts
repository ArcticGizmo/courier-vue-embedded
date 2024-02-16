import type { CourierConfig, CourierSDK } from '../types/courier';
import { InboxProps } from '../types/inbox';
import { ToastProps } from '../types/toast';

const ID = 'courier-script';
// This follows the versioning of https://github.com/trycourier/courier-react
const VERSION = 'https://courier-components-xvdza5.s3.amazonaws.com/v4.6.0.js';

type Resolve = (value?: any) => void;
type Reject = (reason?: any) => void;

const withoutUndefinedValues = (obj: any) => {
  const cleanObj: any = {};
  Object.entries(obj).forEach(([key, value]) => {
    if (value !== undefined) {
      cleanObj[key] = value as unknown;
    }
  });
  return cleanObj;
};

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

interface DeferredPromise<T> extends Promise<T> {
  resolve: Resolve;
  reject: Reject;
}

const Deferred = <T>(callback?: (resolve: Resolve, reject: Reject) => T): DeferredPromise<T> => {
  let res!: Resolve;
  let rej!: Reject;
  const promise = new Promise<any>((resolve, reject) => {
    res = resolve;
    rej = reject;
    if (callback) {
      callback(resolve, reject);
    }
  });

  const defProm = promise as DeferredPromise<T>;

  defProm.resolve = res;
  defProm.reject = rej;

  return defProm;
};

class CourierClient {
  private _resolveCourier = Deferred<CourierSDK>();

  private _inboxReady = Deferred<void>();
  private _toastReady = Deferred<void>();
  private _isLoaded = Deferred<void>();
  private _isReady = Deferred<void>();

  private get sdk(): CourierSDK {
    return window.courier;
  }

  constructor() {
    window.courierAsyncInit = () => {
      this._resolveCourier.resolve();
    };
    importCourier();
  }

  async init(config: CourierConfig) {
    await this._resolveCourier;
    this._isLoaded.resolve();

    this.sdk.on('inbox/init', () => {
      this._inboxReady.resolve();
    });

    this.sdk.on('toast/init', () => {
      this._toastReady.resolve();
    });

    await this.sdk.init(config);
    this._isReady.resolve();
  }

  async isLoaded() {
    await this._isLoaded;
  }

  async isReady() {
    await this._isReady;
  }

  async updateInbox(config: InboxProps) {
    await this._inboxReady;
    const toMerge = withoutUndefinedValues({ ...config });
    this.sdk.inbox?.mergeConfig(toMerge);
  }

  async updateToast(config: ToastProps) {
    await this._toastReady;
    const toMerge = withoutUndefinedValues({ ...config });
    this.sdk.toast?.mergeConfig(toMerge);
  }
}

export const Courier = new CourierClient();
