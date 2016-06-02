/**
 * Entry point of application
 * Can run with REPL, require this file and
 * start using storage
 */

import makeStore from './src/store';
import startServer from './src/server';

/**
 * Initialize store with empty Map()
 * @type {[type]}
 */
export const store = makeStore()
/**
 * Starts server. and send as parameter store
 * for redux subscription
 */
startServer(store)
