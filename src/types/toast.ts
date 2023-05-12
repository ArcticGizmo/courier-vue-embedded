import { CSSObject } from "styled-components";

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

export type ToastPosition = 'top-left' | 'top-right' | 'top-center' | 'bottom-left' | 'bottom-right' | 'bottom-center';
export type ToastRole = 'alert' | 'status';
export type ToastTransition = 'bounce' | 'slide' | 'zoom';
