import { time } from "../data/constants.data";

const toastKey = "toast--service--container";

const toastIndex = (index) => `toast--piece--${index}`;

const isToastContainerMounted = (target) => {
  const arr = Array.from(target.children);
  let i = 0;
  while (i < arr.length) {
    if (arr[i].className.includes(toastKey)) {
      return arr[i];
    }
    i++;
  }
  return null;
};

const mountToastContainer = (target) => {
  const element = document.createElement("DIV");
  element.classList.add(toastKey);
  element.classList.add("fixed", "right-gap", "bottom", "left-gap");
  element.style.zIndex = 100;
  target.append(element);
  return element;
};

const addToast = (message, container, target, index, theme, classes) => {
  const element = document.createElement("DIV");
  element.innerText = message;
  element.classList.add(toastIndex(index));
  element.classList.add(
    "fade-in",
    "width-full",
    "margin-bottom",
    "padded-large",
    "rounded",
    "shadow",
    "line-height-large",
    "snow-text",
    "bold"
  );
  element.classList.add(`${theme}-bg`);
  element.classList.add(...classes);
  container.append(element);
  const close = () => {
    if (!target.contains(element)) return;
    element.removeEventListener("click", close);
    element.classList.add("fade-out");
    setTimeout(() => {
      if (!target.contains(element)) return;
      container.removeChild(element);
      if (container.children.length === 0) {
        target.removeChild(container);
      }
    }, time);
  };
  element.addEventListener("click", close);
  setTimeout(close, 3000);
  return { close };
};

export const toast = (
  message,
  theme = "blueberry",
  classes = [],
  target = document.body
) => {
  let container = isToastContainerMounted(target);
  if (container === null) {
    container = mountToastContainer(target);
  }
  const index = container.children.length;
  const newToast = addToast(message, container, target, index, theme, classes);
  return newToast;
};
