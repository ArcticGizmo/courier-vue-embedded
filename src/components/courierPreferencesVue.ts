import { h, defineComponent } from 'vue-demi';

export default defineComponent({
  props: {
    tenantId: String,
    draft: Boolean
  },
  setup(props) {
    return () => h('courier-preferences', { ...props });
  }
});
