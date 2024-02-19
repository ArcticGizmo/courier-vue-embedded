import { CourierSDK } from '../types/courier';
import { IRecipientPreference, PreferencePage } from '../types/preferences';
import { Deferred } from './helpers';

export interface UpdateRecipientPreferencesPayload {
  templateId: string;
  status: string;
  hasCustomRouting: boolean;
  routingPreferences: Array<string>;
  digestSchedule: string;
  tenantId?: string;
}

export interface PreferencesSdk {
  fetchRecipientPreferences: (tenantId?: string) => void;
  fetchPreferencePage: (tenantId?: string, draft?: boolean) => void;
  updateRecipientPreferences: (payload: UpdateRecipientPreferencesPayload) => void;
}

export class PreferencesClient {
  private _fetchRecipientPreferences = Deferred<IRecipientPreference>();
  private _fetchPreferencePage = Deferred<PreferencePage>();

  private get sdk(): CourierSDK {
    return window.courier;
  }

  init() {
    this.sdk.on('preferences/FETCH_RECIPIENT_PREFERENCES/DONE', resp => {
      this._fetchRecipientPreferences.resolve(resp.payload);
    });

    this.sdk.on('preferences/FETCH_DRAFT_RECIPIENT_PREFERENCES/DONE', resp => {
      this._fetchRecipientPreferences.resolve(resp.payload);
    });

    this.sdk.on('preferences/FETCH_PREFERENCE_PAGE/DONE', resp => {
      this._fetchPreferencePage.resolve(resp.payload);
    });

    this.sdk.on('preferences/FETCH_DRAFT_PREFERENCE_PAGE/DONE', resp => {
      this._fetchPreferencePage.resolve(resp.payload);
    });
  }

  async fetchRecipientPreferences(tenantId?: string, draft?: boolean) {
    this._fetchRecipientPreferences = Deferred<IRecipientPreference>();
    this.sdk.preferences.fetchRecipientPreferences(tenantId, draft);
    return await this._fetchRecipientPreferences;
  }

  async fetchPreferencePage(tenantId?: string, draft?: boolean) {
    this._fetchPreferencePage = Deferred<PreferencePage>();
    this.sdk.preferences.fetchPreferencePage(tenantId, draft);
    return await this._fetchPreferencePage;
  }

  async updateRecipientPreferences(payload: UpdateRecipientPreferencesPayload) {
    this.sdk.preferences.updateRecipientPreferences(payload);
  }
}
