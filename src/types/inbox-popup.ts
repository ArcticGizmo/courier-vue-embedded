import type { CourierInboxPopupAlignment, CourierInboxTheme, CourierComponentThemeMode, CourierInboxListItemFactoryProps, CourierInboxListItemActionFactoryProps, CourierInboxHeaderFactoryProps, CourierInboxStateEmptyFactoryProps, CourierInboxStateLoadingFactoryProps, CourierInboxStateErrorFactoryProps, CourierInboxPaginationItemFactoryProps, CourierInboxMenuButtonFactoryProps, CourierInboxFeed } from "@trycourier/courier-ui-inbox";

export interface CourierInboxPopupMenuProps {
  /** Alignment of the popup menu: 'top-right', 'top-left', 'top-center', 'bottom-right', 'bottom-left', 'bottom-center', 'center-right', 'center-left', 'center-center'. */
  popupAlignment?: CourierInboxPopupAlignment;

  /** Width of the popup menu container. */
  popupWidth?: string;

  /** Height of the popup menu container. */
  popupHeight?: string;

  /** CSS left position for the popup menu. */
  left?: string;

  /** CSS top position for the popup menu. */
  top?: string;

  /** CSS right position for the popup menu. */
  right?: string;

  /** CSS bottom position for the popup menu. */
  bottom?: string;

  /** Theme object for light mode. */
  lightTheme?: CourierInboxTheme;

  /** Theme object for dark mode. */
  darkTheme?: CourierInboxTheme;

  /** Theme mode: 'light', 'dark', or 'system'. */
  mode?: CourierComponentThemeMode;

  /** Array of feeds to display in the inbox. Each feed contains tabs with different filters. */
  feeds?: CourierInboxFeed[];

  /** Allows you to pass a custom component as the header. */
  renderHeader?: (props: CourierInboxHeaderFactoryProps | undefined | null) => HTMLElement;

  /** Allows you to pass a custom component as the list item. */
  renderListItem?: (props: CourierInboxListItemFactoryProps | undefined | null) => HTMLElement;

  /** Allows you to pass a custom component as the empty state. */
  renderEmptyState?: (props: CourierInboxStateEmptyFactoryProps | undefined | null) => HTMLElement;

  /** Allows you to pass a custom component as the loading state. */
  renderLoadingState?: (props: CourierInboxStateLoadingFactoryProps | undefined | null) => HTMLElement;

  /** Allows you to pass a custom component as the error state. */
  renderErrorState?: (props: CourierInboxStateErrorFactoryProps | undefined | null) => HTMLElement;

  /** Allows you to pass a custom component as the pagination list item. */
  renderPaginationItem?: (props: CourierInboxPaginationItemFactoryProps | undefined | null) => HTMLElement;

  /** Allows you to pass a custom component as the menu button. */
  renderMenuButton?: (props: CourierInboxMenuButtonFactoryProps | undefined | null) => HTMLElement;
}