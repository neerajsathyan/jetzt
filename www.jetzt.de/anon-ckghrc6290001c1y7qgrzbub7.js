! function() {
    function e(e, n) {
        e.addEventListener("load", function() {
            function o() {
                return e.status < 400 ? null : e
            }
            var s, i = this.getResponseHeader("Content-Type"),
                r = this.responseText.trim();
            if (!i) return n(o(), this.responseText);
            if (i.match(/^application\/json/)) try {
                s = JSON.parse(this.responseText)
            } catch (e) {
                return n(e)
            } else if (t(r)) try {
                s = JSON.parse(this.responseText)
            } catch (e) {
                s = this.responseText
            } else s = this.responseText;
            return n(o(), s)
        }), e.addEventListener("abort", function(e) {
            return n(e)
        }), e.addEventListener("error", function(e) {
            return n(e)
        })
    }

    function t(e) {
        return "string" == typeof e && ["true", "false", "null", '"', "-", "[", "{", "."].some(function(t) {
            return e.substring(0, t.length) === t
        })
    }
    window.apos = window.apos || {};
    var n = window.apos;
    n.utils = n.utils || {}, n.utils.emit = function(e, t, o) {
        var s;
        try {
            s = new window.CustomEvent(t)
        } catch (e) {
            s = document.createEvent("Event"), s.initEvent(t, !0, !0)
        }
        n.utils.assign(s, o || {}), e.dispatchEvent(s)
    }, n.utils.post = function(t, o, s) {
        if (!s) {
            if (!window.Promise) throw new Error("If you wish to receive a promise from apos.utils.post in older browsers you must have a Promise polyfill.");
            return new window.Promise(function(e, s) {
                return n.utils.post(t, o, function(t, n) {
                    return t ? s(t) : e(n)
                })
            })
        }
        n.prefix && n.utils.sameSite(t) && (t = n.prefix + t);
        var i = window.FormData && o instanceof window.FormData,
            r = new XMLHttpRequest,
            a = n.csrfCookieName ? n.utils.getCookie(n.csrfCookieName) : "csrf-fallback";
        r.open("POST", t), i || r.setRequestHeader("Content-Type", "application/json"), a && r.setRequestHeader("X-XSRF-TOKEN", a), n.utils.emit(document.body, "apos-before-post", {
            uri: t,
            data: o,
            request: r
        }), i ? r.send(o) : r.send(JSON.stringify(o)), e(r, s)
    }, n.utils.get = function(t, o, s) {
        var i, r;
        if (!s) {
            if (!window.Promise) throw new Error("If you wish to receive a promise from apos.utils.get in older browsers you must have a Promise polyfill.");
            return new window.Promise(function(e, s) {
                return n.utils.get(t, o, function(t, n) {
                    return t ? s(t) : e(n)
                })
            })
        }
        if (n.prefix && n.utils.sameSite(t) && (t = n.prefix + t), null !== o && "object" == typeof o)
            for (i = Object.keys(o), r = 0; r < i.length; r++) t += r > 0 ? "&" : "?", t += encodeURIComponent(i[r]) + "=" + encodeURIComponent(o[i[r]]);
        var a = new XMLHttpRequest;
        a.open("GET", t), a.setRequestHeader("Content-Type", "application/json"), n.utils.emit(document.body, "apos-before-get", {
            uri: t,
            data: o,
            request: a
        }), a.send(JSON.stringify(o)), e(a, s)
    }, n.utils.getCookie = function(e) {
        var t = document.cookie.match(new RegExp("(^| )" + e + "=([^;]+)"));
        return t && t[2]
    }, n.utils.removeClass = function(e, t) {
        e.classList ? e.classList.remove(t) : e.className = e.className.replace(new RegExp("(^|\\b)" + t.split(" ").join("|") + "(\\b|$)", "gi"), " ")
    }, n.utils.addClass = function(e, t) {
        e.classList ? e.classList.add(t) : e.className += " " + t
    }, n.utils.closest = function(e, t) {
        return e.closest ? e.closest(t) : (Element.prototype.matches || (Element.prototype.matches = Element.prototype.msMatchesSelector || Element.prototype.webkitMatchesSelector), Element.prototype.closest = function(e) {
            var t = this;
            if (!document.documentElement.contains(t)) return null;
            do {
                if (t.matches(e)) return t;
                t = t.parentElement || t.parentNode
            } while (null !== t && 1 === t.nodeType);
            return null
        }, e.closest(t))
    }, n.utils.assign = function(e, t) {
        if (Object.assign) return Object.assign.apply(Object, arguments);
        var n, o, s, i;
        for (n = 1; n < arguments.length; n++)
            for (s = Object.keys(arguments[n]), o = 0; o < s.length; o++) i = s[o], e[i] = arguments[n][i];
        return e
    }, n.utils.widgetPlayers = {}, n.utils.onReady = function(e) {
        "loading" !== document.readyState ? setTimeout(e, 0) : document.addEventListener ? document.addEventListener("DOMContentLoaded", e) : document.attachEvent("onreadystatechange", function() {
            "loading" !== document.readyState && e()
        })
    }, n.utils.runPlayers = function(e) {
        function t(e) {
            if (!e.getAttribute("data-apos-played")) {
                var t = JSON.parse(e.getAttribute("data")),
                    o = JSON.parse(e.getAttribute("data-options"));
                e.setAttribute("data-apos-played", "1");
                var s = n.utils.widgetPlayers[t.type] || n.lean && n.lean.widgetPlayers && n.lean.widgetPlayers[t.type];
                s && s(e, t, o)
            }
        }
        var o, s = (e || document).querySelectorAll("[data-apos-widget]");
        for (e && e.getAttribute("data-apos-widget") && t(e), o = 0; o < s.length; o++) t(s[o])
    }, n.utils.onReady(function() {
        n.utils.runPlayers()
    }), n.on && n.on("enhance", function(e) {
        n.utils.runPlayers(e[0])
    }), n.utils.attachmentUrl = function(e, t) {
        var o = n.uploadsUrl + "/attachments/" + e._id + "-" + e.name;
        t || (t = {});
        var s;
        t.crop && t.crop.width ? s = t.crop : e.crop && e.crop.width && (s = e.crop), s && (o += "." + s.left + "." + s.top + "." + s.width + "." + s.height);
        var i;
        return i = !(!t.size || "original" === t.size) && t.size, i && (o += "." + i), o + "." + e.extension
    }, n.utils.sameSite = function(e) {
        var t = e.match(/^(https?:)?\/\/([^\/]+)/);
        return !t || window.location.host === t[2]
    }
}();
apos.utils.widgetPlayers["apostrophe-video"] = function(e, t, s) {
    function o(e, t) {
        return apos.utils.get("/modules/apostrophe-oembed/query", e, t)
    }

    function i(e, t) {
        var s = document.createElement("div");
        s.innerHTML = t.html;
        var o = s.firstChild;
        e.innerHTML = "", o && (o.removeAttribute("width"), o.removeAttribute("height"), e.appendChild(o), apos.utils.onReady(function() {
            var e = apos.utils.closest(o, "[data-apos-video-player]");
            t.width && t.height && (o.style.height = t.height / t.width * e.offsetWidth + "px", o.style.width = e.offsetWidth + "px")
        }))
    }

    function a(t) {
        apos.utils.removeClass(e, "apos-oembed-busy"), apos.utils.addClass(e, "apos-oembed-invalid"), e.innerHTML = "undefined" !== t ? "Ⓧ" : ""
    }! function(e, t) {
        apos.utils.removeClass(e, "apos-oembed-invalid"), apos.utils.addClass(e, "apos-oembed-busy"), t.url ? o(t, function(s, o) {
            return s || t.type && o.type !== t.type ? a(s || "inappropriate") : (apos.utils.removeClass(e, "apos-oembed-busy"), i(e, o))
        }) : a("undefined")
    }(e.querySelector("[data-apos-video-player]"), apos.utils.assign(t.video, {
        neverOpenGraph: 1
    }))
};
/*! For license information please see site.js.LICENSE.txt */
! function(e) {
    var t = {};

    function n(r) {
        if (t[r]) return t[r].exports;
        var o = t[r] = {
            i: r,
            l: !1,
            exports: {}
        };
        return e[r].call(o.exports, o, o.exports, n), o.l = !0, o.exports
    }
    n.m = e, n.c = t, n.d = function(e, t, r) {
        n.o(e, t) || Object.defineProperty(e, t, {
            enumerable: !0,
            get: r
        })
    }, n.r = function(e) {
        "undefined" != typeof Symbol && Symbol.toStringTag && Object.defineProperty(e, Symbol.toStringTag, {
            value: "Module"
        }), Object.defineProperty(e, "__esModule", {
            value: !0
        })
    }, n.t = function(e, t) {
        if (1 & t && (e = n(e)), 8 & t) return e;
        if (4 & t && "object" == typeof e && e && e.__esModule) return e;
        var r = Object.create(null);
        if (n.r(r), Object.defineProperty(r, "default", {
                enumerable: !0,
                value: e
            }), 2 & t && "string" != typeof e)
            for (var o in e) n.d(r, o, function(t) {
                return e[t]
            }.bind(null, o));
        return r
    }, n.n = function(e) {
        var t = e && e.__esModule ? function() {
            return e.default
        } : function() {
            return e
        };
        return n.d(t, "a", t), t
    }, n.o = function(e, t) {
        return Object.prototype.hasOwnProperty.call(e, t)
    }, n.p = "", n(n.s = 145)
}([function(e, t, n) {
    (function(t) {
        var n = function(e) {
            return e && e.Math == Math && e
        };
        e.exports = n("object" == typeof globalThis && globalThis) || n("object" == typeof window && window) || n("object" == typeof self && self) || n("object" == typeof t && t) || Function("return this")()
    }).call(this, n(30))
}, function(e, t, n) {
    var r = n(0),
        o = n(49),
        i = n(4),
        a = n(50),
        c = n(53),
        s = n(79),
        u = o("wks"),
        f = r.Symbol,
        l = s ? f : f && f.withoutSetter || a;
    e.exports = function(e) {
        return i(u, e) || (c && i(f, e) ? u[e] = f[e] : u[e] = l("Symbol." + e)), u[e]
    }
}, function(e, t) {
    e.exports = function(e) {
        try {
            return !!e()
        } catch (e) {
            return !0
        }
    }
}, function(e, t, n) {
    var r = n(0),
        o = n(15).f,
        i = n(9),
        a = n(11),
        c = n(47),
        s = n(72),
        u = n(78);
    e.exports = function(e, t) {
        var n, f, l, d, p, h = e.target,
            v = e.global,
            m = e.stat;
        if (n = v ? r : m ? r[h] || c(h, {}) : (r[h] || {}).prototype)
            for (f in t) {
                if (d = t[f], l = e.noTargetGet ? (p = o(n, f)) && p.value : n[f], !u(v ? f : h + (m ? "." : "#") + f, e.forced) && void 0 !== l) {
                    if (typeof d == typeof l) continue;
                    s(d, l)
                }(e.sham || l && l.sham) && i(d, "sham", !0), a(n, f, d, e)
            }
    }
}, function(e, t) {
    var n = {}.hasOwnProperty;
    e.exports = function(e, t) {
        return n.call(e, t)
    }
}, function(e, t, n) {
    var r = n(7);
    e.exports = function(e) {
        if (!r(e)) throw TypeError(String(e) + " is not an object");
        return e
    }
}, function(e, t, n) {
    var r = n(2);
    e.exports = !r((function() {
        return 7 != Object.defineProperty({}, 1, {
            get: function() {
                return 7
            }
        })[1]
    }))
}, function(e, t) {
    e.exports = function(e) {
        return "object" == typeof e ? null !== e : "function" == typeof e
    }
}, function(e, t, n) {
    var r = n(6),
        o = n(70),
        i = n(5),
        a = n(31),
        c = Object.defineProperty;
    t.f = r ? c : function(e, t, n) {
        if (i(e), t = a(t, !0), i(n), o) try {
            return c(e, t, n)
        } catch (e) {}
        if ("get" in n || "set" in n) throw TypeError("Accessors not supported");
        return "value" in n && (e[t] = n.value), e
    }
}, function(e, t, n) {
    var r = n(6),
        o = n(8),
        i = n(20);
    e.exports = r ? function(e, t, n) {
        return o.f(e, t, i(1, n))
    } : function(e, t, n) {
        return e[t] = n, e
    }
}, function(e, t, n) {
    var r = n(69),
        o = n(21);
    e.exports = function(e) {
        return r(o(e))
    }
}, function(e, t, n) {
    var r = n(0),
        o = n(9),
        i = n(4),
        a = n(47),
        c = n(48),
        s = n(22),
        u = s.get,
        f = s.enforce,
        l = String(String).split("String");
    (e.exports = function(e, t, n, c) {
        var s = !!c && !!c.unsafe,
            u = !!c && !!c.enumerable,
            d = !!c && !!c.noTargetGet;
        "function" == typeof n && ("string" != typeof t || i(n, "name") || o(n, "name", t), f(n).source = l.join("string" == typeof t ? t : "")), e !== r ? (s ? !d && e[t] && (u = !0) : delete e[t], u ? e[t] = n : o(e, t, n)) : u ? e[t] = n : a(t, n)
    })(Function.prototype, "toString", (function() {
        return "function" == typeof this && u(this).source || c(this)
    }))
}, function(e, t) {
    var n = {}.toString;
    e.exports = function(e) {
        return n.call(e).slice(8, -1)
    }
}, function(e, t, n) {
    var r = n(34),
        o = Math.min;
    e.exports = function(e) {
        return e > 0 ? o(r(e), 9007199254740991) : 0
    }
}, function(e, t, n) {
    var r = n(21);
    e.exports = function(e) {
        return Object(r(e))
    }
}, function(e, t, n) {
    var r = n(6),
        o = n(68),
        i = n(20),
        a = n(10),
        c = n(31),
        s = n(4),
        u = n(70),
        f = Object.getOwnPropertyDescriptor;
    t.f = r ? f : function(e, t) {
        if (e = a(e), t = c(t, !0), u) try {
            return f(e, t)
        } catch (e) {}
        if (s(e, t)) return i(!o.f.call(e, t), e[t])
    }
}, function(e, t, n) {
    var r = n(74),
        o = n(0),
        i = function(e) {
            return "function" == typeof e ? e : void 0
        };
    e.exports = function(e, t) {
        return arguments.length < 2 ? i(r[e]) || i(o[e]) : r[e] && r[e][t] || o[e] && o[e][t]
    }
}, function(e, t, n) {
    "use strict";
    var r = n(3),
        o = n(84);
    r({
        target: "Array",
        proto: !0,
        forced: [].forEach != o
    }, {
        forEach: o
    })
}, function(e, t, n) {
    var r = n(0),
        o = n(101),
        i = n(84),
        a = n(9);
    for (var c in o) {
        var s = r[c],
            u = s && s.prototype;
        if (u && u.forEach !== i) try {
            a(u, "forEach", i)
        } catch (e) {
            u.forEach = i
        }
    }
}, function(e, t, n) {
    (function(t) {
        e.exports = function e(t, n, r) {
            function o(a, c) {
                if (!n[a]) {
                    if (!t[a]) {
                        if (i) return i(a, !0);
                        var s = new Error("Cannot find module '" + a + "'");
                        throw s.code = "MODULE_NOT_FOUND", s
                    }
                    var u = n[a] = {
                        exports: {}
                    };
                    t[a][0].call(u.exports, (function(e) {
                        var n = t[a][1][e];
                        return o(n || e)
                    }), u, u.exports, e, t, n, r)
                }
                return n[a].exports
            }
            for (var i = !1, a = 0; a < r.length; a++) o(r[a]);
            return o
        }({
            1: [function(e, n, r) {
                (function(e) {
                    "use strict";
                    var t, r, o = e.MutationObserver || e.WebKitMutationObserver;
                    if (o) {
                        var i = 0,
                            a = new o(f),
                            c = e.document.createTextNode("");
                        a.observe(c, {
                            characterData: !0
                        }), t = function() {
                            c.data = i = ++i % 2
                        }
                    } else if (e.setImmediate || void 0 === e.MessageChannel) t = "document" in e && "onreadystatechange" in e.document.createElement("script") ? function() {
                        var t = e.document.createElement("script");
                        t.onreadystatechange = function() {
                            f(), t.onreadystatechange = null, t.parentNode.removeChild(t), t = null
                        }, e.document.documentElement.appendChild(t)
                    } : function() {
                        setTimeout(f, 0)
                    };
                    else {
                        var s = new e.MessageChannel;
                        s.port1.onmessage = f, t = function() {
                            s.port2.postMessage(0)
                        }
                    }
                    var u = [];

                    function f() {
                        var e, t;
                        r = !0;
                        for (var n = u.length; n;) {
                            for (t = u, u = [], e = -1; ++e < n;) t[e]();
                            n = u.length
                        }
                        r = !1
                    }
                    n.exports = function(e) {
                        1 !== u.push(e) || r || t()
                    }
                }).call(this, void 0 !== t ? t : "undefined" != typeof self ? self : "undefined" != typeof window ? window : {})
            }, {}],
            2: [function(e, t, n) {
                "use strict";
                var r = e(1);

                function o() {}
                var i = {},
                    a = ["REJECTED"],
                    c = ["FULFILLED"],
                    s = ["PENDING"];

                function u(e) {
                    if ("function" != typeof e) throw new TypeError("resolver must be a function");
                    this.state = s, this.queue = [], this.outcome = void 0, e !== o && p(this, e)
                }

                function f(e, t, n) {
                    this.promise = e, "function" == typeof t && (this.onFulfilled = t, this.callFulfilled = this.otherCallFulfilled), "function" == typeof n && (this.onRejected = n, this.callRejected = this.otherCallRejected)
                }

                function l(e, t, n) {
                    r((function() {
                        var r;
                        try {
                            r = t(n)
                        } catch (t) {
                            return i.reject(e, t)
                        }
                        r === e ? i.reject(e, new TypeError("Cannot resolve promise with itself")) : i.resolve(e, r)
                    }))
                }

                function d(e) {
                    var t = e && e.then;
                    if (e && ("object" == typeof e || "function" == typeof e) && "function" == typeof t) return function() {
                        t.apply(e, arguments)
                    }
                }

                function p(e, t) {
                    var n = !1;

                    function r(t) {
                        n || (n = !0, i.reject(e, t))
                    }

                    function o(t) {
                        n || (n = !0, i.resolve(e, t))
                    }
                    var a = h((function() {
                        t(o, r)
                    }));
                    "error" === a.status && r(a.value)
                }

                function h(e, t) {
                    var n = {};
                    try {
                        n.value = e(t), n.status = "success"
                    } catch (e) {
                        n.status = "error", n.value = e
                    }
                    return n
                }
                t.exports = u, u.prototype.catch = function(e) {
                    return this.then(null, e)
                }, u.prototype.then = function(e, t) {
                    if ("function" != typeof e && this.state === c || "function" != typeof t && this.state === a) return this;
                    var n = new this.constructor(o);
                    return this.state !== s ? l(n, this.state === c ? e : t, this.outcome) : this.queue.push(new f(n, e, t)), n
                }, f.prototype.callFulfilled = function(e) {
                    i.resolve(this.promise, e)
                }, f.prototype.otherCallFulfilled = function(e) {
                    l(this.promise, this.onFulfilled, e)
                }, f.prototype.callRejected = function(e) {
                    i.reject(this.promise, e)
                }, f.prototype.otherCallRejected = function(e) {
                    l(this.promise, this.onRejected, e)
                }, i.resolve = function(e, t) {
                    var n = h(d, t);
                    if ("error" === n.status) return i.reject(e, n.value);
                    var r = n.value;
                    if (r) p(e, r);
                    else {
                        e.state = c, e.outcome = t;
                        for (var o = -1, a = e.queue.length; ++o < a;) e.queue[o].callFulfilled(t)
                    }
                    return e
                }, i.reject = function(e, t) {
                    e.state = a, e.outcome = t;
                    for (var n = -1, r = e.queue.length; ++n < r;) e.queue[n].callRejected(t);
                    return e
                }, u.resolve = function(e) {
                    return e instanceof this ? e : i.resolve(new this(o), e)
                }, u.reject = function(e) {
                    var t = new this(o);
                    return i.reject(t, e)
                }, u.all = function(e) {
                    var t = this;
                    if ("[object Array]" !== Object.prototype.toString.call(e)) return this.reject(new TypeError("must be an array"));
                    var n = e.length,
                        r = !1;
                    if (!n) return this.resolve([]);
                    for (var a = new Array(n), c = 0, s = -1, u = new this(o); ++s < n;) f(e[s], s);
                    return u;

                    function f(e, o) {
                        t.resolve(e).then((function(e) {
                            a[o] = e, ++c !== n || r || (r = !0, i.resolve(u, a))
                        }), (function(e) {
                            r || (r = !0, i.reject(u, e))
                        }))
                    }
                }, u.race = function(e) {
                    var t = this;
                    if ("[object Array]" !== Object.prototype.toString.call(e)) return this.reject(new TypeError("must be an array"));
                    var n = e.length,
                        r = !1;
                    if (!n) return this.resolve([]);
                    for (var a, c = -1, s = new this(o); ++c < n;) a = e[c], t.resolve(a).then((function(e) {
                        r || (r = !0, i.resolve(s, e))
                    }), (function(e) {
                        r || (r = !0, i.reject(s, e))
                    }));
                    return s
                }
            }, {
                1: 1
            }],
            3: [function(e, n, r) {
                (function(t) {
                    "use strict";
                    "function" != typeof t.Promise && (t.Promise = e(2))
                }).call(this, void 0 !== t ? t : "undefined" != typeof self ? self : "undefined" != typeof window ? window : {})
            }, {
                2: 2
            }],
            4: [function(e, t, n) {
                "use strict";
                var r = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function(e) {
                        return typeof e
                    } : function(e) {
                        return e && "function" == typeof Symbol && e.constructor === Symbol && e !== Symbol.prototype ? "symbol" : typeof e
                    },
                    o = function() {
                        try {
                            if ("undefined" != typeof indexedDB) return indexedDB;
                            if ("undefined" != typeof webkitIndexedDB) return webkitIndexedDB;
                            if ("undefined" != typeof mozIndexedDB) return mozIndexedDB;
                            if ("undefined" != typeof OIndexedDB) return OIndexedDB;
                            if ("undefined" != typeof msIndexedDB) return msIndexedDB
                        } catch (e) {
                            return
                        }
                    }();

                function i(e, t) {
                    e = e || [], t = t || {};
                    try {
                        return new Blob(e, t)
                    } catch (o) {
                        if ("TypeError" !== o.name) throw o;
                        for (var n = new("undefined" != typeof BlobBuilder ? BlobBuilder : "undefined" != typeof MSBlobBuilder ? MSBlobBuilder : "undefined" != typeof MozBlobBuilder ? MozBlobBuilder : WebKitBlobBuilder), r = 0; r < e.length; r += 1) n.append(e[r]);
                        return n.getBlob(t.type)
                    }
                }
                "undefined" == typeof Promise && e(3);
                var a = Promise;

                function c(e, t) {
                    t && e.then((function(e) {
                        t(null, e)
                    }), (function(e) {
                        t(e)
                    }))
                }

                function s(e, t, n) {
                    "function" == typeof t && e.then(t), "function" == typeof n && e.catch(n)
                }

                function u(e) {
                    return "string" != typeof e && (console.warn(e + " used as a key, but it is not a string."), e = String(e)), e
                }

                function f() {
                    if (arguments.length && "function" == typeof arguments[arguments.length - 1]) return arguments[arguments.length - 1]
                }
                var l = void 0,
                    d = {},
                    p = Object.prototype.toString;

                function h(e) {
                    return "boolean" == typeof l ? a.resolve(l) : function(e) {
                        return new a((function(t) {
                            var n = e.transaction("local-forage-detect-blob-support", "readwrite"),
                                r = i([""]);
                            n.objectStore("local-forage-detect-blob-support").put(r, "key"), n.onabort = function(e) {
                                e.preventDefault(), e.stopPropagation(), t(!1)
                            }, n.oncomplete = function() {
                                var e = navigator.userAgent.match(/Chrome\/(\d+)/),
                                    n = navigator.userAgent.match(/Edge\//);
                                t(n || !e || parseInt(e[1], 10) >= 43)
                            }
                        })).catch((function() {
                            return !1
                        }))
                    }(e).then((function(e) {
                        return l = e
                    }))
                }

                function v(e) {
                    var t = d[e.name],
                        n = {};
                    n.promise = new a((function(e, t) {
                        n.resolve = e, n.reject = t
                    })), t.deferredOperations.push(n), t.dbReady ? t.dbReady = t.dbReady.then((function() {
                        return n.promise
                    })) : t.dbReady = n.promise
                }

                function m(e) {
                    var t = d[e.name].deferredOperations.pop();
                    if (t) return t.resolve(), t.promise
                }

                function g(e, t) {
                    var n = d[e.name].deferredOperations.pop();
                    if (n) return n.reject(t), n.promise
                }

                function y(e, t) {
                    return new a((function(n, r) {
                        if (d[e.name] = d[e.name] || {
                                forages: [],
                                db: null,
                                dbReady: null,
                                deferredOperations: []
                            }, e.db) {
                            if (!t) return n(e.db);
                            v(e), e.db.close()
                        }
                        var i = [e.name];
                        t && i.push(e.version);
                        var a = o.open.apply(o, i);
                        t && (a.onupgradeneeded = function(t) {
                            var n = a.result;
                            try {
                                n.createObjectStore(e.storeName), t.oldVersion <= 1 && n.createObjectStore("local-forage-detect-blob-support")
                            } catch (n) {
                                if ("ConstraintError" !== n.name) throw n;
                                console.warn('The database "' + e.name + '" has been upgraded from version ' + t.oldVersion + " to version " + t.newVersion + ', but the storage "' + e.storeName + '" already exists.')
                            }
                        }), a.onerror = function(e) {
                            e.preventDefault(), r(a.error)
                        }, a.onsuccess = function() {
                            n(a.result), m(e)
                        }
                    }))
                }

                function b(e) {
                    return y(e, !1)
                }

                function w(e) {
                    return y(e, !0)
                }

                function _(e, t) {
                    if (!e.db) return !0;
                    var n = !e.db.objectStoreNames.contains(e.storeName),
                        r = e.version < e.db.version,
                        o = e.version > e.db.version;
                    if (r && (e.version !== t && console.warn('The database "' + e.name + "\" can't be downgraded from version " + e.db.version + " to version " + e.version + "."), e.version = e.db.version), o || n) {
                        if (n) {
                            var i = e.db.version + 1;
                            i > e.version && (e.version = i)
                        }
                        return !0
                    }
                    return !1
                }

                function S(e) {
                    return i([function(e) {
                        for (var t = e.length, n = new ArrayBuffer(t), r = new Uint8Array(n), o = 0; o < t; o++) r[o] = e.charCodeAt(o);
                        return n
                    }(atob(e.data))], {
                        type: e.type
                    })
                }

                function x(e) {
                    return e && e.__local_forage_encoded_blob
                }

                function E(e) {
                    var t = this,
                        n = t._initReady().then((function() {
                            var e = d[t._dbInfo.name];
                            if (e && e.dbReady) return e.dbReady
                        }));
                    return s(n, e, e), n
                }

                function k(e, t, n, r) {
                    void 0 === r && (r = 1);
                    try {
                        var o = e.db.transaction(e.storeName, t);
                        n(null, o)
                    } catch (o) {
                        if (r > 0 && (!e.db || "InvalidStateError" === o.name || "NotFoundError" === o.name)) return a.resolve().then((function() {
                            if (!e.db || "NotFoundError" === o.name && !e.db.objectStoreNames.contains(e.storeName) && e.version <= e.db.version) return e.db && (e.version = e.db.version + 1), w(e)
                        })).then((function() {
                            return function(e) {
                                v(e);
                                for (var t = d[e.name], n = t.forages, r = 0; r < n.length; r++) {
                                    var o = n[r];
                                    o._dbInfo.db && (o._dbInfo.db.close(), o._dbInfo.db = null)
                                }
                                return e.db = null, b(e).then((function(t) {
                                    return e.db = t, _(e) ? w(e) : t
                                })).then((function(r) {
                                    e.db = t.db = r;
                                    for (var o = 0; o < n.length; o++) n[o]._dbInfo.db = r
                                })).catch((function(t) {
                                    throw g(e, t), t
                                }))
                            }(e).then((function() {
                                k(e, t, n, r - 1)
                            }))
                        })).catch(n);
                        n(o)
                    }
                }
                var O = {
                        _driver: "asyncStorage",
                        _initStorage: function(e) {
                            var t = this,
                                n = {
                                    db: null
                                };
                            if (e)
                                for (var r in e) n[r] = e[r];
                            var o = d[n.name];
                            o || (o = {
                                forages: [],
                                db: null,
                                dbReady: null,
                                deferredOperations: []
                            }, d[n.name] = o), o.forages.push(t), t._initReady || (t._initReady = t.ready, t.ready = E);
                            var i = [];

                            function c() {
                                return a.resolve()
                            }
                            for (var s = 0; s < o.forages.length; s++) {
                                var u = o.forages[s];
                                u !== t && i.push(u._initReady().catch(c))
                            }
                            var f = o.forages.slice(0);
                            return a.all(i).then((function() {
                                return n.db = o.db, b(n)
                            })).then((function(e) {
                                return n.db = e, _(n, t._defaultConfig.version) ? w(n) : e
                            })).then((function(e) {
                                n.db = o.db = e, t._dbInfo = n;
                                for (var r = 0; r < f.length; r++) {
                                    var i = f[r];
                                    i !== t && (i._dbInfo.db = n.db, i._dbInfo.version = n.version)
                                }
                            }))
                        },
                        _support: function() {
                            try {
                                if (!o || !o.open) return !1;
                                var e = "undefined" != typeof openDatabase && /(Safari|iPhone|iPad|iPod)/.test(navigator.userAgent) && !/Chrome/.test(navigator.userAgent) && !/BlackBerry/.test(navigator.platform),
                                    t = "function" == typeof fetch && -1 !== fetch.toString().indexOf("[native code");
                                return (!e || t) && "undefined" != typeof indexedDB && "undefined" != typeof IDBKeyRange
                            } catch (e) {
                                return !1
                            }
                        }(),
                        iterate: function(e, t) {
                            var n = this,
                                r = new a((function(t, r) {
                                    n.ready().then((function() {
                                        k(n._dbInfo, "readonly", (function(o, i) {
                                            if (o) return r(o);
                                            try {
                                                var a = i.objectStore(n._dbInfo.storeName).openCursor(),
                                                    c = 1;
                                                a.onsuccess = function() {
                                                    var n = a.result;
                                                    if (n) {
                                                        var r = n.value;
                                                        x(r) && (r = S(r));
                                                        var o = e(r, n.key, c++);
                                                        void 0 !== o ? t(o) : n.continue()
                                                    } else t()
                                                }, a.onerror = function() {
                                                    r(a.error)
                                                }
                                            } catch (e) {
                                                r(e)
                                            }
                                        }))
                                    })).catch(r)
                                }));
                            return c(r, t), r
                        },
                        getItem: function(e, t) {
                            var n = this;
                            e = u(e);
                            var r = new a((function(t, r) {
                                n.ready().then((function() {
                                    k(n._dbInfo, "readonly", (function(o, i) {
                                        if (o) return r(o);
                                        try {
                                            var a = i.objectStore(n._dbInfo.storeName).get(e);
                                            a.onsuccess = function() {
                                                var e = a.result;
                                                void 0 === e && (e = null), x(e) && (e = S(e)), t(e)
                                            }, a.onerror = function() {
                                                r(a.error)
                                            }
                                        } catch (e) {
                                            r(e)
                                        }
                                    }))
                                })).catch(r)
                            }));
                            return c(r, t), r
                        },
                        setItem: function(e, t, n) {
                            var r = this;
                            e = u(e);
                            var o = new a((function(n, o) {
                                var i;
                                r.ready().then((function() {
                                    return i = r._dbInfo, "[object Blob]" === p.call(t) ? h(i.db).then((function(e) {
                                        return e ? t : (n = t, new a((function(e, t) {
                                            var r = new FileReader;
                                            r.onerror = t, r.onloadend = function(t) {
                                                var r = btoa(t.target.result || "");
                                                e({
                                                    __local_forage_encoded_blob: !0,
                                                    data: r,
                                                    type: n.type
                                                })
                                            }, r.readAsBinaryString(n)
                                        })));
                                        var n
                                    })) : t
                                })).then((function(t) {
                                    k(r._dbInfo, "readwrite", (function(i, a) {
                                        if (i) return o(i);
                                        try {
                                            var c = a.objectStore(r._dbInfo.storeName);
                                            null === t && (t = void 0);
                                            var s = c.put(t, e);
                                            a.oncomplete = function() {
                                                void 0 === t && (t = null), n(t)
                                            }, a.onabort = a.onerror = function() {
                                                var e = s.error ? s.error : s.transaction.error;
                                                o(e)
                                            }
                                        } catch (e) {
                                            o(e)
                                        }
                                    }))
                                })).catch(o)
                            }));
                            return c(o, n), o
                        },
                        removeItem: function(e, t) {
                            var n = this;
                            e = u(e);
                            var r = new a((function(t, r) {
                                n.ready().then((function() {
                                    k(n._dbInfo, "readwrite", (function(o, i) {
                                        if (o) return r(o);
                                        try {
                                            var a = i.objectStore(n._dbInfo.storeName).delete(e);
                                            i.oncomplete = function() {
                                                t()
                                            }, i.onerror = function() {
                                                r(a.error)
                                            }, i.onabort = function() {
                                                var e = a.error ? a.error : a.transaction.error;
                                                r(e)
                                            }
                                        } catch (e) {
                                            r(e)
                                        }
                                    }))
                                })).catch(r)
                            }));
                            return c(r, t), r
                        },
                        clear: function(e) {
                            var t = this,
                                n = new a((function(e, n) {
                                    t.ready().then((function() {
                                        k(t._dbInfo, "readwrite", (function(r, o) {
                                            if (r) return n(r);
                                            try {
                                                var i = o.objectStore(t._dbInfo.storeName).clear();
                                                o.oncomplete = function() {
                                                    e()
                                                }, o.onabort = o.onerror = function() {
                                                    var e = i.error ? i.error : i.transaction.error;
                                                    n(e)
                                                }
                                            } catch (e) {
                                                n(e)
                                            }
                                        }))
                                    })).catch(n)
                                }));
                            return c(n, e), n
                        },
                        length: function(e) {
                            var t = this,
                                n = new a((function(e, n) {
                                    t.ready().then((function() {
                                        k(t._dbInfo, "readonly", (function(r, o) {
                                            if (r) return n(r);
                                            try {
                                                var i = o.objectStore(t._dbInfo.storeName).count();
                                                i.onsuccess = function() {
                                                    e(i.result)
                                                }, i.onerror = function() {
                                                    n(i.error)
                                                }
                                            } catch (e) {
                                                n(e)
                                            }
                                        }))
                                    })).catch(n)
                                }));
                            return c(n, e), n
                        },
                        key: function(e, t) {
                            var n = this,
                                r = new a((function(t, r) {
                                    e < 0 ? t(null) : n.ready().then((function() {
                                        k(n._dbInfo, "readonly", (function(o, i) {
                                            if (o) return r(o);
                                            try {
                                                var a = i.objectStore(n._dbInfo.storeName),
                                                    c = !1,
                                                    s = a.openKeyCursor();
                                                s.onsuccess = function() {
                                                    var n = s.result;
                                                    n ? 0 === e || c ? t(n.key) : (c = !0, n.advance(e)) : t(null)
                                                }, s.onerror = function() {
                                                    r(s.error)
                                                }
                                            } catch (e) {
                                                r(e)
                                            }
                                        }))
                                    })).catch(r)
                                }));
                            return c(r, t), r
                        },
                        keys: function(e) {
                            var t = this,
                                n = new a((function(e, n) {
                                    t.ready().then((function() {
                                        k(t._dbInfo, "readonly", (function(r, o) {
                                            if (r) return n(r);
                                            try {
                                                var i = o.objectStore(t._dbInfo.storeName).openKeyCursor(),
                                                    a = [];
                                                i.onsuccess = function() {
                                                    var t = i.result;
                                                    t ? (a.push(t.key), t.continue()) : e(a)
                                                }, i.onerror = function() {
                                                    n(i.error)
                                                }
                                            } catch (e) {
                                                n(e)
                                            }
                                        }))
                                    })).catch(n)
                                }));
                            return c(n, e), n
                        },
                        dropInstance: function(e, t) {
                            t = f.apply(this, arguments);
                            var n = this.config();
                            (e = "function" != typeof e && e || {}).name || (e.name = e.name || n.name, e.storeName = e.storeName || n.storeName);
                            var r, i = this;
                            if (e.name) {
                                var s = e.name === n.name && i._dbInfo.db,
                                    u = s ? a.resolve(i._dbInfo.db) : b(e).then((function(t) {
                                        var n = d[e.name],
                                            r = n.forages;
                                        n.db = t;
                                        for (var o = 0; o < r.length; o++) r[o]._dbInfo.db = t;
                                        return t
                                    }));
                                r = e.storeName ? u.then((function(t) {
                                    if (t.objectStoreNames.contains(e.storeName)) {
                                        var n = t.version + 1;
                                        v(e);
                                        var r = d[e.name],
                                            i = r.forages;
                                        t.close();
                                        for (var c = 0; c < i.length; c++) {
                                            var s = i[c];
                                            s._dbInfo.db = null, s._dbInfo.version = n
                                        }
                                        return new a((function(t, r) {
                                            var i = o.open(e.name, n);
                                            i.onerror = function(e) {
                                                i.result.close(), r(e)
                                            }, i.onupgradeneeded = function() {
                                                i.result.deleteObjectStore(e.storeName)
                                            }, i.onsuccess = function() {
                                                var e = i.result;
                                                e.close(), t(e)
                                            }
                                        })).then((function(e) {
                                            r.db = e;
                                            for (var t = 0; t < i.length; t++) {
                                                var n = i[t];
                                                n._dbInfo.db = e, m(n._dbInfo)
                                            }
                                        })).catch((function(t) {
                                            throw (g(e, t) || a.resolve()).catch((function() {})), t
                                        }))
                                    }
                                })) : u.then((function(t) {
                                    v(e);
                                    var n = d[e.name],
                                        r = n.forages;
                                    t.close();
                                    for (var i = 0; i < r.length; i++) r[i]._dbInfo.db = null;
                                    return new a((function(t, n) {
                                        var r = o.deleteDatabase(e.name);
                                        r.onerror = r.onblocked = function(e) {
                                            var t = r.result;
                                            t && t.close(), n(e)
                                        }, r.onsuccess = function() {
                                            var e = r.result;
                                            e && e.close(), t(e)
                                        }
                                    })).then((function(e) {
                                        n.db = e;
                                        for (var t = 0; t < r.length; t++) m(r[t]._dbInfo)
                                    })).catch((function(t) {
                                        throw (g(e, t) || a.resolve()).catch((function() {})), t
                                    }))
                                }))
                            } else r = a.reject("Invalid arguments");
                            return c(r, t), r
                        }
                    },
                    T = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/",
                    A = /^~~local_forage_type~([^~]+)~/,
                    C = "__lfsc__:".length,
                    I = C + "arbf".length,
                    N = Object.prototype.toString;

                function L(e) {
                    var t, n, r, o, i, a = .75 * e.length,
                        c = e.length,
                        s = 0;
                    "=" === e[e.length - 1] && (a--, "=" === e[e.length - 2] && a--);
                    var u = new ArrayBuffer(a),
                        f = new Uint8Array(u);
                    for (t = 0; t < c; t += 4) n = T.indexOf(e[t]), r = T.indexOf(e[t + 1]), o = T.indexOf(e[t + 2]), i = T.indexOf(e[t + 3]), f[s++] = n << 2 | r >> 4, f[s++] = (15 & r) << 4 | o >> 2, f[s++] = (3 & o) << 6 | 63 & i;
                    return u
                }

                function P(e) {
                    var t, n = new Uint8Array(e),
                        r = "";
                    for (t = 0; t < n.length; t += 3) r += T[n[t] >> 2], r += T[(3 & n[t]) << 4 | n[t + 1] >> 4], r += T[(15 & n[t + 1]) << 2 | n[t + 2] >> 6], r += T[63 & n[t + 2]];
                    return n.length % 3 == 2 ? r = r.substring(0, r.length - 1) + "=" : n.length % 3 == 1 && (r = r.substring(0, r.length - 2) + "=="), r
                }
                var j = {
                    serialize: function(e, t) {
                        var n = "";
                        if (e && (n = N.call(e)), e && ("[object ArrayBuffer]" === n || e.buffer && "[object ArrayBuffer]" === N.call(e.buffer))) {
                            var r, o = "__lfsc__:";
                            e instanceof ArrayBuffer ? (r = e, o += "arbf") : (r = e.buffer, "[object Int8Array]" === n ? o += "si08" : "[object Uint8Array]" === n ? o += "ui08" : "[object Uint8ClampedArray]" === n ? o += "uic8" : "[object Int16Array]" === n ? o += "si16" : "[object Uint16Array]" === n ? o += "ur16" : "[object Int32Array]" === n ? o += "si32" : "[object Uint32Array]" === n ? o += "ui32" : "[object Float32Array]" === n ? o += "fl32" : "[object Float64Array]" === n ? o += "fl64" : t(new Error("Failed to get type for BinaryArray"))), t(o + P(r))
                        } else if ("[object Blob]" === n) {
                            var i = new FileReader;
                            i.onload = function() {
                                var n = "~~local_forage_type~" + e.type + "~" + P(this.result);
                                t("__lfsc__:blob" + n)
                            }, i.readAsArrayBuffer(e)
                        } else try {
                            t(JSON.stringify(e))
                        } catch (n) {
                            console.error("Couldn't convert value into a JSON string: ", e), t(null, n)
                        }
                    },
                    deserialize: function(e) {
                        if ("__lfsc__:" !== e.substring(0, C)) return JSON.parse(e);
                        var t, n = e.substring(I),
                            r = e.substring(C, I);
                        if ("blob" === r && A.test(n)) {
                            var o = n.match(A);
                            t = o[1], n = n.substring(o[0].length)
                        }
                        var a = L(n);
                        switch (r) {
                            case "arbf":
                                return a;
                            case "blob":
                                return i([a], {
                                    type: t
                                });
                            case "si08":
                                return new Int8Array(a);
                            case "ui08":
                                return new Uint8Array(a);
                            case "uic8":
                                return new Uint8ClampedArray(a);
                            case "si16":
                                return new Int16Array(a);
                            case "ur16":
                                return new Uint16Array(a);
                            case "si32":
                                return new Int32Array(a);
                            case "ui32":
                                return new Uint32Array(a);
                            case "fl32":
                                return new Float32Array(a);
                            case "fl64":
                                return new Float64Array(a);
                            default:
                                throw new Error("Unkown type: " + r)
                        }
                    },
                    stringToBuffer: L,
                    bufferToString: P
                };

                function D(e, t, n, r) {
                    e.executeSql("CREATE TABLE IF NOT EXISTS " + t.storeName + " (id INTEGER PRIMARY KEY, key unique, value)", [], n, r)
                }

                function M(e, t, n, r, o, i) {
                    e.executeSql(n, r, o, (function(e, a) {
                        a.code === a.SYNTAX_ERR ? e.executeSql("SELECT name FROM sqlite_master WHERE type='table' AND name = ?", [t.storeName], (function(e, c) {
                            c.rows.length ? i(e, a) : D(e, t, (function() {
                                e.executeSql(n, r, o, i)
                            }), i)
                        }), i) : i(e, a)
                    }), i)
                }

                function R(e, t, n, r) {
                    var o = this;
                    e = u(e);
                    var i = new a((function(i, a) {
                        o.ready().then((function() {
                            void 0 === t && (t = null);
                            var c = t,
                                s = o._dbInfo;
                            s.serializer.serialize(t, (function(t, u) {
                                u ? a(u) : s.db.transaction((function(n) {
                                    M(n, s, "INSERT OR REPLACE INTO " + s.storeName + " (key, value) VALUES (?, ?)", [e, t], (function() {
                                        i(c)
                                    }), (function(e, t) {
                                        a(t)
                                    }))
                                }), (function(t) {
                                    if (t.code === t.QUOTA_ERR) {
                                        if (r > 0) return void i(R.apply(o, [e, c, n, r - 1]));
                                        a(t)
                                    }
                                }))
                            }))
                        })).catch(a)
                    }));
                    return c(i, n), i
                }

                function B(e) {
                    return new a((function(t, n) {
                        e.transaction((function(r) {
                            r.executeSql("SELECT name FROM sqlite_master WHERE type='table' AND name <> '__WebKitDatabaseInfoTable__'", [], (function(n, r) {
                                for (var o = [], i = 0; i < r.rows.length; i++) o.push(r.rows.item(i).name);
                                t({
                                    db: e,
                                    storeNames: o
                                })
                            }), (function(e, t) {
                                n(t)
                            }))
                        }), (function(e) {
                            n(e)
                        }))
                    }))
                }
                var F = {
                    _driver: "webSQLStorage",
                    _initStorage: function(e) {
                        var t = this,
                            n = {
                                db: null
                            };
                        if (e)
                            for (var r in e) n[r] = "string" != typeof e[r] ? e[r].toString() : e[r];
                        var o = new a((function(e, r) {
                            try {
                                n.db = openDatabase(n.name, String(n.version), n.description, n.size)
                            } catch (e) {
                                return r(e)
                            }
                            n.db.transaction((function(o) {
                                D(o, n, (function() {
                                    t._dbInfo = n, e()
                                }), (function(e, t) {
                                    r(t)
                                }))
                            }), r)
                        }));
                        return n.serializer = j, o
                    },
                    _support: "function" == typeof openDatabase,
                    iterate: function(e, t) {
                        var n = this,
                            r = new a((function(t, r) {
                                n.ready().then((function() {
                                    var o = n._dbInfo;
                                    o.db.transaction((function(n) {
                                        M(n, o, "SELECT * FROM " + o.storeName, [], (function(n, r) {
                                            for (var i = r.rows, a = i.length, c = 0; c < a; c++) {
                                                var s = i.item(c),
                                                    u = s.value;
                                                if (u && (u = o.serializer.deserialize(u)), void 0 !== (u = e(u, s.key, c + 1))) return void t(u)
                                            }
                                            t()
                                        }), (function(e, t) {
                                            r(t)
                                        }))
                                    }))
                                })).catch(r)
                            }));
                        return c(r, t), r
                    },
                    getItem: function(e, t) {
                        var n = this;
                        e = u(e);
                        var r = new a((function(t, r) {
                            n.ready().then((function() {
                                var o = n._dbInfo;
                                o.db.transaction((function(n) {
                                    M(n, o, "SELECT * FROM " + o.storeName + " WHERE key = ? LIMIT 1", [e], (function(e, n) {
                                        var r = n.rows.length ? n.rows.item(0).value : null;
                                        r && (r = o.serializer.deserialize(r)), t(r)
                                    }), (function(e, t) {
                                        r(t)
                                    }))
                                }))
                            })).catch(r)
                        }));
                        return c(r, t), r
                    },
                    setItem: function(e, t, n) {
                        return R.apply(this, [e, t, n, 1])
                    },
                    removeItem: function(e, t) {
                        var n = this;
                        e = u(e);
                        var r = new a((function(t, r) {
                            n.ready().then((function() {
                                var o = n._dbInfo;
                                o.db.transaction((function(n) {
                                    M(n, o, "DELETE FROM " + o.storeName + " WHERE key = ?", [e], (function() {
                                        t()
                                    }), (function(e, t) {
                                        r(t)
                                    }))
                                }))
                            })).catch(r)
                        }));
                        return c(r, t), r
                    },
                    clear: function(e) {
                        var t = this,
                            n = new a((function(e, n) {
                                t.ready().then((function() {
                                    var r = t._dbInfo;
                                    r.db.transaction((function(t) {
                                        M(t, r, "DELETE FROM " + r.storeName, [], (function() {
                                            e()
                                        }), (function(e, t) {
                                            n(t)
                                        }))
                                    }))
                                })).catch(n)
                            }));
                        return c(n, e), n
                    },
                    length: function(e) {
                        var t = this,
                            n = new a((function(e, n) {
                                t.ready().then((function() {
                                    var r = t._dbInfo;
                                    r.db.transaction((function(t) {
                                        M(t, r, "SELECT COUNT(key) as c FROM " + r.storeName, [], (function(t, n) {
                                            var r = n.rows.item(0).c;
                                            e(r)
                                        }), (function(e, t) {
                                            n(t)
                                        }))
                                    }))
                                })).catch(n)
                            }));
                        return c(n, e), n
                    },
                    key: function(e, t) {
                        var n = this,
                            r = new a((function(t, r) {
                                n.ready().then((function() {
                                    var o = n._dbInfo;
                                    o.db.transaction((function(n) {
                                        M(n, o, "SELECT key FROM " + o.storeName + " WHERE id = ? LIMIT 1", [e + 1], (function(e, n) {
                                            var r = n.rows.length ? n.rows.item(0).key : null;
                                            t(r)
                                        }), (function(e, t) {
                                            r(t)
                                        }))
                                    }))
                                })).catch(r)
                            }));
                        return c(r, t), r
                    },
                    keys: function(e) {
                        var t = this,
                            n = new a((function(e, n) {
                                t.ready().then((function() {
                                    var r = t._dbInfo;
                                    r.db.transaction((function(t) {
                                        M(t, r, "SELECT key FROM " + r.storeName, [], (function(t, n) {
                                            for (var r = [], o = 0; o < n.rows.length; o++) r.push(n.rows.item(o).key);
                                            e(r)
                                        }), (function(e, t) {
                                            n(t)
                                        }))
                                    }))
                                })).catch(n)
                            }));
                        return c(n, e), n
                    },
                    dropInstance: function(e, t) {
                        t = f.apply(this, arguments);
                        var n = this.config();
                        (e = "function" != typeof e && e || {}).name || (e.name = e.name || n.name, e.storeName = e.storeName || n.storeName);
                        var r, o = this;
                        return c(r = e.name ? new a((function(t) {
                            var r;
                            r = e.name === n.name ? o._dbInfo.db : openDatabase(e.name, "", "", 0), e.storeName ? t({
                                db: r,
                                storeNames: [e.storeName]
                            }) : t(B(r))
                        })).then((function(e) {
                            return new a((function(t, n) {
                                e.db.transaction((function(r) {
                                    function o(e) {
                                        return new a((function(t, n) {
                                            r.executeSql("DROP TABLE IF EXISTS " + e, [], (function() {
                                                t()
                                            }), (function(e, t) {
                                                n(t)
                                            }))
                                        }))
                                    }
                                    for (var i = [], c = 0, s = e.storeNames.length; c < s; c++) i.push(o(e.storeNames[c]));
                                    a.all(i).then((function() {
                                        t()
                                    })).catch((function(e) {
                                        n(e)
                                    }))
                                }), (function(e) {
                                    n(e)
                                }))
                            }))
                        })) : a.reject("Invalid arguments"), t), r
                    }
                };

                function W(e, t) {
                    var n = e.name + "/";
                    return e.storeName !== t.storeName && (n += e.storeName + "/"), n
                }

                function H() {
                    return ! function() {
                        try {
                            return localStorage.setItem("_localforage_support_test", !0), localStorage.removeItem("_localforage_support_test"), !1
                        } catch (e) {
                            return !0
                        }
                    }() || localStorage.length > 0
                }
                var U = {
                        _driver: "localStorageWrapper",
                        _initStorage: function(e) {
                            var t = {};
                            if (e)
                                for (var n in e) t[n] = e[n];
                            return t.keyPrefix = W(e, this._defaultConfig), H() ? (this._dbInfo = t, t.serializer = j, a.resolve()) : a.reject()
                        },
                        _support: function() {
                            try {
                                return "undefined" != typeof localStorage && "setItem" in localStorage && !!localStorage.setItem
                            } catch (e) {
                                return !1
                            }
                        }(),
                        iterate: function(e, t) {
                            var n = this,
                                r = n.ready().then((function() {
                                    for (var t = n._dbInfo, r = t.keyPrefix, o = r.length, i = localStorage.length, a = 1, c = 0; c < i; c++) {
                                        var s = localStorage.key(c);
                                        if (0 === s.indexOf(r)) {
                                            var u = localStorage.getItem(s);
                                            if (u && (u = t.serializer.deserialize(u)), void 0 !== (u = e(u, s.substring(o), a++))) return u
                                        }
                                    }
                                }));
                            return c(r, t), r
                        },
                        getItem: function(e, t) {
                            var n = this;
                            e = u(e);
                            var r = n.ready().then((function() {
                                var t = n._dbInfo,
                                    r = localStorage.getItem(t.keyPrefix + e);
                                return r && (r = t.serializer.deserialize(r)), r
                            }));
                            return c(r, t), r
                        },
                        setItem: function(e, t, n) {
                            var r = this;
                            e = u(e);
                            var o = r.ready().then((function() {
                                void 0 === t && (t = null);
                                var n = t;
                                return new a((function(o, i) {
                                    var a = r._dbInfo;
                                    a.serializer.serialize(t, (function(t, r) {
                                        if (r) i(r);
                                        else try {
                                            localStorage.setItem(a.keyPrefix + e, t), o(n)
                                        } catch (e) {
                                            "QuotaExceededError" !== e.name && "NS_ERROR_DOM_QUOTA_REACHED" !== e.name || i(e), i(e)
                                        }
                                    }))
                                }))
                            }));
                            return c(o, n), o
                        },
                        removeItem: function(e, t) {
                            var n = this;
                            e = u(e);
                            var r = n.ready().then((function() {
                                var t = n._dbInfo;
                                localStorage.removeItem(t.keyPrefix + e)
                            }));
                            return c(r, t), r
                        },
                        clear: function(e) {
                            var t = this,
                                n = t.ready().then((function() {
                                    for (var e = t._dbInfo.keyPrefix, n = localStorage.length - 1; n >= 0; n--) {
                                        var r = localStorage.key(n);
                                        0 === r.indexOf(e) && localStorage.removeItem(r)
                                    }
                                }));
                            return c(n, e), n
                        },
                        length: function(e) {
                            var t = this.keys().then((function(e) {
                                return e.length
                            }));
                            return c(t, e), t
                        },
                        key: function(e, t) {
                            var n = this,
                                r = n.ready().then((function() {
                                    var t, r = n._dbInfo;
                                    try {
                                        t = localStorage.key(e)
                                    } catch (e) {
                                        t = null
                                    }
                                    return t && (t = t.substring(r.keyPrefix.length)), t
                                }));
                            return c(r, t), r
                        },
                        keys: function(e) {
                            var t = this,
                                n = t.ready().then((function() {
                                    for (var e = t._dbInfo, n = localStorage.length, r = [], o = 0; o < n; o++) {
                                        var i = localStorage.key(o);
                                        0 === i.indexOf(e.keyPrefix) && r.push(i.substring(e.keyPrefix.length))
                                    }
                                    return r
                                }));
                            return c(n, e), n
                        },
                        dropInstance: function(e, t) {
                            if (t = f.apply(this, arguments), !(e = "function" != typeof e && e || {}).name) {
                                var n = this.config();
                                e.name = e.name || n.name, e.storeName = e.storeName || n.storeName
                            }
                            var r, o = this;
                            return c(r = e.name ? new a((function(t) {
                                e.storeName ? t(W(e, o._defaultConfig)) : t(e.name + "/")
                            })).then((function(e) {
                                for (var t = localStorage.length - 1; t >= 0; t--) {
                                    var n = localStorage.key(t);
                                    0 === n.indexOf(e) && localStorage.removeItem(n)
                                }
                            })) : a.reject("Invalid arguments"), t), r
                        }
                    },
                    q = function(e, t) {
                        for (var n, r, o = e.length, i = 0; i < o;) {
                            if ((n = e[i]) === (r = t) || "number" == typeof n && "number" == typeof r && isNaN(n) && isNaN(r)) return !0;
                            i++
                        }
                        return !1
                    },
                    V = Array.isArray || function(e) {
                        return "[object Array]" === Object.prototype.toString.call(e)
                    },
                    z = {},
                    K = {},
                    G = {
                        INDEXEDDB: O,
                        WEBSQL: F,
                        LOCALSTORAGE: U
                    },
                    Y = [G.INDEXEDDB._driver, G.WEBSQL._driver, G.LOCALSTORAGE._driver],
                    $ = ["dropInstance"],
                    J = ["clear", "getItem", "iterate", "key", "keys", "length", "removeItem", "setItem"].concat($),
                    Q = {
                        description: "",
                        driver: Y.slice(),
                        name: "localforage",
                        size: 4980736,
                        storeName: "keyvaluepairs",
                        version: 1
                    };

                function X(e, t) {
                    e[t] = function() {
                        var n = arguments;
                        return e.ready().then((function() {
                            return e[t].apply(e, n)
                        }))
                    }
                }

                function Z() {
                    for (var e = 1; e < arguments.length; e++) {
                        var t = arguments[e];
                        if (t)
                            for (var n in t) t.hasOwnProperty(n) && (V(t[n]) ? arguments[0][n] = t[n].slice() : arguments[0][n] = t[n])
                    }
                    return arguments[0]
                }
                var ee = new(function() {
                    function e(t) {
                        for (var n in function(e, t) {
                                if (!(e instanceof t)) throw new TypeError("Cannot call a class as a function")
                            }(this, e), G)
                            if (G.hasOwnProperty(n)) {
                                var r = G[n],
                                    o = r._driver;
                                this[n] = o, z[o] || this.defineDriver(r)
                            } this._defaultConfig = Z({}, Q), this._config = Z({}, this._defaultConfig, t), this._driverSet = null, this._initDriver = null, this._ready = !1, this._dbInfo = null, this._wrapLibraryMethodsWithReady(), this.setDriver(this._config.driver).catch((function() {}))
                    }
                    return e.prototype.config = function(e) {
                        if ("object" === (void 0 === e ? "undefined" : r(e))) {
                            if (this._ready) return new Error("Can't call config() after localforage has been used.");
                            for (var t in e) {
                                if ("storeName" === t && (e[t] = e[t].replace(/\W/g, "_")), "version" === t && "number" != typeof e[t]) return new Error("Database version must be a number.");
                                this._config[t] = e[t]
                            }
                            return !("driver" in e) || !e.driver || this.setDriver(this._config.driver)
                        }
                        return "string" == typeof e ? this._config[e] : this._config
                    }, e.prototype.defineDriver = function(e, t, n) {
                        var r = new a((function(t, n) {
                            try {
                                var r = e._driver,
                                    o = new Error("Custom driver not compliant; see https://mozilla.github.io/localForage/#definedriver");
                                if (!e._driver) return void n(o);
                                for (var i = J.concat("_initStorage"), s = 0, u = i.length; s < u; s++) {
                                    var f = i[s];
                                    if ((!q($, f) || e[f]) && "function" != typeof e[f]) return void n(o)
                                }! function() {
                                    for (var t = function(e) {
                                            return function() {
                                                var t = new Error("Method " + e + " is not implemented by the current driver"),
                                                    n = a.reject(t);
                                                return c(n, arguments[arguments.length - 1]), n
                                            }
                                        }, n = 0, r = $.length; n < r; n++) {
                                        var o = $[n];
                                        e[o] || (e[o] = t(o))
                                    }
                                }();
                                var l = function(n) {
                                    z[r] && console.info("Redefining LocalForage driver: " + r), z[r] = e, K[r] = n, t()
                                };
                                "_support" in e ? e._support && "function" == typeof e._support ? e._support().then(l, n) : l(!!e._support) : l(!0)
                            } catch (e) {
                                n(e)
                            }
                        }));
                        return s(r, t, n), r
                    }, e.prototype.driver = function() {
                        return this._driver || null
                    }, e.prototype.getDriver = function(e, t, n) {
                        var r = z[e] ? a.resolve(z[e]) : a.reject(new Error("Driver not found."));
                        return s(r, t, n), r
                    }, e.prototype.getSerializer = function(e) {
                        var t = a.resolve(j);
                        return s(t, e), t
                    }, e.prototype.ready = function(e) {
                        var t = this,
                            n = t._driverSet.then((function() {
                                return null === t._ready && (t._ready = t._initDriver()), t._ready
                            }));
                        return s(n, e, e), n
                    }, e.prototype.setDriver = function(e, t, n) {
                        var r = this;
                        V(e) || (e = [e]);
                        var o = this._getSupportedDrivers(e);

                        function i() {
                            r._config.driver = r.driver()
                        }

                        function c(e) {
                            return r._extend(e), i(), r._ready = r._initStorage(r._config), r._ready
                        }
                        var u = null !== this._driverSet ? this._driverSet.catch((function() {
                            return a.resolve()
                        })) : a.resolve();
                        return this._driverSet = u.then((function() {
                            var e = o[0];
                            return r._dbInfo = null, r._ready = null, r.getDriver(e).then((function(e) {
                                r._driver = e._driver, i(), r._wrapLibraryMethodsWithReady(), r._initDriver = function(e) {
                                    return function() {
                                        var t = 0;
                                        return function n() {
                                            for (; t < e.length;) {
                                                var o = e[t];
                                                return t++, r._dbInfo = null, r._ready = null, r.getDriver(o).then(c).catch(n)
                                            }
                                            i();
                                            var s = new Error("No available storage method found.");
                                            return r._driverSet = a.reject(s), r._driverSet
                                        }()
                                    }
                                }(o)
                            }))
                        })).catch((function() {
                            i();
                            var e = new Error("No available storage method found.");
                            return r._driverSet = a.reject(e), r._driverSet
                        })), s(this._driverSet, t, n), this._driverSet
                    }, e.prototype.supports = function(e) {
                        return !!K[e]
                    }, e.prototype._extend = function(e) {
                        Z(this, e)
                    }, e.prototype._getSupportedDrivers = function(e) {
                        for (var t = [], n = 0, r = e.length; n < r; n++) {
                            var o = e[n];
                            this.supports(o) && t.push(o)
                        }
                        return t
                    }, e.prototype._wrapLibraryMethodsWithReady = function() {
                        for (var e = 0, t = J.length; e < t; e++) X(this, J[e])
                    }, e.prototype.createInstance = function(t) {
                        return new e(t)
                    }, e
                }());
                t.exports = ee
            }, {
                3: 3
            }]
        }, {}, [4])(4)
    }).call(this, n(30))
}, function(e, t) {
    e.exports = function(e, t) {
        return {
            enumerable: !(1 & e),
            configurable: !(2 & e),
            writable: !(4 & e),
            value: t
        }
    }
}, function(e, t) {
    e.exports = function(e) {
        if (null == e) throw TypeError("Can't call method on " + e);
        return e
    }
}, function(e, t, n) {
    var r, o, i, a = n(108),
        c = n(0),
        s = n(7),
        u = n(9),
        f = n(4),
        l = n(32),
        d = n(33),
        p = c.WeakMap;
    if (a) {
        var h = new p,
            v = h.get,
            m = h.has,
            g = h.set;
        r = function(e, t) {
            return g.call(h, e, t), t
        }, o = function(e) {
            return v.call(h, e) || {}
        }, i = function(e) {
            return m.call(h, e)
        }
    } else {
        var y = l("state");
        d[y] = !0, r = function(e, t) {
            return u(e, y, t), t
        }, o = function(e) {
            return f(e, y) ? e[y] : {}
        }, i = function(e) {
            return f(e, y)
        }
    }
    e.exports = {
        set: r,
        get: o,
        has: i,
        enforce: function(e) {
            return i(e) ? o(e) : r(e, {})
        },
        getterFor: function(e) {
            return function(t) {
                var n;
                if (!s(t) || (n = o(t)).type !== e) throw TypeError("Incompatible receiver, " + e + " required");
                return n
            }
        }
    }
}, function(e, t) {
    e.exports = !1
}, function(e, t, n) {
    var r = n(37),
        o = n(69),
        i = n(14),
        a = n(13),
        c = n(83),
        s = [].push,
        u = function(e) {
            var t = 1 == e,
                n = 2 == e,
                u = 3 == e,
                f = 4 == e,
                l = 6 == e,
                d = 5 == e || l;
            return function(p, h, v, m) {
                for (var g, y, b = i(p), w = o(b), _ = r(h, v, 3), S = a(w.length), x = 0, E = m || c, k = t ? E(p, S) : n ? E(p, 0) : void 0; S > x; x++)
                    if ((d || x in w) && (y = _(g = w[x], x, b), e))
                        if (t) k[x] = y;
                        else if (y) switch (e) {
                    case 3:
                        return !0;
                    case 5:
                        return g;
                    case 6:
                        return x;
                    case 2:
                        s.call(k, g)
                } else if (f) return !1;
                return l ? -1 : u || f ? f : k
            }
        };
    e.exports = {
        forEach: u(0),
        map: u(1),
        filter: u(2),
        some: u(3),
        every: u(4),
        find: u(5),
        findIndex: u(6)
    }
}, function(e, t, n) {
    var r = n(6),
        o = n(2),
        i = n(4),
        a = Object.defineProperty,
        c = {},
        s = function(e) {
            throw e
        };
    e.exports = function(e, t) {
        if (i(c, e)) return c[e];
        t || (t = {});
        var n = [][e],
            u = !!i(t, "ACCESSORS") && t.ACCESSORS,
            f = i(t, 0) ? t[0] : s,
            l = i(t, 1) ? t[1] : void 0;
        return c[e] = !!n && !o((function() {
            if (u && !r) return !0;
            var e = {
                length: -1
            };
            u ? a(e, 1, {
                enumerable: !0,
                get: s
            }) : e[1] = 1, n.call(e, f, l)
        }))
    }
}, function(e, t, n) {
    var r = n(3),
        o = n(113);
    r({
        target: "Array",
        stat: !0,
        forced: !n(89)((function(e) {
            Array.from(e)
        }))
    }, {
        from: o
    })
}, function(e, t) {
    e.exports = {}
}, function(e, t, n) {
    "use strict";
    var r = n(99).charAt,
        o = n(22),
        i = n(91),
        a = o.set,
        c = o.getterFor("String Iterator");
    i(String, "String", (function(e) {
        a(this, {
            type: "String Iterator",
            string: String(e),
            index: 0
        })
    }), (function() {
        var e, t = c(this),
            n = t.string,
            o = t.index;
        return o >= n.length ? {
            value: void 0,
            done: !0
        } : (e = r(n, o), t.index += e.length, {
            value: e,
            done: !1
        })
    }))
}, function(e, t, n) {
    "use strict";
    (function(e) {
        Object.defineProperty(t, "__esModule", {
            value: !0
        });
        var r = n(138),
            o = {
                NODE_CLIENT: !1,
                NODE_ADMIN: !1,
                SDK_VERSION: "${JSCORE_VERSION}"
            },
            i = function(e, t) {
                if (!e) throw a(t)
            },
            a = function(e) {
                return new Error("Firebase Database (" + o.SDK_VERSION + ") INTERNAL ASSERT FAILED: " + e)
            },
            c = function(e) {
                for (var t = [], n = 0, r = 0; r < e.length; r++) {
                    var o = e.charCodeAt(r);
                    o < 128 ? t[n++] = o : o < 2048 ? (t[n++] = o >> 6 | 192, t[n++] = 63 & o | 128) : 55296 == (64512 & o) && r + 1 < e.length && 56320 == (64512 & e.charCodeAt(r + 1)) ? (o = 65536 + ((1023 & o) << 10) + (1023 & e.charCodeAt(++r)), t[n++] = o >> 18 | 240, t[n++] = o >> 12 & 63 | 128, t[n++] = o >> 6 & 63 | 128, t[n++] = 63 & o | 128) : (t[n++] = o >> 12 | 224, t[n++] = o >> 6 & 63 | 128, t[n++] = 63 & o | 128)
                }
                return t
            },
            s = {
                byteToCharMap_: null,
                charToByteMap_: null,
                byteToCharMapWebSafe_: null,
                charToByteMapWebSafe_: null,
                ENCODED_VALS_BASE: "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789",
                get ENCODED_VALS() {
                    return this.ENCODED_VALS_BASE + "+/="
                },
                get ENCODED_VALS_WEBSAFE() {
                    return this.ENCODED_VALS_BASE + "-_."
                },
                HAS_NATIVE_SUPPORT: "function" == typeof atob,
                encodeByteArray: function(e, t) {
                    if (!Array.isArray(e)) throw Error("encodeByteArray takes an array as a parameter");
                    this.init_();
                    for (var n = t ? this.byteToCharMapWebSafe_ : this.byteToCharMap_, r = [], o = 0; o < e.length; o += 3) {
                        var i = e[o],
                            a = o + 1 < e.length,
                            c = a ? e[o + 1] : 0,
                            s = o + 2 < e.length,
                            u = s ? e[o + 2] : 0,
                            f = i >> 2,
                            l = (3 & i) << 4 | c >> 4,
                            d = (15 & c) << 2 | u >> 6,
                            p = 63 & u;
                        s || (p = 64, a || (d = 64)), r.push(n[f], n[l], n[d], n[p])
                    }
                    return r.join("")
                },
                encodeString: function(e, t) {
                    return this.HAS_NATIVE_SUPPORT && !t ? btoa(e) : this.encodeByteArray(c(e), t)
                },
                decodeString: function(e, t) {
                    return this.HAS_NATIVE_SUPPORT && !t ? atob(e) : function(e) {
                        for (var t = [], n = 0, r = 0; n < e.length;) {
                            var o = e[n++];
                            if (o < 128) t[r++] = String.fromCharCode(o);
                            else if (o > 191 && o < 224) {
                                var i = e[n++];
                                t[r++] = String.fromCharCode((31 & o) << 6 | 63 & i)
                            } else if (o > 239 && o < 365) {
                                var a = ((7 & o) << 18 | (63 & (i = e[n++])) << 12 | (63 & (c = e[n++])) << 6 | 63 & e[n++]) - 65536;
                                t[r++] = String.fromCharCode(55296 + (a >> 10)), t[r++] = String.fromCharCode(56320 + (1023 & a))
                            } else {
                                i = e[n++];
                                var c = e[n++];
                                t[r++] = String.fromCharCode((15 & o) << 12 | (63 & i) << 6 | 63 & c)
                            }
                        }
                        return t.join("")
                    }(this.decodeStringToByteArray(e, t))
                },
                decodeStringToByteArray: function(e, t) {
                    this.init_();
                    for (var n = t ? this.charToByteMapWebSafe_ : this.charToByteMap_, r = [], o = 0; o < e.length;) {
                        var i = n[e.charAt(o++)],
                            a = o < e.length ? n[e.charAt(o)] : 0,
                            c = ++o < e.length ? n[e.charAt(o)] : 64,
                            s = ++o < e.length ? n[e.charAt(o)] : 64;
                        if (++o, null == i || null == a || null == c || null == s) throw Error();
                        var u = i << 2 | a >> 4;
                        if (r.push(u), 64 !== c) {
                            var f = a << 4 & 240 | c >> 2;
                            if (r.push(f), 64 !== s) {
                                var l = c << 6 & 192 | s;
                                r.push(l)
                            }
                        }
                    }
                    return r
                },
                init_: function() {
                    if (!this.byteToCharMap_) {
                        this.byteToCharMap_ = {}, this.charToByteMap_ = {}, this.byteToCharMapWebSafe_ = {}, this.charToByteMapWebSafe_ = {};
                        for (var e = 0; e < this.ENCODED_VALS.length; e++) this.byteToCharMap_[e] = this.ENCODED_VALS.charAt(e), this.charToByteMap_[this.byteToCharMap_[e]] = e, this.byteToCharMapWebSafe_[e] = this.ENCODED_VALS_WEBSAFE.charAt(e), this.charToByteMapWebSafe_[this.byteToCharMapWebSafe_[e]] = e, e >= this.ENCODED_VALS_BASE.length && (this.charToByteMap_[this.ENCODED_VALS_WEBSAFE.charAt(e)] = e, this.charToByteMapWebSafe_[this.ENCODED_VALS.charAt(e)] = e)
                    }
                }
            },
            u = function(e) {
                try {
                    return s.decodeString(e, !0)
                } catch (e) {
                    console.error("base64Decode failed: ", e)
                }
                return null
            };

        function f(e, t) {
            if (!(t instanceof Object)) return t;
            switch (t.constructor) {
                case Date:
                    return new Date(t.getTime());
                case Object:
                    void 0 === e && (e = {});
                    break;
                case Array:
                    e = [];
                    break;
                default:
                    return t
            }
            for (var n in t) t.hasOwnProperty(n) && (e[n] = f(e[n], t[n]));
            return e
        }
        var l = function() {
            function e() {
                var e = this;
                this.reject = function() {}, this.resolve = function() {}, this.promise = new Promise((function(t, n) {
                    e.resolve = t, e.reject = n
                }))
            }
            return e.prototype.wrapCallback = function(e) {
                var t = this;
                return function(n, r) {
                    n ? t.reject(n) : t.resolve(r), "function" == typeof e && (t.promise.catch((function() {})), 1 === e.length ? e(n) : e(n, r))
                }
            }, e
        }();

        function d() {
            return "undefined" != typeof navigator && "string" == typeof navigator.userAgent ? navigator.userAgent : ""
        }
        var p = function(e) {
                function t(n, r) {
                    var o = e.call(this, r) || this;
                    return o.code = n, o.name = "FirebaseError", Object.setPrototypeOf(o, t.prototype), Error.captureStackTrace && Error.captureStackTrace(o, h.prototype.create), o
                }
                return r.__extends(t, e), t
            }(Error),
            h = function() {
                function e(e, t, n) {
                    this.service = e, this.serviceName = t, this.errors = n
                }
                return e.prototype.create = function(e) {
                    for (var t = [], n = 1; n < arguments.length; n++) t[n - 1] = arguments[n];
                    for (var r = t[0] || {}, o = this.service + "/" + e, i = this.errors[e], a = i ? v(i, r) : "Error", c = this.serviceName + ": " + a + " (" + o + ").", s = new p(o, c), u = 0, f = Object.keys(r); u < f.length; u++) {
                        var l = f[u];
                        "_" !== l.slice(-1) && (l in s && console.warn('Overwriting FirebaseError base field "' + l + '" can cause unexpected behavior.'), s[l] = r[l])
                    }
                    return s
                }, e
            }();

        function v(e, t) {
            return e.replace(m, (function(e, n) {
                var r = t[n];
                return null != r ? r.toString() : "<" + n + "?>"
            }))
        }
        var m = /\{\$([^}]+)}/g;

        function g(e) {
            return JSON.parse(e)
        }
        var y = function(e) {
            var t = {},
                n = {},
                r = {},
                o = "";
            try {
                var i = e.split(".");
                t = g(u(i[0]) || ""), n = g(u(i[1]) || ""), o = i[2], r = n.d || {}, delete n.d
            } catch (e) {}
            return {
                header: t,
                claims: n,
                data: r,
                signature: o
            }
        };
        var b = function() {
            function e() {
                this.chain_ = [], this.buf_ = [], this.W_ = [], this.pad_ = [], this.inbuf_ = 0, this.total_ = 0, this.blockSize = 64, this.pad_[0] = 128;
                for (var e = 1; e < this.blockSize; ++e) this.pad_[e] = 0;
                this.reset()
            }
            return e.prototype.reset = function() {
                this.chain_[0] = 1732584193, this.chain_[1] = 4023233417, this.chain_[2] = 2562383102, this.chain_[3] = 271733878, this.chain_[4] = 3285377520, this.inbuf_ = 0, this.total_ = 0
            }, e.prototype.compress_ = function(e, t) {
                t || (t = 0);
                var n = this.W_;
                if ("string" == typeof e)
                    for (var r = 0; r < 16; r++) n[r] = e.charCodeAt(t) << 24 | e.charCodeAt(t + 1) << 16 | e.charCodeAt(t + 2) << 8 | e.charCodeAt(t + 3), t += 4;
                else
                    for (r = 0; r < 16; r++) n[r] = e[t] << 24 | e[t + 1] << 16 | e[t + 2] << 8 | e[t + 3], t += 4;
                for (r = 16; r < 80; r++) {
                    var o = n[r - 3] ^ n[r - 8] ^ n[r - 14] ^ n[r - 16];
                    n[r] = 4294967295 & (o << 1 | o >>> 31)
                }
                var i, a, c = this.chain_[0],
                    s = this.chain_[1],
                    u = this.chain_[2],
                    f = this.chain_[3],
                    l = this.chain_[4];
                for (r = 0; r < 80; r++) {
                    r < 40 ? r < 20 ? (i = f ^ s & (u ^ f), a = 1518500249) : (i = s ^ u ^ f, a = 1859775393) : r < 60 ? (i = s & u | f & (s | u), a = 2400959708) : (i = s ^ u ^ f, a = 3395469782);
                    o = (c << 5 | c >>> 27) + i + l + a + n[r] & 4294967295;
                    l = f, f = u, u = 4294967295 & (s << 30 | s >>> 2), s = c, c = o
                }
                this.chain_[0] = this.chain_[0] + c & 4294967295, this.chain_[1] = this.chain_[1] + s & 4294967295, this.chain_[2] = this.chain_[2] + u & 4294967295, this.chain_[3] = this.chain_[3] + f & 4294967295, this.chain_[4] = this.chain_[4] + l & 4294967295
            }, e.prototype.update = function(e, t) {
                if (null != e) {
                    void 0 === t && (t = e.length);
                    for (var n = t - this.blockSize, r = 0, o = this.buf_, i = this.inbuf_; r < t;) {
                        if (0 === i)
                            for (; r <= n;) this.compress_(e, r), r += this.blockSize;
                        if ("string" == typeof e) {
                            for (; r < t;)
                                if (o[i] = e.charCodeAt(r), ++r, ++i === this.blockSize) {
                                    this.compress_(o), i = 0;
                                    break
                                }
                        } else
                            for (; r < t;)
                                if (o[i] = e[r], ++r, ++i === this.blockSize) {
                                    this.compress_(o), i = 0;
                                    break
                                }
                    }
                    this.inbuf_ = i, this.total_ += t
                }
            }, e.prototype.digest = function() {
                var e = [],
                    t = 8 * this.total_;
                this.inbuf_ < 56 ? this.update(this.pad_, 56 - this.inbuf_) : this.update(this.pad_, this.blockSize - (this.inbuf_ - 56));
                for (var n = this.blockSize - 1; n >= 56; n--) this.buf_[n] = 255 & t, t /= 256;
                this.compress_(this.buf_);
                var r = 0;
                for (n = 0; n < 5; n++)
                    for (var o = 24; o >= 0; o -= 8) e[r] = this.chain_[n] >> o & 255, ++r;
                return e
            }, e
        }();
        var w = function() {
            function e(e, t) {
                var n = this;
                this.observers = [], this.unsubscribes = [], this.observerCount = 0, this.task = Promise.resolve(), this.finalized = !1, this.onNoObservers = t, this.task.then((function() {
                    e(n)
                })).catch((function(e) {
                    n.error(e)
                }))
            }
            return e.prototype.next = function(e) {
                this.forEachObserver((function(t) {
                    t.next(e)
                }))
            }, e.prototype.error = function(e) {
                this.forEachObserver((function(t) {
                    t.error(e)
                })), this.close(e)
            }, e.prototype.complete = function() {
                this.forEachObserver((function(e) {
                    e.complete()
                })), this.close()
            }, e.prototype.subscribe = function(e, t, n) {
                var r, o = this;
                if (void 0 === e && void 0 === t && void 0 === n) throw new Error("Missing Observer.");
                void 0 === (r = function(e, t) {
                    if ("object" != typeof e || null === e) return !1;
                    for (var n = 0, r = t; n < r.length; n++) {
                        var o = r[n];
                        if (o in e && "function" == typeof e[o]) return !0
                    }
                    return !1
                }(e, ["next", "error", "complete"]) ? e : {
                    next: e,
                    error: t,
                    complete: n
                }).next && (r.next = _), void 0 === r.error && (r.error = _), void 0 === r.complete && (r.complete = _);
                var i = this.unsubscribeOne.bind(this, this.observers.length);
                return this.finalized && this.task.then((function() {
                    try {
                        o.finalError ? r.error(o.finalError) : r.complete()
                    } catch (e) {}
                })), this.observers.push(r), i
            }, e.prototype.unsubscribeOne = function(e) {
                void 0 !== this.observers && void 0 !== this.observers[e] && (delete this.observers[e], this.observerCount -= 1, 0 === this.observerCount && void 0 !== this.onNoObservers && this.onNoObservers(this))
            }, e.prototype.forEachObserver = function(e) {
                if (!this.finalized)
                    for (var t = 0; t < this.observers.length; t++) this.sendOne(t, e)
            }, e.prototype.sendOne = function(e, t) {
                var n = this;
                this.task.then((function() {
                    if (void 0 !== n.observers && void 0 !== n.observers[e]) try {
                        t(n.observers[e])
                    } catch (e) {
                        "undefined" != typeof console && console.error && console.error(e)
                    }
                }))
            }, e.prototype.close = function(e) {
                var t = this;
                this.finalized || (this.finalized = !0, void 0 !== e && (this.finalError = e), this.task.then((function() {
                    t.observers = void 0, t.onNoObservers = void 0
                })))
            }, e
        }();

        function _() {}

        function S(e, t, n) {
            var r = "";
            switch (t) {
                case 1:
                    r = n ? "first" : "First";
                    break;
                case 2:
                    r = n ? "second" : "Second";
                    break;
                case 3:
                    r = n ? "third" : "Third";
                    break;
                case 4:
                    r = n ? "fourth" : "Fourth";
                    break;
                default:
                    throw new Error("errorPrefix called with argumentNumber > 4.  Need to update it?")
            }
            var o = e + " failed: ";
            return o += r + " argument "
        }
        t.CONSTANTS = o, t.Deferred = l, t.ErrorFactory = h, t.FirebaseError = p, t.Sha1 = b, t.assert = i, t.assertionError = a, t.async = function(e, t) {
            return function() {
                for (var n = [], r = 0; r < arguments.length; r++) n[r] = arguments[r];
                Promise.resolve(!0).then((function() {
                    e.apply(void 0, n)
                })).catch((function(e) {
                    t && t(e)
                }))
            }
        }, t.base64 = s, t.base64Decode = u, t.base64Encode = function(e) {
            var t = c(e);
            return s.encodeByteArray(t, !0)
        }, t.contains = function(e, t) {
            return Object.prototype.hasOwnProperty.call(e, t)
        }, t.createSubscribe = function(e, t) {
            var n = new w(e, t);
            return n.subscribe.bind(n)
        }, t.decode = y, t.deepCopy = function(e) {
            return f(void 0, e)
        }, t.deepExtend = f, t.errorPrefix = S, t.getUA = d, t.isAdmin = function(e) {
            var t = y(e).claims;
            return "object" == typeof t && !0 === t.admin
        }, t.isBrowser = function() {
            return "object" == typeof self && self.self === self
        }, t.isEmpty = function(e) {
            for (var t in e)
                if (Object.prototype.hasOwnProperty.call(e, t)) return !1;
            return !0
        }, t.isMobileCordova = function() {
            return "undefined" != typeof window && !!(window.cordova || window.phonegap || window.PhoneGap) && /ios|iphone|ipod|ipad|android|blackberry|iemobile/i.test(d())
        }, t.isNode = function() {
            try {
                return "[object process]" === Object.prototype.toString.call(e.process)
            } catch (e) {
                return !1
            }
        }, t.isNodeSdk = function() {
            return !0 === o.NODE_CLIENT || !0 === o.NODE_ADMIN
        }, t.isReactNative = function() {
            return "object" == typeof navigator && "ReactNative" === navigator.product
        }, t.isValidFormat = function(e) {
            var t = y(e).claims;
            return !!t && "object" == typeof t && t.hasOwnProperty("iat")
        }, t.isValidTimestamp = function(e) {
            var t = y(e).claims,
                n = Math.floor((new Date).getTime() / 1e3),
                r = 0,
                o = 0;
            return "object" == typeof t && (t.hasOwnProperty("nbf") ? r = t.nbf : t.hasOwnProperty("iat") && (r = t.iat), o = t.hasOwnProperty("exp") ? t.exp : r + 86400), !!n && !!r && !!o && n >= r && n <= o
        }, t.issuedAtTime = function(e) {
            var t = y(e).claims;
            return "object" == typeof t && t.hasOwnProperty("iat") ? t.iat : null
        }, t.jsonEval = g, t.map = function(e, t, n) {
            var r = {};
            for (var o in e) Object.prototype.hasOwnProperty.call(e, o) && (r[o] = t.call(n, e[o], o, e));
            return r
        }, t.querystring = function(e) {
            for (var t = [], n = function(e, n) {
                    Array.isArray(n) ? n.forEach((function(n) {
                        t.push(encodeURIComponent(e) + "=" + encodeURIComponent(n))
                    })) : t.push(encodeURIComponent(e) + "=" + encodeURIComponent(n))
                }, r = 0, o = Object.entries(e); r < o.length; r++) {
                var i = o[r];
                n(i[0], i[1])
            }
            return t.length ? "&" + t.join("&") : ""
        }, t.querystringDecode = function(e) {
            var t = {};
            return e.replace(/^\?/, "").split("&").forEach((function(e) {
                if (e) {
                    var n = e.split("=");
                    t[n[0]] = n[1]
                }
            })), t
        }, t.safeGet = function(e, t) {
            return Object.prototype.hasOwnProperty.call(e, t) ? e[t] : void 0
        }, t.stringLength = function(e) {
            for (var t = 0, n = 0; n < e.length; n++) {
                var r = e.charCodeAt(n);
                r < 128 ? t++ : r < 2048 ? t += 2 : r >= 55296 && r <= 56319 ? (t += 4, n++) : t += 3
            }
            return t
        }, t.stringToByteArray = function(e) {
            for (var t = [], n = 0, r = 0; r < e.length; r++) {
                var o = e.charCodeAt(r);
                if (o >= 55296 && o <= 56319) {
                    var a = o - 55296;
                    r++, i(r < e.length, "Surrogate pair missing trail surrogate."), o = 65536 + (a << 10) + (e.charCodeAt(r) - 56320)
                }
                o < 128 ? t[n++] = o : o < 2048 ? (t[n++] = o >> 6 | 192, t[n++] = 63 & o | 128) : o < 65536 ? (t[n++] = o >> 12 | 224, t[n++] = o >> 6 & 63 | 128, t[n++] = 63 & o | 128) : (t[n++] = o >> 18 | 240, t[n++] = o >> 12 & 63 | 128, t[n++] = o >> 6 & 63 | 128, t[n++] = 63 & o | 128)
            }
            return t
        }, t.stringify = function(e) {
            return JSON.stringify(e)
        }, t.validateArgCount = function(e, t, n, r) {
            var o;
            if (r < t ? o = "at least " + t : r > n && (o = 0 === n ? "none" : "no more than " + n), o) throw new Error(e + " failed: Was called with " + r + (1 === r ? " argument." : " arguments.") + " Expects " + o + ".")
        }, t.validateCallback = function(e, t, n, r) {
            if ((!r || n) && "function" != typeof n) throw new Error(S(e, t, r) + "must be a valid function.")
        }, t.validateContextObject = function(e, t, n, r) {
            if ((!r || n) && ("object" != typeof n || null === n)) throw new Error(S(e, t, r) + "must be a valid context object.")
        }, t.validateNamespace = function(e, t, n, r) {
            if ((!r || n) && "string" != typeof n) throw new Error(S(e, t, r) + "must be a valid firebase namespace.")
        }
    }).call(this, n(30))
}, function(e, t) {
    var n;
    n = function() {
        return this
    }();
    try {
        n = n || new Function("return this")()
    } catch (e) {
        "object" == typeof window && (n = window)
    }
    e.exports = n
}, function(e, t, n) {
    var r = n(7);
    e.exports = function(e, t) {
        if (!r(e)) return e;
        var n, o;
        if (t && "function" == typeof(n = e.toString) && !r(o = n.call(e))) return o;
        if ("function" == typeof(n = e.valueOf) && !r(o = n.call(e))) return o;
        if (!t && "function" == typeof(n = e.toString) && !r(o = n.call(e))) return o;
        throw TypeError("Can't convert object to primitive value")
    }
}, function(e, t, n) {
    var r = n(49),
        o = n(50),
        i = r("keys");
    e.exports = function(e) {
        return i[e] || (i[e] = o(e))
    }
}, function(e, t) {
    e.exports = {}
}, function(e, t) {
    var n = Math.ceil,
        r = Math.floor;
    e.exports = function(e) {
        return isNaN(e = +e) ? 0 : (e > 0 ? r : n)(e)
    }
}, function(e, t, n) {
    var r = n(12);
    e.exports = Array.isArray || function(e) {
        return "Array" == r(e)
    }
}, function(e, t, n) {
    var r = n(8).f,
        o = n(4),
        i = n(1)("toStringTag");
    e.exports = function(e, t, n) {
        e && !o(e = n ? e : e.prototype, i) && r(e, i, {
            configurable: !0,
            value: t
        })
    }
}, function(e, t, n) {
    var r = n(38);
    e.exports = function(e, t, n) {
        if (r(e), void 0 === t) return e;
        switch (n) {
            case 0:
                return function() {
                    return e.call(t)
                };
            case 1:
                return function(n) {
                    return e.call(t, n)
                };
            case 2:
                return function(n, r) {
                    return e.call(t, n, r)
                };
            case 3:
                return function(n, r, o) {
                    return e.call(t, n, r, o)
                }
        }
        return function() {
            return e.apply(t, arguments)
        }
    }
}, function(e, t) {
    e.exports = function(e) {
        if ("function" != typeof e) throw TypeError(String(e) + " is not a function");
        return e
    }
}, function(e, t, n) {
    "use strict";
    var r = n(31),
        o = n(8),
        i = n(20);
    e.exports = function(e, t, n) {
        var a = r(t);
        a in e ? o.f(e, a, i(0, n)) : e[a] = n
    }
}, function(e, t, n) {
    "use strict";
    var r = n(10),
        o = n(90),
        i = n(27),
        a = n(22),
        c = n(91),
        s = a.set,
        u = a.getterFor("Array Iterator");
    e.exports = c(Array, "Array", (function(e, t) {
        s(this, {
            type: "Array Iterator",
            target: r(e),
            index: 0,
            kind: t
        })
    }), (function() {
        var e = u(this),
            t = e.target,
            n = e.kind,
            r = e.index++;
        return !t || r >= t.length ? (e.target = void 0, {
            value: void 0,
            done: !0
        }) : "keys" == n ? {
            value: r,
            done: !1
        } : "values" == n ? {
            value: t[r],
            done: !1
        } : {
            value: [r, t[r]],
            done: !1
        }
    }), "values"), i.Arguments = i.Array, o("keys"), o("values"), o("entries")
}, function(e, t, n) {
    var r = n(2),
        o = n(1),
        i = n(60),
        a = o("species");
    e.exports = function(e) {
        return i >= 51 || !r((function() {
            var t = [];
            return (t.constructor = {})[a] = function() {
                return {
                    foo: 1
                }
            }, 1 !== t[e](Boolean).foo
        }))
    }
}, function(e, t, n) {
    var r = n(6),
        o = n(8).f,
        i = Function.prototype,
        a = i.toString,
        c = /^\s*function ([^ (]*)/;
    r && !("name" in i) && o(i, "name", {
        configurable: !0,
        get: function() {
            try {
                return a.call(this).match(c)[1]
            } catch (e) {
                return ""
            }
        }
    })
}, function(e, t, n) {
    var r = n(58),
        o = n(11),
        i = n(118);
    r || o(Object.prototype, "toString", i, {
        unsafe: !0
    })
}, function(e, t, n) {
    "use strict";
    var r, o = (r = n(67)) && "object" == typeof r && "default" in r ? r.default : r;
    e.exports = o
}, function(e, t, n) {
    "use strict";
    var r = n(3),
        o = n(0),
        i = n(16),
        a = n(23),
        c = n(6),
        s = n(53),
        u = n(79),
        f = n(2),
        l = n(4),
        d = n(35),
        p = n(7),
        h = n(5),
        v = n(14),
        m = n(10),
        g = n(31),
        y = n(20),
        b = n(54),
        w = n(55),
        _ = n(51),
        S = n(111),
        x = n(77),
        E = n(15),
        k = n(8),
        O = n(68),
        T = n(9),
        A = n(11),
        C = n(49),
        I = n(32),
        N = n(33),
        L = n(50),
        P = n(1),
        j = n(81),
        D = n(82),
        M = n(36),
        R = n(22),
        B = n(24).forEach,
        F = I("hidden"),
        W = P("toPrimitive"),
        H = R.set,
        U = R.getterFor("Symbol"),
        q = Object.prototype,
        V = o.Symbol,
        z = i("JSON", "stringify"),
        K = E.f,
        G = k.f,
        Y = S.f,
        $ = O.f,
        J = C("symbols"),
        Q = C("op-symbols"),
        X = C("string-to-symbol-registry"),
        Z = C("symbol-to-string-registry"),
        ee = C("wks"),
        te = o.QObject,
        ne = !te || !te.prototype || !te.prototype.findChild,
        re = c && f((function() {
            return 7 != b(G({}, "a", {
                get: function() {
                    return G(this, "a", {
                        value: 7
                    }).a
                }
            })).a
        })) ? function(e, t, n) {
            var r = K(q, t);
            r && delete q[t], G(e, t, n), r && e !== q && G(q, t, r)
        } : G,
        oe = function(e, t) {
            var n = J[e] = b(V.prototype);
            return H(n, {
                type: "Symbol",
                tag: e,
                description: t
            }), c || (n.description = t), n
        },
        ie = u ? function(e) {
            return "symbol" == typeof e
        } : function(e) {
            return Object(e) instanceof V
        },
        ae = function(e, t, n) {
            e === q && ae(Q, t, n), h(e);
            var r = g(t, !0);
            return h(n), l(J, r) ? (n.enumerable ? (l(e, F) && e[F][r] && (e[F][r] = !1), n = b(n, {
                enumerable: y(0, !1)
            })) : (l(e, F) || G(e, F, y(1, {})), e[F][r] = !0), re(e, r, n)) : G(e, r, n)
        },
        ce = function(e, t) {
            h(e);
            var n = m(t),
                r = w(n).concat(le(n));
            return B(r, (function(t) {
                c && !se.call(n, t) || ae(e, t, n[t])
            })), e
        },
        se = function(e) {
            var t = g(e, !0),
                n = $.call(this, t);
            return !(this === q && l(J, t) && !l(Q, t)) && (!(n || !l(this, t) || !l(J, t) || l(this, F) && this[F][t]) || n)
        },
        ue = function(e, t) {
            var n = m(e),
                r = g(t, !0);
            if (n !== q || !l(J, r) || l(Q, r)) {
                var o = K(n, r);
                return !o || !l(J, r) || l(n, F) && n[F][r] || (o.enumerable = !0), o
            }
        },
        fe = function(e) {
            var t = Y(m(e)),
                n = [];
            return B(t, (function(e) {
                l(J, e) || l(N, e) || n.push(e)
            })), n
        },
        le = function(e) {
            var t = e === q,
                n = Y(t ? Q : m(e)),
                r = [];
            return B(n, (function(e) {
                !l(J, e) || t && !l(q, e) || r.push(J[e])
            })), r
        };
    (s || (A((V = function() {
        if (this instanceof V) throw TypeError("Symbol is not a constructor");
        var e = arguments.length && void 0 !== arguments[0] ? String(arguments[0]) : void 0,
            t = L(e),
            n = function(e) {
                this === q && n.call(Q, e), l(this, F) && l(this[F], t) && (this[F][t] = !1), re(this, t, y(1, e))
            };
        return c && ne && re(q, t, {
            configurable: !0,
            set: n
        }), oe(t, e)
    }).prototype, "toString", (function() {
        return U(this).tag
    })), A(V, "withoutSetter", (function(e) {
        return oe(L(e), e)
    })), O.f = se, k.f = ae, E.f = ue, _.f = S.f = fe, x.f = le, j.f = function(e) {
        return oe(P(e), e)
    }, c && (G(V.prototype, "description", {
        configurable: !0,
        get: function() {
            return U(this).description
        }
    }), a || A(q, "propertyIsEnumerable", se, {
        unsafe: !0
    }))), r({
        global: !0,
        wrap: !0,
        forced: !s,
        sham: !s
    }, {
        Symbol: V
    }), B(w(ee), (function(e) {
        D(e)
    })), r({
        target: "Symbol",
        stat: !0,
        forced: !s
    }, {
        for: function(e) {
            var t = String(e);
            if (l(X, t)) return X[t];
            var n = V(t);
            return X[t] = n, Z[n] = t, n
        },
        keyFor: function(e) {
            if (!ie(e)) throw TypeError(e + " is not a symbol");
            if (l(Z, e)) return Z[e]
        },
        useSetter: function() {
            ne = !0
        },
        useSimple: function() {
            ne = !1
        }
    }), r({
        target: "Object",
        stat: !0,
        forced: !s,
        sham: !c
    }, {
        create: function(e, t) {
            return void 0 === t ? b(e) : ce(b(e), t)
        },
        defineProperty: ae,
        defineProperties: ce,
        getOwnPropertyDescriptor: ue
    }), r({
        target: "Object",
        stat: !0,
        forced: !s
    }, {
        getOwnPropertyNames: fe,
        getOwnPropertySymbols: le
    }), r({
        target: "Object",
        stat: !0,
        forced: f((function() {
            x.f(1)
        }))
    }, {
        getOwnPropertySymbols: function(e) {
            return x.f(v(e))
        }
    }), z) && r({
        target: "JSON",
        stat: !0,
        forced: !s || f((function() {
            var e = V();
            return "[null]" != z([e]) || "{}" != z({
                a: e
            }) || "{}" != z(Object(e))
        }))
    }, {
        stringify: function(e, t, n) {
            for (var r, o = [e], i = 1; arguments.length > i;) o.push(arguments[i++]);
            if (r = t, (p(t) || void 0 !== e) && !ie(e)) return d(t) || (t = function(e, t) {
                if ("function" == typeof r && (t = r.call(this, e, t)), !ie(t)) return t
            }), o[1] = t, z.apply(null, o)
        }
    });
    V.prototype[W] || T(V.prototype, W, V.prototype.valueOf), M(V, "Symbol"), N[F] = !0
}, function(e, t, n) {
    var r = n(0),
        o = n(7),
        i = r.document,
        a = o(i) && o(i.createElement);
    e.exports = function(e) {
        return a ? i.createElement(e) : {}
    }
}, function(e, t, n) {
    var r = n(0),
        o = n(9);
    e.exports = function(e, t) {
        try {
            o(r, e, t)
        } catch (n) {
            r[e] = t
        }
        return t
    }
}, function(e, t, n) {
    var r = n(71),
        o = Function.toString;
    "function" != typeof r.inspectSource && (r.inspectSource = function(e) {
        return o.call(e)
    }), e.exports = r.inspectSource
}, function(e, t, n) {
    var r = n(23),
        o = n(71);
    (e.exports = function(e, t) {
        return o[e] || (o[e] = void 0 !== t ? t : {})
    })("versions", []).push({
        version: "3.6.5",
        mode: r ? "pure" : "global",
        copyright: "© 2020 Denis Pushkarev (zloirock.ru)"
    })
}, function(e, t) {
    var n = 0,
        r = Math.random();
    e.exports = function(e) {
        return "Symbol(" + String(void 0 === e ? "" : e) + ")_" + (++n + r).toString(36)
    }
}, function(e, t, n) {
    var r = n(75),
        o = n(52).concat("length", "prototype");
    t.f = Object.getOwnPropertyNames || function(e) {
        return r(e, o)
    }
}, function(e, t) {
    e.exports = ["constructor", "hasOwnProperty", "isPrototypeOf", "propertyIsEnumerable", "toLocaleString", "toString", "valueOf"]
}, function(e, t, n) {
    var r = n(2);
    e.exports = !!Object.getOwnPropertySymbols && !r((function() {
        return !String(Symbol())
    }))
}, function(e, t, n) {
    var r, o = n(5),
        i = n(110),
        a = n(52),
        c = n(33),
        s = n(80),
        u = n(46),
        f = n(32),
        l = f("IE_PROTO"),
        d = function() {},
        p = function(e) {
            return "<script>" + e + "<\/script>"
        },
        h = function() {
            try {
                r = document.domain && new ActiveXObject("htmlfile")
            } catch (e) {}
            var e, t;
            h = r ? function(e) {
                e.write(p("")), e.close();
                var t = e.parentWindow.Object;
                return e = null, t
            }(r) : ((t = u("iframe")).style.display = "none", s.appendChild(t), t.src = String("javascript:"), (e = t.contentWindow.document).open(), e.write(p("document.F=Object")), e.close(), e.F);
            for (var n = a.length; n--;) delete h.prototype[a[n]];
            return h()
        };
    c[l] = !0, e.exports = Object.create || function(e, t) {
        var n;
        return null !== e ? (d.prototype = o(e), n = new d, d.prototype = null, n[l] = e) : n = h(), void 0 === t ? n : i(n, t)
    }
}, function(e, t, n) {
    var r = n(75),
        o = n(52);
    e.exports = Object.keys || function(e) {
        return r(e, o)
    }
}, function(e, t, n) {
    "use strict";
    var r = n(3),
        o = n(6),
        i = n(0),
        a = n(4),
        c = n(7),
        s = n(8).f,
        u = n(72),
        f = i.Symbol;
    if (o && "function" == typeof f && (!("description" in f.prototype) || void 0 !== f().description)) {
        var l = {},
            d = function() {
                var e = arguments.length < 1 || void 0 === arguments[0] ? void 0 : String(arguments[0]),
                    t = this instanceof d ? new f(e) : void 0 === e ? f() : f(e);
                return "" === e && (l[t] = !0), t
            };
        u(d, f);
        var p = d.prototype = f.prototype;
        p.constructor = d;
        var h = p.toString,
            v = "Symbol(test)" == String(f("test")),
            m = /^Symbol\((.*)\)[^)]+$/;
        s(p, "description", {
            configurable: !0,
            get: function() {
                var e = c(this) ? this.valueOf() : this,
                    t = h.call(e);
                if (a(l, e)) return "";
                var n = v ? t.slice(7, -1) : t.replace(m, "$1");
                return "" === n ? void 0 : n
            }
        }), r({
            global: !0,
            forced: !0
        }, {
            Symbol: d
        })
    }
}, function(e, t, n) {
    n(82)("iterator")
}, function(e, t, n) {
    var r = {};
    r[n(1)("toStringTag")] = "z", e.exports = "[object z]" === String(r)
}, function(e, t, n) {
    "use strict";
    var r = n(3),
        o = n(7),
        i = n(35),
        a = n(76),
        c = n(13),
        s = n(10),
        u = n(39),
        f = n(1),
        l = n(41),
        d = n(25),
        p = l("slice"),
        h = d("slice", {
            ACCESSORS: !0,
            0: 0,
            1: 2
        }),
        v = f("species"),
        m = [].slice,
        g = Math.max;
    r({
        target: "Array",
        proto: !0,
        forced: !p || !h
    }, {
        slice: function(e, t) {
            var n, r, f, l = s(this),
                d = c(l.length),
                p = a(e, d),
                h = a(void 0 === t ? d : t, d);
            if (i(l) && ("function" != typeof(n = l.constructor) || n !== Array && !i(n.prototype) ? o(n) && null === (n = n[v]) && (n = void 0) : n = void 0, n === Array || void 0 === n)) return m.call(l, p, h);
            for (r = new(void 0 === n ? Array : n)(g(h - p, 0)), f = 0; p < h; p++, f++) p in l && u(r, f, l[p]);
            return r.length = f, r
        }
    })
}, function(e, t, n) {
    var r, o, i = n(0),
        a = n(94),
        c = i.process,
        s = c && c.versions,
        u = s && s.v8;
    u ? o = (r = u.split("."))[0] + r[1] : a && (!(r = a.match(/Edge\/(\d+)/)) || r[1] >= 74) && (r = a.match(/Chrome\/(\d+)/)) && (o = r[1]), e.exports = o && +o
}, function(e, t, n) {
    "use strict";
    var r, o, i, a, c = n(3),
        s = n(23),
        u = n(0),
        f = n(16),
        l = n(119),
        d = n(11),
        p = n(120),
        h = n(36),
        v = n(121),
        m = n(7),
        g = n(38),
        y = n(122),
        b = n(12),
        w = n(48),
        _ = n(123),
        S = n(89),
        x = n(124),
        E = n(95).set,
        k = n(125),
        O = n(126),
        T = n(127),
        A = n(97),
        C = n(128),
        I = n(22),
        N = n(78),
        L = n(1),
        P = n(60),
        j = L("species"),
        D = "Promise",
        M = I.get,
        R = I.set,
        B = I.getterFor(D),
        F = l,
        W = u.TypeError,
        H = u.document,
        U = u.process,
        q = f("fetch"),
        V = A.f,
        z = V,
        K = "process" == b(U),
        G = !!(H && H.createEvent && u.dispatchEvent),
        Y = N(D, (function() {
            if (!(w(F) !== String(F))) {
                if (66 === P) return !0;
                if (!K && "function" != typeof PromiseRejectionEvent) return !0
            }
            if (s && !F.prototype.finally) return !0;
            if (P >= 51 && /native code/.test(F)) return !1;
            var e = F.resolve(1),
                t = function(e) {
                    e((function() {}), (function() {}))
                };
            return (e.constructor = {})[j] = t, !(e.then((function() {})) instanceof t)
        })),
        $ = Y || !S((function(e) {
            F.all(e).catch((function() {}))
        })),
        J = function(e) {
            var t;
            return !(!m(e) || "function" != typeof(t = e.then)) && t
        },
        Q = function(e, t, n) {
            if (!t.notified) {
                t.notified = !0;
                var r = t.reactions;
                k((function() {
                    for (var o = t.value, i = 1 == t.state, a = 0; r.length > a;) {
                        var c, s, u, f = r[a++],
                            l = i ? f.ok : f.fail,
                            d = f.resolve,
                            p = f.reject,
                            h = f.domain;
                        try {
                            l ? (i || (2 === t.rejection && te(e, t), t.rejection = 1), !0 === l ? c = o : (h && h.enter(), c = l(o), h && (h.exit(), u = !0)), c === f.promise ? p(W("Promise-chain cycle")) : (s = J(c)) ? s.call(c, d, p) : d(c)) : p(o)
                        } catch (e) {
                            h && !u && h.exit(), p(e)
                        }
                    }
                    t.reactions = [], t.notified = !1, n && !t.rejection && Z(e, t)
                }))
            }
        },
        X = function(e, t, n) {
            var r, o;
            G ? ((r = H.createEvent("Event")).promise = t, r.reason = n, r.initEvent(e, !1, !0), u.dispatchEvent(r)) : r = {
                promise: t,
                reason: n
            }, (o = u["on" + e]) ? o(r) : "unhandledrejection" === e && T("Unhandled promise rejection", n)
        },
        Z = function(e, t) {
            E.call(u, (function() {
                var n, r = t.value;
                if (ee(t) && (n = C((function() {
                        K ? U.emit("unhandledRejection", r, e) : X("unhandledrejection", e, r)
                    })), t.rejection = K || ee(t) ? 2 : 1, n.error)) throw n.value
            }))
        },
        ee = function(e) {
            return 1 !== e.rejection && !e.parent
        },
        te = function(e, t) {
            E.call(u, (function() {
                K ? U.emit("rejectionHandled", e) : X("rejectionhandled", e, t.value)
            }))
        },
        ne = function(e, t, n, r) {
            return function(o) {
                e(t, n, o, r)
            }
        },
        re = function(e, t, n, r) {
            t.done || (t.done = !0, r && (t = r), t.value = n, t.state = 2, Q(e, t, !0))
        },
        oe = function(e, t, n, r) {
            if (!t.done) {
                t.done = !0, r && (t = r);
                try {
                    if (e === n) throw W("Promise can't be resolved itself");
                    var o = J(n);
                    o ? k((function() {
                        var r = {
                            done: !1
                        };
                        try {
                            o.call(n, ne(oe, e, r, t), ne(re, e, r, t))
                        } catch (n) {
                            re(e, r, n, t)
                        }
                    })) : (t.value = n, t.state = 1, Q(e, t, !1))
                } catch (n) {
                    re(e, {
                        done: !1
                    }, n, t)
                }
            }
        };
    Y && (F = function(e) {
        y(this, F, D), g(e), r.call(this);
        var t = M(this);
        try {
            e(ne(oe, this, t), ne(re, this, t))
        } catch (e) {
            re(this, t, e)
        }
    }, (r = function(e) {
        R(this, {
            type: D,
            done: !1,
            notified: !1,
            parent: !1,
            reactions: [],
            rejection: !1,
            state: 0,
            value: void 0
        })
    }).prototype = p(F.prototype, {
        then: function(e, t) {
            var n = B(this),
                r = V(x(this, F));
            return r.ok = "function" != typeof e || e, r.fail = "function" == typeof t && t, r.domain = K ? U.domain : void 0, n.parent = !0, n.reactions.push(r), 0 != n.state && Q(this, n, !1), r.promise
        },
        catch: function(e) {
            return this.then(void 0, e)
        }
    }), o = function() {
        var e = new r,
            t = M(e);
        this.promise = e, this.resolve = ne(oe, e, t), this.reject = ne(re, e, t)
    }, A.f = V = function(e) {
        return e === F || e === i ? new o(e) : z(e)
    }, s || "function" != typeof l || (a = l.prototype.then, d(l.prototype, "then", (function(e, t) {
        var n = this;
        return new F((function(e, t) {
            a.call(n, e, t)
        })).then(e, t)
    }), {
        unsafe: !0
    }), "function" == typeof q && c({
        global: !0,
        enumerable: !0,
        forced: !0
    }, {
        fetch: function(e) {
            return O(F, q.apply(u, arguments))
        }
    }))), c({
        global: !0,
        wrap: !0,
        forced: Y
    }, {
        Promise: F
    }), h(F, D, !1, !0), v(D), i = f(D), c({
        target: D,
        stat: !0,
        forced: Y
    }, {
        reject: function(e) {
            var t = V(this);
            return t.reject.call(void 0, e), t.promise
        }
    }), c({
        target: D,
        stat: !0,
        forced: s || Y
    }, {
        resolve: function(e) {
            return O(s && this === i ? F : this, e)
        }
    }), c({
        target: D,
        stat: !0,
        forced: $
    }, {
        all: function(e) {
            var t = this,
                n = V(t),
                r = n.resolve,
                o = n.reject,
                i = C((function() {
                    var n = g(t.resolve),
                        i = [],
                        a = 0,
                        c = 1;
                    _(e, (function(e) {
                        var s = a++,
                            u = !1;
                        i.push(void 0), c++, n.call(t, e).then((function(e) {
                            u || (u = !0, i[s] = e, --c || r(i))
                        }), o)
                    })), --c || r(i)
                }));
            return i.error && o(i.value), n.promise
        },
        race: function(e) {
            var t = this,
                n = V(t),
                r = n.reject,
                o = C((function() {
                    var o = g(t.resolve);
                    _(e, (function(e) {
                        o.call(t, e).then(n.resolve, r)
                    }))
                }));
            return o.error && r(o.value), n.promise
        }
    })
}, function(e, t, n) {
    "use strict";
    var r = n(3),
        o = n(63);
    r({
        target: "RegExp",
        proto: !0,
        forced: /./.exec !== o
    }, {
        exec: o
    })
}, function(e, t, n) {
    "use strict";
    var r, o, i = n(98),
        a = n(129),
        c = RegExp.prototype.exec,
        s = String.prototype.replace,
        u = c,
        f = (r = /a/, o = /b*/g, c.call(r, "a"), c.call(o, "a"), 0 !== r.lastIndex || 0 !== o.lastIndex),
        l = a.UNSUPPORTED_Y || a.BROKEN_CARET,
        d = void 0 !== /()??/.exec("")[1];
    (f || d || l) && (u = function(e) {
        var t, n, r, o, a = this,
            u = l && a.sticky,
            p = i.call(a),
            h = a.source,
            v = 0,
            m = e;
        return u && (-1 === (p = p.replace("y", "")).indexOf("g") && (p += "g"), m = String(e).slice(a.lastIndex), a.lastIndex > 0 && (!a.multiline || a.multiline && "\n" !== e[a.lastIndex - 1]) && (h = "(?: " + h + ")", m = " " + m, v++), n = new RegExp("^(?:" + h + ")", p)), d && (n = new RegExp("^" + h + "$(?!\\s)", p)), f && (t = a.lastIndex), r = c.call(u ? n : a, m), u ? r ? (r.input = r.input.slice(v), r[0] = r[0].slice(v), r.index = a.lastIndex, a.lastIndex += r[0].length) : a.lastIndex = 0 : f && r && (a.lastIndex = a.global ? r.index + r[0].length : t), d && r && r.length > 1 && s.call(r[0], n, (function() {
            for (o = 1; o < arguments.length - 2; o++) void 0 === arguments[o] && (r[o] = void 0)
        })), r
    }), e.exports = u
}, function(e, t, n) {
    "use strict";
    var r = n(11),
        o = n(5),
        i = n(2),
        a = n(98),
        c = RegExp.prototype,
        s = c.toString,
        u = i((function() {
            return "/a/b" != s.call({
                source: "a",
                flags: "b"
            })
        })),
        f = "toString" != s.name;
    (u || f) && r(RegExp.prototype, "toString", (function() {
        var e = o(this),
            t = String(e.source),
            n = e.flags;
        return "/" + t + "/" + String(void 0 === n && e instanceof RegExp && !("flags" in c) ? a.call(e) : n)
    }), {
        unsafe: !0
    })
}, function(e, t, n) {
    var r = n(0),
        o = n(101),
        i = n(40),
        a = n(9),
        c = n(1),
        s = c("iterator"),
        u = c("toStringTag"),
        f = i.values;
    for (var l in o) {
        var d = r[l],
            p = d && d.prototype;
        if (p) {
            if (p[s] !== f) try {
                a(p, s, f)
            } catch (e) {
                p[s] = f
            }
            if (p[u] || a(p, u, l), o[l])
                for (var h in i)
                    if (p[h] !== i[h]) try {
                        a(p, h, i[h])
                    } catch (e) {
                        p[h] = i[h]
                    }
        }
    }
}, function(e, t, n) {
    "use strict";
    var r = n(3),
        o = n(24).filter,
        i = n(41),
        a = n(25),
        c = i("filter"),
        s = a("filter");
    r({
        target: "Array",
        proto: !0,
        forced: !c || !s
    }, {
        filter: function(e) {
            return o(this, e, arguments.length > 1 ? arguments[1] : void 0)
        }
    })
}, function(e, t, n) {
    "use strict";
    Object.defineProperty(t, "__esModule", {
        value: !0
    });
    var r, o = n(137),
        i = n(29),
        a = n(139),
        c = ((r = {})["no-app"] = "No Firebase App '{$appName}' has been created - call Firebase App.initializeApp()", r["bad-app-name"] = "Illegal App name: '{$appName}", r["duplicate-app"] = "Firebase App named '{$appName}' already exists", r["app-deleted"] = "Firebase App named '{$appName}' already deleted", r["invalid-app-argument"] = "firebase.{$appName}() takes either no argument or a Firebase App instance.", r),
        s = new i.ErrorFactory("app", "Firebase", c),
        u = [],
        f = function() {
            function e(e, t, n) {
                this.firebase_ = n, this.isDeleted_ = !1, this.services_ = {}, this.name_ = t.name, this.automaticDataCollectionEnabled_ = t.automaticDataCollectionEnabled || !1, this.options_ = i.deepCopy(e), this.INTERNAL = {
                    getUid: function() {
                        return null
                    },
                    getToken: function() {
                        return Promise.resolve(null)
                    },
                    addAuthTokenListener: function(e) {
                        u.push(e), setTimeout((function() {
                            return e(null)
                        }), 0)
                    },
                    removeAuthTokenListener: function(e) {
                        u = u.filter((function(t) {
                            return t !== e
                        }))
                    }
                }
            }
            return Object.defineProperty(e.prototype, "automaticDataCollectionEnabled", {
                get: function() {
                    return this.checkDestroyed_(), this.automaticDataCollectionEnabled_
                },
                set: function(e) {
                    this.checkDestroyed_(), this.automaticDataCollectionEnabled_ = e
                },
                enumerable: !0,
                configurable: !0
            }), Object.defineProperty(e.prototype, "name", {
                get: function() {
                    return this.checkDestroyed_(), this.name_
                },
                enumerable: !0,
                configurable: !0
            }), Object.defineProperty(e.prototype, "options", {
                get: function() {
                    return this.checkDestroyed_(), this.options_
                },
                enumerable: !0,
                configurable: !0
            }), e.prototype.delete = function() {
                var e = this;
                return new Promise((function(t) {
                    e.checkDestroyed_(), t()
                })).then((function() {
                    e.firebase_.INTERNAL.removeApp(e.name_);
                    for (var t = [], n = 0, r = Object.keys(e.services_); n < r.length; n++)
                        for (var o = r[n], i = 0, a = Object.keys(e.services_[o]); i < a.length; i++) {
                            var c = a[i];
                            t.push(e.services_[o][c])
                        }
                    return Promise.all(t.filter((function(e) {
                        return "INTERNAL" in e
                    })).map((function(e) {
                        return e.INTERNAL.delete()
                    })))
                })).then((function() {
                    e.isDeleted_ = !0, e.services_ = {}
                }))
            }, e.prototype._getService = function(e, t) {
                if (void 0 === t && (t = "[DEFAULT]"), this.checkDestroyed_(), this.services_[e] || (this.services_[e] = {}), !this.services_[e][t]) {
                    var n = "[DEFAULT]" !== t ? t : void 0,
                        r = this.firebase_.INTERNAL.factories[e](this, this.extendApp.bind(this), n);
                    this.services_[e][t] = r
                }
                return this.services_[e][t]
            }, e.prototype._removeServiceInstance = function(e, t) {
                void 0 === t && (t = "[DEFAULT]"), this.services_[e] && this.services_[e][t] && delete this.services_[e][t]
            }, e.prototype.extendApp = function(e) {
                var t = this;
                i.deepExtend(this, e), e.INTERNAL && e.INTERNAL.addAuthTokenListener && (u.forEach((function(e) {
                    t.INTERNAL.addAuthTokenListener(e)
                })), u = [])
            }, e.prototype.checkDestroyed_ = function() {
                if (this.isDeleted_) throw s.create("app-deleted", {
                    appName: this.name_
                })
            }, e
        }();
    f.prototype.name && f.prototype.options || f.prototype.delete || console.log("dc");
    var l = new a.Logger("@firebase/app");
    if (i.isBrowser() && void 0 !== self.firebase) {
        l.warn("\n    Warning: Firebase is already defined in the global scope. Please make sure\n    Firebase library is only loaded once.\n  ");
        var d = self.firebase.SDK_VERSION;
        d && d.indexOf("LITE") >= 0 && l.warn("\n    Warning: You are trying to load Firebase while using Firebase Performance standalone script.\n    You should load Firebase Performance with this instance of Firebase to avoid loading duplicate code.\n    ")
    }
    var p = function e() {
            var t = function(e) {
                var t = {},
                    n = {},
                    r = {},
                    o = {
                        __esModule: !0,
                        initializeApp: function(n, r) {
                            void 0 === r && (r = {});
                            if ("object" != typeof r || null === r) {
                                r = {
                                    name: r
                                }
                            }
                            var a = r;
                            void 0 === a.name && (a.name = "[DEFAULT]");
                            var c = a.name;
                            if ("string" != typeof c || !c) throw s.create("bad-app-name", {
                                appName: String(c)
                            });
                            if (i.contains(t, c)) throw s.create("duplicate-app", {
                                appName: c
                            });
                            var f = new e(n, a, o);
                            return t[c] = f, u(f, "create"), f
                        },
                        app: a,
                        apps: null,
                        SDK_VERSION: "6.6.2",
                        INTERNAL: {
                            registerService: function(t, u, f, d, p) {
                                void 0 === p && (p = !1);
                                if (n[t]) return l.debug("There were multiple attempts to register service " + t + "."), o[t];
                                n[t] = u, d && (r[t] = d, c().forEach((function(e) {
                                    d("create", e)
                                })));

                                function h(e) {
                                    if (void 0 === e && (e = a()), "function" != typeof e[t]) throw s.create("invalid-app-argument", {
                                        appName: t
                                    });
                                    return e[t]()
                                }
                                void 0 !== f && i.deepExtend(h, f);
                                return o[t] = h, e.prototype[t] = function() {
                                    for (var e = [], n = 0; n < arguments.length; n++) e[n] = arguments[n];
                                    var r = this._getService.bind(this, t);
                                    return r.apply(this, p ? e : [])
                                }, h
                            },
                            removeApp: function(e) {
                                u(t[e], "delete"), delete t[e]
                            },
                            factories: n,
                            useAsService: f
                        }
                    };

                function a(e) {
                    if (e = e || "[DEFAULT]", !i.contains(t, e)) throw s.create("no-app", {
                        appName: e
                    });
                    return t[e]
                }

                function c() {
                    return Object.keys(t).map((function(e) {
                        return t[e]
                    }))
                }

                function u(e, t) {
                    for (var o = 0, i = Object.keys(n); o < i.length; o++) {
                        var a = f(e, i[o]);
                        if (null === a) return;
                        r[a] && r[a](t, e)
                    }
                }

                function f(e, t) {
                    return "serverAuth" === t ? null : t
                }
                return o.default = o, Object.defineProperty(o, "apps", {
                    get: c
                }), a.App = e, o
            }(f);
            return t.INTERNAL = o.__assign({}, t.INTERNAL, {
                createFirebaseNamespace: e,
                extendNamespace: function(e) {
                    i.deepExtend(t, e)
                },
                createSubscribe: i.createSubscribe,
                ErrorFactory: i.ErrorFactory,
                deepExtend: i.deepExtend
            }), t
        }(),
        h = p.initializeApp;
    p.initializeApp = function() {
        for (var e = [], t = 0; t < arguments.length; t++) e[t] = arguments[t];
        return i.isNode() && l.warn('\n      Warning: This is a browser-targeted Firebase bundle but it appears it is being\n      run in a Node environment.  If running in a Node environment, make sure you\n      are using the bundle specified by the "main" field in package.json.\n      \n      If you are using Webpack, you can specify "main" as the first item in\n      "resolve.mainFields":\n      https://webpack.js.org/configuration/resolve/#resolvemainfields\n      \n      If using Rollup, use the rollup-plugin-node-resolve plugin and specify "main"\n      as the first item in "mainFields", e.g. [\'main\', \'module\'].\n      https://github.com/rollup/rollup-plugin-node-resolve\n      '), h.apply(void 0, e)
    };
    var v = p;
    t.default = v, t.firebase = v
}, function(e, t, n) {
    "use strict";
    var r = {}.propertyIsEnumerable,
        o = Object.getOwnPropertyDescriptor,
        i = o && !r.call({
            1: 2
        }, 1);
    t.f = i ? function(e) {
        var t = o(this, e);
        return !!t && t.enumerable
    } : r
}, function(e, t, n) {
    var r = n(2),
        o = n(12),
        i = "".split;
    e.exports = r((function() {
        return !Object("z").propertyIsEnumerable(0)
    })) ? function(e) {
        return "String" == o(e) ? i.call(e, "") : Object(e)
    } : Object
}, function(e, t, n) {
    var r = n(6),
        o = n(2),
        i = n(46);
    e.exports = !r && !o((function() {
        return 7 != Object.defineProperty(i("div"), "a", {
            get: function() {
                return 7
            }
        }).a
    }))
}, function(e, t, n) {
    var r = n(0),
        o = n(47),
        i = r["__core-js_shared__"] || o("__core-js_shared__", {});
    e.exports = i
}, function(e, t, n) {
    var r = n(4),
        o = n(73),
        i = n(15),
        a = n(8);
    e.exports = function(e, t) {
        for (var n = o(t), c = a.f, s = i.f, u = 0; u < n.length; u++) {
            var f = n[u];
            r(e, f) || c(e, f, s(t, f))
        }
    }
}, function(e, t, n) {
    var r = n(16),
        o = n(51),
        i = n(77),
        a = n(5);
    e.exports = r("Reflect", "ownKeys") || function(e) {
        var t = o.f(a(e)),
            n = i.f;
        return n ? t.concat(n(e)) : t
    }
}, function(e, t, n) {
    var r = n(0);
    e.exports = r
}, function(e, t, n) {
    var r = n(4),
        o = n(10),
        i = n(109).indexOf,
        a = n(33);
    e.exports = function(e, t) {
        var n, c = o(e),
            s = 0,
            u = [];
        for (n in c) !r(a, n) && r(c, n) && u.push(n);
        for (; t.length > s;) r(c, n = t[s++]) && (~i(u, n) || u.push(n));
        return u
    }
}, function(e, t, n) {
    var r = n(34),
        o = Math.max,
        i = Math.min;
    e.exports = function(e, t) {
        var n = r(e);
        return n < 0 ? o(n + t, 0) : i(n, t)
    }
}, function(e, t) {
    t.f = Object.getOwnPropertySymbols
}, function(e, t, n) {
    var r = n(2),
        o = /#|\.prototype\./,
        i = function(e, t) {
            var n = c[a(e)];
            return n == u || n != s && ("function" == typeof t ? r(t) : !!t)
        },
        a = i.normalize = function(e) {
            return String(e).replace(o, ".").toLowerCase()
        },
        c = i.data = {},
        s = i.NATIVE = "N",
        u = i.POLYFILL = "P";
    e.exports = i
}, function(e, t, n) {
    var r = n(53);
    e.exports = r && !Symbol.sham && "symbol" == typeof Symbol.iterator
}, function(e, t, n) {
    var r = n(16);
    e.exports = r("document", "documentElement")
}, function(e, t, n) {
    var r = n(1);
    t.f = r
}, function(e, t, n) {
    var r = n(74),
        o = n(4),
        i = n(81),
        a = n(8).f;
    e.exports = function(e) {
        var t = r.Symbol || (r.Symbol = {});
        o(t, e) || a(t, e, {
            value: i.f(e)
        })
    }
}, function(e, t, n) {
    var r = n(7),
        o = n(35),
        i = n(1)("species");
    e.exports = function(e, t) {
        var n;
        return o(e) && ("function" != typeof(n = e.constructor) || n !== Array && !o(n.prototype) ? r(n) && null === (n = n[i]) && (n = void 0) : n = void 0), new(void 0 === n ? Array : n)(0 === t ? 0 : t)
    }
}, function(e, t, n) {
    "use strict";
    var r = n(24).forEach,
        o = n(112),
        i = n(25),
        a = o("forEach"),
        c = i("forEach");
    e.exports = a && c ? [].forEach : function(e) {
        return r(this, e, arguments.length > 1 ? arguments[1] : void 0)
    }
}, function(e, t, n) {
    var r = n(5);
    e.exports = function(e, t, n, o) {
        try {
            return o ? t(r(n)[0], n[1]) : t(n)
        } catch (t) {
            var i = e.return;
            throw void 0 !== i && r(i.call(e)), t
        }
    }
}, function(e, t, n) {
    var r = n(1),
        o = n(27),
        i = r("iterator"),
        a = Array.prototype;
    e.exports = function(e) {
        return void 0 !== e && (o.Array === e || a[i] === e)
    }
}, function(e, t, n) {
    var r = n(88),
        o = n(27),
        i = n(1)("iterator");
    e.exports = function(e) {
        if (null != e) return e[i] || e["@@iterator"] || o[r(e)]
    }
}, function(e, t, n) {
    var r = n(58),
        o = n(12),
        i = n(1)("toStringTag"),
        a = "Arguments" == o(function() {
            return arguments
        }());
    e.exports = r ? o : function(e) {
        var t, n, r;
        return void 0 === e ? "Undefined" : null === e ? "Null" : "string" == typeof(n = function(e, t) {
            try {
                return e[t]
            } catch (e) {}
        }(t = Object(e), i)) ? n : a ? o(t) : "Object" == (r = o(t)) && "function" == typeof t.callee ? "Arguments" : r
    }
}, function(e, t, n) {
    var r = n(1)("iterator"),
        o = !1;
    try {
        var i = 0,
            a = {
                next: function() {
                    return {
                        done: !!i++
                    }
                },
                return: function() {
                    o = !0
                }
            };
        a[r] = function() {
            return this
        }, Array.from(a, (function() {
            throw 2
        }))
    } catch (e) {}
    e.exports = function(e, t) {
        if (!t && !o) return !1;
        var n = !1;
        try {
            var i = {};
            i[r] = function() {
                return {
                    next: function() {
                        return {
                            done: n = !0
                        }
                    }
                }
            }, e(i)
        } catch (e) {}
        return n
    }
}, function(e, t, n) {
    var r = n(1),
        o = n(54),
        i = n(8),
        a = r("unscopables"),
        c = Array.prototype;
    null == c[a] && i.f(c, a, {
        configurable: !0,
        value: o(null)
    }), e.exports = function(e) {
        c[a][e] = !0
    }
}, function(e, t, n) {
    "use strict";
    var r = n(3),
        o = n(114),
        i = n(93),
        a = n(116),
        c = n(36),
        s = n(9),
        u = n(11),
        f = n(1),
        l = n(23),
        d = n(27),
        p = n(92),
        h = p.IteratorPrototype,
        v = p.BUGGY_SAFARI_ITERATORS,
        m = f("iterator"),
        g = function() {
            return this
        };
    e.exports = function(e, t, n, f, p, y, b) {
        o(n, t, f);
        var w, _, S, x = function(e) {
                if (e === p && A) return A;
                if (!v && e in O) return O[e];
                switch (e) {
                    case "keys":
                    case "values":
                    case "entries":
                        return function() {
                            return new n(this, e)
                        }
                }
                return function() {
                    return new n(this)
                }
            },
            E = t + " Iterator",
            k = !1,
            O = e.prototype,
            T = O[m] || O["@@iterator"] || p && O[p],
            A = !v && T || x(p),
            C = "Array" == t && O.entries || T;
        if (C && (w = i(C.call(new e)), h !== Object.prototype && w.next && (l || i(w) === h || (a ? a(w, h) : "function" != typeof w[m] && s(w, m, g)), c(w, E, !0, !0), l && (d[E] = g))), "values" == p && T && "values" !== T.name && (k = !0, A = function() {
                return T.call(this)
            }), l && !b || O[m] === A || s(O, m, A), d[t] = A, p)
            if (_ = {
                    values: x("values"),
                    keys: y ? A : x("keys"),
                    entries: x("entries")
                }, b)
                for (S in _)(v || k || !(S in O)) && u(O, S, _[S]);
            else r({
                target: t,
                proto: !0,
                forced: v || k
            }, _);
        return _
    }
}, function(e, t, n) {
    "use strict";
    var r, o, i, a = n(93),
        c = n(9),
        s = n(4),
        u = n(1),
        f = n(23),
        l = u("iterator"),
        d = !1;
    [].keys && ("next" in (i = [].keys()) ? (o = a(a(i))) !== Object.prototype && (r = o) : d = !0), null == r && (r = {}), f || s(r, l) || c(r, l, (function() {
        return this
    })), e.exports = {
        IteratorPrototype: r,
        BUGGY_SAFARI_ITERATORS: d
    }
}, function(e, t, n) {
    var r = n(4),
        o = n(14),
        i = n(32),
        a = n(115),
        c = i("IE_PROTO"),
        s = Object.prototype;
    e.exports = a ? Object.getPrototypeOf : function(e) {
        return e = o(e), r(e, c) ? e[c] : "function" == typeof e.constructor && e instanceof e.constructor ? e.constructor.prototype : e instanceof Object ? s : null
    }
}, function(e, t, n) {
    var r = n(16);
    e.exports = r("navigator", "userAgent") || ""
}, function(e, t, n) {
    var r, o, i, a = n(0),
        c = n(2),
        s = n(12),
        u = n(37),
        f = n(80),
        l = n(46),
        d = n(96),
        p = a.location,
        h = a.setImmediate,
        v = a.clearImmediate,
        m = a.process,
        g = a.MessageChannel,
        y = a.Dispatch,
        b = 0,
        w = {},
        _ = function(e) {
            if (w.hasOwnProperty(e)) {
                var t = w[e];
                delete w[e], t()
            }
        },
        S = function(e) {
            return function() {
                _(e)
            }
        },
        x = function(e) {
            _(e.data)
        },
        E = function(e) {
            a.postMessage(e + "", p.protocol + "//" + p.host)
        };
    h && v || (h = function(e) {
        for (var t = [], n = 1; arguments.length > n;) t.push(arguments[n++]);
        return w[++b] = function() {
            ("function" == typeof e ? e : Function(e)).apply(void 0, t)
        }, r(b), b
    }, v = function(e) {
        delete w[e]
    }, "process" == s(m) ? r = function(e) {
        m.nextTick(S(e))
    } : y && y.now ? r = function(e) {
        y.now(S(e))
    } : g && !d ? (i = (o = new g).port2, o.port1.onmessage = x, r = u(i.postMessage, i, 1)) : !a.addEventListener || "function" != typeof postMessage || a.importScripts || c(E) || "file:" === p.protocol ? r = "onreadystatechange" in l("script") ? function(e) {
        f.appendChild(l("script")).onreadystatechange = function() {
            f.removeChild(this), _(e)
        }
    } : function(e) {
        setTimeout(S(e), 0)
    } : (r = E, a.addEventListener("message", x, !1))), e.exports = {
        set: h,
        clear: v
    }
}, function(e, t, n) {
    var r = n(94);
    e.exports = /(iphone|ipod|ipad).*applewebkit/i.test(r)
}, function(e, t, n) {
    "use strict";
    var r = n(38),
        o = function(e) {
            var t, n;
            this.promise = new e((function(e, r) {
                if (void 0 !== t || void 0 !== n) throw TypeError("Bad Promise constructor");
                t = e, n = r
            })), this.resolve = r(t), this.reject = r(n)
        };
    e.exports.f = function(e) {
        return new o(e)
    }
}, function(e, t, n) {
    "use strict";
    var r = n(5);
    e.exports = function() {
        var e = r(this),
            t = "";
        return e.global && (t += "g"), e.ignoreCase && (t += "i"), e.multiline && (t += "m"), e.dotAll && (t += "s"), e.unicode && (t += "u"), e.sticky && (t += "y"), t
    }
}, function(e, t, n) {
    var r = n(34),
        o = n(21),
        i = function(e) {
            return function(t, n) {
                var i, a, c = String(o(t)),
                    s = r(n),
                    u = c.length;
                return s < 0 || s >= u ? e ? "" : void 0 : (i = c.charCodeAt(s)) < 55296 || i > 56319 || s + 1 === u || (a = c.charCodeAt(s + 1)) < 56320 || a > 57343 ? e ? c.charAt(s) : i : e ? c.slice(s, s + 2) : a - 56320 + (i - 55296 << 10) + 65536
            }
        };
    e.exports = {
        codeAt: i(!1),
        charAt: i(!0)
    }
}, function(e, t, n) {
    "use strict";
    var r = n(130),
        o = n(5),
        i = n(14),
        a = n(13),
        c = n(34),
        s = n(21),
        u = n(131),
        f = n(132),
        l = Math.max,
        d = Math.min,
        p = Math.floor,
        h = /\$([$&'`]|\d\d?|<[^>]*>)/g,
        v = /\$([$&'`]|\d\d?)/g;
    r("replace", 2, (function(e, t, n, r) {
        var m = r.REGEXP_REPLACE_SUBSTITUTES_UNDEFINED_CAPTURE,
            g = r.REPLACE_KEEPS_$0,
            y = m ? "$" : "$0";
        return [function(n, r) {
            var o = s(this),
                i = null == n ? void 0 : n[e];
            return void 0 !== i ? i.call(n, o, r) : t.call(String(o), n, r)
        }, function(e, r) {
            if (!m && g || "string" == typeof r && -1 === r.indexOf(y)) {
                var i = n(t, e, this, r);
                if (i.done) return i.value
            }
            var s = o(e),
                p = String(this),
                h = "function" == typeof r;
            h || (r = String(r));
            var v = s.global;
            if (v) {
                var w = s.unicode;
                s.lastIndex = 0
            }
            for (var _ = [];;) {
                var S = f(s, p);
                if (null === S) break;
                if (_.push(S), !v) break;
                "" === String(S[0]) && (s.lastIndex = u(p, a(s.lastIndex), w))
            }
            for (var x, E = "", k = 0, O = 0; O < _.length; O++) {
                S = _[O];
                for (var T = String(S[0]), A = l(d(c(S.index), p.length), 0), C = [], I = 1; I < S.length; I++) C.push(void 0 === (x = S[I]) ? x : String(x));
                var N = S.groups;
                if (h) {
                    var L = [T].concat(C, A, p);
                    void 0 !== N && L.push(N);
                    var P = String(r.apply(void 0, L))
                } else P = b(T, p, A, C, N, r);
                A >= k && (E += p.slice(k, A) + P, k = A + T.length)
            }
            return E + p.slice(k)
        }];

        function b(e, n, r, o, a, c) {
            var s = r + e.length,
                u = o.length,
                f = v;
            return void 0 !== a && (a = i(a), f = h), t.call(c, f, (function(t, i) {
                var c;
                switch (i.charAt(0)) {
                    case "$":
                        return "$";
                    case "&":
                        return e;
                    case "`":
                        return n.slice(0, r);
                    case "'":
                        return n.slice(s);
                    case "<":
                        c = a[i.slice(1, -1)];
                        break;
                    default:
                        var f = +i;
                        if (0 === f) return t;
                        if (f > u) {
                            var l = p(f / 10);
                            return 0 === l ? t : l <= u ? void 0 === o[l - 1] ? i.charAt(1) : o[l - 1] + i.charAt(1) : t
                        }
                        c = o[f - 1]
                }
                return void 0 === c ? "" : c
            }))
        }
    }))
}, function(e, t) {
    e.exports = {
        CSSRuleList: 0,
        CSSStyleDeclaration: 0,
        CSSValueList: 0,
        ClientRectList: 0,
        DOMRectList: 0,
        DOMStringList: 0,
        DOMTokenList: 1,
        DataTransferItemList: 0,
        FileList: 0,
        HTMLAllCollection: 0,
        HTMLCollection: 0,
        HTMLFormElement: 0,
        HTMLSelectElement: 0,
        MediaList: 0,
        MimeTypeArray: 0,
        NamedNodeMap: 0,
        NodeList: 1,
        PaintRequestList: 0,
        Plugin: 0,
        PluginArray: 0,
        SVGLengthList: 0,
        SVGNumberList: 0,
        SVGPathSegList: 0,
        SVGPointList: 0,
        SVGStringList: 0,
        SVGTransformList: 0,
        SourceBufferList: 0,
        StyleSheetList: 0,
        TextTrackCueList: 0,
        TextTrackList: 0,
        TouchList: 0
    }
}, function(e, t, n) {
    "use strict";
    var r = n(3),
        o = n(24).map,
        i = n(41),
        a = n(25),
        c = i("map"),
        s = a("map");
    r({
        target: "Array",
        proto: !0,
        forced: !c || !s
    }, {
        map: function(e) {
            return o(this, e, arguments.length > 1 ? arguments[1] : void 0)
        }
    })
}, function(e, t, n) {
    "use strict";
    var r = n(3),
        o = n(135);
    r({
        target: "String",
        proto: !0,
        forced: n(136)("link")
    }, {
        link: function(e) {
            return o(this, "a", "href", e)
        }
    })
}, function(e, t, n) {
    var r = function(e) {
        "use strict";
        var t = Object.prototype,
            n = t.hasOwnProperty,
            r = "function" == typeof Symbol ? Symbol : {},
            o = r.iterator || "@@iterator",
            i = r.asyncIterator || "@@asyncIterator",
            a = r.toStringTag || "@@toStringTag";

        function c(e, t, n, r) {
            var o = t && t.prototype instanceof f ? t : f,
                i = Object.create(o.prototype),
                a = new S(r || []);
            return i._invoke = function(e, t, n) {
                var r = "suspendedStart";
                return function(o, i) {
                    if ("executing" === r) throw new Error("Generator is already running");
                    if ("completed" === r) {
                        if ("throw" === o) throw i;
                        return E()
                    }
                    for (n.method = o, n.arg = i;;) {
                        var a = n.delegate;
                        if (a) {
                            var c = b(a, n);
                            if (c) {
                                if (c === u) continue;
                                return c
                            }
                        }
                        if ("next" === n.method) n.sent = n._sent = n.arg;
                        else if ("throw" === n.method) {
                            if ("suspendedStart" === r) throw r = "completed", n.arg;
                            n.dispatchException(n.arg)
                        } else "return" === n.method && n.abrupt("return", n.arg);
                        r = "executing";
                        var f = s(e, t, n);
                        if ("normal" === f.type) {
                            if (r = n.done ? "completed" : "suspendedYield", f.arg === u) continue;
                            return {
                                value: f.arg,
                                done: n.done
                            }
                        }
                        "throw" === f.type && (r = "completed", n.method = "throw", n.arg = f.arg)
                    }
                }
            }(e, n, a), i
        }

        function s(e, t, n) {
            try {
                return {
                    type: "normal",
                    arg: e.call(t, n)
                }
            } catch (e) {
                return {
                    type: "throw",
                    arg: e
                }
            }
        }
        e.wrap = c;
        var u = {};

        function f() {}

        function l() {}

        function d() {}
        var p = {};
        p[o] = function() {
            return this
        };
        var h = Object.getPrototypeOf,
            v = h && h(h(x([])));
        v && v !== t && n.call(v, o) && (p = v);
        var m = d.prototype = f.prototype = Object.create(p);

        function g(e) {
            ["next", "throw", "return"].forEach((function(t) {
                e[t] = function(e) {
                    return this._invoke(t, e)
                }
            }))
        }

        function y(e, t) {
            var r;
            this._invoke = function(o, i) {
                function a() {
                    return new t((function(r, a) {
                        ! function r(o, i, a, c) {
                            var u = s(e[o], e, i);
                            if ("throw" !== u.type) {
                                var f = u.arg,
                                    l = f.value;
                                return l && "object" == typeof l && n.call(l, "__await") ? t.resolve(l.__await).then((function(e) {
                                    r("next", e, a, c)
                                }), (function(e) {
                                    r("throw", e, a, c)
                                })) : t.resolve(l).then((function(e) {
                                    f.value = e, a(f)
                                }), (function(e) {
                                    return r("throw", e, a, c)
                                }))
                            }
                            c(u.arg)
                        }(o, i, r, a)
                    }))
                }
                return r = r ? r.then(a, a) : a()
            }
        }

        function b(e, t) {
            var n = e.iterator[t.method];
            if (void 0 === n) {
                if (t.delegate = null, "throw" === t.method) {
                    if (e.iterator.return && (t.method = "return", t.arg = void 0, b(e, t), "throw" === t.method)) return u;
                    t.method = "throw", t.arg = new TypeError("The iterator does not provide a 'throw' method")
                }
                return u
            }
            var r = s(n, e.iterator, t.arg);
            if ("throw" === r.type) return t.method = "throw", t.arg = r.arg, t.delegate = null, u;
            var o = r.arg;
            return o ? o.done ? (t[e.resultName] = o.value, t.next = e.nextLoc, "return" !== t.method && (t.method = "next", t.arg = void 0), t.delegate = null, u) : o : (t.method = "throw", t.arg = new TypeError("iterator result is not an object"), t.delegate = null, u)
        }

        function w(e) {
            var t = {
                tryLoc: e[0]
            };
            1 in e && (t.catchLoc = e[1]), 2 in e && (t.finallyLoc = e[2], t.afterLoc = e[3]), this.tryEntries.push(t)
        }

        function _(e) {
            var t = e.completion || {};
            t.type = "normal", delete t.arg, e.completion = t
        }

        function S(e) {
            this.tryEntries = [{
                tryLoc: "root"
            }], e.forEach(w, this), this.reset(!0)
        }

        function x(e) {
            if (e) {
                var t = e[o];
                if (t) return t.call(e);
                if ("function" == typeof e.next) return e;
                if (!isNaN(e.length)) {
                    var r = -1,
                        i = function t() {
                            for (; ++r < e.length;)
                                if (n.call(e, r)) return t.value = e[r], t.done = !1, t;
                            return t.value = void 0, t.done = !0, t
                        };
                    return i.next = i
                }
            }
            return {
                next: E
            }
        }

        function E() {
            return {
                value: void 0,
                done: !0
            }
        }
        return l.prototype = m.constructor = d, d.constructor = l, d[a] = l.displayName = "GeneratorFunction", e.isGeneratorFunction = function(e) {
            var t = "function" == typeof e && e.constructor;
            return !!t && (t === l || "GeneratorFunction" === (t.displayName || t.name))
        }, e.mark = function(e) {
            return Object.setPrototypeOf ? Object.setPrototypeOf(e, d) : (e.__proto__ = d, a in e || (e[a] = "GeneratorFunction")), e.prototype = Object.create(m), e
        }, e.awrap = function(e) {
            return {
                __await: e
            }
        }, g(y.prototype), y.prototype[i] = function() {
            return this
        }, e.AsyncIterator = y, e.async = function(t, n, r, o, i) {
            void 0 === i && (i = Promise);
            var a = new y(c(t, n, r, o), i);
            return e.isGeneratorFunction(n) ? a : a.next().then((function(e) {
                return e.done ? e.value : a.next()
            }))
        }, g(m), m[a] = "Generator", m[o] = function() {
            return this
        }, m.toString = function() {
            return "[object Generator]"
        }, e.keys = function(e) {
            var t = [];
            for (var n in e) t.push(n);
            return t.reverse(),
                function n() {
                    for (; t.length;) {
                        var r = t.pop();
                        if (r in e) return n.value = r, n.done = !1, n
                    }
                    return n.done = !0, n
                }
        }, e.values = x, S.prototype = {
            constructor: S,
            reset: function(e) {
                if (this.prev = 0, this.next = 0, this.sent = this._sent = void 0, this.done = !1, this.delegate = null, this.method = "next", this.arg = void 0, this.tryEntries.forEach(_), !e)
                    for (var t in this) "t" === t.charAt(0) && n.call(this, t) && !isNaN(+t.slice(1)) && (this[t] = void 0)
            },
            stop: function() {
                this.done = !0;
                var e = this.tryEntries[0].completion;
                if ("throw" === e.type) throw e.arg;
                return this.rval
            },
            dispatchException: function(e) {
                if (this.done) throw e;
                var t = this;

                function r(n, r) {
                    return a.type = "throw", a.arg = e, t.next = n, r && (t.method = "next", t.arg = void 0), !!r
                }
                for (var o = this.tryEntries.length - 1; o >= 0; --o) {
                    var i = this.tryEntries[o],
                        a = i.completion;
                    if ("root" === i.tryLoc) return r("end");
                    if (i.tryLoc <= this.prev) {
                        var c = n.call(i, "catchLoc"),
                            s = n.call(i, "finallyLoc");
                        if (c && s) {
                            if (this.prev < i.catchLoc) return r(i.catchLoc, !0);
                            if (this.prev < i.finallyLoc) return r(i.finallyLoc)
                        } else if (c) {
                            if (this.prev < i.catchLoc) return r(i.catchLoc, !0)
                        } else {
                            if (!s) throw new Error("try statement without catch or finally");
                            if (this.prev < i.finallyLoc) return r(i.finallyLoc)
                        }
                    }
                }
            },
            abrupt: function(e, t) {
                for (var r = this.tryEntries.length - 1; r >= 0; --r) {
                    var o = this.tryEntries[r];
                    if (o.tryLoc <= this.prev && n.call(o, "finallyLoc") && this.prev < o.finallyLoc) {
                        var i = o;
                        break
                    }
                }
                i && ("break" === e || "continue" === e) && i.tryLoc <= t && t <= i.finallyLoc && (i = null);
                var a = i ? i.completion : {};
                return a.type = e, a.arg = t, i ? (this.method = "next", this.next = i.finallyLoc, u) : this.complete(a)
            },
            complete: function(e, t) {
                if ("throw" === e.type) throw e.arg;
                return "break" === e.type || "continue" === e.type ? this.next = e.arg : "return" === e.type ? (this.rval = this.arg = e.arg, this.method = "return", this.next = "end") : "normal" === e.type && t && (this.next = t), u
            },
            finish: function(e) {
                for (var t = this.tryEntries.length - 1; t >= 0; --t) {
                    var n = this.tryEntries[t];
                    if (n.finallyLoc === e) return this.complete(n.completion, n.afterLoc), _(n), u
                }
            },
            catch: function(e) {
                for (var t = this.tryEntries.length - 1; t >= 0; --t) {
                    var n = this.tryEntries[t];
                    if (n.tryLoc === e) {
                        var r = n.completion;
                        if ("throw" === r.type) {
                            var o = r.arg;
                            _(n)
                        }
                        return o
                    }
                }
                throw new Error("illegal catch attempt")
            },
            delegateYield: function(e, t, n) {
                return this.delegate = {
                    iterator: x(e),
                    resultName: t,
                    nextLoc: n
                }, "next" === this.method && (this.arg = void 0), u
            }
        }, e
    }(e.exports);
    try {
        regeneratorRuntime = r
    } catch (e) {
        Function("r", "regeneratorRuntime = r")(r)
    }
}, function(e, t, n) {
    e.exports = function() {
        "use strict";
        var e = "undefined" != typeof document && document.documentMode,
            t = {
                rootMargin: "0px",
                threshold: 0,
                load: function(t) {
                    if ("picture" === t.nodeName.toLowerCase()) {
                        var n = t.querySelector("img"),
                            r = !1;
                        null === n && (n = document.createElement("img"), r = !0), e && t.getAttribute("data-iesrc") && (n.src = t.getAttribute("data-iesrc")), t.getAttribute("data-alt") && (n.alt = t.getAttribute("data-alt")), r && t.append(n)
                    }
                    if ("video" === t.nodeName.toLowerCase() && !t.getAttribute("data-src") && t.children) {
                        for (var o = t.children, i = void 0, a = 0; a <= o.length - 1; a++)(i = o[a].getAttribute("data-src")) && (o[a].src = i);
                        t.load()
                    }
                    t.getAttribute("data-poster") && (t.poster = t.getAttribute("data-poster")), t.getAttribute("data-src") && (t.src = t.getAttribute("data-src")), t.getAttribute("data-srcset") && t.setAttribute("srcset", t.getAttribute("data-srcset"));
                    var c = ",";
                    if (t.getAttribute("data-background-delimiter") && (c = t.getAttribute("data-background-delimiter")), t.getAttribute("data-background-image")) t.style.backgroundImage = "url('" + t.getAttribute("data-background-image").split(c).join("'),url('") + "')";
                    else if (t.getAttribute("data-background-image-set")) {
                        var s = t.getAttribute("data-background-image-set").split(c),
                            u = s[0].substr(0, s[0].indexOf(" ")) || s[0];
                        u = -1 === u.indexOf("url(") ? "url(" + u + ")" : u, 1 === s.length ? t.style.backgroundImage = u : t.setAttribute("style", (t.getAttribute("style") || "") + "background-image: " + u + "; background-image: -webkit-image-set(" + s + "); background-image: image-set(" + s + ")")
                    }
                    t.getAttribute("data-toggle-class") && t.classList.toggle(t.getAttribute("data-toggle-class"))
                },
                loaded: function() {}
            };

        function n(e) {
            e.setAttribute("data-loaded", !0)
        }
        var r = function(e) {
                return "true" === e.getAttribute("data-loaded")
            },
            o = function(e) {
                var t = 1 < arguments.length && void 0 !== arguments[1] ? arguments[1] : document;
                return e instanceof Element ? [e] : e instanceof NodeList ? e : t.querySelectorAll(e)
            };
        return function() {
            var e, i, a = 0 < arguments.length && void 0 !== arguments[0] ? arguments[0] : ".lozad",
                c = 1 < arguments.length && void 0 !== arguments[1] ? arguments[1] : {},
                s = Object.assign({}, t, c),
                u = s.root,
                f = s.rootMargin,
                l = s.threshold,
                d = s.load,
                p = s.loaded,
                h = void 0;
            "undefined" != typeof window && window.IntersectionObserver && (h = new IntersectionObserver((e = d, i = p, function(t, o) {
                t.forEach((function(t) {
                    (0 < t.intersectionRatio || t.isIntersecting) && (o.unobserve(t.target), r(t.target) || (e(t.target), n(t.target), i(t.target)))
                }))
            }), {
                root: u,
                rootMargin: f,
                threshold: l
            }));
            for (var v, m = o(a, u), g = 0; g < m.length; g++)(v = m[g]).getAttribute("data-placeholder-background") && (v.style.background = v.getAttribute("data-placeholder-background"));
            return {
                observe: function() {
                    for (var e = o(a, u), t = 0; t < e.length; t++) r(e[t]) || (h ? h.observe(e[t]) : (d(e[t]), n(e[t]), p(e[t])))
                },
                triggerLoad: function(e) {
                    r(e) || (d(e), n(e), p(e))
                },
                observer: h
            }
        }
    }()
}, function(e, t) {
    e.exports = '<svg viewBox="0 0 24 23" xmlns="http://www.w3.org/2000/svg"><path d="m12.17 1-3.08 7.324-7.89.686 5.983 5.225-1.794 7.765 6.781-4.117 6.782 4.117-1.794-7.765 6.041-5.225-7.949-.686z" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="1.45"></path></svg>'
}, function(e, t, n) {
    "use strict";
    (function(e) {
        var n = "undefined" != typeof window && "undefined" != typeof document && "undefined" != typeof navigator,
            r = function() {
                for (var e = ["Edge", "Trident", "Firefox"], t = 0; t < e.length; t += 1)
                    if (n && navigator.userAgent.indexOf(e[t]) >= 0) return 1;
                return 0
            }();
        var o = n && window.Promise ? function(e) {
            var t = !1;
            return function() {
                t || (t = !0, window.Promise.resolve().then((function() {
                    t = !1, e()
                })))
            }
        } : function(e) {
            var t = !1;
            return function() {
                t || (t = !0, setTimeout((function() {
                    t = !1, e()
                }), r))
            }
        };

        function i(e) {
            return e && "[object Function]" === {}.toString.call(e)
        }

        function a(e, t) {
            if (1 !== e.nodeType) return [];
            var n = e.ownerDocument.defaultView.getComputedStyle(e, null);
            return t ? n[t] : n
        }

        function c(e) {
            return "HTML" === e.nodeName ? e : e.parentNode || e.host
        }

        function s(e) {
            if (!e) return document.body;
            switch (e.nodeName) {
                case "HTML":
                case "BODY":
                    return e.ownerDocument.body;
                case "#document":
                    return e.body
            }
            var t = a(e),
                n = t.overflow,
                r = t.overflowX,
                o = t.overflowY;
            return /(auto|scroll|overlay)/.test(n + o + r) ? e : s(c(e))
        }

        function u(e) {
            return e && e.referenceNode ? e.referenceNode : e
        }
        var f = n && !(!window.MSInputMethodContext || !document.documentMode),
            l = n && /MSIE 10/.test(navigator.userAgent);

        function d(e) {
            return 11 === e ? f : 10 === e ? l : f || l
        }

        function p(e) {
            if (!e) return document.documentElement;
            for (var t = d(10) ? document.body : null, n = e.offsetParent || null; n === t && e.nextElementSibling;) n = (e = e.nextElementSibling).offsetParent;
            var r = n && n.nodeName;
            return r && "BODY" !== r && "HTML" !== r ? -1 !== ["TH", "TD", "TABLE"].indexOf(n.nodeName) && "static" === a(n, "position") ? p(n) : n : e ? e.ownerDocument.documentElement : document.documentElement
        }

        function h(e) {
            return null !== e.parentNode ? h(e.parentNode) : e
        }

        function v(e, t) {
            if (!(e && e.nodeType && t && t.nodeType)) return document.documentElement;
            var n = e.compareDocumentPosition(t) & Node.DOCUMENT_POSITION_FOLLOWING,
                r = n ? e : t,
                o = n ? t : e,
                i = document.createRange();
            i.setStart(r, 0), i.setEnd(o, 0);
            var a, c, s = i.commonAncestorContainer;
            if (e !== s && t !== s || r.contains(o)) return "BODY" === (c = (a = s).nodeName) || "HTML" !== c && p(a.firstElementChild) !== a ? p(s) : s;
            var u = h(e);
            return u.host ? v(u.host, t) : v(e, h(t).host)
        }

        function m(e) {
            var t = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : "top",
                n = "top" === t ? "scrollTop" : "scrollLeft",
                r = e.nodeName;
            if ("BODY" === r || "HTML" === r) {
                var o = e.ownerDocument.documentElement,
                    i = e.ownerDocument.scrollingElement || o;
                return i[n]
            }
            return e[n]
        }

        function g(e, t) {
            var n = arguments.length > 2 && void 0 !== arguments[2] && arguments[2],
                r = m(t, "top"),
                o = m(t, "left"),
                i = n ? -1 : 1;
            return e.top += r * i, e.bottom += r * i, e.left += o * i, e.right += o * i, e
        }

        function y(e, t) {
            var n = "x" === t ? "Left" : "Top",
                r = "Left" === n ? "Right" : "Bottom";
            return parseFloat(e["border" + n + "Width"]) + parseFloat(e["border" + r + "Width"])
        }

        function b(e, t, n, r) {
            return Math.max(t["offset" + e], t["scroll" + e], n["client" + e], n["offset" + e], n["scroll" + e], d(10) ? parseInt(n["offset" + e]) + parseInt(r["margin" + ("Height" === e ? "Top" : "Left")]) + parseInt(r["margin" + ("Height" === e ? "Bottom" : "Right")]) : 0)
        }

        function w(e) {
            var t = e.body,
                n = e.documentElement,
                r = d(10) && getComputedStyle(n);
            return {
                height: b("Height", t, n, r),
                width: b("Width", t, n, r)
            }
        }
        var _ = function(e, t) {
                if (!(e instanceof t)) throw new TypeError("Cannot call a class as a function")
            },
            S = function() {
                function e(e, t) {
                    for (var n = 0; n < t.length; n++) {
                        var r = t[n];
                        r.enumerable = r.enumerable || !1, r.configurable = !0, "value" in r && (r.writable = !0), Object.defineProperty(e, r.key, r)
                    }
                }
                return function(t, n, r) {
                    return n && e(t.prototype, n), r && e(t, r), t
                }
            }(),
            x = function(e, t, n) {
                return t in e ? Object.defineProperty(e, t, {
                    value: n,
                    enumerable: !0,
                    configurable: !0,
                    writable: !0
                }) : e[t] = n, e
            },
            E = Object.assign || function(e) {
                for (var t = 1; t < arguments.length; t++) {
                    var n = arguments[t];
                    for (var r in n) Object.prototype.hasOwnProperty.call(n, r) && (e[r] = n[r])
                }
                return e
            };

        function k(e) {
            return E({}, e, {
                right: e.left + e.width,
                bottom: e.top + e.height
            })
        }

        function O(e) {
            var t = {};
            try {
                if (d(10)) {
                    t = e.getBoundingClientRect();
                    var n = m(e, "top"),
                        r = m(e, "left");
                    t.top += n, t.left += r, t.bottom += n, t.right += r
                } else t = e.getBoundingClientRect()
            } catch (e) {}
            var o = {
                    left: t.left,
                    top: t.top,
                    width: t.right - t.left,
                    height: t.bottom - t.top
                },
                i = "HTML" === e.nodeName ? w(e.ownerDocument) : {},
                c = i.width || e.clientWidth || o.width,
                s = i.height || e.clientHeight || o.height,
                u = e.offsetWidth - c,
                f = e.offsetHeight - s;
            if (u || f) {
                var l = a(e);
                u -= y(l, "x"), f -= y(l, "y"), o.width -= u, o.height -= f
            }
            return k(o)
        }

        function T(e, t) {
            var n = arguments.length > 2 && void 0 !== arguments[2] && arguments[2],
                r = d(10),
                o = "HTML" === t.nodeName,
                i = O(e),
                c = O(t),
                u = s(e),
                f = a(t),
                l = parseFloat(f.borderTopWidth),
                p = parseFloat(f.borderLeftWidth);
            n && o && (c.top = Math.max(c.top, 0), c.left = Math.max(c.left, 0));
            var h = k({
                top: i.top - c.top - l,
                left: i.left - c.left - p,
                width: i.width,
                height: i.height
            });
            if (h.marginTop = 0, h.marginLeft = 0, !r && o) {
                var v = parseFloat(f.marginTop),
                    m = parseFloat(f.marginLeft);
                h.top -= l - v, h.bottom -= l - v, h.left -= p - m, h.right -= p - m, h.marginTop = v, h.marginLeft = m
            }
            return (r && !n ? t.contains(u) : t === u && "BODY" !== u.nodeName) && (h = g(h, t)), h
        }

        function A(e) {
            var t = arguments.length > 1 && void 0 !== arguments[1] && arguments[1],
                n = e.ownerDocument.documentElement,
                r = T(e, n),
                o = Math.max(n.clientWidth, window.innerWidth || 0),
                i = Math.max(n.clientHeight, window.innerHeight || 0),
                a = t ? 0 : m(n),
                c = t ? 0 : m(n, "left"),
                s = {
                    top: a - r.top + r.marginTop,
                    left: c - r.left + r.marginLeft,
                    width: o,
                    height: i
                };
            return k(s)
        }

        function C(e) {
            var t = e.nodeName;
            if ("BODY" === t || "HTML" === t) return !1;
            if ("fixed" === a(e, "position")) return !0;
            var n = c(e);
            return !!n && C(n)
        }

        function I(e) {
            if (!e || !e.parentElement || d()) return document.documentElement;
            for (var t = e.parentElement; t && "none" === a(t, "transform");) t = t.parentElement;
            return t || document.documentElement
        }

        function N(e, t, n, r) {
            var o = arguments.length > 4 && void 0 !== arguments[4] && arguments[4],
                i = {
                    top: 0,
                    left: 0
                },
                a = o ? I(e) : v(e, u(t));
            if ("viewport" === r) i = A(a, o);
            else {
                var f = void 0;
                "scrollParent" === r ? "BODY" === (f = s(c(t))).nodeName && (f = e.ownerDocument.documentElement) : f = "window" === r ? e.ownerDocument.documentElement : r;
                var l = T(f, a, o);
                if ("HTML" !== f.nodeName || C(a)) i = l;
                else {
                    var d = w(e.ownerDocument),
                        p = d.height,
                        h = d.width;
                    i.top += l.top - l.marginTop, i.bottom = p + l.top, i.left += l.left - l.marginLeft, i.right = h + l.left
                }
            }
            var m = "number" == typeof(n = n || 0);
            return i.left += m ? n : n.left || 0, i.top += m ? n : n.top || 0, i.right -= m ? n : n.right || 0, i.bottom -= m ? n : n.bottom || 0, i
        }

        function L(e) {
            return e.width * e.height
        }

        function P(e, t, n, r, o) {
            var i = arguments.length > 5 && void 0 !== arguments[5] ? arguments[5] : 0;
            if (-1 === e.indexOf("auto")) return e;
            var a = N(n, r, i, o),
                c = {
                    top: {
                        width: a.width,
                        height: t.top - a.top
                    },
                    right: {
                        width: a.right - t.right,
                        height: a.height
                    },
                    bottom: {
                        width: a.width,
                        height: a.bottom - t.bottom
                    },
                    left: {
                        width: t.left - a.left,
                        height: a.height
                    }
                },
                s = Object.keys(c).map((function(e) {
                    return E({
                        key: e
                    }, c[e], {
                        area: L(c[e])
                    })
                })).sort((function(e, t) {
                    return t.area - e.area
                })),
                u = s.filter((function(e) {
                    var t = e.width,
                        r = e.height;
                    return t >= n.clientWidth && r >= n.clientHeight
                })),
                f = u.length > 0 ? u[0].key : s[0].key,
                l = e.split("-")[1];
            return f + (l ? "-" + l : "")
        }

        function j(e, t, n) {
            var r = arguments.length > 3 && void 0 !== arguments[3] ? arguments[3] : null,
                o = r ? I(t) : v(t, u(n));
            return T(n, o, r)
        }

        function D(e) {
            var t = e.ownerDocument.defaultView.getComputedStyle(e),
                n = parseFloat(t.marginTop || 0) + parseFloat(t.marginBottom || 0),
                r = parseFloat(t.marginLeft || 0) + parseFloat(t.marginRight || 0);
            return {
                width: e.offsetWidth + r,
                height: e.offsetHeight + n
            }
        }

        function M(e) {
            var t = {
                left: "right",
                right: "left",
                bottom: "top",
                top: "bottom"
            };
            return e.replace(/left|right|bottom|top/g, (function(e) {
                return t[e]
            }))
        }

        function R(e, t, n) {
            n = n.split("-")[0];
            var r = D(e),
                o = {
                    width: r.width,
                    height: r.height
                },
                i = -1 !== ["right", "left"].indexOf(n),
                a = i ? "top" : "left",
                c = i ? "left" : "top",
                s = i ? "height" : "width",
                u = i ? "width" : "height";
            return o[a] = t[a] + t[s] / 2 - r[s] / 2, o[c] = n === c ? t[c] - r[u] : t[M(c)], o
        }

        function B(e, t) {
            return Array.prototype.find ? e.find(t) : e.filter(t)[0]
        }

        function F(e, t, n) {
            return (void 0 === n ? e : e.slice(0, function(e, t, n) {
                if (Array.prototype.findIndex) return e.findIndex((function(e) {
                    return e[t] === n
                }));
                var r = B(e, (function(e) {
                    return e[t] === n
                }));
                return e.indexOf(r)
            }(e, "name", n))).forEach((function(e) {
                e.function && console.warn("`modifier.function` is deprecated, use `modifier.fn`!");
                var n = e.function || e.fn;
                e.enabled && i(n) && (t.offsets.popper = k(t.offsets.popper), t.offsets.reference = k(t.offsets.reference), t = n(t, e))
            })), t
        }

        function W() {
            if (!this.state.isDestroyed) {
                var e = {
                    instance: this,
                    styles: {},
                    arrowStyles: {},
                    attributes: {},
                    flipped: !1,
                    offsets: {}
                };
                e.offsets.reference = j(this.state, this.popper, this.reference, this.options.positionFixed), e.placement = P(this.options.placement, e.offsets.reference, this.popper, this.reference, this.options.modifiers.flip.boundariesElement, this.options.modifiers.flip.padding), e.originalPlacement = e.placement, e.positionFixed = this.options.positionFixed, e.offsets.popper = R(this.popper, e.offsets.reference, e.placement), e.offsets.popper.position = this.options.positionFixed ? "fixed" : "absolute", e = F(this.modifiers, e), this.state.isCreated ? this.options.onUpdate(e) : (this.state.isCreated = !0, this.options.onCreate(e))
            }
        }

        function H(e, t) {
            return e.some((function(e) {
                var n = e.name;
                return e.enabled && n === t
            }))
        }

        function U(e) {
            for (var t = [!1, "ms", "Webkit", "Moz", "O"], n = e.charAt(0).toUpperCase() + e.slice(1), r = 0; r < t.length; r++) {
                var o = t[r],
                    i = o ? "" + o + n : e;
                if (void 0 !== document.body.style[i]) return i
            }
            return null
        }

        function q() {
            return this.state.isDestroyed = !0, H(this.modifiers, "applyStyle") && (this.popper.removeAttribute("x-placement"), this.popper.style.position = "", this.popper.style.top = "", this.popper.style.left = "", this.popper.style.right = "", this.popper.style.bottom = "", this.popper.style.willChange = "", this.popper.style[U("transform")] = ""), this.disableEventListeners(), this.options.removeOnDestroy && this.popper.parentNode.removeChild(this.popper), this
        }

        function V(e) {
            var t = e.ownerDocument;
            return t ? t.defaultView : window
        }

        function z(e, t, n, r) {
            n.updateBound = r, V(e).addEventListener("resize", n.updateBound, {
                passive: !0
            });
            var o = s(e);
            return function e(t, n, r, o) {
                var i = "BODY" === t.nodeName,
                    a = i ? t.ownerDocument.defaultView : t;
                a.addEventListener(n, r, {
                    passive: !0
                }), i || e(s(a.parentNode), n, r, o), o.push(a)
            }(o, "scroll", n.updateBound, n.scrollParents), n.scrollElement = o, n.eventsEnabled = !0, n
        }

        function K() {
            this.state.eventsEnabled || (this.state = z(this.reference, this.options, this.state, this.scheduleUpdate))
        }

        function G() {
            var e, t;
            this.state.eventsEnabled && (cancelAnimationFrame(this.scheduleUpdate), this.state = (e = this.reference, t = this.state, V(e).removeEventListener("resize", t.updateBound), t.scrollParents.forEach((function(e) {
                e.removeEventListener("scroll", t.updateBound)
            })), t.updateBound = null, t.scrollParents = [], t.scrollElement = null, t.eventsEnabled = !1, t))
        }

        function Y(e) {
            return "" !== e && !isNaN(parseFloat(e)) && isFinite(e)
        }

        function $(e, t) {
            Object.keys(t).forEach((function(n) {
                var r = ""; - 1 !== ["width", "height", "top", "right", "bottom", "left"].indexOf(n) && Y(t[n]) && (r = "px"), e.style[n] = t[n] + r
            }))
        }
        var J = n && /Firefox/i.test(navigator.userAgent);

        function Q(e, t, n) {
            var r = B(e, (function(e) {
                    return e.name === t
                })),
                o = !!r && e.some((function(e) {
                    return e.name === n && e.enabled && e.order < r.order
                }));
            if (!o) {
                var i = "`" + t + "`",
                    a = "`" + n + "`";
                console.warn(a + " modifier is required by " + i + " modifier in order to work, be sure to include it before " + i + "!")
            }
            return o
        }
        var X = ["auto-start", "auto", "auto-end", "top-start", "top", "top-end", "right-start", "right", "right-end", "bottom-end", "bottom", "bottom-start", "left-end", "left", "left-start"],
            Z = X.slice(3);

        function ee(e) {
            var t = arguments.length > 1 && void 0 !== arguments[1] && arguments[1],
                n = Z.indexOf(e),
                r = Z.slice(n + 1).concat(Z.slice(0, n));
            return t ? r.reverse() : r
        }
        var te = "flip",
            ne = "clockwise",
            re = "counterclockwise";

        function oe(e, t, n, r) {
            var o = [0, 0],
                i = -1 !== ["right", "left"].indexOf(r),
                a = e.split(/(\+|\-)/).map((function(e) {
                    return e.trim()
                })),
                c = a.indexOf(B(a, (function(e) {
                    return -1 !== e.search(/,|\s/)
                })));
            a[c] && -1 === a[c].indexOf(",") && console.warn("Offsets separated by white space(s) are deprecated, use a comma (,) instead.");
            var s = /\s*,\s*|\s+/,
                u = -1 !== c ? [a.slice(0, c).concat([a[c].split(s)[0]]), [a[c].split(s)[1]].concat(a.slice(c + 1))] : [a];
            return (u = u.map((function(e, r) {
                var o = (1 === r ? !i : i) ? "height" : "width",
                    a = !1;
                return e.reduce((function(e, t) {
                    return "" === e[e.length - 1] && -1 !== ["+", "-"].indexOf(t) ? (e[e.length - 1] = t, a = !0, e) : a ? (e[e.length - 1] += t, a = !1, e) : e.concat(t)
                }), []).map((function(e) {
                    return function(e, t, n, r) {
                        var o = e.match(/((?:\-|\+)?\d*\.?\d*)(.*)/),
                            i = +o[1],
                            a = o[2];
                        if (!i) return e;
                        if (0 === a.indexOf("%")) {
                            var c = void 0;
                            switch (a) {
                                case "%p":
                                    c = n;
                                    break;
                                case "%":
                                case "%r":
                                default:
                                    c = r
                            }
                            return k(c)[t] / 100 * i
                        }
                        if ("vh" === a || "vw" === a) {
                            return ("vh" === a ? Math.max(document.documentElement.clientHeight, window.innerHeight || 0) : Math.max(document.documentElement.clientWidth, window.innerWidth || 0)) / 100 * i
                        }
                        return i
                    }(e, o, t, n)
                }))
            }))).forEach((function(e, t) {
                e.forEach((function(n, r) {
                    Y(n) && (o[t] += n * ("-" === e[r - 1] ? -1 : 1))
                }))
            })), o
        }
        var ie = {
                placement: "bottom",
                positionFixed: !1,
                eventsEnabled: !0,
                removeOnDestroy: !1,
                onCreate: function() {},
                onUpdate: function() {},
                modifiers: {
                    shift: {
                        order: 100,
                        enabled: !0,
                        fn: function(e) {
                            var t = e.placement,
                                n = t.split("-")[0],
                                r = t.split("-")[1];
                            if (r) {
                                var o = e.offsets,
                                    i = o.reference,
                                    a = o.popper,
                                    c = -1 !== ["bottom", "top"].indexOf(n),
                                    s = c ? "left" : "top",
                                    u = c ? "width" : "height",
                                    f = {
                                        start: x({}, s, i[s]),
                                        end: x({}, s, i[s] + i[u] - a[u])
                                    };
                                e.offsets.popper = E({}, a, f[r])
                            }
                            return e
                        }
                    },
                    offset: {
                        order: 200,
                        enabled: !0,
                        fn: function(e, t) {
                            var n = t.offset,
                                r = e.placement,
                                o = e.offsets,
                                i = o.popper,
                                a = o.reference,
                                c = r.split("-")[0],
                                s = void 0;
                            return s = Y(+n) ? [+n, 0] : oe(n, i, a, c), "left" === c ? (i.top += s[0], i.left -= s[1]) : "right" === c ? (i.top += s[0], i.left += s[1]) : "top" === c ? (i.left += s[0], i.top -= s[1]) : "bottom" === c && (i.left += s[0], i.top += s[1]), e.popper = i, e
                        },
                        offset: 0
                    },
                    preventOverflow: {
                        order: 300,
                        enabled: !0,
                        fn: function(e, t) {
                            var n = t.boundariesElement || p(e.instance.popper);
                            e.instance.reference === n && (n = p(n));
                            var r = U("transform"),
                                o = e.instance.popper.style,
                                i = o.top,
                                a = o.left,
                                c = o[r];
                            o.top = "", o.left = "", o[r] = "";
                            var s = N(e.instance.popper, e.instance.reference, t.padding, n, e.positionFixed);
                            o.top = i, o.left = a, o[r] = c, t.boundaries = s;
                            var u = t.priority,
                                f = e.offsets.popper,
                                l = {
                                    primary: function(e) {
                                        var n = f[e];
                                        return f[e] < s[e] && !t.escapeWithReference && (n = Math.max(f[e], s[e])), x({}, e, n)
                                    },
                                    secondary: function(e) {
                                        var n = "right" === e ? "left" : "top",
                                            r = f[n];
                                        return f[e] > s[e] && !t.escapeWithReference && (r = Math.min(f[n], s[e] - ("right" === e ? f.width : f.height))), x({}, n, r)
                                    }
                                };
                            return u.forEach((function(e) {
                                var t = -1 !== ["left", "top"].indexOf(e) ? "primary" : "secondary";
                                f = E({}, f, l[t](e))
                            })), e.offsets.popper = f, e
                        },
                        priority: ["left", "right", "top", "bottom"],
                        padding: 5,
                        boundariesElement: "scrollParent"
                    },
                    keepTogether: {
                        order: 400,
                        enabled: !0,
                        fn: function(e) {
                            var t = e.offsets,
                                n = t.popper,
                                r = t.reference,
                                o = e.placement.split("-")[0],
                                i = Math.floor,
                                a = -1 !== ["top", "bottom"].indexOf(o),
                                c = a ? "right" : "bottom",
                                s = a ? "left" : "top",
                                u = a ? "width" : "height";
                            return n[c] < i(r[s]) && (e.offsets.popper[s] = i(r[s]) - n[u]), n[s] > i(r[c]) && (e.offsets.popper[s] = i(r[c])), e
                        }
                    },
                    arrow: {
                        order: 500,
                        enabled: !0,
                        fn: function(e, t) {
                            var n;
                            if (!Q(e.instance.modifiers, "arrow", "keepTogether")) return e;
                            var r = t.element;
                            if ("string" == typeof r) {
                                if (!(r = e.instance.popper.querySelector(r))) return e
                            } else if (!e.instance.popper.contains(r)) return console.warn("WARNING: `arrow.element` must be child of its popper element!"), e;
                            var o = e.placement.split("-")[0],
                                i = e.offsets,
                                c = i.popper,
                                s = i.reference,
                                u = -1 !== ["left", "right"].indexOf(o),
                                f = u ? "height" : "width",
                                l = u ? "Top" : "Left",
                                d = l.toLowerCase(),
                                p = u ? "left" : "top",
                                h = u ? "bottom" : "right",
                                v = D(r)[f];
                            s[h] - v < c[d] && (e.offsets.popper[d] -= c[d] - (s[h] - v)), s[d] + v > c[h] && (e.offsets.popper[d] += s[d] + v - c[h]), e.offsets.popper = k(e.offsets.popper);
                            var m = s[d] + s[f] / 2 - v / 2,
                                g = a(e.instance.popper),
                                y = parseFloat(g["margin" + l]),
                                b = parseFloat(g["border" + l + "Width"]),
                                w = m - e.offsets.popper[d] - y - b;
                            return w = Math.max(Math.min(c[f] - v, w), 0), e.arrowElement = r, e.offsets.arrow = (x(n = {}, d, Math.round(w)), x(n, p, ""), n), e
                        },
                        element: "[x-arrow]"
                    },
                    flip: {
                        order: 600,
                        enabled: !0,
                        fn: function(e, t) {
                            if (H(e.instance.modifiers, "inner")) return e;
                            if (e.flipped && e.placement === e.originalPlacement) return e;
                            var n = N(e.instance.popper, e.instance.reference, t.padding, t.boundariesElement, e.positionFixed),
                                r = e.placement.split("-")[0],
                                o = M(r),
                                i = e.placement.split("-")[1] || "",
                                a = [];
                            switch (t.behavior) {
                                case te:
                                    a = [r, o];
                                    break;
                                case ne:
                                    a = ee(r);
                                    break;
                                case re:
                                    a = ee(r, !0);
                                    break;
                                default:
                                    a = t.behavior
                            }
                            return a.forEach((function(c, s) {
                                if (r !== c || a.length === s + 1) return e;
                                r = e.placement.split("-")[0], o = M(r);
                                var u = e.offsets.popper,
                                    f = e.offsets.reference,
                                    l = Math.floor,
                                    d = "left" === r && l(u.right) > l(f.left) || "right" === r && l(u.left) < l(f.right) || "top" === r && l(u.bottom) > l(f.top) || "bottom" === r && l(u.top) < l(f.bottom),
                                    p = l(u.left) < l(n.left),
                                    h = l(u.right) > l(n.right),
                                    v = l(u.top) < l(n.top),
                                    m = l(u.bottom) > l(n.bottom),
                                    g = "left" === r && p || "right" === r && h || "top" === r && v || "bottom" === r && m,
                                    y = -1 !== ["top", "bottom"].indexOf(r),
                                    b = !!t.flipVariations && (y && "start" === i && p || y && "end" === i && h || !y && "start" === i && v || !y && "end" === i && m),
                                    w = !!t.flipVariationsByContent && (y && "start" === i && h || y && "end" === i && p || !y && "start" === i && m || !y && "end" === i && v),
                                    _ = b || w;
                                (d || g || _) && (e.flipped = !0, (d || g) && (r = a[s + 1]), _ && (i = function(e) {
                                    return "end" === e ? "start" : "start" === e ? "end" : e
                                }(i)), e.placement = r + (i ? "-" + i : ""), e.offsets.popper = E({}, e.offsets.popper, R(e.instance.popper, e.offsets.reference, e.placement)), e = F(e.instance.modifiers, e, "flip"))
                            })), e
                        },
                        behavior: "flip",
                        padding: 5,
                        boundariesElement: "viewport",
                        flipVariations: !1,
                        flipVariationsByContent: !1
                    },
                    inner: {
                        order: 700,
                        enabled: !1,
                        fn: function(e) {
                            var t = e.placement,
                                n = t.split("-")[0],
                                r = e.offsets,
                                o = r.popper,
                                i = r.reference,
                                a = -1 !== ["left", "right"].indexOf(n),
                                c = -1 === ["top", "left"].indexOf(n);
                            return o[a ? "left" : "top"] = i[n] - (c ? o[a ? "width" : "height"] : 0), e.placement = M(t), e.offsets.popper = k(o), e
                        }
                    },
                    hide: {
                        order: 800,
                        enabled: !0,
                        fn: function(e) {
                            if (!Q(e.instance.modifiers, "hide", "preventOverflow")) return e;
                            var t = e.offsets.reference,
                                n = B(e.instance.modifiers, (function(e) {
                                    return "preventOverflow" === e.name
                                })).boundaries;
                            if (t.bottom < n.top || t.left > n.right || t.top > n.bottom || t.right < n.left) {
                                if (!0 === e.hide) return e;
                                e.hide = !0, e.attributes["x-out-of-boundaries"] = ""
                            } else {
                                if (!1 === e.hide) return e;
                                e.hide = !1, e.attributes["x-out-of-boundaries"] = !1
                            }
                            return e
                        }
                    },
                    computeStyle: {
                        order: 850,
                        enabled: !0,
                        fn: function(e, t) {
                            var n = t.x,
                                r = t.y,
                                o = e.offsets.popper,
                                i = B(e.instance.modifiers, (function(e) {
                                    return "applyStyle" === e.name
                                })).gpuAcceleration;
                            void 0 !== i && console.warn("WARNING: `gpuAcceleration` option moved to `computeStyle` modifier and will not be supported in future versions of Popper.js!");
                            var a = void 0 !== i ? i : t.gpuAcceleration,
                                c = p(e.instance.popper),
                                s = O(c),
                                u = {
                                    position: o.position
                                },
                                f = function(e, t) {
                                    var n = e.offsets,
                                        r = n.popper,
                                        o = n.reference,
                                        i = Math.round,
                                        a = Math.floor,
                                        c = function(e) {
                                            return e
                                        },
                                        s = i(o.width),
                                        u = i(r.width),
                                        f = -1 !== ["left", "right"].indexOf(e.placement),
                                        l = -1 !== e.placement.indexOf("-"),
                                        d = t ? f || l || s % 2 == u % 2 ? i : a : c,
                                        p = t ? i : c;
                                    return {
                                        left: d(s % 2 == 1 && u % 2 == 1 && !l && t ? r.left - 1 : r.left),
                                        top: p(r.top),
                                        bottom: p(r.bottom),
                                        right: d(r.right)
                                    }
                                }(e, window.devicePixelRatio < 2 || !J),
                                l = "bottom" === n ? "top" : "bottom",
                                d = "right" === r ? "left" : "right",
                                h = U("transform"),
                                v = void 0,
                                m = void 0;
                            if (m = "bottom" === l ? "HTML" === c.nodeName ? -c.clientHeight + f.bottom : -s.height + f.bottom : f.top, v = "right" === d ? "HTML" === c.nodeName ? -c.clientWidth + f.right : -s.width + f.right : f.left, a && h) u[h] = "translate3d(" + v + "px, " + m + "px, 0)", u[l] = 0, u[d] = 0, u.willChange = "transform";
                            else {
                                var g = "bottom" === l ? -1 : 1,
                                    y = "right" === d ? -1 : 1;
                                u[l] = m * g, u[d] = v * y, u.willChange = l + ", " + d
                            }
                            var b = {
                                "x-placement": e.placement
                            };
                            return e.attributes = E({}, b, e.attributes), e.styles = E({}, u, e.styles), e.arrowStyles = E({}, e.offsets.arrow, e.arrowStyles), e
                        },
                        gpuAcceleration: !0,
                        x: "bottom",
                        y: "right"
                    },
                    applyStyle: {
                        order: 900,
                        enabled: !0,
                        fn: function(e) {
                            var t, n;
                            return $(e.instance.popper, e.styles), t = e.instance.popper, n = e.attributes, Object.keys(n).forEach((function(e) {
                                !1 !== n[e] ? t.setAttribute(e, n[e]) : t.removeAttribute(e)
                            })), e.arrowElement && Object.keys(e.arrowStyles).length && $(e.arrowElement, e.arrowStyles), e
                        },
                        onLoad: function(e, t, n, r, o) {
                            var i = j(o, t, e, n.positionFixed),
                                a = P(n.placement, i, t, e, n.modifiers.flip.boundariesElement, n.modifiers.flip.padding);
                            return t.setAttribute("x-placement", a), $(t, {
                                position: n.positionFixed ? "fixed" : "absolute"
                            }), n
                        },
                        gpuAcceleration: void 0
                    }
                }
            },
            ae = function() {
                function e(t, n) {
                    var r = this,
                        a = arguments.length > 2 && void 0 !== arguments[2] ? arguments[2] : {};
                    _(this, e), this.scheduleUpdate = function() {
                        return requestAnimationFrame(r.update)
                    }, this.update = o(this.update.bind(this)), this.options = E({}, e.Defaults, a), this.state = {
                        isDestroyed: !1,
                        isCreated: !1,
                        scrollParents: []
                    }, this.reference = t && t.jquery ? t[0] : t, this.popper = n && n.jquery ? n[0] : n, this.options.modifiers = {}, Object.keys(E({}, e.Defaults.modifiers, a.modifiers)).forEach((function(t) {
                        r.options.modifiers[t] = E({}, e.Defaults.modifiers[t] || {}, a.modifiers ? a.modifiers[t] : {})
                    })), this.modifiers = Object.keys(this.options.modifiers).map((function(e) {
                        return E({
                            name: e
                        }, r.options.modifiers[e])
                    })).sort((function(e, t) {
                        return e.order - t.order
                    })), this.modifiers.forEach((function(e) {
                        e.enabled && i(e.onLoad) && e.onLoad(r.reference, r.popper, r.options, e, r.state)
                    })), this.update();
                    var c = this.options.eventsEnabled;
                    c && this.enableEventListeners(), this.state.eventsEnabled = c
                }
                return S(e, [{
                    key: "update",
                    value: function() {
                        return W.call(this)
                    }
                }, {
                    key: "destroy",
                    value: function() {
                        return q.call(this)
                    }
                }, {
                    key: "enableEventListeners",
                    value: function() {
                        return K.call(this)
                    }
                }, {
                    key: "disableEventListeners",
                    value: function() {
                        return G.call(this)
                    }
                }]), e
            }();
        ae.Utils = ("undefined" != typeof window ? window : e).PopperUtils, ae.placements = X, ae.Defaults = ie, t.a = ae
    }).call(this, n(30))
}, function(e, t, n) {
    var r = n(0),
        o = n(48),
        i = r.WeakMap;
    e.exports = "function" == typeof i && /native code/.test(o(i))
}, function(e, t, n) {
    var r = n(10),
        o = n(13),
        i = n(76),
        a = function(e) {
            return function(t, n, a) {
                var c, s = r(t),
                    u = o(s.length),
                    f = i(a, u);
                if (e && n != n) {
                    for (; u > f;)
                        if ((c = s[f++]) != c) return !0
                } else
                    for (; u > f; f++)
                        if ((e || f in s) && s[f] === n) return e || f || 0;
                return !e && -1
            }
        };
    e.exports = {
        includes: a(!0),
        indexOf: a(!1)
    }
}, function(e, t, n) {
    var r = n(6),
        o = n(8),
        i = n(5),
        a = n(55);
    e.exports = r ? Object.defineProperties : function(e, t) {
        i(e);
        for (var n, r = a(t), c = r.length, s = 0; c > s;) o.f(e, n = r[s++], t[n]);
        return e
    }
}, function(e, t, n) {
    var r = n(10),
        o = n(51).f,
        i = {}.toString,
        a = "object" == typeof window && window && Object.getOwnPropertyNames ? Object.getOwnPropertyNames(window) : [];
    e.exports.f = function(e) {
        return a && "[object Window]" == i.call(e) ? function(e) {
            try {
                return o(e)
            } catch (e) {
                return a.slice()
            }
        }(e) : o(r(e))
    }
}, function(e, t, n) {
    "use strict";
    var r = n(2);
    e.exports = function(e, t) {
        var n = [][e];
        return !!n && r((function() {
            n.call(null, t || function() {
                throw 1
            }, 1)
        }))
    }
}, function(e, t, n) {
    "use strict";
    var r = n(37),
        o = n(14),
        i = n(85),
        a = n(86),
        c = n(13),
        s = n(39),
        u = n(87);
    e.exports = function(e) {
        var t, n, f, l, d, p, h = o(e),
            v = "function" == typeof this ? this : Array,
            m = arguments.length,
            g = m > 1 ? arguments[1] : void 0,
            y = void 0 !== g,
            b = u(h),
            w = 0;
        if (y && (g = r(g, m > 2 ? arguments[2] : void 0, 2)), null == b || v == Array && a(b))
            for (n = new v(t = c(h.length)); t > w; w++) p = y ? g(h[w], w) : h[w], s(n, w, p);
        else
            for (d = (l = b.call(h)).next, n = new v; !(f = d.call(l)).done; w++) p = y ? i(l, g, [f.value, w], !0) : f.value, s(n, w, p);
        return n.length = w, n
    }
}, function(e, t, n) {
    "use strict";
    var r = n(92).IteratorPrototype,
        o = n(54),
        i = n(20),
        a = n(36),
        c = n(27),
        s = function() {
            return this
        };
    e.exports = function(e, t, n) {
        var u = t + " Iterator";
        return e.prototype = o(r, {
            next: i(1, n)
        }), a(e, u, !1, !0), c[u] = s, e
    }
}, function(e, t, n) {
    var r = n(2);
    e.exports = !r((function() {
        function e() {}
        return e.prototype.constructor = null, Object.getPrototypeOf(new e) !== e.prototype
    }))
}, function(e, t, n) {
    var r = n(5),
        o = n(117);
    e.exports = Object.setPrototypeOf || ("__proto__" in {} ? function() {
        var e, t = !1,
            n = {};
        try {
            (e = Object.getOwnPropertyDescriptor(Object.prototype, "__proto__").set).call(n, []), t = n instanceof Array
        } catch (e) {}
        return function(n, i) {
            return r(n), o(i), t ? e.call(n, i) : n.__proto__ = i, n
        }
    }() : void 0)
}, function(e, t, n) {
    var r = n(7);
    e.exports = function(e) {
        if (!r(e) && null !== e) throw TypeError("Can't set " + String(e) + " as a prototype");
        return e
    }
}, function(e, t, n) {
    "use strict";
    var r = n(58),
        o = n(88);
    e.exports = r ? {}.toString : function() {
        return "[object " + o(this) + "]"
    }
}, function(e, t, n) {
    var r = n(0);
    e.exports = r.Promise
}, function(e, t, n) {
    var r = n(11);
    e.exports = function(e, t, n) {
        for (var o in t) r(e, o, t[o], n);
        return e
    }
}, function(e, t, n) {
    "use strict";
    var r = n(16),
        o = n(8),
        i = n(1),
        a = n(6),
        c = i("species");
    e.exports = function(e) {
        var t = r(e),
            n = o.f;
        a && t && !t[c] && n(t, c, {
            configurable: !0,
            get: function() {
                return this
            }
        })
    }
}, function(e, t) {
    e.exports = function(e, t, n) {
        if (!(e instanceof t)) throw TypeError("Incorrect " + (n ? n + " " : "") + "invocation");
        return e
    }
}, function(e, t, n) {
    var r = n(5),
        o = n(86),
        i = n(13),
        a = n(37),
        c = n(87),
        s = n(85),
        u = function(e, t) {
            this.stopped = e, this.result = t
        };
    (e.exports = function(e, t, n, f, l) {
        var d, p, h, v, m, g, y, b = a(t, n, f ? 2 : 1);
        if (l) d = e;
        else {
            if ("function" != typeof(p = c(e))) throw TypeError("Target is not iterable");
            if (o(p)) {
                for (h = 0, v = i(e.length); v > h; h++)
                    if ((m = f ? b(r(y = e[h])[0], y[1]) : b(e[h])) && m instanceof u) return m;
                return new u(!1)
            }
            d = p.call(e)
        }
        for (g = d.next; !(y = g.call(d)).done;)
            if ("object" == typeof(m = s(d, b, y.value, f)) && m && m instanceof u) return m;
        return new u(!1)
    }).stop = function(e) {
        return new u(!0, e)
    }
}, function(e, t, n) {
    var r = n(5),
        o = n(38),
        i = n(1)("species");
    e.exports = function(e, t) {
        var n, a = r(e).constructor;
        return void 0 === a || null == (n = r(a)[i]) ? t : o(n)
    }
}, function(e, t, n) {
    var r, o, i, a, c, s, u, f, l = n(0),
        d = n(15).f,
        p = n(12),
        h = n(95).set,
        v = n(96),
        m = l.MutationObserver || l.WebKitMutationObserver,
        g = l.process,
        y = l.Promise,
        b = "process" == p(g),
        w = d(l, "queueMicrotask"),
        _ = w && w.value;
    _ || (r = function() {
        var e, t;
        for (b && (e = g.domain) && e.exit(); o;) {
            t = o.fn, o = o.next;
            try {
                t()
            } catch (e) {
                throw o ? a() : i = void 0, e
            }
        }
        i = void 0, e && e.enter()
    }, b ? a = function() {
        g.nextTick(r)
    } : m && !v ? (c = !0, s = document.createTextNode(""), new m(r).observe(s, {
        characterData: !0
    }), a = function() {
        s.data = c = !c
    }) : y && y.resolve ? (u = y.resolve(void 0), f = u.then, a = function() {
        f.call(u, r)
    }) : a = function() {
        h.call(l, r)
    }), e.exports = _ || function(e) {
        var t = {
            fn: e,
            next: void 0
        };
        i && (i.next = t), o || (o = t, a()), i = t
    }
}, function(e, t, n) {
    var r = n(5),
        o = n(7),
        i = n(97);
    e.exports = function(e, t) {
        if (r(e), o(t) && t.constructor === e) return t;
        var n = i.f(e);
        return (0, n.resolve)(t), n.promise
    }
}, function(e, t, n) {
    var r = n(0);
    e.exports = function(e, t) {
        var n = r.console;
        n && n.error && (1 === arguments.length ? n.error(e) : n.error(e, t))
    }
}, function(e, t) {
    e.exports = function(e) {
        try {
            return {
                error: !1,
                value: e()
            }
        } catch (e) {
            return {
                error: !0,
                value: e
            }
        }
    }
}, function(e, t, n) {
    "use strict";
    var r = n(2);

    function o(e, t) {
        return RegExp(e, t)
    }
    t.UNSUPPORTED_Y = r((function() {
        var e = o("a", "y");
        return e.lastIndex = 2, null != e.exec("abcd")
    })), t.BROKEN_CARET = r((function() {
        var e = o("^r", "gy");
        return e.lastIndex = 2, null != e.exec("str")
    }))
}, function(e, t, n) {
    "use strict";
    n(62);
    var r = n(11),
        o = n(2),
        i = n(1),
        a = n(63),
        c = n(9),
        s = i("species"),
        u = !o((function() {
            var e = /./;
            return e.exec = function() {
                var e = [];
                return e.groups = {
                    a: "7"
                }, e
            }, "7" !== "".replace(e, "$<a>")
        })),
        f = "$0" === "a".replace(/./, "$0"),
        l = i("replace"),
        d = !!/./ [l] && "" === /./ [l]("a", "$0"),
        p = !o((function() {
            var e = /(?:)/,
                t = e.exec;
            e.exec = function() {
                return t.apply(this, arguments)
            };
            var n = "ab".split(e);
            return 2 !== n.length || "a" !== n[0] || "b" !== n[1]
        }));
    e.exports = function(e, t, n, l) {
        var h = i(e),
            v = !o((function() {
                var t = {};
                return t[h] = function() {
                    return 7
                }, 7 != "" [e](t)
            })),
            m = v && !o((function() {
                var t = !1,
                    n = /a/;
                return "split" === e && ((n = {}).constructor = {}, n.constructor[s] = function() {
                    return n
                }, n.flags = "", n[h] = /./ [h]), n.exec = function() {
                    return t = !0, null
                }, n[h](""), !t
            }));
        if (!v || !m || "replace" === e && (!u || !f || d) || "split" === e && !p) {
            var g = /./ [h],
                y = n(h, "" [e], (function(e, t, n, r, o) {
                    return t.exec === a ? v && !o ? {
                        done: !0,
                        value: g.call(t, n, r)
                    } : {
                        done: !0,
                        value: e.call(n, t, r)
                    } : {
                        done: !1
                    }
                }), {
                    REPLACE_KEEPS_$0: f,
                    REGEXP_REPLACE_SUBSTITUTES_UNDEFINED_CAPTURE: d
                }),
                b = y[0],
                w = y[1];
            r(String.prototype, e, b), r(RegExp.prototype, h, 2 == t ? function(e, t) {
                return w.call(e, this, t)
            } : function(e) {
                return w.call(e, this)
            })
        }
        l && c(RegExp.prototype[h], "sham", !0)
    }
}, function(e, t, n) {
    "use strict";
    var r = n(99).charAt;
    e.exports = function(e, t, n) {
        return t + (n ? r(e, t).length : 1)
    }
}, function(e, t, n) {
    var r = n(12),
        o = n(63);
    e.exports = function(e, t) {
        var n = e.exec;
        if ("function" == typeof n) {
            var i = n.call(e, t);
            if ("object" != typeof i) throw TypeError("RegExp exec method returned something other than an Object or null");
            return i
        }
        if ("RegExp" !== r(e)) throw TypeError("RegExp#exec called on incompatible receiver");
        return o.call(e, t)
    }
}, function(e, t, n) {
    "use strict";
    var r = n(3),
        o = n(2),
        i = n(35),
        a = n(7),
        c = n(14),
        s = n(13),
        u = n(39),
        f = n(83),
        l = n(41),
        d = n(1),
        p = n(60),
        h = d("isConcatSpreadable"),
        v = p >= 51 || !o((function() {
            var e = [];
            return e[h] = !1, e.concat()[0] !== e
        })),
        m = l("concat"),
        g = function(e) {
            if (!a(e)) return !1;
            var t = e[h];
            return void 0 !== t ? !!t : i(e)
        };
    r({
        target: "Array",
        proto: !0,
        forced: !v || !m
    }, {
        concat: function(e) {
            var t, n, r, o, i, a = c(this),
                l = f(a, 0),
                d = 0;
            for (t = -1, r = arguments.length; t < r; t++)
                if (g(i = -1 === t ? a : arguments[t])) {
                    if (d + (o = s(i.length)) > 9007199254740991) throw TypeError("Maximum allowed index exceeded");
                    for (n = 0; n < o; n++, d++) n in i && u(l, d, i[n])
                } else {
                    if (d >= 9007199254740991) throw TypeError("Maximum allowed index exceeded");
                    u(l, d++, i)
                } return l.length = d, l
        }
    })
}, function(e, t, n) {
    "use strict";
    var r = n(3),
        o = n(24).findIndex,
        i = n(90),
        a = n(25),
        c = !0,
        s = a("findIndex");
    "findIndex" in [] && Array(1).findIndex((function() {
        c = !1
    })), r({
        target: "Array",
        proto: !0,
        forced: c || !s
    }, {
        findIndex: function(e) {
            return o(this, e, arguments.length > 1 ? arguments[1] : void 0)
        }
    }), i("findIndex")
}, function(e, t, n) {
    var r = n(21),
        o = /"/g;
    e.exports = function(e, t, n, i) {
        var a = String(r(e)),
            c = "<" + t;
        return "" !== n && (c += " " + n + '="' + String(i).replace(o, "&quot;") + '"'), c + ">" + a + "</" + t + ">"
    }
}, function(e, t, n) {
    var r = n(2);
    e.exports = function(e) {
        return r((function() {
            var t = "" [e]('"');
            return t !== t.toLowerCase() || t.split('"').length > 3
        }))
    }
}, function(e, t, n) {
    "use strict";
    n.r(t), n.d(t, "__extends", (function() {
        return o
    })), n.d(t, "__assign", (function() {
        return i
    })), n.d(t, "__rest", (function() {
        return a
    })), n.d(t, "__decorate", (function() {
        return c
    })), n.d(t, "__param", (function() {
        return s
    })), n.d(t, "__metadata", (function() {
        return u
    })), n.d(t, "__awaiter", (function() {
        return f
    })), n.d(t, "__generator", (function() {
        return l
    })), n.d(t, "__exportStar", (function() {
        return d
    })), n.d(t, "__values", (function() {
        return p
    })), n.d(t, "__read", (function() {
        return h
    })), n.d(t, "__spread", (function() {
        return v
    })), n.d(t, "__spreadArrays", (function() {
        return m
    })), n.d(t, "__await", (function() {
        return g
    })), n.d(t, "__asyncGenerator", (function() {
        return y
    })), n.d(t, "__asyncDelegator", (function() {
        return b
    })), n.d(t, "__asyncValues", (function() {
        return w
    })), n.d(t, "__makeTemplateObject", (function() {
        return _
    })), n.d(t, "__importStar", (function() {
        return S
    })), n.d(t, "__importDefault", (function() {
        return x
    }));
    var r = function(e, t) {
        return (r = Object.setPrototypeOf || {
                __proto__: []
            }
            instanceof Array && function(e, t) {
                e.__proto__ = t
            } || function(e, t) {
                for (var n in t) t.hasOwnProperty(n) && (e[n] = t[n])
            })(e, t)
    };

    function o(e, t) {
        function n() {
            this.constructor = e
        }
        r(e, t), e.prototype = null === t ? Object.create(t) : (n.prototype = t.prototype, new n)
    }
    var i = function() {
        return (i = Object.assign || function(e) {
            for (var t, n = 1, r = arguments.length; n < r; n++)
                for (var o in t = arguments[n]) Object.prototype.hasOwnProperty.call(t, o) && (e[o] = t[o]);
            return e
        }).apply(this, arguments)
    };

    function a(e, t) {
        var n = {};
        for (var r in e) Object.prototype.hasOwnProperty.call(e, r) && t.indexOf(r) < 0 && (n[r] = e[r]);
        if (null != e && "function" == typeof Object.getOwnPropertySymbols) {
            var o = 0;
            for (r = Object.getOwnPropertySymbols(e); o < r.length; o++) t.indexOf(r[o]) < 0 && Object.prototype.propertyIsEnumerable.call(e, r[o]) && (n[r[o]] = e[r[o]])
        }
        return n
    }

    function c(e, t, n, r) {
        var o, i = arguments.length,
            a = i < 3 ? t : null === r ? r = Object.getOwnPropertyDescriptor(t, n) : r;
        if ("object" == typeof Reflect && "function" == typeof Reflect.decorate) a = Reflect.decorate(e, t, n, r);
        else
            for (var c = e.length - 1; c >= 0; c--)(o = e[c]) && (a = (i < 3 ? o(a) : i > 3 ? o(t, n, a) : o(t, n)) || a);
        return i > 3 && a && Object.defineProperty(t, n, a), a
    }

    function s(e, t) {
        return function(n, r) {
            t(n, r, e)
        }
    }

    function u(e, t) {
        if ("object" == typeof Reflect && "function" == typeof Reflect.metadata) return Reflect.metadata(e, t)
    }

    function f(e, t, n, r) {
        return new(n || (n = Promise))((function(o, i) {
            function a(e) {
                try {
                    s(r.next(e))
                } catch (e) {
                    i(e)
                }
            }

            function c(e) {
                try {
                    s(r.throw(e))
                } catch (e) {
                    i(e)
                }
            }

            function s(e) {
                e.done ? o(e.value) : new n((function(t) {
                    t(e.value)
                })).then(a, c)
            }
            s((r = r.apply(e, t || [])).next())
        }))
    }

    function l(e, t) {
        var n, r, o, i, a = {
            label: 0,
            sent: function() {
                if (1 & o[0]) throw o[1];
                return o[1]
            },
            trys: [],
            ops: []
        };
        return i = {
            next: c(0),
            throw: c(1),
            return: c(2)
        }, "function" == typeof Symbol && (i[Symbol.iterator] = function() {
            return this
        }), i;

        function c(i) {
            return function(c) {
                return function(i) {
                    if (n) throw new TypeError("Generator is already executing.");
                    for (; a;) try {
                        if (n = 1, r && (o = 2 & i[0] ? r.return : i[0] ? r.throw || ((o = r.return) && o.call(r), 0) : r.next) && !(o = o.call(r, i[1])).done) return o;
                        switch (r = 0, o && (i = [2 & i[0], o.value]), i[0]) {
                            case 0:
                            case 1:
                                o = i;
                                break;
                            case 4:
                                return a.label++, {
                                    value: i[1],
                                    done: !1
                                };
                            case 5:
                                a.label++, r = i[1], i = [0];
                                continue;
                            case 7:
                                i = a.ops.pop(), a.trys.pop();
                                continue;
                            default:
                                if (!(o = a.trys, (o = o.length > 0 && o[o.length - 1]) || 6 !== i[0] && 2 !== i[0])) {
                                    a = 0;
                                    continue
                                }
                                if (3 === i[0] && (!o || i[1] > o[0] && i[1] < o[3])) {
                                    a.label = i[1];
                                    break
                                }
                                if (6 === i[0] && a.label < o[1]) {
                                    a.label = o[1], o = i;
                                    break
                                }
                                if (o && a.label < o[2]) {
                                    a.label = o[2], a.ops.push(i);
                                    break
                                }
                                o[2] && a.ops.pop(), a.trys.pop();
                                continue
                        }
                        i = t.call(e, a)
                    } catch (e) {
                        i = [6, e], r = 0
                    } finally {
                        n = o = 0
                    }
                    if (5 & i[0]) throw i[1];
                    return {
                        value: i[0] ? i[1] : void 0,
                        done: !0
                    }
                }([i, c])
            }
        }
    }

    function d(e, t) {
        for (var n in e) t.hasOwnProperty(n) || (t[n] = e[n])
    }

    function p(e) {
        var t = "function" == typeof Symbol && e[Symbol.iterator],
            n = 0;
        return t ? t.call(e) : {
            next: function() {
                return e && n >= e.length && (e = void 0), {
                    value: e && e[n++],
                    done: !e
                }
            }
        }
    }

    function h(e, t) {
        var n = "function" == typeof Symbol && e[Symbol.iterator];
        if (!n) return e;
        var r, o, i = n.call(e),
            a = [];
        try {
            for (;
                (void 0 === t || t-- > 0) && !(r = i.next()).done;) a.push(r.value)
        } catch (e) {
            o = {
                error: e
            }
        } finally {
            try {
                r && !r.done && (n = i.return) && n.call(i)
            } finally {
                if (o) throw o.error
            }
        }
        return a
    }

    function v() {
        for (var e = [], t = 0; t < arguments.length; t++) e = e.concat(h(arguments[t]));
        return e
    }

    function m() {
        for (var e = 0, t = 0, n = arguments.length; t < n; t++) e += arguments[t].length;
        var r = Array(e),
            o = 0;
        for (t = 0; t < n; t++)
            for (var i = arguments[t], a = 0, c = i.length; a < c; a++, o++) r[o] = i[a];
        return r
    }

    function g(e) {
        return this instanceof g ? (this.v = e, this) : new g(e)
    }

    function y(e, t, n) {
        if (!Symbol.asyncIterator) throw new TypeError("Symbol.asyncIterator is not defined.");
        var r, o = n.apply(e, t || []),
            i = [];
        return r = {}, a("next"), a("throw"), a("return"), r[Symbol.asyncIterator] = function() {
            return this
        }, r;

        function a(e) {
            o[e] && (r[e] = function(t) {
                return new Promise((function(n, r) {
                    i.push([e, t, n, r]) > 1 || c(e, t)
                }))
            })
        }

        function c(e, t) {
            try {
                (n = o[e](t)).value instanceof g ? Promise.resolve(n.value.v).then(s, u) : f(i[0][2], n)
            } catch (e) {
                f(i[0][3], e)
            }
            var n
        }

        function s(e) {
            c("next", e)
        }

        function u(e) {
            c("throw", e)
        }

        function f(e, t) {
            e(t), i.shift(), i.length && c(i[0][0], i[0][1])
        }
    }

    function b(e) {
        var t, n;
        return t = {}, r("next"), r("throw", (function(e) {
            throw e
        })), r("return"), t[Symbol.iterator] = function() {
            return this
        }, t;

        function r(r, o) {
            t[r] = e[r] ? function(t) {
                return (n = !n) ? {
                    value: g(e[r](t)),
                    done: "return" === r
                } : o ? o(t) : t
            } : o
        }
    }

    function w(e) {
        if (!Symbol.asyncIterator) throw new TypeError("Symbol.asyncIterator is not defined.");
        var t, n = e[Symbol.asyncIterator];
        return n ? n.call(e) : (e = p(e), t = {}, r("next"), r("throw"), r("return"), t[Symbol.asyncIterator] = function() {
            return this
        }, t);

        function r(n) {
            t[n] = e[n] && function(t) {
                return new Promise((function(r, o) {
                    (function(e, t, n, r) {
                        Promise.resolve(r).then((function(t) {
                            e({
                                value: t,
                                done: n
                            })
                        }), t)
                    })(r, o, (t = e[n](t)).done, t.value)
                }))
            }
        }
    }

    function _(e, t) {
        return Object.defineProperty ? Object.defineProperty(e, "raw", {
            value: t
        }) : e.raw = t, e
    }

    function S(e) {
        if (e && e.__esModule) return e;
        var t = {};
        if (null != e)
            for (var n in e) Object.hasOwnProperty.call(e, n) && (t[n] = e[n]);
        return t.default = e, t
    }

    function x(e) {
        return e && e.__esModule ? e : {
            default: e
        }
    }
}, function(e, t, n) {
    "use strict";
    n.r(t), n.d(t, "__extends", (function() {
        return o
    })), n.d(t, "__assign", (function() {
        return i
    })), n.d(t, "__rest", (function() {
        return a
    })), n.d(t, "__decorate", (function() {
        return c
    })), n.d(t, "__param", (function() {
        return s
    })), n.d(t, "__metadata", (function() {
        return u
    })), n.d(t, "__awaiter", (function() {
        return f
    })), n.d(t, "__generator", (function() {
        return l
    })), n.d(t, "__exportStar", (function() {
        return d
    })), n.d(t, "__values", (function() {
        return p
    })), n.d(t, "__read", (function() {
        return h
    })), n.d(t, "__spread", (function() {
        return v
    })), n.d(t, "__spreadArrays", (function() {
        return m
    })), n.d(t, "__await", (function() {
        return g
    })), n.d(t, "__asyncGenerator", (function() {
        return y
    })), n.d(t, "__asyncDelegator", (function() {
        return b
    })), n.d(t, "__asyncValues", (function() {
        return w
    })), n.d(t, "__makeTemplateObject", (function() {
        return _
    })), n.d(t, "__importStar", (function() {
        return S
    })), n.d(t, "__importDefault", (function() {
        return x
    }));
    var r = function(e, t) {
        return (r = Object.setPrototypeOf || {
                __proto__: []
            }
            instanceof Array && function(e, t) {
                e.__proto__ = t
            } || function(e, t) {
                for (var n in t) t.hasOwnProperty(n) && (e[n] = t[n])
            })(e, t)
    };

    function o(e, t) {
        function n() {
            this.constructor = e
        }
        r(e, t), e.prototype = null === t ? Object.create(t) : (n.prototype = t.prototype, new n)
    }
    var i = function() {
        return (i = Object.assign || function(e) {
            for (var t, n = 1, r = arguments.length; n < r; n++)
                for (var o in t = arguments[n]) Object.prototype.hasOwnProperty.call(t, o) && (e[o] = t[o]);
            return e
        }).apply(this, arguments)
    };

    function a(e, t) {
        var n = {};
        for (var r in e) Object.prototype.hasOwnProperty.call(e, r) && t.indexOf(r) < 0 && (n[r] = e[r]);
        if (null != e && "function" == typeof Object.getOwnPropertySymbols) {
            var o = 0;
            for (r = Object.getOwnPropertySymbols(e); o < r.length; o++) t.indexOf(r[o]) < 0 && Object.prototype.propertyIsEnumerable.call(e, r[o]) && (n[r[o]] = e[r[o]])
        }
        return n
    }

    function c(e, t, n, r) {
        var o, i = arguments.length,
            a = i < 3 ? t : null === r ? r = Object.getOwnPropertyDescriptor(t, n) : r;
        if ("object" == typeof Reflect && "function" == typeof Reflect.decorate) a = Reflect.decorate(e, t, n, r);
        else
            for (var c = e.length - 1; c >= 0; c--)(o = e[c]) && (a = (i < 3 ? o(a) : i > 3 ? o(t, n, a) : o(t, n)) || a);
        return i > 3 && a && Object.defineProperty(t, n, a), a
    }

    function s(e, t) {
        return function(n, r) {
            t(n, r, e)
        }
    }

    function u(e, t) {
        if ("object" == typeof Reflect && "function" == typeof Reflect.metadata) return Reflect.metadata(e, t)
    }

    function f(e, t, n, r) {
        return new(n || (n = Promise))((function(o, i) {
            function a(e) {
                try {
                    s(r.next(e))
                } catch (e) {
                    i(e)
                }
            }

            function c(e) {
                try {
                    s(r.throw(e))
                } catch (e) {
                    i(e)
                }
            }

            function s(e) {
                e.done ? o(e.value) : new n((function(t) {
                    t(e.value)
                })).then(a, c)
            }
            s((r = r.apply(e, t || [])).next())
        }))
    }

    function l(e, t) {
        var n, r, o, i, a = {
            label: 0,
            sent: function() {
                if (1 & o[0]) throw o[1];
                return o[1]
            },
            trys: [],
            ops: []
        };
        return i = {
            next: c(0),
            throw: c(1),
            return: c(2)
        }, "function" == typeof Symbol && (i[Symbol.iterator] = function() {
            return this
        }), i;

        function c(i) {
            return function(c) {
                return function(i) {
                    if (n) throw new TypeError("Generator is already executing.");
                    for (; a;) try {
                        if (n = 1, r && (o = 2 & i[0] ? r.return : i[0] ? r.throw || ((o = r.return) && o.call(r), 0) : r.next) && !(o = o.call(r, i[1])).done) return o;
                        switch (r = 0, o && (i = [2 & i[0], o.value]), i[0]) {
                            case 0:
                            case 1:
                                o = i;
                                break;
                            case 4:
                                return a.label++, {
                                    value: i[1],
                                    done: !1
                                };
                            case 5:
                                a.label++, r = i[1], i = [0];
                                continue;
                            case 7:
                                i = a.ops.pop(), a.trys.pop();
                                continue;
                            default:
                                if (!(o = a.trys, (o = o.length > 0 && o[o.length - 1]) || 6 !== i[0] && 2 !== i[0])) {
                                    a = 0;
                                    continue
                                }
                                if (3 === i[0] && (!o || i[1] > o[0] && i[1] < o[3])) {
                                    a.label = i[1];
                                    break
                                }
                                if (6 === i[0] && a.label < o[1]) {
                                    a.label = o[1], o = i;
                                    break
                                }
                                if (o && a.label < o[2]) {
                                    a.label = o[2], a.ops.push(i);
                                    break
                                }
                                o[2] && a.ops.pop(), a.trys.pop();
                                continue
                        }
                        i = t.call(e, a)
                    } catch (e) {
                        i = [6, e], r = 0
                    } finally {
                        n = o = 0
                    }
                    if (5 & i[0]) throw i[1];
                    return {
                        value: i[0] ? i[1] : void 0,
                        done: !0
                    }
                }([i, c])
            }
        }
    }

    function d(e, t) {
        for (var n in e) t.hasOwnProperty(n) || (t[n] = e[n])
    }

    function p(e) {
        var t = "function" == typeof Symbol && e[Symbol.iterator],
            n = 0;
        return t ? t.call(e) : {
            next: function() {
                return e && n >= e.length && (e = void 0), {
                    value: e && e[n++],
                    done: !e
                }
            }
        }
    }

    function h(e, t) {
        var n = "function" == typeof Symbol && e[Symbol.iterator];
        if (!n) return e;
        var r, o, i = n.call(e),
            a = [];
        try {
            for (;
                (void 0 === t || t-- > 0) && !(r = i.next()).done;) a.push(r.value)
        } catch (e) {
            o = {
                error: e
            }
        } finally {
            try {
                r && !r.done && (n = i.return) && n.call(i)
            } finally {
                if (o) throw o.error
            }
        }
        return a
    }

    function v() {
        for (var e = [], t = 0; t < arguments.length; t++) e = e.concat(h(arguments[t]));
        return e
    }

    function m() {
        for (var e = 0, t = 0, n = arguments.length; t < n; t++) e += arguments[t].length;
        var r = Array(e),
            o = 0;
        for (t = 0; t < n; t++)
            for (var i = arguments[t], a = 0, c = i.length; a < c; a++, o++) r[o] = i[a];
        return r
    }

    function g(e) {
        return this instanceof g ? (this.v = e, this) : new g(e)
    }

    function y(e, t, n) {
        if (!Symbol.asyncIterator) throw new TypeError("Symbol.asyncIterator is not defined.");
        var r, o = n.apply(e, t || []),
            i = [];
        return r = {}, a("next"), a("throw"), a("return"), r[Symbol.asyncIterator] = function() {
            return this
        }, r;

        function a(e) {
            o[e] && (r[e] = function(t) {
                return new Promise((function(n, r) {
                    i.push([e, t, n, r]) > 1 || c(e, t)
                }))
            })
        }

        function c(e, t) {
            try {
                (n = o[e](t)).value instanceof g ? Promise.resolve(n.value.v).then(s, u) : f(i[0][2], n)
            } catch (e) {
                f(i[0][3], e)
            }
            var n
        }

        function s(e) {
            c("next", e)
        }

        function u(e) {
            c("throw", e)
        }

        function f(e, t) {
            e(t), i.shift(), i.length && c(i[0][0], i[0][1])
        }
    }

    function b(e) {
        var t, n;
        return t = {}, r("next"), r("throw", (function(e) {
            throw e
        })), r("return"), t[Symbol.iterator] = function() {
            return this
        }, t;

        function r(r, o) {
            t[r] = e[r] ? function(t) {
                return (n = !n) ? {
                    value: g(e[r](t)),
                    done: "return" === r
                } : o ? o(t) : t
            } : o
        }
    }

    function w(e) {
        if (!Symbol.asyncIterator) throw new TypeError("Symbol.asyncIterator is not defined.");
        var t, n = e[Symbol.asyncIterator];
        return n ? n.call(e) : (e = p(e), t = {}, r("next"), r("throw"), r("return"), t[Symbol.asyncIterator] = function() {
            return this
        }, t);

        function r(n) {
            t[n] = e[n] && function(t) {
                return new Promise((function(r, o) {
                    (function(e, t, n, r) {
                        Promise.resolve(r).then((function(t) {
                            e({
                                value: t,
                                done: n
                            })
                        }), t)
                    })(r, o, (t = e[n](t)).done, t.value)
                }))
            }
        }
    }

    function _(e, t) {
        return Object.defineProperty ? Object.defineProperty(e, "raw", {
            value: t
        }) : e.raw = t, e
    }

    function S(e) {
        if (e && e.__esModule) return e;
        var t = {};
        if (null != e)
            for (var n in e) Object.hasOwnProperty.call(e, n) && (t[n] = e[n]);
        return t.default = e, t
    }

    function x(e) {
        return e && e.__esModule ? e : {
            default: e
        }
    }
}, function(e, t, n) {
    "use strict";
    n.r(t), n.d(t, "LogLevel", (function() {
        return r
    })), n.d(t, "Logger", (function() {
        return c
    })), n.d(t, "setLogLevel", (function() {
        return s
    }));
    var r, o = [];
    ! function(e) {
        e[e.DEBUG = 0] = "DEBUG", e[e.VERBOSE = 1] = "VERBOSE", e[e.INFO = 2] = "INFO", e[e.WARN = 3] = "WARN", e[e.ERROR = 4] = "ERROR", e[e.SILENT = 5] = "SILENT"
    }(r || (r = {}));
    var i = r.INFO,
        a = function(e, t) {
            for (var n = [], o = 2; o < arguments.length; o++) n[o - 2] = arguments[o];
            if (!(t < e.logLevel)) {
                var i = (new Date).toISOString();
                switch (t) {
                    case r.DEBUG:
                    case r.VERBOSE:
                        console.log.apply(console, ["[" + i + "]  " + e.name + ":"].concat(n));
                        break;
                    case r.INFO:
                        console.info.apply(console, ["[" + i + "]  " + e.name + ":"].concat(n));
                        break;
                    case r.WARN:
                        console.warn.apply(console, ["[" + i + "]  " + e.name + ":"].concat(n));
                        break;
                    case r.ERROR:
                        console.error.apply(console, ["[" + i + "]  " + e.name + ":"].concat(n));
                        break;
                    default:
                        throw new Error("Attempted to log a message with an invalid logType (value: " + t + ")")
                }
            }
        },
        c = function() {
            function e(e) {
                this.name = e, this._logLevel = i, this._logHandler = a, o.push(this)
            }
            return Object.defineProperty(e.prototype, "logLevel", {
                get: function() {
                    return this._logLevel
                },
                set: function(e) {
                    if (!(e in r)) throw new TypeError("Invalid value assigned to `logLevel`");
                    this._logLevel = e
                },
                enumerable: !0,
                configurable: !0
            }), Object.defineProperty(e.prototype, "logHandler", {
                get: function() {
                    return this._logHandler
                },
                set: function(e) {
                    if ("function" != typeof e) throw new TypeError("Value assigned to `logHandler` must be a function");
                    this._logHandler = e
                },
                enumerable: !0,
                configurable: !0
            }), e.prototype.debug = function() {
                for (var e = [], t = 0; t < arguments.length; t++) e[t] = arguments[t];
                this._logHandler.apply(this, [this, r.DEBUG].concat(e))
            }, e.prototype.log = function() {
                for (var e = [], t = 0; t < arguments.length; t++) e[t] = arguments[t];
                this._logHandler.apply(this, [this, r.VERBOSE].concat(e))
            }, e.prototype.info = function() {
                for (var e = [], t = 0; t < arguments.length; t++) e[t] = arguments[t];
                this._logHandler.apply(this, [this, r.INFO].concat(e))
            }, e.prototype.warn = function() {
                for (var e = [], t = 0; t < arguments.length; t++) e[t] = arguments[t];
                this._logHandler.apply(this, [this, r.WARN].concat(e))
            }, e.prototype.error = function() {
                for (var e = [], t = 0; t < arguments.length; t++) e[t] = arguments[t];
                this._logHandler.apply(this, [this, r.ERROR].concat(e))
            }, e
        }();

    function s(e) {
        o.forEach((function(t) {
            t.logLevel = e
        }))
    }
}, function(e, t, n) {
    var r = n(3),
        o = n(2),
        i = n(10),
        a = n(15).f,
        c = n(6),
        s = o((function() {
            a(1)
        }));
    r({
        target: "Object",
        stat: !0,
        forced: !c || s,
        sham: !c
    }, {
        getOwnPropertyDescriptor: function(e, t) {
            return a(i(e), t)
        }
    })
}, function(e, t, n) {
    var r = n(3),
        o = n(6),
        i = n(73),
        a = n(10),
        c = n(15),
        s = n(39);
    r({
        target: "Object",
        stat: !0,
        sham: !o
    }, {
        getOwnPropertyDescriptors: function(e) {
            for (var t, n, r = a(e), o = c.f, u = i(r), f = {}, l = 0; u.length > l;) void 0 !== (n = o(r, t = u[l++])) && s(f, t, n);
            return f
        }
    })
}, function(e, t, n) {
    var r = n(3),
        o = n(14),
        i = n(55);
    r({
        target: "Object",
        stat: !0,
        forced: n(2)((function() {
            i(1)
        }))
    }, {
        keys: function(e) {
            return i(o(e))
        }
    })
}, function(e, t) {
    Object.keys || (Object.keys = function(e) {
        var t = [];
        for (var n in e) Object.prototype.hasOwnProperty.call(e, n) && t.push(n);
        return t
    })
}, function(e, t) {
    "remove" in Element.prototype || (Element.prototype.remove = function() {
        this.parentNode && this.parentNode.removeChild(this)
    })
}, function(e, t, n) {
    "use strict";
    n.r(t);
    var r, o, i, a = n(105),
        c = n.n(a);
    n(45), n(56), n(57), n(17), n(26), n(40), n(59), n(42), n(43), n(61), n(62), n(64), n(28), n(100), n(18), n(65);

    function s(e, t) {
        return function(e) {
            if (Array.isArray(e)) return e
        }(e) || function(e, t) {
            if ("undefined" == typeof Symbol || !(Symbol.iterator in Object(e))) return;
            var n = [],
                r = !0,
                o = !1,
                i = void 0;
            try {
                for (var a, c = e[Symbol.iterator](); !(r = (a = c.next()).done) && (n.push(a.value), !t || n.length !== t); r = !0);
            } catch (e) {
                o = !0, i = e
            } finally {
                try {
                    r || null == c.return || c.return()
                } finally {
                    if (o) throw i
                }
            }
            return n
        }(e, t) || function(e, t) {
            if (!e) return;
            if ("string" == typeof e) return u(e, t);
            var n = Object.prototype.toString.call(e).slice(8, -1);
            "Object" === n && e.constructor && (n = e.constructor.name);
            if ("Map" === n || "Set" === n) return Array.from(e);
            if ("Arguments" === n || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return u(e, t)
        }(e, t) || function() {
            throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")
        }()
    }

    function u(e, t) {
        (null == t || t > e.length) && (t = e.length);
        for (var n = 0, r = new Array(t); n < t; n++) r[n] = e[n];
        return r
    }
    var f = !1;

    function l() {
        var e = document.documentElement;
        e.getBoundingClientRect().top >= -40 && !f ? (e.classList.remove("is-backscroll"), r.classList.remove("is-sticky"), i.classList.remove("is-hidden"), o && o.classList.remove("is-sticky")) : f || (r.classList.add("is-sticky"), i.classList.add("is-hidden"))
    }

    function d() {
        var e = s(document.getElementsByClassName("document-header"), 1);
        r = e[0];
        var t = s(document.getElementsByClassName("header__sponsored-post-header-wrapper"), 1);
        o = t[0];
        var n, a, c, u, d, p, h, v, m, g, y, b = s(document.getElementsByClassName("header__navigation-wrapper"), 1);
        i = b[0], window.addEventListener("scroll", l), window.addEventListener("DOMContentLoaded", l), n = document.querySelector(".header__logounderline"), a = Array.from(document.querySelectorAll(".stream .teaser")), null !== n && a.forEach((function(e) {
            e.addEventListener("mouseenter", (function(e) {
                e.target instanceof HTMLElement && n.setAttribute("class", "header__logounderline ".concat(e.target.dataset.colorscheme))
            }), {
                passive: !0
            }), e.addEventListener("mouseleave", (function(e) {
                e.target instanceof HTMLElement && n.setAttribute("class", "header__logounderline colorScheme2")
            }), {
                passive: !0
            })
        })), c = Array.from(document.querySelectorAll(".header__navigation-burger")), u = document.querySelector(".header__navigation-wrapper"), d = document.querySelector(".header__navigation-wrapper"), null !== u && null !== d && c.forEach((function(e) {
            e.addEventListener("click", (function(t) {
                t.preventDefault();
                var n = document.documentElement,
                    r = e.getAttribute("aria-expanded");
                u.classList.toggle("is-visible"), e.setAttribute("aria-expanded", "true" === r ? "false" : "true"), f && n.getBoundingClientRect().top < -40 ? (d.classList.add("is-hidden"), d.classList.remove("is-visible"), f = !1) : f && n.getBoundingClientRect().top >= -40 ? (d.classList.remove("is-hidden"), d.classList.remove("is-visible"), f = !1) : (d.classList.add("is-visible"), d.classList.remove("is-hidden"), f = !0)
            }))
        })), p = document.querySelector(".offcanvas-close-saved"), h = document.querySelector(".offcanvas-close-pushed"), null !== p && p.addEventListener("click", (function(e) {
            e.preventDefault();
            var t = document.getElementById("saved-articles");
            t && t.classList.remove("visible")
        })), null !== h && h.addEventListener("click", (function(e) {
            e.preventDefault();
            var t = document.getElementById("pushed-articles");
            t && t.classList.remove("visible")
        })), v = document.getElementsByClassName("new-articles-hint")[0], m = document.documentElement, g = window.innerHeight, y = m.getBoundingClientRect().top, v.addEventListener("click", (function() {
            window.dataLayer = window.dataLayer || [], window.dataLayer.push({
                event: "ae~button",
                category: "function",
                action: "click_info",
                label: "beitragsbutton"
            }), location.replace("/")
        })), document.addEventListener("visibilitychange", (function() {
            if ("visible" === document.visibilityState) {
                y = m.getBoundingClientRect().top;
                var e = new Date(localStorage.getItem("setAppToBackgroundTime"));
                fetch("/alle_artikel.rss").then((function(e) {
                    return e.text()
                })).then((function(t) {
                    var n = (new DOMParser).parseFromString(t, "text/xml").getElementsByTagName("pubDate");
                    0 !== n.length && new Date(n[0].textContent) > e && (window.dataLayer = window.dataLayer || [], window.dataLayer.push({
                        event: "ai~button",
                        category: "function",
                        action: "show_info",
                        label: "beitragsbutton"
                    }), v.style.display = "flex")
                }))
            } else localStorage.setItem("setAppToBackgroundTime", (new Date).toString())
        })), document.addEventListener("scroll", (function() {
            var e = m.getBoundingClientRect().top < y + -1 * g,
                t = m.getBoundingClientRect().top > y - -1 * g;
            (e || t) && (v.style.display = "none")
        }))
    }

    function p(e) {
        var t;
        try {
            t = window[e];
            var n = "__storage_test__";
            return t.setItem(n, n), t.removeItem(n), !0
        } catch (e) {
            return e instanceof DOMException && (22 === e.code || 1014 === e.code || "QuotaExceededError" === e.name || "NS_ERROR_DOM_QUOTA_REACHED" === e.name) && 0 !== t.length
        }
    }

    function h(e) {
        window.dataLayer = window.dataLayer || [], window.dataLayer.push(e)
    }

    function v() {
        var e, t, n, r;
        "share" in navigator ? (e = document.querySelectorAll(".actionbar-share"), t = document.querySelector('link[rel="canonical"]'), n = document.querySelector(".article__header-title"), r = {
            title: n && n.textContent || document.title,
            text: "Lies folgenden Artikel auf jetzt.de:",
            url: t ? t.href : window.location.href
        }, Array.from(e).forEach((function(e) {
            e.addEventListener("click", (function(e) {
                e.preventDefault(), navigator.share(r).then((function() {
                    h({
                        event: "nativeSharing"
                    })
                })).catch((function(e) {
                    console.log("Couldn't share because of", e.message)
                }))
            }))
        }))) : (function() {
            var e = document.querySelectorAll(".actionbar-share, .actionbar-close");
            Array.from(e).forEach((function(e) {
                e.addEventListener("click", (function(t) {
                    t.preventDefault(), e.parentElement.parentElement.classList.toggle("show-fallback")
                }))
            }))
        }(), !0 === (window.matchMedia("(display-mode: standalone)").matches || !0 === window.navigator.standalone) ? (function() {
            for (var e = document.getElementsByClassName("sharingbar__item-link"), t = 0; t < e.length; t++) e[t].removeAttribute("target"), e[t].removeAttribute("rel")
        }(), function() {
            for (var e = document.querySelectorAll(".sharingbar__item-link__mail"), t = function(t) {
                    e[t].addEventListener("click", (function(n) {
                        n.preventDefault(), window.location.href = e[t].href
                    }))
                }, n = 0; n < e.length; n++) t(n)
        }()) : function() {
            var e = document.querySelectorAll(".sharingbar");

            function t(e) {
                if (null !== e.target && e.target instanceof Element) {
                    var t = e.target instanceof HTMLAnchorElement ? e.target : e.target.closest("a");
                    if (null !== t && "_blank" === t.target) {
                        e.preventDefault();
                        var n = t.getAttribute("href") || null;
                        null !== n && window.open(n, "sharing is caring", "width=600, height=400")
                    }
                }
            }
            Array.from(e).forEach((function(e) {
                e.addEventListener("click", t)
            }))
        }())
    }
    n(133), n(66), n(134), n(102);
    var m, g = n(106),
        y = n.n(g),
        b = [];

    function w() {
        var e = document.querySelector('link[rel="canonical"]'),
            t = document.querySelector(".article__header-title"),
            n = document.querySelector(".article__header-date"),
            r = document.querySelector("article.article");
        return {
            url: e ? e.href : window.location.href,
            title: t && t.textContent || "Artikel",
            image: r && r.dataset.teaserImage ? r.dataset.teaserImage.replace(".l.jpg", ".m.jpg") : null,
            date: n ? n.dateTime : null
        }
    }

    function _() {
        m.setItem("savedArticles", JSON.stringify(b))
    }

    function S(e) {
        var t = b.findIndex((function(t) {
            return t.url === e
        })); - 1 !== t && (b = b.filter((function(e, n) {
            return n !== t
        })), _(), k())
    }

    function x(e) {
        return -1 !== b.findIndex((function(t) {
            return t.url === e
        }))
    }

    function E() {
        var e = w(),
            t = document.createElement("li"),
            n = document.createElement("span"),
            r = document.createElement("span");
        n.classList.add("actionbar-save-label"), r.classList.add("actionbar-icon", "actionbar-save-icon"), r.innerHTML = y.a, t.classList.add("actionbar-save"), t.appendChild(r), t.appendChild(n), x(e.url) ? (t.classList.add("actionbar-save--saved"), n.textContent = "gemerkt") : n.textContent = "merken", t.addEventListener("click", (function(r) {
            r.preventDefault(), x(e.url) ? (S(e.url), t.classList.remove("actionbar-save--saved"), n.textContent = "merken", h({
                event: "saveArticle",
                action: "removeFromArticle",
                newArticleLength: b.length
            })) : (! function(e) {
                b.unshift(e), _(), k()
            }(e), t.classList.add("actionbar-save--saved"), n.textContent = "gemerkt", h({
                event: "saveArticle",
                action: "addFromArticle",
                newArticleLength: b.length
            }))
        }));
        var o = document.querySelector(".actionbar-actions");
        o && o.prepend(t)
    }

    function k() {
        var e = document.querySelector(".article-list--saved");
        if (null !== e) {
            e.innerHTML = "";
            var t, n, r, o = b.map((function(e) {
                    var t = document.createElement("li"),
                        n = document.createElement("a");
                    if (t.classList.add("article-list-item"), n.href = e.url, e.image) {
                        var r = document.createElement("img");
                        r.src = e.image, n.appendChild(r)
                    }
                    var o = document.createElement("h3");
                    o.textContent = e.title, n.appendChild(o);
                    var i = document.createElement("span");
                    return i.classList.add("article-list-item-action"), i.dataset.url = e.url, i.title = "Artikel aus Merkliste entfernen", n.appendChild(i), t.appendChild(n), t
                })),
                i = document.createDocumentFragment();
            o.forEach((function(e) {
                return i.appendChild(e)
            })), e.appendChild(i), t = document.querySelector(".saved-article-view-count"), n = 1 === b.length ? "gemerkter" : "gemerkte", t && (t.textContent = "".concat(b.length, " ").concat(n)), r = w(), document.querySelectorAll(".article-list-item-action").forEach((function(e) {
                e.addEventListener("click", (function(t) {
                    if (t.preventDefault(), S(e.dataset.url), h({
                            event: "saveArticle",
                            action: "removeFromList",
                            newArticleLength: b.length
                        }), r.url === e.dataset.url) {
                        var n = document.querySelector(".actionbar-save"),
                            o = document.querySelector(".actionbar-save-label");
                        n && o && (o.textContent = "merken", n.classList.remove("actionbar-save--saved"))
                    }
                }))
            }))
        }
    }

    function O() {
        p("localStorage") && (m = window.localStorage, b = function() {
            try {
                return JSON.parse(m.getItem("savedArticles") || "[]")
            } catch (e) {
                return []
            }
        }(), k(), function() {
            var e = document.createElement("a"),
                t = document.createElement("div"),
                n = document.createElement("span");
            t.classList.add("action-saved-articles-icon"), n.classList.add("action-saved-articles-caption"), n.textContent = "Merkliste", e.href = "#saved-articles", e.classList.add("action-saved-articles"), e.appendChild(t), e.appendChild(n);
            var r = document.querySelector(".header__actions");
            r && r.appendChild(e), e.addEventListener("click", (function(e) {
                e.preventDefault();
                var t = document.getElementById("saved-articles");
                t && t.classList.add("visible")
            }))
        }(), document.documentElement.classList.contains("blogPost") && E())
    }
    n(103), n(104);
    var T = n(44),
        A = n.n(T),
        C = n(67),
        I = n.n(C),
        N = function(e, t) {
            return (N = Object.setPrototypeOf || {
                    __proto__: []
                }
                instanceof Array && function(e, t) {
                    e.__proto__ = t
                } || function(e, t) {
                    for (var n in t) t.hasOwnProperty(n) && (e[n] = t[n])
                })(e, t)
        };

    function L(e, t) {
        function n() {
            this.constructor = e
        }
        N(e, t), e.prototype = null === t ? Object.create(t) : (n.prototype = t.prototype, new n)
    }
    var P = function() {
        return (P = Object.assign || function(e) {
            for (var t, n = 1, r = arguments.length; n < r; n++)
                for (var o in t = arguments[n]) Object.prototype.hasOwnProperty.call(t, o) && (e[o] = t[o]);
            return e
        }).apply(this, arguments)
    };

    function j(e, t, n, r) {
        return new(n || (n = Promise))((function(o, i) {
            function a(e) {
                try {
                    s(r.next(e))
                } catch (e) {
                    i(e)
                }
            }

            function c(e) {
                try {
                    s(r.throw(e))
                } catch (e) {
                    i(e)
                }
            }

            function s(e) {
                e.done ? o(e.value) : new n((function(t) {
                    t(e.value)
                })).then(a, c)
            }
            s((r = r.apply(e, t || [])).next())
        }))
    }

    function D(e, t) {
        var n, r, o, i, a = {
            label: 0,
            sent: function() {
                if (1 & o[0]) throw o[1];
                return o[1]
            },
            trys: [],
            ops: []
        };
        return i = {
            next: c(0),
            throw: c(1),
            return: c(2)
        }, "function" == typeof Symbol && (i[Symbol.iterator] = function() {
            return this
        }), i;

        function c(i) {
            return function(c) {
                return function(i) {
                    if (n) throw new TypeError("Generator is already executing.");
                    for (; a;) try {
                        if (n = 1, r && (o = 2 & i[0] ? r.return : i[0] ? r.throw || ((o = r.return) && o.call(r), 0) : r.next) && !(o = o.call(r, i[1])).done) return o;
                        switch (r = 0, o && (i = [2 & i[0], o.value]), i[0]) {
                            case 0:
                            case 1:
                                o = i;
                                break;
                            case 4:
                                return a.label++, {
                                    value: i[1],
                                    done: !1
                                };
                            case 5:
                                a.label++, r = i[1], i = [0];
                                continue;
                            case 7:
                                i = a.ops.pop(), a.trys.pop();
                                continue;
                            default:
                                if (!(o = a.trys, (o = o.length > 0 && o[o.length - 1]) || 6 !== i[0] && 2 !== i[0])) {
                                    a = 0;
                                    continue
                                }
                                if (3 === i[0] && (!o || i[1] > o[0] && i[1] < o[3])) {
                                    a.label = i[1];
                                    break
                                }
                                if (6 === i[0] && a.label < o[1]) {
                                    a.label = o[1], o = i;
                                    break
                                }
                                if (o && a.label < o[2]) {
                                    a.label = o[2], a.ops.push(i);
                                    break
                                }
                                o[2] && a.ops.pop(), a.trys.pop();
                                continue
                        }
                        i = t.call(e, a)
                    } catch (e) {
                        i = [6, e], r = 0
                    } finally {
                        n = o = 0
                    }
                    if (5 & i[0]) throw i[1];
                    return {
                        value: i[0] ? i[1] : void 0,
                        done: !0
                    }
                }([i, c])
            }
        }
    }

    function M(e, t) {
        var n = "function" == typeof Symbol && e[Symbol.iterator];
        if (!n) return e;
        var r, o, i = n.call(e),
            a = [];
        try {
            for (;
                (void 0 === t || t-- > 0) && !(r = i.next()).done;) a.push(r.value)
        } catch (e) {
            o = {
                error: e
            }
        } finally {
            try {
                r && !r.done && (n = i.return) && n.call(i)
            } finally {
                if (o) throw o.error
            }
        }
        return a
    }
    var R, B, F, W = n(29),
        H = ((R = {})["only-available-in-window"] = "This method is available in a Window context.", R["only-available-in-sw"] = "This method is available in a service worker context.", R["should-be-overriden"] = "This method should be overriden by extended classes.", R["bad-sender-id"] = "Please ensure that 'messagingSenderId' is set correctly in the options passed into firebase.initializeApp().", R["permission-default"] = "The required permissions were not granted and dismissed instead.", R["permission-blocked"] = "The required permissions were not granted and blocked instead.", R["unsupported-browser"] = "This browser doesn't support the API's required to use the firebase SDK.", R["notifications-blocked"] = "Notifications have been blocked.", R["failed-serviceworker-registration"] = "We are unable to register the default service worker. {$browserErrorMessage}", R["sw-registration-expected"] = "A service worker registration was the expected input.", R["get-subscription-failed"] = "There was an error when trying to get any existing Push Subscriptions.", R["invalid-saved-token"] = "Unable to access details of the saved token.", R["sw-reg-redundant"] = "The service worker being used for push was made redundant.", R["token-subscribe-failed"] = "A problem occured while subscribing the user to FCM: {$errorInfo}", R["token-subscribe-no-token"] = "FCM returned no token when subscribing the user to push.", R["token-subscribe-no-push-set"] = "FCM returned an invalid response when getting an FCM token.", R["token-unsubscribe-failed"] = "A problem occured while unsubscribing the user from FCM: {$errorInfo}", R["token-update-failed"] = "A problem occured while updating the user from FCM: {$errorInfo}", R["token-update-no-token"] = "FCM returned no token when updating the user to push.", R["use-sw-before-get-token"] = "The useServiceWorker() method may only be called once and must be called before calling getToken() to ensure your service worker is used.", R["invalid-delete-token"] = "You must pass a valid token into deleteToken(), i.e. the token from getToken().", R["delete-token-not-found"] = "The deletion attempt for token could not be performed as the token was not found.", R["delete-scope-not-found"] = "The deletion attempt for service worker scope could not be performed as the scope was not found.", R["bg-handler-function-expected"] = "The input to setBackgroundMessageHandler() must be a function.", R["no-window-client-to-msg"] = "An attempt was made to message a non-existant window client.", R["unable-to-resubscribe"] = "There was an error while re-subscribing the FCM token for push messaging. Will have to resubscribe the user on next visit. {$errorInfo}", R["no-fcm-token-for-resubscribe"] = "Could not find an FCM token and as a result, unable to resubscribe. Will have to resubscribe the user on next visit.", R["failed-to-delete-token"] = "Unable to delete the currently saved token.", R["no-sw-in-reg"] = "Even though the service worker registration was successful, there was a problem accessing the service worker itself.", R["bad-scope"] = "The service worker scope must be a string with at least one character.", R["bad-vapid-key"] = "The public VAPID key is not a Uint8Array with 65 bytes.", R["bad-subscription"] = "The subscription must be a valid PushSubscription.", R["bad-token"] = "The FCM Token used for storage / lookup was not a valid token string.", R["bad-push-set"] = "The FCM push set used for storage / lookup was not not a valid push set string.", R["failed-delete-vapid-key"] = "The VAPID key could not be deleted.", R["invalid-public-vapid-key"] = "The public VAPID key must be a string.", R["use-public-key-before-get-token"] = "The usePublicVapidKey() method may only be called once and must be called before calling getToken() to ensure your VAPID key is used.", R["public-vapid-key-decryption-failed"] = "The public VAPID key did not equal 65 bytes when decrypted.", R),
        U = new W.ErrorFactory("messaging", "Messaging", H),
        q = new Uint8Array([4, 51, 148, 247, 223, 161, 235, 177, 220, 3, 162, 94, 21, 113, 219, 72, 211, 46, 237, 237, 178, 52, 219, 183, 71, 58, 12, 143, 196, 204, 225, 111, 60, 140, 132, 223, 171, 182, 102, 62, 242, 12, 212, 139, 254, 227, 249, 118, 47, 20, 28, 99, 8, 106, 111, 45, 177, 26, 149, 176, 206, 55, 192, 156, 110]),
        V = "https://fcm.googleapis.com";

    function z(e, t) {
        if (null == e || null == t) return !1;
        if (e === t) return !0;
        if (e.byteLength !== t.byteLength) return !1;
        for (var n = new DataView(e), r = new DataView(t), o = 0; o < e.byteLength; o++)
            if (n.getUint8(o) !== r.getUint8(o)) return !1;
        return !0
    }

    function K(e) {
        var t = new Uint8Array(e);
        return btoa(String.fromCharCode.apply(String, function() {
            for (var e = [], t = 0; t < arguments.length; t++) e = e.concat(M(arguments[t]));
            return e
        }(t)))
    }

    function G(e) {
        return K(e).replace(/=/g, "").replace(/\+/g, "-").replace(/\//g, "_")
    }! function(e) {
        e.TYPE_OF_MSG = "firebase-messaging-msg-type", e.DATA = "firebase-messaging-msg-data"
    }(B || (B = {})),
    function(e) {
        e.PUSH_MSG_RECEIVED = "push-msg-received", e.NOTIFICATION_CLICKED = "notification-clicked"
    }(F || (F = {}));
    var Y = function() {
        function e() {}
        return e.prototype.getToken = function(e, t, n) {
            return j(this, void 0, void 0, (function() {
                var r, o, i, a, c, s, u, f, l;
                return D(this, (function(d) {
                    switch (d.label) {
                        case 0:
                            r = G(t.getKey("p256dh")), o = G(t.getKey("auth")), i = "authorized_entity=" + e + "&endpoint=" + t.endpoint + "&encryption_key=" + r + "&encryption_auth=" + o, z(n.buffer, q.buffer) || (a = G(n), i += "&application_pub_key=" + a), (c = new Headers).append("Content-Type", "application/x-www-form-urlencoded"), s = {
                                method: "POST",
                                headers: c,
                                body: i
                            }, d.label = 1;
                        case 1:
                            return d.trys.push([1, 4, , 5]), [4, fetch(V + "/fcm/connect/subscribe", s)];
                        case 2:
                            return [4, d.sent().json()];
                        case 3:
                            return u = d.sent(), [3, 5];
                        case 4:
                            throw f = d.sent(), U.create("token-subscribe-failed", {
                                errorInfo: f
                            });
                        case 5:
                            if (u.error) throw l = u.error.message, U.create("token-subscribe-failed", {
                                errorInfo: l
                            });
                            if (!u.token) throw U.create("token-subscribe-no-token");
                            if (!u.pushSet) throw U.create("token-subscribe-no-push-set");
                            return [2, {
                                token: u.token,
                                pushSet: u.pushSet
                            }]
                    }
                }))
            }))
        }, e.prototype.updateToken = function(e, t, n, r, o) {
            return j(this, void 0, void 0, (function() {
                var i, a, c, s, u, f, l, d, p;
                return D(this, (function(h) {
                    switch (h.label) {
                        case 0:
                            i = G(r.getKey("p256dh")), a = G(r.getKey("auth")), c = "push_set=" + n + "&token=" + t + "&authorized_entity=" + e + "&endpoint=" + r.endpoint + "&encryption_key=" + i + "&encryption_auth=" + a, z(o.buffer, q.buffer) || (s = G(o), c += "&application_pub_key=" + s), (u = new Headers).append("Content-Type", "application/x-www-form-urlencoded"), f = {
                                method: "POST",
                                headers: u,
                                body: c
                            }, h.label = 1;
                        case 1:
                            return h.trys.push([1, 4, , 5]), [4, fetch(V + "/fcm/connect/subscribe", f)];
                        case 2:
                            return [4, h.sent().json()];
                        case 3:
                            return l = h.sent(), [3, 5];
                        case 4:
                            throw d = h.sent(), U.create("token-update-failed", {
                                errorInfo: d
                            });
                        case 5:
                            if (l.error) throw p = l.error.message, U.create("token-update-failed", {
                                errorInfo: p
                            });
                            if (!l.token) throw U.create("token-update-no-token");
                            return [2, l.token]
                    }
                }))
            }))
        }, e.prototype.deleteToken = function(e, t, n) {
            return j(this, void 0, void 0, (function() {
                var r, o, i, a, c, s;
                return D(this, (function(u) {
                    switch (u.label) {
                        case 0:
                            r = "authorized_entity=" + e + "&token=" + t + "&pushSet=" + n, (o = new Headers).append("Content-Type", "application/x-www-form-urlencoded"), i = {
                                method: "POST",
                                headers: o,
                                body: r
                            }, u.label = 1;
                        case 1:
                            return u.trys.push([1, 4, , 5]), [4, fetch(V + "/fcm/connect/unsubscribe", i)];
                        case 2:
                            return [4, u.sent().json()];
                        case 3:
                            if ((a = u.sent()).error) throw c = a.error.message, U.create("token-unsubscribe-failed", {
                                errorInfo: c
                            });
                            return [3, 5];
                        case 4:
                            throw s = u.sent(), U.create("token-unsubscribe-failed", {
                                errorInfo: s
                            });
                        case 5:
                            return [2]
                    }
                }))
            }))
        }, e
    }();

    function $(e) {
        for (var t = (e + "=".repeat((4 - e.length % 4) % 4)).replace(/\-/g, "+").replace(/_/g, "/"), n = atob(t), r = new Uint8Array(n.length), o = 0; o < n.length; ++o) r[o] = n.charCodeAt(o);
        return r
    }

    function J() {
        var e = indexedDB.open("undefined");
        e.onerror = function(e) {}, e.onsuccess = function(t) {
            ! function(e) {
                if (e.objectStoreNames.contains("fcm_token_object_Store")) {
                    var t = e.transaction("fcm_token_object_Store").objectStore("fcm_token_object_Store"),
                        n = new Y,
                        r = t.openCursor();
                    r.onerror = function(e) {
                        console.warn("Unable to cleanup old IDB.", e)
                    }, r.onsuccess = function() {
                        var t = r.result;
                        if (t) {
                            var o = t.value;
                            n.deleteToken(o.fcmSenderId, o.fcmToken, o.fcmPushSet), t.continue()
                        } else e.close(), indexedDB.deleteDatabase("undefined")
                    }
                }
            }(e.result)
        }
    }
    var Q = function() {
        function e() {
            this.dbPromise = null
        }
        return e.prototype.get = function(e) {
            return this.createTransaction((function(t) {
                return t.get(e)
            }))
        }, e.prototype.getIndex = function(e, t) {
            return this.createTransaction((function(n) {
                return n.index(e).get(t)
            }))
        }, e.prototype.put = function(e) {
            return this.createTransaction((function(t) {
                return t.put(e)
            }), "readwrite")
        }, e.prototype.delete = function(e) {
            return this.createTransaction((function(t) {
                return t.delete(e)
            }), "readwrite")
        }, e.prototype.closeDatabase = function() {
            return j(this, void 0, void 0, (function() {
                return D(this, (function(e) {
                    switch (e.label) {
                        case 0:
                            return this.dbPromise ? [4, this.dbPromise] : [3, 2];
                        case 1:
                            e.sent().close(), this.dbPromise = null, e.label = 2;
                        case 2:
                            return [2]
                    }
                }))
            }))
        }, e.prototype.createTransaction = function(e, t) {
            return void 0 === t && (t = "readonly"), j(this, void 0, void 0, (function() {
                var n, r, o, i;
                return D(this, (function(a) {
                    switch (a.label) {
                        case 0:
                            return [4, this.getDb()];
                        case 1:
                            return n = a.sent(), r = n.transaction(this.objectStoreName, t), o = r.objectStore(this.objectStoreName), [4, X(e(o))];
                        case 2:
                            return i = a.sent(), [2, new Promise((function(e, t) {
                                r.oncomplete = function() {
                                    e(i)
                                }, r.onerror = function() {
                                    t(r.error)
                                }
                            }))]
                    }
                }))
            }))
        }, e.prototype.getDb = function() {
            var e = this;
            return this.dbPromise || (this.dbPromise = new Promise((function(t, n) {
                var r = indexedDB.open(e.dbName, e.dbVersion);
                r.onsuccess = function() {
                    t(r.result)
                }, r.onerror = function() {
                    e.dbPromise = null, n(r.error)
                }, r.onupgradeneeded = function(t) {
                    return e.onDbUpgrade(r, t)
                }
            }))), this.dbPromise
        }, e
    }();

    function X(e) {
        return new Promise((function(t, n) {
            e.onsuccess = function() {
                t(e.result)
            }, e.onerror = function() {
                n(e.error)
            }
        }))
    }
    var Z = function(e) {
        function t() {
            var t = null !== e && e.apply(this, arguments) || this;
            return t.dbName = "fcm_token_details_db", t.dbVersion = 3, t.objectStoreName = "fcm_token_object_Store", t
        }
        return L(t, e), t.prototype.onDbUpgrade = function(e, t) {
            var n = e.result;
            switch (t.oldVersion) {
                case 0:
                    (r = n.createObjectStore(this.objectStoreName, {
                        keyPath: "swScope"
                    })).createIndex("fcmSenderId", "fcmSenderId", {
                        unique: !1
                    }), r.createIndex("fcmToken", "fcmToken", {
                        unique: !0
                    });
                case 1:
                    J();
                case 2:
                    var r, o = (r = e.transaction.objectStore(this.objectStoreName)).openCursor();
                    o.onsuccess = function() {
                        var e = o.result;
                        if (e) {
                            var t = e.value,
                                n = P({}, t);
                            t.createTime || (n.createTime = Date.now()), "string" == typeof t.vapidKey && (n.vapidKey = $(t.vapidKey)), "string" == typeof t.auth && (n.auth = $(t.auth).buffer), "string" == typeof t.auth && (n.p256dh = $(t.p256dh).buffer), e.update(n), e.continue()
                        }
                    }
            }
        }, t.prototype.getTokenDetailsFromToken = function(e) {
            return j(this, void 0, void 0, (function() {
                return D(this, (function(t) {
                    if (!e) throw U.create("bad-token");
                    return ee({
                        fcmToken: e
                    }), [2, this.getIndex("fcmToken", e)]
                }))
            }))
        }, t.prototype.getTokenDetailsFromSWScope = function(e) {
            return j(this, void 0, void 0, (function() {
                return D(this, (function(t) {
                    if (!e) throw U.create("bad-scope");
                    return ee({
                        swScope: e
                    }), [2, this.get(e)]
                }))
            }))
        }, t.prototype.saveTokenDetails = function(e) {
            return j(this, void 0, void 0, (function() {
                return D(this, (function(t) {
                    if (!e.swScope) throw U.create("bad-scope");
                    if (!e.vapidKey) throw U.create("bad-vapid-key");
                    if (!e.endpoint || !e.auth || !e.p256dh) throw U.create("bad-subscription");
                    if (!e.fcmSenderId) throw U.create("bad-sender-id");
                    if (!e.fcmToken) throw U.create("bad-token");
                    if (!e.fcmPushSet) throw U.create("bad-push-set");
                    return ee(e), [2, this.put(e)]
                }))
            }))
        }, t.prototype.deleteToken = function(e) {
            return j(this, void 0, void 0, (function() {
                var t;
                return D(this, (function(n) {
                    switch (n.label) {
                        case 0:
                            return "string" != typeof e || 0 === e.length ? [2, Promise.reject(U.create("invalid-delete-token"))] : [4, this.getTokenDetailsFromToken(e)];
                        case 1:
                            if (!(t = n.sent())) throw U.create("delete-token-not-found");
                            return [4, this.delete(t.swScope)];
                        case 2:
                            return n.sent(), [2, t]
                    }
                }))
            }))
        }, t
    }(Q);

    function ee(e) {
        if (e.fcmToken && ("string" != typeof e.fcmToken || 0 === e.fcmToken.length)) throw U.create("bad-token");
        if (e.swScope && ("string" != typeof e.swScope || 0 === e.swScope.length)) throw U.create("bad-scope");
        if (e.vapidKey && (!(e.vapidKey instanceof Uint8Array) || 65 !== e.vapidKey.length)) throw U.create("bad-vapid-key");
        if (e.endpoint && ("string" != typeof e.endpoint || 0 === e.endpoint.length)) throw U.create("bad-subscription");
        if (e.auth && !(e.auth instanceof ArrayBuffer)) throw U.create("bad-subscription");
        if (e.p256dh && !(e.p256dh instanceof ArrayBuffer)) throw U.create("bad-subscription");
        if (e.fcmSenderId && ("string" != typeof e.fcmSenderId || 0 === e.fcmSenderId.length)) throw U.create("bad-sender-id");
        if (e.fcmPushSet && ("string" != typeof e.fcmPushSet || 0 === e.fcmPushSet.length)) throw U.create("bad-push-set")
    }
    var te = function(e) {
            function t() {
                var t = null !== e && e.apply(this, arguments) || this;
                return t.dbName = "fcm_vapid_details_db", t.dbVersion = 1, t.objectStoreName = "fcm_vapid_object_Store", t
            }
            return L(t, e), t.prototype.onDbUpgrade = function(e) {
                e.result.createObjectStore(this.objectStoreName, {
                    keyPath: "swScope"
                })
            }, t.prototype.getVapidFromSWScope = function(e) {
                return j(this, void 0, void 0, (function() {
                    var t;
                    return D(this, (function(n) {
                        switch (n.label) {
                            case 0:
                                if ("string" != typeof e || 0 === e.length) throw U.create("bad-scope");
                                return [4, this.get(e)];
                            case 1:
                                return [2, (t = n.sent()) ? t.vapidKey : void 0]
                        }
                    }))
                }))
            }, t.prototype.saveVapidDetails = function(e, t) {
                return j(this, void 0, void 0, (function() {
                    var n;
                    return D(this, (function(r) {
                        if ("string" != typeof e || 0 === e.length) throw U.create("bad-scope");
                        if (null === t || 65 !== t.length) throw U.create("bad-vapid-key");
                        return n = {
                            swScope: e,
                            vapidKey: t
                        }, [2, this.put(n)]
                    }))
                }))
            }, t.prototype.deleteVapidDetails = function(e) {
                return j(this, void 0, void 0, (function() {
                    var t;
                    return D(this, (function(n) {
                        switch (n.label) {
                            case 0:
                                return [4, this.getVapidFromSWScope(e)];
                            case 1:
                                if (!(t = n.sent())) throw U.create("delete-scope-not-found");
                                return [4, this.delete(e)];
                            case 2:
                                return n.sent(), [2, t]
                        }
                    }))
                }))
            }, t
        }(Q),
        ne = function() {
            function e(e) {
                var t = this;
                if (!e.options.messagingSenderId || "string" != typeof e.options.messagingSenderId) throw U.create("bad-sender-id");
                this.messagingSenderId = e.options.messagingSenderId, this.tokenDetailsModel = new Z, this.vapidDetailsModel = new te, this.iidModel = new Y, this.app = e, this.INTERNAL = {
                    delete: function() {
                        return t.delete()
                    }
                }
            }
            return e.prototype.getToken = function() {
                return j(this, void 0, void 0, (function() {
                    var e, t, n, r, o;
                    return D(this, (function(i) {
                        switch (i.label) {
                            case 0:
                                if ("denied" === (e = this.getNotificationPermission_())) throw U.create("notifications-blocked");
                                return "granted" !== e ? [2, null] : [4, this.getSWRegistration_()];
                            case 1:
                                return t = i.sent(), [4, this.getPublicVapidKey_()];
                            case 2:
                                return n = i.sent(), [4, this.getPushSubscription(t, n)];
                            case 3:
                                return r = i.sent(), [4, this.tokenDetailsModel.getTokenDetailsFromSWScope(t.scope)];
                            case 4:
                                return (o = i.sent()) ? [2, this.manageExistingToken(t, r, n, o)] : [2, this.getNewToken(t, r, n)]
                        }
                    }))
                }))
            }, e.prototype.manageExistingToken = function(e, t, n, r) {
                return j(this, void 0, void 0, (function() {
                    return D(this, (function(o) {
                        switch (o.label) {
                            case 0:
                                return function(e, t, n) {
                                    if (!n.vapidKey || !z(t.buffer, n.vapidKey.buffer)) return !1;
                                    var r = e.endpoint === n.endpoint,
                                        o = z(e.getKey("auth"), n.auth),
                                        i = z(e.getKey("p256dh"), n.p256dh);
                                    return r && o && i
                                }(t, n, r) ? Date.now() < r.createTime + 6048e5 ? [2, r.fcmToken] : [2, this.updateToken(e, t, n, r)] : [4, this.deleteTokenFromDB(r.fcmToken)];
                            case 1:
                                return o.sent(), [2, this.getNewToken(e, t, n)]
                        }
                    }))
                }))
            }, e.prototype.updateToken = function(e, t, n, r) {
                return j(this, void 0, void 0, (function() {
                    var o, i, a;
                    return D(this, (function(c) {
                        switch (c.label) {
                            case 0:
                                return c.trys.push([0, 4, , 6]), [4, this.iidModel.updateToken(this.messagingSenderId, r.fcmToken, r.fcmPushSet, t, n)];
                            case 1:
                                return o = c.sent(), i = {
                                    swScope: e.scope,
                                    vapidKey: n,
                                    fcmSenderId: this.messagingSenderId,
                                    fcmToken: o,
                                    fcmPushSet: r.fcmPushSet,
                                    createTime: Date.now(),
                                    endpoint: t.endpoint,
                                    auth: t.getKey("auth"),
                                    p256dh: t.getKey("p256dh")
                                }, [4, this.tokenDetailsModel.saveTokenDetails(i)];
                            case 2:
                                return c.sent(), [4, this.vapidDetailsModel.saveVapidDetails(e.scope, n)];
                            case 3:
                                return c.sent(), [2, o];
                            case 4:
                                return a = c.sent(), [4, this.deleteToken(r.fcmToken)];
                            case 5:
                                throw c.sent(), a;
                            case 6:
                                return [2]
                        }
                    }))
                }))
            }, e.prototype.getNewToken = function(e, t, n) {
                return j(this, void 0, void 0, (function() {
                    var r, o;
                    return D(this, (function(i) {
                        switch (i.label) {
                            case 0:
                                return [4, this.iidModel.getToken(this.messagingSenderId, t, n)];
                            case 1:
                                return r = i.sent(), o = {
                                    swScope: e.scope,
                                    vapidKey: n,
                                    fcmSenderId: this.messagingSenderId,
                                    fcmToken: r.token,
                                    fcmPushSet: r.pushSet,
                                    createTime: Date.now(),
                                    endpoint: t.endpoint,
                                    auth: t.getKey("auth"),
                                    p256dh: t.getKey("p256dh")
                                }, [4, this.tokenDetailsModel.saveTokenDetails(o)];
                            case 2:
                                return i.sent(), [4, this.vapidDetailsModel.saveVapidDetails(e.scope, n)];
                            case 3:
                                return i.sent(), [2, r.token]
                        }
                    }))
                }))
            }, e.prototype.deleteToken = function(e) {
                return j(this, void 0, void 0, (function() {
                    var t, n;
                    return D(this, (function(r) {
                        switch (r.label) {
                            case 0:
                                return [4, this.deleteTokenFromDB(e)];
                            case 1:
                                return r.sent(), [4, this.getSWRegistration_()];
                            case 2:
                                return (t = r.sent()) ? [4, t.pushManager.getSubscription()] : [3, 4];
                            case 3:
                                if (n = r.sent()) return [2, n.unsubscribe()];
                                r.label = 4;
                            case 4:
                                return [2, !0]
                        }
                    }))
                }))
            }, e.prototype.deleteTokenFromDB = function(e) {
                return j(this, void 0, void 0, (function() {
                    var t;
                    return D(this, (function(n) {
                        switch (n.label) {
                            case 0:
                                return [4, this.tokenDetailsModel.deleteToken(e)];
                            case 1:
                                return t = n.sent(), [4, this.iidModel.deleteToken(t.fcmSenderId, t.fcmToken, t.fcmPushSet)];
                            case 2:
                                return n.sent(), [2]
                        }
                    }))
                }))
            }, e.prototype.getPushSubscription = function(e, t) {
                return e.pushManager.getSubscription().then((function(n) {
                    return n || e.pushManager.subscribe({
                        userVisibleOnly: !0,
                        applicationServerKey: t
                    })
                }))
            }, e.prototype.requestPermission = function() {
                throw U.create("only-available-in-window")
            }, e.prototype.useServiceWorker = function(e) {
                throw U.create("only-available-in-window")
            }, e.prototype.usePublicVapidKey = function(e) {
                throw U.create("only-available-in-window")
            }, e.prototype.onMessage = function(e, t, n) {
                throw U.create("only-available-in-window")
            }, e.prototype.onTokenRefresh = function(e, t, n) {
                throw U.create("only-available-in-window")
            }, e.prototype.setBackgroundMessageHandler = function(e) {
                throw U.create("only-available-in-sw")
            }, e.prototype.delete = function() {
                return j(this, void 0, void 0, (function() {
                    return D(this, (function(e) {
                        switch (e.label) {
                            case 0:
                                return [4, Promise.all([this.tokenDetailsModel.closeDatabase(), this.vapidDetailsModel.closeDatabase()])];
                            case 1:
                                return e.sent(), [2]
                        }
                    }))
                }))
            }, e.prototype.getNotificationPermission_ = function() {
                return Notification.permission
            }, e.prototype.getTokenDetailsModel = function() {
                return this.tokenDetailsModel
            }, e.prototype.getVapidDetailsModel = function() {
                return this.vapidDetailsModel
            }, e.prototype.getIidModel = function() {
                return this.iidModel
            }, e
        }();
    var re = function(e) {
        function t(t) {
            var n = e.call(this, t) || this;
            return n.bgMessageHandler = null, self.addEventListener("push", (function(e) {
                n.onPush(e)
            })), self.addEventListener("pushsubscriptionchange", (function(e) {
                n.onSubChange(e)
            })), self.addEventListener("notificationclick", (function(e) {
                n.onNotificationClick(e)
            })), n
        }
        return L(t, e), t.prototype.onPush = function(e) {
            e.waitUntil(this.onPush_(e))
        }, t.prototype.onSubChange = function(e) {
            e.waitUntil(this.onSubChange_(e))
        }, t.prototype.onNotificationClick = function(e) {
            e.waitUntil(this.onNotificationClick_(e))
        }, t.prototype.onPush_ = function(e) {
            return j(this, void 0, void 0, (function() {
                var t, n, r, o, i, a;
                return D(this, (function(c) {
                    switch (c.label) {
                        case 0:
                            if (!e.data) return [2];
                            try {
                                t = e.data.json()
                            } catch (e) {
                                return [2]
                            }
                            return [4, this.hasVisibleClients_()];
                        case 1:
                            return c.sent() ? [2, this.sendMessageToWindowClients_(t)] : (n = this.getNotificationData_(t)) ? (r = n.title || "", [4, this.getSWRegistration_()]) : [3, 3];
                        case 2:
                            return o = c.sent(), i = n.actions, a = Notification.maxActions, i && a && i.length > a && console.warn("This browser only supports " + a + " actions.The remaining actions will not be displayed."), [2, o.showNotification(r, n)];
                        case 3:
                            return this.bgMessageHandler ? [4, this.bgMessageHandler(t)] : [3, 5];
                        case 4:
                            return c.sent(), [2];
                        case 5:
                            return [2]
                    }
                }))
            }))
        }, t.prototype.onSubChange_ = function(e) {
            return j(this, void 0, void 0, (function() {
                var e, t, n, r;
                return D(this, (function(o) {
                    switch (o.label) {
                        case 0:
                            return o.trys.push([0, 2, , 3]), [4, this.getSWRegistration_()];
                        case 1:
                            return e = o.sent(), [3, 3];
                        case 2:
                            throw t = o.sent(), U.create("unable-to-resubscribe", {
                                errorInfo: t
                            });
                        case 3:
                            return o.trys.push([3, 5, , 8]), [4, e.pushManager.getSubscription()];
                        case 4:
                            return o.sent(), [3, 8];
                        case 5:
                            return n = o.sent(), [4, this.getTokenDetailsModel().getTokenDetailsFromSWScope(e.scope)];
                        case 6:
                            if (!(r = o.sent())) throw n;
                            return [4, this.deleteToken(r.fcmToken)];
                        case 7:
                            throw o.sent(), n;
                        case 8:
                            return [2]
                    }
                }))
            }))
        }, t.prototype.onNotificationClick_ = function(e) {
            return j(this, void 0, void 0, (function() {
                var t, n, r, o;
                return D(this, (function(i) {
                    switch (i.label) {
                        case 0:
                            return e.notification && e.notification.data && e.notification.data.FCM_MSG ? e.action ? [2] : (e.stopImmediatePropagation(), e.notification.close(), (t = e.notification.data.FCM_MSG).notification && (n = t.fcmOptions && t.fcmOptions.link || t.notification.click_action) ? [4, this.getWindowClient_(n)] : [2]) : [2];
                        case 1:
                            return (r = i.sent()) ? [3, 3] : [4, self.clients.openWindow(n)];
                        case 2:
                            return r = i.sent(), [3, 5];
                        case 3:
                            return [4, r.focus()];
                        case 4:
                            r = i.sent(), i.label = 5;
                        case 5:
                            return r ? (delete t.notification, delete t.fcmOptions, o = ie(F.NOTIFICATION_CLICKED, t), [2, this.attemptToMessageClient_(r, o)]) : [2]
                    }
                }))
            }))
        }, t.prototype.getNotificationData_ = function(e) {
            var t;
            if (e && "object" == typeof e.notification) {
                var n = P({}, e.notification);
                return n.data = P({}, e.notification.data, ((t = {}).FCM_MSG = e, t)), n
            }
        }, t.prototype.setBackgroundMessageHandler = function(e) {
            if (!e || "function" != typeof e) throw U.create("bg-handler-function-expected");
            this.bgMessageHandler = e
        }, t.prototype.getWindowClient_ = function(e) {
            return j(this, void 0, void 0, (function() {
                var t, n, r, o;
                return D(this, (function(i) {
                    switch (i.label) {
                        case 0:
                            return t = new URL(e, self.location.href).href, [4, oe()];
                        case 1:
                            for (n = i.sent(), r = null, o = 0; o < n.length; o++)
                                if (new URL(n[o].url, self.location.href).href === t) {
                                    r = n[o];
                                    break
                                } return [2, r]
                    }
                }))
            }))
        }, t.prototype.attemptToMessageClient_ = function(e, t) {
            return j(this, void 0, void 0, (function() {
                return D(this, (function(n) {
                    if (!e) throw U.create("no-window-client-to-msg");
                    return e.postMessage(t), [2]
                }))
            }))
        }, t.prototype.hasVisibleClients_ = function() {
            return j(this, void 0, void 0, (function() {
                return D(this, (function(e) {
                    switch (e.label) {
                        case 0:
                            return [4, oe()];
                        case 1:
                            return [2, e.sent().some((function(e) {
                                return "visible" === e.visibilityState && !e.url.startsWith("chrome-extension://")
                            }))]
                    }
                }))
            }))
        }, t.prototype.sendMessageToWindowClients_ = function(e) {
            return j(this, void 0, void 0, (function() {
                var t, n, r = this;
                return D(this, (function(o) {
                    switch (o.label) {
                        case 0:
                            return [4, oe()];
                        case 1:
                            return t = o.sent(), n = ie(F.PUSH_MSG_RECEIVED, e), [4, Promise.all(t.map((function(e) {
                                return r.attemptToMessageClient_(e, n)
                            })))];
                        case 2:
                            return o.sent(), [2]
                    }
                }))
            }))
        }, t.prototype.getSWRegistration_ = function() {
            return j(this, void 0, void 0, (function() {
                return D(this, (function(e) {
                    return [2, self.registration]
                }))
            }))
        }, t.prototype.getPublicVapidKey_ = function() {
            return j(this, void 0, void 0, (function() {
                var e, t;
                return D(this, (function(n) {
                    switch (n.label) {
                        case 0:
                            return [4, this.getSWRegistration_()];
                        case 1:
                            if (!(e = n.sent())) throw U.create("sw-registration-expected");
                            return [4, this.getVapidDetailsModel().getVapidFromSWScope(e.scope)];
                        case 2:
                            return null == (t = n.sent()) ? [2, q] : [2, t]
                    }
                }))
            }))
        }, t
    }(ne);

    function oe() {
        return self.clients.matchAll({
            type: "window",
            includeUncontrolled: !0
        })
    }

    function ie(e, t) {
        var n;
        return (n = {})[B.TYPE_OF_MSG] = e, n[B.DATA] = t, n
    }
    var ae, ce, se = function(e) {
        function t(t) {
            var n = e.call(this, t) || this;
            return n.registrationToUse = null, n.publicVapidKeyToUse = null, n.messageObserver = null, n.tokenRefreshObserver = null, n.onMessageInternal = Object(W.createSubscribe)((function(e) {
                n.messageObserver = e
            })), n.onTokenRefreshInternal = Object(W.createSubscribe)((function(e) {
                n.tokenRefreshObserver = e
            })), n.setupSWMessageListener_(), n
        }
        return L(t, e), t.prototype.requestPermission = function() {
            return j(this, void 0, void 0, (function() {
                var e;
                return D(this, (function(t) {
                    switch (t.label) {
                        case 0:
                            return "granted" === this.getNotificationPermission_() ? [2] : [4, Notification.requestPermission()];
                        case 1:
                            if ("granted" === (e = t.sent())) return [2];
                            throw "denied" === e ? U.create("permission-blocked") : U.create("permission-default")
                    }
                }))
            }))
        }, t.prototype.useServiceWorker = function(e) {
            if (!(e instanceof ServiceWorkerRegistration)) throw U.create("sw-registration-expected");
            if (null != this.registrationToUse) throw U.create("use-sw-before-get-token");
            this.registrationToUse = e
        }, t.prototype.usePublicVapidKey = function(e) {
            if ("string" != typeof e) throw U.create("invalid-public-vapid-key");
            if (null != this.publicVapidKeyToUse) throw U.create("use-public-key-before-get-token");
            var t = $(e);
            if (65 !== t.length) throw U.create("public-vapid-key-decryption-failed");
            this.publicVapidKeyToUse = t
        }, t.prototype.onMessage = function(e, t, n) {
            return "function" == typeof e ? this.onMessageInternal(e, t, n) : this.onMessageInternal(e)
        }, t.prototype.onTokenRefresh = function(e, t, n) {
            return "function" == typeof e ? this.onTokenRefreshInternal(e, t, n) : this.onTokenRefreshInternal(e)
        }, t.prototype.waitForRegistrationToActivate_ = function(e) {
            var t = e.installing || e.waiting || e.active;
            return new Promise((function(n, r) {
                if (t)
                    if ("activated" !== t.state)
                        if ("redundant" !== t.state) {
                            var o = function() {
                                if ("activated" === t.state) n(e);
                                else {
                                    if ("redundant" !== t.state) return;
                                    r(U.create("sw-reg-redundant"))
                                }
                                t.removeEventListener("statechange", o)
                            };
                            t.addEventListener("statechange", o)
                        } else r(U.create("sw-reg-redundant"));
                else n(e);
                else r(U.create("no-sw-in-reg"))
            }))
        }, t.prototype.getSWRegistration_ = function() {
            var e = this;
            return this.registrationToUse ? this.waitForRegistrationToActivate_(this.registrationToUse) : (this.registrationToUse = null, navigator.serviceWorker.register("firebase-messaging-sw.js", {
                scope: "/firebase-cloud-messaging-push-scope"
            }).catch((function(e) {
                throw U.create("failed-serviceworker-registration", {
                    browserErrorMessage: e.message
                })
            })).then((function(t) {
                return e.waitForRegistrationToActivate_(t).then((function() {
                    return e.registrationToUse = t, t.update(), t
                }))
            })))
        }, t.prototype.getPublicVapidKey_ = function() {
            return j(this, void 0, void 0, (function() {
                return D(this, (function(e) {
                    return this.publicVapidKeyToUse ? [2, this.publicVapidKeyToUse] : [2, q]
                }))
            }))
        }, t.prototype.setupSWMessageListener_ = function() {
            var e = this;
            navigator.serviceWorker.addEventListener("message", (function(t) {
                if (t.data && t.data[B.TYPE_OF_MSG]) {
                    var n = t.data;
                    switch (n[B.TYPE_OF_MSG]) {
                        case F.PUSH_MSG_RECEIVED:
                        case F.NOTIFICATION_CLICKED:
                            var r = n[B.DATA];
                            e.messageObserver && e.messageObserver.next(r)
                    }
                }
            }), !1)
        }, t
    }(ne);

    function ue() {
        return self && "ServiceWorkerGlobalScope" in self ? "PushManager" in self && "Notification" in self && ServiceWorkerRegistration.prototype.hasOwnProperty("showNotification") && PushSubscription.prototype.hasOwnProperty("getKey") : navigator.cookieEnabled && "serviceWorker" in navigator && "PushManager" in window && "Notification" in window && "fetch" in window && ServiceWorkerRegistration.prototype.hasOwnProperty("showNotification") && PushSubscription.prototype.hasOwnProperty("getKey")
    }
    ae = I.a, ce = {
        isSupported: ue
    }, ae.INTERNAL.registerService("messaging", (function(e) {
        if (!ue()) throw U.create("unsupported-browser");
        return self && "ServiceWorkerGlobalScope" in self ? new re(e) : new se(e)
    }), ce);
    var fe, le = "BLf5bPv2GUdGEph6fSiREtsUIYyLnO6TLFT8LZJADXWTwLPCBkqknCdsSevZreiJh3Z84bMC5Dk5L6i1zjZJp3Q";
    A.a.initializeApp({
        messagingSenderId: "812079275937"
    }), A.a.messaging.isSupported() && (fe = A.a.messaging()).usePublicVapidKey(le);
    var de = n(19),
        pe = n(107);
    var he = function() {
            function e(e, t) {
                for (var n = 0; n < t.length; n++) {
                    var r = t[n];
                    r.enumerable = r.enumerable || !1, r.configurable = !0, "value" in r && (r.writable = !0), Object.defineProperty(e, r.key, r)
                }
            }
            return function(t, n, r) {
                return n && e(t.prototype, n), r && e(t, r), t
            }
        }(),
        ve = Object.assign || function(e) {
            for (var t = 1; t < arguments.length; t++) {
                var n = arguments[t];
                for (var r in n) Object.prototype.hasOwnProperty.call(n, r) && (e[r] = n[r])
            }
            return e
        },
        me = {
            container: !1,
            delay: 0,
            html: !1,
            placement: "top",
            title: "",
            template: '<div class="tooltip" role="tooltip"><div class="tooltip-arrow"></div><div class="tooltip-inner"></div></div>',
            trigger: "hover focus",
            offset: 0,
            arrowSelector: ".tooltip-arrow, .tooltip__arrow",
            innerSelector: ".tooltip-inner, .tooltip__inner"
        },
        ge = function() {
            function e(t, n) {
                ! function(e, t) {
                    if (!(e instanceof t)) throw new TypeError("Cannot call a class as a function")
                }(this, e), ye.call(this), n = ve({}, me, n), t.jquery && (t = t[0]), this.reference = t, this.options = n;
                var r = "string" == typeof n.trigger ? n.trigger.split(" ").filter((function(e) {
                    return -1 !== ["click", "hover", "focus"].indexOf(e)
                })) : [];
                this._isOpen = !1, this._popperOptions = {}, this._setEventListeners(t, r, n)
            }
            return he(e, [{
                key: "_create",
                value: function(e, t, n, r) {
                    var o = window.document.createElement("div");
                    o.innerHTML = t.trim();
                    var i = o.childNodes[0];
                    i.id = "tooltip_" + Math.random().toString(36).substr(2, 10), i.setAttribute("aria-hidden", "false");
                    var a = o.querySelector(this.options.innerSelector);
                    return this._addTitleContent(e, n, r, a), i
                }
            }, {
                key: "_addTitleContent",
                value: function(e, t, n, r) {
                    var o;
                    1 === t.nodeType || 11 === t.nodeType ? n && r.appendChild(t) : (o = t) && "[object Function]" === {}.toString.call(o) ? this._addTitleContent(e, t.call(e), n, r) : n ? r.innerHTML = t : r.textContent = t
                }
            }, {
                key: "_show",
                value: function(e, t) {
                    if (this._isOpen && !this._isOpening) return this;
                    if (this._isOpen = !0, this._tooltipNode) return this._tooltipNode.style.visibility = "visible", this._tooltipNode.setAttribute("aria-hidden", "false"), this.popperInstance.update(), this;
                    var n = e.getAttribute("title") || t.title;
                    if (!n) return this;
                    var r = this._create(e, t.template, n, t.html);
                    e.setAttribute("aria-describedby", r.id);
                    var o = this._findContainer(t.container, e);
                    return this._append(r, o), this._popperOptions = ve({}, t.popperOptions, {
                        placement: t.placement
                    }), this._popperOptions.modifiers = ve({}, this._popperOptions.modifiers, {
                        arrow: ve({}, this._popperOptions.modifiers && this._popperOptions.modifiers.arrow, {
                            element: t.arrowSelector
                        }),
                        offset: ve({}, this._popperOptions.modifiers && this._popperOptions.modifiers.offset, {
                            offset: t.offset || this._popperOptions.modifiers && this._popperOptions.modifiers.offset && this._popperOptions.modifiers.offset.offset || t.offset
                        })
                    }), t.boundariesElement && (this._popperOptions.modifiers.preventOverflow = {
                        boundariesElement: t.boundariesElement
                    }), this.popperInstance = new pe.a(e, r, this._popperOptions), this._tooltipNode = r, this
                }
            }, {
                key: "_hide",
                value: function() {
                    return this._isOpen ? (this._isOpen = !1, this._tooltipNode.style.visibility = "hidden", this._tooltipNode.setAttribute("aria-hidden", "true"), this) : this
                }
            }, {
                key: "_dispose",
                value: function() {
                    var e = this;
                    return this._events.forEach((function(t) {
                        var n = t.func,
                            r = t.event;
                        e.reference.removeEventListener(r, n)
                    })), this._events = [], this._tooltipNode && (this._hide(), this.popperInstance.destroy(), this.popperInstance.options.removeOnDestroy || (this._tooltipNode.parentNode.removeChild(this._tooltipNode), this._tooltipNode = null)), this
                }
            }, {
                key: "_findContainer",
                value: function(e, t) {
                    return "string" == typeof e ? e = window.document.querySelector(e) : !1 === e && (e = t.parentNode), e
                }
            }, {
                key: "_append",
                value: function(e, t) {
                    t.appendChild(e)
                }
            }, {
                key: "_setEventListeners",
                value: function(e, t, n) {
                    var r = this,
                        o = [],
                        i = [];
                    t.forEach((function(e) {
                        switch (e) {
                            case "hover":
                                o.push("mouseenter"), i.push("mouseleave");
                                break;
                            case "focus":
                                o.push("focus"), i.push("blur");
                                break;
                            case "click":
                                o.push("click"), i.push("click")
                        }
                    })), o.forEach((function(t) {
                        var o = function(t) {
                            !0 !== r._isOpening && (t.usedByTooltip = !0, r._scheduleShow(e, n.delay, n, t))
                        };
                        r._events.push({
                            event: t,
                            func: o
                        }), e.addEventListener(t, o)
                    })), i.forEach((function(t) {
                        var o = function(t) {
                            !0 !== t.usedByTooltip && r._scheduleHide(e, n.delay, n, t)
                        };
                        r._events.push({
                            event: t,
                            func: o
                        }), e.addEventListener(t, o), "click" === t && n.closeOnClickOutside && document.addEventListener("mousedown", (function(t) {
                            if (r._isOpening) {
                                var n = r.popperInstance.popper;
                                e.contains(t.target) || n.contains(t.target) || o(t)
                            }
                        }), !0)
                    }))
                }
            }, {
                key: "_scheduleShow",
                value: function(e, t, n) {
                    var r = this;
                    this._isOpening = !0;
                    var o = t && t.show || t || 0;
                    this._showTimeout = window.setTimeout((function() {
                        return r._show(e, n)
                    }), o)
                }
            }, {
                key: "_scheduleHide",
                value: function(e, t, n, r) {
                    var o = this;
                    this._isOpening = !1;
                    var i = t && t.hide || t || 0;
                    window.clearTimeout(this._showTimeout), window.setTimeout((function() {
                        if (!1 !== o._isOpen && document.body.contains(o._tooltipNode)) {
                            if ("mouseleave" === r.type)
                                if (o._setTooltipNodeEvent(r, e, t, n)) return;
                            o._hide(e, n)
                        }
                    }), i)
                }
            }, {
                key: "_updateTitleContent",
                value: function(e) {
                    if (void 0 !== this._tooltipNode) {
                        var t = this._tooltipNode.querySelector(this.options.innerSelector);
                        this._clearTitleContent(t, this.options.html, this.reference.getAttribute("title") || this.options.title), this._addTitleContent(this.reference, e, this.options.html, t), this.options.title = e, this.popperInstance.update()
                    } else void 0 !== this.options.title && (this.options.title = e)
                }
            }, {
                key: "_clearTitleContent",
                value: function(e, t, n) {
                    1 === n.nodeType || 11 === n.nodeType ? t && e.removeChild(n) : t ? e.innerHTML = "" : e.textContent = ""
                }
            }]), e
        }(),
        ye = function() {
            var e = this;
            this.show = function() {
                return e._show(e.reference, e.options)
            }, this.hide = function() {
                return e._hide()
            }, this.dispose = function() {
                return e._dispose()
            }, this.toggle = function() {
                return e._isOpen ? e.hide() : e.show()
            }, this.updateTitleContent = function(t) {
                return e._updateTitleContent(t)
            }, this._events = [], this._setTooltipNodeEvent = function(t, n, r, o) {
                var i = t.relatedreference || t.toElement || t.relatedTarget;
                return !!e._tooltipNode.contains(i) && (e._tooltipNode.addEventListener(t.type, (function r(i) {
                    var a = i.relatedreference || i.toElement || i.relatedTarget;
                    e._tooltipNode.removeEventListener(t.type, r), n.contains(a) || e._scheduleHide(n, o.delay, o, i)
                })), !0)
            }
        },
        be = ge;

    function we(e, t) {
        return function(e) {
            if (Array.isArray(e)) return e
        }(e) || function(e, t) {
            if ("undefined" == typeof Symbol || !(Symbol.iterator in Object(e))) return;
            var n = [],
                r = !0,
                o = !1,
                i = void 0;
            try {
                for (var a, c = e[Symbol.iterator](); !(r = (a = c.next()).done) && (n.push(a.value), !t || n.length !== t); r = !0);
            } catch (e) {
                o = !0, i = e
            } finally {
                try {
                    r || null == c.return || c.return()
                } finally {
                    if (o) throw i
                }
            }
            return n
        }(e, t) || function(e, t) {
            if (!e) return;
            if ("string" == typeof e) return _e(e, t);
            var n = Object.prototype.toString.call(e).slice(8, -1);
            "Object" === n && e.constructor && (n = e.constructor.name);
            if ("Map" === n || "Set" === n) return Array.from(e);
            if ("Arguments" === n || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _e(e, t)
        }(e, t) || function() {
            throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")
        }()
    }

    function _e(e, t) {
        (null == t || t > e.length) && (t = e.length);
        for (var n = 0, r = new Array(t); n < t; n++) r[n] = e[n];
        return r
    }

    function Se(e, t, n, r, o, i, a) {
        try {
            var c = e[i](a),
                s = c.value
        } catch (e) {
            return void n(e)
        }
        c.done ? t(s) : Promise.resolve(s).then(r, o)
    }

    function xe(e) {
        return function() {
            var t = this,
                n = arguments;
            return new Promise((function(r, o) {
                var i = e.apply(t, n);

                function a(e) {
                    Se(i, r, o, a, c, "next", e)
                }

                function c(e) {
                    Se(i, r, o, a, c, "throw", e)
                }
                a(void 0)
            }))
        }
    }
    var Ee = "action-pushed-articles-icon--granted",
        ke = "action-pushed-articles-icon--new",
        Oe = "action-pushed-articles-icon--denied";

    function Te() {
        var e = document.createElement("a"),
            t = document.createElement("div"),
            n = document.createElement("div"),
            r = document.createElement("span");
        n.classList.add("action-pushed-articles-icon"), r.classList.add("action-pushed-articles-caption"), r.textContent = "Notifications", t.classList.add("action-pushed-articles-icon-caption"), t.appendChild(n), t.appendChild(r), e.href = "#pushed-articles", e.classList.add("action-pushed-articles"), e.appendChild(t);
        var o = document.querySelector(".header__actions");
        o && o.appendChild(e), window.innerWidth <= 767 && e.addEventListener("click", (function(e) {
            e.preventDefault();
            var t = document.getElementById("pushed-articles");
            h({
                event: "notificationButtonClicked"
            }), t && t.classList.add("visible")
        }))
    }

    function Ae(e) {
        e || (e = localStorage.getItem("notificationPermission")), localStorage.setItem("notificationPermission", e), Ce(), Ie()
    }

    function Ce() {
        var e = document.querySelector(".action-pushed-articles-icon");
        e && ("enabled" === localStorage.getItem("notificationPermission") ? (Ge().then((function(t) {
            if (!t) return e.classList.remove(ke), void e.classList.add(Ee);
            0 !== t.filter((function(e) {
                return !1 === e.read
            })).length ? (e.classList.add(ke), e.classList.remove(Ee)) : (e.classList.remove(ke), e.classList.add(Ee))
        })), e.classList.add(Ee), e.classList.remove(Oe)) : (e.classList.remove(ke), e.classList.remove(Ee), e.classList.add(Oe)))
    }

    function Ie() {
        var e = document.querySelector(".notification-permission--disabled"),
            t = document.querySelector(".notification-permission--granted"),
            n = document.querySelector(".notification-permission--new"),
            r = document.querySelector(".notification-permission--denied");
        if (e && t && n && r) {
            e.hidden = !0, t.hidden = !0, n.hidden = !0, r.hidden = !0;
            var o = localStorage.getItem("notificationPermission");
            "enabled" === o ? Ge().then((function(e) {
                0 !== e.length ? n.hidden = !1 : t.hidden = !1
            })) : "disabled" === o ? e.hidden = !1 : "denied" === o && (r.hidden = !1)
        }
    }

    function Ne() {
        if (fe) {
            var e = document.querySelector("#push-notification-permission");
            fe.onTokenRefresh(xe(regeneratorRuntime.mark((function e() {
                var t;
                return regeneratorRuntime.wrap((function(e) {
                    for (;;) switch (e.prev = e.next) {
                        case 0:
                            if (void 0 !== fe) {
                                e.next = 2;
                                break
                            }
                            return e.abrupt("return");
                        case 2:
                            return e.prev = 2, e.next = 5, fe.getToken();
                        case 5:
                            if (!(t = e.sent)) {
                                e.next = 10;
                                break
                            }
                            je(t, !0), e.next = 11;
                            break;
                        case 10:
                            throw new Error("Unexpected state, refresh event but no token");
                        case 11:
                            e.next = 16;
                            break;
                        case 13:
                            e.prev = 13, e.t0 = e.catch(2), console.log("Unable to retrieve refreshed token ", e.t0);
                        case 16:
                        case "end":
                            return e.stop()
                    }
                }), e, null, [
                    [2, 13]
                ])
            }))));
            var t = "granted" === Notification.permission && "enabled" === localStorage.getItem("notificationPermission");
            if (Ae(t ? "enabled" : "disabled"), e && (e.checked = t, e.addEventListener("change", Le), document.addEventListener("visibilitychange", (function() {
                    "visible" === document.visibilityState ? We() : Ge().then((function(e) {
                        return e.filter((function(e) {
                            return !1 === e.read
                        }))
                    })).then((function(e) {
                        return $e(e)
                    })).catch((function(e) {
                        throw e
                    }))
                }))), window.innerWidth >= 768) {
                var n = document.querySelector(".action-pushed-articles-icon-caption"),
                    r = document.querySelector("#pushed-articles");
                if (!n || !r) return;
                n.addEventListener("click", (function(e) {
                    return h({
                        event: "notificationButtonClicked"
                    })
                })), new be(n, {
                    placement: "bottom-end",
                    title: r,
                    html: !0,
                    trigger: "click",
                    closeOnClickOutside: !0
                })
            }
            return e && "denied" === Notification.permission ? (e.disabled = !0, void Ae("denied")) : void 0
        }
    }

    function Le() {
        return Pe.apply(this, arguments)
    }

    function Pe() {
        return (Pe = xe(regeneratorRuntime.mark((function e() {
            return regeneratorRuntime.wrap((function(e) {
                for (;;) switch (e.prev = e.next) {
                    case 0:
                        if (localStorage.setItem("tokenSentToServer", "false"), !this.checked) {
                            e.next = 14;
                            break
                        }
                        return Ae("enabled"), h({
                            event: "notificationsSubscribed"
                        }), e.next = 6, Be();
                    case 6:
                        if (e.sent) {
                            e.next = 11;
                            break
                        }
                        return Ae("denied"), this.checked = !1, e.abrupt("return");
                    case 11:
                        h({
                            event: "notificationPermissionGranted"
                        }), e.next = 16;
                        break;
                    case 14:
                        h({
                            event: "notificationsUnsubscribed"
                        }), Ye().then(xe(regeneratorRuntime.mark((function e() {
                            var t, n;
                            return regeneratorRuntime.wrap((function(e) {
                                for (;;) switch (e.prev = e.next) {
                                    case 0:
                                        if (fe) {
                                            e.next = 2;
                                            break
                                        }
                                        return e.abrupt("return");
                                    case 2:
                                        return e.next = 4, fe.getToken();
                                    case 4:
                                        t = e.sent, (n = document.querySelector(".article-list--pushed")) && (n.innerHTML = ""), Ae("disabled"), t && De(t);
                                    case 9:
                                    case "end":
                                        return e.stop()
                                }
                            }), e)
                        })))).catch((function(e) {
                            throw e
                        }));
                    case 16:
                    case "end":
                        return e.stop()
                }
            }), e, this)
        })))).apply(this, arguments)
    }

    function je(e) {
        var t = arguments.length > 1 && void 0 !== arguments[1] && arguments[1],
            n = "https://europe-west1-pegasus-cloudfunctions.cloudfunctions.net";
        window.apos.utils.post("".concat(n, "/subscribeToPushNotifications"), {
            token: e,
            isRefresh: t
        }, (function(e, t) {
            return e ? console.error(e) : (localStorage.setItem("tokenSentToServer", "true"), t)
        }))
    }

    function De(e) {
        window.apos.utils.post("".concat("https://europe-west1-pegasus-cloudfunctions.cloudfunctions.net", "/unsubscribeFromPushNotifications"), {
            token: e
        }, (function(t, n) {
            return t || !fe ? console.error(t) : (fe.deleteToken(e).then((function(e) {
                localStorage.setItem("tokenSentToServer", "true")
            })), n)
        }))
    }

    function Me() {
        return Re.apply(this, arguments)
    }

    function Re() {
        return (Re = xe(regeneratorRuntime.mark((function e() {
            var t;
            return regeneratorRuntime.wrap((function(e) {
                for (;;) switch (e.prev = e.next) {
                    case 0:
                        if (void 0 !== fe) {
                            e.next = 2;
                            break
                        }
                        return e.abrupt("return", !1);
                    case 2:
                        return e.next = 4, fe.getToken();
                    case 4:
                        (t = e.sent) ? (je(t), console.log("Token sent to server:", t)) : console.log("No Instance ID token available. Request permission to generate one.");
                    case 6:
                    case "end":
                        return e.stop()
                }
            }), e)
        })))).apply(this, arguments)
    }

    function Be() {
        return Fe.apply(this, arguments)
    }

    function Fe() {
        return (Fe = xe(regeneratorRuntime.mark((function e() {
            return regeneratorRuntime.wrap((function(e) {
                for (;;) switch (e.prev = e.next) {
                    case 0:
                        if (void 0 !== fe) {
                            e.next = 2;
                            break
                        }
                        return e.abrupt("return");
                    case 2:
                        return h({
                            event: "notificationPermissionRequested"
                        }), e.next = 5, Notification.requestPermission();
                    case 5:
                        if ("granted" === e.sent) {
                            e.next = 10;
                            break
                        }
                        return console.log("Unable to get permission to notify."), h({
                            event: "notificationPermissionDenied"
                        }), e.abrupt("return", !1);
                    case 10:
                        return e.prev = 10, e.next = 13, Me();
                    case 13:
                        e.next = 18;
                        break;
                    case 15:
                        e.prev = 15, e.t0 = e.catch(10), console.log("An error occurred while retrieving token. ", e.t0);
                    case 18:
                        return e.abrupt("return", !0);
                    case 19:
                    case "end":
                        return e.stop()
                }
            }), e, null, [
                [10, 15]
            ])
        })))).apply(this, arguments)
    }

    function We() {
        var e = document.querySelector(".article-list--pushed");
        e && (e.innerHTML = "", "enabled" === localStorage.getItem("notificationPermission") && Ge().then((function(e) {
            if (0 !== e.length) {
                var t = document.querySelector(".article-list--pushed");
                if (null !== t) {
                    var n = e.map(Ue),
                        r = document.createDocumentFragment();
                    n.forEach((function(e) {
                        return r.appendChild(e)
                    })), t.appendChild(r)
                }
            }
        })).catch(console.log))
    }

    function He() {
        var e = document.querySelector(".offcanvas-list-action");
        null !== e && e.addEventListener("click", (function(e) {
            Ge().then((function(e) {
                return e.map((function(e) {
                    return e.read = !0, e
                }))
            })).then((function(e) {
                ! function() {
                    var e = we(document.getElementsByClassName("article-list--pushed"), 1)[0];
                    if (!e) return;
                    Array.from(e.children).forEach((function(e) {
                        e.classList.add("read")
                    }))
                }(), $e(e).then((function() {
                    Ce(), Ie()
                }))
            })).catch((function(e) {
                throw e
            }))
        }))
    }

    function Ue(e) {
        var t = document.createElement("li"),
            n = document.createElement("a");
        if (t.classList.add("article-list-item"), t.addEventListener("click", (function(n) {
                var r = e.link;
                Ge().then((function(e) {
                    return t.classList.add("read"), e.map((function(e) {
                        return r === e.link && (e.read = !0), e
                    }))
                })).then((function(e) {
                    return $e(e)
                })).catch((function(e) {
                    throw e
                }))
            })), n.href = e.link, e.image) {
            var r = document.createElement("img");
            r.src = e.image, n.appendChild(r)
        }
        e.read && t.classList.add("read");
        var o = document.createElement("h3");
        return o.textContent = e.title, n.appendChild(o), t.appendChild(n), t
    }

    function qe() {
        return Ve.apply(this, arguments)
    }

    function Ve() {
        return (Ve = xe(regeneratorRuntime.mark((function e() {
            return regeneratorRuntime.wrap((function(e) {
                for (;;) switch (e.prev = e.next) {
                    case 0:
                        if ("granted" === Notification.permission) {
                            e.next = 2;
                            break
                        }
                        return e.abrupt("return");
                    case 2:
                        navigator.serviceWorker.getRegistrations().then(function() {
                            var e = xe(regeneratorRuntime.mark((function e(t) {
                                var n, r;
                                return regeneratorRuntime.wrap((function(e) {
                                    for (;;) switch (e.prev = e.next) {
                                        case 0:
                                            if (fe && 0 !== t.length) {
                                                e.next = 2;
                                                break
                                            }
                                            return e.abrupt("return");
                                        case 2:
                                            if ("enabled" !== localStorage.getItem("notificationPermission") || "true" === localStorage.getItem("tokenSentToServer")) {
                                                e.next = 9;
                                                break
                                            }
                                            return e.next = 5, fe.getToken();
                                        case 5:
                                            return n = e.sent, e.abrupt("return", je(n));
                                        case 9:
                                            if ("disabled" !== localStorage.getItem("notificationPermission") || "true" === localStorage.getItem("tokenSentToServer")) {
                                                e.next = 14;
                                                break
                                            }
                                            return e.next = 12, fe.getToken();
                                        case 12:
                                            return r = e.sent, e.abrupt("return", De(r));
                                        case 14:
                                        case "end":
                                            return e.stop()
                                    }
                                }), e)
                            })));
                            return function(t) {
                                return e.apply(this, arguments)
                            }
                        }());
                    case 3:
                    case "end":
                        return e.stop()
                }
            }), e)
        })))).apply(this, arguments)
    }

    function ze() {
        return (ze = xe(regeneratorRuntime.mark((function e() {
            return regeneratorRuntime.wrap((function(e) {
                for (;;) switch (e.prev = e.next) {
                    case 0:
                        if (!("Notification" in window && fe && p("localStorage"))) {
                            e.next = 7;
                            break
                        }
                        return Te(), Ne(), He(), We(), e.next = 7, qe();
                    case 7:
                    case "end":
                        return e.stop()
                }
            }), e)
        })))).apply(this, arguments)
    }

    function Ke(e) {
        return de.getItem("pushedArticles").then((function(e) {
            return e ? JSON.parse(e) : []
        })).then((function(t) {
            return t.unshift(e), de.setItem("pushedArticles", JSON.stringify(t)).then((function() {
                var t, n;
                t = Ue(e), (n = document.querySelector(".article-list--pushed")) && n.prepend(t), Ce(), Ie()
            }))
        })).catch(console.error)
    }

    function Ge() {
        return de.getItem("pushedArticles").then((function(e) {
            return e ? JSON.parse(e) : []
        }))
    }

    function Ye() {
        return de.removeItem("pushedArticles")
    }

    function $e(e) {
        return de.setItem("pushedArticles", JSON.stringify(e))
    }

    function Je(e, t, n, r, o, i, a) {
        try {
            var c = e[i](a),
                s = c.value
        } catch (e) {
            return void n(e)
        }
        c.done ? t(s) : Promise.resolve(s).then(r, o)
    }

    function Qe(e) {
        return function() {
            var t = this,
                n = arguments;
            return new Promise((function(r, o) {
                var i = e.apply(t, n);

                function a(e) {
                    Je(i, r, o, a, c, "next", e)
                }

                function c(e) {
                    Je(i, r, o, a, c, "throw", e)
                }
                a(void 0)
            }))
        }
    }

    function Xe() {
        return (Xe = Qe(regeneratorRuntime.mark((function e() {
            var t;
            return regeneratorRuntime.wrap((function(e) {
                for (;;) switch (e.prev = e.next) {
                    case 0:
                        if (!("serviceWorker" in navigator)) {
                            e.next = 8;
                            break
                        }
                        return e.next = 3, navigator.serviceWorker.register("sw.js");
                    case 3:
                        if (t = e.sent, fe) {
                            e.next = 6;
                            break
                        }
                        return e.abrupt("return");
                    case 6:
                        fe.useServiceWorker(t), fe.onMessage((function(e) {
                            var t = e.data,
                                n = t.title,
                                r = t.image;
                            return Ke({
                                title: n,
                                link: e.fcmOptions.link,
                                image: r,
                                read: !1
                            })
                        }));
                    case 8:
                    case "end":
                        return e.stop()
                }
            }), e)
        })))).apply(this, arguments)
    }

    function Ze(e) {
        e.preventDefault(), window.loadDisqus();
        var t = document.querySelector("#comments");
        if (null !== t && e.target instanceof HTMLElement) {
            var n = t && "block" === t.style.display,
                r = n ? "toggleTextShow" : "toggleTextHide";
            e.target.textContent = e.target.dataset[r] || null, t.style.display = n ? "none" : "block"
        }
    }
    n(140), n(141), n(142), n(143), n(144);
    var et = window,
        tt = et.requestAnimationFrame || et.webkitRequestAnimationFrame || et.mozRequestAnimationFrame || et.msRequestAnimationFrame || function(e) {
            return setTimeout(e, 16)
        },
        nt = window,
        rt = nt.cancelAnimationFrame || nt.mozCancelAnimationFrame || function(e) {
            clearTimeout(e)
        };

    function ot() {
        for (var e, t, n, r = arguments[0] || {}, o = 1, i = arguments.length; o < i; o++)
            if (null !== (e = arguments[o]))
                for (t in e) r !== (n = e[t]) && void 0 !== n && (r[t] = n);
        return r
    }

    function it(e) {
        return ["true", "false"].indexOf(e) >= 0 ? JSON.parse(e) : e
    }

    function at(e, t, n, r) {
        if (r) try {
            e.setItem(t, n)
        } catch (e) {}
        return n
    }

    function ct() {
        var e = document,
            t = e.body;
        return t || ((t = e.createElement("body")).fake = !0), t
    }
    var st = document.documentElement;

    function ut(e) {
        var t = "";
        return e.fake && (t = st.style.overflow, e.style.background = "", e.style.overflow = st.style.overflow = "hidden", st.appendChild(e)), t
    }

    function ft(e, t) {
        e.fake && (e.remove(), st.style.overflow = t, st.offsetHeight)
    }

    function lt(e, t, n, r) {
        "insertRule" in e ? e.insertRule(t + "{" + n + "}", r) : e.addRule(t, n, r)
    }

    function dt(e) {
        return ("insertRule" in e ? e.cssRules : e.rules).length
    }

    function pt(e, t, n) {
        for (var r = 0, o = e.length; r < o; r++) t.call(n, e[r], r)
    }
    var ht = "classList" in document.createElement("_"),
        vt = ht ? function(e, t) {
            return e.classList.contains(t)
        } : function(e, t) {
            return e.className.indexOf(t) >= 0
        },
        mt = ht ? function(e, t) {
            vt(e, t) || e.classList.add(t)
        } : function(e, t) {
            vt(e, t) || (e.className += " " + t)
        },
        gt = ht ? function(e, t) {
            vt(e, t) && e.classList.remove(t)
        } : function(e, t) {
            vt(e, t) && (e.className = e.className.replace(t, ""))
        };

    function yt(e, t) {
        return e.hasAttribute(t)
    }

    function bt(e, t) {
        return e.getAttribute(t)
    }

    function wt(e) {
        return void 0 !== e.item
    }

    function _t(e, t) {
        if (e = wt(e) || e instanceof Array ? e : [e], "[object Object]" === Object.prototype.toString.call(t))
            for (var n = e.length; n--;)
                for (var r in t) e[n].setAttribute(r, t[r])
    }

    function St(e, t) {
        e = wt(e) || e instanceof Array ? e : [e];
        for (var n = (t = t instanceof Array ? t : [t]).length, r = e.length; r--;)
            for (var o = n; o--;) e[r].removeAttribute(t[o])
    }

    function xt(e) {
        for (var t = [], n = 0, r = e.length; n < r; n++) t.push(e[n]);
        return t
    }

    function Et(e, t) {
        "none" !== e.style.display && (e.style.display = "none")
    }

    function kt(e, t) {
        "none" === e.style.display && (e.style.display = "")
    }

    function Ot(e) {
        return "none" !== window.getComputedStyle(e).display
    }

    function Tt(e) {
        if ("string" == typeof e) {
            var t = [e],
                n = e.charAt(0).toUpperCase() + e.substr(1);
            ["Webkit", "Moz", "ms", "O"].forEach((function(r) {
                "ms" === r && "transform" !== e || t.push(r + n)
            })), e = t
        }
        for (var r = document.createElement("fakeelement"), o = (e.length, 0); o < e.length; o++) {
            var i = e[o];
            if (void 0 !== r.style[i]) return i
        }
        return !1
    }

    function At(e, t) {
        var n = !1;
        return /^Webkit/.test(e) ? n = "webkit" + t + "End" : /^O/.test(e) ? n = "o" + t + "End" : e && (n = t.toLowerCase() + "end"), n
    }
    var Ct = !1;
    try {
        var It = Object.defineProperty({}, "passive", {
            get: function() {
                Ct = !0
            }
        });
        window.addEventListener("test", null, It)
    } catch (e) {}
    var Nt = !!Ct && {
        passive: !0
    };

    function Lt(e, t, n) {
        for (var r in t) {
            var o = ["touchstart", "touchmove"].indexOf(r) >= 0 && !n && Nt;
            e.addEventListener(r, t[r], o)
        }
    }

    function Pt(e, t) {
        for (var n in t) {
            var r = ["touchstart", "touchmove"].indexOf(n) >= 0 && Nt;
            e.removeEventListener(n, t[n], r)
        }
    }

    function jt() {
        return {
            topics: {},
            on: function(e, t) {
                this.topics[e] = this.topics[e] || [], this.topics[e].push(t)
            },
            off: function(e, t) {
                if (this.topics[e])
                    for (var n = 0; n < this.topics[e].length; n++)
                        if (this.topics[e][n] === t) {
                            this.topics[e].splice(n, 1);
                            break
                        }
            },
            emit: function(e, t) {
                t.type = e, this.topics[e] && this.topics[e].forEach((function(n) {
                    n(t, e)
                }))
            }
        }
    }
    var Dt = function(e) {
        e = ot({
            container: ".slider",
            mode: "carousel",
            axis: "horizontal",
            items: 1,
            gutter: 0,
            edgePadding: 0,
            fixedWidth: !1,
            autoWidth: !1,
            viewportMax: !1,
            slideBy: 1,
            center: !1,
            controls: !0,
            controlsPosition: "top",
            controlsText: ["prev", "next"],
            controlsContainer: !1,
            prevButton: !1,
            nextButton: !1,
            nav: !0,
            navPosition: "top",
            navContainer: !1,
            navAsThumbnails: !1,
            arrowKeys: !1,
            speed: 300,
            autoplay: !1,
            autoplayPosition: "top",
            autoplayTimeout: 5e3,
            autoplayDirection: "forward",
            autoplayText: ["start", "stop"],
            autoplayHoverPause: !1,
            autoplayButton: !1,
            autoplayButtonOutput: !0,
            autoplayResetOnVisibility: !0,
            animateIn: "tns-fadeIn",
            animateOut: "tns-fadeOut",
            animateNormal: "tns-normal",
            animateDelay: !1,
            loop: !0,
            rewind: !1,
            autoHeight: !1,
            responsive: !1,
            lazyload: !1,
            lazyloadSelector: ".tns-lazy-img",
            touch: !0,
            mouseDrag: !1,
            swipeAngle: 15,
            nested: !1,
            preventActionWhenRunning: !1,
            preventScrollOnTouch: !1,
            freezable: !0,
            onInit: !1,
            useLocalStorage: !0
        }, e || {});
        var t = document,
            n = window,
            r = {
                ENTER: 13,
                SPACE: 32,
                LEFT: 37,
                RIGHT: 39
            },
            o = {},
            i = e.useLocalStorage;
        if (i) {
            var a = navigator.userAgent,
                c = new Date;
            try {
                (o = n.localStorage) ? (o.setItem(c, c), i = o.getItem(c) == c, o.removeItem(c)) : i = !1, i || (o = {})
            } catch (e) {
                i = !1
            }
            i && (o.tnsApp && o.tnsApp !== a && ["tC", "tPL", "tMQ", "tTf", "t3D", "tTDu", "tTDe", "tADu", "tADe", "tTE", "tAE"].forEach((function(e) {
                o.removeItem(e)
            })), localStorage.tnsApp = a)
        }
        var s = o.tC ? it(o.tC) : at(o, "tC", function() {
                var e = document,
                    t = ct(),
                    n = ut(t),
                    r = e.createElement("div"),
                    o = !1;
                t.appendChild(r);
                try {
                    for (var i, a = "(10px * 10)", c = ["calc" + a, "-moz-calc" + a, "-webkit-calc" + a], s = 0; s < 3; s++)
                        if (i = c[s], r.style.width = i, 100 === r.offsetWidth) {
                            o = i.replace(a, "");
                            break
                        }
                } catch (e) {}
                return t.fake ? ft(t, n) : r.remove(), o
            }(), i),
            u = o.tPL ? it(o.tPL) : at(o, "tPL", function() {
                var e, t = document,
                    n = ct(),
                    r = ut(n),
                    o = t.createElement("div"),
                    i = t.createElement("div"),
                    a = "";
                o.className = "tns-t-subp2", i.className = "tns-t-ct";
                for (var c = 0; c < 70; c++) a += "<div></div>";
                return i.innerHTML = a, o.appendChild(i), n.appendChild(o), e = Math.abs(o.getBoundingClientRect().left - i.children[67].getBoundingClientRect().left) < 2, n.fake ? ft(n, r) : o.remove(), e
            }(), i),
            f = o.tMQ ? it(o.tMQ) : at(o, "tMQ", function() {
                var e, t = document,
                    n = ct(),
                    r = ut(n),
                    o = t.createElement("div"),
                    i = t.createElement("style"),
                    a = "@media all and (min-width:1px){.tns-mq-test{position:absolute}}";
                return i.type = "text/css", o.className = "tns-mq-test", n.appendChild(i), n.appendChild(o), i.styleSheet ? i.styleSheet.cssText = a : i.appendChild(t.createTextNode(a)), e = window.getComputedStyle ? window.getComputedStyle(o).position : o.currentStyle.position, n.fake ? ft(n, r) : o.remove(), "absolute" === e
            }(), i),
            l = o.tTf ? it(o.tTf) : at(o, "tTf", Tt("transform"), i),
            d = o.t3D ? it(o.t3D) : at(o, "t3D", function(e) {
                if (!e) return !1;
                if (!window.getComputedStyle) return !1;
                var t, n = document,
                    r = ct(),
                    o = ut(r),
                    i = n.createElement("p"),
                    a = e.length > 9 ? "-" + e.slice(0, -9).toLowerCase() + "-" : "";
                return a += "transform", r.insertBefore(i, null), i.style[e] = "translate3d(1px,1px,1px)", t = window.getComputedStyle(i).getPropertyValue(a), r.fake ? ft(r, o) : i.remove(), void 0 !== t && t.length > 0 && "none" !== t
            }(l), i),
            p = o.tTDu ? it(o.tTDu) : at(o, "tTDu", Tt("transitionDuration"), i),
            h = o.tTDe ? it(o.tTDe) : at(o, "tTDe", Tt("transitionDelay"), i),
            v = o.tADu ? it(o.tADu) : at(o, "tADu", Tt("animationDuration"), i),
            m = o.tADe ? it(o.tADe) : at(o, "tADe", Tt("animationDelay"), i),
            g = o.tTE ? it(o.tTE) : at(o, "tTE", At(p, "Transition"), i),
            y = o.tAE ? it(o.tAE) : at(o, "tAE", At(v, "Animation"), i),
            b = n.console && "function" == typeof n.console.warn,
            w = ["container", "controlsContainer", "prevButton", "nextButton", "navContainer", "autoplayButton"],
            _ = {};
        if (w.forEach((function(n) {
                if ("string" == typeof e[n]) {
                    var r = e[n],
                        o = t.querySelector(r);
                    if (_[n] = r, !o || !o.nodeName) return void(b && console.warn("Can't find", e[n]));
                    e[n] = o
                }
            })), !(e.container.children.length < 1)) {
            var S = e.responsive,
                x = e.nested,
                E = "carousel" === e.mode;
            if (S) {
                0 in S && (e = ot(e, S[0]), delete S[0]);
                var k = {};
                for (var O in S) {
                    var T = S[O];
                    T = "number" == typeof T ? {
                        items: T
                    } : T, k[O] = T
                }
                S = k, k = null
            }
            if (E || function e(t) {
                    for (var n in t) E || ("slideBy" === n && (t[n] = "page"), "edgePadding" === n && (t[n] = !1), "autoHeight" === n && (t[n] = !1)), "responsive" === n && e(t[n])
                }(e), !E) {
                e.axis = "horizontal", e.slideBy = "page", e.edgePadding = !1;
                var A = e.animateIn,
                    C = e.animateOut,
                    I = e.animateDelay,
                    N = e.animateNormal
            }
            var L, P, j = "horizontal" === e.axis,
                D = t.createElement("div"),
                M = t.createElement("div"),
                R = e.container,
                B = R.parentNode,
                F = R.outerHTML,
                W = R.children,
                H = W.length,
                U = In(),
                q = !1;
            S && Jn(), E && (R.className += " tns-vpfix");
            var V, z, K, G, Y, $, J, Q, X = e.autoWidth,
                Z = jn("fixedWidth"),
                ee = jn("edgePadding"),
                te = jn("gutter"),
                ne = Ln(),
                re = jn("center"),
                oe = X ? 1 : Math.floor(jn("items")),
                ie = jn("slideBy"),
                ae = e.viewportMax || e.fixedWidthViewportWidth,
                ce = jn("arrowKeys"),
                se = jn("speed"),
                ue = e.rewind,
                fe = !ue && e.loop,
                le = jn("autoHeight"),
                de = jn("controls"),
                pe = jn("controlsText"),
                he = jn("nav"),
                ve = jn("touch"),
                me = jn("mouseDrag"),
                ge = jn("autoplay"),
                ye = jn("autoplayTimeout"),
                be = jn("autoplayText"),
                we = jn("autoplayHoverPause"),
                _e = jn("autoplayResetOnVisibility"),
                Se = (Q = document.createElement("style"), J && Q.setAttribute("media", J), document.querySelector("head").appendChild(Q), Q.sheet ? Q.sheet : Q.styleSheet),
                xe = e.lazyload,
                Ee = (e.lazyloadSelector, []),
                ke = fe ? (Y = function() {
                    if (X || Z && !ae) return H - 1;
                    var t = Z ? "fixedWidth" : "items",
                        n = [];
                    if ((Z || e[t] < H) && n.push(e[t]), S)
                        for (var r in S) {
                            var o = S[r][t];
                            o && (Z || o < H) && n.push(o)
                        }
                    return n.length || n.push(0), Math.ceil(Z ? ae / Math.min.apply(null, n) : Math.max.apply(null, n))
                }(), $ = E ? Math.ceil((5 * Y - H) / 2) : 4 * Y - H, $ = Math.max(Y, $), Pn("edgePadding") ? $ + 1 : $) : 0,
                Oe = E ? H + 2 * ke : H + ke,
                Te = !(!Z && !X || fe),
                Ae = Z ? xr() : null,
                Ce = !E || !fe,
                Ie = j ? "left" : "top",
                Ne = "",
                Le = "",
                Pe = Z ? function() {
                    return re && !fe ? H - 1 : Math.ceil(-Ae / (Z + te))
                } : X ? function() {
                    for (var e = Oe; e--;)
                        if (V[e] >= -Ae) return e
                } : function() {
                    return re && E && !fe ? H - 1 : fe || E ? Math.max(0, Oe - Math.ceil(oe)) : Oe - 1
                },
                je = Tn(jn("startIndex")),
                De = je,
                Me = (On(), 0),
                Re = X ? null : Pe(),
                Be = e.preventActionWhenRunning,
                Fe = e.swipeAngle,
                We = !Fe || "?",
                He = !1,
                Ue = e.onInit,
                qe = new jt,
                Ve = " tns-slider tns-" + e.mode,
                ze = R.id || (G = window.tnsId, window.tnsId = G ? G + 1 : 1, "tns" + window.tnsId),
                Ke = jn("disable"),
                Ge = !1,
                Ye = e.freezable,
                $e = !(!Ye || X) && $n(),
                Je = !1,
                Qe = {
                    click: Lr,
                    keydown: function(e) {
                        e = Wr(e);
                        var t = [r.LEFT, r.RIGHT].indexOf(e.keyCode);
                        t >= 0 && (0 === t ? Kt.disabled || Lr(e, -1) : Gt.disabled || Lr(e, 1))
                    }
                },
                Xe = {
                    click: function(e) {
                        if (He) {
                            if (Be) return;
                            Ir()
                        }
                        var t = Hr(e = Wr(e));
                        for (; t !== Qt && !yt(t, "data-nav");) t = t.parentNode;
                        if (yt(t, "data-nav")) {
                            var n = tn = Number(bt(t, "data-nav")),
                                r = Z || X ? n * H / Zt : n * oe;
                            Nr(It ? n : Math.min(Math.ceil(r), H - 1), e), nn === n && (un && Rr(), tn = -1)
                        }
                    },
                    keydown: function(e) {
                        e = Wr(e);
                        var n = t.activeElement;
                        if (!yt(n, "data-nav")) return;
                        var o = [r.LEFT, r.RIGHT, r.ENTER, r.SPACE].indexOf(e.keyCode),
                            i = Number(bt(n, "data-nav"));
                        o >= 0 && (0 === o ? i > 0 && Fr(Jt[i - 1]) : 1 === o ? i < Zt - 1 && Fr(Jt[i + 1]) : (tn = i, Nr(i, e)))
                    }
                },
                Ze = {
                    mouseover: function() {
                        un && (jr(), fn = !0)
                    },
                    mouseout: function() {
                        fn && (Pr(), fn = !1)
                    }
                },
                et = {
                    visibilitychange: function() {
                        t.hidden ? un && (jr(), dn = !0) : dn && (Pr(), dn = !1)
                    }
                },
                nt = {
                    keydown: function(e) {
                        e = Wr(e);
                        var t = [r.LEFT, r.RIGHT].indexOf(e.keyCode);
                        t >= 0 && Lr(e, 0 === t ? -1 : 1)
                    }
                },
                st = {
                    touchstart: zr,
                    touchmove: Kr,
                    touchend: Gr,
                    touchcancel: Gr
                },
                ht = {
                    mousedown: zr,
                    mousemove: Kr,
                    mouseup: Gr,
                    mouseleave: Gr
                },
                wt = Pn("controls"),
                Ct = Pn("nav"),
                It = !!X || e.navAsThumbnails,
                Nt = Pn("autoplay"),
                Mt = Pn("touch"),
                Rt = Pn("mouseDrag"),
                Bt = "tns-slide-active",
                Ft = "tns-complete",
                Wt = {
                    load: function(e) {
                        ir(Hr(e))
                    },
                    error: function(e) {
                        t = Hr(e), mt(t, "failed"), ar(t);
                        var t
                    }
                },
                Ht = "force" === e.preventScrollOnTouch;
            if (wt) var Ut, qt, Vt = e.controlsContainer,
                zt = e.controlsContainer ? e.controlsContainer.outerHTML : "",
                Kt = e.prevButton,
                Gt = e.nextButton,
                Yt = e.prevButton ? e.prevButton.outerHTML : "",
                $t = e.nextButton ? e.nextButton.outerHTML : "";
            if (Ct) var Jt, Qt = e.navContainer,
                Xt = e.navContainer ? e.navContainer.outerHTML : "",
                Zt = X ? H : $r(),
                en = 0,
                tn = -1,
                nn = Cn(),
                rn = nn,
                on = "tns-nav-active",
                an = "Carousel Page ",
                cn = " (Current Slide)";
            if (Nt) var sn, un, fn, ln, dn, pn = "forward" === e.autoplayDirection ? 1 : -1,
                hn = e.autoplayButton,
                vn = e.autoplayButton ? e.autoplayButton.outerHTML : "",
                mn = ["<span class='tns-visually-hidden'>", " animation</span>"];
            if (Mt || Rt) var gn, yn, bn = {},
                wn = {},
                _n = !1,
                Sn = j ? function(e, t) {
                    return e.x - t.x
                } : function(e, t) {
                    return e.y - t.y
                };
            X || kn(Ke || $e), l && (Ie = l, Ne = "translate", d ? (Ne += j ? "3d(" : "3d(0px, ", Le = j ? ", 0px, 0px)" : ", 0px)") : (Ne += j ? "X(" : "Y(", Le = ")")), E && (R.className = R.className.replace("tns-vpfix", "")),
                function() {
                    Pn("gutter");
                    D.className = "tns-outer", M.className = "tns-inner", D.id = ze + "-ow", M.id = ze + "-iw", "" === R.id && (R.id = ze);
                    Ve += u || X ? " tns-subpixel" : " tns-no-subpixel", Ve += s ? " tns-calc" : " tns-no-calc", X && (Ve += " tns-autowidth");
                    Ve += " tns-" + e.axis, R.className += Ve, E ? ((L = t.createElement("div")).id = ze + "-mw", L.className = "tns-ovh", D.appendChild(L), L.appendChild(M)) : D.appendChild(M);
                    if (le) {
                        (L || M).className += " tns-ah"
                    }
                    if (B.insertBefore(D, R), M.appendChild(R), pt(W, (function(e, t) {
                            mt(e, "tns-item"), e.id || (e.id = ze + "-item" + t), !E && N && mt(e, N), _t(e, {
                                "aria-hidden": "true",
                                tabindex: "-1"
                            })
                        })), ke) {
                        for (var n = t.createDocumentFragment(), r = t.createDocumentFragment(), o = ke; o--;) {
                            var i = o % H,
                                a = W[i].cloneNode(!0);
                            if (St(a, "id"), r.insertBefore(a, r.firstChild), E) {
                                var c = W[H - 1 - i].cloneNode(!0);
                                St(c, "id"), n.appendChild(c)
                            }
                        }
                        R.insertBefore(n, R.firstChild), R.appendChild(r), W = R.children
                    }
                }(),
                function() {
                    if (!E)
                        for (var t = je, r = je + Math.min(H, oe); t < r; t++) {
                            var o = W[t];
                            o.style.left = 100 * (t - je) / oe + "%", mt(o, A), gt(o, N)
                        }
                    j && (u || X ? (lt(Se, "#" + ze + " > .tns-item", "font-size:" + n.getComputedStyle(W[0]).fontSize + ";", dt(Se)), lt(Se, "#" + ze, "font-size:0;", dt(Se))) : E && pt(W, (function(e, t) {
                        e.style.marginLeft = function(e) {
                            return s ? s + "(" + 100 * e + "% / " + Oe + ")" : 100 * e / Oe + "%"
                        }(t)
                    })));
                    if (f) {
                        if (p) {
                            var i = L && e.autoHeight ? Wn(e.speed) : "";
                            lt(Se, "#" + ze + "-mw", i, dt(Se))
                        }
                        i = Dn(e.edgePadding, e.gutter, e.fixedWidth, e.speed, e.autoHeight), lt(Se, "#" + ze + "-iw", i, dt(Se)), E && (i = j && !X ? "width:" + Mn(e.fixedWidth, e.gutter, e.items) + ";" : "", p && (i += Wn(se)), lt(Se, "#" + ze, i, dt(Se))), i = j && !X ? Rn(e.fixedWidth, e.gutter, e.items) : "", e.gutter && (i += Bn(e.gutter)), E || (p && (i += Wn(se)), v && (i += Hn(se))), i && lt(Se, "#" + ze + " > .tns-item", i, dt(Se))
                    } else {
                        lr(), M.style.cssText = Dn(ee, te, Z, le), E && j && !X && (R.style.width = Mn(Z, te, oe));
                        i = j && !X ? Rn(Z, te, oe) : "";
                        te && (i += Bn(te)), i && lt(Se, "#" + ze + " > .tns-item", i, dt(Se))
                    }
                    if (S && f)
                        for (var a in S) {
                            a = parseInt(a);
                            var c = S[a],
                                l = (i = "", ""),
                                d = "",
                                h = "",
                                m = "",
                                g = X ? null : jn("items", a),
                                y = jn("fixedWidth", a),
                                b = jn("speed", a),
                                w = jn("edgePadding", a),
                                _ = jn("autoHeight", a),
                                x = jn("gutter", a);
                            p && L && jn("autoHeight", a) && "speed" in c && (l = "#" + ze + "-mw{" + Wn(b) + "}"), ("edgePadding" in c || "gutter" in c) && (d = "#" + ze + "-iw{" + Dn(w, x, y, b, _) + "}"), E && j && !X && ("fixedWidth" in c || "items" in c || Z && "gutter" in c) && (h = "width:" + Mn(y, x, g) + ";"), p && "speed" in c && (h += Wn(b)), h && (h = "#" + ze + "{" + h + "}"), ("fixedWidth" in c || Z && "gutter" in c || !E && "items" in c) && (m += Rn(y, x, g)), "gutter" in c && (m += Bn(x)), !E && "speed" in c && (p && (m += Wn(b)), v && (m += Hn(b))), m && (m = "#" + ze + " > .tns-item{" + m + "}"), (i = l + d + h + m) && Se.insertRule("@media (min-width: " + a / 16 + "em) {" + i + "}", Se.cssRules.length)
                        }
                }(), Un();
            var xn = fe ? E ? function() {
                    var e = Me,
                        t = Re;
                    e += ie, t -= ie, ee ? (e += 1, t -= 1) : Z && (ne + te) % (Z + te) && (t -= 1), ke && (je > t ? je -= H : je < e && (je += H))
                } : function() {
                    if (je > Re)
                        for (; je >= Me + H;) je -= H;
                    else if (je < Me)
                        for (; je <= Re - H;) je += H
                } : function() {
                    je = Math.max(Me, Math.min(Re, je))
                },
                En = E ? function() {
                    var e, t, n, r, o, i, a, c, s, u, f;
                    _r(R, ""), p || !se ? (Or(), se && Ot(R) || Ir()) : (e = R, t = Ie, n = Ne, r = Le, o = Er(), i = se, a = Ir, c = Math.min(i, 10), s = o.indexOf("%") >= 0 ? "%" : "px", o = o.replace(s, ""), u = Number(e.style[t].replace(n, "").replace(r, "").replace(s, "")), f = (o - u) / i * c, setTimeout((function o() {
                        i -= c, u += f, e.style[t] = n + u + s + r, i > 0 ? setTimeout(o, c) : a()
                    }), c)), j || Yr()
                } : function() {
                    Ee = [];
                    var e = {};
                    e[g] = e[y] = Ir, Pt(W[De], e), Lt(W[je], e), Tr(De, A, C, !0), Tr(je, N, A), g && y && se && Ot(R) || Ir()
                };
            return {
                version: "2.9.2",
                getInfo: Qr,
                events: qe,
                goTo: Nr,
                play: function() {
                    ge && !un && (Mr(), ln = !1)
                },
                pause: function() {
                    un && (Rr(), ln = !0)
                },
                isOn: q,
                updateSliderHeight: pr,
                refresh: Un,
                destroy: function() {
                    if (Se.disabled = !0, Se.ownerNode && Se.ownerNode.remove(), Pt(n, {
                            resize: Gn
                        }), ce && Pt(t, nt), Vt && Pt(Vt, Qe), Qt && Pt(Qt, Xe), Pt(R, Ze), Pt(R, et), hn && Pt(hn, {
                            click: Br
                        }), ge && clearInterval(sn), E && g) {
                        var r = {};
                        r[g] = Ir, Pt(R, r)
                    }
                    ve && Pt(R, st), me && Pt(R, ht);
                    var o = [F, zt, Yt, $t, Xt, vn];
                    for (var i in w.forEach((function(t, n) {
                            var r = "container" === t ? D : e[t];
                            if ("object" == typeof r) {
                                var i = !!r.previousElementSibling && r.previousElementSibling,
                                    a = r.parentNode;
                                r.outerHTML = o[n], e[t] = i ? i.nextElementSibling : a.firstElementChild
                            }
                        })), w = A = C = I = N = j = D = M = R = B = F = W = H = P = U = X = Z = ee = te = ne = oe = ie = ae = ce = se = ue = fe = le = Se = xe = V = Ee = ke = Oe = Te = Ae = Ce = Ie = Ne = Le = Pe = je = De = Me = Re = Fe = We = He = Ue = qe = Ve = ze = Ke = Ge = Ye = $e = Je = Qe = Xe = Ze = et = nt = st = ht = wt = Ct = It = Nt = Mt = Rt = Bt = Ft = Wt = z = de = pe = Vt = zt = Kt = Gt = Ut = qt = he = Qt = Xt = Jt = Zt = en = tn = nn = rn = on = an = cn = ge = ye = pn = be = we = hn = vn = _e = mn = sn = un = fn = ln = dn = bn = wn = gn = _n = yn = Sn = ve = me = null, this) "rebuild" !== i && (this[i] = null);
                    q = !1
                },
                rebuild: function() {
                    return Dt(ot(e, _))
                }
            }
        }

        function kn(e) {
            e && (de = he = ve = me = ce = ge = we = _e = !1)
        }

        function On() {
            for (var e = E ? je - ke : je; e < 0;) e += H;
            return e % H + 1
        }

        function Tn(e) {
            return e = e ? Math.max(0, Math.min(fe ? H - 1 : H - oe, e)) : 0, E ? e + ke : e
        }

        function An(e) {
            for (null == e && (e = je), E && (e -= ke); e < 0;) e += H;
            return Math.floor(e % H)
        }

        function Cn() {
            var e, t = An();
            return e = It ? t : Z || X ? Math.ceil((t + 1) * Zt / H - 1) : Math.floor(t / oe), !fe && E && je === Re && (e = Zt - 1), e
        }

        function In() {
            return n.innerWidth || t.documentElement.clientWidth || t.body.clientWidth
        }

        function Nn(e) {
            return "top" === e ? "afterbegin" : "beforeend"
        }

        function Ln() {
            var e = ee ? 2 * ee - te : 0;
            return function e(n) {
                var r, o, i = t.createElement("div");
                return n.appendChild(i), o = (r = i.getBoundingClientRect()).right - r.left, i.remove(), o || e(n.parentNode)
            }(B) - e
        }

        function Pn(t) {
            if (e[t]) return !0;
            if (S)
                for (var n in S)
                    if (S[n][t]) return !0;
            return !1
        }

        function jn(t, n) {
            if (null == n && (n = U), "items" === t && Z) return Math.floor((ne + te) / (Z + te)) || 1;
            var r = e[t];
            if (S)
                for (var o in S) n >= parseInt(o) && t in S[o] && (r = S[o][t]);
            return "slideBy" === t && "page" === r && (r = jn("items")), E || "slideBy" !== t && "items" !== t || (r = Math.floor(r)), r
        }

        function Dn(e, t, n, r, o) {
            var i = "";
            if (void 0 !== e) {
                var a = e;
                t && (a -= t), i = j ? "margin: 0 " + a + "px 0 " + e + "px;" : "margin: " + e + "px 0 " + a + "px 0;"
            } else if (t && !n) {
                var c = "-" + t + "px";
                i = "margin: 0 " + (j ? c + " 0 0" : "0 " + c + " 0") + ";"
            }
            return !E && o && p && r && (i += Wn(r)), i
        }

        function Mn(e, t, n) {
            return e ? (e + t) * Oe + "px" : s ? s + "(" + 100 * Oe + "% / " + n + ")" : 100 * Oe / n + "%"
        }

        function Rn(e, t, n) {
            var r;
            if (e) r = e + t + "px";
            else {
                E || (n = Math.floor(n));
                var o = E ? Oe : n;
                r = s ? s + "(100% / " + o + ")" : 100 / o + "%"
            }
            return r = "width:" + r, "inner" !== x ? r + ";" : r + " !important;"
        }

        function Bn(e) {
            var t = "";
            !1 !== e && (t = (j ? "padding-" : "margin-") + (j ? "right" : "bottom") + ": " + e + "px;");
            return t
        }

        function Fn(e, t) {
            var n = e.substring(0, e.length - t).toLowerCase();
            return n && (n = "-" + n + "-"), n
        }

        function Wn(e) {
            return Fn(p, 18) + "transition-duration:" + e / 1e3 + "s;"
        }

        function Hn(e) {
            return Fn(v, 17) + "animation-duration:" + e / 1e3 + "s;"
        }

        function Un() {
            if (Pn("autoHeight") || X || !j) {
                var e = R.querySelectorAll("img");
                pt(e, (function(e) {
                    var t = e.src;
                    t && t.indexOf("data:image") < 0 ? (Lt(e, Wt), e.src = "", e.src = t, mt(e, "loading")) : xe || ir(e)
                })), tt((function() {
                    ur(xt(e), (function() {
                        z = !0
                    }))
                })), !X && j && (e = cr(je, Math.min(je + oe - 1, Oe - 1))), xe ? qn() : tt((function() {
                    ur(xt(e), qn)
                }))
            } else E && kr(), zn(), Kn()
        }

        function qn() {
            if (X) {
                var e = fe ? je : H - 1;
                ! function t() {
                    W[e - 1].getBoundingClientRect().right.toFixed(2) === W[e].getBoundingClientRect().left.toFixed(2) ? Vn() : setTimeout((function() {
                        t()
                    }), 16)
                }()
            } else Vn()
        }

        function Vn() {
            j && !X || (hr(), X ? (Ae = xr(), Ye && ($e = $n()), Re = Pe(), kn(Ke || $e)) : Yr()), E && kr(), zn(), Kn()
        }

        function zn() {
            if (vr(), D.insertAdjacentHTML("afterbegin", '<div class="tns-liveregion tns-visually-hidden" aria-live="polite" aria-atomic="true">slide <span class="current">' + nr() + "</span>  of " + H + "</div>"), K = D.querySelector(".tns-liveregion .current"), Nt) {
                var t = ge ? "stop" : "start";
                hn ? _t(hn, {
                    "data-action": t
                }) : e.autoplayButtonOutput && (D.insertAdjacentHTML(Nn(e.autoplayPosition), '<button data-action="' + t + '">' + mn[0] + t + mn[1] + be[0] + "</button>"), hn = D.querySelector("[data-action]")), hn && Lt(hn, {
                    click: Br
                }), ge && (Mr(), we && Lt(R, Ze), _e && Lt(R, et))
            }
            if (Ct) {
                if (Qt) _t(Qt, {
                    "aria-label": "Carousel Pagination"
                }), pt(Jt = Qt.children, (function(e, t) {
                    _t(e, {
                        "data-nav": t,
                        tabindex: "-1",
                        "aria-label": an + (t + 1),
                        "aria-controls": ze
                    })
                }));
                else {
                    for (var n = "", r = It ? "" : 'style="display:none"', o = 0; o < H; o++) n += '<button data-nav="' + o + '" tabindex="-1" aria-controls="' + ze + '" ' + r + ' aria-label="' + an + (o + 1) + '"></button>';
                    n = '<div class="tns-nav" aria-label="Carousel Pagination">' + n + "</div>", D.insertAdjacentHTML(Nn(e.navPosition), n), Qt = D.querySelector(".tns-nav"), Jt = Qt.children
                }
                if (Jr(), p) {
                    var i = p.substring(0, p.length - 18).toLowerCase(),
                        a = "transition: all " + se / 1e3 + "s";
                    i && (a = "-" + i + "-" + a), lt(Se, "[aria-controls^=" + ze + "-item]", a, dt(Se))
                }
                _t(Jt[nn], {
                    "aria-label": an + (nn + 1) + cn
                }), St(Jt[nn], "tabindex"), mt(Jt[nn], on), Lt(Qt, Xe)
            }
            wt && (Vt || Kt && Gt || (D.insertAdjacentHTML(Nn(e.controlsPosition), '<div class="tns-controls" aria-label="Carousel Navigation" tabindex="0"><button data-controls="prev" tabindex="-1" aria-controls="' + ze + '">' + pe[0] + '</button><button data-controls="next" tabindex="-1" aria-controls="' + ze + '">' + pe[1] + "</button></div>"), Vt = D.querySelector(".tns-controls")), Kt && Gt || (Kt = Vt.children[0], Gt = Vt.children[1]), e.controlsContainer && _t(Vt, {
                "aria-label": "Carousel Navigation",
                tabindex: "0"
            }), (e.controlsContainer || e.prevButton && e.nextButton) && _t([Kt, Gt], {
                "aria-controls": ze,
                tabindex: "-1"
            }), (e.controlsContainer || e.prevButton && e.nextButton) && (_t(Kt, {
                "data-controls": "prev"
            }), _t(Gt, {
                "data-controls": "next"
            })), Ut = gr(Kt), qt = gr(Gt), wr(), Vt ? Lt(Vt, Qe) : (Lt(Kt, Qe), Lt(Gt, Qe))), Qn()
        }

        function Kn() {
            if (E && g) {
                var r = {};
                r[g] = Ir, Lt(R, r)
            }
            ve && Lt(R, st, e.preventScrollOnTouch), me && Lt(R, ht), ce && Lt(t, nt), "inner" === x ? qe.on("outerResized", (function() {
                Yn(), qe.emit("innerLoaded", Qr())
            })) : (S || Z || X || le || !j) && Lt(n, {
                resize: Gn
            }), le && ("outer" === x ? qe.on("innerLoaded", sr) : Ke || sr()), or(), Ke ? er() : $e && Zn(), qe.on("indexChanged", fr), "inner" === x && qe.emit("innerLoaded", Qr()), "function" == typeof Ue && Ue(Qr()), q = !0
        }

        function Gn(e) {
            tt((function() {
                Yn(Wr(e))
            }))
        }

        function Yn(n) {
            if (q) {
                "outer" === x && qe.emit("outerResized", Qr(n)), U = In();
                var r, o = P,
                    i = !1;
                S && (Jn(), (r = o !== P) && qe.emit("newBreakpointStart", Qr(n)));
                var a, c, s = oe,
                    u = Ke,
                    l = $e,
                    d = ce,
                    p = de,
                    h = he,
                    v = ve,
                    m = me,
                    g = ge,
                    y = we,
                    b = _e,
                    w = je;
                if (r) {
                    var _ = Z,
                        k = le,
                        O = pe,
                        T = re,
                        I = be;
                    if (!f) var L = te,
                        D = ee
                }
                if (ce = jn("arrowKeys"), de = jn("controls"), he = jn("nav"), ve = jn("touch"), re = jn("center"), me = jn("mouseDrag"), ge = jn("autoplay"), we = jn("autoplayHoverPause"), _e = jn("autoplayResetOnVisibility"), r && (Ke = jn("disable"), Z = jn("fixedWidth"), se = jn("speed"), le = jn("autoHeight"), pe = jn("controlsText"), be = jn("autoplayText"), ye = jn("autoplayTimeout"), f || (ee = jn("edgePadding"), te = jn("gutter"))), kn(Ke), ne = Ln(), j && !X || Ke || (hr(), j || (Yr(), i = !0)), (Z || X) && (Ae = xr(), Re = Pe()), (r || Z) && (oe = jn("items"), ie = jn("slideBy"), (c = oe !== s) && (Z || X || (Re = Pe()), xn())), r && Ke !== u && (Ke ? er() : function() {
                        if (!Ge) return;
                        if (Se.disabled = !1, R.className += Ve, kr(), fe)
                            for (var e = ke; e--;) E && kt(W[e]), kt(W[Oe - e - 1]);
                        if (!E)
                            for (var t = je, n = je + H; t < n; t++) {
                                var r = W[t],
                                    o = t < je + oe ? A : N;
                                r.style.left = 100 * (t - je) / oe + "%", mt(r, o)
                            }
                        Xn(), Ge = !1
                    }()), Ye && (r || Z || X) && ($e = $n()) !== l && ($e ? (Or(Er(Tn(0))), Zn()) : (! function() {
                        if (!Je) return;
                        ee && f && (M.style.margin = "");
                        if (ke)
                            for (var e = "tns-transparent", t = ke; t--;) E && gt(W[t], e), gt(W[Oe - t - 1], e);
                        Xn(), Je = !1
                    }(), i = !0)), kn(Ke || $e), ge || (we = _e = !1), ce !== d && (ce ? Lt(t, nt) : Pt(t, nt)), de !== p && (de ? Vt ? kt(Vt) : (Kt && kt(Kt), Gt && kt(Gt)) : Vt ? Et(Vt) : (Kt && Et(Kt), Gt && Et(Gt))), he !== h && (he ? kt(Qt) : Et(Qt)), ve !== v && (ve ? Lt(R, st, e.preventScrollOnTouch) : Pt(R, st)), me !== m && (me ? Lt(R, ht) : Pt(R, ht)), ge !== g && (ge ? (hn && kt(hn), un || ln || Mr()) : (hn && Et(hn), un && Rr())), we !== y && (we ? Lt(R, Ze) : Pt(R, Ze)), _e !== b && (_e ? Lt(t, et) : Pt(t, et)), r) {
                    if (Z === _ && re === T || (i = !0), le !== k && (le || (M.style.height = "")), de && pe !== O && (Kt.innerHTML = pe[0], Gt.innerHTML = pe[1]), hn && be !== I) {
                        var B = ge ? 1 : 0,
                            F = hn.innerHTML,
                            V = F.length - I[B].length;
                        F.substring(V) === I[B] && (hn.innerHTML = F.substring(0, V) + be[B])
                    }
                } else re && (Z || X) && (i = !0);
                if ((c || Z && !X) && (Zt = $r(), Jr()), (a = je !== w) ? (qe.emit("indexChanged", Qr()), i = !0) : c ? a || fr() : (Z || X) && (or(), vr(), tr()), c && !E && function() {
                        for (var e = je + Math.min(H, oe), t = Oe; t--;) {
                            var n = W[t];
                            t >= je && t < e ? (mt(n, "tns-moving"), n.style.left = 100 * (t - je) / oe + "%", mt(n, A), gt(n, N)) : n.style.left && (n.style.left = "", mt(n, N), gt(n, A)), gt(n, C)
                        }
                        setTimeout((function() {
                            pt(W, (function(e) {
                                gt(e, "tns-moving")
                            }))
                        }), 300)
                    }(), !Ke && !$e) {
                    if (r && !f && (le === autoheightTem && se === speedTem || lr(), ee === D && te === L || (M.style.cssText = Dn(ee, te, Z, se, le)), j)) {
                        E && (R.style.width = Mn(Z, te, oe));
                        var z = Rn(Z, te, oe) + Bn(te);
                        ! function(e, t) {
                            "deleteRule" in e ? e.deleteRule(t) : e.removeRule(t)
                        }(Se, dt(Se) - 1), lt(Se, "#" + ze + " > .tns-item", z, dt(Se))
                    }
                    le && sr(), i && (kr(), De = je)
                }
                r && qe.emit("newBreakpointEnd", Qr(n))
            }
        }

        function $n() {
            if (!Z && !X) return H <= (re ? oe - (oe - 1) / 2 : oe);
            var e = Z ? (Z + te) * H : V[H],
                t = ee ? ne + 2 * ee : ne + te;
            return re && (t -= Z ? (ne - Z) / 2 : (ne - (V[je + 1] - V[je] - te)) / 2), e <= t
        }

        function Jn() {
            for (var e in P = 0, S) e = parseInt(e), U >= e && (P = e)
        }

        function Qn() {
            !ge && hn && Et(hn), !he && Qt && Et(Qt), de || (Vt ? Et(Vt) : (Kt && Et(Kt), Gt && Et(Gt)))
        }

        function Xn() {
            ge && hn && kt(hn), he && Qt && kt(Qt), de && (Vt ? kt(Vt) : (Kt && kt(Kt), Gt && kt(Gt)))
        }

        function Zn() {
            if (!Je) {
                if (ee && (M.style.margin = "0px"), ke)
                    for (var e = "tns-transparent", t = ke; t--;) E && mt(W[t], e), mt(W[Oe - t - 1], e);
                Qn(), Je = !0
            }
        }

        function er() {
            if (!Ge) {
                if (Se.disabled = !0, R.className = R.className.replace(Ve.substring(1), ""), St(R, ["style"]), fe)
                    for (var e = ke; e--;) E && Et(W[e]), Et(W[Oe - e - 1]);
                if (j && E || St(M, ["style"]), !E)
                    for (var t = je, n = je + H; t < n; t++) {
                        var r = W[t];
                        St(r, ["style"]), gt(r, A), gt(r, N)
                    }
                Qn(), Ge = !0
            }
        }

        function tr() {
            var e = nr();
            K.innerHTML !== e && (K.innerHTML = e)
        }

        function nr() {
            var e = rr(),
                t = e[0] + 1,
                n = e[1] + 1;
            return t === n ? t + "" : t + " to " + n
        }

        function rr(e) {
            null == e && (e = Er());
            var t, n, r, o = je;
            if (re || ee ? (X || Z) && (n = -(parseFloat(e) + ee), r = n + ne + 2 * ee) : X && (n = V[je], r = n + ne), X) V.forEach((function(e, i) {
                i < Oe && ((re || ee) && e <= n + .5 && (o = i), r - e >= .5 && (t = i))
            }));
            else {
                if (Z) {
                    var i = Z + te;
                    re || ee ? (o = Math.floor(n / i), t = Math.ceil(r / i - 1)) : t = o + Math.ceil(ne / i) - 1
                } else if (re || ee) {
                    var a = oe - 1;
                    if (re ? (o -= a / 2, t = je + a / 2) : t = je + a, ee) {
                        var c = ee * oe / ne;
                        o -= c, t += c
                    }
                    o = Math.floor(o), t = Math.ceil(t)
                } else t = o + oe - 1;
                o = Math.max(o, 0), t = Math.min(t, Oe - 1)
            }
            return [o, t]
        }

        function or() {
            xe && !Ke && cr.apply(null, rr()).forEach((function(e) {
                if (!vt(e, Ft)) {
                    var t = {};
                    t[g] = function(e) {
                        e.stopPropagation()
                    }, Lt(e, t), Lt(e, Wt), e.src = bt(e, "data-src");
                    var n = bt(e, "data-srcset");
                    n && (e.srcset = n), mt(e, "loading")
                }
            }))
        }

        function ir(e) {
            mt(e, "loaded"), ar(e)
        }

        function ar(e) {
            mt(e, "tns-complete"), gt(e, "loading"), Pt(e, Wt)
        }

        function cr(e, t) {
            for (var n = []; e <= t;) pt(W[e].querySelectorAll("img"), (function(e) {
                n.push(e)
            })), e++;
            return n
        }

        function sr() {
            var e = cr.apply(null, rr());
            tt((function() {
                ur(e, pr)
            }))
        }

        function ur(e, t) {
            return z ? t() : (e.forEach((function(t, n) {
                vt(t, Ft) && e.splice(n, 1)
            })), e.length ? void tt((function() {
                ur(e, t)
            })) : t())
        }

        function fr() {
            or(), vr(), tr(), wr(),
                function() {
                    if (he && (nn = tn >= 0 ? tn : Cn(), tn = -1, nn !== rn)) {
                        var e = Jt[rn],
                            t = Jt[nn];
                        _t(e, {
                            tabindex: "-1",
                            "aria-label": an + (rn + 1)
                        }), gt(e, on), _t(t, {
                            "aria-label": an + (nn + 1) + cn
                        }), St(t, "tabindex"), mt(t, on), rn = nn
                    }
                }()
        }

        function lr() {
            E && le && (L.style[p] = se / 1e3 + "s")
        }

        function dr(e, t) {
            for (var n = [], r = e, o = Math.min(e + t, Oe); r < o; r++) n.push(W[r].offsetHeight);
            return Math.max.apply(null, n)
        }

        function pr() {
            var e = le ? dr(je, oe) : dr(ke, H),
                t = L || M;
            t.style.height !== e && (t.style.height = e + "px")
        }

        function hr() {
            V = [0];
            var e = j ? "left" : "top",
                t = j ? "right" : "bottom",
                n = W[0].getBoundingClientRect()[e];
            pt(W, (function(r, o) {
                o && V.push(r.getBoundingClientRect()[e] - n), o === Oe - 1 && V.push(r.getBoundingClientRect()[t] - n)
            }))
        }

        function vr() {
            var e = rr(),
                t = e[0],
                n = e[1];
            pt(W, (function(e, r) {
                r >= t && r <= n ? yt(e, "aria-hidden") && (St(e, ["aria-hidden", "tabindex"]), mt(e, Bt)) : yt(e, "aria-hidden") || (_t(e, {
                    "aria-hidden": "true",
                    tabindex: "-1"
                }), gt(e, Bt))
            }))
        }

        function mr(e) {
            return e.nodeName.toLowerCase()
        }

        function gr(e) {
            return "button" === mr(e)
        }

        function yr(e) {
            return "true" === e.getAttribute("aria-disabled")
        }

        function br(e, t, n) {
            e ? t.disabled = n : t.setAttribute("aria-disabled", n.toString())
        }

        function wr() {
            if (de && !ue && !fe) {
                var e = Ut ? Kt.disabled : yr(Kt),
                    t = qt ? Gt.disabled : yr(Gt),
                    n = je <= Me,
                    r = !ue && je >= Re;
                n && !e && br(Ut, Kt, !0), !n && e && br(Ut, Kt, !1), r && !t && br(qt, Gt, !0), !r && t && br(qt, Gt, !1)
            }
        }

        function _r(e, t) {
            p && (e.style[p] = t)
        }

        function Sr(e) {
            return null == e && (e = je), X ? (ne - (ee ? te : 0) - (V[e + 1] - V[e] - te)) / 2 : Z ? (ne - Z) / 2 : (oe - 1) / 2
        }

        function xr() {
            var e = ne + (ee ? te : 0) - (Z ? (Z + te) * Oe : V[Oe]);
            return re && !fe && (e = Z ? -(Z + te) * (Oe - 1) - Sr() : Sr(Oe - 1) - V[Oe - 1]), e > 0 && (e = 0), e
        }

        function Er(e) {
            var t;
            if (null == e && (e = je), j && !X)
                if (Z) t = -(Z + te) * e, re && (t += Sr());
                else {
                    var n = l ? Oe : oe;
                    re && (e -= Sr()), t = 100 * -e / n
                }
            else t = -V[e], re && X && (t += Sr());
            return Te && (t = Math.max(t, Ae)), t += !j || X || Z ? "px" : "%"
        }

        function kr(e) {
            _r(R, "0s"), Or(e)
        }

        function Or(e) {
            null == e && (e = Er()), R.style[Ie] = Ne + e + Le
        }

        function Tr(e, t, n, r) {
            var o = e + oe;
            fe || (o = Math.min(o, Oe));
            for (var i = e; i < o; i++) {
                var a = W[i];
                r || (a.style.left = 100 * (i - je) / oe + "%"), I && h && (a.style[h] = a.style[m] = I * (i - e) / 1e3 + "s"), gt(a, t), mt(a, n), r && Ee.push(a)
            }
        }

        function Ar(e, t) {
            Ce && xn(), (je !== De || t) && (qe.emit("indexChanged", Qr()), qe.emit("transitionStart", Qr()), le && sr(), un && e && ["click", "keydown"].indexOf(e.type) >= 0 && Rr(), He = !0, En())
        }

        function Cr(e) {
            return e.toLowerCase().replace(/-/g, "")
        }

        function Ir(e) {
            if (E || He) {
                if (qe.emit("transitionEnd", Qr(e)), !E && Ee.length > 0)
                    for (var t = 0; t < Ee.length; t++) {
                        var n = Ee[t];
                        n.style.left = "", m && h && (n.style[m] = "", n.style[h] = ""), gt(n, C), mt(n, N)
                    }
                if (!e || !E && e.target.parentNode === R || e.target === R && Cr(e.propertyName) === Cr(Ie)) {
                    if (!Ce) {
                        var r = je;
                        xn(), je !== r && (qe.emit("indexChanged", Qr()), kr())
                    }
                    "inner" === x && qe.emit("innerLoaded", Qr()), He = !1, De = je
                }
            }
        }

        function Nr(e, t) {
            if (!$e)
                if ("prev" === e) Lr(t, -1);
                else if ("next" === e) Lr(t, 1);
            else {
                if (He) {
                    if (Be) return;
                    Ir()
                }
                var n = An(),
                    r = 0;
                if ("first" === e ? r = -n : "last" === e ? r = E ? H - oe - n : H - 1 - n : ("number" != typeof e && (e = parseInt(e)), isNaN(e) || (t || (e = Math.max(0, Math.min(H - 1, e))), r = e - n)), !E && r && Math.abs(r) < oe) {
                    var o = r > 0 ? 1 : -1;
                    r += je + r - H >= Me ? H * o : 2 * H * o * -1
                }
                je += r, E && fe && (je < Me && (je += H), je > Re && (je -= H)), An(je) !== An(De) && Ar(t)
            }
        }

        function Lr(e, t) {
            if (He) {
                if (Be) return;
                Ir()
            }
            var n;
            if (!t) {
                for (var r = Hr(e = Wr(e)); r !== Vt && [Kt, Gt].indexOf(r) < 0;) r = r.parentNode;
                var o = [Kt, Gt].indexOf(r);
                o >= 0 && (n = !0, t = 0 === o ? -1 : 1)
            }
            if (ue) {
                if (je === Me && -1 === t) return void Nr("last", e);
                if (je === Re && 1 === t) return void Nr("first", e)
            }
            t && (je += ie * t, X && (je = Math.floor(je)), Ar(n || e && "keydown" === e.type ? e : null))
        }

        function Pr() {
            sn = setInterval((function() {
                Lr(null, pn)
            }), ye), un = !0
        }

        function jr() {
            clearInterval(sn), un = !1
        }

        function Dr(e, t) {
            _t(hn, {
                "data-action": e
            }), hn.innerHTML = mn[0] + e + mn[1] + t
        }

        function Mr() {
            Pr(), hn && Dr("stop", be[1])
        }

        function Rr() {
            jr(), hn && Dr("start", be[0])
        }

        function Br() {
            un ? (Rr(), ln = !0) : (Mr(), ln = !1)
        }

        function Fr(e) {
            e.focus()
        }

        function Wr(e) {
            return Ur(e = e || n.event) ? e.changedTouches[0] : e
        }

        function Hr(e) {
            return e.target || n.event.srcElement
        }

        function Ur(e) {
            return e.type.indexOf("touch") >= 0
        }

        function qr(e) {
            e.preventDefault ? e.preventDefault() : e.returnValue = !1
        }

        function Vr() {
            return i = wn.y - bn.y, a = wn.x - bn.x, t = Math.atan2(i, a) * (180 / Math.PI), n = Fe, r = !1, (o = Math.abs(90 - Math.abs(t))) >= 90 - n ? r = "horizontal" : o <= n && (r = "vertical"), r === e.axis;
            var t, n, r, o, i, a
        }

        function zr(e) {
            if (He) {
                if (Be) return;
                Ir()
            }
            ge && un && jr(), _n = !0, yn && (rt(yn), yn = null);
            var t = Wr(e);
            qe.emit(Ur(e) ? "touchStart" : "dragStart", Qr(e)), !Ur(e) && ["img", "a"].indexOf(mr(Hr(e))) >= 0 && qr(e), wn.x = bn.x = t.clientX, wn.y = bn.y = t.clientY, E && (gn = parseFloat(R.style[Ie].replace(Ne, "")), _r(R, "0s"))
        }

        function Kr(e) {
            if (_n) {
                var t = Wr(e);
                wn.x = t.clientX, wn.y = t.clientY, E ? yn || (yn = tt((function() {
                    ! function e(t) {
                        if (!We) return void(_n = !1);
                        rt(yn), _n && (yn = tt((function() {
                            e(t)
                        })));
                        "?" === We && (We = Vr());
                        if (We) {
                            !Ht && Ur(t) && (Ht = !0);
                            try {
                                t.type && qe.emit(Ur(t) ? "touchMove" : "dragMove", Qr(t))
                            } catch (e) {}
                            var n = gn,
                                r = Sn(wn, bn);
                            if (!j || Z || X) n += r, n += "px";
                            else n += l ? r * oe * 100 / ((ne + te) * Oe) : 100 * r / (ne + te), n += "%";
                            R.style[Ie] = Ne + n + Le
                        }
                    }(e)
                }))) : ("?" === We && (We = Vr()), We && (Ht = !0)), Ht && e.preventDefault()
            }
        }

        function Gr(t) {
            if (_n) {
                yn && (rt(yn), yn = null), E && _r(R, ""), _n = !1;
                var n = Wr(t);
                wn.x = n.clientX, wn.y = n.clientY;
                var r = Sn(wn, bn);
                if (Math.abs(r)) {
                    if (!Ur(t)) {
                        var o = Hr(t);
                        Lt(o, {
                            click: function e(t) {
                                qr(t), Pt(o, {
                                    click: e
                                })
                            }
                        })
                    }
                    E ? yn = tt((function() {
                        if (j && !X) {
                            var e = -r * oe / (ne + te);
                            e = r > 0 ? Math.floor(e) : Math.ceil(e), je += e
                        } else {
                            var n = -(gn + r);
                            if (n <= 0) je = Me;
                            else if (n >= V[Oe - 1]) je = Re;
                            else
                                for (var o = 0; o < Oe && n >= V[o];) je = o, n > V[o] && r < 0 && (je += 1), o++
                        }
                        Ar(t, r), qe.emit(Ur(t) ? "touchEnd" : "dragEnd", Qr(t))
                    })) : We && Lr(t, r > 0 ? -1 : 1)
                }
            }
            "auto" === e.preventScrollOnTouch && (Ht = !1), Fe && (We = "?"), ge && !un && Pr()
        }

        function Yr() {
            (L || M).style.height = V[je + oe] - V[je] + "px"
        }

        function $r() {
            var e = Z ? (Z + te) * H / ne : H / oe;
            return Math.min(Math.ceil(e), H)
        }

        function Jr() {
            if (he && !It && Zt !== en) {
                var e = en,
                    t = Zt,
                    n = kt;
                for (en > Zt && (e = Zt, t = en, n = Et); e < t;) n(Jt[e]), e++;
                en = Zt
            }
        }

        function Qr(e) {
            return {
                container: R,
                slideItems: W,
                navContainer: Qt,
                navItems: Jt,
                controlsContainer: Vt,
                hasControls: wt,
                prevButton: Kt,
                nextButton: Gt,
                items: oe,
                slideBy: ie,
                cloneCount: ke,
                slideCount: H,
                slideCountNew: Oe,
                index: je,
                indexCached: De,
                displayIndex: On(),
                navCurrentIndex: nn,
                navCurrentIndexCached: rn,
                pages: Zt,
                pagesCached: en,
                sheet: Se,
                isOn: q,
                event: e || {}
            }
        }
        b && console.warn("No slides found in", e.container)
    };

    function Mt(e, t) {
        var n = Object.keys(e);
        if (Object.getOwnPropertySymbols) {
            var r = Object.getOwnPropertySymbols(e);
            t && (r = r.filter((function(t) {
                return Object.getOwnPropertyDescriptor(e, t).enumerable
            }))), n.push.apply(n, r)
        }
        return n
    }

    function Rt(e) {
        for (var t = 1; t < arguments.length; t++) {
            var n = null != arguments[t] ? arguments[t] : {};
            t % 2 ? Mt(Object(n), !0).forEach((function(t) {
                Bt(e, t, n[t])
            })) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(n)) : Mt(Object(n)).forEach((function(t) {
                Object.defineProperty(e, t, Object.getOwnPropertyDescriptor(n, t))
            }))
        }
        return e
    }

    function Bt(e, t, n) {
        return t in e ? Object.defineProperty(e, t, {
            value: n,
            enumerable: !0,
            configurable: !0,
            writable: !0
        }) : e[t] = n, e
    }

    function Ft(e) {
        return function(e) {
            if (Array.isArray(e)) return Wt(e)
        }(e) || function(e) {
            if ("undefined" != typeof Symbol && Symbol.iterator in Object(e)) return Array.from(e)
        }(e) || function(e, t) {
            if (!e) return;
            if ("string" == typeof e) return Wt(e, t);
            var n = Object.prototype.toString.call(e).slice(8, -1);
            "Object" === n && e.constructor && (n = e.constructor.name);
            if ("Map" === n || "Set" === n) return Array.from(e);
            if ("Arguments" === n || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return Wt(e, t)
        }(e) || function() {
            throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")
        }()
    }

    function Wt(e, t) {
        (null == t || t > e.length) && (t = e.length);
        for (var n = 0, r = new Array(t); n < t; n++) r[n] = e[n];
        return r
    }
    var Ht = c()(".lozad", {
        rootMargin: "50% 0px 50% 0px",
        enableAutoReload: !0
    });
    window.apos.utils.onReady((function() {
        ! function() {
            Xe.apply(this, arguments)
        }(), Ht.observe(), d(),
            function() {
                var e = 0;

                function t() {
                    document.documentElement.classList.add("is-backscroll")
                }

                function n() {
                    document.documentElement.classList.remove("is-backscroll")
                }
                window.requestAnimationFrame && window.addEventListener("scroll", (function() {
                    var r = window.pageYOffset;
                    r <= e || r < 0 ? requestAnimationFrame(t) : requestAnimationFrame(n), e = Math.max(r, 0)
                }))
            }(),
            function() {
                ze.apply(this, arguments)
            }(), O(), v(),
            function() {
                if ("function" == typeof window.loadDisqus) {
                    var e = document.querySelector(".toggle__comments__button .toggle__button");
                    e ? e.addEventListener("click", Ze) : window.loadDisqus()
                }
            }(),
            function() {
                var e = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : document.documentElement,
                    t = e,
                    n = t.getElementsByClassName("article__content-inner"),
                    r = t.getElementsByClassName("banderole-items"),
                    o = t.getElementsByClassName("banderole-nav"),
                    i = t.getElementsByClassName("banderole-controls"),
                    a = t.getElementsByClassName("slider"),
                    c = Ft(a).filter((function(e) {
                        return "banderole" === e.parentNode.className
                    })),
                    s = t.getElementsByClassName("sz-box-items"),
                    u = t.getElementsByClassName("sz-box-nav"),
                    f = t.getElementsByClassName("prev"),
                    l = t.getElementsByClassName("next"),
                    d = {
                        lazyload: !1,
                        items: 1,
                        speed: 400,
                        loop: !1,
                        swipeAngle: !1,
                        gutter: 20
                    };

                function p() {
                    var e = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : "",
                        t = arguments.length > 1 ? arguments[1] : void 0,
                        r = arguments.length > 2 ? arguments[2] : void 0;
                    return "desktop" === e ? 0 !== n.length ? {
                        edgePadding: 0,
                        fixedWidth: 200
                    } : 4 === r ? (t.classList.add("margin-for-4-element-banderole"), {
                        fixedWidth: 234
                    }) : {
                        edgePadding: 40,
                        fixedWidth: 234
                    } : 0 !== n.length ? {
                        edgePadding: 0,
                        fixedWidth: 200
                    } : {
                        edgePadding: 30,
                        fixedWidth: 234
                    }
                }
                for (var h = 0; h < o.length; h++) {
                    Dt(Rt(Rt(Rt({}, d), {}, {
                        container: r[h],
                        navContainer: o[h],
                        controlsContainer: i[h]
                    }, p()), {}, {
                        responsive: {
                            1280: Rt({
                                items: 4,
                                slideBy: 4
                            }, p("desktop", c[h], o[h].childElementCount)),
                            768: {
                                items: 2,
                                slideBy: 2
                            }
                        }
                    }));
                    var v = o[h].getBoundingClientRect().width,
                        m = f[h].getBoundingClientRect().width,
                        g = l[h].getBoundingClientRect().width;
                    i[h].style.width = "".concat(v + m + g, "px")
                }
                for (var y = 0; y < u.length; y++) Dt(Rt(Rt({}, d), {}, {
                    container: s[y],
                    navContainer: u[y],
                    controls: !1,
                    edgePadding: 30,
                    fixedWidth: 280,
                    responsive: {
                        1280: {
                            items: 4,
                            slideBy: 4,
                            edgePadding: 0
                        },
                        768: {
                            items: 2,
                            slideBy: 2,
                            edgePadding: 0,
                            fixedWidth: 250
                        }
                    }
                }))
            }(), Array.from(document.querySelectorAll("[data-slideshow-items]")).forEach((function(e) {
                Dt({
                    autoHeight: !0,
                    container: e,
                    controlsText: ["❮", "❯"],
                    items: 1,
                    nav: !1,
                    swipeAngle: !1,
                    speed: 400
                })
            }))
    }))
}]);
