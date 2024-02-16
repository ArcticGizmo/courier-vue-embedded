import { CSSObject } from 'styled-components';
import { Brand } from './inbox';

export type ToastPosition = 'top-left' | 'top-right' | 'top-center' | 'bottom-left' | 'bottom-right' | 'bottom-center';
export type ToastRole = 'alert' | 'status';
export type ToastTransition = 'bounce' | 'slide' | 'zoom';

export interface ToastTheme {
  body?: CSSObject;
  root?: CSSObject;
  toast?: CSSObject;
  dismiss?: CSSObject;
  message?: {
    clickableContainer?: CSSObject;
    container?: CSSObject;
    contents?: CSSObject;
    icon?: CSSObject;
    textElement?: CSSObject;
    title?: CSSObject;
  };
  progressBar?: CSSObject;
}

export interface ToastProps {
  autoClose?: false | number;
  brand?: Brand;
  defaultIcon?: string | false;
  hideProgressBar?: boolean;
  // onClick?: React.MouseEventHandler<Element>;
  openLinksInNewTab?: boolean;
  position?: ToastPosition;
  role?: string;
  theme?: ToastTheme;
  transition?: string;
  // renderMessage?: React.FunctionComponent<IInboxMessagePreview>;
}
