(function () {
  'use strict'

  const keyCodesUp = [166, 427, 27, 33, 402]
  const keyCodesDown = [167, 428, 28, 34, 403]
  const keyCodes0 = [48, 96, 11]
  const keyCodes5 = [53, 101, 6]
  const keyCodes8 = [56, 104, 9]

  const logName = "Hotkeys"

  function log() {
    console.log.apply(console.log, [logName, ...arguments])
  }
  function logt() {
    if (isTestMode) log(...arguments)
  }

  function openPanel(element) {
    logt("openPanel:", element)
    Lampa.Utils.trigger(document.querySelector(element), "hover:enter")
  }

  function listenDestroy() {
    logt("listenDestroy")
    document.removeEventListener("keydown", listenHotkeys)
    Lampa.Player.listener.remove("destroy", listenDestroy)
  }

  function startHotkeys() {
    logt("startHotkeys")
    document.addEventListener("keydown", listenHotkeys)
    Lampa.Player.listener.follow("destroy", listenDestroy)
  }

  function listenHotkeys(e) {
    logt("listenHotkeys:", e.keyCode)

    //Channel Up
    if (keyCodesUp.includes(e.keyCode)) {
      logt("Up pressed")
      openPanel(".player-panel__next.button.selector")
      return
    }

    //Channel Down
    if (keyCodesDown.includes(e.keyCode)) {
      logt("Down pressed")
      openPanel(".player-panel__prev.button.selector")
      return
    }

    //0
    if (keyCodes0.includes(e.keyCode)) {
      logt("0 pressed")
      if (isSelectboxNotOpen()) {
        logt("subs list not visible")
        openPanel(".player-panel__subs.button.selector")
      } else {
        history.back()
      }
      return
    }

    //5
    if (keyCodes5.includes(e.keyCode)) {
      logt("5 pressed")
      if (isSelectboxNotOpen()) {
        logt("playlist not visible")
        openPanel(".player-panel__playlist.button.selector")
      } else {
        history.back()
      }
      return
    }

    //8
    if (keyCodes8.includes(e.keyCode)) {
      logt("8 pressed")
      if (isSelectboxNotOpen()) {
        logt("audio list not visible")
        openPanel(".player-panel__tracks.button.selector")
      } else {
        history.back()
      }
      return
    }
  }
  
  function isSelectboxNotOpen() {
    return !document.querySelector("body.selectbox--open")
  }

  function getTestMode() {
    const currentScript = document.currentScript
    const scriptUrl = new URL(currentScript.src)
    const param_t = scriptUrl.searchParams.get("t")
    return param_t !== null
  }

  const isTestMode = getTestMode()

  Lampa.Player.listener.follow("ready", startHotkeys)
  
  log("Hotkeys loaded")
  log("TestMode:", isTestMode)

})()
