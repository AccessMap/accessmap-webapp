// Adds Promise interface (required for fetch)
import 'promise-polyfill/src/polyfill';

// Adds fetch
import 'whatwg-fetch';

// Adds Object.values, etc. Auto-calls its shim method.
import 'es7-shim/browser';
