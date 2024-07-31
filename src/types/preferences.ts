import { IPreferenceTemplate } from './core';

// source: https://github.com/packages/components/src/components/PreferencePage.tsx (based on React.FunctionComponent)
export interface PreferencesProps {
  tenantId?: string;
  draft?: boolean;
}

// https://github.com/trycourier/courier-react/packages/react-hooks/src/preferences/types.ts
export type PreferencePage = {
  showCourierFooter: boolean;
  brand: {
    settings: {
      colors: {
        primary: string;
      };
    };
    links: {
      facebook: {
        url: string;
      };
      instagram: {
        url: string;
      };
      linkedin: {
        url: string;
      };
      medium: {
        url: string;
      };
      twitter: {
        url: string;
      };
    };
    logo: {
      href: string;
      image: string;
    };
  };
  sections: PreferenceSection;
};

type PreferenceSection = {
  nodes: Array<{
    name: string;
    sectionId: string;
    routingOptions: Array<ChannelClassification>;
    topics: { nodes: Array<IPreferenceTemplate> };
    hasCustomRouting: boolean;
  }>;
};

type ChannelClassification = 'email' | 'push' | 'inbox' | 'direct_message' | 'sms' | 'webhook';

type PreferenceStatus = 'OPTED_IN' | 'OPTED_OUT' | 'REQUIRED';

export interface IRecipientPreference {
  templateId: string;
  status: PreferenceStatus;
  hasCustomRouting: boolean;
  routingPreferences: Array<ChannelClassification>;
  digestSchedule: string;
}

export type UpdateRecipientPreferencesPayload = any;

export interface PreferencesSdk {
  fetchRecipientPreferences: (tenantId?: string, draft?: boolean) => void;
  fetchPreferencePage: (tenantId?: string, draft?: boolean) => void;
  updateRecipientPreferences: (payload: UpdateRecipientPreferencesPayload) => void;
}
