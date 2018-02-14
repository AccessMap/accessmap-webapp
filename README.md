# accessmap-webapp

## Installation

## Configuration

Set the environment variables found in `set_envs.sample`.

#### Important: if running the development server, prefix all `SERVER`
variables with http://. The proxy won't work otherwise and all the servers will
break

- Important debug note: due to limitation set by Chrome (which doesn't
allow cookies to be set by localhost), the login feature might not work
properly in Chrome. Therefore, please test with other browsers (e.g.
Safari) or put the site on a standard domain to test.