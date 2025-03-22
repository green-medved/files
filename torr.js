(function () {
  'use strict'

  function log() {
    console.log("Torr", ...arguments)
  }

  function fetchWithXHR(url, callback, errorCallback) {
    var xhr = new XMLHttpRequest()
    xhr.open('GET', url, true)
  
    xhr.onload = function() {
      if (xhr.status >= 200 && xhr.status < 300) {
        // Парсим ответ как JSON
        var data = JSON.parse(xhr.responseText)
        callback(data)
      } else {
        errorCallback(new Error('Ошибка: ' + xhr.statusText))
      }
    }
  
    xhr.onerror = function() {
      errorCallback(new Error('Ошибка сети'))
    }
  
    xhr.send()
  }
  
  fetchWithXHR(
    "http://localhost:8090",
    function(data) {
      log("Server is up")
    },
    function(error) {
      log("Error:", error)
      log("Server is down!")
      var request = webOS.service.request("luna://com.webos.applicationManager", {
        method: "launch",
        parameters: { id: "torrserv.matrix.app" },
        onSuccess: function (inResponse) {
          log("Server", "The app is launched")
          // To-Do something
        },
        onFailure: function (inError) {
          log("Server", "Failed to launch the app")
          log(
            "Server",
            "[" + inError.errorCode + "]: " + inError.errorText
          )
          // To-Do something
        },
      })
    }
  )
  
})()
