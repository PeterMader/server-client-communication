# Server Client Communication
This is a simple tool for a JavaScript client to communicate with a PHP server on a single page app.
The whole communication works with events. The client emits an event to the server. The server
processes the event and sends an event back.
Events are represented as strings. Along with the event string, you can pass some event arguments.
Event arguments are one-dimensional associative arrays (Arrays in PHP, Objects in JavaScript).

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

### Server side: the `ClientCommunicator` class
The `scc.php` file provides the `ClientCommunicator` class.
#### Constructor: `new ClientCommunicator()`

#### Instance methods
`$scc->getEvent()`

`$scc->emit($event, $eventArguments)`
* $event string
* $eventArguments array
