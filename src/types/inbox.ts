import { CSSObject } from "styled-components";
export type InboxPlacement = 'top' | 'left' | 'right' | 'bottom';

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
}

export type InboxTrigger = 'click' | 'hover';
