import { CSSObject } from 'styled-components';
import { IInboxMessagePreview, Brand } from './core';

// we stub out a lot of types to make things easier
namespace MarkdownToJSX {
  export type Options = any;
}
type MarkdownToJSX = { Options: any };
type TippyProps = {
  placement: 'top' | 'left' | 'right' | 'bottom';
  trigger: 'click' | 'hover';
};

// source: https://github.com/trycourier/courier-react/blob/main/packages/react-inbox/README.md
type IGetInboxMessagesParams = {
  tenantId?: string;
  archived?: boolean;
  from?: string | number;
  limit?: number;
  status?: 'read' | 'unread';
  tags?: string[];
};

type OnEvent = any;

type FilterView = {
  id: string;
  label: string;
  params?: IGetInboxMessagesParams;
};
type PreferenceView = {
  id: 'preferences';
  label: string;
};
type View = FilterView | PreferenceView;

// source: https://github.com/trycourier/courier-react/blob/main/packages/react-inbox/src/types.ts
export interface InboxProps {
  brand?: Brand;
  className?: string;
  defaultIcon?: false | string;
  from?: number;
  isOpen?: boolean;
  markdownOptions?: MarkdownToJSX.Options;
  tenantId?: string;
  views?: Array<View>;
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
  placement?: TippyProps['placement'];
  showUnreadMessageCount?: boolean;
  theme?: InboxTheme;
  title?: string;
  trigger?: TippyProps['trigger'];
  renderContainer?: React.FunctionComponent;
  renderBell?: React.FunctionComponent<{
    className?: string;
    isOpen: boolean;
    onClick?: (event: React.MouseEvent) => void;
  }>;
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

// source: https://github.com/trycourier/courier-react/packages/react-inbox/src/types.ts
export interface InboxTheme {
  brand?: Brand;
  colorMode?: 'light' | 'dark';
  variables?: {
    background: string;
  };
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
    scrollTop?: CSSObject;
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

// source: https://github.com/trycourier/courier-react/blob/main/packages/react-hooks/src/inbox/use-inbox-actions.ts
export type IFetchMessagesParams = any;

// source: https://github.com/trycourier/courier-react/blob/main/packages/react-hooks/src/inbox/use-inbox-actions.ts
export interface InboxSdk {
  fetchMessages: (params?: IFetchMessagesParams) => void;
  getUnreadMessageCount: (params?: IGetInboxMessagesParams) => void;
  init: (inbox?: InboxProps) => void;
  markAllAsRead: (fromWS?: boolean) => void;
  markMessageArchived: (messageId: string, fromWS?: boolean) => Promise<void>;
  markMessageOpened: (messageId: string, fromWS?: boolean) => Promise<void>;
  markMessageRead: (messageId: string, fromWS?: boolean) => Promise<void>;
  markMessageUnread: (messageId: string, fromWS?: boolean) => Promise<void>;
  newMessage: (transportMessage: IInboxMessagePreview) => void;
  resetLastFetched: () => void;
  setView: (view: string | 'preferences') => void;
  toggleInbox: (isOpen?: boolean) => void;
  unpinMessage: (messageId: string, fromWS?: boolean) => Promise<void>;
  addTag: (messageId: string, tag: string, fromWS?: boolean) => Promise<void>;
  removeTag: (messageId: string, tag: string, fromWS?: boolean) => Promise<void>;
  trackClick: (messageId: string, trackingId: string) => Promise<void>;
  // additional
  setConfig: (config: InboxProps) => void;
  mergeConfig: (config: InboxProps) => void;
}
