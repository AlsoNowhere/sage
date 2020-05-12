
import {
    get as _get,
    set as _set,
    define as _define
} from "./services/get-set-define.service";

import { logger as _logger } from "./services/logger.service";

import {
    forEach as _forEach,
    reverseForEach as _reverseForEach
} from "./services/for-each.service";

import { isSurroundedBy as _isSurroundedBy } from "./services/is-surrounded-by.service";



export const get = _get;
export const set = _set;
export const define = _define;

export const logger = _logger;

export const forEach = _forEach;
export const reverseForEach = _reverseForEach;

export const isSurroundedBy = _isSurroundedBy;
