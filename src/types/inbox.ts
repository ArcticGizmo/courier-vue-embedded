import { CSSObject } from 'styled-components';
import { IPreferenceTemplate } from './preferences';

export type InboxView = 'messages' | 'preferences';

export interface IActionElemental {
  background_color?: string;
  content: string;
  data?: Record<string, any>;
  href: string;
  type: 'text';
}

export interface ITextElemental {
  type: 'text';
  content: string;
}

export interface IElementalInbox {
  tenantId?: string;
  brand?: Brand;
  from?: number;
  isLoading?: boolean;
  isOpen?: boolean;
  lastMessagesFetched?: number;
  messages?: Array<IInboxMessagePreview>;
  startCursor?: string;
  unreadMessageCount?: number;
  view?: InboxView;
}

export interface IInboxMessagePreview {
  actions?: IActionElemental[];
  archived?: string;
  created: string;
  data?: Record<string, any>;
  messageId: string;
  opened?: string;
  preview?: string;
  read?: string;
  tags?: string[];
  title?: string;
}

export interface IInboxMessage {
  messageId: string;
  read?: string;
  created?: string;
  content: {
    html?: string;
    elemental?: Array<ITextElemental | IActionElemental>;
  };
}

export type IElementalInboxMessage = IInboxMessage;
export type IElementalInboxMessagePreview = IInboxMessagePreview;

export interface FetchMessagesDonePayload {
  messages: IElementalInboxMessagePreview[];
  appendMessages?: boolean;
  startCursor?: string;
}

export interface FetchUnreadMessageCountPayload {
  count: number;
}

export interface MarkAllReadDonePayload {
  ids: string[];
}

export interface IGetMessagesParams {
  tenantId?: string;
  from?: number;
  isRead?: boolean;
  limit?: number;
  tags?: string[];
}

export interface IFetchMessagesParams {
  params?: IGetMessagesParams;
  after?: string;
}

export type InboxPlacement = 'top' | 'left' | 'right' | 'bottom';
export type InboxTrigger = 'click' | 'hover';
export type EventType = 'mark-all-read' | 'read' | 'unread' | 'archive' | 'opened' | 'click' | 'unpin';

export interface InboxProps {
  tenantId?: string;
  brand?: Brand;
  className?: string;
  defaultIcon?: false | string;
  from?: number;
  isOpen?: boolean;
  views?: Array<{
    id: string;
    label: string;
    params?: any;
  }>;
  formatDate?: (isoDate: string) => string;
  appendTo?: string;
  labels?: {
    archiveMessage?: string;
    backToInbox?: string;
    closeInbox?: string;
    emptyState?: string;
    markAllAsRead?: string;
    markAsRead?: string;
    markAsUnread?: string;
    scrollTop?: string | ((count: string) => string);
  };
  onEvent?: OnEvent;
  openLinksInNewTab?: boolean;
  placement?: InboxPlacement;
  showUnreadMessageCount?: boolean;
  theme?: InboxTheme;
  title?: string;
  trigger?: InboxPlacement;
  // renderContainer?: React.FunctionComponent;
  // renderBell?: React.FunctionComponent<{
  //   className?: string;
  //   isOpen: boolean;
  //   onClick?: (event: React.MouseEvent) => void;
  // }>;
  // renderFooter?: React.FunctionComponent;
  // renderHeader?: React.FunctionComponent<IHeaderProps>;
  // renderPin?: React.FunctionComponent<PinDetails>;
  // renderIcon?: React.FunctionComponent<{
  //   isOpen: boolean;
  //   unreadMessageCount?: number;
  // }>;
  // renderMessage?: React.FunctionComponent<IInboxMessagePreview>;
  // renderNoMessages?: React.FunctionComponent;
}

export interface Brand {
  inapp?: {
    disableCourierFooter?: boolean;
    borderRadius?: string;
    disableMessageIcon?: boolean;
    renderActionsAsButtons?: boolean;
    placement?: InboxPlacement;
    emptyState?: {
      textColor?: string;
      text?: string;
    };
    widgetBackground?: {
      topColor?: string;
      bottomColor?: string;
    };
    icons?: {
      bell?: string;
      message?: string;
    };
    toast?: {
      borderRadius?: string;
      timerAutoClose?: number;
    };
  };
  preferenceTemplates?: Array<IPreferenceTemplate>;
  colors?: {
    primary?: string;
    secondary?: string;
    tertiary?: string;
  };
}

export interface InboxTheme {
  brand?: Brand;
  container?: CSSObject;
  emptyState?: CSSObject;
  footer?: CSSObject;
  header?: CSSObject;
  menu?: CSSObject;
  tooltip?: CSSObject;
  icon?: CSSObject & {
    open?: string;
    closed?: string;
  };
  messageList?: {
    container?: CSSObject;
  };
  message?: {
    actionElement?: CSSObject;
    clickableContainer?: CSSObject;
    container?: CSSObject;
    content?: CSSObject;
    icon?: CSSObject;
    textElement?: CSSObject;
    timeAgo?: CSSObject;
    title?: CSSObject;
    unreadIndicator?: CSSObject;
  };
  root?: CSSObject;
  unreadIndicator?: CSSObject;
}

export interface Labels {
  archiveMessage?: string;
  backToInbox?: string;
  closeInbox?: string;
  emptyState?: string;
  markAllAsRead?: string;
  markAsRead?: string;
  markAsUnread?: string;
  scrollTop?: string | ((count: string) => string);
}

export type OnEvent = (eventParams: { messageId?: string; message?: IInboxMessagePreview; event: EventType }) => void;

export interface InboxSdk {
  fetchMessages: (params?: IFetchMessagesParams) => void;
  getUnreadMessageCount: (params?: IGetMessagesParams) => void;
  init: (inbox?: InboxProps) => void;
  markAllAsRead: (fromWS?: boolean) => void;
  markMessageArchived: (messageId: string, fromWS?: boolean) => Promise<void>;
  markMessageOpened: (messageId: string, fromWS?: boolean) => Promise<void>;
  markMessageRead: (messageId: string, fromWS?: boolean) => Promise<void>;
  markMessageUnread: (messageId: string, fromWS?: boolean) => Promise<void>;
  newMessage: (transportMessage: IInboxMessagePreview) => void;
  resetLastFetched: () => void;
  setView: (view: InboxView) => void;
  toggleInbox: (isOpen?: boolean) => void;
  unpinMessage: (messageId: string, fromWS?: boolean) => Promise<void>;
  trackClick: (messageId: string, trackingId: string) => Promise<void>;
  setConfig: (config: InboxProps) => void;
  mergeConfig: (config: InboxProps) => void;
}
