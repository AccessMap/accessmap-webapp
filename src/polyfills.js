// Adds Promise interface (required for fetch)
import "promise-polyfill/src/polyfill";

// Adds fetch
import "whatwg-fetch";

// Adds Object.values, etc. Auto-calls its shim method.
import "es7-shim/browser";

// Adds Intl if it doesn't exist (e.g. iOS 9 Safari). Needed for time / date pickers
if (!global.Intl) {
  // Note: Have to use require() for conditional import
  require("intl"); // eslint-disable-line global-require
  require("intl/locale-data/jsonp/en.js"); // eslint-disable-line global-require
}
