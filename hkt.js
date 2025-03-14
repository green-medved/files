(function () {
  'use strict'

  const logName = "Hotkeys"
  var isTest = false

  function log() {
    if (isTest) console.log.apply(console.log, [logName, ...arguments])
  }
  function loga() {
    console.log.apply(console.log, [logName, ...arguments])
  }

  function openPanel(element) {
    log("OpenPanel", element)
    if (parseFloat(Lampa.Manifest.app_version) >= "1.7") {
      log("app_version >= 1.7.0")
      Lampa.Utils.trigger(document.querySelector(element), "click")
    } else {
      log("old version")
      document.querySelector(element).click()
    }
  }

  function listenDestroy() {
    document.removeEventListener("keydown", listenHotkeys)
    Lampa.Player.listener.remove("destroy", listenDestroy)
  }

  function startHotkeys() {
    document.addEventListener("keydown", listenHotkeys)
    Lampa.Player.listener.follow("destroy", listenDestroy)
  }

  function listenHotkeys(e) {
    const keyCodesUp = [166, 427, 27, 33, 402]
    const keyCodesDown = [167, 428, 28, 34, 403]
    const keyCodes0 = [48, 96, 11]
    const keyCodes5 = [53, 101, 6]
    const keyCodes8 = [56, 104, 9]

    log(e.keyCode)

    //Channel Up
    if (keyCodesUp.includes(e.keyCode)) {
      log("Up pressed")
      openPanel(".player-panel__next.button.selector")
      return
    }

    //Channel Down
    if (keyCodesDown.includes(e.keyCode)) {
      log("Down pressed")
      openPanel(".player-panel__prev.button.selector")
      return
    }

    //0
    if (keyCodes0.includes(e.keyCode)) {
      log("0 pressed")
      if (!document.querySelector("body.selectbox--open")) {
        log("subs list not visible")
        openPanel(".player-panel__subs.button.selector")
      } else {
        history.back()
      }
      return
    }

    //5
    if (keyCodes5.includes(e.keyCode)) {
      log("5 pressed")
      if (!document.querySelector("body.selectbox--open")) {
        log("playlist not visible")
        openPanel(".player-panel__playlist.button.selector")
      } else {
        history.back()
      }
      return
    }

    //8
    if (keyCodes8.includes(e.keyCode)) {
      log("8 pressed")
      if (!document.querySelector("body.selectbox--open")) {
        log("audio list not visible")
        openPanel(".player-panel__tracks.button.selector")
      } else {
        history.back()
      }
      return
    }
  }
  
  function getTestMode() {
    var currentScript = document.currentScript
    var scriptUrl = new URL(currentScript.src)
    var param_t = scriptUrl.searchParams.get("t")
    return param_t !== null
  }

  isTest = getTestMode()
  Lampa.Platform.tv()
  Lampa.Player.listener.follow("ready", startHotkeys)
  
  loga("Hotkeys loaded")
  loga("TestMode:", isTest)

})()
