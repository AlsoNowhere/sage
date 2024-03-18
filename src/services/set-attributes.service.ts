export const setAttributes = (
  target: HTMLElement | SVGElement,
  attributes: Record<string, string>
) => {
  for (let key in attributes) {
    const value = attributes[key];
    if (value !== undefined) {
      target.setAttribute(key, value);
    }
  }
};
