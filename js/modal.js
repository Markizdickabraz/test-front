
(()=>{
    "use strict";
    function r(r, e) {
        var t = {};
        for (var n in r)
            Object.prototype.hasOwnProperty.call(r, n) && e.indexOf(n) < 0 && (t[n] = r[n]);
        if (null != r && "function" == typeof Object.getOwnPropertySymbols) {
            var a = 0;
            for (n = Object.getOwnPropertySymbols(r); a < n.length; a++)
                e.indexOf(n[a]) < 0 && Object.prototype.propertyIsEnumerable.call(r, n[a]) && (t[n[a]] = r[n[a]])
        }
        return t
    }
    Object.create,
    Object.create;
    var e = function(e) {
        var t = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : {}
          , {target: n=document.body} = t
          , a = r(t, ["target"])
          , o = new MutationObserver((()=>{
            e()
        }
        ));
        return o.observe(n, a),
        {
            disconnect: ()=>o.disconnect()
        }
    }
      , t = window.location.hash.includes("mrfdebug")
      , n = function(r) {
        if (t) {
            for (var e = arguments.length, n = new Array(e > 1 ? e - 1 : 0), a = 1; a < e; a++)
                n[a - 1] = arguments[a];
            console.debug("%c[headline-".concat(r, "] %c"), "color:#ff9423", "color: inherit", ...n)
        }
    }
      , a = ()=>{
        var r = document.querySelector('script[data-mrf-script="'.concat("experimentation-headlineab", '"]'))
          , e = null == r ? void 0 : r.innerHTML;
        if (!e)
            return null;
        try {
            return JSON.parse(e)
        } catch (r) {
            n("configuration", "Could not load inline configuration")
        }
        return null
    }
      , o = ()=>{}
    ;
    class i {
        constructor() {
            this.id = 0,
            this.isRunning = !1,
            this._reject = o
        }
        cancel() {
            this.isRunning = !1,
            window.clearTimeout(this.id),
            this._reject()
        }
        start() {
            var r = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : 8e3
              , e = o;
            return this.id = window.setTimeout((()=>{
                this.isRunning = !1,
                e()
            }
            ), r),
            this.isRunning = !0,
            new Promise(((r,t)=>{
                e = r,
                this._reject = t
            }
            ))
        }
    }
    function l(r, e, t, n, a, o, i) {
        try {
            var l = r[o](i)
              , c = l.value
        } catch (r) {
            return void t(r)
        }
        l.done ? e(c) : Promise.resolve(c).then(n, a)
    }
    var c = function() {
        var r, t = (r = function*() {
            var r = new i
              , t = null
              , {disconnect: n} = e((()=>{
                r.isRunning ? (t = a()) && (n(),
                r.cancel()) : n()
            }
            ), {
                target: document.head,
                childList: !0
            });
            try {
                yield r.start()
            } catch (r) {}
            return t
        }
        ,
        function() {
            var e = this
              , t = arguments;
            return new Promise((function(n, a) {
                var o = r.apply(e, t);
                function i(r) {
                    l(o, n, a, i, c, "next", r)
                }
                function c(r) {
                    l(o, n, a, i, c, "throw", r)
                }
                i(void 0)
            }
            ))
        }
        );
        return function() {
            return t.apply(this, arguments)
        }
    }()
      , u = r=>"text"in r
      , d = r=>"attr"in r
      , h = r=>"selector"in r
      , m = ["data-mrf-recirculation", "data-dtm-region", "dtm-region"]
      , f = (r,e)=>{
        var {recirculationModule: t} = r
          , n = (null == e ? void 0 : e.modules) || []
          , a = [...n.filter(d).map((r=>{
            var {attr: e} = r;
            return e
        }
        )), ...m].map((r=>"[".concat(r, ' = "').concat(t.name, '"]')))
          , o = n.filter(h).find((r=>{
            var {name: e} = r;
            return e === t.name
        }
        ));
        return o && a.push(o.selector),
        Array.from(document.querySelectorAll(a.join(", ")))
    }
      , s = r=>{
        var e = J(r, r.recirculationModule.config);
        if (e) {
            if (!e.dataset.mrfExperiment)
                return e.dataset.mrfExperiment = r.id,
                e;
            n("tracker", "Anchor for ".concat(r.id, " already tracked"))
        } else
            n("tracker", "Anchor for ".concat(r.id, " not found"))
    }
      , v = r=>(e,t)=>{
        var n = f(e, t);
        return (null == n ? void 0 : n.length) ? r(e, t, f(e, t)) : null
    }
      , g = (r,e,t)=>{
        var {target: {anchor: {href: n}}} = r;
        if (!(null == t ? void 0 : t.length))
            return null;
        if (CSS.supports("selector(:has(+ *))")) {
            var a = t.map((r=>{
                var {element: e, anchor: t} = r;
                return "".concat(e, ":has(").concat(t, '[href="').concat(n, '"])')
            }
            )).join(", ");
            return e.map((r=>r.querySelector(a))).filter(Boolean)[0] || null
        }
        var o = t.map((r=>{
            var {element: e} = r;
            return e
        }
        )).join(", ")
          , i = t.map((r=>{
            var {anchor: e, element: t} = r;
            return "".concat(t, " ").concat(e, '[href="').concat(n, '"]')
        }
        )).join(",");
        return e.map((r=>r.querySelector(i))).filter(Boolean).map((r=>r.closest(o)))[0]
    }
      , p = r=>v((function(e) {
        var t = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : {}
          , n = arguments.length > 2 ? arguments[2] : void 0
          , {layouts: a=[]} = t;
        if (!n)
            return null;
        var o = n instanceof Array ? n : [n]
          , i = g(e, o, [{
            element: "[data-mrf-layout]",
            anchor: "[data-mrf-layout-anchor]",
            title: ""
        }]) || g(e, o, a);
        return i ? r(e, t, i) : null
    }
    ))
      , y = r=>r ? r instanceof Array ? r : [r] : null
      , w = (r,e)=>e.find((e=>{
        var {element: t} = e;
        return r.matches(t)
    }
    ))
      , b = r=>{
        var e = document.evaluate(r, document, null, XPathResult.ORDERED_NODE_ITERATOR_TYPE, null);
        try {
            var t = e.iterateNext();
            if (!t)
                return null;
            for (var n = []; t; )
                n.push(t),
                t = e.iterateNext();
            return n
        } catch (r) {}
        return null
    }
      , S = r=>{
        var {target: e} = r;
        return b(e.anchor.xpath)
    }
      , A = (r,e,t)=>{
        var {target: n} = r
          , a = (y(t) || [document]).map((r=>[...r.querySelectorAll('a[data-mrf-link="'.concat(n.anchor.href, '"]'))])).flat();
        return a.length > 0 ? a : null
    }
      , x = (r,e,t)=>{
        var {target: n} = r
          , a = n.anchor.href
          , o = (r=>{
            try {
                var e = new URL(r);
                return e.toString().substring(e.origin.length)
            } catch (r) {}
            return r
        }
        )(a)
          , i = (y(t) || [document]).map((r=>[...r.querySelectorAll('a[href="'.concat(a, '"]').concat(a !== o ? ', a[href="'.concat(o, '"]') : ""))])).flat();
        return i.length > 0 ? i : null
    }
      , O = r=>{
        var {target: e} = r;
        return e.title ? b(e.title.xpath) : null
    }
      , E = r=>{
        var {target: e} = r;
        return e.image ? b(e.image.xpath) : null
    }
      , R = (r,e,t)=>{
        var {target: n} = r
          , a = y(t) || [document]
          , {image: o} = n;
        if (!o)
            return null;
        var i = a.map((r=>[...r.querySelectorAll('img[src="'.concat(o.src, '"]'))])).flat();
        return i.length > 0 ? i : null
    }
    ;
    let T = {};
    function L(r, {cache: e=!0, readonly: t=!0}={}) {
        try {
            if (!t)
                return new URL(r,document.baseURI);
            if (!T[r]) {
                const {host: t, hostname: n, pathname: a, port: o, protocol: i, search: l, hash: c, href: u, origin: d} = new URL(r,document.baseURI)
                  , h = {
                    host: t,
                    hostname: n,
                    pathname: a,
                    port: o,
                    protocol: i,
                    search: l,
                    hash: c,
                    href: u,
                    origin: d
                };
                if (!e)
                    return h;
                T[r] = h
            }
            return Object.assign({}, T[r])
        } catch (r) {
            return {}
        }
    }
    RegExp("^((25[0-5]|2[0-4][0-9]|1[0-9][0-9]|[1-9][0-9]|[0-9])\\.){3}(25[0-5]|2[0-4][0-9]|1[0-9][0-9]|[1-9][0-9]|[0-9])");
    var q = (r,e)=>(null == r ? void 0 : r.tagName) === e.toUpperCase()
      , C = (r,e)=>q(r, e) ? r : r.querySelector(e)
      , N = r=>C(r, "img")
      , j = r=>!!r
      , M = (r,e)=>{
        var {target: {anchor: t, title: n}} = r;
        if (!j(e))
            return !1;
        var a = u(t) ? t.text : null == n ? void 0 : n.text;
        return e.innerHTML.trim() === (null == a ? void 0 : a.trim())
    }
      , D = (r,e)=>{
        var t = r.target.anchor
          , n = u(t) && t.textSelector;
        return M(r, n ? null == e ? void 0 : e.querySelector(n) : e)
    }
      , P = (r,e)=>{
        if (!j(e) || !r.target.image)
            return !1;
        var t, n = (t = e)instanceof HTMLImageElement ? t.closest("a") : C(t, "a");
        if (n && n.getAttribute("href") === r.target.anchor.href)
            return !0;
        var a = N(e);
        return !(!a || a.src !== r.target.image.src)
    }
      , I = (r,e)=>{
        if (!e)
            return !1;
        var {image: t, title: n, anchor: a} = e;
        return M(r, n) && ((r,e)=>!(r.target.image && !e) && (!r.target.image || e instanceof HTMLImageElement && e.src === r.target.image.src))(r, t) && ((r,e)=>{
            var {target: {anchor: {href: t}}} = r;
            return !!j(e) && t === function(r, e) {
                let t = null;
                if (t = "mrfLink"in r && r.mrfLink || r.getAttribute("data-mrf-link") || r.getAttribute("href") || r.getAttribute("data-mrf-uri"),
                null === t)
                    return null;
                const n = L(t || "");
                return "null" === n.origin ? null : n.href
            }(e)
        }
        )(r, a)
    }
      , k = [{
        name: "xpath",
        matcher: S
    }, {
        name: "recirculation-module(mrf-link)",
        matcher: v(A)
    }, {
        name: "mrf-link",
        matcher: A
    }, {
        name: "recirculation-module(href)",
        matcher: v(x)
    }, {
        name: "href",
        matcher: x
    }]
      , H = [{
        name: "xpath",
        matcher: (r,e)=>{
            var t, n, a, {target: {anchor: o}} = r, {layouts: i} = null != e ? e : {};
            if (u(o) || !(Array.isArray(i) && i.length > 0))
                return null;
            var l = i.map((r=>{
                var {element: e} = r;
                return e
            }
            )).join(", ")
              , c = null === (t = S(r)) || void 0 === t ? void 0 : t[0];
            return {
                element: null == c ? void 0 : c.closest(l),
                anchor: c,
                title: null === (n = O(r)) || void 0 === n ? void 0 : n[0],
                image: null === (a = E(r)) || void 0 === a ? void 0 : a[0]
            }
        }
    }, {
        name: "recirculation-module(layout)(attrs)",
        matcher: p(((r,e,t)=>!t || t instanceof Array || null === t.getAttribute("data-mrf-layout") ? null : {
            element: t,
            anchor: t.querySelector("[data-mrf-layout-anchor]"),
            title: t.querySelector("[data-mrf-layout-title]"),
            image: t.querySelector("[data-mrf-layout-img]")
        }))
    }, {
        name: "recirculation-module(layout)(config)",
        matcher: p((function(r) {
            var {layouts: e} = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : {}
              , t = arguments.length > 2 ? arguments[2] : void 0;
            if (!t || t instanceof Array || !(null == e ? void 0 : e.length))
                return null;
            var n = w(t, e);
            return n ? {
                element: t,
                anchor: t.querySelector(n.anchor),
                title: t.querySelector(n.title),
                image: (null == n ? void 0 : n.img) ? t.querySelector(n.img) : null
            } : null
        }
        ))
    }]
      , _ = [{
        name: "xpath",
        matcher: E
    }, {
        name: "recirculation-module(src)",
        matcher: v(R)
    }, {
        name: "src",
        matcher: R
    }]
      , U = (r,e)=>function() {
        return r(...arguments) || e(...arguments)
    }
      , F = (r,e)=>(t,n,a)=>{
        var o;
        if (a) {
            var i = t.id
              , l = null !== (o = a[e]) && void 0 !== o ? o : a[e] = {};
            return !l[i] && (l[i] = r(t, n)),
            l[i]
        }
        return r(t, n)
    }
      , B = F(((r,e)=>{
        for (var {name: t, matcher: a} of H) {
            var o = a(r, e);
            if (n("layout-matcher", t, o),
            o && I(r, o))
                return n("layout-matcher", "match found", o),
                o
        }
        return null
    }
    ), "layout")
      , z = (r,e)=>{
        for (var {name: t, matcher: a} of k) {
            var o = a(r, e);
            n("anchor-matcher", t, o);
            var i = null == o ? void 0 : o.find((e=>D(r, e)));
            if (i)
                return n("anchor-matcher", "match found", i),
                i
        }
        return null
    }
      , J = U((function() {
        var r;
        return null === (r = B(...arguments)) || void 0 === r ? void 0 : r.anchor
    }
    ), F(z, "anchor"))
      , V = U((function() {
        var r;
        return null === (r = B(...arguments)) || void 0 === r ? void 0 : r.image
    }
    ), F(((r,e)=>{
        for (var {name: t, matcher: a} of _) {
            var o = a(r, e);
            n("image-matcher", t, o);
            var i = null == o ? void 0 : o.find((e=>P(r, e)));
            if (i)
                return n("image-matcher", "match found", i),
                i
        }
        return null
    }
    ), "image"))
      , X = U((function() {
        var r;
        return null === (r = B(...arguments)) || void 0 === r ? void 0 : r.title
    }
    ), F((function() {
        for (var r = arguments.length, e = new Array(r), t = 0; t < r; t++)
            e[t] = arguments[t];
        var [{target: {anchor: n}}] = e
          , a = u(n) && n.textSelector
          , o = z(...e);
        return a ? null == o ? void 0 : o.querySelector(a) : o
    }
    ), "title"))
      , Y = [{
        name: "anchor",
        replacer: (r,e,t)=>{
            var n, {replacements: a} = r, o = [];
            if (!a.anchor && !a.title)
                return o;
            var i, l, c, u = X(r, e, t);
            if (u) {
                var d = (l = (null === (n = a.title) || void 0 === n ? void 0 : n.text) || a.anchor.text,
                (i = u) ? (l.indexOf("<") >= 0 || 1 !== (c = i).childNodes.length || 3 !== c.firstChild.nodeType ? i.innerHTML = l : i.firstChild.nodeValue = l,
                i) : null);
                d && o.push(d)
            }
            return o
        }
    }, {
        name: "image",
        replacer: (r,e,t)=>{
            var {replacements: n} = r
              , a = [];
            if (!n.image)
                return a;
            var o = V(r, e, t);
            if (o) {
                var i = ((r,e)=>{
                    if (!r)
                        return null;
                    var t, n = (t = r)instanceof HTMLImageElement ? q(t.parentNode, "picture") ? t.parentNode : null : C(t, "picture");
                    if (n) {
                        var a = [...n.children].filter((r=>q(r, "source")));
                        for (var o of a)
                            o.srcset = e
                    }
                    var i = N(r);
                    return i ? (i.src = e,
                    i.removeAttribute("srcset"),
                    i) : null
                }
                )(o, n.image.src);
                i && a.push(i)
            }
            return a
        }
    }]
      , Z = r=>{
        var e = []
          , t = {};
        for (var {name: a, replacer: o} of Y) {
            n("replace", a, r.replacements[a]);
            var i = o(r, r.recirculationModule.config, t);
            i && e.push(...i)
        }
        return e
    }
      , G = r=>{
        window.marfeel = window.marfeel || {},
        window.marfeel.cmd = window.marfeel.cmd || [],
        window.marfeel.cmd.push(["synchronizer", e=>{
            e.resolve("headline", r)
        }
        ])
    }
      , K = 50
      , Q = "[data-".concat("mrfReconciliator".replace(/([A-Z])/g, (r=>"-".concat(r.toLowerCase()))), "]")
      , W = {}
      , $ = !1
      , rr = (r,e)=>{
        if ((r=>void 0 !== r.isConnected ? r.isConnected : !(r.ownerDocument && r.ownerDocument.compareDocumentPosition(r) & r.DOCUMENT_POSITION_DISCONNECTED))(r) && e instanceof HTMLElement) {
            var t = (r=>(r=>!!r.dataset.mrfReconciliator)(r) ? [r] : Array.from(r.querySelectorAll(Q)))(e)
              , n = t.map((r=>r.dataset.mrfReconciliator)).map((r=>W[r]));
            n.forEach((r=>{
                var {cleanup: e} = r;
                return e()
            }
            )),
            n.forEach((r=>{
                var {reconciliate: e} = r;
                return e()
            }
            ))
        }
    }
      , er = ()=>{
        if (!$) {
            var r = Node.prototype.removeChild
              , e = Node.prototype.replaceChild;
            Node.prototype.removeChild = function(e) {
                var t = r.call(this, e);
                try {
                    rr(this, e)
                } catch (r) {}
                return t
            }
            ,
            Node.prototype.replaceChild = function(r, t) {
                var n = e.call(this, r, t);
                try {
                    rr(this, t)
                } catch (r) {}
                return n
            }
            ,
            $ = !0
        }
    }
      , tr = new class {
        constructor() {
            this.debounces = {},
            this.throttles = {}
        }
        debounce(r, e) {
            var t, n, a = arguments.length > 2 && void 0 !== arguments[2] ? arguments[2] : K;
            return null !== (t = (n = this.debounces)[r]) && void 0 !== t ? t : n[r] = function(r) {
                var e, t = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : K;
                return function() {
                    for (var n = arguments.length, a = new Array(n), o = 0; o < n; o++)
                        a[o] = arguments[o];
                    window.clearTimeout(e),
                    e = window.setTimeout((()=>r(...a)), t)
                }
            }(e, a)
        }
        throttle(r, e) {
            var t, n, a = arguments.length > 2 && void 0 !== arguments[2] ? arguments[2] : K;
            return null !== (t = (n = this.throttles)[r]) && void 0 !== t ? t : n[r] = function(r) {
                var e, t = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : K;
                return function() {
                    void 0 === e && (e = window.setTimeout((()=>e = void 0), t),
                    r(...arguments))
                }
            }(e, a)
        }
    }
      , nr = (r,e)=>e.map((e=>e(r)))
      , ar = (r,e,t)=>{
        var n = [];
        for (var a of r.headlines)
            !(null == t ? void 0 : t.has(a.id)) && n.push([a, ...nr(a, e)]);
        return n
    }
      , or = r=>{
        var t = new Set
          , a = r=>{
            if ("FINISHED" !== r.status || r.applyChangesOnFinish) {
                var [o,i] = nr(r, [s, Z]);
                o && t.add(r.id),
                i.forEach((t=>{
                    ((r,t)=>{
                        ((r,t)=>{
                            er();
                            var n = r.dataset.mrfReconciliator;
                            n && (W[n].cleanup(),
                            delete W[n]);
                            var a = n || "".concat(Math.floor(Math.random() * Date.now()));
                            r.dataset.mrfReconciliator = a;
                            var o = ((r,t)=>{
                                var {disconnect: n} = e((()=>t()), {
                                    childList: !0,
                                    attributes: !0,
                                    target: r,
                                    characterData: !0
                                });
                                return n
                            }
                            )(r, t);
                            W[a] = {
                                cleanup() {
                                    o()
                                },
                                reconciliate() {
                                    t()
                                }
                            }
                        }
                        )(r, t)
                    }
                    )(t, tr.debounce(r.id, (()=>{
                        n("reconciliation", "running experiment ".concat(r.id)),
                        a(r)
                    }
                    )))
                }
                ))
            } else {
                var [l] = nr(r, [s]);
                l && t.add(r.id)
            }
        }
        ;
        ar(r, [a], t),
        e(tr.throttle("observer", (()=>{
            ar(r, [a], t),
            ar(r, [s])
        }
        )), {
            subtree: !0,
            attributes: !0,
            attributeFilter: m,
            childList: !0
        }),
        G(!0)
    }
    ;
    function ir(r, e, t, n, a, o, i) {
        try {
            var l = r[o](i)
              , c = l.value
        } catch (r) {
            return void t(r)
        }
        l.done ? e(c) : Promise.resolve(c).then(n, a)
    }
    var lr = function() {
        var r, e = (r = function*() {
            var r = yield(()=>{
                var r = a();
                return r ? Promise.resolve(r) : c()
            }
            )();
            n("configuration", r),
            r ? or(r) : G(!1)
        }
        ,
        function() {
            var e = this
              , t = arguments;
            return new Promise((function(n, a) {
                var o = r.apply(e, t);
                function i(r) {
                    ir(o, n, a, i, l, "next", r)
                }
                function l(r) {
                    ir(o, n, a, i, l, "throw", r)
                }
                i(void 0)
            }
            ))
        }
        );
        return function() {
            return e.apply(this, arguments)
        }
    }();
    "interactive" === document.readyState || "complete" === document.readyState ? lr() : window.addEventListener("DOMContentLoaded", (()=>{
        lr()
    }
    ))
}
)();
function e(e, r) {
    var t = Object.keys(e);
    if (Object.getOwnPropertySymbols) {
        var n = Object.getOwnPropertySymbols(e);
        r && (n = n.filter((function(r) {
            return Object.getOwnPropertyDescriptor(e, r).enumerable
        }
        ))),
        t.push.apply(t, n)
    }
    return t
}
function r(r) {
    for (var t = 1; t < arguments.length; t++) {
        var n = null != arguments[t] ? arguments[t] : {};
        t % 2 ? e(Object(n), !0).forEach((function(e) {
            i(r, e, n[e])
        }
        )) : Object.getOwnPropertyDescriptors ? Object.defineProperties(r, Object.getOwnPropertyDescriptors(n)) : e(Object(n)).forEach((function(e) {
            Object.defineProperty(r, e, Object.getOwnPropertyDescriptor(n, e))
        }
        ))
    }
    return r
}
function t(e, r, t, n, i, o, a) {
    try {
        var u = e[o](a)
          , c = u.value
    } catch (e) {
        return void t(e)
    }
    u.done ? r(c) : Promise.resolve(c).then(n, i)
}
function n(e) {
    return function() {
        var r = this
          , n = arguments;
        return new Promise((function(i, o) {
            var a = e.apply(r, n);
            function u(e) {
                t(a, i, o, u, c, "next", e)
            }
            function c(e) {
                t(a, i, o, u, c, "throw", e)
            }
            u(void 0)
        }
        ))
    }
}
function i(e, r, t) {
    return (r = function(e) {
        var r = function(e, r) {
            if ("object" != typeof e || null === e)
                return e;
            var t = e[Symbol.toPrimitive];
            if (void 0 !== t) {
                var n = t.call(e, r || "default");
                if ("object" != typeof n)
                    return n;
                throw new TypeError("@@toPrimitive must return a primitive value.")
            }
            return ("string" === r ? String : Number)(e)
        }(e, "string");
        return "symbol" == typeof r ? r : String(r)
    }(r))in e ? Object.defineProperty(e, r, {
        value: t,
        enumerable: !0,
        configurable: !0,
        writable: !0
    }) : e[r] = t,
    e
}
var o;
function a(e, r, t, n, i, o, a) {
    try {
        var u = e[o](a)
          , c = u.value
    } catch (e) {
        return void t(e)
    }
    u.done ? r(c) : Promise.resolve(c).then(n, i)
}
function u(e) {
    return function() {
        var r = this
          , t = arguments;
        return new Promise((function(n, i) {
            var o = e.apply(r, t);
            function u(e) {
                a(o, n, i, u, c, "next", e)
            }
            function c(e) {
                a(o, n, i, u, c, "throw", e)
            }
            u(void 0)
        }
        ))
    }
}
function c() {
    var e, r;
    return window.marfeel = null !== (e = window.marfeel) && void 0 !== e ? e : {},
    window.marfeel.cmd = null !== (r = window.marfeel.cmd) && void 0 !== r ? r : [],
    window.marfeel.cmd
}
!function(e) {
    e.HEADLINE_AB = "HeadlineAB"
}(o || (o = {}));
var l = "marfeel-sdk-store";
function f(e) {
    return e.update = Date.now(),
    r = l,
    t = btoa(JSON.stringify(e)),
    new Promise((e=>{
        c().push(["consent", n=>{
            try {
                if (n.getConsent("cookies"))
                    return window.localStorage.setItem(r, t),
                    e(!0)
            } catch (e) {}
            return e(!1)
        }
        ])
    }
    ));
    var r, t
}
function s() {
    return p.apply(this, arguments)
}
function p() {
    return (p = u((function*() {
        var e, r, t = yield(e = l,
        new Promise((r=>{
            c().push(["consent", t=>{
                try {
                    if (t.getConsent("cookies"))
                        return r(window.localStorage.getItem(e))
                } catch (e) {}
                return r(null)
            }
            ])
        }
        )));
        return t ? JSON.parse(atob(t)) : (f(r = {
            creation: Date.now(),
            update: Date.now(),
            entries: {}
        }),
        r)
    }
    ))).apply(this, arguments)
}
function d(e) {
    return y.apply(this, arguments)
}
function y() {
    return (y = u((function*(e) {
        return (yield s()).entries[e]
    }
    ))).apply(this, arguments)
}
function v() {
    return (v = u((function*(e, r) {
        var t = yield s();
        return t.entries[e] = r,
        f(t)
    }
    ))).apply(this, arguments)
}
function m(e) {
    return function(e) {
        return document.querySelector('script[data-mrf-script="'.concat(e, '"]'))
    }(e) || function(e) {
        var r = document.createElement("script");
        return r.setAttribute("type", "application/json"),
        r.dataset.mrfScript = e,
        document.head.appendChild(r)
    }(e)
}
function h(e) {
    return e && "object" == typeof e
}
function w(e, r) {
    return h(e) && h(r) ? (Object.keys(r).forEach((t=>{
        var n = e[t]
          , i = r[t];
        Array.isArray(n) && Array.isArray(i) ? e[t] = n.concat(i) : h(n) && h(i) ? e[t] = w(Object.assign({}, n), i) : e[t] = i
    }
    )),
    e) : r
}
function b() {
    for (var e = arguments.length, r = new Array(e), t = 0; t < e; t++)
        r[t] = arguments[t];
    return r.reduce(((e,r)=>w(e, r)), {})
}
var g = "croupier-experimentation-entry"
  , O = {
    percent: function() {
        var e = n((function*(e) {
            var r = Math.random();
            for (var t of e)
                if ((r -= t.strategy.value) <= 0)
                    return t;
            return e[e.length - 1]
        }
        ));
        return function(r) {
            return e.apply(this, arguments)
        }
    }()
}
  , P = function() {
    var e = n((function*(e, t) {
        if (Array.isArray(t) && 0 !== t.length) {
            var n = (yield d(g)) || {};
            if (n[e])
                return t.find((r=>r.id === n[e]));
            if (!t.some((e=>!e.strategy))) {
                var i = t[0].strategy
                  , o = O[i.type]
                  , a = yield o(t);
                return yield function(e, r) {
                    return v.apply(this, arguments)
                }(g, r(r({}, (yield d(g)) || {}), {}, {
                    [e]: a.id
                })),
                a
            }
        }
    }
    ));
    return function(r, t) {
        return e.apply(this, arguments)
    }
}()
  , j = (e,r)=>{
    window.marfeel = window.marfeel || {},
    window.marfeel.cmd = window.marfeel.cmd || [],
    window.marfeel.cmd.push(["synchronizer", t=>{
        t.resolve(e, r)
    }
    ])
}
  , E = ()=>{
    j("experimentationFailed")
}
  , A = function() {
    var e = n((function*() {
        if (window.location.search.includes("activate-overlay=true"))
            return !0;
        var e = yield d("compass-overlay");
        return !(null == e || !e.active)
    }
    ));
    return function() {
        return e.apply(this, arguments)
    }
}()
  , S = function() {
    var e = n((function*(e) {
        return "FINISHED" === e.status ? e.variants.sort(((e,r)=>{
            var t, n;
            return ((null === (t = r.result) || void 0 === t ? void 0 : t.ctr) || 0) - ((null === (n = e.result) || void 0 === n ? void 0 : n.ctr) || 0)
        }
        ))[0] : P(e.id || "", e.variants)
    }
    ));
    return function(r) {
        return e.apply(this, arguments)
    }
}()
  , D = function() {
    var e = n((function*(e) {
        var r, t = yield Promise.all(e.map(function() {
            var e = n((function*(e) {
                var r = yield S(e);
                return r ? b({
                    id: r.id,
                    status: e.status,
                    applyChangesOnFinish: !!e.applyChangesOnFinish
                }, e.detail, r.detail || {}) : {}
            }
            ));
            return function(r) {
                return e.apply(this, arguments)
            }
        }())), i = {
            headlines: t.filter((e=>{
                return r = e,
                !(0 === Object.keys(r).length);
                var r
            }
            ))
        };
        0 === i.headlines.length || (yield A()) ? j("headline", !1) : (r = i,
        m("experimentation-headlineab").innerHTML = JSON.stringify(r))
    }
    ));
    return function(r) {
        return e.apply(this, arguments)
    }
}()
  , x = {
    [o.HEADLINE_AB]: D
}
  , N = function() {
    var e = n((function*(e) {
        var t, n = e.reduce(((e,t)=>r(r({}, e), {}, {
            [t.experimentType]: [...e[t.experimentType] || [], t]
        })), {});
        t = e.length > 0,
        j("experimentation", t),
        yield Promise.all(Object.values(o).map((e=>(e=>x[e])(e)(n[e] || []))))
    }
    ));
    return function(r) {
        return e.apply(this, arguments)
    }
}();
!function() {
    try {
        N([{
            "id": "64e78d9bbc111131ff88d578",
            "createdDate": "2023-08-24T17:04:27.166Z",
            "lastModifiedDate": "2023-08-24T17:14:19.635Z",
            "experimentType": "HeadlineAB",
            "siteId": 2298,
            "experienceId": "AC_r0jYFWSkRnqQC8EIkzviDA",
            "status": "FINISHED",
            "endTime": "2023-08-24T17:14:19.635Z",
            "detail": {
                "target": {
                    "anchor": {
                        "href": "https://www.elmundo.es/espana/2023/08/24/64e773fcfc6c83a0638b45c8.html",
                        "xpath": "/html/body/main/div[13]/div/div/div/div/div[2]/div[1]/div[2]/div[1]/article/div/div/header/a",
                        "text": "La ola de calor se despide este viernes con un descenso \"brusco\" de temperaturas",
                        "textSelector": "h2:nth-of-type(1)"
                    }
                },
                "recirculationModule": {
                    "name": "ad_reports_other",
                    "index": 1,
                    "editorialId": "423099705",
                    "config": {
                        "lazy": true,
                        "layouts": [],
                        "modules": [{
                            "selector": "[data-b-name=\"headlines_a\"]",
                            "name": "headlines_a"
                        }, {
                            "selector": "[data-b-name=\"ad_news_a\"]",
                            "name": "ad_news_a"
                        }, {
                            "selector": "[data-b-name=\"flex_oro\"]",
                            "name": "flex_oro"
                        }, {
                            "selector": "[data-b-name=\"reports_prime\"]",
                            "name": "reports_prime"
                        }, {
                            "selector": "[data-b-name=\"ad_news_a_destacados\"]",
                            "name": "ad_news_a_destacados"
                        }, {
                            "selector": "[data-b-name=\"opinion\"]",
                            "name": "opinion"
                        }, {
                            "selector": "[data-b-name=\"mega_b\"]",
                            "name": "mega_b"
                        }, {
                            "selector": "[data-b-name=\"ad_reports_other\"]",
                            "name": "ad_reports_other"
                        }, {
                            "selector": "[data-b-name=\"ad_reports_b_vacaciones\"]",
                            "name": "ad_reports_b_vacaciones"
                        }, {
                            "selector": "[data-b-name=\"reports_prime_b\"]",
                            "name": "reports_prime_b"
                        }, {
                            "selector": "[data-b-name=\"flex_oro_b\"]",
                            "name": "flex_oro_b"
                        }, {
                            "selector": "[data-b-name=\"reports_prime_c\"]",
                            "name": "reports_prime_c"
                        }, {
                            "selector": "[data-b-name=\"ad_reports_b_b\"]",
                            "name": "ad_reports_b_b"
                        }, {
                            "selector": "[data-b-name=\"reports_prime_e\"]",
                            "name": "reports_prime_e"
                        }, {
                            "selector": "[data-b-name=\"row_botones\"]",
                            "name": "row_botones"
                        }, {
                            "selector": "[data-b-name=\"headlines_a\"]",
                            "name": "headlines_a"
                        }, {
                            "selector": "[data-b-name=\"ad_news_a\"]",
                            "name": "ad_news_a"
                        }, {
                            "selector": "[data-b-name=\"flex_oro\"]",
                            "name": "flex_oro"
                        }, {
                            "selector": "[data-b-name=\"reports_prime\"]",
                            "name": "reports_prime"
                        }, {
                            "selector": "[data-b-name=\"ad_news_a_destacados\"]",
                            "name": "ad_news_a_destacados"
                        }, {
                            "selector": "[data-b-name=\"opinion\"]",
                            "name": "opinion"
                        }, {
                            "selector": "[data-b-name=\"mega_b\"]",
                            "name": "mega_b"
                        }, {
                            "selector": "[data-b-name=\"ad_reports_other\"]",
                            "name": "ad_reports_other"
                        }, {
                            "selector": "[data-b-name=\"ad_reports_b_vacaciones\"]",
                            "name": "ad_reports_b_vacaciones"
                        }, {
                            "selector": "[data-b-name=\"reports_prime_b\"]",
                            "name": "reports_prime_b"
                        }, {
                            "selector": "[data-b-name=\"flex_oro_b\"]",
                            "name": "flex_oro_b"
                        }, {
                            "selector": "[data-b-name=\"reports_prime_c\"]",
                            "name": "reports_prime_c"
                        }, {
                            "selector": "[data-b-name=\"ad_reports_b_b\"]",
                            "name": "ad_reports_b_b"
                        }, {
                            "selector": "[data-b-name=\"reports_prime_e\"]",
                            "name": "reports_prime_e"
                        }, {
                            "selector": "[data-b-name=\"row_botones\"]",
                            "name": "row_botones"
                        }, {
                            "name": "Links Párrafos",
                            "selector": ".ue-l-article__body p"
                        }, {
                            "name": "Noticias relacionadas final",
                            "selector": ".ue-c-article__related-news"
                        }, {
                            "name": "BT Noticias",
                            "selector": ".ue-c-cover-content--is-bt-module"
                        }, {
                            "name": "Taboola in body",
                            "selector": ".ue-c-article__taboola-in-body"
                        }, {
                            "name": "Taboola Below Article Thumbnails",
                            "selector": "[data-placement-name='Below Article Thumbnails']"
                        }, {
                            "name": "Tags artículos",
                            "selector": ".ue-c-article__tags"
                        }, {
                            "name": "Autor",
                            "selector": ".ue-c-article__byline"
                        }, {
                            "name": "Contenido Relacionado",
                            "selector": ".ue-c-article__subtitles"
                        }],
                        "blacklist": [{
                            "selector": "[href*='/autor/']"
                        }],
                        "redirectionLinks": []
                    }
                }
            },
            "variants": [{
                "id": "664c0142-7418-4671-99d4-eed8769db2e1",
                "strategy": {
                    "type": "percent",
                    "value": 0.5
                },
                "detail": {
                    "replacements": {}
                },
                "result": {
                    "type": "HeadlineAB",
                    "impressions": 1597,
                    "clicks": 23,
                    "ctr": 0.014402004
                }
            }, {
                "id": "66a6da6a-4295-4fd6-9b08-7562b2892f51",
                "strategy": {
                    "type": "percent",
                    "value": 0.5
                },
                "detail": {
                    "replacements": {
                        "title": {
                            "text": "Este miércoles fue el día más caluroso de todo el verano"
                        }
                    }
                },
                "result": {
                    "type": "HeadlineAB",
                    "impressions": 1514,
                    "clicks": 11,
                    "ctr": 0.0072655217
                }
            }],
            "winner": "664c0142-7418-4671-99d4-eed8769db2e1",
            "applyChangesOnFinish": true
        }])
    } catch (e) {
        E()
    }
}();


/*! For license information please see mobile.min.js.LICENSE.txt */
(()=>{
    var __webpack_modules__ = {
        237: e=>{
            e.exports = {
                dateCoolTranslations: {
                    months: ["Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio", "Julio", "Agosto", "Septiembre", "Octubre", "Noviembre", "Diciembre"],
                    texts: {
                        60: {
                            text: "Hace menos de 1 minuto",
                            resume: "Ahora mismo"
                        },
                        3540: {
                            text: "Hace $value min",
                            resume: "$value min",
                            division: 60
                        },
                        7140: {
                            text: "Hace $value hora",
                            resume: "$value hora",
                            division: 3600
                        },
                        86400: {
                            text: "Hace $value horas",
                            resume: "$value horas",
                            division: 3600
                        },
                        129600: {
                            text: "Hace $value d&iacutea",
                            resume: "$value d&iacutea",
                            division: 86400
                        },
                        2592e3: {
                            text: "Hace $value d&iacuteas",
                            resume: "$value d&iacuteas",
                            division: 86400
                        }
                    },
                    defaultText: {
                        text: "$day $month $year",
                        resume: "$day $month $year"
                    }
                },
                noticeSticky: {
                    url: "https://e00-elmundo.uecdn.es/json/bt/v1/marca_expansion.json",
                    portal: "elmundo",
                    position: 0,
                    heightNotice: 1700,
                    cid: "BTNOT01"
                }
            }
        }
        ,
        521: ()=>{
            !function(e) {
                var t, n = null, i = null, o = !1, r = null, s = "suscriptor", a = [], l = [], c = {
                    "www.elmundo.es": {
                        cookie: "REGMUNDO",
                        pid: "5"
                    },
                    "www.marca.com": {
                        cookie: "REGMARCA"
                    },
                    "co.marca.com": {
                        cookie: "REGMARCACOLOMBIA"
                    },
                    "us.marca.com": {
                        cookie: "REGMARCAUSA"
                    },
                    "ar.marca.com": {
                        cookie: "REGMARCAARGENTINA"
                    },
                    "www.telva.com": {
                        cookie: "REGTELVA"
                    },
                    "www.expansion.com": {
                        cookie: "expansionID",
                        pid: "9"
                    },
                    "lab.elmundo.es": {
                        cookie: "REGMUNDO",
                        pid: "5"
                    }
                }[e.location.hostname], d = function() {
                    return new Promise((function(e, t) {
                        u().then((function(t) {
                            var i = t;
                            return i.isLogged = n.isLogged,
                            i.uid = n.uid,
                            e(i),
                            i
                        }
                        )).catch(t)
                    }
                    ))
                }, u = function() {
                    return new Promise((function(t, n) {
                        e._apw && _apw.modules && _apw.modules.subscribers_ac && "function" == typeof _apw.modules.subscribers_ac.load ? (l.push(t),
                        h("@ue-loginpremium-getapw", 50, (function() {
                            _apw.modules.subscribers_ac.load((function(e) {
                                var t = e.get().allowed
                                  , n = Object.keys(t).map((function(e) {
                                    return t[e].pids || []
                                }
                                )).reduce((function(e, t) {
                                    return e.concat(t)
                                }
                                ), [])
                                  , i = n.filter((function(e) {
                                    return /^\d*$/gim.test("string" == typeof e ? e : String(e))
                                }
                                ))
                                  , o = c.pid && i.some((function(e) {
                                    return e === c.pid
                                }
                                ))
                                  , r = i.map((function(e) {
                                    return parseInt(e)
                                }
                                ))
                                  , s = l;
                                l = [],
                                s.forEach((function(e) {
                                    e({
                                        isPremium: o,
                                        subscriptionPortals: r,
                                        pids: n
                                    })
                                }
                                ))
                            }
                            ))
                        }
                        ))) : (console.warn("_apw is not ready."),
                        t({
                            isPremium: void 0,
                            subscriptionPortals: void 0,
                            pids: void 0
                        }))
                    }
                    ))
                }, _ = function() {
                    if (!c || !c.cookie)
                        return {};
                    var e, t, n = new RegExp("[0-9a-zA-Z]+-(?:[a-zA-Z0-9+/]{4})*(?:|(?:[a-zA-Z0-9+/]{3}=)|(?:[a-zA-Z0-9+/]{2}==)|(?:[a-zA-Z0-9+/]{1}===))$"), i = (e = c.cookie,
                    (t = document.cookie.match("(^|;) ?" + e + "=([^;]*)(;|$)")) ? t[2] : null);
                    if (n.test(unescape(i))) {
                        var o = new RegExp("^([0-9a-zA-Z]+)-").exec(i);
                        return {
                            isLogged: !0,
                            uid: o instanceof Array ? String(parseInt("0x" + o[1])) : void 0
                        }
                    }
                    return {
                        isLogged: !1
                    }
                }, h = function(e, t, n, i) {
                    a[e] && (clearTimeout(a[e]),
                    a[e] = null),
                    "function" == typeof n && (a[e] = setTimeout((function() {
                        i ? n.apply(i) : n(),
                        a[e] = null
                    }
                    ), t))
                }, p = function() {
                    return new Promise((function(t, r) {
                        if (i)
                            t(i);
                        else if (c) {
                            if ((n = _()).isLogged)
                                return e._apw || o || "loading" !== document.readyState ? void d().then(t) : (o = !0,
                                void e.addEventListener("DOMContentLoaded", (function() {
                                    d().then(t)
                                }
                                )));
                            t({
                                isLogged: !1
                            })
                        } else
                            t(void 0)
                    }
                    )).then((function(e) {
                        return f(e),
                        m(e),
                        e
                    }
                    )).catch(console.error)
                }, f = function(e) {
                    r || (i = e,
                    r = setTimeout((function() {
                        r && (r = null),
                        i = null
                    }
                    ), 3e4))
                }, m = function(t) {
                    if (t) {
                        var n = function() {
                            var t = void 0;
                            if (e.sessionStorage) {
                                var n = sessionStorage.getItem(s) || "{}";
                                try {
                                    t = JSON.parse(n)
                                } catch (e) {
                                    console.error(e)
                                }
                            }
                            return t
                        }();
                        n && JSON.stringify(t) !== JSON.stringify(n) && function(t) {
                            if (e.sessionStorage) {
                                var n = {};
                                for (var i in t)
                                    ("boolean" == typeof t[i] || t[i]) && (n[i] = t[i]);
                                sessionStorage.setItem(s, JSON.stringify(n))
                            }
                        }(t)
                    } else
                        sessionStorage && sessionStorage.getItem(s) && sessionStorage.removeItem(s)
                };
                p(),
                e.ueLoginPremium = {
                    isLogged: function() {
                        return _().isLogged
                    },
                    getIfPremium: function() {
                        return p().then((function(e) {
                            return e && e.isPremium || void 0
                        }
                        ))
                    },
                    getPids: function() {
                        return p().then((function(e) {
                            return e && e.pids || void 0
                        }
                        ))
                    },
                    getSubscription: function() {
                        return p().then((function(e) {
                            return e && e.subscriptionPortals || void 0
                        }
                        ))
                    },
                    getUid: function() {
                        return p().then((function(e) {
                            return e && e.uid || void 0
                        }
                        ))
                    },
                    update: p
                },
                t = new CustomEvent("ue-loginpremium-ready",{
                    detail: {}
                }),
                document.dispatchEvent(t),
                e.ueLoginPremium
            }(window)
        }
        ,
        966: ()=>{
            !function(e) {
                var t = {};
                function n(i) {
                    if (t[i])
                        return t[i].exports;
                    var o = t[i] = {
                        i,
                        l: !1,
                        exports: {}
                    };
                    return e[i].call(o.exports, o, o.exports, n),
                    o.l = !0,
                    o.exports
                }
                n.m = e,
                n.c = t,
                n.d = function(e, t, i) {
                    n.o(e, t) || Object.defineProperty(e, t, {
                        enumerable: !0,
                        get: i
                    })
                }
                ,
                n.r = function(e) {
                    "undefined" != typeof Symbol && Symbol.toStringTag && Object.defineProperty(e, Symbol.toStringTag, {
                        value: "Module"
                    }),
                    Object.defineProperty(e, "__esModule", {
                        value: !0
                    })
                }
                ,
                n.t = function(e, t) {
                    if (1 & t && (e = n(e)),
                    8 & t)
                        return e;
                    if (4 & t && "object" == typeof e && e && e.__esModule)
                        return e;
                    var i = Object.create(null);
                    if (n.r(i),
                    Object.defineProperty(i, "default", {
                        enumerable: !0,
                        value: e
                    }),
                    2 & t && "string" != typeof e)
                        for (var o in e)
                            n.d(i, o, function(t) {
                                return e[t]
                            }
                            .bind(null, o));
                    return i
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
                n.p = "",
                n(n.s = "./src/app.js")
            }({
                "./config/config.json": function(module) {
                    eval('module.exports = JSON.parse("{\\"bottonMenuId\\":\\"ID-REF3-BUTTON\\",\\"bottonMenuTopId\\":\\"ID-REF2-BUTTON\\",\\"maskBurgerId\\":\\"mask-ID-REF2\\",\\"maskBurgerTopId\\":\\"mask-ID-REF3\\",\\"panelMask\\":\\".js-panel-mask\\",\\"skipLink\\":\\"skip-link-principal\\",\\"skipLinkFirst\\":\\"skip-link-first\\",\\"logoThemeTop\\":\\".ue-c-main-header__logo--theme\\",\\"logoThemeBottom\\":\\".js-logo-theme\\",\\"navigationLink\\":\\".js-navigation-link\\",\\"navigationLinkDropdown\\":\\".js-navigation-link-dropdown\\",\\"sidePanel\\":\\".ue-l-side-panel\\",\\"logoSmallBottom\\":\\".js-logo-small-bottom\\",\\"headerTop\\":\\".js-header-top\\",\\"headerTitle\\":\\".js-header-title\\",\\"headerTabs\\":\\".js-header-tabs\\",\\"headerToolsTop\\":\\".js-header-tools-top\\",\\"subscriptionButton\\":\\".ue-c-main-header__subscription\\",\\"loginButton\\":\\".ue-c-main-header__login\\",\\"headerSocialTools\\":\\".js-header-social-tools\\",\\"headerNav\\":\\".js-header-nav\\",\\"headerNavTop\\":\\".js-header-nav-top\\",\\"headerLogo\\":\\".js-header-logo\\",\\"headerLogoSmall\\":\\".js-header-logo-small\\",\\"headerBottom\\":\\".js-header__bottom\\",\\"headerBottomClass\\":\\"js-header__bottom\\",\\"navPanelId\\":\\"ID-REF3\\",\\"progressBar\\":\\".js-progreess-bar\\",\\"jsSocialTools\\":\\".js-social-tools\\",\\"jsSpanTheme\\":\\"js-span-theme\\",\\"jsMiga\\":\\".js-miga\\",\\"headerEnergize\\":\\".js-header-energize\\",\\"jsListSecondLevel\\":\\".js-list-second-level\\",\\"jsListFirstLevel\\":\\".js-list-first-level\\",\\"jsDropdownIcon\\":\\".ue-c-main-navigation__link-dropdown-icon\\",\\"jsMainHeaderArticle\\":\\"ue-c-main-header__title-article\\",\\"jsHeaderTabs\\":\\".js-header-tabs\\",\\"jsBreadcrumbLink\\":\\"js-breadcrumb-link\\",\\"defaultThemes\\":[\\"default\\",\\"elmundo-theme\\",\\"elmundousa-theme\\"]}");\n\n//# sourceURL=webpack:///./config/config.json?')
                },
                "./lib/app.js": function(module, __webpack_exports__, __webpack_require__) {
                    "use strict";
                    eval('__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "add", function() { return add; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "get", function() { return get; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Model", function() { return Model; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "View", function() { return View; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Controller", function() { return Controller; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "setNode", function() { return setNode; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "getNode", function() { return getNode; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "slugify", function() { return slugify; });\n/* harmony import */ var _config_config_json__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../config/config.json */ "./config/config.json");\nvar _config_config_json__WEBPACK_IMPORTED_MODULE_0___namespace = /*#__PURE__*/__webpack_require__.t(/*! ../config/config.json */ "./config/config.json", 1);\n\n\nfunction _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }\n\nfunction _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }\n\nfunction _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }\n\nfunction _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }\n\n\nvar currView, currModel;\nvar modules = [];\nfunction add(moduleName, M, V, C, dataNC) {\n  var view = currView = new V();\n  var model = currModel = new M();\n  var controller = new C();\n\n  if (dataNC != undefined) {\n    controller.reloadManager(dataNC);\n  }\n\n  model.init();\n  return modules[moduleName] = {\n    model: model,\n    view: view,\n    controller: controller\n  };\n}\nfunction get(moduleName) {\n  return modules[moduleName];\n}\n/*\n  Model\n*/\n\nvar Model =\n/*#__PURE__*/\nfunction () {\n  function Model() {\n    _classCallCheck(this, Model);\n\n    this.tree = {};\n    this.callbacks = {\n      setPre: [],\n      setPost: [],\n      change: []\n    };\n  }\n\n  _createClass(Model, [{\n    key: "init",\n    value: function init() {\n      for (var p in this.callbacks) {\n        if (this.callbacks.hasOwnProperty(p)) {\n          this.runCallbacks(p);\n        }\n      }\n    }\n  }, {\n    key: "setPre",\n    value: function setPre(props) {\n      var callbacks = this.callbacks["setPre"];\n      var i = callbacks.length;\n\n      while (i--) {\n        props = callbacks[i].call(this, props);\n      }\n\n      return props;\n    }\n  }, {\n    key: "setPost",\n    value: function setPost(props) {\n      this.runCallbacks("setPost");\n    }\n  }, {\n    key: "change",\n    value: function change() {\n      this.runCallbacks("change");\n    }\n  }, {\n    key: "set",\n    value: function set(propsOrPath, value) {\n      var changeEvent;\n\n      if (isObject(propsOrPath)) {\n        var props = this.setPre(merge({}, propsOrPath));\n        merge(this.tree, props, function (isChanged) {\n          return changeEvent = isChanged;\n        });\n      } else {\n        var path = propsOrPath;\n        value = this.setPre(_defineProperty({}, path, value))[path];\n        changeEvent = setNode(this.tree, path, value);\n      }\n\n      if (changeEvent) {\n        this.change();\n      }\n\n      this.setPost();\n      return this;\n    }\n  }, {\n    key: "get",\n    value: function get(path) {\n      return getNode(this.tree, path);\n    }\n  }, {\n    key: "runCallbacks",\n    value: function runCallbacks(label) {\n      var callbacks = this.callbacks[label];\n      var i = callbacks.length;\n\n      while (i--) {\n        callbacks[i].call(this, this.tree);\n      }\n    }\n  }]);\n\n  return Model;\n}();\n/*\n  View\n*/\n\nvar View =\n/*#__PURE__*/\nfunction () {\n  function View() {\n    _classCallCheck(this, View);\n\n    this.config = _config_config_json__WEBPACK_IMPORTED_MODULE_0__;\n    ;\n  }\n\n  _createClass(View, [{\n    key: "get",\n    value: function get(selector) {\n      return this.el.querySelector(selector);\n    }\n  }, {\n    key: "getAll",\n    value: function getAll(selector) {\n      return this.el.querySelectorAll(selector);\n    }\n  }]);\n\n  return View;\n}();\n/*\n  Controller\n*/\n\nvar Controller = function Controller() {\n  _classCallCheck(this, Controller);\n\n  this.model = currModel;\n\n  if (currView) {\n    this.view = currView;\n  } else {\n    throw new Error(\'View.el required!\');\n  }\n\n  currModel = null;\n  currView = null;\n};\n/*\n  Utils\n*/\n\nfunction isObject(o) {\n  return o === Object(o) && !o.nodeType && !Array.isArray(o) && !(typeof o === \'function\') && !(o instanceof RegExp);\n}\n\nfunction isNumeric(val) {\n  return Number(parseFloat(val)) == val;\n}\n\nfunction setNode(tree, pathStr, value) {\n  var isChanged = false;\n  getNode(tree, pathStr, function (currNode, prop, nextProp) {\n    if (nextProp === undefined) {\n      var currVal = currNode[prop];\n\n      if (value !== currVal) {\n        currNode[prop] = value;\n        isChanged = true;\n      }\n    } else if (currNode[prop] === undefined) {\n      currNode[prop] = isNumeric(nextProp) ? [] : {};\n    }\n  });\n  return isChanged;\n}\nfunction getNode(tree, pathStr, eachCallback) {\n  var pathArr = pathStr.split(".");\n  var currNode = tree;\n\n  for (var i = 0, len = pathArr.length; i < len; i++) {\n    var prop = pathArr[i];\n\n    if (eachCallback) {\n      eachCallback(currNode, prop, pathArr[i + 1]);\n    }\n\n    if (currNode === undefined) break;else currNode = currNode[prop];\n  }\n\n  return currNode;\n}\nfunction slugify(str) {\n  str = str.replace(/^\\s+|\\s+$/g, \'\'); // trim\n\n  str = str.toLowerCase(); // remove accents, swap ñ for n, etc\n\n  var from = "àáäâèéëêìíïîòóöôùúüûñç·/_,:;";\n  var to = "aaaaeeeeiiiioooouuuunc------";\n\n  for (var i = 0, l = from.length; i < l; i++) {\n    str = str.replace(new RegExp(from.charAt(i), \'g\'), to.charAt(i));\n  }\n\n  str = str.replace(/[^a-z0-9 -]/g, \'\') // remove invalid chars\n  .replace(/\\s+/g, \'-\') // collapse whitespace and replace by -\n  .replace(/-+/g, \'-\'); // collapse dashes\n\n  return str;\n}\n\n//# sourceURL=webpack:///./lib/app.js?')
                },
                "./modules/Model.js": function(module, __webpack_exports__, __webpack_require__) {
                    "use strict";
                    eval('__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return _default; });\n/* harmony import */ var _lib_app__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../lib/app */ "./lib/app.js");\nfunction _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }\n\nfunction _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }\n\nfunction _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }\n\nfunction _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }\n\nfunction _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }\n\nfunction _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn\'t been initialised - super() hasn\'t been called"); } return self; }\n\nfunction _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }\n\nfunction _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }\n\nfunction _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }\n\n\n"use strict";\n\nvar _default =\n/*#__PURE__*/\nfunction (_app$Model) {\n  _inherits(_default, _app$Model);\n\n  function _default() {\n    var _this;\n\n    _classCallCheck(this, _default);\n\n    _this = _possibleConstructorReturn(this, _getPrototypeOf(_default).call(this));\n\n    if (typeof navigationSection !== \'undefined\') {\n      var sections = navigationSection.split("/");\n\n      _this.set(\'sections\', sections);\n\n      for (var i = 0; i < sections.length; i++) {\n        //let sectionCapitalized =sections[i].replaceAll(/\\b\\w/g, l => l.toUpperCase()).replaceAll(\'-\',\' \').replaceAll(\'_\',\' \');\n        var sectionCapitalized = _this.replaceAll(sections[i], \'-\', \' \').toUpperCase();\n\n        sectionCapitalized = _this.replaceAll(sectionCapitalized, \'_\', \' \');\n        sections[i] = sectionCapitalized;\n      }\n    } else {\n      if (typeof portal !== \'undefined\') {\n        _this.set(\'sections\', portal);\n      }\n    }\n\n    return _this;\n  }\n\n  _createClass(_default, [{\n    key: "replaceAll",\n    value: function replaceAll(str, find, replace) {\n      return str.replace(new RegExp(find, \'g\'), replace);\n    }\n  }]);\n\n  return _default;\n}(_lib_app__WEBPACK_IMPORTED_MODULE_0__["Model"]);\n\n\n;\n\n//# sourceURL=webpack:///./modules/Model.js?')
                },
                "./modules/boot/Boot.js": function(module, __webpack_exports__, __webpack_require__) {
                    "use strict";
                    eval('__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return _default; });\nfunction _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }\n\nfunction _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }\n\nfunction _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }\n\n/*\n  Boot operations\n*/\nvar _default =\n/*#__PURE__*/\nfunction () {\n  function _default() {\n    _classCallCheck(this, _default);\n\n    return this.ready();\n  }\n\n  _createClass(_default, [{\n    key: "ready",\n    value: function ready() {\n      return new Promise(function (resolve, reject) {\n        document.addEventListener("DOMContentLoaded", function () {\n          resolve();\n        });\n      });\n    }\n  }]);\n\n  return _default;\n}();\n\n\n;\n\n//# sourceURL=webpack:///./modules/boot/Boot.js?')
                },
                "./modules/menu/Controller.js": function(module, __webpack_exports__, __webpack_require__) {
                    "use strict";
                    eval('__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return _default; });\n/* harmony import */ var _lib_app__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../lib/app */ "./lib/app.js");\nfunction _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }\n\nfunction _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }\n\nfunction _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }\n\nfunction _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }\n\nfunction _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }\n\nfunction _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn\'t been initialised - super() hasn\'t been called"); } return self; }\n\nfunction _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }\n\nfunction _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }\n\nfunction _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }\n\n\n"use strict";\n\nvar _default =\n/*#__PURE__*/\nfunction (_app$Controller) {\n  _inherits(_default, _app$Controller);\n\n  function _default() {\n    var _this2;\n\n    _classCallCheck(this, _default);\n\n    _this2 = _possibleConstructorReturn(this, _getPrototypeOf(_default).call(this));\n\n    _this2.view.init(_this2.model.get(\'sections\'));\n\n    return _this2;\n  }\n\n  _createClass(_default, [{\n    key: "init",\n    value: function init() {\n      var _this = this;\n\n      this._listener = function () {\n        _this.view.scrolling(this);\n      };\n\n      this.menuOpen = false;\n\n      if (this.view.buttonAccordion) {\n        this.view.buttonAccordion.addEventListener("click", function () {\n          try {\n            if (typeof envioSC !== "undefined" && !_this.menuOpen) {\n              envioSC(\'abrirmenudesplegable\');\n            }\n\n            if (typeof hj !== "undefined" && !_this.menuOpen) {\n              hj(\'trigger\', \'trigger_dimension_nav\');\n            }\n          } catch (e) {\n            console.log("Error: " + e);\n          } finally {\n            _this.view.accordionActive();\n\n            _this.view.slideToggle();\n\n            _this.menuOpen ? _this.menuOpen = false : _this.menuOpen = true;\n          }\n        });\n      }\n\n      if (this.view.maskArray) {\n        this.view.maskArray.map(function (mask) {\n          _this.view.hiddenMask(mask);\n        });\n        this.view.maskArray.forEach(function (mask) {\n          mask.addEventListener("click", function () {\n            if (_this.view.body.classList.contains(\'no-scroll\') || _this.view.navPanel && _this.view.navPanel.classList.contains(\'ue-l-side-panel--show\')) {\n              _this.view.slideToggle();\n\n              _this.menuOpen = false;\n            }\n          });\n        });\n      }\n\n      if (this.view.btnPanel) {\n        var _iteratorNormalCompletion = true;\n        var _didIteratorError = false;\n        var _iteratorError = undefined;\n\n        try {\n          for (var _iterator = this.view.btnPanel[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {\n            var btn = _step.value;\n            btn.addEventListener("click", function () {\n              _this.view.showPanel();\n            });\n          }\n        } catch (err) {\n          _didIteratorError = true;\n          _iteratorError = err;\n        } finally {\n          try {\n            if (!_iteratorNormalCompletion && _iterator["return"] != null) {\n              _iterator["return"]();\n            }\n          } finally {\n            if (_didIteratorError) {\n              throw _iteratorError;\n            }\n          }\n        }\n      }\n\n      window.addEventListener("scroll", this._listener); //window.addEventListener("scroll", this._listener, { capture: false, passive: true});\n\n      window.addEventListener(\'keydown\', function (e) {\n        if (_this.view.body.classList.contains(\'no-scroll\') || _this.view.navPanel && _this.view.navPanel.classList.contains(\'ue-l-side-panel--show\')) {\n          switch (e.keyCode) {\n            case 27:\n              _this.view.slideToggle();\n\n              break;\n\n            default:\n              return;\n          }\n        }\n      });\n    }\n  }, {\n    key: "clear",\n    value: function clear() {\n      window.removeEventListener("scroll", this._listener);\n    }\n  }]);\n\n  return _default;\n}(_lib_app__WEBPACK_IMPORTED_MODULE_0__["Controller"]);\n\n\n;\n\n//# sourceURL=webpack:///./modules/menu/Controller.js?')
                },
                "./modules/menu/MenuManager.js": function(module, __webpack_exports__, __webpack_require__) {
                    "use strict";
                    eval('__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return _default; });\n/* harmony import */ var _lib_app__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../lib/app */ "./lib/app.js");\n/* harmony import */ var _Model__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../Model */ "./modules/Model.js");\n/* harmony import */ var _View__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./View */ "./modules/menu/View.js");\n/* harmony import */ var _Controller__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./Controller */ "./modules/menu/Controller.js");\nfunction _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }\n\n\n\n\n\n"use strict";\n\nvar _default = function _default() {\n  _classCallCheck(this, _default);\n\n  return _lib_app__WEBPACK_IMPORTED_MODULE_0__["add"]("menu", _Model__WEBPACK_IMPORTED_MODULE_1__["default"], _View__WEBPACK_IMPORTED_MODULE_2__["default"], _Controller__WEBPACK_IMPORTED_MODULE_3__["default"]);\n};\n\n\n;\n\n//# sourceURL=webpack:///./modules/menu/MenuManager.js?')
                },
                "./modules/menu/View.js": function(module, __webpack_exports__, __webpack_require__) {
                    "use strict";
                    eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"default\", function() { return _default; });\n/* harmony import */ var _lib_app__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../lib/app */ \"./lib/app.js\");\nfunction _typeof(obj) { if (typeof Symbol === \"function\" && typeof Symbol.iterator === \"symbol\") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === \"function\" && obj.constructor === Symbol && obj !== Symbol.prototype ? \"symbol\" : typeof obj; }; } return _typeof(obj); }\n\nfunction _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError(\"Cannot call a class as a function\"); } }\n\nfunction _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if (\"value\" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }\n\nfunction _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }\n\nfunction _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === \"object\" || typeof call === \"function\")) { return call; } return _assertThisInitialized(self); }\n\nfunction _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError(\"this hasn't been initialised - super() hasn't been called\"); } return self; }\n\nfunction _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }\n\nfunction _inherits(subClass, superClass) { if (typeof superClass !== \"function\" && superClass !== null) { throw new TypeError(\"Super expression must either be null or a function\"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }\n\nfunction _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }\n\n\n\"use strict\";\n\nvar _default =\n/*#__PURE__*/\nfunction (_app$View) {\n  _inherits(_default, _app$View);\n\n  function _default() {\n    var _this;\n\n    _classCallCheck(this, _default);\n\n    _this = _possibleConstructorReturn(this, _getPrototypeOf(_default).call(this));\n    _this.links = document.querySelectorAll(_this.config.navigationLink) ? document.querySelectorAll(_this.config.navigationLink) : document.querySelectorAll('.ue-c-main-navigation__link');\n    _this.accordionDropdown = document.querySelectorAll(_this.config.navigationLinkDropdown) ? document.querySelectorAll(_this.config.navigationLinkDropdown) : document.querySelectorAll('.ue-c-main-navigation__link-dropdown');\n    _this.buttonAccordion = document.getElementById(_this.config.bottonMenuId); // HEADER VARS\n\n    _this.body = document.body;\n    _this.headerBottom = document.querySelector(_this.config.headerBottom); //¿Se usa?\n\n    _this.btnPanel = document.querySelectorAll('.ue-l-side-panel__button');\n    _this.sidePanel = document.querySelectorAll(_this.config.sidePanel);\n    _this.maskList = document.querySelectorAll(_this.config.panelMask);\n    _this.maskArray = Array.apply(null, _this.maskList);\n    /*  this.maskList = document.getElementById(this.config.maskBurgerId);\n      this.maskArray = Array.apply(null, this.maskList);*/\n\n    _this.progressBar = document.querySelector(_this.config.progressBar);\n    _this.logoThemeTop = document.querySelector(_this.config.logoThemeTop);\n    _this.logoThemeBottom = document.querySelector(_this.config.logoThemeBottom);\n    _this.navPanel = document.getElementById(_this.config.navPanelId); //SCROLL\n\n    _this.logo = document.querySelector(_this.config.headerLogo); //this.logoSmall = document.querySelector('.ue-c-main-header__logo--small');\n    //this.logoSmallTop = document.querySelector('.ue-c-main-header__primary .ue-c-main-header__logo--small');\n\n    _this.logoSmallTop = document.querySelector(_this.config.headerLogoSmall);\n    _this.logoSmallBottom = document.querySelector(_this.config.logoSmallBottom); //this.logoScroll = document.querySelector('.js-logo-small-bottom');\n\n    _this.headerTop = document.querySelector(_this.config.headerTop);\n    _this.headerTabs = document.querySelector(_this.config.headerTabs) ? document.querySelector(_this.config.headerTabs) : document.querySelector('.ue-c-main-header__tabs'); //this.headerTabs = document.querySelector(this.config.headerTabs);\n\n    _this.headerTitle = document.querySelector(_this.config.headerTitle);\n    _this.headerTools = document.querySelector(_this.config.headerToolsTop);\n    _this.subscriptionButton = document.querySelector(_this.config.subscriptionButton);\n    _this.loginButton = document.querySelector(_this.config.loginButton); //this.headerTools = document.querySelector(this.config.headerTools) ? document.querySelector(this.config.headerTools) : document.querySelector('.ue-c-main-header__tools');\n\n    _this.headerSocialTools = document.querySelector(_this.config.jsSocialTools); //this.headerMenuNav = document.querySelector(this.config.headerNav) ? document.querySelector(this.config.headerNav) : document.querySelector('.ue-c-main-header__nav');\n    // this.headerMenuNav = document.querySelector(this.config.headerNav);\n\n    _this.headerMenuNav = document.querySelector(_this.config.headerNavTop);\n    _this.header = document.body.querySelector(_this.config.headerEnergize);\n    _this.theme = _this.header && _this.header.dataset.theme ? _this.header.dataset.theme : 'default';\n    _this.layout = _this.header && _this.header.dataset.layout ? _this.header.dataset.layout : '';\n    _this.headerStyle = _this.header && _this.header.dataset.headerstyle ? _this.header.dataset.headerstyle : '';\n    _this.headerSize = _this.header && _this.header.dataset.headersize ? _this.header.dataset.headersize : '';\n    _this.themeBehaviour = 'default';\n\n    if (_this.header && !_this.config.defaultThemes.includes(_this.header.dataset.theme)) {\n      _this.themeBehaviour = 'channel';\n    }\n\n    if (document.getElementsByTagName(\"h1\") && _this.headerTitle && _this.headerTitle.innerHTML == '') {\n      if (document.getElementsByTagName(\"h1\")[0]) {\n        _this.headerTitle.innerHTML = document.getElementsByTagName(\"h1\")[0].innerHTML;\n\n        if (document.getElementsByTagName(\"h1\")[0].classList.contains('ue-c-article__headline')) {\n          _this.headerTitle.classList.add(_this.config.jsMainHeaderArticle);\n        }\n      }\n    }\n\n    _this.h1s = document.getElementsByTagName(\"h1\");\n\n    if (_this.headerTitle && (_this.headerTitle.dataset.indexView || _this.headerTitle.dataset.indexView === 0) && document.body.querySelector('[data-ue-navindex=\"' + _this.headerTitle.dataset.indexView + '\"]')) {\n      _this.currentH1 = document.body.querySelector('[data-ue-navindex=\"' + _this.headerTitle.dataset.indexView + '\"]').getElementsByTagName('h1')[0];\n    } else {\n      _this.currentH1 = document.getElementsByTagName(\"h1\")[0];\n    }\n\n    if (_this.currentH1.classList.contains('js_seccionPortadilla')) {\n      _this.currentH1 = 'sectionView';\n    }\n\n    _this.currentSection = 'PORTADA';\n\n    if (_this.layoutIsMinified() == true && _this.currentSection == 'PORTADA') {\n      if (typeof navigationSection !== 'undefined') {\n        var section = navigationSection.split('/').pop();\n        _this.currentSection = section.toUpperCase();\n      }\n    }\n\n    if (_this.layout && _this.logoThemeTop && _this.layout == 'minified' && _this.themeBehaviour == 'channel') {\n      _this.logo.classList.add('hide');\n\n      _this.logoThemeTop.classList.remove('hide');\n    }\n\n    return _this;\n  }\n\n  _createClass(_default, [{\n    key: \"elementInViewport\",\n    value: function elementInViewport(el) {\n      var top = el.getBoundingClientRect().top + window.pageYOffset;\n      var left = el.offsetLeft;\n      var width = el.offsetWidth;\n      var height = el.offsetHeight;\n\n      if (this.headerBottom) {\n        return top < window.pageYOffset + window.innerHeight && left < window.pageXOffset + window.innerWidth && top + height + this.headerBottom.offsetHeight > window.pageYOffset && left + width > window.pageXOffset;\n      } else {\n        return top < window.pageYOffset + window.innerHeight && left < window.pageXOffset + window.innerWidth && top + height > window.pageYOffset && left + width > window.pageXOffset;\n      }\n    }\n  }, {\n    key: \"init\",\n    value: function init(sections) {\n      this.accordionDropdown.forEach(function (el) {\n        // Close other elements in accordion if click in other element\n        //let siblingItems = el.closest('.ue-c-main-navigation__list').querySelectorAll('.ue-c-main-navigation__list');\n        function accordion() {\n          if (el.getAttribute('aria-expanded') == 'false') {\n            el.setAttribute('aria-expanded', true);\n            el.nextElementSibling.classList.remove('hide');\n            el.querySelector('.ue-c-main-navigation__link-dropdown-icon').classList.add('ue-c-main-navigation__link-dropdown-icon--open');\n          } else {\n            el.setAttribute('aria-expanded', false);\n            el.nextElementSibling.classList.add('hide');\n            el.querySelector('.ue-c-main-navigation__link-dropdown-icon').classList.remove('ue-c-main-navigation__link-dropdown-icon--open');\n          }\n        }\n\n        ;\n\n        el.onclick = function () {\n          accordion();\n        };\n\n        el.onkeydown = function (e) {\n          switch (e.keyCode) {\n            case 32: // Space key\n\n            case 13:\n              // Enter key\n              accordion();\n              e.preventDefault();\n              break;\n\n            default:\n              return;\n          }\n        };\n\n        el.nextElementSibling.lastElementChild.onkeydown = function (e) {\n          switch (e.keyCode) {\n            case 9:\n              // Tab key\n              el.focus();\n              return false;\n              break;\n          }\n        };\n      });\n      this.menu = document.querySelector(this.config.jsListFirstLevel);\n\n      if (this.menu) {\n        if (this.menu.children) {\n          var _iteratorNormalCompletion = true;\n          var _didIteratorError = false;\n          var _iteratorError = undefined;\n\n          try {\n            for (var _iterator = this.menu.children[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {\n              var item = _step.value;\n\n              if (item.children) {\n                if (item.children.length == 2) {\n                  if (item.children[1].children.length == 1) {\n                    if (item.children && item.children[1]) {\n                      if (item.children[1].children) {\n                        if (item.children[1].children.item(0).children) {\n                          item.children.item(0).parentElement.innerHTML = item.children[1].children.item(0).children.item(0).parentElement.innerHTML;\n                        }\n                      }\n                    }\n                  }\n                }\n              }\n            }\n          } catch (err) {\n            _didIteratorError = true;\n            _iteratorError = err;\n          } finally {\n            try {\n              if (!_iteratorNormalCompletion && _iterator[\"return\"] != null) {\n                _iterator[\"return\"]();\n              }\n            } finally {\n              if (_didIteratorError) {\n                throw _iteratorError;\n              }\n            }\n          }\n        }\n      } //Active Section\n\n\n      if (this.links) {\n        this.links = document.querySelectorAll(this.config.navigationLink) ? document.querySelectorAll(this.config.navigationLink) : document.querySelectorAll('.ue-c-main-navigation__link');\n        var migas = document.querySelector(this.config.jsMiga) && document.querySelector(this.config.jsMiga).parentElement ? document.querySelector(this.config.jsMiga).parentElement : null;\n\n        if (migas) {\n          if (migas.children) {\n            for (var i = 0; i < migas.children.length; i++) {\n              for (var j = 0; j < this.links.length; j++) {\n                if (this.links[j].getAttribute('data-energize-url') && navigationSection) {\n                  if (this.links[j].getAttribute('data-energize-url').match(\"/\".concat(navigationSection, \".html\"))) {\n                    this.links[j].classList.add('ue-c-main-navigation__link--is-active');\n                    this.links[j].setAttribute('aria-current', 'page');\n                    this.links[j].setAttribute('currentSection', 'true');\n                  }\n                }\n\n                if (this.links[j].getAttribute('data-energize-section')) {\n                  if (this.links[j].getAttribute('data-energize-section').trim() == _lib_app__WEBPACK_IMPORTED_MODULE_0__[\"slugify\"](migas.children[i].children[migas.children[i].children.length - 1].text.trim())) {\n                    if (_lib_app__WEBPACK_IMPORTED_MODULE_0__[\"slugify\"](migas.children[i].children[migas.children[i].children.length - 1].text.trim()) == _lib_app__WEBPACK_IMPORTED_MODULE_0__[\"slugify\"](sections[sections.length - 1].trim())) {\n                      this.currentSection = this.links[j].textContent;\n                    }\n\n                    this.currentSectionLinkText = migas.children[i].children[migas.children[i].children.length - 1].text;\n                    migas.children[i].children[migas.children[i].children.length - 1].text = this.links[j].textContent;\n\n                    if (this.links[j].getAttribute('data-energize-url')) {\n                      if (j == this.links.length - 1) {\n                        if (this.links[j].getAttribute('currentSection')) {\n                          migas.children[i].children[migas.children[i].children.length - 1].href = \"\".concat(this.links[j].getAttribute('data-energize-url'), \"?intcmp=MENUMIGA0\").concat(i + 1, \"&s_kw=\").concat(_lib_app__WEBPACK_IMPORTED_MODULE_0__[\"slugify\"](this.currentSectionLinkText.trim()));\n                        }\n                      } else {\n                        migas.children[i].children[migas.children[i].children.length - 1].href = \"\".concat(this.links[j].getAttribute('data-energize-url'), \"?intcmp=MENUMIGA0\").concat(i + 1, \"&s_kw=\").concat(_lib_app__WEBPACK_IMPORTED_MODULE_0__[\"slugify\"](this.currentSectionLinkText.trim()));\n                      }\n                    }\n                  }\n                }\n\n                if (document.getElementById('navigation-energize')) {\n                  var prettySection = document.getElementById('navigation-energize').getAttribute('data-ue-prettysection');\n\n                  if (prettySection != undefined) {\n                    prettySection = prettySection.replace(/\\\\/g, \"\");\n                    prettySection = prettySection.replace(/'/g, '\"');\n                    prettySection = JSON.parse(prettySection);\n\n                    if (prettySection[_lib_app__WEBPACK_IMPORTED_MODULE_0__[\"slugify\"](migas.children[i].children[migas.children[i].children.length - 1].text.trim())]) {\n                      migas.children[i].children[migas.children[i].children.length - 1].text = prettySection[_lib_app__WEBPACK_IMPORTED_MODULE_0__[\"slugify\"](migas.children[i].children[migas.children[i].children.length - 1].text.trim())];\n                    }\n                  }\n                }\n              }\n            }\n          }\n        }\n      }\n\n      this.accordionActive();\n\n      if (this.logoThemeTop && (!this.layout || this.layout != 'minified')) {\n        this.logoThemeTop.classList.add('hide');\n      }\n\n      if (this.logoSmallBottom) {\n        this.logoSmallBottom.classList.add('hide');\n      }\n      /*if(document.getElementsByClassName('ue-c-main-header__breadcrumb') && document.getElementsByClassName('ue-c-main-header__breadcrumb')[0] && \n      document.getElementsByClassName('ue-c-main-header__breadcrumb')[0].children){\n        this.migas = document.getElementsByClassName('ue-c-main-header__breadcrumb')[0].children;\n      }*/\n\n\n      if (document.querySelector(this.config.jsMiga) && document.querySelector(this.config.jsMiga).parentElement && document.querySelector(this.config.jsMiga).parentElement.children) {\n        this.migas = document.querySelector(this.config.jsMiga).parentElement.children;\n      }\n\n      if (this.themeBehaviour == 'channel' && this.currentH1 == 'sectionView') {\n        if (this.logoThemeTop && this.logoThemeTop.querySelector('.hidden-content')) {\n          this.logoThemeTop.querySelector('.hidden-content').textContent = 'Portada de Canal';\n        }\n\n        if (this.logoThemeBottom && this.logoThemeBottom.querySelector('.hidden-content')) {\n          this.logoThemeBottom.querySelector('.hidden-content').textContent = 'Portada de Canal';\n        }\n      } else {\n        if (this.logoThemeTop && this.currentH1 == 'sectionView' && this.logoThemeTop.querySelector('.hidden-content') && portal) {\n          this.logoThemeTop.querySelector('.hidden-content').textContent = 'Portada de ' + portal;\n        }\n\n        if (this.logoThemeBottom && this.currentH1 == 'sectionView' && this.logoThemeBottom.querySelector('.hidden-content') && portal) {\n          this.logoThemeBottom.querySelector('.hidden-content').textContent = 'Portada de ' + portal;\n          this.logoThemeBottom.classList.add('hide');\n        }\n      }\n    }\n  }, {\n    key: \"accordionActive\",\n    value: function accordionActive() {\n      this.resetAccordion();\n      this.activeItem = document.querySelector('.ue-c-main-navigation__link--is-active');\n\n      if (this.activeItem && this.activeItem.closest) {\n        this.firstLevel = this.activeItem.closest(this.config.jsListFirstLevel);\n        this.secondLevel = this.activeItem.closest(this.config.jsListSecondLevel);\n\n        if (this.activeItem.closest(this.config.sidePanel)) {\n          this.firstLevel.classList.remove('hide');\n\n          if (this.secondLevel) {\n            this.secondLevel.classList.remove('hide');\n            this.secondLevel.previousElementSibling.setAttribute('aria-expanded', true);\n            this.secondLevel.previousElementSibling.querySelector(this.config.jsDropdownIcon).classList.add('ue-c-main-navigation__link-dropdown-icon--open');\n            this.firstLevel.scrollIntoView();\n          }\n        }\n      }\n    }\n  }, {\n    key: \"resetAccordion\",\n    value: function resetAccordion() {\n      var secondLevels = document.querySelectorAll(this.config.jsListSecondLevel),\n          i;\n\n      for (i = 0; i < secondLevels.length; ++i) {\n        secondLevels[i].classList.add('hide');\n        secondLevels[i].previousElementSibling.setAttribute('aria-expanded', false);\n        secondLevels[i].previousElementSibling.querySelector(this.config.jsDropdownIcon).classList.remove('ue-c-main-navigation__link-dropdown-icon--open');\n      }\n    }\n  }, {\n    key: \"hiddenMask\",\n    value: function hiddenMask(mask) {\n      mask.classList.add('hidden-content');\n    }\n  }, {\n    key: \"showPanel\",\n    value: function showPanel() {\n      this.elementId = this.id;\n      this.element = document.getElementById(elementId);\n      var _iteratorNormalCompletion2 = true;\n      var _didIteratorError2 = false;\n      var _iteratorError2 = undefined;\n\n      try {\n        for (var _iterator2 = sidePanel[Symbol.iterator](), _step2; !(_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done); _iteratorNormalCompletion2 = true) {\n          var panel = _step2.value;\n          this.sidePanelId = panel.id;\n\n          if (elementId == sidePanelId) {\n            panel.classList.toggle('ue-l-side-panel--show');\n            panel.setAttribute('aria-hidden', 'false');\n          }\n        }\n      } catch (err) {\n        _didIteratorError2 = true;\n        _iteratorError2 = err;\n      } finally {\n        try {\n          if (!_iteratorNormalCompletion2 && _iterator2[\"return\"] != null) {\n            _iterator2[\"return\"]();\n          }\n        } finally {\n          if (_didIteratorError2) {\n            throw _iteratorError2;\n          }\n        }\n      }\n    }\n  }, {\n    key: \"slideToggle\",\n    value: function slideToggle() {\n      this.buttonId = this.buttonAccordion.getAttribute('id');\n      this.buttonLabel = this.buttonAccordion.closest('nav').getAttribute('aria-label');\n      this.bodyItems = document.querySelectorAll('body > *:not(.ue-c-main-header)');\n\n      if (this.buttonAccordion.getAttribute('aria-expanded') == 'false') {\n        if (this.body.classList.contains('no-scroll')) {\n          //document.querySelector('.ue-c-main-header__button[aria-expanded=\"true\"]').click();\n          this.buttonAccordion.focus();\n        }\n\n        ; // this.buttonAccordion.closest('nav').parentElement.removeAttribute('aria-hidden');\n\n        this.buttonAccordion.classList.add('is-active');\n        this.buttonAccordion.setAttribute('aria-expanded', true);\n        this.buttonAccordion.setAttribute('aria-label', 'Cerrar ' + this.buttonLabel);\n        var _iteratorNormalCompletion3 = true;\n        var _didIteratorError3 = false;\n        var _iteratorError3 = undefined;\n\n        try {\n          for (var _iterator3 = this.sidePanel[Symbol.iterator](), _step3; !(_iteratorNormalCompletion3 = (_step3 = _iterator3.next()).done); _iteratorNormalCompletion3 = true) {\n            var panel = _step3.value;\n            this.panelId = panel.getAttribute('id');\n\n            if (this.panelId) {\n              if (this.buttonId.indexOf(this.panelId) > -1) {\n                panel.classList.add('ue-l-side-panel--show');\n                panel.setAttribute('aria-hidden', false);\n                var _iteratorNormalCompletion4 = true;\n                var _didIteratorError4 = false;\n                var _iteratorError4 = undefined;\n\n                try {\n                  for (var _iterator4 = this.maskArray[Symbol.iterator](), _step4; !(_iteratorNormalCompletion4 = (_step4 = _iterator4.next()).done); _iteratorNormalCompletion4 = true) {\n                    var mask = _step4.value;\n\n                    if (mask.id == this.config.maskBurgerId || mask.id == this.config.maskBurgerTopId) {\n                      mask.classList.remove('hidden-content');\n                    }\n                  }\n                } catch (err) {\n                  _didIteratorError4 = true;\n                  _iteratorError4 = err;\n                } finally {\n                  try {\n                    if (!_iteratorNormalCompletion4 && _iterator4[\"return\"] != null) {\n                      _iterator4[\"return\"]();\n                    }\n                  } finally {\n                    if (_didIteratorError4) {\n                      throw _iteratorError4;\n                    }\n                  }\n                }\n\n                this.bodyItems.forEach(function (bodyItem) {\n                  if (bodyItem.nodeName != 'SCRIPT') {\n                    bodyItem.setAttribute('aria-hidden', true); //bodyItem.setAttribute('tabindex', -1);\n                  }\n                });\n\n                if (document.querySelector(this.config.headerBottom)) {\n                  document.querySelector(this.config.headerBottom).setAttribute('aria-hidden', false); //document.querySelector(this.config.headerBottom).setAttribute('tabindex', -1);\n                }\n              }\n            }\n          }\n        } catch (err) {\n          _didIteratorError3 = true;\n          _iteratorError3 = err;\n        } finally {\n          try {\n            if (!_iteratorNormalCompletion3 && _iterator3[\"return\"] != null) {\n              _iterator3[\"return\"]();\n            }\n          } finally {\n            if (_didIteratorError3) {\n              throw _iteratorError3;\n            }\n          }\n        }\n\n        if (this.headerTabs) {\n          if (this.headerTabs[0]) {\n            this.headerTabs[0].setAttribute('aria-hidden', true);\n          }\n        }\n\n        this.body.classList.add('no-scroll');\n      } else {\n        if (this.headerBottom != null) {\n          this.headerBottom.removeAttribute('aria-hidden');\n        }\n\n        this.buttonAccordion.classList.remove('is-active');\n        this.buttonAccordion.setAttribute('aria-expanded', false);\n        this.buttonAccordion.setAttribute('aria-label', 'Abrir ' + this.buttonLabel);\n        var _iteratorNormalCompletion5 = true;\n        var _didIteratorError5 = false;\n        var _iteratorError5 = undefined;\n\n        try {\n          for (var _iterator5 = this.sidePanel[Symbol.iterator](), _step5; !(_iteratorNormalCompletion5 = (_step5 = _iterator5.next()).done); _iteratorNormalCompletion5 = true) {\n            var _panel = _step5.value;\n            this.panelId = _panel.getAttribute('id');\n\n            if (this.panelId) {\n              if (this.buttonId.indexOf(this.panelId) > -1) {\n                _panel.classList.remove('ue-l-side-panel--show');\n\n                _panel.setAttribute('aria-hidden', true);\n\n                this.bodyItems.forEach(function (bodyItem) {\n                  if (bodyItem.nodeName != 'SCRIPT') {\n                    bodyItem.setAttribute('aria-hidden', false); //                                bodyItem.setAttribute('tabindex',0);\n                  }\n                });\n              }\n            }\n          }\n        } catch (err) {\n          _didIteratorError5 = true;\n          _iteratorError5 = err;\n        } finally {\n          try {\n            if (!_iteratorNormalCompletion5 && _iterator5[\"return\"] != null) {\n              _iterator5[\"return\"]();\n            }\n          } finally {\n            if (_didIteratorError5) {\n              throw _iteratorError5;\n            }\n          }\n        }\n\n        if (this.headerTabs) {\n          if (this.headerTabs[0]) {\n            this.headerTabs[0].setAttribute('aria-hidden', false);\n          }\n        }\n\n        this.body.classList.remove('no-scroll');\n        document.documentElement.classList.remove('no-scroll');\n        this.buttonAccordion.focus();\n        window.scrollTo(0, window.oldScroll - 1);\n      }\n    }\n  }, {\n    key: \"hideElementByClass\",\n    value: function hideElementByClass(element) {\n      var className = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 'hidden-content';\n\n      if (element) {\n        element.classList.add(className);\n      }\n\n      return;\n    }\n  }, {\n    key: \"showElementByClass\",\n    value: function showElementByClass(element) {\n      var className = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 'hidden-content';\n\n      if (element) {\n        element.classList.remove(className);\n      }\n\n      return;\n    }\n  }, {\n    key: \"layoutIsMinified\",\n    value: function layoutIsMinified() {\n      return this.layout && this.layout == 'minified';\n    }\n  }, {\n    key: \"scrollDown\",\n    value: function scrollDown(scroolScope) {\n      // Si el H1 titular de la noticia es visible\n      this.hideElementByClass(this.headerBottom);\n      this.hideElementByClass(this.logo, 'hide');\n      this.showElementByClass(this.logoThemeTop, 'hide');\n      this.showElementByClass(this.headerTitle, 'hide');\n      this.showElementByClass(this.progressBar, 'hide');\n      this.showElementByClass(this.headerTop);\n      this.headerTop.classList.add('ue-l-main-header--fixed');\n\n      if (this.layoutIsMinified()) {\n        this.headerTop.classList.remove('ue-c-main-header--minified-opacity');\n        this.headerTop.classList.remove('ue-l-main-header--row-left-align');\n      }\n\n      this.headerSocialTools.classList.remove('ue-c-main-header__social-tools--show');\n      this.hideElementByClass(this.headerMenuNav, 'hide'); // this.hideElementByClass(this.headerTools);\n\n      this.hideElementByClass(this.subscriptionButton);\n      this.hideElementByClass(this.loginButton);\n      this.hideElementByClass(this.headerTabs);\n\n      if (this.currentH1 && (this.currentH1 == 'sectionView' || this.elementInViewport(this.currentH1))) {\n        if (this.themeBehaviour == 'default' && this.logoSmallTop && this.currentH1 == 'sectionView') {\n          this.showElementByClass(this.logoSmallTop, 'hide');\n        }\n\n        this.headerTitle.textContent = this.currentSection;\n        return;\n      } // Si el H1 titular de la noticia NO es visible\n\n\n      if (this.themeBehaviour == 'default' && this.logoSmallTop) {\n        this.hideElementByClass(this.logoSmallTop, 'hide');\n      }\n\n      this.headerSocialTools.classList.add('ue-c-main-header__social-tools--show');\n      this.headerTitle.textContent = this.currentH1.textContent;\n    }\n  }, {\n    key: \"scrollToTop\",\n    value: function scrollToTop(scroolScope) {\n      if (this.headerBottom) {\n        this.showElementByClass(this.headerBottom);\n        this.headerBottom.classList.remove('ue-l-main-header--fixed');\n        this.headerBottom.classList.remove('ue-l-main-header__bottom--scroll');\n      }\n\n      this.showElementByClass(this.logo, 'hide');\n      this.hideElementByClass(this.logoSmallTop, 'hide');\n      this.hideElementByClass(this.headerTitle, 'hide');\n      this.hideElementByClass(this.progressBar, 'hide');\n      this.headerTop.classList.remove('ue-l-main-header--fixed', 'hidden-content');\n      this.headerSocialTools.classList.remove('ue-c-main-header__social-tools--show');\n      this.showElementByClass(this.headerMenuNav, 'hide'); // this.showElementByClass(this.headerTools);\n\n      this.showElementByClass(this.subscriptionButton);\n      this.showElementByClass(this.loginButton);\n      this.showElementByClass(this.headerTabs);\n      this.showElementByClass(this.headerTabs, 'hide');\n      this.hideElementByClass(this.logoSmallBottom, 'hide');\n      this.hideElementByClass(this.logoThemeTop, 'hide');\n\n      if (this.migas) {\n        for (var k = 0; k < this.migas.length; k++) {\n          this.showElementByClass(this.migas[k]);\n        }\n      }\n\n      scroolScope.positiveCounter = 0;\n      scroolScope.negativeCounter = 0;\n\n      if (this.layoutIsMinified()) {\n        if (this.headerSize != 'half') {\n          this.headerTop.classList.add('ue-c-main-header--minified-opacity');\n        }\n\n        if (this.logoThemeTop && this.themeBehaviour == 'channel') {\n          this.showElementByClass(this.logoThemeTop, 'hide');\n          this.hideElementByClass(this.logo, 'hide');\n        }\n      }\n    }\n  }, {\n    key: \"scrollUp\",\n    value: function scrollUp(scroolScope) {\n      scroolScope.negativeCounter = scroolScope.negativeCounter + 1;\n\n      if (scroolScope.negativeCounter > 20) {\n        if (this.headerBottom) {\n          this.showElementByClass(this.headerBottom);\n          this.headerBottom.classList.add('ue-l-main-header__bottom--scroll');\n          this.headerBottom.classList.add('ue-l-main-header--fixed');\n        }\n\n        this.hideElementByClass(this.headerTop);\n        this.headerTop.classList.remove('ue-l-main-header--fixed');\n\n        if (this.layoutIsMinified()) {\n          this.showElementByClass(this.logo, 'hide');\n          this.hideElementByClass(this.logoSmallTop, 'hide');\n          this.hideElementByClass(this.headerTitle, 'hide');\n          this.hideElementByClass(this.progressBar, 'hide');\n          this.showElementByClass(this.headerTop, 'hidden-content');\n          this.headerTop.classList.remove('ue-l-main-header--fixed');\n          this.headerSocialTools.classList.remove('ue-c-main-header__social-tools--show');\n          this.showElementByClass(this.headerMenuNav, 'hide'); // this.showElementByClass(this.headerTools);\n\n          this.showElementByClass(this.subscriptionButton);\n          this.showElementByClass(this.loginButton);\n          this.headerTop.classList.add('ue-l-main-header--fixed');\n          this.hideElementByClass(this.logoThemeTop, 'hide');\n\n          if (this.logoThemeTop && this.themeBehaviour == 'channel') {\n            this.showElementByClass(this.logoThemeTop, 'hide');\n            this.hideElementByClass(this.logo, 'hide');\n          }\n        }\n\n        this.showElementByClass(this.logoSmallBottom, 'hide');\n        var jsMiga = document.querySelector(this.config.jsMiga);\n        this.showElementByClass(jsMiga);\n\n        if (this.migas) {\n          for (var k = 0; k < this.migas.length; k++) {\n            if (this.migas[k] && !this.migas[k].classList.contains('is-current')) {\n              this.hideElementByClass(this.migas[k]);\n            }\n          }\n        }\n\n        scroolScope.negativeCounter = 0;\n      }\n\n      scroolScope.positiveCounter = 0;\n    }\n  }, {\n    key: \"scrolling\",\n    value: function scrolling(scroolScope) {\n      if (this.body.classList.contains('no-scroll')) {\n        return;\n      }\n\n      if (scroolScope.scrollY > scroolScope.oldScroll) {\n        // SCROLL DOWN\n        if (!scroolScope.positiveCounter) {\n          scroolScope.positiveCounter = 0;\n        }\n\n        scroolScope.positiveCounter = scroolScope.positiveCounter + 1;\n\n        if (scroolScope.positiveCounter > 20) {\n          scroolScope.positiveCounter = 0;\n        }\n\n        this.scrollDown(scroolScope);\n        scroolScope.negativeCounter = 0;\n      }\n\n      if (scroolScope.oldScroll > scroolScope.scrollY) {\n        // SCROLL UP\n        if (scroolScope.scrollY < 1) {\n          // Si estamos en el top de la noticia mostramos tabs\n          this.scrollToTop(scroolScope);\n        }\n\n        if (scroolScope.scrollY >= 1) {\n          // Scroll up normal\n          this.scrollUp(scroolScope);\n        }\n      }\n\n      scroolScope.oldScroll = scroolScope.scrollY <= 0 ? 0 : scroolScope.scrollY;\n    }\n  }]);\n\n  return _default;\n}(_lib_app__WEBPACK_IMPORTED_MODULE_0__[\"View\"]);\n\n\n;\n\n//# sourceURL=webpack:///./modules/menu/View.js?")
                },
                "./modules/menuTop/Controller.js": function(module, __webpack_exports__, __webpack_require__) {
                    "use strict";
                    eval('__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return _default; });\n/* harmony import */ var _lib_app__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../lib/app */ "./lib/app.js");\nfunction _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }\n\nfunction _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }\n\nfunction _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }\n\nfunction _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }\n\nfunction _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }\n\nfunction _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn\'t been initialised - super() hasn\'t been called"); } return self; }\n\nfunction _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }\n\nfunction _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }\n\nfunction _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }\n\n\n"use strict";\n\nvar _default =\n/*#__PURE__*/\nfunction (_app$Controller) {\n  _inherits(_default, _app$Controller);\n\n  function _default() {\n    var _this2;\n\n    _classCallCheck(this, _default);\n\n    _this2 = _possibleConstructorReturn(this, _getPrototypeOf(_default).call(this));\n\n    _this2.view.init(_this2.model.get(\'sections\'));\n\n    return _this2;\n  }\n\n  _createClass(_default, [{\n    key: "init",\n    value: function init() {\n      var _this = this;\n\n      this.menuTopOpen = false;\n\n      this._listener = function () {\n        _this.view.scrolling(this);\n      };\n\n      if (this.view.burgerButton) {\n        /*\n        this.view.burgerButton.addEventListener("click", function(){\n          \n          try { \n            if (typeof envioSC !== "undefined") { \n              envioSC(\'abrirmenuhamburguesa\');\n            }  \n          } \n          catch( e ) { \n            console.log("Error: " + e ); \n          } finally{\n            _this.view.slideMenuTop();\n          }         \n        },false);\n        */\n        this.clickBurgerButton = function () {\n          try {\n            if (typeof envioSC !== "undefined" && !_this.menuTopOpen) {\n              envioSC(\'abrirmenuhamburguesa\');\n            }\n\n            if (typeof hj !== "undefined" && !_this.menuOpen) {\n              hj(\'trigger\', \'trigger_top_nav\');\n            }\n          } catch (e) {\n            console.log("Error: " + e);\n          } finally {\n            _this.view.slideMenuTop();\n\n            _this.menuTopOpen ? _this.menuTopOpen = false : _this.menuTopOpen = true;\n          }\n        };\n\n        this.view.burgerButton.addEventListener("click", this.clickBurgerButton);\n      }\n\n      if (this.view.burgerButton) {\n        this.view.maskArray.forEach(function (mask) {\n          mask.addEventListener("click", function () {\n            if (_this.view.burgerButton.nextSibling.nextElementSibling.classList.contains(\'ue-l-side-panel--show\')) {\n              _this.view.slideMenuTop();\n\n              _this.menuTopOpen = false;\n            }\n          });\n        });\n      }\n\n      window.addEventListener("scroll", this._listener);\n      window.addEventListener(\'keydown\', function (e) {\n        if (_this.view.burgerButton.nextSibling.nextElementSibling.classList.contains(\'ue-l-side-panel--show\')) {\n          switch (e.keyCode) {\n            case 27:\n              // Esc key\n              _this.view.slideMenuTop();\n\n              break;\n\n            default:\n              return;\n          }\n        }\n      });\n\n      if (document.querySelectorAll(\'.ue-c-main-navigation__list--first-level\')) {\n        var menuFirstLevel = document.querySelectorAll(\'.ue-c-main-navigation__list--first-level\');\n        menuFirstLevel.forEach(function (item) {\n          item.addEventListener(\'click\', function setEnergizeEvents(event) {\n            var element;\n\n            if (typeof event.target.href !== \'undefined\' && event.target.href !== \'\') {\n              element = event.target;\n            } else if (event.target.parentElement.href !== undefined && event.target.parentElement.href !== \'\') {\n              element = event.target.parentElement;\n            } else {\n              for (var i = 0; i < event.path.length; i++) {\n                if (event.path[i].className && event.path[i].className === \'ue-c-main-navigation__link js-navigation-link\') {\n                  element = event.path[i];\n                }\n              }\n            }\n\n            if (element) {\n              try {\n                event.preventDefault();\n                var ahref = element;\n                window.sessionStorage.setItem(\'energizeEvents\', JSON.stringify({\n                  \'intcmp\': ahref.dataset.ueCmp,\n                  \'s_kw\': ahref.dataset.ueSkw\n                }));\n                item.removeEventListener(\'click\', setEnergizeEvents);\n                window.location.href = ahref.href;\n              } catch (e) {\n                console.log("Error: " + e);\n              } finally {\n                window.location.href = element.href;\n              }\n            }\n          });\n        });\n      }\n\n      if (document.querySelector(\'.ue-c-main-header__tab-list\')) {\n        var tabs = document.querySelector(\'.ue-c-main-header__tab-list\');\n        tabs.addEventListener(\'click\', function setEnergizeEvents(event) {\n          if (typeof event.target.href !== \'undefined\' && event.target.href !== \'\') {\n            try {\n              event.preventDefault();\n              var ahref = event.target;\n              ;\n              window.sessionStorage.setItem(\'energizeEvents\', JSON.stringify({\n                \'intcmp\': ahref.dataset.ueCmp,\n                \'s_kw\': ahref.dataset.ueSkw\n              }));\n              tabs.removeEventListener(\'click\', setEnergizeEvents);\n              window.location.href = ahref.href;\n            } catch (e) {\n              console.log("Error: " + e);\n            } finally {\n              window.location.href = ahref.href;\n            }\n          }\n        });\n      }\n    }\n  }, {\n    key: "clear",\n    value: function clear() {\n      window.removeEventListener("scroll", this._listener);\n      this.view.burgerButton.removeEventListener("click", this.clickBurgerButton);\n    }\n  }]);\n\n  return _default;\n}(_lib_app__WEBPACK_IMPORTED_MODULE_0__["Controller"]);\n\n\n;\n\n//# sourceURL=webpack:///./modules/menuTop/Controller.js?')
                },
                "./modules/menuTop/MenuTopManager.js": function(module, __webpack_exports__, __webpack_require__) {
                    "use strict";
                    eval('__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return _default; });\n/* harmony import */ var _lib_app__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../lib/app */ "./lib/app.js");\n/* harmony import */ var _Model__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../Model */ "./modules/Model.js");\n/* harmony import */ var _View__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./View */ "./modules/menuTop/View.js");\n/* harmony import */ var _Controller__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./Controller */ "./modules/menuTop/Controller.js");\nfunction _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }\n\n\n\n\n\n"use strict";\n\nvar _default = function _default() {\n  _classCallCheck(this, _default);\n\n  return _lib_app__WEBPACK_IMPORTED_MODULE_0__["add"]("menuTop", _Model__WEBPACK_IMPORTED_MODULE_1__["default"], _View__WEBPACK_IMPORTED_MODULE_2__["default"], _Controller__WEBPACK_IMPORTED_MODULE_3__["default"]);\n};\n\n\n;\n\n//# sourceURL=webpack:///./modules/menuTop/MenuTopManager.js?')
                },
                "./modules/menuTop/View.js": function(module, __webpack_exports__, __webpack_require__) {
                    "use strict";
                    eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"default\", function() { return _default; });\n/* harmony import */ var _lib_app__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../lib/app */ \"./lib/app.js\");\nfunction _typeof(obj) { if (typeof Symbol === \"function\" && typeof Symbol.iterator === \"symbol\") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === \"function\" && obj.constructor === Symbol && obj !== Symbol.prototype ? \"symbol\" : typeof obj; }; } return _typeof(obj); }\n\nfunction _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError(\"Cannot call a class as a function\"); } }\n\nfunction _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if (\"value\" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }\n\nfunction _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }\n\nfunction _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === \"object\" || typeof call === \"function\")) { return call; } return _assertThisInitialized(self); }\n\nfunction _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError(\"this hasn't been initialised - super() hasn't been called\"); } return self; }\n\nfunction _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }\n\nfunction _inherits(subClass, superClass) { if (typeof superClass !== \"function\" && superClass !== null) { throw new TypeError(\"Super expression must either be null or a function\"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }\n\nfunction _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }\n\n\n\"use strict\";\n\nvar _default =\n/*#__PURE__*/\nfunction (_app$View) {\n  _inherits(_default, _app$View);\n\n  function _default() {\n    var _this;\n\n    _classCallCheck(this, _default);\n\n    _this = _possibleConstructorReturn(this, _getPrototypeOf(_default).call(this));\n    _this.burgerButton = document.getElementById(_this.config.bottonMenuTopId);\n\n    if (_this.burgerButton) {\n      if (_this.burgerButton.closest('nav')) {\n        _this.burgerButtonLabel = _this.burgerButton.closest('nav').getAttribute('aria-label');\n      }\n    }\n\n    _this.maskArray = Array.apply(null, document.querySelectorAll(_this.config.panelMask));\n    _this.tabs = document.getElementsByClassName(_this.config.jsHeaderTabs);\n    _this.body = document.body;\n    _this.secundaryMenu = document.getElementsByClassName(_this.config.headerBottomClass);\n    _this.headerTop = document.querySelector(_this.config.headerTop);\n    _this.headerTitle = document.querySelector(_this.config.headerTitle);\n    _this.headerSocialTools = document.querySelector(_this.config.jsSocialTools); // this.headerTools = document.querySelector(this.config.headerToolsTop);\n\n    _this.subscriptionButton = document.querySelector(_this.config.subscriptionButton);\n    _this.loginButton = document.querySelector(_this.config.loginButton);\n    _this.headerMenuNav = document.querySelector(_this.config.headerNavTop); //this.logoSmall = document.querySelector('.ue-c-main-header__logo--small');\n\n    _this.logo = document.querySelector(_this.config.headerLogo);\n    _this.logoSmallTop = document.querySelector('.ue-c-main-header__primary .ue-c-main-header__logo--small');\n    _this.logoSmallBottom = document.querySelector(_this.config.logoSmallBottom);\n    _this.progressBar = document.querySelector(_this.config.progressBar);\n    return _this;\n  }\n\n  _createClass(_default, [{\n    key: \"init\",\n    value: function init(sections) {\n      this.sections = sections;\n\n      if (sections == 'portada' || sections == 'Portada') {\n        if (this.headerTop) {\n          this.headerTop.classList.add('ue-c-main-header--inverted');\n        }\n      }\n    }\n  }, {\n    key: \"scrolling\",\n    value: function scrolling(scroolScope) {\n      if (this.sections == 'portada' || this.sections == 'Portada' || portal == 'portada') {\n        if (this.body.classList.contains('no-scroll')) {\n          return;\n        } else {\n          // SCROLLUP\n          if (this.headerTop) {\n            if (scroolScope.oldScroll > scroolScope.scrollY && scroolScope.scrollY > 1) {\n              this.headerTop.classList.add('ue-l-main-header--fixed');\n              this.headerTop.classList.add('ue-c-main-header--inverted');\n\n              if (this.logoSmallTop) {\n                this.logoSmallTop.classList.remove('hide');\n              }\n\n              if (this.logoSmallBottom) {\n                this.logoSmallBottom.classList.remove('hide');\n              }\n\n              if (this.logo) {\n                this.logo.classList.add('hide');\n              }\n\n              this.headerMenuNav.classList.remove('hide');\n              this.headerTitle.classList.remove('hide');\n              this.progressBar.classList.add('hide'); //   this.headerTools.classList.add('hidden-content');\n\n              this.subscriptionButton.classList.add('hidden-content');\n              this.loginButton.classList.add('hidden-content');\n              this.headerTop.classList.remove('hidden-content');\n            } else if (scroolScope.scrollY < 1) {\n              // SCROLLTOP\n              this.headerTop.classList.remove('ue-l-main-header--fixed');\n              this.headerTop.classList.add('ue-c-main-header--inverted');\n              this.headerTitle.classList.add('hide');\n              this.headerSocialTools.classList.remove('ue-c-main-header__social-tools--show'); //   this.headerTools.classList.remove('hidden-content');\n\n              this.subscriptionButton.classList.remove('hidden-content');\n              this.loginButton.classList.remove('hidden-content');\n              this.headerMenuNav.classList.remove('hide');\n\n              if (this.logoSmallTop) {\n                this.logoSmallTop.classList.add('hide');\n              }\n\n              if (this.logoSmallBottom) {\n                this.logoSmallBottom.classList.add('hide');\n              }\n\n              if (this.logo) {\n                this.logo.classList.remove('hide');\n              }\n\n              this.progressBar.classList.add('hide');\n            } else {\n              // SCROLLDOWN\n              this.headerTop.classList.add('ue-l-main-header--fixed');\n              this.headerTop.classList.remove('ue-c-main-header--inverted');\n              this.progressBar.classList.remove('hide');\n              this.headerTitle.classList.remove('hide');\n              this.headerSocialTools.classList.add('ue-c-main-header__social-tools--show'); //   this.headerTools.classList.add('hidden-content');\n\n              this.subscriptionButton.classList.add('hidden-content');\n              this.loginButton.classList.add('hidden-content');\n              this.headerMenuNav.classList.add('hide');\n\n              if (this.logoSmallTop) {\n                this.logoSmallTop.classList.remove('hide');\n              }\n\n              if (this.logoSmallBottom) {\n                this.logoSmallBottom.classList.add('hide');\n              }\n\n              if (this.logo) {\n                this.logo.classList.add('hide');\n              }\n\n              this.headerSocialTools.classList.remove('ue-c-main-header__social-tools--show');\n            }\n          }\n        }\n\n        scroolScope.oldScroll = scroolScope.scrollY <= 0 ? 0 : scroolScope.scrollY;\n      }\n    }\n  }, {\n    key: \"slideMenuTop\",\n    value: function slideMenuTop() {\n      this.sidePanel = this.burgerButton.nextSibling.nextElementSibling;\n      this.maskBurger = document.getElementById(this.config.maskBurgerId);\n      this.bodyItems = document.querySelectorAll('body > *:not(.ue-c-main-header)');\n\n      if (this.sidePanel.classList.contains('ue-l-side-panel--show')) {\n        this.sidePanel.classList.remove('ue-l-side-panel--show');\n        this.burgerButton.classList.remove('is-active'); //this.burgerButton.setAttribute('aria-hidden',true);\n\n        this.burgerButton.setAttribute('aria-expanded', false);\n        this.maskBurger.classList.add('hidden-content');\n        this.sidePanel.setAttribute('aria-hidden', true);\n        this.bodyItems.forEach(function (bodyItem) {\n          if (bodyItem.nodeName != 'SCRIPT') {\n            bodyItem.setAttribute('aria-hidden', false); //bodyItem.tabIndex = 0;\n          }\n        });\n\n        if (this.tabs) {\n          if (this.tabs[0]) {\n            this.tabs[0].setAttribute('aria-hidden', false);\n          }\n        }\n\n        if (this.secundaryMenu) {\n          if (this.secundaryMenu[0]) {\n            this.secundaryMenu[0].setAttribute('aria-hidden', false);\n          }\n        }\n\n        this.body.classList.remove('no-scroll');\n        document.documentElement.classList.remove('no-scroll');\n        this.burgerButton.setAttribute('aria-label', 'Abrir ' + this.burgerButtonLabel);\n      } else {\n        this.burgerButton.classList.add('is-active'); // this.burgerButton.setAttribute('aria-hidden',false);\n\n        this.burgerButton.setAttribute('aria-expanded', true);\n        this.sidePanel.classList.add('ue-l-side-panel--show');\n        this.maskBurger.classList.remove('hidden-content');\n        this.sidePanel.setAttribute('aria-hidden', false);\n        this.bodyItems.forEach(function (bodyItem) {\n          if (bodyItem.nodeName != 'SCRIPT') {\n            bodyItem.setAttribute('aria-hidden', true); // bodyItem.tabIndex = -1;\n          }\n        });\n        document.querySelector(this.config.headerTop).setAttribute('aria-hidden', false);\n\n        if (this.tabs) {\n          if (this.tabs[0]) {\n            this.tabs[0].setAttribute('aria-hidden', true); // this.tabs[0].tabIndex = -1;\n          }\n        }\n\n        if (this.secundaryMenu) {\n          if (this.secundaryMenu[0]) {\n            this.secundaryMenu[0].setAttribute('aria-hidden', true); //this.secundaryMenu[0].tabIndex = -1;\n          }\n        }\n\n        this.body.classList.add('no-scroll'); //document.documentElement.classList.add('no-scroll');\n\n        this.burgerButton.setAttribute('aria-label', 'Cerrar ' + this.burgerButtonLabel);\n      }\n    }\n  }]);\n\n  return _default;\n}(_lib_app__WEBPACK_IMPORTED_MODULE_0__[\"View\"]);\n\n\n;\n\n//# sourceURL=webpack:///./modules/menuTop/View.js?")
                },
                "./modules/reloadHeader/Controller.js": function(module, __webpack_exports__, __webpack_require__) {
                    "use strict";
                    eval('__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return _default; });\n/* harmony import */ var _lib_app__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../lib/app */ "./lib/app.js");\nfunction _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }\n\nfunction _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }\n\nfunction _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }\n\nfunction _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }\n\nfunction _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }\n\nfunction _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn\'t been initialised - super() hasn\'t been called"); } return self; }\n\nfunction _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }\n\nfunction _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }\n\nfunction _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }\n\n\n"use strict";\n\nvar _default =\n/*#__PURE__*/\nfunction (_app$Controller) {\n  _inherits(_default, _app$Controller);\n\n  function _default(data) {\n    _classCallCheck(this, _default);\n\n    return _possibleConstructorReturn(this, _getPrototypeOf(_default).call(this));\n  }\n\n  _createClass(_default, [{\n    key: "reloadManager",\n    value: function reloadManager(dataNC) {\n      if (dataNC) {\n        var sections = this.model.get(\'sections\');\n\n        if (dataNC.detail.section) {\n          sections = dataNC.detail.section.split("/");\n        }\n\n        this.model.sections = sections;\n        this.view.init(dataNC);\n      }\n    }\n  }]);\n\n  return _default;\n}(_lib_app__WEBPACK_IMPORTED_MODULE_0__["Controller"]);\n\n\n;\n\n//# sourceURL=webpack:///./modules/reloadHeader/Controller.js?')
                },
                "./modules/reloadHeader/ReloadHeaderManager.js": function(module, __webpack_exports__, __webpack_require__) {
                    "use strict";
                    eval('__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return _default; });\n/* harmony import */ var _lib_app__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../lib/app */ "./lib/app.js");\n/* harmony import */ var _Model__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../Model */ "./modules/Model.js");\n/* harmony import */ var _View__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./View */ "./modules/reloadHeader/View.js");\n/* harmony import */ var _Controller__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./Controller */ "./modules/reloadHeader/Controller.js");\nfunction _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }\n\n\n\n\n\n"use strict";\n\nvar _default = function _default(dataNC) {\n  _classCallCheck(this, _default);\n\n  return _lib_app__WEBPACK_IMPORTED_MODULE_0__["add"]("reloadHeader", _Model__WEBPACK_IMPORTED_MODULE_1__["default"], _View__WEBPACK_IMPORTED_MODULE_2__["default"], _Controller__WEBPACK_IMPORTED_MODULE_3__["default"], dataNC);\n};\n\n\n;\n\n//# sourceURL=webpack:///./modules/reloadHeader/ReloadHeaderManager.js?')
                },
                "./modules/reloadHeader/View.js": function(module, __webpack_exports__, __webpack_require__) {
                    "use strict";
                    eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"default\", function() { return _default; });\n/* harmony import */ var _lib_app__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../lib/app */ \"./lib/app.js\");\nfunction _typeof(obj) { if (typeof Symbol === \"function\" && typeof Symbol.iterator === \"symbol\") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === \"function\" && obj.constructor === Symbol && obj !== Symbol.prototype ? \"symbol\" : typeof obj; }; } return _typeof(obj); }\n\nfunction _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError(\"Cannot call a class as a function\"); } }\n\nfunction _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if (\"value\" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }\n\nfunction _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }\n\nfunction _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === \"object\" || typeof call === \"function\")) { return call; } return _assertThisInitialized(self); }\n\nfunction _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError(\"this hasn't been initialised - super() hasn't been called\"); } return self; }\n\nfunction _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }\n\nfunction _inherits(subClass, superClass) { if (typeof superClass !== \"function\" && superClass !== null) { throw new TypeError(\"Super expression must either be null or a function\"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }\n\nfunction _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }\n\n\n\"use strict\";\n\nvar _default =\n/*#__PURE__*/\nfunction (_app$View) {\n  _inherits(_default, _app$View);\n\n  function _default() {\n    _classCallCheck(this, _default);\n\n    return _possibleConstructorReturn(this, _getPrototypeOf(_default).call(this));\n  }\n\n  _createClass(_default, [{\n    key: \"init\",\n    value: function init(dataNC) {\n      this.oldHeaderTop = document.getElementById('navigation-energize');\n      this.oldHeaderTabs = document.getElementById('tabs-energize');\n      this.titulo = document.getElementById('titleEnergize'); //Se esconden las tabs. \n\n      if (this.oldHeaderTabs) {\n        this.oldHeaderTabs.classList.add('hide');\n      } //Actualizamos el Tittle que aparece en scrool down. \n\n\n      if (document.getElementById('ID-REF3')) {\n        document.getElementById('ID-REF3').remove();\n      }\n\n      if (portal != 'portada') {\n        document.getElementById('titleEnergize').textContent = dataNC.detail.title;\n      }\n\n      if (dataNC.detail.indexActual || dataNC.detail.indexActual === 0) {\n        document.getElementById('titleEnergize').dataset.indexView = dataNC.detail.indexActual; // buscar header atributte y comparar con current main atributte, si son distintos cambiar\n\n        if (portal != 'portada') {\n          var main = document.body.querySelector('[data-ue-navindex=\"' + dataNC.detail.indexActual + '\"]');\n          var header = document.body.querySelector('.ue-c-main-header');\n\n          if (main && main.dataset.theme && header && header.dataset.theme && main.dataset.theme != header.dataset.theme) {\n            header.classList.remove(header.dataset.theme);\n            header.classList.add(main.dataset.theme);\n            header.dataset.theme = main.dataset.theme;\n          }\n        }\n      } //Actualizamos las migas y el desplegable\n\n\n      var oldHeader = document.getElementById('navigation-energize');\n      var newHeader = document.createElement('div');\n      newHeader.innerHTML = dataNC.detail.breadcrumb;\n      var secondElement = newHeader.children[1];\n\n      if (document.getElementById('navigation-energize')) {\n        document.getElementById('navigation-energize').parentNode.replaceChild(newHeader.children[0], oldHeader);\n\n        if (document.querySelector(this.config.headerNav)) {\n          document.querySelector(this.config.headerNav).innerHTML = secondElement.innerHTML; //document.getElementById('navigation-energize').parentNode.insertBefore(secondElement,document.getElementById('navigation-energize').nextSibling);\n        }\n      }\n    }\n  }]);\n\n  return _default;\n}(_lib_app__WEBPACK_IMPORTED_MODULE_0__[\"View\"]);\n\n\n;\n\n//# sourceURL=webpack:///./modules/reloadHeader/View.js?")
                },
                "./modules/sections/Controller.js": function(module, __webpack_exports__, __webpack_require__) {
                    "use strict";
                    eval('__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return _default; });\n/* harmony import */ var _lib_app__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../lib/app */ "./lib/app.js");\nfunction _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }\n\nfunction _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }\n\nfunction _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }\n\nfunction _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn\'t been initialised - super() hasn\'t been called"); } return self; }\n\nfunction _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }\n\nfunction _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }\n\nfunction _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }\n\n\n"use strict";\n\nvar _default =\n/*#__PURE__*/\nfunction (_app$Controller) {\n  _inherits(_default, _app$Controller);\n\n  function _default() {\n    var _this;\n\n    _classCallCheck(this, _default);\n\n    _this = _possibleConstructorReturn(this, _getPrototypeOf(_default).call(this));\n\n    _this.view.init(_this.model.get(\'sections\'));\n\n    return _this;\n  }\n\n  return _default;\n}(_lib_app__WEBPACK_IMPORTED_MODULE_0__["Controller"]);\n\n\n;\n\n//# sourceURL=webpack:///./modules/sections/Controller.js?')
                },
                "./modules/sections/SectionsManager.js": function(module, __webpack_exports__, __webpack_require__) {
                    "use strict";
                    eval('__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return _default; });\n/* harmony import */ var _lib_app__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../lib/app */ "./lib/app.js");\n/* harmony import */ var _Model__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../Model */ "./modules/Model.js");\n/* harmony import */ var _View__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./View */ "./modules/sections/View.js");\n/* harmony import */ var _Controller__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./Controller */ "./modules/sections/Controller.js");\nfunction _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }\n\n\n\n\n\n"use strict";\n\nvar _default = function _default() {\n  _classCallCheck(this, _default);\n\n  return _lib_app__WEBPACK_IMPORTED_MODULE_0__["add"]("sections", _Model__WEBPACK_IMPORTED_MODULE_1__["default"], _View__WEBPACK_IMPORTED_MODULE_2__["default"], _Controller__WEBPACK_IMPORTED_MODULE_3__["default"]);\n};\n\n\n;\n\n//# sourceURL=webpack:///./modules/sections/SectionsManager.js?')
                },
                "./modules/sections/View.js": function(module, __webpack_exports__, __webpack_require__) {
                    "use strict";
                    eval('__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return _default; });\n/* harmony import */ var _lib_app__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../lib/app */ "./lib/app.js");\nfunction _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }\n\nfunction _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }\n\nfunction _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }\n\nfunction _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }\n\nfunction _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }\n\nfunction _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn\'t been initialised - super() hasn\'t been called"); } return self; }\n\nfunction _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }\n\nfunction _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }\n\nfunction _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }\n\n\n"use strict";\n\nvar _default =\n/*#__PURE__*/\nfunction (_app$View) {\n  _inherits(_default, _app$View);\n\n  function _default() {\n    var _this;\n\n    _classCallCheck(this, _default);\n\n    _this = _possibleConstructorReturn(this, _getPrototypeOf(_default).call(this));\n    /*if(document.getElementsByClassName("ue-c-main-header__breadcrumb")){\n      if(document.getElementsByClassName("ue-c-main-header__breadcrumb").item){\n        if(document.getElementsByClassName("ue-c-main-header__breadcrumb").item(0)){\n          this.migas =  document.querySelector(this.config.jsMiga).parentElement.children; \n        }\n      }\n    }*/\n\n    if (document.querySelector(_this.config.jsMiga) && document.querySelector(_this.config.jsMiga).parentElement && document.querySelector(_this.config.jsMiga).parentElement.children) {\n      _this.migas = document.querySelector(_this.config.jsMiga).parentElement.children;\n    }\n\n    return _this;\n  }\n\n  _createClass(_default, [{\n    key: "init",\n    value: function init(sections) {\n      //Comprobamos si existe ue-data-energize-special-section.  Secciones mal creadas en el cms, como madrid, que debería estar dentro de españa\n      if (document.getElementById(\'navigation-energize\')) {\n        this.specialSection = document.getElementById(\'navigation-energize\').getAttribute(\'data-energize-special-section\');\n      }\n\n      if (this.specialSection && sections) {\n        if (sections[0]) {\n          if (this.normalize(sections[0]) != this.normalize(this.specialSection)) {\n            sections.unshift(this.specialSection);\n          }\n        }\n      }\n\n      if (this.migas) {\n        if (this.migas[0]) {\n          if (this.migas[0].getElementsByTagName(\'a\')) {\n            if (this.migas[0].getElementsByTagName(\'a\')[0]) {\n              this.migas[0].getElementsByTagName(\'a\')[0].innerHTML = sections[0];\n            }\n          }\n        }\n\n        var objectAndDimension = false; //Delete last section if element is Object And Dimension\n\n        this.headerTabs = document.querySelector(this.config.headerTabs) ? document.querySelector(this.config.headerTabs) : document.querySelector(\'.ue-c-main-header__tabs\');\n\n        if (this.headerTabs) {\n          if (this.headerTabs.firstElementChild.children) {\n            var tabsChildrens = this.headerTabs.firstElementChild.children;\n            var _iteratorNormalCompletion = true;\n            var _didIteratorError = false;\n            var _iteratorError = undefined;\n\n            try {\n              for (var _iterator = tabsChildrens[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {\n                var item = _step.value;\n\n                if (item.getAttribute(\'data-original-name\')) {\n                  if (_lib_app__WEBPACK_IMPORTED_MODULE_0__["slugify"](item.getAttribute(\'data-original-name\')) == _lib_app__WEBPACK_IMPORTED_MODULE_0__["slugify"](sections[sections.length - 1])) {\n                    objectAndDimension = true;\n\n                    if (sections.length == 3) {\n                      var node = document.createElement("li");\n                      node.className = "ue-c-main-header__breadcrumb-item is-current";\n                      var linkNode = document.createElement("a");\n                      linkNode.className = "ue-c-main-header__breadcrumb-link js-breadcrumb-link";\n                      linkNode.setAttribute("aria-current", "page");\n                      linkNode.innerText = sections[1];\n                      node.appendChild(linkNode);\n                      this.migas[this.migas.length - 1].parentElement.appendChild(node);\n                    }\n                  }\n                }\n              }\n            } catch (err) {\n              _didIteratorError = true;\n              _iteratorError = err;\n            } finally {\n              try {\n                if (!_iteratorNormalCompletion && _iterator["return"] != null) {\n                  _iterator["return"]();\n                }\n              } finally {\n                if (_didIteratorError) {\n                  throw _iteratorError;\n                }\n              }\n            }\n          }\n        }\n\n        if (sections.length == 1) {\n          var _iteratorNormalCompletion2 = true;\n          var _didIteratorError2 = false;\n          var _iteratorError2 = undefined;\n\n          try {\n            for (var _iterator2 = this.migas[Symbol.iterator](), _step2; !(_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done); _iteratorNormalCompletion2 = true) {\n              var _item = _step2.value;\n\n              if (_item.getElementsByTagName(\'a\')[0] && _item.getElementsByTagName(\'a\')[0].innerText != \'\') {\n                _item.classList.add(\'is-current\');\n\n                _item.getElementsByTagName(\'a\')[0].setAttribute("aria-current", "page");\n              }\n            }\n          } catch (err) {\n            _didIteratorError2 = true;\n            _iteratorError2 = err;\n          } finally {\n            try {\n              if (!_iteratorNormalCompletion2 && _iterator2["return"] != null) {\n                _iterator2["return"]();\n              }\n            } finally {\n              if (_didIteratorError2) {\n                throw _iteratorError2;\n              }\n            }\n          }\n        }\n\n        if (sections.length == 2 && objectAndDimension == false) {\n          var node = document.createElement("li");\n          node.className = "ue-c-main-header__breadcrumb-item is-current";\n          var linkNode = document.createElement("a");\n          linkNode.className = "ue-c-main-header__breadcrumb-link js-breadcrumb-link";\n          linkNode.setAttribute("aria-current", "page");\n          linkNode.innerText = sections[1];\n          node.appendChild(linkNode);\n          this.migas[this.migas.length - 1].parentElement.appendChild(node); //this.migas[this.migas.length-1].parentNode.insertBefore(node,this.migas[this.migas.length-1].nextSibling)\n        }\n\n        if (sections.length == 3) {\n          if (objectAndDimension === false) {\n            var node = document.createElement("li");\n            node.className = "ue-c-main-header__breadcrumb-item";\n            var linkNode = document.createElement("a");\n            linkNode.className = "ue-c-main-header__breadcrumb-link js-breadcrumb-link";\n            linkNode.innerText = sections[1];\n            node.appendChild(linkNode); // this.migas[this.migas.length-1].parentNode.insertBefore(node,this.migas[this.migas.length-1].nextSibling)\n\n            this.migas[this.migas.length - 1].parentElement.appendChild(node);\n            var secondNode = document.createElement("li");\n            secondNode.className = "ue-c-main-header__breadcrumb-item is-current";\n            var secondLinkNode = document.createElement("a");\n            secondLinkNode.className = "ue-c-main-header__breadcrumb-link js-breadcrumb-link";\n            secondLinkNode.innerText = sections[2];\n            secondNode.appendChild(secondLinkNode);\n            secondNode.setAttribute("aria-current", "page");\n            this.migas[this.migas.length - 1].parentElement.appendChild(secondNode); //this.migas[this.migas.length-1].parentNode.insertBefore(secondNode,this.migas[this.migas.length-1].nextSibling)\n          }\n        }\n      }\n\n      if (document.getElementById(this.config.skipLink)) {\n        var main = document.getElementsByTagName(\'main\');\n\n        if (main.item(0)) {\n          var idMain = main.item(0).getAttribute(\'id\'); // document.getElementById(idMain).tabIndex = \'0\';\n\n          document.getElementById(this.config.skipLink).href = \'#\' + idMain; //document.getElementById(this.config.skipLink).href=\'javascript:void(0)\';\n\n          document.getElementById(this.config.skipLink).addEventListener("click", function (e) {\n            e.preventDefault();\n\n            if (document.getElementById(idMain).getElementsByTagName(\'h1\') && document.getElementById(idMain).getElementsByTagName(\'h1\').item(0)) {\n              document.getElementById(idMain).getElementsByTagName(\'h1\').item(0).tabIndex = \'0\';\n              document.getElementById(idMain).getElementsByTagName(\'h1\').item(0).focus();\n            }\n          });\n        }\n      }\n\n      if (document.getElementById(this.config.skipLinkFirst)) {\n        var main = document.getElementsByTagName(\'main\');\n\n        if (main.item(0)) {\n          document.getElementById(this.config.skipLinkFirst).href = \'#\' + this.config.bottonMenuTopId;\n        }\n      }\n\n      var sectionsLink = document.getElementsByClassName(this.config.jsBreadcrumbLink);\n\n      if (sectionsLink) {\n        for (var i = 0; i < sectionsLink.length; i++) {\n          if (sectionsLink[i].innerHTML == \'\') {\n            if (this.migas[i]) {\n              this.migas[i].remove();\n            }\n          }\n        }\n      }\n    }\n  }, {\n    key: "normalize",\n    value: function normalize(str) {\n      str = str.replace(/^\\s+|\\s+$/g, \'\'); // trim\n\n      str = str.toLowerCase(); // remove accents, swap ñ for n, etc\n\n      var from = "àáäâèéëêìíïîòóöôùúüûñç·/_,:;";\n      var to = "aaaaeeeeiiiioooouuuunc------";\n\n      for (var i = 0, l = from.length; i < l; i++) {\n        str = str.replace(new RegExp(from.charAt(i), \'g\'), to.charAt(i));\n      }\n\n      str = str.replace(/[^a-z0-9 -]/g, \'\') // remove invalid chars\n      .replace(/\\s+/g, \'-\') // collapse whitespace and replace by -\n      .replace(/-+/g, \'-\'); // collapse dashes\n\n      return str;\n    }\n  }]);\n\n  return _default;\n}(_lib_app__WEBPACK_IMPORTED_MODULE_0__["View"]);\n\n\n;\n\n//# sourceURL=webpack:///./modules/sections/View.js?')
                },
                "./modules/tabs/Controller.js": function(module, __webpack_exports__, __webpack_require__) {
                    "use strict";
                    eval('__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return _default; });\n/* harmony import */ var _lib_app__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../lib/app */ "./lib/app.js");\nfunction _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }\n\nfunction _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }\n\nfunction _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }\n\nfunction _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn\'t been initialised - super() hasn\'t been called"); } return self; }\n\nfunction _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }\n\nfunction _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }\n\nfunction _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }\n\n\n"use strict";\n\nvar _default =\n/*#__PURE__*/\nfunction (_app$Controller) {\n  _inherits(_default, _app$Controller);\n\n  function _default() {\n    var _this;\n\n    _classCallCheck(this, _default);\n\n    _this = _possibleConstructorReturn(this, _getPrototypeOf(_default).call(this));\n\n    _this.view.init(_this.model.get(\'sections\'));\n\n    return _this;\n  }\n\n  return _default;\n}(_lib_app__WEBPACK_IMPORTED_MODULE_0__["Controller"]);\n\n\n;\n\n//# sourceURL=webpack:///./modules/tabs/Controller.js?')
                },
                "./modules/tabs/TabsManager.js": function(module, __webpack_exports__, __webpack_require__) {
                    "use strict";
                    eval('__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return _default; });\n/* harmony import */ var _lib_app__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../lib/app */ "./lib/app.js");\n/* harmony import */ var _Model__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../Model */ "./modules/Model.js");\n/* harmony import */ var _View__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./View */ "./modules/tabs/View.js");\n/* harmony import */ var _Controller__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./Controller */ "./modules/tabs/Controller.js");\nfunction _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }\n\n\n\n\n\n"use strict";\n\nvar _default = function _default() {\n  _classCallCheck(this, _default);\n\n  return _lib_app__WEBPACK_IMPORTED_MODULE_0__["add"]("tabs", _Model__WEBPACK_IMPORTED_MODULE_1__["default"], _View__WEBPACK_IMPORTED_MODULE_2__["default"], _Controller__WEBPACK_IMPORTED_MODULE_3__["default"]);\n};\n\n\n;\n\n//# sourceURL=webpack:///./modules/tabs/TabsManager.js?')
                },
                "./modules/tabs/View.js": function(module, __webpack_exports__, __webpack_require__) {
                    "use strict";
                    eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"default\", function() { return _default; });\n/* harmony import */ var _lib_app__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../lib/app */ \"./lib/app.js\");\nfunction _typeof(obj) { if (typeof Symbol === \"function\" && typeof Symbol.iterator === \"symbol\") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === \"function\" && obj.constructor === Symbol && obj !== Symbol.prototype ? \"symbol\" : typeof obj; }; } return _typeof(obj); }\n\nfunction _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError(\"Cannot call a class as a function\"); } }\n\nfunction _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if (\"value\" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }\n\nfunction _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }\n\nfunction _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === \"object\" || typeof call === \"function\")) { return call; } return _assertThisInitialized(self); }\n\nfunction _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError(\"this hasn't been initialised - super() hasn't been called\"); } return self; }\n\nfunction _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }\n\nfunction _inherits(subClass, superClass) { if (typeof superClass !== \"function\" && superClass !== null) { throw new TypeError(\"Super expression must either be null or a function\"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }\n\nfunction _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }\n\n\n\"use strict\";\n\nvar _default =\n/*#__PURE__*/\nfunction (_app$View) {\n  _inherits(_default, _app$View);\n\n  function _default() {\n    var _this;\n\n    _classCallCheck(this, _default);\n\n    _this = _possibleConstructorReturn(this, _getPrototypeOf(_default).call(this));\n    _this.tabs = document.getElementById('tabs-energize');\n    return _this;\n  }\n\n  _createClass(_default, [{\n    key: \"init\",\n    value: function init(sections) {\n      //let findSection=false;\n      var tabActive = false;\n\n      if (this.tabs) {\n        var itemTabs = document.querySelectorAll(this.config.headerTabs);\n        itemTabs.forEach(function (item, index) {\n          var url = window.location.protocol + \"//\" + window.location.host + window.location.pathname;\n\n          if (url == item.dataset.urlEnergize) {\n            item.classList.add('is-active');\n            item.setAttribute('aria-current', 'page');\n            item.setAttribute('tabindex', '-1');\n\n            if (item.childNodes) {\n              item.childNodes[0].setAttribute('aria-current', 'page');\n            }\n\n            tabActive = true;\n\n            if (item.offsetLeft > item.parentNode.offsetWidth / 2) {\n              if (item.offsetLeft > item.parentNode.offsetWidth) {\n                item.parentNode.scrollTo(item.parentNode.offsetWidth, 0);\n              } else {\n                item.parentNode.scrollTo(item.parentNode.offsetWidth / 2, 0);\n              }\n            }\n          }\n        });\n\n        if (tabActive == false) {\n          var url = window.location.protocol + \"//\" + window.location.host + window.location.pathname;\n          itemTabs.forEach(function (item, index) {\n            if (typeof navigationSection != 'undefined') {\n              if (url.includes(navigationSection) && item.dataset.originalName == 'Noticias') {\n                var patternDateInUrl = /\\/\\d{4}\\/\\d{2}\\/\\d{2}\\//;\n\n                if (patternDateInUrl.exec(url)) {\n                  item.classList.add('is-active');\n                  item.setAttribute('aria-current', 'page');\n                  item.setAttribute('tabindex', '-1');\n\n                  if (item.childNodes) {\n                    item.childNodes[0].setAttribute('aria-current', 'page');\n                  }\n\n                  tabActive = true;\n\n                  if (item.childNodes) {\n                    item.childNodes[0].setAttribute('aria-current', 'page');\n                  }\n\n                  if (item.offsetLeft > item.parentNode.offsetWidth / 2) {\n                    if (item.offsetLeft > item.parentNode.offsetWidth) {\n                      item.parentNode.scrollTo(item.parentNode.offsetWidth, 0);\n                    } else {\n                      item.parentNode.scrollTo(item.parentNode.offsetWidth / 2, 0);\n                    }\n                  }\n                }\n              }\n            }\n          });\n        }\n\n        if (tabActive == false) {\n          var _url = window.location.protocol + \"//\" + window.location.host + window.location.pathname;\n\n          itemTabs.forEach(function (item, index) {\n            var patternUrlEnergize = item.dataset.urlPattern;\n\n            if (patternUrlEnergize && new RegExp(patternUrlEnergize).test(_url)) {\n              item.classList.add('is-active');\n              item.setAttribute('aria-current', 'page');\n              item.setAttribute('tabindex', '-1');\n\n              if (item.childNodes) {\n                item.childNodes[0].setAttribute('aria-current', 'page');\n              }\n\n              tabActive = true;\n\n              if (item.childNodes) {\n                item.childNodes[0].setAttribute('aria-current', 'page');\n              }\n\n              if (item.offsetLeft > item.parentNode.offsetWidth / 2) {\n                if (item.offsetLeft > item.parentNode.offsetWidth) {\n                  item.parentNode.scrollTo(item.parentNode.offsetWidth, 0);\n                } else {\n                  item.parentNode.scrollTo(item.parentNode.offsetWidth / 2, 0);\n                }\n              }\n            }\n          });\n        }\n      }\n    }\n  }]);\n\n  return _default;\n}(_lib_app__WEBPACK_IMPORTED_MODULE_0__[\"View\"]);\n\n\n;\n\n//# sourceURL=webpack:///./modules/tabs/View.js?")
                },
                "./src/HeaderManager.js": function(module, __webpack_exports__, __webpack_require__) {
                    "use strict";
                    eval('__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _modules_boot_Boot_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../modules/boot/Boot.js */ "./modules/boot/Boot.js");\n/* harmony import */ var _modules_tabs_TabsManager__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../modules/tabs/TabsManager */ "./modules/tabs/TabsManager.js");\n/* harmony import */ var _modules_sections_SectionsManager__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../modules/sections/SectionsManager */ "./modules/sections/SectionsManager.js");\n/* harmony import */ var _modules_menu_MenuManager__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../modules/menu/MenuManager */ "./modules/menu/MenuManager.js");\n/* harmony import */ var _modules_menuTop_MenuTopManager__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../modules/menuTop/MenuTopManager */ "./modules/menuTop/MenuTopManager.js");\n/* harmony import */ var _modules_reloadHeader_ReloadHeaderManager__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../modules/reloadHeader/ReloadHeaderManager */ "./modules/reloadHeader/ReloadHeaderManager.js");\n\n\n\n\n\n\n\n\nnew _modules_boot_Boot_js__WEBPACK_IMPORTED_MODULE_0__["default"]().then(function () {\n  var energizePool = {};\n  energizePool.sectionManager = new _modules_sections_SectionsManager__WEBPACK_IMPORTED_MODULE_2__["default"]();\n  energizePool.menuTopManager = new _modules_menuTop_MenuTopManager__WEBPACK_IMPORTED_MODULE_4__["default"]();\n  energizePool.menuTopManager.controller.init();\n  energizePool.menuManager = new _modules_menu_MenuManager__WEBPACK_IMPORTED_MODULE_3__["default"]();\n  energizePool.menuManager.controller.init();\n  energizePool.tabsManager = new _modules_tabs_TabsManager__WEBPACK_IMPORTED_MODULE_1__["default"]();\n  window.addEventListener("changeHeaderEnergize", function (dataNC) {\n    if (dataNC.detail.breadcrumb != \'\' && dataNC.detail.breadcrumb != undefined) {\n      delete energizePool.reloadHeader;\n      energizePool.menuManager.controller.clear();\n      energizePool.menuTopManager.controller.clear();\n      delete energizePool.sectionManager;\n      delete energizePool.menuTopManager;\n      delete energizePool.menuManager;\n      delete energizePool.tabsManager;\n\n      if (typeof dataNC.detail.section === \'string\' && typeof navigationSection !== \'undefined\') {\n        navigationSection = dataNC.detail.section;\n      }\n\n      energizePool.reloadHeader = new _modules_reloadHeader_ReloadHeaderManager__WEBPACK_IMPORTED_MODULE_5__["default"](dataNC);\n      energizePool.sectionManager = new _modules_sections_SectionsManager__WEBPACK_IMPORTED_MODULE_2__["default"]();\n      energizePool.menuTopManager = new _modules_menuTop_MenuTopManager__WEBPACK_IMPORTED_MODULE_4__["default"]();\n      energizePool.menuTopManager.controller.init();\n      energizePool.menuManager = new _modules_menu_MenuManager__WEBPACK_IMPORTED_MODULE_3__["default"]();\n      energizePool.menuManager.controller.init();\n      energizePool.tabsManager = new _modules_tabs_TabsManager__WEBPACK_IMPORTED_MODULE_1__["default"]();\n    }\n  });\n});\n\n//# sourceURL=webpack:///./src/HeaderManager.js?')
                },
                "./src/app.js": function(module, exports, __webpack_require__) {
                    "use strict";
                    eval('\n\nmodule.exports = __webpack_require__(/*! ./HeaderManager.js */ "./src/HeaderManager.js");\n\n//# sourceURL=webpack:///./src/app.js?')
                }
            })
        }
    }
      , __webpack_module_cache__ = {};
    function __webpack_require__(e) {
        var t = __webpack_module_cache__[e];
        if (void 0 !== t)
            return t.exports;
        var n = __webpack_module_cache__[e] = {
            exports: {}
        };
        return __webpack_modules__[e](n, n.exports, __webpack_require__),
        n.exports
    }
    var __webpack_exports__ = {};
    (()=>{
        "use strict";
        __webpack_require__(966),
        __webpack_require__(521);
        var e = __webpack_require__(237);
        class t {
            constructor(e, t) {
                e = e ? e.closest("main") ? e.closest("main") : e.closest("body") : document,
                this.metaUrl = document.querySelector('meta[property="og:url"]'),
                this.metaTitle = document.querySelector('meta[property="og:title"]'),
                this.metaTitleTwitter = document.querySelector('meta[name="twitter:title"]'),
                this.metaSummary = document.querySelector('meta[property="og:description"]'),
                this.metaImg = document.querySelector('meta[property="og:image"]'),
                this.data = t || {},
                this.data && this.data.hasOwnProperty("url") && (this.data.url = this.getUrlCanonica()),
                this.setDataSocialMedia(),
                ["facebook", "twitter", "mail", "whatsapp", "telegram"].forEach((t=>{
                    (e.querySelectorAll(".js-icon-" + t).length > 0 || e.querySelectorAll(".icon-" + t).length > 0) && (e.querySelectorAll(".js-icon-" + t).length > 0 ? e.querySelectorAll(".js-icon-" + t) : e.querySelectorAll(".icon-" + t)).forEach((e=>{
                        e.onclick = e=>{
                            this.setButtonsSocialMedia(e, t)
                        }
                    }
                    ))
                }
                ))
            }
            getUrlCanonica() {
                return this.data.url.split("?")[0]
            }
            setDataSocialMedia() {
                this.data.url = this.checkData("url") ? this.data.url : this.getContent(this.metaUrl),
                this.data.title = this.checkData("title") ? this.data.title : this.getContent(this.metaTitle),
                this.data.titleTwitter = this.getContent(this.metaTitleTwitter) || this.data.title,
                this.data.summary = this.checkData("summary") ? this.data.summary : this.getContent(this.metaSummary),
                this.data.img = this.checkData("img") ? this.data.img : this.getContent(this.metaImg)
            }
            checkData(e) {
                return this.data && this.data.hasOwnProperty(e) && "" !== this.data[e] && void 0 !== this.data[e]
            }
            getContent(e) {
                return e && e.content ? e.content : ""
            }
            setButtonsSocialMedia(e, t) {
                switch ("mail" !== t && e && e.preventDefault(),
                t) {
                case "facebook":
                    this.handleClickFacebook();
                    break;
                case "twitter":
                    this.handleClickTwitter();
                    break;
                case "mail":
                    this.handleClickEmail();
                    break;
                case "whatsapp":
                    this.handleClickWhatsapp();
                    break;
                case "telegram":
                    this.handleClickTelegram()
                }
            }
            handleClickFacebook() {
                let e = "https://www.facebook.com/sharer/sharer.php?u=" + this.data.url;
                window.open(e, "FacebookSharedDialog", "menubar=no,toolbar=no,resizable=yes,scrollbars=yes,height=600,width=600"),
                this.sendAnalytics("facebook")
            }
            handleClickTwitter() {
                let e = "https://twitter.com/intent/tweet?original_referer=" + encodeURIComponent(this.data.url) + "&related=" + encodeURIComponent(this.data.viaTwitter) + "&text=" + encodeURIComponent(this.data.titleTwitter) + "&tw_p=tweetbutton&url=" + encodeURIComponent(this.data.url);
                window.open(e, "twitterShareDialog", "width=626,height=436"),
                this.sendAnalytics("twitter")
            }
            handleClickEmail() {
                this.sendAnalytics("mail")
            }
            handleClickWhatsapp() {
                let e = "whatsapp://send?text=" + this.data.title + " | ELMUNDO - " + this.data.url;
                window.open(e),
                this.sendAnalytics("whatsapp")
            }
            handleClickTelegram() {
                let e = this.data.url + "?cid=TELEM01"
                  , t = this.data.title + " | ELMUNDO"
                  , n = "https://t.me/share/url?url=" + encodeURIComponent(e) + "&text=" + encodeURIComponent(t);
                window.open(n),
                this.sendAnalytics("telegram")
            }
            sendAnalytics(e) {
                "function" == typeof envioEventoRedSocial && e && envioEventoRedSocial(this.data.sufijoAnalitica ? e + this.data.sufijoAnalitica : e)
            }
        }
        class n {
            constructor(e, t) {
                this.headerAttributes = {
                    classTitle: "",
                    classSection: "",
                    isMobile: !1
                },
                this._SCROLL = {
                    UP: -1,
                    DOWN: 1
                },
                this.scrollDirection = 1,
                this.scrollPrevState = 1,
                this.headerElement = null,
                this.isHeaderFixed = !1,
                this.headerHeight = "",
                this.headerPadding = "",
                this.headerTopStart = 0,
                this.headerTopFinal = 0,
                this.scrollTop = "",
                this.sectionContent,
                this.newsTitle,
                this.delayScroll = 100,
                this.delayScrollInit = 450,
                this.delayScrollStop,
                this.delayScrollCount = 0,
                this.isHeaderOrientationChanged = !1,
                e && this.init(e, t)
            }
            init(e, t) {
                this.headerElement = e,
                this.headerAttributes = Object.assign({}, this.headerAttributes, t),
                this.headerPadding = document.createElement("div"),
                this.headerAttributes.isMobile || this.headerElement.append(this.headerPadding),
                this.sectionContent = this.headerAttributes.classSection ? document.querySelector(this.headerAttributes.classSection) : null,
                this.newsTitle = this.headerAttributes.classTitle ? document.querySelector(this.headerAttributes.classTitle) : null,
                this.headerHeight = this.headerElement.clientHeight,
                this.setHeaderElementStartFixed(".js-desdefixed"),
                this.setHeaderElementFinalFixed(".js-hastafixed"),
                this.headerElement.addEventListener("setFixedTitle", this.setNewsTitle.bind(this)),
                this.headerElement.addEventListener("setFixedSection", this.setSectionContent.bind(this)),
                window.addEventListener("scroll", this.handleScrollEvent.bind(this))
            }
            setHeaderElementStartFixed(e) {
                if (void 0 === this.headerTopStart || null === this.headerTopStart || !e)
                    return;
                const t = this.headerElement.querySelector(e);
                this.headerTopStart = t ? t.offsetTop : 0
            }
            setHeaderElementFinalFixed(e) {
                if (void 0 === this.headerTopFinal || null === this.headerTopFinal || !e)
                    return;
                const t = this.headerElement.querySelector(e);
                this.headerTopFinal = t ? t.offsetTop : 0
            }
            setNewsTitle(e) {
                e && e.detail && (this.newsTitle = e.detail.querySelector("article h1.js-headline"))
            }
            setSectionContent(e) {
                e && e.detail && (this.sectionContent = e.detail.querySelector(".js_seccionPortadilla"))
            }
            getScrollDirection() {
                return this.scrollTop = window.scrollY,
                this.handleScrollChangeOrientation(),
                this.scrollPrevState > this.scrollTop && (this.scrollDirection = this._SCROLL.UP),
                this.scrollPrevState < this.scrollTop && (this.scrollDirection = this._SCROLL.DOWN),
                this.scrollPrevState = this.scrollTop,
                this.scrollDirection
            }
            handleScrollChangeOrientation() {
                this.delayScrollInit > this.scrollTop || (this.scrollDirection === this._SCROLL.DOWN && this.scrollPrevState > this.scrollTop && (this.isHeaderOrientationChanged = !0,
                this.delayScrollCount = this.scrollTop,
                this.delayScrollStop = Math.abs(this.scrollTop - this.delayScroll)),
                this.scrollDirection === this._SCROLL.UP && this.scrollPrevState < this.scrollTop && (this.isHeaderOrientationChanged = !0,
                this.delayScrollCount = this.scrollTop,
                this.delayScrollStop = this.scrollTop + this.delayScroll))
            }
            setHeaderRemoveFix() {
                this.headerElement && this.headerPadding && (this.headerPadding.style.paddingTop = "0px",
                this.headerElement.classList.remove("fixed-down", "fixed-up", "fixed-section", "fixed-title-news"),
                this.isHeaderFixed = !1)
            }
            setHeaderFixScrollDirectionDown() {
                this.headerElement && this.headerPadding && (this.headerPadding.style.paddingTop = `${this.headerHeight}px`,
                this.headerElement.classList.remove("fixed-up"),
                this.headerElement.classList.add("fixed-down"),
                this.isHeaderFixed = !0,
                this.headerElement.dispatchEvent(new Event("setHeightToggle")))
            }
            setHeaderFixScrollDirectionUp() {
                this.headerElement && (this.headerElement.classList.remove("fixed-down"),
                this.headerElement.classList.add("fixed-up"),
                this.headerElement.dispatchEvent(new Event("setHeightToggle")))
            }
            setHeaderFixScrollOnNewsContent(e) {
                e ? this.headerElement.classList.add("fixed-title-news") : this.headerElement.classList.remove("fixed-title-news")
            }
            setHeaderFixScrollOnCoverContent(e) {
                e ? this.headerElement.classList.add("fixed-section") : this.headerElement.classList.remove("fixed-section")
            }
            handleHeaderFixScrollDirectionDown() {
                if (!this.isHeaderFixed && this.scrollTop > this.headerTopStart && this.setHeaderFixScrollDirectionDown(),
                this.isHeaderFixed)
                    if (this.headerElement.classList.contains("fixed-up") && this.isHeaderOrientationChanged) {
                        if (this.delayScrollCount >= this.delayScrollStop)
                            return this.isHeaderOrientationChanged = !1,
                            void this.setHeaderFixScrollDirectionDown();
                        this.delayScrollCount = this.scrollTop
                    } else
                        this.headerElement.classList.contains("fixed-up") && this.setHeaderFixScrollDirectionDown()
            }
            handleHeaderFixScrollDirectionUp() {
                if (this.headerElement.classList.contains("fixed-down") && this.isHeaderOrientationChanged)
                    return this.delayScrollCount <= this.delayScrollStop ? (this.isHeaderOrientationChanged = !1,
                    void this.setHeaderFixScrollDirectionUp()) : void (this.delayScrollCount = this.scrollTop);
                this.headerElement.classList.contains("fixed-down") && this.setHeaderFixScrollDirectionUp()
            }
            handleHeaderFixScrollOnNewsContent() {
                this.headerElement.classList.contains("fixed-title-news") && this.newsTitle.offsetTop + this.newsTitle.clientHeight > this.headerElement.clientHeight + window.scrollY && this.setHeaderFixScrollOnNewsContent(!1),
                !this.headerElement.classList.contains("fixed-title-news") && this.newsTitle.offsetTop + this.newsTitle.clientHeight <= this.headerElement.clientHeight + this.scrollTop && this.setHeaderFixScrollOnNewsContent(!0)
            }
            handleHeaderFixScrollOnCoverContent() {
                this.headerElement.classList.contains("fixed-section") && this.sectionContent.offsetTop + 10 > this.headerElement.clientHeight + this.scrollTop - this.sectionContent.clientHeight && this.setHeaderFixScrollOnCoverContent(!1),
                !this.headerElement.classList.contains("fixed-section") && this.sectionContent.offsetTop <= this.headerElement.clientHeight + this.scrollTop && this.setHeaderFixScrollOnCoverContent(!0)
            }
            handleScrollEvent() {
                if (this.scrollDirection = this.getScrollDirection(),
                this.scrollDirection === this._SCROLL.DOWN)
                    this.handleHeaderFixScrollDirectionDown();
                else if (this.scrollDirection === this._SCROLL.UP && this.isHeaderFixed) {
                    if (window.resizeBreadcrumb && this.headerElement.classList.contains("fixed-up") && (window.resizeBreadcrumb = !1),
                    this.scrollTop <= this.headerTopFinal)
                        return void this.setHeaderRemoveFix();
                    this.handleHeaderFixScrollDirectionUp()
                }
                this.isHeaderFixed && this.newsTitle && this.handleHeaderFixScrollOnNewsContent(),
                this.isHeaderFixed && void 0 !== this.sectionContent && this.sectionContent && this.handleHeaderFixScrollOnCoverContent()
            }
        }
        window.RedesSociales = function(e, n) {
            return new t(e,n)
        }
        ,
        window.LoadingPlaceholder = new class {
            constructor() {
                this.classNodeToClone = ".loading-module",
                this.classTitle = ".js_navTitulo",
                this.classLoading = "js-cont",
                this.classObjectLoading = "",
                this.classNoVisible = "no-visible",
                this.loadingNodeOrig,
                this.showNothing = !1
            }
            init(e) {
                return e && document.querySelectorAll("." + e).length ? (this.classObjectLoading = e,
                this.loadingNodeOrig = this.cloneLoadingNode(),
                1) : (this.showNothing = !0,
                -1)
            }
            setInnerHtml(e) {
                Array.from(e.querySelectorAll("script")).forEach((e=>{
                    const t = document.createElement("script");
                    Array.from(e.attributes).forEach((e=>t.setAttribute(e.name, e.value)));
                    let n = e.innerHTML.replace(/(<!\[CDATA\[)|(]]>)/g, "");
                    t.appendChild(document.createTextNode(n)),
                    e.parentNode.replaceChild(t, e)
                }
                ))
            }
            createDefaultElement() {
                return document.createElement("div")
            }
            cloneLoadingNode() {
                let e = document.querySelector(this.classNodeToClone);
                return e ? (e.classList.remove(this.classNoVisible),
                e) : this.createDefaultElement()
            }
            showLoading(e, t) {
                if (this.showNothing)
                    return;
                if (!document.querySelector("." + this.classLoading)) {
                    this.loadingNodeOrig.classList.add(this.classLoading);
                    let t = document.querySelectorAll("." + this.classObjectLoading);
                    1 === e && t[t.length - 1].after(this.loadingNodeOrig),
                    0 === e && t[0].before(this.loadingNodeOrig)
                }
                let n = document.querySelector("." + this.classLoading + " " + this.classTitle);
                n && (n.innerText = t)
            }
            hideLoading() {
                !this.showNothing && this.classLoading && document.querySelector("." + this.classLoading).remove()
            }
            replaceLoading(e) {
                if (this.showNothing || !e || !this.classLoading)
                    return;
                let t = "object" == typeof e && e.length ? e[0] : e;
                this.setInnerHtml(t),
                document.querySelector("." + this.classLoading).parentNode.replaceChild(t, document.querySelector("." + this.classLoading))
            }
        }
        ,
        window.Accordion = new class {
            constructor() {}
            click(e, t, n) {
                if (e && e.parentNode) {
                    let i = e.parentNode;
                    if (n && (i = e.closest(n) || i),
                    i.classList.contains(t)) {
                        i.classList.remove(t),
                        e.setAttribute("aria-hidden", "true");
                        let n = e.getAttribute("data-ue-analytics");
                        n && "function" == typeof window.envioSC && window.envioSC(n)
                    } else
                        i.classList.add(t),
                        e.setAttribute("aria-hidden", "false")
                }
            }
        }
        ,
        window.Autoplay = new class {
            constructor() {
                this.observer = null,
                this.pipDiv = null
            }
            detectIntersectAndUnobserve(e, t, n) {
                e && "IntersectionObserver"in window && (this.observer = new IntersectionObserver(this.intersectionAction.bind({
                    root: this,
                    callback: t,
                    videoConfig: n,
                    elem: e
                })),
                this.observer.observe && this.observer.observe(e))
            }
            intersectionAction(e) {
                const t = this.root || this;
                e?.map((e=>{
                    e.isIntersecting && t.intersectingUnobserver(e, this.callback, this.videoConfig, this.elem)
                }
                ))
            }
            intersectingUnobserver(e, t, n, i) {
                if ("function" == typeof t) {
                    let e = document.getElementById(i?.id)?.parentElement || null
                      , o = e ? e.querySelector("img") : null;
                    o && (o.style.display = "none"),
                    t(n)
                }
                this.observer?.unobserve(e.target)
            }
            manageAutoplay(e, t) {
                if ("IntersectionObserver"in window) {
                    if (e && e.hasOwnProperty("pipVideoId") && t) {
                        let n = document.getElementById(e.pipVideoId);
                        if (n)
                            this.detectIntersectAndUnobserve(n, t, e);
                        else if ("complete" !== document.readyState)
                            document.addEventListener("readystatechange", (()=>{
                                if ("complete" === document.readyState) {
                                    let n = document.getElementById(e.pipVideoId);
                                    n && t && "function" == typeof this.detectIntersectAndUnobserve && this.detectIntersectAndUnobserve(n, t, e)
                                }
                            }
                            ));
                        else {
                            let n = ()=>{
                                let i = document.getElementById(e.pipVideoId);
                                i && t && "function" == typeof this.detectIntersectAndUnobserve && (this.detectIntersectAndUnobserve(i, t, e),
                                document.removeEventListener("nc-contentLoaded", n))
                            }
                            ;
                            document.addEventListener("nc-contentLoaded", n)
                        }
                    }
                } else
                    e && t && t(e)
            }
            initializePip(e, t, n) {
                if (window.isPipActive && window.isPipActive !== e)
                    return;
                window.isPipActive = e;
                let i = 0
                  , o = document.getElementById(`${e}_parent`) || null
                  , r = o && o.querySelector(".ue-c-video-player-frame") || null
                  , s = r && r.querySelector(".ue-c-video-player-frame__button") || null
                  , a = e ? e.replace(/video_[^_]*_/, "") : null;
                const l = o && o.querySelector(`#${e}`) || null;
                o && l && r && s && (window.pipKalturaState || (window.pipKalturaState = {}),
                a && (window.pipKalturaState[a] = "fixed"),
                s && s.addEventListener("click", this.closePipe.bind({
                    root: this,
                    pipDivToObserve: o,
                    floatingDiv: r,
                    videoConfig: t,
                    origFunction: n
                })),
                l.kBind("playerStateChange", (e=>{
                    this.onPlayerStateChange(e)
                }
                )),
                l.kBind("onAdPlay", this.onAdPlay),
                l.kBind("playerPlayEnd", (e=>{
                    this.onPlayerPlayEnd(r, a)
                }
                )),
                l.kBind("mediaError", (e=>{
                    this.onMediaError(r, o)
                }
                )),
                window.stickyObserver = new IntersectionObserver(((e,t)=>{
                    e.map((e=>{
                        e.isIntersecting && r && (this.toggleViewPip(r, !1),
                        a && (window.pipKalturaState[a] = "original")),
                        0 == e.intersectionRatio && e.boundingClientRect.top < i && r && ("paused" === window.lastStickyPlayerState || (this.toggleViewPip(r, !0),
                        a && (window.pipKalturaState[a] = "pip"))),
                        i = e.boundingClientRect.top
                    }
                    ))
                }
                )),
                window.stickyObserver.observe(o))
            }
            onPlayerStateChange(e) {
                e && (window.lastStickyPlayerState = e)
            }
            onAdPlay() {
                window.lastStickyPlayerState = "advertising "
            }
            onPlayerPlayEnd(e, t) {
                setTimeout((()=>{
                    this.toggleViewPip(e, !1),
                    t && (window.pipKalturaState[t] = "original")
                }
                ), 3e3)
            }
            onMediaError(e, t) {
                this.toggleViewPip(e, !1),
                window.stickyObserver && window.stickyObserver.unobserve(t)
            }
            closePipe(e) {
                const t = this.root || this;
                e.preventDefault(),
                e.stopPropagation(),
                t.toggleViewPip(this.floatingDiv, !1),
                this.pipDiv?.sendNotification("stop"),
                t.destroyPip(this.videoConfig, this.origFunction, this.pipDivToObserve)
            }
            toggleViewPip(e, t) {
                t ? e && e.classList.add("ue-c-video-player-frame--pip") : e && (e.classList.remove("ue-c-video-player-frame--pip"),
                e.style.removeProperty("padding-bottom"))
            }
            destroyPip(e, t, n) {
                if (window.stickyObserver && window.stickyObserver.unobserve(n),
                kWidget) {
                    let n = !0;
                    kWidget.destroy(),
                    "function" == typeof t && t(e, n)
                }
            }
            subscribePip(e, t) {
                let n = i=>{
                    if (e && t && i) {
                        let o = i.detail.playerId;
                        e.hasOwnProperty("pipVideoId") && o == e.pipVideoId && (this.initializePip(o, e, t),
                        window.removeEventListener("KalturaPlayerReady", n))
                    }
                }
                ;
                window.addEventListener("KalturaPlayerReady", n)
            }
        }
        ,
        window.Comentarios = class {
            constructor(e) {
                this.disableScrollClass = this.isIOS() ? "disabled-vscroll" : "disable-vscroll",
                this.mainContainer = null,
                this.commentButtons = [],
                this.popup = null,
                this.rightPanel = null,
                this.panelActive = !1,
                this.animation = null,
                this.currentScroll = 0,
                this.initData(e),
                this.addListeners()
            }
            isIOS() {
                return /iPad|iPhone|iPod/.test(navigator.userAgent) && !window.MSStream
            }
            initData(e) {
                if (e && e.newsId && (this.mainContainer = document.querySelector("#js_" + e.newsId),
                this.commentButtons = Array.from(document.querySelectorAll(e.botonesDesplegar + "-" + e.newsId)),
                this.mainContainer)) {
                    this.popup = this.mainContainer.querySelector(".js-popup"),
                    this.rightPanel = this.mainContainer.querySelector(".js-right-panel"),
                    this.rightPanel && this.rightPanel.classList.add("no-visible");
                    var t = this.mainContainer.querySelector(".boton-volver");
                    t && this.commentButtons.push(t)
                }
            }
            addListeners() {
                this.mainContainer && (this.commentButtons.forEach((e=>{
                    e.addEventListener("click", (e=>{
                        e.preventDefault(),
                        this.toggleComments()
                    }
                    ))
                }
                )),
                this.popup && this.popup.addEventListener("click", (()=>{
                    this.toggleComments()
                }
                )))
            }
            toggleComments() {
                !this.mainContainer || !this.rightPanel || this.animation && "finished" !== this.animation.playState || (this.mainContainer.querySelectorAll(".js-comentarios").forEach((e=>{
                    e.classList.remove("no-visible")
                }
                )),
                this.panelActive ? (this.animation = this.rightPanel.animate([{
                    right: "0px",
                    opacity: 1
                }, {
                    right: `-${this.rightPanel.offsetWidth}px`,
                    opacity: 0
                }], {
                    duration: 300,
                    fill: "forwards"
                }),
                this.animation.finished.then((()=>{
                    window.scrollTo(0, this.currentScroll),
                    this.mainContainer.querySelectorAll(".fixed-button, .js-comentar").forEach((e=>{
                        e.style.position = "absolute"
                    }
                    )),
                    this.mainContainer.querySelectorAll(".js-comentar").forEach((e=>{
                        e.classList.remove("show")
                    }
                    )),
                    this.rightPanel.classList.add("no-visible")
                }
                ))) : (this.currentScroll = window.scrollY,
                this.rightPanel.classList.remove("no-visible"),
                this.animation = this.rightPanel.animate([{
                    right: `-${this.rightPanel.offsetWidth}px`,
                    opacity: 0
                }, {
                    right: "0px",
                    opacity: 1
                }], {
                    duration: 300,
                    fill: "forwards"
                }),
                this.animation.finished.then((()=>{
                    this.mainContainer.querySelectorAll(".fixed-button, .js-comentar").forEach((e=>{
                        e.style.position = "fixed"
                    }
                    )),
                    this.mainContainer.querySelectorAll(".js-comentar").forEach((e=>{
                        e.classList.add("show")
                    }
                    ))
                }
                ))),
                this.panelActive = !this.panelActive,
                this.popup && this.popup.classList.toggle("no-visible"),
                document.body.classList.toggle(this.disableScrollClass))
            }
        }
        ,
        new class {
            constructor(e) {
                this.translations = e,
                this.contentsPublished = document.querySelectorAll("[data-publish]"),
                this.contentsPublished.length && this.getData()
            }
            getData() {
                this.contentsPublished.forEach((e=>{
                    if (this.isValidDate(e.dataset.publish)) {
                        let t = this.getDate(e.dataset.publish);
                        this.createNodo(e, t)
                    }
                }
                ))
            }
            isValidDate(e) {
                if (e) {
                    let t = new Date(e);
                    return t instanceof Date && !isNaN(t)
                }
                return !1
            }
            getDate(e) {
                let t = new Date
                  , n = new Date(e)
                  , i = Math.abs(Math.round((n.getTime() - t.getTime()) / 1e3));
                return this.getDateToString(i, n)
            }
            getDateToString(e, t) {
                let n = {
                    text: "",
                    resume: ""
                };
                if (e && t) {
                    n = {
                        text: this.translations.defaultText.text.replace("$day", t.getDate()).replace("$month", this.translations.months[t.getMonth()]).replace("$year", t.getFullYear()),
                        resume: this.translations.defaultText.text.replace("$day", t.getDate()).replace("$month", this.translations.months[t.getMonth()]).replace("$year", t.getFullYear())
                    };
                    const i = Object.keys(this.translations.texts).find((t=>e < t));
                    this.translations.texts[i] && (this.translations.texts[i].division && (e = Math.floor(e / this.translations.texts[i].division)),
                    n = {
                        text: this.translations.texts[i].text.replace("$value", e),
                        resume: this.translations.texts[i].resume.replace("$value", e)
                    })
                }
                return n
            }
            createNodo(e, t) {
                let n = document.createElement("span");
                n.setAttribute("aria-hidden", "true"),
                n.innerHTML = t.text;
                let i = document.createElement("span");
                i.classList.add("hidden-content"),
                i.innerHTML = t.resume,
                e.appendChild(n),
                e.appendChild(i)
            }
        }
        (e.dateCoolTranslations),
        new class {
            constructor() {
                "loading"in HTMLImageElement.prototype || this.addScript(),
                this.loadImages(),
                document.addEventListener("nc-contentLoaded", (()=>{
                    this.loadImages()
                }
                ))
            }
            addScript() {
                let e = document.createElement("script");
                e.id = "lazysizes",
                e.src = "https://libs.unidadeditorial.es/js/lazysizes/5.1.2/lazysizes.min.js",
                document.body.appendChild(e)
            }
            loadImages() {
                "loading"in HTMLImageElement.prototype && document.querySelectorAll('img[loading="lazy"]').forEach((e=>{
                    if (e.dataset.changed || !e.dataset.src)
                        return;
                    e.src = e.dataset.src,
                    e.dataset.changed = !0,
                    e.removeAttribute("data-src");
                    const t = e.parentElement.querySelectorAll("source[data-srcset]");
                    t.length > 0 && t.forEach((e=>{
                        !e.dataset.changed && e.dataset.srcset && (e.srcset = e.dataset.srcset,
                        e.dataset.changed = !0,
                        e.removeAttribute("data-srcset"))
                    }
                    ))
                }
                ))
            }
        }
        ,
        new class {
            constructor(e, t) {
                this.element = e || null,
                this.fixedHeader = t.fixedHeader || !1,
                this.titleSelector = t.titleSelector || "",
                this.sectionSelector = t.sectionSelector || "",
                this.isMobile = t.isMobile || !1,
                this.fixedHeader && "function" == typeof n && (this.fixedHeader = new n(this.element,{
                    classTitle: this.titleSelector,
                    classSection: this.sectionSelector,
                    isMobile: this.isMobile
                })),
                window.addEventListener("changeHeaderEnergize", this.changeHeader.bind(this))
            }
            setCustomClasses(e) {
                var t = document.querySelector("header[data-ue-model]");
                if (t && e) {
                    e = e.trim();
                    let n = t.getAttribute("data-ue-model").trim();
                    t.setAttribute("data-ue-model", e),
                    n && t.classList.remove(...n.split(" ")),
                    e && t.classList.add(...e.split(" "))
                }
            }
            resetFixedSection(e) {
                if (e) {
                    e.classList.remove("fixed-section");
                    let t = new CustomEvent("setFixedSection",{
                        detail: e
                    });
                    e.dispatchEvent(t)
                }
            }
            resetFixedTitle(e) {
                if (e) {
                    e.classList.remove("fixed-title-news");
                    let t = new CustomEvent("setFixedTitle",{
                        detail: e
                    });
                    e.dispatchEvent(t)
                }
            }
            changeHeader(e) {
                if (e && e.detail) {
                    this.setCustomClasses([e.detail.classContNav, e.detail.section].join(" "));
                    let t = document.querySelector(`[data-ue-navindex="${e.detail.indexActual}"]`);
                    this.resetFixedTitle(t),
                    this.resetFixedSection(t)
                }
            }
        }
        (document.querySelector(".js-cnav-header"),{
            titleSelector: "article h1.js-headline",
            sectionSelector: ".js_seccionPortadilla",
            isMobile: !0
        }),
        document.querySelectorAll("main").forEach((e=>e.classList.add("nc-active-content"))),
        document.addEventListener("nc-urlChanged", (e=>{
            e?.detail?.newsId && (document.querySelectorAll("main").forEach((e=>e.classList.remove("nc-active-content"))),
            document.querySelector(`#${e.detail.newsId}`).classList.add("nc-active-content"))
        }
        )),
        window.dispatchEvent(new CustomEvent("we-Autoplay")),
        window.dispatchEvent(new CustomEvent("ue-launcher-ready"))
    }
    )()
}
)();
