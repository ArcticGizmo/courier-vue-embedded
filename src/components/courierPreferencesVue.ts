import { h, defineComponent } from 'vue-demi';

export default defineComponent({
  props: {
    draft: Boolean
  },
  setup(props) {
    return () => h('courier-preferences', { ...props });
  }
});
