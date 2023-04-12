import { h, type PropType, defineComponent } from 'vue-demi';

import type { InboxPlacement, InboxTheme, Brand, Labels, InboxTrigger } from '../types/inbox';

type IsoFormatter = (isoDate: string) => string;

export default defineComponent({
  props: {
    brand: { type: Object as PropType<Brand> },
    className: String,
    openLinksInNewTab: Boolean,
    showUnreadMessageCount: Boolean,
    from: Number,
    formatDate: { type: Function as PropType<IsoFormatter> },
    labels: { type: Object as PropType<Labels> },
    defaultIcon: { type: [Boolean, String] },
    placement: { type: Object as PropType<InboxPlacement> },
    theme: { type: Object as PropType<InboxTheme> },
    title: { type: Object as PropType<string> },
    trigger: { type: Object as PropType<InboxTrigger> }
  },
  setup(props) {
    return () => h('courier-inbox', { ...props });
  }
});
