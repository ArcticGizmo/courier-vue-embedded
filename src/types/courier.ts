export interface CourierConfig {
  clientKey: string;
  userId: string;
  initOnLoad?: boolean;
}

export interface CourierSDK {
  init: (config: CourierConfig) => void;
  on: (action: string, event: any) => void;
  transport: any;
  toast: any;
  inbox: any;
}

declare global {
  interface Window {
    courier: CourierSDK;
    courierAsyncInit: () => void;
  }
}
