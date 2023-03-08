!(function () {
  (this.loaded = 0),
    (this.failed = 0),
    (this.total = 0),
    (this.watch = function (a, b) {
      var c = document.querySelectorAll(a);
      if (!c.length)
        return console.log(
          "[imgStatus]: There aren't any images associated with this selector (" +
            a +
            ")!"
        );
      this.total = c.length;
      for (var d = 0; d < this.total; d++)
        isCached(c[d].src)
          ? this._setLoaded(b)
          : c[d].addEventListener
          ? (c[d].addEventListener("load", this._setLoaded.bind(this, b)),
            c[d].addEventListener("error", this._setFailed.bind(this, b)))
          : (c[d].attachEvent("onload", this._setLoaded.bind(this, b)),
            c[d].attachEvent("onerror", this._setFailed.bind(this, b)));
    }),
    (this.isCached = function (a) {
      var b = new Image();
      return (b.src = a), b.complete;
    }),
    (this._setFailed = function (a, b) {
      ++this.failed, "function" == typeof a && a(this);
    }),
    (this._setLoaded = function (a, b) {
      ++this.loaded, "function" == typeof a && a(this);
    }),
    (this.isDone = function () {
      return this.loaded + this.failed === this.total ? !0 : !1;
    }),
    "object" == typeof window && (window.imgStatus = this);
})();
