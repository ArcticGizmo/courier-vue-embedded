// source: https://github.com/packages/react-toast/src/types.ts
import { CSSObject } from 'styled-components';
import { IInboxMessagePreview, Brand } from './core';

type ToastPosition = 'top-left' | 'top-right' | 'top-center' | 'bottom-left' | 'bottom-right' | 'bottom-center';

interface Theme {
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

// This is called IToastConfig and aliased for some reason
export interface ToastProps {
  autoClose?: false | number;
  brand?: Brand;
  defaultIcon?: string | false;
  hideProgressBar?: boolean;
  onClick?: React.MouseEventHandler<Element>;
  openLinksInNewTab?: boolean;
  position?: ToastPosition;
  role?: string;
  theme?: Theme;
  transition?: string;
  // renderMessage?: React.FunctionComponent<IInboxMessagePreview>;
}

export interface ToastPreview {
  preview?: string;
  title?: string;
}

export type ToastParams = string | IInboxMessagePreview | ToastPreview;

export interface ToastSdk {
  config: ToastProps;
  mergeConfig: (config: ToastProps) => void;
  setConfig: (config: ToastProps) => void;
  toast: (params: ToastParams) => void;
}
