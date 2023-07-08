const defaultProperties = {
  configurable: true,
  enumerable: true,
};

export const get = (obj, property, action, propertes = {}) => {
  Object.defineProperty(obj, property, {
    get: action,
    ...defaultProperties,
    ...propertes,
  });
};

export const set = (obj, property, action, propertes = {}) => {
  Object.defineProperty(obj, property, {
    set: (value) => action(value),
    ...defaultProperties,
    ...propertes,
  });
};

export const define = (
  obj,
  property,
  getAction,
  setAction,
  initialVlue,
  propertes = {}
) => {
  let _value = initialVlue;
  Object.defineProperty(obj, property, {
    get: () => getAction(_value),
    set: (value) => (setAction(value), (_value = value), value),
    ...defaultProperties,
    ...propertes,
  });
};
