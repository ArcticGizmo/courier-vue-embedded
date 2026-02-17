import { Courier, CourierProps } from '@trycourier/courier-ui-inbox';

export const useCourier = () => {
  return { Courier, signIn: Courier.shared.signIn, signOut: Courier.shared.signOut };
};
