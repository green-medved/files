function log() {
  console.log.apply(console.log, arguments)
}

function openPanel(element) {
  if ("parseFloat(Lampa.Manifest.app_version)" >= "1.7") {
    log("Hotkeys", "1.7.0")
    var elem = document.querySelector(element)
    log("Hotkeys", "Element", elem)
    Lampa.Utils.trigger(elem, "click")
  } else {
    log("Hotkeys", "old version")
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
  log("Hotkeys", e.keyCode)

  //Channel Up
  var keyCodesUp = [166, 427, 27, 33, 402]
  if (keyCodesUp.includes(e.keyCode)) {
    openPanel(".player-panel__next.button.selector")
  }

  //Channel Down
  var keyCodesDown = [167, 428, 28, 34, 403]
  if (keyCodesDown.includes(e.keyCode)) {
    openPanel(".player-panel__prev.button.selector")
  }

  //0
  var keyCodes0 = [48, 96, 11]
  if (keyCodes0.includes(e.keyCode)) {
    log("Hotkeys", "0 pressed")
    if (!document.querySelector("body.selectbox--open")) {
      log('Hotkeys', 'subs list not visible')
      openPanel(".player-panel__subs.button.selector")
    } else {
      history.back()
    }
  }

  //5
  var keyCodes5 = [53, 101, 6]
  if (keyCodes5.includes(e.keyCode)) {
    log('Hotkeys', '5 pressed')
    if (!document.querySelector("body.selectbox--open")) {
      log('Hotkeys', 'playlist not visible')
      openPanel(".player-panel__playlist.button.selector")
    } else {
      history.back()
    }
  }

  //8
  var keyCodes8 = [56, 104, 9]
  if (keyCodes8.includes(e.keyCode)) {
    log('Hotkeys', '8 pressed')
    if (!document.querySelector("body.selectbox--open")) {
      log('Hotkeys', 'audio list not visible')
      openPanel(".player-panel__tracks.button.selector")
    } else {
      history.back()
    }
  }
}

Lampa.Platform.tv()
log("Hotkeys", "Hotkeys test loaded")
Lampa.Player.listener.follow("ready", startHotkeys)
