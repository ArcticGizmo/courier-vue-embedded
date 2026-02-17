import type { CourierComponentThemeMode } from "@trycourier/courier-ui-inbox";
import type { CourierToastTheme, CourierToastDismissButtonOption, CourierToastItemClickEvent, CourierToastItemActionClickEvent, CourierToastItemFactoryProps } from "@trycourier/courier-ui-toast";
import type { CSSProperties } from "vue";

export interface CourierToastProps {
  /**
   * Styles applied to the CourierToast component.
   *
   * By default, the component has the following styles:
   *
   * ```css
   * position: "fixed";
   * width: "380px";
   * top: "30px";
   * right: "30px";
   * z-index: 999;
   * ```
   *
   * Setting styles directly on the component is useful to customize the component's
   * position and layout. Setting `height` is effectively a no-op, as `height`
   * will be dynamically set by the component as toast items are added and removed.
   */
  style?: CSSProperties;

  /** Theme object used to render the component when light mode is used. */
  lightTheme?: CourierToastTheme;

  /** Theme object used to render the component when dark mode is used. */
  darkTheme?: CourierToastTheme;

  /** Manually set the theme mode to one of "light", "dark", or "system". Defaults to "system". */
  mode?: CourierComponentThemeMode;

  /** Enable toasts to auto-dismiss, including a timer bar at the top of the toast. Defaults to false. */
  autoDismiss?: boolean;

  /**
   * The timeout before a toast auto-dismisses, if {@link CourierToastProps.autoDismiss} is enabled.
   * Defaults to 5000ms.
   */
  autoDismissTimeoutMs?: number;

  /**
   * Set the dismiss button's visibility.
   *
   * Defaults to "auto", which makes the button always visible if `autoDismiss` is false
   * and visible on hover if `autoDismiss` is true.
   */
  dismissButton?: CourierToastDismissButtonOption;

  /** Render prop specifying how to render an entire toast item. */
  renderToastItem?: (props: CourierToastItemFactoryProps) => HTMLElement;

  /**
   * Render prop specifying how to render a toast item's content.
   *
   * The toast item's container, including the stack, auto-dismiss timer, and dismiss button
   * are still present when this prop is set.
   *
   * See {@link CourierToastProps.dismissButton} to customize the dismiss button's visibility and
   * {@link CourierToastProps.renderToastItem} to customize the entire toast item, including
   * its container.
   */
  renderToastItemContent?: (props: CourierToastItemFactoryProps) => HTMLElement;
}