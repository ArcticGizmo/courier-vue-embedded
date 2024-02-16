import { h, type PropType, defineComponent, watch } from 'vue-demi';

import type { InboxPlacement, InboxTheme, Brand, Labels, InboxTrigger, OnEvent, InboxProps } from '../types/inbox';
import { Courier } from '../ts/courier';

type IsoFormatter = (isoDate: string) => string;

export default defineComponent({
  props: {
    tenantId: String,
    brand: Object as PropType<Brand>,
    className: String,
    defaultIcon: String,
    from: Number,
    isOpen: { type: Boolean, default: undefined },
    views: Array as PropType<{ id: string; label: string; params: any }[]>,
    formatDate: Function as PropType<IsoFormatter>,
    appendTo: String,
    labels: Object as PropType<Labels>,
    onEvent: Object as PropType<OnEvent>,
    openLinksInNewTab: { type: Boolean, default: undefined },
    placement: Object as PropType<InboxPlacement>,
    showUnreadMessageCount: { type: Boolean, default: undefined },
    theme: Object as PropType<InboxTheme>,
    title: String,
    trigger: Object as PropType<InboxTrigger>
    // The following cannot be easily converted from React.FunctionComponent to a vue equivalent
    // renderContainer:
    // renderBell:
    // renderFooter:
    // renderPin:
    // renderIcon:
    // renderMessage:
    // renderNoMessages
  },
  setup(props) {
    /* 
    https://www.courier.com/docs/platform/inbox/web/javascript-sdk/
    https://github.com/trycourier/courier-react/tree/main/packages/components#updating-component-configs
    components have centralised properties when using the embedded version, so we need to make sure
    props are converted from vue prop semantics into global updates 
    */
    watch(props, p => Courier.updateInbox(p as any as InboxProps), { immediate: true, flush: 'pre' });
    return () => h('courier-inbox', { 'append-to': '#inbox-container' });
  }
});
