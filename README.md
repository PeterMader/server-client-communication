# Server Client Communication
This is a simple tool for a JS client to communicate with a PHP server on a single page app.

## API
### Client side: the `ServerCommunicator` class
The `scc.js` file provides the `ServerCommunicator` class.
#### Constructor: `new ServerCommunicator(serverUrl)`
* `serverUrl` string The URL of the main PHP file.

#### Instance methods
`scc.emit(event [, eventArguments [, method]])`
* event string
* eventArguments object
* method string

`scc.on(event, listener)`
* event string
* listener function

`scc.once(event, listener)`
* event string
* listener function

`scc.request(event, listener)`
* event string
* listener function

`scc.setDefaultMethod(method)`
* method string
