// Test-only probe. Loaded synchronously BEFORE the Bryn snippet so the pixel captures the
// wrapped fetch/sendBeacon at init. Counts collect beacons and serve polls, logs each serve
// response (status + X-Bryn-Return-Leg), and tab visibility changes.
(function () {
  var state = { collect: 0, serve: 0, serveFailed: 0, lastServe: null, start: Date.now() };
  var log = [];

  function t() {
    return ((Date.now() - state.start) / 1000).toFixed(1) + "s";
  }
  function add(line, tone) {
    log.unshift({ line: "[" + t() + "] " + line, tone: tone || "" });
    render();
  }

  var rawFetch = window.fetch.bind(window);
  window.fetch = function (input, init) {
    var url = typeof input === "string" ? input : input && input.url;
    var isServe = typeof url === "string" && url.indexOf("/serve") !== -1;
    var isCollect = typeof url === "string" && url.indexOf("/pixel/") !== -1 && !isServe && !/\.js(\?|$)/.test(url);
    if (isCollect) {
      state.collect++;
      add("collect beacon (fetch) #" + state.collect, "ok");
    }
    if (!isServe) return rawFetch(input, init);
    state.serve++;
    state.lastServe = Date.now();
    var n = state.serve;
    return rawFetch(input, init).then(
      function (res) {
        var leg = res.headers.get("X-Bryn-Return-Leg");
        if (!res.ok) state.serveFailed++;
        add(
          "serve #" + n + " -> " + res.status + (leg ? "  X-Bryn-Return-Leg: " + leg : "  (no return-leg header)"),
          leg === "off" ? "warn" : res.ok ? "" : "bad",
        );
        return res;
      },
      function (err) {
        state.serveFailed++;
        add("serve #" + n + " -> FAILED (" + (err && err.message) + ")", "bad");
        throw err;
      },
    );
  };

  if (navigator.sendBeacon) {
    var rawBeacon = navigator.sendBeacon.bind(navigator);
    navigator.sendBeacon = function (url, data) {
      state.collect++;
      add("collect beacon (sendBeacon) #" + state.collect, "ok");
      return rawBeacon(url, data);
    };
  }

  document.addEventListener("visibilitychange", function () {
    add("tab " + document.visibilityState, "info");
  });

  function render() {
    var el = document.getElementById("probe");
    if (!el) return;
    var claim = window[Symbol.for("bryn.pixel.init")];
    var since = state.lastServe ? ((Date.now() - state.lastServe) / 1000).toFixed(0) + "s ago" : "-";
    var bryn = window.bryn ? window.bryn.status || "set" : "undefined";
    el.querySelector("#stats").textContent =
      "collect beacons: " + state.collect +
      "   |   serve polls: " + state.serve + " (failed " + state.serveFailed + ")" +
      "   |   last serve: " + since +
      "   |   window.bryn: " + bryn +
      "   |   pixel instances claimed: " + (claim instanceof Set ? claim.size + " [" + Array.from(claim).join(", ") + "]" : "none");
    el.querySelector("#log").innerHTML = log
      .map(function (e) {
        return '<div class="' + e.tone + '">' + e.line.replace(/</g, "&lt;") + "</div>";
      })
      .join("");
  }
  setInterval(render, 1000);
  window.addEventListener("DOMContentLoaded", render);
})();
