import { CourierInboxPopupMenu } from '@trycourier/courier-ui-inbox';
import { computed, onBeforeUnmount, onMounted, ref, ShallowRef, useSlots, useTemplateRef, watch } from 'vue';

type InboxComponent = Readonly<ShallowRef<CourierInboxPopupMenu | null>>;

type CaptureTarget<TProps> = (inbox: CourierInboxPopupMenu) => (props: TProps | undefined | null) => HTMLElement;

export const useInboxRenderer = <TProps>(inbox: InboxComponent, name: string, captureTarget: CaptureTarget<TProps>) => {
  const slots = useSlots();
  const hasSlot = computed(() => !!slots[name]?.());
  let observer: MutationObserver;

  const templateRef = useTemplateRef<HTMLDivElement>(name);
  const props = ref<TProps>();

  const handleSet = (p: TProps) => {
    props.value = p;

    const hasContent = templateRef.value?.childNodes.length > 2;

    if (!hasContent) {
      return undefined;
    }
    return templateRef.value ?? undefined;
  };

  watch(inbox, ibx => {
    if (ibx) {
      captureTarget(ibx).apply(ibx, [handleSet]);
    }
  });

  const handleSlotChange = () => {
    const ibx = inbox.value;
    if (ibx) {
      captureTarget(ibx).apply(ibx, [handleSet]);
    }
  };

  onMounted(() => {
    if (templateRef.value) {
      observer = new MutationObserver(handleSlotChange);
      observer.observe(templateRef.value, { childList: true });
    }
  });

  onBeforeUnmount(() => {
    observer?.disconnect();
    observer = undefined;
  });

  return { name, hasSlot, props };
};
