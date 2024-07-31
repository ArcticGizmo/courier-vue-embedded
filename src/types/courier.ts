import type { InboxSdk } from './inbox';
import type { PreferencesSdk } from './preferences';
import type { ToastSdk } from './toast';

// source: https://github.com/trycourier/courier-react/blob/main/packages/components/src/index.tsx
export interface ICourierConfig {
  tenantId?: string;
  apiUrl?: string;
  authorization?: string;
  brandId?: string;
  clientKey?: string;
  inboxApiUrl?: string;
  onRouteChange?: (route: string) => void;
  components?: {
    inbox?: any;
    toast?: any;
    preferences?: any;
  };
  unsubscribePage?: {
    topicId: string;
    preferencePageUrl: string;
    list?: string;
  };
  initOnLoad?: boolean;
  userId?: string;
  userSignature?: string;
  wsOptions?: any;
  preferencePageDraftMode?: boolean;
}

export interface EventPayload<T = unknown> {
  payload: T;
}

// This is derived from inspecting window.courier
export interface CourierSDK {
  init: (config: ICourierConfig) => void;
  on: <T = unknown>(action: string, event: (payload: EventPayload<T>) => void) => void;
  toast: ToastSdk;
  inbox: InboxSdk;
  preferences: PreferencesSdk;
  transport: any;
  renewSession: (token: string) => void;
}

declare global {
  interface Window {
    courier: CourierSDK;
    courierConfig: ICourierConfig;
    courierAsyncInit?: () => void | Array<() => void>;
  }
}
