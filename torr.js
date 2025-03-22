(function () {
  'use strict'

  function log() {
    console.log("Torr", ...arguments)
  }

  fetch("http://localhost:8090", { method: "GET", })
    .then((response) => response)
    .then((data) => {
      log("Server is up")
    })
    .catch((error) => {
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
    })

})()
