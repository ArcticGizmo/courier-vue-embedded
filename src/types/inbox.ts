export type InboxPlacement = 'top' | 'left' | 'right' | 'bottom';

export interface Brand {
  inapp?: {
    disableCourierFooter?: boolean;
    borderRadius?: string;
    disableMessageIcon?: boolean;
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
  container?: React.CSSProperties;
  footer?: React.CSSProperties;
  header?: React.CSSProperties;
  icon?: React.CSSProperties;
  messageList?: {
    container?: React.CSSProperties;
    message?: {
      actions?: {
        container?: React.CSSProperties;
        details?: React.CSSProperties;
        dismiss?: React.CSSProperties;
      };
      body?: React.CSSProperties;
      container?: React.CSSProperties;
      icon?: React.CSSProperties;
      title?: React.CSSProperties;
      unreadIndicator?: React.CSSProperties;
    };
  };
  root?: React.CSSProperties;
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
