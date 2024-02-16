import { h, type PropType, defineComponent, watch } from 'vue-demi';

import { ToastPosition, ToastProps, ToastRole, ToastTheme, ToastTransition } from '../types/toast';
import { Courier } from '../ts/courier';

export default defineComponent({
  props: {
    autoClose: { type: [Boolean, Number], default: undefined },
    defaultIcon: String,
    hideProgressBar: { type: Boolean, default: undefined },
    position: { type: Object as PropType<ToastPosition> },
    role: { type: Object as PropType<ToastRole> },
    theme: { type: Object as PropType<ToastTheme> },
    transition: { type: Object as PropType<ToastTransition> }
  },
  setup(props) {
    /* 
    https://www.courier.com/docs/platform/inbox/web/javascript-sdk/
    https://github.com/trycourier/courier-react/tree/main/packages/components#updating-component-configs
    components have centralised properties when using the embedded version, so we need to make sure
    props are converted from vue prop semantics into global updates 
    */
    watch(props, p => Courier.updateToast(p as any as ToastProps), { immediate: true, flush: 'pre' });
    return () => h('courier-toast');
  }
});
