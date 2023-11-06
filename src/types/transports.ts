export interface IInboxMessagePreview {
  type: 'message';
  archived?: string;
  created: string;
  messageId: string;
  pinned?: {
    slotId?: string;
  };
  actions?: Array<IActionElemental>;
  preview?: string;
  icon?: string;
  opened?: string;
  data?: Record<string, any>;
  /** ISO 8601 date the message was read */
  read?: string;
  title?: string;
  trackingIds?: {
    openTrackingId?: string;
    archiveTrackingId?: string;
    clickTrackingId?: string;
    deliverTrackingId?: string;
    readTrackingId?: string;
    unreadTrackingId?: string;
  };
}

export interface IActionElemental {
  background_color?: string;
  type: 'action';
  content: string;
  href: string;
  data?: Record<string, any>;
}
