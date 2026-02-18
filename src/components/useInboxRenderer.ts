import { CourierInboxPopupMenu } from '@trycourier/courier-ui-inbox';
import { nextTick } from 'process';
import {
  computed,
  getCurrentInstance,
  h,
  MaybeRefOrGetter,
  onBeforeUnmount,
  onMounted,
  ref,
  render,
  RenderFunction,
  ShallowRef,
  toValue,
  useSlots,
  useTemplateRef,
  VNode,
  watch,
  watchEffect
} from 'vue';

type InboxComponent = Readonly<ShallowRef<CourierInboxPopupMenu | null>>;

type CaptureTarget<TProps> = (inbox: CourierInboxPopupMenu) => (props: TProps | undefined | null) => HTMLElement;

export const useSlotRenderer = <TProps>(
  slot: MaybeRefOrGetter<RenderFunction>,
  inbox: InboxComponent,
  captureTarget: CaptureTarget<TProps>
) => {
  const appContext = getCurrentInstance()?.appContext || null;
  const slotProvided = computed(() => !!toValue(slot));

  const handleCreate = (p: TProps | null | undefined) => {
    const el = document.createElement('div');
    const vnode = h(toValue(slot), p);
    vnode.appContext = appContext;
    render(vnode, el);

    return el;
  };

  const bindHandlers = () => {
    const ibx = inbox.value;
    if (!ibx) {
      return;
    }

    // remove handler (so built in can render)
    if (!slotProvided.value) {
      captureTarget(ibx).apply(ibx);
      return;
    }

    // add customer handler
    captureTarget(ibx).apply(ibx, [handleCreate]);
  };

  watch([() => toValue(slot), inbox], () => bindHandlers());
};
