'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

const defaultProperties = {
    configurable: true,
    enumerable: true,
};
const get = (obj, property, action, propertes = {}) => {
    Object.defineProperty(obj, property, Object.assign(Object.assign({ get: action }, defaultProperties), propertes));
};
const set = (obj, property, action, propertes = {}) => {
    Object.defineProperty(obj, property, Object.assign(Object.assign({ set: (value) => action(value) }, defaultProperties), propertes));
};
const define = (obj, property, getAction, setAction, initialVlue, propertes = {}) => {
    let _value = initialVlue;
    Object.defineProperty(obj, property, Object.assign(Object.assign({ get: () => getAction(_value), set: (value) => (setAction(value), (_value = value), value) }, defaultProperties), propertes));
};

const path = {
    get url() {
        return this.get().join("/");
    },
    get() {
        return window.location.hash
            .replace(/(%20)/g, " ")
            .slice(1)
            .split("/")
            .filter((x) => x !== "");
    },
    set(url) {
        window.location.hash = url.join("/");
    },
};

const wait = (time = 0) => new Promise((resolve) => {
    setTimeout(() => {
        resolve();
    }, time);
});

const setAttributes = (target, attributes) => {
    for (let key in attributes) {
        const value = attributes[key];
        if (value !== undefined) {
            target.setAttribute(key, value);
        }
    }
};

/******************************************************************************
Copyright (c) Microsoft Corporation.

Permission to use, copy, modify, and/or distribute this software for any
purpose with or without fee is hereby granted.

THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL WARRANTIES WITH
REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF MERCHANTABILITY
AND FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR ANY SPECIAL, DIRECT,
INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES WHATSOEVER RESULTING FROM
LOSS OF USE, DATA OR PROFITS, WHETHER IN AN ACTION OF CONTRACT, NEGLIGENCE OR
OTHER TORTIOUS ACTION, ARISING OUT OF OR IN CONNECTION WITH THE USE OR
PERFORMANCE OF THIS SOFTWARE.
***************************************************************************** */

function __awaiter(thisArg, _arguments, P, generator) {
  function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
  return new (P || (P = Promise))(function (resolve, reject) {
      function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
      function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
      function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
      step((generator = generator.apply(thisArg, _arguments || [])).next());
  });
}

typeof SuppressedError === "function" ? SuppressedError : function (error, suppressed, message) {
  var e = new Error(message);
  return e.name = "SuppressedError", e.error = error, e.suppressed = suppressed, e;
};

const time = 300;
const timeToWait = 3000;

class Toaster {
    constructor(target = document.body) {
        this.toast = (message, options, alternateElementTarget) => __awaiter(this, void 0, void 0, function* () {
            var _a;
            const _previousTarget = this.target;
            if (alternateElementTarget !== undefined) {
                this.target = alternateElementTarget;
            }
            const theme = typeof options === "string" ? options : (_a = options === null || options === void 0 ? void 0 : options.theme) !== null && _a !== void 0 ? _a : "blueberry";
            const { hasButton, clickToClose, linger, classes, buttonClasses } = typeof options === "string" ? {} : options;
            if (this.toasts.length === 0) {
                this.mountToastContainer();
            }
            this.target = _previousTarget;
            const toast = { element: document.createElement("div") };
            toast.element.classList.add("toast", `toast__${theme}`, ...(classes || []));
            const toastMessageSpan = document.createElement("span");
            toastMessageSpan.textContent = message;
            const toastMessageButton = document.createElement("button");
            toastMessageButton.classList.add("toast__button", "empty", ...(buttonClasses || []));
            {
                const buttonSpan = document.createElement("span");
                buttonSpan.classList.add("fa", "fa-times");
                toastMessageButton.append(buttonSpan);
            }
            const remove = () => __awaiter(this, void 0, void 0, function* () {
                var _b, _c;
                delete toast.remove;
                if (clickToClose === true) {
                    toast.element.removeEventListener("click", remove);
                }
                toastMessageButton.removeEventListener("click", remove);
                toast.element.classList.add("fade-out");
                yield wait(time);
                (_b = toast.element.parentElement) === null || _b === void 0 ? void 0 : _b.removeChild(toast.element);
                this.toasts.splice(this.toasts.indexOf(toast, 1));
                if (this.toasts.length == 0) {
                    this.index = 0;
                    (_c = this.toastContainer.parentElement) === null || _c === void 0 ? void 0 : _c.removeChild(this.toastContainer);
                }
            });
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
            const _timeToWait = typeof linger !== "number"
                ? timeToWait
                : (() => {
                    // ** TS should accept a number as an argument here but....... you know!
                    if (linger < 0 || parseInt(linger + "") !== linger) {
                        console.error("Must provide a positive integer for the property 'linger'.");
                        return timeToWait;
                    }
                    return linger;
                })();
            yield wait(_timeToWait);
            remove();
        });
        this.index = 0;
        this.toasts = [];
        this.target = target;
        {
            const toastContainer = document.createElement("div");
            toastContainer.classList.add("toast-container");
            this.toastContainer = toastContainer;
        }
    }
    getToastIndex(index) {
        return `toast--piece--${index}`;
    }
    mountToastContainer() {
        this.target.append(this.toastContainer);
    }
}
const toaster = new Toaster(document.body);
const toast = (message, theme = "blueberry", alternateElementTarget) => toaster.toast(message, theme, alternateElementTarget);

const resolveLeadingZeroes = (item) => {
    if (typeof item === "number") {
        if (item < 10)
            return "0" + item;
        return "" + item;
    }
    else {
        if (item.length === 1)
            return "0" + item;
        return item;
    }
};
const dateMap = new Map();
dateMap.set("dd/mm/yyyy", ({ d, m, y }) => `${resolveLeadingZeroes(d)}/${resolveLeadingZeroes(m)}/${y}`);
dateMap.set("dd/mm/yyyy hh:mm", ({ d, m, y, h, min }) => `${resolveLeadingZeroes(d)}/${resolveLeadingZeroes(m)}/${y} ${resolveLeadingZeroes(h)}:${resolveLeadingZeroes(min)}`);
dateMap.set("yyyy-mm-dd", ({ d, m, y }) => `${y}-${resolveLeadingZeroes(m)}-${resolveLeadingZeroes(d)}`);
dateMap.set("dd-mm-yyyy", ({ d, m, y }) => `${resolveLeadingZeroes(d)}-${resolveLeadingZeroes(m)}-${y}`);
dateMap.set("dd-mm-yyyy hh:mm", ({ d, m, y, h, min }) => `${resolveLeadingZeroes(d)}-${resolveLeadingZeroes(m)}-${y} ${resolveLeadingZeroes(h)}:${resolveLeadingZeroes(min)}`);
const getDate = (date = new Date(), type = "dd/mm/yyyy") => {
    const [d, m, y, h, min] = [
        date.getDate(),
        date.getMonth() + 1,
        date.getFullYear(),
        date.getHours(),
        date.getMinutes(),
    ];
    const output = dateMap.get(type);
    if (output === undefined) {
        return null;
    }
    return output({ d, m, y, h, min });
};

const styles = (obj) => {
    return Object.entries(obj)
        .filter(([key, value]) => key !== undefined && value !== undefined)
        .map(([key, value]) => `${key}: ${value}`)
        .join("; ");
};

exports.define = define;
exports.get = get;
exports.getDate = getDate;
exports.path = path;
exports.set = set;
exports.setAttributes = setAttributes;
exports.styles = styles;
exports.toast = toast;
exports.wait = wait;
