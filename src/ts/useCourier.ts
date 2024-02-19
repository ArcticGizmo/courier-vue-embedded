import { CourierConfig } from '../types/courier';
import { CourierClient } from './courier';

let client: CourierClient = null!;

export const useCourier = (config: CourierConfig) => {
  if (!client) {
    client = new CourierClient();
    client.init(config);
  }

  // console.dir(client);

  // refresh token, etch
  return {
    client
  };
};

// export const useCourierPreferences = () => {

// }
