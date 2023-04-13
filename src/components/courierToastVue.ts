import { h, type PropType, defineComponent } from 'vue-demi';

import { ToastPosition, ToastRole, ToastTheme, ToastTransition } from '../types/toast';

export default defineComponent({
  props: {
    autoClose: { type: [Boolean, Number] },
    defaultIcon: String,
    hideProgressBar: Boolean,
    position: { type: Object as PropType<ToastPosition> },
    role: { type: Object as PropType<ToastRole> },
    theme: { type: Object as PropType<ToastTheme> },
    transition: { type: Object as PropType<ToastTransition> }
  },
  setup(props) {
    return () => h('courier-toast', { ...props });
  }
});
