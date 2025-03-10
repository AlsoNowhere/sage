import { wait } from "./wait.service";

import { time, timeToWait } from "../data/constants.data";

import { TThemes } from "../types/TThemes.type";

interface IToastOptions {
  theme?: TThemes;
  hasButton?: false;
  clickToClose?: true;
  linger?: number;
  classes?: Array<string>;
  buttonClasses?: Array<string>;
}

interface IToast {
  element: HTMLElement;
  remove?: () => void;
}

class Toaster {
  index: number;
  toasts: Array<IToast>;
  target: HTMLElement;
  toastContainer: HTMLElement;

  constructor(target: HTMLElement = document.body) {
    this.index = 0;
    this.toasts = [];
    this.target = target;
    {
      const toastContainer = document.createElement("div");
      toastContainer.classList.add("toast-container");
      this.toastContainer = toastContainer;
    }
  }

  getToastIndex(index: number) {
    return `toast--piece--${index}`;
  }

  mountToastContainer() {
    this.target.append(this.toastContainer);
  }

  toast = async (
    message: string,
    options: TThemes | IToastOptions,
    alternateElementTarget?: HTMLElement
  ) => {
    const _previousTarget = this.target;

    if (alternateElementTarget !== undefined) {
      this.target = alternateElementTarget;
    }

    const theme =
      typeof options === "string" ? options : options?.theme ?? "blueberry";

    const { hasButton, clickToClose, linger, classes, buttonClasses } =
      typeof options === "string" ? ({} as IToastOptions) : options;

    if (this.toasts.length === 0) {
      this.mountToastContainer();
    }

    this.target = _previousTarget;

    const toast: IToast = { element: document.createElement("div") };
    toast.element.classList.add("toast", `toast__${theme}`, ...(classes || []));

    const toastMessageSpan = document.createElement("span");
    toastMessageSpan.textContent = message;

    const toastMessageButton = document.createElement("button");
    toastMessageButton.classList.add(
      "toast__button",
      "empty",
      ...(buttonClasses || [])
    );
    {
      const buttonSpan = document.createElement("span");
      buttonSpan.classList.add("fa", "fa-times");
      toastMessageButton.append(buttonSpan);
    }

    const remove = async () => {
      delete toast.remove;
      if (clickToClose === true) {
        toast.element.removeEventListener("click", remove);
      }
      toastMessageButton.removeEventListener("click", remove);
      toast.element.classList.add("fade-out");

      await wait(time);

      toast.element.parentElement?.removeChild(toast.element);
      this.toasts.splice(this.toasts.indexOf(toast, 1));
      if (this.toasts.length == 0) {
        this.index = 0;
        this.toastContainer.parentElement?.removeChild(this.toastContainer);
      }
    };

    toast.remove = remove;

    if (clickToClose === true) {
      toast.element.addEventListener("click", remove);
    }
    toastMessageButton.addEventListener("click", remove);

    toast.element.append(toastMessageSpan);
    if (hasButton === undefined) {
      toast.element.append(toastMessageButton);
    }

    this.toastContainer.append(toast.element);
    this.toasts.push(toast);
    this.index++;

    const _timeToWait =
      typeof linger !== "number"
        ? timeToWait
        : (() => {
            // ** TS should accept a number as an argument here but....... you know!
            if (linger < 0 || parseInt(linger + "") !== linger) {
              console.error(
                "Must provide a positive integer for the property 'linger'."
              );
              return timeToWait;
            }
            return linger;
          })();

    await wait(_timeToWait);

    remove();
  };
}

const toaster = new Toaster(document.body);

export const toast = (
  message: string,
  theme: TThemes | IToastOptions = "blueberry",
  alternateElementTarget?: HTMLElement
) => toaster.toast(message, theme, alternateElementTarget);
