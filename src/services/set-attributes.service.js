export const setAttributes = (target, attributes) => {
  Object.entries(attributes).forEach(([key, value]) => {
    if (value instanceof Object) {
      const newValue = Object.entries(value)
        .map(([key, value]) => `${key}: ${value};`)
        .join(" ");
      target.setAttribute(key, newValue);
      return;
    }
    value !== undefined && target.setAttribute(key, value);
  });
};
