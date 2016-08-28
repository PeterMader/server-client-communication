const ServerCommunicator = (() => {
  let requestCount = 0
  const methods = ['GET', 'POST']

  let serverRequest = ({serverPath, event, params, callback, method}) => {
    if (requestCount > 10) {
      console.log('There can be only 10 event emissions at the same time!')
      return
    }

    // stringify the parameters
    let paramString = ''
    for (let index in params) {
      paramString += '&' + index + '=' + params[index]
    }

    let startTime = new Date().getTime()

    let xhr = new XMLHttpRequest()
    let useMethod = method.toUpperCase()
    useMethod = useMethod && methods.indexOf(useMethod) > -1 ? useMethod : defaultMethod
    let fullPath = serverPath + '?_evt=' + event + '&_method=' + useMethod

    if (useMethod === 'POST') {
      xhr.open(useMethod, fullPath, true)
      xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded')
      xhr.send(paramString)
    } else {
      fullPath += paramString
      xhr.open(useMethod, fullPath, true)
      xhr.send(null)
    }

    requestCount += 1

    xhr.onreadystatechange = () => {
      if (xhr.readyState === 4 && xhr.status === 200) {
        requestCount -= 1

        let response
        try {
          response = JSON.parse(xhr.responseText)
        } catch (e) {
          console.error(e)
          return
        }

        if (!response._evt) {
          console.log('Invalid JSON response!')
          return
        }

        let endTime = new Date().getTime()

        let difference = endTime - startTime

        response.getEventInfo = () => {
          return {
            path: xhr.responseUrl,
            method: useMethod,
            duration: difference
          }
        }

        callback(response)

      }
    }

  }

  let ServerCommunicator = function (serverPath) {

    let events = {}
    let defaultMethod = 'GET'

    this.setDefaultMethod = (method) => {
      let useMethod = method.toUpperCase()
      defaultMethod = methods.indexOf(useMethod) > -1 ? useMethod : 'GET'
    }

    this.on = (event, callback) => {
      if (events.hasOwnProperty(event)) {
        events[event].push(callback)
      } else {
        events[event] = [callback]
      }
    }

    this.once = (event, callback) => {
      if (events.hasOwnProperty(event)) {
        let index = events[event].length
        events[event].push((eventArguments) => {
          delete events[event][index]
          callback.call(null, eventArguments)
        })
      } else {
        events[event] = [(eventArguments) => {
          delete events[event][0]
          callback.call(null, eventArguments)
        }]
      }
    }

    this.emit = (event, eventArguments, method) => {
      serverRequest({
        serverPath,
        event,
        params: eventArguments,
        callback: (response) => {
          if (events.hasOwnProperty(response._evt)) {
            events[response._evt].forEach((callback) => {
              callback(response)
            })
          }
        },
        method: method || defaultMethod
      })
    }

    this.request = (event, eventArguments, callback, method) => {
      serverRequest({
        serverPath,
        event,
        params: eventArguments,
        callback: typeof callback === 'function' ? callback : () => {},
        method: method || defaultMethod
      })
    }

  }

  return ServerCommunicator

})()
