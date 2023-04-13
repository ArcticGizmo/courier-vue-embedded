// This is a fix to prevent Vue 2.7 unknown component errors from
// an external script definition
class CourierInboxPlaceholder extends HTMLElement {}
class CourierToastPlaceholder extends HTMLElement {}
class CourierPreferencesPlaceholder extends HTMLElement {}

customElements.define('courier-inbox', CourierInboxPlaceholder);
customElements.define('courier-toast', CourierToastPlaceholder);
customElements.define('courier-preferences', CourierPreferencesPlaceholder);

import CourierInboxVue from './components/courierInboxVue';
import CourierToastVue from './components/courierToastVue';
import CourierPreferencesVue from './components/courierPreferencesVue';

import { Courier } from './ts/courier';

export { Courier, CourierInboxVue, CourierToastVue, CourierPreferencesVue };
