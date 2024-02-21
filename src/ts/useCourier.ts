import type { CourierConfig } from '../types/courier';
import { CourierClient } from './courierClient';

const client = new CourierClient();

export const useCourier = () => {
  return {
    init: (config: CourierConfig) => client.init(config),
    renewSession: (token: string) => client.renewSession(token),
    on: (action: string, callback: (payload: any) => void) => client.on(action, callback),
    onAny: (callback: (payload: any) => void) => client.onAny(callback),
    whenReady: (callback: () => void) => client.whenReady(callback),
    inbox: useCourierInbox(),
    toast: useCourierToast(),
    preferences: useCourierPreferences()
  };
};

export const useCourierInbox = () => {
  return client.inbox;
};

export const useCourierToast = () => {
  return client.toast;
};

export const useCourierPreferences = () => {
  return client.preferences;
};
