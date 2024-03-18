type TProperties = {
  writable?: boolean;
  configurable?: boolean;
  enumerable?: boolean;
};

const defaultProperties: TProperties = {
  configurable: true,
  enumerable: true,
};

export const get = (
  obj: Object,
  property: string,
  action: () => any,
  propertes: TProperties = {}
) => {
  Object.defineProperty(obj, property, {
    get: action,
    ...defaultProperties,
    ...propertes,
  });
};

export const set = (
  obj: Object,
  property: string,
  action: (value: any) => any,
  propertes: TProperties = {}
) => {
  Object.defineProperty(obj, property, {
    set: (value) => action(value),
    ...defaultProperties,
    ...propertes,
  });
};

export const define = (
  obj: Object,
  property: string,
  getAction: (value: any) => any,
  setAction: (value: any) => any,
  initialVlue: any,
  propertes: TProperties = {}
) => {
  let _value = initialVlue;
  Object.defineProperty(obj, property, {
    get: () => getAction(_value),
    set: (value) => (setAction(value), (_value = value), value),
    ...defaultProperties,
    ...propertes,
  });
};
