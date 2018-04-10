function adjustHeight() {
    var t = $(".left-part").outerHeight();
    $(".right-part").outerHeight() < t && $(".right-part").css("min-height", t + "px")
}

function nextStep(t) {
    "step2" == t && 3 == $(".token-sale .step1 .checkbox input:checked").length && ($(".steps.step1").addClass("disabled"), $(".steps.step2").removeClass("disabled")), "step3" == t && 2 == $(".token-sale .step2 .checkbox input:checked").length && updateGivingWallet()
}

function show_easter_egg() {
    $(".easter_egg .cta").slideUp("fast"), $(".easter_egg .details").slideDown("fast")
}

function hideEverything() {
    $(".easter_egg .details").slideUp("fast"), $.ajax({method: "GET", url: "/show-address"}).done(function (t) {
        $(".right-part .address_data").html('<h4><a href="http://www.etherscan.io/address/' + t.address + '" target="_blank">' + t.domain + "</a></h4><h6>" + t.address + "</h6>")
    })
}

function updateGivingWallet() {
    var t = $(".wallet-address").val();
    $(".wallet-address").attr("disabled", !0), $.ajax({
        method: "POST",
        url: "/update-wallet",
        data: {contributor: {wallet_address: t}}
    }).done(function (t) {
        $(".wallet-address").attr("disabled", !1), setTimeout(function () {
            $("#current-contributor-progress .step2 small").fadeOut("normal", function () {
                $("#current-contributor-progress .step2 small").addClass("hide")
            })
        }, 3e3), t.status && ($("#current-contributor-progress .step2 small.success").fadeIn().removeClass("hide"), $(".steps.step2").addClass("disabled"), $(".steps.step3").removeClass("disabled")), t.status || $("#current-contributor-progress .step2 small.fail").fadeIn().removeClass("hide")
    })
}

function updateWallet() {
    var t = $(".wallet-address").val();
    $(".wallet-address").attr("disabled", !0), $.ajax({
        method: "POST",
        url: "/update-wallet",
        data: {contributor: {wallet_address: t}}
    }).done(function (t) {
        $(".wallet-address").attr("disabled", !1), t.status && $("#current-contributor-progress small.success").fadeIn().removeClass("hide"), t.status || $("#current-contributor-progress small.fail").fadeIn().removeClass("hide"), setTimeout(function () {
            $("#current-contributor-progress small").fadeOut("normal", function () {
                $("#current-contributor-progress small").addClass("hide")
            }), window.location.reload()
        }, 2e3)
    })
}

function parse_query_string(t) {
    for (var e = t.split("&"), n = {}, i = 0; i < e.length; i++) {
        var o = e[i].split("=");
        if ("undefined" == typeof n[o[0]]) n[o[0]] = decodeURIComponent(o[1]); else if ("string" == typeof n[o[0]]) {
            var s = [n[o[0]], decodeURIComponent(o[1])];
            n[o[0]] = s
        } else n[o[0]].push(decodeURIComponent(o[1]))
    }
    return n
}

(function () {
    (function () {
        (function () {
            this.Rails = {
                linkClickSelector: "a[data-confirm], a[data-method], a[data-remote]:not([disabled]), a[data-disable-with], a[data-disable]",
                buttonClickSelector: {
                    selector: "button[data-remote]:not([form]), button[data-confirm]:not([form])",
                    exclude: "form button"
                },
                inputChangeSelector: "select[data-remote], input[data-remote], textarea[data-remote]",
                formSubmitSelector: "form",
                formInputClickSelector: "form input[type=submit], form input[type=image], form button[type=submit], form button:not([type]), input[type=submit][form], input[type=image][form], button[type=submit][form], button[form]:not([type])",
                formDisableSelector: "input[data-disable-with]:enabled, button[data-disable-with]:enabled, textarea[data-disable-with]:enabled, input[data-disable]:enabled, button[data-disable]:enabled, textarea[data-disable]:enabled",
                formEnableSelector: "input[data-disable-with]:disabled, button[data-disable-with]:disabled, textarea[data-disable-with]:disabled, input[data-disable]:disabled, button[data-disable]:disabled, textarea[data-disable]:disabled",
                fileInputSelector: "input[name][type=file]:not([disabled])",
                linkDisableSelector: "a[data-disable-with], a[data-disable]",
                buttonDisableSelector: "button[data-remote][data-disable-with], button[data-remote][data-disable]"
            }
        }).call(this)
    }).call(this);
    var t = this.Rails;
    (function () {
        (function () {
            var e, n;
            n = Element.prototype.matches || Element.prototype.matchesSelector || Element.prototype.mozMatchesSelector || Element.prototype.msMatchesSelector || Element.prototype.oMatchesSelector || Element.prototype.webkitMatchesSelector, t.matches = function (t, e) {
                return null != e.exclude ? n.call(t, e.selector) && !n.call(t, e.exclude) : n.call(t, e)
            }, e = "_ujsData", t.getData = function (t, n) {
                var i;
                return null != (i = t[e]) ? i[n] : void 0
            }, t.setData = function (t, n, i) {
                return null == t[e] && (t[e] = {}), t[e][n] = i
            }, t.$ = function (t) {
                return Array.prototype.slice.call(document.querySelectorAll(t))
            }
        }).call(this), function () {
            var e, n, i;
            e = t.$, i = t.csrfToken = function () {
                var t;
                return (t = document.querySelector("meta[name=csrf-token]")) && t.content
            }, n = t.csrfParam = function () {
                var t;
                return (t = document.querySelector("meta[name=csrf-param]")) && t.content
            }, t.CSRFProtection = function (t) {
                var e;
                if (null != (e = i())) return t.setRequestHeader("X-CSRF-Token", e)
            }, t.refreshCSRFTokens = function () {
                var t, o;
                if (o = i(), t = n(), null != o && null != t) return e('form input[name="' + t + '"]').forEach(function (t) {
                    return t.value = o
                })
            }
        }.call(this), function () {
            var e, n, i;
            i = t.matches, e = window.CustomEvent, "function" != typeof e && (e = function (t, e) {
                var n;
                return n = document.createEvent("CustomEvent"), n.initCustomEvent(t, e.bubbles, e.cancelable, e.detail), n
            }, e.prototype = window.Event.prototype), n = t.fire = function (t, n, i) {
                var o;
                return o = new e(n, {bubbles: !0, cancelable: !0, detail: i}), t.dispatchEvent(o), !o.defaultPrevented
            }, t.stopEverything = function (t) {
                return n(t.target, "ujs:everythingStopped"), t.preventDefault(), t.stopPropagation(), t.stopImmediatePropagation()
            }, t.delegate = function (t, e, n, o) {
                return t.addEventListener(n, function (t) {
                    var n;
                    for (n = t.target; n instanceof Element && !i(n, e);) n = n.parentNode;
                    if (n instanceof Element && !1 === o.call(n, t)) return t.preventDefault(), t.stopPropagation()
                })
            }
        }.call(this), function () {
            var e, n, i, o, s, a;
            n = t.CSRFProtection, o = t.fire, e = {
                "*": "*/*",
                text: "text/plain",
                html: "text/html",
                xml: "application/xml, text/xml",
                json: "application/json, text/javascript",
                script: "text/javascript, application/javascript, application/ecmascript, application/x-ecmascript"
            }, t.ajax = function (t) {
                var e;
                return t = s(t), e = i(t, function () {
                    var n;
                    return n = a(e.response, e.getResponseHeader("Content-Type")), 2 === Math.floor(e.status / 100) ? "function" == typeof t.success && t.success(n, e.statusText, e) : "function" == typeof t.error && t.error(n, e.statusText, e), "function" == typeof t.complete ? t.complete(e, e.statusText) : void 0
                }), "function" == typeof t.beforeSend && t.beforeSend(e, t), e.readyState === XMLHttpRequest.OPENED ? e.send(t.data) : o(document, "ajaxStop")
            }, s = function (t) {
                return t.url = t.url || location.href, t.type = t.type.toUpperCase(), "GET" === t.type && t.data && (t.url.indexOf("?") < 0 ? t.url += "?" + t.data : t.url += "&" + t.data), null == e[t.dataType] && (t.dataType = "*"), t.accept = e[t.dataType], "*" !== t.dataType && (t.accept += ", */*; q=0.01"), t
            }, i = function (t, e) {
                var i;
                return i = new XMLHttpRequest, i.open(t.type, t.url, !0), i.setRequestHeader("Accept", t.accept), "string" == typeof t.data && i.setRequestHeader("Content-Type", "application/x-www-form-urlencoded; charset=UTF-8"), t.crossDomain || i.setRequestHeader("X-Requested-With", "XMLHttpRequest"), n(i), i.withCredentials = !!t.withCredentials, i.onreadystatechange = function () {
                    if (i.readyState === XMLHttpRequest.DONE) return e(i)
                }, i
            }, a = function (t, e) {
                var n, i;
                if ("string" == typeof t && "string" == typeof e) if (e.match(/\bjson\b/)) try {
                    t = JSON.parse(t)
                } catch (t) {
                } else if (e.match(/\b(?:java|ecma)script\b/)) i = document.createElement("script"), i.text = t, document.head.appendChild(i).parentNode.removeChild(i); else if (e.match(/\b(xml|html|svg)\b/)) {
                    n = new DOMParser, e = e.replace(/;.+/, "");
                    try {
                        t = n.parseFromString(t, e)
                    } catch (t) {
                    }
                }
                return t
            }, t.href = function (t) {
                return t.href
            }, t.isCrossDomain = function (t) {
                var e, n;
                e = document.createElement("a"), e.href = location.href, n = document.createElement("a");
                try {
                    return n.href = t, !((!n.protocol || ":" === n.protocol) && !n.host || e.protocol + "//" + e.host == n.protocol + "//" + n.host)
                } catch (t) {
                    return t, !0
                }
            }
        }.call(this), function () {
            var e, n;
            e = t.matches, n = function (t) {
                return Array.prototype.slice.call(t)
            }, t.serializeElement = function (t, i) {
                var o, s;
                return o = [t], e(t, "form") && (o = n(t.elements)), s = [], o.forEach(function (t) {
                    if (t.name) return e(t, "select") ? n(t.options).forEach(function (e) {
                        if (e.selected) return s.push({name: t.name, value: e.value})
                    }) : t.checked || -1 === ["radio", "checkbox", "submit"].indexOf(t.type) ? s.push({
                        name: t.name,
                        value: t.value
                    }) : void 0
                }), i && s.push(i), s.map(function (t) {
                    return null != t.name ? encodeURIComponent(t.name) + "=" + encodeURIComponent(t.value) : t
                }).join("&")
            }, t.formElements = function (t, i) {
                return e(t, "form") ? n(t.elements).filter(function (t) {
                    return e(t, i)
                }) : n(t.querySelectorAll(i))
            }
        }.call(this), function () {
            var e, n, i;
            n = t.fire, i = t.stopEverything, t.handleConfirm = function (t) {
                if (!e(this)) return i(t)
            }, e = function (t) {
                var e, i, o;
                if (!(o = t.getAttribute("data-confirm"))) return !0;
                if (e = !1, n(t, "confirm")) {
                    try {
                        e = confirm(o)
                    } catch (t) {
                    }
                    i = n(t, "confirm:complete", [e])
                }
                return e && i
            }
        }.call(this), function () {
            var e, n, i, o, s, a, r, c, l, d, p;
            l = t.matches, c = t.getData, d = t.setData, p = t.stopEverything, r = t.formElements, t.handleDisabledElement = function (t) {
                var e;
                if (e = this, e.disabled) return p(t)
            }, t.enableElement = function (e) {
                var n;
                return n = e instanceof Event ? e.target : e, l(n, t.linkDisableSelector) ? a(n) : l(n, t.buttonDisableSelector) || l(n, t.formEnableSelector) ? o(n) : l(n, t.formSubmitSelector) ? s(n) : void 0
            }, t.disableElement = function (o) {
                var s;
                return s = o instanceof Event ? o.target : o, l(s, t.linkDisableSelector) ? i(s) : l(s, t.buttonDisableSelector) || l(s, t.formDisableSelector) ? e(s) : l(s, t.formSubmitSelector) ? n(s) : void 0
            }, i = function (t) {
                var e;
                return e = t.getAttribute("data-disable-with"), null != e && (d(t, "ujs:enable-with", t.innerHTML), t.innerHTML = e), t.addEventListener("click", p), d(t, "ujs:disabled", !0)
            }, a = function (t) {
                var e;
                return e = c(t, "ujs:enable-with"), null != e && (t.innerHTML = e, d(t, "ujs:enable-with", null)), t.removeEventListener("click", p), d(t, "ujs:disabled", null)
            }, n = function (n) {
                return r(n, t.formDisableSelector).forEach(e)
            }, e = function (t) {
                var e;
                return e = t.getAttribute("data-disable-with"), null != e && (l(t, "button") ? (d(t, "ujs:enable-with", t.innerHTML), t.innerHTML = e) : (d(t, "ujs:enable-with", t.value), t.value = e)), t.disabled = !0, d(t, "ujs:disabled", !0)
            }, s = function (e) {
                return r(e, t.formEnableSelector).forEach(o)
            }, o = function (t) {
                var e;
                return e = c(t, "ujs:enable-with"), null != e && (l(t, "button") ? t.innerHTML = e : t.value = e, d(t, "ujs:enable-with", null)), t.disabled = !1, d(t, "ujs:disabled", null)
            }
        }.call(this), function () {
            var e;
            e = t.stopEverything, t.handleMethod = function (n) {
                var i, o, s, a, r, c, l;
                if (c = this, l = c.getAttribute("data-method")) return r = t.href(c), o = t.csrfToken(), i = t.csrfParam(), s = document.createElement("form"), a = "<input name='_method' value='" + l + "' type='hidden' />", null == i || null == o || t.isCrossDomain(r) || (a += "<input name='" + i + "' value='" + o + "' type='hidden' />"), a += '<input type="submit" />', s.method = "post", s.action = r, s.target = c.target, s.innerHTML = a, s.style.display = "none", document.body.appendChild(s), s.querySelector('[type="submit"]').click(), e(n)
            }
        }.call(this), function () {
            var e, n, i, o, s, a, r, c, l, d = [].slice;
            a = t.matches, i = t.getData, c = t.setData, n = t.fire, l = t.stopEverything, e = t.ajax, o = t.isCrossDomain, r = t.serializeElement, s = function (t) {
                var e;
                return null != (e = t.getAttribute("data-remote")) && "false" !== e
            }, t.handleRemote = function (p) {
                var u, f, h, M, b, m, A;
                return M = this, !s(M) || (n(M, "ajax:before") ? (A = M.getAttribute("data-with-credentials"), h = M.getAttribute("data-type") || "script", a(M, t.formSubmitSelector) ? (u = i(M, "ujs:submit-button"), b = i(M, "ujs:submit-button-formmethod") || M.method, m = i(M, "ujs:submit-button-formaction") || M.getAttribute("action") || location.href, "GET" === b.toUpperCase() && (m = m.replace(/\?.*$/, "")), "multipart/form-data" === M.enctype ? (f = new FormData(M), null != u && f.append(u.name, u.value)) : f = r(M, u), c(M, "ujs:submit-button", null), c(M, "ujs:submit-button-formmethod", null), c(M, "ujs:submit-button-formaction", null)) : a(M, t.buttonClickSelector) || a(M, t.inputChangeSelector) ? (b = M.getAttribute("data-method"), m = M.getAttribute("data-url"), f = r(M, M.getAttribute("data-params"))) : (b = M.getAttribute("data-method"), m = t.href(M), f = M.getAttribute("data-params")), e({
                    type: b || "GET",
                    url: m,
                    data: f,
                    dataType: h,
                    beforeSend: function (t, e) {
                        return n(M, "ajax:beforeSend", [t, e]) ? n(M, "ajax:send", [t]) : (n(M, "ajax:stopped"), t.abort())
                    },
                    success: function () {
                        var t;
                        return t = 1 <= arguments.length ? d.call(arguments, 0) : [], n(M, "ajax:success", t)
                    },
                    error: function () {
                        var t;
                        return t = 1 <= arguments.length ? d.call(arguments, 0) : [], n(M, "ajax:error", t)
                    },
                    complete: function () {
                        var t;
                        return t = 1 <= arguments.length ? d.call(arguments, 0) : [], n(M, "ajax:complete", t)
                    },
                    crossDomain: o(m),
                    withCredentials: null != A && "false" !== A
                }), l(p)) : (n(M, "ajax:stopped"), !1))
            }, t.formSubmitButtonClick = function () {
                var t, e;
                if (t = this, e = t.form) return t.name && c(e, "ujs:submit-button", {
                    name: t.name,
                    value: t.value
                }), c(e, "ujs:formnovalidate-button", t.formNoValidate), c(e, "ujs:submit-button-formaction", t.getAttribute("formaction")), c(e, "ujs:submit-button-formmethod", t.getAttribute("formmethod"))
            }, t.handleMetaClick = function (t) {
                var e, n, i;
                if (n = this, i = (n.getAttribute("data-method") || "GET").toUpperCase(), e = n.getAttribute("data-params"), (t.metaKey || t.ctrlKey) && "GET" === i && !e) return t.stopImmediatePropagation()
            }
        }.call(this), function () {
            var e, n, i, o, s, a, r, c, l, d, p, u, f, h;
            a = t.fire, i = t.delegate, c = t.getData, e = t.$, h = t.refreshCSRFTokens, n = t.CSRFProtection, s = t.enableElement, o = t.disableElement, d = t.handleDisabledElement, l = t.handleConfirm, f = t.handleRemote, r = t.formSubmitButtonClick, p = t.handleMetaClick, u = t.handleMethod, "undefined" == typeof jQuery || null === jQuery || null == jQuery.ajax || jQuery.rails || (jQuery.rails = t, jQuery.ajaxPrefilter(function (t, e, i) {
                if (!t.crossDomain) return n(i)
            })), t.start = function () {
                if (window._rails_loaded) throw new Error("rails-ujs has already been loaded!");
                return window.addEventListener("pageshow", function () {
                    return e(t.formEnableSelector).forEach(function (t) {
                        if (c(t, "ujs:disabled")) return s(t)
                    }), e(t.linkDisableSelector).forEach(function (t) {
                        if (c(t, "ujs:disabled")) return s(t)
                    })
                }), i(document, t.linkDisableSelector, "ajax:complete", s), i(document, t.linkDisableSelector, "ajax:stopped", s), i(document, t.buttonDisableSelector, "ajax:complete", s), i(document, t.buttonDisableSelector, "ajax:stopped", s), i(document, t.linkClickSelector, "click", d), i(document, t.linkClickSelector, "click", l), i(document, t.linkClickSelector, "click", p), i(document, t.linkClickSelector, "click", o), i(document, t.linkClickSelector, "click", f), i(document, t.linkClickSelector, "click", u), i(document, t.buttonClickSelector, "click", d), i(document, t.buttonClickSelector, "click", l), i(document, t.buttonClickSelector, "click", o), i(document, t.buttonClickSelector, "click", f), i(document, t.inputChangeSelector, "change", d), i(document, t.inputChangeSelector, "change", l), i(document, t.inputChangeSelector, "change", f), i(document, t.formSubmitSelector, "submit", d), i(document, t.formSubmitSelector, "submit", l), i(document, t.formSubmitSelector, "submit", f), i(document, t.formSubmitSelector, "submit", function (t) {
                    return setTimeout(function () {
                        return o(t)
                    }, 13)
                }), i(document, t.formSubmitSelector, "ajax:send", o), i(document, t.formSubmitSelector, "ajax:complete", s), i(document, t.formInputClickSelector, "click", d), i(document, t.formInputClickSelector, "click", l), i(document, t.formInputClickSelector, "click", r), document.addEventListener("DOMContentLoaded", h), window._rails_loaded = !0
            }, window.Rails === t && a(document, "rails:attachBindings") && t.start()
        }.call(this)
    }).call(this), "object" == typeof module && module.exports ? module.exports = t : "function" == typeof define && define.amd && define(t)
}).call(this), function (t, e) {
    "object" == typeof module && "object" == typeof module.exports ? module.exports = t.document ? e(t, !0) : function (t) {
        if (!t.document) throw new Error("jQuery requires a window with a document");
        return e(t)
    } : e(t)
}("undefined" != typeof window ? window : this, function (t, e) {
    function n(t) {
        var e = !!t && "length" in t && t.length, n = ft.type(t);
        return "function" !== n && !ft.isWindow(t) && ("array" === n || 0 === e || "number" == typeof e && e > 0 && e - 1 in t)
    }

    function i(t, e, n) {
        if (ft.isFunction(e)) return ft.grep(t, function (t, i) {
            return !!e.call(t, i, t) !== n
        });
        if (e.nodeType) return ft.grep(t, function (t) {
            return t === e !== n
        });
        if ("string" == typeof e) {
            if (Lt.test(e)) return ft.filter(e, t, n);
            e = ft.filter(e, t)
        }
        return ft.grep(t, function (t) {
            return ft.inArray(t, e) > -1 !== n
        })
    }

    function o(t, e) {
        do {
            t = t[e]
        } while (t && 1 !== t.nodeType);
        return t
    }

    function s(t) {
        var e = {};
        return ft.each(t.match(wt) || [], function (t, n) {
            e[n] = !0
        }), e
    }

    function a() {
        it.addEventListener ? (it.removeEventListener("DOMContentLoaded", r), t.removeEventListener("load", r)) : (it.detachEvent("onreadystatechange", r), t.detachEvent("onload", r))
    }

    function r() {
        (it.addEventListener || "load" === t.event.type || "complete" === it.readyState) && (a(), ft.ready())
    }

    function c(t, e, n) {
        if (n === undefined && 1 === t.nodeType) {
            var i = "data-" + e.replace(kt, "-$1").toLowerCase();
            if ("string" == typeof(n = t.getAttribute(i))) {
                try {
                    n = "true" === n || "false" !== n && ("null" === n ? null : +n + "" === n ? +n : xt.test(n) ? ft.parseJSON(n) : n)
                } catch (t) {
                }
                ft.data(t, e, n)
            } else n = undefined
        }
        return n
    }

    function l(t) {
        var e;
        for (e in t) if (("data" !== e || !ft.isEmptyObject(t[e])) && "toJSON" !== e) return !1;
        return !0
    }

    function d(t, e, n, i) {
        if (Wt(t)) {
            var o, s, a = ft.expando, r = t.nodeType, c = r ? ft.cache : t, l = r ? t[a] : t[a] && a;
            if (l && c[l] && (i || c[l].data) || n !== undefined || "string" != typeof e) return l || (l = r ? t[a] = nt.pop() || ft.guid++ : a), c[l] || (c[l] = r ? {} : {toJSON: ft.noop}), "object" != typeof e && "function" != typeof e || (i ? c[l] = ft.extend(c[l], e) : c[l].data = ft.extend(c[l].data, e)), s = c[l], i || (s.data || (s.data = {}), s = s.data), n !== undefined && (s[ft.camelCase(e)] = n), "string" == typeof e ? null == (o = s[e]) && (o = s[ft.camelCase(e)]) : o = s, o
        }
    }

    function p(t, e, n) {
        if (Wt(t)) {
            var i, o, s = t.nodeType, a = s ? ft.cache : t, r = s ? t[ft.expando] : ft.expando;
            if (a[r]) {
                if (e && (i = n ? a[r] : a[r].data)) {
                    ft.isArray(e) ? e = e.concat(ft.map(e, ft.camelCase)) : e in i ? e = [e] : (e = ft.camelCase(e), e = e in i ? [e] : e.split(" ")), o = e.length;
                    for (; o--;) delete i[e[o]];
                    if (n ? !l(i) : !ft.isEmptyObject(i)) return
                }
                (n || (delete a[r].data, l(a[r]))) && (s ? ft.cleanData([t], !0) : pt.deleteExpando || a != a.window ? delete a[r] : a[r] = undefined)
            }
        }
    }

    function u(t, e, n, i) {
        var o, s = 1, a = 20, r = i ? function () {
                return i.cur()
            } : function () {
                return ft.css(t, e, "")
            }, c = r(), l = n && n[3] || (ft.cssNumber[e] ? "" : "px"),
            d = (ft.cssNumber[e] || "px" !== l && +c) && Et.exec(ft.css(t, e));
        if (d && d[3] !== l) {
            l = l || d[3], n = n || [], d = +c || 1;
            do {
                s = s || ".5", d /= s, ft.style(t, e, d + l)
            } while (s !== (s = r() / c) && 1 !== s && --a)
        }
        return n && (d = +d || +c || 0, o = n[1] ? d + (n[1] + 1) * n[2] : +n[2], i && (i.unit = l, i.start = d, i.end = o)), o
    }

    function f(t) {
        var e = jt.split("|"), n = t.createDocumentFragment();
        if (n.createElement) for (; e.length;) n.createElement(e.pop());
        return n
    }

    function h(t, e) {
        var n, i, o = 0,
            s = "undefined" != typeof t.getElementsByTagName ? t.getElementsByTagName(e || "*") : "undefined" != typeof t.querySelectorAll ? t.querySelectorAll(e || "*") : undefined;
        if (!s) for (s = [], n = t.childNodes || t; null != (i = n[o]); o++) !e || ft.nodeName(i, e) ? s.push(i) : ft.merge(s, h(i, e));
        return e === undefined || e && ft.nodeName(t, e) ? ft.merge([t], s) : s
    }

    function M(t, e) {
        for (var n, i = 0; null != (n = t[i]); i++) ft._data(n, "globalEval", !e || ft._data(e[i], "globalEval"))
    }

    function b(t) {
        Rt.test(t.type) && (t.defaultChecked = t.checked)
    }

    function m(t, e, n, i, o) {
        for (var s, a, r, c, l, d, p, u = t.length, m = f(e), A = [], g = 0; g < u; g++) if ((a = t[g]) || 0 === a) if ("object" === ft.type(a)) ft.merge(A, a.nodeType ? [a] : a); else if (Ft.test(a)) {
            for (c = c || m.appendChild(e.createElement("div")), l = ($t.exec(a) || ["", ""])[1].toLowerCase(), p = Ht[l] || Ht._default, c.innerHTML = p[1] + ft.htmlPrefilter(a) + p[2], s = p[0]; s--;) c = c.lastChild;
            if (!pt.leadingWhitespace && It.test(a) && A.push(e.createTextNode(It.exec(a)[0])), !pt.tbody) for (a = "table" !== l || Ut.test(a) ? "<table>" !== p[1] || Ut.test(a) ? 0 : c : c.firstChild, s = a && a.childNodes.length; s--;) ft.nodeName(d = a.childNodes[s], "tbody") && !d.childNodes.length && a.removeChild(d);
            for (ft.merge(A, c.childNodes), c.textContent = ""; c.firstChild;) c.removeChild(c.firstChild);
            c = m.lastChild
        } else A.push(e.createTextNode(a));
        for (c && m.removeChild(c), pt.appendChecked || ft.grep(h(A, "input"), b), g = 0; a = A[g++];) if (i && ft.inArray(a, i) > -1) o && o.push(a); else if (r = ft.contains(a.ownerDocument, a), c = h(m.appendChild(a), "script"), r && M(c), n) for (s = 0; a = c[s++];) Pt.test(a.type || "") && n.push(a);
        return c = null, m
    }

    function A() {
        return !0
    }

    function g() {
        return !1
    }

    function z() {
        try {
            return it.activeElement
        } catch (t) {
        }
    }

    function v(t, e, n, i, o, s) {
        var a, r;
        if ("object" == typeof e) {
            "string" != typeof n && (i = i || n, n = undefined);
            for (r in e) v(t, r, n, i, e[r], s);
            return t
        }
        if (null == i && null == o ? (o = n, i = n = undefined) : null == o && ("string" == typeof n ? (o = i, i = undefined) : (o = i, i = n, n = undefined)), !1 === o) o = g; else if (!o) return t;
        return 1 === s && (a = o, o = function (t) {
            return ft().off(t), a.apply(this, arguments)
        }, o.guid = a.guid || (a.guid = ft.guid++)), t.each(function () {
            ft.event.add(this, e, o, i, n)
        })
    }

    function y(t, e) {
        return ft.nodeName(t, "table") && ft.nodeName(11 !== e.nodeType ? e : e.firstChild, "tr") ? t.getElementsByTagName("tbody")[0] || t.appendChild(t.ownerDocument.createElement("tbody")) : t
    }

    function L(t) {
        return t.type = (null !== ft.find.attr(t, "type")) + "/" + t.type, t
    }

    function O(t) {
        var e = ie.exec(t.type);
        return e ? t.type = e[1] : t.removeAttribute("type"), t
    }

    function T(t, e) {
        if (1 === e.nodeType && ft.hasData(t)) {
            var n, i, o, s = ft._data(t), a = ft._data(e, s), r = s.events;
            if (r) {
                delete a.handle, a.events = {};
                for (n in r) for (i = 0, o = r[n].length; i < o; i++) ft.event.add(e, n, r[n][i])
            }
            a.data && (a.data = ft.extend({}, a.data))
        }
    }

    function N(t, e) {
        var n, i, o;
        if (1 === e.nodeType) {
            if (n = e.nodeName.toLowerCase(), !pt.noCloneEvent && e[ft.expando]) {
                o = ft._data(e);
                for (i in o.events) ft.removeEvent(e, i, o.handle);
                e.removeAttribute(ft.expando)
            }
            "script" === n && e.text !== t.text ? (L(e).text = t.text, O(e)) : "object" === n ? (e.parentNode && (e.outerHTML = t.outerHTML), pt.html5Clone && t.innerHTML && !ft.trim(e.innerHTML) && (e.innerHTML = t.innerHTML)) : "input" === n && Rt.test(t.type) ? (e.defaultChecked = e.checked = t.checked, e.value !== t.value && (e.value = t.value)) : "option" === n ? e.defaultSelected = e.selected = t.defaultSelected : "input" !== n && "textarea" !== n || (e.defaultValue = t.defaultValue)
        }
    }

    function q(t, e, n, i) {
        e = st.apply([], e);
        var o, s, a, r, c, l, d = 0, p = t.length, u = p - 1, f = e[0], M = ft.isFunction(f);
        if (M || p > 1 && "string" == typeof f && !pt.checkClone && ne.test(f)) return t.each(function (o) {
            var s = t.eq(o);
            M && (e[0] = f.call(this, o, s.html())), q(s, e, n, i)
        });
        if (p && (l = m(e, t[0].ownerDocument, !1, t, i), o = l.firstChild, 1 === l.childNodes.length && (l = o), o || i)) {
            for (r = ft.map(h(l, "script"), L), a = r.length; d < p; d++) s = l, d !== u && (s = ft.clone(s, !0, !0), a && ft.merge(r, h(s, "script"))), n.call(t[d], s, d);
            if (a) for (c = r[r.length - 1].ownerDocument, ft.map(r, O), d = 0; d < a; d++) s = r[d], Pt.test(s.type || "") && !ft._data(s, "globalEval") && ft.contains(c, s) && (s.src ? ft._evalUrl && ft._evalUrl(s.src) : ft.globalEval((s.text || s.textContent || s.innerHTML || "").replace(oe, "")));
            l = o = null
        }
        return t
    }

    function w(t, e, n) {
        for (var i, o = e ? ft.filter(e, t) : t, s = 0; null != (i = o[s]); s++) n || 1 !== i.nodeType || ft.cleanData(h(i)), i.parentNode && (n && ft.contains(i.ownerDocument, i) && M(h(i, "script")), i.parentNode.removeChild(i));
        return t
    }

    function S(t, e) {
        var n = ft(e.createElement(t)).appendTo(e.body), i = ft.css(n[0], "display");
        return n.detach(), i
    }

    function C(t) {
        var e = it, n = ce[t];
        return n || (n = S(t, e), "none" !== n && n || (re = (re || ft("<iframe frameborder='0' width='0' height='0'/>")).appendTo(e.documentElement), e = (re[0].contentWindow || re[0].contentDocument).document, e.write(), e.close(), n = S(t, e), re.detach()), ce[t] = n), n
    }

    function W(t, e) {
        return {
            get: function () {
                return t() ? void delete this.get : (this.get = e).apply(this, arguments)
            }
        }
    }

    function x(t) {
        if (t in Le) return t;
        for (var e = t.charAt(0).toUpperCase() + t.slice(1), n = ye.length; n--;) if ((t = ye[n] + e) in Le) return t
    }

    function k(t, e) {
        for (var n, i, o, s = [], a = 0, r = t.length; a < r; a++) i = t[a], i.style && (s[a] = ft._data(i, "olddisplay"), n = i.style.display, e ? (s[a] || "none" !== n || (i.style.display = ""), "" === i.style.display && _t(i) && (s[a] = ft._data(i, "olddisplay", C(i.nodeName)))) : (o = _t(i), (n && "none" !== n || !o) && ft._data(i, "olddisplay", o ? n : ft.css(i, "display"))));
        for (a = 0; a < r; a++) i = t[a], i.style && (e && "none" !== i.style.display && "" !== i.style.display || (i.style.display = e ? s[a] || "" : "none"));
        return t
    }

    function X(t, e, n) {
        var i = ge.exec(e);
        return i ? Math.max(0, i[1] - (n || 0)) + (i[2] || "px") : e
    }

    function E(t, e, n, i, o) {
        for (var s = n === (i ? "border" : "content") ? 4 : "width" === e ? 1 : 0, a = 0; s < 4; s += 2) "margin" === n && (a += ft.css(t, n + Bt[s], !0, o)), i ? ("content" === n && (a -= ft.css(t, "padding" + Bt[s], !0, o)), "margin" !== n && (a -= ft.css(t, "border" + Bt[s] + "Width", !0, o))) : (a += ft.css(t, "padding" + Bt[s], !0, o), "padding" !== n && (a += ft.css(t, "border" + Bt[s] + "Width", !0, o)));
        return a
    }

    function B(t, e, n) {
        var i = !0, o = "width" === e ? t.offsetWidth : t.offsetHeight, s = fe(t),
            a = pt.boxSizing && "border-box" === ft.css(t, "boxSizing", !1, s);
        if (o <= 0 || null == o) {
            if (o = he(t, e, s), (o < 0 || null == o) && (o = t.style[e]), de.test(o)) return o;
            i = a && (pt.boxSizingReliable() || o === t.style[e]), o = parseFloat(o) || 0
        }
        return o + E(t, e, n || (a ? "border" : "content"), i, s) + "px"
    }

    function _(t, e, n, i, o) {
        return new _.prototype.init(t, e, n, i, o)
    }

    function D() {
        return t.setTimeout(function () {
            Oe = undefined
        }), Oe = ft.now()
    }

    function R(t, e) {
        var n, i = {height: t}, o = 0;
        for (e = e ? 1 : 0; o < 4; o += 2 - e) n = Bt[o], i["margin" + n] = i["padding" + n] = t;
        return e && (i.opacity = i.width = t), i
    }

    function $(t, e, n) {
        for (var i, o = (j.tweeners[e] || []).concat(j.tweeners["*"]), s = 0, a = o.length; s < a; s++) if (i = o[s].call(n, e, t)) return i
    }

    function P(t, e, n) {
        var i, o, s, a, r, c, l, d = this, p = {}, u = t.style, f = t.nodeType && _t(t), h = ft._data(t, "fxshow");
        n.queue || (r = ft._queueHooks(t, "fx"), null == r.unqueued && (r.unqueued = 0, c = r.empty.fire, r.empty.fire = function () {
            r.unqueued || c()
        }), r.unqueued++, d.always(function () {
            d.always(function () {
                r.unqueued--, ft.queue(t, "fx").length || r.empty.fire()
            })
        })), 1 === t.nodeType && ("height" in e || "width" in e) && (n.overflow = [u.overflow, u.overflowX, u.overflowY], l = ft.css(t, "display"), "inline" === ("none" === l ? ft._data(t, "olddisplay") || C(t.nodeName) : l) && "none" === ft.css(t, "float") && (pt.inlineBlockNeedsLayout && "inline" !== C(t.nodeName) ? u.zoom = 1 : u.display = "inline-block")), n.overflow && (u.overflow = "hidden", pt.shrinkWrapBlocks() || d.always(function () {
            u.overflow = n.overflow[0], u.overflowX = n.overflow[1], u.overflowY = n.overflow[2]
        }));
        for (i in e) if (o = e[i], Ne.exec(o)) {
            if (delete e[i], s = s || "toggle" === o, o === (f ? "hide" : "show")) {
                if ("show" !== o || !h || h[i] === undefined) continue;
                f = !0
            }
            p[i] = h && h[i] || ft.style(t, i)
        } else l = undefined;
        if (ft.isEmptyObject(p)) "inline" === ("none" === l ? C(t.nodeName) : l) && (u.display = l); else {
            h ? "hidden" in h && (f = h.hidden) : h = ft._data(t, "fxshow", {}), s && (h.hidden = !f), f ? ft(t).show() : d.done(function () {
                ft(t).hide()
            }), d.done(function () {
                var e;
                ft._removeData(t, "fxshow");
                for (e in p) ft.style(t, e, p[e])
            });
            for (i in p) a = $(f ? h[i] : 0, i, d), i in h || (h[i] = a.start, f && (a.end = a.start, a.start = "width" === i || "height" === i ? 1 : 0))
        }
    }

    function I(t, e) {
        var n, i, o, s, a;
        for (n in t) if (i = ft.camelCase(n), o = e[i], s = t[n], ft.isArray(s) && (o = s[1], s = t[n] = s[0]), n !== i && (t[i] = s, delete t[n]), (a = ft.cssHooks[i]) && "expand" in a) {
            s = a.expand(s), delete t[i];
            for (n in s) n in t || (t[n] = s[n], e[n] = o)
        } else e[i] = o
    }

    function j(t, e, n) {
        var i, o, s = 0, a = j.prefilters.length, r = ft.Deferred().always(function () {
            delete c.elem
        }), c = function () {
            if (o) return !1;
            for (var e = Oe || D(), n = Math.max(0, l.startTime + l.duration - e), i = n / l.duration || 0, s = 1 - i, a = 0, c = l.tweens.length; a < c; a++) l.tweens[a].run(s);
            return r.notifyWith(t, [l, s, n]), s < 1 && c ? n : (r.resolveWith(t, [l]), !1)
        }, l = r.promise({
            elem: t,
            props: ft.extend({}, e),
            opts: ft.extend(!0, {specialEasing: {}, easing: ft.easing._default}, n),
            originalProperties: e,
            originalOptions: n,
            startTime: Oe || D(),
            duration: n.duration,
            tweens: [],
            createTween: function (e, n) {
                var i = ft.Tween(t, l.opts, e, n, l.opts.specialEasing[e] || l.opts.easing);
                return l.tweens.push(i), i
            },
            stop: function (e) {
                var n = 0, i = e ? l.tweens.length : 0;
                if (o) return this;
                for (o = !0; n < i; n++) l.tweens[n].run(1);
                return e ? (r.notifyWith(t, [l, 1, 0]), r.resolveWith(t, [l, e])) : r.rejectWith(t, [l, e]), this
            }
        }), d = l.props;
        for (I(d, l.opts.specialEasing); s < a; s++) if (i = j.prefilters[s].call(l, t, d, l.opts)) return ft.isFunction(i.stop) && (ft._queueHooks(l.elem, l.opts.queue).stop = ft.proxy(i.stop, i)), i;
        return ft.map(d, $, l), ft.isFunction(l.opts.start) && l.opts.start.call(t, l), ft.fx.timer(ft.extend(c, {
            elem: t,
            anim: l,
            queue: l.opts.queue
        })), l.progress(l.opts.progress).done(l.opts.done, l.opts.complete).fail(l.opts.fail).always(l.opts.always)
    }

    function H(t) {
        return ft.attr(t, "class") || ""
    }

    function F(t) {
        return function (e, n) {
            "string" != typeof e && (n = e, e = "*");
            var i, o = 0, s = e.toLowerCase().match(wt) || [];
            if (ft.isFunction(n)) for (; i = s[o++];) "+" === i.charAt(0) ? (i = i.slice(1) || "*", (t[i] = t[i] || []).unshift(n)) : (t[i] = t[i] || []).push(n)
        }
    }

    function U(t, e, n, i) {
        function o(r) {
            var c;
            return s[r] = !0, ft.each(t[r] || [], function (t, r) {
                var l = r(e, n, i);
                return "string" != typeof l || a || s[l] ? a ? !(c = l) : void 0 : (e.dataTypes.unshift(l), o(l), !1)
            }), c
        }

        var s = {}, a = t === Qe;
        return o(e.dataTypes[0]) || !s["*"] && o("*")
    }

    function Y(t, e) {
        var n, i, o = ft.ajaxSettings.flatOptions || {};
        for (i in e) e[i] !== undefined && ((o[i] ? t : n || (n = {}))[i] = e[i]);
        return n && ft.extend(!0, t, n), t
    }

    function V(t, e, n) {
        for (var i, o, s, a, r = t.contents, c = t.dataTypes; "*" === c[0];) c.shift(), o === undefined && (o = t.mimeType || e.getResponseHeader("Content-Type"));
        if (o) for (a in r) if (r[a] && r[a].test(o)) {
            c.unshift(a);
            break
        }
        if (c[0] in n) s = c[0]; else {
            for (a in n) {
                if (!c[0] || t.converters[a + " " + c[0]]) {
                    s = a;
                    break
                }
                i || (i = a)
            }
            s = s || i
        }
        if (s) return s !== c[0] && c.unshift(s), n[s]
    }

    function G(t, e, n, i) {
        var o, s, a, r, c, l = {}, d = t.dataTypes.slice();
        if (d[1]) for (a in t.converters) l[a.toLowerCase()] = t.converters[a];
        for (s = d.shift(); s;) if (t.responseFields[s] && (n[t.responseFields[s]] = e), !c && i && t.dataFilter && (e = t.dataFilter(e, t.dataType)), c = s, s = d.shift()) if ("*" === s) s = c; else if ("*" !== c && c !== s) {
            if (!(a = l[c + " " + s] || l["* " + s])) for (o in l) if (r = o.split(" "), r[1] === s && (a = l[c + " " + r[0]] || l["* " + r[0]])) {
                !0 === a ? a = l[o] : !0 !== l[o] && (s = r[0], d.unshift(r[1]));
                break
            }
            if (!0 !== a) if (a && t["throws"]) e = a(e); else try {
                e = a(e)
            } catch (t) {
                return {state: "parsererror", error: a ? t : "No conversion from " + c + " to " + s}
            }
        }
        return {state: "success", data: e}
    }

    function K(t) {
        return t.style && t.style.display || ft.css(t, "display")
    }

    function Q(t) {
        if (!ft.contains(t.ownerDocument || it, t)) return !0;
        for (; t && 1 === t.nodeType;) {
            if ("none" === K(t) || "hidden" === t.type) return !0;
            t = t.parentNode
        }
        return !1
    }

    function J(t, e, n, i) {
        var o;
        if (ft.isArray(e)) ft.each(e, function (e, o) {
            n || nn.test(t) ? i(t, o) : J(t + "[" + ("object" == typeof o && null != o ? e : "") + "]", o, n, i)
        }); else if (n || "object" !== ft.type(e)) i(t, e); else for (o in e) J(t + "[" + o + "]", e[o], n, i)
    }

    function Z() {
        try {
            return new t.XMLHttpRequest
        } catch (t) {
        }
    }

    function tt() {
        try {
            return new t.ActiveXObject("Microsoft.XMLHTTP")
        } catch (t) {
        }
    }

    function et(t) {
        return ft.isWindow(t) ? t : 9 === t.nodeType && (t.defaultView || t.parentWindow)
    }

    var nt = [], it = t.document, ot = nt.slice, st = nt.concat, at = nt.push, rt = nt.indexOf, ct = {},
        lt = ct.toString, dt = ct.hasOwnProperty, pt = {}, ut = "1.12.4", ft = function (t, e) {
            return new ft.fn.init(t, e)
        }, ht = /^[\s\uFEFF\xA0]+|[\s\uFEFF\xA0]+$/g, Mt = /^-ms-/, bt = /-([\da-z])/gi, mt = function (t, e) {
            return e.toUpperCase()
        };
    ft.fn = ft.prototype = {
        jquery: ut, constructor: ft, selector: "", length: 0, toArray: function () {
            return ot.call(this)
        }, get: function (t) {
            return null != t ? t < 0 ? this[t + this.length] : this[t] : ot.call(this)
        }, pushStack: function (t) {
            var e = ft.merge(this.constructor(), t);
            return e.prevObject = this, e.context = this.context, e
        }, each: function (t) {
            return ft.each(this, t)
        }, map: function (t) {
            return this.pushStack(ft.map(this, function (e, n) {
                return t.call(e, n, e)
            }))
        }, slice: function () {
            return this.pushStack(ot.apply(this, arguments))
        }, first: function () {
            return this.eq(0)
        }, last: function () {
            return this.eq(-1)
        }, eq: function (t) {
            var e = this.length, n = +t + (t < 0 ? e : 0);
            return this.pushStack(n >= 0 && n < e ? [this[n]] : [])
        }, end: function () {
            return this.prevObject || this.constructor()
        }, push: at, sort: nt.sort, splice: nt.splice
    }, ft.extend = ft.fn.extend = function () {
        var t, e, n, i, o, s, a = arguments[0] || {}, r = 1, c = arguments.length, l = !1;
        for ("boolean" == typeof a && (l = a, a = arguments[r] || {}, r++), "object" == typeof a || ft.isFunction(a) || (a = {}), r === c && (a = this, r--); r < c; r++) if (null != (o = arguments[r])) for (i in o) t = a[i], n = o[i], a !== n && (l && n && (ft.isPlainObject(n) || (e = ft.isArray(n))) ? (e ? (e = !1, s = t && ft.isArray(t) ? t : []) : s = t && ft.isPlainObject(t) ? t : {}, a[i] = ft.extend(l, s, n)) : n !== undefined && (a[i] = n));
        return a
    }, ft.extend({
        expando: "jQuery" + (ut + Math.random()).replace(/\D/g, ""), isReady: !0, error: function (t) {
            throw new Error(t)
        }, noop: function () {
        }, isFunction: function (t) {
            return "function" === ft.type(t)
        }, isArray: Array.isArray || function (t) {
            return "array" === ft.type(t)
        }, isWindow: function (t) {
            return null != t && t == t.window
        }, isNumeric: function (t) {
            var e = t && t.toString();
            return !ft.isArray(t) && e - parseFloat(e) + 1 >= 0
        }, isEmptyObject: function (t) {
            var e;
            for (e in t) return !1;
            return !0
        }, isPlainObject: function (t) {
            var e;
            if (!t || "object" !== ft.type(t) || t.nodeType || ft.isWindow(t)) return !1;
            try {
                if (t.constructor && !dt.call(t, "constructor") && !dt.call(t.constructor.prototype, "isPrototypeOf")) return !1
            } catch (t) {
                return !1
            }
            if (!pt.ownFirst) for (e in t) return dt.call(t, e);
            for (e in t) ;
            return e === undefined || dt.call(t, e)
        }, type: function (t) {
            return null == t ? t + "" : "object" == typeof t || "function" == typeof t ? ct[lt.call(t)] || "object" : typeof t
        }, globalEval: function (e) {
            e && ft.trim(e) && (t.execScript || function (e) {
                t.eval.call(t, e)
            })(e)
        }, camelCase: function (t) {
            return t.replace(Mt, "ms-").replace(bt, mt)
        }, nodeName: function (t, e) {
            return t.nodeName && t.nodeName.toLowerCase() === e.toLowerCase()
        }, each: function (t, e) {
            var i, o = 0;
            if (n(t)) for (i = t.length; o < i && !1 !== e.call(t[o], o, t[o]); o++) ; else for (o in t) if (!1 === e.call(t[o], o, t[o])) break;
            return t
        }, trim: function (t) {
            return null == t ? "" : (t + "").replace(ht, "")
        }, makeArray: function (t, e) {
            var i = e || [];
            return null != t && (n(Object(t)) ? ft.merge(i, "string" == typeof t ? [t] : t) : at.call(i, t)), i
        }, inArray: function (t, e, n) {
            var i;
            if (e) {
                if (rt) return rt.call(e, t, n);
                for (i = e.length, n = n ? n < 0 ? Math.max(0, i + n) : n : 0; n < i; n++) if (n in e && e[n] === t) return n
            }
            return -1
        },
        merge: function (t, e) {
            for (var n = +e.length, i = 0, o = t.length; i < n;) t[o++] = e[i++];
            if (n !== n) for (; e[i] !== undefined;) t[o++] = e[i++];
            return t.length = o, t
        }, grep: function (t, e, n) {
            for (var i = [], o = 0, s = t.length, a = !n; o < s; o++) !e(t[o], o) !== a && i.push(t[o]);
            return i
        }, map: function (t, e, i) {
            var o, s, a = 0, r = [];
            if (n(t)) for (o = t.length; a < o; a++) null != (s = e(t[a], a, i)) && r.push(s); else for (a in t) null != (s = e(t[a], a, i)) && r.push(s);
            return st.apply([], r)
        }, guid: 1, proxy: function (t, e) {
            var n, i, o;
            return "string" == typeof e && (o = t[e], e = t, t = o), ft.isFunction(t) ? (n = ot.call(arguments, 2), i = function () {
                return t.apply(e || this, n.concat(ot.call(arguments)))
            }, i.guid = t.guid = t.guid || ft.guid++, i) : undefined
        }, now: function () {
            return +new Date
        }, support: pt
    }), "function" == typeof Symbol && (ft.fn[Symbol.iterator] = nt[Symbol.iterator]), ft.each("Boolean Number String Function Array Date RegExp Object Error Symbol".split(" "), function (t, e) {
        ct["[object " + e + "]"] = e.toLowerCase()
    });
    var At = function (t) {
        function e(t, e, n, i) {
            var o, s, a, r, c, l, p, f, h = e && e.ownerDocument, M = e ? e.nodeType : 9;
            if (n = n || [], "string" != typeof t || !t || 1 !== M && 9 !== M && 11 !== M) return n;
            if (!i && ((e ? e.ownerDocument || e : $) !== x && W(e), e = e || x, X)) {
                if (11 !== M && (l = mt.exec(t))) if (o = l[1]) {
                    if (9 === M) {
                        if (!(a = e.getElementById(o))) return n;
                        if (a.id === o) return n.push(a), n
                    } else if (h && (a = h.getElementById(o)) && D(e, a) && a.id === o) return n.push(a), n
                } else {
                    if (l[2]) return J.apply(n, e.getElementsByTagName(t)), n;
                    if ((o = l[3]) && v.getElementsByClassName && e.getElementsByClassName) return J.apply(n, e.getElementsByClassName(o)), n
                }
                if (v.qsa && !F[t + " "] && (!E || !E.test(t))) {
                    if (1 !== M) h = e, f = t; else if ("object" !== e.nodeName.toLowerCase()) {
                        for ((r = e.getAttribute("id")) ? r = r.replace(gt, "\\$&") : e.setAttribute("id", r = R), p = T(t), s = p.length, c = ut.test(r) ? "#" + r : "[id='" + r + "']"; s--;) p[s] = c + " " + u(p[s]);
                        f = p.join(","), h = At.test(t) && d(e.parentNode) || e
                    }
                    if (f) try {
                        return J.apply(n, h.querySelectorAll(f)), n
                    } catch (t) {
                    } finally {
                        r === R && e.removeAttribute("id")
                    }
                }
            }
            return q(t.replace(rt, "$1"), e, n, i)
        }

        function n() {
            function t(n, i) {
                return e.push(n + " ") > y.cacheLength && delete t[e.shift()], t[n + " "] = i
            }

            var e = [];
            return t
        }

        function i(t) {
            return t[R] = !0, t
        }

        function o(t) {
            var e = x.createElement("div");
            try {
                return !!t(e)
            } catch (t) {
                return !1
            } finally {
                e.parentNode && e.parentNode.removeChild(e), e = null
            }
        }

        function s(t, e) {
            for (var n = t.split("|"), i = n.length; i--;) y.attrHandle[n[i]] = e
        }

        function a(t, e) {
            var n = e && t,
                i = n && 1 === t.nodeType && 1 === e.nodeType && (~e.sourceIndex || Y) - (~t.sourceIndex || Y);
            if (i) return i;
            if (n) for (; n = n.nextSibling;) if (n === e) return -1;
            return t ? 1 : -1
        }

        function r(t) {
            return function (e) {
                return "input" === e.nodeName.toLowerCase() && e.type === t
            }
        }

        function c(t) {
            return function (e) {
                var n = e.nodeName.toLowerCase();
                return ("input" === n || "button" === n) && e.type === t
            }
        }

        function l(t) {
            return i(function (e) {
                return e = +e, i(function (n, i) {
                    for (var o, s = t([], n.length, e), a = s.length; a--;) n[o = s[a]] && (n[o] = !(i[o] = n[o]))
                })
            })
        }

        function d(t) {
            return t && "undefined" != typeof t.getElementsByTagName && t
        }

        function p() {
        }

        function u(t) {
            for (var e = 0, n = t.length, i = ""; e < n; e++) i += t[e].value;
            return i
        }

        function f(t, e, n) {
            var i = e.dir, o = n && "parentNode" === i, s = I++;
            return e.first ? function (e, n, s) {
                for (; e = e[i];) if (1 === e.nodeType || o) return t(e, n, s)
            } : function (e, n, a) {
                var r, c, l, d = [P, s];
                if (a) {
                    for (; e = e[i];) if ((1 === e.nodeType || o) && t(e, n, a)) return !0
                } else for (; e = e[i];) if (1 === e.nodeType || o) {
                    if (l = e[R] || (e[R] = {}), c = l[e.uniqueID] || (l[e.uniqueID] = {}), (r = c[i]) && r[0] === P && r[1] === s) return d[2] = r[2];
                    if (c[i] = d, d[2] = t(e, n, a)) return !0
                }
            }
        }

        function h(t) {
            return t.length > 1 ? function (e, n, i) {
                for (var o = t.length; o--;) if (!t[o](e, n, i)) return !1;
                return !0
            } : t[0]
        }

        function M(t, n, i) {
            for (var o = 0, s = n.length; o < s; o++) e(t, n[o], i);
            return i
        }

        function b(t, e, n, i, o) {
            for (var s, a = [], r = 0, c = t.length, l = null != e; r < c; r++) (s = t[r]) && (n && !n(s, i, o) || (a.push(s), l && e.push(r)));
            return a
        }

        function m(t, e, n, o, s, a) {
            return o && !o[R] && (o = m(o)), s && !s[R] && (s = m(s, a)), i(function (i, a, r, c) {
                var l, d, p, u = [], f = [], h = a.length, m = i || M(e || "*", r.nodeType ? [r] : r, []),
                    A = !t || !i && e ? m : b(m, u, t, r, c), g = n ? s || (i ? t : h || o) ? [] : a : A;
                if (n && n(A, g, r, c), o) for (l = b(g, f), o(l, [], r, c), d = l.length; d--;) (p = l[d]) && (g[f[d]] = !(A[f[d]] = p));
                if (i) {
                    if (s || t) {
                        if (s) {
                            for (l = [], d = g.length; d--;) (p = g[d]) && l.push(A[d] = p);
                            s(null, g = [], l, c)
                        }
                        for (d = g.length; d--;) (p = g[d]) && (l = s ? tt(i, p) : u[d]) > -1 && (i[l] = !(a[l] = p))
                    }
                } else g = b(g === a ? g.splice(h, g.length) : g), s ? s(null, a, g, c) : J.apply(a, g)
            })
        }

        function A(t) {
            for (var e, n, i, o = t.length, s = y.relative[t[0].type], a = s || y.relative[" "], r = s ? 1 : 0, c = f(function (t) {
                return t === e
            }, a, !0), l = f(function (t) {
                return tt(e, t) > -1
            }, a, !0), d = [function (t, n, i) {
                var o = !s && (i || n !== w) || ((e = n).nodeType ? c(t, n, i) : l(t, n, i));
                return e = null, o
            }]; r < o; r++) if (n = y.relative[t[r].type]) d = [f(h(d), n)]; else {
                if (n = y.filter[t[r].type].apply(null, t[r].matches), n[R]) {
                    for (i = ++r; i < o && !y.relative[t[i].type]; i++) ;
                    return m(r > 1 && h(d), r > 1 && u(t.slice(0, r - 1).concat({value: " " === t[r - 2].type ? "*" : ""})).replace(rt, "$1"), n, r < i && A(t.slice(r, i)), i < o && A(t = t.slice(i)), i < o && u(t))
                }
                d.push(n)
            }
            return h(d)
        }

        function g(t, n) {
            var o = n.length > 0, s = t.length > 0, a = function (i, a, r, c, l) {
                var d, p, u, f = 0, h = "0", M = i && [], m = [], A = w, g = i || s && y.find.TAG("*", l),
                    z = P += null == A ? 1 : Math.random() || .1, v = g.length;
                for (l && (w = a === x || a || l); h !== v && null != (d = g[h]); h++) {
                    if (s && d) {
                        for (p = 0, a || d.ownerDocument === x || (W(d), r = !X); u = t[p++];) if (u(d, a || x, r)) {
                            c.push(d);
                            break
                        }
                        l && (P = z)
                    }
                    o && ((d = !u && d) && f--, i && M.push(d))
                }
                if (f += h, o && h !== f) {
                    for (p = 0; u = n[p++];) u(M, m, a, r);
                    if (i) {
                        if (f > 0) for (; h--;) M[h] || m[h] || (m[h] = K.call(c));
                        m = b(m)
                    }
                    J.apply(c, m), l && !i && m.length > 0 && f + n.length > 1 && e.uniqueSort(c)
                }
                return l && (P = z, w = A), M
            };
            return o ? i(a) : a
        }

        var z, v, y, L, O, T, N, q, w, S, C, W, x, k, X, E, B, _, D, R = "sizzle" + 1 * new Date, $ = t.document, P = 0,
            I = 0, j = n(), H = n(), F = n(), U = function (t, e) {
                return t === e && (C = !0), 0
            }, Y = 1 << 31, V = {}.hasOwnProperty, G = [], K = G.pop, Q = G.push, J = G.push, Z = G.slice,
            tt = function (t, e) {
                for (var n = 0, i = t.length; n < i; n++) if (t[n] === e) return n;
                return -1
            },
            et = "checked|selected|async|autofocus|autoplay|controls|defer|disabled|hidden|ismap|loop|multiple|open|readonly|required|scoped",
            nt = "[\\x20\\t\\r\\n\\f]", it = "(?:\\\\.|[\\w-]|[^\\x00-\\xa0])+",
            ot = "\\[" + nt + "*(" + it + ")(?:" + nt + "*([*^$|!~]?=)" + nt + "*(?:'((?:\\\\.|[^\\\\'])*)'|\"((?:\\\\.|[^\\\\\"])*)\"|(" + it + "))|)" + nt + "*\\]",
            st = ":(" + it + ")(?:\\((('((?:\\\\.|[^\\\\'])*)'|\"((?:\\\\.|[^\\\\\"])*)\")|((?:\\\\.|[^\\\\()[\\]]|" + ot + ")*)|.*)\\)|)",
            at = new RegExp(nt + "+", "g"), rt = new RegExp("^" + nt + "+|((?:^|[^\\\\])(?:\\\\.)*)" + nt + "+$", "g"),
            ct = new RegExp("^" + nt + "*," + nt + "*"), lt = new RegExp("^" + nt + "*([>+~]|" + nt + ")" + nt + "*"),
            dt = new RegExp("=" + nt + "*([^\\]'\"]*?)" + nt + "*\\]", "g"), pt = new RegExp(st),
            ut = new RegExp("^" + it + "$"), ft = {
                ID: new RegExp("^#(" + it + ")"),
                CLASS: new RegExp("^\\.(" + it + ")"),
                TAG: new RegExp("^(" + it + "|[*])"),
                ATTR: new RegExp("^" + ot),
                PSEUDO: new RegExp("^" + st),
                CHILD: new RegExp("^:(only|first|last|nth|nth-last)-(child|of-type)(?:\\(" + nt + "*(even|odd|(([+-]|)(\\d*)n|)" + nt + "*(?:([+-]|)" + nt + "*(\\d+)|))" + nt + "*\\)|)", "i"),
                bool: new RegExp("^(?:" + et + ")$", "i"),
                needsContext: new RegExp("^" + nt + "*[>+~]|:(even|odd|eq|gt|lt|nth|first|last)(?:\\(" + nt + "*((?:-\\d)?\\d*)" + nt + "*\\)|)(?=[^-]|$)", "i")
            }, ht = /^(?:input|select|textarea|button)$/i, Mt = /^h\d$/i, bt = /^[^{]+\{\s*\[native \w/,
            mt = /^(?:#([\w-]+)|(\w+)|\.([\w-]+))$/, At = /[+~]/, gt = /'|\\/g,
            zt = new RegExp("\\\\([\\da-f]{1,6}" + nt + "?|(" + nt + ")|.)", "ig"), vt = function (t, e, n) {
                var i = "0x" + e - 65536;
                return i !== i || n ? e : i < 0 ? String.fromCharCode(i + 65536) : String.fromCharCode(i >> 10 | 55296, 1023 & i | 56320)
            }, yt = function () {
                W()
            };
        try {
            J.apply(G = Z.call($.childNodes), $.childNodes), G[$.childNodes.length].nodeType
        } catch (t) {
            J = {
                apply: G.length ? function (t, e) {
                    Q.apply(t, Z.call(e))
                } : function (t, e) {
                    for (var n = t.length, i = 0; t[n++] = e[i++];) ;
                    t.length = n - 1
                }
            }
        }
        v = e.support = {}, O = e.isXML = function (t) {
            var e = t && (t.ownerDocument || t).documentElement;
            return !!e && "HTML" !== e.nodeName
        }, W = e.setDocument = function (t) {
            var e, n, i = t ? t.ownerDocument || t : $;
            return i !== x && 9 === i.nodeType && i.documentElement ? (x = i, k = x.documentElement, X = !O(x), (n = x.defaultView) && n.top !== n && (n.addEventListener ? n.addEventListener("unload", yt, !1) : n.attachEvent && n.attachEvent("onunload", yt)), v.attributes = o(function (t) {
                return t.className = "i", !t.getAttribute("className")
            }), v.getElementsByTagName = o(function (t) {
                return t.appendChild(x.createComment("")), !t.getElementsByTagName("*").length
            }), v.getElementsByClassName = bt.test(x.getElementsByClassName), v.getById = o(function (t) {
                return k.appendChild(t).id = R, !x.getElementsByName || !x.getElementsByName(R).length
            }), v.getById ? (y.find.ID = function (t, e) {
                if ("undefined" != typeof e.getElementById && X) {
                    var n = e.getElementById(t);
                    return n ? [n] : []
                }
            }, y.filter.ID = function (t) {
                var e = t.replace(zt, vt);
                return function (t) {
                    return t.getAttribute("id") === e
                }
            }) : (delete y.find.ID, y.filter.ID = function (t) {
                var e = t.replace(zt, vt);
                return function (t) {
                    var n = "undefined" != typeof t.getAttributeNode && t.getAttributeNode("id");
                    return n && n.value === e
                }
            }), y.find.TAG = v.getElementsByTagName ? function (t, e) {
                return "undefined" != typeof e.getElementsByTagName ? e.getElementsByTagName(t) : v.qsa ? e.querySelectorAll(t) : void 0
            } : function (t, e) {
                var n, i = [], o = 0, s = e.getElementsByTagName(t);
                if ("*" === t) {
                    for (; n = s[o++];) 1 === n.nodeType && i.push(n);
                    return i
                }
                return s
            }, y.find.CLASS = v.getElementsByClassName && function (t, e) {
                if ("undefined" != typeof e.getElementsByClassName && X) return e.getElementsByClassName(t)
            }, B = [], E = [], (v.qsa = bt.test(x.querySelectorAll)) && (o(function (t) {
                k.appendChild(t).innerHTML = "<a id='" + R + "'></a><select id='" + R + "-\r\\' msallowcapture=''><option selected=''></option></select>", t.querySelectorAll("[msallowcapture^='']").length && E.push("[*^$]=" + nt + "*(?:''|\"\")"), t.querySelectorAll("[selected]").length || E.push("\\[" + nt + "*(?:value|" + et + ")"), t.querySelectorAll("[id~=" + R + "-]").length || E.push("~="), t.querySelectorAll(":checked").length || E.push(":checked"), t.querySelectorAll("a#" + R + "+*").length || E.push(".#.+[+~]")
            }), o(function (t) {
                var e = x.createElement("input");
                e.setAttribute("type", "hidden"), t.appendChild(e).setAttribute("name", "D"), t.querySelectorAll("[name=d]").length && E.push("name" + nt + "*[*^$|!~]?="), t.querySelectorAll(":enabled").length || E.push(":enabled", ":disabled"), t.querySelectorAll("*,:x"), E.push(",.*:")
            })), (v.matchesSelector = bt.test(_ = k.matches || k.webkitMatchesSelector || k.mozMatchesSelector || k.oMatchesSelector || k.msMatchesSelector)) && o(function (t) {
                v.disconnectedMatch = _.call(t, "div"), _.call(t, "[s!='']:x"), B.push("!=", st)
            }), E = E.length && new RegExp(E.join("|")), B = B.length && new RegExp(B.join("|")), e = bt.test(k.compareDocumentPosition), D = e || bt.test(k.contains) ? function (t, e) {
                var n = 9 === t.nodeType ? t.documentElement : t, i = e && e.parentNode;
                return t === i || !(!i || 1 !== i.nodeType || !(n.contains ? n.contains(i) : t.compareDocumentPosition && 16 & t.compareDocumentPosition(i)))
            } : function (t, e) {
                if (e) for (; e = e.parentNode;) if (e === t) return !0;
                return !1
            }, U = e ? function (t, e) {
                if (t === e) return C = !0, 0;
                var n = !t.compareDocumentPosition - !e.compareDocumentPosition;
                return n || (n = (t.ownerDocument || t) === (e.ownerDocument || e) ? t.compareDocumentPosition(e) : 1, 1 & n || !v.sortDetached && e.compareDocumentPosition(t) === n ? t === x || t.ownerDocument === $ && D($, t) ? -1 : e === x || e.ownerDocument === $ && D($, e) ? 1 : S ? tt(S, t) - tt(S, e) : 0 : 4 & n ? -1 : 1)
            } : function (t, e) {
                if (t === e) return C = !0, 0;
                var n, i = 0, o = t.parentNode, s = e.parentNode, r = [t], c = [e];
                if (!o || !s) return t === x ? -1 : e === x ? 1 : o ? -1 : s ? 1 : S ? tt(S, t) - tt(S, e) : 0;
                if (o === s) return a(t, e);
                for (n = t; n = n.parentNode;) r.unshift(n);
                for (n = e; n = n.parentNode;) c.unshift(n);
                for (; r[i] === c[i];) i++;
                return i ? a(r[i], c[i]) : r[i] === $ ? -1 : c[i] === $ ? 1 : 0
            }, x) : x
        }, e.matches = function (t, n) {
            return e(t, null, null, n)
        }, e.matchesSelector = function (t, n) {
            if ((t.ownerDocument || t) !== x && W(t), n = n.replace(dt, "='$1']"), v.matchesSelector && X && !F[n + " "] && (!B || !B.test(n)) && (!E || !E.test(n))) try {
                var i = _.call(t, n);
                if (i || v.disconnectedMatch || t.document && 11 !== t.document.nodeType) return i
            } catch (t) {
            }
            return e(n, x, null, [t]).length > 0
        }, e.contains = function (t, e) {
            return (t.ownerDocument || t) !== x && W(t), D(t, e)
        }, e.attr = function (t, e) {
            (t.ownerDocument || t) !== x && W(t);
            var n = y.attrHandle[e.toLowerCase()],
                i = n && V.call(y.attrHandle, e.toLowerCase()) ? n(t, e, !X) : undefined;
            return i !== undefined ? i : v.attributes || !X ? t.getAttribute(e) : (i = t.getAttributeNode(e)) && i.specified ? i.value : null
        }, e.error = function (t) {
            throw new Error("Syntax error, unrecognized expression: " + t)
        }, e.uniqueSort = function (t) {
            var e, n = [], i = 0, o = 0;
            if (C = !v.detectDuplicates, S = !v.sortStable && t.slice(0), t.sort(U), C) {
                for (; e = t[o++];) e === t[o] && (i = n.push(o));
                for (; i--;) t.splice(n[i], 1)
            }
            return S = null, t
        }, L = e.getText = function (t) {
            var e, n = "", i = 0, o = t.nodeType;
            if (o) {
                if (1 === o || 9 === o || 11 === o) {
                    if ("string" == typeof t.textContent) return t.textContent;
                    for (t = t.firstChild; t; t = t.nextSibling) n += L(t)
                } else if (3 === o || 4 === o) return t.nodeValue
            } else for (; e = t[i++];) n += L(e);
            return n
        }, y = e.selectors = {
            cacheLength: 50,
            createPseudo: i,
            match: ft,
            attrHandle: {},
            find: {},
            relative: {
                ">": {dir: "parentNode", first: !0},
                " ": {dir: "parentNode"},
                "+": {dir: "previousSibling", first: !0},
                "~": {dir: "previousSibling"}
            },
            preFilter: {
                ATTR: function (t) {
                    return t[1] = t[1].replace(zt, vt), t[3] = (t[3] || t[4] || t[5] || "").replace(zt, vt), "~=" === t[2] && (t[3] = " " + t[3] + " "), t.slice(0, 4)
                }, CHILD: function (t) {
                    return t[1] = t[1].toLowerCase(), "nth" === t[1].slice(0, 3) ? (t[3] || e.error(t[0]), t[4] = +(t[4] ? t[5] + (t[6] || 1) : 2 * ("even" === t[3] || "odd" === t[3])), t[5] = +(t[7] + t[8] || "odd" === t[3])) : t[3] && e.error(t[0]), t
                }, PSEUDO: function (t) {
                    var e, n = !t[6] && t[2];
                    return ft.CHILD.test(t[0]) ? null : (t[3] ? t[2] = t[4] || t[5] || "" : n && pt.test(n) && (e = T(n, !0)) && (e = n.indexOf(")", n.length - e) - n.length) && (t[0] = t[0].slice(0, e), t[2] = n.slice(0, e)), t.slice(0, 3))
                }
            },
            filter: {
                TAG: function (t) {
                    var e = t.replace(zt, vt).toLowerCase();
                    return "*" === t ? function () {
                        return !0
                    } : function (t) {
                        return t.nodeName && t.nodeName.toLowerCase() === e
                    }
                }, CLASS: function (t) {
                    var e = j[t + " "];
                    return e || (e = new RegExp("(^|" + nt + ")" + t + "(" + nt + "|$)")) && j(t, function (t) {
                        return e.test("string" == typeof t.className && t.className || "undefined" != typeof t.getAttribute && t.getAttribute("class") || "")
                    })
                }, ATTR: function (t, n, i) {
                    return function (o) {
                        var s = e.attr(o, t);
                        return null == s ? "!=" === n : !n || (s += "", "=" === n ? s === i : "!=" === n ? s !== i : "^=" === n ? i && 0 === s.indexOf(i) : "*=" === n ? i && s.indexOf(i) > -1 : "$=" === n ? i && s.slice(-i.length) === i : "~=" === n ? (" " + s.replace(at, " ") + " ").indexOf(i) > -1 : "|=" === n && (s === i || s.slice(0, i.length + 1) === i + "-"))
                    }
                }, CHILD: function (t, e, n, i, o) {
                    var s = "nth" !== t.slice(0, 3), a = "last" !== t.slice(-4), r = "of-type" === e;
                    return 1 === i && 0 === o ? function (t) {
                        return !!t.parentNode
                    } : function (e, n, c) {
                        var l, d, p, u, f, h, M = s !== a ? "nextSibling" : "previousSibling", b = e.parentNode,
                            m = r && e.nodeName.toLowerCase(), A = !c && !r, g = !1;
                        if (b) {
                            if (s) {
                                for (; M;) {
                                    for (u = e; u = u[M];) if (r ? u.nodeName.toLowerCase() === m : 1 === u.nodeType) return !1;
                                    h = M = "only" === t && !h && "nextSibling"
                                }
                                return !0
                            }
                            if (h = [a ? b.firstChild : b.lastChild], a && A) {
                                for (u = b, p = u[R] || (u[R] = {}), d = p[u.uniqueID] || (p[u.uniqueID] = {}), l = d[t] || [], f = l[0] === P && l[1], g = f && l[2], u = f && b.childNodes[f]; u = ++f && u && u[M] || (g = f = 0) || h.pop();) if (1 === u.nodeType && ++g && u === e) {
                                    d[t] = [P, f, g];
                                    break
                                }
                            } else if (A && (u = e, p = u[R] || (u[R] = {}), d = p[u.uniqueID] || (p[u.uniqueID] = {}), l = d[t] || [], f = l[0] === P && l[1], g = f), !1 === g) for (; (u = ++f && u && u[M] || (g = f = 0) || h.pop()) && ((r ? u.nodeName.toLowerCase() !== m : 1 !== u.nodeType) || !++g || (A && (p = u[R] || (u[R] = {}), d = p[u.uniqueID] || (p[u.uniqueID] = {}), d[t] = [P, g]), u !== e));) ;
                            return (g -= o) === i || g % i == 0 && g / i >= 0
                        }
                    }
                }, PSEUDO: function (t, n) {
                    var o, s = y.pseudos[t] || y.setFilters[t.toLowerCase()] || e.error("unsupported pseudo: " + t);
                    return s[R] ? s(n) : s.length > 1 ? (o = [t, t, "", n], y.setFilters.hasOwnProperty(t.toLowerCase()) ? i(function (t, e) {
                        for (var i, o = s(t, n), a = o.length; a--;) i = tt(t, o[a]), t[i] = !(e[i] = o[a])
                    }) : function (t) {
                        return s(t, 0, o)
                    }) : s
                }
            },
            pseudos: {
                not: i(function (t) {
                    var e = [], n = [], o = N(t.replace(rt, "$1"));
                    return o[R] ? i(function (t, e, n, i) {
                        for (var s, a = o(t, null, i, []), r = t.length; r--;) (s = a[r]) && (t[r] = !(e[r] = s))
                    }) : function (t, i, s) {
                        return e[0] = t, o(e, null, s, n), e[0] = null, !n.pop()
                    }
                }), has: i(function (t) {
                    return function (n) {
                        return e(t, n).length > 0
                    }
                }), contains: i(function (t) {
                    return t = t.replace(zt, vt), function (e) {
                        return (e.textContent || e.innerText || L(e)).indexOf(t) > -1
                    }
                }), lang: i(function (t) {
                    return ut.test(t || "") || e.error("unsupported lang: " + t), t = t.replace(zt, vt).toLowerCase(), function (e) {
                        var n;
                        do {
                            if (n = X ? e.lang : e.getAttribute("xml:lang") || e.getAttribute("lang")) return (n = n.toLowerCase()) === t || 0 === n.indexOf(t + "-")
                        } while ((e = e.parentNode) && 1 === e.nodeType);
                        return !1
                    }
                }), target: function (e) {
                    var n = t.location && t.location.hash;
                    return n && n.slice(1) === e.id
                }, root: function (t) {
                    return t === k
                }, focus: function (t) {
                    return t === x.activeElement && (!x.hasFocus || x.hasFocus()) && !!(t.type || t.href || ~t.tabIndex)
                }, enabled: function (t) {
                    return !1 === t.disabled
                }, disabled: function (t) {
                    return !0 === t.disabled
                }, checked: function (t) {
                    var e = t.nodeName.toLowerCase();
                    return "input" === e && !!t.checked || "option" === e && !!t.selected
                }, selected: function (t) {
                    return t.parentNode && t.parentNode.selectedIndex, !0 === t.selected
                }, empty: function (t) {
                    for (t = t.firstChild; t; t = t.nextSibling) if (t.nodeType < 6) return !1;
                    return !0
                }, parent: function (t) {
                    return !y.pseudos.empty(t)
                }, header: function (t) {
                    return Mt.test(t.nodeName)
                }, input: function (t) {
                    return ht.test(t.nodeName)
                }, button: function (t) {
                    var e = t.nodeName.toLowerCase();
                    return "input" === e && "button" === t.type || "button" === e
                }, text: function (t) {
                    var e;
                    return "input" === t.nodeName.toLowerCase() && "text" === t.type && (null == (e = t.getAttribute("type")) || "text" === e.toLowerCase())
                }, first: l(function () {
                    return [0]
                }), last: l(function (t, e) {
                    return [e - 1]
                }), eq: l(function (t, e, n) {
                    return [n < 0 ? n + e : n]
                }), even: l(function (t, e) {
                    for (var n = 0; n < e; n += 2) t.push(n);
                    return t
                }), odd: l(function (t, e) {
                    for (var n = 1; n < e; n += 2) t.push(n);
                    return t
                }), lt: l(function (t, e, n) {
                    for (var i = n < 0 ? n + e : n; --i >= 0;) t.push(i);
                    return t
                }), gt: l(function (t, e, n) {
                    for (var i = n < 0 ? n + e : n; ++i < e;) t.push(i);
                    return t
                })
            }
        }, y.pseudos.nth = y.pseudos.eq;
        for (z in{radio: !0, checkbox: !0, file: !0, password: !0, image: !0}) y.pseudos[z] = r(z);
        for (z in{submit: !0, reset: !0}) y.pseudos[z] = c(z);
        return p.prototype = y.filters = y.pseudos, y.setFilters = new p, T = e.tokenize = function (t, n) {
            var i, o, s, a, r, c, l, d = H[t + " "];
            if (d) return n ? 0 : d.slice(0);
            for (r = t, c = [], l = y.preFilter; r;) {
                i && !(o = ct.exec(r)) || (o && (r = r.slice(o[0].length) || r), c.push(s = [])), i = !1, (o = lt.exec(r)) && (i = o.shift(), s.push({
                    value: i,
                    type: o[0].replace(rt, " ")
                }), r = r.slice(i.length));
                for (a in y.filter) !(o = ft[a].exec(r)) || l[a] && !(o = l[a](o)) || (i = o.shift(), s.push({
                    value: i,
                    type: a,
                    matches: o
                }), r = r.slice(i.length));
                if (!i) break
            }
            return n ? r.length : r ? e.error(t) : H(t, c).slice(0)
        }, N = e.compile = function (t, e) {
            var n, i = [], o = [], s = F[t + " "];
            if (!s) {
                for (e || (e = T(t)), n = e.length; n--;) s = A(e[n]), s[R] ? i.push(s) : o.push(s);
                s = F(t, g(o, i)), s.selector = t
            }
            return s
        }, q = e.select = function (t, e, n, i) {
            var o, s, a, r, c, l = "function" == typeof t && t, p = !i && T(t = l.selector || t);
            if (n = n || [], 1 === p.length) {
                if (s = p[0] = p[0].slice(0), s.length > 2 && "ID" === (a = s[0]).type && v.getById && 9 === e.nodeType && X && y.relative[s[1].type]) {
                    if (!(e = (y.find.ID(a.matches[0].replace(zt, vt), e) || [])[0])) return n;
                    l && (e = e.parentNode), t = t.slice(s.shift().value.length)
                }
                for (o = ft.needsContext.test(t) ? 0 : s.length; o-- && (a = s[o], !y.relative[r = a.type]);) if ((c = y.find[r]) && (i = c(a.matches[0].replace(zt, vt), At.test(s[0].type) && d(e.parentNode) || e))) {
                    if (s.splice(o, 1), !(t = i.length && u(s))) return J.apply(n, i), n;
                    break
                }
            }
            return (l || N(t, p))(i, e, !X, n, !e || At.test(t) && d(e.parentNode) || e), n
        }, v.sortStable = R.split("").sort(U).join("") === R, v.detectDuplicates = !!C, W(), v.sortDetached = o(function (t) {
            return 1 & t.compareDocumentPosition(x.createElement("div"))
        }), o(function (t) {
            return t.innerHTML = "<a href='#'></a>", "#" === t.firstChild.getAttribute("href")
        }) || s("type|href|height|width", function (t, e, n) {
            if (!n) return t.getAttribute(e, "type" === e.toLowerCase() ? 1 : 2)
        }), v.attributes && o(function (t) {
            return t.innerHTML = "<input/>", t.firstChild.setAttribute("value", ""), "" === t.firstChild.getAttribute("value")
        }) || s("value", function (t, e, n) {
            if (!n && "input" === t.nodeName.toLowerCase()) return t.defaultValue
        }), o(function (t) {
            return null == t.getAttribute("disabled")
        }) || s(et, function (t, e, n) {
            var i;
            if (!n) return !0 === t[e] ? e.toLowerCase() : (i = t.getAttributeNode(e)) && i.specified ? i.value : null
        }), e
    }(t);
    ft.find = At, ft.expr = At.selectors, ft.expr[":"] = ft.expr.pseudos, ft.uniqueSort = ft.unique = At.uniqueSort, ft.text = At.getText, ft.isXMLDoc = At.isXML, ft.contains = At.contains;
    var gt = function (t, e, n) {
        for (var i = [], o = n !== undefined; (t = t[e]) && 9 !== t.nodeType;) if (1 === t.nodeType) {
            if (o && ft(t).is(n)) break;
            i.push(t)
        }
        return i
    }, zt = function (t, e) {
        for (var n = []; t; t = t.nextSibling) 1 === t.nodeType && t !== e && n.push(t);
        return n
    }, vt = ft.expr.match.needsContext, yt = /^<([\w-]+)\s*\/?>(?:<\/\1>|)$/, Lt = /^.[^:#\[\.,]*$/;
    ft.filter = function (t, e, n) {
        var i = e[0];
        return n && (t = ":not(" + t + ")"), 1 === e.length && 1 === i.nodeType ? ft.find.matchesSelector(i, t) ? [i] : [] : ft.find.matches(t, ft.grep(e, function (t) {
            return 1 === t.nodeType
        }))
    }, ft.fn.extend({
        find: function (t) {
            var e, n = [], i = this, o = i.length;
            if ("string" != typeof t) return this.pushStack(ft(t).filter(function () {
                for (e = 0; e < o; e++) if (ft.contains(i[e], this)) return !0
            }));
            for (e = 0; e < o; e++) ft.find(t, i[e], n);
            return n = this.pushStack(o > 1 ? ft.unique(n) : n), n.selector = this.selector ? this.selector + " " + t : t, n
        }, filter: function (t) {
            return this.pushStack(i(this, t || [], !1))
        }, not: function (t) {
            return this.pushStack(i(this, t || [], !0))
        }, is: function (t) {
            return !!i(this, "string" == typeof t && vt.test(t) ? ft(t) : t || [], !1).length
        }
    });
    var Ot, Tt = /^(?:\s*(<[\w\W]+>)[^>]*|#([\w-]*))$/;
    (ft.fn.init = function (t, e, n) {
        var i, o;
        if (!t) return this;
        if (n = n || Ot, "string" == typeof t) {
            if (!(i = "<" === t.charAt(0) && ">" === t.charAt(t.length - 1) && t.length >= 3 ? [null, t, null] : Tt.exec(t)) || !i[1] && e) return !e || e.jquery ? (e || n).find(t) : this.constructor(e).find(t);
            if (i[1]) {
                if (e = e instanceof ft ? e[0] : e, ft.merge(this, ft.parseHTML(i[1], e && e.nodeType ? e.ownerDocument || e : it, !0)), yt.test(i[1]) && ft.isPlainObject(e)) for (i in e) ft.isFunction(this[i]) ? this[i](e[i]) : this.attr(i, e[i]);
                return this
            }
            if ((o = it.getElementById(i[2])) && o.parentNode) {
                if (o.id !== i[2]) return Ot.find(t);
                this.length = 1, this[0] = o
            }
            return this.context = it, this.selector = t, this
        }
        return t.nodeType ? (this.context = this[0] = t, this.length = 1, this) : ft.isFunction(t) ? "undefined" != typeof n.ready ? n.ready(t) : t(ft) : (t.selector !== undefined && (this.selector = t.selector, this.context = t.context), ft.makeArray(t, this))
    }).prototype = ft.fn, Ot = ft(it);
    var Nt = /^(?:parents|prev(?:Until|All))/, qt = {children: !0, contents: !0, next: !0, prev: !0};
    ft.fn.extend({
        has: function (t) {
            var e, n = ft(t, this), i = n.length;
            return this.filter(function () {
                for (e = 0; e < i; e++) if (ft.contains(this, n[e])) return !0
            })
        }, closest: function (t, e) {
            for (var n, i = 0, o = this.length, s = [], a = vt.test(t) || "string" != typeof t ? ft(t, e || this.context) : 0; i < o; i++) for (n = this[i]; n && n !== e; n = n.parentNode) if (n.nodeType < 11 && (a ? a.index(n) > -1 : 1 === n.nodeType && ft.find.matchesSelector(n, t))) {
                s.push(n);
                break
            }
            return this.pushStack(s.length > 1 ? ft.uniqueSort(s) : s)
        }, index: function (t) {
            return t ? "string" == typeof t ? ft.inArray(this[0], ft(t)) : ft.inArray(t.jquery ? t[0] : t, this) : this[0] && this[0].parentNode ? this.first().prevAll().length : -1
        }, add: function (t, e) {
            return this.pushStack(ft.uniqueSort(ft.merge(this.get(), ft(t, e))))
        }, addBack: function (t) {
            return this.add(null == t ? this.prevObject : this.prevObject.filter(t))
        }
    }), ft.each({
        parent: function (t) {
            var e = t.parentNode;
            return e && 11 !== e.nodeType ? e : null
        }, parents: function (t) {
            return gt(t, "parentNode")
        }, parentsUntil: function (t, e, n) {
            return gt(t, "parentNode", n)
        }, next: function (t) {
            return o(t, "nextSibling")
        }, prev: function (t) {
            return o(t, "previousSibling")
        }, nextAll: function (t) {
            return gt(t, "nextSibling")
        }, prevAll: function (t) {
            return gt(t, "previousSibling")
        }, nextUntil: function (t, e, n) {
            return gt(t, "nextSibling", n)
        }, prevUntil: function (t, e, n) {
            return gt(t, "previousSibling", n)
        }, siblings: function (t) {
            return zt((t.parentNode || {}).firstChild, t)
        }, children: function (t) {
            return zt(t.firstChild)
        }, contents: function (t) {
            return ft.nodeName(t, "iframe") ? t.contentDocument || t.contentWindow.document : ft.merge([], t.childNodes)
        }
    }, function (t, e) {
        ft.fn[t] = function (n, i) {
            var o = ft.map(this, e, n);
            return "Until" !== t.slice(-5) && (i = n), i && "string" == typeof i && (o = ft.filter(i, o)), this.length > 1 && (qt[t] || (o = ft.uniqueSort(o)), Nt.test(t) && (o = o.reverse())), this.pushStack(o)
        }
    });
    var wt = /\S+/g;
    ft.Callbacks = function (t) {
        t = "string" == typeof t ? s(t) : ft.extend({}, t);
        var e, n, i, o, a = [], r = [], c = -1, l = function () {
            for (o = t.once, i = e = !0; r.length; c = -1) for (n = r.shift(); ++c < a.length;) !1 === a[c].apply(n[0], n[1]) && t.stopOnFalse && (c = a.length, n = !1);
            t.memory || (n = !1), e = !1, o && (a = n ? [] : "")
        }, d = {
            add: function () {
                return a && (n && !e && (c = a.length - 1, r.push(n)), function e(n) {
                    ft.each(n, function (n, i) {
                        ft.isFunction(i) ? t.unique && d.has(i) || a.push(i) : i && i.length && "string" !== ft.type(i) && e(i)
                    })
                }(arguments), n && !e && l()), this
            }, remove: function () {
                return ft.each(arguments, function (t, e) {
                    for (var n; (n = ft.inArray(e, a, n)) > -1;) a.splice(n, 1), n <= c && c--
                }), this
            }, has: function (t) {
                return t ? ft.inArray(t, a) > -1 : a.length > 0
            }, empty: function () {
                return a && (a = []), this
            }, disable: function () {
                return o = r = [], a = n = "", this
            }, disabled: function () {
                return !a
            }, lock: function () {
                return o = !0, n || d.disable(), this
            }, locked: function () {
                return !!o
            }, fireWith: function (t, n) {
                return o || (n = n || [], n = [t, n.slice ? n.slice() : n], r.push(n), e || l()), this
            }, fire: function () {
                return d.fireWith(this, arguments), this
            }, fired: function () {
                return !!i
            }
        };
        return d
    }, ft.extend({
        Deferred: function (t) {
            var e = [["resolve", "done", ft.Callbacks("once memory"), "resolved"], ["reject", "fail", ft.Callbacks("once memory"), "rejected"], ["notify", "progress", ft.Callbacks("memory")]],
                n = "pending", i = {
                    state: function () {
                        return n
                    }, always: function () {
                        return o.done(arguments).fail(arguments), this
                    }, then: function () {
                        var t = arguments;
                        return ft.Deferred(function (n) {
                            ft.each(e, function (e, s) {
                                var a = ft.isFunction(t[e]) && t[e];
                                o[s[1]](function () {
                                    var t = a && a.apply(this, arguments);
                                    t && ft.isFunction(t.promise) ? t.promise().progress(n.notify).done(n.resolve).fail(n.reject) : n[s[0] + "With"](this === i ? n.promise() : this, a ? [t] : arguments)
                                })
                            }), t = null
                        }).promise()
                    }, promise: function (t) {
                        return null != t ? ft.extend(t, i) : i
                    }
                }, o = {};
            return i.pipe = i.then, ft.each(e, function (t, s) {
                var a = s[2], r = s[3];
                i[s[1]] = a.add, r && a.add(function () {
                    n = r
                }, e[1 ^ t][2].disable, e[2][2].lock), o[s[0]] = function () {
                    return o[s[0] + "With"](this === o ? i : this, arguments), this
                }, o[s[0] + "With"] = a.fireWith
            }), i.promise(o), t && t.call(o, o), o
        }, when: function (t) {
            var e, n, i, o = 0, s = ot.call(arguments), a = s.length,
                r = 1 !== a || t && ft.isFunction(t.promise) ? a : 0, c = 1 === r ? t : ft.Deferred(),
                l = function (t, n, i) {
                    return function (o) {
                        n[t] = this, i[t] = arguments.length > 1 ? ot.call(arguments) : o, i === e ? c.notifyWith(n, i) : --r || c.resolveWith(n, i)
                    }
                };
            if (a > 1) for (e = new Array(a), n = new Array(a), i = new Array(a); o < a; o++) s[o] && ft.isFunction(s[o].promise) ? s[o].promise().progress(l(o, n, e)).done(l(o, i, s)).fail(c.reject) : --r;
            return r || c.resolveWith(i, s), c.promise()
        }
    });
    var St;
    ft.fn.ready = function (t) {
        return ft.ready.promise().done(t), this
    }, ft.extend({
        isReady: !1, readyWait: 1, holdReady: function (t) {
            t ? ft.readyWait++ : ft.ready(!0)
        }, ready: function (t) {
            (!0 === t ? --ft.readyWait : ft.isReady) || (ft.isReady = !0, !0 !== t && --ft.readyWait > 0 || (St.resolveWith(it, [ft]), ft.fn.triggerHandler && (ft(it).triggerHandler("ready"), ft(it).off("ready"))))
        }
    }), ft.ready.promise = function (e) {
        if (!St) if (St = ft.Deferred(), "complete" === it.readyState || "loading" !== it.readyState && !it.documentElement.doScroll) t.setTimeout(ft.ready); else if (it.addEventListener) it.addEventListener("DOMContentLoaded", r), t.addEventListener("load", r); else {
            it.attachEvent("onreadystatechange", r), t.attachEvent("onload", r);
            var n = !1;
            try {
                n = null == t.frameElement && it.documentElement
            } catch (t) {
            }
            n && n.doScroll && function e() {
                if (!ft.isReady) {
                    try {
                        n.doScroll("left")
                    } catch (n) {
                        return t.setTimeout(e, 50)
                    }
                    a(), ft.ready()
                }
            }()
        }
        return St.promise(e)
    }, ft.ready.promise();
    var Ct;
    for (Ct in ft(pt)) break;
    pt.ownFirst = "0" === Ct, pt.inlineBlockNeedsLayout = !1, ft(function () {
        var t, e, n, i;
        (n = it.getElementsByTagName("body")[0]) && n.style && (e = it.createElement("div"), i = it.createElement("div"), i.style.cssText = "position:absolute;border:0;width:0;height:0;top:0;left:-9999px", n.appendChild(i).appendChild(e), "undefined" != typeof e.style.zoom && (e.style.cssText = "display:inline;margin:0;border:0;padding:1px;width:1px;zoom:1", pt.inlineBlockNeedsLayout = t = 3 === e.offsetWidth, t && (n.style.zoom = 1)), n.removeChild(i))
    }), function () {
        var t = it.createElement("div");
        pt.deleteExpando = !0;
        try {
            delete t.test
        } catch (t) {
            pt.deleteExpando = !1
        }
        t = null
    }();
    var Wt = function (t) {
        var e = ft.noData[(t.nodeName + " ").toLowerCase()], n = +t.nodeType || 1;
        return (1 === n || 9 === n) && (!e || !0 !== e && t.getAttribute("classid") === e)
    }, xt = /^(?:\{[\w\W]*\}|\[[\w\W]*\])$/, kt = /([A-Z])/g;
    ft.extend({
        cache: {},
        noData: {"applet ": !0, "embed ": !0, "object ": "clsid:D27CDB6E-AE6D-11cf-96B8-444553540000"},
        hasData: function (t) {
            return !!(t = t.nodeType ? ft.cache[t[ft.expando]] : t[ft.expando]) && !l(t)
        },
        data: function (t, e, n) {
            return d(t, e, n)
        },
        removeData: function (t, e) {
            return p(t, e)
        },
        _data: function (t, e, n) {
            return d(t, e, n, !0)
        },
        _removeData: function (t, e) {
            return p(t, e, !0)
        }
    }), ft.fn.extend({
        data: function (t, e) {
            var n, i, o, s = this[0], a = s && s.attributes;
            if (t === undefined) {
                if (this.length && (o = ft.data(s), 1 === s.nodeType && !ft._data(s, "parsedAttrs"))) {
                    for (n = a.length; n--;) a[n] && (i = a[n].name, 0 === i.indexOf("data-") && (i = ft.camelCase(i.slice(5)), c(s, i, o[i])));
                    ft._data(s, "parsedAttrs", !0)
                }
                return o
            }
            return "object" == typeof t ? this.each(function () {
                ft.data(this, t)
            }) : arguments.length > 1 ? this.each(function () {
                ft.data(this, t, e)
            }) : s ? c(s, t, ft.data(s, t)) : undefined
        }, removeData: function (t) {
            return this.each(function () {
                ft.removeData(this, t)
            })
        }
    }), ft.extend({
        queue: function (t, e, n) {
            var i;
            if (t) return e = (e || "fx") + "queue", i = ft._data(t, e), n && (!i || ft.isArray(n) ? i = ft._data(t, e, ft.makeArray(n)) : i.push(n)), i || []
        }, dequeue: function (t, e) {
            e = e || "fx";
            var n = ft.queue(t, e), i = n.length, o = n.shift(), s = ft._queueHooks(t, e), a = function () {
                ft.dequeue(t, e)
            };
            "inprogress" === o && (o = n.shift(), i--), o && ("fx" === e && n.unshift("inprogress"), delete s.stop, o.call(t, a, s)), !i && s && s.empty.fire()
        }, _queueHooks: function (t, e) {
            var n = e + "queueHooks";
            return ft._data(t, n) || ft._data(t, n, {
                empty: ft.Callbacks("once memory").add(function () {
                    ft._removeData(t, e + "queue"), ft._removeData(t, n)
                })
            })
        }
    }), ft.fn.extend({
        queue: function (t, e) {
            var n = 2;
            return "string" != typeof t && (e = t, t = "fx", n--), arguments.length < n ? ft.queue(this[0], t) : e === undefined ? this : this.each(function () {
                var n = ft.queue(this, t, e);
                ft._queueHooks(this, t), "fx" === t && "inprogress" !== n[0] && ft.dequeue(this, t)
            })
        }, dequeue: function (t) {
            return this.each(function () {
                ft.dequeue(this, t)
            })
        }, clearQueue: function (t) {
            return this.queue(t || "fx", [])
        }, promise: function (t, e) {
            var n, i = 1, o = ft.Deferred(), s = this, a = this.length, r = function () {
                --i || o.resolveWith(s, [s])
            };
            for ("string" != typeof t && (e = t, t = undefined), t = t || "fx"; a--;) (n = ft._data(s[a], t + "queueHooks")) && n.empty && (i++, n.empty.add(r));
            return r(), o.promise(e)
        }
    }), function () {
        var t;
        pt.shrinkWrapBlocks = function () {
            if (null != t) return t;
            t = !1;
            var e, n, i;
            return (n = it.getElementsByTagName("body")[0]) && n.style ? (e = it.createElement("div"), i = it.createElement("div"), i.style.cssText = "position:absolute;border:0;width:0;height:0;top:0;left:-9999px", n.appendChild(i).appendChild(e), "undefined" != typeof e.style.zoom && (e.style.cssText = "-webkit-box-sizing:content-box;-moz-box-sizing:content-box;box-sizing:content-box;display:block;margin:0;border:0;padding:1px;width:1px;zoom:1", e.appendChild(it.createElement("div")).style.width = "5px", t = 3 !== e.offsetWidth), n.removeChild(i), t) : void 0
        }
    }();
    var Xt = /[+-]?(?:\d*\.|)\d+(?:[eE][+-]?\d+|)/.source, Et = new RegExp("^(?:([+-])=|)(" + Xt + ")([a-z%]*)$", "i"),
        Bt = ["Top", "Right", "Bottom", "Left"], _t = function (t, e) {
            return t = e || t, "none" === ft.css(t, "display") || !ft.contains(t.ownerDocument, t)
        }, Dt = function (t, e, n, i, o, s, a) {
            var r = 0, c = t.length, l = null == n;
            if ("object" === ft.type(n)) {
                o = !0;
                for (r in n) Dt(t, e, r, n[r], !0, s, a)
            } else if (i !== undefined && (o = !0, ft.isFunction(i) || (a = !0), l && (a ? (e.call(t, i), e = null) : (l = e, e = function (t, e, n) {
                    return l.call(ft(t), n)
                })), e)) for (; r < c; r++) e(t[r], n, a ? i : i.call(t[r], r, e(t[r], n)));
            return o ? t : l ? e.call(t) : c ? e(t[0], n) : s
        }, Rt = /^(?:checkbox|radio)$/i, $t = /<([\w:-]+)/, Pt = /^$|\/(?:java|ecma)script/i, It = /^\s+/,
        jt = "abbr|article|aside|audio|bdi|canvas|data|datalist|details|dialog|figcaption|figure|footer|header|hgroup|main|mark|meter|nav|output|picture|progress|section|summary|template|time|video";
    !function () {
        var t = it.createElement("div"), e = it.createDocumentFragment(), n = it.createElement("input");
        t.innerHTML = "  <link/><table></table><a href='/a'>a</a><input type='checkbox'/>", pt.leadingWhitespace = 3 === t.firstChild.nodeType, pt.tbody = !t.getElementsByTagName("tbody").length, pt.htmlSerialize = !!t.getElementsByTagName("link").length, pt.html5Clone = "<:nav></:nav>" !== it.createElement("nav").cloneNode(!0).outerHTML, n.type = "checkbox", n.checked = !0, e.appendChild(n), pt.appendChecked = n.checked, t.innerHTML = "<textarea>x</textarea>", pt.noCloneChecked = !!t.cloneNode(!0).lastChild.defaultValue, e.appendChild(t), n = it.createElement("input"), n.setAttribute("type", "radio"), n.setAttribute("checked", "checked"), n.setAttribute("name", "t"), t.appendChild(n), pt.checkClone = t.cloneNode(!0).cloneNode(!0).lastChild.checked, pt.noCloneEvent = !!t.addEventListener, t[ft.expando] = 1, pt.attributes = !t.getAttribute(ft.expando)
    }();
    var Ht = {
        option: [1, "<select multiple='multiple'>", "</select>"],
        legend: [1, "<fieldset>", "</fieldset>"],
        area: [1, "<map>", "</map>"],
        param: [1, "<object>", "</object>"],
        thead: [1, "<table>", "</table>"],
        tr: [2, "<table><tbody>", "</tbody></table>"],
        col: [2, "<table><tbody></tbody><colgroup>", "</colgroup></table>"],
        td: [3, "<table><tbody><tr>", "</tr></tbody></table>"],
        _default: pt.htmlSerialize ? [0, "", ""] : [1, "X<div>", "</div>"]
    };
    Ht.optgroup = Ht.option, Ht.tbody = Ht.tfoot = Ht.colgroup = Ht.caption = Ht.thead, Ht.th = Ht.td;
    var Ft = /<|&#?\w+;/, Ut = /<tbody/i;
    !function () {
        var e, n, i = it.createElement("div");
        for (e in{
            submit: !0,
            change: !0,
            focusin: !0
        }) n = "on" + e, (pt[e] = n in t) || (i.setAttribute(n, "t"), pt[e] = !1 === i.attributes[n].expando);
        i = null
    }();
    var Yt = /^(?:input|select|textarea)$/i, Vt = /^key/, Gt = /^(?:mouse|pointer|contextmenu|drag|drop)|click/,
        Kt = /^(?:focusinfocus|focusoutblur)$/, Qt = /^([^.]*)(?:\.(.+)|)/;
    ft.event = {
        global: {},
        add: function (t, e, n, i, o) {
            var s, a, r, c, l, d, p, u, f, h, M, b = ft._data(t);
            if (b) {
                for (n.handler && (c = n, n = c.handler, o = c.selector), n.guid || (n.guid = ft.guid++), (a = b.events) || (a = b.events = {}), (d = b.handle) || (d = b.handle = function (t) {
                    return void 0 === ft || t && ft.event.triggered === t.type ? undefined : ft.event.dispatch.apply(d.elem, arguments)
                }, d.elem = t), e = (e || "").match(wt) || [""], r = e.length; r--;) s = Qt.exec(e[r]) || [], f = M = s[1], h = (s[2] || "").split(".").sort(), f && (l = ft.event.special[f] || {}, f = (o ? l.delegateType : l.bindType) || f, l = ft.event.special[f] || {}, p = ft.extend({
                    type: f,
                    origType: M,
                    data: i,
                    handler: n,
                    guid: n.guid,
                    selector: o,
                    needsContext: o && ft.expr.match.needsContext.test(o),
                    namespace: h.join(".")
                }, c), (u = a[f]) || (u = a[f] = [], u.delegateCount = 0, l.setup && !1 !== l.setup.call(t, i, h, d) || (t.addEventListener ? t.addEventListener(f, d, !1) : t.attachEvent && t.attachEvent("on" + f, d))), l.add && (l.add.call(t, p), p.handler.guid || (p.handler.guid = n.guid)), o ? u.splice(u.delegateCount++, 0, p) : u.push(p), ft.event.global[f] = !0);
                t = null
            }
        },
        remove: function (t, e, n, i, o) {
            var s, a, r, c, l, d, p, u, f, h, M, b = ft.hasData(t) && ft._data(t);
            if (b && (d = b.events)) {
                for (e = (e || "").match(wt) || [""], l = e.length; l--;) if (r = Qt.exec(e[l]) || [], f = M = r[1], h = (r[2] || "").split(".").sort(), f) {
                    for (p = ft.event.special[f] || {}, f = (i ? p.delegateType : p.bindType) || f, u = d[f] || [], r = r[2] && new RegExp("(^|\\.)" + h.join("\\.(?:.*\\.|)") + "(\\.|$)"), c = s = u.length; s--;) a = u[s], !o && M !== a.origType || n && n.guid !== a.guid || r && !r.test(a.namespace) || i && i !== a.selector && ("**" !== i || !a.selector) || (u.splice(s, 1), a.selector && u.delegateCount--, p.remove && p.remove.call(t, a));
                    c && !u.length && (p.teardown && !1 !== p.teardown.call(t, h, b.handle) || ft.removeEvent(t, f, b.handle), delete d[f])
                } else for (f in d) ft.event.remove(t, f + e[l], n, i, !0);
                ft.isEmptyObject(d) && (delete b.handle, ft._removeData(t, "events"))
            }
        },
        trigger: function (e, n, i, o) {
            var s, a, r, c, l, d, p, u = [i || it], f = dt.call(e, "type") ? e.type : e,
                h = dt.call(e, "namespace") ? e.namespace.split(".") : [];
            if (r = d = i = i || it, 3 !== i.nodeType && 8 !== i.nodeType && !Kt.test(f + ft.event.triggered) && (f.indexOf(".") > -1 && (h = f.split("."), f = h.shift(), h.sort()), a = f.indexOf(":") < 0 && "on" + f, e = e[ft.expando] ? e : new ft.Event(f, "object" == typeof e && e), e.isTrigger = o ? 2 : 3, e.namespace = h.join("."), e.rnamespace = e.namespace ? new RegExp("(^|\\.)" + h.join("\\.(?:.*\\.|)") + "(\\.|$)") : null, e.result = undefined, e.target || (e.target = i), n = null == n ? [e] : ft.makeArray(n, [e]), l = ft.event.special[f] || {}, o || !l.trigger || !1 !== l.trigger.apply(i, n))) {
                if (!o && !l.noBubble && !ft.isWindow(i)) {
                    for (c = l.delegateType || f, Kt.test(c + f) || (r = r.parentNode); r; r = r.parentNode) u.push(r), d = r;
                    d === (i.ownerDocument || it) && u.push(d.defaultView || d.parentWindow || t)
                }
                for (p = 0; (r = u[p++]) && !e.isPropagationStopped();) e.type = p > 1 ? c : l.bindType || f, s = (ft._data(r, "events") || {})[e.type] && ft._data(r, "handle"), s && s.apply(r, n), (s = a && r[a]) && s.apply && Wt(r) && (e.result = s.apply(r, n), !1 === e.result && e.preventDefault());
                if (e.type = f, !o && !e.isDefaultPrevented() && (!l._default || !1 === l._default.apply(u.pop(), n)) && Wt(i) && a && i[f] && !ft.isWindow(i)) {
                    d = i[a], d && (i[a] = null), ft.event.triggered = f;
                    try {
                        i[f]()
                    } catch (t) {
                    }
                    ft.event.triggered = undefined, d && (i[a] = d)
                }
                return e.result
            }
        },
        dispatch: function (t) {
            t = ft.event.fix(t);
            var e, n, i, o, s, a = [], r = ot.call(arguments), c = (ft._data(this, "events") || {})[t.type] || [],
                l = ft.event.special[t.type] || {};
            if (r[0] = t, t.delegateTarget = this, !l.preDispatch || !1 !== l.preDispatch.call(this, t)) {
                for (a = ft.event.handlers.call(this, t, c), e = 0; (o = a[e++]) && !t.isPropagationStopped();) for (t.currentTarget = o.elem, n = 0; (s = o.handlers[n++]) && !t.isImmediatePropagationStopped();) t.rnamespace && !t.rnamespace.test(s.namespace) || (t.handleObj = s, t.data = s.data, (i = ((ft.event.special[s.origType] || {}).handle || s.handler).apply(o.elem, r)) !== undefined && !1 === (t.result = i) && (t.preventDefault(), t.stopPropagation()));
                return l.postDispatch && l.postDispatch.call(this, t), t.result
            }
        },
        handlers: function (t, e) {
            var n, i, o, s, a = [], r = e.delegateCount, c = t.target;
            if (r && c.nodeType && ("click" !== t.type || isNaN(t.button) || t.button < 1)) for (; c != this; c = c.parentNode || this) if (1 === c.nodeType && (!0 !== c.disabled || "click" !== t.type)) {
                for (i = [], n = 0; n < r; n++) s = e[n], o = s.selector + " ", i[o] === undefined && (i[o] = s.needsContext ? ft(o, this).index(c) > -1 : ft.find(o, this, null, [c]).length), i[o] && i.push(s);
                i.length && a.push({elem: c, handlers: i})
            }
            return r < e.length && a.push({elem: this, handlers: e.slice(r)}), a
        },
        fix: function (t) {
            if (t[ft.expando]) return t;
            var e, n, i, o = t.type, s = t, a = this.fixHooks[o];
            for (a || (this.fixHooks[o] = a = Gt.test(o) ? this.mouseHooks : Vt.test(o) ? this.keyHooks : {}), i = a.props ? this.props.concat(a.props) : this.props, t = new ft.Event(s), e = i.length; e--;) n = i[e], t[n] = s[n];
            return t.target || (t.target = s.srcElement || it), 3 === t.target.nodeType && (t.target = t.target.parentNode), t.metaKey = !!t.metaKey, a.filter ? a.filter(t, s) : t
        },
        props: "altKey bubbles cancelable ctrlKey currentTarget detail eventPhase metaKey relatedTarget shiftKey target timeStamp view which".split(" "),
        fixHooks: {},
        keyHooks: {
            props: "char charCode key keyCode".split(" "), filter: function (t, e) {
                return null == t.which && (t.which = null != e.charCode ? e.charCode : e.keyCode), t
            }
        },
        mouseHooks: {
            props: "button buttons clientX clientY fromElement offsetX offsetY pageX pageY screenX screenY toElement".split(" "),
            filter: function (t, e) {
                var n, i, o, s = e.button, a = e.fromElement;
                return null == t.pageX && null != e.clientX && (i = t.target.ownerDocument || it, o = i.documentElement, n = i.body, t.pageX = e.clientX + (o && o.scrollLeft || n && n.scrollLeft || 0) - (o && o.clientLeft || n && n.clientLeft || 0), t.pageY = e.clientY + (o && o.scrollTop || n && n.scrollTop || 0) - (o && o.clientTop || n && n.clientTop || 0)), !t.relatedTarget && a && (t.relatedTarget = a === t.target ? e.toElement : a), t.which || s === undefined || (t.which = 1 & s ? 1 : 2 & s ? 3 : 4 & s ? 2 : 0), t
            }
        },
        special: {
            load: {noBubble: !0}, focus: {
                trigger: function () {
                    if (this !== z() && this.focus) try {
                        return this.focus(), !1
                    } catch (t) {
                    }
                }, delegateType: "focusin"
            }, blur: {
                trigger: function () {
                    if (this === z() && this.blur) return this.blur(), !1
                }, delegateType: "focusout"
            }, click: {
                trigger: function () {
                    if (ft.nodeName(this, "input") && "checkbox" === this.type && this.click) return this.click(), !1
                }, _default: function (t) {
                    return ft.nodeName(t.target, "a")
                }
            }, beforeunload: {
                postDispatch: function (t) {
                    t.result !== undefined && t.originalEvent && (t.originalEvent.returnValue = t.result)
                }
            }
        },
        simulate: function (t, e, n) {
            var i = ft.extend(new ft.Event, n, {type: t, isSimulated: !0});
            ft.event.trigger(i, null, e), i.isDefaultPrevented() && n.preventDefault()
        }
    }, ft.removeEvent = it.removeEventListener ? function (t, e, n) {
        t.removeEventListener && t.removeEventListener(e, n)
    } : function (t, e, n) {
        var i = "on" + e;
        t.detachEvent && ("undefined" == typeof t[i] && (t[i] = null), t.detachEvent(i, n))
    }, ft.Event = function (t, e) {
        if (!(this instanceof ft.Event)) return new ft.Event(t, e);
        t && t.type ? (this.originalEvent = t, this.type = t.type, this.isDefaultPrevented = t.defaultPrevented || t.defaultPrevented === undefined && !1 === t.returnValue ? A : g) : this.type = t, e && ft.extend(this, e), this.timeStamp = t && t.timeStamp || ft.now(), this[ft.expando] = !0
    }, ft.Event.prototype = {
        constructor: ft.Event,
        isDefaultPrevented: g,
        isPropagationStopped: g,
        isImmediatePropagationStopped: g,
        preventDefault: function () {
            var t = this.originalEvent;
            this.isDefaultPrevented = A, t && (t.preventDefault ? t.preventDefault() : t.returnValue = !1)
        },
        stopPropagation: function () {
            var t = this.originalEvent;
            this.isPropagationStopped = A, t && !this.isSimulated && (t.stopPropagation && t.stopPropagation(), t.cancelBubble = !0)
        },
        stopImmediatePropagation: function () {
            var t = this.originalEvent;
            this.isImmediatePropagationStopped = A, t && t.stopImmediatePropagation && t.stopImmediatePropagation(), this.stopPropagation()
        }
    }, ft.each({
        mouseenter: "mouseover",
        mouseleave: "mouseout",
        pointerenter: "pointerover",
        pointerleave: "pointerout"
    }, function (t, e) {
        ft.event.special[t] = {
            delegateType: e, bindType: e, handle: function (t) {
                var n, i = this, o = t.relatedTarget, s = t.handleObj;
                return o && (o === i || ft.contains(i, o)) || (t.type = s.origType, n = s.handler.apply(this, arguments), t.type = e), n
            }
        }
    }), pt.submit || (ft.event.special.submit = {
        setup: function () {
            if (ft.nodeName(this, "form")) return !1;
            ft.event.add(this, "click._submit keypress._submit", function (t) {
                var e = t.target,
                    n = ft.nodeName(e, "input") || ft.nodeName(e, "button") ? ft.prop(e, "form") : undefined;
                n && !ft._data(n, "submit") && (ft.event.add(n, "submit._submit", function (t) {
                    t._submitBubble = !0
                }), ft._data(n, "submit", !0))
            })
        }, postDispatch: function (t) {
            t._submitBubble && (delete t._submitBubble, this.parentNode && !t.isTrigger && ft.event.simulate("submit", this.parentNode, t))
        }, teardown: function () {
            if (ft.nodeName(this, "form")) return !1;
            ft.event.remove(this, "._submit")
        }
    }), pt.change || (ft.event.special.change = {
        setup: function () {
            if (Yt.test(this.nodeName)) return "checkbox" !== this.type && "radio" !== this.type || (ft.event.add(this, "propertychange._change", function (t) {
                "checked" === t.originalEvent.propertyName && (this._justChanged = !0)
            }), ft.event.add(this, "click._change", function (t) {
                this._justChanged && !t.isTrigger && (this._justChanged = !1), ft.event.simulate("change", this, t)
            })), !1;
            ft.event.add(this, "beforeactivate._change", function (t) {
                var e = t.target;
                Yt.test(e.nodeName) && !ft._data(e, "change") && (ft.event.add(e, "change._change", function (t) {
                    !this.parentNode || t.isSimulated || t.isTrigger || ft.event.simulate("change", this.parentNode, t)
                }), ft._data(e, "change", !0))
            })
        }, handle: function (t) {
            var e = t.target;
            if (this !== e || t.isSimulated || t.isTrigger || "radio" !== e.type && "checkbox" !== e.type) return t.handleObj.handler.apply(this, arguments)
        }, teardown: function () {
            return ft.event.remove(this, "._change"), !Yt.test(this.nodeName)
        }
    }), pt.focusin || ft.each({focus: "focusin", blur: "focusout"}, function (t, e) {
        var n = function (t) {
            ft.event.simulate(e, t.target, ft.event.fix(t))
        };
        ft.event.special[e] = {
            setup: function () {
                var i = this.ownerDocument || this, o = ft._data(i, e);
                o || i.addEventListener(t, n, !0), ft._data(i, e, (o || 0) + 1)
            }, teardown: function () {
                var i = this.ownerDocument || this, o = ft._data(i, e) - 1;
                o ? ft._data(i, e, o) : (i.removeEventListener(t, n, !0), ft._removeData(i, e))
            }
        }
    }), ft.fn.extend({
        on: function (t, e, n, i) {
            return v(this, t, e, n, i)
        }, one: function (t, e, n, i) {
            return v(this, t, e, n, i, 1)
        }, off: function (t, e, n) {
            var i, o;
            if (t && t.preventDefault && t.handleObj) return i = t.handleObj, ft(t.delegateTarget).off(i.namespace ? i.origType + "." + i.namespace : i.origType, i.selector, i.handler), this;
            if ("object" == typeof t) {
                for (o in t) this.off(o, e, t[o]);
                return this
            }
            return !1 !== e && "function" != typeof e || (n = e, e = undefined), !1 === n && (n = g), this.each(function () {
                ft.event.remove(this, t, n, e)
            })
        }, trigger: function (t, e) {
            return this.each(function () {
                ft.event.trigger(t, e, this)
            })
        }, triggerHandler: function (t, e) {
            var n = this[0];
            if (n) return ft.event.trigger(t, e, n, !0)
        }
    });
    var Jt = / jQuery\d+="(?:null|\d+)"/g, Zt = new RegExp("<(?:" + jt + ")[\\s/>]", "i"),
        te = /<(?!area|br|col|embed|hr|img|input|link|meta|param)(([\w:-]+)[^>]*)\/>/gi, ee = /<script|<style|<link/i,
        ne = /checked\s*(?:[^=]|=\s*.checked.)/i, ie = /^true\/(.*)/, oe = /^\s*<!(?:\[CDATA\[|--)|(?:\]\]|--)>\s*$/g,
        se = f(it), ae = se.appendChild(it.createElement("div"));
    ft.extend({
        htmlPrefilter: function (t) {
            return t.replace(te, "<$1></$2>")
        }, clone: function (t, e, n) {
            var i, o, s, a, r, c = ft.contains(t.ownerDocument, t);
            if (pt.html5Clone || ft.isXMLDoc(t) || !Zt.test("<" + t.nodeName + ">") ? s = t.cloneNode(!0) : (ae.innerHTML = t.outerHTML, ae.removeChild(s = ae.firstChild)), !(pt.noCloneEvent && pt.noCloneChecked || 1 !== t.nodeType && 11 !== t.nodeType || ft.isXMLDoc(t))) for (i = h(s), r = h(t), a = 0; null != (o = r[a]); ++a) i[a] && N(o, i[a]);
            if (e) if (n) for (r = r || h(t), i = i || h(s), a = 0; null != (o = r[a]); a++) T(o, i[a]); else T(t, s);
            return i = h(s, "script"), i.length > 0 && M(i, !c && h(t, "script")), i = r = o = null, s
        }, cleanData: function (t, e) {
            for (var n, i, o, s, a = 0, r = ft.expando, c = ft.cache, l = pt.attributes, d = ft.event.special; null != (n = t[a]); a++) if ((e || Wt(n)) && (o = n[r], s = o && c[o])) {
                if (s.events) for (i in s.events) d[i] ? ft.event.remove(n, i) : ft.removeEvent(n, i, s.handle);
                c[o] && (delete c[o], l || "undefined" == typeof n.removeAttribute ? n[r] = undefined : n.removeAttribute(r), nt.push(o))
            }
        }
    }), ft.fn.extend({
        domManip: q, detach: function (t) {
            return w(this, t, !0)
        }, remove: function (t) {
            return w(this, t)
        }, text: function (t) {
            return Dt(this, function (t) {
                return t === undefined ? ft.text(this) : this.empty().append((this[0] && this[0].ownerDocument || it).createTextNode(t))
            }, null, t, arguments.length)
        }, append: function () {
            return q(this, arguments, function (t) {
                if (1 === this.nodeType || 11 === this.nodeType || 9 === this.nodeType) {
                    y(this, t).appendChild(t)
                }
            })
        }, prepend: function () {
            return q(this, arguments, function (t) {
                if (1 === this.nodeType || 11 === this.nodeType || 9 === this.nodeType) {
                    var e = y(this, t);
                    e.insertBefore(t, e.firstChild)
                }
            })
        }, before: function () {
            return q(this, arguments, function (t) {
                this.parentNode && this.parentNode.insertBefore(t, this)
            })
        }, after: function () {
            return q(this, arguments, function (t) {
                this.parentNode && this.parentNode.insertBefore(t, this.nextSibling)
            })
        }, empty: function () {
            for (var t, e = 0; null != (t = this[e]); e++) {
                for (1 === t.nodeType && ft.cleanData(h(t, !1)); t.firstChild;) t.removeChild(t.firstChild);
                t.options && ft.nodeName(t, "select") && (t.options.length = 0)
            }
            return this
        }, clone: function (t, e) {
            return t = null != t && t, e = null == e ? t : e, this.map(function () {
                return ft.clone(this, t, e)
            })
        }, html: function (t) {
            return Dt(this, function (t) {
                var e = this[0] || {}, n = 0, i = this.length;
                if (t === undefined) return 1 === e.nodeType ? e.innerHTML.replace(Jt, "") : undefined;
                if ("string" == typeof t && !ee.test(t) && (pt.htmlSerialize || !Zt.test(t)) && (pt.leadingWhitespace || !It.test(t)) && !Ht[($t.exec(t) || ["", ""])[1].toLowerCase()]) {
                    t = ft.htmlPrefilter(t);
                    try {
                        for (; n < i; n++) e = this[n] || {}, 1 === e.nodeType && (ft.cleanData(h(e, !1)), e.innerHTML = t);
                        e = 0
                    } catch (t) {
                    }
                }
                e && this.empty().append(t)
            }, null, t, arguments.length)
        }, replaceWith: function () {
            var t = [];
            return q(this, arguments, function (e) {
                var n = this.parentNode;
                ft.inArray(this, t) < 0 && (ft.cleanData(h(this)), n && n.replaceChild(e, this))
            }, t)
        }
    }), ft.each({
        appendTo: "append",
        prependTo: "prepend",
        insertBefore: "before",
        insertAfter: "after",
        replaceAll: "replaceWith"
    }, function (t, e) {
        ft.fn[t] = function (t) {
            for (var n, i = 0, o = [], s = ft(t), a = s.length - 1; i <= a; i++) n = i === a ? this : this.clone(!0), ft(s[i])[e](n), at.apply(o, n.get());
            return this.pushStack(o)
        }
    });
    var re, ce = {HTML: "block", BODY: "block"}, le = /^margin/, de = new RegExp("^(" + Xt + ")(?!px)[a-z%]+$", "i"),
        pe = function (t, e, n, i) {
            var o, s, a = {};
            for (s in e) a[s] = t.style[s], t.style[s] = e[s];
            o = n.apply(t, i || []);
            for (s in e) t.style[s] = a[s];
            return o
        }, ue = it.documentElement;
    !function () {
        function e() {
            var e, d, p = it.documentElement;
            p.appendChild(c), l.style.cssText = "-webkit-box-sizing:border-box;box-sizing:border-box;position:relative;display:block;margin:auto;border:1px;padding:1px;top:1%;width:50%", n = o = r = !1, i = a = !0, t.getComputedStyle && (d = t.getComputedStyle(l), n = "1%" !== (d || {}).top, r = "2px" === (d || {}).marginLeft, o = "4px" === (d || {width: "4px"}).width, l.style.marginRight = "50%", i = "4px" === (d || {marginRight: "4px"}).marginRight, e = l.appendChild(it.createElement("div")), e.style.cssText = l.style.cssText = "-webkit-box-sizing:content-box;-moz-box-sizing:content-box;box-sizing:content-box;display:block;margin:0;border:0;padding:0", e.style.marginRight = e.style.width = "0", l.style.width = "1px", a = !parseFloat((t.getComputedStyle(e) || {}).marginRight), l.removeChild(e)), l.style.display = "none", s = 0 === l.getClientRects().length, s && (l.style.display = "", l.innerHTML = "<table><tr><td></td><td>t</td></tr></table>", l.childNodes[0].style.borderCollapse = "separate", e = l.getElementsByTagName("td"), e[0].style.cssText = "margin:0;border:0;padding:0;display:none", (s = 0 === e[0].offsetHeight) && (e[0].style.display = "", e[1].style.display = "none", s = 0 === e[0].offsetHeight)), p.removeChild(c)
        }

        var n, i, o, s, a, r, c = it.createElement("div"), l = it.createElement("div");
        l.style && (l.style.cssText = "float:left;opacity:.5", pt.opacity = "0.5" === l.style.opacity, pt.cssFloat = !!l.style.cssFloat, l.style.backgroundClip = "content-box", l.cloneNode(!0).style.backgroundClip = "", pt.clearCloneStyle = "content-box" === l.style.backgroundClip, c = it.createElement("div"), c.style.cssText = "border:0;width:8px;height:0;top:0;left:-9999px;padding:0;margin-top:1px;position:absolute", l.innerHTML = "", c.appendChild(l), pt.boxSizing = "" === l.style.boxSizing || "" === l.style.MozBoxSizing || "" === l.style.WebkitBoxSizing, ft.extend(pt, {
            reliableHiddenOffsets: function () {
                return null == n && e(), s
            }, boxSizingReliable: function () {
                return null == n && e(), o
            }, pixelMarginRight: function () {
                return null == n && e(), i
            }, pixelPosition: function () {
                return null == n && e(), n
            }, reliableMarginRight: function () {
                return null == n && e(), a
            }, reliableMarginLeft: function () {
                return null == n && e(), r
            }
        }))
    }();
    var fe, he, Me = /^(top|right|bottom|left)$/;
    t.getComputedStyle ? (fe = function (e) {
        var n = e.ownerDocument.defaultView;
        return n && n.opener || (n = t), n.getComputedStyle(e)
    }, he = function (t, e, n) {
        var i, o, s, a, r = t.style;
        return n = n || fe(t), a = n ? n.getPropertyValue(e) || n[e] : undefined, "" !== a && a !== undefined || ft.contains(t.ownerDocument, t) || (a = ft.style(t, e)), n && !pt.pixelMarginRight() && de.test(a) && le.test(e) && (i = r.width, o = r.minWidth, s = r.maxWidth, r.minWidth = r.maxWidth = r.width = a, a = n.width, r.width = i, r.minWidth = o, r.maxWidth = s), a === undefined ? a : a + ""
    }) : ue.currentStyle && (fe = function (t) {
        return t.currentStyle
    }, he = function (t, e, n) {
        var i, o, s, a, r = t.style;
        return n = n || fe(t), a = n ? n[e] : undefined, null == a && r && r[e] && (a = r[e]), de.test(a) && !Me.test(e) && (i = r.left, o = t.runtimeStyle, s = o && o.left, s && (o.left = t.currentStyle.left), r.left = "fontSize" === e ? "1em" : a, a = r.pixelLeft + "px", r.left = i, s && (o.left = s)), a === undefined ? a : a + "" || "auto"
    });
    var be = /alpha\([^)]*\)/i, me = /opacity\s*=\s*([^)]*)/i, Ae = /^(none|table(?!-c[ea]).+)/,
        ge = new RegExp("^(" + Xt + ")(.*)$", "i"), ze = {position: "absolute", visibility: "hidden", display: "block"},
        ve = {letterSpacing: "0", fontWeight: "400"}, ye = ["Webkit", "O", "Moz", "ms"],
        Le = it.createElement("div").style;
    ft.extend({
        cssHooks: {
            opacity: {
                get: function (t, e) {
                    if (e) {
                        var n = he(t, "opacity");
                        return "" === n ? "1" : n
                    }
                }
            }
        },
        cssNumber: {
            animationIterationCount: !0,
            columnCount: !0,
            fillOpacity: !0,
            flexGrow: !0,
            flexShrink: !0,
            fontWeight: !0,
            lineHeight: !0,
            opacity: !0,
            order: !0,
            orphans: !0,
            widows: !0,
            zIndex: !0,
            zoom: !0
        },
        cssProps: {"float": pt.cssFloat ? "cssFloat" : "styleFloat"},
        style: function (t, e, n, i) {
            if (t && 3 !== t.nodeType && 8 !== t.nodeType && t.style) {
                var o, s, a, r = ft.camelCase(e), c = t.style;
                if (e = ft.cssProps[r] || (ft.cssProps[r] = x(r) || r), a = ft.cssHooks[e] || ft.cssHooks[r], n === undefined) return a && "get" in a && (o = a.get(t, !1, i)) !== undefined ? o : c[e];
                if (s = typeof n, "string" === s && (o = Et.exec(n)) && o[1] && (n = u(t, e, o), s = "number"), null != n && n === n && ("number" === s && (n += o && o[3] || (ft.cssNumber[r] ? "" : "px")), pt.clearCloneStyle || "" !== n || 0 !== e.indexOf("background") || (c[e] = "inherit"), !(a && "set" in a && (n = a.set(t, n, i)) === undefined))) try {
                    c[e] = n
                } catch (t) {
                }
            }
        },
        css: function (t, e, n, i) {
            var o, s, a, r = ft.camelCase(e);
            return e = ft.cssProps[r] || (ft.cssProps[r] = x(r) || r), a = ft.cssHooks[e] || ft.cssHooks[r], a && "get" in a && (s = a.get(t, !0, n)), s === undefined && (s = he(t, e, i)), "normal" === s && e in ve && (s = ve[e]), "" === n || n ? (o = parseFloat(s), !0 === n || isFinite(o) ? o || 0 : s) : s
        }
    }), ft.each(["height", "width"], function (t, e) {
        ft.cssHooks[e] = {
            get: function (t, n, i) {
                if (n) return Ae.test(ft.css(t, "display")) && 0 === t.offsetWidth ? pe(t, ze, function () {
                    return B(t, e, i)
                }) : B(t, e, i)
            }, set: function (t, n, i) {
                var o = i && fe(t);
                return X(t, n, i ? E(t, e, i, pt.boxSizing && "border-box" === ft.css(t, "boxSizing", !1, o), o) : 0)
            }
        }
    }), pt.opacity || (ft.cssHooks.opacity = {
        get: function (t, e) {
            return me.test((e && t.currentStyle ? t.currentStyle.filter : t.style.filter) || "") ? .01 * parseFloat(RegExp.$1) + "" : e ? "1" : ""
        }, set: function (t, e) {
            var n = t.style, i = t.currentStyle, o = ft.isNumeric(e) ? "alpha(opacity=" + 100 * e + ")" : "",
                s = i && i.filter || n.filter || "";
            n.zoom = 1, (e >= 1 || "" === e) && "" === ft.trim(s.replace(be, "")) && n.removeAttribute && (n.removeAttribute("filter"), "" === e || i && !i.filter) || (n.filter = be.test(s) ? s.replace(be, o) : s + " " + o)
        }
    }), ft.cssHooks.marginRight = W(pt.reliableMarginRight, function (t, e) {
        if (e) return pe(t, {display: "inline-block"}, he, [t, "marginRight"])
    }), ft.cssHooks.marginLeft = W(pt.reliableMarginLeft, function (t, e) {
        if (e) return (parseFloat(he(t, "marginLeft")) || (ft.contains(t.ownerDocument, t) ? t.getBoundingClientRect().left - pe(t, {marginLeft: 0}, function () {
            return t.getBoundingClientRect().left
        }) : 0)) + "px"
    }), ft.each({margin: "", padding: "", border: "Width"}, function (t, e) {
        ft.cssHooks[t + e] = {
            expand: function (n) {
                for (var i = 0, o = {}, s = "string" == typeof n ? n.split(" ") : [n]; i < 4; i++) o[t + Bt[i] + e] = s[i] || s[i - 2] || s[0];
                return o
            }
        }, le.test(t) || (ft.cssHooks[t + e].set = X)
    }), ft.fn.extend({
        css: function (t, e) {
            return Dt(this, function (t, e, n) {
                var i, o, s = {}, a = 0;
                if (ft.isArray(e)) {
                    for (i = fe(t), o = e.length; a < o; a++) s[e[a]] = ft.css(t, e[a], !1, i);
                    return s
                }
                return n !== undefined ? ft.style(t, e, n) : ft.css(t, e)
            }, t, e, arguments.length > 1)
        }, show: function () {
            return k(this, !0)
        }, hide: function () {
            return k(this)
        }, toggle: function (t) {
            return "boolean" == typeof t ? t ? this.show() : this.hide() : this.each(function () {
                _t(this) ? ft(this).show() : ft(this).hide()
            })
        }
    }), ft.Tween = _, _.prototype = {
        constructor: _, init: function (t, e, n, i, o, s) {
            this.elem = t, this.prop = n, this.easing = o || ft.easing._default, this.options = e, this.start = this.now = this.cur(), this.end = i, this.unit = s || (ft.cssNumber[n] ? "" : "px")
        }, cur: function () {
            var t = _.propHooks[this.prop];
            return t && t.get ? t.get(this) : _.propHooks._default.get(this)
        }, run: function (t) {
            var e, n = _.propHooks[this.prop];
            return this.options.duration ? this.pos = e = ft.easing[this.easing](t, this.options.duration * t, 0, 1, this.options.duration) : this.pos = e = t, this.now = (this.end - this.start) * e + this.start, this.options.step && this.options.step.call(this.elem, this.now, this), n && n.set ? n.set(this) : _.propHooks._default.set(this), this
        }
    }, _.prototype.init.prototype = _.prototype, _.propHooks = {
        _default: {
            get: function (t) {
                var e;
                return 1 !== t.elem.nodeType || null != t.elem[t.prop] && null == t.elem.style[t.prop] ? t.elem[t.prop] : (e = ft.css(t.elem, t.prop, ""), e && "auto" !== e ? e : 0)
            }, set: function (t) {
                ft.fx.step[t.prop] ? ft.fx.step[t.prop](t) : 1 !== t.elem.nodeType || null == t.elem.style[ft.cssProps[t.prop]] && !ft.cssHooks[t.prop] ? t.elem[t.prop] = t.now : ft.style(t.elem, t.prop, t.now + t.unit)
            }
        }
    }, _.propHooks.scrollTop = _.propHooks.scrollLeft = {
        set: function (t) {
            t.elem.nodeType && t.elem.parentNode && (t.elem[t.prop] = t.now)
        }
    }, ft.easing = {
        linear: function (t) {
            return t
        }, swing: function (t) {
            return .5 - Math.cos(t * Math.PI) / 2
        }, _default: "swing"
    }, ft.fx = _.prototype.init, ft.fx.step = {};
    var Oe, Te, Ne = /^(?:toggle|show|hide)$/, qe = /queueHooks$/;
    ft.Animation = ft.extend(j, {
        tweeners: {
            "*": [function (t, e) {
                var n = this.createTween(t, e);
                return u(n.elem, t, Et.exec(e), n), n
            }]
        }, tweener: function (t, e) {
            ft.isFunction(t) ? (e = t, t = ["*"]) : t = t.match(wt);
            for (var n, i = 0, o = t.length; i < o; i++) n = t[i], j.tweeners[n] = j.tweeners[n] || [], j.tweeners[n].unshift(e)
        }, prefilters: [P], prefilter: function (t, e) {
            e ? j.prefilters.unshift(t) : j.prefilters.push(t)
        }
    }), ft.speed = function (t, e, n) {
        var i = t && "object" == typeof t ? ft.extend({}, t) : {
            complete: n || !n && e || ft.isFunction(t) && t,
            duration: t,
            easing: n && e || e && !ft.isFunction(e) && e
        };
        return i.duration = ft.fx.off ? 0 : "number" == typeof i.duration ? i.duration : i.duration in ft.fx.speeds ? ft.fx.speeds[i.duration] : ft.fx.speeds._default, null != i.queue && !0 !== i.queue || (i.queue = "fx"), i.old = i.complete, i.complete = function () {
            ft.isFunction(i.old) && i.old.call(this), i.queue && ft.dequeue(this, i.queue)
        }, i
    }, ft.fn.extend({
        fadeTo: function (t, e, n, i) {
            return this.filter(_t).css("opacity", 0).show().end().animate({opacity: e}, t, n, i)
        }, animate: function (t, e, n, i) {
            var o = ft.isEmptyObject(t), s = ft.speed(e, n, i), a = function () {
                var e = j(this, ft.extend({}, t), s);
                (o || ft._data(this, "finish")) && e.stop(!0)
            };
            return a.finish = a, o || !1 === s.queue ? this.each(a) : this.queue(s.queue, a)
        }, stop: function (t, e, n) {
            var i = function (t) {
                var e = t.stop;
                delete t.stop, e(n)
            };
            return "string" != typeof t && (n = e, e = t, t = undefined), e && !1 !== t && this.queue(t || "fx", []), this.each(function () {
                var e = !0, o = null != t && t + "queueHooks", s = ft.timers, a = ft._data(this);
                if (o) a[o] && a[o].stop && i(a[o]); else for (o in a) a[o] && a[o].stop && qe.test(o) && i(a[o]);
                for (o = s.length; o--;) s[o].elem !== this || null != t && s[o].queue !== t || (s[o].anim.stop(n), e = !1, s.splice(o, 1));
                !e && n || ft.dequeue(this, t)
            })
        }, finish: function (t) {
            return !1 !== t && (t = t || "fx"), this.each(function () {
                var e, n = ft._data(this), i = n[t + "queue"], o = n[t + "queueHooks"], s = ft.timers,
                    a = i ? i.length : 0;
                for (n.finish = !0, ft.queue(this, t, []), o && o.stop && o.stop.call(this, !0), e = s.length; e--;) s[e].elem === this && s[e].queue === t && (s[e].anim.stop(!0), s.splice(e, 1));
                for (e = 0; e < a; e++) i[e] && i[e].finish && i[e].finish.call(this);
                delete n.finish
            })
        }
    }), ft.each(["toggle", "show", "hide"], function (t, e) {
        var n = ft.fn[e];
        ft.fn[e] = function (t, i, o) {
            return null == t || "boolean" == typeof t ? n.apply(this, arguments) : this.animate(R(e, !0), t, i, o)
        }
    }), ft.each({
        slideDown: R("show"),
        slideUp: R("hide"),
        slideToggle: R("toggle"),
        fadeIn: {opacity: "show"},
        fadeOut: {opacity: "hide"},
        fadeToggle: {opacity: "toggle"}
    }, function (t, e) {
        ft.fn[t] = function (t, n, i) {
            return this.animate(e, t, n, i)
        }
    }), ft.timers = [], ft.fx.tick = function () {
        var t, e = ft.timers, n = 0;
        for (Oe = ft.now(); n < e.length; n++) (t = e[n])() || e[n] !== t || e.splice(n--, 1);
        e.length || ft.fx.stop(), Oe = undefined
    }, ft.fx.timer = function (t) {
        ft.timers.push(t), t() ? ft.fx.start() : ft.timers.pop()
    }, ft.fx.interval = 13, ft.fx.start = function () {
        Te || (Te = t.setInterval(ft.fx.tick, ft.fx.interval))
    }, ft.fx.stop = function () {
        t.clearInterval(Te), Te = null
    }, ft.fx.speeds = {slow: 600, fast: 200, _default: 400}, ft.fn.delay = function (e, n) {
        return e = ft.fx ? ft.fx.speeds[e] || e : e, n = n || "fx", this.queue(n, function (n, i) {
            var o = t.setTimeout(n, e);
            i.stop = function () {
                t.clearTimeout(o)
            }
        })
    }, function () {
        var t, e = it.createElement("input"), n = it.createElement("div"), i = it.createElement("select"),
            o = i.appendChild(it.createElement("option"));
        n = it.createElement("div"), n.setAttribute("className", "t"), n.innerHTML = "  <link/><table></table><a href='/a'>a</a><input type='checkbox'/>", t = n.getElementsByTagName("a")[0], e.setAttribute("type", "checkbox"), n.appendChild(e), t = n.getElementsByTagName("a")[0], t.style.cssText = "top:1px", pt.getSetAttribute = "t" !== n.className, pt.style = /top/.test(t.getAttribute("style")), pt.hrefNormalized = "/a" === t.getAttribute("href"), pt.checkOn = !!e.value, pt.optSelected = o.selected, pt.enctype = !!it.createElement("form").enctype, i.disabled = !0, pt.optDisabled = !o.disabled, e = it.createElement("input"), e.setAttribute("value", ""), pt.input = "" === e.getAttribute("value"), e.value = "t", e.setAttribute("type", "radio"), pt.radioValue = "t" === e.value
    }();
    var we = /\r/g, Se = /[\x20\t\r\n\f]+/g;
    ft.fn.extend({
        val: function (t) {
            var e, n, i, o = this[0];
            {
                if (arguments.length) return i = ft.isFunction(t), this.each(function (n) {
                    var o;
                    1 === this.nodeType && (o = i ? t.call(this, n, ft(this).val()) : t, null == o ? o = "" : "number" == typeof o ? o += "" : ft.isArray(o) && (o = ft.map(o, function (t) {
                        return null == t ? "" : t + ""
                    })), (e = ft.valHooks[this.type] || ft.valHooks[this.nodeName.toLowerCase()]) && "set" in e && e.set(this, o, "value") !== undefined || (this.value = o))
                });
                if (o) return (e = ft.valHooks[o.type] || ft.valHooks[o.nodeName.toLowerCase()]) && "get" in e && (n = e.get(o, "value")) !== undefined ? n : (n = o.value, "string" == typeof n ? n.replace(we, "") : null == n ? "" : n)
            }
        }
    }), ft.extend({
        valHooks: {
            option: {
                get: function (t) {
                    var e = ft.find.attr(t, "value");
                    return null != e ? e : ft.trim(ft.text(t)).replace(Se, " ")
                }
            }, select: {
                get: function (t) {
                    for (var e, n, i = t.options, o = t.selectedIndex, s = "select-one" === t.type || o < 0, a = s ? null : [], r = s ? o + 1 : i.length, c = o < 0 ? r : s ? o : 0; c < r; c++) if (n = i[c], (n.selected || c === o) && (pt.optDisabled ? !n.disabled : null === n.getAttribute("disabled")) && (!n.parentNode.disabled || !ft.nodeName(n.parentNode, "optgroup"))) {
                        if (e = ft(n).val(), s) return e;
                        a.push(e)
                    }
                    return a
                }, set: function (t, e) {
                    for (var n, i, o = t.options, s = ft.makeArray(e), a = o.length; a--;) if (i = o[a], ft.inArray(ft.valHooks.option.get(i), s) > -1) try {
                        i.selected = n = !0
                    } catch (t) {
                        i.scrollHeight
                    } else i.selected = !1;
                    return n || (t.selectedIndex = -1), o
                }
            }
        }
    }), ft.each(["radio", "checkbox"], function () {
        ft.valHooks[this] = {
            set: function (t, e) {
                if (ft.isArray(e)) return t.checked = ft.inArray(ft(t).val(), e) > -1
            }
        }, pt.checkOn || (ft.valHooks[this].get = function (t) {
            return null === t.getAttribute("value") ? "on" : t.value
        })
    });
    var Ce, We, xe = ft.expr.attrHandle, ke = /^(?:checked|selected)$/i, Xe = pt.getSetAttribute, Ee = pt.input;
    ft.fn.extend({
        attr: function (t, e) {
            return Dt(this, ft.attr, t, e, arguments.length > 1)
        }, removeAttr: function (t) {
            return this.each(function () {
                ft.removeAttr(this, t)
            })
        }
    }), ft.extend({
        attr: function (t, e, n) {
            var i, o, s = t.nodeType;
            if (3 !== s && 8 !== s && 2 !== s) return "undefined" == typeof t.getAttribute ? ft.prop(t, e, n) : (1 === s && ft.isXMLDoc(t) || (e = e.toLowerCase(), o = ft.attrHooks[e] || (ft.expr.match.bool.test(e) ? We : Ce)), n !== undefined ? null === n ? void ft.removeAttr(t, e) : o && "set" in o && (i = o.set(t, n, e)) !== undefined ? i : (t.setAttribute(e, n + ""), n) : o && "get" in o && null !== (i = o.get(t, e)) ? i : (i = ft.find.attr(t, e), null == i ? undefined : i))
        }, attrHooks: {
            type: {
                set: function (t, e) {
                    if (!pt.radioValue && "radio" === e && ft.nodeName(t, "input")) {
                        var n = t.value;
                        return t.setAttribute("type", e), n && (t.value = n), e
                    }
                }
            }
        }, removeAttr: function (t, e) {
            var n, i, o = 0, s = e && e.match(wt);
            if (s && 1 === t.nodeType) for (; n = s[o++];) i = ft.propFix[n] || n, ft.expr.match.bool.test(n) ? Ee && Xe || !ke.test(n) ? t[i] = !1 : t[ft.camelCase("default-" + n)] = t[i] = !1 : ft.attr(t, n, ""), t.removeAttribute(Xe ? n : i)
        }
    }), We = {
        set: function (t, e, n) {
            return !1 === e ? ft.removeAttr(t, n) : Ee && Xe || !ke.test(n) ? t.setAttribute(!Xe && ft.propFix[n] || n, n) : t[ft.camelCase("default-" + n)] = t[n] = !0, n
        }
    }, ft.each(ft.expr.match.bool.source.match(/\w+/g), function (t, e) {
        var n = xe[e] || ft.find.attr;
        Ee && Xe || !ke.test(e) ? xe[e] = function (t, e, i) {
            var o, s;
            return i || (s = xe[e], xe[e] = o, o = null != n(t, e, i) ? e.toLowerCase() : null, xe[e] = s), o
        } : xe[e] = function (t, e, n) {
            if (!n) return t[ft.camelCase("default-" + e)] ? e.toLowerCase() : null
        }
    }), Ee && Xe || (ft.attrHooks.value = {
        set: function (t, e, n) {
            if (!ft.nodeName(t, "input")) return Ce && Ce.set(t, e, n);
            t.defaultValue = e
        }
    }), Xe || (Ce = {
        set: function (t, e, n) {
            var i = t.getAttributeNode(n);
            if (i || t.setAttributeNode(i = t.ownerDocument.createAttribute(n)), i.value = e += "", "value" === n || e === t.getAttribute(n)) return e
        }
    }, xe.id = xe.name = xe.coords = function (t, e, n) {
        var i;
        if (!n) return (i = t.getAttributeNode(e)) && "" !== i.value ? i.value : null
    }, ft.valHooks.button = {
        get: function (t, e) {
            var n = t.getAttributeNode(e);
            if (n && n.specified) return n.value
        }, set: Ce.set
    }, ft.attrHooks.contenteditable = {
        set: function (t, e, n) {
            Ce.set(t, "" !== e && e, n)
        }
    }, ft.each(["width", "height"], function (t, e) {
        ft.attrHooks[e] = {
            set: function (t, n) {
                if ("" === n) return t.setAttribute(e, "auto"), n
            }
        }
    })), pt.style || (ft.attrHooks.style = {
        get: function (t) {
            return t.style.cssText || undefined
        }, set: function (t, e) {
            return t.style.cssText = e + ""
        }
    });
    var Be = /^(?:input|select|textarea|button|object)$/i, _e = /^(?:a|area)$/i;
    ft.fn.extend({
        prop: function (t, e) {
            return Dt(this, ft.prop, t, e, arguments.length > 1)
        }, removeProp: function (t) {
            return t = ft.propFix[t] || t, this.each(function () {
                try {
                    this[t] = undefined, delete this[t]
                } catch (t) {
                }
            })
        }
    }), ft.extend({
        prop: function (t, e, n) {
            var i, o, s = t.nodeType;
            if (3 !== s && 8 !== s && 2 !== s) return 1 === s && ft.isXMLDoc(t) || (e = ft.propFix[e] || e, o = ft.propHooks[e]), n !== undefined ? o && "set" in o && (i = o.set(t, n, e)) !== undefined ? i : t[e] = n : o && "get" in o && null !== (i = o.get(t, e)) ? i : t[e]
        }, propHooks: {
            tabIndex: {
                get: function (t) {
                    var e = ft.find.attr(t, "tabindex");
                    return e ? parseInt(e, 10) : Be.test(t.nodeName) || _e.test(t.nodeName) && t.href ? 0 : -1
                }
            }
        }, propFix: {"for": "htmlFor", "class": "className"}
    }), pt.hrefNormalized || ft.each(["href", "src"], function (t, e) {
        ft.propHooks[e] = {
            get: function (t) {
                return t.getAttribute(e, 4)
            }
        }
    }), pt.optSelected || (ft.propHooks.selected = {
        get: function (t) {
            var e = t.parentNode;
            return e && (e.selectedIndex, e.parentNode && e.parentNode.selectedIndex), null
        }, set: function (t) {
            var e = t.parentNode;
            e && (e.selectedIndex, e.parentNode && e.parentNode.selectedIndex)
        }
    }), ft.each(["tabIndex", "readOnly", "maxLength", "cellSpacing", "cellPadding", "rowSpan", "colSpan", "useMap", "frameBorder", "contentEditable"], function () {
        ft.propFix[this.toLowerCase()] = this
    }), pt.enctype || (ft.propFix.enctype = "encoding");
    var De = /[\t\r\n\f]/g;
    ft.fn.extend({
        addClass: function (t) {
            var e, n, i, o, s, a, r, c = 0;
            if (ft.isFunction(t)) return this.each(function (e) {
                ft(this).addClass(t.call(this, e, H(this)))
            });
            if ("string" == typeof t && t) for (e = t.match(wt) || []; n = this[c++];) if (o = H(n), i = 1 === n.nodeType && (" " + o + " ").replace(De, " ")) {
                for (a = 0; s = e[a++];) i.indexOf(" " + s + " ") < 0 && (i += s + " ");
                r = ft.trim(i), o !== r && ft.attr(n, "class", r)
            }
            return this
        }, removeClass: function (t) {
            var e, n, i, o, s, a, r, c = 0;
            if (ft.isFunction(t)) return this.each(function (e) {
                ft(this).removeClass(t.call(this, e, H(this)))
            });
            if (!arguments.length) return this.attr("class", "");
            if ("string" == typeof t && t) for (e = t.match(wt) || []; n = this[c++];) if (o = H(n), i = 1 === n.nodeType && (" " + o + " ").replace(De, " ")) {
                for (a = 0; s = e[a++];) for (; i.indexOf(" " + s + " ") > -1;) i = i.replace(" " + s + " ", " ");
                r = ft.trim(i), o !== r && ft.attr(n, "class", r)
            }
            return this
        }, toggleClass: function (t, e) {
            var n = typeof t;
            return "boolean" == typeof e && "string" === n ? e ? this.addClass(t) : this.removeClass(t) : ft.isFunction(t) ? this.each(function (n) {
                ft(this).toggleClass(t.call(this, n, H(this), e), e)
            }) : this.each(function () {
                var e, i, o, s;
                if ("string" === n) for (i = 0, o = ft(this), s = t.match(wt) || []; e = s[i++];) o.hasClass(e) ? o.removeClass(e) : o.addClass(e); else t !== undefined && "boolean" !== n || (e = H(this), e && ft._data(this, "__className__", e), ft.attr(this, "class", e || !1 === t ? "" : ft._data(this, "__className__") || ""))
            })
        }, hasClass: function (t) {
            var e, n, i = 0;
            for (e = " " + t + " "; n = this[i++];) if (1 === n.nodeType && (" " + H(n) + " ").replace(De, " ").indexOf(e) > -1) return !0;
            return !1
        }
    }),
        ft.each("blur focus focusin focusout load resize scroll unload click dblclick mousedown mouseup mousemove mouseover mouseout mouseenter mouseleave change select submit keydown keypress keyup error contextmenu".split(" "), function (t, e) {
            ft.fn[e] = function (t, n) {
                return arguments.length > 0 ? this.on(e, null, t, n) : this.trigger(e)
            }
        }), ft.fn.extend({
        hover: function (t, e) {
            return this.mouseenter(t).mouseleave(e || t)
        }
    });
    var Re = t.location, $e = ft.now(), Pe = /\?/,
        Ie = /(,)|(\[|{)|(}|])|"(?:[^"\\\r\n]|\\["\\\/bfnrt]|\\u[\da-fA-F]{4})*"\s*:?|true|false|null|-?(?!0\d)\d+(?:\.\d+|)(?:[eE][+-]?\d+|)/g;
    ft.parseJSON = function (e) {
        if (t.JSON && t.JSON.parse) return t.JSON.parse(e + "");
        var n, i = null, o = ft.trim(e + "");
        return o && !ft.trim(o.replace(Ie, function (t, e, o, s) {
            return n && e && (i = 0), 0 === i ? t : (n = o || e, i += !s - !o, "")
        })) ? Function("return " + o)() : ft.error("Invalid JSON: " + e)
    }, ft.parseXML = function (e) {
        var n, i;
        if (!e || "string" != typeof e) return null;
        try {
            t.DOMParser ? (i = new t.DOMParser, n = i.parseFromString(e, "text/xml")) : (n = new t.ActiveXObject("Microsoft.XMLDOM"), n.async = "false", n.loadXML(e))
        } catch (t) {
            n = undefined
        }
        return n && n.documentElement && !n.getElementsByTagName("parsererror").length || ft.error("Invalid XML: " + e), n
    };
    var je = /#.*$/, He = /([?&])_=[^&]*/, Fe = /^(.*?):[ \t]*([^\r\n]*)\r?$/gm,
        Ue = /^(?:about|app|app-storage|.+-extension|file|res|widget):$/, Ye = /^(?:GET|HEAD)$/, Ve = /^\/\//,
        Ge = /^([\w.+-]+:)(?:\/\/(?:[^\/?#]*@|)([^\/?#:]*)(?::(\d+)|)|)/, Ke = {}, Qe = {}, Je = "*/".concat("*"),
        Ze = Re.href, tn = Ge.exec(Ze.toLowerCase()) || [];
    ft.extend({
        active: 0,
        lastModified: {},
        etag: {},
        ajaxSettings: {
            url: Ze,
            type: "GET",
            isLocal: Ue.test(tn[1]),
            global: !0,
            processData: !0,
            async: !0,
            contentType: "application/x-www-form-urlencoded; charset=UTF-8",
            accepts: {
                "*": Je,
                text: "text/plain",
                html: "text/html",
                xml: "application/xml, text/xml",
                json: "application/json, text/javascript"
            },
            contents: {xml: /\bxml\b/, html: /\bhtml/, json: /\bjson\b/},
            responseFields: {xml: "responseXML", text: "responseText", json: "responseJSON"},
            converters: {"* text": String, "text html": !0, "text json": ft.parseJSON, "text xml": ft.parseXML},
            flatOptions: {url: !0, context: !0}
        },
        ajaxSetup: function (t, e) {
            return e ? Y(Y(t, ft.ajaxSettings), e) : Y(ft.ajaxSettings, t)
        },
        ajaxPrefilter: F(Ke),
        ajaxTransport: F(Qe),
        ajax: function (e, n) {
            function i(e, n, i, o) {
                var s, p, A, g, v, L = n;
                2 !== z && (z = 2, c && t.clearTimeout(c), d = undefined, r = o || "", y.readyState = e > 0 ? 4 : 0, s = e >= 200 && e < 300 || 304 === e, i && (g = V(u, y, i)), g = G(u, g, y, s), s ? (u.ifModified && (v = y.getResponseHeader("Last-Modified"), v && (ft.lastModified[a] = v), (v = y.getResponseHeader("etag")) && (ft.etag[a] = v)), 204 === e || "HEAD" === u.type ? L = "nocontent" : 304 === e ? L = "notmodified" : (L = g.state, p = g.data, A = g.error, s = !A)) : (A = L, !e && L || (L = "error", e < 0 && (e = 0))), y.status = e, y.statusText = (n || L) + "", s ? M.resolveWith(f, [p, L, y]) : M.rejectWith(f, [y, L, A]), y.statusCode(m), m = undefined, l && h.trigger(s ? "ajaxSuccess" : "ajaxError", [y, u, s ? p : A]), b.fireWith(f, [y, L]), l && (h.trigger("ajaxComplete", [y, u]), --ft.active || ft.event.trigger("ajaxStop")))
            }

            "object" == typeof e && (n = e, e = undefined), n = n || {};
            var o, s, a, r, c, l, d, p, u = ft.ajaxSetup({}, n), f = u.context || u,
                h = u.context && (f.nodeType || f.jquery) ? ft(f) : ft.event, M = ft.Deferred(),
                b = ft.Callbacks("once memory"), m = u.statusCode || {}, A = {}, g = {}, z = 0, v = "canceled", y = {
                    readyState: 0, getResponseHeader: function (t) {
                        var e;
                        if (2 === z) {
                            if (!p) for (p = {}; e = Fe.exec(r);) p[e[1].toLowerCase()] = e[2];
                            e = p[t.toLowerCase()]
                        }
                        return null == e ? null : e
                    }, getAllResponseHeaders: function () {
                        return 2 === z ? r : null
                    }, setRequestHeader: function (t, e) {
                        var n = t.toLowerCase();
                        return z || (t = g[n] = g[n] || t, A[t] = e), this
                    }, overrideMimeType: function (t) {
                        return z || (u.mimeType = t), this
                    }, statusCode: function (t) {
                        var e;
                        if (t) if (z < 2) for (e in t) m[e] = [m[e], t[e]]; else y.always(t[y.status]);
                        return this
                    }, abort: function (t) {
                        var e = t || v;
                        return d && d.abort(e), i(0, e), this
                    }
                };
            if (M.promise(y).complete = b.add, y.success = y.done, y.error = y.fail, u.url = ((e || u.url || Ze) + "").replace(je, "").replace(Ve, tn[1] + "//"), u.type = n.method || n.type || u.method || u.type, u.dataTypes = ft.trim(u.dataType || "*").toLowerCase().match(wt) || [""], null == u.crossDomain && (o = Ge.exec(u.url.toLowerCase()), u.crossDomain = !(!o || o[1] === tn[1] && o[2] === tn[2] && (o[3] || ("http:" === o[1] ? "80" : "443")) === (tn[3] || ("http:" === tn[1] ? "80" : "443")))), u.data && u.processData && "string" != typeof u.data && (u.data = ft.param(u.data, u.traditional)), U(Ke, u, n, y), 2 === z) return y;
            l = ft.event && u.global, l && 0 == ft.active++ && ft.event.trigger("ajaxStart"), u.type = u.type.toUpperCase(), u.hasContent = !Ye.test(u.type), a = u.url, u.hasContent || (u.data && (a = u.url += (Pe.test(a) ? "&" : "?") + u.data, delete u.data), !1 === u.cache && (u.url = He.test(a) ? a.replace(He, "$1_=" + $e++) : a + (Pe.test(a) ? "&" : "?") + "_=" + $e++)), u.ifModified && (ft.lastModified[a] && y.setRequestHeader("If-Modified-Since", ft.lastModified[a]), ft.etag[a] && y.setRequestHeader("If-None-Match", ft.etag[a])), (u.data && u.hasContent && !1 !== u.contentType || n.contentType) && y.setRequestHeader("Content-Type", u.contentType), y.setRequestHeader("Accept", u.dataTypes[0] && u.accepts[u.dataTypes[0]] ? u.accepts[u.dataTypes[0]] + ("*" !== u.dataTypes[0] ? ", " + Je + "; q=0.01" : "") : u.accepts["*"]);
            for (s in u.headers) y.setRequestHeader(s, u.headers[s]);
            if (u.beforeSend && (!1 === u.beforeSend.call(f, y, u) || 2 === z)) return y.abort();
            v = "abort";
            for (s in{success: 1, error: 1, complete: 1}) y[s](u[s]);
            if (d = U(Qe, u, n, y)) {
                if (y.readyState = 1, l && h.trigger("ajaxSend", [y, u]), 2 === z) return y;
                u.async && u.timeout > 0 && (c = t.setTimeout(function () {
                    y.abort("timeout")
                }, u.timeout));
                try {
                    z = 1, d.send(A, i)
                } catch (t) {
                    if (!(z < 2)) throw t;
                    i(-1, t)
                }
            } else i(-1, "No Transport");
            return y
        },
        getJSON: function (t, e, n) {
            return ft.get(t, e, n, "json")
        },
        getScript: function (t, e) {
            return ft.get(t, undefined, e, "script")
        }
    }), ft.each(["get", "post"], function (t, e) {
        ft[e] = function (t, n, i, o) {
            return ft.isFunction(n) && (o = o || i, i = n, n = undefined), ft.ajax(ft.extend({
                url: t,
                type: e,
                dataType: o,
                data: n,
                success: i
            }, ft.isPlainObject(t) && t))
        }
    }), ft._evalUrl = function (t) {
        return ft.ajax({url: t, type: "GET", dataType: "script", cache: !0, async: !1, global: !1, "throws": !0})
    }, ft.fn.extend({
        wrapAll: function (t) {
            if (ft.isFunction(t)) return this.each(function (e) {
                ft(this).wrapAll(t.call(this, e))
            });
            if (this[0]) {
                var e = ft(t, this[0].ownerDocument).eq(0).clone(!0);
                this[0].parentNode && e.insertBefore(this[0]), e.map(function () {
                    for (var t = this; t.firstChild && 1 === t.firstChild.nodeType;) t = t.firstChild;
                    return t
                }).append(this)
            }
            return this
        }, wrapInner: function (t) {
            return ft.isFunction(t) ? this.each(function (e) {
                ft(this).wrapInner(t.call(this, e))
            }) : this.each(function () {
                var e = ft(this), n = e.contents();
                n.length ? n.wrapAll(t) : e.append(t)
            })
        }, wrap: function (t) {
            var e = ft.isFunction(t);
            return this.each(function (n) {
                ft(this).wrapAll(e ? t.call(this, n) : t)
            })
        }, unwrap: function () {
            return this.parent().each(function () {
                ft.nodeName(this, "body") || ft(this).replaceWith(this.childNodes)
            }).end()
        }
    }), ft.expr.filters.hidden = function (t) {
        return pt.reliableHiddenOffsets() ? t.offsetWidth <= 0 && t.offsetHeight <= 0 && !t.getClientRects().length : Q(t)
    }, ft.expr.filters.visible = function (t) {
        return !ft.expr.filters.hidden(t)
    };
    var en = /%20/g, nn = /\[\]$/, on = /\r?\n/g, sn = /^(?:submit|button|image|reset|file)$/i,
        an = /^(?:input|select|textarea|keygen)/i;
    ft.param = function (t, e) {
        var n, i = [], o = function (t, e) {
            e = ft.isFunction(e) ? e() : null == e ? "" : e, i[i.length] = encodeURIComponent(t) + "=" + encodeURIComponent(e)
        };
        if (e === undefined && (e = ft.ajaxSettings && ft.ajaxSettings.traditional), ft.isArray(t) || t.jquery && !ft.isPlainObject(t)) ft.each(t, function () {
            o(this.name, this.value)
        }); else for (n in t) J(n, t[n], e, o);
        return i.join("&").replace(en, "+")
    }, ft.fn.extend({
        serialize: function () {
            return ft.param(this.serializeArray())
        }, serializeArray: function () {
            return this.map(function () {
                var t = ft.prop(this, "elements");
                return t ? ft.makeArray(t) : this
            }).filter(function () {
                var t = this.type;
                return this.name && !ft(this).is(":disabled") && an.test(this.nodeName) && !sn.test(t) && (this.checked || !Rt.test(t))
            }).map(function (t, e) {
                var n = ft(this).val();
                return null == n ? null : ft.isArray(n) ? ft.map(n, function (t) {
                    return {name: e.name, value: t.replace(on, "\r\n")}
                }) : {name: e.name, value: n.replace(on, "\r\n")}
            }).get()
        }
    }), ft.ajaxSettings.xhr = t.ActiveXObject !== undefined ? function () {
        return this.isLocal ? tt() : it.documentMode > 8 ? Z() : /^(get|post|head|put|delete|options)$/i.test(this.type) && Z() || tt()
    } : Z;
    var rn = 0, cn = {}, ln = ft.ajaxSettings.xhr();
    t.attachEvent && t.attachEvent("onunload", function () {
        for (var t in cn) cn[t](undefined, !0)
    }), pt.cors = !!ln && "withCredentials" in ln, ln = pt.ajax = !!ln, ln && ft.ajaxTransport(function (e) {
        if (!e.crossDomain || pt.cors) {
            var n;
            return {
                send: function (i, o) {
                    var s, a = e.xhr(), r = ++rn;
                    if (a.open(e.type, e.url, e.async, e.username, e.password), e.xhrFields) for (s in e.xhrFields) a[s] = e.xhrFields[s];
                    e.mimeType && a.overrideMimeType && a.overrideMimeType(e.mimeType), e.crossDomain || i["X-Requested-With"] || (i["X-Requested-With"] = "XMLHttpRequest");
                    for (s in i) i[s] !== undefined && a.setRequestHeader(s, i[s] + "");
                    a.send(e.hasContent && e.data || null), n = function (t, i) {
                        var s, c, l;
                        if (n && (i || 4 === a.readyState)) if (delete cn[r], n = undefined, a.onreadystatechange = ft.noop, i) 4 !== a.readyState && a.abort(); else {
                            l = {}, s = a.status, "string" == typeof a.responseText && (l.text = a.responseText);
                            try {
                                c = a.statusText
                            } catch (t) {
                                c = ""
                            }
                            s || !e.isLocal || e.crossDomain ? 1223 === s && (s = 204) : s = l.text ? 200 : 404
                        }
                        l && o(s, c, l, a.getAllResponseHeaders())
                    }, e.async ? 4 === a.readyState ? t.setTimeout(n) : a.onreadystatechange = cn[r] = n : n()
                }, abort: function () {
                    n && n(undefined, !0)
                }
            }
        }
    }), ft.ajaxSetup({
        accepts: {script: "text/javascript, application/javascript, application/ecmascript, application/x-ecmascript"},
        contents: {script: /\b(?:java|ecma)script\b/},
        converters: {
            "text script": function (t) {
                return ft.globalEval(t), t
            }
        }
    }), ft.ajaxPrefilter("script", function (t) {
        t.cache === undefined && (t.cache = !1), t.crossDomain && (t.type = "GET", t.global = !1)
    }), ft.ajaxTransport("script", function (t) {
        if (t.crossDomain) {
            var e, n = it.head || ft("head")[0] || it.documentElement;
            return {
                send: function (i, o) {
                    e = it.createElement("script"), e.async = !0, t.scriptCharset && (e.charset = t.scriptCharset), e.src = t.url, e.onload = e.onreadystatechange = function (t, n) {
                        (n || !e.readyState || /loaded|complete/.test(e.readyState)) && (e.onload = e.onreadystatechange = null, e.parentNode && e.parentNode.removeChild(e), e = null, n || o(200, "success"))
                    }, n.insertBefore(e, n.firstChild)
                }, abort: function () {
                    e && e.onload(undefined, !0)
                }
            }
        }
    });
    var dn = [], pn = /(=)\?(?=&|$)|\?\?/;
    ft.ajaxSetup({
        jsonp: "callback", jsonpCallback: function () {
            var t = dn.pop() || ft.expando + "_" + $e++;
            return this[t] = !0, t
        }
    }), ft.ajaxPrefilter("json jsonp", function (e, n, i) {
        var o, s, a,
            r = !1 !== e.jsonp && (pn.test(e.url) ? "url" : "string" == typeof e.data && 0 === (e.contentType || "").indexOf("application/x-www-form-urlencoded") && pn.test(e.data) && "data");
        if (r || "jsonp" === e.dataTypes[0]) return o = e.jsonpCallback = ft.isFunction(e.jsonpCallback) ? e.jsonpCallback() : e.jsonpCallback, r ? e[r] = e[r].replace(pn, "$1" + o) : !1 !== e.jsonp && (e.url += (Pe.test(e.url) ? "&" : "?") + e.jsonp + "=" + o), e.converters["script json"] = function () {
            return a || ft.error(o + " was not called"), a[0]
        }, e.dataTypes[0] = "json", s = t[o], t[o] = function () {
            a = arguments
        }, i.always(function () {
            s === undefined ? ft(t).removeProp(o) : t[o] = s, e[o] && (e.jsonpCallback = n.jsonpCallback, dn.push(o)), a && ft.isFunction(s) && s(a[0]), a = s = undefined
        }), "script"
    }), ft.parseHTML = function (t, e, n) {
        if (!t || "string" != typeof t) return null;
        "boolean" == typeof e && (n = e, e = !1), e = e || it;
        var i = yt.exec(t), o = !n && [];
        return i ? [e.createElement(i[1])] : (i = m([t], e, o), o && o.length && ft(o).remove(), ft.merge([], i.childNodes))
    };
    var un = ft.fn.load;
    ft.fn.load = function (t, e, n) {
        if ("string" != typeof t && un) return un.apply(this, arguments);
        var i, o, s, a = this, r = t.indexOf(" ");
        return r > -1 && (i = ft.trim(t.slice(r, t.length)), t = t.slice(0, r)), ft.isFunction(e) ? (n = e, e = undefined) : e && "object" == typeof e && (o = "POST"), a.length > 0 && ft.ajax({
            url: t,
            type: o || "GET",
            dataType: "html",
            data: e
        }).done(function (t) {
            s = arguments, a.html(i ? ft("<div>").append(ft.parseHTML(t)).find(i) : t)
        }).always(n && function (t, e) {
            a.each(function () {
                n.apply(this, s || [t.responseText, e, t])
            })
        }), this
    }, ft.each(["ajaxStart", "ajaxStop", "ajaxComplete", "ajaxError", "ajaxSuccess", "ajaxSend"], function (t, e) {
        ft.fn[e] = function (t) {
            return this.on(e, t)
        }
    }), ft.expr.filters.animated = function (t) {
        return ft.grep(ft.timers, function (e) {
            return t === e.elem
        }).length
    }, ft.offset = {
        setOffset: function (t, e, n) {
            var i, o, s, a, r, c, l, d = ft.css(t, "position"), p = ft(t), u = {};
            "static" === d && (t.style.position = "relative"), r = p.offset(), s = ft.css(t, "top"), c = ft.css(t, "left"), l = ("absolute" === d || "fixed" === d) && ft.inArray("auto", [s, c]) > -1, l ? (i = p.position(), a = i.top, o = i.left) : (a = parseFloat(s) || 0, o = parseFloat(c) || 0), ft.isFunction(e) && (e = e.call(t, n, ft.extend({}, r))), null != e.top && (u.top = e.top - r.top + a), null != e.left && (u.left = e.left - r.left + o), "using" in e ? e.using.call(t, u) : p.css(u)
        }
    }, ft.fn.extend({
        offset: function (t) {
            if (arguments.length) return t === undefined ? this : this.each(function (e) {
                ft.offset.setOffset(this, t, e)
            });
            var e, n, i = {top: 0, left: 0}, o = this[0], s = o && o.ownerDocument;
            if (s) return e = s.documentElement, ft.contains(e, o) ? ("undefined" != typeof o.getBoundingClientRect && (i = o.getBoundingClientRect()), n = et(s), {
                top: i.top + (n.pageYOffset || e.scrollTop) - (e.clientTop || 0),
                left: i.left + (n.pageXOffset || e.scrollLeft) - (e.clientLeft || 0)
            }) : i
        }, position: function () {
            if (this[0]) {
                var t, e, n = {top: 0, left: 0}, i = this[0];
                return "fixed" === ft.css(i, "position") ? e = i.getBoundingClientRect() : (t = this.offsetParent(), e = this.offset(), ft.nodeName(t[0], "html") || (n = t.offset()), n.top += ft.css(t[0], "borderTopWidth", !0), n.left += ft.css(t[0], "borderLeftWidth", !0)), {
                    top: e.top - n.top - ft.css(i, "marginTop", !0),
                    left: e.left - n.left - ft.css(i, "marginLeft", !0)
                }
            }
        }, offsetParent: function () {
            return this.map(function () {
                for (var t = this.offsetParent; t && !ft.nodeName(t, "html") && "static" === ft.css(t, "position");) t = t.offsetParent;
                return t || ue
            })
        }
    }), ft.each({scrollLeft: "pageXOffset", scrollTop: "pageYOffset"}, function (t, e) {
        var n = /Y/.test(e);
        ft.fn[t] = function (i) {
            return Dt(this, function (t, i, o) {
                var s = et(t);
                if (o === undefined) return s ? e in s ? s[e] : s.document.documentElement[i] : t[i];
                s ? s.scrollTo(n ? ft(s).scrollLeft() : o, n ? o : ft(s).scrollTop()) : t[i] = o
            }, t, i, arguments.length, null)
        }
    }), ft.each(["top", "left"], function (t, e) {
        ft.cssHooks[e] = W(pt.pixelPosition, function (t, n) {
            if (n) return n = he(t, e), de.test(n) ? ft(t).position()[e] + "px" : n
        })
    }), ft.each({Height: "height", Width: "width"}, function (t, e) {
        ft.each({padding: "inner" + t, content: e, "": "outer" + t}, function (n, i) {
            ft.fn[i] = function (i, o) {
                var s = arguments.length && (n || "boolean" != typeof i),
                    a = n || (!0 === i || !0 === o ? "margin" : "border");
                return Dt(this, function (e, n, i) {
                    var o;
                    return ft.isWindow(e) ? e.document.documentElement["client" + t] : 9 === e.nodeType ? (o = e.documentElement, Math.max(e.body["scroll" + t], o["scroll" + t], e.body["offset" + t], o["offset" + t], o["client" + t])) : i === undefined ? ft.css(e, n, a) : ft.style(e, n, i, a)
                }, e, s ? i : undefined, s, null)
            }
        })
    }), ft.fn.extend({
        bind: function (t, e, n) {
            return this.on(t, null, e, n)
        }, unbind: function (t, e) {
            return this.off(t, null, e)
        }, delegate: function (t, e, n, i) {
            return this.on(e, t, n, i)
        }, undelegate: function (t, e, n) {
            return 1 === arguments.length ? this.off(t, "**") : this.off(e, t || "**", n)
        }
    }), ft.fn.size = function () {
        return this.length
    }, ft.fn.andSelf = ft.fn.addBack, "function" == typeof define && define.amd && define("jquery", [], function () {
        return ft
    });
    var fn = t.jQuery, hn = t.$;
    return ft.noConflict = function (e) {
        return t.$ === ft && (t.$ = hn), e && t.jQuery === ft && (t.jQuery = fn), ft
    }, e || (t.jQuery = t.$ = ft), ft
}), function (t, e) {
    "use strict";
    t.rails !== e && t.error("jquery-ujs has already been loaded!");
    var n, i = t(document);
    t.rails = n = {
        linkClickSelector: "a[data-confirm], a[data-method], a[data-remote]:not([disabled]), a[data-disable-with], a[data-disable]",
        buttonClickSelector: "button[data-remote]:not([form]):not(form button), button[data-confirm]:not([form]):not(form button)",
        inputChangeSelector: "select[data-remote], input[data-remote], textarea[data-remote]",
        formSubmitSelector: "form",
        formInputClickSelector: "form input[type=submit], form input[type=image], form button[type=submit], form button:not([type]), input[type=submit][form], input[type=image][form], button[type=submit][form], button[form]:not([type])",
        disableSelector: "input[data-disable-with]:enabled, button[data-disable-with]:enabled, textarea[data-disable-with]:enabled, input[data-disable]:enabled, button[data-disable]:enabled, textarea[data-disable]:enabled",
        enableSelector: "input[data-disable-with]:disabled, button[data-disable-with]:disabled, textarea[data-disable-with]:disabled, input[data-disable]:disabled, button[data-disable]:disabled, textarea[data-disable]:disabled",
        requiredInputSelector: "input[name][required]:not([disabled]), textarea[name][required]:not([disabled])",
        fileInputSelector: "input[name][type=file]:not([disabled])",
        linkDisableSelector: "a[data-disable-with], a[data-disable]",
        buttonDisableSelector: "button[data-remote][data-disable-with], button[data-remote][data-disable]",
        csrfToken: function () {
            return t("meta[name=csrf-token]").attr("content")
        },
        csrfParam: function () {
            return t("meta[name=csrf-param]").attr("content")
        },
        CSRFProtection: function (t) {
            var e = n.csrfToken();
            e && t.setRequestHeader("X-CSRF-Token", e)
        },
        refreshCSRFTokens: function () {
            t('form input[name="' + n.csrfParam() + '"]').val(n.csrfToken())
        },
        fire: function (e, n, i) {
            var o = t.Event(n);
            return e.trigger(o, i), !1 !== o.result
        },
        confirm: function (t) {
            return confirm(t)
        },
        ajax: function (e) {
            return t.ajax(e)
        },
        href: function (t) {
            return t[0].href
        },
        isRemote: function (t) {
            return t.data("remote") !== e && !1 !== t.data("remote")
        },
        handleRemote: function (i) {
            var o, s, a, r, c, l;
            if (n.fire(i, "ajax:before")) {
                if (r = i.data("with-credentials") || null, c = i.data("type") || t.ajaxSettings && t.ajaxSettings.dataType, i.is("form")) {
                    o = i.data("ujs:submit-button-formmethod") || i.attr("method"), s = i.data("ujs:submit-button-formaction") || i.attr("action"), a = t(i[0]).serializeArray();
                    var d = i.data("ujs:submit-button");
                    d && (a.push(d), i.data("ujs:submit-button", null)), i.data("ujs:submit-button-formmethod", null), i.data("ujs:submit-button-formaction", null)
                } else i.is(n.inputChangeSelector) ? (o = i.data("method"), s = i.data("url"), a = i.serialize(), i.data("params") && (a = a + "&" + i.data("params"))) : i.is(n.buttonClickSelector) ? (o = i.data("method") || "get", s = i.data("url"), a = i.serialize(), i.data("params") && (a = a + "&" + i.data("params"))) : (o = i.data("method"), s = n.href(i), a = i.data("params") || null);
                return l = {
                    type: o || "GET", data: a, dataType: c, beforeSend: function (t, o) {
                        if (o.dataType === e && t.setRequestHeader("accept", "*/*;q=0.5, " + o.accepts.script), !n.fire(i, "ajax:beforeSend", [t, o])) return !1;
                        i.trigger("ajax:send", t)
                    }, success: function (t, e, n) {
                        i.trigger("ajax:success", [t, e, n])
                    }, complete: function (t, e) {
                        i.trigger("ajax:complete", [t, e])
                    }, error: function (t, e, n) {
                        i.trigger("ajax:error", [t, e, n])
                    }, crossDomain: n.isCrossDomain(s)
                }, r && (l.xhrFields = {withCredentials: r}), s && (l.url = s), n.ajax(l)
            }
            return !1
        },
        isCrossDomain: function (t) {
            var e = document.createElement("a");
            e.href = location.href;
            var n = document.createElement("a");
            try {
                return n.href = t, n.href = n.href, !((!n.protocol || ":" === n.protocol) && !n.host || e.protocol + "//" + e.host == n.protocol + "//" + n.host)
            } catch (t) {
                return !0
            }
        },
        handleMethod: function (i) {
            var o = n.href(i), s = i.data("method"), a = i.attr("target"), r = n.csrfToken(), c = n.csrfParam(),
                l = t('<form method="post" action="' + o + '"></form>'),
                d = '<input name="_method" value="' + s + '" type="hidden" />';
            c === e || r === e || n.isCrossDomain(o) || (d += '<input name="' + c + '" value="' + r + '" type="hidden" />'), a && l.attr("target", a), l.hide().append(d).appendTo("body"), l.submit()
        },
        formElements: function (e, n) {
            return e.is("form") ? t(e[0].elements).filter(n) : e.find(n)
        },
        disableFormElements: function (e) {
            n.formElements(e, n.disableSelector).each(function () {
                n.disableFormElement(t(this))
            })
        },
        disableFormElement: function (t) {
            var n, i;
            n = t.is("button") ? "html" : "val", i = t.data("disable-with"), i !== e && (t.data("ujs:enable-with", t[n]()), t[n](i)), t.prop("disabled", !0), t.data("ujs:disabled", !0)
        },
        enableFormElements: function (e) {
            n.formElements(e, n.enableSelector).each(function () {
                n.enableFormElement(t(this))
            })
        },
        enableFormElement: function (t) {
            var n = t.is("button") ? "html" : "val";
            t.data("ujs:enable-with") !== e && (t[n](t.data("ujs:enable-with")), t.removeData("ujs:enable-with")), t.prop("disabled", !1), t.removeData("ujs:disabled")
        },
        allowAction: function (t) {
            var e, i = t.data("confirm"), o = !1;
            if (!i) return !0;
            if (n.fire(t, "confirm")) {
                try {
                    o = n.confirm(i)
                } catch (t) {
                    (console.error || console.log).call(console, t.stack || t)
                }
                e = n.fire(t, "confirm:complete", [o])
            }
            return o && e
        },
        blankInputs: function (e, n, i) {
            var o, s, a, r, c = t(), l = n || "input,textarea", d = e.find(l), p = {};
            return d.each(function () {
                o = t(this), o.is("input[type=radio]") ? (r = o.attr("name"), p[r] || (0 === e.find('input[type=radio]:checked[name="' + r + '"]').length && (a = e.find('input[type=radio][name="' + r + '"]'), c = c.add(a)), p[r] = r)) : (s = o.is("input[type=checkbox],input[type=radio]") ? o.is(":checked") : !!o.val()) === i && (c = c.add(o))
            }), !!c.length && c
        },
        nonBlankInputs: function (t, e) {
            return n.blankInputs(t, e, !0)
        },
        stopEverything: function (e) {
            return t(e.target).trigger("ujs:everythingStopped"), e.stopImmediatePropagation(), !1
        },
        disableElement: function (t) {
            var i = t.data("disable-with");
            i !== e && (t.data("ujs:enable-with", t.html()), t.html(i)), t.bind("click.railsDisable", function (t) {
                return n.stopEverything(t)
            }), t.data("ujs:disabled", !0)
        },
        enableElement: function (t) {
            t.data("ujs:enable-with") !== e && (t.html(t.data("ujs:enable-with")), t.removeData("ujs:enable-with")), t.unbind("click.railsDisable"), t.removeData("ujs:disabled")
        }
    }, n.fire(i, "rails:attachBindings") && (t.ajaxPrefilter(function (t, e, i) {
        t.crossDomain || n.CSRFProtection(i)
    }), t(window).on("pageshow.rails", function () {
        t(t.rails.enableSelector).each(function () {
            var e = t(this);
            e.data("ujs:disabled") && t.rails.enableFormElement(e)
        }), t(t.rails.linkDisableSelector).each(function () {
            var e = t(this);
            e.data("ujs:disabled") && t.rails.enableElement(e)
        })
    }), i.on("ajax:complete", n.linkDisableSelector, function () {
        n.enableElement(t(this))
    }), i.on("ajax:complete", n.buttonDisableSelector, function () {
        n.enableFormElement(t(this))
    }), i.on("click.rails", n.linkClickSelector, function (e) {
        var i = t(this), o = i.data("method"), s = i.data("params"), a = e.metaKey || e.ctrlKey;
        if (!n.allowAction(i)) return n.stopEverything(e);
        if (!a && i.is(n.linkDisableSelector) && n.disableElement(i), n.isRemote(i)) {
            if (a && (!o || "GET" === o) && !s) return !0;
            var r = n.handleRemote(i);
            return !1 === r ? n.enableElement(i) : r.fail(function () {
                n.enableElement(i)
            }), !1
        }
        return o ? (n.handleMethod(i), !1) : void 0
    }), i.on("click.rails", n.buttonClickSelector, function (e) {
        var i = t(this);
        if (!n.allowAction(i) || !n.isRemote(i)) return n.stopEverything(e);
        i.is(n.buttonDisableSelector) && n.disableFormElement(i);
        var o = n.handleRemote(i);
        return !1 === o ? n.enableFormElement(i) : o.fail(function () {
            n.enableFormElement(i)
        }), !1
    }), i.on("change.rails", n.inputChangeSelector, function (e) {
        var i = t(this);
        return n.allowAction(i) && n.isRemote(i) ? (n.handleRemote(i), !1) : n.stopEverything(e)
    }), i.on("submit.rails", n.formSubmitSelector, function (i) {
        var o, s, a = t(this), r = n.isRemote(a);
        if (!n.allowAction(a)) return n.stopEverything(i);
        if (a.attr("novalidate") === e) if (a.data("ujs:formnovalidate-button") === e) {
            if ((o = n.blankInputs(a, n.requiredInputSelector, !1)) && n.fire(a, "ajax:aborted:required", [o])) return n.stopEverything(i)
        } else a.data("ujs:formnovalidate-button", e);
        if (r) {
            if (s = n.nonBlankInputs(a, n.fileInputSelector)) {
                setTimeout(function () {
                    n.disableFormElements(a)
                }, 13);
                var c = n.fire(a, "ajax:aborted:file", [s]);
                return c || setTimeout(function () {
                    n.enableFormElements(a)
                }, 13), c
            }
            return n.handleRemote(a), !1
        }
        setTimeout(function () {
            n.disableFormElements(a)
        }, 13)
    }), i.on("click.rails", n.formInputClickSelector, function (e) {
        var i = t(this);
        if (!n.allowAction(i)) return n.stopEverything(e);
        var o = i.attr("name"), s = o ? {name: o, value: i.val()} : null, a = i.closest("form");
        0 === a.length && (a = t("#" + i.attr("form"))), a.data("ujs:submit-button", s), a.data("ujs:formnovalidate-button", i.attr("formnovalidate")), a.data("ujs:submit-button-formaction", i.attr("formaction")), a.data("ujs:submit-button-formmethod", i.attr("formmethod"))
    }), i.on("ajax:send.rails", n.formSubmitSelector, function (e) {
        this === e.target && n.disableFormElements(t(this))
    }), i.on("ajax:complete.rails", n.formSubmitSelector, function (e) {
        this === e.target && n.enableFormElements(t(this))
    }), t(function () {
        n.refreshCSRFTokens()
    }))
}(jQuery), function (t) {
    "use strict";
    "function" == typeof define && define.amd ? define(["jquery"], t) : "undefined" != typeof exports ? module.exports = t(require("jquery")) : t(jQuery)
}(function (t) {
    "use strict";
    var e = window.Slick || {};
    e = function () {
        function e(e, i) {
            var o, s = this;
            s.defaults = {
                accessibility: !0,
                adaptiveHeight: !1,
                appendArrows: t(e),
                appendDots: t(e),
                arrows: !0,
                asNavFor: null,
                prevArrow: '<button type="button" data-role="none" class="slick-prev" aria-label="Previous" tabindex="0" role="button">Previous</button>',
                nextArrow: '<button type="button" data-role="none" class="slick-next" aria-label="Next" tabindex="0" role="button">Next</button>',
                autoplay: !1,
                autoplaySpeed: 3e3,
                centerMode: !1,
                centerPadding: "50px",
                cssEase: "ease",
                customPaging: function (e, n) {
                    return t('<button type="button" data-role="none" role="button" tabindex="0" />').text(n + 1)
                },
                dots: !1,
                dotsClass: "slick-dots",
                draggable: !0,
                easing: "linear",
                edgeFriction: .35,
                fade: !1,
                focusOnSelect: !1,
                infinite: !0,
                initialSlide: 0,
                lazyLoad: "ondemand",
                mobileFirst: !1,
                pauseOnHover: !0,
                pauseOnFocus: !0,
                pauseOnDotsHover: !1,
                respondTo: "window",
                responsive: null,
                rows: 1,
                rtl: !1,
                slide: "",
                slidesPerRow: 1,
                slidesToShow: 1,
                slidesToScroll: 1,
                speed: 500,
                swipe: !0,
                swipeToSlide: !1,
                touchMove: !0,
                touchThreshold: 5,
                useCSS: !0,
                useTransform: !0,
                variableWidth: !1,
                vertical: !1,
                verticalSwiping: !1,
                waitForAnimate: !0,
                zIndex: 1e3
            }, s.initials = {
                animating: !1,
                dragging: !1,
                autoPlayTimer: null,
                currentDirection: 0,
                currentLeft: null,
                currentSlide: 0,
                direction: 1,
                $dots: null,
                listWidth: null,
                listHeight: null,
                loadIndex: 0,
                $nextArrow: null,
                $prevArrow: null,
                slideCount: null,
                slideWidth: null,
                $slideTrack: null,
                $slides: null,
                sliding: !1,
                slideOffset: 0,
                swipeLeft: null,
                $list: null,
                touchObject: {},
                transformsEnabled: !1,
                unslicked: !1
            }, t.extend(s, s.initials), s.activeBreakpoint = null, s.animType = null, s.animProp = null, s.breakpoints = [], s.breakpointSettings = [], s.cssTransitions = !1, s.focussed = !1, s.interrupted = !1, s.hidden = "hidden", s.paused = !0, s.positionProp = null, s.respondTo = null, s.rowCount = 1, s.shouldClick = !0, s.$slider = t(e), s.$slidesCache = null, s.transformType = null, s.transitionType = null, s.visibilityChange = "visibilitychange", s.windowWidth = 0, s.windowTimer = null, o = t(e).data("slick") || {}, s.options = t.extend({}, s.defaults, i, o), s.currentSlide = s.options.initialSlide, s.originalSettings = s.options, "undefined" != typeof document.mozHidden ? (s.hidden = "mozHidden", s.visibilityChange = "mozvisibilitychange") : "undefined" != typeof document.webkitHidden && (s.hidden = "webkitHidden", s.visibilityChange = "webkitvisibilitychange"), s.autoPlay = t.proxy(s.autoPlay, s), s.autoPlayClear = t.proxy(s.autoPlayClear, s), s.autoPlayIterator = t.proxy(s.autoPlayIterator, s), s.changeSlide = t.proxy(s.changeSlide, s), s.clickHandler = t.proxy(s.clickHandler, s), s.selectHandler = t.proxy(s.selectHandler, s), s.setPosition = t.proxy(s.setPosition, s), s.swipeHandler = t.proxy(s.swipeHandler, s), s.dragHandler = t.proxy(s.dragHandler, s), s.keyHandler = t.proxy(s.keyHandler, s), s.instanceUid = n++, s.htmlExpr = /^(?:\s*(<[\w\W]+>)[^>]*)$/, s.registerBreakpoints(), s.init(!0)
        }

        var n = 0;
        return e
    }(), e.prototype.activateADA = function () {
        this.$slideTrack.find(".slick-active").attr({"aria-hidden": "false"}).find("a, input, button, select").attr({tabindex: "0"})
    }, e.prototype.addSlide = e.prototype.slickAdd = function (e, n, i) {
        var o = this;
        if ("boolean" == typeof n) i = n, n = null; else if (n < 0 || n >= o.slideCount) return !1;
        o.unload(), "number" == typeof n ? 0 === n && 0 === o.$slides.length ? t(e).appendTo(o.$slideTrack) : i ? t(e).insertBefore(o.$slides.eq(n)) : t(e).insertAfter(o.$slides.eq(n)) : !0 === i ? t(e).prependTo(o.$slideTrack) : t(e).appendTo(o.$slideTrack), o.$slides = o.$slideTrack.children(this.options.slide), o.$slideTrack.children(this.options.slide).detach(), o.$slideTrack.append(o.$slides), o.$slides.each(function (e, n) {
            t(n).attr("data-slick-index", e)
        }), o.$slidesCache = o.$slides, o.reinit()
    }, e.prototype.animateHeight = function () {
        var t = this;
        if (1 === t.options.slidesToShow && !0 === t.options.adaptiveHeight && !1 === t.options.vertical) {
            var e = t.$slides.eq(t.currentSlide).outerHeight(!0);
            t.$list.animate({height: e}, t.options.speed)
        }
    }, e.prototype.animateSlide = function (e, n) {
        var i = {}, o = this;
        o.animateHeight(), !0 === o.options.rtl && !1 === o.options.vertical && (e = -e), !1 === o.transformsEnabled ? !1 === o.options.vertical ? o.$slideTrack.animate({left: e}, o.options.speed, o.options.easing, n) : o.$slideTrack.animate({top: e}, o.options.speed, o.options.easing, n) : !1 === o.cssTransitions ? (!0 === o.options.rtl && (o.currentLeft = -o.currentLeft), t({animStart: o.currentLeft}).animate({animStart: e}, {
            duration: o.options.speed,
            easing: o.options.easing,
            step: function (t) {
                t = Math.ceil(t), !1 === o.options.vertical ? (i[o.animType] = "translate(" + t + "px, 0px)", o.$slideTrack.css(i)) : (i[o.animType] = "translate(0px," + t + "px)", o.$slideTrack.css(i))
            },
            complete: function () {
                n && n.call()
            }
        })) : (o.applyTransition(), e = Math.ceil(e), !1 === o.options.vertical ? i[o.animType] = "translate3d(" + e + "px, 0px, 0px)" : i[o.animType] = "translate3d(0px," + e + "px, 0px)", o.$slideTrack.css(i), n && setTimeout(function () {
            o.disableTransition(), n.call()
        }, o.options.speed))
    }, e.prototype.getNavTarget = function () {
        var e = this, n = e.options.asNavFor;
        return n && null !== n && (n = t(n).not(e.$slider)), n
    }, e.prototype.asNavFor = function (e) {
        var n = this, i = n.getNavTarget();
        null !== i && "object" == typeof i && i.each(function () {
            var n = t(this).slick("getSlick");
            n.unslicked || n.slideHandler(e, !0)
        })
    }, e.prototype.applyTransition = function (t) {
        var e = this, n = {};
        !1 === e.options.fade ? n[e.transitionType] = e.transformType + " " + e.options.speed + "ms " + e.options.cssEase : n[e.transitionType] = "opacity " + e.options.speed + "ms " + e.options.cssEase, !1 === e.options.fade ? e.$slideTrack.css(n) : e.$slides.eq(t).css(n)
    }, e.prototype.autoPlay = function () {
        var t = this;
        t.autoPlayClear(), t.slideCount > t.options.slidesToShow && (t.autoPlayTimer = setInterval(t.autoPlayIterator, t.options.autoplaySpeed))
    }, e.prototype.autoPlayClear = function () {
        var t = this;
        t.autoPlayTimer && clearInterval(t.autoPlayTimer)
    }, e.prototype.autoPlayIterator = function () {
        var t = this, e = t.currentSlide + t.options.slidesToScroll;
        t.paused || t.interrupted || t.focussed || (!1 === t.options.infinite && (1 === t.direction && t.currentSlide + 1 === t.slideCount - 1 ? t.direction = 0 : 0 === t.direction && (e = t.currentSlide - t.options.slidesToScroll, t.currentSlide - 1 == 0 && (t.direction = 1))), t.slideHandler(e))
    }, e.prototype.buildArrows = function () {
        var e = this;
        !0 === e.options.arrows && (e.$prevArrow = t(e.options.prevArrow).addClass("slick-arrow"), e.$nextArrow = t(e.options.nextArrow).addClass("slick-arrow"), e.slideCount > e.options.slidesToShow ? (e.$prevArrow.removeClass("slick-hidden").removeAttr("aria-hidden tabindex"), e.$nextArrow.removeClass("slick-hidden").removeAttr("aria-hidden tabindex"), e.htmlExpr.test(e.options.prevArrow) && e.$prevArrow.prependTo(e.options.appendArrows), e.htmlExpr.test(e.options.nextArrow) && e.$nextArrow.appendTo(e.options.appendArrows), !0 !== e.options.infinite && e.$prevArrow.addClass("slick-disabled").attr("aria-disabled", "true")) : e.$prevArrow.add(e.$nextArrow).addClass("slick-hidden").attr({
            "aria-disabled": "true",
            tabindex: "-1"
        }))
    }, e.prototype.buildDots = function () {
        var e, n, i = this;
        if (!0 === i.options.dots && i.slideCount > i.options.slidesToShow) {
            for (i.$slider.addClass("slick-dotted"), n = t("<ul />").addClass(i.options.dotsClass), e = 0; e <= i.getDotCount(); e += 1) n.append(t("<li />").append(i.options.customPaging.call(this, i, e)));
            i.$dots = n.appendTo(i.options.appendDots), i.$dots.find("li").first().addClass("slick-active").attr("aria-hidden", "false")
        }
    }, e.prototype.buildOut = function () {
        var e = this;
        e.$slides = e.$slider.children(e.options.slide + ":not(.slick-cloned)").addClass("slick-slide"), e.slideCount = e.$slides.length, e.$slides.each(function (e, n) {
            t(n).attr("data-slick-index", e).data("originalStyling", t(n).attr("style") || "")
        }), e.$slider.addClass("slick-slider"), e.$slideTrack = 0 === e.slideCount ? t('<div class="slick-track"/>').appendTo(e.$slider) : e.$slides.wrapAll('<div class="slick-track"/>').parent(), e.$list = e.$slideTrack.wrap('<div aria-live="polite" class="slick-list"/>').parent(), e.$slideTrack.css("opacity", 0), !0 !== e.options.centerMode && !0 !== e.options.swipeToSlide || (e.options.slidesToScroll = 1), t("img[data-lazy]", e.$slider).not("[src]").addClass("slick-loading"), e.setupInfinite(), e.buildArrows(), e.buildDots(), e.updateDots(), e.setSlideClasses("number" == typeof e.currentSlide ? e.currentSlide : 0), !0 === e.options.draggable && e.$list.addClass("draggable")
    }, e.prototype.buildRows = function () {
        var t, e, n, i, o, s, a, r = this;
        if (i = document.createDocumentFragment(), s = r.$slider.children(), r.options.rows > 1) {
            for (a = r.options.slidesPerRow * r.options.rows, o = Math.ceil(s.length / a), t = 0; t < o; t++) {
                var c = document.createElement("div");
                for (e = 0; e < r.options.rows; e++) {
                    var l = document.createElement("div");
                    for (n = 0; n < r.options.slidesPerRow; n++) {
                        var d = t * a + (e * r.options.slidesPerRow + n);
                        s.get(d) && l.appendChild(s.get(d))
                    }
                    c.appendChild(l)
                }
                i.appendChild(c)
            }
            r.$slider.empty().append(i), r.$slider.children().children().children().css({
                width: 100 / r.options.slidesPerRow + "%",
                display: "inline-block"
            })
        }
    }, e.prototype.checkResponsive = function (e, n) {
        var i, o, s, a = this, r = !1, c = a.$slider.width(), l = window.innerWidth || t(window).width();
        if ("window" === a.respondTo ? s = l : "slider" === a.respondTo ? s = c : "min" === a.respondTo && (s = Math.min(l, c)), a.options.responsive && a.options.responsive.length && null !== a.options.responsive) {
            o = null
            ;
            for (i in a.breakpoints) a.breakpoints.hasOwnProperty(i) && (!1 === a.originalSettings.mobileFirst ? s < a.breakpoints[i] && (o = a.breakpoints[i]) : s > a.breakpoints[i] && (o = a.breakpoints[i]));
            null !== o ? null !== a.activeBreakpoint ? (o !== a.activeBreakpoint || n) && (a.activeBreakpoint = o, "unslick" === a.breakpointSettings[o] ? a.unslick(o) : (a.options = t.extend({}, a.originalSettings, a.breakpointSettings[o]), !0 === e && (a.currentSlide = a.options.initialSlide), a.refresh(e)), r = o) : (a.activeBreakpoint = o, "unslick" === a.breakpointSettings[o] ? a.unslick(o) : (a.options = t.extend({}, a.originalSettings, a.breakpointSettings[o]), !0 === e && (a.currentSlide = a.options.initialSlide), a.refresh(e)), r = o) : null !== a.activeBreakpoint && (a.activeBreakpoint = null, a.options = a.originalSettings, !0 === e && (a.currentSlide = a.options.initialSlide), a.refresh(e), r = o), e || !1 === r || a.$slider.trigger("breakpoint", [a, r])
        }
    }, e.prototype.changeSlide = function (e, n) {
        var i, o, s, a = this, r = t(e.currentTarget);
        switch (r.is("a") && e.preventDefault(), r.is("li") || (r = r.closest("li")), s = a.slideCount % a.options.slidesToScroll != 0, i = s ? 0 : (a.slideCount - a.currentSlide) % a.options.slidesToScroll, e.data.message) {
            case"previous":
                o = 0 === i ? a.options.slidesToScroll : a.options.slidesToShow - i, a.slideCount > a.options.slidesToShow && a.slideHandler(a.currentSlide - o, !1, n);
                break;
            case"next":
                o = 0 === i ? a.options.slidesToScroll : i, a.slideCount > a.options.slidesToShow && a.slideHandler(a.currentSlide + o, !1, n);
                break;
            case"index":
                var c = 0 === e.data.index ? 0 : e.data.index || r.index() * a.options.slidesToScroll;
                a.slideHandler(a.checkNavigable(c), !1, n), r.children().trigger("focus");
                break;
            default:
                return
        }
    }, e.prototype.checkNavigable = function (t) {
        var e, n, i = this;
        if (e = i.getNavigableIndexes(), n = 0, t > e[e.length - 1]) t = e[e.length - 1]; else for (var o in e) {
            if (t < e[o]) {
                t = n;
                break
            }
            n = e[o]
        }
        return t
    }, e.prototype.cleanUpEvents = function () {
        var e = this;
        e.options.dots && null !== e.$dots && t("li", e.$dots).off("click.slick", e.changeSlide).off("mouseenter.slick", t.proxy(e.interrupt, e, !0)).off("mouseleave.slick", t.proxy(e.interrupt, e, !1)), e.$slider.off("focus.slick blur.slick"), !0 === e.options.arrows && e.slideCount > e.options.slidesToShow && (e.$prevArrow && e.$prevArrow.off("click.slick", e.changeSlide), e.$nextArrow && e.$nextArrow.off("click.slick", e.changeSlide)), e.$list.off("touchstart.slick mousedown.slick", e.swipeHandler), e.$list.off("touchmove.slick mousemove.slick", e.swipeHandler), e.$list.off("touchend.slick mouseup.slick", e.swipeHandler), e.$list.off("touchcancel.slick mouseleave.slick", e.swipeHandler), e.$list.off("click.slick", e.clickHandler), t(document).off(e.visibilityChange, e.visibility), e.cleanUpSlideEvents(), !0 === e.options.accessibility && e.$list.off("keydown.slick", e.keyHandler), !0 === e.options.focusOnSelect && t(e.$slideTrack).children().off("click.slick", e.selectHandler), t(window).off("orientationchange.slick.slick-" + e.instanceUid, e.orientationChange), t(window).off("resize.slick.slick-" + e.instanceUid, e.resize), t("[draggable!=true]", e.$slideTrack).off("dragstart", e.preventDefault), t(window).off("load.slick.slick-" + e.instanceUid, e.setPosition), t(document).off("ready.slick.slick-" + e.instanceUid, e.setPosition)
    }, e.prototype.cleanUpSlideEvents = function () {
        var e = this;
        e.$list.off("mouseenter.slick", t.proxy(e.interrupt, e, !0)), e.$list.off("mouseleave.slick", t.proxy(e.interrupt, e, !1))
    }, e.prototype.cleanUpRows = function () {
        var t, e = this;
        e.options.rows > 1 && (t = e.$slides.children().children(), t.removeAttr("style"), e.$slider.empty().append(t))
    }, e.prototype.clickHandler = function (t) {
        !1 === this.shouldClick && (t.stopImmediatePropagation(), t.stopPropagation(), t.preventDefault())
    }, e.prototype.destroy = function (e) {
        var n = this;
        n.autoPlayClear(), n.touchObject = {}, n.cleanUpEvents(), t(".slick-cloned", n.$slider).detach(), n.$dots && n.$dots.remove(), n.$prevArrow && n.$prevArrow.length && (n.$prevArrow.removeClass("slick-disabled slick-arrow slick-hidden").removeAttr("aria-hidden aria-disabled tabindex").css("display", ""), n.htmlExpr.test(n.options.prevArrow) && n.$prevArrow.remove()), n.$nextArrow && n.$nextArrow.length && (n.$nextArrow.removeClass("slick-disabled slick-arrow slick-hidden").removeAttr("aria-hidden aria-disabled tabindex").css("display", ""), n.htmlExpr.test(n.options.nextArrow) && n.$nextArrow.remove()), n.$slides && (n.$slides.removeClass("slick-slide slick-active slick-center slick-visible slick-current").removeAttr("aria-hidden").removeAttr("data-slick-index").each(function () {
            t(this).attr("style", t(this).data("originalStyling"))
        }), n.$slideTrack.children(this.options.slide).detach(), n.$slideTrack.detach(), n.$list.detach(), n.$slider.append(n.$slides)), n.cleanUpRows(), n.$slider.removeClass("slick-slider"), n.$slider.removeClass("slick-initialized"), n.$slider.removeClass("slick-dotted"), n.unslicked = !0, e || n.$slider.trigger("destroy", [n])
    }, e.prototype.disableTransition = function (t) {
        var e = this, n = {};
        n[e.transitionType] = "", !1 === e.options.fade ? e.$slideTrack.css(n) : e.$slides.eq(t).css(n)
    }, e.prototype.fadeSlide = function (t, e) {
        var n = this;
        !1 === n.cssTransitions ? (n.$slides.eq(t).css({zIndex: n.options.zIndex}), n.$slides.eq(t).animate({opacity: 1}, n.options.speed, n.options.easing, e)) : (n.applyTransition(t), n.$slides.eq(t).css({
            opacity: 1,
            zIndex: n.options.zIndex
        }), e && setTimeout(function () {
            n.disableTransition(t), e.call()
        }, n.options.speed))
    }, e.prototype.fadeSlideOut = function (t) {
        var e = this;
        !1 === e.cssTransitions ? e.$slides.eq(t).animate({
            opacity: 0,
            zIndex: e.options.zIndex - 2
        }, e.options.speed, e.options.easing) : (e.applyTransition(t), e.$slides.eq(t).css({
            opacity: 0,
            zIndex: e.options.zIndex - 2
        }))
    }, e.prototype.filterSlides = e.prototype.slickFilter = function (t) {
        var e = this;
        null !== t && (e.$slidesCache = e.$slides, e.unload(), e.$slideTrack.children(this.options.slide).detach(), e.$slidesCache.filter(t).appendTo(e.$slideTrack), e.reinit())
    }, e.prototype.focusHandler = function () {
        var e = this;
        e.$slider.off("focus.slick blur.slick").on("focus.slick blur.slick", "*:not(.slick-arrow)", function (n) {
            n.stopImmediatePropagation();
            var i = t(this);
            setTimeout(function () {
                e.options.pauseOnFocus && (e.focussed = i.is(":focus"), e.autoPlay())
            }, 0)
        })
    }, e.prototype.getCurrent = e.prototype.slickCurrentSlide = function () {
        return this.currentSlide
    }, e.prototype.getDotCount = function () {
        var t = this, e = 0, n = 0, i = 0;
        if (!0 === t.options.infinite) for (; e < t.slideCount;) ++i, e = n + t.options.slidesToScroll, n += t.options.slidesToScroll <= t.options.slidesToShow ? t.options.slidesToScroll : t.options.slidesToShow; else if (!0 === t.options.centerMode) i = t.slideCount; else if (t.options.asNavFor) for (; e < t.slideCount;) ++i, e = n + t.options.slidesToScroll, n += t.options.slidesToScroll <= t.options.slidesToShow ? t.options.slidesToScroll : t.options.slidesToShow; else i = 1 + Math.ceil((t.slideCount - t.options.slidesToShow) / t.options.slidesToScroll);
        return i - 1
    }, e.prototype.getLeft = function (t) {
        var e, n, i, o = this, s = 0;
        return o.slideOffset = 0, n = o.$slides.first().outerHeight(!0), !0 === o.options.infinite ? (o.slideCount > o.options.slidesToShow && (o.slideOffset = o.slideWidth * o.options.slidesToShow * -1, s = n * o.options.slidesToShow * -1), o.slideCount % o.options.slidesToScroll != 0 && t + o.options.slidesToScroll > o.slideCount && o.slideCount > o.options.slidesToShow && (t > o.slideCount ? (o.slideOffset = (o.options.slidesToShow - (t - o.slideCount)) * o.slideWidth * -1, s = (o.options.slidesToShow - (t - o.slideCount)) * n * -1) : (o.slideOffset = o.slideCount % o.options.slidesToScroll * o.slideWidth * -1, s = o.slideCount % o.options.slidesToScroll * n * -1))) : t + o.options.slidesToShow > o.slideCount && (o.slideOffset = (t + o.options.slidesToShow - o.slideCount) * o.slideWidth, s = (t + o.options.slidesToShow - o.slideCount) * n), o.slideCount <= o.options.slidesToShow && (o.slideOffset = 0, s = 0), !0 === o.options.centerMode && !0 === o.options.infinite ? o.slideOffset += o.slideWidth * Math.floor(o.options.slidesToShow / 2) - o.slideWidth : !0 === o.options.centerMode && (o.slideOffset = 0, o.slideOffset += o.slideWidth * Math.floor(o.options.slidesToShow / 2)), e = !1 === o.options.vertical ? t * o.slideWidth * -1 + o.slideOffset : t * n * -1 + s, !0 === o.options.variableWidth && (i = o.slideCount <= o.options.slidesToShow || !1 === o.options.infinite ? o.$slideTrack.children(".slick-slide").eq(t) : o.$slideTrack.children(".slick-slide").eq(t + o.options.slidesToShow), e = !0 === o.options.rtl ? i[0] ? -1 * (o.$slideTrack.width() - i[0].offsetLeft - i.width()) : 0 : i[0] ? -1 * i[0].offsetLeft : 0, !0 === o.options.centerMode && (i = o.slideCount <= o.options.slidesToShow || !1 === o.options.infinite ? o.$slideTrack.children(".slick-slide").eq(t) : o.$slideTrack.children(".slick-slide").eq(t + o.options.slidesToShow + 1), e = !0 === o.options.rtl ? i[0] ? -1 * (o.$slideTrack.width() - i[0].offsetLeft - i.width()) : 0 : i[0] ? -1 * i[0].offsetLeft : 0, e += (o.$list.width() - i.outerWidth()) / 2)), e
    }, e.prototype.getOption = e.prototype.slickGetOption = function (t) {
        return this.options[t]
    }, e.prototype.getNavigableIndexes = function () {
        var t, e = this, n = 0, i = 0, o = [];
        for (!1 === e.options.infinite ? t = e.slideCount : (n = -1 * e.options.slidesToScroll, i = -1 * e.options.slidesToScroll, t = 2 * e.slideCount); n < t;) o.push(n), n = i + e.options.slidesToScroll, i += e.options.slidesToScroll <= e.options.slidesToShow ? e.options.slidesToScroll : e.options.slidesToShow;
        return o
    }, e.prototype.getSlick = function () {
        return this
    }, e.prototype.getSlideCount = function () {
        var e, n, i = this;
        return n = !0 === i.options.centerMode ? i.slideWidth * Math.floor(i.options.slidesToShow / 2) : 0, !0 === i.options.swipeToSlide ? (i.$slideTrack.find(".slick-slide").each(function (o, s) {
            if (s.offsetLeft - n + t(s).outerWidth() / 2 > -1 * i.swipeLeft) return e = s, !1
        }), Math.abs(t(e).attr("data-slick-index") - i.currentSlide) || 1) : i.options.slidesToScroll
    }, e.prototype.goTo = e.prototype.slickGoTo = function (t, e) {
        this.changeSlide({data: {message: "index", index: parseInt(t)}}, e)
    }, e.prototype.init = function (e) {
        var n = this;
        t(n.$slider).hasClass("slick-initialized") || (t(n.$slider).addClass("slick-initialized"), n.buildRows(), n.buildOut(), n.setProps(), n.startLoad(), n.loadSlider(), n.initializeEvents(), n.updateArrows(), n.updateDots(), n.checkResponsive(!0), n.focusHandler()), e && n.$slider.trigger("init", [n]), !0 === n.options.accessibility && n.initADA(), n.options.autoplay && (n.paused = !1, n.autoPlay())
    }, e.prototype.initADA = function () {
        var e = this;
        e.$slides.add(e.$slideTrack.find(".slick-cloned")).attr({
            "aria-hidden": "true",
            tabindex: "-1"
        }).find("a, input, button, select").attr({tabindex: "-1"}), e.$slideTrack.attr("role", "listbox"), e.$slides.not(e.$slideTrack.find(".slick-cloned")).each(function (n) {
            t(this).attr({role: "option", "aria-describedby": "slick-slide" + e.instanceUid + n})
        }), null !== e.$dots && e.$dots.attr("role", "tablist").find("li").each(function (n) {
            t(this).attr({
                role: "presentation",
                "aria-selected": "false",
                "aria-controls": "navigation" + e.instanceUid + n,
                id: "slick-slide" + e.instanceUid + n
            })
        }).first().attr("aria-selected", "true").end().find("button").attr("role", "button").end().closest("div").attr("role", "toolbar"), e.activateADA()
    }, e.prototype.initArrowEvents = function () {
        var t = this;
        !0 === t.options.arrows && t.slideCount > t.options.slidesToShow && (t.$prevArrow.off("click.slick").on("click.slick", {message: "previous"}, t.changeSlide), t.$nextArrow.off("click.slick").on("click.slick", {message: "next"}, t.changeSlide))
    }, e.prototype.initDotEvents = function () {
        var e = this;
        !0 === e.options.dots && e.slideCount > e.options.slidesToShow && t("li", e.$dots).on("click.slick", {message: "index"}, e.changeSlide), !0 === e.options.dots && !0 === e.options.pauseOnDotsHover && t("li", e.$dots).on("mouseenter.slick", t.proxy(e.interrupt, e, !0)).on("mouseleave.slick", t.proxy(e.interrupt, e, !1))
    }, e.prototype.initSlideEvents = function () {
        var e = this;
        e.options.pauseOnHover && (e.$list.on("mouseenter.slick", t.proxy(e.interrupt, e, !0)), e.$list.on("mouseleave.slick", t.proxy(e.interrupt, e, !1)))
    }, e.prototype.initializeEvents = function () {
        var e = this;
        e.initArrowEvents(), e.initDotEvents(), e.initSlideEvents(), e.$list.on("touchstart.slick mousedown.slick", {action: "start"}, e.swipeHandler), e.$list.on("touchmove.slick mousemove.slick", {action: "move"}, e.swipeHandler), e.$list.on("touchend.slick mouseup.slick", {action: "end"}, e.swipeHandler), e.$list.on("touchcancel.slick mouseleave.slick", {action: "end"}, e.swipeHandler), e.$list.on("click.slick", e.clickHandler), t(document).on(e.visibilityChange, t.proxy(e.visibility, e)), !0 === e.options.accessibility && e.$list.on("keydown.slick", e.keyHandler), !0 === e.options.focusOnSelect && t(e.$slideTrack).children().on("click.slick", e.selectHandler), t(window).on("orientationchange.slick.slick-" + e.instanceUid, t.proxy(e.orientationChange, e)), t(window).on("resize.slick.slick-" + e.instanceUid, t.proxy(e.resize, e)), t("[draggable!=true]", e.$slideTrack).on("dragstart", e.preventDefault), t(window).on("load.slick.slick-" + e.instanceUid, e.setPosition), t(document).on("ready.slick.slick-" + e.instanceUid, e.setPosition)
    }, e.prototype.initUI = function () {
        var t = this;
        !0 === t.options.arrows && t.slideCount > t.options.slidesToShow && (t.$prevArrow.show(), t.$nextArrow.show()), !0 === t.options.dots && t.slideCount > t.options.slidesToShow && t.$dots.show()
    }, e.prototype.keyHandler = function (t) {
        var e = this;
        t.target.tagName.match("TEXTAREA|INPUT|SELECT") || (37 === t.keyCode && !0 === e.options.accessibility ? e.changeSlide({data: {message: !0 === e.options.rtl ? "next" : "previous"}}) : 39 === t.keyCode && !0 === e.options.accessibility && e.changeSlide({data: {message: !0 === e.options.rtl ? "previous" : "next"}}))
    }, e.prototype.lazyLoad = function () {
        function e(e) {
            t("img[data-lazy]", e).each(function () {
                var e = t(this), n = t(this).attr("data-lazy"), i = document.createElement("img");
                i.onload = function () {
                    e.animate({opacity: 0}, 100, function () {
                        e.attr("src", n).animate({opacity: 1}, 200, function () {
                            e.removeAttr("data-lazy").removeClass("slick-loading")
                        }), a.$slider.trigger("lazyLoaded", [a, e, n])
                    })
                }, i.onerror = function () {
                    e.removeAttr("data-lazy").removeClass("slick-loading").addClass("slick-lazyload-error"), a.$slider.trigger("lazyLoadError", [a, e, n])
                }, i.src = n
            })
        }

        var n, i, o, s, a = this;
        !0 === a.options.centerMode ? !0 === a.options.infinite ? (o = a.currentSlide + (a.options.slidesToShow / 2 + 1), s = o + a.options.slidesToShow + 2) : (o = Math.max(0, a.currentSlide - (a.options.slidesToShow / 2 + 1)), s = a.options.slidesToShow / 2 + 1 + 2 + a.currentSlide) : (o = a.options.infinite ? a.options.slidesToShow + a.currentSlide : a.currentSlide, s = Math.ceil(o + a.options.slidesToShow), !0 === a.options.fade && (o > 0 && o--, s <= a.slideCount && s++)), n = a.$slider.find(".slick-slide").slice(o, s), e(n), a.slideCount <= a.options.slidesToShow ? (i = a.$slider.find(".slick-slide"), e(i)) : a.currentSlide >= a.slideCount - a.options.slidesToShow ? (i = a.$slider.find(".slick-cloned").slice(0, a.options.slidesToShow), e(i)) : 0 === a.currentSlide && (i = a.$slider.find(".slick-cloned").slice(-1 * a.options.slidesToShow), e(i))
    }, e.prototype.loadSlider = function () {
        var t = this;
        t.setPosition(), t.$slideTrack.css({opacity: 1}), t.$slider.removeClass("slick-loading"), t.initUI(), "progressive" === t.options.lazyLoad && t.progressiveLazyLoad()
    }, e.prototype.next = e.prototype.slickNext = function () {
        this.changeSlide({data: {message: "next"}})
    }, e.prototype.orientationChange = function () {
        var t = this;
        t.checkResponsive(), t.setPosition()
    }, e.prototype.pause = e.prototype.slickPause = function () {
        var t = this;
        t.autoPlayClear(), t.paused = !0
    }, e.prototype.play = e.prototype.slickPlay = function () {
        var t = this;
        t.autoPlay(), t.options.autoplay = !0, t.paused = !1, t.focussed = !1, t.interrupted = !1
    }, e.prototype.postSlide = function (t) {
        var e = this;
        e.unslicked || (e.$slider.trigger("afterChange", [e, t]), e.animating = !1, e.setPosition(), e.swipeLeft = null, e.options.autoplay && e.autoPlay(), !0 === e.options.accessibility && e.initADA())
    }, e.prototype.prev = e.prototype.slickPrev = function () {
        this.changeSlide({data: {message: "previous"}})
    }, e.prototype.preventDefault = function (t) {
        t.preventDefault()
    }, e.prototype.progressiveLazyLoad = function (e) {
        e = e || 1;
        var n, i, o, s = this, a = t("img[data-lazy]", s.$slider);
        a.length ? (n = a.first(), i = n.attr("data-lazy"), o = document.createElement("img"), o.onload = function () {
            n.attr("src", i).removeAttr("data-lazy").removeClass("slick-loading"), !0 === s.options.adaptiveHeight && s.setPosition(), s.$slider.trigger("lazyLoaded", [s, n, i]), s.progressiveLazyLoad()
        }, o.onerror = function () {
            e < 3 ? setTimeout(function () {
                s.progressiveLazyLoad(e + 1)
            }, 500) : (n.removeAttr("data-lazy").removeClass("slick-loading").addClass("slick-lazyload-error"), s.$slider.trigger("lazyLoadError", [s, n, i]), s.progressiveLazyLoad())
        }, o.src = i) : s.$slider.trigger("allImagesLoaded", [s])
    }, e.prototype.refresh = function (e) {
        var n, i, o = this;
        i = o.slideCount - o.options.slidesToShow, !o.options.infinite && o.currentSlide > i && (o.currentSlide = i), o.slideCount <= o.options.slidesToShow && (o.currentSlide = 0), n = o.currentSlide, o.destroy(!0), t.extend(o, o.initials, {currentSlide: n}), o.init(), e || o.changeSlide({
            data: {
                message: "index",
                index: n
            }
        }, !1)
    }, e.prototype.registerBreakpoints = function () {
        var e, n, i, o = this, s = o.options.responsive || null;
        if ("array" === t.type(s) && s.length) {
            o.respondTo = o.options.respondTo || "window";
            for (e in s) if (i = o.breakpoints.length - 1, n = s[e].breakpoint, s.hasOwnProperty(e)) {
                for (; i >= 0;) o.breakpoints[i] && o.breakpoints[i] === n && o.breakpoints.splice(i, 1), i--;
                o.breakpoints.push(n), o.breakpointSettings[n] = s[e].settings
            }
            o.breakpoints.sort(function (t, e) {
                return o.options.mobileFirst ? t - e : e - t
            })
        }
    }, e.prototype.reinit = function () {
        var e = this;
        e.$slides = e.$slideTrack.children(e.options.slide).addClass("slick-slide"), e.slideCount = e.$slides.length, e.currentSlide >= e.slideCount && 0 !== e.currentSlide && (e.currentSlide = e.currentSlide - e.options.slidesToScroll), e.slideCount <= e.options.slidesToShow && (e.currentSlide = 0), e.registerBreakpoints(), e.setProps(), e.setupInfinite(), e.buildArrows(), e.updateArrows(), e.initArrowEvents(), e.buildDots(), e.updateDots(), e.initDotEvents(), e.cleanUpSlideEvents(), e.initSlideEvents(), e.checkResponsive(!1, !0), !0 === e.options.focusOnSelect && t(e.$slideTrack).children().on("click.slick", e.selectHandler), e.setSlideClasses("number" == typeof e.currentSlide ? e.currentSlide : 0), e.setPosition(), e.focusHandler(), e.paused = !e.options.autoplay, e.autoPlay(), e.$slider.trigger("reInit", [e])
    }, e.prototype.resize = function () {
        var e = this;
        t(window).width() !== e.windowWidth && (clearTimeout(e.windowDelay), e.windowDelay = window.setTimeout(function () {
            e.windowWidth = t(window).width(), e.checkResponsive(), e.unslicked || e.setPosition()
        }, 50))
    }, e.prototype.removeSlide = e.prototype.slickRemove = function (t, e, n) {
        var i = this;
        if ("boolean" == typeof t ? (e = t, t = !0 === e ? 0 : i.slideCount - 1) : t = !0 === e ? --t : t, i.slideCount < 1 || t < 0 || t > i.slideCount - 1) return !1;
        i.unload(), !0 === n ? i.$slideTrack.children().remove() : i.$slideTrack.children(this.options.slide).eq(t).remove(), i.$slides = i.$slideTrack.children(this.options.slide), i.$slideTrack.children(this.options.slide).detach(), i.$slideTrack.append(i.$slides), i.$slidesCache = i.$slides, i.reinit()
    }, e.prototype.setCSS = function (t) {
        var e, n, i = this, o = {};
        !0 === i.options.rtl && (t = -t), e = "left" == i.positionProp ? Math.ceil(t) + "px" : "0px", n = "top" == i.positionProp ? Math.ceil(t) + "px" : "0px", o[i.positionProp] = t, !1 === i.transformsEnabled ? i.$slideTrack.css(o) : (o = {}, !1 === i.cssTransitions ? (o[i.animType] = "translate(" + e + ", " + n + ")", i.$slideTrack.css(o)) : (o[i.animType] = "translate3d(" + e + ", " + n + ", 0px)", i.$slideTrack.css(o)))
    }, e.prototype.setDimensions = function () {
        var t = this;
        !1 === t.options.vertical ? !0 === t.options.centerMode && t.$list.css({padding: "0px " + t.options.centerPadding}) : (t.$list.height(t.$slides.first().outerHeight(!0) * t.options.slidesToShow), !0 === t.options.centerMode && t.$list.css({padding: t.options.centerPadding + " 0px"})), t.listWidth = t.$list.width(), t.listHeight = t.$list.height(), !1 === t.options.vertical && !1 === t.options.variableWidth ? (t.slideWidth = Math.ceil(t.listWidth / t.options.slidesToShow), t.$slideTrack.width(Math.ceil(t.slideWidth * t.$slideTrack.children(".slick-slide").length))) : !0 === t.options.variableWidth ? t.$slideTrack.width(5e3 * t.slideCount) : (t.slideWidth = Math.ceil(t.listWidth), t.$slideTrack.height(Math.ceil(t.$slides.first().outerHeight(!0) * t.$slideTrack.children(".slick-slide").length)));
        var e = t.$slides.first().outerWidth(!0) - t.$slides.first().width();
        !1 === t.options.variableWidth && t.$slideTrack.children(".slick-slide").width(t.slideWidth - e)
    }, e.prototype.setFade = function () {
        var e, n = this;
        n.$slides.each(function (i, o) {
            e = n.slideWidth * i * -1, !0 === n.options.rtl ? t(o).css({
                position: "relative",
                right: e,
                top: 0,
                zIndex: n.options.zIndex - 2,
                opacity: 0
            }) : t(o).css({position: "relative", left: e, top: 0, zIndex: n.options.zIndex - 2, opacity: 0})
        }), n.$slides.eq(n.currentSlide).css({zIndex: n.options.zIndex - 1, opacity: 1})
    }, e.prototype.setHeight = function () {
        var t = this;
        if (1 === t.options.slidesToShow && !0 === t.options.adaptiveHeight && !1 === t.options.vertical) {
            var e = t.$slides.eq(t.currentSlide).outerHeight(!0);
            t.$list.css("height", e)
        }
    }, e.prototype.setOption = e.prototype.slickSetOption = function () {
        var e, n, i, o, s, a = this, r = !1;
        if ("object" === t.type(arguments[0]) ? (i = arguments[0], r = arguments[1], s = "multiple") : "string" === t.type(arguments[0]) && (i = arguments[0], o = arguments[1], r = arguments[2], "responsive" === arguments[0] && "array" === t.type(arguments[1]) ? s = "responsive" : "undefined" != typeof arguments[1] && (s = "single")), "single" === s) a.options[i] = o; else if ("multiple" === s) t.each(i, function (t, e) {
            a.options[t] = e
        }); else if ("responsive" === s) for (n in o) if ("array" !== t.type(a.options.responsive)) a.options.responsive = [o[n]]; else {
            for (e = a.options.responsive.length - 1; e >= 0;) a.options.responsive[e].breakpoint === o[n].breakpoint && a.options.responsive.splice(e, 1), e--;
            a.options.responsive.push(o[n])
        }
        r && (a.unload(), a.reinit())
    }, e.prototype.setPosition = function () {
        var t = this;
        t.setDimensions(), t.setHeight(), !1 === t.options.fade ? t.setCSS(t.getLeft(t.currentSlide)) : t.setFade(), t.$slider.trigger("setPosition", [t])
    }, e.prototype.setProps = function () {
        var t = this, e = document.body.style;
        t.positionProp = !0 === t.options.vertical ? "top" : "left", "top" === t.positionProp ? t.$slider.addClass("slick-vertical") : t.$slider.removeClass("slick-vertical"), e.WebkitTransition === undefined && e.MozTransition === undefined && e.msTransition === undefined || !0 === t.options.useCSS && (t.cssTransitions = !0), t.options.fade && ("number" == typeof t.options.zIndex ? t.options.zIndex < 3 && (t.options.zIndex = 3) : t.options.zIndex = t.defaults.zIndex), e.OTransform !== undefined && (t.animType = "OTransform", t.transformType = "-o-transform", t.transitionType = "OTransition", e.perspectiveProperty === undefined && e.webkitPerspective === undefined && (t.animType = !1)), e.MozTransform !== undefined && (t.animType = "MozTransform", t.transformType = "-moz-transform", t.transitionType = "MozTransition", e.perspectiveProperty === undefined && e.MozPerspective === undefined && (t.animType = !1)), e.webkitTransform !== undefined && (t.animType = "webkitTransform", t.transformType = "-webkit-transform", t.transitionType = "webkitTransition", e.perspectiveProperty === undefined && e.webkitPerspective === undefined && (t.animType = !1)), e.msTransform !== undefined && (t.animType = "msTransform", t.transformType = "-ms-transform", t.transitionType = "msTransition", e.msTransform === undefined && (t.animType = !1)), e.transform !== undefined && !1 !== t.animType && (t.animType = "transform", t.transformType = "transform", t.transitionType = "transition"), t.transformsEnabled = t.options.useTransform && null !== t.animType && !1 !== t.animType
    }, e.prototype.setSlideClasses = function (t) {
        var e, n, i, o, s = this;
        n = s.$slider.find(".slick-slide").removeClass("slick-active slick-center slick-current").attr("aria-hidden", "true"), s.$slides.eq(t).addClass("slick-current"), !0 === s.options.centerMode ? (e = Math.floor(s.options.slidesToShow / 2), !0 === s.options.infinite && (t >= e && t <= s.slideCount - 1 - e ? s.$slides.slice(t - e, t + e + 1).addClass("slick-active").attr("aria-hidden", "false") : (i = s.options.slidesToShow + t, n.slice(i - e + 1, i + e + 2).addClass("slick-active").attr("aria-hidden", "false")), 0 === t ? n.eq(n.length - 1 - s.options.slidesToShow).addClass("slick-center") : t === s.slideCount - 1 && n.eq(s.options.slidesToShow).addClass("slick-center")), s.$slides.eq(t).addClass("slick-center")) : t >= 0 && t <= s.slideCount - s.options.slidesToShow ? s.$slides.slice(t, t + s.options.slidesToShow).addClass("slick-active").attr("aria-hidden", "false") : n.length <= s.options.slidesToShow ? n.addClass("slick-active").attr("aria-hidden", "false") : (o = s.slideCount % s.options.slidesToShow, i = !0 === s.options.infinite ? s.options.slidesToShow + t : t, s.options.slidesToShow == s.options.slidesToScroll && s.slideCount - t < s.options.slidesToShow ? n.slice(i - (s.options.slidesToShow - o), i + o).addClass("slick-active").attr("aria-hidden", "false") : n.slice(i, i + s.options.slidesToShow).addClass("slick-active").attr("aria-hidden", "false")), "ondemand" === s.options.lazyLoad && s.lazyLoad()
    }, e.prototype.setupInfinite = function () {
        var e, n, i, o = this;
        if (!0 === o.options.fade && (o.options.centerMode = !1), !0 === o.options.infinite && !1 === o.options.fade && (n = null, o.slideCount > o.options.slidesToShow)) {
            for (i = !0 === o.options.centerMode ? o.options.slidesToShow + 1 : o.options.slidesToShow, e = o.slideCount; e > o.slideCount - i; e -= 1) n = e - 1, t(o.$slides[n]).clone(!0).attr("id", "").attr("data-slick-index", n - o.slideCount).prependTo(o.$slideTrack).addClass("slick-cloned");
            for (e = 0; e < i; e += 1) n = e, t(o.$slides[n]).clone(!0).attr("id", "").attr("data-slick-index", n + o.slideCount).appendTo(o.$slideTrack).addClass("slick-cloned");
            o.$slideTrack.find(".slick-cloned").find("[id]").each(function () {
                t(this).attr("id", "")
            })
        }
    }, e.prototype.interrupt = function (t) {
        var e = this;
        t || e.autoPlay(), e.interrupted = t
    }, e.prototype.selectHandler = function (e) {
        var n = this, i = t(e.target).is(".slick-slide") ? t(e.target) : t(e.target).parents(".slick-slide"),
            o = parseInt(i.attr("data-slick-index"));
        if (o || (o = 0), n.slideCount <= n.options.slidesToShow) return n.setSlideClasses(o), void n.asNavFor(o);
        n.slideHandler(o)
    }, e.prototype.slideHandler = function (t, e, n) {
        var i, o, s, a, r, c = null, l = this;
        if (e = e || !1, (!0 !== l.animating || !0 !== l.options.waitForAnimate) && !(!0 === l.options.fade && l.currentSlide === t || l.slideCount <= l.options.slidesToShow)) {
            if (!1 === e && l.asNavFor(t), i = t, c = l.getLeft(i), a = l.getLeft(l.currentSlide), l.currentLeft = null === l.swipeLeft ? a : l.swipeLeft, !1 === l.options.infinite && !1 === l.options.centerMode && (t < 0 || t > l.getDotCount() * l.options.slidesToScroll)) return void(!1 === l.options.fade && (i = l.currentSlide, !0 !== n ? l.animateSlide(a, function () {
                l.postSlide(i)
            }) : l.postSlide(i)));
            if (!1 === l.options.infinite && !0 === l.options.centerMode && (t < 0 || t > l.slideCount - l.options.slidesToScroll)) return void(!1 === l.options.fade && (i = l.currentSlide, !0 !== n ? l.animateSlide(a, function () {
                l.postSlide(i)
            }) : l.postSlide(i)));
            if (l.options.autoplay && clearInterval(l.autoPlayTimer), o = i < 0 ? l.slideCount % l.options.slidesToScroll != 0 ? l.slideCount - l.slideCount % l.options.slidesToScroll : l.slideCount + i : i >= l.slideCount ? l.slideCount % l.options.slidesToScroll != 0 ? 0 : i - l.slideCount : i, l.animating = !0, l.$slider.trigger("beforeChange", [l, l.currentSlide, o]), s = l.currentSlide, l.currentSlide = o, l.setSlideClasses(l.currentSlide), l.options.asNavFor && (r = l.getNavTarget(), r = r.slick("getSlick"), r.slideCount <= r.options.slidesToShow && r.setSlideClasses(l.currentSlide)), l.updateDots(), l.updateArrows(), !0 === l.options.fade) return !0 !== n ? (l.fadeSlideOut(s), l.fadeSlide(o, function () {
                l.postSlide(o)
            })) : l.postSlide(o), void l.animateHeight();
            !0 !== n ? l.animateSlide(c, function () {
                l.postSlide(o)
            }) : l.postSlide(o)
        }
    }, e.prototype.startLoad = function () {
        var t = this;
        !0 === t.options.arrows && t.slideCount > t.options.slidesToShow && (t.$prevArrow.hide(), t.$nextArrow.hide()), !0 === t.options.dots && t.slideCount > t.options.slidesToShow && t.$dots.hide(), t.$slider.addClass("slick-loading")
    }, e.prototype.swipeDirection = function () {
        var t, e, n, i, o = this;
        return t = o.touchObject.startX - o.touchObject.curX, e = o.touchObject.startY - o.touchObject.curY, n = Math.atan2(e, t), i = Math.round(180 * n / Math.PI), i < 0 && (i = 360 - Math.abs(i)), i <= 45 && i >= 0 ? !1 === o.options.rtl ? "left" : "right" : i <= 360 && i >= 315 ? !1 === o.options.rtl ? "left" : "right" : i >= 135 && i <= 225 ? !1 === o.options.rtl ? "right" : "left" : !0 === o.options.verticalSwiping ? i >= 35 && i <= 135 ? "down" : "up" : "vertical"
    }, e.prototype.swipeEnd = function () {
        var t, e, n = this;
        if (n.dragging = !1, n.interrupted = !1, n.shouldClick = !(n.touchObject.swipeLength > 10), n.touchObject.curX === undefined) return !1;
        if (!0 === n.touchObject.edgeHit && n.$slider.trigger("edge", [n, n.swipeDirection()]), n.touchObject.swipeLength >= n.touchObject.minSwipe) {
            switch (e = n.swipeDirection()) {
                case"left":
                case"down":
                    t = n.options.swipeToSlide ? n.checkNavigable(n.currentSlide + n.getSlideCount()) : n.currentSlide + n.getSlideCount(), n.currentDirection = 0;
                    break;
                case"right":
                case"up":
                    t = n.options.swipeToSlide ? n.checkNavigable(n.currentSlide - n.getSlideCount()) : n.currentSlide - n.getSlideCount(), n.currentDirection = 1
            }
            "vertical" != e && (n.slideHandler(t), n.touchObject = {}, n.$slider.trigger("swipe", [n, e]))
        } else n.touchObject.startX !== n.touchObject.curX && (n.slideHandler(n.currentSlide), n.touchObject = {})
    }, e.prototype.swipeHandler = function (t) {
        var e = this;
        if (!(!1 === e.options.swipe || "ontouchend" in document && !1 === e.options.swipe || !1 === e.options.draggable && -1 !== t.type.indexOf("mouse"))) switch (e.touchObject.fingerCount = t.originalEvent && t.originalEvent.touches !== undefined ? t.originalEvent.touches.length : 1, e.touchObject.minSwipe = e.listWidth / e.options.touchThreshold, !0 === e.options.verticalSwiping && (e.touchObject.minSwipe = e.listHeight / e.options.touchThreshold), t.data.action) {
            case"start":
                e.swipeStart(t);
                break;
            case"move":
                e.swipeMove(t);
                break;
            case"end":
                e.swipeEnd(t)
        }
    }, e.prototype.swipeMove = function (t) {
        var e, n, i, o, s, a = this;
        return s = t.originalEvent !== undefined ? t.originalEvent.touches : null, !(!a.dragging || s && 1 !== s.length) && (e = a.getLeft(a.currentSlide), a.touchObject.curX = s !== undefined ? s[0].pageX : t.clientX, a.touchObject.curY = s !== undefined ? s[0].pageY : t.clientY, a.touchObject.swipeLength = Math.round(Math.sqrt(Math.pow(a.touchObject.curX - a.touchObject.startX, 2))), !0 === a.options.verticalSwiping && (a.touchObject.swipeLength = Math.round(Math.sqrt(Math.pow(a.touchObject.curY - a.touchObject.startY, 2)))), "vertical" !== (n = a.swipeDirection()) ? (t.originalEvent !== undefined && a.touchObject.swipeLength > 4 && t.preventDefault(), o = (!1 === a.options.rtl ? 1 : -1) * (a.touchObject.curX > a.touchObject.startX ? 1 : -1), !0 === a.options.verticalSwiping && (o = a.touchObject.curY > a.touchObject.startY ? 1 : -1), i = a.touchObject.swipeLength, a.touchObject.edgeHit = !1, !1 === a.options.infinite && (0 === a.currentSlide && "right" === n || a.currentSlide >= a.getDotCount() && "left" === n) && (i = a.touchObject.swipeLength * a.options.edgeFriction, a.touchObject.edgeHit = !0), !1 === a.options.vertical ? a.swipeLeft = e + i * o : a.swipeLeft = e + i * (a.$list.height() / a.listWidth) * o, !0 === a.options.verticalSwiping && (a.swipeLeft = e + i * o), !0 !== a.options.fade && !1 !== a.options.touchMove && (!0 === a.animating ? (a.swipeLeft = null, !1) : void a.setCSS(a.swipeLeft))) : void 0)
    }, e.prototype.swipeStart = function (t) {
        var e, n = this;
        if (n.interrupted = !0, 1 !== n.touchObject.fingerCount || n.slideCount <= n.options.slidesToShow) return n.touchObject = {}, !1;
        t.originalEvent !== undefined && t.originalEvent.touches !== undefined && (e = t.originalEvent.touches[0]), n.touchObject.startX = n.touchObject.curX = e !== undefined ? e.pageX : t.clientX, n.touchObject.startY = n.touchObject.curY = e !== undefined ? e.pageY : t.clientY, n.dragging = !0
    }, e.prototype.unfilterSlides = e.prototype.slickUnfilter = function () {
        var t = this;
        null !== t.$slidesCache && (t.unload(), t.$slideTrack.children(this.options.slide).detach(), t.$slidesCache.appendTo(t.$slideTrack), t.reinit())
    }, e.prototype.unload = function () {
        var e = this;
        t(".slick-cloned", e.$slider).remove(), e.$dots && e.$dots.remove(), e.$prevArrow && e.htmlExpr.test(e.options.prevArrow) && e.$prevArrow.remove(), e.$nextArrow && e.htmlExpr.test(e.options.nextArrow) && e.$nextArrow.remove(), e.$slides.removeClass("slick-slide slick-active slick-visible slick-current").attr("aria-hidden", "true").css("width", "")
    }, e.prototype.unslick = function (t) {
        var e = this;
        e.$slider.trigger("unslick", [e, t]), e.destroy()
    }, e.prototype.updateArrows = function () {
        var t = this;
        Math.floor(t.options.slidesToShow / 2), !0 === t.options.arrows && t.slideCount > t.options.slidesToShow && !t.options.infinite && (t.$prevArrow.removeClass("slick-disabled").attr("aria-disabled", "false"), t.$nextArrow.removeClass("slick-disabled").attr("aria-disabled", "false"), 0 === t.currentSlide ? (t.$prevArrow.addClass("slick-disabled").attr("aria-disabled", "true"), t.$nextArrow.removeClass("slick-disabled").attr("aria-disabled", "false")) : t.currentSlide >= t.slideCount - t.options.slidesToShow && !1 === t.options.centerMode ? (t.$nextArrow.addClass("slick-disabled").attr("aria-disabled", "true"), t.$prevArrow.removeClass("slick-disabled").attr("aria-disabled", "false")) : t.currentSlide >= t.slideCount - 1 && !0 === t.options.centerMode && (t.$nextArrow.addClass("slick-disabled").attr("aria-disabled", "true"), t.$prevArrow.removeClass("slick-disabled").attr("aria-disabled", "false")))
    }, e.prototype.updateDots = function () {
        var t = this;
        null !== t.$dots && (t.$dots.find("li").removeClass("slick-active").attr("aria-hidden", "true"), t.$dots.find("li").eq(Math.floor(t.currentSlide / t.options.slidesToScroll)).addClass("slick-active").attr("aria-hidden", "false"))
    }, e.prototype.visibility = function () {
        var t = this;
        t.options.autoplay && (document[t.hidden] ? t.interrupted = !0 : t.interrupted = !1)
    }, t.fn.slick = function () {
        var t, n, i = this, o = arguments[0], s = Array.prototype.slice.call(arguments, 1), a = i.length;
        for (t = 0; t < a; t++) if ("object" == typeof o || void 0 === o ? i[t].slick = new e(i[t], o) : n = i[t].slick[o].apply(i[t].slick, s), void 0 !== n) return n;
        return i
    }
}), function (t, e) {
    "object" == typeof exports && "undefined" != typeof module ? module.exports = e() : "function" == typeof define && define.amd ? define(e) : t.moment = e()
}(this, function () {
    "use strict";

    function t() {
        return gi.apply(null, arguments)
    }

    function e(t) {
        gi = t
    }

    function n(t) {
        return t instanceof Array || "[object Array]" === Object.prototype.toString.call(t)
    }

    function i(t) {
        return null != t && "[object Object]" === Object.prototype.toString.call(t)
    }

    function o(t) {
        var e;
        for (e in t) return !1;
        return !0
    }

    function s(t) {
        return void 0 === t
    }

    function a(t) {
        return "number" == typeof t || "[object Number]" === Object.prototype.toString.call(t)
    }

    function r(t) {
        return t instanceof Date || "[object Date]" === Object.prototype.toString.call(t)
    }

    function c(t, e) {
        var n, i = [];
        for (n = 0; n < t.length; ++n) i.push(e(t[n], n));
        return i
    }

    function l(t, e) {
        return Object.prototype.hasOwnProperty.call(t, e)
    }

    function d(t, e) {
        for (var n in e) l(e, n) && (t[n] = e[n]);
        return l(e, "toString") && (t.toString = e.toString), l(e, "valueOf") && (t.valueOf = e.valueOf), t
    }

    function p(t, e, n, i) {
        return Ae(t, e, n, i, !0).utc()
    }

    function u() {
        return {
            empty: !1,
            unusedTokens: [],
            unusedInput: [],
            overflow: -2,
            charsLeftOver: 0,
            nullInput: !1,
            invalidMonth: null,
            invalidFormat: !1,
            userInvalidated: !1,
            iso: !1,
            parsedDateParts: [],
            meridiem: null,
            rfc2822: !1,
            weekdayMismatch: !1
        }
    }

    function f(t) {
        return null == t._pf && (t._pf = u()), t._pf
    }

    function h(t) {
        if (null == t._isValid) {
            var e = f(t), n = vi.call(e.parsedDateParts, function (t) {
                    return null != t
                }),
                i = !isNaN(t._d.getTime()) && e.overflow < 0 && !e.empty && !e.invalidMonth && !e.invalidWeekday && !e.nullInput && !e.invalidFormat && !e.userInvalidated && (!e.meridiem || e.meridiem && n);
            if (t._strict && (i = i && 0 === e.charsLeftOver && 0 === e.unusedTokens.length && void 0 === e.bigHour), null != Object.isFrozen && Object.isFrozen(t)) return i;
            t._isValid = i
        }
        return t._isValid
    }

    function M(t) {
        var e = p(NaN);
        return null != t ? d(f(e), t) : f(e).userInvalidated = !0, e
    }

    function b(t, e) {
        var n, i, o;
        if (s(e._isAMomentObject) || (t._isAMomentObject = e._isAMomentObject), s(e._i) || (t._i = e._i), s(e._f) || (t._f = e._f), s(e._l) || (t._l = e._l), s(e._strict) || (t._strict = e._strict), s(e._tzm) || (t._tzm = e._tzm), s(e._isUTC) || (t._isUTC = e._isUTC), s(e._offset) || (t._offset = e._offset), s(e._pf) || (t._pf = f(e)), s(e._locale) || (t._locale = e._locale), yi.length > 0) for (n = 0; n < yi.length; n++) i = yi[n], o = e[i], s(o) || (t[i] = o);
        return t
    }

    function m(e) {
        b(this, e), this._d = new Date(null != e._d ? e._d.getTime() : NaN), this.isValid() || (this._d = new Date(NaN)), !1 === Li && (Li = !0, t.updateOffset(this), Li = !1)
    }

    function A(t) {
        return t instanceof m || null != t && null != t._isAMomentObject
    }

    function g(t) {
        return t < 0 ? Math.ceil(t) || 0 : Math.floor(t)
    }

    function z(t) {
        var e = +t, n = 0;
        return 0 !== e && isFinite(e) && (n = g(e)), n
    }

    function v(t, e, n) {
        var i, o = Math.min(t.length, e.length), s = Math.abs(t.length - e.length), a = 0;
        for (i = 0; i < o; i++) (n && t[i] !== e[i] || !n && z(t[i]) !== z(e[i])) && a++;
        return a + s
    }

    function y(e) {
        !1 === t.suppressDeprecationWarnings && "undefined" != typeof console && console.warn && console.warn("Deprecation warning: " + e)
    }

    function L(e, n) {
        var i = !0;
        return d(function () {
            if (null != t.deprecationHandler && t.deprecationHandler(null, e), i) {
                for (var o, s = [], a = 0; a < arguments.length; a++) {
                    if (o = "", "object" == typeof arguments[a]) {
                        o += "\n[" + a + "] ";
                        for (var r in arguments[0]) o += r + ": " + arguments[0][r] + ", ";
                        o = o.slice(0, -2)
                    } else o = arguments[a];
                    s.push(o)
                }
                y(e + "\nArguments: " + Array.prototype.slice.call(s).join("") + "\n" + (new Error).stack), i = !1
            }
            return n.apply(this, arguments)
        }, n)
    }

    function O(e, n) {
        null != t.deprecationHandler && t.deprecationHandler(e, n), Oi[e] || (y(n), Oi[e] = !0)
    }

    function T(t) {
        return t instanceof Function || "[object Function]" === Object.prototype.toString.call(t)
    }

    function N(t) {
        var e, n;
        for (n in t) e = t[n], T(e) ? this[n] = e : this["_" + n] = e;
        this._config = t, this._dayOfMonthOrdinalParseLenient = new RegExp((this._dayOfMonthOrdinalParse.source || this._ordinalParse.source) + "|" + /\d{1,2}/.source)
    }

    function q(t, e) {
        var n, o = d({}, t);
        for (n in e) l(e, n) && (i(t[n]) && i(e[n]) ? (o[n] = {}, d(o[n], t[n]), d(o[n], e[n])) : null != e[n] ? o[n] = e[n] : delete o[n]);
        for (n in t) l(t, n) && !l(e, n) && i(t[n]) && (o[n] = d({}, o[n]));
        return o
    }

    function w(t) {
        null != t && this.set(t)
    }

    function S(t, e, n) {
        var i = this._calendar[t] || this._calendar.sameElse;
        return T(i) ? i.call(e, n) : i
    }

    function C(t) {
        var e = this._longDateFormat[t], n = this._longDateFormat[t.toUpperCase()];
        return e || !n ? e : (this._longDateFormat[t] = n.replace(/MMMM|MM|DD|dddd/g, function (t) {
            return t.slice(1)
        }), this._longDateFormat[t])
    }

    function W() {
        return this._invalidDate
    }

    function x(t) {
        return this._ordinal.replace("%d", t)
    }

    function k(t, e, n, i) {
        var o = this._relativeTime[n];
        return T(o) ? o(t, e, n, i) : o.replace(/%d/i, t)
    }

    function X(t, e) {
        var n = this._relativeTime[t > 0 ? "future" : "past"];
        return T(n) ? n(e) : n.replace(/%s/i, e)
    }

    function E(t, e) {
        var n = t.toLowerCase();
        Xi[n] = Xi[n + "s"] = Xi[e] = t
    }

    function B(t) {
        return "string" == typeof t ? Xi[t] || Xi[t.toLowerCase()] : void 0
    }

    function _(t) {
        var e, n, i = {};
        for (n in t) l(t, n) && (e = B(n)) && (i[e] = t[n]);
        return i
    }

    function D(t, e) {
        Ei[t] = e
    }

    function R(t) {
        var e = [];
        for (var n in t) e.push({unit: n, priority: Ei[n]});
        return e.sort(function (t, e) {
            return t.priority - e.priority
        }), e
    }

    function $(e, n) {
        return function (i) {
            return null != i ? (I(this, e, i), t.updateOffset(this, n), this) : P(this, e)
        }
    }

    function P(t, e) {
        return t.isValid() ? t._d["get" + (t._isUTC ? "UTC" : "") + e]() : NaN
    }

    function I(t, e, n) {
        t.isValid() && t._d["set" + (t._isUTC ? "UTC" : "") + e](n)
    }

    function j(t) {
        return t = B(t), T(this[t]) ? this[t]() : this
    }

    function H(t, e) {
        if ("object" == typeof t) {
            t = _(t);
            for (var n = R(t), i = 0; i < n.length; i++) this[n[i].unit](t[n[i].unit])
        } else if (t = B(t), T(this[t])) return this[t](e);
        return this
    }

    function F(t, e, n) {
        var i = "" + Math.abs(t), o = e - i.length;
        return (t >= 0 ? n ? "+" : "" : "-") + Math.pow(10, Math.max(0, o)).toString().substr(1) + i
    }

    function U(t, e, n, i) {
        var o = i;
        "string" == typeof i && (o = function () {
            return this[i]()
        }), t && (Ri[t] = o), e && (Ri[e[0]] = function () {
            return F(o.apply(this, arguments), e[1], e[2])
        }), n && (Ri[n] = function () {
            return this.localeData().ordinal(o.apply(this, arguments), t)
        })
    }

    function Y(t) {
        return t.match(/\[[\s\S]/) ? t.replace(/^\[|\]$/g, "") : t.replace(/\\/g, "")
    }

    function V(t) {
        var e, n, i = t.match(Bi);
        for (e = 0, n = i.length; e < n; e++) Ri[i[e]] ? i[e] = Ri[i[e]] : i[e] = Y(i[e]);
        return function (e) {
            var o, s = "";
            for (o = 0; o < n; o++) s += T(i[o]) ? i[o].call(e, t) : i[o];
            return s
        }
    }

    function G(t, e) {
        return t.isValid() ? (e = K(e, t.localeData()), Di[e] = Di[e] || V(e), Di[e](t)) : t.localeData().invalidDate()
    }

    function K(t, e) {
        function n(t) {
            return e.longDateFormat(t) || t
        }

        var i = 5;
        for (_i.lastIndex = 0; i >= 0 && _i.test(t);) t = t.replace(_i, n), _i.lastIndex = 0, i -= 1;
        return t
    }

    function Q(t, e, n) {
        io[t] = T(e) ? e : function (t) {
            return t && n ? n : e
        }
    }

    function J(t, e) {
        return l(io, t) ? io[t](e._strict, e._locale) : new RegExp(Z(t))
    }

    function Z(t) {
        return tt(t.replace("\\", "").replace(/\\(\[)|\\(\])|\[([^\]\[]*)\]|\\(.)/g, function (t, e, n, i, o) {
            return e || n || i || o
        }))
    }

    function tt(t) {
        return t.replace(/[-\/\\^$*+?.()|[\]{}]/g, "\\$&")
    }

    function et(t, e) {
        var n, i = e;
        for ("string" == typeof t && (t = [t]), a(e) && (i = function (t, n) {
            n[e] = z(t)
        }), n = 0; n < t.length; n++) oo[t[n]] = i
    }

    function nt(t, e) {
        et(t, function (t, n, i, o) {
            i._w = i._w || {}, e(t, i._w, i, o)
        })
    }

    function it(t, e, n) {
        null != e && l(oo, t) && oo[t](e, n._a, n, t)
    }

    function ot(t, e) {
        return new Date(Date.UTC(t, e + 1, 0)).getUTCDate()
    }

    function st(t, e) {
        return t ? n(this._months) ? this._months[t.month()] : this._months[(this._months.isFormat || bo).test(e) ? "format" : "standalone"][t.month()] : n(this._months) ? this._months : this._months.standalone
    }

    function at(t, e) {
        return t ? n(this._monthsShort) ? this._monthsShort[t.month()] : this._monthsShort[bo.test(e) ? "format" : "standalone"][t.month()] : n(this._monthsShort) ? this._monthsShort : this._monthsShort.standalone
    }

    function rt(t, e, n) {
        var i, o, s, a = t.toLocaleLowerCase();
        if (!this._monthsParse) for (this._monthsParse = [], this._longMonthsParse = [], this._shortMonthsParse = [], i = 0; i < 12; ++i) s = p([2e3, i]), this._shortMonthsParse[i] = this.monthsShort(s, "").toLocaleLowerCase(), this._longMonthsParse[i] = this.months(s, "").toLocaleLowerCase();
        return n ? "MMM" === e ? (o = Mo.call(this._shortMonthsParse, a), -1 !== o ? o : null) : (o = Mo.call(this._longMonthsParse, a), -1 !== o ? o : null) : "MMM" === e ? (o = Mo.call(this._shortMonthsParse, a), -1 !== o ? o : (o = Mo.call(this._longMonthsParse, a), -1 !== o ? o : null)) : (o = Mo.call(this._longMonthsParse, a), -1 !== o ? o : (o = Mo.call(this._shortMonthsParse, a), -1 !== o ? o : null))
    }

    function ct(t, e, n) {
        var i, o, s;
        if (this._monthsParseExact) return rt.call(this, t, e, n);
        for (this._monthsParse || (this._monthsParse = [], this._longMonthsParse = [], this._shortMonthsParse = []), i = 0; i < 12; i++) {
            if (o = p([2e3, i]), n && !this._longMonthsParse[i] && (this._longMonthsParse[i] = new RegExp("^" + this.months(o, "").replace(".", "") + "$", "i"), this._shortMonthsParse[i] = new RegExp("^" + this.monthsShort(o, "").replace(".", "") + "$", "i")), n || this._monthsParse[i] || (s = "^" + this.months(o, "") + "|^" + this.monthsShort(o, ""), this._monthsParse[i] = new RegExp(s.replace(".", ""), "i")), n && "MMMM" === e && this._longMonthsParse[i].test(t)) return i;
            if (n && "MMM" === e && this._shortMonthsParse[i].test(t)) return i;
            if (!n && this._monthsParse[i].test(t)) return i
        }
    }

    function lt(t, e) {
        var n;
        if (!t.isValid()) return t;
        if ("string" == typeof e) if (/^\d+$/.test(e)) e = z(e); else if (e = t.localeData().monthsParse(e), !a(e)) return t;
        return n = Math.min(t.date(), ot(t.year(), e)), t._d["set" + (t._isUTC ? "UTC" : "") + "Month"](e, n), t
    }

    function dt(e) {
        return null != e ? (lt(this, e), t.updateOffset(this, !0), this) : P(this, "Month")
    }

    function pt() {
        return ot(this.year(), this.month())
    }

    function ut(t) {
        return this._monthsParseExact ? (l(this, "_monthsRegex") || ht.call(this), t ? this._monthsShortStrictRegex : this._monthsShortRegex) : (l(this, "_monthsShortRegex") || (this._monthsShortRegex = go), this._monthsShortStrictRegex && t ? this._monthsShortStrictRegex : this._monthsShortRegex)
    }

    function ft(t) {
        return this._monthsParseExact ? (l(this, "_monthsRegex") || ht.call(this), t ? this._monthsStrictRegex : this._monthsRegex) : (l(this, "_monthsRegex") || (this._monthsRegex = zo), this._monthsStrictRegex && t ? this._monthsStrictRegex : this._monthsRegex)
    }

    function ht() {
        function t(t, e) {
            return e.length - t.length
        }

        var e, n, i = [], o = [], s = [];
        for (e = 0; e < 12; e++) n = p([2e3, e]), i.push(this.monthsShort(n, "")), o.push(this.months(n, "")), s.push(this.months(n, "")), s.push(this.monthsShort(n, ""));
        for (i.sort(t), o.sort(t), s.sort(t), e = 0; e < 12; e++) i[e] = tt(i[e]), o[e] = tt(o[e]);
        for (e = 0; e < 24; e++) s[e] = tt(s[e]);
        this._monthsRegex = new RegExp("^(" + s.join("|") + ")", "i"), this._monthsShortRegex = this._monthsRegex, this._monthsStrictRegex = new RegExp("^(" + o.join("|") + ")", "i"), this._monthsShortStrictRegex = new RegExp("^(" + i.join("|") + ")", "i")
    }

    function Mt(t) {
        return bt(t) ? 366 : 365
    }

    function bt(t) {
        return t % 4 == 0 && t % 100 != 0 || t % 400 == 0
    }

    function mt() {
        return bt(this.year())
    }

    function At(t, e, n, i, o, s, a) {
        var r = new Date(t, e, n, i, o, s, a);
        return t < 100 && t >= 0 && isFinite(r.getFullYear()) && r.setFullYear(t), r
    }

    function gt(t) {
        var e = new Date(Date.UTC.apply(null, arguments));
        return t < 100 && t >= 0 && isFinite(e.getUTCFullYear()) && e.setUTCFullYear(t), e
    }

    function zt(t, e, n) {
        var i = 7 + e - n;
        return -(7 + gt(t, 0, i).getUTCDay() - e) % 7 + i - 1
    }

    function vt(t, e, n, i, o) {
        var s, a, r = (7 + n - i) % 7, c = zt(t, i, o), l = 1 + 7 * (e - 1) + r + c;
        return l <= 0 ? (s = t - 1, a = Mt(s) + l) : l > Mt(t) ? (s = t + 1, a = l - Mt(t)) : (s = t, a = l), {
            year: s,
            dayOfYear: a
        }
    }

    function yt(t, e, n) {
        var i, o, s = zt(t.year(), e, n), a = Math.floor((t.dayOfYear() - s - 1) / 7) + 1;
        return a < 1 ? (o = t.year() - 1, i = a + Lt(o, e, n)) : a > Lt(t.year(), e, n) ? (i = a - Lt(t.year(), e, n), o = t.year() + 1) : (o = t.year(), i = a), {
            week: i,
            year: o
        }
    }

    function Lt(t, e, n) {
        var i = zt(t, e, n), o = zt(t + 1, e, n);
        return (Mt(t) - i + o) / 7
    }

    function Ot(t) {
        return yt(t, this._week.dow, this._week.doy).week
    }

    function Tt() {
        return this._week.dow
    }

    function Nt() {
        return this._week.doy
    }

    function qt(t) {
        var e = this.localeData().week(this);
        return null == t ? e : this.add(7 * (t - e), "d")
    }

    function wt(t) {
        var e = yt(this, 1, 4).week;
        return null == t ? e : this.add(7 * (t - e), "d")
    }

    function St(t, e) {
        return "string" != typeof t ? t : isNaN(t) ? (t = e.weekdaysParse(t), "number" == typeof t ? t : null) : parseInt(t, 10)
    }

    function Ct(t, e) {
        return "string" == typeof t ? e.weekdaysParse(t) % 7 || 7 : isNaN(t) ? null : t
    }

    function Wt(t, e) {
        return t ? n(this._weekdays) ? this._weekdays[t.day()] : this._weekdays[this._weekdays.isFormat.test(e) ? "format" : "standalone"][t.day()] : n(this._weekdays) ? this._weekdays : this._weekdays.standalone
    }

    function xt(t) {
        return t ? this._weekdaysShort[t.day()] : this._weekdaysShort
    }

    function kt(t) {
        return t ? this._weekdaysMin[t.day()] : this._weekdaysMin
    }

    function Xt(t, e, n) {
        var i, o, s, a = t.toLocaleLowerCase();
        if (!this._weekdaysParse) for (this._weekdaysParse = [], this._shortWeekdaysParse = [], this._minWeekdaysParse = [], i = 0; i < 7; ++i) s = p([2e3, 1]).day(i), this._minWeekdaysParse[i] = this.weekdaysMin(s, "").toLocaleLowerCase(), this._shortWeekdaysParse[i] = this.weekdaysShort(s, "").toLocaleLowerCase(), this._weekdaysParse[i] = this.weekdays(s, "").toLocaleLowerCase();
        return n ? "dddd" === e ? (o = Mo.call(this._weekdaysParse, a), -1 !== o ? o : null) : "ddd" === e ? (o = Mo.call(this._shortWeekdaysParse, a), -1 !== o ? o : null) : (o = Mo.call(this._minWeekdaysParse, a), -1 !== o ? o : null) : "dddd" === e ? (o = Mo.call(this._weekdaysParse, a), -1 !== o ? o : (o = Mo.call(this._shortWeekdaysParse, a), -1 !== o ? o : (o = Mo.call(this._minWeekdaysParse, a), -1 !== o ? o : null))) : "ddd" === e ? (o = Mo.call(this._shortWeekdaysParse, a), -1 !== o ? o : (o = Mo.call(this._weekdaysParse, a), -1 !== o ? o : (o = Mo.call(this._minWeekdaysParse, a), -1 !== o ? o : null))) : (o = Mo.call(this._minWeekdaysParse, a), -1 !== o ? o : (o = Mo.call(this._weekdaysParse, a), -1 !== o ? o : (o = Mo.call(this._shortWeekdaysParse, a), -1 !== o ? o : null)))
    }

    function Et(t, e, n) {
        var i, o, s;
        if (this._weekdaysParseExact) return Xt.call(this, t, e, n);
        for (this._weekdaysParse || (this._weekdaysParse = [], this._minWeekdaysParse = [], this._shortWeekdaysParse = [], this._fullWeekdaysParse = []), i = 0; i < 7; i++) {
            if (o = p([2e3, 1]).day(i), n && !this._fullWeekdaysParse[i] && (this._fullWeekdaysParse[i] = new RegExp("^" + this.weekdays(o, "").replace(".", ".?") + "$", "i"), this._shortWeekdaysParse[i] = new RegExp("^" + this.weekdaysShort(o, "").replace(".", ".?") + "$", "i"), this._minWeekdaysParse[i] = new RegExp("^" + this.weekdaysMin(o, "").replace(".", ".?") + "$", "i")), this._weekdaysParse[i] || (s = "^" + this.weekdays(o, "") + "|^" + this.weekdaysShort(o, "") + "|^" + this.weekdaysMin(o, ""), this._weekdaysParse[i] = new RegExp(s.replace(".", ""), "i")), n && "dddd" === e && this._fullWeekdaysParse[i].test(t)) return i;
            if (n && "ddd" === e && this._shortWeekdaysParse[i].test(t)) return i;
            if (n && "dd" === e && this._minWeekdaysParse[i].test(t)) return i;
            if (!n && this._weekdaysParse[i].test(t)) return i
        }
    }

    function Bt(t) {
        if (!this.isValid()) return null != t ? this : NaN;
        var e = this._isUTC ? this._d.getUTCDay() : this._d.getDay();
        return null != t ? (t = St(t, this.localeData()), this.add(t - e, "d")) : e
    }

    function _t(t) {
        if (!this.isValid()) return null != t ? this : NaN;
        var e = (this.day() + 7 - this.localeData()._week.dow) % 7;
        return null == t ? e : this.add(t - e, "d")
    }

    function Dt(t) {
        if (!this.isValid()) return null != t ? this : NaN;
        if (null != t) {
            var e = Ct(t, this.localeData());
            return this.day(this.day() % 7 ? e : e - 7)
        }
        return this.day() || 7
    }

    function Rt(t) {
        return this._weekdaysParseExact ? (l(this, "_weekdaysRegex") || It.call(this), t ? this._weekdaysStrictRegex : this._weekdaysRegex) : (l(this, "_weekdaysRegex") || (this._weekdaysRegex = No), this._weekdaysStrictRegex && t ? this._weekdaysStrictRegex : this._weekdaysRegex)
    }

    function $t(t) {
        return this._weekdaysParseExact ? (l(this, "_weekdaysRegex") || It.call(this), t ? this._weekdaysShortStrictRegex : this._weekdaysShortRegex) : (l(this, "_weekdaysShortRegex") || (this._weekdaysShortRegex = qo), this._weekdaysShortStrictRegex && t ? this._weekdaysShortStrictRegex : this._weekdaysShortRegex)
    }

    function Pt(t) {
        return this._weekdaysParseExact ? (l(this, "_weekdaysRegex") || It.call(this), t ? this._weekdaysMinStrictRegex : this._weekdaysMinRegex) : (l(this, "_weekdaysMinRegex") || (this._weekdaysMinRegex = wo), this._weekdaysMinStrictRegex && t ? this._weekdaysMinStrictRegex : this._weekdaysMinRegex)
    }

    function It() {
        function t(t, e) {
            return e.length - t.length
        }

        var e, n, i, o, s, a = [], r = [], c = [], l = [];
        for (e = 0; e < 7; e++) n = p([2e3, 1]).day(e), i = this.weekdaysMin(n, ""), o = this.weekdaysShort(n, ""), s = this.weekdays(n, ""), a.push(i), r.push(o), c.push(s), l.push(i), l.push(o), l.push(s);
        for (a.sort(t), r.sort(t), c.sort(t), l.sort(t), e = 0; e < 7; e++) r[e] = tt(r[e]), c[e] = tt(c[e]), l[e] = tt(l[e]);
        this._weekdaysRegex = new RegExp("^(" + l.join("|") + ")", "i"), this._weekdaysShortRegex = this._weekdaysRegex, this._weekdaysMinRegex = this._weekdaysRegex, this._weekdaysStrictRegex = new RegExp("^(" + c.join("|") + ")", "i"), this._weekdaysShortStrictRegex = new RegExp("^(" + r.join("|") + ")", "i"), this._weekdaysMinStrictRegex = new RegExp("^(" + a.join("|") + ")", "i")
    }

    function jt() {
        return this.hours() % 12 || 12
    }

    function Ht() {
        return this.hours() || 24
    }

    function Ft(t, e) {
        U(t, 0, 0, function () {
            return this.localeData().meridiem(this.hours(), this.minutes(), e)
        })
    }

    function Ut(t, e) {
        return e._meridiemParse
    }

    function Yt(t) {
        return "p" === (t + "").toLowerCase().charAt(0)
    }

    function Vt(t, e, n) {
        return t > 11 ? n ? "pm" : "PM" : n ? "am" : "AM"
    }

    function Gt(t) {
        return t ? t.toLowerCase().replace("_", "-") : t
    }

    function Kt(t) {
        for (var e, n, i, o, s = 0; s < t.length;) {
            for (o = Gt(t[s]).split("-"), e = o.length, n = Gt(t[s + 1]), n = n ? n.split("-") : null; e > 0;) {
                if (i = Qt(o.slice(0, e).join("-"))) return i;
                if (n && n.length >= e && v(o, n, !0) >= e - 1) break;
                e--
            }
            s++
        }
        return null
    }

    function Qt(t) {
        var e = null;
        if (!ko[t] && "undefined" != typeof module && module && module.exports) try {
            e = So._abbr, require("./locale/" + t), Jt(e)
        } catch (t) {
        }
        return ko[t]
    }

    function Jt(t, e) {
        var n;
        return t && (n = s(e) ? ee(t) : Zt(t, e)) && (So = n), So._abbr
    }

    function Zt(t, e) {
        if (null !== e) {
            var n = xo;
            if (e.abbr = t, null != ko[t]) O("defineLocaleOverride", "use moment.updateLocale(localeName, config) to change an existing locale. moment.defineLocale(localeName, config) should only be used for creating a new locale See http://momentjs.com/guides/#/warnings/define-locale/ for more info."), n = ko[t]._config; else if (null != e.parentLocale) {
                if (null == ko[e.parentLocale]) return Xo[e.parentLocale] || (Xo[e.parentLocale] = []), Xo[e.parentLocale].push({
                    name: t,
                    config: e
                }), null;
                n = ko[e.parentLocale]._config
            }
            return ko[t] = new w(q(n, e)), Xo[t] && Xo[t].forEach(function (t) {
                Zt(t.name, t.config)
            }), Jt(t), ko[t]
        }
        return delete ko[t], null
    }

    function te(t, e) {
        if (null != e) {
            var n, i = xo;
            null != ko[t] && (i = ko[t]._config), e = q(i, e), n = new w(e), n.parentLocale = ko[t], ko[t] = n, Jt(t)
        } else null != ko[t] && (null != ko[t].parentLocale ? ko[t] = ko[t].parentLocale : null != ko[t] && delete ko[t]);
        return ko[t]
    }

    function ee(t) {
        var e;
        if (t && t._locale && t._locale._abbr && (t = t._locale._abbr), !t) return So;
        if (!n(t)) {
            if (e = Qt(t)) return e;
            t = [t]
        }
        return Kt(t)
    }

    function ne() {
        return qi(ko)
    }

    function ie(t) {
        var e, n = t._a;
        return n && -2 === f(t).overflow && (e = n[ao] < 0 || n[ao] > 11 ? ao : n[ro] < 1 || n[ro] > ot(n[so], n[ao]) ? ro : n[co] < 0 || n[co] > 24 || 24 === n[co] && (0 !== n[lo] || 0 !== n[po] || 0 !== n[uo]) ? co : n[lo] < 0 || n[lo] > 59 ? lo : n[po] < 0 || n[po] > 59 ? po : n[uo] < 0 || n[uo] > 999 ? uo : -1, f(t)._overflowDayOfYear && (e < so || e > ro) && (e = ro), f(t)._overflowWeeks && -1 === e && (e = fo), f(t)._overflowWeekday && -1 === e && (e = ho), f(t).overflow = e), t
    }

    function oe(t) {
        var e, n, i, o, s, a, r = t._i, c = Eo.exec(r) || Bo.exec(r);
        if (c) {
            for (f(t).iso = !0, e = 0, n = Do.length; e < n; e++) if (Do[e][1].exec(c[1])) {
                o = Do[e][0], i = !1 !== Do[e][2];
                break
            }
            if (null == o) return void(t._isValid = !1);
            if (c[3]) {
                for (e = 0, n = Ro.length; e < n; e++) if (Ro[e][1].exec(c[3])) {
                    s = (c[2] || " ") + Ro[e][0];
                    break
                }
                if (null == s) return void(t._isValid = !1)
            }
            if (!i && null != s) return void(t._isValid = !1);
            if (c[4]) {
                if (!_o.exec(c[4])) return void(t._isValid = !1);
                a = "Z"
            }
            t._f = o + (s || "") + (a || ""), pe(t)
        } else t._isValid = !1
    }

    function se(t) {
        var e, n, i, o, s, a, r, c, l = {
            " GMT": " +0000",
            " EDT": " -0400",
            " EST": " -0500",
            " CDT": " -0500",
            " CST": " -0600",
            " MDT": " -0600",
            " MST": " -0700",
            " PDT": " -0700",
            " PST": " -0800"
        };
        if (e = t._i.replace(/\([^\)]*\)|[\n\t]/g, " ").replace(/(\s\s+)/g, " ").replace(/^\s|\s$/g, ""), n = Po.exec(e)) {
            if (i = n[1] ? "ddd" + (5 === n[1].length ? ", " : " ") : "", o = "D MMM " + (n[2].length > 10 ? "YYYY " : "YY "), s = "HH:mm" + (n[4] ? ":ss" : ""), n[1]) {
                var d = new Date(n[2]), p = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"][d.getDay()];
                if (n[1].substr(0, 3) !== p) return f(t).weekdayMismatch = !0, void(t._isValid = !1)
            }
            switch (n[5].length) {
                case 2:
                    0 === c ? r = " +0000" : (c = "YXWVUTSRQPONZABCDEFGHIKLM".indexOf(n[5][1].toUpperCase()) - 12, r = (c < 0 ? " -" : " +") + ("" + c).replace(/^-?/, "0").match(/..$/)[0] + "00");
                    break;
                case 4:
                    r = l[n[5]];
                    break;
                default:
                    r = l[" GMT"]
            }
            n[5] = r, t._i = n.splice(1).join(""), a = " ZZ", t._f = i + o + s + a, pe(t), f(t).rfc2822 = !0
        } else t._isValid = !1
    }

    function ae(e) {
        var n = $o.exec(e._i);
        return null !== n ? void(e._d = new Date(+n[1])) : (oe(e), void(!1 === e._isValid && (delete e._isValid, se(e), !1 === e._isValid && (delete e._isValid, t.createFromInputFallback(e)))))
    }

    function re(t, e, n) {
        return null != t ? t : null != e ? e : n
    }

    function ce(e) {
        var n = new Date(t.now());
        return e._useUTC ? [n.getUTCFullYear(), n.getUTCMonth(), n.getUTCDate()] : [n.getFullYear(), n.getMonth(), n.getDate()]
    }

    function le(t) {
        var e, n, i, o, s = [];
        if (!t._d) {
            for (i = ce(t), t._w && null == t._a[ro] && null == t._a[ao] && de(t), null != t._dayOfYear && (o = re(t._a[so], i[so]), (t._dayOfYear > Mt(o) || 0 === t._dayOfYear) && (f(t)._overflowDayOfYear = !0), n = gt(o, 0, t._dayOfYear), t._a[ao] = n.getUTCMonth(), t._a[ro] = n.getUTCDate()), e = 0; e < 3 && null == t._a[e]; ++e) t._a[e] = s[e] = i[e];
            for (; e < 7; e++) t._a[e] = s[e] = null == t._a[e] ? 2 === e ? 1 : 0 : t._a[e];
            24 === t._a[co] && 0 === t._a[lo] && 0 === t._a[po] && 0 === t._a[uo] && (t._nextDay = !0, t._a[co] = 0), t._d = (t._useUTC ? gt : At).apply(null, s), null != t._tzm && t._d.setUTCMinutes(t._d.getUTCMinutes() - t._tzm), t._nextDay && (t._a[co] = 24)
        }
    }

    function de(t) {
        var e, n, i, o, s, a, r, c;
        if (e = t._w, null != e.GG || null != e.W || null != e.E) s = 1, a = 4, n = re(e.GG, t._a[so], yt(ge(), 1, 4).year), i = re(e.W, 1), ((o = re(e.E, 1)) < 1 || o > 7) && (c = !0); else {
            s = t._locale._week.dow, a = t._locale._week.doy;
            var l = yt(ge(), s, a);
            n = re(e.gg, t._a[so], l.year), i = re(e.w, l.week), null != e.d ? ((o = e.d) < 0 || o > 6) && (c = !0) : null != e.e ? (o = e.e + s, (e.e < 0 || e.e > 6) && (c = !0)) : o = s
        }
        i < 1 || i > Lt(n, s, a) ? f(t)._overflowWeeks = !0 : null != c ? f(t)._overflowWeekday = !0 : (r = vt(n, i, o, s, a), t._a[so] = r.year, t._dayOfYear = r.dayOfYear)
    }

    function pe(e) {
        if (e._f === t.ISO_8601) return void oe(e);
        if (e._f === t.RFC_2822) return void se(e);
        e._a = [], f(e).empty = !0;
        var n, i, o, s, a, r = "" + e._i, c = r.length, l = 0;
        for (o = K(e._f, e._locale).match(Bi) || [], n = 0; n < o.length; n++) s = o[n], i = (r.match(J(s, e)) || [])[0], i && (a = r.substr(0, r.indexOf(i)), a.length > 0 && f(e).unusedInput.push(a), r = r.slice(r.indexOf(i) + i.length), l += i.length), Ri[s] ? (i ? f(e).empty = !1 : f(e).unusedTokens.push(s), it(s, i, e)) : e._strict && !i && f(e).unusedTokens.push(s);
        f(e).charsLeftOver = c - l, r.length > 0 && f(e).unusedInput.push(r), e._a[co] <= 12 && !0 === f(e).bigHour && e._a[co] > 0 && (f(e).bigHour = void 0), f(e).parsedDateParts = e._a.slice(0), f(e).meridiem = e._meridiem, e._a[co] = ue(e._locale, e._a[co], e._meridiem), le(e), ie(e)
    }

    function ue(t, e, n) {
        var i;
        return null == n ? e : null != t.meridiemHour ? t.meridiemHour(e, n) : null != t.isPM ? (i = t.isPM(n), i && e < 12 && (e += 12), i || 12 !== e || (e = 0), e) : e
    }

    function fe(t) {
        var e, n, i, o, s;
        if (0 === t._f.length) return f(t).invalidFormat = !0, void(t._d = new Date(NaN));
        for (o = 0; o < t._f.length; o++) s = 0, e = b({}, t), null != t._useUTC && (e._useUTC = t._useUTC), e._f = t._f[o], pe(e), h(e) && (s += f(e).charsLeftOver, s += 10 * f(e).unusedTokens.length, f(e).score = s, (null == i || s < i) && (i = s, n = e));
        d(t, n || e)
    }

    function he(t) {
        if (!t._d) {
            var e = _(t._i);
            t._a = c([e.year, e.month, e.day || e.date, e.hour, e.minute, e.second, e.millisecond], function (t) {
                return t && parseInt(t, 10)
            }), le(t)
        }
    }

    function Me(t) {
        var e = new m(ie(be(t)));
        return e._nextDay && (e.add(1, "d"), e._nextDay = void 0), e
    }

    function be(t) {
        var e = t._i, i = t._f;
        return t._locale = t._locale || ee(t._l), null === e || void 0 === i && "" === e ? M({nullInput: !0}) : ("string" == typeof e && (t._i = e = t._locale.preparse(e)), A(e) ? new m(ie(e)) : (r(e) ? t._d = e : n(i) ? fe(t) : i ? pe(t) : me(t), h(t) || (t._d = null), t))
    }

    function me(e) {
        var o = e._i;
        s(o) ? e._d = new Date(t.now()) : r(o) ? e._d = new Date(o.valueOf()) : "string" == typeof o ? ae(e) : n(o) ? (e._a = c(o.slice(0), function (t) {
            return parseInt(t, 10)
        }), le(e)) : i(o) ? he(e) : a(o) ? e._d = new Date(o) : t.createFromInputFallback(e)
    }

    function Ae(t, e, s, a, r) {
        var c = {};
        return !0 !== s && !1 !== s || (a = s, s = void 0), (i(t) && o(t) || n(t) && 0 === t.length) && (t = void 0), c._isAMomentObject = !0, c._useUTC = c._isUTC = r, c._l = s, c._i = t, c._f = e, c._strict = a, Me(c)
    }

    function ge(t, e, n, i) {
        return Ae(t, e, n, i, !1)
    }

    function ze(t, e) {
        var i, o;
        if (1 === e.length && n(e[0]) && (e = e[0]), !e.length) return ge();
        for (i = e[0], o = 1; o < e.length; ++o) e[o].isValid() && !e[o][t](i) || (i = e[o]);
        return i
    }

    function ve() {
        return ze("isBefore", [].slice.call(arguments, 0))
    }

    function ye() {
        return ze("isAfter", [].slice.call(arguments, 0))
    }

    function Le(t) {
        for (var e in t) if (-1 === Fo.indexOf(e) || null != t[e] && isNaN(t[e])) return !1;
        for (var n = !1, i = 0; i < Fo.length; ++i) if (t[Fo[i]]) {
            if (n) return !1;
            parseFloat(t[Fo[i]]) !== z(t[Fo[i]]) && (n = !0)
        }
        return !0
    }

    function Oe() {
        return this._isValid
    }

    function Te() {
        return He(NaN)
    }

    function Ne(t) {
        var e = _(t), n = e.year || 0, i = e.quarter || 0, o = e.month || 0, s = e.week || 0, a = e.day || 0,
            r = e.hour || 0, c = e.minute || 0, l = e.second || 0, d = e.millisecond || 0;
        this._isValid = Le(e), this._milliseconds = +d + 1e3 * l + 6e4 * c + 1e3 * r * 60 * 60, this._days = +a + 7 * s, this._months = +o + 3 * i + 12 * n, this._data = {}, this._locale = ee(), this._bubble()
    }

    function qe(t) {
        return t instanceof Ne
    }

    function we(t) {
        return t < 0 ? -1 * Math.round(-1 * t) : Math.round(t)
    }

    function Se(t, e) {
        U(t, 0, 0, function () {
            var t = this.utcOffset(), n = "+";
            return t < 0 && (t = -t, n = "-"), n + F(~~(t / 60), 2) + e + F(~~t % 60, 2)
        })
    }

    function Ce(t, e) {
        var n = (e || "").match(t);
        if (null === n) return null;
        var i = n[n.length - 1] || [], o = (i + "").match(Uo) || ["-", 0, 0], s = 60 * o[1] + z(o[2]);
        return 0 === s ? 0 : "+" === o[0] ? s : -s
    }

    function We(e, n) {
        var i, o;
        return n._isUTC ? (i = n.clone(), o = (A(e) || r(e) ? e.valueOf() : ge(e).valueOf()) - i.valueOf(), i._d.setTime(i._d.valueOf() + o), t.updateOffset(i, !1), i) : ge(e).local()
    }

    function xe(t) {
        return 15 * -Math.round(t._d.getTimezoneOffset() / 15)
    }

    function ke(e, n, i) {
        var o, s = this._offset || 0;
        if (!this.isValid()) return null != e ? this : NaN;
        if (null != e) {
            if ("string" == typeof e) {
                if (null === (e = Ce(to, e))) return this
            } else Math.abs(e) < 16 && !i && (e *= 60);
            return !this._isUTC && n && (o = xe(this)), this._offset = e, this._isUTC = !0, null != o && this.add(o, "m"), s !== e && (!n || this._changeInProgress ? Ge(this, He(e - s, "m"), 1, !1) : this._changeInProgress || (this._changeInProgress = !0, t.updateOffset(this, !0), this._changeInProgress = null)), this
        }
        return this._isUTC ? s : xe(this)
    }

    function Xe(t, e) {
        return null != t ? ("string" != typeof t && (t = -t), this.utcOffset(t, e), this) : -this.utcOffset()
    }

    function Ee(t) {
        return this.utcOffset(0, t)
    }

    function Be(t) {
        return this._isUTC && (this.utcOffset(0, t), this._isUTC = !1, t && this.subtract(xe(this), "m")), this
    }

    function _e() {
        if (null != this._tzm) this.utcOffset(this._tzm, !1, !0); else if ("string" == typeof this._i) {
            var t = Ce(Zi, this._i);
            null != t ? this.utcOffset(t) : this.utcOffset(0, !0)
        }
        return this
    }

    function De(t) {
        return !!this.isValid() && (t = t ? ge(t).utcOffset() : 0, (this.utcOffset() - t) % 60 == 0)
    }

    function Re() {
        return this.utcOffset() > this.clone().month(0).utcOffset() || this.utcOffset() > this.clone().month(5).utcOffset()
    }

    function $e() {
        if (!s(this._isDSTShifted)) return this._isDSTShifted;
        var t = {};
        if (b(t, this), t = be(t), t._a) {
            var e = t._isUTC ? p(t._a) : ge(t._a);
            this._isDSTShifted = this.isValid() && v(t._a, e.toArray()) > 0
        } else this._isDSTShifted = !1;
        return this._isDSTShifted
    }

    function Pe() {
        return !!this.isValid() && !this._isUTC
    }

    function Ie() {
        return !!this.isValid() && this._isUTC
    }

    function je() {
        return !!this.isValid() && this._isUTC && 0 === this._offset
    }

    function He(t, e) {
        var n, i, o, s = t, r = null;
        return qe(t) ? s = {
            ms: t._milliseconds,
            d: t._days,
            M: t._months
        } : a(t) ? (s = {}, e ? s[e] = t : s.milliseconds = t) : (r = Yo.exec(t)) ? (n = "-" === r[1] ? -1 : 1, s = {
            y: 0,
            d: z(r[ro]) * n,
            h: z(r[co]) * n,
            m: z(r[lo]) * n,
            s: z(r[po]) * n,
            ms: z(we(1e3 * r[uo])) * n
        }) : (r = Vo.exec(t)) ? (n = "-" === r[1] ? -1 : 1, s = {
            y: Fe(r[2], n),
            M: Fe(r[3], n),
            w: Fe(r[4], n),
            d: Fe(r[5], n),
            h: Fe(r[6], n),
            m: Fe(r[7], n),
            s: Fe(r[8], n)
        }) : null == s ? s = {} : "object" == typeof s && ("from" in s || "to" in s) && (o = Ye(ge(s.from), ge(s.to)), s = {}, s.ms = o.milliseconds, s.M = o.months), i = new Ne(s), qe(t) && l(t, "_locale") && (i._locale = t._locale), i
    }

    function Fe(t, e) {
        var n = t && parseFloat(t.replace(",", "."));
        return (isNaN(n) ? 0 : n) * e
    }

    function Ue(t, e) {
        var n = {milliseconds: 0, months: 0};
        return n.months = e.month() - t.month() + 12 * (e.year() - t.year()), t.clone().add(n.months, "M").isAfter(e) && --n.months, n.milliseconds = +e - +t.clone().add(n.months, "M"), n
    }

    function Ye(t, e) {
        var n;
        return t.isValid() && e.isValid() ? (e = We(e, t), t.isBefore(e) ? n = Ue(t, e) : (n = Ue(e, t), n.milliseconds = -n.milliseconds, n.months = -n.months), n) : {
            milliseconds: 0,
            months: 0
        }
    }

    function Ve(t, e) {
        return function (n, i) {
            var o, s;
            return null === i || isNaN(+i) || (O(e, "moment()." + e + "(period, number) is deprecated. Please use moment()." + e + "(number, period). See http://momentjs.com/guides/#/warnings/add-inverted-param/ for more info."), s = n, n = i, i = s), n = "string" == typeof n ? +n : n, o = He(n, i), Ge(this, o, t), this
        }
    }

    function Ge(e, n, i, o) {
        var s = n._milliseconds, a = we(n._days), r = we(n._months);
        e.isValid() && (o = null == o || o, s && e._d.setTime(e._d.valueOf() + s * i), a && I(e, "Date", P(e, "Date") + a * i), r && lt(e, P(e, "Month") + r * i), o && t.updateOffset(e, a || r))
    }

    function Ke(t, e) {
        var n = t.diff(e, "days", !0);
        return n < -6 ? "sameElse" : n < -1 ? "lastWeek" : n < 0 ? "lastDay" : n < 1 ? "sameDay" : n < 2 ? "nextDay" : n < 7 ? "nextWeek" : "sameElse"
    }

    function Qe(e, n) {
        var i = e || ge(), o = We(i, this).startOf("day"), s = t.calendarFormat(this, o) || "sameElse",
            a = n && (T(n[s]) ? n[s].call(this, i) : n[s]);
        return this.format(a || this.localeData().calendar(s, this, ge(i)))
    }

    function Je() {
        return new m(this)
    }

    function Ze(t, e) {
        var n = A(t) ? t : ge(t);
        return !(!this.isValid() || !n.isValid()) && (e = B(s(e) ? "millisecond" : e), "millisecond" === e ? this.valueOf() > n.valueOf() : n.valueOf() < this.clone().startOf(e).valueOf())
    }

    function tn(t, e) {
        var n = A(t) ? t : ge(t);
        return !(!this.isValid() || !n.isValid()) && (e = B(s(e) ? "millisecond" : e), "millisecond" === e ? this.valueOf() < n.valueOf() : this.clone().endOf(e).valueOf() < n.valueOf())
    }

    function en(t, e, n, i) {
        return i = i || "()", ("(" === i[0] ? this.isAfter(t, n) : !this.isBefore(t, n)) && (")" === i[1] ? this.isBefore(e, n) : !this.isAfter(e, n))
    }

    function nn(t, e) {
        var n, i = A(t) ? t : ge(t);
        return !(!this.isValid() || !i.isValid()) && (e = B(e || "millisecond"), "millisecond" === e ? this.valueOf() === i.valueOf() : (n = i.valueOf(), this.clone().startOf(e).valueOf() <= n && n <= this.clone().endOf(e).valueOf()))
    }

    function on(t, e) {
        return this.isSame(t, e) || this.isAfter(t, e)
    }

    function sn(t, e) {
        return this.isSame(t, e) || this.isBefore(t, e)
    }

    function an(t, e, n) {
        var i, o, s, a;
        return this.isValid() ? (i = We(t, this), i.isValid() ? (o = 6e4 * (i.utcOffset() - this.utcOffset()), e = B(e), "year" === e || "month" === e || "quarter" === e ? (a = rn(this, i), "quarter" === e ? a /= 3 : "year" === e && (a /= 12)) : (s = this - i, a = "second" === e ? s / 1e3 : "minute" === e ? s / 6e4 : "hour" === e ? s / 36e5 : "day" === e ? (s - o) / 864e5 : "week" === e ? (s - o) / 6048e5 : s), n ? a : g(a)) : NaN) : NaN
    }

    function rn(t, e) {
        var n, i, o = 12 * (e.year() - t.year()) + (e.month() - t.month()), s = t.clone().add(o, "months");
        return e - s < 0 ? (n = t.clone().add(o - 1, "months"), i = (e - s) / (s - n)) : (n = t.clone().add(o + 1, "months"), i = (e - s) / (n - s)), -(o + i) || 0
    }

    function cn() {
        return this.clone().locale("en").format("ddd MMM DD YYYY HH:mm:ss [GMT]ZZ")
    }

    function ln() {
        if (!this.isValid()) return null;
        var t = this.clone().utc();
        return t.year() < 0 || t.year() > 9999 ? G(t, "YYYYYY-MM-DD[T]HH:mm:ss.SSS[Z]") : T(Date.prototype.toISOString) ? this.toDate().toISOString() : G(t, "YYYY-MM-DD[T]HH:mm:ss.SSS[Z]")
    }

    function dn() {
        if (!this.isValid()) return "moment.invalid(/* " + this._i + " */)";
        var t = "moment", e = "";
        this.isLocal() || (t = 0 === this.utcOffset() ? "moment.utc" : "moment.parseZone", e = "Z");
        var n = "[" + t + '("]', i = 0 <= this.year() && this.year() <= 9999 ? "YYYY" : "YYYYYY", o = e + '[")]';
        return this.format(n + i + "-MM-DD[T]HH:mm:ss.SSS" + o)
    }

    function pn(e) {
        e || (e = this.isUtc() ? t.defaultFormatUtc : t.defaultFormat);
        var n = G(this, e);
        return this.localeData().postformat(n)
    }

    function un(t, e) {
        return this.isValid() && (A(t) && t.isValid() || ge(t).isValid()) ? He({
            to: this,
            from: t
        }).locale(this.locale()).humanize(!e) : this.localeData().invalidDate()
    }

    function fn(t) {
        return this.from(ge(), t)
    }

    function hn(t, e) {
        return this.isValid() && (A(t) && t.isValid() || ge(t).isValid()) ? He({
            from: this,
            to: t
        }).locale(this.locale()).humanize(!e) : this.localeData().invalidDate()
    }

    function Mn(t) {
        return this.to(ge(), t)
    }

    function bn(t) {
        var e;
        return void 0 === t ? this._locale._abbr : (e = ee(t), null != e && (this._locale = e), this)
    }

    function mn() {
        return this._locale
    }

    function An(t) {
        switch (t = B(t)) {
            case"year":
                this.month(0);
            case"quarter":
            case"month":
                this.date(1);
            case"week":
            case"isoWeek":
            case"day":
            case"date":
                this.hours(0);
            case"hour":
                this.minutes(0);
            case"minute":
                this.seconds(0);
            case"second":
                this.milliseconds(0)
        }
        return "week" === t && this.weekday(0), "isoWeek" === t && this.isoWeekday(1), "quarter" === t && this.month(3 * Math.floor(this.month() / 3)), this
    }

    function gn(t) {
        return t = B(t), void 0 === t || "millisecond" === t ? this : ("date" === t && (t = "day"), this.startOf(t).add(1, "isoWeek" === t ? "week" : t).subtract(1, "ms"))
    }

    function zn() {
        return this._d.valueOf() - 6e4 * (this._offset || 0)
    }

    function vn() {
        return Math.floor(this.valueOf() / 1e3)
    }

    function yn() {
        return new Date(this.valueOf())
    }

    function Ln() {
        var t = this;
        return [t.year(), t.month(), t.date(), t.hour(), t.minute(), t.second(), t.millisecond()]
    }

    function On() {
        var t = this;
        return {
            years: t.year(),
            months: t.month(),
            date: t.date(),
            hours: t.hours(),
            minutes: t.minutes(),
            seconds: t.seconds(),
            milliseconds: t.milliseconds()
        }
    }

    function Tn() {
        return this.isValid() ? this.toISOString() : null
    }

    function Nn() {
        return h(this)
    }

    function qn() {
        return d({}, f(this))
    }

    function wn() {
        return f(this).overflow
    }

    function Sn() {
        return {input: this._i, format: this._f, locale: this._locale, isUTC: this._isUTC, strict: this._strict}
    }

    function Cn(t, e) {
        U(0, [t, t.length], 0, e)
    }

    function Wn(t) {
        return En.call(this, t, this.week(), this.weekday(), this.localeData()._week.dow, this.localeData()._week.doy)
    }

    function xn(t) {
        return En.call(this, t, this.isoWeek(), this.isoWeekday(), 1, 4)
    }

    function kn() {
        return Lt(this.year(), 1, 4)
    }

    function Xn() {
        var t = this.localeData()._week;
        return Lt(this.year(), t.dow, t.doy)
    }

    function En(t, e, n, i, o) {
        var s;
        return null == t ? yt(this, i, o).year : (s = Lt(t, i, o), e > s && (e = s), Bn.call(this, t, e, n, i, o))
    }

    function Bn(t, e, n, i, o) {
        var s = vt(t, e, n, i, o), a = gt(s.year, 0, s.dayOfYear);
        return this.year(a.getUTCFullYear()), this.month(a.getUTCMonth()), this.date(a.getUTCDate()), this
    }

    function _n(t) {
        return null == t ? Math.ceil((this.month() + 1) / 3) : this.month(3 * (t - 1) + this.month() % 3)
    }

    function Dn(t) {
        var e = Math.round((this.clone().startOf("day") - this.clone().startOf("year")) / 864e5) + 1;
        return null == t ? e : this.add(t - e, "d")
    }

    function Rn(t, e) {
        e[uo] = z(1e3 * ("0." + t))
    }

    function $n() {
        return this._isUTC ? "UTC" : ""
    }

    function Pn() {
        return this._isUTC ? "Coordinated Universal Time" : ""
    }

    function In(t) {
        return ge(1e3 * t)
    }

    function jn() {
        return ge.apply(null, arguments).parseZone()
    }

    function Hn(t) {
        return t
    }

    function Fn(t, e, n, i) {
        var o = ee(), s = p().set(i, e);
        return o[n](s, t)
    }

    function Un(t, e, n) {
        if (a(t) && (e = t, t = void 0), t = t || "", null != e) return Fn(t, e, n, "month");
        var i, o = [];
        for (i = 0; i < 12; i++) o[i] = Fn(t, i, n, "month");
        return o
    }

    function Yn(t, e, n, i) {
        "boolean" == typeof t ? (a(e) && (n = e, e = void 0), e = e || "") : (e = t, n = e, t = !1, a(e) && (n = e, e = void 0), e = e || "");
        var o = ee(), s = t ? o._week.dow : 0;
        if (null != n) return Fn(e, (n + s) % 7, i, "day");
        var r, c = [];
        for (r = 0; r < 7; r++) c[r] = Fn(e, (r + s) % 7, i, "day");
        return c
    }

    function Vn(t, e) {
        return Un(t, e, "months")
    }

    function Gn(t, e) {
        return Un(t, e, "monthsShort")
    }

    function Kn(t, e, n) {
        return Yn(t, e, n, "weekdays")
    }

    function Qn(t, e, n) {
        return Yn(t, e, n, "weekdaysShort")
    }

    function Jn(t, e, n) {
        return Yn(t, e, n, "weekdaysMin")
    }

    function Zn() {
        var t = this._data;
        return this._milliseconds = ss(this._milliseconds), this._days = ss(this._days), this._months = ss(this._months), t.milliseconds = ss(t.milliseconds), t.seconds = ss(t.seconds), t.minutes = ss(t.minutes), t.hours = ss(t.hours), t.months = ss(t.months), t.years = ss(t.years), this
    }

    function ti(t, e, n, i) {
        var o = He(e, n);
        return t._milliseconds += i * o._milliseconds, t._days += i * o._days, t._months += i * o._months, t._bubble()
    }

    function ei(t, e) {
        return ti(this, t, e, 1)
    }

    function ni(t, e) {
        return ti(this, t, e, -1)
    }

    function ii(t) {
        return t < 0 ? Math.floor(t) : Math.ceil(t)
    }

    function oi() {
        var t, e, n, i, o, s = this._milliseconds, a = this._days, r = this._months, c = this._data;
        return s >= 0 && a >= 0 && r >= 0 || s <= 0 && a <= 0 && r <= 0 || (s += 864e5 * ii(ai(r) + a), a = 0, r = 0), c.milliseconds = s % 1e3, t = g(s / 1e3), c.seconds = t % 60, e = g(t / 60), c.minutes = e % 60, n = g(e / 60), c.hours = n % 24, a += g(n / 24), o = g(si(a)), r += o, a -= ii(ai(o)), i = g(r / 12), r %= 12, c.days = a, c.months = r, c.years = i, this
    }

    function si(t) {
        return 4800 * t / 146097
    }

    function ai(t) {
        return 146097 * t / 4800
    }

    function ri(t) {
        if (!this.isValid()) return NaN;
        var e, n, i = this._milliseconds;
        if ("month" === (t = B(t)) || "year" === t) return e = this._days + i / 864e5, n = this._months + si(e), "month" === t ? n : n / 12;
        switch (e = this._days + Math.round(ai(this._months)), t) {
            case"week":
                return e / 7 + i / 6048e5;
            case"day":
                return e + i / 864e5;
            case"hour":
                return 24 * e + i / 36e5;
            case"minute":
                return 1440 * e + i / 6e4;
            case"second":
                return 86400 * e + i / 1e3;
            case"millisecond":
                return Math.floor(864e5 * e) + i;
            default:
                throw new Error("Unknown unit " + t)
        }
    }

    function ci() {
        return this.isValid() ? this._milliseconds + 864e5 * this._days + this._months % 12 * 2592e6 + 31536e6 * z(this._months / 12) : NaN
    }

    function li(t) {
        return function () {
            return this.as(t)
        }
    }

    function di(t) {
        return t = B(t), this.isValid() ? this[t + "s"]() : NaN
    }

    function pi(t) {
        return function () {
            return this.isValid() ? this._data[t] : NaN
        }
    }

    function ui() {
        return g(this.days() / 7)
    }

    function fi(t, e, n, i, o) {
        return o.relativeTime(e || 1, !!n, t, i)
    }

    function hi(t, e, n) {
        var i = He(t).abs(), o = vs(i.as("s")), s = vs(i.as("m")), a = vs(i.as("h")), r = vs(i.as("d")),
            c = vs(i.as("M")), l = vs(i.as("y")),
            d = o <= ys.ss && ["s", o] || o < ys.s && ["ss", o] || s <= 1 && ["m"] || s < ys.m && ["mm", s] || a <= 1 && ["h"] || a < ys.h && ["hh", a] || r <= 1 && ["d"] || r < ys.d && ["dd", r] || c <= 1 && ["M"] || c < ys.M && ["MM", c] || l <= 1 && ["y"] || ["yy", l];
        return d[2] = e, d[3] = +t > 0, d[4] = n, fi.apply(null, d)
    }

    function Mi(t) {
        return void 0 === t ? vs : "function" == typeof t && (vs = t, !0)
    }

    function bi(t, e) {
        return void 0 !== ys[t] && (void 0 === e ? ys[t] : (ys[t] = e, "s" === t && (ys.ss = e - 1), !0))
    }

    function mi(t) {
        if (!this.isValid()) return this.localeData().invalidDate();
        var e = this.localeData(), n = hi(this, !t, e);
        return t && (n = e.pastFuture(+this, n)), e.postformat(n)
    }

    function Ai() {
        if (!this.isValid()) return this.localeData().invalidDate();
        var t, e, n, i = Ls(this._milliseconds) / 1e3, o = Ls(this._days), s = Ls(this._months);
        t = g(i / 60), e = g(t / 60), i %= 60, t %= 60, n = g(s / 12), s %= 12;
        var a = n, r = s, c = o, l = e, d = t, p = i, u = this.asSeconds();
        return u ? (u < 0 ? "-" : "") + "P" + (a ? a + "Y" : "") + (r ? r + "M" : "") + (c ? c + "D" : "") + (l || d || p ? "T" : "") + (l ? l + "H" : "") + (d ? d + "M" : "") + (p ? p + "S" : "") : "P0D"
    }

    var gi, zi;
    zi = Array.prototype.some ? Array.prototype.some : function (t) {
        for (var e = Object(this), n = e.length >>> 0, i = 0; i < n; i++) if (i in e && t.call(this, e[i], i, e)) return !0;
        return !1
    };
    var vi = zi, yi = t.momentProperties = [], Li = !1, Oi = {};
    t.suppressDeprecationWarnings = !1, t.deprecationHandler = null;
    var Ti;
    Ti = Object.keys ? Object.keys : function (t) {
        var e, n = [];
        for (e in t) l(t, e) && n.push(e);
        return n
    };
    var Ni, qi = Ti, wi = {
            sameDay: "[Today at] LT",
            nextDay: "[Tomorrow at] LT",
            nextWeek: "dddd [at] LT",
            lastDay: "[Yesterday at] LT",
            lastWeek: "[Last] dddd [at] LT",
            sameElse: "L"
        }, Si = {
            LTS: "h:mm:ss A",
            LT: "h:mm A",
            L: "MM/DD/YYYY",
            LL: "MMMM D, YYYY",
            LLL: "MMMM D, YYYY h:mm A",
            LLLL: "dddd, MMMM D, YYYY h:mm A"
        }, Ci = "Invalid date", Wi = "%d", xi = /\d{1,2}/, ki = {
            future: "in %s",
            past: "%s ago",
            s: "a few seconds",
            ss: "%d seconds",
            m: "a minute",
            mm: "%d minutes",
            h: "an hour",
            hh: "%d hours",
            d: "a day",
            dd: "%d days",
            M: "a month",
            MM: "%d months",
            y: "a year",
            yy: "%d years"
        }, Xi = {}, Ei = {},
        Bi = /(\[[^\[]*\])|(\\)?([Hh]mm(ss)?|Mo|MM?M?M?|Do|DDDo|DD?D?D?|ddd?d?|do?|w[o|w]?|W[o|W]?|Qo?|YYYYYY|YYYYY|YYYY|YY|gg(ggg?)?|GG(GGG?)?|e|E|a|A|hh?|HH?|kk?|mm?|ss?|S{1,9}|x|X|zz?|ZZ?|.)/g,
        _i = /(\[[^\[]*\])|(\\)?(LTS|LT|LL?L?L?|l{1,4})/g, Di = {}, Ri = {}, $i = /\d/, Pi = /\d\d/, Ii = /\d{3}/,
        ji = /\d{4}/, Hi = /[+-]?\d{6}/, Fi = /\d\d?/, Ui = /\d\d\d\d?/, Yi = /\d\d\d\d\d\d?/, Vi = /\d{1,3}/,
        Gi = /\d{1,4}/, Ki = /[+-]?\d{1,6}/, Qi = /\d+/, Ji = /[+-]?\d+/, Zi = /Z|[+-]\d\d:?\d\d/gi,
        to = /Z|[+-]\d\d(?::?\d\d)?/gi, eo = /[+-]?\d+(\.\d{1,3})?/,
        no = /[0-9]*['a-z\u00A0-\u05FF\u0700-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]+|[\u0600-\u06FF\/]+(\s*?[\u0600-\u06FF]+){1,2}/i,
        io = {}, oo = {}, so = 0, ao = 1, ro = 2, co = 3, lo = 4, po = 5, uo = 6, fo = 7, ho = 8;
    Ni = Array.prototype.indexOf ? Array.prototype.indexOf : function (t) {
        var e;
        for (e = 0; e < this.length; ++e) if (this[e] === t) return e;
        return -1
    };
    var Mo = Ni;
    U("M", ["MM", 2], "Mo", function () {
        return this.month() + 1
    }), U("MMM", 0, 0, function (t) {
        return this.localeData().monthsShort(this, t)
    }), U("MMMM", 0, 0, function (t) {
        return this.localeData().months(this, t)
    }), E("month", "M"), D("month", 8), Q("M", Fi), Q("MM", Fi, Pi), Q("MMM", function (t, e) {
        return e.monthsShortRegex(t)
    }), Q("MMMM", function (t, e) {
        return e.monthsRegex(t)
    }), et(["M", "MM"], function (t, e) {
        e[ao] = z(t) - 1
    }), et(["MMM", "MMMM"], function (t, e, n, i) {
        var o = n._locale.monthsParse(t, i, n._strict);
        null != o ? e[ao] = o : f(n).invalidMonth = t
    });
    var bo = /D[oD]?(\[[^\[\]]*\]|\s)+MMMM?/,
        mo = "January_February_March_April_May_June_July_August_September_October_November_December".split("_"),
        Ao = "Jan_Feb_Mar_Apr_May_Jun_Jul_Aug_Sep_Oct_Nov_Dec".split("_"), go = no, zo = no;
    U("Y", 0, 0, function () {
        var t = this.year();
        return t <= 9999 ? "" + t : "+" + t
    }), U(0, ["YY", 2], 0, function () {
        return this.year() % 100
    }), U(0, ["YYYY", 4], 0, "year"), U(0, ["YYYYY", 5], 0, "year"), U(0, ["YYYYYY", 6, !0], 0, "year"), E("year", "y"), D("year", 1), Q("Y", Ji), Q("YY", Fi, Pi), Q("YYYY", Gi, ji), Q("YYYYY", Ki, Hi), Q("YYYYYY", Ki, Hi), et(["YYYYY", "YYYYYY"], so), et("YYYY", function (e, n) {
        n[so] = 2 === e.length ? t.parseTwoDigitYear(e) : z(e)
    }), et("YY", function (e, n) {
        n[so] = t.parseTwoDigitYear(e)
    }), et("Y", function (t, e) {
        e[so] = parseInt(t, 10)
    }), t.parseTwoDigitYear = function (t) {
        return z(t) + (z(t) > 68 ? 1900 : 2e3)
    };
    var vo = $("FullYear", !0);
    U("w", ["ww", 2], "wo", "week"), U("W", ["WW", 2], "Wo", "isoWeek"), E("week", "w"), E("isoWeek", "W"), D("week", 5), D("isoWeek", 5), Q("w", Fi), Q("ww", Fi, Pi), Q("W", Fi), Q("WW", Fi, Pi), nt(["w", "ww", "W", "WW"], function (t, e, n, i) {
        e[i.substr(0, 1)] = z(t)
    });
    var yo = {dow: 0, doy: 6};
    U("d", 0, "do", "day"), U("dd", 0, 0, function (t) {
        return this.localeData().weekdaysMin(this, t)
    }), U("ddd", 0, 0, function (t) {
        return this.localeData().weekdaysShort(this, t)
    }), U("dddd", 0, 0, function (t) {
        return this.localeData().weekdays(this, t)
    }), U("e", 0, 0, "weekday"), U("E", 0, 0, "isoWeekday"), E("day", "d"), E("weekday", "e"), E("isoWeekday", "E"), D("day", 11), D("weekday", 11), D("isoWeekday", 11), Q("d", Fi), Q("e", Fi), Q("E", Fi), Q("dd", function (t, e) {
        return e.weekdaysMinRegex(t)
    }), Q("ddd", function (t, e) {
        return e.weekdaysShortRegex(t)
    }), Q("dddd", function (t, e) {
        return e.weekdaysRegex(t)
    }), nt(["dd", "ddd", "dddd"], function (t, e, n, i) {
        var o = n._locale.weekdaysParse(t, i, n._strict);
        null != o ? e.d = o : f(n).invalidWeekday = t
    }), nt(["d", "e", "E"], function (t, e, n, i) {
        e[i] = z(t)
    });
    var Lo = "Sunday_Monday_Tuesday_Wednesday_Thursday_Friday_Saturday".split("_"),
        Oo = "Sun_Mon_Tue_Wed_Thu_Fri_Sat".split("_"), To = "Su_Mo_Tu_We_Th_Fr_Sa".split("_"), No = no, qo = no,
        wo = no;
    U("H", ["HH", 2], 0, "hour"), U("h", ["hh", 2], 0, jt), U("k", ["kk", 2], 0, Ht), U("hmm", 0, 0, function () {
        return "" + jt.apply(this) + F(this.minutes(), 2)
    }), U("hmmss", 0, 0, function () {
        return "" + jt.apply(this) + F(this.minutes(), 2) + F(this.seconds(), 2)
    }), U("Hmm", 0, 0, function () {
        return "" + this.hours() + F(this.minutes(), 2)
    }), U("Hmmss", 0, 0, function () {
        return "" + this.hours() + F(this.minutes(), 2) + F(this.seconds(), 2)
    }), Ft("a", !0), Ft("A", !1), E("hour", "h"), D("hour", 13), Q("a", Ut), Q("A", Ut), Q("H", Fi), Q("h", Fi), Q("k", Fi), Q("HH", Fi, Pi), Q("hh", Fi, Pi), Q("kk", Fi, Pi), Q("hmm", Ui), Q("hmmss", Yi), Q("Hmm", Ui), Q("Hmmss", Yi), et(["H", "HH"], co), et(["k", "kk"], function (t, e) {
        var n = z(t);
        e[co] = 24 === n ? 0 : n
    }), et(["a", "A"], function (t, e, n) {
        n._isPm = n._locale.isPM(t), n._meridiem = t
    }), et(["h", "hh"], function (t, e, n) {
        e[co] = z(t), f(n).bigHour = !0
    }), et("hmm", function (t, e, n) {
        var i = t.length - 2;
        e[co] = z(t.substr(0, i)), e[lo] = z(t.substr(i)), f(n).bigHour = !0
    }), et("hmmss", function (t, e, n) {
        var i = t.length - 4, o = t.length - 2;
        e[co] = z(t.substr(0, i)), e[lo] = z(t.substr(i, 2)), e[po] = z(t.substr(o)), f(n).bigHour = !0
    }), et("Hmm", function (t, e) {
        var n = t.length - 2;
        e[co] = z(t.substr(0, n)), e[lo] = z(t.substr(n))
    }), et("Hmmss", function (t, e) {
        var n = t.length - 4, i = t.length - 2;
        e[co] = z(t.substr(0, n)), e[lo] = z(t.substr(n, 2)), e[po] = z(t.substr(i))
    });
    var So, Co = /[ap]\.?m?\.?/i, Wo = $("Hours", !0), xo = {
            calendar: wi,
            longDateFormat: Si,
            invalidDate: Ci,
            ordinal: Wi,
            dayOfMonthOrdinalParse: xi,
            relativeTime: ki,
            months: mo,
            monthsShort: Ao,
            week: yo,
            weekdays: Lo,
            weekdaysMin: To,
            weekdaysShort: Oo,
            meridiemParse: Co
        }, ko = {}, Xo = {},
        Eo = /^\s*((?:[+-]\d{6}|\d{4})-(?:\d\d-\d\d|W\d\d-\d|W\d\d|\d\d\d|\d\d))(?:(T| )(\d\d(?::\d\d(?::\d\d(?:[.,]\d+)?)?)?)([\+\-]\d\d(?::?\d\d)?|\s*Z)?)?$/,
        Bo = /^\s*((?:[+-]\d{6}|\d{4})(?:\d\d\d\d|W\d\d\d|W\d\d|\d\d\d|\d\d))(?:(T| )(\d\d(?:\d\d(?:\d\d(?:[.,]\d+)?)?)?)([\+\-]\d\d(?::?\d\d)?|\s*Z)?)?$/,
        _o = /Z|[+-]\d\d(?::?\d\d)?/,
        Do = [["YYYYYY-MM-DD", /[+-]\d{6}-\d\d-\d\d/], ["YYYY-MM-DD", /\d{4}-\d\d-\d\d/], ["GGGG-[W]WW-E", /\d{4}-W\d\d-\d/], ["GGGG-[W]WW", /\d{4}-W\d\d/, !1], ["YYYY-DDD", /\d{4}-\d{3}/], ["YYYY-MM", /\d{4}-\d\d/, !1], ["YYYYYYMMDD", /[+-]\d{10}/], ["YYYYMMDD", /\d{8}/], ["GGGG[W]WWE", /\d{4}W\d{3}/], ["GGGG[W]WW", /\d{4}W\d{2}/, !1], ["YYYYDDD", /\d{7}/]],
        Ro = [["HH:mm:ss.SSSS", /\d\d:\d\d:\d\d\.\d+/], ["HH:mm:ss,SSSS", /\d\d:\d\d:\d\d,\d+/], ["HH:mm:ss", /\d\d:\d\d:\d\d/], ["HH:mm", /\d\d:\d\d/], ["HHmmss.SSSS", /\d\d\d\d\d\d\.\d+/], ["HHmmss,SSSS", /\d\d\d\d\d\d,\d+/], ["HHmmss", /\d\d\d\d\d\d/], ["HHmm", /\d\d\d\d/], ["HH", /\d\d/]],
        $o = /^\/?Date\((\-?\d+)/i,
        Po = /^((?:Mon|Tue|Wed|Thu|Fri|Sat|Sun),?\s)?(\d?\d\s(?:Jan|Feb|Mar|Apr|May|Jun|Jul|Aug|Sep|Oct|Nov|Dec)\s(?:\d\d)?\d\d\s)(\d\d:\d\d)(\:\d\d)?(\s(?:UT|GMT|[ECMP][SD]T|[A-IK-Za-ik-z]|[+-]\d{4}))$/;
    t.createFromInputFallback = L("value provided is not in a recognized RFC2822 or ISO format. moment construction falls back to js Date(), which is not reliable across all browsers and versions. Non RFC2822/ISO date formats are discouraged and will be removed in an upcoming major release. Please refer to http://momentjs.com/guides/#/warnings/js-date/ for more info.", function (t) {
        t._d = new Date(t._i + (t._useUTC ? " UTC" : ""))
    }), t.ISO_8601 = function () {
    }, t.RFC_2822 = function () {
    };
    var Io = L("moment().min is deprecated, use moment.max instead. http://momentjs.com/guides/#/warnings/min-max/", function () {
            var t = ge.apply(null, arguments);
            return this.isValid() && t.isValid() ? t < this ? this : t : M()
        }),
        jo = L("moment().max is deprecated, use moment.min instead. http://momentjs.com/guides/#/warnings/min-max/", function () {
            var t = ge.apply(null, arguments);
            return this.isValid() && t.isValid() ? t > this ? this : t : M()
        }), Ho = function () {
            return Date.now ? Date.now() : +new Date
        }, Fo = ["year", "quarter", "month", "week", "day", "hour", "minute", "second", "millisecond"];
    Se("Z", ":"), Se("ZZ", ""), Q("Z", to), Q("ZZ", to), et(["Z", "ZZ"], function (t, e, n) {
        n._useUTC = !0, n._tzm = Ce(to, t)
    });
    var Uo = /([\+\-]|\d\d)/gi;
    t.updateOffset = function () {
    };
    var Yo = /^(\-)?(?:(\d*)[. ])?(\d+)\:(\d+)(?:\:(\d+)(\.\d*)?)?$/,
        Vo = /^(-)?P(?:(-?[0-9,.]*)Y)?(?:(-?[0-9,.]*)M)?(?:(-?[0-9,.]*)W)?(?:(-?[0-9,.]*)D)?(?:T(?:(-?[0-9,.]*)H)?(?:(-?[0-9,.]*)M)?(?:(-?[0-9,.]*)S)?)?$/;
    He.fn = Ne.prototype, He.invalid = Te;
    var Go = Ve(1, "add"), Ko = Ve(-1, "subtract");
    t.defaultFormat = "YYYY-MM-DDTHH:mm:ssZ", t.defaultFormatUtc = "YYYY-MM-DDTHH:mm:ss[Z]";
    var Qo = L("moment().lang() is deprecated. Instead, use moment().localeData() to get the language configuration. Use moment().locale() to change languages.", function (t) {
        return void 0 === t ? this.localeData() : this.locale(t)
    });
    U(0, ["gg", 2], 0, function () {
        return this.weekYear() % 100
    }), U(0, ["GG", 2], 0, function () {
        return this.isoWeekYear() % 100
    }), Cn("gggg", "weekYear"), Cn("ggggg", "weekYear"), Cn("GGGG", "isoWeekYear"), Cn("GGGGG", "isoWeekYear"), E("weekYear", "gg"), E("isoWeekYear", "GG"), D("weekYear", 1), D("isoWeekYear", 1), Q("G", Ji), Q("g", Ji), Q("GG", Fi, Pi), Q("gg", Fi, Pi), Q("GGGG", Gi, ji), Q("gggg", Gi, ji), Q("GGGGG", Ki, Hi), Q("ggggg", Ki, Hi), nt(["gggg", "ggggg", "GGGG", "GGGGG"], function (t, e, n, i) {
        e[i.substr(0, 2)] = z(t)
    }), nt(["gg", "GG"], function (e, n, i, o) {
        n[o] = t.parseTwoDigitYear(e)
    }), U("Q", 0, "Qo", "quarter"), E("quarter", "Q"), D("quarter", 7), Q("Q", $i), et("Q", function (t, e) {
        e[ao] = 3 * (z(t) - 1)
    }), U("D", ["DD", 2], "Do", "date"), E("date", "D"), D("date", 9), Q("D", Fi), Q("DD", Fi, Pi), Q("Do", function (t, e) {
        return t ? e._dayOfMonthOrdinalParse || e._ordinalParse : e._dayOfMonthOrdinalParseLenient
    }), et(["D", "DD"], ro), et("Do", function (t, e) {
        e[ro] = z(t.match(Fi)[0], 10)
    });
    var Jo = $("Date", !0);
    U("DDD", ["DDDD", 3], "DDDo", "dayOfYear"), E("dayOfYear", "DDD"), D("dayOfYear", 4), Q("DDD", Vi), Q("DDDD", Ii), et(["DDD", "DDDD"], function (t, e, n) {
        n._dayOfYear = z(t)
    }), U("m", ["mm", 2], 0, "minute"), E("minute", "m"), D("minute", 14), Q("m", Fi), Q("mm", Fi, Pi), et(["m", "mm"], lo);
    var Zo = $("Minutes", !1);
    U("s", ["ss", 2], 0, "second"), E("second", "s"), D("second", 15), Q("s", Fi), Q("ss", Fi, Pi), et(["s", "ss"], po);
    var ts = $("Seconds", !1);
    U("S", 0, 0, function () {
        return ~~(this.millisecond() / 100)
    }), U(0, ["SS", 2], 0, function () {
        return ~~(this.millisecond() / 10)
    }), U(0, ["SSS", 3], 0, "millisecond"), U(0, ["SSSS", 4], 0, function () {
        return 10 * this.millisecond()
    }), U(0, ["SSSSS", 5], 0, function () {
        return 100 * this.millisecond()
    }), U(0, ["SSSSSS", 6], 0, function () {
        return 1e3 * this.millisecond()
    }), U(0, ["SSSSSSS", 7], 0, function () {
        return 1e4 * this.millisecond()
    }), U(0, ["SSSSSSSS", 8], 0, function () {
        return 1e5 * this.millisecond()
    }), U(0, ["SSSSSSSSS", 9], 0, function () {
        return 1e6 * this.millisecond()
    }), E("millisecond", "ms"), D("millisecond", 16), Q("S", Vi, $i), Q("SS", Vi, Pi), Q("SSS", Vi, Ii);
    var es;
    for (es = "SSSS"; es.length <= 9; es += "S") Q(es, Qi);
    for (es = "S"; es.length <= 9; es += "S") et(es, Rn);
    var ns = $("Milliseconds", !1);
    U("z", 0, 0, "zoneAbbr"), U("zz", 0, 0, "zoneName");
    var is = m.prototype;
    is.add = Go, is.calendar = Qe, is.clone = Je, is.diff = an, is.endOf = gn, is.format = pn, is.from = un, is.fromNow = fn, is.to = hn, is.toNow = Mn, is.get = j, is.invalidAt = wn, is.isAfter = Ze, is.isBefore = tn, is.isBetween = en, is.isSame = nn, is.isSameOrAfter = on, is.isSameOrBefore = sn, is.isValid = Nn, is.lang = Qo, is.locale = bn, is.localeData = mn, is.max = jo, is.min = Io, is.parsingFlags = qn, is.set = H, is.startOf = An, is.subtract = Ko, is.toArray = Ln, is.toObject = On, is.toDate = yn, is.toISOString = ln, is.inspect = dn, is.toJSON = Tn, is.toString = cn, is.unix = vn, is.valueOf = zn, is.creationData = Sn, is.year = vo, is.isLeapYear = mt, is.weekYear = Wn, is.isoWeekYear = xn, is.quarter = is.quarters = _n, is.month = dt, is.daysInMonth = pt, is.week = is.weeks = qt, is.isoWeek = is.isoWeeks = wt, is.weeksInYear = Xn, is.isoWeeksInYear = kn, is.date = Jo, is.day = is.days = Bt, is.weekday = _t, is.isoWeekday = Dt, is.dayOfYear = Dn, is.hour = is.hours = Wo, is.minute = is.minutes = Zo, is.second = is.seconds = ts, is.millisecond = is.milliseconds = ns, is.utcOffset = ke, is.utc = Ee, is.local = Be, is.parseZone = _e, is.hasAlignedHourOffset = De, is.isDST = Re, is.isLocal = Pe, is.isUtcOffset = Ie, is.isUtc = je, is.isUTC = je, is.zoneAbbr = $n, is.zoneName = Pn, is.dates = L("dates accessor is deprecated. Use date instead.", Jo), is.months = L("months accessor is deprecated. Use month instead", dt), is.years = L("years accessor is deprecated. Use year instead", vo), is.zone = L("moment().zone is deprecated, use moment().utcOffset instead. http://momentjs.com/guides/#/warnings/zone/", Xe), is.isDSTShifted = L("isDSTShifted is deprecated. See http://momentjs.com/guides/#/warnings/dst-shifted/ for more information", $e);
    var os = w.prototype;
    os.calendar = S, os.longDateFormat = C, os.invalidDate = W, os.ordinal = x, os.preparse = Hn, os.postformat = Hn, os.relativeTime = k, os.pastFuture = X, os.set = N, os.months = st, os.monthsShort = at, os.monthsParse = ct, os.monthsRegex = ft, os.monthsShortRegex = ut, os.week = Ot, os.firstDayOfYear = Nt, os.firstDayOfWeek = Tt, os.weekdays = Wt, os.weekdaysMin = kt, os.weekdaysShort = xt, os.weekdaysParse = Et, os.weekdaysRegex = Rt, os.weekdaysShortRegex = $t, os.weekdaysMinRegex = Pt, os.isPM = Yt, os.meridiem = Vt, Jt("en", {
        dayOfMonthOrdinalParse: /\d{1,2}(th|st|nd|rd)/,
        ordinal: function (t) {
            var e = t % 10;
            return t + (1 === z(t % 100 / 10) ? "th" : 1 === e ? "st" : 2 === e ? "nd" : 3 === e ? "rd" : "th")
        }
    }), t.lang = L("moment.lang is deprecated. Use moment.locale instead.", Jt), t.langData = L("moment.langData is deprecated. Use moment.localeData instead.", ee);
    var ss = Math.abs, as = li("ms"), rs = li("s"), cs = li("m"), ls = li("h"), ds = li("d"), ps = li("w"),
        us = li("M"), fs = li("y"), hs = pi("milliseconds"), Ms = pi("seconds"), bs = pi("minutes"), ms = pi("hours"),
        As = pi("days"), gs = pi("months"), zs = pi("years"), vs = Math.round,
        ys = {ss: 44, s: 45, m: 45, h: 22, d: 26, M: 11}, Ls = Math.abs, Os = Ne.prototype;
    return Os.isValid = Oe, Os.abs = Zn, Os.add = ei, Os.subtract = ni, Os.as = ri, Os.asMilliseconds = as, Os.asSeconds = rs, Os.asMinutes = cs, Os.asHours = ls, Os.asDays = ds, Os.asWeeks = ps, Os.asMonths = us, Os.asYears = fs, Os.valueOf = ci, Os._bubble = oi, Os.get = di, Os.milliseconds = hs, Os.seconds = Ms, Os.minutes = bs, Os.hours = ms, Os.days = As, Os.weeks = ui, Os.months = gs, Os.years = zs, Os.humanize = mi, Os.toISOString = Ai, Os.toString = Ai, Os.toJSON = Ai, Os.locale = bn, Os.localeData = mn, Os.toIsoString = L("toIsoString() is deprecated. Please use toISOString() instead (notice the capitals)", Ai), Os.lang = Qo, U("X", 0, 0, "unix"), U("x", 0, 0, "valueOf"), Q("x", Ji), Q("X", eo), et("X", function (t, e, n) {
        n._d = new Date(1e3 * parseFloat(t, 10))
    }), et("x", function (t, e, n) {
        n._d = new Date(z(t))
    }), t.version = "2.18.1", e(ge), t.fn = is, t.min = ve, t.max = ye, t.now = Ho, t.utc = p, t.unix = In, t.months = Vn, t.isDate = r, t.locale = Jt, t.invalid = M, t.duration = He, t.isMoment = A, t.weekdays = Kn, t.parseZone = jn, t.localeData = ee, t.isDuration = qe, t.monthsShort = Gn, t.weekdaysMin = Jn, t.defineLocale = Zt, t.updateLocale = te, t.locales = ne, t.weekdaysShort = Qn, t.normalizeUnits = B, t.relativeTimeRounding = Mi, t.relativeTimeThreshold = bi, t.calendarFormat = Ke, t.prototype = is, t
}), function (t, e) {
    "use strict";
    "function" == typeof define && define.amd ? define(["moment"], e) : "object" == typeof module && module.exports ? module.exports = e(require("moment")) : e(t.moment)
}(this, function (t) {
    "use strict";

    function e(t) {
        return t > 96 ? t - 87 : t > 64 ? t - 29 : t - 48
    }

    function n(t) {
        var n, i = 0, o = t.split("."), s = o[0], a = o[1] || "", r = 1, c = 0, l = 1;
        for (45 === t.charCodeAt(0) && (i = 1, l = -1), i; i < s.length; i++) n = e(s.charCodeAt(i)), c = 60 * c + n;
        for (i = 0; i < a.length; i++) r /= 60, n = e(a.charCodeAt(i)), c += n * r;
        return c * l
    }

    function i(t) {
        for (var e = 0; e < t.length; e++) t[e] = n(t[e])
    }

    function o(t, e) {
        for (var n = 0; n < e; n++) t[n] = Math.round((t[n - 1] || 0) + 6e4 * t[n]);
        t[e - 1] = 1 / 0
    }

    function s(t, e) {
        var n, i = [];
        for (n = 0; n < e.length; n++) i[n] = t[e[n]];
        return i
    }

    function a(t) {
        var e = t.split("|"), n = e[2].split(" "), a = e[3].split(""), r = e[4].split(" ");
        return i(n), i(a), i(r), o(r, a.length), {
            name: e[0],
            abbrs: s(e[1].split(" "), a),
            offsets: s(n, a),
            untils: r,
            population: 0 | e[5]
        }
    }

    function r(t) {
        t && this._set(a(t))
    }

    function c(t) {
        var e = t.toTimeString(), n = e.match(/\([a-z ]+\)/i);
        n && n[0] ? (n = n[0].match(/[A-Z]/g), n = n ? n.join("") : void 0) : (n = e.match(/[A-Z]{3,5}/g), n = n ? n[0] : void 0), "GMT" === n && (n = void 0), this.at = +t, this.abbr = n, this.offset = t.getTimezoneOffset()
    }

    function l(t) {
        this.zone = t, this.offsetScore = 0, this.abbrScore = 0
    }

    function d(t, e) {
        for (var n, i; i = 6e4 * ((e.at - t.at) / 12e4 | 0);) n = new c(new Date(t.at + i)), n.offset === t.offset ? t = n : e = n;
        return t
    }

    function p() {
        var t, e, n, i = (new Date).getFullYear() - 2, o = new c(new Date(i, 0, 1)), s = [o];
        for (n = 1; n < 48; n++) e = new c(new Date(i, n, 1)), e.offset !== o.offset && (t = d(o, e), s.push(t), s.push(new c(new Date(t.at + 6e4)))), o = e;
        for (n = 0; n < 4; n++) s.push(new c(new Date(i + n, 0, 1))), s.push(new c(new Date(i + n, 6, 1)));
        return s
    }

    function u(t, e) {
        return t.offsetScore !== e.offsetScore ? t.offsetScore - e.offsetScore : t.abbrScore !== e.abbrScore ? t.abbrScore - e.abbrScore : e.zone.population - t.zone.population
    }

    function f(t, e) {
        var n, o;
        for (i(e), n = 0; n < e.length; n++) o = e[n], k[o] = k[o] || {}, k[o][t] = !0
    }

    function h(t) {
        var e, n, i, o = t.length, s = {}, a = [];
        for (e = 0; e < o; e++) {
            i = k[t[e].offset] || {};
            for (n in i) i.hasOwnProperty(n) && (s[n] = !0)
        }
        for (e in s) s.hasOwnProperty(e) && a.push(x[e]);
        return a
    }

    function M() {
        try {
            var t = Intl.DateTimeFormat().resolvedOptions().timeZone;
            if (t) {
                var e = x[m(t)];
                if (e) return e;
                T("Moment Timezone found " + t + " from the Intl api, but did not have that data loaded.")
            }
        } catch (t) {
        }
        var n, i, o, s = p(), a = s.length, r = h(s), c = [];
        for (i = 0; i < r.length; i++) {
            for (n = new l(g(r[i]), a), o = 0; o < a; o++) n.scoreOffsetAt(s[o]);
            c.push(n)
        }
        return c.sort(u), c.length > 0 ? c[0].zone.name : void 0
    }

    function b(t) {
        return S && !t || (S = M()), S
    }

    function m(t) {
        return (t || "").toLowerCase().replace(/\//g, "_")
    }

    function A(t) {
        var e, n, i, o;
        for ("string" == typeof t && (t = [t]), e = 0; e < t.length; e++) i = t[e].split("|"), n = i[0], o = m(n), C[o] = t[e], x[o] = n, i[5] && f(o, i[2].split(" "))
    }

    function g(t, e) {
        t = m(t);
        var n, i = C[t];
        return i instanceof r ? i : "string" == typeof i ? (i = new r(i), C[t] = i, i) : W[t] && e !== g && (n = g(W[t], g)) ? (i = C[t] = new r, i._set(n), i.name = x[t], i) : null
    }

    function z() {
        var t, e = [];
        for (t in x) x.hasOwnProperty(t) && (C[t] || C[W[t]]) && x[t] && e.push(x[t]);
        return e.sort()
    }

    function v(t) {
        var e, n, i, o;
        for ("string" == typeof t && (t = [t]), e = 0; e < t.length; e++) n = t[e].split("|"), i = m(n[0]), o = m(n[1]), W[i] = o, x[i] = n[0], W[o] = i, x[o] = n[1]
    }

    function y(t) {
        A(t.zones), v(t.links), N.dataVersion = t.version
    }

    function L(t) {
        return L.didShowError || (L.didShowError = !0, T("moment.tz.zoneExists('" + t + "') has been deprecated in favor of !moment.tz.zone('" + t + "')")), !!g(t)
    }

    function O(t) {
        return !(!t._a || void 0 !== t._tzm)
    }

    function T(t) {
        "undefined" != typeof console && "function" == typeof console.error && console.error(t)
    }

    function N(e) {
        var n = Array.prototype.slice.call(arguments, 0, -1), i = arguments[arguments.length - 1], o = g(i),
            s = t.utc.apply(null, n);
        return o && !t.isMoment(e) && O(s) && s.add(o.parse(s), "minutes"), s.tz(i), s
    }

    function q(t) {
        return function () {
            return this._z ? this._z.abbr(this) : t.call(this)
        }
    }

    function w(t) {
        return function () {
            return this._z = null, t.apply(this, arguments)
        }
    }

    var S, C = {}, W = {}, x = {}, k = {}, X = t.version.split("."), E = +X[0], B = +X[1];
    (E < 2 || 2 === E && B < 6) && T("Moment Timezone requires Moment.js >= 2.6.0. You are using Moment.js " + t.version + ". See momentjs.com"), r.prototype = {
        _set: function (t) {
            this.name = t.name, this.abbrs = t.abbrs, this.untils = t.untils, this.offsets = t.offsets, this.population = t.population
        }, _index: function (t) {
            var e, n = +t, i = this.untils;
            for (e = 0; e < i.length; e++) if (n < i[e]) return e
        }, parse: function (t) {
            var e, n, i, o, s = +t, a = this.offsets, r = this.untils, c = r.length - 1;
            for (o = 0; o < c; o++) if (e = a[o], n = a[o + 1], i = a[o ? o - 1 : o], e < n && N.moveAmbiguousForward ? e = n : e > i && N.moveInvalidForward && (e = i), s < r[o] - 6e4 * e) return a[o];
            return a[c]
        }, abbr: function (t) {
            return this.abbrs[this._index(t)]
        }, offset: function (t) {
            return this.offsets[this._index(t)]
        }
    }, l.prototype.scoreOffsetAt = function (t) {
        this.offsetScore += Math.abs(this.zone.offset(t.at) - t.offset), this.zone.abbr(t.at).replace(/[^A-Z]/g, "") !== t.abbr && this.abbrScore++
    }, N.version = "0.5.13", N.dataVersion = "", N._zones = C, N._links = W, N._names = x, N.add = A, N.link = v, N.load = y, N.zone = g, N.zoneExists = L, N.guess = b, N.names = z, N.Zone = r, N.unpack = a, N.unpackBase60 = n, N.needsOffset = O, N.moveInvalidForward = !0, N.moveAmbiguousForward = !1;
    var _ = t.fn;
    t.tz = N, t.defaultZone = null, t.updateOffset = function (e, n) {
        var i, o = t.defaultZone;
        void 0 === e._z && (o && O(e) && !e._isUTC && (e._d = t.utc(e._a)._d, e.utc().add(o.parse(e), "minutes")), e._z = o), e._z && (i = e._z.offset(e), Math.abs(i) < 16 && (i /= 60), void 0 !== e.utcOffset ? e.utcOffset(-i, n) : e.zone(i, n))
    }, _.tz = function (e) {
        return e ? (this._z = g(e), this._z ? t.updateOffset(this) : T("Moment Timezone has no data for " + e + ". See http://momentjs.com/timezone/docs/#/data-loading/."), this) : this._z ? this._z.name : void 0
    }, _.zoneName = q(_.zoneName), _.zoneAbbr = q(_.zoneAbbr), _.utc = w(_.utc), t.tz.setDefault = function (e) {
        return (E < 2 || 2 === E && B < 9) && T("Moment Timezone setDefault() requires Moment.js >= 2.9.0. You are using Moment.js " + t.version + "."), t.defaultZone = e ? g(e) : null, t
    };
    var D = t.momentProperties;
    return "[object Array]" === Object.prototype.toString.call(D) ? (D.push("_z"), D.push("_a")) : D && (D._z = null), t
}), function (t, e) {
    "use strict";
    "function" == typeof define && define.amd ? define(["moment"], e) : "object" == typeof module && module.exports ? module.exports = e(require("moment")) : e(t.moment)
}(this, function (t) {
    "use strict";

    function e(t) {
        return t > 96 ? t - 87 : t > 64 ? t - 29 : t - 48
    }

    function n(t) {
        var n, i = 0, o = t.split("."), s = o[0], a = o[1] || "", r = 1, c = 0, l = 1;
        for (45 === t.charCodeAt(0) && (i = 1, l = -1), i; i < s.length; i++) n = e(s.charCodeAt(i)), c = 60 * c + n;
        for (i = 0; i < a.length; i++) r /= 60, n = e(a.charCodeAt(i)), c += n * r;
        return c * l
    }

    function i(t) {
        for (var e = 0; e < t.length; e++) t[e] = n(t[e])
    }

    function o(t, e) {
        for (var n = 0; n < e; n++) t[n] = Math.round((t[n - 1] || 0) + 6e4 * t[n]);
        t[e - 1] = Infinity
    }

    function s(t, e) {
        var n, i = [];
        for (n = 0; n < e.length; n++) i[n] = t[e[n]];
        return i
    }

    function a(t) {
        var e = t.split("|"), n = e[2].split(" "), a = e[3].split(""), r = e[4].split(" ");
        return i(n), i(a), i(r), o(r, a.length), {
            name: e[0],
            abbrs: s(e[1].split(" "), a),
            offsets: s(n, a),
            untils: r,
            population: 0 | e[5]
        }
    }

    function r(t) {
        t && this._set(a(t))
    }

    function c(t) {
        var e = t.toTimeString(), n = e.match(/\([a-z ]+\)/i);
        n && n[0] ? (n = n[0].match(/[A-Z]/g), n = n ? n.join("") : undefined) : (n = e.match(/[A-Z]{3,5}/g), n = n ? n[0] : undefined), "GMT" === n && (n = undefined), this.at = +t, this.abbr = n, this.offset = t.getTimezoneOffset()
    }

    function l(t) {
        this.zone = t, this.offsetScore = 0, this.abbrScore = 0
    }

    function d(t, e) {
        for (var n, i; i = 6e4 * ((e.at - t.at) / 12e4 | 0);) n = new c(new Date(t.at + i)), n.offset === t.offset ? t = n : e = n;
        return t
    }

    function p() {
        var t, e, n, i = (new Date).getFullYear() - 2, o = new c(new Date(i, 0, 1)), s = [o];
        for (n = 1; n < 48; n++) e = new c(new Date(i, n, 1)), e.offset !== o.offset && (t = d(o, e), s.push(t), s.push(new c(new Date(t.at + 6e4)))), o = e;
        for (n = 0; n < 4; n++) s.push(new c(new Date(i + n, 0, 1))), s.push(new c(new Date(i + n, 6, 1)));
        return s
    }

    function u(t, e) {
        return t.offsetScore !== e.offsetScore ? t.offsetScore - e.offsetScore : t.abbrScore !== e.abbrScore ? t.abbrScore - e.abbrScore : e.zone.population - t.zone.population
    }

    function f(t, e) {
        var n, o;
        for (i(e), n = 0; n < e.length; n++) o = e[n], X[o] = X[o] || {}, X[o][t] = !0
    }

    function h(t) {
        var e, n, i, o = t.length, s = {}, a = [];
        for (e = 0; e < o; e++) {
            i = X[t[e].offset] || {};
            for (n in i) i.hasOwnProperty(n) && (s[n] = !0)
        }
        for (e in s) s.hasOwnProperty(e) && a.push(k[e]);
        return a
    }

    function M() {
        try {
            var t = Intl.DateTimeFormat().resolvedOptions().timeZone;
            if (t) {
                var e = k[m(t)];
                if (e) return e;
                T("Moment Timezone found " + t + " from the Intl api, but did not have that data loaded.")
            }
        } catch (t) {
        }
        var n, i, o, s = p(), a = s.length, r = h(s), c = [];
        for (i = 0; i < r.length; i++) {
            for (n = new l(g(r[i]), a), o = 0; o < a; o++) n.scoreOffsetAt(s[o]);
            c.push(n)
        }
        return c.sort(u), c.length > 0 ? c[0].zone.name : undefined
    }

    function b(t) {
        return S && !t || (S = M()), S
    }

    function m(t) {
        return (t || "").toLowerCase().replace(/\//g, "_")
    }

    function A(t) {
        var e, n, i, o;
        for ("string" == typeof t && (t = [t]), e = 0; e < t.length; e++) i = t[e].split("|"), n = i[0], o = m(n), W[o] = t[e], k[o] = n, i[5] && f(o, i[2].split(" "))
    }

    function g(t, e) {
        t = m(t);
        var n, i = W[t];
        return i instanceof r ? i : "string" == typeof i ? (i = new r(i), W[t] = i, i) : x[t] && e !== g && (n = g(x[t], g)) ? (i = W[t] = new r, i._set(n), i.name = k[t], i) : null
    }

    function z() {
        var t, e = [];
        for (t in k) k.hasOwnProperty(t) && (W[t] || W[x[t]]) && k[t] && e.push(k[t]);
        return e.sort()
    }

    function v(t) {
        var e, n, i, o;
        for ("string" == typeof t && (t = [t]), e = 0; e < t.length; e++) n = t[e].split("|"), i = m(n[0]), o = m(n[1]), x[i] = o, k[i] = n[0], x[o] = i, k[o] = n[1]
    }

    function y(t) {
        A(t.zones), v(t.links), N.dataVersion = t.version
    }

    function L(t) {
        return L.didShowError || (L.didShowError = !0, T("moment.tz.zoneExists('" + t + "') has been deprecated in favor of !moment.tz.zone('" + t + "')")), !!g(t)
    }

    function O(t) {
        return !(!t._a || t._tzm !== undefined)
    }

    function T(t) {
        "undefined" != typeof console && "function" == typeof console.error && console.error(t)
    }

    function N(e) {
        var n = Array.prototype.slice.call(arguments, 0, -1), i = arguments[arguments.length - 1], o = g(i),
            s = t.utc.apply(null, n);
        return o && !t.isMoment(e) && O(s) && s.add(o.parse(s), "minutes"), s.tz(i), s
    }

    function q(t) {
        return function () {
            return this._z ? this._z.abbr(this) : t.call(this)
        }
    }

    function w(t) {
        return function () {
            return this._z = null, t.apply(this, arguments)
        }
    }

    var S, C = "0.5.13", W = {}, x = {}, k = {}, X = {}, E = t.version.split("."), B = +E[0], _ = +E[1];
    (B < 2 || 2 === B && _ < 6) && T("Moment Timezone requires Moment.js >= 2.6.0. You are using Moment.js " + t.version + ". See momentjs.com"), r.prototype = {
        _set: function (t) {
            this.name = t.name, this.abbrs = t.abbrs, this.untils = t.untils, this.offsets = t.offsets, this.population = t.population
        }, _index: function (t) {
            var e, n = +t, i = this.untils;
            for (e = 0; e < i.length; e++) if (n < i[e]) return e
        }, parse: function (t) {
            var e, n, i, o, s = +t, a = this.offsets, r = this.untils, c = r.length - 1;
            for (o = 0; o < c; o++) if (e = a[o], n = a[o + 1], i = a[o ? o - 1 : o], e < n && N.moveAmbiguousForward ? e = n : e > i && N.moveInvalidForward && (e = i), s < r[o] - 6e4 * e) return a[o];
            return a[c]
        }, abbr: function (t) {
            return this.abbrs[this._index(t)]
        }, offset: function (t) {
            return this.offsets[this._index(t)]
        }
    }, l.prototype.scoreOffsetAt = function (t) {
        this.offsetScore += Math.abs(this.zone.offset(t.at) - t.offset), this.zone.abbr(t.at).replace(/[^A-Z]/g, "") !== t.abbr && this.abbrScore++
    }, N.version = C, N.dataVersion = "", N._zones = W, N._links = x, N._names = k, N.add = A, N.link = v, N.load = y, N.zone = g, N.zoneExists = L, N.guess = b, N.names = z, N.Zone = r, N.unpack = a, N.unpackBase60 = n, N.needsOffset = O, N.moveInvalidForward = !0, N.moveAmbiguousForward = !1;
    var D = t.fn;
    t.tz = N, t.defaultZone = null, t.updateOffset = function (e, n) {
        var i, o = t.defaultZone;
        e._z === undefined && (o && O(e) && !e._isUTC && (e._d = t.utc(e._a)._d, e.utc().add(o.parse(e), "minutes")), e._z = o), e._z && (i = e._z.offset(e), Math.abs(i) < 16 && (i /= 60), e.utcOffset !== undefined ? e.utcOffset(-i, n) : e.zone(i, n))
    }, D.tz = function (e) {
        return e ? (this._z = g(e), this._z ? t.updateOffset(this) : T("Moment Timezone has no data for " + e + ". See http://momentjs.com/timezone/docs/#/data-loading/."), this) : this._z ? this._z.name : void 0
    }, D.zoneName = q(D.zoneName), D.zoneAbbr = q(D.zoneAbbr), D.utc = w(D.utc), t.tz.setDefault = function (e) {
        return (B < 2 || 2 === B && _ < 9) && T("Moment Timezone setDefault() requires Moment.js >= 2.9.0. You are using Moment.js " + t.version + "."), t.defaultZone = e ? g(e) : null, t
    };
    var R = t.momentProperties;
    return "[object Array]" === Object.prototype.toString.call(R) ? (R.push("_z"), R.push("_a")) : R && (R._z = null), y({
        version: "2017b",
        zones: ["Africa/Abidjan|LMT GMT|g.8 0|01|-2ldXH.Q|48e5", "Africa/Accra|LMT GMT +0020|.Q 0 -k|012121212121212121212121212121212121212121212121|-26BbX.8 6tzX.8 MnE 1BAk MnE 1BAk MnE 1BAk MnE 1C0k MnE 1BAk MnE 1BAk MnE 1BAk MnE 1C0k MnE 1BAk MnE 1BAk MnE 1BAk MnE 1C0k MnE 1BAk MnE 1BAk MnE 1BAk MnE 1C0k MnE 1BAk MnE 1BAk MnE 1BAk MnE 1C0k MnE 1BAk MnE 1BAk MnE|41e5", "Africa/Nairobi|LMT EAT +0230 +0245|-2r.g -30 -2u -2J|01231|-1F3Cr.g 3Dzr.g okMu MFXJ|47e5", "Africa/Algiers|PMT WET WEST CET CEST|-9.l 0 -10 -10 -20|0121212121212121343431312123431213|-2nco9.l cNb9.l HA0 19A0 1iM0 11c0 1oo0 Wo0 1rc0 QM0 1EM0 UM0 DA0 Imo0 rd0 De0 9Xz0 1fb0 1ap0 16K0 2yo0 mEp0 hwL0 jxA0 11A0 dDd0 17b0 11B0 1cN0 2Dy0 1cN0 1fB0 1cL0|26e5", "Africa/Lagos|LMT WAT|-d.A -10|01|-22y0d.A|17e6", "Africa/Bissau|LMT -01 GMT|12.k 10 0|012|-2ldWV.E 2xonV.E|39e4", "Africa/Maputo|LMT CAT|-2a.k -20|01|-2GJea.k|26e5", "Africa/Cairo|EET EEST|-20 -30|0101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010|-1bIO0 vb0 1ip0 11z0 1iN0 1nz0 12p0 1pz0 10N0 1pz0 16p0 1jz0 s3d0 Vz0 1oN0 11b0 1oO0 10N0 1pz0 10N0 1pb0 10N0 1pb0 10N0 1pb0 10N0 1pz0 10N0 1pb0 10N0 1pb0 11d0 1oL0 11d0 1pb0 11d0 1oL0 11d0 1oL0 11d0 1oL0 11d0 1pb0 11d0 1oL0 11d0 1oL0 11d0 1oL0 11d0 1pb0 11d0 1oL0 11d0 1oL0 11d0 1oL0 11d0 1pb0 11d0 1oL0 11d0 1WL0 rd0 1Rz0 wp0 1pb0 11d0 1oL0 11d0 1oL0 11d0 1oL0 11d0 1pb0 11d0 1qL0 Xd0 1oL0 11d0 1oL0 11d0 1pb0 11d0 1oL0 11d0 1oL0 11d0 1ny0 11z0 1o10 11z0 1o10 11z0 1o10 11z0 1qN0 11z0 1o10 11z0 1o10 11z0 1o10 11z0 1o10 11z0 1qN0 11z0 1o10 11z0 1o10 WL0 1qN0 Rb0 1wp0 On0 1zd0 Lz0 1EN0 Fb0 c10 8n0 8Nd0 gL0 e10 mn0|15e6", "Africa/Casablanca|LMT WET WEST CET|u.k 0 -10 -10|0121212121212121213121212121212121212121212121212121212121212121212121212121212121212121212121212121|-2gMnt.E 130Lt.E rb0 Dd0 dVb0 b6p0 TX0 EoB0 LL0 gnd0 rz0 43d0 AL0 1Nd0 XX0 1Cp0 pz0 dEp0 4mn0 SyN0 AL0 1Nd0 wn0 1FB0 Db0 1zd0 Lz0 1Nf0 wM0 co0 go0 1o00 s00 dA0 vc0 11A0 A00 e00 y00 11A0 uM0 e00 Dc0 11A0 s00 e00 IM0 WM0 mo0 gM0 LA0 WM0 jA0 e00 Rc0 11A0 e00 e00 U00 11A0 8o0 e00 11A0 11A0 5A0 e00 17c0 1fA0 1a00 1a00 1fA0 17c0 1io0 14o0 1lc0 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1lc0 14o0 1fA0|32e5", "Africa/Ceuta|WET WEST CET CEST|0 -10 -10 -20|010101010101010101010232323232323232323232323232323232323232323232323232323232323232323232323232323232323232323232323232323232|-25KN0 11z0 drd0 18p0 3HX0 17d0 1fz0 1a10 1io0 1a00 1y7o0 LL0 gnd0 rz0 43d0 AL0 1Nd0 XX0 1Cp0 pz0 dEp0 4VB0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1fA0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1fA0 1o00 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00|85e3", "Africa/El_Aaiun|LMT -01 WET WEST|Q.M 10 0 -10|01232323232323232323232323232323232323232323232323232323232323232323232323232323232323232|-1rDz7.c 1GVA7.c 6L0 AL0 1Nd0 XX0 1Cp0 pz0 1cBB0 AL0 1Nd0 wn0 1FB0 Db0 1zd0 Lz0 1Nf0 wM0 co0 go0 1o00 s00 dA0 vc0 11A0 A00 e00 y00 11A0 uM0 e00 Dc0 11A0 s00 e00 IM0 WM0 mo0 gM0 LA0 WM0 jA0 e00 Rc0 11A0 e00 e00 U00 11A0 8o0 e00 11A0 11A0 5A0 e00 17c0 1fA0 1a00 1a00 1fA0 17c0 1io0 14o0 1lc0 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1lc0 14o0 1fA0|20e4", "Africa/Johannesburg|SAST SAST SAST|-1u -20 -30|012121|-2GJdu 1Ajdu 1cL0 1cN0 1cL0|84e5", "Africa/Khartoum|LMT CAT CAST EAT|-2a.8 -20 -30 -30|01212121212121212121212121212121213|-1yW2a.8 1zK0a.8 16L0 1iN0 17b0 1jd0 17b0 1ip0 17z0 1i10 17X0 1hB0 18n0 1hd0 19b0 1gp0 19z0 1iN0 17b0 1ip0 17z0 1i10 18n0 1hd0 18L0 1gN0 19b0 1gp0 19z0 1iN0 17z0 1i10 17X0 yGd0|51e5", "Africa/Monrovia|MMT MMT GMT|H.8 I.u 0|012|-23Lzg.Q 28G01.m|11e5", "Africa/Ndjamena|LMT WAT WAST|-10.c -10 -20|0121|-2le10.c 2J3c0.c Wn0|13e5", "Africa/Tripoli|LMT CET CEST EET|-Q.I -10 -20 -20|012121213121212121212121213123123|-21JcQ.I 1hnBQ.I vx0 4iP0 xx0 4eN0 Bb0 7ip0 U0n0 A10 1db0 1cN0 1db0 1dd0 1db0 1eN0 1bb0 1e10 1cL0 1c10 1db0 1dd0 1db0 1cN0 1db0 1q10 fAn0 1ep0 1db0 AKq0 TA0 1o00|11e5", "Africa/Tunis|PMT CET CEST|-9.l -10 -20|0121212121212121212121212121212121|-2nco9.l 18pa9.l 1qM0 DA0 3Tc0 11B0 1ze0 WM0 7z0 3d0 14L0 1cN0 1f90 1ar0 16J0 1gXB0 WM0 1rA0 11c0 nwo0 Ko0 1cM0 1cM0 1rA0 10M0 zuM0 10N0 1aN0 1qM0 WM0 1qM0 11A0 1o00|20e5", "Africa/Windhoek|+0130 SAST SAST CAT WAT WAST|-1u -20 -30 -20 -10 -20|012134545454545454545454545454545454545454545454545454545454545454545454545454545454545454545|-2GJdu 1Ajdu 1cL0 1SqL0 9NA0 11D0 1nX0 11B0 1qL0 WN0 1qL0 11B0 1nX0 11B0 1nX0 11B0 1nX0 11B0 1nX0 11B0 1qL0 WN0 1qL0 11B0 1nX0 11B0 1nX0 11B0 1nX0 11B0 1nX0 11B0 1qL0 11B0 1nX0 11B0 1nX0 11B0 1nX0 11B0 1nX0 11B0 1qL0 WN0 1qL0 11B0 1nX0 11B0 1nX0 11B0 1nX0 11B0 1nX0 11B0 1qL0 WN0 1qL0 11B0 1nX0 11B0 1nX0 11B0 1nX0 11B0 1qL0 WN0 1qL0 11B0 1nX0 11B0 1nX0 11B0 1nX0 11B0 1nX0 11B0 1qL0 WN0 1qL0 11B0 1nX0 11B0 1nX0 11B0 1nX0 11B0 1nX0 11B0 1qL0 11B0 1nX0 11B0|32e4", "America/Adak|NST NWT NPT BST BDT AHST HST HDT|b0 a0 a0 b0 a0 a0 a0 90|012034343434343434343434343434343456767676767676767676767676767676767676767676767676767676767676767676767676767676767676767676767676767676767676|-17SX0 8wW0 iB0 Qlb0 52O0 1cL0 1cN0 1cL0 1cN0 1fz0 1cN0 1cL0 1cN0 1cL0 s10 1Vz0 LB0 1BX0 1cN0 1fz0 1a10 1fz0 1cN0 1cL0 1cN0 1cL0 1cN0 1cL0 1cN0 1cL0 1cN0 1fz0 1a10 1fz0 cm0 10q0 1cL0 1cN0 1cL0 1cN0 1cL0 14p0 1lb0 14p0 1nX0 11B0 1nX0 11B0 1nX0 14p0 1lb0 14p0 1lb0 14p0 1nX0 11B0 1nX0 11B0 1nX0 14p0 1lb0 14p0 1lb0 14p0 1lb0 14p0 1nX0 11B0 1nX0 11B0 1nX0 14p0 1lb0 14p0 1lb0 14p0 1nX0 11B0 1nX0 11B0 1nX0 Rd0 1zb0 Op0 1zb0 Op0 1zb0 Rd0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Rd0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Rd0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Rd0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Rd0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0|326", "America/Anchorage|AST AWT APT AHST AHDT YST AKST AKDT|a0 90 90 a0 90 90 90 80|012034343434343434343434343434343456767676767676767676767676767676767676767676767676767676767676767676767676767676767676767676767676767676767676|-17T00 8wX0 iA0 Qlb0 52O0 1cL0 1cN0 1cL0 1cN0 1fz0 1cN0 1cL0 1cN0 1cL0 s10 1Vz0 LB0 1BX0 1cN0 1fz0 1a10 1fz0 1cN0 1cL0 1cN0 1cL0 1cN0 1cL0 1cN0 1cL0 1cN0 1fz0 1a10 1fz0 cm0 10q0 1cL0 1cN0 1cL0 1cN0 1cL0 14p0 1lb0 14p0 1nX0 11B0 1nX0 11B0 1nX0 14p0 1lb0 14p0 1lb0 14p0 1nX0 11B0 1nX0 11B0 1nX0 14p0 1lb0 14p0 1lb0 14p0 1lb0 14p0 1nX0 11B0 1nX0 11B0 1nX0 14p0 1lb0 14p0 1lb0 14p0 1nX0 11B0 1nX0 11B0 1nX0 Rd0 1zb0 Op0 1zb0 Op0 1zb0 Rd0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Rd0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Rd0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Rd0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Rd0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0|30e4", "America/Port_of_Spain|LMT AST|46.4 40|01|-2kNvR.U|43e3", "America/Araguaina|LMT -03 -02|3c.M 30 20|0121212121212121212121212121212121212121212121212121|-2glwL.c HdKL.c 1cc0 1e10 1bX0 Ezd0 So0 1vA0 Mn0 1BB0 ML0 1BB0 zX0 qe10 xb0 2ep0 nz0 1C10 zX0 1C10 LX0 1C10 Mn0 H210 Rb0 1tB0 IL0 1Fd0 FX0 1EN0 FX0 1HB0 Lz0 dMN0 Lz0 1zd0 Rb0 1wN0 Wn0 1tB0 Rb0 1tB0 WL0 1tB0 Rb0 1zd0 On0 1HB0 FX0 ny10 Lz0|14e4", "America/Argentina/Buenos_Aires|CMT -04 -03 -02|4g.M 40 30 20|01212121212121212121212121212121212121212123232323232323232|-20UHH.c pKnH.c Mn0 1iN0 Tb0 1C10 LX0 1C10 LX0 1C10 LX0 1C10 Mn0 1C10 LX0 1C10 LX0 1C10 LX0 1C10 Mn0 MN0 2jz0 MN0 4lX0 u10 5Lb0 1pB0 Fnz0 u10 uL0 1vd0 SL0 1vd0 SL0 1vd0 17z0 1cN0 1fz0 1cN0 1cL0 1cN0 asn0 Db0 zvd0 Bz0 1tB0 TX0 1wp0 Rb0 1wp0 Rb0 1wp0 TX0 A4p0 uL0 1qN0 WL0", "America/Argentina/Catamarca|CMT -04 -03 -02|4g.M 40 30 20|01212121212121212121212121212121212121212123232323132321232|-20UHH.c pKnH.c Mn0 1iN0 Tb0 1C10 LX0 1C10 LX0 1C10 LX0 1C10 Mn0 1C10 LX0 1C10 LX0 1C10 LX0 1C10 Mn0 MN0 2jz0 MN0 4lX0 u10 5Lb0 1pB0 Fnz0 u10 uL0 1vd0 SL0 1vd0 SL0 1vd0 17z0 1cN0 1fz0 1cN0 1cL0 1cN0 asn0 Db0 zvd0 Bz0 1tB0 TX0 1wp0 Rb0 1wq0 Ra0 1wp0 TX0 rlB0 7B0 8zb0 uL0", "America/Argentina/Cordoba|CMT -04 -03 -02|4g.M 40 30 20|01212121212121212121212121212121212121212123232323132323232|-20UHH.c pKnH.c Mn0 1iN0 Tb0 1C10 LX0 1C10 LX0 1C10 LX0 1C10 Mn0 1C10 LX0 1C10 LX0 1C10 LX0 1C10 Mn0 MN0 2jz0 MN0 4lX0 u10 5Lb0 1pB0 Fnz0 u10 uL0 1vd0 SL0 1vd0 SL0 1vd0 17z0 1cN0 1fz0 1cN0 1cL0 1cN0 asn0 Db0 zvd0 Bz0 1tB0 TX0 1wp0 Rb0 1wq0 Ra0 1wp0 TX0 A4p0 uL0 1qN0 WL0", "America/Argentina/Jujuy|CMT -04 -03 -02|4g.M 40 30 20|012121212121212121212121212121212121212121232323121323232|-20UHH.c pKnH.c Mn0 1iN0 Tb0 1C10 LX0 1C10 LX0 1C10 LX0 1C10 Mn0 1C10 LX0 1C10 LX0 1C10 LX0 1C10 Mn0 MN0 2jz0 MN0 4lX0 u10 5Lb0 1pB0 Fnz0 u10 uL0 1vd0 SL0 1vd0 SL0 1vd0 17z0 1cN0 1fz0 1cN0 1cL0 1cN0 asn0 Db0 zvd0 Bz0 1tB0 TX0 1ze0 TX0 1ld0 WK0 1wp0 TX0 A4p0 uL0", "America/Argentina/La_Rioja|CMT -04 -03 -02|4g.M 40 30 20|012121212121212121212121212121212121212121232323231232321232|-20UHH.c pKnH.c Mn0 1iN0 Tb0 1C10 LX0 1C10 LX0 1C10 LX0 1C10 Mn0 1C10 LX0 1C10 LX0 1C10 LX0 1C10 Mn0 MN0 2jz0 MN0 4lX0 u10 5Lb0 1pB0 Fnz0 u10 uL0 1vd0 SL0 1vd0 SL0 1vd0 17z0 1cN0 1fz0 1cN0 1cL0 1cN0 asn0 Db0 zvd0 Bz0 1tB0 TX0 1wp0 Qn0 qO0 16n0 Rb0 1wp0 TX0 rlB0 7B0 8zb0 uL0", "America/Argentina/Mendoza|CMT -04 -03 -02|4g.M 40 30 20|01212121212121212121212121212121212121212123232312121321232|-20UHH.c pKnH.c Mn0 1iN0 Tb0 1C10 LX0 1C10 LX0 1C10 LX0 1C10 Mn0 1C10 LX0 1C10 LX0 1C10 LX0 1C10 Mn0 MN0 2jz0 MN0 4lX0 u10 5Lb0 1pB0 Fnz0 u10 uL0 1vd0 SL0 1vd0 SL0 1vd0 17z0 1cN0 1fz0 1cN0 1cL0 1cN0 asn0 Db0 zvd0 Bz0 1tB0 TX0 1u20 SL0 1vd0 Tb0 1wp0 TW0 ri10 Op0 7TX0 uL0", "America/Argentina/Rio_Gallegos|CMT -04 -03 -02|4g.M 40 30 20|01212121212121212121212121212121212121212123232323232321232|-20UHH.c pKnH.c Mn0 1iN0 Tb0 1C10 LX0 1C10 LX0 1C10 LX0 1C10 Mn0 1C10 LX0 1C10 LX0 1C10 LX0 1C10 Mn0 MN0 2jz0 MN0 4lX0 u10 5Lb0 1pB0 Fnz0 u10 uL0 1vd0 SL0 1vd0 SL0 1vd0 17z0 1cN0 1fz0 1cN0 1cL0 1cN0 asn0 Db0 zvd0 Bz0 1tB0 TX0 1wp0 Rb0 1wp0 Rb0 1wp0 TX0 rlB0 7B0 8zb0 uL0", "America/Argentina/Salta|CMT -04 -03 -02|4g.M 40 30 20|012121212121212121212121212121212121212121232323231323232|-20UHH.c pKnH.c Mn0 1iN0 Tb0 1C10 LX0 1C10 LX0 1C10 LX0 1C10 Mn0 1C10 LX0 1C10 LX0 1C10 LX0 1C10 Mn0 MN0 2jz0 MN0 4lX0 u10 5Lb0 1pB0 Fnz0 u10 uL0 1vd0 SL0 1vd0 SL0 1vd0 17z0 1cN0 1fz0 1cN0 1cL0 1cN0 asn0 Db0 zvd0 Bz0 1tB0 TX0 1wp0 Rb0 1wq0 Ra0 1wp0 TX0 A4p0 uL0", "America/Argentina/San_Juan|CMT -04 -03 -02|4g.M 40 30 20|012121212121212121212121212121212121212121232323231232321232|-20UHH.c pKnH.c Mn0 1iN0 Tb0 1C10 LX0 1C10 LX0 1C10 LX0 1C10 Mn0 1C10 LX0 1C10 LX0 1C10 LX0 1C10 Mn0 MN0 2jz0 MN0 4lX0 u10 5Lb0 1pB0 Fnz0 u10 uL0 1vd0 SL0 1vd0 SL0 1vd0 17z0 1cN0 1fz0 1cN0 1cL0 1cN0 asn0 Db0 zvd0 Bz0 1tB0 TX0 1wp0 Qn0 qO0 16n0 Rb0 1wp0 TX0 rld0 m10 8lb0 uL0", "America/Argentina/San_Luis|CMT -04 -03 -02|4g.M 40 30 20|012121212121212121212121212121212121212121232323121212321212|-20UHH.c pKnH.c Mn0 1iN0 Tb0 1C10 LX0 1C10 LX0 1C10 LX0 1C10 Mn0 1C10 LX0 1C10 LX0 1C10 LX0 1C10 Mn0 MN0 2jz0 MN0 4lX0 u10 5Lb0 1pB0 Fnz0 u10 uL0 1vd0 SL0 1vd0 SL0 1vd0 17z0 1cN0 1fz0 1cN0 1cL0 1cN0 asn0 Db0 zvd0 Bz0 1tB0 XX0 1q20 SL0 AN0 vDb0 m10 8lb0 8L0 jd0 1qN0 WL0 1qN0", "America/Argentina/Tucuman|CMT -04 -03 -02|4g.M 40 30 20|0121212121212121212121212121212121212121212323232313232123232|-20UHH.c pKnH.c Mn0 1iN0 Tb0 1C10 LX0 1C10 LX0 1C10 LX0 1C10 Mn0 1C10 LX0 1C10 LX0 1C10 LX0 1C10 Mn0 MN0 2jz0 MN0 4lX0 u10 5Lb0 1pB0 Fnz0 u10 uL0 1vd0 SL0 1vd0 SL0 1vd0 17z0 1cN0 1fz0 1cN0 1cL0 1cN0 asn0 Db0 zvd0 Bz0 1tB0 TX0 1wp0 Rb0 1wq0 Ra0 1wp0 TX0 rlB0 4N0 8BX0 uL0 1qN0 WL0", "America/Argentina/Ushuaia|CMT -04 -03 -02|4g.M 40 30 20|01212121212121212121212121212121212121212123232323232321232|-20UHH.c pKnH.c Mn0 1iN0 Tb0 1C10 LX0 1C10 LX0 1C10 LX0 1C10 Mn0 1C10 LX0 1C10 LX0 1C10 LX0 1C10 Mn0 MN0 2jz0 MN0 4lX0 u10 5Lb0 1pB0 Fnz0 u10 uL0 1vd0 SL0 1vd0 SL0 1vd0 17z0 1cN0 1fz0 1cN0 1cL0 1cN0 asn0 Db0 zvd0 Bz0 1tB0 TX0 1wp0 Rb0 1wp0 Rb0 1wp0 TX0 rkN0 8p0 8zb0 uL0", "America/Curacao|LMT -0430 AST|4z.L 4u 40|012|-2kV7o.d 28KLS.d|15e4", "America/Asuncion|AMT -04 -03|3O.E 40 30|012121212121212121212121212121212121212121212121212121212121212121212121212121212121212121212121212121212121212121212121212121212|-1x589.k 1DKM9.k 3CL0 3Dd0 10L0 1pB0 10n0 1pB0 10n0 1pB0 1cL0 1dd0 1db0 1dd0 1cL0 1dd0 1cL0 1dd0 1cL0 1dd0 1db0 1dd0 1cL0 1dd0 1cL0 1dd0 1cL0 1dd0 1db0 1dd0 1cL0 1lB0 14n0 1dd0 1cL0 1fd0 WL0 1rd0 1aL0 1dB0 Xz0 1qp0 Xb0 1qN0 10L0 1rB0 TX0 1tB0 WL0 1qN0 11z0 1o10 11z0 1o10 11z0 1qN0 1cL0 WN0 1qL0 11B0 1nX0 1ip0 WL0 1qN0 WL0 1qN0 WL0 1tB0 TX0 1tB0 TX0 1tB0 19X0 1a10 1fz0 1a10 1fz0 1cN0 17b0 1ip0 17b0 1ip0 17b0 1ip0 19X0 1fB0 19X0 1fB0 19X0 1ip0 17b0 1ip0 17b0 1ip0 19X0 1fB0 19X0 1fB0 19X0 1fB0 19X0 1ip0 17b0 1ip0 17b0 1ip0 19X0 1fB0 19X0 1fB0 19X0 1ip0 17b0 1ip0 17b0 1ip0 19X0 1fB0 19X0 1fB0 19X0 1fB0 19X0 1ip0 17b0 1ip0 17b0 1ip0|28e5", "America/Atikokan|CST CDT CWT CPT EST|60 50 50 50 50|0101234|-25TQ0 1in0 Rnb0 3je0 8x30 iw0|28e2", "America/Bahia|LMT -03 -02|2y.4 30 20|01212121212121212121212121212121212121212121212121212121212121|-2glxp.U HdLp.U 1cc0 1e10 1bX0 Ezd0 So0 1vA0 Mn0 1BB0 ML0 1BB0 zX0 qe10 xb0 2ep0 nz0 1C10 zX0 1C10 LX0 1C10 Mn0 H210 Rb0 1tB0 IL0 1Fd0 FX0 1EN0 FX0 1HB0 Lz0 1EN0 Lz0 1C10 IL0 1HB0 Db0 1HB0 On0 1zd0 On0 1zd0 Lz0 1zd0 Rb0 1wN0 Wn0 1tB0 Rb0 1tB0 WL0 1tB0 Rb0 1zd0 On0 1HB0 FX0 l5B0 Rb0|27e5", "America/Bahia_Banderas|LMT MST CST PST MDT CDT|71 70 60 80 60 50|0121212131414141414141414141414141414152525252525252525252525252525252525252525252525252525252|-1UQF0 deL0 8lc0 17c0 10M0 1dd0 otX0 gmN0 P2N0 13Vd0 1lb0 14p0 1lb0 14p0 1lb0 14p0 1nX0 11B0 1nX0 1fB0 WL0 1fB0 1lb0 14p0 1lb0 14p0 1nX0 11B0 1nX0 11B0 1nX0 11B0 1nX0 14p0 1lb0 14p0 1lb0 14p0 1nW0 11B0 1nX0 11B0 1nX0 14p0 1lb0 14p0 1lb0 14p0 1lb0 14p0 1nX0 11B0 1nX0 11B0 1nX0 14p0 1lb0 14p0 1lb0 14p0 1nX0 11B0 1nX0 11B0 1nX0 14p0 1lb0 14p0 1lb0 14p0 1lb0 14p0 1nX0 11B0 1nX0 11B0 1nX0 14p0 1lb0 14p0 1lb0 14p0 1nX0 11B0 1nX0 11B0 1nX0 11B0 1nX0 14p0 1lb0 14p0 1lb0|84e3", "America/Barbados|LMT BMT AST ADT|3W.t 3W.t 40 30|01232323232|-1Q0I1.v jsM0 1ODC1.v IL0 1ip0 17b0 1ip0 17b0 1ld0 13b0|28e4", "America/Belem|LMT -03 -02|3d.U 30 20|012121212121212121212121212121|-2glwK.4 HdKK.4 1cc0 1e10 1bX0 Ezd0 So0 1vA0 Mn0 1BB0 ML0 1BB0 zX0 qe10 xb0 2ep0 nz0 1C10 zX0 1C10 LX0 1C10 Mn0 H210 Rb0 1tB0 IL0 1Fd0 FX0|20e5", "America/Belize|LMT CST -0530 CDT|5Q.M 60 5u 50|01212121212121212121212121212121212121212121212121213131|-2kBu7.c fPA7.c Onu 1zcu Rbu 1wou Rbu 1wou Rbu 1zcu Onu 1zcu Onu 1zcu Rbu 1wou Rbu 1wou Rbu 1wou Rbu 1zcu Onu 1zcu Onu 1zcu Rbu 1wou Rbu 1wou Rbu 1zcu Onu 1zcu Onu 1zcu Onu 1zcu Rbu 1wou Rbu 1wou Rbu 1zcu Onu 1zcu Onu 1zcu Rbu 1wou Rbu 1f0Mu qn0 lxB0 mn0|57e3", "America/Blanc-Sablon|AST ADT AWT APT|40 30 30 30|010230|-25TS0 1in0 UGp0 8x50 iu0|11e2", "America/Boa_Vista|LMT -04 -03|42.E 40 30|0121212121212121212121212121212121|-2glvV.k HdKV.k 1cc0 1e10 1bX0 Ezd0 So0 1vA0 Mn0 1BB0 ML0 1BB0 zX0 qe10 xb0 2ep0 nz0 1C10 zX0 1C10 LX0 1C10 Mn0 H210 Rb0 1tB0 IL0 1Fd0 FX0 smp0 WL0 1tB0 2L0|62e2", "America/Bogota|BMT -05 -04|4U.g 50 40|0121|-2eb73.I 38yo3.I 2en0|90e5", "America/Boise|PST PDT MST MWT MPT MDT|80 70 70 60 60 60|0101023425252525252525252525252525252525252525252525252525252525252525252525252525252525252525252525252525252525252525252525252525252525252525252525252|-261q0 1nX0 11B0 1nX0 8C10 JCL0 8x20 ix0 QwN0 1cL0 1cN0 1cL0 1cN0 1cL0 1cN0 1cL0 1cN0 1fz0 1cN0 1cL0 1cN0 1cL0 Dd0 1Kn0 LB0 1BX0 1cN0 1fz0 1a10 1fz0 1cN0 1cL0 1cN0 1cL0 1cN0 1cL0 1cN0 1cL0 1cN0 1fz0 1a10 1fz0 1cN0 1cL0 1cN0 1cL0 1cN0 1cL0 14p0 1lb0 14p0 1nX0 11B0 1nX0 11B0 1nX0 14p0 1lb0 14p0 1lb0 14p0 1nX0 11B0 1nX0 11B0 1nX0 14p0 1lb0 14p0 1lb0 14p0 1lb0 14p0 1nX0 11B0 1nX0 11B0 1nX0 14p0 1lb0 14p0 1lb0 14p0 1nX0 11B0 1nX0 11B0 1nX0 Rd0 1zb0 Op0 1zb0 Op0 1zb0 Rd0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Rd0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Rd0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Rd0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Rd0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0|21e4", "America/Cambridge_Bay|-00 MST MWT MPT MDDT MDT CST CDT EST|0 70 60 60 50 60 60 50 50|0123141515151515151515151515151515151515151515678651515151515151515151515151515151515151515151515151515151515151515151515151|-21Jc0 RO90 8x20 ix0 LCL0 1fA0 zgO0 1cL0 1cN0 1cL0 1cN0 1fz0 1a10 1fz0 1cN0 1cL0 1cN0 1cL0 1cN0 1cL0 14p0 1lb0 14p0 1nX0 11B0 1nX0 11B0 1nX0 14p0 1lb0 14p0 1lb0 14p0 1nX0 11B0 1nX0 11B0 1nX0 14p0 1lb0 14p0 1lb0 14p0 1lb0 14p0 1nX0 11A0 1nX0 2K0 WQ0 1nX0 14p0 1lb0 14p0 1lb0 14p0 1nX0 11B0 1nX0 11B0 1nX0 Rd0 1zb0 Op0 1zb0 Op0 1zb0 Rd0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Rd0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Rd0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Rd0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Rd0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0|15e2", "America/Campo_Grande|LMT -04 -03|3C.s 40 30|012121212121212121212121212121212121212121212121212121212121212121212121212121212121212121212121212121212121212121212121212121212|-2glwl.w HdLl.w 1cc0 1e10 1bX0 Ezd0 So0 1vA0 Mn0 1BB0 ML0 1BB0 zX0 qe10 xb0 2ep0 nz0 1C10 zX0 1C10 LX0 1C10 Mn0 H210 Rb0 1tB0 IL0 1Fd0 FX0 1EN0 FX0 1HB0 Lz0 1EN0 Lz0 1C10 IL0 1HB0 Db0 1HB0 On0 1zd0 On0 1zd0 Lz0 1zd0 Rb0 1wN0 Wn0 1tB0 Rb0 1tB0 WL0 1tB0 Rb0 1zd0 On0 1HB0 FX0 1C10 Lz0 1Ip0 HX0 1zd0 On0 1HB0 IL0 1wp0 On0 1C10 Lz0 1C10 On0 1zd0 On0 1zd0 Rb0 1zd0 Lz0 1C10 Lz0 1C10 On0 1zd0 On0 1zd0 On0 1zd0 On0 1C10 Lz0 1C10 Lz0 1C10 On0 1zd0 On0 1zd0 Rb0 1wp0 On0 1C10 Lz0 1C10 On0 1zd0 On0 1zd0 On0 1zd0 On0 1C10 Lz0 1C10 Lz0 1C10 Lz0 1C10 On0 1zd0 Rb0 1wp0 On0 1C10 Lz0 1C10 On0 1zd0|77e4", "America/Cancun|LMT CST EST EDT CDT|5L.4 60 50 40 50|0123232341414141414141414141414141414141412|-1UQG0 2q2o0 yLB0 1lb0 14p0 1lb0 14p0 Lz0 xB0 14p0 1nX0 11B0 1nX0 1fB0 WL0 1fB0 1lb0 14p0 1lb0 14p0 1nX0 11B0 1nX0 11B0 1nX0 11B0 1nX0 14p0 1lb0 14p0 1lb0 14p0 1nX0 11B0 1nX0 11B0 1nX0 14p0 1lb0 14p0 1lb0 Dd0|63e4", "America/Caracas|CMT -0430 -04|4r.E 4u 40|01212|-2kV7w.k 28KM2.k 1IwOu kqo0|29e5", "America/Cayenne|LMT -04 -03|3t.k 40 30|012|-2mrwu.E 2gWou.E|58e3", "America/Panama|CMT EST|5j.A 50|01|-2uduE.o|15e5", "America/Chicago|CST CDT EST CWT CPT|60 50 50 50 50|01010101010101010101010101010101010102010101010103401010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010|-261s0 1nX0 11B0 1nX0 1wp0 TX0 WN0 1qL0 1cN0 WL0 1qN0 11z0 1o10 11z0 1o10 11z0 1o10 11z0 1o10 11z0 1qN0 11z0 1o10 11z0 1o10 11z0 1o10 11z0 1o10 11z0 1qN0 WL0 1qN0 11z0 1o10 11z0 11B0 1Hz0 14p0 11z0 1o10 11z0 1qN0 WL0 1qN0 11z0 1o10 11z0 RB0 8x30 iw0 1o10 11z0 1o10 11z0 1o10 11z0 1o10 11z0 1qN0 WL0 1qN0 11z0 1o10 11z0 1o10 11z0 1o10 11z0 1o10 1fz0 1cN0 1cL0 1cN0 1cL0 1cN0 1cL0 1cN0 1cL0 1cN0 1fz0 1cN0 1cL0 1cN0 1cL0 1cN0 1cL0 1cN0 1cL0 1cN0 1fz0 1a10 1fz0 1cN0 1cL0 1cN0 1cL0 1cN0 1cL0 1cN0 1cL0 1cN0 1fz0 1cN0 1cL0 1cN0 1cL0 s10 1Vz0 LB0 1BX0 1cN0 1fz0 1a10 1fz0 1cN0 1cL0 1cN0 1cL0 1cN0 1cL0 1cN0 1cL0 1cN0 1fz0 1a10 1fz0 1cN0 1cL0 1cN0 1cL0 1cN0 1cL0 14p0 1lb0 14p0 1nX0 11B0 1nX0 11B0 1nX0 14p0 1lb0 14p0 1lb0 14p0 1nX0 11B0 1nX0 11B0 1nX0 14p0 1lb0 14p0 1lb0 14p0 1lb0 14p0 1nX0 11B0 1nX0 11B0 1nX0 14p0 1lb0 14p0 1lb0 14p0 1nX0 11B0 1nX0 11B0 1nX0 Rd0 1zb0 Op0 1zb0 Op0 1zb0 Rd0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Rd0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Rd0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Rd0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Rd0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0|92e5", "America/Chihuahua|LMT MST CST CDT MDT|74.k 70 60 50 60|0121212323241414141414141414141414141414141414141414141414141414141414141414141414141414141|-1UQF0 deL0 8lc0 17c0 10M0 1dd0 2zQN0 1lb0 14p0 1lb0 14q0 1lb0 14p0 1nX0 11B0 1nX0 1fB0 WL0 1fB0 1lb0 14p0 1lb0 14p0 1nX0 11B0 1nX0 11B0 1nX0 11B0 1nX0 14p0 1lb0 14p0 1lb0 14p0 1nX0 11B0 1nX0 11B0 1nX0 14p0 1lb0 14p0 1lb0 14p0 1lb0 14p0 1nX0 11B0 1nX0 11B0 1nX0 14p0 1lb0 14p0 1lb0 14p0 1nX0 11B0 1nX0 11B0 1nX0 14p0 1lb0 14p0 1lb0 14p0 1lb0 14p0 1nX0 11B0 1nX0 11B0 1nX0 14p0 1lb0 14p0 1lb0 14p0 1nX0 11B0 1nX0 11B0 1nX0 11B0 1nX0 14p0 1lb0 14p0 1lb0|81e4", "America/Costa_Rica|SJMT CST CDT|5A.d 60 50|0121212121|-1Xd6n.L 2lu0n.L Db0 1Kp0 Db0 pRB0 15b0 1kp0 mL0|12e5", "America/Creston|MST PST|70 80|010|-29DR0 43B0|53e2", "America/Cuiaba|LMT -04 -03|3I.k 40 30|0121212121212121212121212121212121212121212121212121212121212121212121212121212121212121212121212121212121212121212121212121212|-2glwf.E HdLf.E 1cc0 1e10 1bX0 Ezd0 So0 1vA0 Mn0 1BB0 ML0 1BB0 zX0 qe10 xb0 2ep0 nz0 1C10 zX0 1C10 LX0 1C10 Mn0 H210 Rb0 1tB0 IL0 1Fd0 FX0 1EN0 FX0 1HB0 Lz0 1EN0 Lz0 1C10 IL0 1HB0 Db0 1HB0 On0 1zd0 On0 1zd0 Lz0 1zd0 Rb0 1wN0 Wn0 1tB0 Rb0 1tB0 WL0 1tB0 Rb0 1zd0 On0 1HB0 FX0 4a10 HX0 1zd0 On0 1HB0 IL0 1wp0 On0 1C10 Lz0 1C10 On0 1zd0 On0 1zd0 Rb0 1zd0 Lz0 1C10 Lz0 1C10 On0 1zd0 On0 1zd0 On0 1zd0 On0 1C10 Lz0 1C10 Lz0 1C10 On0 1zd0 On0 1zd0 Rb0 1wp0 On0 1C10 Lz0 1C10 On0 1zd0 On0 1zd0 On0 1zd0 On0 1C10 Lz0 1C10 Lz0 1C10 Lz0 1C10 On0 1zd0 Rb0 1wp0 On0 1C10 Lz0 1C10 On0 1zd0|54e4", "America/Danmarkshavn|LMT -03 -02 GMT|1e.E 30 20 0|01212121212121212121212121212121213|-2a5WJ.k 2z5fJ.k 19U0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1fA0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1fA0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 DC0|8", "America/Dawson|YST YDT YWT YPT YDDT PST PDT|90 80 80 80 70 80 70|0101023040565656565656565656565656565656565656565656565656565656565656565656565656565656565656565656565656565656565656565656565|-25TN0 1in0 1o10 13V0 Ser0 8x00 iz0 LCL0 1fA0 jrA0 fNd0 1cL0 1cN0 1cL0 1cN0 1fz0 1a10 1fz0 1cN0 1cL0 1cN0 1cL0 1cN0 1cL0 14p0 1lb0 14p0 1nX0 11B0 1nX0 11B0 1nX0 14p0 1lb0 14p0 1lb0 14p0 1nX0 11B0 1nX0 11B0 1nX0 14p0 1lb0 14p0 1lb0 14p0 1lb0 14p0 1nX0 11B0 1nX0 11B0 1nX0 14p0 1lb0 14p0 1lb0 14p0 1nX0 11B0 1nX0 11B0 1nX0 Rd0 1zb0 Op0 1zb0 Op0 1zb0 Rd0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Rd0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Rd0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Rd0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Rd0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0|13e2", "America/Dawson_Creek|PST PDT PWT PPT MST|80 70 70 70 70|0102301010101010101010101010101010101010101010101010101014|-25TO0 1in0 UGp0 8x10 iy0 3NB0 11z0 1o10 11z0 1o10 11z0 1qN0 WL0 1qN0 11z0 1o10 11z0 1o10 11z0 1o10 11z0 1o10 11z0 1qN0 11z0 1o10 11z0 1o10 11z0 1o10 11z0 1o10 11z0 1qN0 WL0 1qN0 1cL0 1cN0 1cL0 1cN0 1cL0 1cN0 1fz0 1a10 1fz0 1cN0 1cL0 1cN0 1cL0 1cN0 1cL0 1cN0 1cL0 1cN0 1fz0 1cN0 ML0|12e3", "America/Denver|MST MDT MWT MPT|70 60 60 60|01010101023010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010|-261r0 1nX0 11B0 1nX0 11B0 1qL0 WN0 mn0 Ord0 8x20 ix0 LCN0 1fz0 1a10 1fz0 1cN0 1cL0 1cN0 1cL0 1cN0 1cL0 1cN0 1cL0 1cN0 1fz0 1cN0 1cL0 1cN0 1cL0 s10 1Vz0 LB0 1BX0 1cN0 1fz0 1a10 1fz0 1cN0 1cL0 1cN0 1cL0 1cN0 1cL0 1cN0 1cL0 1cN0 1fz0 1a10 1fz0 1cN0 1cL0 1cN0 1cL0 1cN0 1cL0 14p0 1lb0 14p0 1nX0 11B0 1nX0 11B0 1nX0 14p0 1lb0 14p0 1lb0 14p0 1nX0 11B0 1nX0 11B0 1nX0 14p0 1lb0 14p0 1lb0 14p0 1lb0 14p0 1nX0 11B0 1nX0 11B0 1nX0 14p0 1lb0 14p0 1lb0 14p0 1nX0 11B0 1nX0 11B0 1nX0 Rd0 1zb0 Op0 1zb0 Op0 1zb0 Rd0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Rd0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Rd0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Rd0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Rd0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0|26e5", "America/Detroit|LMT CST EST EWT EPT EDT|5w.b 60 50 40 40 40|01234252525252525252525252525252525252525252525252525252525252525252525252525252525252525252525252525252525252525252525252525252525252525252|-2Cgir.N peqr.N 156L0 8x40 iv0 6fd0 11z0 Jy10 SL0 dnB0 1cL0 s10 1Vz0 1cN0 1cL0 1cN0 1fz0 1a10 1fz0 1cN0 1cL0 1cN0 1cL0 1cN0 1cL0 1cN0 1cL0 1cN0 1fz0 1a10 1fz0 1cN0 1cL0 1cN0 1cL0 1cN0 1cL0 14p0 1lb0 14p0 1nX0 11B0 1nX0 11B0 1nX0 14p0 1lb0 14p0 1lb0 14p0 1nX0 11B0 1nX0 11B0 1nX0 14p0 1lb0 14p0 1lb0 14p0 1lb0 14p0 1nX0 11B0 1nX0 11B0 1nX0 14p0 1lb0 14p0 1lb0 14p0 1nX0 11B0 1nX0 11B0 1nX0 Rd0 1zb0 Op0 1zb0 Op0 1zb0 Rd0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Rd0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Rd0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Rd0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Rd0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0|37e5", "America/Edmonton|LMT MST MDT MWT MPT|7x.Q 70 60 60 60|01212121212121341212121212121212121212121212121212121212121212121212121212121212121212121212121212121212121212121212121212121212121212121212121212121212121|-2yd4q.8 shdq.8 1in0 17d0 hz0 2dB0 1fz0 1a10 11z0 1qN0 WL0 1qN0 11z0 IGN0 8x20 ix0 3NB0 11z0 LFB0 1cL0 3Cp0 1cL0 66N0 1cL0 1cN0 1cL0 1cN0 1cL0 1cN0 1cL0 1cN0 1fz0 1a10 1fz0 1cN0 1cL0 1cN0 1cL0 1cN0 1cL0 1cN0 1cL0 1cN0 1fz0 1a10 1fz0 1cN0 1cL0 1cN0 1cL0 1cN0 1cL0 14p0 1lb0 14p0 1nX0 11B0 1nX0 11B0 1nX0 14p0 1lb0 14p0 1lb0 14p0 1nX0 11B0 1nX0 11B0 1nX0 14p0 1lb0 14p0 1lb0 14p0 1lb0 14p0 1nX0 11B0 1nX0 11B0 1nX0 14p0 1lb0 14p0 1lb0 14p0 1nX0 11B0 1nX0 11B0 1nX0 Rd0 1zb0 Op0 1zb0 Op0 1zb0 Rd0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Rd0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Rd0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Rd0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Rd0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0|10e5", "America/Eirunepe|LMT -05 -04|4D.s 50 40|0121212121212121212121212121212121|-2glvk.w HdLk.w 1cc0 1e10 1bX0 Ezd0 So0 1vA0 Mn0 1BB0 ML0 1BB0 zX0 qe10 xb0 2ep0 nz0 1C10 zX0 1C10 LX0 1C10 Mn0 H210 Rb0 1tB0 IL0 1Fd0 FX0 dPB0 On0 yTd0 d5X0|31e3", "America/El_Salvador|LMT CST CDT|5U.M 60 50|012121|-1XiG3.c 2Fvc3.c WL0 1qN0 WL0|11e5", "America/Tijuana|LMT MST PST PDT PWT PPT|7M.4 70 80 70 70 70|012123245232323232323232323232323232323232323232323232323232323232323232323232323232323232323232323232323232323232323232323232323232323232323232323232|-1UQE0 4PX0 8mM0 8lc0 SN0 1cL0 pHB0 83r0 zI0 5O10 1Rz0 cOO0 11A0 1o00 11A0 1qM0 11A0 1o00 11A0 1o00 11A0 1o00 11A0 1o00 11A0 BUp0 1fz0 1a10 1fz0 1cN0 1cL0 1cN0 1cL0 1cN0 1cL0 1cN0 1cL0 1cN0 1fz0 1a10 1fz0 1cN0 1cL0 1cN0 1cL0 1cN0 1cL0 14p0 1lb0 14p0 1nX0 11B0 1nX0 11B0 1nX0 14p0 1lb0 14p0 1lb0 14p0 1nX0 11B0 1nX0 11B0 1nX0 14p0 1lb0 14p0 1lb0 14p0 1lb0 14p0 1nX0 11B0 1nX0 11B0 1nX0 14p0 1lb0 14p0 1lb0 14p0 1nX0 11B0 1nX0 11B0 1nX0 11B0 1nX0 14p0 1lb0 14p0 1lb0 U10 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Rd0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Rd0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Rd0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Rd0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0|20e5", "America/Fort_Nelson|PST PDT PWT PPT MST|80 70 70 70 70|01023010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010104|-25TO0 1in0 UGp0 8x10 iy0 3NB0 11z0 1o10 11z0 1o10 11z0 1qN0 WL0 1qN0 11z0 1o10 11z0 1o10 11z0 1o10 11z0 1o10 11z0 1qN0 11z0 1o10 11z0 1o10 11z0 1o10 11z0 1o10 11z0 1qN0 WL0 1qN0 1cL0 1cN0 1cL0 1cN0 1cL0 1cN0 1fz0 1a10 1fz0 1cN0 1cL0 1cN0 1cL0 1cN0 1cL0 1cN0 1cL0 1cN0 1fz0 1cN0 1cL0 1cN0 1cL0 1cN0 1cL0 1cN0 1cL0 1cN0 1fz0 1a10 1fz0 1cN0 1cL0 1cN0 1cL0 1cN0 1cL0 1cN0 1cL0 1cN0 1fz0 1a10 1fz0 1cN0 1cL0 1cN0 1cL0 1cN0 1cL0 14p0 1lb0 14p0 1nX0 11B0 1nX0 11B0 1nX0 14p0 1lb0 14p0 1lb0 14p0 1nX0 11B0 1nX0 11B0 1nX0 14p0 1lb0 14p0 1lb0 14p0 1lb0 14p0 1nX0 11B0 1nX0 11B0 1nX0 14p0 1lb0 14p0 1lb0 14p0 1nX0 11B0 1nX0 11B0 1nX0 Rd0 1zb0 Op0 1zb0 Op0 1zb0 Rd0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0|39e2", "America/Fort_Wayne|CST CDT CWT CPT EST EDT|60 50 50 50 50 40|010101023010101010101010101040454545454545454545454545454545454545454545454545454545454545454545454|-261s0 1nX0 11B0 1nX0 QI10 Db0 RB0 8x30 iw0 1o10 11z0 1o10 11z0 1o10 11z0 1o10 11z0 1qN0 WL0 1qN0 11z0 1o10 11z0 1o10 11z0 1o10 11z0 1o10 5Tz0 1o10 qLb0 1cL0 1cN0 1cL0 1qhd0 1nX0 Rd0 1zb0 Op0 1zb0 Op0 1zb0 Rd0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Rd0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Rd0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Rd0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Rd0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0", "America/Fortaleza|LMT -03 -02|2y 30 20|0121212121212121212121212121212121212121|-2glxq HdLq 1cc0 1e10 1bX0 Ezd0 So0 1vA0 Mn0 1BB0 ML0 1BB0 zX0 qe10 xb0 2ep0 nz0 1C10 zX0 1C10 LX0 1C10 Mn0 H210 Rb0 1tB0 IL0 1Fd0 FX0 1EN0 FX0 1HB0 Lz0 nsp0 WL0 1tB0 5z0 2mN0 On0|34e5", "America/Glace_Bay|LMT AST ADT AWT APT|3X.M 40 30 30 30|012134121212121212121212121212121212121212121212121212121212121212121212121212121212121212121212121212121212121212121212121212121212121212121|-2IsI0.c CwO0.c 1in0 UGp0 8x50 iu0 iq10 11z0 Jg10 1cL0 1cN0 1cL0 1cN0 1cL0 1cN0 1cL0 1cN0 1fz0 1a10 1fz0 1cN0 1cL0 1cN0 1cL0 1cN0 1cL0 1cN0 1cL0 1cN0 1fz0 1a10 1fz0 1cN0 1cL0 1cN0 1cL0 1cN0 1cL0 14p0 1lb0 14p0 1nX0 11B0 1nX0 11B0 1nX0 14p0 1lb0 14p0 1lb0 14p0 1nX0 11B0 1nX0 11B0 1nX0 14p0 1lb0 14p0 1lb0 14p0 1lb0 14p0 1nX0 11B0 1nX0 11B0 1nX0 14p0 1lb0 14p0 1lb0 14p0 1nX0 11B0 1nX0 11B0 1nX0 Rd0 1zb0 Op0 1zb0 Op0 1zb0 Rd0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Rd0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Rd0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Rd0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Rd0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0|19e3", "America/Godthab|LMT -03 -02|3q.U 30 20|0121212121212121212121212121212121212121212121212121212121212121212121212121212121212121212121212121212121212121212121|-2a5Ux.4 2z5dx.4 19U0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1fA0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1fA0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1fA0 1o00 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00|17e3", "America/Goose_Bay|NST NDT NST NDT NWT NPT AST ADT ADDT|3u.Q 2u.Q 3u 2u 2u 2u 40 30 20|010232323232323245232323232323232323232323232323232323232326767676767676767676767676767676767676767676768676767676767676767676767676767676767676767676767676767676767676767676767676767676767676767676767676|-25TSt.8 1in0 DXb0 2HbX.8 WL0 1qN0 WL0 1qN0 WL0 1tB0 TX0 1tB0 WL0 1qN0 WL0 1qN0 7UHu itu 1tB0 WL0 1qN0 WL0 1qN0 WL0 1qN0 WL0 1tB0 WL0 1ld0 11z0 1o10 11z0 1o10 11z0 1o10 11z0 1o10 11z0 1qN0 11z0 1o10 11z0 1o10 11z0 1o10 11z0 1o10 1fz0 1cN0 1cL0 1cN0 1cL0 1cN0 1cL0 1cN0 1cL0 1cN0 1fz0 S10 g0u 1fz0 1cN0 1cL0 1cN0 1cL0 1cN0 1cL0 1cN0 1cL0 1cN0 1fz0 1cN0 1cL0 1cN0 1cL0 1cN0 1cL0 1cN0 1cL0 1cN0 1fz0 1a10 1fz0 1cN0 1cL0 1cN0 1cL0 1cN0 1cL0 1cN0 1cL0 1cN0 1fz0 1a10 1fz0 1cN0 1cL0 1cN0 1cL0 1cN0 1cL0 14n1 1lb0 14p0 1nW0 11C0 1nX0 11B0 1nX0 14p0 1lb0 14p0 1lb0 14p0 1nX0 11B0 1nX0 11B0 1nX0 14p0 1lb0 14p0 1lb0 14p0 1lb0 14p0 1nX0 11B0 1nX0 11B0 1nX0 14p0 1lb0 14p0 1lb0 14p0 1nX0 11B0 1nX0 11B0 1nX0 Rd0 1zb0 Op0 1zb0 Op0 1zb0 Rd0 1zb0 Op0 1zcX Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Rd0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Rd0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Rd0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Rd0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0|76e2", "America/Grand_Turk|KMT EST EDT AST|57.b 50 40 40|0121212121212121212121212121212121212121212121212121212121212121212121212123|-2l1uQ.N 2HHBQ.N 1cL0 1cN0 1cL0 1cN0 1cL0 1cN0 1fz0 1a10 1fz0 1cN0 1cL0 1cN0 1cL0 1cN0 1cL0 14p0 1lb0 14p0 1nX0 11B0 1nX0 11B0 1nX0 14p0 1lb0 14p0 1lb0 14p0 1nX0 11B0 1nX0 11B0 1nX0 14p0 1lb0 14p0 1lb0 14p0 1lb0 14p0 1nX0 11B0 1nX0 11B0 1nX0 14p0 1lb0 14p0 1lb0 14p0 1nX0 11B0 1nX0 11B0 1nX0 Rd0 1zb0 Op0 1zb0 Op0 1zb0 Rd0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0|37e2", "America/Guatemala|LMT CST CDT|62.4 60 50|0121212121|-24KhV.U 2efXV.U An0 mtd0 Nz0 ifB0 17b0 zDB0 11z0|13e5", "America/Guayaquil|QMT -05 -04|5e 50 40|0121|-1yVSK 2uILK rz0|27e5", "America/Guyana|LMT -0345 -03 -04|3Q.E 3J 30 40|0123|-2dvU7.k 2r6LQ.k Bxbf|80e4", "America/Halifax|LMT AST ADT AWT APT|4e.o 40 30 30 30|0121212121212121212121212121212121212121212121212134121212121212121212121212121212121212121212121212121212121212121212121212121212121212121212121212121212121212121212121212121212121212121212121212121212121212121212121212121212121|-2IsHJ.A xzzJ.A 1db0 3I30 1in0 3HX0 IL0 1E10 ML0 1yN0 Pb0 1Bd0 Mn0 1Bd0 Rz0 1w10 Xb0 1w10 LX0 1w10 Xb0 1w10 Lz0 1C10 Jz0 1E10 OL0 1yN0 Un0 1qp0 Xb0 1qp0 11X0 1w10 Lz0 1HB0 LX0 1C10 FX0 1w10 Xb0 1qp0 Xb0 1BB0 LX0 1td0 Xb0 1qp0 Xb0 Rf0 8x50 iu0 1o10 11z0 1o10 11z0 1o10 11z0 1o10 11z0 3Qp0 11z0 1o10 11z0 1o10 11z0 1o10 11z0 3Qp0 11z0 1o10 11z0 1o10 11z0 1o10 11z0 6i10 1cL0 1cN0 1cL0 1cN0 1cL0 1cN0 1fz0 1a10 1fz0 1cN0 1cL0 1cN0 1cL0 1cN0 1cL0 1cN0 1cL0 1cN0 1fz0 1cN0 1cL0 1cN0 1cL0 1cN0 1cL0 1cN0 1cL0 1cN0 1fz0 1a10 1fz0 1cN0 1cL0 1cN0 1cL0 1cN0 1cL0 1cN0 1cL0 1cN0 1fz0 1a10 1fz0 1cN0 1cL0 1cN0 1cL0 1cN0 1cL0 14p0 1lb0 14p0 1nX0 11B0 1nX0 11B0 1nX0 14p0 1lb0 14p0 1lb0 14p0 1nX0 11B0 1nX0 11B0 1nX0 14p0 1lb0 14p0 1lb0 14p0 1lb0 14p0 1nX0 11B0 1nX0 11B0 1nX0 14p0 1lb0 14p0 1lb0 14p0 1nX0 11B0 1nX0 11B0 1nX0 Rd0 1zb0 Op0 1zb0 Op0 1zb0 Rd0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Rd0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Rd0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Rd0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Rd0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0|39e4", "America/Havana|HMT CST CDT|5t.A 50 40|012121212121212121212121212121212121212121212121212121212121212121212121212121212121212121212121212121212121212121212121212121212121212121212121212121212121|-1Meuu.o 72zu.o ML0 sld0 An0 1Nd0 Db0 1Nd0 An0 6Ep0 An0 1Nd0 An0 JDd0 Mn0 1Ap0 On0 1fd0 11X0 1qN0 WL0 1wp0 1cL0 1cN0 1cL0 1cN0 1fz0 1cN0 14n0 1ld0 14L0 1kN0 15b0 1kp0 1cL0 1cN0 1fz0 1a10 1fz0 1fB0 11z0 14p0 1nX0 11B0 1nX0 1o10 11z0 1o10 11z0 1o10 11z0 1o10 14n0 1ld0 14n0 11B0 1nX0 11B0 1nX0 14p0 1lb0 14p0 1lb0 1a10 1in0 1a10 1fA0 1a00 1fA0 1a00 1fA0 1a00 1fA0 1a00 1fA0 1cM0 1cM0 1cM0 1fA0 17c0 1o00 11A0 1qM0 11A0 1o00 11A0 1o00 14o0 1lc0 14o0 1lc0 11A0 6i00 Rc0 1wo0 U00 1tA0 Rc0 1wo0 U00 1wo0 U00 1zc0 U00 1qM0 Oo0 1zc0 Oo0 1zc0 Oo0 1zc0 Rc0 1zc0 Oo0 1zc0 Oo0 1zc0 Oo0 1zc0 Oo0 1zc0 Rc0 1zc0 Oo0 1zc0 Oo0 1zc0 Oo0 1zc0 Oo0 1zc0 Oo0 1zc0 Rc0 1zc0 Oo0 1zc0 Oo0 1zc0 Oo0 1zc0 Oo0 1zc0 Rc0 1zc0 Oo0 1zc0 Oo0 1zc0 Oo0 1zc0 Oo0 1zc0 Oo0 1zc0|21e5", "America/Hermosillo|LMT MST CST PST MDT|7n.Q 70 60 80 60|0121212131414141|-1UQF0 deL0 8lc0 17c0 10M0 1dd0 otX0 gmN0 P2N0 13Vd0 1lb0 14p0 1lb0 14p0 1lb0|64e4", "America/Indiana/Knox|CST CDT CWT CPT EST|60 50 50 50 50|0101023010101010101010101010101010101040101010101010101010101010101010101010101010101010141010101010101010101010101010101010101010101010101010101010101010|-261s0 1nX0 11B0 1nX0 SgN0 8x30 iw0 3NB0 11z0 1o10 11z0 1o10 11z0 1qN0 WL0 1qN0 11z0 1o10 11z0 1o10 11z0 1o10 11z0 1o10 1fz0 1cN0 1cL0 1cN0 11z0 1o10 11z0 1o10 1cL0 1cN0 1fz0 1cN0 1cL0 1cN0 3Cn0 8wp0 1cL0 1cN0 1cL0 1cN0 1cL0 1cN0 1cL0 1cN0 1fz0 1cN0 1cL0 1cN0 1cL0 s10 1Vz0 LB0 1BX0 1cN0 1fz0 1a10 1fz0 1cN0 1cL0 1cN0 1cL0 1cN0 1cL0 1cN0 1cL0 1cN0 1fz0 1a10 1fz0 1cN0 1cL0 1cN0 1cL0 1cN0 1cL0 14p0 1lb0 14p0 1nX0 11B0 1nX0 11B0 1nX0 14p0 1lb0 z8o0 1o00 Rd0 1zb0 Op0 1zb0 Op0 1zb0 Rd0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Rd0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Rd0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Rd0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Rd0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0", "America/Indiana/Marengo|CST CDT CWT CPT EST EDT|60 50 50 50 50 40|0101023010101010101010104545454545414545454545454545454545454545454545454545454545454545454545454545454|-261s0 1nX0 11B0 1nX0 SgN0 8x30 iw0 dyN0 11z0 6fd0 11z0 1o10 11z0 1qN0 11z0 1o10 11z0 1o10 11z0 1o10 11z0 1o10 11z0 1qN0 jrz0 1cL0 1cN0 1cL0 1cN0 1fz0 1cN0 1cL0 1cN0 1cL0 s10 1VA0 LA0 1BX0 1e6p0 1nX0 Rd0 1zb0 Op0 1zb0 Op0 1zb0 Rd0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Rd0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Rd0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Rd0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Rd0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0", "America/Indiana/Petersburg|CST CDT CWT CPT EST EDT|60 50 50 50 50 40|01010230101010101010101010104010101010101010101010141014545454545454545454545454545454545454545454545454545454545454|-261s0 1nX0 11B0 1nX0 SgN0 8x30 iw0 njX0 WN0 1qN0 11z0 1o10 11z0 1o10 11z0 1o10 11z0 1o10 11z0 1qN0 1cL0 1cN0 1cL0 1cN0 1cL0 1cN0 1cL0 1cN0 3Fb0 1cN0 1cL0 1cN0 1cL0 1cN0 1cL0 1cN0 1cL0 1cN0 1fz0 1cN0 1cL0 1cN0 1cL0 s10 1Vz0 LB0 1BX0 1cN0 1fz0 1a10 1fz0 19co0 1o00 Rd0 1zb0 Oo0 1zb0 Op0 1zb0 Rd0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Rd0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Rd0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Rd0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Rd0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0", "America/Indiana/Tell_City|CST CDT CWT CPT EST EDT|60 50 50 50 50 40|01010230101010101010101010101010454541010101010101010101010101010101010101010101010101010101010101010|-261s0 1nX0 11B0 1nX0 SgN0 8x30 iw0 1o10 11z0 g0p0 11z0 1o10 11z0 1qL0 WN0 1qN0 11z0 1o10 11z0 1o10 11z0 1o10 11z0 1o10 1fz0 1cN0 WL0 1qN0 1cL0 1cN0 1cL0 1cN0 caL0 1cL0 1cN0 1cL0 1qhd0 1o00 Rd0 1zb0 Op0 1zb0 Op0 1zb0 Rd0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Rd0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Rd0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Rd0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Rd0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0", "America/Indiana/Vevay|CST CDT CWT CPT EST EDT|60 50 50 50 50 40|010102304545454545454545454545454545454545454545454545454545454545454545454545454|-261s0 1nX0 11B0 1nX0 SgN0 8x30 iw0 kPB0 Awn0 1cL0 1cN0 1cL0 1cN0 1fz0 1cN0 1cL0 1lnd0 1nX0 Rd0 1zb0 Op0 1zb0 Op0 1zb0 Rd0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Rd0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Rd0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Rd0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Rd0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0", "America/Indiana/Vincennes|CST CDT CWT CPT EST EDT|60 50 50 50 50 40|01010230101010101010101010101010454541014545454545454545454545454545454545454545454545454545454545454|-261s0 1nX0 11B0 1nX0 SgN0 8x30 iw0 1o10 11z0 g0p0 11z0 1o10 11z0 1qL0 WN0 1qN0 11z0 1o10 11z0 1o10 11z0 1o10 11z0 1o10 1fz0 1cN0 WL0 1qN0 1cL0 1cN0 1cL0 1cN0 caL0 1cL0 1cN0 1cL0 1qhd0 1o00 Rd0 1zb0 Oo0 1zb0 Op0 1zb0 Rd0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Rd0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Rd0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Rd0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Rd0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0", "America/Indiana/Winamac|CST CDT CWT CPT EST EDT|60 50 50 50 50 40|01010230101010101010101010101010101010454541054545454545454545454545454545454545454545454545454545454545454|-261s0 1nX0 11B0 1nX0 SgN0 8x30 iw0 1o10 11z0 1o10 11z0 1o10 11z0 1o10 11z0 1qN0 WL0 1qN0 11z0 1o10 11z0 1o10 11z0 1o10 11z0 1o10 1fz0 1cN0 1cL0 1cN0 11z0 1o10 11z0 1o10 11z0 1o10 11z0 1qN0 jrz0 1cL0 1cN0 1cL0 1qhd0 1o00 Rd0 1za0 Op0 1zb0 Op0 1zb0 Rd0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Rd0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Rd0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Rd0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Rd0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0", "America/Inuvik|-00 PST PDDT MST MDT|0 80 60 70 60|0121343434343434343434343434343434343434343434343434343434343434343434343434343434343434343434343434343434343434343434343|-FnA0 tWU0 1fA0 wPe0 2pz0 1cL0 1cN0 1cL0 1cN0 1fz0 1a10 1fz0 1cN0 1cL0 1cN0 1cL0 1cN0 1cL0 14p0 1lb0 14p0 1nX0 11B0 1nX0 11B0 1nX0 14p0 1lb0 14p0 1lb0 14p0 1nX0 11B0 1nX0 11B0 1nX0 14p0 1lb0 14p0 1lb0 14p0 1lb0 14p0 1nX0 11B0 1nX0 11B0 1nX0 14p0 1lb0 14p0 1lb0 14p0 1nX0 11B0 1nX0 11B0 1nX0 Rd0 1zb0 Op0 1zb0 Op0 1zb0 Rd0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Rd0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Rd0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Rd0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Rd0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0|35e2", "America/Iqaluit|-00 EWT EPT EST EDDT EDT CST CDT|0 40 40 50 30 40 60 50|01234353535353535353535353535353535353535353567353535353535353535353535353535353535353535353535353535353535353535353535353|-16K00 7nX0 iv0 LCL0 1fA0 zgO0 1cL0 1cN0 1cL0 1cN0 1fz0 1a10 1fz0 1cN0 1cL0 1cN0 1cL0 1cN0 1cL0 14p0 1lb0 14p0 1nX0 11B0 1nX0 11B0 1nX0 14p0 1lb0 14p0 1lb0 14p0 1nX0 11B0 1nX0 11B0 1nX0 14p0 1lb0 14p0 1lb0 14p0 1lb0 14p0 1nX0 11C0 1nX0 11A0 1nX0 14p0 1lb0 14p0 1lb0 14p0 1nX0 11B0 1nX0 11B0 1nX0 Rd0 1zb0 Op0 1zb0 Op0 1zb0 Rd0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Rd0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Rd0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Rd0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Rd0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0|67e2", "America/Jamaica|KMT EST EDT|57.b 50 40|0121212121212121212121|-2l1uQ.N 2uM1Q.N 1Vz0 LB0 1BX0 1cN0 1fz0 1a10 1fz0 1cN0 1cL0 1cN0 1cL0 1cN0 1cL0 1cN0 1cL0 1cN0 1fz0 1a10 1fz0|94e4", "America/Juneau|PST PWT PPT PDT YDT YST AKST AKDT|80 70 70 70 80 90 90 80|01203030303030303030303030403030356767676767676767676767676767676767676767676767676767676767676767676767676767676767676767676767676767676767676|-17T20 8x10 iy0 Vo10 1cL0 1cN0 1cL0 1cN0 1fz0 1cN0 1cL0 1cN0 1cL0 s10 1Vz0 LB0 1BX0 1cN0 1fz0 1a10 1fz0 1cN0 1cL0 1cN0 1cL0 1cN0 1cM0 1cM0 1cL0 1cN0 1fz0 1a10 1fz0 co0 10q0 1cL0 1cN0 1cL0 1cN0 1cL0 14p0 1lb0 14p0 1nX0 11B0 1nX0 11B0 1nX0 14p0 1lb0 14p0 1lb0 14p0 1nX0 11B0 1nX0 11B0 1nX0 14p0 1lb0 14p0 1lb0 14p0 1lb0 14p0 1nX0 11B0 1nX0 11B0 1nX0 14p0 1lb0 14p0 1lb0 14p0 1nX0 11B0 1nX0 11B0 1nX0 Rd0 1zb0 Op0 1zb0 Op0 1zb0 Rd0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Rd0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Rd0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Rd0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Rd0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0|33e3", "America/Kentucky/Louisville|CST CDT CWT CPT EST EDT|60 50 50 50 50 40|0101010102301010101010101010101010101454545454545414545454545454545454545454545454545454545454545454545454545454545454545454545454545454545454545454545454545454545454545454545454|-261s0 1nX0 11B0 1nX0 3Fd0 Nb0 LPd0 11z0 RB0 8x30 iw0 Bb0 10N0 2bB0 8in0 1qN0 11z0 1o10 11z0 1o10 11z0 1o10 11z0 1o10 11z0 1qN0 1cL0 1cN0 1cL0 1cN0 1cL0 1cN0 1cL0 1cN0 1fz0 1cN0 xz0 gso0 1cL0 1cN0 1cL0 1cN0 1cL0 1cN0 1fz0 1cN0 1cL0 1cN0 1cL0 s10 1VA0 LA0 1BX0 1cN0 1fz0 1a10 1fz0 1cN0 1cL0 1cN0 1cL0 1cN0 1cL0 1cN0 1cL0 1cN0 1fz0 1a10 1fz0 1cN0 1cL0 1cN0 1cL0 1cN0 1cL0 14p0 1lb0 14p0 1nX0 11B0 1nX0 11B0 1nX0 14p0 1lb0 14p0 1lb0 14p0 1nX0 11B0 1nX0 11B0 1nX0 14p0 1lb0 14p0 1lb0 14p0 1lb0 14p0 1nX0 11B0 1nX0 11B0 1nX0 14p0 1lb0 14p0 1lb0 14p0 1nX0 11B0 1nX0 11B0 1nX0 Rd0 1zb0 Op0 1zb0 Op0 1zb0 Rd0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Rd0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Rd0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Rd0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Rd0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0", "America/Kentucky/Monticello|CST CDT CWT CPT EST EDT|60 50 50 50 50 40|0101023010101010101010101010101010101010101010101010101010101010101010101454545454545454545454545454545454545454545454545454545454545454545454545454|-261s0 1nX0 11B0 1nX0 SgN0 8x30 iw0 SWp0 1cL0 1cN0 1cL0 1cN0 1cL0 1cN0 1fz0 1cN0 1cL0 1cN0 1cL0 s10 1Vz0 LB0 1BX0 1cN0 1fz0 1a10 1fz0 1cN0 1cL0 1cN0 1cL0 1cN0 1cL0 1cN0 1cL0 1cN0 1fz0 1a10 1fz0 1cN0 1cL0 1cN0 1cL0 1cN0 1cL0 14p0 1lb0 14p0 1nX0 11B0 1nX0 11B0 1nX0 14p0 1lb0 14p0 1lb0 14p0 1nX0 11B0 1nX0 11B0 1nX0 14p0 1lb0 14p0 1lb0 14p0 1lb0 14p0 1nX0 11B0 1nX0 11A0 1nX0 14p0 1lb0 14p0 1lb0 14p0 1nX0 11B0 1nX0 11B0 1nX0 Rd0 1zb0 Op0 1zb0 Op0 1zb0 Rd0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Rd0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Rd0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Rd0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Rd0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0", "America/La_Paz|CMT BOST -04|4w.A 3w.A 40|012|-1x37r.o 13b0|19e5", "America/Lima|LMT -05 -04|58.A 50 40|0121212121212121|-2tyGP.o 1bDzP.o zX0 1aN0 1cL0 1cN0 1cL0 1PrB0 zX0 1O10 zX0 6Gp0 zX0 98p0 zX0|11e6", "America/Los_Angeles|PST PDT PWT PPT|80 70 70 70|010102301010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010|-261q0 1nX0 11B0 1nX0 SgN0 8x10 iy0 5Wp1 1VaX 3dA0 WM0 1qM0 11A0 1o00 11A0 1o00 11A0 1o00 11A0 1o00 11A0 1qM0 11A0 1o00 11A0 1o00 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1fA0 1a00 1fA0 1cN0 1cL0 1cN0 1cL0 1cN0 1cL0 1cN0 1cL0 1cN0 1fz0 1cN0 1cL0 1cN0 1cL0 s10 1Vz0 LB0 1BX0 1cN0 1fz0 1a10 1fz0 1cN0 1cL0 1cN0 1cL0 1cN0 1cL0 1cN0 1cL0 1cN0 1fz0 1a10 1fz0 1cN0 1cL0 1cN0 1cL0 1cN0 1cL0 14p0 1lb0 14p0 1nX0 11B0 1nX0 11B0 1nX0 14p0 1lb0 14p0 1lb0 14p0 1nX0 11B0 1nX0 11B0 1nX0 14p0 1lb0 14p0 1lb0 14p0 1lb0 14p0 1nX0 11B0 1nX0 11B0 1nX0 14p0 1lb0 14p0 1lb0 14p0 1nX0 11B0 1nX0 11B0 1nX0 Rd0 1zb0 Op0 1zb0 Op0 1zb0 Rd0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Rd0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Rd0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Rd0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Rd0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0|15e6", "America/Maceio|LMT -03 -02|2m.Q 30 20|012121212121212121212121212121212121212121|-2glxB.8 HdLB.8 1cc0 1e10 1bX0 Ezd0 So0 1vA0 Mn0 1BB0 ML0 1BB0 zX0 qe10 xb0 2ep0 nz0 1C10 zX0 1C10 LX0 1C10 Mn0 H210 Rb0 1tB0 IL0 1Fd0 FX0 1EN0 FX0 1HB0 Lz0 dMN0 Lz0 8Q10 WL0 1tB0 5z0 2mN0 On0|93e4", "America/Managua|MMT CST EST CDT|5J.c 60 50 50|0121313121213131|-1quie.M 1yAMe.M 4mn0 9Up0 Dz0 1K10 Dz0 s3F0 1KH0 DB0 9In0 k8p0 19X0 1o30 11y0|22e5", "America/Manaus|LMT -04 -03|40.4 40 30|01212121212121212121212121212121|-2glvX.U HdKX.U 1cc0 1e10 1bX0 Ezd0 So0 1vA0 Mn0 1BB0 ML0 1BB0 zX0 qe10 xb0 2ep0 nz0 1C10 zX0 1C10 LX0 1C10 Mn0 H210 Rb0 1tB0 IL0 1Fd0 FX0 dPB0 On0|19e5", "America/Martinique|FFMT AST ADT|44.k 40 30|0121|-2mPTT.E 2LPbT.E 19X0|39e4", "America/Matamoros|LMT CST CDT|6E 60 50|0121212121212121212121212121212121212121212121212121212121212121212121212121212121212121|-1UQG0 2FjC0 1nX0 i6p0 1lb0 14p0 1lb0 14p0 1lb0 14p0 1nX0 11B0 1nX0 1fB0 WL0 1fB0 1lb0 14p0 1lb0 14p0 1nX0 11B0 1nX0 11B0 1nX0 11B0 1nX0 14p0 1lb0 14p0 1lb0 U10 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Rd0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Rd0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Rd0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Rd0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0|45e4", "America/Mazatlan|LMT MST CST PST MDT|75.E 70 60 80 60|0121212131414141414141414141414141414141414141414141414141414141414141414141414141414141414141|-1UQF0 deL0 8lc0 17c0 10M0 1dd0 otX0 gmN0 P2N0 13Vd0 1lb0 14p0 1lb0 14p0 1lb0 14p0 1nX0 11B0 1nX0 1fB0 WL0 1fB0 1lb0 14p0 1lb0 14p0 1nX0 11B0 1nX0 11B0 1nX0 11B0 1nX0 14p0 1lb0 14p0 1lb0 14p0 1nX0 11B0 1nX0 11B0 1nX0 14p0 1lb0 14p0 1lb0 14p0 1lb0 14p0 1nX0 11B0 1nX0 11B0 1nX0 14p0 1lb0 14p0 1lb0 14p0 1nX0 11B0 1nX0 11B0 1nX0 14p0 1lb0 14p0 1lb0 14p0 1lb0 14p0 1nX0 11B0 1nX0 11B0 1nX0 14p0 1lb0 14p0 1lb0 14p0 1nX0 11B0 1nX0 11B0 1nX0 11B0 1nX0 14p0 1lb0 14p0 1lb0|44e4", "America/Menominee|CST CDT CWT CPT EST|60 50 50 50 50|01010230101041010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010|-261s0 1nX0 11B0 1nX0 SgN0 8x30 iw0 1o10 11z0 LCN0 1fz0 6410 9Jb0 1cM0 s10 1Vz0 LB0 1BX0 1cN0 1fz0 1a10 1fz0 1cN0 1cL0 1cN0 1cL0 1cN0 1cL0 1cN0 1cL0 1cN0 1fz0 1a10 1fz0 1cN0 1cL0 1cN0 1cL0 1cN0 1cL0 14p0 1lb0 14p0 1nX0 11B0 1nX0 11B0 1nX0 14p0 1lb0 14p0 1lb0 14p0 1nX0 11B0 1nX0 11B0 1nX0 14p0 1lb0 14p0 1lb0 14p0 1lb0 14p0 1nX0 11B0 1nX0 11B0 1nX0 14p0 1lb0 14p0 1lb0 14p0 1nX0 11B0 1nX0 11B0 1nX0 Rd0 1zb0 Op0 1zb0 Op0 1zb0 Rd0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Rd0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Rd0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Rd0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Rd0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0|85e2", "America/Merida|LMT CST EST CDT|5W.s 60 50 50|0121313131313131313131313131313131313131313131313131313131313131313131313131313131313131|-1UQG0 2q2o0 2hz0 wu30 1lb0 14p0 1lb0 14p0 1lb0 14p0 1nX0 11B0 1nX0 1fB0 WL0 1fB0 1lb0 14p0 1lb0 14p0 1nX0 11B0 1nX0 11B0 1nX0 11B0 1nX0 14p0 1lb0 14p0 1lb0 14p0 1nX0 11B0 1nX0 11B0 1nX0 14p0 1lb0 14p0 1lb0 14p0 1lb0 14p0 1nX0 11B0 1nX0 11B0 1nX0 14p0 1lb0 14p0 1lb0 14p0 1nX0 11B0 1nX0 11B0 1nX0 14p0 1lb0 14p0 1lb0 14p0 1lb0 14p0 1nX0 11B0 1nX0 11B0 1nX0 14p0 1lb0 14p0 1lb0 14p0 1nX0 11B0 1nX0 11B0 1nX0 11B0 1nX0 14p0 1lb0 14p0 1lb0|11e5", "America/Metlakatla|PST PWT PPT PDT AKST AKDT|80 70 70 70 90 80|0120303030303030303030303030303030454545454545454545454545454545454545454545454|-17T20 8x10 iy0 Vo10 1cL0 1cN0 1cL0 1cN0 1fz0 1cN0 1cL0 1cN0 1cL0 s10 1Vz0 LB0 1BX0 1cN0 1fz0 1a10 1fz0 1cN0 1cL0 1cN0 1cL0 1cN0 1cL0 1cN0 1cL0 1cN0 1fz0 1a10 1fz0 1hU10 Rd0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Rd0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Rd0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Rd0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0|14e2", "America/Mexico_City|LMT MST CST CDT CWT|6A.A 70 60 50 50|012121232324232323232323232323232323232323232323232323232323232323232323232323232323232323232323232|-1UQF0 deL0 8lc0 17c0 10M0 1dd0 gEn0 TX0 3xd0 Jb0 6zB0 SL0 e5d0 17b0 1Pff0 1lb0 14p0 1lb0 14p0 1lb0 14p0 1nX0 11B0 1nX0 1fB0 WL0 1fB0 1lb0 14p0 1lb0 14p0 1nX0 11B0 1nX0 11B0 1nX0 11B0 1nX0 14p0 1lb0 14p0 1lb0 14p0 1nX0 11B0 1nX0 11B0 1nX0 14p0 1lb0 14p0 1lb0 14p0 1lb0 14p0 1nX0 11B0 1nX0 11B0 1nX0 14p0 1lb0 14p0 1lb0 14p0 1nX0 11B0 1nX0 11B0 1nX0 14p0 1lb0 14p0 1lb0 14p0 1lb0 14p0 1nX0 11B0 1nX0 11B0 1nX0 14p0 1lb0 14p0 1lb0 14p0 1nX0 11B0 1nX0 11B0 1nX0 11B0 1nX0 14p0 1lb0 14p0 1lb0|20e6", "America/Miquelon|LMT AST -03 -02|3I.E 40 30 20|012323232323232323232323232323232323232323232323232323232323232323232323232323232323232323232323232323232|-2mKkf.k 2LTAf.k gQ10 1lb0 14p0 1nX0 11B0 1nX0 11B0 1nX0 14p0 1lb0 14p0 1lb0 14p0 1nX0 11B0 1nX0 11B0 1nX0 14p0 1lb0 14p0 1lb0 14p0 1lb0 14p0 1nX0 11B0 1nX0 11B0 1nX0 14p0 1lb0 14p0 1lb0 14p0 1nX0 11B0 1nX0 11B0 1nX0 Rd0 1zb0 Op0 1zb0 Op0 1zb0 Rd0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Rd0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Rd0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Rd0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Rd0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0|61e2", "America/Moncton|EST AST ADT AWT APT|50 40 30 30 30|012121212121212121212134121212121212121212121212121212121212121212121212121212121212121212121212121212121212121212121212121212121212121212121212121212121212121212121212121212121212121212121212121212121212121|-2IsH0 CwN0 1in0 zAo0 An0 1Nd0 An0 1Nd0 An0 1Nd0 An0 1Nd0 An0 1Nd0 An0 1K10 Lz0 1zB0 NX0 1u10 Wn0 S20 8x50 iu0 1o10 11z0 1o10 11z0 1o10 11z0 1o10 11z0 1qN0 WL0 1qN0 11z0 1o10 11z0 1o10 11z0 1o10 11z0 1o10 11z0 1qN0 11z0 1o10 1cL0 1cN0 1cL0 1cN0 1cL0 1cN0 1fz0 1cN0 1cL0 1cN0 1cL0 1cN0 1cL0 1cN0 1cL0 1cN0 1fz0 1a10 1fz0 1cN0 1cL0 1cN0 1cL0 1cN0 1cL0 1cN0 1cL0 1cN0 1fz0 1cN0 1cL0 3Cp0 1cL0 1cN0 1cL0 1cN0 1fz0 1a10 1fz0 1cN0 1cL0 1cN0 1cL0 1cN0 1cL0 1cN0 1cL0 1cN0 1fz0 1a10 1fz0 1cN0 1cL0 1cN0 1cL0 1cN0 1cL0 14p0 1lb0 14p0 1nX0 11B0 1nX0 11B0 1nX0 14p0 1lb0 14p0 1lb0 14n1 1nX0 11B0 1nX0 11B0 1nX0 14p0 1lb0 14p0 1lb0 14p0 1lb0 14p0 1nX0 11B0 1nX0 11B0 1nX0 14p0 1lb0 14p0 1lb0 14p0 1nX0 11B0 1nX0 11B0 1nX0 ReX 1zb0 Op0 1zb0 Op0 1zb0 Rd0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Rd0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Rd0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Rd0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Rd0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0|64e3", "America/Monterrey|LMT CST CDT|6F.g 60 50|0121212121212121212121212121212121212121212121212121212121212121212121212121212121212121|-1UQG0 2FjC0 1nX0 i6p0 1lb0 14p0 1lb0 14p0 1lb0 14p0 1nX0 11B0 1nX0 1fB0 WL0 1fB0 1lb0 14p0 1lb0 14p0 1nX0 11B0 1nX0 11B0 1nX0 11B0 1nX0 14p0 1lb0 14p0 1lb0 14p0 1nX0 11B0 1nX0 11B0 1nX0 14p0 1lb0 14p0 1lb0 14p0 1lb0 14p0 1nX0 11B0 1nX0 11B0 1nX0 14p0 1lb0 14p0 1lb0 14p0 1nX0 11B0 1nX0 11B0 1nX0 14p0 1lb0 14p0 1lb0 14p0 1lb0 14p0 1nX0 11B0 1nX0 11B0 1nX0 14p0 1lb0 14p0 1lb0 14p0 1nX0 11B0 1nX0 11B0 1nX0 11B0 1nX0 14p0 1lb0 14p0 1lb0|41e5", "America/Montevideo|MMT -0330 -03 -02 -0230|3I.I 3u 30 20 2u|012121212121212121212121213232323232324242423243232323232323232323232323232323232323232|-20UIf.g 8jzJ.g 1cLu 1dcu 1cLu 1dcu 1cLu ircu 11zu 1o0u 11zu 1o0u 11zu 1qMu WLu 1qMu WLu 1qMu WLu 1qMu 11zu 1o0u 11zu NAu 11bu 2iMu zWu Dq10 19X0 pd0 jz0 cm10 19X0 1fB0 1on0 11d0 1oL0 1nB0 1fzu 1aou 1fzu 1aou 1fzu 3nAu Jb0 3MN0 1SLu 4jzu 2PB0 Lb0 3Dd0 1pb0 ixd0 An0 1MN0 An0 1wp0 On0 1wp0 Rb0 1zd0 On0 1wp0 Rb0 s8p0 1fB0 1ip0 11z0 1ld0 14n0 1o10 11z0 1o10 11z0 1o10 14n0 1ld0 14n0 1ld0 14n0 1o10 11z0 1o10 11z0 1o10 11z0|17e5", "America/Toronto|EST EDT EWT EPT|50 40 40 40|01010101010101010101010101010101010101010101012301010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010|-25TR0 1in0 11Wu 1nzu 1fD0 WJ0 1wr0 Nb0 1Ap0 On0 1zd0 On0 1wp0 TX0 1tB0 TX0 1tB0 TX0 1tB0 WL0 1qN0 11z0 1o10 11z0 1o10 11z0 1o10 11z0 1qN0 WL0 1qN0 11z0 1o10 11z0 1o10 11z0 1o10 11z0 1o10 11z0 1o10 11z0 1qN0 WL0 1qN0 4kM0 8x40 iv0 1o10 11z0 1nX0 11z0 1o10 11z0 1o10 1qL0 11D0 1nX0 11B0 11z0 1o10 11z0 1o10 11z0 1o10 11z0 1o10 11z0 1qN0 11z0 1o10 1cL0 1cN0 1cL0 1cN0 1cL0 1cN0 1fz0 1cN0 1cL0 1cN0 1cL0 1cN0 1cL0 1cN0 1cL0 1cN0 1fz0 1a10 1fz0 1cN0 1cL0 1cN0 1cL0 1cN0 1cL0 1cN0 1cL0 1cN0 1fz0 1cN0 1cL0 1cN0 1cL0 1cN0 1cL0 1cN0 1cL0 1cN0 1fz0 1a10 1fz0 1cN0 1cL0 1cN0 1cL0 1cN0 1cL0 1cN0 1cL0 1cN0 1fz0 1a10 1fz0 1cN0 1cL0 1cN0 1cL0 1cN0 1cL0 14p0 1lb0 14p0 1nX0 11B0 1nX0 11B0 1nX0 14p0 1lb0 14p0 1lb0 14p0 1nX0 11B0 1nX0 11B0 1nX0 14p0 1lb0 14p0 1lb0 14p0 1lb0 14p0 1nX0 11B0 1nX0 11B0 1nX0 14p0 1lb0 14p0 1lb0 14p0 1nX0 11B0 1nX0 11B0 1nX0 Rd0 1zb0 Op0 1zb0 Op0 1zb0 Rd0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Rd0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Rd0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Rd0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Rd0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0|65e5", "America/Nassau|LMT EST EDT|59.u 50 40|012121212121212121212121212121212121212121212121212121212121212121212121212121212121212121212121212121212121212121212121212121212121212121212121212121|-2kNuO.u 26XdO.u 1cL0 1cN0 1fz0 1a10 1fz0 1cN0 1cL0 1cN0 1cL0 1cN0 1cL0 1cN0 1cL0 1cN0 1fz0 1cN0 1cL0 1cN0 1cL0 1cN0 1cL0 1cN0 1cL0 1cN0 1fz0 1a10 1fz0 1cN0 1cL0 1cN0 1cL0 1cN0 1cL0 1cN0 1cL0 1cN0 1fz0 1a10 1fz0 1cN0 1cL0 1cN0 1cL0 1cN0 1cL0 14p0 1lb0 14p0 1nX0 11B0 1nX0 11B0 1nX0 14p0 1lb0 14p0 1lb0 14p0 1nX0 11B0 1nX0 11B0 1nX0 14p0 1lb0 14p0 1lb0 14p0 1lb0 14p0 1nX0 11B0 1nX0 11B0 1nX0 14p0 1lb0 14p0 1lb0 14p0 1nX0 11B0 1nX0 11B0 1nX0 Rd0 1zb0 Op0 1zb0 Op0 1zb0 Rd0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Rd0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Rd0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Rd0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Rd0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0|24e4", "America/New_York|EST EDT EWT EPT|50 40 40 40|01010101010101010101010101010101010101010101010102301010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010|-261t0 1nX0 11B0 1nX0 11B0 1qL0 1a10 11z0 1qN0 WL0 1qN0 11z0 1o10 11z0 1o10 11z0 1o10 11z0 1o10 11z0 1qN0 11z0 1o10 11z0 1o10 11z0 1o10 11z0 1o10 11z0 1qN0 WL0 1qN0 11z0 1o10 11z0 1o10 11z0 1o10 11z0 1o10 11z0 1qN0 WL0 1qN0 11z0 1o10 11z0 RB0 8x40 iv0 1o10 11z0 1o10 11z0 1o10 11z0 1o10 11z0 1qN0 WL0 1qN0 11z0 1o10 11z0 1o10 11z0 1o10 11z0 1o10 1fz0 1cN0 1cL0 1cN0 1cL0 1cN0 1cL0 1cN0 1cL0 1cN0 1fz0 1cN0 1cL0 1cN0 1cL0 1cN0 1cL0 1cN0 1cL0 1cN0 1fz0 1a10 1fz0 1cN0 1cL0 1cN0 1cL0 1cN0 1cL0 1cN0 1cL0 1cN0 1fz0 1cN0 1cL0 1cN0 1cL0 s10 1Vz0 LB0 1BX0 1cN0 1fz0 1a10 1fz0 1cN0 1cL0 1cN0 1cL0 1cN0 1cL0 1cN0 1cL0 1cN0 1fz0 1a10 1fz0 1cN0 1cL0 1cN0 1cL0 1cN0 1cL0 14p0 1lb0 14p0 1nX0 11B0 1nX0 11B0 1nX0 14p0 1lb0 14p0 1lb0 14p0 1nX0 11B0 1nX0 11B0 1nX0 14p0 1lb0 14p0 1lb0 14p0 1lb0 14p0 1nX0 11B0 1nX0 11B0 1nX0 14p0 1lb0 14p0 1lb0 14p0 1nX0 11B0 1nX0 11B0 1nX0 Rd0 1zb0 Op0 1zb0 Op0 1zb0 Rd0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Rd0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Rd0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Rd0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Rd0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0|21e6", "America/Nipigon|EST EDT EWT EPT|50 40 40 40|010123010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010|-25TR0 1in0 Rnb0 3je0 8x40 iv0 19yN0 1cL0 1cN0 1cL0 1cN0 1fz0 1a10 1fz0 1cN0 1cL0 1cN0 1cL0 1cN0 1cL0 1cN0 1cL0 1cN0 1fz0 1a10 1fz0 1cN0 1cL0 1cN0 1cL0 1cN0 1cL0 14p0 1lb0 14p0 1nX0 11B0 1nX0 11B0 1nX0 14p0 1lb0 14p0 1lb0 14p0 1nX0 11B0 1nX0 11B0 1nX0 14p0 1lb0 14p0 1lb0 14p0 1lb0 14p0 1nX0 11B0 1nX0 11B0 1nX0 14p0 1lb0 14p0 1lb0 14p0 1nX0 11B0 1nX0 11B0 1nX0 Rd0 1zb0 Op0 1zb0 Op0 1zb0 Rd0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Rd0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Rd0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Rd0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Rd0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0|16e2", "America/Nome|NST NWT NPT BST BDT YST AKST AKDT|b0 a0 a0 b0 a0 90 90 80|012034343434343434343434343434343456767676767676767676767676767676767676767676767676767676767676767676767676767676767676767676767676767676767676|-17SX0 8wW0 iB0 Qlb0 52O0 1cL0 1cN0 1cL0 1cN0 1fz0 1cN0 1cL0 1cN0 1cL0 s10 1Vz0 LB0 1BX0 1cN0 1fz0 1a10 1fz0 1cN0 1cL0 1cN0 1cL0 1cN0 1cL0 1cN0 1cL0 1cN0 1fz0 1a10 1fz0 cl0 10q0 1cL0 1cN0 1cL0 1cN0 1cL0 14p0 1lb0 14p0 1nX0 11B0 1nX0 11B0 1nX0 14p0 1lb0 14p0 1lb0 14p0 1nX0 11B0 1nX0 11B0 1nX0 14p0 1lb0 14p0 1lb0 14p0 1lb0 14p0 1nX0 11B0 1nX0 11B0 1nX0 14p0 1lb0 14p0 1lb0 14p0 1nX0 11B0 1nX0 11B0 1nX0 Rd0 1zb0 Op0 1zb0 Op0 1zb0 Rd0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Rd0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Rd0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Rd0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Rd0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0|38e2", "America/Noronha|LMT -02 -01|29.E 20 10|0121212121212121212121212121212121212121|-2glxO.k HdKO.k 1cc0 1e10 1bX0 Ezd0 So0 1vA0 Mn0 1BB0 ML0 1BB0 zX0 qe10 xb0 2ep0 nz0 1C10 zX0 1C10 LX0 1C10 Mn0 H210 Rb0 1tB0 IL0 1Fd0 FX0 1EN0 FX0 1HB0 Lz0 nsp0 WL0 1tB0 2L0 2pB0 On0|30e2", "America/North_Dakota/Beulah|MST MDT MWT MPT CST CDT|70 60 60 60 60 50|010102301010101010101010101010101010101010101010101010101010101010101010101010101010101010101014545454545454545454545454545454545454545454545454545454|-261r0 1nX0 11B0 1nX0 SgN0 8x20 ix0 QwN0 1cL0 1cN0 1cL0 1cN0 1cL0 1cN0 1cL0 1cN0 1fz0 1cN0 1cL0 1cN0 1cL0 s10 1Vz0 LB0 1BX0 1cN0 1fz0 1a10 1fz0 1cN0 1cL0 1cN0 1cL0 1cN0 1cL0 1cN0 1cL0 1cN0 1fz0 1a10 1fz0 1cN0 1cL0 1cN0 1cL0 1cN0 1cL0 14p0 1lb0 14p0 1nX0 11B0 1nX0 11B0 1nX0 14p0 1lb0 14p0 1lb0 14p0 1nX0 11B0 1nX0 11B0 1nX0 14p0 1lb0 14p0 1lb0 14p0 1lb0 14p0 1nX0 11B0 1nX0 11B0 1nX0 14p0 1lb0 14p0 1lb0 14p0 1nX0 11B0 1nX0 11B0 1nX0 Rd0 1zb0 Op0 1zb0 Op0 1zb0 Rd0 1zb0 Oo0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Rd0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Rd0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Rd0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Rd0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0", "America/North_Dakota/Center|MST MDT MWT MPT CST CDT|70 60 60 60 60 50|010102301010101010101010101010101010101010101010101010101014545454545454545454545454545454545454545454545454545454545454545454545454545454545454545454|-261r0 1nX0 11B0 1nX0 SgN0 8x20 ix0 QwN0 1cL0 1cN0 1cL0 1cN0 1cL0 1cN0 1cL0 1cN0 1fz0 1cN0 1cL0 1cN0 1cL0 s10 1Vz0 LB0 1BX0 1cN0 1fz0 1a10 1fz0 1cN0 1cL0 1cN0 1cL0 1cN0 1cL0 1cN0 1cL0 1cN0 1fz0 1a10 1fz0 1cN0 1cL0 1cN0 1cL0 1cN0 1cL0 14p0 1lb0 14p0 1nX0 11B0 1nX0 11B0 1nX0 14p0 1lb0 14p0 1lb0 14o0 1nX0 11B0 1nX0 11B0 1nX0 14p0 1lb0 14p0 1lb0 14p0 1lb0 14p0 1nX0 11B0 1nX0 11B0 1nX0 14p0 1lb0 14p0 1lb0 14p0 1nX0 11B0 1nX0 11B0 1nX0 Rd0 1zb0 Op0 1zb0 Op0 1zb0 Rd0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Rd0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Rd0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Rd0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Rd0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0", "America/North_Dakota/New_Salem|MST MDT MWT MPT CST CDT|70 60 60 60 60 50|010102301010101010101010101010101010101010101010101010101010101010101010101010101454545454545454545454545454545454545454545454545454545454545454545454|-261r0 1nX0 11B0 1nX0 SgN0 8x20 ix0 QwN0 1cL0 1cN0 1cL0 1cN0 1cL0 1cN0 1cL0 1cN0 1fz0 1cN0 1cL0 1cN0 1cL0 s10 1Vz0 LB0 1BX0 1cN0 1fz0 1a10 1fz0 1cN0 1cL0 1cN0 1cL0 1cN0 1cL0 1cN0 1cL0 1cN0 1fz0 1a10 1fz0 1cN0 1cL0 1cN0 1cL0 1cN0 1cL0 14p0 1lb0 14p0 1nX0 11B0 1nX0 11B0 1nX0 14p0 1lb0 14p0 1lb0 14p0 1nX0 11B0 1nX0 11B0 1nX0 14p0 1lb0 14p0 1lb0 14p0 1lb0 14p0 1nX0 11B0 1nX0 11B0 1nX0 14p0 1lb0 14p0 1lb0 14o0 1nX0 11B0 1nX0 11B0 1nX0 Rd0 1zb0 Op0 1zb0 Op0 1zb0 Rd0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Rd0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Rd0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Rd0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Rd0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0", "America/Ojinaga|LMT MST CST CDT MDT|6V.E 70 60 50 60|0121212323241414141414141414141414141414141414141414141414141414141414141414141414141414141|-1UQF0 deL0 8lc0 17c0 10M0 1dd0 2zQN0 1lb0 14p0 1lb0 14q0 1lb0 14p0 1nX0 11B0 1nX0 1fB0 WL0 1fB0 1lb0 14p0 1lb0 14p0 1nX0 11B0 1nX0 11B0 1nX0 11B0 1nX0 14p0 1lb0 14p0 1lb0 U10 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Rd0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Rd0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Rd0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Rd0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0|23e3", "America/Pangnirtung|-00 AST AWT APT ADDT ADT EDT EST CST CDT|0 40 30 30 20 30 40 50 60 50|012314151515151515151515151515151515167676767689767676767676767676767676767676767676767676767676767676767676767676767676767|-1XiM0 PnG0 8x50 iu0 LCL0 1fA0 zgO0 1cL0 1cN0 1cL0 1cN0 1fz0 1a10 1fz0 1cN0 1cL0 1cN0 1cL0 1cN0 1cL0 14p0 1lb0 14p0 1nX0 11B0 1nX0 11B0 1nX0 14p0 1lb0 14p0 1lb0 14p0 1nX0 11B0 1nX0 11B0 1o00 14p0 1lb0 14p0 1lb0 14p0 1lb0 14p0 1nX0 11C0 1nX0 11A0 1nX0 14p0 1lb0 14p0 1lb0 14p0 1nX0 11B0 1nX0 11B0 1nX0 Rd0 1zb0 Op0 1zb0 Op0 1zb0 Rd0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Rd0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Rd0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Rd0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Rd0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0|14e2", "America/Paramaribo|LMT PMT PMT -0330 -03|3E.E 3E.Q 3E.A 3u 30|01234|-2nDUj.k Wqo0.c qanX.I 1yVXN.o|24e4", "America/Phoenix|MST MDT MWT|70 60 60|01010202010|-261r0 1nX0 11B0 1nX0 SgN0 4Al1 Ap0 1db0 SWqX 1cL0|42e5", "America/Port-au-Prince|PPMT EST EDT|4N 50 40|01212121212121212121212121212121212121212121212121212121212121212121212121212121212121|-28RHb 2FnMb 19X0 1cN0 1cL0 1cN0 1cL0 1cN0 1cL0 1cN0 1cL0 14q0 1o00 11A0 1o00 11A0 1o00 14o0 1lc0 14o0 1lc0 14o0 1o00 11A0 1o00 11A0 1o00 14o0 1lc0 14o0 1lc0 i6n0 1nX0 11B0 1nX0 d430 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 3iN0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Rd0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Rd0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Rd0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0|23e5", "America/Rio_Branco|LMT -05 -04|4v.c 50 40|01212121212121212121212121212121|-2glvs.M HdLs.M 1cc0 1e10 1bX0 Ezd0 So0 1vA0 Mn0 1BB0 ML0 1BB0 zX0 qe10 xb0 2ep0 nz0 1C10 zX0 1C10 LX0 1C10 Mn0 H210 Rb0 1tB0 IL0 1Fd0 FX0 NBd0 d5X0|31e4", "America/Porto_Velho|LMT -04 -03|4f.A 40 30|012121212121212121212121212121|-2glvI.o HdKI.o 1cc0 1e10 1bX0 Ezd0 So0 1vA0 Mn0 1BB0 ML0 1BB0 zX0 qe10 xb0 2ep0 nz0 1C10 zX0 1C10 LX0 1C10 Mn0 H210 Rb0 1tB0 IL0 1Fd0 FX0|37e4", "America/Puerto_Rico|AST AWT APT|40 30 30|0120|-17lU0 7XT0 iu0|24e5", "America/Punta_Arenas|SMT -05 -04 -03|4G.K 50 40 30|0102021212121212121232323232323232323232323232323232323232323232323232323232323232323232323232323232323232323232323|-2q2jh.e fJAh.e 5knG.K 1Vzh.e jRAG.K 1pbh.e 11d0 1oL0 11d0 1oL0 11d0 1oL0 11d0 1pb0 11d0 nHX0 op0 blz0 ko0 Qeo0 WL0 1zd0 On0 1ip0 11z0 1o10 11z0 1qN0 WL0 1ld0 14n0 1qN0 WL0 1qN0 11z0 1o10 11z0 1o10 11z0 1qN0 WL0 1qN0 WL0 1qN0 11z0 1o10 11z0 1o10 11z0 1o10 11z0 1qN0 WL0 1qN0 WL0 1qN0 1cL0 1cN0 11z0 1o10 11z0 1qN0 WL0 1fB0 19X0 1qN0 11z0 1o10 11z0 1o10 11z0 1o10 11z0 1qN0 WL0 1qN0 17b0 1ip0 11z0 1ip0 1fz0 1fB0 11z0 1qN0 WL0 1qN0 WL0 1qN0 WL0 1qN0 11z0 1o10 11z0 1o10 11z0 1qN0 WL0 1qN0 17b0 1ip0 11z0 1o10 19X0 1fB0 1nX0 G10 1EL0 Op0 1zb0 Rd0 1wn0 Rd0 46n0 Ap0", "America/Rainy_River|CST CDT CWT CPT|60 50 50 50|010123010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010|-25TQ0 1in0 Rnb0 3je0 8x30 iw0 19yN0 1cL0 1cN0 1cL0 1cN0 1fz0 1a10 1fz0 1cN0 1cL0 1cN0 1cL0 1cN0 1cL0 1cN0 1cL0 1cN0 1fz0 1a10 1fz0 1cN0 1cL0 1cN0 1cL0 1cN0 1cL0 14p0 1lb0 14p0 1nX0 11B0 1nX0 11B0 1nX0 14p0 1lb0 14p0 1lb0 14p0 1nX0 11B0 1nX0 11B0 1nX0 14p0 1lb0 14p0 1lb0 14p0 1lb0 14p0 1nX0 11B0 1nX0 11B0 1nX0 14p0 1lb0 14p0 1lb0 14p0 1nX0 11B0 1nX0 11B0 1nX0 Rd0 1zb0 Op0 1zb0 Op0 1zb0 Rd0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Rd0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Rd0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Rd0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Rd0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0|842", "America/Rankin_Inlet|-00 CST CDDT CDT EST|0 60 40 50 50|012131313131313131313131313131313131313131313431313131313131313131313131313131313131313131313131313131313131313131313131|-vDc0 keu0 1fA0 zgO0 1cL0 1cN0 1cL0 1cN0 1fz0 1a10 1fz0 1cN0 1cL0 1cN0 1cL0 1cN0 1cL0 14p0 1lb0 14p0 1nX0 11B0 1nX0 11B0 1nX0 14p0 1lb0 14p0 1lb0 14p0 1nX0 11B0 1nX0 11B0 1nX0 14p0 1lb0 14p0 1lb0 14p0 1lb0 14p0 1nX0 11B0 1nX0 11B0 1nX0 14p0 1lb0 14p0 1lb0 14p0 1nX0 11B0 1nX0 11B0 1nX0 Rd0 1zb0 Op0 1zb0 Op0 1zb0 Rd0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Rd0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Rd0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Rd0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Rd0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0|26e2", "America/Recife|LMT -03 -02|2j.A 30 20|0121212121212121212121212121212121212121|-2glxE.o HdLE.o 1cc0 1e10 1bX0 Ezd0 So0 1vA0 Mn0 1BB0 ML0 1BB0 zX0 qe10 xb0 2ep0 nz0 1C10 zX0 1C10 LX0 1C10 Mn0 H210 Rb0 1tB0 IL0 1Fd0 FX0 1EN0 FX0 1HB0 Lz0 nsp0 WL0 1tB0 2L0 2pB0 On0|33e5", "America/Regina|LMT MST MDT MWT MPT CST|6W.A 70 60 60 60 60|012121212121212121212121341212121212121212121212121215|-2AD51.o uHe1.o 1in0 s2L0 11z0 1o10 11z0 1o10 11z0 1qN0 WL0 1qN0 11z0 66N0 1cL0 1cN0 19X0 1fB0 1cL0 1fB0 1cL0 1cN0 1cL0 M30 8x20 ix0 1ip0 1cL0 1ip0 11z0 1o10 11z0 1o10 11z0 1qN0 WL0 1qN0 11z0 1o10 11z0 1o10 11z0 1o10 11z0 1o10 11z0 1qN0 11z0 1o10 11z0 3NB0 1cL0 1cN0|19e4", "America/Resolute|-00 CST CDDT CDT EST|0 60 40 50 50|012131313131313131313131313131313131313131313431313131313431313131313131313131313131313131313131313131313131313131313131|-SnA0 GWS0 1fA0 zgO0 1cL0 1cN0 1cL0 1cN0 1fz0 1a10 1fz0 1cN0 1cL0 1cN0 1cL0 1cN0 1cL0 14p0 1lb0 14p0 1nX0 11B0 1nX0 11B0 1nX0 14p0 1lb0 14p0 1lb0 14p0 1nX0 11B0 1nX0 11B0 1nX0 14p0 1lb0 14p0 1lb0 14p0 1lb0 14p0 1nX0 11B0 1nX0 11B0 1nX0 14p0 1lb0 14p0 1lb0 14p0 1nX0 11B0 1nX0 11B0 1nX0 Rd0 1zb0 Op0 1zb0 Op0 1zb0 Rd0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Rd0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Rd0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Rd0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Rd0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0|229", "America/Santarem|LMT -04 -03|3C.M 40 30|0121212121212121212121212121212|-2glwl.c HdLl.c 1cc0 1e10 1bX0 Ezd0 So0 1vA0 Mn0 1BB0 ML0 1BB0 zX0 qe10 xb0 2ep0 nz0 1C10 zX0 1C10 LX0 1C10 Mn0 H210 Rb0 1tB0 IL0 1Fd0 FX0 NBd0|21e4", "America/Santiago|SMT -05 -04 -03|4G.K 50 40 30|010202121212121212321232323232323232323232323232323232323232323232323232323232323232323232323232323232323232323232323232323232323232323232323232323232323232323|-2q2jh.e fJAh.e 5knG.K 1Vzh.e jRAG.K 1pbh.e 11d0 1oL0 11d0 1oL0 11d0 1oL0 11d0 1pb0 11d0 nHX0 op0 9Bz0 jb0 1oN0 ko0 Qeo0 WL0 1zd0 On0 1ip0 11z0 1o10 11z0 1qN0 WL0 1ld0 14n0 1qN0 WL0 1qN0 11z0 1o10 11z0 1o10 11z0 1qN0 WL0 1qN0 WL0 1qN0 11z0 1o10 11z0 1o10 11z0 1o10 11z0 1qN0 WL0 1qN0 WL0 1qN0 1cL0 1cN0 11z0 1o10 11z0 1qN0 WL0 1fB0 19X0 1qN0 11z0 1o10 11z0 1o10 11z0 1o10 11z0 1qN0 WL0 1qN0 17b0 1ip0 11z0 1ip0 1fz0 1fB0 11z0 1qN0 WL0 1qN0 WL0 1qN0 WL0 1qN0 11z0 1o10 11z0 1o10 11z0 1qN0 WL0 1qN0 17b0 1ip0 11z0 1o10 19X0 1fB0 1nX0 G10 1EL0 Op0 1zb0 Rd0 1wn0 Rd0 46n0 Ap0 1Nb0 Ap0 1Nb0 Ap0 1Nb0 Ap0 1Nb0 Ap0 1Nb0 Dd0 1Nb0 Ap0 1Nb0 Ap0 1Nb0 Ap0 1Nb0 Ap0 1Nb0 Ap0 1Nb0 Dd0 1Nb0 Ap0 1Nb0 Ap0 1Nb0 Ap0 1Nb0 Ap0 1Nb0 Dd0 1Nb0 Ap0 1Nb0 Ap0 1Nb0 Ap0 1Nb0 Ap0 1Nb0 Ap0|62e5", "America/Santo_Domingo|SDMT EST EDT -0430 AST|4E 50 40 4u 40|01213131313131414|-1ttjk 1lJMk Mn0 6sp0 Lbu 1Cou yLu 1RAu wLu 1QMu xzu 1Q0u xXu 1PAu 13jB0 e00|29e5", "America/Sao_Paulo|LMT -03 -02|36.s 30 20|012121212121212121212121212121212121212121212121212121212121212121212121212121212121212121212121212121212121212121212121212121212|-2glwR.w HdKR.w 1cc0 1e10 1bX0 Ezd0 So0 1vA0 Mn0 1BB0 ML0 1BB0 zX0 pTd0 PX0 2ep0 nz0 1C10 zX0 1C10 LX0 1C10 Mn0 H210 Rb0 1tB0 IL0 1Fd0 FX0 1EN0 FX0 1HB0 Lz0 1EN0 Lz0 1C10 IL0 1HB0 Db0 1HB0 On0 1zd0 On0 1zd0 Lz0 1zd0 Rb0 1wN0 Wn0 1tB0 Rb0 1tB0 WL0 1tB0 Rb0 1zd0 On0 1HB0 FX0 1C10 Lz0 1Ip0 HX0 1zd0 On0 1HB0 IL0 1wp0 On0 1C10 Lz0 1C10 On0 1zd0 On0 1zd0 Rb0 1zd0 Lz0 1C10 Lz0 1C10 On0 1zd0 On0 1zd0 On0 1zd0 On0 1C10 Lz0 1C10 Lz0 1C10 On0 1zd0 On0 1zd0 Rb0 1wp0 On0 1C10 Lz0 1C10 On0 1zd0 On0 1zd0 On0 1zd0 On0 1C10 Lz0 1C10 Lz0 1C10 Lz0 1C10 On0 1zd0 Rb0 1wp0 On0 1C10 Lz0 1C10 On0 1zd0|20e6", "America/Scoresbysund|LMT -02 -01 +00|1r.Q 20 10 0|0121323232323232323232323232323232323232323232323232323232323232323232323232323232323232323232323232323232323232323232|-2a5Ww.8 2z5ew.8 1a00 1cK0 1cL0 1cM0 1cM0 1cM0 1cM0 1cM0 1fA0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1fA0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1fA0 1o00 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00|452", "America/Sitka|PST PWT PPT PDT YST AKST AKDT|80 70 70 70 90 90 80|01203030303030303030303030303030345656565656565656565656565656565656565656565656565656565656565656565656565656565656565656565656565656565656565|-17T20 8x10 iy0 Vo10 1cL0 1cN0 1cL0 1cN0 1fz0 1cN0 1cL0 1cN0 1cL0 s10 1Vz0 LB0 1BX0 1cN0 1fz0 1a10 1fz0 1cN0 1cL0 1cN0 1cL0 1cN0 1cL0 1cN0 1cL0 1cN0 1fz0 1a10 1fz0 co0 10q0 1cL0 1cN0 1cL0 1cN0 1cL0 14p0 1lb0 14p0 1nX0 11B0 1nX0 11B0 1nX0 14p0 1lb0 14p0 1lb0 14p0 1nX0 11B0 1nX0 11B0 1nX0 14p0 1lb0 14p0 1lb0 14p0 1lb0 14p0 1nX0 11B0 1nX0 11B0 1nX0 14p0 1lb0 14p0 1lb0 14p0 1nX0 11B0 1nX0 11B0 1nX0 Rd0 1zb0 Op0 1zb0 Op0 1zb0 Rd0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Rd0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Rd0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Rd0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Rd0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0|90e2", "America/St_Johns|NST NDT NST NDT NWT NPT NDDT|3u.Q 2u.Q 3u 2u 2u 2u 1u|01010101010101010101010101010101010102323232323232324523232323232323232323232323232323232323232323232323232323232323232323232323232323232326232323232323232323232323232323232323232323232323232323232323232323232323232323232323232323232323232|-28oit.8 14L0 1nB0 1in0 1gm0 Dz0 1JB0 1cL0 1cN0 1cL0 1fB0 19X0 1fB0 19X0 1fB0 19X0 1fB0 19X0 1fB0 1cL0 1cN0 1cL0 1fB0 19X0 1fB0 19X0 1fB0 19X0 1fB0 19X0 1fB0 1cL0 1fB0 19X0 1fB0 19X0 10O0 eKX.8 19X0 1iq0 WL0 1qN0 WL0 1qN0 WL0 1tB0 TX0 1tB0 WL0 1qN0 WL0 1qN0 7UHu itu 1tB0 WL0 1qN0 WL0 1qN0 WL0 1qN0 WL0 1tB0 WL0 1ld0 11z0 1o10 11z0 1o10 11z0 1o10 11z0 1o10 11z0 1qN0 11z0 1o10 11z0 1o10 11z0 1o10 11z0 1o10 1fz0 1cN0 1cL0 1cN0 1cL0 1cN0 1cL0 1cN0 1cL0 1cN0 1fz0 1a10 1fz0 1cN0 1cL0 1cN0 1cL0 1cN0 1cL0 1cN0 1cL0 1cN0 1fz0 1cN0 1cL0 1cN0 1cL0 1cN0 1cL0 1cN0 1cL0 1cN0 1fz0 1a10 1fz0 1cN0 1cL0 1cN0 1cL0 1cN0 1cL0 1cN0 1cL0 1cN0 1fz0 1a10 1fz0 1cN0 1cL0 1cN0 1cL0 1cN0 1cL0 14n1 1lb0 14p0 1nW0 11C0 1nX0 11B0 1nX0 14p0 1lb0 14p0 1lb0 14p0 1nX0 11B0 1nX0 11B0 1nX0 14p0 1lb0 14p0 1lb0 14p0 1lb0 14p0 1nX0 11B0 1nX0 11B0 1nX0 14p0 1lb0 14p0 1lb0 14p0 1nX0 11B0 1nX0 11B0 1nX0 Rd0 1zb0 Op0 1zb0 Op0 1zb0 Rd0 1zb0 Op0 1zcX Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Rd0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Rd0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Rd0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Rd0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0|11e4", "America/Swift_Current|LMT MST MDT MWT MPT CST|7b.k 70 60 60 60 60|012134121212121212121215|-2AD4M.E uHdM.E 1in0 UGp0 8x20 ix0 1o10 17b0 1ip0 11z0 1o10 11z0 1o10 11z0 isN0 1cL0 3Cp0 1cL0 1cN0 11z0 1qN0 WL0 pMp0|16e3", "America/Tegucigalpa|LMT CST CDT|5M.Q 60 50|01212121|-1WGGb.8 2ETcb.8 WL0 1qN0 WL0 GRd0 AL0|11e5", "America/Thule|LMT AST ADT|4z.8 40 30|012121212121212121212121212121212121212121212121212121212121212121212121212121212121212121212121|-2a5To.Q 31NBo.Q 1cL0 1cN0 1cL0 1fB0 1nX0 11B0 1nX0 11B0 1nX0 14p0 1lb0 14p0 1lb0 14p0 1lb0 14p0 1nX0 11B0 1nX0 11B0 1nX0 14p0 1lb0 14p0 1lb0 14p0 1nX0 11B0 1nX0 11B0 1nX0 Rd0 1zb0 Op0 1zb0 Op0 1zb0 Rd0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Rd0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Rd0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Rd0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Rd0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0|656", "America/Thunder_Bay|CST EST EWT EPT EDT|60 50 40 40 40|0123141414141414141414141414141414141414141414141414141414141414141414141414141414141414141414141414141414141414141414141414141414141414141|-2q5S0 1iaN0 8x40 iv0 XNB0 1cL0 1cN0 1fz0 1cN0 1cL0 3Cp0 1cL0 1cN0 1cL0 1cN0 1fz0 1a10 1fz0 1cN0 1cL0 1cN0 1cL0 1cN0 1cL0 1cN0 1cL0 1cN0 1fz0 1a10 1fz0 1cN0 1cL0 1cN0 1cL0 1cN0 1cL0 14p0 1lb0 14p0 1nX0 11B0 1nX0 11B0 1nX0 14p0 1lb0 14p0 1lb0 14p0 1nX0 11B0 1nX0 11B0 1nX0 14p0 1lb0 14p0 1lb0 14p0 1lb0 14p0 1nX0 11B0 1nX0 11B0 1nX0 14p0 1lb0 14p0 1lb0 14p0 1nX0 11B0 1nX0 11B0 1nX0 Rd0 1zb0 Op0 1zb0 Op0 1zb0 Rd0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Rd0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Rd0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Rd0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Rd0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0|11e4", "America/Vancouver|PST PDT PWT PPT|80 70 70 70|0102301010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010|-25TO0 1in0 UGp0 8x10 iy0 1o10 17b0 1ip0 11z0 1o10 11z0 1o10 11z0 1qN0 WL0 1qN0 11z0 1o10 11z0 1o10 11z0 1o10 11z0 1o10 11z0 1qN0 11z0 1o10 11z0 1o10 11z0 1o10 11z0 1o10 11z0 1qN0 WL0 1qN0 1cL0 1cN0 1cL0 1cN0 1cL0 1cN0 1fz0 1a10 1fz0 1cN0 1cL0 1cN0 1cL0 1cN0 1cL0 1cN0 1cL0 1cN0 1fz0 1cN0 1cL0 1cN0 1cL0 1cN0 1cL0 1cN0 1cL0 1cN0 1fz0 1a10 1fz0 1cN0 1cL0 1cN0 1cL0 1cN0 1cL0 1cN0 1cL0 1cN0 1fz0 1a10 1fz0 1cN0 1cL0 1cN0 1cL0 1cN0 1cL0 14p0 1lb0 14p0 1nX0 11B0 1nX0 11B0 1nX0 14p0 1lb0 14p0 1lb0 14p0 1nX0 11B0 1nX0 11B0 1nX0 14p0 1lb0 14p0 1lb0 14p0 1lb0 14p0 1nX0 11B0 1nX0 11B0 1nX0 14p0 1lb0 14p0 1lb0 14p0 1nX0 11B0 1nX0 11B0 1nX0 Rd0 1zb0 Op0 1zb0 Op0 1zb0 Rd0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Rd0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Rd0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Rd0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Rd0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0|23e5", "America/Whitehorse|YST YDT YWT YPT YDDT PST PDT|90 80 80 80 70 80 70|0101023040565656565656565656565656565656565656565656565656565656565656565656565656565656565656565656565656565656565656565656565|-25TN0 1in0 1o10 13V0 Ser0 8x00 iz0 LCL0 1fA0 3NA0 vrd0 1cL0 1cN0 1cL0 1cN0 1fz0 1a10 1fz0 1cN0 1cL0 1cN0 1cL0 1cN0 1cL0 14p0 1lb0 14p0 1nX0 11B0 1nX0 11B0 1nX0 14p0 1lb0 14p0 1lb0 14p0 1nX0 11B0 1nX0 11B0 1nX0 14p0 1lb0 14p0 1lb0 14p0 1lb0 14p0 1nX0 11B0 1nX0 11B0 1nX0 14p0 1lb0 14p0 1lb0 14p0 1nX0 11B0 1nX0 11B0 1nX0 Rd0 1zb0 Op0 1zb0 Op0 1zb0 Rd0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Rd0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Rd0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Rd0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Rd0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0|23e3", "America/Winnipeg|CST CDT CWT CPT|60 50 50 50|010101023010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010|-2aIi0 WL0 3ND0 1in0 Jap0 Rb0 aCN0 8x30 iw0 1tB0 11z0 1ip0 11z0 1o10 11z0 1o10 11z0 1rd0 10L0 1op0 11z0 1o10 11z0 1o10 11z0 1o10 11z0 1o10 11z0 1qN0 11z0 1o10 11z0 1o10 11z0 1o10 1cL0 1cN0 11z0 6i10 WL0 6i10 1fA0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1fA0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1fA0 1a00 1fA0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1fA0 1a00 1fA0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 14o0 1lc0 14o0 1o00 11A0 1o00 11A0 1o00 14o0 1lc0 14o0 1lc0 14o0 1o00 11A0 1o00 11A0 1o00 14o0 1lc0 14o0 1lc0 14o0 1lc0 14o0 1o00 11A0 1o00 11A0 1o00 14o0 1lc0 14o0 1lc0 14o0 1o00 11A0 1o00 11A0 1nX0 Rd0 1zb0 Op0 1zb0 Op0 1zb0 Rd0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Rd0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Rd0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Rd0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Rd0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0|66e4", "America/Yakutat|YST YWT YPT YDT AKST AKDT|90 80 80 80 90 80|01203030303030303030303030303030304545454545454545454545454545454545454545454545454545454545454545454545454545454545454545454545454545454545454|-17T10 8x00 iz0 Vo10 1cL0 1cN0 1cL0 1cN0 1fz0 1cN0 1cL0 1cN0 1cL0 s10 1Vz0 LB0 1BX0 1cN0 1fz0 1a10 1fz0 1cN0 1cL0 1cN0 1cL0 1cN0 1cL0 1cN0 1cL0 1cN0 1fz0 1a10 1fz0 cn0 10q0 1cL0 1cN0 1cL0 1cN0 1cL0 14p0 1lb0 14p0 1nX0 11B0 1nX0 11B0 1nX0 14p0 1lb0 14p0 1lb0 14p0 1nX0 11B0 1nX0 11B0 1nX0 14p0 1lb0 14p0 1lb0 14p0 1lb0 14p0 1nX0 11B0 1nX0 11B0 1nX0 14p0 1lb0 14p0 1lb0 14p0 1nX0 11B0 1nX0 11B0 1nX0 Rd0 1zb0 Op0 1zb0 Op0 1zb0 Rd0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Rd0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Rd0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Rd0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Rd0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0|642", "America/Yellowknife|-00 MST MWT MPT MDDT MDT|0 70 60 60 50 60|012314151515151515151515151515151515151515151515151515151515151515151515151515151515151515151515151515151515151515151515151|-1pdA0 hix0 8x20 ix0 LCL0 1fA0 zgO0 1cL0 1cN0 1cL0 1cN0 1fz0 1a10 1fz0 1cN0 1cL0 1cN0 1cL0 1cN0 1cL0 14p0 1lb0 14p0 1nX0 11B0 1nX0 11B0 1nX0 14p0 1lb0 14p0 1lb0 14p0 1nX0 11B0 1nX0 11B0 1nX0 14p0 1lb0 14p0 1lb0 14p0 1lb0 14p0 1nX0 11B0 1nX0 11B0 1nX0 14p0 1lb0 14p0 1lb0 14p0 1nX0 11B0 1nX0 11B0 1nX0 Rd0 1zb0 Op0 1zb0 Op0 1zb0 Rd0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Rd0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Rd0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Rd0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Rd0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0|19e3", "Antarctica/Casey|-00 +08 +11|0 -80 -b0|0121212|-2q00 1DjS0 T90 40P0 KL0 blz0|10", "Antarctica/Davis|-00 +07 +05|0 -70 -50|01012121|-vyo0 iXt0 alj0 1D7v0 VB0 3Wn0 KN0|70", "Antarctica/DumontDUrville|-00 +10|0 -a0|0101|-U0o0 cfq0 bFm0|80", "Antarctica/Macquarie|AEST AEDT -00 +11|-a0 -b0 0 -b0|0102010101010101010101010101010101010101010101010101010101010101010101010101010101010101013|-29E80 19X0 4SL0 1ayy0 Lvs0 1cM0 1o00 Rc0 1wo0 Rc0 1wo0 U00 1wo0 LA0 1C00 Oo0 1zc0 Oo0 1zc0 Oo0 1zc0 Rc0 1zc0 Oo0 1zc0 Oo0 1zc0 Oo0 1zc0 Oo0 1zc0 Oo0 1zc0 11A0 1qM0 WM0 1qM0 Oo0 1zc0 Oo0 1zc0 Oo0 1wo0 WM0 1tA0 WM0 1tA0 U00 1tA0 U00 1tA0 11A0 1fA0 1a00 1fA0 1a00 1fA0 1a00 1fA0 1a00 1fA0 1cM0 1fA0 1a00 1fA0 1a00 1fA0 1a00 1fA0 1a00 11A0 1o00 1io0 1a00 1fA0 1a00 1fA0 1a00 1fA0 1a00 1fA0 1cM0 1cM0 1a00 1io0 1cM0 1cM0 1cM0 1cM0 1cM0|1", "Antarctica/Mawson|-00 +06 +05|0 -60 -50|012|-CEo0 2fyk0|60", "Pacific/Auckland|NZMT NZST NZST NZDT|-bu -cu -c0 -d0|01020202020202020202020202023232323232323232323232323232323232323232323232323232323232323232323232323232323232323232323232323232323232323232323232323232323|-1GCVu Lz0 1tB0 11zu 1o0u 11zu 1o0u 11zu 1o0u 14nu 1lcu 14nu 1lcu 1lbu 11Au 1nXu 11Au 1nXu 11Au 1nXu 11Au 1nXu 11Au 1qLu WMu 1qLu 11Au 1n1bu IM0 1C00 Rc0 1zc0 Oo0 1zc0 Oo0 1zc0 Oo0 1zc0 Oo0 1zc0 Oo0 1zc0 Rc0 1zc0 Oo0 1zc0 Oo0 1zc0 Oo0 1zc0 Oo0 1zc0 Oo0 1zc0 Rc0 1zc0 Oo0 1qM0 14o0 1lc0 14o0 1lc0 14o0 1lc0 17c0 1io0 17c0 1io0 17c0 1io0 17c0 1lc0 14o0 1lc0 14o0 1lc0 17c0 1io0 17c0 1io0 17c0 1lc0 14o0 1lc0 14o0 1lc0 17c0 1io0 17c0 1io0 17c0 1io0 17c0 1io0 1fA0 1a00 1fA0 1a00 1fA0 1a00 1fA0 1a00 1fA0 1cM0 1fA0 1a00 1fA0 1a00 1fA0 1a00 1fA0 1a00 1fA0 1a00 1fA0 1cM0 1fA0 1a00 1fA0 1a00 1fA0 1a00 1fA0 1a00 1fA0 1a00 1io0 1a00 1fA0 1a00 1fA0 1a00 1fA0 1a00 1fA0 1a00 1fA0 1cM0 1fA0 1a00 1fA0 1a00 1fA0 1a00 1fA0 1a00 1fA0 1a00 1fA0 1cM0 1fA0 1a00 1fA0 1a00|14e5", "Antarctica/Palmer|-00 -03 -04 -02|0 30 40 20|0121212121213121212121212121212121212121212121212121212121212121212121212121212121|-cao0 nD0 1vd0 SL0 1vd0 17z0 1cN0 1fz0 1cN0 1cL0 1cN0 asn0 Db0 jsN0 14N0 11z0 1o10 11z0 1qN0 WL0 1qN0 WL0 1qN0 1cL0 1cN0 11z0 1o10 11z0 1qN0 WL0 1fB0 19X0 1qN0 11z0 1o10 11z0 1o10 11z0 1o10 11z0 1qN0 WL0 1qN0 17b0 1ip0 11z0 1ip0 1fz0 1fB0 11z0 1qN0 WL0 1qN0 WL0 1qN0 WL0 1qN0 11z0 1o10 11z0 1o10 11z0 1qN0 WL0 1qN0 17b0 1ip0 11z0 1o10 19X0 1fB0 1nX0 G10 1EL0 Op0 1zb0 Rd0 1wn0 Rd0 46n0 Ap0|40", "Antarctica/Rothera|-00 -03|0 30|01|gOo0|130", "Antarctica/Syowa|-00 +03|0 -30|01|-vs00|20", "Antarctica/Troll|-00 +00 +02|0 0 -20|01212121212121212121212121212121212121212121212121212121212121212121|1puo0 hd0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00|40", "Antarctica/Vostok|-00 +06|0 -60|01|-tjA0|25", "Europe/Oslo|CET CEST|-10 -20|010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010|-2awM0 Qm0 W6o0 5pf0 WM0 1fA0 1cM0 1cM0 1cM0 1cM0 wJc0 1fA0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1fA0 1qM0 WM0 zpc0 1a00 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1fA0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1fA0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1fA0 1o00 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00|62e4", "Asia/Riyadh|LMT +03|-36.Q -30|01|-TvD6.Q|57e5", "Asia/Almaty|LMT +05 +06 +07|-57.M -50 -60 -70|012323232323232323232321232323232323232323232323232|-1Pc57.M eUo7.M 23CL0 1db0 1cN0 1db0 1cN0 1db0 1dd0 1cO0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1fA0 2pB0 IM0 rX0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1fA0 1o00 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00 11A0 1qM0|15e5", "Asia/Amman|LMT EET EEST|-2n.I -20 -30|0121212121212121212121212121212121212121212121212121212121212121212121212121212121212121212121212121212121212121212121|-1yW2n.I 1HiMn.I KL0 1oN0 11b0 1oN0 11b0 1pd0 1dz0 1cp0 11b0 1op0 11b0 fO10 1db0 1e10 1cL0 1cN0 1cL0 1cN0 1fz0 1pd0 10n0 1ld0 14n0 1hB0 15b0 1ip0 19X0 1cN0 1cL0 1cN0 17b0 1ld0 14o0 1lc0 17c0 1io0 17c0 1io0 17c0 1So0 y00 1fc0 1dc0 1co0 1dc0 1cM0 1cM0 1cM0 1o00 11A0 1lc0 17c0 1cM0 1cM0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 4bX0 Dd0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0|25e5", "Asia/Anadyr|LMT +12 +13 +14 +11|-bN.U -c0 -d0 -e0 -b0|01232121212121212121214121212121212121212121212121212121212141|-1PcbN.U eUnN.U 23CL0 1db0 2q10 1cN0 1db0 1dd0 1cO0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1fA0 2pB0 IM0 rX0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1fA0 1o00 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00 2sp0 WM0|13e3", "Asia/Aqtau|LMT +04 +05 +06|-3l.4 -40 -50 -60|012323232323232323232123232312121212121212121212|-1Pc3l.4 eUnl.4 24PX0 2pX0 1cN0 1db0 1dd0 1cO0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1fA0 2pB0 IM0 rX0 1cM0 1cM0 1cM0 1cM0 1cM0 1cN0 1cM0 1fA0 1o00 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00 11A0|15e4", "Asia/Aqtobe|LMT +04 +05 +06|-3M.E -40 -50 -60|0123232323232323232321232323232323232323232323232|-1Pc3M.E eUnM.E 23CL0 3Db0 1cN0 1db0 1dd0 1cO0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1fA0 2pB0 IM0 rX0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1fA0 1o00 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00 11A0 1qM0|27e4", "Asia/Ashgabat|LMT +04 +05 +06|-3R.w -40 -50 -60|0123232323232323232323212|-1Pc3R.w eUnR.w 23CL0 1db0 1cN0 1db0 1cN0 1db0 1dd0 1cO0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1fA0 2pB0 IM0|41e4", "Asia/Atyrau|LMT +03 +05 +06 +04|-3r.I -30 -50 -60 -40|01232323232323232323242323232323232324242424242|-1Pc3r.I eUor.I 24PW0 2pX0 1cN0 1db0 1dd0 1cO0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1fA0 2pB0 IM0 rX0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1fA0 1o00 11A0 1o00 11A0 1o00 2sp0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00 11A0", "Asia/Baghdad|BMT +03 +04|-2V.A -30 -40|012121212121212121212121212121212121212121212121212121|-26BeV.A 2ACnV.A 11b0 1cp0 1dz0 1dd0 1db0 1cN0 1cp0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1fA0 1de0 1dc0 1dc0 1dc0 1cM0 1dc0 1cM0 1dc0 1cM0 1dc0 1dc0 1dc0 1cM0 1dc0 1cM0 1dc0 1cM0 1dc0 1dc0 1dc0 1cM0 1dc0 1cM0 1dc0 1cM0 1dc0 1dc0 1dc0 1cM0 1dc0 1cM0 1dc0 1cM0 1dc0|66e5", "Asia/Qatar|LMT +04 +03|-3q.8 -40 -30|012|-21Jfq.8 27BXq.8|96e4", "Asia/Baku|LMT +03 +04 +05|-3j.o -30 -40 -50|01232323232323232323232123232323232323232323232323232323232323232|-1Pc3j.o 1jUoj.o WCL0 1db0 1cN0 1db0 1cN0 1db0 1dd0 1cO0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1fA0 2pB0 1cM0 9Je0 1o00 11z0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00 11A0 1o00|27e5", "Asia/Bangkok|BMT +07|-6G.4 -70|01|-218SG.4|15e6", "Asia/Barnaul|LMT +06 +07 +08|-5z -60 -70 -80|0123232323232323232323212323232321212121212121212121212121212121212|-21S5z pCnz 23CL0 1db0 1cN0 1db0 1cN0 1db0 1dd0 1cO0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1fA0 2pB0 IM0 rX0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 p90 LE0 1fA0 1o00 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 8Hz0 3rd0", "Asia/Beirut|EET EEST|-20 -30|010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010|-21aq0 1on0 1410 1db0 19B0 1in0 1ip0 WL0 1lQp0 11b0 1oN0 11b0 1oN0 11b0 1pd0 11b0 1oN0 11b0 q6N0 En0 1oN0 11b0 1oN0 11b0 1oN0 11b0 1pd0 11b0 1oN0 11b0 1op0 11b0 dA10 17b0 1iN0 17b0 1iN0 17b0 1iN0 17b0 1vB0 SL0 1mp0 13z0 1iN0 17b0 1iN0 17b0 1jd0 12n0 1a10 1cL0 1cN0 1cL0 1cN0 1cL0 1fB0 1cL0 1cN0 1cL0 1cN0 1cL0 1cN0 1qL0 WN0 1qL0 WN0 1qL0 11B0 1nX0 11B0 1nX0 11B0 1qL0 WN0 1qL0 WN0 1qL0 WN0 1qL0 11B0 1nX0 11B0 1nX0 11B0 1qL0 WN0 1qL0 WN0 1qL0 11B0 1nX0 11B0 1nX0 11B0 1nX0 11B0 1qL0 WN0 1qL0 WN0 1qL0 11B0 1nX0 11B0 1nX0 11B0 1qL0 WN0 1qL0 WN0 1qL0 11B0 1nX0 11B0 1nX0 11B0 1nX0 11B0 1qL0 WN0 1qL0 WN0 1qL0 11B0 1nX0 11B0 1nX0 11B0 1qL0 WN0 1qL0 WN0 1qL0 WN0 1qL0 11B0 1nX0 11B0 1nX0|22e5", "Asia/Bishkek|LMT +05 +06 +07|-4W.o -50 -60 -70|012323232323232323232321212121212121212121212121212|-1Pc4W.o eUnW.o 23CL0 1db0 1cN0 1db0 1cN0 1db0 1dd0 1cO0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1fA0 2e00 1tX0 17b0 1ip0 17b0 1ip0 17b0 1ip0 17b0 1ip0 19X0 1cPu 1nX0 11B0 1nX0 11B0 1qL0 WN0 1qL0 WN0 1qL0 11B0 1nX0 11B0 1nX0 11B0 1qL0 WN0|87e4", "Asia/Brunei|LMT +0730 +08|-7D.E -7u -80|012|-1KITD.E gDc9.E|42e4", "Asia/Kolkata|HMT +0630 IST|-5R.k -6u -5u|01212|-18LFR.k 1unn.k HB0 7zX0|15e6", "Asia/Chita|LMT +08 +09 +10|-7x.Q -80 -90 -a0|012323232323232323232321232323232323232323232323232323232323232312|-21Q7x.Q pAnx.Q 23CL0 1db0 1cN0 1db0 1cN0 1db0 1dd0 1cO0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1fA0 2pB0 IM0 rX0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1fA0 1o00 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 8Hz0 3re0|33e4", "Asia/Choibalsan|LMT +07 +08 +10 +09|-7C -70 -80 -a0 -90|0123434343434343434343434343434343434343434343424242|-2APHC 2UkoC cKn0 1da0 1dd0 1cL0 1cN0 1cL0 1cN0 1cL0 1cN0 1cL0 1cN0 1cL0 1cN0 1cL0 1cN0 1fz0 1cN0 1cL0 1cN0 1cL0 1cN0 1cL0 1cN0 1cL0 1cN0 1cL0 1fB0 1cL0 1cN0 1cL0 1cN0 1cL0 6hD0 11z0 1cN0 1cL0 1cN0 1cL0 1cN0 1cL0 1cN0 1cL0 1cN0 1fz0 3Db0 h1f0 1cJ0 1cP0 1cJ0|38e3", "Asia/Shanghai|CST CDT|-80 -90|01010101010101010|-1c1I0 LX0 16p0 1jz0 1Myp0 Rb0 1o10 11z0 1o10 11z0 1qN0 11z0 1o10 11z0 1o10 11z0|23e6", "Asia/Colombo|MMT +0530 +06 +0630|-5j.w -5u -60 -6u|01231321|-2zOtj.w 1rFbN.w 1zzu 7Apu 23dz0 11zu n3cu|22e5", "Asia/Dhaka|HMT +0630 +0530 +06 +07|-5R.k -6u -5u -60 -70|0121343|-18LFR.k 1unn.k HB0 m6n0 2kxbu 1i00|16e6", "Asia/Damascus|LMT EET EEST|-2p.c -20 -30|01212121212121212121212121212121212121212121212121212121212121212121212121212121212121212121212121212121212121212121212121212121212121212121212121212121|-21Jep.c Hep.c 17b0 1ip0 17b0 1ip0 17b0 1ip0 19X0 1xRB0 11X0 1oN0 10L0 1pB0 11b0 1oN0 10L0 1mp0 13X0 1oN0 11b0 1pd0 11b0 1oN0 11b0 1oN0 11b0 1oN0 11b0 1pd0 11b0 1oN0 11b0 1oN0 11b0 1oN0 11b0 1pd0 11b0 1oN0 Nb0 1AN0 Nb0 bcp0 19X0 1gp0 19X0 3ld0 1xX0 Vd0 1Bz0 Sp0 1vX0 10p0 1dz0 1cN0 1cL0 1db0 1db0 1g10 1an0 1ap0 1db0 1fd0 1db0 1cN0 1db0 1dd0 1db0 1cp0 1dz0 1c10 1dX0 1cN0 1db0 1dd0 1db0 1cN0 1db0 1cN0 1db0 1cN0 1db0 1dd0 1db0 1cN0 1db0 1cN0 19z0 1fB0 1qL0 11B0 1on0 Wp0 1qL0 11B0 1nX0 11B0 1nX0 11B0 1nX0 11B0 1nX0 11B0 1qL0 WN0 1qL0 WN0 1qL0 11B0 1nX0 11B0 1nX0 11B0 1nX0 11B0 1qL0 WN0 1qL0 WN0 1qL0 11B0 1nX0 11B0 1nX0 11B0 1qL0 WN0 1qL0 WN0 1qL0 11B0 1nX0 11B0 1nX0 11B0 1nX0 11B0 1qL0 WN0 1qL0 WN0 1qL0 11B0 1nX0 11B0 1nX0 11B0 1qL0 WN0 1qL0|26e5", "Asia/Dili|LMT +08 +09|-8m.k -80 -90|01212|-2le8m.k 1dnXm.k 1nfA0 Xld0|19e4", "Asia/Dubai|LMT +04|-3F.c -40|01|-21JfF.c|39e5", "Asia/Dushanbe|LMT +05 +06 +07|-4z.c -50 -60 -70|012323232323232323232321|-1Pc4z.c eUnz.c 23CL0 1db0 1cN0 1db0 1cN0 1db0 1dd0 1cO0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1fA0 2hB0|76e4", "Asia/Famagusta|LMT EET EEST +03|-2f.M -20 -30 -30|01212121212121212121212121212121212121212121212121212121212121212121212121212121212123|-1Vc2f.M 2a3cf.M 1cL0 1qp0 Xz0 19B0 19X0 1fB0 1db0 1cp0 1cL0 1fB0 19X0 1cN0 1cL0 1cN0 1cL0 1cN0 1cL0 1cN0 1fz0 1cN0 1cL0 1cN0 1cL0 1cN0 1cL0 1cN0 1cL0 1cN0 1cL0 1cN0 1fz0 1cN0 1cL0 1cN0 1cL0 1cN0 1cL0 1cN0 1cL0 1cN0 1cL0 1fB0 1cL0 1cN0 1cL0 1cN0 1o30 11A0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00 11A0 1o00 11A0 15U0", "Asia/Gaza|EET EEST IST IDT|-20 -30 -20 -30|010101010101010101010101010101012323232323232323232323232320101010101010101010101010101010101010101010101010101010101010101010101010101010101010|-1c2q0 5Rb0 10r0 1px0 10N0 1pz0 16p0 1jB0 16p0 1jx0 pBd0 Vz0 1oN0 11b0 1oO0 10N0 1pz0 10N0 1pb0 10N0 1pb0 10N0 1pb0 10N0 1pz0 10N0 1pb0 10N0 1pb0 11d0 1oL0 dW0 hfB0 Db0 1fB0 Rb0 npB0 11z0 1C10 IL0 1s10 10n0 1o10 WL0 1zd0 On0 1ld0 11z0 1o10 14n0 1o10 14n0 1nd0 12n0 1nd0 Xz0 1q10 12n0 M10 C00 17c0 1io0 17c0 1io0 17c0 1o00 1cL0 1fB0 1cL0 1cN0 1cL0 1cN0 1cL0 1cN0 1cL0 1cN0 17c0 1io0 18N0 1bz0 19z0 1gp0 1610 1iL0 11z0 1o10 14o0 1lA1 SKX 1xd1 MKX 1AN0 1a00 1fA0 1cL0 1cN0 1nX0 1210 1nz0 1220 1qL0 WN0 1qL0 11B0 1nX0 11B0 1nX0 11B0 1qL0 WN0 1qL0 WN0 1qL0 WN0 1qL0 11B0 1nX0 11B0 1nX0 11B0 1qL0 WN0 1qL0 WN0 1qL0 11B0 1nX0 11B0 1nX0 11B0 1nX0 11B0 1qL0 WN0 1qL0 WN0 1qL0 11B0 1nX0 11B0 1nX0 11B0 1qL0|18e5", "Asia/Hebron|EET EEST IST IDT|-20 -30 -20 -30|01010101010101010101010101010101232323232323232323232323232010101010101010101010101010101010101010101010101010101010101010101010101010101010101010|-1c2q0 5Rb0 10r0 1px0 10N0 1pz0 16p0 1jB0 16p0 1jx0 pBd0 Vz0 1oN0 11b0 1oO0 10N0 1pz0 10N0 1pb0 10N0 1pb0 10N0 1pb0 10N0 1pz0 10N0 1pb0 10N0 1pb0 11d0 1oL0 dW0 hfB0 Db0 1fB0 Rb0 npB0 11z0 1C10 IL0 1s10 10n0 1o10 WL0 1zd0 On0 1ld0 11z0 1o10 14n0 1o10 14n0 1nd0 12n0 1nd0 Xz0 1q10 12n0 M10 C00 17c0 1io0 17c0 1io0 17c0 1o00 1cL0 1fB0 1cL0 1cN0 1cL0 1cN0 1cL0 1cN0 1cL0 1cN0 17c0 1io0 18N0 1bz0 19z0 1gp0 1610 1iL0 12L0 1mN0 14o0 1lc0 Tb0 1xd1 MKX bB0 cn0 1cN0 1a00 1fA0 1cL0 1cN0 1nX0 1210 1nz0 1220 1qL0 WN0 1qL0 11B0 1nX0 11B0 1nX0 11B0 1qL0 WN0 1qL0 WN0 1qL0 WN0 1qL0 11B0 1nX0 11B0 1nX0 11B0 1qL0 WN0 1qL0 WN0 1qL0 11B0 1nX0 11B0 1nX0 11B0 1nX0 11B0 1qL0 WN0 1qL0 WN0 1qL0 11B0 1nX0 11B0 1nX0 11B0 1qL0|25e4", "Asia/Ho_Chi_Minh|LMT PLMT +07 +08 +09|-76.E -76.u -70 -80 -90|0123423232|-2yC76.E bK00.a 1h7b6.u 5lz0 18o0 3Oq0 k5b0 aW00 BAM0|90e5", "Asia/Hong_Kong|LMT HKT HKST JST|-7A.G -80 -90 -90|0121312121212121212121212121212121212121212121212121212121212121212121|-2CFHA.G 1sEP6.G 1cL0 ylu 93X0 1qQu 1tX0 Rd0 1In0 NB0 1cL0 11B0 1nX0 11B0 1nX0 11B0 1nX0 14p0 1kL0 14N0 1nX0 U10 1tz0 U10 1wn0 Rd0 1wn0 U10 1tz0 U10 1tz0 U10 1tz0 U10 1wn0 Rd0 1wn0 Rd0 1wn0 U10 1tz0 U10 1tz0 17d0 1cL0 1cN0 1cL0 1cN0 1fz0 1cN0 1cL0 1cN0 1cL0 1cN0 1cL0 1cN0 1cL0 1cN0 1fz0 1cN0 1cL0 s10 1Vz0 1cN0 1cL0 1cN0 1cL0 6fd0 14n0|73e5", "Asia/Hovd|LMT +06 +07 +08|-66.A -60 -70 -80|012323232323232323232323232323232323232323232323232|-2APG6.A 2Uko6.A cKn0 1db0 1dd0 1cL0 1cN0 1cL0 1cN0 1cL0 1cN0 1cL0 1cN0 1cL0 1cN0 1cL0 1cN0 1fz0 1cN0 1cL0 1cN0 1cL0 1cN0 1cL0 1cN0 1cL0 1cN0 1cL0 1fB0 1cL0 1cN0 1cL0 1cN0 1cL0 6hD0 11z0 1cN0 1cL0 1cN0 1cL0 1cN0 1cL0 1cN0 1cL0 1cN0 1fz0 kEp0 1cJ0 1cP0 1cJ0|81e3", "Asia/Irkutsk|IMT +07 +08 +09|-6V.5 -70 -80 -90|01232323232323232323232123232323232323232323232323232323232323232|-21zGV.5 pjXV.5 23CL0 1db0 1cN0 1db0 1cN0 1db0 1dd0 1cO0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1fA0 2pB0 IM0 rX0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1fA0 1o00 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 8Hz0|60e4", "Europe/Istanbul|IMT EET EEST +04 +03|-1U.U -20 -30 -40 -30|012121212121212121212121212121212121212121212121212121234343434342121212121212121212121212121212121212121212121212121212121212124|-2ogNU.U dzzU.U 11b0 8tB0 1on0 1410 1db0 19B0 1in0 3Rd0 Un0 1oN0 11b0 zSp0 CL0 mN0 1Vz0 1gN0 1pz0 5Rd0 1fz0 1yp0 ML0 1kp0 17b0 1ip0 17b0 1fB0 19X0 1jB0 18L0 1ip0 17z0 qdd0 xX0 3S10 Tz0 dA10 11z0 1o10 11z0 1qN0 11z0 1ze0 11B0 WM0 1qO0 WI0 1nX0 1rB0 10L0 11B0 1in0 17d0 1in0 2pX0 19E0 1fU0 16Q0 1iI0 16Q0 1iI0 1Vd0 pb0 3Kp0 14o0 1de0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1fA0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1a00 1fA0 1cM0 1cM0 1fA0 1o00 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 WO0 1qM0 11A0 1o00 11A0 1o00 11A0 1qM0 Xc0 1qo0 WM0 1qM0 11A0 1o00 1200 1nA0 11A0 1tA0 U00 15w0|13e6", "Asia/Jakarta|BMT +0720 +0730 +09 +08 WIB|-77.c -7k -7u -90 -80 -70|01232425|-1Q0Tk luM0 mPzO 8vWu 6kpu 4PXu xhcu|31e6", "Asia/Jayapura|LMT +09 +0930 WIT|-9m.M -90 -9u -90|0123|-1uu9m.M sMMm.M L4nu|26e4", "Asia/Jerusalem|JMT IST IDT IDDT|-2k.E -20 -30 -40|01212121212132121212121212121212121212121212121212121212121212121212121212121212121212121212121212121212121212121212121212121212121212121212121|-26Bek.E SyMk.E 5Rb0 10r0 1px0 10N0 1pz0 16p0 1jB0 16p0 1jx0 3LB0 Em0 or0 1cn0 1dB0 16n0 10O0 1ja0 1tC0 14o0 1cM0 1a00 11A0 1Na0 An0 1MP0 AJ0 1Kp0 LC0 1oo0 Wl0 EQN0 Db0 1fB0 Rb0 npB0 11z0 1C10 IL0 1s10 10n0 1o10 WL0 1zd0 On0 1ld0 11z0 1o10 14n0 1o10 14n0 1nd0 12n0 1nd0 Xz0 1q10 12n0 1hB0 1dX0 1ep0 1aL0 1eN0 17X0 1nf0 11z0 1tB0 19W0 1e10 17b0 1ep0 1gL0 18N0 1fz0 1eN0 17b0 1gq0 1gn0 19d0 1dz0 1c10 17X0 1hB0 1gn0 19d0 1dz0 1c10 17X0 1kp0 1dz0 1c10 1aL0 1eN0 1oL0 10N0 1oL0 10N0 1oL0 10N0 1rz0 W10 1rz0 W10 1rz0 10N0 1oL0 10N0 1oL0 10N0 1rz0 W10 1rz0 W10 1rz0 10N0 1oL0 10N0 1oL0 10N0 1oL0 10N0 1rz0 W10 1rz0 W10 1rz0 10N0 1oL0 10N0 1oL0 10N0 1rz0 W10 1rz0 W10 1rz0 W10 1rz0 10N0 1oL0 10N0 1oL0|81e4", "Asia/Kabul|+04 +0430|-40 -4u|01|-10Qs0|46e5", "Asia/Kamchatka|LMT +11 +12 +13|-ay.A -b0 -c0 -d0|012323232323232323232321232323232323232323232323232323232323212|-1SLKy.A ivXy.A 23CL0 1db0 1cN0 1db0 1cN0 1db0 1dd0 1cO0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1fA0 2pB0 IM0 rX0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1fA0 1o00 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00 2sp0 WM0|18e4", "Asia/Karachi|LMT +0530 +0630 +05 PKT PKST|-4s.c -5u -6u -50 -50 -60|012134545454|-2xoss.c 1qOKW.c 7zX0 eup0 LqMu 1fy00 1cL0 dK10 11b0 1610 1jX0|24e6", "Asia/Urumqi|LMT +06|-5O.k -60|01|-1GgtO.k|32e5", "Asia/Kathmandu|LMT +0530 +0545|-5F.g -5u -5J|012|-21JhF.g 2EGMb.g|12e5", "Asia/Khandyga|LMT +08 +09 +10 +11|-92.d -80 -90 -a0 -b0|0123232323232323232323212323232323232323232323232343434343434343432|-21Q92.d pAp2.d 23CL0 1db0 1cN0 1db0 1cN0 1db0 1dd0 1cO0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1fA0 2pB0 IM0 rX0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1fA0 1o00 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00 qK0 yN0 1qM0 WM0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 17V0 7zD0|66e2", "Asia/Krasnoyarsk|LMT +06 +07 +08|-6b.q -60 -70 -80|01232323232323232323232123232323232323232323232323232323232323232|-21Hib.q prAb.q 23CL0 1db0 1cN0 1db0 1cN0 1db0 1dd0 1cO0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1fA0 2pB0 IM0 rX0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1fA0 1o00 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 8Hz0|10e5", "Asia/Kuala_Lumpur|SMT +07 +0720 +0730 +09 +08|-6T.p -70 -7k -7u -90 -80|0123435|-2Bg6T.p 17anT.p l5XE 17bO 8Fyu 1so1u|71e5", "Asia/Kuching|LMT +0730 +08 +0820 +09|-7l.k -7u -80 -8k -90|0123232323232323242|-1KITl.k gDbP.k 6ynu AnE 1O0k AnE 1NAk AnE 1NAk AnE 1NAk AnE 1O0k AnE 1NAk AnE pAk 8Fz0|13e4", "Asia/Macau|LMT CST CDT|-7y.k -80 -90|012121212121212121212121212121212121212121|-2le7y.k 1XO34.k 1wn0 Rd0 1wn0 R9u 1wqu U10 1tz0 TVu 1tz0 17gu 1cL0 1cN0 1fz0 1cN0 1cL0 1cN0 1cL0 1cN0 1cL0 1cN0 1cL0 1cJu 1cL0 1cN0 1fz0 1cN0 1cOu 1cN0 1cL0 1cN0 1cL0 1cN0 1cL0 1cJu 1cL0 1cN0 1fz0 1cN0 1cL0|57e4", "Asia/Magadan|LMT +10 +11 +12|-a3.c -a0 -b0 -c0|012323232323232323232321232323232323232323232323232323232323232312|-1Pca3.c eUo3.c 23CL0 1db0 1cN0 1db0 1cN0 1db0 1dd0 1cO0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1fA0 2pB0 IM0 rX0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1fA0 1o00 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 8Hz0 3Cq0|95e3", "Asia/Makassar|LMT MMT +08 +09 WITA|-7V.A -7V.A -80 -90 -80|01234|-21JjV.A vfc0 myLV.A 8ML0|15e5", "Asia/Manila|+08 +09|-80 -90|010101010|-1kJI0 AL0 cK10 65X0 mXB0 vX0 VK10 1db0|24e6", "Asia/Nicosia|LMT EET EEST|-2d.s -20 -30|01212121212121212121212121212121212121212121212121212121212121212121212121212121212121212121212121212121212121212121212121212121|-1Vc2d.s 2a3cd.s 1cL0 1qp0 Xz0 19B0 19X0 1fB0 1db0 1cp0 1cL0 1fB0 19X0 1cN0 1cL0 1cN0 1cL0 1cN0 1cL0 1cN0 1fz0 1cN0 1cL0 1cN0 1cL0 1cN0 1cL0 1cN0 1cL0 1cN0 1cL0 1cN0 1fz0 1cN0 1cL0 1cN0 1cL0 1cN0 1cL0 1cN0 1cL0 1cN0 1cL0 1fB0 1cL0 1cN0 1cL0 1cN0 1o30 11A0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00|32e4", "Asia/Novokuznetsk|LMT +06 +07 +08|-5M.M -60 -70 -80|012323232323232323232321232323232323232323232323232323232323212|-1PctM.M eULM.M 23CL0 1db0 1cN0 1db0 1cN0 1db0 1dd0 1cO0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1fA0 2pB0 IM0 rX0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1fA0 1o00 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00 2sp0 WM0|55e4", "Asia/Novosibirsk|LMT +06 +07 +08|-5v.E -60 -70 -80|0123232323232323232323212323212121212121212121212121212121212121212|-21Qnv.E pAFv.E 23CL0 1db0 1cN0 1db0 1cN0 1db0 1dd0 1cO0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1fA0 2pB0 IM0 rX0 1cM0 1cM0 ml0 Os0 1cM0 1cM0 1cM0 1cM0 1fA0 1o00 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 8Hz0 4eN0|15e5", "Asia/Omsk|LMT +05 +06 +07|-4R.u -50 -60 -70|01232323232323232323232123232323232323232323232323232323232323232|-224sR.u pMLR.u 23CL0 1db0 1cN0 1db0 1cN0 1db0 1dd0 1cO0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1fA0 2pB0 IM0 rX0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1fA0 1o00 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 8Hz0|12e5", "Asia/Oral|LMT +03 +05 +06 +04|-3p.o -30 -50 -60 -40|01232323232323232424242424242424242424242424242|-1Pc3p.o eUop.o 23CK0 3Db0 1cN0 1db0 1dd0 1cO0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 2pB0 1cM0 1fA0 1cM0 1cM0 IM0 1EM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1fA0 1o00 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00 11A0|27e4", "Asia/Pontianak|LMT PMT +0730 +09 +08 WITA WIB|-7h.k -7h.k -7u -90 -80 -80 -70|012324256|-2ua7h.k XE00 munL.k 8Rau 6kpu 4PXu xhcu Wqnu|23e4", "Asia/Pyongyang|LMT KST JST KST|-8n -8u -90 -90|01231|-2um8n 97XR 1lTzu 2Onc0|29e5", "Asia/Qyzylorda|LMT +04 +05 +06|-4l.Q -40 -50 -60|0123232323232323232323232323232323232323232323|-1Pc4l.Q eUol.Q 23CL0 3Db0 1cN0 1db0 1dd0 1cO0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1fA0 3ao0 1EM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1fA0 1o00 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00 11A0|73e4", "Asia/Rangoon|RMT +0630 +09|-6o.E -6u -90|0121|-21Jio.E SmnS.E 7j9u|48e5", "Asia/Sakhalin|LMT +09 +11 +12 +10|-9u.M -90 -b0 -c0 -a0|01232323232323232323232423232323232424242424242424242424242424242|-2AGVu.M 1BoMu.M 1qFa0 1db0 1cN0 1db0 1cN0 1db0 1dd0 1cO0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1fA0 2pB0 IM0 rX0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1fA0 1o00 2pB0 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 8Hz0 3rd0|58e4", "Asia/Samarkand|LMT +04 +05 +06|-4r.R -40 -50 -60|01232323232323232323232|-1Pc4r.R eUor.R 23CL0 3Db0 1cN0 1db0 1dd0 1cO0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1fA0 1cM0 1cM0|36e4", "Asia/Seoul|LMT KST JST KST KDT KDT|-8r.Q -8u -90 -90 -9u -a0|0123141414141414135353|-2um8r.Q 97XV.Q 1m1zu kKo0 2I0u OL0 1FB0 Rb0 1qN0 TX0 1tB0 TX0 1tB0 TX0 1tB0 TX0 2ap0 12FBu 11A0 1o00 11A0|23e6", "Asia/Srednekolymsk|LMT +10 +11 +12|-ae.Q -a0 -b0 -c0|01232323232323232323232123232323232323232323232323232323232323232|-1Pcae.Q eUoe.Q 23CL0 1db0 1cN0 1db0 1cN0 1db0 1dd0 1cO0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1fA0 2pB0 IM0 rX0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1fA0 1o00 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 8Hz0|35e2", "Asia/Taipei|CST JST CDT|-80 -90 -90|01020202020202020202020202020202020202020|-1iw80 joM0 1yo0 Tz0 1ip0 1jX0 1cN0 11b0 1oN0 11b0 1oN0 11b0 1oN0 11b0 10N0 1BX0 10p0 1pz0 10p0 1pz0 10p0 1db0 1dd0 1db0 1cN0 1db0 1cN0 1db0 1cN0 1db0 1BB0 ML0 1Bd0 ML0 uq10 1db0 1cN0 1db0 97B0 AL0|74e5", "Asia/Tashkent|LMT +05 +06 +07|-4B.b -50 -60 -70|012323232323232323232321|-1Pc4B.b eUnB.b 23CL0 1db0 1cN0 1db0 1cN0 1db0 1dd0 1cO0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1fA0 2pB0|23e5", "Asia/Tbilisi|TBMT +03 +04 +05|-2X.b -30 -40 -50|0123232323232323232323212121232323232323232323212|-1Pc2X.b 1jUnX.b WCL0 1db0 1cN0 1db0 1cN0 1db0 1dd0 1cO0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1fA0 2pB0 1cK0 1cL0 1cN0 1cL0 1cN0 2pz0 1cL0 1fB0 3Nz0 11B0 1nX0 11B0 1qL0 WN0 1qL0 WN0 1qL0 11B0 1nX0 11B0 1nX0 11B0 An0 Os0 WM0|11e5", "Asia/Tehran|LMT TMT +0330 +04 +05 +0430|-3p.I -3p.I -3u -40 -50 -4u|01234325252525252525252525252525252525252525252525252525252525252525252525252525252525252525252525252|-2btDp.I 1d3c0 1huLT.I TXu 1pz0 sN0 vAu 1cL0 1dB0 1en0 pNB0 UL0 1cN0 1dz0 1cp0 1dz0 1cp0 1dz0 1cp0 1dz0 1cp0 1dz0 1cN0 1dz0 1cp0 1dz0 1cp0 1dz0 1cp0 1dz0 1cN0 1dz0 1cp0 1dz0 1cp0 1dz0 1cp0 1dz0 1cN0 1dz0 64p0 1dz0 1cN0 1dz0 1cp0 1dz0 1cp0 1dz0 1cp0 1dz0 1cN0 1dz0 1cp0 1dz0 1cp0 1dz0 1cp0 1dz0 1cN0 1dz0 1cp0 1dz0 1cp0 1dz0 1cp0 1dz0 1cN0 1dz0 1cp0 1dz0 1cp0 1dz0 1cp0 1dz0 1cN0 1dz0 1cp0 1dz0 1cp0 1dz0 1cp0 1dz0 1cp0 1dz0 1cN0 1dz0 1cp0 1dz0 1cp0 1dz0 1cp0 1dz0 1cN0 1dz0 1cp0 1dz0 1cp0 1dz0 1cp0 1dz0|14e6", "Asia/Thimphu|LMT +0530 +06|-5W.A -5u -60|012|-Su5W.A 1BGMs.A|79e3", "Asia/Tokyo|JST JDT|-90 -a0|010101010|-QJH0 QL0 1lB0 13X0 1zB0 NX0 1zB0 NX0|38e6", "Asia/Tomsk|LMT +06 +07 +08|-5D.P -60 -70 -80|0123232323232323232323212323232323232323232323212121212121212121212|-21NhD.P pxzD.P 23CL0 1db0 1cN0 1db0 1cN0 1db0 1dd0 1cO0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1fA0 2pB0 IM0 rX0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1fA0 1o00 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 11A0 co0 1bB0 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 8Hz0 3Qp0|10e5", "Asia/Ulaanbaatar|LMT +07 +08 +09|-77.w -70 -80 -90|012323232323232323232323232323232323232323232323232|-2APH7.w 2Uko7.w cKn0 1db0 1dd0 1cL0 1cN0 1cL0 1cN0 1cL0 1cN0 1cL0 1cN0 1cL0 1cN0 1cL0 1cN0 1fz0 1cN0 1cL0 1cN0 1cL0 1cN0 1cL0 1cN0 1cL0 1cN0 1cL0 1fB0 1cL0 1cN0 1cL0 1cN0 1cL0 6hD0 11z0 1cN0 1cL0 1cN0 1cL0 1cN0 1cL0 1cN0 1cL0 1cN0 1fz0 kEp0 1cJ0 1cP0 1cJ0|12e5", "Asia/Ust-Nera|LMT +08 +09 +12 +11 +10|-9w.S -80 -90 -c0 -b0 -a0|012343434343434343434345434343434343434343434343434343434343434345|-21Q9w.S pApw.S 23CL0 1d90 1cN0 1db0 1cN0 1db0 1dd0 1cO0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1fA0 2pB0 IM0 rX0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1fA0 1o00 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 17V0 7zD0|65e2", "Asia/Vladivostok|LMT +09 +10 +11|-8L.v -90 -a0 -b0|01232323232323232323232123232323232323232323232323232323232323232|-1SJIL.v itXL.v 23CL0 1db0 1cN0 1db0 1cN0 1db0 1dd0 1cO0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1fA0 2pB0 IM0 rX0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1fA0 1o00 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 8Hz0|60e4", "Asia/Yakutsk|LMT +08 +09 +10|-8C.W -80 -90 -a0|01232323232323232323232123232323232323232323232323232323232323232|-21Q8C.W pAoC.W 23CL0 1db0 1cN0 1db0 1cN0 1db0 1dd0 1cO0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1fA0 2pB0 IM0 rX0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1fA0 1o00 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 8Hz0|28e4", "Asia/Yekaterinburg|LMT PMT +04 +05 +06|-42.x -3J.5 -40 -50 -60|012343434343434343434343234343434343434343434343434343434343434343|-2ag42.x 7mQh.s qBvJ.5 23CL0 1db0 1cN0 1db0 1cN0 1db0 1dd0 1cO0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1fA0 2pB0 IM0 rX0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1fA0 1o00 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 8Hz0|14e5", "Asia/Yerevan|LMT +03 +04 +05|-2W -30 -40 -50|0123232323232323232323212121212323232323232323232323232323232|-1Pc2W 1jUnW WCL0 1db0 1cN0 1db0 1cN0 1db0 1dd0 1cO0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1fA0 2pB0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 4RX0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0|13e5", "Atlantic/Azores|HMT -02 -01 +00 WET|1S.w 20 10 0 0|01212121212121212121212121212121212121212121232123212321232121212121212121212121212121212121212121232323232323232323232323232323234323232323232323232323232323232323232323232323232323232323232323232323232323232323232323232|-2ldW5.s aPX5.s Sp0 LX0 1vc0 Tc0 1uM0 SM0 1vc0 Tc0 1vc0 SM0 1vc0 6600 1co0 3E00 17c0 1fA0 1a00 1io0 1a00 1io0 17c0 3I00 17c0 1cM0 1cM0 3Fc0 1cM0 1a00 1fA0 1io0 17c0 1cM0 1cM0 1a00 1fA0 1io0 1qM0 Dc0 1tA0 1cM0 1dc0 1400 gL0 IM0 s10 U00 dX0 Rc0 pd0 Rc0 gL0 Oo0 pd0 Rc0 gL0 Oo0 pd0 14o0 1cM0 1cP0 1cM0 1cM0 1cM0 1cM0 1cM0 3Co0 1fA0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1fA0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1fA0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 qIl0 1cM0 1fA0 1cM0 1cM0 1cN0 1cL0 1cN0 1cM0 1cM0 1cM0 1cM0 1cN0 1cL0 1cM0 1fA0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1fA0 1cM0 1cM0 1cM0 1cM0 1cL0 1cM0 1cM0 1cM0 1cM0 1cM0 1fA0 1o00 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00|25e4", "Atlantic/Bermuda|LMT AST ADT|4j.i 40 30|0121212121212121212121212121212121212121212121212121212121212121212121212121212121212121212121212121212121212121212121212121212121|-1BnRE.G 1LTbE.G 1cL0 1cN0 1cL0 1cN0 1fz0 1a10 1fz0 1cN0 1cL0 1cN0 1cL0 1cN0 1cL0 1cN0 1cL0 1cN0 1fz0 1a10 1fz0 1cN0 1cL0 1cN0 1cL0 1cN0 1cL0 14p0 1lb0 14p0 1nX0 11B0 1nX0 11B0 1nX0 14p0 1lb0 14p0 1lb0 14p0 1nX0 11B0 1nX0 11B0 1nX0 14p0 1lb0 14p0 1lb0 14p0 1lb0 14p0 1nX0 11B0 1nX0 11B0 1nX0 14p0 1lb0 14p0 1lb0 14p0 1nX0 11B0 1nX0 11B0 1nX0 Rd0 1zb0 Op0 1zb0 Op0 1zb0 Rd0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Rd0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Rd0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Rd0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Rd0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0|65e3", "Atlantic/Canary|LMT -01 WET WEST|11.A 10 0 -10|01232323232323232323232323232323232323232323232323232323232323232323232323232323232323232323232323232323232323232323232|-1UtaW.o XPAW.o 1lAK0 1a10 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1fA0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1fA0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1fA0 1o00 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00|54e4", "Atlantic/Cape_Verde|LMT -02 -01|1y.4 20 10|01212|-2xomp.U 1qOMp.U 7zX0 1djf0|50e4", "Atlantic/Faroe|LMT WET WEST|r.4 0 -10|01212121212121212121212121212121212121212121212121212121212121212121212121212121212121212121212121212121212121212121|-2uSnw.U 2Wgow.U 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1fA0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1fA0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1fA0 1o00 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00|49e3", "Atlantic/Madeira|FMT -01 +00 +01 WET WEST|17.A 10 0 -10 0 -10|01212121212121212121212121212121212121212121232123212321232121212121212121212121212121212121212121454545454545454545454545454545454545454545454545454545454545454545454545454545454545454545454545454545454545454545454545454|-2ldWQ.o aPWQ.o Sp0 LX0 1vc0 Tc0 1uM0 SM0 1vc0 Tc0 1vc0 SM0 1vc0 6600 1co0 3E00 17c0 1fA0 1a00 1io0 1a00 1io0 17c0 3I00 17c0 1cM0 1cM0 3Fc0 1cM0 1a00 1fA0 1io0 17c0 1cM0 1cM0 1a00 1fA0 1io0 1qM0 Dc0 1tA0 1cM0 1dc0 1400 gL0 IM0 s10 U00 dX0 Rc0 pd0 Rc0 gL0 Oo0 pd0 Rc0 gL0 Oo0 pd0 14o0 1cM0 1cP0 1cM0 1cM0 1cM0 1cM0 1cM0 3Co0 1fA0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1fA0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1fA0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 qIl0 1cM0 1fA0 1cM0 1cM0 1cN0 1cL0 1cN0 1cM0 1cM0 1cM0 1cM0 1cN0 1cL0 1cM0 1fA0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1fA0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1fA0 1o00 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00|27e4", "Atlantic/Reykjavik|LMT -01 +00 GMT|1s 10 0 0|012121212121212121212121212121212121212121212121212121212121212121213|-2uWmw mfaw 1Bd0 ML0 1LB0 Cn0 1LB0 3fX0 C10 HrX0 1cO0 LB0 1EL0 LA0 1C00 Oo0 1wo0 Rc0 1wo0 Rc0 1wo0 Rc0 1zc0 Oo0 1zc0 14o0 1lc0 14o0 1lc0 14o0 1o00 11A0 1lc0 14o0 1o00 14o0 1lc0 14o0 1lc0 14o0 1lc0 14o0 1lc0 14o0 1o00 14o0 1lc0 14o0 1lc0 14o0 1lc0 14o0 1lc0 14o0 1lc0 14o0 1o00 14o0 1lc0 14o0 1lc0 14o0 1lc0 14o0 1lc0 14o0 1o00 14o0|12e4", "Atlantic/South_Georgia|-02|20|0||30", "Atlantic/Stanley|SMT -04 -03 -02|3P.o 40 30 20|012121212121212323212121212121212121212121212121212121212121212121212|-2kJw8.A 12bA8.A 19X0 1fB0 19X0 1ip0 19X0 1fB0 19X0 1fB0 19X0 1fB0 Cn0 1Cc10 WL0 1qL0 U10 1tz0 2mN0 WN0 1qL0 WN0 1qL0 WN0 1qL0 WN0 1tz0 U10 1tz0 WN0 1qL0 WN0 1qL0 WN0 1qL0 WN0 1qL0 WN0 1tz0 WN0 1qL0 WN0 1qL0 WN0 1qL0 WN0 1qL0 WN0 1qN0 U10 1wn0 Rd0 1wn0 U10 1tz0 U10 1tz0 U10 1tz0 U10 1tz0 U10 1wn0 U10 1tz0 U10 1tz0 U10|21e2", "Australia/Sydney|AEST AEDT|-a0 -b0|0101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101|-293lX xcX 10jd0 yL0 1cN0 1cL0 1fB0 19X0 17c10 LA0 1C00 Oo0 1zc0 Oo0 1zc0 Oo0 1zc0 Rc0 1zc0 Oo0 1zc0 Oo0 1zc0 Oo0 1zc0 Oo0 1zc0 Oo0 1zc0 14o0 1o00 Oo0 1zc0 Oo0 1zc0 Oo0 1zc0 U00 1qM0 WM0 1tA0 WM0 1tA0 U00 1tA0 Oo0 1zc0 Oo0 1zc0 Oo0 1zc0 Rc0 1zc0 Oo0 1zc0 Oo0 1zc0 11A0 1o00 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 11A0 1o00 1qM0 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 11A0 1o00 WM0 1qM0 14o0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1fA0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1fA0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1fA0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1fA0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1fA0 1cM0 1cM0 1cM0 1cM0|40e5", "Australia/Adelaide|ACST ACDT|-9u -au|0101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101|-293lt xcX 10jd0 yL0 1cN0 1cL0 1fB0 19X0 17c10 LA0 1C00 Oo0 1zc0 Oo0 1zc0 Oo0 1zc0 Rc0 1zc0 Oo0 1zc0 Oo0 1zc0 Oo0 1zc0 Oo0 1zc0 Oo0 1zc0 Rc0 1zc0 Oo0 1zc0 Oo0 1zc0 Oo0 1zc0 U00 1qM0 WM0 1tA0 WM0 1tA0 U00 1tA0 U00 1tA0 Oo0 1zc0 WM0 1qM0 Rc0 1zc0 U00 1tA0 WM0 1qM0 11A0 1o00 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 11A0 1o00 WM0 1qM0 14o0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1fA0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1fA0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1fA0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1fA0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1fA0 1cM0 1cM0 1cM0 1cM0|11e5", "Australia/Brisbane|AEST AEDT|-a0 -b0|01010101010101010|-293lX xcX 10jd0 yL0 1cN0 1cL0 1fB0 19X0 17c10 LA0 H1A0 Oo0 1zc0 Oo0 1zc0 Oo0|20e5", "Australia/Broken_Hill|ACST ACDT|-9u -au|0101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101|-293lt xcX 10jd0 yL0 1cN0 1cL0 1fB0 19X0 17c10 LA0 1C00 Oo0 1zc0 Oo0 1zc0 Oo0 1zc0 Rc0 1zc0 Oo0 1zc0 Oo0 1zc0 Oo0 1zc0 Oo0 1zc0 Oo0 1zc0 14o0 1o00 Oo0 1zc0 Oo0 1zc0 Oo0 1zc0 U00 1qM0 WM0 1tA0 WM0 1tA0 U00 1tA0 Oo0 1zc0 Oo0 1zc0 Oo0 1zc0 Rc0 1zc0 Oo0 1zc0 Oo0 1zc0 11A0 1o00 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 11A0 1o00 WM0 1qM0 14o0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1fA0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1fA0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1fA0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1fA0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1fA0 1cM0 1cM0 1cM0 1cM0|18e3", "Australia/Currie|AEST AEDT|-a0 -b0|0101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101|-29E80 19X0 10jd0 yL0 1cN0 1cL0 1fB0 19X0 17c10 LA0 1C00 Oo0 1zc0 Oo0 1zc0 Oo0 1zc0 Rc0 1zc0 Oo0 1zc0 Oo0 1zc0 Oo0 1zc0 Oo0 1zc0 Oo0 1zc0 11A0 1qM0 WM0 1qM0 Oo0 1zc0 Oo0 1zc0 Oo0 1wo0 WM0 1tA0 WM0 1tA0 U00 1tA0 U00 1tA0 11A0 1fA0 1a00 1fA0 1a00 1fA0 1a00 1fA0 1a00 1fA0 1cM0 1fA0 1a00 1fA0 1a00 1fA0 1a00 1fA0 1a00 11A0 1o00 1io0 1a00 1fA0 1a00 1fA0 1a00 1fA0 1a00 1fA0 1cM0 1cM0 1a00 1io0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1fA0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1fA0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1fA0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1fA0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1fA0 1cM0 1cM0 1cM0 1cM0|746", "Australia/Darwin|ACST ACDT|-9u -au|010101010|-293lt xcX 10jd0 yL0 1cN0 1cL0 1fB0 19X0|12e4", "Australia/Eucla|+0845 +0945|-8J -9J|0101010101010101010|-293kI xcX 10jd0 yL0 1cN0 1cL0 1gSp0 Oo0 l5A0 Oo0 iJA0 G00 zU00 IM0 1qM0 11A0 1o00 11A0|368", "Australia/Hobart|AEST AEDT|-a0 -b0|010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101|-29E80 19X0 10jd0 yL0 1cN0 1cL0 1fB0 19X0 VfB0 1cM0 1o00 Rc0 1wo0 Rc0 1wo0 U00 1wo0 LA0 1C00 Oo0 1zc0 Oo0 1zc0 Oo0 1zc0 Rc0 1zc0 Oo0 1zc0 Oo0 1zc0 Oo0 1zc0 Oo0 1zc0 Oo0 1zc0 11A0 1qM0 WM0 1qM0 Oo0 1zc0 Oo0 1zc0 Oo0 1wo0 WM0 1tA0 WM0 1tA0 U00 1tA0 U00 1tA0 11A0 1fA0 1a00 1fA0 1a00 1fA0 1a00 1fA0 1a00 1fA0 1cM0 1fA0 1a00 1fA0 1a00 1fA0 1a00 1fA0 1a00 11A0 1o00 1io0 1a00 1fA0 1a00 1fA0 1a00 1fA0 1a00 1fA0 1cM0 1cM0 1a00 1io0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1fA0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1fA0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1fA0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1fA0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1fA0 1cM0 1cM0 1cM0 1cM0|21e4", "Australia/Lord_Howe|AEST +1030 +1130 +11|-a0 -au -bu -b0|0121212121313131313131313131313131313131313131313131313131313131313131313131313131313131313131313131313131313131313|raC0 1zdu Rb0 1zd0 On0 1zd0 On0 1zd0 On0 1zd0 TXu 1qMu WLu 1tAu WLu 1tAu TXu 1tAu Onu 1zcu Onu 1zcu Onu 1zcu Rbu 1zcu Onu 1zcu Onu 1zcu 11zu 1o0u 11zu 1o0u 11zu 1o0u 11zu 1qMu WLu 11Au 1nXu 1qMu 11zu 1o0u 11zu 1o0u 11zu 1qMu WLu 1qMu 11zu 1o0u WLu 1qMu 14nu 1cMu 1cLu 1cMu 1cLu 1cMu 1cLu 1cMu 1cLu 1fAu 1cLu 1cMu 1cLu 1cMu 1cLu 1cMu 1cLu 1cMu 1cLu 1cMu 1cLu 1fAu 1cLu 1cMu 1cLu 1cMu 1cLu 1cMu 1cLu 1cMu 1cLu 1cMu 1fzu 1cMu 1cLu 1cMu 1cLu 1cMu 1cLu 1cMu 1cLu 1cMu 1cLu 1fAu 1cLu 1cMu 1cLu 1cMu 1cLu 1cMu 1cLu 1cMu 1cLu 1cMu 1cLu 1fAu 1cLu 1cMu 1cLu 1cMu|347", "Australia/Lindeman|AEST AEDT|-a0 -b0|010101010101010101010|-293lX xcX 10jd0 yL0 1cN0 1cL0 1fB0 19X0 17c10 LA0 H1A0 Oo0 1zc0 Oo0 1zc0 Oo0 1zc0 Rc0 1zc0 Oo0|10", "Australia/Melbourne|AEST AEDT|-a0 -b0|0101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101|-293lX xcX 10jd0 yL0 1cN0 1cL0 1fB0 19X0 17c10 LA0 1C00 Oo0 1zc0 Oo0 1zc0 Oo0 1zc0 Rc0 1zc0 Oo0 1zc0 Oo0 1zc0 Oo0 1zc0 Oo0 1zc0 Oo0 1zc0 Rc0 1zc0 Oo0 1zc0 Oo0 1zc0 Oo0 1zc0 U00 1qM0 WM0 1qM0 11A0 1tA0 U00 1tA0 U00 1tA0 Oo0 1zc0 Oo0 1zc0 Rc0 1zc0 Oo0 1zc0 WM0 1qM0 11A0 1o00 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 11A0 1o00 1qM0 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 11A0 1o00 WM0 1qM0 14o0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1fA0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1fA0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1fA0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1fA0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1fA0 1cM0 1cM0 1cM0 1cM0|39e5", "Australia/Perth|AWST AWDT|-80 -90|0101010101010101010|-293jX xcX 10jd0 yL0 1cN0 1cL0 1gSp0 Oo0 l5A0 Oo0 iJA0 G00 zU00 IM0 1qM0 11A0 1o00 11A0|18e5", "CET|CET CEST|-10 -20|01010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010|-2aFe0 11d0 1iO0 11A0 1o00 11A0 Qrc0 6i00 WM0 1fA0 1cM0 1cM0 1cM0 16M0 1gMM0 1a00 1fA0 1cM0 1cM0 1cM0 1fA0 1a00 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1fA0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1fA0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1fA0 1o00 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00", "CST6CDT|CST CDT CWT CPT|60 50 50 50|010102301010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010|-261s0 1nX0 11B0 1nX0 SgN0 8x30 iw0 QwN0 1cL0 1cN0 1cL0 1cN0 1cL0 1cN0 1cL0 1cN0 1fz0 1cN0 1cL0 1cN0 1cL0 s10 1Vz0 LB0 1BX0 1cN0 1fz0 1a10 1fz0 1cN0 1cL0 1cN0 1cL0 1cN0 1cL0 1cN0 1cL0 1cN0 1fz0 1a10 1fz0 1cN0 1cL0 1cN0 1cL0 1cN0 1cL0 14p0 1lb0 14p0 1nX0 11B0 1nX0 11B0 1nX0 14p0 1lb0 14p0 1lb0 14p0 1nX0 11B0 1nX0 11B0 1nX0 14p0 1lb0 14p0 1lb0 14p0 1lb0 14p0 1nX0 11B0 1nX0 11B0 1nX0 14p0 1lb0 14p0 1lb0 14p0 1nX0 11B0 1nX0 11B0 1nX0 Rd0 1zb0 Op0 1zb0 Op0 1zb0 Rd0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Rd0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Rd0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Rd0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Rd0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0", "Pacific/Easter|EMT -07 -06 -05|7h.s 70 60 50|012121212121212121212121212123232323232323232323232323232323232323232323232323232323232323232323232323232323232323232323232323232323232323|-1uSgG.w 1s4IG.w WL0 1zd0 On0 1ip0 11z0 1o10 11z0 1qN0 WL0 1ld0 14n0 1qN0 WL0 1qN0 11z0 1o10 11z0 1o10 11z0 1qN0 WL0 1qN0 WL0 1qN0 11z0 1o10 2pA0 11z0 1o10 11z0 1qN0 WL0 1qN0 WL0 1qN0 1cL0 1cN0 11z0 1o10 11z0 1qN0 WL0 1fB0 19X0 1qN0 11z0 1o10 11z0 1o10 11z0 1o10 11z0 1qN0 WL0 1qN0 17b0 1ip0 11z0 1ip0 1fz0 1fB0 11z0 1qN0 WL0 1qN0 WL0 1qN0 WL0 1qN0 11z0 1o10 11z0 1o10 11z0 1qN0 WL0 1qN0 17b0 1ip0 11z0 1o10 19X0 1fB0 1nX0 G10 1EL0 Op0 1zb0 Rd0 1wn0 Rd0 46n0 Ap0 1Nb0 Ap0 1Nb0 Ap0 1Nb0 Ap0 1Nb0 Ap0 1Nb0 Dd0 1Nb0 Ap0 1Nb0 Ap0 1Nb0 Ap0 1Nb0 Ap0 1Nb0 Ap0 1Nb0 Dd0 1Nb0 Ap0 1Nb0 Ap0 1Nb0 Ap0 1Nb0 Ap0 1Nb0 Dd0 1Nb0 Ap0 1Nb0 Ap0 1Nb0 Ap0 1Nb0 Ap0 1Nb0 Ap0|30e2", "EET|EET EEST|-20 -30|010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010|hDB0 1a00 1fA0 1cM0 1cM0 1cM0 1fA0 1a00 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1fA0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1fA0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1fA0 1o00 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00", "EST|EST|50|0|", "EST5EDT|EST EDT EWT EPT|50 40 40 40|010102301010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010|-261t0 1nX0 11B0 1nX0 SgN0 8x40 iv0 QwN0 1cL0 1cN0 1cL0 1cN0 1cL0 1cN0 1cL0 1cN0 1fz0 1cN0 1cL0 1cN0 1cL0 s10 1Vz0 LB0 1BX0 1cN0 1fz0 1a10 1fz0 1cN0 1cL0 1cN0 1cL0 1cN0 1cL0 1cN0 1cL0 1cN0 1fz0 1a10 1fz0 1cN0 1cL0 1cN0 1cL0 1cN0 1cL0 14p0 1lb0 14p0 1nX0 11B0 1nX0 11B0 1nX0 14p0 1lb0 14p0 1lb0 14p0 1nX0 11B0 1nX0 11B0 1nX0 14p0 1lb0 14p0 1lb0 14p0 1lb0 14p0 1nX0 11B0 1nX0 11B0 1nX0 14p0 1lb0 14p0 1lb0 14p0 1nX0 11B0 1nX0 11B0 1nX0 Rd0 1zb0 Op0 1zb0 Op0 1zb0 Rd0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Rd0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Rd0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Rd0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Rd0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0", "Europe/Dublin|DMT IST GMT BST IST|p.l -y.D 0 -10 -10|01232323232324242424242424242424242424242424242424242424242424242424242424242424242424242424242424242424242424242424242424242424242424242424242424242424242424242424242424242424242424242424242424242424242424242424242424242424242|-2ax9y.D Rc0 1fzy.D 14M0 1fc0 1g00 1co0 1dc0 1co0 1oo0 1400 1dc0 19A0 1io0 1io0 WM0 1o00 14o0 1o00 17c0 1io0 17c0 1fA0 1a00 1lc0 17c0 1io0 17c0 1fA0 1a00 1io0 17c0 1io0 17c0 1fA0 1cM0 1io0 17c0 1fA0 1a00 1io0 17c0 1io0 17c0 1fA0 1a00 1io0 1qM0 Dc0 g5X0 14p0 1wn0 17d0 1io0 11A0 1o00 17c0 1fA0 1a00 1fA0 1cM0 1fA0 1a00 17c0 1fA0 1a00 1io0 17c0 1lc0 17c0 1fA0 1a00 1io0 17c0 1io0 17c0 1fA0 1a00 1a00 1qM0 WM0 1qM0 11A0 1o00 WM0 1qM0 WM0 1qM0 WM0 1qM0 WM0 1tA0 IM0 90o0 U00 1tA0 U00 1tA0 U00 1tA0 U00 1tA0 WM0 1qM0 WM0 1qM0 WM0 1tA0 U00 1tA0 U00 1tA0 11z0 1o00 11A0 1o00 11A0 1o00 11A0 1qM0 11A0 1o00 11A0 1o00 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00 11A0 1o00 11A0 1o00 11A0 1o00 14o0 1o00 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00|12e5", "Etc/GMT+0|GMT|0|0|", "Etc/GMT+1|-01|10|0|", "Etc/GMT+10|-10|a0|0|", "Etc/GMT+11|-11|b0|0|", "Etc/GMT+12|-12|c0|0|", "Etc/GMT+3|-03|30|0|", "Etc/GMT+4|-04|40|0|", "Etc/GMT+5|-05|50|0|", "Etc/GMT+6|-06|60|0|", "Etc/GMT+7|-07|70|0|", "Etc/GMT+8|-08|80|0|", "Etc/GMT+9|-09|90|0|", "Etc/GMT-1|+01|-10|0|", "Pacific/Port_Moresby|+10|-a0|0||25e4", "Pacific/Pohnpei|+11|-b0|0||34e3", "Pacific/Tarawa|+12|-c0|0||29e3", "Etc/GMT-13|+13|-d0|0|", "Etc/GMT-14|+14|-e0|0|", "Etc/GMT-2|+02|-20|0|", "Etc/GMT-3|+03|-30|0|", "Etc/GMT-4|+04|-40|0|", "Etc/GMT-5|+05|-50|0|", "Etc/GMT-6|+06|-60|0|", "Indian/Christmas|+07|-70|0||21e2", "Etc/GMT-8|+08|-80|0|", "Pacific/Palau|+09|-90|0||21e3", "Etc/UCT|UCT|0|0|", "Etc/UTC|UTC|0|0|", "Europe/Amsterdam|AMT NST +0120 +0020 CEST CET|-j.w -1j.w -1k -k -20 -10|010101010101010101010101010101010101010101012323234545454545454545454545454545454545454545454545454545454545454545454545454545454545454545454545454545454545454545454545454545454545|-2aFcj.w 11b0 1iP0 11A0 1io0 1cM0 1fA0 1a00 1fA0 1a00 1fA0 1a00 1co0 1io0 1yo0 Pc0 1a00 1fA0 1Bc0 Mo0 1tc0 Uo0 1tA0 U00 1uo0 W00 1s00 VA0 1so0 Vc0 1sM0 UM0 1wo0 Rc0 1u00 Wo0 1rA0 W00 1s00 VA0 1sM0 UM0 1w00 fV0 BCX.w 1tA0 U00 1u00 Wo0 1sm0 601k WM0 1fA0 1cM0 1cM0 1cM0 16M0 1gMM0 1a00 1fA0 1cM0 1cM0 1cM0 1fA0 1a00 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1fA0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1fA0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1fA0 1o00 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00|16e5", "Europe/Andorra|WET CET CEST|0 -10 -20|012121212121212121212121212121212121212121212121212121212121212121212121212121212121212121212121212121212121|-UBA0 1xIN0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1fA0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1fA0 1o00 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00|79e3", "Europe/Astrakhan|LMT +03 +04 +05|-3c.c -30 -40 -50|012323232323232323212121212121212121212121212121212121212121212|-1Pcrc.c eUMc.c 23CL0 1db0 1cN0 1db0 1cN0 1db0 1dd0 1cO0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 2pB0 1cM0 1fA0 1cM0 3Co0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1fA0 1o00 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 8Hz0 3rd0", "Europe/Athens|AMT EET EEST CEST CET|-1y.Q -20 -30 -20 -10|012123434121212121212121212121212121212121212121212121212121212121212121212121212121212121212121212121212121212121212121212121212121212121|-2a61x.Q CNbx.Q mn0 kU10 9b0 3Es0 Xa0 1fb0 1dd0 k3X0 Nz0 SCp0 1vc0 SO0 1cM0 1a00 1ao0 1fc0 1a10 1fG0 1cg0 1dX0 1bX0 1cQ0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1fA0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1fA0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1fA0 1o00 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00|35e5", "Europe/London|GMT BST BDST|0 -10 -20|0101010101010101010101010101010101010101010101010121212121210101210101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010|-2axa0 Rc0 1fA0 14M0 1fc0 1g00 1co0 1dc0 1co0 1oo0 1400 1dc0 19A0 1io0 1io0 WM0 1o00 14o0 1o00 17c0 1io0 17c0 1fA0 1a00 1lc0 17c0 1io0 17c0 1fA0 1a00 1io0 17c0 1io0 17c0 1fA0 1cM0 1io0 17c0 1fA0 1a00 1io0 17c0 1io0 17c0 1fA0 1a00 1io0 1qM0 Dc0 2Rz0 Dc0 1zc0 Oo0 1zc0 Rc0 1wo0 17c0 1iM0 FA0 xB0 1fA0 1a00 14o0 bb0 LA0 xB0 Rc0 1wo0 11A0 1o00 17c0 1fA0 1a00 1fA0 1cM0 1fA0 1a00 17c0 1fA0 1a00 1io0 17c0 1lc0 17c0 1fA0 1a00 1io0 17c0 1io0 17c0 1fA0 1a00 1a00 1qM0 WM0 1qM0 11A0 1o00 WM0 1qM0 WM0 1qM0 WM0 1qM0 WM0 1tA0 IM0 90o0 U00 1tA0 U00 1tA0 U00 1tA0 U00 1tA0 WM0 1qM0 WM0 1qM0 WM0 1tA0 U00 1tA0 U00 1tA0 11z0 1o00 11A0 1o00 11A0 1o00 11A0 1qM0 11A0 1o00 11A0 1o00 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00 11A0 1o00 11A0 1o00 11A0 1o00 14o0 1o00 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00|10e6", "Europe/Belgrade|CET CEST|-10 -20|01010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010|-19RC0 3IP0 WM0 1fA0 1cM0 1cM0 1rc0 Qo0 1vmo0 1cM0 1cM0 1fA0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1fA0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1fA0 1o00 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00|12e5", "Europe/Berlin|CET CEST CEMT|-10 -20 -30|01010101010101210101210101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010|-2aFe0 11d0 1iO0 11A0 1o00 11A0 Qrc0 6i00 WM0 1fA0 1cM0 1cM0 1cM0 kL0 Nc0 m10 WM0 1ao0 1cp0 dX0 jz0 Dd0 1io0 17c0 1fA0 1a00 1ehA0 1a00 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1fA0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1fA0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1fA0 1o00 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00|41e5", "Europe/Prague|CET CEST|-10 -20|010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010|-2aFe0 11d0 1iO0 11A0 1o00 11A0 Qrc0 6i00 WM0 1fA0 1cM0 16M0 1lc0 1tA0 17A0 11c0 1io0 17c0 1io0 17c0 1fc0 1ao0 1bNc0 1cM0 1fA0 1a00 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1fA0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1fA0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1fA0 1o00 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00|13e5", "Europe/Brussels|WET CET CEST WEST|0 -10 -20 -10|0121212103030303030303030303030303030303030303030303212121212121212121212121212121212121212121212121212121212121212121212121212121212121212121212121212121212121212121212121212121212121|-2ehc0 3zX0 11c0 1iO0 11A0 1o00 11A0 my0 Ic0 1qM0 Rc0 1EM0 UM0 1u00 10o0 1io0 1io0 17c0 1a00 1fA0 1cM0 1cM0 1io0 17c0 1fA0 1a00 1io0 1a30 1io0 17c0 1fA0 1a00 1io0 17c0 1cM0 1cM0 1a00 1io0 1cM0 1cM0 1a00 1fA0 1io0 17c0 1cM0 1cM0 1a00 1fA0 1io0 1qM0 Dc0 y00 5Wn0 WM0 1fA0 1cM0 16M0 1iM0 16M0 1C00 Uo0 1eeo0 1a00 1fA0 1cM0 1cM0 1cM0 1fA0 1a00 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1fA0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1fA0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1fA0 1o00 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00|21e5", "Europe/Bucharest|BMT EET EEST|-1I.o -20 -30|0121212121212121212121212121212121212121212121212121212121212121212121212121212121212121212121212121212121212121212121212121212121212121|-1xApI.o 20LI.o RA0 1cM0 1cM0 1fA0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1Axc0 On0 1fA0 1a10 1cO0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1fA0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1fA0 1cK0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cL0 1cN0 1cL0 1fB0 1nX0 11E0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00|19e5", "Europe/Budapest|CET CEST|-10 -20|0101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010|-2aFe0 11d0 1iO0 11A0 1ip0 17b0 1op0 1tb0 Q2m0 3Ne0 WM0 1fA0 1cM0 1cM0 1oJ0 1dc0 1030 1fA0 1cM0 1cM0 1cM0 1cM0 1fA0 1a00 1iM0 1fA0 8Ha0 Rb0 1wN0 Rb0 1BB0 Lz0 1C20 LB0 SNX0 1a10 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1fA0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1fA0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1fA0 1o00 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00|17e5", "Europe/Zurich|CET CEST|-10 -20|01010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010|-19Lc0 11A0 1o00 11A0 1xG10 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1fA0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1fA0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1fA0 1o00 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00|38e4", "Europe/Chisinau|CMT BMT EET EEST CEST CET MSK MSD|-1T -1I.o -20 -30 -20 -10 -30 -40|012323232323232323234545467676767676767676767323232323232323232323232323232323232323232323232323232323232323232323232323232323232323232323232|-26jdT wGMa.A 20LI.o RA0 1cM0 1cM0 1fA0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 27A0 2en0 39g0 WM0 1fA0 1cM0 V90 1t7z0 1db0 1cN0 1db0 1cN0 1db0 1dd0 1cO0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 gL0 WO0 1cM0 1cM0 1cK0 1cL0 1cN0 1cL0 1cN0 1cL0 1cN0 1cL0 1fB0 1nX0 11D0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00|67e4", "Europe/Copenhagen|CET CEST|-10 -20|0101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010|-2azC0 Tz0 VuO0 60q0 WM0 1fA0 1cM0 1cM0 1cM0 S00 1HA0 Nc0 1C00 Dc0 1Nc0 Ao0 1h5A0 1a00 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1fA0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1fA0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1fA0 1o00 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00|12e5", "Europe/Gibraltar|GMT BST BDST CET CEST|0 -10 -20 -10 -20|010101010101010101010101010101010101010101010101012121212121010121010101010101010101034343434343434343434343434343434343434343434343434343434343434343434343434343434343434343434343434343434343434343|-2axa0 Rc0 1fA0 14M0 1fc0 1g00 1co0 1dc0 1co0 1oo0 1400 1dc0 19A0 1io0 1io0 WM0 1o00 14o0 1o00 17c0 1io0 17c0 1fA0 1a00 1lc0 17c0 1io0 17c0 1fA0 1a00 1io0 17c0 1io0 17c0 1fA0 1cM0 1io0 17c0 1fA0 1a00 1io0 17c0 1io0 17c0 1fA0 1a00 1io0 1qM0 Dc0 2Rz0 Dc0 1zc0 Oo0 1zc0 Rc0 1wo0 17c0 1iM0 FA0 xB0 1fA0 1a00 14o0 bb0 LA0 xB0 Rc0 1wo0 11A0 1o00 17c0 1fA0 1a00 1fA0 1cM0 1fA0 1a00 17c0 1fA0 1a00 1io0 17c0 1lc0 17c0 1fA0 10Jz0 1cM0 1cM0 1cM0 1cM0 1fA0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1fA0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1fA0 1o00 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00|30e3", "Europe/Helsinki|HMT EET EEST|-1D.N -20 -30|0121212121212121212121212121212121212121212121212121212121212121212121212121212121212121212121212121212121212121212121|-1WuND.N OULD.N 1dA0 1xGq0 1cM0 1cM0 1cM0 1cN0 1cM0 1cM0 1fA0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1fA0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1fA0 1o00 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00|12e5", "Europe/Kaliningrad|CET CEST CET CEST MSK MSD EEST EET +03|-10 -20 -20 -30 -30 -40 -30 -20 -30|0101010101010232454545454545454546767676767676767676767676767676767676767676787|-2aFe0 11d0 1iO0 11A0 1o00 11A0 Qrc0 6i00 WM0 1fA0 1cM0 1cM0 Am0 Lb0 1en0 op0 1pNz0 1db0 1cN0 1db0 1cN0 1db0 1dd0 1cO0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cN0 1cM0 1fA0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1fA0 1o00 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 8Hz0|44e4", "Europe/Kiev|KMT EET MSK CEST CET MSD EEST|-22.4 -20 -30 -20 -10 -40 -30|0123434252525252525252525256161616161616161616161616161616161616161616161616161616161616161616161616161616161616161616161|-1Pc22.4 eUo2.4 rnz0 2Hg0 WM0 1fA0 da0 1v4m0 1db0 1cN0 1db0 1cN0 1db0 1dd0 1cO0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 Db0 3220 1cK0 1cL0 1cN0 1cL0 1cN0 1cL0 1cQ0 1cM0 1fA0 1o00 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00|34e5", "Europe/Kirov|LMT +03 +04 +05|-3i.M -30 -40 -50|01232323232323232321212121212121212121212121212121212121212121|-22WM0 qH90 23CL0 1db0 1cN0 1db0 1cN0 1db0 1dd0 1cO0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 2pB0 1cM0 1fA0 1cM0 3Co0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1fA0 1o00 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 8Hz0|48e4", "Europe/Lisbon|LMT WET WEST WEMT CET CEST|A.J 0 -10 -20 -10 -20|012121212121212121212121212121212121212121212321232123212321212121212121212121212121212121212121214121212121212121212121212121212124545454212121212121212121212121212121212121212121212121212121212121212121212121212121212121|-2ldXn.f aPWn.f Sp0 LX0 1vc0 Tc0 1uM0 SM0 1vc0 Tc0 1vc0 SM0 1vc0 6600 1co0 3E00 17c0 1fA0 1a00 1io0 1a00 1io0 17c0 3I00 17c0 1cM0 1cM0 3Fc0 1cM0 1a00 1fA0 1io0 17c0 1cM0 1cM0 1a00 1fA0 1io0 1qM0 Dc0 1tA0 1cM0 1dc0 1400 gL0 IM0 s10 U00 dX0 Rc0 pd0 Rc0 gL0 Oo0 pd0 Rc0 gL0 Oo0 pd0 14o0 1cM0 1cP0 1cM0 1cM0 1cM0 1cM0 1cM0 3Co0 1fA0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1fA0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1fA0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 pvy0 1cM0 1cM0 1fA0 1cM0 1cM0 1cN0 1cL0 1cN0 1cM0 1cM0 1cM0 1cM0 1cN0 1cL0 1cM0 1fA0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1fA0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1fA0 1o00 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00|27e5", "Europe/Luxembourg|LMT CET CEST WET WEST WEST WET|-o.A -10 -20 0 -10 -20 -10|0121212134343434343434343434343434343434343434343434565651212121212121212121212121212121212121212121212121212121212121212121212121212121212121212121212121212121212121212121212121212121|-2DG0o.A t6mo.A TB0 1nX0 Up0 1o20 11A0 rW0 CM0 1qP0 R90 1EO0 UK0 1u20 10m0 1ip0 1in0 17e0 19W0 1fB0 1db0 1cp0 1in0 17d0 1fz0 1a10 1in0 1a10 1in0 17f0 1fA0 1a00 1io0 17c0 1cM0 1cM0 1a00 1io0 1cM0 1cM0 1a00 1fA0 1io0 17c0 1cM0 1cM0 1a00 1fA0 1io0 1qM0 Dc0 vA0 60L0 WM0 1fA0 1cM0 17c0 1io0 16M0 1C00 Uo0 1eeo0 1a00 1fA0 1cM0 1cM0 1cM0 1fA0 1a00 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1fA0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1fA0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1fA0 1o00 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00|54e4", "Europe/Madrid|WET WEST WEMT CET CEST|0 -10 -20 -10 -20|010101010101010101210343434343434343434343434343434343434343434343434343434343434343434343434343434343434343434343434343434343434343434343434343434343434343434343|-25Td0 19B0 1cL0 1dd0 b1z0 18p0 3HX0 17d0 1fz0 1a10 1io0 1a00 1in0 17d0 iIn0 Hd0 1cL0 bb0 1200 2s20 14n0 5aL0 Mp0 1vz0 17d0 1in0 17d0 1in0 17d0 1in0 17d0 6hX0 11B0 XHX0 1a10 1fz0 1a10 19X0 1cN0 1fz0 1a10 1fC0 1cM0 1cM0 1cM0 1fA0 1a00 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1fA0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1fA0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1fA0 1o00 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00|62e5", "Europe/Malta|CET CEST|-10 -20|0101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010|-2arB0 Lz0 1cN0 1db0 1410 1on0 Wp0 1qL0 17d0 1cL0 M3B0 5M20 WM0 1fA0 1co0 17c0 1iM0 16m0 1de0 1lc0 14m0 1lc0 WO0 1qM0 GTW0 On0 1C10 LA0 1C00 LA0 1EM0 LA0 1C00 LA0 1zc0 Oo0 1C00 Oo0 1co0 1cM0 1lA0 Xc0 1qq0 11z0 1o10 11z0 1o10 11z0 1o10 11z0 1o10 11z0 1iN0 19z0 1fB0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1fA0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1fA0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1fA0 1o00 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00|42e4", "Europe/Minsk|MMT EET MSK CEST CET MSD EEST +03|-1O -20 -30 -20 -10 -40 -30 -30|01234343252525252525252525261616161616161616161616161616161616161617|-1Pc1O eUnO qNX0 3gQ0 WM0 1fA0 1cM0 Al0 1tsn0 1db0 1cN0 1db0 1cN0 1db0 1dd0 1cO0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 3Fc0 1cN0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1fA0 1o00 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00 11A0 1qM0 WM0|19e5", "Europe/Monaco|PMT WET WEST WEMT CET CEST|-9.l 0 -10 -20 -10 -20|01212121212121212121212121212121212121212121212121232323232345454545454545454545454545454545454545454545454545454545454545454545454545454545454545454545454545454545454545454545454545454|-2nco9.l cNb9.l HA0 19A0 1iM0 11c0 1oo0 Wo0 1rc0 QM0 1EM0 UM0 1u00 10o0 1io0 1wo0 Rc0 1a00 1fA0 1cM0 1cM0 1io0 17c0 1fA0 1a00 1io0 1a00 1io0 17c0 1fA0 1a00 1io0 17c0 1cM0 1cM0 1a00 1io0 1cM0 1cM0 1a00 1fA0 1io0 17c0 1cM0 1cM0 1a00 1fA0 1io0 1qM0 Df0 2RV0 11z0 11B0 1ze0 WM0 1fA0 1cM0 1fa0 1aq0 16M0 1ekn0 1cL0 1fC0 1a00 1fA0 1cM0 1cM0 1cM0 1fA0 1a00 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1fA0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1fA0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1fA0 1o00 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00|38e3", "Europe/Moscow|MMT MMT MST MDST MSD MSK +05 EET EEST MSK|-2u.h -2v.j -3v.j -4v.j -40 -30 -50 -20 -30 -40|012132345464575454545454545454545458754545454545454545454545454545454545454595|-2ag2u.h 2pyW.W 1bA0 11X0 GN0 1Hb0 c4v.j ik0 3DA0 dz0 15A0 c10 2q10 iM10 23CL0 1db0 1cN0 1db0 1cN0 1db0 1dd0 1cO0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1fA0 1cM0 1cN0 IM0 rX0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1fA0 1o00 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 8Hz0|16e6", "Europe/Paris|PMT WET WEST CEST CET WEMT|-9.l 0 -10 -20 -10 -20|0121212121212121212121212121212121212121212121212123434352543434343434343434343434343434343434343434343434343434343434343434343434343434343434343434343434343434343434343434343434343434|-2nco8.l cNb8.l HA0 19A0 1iM0 11c0 1oo0 Wo0 1rc0 QM0 1EM0 UM0 1u00 10o0 1io0 1wo0 Rc0 1a00 1fA0 1cM0 1cM0 1io0 17c0 1fA0 1a00 1io0 1a00 1io0 17c0 1fA0 1a00 1io0 17c0 1cM0 1cM0 1a00 1io0 1cM0 1cM0 1a00 1fA0 1io0 17c0 1cM0 1cM0 1a00 1fA0 1io0 1qM0 Df0 Ik0 5M30 WM0 1fA0 1cM0 Vx0 hB0 1aq0 16M0 1ekn0 1cL0 1fC0 1a00 1fA0 1cM0 1cM0 1cM0 1fA0 1a00 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1fA0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1fA0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1fA0 1o00 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00|11e6", "Europe/Riga|RMT LST EET MSK CEST CET MSD EEST|-1A.y -2A.y -20 -30 -20 -10 -40 -30|010102345454536363636363636363727272727272727272727272727272727272727272727272727272727272727272727272727272727272727272727272|-25TzA.y 11A0 1iM0 ko0 gWm0 yDXA.y 2bX0 3fE0 WM0 1fA0 1cM0 1cM0 4m0 1sLy0 1db0 1cN0 1db0 1cN0 1db0 1dd0 1cO0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cN0 1cM0 1fA0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1fA0 1cM0 1cN0 1o00 11A0 1o00 11A0 1qM0 3oo0 1qM0 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00|64e4", "Europe/Rome|CET CEST|-10 -20|0101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010|-2arB0 Lz0 1cN0 1db0 1410 1on0 Wp0 1qL0 17d0 1cL0 M3B0 5M20 WM0 1fA0 1cM0 16M0 1iM0 16m0 1de0 1lc0 14m0 1lc0 WO0 1qM0 GTW0 On0 1C10 LA0 1C00 LA0 1EM0 LA0 1C00 LA0 1zc0 Oo0 1C00 Oo0 1C00 LA0 1zc0 Oo0 1C00 LA0 1C00 LA0 1zc0 Oo0 1C00 Oo0 1zc0 Oo0 1fC0 1a00 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1fA0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1fA0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1fA0 1o00 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00|39e5", "Europe/Samara|LMT +03 +04 +05|-3k.k -30 -40 -50|0123232323232323232121232323232323232323232323232323232323212|-22WM0 qH90 23CL0 1db0 1cN0 1db0 1cN0 1db0 1dd0 1cO0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 2pB0 1cM0 1fA0 2y10 14m0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1fA0 1o00 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00 2sp0 WM0|12e5", "Europe/Saratov|LMT +03 +04 +05|-34.i -30 -40 -50|012323232323232321212121212121212121212121212121212121212121212|-22WM0 qH90 23CL0 1db0 1cN0 1db0 1cN0 1db0 1dd0 1cO0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 2pB0 1cM0 1cM0 1cM0 1fA0 1cM0 3Co0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1fA0 1o00 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 8Hz0 5810", "Europe/Simferopol|SMT EET MSK CEST CET MSD EEST MSK|-2g -20 -30 -20 -10 -40 -30 -40|012343432525252525252525252161616525252616161616161616161616161616161616172|-1Pc2g eUog rEn0 2qs0 WM0 1fA0 1cM0 3V0 1u0L0 1db0 1cN0 1db0 1cN0 1db0 1dd0 1cO0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1Q00 4eL0 1cL0 1cN0 1cL0 1cN0 dX0 WL0 1cN0 1cL0 1fB0 1o30 11B0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11z0 1nW0|33e4", "Europe/Sofia|EET CET CEST EEST|-20 -10 -20 -30|01212103030303030303030303030303030303030303030303030303030303030303030303030303030303030303030303030303030303030303030303030|-168L0 WM0 1fA0 1cM0 1cM0 1cN0 1mKH0 1dd0 1fb0 1ap0 1fb0 1a20 1fy0 1a30 1cM0 1cM0 1cM0 1fA0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1fA0 1cK0 1cL0 1cN0 1cL0 1cN0 1cL0 1cN0 1cL0 1cN0 1cL0 1fB0 1nX0 11E0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00|12e5", "Europe/Stockholm|CET CEST|-10 -20|01010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010|-2azC0 TB0 2yDe0 1a00 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1fA0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1fA0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1fA0 1o00 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00|15e5", "Europe/Tallinn|TMT CET CEST EET MSK MSD EEST|-1D -10 -20 -20 -30 -40 -30|012103421212454545454545454546363636363636363636363636363636363636363636363636363636363636363636363636363636363636363636363|-26oND teD 11A0 1Ta0 4rXl KSLD 2FX0 2Jg0 WM0 1fA0 1cM0 18J0 1sTX0 1db0 1cN0 1db0 1cN0 1db0 1dd0 1cO0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cN0 1cM0 1fA0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1fA0 1o00 11A0 1o00 11A0 1o10 11A0 1qM0 5QM0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00|41e4", "Europe/Tirane|LMT CET CEST|-1j.k -10 -20|01212121212121212121212121212121212121212121212121212121212121212121212121212121212121212121212121212121212121212121212121212121212121|-2glBj.k 14pcj.k 5LC0 WM0 4M0 1fCK0 10n0 1op0 11z0 1pd0 11z0 1qN0 WL0 1qp0 Xb0 1qp0 Xb0 1qp0 11z0 1lB0 11z0 1qN0 11z0 1iN0 16n0 1dd0 1cO0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1fA0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1fA0 1o00 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00|42e4", "Europe/Ulyanovsk|LMT +03 +04 +05 +02|-3d.A -30 -40 -50 -20|01232323232323232321214121212121212121212121212121212121212121212|-22WM0 qH90 23CL0 1db0 1cN0 1db0 1cN0 1db0 1dd0 1cO0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 2pB0 1cM0 1fA0 2pB0 IM0 rX0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1fA0 1o00 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 8Hz0 3rd0", "Europe/Uzhgorod|CET CEST MSK MSD EET EEST|-10 -20 -30 -40 -20 -30|010101023232323232323232320454545454545454545454545454545454545454545454545454545454545454545454545454545454545454545454|-1cqL0 6i00 WM0 1fA0 1cM0 1ml0 1Cp0 1r3W0 1db0 1cN0 1db0 1cN0 1db0 1dd0 1cO0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1Q00 1Nf0 2pw0 1cL0 1cN0 1cL0 1cN0 1cL0 1cQ0 1cM0 1fA0 1o00 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00|11e4", "Europe/Vienna|CET CEST|-10 -20|0101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010|-2aFe0 11d0 1iO0 11A0 1o00 11A0 3KM0 14o0 LA00 6i00 WM0 1fA0 1cM0 1cM0 1cM0 400 2qM0 1a00 1cM0 1cM0 1io0 17c0 1gHa0 19X0 1cP0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1fA0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1fA0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1fA0 1o00 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00|18e5", "Europe/Vilnius|WMT KMT CET EET MSK CEST MSD EEST|-1o -1z.A -10 -20 -30 -20 -40 -30|012324525254646464646464646473737373737373737352537373737373737373737373737373737373737373737373737373737373737373737373|-293do 6ILM.o 1Ooz.A zz0 Mfd0 29W0 3is0 WM0 1fA0 1cM0 LV0 1tgL0 1db0 1cN0 1db0 1cN0 1db0 1dd0 1cO0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cN0 1cM0 1fA0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1fA0 1o00 11A0 1o00 11B0 1o00 11A0 1qM0 8io0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00|54e4", "Europe/Volgograd|LMT +03 +04 +05|-2V.E -30 -40 -50|01232323232323232121212121212121212121212121212121212121212121|-21IqV.E psLV.E 23CL0 1db0 1cN0 1db0 1cN0 1db0 1dd0 1cO0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 2pB0 1cM0 1cM0 1cM0 1fA0 1cM0 3Co0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1fA0 1o00 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 8Hz0|10e5", "Europe/Warsaw|WMT CET CEST EET EEST|-1o -10 -20 -20 -30|012121234312121212121212121212121212121212121212121212121212121212121212121212121212121212121212121212121212121212121212121212121212121212121212121212121212121212121|-2ctdo 1LXo 11d0 1iO0 11A0 1o00 11A0 1on0 11A0 6zy0 HWP0 5IM0 WM0 1fA0 1cM0 1dz0 1mL0 1en0 15B0 1aq0 1nA0 11A0 1io0 17c0 1fA0 1a00 iDX0 LA0 1cM0 1cM0 1C00 Oo0 1cM0 1cM0 1zc0 Oo0 1zc0 Oo0 1zc0 Oo0 1C00 LA0 uso0 1a00 1fA0 1cM0 1cM0 1cM0 1fA0 1a00 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1fA0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cN0 1cM0 1cM0 1cM0 1cM0 1fA0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1fA0 1o00 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00|17e5", "Europe/Zaporozhye|+0220 EET MSK CEST CET MSD EEST|-2k -20 -30 -20 -10 -40 -30|01234342525252525252525252526161616161616161616161616161616161616161616161616161616161616161616161616161616161616161616161|-1Pc2k eUok rdb0 2RE0 WM0 1fA0 8m0 1v9a0 1db0 1cN0 1db0 1cN0 1db0 1dd0 1cO0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1fA0 1cM0 1cK0 1cN0 1cL0 1cN0 1cL0 1cN0 1cL0 1cQ0 1cM0 1fA0 1o00 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00|77e4", "HST|HST|a0|0|", "Indian/Chagos|LMT +05 +06|-4N.E -50 -60|012|-2xosN.E 3AGLN.E|30e2", "Indian/Cocos|+0630|-6u|0||596", "Indian/Kerguelen|-00 +05|0 -50|01|-MG00|130", "Indian/Mahe|LMT +04|-3F.M -40|01|-2yO3F.M|79e3", "Indian/Maldives|MMT +05|-4S -50|01|-olgS|35e4", "Indian/Mauritius|LMT +04 +05|-3O -40 -50|012121|-2xorO 34unO 14L0 12kr0 11z0|15e4", "Indian/Reunion|LMT +04|-3F.Q -40|01|-2mDDF.Q|84e4", "Pacific/Kwajalein|+11 -12 +12|-b0 c0 -c0|012|-AX0 W9X0|14e3", "MET|MET MEST|-10 -20|01010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010|-2aFe0 11d0 1iO0 11A0 1o00 11A0 Qrc0 6i00 WM0 1fA0 1cM0 1cM0 1cM0 16M0 1gMM0 1a00 1fA0 1cM0 1cM0 1cM0 1fA0 1a00 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1fA0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1fA0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1fA0 1o00 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00", "MST|MST|70|0|", "MST7MDT|MST MDT MWT MPT|70 60 60 60|010102301010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010|-261r0 1nX0 11B0 1nX0 SgN0 8x20 ix0 QwN0 1cL0 1cN0 1cL0 1cN0 1cL0 1cN0 1cL0 1cN0 1fz0 1cN0 1cL0 1cN0 1cL0 s10 1Vz0 LB0 1BX0 1cN0 1fz0 1a10 1fz0 1cN0 1cL0 1cN0 1cL0 1cN0 1cL0 1cN0 1cL0 1cN0 1fz0 1a10 1fz0 1cN0 1cL0 1cN0 1cL0 1cN0 1cL0 14p0 1lb0 14p0 1nX0 11B0 1nX0 11B0 1nX0 14p0 1lb0 14p0 1lb0 14p0 1nX0 11B0 1nX0 11B0 1nX0 14p0 1lb0 14p0 1lb0 14p0 1lb0 14p0 1nX0 11B0 1nX0 11B0 1nX0 14p0 1lb0 14p0 1lb0 14p0 1nX0 11B0 1nX0 11B0 1nX0 Rd0 1zb0 Op0 1zb0 Op0 1zb0 Rd0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Rd0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Rd0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Rd0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Rd0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0", "Pacific/Chatham|+1215 +1245 +1345|-cf -cJ -dJ|012121212121212121212121212121212121212121212121212121212121212121212121212121212121212121212121212121212121212121212121212121212|-WqAf 1adef IM0 1C00 Rc0 1zc0 Oo0 1zc0 Oo0 1zc0 Oo0 1zc0 Oo0 1zc0 Oo0 1zc0 Rc0 1zc0 Oo0 1zc0 Oo0 1zc0 Oo0 1zc0 Oo0 1zc0 Oo0 1zc0 Rc0 1zc0 Oo0 1qM0 14o0 1lc0 14o0 1lc0 14o0 1lc0 17c0 1io0 17c0 1io0 17c0 1io0 17c0 1lc0 14o0 1lc0 14o0 1lc0 17c0 1io0 17c0 1io0 17c0 1lc0 14o0 1lc0 14o0 1lc0 17c0 1io0 17c0 1io0 17c0 1io0 17c0 1io0 1fA0 1a00 1fA0 1a00 1fA0 1a00 1fA0 1a00 1fA0 1cM0 1fA0 1a00 1fA0 1a00 1fA0 1a00 1fA0 1a00 1fA0 1a00 1fA0 1cM0 1fA0 1a00 1fA0 1a00 1fA0 1a00 1fA0 1a00 1fA0 1a00 1io0 1a00 1fA0 1a00 1fA0 1a00 1fA0 1a00 1fA0 1a00 1fA0 1cM0 1fA0 1a00 1fA0 1a00 1fA0 1a00 1fA0 1a00 1fA0 1a00 1fA0 1cM0 1fA0 1a00 1fA0 1a00|600", "PST8PDT|PST PDT PWT PPT|80 70 70 70|010102301010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010|-261q0 1nX0 11B0 1nX0 SgN0 8x10 iy0 QwN0 1cL0 1cN0 1cL0 1cN0 1cL0 1cN0 1cL0 1cN0 1fz0 1cN0 1cL0 1cN0 1cL0 s10 1Vz0 LB0 1BX0 1cN0 1fz0 1a10 1fz0 1cN0 1cL0 1cN0 1cL0 1cN0 1cL0 1cN0 1cL0 1cN0 1fz0 1a10 1fz0 1cN0 1cL0 1cN0 1cL0 1cN0 1cL0 14p0 1lb0 14p0 1nX0 11B0 1nX0 11B0 1nX0 14p0 1lb0 14p0 1lb0 14p0 1nX0 11B0 1nX0 11B0 1nX0 14p0 1lb0 14p0 1lb0 14p0 1lb0 14p0 1nX0 11B0 1nX0 11B0 1nX0 14p0 1lb0 14p0 1lb0 14p0 1nX0 11B0 1nX0 11B0 1nX0 Rd0 1zb0 Op0 1zb0 Op0 1zb0 Rd0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Rd0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Rd0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Rd0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Rd0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0", "Pacific/Apia|LMT -1130 -11 -10 +14 +13|bq.U bu b0 a0 -e0 -d0|01232345454545454545454545454545454545454545454545454545454|-2nDMx.4 1yW03.4 2rRbu 1ff0 1a00 CI0 AQ0 1cM0 1fA0 1a00 1fA0 1a00 1fA0 1a00 1fA0 1a00 1fA0 1a00 1fA0 1cM0 1fA0 1a00 1fA0 1a00 1fA0 1a00 1fA0 1a00 1fA0 1a00 1io0 1a00 1fA0 1a00 1fA0 1a00 1fA0 1a00 1fA0 1a00 1fA0 1cM0 1fA0 1a00 1fA0 1a00 1fA0 1a00 1fA0 1a00 1fA0 1a00 1fA0 1cM0 1fA0 1a00 1fA0 1a00|37e3", "Pacific/Bougainville|+10 +09 +11|-a0 -90 -b0|0102|-16Wy0 7CN0 2MQp0|18e4", "Pacific/Efate|LMT +11 +12|-bd.g -b0 -c0|0121212121212121212121|-2l9nd.g 2Szcd.g 1cL0 1oN0 10L0 1fB0 19X0 1fB0 1cL0 1cN0 1cL0 1cN0 1cL0 1cN0 1cL0 1cN0 1cL0 1fB0 Lz0 1Nd0 An0|66e3", "Pacific/Enderbury|-12 -11 +13|c0 b0 -d0|012|nIc0 B8n0|1", "Pacific/Fakaofo|-11 +13|b0 -d0|01|1Gfn0|483", "Pacific/Fiji|LMT +12 +13|-bT.I -c0 -d0|0121212121212121212121212121212121212121212121212121212121212121|-2bUzT.I 3m8NT.I LA0 1EM0 IM0 nJc0 LA0 1o00 Rc0 1wo0 Ao0 1Nc0 Ao0 1Q00 xz0 1SN0 uM0 1SM0 uM0 1VA0 s00 1VA0 uM0 1SM0 uM0 1SM0 uM0 1SM0 uM0 1VA0 s00 1VA0 s00 1VA0 uM0 1SM0 uM0 1SM0 uM0 1SM0 uM0 1VA0 s00 1VA0 uM0 1SM0 uM0 1SM0 uM0 1SM0 uM0 1VA0 s00 1VA0 s00 1VA0 uM0 1SM0 uM0 1SM0 uM0 1SM0 uM0|88e4", "Pacific/Galapagos|LMT -05 -06|5W.o 50 60|01212|-1yVS1.A 2dTz1.A gNd0 rz0|25e3", "Pacific/Gambier|LMT -09|8X.M 90|01|-2jof0.c|125", "Pacific/Guadalcanal|LMT +11|-aD.M -b0|01|-2joyD.M|11e4", "Pacific/Guam|GST ChST|-a0 -a0|01|1fpq0|17e4", "Pacific/Honolulu|HST HDT HST|au 9u a0|010102|-1thLu 8x0 lef0 8Pz0 46p0|37e4", "Pacific/Kiritimati|-1040 -10 +14|aE a0 -e0|012|nIaE B8nk|51e2", "Pacific/Kosrae|+11 +12|-b0 -c0|010|-AX0 1bdz0|66e2", "Pacific/Majuro|+11 +12|-b0 -c0|01|-AX0|28e3", "Pacific/Marquesas|LMT -0930|9i 9u|01|-2joeG|86e2", "Pacific/Pago_Pago|LMT SST|bm.M b0|01|-2nDMB.c|37e2", "Pacific/Nauru|LMT +1130 +09 +12|-b7.E -bu -90 -c0|01213|-1Xdn7.E PvzB.E 5RCu 1ouJu|10e3", "Pacific/Niue|-1120 -1130 -11|bk bu b0|012|-KfME 17y0a|12e2", "Pacific/Norfolk|+1112 +1130 +1230 +11|-bc -bu -cu -b0|01213|-Kgbc W01G On0 1COp0|25e4", "Pacific/Noumea|LMT +11 +12|-b5.M -b0 -c0|01212121|-2l9n5.M 2EqM5.M xX0 1PB0 yn0 HeP0 Ao0|98e3", "Pacific/Pitcairn|-0830 -08|8u 80|01|18Vku|56", "Pacific/Rarotonga|-1030 -0930 -10|au 9u a0|012121212121212121212121212|lyWu IL0 1zcu Onu 1zcu Onu 1zcu Rbu 1zcu Onu 1zcu Onu 1zcu Onu 1zcu Onu 1zcu Onu 1zcu Rbu 1zcu Onu 1zcu Onu 1zcu Onu|13e3", "Pacific/Tahiti|LMT -10|9W.g a0|01|-2joe1.I|18e4", "Pacific/Tongatapu|+1220 +13 +14|-ck -d0 -e0|0121212121212121212121212121212121212121212121212121|-1aB0k 2n5dk 15A0 1wo0 xz0 1Q10 xz0 zWN0 s00 1VA0 uM0 1SM0 uM0 1SM0 uM0 1SM0 uM0 1VA0 s00 1VA0 s00 1VA0 uM0 1SM0 uM0 1SM0 uM0 1SM0 uM0 1VA0 s00 1VA0 uM0 1SM0 uM0 1SM0 uM0 1SM0 uM0 1VA0 s00 1VA0 s00 1VA0 uM0 1SM0 uM0 1SM0 uM0 1SM0 uM0|75e3", "WET|WET WEST|0 -10|010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010|hDB0 1a00 1fA0 1cM0 1cM0 1cM0 1fA0 1a00 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1fA0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1fA0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1fA0 1o00 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00"],
        links: ["Africa/Abidjan|Africa/Bamako", "Africa/Abidjan|Africa/Banjul", "Africa/Abidjan|Africa/Conakry", "Africa/Abidjan|Africa/Dakar", "Africa/Abidjan|Africa/Freetown", "Africa/Abidjan|Africa/Lome", "Africa/Abidjan|Africa/Nouakchott", "Africa/Abidjan|Africa/Ouagadougou", "Africa/Abidjan|Africa/Sao_Tome", "Africa/Abidjan|Africa/Timbuktu", "Africa/Abidjan|Atlantic/St_Helena", "Africa/Cairo|Egypt", "Africa/Johannesburg|Africa/Maseru", "Africa/Johannesburg|Africa/Mbabane", "Africa/Khartoum|Africa/Juba", "Africa/Lagos|Africa/Bangui", "Africa/Lagos|Africa/Brazzaville", "Africa/Lagos|Africa/Douala", "Africa/Lagos|Africa/Kinshasa", "Africa/Lagos|Africa/Libreville", "Africa/Lagos|Africa/Luanda", "Africa/Lagos|Africa/Malabo", "Africa/Lagos|Africa/Niamey", "Africa/Lagos|Africa/Porto-Novo", "Africa/Maputo|Africa/Blantyre", "Africa/Maputo|Africa/Bujumbura", "Africa/Maputo|Africa/Gaborone", "Africa/Maputo|Africa/Harare", "Africa/Maputo|Africa/Kigali", "Africa/Maputo|Africa/Lubumbashi", "Africa/Maputo|Africa/Lusaka", "Africa/Nairobi|Africa/Addis_Ababa", "Africa/Nairobi|Africa/Asmara", "Africa/Nairobi|Africa/Asmera", "Africa/Nairobi|Africa/Dar_es_Salaam", "Africa/Nairobi|Africa/Djibouti", "Africa/Nairobi|Africa/Kampala", "Africa/Nairobi|Africa/Mogadishu", "Africa/Nairobi|Indian/Antananarivo", "Africa/Nairobi|Indian/Comoro", "Africa/Nairobi|Indian/Mayotte", "Africa/Tripoli|Libya", "America/Adak|America/Atka", "America/Adak|US/Aleutian", "America/Anchorage|US/Alaska", "America/Argentina/Buenos_Aires|America/Buenos_Aires", "America/Argentina/Catamarca|America/Argentina/ComodRivadavia", "America/Argentina/Catamarca|America/Catamarca", "America/Argentina/Cordoba|America/Cordoba", "America/Argentina/Cordoba|America/Rosario", "America/Argentina/Jujuy|America/Jujuy", "America/Argentina/Mendoza|America/Mendoza", "America/Atikokan|America/Coral_Harbour", "America/Chicago|US/Central", "America/Curacao|America/Aruba", "America/Curacao|America/Kralendijk", "America/Curacao|America/Lower_Princes", "America/Denver|America/Shiprock", "America/Denver|Navajo", "America/Denver|US/Mountain", "America/Detroit|US/Michigan", "America/Edmonton|Canada/Mountain", "America/Fort_Wayne|America/Indiana/Indianapolis", "America/Fort_Wayne|America/Indianapolis", "America/Fort_Wayne|US/East-Indiana", "America/Halifax|Canada/Atlantic", "America/Havana|Cuba", "America/Indiana/Knox|America/Knox_IN", "America/Indiana/Knox|US/Indiana-Starke", "America/Jamaica|Jamaica", "America/Kentucky/Louisville|America/Louisville", "America/Los_Angeles|US/Pacific", "America/Los_Angeles|US/Pacific-New", "America/Manaus|Brazil/West", "America/Mazatlan|Mexico/BajaSur", "America/Mexico_City|Mexico/General", "America/New_York|US/Eastern", "America/Noronha|Brazil/DeNoronha", "America/Panama|America/Cayman", "America/Phoenix|US/Arizona", "America/Port_of_Spain|America/Anguilla", "America/Port_of_Spain|America/Antigua", "America/Port_of_Spain|America/Dominica", "America/Port_of_Spain|America/Grenada", "America/Port_of_Spain|America/Guadeloupe", "America/Port_of_Spain|America/Marigot", "America/Port_of_Spain|America/Montserrat", "America/Port_of_Spain|America/St_Barthelemy", "America/Port_of_Spain|America/St_Kitts", "America/Port_of_Spain|America/St_Lucia", "America/Port_of_Spain|America/St_Thomas", "America/Port_of_Spain|America/St_Vincent", "America/Port_of_Spain|America/Tortola", "America/Port_of_Spain|America/Virgin", "America/Regina|Canada/East-Saskatchewan", "America/Regina|Canada/Saskatchewan", "America/Rio_Branco|America/Porto_Acre", "America/Rio_Branco|Brazil/Acre", "America/Santiago|Chile/Continental", "America/Sao_Paulo|Brazil/East", "America/St_Johns|Canada/Newfoundland", "America/Tijuana|America/Ensenada", "America/Tijuana|America/Santa_Isabel", "America/Tijuana|Mexico/BajaNorte", "America/Toronto|America/Montreal", "America/Toronto|Canada/Eastern", "America/Vancouver|Canada/Pacific", "America/Whitehorse|Canada/Yukon", "America/Winnipeg|Canada/Central", "Asia/Ashgabat|Asia/Ashkhabad", "Asia/Bangkok|Asia/Phnom_Penh", "Asia/Bangkok|Asia/Vientiane", "Asia/Dhaka|Asia/Dacca", "Asia/Dubai|Asia/Muscat", "Asia/Ho_Chi_Minh|Asia/Saigon", "Asia/Hong_Kong|Hongkong", "Asia/Jerusalem|Asia/Tel_Aviv", "Asia/Jerusalem|Israel", "Asia/Kathmandu|Asia/Katmandu", "Asia/Kolkata|Asia/Calcutta", "Asia/Kuala_Lumpur|Asia/Singapore", "Asia/Kuala_Lumpur|Singapore", "Asia/Macau|Asia/Macao", "Asia/Makassar|Asia/Ujung_Pandang", "Asia/Nicosia|Europe/Nicosia", "Asia/Qatar|Asia/Bahrain", "Asia/Rangoon|Asia/Yangon", "Asia/Riyadh|Asia/Aden", "Asia/Riyadh|Asia/Kuwait", "Asia/Seoul|ROK", "Asia/Shanghai|Asia/Chongqing", "Asia/Shanghai|Asia/Chungking", "Asia/Shanghai|Asia/Harbin", "Asia/Shanghai|PRC", "Asia/Taipei|ROC", "Asia/Tehran|Iran", "Asia/Thimphu|Asia/Thimbu", "Asia/Tokyo|Japan", "Asia/Ulaanbaatar|Asia/Ulan_Bator", "Asia/Urumqi|Asia/Kashgar", "Atlantic/Faroe|Atlantic/Faeroe", "Atlantic/Reykjavik|Iceland", "Atlantic/South_Georgia|Etc/GMT+2", "Australia/Adelaide|Australia/South", "Australia/Brisbane|Australia/Queensland", "Australia/Broken_Hill|Australia/Yancowinna", "Australia/Darwin|Australia/North", "Australia/Hobart|Australia/Tasmania", "Australia/Lord_Howe|Australia/LHI", "Australia/Melbourne|Australia/Victoria", "Australia/Perth|Australia/West", "Australia/Sydney|Australia/ACT", "Australia/Sydney|Australia/Canberra", "Australia/Sydney|Australia/NSW", "Etc/GMT+0|Etc/GMT", "Etc/GMT+0|Etc/GMT-0", "Etc/GMT+0|Etc/GMT0", "Etc/GMT+0|Etc/Greenwich", "Etc/GMT+0|GMT", "Etc/GMT+0|GMT+0", "Etc/GMT+0|GMT-0", "Etc/GMT+0|GMT0", "Etc/GMT+0|Greenwich", "Etc/UCT|UCT", "Etc/UTC|Etc/Universal", "Etc/UTC|Etc/Zulu", "Etc/UTC|UTC", "Etc/UTC|Universal", "Etc/UTC|Zulu", "Europe/Belgrade|Europe/Ljubljana", "Europe/Belgrade|Europe/Podgorica", "Europe/Belgrade|Europe/Sarajevo", "Europe/Belgrade|Europe/Skopje", "Europe/Belgrade|Europe/Zagreb", "Europe/Chisinau|Europe/Tiraspol", "Europe/Dublin|Eire", "Europe/Helsinki|Europe/Mariehamn", "Europe/Istanbul|Asia/Istanbul", "Europe/Istanbul|Turkey", "Europe/Lisbon|Portugal", "Europe/London|Europe/Belfast", "Europe/London|Europe/Guernsey", "Europe/London|Europe/Isle_of_Man", "Europe/London|Europe/Jersey", "Europe/London|GB", "Europe/London|GB-Eire", "Europe/Moscow|W-SU", "Europe/Oslo|Arctic/Longyearbyen", "Europe/Oslo|Atlantic/Jan_Mayen", "Europe/Prague|Europe/Bratislava", "Europe/Rome|Europe/San_Marino", "Europe/Rome|Europe/Vatican", "Europe/Warsaw|Poland", "Europe/Zurich|Europe/Busingen", "Europe/Zurich|Europe/Vaduz", "Indian/Christmas|Etc/GMT-7", "Pacific/Auckland|Antarctica/McMurdo", "Pacific/Auckland|Antarctica/South_Pole", "Pacific/Auckland|NZ", "Pacific/Chatham|NZ-CHAT", "Pacific/Easter|Chile/EasterIsland", "Pacific/Guam|Pacific/Saipan", "Pacific/Honolulu|Pacific/Johnston", "Pacific/Honolulu|US/Hawaii", "Pacific/Kwajalein|Kwajalein", "Pacific/Pago_Pago|Pacific/Midway", "Pacific/Pago_Pago|Pacific/Samoa", "Pacific/Pago_Pago|US/Samoa", "Pacific/Palau|Etc/GMT-9", "Pacific/Pohnpei|Etc/GMT-11", "Pacific/Pohnpei|Pacific/Ponape", "Pacific/Port_Moresby|Etc/GMT-10", "Pacific/Port_Moresby|Pacific/Chuuk", "Pacific/Port_Moresby|Pacific/Truk", "Pacific/Port_Moresby|Pacific/Yap", "Pacific/Tarawa|Etc/GMT-12", "Pacific/Tarawa|Pacific/Funafuti", "Pacific/Tarawa|Pacific/Wake", "Pacific/Tarawa|Pacific/Wallis"]
    }), t
}), function (t) {
    "function" == typeof define && define.amd ? define(["jquery"], t) : t("object" == typeof exports ? require("jquery") : jQuery)
}(function (t) {
    function e(e, i, o) {
        var i = {
            content: {
                message: "object" == typeof i ? i.message : i,
                title: i.title ? i.title : "",
                icon: i.icon ? i.icon : "",
                url: i.url ? i.url : "#",
                target: i.target ? i.target : "-"
            }
        };
        o = t.extend(!0, {}, i, o), this.settings = t.extend(!0, {}, n, o), this._defaults = n, "-" == this.settings.content.target && (this.settings.content.target = this.settings.url_target), this.animations = {
            start: "webkitAnimationStart oanimationstart MSAnimationStart animationstart",
            end: "webkitAnimationEnd oanimationend MSAnimationEnd animationend"
        }, "number" == typeof this.settings.offset && (this.settings.offset = {
            x: this.settings.offset,
            y: this.settings.offset
        }), this.init()
    }

    var n = {
        element: "body",
        position: null,
        type: "info",
        allow_dismiss: !0,
        newest_on_top: !1,
        showProgressbar: !1,
        placement: {from: "top", align: "right"},
        offset: 20,
        spacing: 10,
        z_index: 1031,
        delay: 5e3,
        timer: 1e3,
        url_target: "_blank",
        mouse_over: null,
        animate: {enter: "animated fadeInDown", exit: "animated fadeOutUp"},
        onShow: null,
        onShown: null,
        onClose: null,
        onClosed: null,
        icon_type: "class",
        template: '<div data-notify="container" class="col-xs-11 col-sm-4 alert alert-{0}" role="alert"><button type="button" aria-hidden="true" class="close" data-notify="dismiss">&times;</button><span data-notify="icon"></span> <span data-notify="title">{1}</span> <span data-notify="message">{2}</span><div class="progress" data-notify="progressbar"><div class="progress-bar progress-bar-{0}" role="progressbar" aria-valuenow="0" aria-valuemin="0" aria-valuemax="100" style="width: 0%;"></div></div><a href="{3}" target="{4}" data-notify="url"></a></div>'
    };
    String.format = function () {
        for (var t = arguments[0], e = 1; e < arguments.length; e++) t = t.replace(RegExp("\\{" + (e - 1) + "\\}", "gm"), arguments[e]);
        return t
    }, t.extend(e.prototype, {
        init: function () {
            var t = this;
            this.buildNotify(), this.settings.content.icon && this.setIcon(), "#" != this.settings.content.url && this.styleURL(), this.placement(), this.bind(), this.notify = {
                $ele: this.$ele,
                update: function (e, n) {
                    var i = {};
                    "string" == typeof e ? i[e] = n : i = e;
                    for (var e in i) switch (e) {
                        case"type":
                            this.$ele.removeClass("alert-" + t.settings.type), this.$ele.find('[data-notify="progressbar"] > .progress-bar').removeClass("progress-bar-" + t.settings.type), t.settings.type = i[e], this.$ele.addClass("alert-" + i[e]).find('[data-notify="progressbar"] > .progress-bar').addClass("progress-bar-" + i[e]);
                            break;
                        case"icon":
                            var o = this.$ele.find('[data-notify="icon"]');
                            "class" == t.settings.icon_type.toLowerCase() ? o.removeClass(t.settings.content.icon).addClass(i[e]) : (o.is("img") || o.find("img"), o.attr("src", i[e]));
                            break;
                        case"progress":
                            var s = t.settings.delay - t.settings.delay * (i[e] / 100);
                            this.$ele.data("notify-delay", s), this.$ele.find('[data-notify="progressbar"] > div').attr("aria-valuenow", i[e]).css("width", i[e] + "%");
                            break;
                        case"url":
                            this.$ele.find('[data-notify="url"]').attr("href", i[e]);
                            break;
                        case"target":
                            this.$ele.find('[data-notify="url"]').attr("target", i[e]);
                            break;
                        default:
                            this.$ele.find('[data-notify="' + e + '"]').html(i[e])
                    }
                    var a = this.$ele.outerHeight() + parseInt(t.settings.spacing) + parseInt(t.settings.offset.y);
                    t.reposition(a)
                },
                close: function () {
                    t.close()
                }
            }
        }, buildNotify: function () {
            var e = this.settings.content;
            this.$ele = t(String.format(this.settings.template, this.settings.type, e.title, e.message, e.url, e.target)), this.$ele.attr("data-notify-position", this.settings.placement.from + "-" + this.settings.placement.align), this.settings.allow_dismiss || this.$ele.find('[data-notify="dismiss"]').css("display", "none"), (this.settings.delay <= 0 && !this.settings.showProgressbar || !this.settings.showProgressbar) && this.$ele.find('[data-notify="progressbar"]').remove()
        }, setIcon: function () {
            "class" == this.settings.icon_type.toLowerCase() ? this.$ele.find('[data-notify="icon"]').addClass(this.settings.content.icon) : this.$ele.find('[data-notify="icon"]').is("img") ? this.$ele.find('[data-notify="icon"]').attr("src", this.settings.content.icon) : this.$ele.find('[data-notify="icon"]').append('<img src="' + this.settings.content.icon + '" alt="Notify Icon" />')
        }, styleURL: function () {
            this.$ele.find('[data-notify="url"]').css({
                backgroundImage: "url(data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7)",
                height: "100%",
                left: "0px",
                position: "absolute",
                top: "0px",
                width: "100%",
                zIndex: this.settings.z_index + 1
            }), this.$ele.find('[data-notify="dismiss"]').css({
                position: "absolute",
                right: "10px",
                top: "5px",
                zIndex: this.settings.z_index + 2
            })
        }, placement: function () {
            var e = this, n = this.settings.offset.y, i = {
                display: "inline-block",
                margin: "0px auto",
                position: this.settings.position ? this.settings.position : "body" === this.settings.element ? "fixed" : "absolute",
                transition: "all .5s ease-in-out",
                zIndex: this.settings.z_index
            }, o = !1, s = this.settings;
            switch (t('[data-notify-position="' + this.settings.placement.from + "-" + this.settings.placement.align + '"]:not([data-closing="true"])').each(function () {
                return n = Math.max(n, parseInt(t(this).css(s.placement.from)) + parseInt(t(this).outerHeight()) + parseInt(s.spacing))
            }), 1 == this.settings.newest_on_top && (n = this.settings.offset.y), i[this.settings.placement.from] = n + "px", this.settings.placement.align) {
                case"left":
                case"right":
                    i[this.settings.placement.align] = this.settings.offset.x + "px";
                    break;
                case"center":
                    i.left = 0, i.right = 0
            }
            this.$ele.css(i).addClass(this.settings.animate.enter), t.each(Array("webkit", "moz", "o", "ms", ""), function (t, n) {
                e.$ele[0].style[n + "AnimationIterationCount"] = 1
            }), t(this.settings.element).append(this.$ele), 1 == this.settings.newest_on_top && (n = parseInt(n) + parseInt(this.settings.spacing) + this.$ele.outerHeight(), this.reposition(n)), t.isFunction(e.settings.onShow) && e.settings.onShow.call(this.$ele), this.$ele.one(this.animations.start, function () {
                o = !0
            }).one(this.animations.end, function () {
                t.isFunction(e.settings.onShown) && e.settings.onShown.call(this)
            }), setTimeout(function () {
                o || t.isFunction(e.settings.onShown) && e.settings.onShown.call(this)
            }, 600)
        }, bind: function () {
            var e = this;
            if (this.$ele.find('[data-notify="dismiss"]').on("click", function () {
                    e.close()
                }), this.$ele.mouseover(function () {
                    t(this).data("data-hover", "true")
                }).mouseout(function () {
                    t(this).data("data-hover", "false")
                }), this.$ele.data("data-hover", "false"), this.settings.delay > 0) {
                e.$ele.data("notify-delay", e.settings.delay);
                var n = setInterval(function () {
                    var t = parseInt(e.$ele.data("notify-delay")) - e.settings.timer;
                    if ("false" === e.$ele.data("data-hover") && "pause" == e.settings.mouse_over || "pause" != e.settings.mouse_over) {
                        var i = (e.settings.delay - t) / e.settings.delay * 100;
                        e.$ele.data("notify-delay", t), e.$ele.find('[data-notify="progressbar"] > div').attr("aria-valuenow", i).css("width", i + "%")
                    }
                    t <= -e.settings.timer && (clearInterval(n), e.close())
                }, e.settings.timer)
            }
        }, close: function () {
            var e = this, n = parseInt(this.$ele.css(this.settings.placement.from)), i = !1;
            this.$ele.data("closing", "true").addClass(this.settings.animate.exit), e.reposition(n), t.isFunction(e.settings.onClose) && e.settings.onClose.call(this.$ele), this.$ele.one(this.animations.start, function () {
                i = !0
            }).one(this.animations.end, function () {
                t(this).remove(), t.isFunction(e.settings.onClosed) && e.settings.onClosed.call(this)
            }), setTimeout(function () {
                i || (e.$ele.remove(), e.settings.onClosed && e.settings.onClosed(e.$ele))
            }, 600)
        }, reposition: function (e) {
            var n = this,
                i = '[data-notify-position="' + this.settings.placement.from + "-" + this.settings.placement.align + '"]:not([data-closing="true"])',
                o = this.$ele.nextAll(i);
            1 == this.settings.newest_on_top && (o = this.$ele.prevAll(i)), o.each(function () {
                t(this).css(n.settings.placement.from, e), e = parseInt(e) + parseInt(n.settings.spacing) + t(this).outerHeight()
            })
        }
    }), t.notify = function (t, n) {
        return new e(this, t, n).notify
    }, t.notifyDefaults = function (e) {
        return n = t.extend(!0, {}, n, e)
    }, t.notifyClose = function (e) {
        void 0 === e || "all" == e ? t("[data-notify]").find('[data-notify="dismiss"]').trigger("click") : t('[data-notify-position="' + e + '"]').find('[data-notify="dismiss"]').trigger("click")
    }
}), function (t) {
    "use strict";
    var e = function (n, i) {
        this.$element = t(n), this.options = t.extend({}, e.defaults, i)
    };
    e.defaults = {
        transition_delay: 300,
        refresh_speed: 50,
        display_text: "none",
        use_percentage: !0,
        percent_format: function (t) {
            return t + "%"
        },
        amount_format: function (t, e) {
            return t + " / " + e
        },
        update: t.noop,
        done: t.noop,
        fail: t.noop
    }, e.prototype.transition = function () {
        var n = this.$element, i = n.parent(), o = this.$back_text, s = this.$front_text, a = this.options,
            r = parseInt(n.attr("data-transitiongoal")), c = parseInt(n.attr("aria-valuemin")) || 0,
            l = parseInt(n.attr("aria-valuemax")) || 100, d = i.hasClass("vertical"),
            p = a.update && "function" == typeof a.update ? a.update : e.defaults.update,
            u = a.done && "function" == typeof a.done ? a.done : e.defaults.done,
            f = a.fail && "function" == typeof a.fail ? a.fail : e.defaults.fail;
        if (isNaN(r)) return void f("data-transitiongoal not set");
        var h = Math.round(100 * (r - c) / (l - c));
        if ("center" === a.display_text && !o && !s) {
            this.$back_text = o = t("<span>").addClass("progressbar-back-text").prependTo(i), this.$front_text = s = t("<span>").addClass("progressbar-front-text").prependTo(n);
            var M;
            d ? (M = i.css("height"), o.css({height: M, "line-height": M}), s.css({
                height: M,
                "line-height": M
            }), t(window).resize(function () {
                M = i.css("height"), o.css({height: M, "line-height": M}), s.css({height: M, "line-height": M})
            })) : (M = i.css("width"), s.css({width: M}), t(window).resize(function () {
                M = i.css("width"), s.css({width: M})
            }))
        }
        setTimeout(function () {
            var t, e, f, M, b;
            d ? n.css("height", h + "%") : n.css("width", h + "%");
            var m = setInterval(function () {
                d ? (f = n.height(), M = i.height()) : (f = n.width(), M = i.width()), t = Math.round(100 * f / M), e = Math.round(c + f / M * (l - c)), t >= h && (t = h, e = r, u(n), clearInterval(m)), "none" !== a.display_text && (b = a.use_percentage ? a.percent_format(t) : a.amount_format(e, l, c), "fill" === a.display_text ? n.text(b) : "center" === a.display_text && (o.text(b), s.text(b))), n.attr("aria-valuenow", e), p(t, n)
            }, a.refresh_speed)
        }, a.transition_delay)
    };
    var n = t.fn.progressbar;
    t.fn.progressbar = function (n) {
        return this.each(function () {
            var i = t(this), o = i.data("bs.progressbar"), s = "object" == typeof n && n;
            o && s && t.extend(o.options, s), o || i.data("bs.progressbar", o = new e(this, s)), o.transition()
        })
    }, t.fn.progressbar.Constructor = e, t.fn.progressbar.noConflict = function () {
        return t.fn.progressbar = n, this
    }
}(window.jQuery);
var _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (t) {
    return typeof t
} : function (t) {
    return t && "function" == typeof Symbol && t.constructor === Symbol && t !== Symbol.prototype ? "symbol" : typeof t
}, windowIsDefined = "object" === ("undefined" == typeof window ? "undefined" : _typeof(window));
if (function (t) {
        if ("function" == typeof define && define.amd) define(["jquery"], t); else if ("object" === ("undefined" == typeof module ? "undefined" : _typeof(module)) && module.exports) {
            var e;
            try {
                e = require("jquery")
            } catch (t) {
                e = null
            }
            module.exports = t(e)
        } else window && (window.Slider = t(window.jQuery))
    }(function (t) {
        var e = "slider", n = "bootstrapSlider";
        windowIsDefined && !window.console && (window.console = {}), windowIsDefined && !window.console.log && (window.console.log = function () {
        }), windowIsDefined && !window.console.warn && (window.console.warn = function () {
        });
        var i;
        return function (t) {
            function e() {
            }

            function n(t) {
                function n(e) {
                    e.prototype.option || (e.prototype.option = function (e) {
                        t.isPlainObject(e) && (this.options = t.extend(!0, this.options, e))
                    })
                }

                function o(e, n) {
                    t.fn[e] = function (o) {
                        if ("string" == typeof o) {
                            for (var a = i.call(arguments, 1), r = 0, c = this.length; c > r; r++) {
                                var l = this[r], d = t.data(l, e);
                                if (d) if (t.isFunction(d[o]) && "_" !== o.charAt(0)) {
                                    var p = d[o].apply(d, a);
                                    if (void 0 !== p && p !== d) return p
                                } else s("no such method '" + o + "' for " + e + " instance"); else s("cannot call methods on " + e + " prior to initialization; attempted to call '" + o + "'")
                            }
                            return this
                        }
                        var u = this.map(function () {
                            var i = t.data(this, e);
                            return i ? (i.option(o), i._init()) : (i = new n(this, o), t.data(this, e, i)), t(this)
                        });
                        return !u || u.length > 1 ? u : u[0]
                    }
                }

                if (t) {
                    var s = "undefined" == typeof console ? e : function (t) {
                        console.error(t)
                    };
                    return t.bridget = function (t, e) {
                        n(e), o(t, e)
                    }, t.bridget
                }
            }

            var i = Array.prototype.slice;
            n(t)
        }(t), function (t) {
            function o(e, n) {
                function i(t, e) {
                    var n = "data-slider-" + e.replace(/_/g, "-"), i = t.getAttribute(n);
                    try {
                        return JSON.parse(i)
                    } catch (t) {
                        return i
                    }
                }

                this._state = {
                    value: null,
                    enabled: null,
                    offset: null,
                    size: null,
                    percentage: null,
                    inDrag: !1,
                    over: !1
                }, this.ticksCallbackMap = {}, this.handleCallbackMap = {}, "string" == typeof e ? this.element = document.querySelector(e) : e instanceof HTMLElement && (this.element = e), n = n || {};
                for (var o = Object.keys(this.defaultOptions), s = 0; s < o.length; s++) {
                    var r = o[s], c = n[r];
                    c = void 0 !== c ? c : i(this.element, r), c = null !== c ? c : this.defaultOptions[r], this.options || (this.options = {}), this.options[r] = c
                }
                "auto" === this.options.rtl && (this.options.rtl = "rtl" === window.getComputedStyle(this.element).direction), "vertical" !== this.options.orientation || "top" !== this.options.tooltip_position && "bottom" !== this.options.tooltip_position ? "horizontal" !== this.options.orientation || "left" !== this.options.tooltip_position && "right" !== this.options.tooltip_position || (this.options.tooltip_position = "top") : this.options.rtl ? this.options.tooltip_position = "left" : this.options.tooltip_position = "right";
                var l, d, p, u, f, h = this.element.style.width, M = !1, b = this.element.parentNode;
                if (this.sliderElem) M = !0; else {
                    this.sliderElem = document.createElement("div"), this.sliderElem.className = "slider";
                    var m = document.createElement("div");
                    m.className = "slider-track", d = document.createElement("div"), d.className = "slider-track-low", l = document.createElement("div"), l.className = "slider-selection", p = document.createElement("div"), p.className = "slider-track-high", u = document.createElement("div"), u.className = "slider-handle min-slider-handle", u.setAttribute("role", "slider"), u.setAttribute("aria-valuemin", this.options.min), u.setAttribute("aria-valuemax", this.options.max), f = document.createElement("div"), f.className = "slider-handle max-slider-handle", f.setAttribute("role", "slider"), f.setAttribute("aria-valuemin", this.options.min), f.setAttribute("aria-valuemax", this.options.max), m.appendChild(d), m.appendChild(l), m.appendChild(p), this.rangeHighlightElements = [];
                    var A = this.options.rangeHighlights;
                    if (Array.isArray(A) && A.length > 0) for (var g = 0; g < A.length; g++) {
                        var z = document.createElement("div"), v = A[g]["class"] || "";
                        z.className = "slider-rangeHighlight slider-selection " + v, this.rangeHighlightElements.push(z), m.appendChild(z)
                    }
                    var y = Array.isArray(this.options.labelledby);
                    if (y && this.options.labelledby[0] && u.setAttribute("aria-labelledby", this.options.labelledby[0]), y && this.options.labelledby[1] && f.setAttribute("aria-labelledby", this.options.labelledby[1]), !y && this.options.labelledby && (u.setAttribute("aria-labelledby", this.options.labelledby), f.setAttribute("aria-labelledby", this.options.labelledby)), this.ticks = [], Array.isArray(this.options.ticks) && this.options.ticks.length > 0) {
                        for (this.ticksContainer = document.createElement("div"), this.ticksContainer.className = "slider-tick-container", s = 0; s < this.options.ticks.length; s++) {
                            var L = document.createElement("div");
                            if (L.className = "slider-tick", this.options.ticks_tooltip) {
                                var O = this._addTickListener(), T = O.addMouseEnter(this, L, s),
                                    N = O.addMouseLeave(this, L);
                                this.ticksCallbackMap[s] = {mouseEnter: T, mouseLeave: N}
                            }
                            this.ticks.push(L), this.ticksContainer.appendChild(L)
                        }
                        l.className += " tick-slider-selection"
                    }
                    if (this.tickLabels = [], Array.isArray(this.options.ticks_labels) && this.options.ticks_labels.length > 0) for (this.tickLabelContainer = document.createElement("div"), this.tickLabelContainer.className = "slider-tick-label-container", s = 0; s < this.options.ticks_labels.length; s++) {
                        var q = document.createElement("div"), w = 0 === this.options.ticks_positions.length,
                            S = this.options.reversed && w ? this.options.ticks_labels.length - (s + 1) : s;
                        q.className = "slider-tick-label", q.innerHTML = this.options.ticks_labels[S], this.tickLabels.push(q), this.tickLabelContainer.appendChild(q)
                    }
                    var C = function (t) {
                        var e = document.createElement("div");
                        e.className = "tooltip-arrow";
                        var n = document.createElement("div");
                        n.className = "tooltip-inner", t.appendChild(e), t.appendChild(n)
                    }, W = document.createElement("div");
                    W.className = "tooltip tooltip-main", W.setAttribute("role", "presentation"), C(W);
                    var x = document.createElement("div");
                    x.className = "tooltip tooltip-min", x.setAttribute("role", "presentation"), C(x);
                    var k = document.createElement("div");
                    k.className = "tooltip tooltip-max", k.setAttribute("role", "presentation"), C(k), this.sliderElem.appendChild(m), this.sliderElem.appendChild(W), this.sliderElem.appendChild(x), this.sliderElem.appendChild(k), this.tickLabelContainer && this.sliderElem.appendChild(this.tickLabelContainer), this.ticksContainer && this.sliderElem.appendChild(this.ticksContainer), this.sliderElem.appendChild(u), this.sliderElem.appendChild(f), b.insertBefore(this.sliderElem, this.element), this.element.style.display = "none"
                }
                if (t && (this.$element = t(this.element), this.$sliderElem = t(this.sliderElem)), this.eventToCallbackMap = {}, this.sliderElem.id = this.options.id, this.touchCapable = "ontouchstart" in window || window.DocumentTouch && document instanceof window.DocumentTouch, this.touchX = 0, this.touchY = 0, this.tooltip = this.sliderElem.querySelector(".tooltip-main"), this.tooltipInner = this.tooltip.querySelector(".tooltip-inner"), this.tooltip_min = this.sliderElem.querySelector(".tooltip-min"), this.tooltipInner_min = this.tooltip_min.querySelector(".tooltip-inner"), this.tooltip_max = this.sliderElem.querySelector(".tooltip-max"), this.tooltipInner_max = this.tooltip_max.querySelector(".tooltip-inner"), a[this.options.scale] && (this.options.scale = a[this.options.scale]), !0 === M && (this._removeClass(this.sliderElem, "slider-horizontal"), this._removeClass(this.sliderElem, "slider-vertical"), this._removeClass(this.sliderElem, "slider-rtl"), this._removeClass(this.tooltip, "hide"), this._removeClass(this.tooltip_min, "hide"), this._removeClass(this.tooltip_max, "hide"), ["left", "right", "top", "width", "height"].forEach(function (t) {
                        this._removeProperty(this.trackLow, t), this._removeProperty(this.trackSelection, t), this._removeProperty(this.trackHigh, t)
                    }, this), [this.handle1, this.handle2].forEach(function (t) {
                        this._removeProperty(t, "left"), this._removeProperty(t, "right"), this._removeProperty(t, "top")
                    }, this), [this.tooltip, this.tooltip_min, this.tooltip_max].forEach(function (t) {
                        this._removeProperty(t, "left"), this._removeProperty(t, "right"), this._removeProperty(t, "top"), this._removeProperty(t, "margin-left"), this._removeProperty(t, "margin-right"), this._removeProperty(t, "margin-top"), this._removeClass(t, "right"), this._removeClass(t, "left"), this._removeClass(t, "top")
                    }, this)), "vertical" === this.options.orientation ? (this._addClass(this.sliderElem, "slider-vertical"), this.stylePos = "top", this.mousePos = "pageY", this.sizePos = "offsetHeight") : (this._addClass(this.sliderElem, "slider-horizontal"), this.sliderElem.style.width = h, this.options.orientation = "horizontal", this.options.rtl ? this.stylePos = "right" : this.stylePos = "left", this.mousePos = "pageX", this.sizePos = "offsetWidth"), this.options.rtl && this._addClass(this.sliderElem, "slider-rtl"), this._setTooltipPosition(), Array.isArray(this.options.ticks) && this.options.ticks.length > 0 && (this.options.max = Math.max.apply(Math, this.options.ticks), this.options.min = Math.min.apply(Math, this.options.ticks)), Array.isArray(this.options.value) ? (this.options.range = !0, this._state.value = this.options.value) : this.options.range ? this._state.value = [this.options.value, this.options.max] : this._state.value = this.options.value, this.trackLow = d || this.trackLow, this.trackSelection = l || this.trackSelection, this.trackHigh = p || this.trackHigh, "none" === this.options.selection ? (this._addClass(this.trackLow, "hide"), this._addClass(this.trackSelection, "hide"), this._addClass(this.trackHigh, "hide")) : ("after" === this.options.selection || "before" === this.options.selection) && (this._removeClass(this.trackLow, "hide"), this._removeClass(this.trackSelection, "hide"), this._removeClass(this.trackHigh, "hide")), this.handle1 = u || this.handle1, this.handle2 = f || this.handle2, !0 === M) for (this._removeClass(this.handle1, "round triangle"), this._removeClass(this.handle2, "round triangle hide"), s = 0; s < this.ticks.length; s++) this._removeClass(this.ticks[s], "round triangle hide");
                if (-1 !== ["round", "triangle", "custom"].indexOf(this.options.handle)) for (this._addClass(this.handle1, this.options.handle), this._addClass(this.handle2, this.options.handle), s = 0; s < this.ticks.length; s++) this._addClass(this.ticks[s], this.options.handle);
                if (this._state.offset = this._offset(this.sliderElem), this._state.size = this.sliderElem[this.sizePos], this.setValue(this._state.value), this.handle1Keydown = this._keydown.bind(this, 0), this.handle1.addEventListener("keydown", this.handle1Keydown, !1), this.handle2Keydown = this._keydown.bind(this, 1), this.handle2.addEventListener("keydown", this.handle2Keydown, !1), this.mousedown = this._mousedown.bind(this), this.touchstart = this._touchstart.bind(this), this.touchmove = this._touchmove.bind(this), this.touchCapable) {
                    var X = !1;
                    try {
                        var E = Object.defineProperty({}, "passive", {
                            get: function () {
                                X = !0
                            }
                        });
                        window.addEventListener("test", null, E)
                    } catch (t) {
                    }
                    var B = !!X && {passive: !0};
                    this.sliderElem.addEventListener("touchstart", this.touchstart, B), this.sliderElem.addEventListener("touchmove", this.touchmove, B)
                }
                if (this.sliderElem.addEventListener("mousedown", this.mousedown, !1), this.resize = this._resize.bind(this), window.addEventListener("resize", this.resize, !1), "hide" === this.options.tooltip) this._addClass(this.tooltip, "hide"), this._addClass(this.tooltip_min, "hide"), this._addClass(this.tooltip_max, "hide"); else if ("always" === this.options.tooltip) this._showTooltip(), this._alwaysShowTooltip = !0; else {
                    if (this.showTooltip = this._showTooltip.bind(this), this.hideTooltip = this._hideTooltip.bind(this), this.options.ticks_tooltip) {
                        var _ = this._addTickListener(), D = _.addMouseEnter(this, this.handle1),
                            R = _.addMouseLeave(this, this.handle1);
                        this.handleCallbackMap.handle1 = {
                            mouseEnter: D,
                            mouseLeave: R
                        }, D = _.addMouseEnter(this, this.handle2), R = _.addMouseLeave(this, this.handle2), this.handleCallbackMap.handle2 = {
                            mouseEnter: D,
                            mouseLeave: R
                        }
                    } else this.sliderElem.addEventListener("mouseenter", this.showTooltip, !1), this.sliderElem.addEventListener("mouseleave", this.hideTooltip, !1);
                    this.handle1.addEventListener("focus", this.showTooltip, !1), this.handle1.addEventListener("blur", this.hideTooltip, !1), this.handle2.addEventListener("focus", this.showTooltip, !1), this.handle2.addEventListener("blur", this.hideTooltip, !1)
                }
                this.options.enabled ? this.enable() : this.disable()
            }

            var s = {
                formatInvalidInputErrorMsg: function (t) {
                    return "Invalid input value '" + t + "' passed in"
                },
                callingContextNotSliderInstance: "Calling context element does not have instance of Slider bound to it. Check your code to make sure the JQuery object returned from the call to the slider() initializer is calling the method"
            }, a = {
                linear: {
                    toValue: function (t) {
                        var e = t / 100 * (this.options.max - this.options.min), n = !0;
                        if (this.options.ticks_positions.length > 0) {
                            for (var i, o, s, a = 0, r = 1; r < this.options.ticks_positions.length; r++) if (t <= this.options.ticks_positions[r]) {
                                i = this.options.ticks[r - 1], s = this.options.ticks_positions[r - 1], o = this.options.ticks[r], a = this.options.ticks_positions[r];
                                break
                            }
                            e = i + (t - s) / (a - s) * (o - i), n = !1
                        }
                        var c = n ? this.options.min : 0, l = c + Math.round(e / this.options.step) * this.options.step;
                        return l < this.options.min ? this.options.min : l > this.options.max ? this.options.max : l
                    }, toPercentage: function (t) {
                        if (this.options.max === this.options.min) return 0;
                        if (this.options.ticks_positions.length > 0) {
                            for (var e, n, i, o = 0, s = 0; s < this.options.ticks.length; s++) if (t <= this.options.ticks[s]) {
                                e = s > 0 ? this.options.ticks[s - 1] : 0, i = s > 0 ? this.options.ticks_positions[s - 1] : 0, n = this.options.ticks[s], o = this.options.ticks_positions[s];
                                break
                            }
                            if (s > 0) {
                                return i + (t - e) / (n - e) * (o - i)
                            }
                        }
                        return 100 * (t - this.options.min) / (this.options.max - this.options.min)
                    }
                }, logarithmic: {
                    toValue: function (t) {
                        var e = 0 === this.options.min ? 0 : Math.log(this.options.min), n = Math.log(this.options.max),
                            i = Math.exp(e + (n - e) * t / 100);
                        return i = this.options.min + Math.round((i - this.options.min) / this.options.step) * this.options.step, i < this.options.min ? this.options.min : i > this.options.max ? this.options.max : i
                    }, toPercentage: function (t) {
                        if (this.options.max === this.options.min) return 0;
                        var e = Math.log(this.options.max), n = 0 === this.options.min ? 0 : Math.log(this.options.min);
                        return 100 * ((0 === t ? 0 : Math.log(t)) - n) / (e - n)
                    }
                }
            };
            if (i = function (t, e) {
                    return o.call(this, t, e), this
                }, i.prototype = {
                    _init: function () {
                    },
                    constructor: i,
                    defaultOptions: {
                        id: "",
                        min: 0,
                        max: 10,
                        step: 1,
                        precision: 0,
                        orientation: "horizontal",
                        value: 5,
                        range: !1,
                        selection: "before",
                        tooltip: "show",
                        tooltip_split: !1,
                        handle: "round",
                        reversed: !1,
                        rtl: "auto",
                        enabled: !0,
                        formatter: function (t) {
                            return Array.isArray(t) ? t[0] + " : " + t[1] : t
                        },
                        natural_arrow_keys: !1,
                        ticks: [],
                        ticks_positions: [],
                        ticks_labels: [],
                        ticks_snap_bounds: 0,
                        ticks_tooltip: !1,
                        scale: "linear",
                        focus: !1,
                        tooltip_position: null,
                        labelledby: null,
                        rangeHighlights: []
                    },
                    getElement: function () {
                        return this.sliderElem
                    },
                    getValue: function () {
                        return this.options.range ? this._state.value : this._state.value[0]
                    },
                    setValue: function (t, e, n) {
                        t || (t = 0);
                        var i = this.getValue();
                        this._state.value = this._validateInputValue(t);
                        var o = this._applyPrecision.bind(this);
                        this.options.range ? (this._state.value[0] = o(this._state.value[0]), this._state.value[1] = o(this._state.value[1]), this._state.value[0] = Math.max(this.options.min, Math.min(this.options.max, this._state.value[0])), this._state.value[1] = Math.max(this.options.min, Math.min(this.options.max, this._state.value[1]))) : (this._state.value = o(this._state.value), this._state.value = [Math.max(this.options.min, Math.min(this.options.max, this._state.value))], this._addClass(this.handle2, "hide"), "after" === this.options.selection ? this._state.value[1] = this.options.max : this._state.value[1] = this.options.min), this.options.max > this.options.min ? this._state.percentage = [this._toPercentage(this._state.value[0]), this._toPercentage(this._state.value[1]), 100 * this.options.step / (this.options.max - this.options.min)] : this._state.percentage = [0, 0, 100], this._layout();
                        var s = this.options.range ? this._state.value : this._state.value[0];
                        return this._setDataVal(s), !0 === e && this._trigger("slide", s), i !== s && !0 === n && this._trigger("change", {
                            oldValue: i,
                            newValue: s
                        }), this
                    },
                    destroy: function () {
                        this._removeSliderEventHandlers(), this.sliderElem.parentNode.removeChild(this.sliderElem), this.element.style.display = "", this._cleanUpEventCallbacksMap(), this.element.removeAttribute("data"), t && (this._unbindJQueryEventHandlers(), this.$element.removeData("slider"))
                    },
                    disable: function () {
                        return this._state.enabled = !1, this.handle1.removeAttribute("tabindex"), this.handle2.removeAttribute("tabindex"), this._addClass(this.sliderElem, "slider-disabled"), this._trigger("slideDisabled"), this
                    },
                    enable: function () {
                        return this._state.enabled = !0, this.handle1.setAttribute("tabindex", 0), this.handle2.setAttribute("tabindex", 0), this._removeClass(this.sliderElem, "slider-disabled"), this._trigger("slideEnabled"), this
                    },
                    toggle: function () {
                        return this._state.enabled ? this.disable() : this.enable(), this
                    },
                    isEnabled: function () {
                        return this._state.enabled
                    },
                    on: function (t, e) {
                        return this._bindNonQueryEventHandler(t, e), this
                    },
                    off: function (e, n) {
                        t ? (this.$element.off(e, n), this.$sliderElem.off(e, n)) : this._unbindNonQueryEventHandler(e, n)
                    },
                    getAttribute: function (t) {
                        return t ? this.options[t] : this.options
                    },
                    setAttribute: function (t, e) {
                        return this.options[t] = e, this
                    },
                    refresh: function () {
                        return this._removeSliderEventHandlers(), o.call(this, this.element, this.options), t && t.data(this.element, "slider", this), this
                    },
                    relayout: function () {
                        return this._resize(), this._layout(), this
                    },
                    _removeSliderEventHandlers: function () {
                        if (this.handle1.removeEventListener("keydown", this.handle1Keydown, !1), this.handle2.removeEventListener("keydown", this.handle2Keydown, !1), this.options.ticks_tooltip) {
                            for (var t = this.ticksContainer.getElementsByClassName("slider-tick"), e = 0; e < t.length; e++) t[e].removeEventListener("mouseenter", this.ticksCallbackMap[e].mouseEnter, !1), t[e].removeEventListener("mouseleave", this.ticksCallbackMap[e].mouseLeave, !1);
                            this.handle1.removeEventListener("mouseenter", this.handleCallbackMap.handle1.mouseEnter, !1), this.handle2.removeEventListener("mouseenter", this.handleCallbackMap.handle2.mouseEnter, !1), this.handle1.removeEventListener("mouseleave", this.handleCallbackMap.handle1.mouseLeave, !1), this.handle2.removeEventListener("mouseleave", this.handleCallbackMap.handle2.mouseLeave, !1)
                        }
                        this.handleCallbackMap = null, this.ticksCallbackMap = null, this.showTooltip && (this.handle1.removeEventListener("focus", this.showTooltip, !1), this.handle2.removeEventListener("focus", this.showTooltip, !1)), this.hideTooltip && (this.handle1.removeEventListener("blur", this.hideTooltip, !1), this.handle2.removeEventListener("blur", this.hideTooltip, !1)), this.showTooltip && this.sliderElem.removeEventListener("mouseenter", this.showTooltip, !1), this.hideTooltip && this.sliderElem.removeEventListener("mouseleave", this.hideTooltip, !1), this.sliderElem.removeEventListener("touchstart", this.touchstart, !1), this.sliderElem.removeEventListener("touchmove", this.touchmove, !1), this.sliderElem.removeEventListener("mousedown", this.mousedown, !1), window.removeEventListener("resize", this.resize, !1)
                    },
                    _bindNonQueryEventHandler: function (t, e) {
                        void 0 === this.eventToCallbackMap[t] && (this.eventToCallbackMap[t] = []), this.eventToCallbackMap[t].push(e)
                    },
                    _unbindNonQueryEventHandler: function (t, e) {
                        var n = this.eventToCallbackMap[t];
                        if (void 0 !== n) for (var i = 0; i < n.length; i++) if (n[i] === e) {
                            n.splice(i, 1);
                            break
                        }
                    },
                    _cleanUpEventCallbacksMap: function () {
                        for (var t = Object.keys(this.eventToCallbackMap), e = 0; e < t.length; e++) {
                            var n = t[e];
                            delete this.eventToCallbackMap[n]
                        }
                    },
                    _showTooltip: function () {
                        !1 === this.options.tooltip_split ? (this._addClass(this.tooltip, "in"), this.tooltip_min.style.display = "none", this.tooltip_max.style.display = "none") : (this._addClass(this.tooltip_min, "in"), this._addClass(this.tooltip_max, "in"), this.tooltip.style.display = "none"), this._state.over = !0
                    },
                    _hideTooltip: function () {
                        !1 === this._state.inDrag && !0 !== this.alwaysShowTooltip && (this._removeClass(this.tooltip, "in"), this._removeClass(this.tooltip_min, "in"), this._removeClass(this.tooltip_max, "in")), this._state.over = !1
                    },
                    _setToolTipOnMouseOver: function (t) {
                        function e(t, e) {
                            return e ? [100 - t.percentage[0], this.options.range ? 100 - t.percentage[1] : t.percentage[1]] : [t.percentage[0], t.percentage[1]]
                        }

                        var n = this.options.formatter(t ? t.value[0] : this._state.value[0]),
                            i = t ? e(t, this.options.reversed) : e(this._state, this.options.reversed);
                        this._setText(this.tooltipInner, n), this.tooltip.style[this.stylePos] = i[0] + "%", "vertical" === this.options.orientation ? this._css(this.tooltip, "margin-" + this.stylePos, -this.tooltip.offsetHeight / 2 + "px") : this._css(this.tooltip, "margin-" + this.stylePos, -this.tooltip.offsetWidth / 2 + "px")
                    },
                    _addTickListener: function () {
                        return {
                            addMouseEnter: function (t, e, n) {
                                var i = function () {
                                    var e = t._state, i = n >= 0 ? n : this.attributes["aria-valuenow"].value,
                                        o = parseInt(i, 10);
                                    e.value[0] = o, e.percentage[0] = t.options.ticks_positions[o], t._setToolTipOnMouseOver(e), t._showTooltip()
                                };
                                return e.addEventListener("mouseenter", i, !1), i
                            }, addMouseLeave: function (t, e) {
                                var n = function () {
                                    t._hideTooltip()
                                };
                                return e.addEventListener("mouseleave", n, !1), n
                            }
                        }
                    },
                    _layout: function () {
                        var t;
                        if (t = this.options.reversed ? [100 - this._state.percentage[0], this.options.range ? 100 - this._state.percentage[1] : this._state.percentage[1]] : [this._state.percentage[0], this._state.percentage[1]], this.handle1.style[this.stylePos] = t[0] + "%", this.handle1.setAttribute("aria-valuenow", this._state.value[0]), isNaN(this.options.formatter(this._state.value[0])) && this.handle1.setAttribute("aria-valuetext", this.options.formatter(this._state.value[0])), this.handle2.style[this.stylePos] = t[1] + "%", this.handle2.setAttribute("aria-valuenow", this._state.value[1]), isNaN(this.options.formatter(this._state.value[1])) && this.handle2.setAttribute("aria-valuetext", this.options.formatter(this._state.value[1])), this.rangeHighlightElements.length > 0 && Array.isArray(this.options.rangeHighlights) && this.options.rangeHighlights.length > 0) for (var e = 0; e < this.options.rangeHighlights.length; e++) {
                            var n = this._toPercentage(this.options.rangeHighlights[e].start),
                                i = this._toPercentage(this.options.rangeHighlights[e].end);
                            if (this.options.reversed) {
                                var o = 100 - i;
                                i = 100 - n, n = o
                            }
                            var s = this._createHighlightRange(n, i);
                            s ? "vertical" === this.options.orientation ? (this.rangeHighlightElements[e].style.top = s.start + "%", this.rangeHighlightElements[e].style.height = s.size + "%") : (this.options.rtl ? this.rangeHighlightElements[e].style.right = s.start + "%" : this.rangeHighlightElements[e].style.left = s.start + "%", this.rangeHighlightElements[e].style.width = s.size + "%") : this.rangeHighlightElements[e].style.display = "none"
                        }
                        if (Array.isArray(this.options.ticks) && this.options.ticks.length > 0) {
                            var a, r = "vertical" === this.options.orientation ? "height" : "width";
                            a = "vertical" === this.options.orientation ? "marginTop" : this.options.rtl ? "marginRight" : "marginLeft";
                            var c = this._state.size / (this.options.ticks.length - 1);
                            if (this.tickLabelContainer) {
                                var l = 0;
                                if (0 === this.options.ticks_positions.length) "vertical" !== this.options.orientation && (this.tickLabelContainer.style[a] = -c / 2 + "px"), l = this.tickLabelContainer.offsetHeight; else for (d = 0; d < this.tickLabelContainer.childNodes.length; d++) this.tickLabelContainer.childNodes[d].offsetHeight > l && (l = this.tickLabelContainer.childNodes[d].offsetHeight);
                                "horizontal" === this.options.orientation && (this.sliderElem.style.marginBottom = l + "px")
                            }
                            for (var d = 0; d < this.options.ticks.length; d++) {
                                var p = this.options.ticks_positions[d] || this._toPercentage(this.options.ticks[d]);
                                this.options.reversed && (p = 100 - p), this.ticks[d].style[this.stylePos] = p + "%", this._removeClass(this.ticks[d], "in-selection"), this.options.range ? p >= t[0] && p <= t[1] && this._addClass(this.ticks[d], "in-selection") : "after" === this.options.selection && p >= t[0] ? this._addClass(this.ticks[d], "in-selection") : "before" === this.options.selection && p <= t[0] && this._addClass(this.ticks[d], "in-selection"), this.tickLabels[d] && (this.tickLabels[d].style[r] = c + "px", "vertical" !== this.options.orientation && void 0 !== this.options.ticks_positions[d] ? (this.tickLabels[d].style.position = "absolute", this.tickLabels[d].style[this.stylePos] = p + "%", this.tickLabels[d].style[a] = -c / 2 + "px") : "vertical" === this.options.orientation && (this.options.rtl ? this.tickLabels[d].style.marginRight = this.sliderElem.offsetWidth + "px" : this.tickLabels[d].style.marginLeft = this.sliderElem.offsetWidth + "px", this.tickLabelContainer.style[a] = this.sliderElem.offsetWidth / 2 * -1 + "px"))
                            }
                        }
                        var u;
                        if (this.options.range) {
                            u = this.options.formatter(this._state.value), this._setText(this.tooltipInner, u), this.tooltip.style[this.stylePos] = (t[1] + t[0]) / 2 + "%", "vertical" === this.options.orientation ? this._css(this.tooltip, "margin-" + this.stylePos, -this.tooltip.offsetHeight / 2 + "px") : this._css(this.tooltip, "margin-" + this.stylePos, -this.tooltip.offsetWidth / 2 + "px");
                            var f = this.options.formatter(this._state.value[0]);
                            this._setText(this.tooltipInner_min, f);
                            var h = this.options.formatter(this._state.value[1]);
                            this._setText(this.tooltipInner_max, h), this.tooltip_min.style[this.stylePos] = t[0] + "%", "vertical" === this.options.orientation ? this._css(this.tooltip_min, "margin-" + this.stylePos, -this.tooltip_min.offsetHeight / 2 + "px") : this._css(this.tooltip_min, "margin-" + this.stylePos, -this.tooltip_min.offsetWidth / 2 + "px"), this.tooltip_max.style[this.stylePos] = t[1] + "%", "vertical" === this.options.orientation ? this._css(this.tooltip_max, "margin-" + this.stylePos, -this.tooltip_max.offsetHeight / 2 + "px") : this._css(this.tooltip_max, "margin-" + this.stylePos, -this.tooltip_max.offsetWidth / 2 + "px")
                        } else u = this.options.formatter(this._state.value[0]), this._setText(this.tooltipInner, u), this.tooltip.style[this.stylePos] = t[0] + "%", "vertical" === this.options.orientation ? this._css(this.tooltip, "margin-" + this.stylePos, -this.tooltip.offsetHeight / 2 + "px") : this._css(this.tooltip, "margin-" + this.stylePos, -this.tooltip.offsetWidth / 2 + "px");
                        if ("vertical" === this.options.orientation) this.trackLow.style.top = "0", this.trackLow.style.height = Math.min(t[0], t[1]) + "%", this.trackSelection.style.top = Math.min(t[0], t[1]) + "%", this.trackSelection.style.height = Math.abs(t[0] - t[1]) + "%", this.trackHigh.style.bottom = "0", this.trackHigh.style.height = 100 - Math.min(t[0], t[1]) - Math.abs(t[0] - t[1]) + "%"; else {
                            "right" === this.stylePos ? this.trackLow.style.right = "0" : this.trackLow.style.left = "0", this.trackLow.style.width = Math.min(t[0], t[1]) + "%", "right" === this.stylePos ? this.trackSelection.style.right = Math.min(t[0], t[1]) + "%" : this.trackSelection.style.left = Math.min(t[0], t[1]) + "%", this.trackSelection.style.width = Math.abs(t[0] - t[1]) + "%", "right" === this.stylePos ? this.trackHigh.style.left = "0" : this.trackHigh.style.right = "0", this.trackHigh.style.width = 100 - Math.min(t[0], t[1]) - Math.abs(t[0] - t[1]) + "%";
                            var M = this.tooltip_min.getBoundingClientRect(),
                                b = this.tooltip_max.getBoundingClientRect();
                            "bottom" === this.options.tooltip_position ? M.right > b.left ? (this._removeClass(this.tooltip_max, "bottom"), this._addClass(this.tooltip_max, "top"), this.tooltip_max.style.top = "", this.tooltip_max.style.bottom = "22px") : (this._removeClass(this.tooltip_max, "top"), this._addClass(this.tooltip_max, "bottom"), this.tooltip_max.style.top = this.tooltip_min.style.top, this.tooltip_max.style.bottom = "") : M.right > b.left ? (this._removeClass(this.tooltip_max, "top"), this._addClass(this.tooltip_max, "bottom"), this.tooltip_max.style.top = "18px") : (this._removeClass(this.tooltip_max, "bottom"), this._addClass(this.tooltip_max, "top"), this.tooltip_max.style.top = this.tooltip_min.style.top)
                        }
                    },
                    _createHighlightRange: function (t, e) {
                        return this._isHighlightRange(t, e) ? t > e ? {start: e, size: t - e} : {
                            start: t,
                            size: e - t
                        } : null
                    },
                    _isHighlightRange: function (t, e) {
                        return t >= 0 && 100 >= t && e >= 0 && 100 >= e
                    },
                    _resize: function () {
                        this._state.offset = this._offset(this.sliderElem), this._state.size = this.sliderElem[this.sizePos], this._layout()
                    },
                    _removeProperty: function (t, e) {
                        t.style.removeProperty ? t.style.removeProperty(e) : t.style.removeAttribute(e)
                    },
                    _mousedown: function (t) {
                        if (!this._state.enabled) return !1;
                        this._state.offset = this._offset(this.sliderElem), this._state.size = this.sliderElem[this.sizePos];
                        var e = this._getPercentage(t);
                        if (this.options.range) {
                            var n = Math.abs(this._state.percentage[0] - e),
                                i = Math.abs(this._state.percentage[1] - e);
                            this._state.dragged = i > n ? 0 : 1, this._adjustPercentageForRangeSliders(e)
                        } else this._state.dragged = 0;
                        this._state.percentage[this._state.dragged] = e, this._layout(), this.touchCapable && (document.removeEventListener("touchmove", this.mousemove, !1), document.removeEventListener("touchend", this.mouseup, !1)), this.mousemove && document.removeEventListener("mousemove", this.mousemove, !1), this.mouseup && document.removeEventListener("mouseup", this.mouseup, !1), this.mousemove = this._mousemove.bind(this), this.mouseup = this._mouseup.bind(this), this.touchCapable && (document.addEventListener("touchmove", this.mousemove, !1), document.addEventListener("touchend", this.mouseup, !1)), document.addEventListener("mousemove", this.mousemove, !1), document.addEventListener("mouseup", this.mouseup, !1), this._state.inDrag = !0;
                        var o = this._calculateValue();
                        return this._trigger("slideStart", o), this._setDataVal(o), this.setValue(o, !1, !0), t.returnValue = !1, this.options.focus && this._triggerFocusOnHandle(this._state.dragged), !0
                    },
                    _touchstart: function (t) {
                        if (void 0 === t.changedTouches) return void this._mousedown(t);
                        var e = t.changedTouches[0];
                        this.touchX = e.pageX, this.touchY = e.pageY
                    },
                    _triggerFocusOnHandle: function (t) {
                        0 === t && this.handle1.focus(), 1 === t && this.handle2.focus()
                    },
                    _keydown: function (t, e) {
                        if (!this._state.enabled) return !1;
                        var n;
                        switch (e.keyCode) {
                            case 37:
                            case 40:
                                n = -1;
                                break;
                            case 39:
                            case 38:
                                n = 1
                        }
                        if (n) {
                            if (this.options.natural_arrow_keys) {
                                var i = "vertical" === this.options.orientation && !this.options.reversed,
                                    o = "horizontal" === this.options.orientation && this.options.reversed;
                                (i || o) && (n = -n)
                            }
                            var s = this._state.value[t] + n * this.options.step, a = s / this.options.max * 100;
                            if (this._state.keyCtrl = t, this.options.range) {
                                this._adjustPercentageForRangeSliders(a);
                                s = [this._state.keyCtrl ? this._state.value[0] : s, this._state.keyCtrl ? s : this._state.value[1]]
                            }
                            return this._trigger("slideStart", s), this._setDataVal(s), this.setValue(s, !0, !0), this._setDataVal(s), this._trigger("slideStop", s), this._layout(), this._pauseEvent(e), delete this._state.keyCtrl, !1
                        }
                    },
                    _pauseEvent: function (t) {
                        t.stopPropagation && t.stopPropagation(), t.preventDefault && t.preventDefault(), t.cancelBubble = !0, t.returnValue = !1
                    },
                    _mousemove: function (t) {
                        if (!this._state.enabled) return !1;
                        var e = this._getPercentage(t);
                        this._adjustPercentageForRangeSliders(e), this._state.percentage[this._state.dragged] = e, this._layout();
                        var n = this._calculateValue(!0);
                        return this.setValue(n, !0, !0), !1
                    },
                    _touchmove: function (t) {
                        if (void 0 !== t.changedTouches) {
                            var e = t.changedTouches[0], n = e.pageX - this.touchX, i = e.pageY - this.touchY;
                            this._state.inDrag || ("vertical" === this.options.orientation && 5 >= n && n >= -5 && (i >= 15 || -15 >= i) ? this._mousedown(t) : 5 >= i && i >= -5 && (n >= 15 || -15 >= n) && this._mousedown(t))
                        }
                    },
                    _adjustPercentageForRangeSliders: function (t) {
                        if (this.options.range) {
                            var e = this._getNumDigitsAfterDecimalPlace(t);
                            e = e ? e - 1 : 0;
                            var n = this._applyToFixedAndParseFloat(t, e);
                            0 === this._state.dragged && this._applyToFixedAndParseFloat(this._state.percentage[1], e) < n ? (this._state.percentage[0] = this._state.percentage[1], this._state.dragged = 1) : 1 === this._state.dragged && this._applyToFixedAndParseFloat(this._state.percentage[0], e) > n ? (this._state.percentage[1] = this._state.percentage[0], this._state.dragged = 0) : 0 === this._state.keyCtrl && this._state.value[1] / this.options.max * 100 < t ? (this._state.percentage[0] = this._state.percentage[1], this._state.keyCtrl = 1, this.handle2.focus()) : 1 === this._state.keyCtrl && this._state.value[0] / this.options.max * 100 > t && (this._state.percentage[1] = this._state.percentage[0], this._state.keyCtrl = 0, this.handle1.focus())
                        }
                    },
                    _mouseup: function () {
                        if (!this._state.enabled) return !1;
                        this.touchCapable && (document.removeEventListener("touchmove", this.mousemove, !1), document.removeEventListener("touchend", this.mouseup, !1)), document.removeEventListener("mousemove", this.mousemove, !1), document.removeEventListener("mouseup", this.mouseup, !1), this._state.inDrag = !1, !1 === this._state.over && this._hideTooltip();
                        var t = this._calculateValue(!0);
                        return this._layout(), this._setDataVal(t), this._trigger("slideStop", t), !1
                    },
                    _calculateValue: function (t) {
                        var e;
                        if (this.options.range ? (e = [this.options.min, this.options.max], 0 !== this._state.percentage[0] && (e[0] = this._toValue(this._state.percentage[0]), e[0] = this._applyPrecision(e[0])), 100 !== this._state.percentage[1] && (e[1] = this._toValue(this._state.percentage[1]), e[1] = this._applyPrecision(e[1]))) : (e = this._toValue(this._state.percentage[0]), e = parseFloat(e), e = this._applyPrecision(e)), t) {
                            for (var n = [e, 1 / 0], i = 0; i < this.options.ticks.length; i++) {
                                var o = Math.abs(this.options.ticks[i] - e);
                                o <= n[1] && (n = [this.options.ticks[i], o])
                            }
                            if (n[1] <= this.options.ticks_snap_bounds) return n[0]
                        }
                        return e
                    },
                    _applyPrecision: function (t) {
                        var e = this.options.precision || this._getNumDigitsAfterDecimalPlace(this.options.step);
                        return this._applyToFixedAndParseFloat(t, e)
                    },
                    _getNumDigitsAfterDecimalPlace: function (t) {
                        var e = ("" + t).match(/(?:\.(\d+))?(?:[eE]([+-]?\d+))?$/);
                        return e ? Math.max(0, (e[1] ? e[1].length : 0) - (e[2] ? +e[2] : 0)) : 0
                    },
                    _applyToFixedAndParseFloat: function (t, e) {
                        var n = t.toFixed(e);
                        return parseFloat(n)
                    },
                    _getPercentage: function (t) {
                        !this.touchCapable || "touchstart" !== t.type && "touchmove" !== t.type || (t = t.touches[0]);
                        var e = t[this.mousePos], n = this._state.offset[this.stylePos], i = e - n;
                        "right" === this.stylePos && (i = -i);
                        var o = i / this._state.size * 100;
                        return o = Math.round(o / this._state.percentage[2]) * this._state.percentage[2], this.options.reversed && (o = 100 - o), Math.max(0, Math.min(100, o))
                    },
                    _validateInputValue: function (t) {
                        if (isNaN(+t)) {
                            if (Array.isArray(t)) return this._validateArray(t), t;
                            throw new Error(s.formatInvalidInputErrorMsg(t))
                        }
                        return +t
                    },
                    _validateArray: function (t) {
                        for (var e = 0; e < t.length; e++) {
                            var n = t[e];
                            if ("number" != typeof n) throw new Error(s.formatInvalidInputErrorMsg(n))
                        }
                    },
                    _setDataVal: function (t) {
                        this.element.setAttribute("data-value", t), this.element.setAttribute("value", t), this.element.value = t
                    },
                    _trigger: function (e, n) {
                        n = n || 0 === n ? n : void 0;
                        var i = this.eventToCallbackMap[e];
                        if (i && i.length) for (var o = 0; o < i.length; o++) {
                            var s = i[o];
                            s(n)
                        }
                        t && this._triggerJQueryEvent(e, n)
                    },
                    _triggerJQueryEvent: function (t, e) {
                        var n = {type: t, value: e};
                        this.$element.trigger(n), this.$sliderElem.trigger(n)
                    },
                    _unbindJQueryEventHandlers: function () {
                        this.$element.off(), this.$sliderElem.off()
                    },
                    _setText: function (t, e) {
                        "undefined" != typeof t.textContent ? t.textContent = e : "undefined" != typeof t.innerText && (t.innerText = e)
                    },
                    _removeClass: function (t, e) {
                        for (var n = e.split(" "), i = t.className, o = 0; o < n.length; o++) {
                            var s = n[o], a = new RegExp("(?:\\s|^)" + s + "(?:\\s|$)");
                            i = i.replace(a, " ")
                        }
                        t.className = i.trim()
                    },
                    _addClass: function (t, e) {
                        for (var n = e.split(" "), i = t.className, o = 0; o < n.length; o++) {
                            var s = n[o];
                            new RegExp("(?:\\s|^)" + s + "(?:\\s|$)").test(i) || (i += " " + s)
                        }
                        t.className = i.trim()
                    },
                    _offsetLeft: function (t) {
                        return t.getBoundingClientRect().left
                    },
                    _offsetRight: function (t) {
                        return t.getBoundingClientRect().right
                    },
                    _offsetTop: function (t) {
                        for (var e = t.offsetTop; (t = t.offsetParent) && !isNaN(t.offsetTop);) e += t.offsetTop, "BODY" !== t.tagName && (e -= t.scrollTop);
                        return e
                    },
                    _offset: function (t) {
                        return {left: this._offsetLeft(t), right: this._offsetRight(t), top: this._offsetTop(t)}
                    },
                    _css: function (e, n, i) {
                        if (t) t.style(e, n, i); else {
                            var o = n.replace(/^-ms-/, "ms-").replace(/-([\da-z])/gi, function (t, e) {
                                return e.toUpperCase()
                            });
                            e.style[o] = i
                        }
                    },
                    _toValue: function (t) {
                        return this.options.scale.toValue.apply(this, [t])
                    },
                    _toPercentage: function (t) {
                        return this.options.scale.toPercentage.apply(this, [t])
                    },
                    _setTooltipPosition: function () {
                        var t = [this.tooltip, this.tooltip_min, this.tooltip_max];
                        if ("vertical" === this.options.orientation) {
                            var e;
                            e = this.options.tooltip_position ? this.options.tooltip_position : this.options.rtl ? "left" : "right";
                            var n = "left" === e ? "right" : "left";
                            t.forEach(function (t) {
                                this._addClass(t, e), t.style[n] = "100%"
                            }.bind(this))
                        } else "bottom" === this.options.tooltip_position ? t.forEach(function (t) {
                            this._addClass(t, "bottom"), t.style.top = "22px"
                        }.bind(this)) : t.forEach(function (t) {
                            this._addClass(t, "top"), t.style.top = -this.tooltip.outerHeight - 14 + "px"
                        }.bind(this))
                    }
                }, t && t.fn) {
                var r = void 0;
                t.fn.slider ? (windowIsDefined && window.console.warn("bootstrap-slider.js - WARNING: $.fn.slider namespace is already bound. Use the $.fn.bootstrapSlider namespace instead."), r = n) : (t.bridget(e, i), r = e), t.bridget(n, i), t(function () {
                    t("input[data-provide=slider]")[r]()
                })
            }
        }(t), i
    }), "undefined" == typeof jQuery) throw new Error("Bootstrap's JavaScript requires jQuery");
+function (t) {
    "use strict";
    var e = t.fn.jquery.split(" ")[0].split(".");
    if (e[0] < 2 && e[1] < 9 || 1 == e[0] && 9 == e[1] && e[2] < 1 || e[0] > 3) throw new Error("Bootstrap's JavaScript requires jQuery version 1.9.1 or higher, but lower than version 4")
}(jQuery), function (t) {
    "use strict";

    function e() {
        var t = document.createElement("bootstrap"), e = {
            WebkitTransition: "webkitTransitionEnd",
            MozTransition: "transitionend",
            OTransition: "oTransitionEnd otransitionend",
            transition: "transitionend"
        };
        for (var n in e) if (void 0 !== t.style[n]) return {end: e[n]};
        return !1
    }

    t.fn.emulateTransitionEnd = function (e) {
        var n = !1, i = this;
        t(this).one("bsTransitionEnd", function () {
            n = !0
        });
        var o = function () {
            n || t(i).trigger(t.support.transition.end)
        };
        return setTimeout(o, e), this
    }, t(function () {
        t.support.transition = e(), t.support.transition && (t.event.special.bsTransitionEnd = {
            bindType: t.support.transition.end,
            delegateType: t.support.transition.end,
            handle: function (e) {
                if (t(e.target).is(this)) return e.handleObj.handler.apply(this, arguments)
            }
        })
    })
}(jQuery), function (t) {
    "use strict";

    function e(e) {
        return this.each(function () {
            var n = t(this), o = n.data("bs.alert");
            o || n.data("bs.alert", o = new i(this)), "string" == typeof e && o[e].call(n)
        })
    }

    var n = '[data-dismiss="alert"]', i = function (e) {
        t(e).on("click", n, this.close)
    };
    i.VERSION = "3.3.7", i.TRANSITION_DURATION = 150, i.prototype.close = function (e) {
        function n() {
            a.detach().trigger("closed.bs.alert").remove()
        }

        var o = t(this), s = o.attr("data-target");
        s || (s = o.attr("href"), s = s && s.replace(/.*(?=#[^\s]*$)/, ""));
        var a = t("#" === s ? [] : s);
        e && e.preventDefault(), a.length || (a = o.closest(".alert")), a.trigger(e = t.Event("close.bs.alert")), e.isDefaultPrevented() || (a.removeClass("in"), t.support.transition && a.hasClass("fade") ? a.one("bsTransitionEnd", n).emulateTransitionEnd(i.TRANSITION_DURATION) : n())
    };
    var o = t.fn.alert;
    t.fn.alert = e, t.fn.alert.Constructor = i, t.fn.alert.noConflict = function () {
        return t.fn.alert = o, this
    }, t(document).on("click.bs.alert.data-api", n, i.prototype.close)
}(jQuery), function (t) {
    "use strict";

    function e(e) {
        return this.each(function () {
            var i = t(this), o = i.data("bs.button"), s = "object" == typeof e && e;
            o || i.data("bs.button", o = new n(this, s)), "toggle" == e ? o.toggle() : e && o.setState(e)
        })
    }

    var n = function (e, i) {
        this.$element = t(e), this.options = t.extend({}, n.DEFAULTS, i), this.isLoading = !1
    };
    n.VERSION = "3.3.7", n.DEFAULTS = {loadingText: "loading..."}, n.prototype.setState = function (e) {
        var n = "disabled", i = this.$element, o = i.is("input") ? "val" : "html", s = i.data();
        e += "Text", null == s.resetText && i.data("resetText", i[o]()), setTimeout(t.proxy(function () {
            i[o](null == s[e] ? this.options[e] : s[e]), "loadingText" == e ? (this.isLoading = !0, i.addClass(n).attr(n, n).prop(n, !0)) : this.isLoading && (this.isLoading = !1, i.removeClass(n).removeAttr(n).prop(n, !1))
        }, this), 0)
    }, n.prototype.toggle = function () {
        var t = !0, e = this.$element.closest('[data-toggle="buttons"]');
        if (e.length) {
            var n = this.$element.find("input");
            "radio" == n.prop("type") ? (n.prop("checked") && (t = !1), e.find(".active").removeClass("active"), this.$element.addClass("active")) : "checkbox" == n.prop("type") && (n.prop("checked") !== this.$element.hasClass("active") && (t = !1), this.$element.toggleClass("active")), n.prop("checked", this.$element.hasClass("active")), t && n.trigger("change")
        } else this.$element.attr("aria-pressed", !this.$element.hasClass("active")), this.$element.toggleClass("active")
    };
    var i = t.fn.button;
    t.fn.button = e, t.fn.button.Constructor = n, t.fn.button.noConflict = function () {
        return t.fn.button = i, this
    }, t(document).on("click.bs.button.data-api", '[data-toggle^="button"]', function (n) {
        var i = t(n.target).closest(".btn");
        e.call(i, "toggle"), t(n.target).is('input[type="radio"], input[type="checkbox"]') || (n.preventDefault(), i.is("input,button") ? i.trigger("focus") : i.find("input:visible,button:visible").first().trigger("focus"))
    }).on("focus.bs.button.data-api blur.bs.button.data-api", '[data-toggle^="button"]', function (e) {
        t(e.target).closest(".btn").toggleClass("focus", /^focus(in)?$/.test(e.type))
    })
}(jQuery), function (t) {
    "use strict";

    function e(e) {
        return this.each(function () {
            var i = t(this), o = i.data("bs.carousel"),
                s = t.extend({}, n.DEFAULTS, i.data(), "object" == typeof e && e),
                a = "string" == typeof e ? e : s.slide;
            o || i.data("bs.carousel", o = new n(this, s)), "number" == typeof e ? o.to(e) : a ? o[a]() : s.interval && o.pause().cycle()
        })
    }

    var n = function (e, n) {
        this.$element = t(e), this.$indicators = this.$element.find(".carousel-indicators"), this.options = n, this.paused = null, this.sliding = null, this.interval = null, this.$active = null, this.$items = null, this.options.keyboard && this.$element.on("keydown.bs.carousel", t.proxy(this.keydown, this)), "hover" == this.options.pause && !("ontouchstart" in document.documentElement) && this.$element.on("mouseenter.bs.carousel", t.proxy(this.pause, this)).on("mouseleave.bs.carousel", t.proxy(this.cycle, this))
    };
    n.VERSION = "3.3.7", n.TRANSITION_DURATION = 600, n.DEFAULTS = {
        interval: 5e3,
        pause: "hover",
        wrap: !0,
        keyboard: !0
    }, n.prototype.keydown = function (t) {
        if (!/input|textarea/i.test(t.target.tagName)) {
            switch (t.which) {
                case 37:
                    this.prev();
                    break;
                case 39:
                    this.next();
                    break;
                default:
                    return
            }
            t.preventDefault()
        }
    }, n.prototype.cycle = function (e) {
        return e || (this.paused = !1), this.interval && clearInterval(this.interval), this.options.interval && !this.paused && (this.interval = setInterval(t.proxy(this.next, this), this.options.interval)), this
    }, n.prototype.getItemIndex = function (t) {
        return this.$items = t.parent().children(".item"), this.$items.index(t || this.$active)
    }, n.prototype.getItemForDirection = function (t, e) {
        var n = this.getItemIndex(e);
        if (("prev" == t && 0 === n || "next" == t && n == this.$items.length - 1) && !this.options.wrap) return e;
        var i = "prev" == t ? -1 : 1, o = (n + i) % this.$items.length;
        return this.$items.eq(o)
    }, n.prototype.to = function (t) {
        var e = this, n = this.getItemIndex(this.$active = this.$element.find(".item.active"));
        if (!(t > this.$items.length - 1 || t < 0)) return this.sliding ? this.$element.one("slid.bs.carousel", function () {
            e.to(t)
        }) : n == t ? this.pause().cycle() : this.slide(t > n ? "next" : "prev", this.$items.eq(t))
    }, n.prototype.pause = function (e) {
        return e || (this.paused = !0), this.$element.find(".next, .prev").length && t.support.transition && (this.$element.trigger(t.support.transition.end), this.cycle(!0)), this.interval = clearInterval(this.interval), this
    }, n.prototype.next = function () {
        if (!this.sliding) return this.slide("next")
    }, n.prototype.prev = function () {
        if (!this.sliding) return this.slide("prev")
    }, n.prototype.slide = function (e, i) {
        var o = this.$element.find(".item.active"), s = i || this.getItemForDirection(e, o), a = this.interval,
            r = "next" == e ? "left" : "right", c = this;
        if (s.hasClass("active")) return this.sliding = !1;
        var l = s[0], d = t.Event("slide.bs.carousel", {relatedTarget: l, direction: r});
        if (this.$element.trigger(d), !d.isDefaultPrevented()) {
            if (this.sliding = !0, a && this.pause(), this.$indicators.length) {
                this.$indicators.find(".active").removeClass("active");
                var p = t(this.$indicators.children()[this.getItemIndex(s)]);
                p && p.addClass("active")
            }
            var u = t.Event("slid.bs.carousel", {relatedTarget: l, direction: r});
            return t.support.transition && this.$element.hasClass("slide") ? (s.addClass(e), s[0].offsetWidth, o.addClass(r), s.addClass(r), o.one("bsTransitionEnd", function () {
                s.removeClass([e, r].join(" ")).addClass("active"), o.removeClass(["active", r].join(" ")), c.sliding = !1, setTimeout(function () {
                    c.$element.trigger(u)
                }, 0)
            }).emulateTransitionEnd(n.TRANSITION_DURATION)) : (o.removeClass("active"), s.addClass("active"), this.sliding = !1, this.$element.trigger(u)), a && this.cycle(), this
        }
    };
    var i = t.fn.carousel;
    t.fn.carousel = e, t.fn.carousel.Constructor = n, t.fn.carousel.noConflict = function () {
        return t.fn.carousel = i, this
    };
    var o = function (n) {
        var i, o = t(this), s = t(o.attr("data-target") || (i = o.attr("href")) && i.replace(/.*(?=#[^\s]+$)/, ""));
        if (s.hasClass("carousel")) {
            var a = t.extend({}, s.data(), o.data()), r = o.attr("data-slide-to");
            r && (a.interval = !1), e.call(s, a), r && s.data("bs.carousel").to(r), n.preventDefault()
        }
    };
    t(document).on("click.bs.carousel.data-api", "[data-slide]", o).on("click.bs.carousel.data-api", "[data-slide-to]", o), t(window).on("load", function () {
        t('[data-ride="carousel"]').each(function () {
            var n = t(this);
            e.call(n, n.data())
        })
    })
}(jQuery), function (t) {
    "use strict";

    function e(e) {
        var n, i = e.attr("data-target") || (n = e.attr("href")) && n.replace(/.*(?=#[^\s]+$)/, "");
        return t(i)
    }

    function n(e) {
        return this.each(function () {
            var n = t(this), o = n.data("bs.collapse"),
                s = t.extend({}, i.DEFAULTS, n.data(), "object" == typeof e && e);
            !o && s.toggle && /show|hide/.test(e) && (s.toggle = !1), o || n.data("bs.collapse", o = new i(this, s)), "string" == typeof e && o[e]()
        })
    }

    var i = function (e, n) {
        this.$element = t(e), this.options = t.extend({}, i.DEFAULTS, n), this.$trigger = t('[data-toggle="collapse"][href="#' + e.id + '"],[data-toggle="collapse"][data-target="#' + e.id + '"]'), this.transitioning = null, this.options.parent ? this.$parent = this.getParent() : this.addAriaAndCollapsedClass(this.$element, this.$trigger), this.options.toggle && this.toggle()
    };
    i.VERSION = "3.3.7", i.TRANSITION_DURATION = 350, i.DEFAULTS = {toggle: !0}, i.prototype.dimension = function () {
        return this.$element.hasClass("width") ? "width" : "height"
    }, i.prototype.show = function () {
        if (!this.transitioning && !this.$element.hasClass("in")) {
            var e, o = this.$parent && this.$parent.children(".panel").children(".in, .collapsing");
            if (!(o && o.length && (e = o.data("bs.collapse")) && e.transitioning)) {
                var s = t.Event("show.bs.collapse");
                if (this.$element.trigger(s), !s.isDefaultPrevented()) {
                    o && o.length && (n.call(o, "hide"), e || o.data("bs.collapse", null));
                    var a = this.dimension();
                    this.$element.removeClass("collapse").addClass("collapsing")[a](0).attr("aria-expanded", !0), this.$trigger.removeClass("collapsed").attr("aria-expanded", !0), this.transitioning = 1;
                    var r = function () {
                        this.$element.removeClass("collapsing").addClass("collapse in")[a](""), this.transitioning = 0, this.$element.trigger("shown.bs.collapse")
                    };
                    if (!t.support.transition) return r.call(this);
                    var c = t.camelCase(["scroll", a].join("-"));
                    this.$element.one("bsTransitionEnd", t.proxy(r, this)).emulateTransitionEnd(i.TRANSITION_DURATION)[a](this.$element[0][c])
                }
            }
        }
    }, i.prototype.hide = function () {
        if (!this.transitioning && this.$element.hasClass("in")) {
            var e = t.Event("hide.bs.collapse");
            if (this.$element.trigger(e), !e.isDefaultPrevented()) {
                var n = this.dimension();
                this.$element[n](this.$element[n]())[0].offsetHeight, this.$element.addClass("collapsing").removeClass("collapse in").attr("aria-expanded", !1), this.$trigger.addClass("collapsed").attr("aria-expanded", !1), this.transitioning = 1;
                var o = function () {
                    this.transitioning = 0, this.$element.removeClass("collapsing").addClass("collapse").trigger("hidden.bs.collapse")
                };
                return t.support.transition ? void this.$element[n](0).one("bsTransitionEnd", t.proxy(o, this)).emulateTransitionEnd(i.TRANSITION_DURATION) : o.call(this)
            }
        }
    }, i.prototype.toggle = function () {
        this[this.$element.hasClass("in") ? "hide" : "show"]()
    }, i.prototype.getParent = function () {
        return t(this.options.parent).find('[data-toggle="collapse"][data-parent="' + this.options.parent + '"]').each(t.proxy(function (n, i) {
            var o = t(i);
            this.addAriaAndCollapsedClass(e(o), o)
        }, this)).end()
    }, i.prototype.addAriaAndCollapsedClass = function (t, e) {
        var n = t.hasClass("in");
        t.attr("aria-expanded", n), e.toggleClass("collapsed", !n).attr("aria-expanded", n)
    };
    var o = t.fn.collapse;
    t.fn.collapse = n, t.fn.collapse.Constructor = i, t.fn.collapse.noConflict = function () {
        return t.fn.collapse = o, this
    }, t(document).on("click.bs.collapse.data-api", '[data-toggle="collapse"]', function (i) {
        var o = t(this);
        o.attr("data-target") || i.preventDefault();
        var s = e(o), a = s.data("bs.collapse"), r = a ? "toggle" : o.data();
        n.call(s, r)
    })
}(jQuery), function (t) {
    "use strict";

    function e(e) {
        var n = e.attr("data-target");
        n || (n = e.attr("href"), n = n && /#[A-Za-z]/.test(n) && n.replace(/.*(?=#[^\s]*$)/, ""));
        var i = n && t(n);
        return i && i.length ? i : e.parent()
    }

    function n(n) {
        n && 3 === n.which || (t(o).remove(), t(s).each(function () {
            var i = t(this), o = e(i), s = {relatedTarget: this};
            o.hasClass("open") && (n && "click" == n.type && /input|textarea/i.test(n.target.tagName) && t.contains(o[0], n.target) || (o.trigger(n = t.Event("hide.bs.dropdown", s)), n.isDefaultPrevented() || (i.attr("aria-expanded", "false"), o.removeClass("open").trigger(t.Event("hidden.bs.dropdown", s)))))
        }))
    }

    function i(e) {
        return this.each(function () {
            var n = t(this), i = n.data("bs.dropdown");
            i || n.data("bs.dropdown", i = new a(this)), "string" == typeof e && i[e].call(n)
        })
    }

    var o = ".dropdown-backdrop", s = '[data-toggle="dropdown"]', a = function (e) {
        t(e).on("click.bs.dropdown", this.toggle)
    };
    a.VERSION = "3.3.7", a.prototype.toggle = function (i) {
        var o = t(this);
        if (!o.is(".disabled, :disabled")) {
            var s = e(o), a = s.hasClass("open");
            if (n(), !a) {
                "ontouchstart" in document.documentElement && !s.closest(".navbar-nav").length && t(document.createElement("div")).addClass("dropdown-backdrop").insertAfter(t(this)).on("click", n);
                var r = {relatedTarget: this};
                if (s.trigger(i = t.Event("show.bs.dropdown", r)), i.isDefaultPrevented()) return;
                o.trigger("focus").attr("aria-expanded", "true"), s.toggleClass("open").trigger(t.Event("shown.bs.dropdown", r))
            }
            return !1
        }
    }, a.prototype.keydown = function (n) {
        if (/(38|40|27|32)/.test(n.which) && !/input|textarea/i.test(n.target.tagName)) {
            var i = t(this);
            if (n.preventDefault(), n.stopPropagation(), !i.is(".disabled, :disabled")) {
                var o = e(i), a = o.hasClass("open");
                if (!a && 27 != n.which || a && 27 == n.which) return 27 == n.which && o.find(s).trigger("focus"), i.trigger("click");
                var r = " li:not(.disabled):visible a", c = o.find(".dropdown-menu" + r);
                if (c.length) {
                    var l = c.index(n.target);
                    38 == n.which && l > 0 && l--, 40 == n.which && l < c.length - 1 && l++, ~l || (l = 0), c.eq(l).trigger("focus")
                }
            }
        }
    };
    var r = t.fn.dropdown;
    t.fn.dropdown = i, t.fn.dropdown.Constructor = a, t.fn.dropdown.noConflict = function () {
        return t.fn.dropdown = r, this
    }, t(document).on("click.bs.dropdown.data-api", n).on("click.bs.dropdown.data-api", ".dropdown form", function (t) {
        t.stopPropagation()
    }).on("click.bs.dropdown.data-api", s, a.prototype.toggle).on("keydown.bs.dropdown.data-api", s, a.prototype.keydown).on("keydown.bs.dropdown.data-api", ".dropdown-menu", a.prototype.keydown)
}(jQuery), function (t) {
    "use strict";

    function e(e, i) {
        return this.each(function () {
            var o = t(this), s = o.data("bs.modal"), a = t.extend({}, n.DEFAULTS, o.data(), "object" == typeof e && e);
            s || o.data("bs.modal", s = new n(this, a)), "string" == typeof e ? s[e](i) : a.show && s.show(i)
        })
    }

    var n = function (e, n) {
        this.options = n, this.$body = t(document.body), this.$element = t(e), this.$dialog = this.$element.find(".modal-dialog"), this.$backdrop = null, this.isShown = null, this.originalBodyPad = null, this.scrollbarWidth = 0, this.ignoreBackdropClick = !1, this.options.remote && this.$element.find(".modal-content").load(this.options.remote, t.proxy(function () {
            this.$element.trigger("loaded.bs.modal")
        }, this))
    };
    n.VERSION = "3.3.7", n.TRANSITION_DURATION = 300, n.BACKDROP_TRANSITION_DURATION = 150, n.DEFAULTS = {
        backdrop: !0,
        keyboard: !0,
        show: !0
    }, n.prototype.toggle = function (t) {
        return this.isShown ? this.hide() : this.show(t)
    }, n.prototype.show = function (e) {
        var i = this, o = t.Event("show.bs.modal", {relatedTarget: e});
        this.$element.trigger(o), this.isShown || o.isDefaultPrevented() || (this.isShown = !0, this.checkScrollbar(), this.setScrollbar(), this.$body.addClass("modal-open"), this.escape(), this.resize(), this.$element.on("click.dismiss.bs.modal", '[data-dismiss="modal"]', t.proxy(this.hide, this)), this.$dialog.on("mousedown.dismiss.bs.modal", function () {
            i.$element.one("mouseup.dismiss.bs.modal", function (e) {
                t(e.target).is(i.$element) && (i.ignoreBackdropClick = !0)
            })
        }), this.backdrop(function () {
            var o = t.support.transition && i.$element.hasClass("fade");
            i.$element.parent().length || i.$element.appendTo(i.$body), i.$element.show().scrollTop(0), i.adjustDialog(), o && i.$element[0].offsetWidth, i.$element.addClass("in"), i.enforceFocus();
            var s = t.Event("shown.bs.modal", {relatedTarget: e});
            o ? i.$dialog.one("bsTransitionEnd", function () {
                i.$element.trigger("focus").trigger(s)
            }).emulateTransitionEnd(n.TRANSITION_DURATION) : i.$element.trigger("focus").trigger(s)
        }))
    }, n.prototype.hide = function (e) {
        e && e.preventDefault(), e = t.Event("hide.bs.modal"), this.$element.trigger(e), this.isShown && !e.isDefaultPrevented() && (this.isShown = !1, this.escape(), this.resize(), t(document).off("focusin.bs.modal"), this.$element.removeClass("in").off("click.dismiss.bs.modal").off("mouseup.dismiss.bs.modal"), this.$dialog.off("mousedown.dismiss.bs.modal"), t.support.transition && this.$element.hasClass("fade") ? this.$element.one("bsTransitionEnd", t.proxy(this.hideModal, this)).emulateTransitionEnd(n.TRANSITION_DURATION) : this.hideModal())
    }, n.prototype.enforceFocus = function () {
        t(document).off("focusin.bs.modal").on("focusin.bs.modal", t.proxy(function (t) {
            document === t.target || this.$element[0] === t.target || this.$element.has(t.target).length || this.$element.trigger("focus")
        }, this))
    }, n.prototype.escape = function () {
        this.isShown && this.options.keyboard ? this.$element.on("keydown.dismiss.bs.modal", t.proxy(function (t) {
            27 == t.which && this.hide()
        }, this)) : this.isShown || this.$element.off("keydown.dismiss.bs.modal")
    }, n.prototype.resize = function () {
        this.isShown ? t(window).on("resize.bs.modal", t.proxy(this.handleUpdate, this)) : t(window).off("resize.bs.modal")
    }, n.prototype.hideModal = function () {
        var t = this;
        this.$element.hide(), this.backdrop(function () {
            t.$body.removeClass("modal-open"), t.resetAdjustments(), t.resetScrollbar(), t.$element.trigger("hidden.bs.modal")
        })
    }, n.prototype.removeBackdrop = function () {
        this.$backdrop && this.$backdrop.remove(), this.$backdrop = null
    }, n.prototype.backdrop = function (e) {
        var i = this, o = this.$element.hasClass("fade") ? "fade" : "";
        if (this.isShown && this.options.backdrop) {
            var s = t.support.transition && o;
            if (this.$backdrop = t(document.createElement("div")).addClass("modal-backdrop " + o).appendTo(this.$body), this.$element.on("click.dismiss.bs.modal", t.proxy(function (t) {
                    return this.ignoreBackdropClick ? void(this.ignoreBackdropClick = !1) : void(t.target === t.currentTarget && ("static" == this.options.backdrop ? this.$element[0].focus() : this.hide()))
                }, this)), s && this.$backdrop[0].offsetWidth, this.$backdrop.addClass("in"), !e) return;
            s ? this.$backdrop.one("bsTransitionEnd", e).emulateTransitionEnd(n.BACKDROP_TRANSITION_DURATION) : e()
        } else if (!this.isShown && this.$backdrop) {
            this.$backdrop.removeClass("in");
            var a = function () {
                i.removeBackdrop(), e && e()
            };
            t.support.transition && this.$element.hasClass("fade") ? this.$backdrop.one("bsTransitionEnd", a).emulateTransitionEnd(n.BACKDROP_TRANSITION_DURATION) : a()
        } else e && e()
    }, n.prototype.handleUpdate = function () {
        this.adjustDialog()
    }, n.prototype.adjustDialog = function () {
        var t = this.$element[0].scrollHeight > document.documentElement.clientHeight;
        this.$element.css({
            paddingLeft: !this.bodyIsOverflowing && t ? this.scrollbarWidth : "",
            paddingRight: this.bodyIsOverflowing && !t ? this.scrollbarWidth : ""
        })
    }, n.prototype.resetAdjustments = function () {
        this.$element.css({paddingLeft: "", paddingRight: ""})
    }, n.prototype.checkScrollbar = function () {
        var t = window.innerWidth;
        if (!t) {
            var e = document.documentElement.getBoundingClientRect();
            t = e.right - Math.abs(e.left)
        }
        this.bodyIsOverflowing = document.body.clientWidth < t, this.scrollbarWidth = this.measureScrollbar()
    }, n.prototype.setScrollbar = function () {
        var t = parseInt(this.$body.css("padding-right") || 0, 10);
        this.originalBodyPad = document.body.style.paddingRight || "", this.bodyIsOverflowing && this.$body.css("padding-right", t + this.scrollbarWidth)
    }, n.prototype.resetScrollbar = function () {
        this.$body.css("padding-right", this.originalBodyPad)
    }, n.prototype.measureScrollbar = function () {
        var t = document.createElement("div");
        t.className = "modal-scrollbar-measure", this.$body.append(t);
        var e = t.offsetWidth - t.clientWidth;
        return this.$body[0].removeChild(t), e
    };
    var i = t.fn.modal;
    t.fn.modal = e, t.fn.modal.Constructor = n, t.fn.modal.noConflict = function () {
        return t.fn.modal = i, this
    }, t(document).on("click.bs.modal.data-api", '[data-toggle="modal"]', function (n) {
        var i = t(this), o = i.attr("href"), s = t(i.attr("data-target") || o && o.replace(/.*(?=#[^\s]+$)/, "")),
            a = s.data("bs.modal") ? "toggle" : t.extend({remote: !/#/.test(o) && o}, s.data(), i.data());
        i.is("a") && n.preventDefault(), s.one("show.bs.modal", function (t) {
            t.isDefaultPrevented() || s.one("hidden.bs.modal", function () {
                i.is(":visible") && i.trigger("focus")
            })
        }), e.call(s, a, this)
    })
}(jQuery), function (t) {
    "use strict";

    function e(e) {
        return this.each(function () {
            var i = t(this), o = i.data("bs.tooltip"), s = "object" == typeof e && e;
            !o && /destroy|hide/.test(e) || (o || i.data("bs.tooltip", o = new n(this, s)), "string" == typeof e && o[e]())
        })
    }

    var n = function (t, e) {
        this.type = null, this.options = null, this.enabled = null, this.timeout = null, this.hoverState = null, this.$element = null, this.inState = null, this.init("tooltip", t, e)
    };
    n.VERSION = "3.3.7", n.TRANSITION_DURATION = 150, n.DEFAULTS = {
        animation: !0,
        placement: "top",
        selector: !1,
        template: '<div class="tooltip" role="tooltip"><div class="tooltip-arrow"></div><div class="tooltip-inner"></div></div>',
        trigger: "hover focus",
        title: "",
        delay: 0,
        html: !1,
        container: !1,
        viewport: {selector: "body", padding: 0}
    }, n.prototype.init = function (e, n, i) {
        if (this.enabled = !0, this.type = e, this.$element = t(n), this.options = this.getOptions(i), this.$viewport = this.options.viewport && t(t.isFunction(this.options.viewport) ? this.options.viewport.call(this, this.$element) : this.options.viewport.selector || this.options.viewport), this.inState = {
                click: !1,
                hover: !1,
                focus: !1
            }, this.$element[0] instanceof document.constructor && !this.options.selector) throw new Error("`selector` option must be specified when initializing " + this.type + " on the window.document object!");
        for (var o = this.options.trigger.split(" "), s = o.length; s--;) {
            var a = o[s];
            if ("click" == a) this.$element.on("click." + this.type, this.options.selector, t.proxy(this.toggle, this)); else if ("manual" != a) {
                var r = "hover" == a ? "mouseenter" : "focusin", c = "hover" == a ? "mouseleave" : "focusout";
                this.$element.on(r + "." + this.type, this.options.selector, t.proxy(this.enter, this)), this.$element.on(c + "." + this.type, this.options.selector, t.proxy(this.leave, this))
            }
        }
        this.options.selector ? this._options = t.extend({}, this.options, {
            trigger: "manual",
            selector: ""
        }) : this.fixTitle()
    }, n.prototype.getDefaults = function () {
        return n.DEFAULTS
    }, n.prototype.getOptions = function (e) {
        return e = t.extend({}, this.getDefaults(), this.$element.data(), e), e.delay && "number" == typeof e.delay && (e.delay = {
            show: e.delay,
            hide: e.delay
        }), e
    }, n.prototype.getDelegateOptions = function () {
        var e = {}, n = this.getDefaults();
        return this._options && t.each(this._options, function (t, i) {
            n[t] != i && (e[t] = i)
        }), e
    }, n.prototype.enter = function (e) {
        var n = e instanceof this.constructor ? e : t(e.currentTarget).data("bs." + this.type);
        return n || (n = new this.constructor(e.currentTarget, this.getDelegateOptions()), t(e.currentTarget).data("bs." + this.type, n)), e instanceof t.Event && (n.inState["focusin" == e.type ? "focus" : "hover"] = !0), n.tip().hasClass("in") || "in" == n.hoverState ? void(n.hoverState = "in") : (clearTimeout(n.timeout), n.hoverState = "in", n.options.delay && n.options.delay.show ? void(n.timeout = setTimeout(function () {
            "in" == n.hoverState && n.show()
        }, n.options.delay.show)) : n.show())
    }, n.prototype.isInStateTrue = function () {
        for (var t in this.inState) if (this.inState[t]) return !0;
        return !1
    }, n.prototype.leave = function (e) {
        var n = e instanceof this.constructor ? e : t(e.currentTarget).data("bs." + this.type);
        if (n || (n = new this.constructor(e.currentTarget, this.getDelegateOptions()), t(e.currentTarget).data("bs." + this.type, n)), e instanceof t.Event && (n.inState["focusout" == e.type ? "focus" : "hover"] = !1), !n.isInStateTrue()) return clearTimeout(n.timeout), n.hoverState = "out", n.options.delay && n.options.delay.hide ? void(n.timeout = setTimeout(function () {
            "out" == n.hoverState && n.hide()
        }, n.options.delay.hide)) : n.hide()
    }, n.prototype.show = function () {
        var e = t.Event("show.bs." + this.type);
        if (this.hasContent() && this.enabled) {
            this.$element.trigger(e);
            var i = t.contains(this.$element[0].ownerDocument.documentElement, this.$element[0]);
            if (e.isDefaultPrevented() || !i) return;
            var o = this, s = this.tip(), a = this.getUID(this.type);
            this.setContent(), s.attr("id", a), this.$element.attr("aria-describedby", a), this.options.animation && s.addClass("fade");
            var r = "function" == typeof this.options.placement ? this.options.placement.call(this, s[0], this.$element[0]) : this.options.placement,
                c = /\s?auto?\s?/i, l = c.test(r);
            l && (r = r.replace(c, "") || "top"), s.detach().css({
                top: 0,
                left: 0,
                display: "block"
            }).addClass(r).data("bs." + this.type, this), this.options.container ? s.appendTo(this.options.container) : s.insertAfter(this.$element), this.$element.trigger("inserted.bs." + this.type);
            var d = this.getPosition(), p = s[0].offsetWidth, u = s[0].offsetHeight;
            if (l) {
                var f = r, h = this.getPosition(this.$viewport);
                r = "bottom" == r && d.bottom + u > h.bottom ? "top" : "top" == r && d.top - u < h.top ? "bottom" : "right" == r && d.right + p > h.width ? "left" : "left" == r && d.left - p < h.left ? "right" : r, s.removeClass(f).addClass(r)
            }
            var M = this.getCalculatedOffset(r, d, p, u);
            this.applyPlacement(M, r);
            var b = function () {
                var t = o.hoverState;
                o.$element.trigger("shown.bs." + o.type), o.hoverState = null, "out" == t && o.leave(o)
            };
            t.support.transition && this.$tip.hasClass("fade") ? s.one("bsTransitionEnd", b).emulateTransitionEnd(n.TRANSITION_DURATION) : b()
        }
    }, n.prototype.applyPlacement = function (e, n) {
        var i = this.tip(), o = i[0].offsetWidth, s = i[0].offsetHeight, a = parseInt(i.css("margin-top"), 10),
            r = parseInt(i.css("margin-left"), 10);
        isNaN(a) && (a = 0), isNaN(r) && (r = 0), e.top += a, e.left += r, t.offset.setOffset(i[0], t.extend({
            using: function (t) {
                i.css({top: Math.round(t.top), left: Math.round(t.left)})
            }
        }, e), 0), i.addClass("in");
        var c = i[0].offsetWidth, l = i[0].offsetHeight;
        "top" == n && l != s && (e.top = e.top + s - l);
        var d = this.getViewportAdjustedDelta(n, e, c, l);
        d.left ? e.left += d.left : e.top += d.top;
        var p = /top|bottom/.test(n), u = p ? 2 * d.left - o + c : 2 * d.top - s + l,
            f = p ? "offsetWidth" : "offsetHeight";
        i.offset(e), this.replaceArrow(u, i[0][f], p)
    }, n.prototype.replaceArrow = function (t, e, n) {
        this.arrow().css(n ? "left" : "top", 50 * (1 - t / e) + "%").css(n ? "top" : "left", "")
    }, n.prototype.setContent = function () {
        var t = this.tip(), e = this.getTitle();
        t.find(".tooltip-inner")[this.options.html ? "html" : "text"](e), t.removeClass("fade in top bottom left right")
    }, n.prototype.hide = function (e) {
        function i() {
            "in" != o.hoverState && s.detach(), o.$element && o.$element.removeAttr("aria-describedby").trigger("hidden.bs." + o.type), e && e()
        }

        var o = this, s = t(this.$tip), a = t.Event("hide.bs." + this.type);
        if (this.$element.trigger(a), !a.isDefaultPrevented()) return s.removeClass("in"), t.support.transition && s.hasClass("fade") ? s.one("bsTransitionEnd", i).emulateTransitionEnd(n.TRANSITION_DURATION) : i(), this.hoverState = null, this
    }, n.prototype.fixTitle = function () {
        var t = this.$element;
        (t.attr("title") || "string" != typeof t.attr("data-original-title")) && t.attr("data-original-title", t.attr("title") || "").attr("title", "")
    }, n.prototype.hasContent = function () {
        return this.getTitle()
    }, n.prototype.getPosition = function (e) {
        e = e || this.$element;
        var n = e[0], i = "BODY" == n.tagName, o = n.getBoundingClientRect();
        null == o.width && (o = t.extend({}, o, {width: o.right - o.left, height: o.bottom - o.top}));
        var s = window.SVGElement && n instanceof window.SVGElement, a = i ? {top: 0, left: 0} : s ? null : e.offset(),
            r = {scroll: i ? document.documentElement.scrollTop || document.body.scrollTop : e.scrollTop()},
            c = i ? {width: t(window).width(), height: t(window).height()} : null;
        return t.extend({}, o, r, c, a)
    }, n.prototype.getCalculatedOffset = function (t, e, n, i) {
        return "bottom" == t ? {
            top: e.top + e.height,
            left: e.left + e.width / 2 - n / 2
        } : "top" == t ? {
            top: e.top - i,
            left: e.left + e.width / 2 - n / 2
        } : "left" == t ? {top: e.top + e.height / 2 - i / 2, left: e.left - n} : {
            top: e.top + e.height / 2 - i / 2,
            left: e.left + e.width
        }
    }, n.prototype.getViewportAdjustedDelta = function (t, e, n, i) {
        var o = {top: 0, left: 0};
        if (!this.$viewport) return o;
        var s = this.options.viewport && this.options.viewport.padding || 0, a = this.getPosition(this.$viewport);
        if (/right|left/.test(t)) {
            var r = e.top - s - a.scroll, c = e.top + s - a.scroll + i;
            r < a.top ? o.top = a.top - r : c > a.top + a.height && (o.top = a.top + a.height - c)
        } else {
            var l = e.left - s, d = e.left + s + n;
            l < a.left ? o.left = a.left - l : d > a.right && (o.left = a.left + a.width - d)
        }
        return o
    }, n.prototype.getTitle = function () {
        var t = this.$element, e = this.options;
        return t.attr("data-original-title") || ("function" == typeof e.title ? e.title.call(t[0]) : e.title)
    }, n.prototype.getUID = function (t) {
        do {
            t += ~~(1e6 * Math.random())
        } while (document.getElementById(t));
        return t
    }, n.prototype.tip = function () {
        if (!this.$tip && (this.$tip = t(this.options.template), 1 != this.$tip.length)) throw new Error(this.type + " `template` option must consist of exactly 1 top-level element!");
        return this.$tip
    }, n.prototype.arrow = function () {
        return this.$arrow = this.$arrow || this.tip().find(".tooltip-arrow")
    }, n.prototype.enable = function () {
        this.enabled = !0
    }, n.prototype.disable = function () {
        this.enabled = !1
    }, n.prototype.toggleEnabled = function () {
        this.enabled = !this.enabled
    }, n.prototype.toggle = function (e) {
        var n = this;
        e && ((n = t(e.currentTarget).data("bs." + this.type)) || (n = new this.constructor(e.currentTarget, this.getDelegateOptions()), t(e.currentTarget).data("bs." + this.type, n))), e ? (n.inState.click = !n.inState.click, n.isInStateTrue() ? n.enter(n) : n.leave(n)) : n.tip().hasClass("in") ? n.leave(n) : n.enter(n)
    }, n.prototype.destroy = function () {
        var t = this;
        clearTimeout(this.timeout), this.hide(function () {
            t.$element.off("." + t.type).removeData("bs." + t.type), t.$tip && t.$tip.detach(), t.$tip = null, t.$arrow = null, t.$viewport = null, t.$element = null
        })
    };
    var i = t.fn.tooltip;
    t.fn.tooltip = e, t.fn.tooltip.Constructor = n, t.fn.tooltip.noConflict = function () {
        return t.fn.tooltip = i, this
    }
}(jQuery), function (t) {
    "use strict";

    function e(e) {
        return this.each(function () {
            var i = t(this), o = i.data("bs.popover"), s = "object" == typeof e && e;
            !o && /destroy|hide/.test(e) || (o || i.data("bs.popover", o = new n(this, s)), "string" == typeof e && o[e]())
        })
    }

    var n = function (t, e) {
        this.init("popover", t, e)
    };
    if (!t.fn.tooltip) throw new Error("Popover requires tooltip.js");
    n.VERSION = "3.3.7", n.DEFAULTS = t.extend({}, t.fn.tooltip.Constructor.DEFAULTS, {
        placement: "right",
        trigger: "click",
        content: "",
        template: '<div class="popover" role="tooltip"><div class="arrow"></div><h3 class="popover-title"></h3><div class="popover-content"></div></div>'
    }), n.prototype = t.extend({}, t.fn.tooltip.Constructor.prototype), n.prototype.constructor = n, n.prototype.getDefaults = function () {
        return n.DEFAULTS
    }, n.prototype.setContent = function () {
        var t = this.tip(), e = this.getTitle(), n = this.getContent();
        t.find(".popover-title")[this.options.html ? "html" : "text"](e), t.find(".popover-content").children().detach().end()[this.options.html ? "string" == typeof n ? "html" : "append" : "text"](n), t.removeClass("fade top bottom left right in"), t.find(".popover-title").html() || t.find(".popover-title").hide()
    }, n.prototype.hasContent = function () {
        return this.getTitle() || this.getContent()
    }, n.prototype.getContent = function () {
        var t = this.$element, e = this.options;
        return t.attr("data-content") || ("function" == typeof e.content ? e.content.call(t[0]) : e.content)
    }, n.prototype.arrow = function () {
        return this.$arrow = this.$arrow || this.tip().find(".arrow")
    };
    var i = t.fn.popover;
    t.fn.popover = e, t.fn.popover.Constructor = n, t.fn.popover.noConflict = function () {
        return t.fn.popover = i, this
    }
}(jQuery), function (t) {
    "use strict";

    function e(n, i) {
        this.$body = t(document.body), this.$scrollElement = t(t(n).is(document.body) ? window : n), this.options = t.extend({}, e.DEFAULTS, i), this.selector = (this.options.target || "") + " .nav li > a", this.offsets = [], this.targets = [], this.activeTarget = null, this.scrollHeight = 0, this.$scrollElement.on("scroll.bs.scrollspy", t.proxy(this.process, this)), this.refresh(), this.process()
    }

    function n(n) {
        return this.each(function () {
            var i = t(this), o = i.data("bs.scrollspy"), s = "object" == typeof n && n;
            o || i.data("bs.scrollspy", o = new e(this, s)), "string" == typeof n && o[n]()
        })
    }

    e.VERSION = "3.3.7", e.DEFAULTS = {offset: 10}, e.prototype.getScrollHeight = function () {
        return this.$scrollElement[0].scrollHeight || Math.max(this.$body[0].scrollHeight, document.documentElement.scrollHeight)
    }, e.prototype.refresh = function () {
        var e = this, n = "offset", i = 0;
        this.offsets = [], this.targets = [], this.scrollHeight = this.getScrollHeight(), t.isWindow(this.$scrollElement[0]) || (n = "position", i = this.$scrollElement.scrollTop()), this.$body.find(this.selector).map(function () {
            var e = t(this), o = e.data("target") || e.attr("href"), s = /^#./.test(o) && t(o);
            return s && s.length && s.is(":visible") && [[s[n]().top + i, o]] || null
        }).sort(function (t, e) {
            return t[0] - e[0]
        }).each(function () {
            e.offsets.push(this[0]), e.targets.push(this[1])
        })
    }, e.prototype.process = function () {
        var t, e = this.$scrollElement.scrollTop() + this.options.offset, n = this.getScrollHeight(),
            i = this.options.offset + n - this.$scrollElement.height(), o = this.offsets, s = this.targets,
            a = this.activeTarget;
        if (this.scrollHeight != n && this.refresh(), e >= i) return a != (t = s[s.length - 1]) && this.activate(t);
        if (a && e < o[0]) return this.activeTarget = null, this.clear();
        for (t = o.length; t--;) a != s[t] && e >= o[t] && (void 0 === o[t + 1] || e < o[t + 1]) && this.activate(s[t])
    }, e.prototype.activate = function (e) {
        this.activeTarget = e, this.clear();
        var n = this.selector + '[data-target="' + e + '"],' + this.selector + '[href="' + e + '"]',
            i = t(n).parents("li").addClass("active");
        i.parent(".dropdown-menu").length && (i = i.closest("li.dropdown").addClass("active")), i.trigger("activate.bs.scrollspy")
    }, e.prototype.clear = function () {
        t(this.selector).parentsUntil(this.options.target, ".active").removeClass("active")
    };
    var i = t.fn.scrollspy;
    t.fn.scrollspy = n, t.fn.scrollspy.Constructor = e, t.fn.scrollspy.noConflict = function () {
        return t.fn.scrollspy = i, this
    }, t(window).on("load.bs.scrollspy.data-api", function () {
        t('[data-spy="scroll"]').each(function () {
            var e = t(this);
            n.call(e, e.data())
        })
    })
}(jQuery), function (t) {
    "use strict";

    function e(e) {
        return this.each(function () {
            var i = t(this), o = i.data("bs.tab");
            o || i.data("bs.tab", o = new n(this)), "string" == typeof e && o[e]()
        })
    }

    var n = function (e) {
        this.element = t(e)
    };
    n.VERSION = "3.3.7", n.TRANSITION_DURATION = 150, n.prototype.show = function () {
        var e = this.element, n = e.closest("ul:not(.dropdown-menu)"), i = e.data("target");
        if (i || (i = e.attr("href"), i = i && i.replace(/.*(?=#[^\s]*$)/, "")), !e.parent("li").hasClass("active")) {
            var o = n.find(".active:last a"), s = t.Event("hide.bs.tab", {relatedTarget: e[0]}),
                a = t.Event("show.bs.tab", {relatedTarget: o[0]});
            if (o.trigger(s), e.trigger(a), !a.isDefaultPrevented() && !s.isDefaultPrevented()) {
                var r = t(i);
                this.activate(e.closest("li"), n), this.activate(r, r.parent(), function () {
                    o.trigger({type: "hidden.bs.tab", relatedTarget: e[0]}), e.trigger({
                        type: "shown.bs.tab",
                        relatedTarget: o[0]
                    })
                })
            }
        }
    }, n.prototype.activate = function (e, i, o) {
        function s() {
            a.removeClass("active").find("> .dropdown-menu > .active").removeClass("active").end().find('[data-toggle="tab"]').attr("aria-expanded", !1), e.addClass("active").find('[data-toggle="tab"]').attr("aria-expanded", !0), r ? (e[0].offsetWidth, e.addClass("in")) : e.removeClass("fade"), e.parent(".dropdown-menu").length && e.closest("li.dropdown").addClass("active").end().find('[data-toggle="tab"]').attr("aria-expanded", !0), o && o()
        }

        var a = i.find("> .active"),
            r = o && t.support.transition && (a.length && a.hasClass("fade") || !!i.find("> .fade").length);
        a.length && r ? a.one("bsTransitionEnd", s).emulateTransitionEnd(n.TRANSITION_DURATION) : s(), a.removeClass("in")
    };
    var i = t.fn.tab;
    t.fn.tab = e, t.fn.tab.Constructor = n, t.fn.tab.noConflict = function () {
        return t.fn.tab = i, this
    };
    var o = function (n) {
        n.preventDefault(), e.call(t(this), "show")
    };
    t(document).on("click.bs.tab.data-api", '[data-toggle="tab"]', o).on("click.bs.tab.data-api", '[data-toggle="pill"]', o)
}(jQuery), function (t) {
    "use strict";

    function e(e) {
        return this.each(function () {
            var i = t(this), o = i.data("bs.affix"), s = "object" == typeof e && e;
            o || i.data("bs.affix", o = new n(this, s)), "string" == typeof e && o[e]()
        })
    }

    var n = function (e, i) {
        this.options = t.extend({}, n.DEFAULTS, i), this.$target = t(this.options.target).on("scroll.bs.affix.data-api", t.proxy(this.checkPosition, this)).on("click.bs.affix.data-api", t.proxy(this.checkPositionWithEventLoop, this)), this.$element = t(e), this.affixed = null, this.unpin = null, this.pinnedOffset = null, this.checkPosition()
    };
    n.VERSION = "3.3.7", n.RESET = "affix affix-top affix-bottom", n.DEFAULTS = {
        offset: 0,
        target: window
    }, n.prototype.getState = function (t, e, n, i) {
        var o = this.$target.scrollTop(), s = this.$element.offset(), a = this.$target.height();
        if (null != n && "top" == this.affixed) return o < n && "top";
        if ("bottom" == this.affixed) return null != n ? !(o + this.unpin <= s.top) && "bottom" : !(o + a <= t - i) && "bottom";
        var r = null == this.affixed, c = r ? o : s.top, l = r ? a : e;
        return null != n && o <= n ? "top" : null != i && c + l >= t - i && "bottom"
    }, n.prototype.getPinnedOffset = function () {
        if (this.pinnedOffset) return this.pinnedOffset;
        this.$element.removeClass(n.RESET).addClass("affix");
        var t = this.$target.scrollTop(), e = this.$element.offset();
        return this.pinnedOffset = e.top - t
    }, n.prototype.checkPositionWithEventLoop = function () {
        setTimeout(t.proxy(this.checkPosition, this), 1)
    }, n.prototype.checkPosition = function () {
        if (this.$element.is(":visible")) {
            var e = this.$element.height(), i = this.options.offset, o = i.top, s = i.bottom,
                a = Math.max(t(document).height(), t(document.body).height());
            "object" != typeof i && (s = o = i), "function" == typeof o && (o = i.top(this.$element)), "function" == typeof s && (s = i.bottom(this.$element));
            var r = this.getState(a, e, o, s);
            if (this.affixed != r) {
                null != this.unpin && this.$element.css("top", "");
                var c = "affix" + (r ? "-" + r : ""), l = t.Event(c + ".bs.affix");
                if (this.$element.trigger(l), l.isDefaultPrevented()) return;
                this.affixed = r, this.unpin = "bottom" == r ? this.getPinnedOffset() : null, this.$element.removeClass(n.RESET).addClass(c).trigger(c.replace("affix", "affixed") + ".bs.affix")
            }
            "bottom" == r && this.$element.offset({top: a - e - s})
        }
    };
    var i = t.fn.affix;
    t.fn.affix = e, t.fn.affix.Constructor = n, t.fn.affix.noConflict = function () {
        return t.fn.affix = i, this
    }, t(window).on("load", function () {
        t('[data-spy="affix"]').each(function () {
            var n = t(this), i = n.data();
            i.offset = i.offset || {}, null != i.offsetBottom && (i.offset.bottom = i.offsetBottom), null != i.offsetTop && (i.offset.top = i.offsetTop), e.call(n, i)
        })
    })
}(jQuery), function () {
}.call(this), function () {
    (function () {
        (function () {
            var e = [].slice;
            this.ActionCable = {
                INTERNAL: {
                    message_types: {
                        welcome: "welcome",
                        ping: "ping",
                        confirmation: "confirm_subscription",
                        rejection: "reject_subscription"
                    }, default_mount_path: "/cable", protocols: ["actioncable-v1-json", "actioncable-unsupported"]
                }, WebSocket: window.WebSocket, logger: window.console, createConsumer: function (e) {
                    var n;
                    return null == e && (e = null != (n = this.getConfig("url")) ? n : this.INTERNAL.default_mount_path), new t.Consumer(this.createWebSocketURL(e))
                }, getConfig: function (t) {
                    var e;
                    return e = document.head.querySelector("meta[name='action-cable-" + t + "']"), null != e ? e.getAttribute("content") : void 0
                }, createWebSocketURL: function (t) {
                    var e;
                    return t && !/^wss?:/i.test(t) ? (e = document.createElement("a"), e.href = t, e.href = e.href, e.protocol = e.protocol.replace("http", "ws"), e.href) : t
                }, startDebugging: function () {
                    return this.debugging = !0
                }, stopDebugging: function () {
                    return this.debugging = null
                }, log: function () {
                    var t, n;
                    if (t = 1 <= arguments.length ? e.call(arguments, 0) : [], this.debugging) return t.push(Date.now()), (n = this.logger).log.apply(n, ["[ActionCable]"].concat(e.call(t)))
                }
            }
        }).call(this)
    }).call(this);
    var t = this.ActionCable;
    (function () {
        (function () {
            var e = function (t, e) {
                return function () {
                    return t.apply(e, arguments)
                }
            };
            t.ConnectionMonitor = function () {
                function n(t) {
                    this.connection = t, this.visibilityDidChange = e(this.visibilityDidChange, this), this.reconnectAttempts = 0
                }

                var i, o, s;
                return n.pollInterval = {min: 3, max: 30}, n.staleThreshold = 6, n.prototype.start = function () {
                    if (!this.isRunning()) return this.startedAt = o(), delete this.stoppedAt, this.startPolling(), document.addEventListener("visibilitychange", this.visibilityDidChange), t.log("ConnectionMonitor started. pollInterval = " + this.getPollInterval() + " ms")
                }, n.prototype.stop = function () {
                    if (this.isRunning()) return this.stoppedAt = o(), this.stopPolling(), document.removeEventListener("visibilitychange", this.visibilityDidChange), t.log("ConnectionMonitor stopped")
                }, n.prototype.isRunning = function () {
                    return null != this.startedAt && null == this.stoppedAt
                }, n.prototype.recordPing = function () {
                    return this.pingedAt = o()
                }, n.prototype.recordConnect = function () {
                    return this.reconnectAttempts = 0, this.recordPing(), delete this.disconnectedAt, t.log("ConnectionMonitor recorded connect")
                }, n.prototype.recordDisconnect = function () {
                    return this.disconnectedAt = o(), t.log("ConnectionMonitor recorded disconnect")
                }, n.prototype.startPolling = function () {
                    return this.stopPolling(), this.poll()
                }, n.prototype.stopPolling = function () {
                    return clearTimeout(this.pollTimeout)
                }, n.prototype.poll = function () {
                    return this.pollTimeout = setTimeout(function (t) {
                        return function () {
                            return t.reconnectIfStale(), t.poll()
                        }
                    }(this), this.getPollInterval())
                }, n.prototype.getPollInterval = function () {
                    var t, e, n, o;
                    return o = this.constructor.pollInterval, n = o.min, e = o.max, t = 5 * Math.log(this.reconnectAttempts + 1), Math.round(1e3 * i(t, n, e))
                }, n.prototype.reconnectIfStale = function () {
                    if (this.connectionIsStale()) return t.log("ConnectionMonitor detected stale connection. reconnectAttempts = " + this.reconnectAttempts + ", pollInterval = " + this.getPollInterval() + " ms, time disconnected = " + s(this.disconnectedAt) + " s, stale threshold = " + this.constructor.staleThreshold + " s"), this.reconnectAttempts++, this.disconnectedRecently() ? t.log("ConnectionMonitor skipping reopening recent disconnect") : (t.log("ConnectionMonitor reopening"), this.connection.reopen())
                }, n.prototype.connectionIsStale = function () {
                    var t;
                    return s(null != (t = this.pingedAt) ? t : this.startedAt) > this.constructor.staleThreshold
                }, n.prototype.disconnectedRecently = function () {
                    return this.disconnectedAt && s(this.disconnectedAt) < this.constructor.staleThreshold
                }, n.prototype.visibilityDidChange = function () {
                    if ("visible" === document.visibilityState) return setTimeout(function (e) {
                        return function () {
                            if (e.connectionIsStale() || !e.connection.isOpen()) return t.log("ConnectionMonitor reopening stale connection on visibilitychange. visbilityState = " + document.visibilityState), e.connection.reopen()
                        }
                    }(this), 200)
                }, o = function () {
                    return (new Date).getTime()
                }, s = function (t) {
                    return (o() - t) / 1e3
                }, i = function (t, e, n) {
                    return Math.max(e, Math.min(n, t))
                }, n
            }()
        }).call(this), function () {
            var e, n, i, o, s, a = [].slice, r = function (t, e) {
                return function () {
                    return t.apply(e, arguments)
                }
            }, c = [].indexOf || function (t) {
                for (var e = 0, n = this.length; e < n; e++) if (e in this && this[e] === t) return e;
                return -1
            };
            o = t.INTERNAL, n = o.message_types, i = o.protocols, s = 2 <= i.length ? a.call(i, 0, e = i.length - 1) : (e = 0, []), i[e++], t.Connection = function () {
                function e(e) {
                    this.consumer = e, this.open = r(this.open, this), this.subscriptions = this.consumer.subscriptions, this.monitor = new t.ConnectionMonitor(this), this.disconnected = !0
                }

                return e.reopenDelay = 500, e.prototype.send = function (t) {
                    return !!this.isOpen() && (this.webSocket.send(JSON.stringify(t)), !0)
                }, e.prototype.open = function () {
                    return this.isActive() ? (t.log("Attempted to open WebSocket, but existing socket is " + this.getState()), !1) : (t.log("Opening WebSocket, current state is " + this.getState() + ", subprotocols: " + i), null != this.webSocket && this.uninstallEventHandlers(), this.installEventHandlers(), this.monitor.start(), !0)
                }, e.prototype.close = function (t) {
                    var e, n;
                    if (e = (null != t ? t : {allowReconnect: !0}).allowReconnect, e || this.monitor.stop(), this.isActive()) return null != (n = this.webSocket) ? n.close() : void 0
                }, e.prototype.reopen = function () {
                    var e;
                    if (t.log("Reopening WebSocket, current state is " + this.getState()), !this.isActive()) return this.open();
                    try {
                        return this.close()
                    } catch (n) {
                        return e = n, t.log("Failed to reopen WebSocket", e)
                    } finally {
                        t.log("Reopening WebSocket in " + this.constructor.reopenDelay + "ms"), setTimeout(this.open, this.constructor.reopenDelay)
                    }
                }, e.prototype.getProtocol = function () {
                    var t;
                    return null != (t = this.webSocket) ? t.protocol : void 0
                }, e.prototype.isOpen = function () {
                    return this.isState("open")
                }, e.prototype.isActive = function () {
                    return this.isState("open", "connecting")
                }, e.prototype.isProtocolSupported = function () {
                    var t;
                    return t = this.getProtocol(), c.call(s, t) >= 0
                }, e.prototype.isState = function () {
                    var t, e;
                    return e = 1 <= arguments.length ? a.call(arguments, 0) : [], t = this.getState(), c.call(e, t) >= 0
                }, e.prototype.getState = function () {
                    var t, e;
                    for (e in WebSocket) if (WebSocket[e] === (null != (t = this.webSocket) ? t.readyState : void 0)) return e.toLowerCase();
                    return null
                }, e.prototype.installEventHandlers = function () {
                    var t, e;
                }, e.prototype.uninstallEventHandlers = function () {
                    var t;
                    for (t in this.events) this.webSocket["on" + t] = function () {
                    }
                }, e.prototype.events = {
                    message: function (t) {
                        var e, i, o, s;
                        if (this.isProtocolSupported()) switch (o = JSON.parse(t.data), e = o.identifier, i = o.message, s = o.type, s) {
                            case n.welcome:
                                return this.monitor.recordConnect(), this.subscriptions.reload();
                            case n.ping:
                                return this.monitor.recordPing();
                            case n.confirmation:
                                return this.subscriptions.notify(e, "connected");
                            case n.rejection:
                                return this.subscriptions.reject(e);
                            default:
                                return this.subscriptions.notify(e, "received", i)
                        }
                    }, open: function () {
                        if (t.log("WebSocket onopen event, using '" + this.getProtocol() + "' subprotocol"), this.disconnected = !1, !this.isProtocolSupported()) return t.log("Protocol is unsupported. Stopping monitor and disconnecting."), this.close({allowReconnect: !1})
                    }, close: function () {
                        if (t.log("WebSocket onclose event"), !this.disconnected) return this.disconnected = !0, this.monitor.recordDisconnect(), this.subscriptions.notifyAll("disconnected", {willAttemptReconnect: this.monitor.isRunning()})
                    }, error: function () {
                        return t.log("WebSocket onerror event")
                    }
                }, e
            }()
        }.call(this), function () {
            var e = [].slice;
            t.Subscriptions = function () {
                function n(t) {
                    this.consumer = t, this.subscriptions = []
                }

                return n.prototype.create = function (e, n) {
                    var i, o, s;
                    return i = e, o = "object" == typeof i ? i : {channel: i}, s = new t.Subscription(this.consumer, o, n), this.add(s)
                }, n.prototype.add = function (t) {
                    return this.subscriptions.push(t), this.consumer.ensureActiveConnection(), this.notify(t, "initialized"), this.sendCommand(t, "subscribe"), t
                }, n.prototype.remove = function (t) {
                    return this.forget(t), this.findAll(t.identifier).length || this.sendCommand(t, "unsubscribe"), t
                }, n.prototype.reject = function (t) {
                    var e, n, i, o, s;
                    for (i = this.findAll(t), o = [], e = 0, n = i.length; e < n; e++) s = i[e], this.forget(s), this.notify(s, "rejected"), o.push(s);
                    return o
                }, n.prototype.forget = function (t) {
                    var e;
                    return this.subscriptions = function () {
                        var n, i, o, s;
                        for (o = this.subscriptions, s = [], n = 0, i = o.length; n < i; n++) (e = o[n]) !== t && s.push(e);
                        return s
                    }.call(this), t
                }, n.prototype.findAll = function (t) {
                    var e, n, i, o, s;
                    for (i = this.subscriptions, o = [], e = 0, n = i.length; e < n; e++) s = i[e], s.identifier === t && o.push(s);
                    return o
                }, n.prototype.reload = function () {
                    var t, e, n, i, o;
                    for (n = this.subscriptions, i = [], t = 0, e = n.length; t < e; t++) o = n[t],
                        i.push(this.sendCommand(o, "subscribe"));
                    return i
                }, n.prototype.notifyAll = function () {
                    var t, n, i, o, s, a, r;
                    for (n = arguments[0], t = 2 <= arguments.length ? e.call(arguments, 1) : [], s = this.subscriptions, a = [], i = 0, o = s.length; i < o; i++) r = s[i], a.push(this.notify.apply(this, [r, n].concat(e.call(t))));
                    return a
                }, n.prototype.notify = function () {
                    var t, n, i, o, s, a, r;
                    for (a = arguments[0], n = arguments[1], t = 3 <= arguments.length ? e.call(arguments, 2) : [], r = "string" == typeof a ? this.findAll(a) : [a], s = [], i = 0, o = r.length; i < o; i++) a = r[i], s.push("function" == typeof a[n] ? a[n].apply(a, t) : void 0);
                    return s
                }, n.prototype.sendCommand = function (t, e) {
                    var n;
                    return n = t.identifier, this.consumer.send({command: e, identifier: n})
                }, n
            }()
        }.call(this), function () {
            t.Subscription = function () {
                function t(t, n, i) {
                    this.consumer = t, null == n && (n = {}), this.identifier = JSON.stringify(n), e(this, i)
                }

                var e;
                return t.prototype.perform = function (t, e) {
                    return null == e && (e = {}), e.action = t, this.send(e)
                }, t.prototype.send = function (t) {
                    return this.consumer.send({
                        command: "message",
                        identifier: this.identifier,
                        data: JSON.stringify(t)
                    })
                }, t.prototype.unsubscribe = function () {
                    return this.consumer.subscriptions.remove(this)
                }, e = function (t, e) {
                    var n, i;
                    if (null != e) for (n in e) i = e[n], t[n] = i;
                    return t
                }, t
            }()
        }.call(this), function () {
            t.Consumer = function () {
                function e(e) {
                    this.url = e, this.subscriptions = new t.Subscriptions(this), this.connection = new t.Connection(this)
                }

                return e.prototype.send = function (t) {
                    return this.connection.send(t)
                }, e.prototype.connect = function () {
                    return this.connection.open()
                }, e.prototype.disconnect = function () {
                    return this.connection.close({allowReconnect: !1})
                }, e.prototype.ensureActiveConnection = function () {
                    if (!this.connection.isActive()) return this.connection.open()
                }, e
            }()
        }.call(this)
    }).call(this), "object" == typeof module && module.exports ? module.exports = t : "function" == typeof define && define.amd && define(t)
}.call(this), function () {
    this.App || (this.App = {}), App.cable = ActionCable.createConsumer()
}.call(this), function () {
    App.web_notifications = App.cable.subscriptions.create("WebNotificationsChannel", {
        connected: function () {
        }, disconnected: function () {
        }, received: function (t) {
            var e, n;
            return n = ["Woot! Another one!", "Thank you!", "We are reaching our goal even faster!"], e = ["Someone just contributed %s!"], $.notify({
                title: n[Math.floor(Math.random() * n.length)],
                message: e[Math.floor(Math.random() * e.length)].replace("%s", t.amount1)
            }, {
                type: "pastel-success",
                delay: 3e3,
                allow_dismiss: !0,
                newest_on_top: !0,
                animate: {enter: "animated fadeInDown", exit: "animated fadeOutUp"},
                template: '<div data-notify="container" class="col-xs-11 col-sm-3 alert alert-{0}" role="alert"><button type="button" aria-hidden="true" class="close" data-notify="dismiss">\xd7</button><span data-notify="title">{1}</span><span data-notify="message">{2}</span></div>'
            }), $("span#amount_raised").html(Math.round(1e3 * t.stats.amount) / 1e3), Math.round(1e3 * t.stats.amount) / 1e3 > 2800 && ($(".easter_egg").remove(), $(".obr_on").remove()), $("span#raised_from_cap").html(Math.round(1e3 * t.stats.progress_global) / 1e3), $("span#tier_name").html(t.stats.current_tier.name), $("span#left_in_tier").html(Math.round(1e3 * t.stats.left_in_tier) / 1e3), $("span#current_bonus").html(t.stats.current_bonus)
        }
    })
}.call(this), $(window).on("load", function () {
    $(".failed #sidebar").length > 0 && $(".failed #sidebar").affix({
        offset: {
            top: $(".failed #header-holder").outerHeight(),
            bottom: $(document).height() - $("#join-slack").offset().top + 30
        }
    }).on("affix.bs.affix", function () {
        $(this).css({width: $(this).outerWidth()})
    }).on("affix-bottom.bs.affix", function () {
        $(this).css("bottom", "auto")
    });
    var t = $(document.body), e = $(".failed #header-holder").outerHeight();
    t.scrollspy({target: ".failed #leftCol", offset: e}), $(".failed #sidebar a").click(function (t) {
        if (0 == $(t.target).attr("href").indexOf("#") && location.pathname.replace(/^\//, "") == this.pathname.replace(/^\//, "") && location.hostname == this.hostname) {
            var e = $(this.hash);
            if (e = e.length ? e : $("[name=" + this.hash.slice(1) + "]"), e.length) return $("html,body").animate({scrollTop: e.offset().top - 50}, 1e3), !1
        }
    })
}), $(window).on("load", function () {
    if (setTimeout(function () {
            $(".easter_egg").slideDown()
        }, 1e3), $(".token-sale .step1 .checkbox input").on("change", function () {
            3 == $(".token-sale .step1 .checkbox input:checked").length ? $("#wallet-view").removeClass("disabled").prop("disabled", !1) : $("#wallet-view").addClass("disabled").prop("disabled", !0)
        }), $(".token-sale .step2 .checkbox input").on("change", function () {
            2 == $(".token-sale .step2 .checkbox input:checked").length ? $("#contract-view").removeClass("disabled").prop("disabled", !1) : $("#contract-view").addClass("disabled").prop("disabled", !0)
        }), $("#getting-started-dash").length > 0) {
        var t = moment.tz($("#getting-started-dash").data("start"), "Etc/UTC");
        $("#getting-started-dash").countdown(t.toDate(), function (t) {
            var e = "%H:%M:%S";
            t.offset.totalDays > 0 && (e = "%-d day%!d " + e), t.offset.weeks > 0 && (e = "%-w week%!w " + e), $(this).html(t.strftime(e))
        }).on("finish.countdown", function () {
            $.ajax({method: "GET", url: "/show-address"}).done(function (t) {
                $(".right-part .address_data").html('<h4><a href="http://www.etherscan.io/address/' + t.address + '" target="_blank">' + t.domain + "</a></h4><h6>" + t.address + "</h6>")
            })
        })
    }
    adjustHeight(), $(window).on("resize", function () {
        adjustHeight()
    })
}), function (t) {
    "use strict";
    "function" == typeof define && define.amd ? define(["jquery"], t) : t(jQuery)
}(function (t) {
    "use strict";

    function e(t) {
        if (t instanceof Date) return t;
        if (String(t).match(a)) return String(t).match(/^[0-9]*$/) && (t = Number(t)), String(t).match(/\-/) && (t = String(t).replace(/\-/g, "/")), new Date(t);
        throw new Error("Couldn't cast `" + t + "` to a date object.")
    }

    function n(t) {
        var e = t.toString().replace(/([.?*+^$[\]\\(){}|-])/g, "\\$1");
        return new RegExp(e)
    }

    function i(t) {
        return function (e) {
            var i = e.match(/%(-|!)?[A-Z]{1}(:[^;]+;)?/gi);
            if (i) for (var s = 0, a = i.length; s < a; ++s) {
                var r = i[s].match(/%(-|!)?([a-zA-Z]{1})(:[^;]+;)?/), l = n(r[0]), d = r[1] || "", p = r[3] || "",
                    u = null;
                r = r[2], c.hasOwnProperty(r) && (u = c[r], u = Number(t[u])), null !== u && ("!" === d && (u = o(p, u)), "" === d && u < 10 && (u = "0" + u.toString()), e = e.replace(l, u.toString()))
            }
            return e = e.replace(/%%/, "%")
        }
    }

    function o(t, e) {
        var n = "s", i = "";
        return t && (t = t.replace(/(:|;|\s)/gi, "").split(/\,/), 1 === t.length ? n = t[0] : (i = t[0], n = t[1])), Math.abs(e) > 1 ? n : i
    }

    var s = [], a = [], r = {precision: 100, elapse: !1, defer: !1};
    a.push(/^[0-9]*$/.source), a.push(/([0-9]{1,2}\/){2}[0-9]{4}( [0-9]{1,2}(:[0-9]{2}){2})?/.source), a.push(/[0-9]{4}([\/\-][0-9]{1,2}){2}( [0-9]{1,2}(:[0-9]{2}){2})?/.source), a = new RegExp(a.join("|"));
    var c = {
        Y: "years",
        m: "months",
        n: "daysToMonth",
        d: "daysToWeek",
        w: "weeks",
        W: "weeksToMonth",
        H: "hours",
        M: "minutes",
        S: "seconds",
        D: "totalDays",
        I: "totalHours",
        N: "totalMinutes",
        T: "totalSeconds"
    }, l = function (e, n, i) {
        this.el = e, this.$el = t(e), this.interval = null, this.offset = {}, this.options = t.extend({}, r), this.firstTick = !0, this.instanceNumber = s.length, s.push(this), this.$el.data("countdown-instance", this.instanceNumber), i && ("function" == typeof i ? (this.$el.on("update.countdown", i), this.$el.on("stoped.countdown", i), this.$el.on("finish.countdown", i)) : this.options = t.extend({}, r, i)), this.setFinalDate(n), !1 === this.options.defer && this.start()
    };
    t.extend(l.prototype, {
        start: function () {
            null !== this.interval && clearInterval(this.interval);
            var t = this;
            this.update(), this.interval = setInterval(function () {
                t.update.call(t)
            }, this.options.precision)
        }, stop: function () {
            clearInterval(this.interval), this.interval = null, this.dispatchEvent("stoped")
        }, toggle: function () {
            this.interval ? this.stop() : this.start()
        }, pause: function () {
            this.stop()
        }, resume: function () {
            this.start()
        }, remove: function () {
            this.stop.call(this), s[this.instanceNumber] = null, delete this.$el.data().countdownInstance
        }, setFinalDate: function (t) {
            this.finalDate = e(t)
        }, update: function () {
            if (0 === this.$el.closest("html").length) return void this.remove();
            var t, e = new Date;
            if (t = this.finalDate.getTime() - e.getTime(), t = Math.ceil(t / 1e3), t = !this.options.elapse && t < 0 ? 0 : Math.abs(t), this.totalSecsLeft === t || this.firstTick) return void(this.firstTick = !1);
            this.totalSecsLeft = t, this.elapsed = e >= this.finalDate, this.offset = {
                seconds: this.totalSecsLeft % 60,
                minutes: Math.floor(this.totalSecsLeft / 60) % 60,
                hours: Math.floor(this.totalSecsLeft / 60 / 60) % 24,
                days: Math.floor(this.totalSecsLeft / 60 / 60 / 24) % 7,
                daysToWeek: Math.floor(this.totalSecsLeft / 60 / 60 / 24) % 7,
                daysToMonth: Math.floor(this.totalSecsLeft / 60 / 60 / 24 % 30.4368),
                weeks: Math.floor(this.totalSecsLeft / 60 / 60 / 24 / 7),
                weeksToMonth: Math.floor(this.totalSecsLeft / 60 / 60 / 24 / 7) % 4,
                months: Math.floor(this.totalSecsLeft / 60 / 60 / 24 / 30.4368),
                years: Math.abs(this.finalDate.getFullYear() - e.getFullYear()),
                totalDays: Math.floor(this.totalSecsLeft / 60 / 60 / 24),
                totalHours: Math.floor(this.totalSecsLeft / 60 / 60),
                totalMinutes: Math.floor(this.totalSecsLeft / 60),
                totalSeconds: this.totalSecsLeft
            }, this.options.elapse || 0 !== this.totalSecsLeft ? this.dispatchEvent("update") : (this.stop(), this.dispatchEvent("finish"))
        }, dispatchEvent: function (e) {
            var n = t.Event(e + ".countdown");
            n.finalDate = this.finalDate, n.elapsed = this.elapsed, n.offset = t.extend({}, this.offset), n.strftime = i(this.offset), this.$el.trigger(n)
        }
    }), t.fn.countdown = function () {
        var e = Array.prototype.slice.call(arguments, 0);
        return this.each(function () {
            var n = t(this).data("countdown-instance");
            if (n !== undefined) {
                var i = s[n], o = e[0];
                l.prototype.hasOwnProperty(o) ? i[o].apply(i, e.slice(1)) : null === String(o).match(/^[$A-Z_][0-9A-Z_$]*$/i) ? (i.setFinalDate.call(i, o), i.start()) : t.error("Method %s does not exist on jQuery.countdown".replace(/\%s/gi, o))
            } else new l(this, e[0], e[1])
        })
    }
}), function (t, e, n, i) {
    "use strict";

    function o(t) {
        var e = t.currentTarget, i = t.data ? t.data.options : {},
            o = i.selector ? n(i.selector) : t.data ? t.data.items : [], s = n(e).attr("data-fancybox") || "", a = 0,
            r = n.fancybox.getInstance();
        t.preventDefault(), t.stopPropagation(), r && r.current.opts.$orig.is(e) || (s ? (o = o.length ? o.filter('[data-fancybox="' + s + '"]') : n('[data-fancybox="' + s + '"]'), (a = o.index(e)) < 0 && (a = 0)) : o = [e], n.fancybox.open(o, i, a))
    }

    if (n) {
        if (n.fn.fancybox) return void n.error("fancyBox already initialized");
        var s = {
            loop: !1,
            margin: [44, 0],
            gutter: 50,
            keyboard: !0,
            arrows: !0,
            infobar: !1,
            toolbar: !0,
            buttons: ["slideShow", "fullScreen", "thumbs", "close"],
            idleTime: 4,
            smallBtn: "auto",
            protect: !1,
            modal: !1,
            image: {preload: "auto"},
            ajax: {settings: {data: {fancybox: !0}}},
            iframe: {
                tpl: '<iframe id="fancybox-frame{rnd}" name="fancybox-frame{rnd}" class="fancybox-iframe" frameborder="0" vspace="0" hspace="0" webkitAllowFullScreen mozallowfullscreen allowFullScreen allowtransparency="true" src=""></iframe>',
                preload: !0,
                css: {},
                attr: {scrolling: "auto"}
            },
            animationEffect: "zoom",
            animationDuration: 366,
            zoomOpacity: "auto",
            transitionEffect: "fade",
            transitionDuration: 366,
            slideClass: "",
            baseClass: "",
            baseTpl: '<div class="fancybox-container" role="dialog" tabindex="-1"><div class="fancybox-bg"></div><div class="fancybox-inner"><div class="fancybox-infobar"><button data-fancybox-prev title="{{PREV}}" class="fancybox-button fancybox-button--left"></button><div class="fancybox-infobar__body"><span data-fancybox-index></span>&nbsp;/&nbsp;<span data-fancybox-count></span></div><button data-fancybox-next title="{{NEXT}}" class="fancybox-button fancybox-button--right"></button></div><div class="fancybox-toolbar">{{BUTTONS}}</div><div class="fancybox-navigation"><button data-fancybox-prev title="{{PREV}}" class="fancybox-arrow fancybox-arrow--left" /><button data-fancybox-next title="{{NEXT}}" class="fancybox-arrow fancybox-arrow--right" /></div><div class="fancybox-stage"></div><div class="fancybox-caption-wrap"><div class="fancybox-caption"></div></div></div></div>',
            spinnerTpl: '<div class="fancybox-loading"></div>',
            errorTpl: '<div class="fancybox-error"><p>{{ERROR}}<p></div>',
            btnTpl: {
                slideShow: '<button data-fancybox-play class="fancybox-button fancybox-button--play" title="{{PLAY_START}}"></button>',
                fullScreen: '<button data-fancybox-fullscreen class="fancybox-button fancybox-button--fullscreen" title="{{FULL_SCREEN}}"></button>',
                thumbs: '<button data-fancybox-thumbs class="fancybox-button fancybox-button--thumbs" title="{{THUMBS}}"></button>',
                close: '<button data-fancybox-close class="fancybox-button fancybox-button--close" title="{{CLOSE}}"></button>',
                smallBtn: '<button data-fancybox-close class="fancybox-close-small" title="{{CLOSE}}"></button>'
            },
            parentEl: "body",
            autoFocus: !0,
            backFocus: !0,
            trapFocus: !0,
            fullScreen: {autoStart: !1},
            touch: {vertical: !0, momentum: !0},
            hash: null,
            media: {},
            slideShow: {autoStart: !1, speed: 4e3},
            thumbs: {autoStart: !1, hideOnClose: !0},
            onInit: n.noop,
            beforeLoad: n.noop,
            afterLoad: n.noop,
            beforeShow: n.noop,
            afterShow: n.noop,
            beforeClose: n.noop,
            afterClose: n.noop,
            onActivate: n.noop,
            onDeactivate: n.noop,
            clickContent: function (t) {
                return "image" === t.type && "zoom"
            },
            clickSlide: "close",
            clickOutside: "close",
            dblclickContent: !1,
            dblclickSlide: !1,
            dblclickOutside: !1,
            mobile: {
                clickContent: function (t) {
                    return "image" === t.type && "toggleControls"
                }, clickSlide: function (t) {
                    return "image" === t.type ? "toggleControls" : "close"
                }, dblclickContent: function (t) {
                    return "image" === t.type && "zoom"
                }, dblclickSlide: function (t) {
                    return "image" === t.type && "zoom"
                }
            },
            lang: "en",
            i18n: {
                en: {
                    CLOSE: "Close",
                    NEXT: "Next",
                    PREV: "Previous",
                    ERROR: "The requested content cannot be loaded. <br/> Please try again later.",
                    PLAY_START: "Start slideshow",
                    PLAY_STOP: "Pause slideshow",
                    FULL_SCREEN: "Full screen",
                    THUMBS: "Thumbnails"
                },
                de: {
                    CLOSE: "Schliessen",
                    NEXT: "Weiter",
                    PREV: "Zur\xfcck",
                    ERROR: "Die angeforderten Daten konnten nicht geladen werden. <br/> Bitte versuchen Sie es sp\xe4ter nochmal.",
                    PLAY_START: "Diaschau starten",
                    PLAY_STOP: "Diaschau beenden",
                    FULL_SCREEN: "Vollbild",
                    THUMBS: "Vorschaubilder"
                }
            }
        }, a = n(t), r = n(e), c = 0, l = function (t) {
            return t && t.hasOwnProperty && t instanceof n
        }, d = function () {
            return t.requestAnimationFrame || t.webkitRequestAnimationFrame || t.mozRequestAnimationFrame || t.oRequestAnimationFrame || function (e) {
                return t.setTimeout(e, 1e3 / 60)
            }
        }(), p = function () {
            var t, n = e.createElement("fakeelement"), o = {
                transition: "transitionend",
                OTransition: "oTransitionEnd",
                MozTransition: "transitionend",
                WebkitTransition: "webkitTransitionEnd"
            };
            for (t in o) if (n.style[t] !== i) return o[t]
        }(), u = function (t) {
            return t && t.length && t[0].offsetHeight
        }, f = function (t, i, o) {
            var a = this;
            a.opts = n.extend(!0, {index: o}, s, i || {}), i && n.isArray(i.buttons) && (a.opts.buttons = i.buttons), a.id = a.opts.id || ++c, a.group = [], a.currIndex = parseInt(a.opts.index, 10) || 0, a.prevIndex = null, a.prevPos = null, a.currPos = 0, a.firstRun = null, a.createGroup(t), a.group.length && (a.$lastFocus = n(e.activeElement).blur(), a.slides = {}, a.init(t))
        };
        n.extend(f.prototype, {
            init: function () {
                var t, e, i, o = this, s = o.group[o.currIndex].opts;
                o.scrollTop = r.scrollTop(), o.scrollLeft = r.scrollLeft(), n.fancybox.getInstance() || n.fancybox.isMobile || "hidden" === n("body").css("overflow") || (t = n("body").width(), n("html").addClass("fancybox-enabled"), (t = n("body").width() - t) > 1 && n("head").append('<style id="fancybox-style-noscroll" type="text/css">.compensate-for-scrollbar, .fancybox-enabled body { margin-right: ' + t + "px; }</style>")), i = "", n.each(s.buttons, function (t, e) {
                    i += s.btnTpl[e] || ""
                }), e = n(o.translate(o, s.baseTpl.replace("{{BUTTONS}}", i))).addClass("fancybox-is-hidden").attr("id", "fancybox-container-" + o.id).addClass(s.baseClass).data("FancyBox", o).prependTo(s.parentEl), o.$refs = {container: e}, ["bg", "inner", "infobar", "toolbar", "stage", "caption"].forEach(function (t) {
                    o.$refs[t] = e.find(".fancybox-" + t)
                }), (!s.arrows || o.group.length < 2) && e.find(".fancybox-navigation").remove(), s.infobar || o.$refs.infobar.remove(), s.toolbar || o.$refs.toolbar.remove(), o.trigger("onInit"), o.activate(), o.jumpTo(o.currIndex)
            }, translate: function (t, e) {
                var n = t.opts.i18n[t.opts.lang];
                return e.replace(/\{\{(\w+)\}\}/g, function (t, e) {
                    var o = n[e];
                    return o === i ? t : o
                })
            }, createGroup: function (t) {
                var e = this, o = n.makeArray(t);
                n.each(o, function (t, o) {
                    var s, a, r, c, l = {}, d = {}, p = [];
                    n.isPlainObject(o) ? (l = o, d = o.opts || o) : "object" === n.type(o) && n(o).length ? (s = n(o), p = s.data(), d = "options" in p ? p.options : {}, d = "object" === n.type(d) ? d : {}, l.src = "src" in p ? p.src : d.src || s.attr("href"), ["width", "height", "thumb", "type", "filter"].forEach(function (t) {
                        t in p && (d[t] = p[t])
                    }), "srcset" in p && (d.image = {srcset: p.srcset}), d.$orig = s, l.type || l.src || (l.type = "inline", l.src = o)) : l = {
                        type: "html",
                        src: o + ""
                    }, l.opts = n.extend(!0, {}, e.opts, d), n.fancybox.isMobile && (l.opts = n.extend(!0, {}, l.opts, l.opts.mobile)), a = l.type || l.opts.type, r = l.src || "", !a && r && (r.match(/(^data:image\/[a-z0-9+\/=]*,)|(\.(jp(e|g|eg)|gif|png|bmp|webp|svg|ico)((\?|#).*)?$)/i) ? a = "image" : r.match(/\.(pdf)((\?|#).*)?$/i) ? a = "pdf" : "#" === r.charAt(0) && (a = "inline")), l.type = a, l.index = e.group.length, l.opts.$orig && !l.opts.$orig.length && delete l.opts.$orig, !l.opts.$thumb && l.opts.$orig && (l.opts.$thumb = l.opts.$orig.find("img:first")), l.opts.$thumb && !l.opts.$thumb.length && delete l.opts.$thumb, "function" === n.type(l.opts.caption) ? l.opts.caption = l.opts.caption.apply(o, [e, l]) : "caption" in p && (l.opts.caption = p.caption), l.opts.caption = l.opts.caption === i ? "" : l.opts.caption + "", "ajax" === a && (c = r.split(/\s+/, 2), c.length > 1 && (l.src = c.shift(), l.opts.filter = c.shift())), "auto" == l.opts.smallBtn && (n.inArray(a, ["html", "inline", "ajax"]) > -1 ? (l.opts.toolbar = !1, l.opts.smallBtn = !0) : l.opts.smallBtn = !1), "pdf" === a && (l.type = "iframe", l.opts.iframe.preload = !1), l.opts.modal && (l.opts = n.extend(!0, l.opts, {
                        infobar: 0,
                        toolbar: 0,
                        smallBtn: 0,
                        keyboard: 0,
                        slideShow: 0,
                        fullScreen: 0,
                        thumbs: 0,
                        touch: 0,
                        clickContent: !1,
                        clickSlide: !1,
                        clickOutside: !1,
                        dblclickContent: !1,
                        dblclickSlide: !1,
                        dblclickOutside: !1
                    })), e.group.push(l)
                })
            }, addEvents: function () {
                var i = this;
                i.removeEvents(), i.$refs.container.on("click.fb-close", "[data-fancybox-close]", function (t) {
                    t.stopPropagation(), t.preventDefault(), i.close(t)
                }).on("click.fb-prev touchend.fb-prev", "[data-fancybox-prev]", function (t) {
                    t.stopPropagation(), t.preventDefault(), i.previous()
                }).on("click.fb-next touchend.fb-next", "[data-fancybox-next]", function (t) {
                    t.stopPropagation(), t.preventDefault(), i.next()
                }), a.on("orientationchange.fb resize.fb", function (t) {
                    t && t.originalEvent && "resize" === t.originalEvent.type ? d(function () {
                        i.update()
                    }) : (i.$refs.stage.hide(), setTimeout(function () {
                        i.$refs.stage.show(), i.update()
                    }, 500))
                }), r.on("focusin.fb", function (t) {
                    var o = n.fancybox ? n.fancybox.getInstance() : null;
                    o.isClosing || !o.current || !o.current.opts.trapFocus || n(t.target).hasClass("fancybox-container") || n(t.target).is(e) || o && "fixed" !== n(t.target).css("position") && !o.$refs.container.has(t.target).length && (t.stopPropagation(), o.focus(), a.scrollTop(i.scrollTop).scrollLeft(i.scrollLeft))
                }), r.on("keydown.fb", function (t) {
                    var e = i.current, o = t.keyCode || t.which;
                    if (e && e.opts.keyboard && !n(t.target).is("input") && !n(t.target).is("textarea")) return 8 === o || 27 === o ? (t.preventDefault(), void i.close(t)) : 37 === o || 38 === o ? (t.preventDefault(), void i.previous()) : 39 === o || 40 === o ? (t.preventDefault(), void i.next()) : void i.trigger("afterKeydown", t, o)
                }), i.group[i.currIndex].opts.idleTime && (i.idleSecondsCounter = 0, r.on("mousemove.fb-idle mouseenter.fb-idle mouseleave.fb-idle mousedown.fb-idle touchstart.fb-idle touchmove.fb-idle scroll.fb-idle keydown.fb-idle", function () {
                    i.idleSecondsCounter = 0, i.isIdle && i.showControls(), i.isIdle = !1
                }), i.idleInterval = t.setInterval(function () {
                    ++i.idleSecondsCounter >= i.group[i.currIndex].opts.idleTime && (i.isIdle = !0, i.idleSecondsCounter = 0, i.hideControls())
                }, 1e3))
            }, removeEvents: function () {
                var e = this;
                a.off("orientationchange.fb resize.fb"), r.off("focusin.fb keydown.fb .fb-idle"), this.$refs.container.off(".fb-close .fb-prev .fb-next"), e.idleInterval && (t.clearInterval(e.idleInterval), e.idleInterval = null)
            }, previous: function (t) {
                return this.jumpTo(this.currPos - 1, t)
            }, next: function (t) {
                return this.jumpTo(this.currPos + 1, t)
            }, jumpTo: function (t, e) {
                var o, s, a, r, c, l, d, p = this, f = p.group.length;
                if (!(p.isSliding || p.isClosing || p.isAnimating && p.firstRun)) {
                    if (t = parseInt(t, 10), !(s = p.current ? p.current.opts.loop : p.opts.loop) && (t < 0 || t >= f)) return !1;
                    if (o = p.firstRun = null === p.firstRun, !(f < 2 && !o && p.isSliding)) {
                        if (r = p.current, p.prevIndex = p.currIndex, p.prevPos = p.currPos, a = p.createSlide(t), f > 1 && ((s || a.index > 0) && p.createSlide(t - 1), (s || a.index < f - 1) && p.createSlide(t + 1)), p.current = a, p.currIndex = a.index, p.currPos = a.pos, p.trigger("beforeShow", o), p.updateControls(), l = n.fancybox.getTranslate(a.$slide), a.isMoved = (0 !== l.left || 0 !== l.top) && !a.$slide.hasClass("fancybox-animated"), a.forcedDuration = i, n.isNumeric(e) ? a.forcedDuration = e : e = a.opts[o ? "animationDuration" : "transitionDuration"], e = parseInt(e, 10), o) return a.opts.animationEffect && e && p.$refs.container.css("transition-duration", e + "ms"), p.$refs.container.removeClass("fancybox-is-hidden"), u(p.$refs.container), p.$refs.container.addClass("fancybox-is-open"), a.$slide.addClass("fancybox-slide--current"), p.loadSlide(a), void p.preload();
                        n.each(p.slides, function (t, e) {
                            n.fancybox.stop(e.$slide)
                        }), a.$slide.removeClass("fancybox-slide--next fancybox-slide--previous").addClass("fancybox-slide--current"), a.isMoved ? (c = Math.round(a.$slide.width()), n.each(p.slides, function (t, i) {
                            var o = i.pos - a.pos;
                            n.fancybox.animate(i.$slide, {top: 0, left: o * c + o * i.opts.gutter}, e, function () {
                                i.$slide.removeAttr("style").removeClass("fancybox-slide--next fancybox-slide--previous"), i.pos === p.currPos && (a.isMoved = !1, p.complete())
                            })
                        })) : p.$refs.stage.children().removeAttr("style"), a.isLoaded ? p.revealContent(a) : p.loadSlide(a), p.preload(), r.pos !== a.pos && (d = "fancybox-slide--" + (r.pos > a.pos ? "next" : "previous"), r.$slide.removeClass("fancybox-slide--complete fancybox-slide--current fancybox-slide--next fancybox-slide--previous"), r.isComplete = !1, e && (a.isMoved || a.opts.transitionEffect) && (a.isMoved ? r.$slide.addClass(d) : (d = "fancybox-animated " + d + " fancybox-fx-" + a.opts.transitionEffect, n.fancybox.animate(r.$slide, d, e, function () {
                            r.$slide.removeClass(d).removeAttr("style")
                        }))))
                    }
                }
            }, createSlide: function (t) {
                var e, i, o = this;
                return i = t % o.group.length, i = i < 0 ? o.group.length + i : i, !o.slides[t] && o.group[i] && (e = n('<div class="fancybox-slide"></div>').appendTo(o.$refs.stage), o.slides[t] = n.extend(!0, {}, o.group[i], {
                    pos: t,
                    $slide: e,
                    isLoaded: !1
                }), o.updateSlide(o.slides[t])), o.slides[t]
            }, scaleToActual: function (t, e, o) {
                var s, a, r, c, l, d = this, p = d.current, u = p.$content, f = parseInt(p.$slide.width(), 10),
                    h = parseInt(p.$slide.height(), 10), M = p.width, b = p.height;
                "image" != p.type || p.hasError || !u || d.isAnimating || (n.fancybox.stop(u), d.isAnimating = !0, t = t === i ? .5 * f : t, e = e === i ? .5 * h : e, s = n.fancybox.getTranslate(u), c = M / s.width, l = b / s.height, a = .5 * f - .5 * M, r = .5 * h - .5 * b, M > f && (a = s.left * c - (t * c - t), a > 0 && (a = 0), a < f - M && (a = f - M)), b > h && (r = s.top * l - (e * l - e), r > 0 && (r = 0), r < h - b && (r = h - b)), d.updateCursor(M, b), n.fancybox.animate(u, {
                    top: r,
                    left: a,
                    scaleX: c,
                    scaleY: l
                }, o || 330, function () {
                    d.isAnimating = !1
                }), d.SlideShow && d.SlideShow.isActive && d.SlideShow.stop())
            }, scaleToFit: function (t) {
                var e, i = this, o = i.current, s = o.$content;
                "image" != o.type || o.hasError || !s || i.isAnimating || (n.fancybox.stop(s), i.isAnimating = !0, e = i.getFitPos(o), i.updateCursor(e.width, e.height), n.fancybox.animate(s, {
                    top: e.top,
                    left: e.left,
                    scaleX: e.width / s.width(),
                    scaleY: e.height / s.height()
                }, t || 330, function () {
                    i.isAnimating = !1
                }))
            }, getFitPos: function (t) {
                var e, i, o, s, r, c = this, l = t.$content, d = t.width, p = t.height, u = t.opts.margin;
                return !(!l || !l.length || !d && !p) && ("number" === n.type(u) && (u = [u, u]), 2 == u.length && (u = [u[0], u[1], u[0], u[1]]), a.width() < 800 && (u = [0, 0, 0, 0]), e = parseInt(c.$refs.stage.width(), 10) - (u[1] + u[3]), i = parseInt(c.$refs.stage.height(), 10) - (u[0] + u[2]), o = Math.min(1, e / d, i / p), s = Math.floor(o * d), r = Math.floor(o * p), {
                    top: Math.floor(.5 * (i - r)) + u[0],
                    left: Math.floor(.5 * (e - s)) + u[3],
                    width: s,
                    height: r
                })
            }, update: function () {
                var t = this;
                n.each(t.slides, function (e, n) {
                    t.updateSlide(n)
                })
            }, updateSlide: function (t) {
                var e = this, i = t.$content;
                i && (t.width || t.height) && (n.fancybox.stop(i), n.fancybox.setTranslate(i, e.getFitPos(t)), t.pos === e.currPos && e.updateCursor()), t.$slide.trigger("refresh"), e.trigger("onUpdate", t)
            }, updateCursor: function (t, e) {
                var n, o = this,
                    s = o.$refs.container.removeClass("fancybox-is-zoomable fancybox-can-zoomIn fancybox-can-drag fancybox-can-zoomOut");
                o.current && !o.isClosing && (o.isZoomable() ? (s.addClass("fancybox-is-zoomable"), n = t !== i && e !== i ? t < o.current.width && e < o.current.height : o.isScaledDown(), n ? s.addClass("fancybox-can-zoomIn") : o.current.opts.touch ? s.addClass("fancybox-can-drag") : s.addClass("fancybox-can-zoomOut")) : o.current.opts.touch && s.addClass("fancybox-can-drag"))
            }, isZoomable: function () {
                var t, e = this, i = e.current;
                if (i && !e.isClosing) return !!("image" === i.type && i.isLoaded && !i.hasError && ("zoom" === i.opts.clickContent || n.isFunction(i.opts.clickContent) && "zoom" === i.opts.clickContent(i)) && (t = e.getFitPos(i), i.width > t.width || i.height > t.height))
            }, isScaledDown: function () {
                var t = this, e = t.current, i = e.$content, o = !1;
                return i && (o = n.fancybox.getTranslate(i), o = o.width < e.width || o.height < e.height), o
            }, canPan: function () {
                var t = this, e = t.current, n = e.$content, i = !1;
                return n && (i = t.getFitPos(e), i = Math.abs(n.width() - i.width) > 1 || Math.abs(n.height() - i.height) > 1), i
            }, loadSlide: function (t) {
                var e, i, o, s = this;
                if (!t.isLoading && !t.isLoaded) {
                    switch (t.isLoading = !0, s.trigger("beforeLoad", t), e = t.type, i = t.$slide, i.off("refresh").trigger("onReset").addClass("fancybox-slide--" + (e || "unknown")).addClass(t.opts.slideClass), e) {
                        case"image":
                            s.setImage(t);
                            break;
                        case"iframe":
                            s.setIframe(t);
                            break;
                        case"html":
                            s.setContent(t, t.src || t.content);
                            break;
                        case"inline":
                            n(t.src).length ? s.setContent(t, n(t.src)) : s.setError(t);
                            break;
                        case"ajax":
                            s.showLoading(t), o = n.ajax(n.extend({}, t.opts.ajax.settings, {
                                url: t.src,
                                success: function (e, n) {
                                    "success" === n && s.setContent(t, e)
                                },
                                error: function (e, n) {
                                    e && "abort" !== n && s.setError(t)
                                }
                            })), i.one("onReset", function () {
                                o.abort()
                            });
                            break;
                        default:
                            s.setError(t)
                    }
                    return !0
                }
            }, setImage: function (e) {
                var i, o, s, a, r = this, c = e.opts.image.srcset;
                if (c) {
                    s = t.devicePixelRatio || 1, a = t.innerWidth * s, o = c.split(",").map(function (t) {
                        var e = {};
                        return t.trim().split(/\s+/).forEach(function (t, n) {
                            var i = parseInt(t.substring(0, t.length - 1), 10);
                            if (0 === n) return e.url = t;
                            i && (e.value = i, e.postfix = t[t.length - 1])
                        }), e
                    }), o.sort(function (t, e) {
                        return t.value - e.value
                    });
                    for (var l = 0; l < o.length; l++) {
                        var d = o[l];
                        if ("w" === d.postfix && d.value >= a || "x" === d.postfix && d.value >= s) {
                            i = d;
                            break
                        }
                    }
                    !i && o.length && (i = o[o.length - 1]), i && (e.src = i.url, e.width && e.height && "w" == i.postfix && (e.height = e.width / e.height * i.value, e.width = i.value))
                }
                e.$content = n('<div class="fancybox-image-wrap"></div>').addClass("fancybox-is-hidden").appendTo(e.$slide), !1 !== e.opts.preload && e.opts.width && e.opts.height && (e.opts.thumb || e.opts.$thumb) ? (e.width = e.opts.width, e.height = e.opts.height, e.$ghost = n("<img />").one("error", function () {
                    n(this).remove(), e.$ghost = null, r.setBigImage(e)
                }).one("load", function () {
                    r.afterLoad(e), r.setBigImage(e)
                }).addClass("fancybox-image").appendTo(e.$content).attr("src", e.opts.thumb || e.opts.$thumb.attr("src"))) : r.setBigImage(e)
            }, setBigImage: function (t) {
                var e = this, i = n("<img />");
                t.$image = i.one("error", function () {
                    e.setError(t)
                }).one("load", function () {
                    clearTimeout(t.timouts), t.timouts = null, e.isClosing || (t.width = this.naturalWidth, t.height = this.naturalHeight, t.opts.image.srcset && i.attr("sizes", "100vw").attr("srcset", t.opts.image.srcset), e.hideLoading(t), t.$ghost ? t.timouts = setTimeout(function () {
                        t.timouts = null, t.$ghost.hide()
                    }, Math.min(300, Math.max(1e3, t.height / 1600))) : e.afterLoad(t))
                }).addClass("fancybox-image").attr("src", t.src).appendTo(t.$content), i[0].complete ? i.trigger("load") : i[0].error ? i.trigger("error") : t.timouts = setTimeout(function () {
                    i[0].complete || t.hasError || e.showLoading(t)
                }, 100)
            }, setIframe: function (t) {
                var e, o = this, s = t.opts.iframe, a = t.$slide;
                t.$content = n('<div class="fancybox-content' + (s.preload ? " fancybox-is-hidden" : "") + '"></div>').css(s.css).appendTo(a), e = n(s.tpl.replace(/\{rnd\}/g, (new Date).getTime())).attr(s.attr).appendTo(t.$content), s.preload ? (o.showLoading(t), e.on("load.fb error.fb", function () {
                    this.isReady = 1, t.$slide.trigger("refresh"), o.afterLoad(t)
                }), a.on("refresh.fb", function () {
                    var n, o, a, r, c, l = t.$content;
                    if (1 === e[0].isReady) {
                        try {
                            n = e.contents(), o = n.find("body")
                        } catch (t) {
                        }
                        o && o.length && (s.css.width === i || s.css.height === i) && (a = e[0].contentWindow.document.documentElement.scrollWidth, r = Math.ceil(o.outerWidth(!0) + (l.width() - a)), c = Math.ceil(o.outerHeight(!0)), l.css({
                            width: s.css.width === i ? r + (l.outerWidth() - l.innerWidth()) : s.css.width,
                            height: s.css.height === i ? c + (l.outerHeight() - l.innerHeight()) : s.css.height
                        })), l.removeClass("fancybox-is-hidden")
                    }
                })) : this.afterLoad(t), e.attr("src", t.src), !0 === t.opts.smallBtn && t.$content.prepend(o.translate(t, t.opts.btnTpl.smallBtn)), a.one("onReset", function () {
                    try {
                        n(this).find("iframe").hide().attr("src", "//about:blank")
                    } catch (t) {
                    }
                    n(this).empty(), t.isLoaded = !1
                })
            }, setContent: function (t, e) {
                var i = this;
                i.isClosing || (i.hideLoading(t), t.$slide.empty(), l(e) && e.parent().length ? (e.parent(".fancybox-slide--inline").trigger("onReset"), t.$placeholder = n("<div></div>").hide().insertAfter(e), e.css("display", "inline-block")) : t.hasError || ("string" === n.type(e) && (e = n("<div>").append(n.trim(e)).contents(), 3 === e[0].nodeType && (e = n("<div>").html(e))), t.opts.filter && (e = n("<div>").html(e).find(t.opts.filter))), t.$slide.one("onReset", function () {
                    t.$placeholder && (t.$placeholder.after(e.hide()).remove(), t.$placeholder = null), t.$smallBtn && (t.$smallBtn.remove(), t.$smallBtn = null), t.hasError || (n(this).empty(), t.isLoaded = !1)
                }), t.$content = n(e).appendTo(t.$slide), t.opts.smallBtn && !t.$smallBtn && (t.$smallBtn = n(i.translate(t, t.opts.btnTpl.smallBtn)).appendTo(t.$content)), this.afterLoad(t))
            }, setError: function (t) {
                t.hasError = !0, t.$slide.removeClass("fancybox-slide--" + t.type), this.setContent(t, this.translate(t, t.opts.errorTpl))
            }, showLoading: function (t) {
                var e = this;
                (t = t || e.current) && !t.$spinner && (t.$spinner = n(e.opts.spinnerTpl).appendTo(t.$slide))
            }, hideLoading: function (t) {
                var e = this;
                (t = t || e.current) && t.$spinner && (t.$spinner.remove(), delete t.$spinner)
            }, afterLoad: function (t) {
                var e = this;
                e.isClosing || (t.isLoading = !1, t.isLoaded = !0, e.trigger("afterLoad", t), e.hideLoading(t), t.opts.protect && t.$content && !t.hasError && (t.$content.on("contextmenu.fb", function (t) {
                    return 2 == t.button && t.preventDefault(), !0
                }), "image" === t.type && n('<div class="fancybox-spaceball"></div>').appendTo(t.$content)), e.revealContent(t))
            }, revealContent: function (t) {
                var e, o, s, a, r, c = this, l = t.$slide, d = !1;
                return e = t.opts[c.firstRun ? "animationEffect" : "transitionEffect"], s = t.opts[c.firstRun ? "animationDuration" : "transitionDuration"], s = parseInt(t.forcedDuration === i ? s : t.forcedDuration, 10), !t.isMoved && t.pos === c.currPos && s || (e = !1), "zoom" !== e || t.pos === c.currPos && s && "image" === t.type && !t.hasError && (d = c.getThumbPos(t)) || (e = "fade"), "zoom" === e ? (r = c.getFitPos(t), r.scaleX = r.width / d.width, r.scaleY = r.height / d.height, delete r.width, delete r.height, a = t.opts.zoomOpacity, "auto" == a && (a = Math.abs(t.width / t.height - d.width / d.height) > .1), a && (d.opacity = .1, r.opacity = 1), n.fancybox.setTranslate(t.$content.removeClass("fancybox-is-hidden"), d), u(t.$content), void n.fancybox.animate(t.$content, r, s, function () {
                    c.complete()
                })) : (c.updateSlide(t), e ? (n.fancybox.stop(l), o = "fancybox-animated fancybox-slide--" + (t.pos > c.prevPos ? "next" : "previous") + " fancybox-fx-" + e, l.removeAttr("style").removeClass("fancybox-slide--current fancybox-slide--next fancybox-slide--previous").addClass(o), t.$content.removeClass("fancybox-is-hidden"), u(l), void n.fancybox.animate(l, "fancybox-slide--current", s, function () {
                    l.removeClass(o).removeAttr("style"), t.pos === c.currPos && c.complete()
                }, !0)) : (u(l), t.$content.removeClass("fancybox-is-hidden"), void(t.pos === c.currPos && c.complete())))
            }, getThumbPos: function (i) {
                var o, s = this, a = !1, r = function (e) {
                    for (var i = e[0], o = i.getBoundingClientRect(), s = []; null !== i.parentElement;) "hidden" !== n(i.parentElement).css("overflow") && "auto" !== n(i.parentElement).css("overflow") || s.push(i.parentElement.getBoundingClientRect()), i = i.parentElement;
                    return s.every(function (t) {
                        var e = Math.min(o.right, t.right) - Math.max(o.left, t.left),
                            n = Math.min(o.bottom, t.bottom) - Math.max(o.top, t.top);
                        return e > 0 && n > 0
                    }) && o.bottom > 0 && o.right > 0 && o.left < n(t).width() && o.top < n(t).height()
                }, c = i.opts.$thumb, l = c ? c.offset() : 0;
                return l && c[0].ownerDocument === e && r(c) && (o = s.$refs.stage.offset(), a = {
                    top: l.top - o.top + parseFloat(c.css("border-top-width") || 0),
                    left: l.left - o.left + parseFloat(c.css("border-left-width") || 0),
                    width: c.width(),
                    height: c.height(),
                    scaleX: 1,
                    scaleY: 1
                }), a
            }, complete: function () {
                var t = this, i = t.current, o = {};
                i.isMoved || !i.isLoaded || i.isComplete || (i.isComplete = !0, i.$slide.siblings().trigger("onReset"), u(i.$slide), i.$slide.addClass("fancybox-slide--complete"), n.each(t.slides, function (e, i) {
                    i.pos >= t.currPos - 1 && i.pos <= t.currPos + 1 ? o[i.pos] = i : i && (n.fancybox.stop(i.$slide), i.$slide.unbind().remove())
                }), t.slides = o, t.updateCursor(), t.trigger("afterShow"), (n(e.activeElement).is("[disabled]") || i.opts.autoFocus && "image" != i.type && "iframe" !== i.type) && t.focus())
            }, preload: function () {
                var t, e, n = this;
                n.group.length < 2 || (t = n.slides[n.currPos + 1], e = n.slides[n.currPos - 1], t && "image" === t.type && n.loadSlide(t), e && "image" === e.type && n.loadSlide(e))
            }, focus: function () {
                var t, e = this.current;
                this.isClosing || (t = e && e.isComplete ? e.$slide.find("button,:input,[tabindex],a").filter(":not([disabled]):visible:first") : null, t = t && t.length ? t : this.$refs.container, t.focus())
            }, activate: function () {
                var t = this;
                n(".fancybox-container").each(function () {
                    var e = n(this).data("FancyBox");
                    e && e.uid !== t.uid && !e.isClosing && e.trigger("onDeactivate")
                }), t.current && (t.$refs.container.index() > 0 && t.$refs.container.prependTo(e.body), t.updateControls()), t.trigger("onActivate"),
                    t.addEvents()
            }, close: function (t, e) {
                var i, o, s, a, r, c, l = this, u = l.current, f = function () {
                    l.cleanUp(t)
                };
                return !l.isClosing && (l.isClosing = !0, !1 === l.trigger("beforeClose", t) ? (l.isClosing = !1, d(function () {
                    l.update()
                }), !1) : (l.removeEvents(), u.timouts && clearTimeout(u.timouts), s = u.$content, i = u.opts.animationEffect, o = n.isNumeric(e) ? e : i ? u.opts.animationDuration : 0, u.$slide.off(p).removeClass("fancybox-slide--complete fancybox-slide--next fancybox-slide--previous fancybox-animated"), u.$slide.siblings().trigger("onReset").remove(), o && l.$refs.container.removeClass("fancybox-is-open").addClass("fancybox-is-closing"), l.hideLoading(u), l.hideControls(), l.updateCursor(), "zoom" !== i || !0 !== t && s && o && "image" === u.type && !u.hasError && (c = l.getThumbPos(u)) || (i = "fade"), "zoom" === i ? (n.fancybox.stop(s), r = n.fancybox.getTranslate(s), r.width = r.width * r.scaleX, r.height = r.height * r.scaleY, a = u.opts.zoomOpacity, "auto" == a && (a = Math.abs(u.width / u.height - c.width / c.height) > .1), a && (c.opacity = 0), r.scaleX = r.width / c.width, r.scaleY = r.height / c.height, r.width = c.width, r.height = c.height, n.fancybox.setTranslate(u.$content, r), n.fancybox.animate(u.$content, c, o, f), !0) : (i && o ? !0 === t ? setTimeout(f, o) : n.fancybox.animate(u.$slide.removeClass("fancybox-slide--current"), "fancybox-animated fancybox-slide--previous fancybox-fx-" + i, o, f) : f(), !0)))
            }, cleanUp: function (t) {
                var e, i = this;
                i.current.$slide.trigger("onReset"), i.$refs.container.empty().remove(), i.trigger("afterClose", t), i.$lastFocus && i.current.opts.backFocus && i.$lastFocus.focus(), i.current = null, e = n.fancybox.getInstance(), e ? e.activate() : (a.scrollTop(i.scrollTop).scrollLeft(i.scrollLeft), n("html").removeClass("fancybox-enabled"), n("#fancybox-style-noscroll").remove())
            }, trigger: function (t, e) {
                var i, o = Array.prototype.slice.call(arguments, 1), s = this, a = e && e.opts ? e : s.current;
                if (a ? o.unshift(a) : a = s, o.unshift(s), n.isFunction(a.opts[t]) && (i = a.opts[t].apply(a, o)), !1 === i) return i;
                "afterClose" === t ? r.trigger(t + ".fb", o) : s.$refs.container.trigger(t + ".fb", o)
            }, updateControls: function () {
                var t = this, e = t.current, i = e.index, o = e.opts, s = o.caption, a = t.$refs.caption;
                e.$slide.trigger("refresh"), t.$caption = s && s.length ? a.html(s) : null, t.isHiddenControls || t.showControls(), n("[data-fancybox-count]").html(t.group.length), n("[data-fancybox-index]").html(i + 1), n("[data-fancybox-prev]").prop("disabled", !o.loop && i <= 0), n("[data-fancybox-next]").prop("disabled", !o.loop && i >= t.group.length - 1)
            }, hideControls: function () {
                this.isHiddenControls = !0, this.$refs.container.removeClass("fancybox-show-infobar fancybox-show-toolbar fancybox-show-caption fancybox-show-nav")
            }, showControls: function () {
                var t = this, e = t.current ? t.current.opts : t.opts, n = t.$refs.container;
                t.isHiddenControls = !1, t.idleSecondsCounter = 0, n.toggleClass("fancybox-show-toolbar", !(!e.toolbar || !e.buttons)).toggleClass("fancybox-show-infobar", !!(e.infobar && t.group.length > 1)).toggleClass("fancybox-show-nav", !!(e.arrows && t.group.length > 1)).toggleClass("fancybox-is-modal", !!e.modal), t.$caption ? n.addClass("fancybox-show-caption ") : n.removeClass("fancybox-show-caption")
            }, toggleControls: function () {
                this.isHiddenControls ? this.showControls() : this.hideControls()
            }
        }), n.fancybox = {
            version: "3.1.24",
            defaults: s,
            getInstance: function (t) {
                var e = n('.fancybox-container:not(".fancybox-is-closing"):first').data("FancyBox"),
                    i = Array.prototype.slice.call(arguments, 1);
                return e instanceof f && ("string" === n.type(t) ? e[t].apply(e, i) : "function" === n.type(t) && t.apply(e, i), e)
            },
            open: function (t, e, n) {
                return new f(t, e, n)
            },
            close: function (t) {
                var e = this.getInstance();
                e && (e.close(), !0 === t && this.close())
            },
            destroy: function () {
                this.close(!0), r.off("click.fb-start")
            },
            isMobile: e.createTouch !== i && /Android|webOS|iPhone|iPad|iPod|BlackBerry/i.test(navigator.userAgent),
            use3d: function () {
                var n = e.createElement("div");
                return t.getComputedStyle && t.getComputedStyle(n).getPropertyValue("transform") && !(e.documentMode && e.documentMode < 11)
            }(),
            getTranslate: function (t) {
                var e;
                if (!t || !t.length) return !1;
                if (e = t.eq(0).css("transform"), e && -1 !== e.indexOf("matrix") ? (e = e.split("(")[1], e = e.split(")")[0], e = e.split(",")) : e = [], e.length) e = e.length > 10 ? [e[13], e[12], e[0], e[5]] : [e[5], e[4], e[0], e[3]], e = e.map(parseFloat); else {
                    e = [0, 0, 1, 1];
                    var n = /\.*translate\((.*)px,(.*)px\)/i, i = n.exec(t.eq(0).attr("style"));
                    i && (e[0] = parseFloat(i[2]), e[1] = parseFloat(i[1]))
                }
                return {
                    top: e[0],
                    left: e[1],
                    scaleX: e[2],
                    scaleY: e[3],
                    opacity: parseFloat(t.css("opacity")),
                    width: t.width(),
                    height: t.height()
                }
            },
            setTranslate: function (t, e) {
                var n = "", o = {};
                if (t && e) return e.left === i && e.top === i || (n = (e.left === i ? t.position().left : e.left) + "px, " + (e.top === i ? t.position().top : e.top) + "px", n = this.use3d ? "translate3d(" + n + ", 0px)" : "translate(" + n + ")"), e.scaleX !== i && e.scaleY !== i && (n = (n.length ? n + " " : "") + "scale(" + e.scaleX + ", " + e.scaleY + ")"), n.length && (o.transform = n), e.opacity !== i && (o.opacity = e.opacity), e.width !== i && (o.width = e.width), e.height !== i && (o.height = e.height), t.css(o)
            },
            animate: function (t, e, o, s, a) {
                var r = p || "transitionend";
                n.isFunction(o) && (s = o, o = null), n.isPlainObject(e) || t.removeAttr("style"), t.on(r, function (o) {
                    (!o || !o.originalEvent || t.is(o.originalEvent.target) && "z-index" != o.originalEvent.propertyName) && (t.off(r), n.isPlainObject(e) ? e.scaleX !== i && e.scaleY !== i && (t.css("transition-duration", "0ms"), e.width = Math.round(t.width() * e.scaleX), e.height = Math.round(t.height() * e.scaleY), e.scaleX = 1, e.scaleY = 1, n.fancybox.setTranslate(t, e)) : !0 !== a && t.removeClass(e), n.isFunction(s) && s(o))
                }), n.isNumeric(o) && t.css("transition-duration", o + "ms"), n.isPlainObject(e) ? n.fancybox.setTranslate(t, e) : t.addClass(e), t.data("timer", setTimeout(function () {
                    t.trigger("transitionend")
                }, o + 16))
            },
            stop: function (t) {
                clearTimeout(t.data("timer")), t.off(p)
            }
        }, n.fn.fancybox = function (t) {
            var e;
            return t = t || {}, e = t.selector || !1, e ? n("body").off("click.fb-start", e).on("click.fb-start", e, {options: t}, o) : this.off("click.fb-start").on("click.fb-start", {
                items: this,
                options: t
            }, o), this
        }, r.on("click.fb-start", "[data-fancybox]", o)
    }
}(window, document, window.jQuery), function (t) {
    "use strict";
    var e = function (e, n, i) {
        if (e) return i = i || "", "object" === t.type(i) && (i = t.param(i, !0)), t.each(n, function (t, n) {
            e = e.replace("$" + t, n || "")
        }), i.length && (e += (e.indexOf("?") > 0 ? "&" : "?") + i), e
    }, n = {
        youtube: {
            matcher: /(youtube\.com|youtu\.be|youtube\-nocookie\.com)\/(watch\?(.*&)?v=|v\/|u\/|embed\/?)?(videoseries\?list=(.*)|[\w-]{11}|\?listType=(.*)&list=(.*))(.*)/i,
            params: {autoplay: 1, autohide: 1, fs: 1, rel: 0, hd: 1, wmode: "transparent", enablejsapi: 1, html5: 1},
            paramPlace: 8,
            type: "iframe",
            url: "//www.youtube.com/embed/$4",
            thumb: "//img.youtube.com/vi/$4/hqdefault.jpg"
        },
        vimeo: {
            matcher: /^.+vimeo.com\/(.*\/)?([\d]+)(.*)?/,
            params: {autoplay: 1, hd: 1, show_title: 1, show_byline: 1, show_portrait: 0, fullscreen: 1, api: 1},
            paramPlace: 3,
            type: "iframe",
            url: "//player.vimeo.com/video/$2"
        },
        metacafe: {
            matcher: /metacafe.com\/watch\/(\d+)\/(.*)?/,
            type: "iframe",
            url: "//www.metacafe.com/embed/$1/?ap=1"
        },
        dailymotion: {
            matcher: /dailymotion.com\/video\/(.*)\/?(.*)/,
            params: {additionalInfos: 0, autoStart: 1},
            type: "iframe",
            url: "//www.dailymotion.com/embed/video/$1"
        },
        vine: {matcher: /vine.co\/v\/([a-zA-Z0-9\?\=\-]+)/, type: "iframe", url: "//vine.co/v/$1/embed/simple"},
        instagram: {
            matcher: /(instagr\.am|instagram\.com)\/p\/([a-zA-Z0-9_\-]+)\/?/i,
            type: "image",
            url: "//$1/p/$2/media/?size=l"
        },
        gmap_place: {
            matcher: /(maps\.)?google\.([a-z]{2,3}(\.[a-z]{2})?)\/(((maps\/(place\/(.*)\/)?\@(.*),(\d+.?\d+?)z))|(\?ll=))(.*)?/i,
            type: "iframe",
            url: function (t) {
                return "//maps.google." + t[2] + "/?ll=" + (t[9] ? t[9] + "&z=" + Math.floor(t[10]) + (t[12] ? t[12].replace(/^\//, "&") : "") : t[12]) + "&output=" + (t[12] && t[12].indexOf("layer=c") > 0 ? "svembed" : "embed")
            }
        },
        gmap_search: {
            matcher: /(maps\.)?google\.([a-z]{2,3}(\.[a-z]{2})?)\/(maps\/search\/)(.*)/i,
            type: "iframe",
            url: function (t) {
                return "//maps.google." + t[2] + "/maps?q=" + t[5].replace("query=", "q=").replace("api=1", "") + "&output=embed"
            }
        }
    };
    t(document).on("onInit.fb", function (i, o) {
        t.each(o.group, function (i, o) {
            var s, a, r, c, l, d, p, u = o.src || "", f = !1;
            o.type || (s = t.extend(!0, {}, n, o.opts.media), t.each(s, function (n, i) {
                if (r = u.match(i.matcher), d = {}, p = n, r) {
                    if (f = i.type, i.paramPlace && r[i.paramPlace]) {
                        l = r[i.paramPlace], "?" == l[0] && (l = l.substring(1)), l = l.split("&");
                        for (var s = 0; s < l.length; ++s) {
                            var h = l[s].split("=", 2);
                            2 == h.length && (d[h[0]] = decodeURIComponent(h[1].replace(/\+/g, " ")))
                        }
                    }
                    return c = t.extend(!0, {}, i.params, o.opts[n], d), u = "function" === t.type(i.url) ? i.url.call(this, r, c, o) : e(i.url, r, c), a = "function" === t.type(i.thumb) ? i.thumb.call(this, r, c, o) : e(i.thumb, r), "vimeo" === p && (u = u.replace("&%23", "#")), !1
                }
            }), f ? (o.src = u, o.type = f, o.opts.thumb || o.opts.$thumb && o.opts.$thumb.length || (o.opts.thumb = a), "iframe" === f && (t.extend(!0, o.opts, {
                iframe: {
                    preload: !1,
                    attr: {scrolling: "no"}
                }
            }), o.contentProvider = p, o.opts.slideClass += " fancybox-slide--" + ("gmap_place" == p || "gmap_search" == p ? "map" : "video"))) : o.type = "image")
        })
    })
}(window.jQuery), function (t, e, n) {
    "use strict";
    var i = function () {
        return t.requestAnimationFrame || t.webkitRequestAnimationFrame || t.mozRequestAnimationFrame || t.oRequestAnimationFrame || function (e) {
            return t.setTimeout(e, 1e3 / 60)
        }
    }(), o = function () {
        return t.cancelAnimationFrame || t.webkitCancelAnimationFrame || t.mozCancelAnimationFrame || t.oCancelAnimationFrame || function (e) {
            t.clearTimeout(e)
        }
    }(), s = function (e) {
        var n = [];
        e = e.originalEvent || e || t.e, e = e.touches && e.touches.length ? e.touches : e.changedTouches && e.changedTouches.length ? e.changedTouches : [e];
        for (var i in e) e[i].pageX ? n.push({x: e[i].pageX, y: e[i].pageY}) : e[i].clientX && n.push({
            x: e[i].clientX,
            y: e[i].clientY
        });
        return n
    }, a = function (t, e, n) {
        return e && t ? "x" === n ? t.x - e.x : "y" === n ? t.y - e.y : Math.sqrt(Math.pow(t.x - e.x, 2) + Math.pow(t.y - e.y, 2)) : 0
    }, r = function (t) {
        if (t.is("a,button,input,select,textarea") || n.isFunction(t.get(0).onclick)) return !0;
        for (var e = 0, i = t[0].attributes, o = i.length; e < o; e++) if ("data-fancybox-" === i[e].nodeName.substr(0, 14)) return !0;
        return !1
    }, c = function (e) {
        var n = t.getComputedStyle(e)["overflow-y"], i = t.getComputedStyle(e)["overflow-x"],
            o = ("scroll" === n || "auto" === n) && e.scrollHeight > e.clientHeight,
            s = ("scroll" === i || "auto" === i) && e.scrollWidth > e.clientWidth;
        return o || s
    }, l = function (t) {
        for (var e = !1; ;) {
            if (e = c(t.get(0))) break;
            if (t = t.parent(), !t.length || t.hasClass("fancybox-stage") || t.is("body")) break
        }
        return e
    }, d = function (t) {
        var e = this;
        e.instance = t, e.$bg = t.$refs.bg, e.$stage = t.$refs.stage, e.$container = t.$refs.container, e.destroy(), e.$container.on("touchstart.fb.touch mousedown.fb.touch", n.proxy(e, "ontouchstart"))
    };
    d.prototype.destroy = function () {
        this.$container.off(".fb.touch")
    }, d.prototype.ontouchstart = function (i) {
        var o = this, c = n(i.target), d = o.instance, p = d.current, u = p.$content, f = "touchstart" == i.type;
        if (f && o.$container.off("mousedown.fb.touch"), !p || o.instance.isAnimating || o.instance.isClosing) return i.stopPropagation(), void i.preventDefault();
        if ((!i.originalEvent || 2 != i.originalEvent.button) && c.length && !r(c) && !r(c.parent()) && !(i.originalEvent.clientX > c[0].clientWidth + c.offset().left) && (o.startPoints = s(i), o.startPoints && !(o.startPoints.length > 1 && d.isSliding))) {
            if (o.$target = c, o.$content = u, o.canTap = !0, n(e).off(".fb.touch"), n(e).on(f ? "touchend.fb.touch touchcancel.fb.touch" : "mouseup.fb.touch mouseleave.fb.touch", n.proxy(o, "ontouchend")), n(e).on(f ? "touchmove.fb.touch" : "mousemove.fb.touch", n.proxy(o, "ontouchmove")), i.stopPropagation(), !d.current.opts.touch && !d.canPan() || !c.is(o.$stage) && !o.$stage.find(c).length) return void(c.is("img") && i.preventDefault());
            n.fancybox.isMobile && (l(o.$target) || l(o.$target.parent())) || i.preventDefault(), o.canvasWidth = Math.round(p.$slide[0].clientWidth), o.canvasHeight = Math.round(p.$slide[0].clientHeight), o.startTime = (new Date).getTime(), o.distanceX = o.distanceY = o.distance = 0, o.isPanning = !1, o.isSwiping = !1, o.isZooming = !1, o.sliderStartPos = o.sliderLastPos || {
                top: 0,
                left: 0
            }, o.contentStartPos = n.fancybox.getTranslate(o.$content), o.contentLastPos = null, 1 !== o.startPoints.length || o.isZooming || (o.canTap = !d.isSliding, "image" === p.type && (o.contentStartPos.width > o.canvasWidth + 1 || o.contentStartPos.height > o.canvasHeight + 1) ? (n.fancybox.stop(o.$content), o.$content.css("transition-duration", "0ms"), o.isPanning = !0) : o.isSwiping = !0, o.$container.addClass("fancybox-controls--isGrabbing")), 2 !== o.startPoints.length || d.isAnimating || p.hasError || "image" !== p.type || !p.isLoaded && !p.$ghost || (o.isZooming = !0, o.isSwiping = !1, o.isPanning = !1, n.fancybox.stop(o.$content), o.$content.css("transition-duration", "0ms"), o.centerPointStartX = .5 * (o.startPoints[0].x + o.startPoints[1].x) - n(t).scrollLeft(), o.centerPointStartY = .5 * (o.startPoints[0].y + o.startPoints[1].y) - n(t).scrollTop(), o.percentageOfImageAtPinchPointX = (o.centerPointStartX - o.contentStartPos.left) / o.contentStartPos.width, o.percentageOfImageAtPinchPointY = (o.centerPointStartY - o.contentStartPos.top) / o.contentStartPos.height, o.startDistanceBetweenFingers = a(o.startPoints[0], o.startPoints[1]))
        }
    }, d.prototype.ontouchmove = function (t) {
        var e = this;
        if (e.newPoints = s(t), n.fancybox.isMobile && (l(e.$target) || l(e.$target.parent()))) return t.stopPropagation(), void(e.canTap = !1);
        if ((e.instance.current.opts.touch || e.instance.canPan()) && e.newPoints && e.newPoints.length && (e.distanceX = a(e.newPoints[0], e.startPoints[0], "x"), e.distanceY = a(e.newPoints[0], e.startPoints[0], "y"), e.distance = a(e.newPoints[0], e.startPoints[0]), e.distance > 0)) {
            if (!e.$target.is(e.$stage) && !e.$stage.find(e.$target).length) return;
            t.stopPropagation(), t.preventDefault(), e.isSwiping ? e.onSwipe() : e.isPanning ? e.onPan() : e.isZooming && e.onZoom()
        }
    }, d.prototype.onSwipe = function () {
        var e, s = this, a = s.isSwiping, r = s.sliderStartPos.left || 0;
        !0 === a ? Math.abs(s.distance) > 10 && (s.canTap = !1, s.instance.group.length < 2 && s.instance.opts.touch.vertical ? s.isSwiping = "y" : s.instance.isSliding || !1 === s.instance.opts.touch.vertical || "auto" === s.instance.opts.touch.vertical && n(t).width() > 800 ? s.isSwiping = "x" : (e = Math.abs(180 * Math.atan2(s.distanceY, s.distanceX) / Math.PI), s.isSwiping = e > 45 && e < 135 ? "y" : "x"), s.instance.isSliding = s.isSwiping, s.startPoints = s.newPoints, n.each(s.instance.slides, function (t, e) {
            n.fancybox.stop(e.$slide), e.$slide.css("transition-duration", "0ms"), e.inTransition = !1, e.pos === s.instance.current.pos && (s.sliderStartPos.left = n.fancybox.getTranslate(e.$slide).left)
        }), s.instance.SlideShow && s.instance.SlideShow.isActive && s.instance.SlideShow.stop()) : ("x" == a && (s.distanceX > 0 && (s.instance.group.length < 2 || 0 === s.instance.current.index && !s.instance.current.opts.loop) ? r += Math.pow(s.distanceX, .8) : s.distanceX < 0 && (s.instance.group.length < 2 || s.instance.current.index === s.instance.group.length - 1 && !s.instance.current.opts.loop) ? r -= Math.pow(-s.distanceX, .8) : r += s.distanceX), s.sliderLastPos = {
            top: "x" == a ? 0 : s.sliderStartPos.top + s.distanceY,
            left: r
        }, s.requestId && (o(s.requestId), s.requestId = null), s.requestId = i(function () {
            s.sliderLastPos && (n.each(s.instance.slides, function (t, e) {
                var i = e.pos - s.instance.currPos;
                n.fancybox.setTranslate(e.$slide, {
                    top: s.sliderLastPos.top,
                    left: s.sliderLastPos.left + i * s.canvasWidth + i * e.opts.gutter
                })
            }), s.$container.addClass("fancybox-is-sliding"))
        }))
    }, d.prototype.onPan = function () {
        var t, e, s, a = this;
        a.canTap = !1, t = a.contentStartPos.width > a.canvasWidth ? a.contentStartPos.left + a.distanceX : a.contentStartPos.left, e = a.contentStartPos.top + a.distanceY, s = a.limitMovement(t, e, a.contentStartPos.width, a.contentStartPos.height), s.scaleX = a.contentStartPos.scaleX, s.scaleY = a.contentStartPos.scaleY, a.contentLastPos = s, a.requestId && (o(a.requestId), a.requestId = null), a.requestId = i(function () {
            n.fancybox.setTranslate(a.$content, a.contentLastPos)
        })
    }, d.prototype.limitMovement = function (t, e, n, i) {
        var o, s, a, r, c = this, l = c.canvasWidth, d = c.canvasHeight, p = c.contentStartPos.left,
            u = c.contentStartPos.top, f = c.distanceX, h = c.distanceY;
        return o = Math.max(0, .5 * l - .5 * n), s = Math.max(0, .5 * d - .5 * i), a = Math.min(l - n, .5 * l - .5 * n), r = Math.min(d - i, .5 * d - .5 * i), n > l && (f > 0 && t > o && (t = o - 1 + Math.pow(-o + p + f, .8) || 0), f < 0 && t < a && (t = a + 1 - Math.pow(a - p - f, .8) || 0)), i > d && (h > 0 && e > s && (e = s - 1 + Math.pow(-s + u + h, .8) || 0), h < 0 && e < r && (e = r + 1 - Math.pow(r - u - h, .8) || 0)), {
            top: e,
            left: t
        }
    }, d.prototype.limitPosition = function (t, e, n, i) {
        var o = this, s = o.canvasWidth, a = o.canvasHeight;
        return n > s ? (t = t > 0 ? 0 : t, t = t < s - n ? s - n : t) : t = Math.max(0, s / 2 - n / 2), i > a ? (e = e > 0 ? 0 : e, e = e < a - i ? a - i : e) : e = Math.max(0, a / 2 - i / 2), {
            top: e,
            left: t
        }
    }, d.prototype.onZoom = function () {
        var e = this, s = e.contentStartPos.width, r = e.contentStartPos.height, c = e.contentStartPos.left,
            l = e.contentStartPos.top, d = a(e.newPoints[0], e.newPoints[1]), p = d / e.startDistanceBetweenFingers,
            u = Math.floor(s * p), f = Math.floor(r * p), h = (s - u) * e.percentageOfImageAtPinchPointX,
            M = (r - f) * e.percentageOfImageAtPinchPointY,
            b = (e.newPoints[0].x + e.newPoints[1].x) / 2 - n(t).scrollLeft(),
            m = (e.newPoints[0].y + e.newPoints[1].y) / 2 - n(t).scrollTop(), A = b - e.centerPointStartX,
            g = m - e.centerPointStartY, z = c + (h + A), v = l + (M + g),
            y = {top: v, left: z, scaleX: e.contentStartPos.scaleX * p, scaleY: e.contentStartPos.scaleY * p};
        e.canTap = !1, e.newWidth = u, e.newHeight = f, e.contentLastPos = y, e.requestId && (o(e.requestId), e.requestId = null), e.requestId = i(function () {
            n.fancybox.setTranslate(e.$content, e.contentLastPos)
        })
    }, d.prototype.ontouchend = function (t) {
        var i = this, a = Math.max((new Date).getTime() - i.startTime, 1), r = i.isSwiping, c = i.isPanning,
            l = i.isZooming;
        if (i.endPoints = s(t), i.$container.removeClass("fancybox-controls--isGrabbing"), n(e).off(".fb.touch"), i.requestId && (o(i.requestId), i.requestId = null), i.isSwiping = !1, i.isPanning = !1, i.isZooming = !1, i.canTap) return i.onTap(t);
        i.speed = 366, i.velocityX = i.distanceX / a * .5, i.velocityY = i.distanceY / a * .5, i.speedX = Math.max(.5 * i.speed, Math.min(1.5 * i.speed, 1 / Math.abs(i.velocityX) * i.speed)), c ? i.endPanning() : l ? i.endZooming() : i.endSwiping(r)
    }, d.prototype.endSwiping = function (t) {
        var e = this, i = !1;
        e.instance.isSliding = !1, e.sliderLastPos = null, "y" == t && Math.abs(e.distanceY) > 50 ? (n.fancybox.animate(e.instance.current.$slide, {
            top: e.sliderStartPos.top + e.distanceY + 150 * e.velocityY,
            opacity: 0
        }, 150), i = e.instance.close(!0, 300)) : "x" == t && e.distanceX > 50 && e.instance.group.length > 1 ? i = e.instance.previous(e.speedX) : "x" == t && e.distanceX < -50 && e.instance.group.length > 1 && (i = e.instance.next(e.speedX)), !1 !== i || "x" != t && "y" != t || e.instance.jumpTo(e.instance.current.index, 150), e.$container.removeClass("fancybox-is-sliding")
    }, d.prototype.endPanning = function () {
        var t, e, i, o = this;
        o.contentLastPos && (!1 === o.instance.current.opts.touch.momentum ? (t = o.contentLastPos.left, e = o.contentLastPos.top) : (t = o.contentLastPos.left + o.velocityX * o.speed, e = o.contentLastPos.top + o.velocityY * o.speed), i = o.limitPosition(t, e, o.contentStartPos.width, o.contentStartPos.height), i.width = o.contentStartPos.width, i.height = o.contentStartPos.height, n.fancybox.animate(o.$content, i, 330))
    }, d.prototype.endZooming = function () {
        var t, e, i, o, s = this, a = s.instance.current, r = s.newWidth, c = s.newHeight;
        s.contentLastPos && (t = s.contentLastPos.left, e = s.contentLastPos.top, o = {
            top: e,
            left: t,
            width: r,
            height: c,
            scaleX: 1,
            scaleY: 1
        }, n.fancybox.setTranslate(s.$content, o), r < s.canvasWidth && c < s.canvasHeight ? s.instance.scaleToFit(150) : r > a.width || c > a.height ? s.instance.scaleToActual(s.centerPointStartX, s.centerPointStartY, 150) : (i = s.limitPosition(t, e, r, c), n.fancybox.setTranslate(s.content, n.fancybox.getTranslate(s.$content)), n.fancybox.animate(s.$content, i, 150)))
    }, d.prototype.onTap = function (t) {
        var e, i = this, o = n(t.target), a = i.instance, r = a.current, c = t && s(t) || i.startPoints,
            l = c[0] ? c[0].x - i.$stage.offset().left : 0, d = c[0] ? c[0].y - i.$stage.offset().top : 0,
            p = function (e) {
                var o = r.opts[e];
                if (n.isFunction(o) && (o = o.apply(a, [r, t])), o) switch (o) {
                    case"close":
                        a.close(i.startEvent);
                        break;
                    case"toggleControls":
                        a.toggleControls(!0);
                        break;
                    case"next":
                        a.next();
                        break;
                    case"nextOrClose":
                        a.group.length > 1 ? a.next() : a.close(i.startEvent);
                        break;
                    case"zoom":
                        "image" == r.type && (r.isLoaded || r.$ghost) && (a.canPan() ? a.scaleToFit() : a.isScaledDown() ? a.scaleToActual(l, d) : a.group.length < 2 && a.close(i.startEvent))
                }
            };
        if (!(t.originalEvent && 2 == t.originalEvent.button || a.isSliding || l > o[0].clientWidth + o.offset().left)) {
            if (o.is(".fancybox-bg,.fancybox-inner,.fancybox-outer,.fancybox-container")) e = "Outside"; else if (o.is(".fancybox-slide")) e = "Slide"; else {
                if (!a.current.$content || !a.current.$content.has(t.target).length) return;
                e = "Content"
            }
            if (i.tapped) {
                if (clearTimeout(i.tapped), i.tapped = null, Math.abs(l - i.tapX) > 50 || Math.abs(d - i.tapY) > 50 || a.isSliding) return this;
                p("dblclick" + e)
            } else i.tapX = l, i.tapY = d, r.opts["dblclick" + e] && r.opts["dblclick" + e] !== r.opts["click" + e] ? i.tapped = setTimeout(function () {
                i.tapped = null, p("click" + e)
            }, 300) : p("click" + e);
            return this
        }
    }, n(e).on("onActivate.fb", function (t, e) {
        e && !e.Guestures && (e.Guestures = new d(e))
    }), n(e).on("beforeClose.fb", function (t, e) {
        e && e.Guestures && e.Guestures.destroy()
    })
}(window, document, window.jQuery), function (t, e) {
    "use strict";
    var n = function (t) {
        this.instance = t, this.init()
    };
    e.extend(n.prototype, {
        timer: null, isActive: !1, $button: null, speed: 3e3, init: function () {
            var t = this;
            t.$button = t.instance.$refs.toolbar.find("[data-fancybox-play]").on("click", function () {
                t.toggle()
            }), (t.instance.group.length < 2 || !t.instance.group[t.instance.currIndex].opts.slideShow) && t.$button.hide()
        }, set: function () {
            var t = this;
            t.instance && t.instance.current && (t.instance.current.opts.loop || t.instance.currIndex < t.instance.group.length - 1) ? t.timer = setTimeout(function () {
                t.instance.next()
            }, t.instance.current.opts.slideShow.speed || t.speed) : (t.stop(), t.instance.idleSecondsCounter = 0, t.instance.showControls())
        }, clear: function () {
            var t = this;
            clearTimeout(t.timer), t.timer = null
        }, start: function () {
            var t = this, e = t.instance.current;
            t.instance && e && (e.opts.loop || e.index < t.instance.group.length - 1) && (t.isActive = !0, t.$button.attr("title", e.opts.i18n[e.opts.lang].PLAY_STOP).addClass("fancybox-button--pause"), e.isComplete && t.set())
        }, stop: function () {
            var t = this, e = t.instance.current;
            t.clear(), t.$button.attr("title", e.opts.i18n[e.opts.lang].PLAY_START).removeClass("fancybox-button--pause"), t.isActive = !1
        }, toggle: function () {
            var t = this;
            t.isActive ? t.stop() : t.start()
        }
    }), e(t).on({
        "onInit.fb": function (t, e) {
            e && !e.SlideShow && (e.SlideShow = new n(e))
        }, "beforeShow.fb": function (t, e, n, i) {
            var o = e && e.SlideShow;
            i ? o && n.opts.slideShow.autoStart && o.start() : o && o.isActive && o.clear()
        }, "afterShow.fb": function (t, e) {
            var n = e && e.SlideShow;
            n && n.isActive && n.set()
        }, "afterKeydown.fb": function (n, i, o, s, a) {
            var r = i && i.SlideShow;
            !r || !o.opts.slideShow || 80 !== a && 32 !== a || e(t.activeElement).is("button,a,input") || (s.preventDefault(), r.toggle())
        }, "beforeClose.fb onDeactivate.fb": function (t, e) {
            var n = e && e.SlideShow;
            n && n.stop()
        }
    }), e(t).on("visibilitychange", function () {
        var n = e.fancybox.getInstance(), i = n && n.SlideShow;
        i && i.isActive && (t.hidden ? i.clear() : i.set())
    })
}(document, window.jQuery), function (t, e) {
    "use strict";
    var n = function () {
        var e, n, i,
            o = [["requestFullscreen", "exitFullscreen", "fullscreenElement", "fullscreenEnabled", "fullscreenchange", "fullscreenerror"], ["webkitRequestFullscreen", "webkitExitFullscreen", "webkitFullscreenElement", "webkitFullscreenEnabled", "webkitfullscreenchange", "webkitfullscreenerror"], ["webkitRequestFullScreen", "webkitCancelFullScreen", "webkitCurrentFullScreenElement", "webkitCancelFullScreen", "webkitfullscreenchange", "webkitfullscreenerror"], ["mozRequestFullScreen", "mozCancelFullScreen", "mozFullScreenElement", "mozFullScreenEnabled", "mozfullscreenchange", "mozfullscreenerror"], ["msRequestFullscreen", "msExitFullscreen", "msFullscreenElement", "msFullscreenEnabled", "MSFullscreenChange", "MSFullscreenError"]],
            s = {};
        for (n = 0; n < o.length; n++) if ((e = o[n]) && e[1] in t) {
            for (i = 0; i < e.length; i++) s[o[0][i]] = e[i];
            return s
        }
        return !1
    }();
    if (!n) return void(e.fancybox.defaults.btnTpl.fullScreen = !1);
    var i = {
        request: function (e) {
            e = e || t.documentElement, e[n.requestFullscreen](e.ALLOW_KEYBOARD_INPUT)
        }, exit: function () {
            t[n.exitFullscreen]()
        }, toggle: function (e) {
            e = e || t.documentElement, this.isFullscreen() ? this.exit() : this.request(e)
        }, isFullscreen: function () {
            return Boolean(t[n.fullscreenElement])
        }, enabled: function () {
            return Boolean(t[n.fullscreenEnabled])
        }
    };
    e(t).on({
        "onInit.fb": function (t, e) {
            var n, o = e.$refs.toolbar.find("[data-fancybox-fullscreen]");
            e && !e.FullScreen && e.group[e.currIndex].opts.fullScreen ? (n = e.$refs.container, n.on("click.fb-fullscreen", "[data-fancybox-fullscreen]", function (t) {
                t.stopPropagation(), t.preventDefault(), i.toggle(n[0])
            }), e.opts.fullScreen && !0 === e.opts.fullScreen.autoStart && i.request(n[0]), e.FullScreen = i) : o.hide()
        }, "afterKeydown.fb": function (t, e, n, i, o) {
            e && e.FullScreen && 70 === o && (i.preventDefault(), e.FullScreen.toggle(e.$refs.container[0]))
        }, "beforeClose.fb": function (t) {
            t && t.FullScreen && i.exit()
        }
    }), e(t).on(n.fullscreenchange, function () {
        var t = e.fancybox.getInstance();
        t.current && "image" === t.current.type && t.isAnimating && (t.current.$content.css("transition", "none"), t.isAnimating = !1, t.update(!0, !0, 0))
    })
}(document, window.jQuery), function (t, e) {
    "use strict";
    var n = function (t) {
        this.instance = t, this.init()
    };
    e.extend(n.prototype, {
        $button: null, $grid: null, $list: null, isVisible: !1, init: function () {
            var t = this, e = t.instance.group[0], n = t.instance.group[1];
            t.$button = t.instance.$refs.toolbar.find("[data-fancybox-thumbs]"), t.instance.group.length > 1 && t.instance.group[t.instance.currIndex].opts.thumbs && ("image" == e.type || e.opts.thumb || e.opts.$thumb) && ("image" == n.type || n.opts.thumb || n.opts.$thumb) ? (t.$button.on("click", function () {
                t.toggle()
            }), t.isActive = !0) : (t.$button.hide(), t.isActive = !1)
        }, create: function () {
            var t, n, i = this.instance;
            this.$grid = e('<div class="fancybox-thumbs"></div>').appendTo(i.$refs.container), t = "<ul>", e.each(i.group, function (e, i) {
                n = i.opts.thumb || (i.opts.$thumb ? i.opts.$thumb.attr("src") : null), n || "image" !== i.type || (n = i.src), n && n.length && (t += '<li data-index="' + e + '"  tabindex="0" class="fancybox-thumbs-loading"><img data-src="' + n + '" /></li>')
            }), t += "</ul>", this.$list = e(t).appendTo(this.$grid).on("click", "li", function () {
                i.jumpTo(e(this).data("index"))
            }), this.$list.find("img").hide().one("load", function () {
                var t, n, i, o, s = e(this).parent().removeClass("fancybox-thumbs-loading"), a = s.outerWidth(),
                    r = s.outerHeight();
                t = this.naturalWidth || this.width, n = this.naturalHeight || this.height, i = t / a, o = n / r, i >= 1 && o >= 1 && (i > o ? (t /= o, n = r) : (t = a, n /= i)), e(this).css({
                    width: Math.floor(t),
                    height: Math.floor(n),
                    "margin-top": Math.min(0, Math.floor(.3 * r - .3 * n)),
                    "margin-left": Math.min(0, Math.floor(.5 * a - .5 * t))
                }).show()
            }).each(function () {
                this.src = e(this).data("src")
            })
        }, focus: function () {
            this.instance.current && this.$list.children().removeClass("fancybox-thumbs-active").filter('[data-index="' + this.instance.current.index + '"]').addClass("fancybox-thumbs-active").focus()
        }, close: function () {
            this.$grid.hide()
        }, update: function () {
            this.instance.$refs.container.toggleClass("fancybox-show-thumbs", this.isVisible), this.isVisible ? (this.$grid || this.create(), this.instance.trigger("onThumbsShow"), this.focus()) : this.$grid && this.instance.trigger("onThumbsHide"), this.instance.update()
        }, hide: function () {
            this.isVisible = !1, this.update()
        }, show: function () {
            this.isVisible = !0, this.update()
        }, toggle: function () {
            this.isVisible = !this.isVisible, this.update()
        }
    }), e(t).on({
        "onInit.fb": function (t, e) {
            e && !e.Thumbs && (e.Thumbs = new n(e))
        }, "beforeShow.fb": function (t, e, n, i) {
            var o = e && e.Thumbs;
            if (o && o.isActive) {
                if (n.modal) return o.$button.hide(), void o.hide();
                i && !0 === e.opts.thumbs.autoStart && o.show(), o.isVisible && o.focus()
            }
        }, "afterKeydown.fb": function (t, e, n, i, o) {
            var s = e && e.Thumbs;
            s && s.isActive && 71 === o && (i.preventDefault(), s.toggle())
        }, "beforeClose.fb": function (t, e) {
            var n = e && e.Thumbs;
            n && n.isVisible && !1 !== e.opts.thumbs.hideOnClose && n.close()
        }
    })
}(document, window.jQuery), function (t, e, n) {
    "use strict";

    function i() {
        var t = e.location.hash.substr(1), n = t.split("-"),
            i = n.length > 1 && /^\+?\d+$/.test(n[n.length - 1]) ? parseInt(n.pop(-1), 10) || 1 : 1, o = n.join("-");
        return i < 1 && (i = 1), {hash: t, index: i, gallery: o}
    }

    function o(t) {
        var e;
        "" !== t.gallery && (e = n("[data-fancybox='" + n.escapeSelector(t.gallery) + "']").eq(t.index - 1), e.length || (e = n("#" + n.escapeSelector(t.gallery))), e.length && (a = !1, e.trigger("click")))
    }

    function s(t) {
        var e;
        return !!t && (e = t.current ? t.current.opts : t.opts, e.$orig ? e.$orig.data("fancybox") : e.hash || "")
    }

    n.escapeSelector || (n.escapeSelector = function (t) {
        var e = /([\0-\x1f\x7f]|^-?\d)|^-$|[^\x80-\uFFFF\w-]/g, n = function (t, e) {
            return e ? "\0" === t ? "\ufffd" : t.slice(0, -1) + "\\" + t.charCodeAt(t.length - 1).toString(16) + " " : "\\" + t
        };
        return (t + "").replace(e, n)
    });
    var a = !0, r = null, c = null;
    n(function () {
        setTimeout(function () {
            !1 !== n.fancybox.defaults.hash && (n(t).on({
                "onInit.fb": function (t, e) {
                    var n, o;
                    !1 !== e.group[e.currIndex].opts.hash && (n = i(), (o = s(e)) && n.gallery && o == n.gallery && (e.currIndex = n.index - 1))
                }, "beforeShow.fb": function (n, i, o) {
                    var l;
                    !1 !== o.opts.hash && (l = s(i)) && "" !== l && (e.location.hash.indexOf(l) < 0 && (i.opts.origHash = e.location.hash), r = l + (i.group.length > 1 ? "-" + (o.index + 1) : ""), "replaceState" in e.history ? (c && clearTimeout(c), c = setTimeout(function () {
                        e.history[a ? "pushState" : "replaceState"]({}, t.title, e.location.pathname + e.location.search + "#" + r), c = null, a = !1
                    }, 300)) : e.location.hash = r)
                }, "beforeClose.fb": function (i, o, a) {
                    var l, d;
                    c && clearTimeout(c), !1 !== a.opts.hash && (l = s(o), d = o && o.opts.origHash ? o.opts.origHash : "", l && "" !== l && ("replaceState" in history ? e.history.replaceState({}, t.title, e.location.pathname + e.location.search + d) : (e.location.hash = d, n(e).scrollTop(o.scrollTop).scrollLeft(o.scrollLeft))), r = null)
                }
            }), n(e).on("hashchange.fb", function () {
                var t = i();
                n.fancybox.getInstance() ? !r || r === t.gallery + "-" + t.index || 1 === t.index && r == t.gallery || (r = null, n.fancybox.close(), a = !0) : "" !== t.gallery && o(t)
            }), o(i()))
        }, 50)
    })
}(document, window, window.jQuery), function (t) {
    var e = !1;
    if ("function" == typeof define && define.amd && (define(t), e = !0), "object" == typeof exports && (module.exports = t(), e = !0), !e) {
        var n = window.Cookies, i = window.Cookies = t();
        i.noConflict = function () {
            return window.Cookies = n, i
        }
    }
}(function () {
    function t() {
        for (var t = 0, e = {}; t < arguments.length; t++) {
            var n = arguments[t];
            for (var i in n) e[i] = n[i]
        }
        return e
    }

    function e(n) {
        function i(e, o, s) {
            var a;
            if ("undefined" != typeof document) {
                if (arguments.length > 1) {
                    if (s = t({path: "/"}, i.defaults, s), "number" == typeof s.expires) {
                        var r = new Date;
                        r.setMilliseconds(r.getMilliseconds() + 864e5 * s.expires), s.expires = r
                    }
                    s.expires = s.expires ? s.expires.toUTCString() : "";
                    try {
                        a = JSON.stringify(o), /^[\{\[]/.test(a) && (o = a)
                    } catch (t) {
                    }
                    o = n.write ? n.write(o, e) : encodeURIComponent(String(o)).replace(/%(23|24|26|2B|3A|3C|3E|3D|2F|3F|40|5B|5D|5E|60|7B|7D|7C)/g, decodeURIComponent), e = encodeURIComponent(String(e)), e = e.replace(/%(23|24|26|2B|5E|60|7C)/g, decodeURIComponent), e = e.replace(/[\(\)]/g, escape);
                    var c = "";
                    for (var l in s) s[l] && (c += "; " + l, !0 !== s[l] && (c += "=" + s[l]));
                    return document.cookie = e + "=" + o + c
                }
                e || (a = {});
                for (var d = document.cookie ? document.cookie.split("; ") : [], p = /(%[0-9A-Z]{2})+/g, u = 0; u < d.length; u++) {
                    var f = d[u].split("="), h = f.slice(1).join("=");
                    '"' === h.charAt(0) && (h = h.slice(1, -1));
                    try {
                        var M = f[0].replace(p, decodeURIComponent);
                        if (h = n.read ? n.read(h, M) : n(h, M) || h.replace(p, decodeURIComponent), this.json) try {
                            h = JSON.parse(h)
                        } catch (t) {
                        }
                        if (e === M) {
                            a = h;
                            break
                        }
                        e || (a[M] = h)
                    } catch (t) {
                    }
                }
                return a
            }
        }

        return i.set = i, i.get = function (t) {
            return i.call(i, t)
        }, i.getJSON = function () {
            return i.apply({json: !0}, [].slice.call(arguments))
        }, i.defaults = {}, i.remove = function (e, n) {
            i(e, "", t(n, {expires: -1}))
        }, i.withConverter = e, i
    }

    return e(function () {
    })
}), $(window).on("load", function () {
    $('[data-toggle="tooltip"]').tooltip(), $(".arrow-button-holder a").click(function () {
        $("html, body").animate({scrollTop: $("#services").offset().top}, 500)
    });
    var t = $(".feature-icon-holder", "#features-links-holder");
    t.on("click", function () {
        t.removeClass("opened"), $(this).addClass("opened"), $(".show-details", "#features-holder").removeClass("show-details"), $(".feature-d" + $(this).data("id"), "#features-holder").addClass("show-details")
    });
    var e = $("#features-holder"), n = $("#features-links-holder"), i = $(".show-details", "#features-holder");
    e.css("height", i.height() + 120), n.css("height", i.height() + 120), $(window).on("resize", function () {
        return e.css("height", i.height() + 120), n.css("height", i.height() + 120), !1
    });
    var o = $(".app-icon-holder", "#apps");
    o.on("mouseover", function () {
        o.removeClass("opened"), $(this).addClass("opened"), $(".show-details", "#apps").removeClass("show-details"), $(".app-details" + $(this).data("id"), "#apps").addClass("show-details")
    });
    var s = $(".info-link", "#more-info");
    if (s.on("mouseover", function () {
            s.removeClass("opened"), $(this).addClass("opened"), $(".show-details", "#more-info").removeClass("show-details"), $(".info-d" + $(this).data("id"), "#more-info").addClass("show-details")
        }), $(".progress-presale .progress-bar").progressbar({display_text: "fill"}), $(".progress-disabled .progress-bar").each(function (t, e) {
            setTimeout(function () {
                $(e).progressbar({transition_delay: 150})
            }, 150 * t)
        }), window.timeout_x = $(".completed.progress").length, setTimeout(function () {
            $(".progress-global .progress-bar").progressbar({display_text: "fill"})
        }, 150 * window.timeout_x + 300), moment.tz.add("Etc/UTC|UTC|0|0|"), $("#finishing").length > 0) {
        var a = moment.tz($("#finishing").data("end"), "Etc/UTC");
        $("#finishing").countdown(a.toDate(), function (t) {
            var e = "%H:%M:%S";
            t.offset.totalDays > 0 && (e = "%-d day%!d " + e), t.offset.weeks > 0 && (e = "%-w week%!w " + e), $(this).html(t.strftime(e))
        }).on("finish.countdown", function () {
            location.reload()
        })
    }
    if ($("#finishing-top").length > 0) {
        var a = moment.tz($("#finishing-top").data("end"), "Etc/UTC");
        $("#finishing-top").countdown(a.toDate(), function (t) {
            var e = "%H:%M:%S";
            t.offset.totalDays > 0 && (e = "%-d day%!d " + e), t.offset.weeks > 0 && (e = "%-w week%!w " + e), $(this).html(t.strftime(e))
        })
    }
    if ($("#getting-started").length > 0) {
        var r = moment.tz($("#getting-started").data("start"), "Etc/UTC")
        ;$("#getting-started").countdown(r.toDate(), function (t) {
            var e = "%H:%M:%S";
            t.offset.totalDays > 0 && (e = "%-d day%!d " + e), t.offset.weeks > 0 && (e = "%-w week%!w " + e), $(this).html(t.strftime(e))
        }).on("finish.countdown", function () {
            setTimeout(function () {
                location.reload()
            }, 1e4)
        })
    }
    $("#join-slack button.slack").on("click", function () {
        var t = $("#join-slack input").val(), e = $("#join-slack button.slack"), n = $("#join-slack #message");
        "" != t && (e.attr("disabled", "true").addClass("disabled"), $.ajax({
            method: "POST",
            url: "/slack-invite",
            data: {email: t}
        }).done(function (t) {
            e.attr("disabled", !1).removeClass("disabled"), n.attr("class", ""), "nok" == t.status ? (n.addClass("fail"), n.html("Email is not valid.")) : "ok" == t.status && (n.html("Invite sent!"), n.addClass("success")), setTimeout(function () {
                n.html("")
            }, 3e3)
        }))
    }), $("#slack-wrapper button.slack").on("click", function () {
        var t = $("#slack-wrapper input").val(), e = $("#slack-wrapper button.slack"), n = $("#slack-wrapper #message");
        "" != t && (e.attr("disabled", "true").addClass("disabled"), $.ajax({
            method: "POST",
            url: "/slack-invite",
            data: {email: t}
        }).done(function (t) {
            e.attr("disabled", !1).removeClass("disabled"), n.attr("class", ""), "nok" == t.status ? (n.addClass("fail"), n.html("Email is not valid.")) : "ok" == t.status && (n.html("Invite sent!"), n.addClass("success")), setTimeout(function () {
                n.html("")
            }, 3e3)
        }))
    }), $("#join-slack button.newsletter").on("click", function () {
        var t = $("#join-slack input").val(), e = $("#join-slack button.newsletter"), n = $("#join-slack #message");
        "" != t && (e.attr("disabled", "true").addClass("disabled"), $.ajax({
            method: "POST",
            url: "/newsletter-invite",
            data: {email: t}
        }).done(function (t) {
            e.attr("disabled", !1).removeClass("disabled"), n.attr("class", ""), "nok" == t.status ? (n.addClass("fail"), n.html(t.message)) : "ok" == t.status && (n.html("Newsletter confirmation sent!"), n.addClass("success")), setTimeout(function () {
                n.html("")
            }, 3e3)
        }))
    }), $("#header-holder").hasClass("success-view") && (ga("send", "event", "payment", "success", "done"), mixpanel.track("Made payment")), $("#header-holder").hasClass("cancel-view") && mixpanel.track("Cancelled payment"), $('a[href="/whitepaper.pdf"]').on("click", function () {
        mixpanel.track("Whitepaper downloaded", {language: "english"})
    }), $('a[href="/whitepaper_rus.pdf"]').on("click", function () {
        mixpanel.track("Whitepaper downloaded", {language: "russian"})
    }), $('a[href="/whitepaper_tur.pdf"]').on("click", function () {
        mixpanel.track("Whitepaper downloaded", {language: "turkish"})
    }), $('a[href="/whitepaper_hindi.pdf"]').on("click", function () {
        mixpanel.track("Whitepaper downloaded", {language: "hindi"})
    }), $('a[href="/whitepaper_de.pdf"]').on("click", function () {
        mixpanel.track("Whitepaper downloaded", {language: "german"})
    }), window.addeventasync = function () {
        addeventatc.register("button-click", function () {
            mixpanel.track("Clicked calendar")
        }), addeventatc.register("button-dropdown-click", function (t) {
            mixpanel.track("Downloaded calendar", {calendar: t.service})
        })
    }, $("#addeventatc1-drop > span").on("click", function () {
        mixpanel.track("Downloaded calendar", {calendar: obj.service})
    });
    var c = window.location.search.substring(1), l = parse_query_string(c);
    l.r && Cookies.get("referrer_id") == undefined && Cookies.set("referrer_id", l.r, {expires: 45}), $("#contributor_referrer_id").length > 0 && $("#contributor_referrer_id").val(Cookies.get("referrer_id"));
    var c = window.location.search.substring(1), l = parse_query_string(c);
    l.utm_medium && Cookies.set("utm_medium", l.utm_medium, {expires: 1}), $("#contributor_utm_medium").length > 0 && $("#contributor_utm_medium").val(Cookies.get("utm_medium")), "yes" == getUrlParameter("video") && $(".video-box a").click()
});
var getUrlParameter = function (t) {
    var e, n, i = decodeURIComponent(window.location.search.substring(1)), o = i.split("&");
    for (n = 0; n < o.length; n++) if (e = o[n].split("="), e[0] === t) return e[1] === undefined || e[1]
};