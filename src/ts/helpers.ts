type Resolve = (value?: any) => void;
type Reject = (reason?: any) => void;

interface DeferredPromise<T> extends Promise<T> {
  resolve: Resolve;
  reject: Reject;
}

export const Deferred = <T>(callback?: (resolve: Resolve, reject: Reject) => T): DeferredPromise<T> => {
  let res!: Resolve;
  let rej!: Reject;
  const promise = new Promise<any>((resolve, reject) => {
    res = resolve;
    rej = reject;
    if (callback) {
      callback(resolve, reject);
    }
  });

  const defProm = promise as DeferredPromise<T>;

  defProm.resolve = res;
  defProm.reject = rej;

  return defProm;
};

export const withoutUndefinedValues = (obj: any) => {
  const cleanObj: any = {};
  Object.entries(obj).forEach(([key, value]) => {
    if (value !== undefined) {
      cleanObj[key] = value as unknown;
    }
  });
  return cleanObj;
};
