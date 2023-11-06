import { h, type PropType, defineComponent } from 'vue-demi';

import type { InboxPlacement, InboxTheme, Brand, Labels, InboxTrigger, OnEvent } from '../types/inbox';

type IsoFormatter = (isoDate: string) => string;

export default defineComponent({
  props: {
    tenantId: String,
    brand: Object as PropType<Brand>,
    className: String,
    defaultIcon: String,
    from: Number,
    isOpen: Boolean,
    views: Array as PropType<{ id: string; label: string; params: any }[]>,
    formatDate: Function as PropType<IsoFormatter>,
    appendTo: String,
    labels: Object as PropType<Labels>,
    onEvent: Object as PropType<OnEvent>,
    openLinksInNewTab: { type: Boolean, default: true },
    placement: Object as PropType<InboxPlacement>,
    showUnreadMessageCount: Boolean,
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
    return () => h('courier-inbox', { ...props });
  }
});
