# Server Client Communication
This is a simple tool for a JavaScript client to communicate with a PHP server on a single page app.
The whole communication works with events. The client emits an event to the server. The server
processes the event and sends an event back.
Events are represented as strings. Along with the event string, you can pass some event arguments.
Event arguments are one-dimensional associative arrays (Arrays in PHP, Objects in JavaScript).

The server can use the `getEvent` method to get information about the event sent to it.
It then emits a new event.
The client can listen to server events by setting event listeners to an event. The event arguments
sent by the server are passed to the listener function in a `response` object. The `response` object
has a `getEventInfo` method which returns an `eventInfo` object. The `eventInfo` object has this properties:
* `path` string The requested URL.
* `method` string The request method used in the request.
* `duration` number The duration of the request.

## API
### Client side: the `ServerCommunicator` class
The `scc.js` file provides the `ServerCommunicator` class.
#### Constructor: `new ServerCommunicator(serverUrl)`
* `serverUrl` string The URL of the main PHP file.

#### Instance methods
`scc.emit(event [, eventArguments [, method]])`
* `event` string
* `eventArguments` object
* `method` string

`scc.on(event, listener)`
* `event` string
* `listener` function

`scc.once(event, listener)`
* `event` string
* `listener` function

`scc.request(event, listener)`
* `event` string
* `listener` function

`scc.setDefaultMethod(method)`
* `method` string

### Server side: the `ClientCommunicator` class
The `scc.php` file provides the `ClientCommunicator` class.
#### Constructor: `new ClientCommunicator()`

#### Instance methods
`$scc->getEvent()`

`$scc->emit($event, $eventArguments)`
* `$event` string
* `$eventArguments` array
