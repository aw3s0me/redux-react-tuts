import jsdom from 'jsdom';
import chai from 'chai';
import chaiImmutable from 'chai-immutable';

/**
 * Create jsdom versions of document and window objects
 * that would normally be provided by the webbrowser
 * @type {[type]}
 */
const doc = jsdom.jsdom('<!doctype html><html><body></body></html>')
const win = doc.defaultView

//put document and window objects on the global object
//so that they will discovered by React
global.document = doc
global.window = win

/**
 * Take all properties that the jsdom window object contains
 * and hoist them to global object
 * @param  {[type]} window).forEach((key [description]
 * @return {[type]}                      [description]
 */
Object.keys(window).forEach((key) => {
    if(!(key in global)) {
        global[key] = window[key]
    }
})

//enable chai to use chai-immutable library
chai.use(chaiImmutable)

