import type { CourierConfig, CourierSDK } from '../types/courier';

const ID = 'courier-script';
const VERSION = 'https://courier-components-xvdza5.s3.amazonaws.com/latest.js';

type Resolve = (value?: any) => void;
type Reject = (reason?: any) => void;

const importCourier = async () => {
  const existing = document.body.querySelector(`#${ID}`);

  if (existing) {
    existing.remove();
  }

  const script = document.createElement('script');
  script.id = ID;
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
  private _courier!: CourierSDK;
  private _isLoaded = Deferred<void>();
  private _isReady = Deferred<void>();

  constructor() {
    window.courierAsyncInit = () => {
      this._resolveCourier.resolve(window.courier);
    };
    importCourier();
  }

  async init(config: CourierConfig) {
    this._courier = await this._resolveCourier;
    this._isLoaded.resolve();

    await this._courier.init(config);

    this._isReady.resolve();
  }

  async isLoaded() {
    await this._isLoaded;
  }

  async isReady() {
    await this._isReady;
  }
}

export const Courier = new CourierClient();
