import { CourierInbox, CourierInboxPopupMenu } from '@trycourier/courier-ui-inbox';
import { CourierToast } from '@trycourier/courier-ui-toast';
import {
  computed,
  getCurrentInstance,
  h,
  type MaybeRefOrGetter,
  ref,
  render,
  type RenderFunction,
  type ShallowRef,
  toValue,
  watch
} from 'vue';

CourierToast;

type CaptureTarget<TProps> = (toast: CourierToast) => (props: TProps | undefined | null) => HTMLElement;

export const useToastSlotRenderer = <TProps>(
  slot: MaybeRefOrGetter<RenderFunction>,
  toast: Readonly<ShallowRef<CourierToast | null>>,
  captureTarget: CaptureTarget<TProps>
) => {
  const appContext = getCurrentInstance()?.appContext || null;
  const normalisedSlot = computed(() => toValue(slot));
  const slotProvided = computed(() => {
    return !!normalisedSlot.value;
  });

  const handleCreate = (p: TProps | null | undefined) => {
    const el = document.createElement('div');
    const dismiss = () => el.remove();
    const vnode = h(normalisedSlot.value, { ...p, ctx: toast.value!, dismiss });
    vnode.appContext = appContext;

    render(vnode, el);
    return el;
  };

  const bindHandlers = () => {
    const t = toast.value;
    if (!t) {
      return;
    }

    // remove handler (so built in can render)
    if (!slotProvided.value) {
      captureTarget(t).apply(t);
      return;
    }

    // add customer handler
    captureTarget(t).apply(t, [handleCreate]);
  };

  watch(toast, () => bindHandlers());
};
