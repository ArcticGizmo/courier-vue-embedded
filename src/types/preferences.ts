export interface PreferencesProps {
  tenantId?: string;
  draft?: boolean;
}

export interface UpdateRecipientPreferencesPayload {
  templateId: string;
  status: string;
  hasCustomRouting: boolean;
  routingPreferences: Array<string>;
  digestSchedule: string;
  tenantId?: string;
}

export interface PreferencePage {
  showCourierFooter: boolean;
  brand: {
    settings: {
      colors: {
        primary: string;
      };
    };
    links: {
      facebook: { url: string };
      instagram: { url: string };
      linkedin: { url: string };
      medium: { url: string };
      twitter: { url: string };
    };
    logo: {
      href: string;
      image: string;
    };
  };
  sections: PreferenceSection;
}

export interface PreferenceSection {
  nodes: Array<{
    name: string;
    sectionId: string;
    routingOptions: Array<ChannelClassification>;
    topics: { nodes: Array<IPreferenceTemplate> };
    hasCustomRouting: boolean;
  }>;
}

export interface PreferenceState {
  isLoading?: boolean;
  isUpdating?: boolean;
  preferences?: IPreferenceTemplate[];
  recipientPreferences?: IRecipientPreference[];
  preferencePage?: PreferencePage;
}

export type ChannelClassification = 'email' | 'push' | 'direct_message' | 'sms' | 'webhook';

export interface SnoozePreference {
  start?: string;
  until: string;
}

export type PreferenceStatus = 'OPTED_IN' | 'OPTED_OUT' | 'REQUIRED';

export interface IPreference {
  status: PreferenceStatus;
  snooze?: SnoozePreference;
  channel_preferences?: Array<ChannelClassification>;
}

export interface IPreferenceTemplate {
  templateName: string;
  templateId: string;
  defaultStatus: PreferenceStatus;
}

export interface IRecipientPreference {
  templateId: string;
  status: PreferenceStatus;
  hasCustomRouting: boolean;
  routingPreferences: Array<ChannelClassification>;
  digestSchedule: string;
}
