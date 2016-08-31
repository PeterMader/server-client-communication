<?php

class ClientCommunicator {

  protected $jsonLength = 0;
  protected $event;
  public $method = 'GET';

  public function ClientCommunicator () {
    header('Content-Type: application/json');
    ob_start();
    $this->fetchRequestParams();
  }

  public function __destruct () {
    ob_flush();
  }

  protected function fetchRequestParams () {
    $getData = $_GET;
    $postData = $_POST;
    if (!array_key_exists('_evt', $getData) || !array_key_exists('_method', $getData)) {
      // Invalid GET data.
      throw new Error('Invalid request parameters.');
      return;
    }

    $eventName = $getData['_evt'];
    $eventMethod = $getData['_method'];

    if ($eventMethod === 'GET') {
      $params = $getData;
    } elseif ($eventMethod === 'POST') {
      $params = $postData;
    } else {
      // Invalid method.
      throw new Error('Invalid request method.');
      return;
    }

    $arguments = array();

    foreach ($params as $index => $value) {
      if ($index === '_evt' || $index === '_method') {
        continue;
      }
      $arguments[$index] = $value;
    }

    $this->method = $eventMethod;
    $this->event = new ClientEvent($eventName, $arguments);
  }

  public function getEvent () {
    return $this->event;
  }

  public function emit ($evt, array $eventArguments) {
    $dataToSend = array(
      '_evt' => $evt,
    );

    // Check if the already was output
    if ($this->jsonLength > 0 || ob_get_length() > 0) {
      $dataToSend['error'] = 'You must not output strings.';
    } else {
      $dataToSend = array_merge($eventArguments, $dataToSend);
    }

    $json = json_encode($dataToSend);

    $this->jsonLength = strlen($json);

    echo $json;

  }

}

class ClientEvent {

  public $name;
  public $arguments;

  public function ClientEvent ($name, $arguments) {
    $this->name = $name;
    $this->arguments = $arguments;
  }

  public function getArgument ($name) {
    if (array_key_exists($name, $this->arguments)) {
      return $this->arguments[$name];
    }
    return null;
  }

}
