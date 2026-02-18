import { CourierInboxPopupMenu } from '@trycourier/courier-ui-inbox';
import { nextTick } from 'process';
import {
  computed,
  h,
  onBeforeUnmount,
  onMounted,
  ref,
  render,
  ShallowRef,
  useSlots,
  useTemplateRef,
  VNode,
  watch
} from 'vue';

type InboxComponent = Readonly<ShallowRef<CourierInboxPopupMenu | null>>;

type CaptureTarget<TProps> = (inbox: CourierInboxPopupMenu) => (props: TProps | undefined | null) => HTMLElement;

export const useInboxRenderer = <TProps>(inbox: InboxComponent, name: string, captureTarget: CaptureTarget<TProps>) => {
  const slots = useSlots();
  const hasSlot = computed(() => !!slots[name]);
  let observer: MutationObserver;

  const templateRef = useTemplateRef<HTMLDivElement>(name);
  const props = ref<TProps | undefined>();

  const capture = (p: TProps | undefined) => {
    props.value = p ?? undefined;
    return templateRef.value ?? undefined;
  };

  const handleSet = () => {
    const ibx = inbox.value;
    if (!ibx) {
      return;
    }

    const hasContent = templateRef.value?.childNodes.length > 2;

    if (!hasSlot.value || !hasContent) {
      nextTick(() => {
        captureTarget(ibx).apply(ibx);
      });
      props.value = undefined;
      return;
    }

    nextTick(() => {
      captureTarget(ibx).apply(ibx, [capture]);
    });
  };

  watch(inbox, () => handleSet());

  onMounted(() => {
    if (templateRef.value) {
      observer = new MutationObserver(handleSet);
      observer.observe(templateRef.value, { childList: true });
    }
  });

  onBeforeUnmount(() => {
    observer?.disconnect();
    observer = undefined;
  });

  return { name, hasSlot, props };
};

type CreatedItem<TProps> = {
  props: TProps;
  element: HTMLElement;
};

export const useInboxMultiRenderer = <TProps>(
  inbox: InboxComponent,
  name: string,
  captureTarget: CaptureTarget<TProps>,
  idFun: (props: TProps) => string
) => {
  const slots = useSlots();
  const hasSlot = computed(() => !!slots[name]);
  let observer: MutationObserver;

  const messages = ref<Record<string, CreatedItem<TProps> | undefined>>({});

  const capture = (p: TProps | undefined) => {
    console.log('--- egg', p);
    if (!p) {
      return undefined;
    }

    const id = idFun(p);
    const existing = messages.value[id];
    if (existing) {
      // delete or something
      existing.element.remove();
    }

    const vnode = h(slots[name], p);
    const element = document.createElement('div');
    render(vnode, element);

    messages.value[id] = { props: p, element };

    console.dir(element);

    return element ?? undefined;
  };

  const handleSet = () => {
    const ibx = inbox.value;
    if (!ibx) {
      return;
    }

    // const hasContent = templateRef.value?.childNodes.length > 2;

    if (!hasSlot.value) {
      nextTick(() => {
        captureTarget(ibx).apply(ibx);
      });
      props.value = undefined;
      return;
    }

    nextTick(() => {
      captureTarget(ibx).apply(ibx, [capture]);
    });
  };

  watch(inbox, () => handleSet());

  // onMounted(() => {
  //   if (templateRef.value) {
  //     observer = new MutationObserver(handleSet);
  //     observer.observe(templateRef.value, { childList: true });
  //   }
  // });

  // onBeforeUnmount(() => {
  //   observer?.disconnect();
  //   observer = undefined;
  // });

  return { name, hasSlot };
};
