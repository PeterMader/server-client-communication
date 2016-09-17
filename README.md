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
* `eventName` string The event sent from the server.
* `method` string The request method used in the request.
* `duration` number The duration of the request.

The supported request methods are `GET` and `POST`. If you specify another method, `GET` will be used.

## API
### Client side
#### The `ServerCommunicator` class
The `scc.js` file provides the `ServerCommunicator` class.
##### Constructor: `new ServerCommunicator(serverUrl)`
* `serverUrl` string The URL of the main PHP file.

##### Instance methods
`scc.emit(event [, eventArguments [, method]])`
Sends an event to the server.
* `event` string The name of the event.
* `eventArguments` object
* `method` string The request method. You can set the default method with `setDefaultMethod`.

`scc.on(event, listener)`
Adds a listener to the event.
* `event` string The name of the event.
* `listener` function

`scc.once(event, listener)`
Adds a one-time listener to the event.
* `event` string The name of the event.
* `listener` function

`scc.request(event, eventArguments, listener, method)`
This is a mixture of the `once` and the `emit` method. It sends an event to the
server and calls the listener function with the response. Event listeners on the
response event are *not* invoked.
* `event` string The name of the event.
* `eventArguments` object
* `listener` function
* `method` string The request method. You can set the default method with `setDefaultMethod`.

`scc.remove(event)`
Removes all listeners of the event.
* `event` string The name of the event.

`scc.setDefaultMethod([method])`
Sets the default request method.
* `method` string The method to use as default. If not specified, `GET` will be used.

### Server side
#### The `ClientCommunicator` class
The `scc.php` file provides the `ClientCommunicator` class.
##### Constructor: `new ClientCommunicator()`

##### Instance properties
`$scc->method` string The method of the event request.

##### Instance methods
`$scc->getEvent()`
Returns an instance of `ClientEvent`.

`$scc->emit($event, $eventArguments)`
Sends an event back to the client.
* `$event` string The name of the event.
* `$eventArguments` array

#### The `ClientEvent` class
The `scc.php` file provides the `ClientEvent` class.

##### Instance properties
`$event->name` string The name of the client event.

##### Instance methods
`$scc->getArgument($name)`
Returns the value of the event argument with the name, or NULL, if it doesn't exist.
* `$name` string The name of the argument.
