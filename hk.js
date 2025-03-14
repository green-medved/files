function log() {
  console.log.apply(console.log, arguments)
}

function openPanel(element) {
  if (parseFloat(Lampa.Manifest.app_version) >= "1.7") {
    Lampa.Utils.trigger(document.querySelector(element), "click")
  } else {
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

  //Channel Up
  if (keyCodesUp.includes(e.keyCode)) {
    openPanel(".player-panel__next.button.selector")
  }

  //Channel Down
  if (keyCodesDown.includes(e.keyCode)) {
    openPanel(".player-panel__prev.button.selector")
  }

  //0
  if (keyCodes0.includes(e.keyCode)) {
    if (!document.querySelector("body.selectbox--open")) {
      openPanel(".player-panel__subs.button.selector")
    } else {
      history.back()
    }
  }

  //5
  if (keyCodes5.includes(e.keyCode)) {
    if (!document.querySelector("body.selectbox--open")) {
      openPanel(".player-panel__playlist.button.selector")
    } else {
      history.back()
    }
  }

  //8
  if (keyCodes8.includes(e.keyCode)) {
    if (!document.querySelector("body.selectbox--open")) {
      openPanel(".player-panel__tracks.button.selector")
    } else {
      history.back()
    }
  }
}

Lampa.Platform.tv()
Lampa.Player.listener.follow("ready", startHotkeys)

log("Hotkeys", "Hotkeys loaded")
