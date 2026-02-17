import { computed } from "vue";

export const useKebabBinding = (props: Record<string, any>) => {
  const toKebabCase = (key: string) =>
    key
      .replace(/([a-z0-9])([A-Z])/g, '$1-$2')
      .replace(/[\s_]+/g, '-')
      .toLowerCase();

  return computed(() =>
    Object.fromEntries(
      Object.entries(props).map(([key, value]) => [toKebabCase(key), value])
    )
  );
};