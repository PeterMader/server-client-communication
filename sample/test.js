const scc = new ServerCommunicator('test.php')

document.addEventListener('DOMContentLoaded', () => {
  let button = document.getElementById('btn'),
      button2 = document.getElementById('btn-2')
  let clickCounter = 0

  button.addEventListener('click', () => {
    clickCounter += 1
    scc.emit('btn-clicked', {
      count: clickCounter
    })
  })

  button2.addEventListener('click', () => {
    scc.emit('btn-2-clicked', null, 'POST')
  })

  scc.on('res', (response) => {
    console.log('The request took ' + response.getEventInfo().duration + ' milliseconds.')
    button.textContent = response.text
  })

  scc.on('error', (response) => {
    // Es ist ein Fehler aufgetreten.
  })

  scc.once('foo', (bar) => {
    // Das hier wird maximal einmal ausgeführt.
  })
})
