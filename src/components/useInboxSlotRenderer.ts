import { CourierInbox, CourierInboxPopupMenu } from '@trycourier/courier-ui-inbox';
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

type InboxLike = CourierInboxPopupMenu | CourierInbox;

type CaptureTarget<TProps, I extends InboxLike> = (inbox: C) => (props: TProps | undefined | null) => HTMLElement;

export const useInboxSlotRenderer = <TProps, I extends InboxLike>(
  slot: MaybeRefOrGetter<RenderFunction>,
  inbox: Readonly<ShallowRef<C | null>>,
  captureTarget: CaptureTarget<TProps, C>
) => {
  const appContext = getCurrentInstance()?.appContext || null;
  const normalisedSlot = computed(() => toValue(slot));
  const slotProvided = computed(() => {
    return !!normalisedSlot.value;
  });

  const handleCreate = (p: TProps | null | undefined) => {
    const el = document.createElement('div');
    const vnode = h(normalisedSlot.value, { ...p, ctx: inbox.value! });
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

  watch(inbox, () => bindHandlers());
};
