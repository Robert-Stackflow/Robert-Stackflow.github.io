!function(e, t) {
  "object" == typeof exports && "object" == typeof module ? module.exports = t() : "function" == typeof define && define.amd ? define("APlayer", [], t) : "object" == typeof exports ? exports.APlayer = t() : e.APlayer = t()
}(window, function() {
  return function(e) {
      var t = {};
      function n(i) {
          if (t[i])
              return t[i].exports;
          var a = t[i] = {
              i: i,
              l: !1,
              exports: {}
          };
          return e[i].call(a.exports, a, a.exports, n),
          a.l = !0,
          a.exports
      }
      return n.m = e,
      n.c = t,
      n.d = function(e, t, i) {
          n.o(e, t) || Object.defineProperty(e, t, {
              configurable: !1,
              enumerable: !0,
              get: i
          })
      }
      ,
      n.r = function(e) {
          Object.defineProperty(e, "__esModule", {
              value: !0
          })
      }
      ,
      n.n = function(e) {
          var t = e && e.__esModule ? function() {
              return e.default
          }
          : function() {
              return e
          }
          ;
          return n.d(t, "a", t),
          t
      }
      ,
      n.o = function(e, t) {
          return Object.prototype.hasOwnProperty.call(e, t)
      }
      ,
      n.p = "/",
      n(n.s = 40)
  }([function(e, t, n) {
      "use strict";
      Object.defineProperty(t, "__esModule", {
          value: !0
      });
      var i = /mobile/i.test(window.navigator.userAgent)
        , a = {
          secondToTime: function(e) {
              var t = Math.floor(e / 3600)
                , n = Math.floor((e - 3600 * t) / 60)
                , i = Math.floor(e - 3600 * t - 60 * n);
              return (t > 0 ? [t, n, i] : [n, i]).map(function(e) {
                  return e < 10 ? "0" + e : "" + e
              }).join(":")
          },
          getElementViewLeft: function(e) {
              var t = e.offsetLeft
                , n = e.offsetParent
                , i = document.body.scrollLeft + document.documentElement.scrollLeft;
              if (document.fullscreenElement || document.mozFullScreenElement || document.webkitFullscreenElement)
                  for (; null !== n && n !== e; )
                      t += n.offsetLeft,
                      n = n.offsetParent;
              else
                  for (; null !== n; )
                      t += n.offsetLeft,
                      n = n.offsetParent;
              return t - i
          },
          getElementViewTop: function(e, t) {
              for (var n, i = e.offsetTop, a = e.offsetParent; null !== a; )
                  i += a.offsetTop,
                  a = a.offsetParent;
              return n = document.body.scrollTop + document.documentElement.scrollTop,
              t ? i : i - n
          },
          isMobile: i,
          storage: {
              set: function(e, t) {
                  localStorage.setItem(e, t)
              },
              get: function(e) {
                  return localStorage.getItem(e)
              }
          },
          nameMap: {
              dragStart: i ? "touchstart" : "mousedown",
              dragMove: i ? "touchmove" : "mousemove",
              dragEnd: i ? "touchend" : "mouseup"
          },
          randomOrder: function(e) {
              return function(e) {
                  for (var t = e.length - 1; t >= 0; t--) {
                      var n = Math.floor(Math.random() * (t + 1))
                        , i = e[n];
                      e[n] = e[t],
                      e[t] = i
                  }
                  return e
              }([].concat(function(e) {
                  if (Array.isArray(e)) {
                      for (var t = 0, n = Array(e.length); t < e.length; t++)
                          n[t] = e[t];
                      return n
                  }
                  return Array.from(e)
              }(Array(e))).map(function(e, t) {
                  return t
              }))
          }
      };
      t.default = a
  }
  , function(e, t, n) {
      "use strict";
      e.exports = n(15)
  }
  , function(e, t, n) {
      "use strict";
      Object.defineProperty(t, "__esModule", {
          value: !0
      });
      var i = v(n(32))
        , a = v(n(31))
        , r = v(n(30))
        , o = v(n(29))
        , s = v(n(28))
        , l = v(n(27))
        , u = v(n(26))
        , c = v(n(25))
        , d = v(n(24))
        , p = v(n(23))
        , h = v(n(22))
        , f = v(n(21))
        , y = v(n(20))
        , m = v(n(19));
      function v(e) {
          return e && e.__esModule ? e : {
              default: e
          }
      }
      var g = {
          play: i.default,
          pause: a.default,
          volume: r.default,
          volumeOff: o.default,
          orderRandom: s.default,
          orderList: l.default,
          menu: u.default,
          loopAll: c.default,
          loopOne: d.default,
          loopNone: p.default,
          loading: h.default,
          right: f.default,
          skip: y.default,
          lrc: m.default
      };
      t.default = g
  }
  , function(e, t, n) {
      "use strict";
      var i, a = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function(e) {
          return typeof e
      }
      : function(e) {
          return e && "function" == typeof Symbol && e.constructor === Symbol && e !== Symbol.prototype ? "symbol" : typeof e
      }
      ;
      i = function() {
          return this
      }();
      try {
          i = i || Function("return this")() || (0,
          eval)("this")
      } catch (e) {
          "object" === ("undefined" == typeof window ? "undefined" : a(window)) && (i = window)
      }
      e.exports = i
  }
  , function(e, t, n) {
      var i = n(1);
      e.exports = function(e) {
          "use strict";
          e = e || {};
          var t = ""
            , n = i.$each
            , a = e.audio
            , r = (e.$value,
          e.$index,
          i.$escape)
            , o = e.index;
          return n(a, function(e, n) {
              t += '\n<li>\n    <span class="aplayer-list-index">',
              t += r(n + o),
              t += '</span>\n    <span class="aplayer-list-title">',
              t += r(e.name),
              t += '</span>\n    <span class="aplayer-list-author">',
              t += r(e.artist),
              t += "</span>\n</li>\n"
          }),
          t
      }
  }
  , function(e, t, n) {
      "use strict";
      var i, a, r = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function(e) {
          return typeof e
      }
      : function(e) {
          return e && "function" == typeof Symbol && e.constructor === Symbol && e !== Symbol.prototype ? "symbol" : typeof e
      }
      ;
      void 0 === (a = "function" == typeof (i = function() {
          if ("object" === ("undefined" == typeof window ? "undefined" : r(window)) && void 0 !== document.querySelectorAll && void 0 !== window.pageYOffset && void 0 !== history.pushState) {
              var e = function(e, t, n, i) {
                  return n > i ? t : e + (t - e) * ((a = n / i) < .5 ? 4 * a * a * a : (a - 1) * (2 * a - 2) * (2 * a - 2) + 1);
                  var a
              }
                , t = function(t, n, i, a) {
                  n = n || 500;
                  var r = (a = a || window).scrollTop || window.pageYOffset;
                  if ("number" == typeof t)
                      var o = parseInt(t);
                  else
                      var o = function(e, t) {
                          return "HTML" === e.nodeName ? -t : e.getBoundingClientRect().top + t
                      }(t, r);
                  var s = Date.now()
                    , l = window.requestAnimationFrame || window.mozRequestAnimationFrame || window.webkitRequestAnimationFrame || function(e) {
                      window.setTimeout(e, 15)
                  }
                  ;
                  !function u() {
                      var c = Date.now() - s;
                      a !== window ? a.scrollTop = e(r, o, c, n) : window.scroll(0, e(r, o, c, n)),
                      c > n ? "function" == typeof i && i(t) : l(u)
                  }()
              }
                , n = function(e) {
                  if (!e.defaultPrevented) {
                      e.preventDefault(),
                      location.hash !== this.hash && window.history.pushState(null, null, this.hash);
                      var n = document.getElementById(this.hash.substring(1));
                      if (!n)
                          return;
                      t(n, 500, function(e) {
                          location.replace("#" + e.id)
                      })
                  }
              };
              return document.addEventListener("DOMContentLoaded", function() {
                  for (var e, t = document.querySelectorAll('a[href^="#"]:not([href="#"])'), i = t.length; e = t[--i]; )
                      e.addEventListener("click", n, !1)
              }),
              t
          }
      }
      ) ? i.call(t, n, t, e) : i) || (e.exports = a)
  }
  , function(e, t, n) {
      "use strict";
      Object.defineProperty(t, "__esModule", {
          value: !0
      });
      var i = function() {
          function e(e, t) {
              for (var n = 0; n < t.length; n++) {
                  var i = t[n];
                  i.enumerable = i.enumerable || !1,
                  i.configurable = !0,
                  "value"in i && (i.writable = !0),
                  Object.defineProperty(e, i.key, i)
              }
          }
          return function(t, n, i) {
              return n && e(t.prototype, n),
              i && e(t, i),
              t
          }
      }()
        , a = s(n(4))
        , r = s(n(0))
        , o = s(n(5));
      function s(e) {
          return e && e.__esModule ? e : {
              default: e
          }
      }
      var l = function() {
          function e(t) {
              !function(e, t) {
                  if (!(e instanceof t))
                      throw new TypeError("Cannot call a class as a function")
              }(this, e),
              this.player = t,
              this.index = 0,
              this.audios = this.player.options.audio,
              this.bindEvents()
          }
          return i(e, [{
              key: "bindEvents",
              value: function() {
                  var e = this;
                  this.player.template.list.addEventListener("click", function(t) {
                      var n = void 0;
                      n = "LI" === t.target.tagName.toUpperCase() ? t.target : t.target.parentElement;
                      var i = parseInt(n.getElementsByClassName("aplayer-list-index")[0].innerHTML) - 1;
                      i !== e.index ? (e.switch(i),
                      e.player.play()) : e.player.toggle()
                  })
              }
          }, {
              key: "show",
              value: function() {
                  this.player.events.trigger("listshow"),
                  this.player.template.list.classList.remove("aplayer-list-hide"),
                  this.player.template.listOl.scrollTop = 33 * this.index
              }
          }, {
              key: "hide",
              value: function() {
                  this.player.events.trigger("listhide"),
                  this.player.template.list.classList.add("aplayer-list-hide")
              }
          }, {
              key: "toggle",
              value: function() {
                  this.player.template.list.classList.contains("aplayer-list-hide") ? this.show() : this.hide()
              }
          }, {
              key: "add",
              value: function(e) {
                  this.player.events.trigger("listadd", {
                      audios: e
                  }),
                  "[object Array]" !== Object.prototype.toString.call(e) && (e = [e]),
                  e.map(function(e) {
                      return e.name = e.name || e.title || "Audio name",
                      e.artist = e.artist || e.author || "Audio artist",
                      e.cover = e.cover || e.pic,
                      e.type = e.type || "normal",
                      e
                  });
                  var t = !(this.audios.length > 1)
                    , n = 0 === this.audios.length;
                  this.player.template.listOl.innerHTML += (0,
                  a.default)({
                      theme: this.player.options.theme,
                      audio: e,
                      index: this.audios.length + 1
                  }),
                  this.audios = this.audios.concat(e),
                  t && this.audios.length > 1 && this.player.container.classList.add("aplayer-withlist"),
                  this.player.randomOrder = r.default.randomOrder(this.audios.length),
                  n && ("random" === this.player.options.order ? this.switch(this.player.randomOrder[0]) : this.switch(0))
              }
          }, {
              key: "remove",
              value: function(e) {
                  if (this.player.events.trigger("listremove", {
                      index: e
                  }),
                  this.audios[e])
                      if (this.audios.length > 1) {
                          var t = this.player.container.querySelectorAll(".aplayer-list li");
                          t[e].remove(),
                          this.audios.splice(e, 1),
                          this.player.lrc && this.player.lrc.remove(e),
                          e === this.index && (this.audios[e] ? this.switch(e) : this.switch(e - 1)),
                          this.index > e && this.index--;
                          for (var n = e; n < t.length; n++)
                              t[n].getElementsByClassName("aplayer-list-index")[0].textContent = n;
                          1 === this.audios.length && this.player.container.classList.remove("aplayer-withlist")
                      } else
                          this.clear()
              }
          }, {
              key: "switch",
              value: function(e) {
                  if (this.player.events.trigger("listswitch", {
                      index: e
                  }),
                  void 0 !== e && this.audios[e]) {
                      this.index = e;
                      var t = this.audios[this.index];
                      this.player.template.pic.style.backgroundImage = t.cover ? "url('" + t.cover + "')" : "",
                      this.player.theme(this.audios[this.index].theme || this.player.options.theme, this.index, !1),
                      this.player.template.title.innerHTML = t.name,
                      this.player.template.author.innerHTML = t.artist ? " - " + t.artist : "";
                      var n = this.player.container.getElementsByClassName("aplayer-list-light")[0];
                      n && n.classList.remove("aplayer-list-light"),
                      this.player.container.querySelectorAll(".aplayer-list li")[this.index].classList.add("aplayer-list-light"),
                      (0,
                      o.default)(33 * this.index, 500, null, this.player.template.listOl),
                      this.player.setAudio(t),
                      this.player.lrc && this.player.lrc.switch(this.index),
                      this.player.lrc && this.player.lrc.update(0),
                      1 !== this.player.duration && (this.player.template.dtime.innerHTML = r.default.secondToTime(this.player.duration))
                  }
              }
          }, {
              key: "clear",
              value: function() {
                  this.player.events.trigger("listclear"),
                  this.index = 0,
                  this.player.container.classList.remove("aplayer-withlist"),
                  this.player.pause(),
                  this.audios = [],
                  this.player.lrc && this.player.lrc.clear(),
                  this.player.audio.src = "",
                  this.player.template.listOl.innerHTML = "",
                  this.player.template.pic.style.backgroundImage = "",
                  this.player.theme(this.player.options.theme, this.index, !1),
                  this.player.template.title.innerHTML = "No audio",
                  this.player.template.author.innerHTML = "",
                  this.player.bar.set("loaded", 0, "width"),
                  this.player.template.dtime.innerHTML = r.default.secondToTime(0)
              }
          }]),
          e
      }();
      t.default = l
  }
  , function(e, t, n) {
      "use strict";
      Object.defineProperty(t, "__esModule", {
          value: !0
      });
      var i = function() {
          function e(e, t) {
              for (var n = 0; n < t.length; n++) {
                  var i = t[n];
                  i.enumerable = i.enumerable || !1,
                  i.configurable = !0,
                  "value"in i && (i.writable = !0),
                  Object.defineProperty(e, i.key, i)
              }
          }
          return function(t, n, i) {
              return n && e(t.prototype, n),
              i && e(t, i),
              t
          }
      }();
      var a = function() {
          function e() {
              !function(e, t) {
                  if (!(e instanceof t))
                      throw new TypeError("Cannot call a class as a function")
              }(this, e),
              this.events = {},
              this.audioEvents = ["abort", "canplay", "canplaythrough", "durationchange", "emptied", "ended", "error", "loadeddata", "loadedmetadata", "loadstart", "mozaudioavailable", "pause", "play", "playing", "progress", "ratechange", "seeked", "seeking", "stalled", "suspend", "timeupdate", "volumechange", "waiting"],
              this.playerEvents = ["destroy", "listshow", "listhide", "listadd", "listremove", "listswitch", "listclear", "noticeshow", "noticehide", "lrcshow", "lrchide"]
          }
          return i(e, [{
              key: "on",
              value: function(e, t) {
                  this.type(e) && "function" == typeof t && (this.events[e] || (this.events[e] = []),
                  this.events[e].push(t))
              }
          }, {
              key: "trigger",
              value: function(e, t) {
                  if (this.events[e] && this.events[e].length)
                      for (var n = 0; n < this.events[e].length; n++)
                          this.events[e][n](t)
              }
          }, {
              key: "type",
              value: function(e) {
                  return -1 !== this.playerEvents.indexOf(e) ? "player" : -1 !== this.audioEvents.indexOf(e) ? "audio" : (console.error("Unknown event name: " + e),
                  null)
              }
          }]),
          e
      }();
      t.default = a
  }
  , function(e, t, n) {
      "use strict";
      Object.defineProperty(t, "__esModule", {
          value: !0
      });
      var i = function() {
          function e(e, t) {
              for (var n = 0; n < t.length; n++) {
                  var i = t[n];
                  i.enumerable = i.enumerable || !1,
                  i.configurable = !0,
                  "value"in i && (i.writable = !0),
                  Object.defineProperty(e, i.key, i)
              }
          }
          return function(t, n, i) {
              return n && e(t.prototype, n),
              i && e(t, i),
              t
          }
      }();
      var a = function() {
          function e(t) {
              !function(e, t) {
                  if (!(e instanceof t))
                      throw new TypeError("Cannot call a class as a function")
              }(this, e),
              this.player = t,
              window.requestAnimationFrame = window.requestAnimationFrame || window.webkitRequestAnimationFrame || window.mozRequestAnimationFrame || window.oRequestAnimationFrame || window.msRequestAnimationFrame || function(e) {
                  window.setTimeout(e, 1e3 / 60)
              }
              ,
              this.types = ["loading"],
              this.init()
          }
          return i(e, [{
              key: "init",
              value: function() {
                  var e = this;
                  this.types.forEach(function(t) {
                      e["init" + t + "Checker"]()
                  })
              }
          }, {
              key: "initloadingChecker",
              value: function() {
                  var e = this
                    , t = 0
                    , n = 0
                    , i = !1;
                  this.loadingChecker = setInterval(function() {
                      e.enableloadingChecker && (n = e.player.audio.currentTime,
                      i || n !== t || e.player.audio.paused || (e.player.container.classList.add("aplayer-loading"),
                      i = !0),
                      i && n > t && !e.player.audio.paused && (e.player.container.classList.remove("aplayer-loading"),
                      i = !1),
                      t = n)
                  }, 100)
              }
          }, {
              key: "enable",
              value: function(e) {
                  this["enable" + e + "Checker"] = !0,
                  "fps" === e && this.initfpsChecker()
              }
          }, {
              key: "disable",
              value: function(e) {
                  this["enable" + e + "Checker"] = !1
              }
          }, {
              key: "destroy",
              value: function() {
                  var e = this;
                  this.types.forEach(function(t) {
                      e["enable" + t + "Checker"] = !1,
                      e[t + "Checker"] && clearInterval(e[t + "Checker"])
                  })
              }
          }]),
          e
      }();
      t.default = a
  }
  , function(e, t, n) {
      "use strict";
      Object.defineProperty(t, "__esModule", {
          value: !0
      });
      var i = function() {
          function e(e, t) {
              for (var n = 0; n < t.length; n++) {
                  var i = t[n];
                  i.enumerable = i.enumerable || !1,
                  i.configurable = !0,
                  "value"in i && (i.writable = !0),
                  Object.defineProperty(e, i.key, i)
              }
          }
          return function(t, n, i) {
              return n && e(t.prototype, n),
              i && e(t, i),
              t
          }
      }()
        , a = o(n(0))
        , r = o(n(2));
      function o(e) {
          return e && e.__esModule ? e : {
              default: e
          }
      }
      var s = function() {
          function e(t) {
              !function(e, t) {
                  if (!(e instanceof t))
                      throw new TypeError("Cannot call a class as a function")
              }(this, e),
              this.player = t,
              this.initPlayButton(),
              this.initPlayBar(),
              this.initOrderButton(),
              this.initLoopButton(),
              this.initMenuButton(),
              a.default.isMobile || this.initVolumeButton(),
              this.initSkipButton(),
              this.initLrcButton()
          }
          return i(e, [{
              key: "initPlayButton",
              value: function() {
                  var e = this;
                  this.player.template.pic.addEventListener("click", function() {
                      e.player.toggle()
                  })
              }
          }, {
              key: "initPlayBar",
              value: function() {
                  var e = this
                    , t = function(t) {
                      var n = ((t.clientX || t.changedTouches[0].clientX) - a.default.getElementViewLeft(e.player.template.barWrap)) / e.player.template.barWrap.clientWidth;
                      n = Math.max(n, 0),
                      n = Math.min(n, 1),
                      e.player.bar.set("played", n, "width"),
                      e.player.lrc && e.player.lrc.update(n * e.player.duration),
                      e.player.template.ptime.innerHTML = a.default.secondToTime(n * e.player.duration)
                  }
                    , n = function n(i) {
                      document.removeEventListener(a.default.nameMap.dragEnd, n),
                      document.removeEventListener(a.default.nameMap.dragMove, t);
                      var r = ((i.clientX || i.changedTouches[0].clientX) - a.default.getElementViewLeft(e.player.template.barWrap)) / e.player.template.barWrap.clientWidth;
                      r = Math.max(r, 0),
                      r = Math.min(r, 1),
                      e.player.bar.set("played", r, "width"),
                      e.player.seek(e.player.bar.get("played", "width") * e.player.duration),
                      e.player.disableTimeupdate = !1
                  };
                  this.player.template.barWrap.addEventListener(a.default.nameMap.dragStart, function() {
                      e.player.disableTimeupdate = !0,
                      document.addEventListener(a.default.nameMap.dragMove, t),
                      document.addEventListener(a.default.nameMap.dragEnd, n)
                  })
              }
          }, {
              key: "initVolumeButton",
              value: function() {
                  var e = this;
                  this.player.template.volumeButton.addEventListener("click", function() {
                      e.player.audio.muted ? (e.player.audio.muted = !1,
                      e.player.switchVolumeIcon(),
                      e.player.bar.set("volume", e.player.volume(), "width")) : (e.player.audio.muted = !0,
                      e.player.switchVolumeIcon(),
                      e.player.bar.set("volume", 0, "width"))
                  });
                  var t = function(t) {
                      var n = ((t.clientX || t.changedTouches[0].clientX) - a.default.getElementViewLeft(e.player.template.volumeBar, e.player.options.fixed)) / e.player.template.volumeBar.clientWidth;
                      n = Math.max(n, 0),
                      n = Math.min(n, 1),
                      e.player.volume(n)
                  }
                    , n = function n(i) {
                      document.removeEventListener(a.default.nameMap.dragEnd, n),
                      document.removeEventListener(a.default.nameMap.dragMove, t);
                      var r = ((i.clientX || i.changedTouches[0].clientX) - a.default.getElementViewLeft(e.player.template.volumeBar, e.player.options.fixed)) / e.player.template.volumeBar.clientWidth;
                      r = Math.max(r, 0),
                      r = Math.min(r, 1),
                      e.player.volume(r)
                  };
                  this.player.template.volumeBarWrap.addEventListener(a.default.nameMap.dragStart, function() {
                      document.addEventListener(a.default.nameMap.dragMove, t),
                      document.addEventListener(a.default.nameMap.dragEnd, n)
                  })
              }
          }, {
              key: "initOrderButton",
              value: function() {
                  var e = this;
                  this.player.template.order.addEventListener("click", function() {
                      "list" === e.player.options.order ? (e.player.options.order = "random",
                      e.player.template.order.innerHTML = r.default.orderRandom) : "random" === e.player.options.order && (e.player.options.order = "list",
                      e.player.template.order.innerHTML = r.default.orderList)
                  })
              }
          }, {
              key: "initLoopButton",
              value: function() {
                  var e = this;
                  this.player.template.loop.addEventListener("click", function() {
                      e.player.list.audios.length > 1 ? "one" === e.player.options.loop ? (e.player.options.loop = "none",
                      e.player.template.loop.innerHTML = r.default.loopNone) : "none" === e.player.options.loop ? (e.player.options.loop = "all",
                      e.player.template.loop.innerHTML = r.default.loopAll) : "all" === e.player.options.loop && (e.player.options.loop = "one",
                      e.player.template.loop.innerHTML = r.default.loopOne) : "one" === e.player.options.loop || "all" === e.player.options.loop ? (e.player.options.loop = "none",
                      e.player.template.loop.innerHTML = r.default.loopNone) : "none" === e.player.options.loop && (e.player.options.loop = "all",
                      e.player.template.loop.innerHTML = r.default.loopAll)
                  })
              }
          }, {
              key: "initMenuButton",
              value: function() {
                  var e = this;
                  this.player.template.menu.addEventListener("click", function() {
                      e.player.list.toggle()
                  })
              }
          }, {
              key: "initSkipButton",
              value: function() {
                  var e = this;
                  this.player.template.skipBackButton.addEventListener("click", function() {
                      e.player.skipBack()
                  }),
                  this.player.template.skipForwardButton.addEventListener("click", function() {
                      e.player.skipForward()
                  }),
                  this.player.template.skipPlayButton.addEventListener("click", function() {
                      e.player.toggle()
                  })
              }
          }, {
              key: "initLrcButton",
              value: function() {
                  var e = this;
                  this.player.template.lrcButton.addEventListener("click", function() {
                      e.player.template.lrcButton.classList.contains("aplayer-icon-lrc-inactivity") ? (e.player.template.lrcButton.classList.remove("aplayer-icon-lrc-inactivity"),
                      e.player.lrc && e.player.lrc.show()) : (e.player.template.lrcButton.classList.add("aplayer-icon-lrc-inactivity"),
                      e.player.lrc && e.player.lrc.hide())
                  })
              }
          }]),
          e
      }();
      t.default = s
  }
  , function(e, t, n) {
      var i = n(1);
      e.exports = function(e) {
          "use strict";
          e = e || {};
          var t = ""
            , n = i.$each
            , a = e.lyrics
            , r = (e.$value,
          e.$index,
          i.$escape);
          return n(a, function(e, n) {
              t += "\n    <p",
              0 === n && (t += ' class="aplayer-lrc-current"'),
              t += ">",
              t += r(e[1]),
              t += "</p>\n"
          }),
          t
      }
  }
  , function(e, t, n) {
      "use strict";
      Object.defineProperty(t, "__esModule", {
          value: !0
      });
      var i, a = function() {
          function e(e, t) {
              for (var n = 0; n < t.length; n++) {
                  var i = t[n];
                  i.enumerable = i.enumerable || !1,
                  i.configurable = !0,
                  "value"in i && (i.writable = !0),
                  Object.defineProperty(e, i.key, i)
              }
          }
          return function(t, n, i) {
              return n && e(t.prototype, n),
              i && e(t, i),
              t
          }
      }(), r = n(10), o = (i = r) && i.__esModule ? i : {
          default: i
      };
      var s = function() {
          function e(t) {
              !function(e, t) {
                  if (!(e instanceof t))
                      throw new TypeError("Cannot call a class as a function")
              }(this, e),
              this.container = t.container,
              this.async = t.async,
              this.player = t.player,
              this.parsed = [],
              this.index = 0,
              this.current = []
          }
          return a(e, [{
              key: "show",
              value: function() {
                  this.player.events.trigger("lrcshow"),
                  this.player.template.lrcWrap.classList.remove("aplayer-lrc-hide")
              }
          }, {
              key: "hide",
              value: function() {
                  this.player.events.trigger("lrchide"),
                  this.player.template.lrcWrap.classList.add("aplayer-lrc-hide")
              }
          }, {
              key: "toggle",
              value: function() {
                  this.player.template.lrcWrap.classList.contains("aplayer-lrc-hide") ? this.show() : this.hide()
              }
          }, {
              key: "update",
              value: function() {
                  var e = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : this.player.audio.currentTime;
                  if (this.index > this.current.length - 1 || e < this.current[this.index][0] || !this.current[this.index + 1] || e >= this.current[this.index + 1][0])
                      for (var t = 0; t < this.current.length; t++)
                          e >= this.current[t][0] && (!this.current[t + 1] || e < this.current[t + 1][0]) && (this.index = t,
                          this.container.style.transform = "translateY(" + 16 * -this.index + "px)",
                          this.container.style.webkitTransform = "translateY(" + 16 * -this.index + "px)",
                          this.container.getElementsByClassName("aplayer-lrc-current")[0].classList.remove("aplayer-lrc-current"),
                          this.container.getElementsByTagName("p")[t].classList.add("aplayer-lrc-current"))
              }
          }, {
              key: "switch",
              value: function(e) {
                  var t = this;
                  if (!this.parsed[e])
                      if (this.async) {
                          this.parsed[e] = [["00:00", "Loading"]];
                          var n = new XMLHttpRequest;
                          n.onreadystatechange = function() {
                              e === t.player.list.index && 4 === n.readyState && (n.status >= 200 && n.status < 300 || 304 === n.status ? t.parsed[e] = t.parse(n.responseText) : (t.player.notice("LRC file request fails: status " + n.status),
                              t.parsed[e] = [["00:00", "Not available"]]),
                              t.container.innerHTML = (0,
                              o.default)({
                                  lyrics: t.parsed[e]
                              }),
                              t.update(0),
                              t.current = t.parsed[e])
                          }
                          ;
                          var i = this.player.list.audios[e].lrc;
                          n.open("get", i, !0),
                          n.send(null)
                      } else
                          this.player.list.audios[e].lrc ? this.parsed[e] = this.parse(this.player.list.audios[e].lrc) : this.parsed[e] = [["00:00", "Not available"]];
                  this.container.innerHTML = (0,
                  o.default)({
                      lyrics: this.parsed[e]
                  }),
                  this.update(0),
                  this.current = this.parsed[e]
              }
          }, {
              key: "parse",
              value: function(e) {
                  if (e) {
                      for (var t = (e = e.replace(/([^\]^\n])\[/g, function(e, t) {
                          return t + "\n["
                      }).replaceAll("&apos;", "'").replaceAll("(//)", "")).split("\n"), n = [], i = t.length, a = 0; a < i; a++) {
                          var r = t[a].match(/\[(\d{2}):(\d{2})(\.(\d{2,3}))?]/g)
                            , o = t[a].replace(/.*\[(\d{2}):(\d{2})(\.(\d{2,3}))?]/g, "").replace(/<(\d{2}):(\d{2})(\.(\d{2,3}))?>/g, "").replace(/^\s+|\s+$/g, "");
                          if (r)
                              for (var s = r.length, l = 0; l < s; l++) {
                                  var u = /\[(\d{2}):(\d{2})(\.(\d{2,3}))?]/.exec(r[l])
                                    , c = 60 * u[1] + parseInt(u[2]) + (u[4] ? parseInt(u[4]) / (2 === (u[4] + "").length ? 100 : 1e3) : 0);
                                  n.push([c, o])
                              }
                      }
                      return (n = n.filter(function(e) {
                          return e[1]
                      })).sort(function(e, t) {
                          return e[0] - t[0]
                      }),
                      n
                  }
                  return []
              }
          }, {
              key: "remove",
              value: function(e) {
                  this.parsed.splice(e, 1)
              }
          }, {
              key: "clear",
              value: function() {
                  this.parsed = [],
                  this.container.innerHTML = ""
              }
          }]),
          e
      }();
      t.default = s
  }
  , function(e, t, n) {
      "use strict";
      Object.defineProperty(t, "__esModule", {
          value: !0
      });
      var i, a = function() {
          function e(e, t) {
              for (var n = 0; n < t.length; n++) {
                  var i = t[n];
                  i.enumerable = i.enumerable || !1,
                  i.configurable = !0,
                  "value"in i && (i.writable = !0),
                  Object.defineProperty(e, i.key, i)
              }
          }
          return function(t, n, i) {
              return n && e(t.prototype, n),
              i && e(t, i),
              t
          }
      }(), r = n(0), o = (i = r) && i.__esModule ? i : {
          default: i
      };
      var s = function() {
          function e(t) {
              !function(e, t) {
                  if (!(e instanceof t))
                      throw new TypeError("Cannot call a class as a function")
              }(this, e),
              this.storageName = t.options.storageName,
              this.data = JSON.parse(o.default.storage.get(this.storageName)),
              this.data || (this.data = {}),
              this.data.volume = this.data.volume || t.options.volume
          }
          return a(e, [{
              key: "get",
              value: function(e) {
                  return this.data[e]
              }
          }, {
              key: "set",
              value: function(e, t) {
                  this.data[e] = t,
                  o.default.storage.set(this.storageName, JSON.stringify(this.data))
              }
          }]),
          e
      }();
      t.default = s
  }
  , function(e, t, n) {
      "use strict";
      Object.defineProperty(t, "__esModule", {
          value: !0
      });
      var i = function() {
          function e(e, t) {
              for (var n = 0; n < t.length; n++) {
                  var i = t[n];
                  i.enumerable = i.enumerable || !1,
                  i.configurable = !0,
                  "value"in i && (i.writable = !0),
                  Object.defineProperty(e, i.key, i)
              }
          }
          return function(t, n, i) {
              return n && e(t.prototype, n),
              i && e(t, i),
              t
          }
      }();
      var a = function() {
          function e(t) {
              !function(e, t) {
                  if (!(e instanceof t))
                      throw new TypeError("Cannot call a class as a function")
              }(this, e),
              this.elements = {},
              this.elements.volume = t.volume,
              this.elements.played = t.played,
              this.elements.loaded = t.loaded
          }
          return i(e, [{
              key: "set",
              value: function(e, t, n) {
                  t = Math.max(t, 0),
                  t = Math.min(t, 1),
                  this.elements[e].style[n] = 100 * t + "%"
              }
          }, {
              key: "get",
              value: function(e, t) {
                  return parseFloat(this.elements[e].style[t]) / 100
              }
          }]),
          e
      }();
      t.default = a
  }
  , function(e, t, n) {
      "use strict";
      (function(t) {
          e.exports = !1;
          try {
              e.exports = "[object process]" === Object.prototype.toString.call(t.process)
          } catch (e) {}
      }
      ).call(this, n(3))
  }
  , function(e, t, n) {
      "use strict";
      (function(t) {
          var i = n(14)
            , a = Object.create(i ? t : window)
            , r = /["&'<>]/;
          a.$escape = function(e) {
              return function(e) {
                  var t = "" + e
                    , n = r.exec(t);
                  if (!n)
                      return e;
                  var i = ""
                    , a = void 0
                    , o = void 0
                    , s = void 0;
                  for (a = n.index,
                  o = 0; a < t.length; a++) {
                      switch (t.charCodeAt(a)) {
                      case 34:
                          s = "&#34;";
                          break;
                      case 38:
                          s = "&#38;";
                          break;
                      case 39:
                          s = "&#39;";
                          break;
                      case 60:
                          s = "&#60;";
                          break;
                      case 62:
                          s = "&#62;";
                          break;
                      default:
                          continue
                      }
                      o !== a && (i += t.substring(o, a)),
                      o = a + 1,
                      i += s
                  }
                  return o !== a ? i + t.substring(o, a) : i
              }(function e(t) {
                  "string" != typeof t && (t = void 0 === t || null === t ? "" : "function" == typeof t ? e(t.call(t)) : JSON.stringify(t));
                  return t
              }(e))
          }
          ,
          a.$each = function(e, t) {
              if (Array.isArray(e))
                  for (var n = 0, i = e.length; n < i; n++)
                      t(e[n], n);
              else
                  for (var a in e)
                      t(e[a], a)
          }
          ,
          e.exports = a
      }
      ).call(this, n(3))
  }
  , function(e, t, n) {
      var i = n(1);
      e.exports = function(e) {
          "use strict";
          var t, a = "", r = (e = e || {}).cover, o = i.$escape, s = e.options, l = e.icons, u = (arguments[1],
          e.getObject);
          e.theme,
          e.audio,
          e.index;
          return a += '<div class="aplayer-body">\r\n    <div class="aplayer-pic" style="',
          r && (a += "background-image: url(&quot;",
          a += o(r),
          a += "&quot;);"),
          a += "background-color: ",
          a += o(s.theme),
          a += ';">\r\n        <div class="aplayer-button aplayer-play">',
          a += l.play,
          a += '</div>\r\n    </div>\r\n    <div class="aplayer-info">\r\n        <div class="aplayer-music">\r\n            <span class="aplayer-title">No audio</span>\r\n            <span class="aplayer-author"></span>\r\n        </div>\r\n        <div class="aplayer-lrc">\r\n            <div class="aplayer-lrc-contents" style="transform: translateY(0); -webkit-transform: translateY(0);"></div>\r\n        </div>\r\n        <div class="aplayer-controller">\r\n            <div class="aplayer-bar-wrap">\r\n                <div class="aplayer-bar">\r\n                    <div class="aplayer-loaded" style="width: 0"></div>\r\n                    <div class="aplayer-played" style="width: 0; background: ',
          a += o(s.theme),
          a += ';">\r\n                        <span class="aplayer-thumb" style="background: ',
          a += o(s.theme),
          a += ';">\r\n                            <span class="aplayer-loading-icon">',
          a += l.loading,
          a += '</span>\r\n                        </span>\r\n                    </div>\r\n                </div>\r\n            </div>\r\n            <div class="aplayer-time">\r\n                <span class="aplayer-time-inner">\r\n                    <span class="aplayer-ptime">00:00</span> / <span class="aplayer-dtime">00:00</span>\r\n                </span>\r\n                <div class="main-button">\r\n                    <span class="aplayer-icon aplayer-icon-back">\r\n                        ',
          a += l.skip,
          a += '\r\n                    </span>\r\n                    <span class="aplayer-icon aplayer-icon-play">\r\n                        ',
          a += l.play,
          a += '\r\n                    </span>\r\n                    <span class="aplayer-icon aplayer-icon-forward">\r\n                        ',
          a += l.skip,
          a += '\r\n                    </span>\r\n                </div>\r\n                <div class="other-button">\r\n                    <div class="aplayer-volume-wrap">\r\n                        <button type="button" class="aplayer-icon aplayer-icon-volume-down">\r\n                            ',
          a += l.volumeDown,
          a += '\r\n                        </button>\r\n                        <div class="aplayer-volume-bar-wrap">\r\n                            <div class="aplayer-volume-bar">\r\n                                <div class="aplayer-volume" style="width: 80%; background: ',
          a += o(s.theme),
          a += ';"></div>\r\n                            </div>\r\n                        </div>\r\n                    </div>\r\n                    <button type="button" class="aplayer-icon aplayer-icon-order">\r\n                        ',
          "list" === s.order ? a += l.orderList : "random" === s.order && (a += l.orderRandom),
          a += '\r\n                    </button>\r\n                    <button type="button" class="aplayer-icon aplayer-icon-loop">\r\n                        ',
          "one" === s.loop ? a += l.loopOne : "all" === s.loop ? a += l.loopAll : "none" === s.loop && (a += l.loopNone),
          a += '\r\n                    </button>\r\n                    <button type="button" class="aplayer-icon aplayer-icon-menu">\r\n                        ',
          a += l.menu,
          a += '\r\n                    </button>\r\n                    <button type="button" class="aplayer-icon aplayer-icon-lrc">\r\n                        ',
          a += l.lrc,
          a += '\r\n                    </button>\r\n                </div>\r\n            </div>\r\n        </div>\r\n    </div>\r\n    <div class="aplayer-notice"></div>\r\n</div>\r\n<div class="aplayer-list',
          s.listFolded && (a += " aplayer-list-hide"),
          a += '"',
          s.listMaxHeight && (a += ' style="max-height: ',
          a += o(s.listMaxHeight),
          a += '"'),
          a += ">\r\n    <ol",
          s.listMaxHeight && (a += ' style="max-height: ',
          a += o(s.listMaxHeight),
          a += '"'),
          a += ">\r\n        ",
          t = n(4)(u({
              theme: s.theme,
              audio: s.audio,
              index: 1
          })),
          a += t,
          a += "\r\n    </ol>\r\n</div>"
      }
  }
  , function(e, t, n) {
      "use strict";
      Object.defineProperty(t, "__esModule", {
          value: !0
      });
      var i = function() {
          function e(e, t) {
              for (var n = 0; n < t.length; n++) {
                  var i = t[n];
                  i.enumerable = i.enumerable || !1,
                  i.configurable = !0,
                  "value"in i && (i.writable = !0),
                  Object.defineProperty(e, i.key, i)
              }
          }
          return function(t, n, i) {
              return n && e(t.prototype, n),
              i && e(t, i),
              t
          }
      }()
        , a = o(n(2))
        , r = o(n(16));
      function o(e) {
          return e && e.__esModule ? e : {
              default: e
          }
      }
      var s = function() {
          function e(t) {
              !function(e, t) {
                  if (!(e instanceof t))
                      throw new TypeError("Cannot call a class as a function")
              }(this, e),
              this.container = t.container,
              this.options = t.options,
              this.randomOrder = t.randomOrder,
              this.init()
          }
          return i(e, [{
              key: "init",
              value: function() {
                  var e = "";
                  this.options.audio.length && (e = "random" === this.options.order ? this.options.audio[this.randomOrder[0]].cover : this.options.audio[0].cover),
                  this.container.innerHTML = (0,
                  r.default)({
                      options: this.options,
                      icons: a.default,
                      cover: e,
                      getObject: function(e) {
                          return e
                      }
                  }),
                  this.lrc = this.container.querySelector(".aplayer-lrc-contents"),
                  this.lrcWrap = this.container.querySelector(".aplayer-lrc"),
                  this.ptime = this.container.querySelector(".aplayer-ptime"),
                  this.info = this.container.querySelector(".aplayer-info"),
                  this.time = this.container.querySelector(".aplayer-time"),
                  this.barWrap = this.container.querySelector(".aplayer-bar-wrap"),
                  this.button = this.container.querySelector(".aplayer-button"),
                  this.body = this.container.querySelector(".aplayer-body"),
                  this.list = this.container.querySelector(".aplayer-list"),
                  this.listOl = this.container.querySelector(".aplayer-list ol"),
                  this.played = this.container.querySelector(".aplayer-played"),
                  this.loaded = this.container.querySelector(".aplayer-loaded"),
                  this.thumb = this.container.querySelector(".aplayer-thumb"),
                  this.volume = this.container.querySelector(".aplayer-volume"),
                  this.volumeBar = this.container.querySelector(".aplayer-volume-bar"),
                  this.volumeButton = this.container.querySelector(".aplayer-time button"),
                  this.volumeBarWrap = this.container.querySelector(".aplayer-volume-bar-wrap"),
                  this.loop = this.container.querySelector(".aplayer-icon-loop"),
                  this.order = this.container.querySelector(".aplayer-icon-order"),
                  this.menu = this.container.querySelector(".aplayer-icon-menu"),
                  this.pic = this.container.querySelector(".aplayer-pic"),
                  this.title = this.container.querySelector(".aplayer-title"),
                  this.author = this.container.querySelector(".aplayer-author"),
                  this.dtime = this.container.querySelector(".aplayer-dtime"),
                  this.notice = this.container.querySelector(".aplayer-notice"),
                  this.skipBackButton = this.container.querySelector(".aplayer-icon-back"),
                  this.skipForwardButton = this.container.querySelector(".aplayer-icon-forward"),
                  this.skipPlayButton = this.container.querySelector(".aplayer-icon-play"),
                  this.lrcButton = this.container.querySelector(".aplayer-icon-lrc")
              }
          }]),
          e
      }();
      t.default = s
  }
  , function(e, t, n) {
      "use strict";
      Object.defineProperty(t, "__esModule", {
          value: !0
      }),
      t.default = function(e) {
          var t = {
              container: e.element || document.getElementsByClassName("aplayer")[0],
              mini: e.narrow || e.fixed || !1,
              fixed: !1,
              autoplay: !1,
              mutex: !0,
              lrcType: e.showlrc || e.lrc || 0,
              preload: "auto",
              theme: "#b7daff",
              loop: "all",
              order: "list",
              volume: .7,
              listFolded: e.listfolded,
              listMaxHeight: e.listmaxheight || "200px",
              audio: e.music || [],
              storageName: "aplayer-setting"
          };
          for (var n in t)
              t.hasOwnProperty(n) && !e.hasOwnProperty(n) && (e[n] = t[n]);
          return "[object Array]" !== Object.prototype.toString.call(e.audio) && (e.audio = [e.audio]),
          e.audio.map(function(e) {
              return e.name = e.name || e.title || "Audio name",
              e.artist = e.artist || e.author || "Audio artist",
              e.cover = e.cover || e.pic,
              e.type = e.type || "normal",
              e
          }),
          e.audio.length <= 1 && "one" === e.loop && (e.loop = "all"),
          e
      }
  }
  , function(e, t) {
      e.exports = '<svg xmlns="http://www.w3.org/2000/svg" version="1.1" viewBox="0 0 32 32"><path d="M26.667 5.333h-21.333c-0 0-0.001 0-0.001 0-1.472 0-2.666 1.194-2.666 2.666 0 0 0 0.001 0 0.001v-0 16c0 0 0 0.001 0 0.001 0 1.472 1.194 2.666 2.666 2.666 0 0 0.001 0 0.001 0h21.333c0 0 0.001 0 0.001 0 1.472 0 2.666-1.194 2.666-2.666 0-0 0-0.001 0-0.001v0-16c0-0 0-0.001 0-0.001 0-1.472-1.194-2.666-2.666-2.666-0 0-0.001 0-0.001 0h0zM5.333 16h5.333v2.667h-5.333v-2.667zM18.667 24h-13.333v-2.667h13.333v2.667zM26.667 24h-5.333v-2.667h5.333v2.667zM26.667 18.667h-13.333v-2.667h13.333v2.667z"></path></svg>'
  }
  , function(e, t) {
      e.exports = '<svg t="1680003375604" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="2939" xmlns:xlink="http://www.w3.org/1999/xlink"><path d="M364.302083 465.602819L687.954365 218.588294c38.416414-29.327534 93.791393-1.929039 93.791392 46.396277v494.029051c0 48.325316-55.374979 75.725617-93.791392 46.398084L364.302083 558.397181c-30.600916-23.357989-30.600916-69.436372 0-92.794362zM238.945254 780.798397V451.684117v-164.562559c0-19.628152-5.904521-60.475733 17.057907-75.841215 25.523642-17.068744 59.747828 1.210165 59.747828 31.919454v493.676839c0 19.628152 5.915358 60.473927-17.047069 75.841215-25.53448 17.068744-59.758666-1.211971-59.758666-31.919454z" fill="#000000" p-id="2940"></path></svg>'
  }
  , function(e, t) {
      e.exports = '<svg xmlns="http://www.w3.org/2000/svg" version="1.1" viewBox="0 0 32 32"><path d="M22 16l-10.105-10.6-1.895 1.987 8.211 8.613-8.211 8.612 1.895 1.988 8.211-8.613z"></path></svg>'
  }
  , function(e, t) {
      e.exports = '<svg xmlns="http://www.w3.org/2000/svg" version="1.1" viewBox="0 0 32 32"><path d="M4 16c0-6.6 5.4-12 12-12s12 5.4 12 12c0 1.2-0.8 2-2 2s-2-0.8-2-2c0-4.4-3.6-8-8-8s-8 3.6-8 8 3.6 8 8 8c1.2 0 2 0.8 2 2s-0.8 2-2 2c-6.6 0-12-5.4-12-12z"></path></svg>'
  }
  , function(e, t) {
      e.exports = '<svg t="1680006985818" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="4767" xmlns:xlink="http://www.w3.org/1999/xlink"><path d="M361.518545 727.784727a216.157091 216.157091 0 0 1-215.924363-215.877818c0-32.302545 7.121455-62.976 19.921454-90.530909l-69.352727-40.029091a294.958545 294.958545 0 0 0 56.32 339.549091 295.098182 295.098182 0 0 0 208.989091 86.900364 40.029091 40.029091 0 1 0 0-80.011637zM361.518545 296.029091c-12.194909 0-24.110545 0.977455-35.700363 2.932364l-92.625455-53.527273a292.677818 292.677818 0 0 1 128.325818-29.463273c2.280727 0 4.561455 0.232727 6.795637 0.651636V158.487273c0-12.288 13.963636-19.362909 23.877818-12.101818l132.608 97.605818a15.080727 15.080727 0 0 1 0 24.203636L392.192 365.847273a14.987636 14.987636 0 0 1-23.877818-12.101818V295.424a38.167273 38.167273 0 0 1-6.795637 0.558545zM938.216727 396.893091a296.773818 296.773818 0 0 0-63.534545-94.021818 295.144727 295.144727 0 0 0-208.989091-86.853818 40.029091 40.029091 0 1 0 0 79.96509 216.157091 216.157091 0 0 1 215.924364 215.924364c0 32.442182-7.214545 63.301818-20.107637 90.949818l69.259637 39.982546a297.053091 297.053091 0 0 0 30.72-130.932364c0-39.796364-7.773091-78.522182-23.272728-114.967273zM793.506909 778.565818l-92.811636-53.620363c-11.403636 1.861818-23.086545 2.839273-35.002182 2.839272a38.446545 38.446545 0 0 0-11.776 1.815273v-60.788364c0-12.288-14.010182-19.409455-23.924364-12.101818l-132.608 97.605818a15.080727 15.080727 0 0 0 0 24.203637l132.514909 97.466182a14.987636 14.987636 0 0 0 23.924364-12.101819v-57.902545c3.677091 1.210182 7.68 1.861818 11.776 1.861818a292.677818 292.677818 0 0 0 127.906909-29.323636zM56.366545 305.012364a46.545455 46.545455 0 1 1 46.545455-80.616728l864.116364 498.874182a46.545455 46.545455 0 0 1-46.545455 80.616727L56.32 305.012364z" fill="#000000" p-id="4768"></path></svg>'
  }
  , function(e, t) {
      e.exports = '<svg t="1680006992201" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="5133" xmlns:xlink="http://www.w3.org/1999/xlink"><path d="M361.518545 727.784727a216.157091 216.157091 0 0 1-215.877818-215.877818 216.157091 216.157091 0 0 1 215.877818-215.924364 38.167273 38.167273 0 0 0 6.795637-0.558545v58.274909c0 12.288 14.010182 19.409455 23.924363 12.101818l132.608-97.605818a15.080727 15.080727 0 0 0 0-24.203636L392.238545 146.385455a14.987636 14.987636 0 0 0-23.924363 12.101818v58.135272a38.213818 38.213818 0 0 0-6.795637-0.60509c-39.796364 0-78.475636 7.912727-114.967272 23.365818a296.773818 296.773818 0 0 0-94.021818 63.534545 295.098182 295.098182 0 0 0-63.488 323.956364c14.987636 35.234909 36.305455 66.839273 63.488 94.021818a295.098182 295.098182 0 0 0 208.98909 86.900364 40.029091 40.029091 0 1 0 0-80.011637z m576.698182-330.891636a296.773818 296.773818 0 0 0-63.488-94.021818 295.098182 295.098182 0 0 0-208.989091-86.853818 40.029091 40.029091 0 1 0 0 79.96509 216.157091 216.157091 0 0 1 215.877819 215.924364 216.157091 216.157091 0 0 1-215.877819 215.877818 38.446545 38.446545 0 0 0-11.822545 1.815273v-60.788364c0-12.288-13.963636-19.409455-23.877818-12.101818l-132.608 97.605818a15.080727 15.080727 0 0 0 0 24.203637l132.514909 97.466182a14.987636 14.987636 0 0 0 23.877818-12.101819v-57.902545c3.723636 1.210182 7.726545 1.861818 11.822545 1.861818 39.796364 0 78.475636-7.912727 114.967273-23.458909a296.820364 296.820364 0 0 0 94.021818-63.488 295.098182 295.098182 0 0 0 63.581091-323.956364z" fill="#000000" p-id="5134"></path><path d="M512.744727 660.666182a40.029091 40.029091 0 0 0 39.796364-40.215273l-1.163636-214.109091a40.029091 40.029091 0 0 0-40.029091-39.796363h-0.186182a40.029091 40.029091 0 0 0-39.796364 40.215272l1.210182 214.109091a40.029091 40.029091 0 0 0 40.029091 39.796364h0.139636z" fill="#000000" p-id="5135"></path></svg>'
  }
  , function(e, t) {
      e.exports = '<svg t="1680006989568" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="4950" xmlns:xlink="http://www.w3.org/1999/xlink"><path d="M361.518545 727.784727a216.157091 216.157091 0 0 1-215.877818-215.877818 216.157091 216.157091 0 0 1 215.877818-215.924364 38.167273 38.167273 0 0 0 6.795637-0.558545v58.274909c0 12.288 14.010182 19.409455 23.924363 12.101818l132.608-97.605818a15.080727 15.080727 0 0 0 0-24.203636L392.238545 146.385455a14.987636 14.987636 0 0 0-23.924363 12.101818v58.135272a38.213818 38.213818 0 0 0-6.795637-0.60509c-39.796364 0-78.475636 7.912727-114.967272 23.365818a296.773818 296.773818 0 0 0-94.021818 63.534545 295.098182 295.098182 0 0 0-63.488 323.956364c14.987636 35.234909 36.305455 66.839273 63.488 94.021818a295.098182 295.098182 0 0 0 208.98909 86.900364 40.029091 40.029091 0 1 0 0-80.011637z m576.698182-330.891636a296.773818 296.773818 0 0 0-63.488-94.021818 295.098182 295.098182 0 0 0-208.989091-86.853818 40.029091 40.029091 0 1 0 0 79.96509 216.157091 216.157091 0 0 1 215.877819 215.924364 216.157091 216.157091 0 0 1-215.877819 215.877818 38.446545 38.446545 0 0 0-11.822545 1.815273v-60.788364c0-12.288-13.963636-19.409455-23.877818-12.101818l-132.608 97.605818a15.080727 15.080727 0 0 0 0 24.203637l132.514909 97.466182a14.987636 14.987636 0 0 0 23.877818-12.101819v-57.902545c3.723636 1.210182 7.726545 1.861818 11.822545 1.861818 39.796364 0 78.475636-7.912727 114.967273-23.458909a296.820364 296.820364 0 0 0 94.021818-63.488 295.098182 295.098182 0 0 0 63.581091-323.956364z" fill="#000000" p-id="4951"></path></svg>'
  }
  , function(e, t) {
      e.exports = '<svg t="1680007125249" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="8497" xmlns:xlink="http://www.w3.org/1999/xlink"><path d="M554.666667 703.701333C554.666667 786.218667 621.781333 853.333333 704.298667 853.333333s149.632-67.114667 149.632-149.632c0-7.552-1.152-14.805333-2.261334-22.058666H853.333333V256h85.333334V170.666667h-128a42.666667 42.666667 0 0 0-42.666667 42.666666v355.541334a147.84 147.84 0 0 0-63.701333-14.762667A149.76 149.76 0 0 0 554.666667 703.701333z m149.632-64.298666c35.456 0 64.298667 28.842667 64.298666 64.298666S739.754667 768 704.298667 768 640 739.157333 640 703.701333s28.842667-64.298667 64.298667-64.298666zM85.333333 213.333333h597.333334v85.333334H85.333333z" fill="#000000" p-id="8498"></path><path d="M85.333333 384h597.333334v85.333333H85.333333z m0 170.666667h384v85.333333H85.333333z m0 170.666666h384v85.333334H85.333333z" fill="#000000" p-id="8499"></path></svg>'
  }
  , function(e, t) {
      e.exports = '<svg xmlns="http://www.w3.org/2000/svg" version="1.1" viewBox="0 0 32 32"><path d="M0.622 18.334h19.54v7.55l11.052-9.412-11.052-9.413v7.549h-19.54v3.725z"></path></svg>'
  }
  , function(e, t) {
      e.exports = '<svg t="1680007081753" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="7500" xmlns:xlink="http://www.w3.org/1999/xlink"><path d="M68.253 349.325h162.675c8.156 0 32.477 8.156 40.633 16.311l56.944 56.944c16.311 24.467 48.788 24.467 73.109 0 24.467-16.311 24.467-48.788 0-73.109l-56.944-56.944c-24.321-24.321-73.109-48.788-113.887-48.788H68.254c-32.477 0-48.788 24.467-48.788 48.788 0 32.331 24.467 56.798 48.788 56.798z m609.923 0h89.42v65.099c0 16.311 8.156 24.467 24.467 16.311l186.996-121.897c16.311-8.156 16.311-24.467 0-32.477L792.063 154.464c-16.311-8.156-24.467 0-24.467 16.311v89.275h-89.42c-81.265 0-97.575 40.633-154.519 97.575L336.661 625.594c-32.477 32.477-130.052 65.099-178.841 65.099H68.4c-32.477 0-48.788 24.321-48.788 48.788 0 32.477 24.321 48.788 48.788 48.788h89.42c81.265 0 195.152-40.633 252.095-97.575l186.996-268.26c40.633-40.633 32.477-73.109 81.265-73.109z m300.883 373.992L792.063 593.265c-16.311-8.156-24.467 0-24.467 16.311v81.265h-89.42c-8.156 0-32.477-8.156-40.633-16.311l-56.944-56.944c-16.311-24.467-48.788-24.467-73.109 0-24.321 16.311-24.321 48.788 0 73.109l56.944 56.944c24.467 24.321 73.109 48.788 113.887 48.788h89.42v65.099c0 16.311 8.156 24.321 24.467 16.311L979.204 755.94c16.02-8.156 16.02-24.467-0.146-32.622z" fill="#000000" p-id="7501"></path></svg>'
  }
  , function(e, t) {
      e.exports = '<svg t="1680007291459" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="12217" xmlns:xlink="http://www.w3.org/1999/xlink"><path d="M495.424 137.1392a12.8 12.8 0 0 1 3.776 9.0688v731.5712a12.8 12.8 0 0 1-21.8752 9.0304l-207.552-208.6208H140.8a38.4 38.4 0 0 1-38.4-38.4V384.2112a38.4 38.4 0 0 1 38.4-38.4h128.96l207.5648-208.6272a12.8 12.8 0 0 1 18.0992-0.0448z m375.68 202.7712l49.792 49.7792L798.5728 512l122.3104 122.3168-49.7792 49.7792L748.8 561.7728 626.496 684.096l-49.792-49.7792 122.3168-122.3168L576.704 389.696l49.7792-49.7792L748.8 462.208l122.3168-122.304z" fill="#000000" p-id="12218"></path></svg>'
  }
  , function(e, t) {
      e.exports = '<svg t="1680007288117" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="12046" xmlns:xlink="http://www.w3.org/1999/xlink"><path d="M495.424 137.1392a12.8 12.8 0 0 1 3.776 9.0688v731.5712a12.8 12.8 0 0 1-21.8752 9.0304l-207.552-208.6208H140.8a38.4 38.4 0 0 1-38.4-38.4V384.2112a38.4 38.4 0 0 1 38.4-38.4h128.96l207.5648-208.6272a12.8 12.8 0 0 1 18.0992-0.0448zM784.576 204.8c169.4976 169.4912 171.1936 443.2448 5.088 614.8224l-5.0816 5.1712-58.8352-58.8352c137.3312-137.3248 138.7008-359.1232 4.1216-498.1376l-4.1216-4.192L784.5824 204.8zM639.7696 349.6128c90.3168 90.3168 91.2192 236.1856 2.7136 327.6096l-2.7136 2.752-58.8288-58.8288c58.144-58.1504 58.7264-152.064 1.7408-210.9248l-1.7408-1.7728 58.8288-58.8352z" fill="#000000" p-id="12047"></path></svg>'
  }
  , function(e, t) {
      e.exports = '<svg t="1680003379491" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="3113" xmlns:xlink="http://www.w3.org/1999/xlink"><path d="M716.805057 780.798397V243.199797c0-21.204979-17.196985-38.40377-38.40377-38.403771s-38.401964 17.196985-38.401964 38.403771v537.5986c0 21.204979 17.196985 38.392933 38.401964 38.392933s38.40377-17.187954 38.40377-38.392933zM384.000677 780.798397V243.199797c0-21.204979-17.187954-38.40377-38.391127-38.403771-21.215816 0-38.40377 17.196985-38.40377 38.403771v537.5986c0 21.204979 17.187954 38.392933 38.40377 38.392933 21.203173 0 38.391127-17.187954 38.391127-38.392933z" fill="#000000" p-id="3114"></path></svg>'
  }
  , function(e, t) {
      e.exports = '<svg t="1680003370131" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="2765" xmlns:xlink="http://www.w3.org/1999/xlink"><path d="M732.502883 465.602819c-107.883492-82.3454-215.772403-164.681769-323.652282-247.014525-38.414608-29.327534-93.780555-1.929039-93.780555 46.396277v494.029051c0 48.325316 55.365948 75.725617 93.780555 46.398084 107.87988-82.332757 215.76879-164.669126 323.652282-247.014525 30.61356-23.357989 30.61356-69.436372 0-92.794362z" fill="#000000" p-id="2766"></path></svg>'
  }
  , function(e, t, n) {
      "use strict";
      var i, a, r = e.exports = {};
      function o() {
          throw new Error("setTimeout has not been defined")
      }
      function s() {
          throw new Error("clearTimeout has not been defined")
      }
      function l(e) {
          if (i === setTimeout)
              return setTimeout(e, 0);
          if ((i === o || !i) && setTimeout)
              return i = setTimeout,
              setTimeout(e, 0);
          try {
              return i(e, 0)
          } catch (t) {
              try {
                  return i.call(null, e, 0)
              } catch (t) {
                  return i.call(this, e, 0)
              }
          }
      }
      !function() {
          try {
              i = "function" == typeof setTimeout ? setTimeout : o
          } catch (e) {
              i = o
          }
          try {
              a = "function" == typeof clearTimeout ? clearTimeout : s
          } catch (e) {
              a = s
          }
      }();
      var u, c = [], d = !1, p = -1;
      function h() {
          d && u && (d = !1,
          u.length ? c = u.concat(c) : p = -1,
          c.length && f())
      }
      function f() {
          if (!d) {
              var e = l(h);
              d = !0;
              for (var t = c.length; t; ) {
                  for (u = c,
                  c = []; ++p < t; )
                      u && u[p].run();
                  p = -1,
                  t = c.length
              }
              u = null,
              d = !1,
              function(e) {
                  if (a === clearTimeout)
                      return clearTimeout(e);
                  if ((a === s || !a) && clearTimeout)
                      return a = clearTimeout,
                      clearTimeout(e);
                  try {
                      a(e)
                  } catch (t) {
                      try {
                          return a.call(null, e)
                      } catch (t) {
                          return a.call(this, e)
                      }
                  }
              }(e)
          }
      }
      function y(e, t) {
          this.fun = e,
          this.array = t
      }
      function m() {}
      r.nextTick = function(e) {
          var t = new Array(arguments.length - 1);
          if (arguments.length > 1)
              for (var n = 1; n < arguments.length; n++)
                  t[n - 1] = arguments[n];
          c.push(new y(e,t)),
          1 !== c.length || d || l(f)
      }
      ,
      y.prototype.run = function() {
          this.fun.apply(null, this.array)
      }
      ,
      r.title = "browser",
      r.browser = !0,
      r.env = {},
      r.argv = [],
      r.version = "",
      r.versions = {},
      r.on = m,
      r.addListener = m,
      r.once = m,
      r.off = m,
      r.removeListener = m,
      r.removeAllListeners = m,
      r.emit = m,
      r.prependListener = m,
      r.prependOnceListener = m,
      r.listeners = function(e) {
          return []
      }
      ,
      r.binding = function(e) {
          throw new Error("process.binding is not supported")
      }
      ,
      r.cwd = function() {
          return "/"
      }
      ,
      r.chdir = function(e) {
          throw new Error("process.chdir is not supported")
      }
      ,
      r.umask = function() {
          return 0
      }
  }
  , function(e, t, n) {
      "use strict";
      (function(e, t) {
          !function(e, n) {
              if (!e.setImmediate) {
                  var i, a, r, o, s, l = 1, u = {}, c = !1, d = e.document, p = Object.getPrototypeOf && Object.getPrototypeOf(e);
                  p = p && p.setTimeout ? p : e,
                  "[object process]" === {}.toString.call(e.process) ? i = function(e) {
                      t.nextTick(function() {
                          f(e)
                      })
                  }
                  : !function() {
                      if (e.postMessage && !e.importScripts) {
                          var t = !0
                            , n = e.onmessage;
                          return e.onmessage = function() {
                              t = !1
                          }
                          ,
                          e.postMessage("", "*"),
                          e.onmessage = n,
                          t
                      }
                  }() ? e.MessageChannel ? ((r = new MessageChannel).port1.onmessage = function(e) {
                      f(e.data)
                  }
                  ,
                  i = function(e) {
                      r.port2.postMessage(e)
                  }
                  ) : d && "onreadystatechange"in d.createElement("script") ? (a = d.documentElement,
                  i = function(e) {
                      var t = d.createElement("script");
                      t.onreadystatechange = function() {
                          f(e),
                          t.onreadystatechange = null,
                          a.removeChild(t),
                          t = null
                      }
                      ,
                      a.appendChild(t)
                  }
                  ) : i = function(e) {
                      setTimeout(f, 0, e)
                  }
                  : (o = "setImmediate$" + Math.random() + "$",
                  s = function(t) {
                      t.source === e && "string" == typeof t.data && 0 === t.data.indexOf(o) && f(+t.data.slice(o.length))
                  }
                  ,
                  e.addEventListener ? e.addEventListener("message", s, !1) : e.attachEvent("onmessage", s),
                  i = function(t) {
                      e.postMessage(o + t, "*")
                  }
                  ),
                  p.setImmediate = function(e) {
                      "function" != typeof e && (e = new Function("" + e));
                      for (var t = new Array(arguments.length - 1), n = 0; n < t.length; n++)
                          t[n] = arguments[n + 1];
                      var a = {
                          callback: e,
                          args: t
                      };
                      return u[l] = a,
                      i(l),
                      l++
                  }
                  ,
                  p.clearImmediate = h
              }
              function h(e) {
                  delete u[e]
              }
              function f(e) {
                  if (c)
                      setTimeout(f, 0, e);
                  else {
                      var t = u[e];
                      if (t) {
                          c = !0;
                          try {
                              !function(e) {
                                  var t = e.callback
                                    , i = e.args;
                                  switch (i.length) {
                                  case 0:
                                      t();
                                      break;
                                  case 1:
                                      t(i[0]);
                                      break;
                                  case 2:
                                      t(i[0], i[1]);
                                      break;
                                  case 3:
                                      t(i[0], i[1], i[2]);
                                      break;
                                  default:
                                      t.apply(n, i)
                                  }
                              }(t)
                          } finally {
                              h(e),
                              c = !1
                          }
                      }
                  }
              }
          }("undefined" == typeof self ? void 0 === e ? void 0 : e : self)
      }
      ).call(this, n(3), n(33))
  }
  , function(e, t, n) {
      "use strict";
      var i = Function.prototype.apply;
      function a(e, t) {
          this._id = e,
          this._clearFn = t
      }
      t.setTimeout = function() {
          return new a(i.call(setTimeout, window, arguments),clearTimeout)
      }
      ,
      t.setInterval = function() {
          return new a(i.call(setInterval, window, arguments),clearInterval)
      }
      ,
      t.clearTimeout = t.clearInterval = function(e) {
          e && e.close()
      }
      ,
      a.prototype.unref = a.prototype.ref = function() {}
      ,
      a.prototype.close = function() {
          this._clearFn.call(window, this._id)
      }
      ,
      t.enroll = function(e, t) {
          clearTimeout(e._idleTimeoutId),
          e._idleTimeout = t
      }
      ,
      t.unenroll = function(e) {
          clearTimeout(e._idleTimeoutId),
          e._idleTimeout = -1
      }
      ,
      t._unrefActive = t.active = function(e) {
          clearTimeout(e._idleTimeoutId);
          var t = e._idleTimeout;
          t >= 0 && (e._idleTimeoutId = setTimeout(function() {
              e._onTimeout && e._onTimeout()
          }, t))
      }
      ,
      n(34),
      t.setImmediate = setImmediate,
      t.clearImmediate = clearImmediate
  }
  , function(e, t, n) {
      "use strict";
      (function(t) {
          var n = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function(e) {
              return typeof e
          }
          : function(e) {
              return e && "function" == typeof Symbol && e.constructor === Symbol && e !== Symbol.prototype ? "symbol" : typeof e
          }
            , i = setTimeout;
          function a() {}
          function r(e) {
              if (!(this instanceof r))
                  throw new TypeError("Promises must be constructed via new");
              if ("function" != typeof e)
                  throw new TypeError("not a function");
              this._state = 0,
              this._handled = !1,
              this._value = void 0,
              this._deferreds = [],
              c(e, this)
          }
          function o(e, t) {
              for (; 3 === e._state; )
                  e = e._value;
              0 !== e._state ? (e._handled = !0,
              r._immediateFn(function() {
                  var n = 1 === e._state ? t.onFulfilled : t.onRejected;
                  if (null !== n) {
                      var i;
                      try {
                          i = n(e._value)
                      } catch (e) {
                          return void l(t.promise, e)
                      }
                      s(t.promise, i)
                  } else
                      (1 === e._state ? s : l)(t.promise, e._value)
              })) : e._deferreds.push(t)
          }
          function s(e, t) {
              try {
                  if (t === e)
                      throw new TypeError("A promise cannot be resolved with itself.");
                  if (t && ("object" === (void 0 === t ? "undefined" : n(t)) || "function" == typeof t)) {
                      var i = t.then;
                      if (t instanceof r)
                          return e._state = 3,
                          e._value = t,
                          void u(e);
                      if ("function" == typeof i)
                          return void c((a = i,
                          o = t,
                          function() {
                              a.apply(o, arguments)
                          }
                          ), e)
                  }
                  e._state = 1,
                  e._value = t,
                  u(e)
              } catch (t) {
                  l(e, t)
              }
              var a, o
          }
          function l(e, t) {
              e._state = 2,
              e._value = t,
              u(e)
          }
          function u(e) {
              2 === e._state && 0 === e._deferreds.length && r._immediateFn(function() {
                  e._handled || r._unhandledRejectionFn(e._value)
              });
              for (var t = 0, n = e._deferreds.length; t < n; t++)
                  o(e, e._deferreds[t]);
              e._deferreds = null
          }
          function c(e, t) {
              var n = !1;
              try {
                  e(function(e) {
                      n || (n = !0,
                      s(t, e))
                  }, function(e) {
                      n || (n = !0,
                      l(t, e))
                  })
              } catch (e) {
                  if (n)
                      return;
                  n = !0,
                  l(t, e)
              }
          }
          r.prototype.catch = function(e) {
              return this.then(null, e)
          }
          ,
          r.prototype.then = function(e, t) {
              var n = new this.constructor(a);
              return o(this, new function(e, t, n) {
                  this.onFulfilled = "function" == typeof e ? e : null,
                  this.onRejected = "function" == typeof t ? t : null,
                  this.promise = n
              }
              (e,t,n)),
              n
          }
          ,
          r.prototype.finally = function(e) {
              var t = this.constructor;
              return this.then(function(n) {
                  return t.resolve(e()).then(function() {
                      return n
                  })
              }, function(n) {
                  return t.resolve(e()).then(function() {
                      return t.reject(n)
                  })
              })
          }
          ,
          r.all = function(e) {
              return new r(function(t, i) {
                  if (!e || void 0 === e.length)
                      throw new TypeError("Promise.all accepts an array");
                  var a = Array.prototype.slice.call(e);
                  if (0 === a.length)
                      return t([]);
                  var r = a.length;
                  function o(e, s) {
                      try {
                          if (s && ("object" === (void 0 === s ? "undefined" : n(s)) || "function" == typeof s)) {
                              var l = s.then;
                              if ("function" == typeof l)
                                  return void l.call(s, function(t) {
                                      o(e, t)
                                  }, i)
                          }
                          a[e] = s,
                          0 == --r && t(a)
                      } catch (e) {
                          i(e)
                      }
                  }
                  for (var s = 0; s < a.length; s++)
                      o(s, a[s])
              }
              )
          }
          ,
          r.resolve = function(e) {
              return e && "object" === (void 0 === e ? "undefined" : n(e)) && e.constructor === r ? e : new r(function(t) {
                  t(e)
              }
              )
          }
          ,
          r.reject = function(e) {
              return new r(function(t, n) {
                  n(e)
              }
              )
          }
          ,
          r.race = function(e) {
              return new r(function(t, n) {
                  for (var i = 0, a = e.length; i < a; i++)
                      e[i].then(t, n)
              }
              )
          }
          ,
          r._immediateFn = "function" == typeof t && function(e) {
              t(e)
          }
          || function(e) {
              i(e, 0)
          }
          ,
          r._unhandledRejectionFn = function(e) {
              "undefined" != typeof console && console && console.warn("Possible Unhandled Promise Rejection:", e)
          }
          ,
          e.exports = r
      }
      ).call(this, n(35).setImmediate)
  }
  , function(e, t, n) {
      "use strict";
      Object.defineProperty(t, "__esModule", {
          value: !0
      });
      var i = function() {
          function e(e, t) {
              for (var n = 0; n < t.length; n++) {
                  var i = t[n];
                  i.enumerable = i.enumerable || !1,
                  i.configurable = !0,
                  "value"in i && (i.writable = !0),
                  Object.defineProperty(e, i.key, i)
              }
          }
          return function(t, n, i) {
              return n && e(t.prototype, n),
              i && e(t, i),
              t
          }
      }()
        , a = m(n(36))
        , r = m(n(0))
        , o = m(n(2))
        , s = m(n(18))
        , l = m(n(17))
        , u = m(n(13))
        , c = m(n(12))
        , d = m(n(11))
        , p = m(n(9))
        , h = m(n(8))
        , f = m(n(7))
        , y = m(n(6));
      function m(e) {
          return e && e.__esModule ? e : {
              default: e
          }
      }
      var v = []
        , g = function() {
          function e(t) {
              if (function(e, t) {
                  if (!(e instanceof t))
                      throw new TypeError("Cannot call a class as a function")
              }(this, e),
              this.options = (0,
              s.default)(t),
              this.container = this.options.container,
              this.paused = !0,
              this.playedPromise = a.default.resolve(),
              this.mode = "normal",
              this.randomOrder = r.default.randomOrder(this.options.audio.length),
              this.container.classList.add("aplayer"),
              this.options.lrcType && !this.options.fixed && this.container.classList.add("aplayer-withlrc"),
              this.options.audio.length > 1 && this.container.classList.add("aplayer-withlist"),
              this.container = this.options.container,
              2 === this.options.lrcType || !0 === this.options.lrcType)
                  for (var n = this.container.getElementsByClassName("aplayer-lrc-content"), i = 0; i < n.length; i++)
                      this.options.audio[i] && (this.options.audio[i].lrc = n[i].innerHTML);
              this.template = new l.default({
                  container: this.container,
                  options: this.options,
                  randomOrder: this.randomOrder
              }),
              this.options.fixed && (this.container.classList.add("aplayer-fixed"),
              this.template.body.style.width = this.template.body.offsetWidth - 18 + "px"),
              this.options.mini && (this.setMode("mini"),
              this.template.info.style.display = "block"),
              this.template.info.offsetWidth < 200 && this.template.time.classList.add("aplayer-time-narrow"),
              this.options.lrcType && (this.lrc = new d.default({
                  container: this.template.lrc,
                  async: 3 === this.options.lrcType,
                  player: this
              })),
              this.events = new f.default,
              this.storage = new c.default(this),
              this.bar = new u.default(this.template),
              this.controller = new p.default(this),
              this.timer = new h.default(this),
              this.list = new y.default(this),
              this.initAudio(),
              this.bindEvents(),
              "random" === this.options.order ? this.list.switch(this.randomOrder[0]) : this.list.switch(0),
              this.options.autoplay && this.play(),
              v.push(this)
          }
          return i(e, [{
              key: "initAudio",
              value: function() {
                  var e = this;
                  this.audio = document.createElement("audio"),
                  this.audio.preload = this.options.preload;
                  for (var t = function(t) {
                      e.audio.addEventListener(e.events.audioEvents[t], function(n) {
                          e.events.trigger(e.events.audioEvents[t], n)
                      })
                  }, n = 0; n < this.events.audioEvents.length; n++)
                      t(n);
                  this.volume(this.storage.get("volume"), !0)
              }
          }, {
              key: "bindEvents",
              value: function() {
                  var e = this;
                  this.on("play", function() {
                      e.paused && e.setUIPlaying()
                  }),
                  this.on("pause", function() {
                      e.paused || e.setUIPaused()
                  }),
                  this.on("timeupdate", function() {
                      if (!e.disableTimeupdate) {
                          e.bar.set("played", e.audio.currentTime / e.duration, "width"),
                          e.lrc && e.lrc.update();
                          var t = r.default.secondToTime(e.audio.currentTime);
                          e.template.ptime.innerHTML !== t && (e.template.ptime.innerHTML = t)
                      }
                  }),
                  this.on("durationchange", function() {
                      1 !== e.duration && (e.template.dtime.innerHTML = r.default.secondToTime(e.duration))
                  }),
                  this.on("progress", function() {
                      var t = e.audio.buffered.length ? e.audio.buffered.end(e.audio.buffered.length - 1) / e.duration : 0;
                      e.bar.set("loaded", t, "width")
                  });
                  var t = void 0;
                  this.on("error", function() {
                      e.list.audios.length > 1 ? (e.notice("An audio error has occurred, player will skip forward in 2 seconds."),
                      t = setTimeout(function() {
                          e.skipForward(),
                          e.paused || e.play()
                      }, 2e3)) : 1 === e.list.audios.length && e.notice("An audio error has occurred.")
                  }),
                  this.events.on("listswitch", function() {
                      t && clearTimeout(t)
                  }),
                  this.on("ended", function() {
                      "none" === e.options.loop ? "list" === e.options.order ? e.list.index < e.list.audios.length - 1 ? (e.list.switch((e.list.index + 1) % e.list.audios.length),
                      e.play()) : (e.list.switch((e.list.index + 1) % e.list.audios.length),
                      e.pause()) : "random" === e.options.order && (e.randomOrder.indexOf(e.list.index) < e.randomOrder.length - 1 ? (e.list.switch(e.nextIndex()),
                      e.play()) : (e.list.switch(e.nextIndex()),
                      e.pause())) : "one" === e.options.loop ? (e.list.switch(e.list.index),
                      e.play()) : "all" === e.options.loop && (e.skipForward(),
                      e.play())
                  })
              }
          }, {
              key: "setAudio",
              value: function(e) {
                  this.hls && (this.hls.destroy(),
                  this.hls = null);
                  var t = e.type;
                  this.options.customAudioType && this.options.customAudioType[t] ? "[object Function]" === Object.prototype.toString.call(this.options.customAudioType[t]) ? this.options.customAudioType[t](this.audio, e, this) : console.error("Illegal customType: " + t) : (t && "auto" !== t || (t = /m3u8(#|\?|$)/i.exec(e.url) ? "hls" : "normal"),
                  "hls" === t ? Hls.isSupported() ? (this.hls = new Hls,
                  this.hls.loadSource(e.url),
                  this.hls.attachMedia(this.audio)) : this.audio.canPlayType("application/x-mpegURL") || this.audio.canPlayType("application/vnd.apple.mpegURL") ? this.audio.src = e.url : this.notice("Error: HLS is not supported.") : "normal" === t && (this.audio.src = e.url)),
                  this.seek(0),
                  this.paused || this.audio.play()
              }
          }, {
              key: "theme",
              value: function() {
                  var e = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : this.list.audios[this.list.index].theme || this.options.theme
                    , t = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : this.list.index;
                  (!(arguments.length > 2 && void 0 !== arguments[2]) || arguments[2]) && this.list.audios[t] && (this.list.audios[t].theme = e),
                  t === this.list.index && (this.template.pic.style.backgroundColor = e,
                  this.template.played.style.background = e,
                  this.template.thumb.style.background = e,
                  this.template.volume.style.background = e)
              }
          }, {
              key: "seek",
              value: function(e) {
                  e = Math.max(e, 0),
                  e = Math.min(e, this.duration),
                  this.audio.currentTime = e,
                  this.bar.set("played", e / this.duration, "width"),
                  this.template.ptime.innerHTML = r.default.secondToTime(e)
              }
          }, {
              key: "setUIPlaying",
              value: function() {
                  var e = this;
                  if (this.paused && (this.paused = !1,
                  this.template.button.classList.remove("aplayer-play"),
                  this.template.button.classList.add("aplayer-pause"),
                  this.template.button.innerHTML = "",
                  setTimeout(function() {
                      e.template.button.innerHTML = o.default.pause
                  }, 100),
                  this.template.skipPlayButton.innerHTML = o.default.pause),
                  this.timer.enable("loading"),
                  this.options.mutex)
                      for (var t = 0; t < v.length; t++)
                          this !== v[t] && v[t].pause()
              }
          }, {
              key: "play",
              value: function() {
                  var e = this;
                  this.setUIPlaying();
                  var t = this.audio.play();
                  t && t.catch(function(t) {
                      console.warn(t),
                      "NotAllowedError" === t.name && e.setUIPaused()
                  })
              }
          }, {
              key: "setUIPaused",
              value: function() {
                  var e = this;
                  this.paused || (this.paused = !0,
                  this.template.button.classList.remove("aplayer-pause"),
                  this.template.button.classList.add("aplayer-play"),
                  this.template.button.innerHTML = "",
                  setTimeout(function() {
                      e.template.button.innerHTML = o.default.play
                  }, 100),
                  this.template.skipPlayButton.innerHTML = o.default.play),
                  this.container.classList.remove("aplayer-loading"),
                  this.timer.disable("loading")
              }
          }, {
              key: "pause",
              value: function() {
                  this.setUIPaused(),
                  this.audio.pause()
              }
          }, {
              key: "switchVolumeIcon",
              value: function() {
                  this.volume() > 0 ? this.template.volumeButton.innerHTML = o.default.volume : this.template.volumeButton.innerHTML = o.default.volumeOff
              }
          }, {
              key: "volume",
              value: function(e, t) {
                  return e = parseFloat(e),
                  isNaN(e) || (e = Math.max(e, 0),
                  e = Math.min(e, 1),
                  this.bar.set("volume", e, "width"),
                  t || this.storage.set("volume", e),
                  this.audio.volume = e,
                  this.audio.muted && (this.audio.muted = !1),
                  this.switchVolumeIcon()),
                  this.audio.muted ? 0 : this.audio.volume
              }
          }, {
              key: "on",
              value: function(e, t) {
                  this.events.on(e, t)
              }
          }, {
              key: "toggle",
              value: function() {
                  this.template.button.classList.contains("aplayer-play") ? this.play() : this.template.button.classList.contains("aplayer-pause") && this.pause()
              }
          }, {
              key: "switchAudio",
              value: function(e) {
                  this.list.switch(e)
              }
          }, {
              key: "addAudio",
              value: function(e) {
                  this.list.add(e)
              }
          }, {
              key: "removeAudio",
              value: function(e) {
                  this.list.remove(e)
              }
          }, {
              key: "destroy",
              value: function() {
                  v.splice(v.indexOf(this), 1),
                  this.pause(),
                  this.container.innerHTML = "",
                  this.audio.src = "",
                  this.timer.destroy(),
                  this.events.trigger("destroy")
              }
          }, {
              key: "setMode",
              value: function() {
                  var e = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : "normal";
                  this.mode = e,
                  "mini" === e ? this.container.classList.add("aplayer-narrow") : "normal" === e && this.container.classList.remove("aplayer-narrow")
              }
          }, {
              key: "notice",
              value: function(e) {
                  var t = this
                    , n = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : 2e3
                    , i = arguments.length > 2 && void 0 !== arguments[2] ? arguments[2] : .8;
                  this.template.notice.innerHTML = e,
                  this.template.notice.style.opacity = i,
                  this.noticeTime && clearTimeout(this.noticeTime),
                  this.events.trigger("noticeshow", {
                      text: e
                  }),
                  n && (this.noticeTime = setTimeout(function() {
                      t.template.notice.style.opacity = 0,
                      t.events.trigger("noticehide")
                  }, n))
              }
          }, {
              key: "prevIndex",
              value: function() {
                  if (!(this.list.audios.length > 1))
                      return 0;
                  if ("list" === this.options.order)
                      return this.list.index - 1 < 0 ? this.list.audios.length - 1 : this.list.index - 1;
                  if ("random" === this.options.order) {
                      var e = this.randomOrder.indexOf(this.list.index);
                      return 0 === e ? this.randomOrder[this.randomOrder.length - 1] : this.randomOrder[e - 1]
                  }
              }
          }, {
              key: "nextIndex",
              value: function() {
                  if (!(this.list.audios.length > 1))
                      return 0;
                  if ("list" === this.options.order)
                      return (this.list.index + 1) % this.list.audios.length;
                  if ("random" === this.options.order) {
                      var e = this.randomOrder.indexOf(this.list.index);
                      return e === this.randomOrder.length - 1 ? this.randomOrder[0] : this.randomOrder[e + 1]
                  }
              }
          }, {
              key: "skipBack",
              value: function() {
                  this.list.switch(this.prevIndex())
              }
          }, {
              key: "skipForward",
              value: function() {
                  this.list.switch(this.nextIndex())
              }
          }, {
              key: "duration",
              get: function() {
                  return isNaN(this.audio.duration) ? 0 : this.audio.duration
              }
          }], [{
              key: "version",
              get: function() {
                  return APLAYER_VERSION
              }
          }]),
          e
      }();
      t.default = g
  }
  , , function(e, t, n) {}
  , function(e, t, n) {
      "use strict";
      Object.defineProperty(t, "__esModule", {
          value: !0
      }),
      n(39);
      var i, a = n(37), r = (i = a) && i.__esModule ? i : {
          default: i
      };
      t.default = r.default
  }
  ]).default
});
