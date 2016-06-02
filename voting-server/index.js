/**
 * Entry point of application
 * Can run with REPL, require this file and
 * start using storage
 */

import makeStore from './src/store';

/**
 * Initialize store with empty Map()
 * @type {[type]}
 */
export const store = makeStore();
