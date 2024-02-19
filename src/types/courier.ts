import { InboxSdk } from '../ts/inboxClient';
import { PreferencesSdk } from '../ts/preferencesClient';
import { ToastSdk } from '../ts/toastClient';

export interface CourierConfig {
  tenantId?: string;
  apiUrl?: string;
  authorization?: string;
  brandId?: string;
  clientKey: string;
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

export interface CourierSDK {
  init: (config: CourierConfig) => void;
  on: (action: string, event: any) => void;
  toast: ToastSdk;
  inbox: InboxSdk;
  preferences: PreferencesSdk;
  transport: any;
}

declare global {
  interface Window {
    courier: CourierSDK;
    courierAsyncInit?: () => void | Array<() => void>;
  }
}
