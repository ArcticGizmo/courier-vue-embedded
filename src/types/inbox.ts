import { CSSObject } from 'styled-components';
import { IInboxMessagePreview } from './transports';

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
  renderContainer?: React.FunctionComponent;
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
