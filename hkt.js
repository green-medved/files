(function () {
    'use strict';

    Lampa.Platform.tv();

    var keyCodesUp = [166, 427, 27, 33, 402];
    var keyCodesDown = [167, 428, 28, 34, 403];
    var keyCodes0 = [48, 96, 11];
    var keyCodes5 = [53, 101, 6];
    var keyCodes8 = [56, 104, 9];

    var logName = "Hotkeys";

    function log() {
        var args = Array.prototype.slice.call(arguments);
        console.log.apply(console, [logName].concat(args));
    }

    function logt() {
        if (isTestMode) {
            var args = Array.prototype.slice.call(arguments);
            log.apply(null, args);
        }
    }

    function openPanel(element) {
        logt("openPanel:", element);
        Lampa.Utils.trigger(document.querySelector(element), "hover:enter");
    }

    function listenDestroy() {
        logt("listenDestroy");
        document.removeEventListener("keydown", listenHotkeys);
        Lampa.Player.listener.remove("destroy", listenDestroy);
    }

    function startHotkeys() {
        logt("startHotkeys");
        document.addEventListener("keydown", listenHotkeys);
        Lampa.Player.listener.follow("destroy", listenDestroy);
    }

    function listenHotkeys(e) {
        logt("listenHotkeys:", e.keyCode);

        //Channel Up
        if (arrayIncludes(keyCodesUp, e.keyCode)) {
            logt("Up pressed");
            openPanel(".player-panel__next.button.selector");
            return;
        }

        //Channel Down
        if (arrayIncludes(keyCodesDown, e.keyCode)) {
            logt("Down pressed");
            openPanel(".player-panel__prev.button.selector");
            return;
        }

        //0
        if (arrayIncludes(keyCodes0, e.keyCode)) {
            logt("0 pressed");
            if (isSelectboxNotOpen()) {
                logt("subs list not visible");
                openPanel(".player-panel__subs.button.selector");
            } else {
                history.back();
            }
            return;
        }

        //5
        if (arrayIncludes(keyCodes5, e.keyCode)) {
            logt("5 pressed");
            if (isSelectboxNotOpen()) {
                logt("playlist not visible");
                openPanel(".player-panel__playlist.button.selector");
            } else {
                history.back();
            }
            return;
        }

        //8
        if (arrayIncludes(keyCodes8, e.keyCode)) {
            logt("8 pressed");
            if (isSelectboxNotOpen()) {
                logt("audio list not visible");
                openPanel(".player-panel__tracks.button.selector");
            } else {
                history.back();
            }
            return;
        }
    }

    function arrayIncludes(array, value) {
        for (var i = 0; i < array.length; i++) {
            if (array[i] === value) return true;
        }
        return false;
    }

    function isSelectboxNotOpen() {
        return !document.querySelector("body.selectbox--open");
    }

    function getTestMode() {
        try {
            var scripts = document.getElementsByTagName('script');
            var currentScript = scripts[scripts.length - 1];
            var src = currentScript.src;
            
            // Простая проверка - есть ли '?t' или '&t' в любом месте
            return src.indexOf('?t') !== -1 || src.indexOf('&t') !== -1;
        } catch (error) {
            return false;
        }
    }
  
    var isTestMode = getTestMode();

    Lampa.Player.listener.follow("ready", startHotkeys);

    log("Hotkeys loaded");
    log("TestMode:", isTestMode);
})();
