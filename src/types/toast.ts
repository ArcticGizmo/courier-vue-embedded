export interface ToastTheme {
  body?: React.CSSProperties;
  root?: React.CSSProperties;
  toast?: React.CSSProperties;
  dismiss?: React.CSSProperties;
  message?: {
    actionBlock?: React.CSSProperties;
    textBlock?: React.CSSProperties;
    body?: React.CSSProperties;
    contents?: React.CSSProperties;
    icon?: React.CSSProperties;
    title?: React.CSSProperties;
  };
  progressBar?: React.CSSProperties;
}
