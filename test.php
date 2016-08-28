<?php

include_once 'scc.php';

$scc = new ClientCommunicator();

$requestEvent = $scc->getEvent();

if ($requestEvent->name === 'btn-clicked') {
  $clickCount = $requestEvent->getArgument('count');
  $scc->emit('res', array(
    'text' => 'Du hast den Button ' . $clickCount . ' mal geklickt!'
  ));
} else {
  $scc->emit('error', array(
    'message' => 'Das Event ' . $requestEvent->name . ' kenne ich nicht.'
  ));
}
