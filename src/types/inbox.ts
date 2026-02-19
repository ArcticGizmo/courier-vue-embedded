import type { CourierComponentThemeMode, CourierInboxFeed, CourierInboxTheme } from '@trycourier/courier-ui-inbox';

export interface CourierInboxProps {
  /** Height of the inbox container. Defaults to "auto" and will resize itself based on it's children. */
  height?: string;

  /** Theme object for light mode */
  lightTheme?: CourierInboxTheme;

  /** Theme object for dark mode */
  darkTheme?: CourierInboxTheme;

  /** Theme mode: "light", "dark", or "system". Defaults to "system" */
  mode?: CourierComponentThemeMode;

  /** Type of feed to display in the inbox. Defaults to "inbox" */
  feedType?: string;

  /** Array of feeds to display in the inbox. Each feed contains tabs with different filters. */
  feeds?: CourierInboxFeed[];
}
