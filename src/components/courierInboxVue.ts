import { h, type PropType, defineComponent } from 'vue-demi';

import type { InboxPlacement, InboxTheme, Brand, Labels, InboxTrigger } from '../types/inbox';

type IsoFormatter = (isoDate: string) => string;

export default defineComponent({
  props: {
    tenantId: String,
    brand: Object as PropType<Brand>,
    className: String,
    openLinksInNewTab: Boolean,
    renderActionsAsButtons: Boolean,
    showUnreadMessageCount: Boolean,
    from: Number,
    views: Array as PropType<{id: string, label: string, params: any}[]>,
    formatDate: Function as PropType<IsoFormatter>,
    labels: Object as PropType<Labels>,
    defaultIcon: { type: [Boolean, String] },
    placement: Object as PropType<InboxPlacement>,
    theme: Object as PropType<InboxTheme>,
    title: String,
    trigger: Object as PropType<InboxTrigger>
  },
  setup(props) {
    return () => h('courier-inbox', { ...props });
  }
});
