/*!
 *
 * 	@aerisweather/javascript-sdk - 1.8.4
 * 	(c) 2024 AerisWeather
 * 	License: BSD
 * 	https://www.aerisweather.com/support/docs/toolkits/aeris-js-sdk/
 *
 */
(this.webpackJsonp = this.webpackJsonp || []).push([["aerisweather.maps.common"], {
            "5ID0": function (t, e, s) {
                "use strict";
                var i = s("7r+a");
                var a = s("0lfv");
                e.a = class {
                    get geometry() {
                        return this._geometry
                    }
                    get coordinates() {
                        if (this.geometry)
                            return this.geometry.coordinates
                    }
                    constructor() {
                        let t = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : {};
                        t.type && t.coordinates && (t = {
                                type: "Feature",
                                geometry: t,
                                properties: t.properties
                            }),
                        Object(a.isEmpty)(t.geometry) || (this._geometry = (t => {
                                const e = t.type,
                                s = t.coordinates;
                                let a;
                                switch (e) {
                                case "Point":
                                    a = new i.e(s);
                                    break;
                                case "MultiPoint":
                                    a = new i.c(s);
                                    break;
                                case "LineString":
                                    a = new i.a(s);
                                    break;
                                case "MultiLineString":
                                    a = new i.b(s);
                                    break;
                                case "Polygon":
                                    a = new i.f(s);
                                    break;
                                case "MultiPolygon":
                                    a = new i.d(s);
                                    break;
                                default:
                                    a = null
                                }
                                return a
                            })(t.geometry), this.properties = t.properties || {}, t.id && (this.id = "".concat(t.id)))
                    }
                }
            },
            "5kaa": function (t, e, s) {
                "use strict";
                s.d(e, "b", (function () {
                        return Rt
                    }));
                s("UxlC");
                var i = s("m0x2"),
                a = s("dqFL");
                const r = 'Weather data &copy; <a href="https://www.xweather.com/" target="_blank">Vaisala Xweather</a>';
                var o = s("l1hk"),
                n = (s("3bBZ"), s("gqGf")),
                h = s("0lfv"),
                l = s("8TS8");
                const c = {};
                class d extends i.a {
                    constructor(t, e) {
                        super(),
                        this._setInitialView = !0,
                        this._ready = !1,
                        e = Object(h.extend)({
                            zoom: 7
                        }, e),
                        this._opts = e,
                        this._sources = {},
                        this._sourceOrder = [];
                        const s = this.strategy;
                        c[s] || (c[s] = {
                                loading: !1,
                                callbacks: []
                            }),
                        c[s].loading ? c[s].callbacks.push((() => {
                                this.init(t)
                            })) : (c[s].loading = !0, this.loadDependencies().then((() => {
                                    c[s].loading = !1,
                                    this.init(t),
                                    c[s].callbacks.forEach((t => t())),
                                    c[s].callbacks = [],
                                    delete c[s]
                                })))
                    }
                    get strategy() {
                        throw new Error("[Aeris] Subclasses must override `strategy`.")
                    }
                    get $el() {
                        return null
                    }
                    get map() {
                        return this._map
                    }
                    get factory() {
                        return this._factory
                    }
                    get sources() {
                        return Object.keys(this._sources).map((t => this._sources[t]))
                    }
                    get opts() {
                        return this._opts
                    }
                    isReady() {
                        return this._ready
                    }
                    init(t) {
                        this.setupMap(t);
                        const e = {};
                        if (Object(h.isset)(this._opts.zoom) && (e.zoom = this._opts.zoom), this._opts.center && (e.center = {
                                    lat: this._opts.center.lat,
                                    lon: this._opts.center.lon
                                }), !this._factory)
                            throw new Error("Cannot initialize map, overlay factory is undefined.");
                        if (this._setupEvents(), this._setInitialView) {
                            const t = Object(h.isset)(e.zoom) ? Math.max(0, e.zoom) : 8, {
                                lat: s,
                                lon: i
                            } = e.center || {};
                            Object(h.isset)(s) && Object(h.isset)(i) ? this.setView({
                                lat: parseFloat(s),
                                lon: parseFloat(i)
                            }, t) : t > 0 && this.setZoom(t)
                        }
                        this.on("map:ready", (() => {
                                this._ready = !0,
                                this.trigger("ready")
                            }))
                    }
                    loadDependencies() {
                        return null
                    }
                    setupMap(t) {
                        throw new Error("Subclasses of MapStrategy must override setupMap()")
                    }
                    setView(t, e) {
                        throw new Error("Subclasses of MapStrategy must override setView()")
                    }
                    getCenter() {
                        throw new Error("Subclasses of MapStrategy must override getCenter()")
                    }
                    setCenter(t) {
                        throw new Error("Subclasses of MapStrategy must override setCenter()")
                    }
                    getZoom() {
                        throw new Error("Subclasses of MapStrategy must override getZoom()")
                    }
                    setZoom(t) {
                        throw new Error("Subclasses of MapStrategy must override setZoom()")
                    }
                    getBounds() {
                        throw new Error("Subclasses of MapStrategy must override getBounds()")
                    }
                    setBounds(t) {
                        throw new Error("Subclasses of MapStrategy must override setBounds()")
                    }
                    fitBounds(t, e) {
                        throw new Error("Subclasses of MapStrategy must override fitBounds()")
                    }
                    addSource(t) {
                        const e = t.identifier;
                        this._sources[e] = t,
                        this.isTile(t) ? (this._sourceOrder.push(e), t.dataSource = this, this.addOverlay(t.overlay), t.on("layer:add", (t => {
                                    this.addOverlay(t.data.layer)
                                })), t.on("layer:remove", (t => {
                                    this.removeOverlay(t.data.layer)
                                }))) : this.isVector(t) && (t.on("markers:add", (t => {
                                    const {
                                        markers: e,
                                        animation: s
                                    } = t.data;
                                    e && this.addMarkers(e)
                                })), t.on("markers:remove", (t => {
                                    const {
                                        markers: e
                                    } = t.data;
                                    e && this.removeMarkers(e)
                                })), t.on("markers:update", (t => {
                                    (t.data.markers || []).forEach((t => {
                                            const {
                                                id: e,
                                                renderable: s,
                                                value: i,
                                                style: a
                                            } = t;
                                            i && this.updateMarker(s, {
                                                data: {
                                                    value: i
                                                },
                                                style: a.marker || a
                                            }, e)
                                        }))
                                })), t.on("shapes:add", (t => {
                                    const {
                                        shapes: e,
                                        animation: s
                                    } = t.data;
                                    e && (s ? this.showShapes(e) : this.addShapes(e))
                                })), t.on("shapes:remove", (t => {
                                    const {
                                        shapes: e,
                                        animation: s
                                    } = t.data;
                                    e && (s ? this.hideShapes(e) : this.removeShapes(e))
                                })))
                    }
                    removeSource(t) {
                        const e = t.identifier;
                        if (this.isTile(t)) {
                            t.remove();
                            const s = this._sourceOrder.indexOf(e);
                            s >= 0 && this._sourceOrder.splice(s, 1)
                        } else
                            this.isVector(t) && (this.removeMarkers(t.markers), this.removeShapes(t.shapes));
                        t.strategy = null,
                        delete this._sources[e]
                    }
                    isTile(t) {
                        return !1
                    }
                    isVector(t) {
                        return t instanceof n.d
                    }
                    isText(t) {
                        return t instanceof n.b
                    }
                    isMarker(t) {
                        return !1
                    }
                    isPolygon(t) {
                        return !1
                    }
                    isPolyline(t) {
                        return !1
                    }
                    addOverlay(t) {
                        throw new Error("Subclasses of MapStrategy must override addOverlay()")
                    }
                    addOverlays(t) {
                        (t || []).forEach((t => this.addOverlay(t)))
                    }
                    removeOverlay(t) {
                        throw new Error("Subclasses of MapStrategy must override removeOverlay()")
                    }
                    removeOverlays(t) {
                        (t || []).forEach((t => this.removeOverlay(t)))
                    }
                    addMarker(t, e) {
                        if (t instanceof l.d) {
                            if (t.renderable) {
                                if (t.style && t.style.callout) {
                                    const e = t.style.callout,
                                    s = Object(h.isFunction)(e) ? e(t.data) : e;
                                    this.bindCalloutToMarker(t.renderable, s)
                                }
                                this.addMarker(t.renderable, t.data)
                            }
                        } else if (Object(h.isPlainObject)(t)) {
                            t.style = t.style || {};
                            const {
                                renderable: e,
                                data: s,
                                style: {
                                    callout: i
                                }
                            } = t;
                            if (e) {
                                if (i) {
                                    const e = Object(h.isFunction)(i) ? i(s) : i;
                                    this.bindCalloutToMarker(t.renderable, e)
                                }
                                this.addMarker(e, s)
                            }
                        }
                    }
                    addMarkers(t) {
                        (t || []).forEach((t => this.addMarker(t)))
                    }
                    removeMarker(t) {
                        if (t instanceof l.d)
                            t.renderable && this.removeMarker(t.renderable);
                        else if (Object(h.isPlainObject)(t)) {
                            const {
                                renderable: e
                            } = t;
                            e && this.removeMarker(e)
                        }
                    }
                    removeMarkers(t) {
                        (t || []).forEach((t => this.removeMarker(t)))
                    }
                    updateMarker(t, e) {
                        let s = arguments.length > 2 && void 0 !== arguments[2] ? arguments[2] : null;
                        if (t instanceof l.d)
                            t.renderable && this.updateMarker(t.renderable, e, s);
                        else if (Object(h.isPlainObject)(t)) {
                            const {
                                renderable: i
                            } = t;
                            i && this.updateMarker(i, e, s)
                        }
                    }
                    bindCalloutToMarker(t, e) {}
                    addShape(t, e) {
                        if (Object(h.isArray)(t))
                            this.addShapes(t, e);
                        else if (t instanceof l.d)
                            t.renderable && this.addShape(t.renderable, t.data || e);
                        else if (Object(h.isPlainObject)(t)) {
                            const {
                                renderable: e,
                                polygons: s,
                                polylines: i,
                                data: a
                            } = t;
                            s && this.addShapes(s, a),
                            i && this.addShapes(i, a),
                            e && this.addShape(e, a)
                        }
                    }
                    addShapes(t, e) {
                        (t || []).forEach((t => this.addShape(t, e)))
                    }
                    removeShape(t) {
                        if (Object(h.isArray)(t))
                            this.removeShapes(t);
                        else if (t instanceof l.d)
                            t.renderable && this.removeShape(t.renderable);
                        else if (Object(h.isPlainObject)(t)) {
                            const {
                                renderable: e,
                                polygons: s,
                                polylines: i
                            } = t;
                            s && this.removeShapes(s),
                            i && this.removeShapes(i),
                            e && this.removeShape(e)
                        }
                    }
                    removeShapes(t) {
                        (t || []).forEach((t => this.removeShape(t)))
                    }
                    showShape(t) {
                        if (Object(h.isArray)(t))
                            this.showShape(t);
                        else if (t instanceof l.d)
                            t.renderable && this.showShape(t.renderable);
                        else if (Object(h.isPlainObject)(t)) {
                            const {
                                shape: e,
                                polygons: s,
                                polylines: i
                            } = t;
                            s && this.showShapes(s),
                            i && this.showShapes(i),
                            e && this.showShape(e)
                        }
                    }
                    showShapes(t) {
                        (t || []).forEach((t => this.showShape(t)))
                    }
                    hideShape(t) {
                        if (Object(h.isArray)(t))
                            this.hideShape(t);
                        else if (t instanceof l.d)
                            t.renderable && this.hideShape(t.renderable);
                        else if (Object(h.isPlainObject)(t)) {
                            const {
                                shape: e,
                                polygons: s,
                                polylines: i
                            } = t;
                            s && this.hideShapes(s),
                            i && this.hideShapes(i),
                            e && this.hideShape(e)
                        }
                    }
                    hideShapes(t) {
                        (t || []).forEach((t => this.hideShape(t)))
                    }
                    showCallout(t, e, s) {}
                    coordToPoint(t) {
                        throw new Error("Subclasses of MapStrategy must override coordToPoint()")
                    }
                    pointToCoord(t) {
                        throw new Error("Subclasses of MapStrategy must override pointToCoord()")
                    }
                    clear() {}
                    _setupEvents() {
                        const t = this._eventMapping;
                        if (t) {
                            let e = "on";
                            Object(h.has)(this.map, e) || (Object(h.has)(this.map, "addEventListener") ? e = "addEventListener" : Object(h.has)(this.map, "addListener") && (e = "addListener")),
                            Object(h.has)(this.map, e) && Object.keys(t).forEach((s => {
                                    this.map[e](s, (e => {
                                            const i = this._dataForMapEvent(s, e);
                                            this._shouldTriggerEvent(s) && this.trigger(t[s], i)
                                        }))
                                }))
                        }
                    }
                    _shouldTriggerEvent(t) {
                        return !0
                    }
                    _dataForMapEvent(t, e) {
                        return null
                    }
                    tileLayer(t, e, s) {
                        if (!this.dataSource)
                            return null;
                        let i = Object(h.isset)(s.zIndex) ? s.zIndex : 1;
                        const a = this._sourceOrder.indexOf(t);
                        a >= 0 && (i = a + 1);
                        let r = Object(h.get)(s, "data.service");
                        r || (r = this.dataSource.requestForMap(t)),
                        r.param("format", Object(h.get)(s, "style.format") || "png");
                        return this.factory.tileLayer(t, r, Object(h.extend)(Object(h.cloneDeep)(s), {
                                time: e,
                                zIndex: i
                            }))
                    }
                }
                var u = d;
                class p extends i.a {
                    constructor(t, e) {
                        let s = arguments.length > 2 && void 0 !== arguments[2] ? arguments[2] : void 0;
                        super(),
                        this._opacity = 1,
                        this._hidden = !1,
                        this._events = ["click", "mouseover", "mouseout"],
                        this._idPrefix = "aeriswx",
                        this.id = s || t,
                        this._opts = Object(h.cloneDeep)(e),
                        this._opacity = Object(h.isset)(e.opacity) ? e.opacity : 1
                    }
                    get opts() {
                        return this._opts
                    }
                    get layerId() {
                        const t = this.id ? "-".concat(this.id) : "";
                        return "".concat(this._idPrefix).concat(t)
                    }
                    get map() {
                        return this._map
                    }
                    get renderable() {
                        return this._renderable
                    }
                    get opacity() {
                        return this._opacity
                    }
                    get isHidden() {
                        return this._hidden
                    }
                    addTo(t, e) {
                        this.map !== t && (this._map = t, this._targetIndex = e, this._renderable = this.createRenderable(), this.addToMap(t, e), this.trigger("map:add", {
                                map: t,
                                index: e
                            }))
                    }
                    remove() {
                        this.map && (this.removeFromMap(this.map), this._map = null, this.trigger("map:remove"))
                    }
                    show() {
                        this._hidden = !1,
                        this.updateVisibility(!0)
                    }
                    hide() {
                        this._hidden = !0,
                        this.updateVisibility(!1)
                    }
                    setOpacity(t) {
                        this._opacity = t
                    }
                    setZIndex(t) {
                        throw new Error("Subclasses of MapLayer should override setZIndex()")
                    }
                    exists() {
                        this.map;
                        return !1
                    }
                }
                var m = p;
                var g = class extends m {
                    invalidate() {}
                    createRenderable() {}
                    updateVisibility(t) {}
                    addToMap(t, e) {
                        this.renderable && this.renderable.addTo(t)
                    }
                    removeFromMap(t) {
                        this.renderable && this.renderable.remove()
                    }
                };
                var y = class extends g {
                    constructor(t, e) {
                        let s = arguments.length > 2 && void 0 !== arguments[2] ? arguments[2] : {};
                        super(t, s, arguments.length > 3 && void 0 !== arguments[3] ? arguments[3] : void 0),
                        this.setOpacity(s.fillOpacity),
                        this._polygons = e
                    }
                    setOpacity(t) {
                        super.setOpacity(t),
                        this.renderable && this.renderable.setStyle(Object.assign(Object.assign({}, this.opts), {
                                fillOpacity: this.opts.fillOpacity * t,
                                opacity: this.opts.opacity * t
                            }))
                    }
                    addToMap(t, e) {
                        this.renderable.off(),
                        this.renderable.on("click", (() => this.trigger("click", {
                                    data: this.data,
                                    shape: this.renderable
                                }))),
                        this.renderable.on("mouseover", (() => this.trigger("mouseover", {
                                    data: this.data,
                                    shape: this.renderable
                                }))),
                        this.renderable.on("mouseout", (() => this.trigger("mouseout", {
                                    data: this.data,
                                    shape: this.renderable
                                }))),
                        super.addToMap(t, e)
                    }
                    removeFromMap(t) {
                        this.renderable.off(),
                        this.renderable.remove()
                    }
                    createRenderable() {
                        const t = [];
                        return this._polygons.forEach((e => {
                                const s = e.outer,
                                i = e.inner ? e.inner : [];
                                t.push([s, ...i])
                            })),
                        L.polygon(t, Object.assign(Object.assign({}, this.opts), {
                                fillOpacity: this.opts.fillOpacity * this.opacity,
                                opacity: this.opts.opacity * this.opacity
                            }))
                    }
                };
                var f = class extends g {
                    constructor(t, e) {
                        super(t, arguments.length > 2 && void 0 !== arguments[2] ? arguments[2] : {}, arguments.length > 3 && void 0 !== arguments[3] ? arguments[3] : void 0),
                        this._points = e
                    }
                    setOpacity(t) {
                        super.setOpacity(t),
                        this.renderable && this.renderable.setStyle(Object.assign(Object.assign({}, this.opts), {
                                opacity: t
                            }))
                    }
                    addToMap(t, e) {
                        this.renderable.off(),
                        this.renderable.on("click", (() => this.trigger("click", {
                                    data: this.data,
                                    shape: this.renderable
                                }))),
                        this.renderable.on("mouseover", (() => this.trigger("mouseover", {
                                    data: this.data,
                                    shape: this.renderable
                                }))),
                        this.renderable.on("mouseout", (() => this.trigger("mouseout", {
                                    data: this.data,
                                    shape: this.renderable
                                }))),
                        super.addToMap(t, e)
                    }
                    removeFromMap(t) {
                        this.renderable.off(),
                        this.renderable.remove()
                    }
                    createRenderable() {
                        return L.polyline(this._points, Object.assign(Object.assign({}, this.opts), {
                                opacity: this.opacity
                            }))
                    }
                };
                class b extends i.a {
                    get map() {
                        return this._map
                    }
                    get renderable() {
                        return this._renderable
                    }
                    constructor(t, e, s) {
                        let i = arguments.length > 3 && void 0 !== arguments[3] ? arguments[3] : void 0;
                        super(),
                        this._hidden = !1,
                        this._events = ["click", "mouseover", "mouseout"],
                        this.id = i,
                        this.coordinate = t,
                        this.data = e,
                        this.opts = Object.assign({}, s)
                    }
                    get isHidden() {
                        return this._hidden
                    }
                    addTo(t, e) {
                        this.map !== t && (this._map = t, this._renderable || (this._renderable = this.createRenderable()), this.addToMap(t, e), this.trigger("map:add", {
                                map: t,
                                index: e
                            }))
                    }
                    remove() {
                        this.map && (this.removeFromMap(this.map), this._map = null, this.trigger("map:remove"))
                    }
                    update(t) {}
                    setStyle(t) {}
                    invalidate() {
                        const t = this.map;
                        this.remove(),
                        this._renderable = this.createRenderable(),
                        this.addTo(t)
                    }
                }
                var v = b;
                const _ = (t, e, s, i) => {
                    let a = 0,
                    r = 0;
                    if (i = Object(h.extend)({
                            x: 0,
                            y: 0
                        }, i), Object(h.isString)(t)) {
                        const i = t;
                        a = (s.width - e.width) / 2,
                        r = (s.height - e.height) / 2,
                        /^top/.test(i) ? r = 0 : /^bottom/.test(i) && (r = s.height - e.height),
                        /left$/.test(i) ? a = 0 : /right$/.test(i) && (a = s.width - e.width)
                    } else {
                        const e = t;
                        a = e.x,
                        r = e.y
                    }
                    return a += i.x,
                    r += i.y, {
                        x: a,
                        y: r
                    }
                },
                O = t => {
                    const e = t.stroke ? Object.keys(t.stroke).reduce(((e, s) => {
                                const i = t.stroke[s];
                                return Object(h.isset)(i) && ("width" === s && (e += ' stroke-width="'.concat(i, '"')), "color" === s && (e += ' stroke="'.concat(i, '"')), "opacity" === s && (e += ' stroke-opacity="'.concat(i, '"'))),
                                e
                            }), "") : "",
                    s = t.fill ? Object.keys(t.fill).reduce(((e, s) => {
                                const i = t.fill[s];
                                return Object(h.isset)(i) && ("color" === s && (e += ' fill="'.concat(i, '"')), "opacity" === s && (e += ' fill-opacity="'.concat(i, '"'))),
                                e
                            }), "") : "";
                    return s || e ? "".concat(s).concat(e) : ""
                };
                var w,
                j;
                (j = w || (w = {})).calculateTextSize = (t, e, s, i) => {
                    let a = 0,
                    r = 0;
                    if (i = i || [0, 0], e = e || 12, window && window.document) {
                        const i = window.document,
                        o = i.createElement("text");
                        o.style.fontSize = Object(h.isString)(e) ? "".concat(e) : "".concat(e, "px"),
                        o.style.fontWeight = s || "normal",
                        o.style.visibility = "hidden",
                        o.innerHTML = t,
                        i.body.appendChild(o);
                        const n = o.getBoundingClientRect();
                        i.body.removeChild(o),
                        n.width > 0 && (a = n.width),
                        n.height > 0 && (r = n.height)
                    }
                    const [o, n] = i;
                    return a += 2 * o,
                    r += 2 * n,
                    [a, r]
                },
                j.path = (t, e) => {
                    e = Object(h.extend)({
                        stroke: {
                            opacity: 1
                        },
                        fill: {
                            color: "#ffffff",
                            opacity: 1
                        }
                    }, e);
                    const s = O(e);
                    return "<g".concat(e.transform ? ' transform="'.concat(e.transform, '"') : "", '><path d="').concat(t, '"').concat(s, " /></g>")
                },
                j.rect = (t, e, s) => {
                    s = Object(h.extend)({
                        margin: 0,
                        radius: 0,
                        stroke: null,
                        fill: {
                            color: "#ffffff",
                            opacity: 1
                        }
                    }, s);
                    const {
                        margin: i,
                        radius: a
                    } = s;
                    let r = i;
                    s.stroke && s.stroke.width > 0 && (r += s.stroke.width / 2, t -= s.stroke.width, e -= s.stroke.width);
                    let o = "M".concat(r + a, ",").concat(r, " ");
                    return o += "L".concat(r + t - a, ",").concat(r, " "),
                    a > 0 && (o += "A".concat(a, ",").concat(a, " 0 0,1 ").concat(r + t, ",").concat(r + a, " ")),
                    o += "L".concat(r + t, ",").concat(r + e - a, " "),
                    a > 0 && (o += "A".concat(a, ",").concat(a, " 0 0,1 ").concat(r + t - a, ",").concat(r + e, " ")),
                    o += "L".concat(r + a, ",").concat(r + e, " "),
                    a > 0 && (o += "A".concat(a, ",").concat(a, " 0 0,1 ").concat(r, ",").concat(r + e - a, " ")),
                    o += "L".concat(r, ",").concat(r + a, " "),
                    a > 0 && (o += "A".concat(a, ",").concat(a, " 0 0,1 ").concat(r + a, ",").concat(r, " ")),
                    o += "Z",
                    j.path(o, s)
                },
                j.circle = (t, e) => {
                    const s = 2 * (((e = Object(h.extend)({
                                        position: "center",
                                        translate: {
                                            x: 0,
                                            y: 0
                                        },
                                        radius: 0,
                                        stroke: null,
                                        fill: {
                                            color: "#ffffff",
                                            opacity: 1
                                        }
                                    }, e)).radius || 8) + (Object(h.get)(e, "stroke.width") || 0) + 1),
                    i = _(e.position, {
                        width: s,
                        height: s
                    }, t, e.translate),
                    a = O(e);
                    return i.x += s / 2,
                    i.y += s / 2,
                    "<circle".concat(e.transform ? ' transform="'.concat(e.transform, '"') : "", ' cx="').concat(i.x, '" cy="').concat(i.y, '" r="').concat(e.radius, '"').concat(a, " />")
                },
                j.text = (t, e, s) => {
                    s = Object(h.extend)({
                        position: "center",
                        translate: {
                            x: 0,
                            y: 0
                        },
                        anchor: "start",
                        size: 12,
                        font: "'Helvetica','Arial',sans-serif",
                        style: "bold",
                        color: "#222222"
                    }, s),
                    t = t || s.value;
                    const [i, a] = j.calculateTextSize("".concat(t), s.size, s.style, s.padding);
                    s.translate.y += a - 1;
                    const r = _(s.position, {
                        width: i,
                        height: a
                    }, e, s.translate);
                    let o = "";
                    if (s.stroke) {
                        const {
                            color: e = "#333333",
                            width: i = 2
                        } = s.stroke;
                        o += "<text".concat(s.transform ? ' transform="'.concat(s.transform, '"') : "", ' dominent-baseline="hanging" text-anchor="').concat(s.anchor, '" x="').concat(r.x, '" y="').concat(r.y, '" style="font-family:').concat(s.font, ";font-size:").concat(s.size, "px;font-weight:").concat(s.style, ';" stroke="').concat(e, '" stroke-width="').concat(i, '">').concat(t || "", "</text>")
                    }
                    return o += "<text".concat(s.transform ? ' transform="'.concat(s.transform, '"') : "", ' dominent-baseline="hanging" text-anchor="').concat(s.anchor, '" x="').concat(r.x, '" y="').concat(r.y, '" style="font-family:').concat(s.font, ";font-size:").concat(s.size, "px;font-weight:").concat(s.style, ';" fill="').concat(s.color, '">').concat(t || "", "</text>"),
                    o
                },
                j.image = (t, e, s) => {
                    s = Object(h.extend)({
                        position: "center",
                        size: [30, 30]
                    }, s),
                    t = t || s.url;
                    const [i, a] = s.size,
                    r = _(s.position, {
                        width: i,
                        height: a
                    }, e, s.translate),
                    [o, n] = s.size;
                    return "<image".concat(s.transform ? ' transform="'.concat(s.transform, '"') : "", ' x="').concat(r.x, '" y="').concat(r.y, '" width="').concat(o, '" height="').concat(n, '" xlink:href="').concat(t, '" />')
                },
                j.svg = function (t, e, s) {
                    let i = arguments.length > 3 && void 0 !== arguments[3] ? arguments[3] : null;
                    return '<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" version="1.1" width="'.concat(t, '" height="').concat(e, '"').concat(i ? ' viewBox="'.concat(i, '"') : "", ">\n\t\t\t").concat((s || []).map((t => t)).join(""), "\n\t\t</svg>")
                },
                j.draw = (t, e, s) => {
                    const {
                        value: i
                    } = s;
                    let a = !0,
                    r = !1;
                    const {
                        shape: o,
                        text: n,
                        image: l
                    } = s;
                    let c = [];
                    const d = [];
                    if (n) {
                        const s = (s, i) => {
                            const a = s || i.value || "",
                            r = i.x || 0,
                            n = i.y || 0,
                            l = i.size || 12,
                            [c, d] = j.calculateTextSize(a, l, i.style, i.padding),
                            u = !Object(h.isset)(i.autosize) || i.autosize;
                            if (Object(h.isEmpty)(a))
                                return null;
                            u && (c && d ? (t = c, e = d) : (t = 5 * a.length, e = l + 2));
                            let p = 0;
                            return o && o.stroke && (p = o.stroke.width / 2 || 0),
                            j.text(a, {
                                width: t,
                                height: e
                            }, Object(h.extend)(i, {
                                    x: p + t / 2 + r,
                                    y: p + Math.round(e - (e - .7 * l) / 2) + n
                                }))
                        };
                        if (Object(h.isArray)(n))
                            n.forEach((t => {
                                    const e = s(i, t);
                                    e && d.push(e)
                                }));
                        else {
                            const t = s(i, n);
                            t && d.push(t)
                        }
                        d.length > 0 && (r = !0)
                    }
                    if (o) {
                        let s = t,
                        i = e;
                        const {
                            type: a,
                            size: r
                        } = o;
                        if (r && 2 === r.length && (s = r[0], i = r[1]), "rect" === a) {
                            const t = j.rect(s, i, o);
                            c.push(t)
                        } else if ("path" === a) {
                            const t = j.path(Object(h.get)(o, "path"), o);
                            c.push(t)
                        } else {
                            const a = Object(h.get)(o, "stroke.width") || 0;
                            o.radius = Math.floor((s - 2 * a) / 2),
                            o.center = {
                                x: Math.round(s / 2) + 1,
                                y: Math.round(i / 2) + 1
                            };
                            const r = j.circle({
                                width: t,
                                height: e
                            }, o);
                            c.push(r)
                        }
                    }
                    if (l) {
                        const s = l.url;
                        if (s) {
                            const i = l.x || 0,
                            a = l.y || 0,
                            r = {
                                x: t / 2,
                                y: e / 2
                            },
                            [o, n] = l.size || [30, 30],
                            d = j.image(s, {
                                width: t,
                                height: e
                            }, Object(h.extend)(l, {
                                        x: r.x - o / 2 + i,
                                        y: r.y - n / 2 + a
                                    }));
                            c.push(d)
                        }
                    }
                    return d.length > 0 ? c = c.concat(d) : r && (a = !1),
                    a ? j.svg(t, e, c, s.viewBox) : null
                };
                const k = t => {
                    const e = {
                        stroke: !1,
                        fill: !1
                    };
                    return t.stroke && (e.stroke = !0, e.color = t.stroke.color, e.opacity = t.stroke.opacity, e.weight = t.stroke.width, e.lineCap = t.stroke.lineCap, e.lineJoin = t.stroke.lineJoin, e.dashArray = t.stroke.dashArray, e.dashOffset = t.stroke.dashOffset),
                    t.fill && (e.fill = !0, e.fillColor = t.fill.color, e.fillOpacity = t.fill.opacity, e.fillRule = t.fill.rule || "nonzero"),
                    e.fill && !Object(h.isset)(t.fillOpacity) && (t.fillOpacity = 1),
                    e.stroke && !Object(h.isset)(t.strokeOpacity) && (t.strokeOpacity = 1),
                    e
                },
                x = t => {
                    if (t.html)
                        return L.divIcon({
                            html: t.html,
                            iconSize: t.size,
                            className: t.className || ""
                        });
                    if (t.svg) {
                        const [e, s] = t.size || [12, 12];
                        return L.divIcon({
                            html: w.draw(e, s, t.svg),
                            iconSize: t.size,
                            className: t.className || ""
                        })
                    }
                    if (t.icon) {
                        const e = t.icon;
                        return L.icon({
                            iconUrl: e.url,
                            iconRetinaUrl: e.retinaUrl,
                            iconSize: t.size,
                            iconAnchor: e.anchor,
                            className: t.className || ""
                        })
                    }
                    return null
                };
                var T = class extends v {
                    update(t) {
                        var e;
                        if (!Object(h.isset)(t))
                            return;
                        const s = null === (e = t.data) || void 0 === e ? void 0 : e.value;
                        let i = t.style || {};
                        Object(h.isFunction)(i) && (i = i({
                                value: s
                            })),
                        this.setStyle(i)
                    }
                    setStyle(t) {
                        const e = x(t);
                        e && this.renderable.setIcon(e)
                    }
                    createRenderable() {
                        const {
                            style: t
                        } = this.opts,
                        e = this.coordinate,
                        s = {};
                        t && (s.icon = x(t), t.zIndex && (s.zIndexOffset = t.zIndex));
                        const i = L.marker([e.lat, e.lon], s);
                        if (t.callout) {
                            let e = t.callout;
                            if (Object(h.isFunction)(t.callout)) {
                                e = (0, t.callout)()
                            }
                            const s = L.popup().setContent(e);
                            i.bindPopup(s)
                        }
                        return i
                    }
                    updateVisibility(t) {}
                    addToMap(t, e) {
                        this.renderable.off(),
                        this.renderable.on("click", (() => this.trigger("click", {
                                    data: this.data,
                                    marker: this.renderable
                                }))),
                        this.renderable.on("mouseover", (() => this.trigger("mouseover", {
                                    data: this.data,
                                    marker: this.renderable
                                }))),
                        this.renderable.on("mouseout", (() => this.trigger("mouseout", {
                                    data: this.data,
                                    marker: this.renderable
                                }))),
                        this.renderable.addTo(t)
                    }
                    removeFromMap(t) {
                        this.renderable.off(),
                        this.renderable.remove()
                    }
                },
                M = s("uts4"),
                S = s("R1Yn");
                class I extends M.a {
                    constructor() {
                        super(...arguments),
                        this._visible = !0,
                        this._exists = !1
                    }
                    get overlay() {
                        return this._overlay
                    }
                    set timestamp(t) {
                        this.enabled && Object(h.isset)(t) && (t = new Date(t.getFullYear(), t.getMonth(), t.getDate(), t.getHours(), t.getMinutes()), this._timestamp && t.getTime() === this._timestamp.getTime() || (this._timestamp = t, !1 === this.isAnimating() && !1 === this.isAnimationFrame && (this.animation.hide(), this.updateVisibility()), this.overlay && this.canShow() && this.overlay.setUrl(this.urlTemplate())))
                    }
                    show() {
                        !1 !== this._hidden && (this._hidden = !1, this.overlay && this.overlay.setOpacity(this._opacity))
                    }
                    hide() {
                        !0 !== this._hidden && (this._hidden = !0, this.overlay && this.overlay.setOpacity(0))
                    }
                    remove() {
                        this.trigger("layer:remove", {
                            layer: this.overlay
                        })
                    }
                    setOpacity(t) {
                        let e = !(arguments.length > 1 && void 0 !== arguments[1]) || arguments[1];
                        this._opacity = t,
                        this.overlay && this.isVisible() && !0 === e && this.overlay.setOpacity(t),
                        this.animation && this.animation.setOpacity(t)
                    }
                    setOrder(t) {
                        this.overlay.setZIndex(t)
                    }
                    createOverlay(t) {
                        let e = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : {};
                        const s = L.tileLayer(t.url(), Object(h.extend)({}, e, {
                                    subdomains: t.range().join("")
                                }));
                        return s.on("add", (() => {
                                this._exists = !0
                            })).on("remove", (() => {
                                this._exists = !1
                            })),
                        s
                    }
                    animationLayerForDate(t, e) {
                        let s = !(arguments.length > 2 && void 0 !== arguments[2]) || arguments[2];
                        return new Promise(((t, i) => {
                                if (this.dataSource) {
                                    const i = this.dataSource.tileLayer(this.key, e, Object(h.extend)({}, this._opts, {
                                                id: "".concat(this.identifier, "-anim-").concat(Object(S.mapTimestampFromDate)(e)),
                                                opacity: 0,
                                                data: {
                                                    service: this.service
                                                },
                                                animation: {
                                                    enabled: !1
                                                }
                                            }));
                                    i.isAnimationFrame = !0,
                                    i.setOpacity(this._opacity, !1),
                                    i.hide(),
                                    s ? i.overlay.on("load", (() => {
                                            t(i)
                                        })) : t(i),
                                    i.on("layer:remove", (() => {
                                            this.trigger("layer:remove", {
                                                layer: i.overlay
                                            })
                                        })),
                                    this.trigger("layer:add", {
                                        layer: i.overlay
                                    })
                                } else
                                    i(new Error("No map strategy data source provided"))
                            }))
                    }
                }
                var E = I;
                var z = class {
                    tileLayer(t, e, s) {
                        return new E(t, e, s)
                    }
                    marker(t, e, s) {
                        return s && s.skip && !0 === s.skip ? null : new T(e, null, {
                            style: s
                        })
                    }
                    markerIcon(t) {
                        if (t.html)
                            return L.divIcon({
                                html: t.html,
                                iconSize: t.size,
                                className: t.className || ""
                            });
                        if (t.svg) {
                            const [e, s] = t.size || [12, 12];
                            return L.divIcon({
                                html: w.draw(e, s, t.svg),
                                iconSize: t.size,
                                className: t.className || ""
                            })
                        }
                        if (t.icon) {
                            const e = t.icon;
                            return L.icon({
                                iconUrl: e.url,
                                iconRetinaUrl: e.retinaUrl,
                                iconSize: t.size,
                                iconAnchor: e.anchor,
                                className: t.className || ""
                            })
                        }
                        return null
                    }
                    polygon(t, e, s) {
                        let i;
                        return s && (i = k(s)),
                        new y(t, e, i)
                    }
                    polyline(t, e, s) {
                        let i;
                        s && (i = k(s));
                        const a = e.map((t => [t.lat, t.lon]));
                        return new f(t, a, i)
                    }
                },
                P = s("3j3Q");
                var C = class extends u {
                    get strategy() {
                        return "leaflet"
                    }
                    get $el() {
                        return Object(P.a)(this.map.getContainer())
                    }
                    constructor(t, e) {
                        super(t, Object(h.extend)({
                                style: null,
                                map: {
                                    worldCopyJump: !0
                                }
                            }, e)),
                        this._clickedMapLayer = !1
                    }
                    loadDependencies() {
                        return new Promise(((t, e) => {
                                if ("undefined" == typeof L || void 0 === L.map) {
                                    const e = "1.7.0";
                                    Promise.all([Object(h.loadStyles)("https://unpkg.com/leaflet@".concat(e, "/dist/leaflet.css")), Object(h.loadScript)("https://unpkg.com/leaflet@".concat(e, "/dist/leaflet.js"))]).then((() => {
                                            t()
                                        }))
                                } else
                                    t()
                            }))
                    }
                    setupMap(t) {
                        this._factory = new z,
                        this._eventMapping = {
                            load: "load",
                            unload: "unload",
                            resize: "resize",
                            click: "click",
                            dblclick: "dblclick",
                            mousedown: "mousedown",
                            mouseup: "mouseup",
                            mouseover: "mouseover",
                            mouseout: "mouseout",
                            mousemove: "mousemove",
                            zoom: "zoom",
                            zoomstart: "zoom:start",
                            zoomend: "zoom:end",
                            move: "move",
                            movestart: "move:start",
                            moveend: "move:end",
                            popupopen: "popupopen",
                            popupclose: "popupclose"
                        };
                        const e = this.opts.map;
                        if (e) {
                            const {
                                center: t,
                                zoom: s
                            } = e;
                            t && Object(h.isset)(t.lat) && Object(h.isset)(t.lng) && Object(h.set)(this.opts, "center", {
                                lat: t.lat,
                                lon: t.lng
                            }),
                            s && Object(h.set)(this.opts, "zoom", s)
                        }
                        if (Object(S.isLeaflet)(t))
                            this._setInitialView = !1, this._map = t;
                        else {
                            if (Object(h.isString)(t) && (t = Object(P.a)(t)), Object(h.isArray)(t) && t.length > 0)
                                t = t[0];
                            else if (Object(h.isDOM)(t)) {
                                t = t[0]
                            }
                            this._map = L.map(t, Object(h.extend)({
                                        zoomControl: !1
                                    }, this.opts.map));
                            !1 === Object(h.get)(this.opts, "map.zoomControl") || L.control.zoom({
                                position: "bottomleft"
                            }).addTo(this._map),
                            Object(h.isset)(this.opts.center) || Object(h.set)(this.opts, "center", {
                                lat: 43,
                                lon: -93
                            }),
                            Object(h.isset)(this.opts.zoom) || Object(h.set)(this.opts, "zoom", 7),
                            this.map.createPane("base"),
                            this.map.getPane("base").style.zIndex = "199";
                            const e = Object(h.get)(this.opts, "style");
                            Object(h.isEmpty)(e) ? this._baseLayer = L.tileLayer("https://{s}.tile.osm.org/{z}/{x}/{y}.png", {
                                attribution: '&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors',
                                pane: "base"
                            }) : this._baseLayer = L.tileLayer(e, {
                                pane: "base"
                            }),
                            this._baseLayer.addTo(this.map)
                        }
                        this.map.createPane("admin"),
                        this.map.getPane("admin").style.zIndex = "210",
                        setTimeout((() => {
                                this.trigger("map:ready")
                            }), 250)
                    }
                    setBaseStyle(t) {
                        Object(h.isEmpty)(t) || (this._baseLayer && this._baseLayer.remove(), this._baseLayer = L.tileLayer(t, {
                                pane: "base"
                            }), this._baseLayer.addTo(this.map))
                    }
                    setBaseUrl(t) {
                        this.setBaseStyle(t)
                    }
                    setView(t, e) {
                        this._map && this.map.setView({
                            lat: t.lat,
                            lng: t.lon
                        }, e)
                    }
                    getCenter() {
                        if (!this._map)
                            return null;
                        const t = this._map.getCenter();
                        return {
                            lat: t.lat,
                            lon: t.lng
                        }
                    }
                    setCenter(t) {
                        this._map && this._map.setView({
                            lat: t.lat,
                            lng: t.lon
                        }, this.getZoom())
                    }
                    getZoom() {
                        return this._map ? this._map.getZoom() : 0
                    }
                    setZoom(t) {
                        this._map && this._map.setZoom(t)
                    }
                    getBounds() {
                        if (!this._map)
                            return null;
                        const t = this.map.getBounds();
                        return {
                            north: t.getNorth(),
                            west: t.getWest(),
                            south: t.getSouth(),
                            east: t.getEast()
                        }
                    }
                    setBounds(t) {
                        if (!this._map)
                            return;
                        const e = new L.LatLng(t.south, t.west),
                        s = new L.LatLng(t.north, t.east);
                        this.map.fitBounds(new L.LatLngBounds(e, s))
                    }
                    fitBounds(t) {
                        let e = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : [10, 10];
                        if (!this._map)
                            return;
                        const s = new L.LatLng(t.south, t.west),
                        i = new L.LatLng(t.north, t.east),
                        a = new L.LatLngBounds(s, i);
                        if (!a.isValid())
                            return void console.warn("[Aeris] Cannot fit bounds, invalid bounds - nw: ".concat(t.north, ", ").concat(t.west, "; se: ").concat(t.south, ", ").concat(t.east));
                        const r = {};
                        2 === e.length ? r.padding = L.point(e[0], e[1]) : 4 === e.length && (r.paddingTopLeft = L.point(e[3], e[0]), r.paddingBottomRight = L.point(e[1], e[2])),
                        this.map.fitBounds(a, r)
                    }
                    isTile(t) {
                        return t instanceof E
                    }
                    isMarker(t) {
                        return (null == t ? void 0 : t.renderable) ? t.renderable instanceof L.Marker : t instanceof L.Marker
                    }
                    isPolygon(t) {
                        return !!((null == t ? void 0 : t.renderable) && t.renderable instanceof y) || t instanceof y
                    }
                    isPolyline(t) {
                        return !!((null == t ? void 0 : t.renderable) && t.renderable instanceof f) || t instanceof f
                    }
                    addOverlay(t) {
                        (t instanceof L.Layer || t instanceof L.TileLayer) && t.addTo(this.map)
                    }
                    removeOverlay(t) {
                        (t instanceof L.Layer || t instanceof L.TileLayer) && t.remove()
                    }
                    addMarker(t, e) {
                        t instanceof T ? (t.on("click", (() => this.trigger("marker:click", {
                                        data: e,
                                        marker: t
                                    }))), t.on("mouseover", (() => this.trigger("marker:mouseover", {
                                        data: e,
                                        marker: t
                                    }))), t.on("mouseout", (() => this.trigger("marker:mouseout", {
                                        data: e,
                                        marker: t
                                    }))), t.addTo(this.map)) : t instanceof L.Marker && t.addTo(this.map),
                        super.addMarker(t, e)
                    }
                    removeMarker(t) {
                        t instanceof T ? (t.offAll(), t.remove()) : t instanceof L.Marker && t.remove(),
                        super.removeMarker(t)
                    }
                    updateMarker(t, e) {
                        e && t instanceof T && t.update(e)
                    }
                    bindCalloutToMarker(t, e) {}
                    addShape(t, e) {
                        (t instanceof f || t instanceof y) && (t.on("click", (() => this.trigger("shape:click", {
                                        data: e,
                                        shape: t
                                    }))), t.on("mouseover", (() => this.trigger("shape:mouseover", {
                                        data: e,
                                        shape: t
                                    }))), t.on("mouseout", (() => this.trigger("shape:mouseout", {
                                        data: e,
                                        shape: t
                                    }))), t.addTo(this.map)),
                        super.addShape(t, e)
                    }
                    removeShape(t) {
                        (t instanceof f || t instanceof y) && (t.offAll(), t.remove()),
                        super.removeShape(t)
                    }
                    showShape(t) {
                        this.addShape(t)
                    }
                    hideShape(t) {
                        this.removeShape(t)
                    }
                    coordToPoint(t) {
                        if (!t)
                            return null;
                        const e = this.map.latLngToContainerPoint({
                            lat: t.lat,
                            lng: t.lon
                        });
                        return {
                            x: e.x,
                            y: e.y
                        }
                    }
                    pointToCoord(t) {
                        if (!t)
                            return null;
                        const e = this.map.containerPointToLatLng([t.x, t.y]);
                        return {
                            lat: e.lat,
                            lon: e.lng
                        }
                    }
                    showCallout(t, e, s) {
                        Object(S.isCoordObject)(t) ? this.map.openPopup(e, new L.LatLng(t.lat, t.lon), s) : this.isMarker(t) && t.unbindPopup().bindPopup(e, s).openPopup()
                    }
                    _setupEvents() {
                        super._setupEvents(),
                        this.map.on("movestart", (t => {
                                ["before:change:bounds", "before:change:center"].forEach((t => this.trigger(t)))
                            })),
                        this.map.on("moveend", (t => {
                                ["after:change:bounds", "after:change:center", "change:bounds", "change:center"].forEach((t => this.trigger(t)))
                            })),
                        this.map.on("zoomstart", (t => {
                                ["before:change:zoom"].forEach((t => this.trigger(t)))
                            })),
                        this.map.on("zoomend", (t => {
                                ["after:change:zoom", "change:zoom"].forEach((t => this.trigger(t)))
                            }))
                    }
                    _shouldTriggerEvent(t) {
                        return "click" !== t || !1 === this._clickedMapLayer
                    }
                    _dataForMapEvent(t, e) {
                        if (!e)
                            return null;
                        let s = null;
                        switch (t) {
                        case "mouseover":
                        case "mousemove":
                        case "mousedown":
                        case "mouseup":
                        case "click":
                        case "dblclick":
                            s = {
                                coord: {
                                    lat: e.latlng.lat,
                                    lon: e.latlng.lng
                                },
                                point: {
                                    x: e.containerPoint.x,
                                    y: e.containerPoint.y
                                }
                            }
                        }
                        return s
                    }
                };
                var A = class extends m {
                    get sourceId() {
                        return "".concat(this.layerId, "-source")
                    }
                    get parentId() {
                        return this._relativeTo
                    }
                    set parentId(t) {
                        this._relativeTo = t
                    }
                    setOpacity(t) {
                        super.setOpacity(t),
                        this.exists() && !this.isHidden && ("raster" === this.renderable.type ? this.map.setPaintProperty(this.layerId, "raster-opacity", t) : "fill" === this.renderable.type && this.map.setPaintProperty(this.layerId, "fill-opacity", t))
                    }
                    setZIndex(t) {
                        if (this.exists()) {
                            const e = this.map.getStyle().layers;
                            let s = 0;
                            e.forEach(((t, e) => {
                                    "line" === t.type && /^admin-/.test(t.id) && 0 === s && (s = e)
                                }));
                            const i = e.map((t => t.id))[s + t];
                            this.map.removeLayer(this.layerId),
                            this.map.addLayer(this.renderable, i)
                        }
                    }
                    exists() {
                        const t = this.map;
                        return !!t && (void 0 !== t.getLayer(this.layerId) && void 0 !== t.getSource(this.sourceId))
                    }
                    invalidate() {
                        throw new Error("Subclasses must override `invalidate`")
                    }
                    createRenderable() {
                        return null
                    }
                    updateVisibility(t) {
                        this.exists() && ("raster" === this.renderable.type && this.map.setPaintProperty(this.layerId, "raster-opacity", this.opacity), this.map.setLayoutProperty(this.layerId, "visibility", t ? "visible" : "none"))
                    }
                    addToMap(t) {
                        if (this.exists())
                            return;
                        if (!this._relativeTo) {
                            t.getStyle().layers.forEach(((t, e) => {
                                    "line" === t.type && /^admin-/.test(t.id) && !this._relativeTo && (this._relativeTo = t.id)
                                }))
                        }
                        void 0 !== t.getLayer(this.layerId) || (this.source ? (t.addSource(this.sourceId, this.source), this._relativeTo && void 0 === t.getLayer(this._relativeTo) || t.addLayer(this.renderable, this._relativeTo)) : this.invalidate()),
                        this.isHidden && this.hide()
                    }
                    removeFromMap(t) {
                        void 0 !== t.getLayer(this.layerId) && (t.removeLayer(this.layerId), t.removeSource(this.sourceId))
                    }
                },
                F = s("pAjv");
                var B = class extends A {
                    constructor(t, e) {
                        super(t, arguments.length > 2 && void 0 !== arguments[2] ? arguments[2] : {}, arguments.length > 3 && void 0 !== arguments[3] ? arguments[3] : void 0),
                        this._needsEventSetup = !0,
                        this._polygons = e
                    }
                    get strokeLayerId() {
                        return "".concat(this.layerId, "-stroke")
                    }
                    addTo(t) {
                        if (super.addTo(t), this._strokeLayer) {
                            void 0 !== t.getLayer(this.strokeLayerId) || t.addLayer(this._strokeLayer, this.layerId)
                        }
                        this._needsEventSetup && (t.on("click", this.layerId, (t => {
                                    this.trigger("click", {
                                        data: this.data,
                                        shape: this.renderable
                                    })
                                })), t.on("mouseenter", this.layerId, (t => {
                                    this.trigger("mouseover", {
                                        data: this.data,
                                        shape: this.renderable
                                    })
                                })), t.on("mouseleave", this.layerId, (t => {
                                    this.trigger("mouseout", {
                                        data: this.data,
                                        shape: this.renderable
                                    })
                                })), this._needsEventSetup = !1)
                    }
                    remove() {
                        if (this.map) {
                            if (this._strokeLayer) {
                                void 0 !== this.map.getLayer(this.strokeLayerId) && this.map.removeLayer(this.strokeLayerId)
                            }
                            super.remove()
                        }
                    }
                    invalidate() {
                        const t = this._polygons.length > 1,
                        e = (this._polygons || []).map((t => [t.outer.map((t => [t.lon, t.lat])), ...t.inner ? t.inner.map((t => t.map((t => [t.lon, t.lat])))) : []]));
                        if (this.source = {
                                type: "geojson",
                                data: {
                                    type: "FeatureCollection",
                                    features: [{
                                            type: "Feature",
                                            geometry: {
                                                type: t ? "MultiPolygon" : "Polygon",
                                                coordinates: t ? e : e[0] || []
                                            }
                                        }
                                    ]
                                }
                            }, this.createRenderable(), this.map) {
                            const t = this.map;
                            this.remove(),
                            this.addTo(t)
                        }
                    }
                    createRenderable() {
                        const t = this.opts,
                        e = {
                            fill: {},
                            stroke: {}
                        };
                        return ["fill", "line"].forEach((s => {
                                const i = "line" === s ? "stroke" : "fill";
                                Object.keys(t).filter((t => new RegExp("^".concat(s, "-")).test(t))).forEach((s => {
                                        const a = F.hyphenate(s);
                                        Object(h.isset)(t[s]) && (e[i][a] = t[s])
                                    }))
                            })),
                        Object.keys(e.stroke).length > 0 && (this._strokeLayer = {
                                id: this.strokeLayerId,
                                type: "line",
                                source: this.sourceId,
                                layout: {},
                                paint: e.stroke
                            }), {
                            id: this.layerId,
                            type: "fill",
                            source: this.sourceId,
                            layout: {},
                            paint: e.fill
                        }
                    }
                };
                var D = class extends A {
                    constructor(t, e) {
                        super(t, arguments.length > 2 && void 0 !== arguments[2] ? arguments[2] : {}, arguments.length > 3 && void 0 !== arguments[3] ? arguments[3] : void 0),
                        this._needsEventSetup = !0,
                        this._points = e
                    }
                    addTo(t) {
                        super.addTo(t),
                        this._needsEventSetup && (t.on("click", this.layerId, (t => {
                                    this.trigger("click", {
                                        data: this.data,
                                        shape: this.renderable
                                    })
                                })), t.on("mouseenter", this.layerId, (t => {
                                    this.trigger("mouseover", {
                                        data: this.data,
                                        shape: this.renderable
                                    })
                                })), t.on("mouseleave", this.layerId, (t => {
                                    this.trigger("mouseout", {
                                        data: this.data,
                                        shape: this.renderable
                                    })
                                })), this._needsEventSetup = !1)
                    }
                    invalidate() {
                        if (this.source = {
                                type: "geojson",
                                data: {
                                    type: "FeatureCollection",
                                    features: [{
                                            type: "Feature",
                                            geometry: {
                                                type: "LineString",
                                                coordinates: this._points.map((t => [t.lon, t.lat]))
                                            }
                                        }
                                    ]
                                }
                            }, this.createRenderable(), this.map) {
                            const t = this.map;
                            this.remove(),
                            this.addTo(t)
                        }
                    }
                    createRenderable() {
                        const t = Object(h.cloneDeep)(this.opts);
                        return {
                            id: this.layerId,
                            type: "line",
                            source: this.sourceId,
                            layout: {},
                            paint: t
                        }
                    }
                };
                var R = class extends A {
                    constructor(t, e) {
                        let s = arguments.length > 2 && void 0 !== arguments[2] ? arguments[2] : void 0;
                        super(t, Object(h.extend)({
                                type: "tile"
                            }, e), s),
                        this._type = this.opts.type
                    }
                    setUrl(t) {
                        this.opts.url = t,
                        this.map && this.invalidate()
                    }
                    setBounds(t) {
                        this.opts.bounds = t
                    }
                    setImage(t) {
                        let e = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : void 0;
                        this.opts.url = t;
                        const s = this.map;
                        if (!s)
                            return;
                        e || (e = this.opts.bounds);
                        const i = s.getSource(this.sourceId);
                        i ? i.updateImage({
                            url: t,
                            coordinates: [[e.west, e.north], [e.east, e.north], [e.east, e.south], [e.west, e.south]]
                        }) : this.invalidate()
                    }
                    invalidate() {
                        const {
                            url: t,
                            bounds: e
                        } = this.opts;
                        if (t) {
                            if ("image" === this._type) {
                                if (!e)
                                    return;
                                this.source = {
                                    type: "image",
                                    url: t,
                                    coordinates: [[e.west, e.north], [e.east, e.north], [e.east, e.south], [e.west, e.south]]
                                }
                            } else
                                this.source = {
                                    type: "raster",
                                    tiles: [1, 2, 3, 4].map((e => t.replace(/\{s\}/, "".concat(e)))),
                                    tileSize: 256,
                                    attribution: this.opts.attribution || ""
                                };
                            if (this.createRenderable(), this.map) {
                                const t = this.map;
                                this.remove(),
                                this.addTo(t)
                            }
                        }
                    }
                    updateVisibility(t) {
                        this.exists() && this.map.setPaintProperty(this.layerId, "raster-opacity", t ? this.opacity : 0)
                    }
                    createRenderable() {
                        return {
                            id: this.layerId,
                            type: "raster",
                            source: this.sourceId,
                            paint: {
                                "raster-opacity": this.opacity,
                                "raster-opacity-transition": {
                                    duration: 0,
                                    delay: 0
                                },
                                "raster-fade-duration": 0
                            }
                        }
                    }
                };
                const V = t => {
                    const e = {
                        stroke: !1,
                        fill: !1
                    };
                    return e.id = t.id,
                    t.stroke && (e.stroke = !0, e.lineColor = t.stroke.color, e.lineOpacity = t.stroke.opacity, e.lineWidth = t.stroke.width, e.lineCap = t.stroke.lineCap, e.lineJoin = t.stroke.lineJoin, e.lineDasharray = t.stroke.dashArray, e.dashOffset = t.stroke.dashOffset),
                    t.fill && (e.fill = !0, e.fillColor = t.fill.color, e.fillOpacity = t.fill.opacity),
                    e.fill && !Object(h.isset)(t.fillOpacity) && (t.fillOpacity = 1),
                    e.stroke && !Object(h.isset)(t.strokeOpacity) && (t.strokeOpacity = 1),
                    delete e.fill,
                    delete e.stroke,
                    Object.keys(e).forEach((t => {
                            const s = Object(F.hyphenate)(t);
                            s !== t && (e[s] = e[t], delete e[t])
                        })),
                    e
                },
                q = t => {
                    if (!t)
                        return null;
                    if (t.html && console.warn("awxjs - HTML markers are not currently supported with Mapbox GL"), t.svg) {
                        const [e, s] = t.size || [12, 12];
                        if (document) {
                            const i = document.createElement("div");
                            return i.innerHTML = w.draw(e, s, t.svg),
                            t.zIndex && (i.style.zIndex = "".concat(t.zIndex)),
                            i
                        }
                    }
                    if (t.icon) {
                        const e = new Image;
                        return e.src = t.icon.url,
                        e.width = t.size[0],
                        e.height = t.size[1],
                        e
                    }
                    return null
                };
                var N = class extends v {
                    update(t) {
                        var e;
                        if (!Object(h.isset)(t))
                            return;
                        const {
                            data: s
                        } = t;
                        Object(h.isset)(s) && (this.data = Object.assign(Object.assign({}, this.data), s));
                        const i = null === (e = this.data) || void 0 === e ? void 0 : e.value;
                        let a = t.style || {};
                        Object(h.isFunction)(a) && (a = a({
                                value: i
                            })),
                        this.setStyle(a)
                    }
                    setStyle(t) {
                        this.opts.style = t,
                        this.invalidate()
                    }
                    createRenderable() {
                        const {
                            style: t
                        } = this.opts,
                        e = this.coordinate,
                        s = {};
                        t && (s.icon = q(t), t.zIndex && (s.zIndex = t.zIndex));
                        const i = new mapboxgl.Marker({
                            element: s.icon
                        });
                        if (i.setLngLat([e.lon, e.lat]), t && t.callout) {
                            let e = t.callout;
                            if (Object(h.isFunction)(t.callout)) {
                                e = (0, t.callout)()
                            }
                            const s = new mapboxgl.Popup;
                            s.setHTML(e),
                            i.setPopup(s)
                        }
                        return i
                    }
                    updateVisibility(t) {}
                    addToMap(t, e) {
                        const s = this.renderable;
                        if (s) {
                            const e = s.getElement();
                            this._events.forEach((t => {
                                    const i = "__awxjs_".concat(t, "Handler");
                                    s[i] ? e.removeEventListener(t, s[i]) : s[i] = e => {
                                        e.stopPropagation(),
                                        this.trigger(t, {
                                            data: this.data,
                                            marker: s
                                        })
                                    },
                                    e.addEventListener(t, s[i])
                                })),
                            s.addTo(t)
                        }
                    }
                    removeFromMap(t) {
                        const e = this.renderable;
                        if (e) {
                            const t = e.getElement();
                            this._events.forEach((s => {
                                    const i = "__awxjs_".concat(s, "Handler");
                                    e[i] && t.removeEventListener(s, e.__awxjs_clickHandler)
                                })),
                            e.remove()
                        }
                    }
                };
                class $ extends M.a {
                    constructor(t, e, s) {
                        super(t, e, s);
                        const i = this.animation,
                        a = new R(t, Object(h.extend)(s, {
                                    type: "image"
                                }), "".concat(this.identifier, "-anim"));
                        null == i || i.on("show", (t => {
                                this.show()
                            })),
                        null == i || i.on("hide", (t => {
                                this.hide()
                            })),
                        null == i || i.on("load:image advance:image", (t => {
                                const e = t.data.img;
                                e && a.setImage(e.src)
                            })),
                        this._animationOverlay = a,
                        this.on("overlay:ready", (() => {
                                const t = Object(h.get)(s, "style.opacity"),
                                e = Object(h.get)(s, "style.belowLayer");
                                s.id && (this._overlay.id = s.id, this._animationOverlay.id = "".concat(s.id, "-anim")),
                                Object(h.isset)(t) && (this._overlay.setOpacity(t), this._animationOverlay.setOpacity(t)),
                                this._overlay.parentId = e,
                                this._animationOverlay.parentId = this._overlay.layerId
                            }))
                    }
                    get overlay() {
                        return this._overlay
                    }
                    set timestamp(t) {
                        var e;
                        this.enabled && Object(h.isset)(t) && (t = new Date(t.getFullYear(), t.getMonth(), t.getDate(), t.getHours(), t.getMinutes()), this._timestamp && t.getTime() === this._timestamp.getTime() || (this._timestamp = t, !1 === this.isAnimating() && !1 === this.isAnimationFrame && (null === (e = this.animation) || void 0 === e || e.hide(), this.updateVisibility()), !this.overlay || !this.canShow() && this.overlay.exists() || this.overlay.setUrl(this.urlTemplate())))
                    }
                    show() {
                        var t;
                        !1 !== this._hidden && (this._hidden = !1, (null === (t = this.animation) || void 0 === t ? void 0 : t.isAnimating()) && this._animationOverlay ? this._animationOverlay.show() : this.overlay && this.overlay.show())
                    }
                    hide() {
                        !0 !== this._hidden && (this._hidden = !0, this.overlay && this.overlay.hide(), this._animationOverlay && this._animationOverlay.hide())
                    }
                    remove() {
                        this.trigger("layer:remove", {
                            layer: this.overlay
                        })
                    }
                    setOpacity(t) {
                        var e;
                        this._opacity = t,
                        this.overlay && this.overlay.setOpacity(t),
                        this._animationOverlay && this._animationOverlay.setOpacity(t),
                        null === (e = this.animation) || void 0 === e || e.setOpacity(t)
                    }
                    setOrder(t) {
                        this.overlay && this.overlay.setZIndex(t),
                        this._animationOverlay && this._animationOverlay.setZIndex(t)
                    }
                    createOverlay(t) {
                        let e = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : {};
                        return new R(this.key, Object(h.extend)(e, {
                                type: "type"
                            }), this.identifier)
                    }
                    animationLayerForDate(t, e) {
                        let s = !(arguments.length > 2 && void 0 !== arguments[2]) || arguments[2];
                        return new Promise(((t, i) => {
                                if (this.dataSource) {
                                    const i = this.dataSource.tileLayer(this.key, e, Object(h.extend)({}, this._opts, {
                                                id: "".concat(this.identifier, "-anim-").concat(Object(S.mapTimestampFromDate)(e)),
                                                opacity: 0,
                                                data: {
                                                    service: this.service
                                                },
                                                animation: {
                                                    enabled: !1
                                                }
                                            }));
                                    if (i.isAnimationFrame = !0, i.setOpacity(this._opacity, !1), i.hide(), s) {
                                        this.overlay.map.on("sourcedata", (e => {
                                                const {
                                                    sourceId: s,
                                                    isSourceLoaded: a
                                                } = e || {};
                                                s === i.overlay.sourceId && a && t(i)
                                            }))
                                    } else
                                        t(i);
                                    i.on("layer:remove", (() => {
                                            this.trigger("layer:remove", {
                                                layer: i.overlay
                                            })
                                        })),
                                    this.trigger("layer:add", {
                                        layer: i.overlay
                                    })
                                } else
                                    i(new Error("No map strategy data source provided"))
                            }))
                    }
                }
                var Z = $;
                var H = class {
                    tileLayer(t, e, s) {
                        return new Z(t, e, s)
                    }
                    marker(t, e, s) {
                        return s && s.skip && !0 === s.skip ? null : new N(e, void 0, {
                            style: s
                        })
                    }
                    polygon(t, e, s) {
                        let i;
                        return s && (i = V(s)),
                        e.forEach((t => {
                                i.id || (i.id = t.id)
                            })),
                        new B(t, e, i, i.id)
                    }
                    polyline(t, e, s) {
                        let i;
                        s && s && (i = V(s), delete i.fill);
                        e.map((t => [t.lat, t.lon]));
                        return new D(t, e, i, i.id)
                    }
                };
                const W = "2.0.0";
                var U = class extends u {
                    get strategy() {
                        return "mapbox"
                    }
                    get $el() {
                        return Object(P.a)(this.map.getContainer())
                    }
                    constructor(t, e) {
                        super(t, Object(h.extend)({
                                accessToken: null,
                                style: "mapbox://styles/mapbox/streets-v9"
                            }, e)),
                        this._pointAnimationUpdates = {},
                        this._shapeDataById = {},
                        this._clickedMapLayer = !1
                    }
                    loadDependencies() {
                        const t = document.createElement("style");
                        return t.innerHTML = ".mapboxgl-marker { line-height: 0; }",
                        window.document.body.appendChild(t),
                        new Promise(((t, e) => {
                                "undefined" == typeof mapboxgl || void 0 === mapboxgl.Map ? Promise.all([Object(h.loadStyles)("https://api.tiles.mapbox.com/mapbox-gl-js/v".concat(W, "/mapbox-gl.css")), Object(h.loadScript)("/mapbox-gl-js/v".concat(W, "/mapbox-gl.js"))]).then((() => {
                                        t()
                                    })) : t()
                            }))
                    }
                    setupMap(t) {
                        this._factory = new H,
                        this._eventMapping = {
                            load: "load",
                            remove: "unload",
                            resize: "resize",
                            click: "click",
                            dblclick: "dblclick",
                            mousedown: "mousedown",
                            mouseup: "mouseup",
                            mouseover: "mouseover",
                            mouseout: "mouseout",
                            mousemove: "mousemove",
                            zoom: "zoom",
                            zoomstart: "zoom:start",
                            zoomend: "zoom:end",
                            move: "move",
                            movestart: "move:start",
                            moveend: "move:end"
                        };
                        const e = mapboxgl.version;
                        if (e) {
                            let [t, s] = e.split(".");
                            if (t = parseInt(t, 10), s = parseInt(s, 10), 0 === t && s < 50)
                                throw new Error("AerisWeather SDK requires Mapbox GL JS version 0.50.0 or higher. You are using version ".concat(e, "."))
                        }
                        const s = this.opts.map;
                        if (s) {
                            const {
                                center: t,
                                zoom: e
                            } = s;
                            if (t && Object(h.isArray)(t)) {
                                const [e, s] = t;
                                Object(h.isset)(s) && Object(h.isset)(e) && Object(h.set)(this.opts, "center", {
                                    lat: s,
                                    lon: e
                                })
                            }
                            e && Object(h.set)(this.opts, "zoom", e)
                        }
                        if (Object(S.isMapbox)(t))
                            this._setInitialView = !1, this._map = t, setTimeout((() => {
                                    this.trigger("map:ready")
                                }), 250);
                        else {
                            if (Object(h.isString)(t) && (t = Object(P.a)(t)), Object(h.isArray)(t) && t.length > 0)
                                t = t[0];
                            else if (Object(h.isDOM)(t)) {
                                t = t[0]
                            }
                            mapboxgl.accessToken = this.opts.accessToken,
                            this._map = new mapboxgl.Map(Object(h.extend)({}, this.opts.map, {
                                        container: t,
                                        style: this.opts.style
                                    })),
                            this._currentMapStyle = this.opts.style;
                            if (!(!1 === Object(h.get)(this.opts, "map.zoomControl"))) {
                                const t = new mapboxgl.NavigationControl;
                                this._map.addControl(t, "bottom-left")
                            }
                            Object(h.isset)(this.opts.center) || Object(h.set)(this.opts, "center", {
                                lat: 43,
                                lon: -93
                            }),
                            Object(h.isset)(this.opts.zoom) || Object(h.set)(this.opts, "zoom", 7),
                            this.map.on("load", (() => {
                                    setTimeout((() => {
                                            this.trigger("map:ready")
                                        }), 250)
                                }))
                        }
                    }
                    setBaseStyle(t) {
                        if (t === this._currentMapStyle)
                            return;
                        const e = this.map,
                        s = e.getStyle(),
                        i = s.layers.filter((t => /^aeris-/.test(t.id))),
                        a = Object.keys(s.sources).filter((t => /^aeris-/.test(t))).reduce(((t, e) => (t[e] = s.sources[e], t)), {});
                        e.on("style.load", (() => {
                                Object.keys(a).forEach((t => {
                                        e.getSource(t) || e.addSource(t, a[t])
                                    })),
                                i.forEach((t => {
                                        e.getLayer(t.id) || e.addLayer(t)
                                    }))
                            })),
                        e.setStyle(t, {
                            diff: !0
                        })
                    }
                    setView(t, e) {
                        this.map.jumpTo({
                            center: {
                                lat: t.lat,
                                lon: t.lon
                            },
                            zoom: Math.max(1, e - 1)
                        })
                    }
                    getCenter() {
                        const t = this._map.getCenter();
                        return {
                            lat: t.lat,
                            lon: t.lng
                        }
                    }
                    setCenter(t) {
                        this._map.setCenter({
                            lat: t.lat,
                            lon: t.lon
                        })
                    }
                    getZoom() {
                        return this._map.getZoom() + 1
                    }
                    setZoom(t) {
                        this._map.setZoom(Math.max(0, t - 1))
                    }
                    getBounds() {
                        const t = this.map.getBounds();
                        return {
                            north: t.getNorth(),
                            west: t.getWest(),
                            south: t.getSouth(),
                            east: t.getEast()
                        }
                    }
                    setBounds(t) {
                        const e = new mapboxgl.LngLat(t.west, t.south),
                        s = new mapboxgl.LngLat(t.east, t.north);
                        this.map.fitBounds(new mapboxgl.LngLatBounds(e, s))
                    }
                    fitBounds(t) {
                        let e = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : [10, 10];
                        const s = new mapboxgl.LngLat(t.west, t.south),
                        i = new mapboxgl.LngLat(t.east, t.north),
                        a = new mapboxgl.LngLatBounds(s, i),
                        r = {};
                        1 === e.length ? r.padding = e[0] : 2 === e.length ? r.padding = {
                            top: e[1],
                            right: e[0],
                            bottom: e[1],
                            left: e[0]
                        }
                         : 4 === e.length && (r.padding = {
                                top: e[0],
                                right: e[1],
                                bottom: e[2],
                                left: e[3]
                            }),
                        this.map.fitBounds(a, r)
                    }
                    isTile(t) {
                        return t instanceof Z
                    }
                    isMarker(t) {
                        return (null == t ? void 0 : t.renderable) ? t.renderable instanceof mapboxgl.Marker : t instanceof mapboxgl.Marker
                    }
                    isPolygon(t) {
                        return t instanceof B
                    }
                    isPolyline(t) {
                        return t instanceof D
                    }
                    addSource(t) {
                        super.addSource(t),
                        this.isTile(t) && t.updateVisibility()
                    }
                    addOverlay(t) {
                        t instanceof R && t.addTo(this.map)
                    }
                    removeOverlay(t) {
                        t instanceof R && t.remove()
                    }
                    addMarker(t, e) {
                        t instanceof N ? (t.on("click", (() => this.trigger("marker:click", {
                                        data: e,
                                        marker: t
                                    }))), t.on("mouseover", (() => this.trigger("marker:mouseover", {
                                        data: e,
                                        marker: t
                                    }))), t.on("mouseout", (() => this.trigger("marker:mouseout", {
                                        data: e,
                                        marker: t
                                    }))), t.addTo(this.map)) : t instanceof mapboxgl.Marker && t.addTo(this.map),
                        super.addMarker(t, e)
                    }
                    removeMarker(t) {
                        t instanceof N ? (t.offAll(), t.remove()) : t instanceof mapboxgl.Marker && t.remove(),
                        super.removeMarker(t)
                    }
                    updateMarker(t, e) {
                        Object(h.isset)(e) && t instanceof N && t.update(e)
                    }
                    addShape(t, e) {
                        (t instanceof B || t instanceof D) && (t.on("click", (() => this.trigger("shape:click", {
                                        data: e,
                                        shape: t
                                    }))), t.on("mouseover", (() => this.trigger("shape:mouseover", {
                                        data: e,
                                        shape: t
                                    }))), t.on("mouseout", (() => this.trigger("shape:mouseout", {
                                        data: e,
                                        shape: t
                                    }))), t.addTo(this.map), this._shapeDataById[t.id] = e),
                        super.addShape(t, e)
                    }
                    removeShape(t) {
                        (t instanceof B || t instanceof D) && (t.offAll(), t.remove()),
                        super.removeShape(t)
                    }
                    showShape(t) {
                        this.isPolygon(t) || this.isPolyline(t) ? t.show() : super.showShape(t)
                    }
                    hideShape(t) {
                        this.isPolygon(t) || this.isPolyline(t) ? t.hide() : super.hideShape(t)
                    }
                    coordToPoint(t) {
                        const e = this.map.project({
                            lat: t.lat,
                            lng: t.lon
                        });
                        return {
                            x: e.x,
                            y: e.y
                        }
                    }
                    pointToCoord(t) {
                        const e = this.map.unproject([t.x, t.y]);
                        return {
                            lat: e.lat,
                            lon: e.lng
                        }
                    }
                    showCallout(t, e, s) {
                        const i = new mapboxgl.Popup(s).setHTML(e);
                        Object(S.isCoordObject)(t) ? i.setLngLat({
                            lat: t.lat,
                            lng: t.lon
                        }).addTo(this.map) : this.isMarker(t) && (t.setPopup(i), t.togglePopup())
                    }
                    _setupEvents() {
                        this.map.on("movestart", (t => {
                                ["before:change:bounds", "before:change:center"].forEach((t => this.trigger(t)))
                            })),
                        this.map.on("moveend", (t => {
                                ["after:change:bounds", "after:change:center", "change:bounds", "change:center"].forEach((t => this.trigger(t)))
                            })),
                        this.map.on("zoomstart", (t => {
                                ["before:change:zoom"].forEach((t => this.trigger(t)))
                            })),
                        this.map.on("zoomend", (t => {
                                ["after:change:zoom", "change:zoom"].forEach((t => this.trigger(t)))
                            })),
                        super._setupEvents()
                    }
                    _shouldTriggerEvent(t) {
                        return "click" !== t || !1 === this._clickedMapLayer
                    }
                    _dataForMapEvent(t, e) {
                        if (!e)
                            return null;
                        let s = null;
                        switch (t) {
                        case "mouseover":
                        case "mousemove":
                        case "mousedown":
                        case "mouseup":
                        case "click":
                        case "dblclick":
                            s = {
                                coord: {
                                    lat: e.lngLat.lat,
                                    lon: e.lngLat.lng
                                },
                                point: {
                                    x: e.point.x,
                                    y: e.point.y
                                }
                            }
                        }
                        return s
                    }
                };
                var G = class extends m {
                    setOpacity(t) {
                        var e;
                        super.setOpacity(t),
                        null === (e = this.renderable) || void 0 === e || e.setOpacity(t)
                    }
                    setZIndex(t) {
                        var e;
                        null === (e = this.renderable) || void 0 === e || e.setZIndex(t)
                    }
                    exists() {
                        this.map;
                        return !1
                    }
                    invalidate() {}
                    createRenderable() {}
                    updateVisibility(t) {
                        var e;
                        null === (e = this.renderable) || void 0 === e || e.setVisible(t)
                    }
                    addToMap(t, e) {
                        this._targetIndex = e,
                        this.renderable ? e >= 0 ? t.getLayers().insertAt(e, this.renderable) : t.addLayer(this.renderable) : this.invalidate()
                    }
                    removeFromMap(t) {
                        this.renderable && t.removeLayer(this.renderable)
                    }
                };
                var J = class extends G {
                    constructor(t, e) {
                        super(t, arguments.length > 2 && void 0 !== arguments[2] ? arguments[2] : {}, arguments.length > 3 && void 0 !== arguments[3] ? arguments[3] : void 0),
                        this._polygons = e
                    }
                    invalidate() {
                        if (this.createRenderable(), this.map) {
                            const t = this.map;
                            this.remove(),
                            this.addTo(t, this._targetIndex)
                        }
                    }
                    createRenderable() {
                        const {
                            stroke: t,
                            fill: e
                        } = this.opts;
                        let s;
                        const i = this._polygons.length > 1,
                        a = (this._polygons || []).map((t => {
                                !Object(h.isset)(s) && Object(h.isset)(t.id) && (s = t.id);
                                return [t.outer.map((t => [t.lon, t.lat])), ...t.inner ? t.inner.map((t => t.map((t => [t.lon, t.lat])))) : []]
                            }));
                        return this.source = new ol.source.Vector({
                            features: (new ol.format.GeoJSON).readFeatures({
                                type: "FeatureCollection",
                                features: [{
                                        type: "Feature",
                                        properties: {
                                            id: s
                                        },
                                        geometry: {
                                            type: i ? "MultiPolygon" : "Polygon",
                                            coordinates: i ? a : a[0] || []
                                        }
                                    }
                                ]
                            }, {
                                dataProjection: null,
                                featureProjection: "EPSG:3857"
                            })
                        }),
                        new ol.layer.Vector({
                            source: this.source,
                            style: new ol.style.Style({
                                stroke: t ? new ol.style.Stroke(t) : null,
                                fill: e ? new ol.style.Fill(e) : null
                            })
                        })
                    }
                };
                var Y = class extends G {
                    constructor(t, e) {
                        super(t, arguments.length > 2 && void 0 !== arguments[2] ? arguments[2] : {}, arguments.length > 3 && void 0 !== arguments[3] ? arguments[3] : void 0),
                        this._points = e
                    }
                    invalidate() {
                        if (this.createRenderable(), this.map) {
                            const t = this.map;
                            this.remove(),
                            this.addTo(t, this._targetIndex)
                        }
                    }
                    createRenderable() {
                        const {
                            stroke: t
                        } = this.opts,
                        e = this._points.map((t => ol.proj.transform([t.lon, t.lat], "EPSG:4326", "EPSG:3857"))),
                        s = new ol.Feature({
                            properties: {
                                id: this.id
                            },
                            geometry: new ol.geom.LineString(e)
                        });
                        return this.source = new ol.source.Vector,
                        this.source.addFeature(s),
                        new ol.layer.Vector({
                            source: this.source,
                            style: new ol.style.Style({
                                stroke: t ? new ol.style.Stroke(t) : null
                            })
                        })
                    }
                };
                var K = class extends G {
                    constructor() {
                        super(...arguments),
                        this._loadCounter = {
                            loading: 0,
                            loaded: 0
                        }
                    }
                    setUrl(t) {
                        this.opts.url = t,
                        this.map && this.invalidate()
                    }
                    setBounds(t) {
                        this.opts.bounds = t
                    }
                    invalidate() {
                        const t = this.map;
                        this.remove(),
                        this.createRenderable(),
                        t && this.addTo(t, this._targetIndex)
                    }
                    createRenderable() {
                        this._loadCounter = {
                            loading: 0,
                            loaded: 0
                        };
                        const t = new ol.source.XYZ({
                            url: this.opts.url,
                            attributions: this.opts.attribution ? [this.opts.attribution] : null
                        });
                        t.on("tileloadstart", (t => {
                                this._loadCounter.loading += 1
                            })),
                        t.on(["tileloadend", "tileloaderror"], (t => {
                                this._loadCounter.loaded += 1,
                                this._loadCounter.loaded === this._loadCounter.loading && this.trigger("load")
                            })),
                        this._source = t;
                        const e = new ol.layer.Tile({
                            source: this._source
                        });
                        return e.setOpacity(this.isHidden ? 0 : this.opacity),
                        e
                    }
                },
                Q = s("2dk7");
                const X = t => {
                    if (t.html && console.warn("awxjs - HTML markers are not currently supported with OpenLayers"), t.svg) {
                        let [e, s] = t.size || [12, 12];
                        if (t.svg.text) {
                            const i = t.svg.text;
                            if (Object(h.isArray)(i))
                                i.forEach((t => {
                                        t.autosize && ([e, s] = w.calculateTextSize(t.value, t.size))
                                    }));
                            else {
                                const t = i;
                                t.autosize && ([e, s] = w.calculateTextSize(t.value, t.size))
                            }
                        }
                        s += 3;
                        const i = w.draw(e, s, t.svg);
                        return new ol.style.Icon({
                            src: "data:image/svg+xml;base64,".concat(btoa(i)),
                            size: [e, s],
                            imgSize: [e, s],
                            crossOrigin: "anonymous"
                        })
                    }
                    if (t.icon) {
                        const e = t.icon;
                        return new ol.style.Icon({
                            src: e.url,
                            size: t.size,
                            imgSize: t.size,
                            anchor: e.anchor,
                            crossOrigin: "anonymous"
                        })
                    }
                    return null
                };
                var tt = class {
                    constructor(t) {
                        if (!document)
                            return;
                        const e = Object(P.a)('<div class="aeris__openlayers__popup"></div>');
                        this._container = e,
                        this._overlay = new ol.Overlay({
                            insertFirst: !0,
                            element: e[0],
                            autoPan: !0,
                            autoPanAnimation: {
                                duration: 250,
                                source: null
                            }
                        }),
                        t && this.setCoordinate(t)
                    }
                    addTo(t) {
                        this._map = t,
                        t.addOverlay(this._overlay);
                        const e = this._container.width();
                        e > 0 && this._container.css({
                            marginLeft: "-".concat(Math.round(e / 2), "px")
                        })
                    }
                    remove() {
                        this._map && this._map.removeOverlay(this._overlay)
                    }
                    setCoordinate(t) {
                        const [e, s] = ol.proj.fromLonLat([t.lon, t.lat]);
                        this._overlay.setPosition([Math.round(e), Math.round(s)])
                    }
                    setHTML(t) {
                        this._container.html(t)
                    }
                    setDOMContent(t) {
                        this._container.empty().append(t)
                    }
                    static injectStyles() {
                        Object(P.a)("head").append('<style type="text/css">'.concat("\n\t\t\t.aeris__openlayers__popup {\n\t\t\t\tbackground: #fff;\n\t\t\t\tborder-radius: 6px;\n\t\t\t\tbottom: 100%;\n\t\t\t\tcolor: #222;\n\t\t\t\tdisplay: block;\n\t\t\t\tfilter: drop-shadow(0 1px 4px rgba(0,0,0,0.2));\n\t\t\t\tfont-family: 'Helvetica','Arial',sans-serif;\n\t\t\t\tfont-size: 13px;\n\t\t\t\tfont-weight: normal;\n\t\t\t\tleft: 50%;\n\t\t\t\tline-height: 14px;\n\t\t\t\tmargin-bottom: 15px;\n\t\t\t\tmargin-left: -100px;\n\t\t\t\tmin-width: 120px;\n\t\t\t\tpadding: 8px 10px;\n\t\t\t\tpointer-events: none;\n\t\t\t\tposition: absolute;\n\t\t\t\ttransition: opacity .2s ease-out;\n\t\t\t\tz-index: 10000;\n\t\t\t\t-webkit-font-smoothing: antialiased\n\t\t\t}\n\n\t\t\t.aeris__openlayers__popup:after {\n\t\t\t\tborder-left: solid transparent 10px;\n\t\t\t\tborder-right: solid transparent 10px;\n\t\t\t\tborder-top: solid #fff 10px;\n\t\t\t\tbottom: -10px;\n\t\t\t\tcontent: \" \";\n\t\t\t\theight: 0;\n\t\t\t\tleft: 50%;\n\t\t\t\tmargin-left: -9px;\n\t\t\t\tposition: absolute;\n\t\t\t\twidth: 0\n\t\t\t}\n\t\t", "</style>"))
                    }
                };
                var et = class extends v {
                    get feature() {
                        return this._feature
                    }
                    get popup() {
                        return this._popup
                    }
                    update(t) {
                        var e;
                        if (!Object(h.isset)(t))
                            return;
                        const s = null === (e = t.data) || void 0 === e ? void 0 : e.value;
                        let i = t.style || {};
                        Object(h.isFunction)(i) && (i = i({
                                value: s
                            })),
                        this.setStyle(i)
                    }
                    setStyle(t) {
                        const e = X(t);
                        this.feature && e && this.feature.setStyle(new ol.style.Style({
                                image: e
                            }))
                    }
                    setPopup(t) {
                        this._popup = t
                    }
                    createRenderable() {
                        const {
                            style: t
                        } = this.opts,
                        e = this.coordinate;
                        let s;
                        if (t && (s = X(t), t.callout)) {
                            let s = t.callout;
                            if (Object(h.isFunction)(t.callout)) {
                                s = (0, t.callout)()
                            }
                            const i = new tt(e);
                            i.setHTML(s),
                            this._popup = i
                        }
                        return this._feature = new ol.Feature({
                            geometry: new ol.geom.Point(ol.proj.fromLonLat([e.lon, e.lat]))
                        }),
                        new ol.layer.Vector({
                            source: new ol.source.Vector({
                                features: [this.feature]
                            }),
                            style: new ol.style.Style({
                                image: s
                            }),
                            zIndex: t ? t.zIndex : null
                        })
                    }
                    updateVisibility(t) {}
                    addToMap(t, e) {
                        const s = this.renderable;
                        s && ["click", "mouseover", "mouseout"].forEach((e => {
                                const i = "__awxjs_".concat(e, "Handler");
                                s[i] ? s.un(e, s[i]) : (s[i] = i => {
                                        this.trigger(e, {
                                            data: this.data,
                                            marker: s
                                        }),
                                        this.popup && (this._activePopup && this._activePopup.remove(), this.popup.addTo(t), this._activePopup = this.popup)
                                    }, s.on("marker:click", s[i]))
                            })),
                        t.addLayer(this.renderable)
                    }
                    removeFromMap(t) {
                        const e = this.renderable;
                        e && ["click", "mouseover", "mouseout"].forEach((t => {
                                const s = "__awxjs_".concat(t, "Handler");
                                e[s] && e.un(t, e[s])
                            })),
                        t.removeLayer(this.renderable)
                    }
                };
                class st extends M.a {
                    get overlay() {
                        return this._overlay
                    }
                    set timestamp(t) {
                        if (this.enabled && Object(h.isset)(t) && (t = new Date(t.getFullYear(), t.getMonth(), t.getDate(), t.getHours(), t.getMinutes()), (!this._timestamp || t.getTime() !== this._timestamp.getTime()) && (this._timestamp = t, !1 === this.isAnimating() && !1 === this.isAnimationFrame && (this.animation.hide(), this.updateVisibility()), this.overlay && !1 === this.overlay.isHidden && this.canShow()))) {
                            let t = this.urlTemplate();
                            if (t) {
                                const e = this.service.range(),
                                s = e.filter(((t, s) => 0 === s || s === e.length - 1)).join("-");
                                t = t.replace(/\{s\}/, "{".concat(s, "}"))
                            }
                            this.overlay.setUrl(t)
                        }
                    }
                    show() {
                        !1 !== this._hidden && (this._hidden = !1, this.overlay && (this.overlay.setOpacity(this._opacity), this.overlay.show()))
                    }
                    hide() {
                        !0 !== this._hidden && (this._hidden = !0, this.overlay && this.overlay.hide())
                    }
                    remove() {
                        this.trigger("layer:remove", {
                            layer: this.overlay
                        })
                    }
                    setOpacity(t) {
                        let e = !(arguments.length > 1 && void 0 !== arguments[1]) || arguments[1];
                        this._opacity = t,
                        this._hidden && (t = 0),
                        this.overlay && !0 === e && this.overlay.setOpacity(t),
                        this.animation && this.animation.setOpacity(t)
                    }
                    setOrder(t) {
                        this.overlay && this.overlay.setZIndex(t)
                    }
                    createOverlay(t) {
                        let e = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : {};
                        return new K(this.key, {
                            type: "tile",
                            attribution: e.attribution
                        }, this.identifier)
                    }
                    animationLayerForDate(t, e) {
                        let s = !(arguments.length > 2 && void 0 !== arguments[2]) || arguments[2];
                        return new Promise(((t, i) => {
                                if (this.dataSource) {
                                    const i = this.dataSource.tileLayer(this.key, e, Object(h.extend)(Object(h.cloneDeep)(this._opts), {
                                                id: "".concat(this.identifier, "-anim-").concat(Object(S.mapTimestampFromDate)(e)),
                                                data: {
                                                    service: this.service
                                                },
                                                animation: {
                                                    enabled: !1
                                                }
                                            }));
                                    i.isAnimationFrame = !0,
                                    i.setOpacity(this._opacity, !0),
                                    i.hide(),
                                    !1 === s && t(i),
                                    i.overlay.on("load", (() => {
                                            s && t(i),
                                            i.setOpacity(this._opacity, !0)
                                        })),
                                    i.on("layer:remove", (() => {
                                            this.trigger("layer:remove", {
                                                layer: i.overlay
                                            })
                                        })),
                                    this.trigger("layer:add", {
                                        layer: i.overlay,
                                        relativeTo: this.overlay.renderable,
                                        offset: 1
                                    })
                                } else
                                    i(new Error("No map strategy data source provided"))
                            }))
                    }
                }
                var it = st,
                at = s("ad4Q");
                var rt = class {
                    tileLayer(t, e, s) {
                        return new it(t, e, s)
                    }
                    marker(t, e, s) {
                        return s && s.skip && !0 === s.skip ? null : new et(e, null, {
                            style: s
                        })
                    }
                    markerIcon(t) {
                        if (t.html && console.warn("awxjs - HTML markers are not currently supported with OpenLayers"), t.svg) {
                            let [e, s] = t.size || [12, 12];
                            if (t.svg.text) {
                                const i = t.svg.text;
                                if (Object(h.isArray)(i))
                                    i.forEach((t => {
                                            t.autosize && ([e, s] = w.calculateTextSize(t.value, t.size))
                                        }));
                                else {
                                    const t = i;
                                    t.autosize && ([e, s] = w.calculateTextSize(t.value, t.size))
                                }
                            }
                            s += 3;
                            const i = w.draw(e, s, t.svg);
                            return new ol.style.Icon({
                                src: "data:image/svg+xml;base64,".concat(btoa(i)),
                                size: [e, s],
                                imgSize: [e, s],
                                crossOrigin: "anonymous"
                            })
                        }
                        if (t.icon) {
                            const e = t.icon;
                            return new ol.style.Icon({
                                src: e.url,
                                size: t.size,
                                imgSize: t.size,
                                anchor: e.anchor,
                                crossOrigin: "anonymous"
                            })
                        }
                        return null
                    }
                    polygon(t, e, s) {
                        let i;
                        if (s) {
                            if (i = {
                                    stroke: null,
                                    fill: null
                                }, i.id = s.id, s.stroke) {
                                const {
                                    r: t,
                                    g: e,
                                    b: a
                                } = Object(Q.toRGB)(s.stroke.color);
                                i.stroke = {
                                    color: "rgba(".concat(t, ", ").concat(e, ", ").concat(a, ", ").concat(s.stroke.opacity || 1, ")"),
                                    width: s.stroke.width,
                                    lineCap: s.stroke.lineCap,
                                    lineJoin: s.stroke.lineJoin,
                                    lineDash: s.stroke.dashArray,
                                    lineDashOffset: s.stroke.dashOffset
                                }
                            }
                            if (s.fill) {
                                const {
                                    r: t,
                                    g: e,
                                    b: a
                                } = Object(Q.toRGB)(s.fill.color);
                                i.fill = {
                                    color: "rgba(".concat(t, ", ").concat(e, ", ").concat(a, ", ").concat(Object(h.isset)(s.fill.opacity) ? s.fill.opacity : 1, ")")
                                }
                            }
                        }
                        return e.forEach((t => {
                                i.id || (i.id = t.id)
                            })),
                        new J(t, e, i)
                    }
                    polyline(t, e, s) {
                        let i;
                        if (s && (i = {
                                    stroke: null,
                                    fill: null
                                }, i.id = s.id, s.stroke)) {
                            const {
                                r: t,
                                g: e,
                                b: a
                            } = Object(Q.toRGB)(s.stroke.color);
                            i.stroke = {
                                color: "rgba(".concat(t, ", ").concat(e, ", ").concat(a, ", ").concat(s.stroke.opacity || 1, ")"),
                                width: s.stroke.width,
                                lineCap: s.stroke.lineCap,
                                lineJoin: s.stroke.lineJoin,
                                lineDash: s.stroke.dashArray,
                                lineDashOffset: s.stroke.dashOffset
                            }
                        }
                        return new Y(t, e, i)
                    }
                };
                var ot = class extends u {
                    constructor() {
                        super(...arguments),
                        this._hasLoaded = !1,
                        this._clickedMapLayer = !1,
                        this._shapeDataById = {}
                    }
                    get strategy() {
                        return "openlayers"
                    }
                    get $el() {
                        return Object(P.a)(this.map.getTarget())
                    }
                    loadDependencies() {
                        return new Promise(((t, e) => {
                                if ("undefined" == typeof ol || void 0 === ol.Map) {
                                    const e = "6.5.0";
                                    Promise.all([Object(h.loadStyles)("https://openlayers.org/en/v".concat(e, "/css/ol.css")), Object(h.loadScript)("https://cdn.rawgit.com/openlayers/openlayers.github.io/master/en/v".concat(e, "/build/ol.js"))]).then((() => {
                                            t()
                                        }))
                                } else
                                    t()
                            }))
                    }
                    setupMap(t) {
                        this._factory = new rt,
                        this._eventMapping = {
                            unload: "unload",
                            resize: "resize",
                            dblclick: "dblclick",
                            pointermove: "mousemove",
                            zoom: "zoom",
                            zoomstart: "zoom:start",
                            zoomend: "zoom:end",
                            movestart: "move:start",
                            moveend: "move:end",
                            popupopen: "popupopen",
                            popupclose: "popupclose"
                        },
                        tt.injectStyles();
                        const e = Object(h.get)(this.opts, "map.view");
                        if (e && e instanceof ol.View) {
                            const [t, s] = ol.proj.toLonLat(e.getCenter());
                            Object(h.isset)(s) && Object(h.isset)(t) && Object(h.set)(this.opts, "center", {
                                lat: s,
                                lon: t
                            }),
                            Object(h.set)(this.opts, "zoom", e.getZoom())
                        }
                        if (Object(S.isOpenLayers)(t))
                            this._setInitialView = !1, this._map = t;
                        else {
                            if (Object(h.isString)(t) && (t = Object(P.a)(t)), Object(h.isArray)(t) && t.length > 0)
                                t = t[0];
                            else if (Object(h.isDOM)(t)) {
                                t = t[0]
                            }
                            const e = Object(h.extend)({
                                layers: [new ol.layer.Tile({
                                        source: new ol.source.OSM
                                    })]
                            }, this.opts.map);
                            e.target = t,
                            this._map = new ol.Map(e),
                            Object(P.a)("head").append("<style>.ol-zoom { top: auto; bottom: .5em; }</style>"),
                            Object(h.isset)(this.opts.center) || Object(h.set)(this.opts, "center", {
                                lat: 43,
                                lon: -93
                            }),
                            Object(h.isset)(this.opts.zoom) || Object(h.set)(this.opts, "zoom", 7)
                        }
                        setTimeout((() => {
                                this.trigger("map:ready")
                            }), 250)
                    }
                    setBaseStyle(t) {
                        const e = this.map.getLayers().item(0);
                        this.map.removeLayer(e),
                        this.map.getLayers().insertAt(0, new ol.layer.Tile({
                                source: Object(h.isset)(t) ? new ol.source.XYZ({
                                    url: t.replace(/\{s\}/, "1")
                                }) : new ol.source.OSM
                            }))
                    }
                    setBaseUrl(t) {
                        this.setBaseStyle(t)
                    }
                    setView(t, e) {
                        this.map.setView(new ol.View({
                                center: ol.proj.fromLonLat([t.lon, t.lat]),
                                zoom: e
                            }))
                    }
                    getCenter() {
                        const [t, e] = ol.proj.toLonLat(this.map.getView().getCenter());
                        return {
                            lat: e,
                            lon: t
                        }
                    }
                    setCenter(t) {
                        this.map.getView().setCenter(ol.proj.fromLonLat([t.lon, t.lat]))
                    }
                    getZoom() {
                        return this.map.getView().getZoom()
                    }
                    setZoom(t) {
                        this.map.getView().setZoom(t)
                    }
                    getBounds() {
                        const t = this.map.getView().calculateExtent(this.map.getSize()),
                        [e, s, i, a] = ol.proj.transformExtent(t, "EPSG:3857", "EPSG:4326");
                        return {
                            north: a,
                            west: e,
                            south: s,
                            east: i
                        }
                    }
                    setBounds(t) {
                        const [e, s] = ol.proj.fromLonLat([t.west, t.south]),
                        [i, a] = ol.proj.fromLonLat([t.east, t.north]),
                        r = [e, s, i, a];
                        this.map.getView().fit(r)
                    }
                    fitBounds(t) {
                        let e = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : [10, 10];
                        const [s, i] = ol.proj.fromLonLat([t.west, t.south]),
                        [a, r] = ol.proj.fromLonLat([t.east, t.north]),
                        o = [s, i, a, r];
                        let n;
                        1 === e.length ? n = [e[0], e[0], e[0], e[0]] : 2 === e.length ? n = [e[1], e[0], e[1], e[0]] : 4 === e.length && (n = [e[0], e[1], e[2], e[3]]),
                        this.map.getView().fit(o, {
                            padding: n
                        })
                    }
                    isTile(t) {
                        return t instanceof it
                    }
                    isMarker(t) {
                        return t instanceof et
                    }
                    isPolygon(t) {
                        return t instanceof J
                    }
                    isPolyline(t) {
                        return t instanceof Y
                    }
                    addOverlay(t, e) {
                        t instanceof K ? t.addTo(this.map, e) : (t instanceof ol.layer.Base || t instanceof ol.layer.Tile) && (e ? this.map.getLayers().insertAt(e, t) : this.map.addLayer(t))
                    }
                    removeOverlay(t) {
                        t instanceof K ? t.remove() : (t instanceof ol.layer.Base || t instanceof ol.layer.Tile) && this.map.removeLayer(t)
                    }
                    addMarker(t, e) {
                        if (t instanceof et)
                            this.containsLayer(t.renderable) || (t.on("click", (() => this.trigger("marker:click", {
                                            data: e,
                                            marker: t
                                        }))), t.on("mouseover", (() => this.trigger("marker:mouseover", {
                                            data: e,
                                            marker: t
                                        }))), t.on("mouseout", (() => this.trigger("marker:mouseout", {
                                            data: e,
                                            marker: t
                                        }))), t.addTo(this.map));
                        else if (t instanceof ol.layer.Vector)
                            return void(this.containsLayer(t) || this.map.addLayer(t));
                        super.addMarker(t, e)
                    }
                    removeMarker(t) {
                        t instanceof et ? (t.offAll(), t.remove()) : t instanceof ol.layer.Vector && this.map.removeLayer(t),
                        super.removeMarker(t)
                    }
                    updateMarker(t, e) {
                        let s = arguments.length > 2 && void 0 !== arguments[2] ? arguments[2] : null;
                        e && (t instanceof et && t.update(e), super.updateMarker(t, e, s))
                    }
                    showMarkers(t, e) {
                        t.forEach((t => {
                                this.isMarker(t) && (t = t.layer),
                                t instanceof ol.layer.Vector && t.setVisible(e)
                            }))
                    }
                    addShape(t, e) {
                        if ((t instanceof J || t instanceof Y) && !this.containsLayer(t.renderable)) {
                            const s = this.getIndexBoundForGeom("point", !0);
                            t.on("click", (() => this.trigger("shape:click", {
                                        data: e,
                                        shape: t
                                    }))),
                            t.on("mouseover", (() => this.trigger("shape:mouseover", {
                                        data: e,
                                        shape: t
                                    }))),
                            t.on("mouseout", (() => this.trigger("shape:mouseout", {
                                        data: e,
                                        shape: t
                                    }))),
                            t.addTo(this.map, s),
                            this._shapeDataById[t.id] = e
                        }
                        super.addShape(t, e)
                    }
                    removeShape(t) {
                        (t instanceof J || t instanceof Y) && (t.offAll(), t.remove()),
                        super.removeShape(t)
                    }
                    showShape(t) {
                        this.addShape(t)
                    }
                    hideShape(t) {
                        this.removeShape(t)
                    }
                    containsLayer(t) {
                        return -1 !== this.map.getLayers().getArray().indexOf(t)
                    }
                    coordToPoint(t) {
                        if (!Object(h.isset)(t))
                            return null;
                        const e = this.map.getPixelFromCoordinate(ol.proj.fromLonLat([t.lon, t.lat]));
                        if (e) {
                            const [t, s] = e;
                            return {
                                x: t,
                                y: s
                            }
                        }
                        return null
                    }
                    pointToCoord(t) {
                        if (!Object(h.isset)(t))
                            return null;
                        const e = this.map.getCoordinateFromPixel(ol.proj.toLonLat([t.x, t.y]));
                        if (e) {
                            const [t, s] = e;
                            return {
                                lat: s,
                                lon: t
                            }
                        }
                        return null
                    }
                    getInsertIndex(t, e) {
                        const s = this.map.getLayers().getArray(),
                        i = s.indexOf(t);
                        return -1 !== i ? Math.max(0, i + e) : s.length
                    }
                    getIndexBoundForGeom(t) {
                        let e = arguments.length > 1 && void 0 !== arguments[1] && arguments[1],
                        s = 0;
                        return this.map.getLayers().getArray().forEach(((i, a) => {
                                if (i instanceof ol.layer.Vector) {
                                    const r = i.getSource().getFeatures();
                                    if (r && r.length > 0) {
                                        r[0].getGeometry().getType().toLowerCase() === t.toLowerCase() && (s = e ? Math.min(s, a) : Math.max(s, a))
                                    }
                                }
                            })),
                        Math.max(1, s)
                    }
                    showCallout(t, e, s) {
                        const i = new tt;
                        if (i.setHTML(e), Object(S.isCoordObject)(t))
                            i.setCoordinate(t);
                        else if (this.isMarker(t))
                            i.setCoordinate(t.coordinate);
                        else if (t instanceof ol.Feature) {
                            const e = t.getGeometry();
                            if (e instanceof ol.geom.Point) {
                                const [t, s] = e.getCoordinates();
                                i.setCoordinate({
                                    lat: s,
                                    lon: t
                                })
                            }
                        }
                        this._activePopup && this._activePopup.remove(),
                        this._activePopup = i,
                        i.addTo(this.map)
                    }
                    _setupEvents() {
                        super._setupEvents();
                        const t = t => {
                            const e = this.map.getEventPixel(t),
                            s = this.map.getEventCoordinate(t);
                            return {
                                pixel: e,
                                coord: s ? ol.proj.toLonLat(s) : [null, null]
                            }
                        };
                        ["mouseover", "mouseout", "mousedown", "mouseup"].forEach((e => {
                                this.map.getTargetElement().addEventListener(e, (s => {
                                        const {
                                            pixel: i,
                                            coord: a
                                        } = t(s);
                                        this.trigger(e, {
                                            coord: {
                                                lat: a[1],
                                                lon: a[0]
                                            },
                                            point: {
                                                x: i[0],
                                                y: i[1]
                                            }
                                        })
                                    }))
                            })),
                        this.map.on("rendercomplete", (() => {
                                !1 === this._hasLoaded && (this._hasLoaded = !0, this.trigger("load"))
                            })),
                        this.map.on("click", (t => {
                                let e = !1,
                                s = !1;
                                this.map.forEachFeatureAtPixel(t.pixel, ((t, i) => {
                                        if (!s) {
                                            const a = t.getGeometry(),
                                            r = t.getProperties(),
                                            o = (Object(h.get)(r, "id") || Object(h.get)(r, "properties.id") || "").replace(/^aeriswx-/, "");
                                            if (a instanceof ol.geom.Point)
                                                e = !0, i.dispatchEvent(new at.a("marker:click")), s = !0;
                                            else if (a instanceof ol.geom.SimpleGeometry) {
                                                const e = this._shapeDataById[o];
                                                this.trigger("shape:click", {
                                                    shape: t,
                                                    data: e
                                                }),
                                                s = !0
                                            }
                                        }
                                    }), {
                                    hitTolerance: 10
                                }),
                                s ? (this._clickedMapLayer = !0, setTimeout((() => {
                                            this._clickedMapLayer = !1
                                        }), 100)) : this.trigger("click", this._dataForMapEvent("click", t)),
                                !e && this._activePopup && this._activePopup.remove()
                            })),
                        this.map.on("moveend", (t => {
                                this.trigger("change:bounds"),
                                this.trigger("change:center")
                            })),
                        this.map.on("zoomend", (t => {
                                this.trigger("change:zoom")
                            }));
                        const e = () => {
                            if (this._hoveredMapLayer) {
                                const {
                                    type: t,
                                    feature: e
                                } = this._hoveredMapLayer;
                                this.trigger("".concat(t, ":mouseout"), {
                                    [t]: e,
                                    data: null
                                }),
                                this._hoveredMapLayer = void 0
                            }
                        };
                        this.map.on("pointermove", (t => {
                                let s = !1;
                                this.map.forEachFeatureAtPixel(t.pixel, ((t, i) => {
                                        var a,
                                        r;
                                        if (!s) {
                                            const i = t.getGeometry(),
                                            o = t.getProperties(),
                                            n = (Object(h.get)(o, "id") || Object(h.get)(o, "properties.id") || "").replace(/^aeriswx-/, "");
                                            if (i instanceof ol.geom.Point)
                                                s = !0, t !== (null === (a = this._hoveredMapLayer) || void 0 === a ? void 0 : a.feature) && (e(), this.trigger("marker:mouseover", {
                                                        marker: t,
                                                        data: null
                                                    }), this._hoveredMapLayer = {
                                                        type: "marker",
                                                        feature: t
                                                    });
                                            else if (i instanceof ol.geom.SimpleGeometry && (s = !0, t !== (null === (r = this._hoveredMapLayer) || void 0 === r ? void 0 : r.feature))) {
                                                e();
                                                const s = this._shapeDataById[n];
                                                this.trigger("shape:mouseover", {
                                                    shape: t,
                                                    data: s
                                                }),
                                                this._hoveredMapLayer = {
                                                    type: "shape",
                                                    feature: t
                                                }
                                            }
                                        }
                                    })),
                                s || e()
                            }))
                    }
                    _shouldTriggerEvent(t) {
                        return "click" !== t || !1 === this._clickedMapLayer
                    }
                    _dataForMapEvent(t, e) {
                        if (!e)
                            return null;
                        let s,
                        i = null;
                        switch (t) {
                        case "pointermove":
                        case "click":
                        case "dblclick":
                            s = ol.proj.toLonLat(e.coordinate),
                            i = {
                                coord: {
                                    lat: s[1],
                                    lon: s[0]
                                },
                                point: {
                                    x: e.pixel[0],
                                    y: e.pixel[1]
                                }
                            }
                        }
                        return i
                    }
                };
                var nt = class extends m {
                    invalidate() {}
                    createRenderable() {}
                    updateVisibility(t) {}
                    addToMap(t) {
                        this.renderable && this.renderable.setMap(t)
                    }
                    removeFromMap(t) {
                        this.renderable && this.renderable.setMap(null)
                    }
                };
                var ht = class extends nt {
                    constructor(t, e) {
                        super(t, arguments.length > 2 && void 0 !== arguments[2] ? arguments[2] : {}, arguments.length > 3 && void 0 !== arguments[3] ? arguments[3] : void 0),
                        this._polygons = e
                    }
                    setOpacity(t) {
                        super.setOpacity(t),
                        this.renderable && this.renderable.forEach((e => e.setOptions(Object.assign(Object.assign({}, this.opts), {
                                        fillOpacity: this.opts.fillOpacity * t,
                                        strokeOpacity: this.opts.strokeOpacity * t
                                    }))))
                    }
                    createRenderable() {
                        const t = [],
                        e = this.opts;
                        return this._polygons.forEach((s => {
                                const i = s.outer.map((t => ({
                                                lat: t.lat,
                                                lng: t.lon
                                            }))),
                                a = s.inner.map((t => t.map((t => ({
                                                        lat: t.lat,
                                                        lng: t.lon
                                                    })))));
                                e.paths = [i].concat(a);
                                const r = new google.maps.Polygon(Object.assign(Object.assign({}, e), {
                                            fillOpacity: this.opts.fillOpacity * this.opacity,
                                            opacity: this.opts.strokeOpacity * this.opacity
                                        }));
                                r.addListener("click", (() => this.trigger("click", {
                                            polygon: this
                                        }))),
                                r.addListener("mouseover", (() => this.trigger("mouseover", {
                                            polygon: this
                                        }))),
                                r.addListener("mouseout", (() => this.trigger("mouseout", {
                                            polygon: this
                                        }))),
                                t.push(r)
                            })),
                        t
                    }
                    addToMap(t) {
                        this.renderable && this.renderable.forEach((e => e.setMap(t)))
                    }
                    removeFromMap(t) {
                        this.renderable && this.renderable.forEach((t => t.setMap(null)))
                    }
                };
                var lt = class extends nt {
                    constructor(t, e) {
                        super(t, arguments.length > 2 && void 0 !== arguments[2] ? arguments[2] : void 0, arguments.length > 3 && void 0 !== arguments[3] ? arguments[3] : void 0),
                        this._points = e
                    }
                    setOpacity(t) {
                        super.setOpacity(t),
                        this.renderable && this.renderable.setOptions(Object.assign(Object.assign({}, this.opts), {
                                strokeOpacity: t
                            }))
                    }
                    createRenderable() {
                        const t = new google.maps.Polyline(Object.assign(Object.assign({}, this.opts), {
                                    path: this._points.map((t => ({
                                                lat: t.lat,
                                                lng: t.lon
                                            })))
                                }));
                        return t.addListener("click", (() => this.trigger("click", {
                                    polyline: this
                                }))),
                        t.addListener("mouseover", (() => this.trigger("mouseover", {
                                    polyline: this
                                }))),
                        t.addListener("mouseout", (() => this.trigger("mouseout", {
                                    polyline: this
                                }))),
                        t
                    }
                    addToMap(t) {
                        this.renderable && this.renderable.setMap(t)
                    }
                    removeFromMap(t) {
                        this.renderable && this.renderable.setMap(null)
                    }
                };
                var ct = class extends nt {
                    setOpacity(t) {
                        super.setOpacity(t),
                        this.renderable && this.renderable.setOpacity(t)
                    }
                    setZIndex(t) {
                        if (this.map && this.renderable) {
                            const e = this.map.overlayMapTypes.getArray().indexOf(this.renderable);
                            -1 !== e && (this.map.overlayMapTypes.removeAt(e), this.map.overlayMapTypes.insertAt(t, this.renderable))
                        }
                    }
                    updateVisibility(t) {
                        this.renderable && this.renderable.setOpacity(t ? this.opacity : 0)
                    }
                    setUrl(t) {
                        this.opts.url = t,
                        this.map && this.invalidate()
                    }
                    invalidate() {
                        const t = this.map;
                        this.remove(),
                        setTimeout((() => {
                                this.enabled && this.addTo(t)
                            }), 200)
                    }
                    createRenderable() {
                        const t = new google.maps.ImageMapType({
                            name: this.id,
                            opacity: this.opacity,
                            tileSize: new google.maps.Size(256, 256),
                            getTileUrl: (t, e) => {
                                let s = this.opts.url;
                                if (!Object(h.isset)(s))
                                    return null;
                                const i = {
                                    x: t.x,
                                    y: t.y,
                                    z: e,
                                    s: Math.abs(t.x + t.y) % 4 + 1
                                };
                                return Object.keys(i).forEach((t => {
                                        s = s.replace(new RegExp("{".concat(t, "}")), "".concat(i[t]))
                                    })),
                                s
                            }
                        });
                        return google.maps.event.addListenerOnce(t, "tilesloaded", (() => {
                                this.trigger("load", {
                                    overlay: t
                                })
                            })),
                        t
                    }
                    addToMap(t) {
                        this.renderable && (this.opts.zIndex >= 0 ? t.overlayMapTypes.insertAt(this.opts.zIndex, this.renderable) : t.overlayMapTypes.push(this.renderable))
                    }
                    removeFromMap(t) {
                        if (this.renderable) {
                            google.maps.event.clearListeners(this.renderable, "tilesloaded");
                            const t = this.map.overlayMapTypes.getArray().indexOf(this.renderable);
                            -1 !== t && this.map.overlayMapTypes.removeAt(t)
                        }
                    }
                };
                const dt = t => {
                    const e = {};
                    return t.stroke ? (e.strokeColor = t.stroke.color, e.strokeOpacity = t.stroke.opacity, e.strokeWeight = t.stroke.width) : e.strokeOpacity = 0,
                    t.fill ? (e.fillColor = t.fill.color, e.fillOpacity = t.fill.opacity) : e.fillOpacity = 0,
                    Object(h.isset)(t.fillOpacity) || (t.fillOpacity = 1),
                    Object(h.isset)(t.strokeOpacity) || (t.strokeOpacity = 1),
                    e
                },
                ut = t => {
                    if (t.html && console.warn("awxjs - HTML markers are not currently supported with Google Maps"), t.svg) {
                        let [e, s] = t.size || [12, 12];
                        if (t.svg.text) {
                            const i = t.svg.text;
                            if (Object(h.isArray)(i))
                                i.forEach((t => {
                                        t.autosize && ([e, s] = w.calculateTextSize(t.value, t.size))
                                    }));
                            else {
                                const t = i;
                                t.autosize && ([e, s] = w.calculateTextSize(t.value, t.size))
                            }
                        }
                        s += 3;
                        const i = w.draw(e, s, t.svg);
                        return {
                            url: "data:image/svg+xml;base64,".concat(btoa(i)),
                            size: new google.maps.Size(e, s),
                            scaledSize: new google.maps.Size(e, s),
                            anchor: new google.maps.Point(e / 2, s / 2)
                        }
                    }
                    if (t.icon) {
                        const e = t.icon,
                        s = {
                            url: e.url,
                            size: new google.maps.Size(t.size[0], t.size[1]),
                            scaledSize: new google.maps.Size(t.size[0], t.size[1])
                        };
                        return e.anchor && 2 === e.anchor.length && (s.anchor = new google.maps.Point(e.anchor[0], e.anchor[1])),
                        s
                    }
                    return null
                };
                var pt = class extends v {
                    update(t) {
                        var e;
                        if (!Object(h.isset)(t))
                            return;
                        const s = null === (e = t.data) || void 0 === e ? void 0 : e.value;
                        let i = t.style || {};
                        Object(h.isFunction)(i) && (i = i({
                                value: s
                            })),
                        this.setStyle(i)
                    }
                    setStyle(t) {
                        const e = ut(t);
                        e && this.renderable.setIcon(e)
                    }
                    createRenderable() {
                        const {
                            style: t
                        } = this.opts,
                        e = this.coordinate,
                        s = {};
                        t && (s.icon = ut(t), t.zIndex && (s.zIndex = t.zIndex));
                        const i = new google.maps.Marker(Object(h.extend)({
                                    position: new google.maps.LatLng(e.lat, e.lon),
                                    optimized: !1
                                }, s));
                        if (t && t.callout) {
                            let e = t.callout;
                            if (Object(h.isFunction)(t.callout)) {
                                e = (0, t.callout)()
                            }
                        }
                        return i
                    }
                    updateVisibility(t) {}
                    addToMap(t, e) {
                        const s = this.renderable;
                        s && (this._events.forEach((t => {
                                    const e = "__awxjs_".concat(t, "Handler");
                                    s[e] ? s[e].remove() : s[e] = s.addListener(t, (() => {
                                                this.trigger(t, {
                                                    data: this.data,
                                                    marker: s
                                                })
                                            }))
                                })), s.setMap(t))
                    }
                    removeFromMap(t) {
                        const e = this.renderable;
                        e && (this._events.forEach((t => {
                                    const s = "__awxjs_".concat(t, "Handler");
                                    e[s] && e[s].remove()
                                })), e.setMap(null))
                    }
                };
                class mt extends M.a {
                    constructor(t, e, s) {
                        var i;
                        super(t, e, s),
                        this._layerRemovedWhileLoading = !1,
                        this._tileLoadCheckInterval = null,
                        null === (i = this.animation) || void 0 === i || i.on("reset", (() => {
                                this._loadingSource && this.trigger("layer:remove", {
                                    layer: this._loadingSource.overlay
                                })
                            }))
                    }
                    get overlay() {
                        return this._overlay
                    }
                    set timestamp(t) {
                        this.enabled && Object(h.isset)(t) && (t = new Date(t.getFullYear(), t.getMonth(), t.getDate(), t.getHours(), t.getMinutes()), this._timestamp && t.getTime() === this._timestamp.getTime() || (this._timestamp = t, !1 === this.isAnimating() && !1 === this.isAnimationFrame && (this.animation.hide(), this.updateVisibility()), this.overlay && !1 === this.overlay.isHidden && this.canShow() && this.overlay.setUrl(this.urlTemplate())))
                    }
                    show() {
                        !1 !== this._hidden && (this._hidden = !1, this.overlay && this.overlay.setOpacity(this._opacity))
                    }
                    hide() {
                        !0 !== this._hidden && (this._hidden = !0, this.overlay && this.overlay.setOpacity(0))
                    }
                    remove() {
                        this.trigger("layer:remove", {
                            layer: this.overlay
                        })
                    }
                    setOpacity(t) {
                        let e = !(arguments.length > 1 && void 0 !== arguments[1]) || arguments[1];
                        this._opacity = t,
                        this.overlay && !0 === e && this.isVisible() && this.overlay.setOpacity(t),
                        this.animation && this.animation.setOpacity(t)
                    }
                    setOrder(t) {
                        this.overlay.setZIndex(t)
                    }
                    createOverlay(t) {
                        let e = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : {};
                        const s = new ct(this.key, {
                            opacity: Object(h.isset)(Object(h.get)(e, "style.opacity")) ? Object(h.get)(e, "style.opacity") : 1,
                            zIndex: Object(h.get)(e, "style.zIndex")
                        }, this.identifier);
                        return s.on("map:add", (t => {
                                const {
                                    map: e
                                } = t.data || {};
                                e && google.maps.event.addListener(e.overlayMapTypes, "remove_at", ((t, e) => {
                                        this._layerRemovedWhileLoading = !0
                                    }))
                            })),
                        s
                    }
                    animationLayerForDate(t, e) {
                        let s = !(arguments.length > 2 && void 0 !== arguments[2]) || arguments[2];
                        return new Promise(((t, i) => {
                                if (this.dataSource) {
                                    const i = this.dataSource.tileLayer(this.key, e, Object(h.extend)({}, this._opts, {
                                                id: "".concat(this.identifier, "-anim-").concat(Object(S.mapTimestampFromDate)(e)),
                                                data: {
                                                    service: this.service
                                                },
                                                style: {
                                                    opacity: 0
                                                }
                                            }));
                                    i.isAnimationFrame = !0,
                                    i.hide();
                                    const a = () => {
                                        t(i),
                                        this._loadingSource = null
                                    };
                                    this._loadingSource = i,
                                    s ? (this._tileLoadCheckInterval = setTimeout((() => {
                                                    this._layerRemovedWhileLoading && a(),
                                                    this._layerRemovedWhileLoading = !1
                                                }), 2e3), i.overlay.once("load", (() => {
                                                this._tileLoadCheckInterval && window.clearInterval(this._tileLoadCheckInterval),
                                                this._tileLoadCheckInterval = null,
                                                a()
                                            }))) : a(),
                                    i.on("layer:remove", (() => {
                                            this.trigger("layer:remove", {
                                                layer: i.overlay
                                            })
                                        })),
                                    this.trigger("layer:add", {
                                        layer: i.overlay
                                    })
                                } else
                                    i(new Error("No map strategy data source provided"))
                            }))
                    }
                }
                var gt = mt;
                var yt = class {
                    tileLayer(t, e, s) {
                        return new gt(t, e, s)
                    }
                    marker(t, e, s) {
                        return s && s.skip && !0 === s.skip ? null : new pt(e, null, {
                            style: s
                        })
                    }
                    polygon(t, e, s) {
                        let i;
                        return s && (i = dt(s)),
                        new ht(t, e, i)
                    }
                    polyline(t, e, s) {
                        let i;
                        return s && (i = dt(s)),
                        new lt(t, e, i)
                    }
                };
                var ft = class extends u {
                    get strategy() {
                        return "google"
                    }
                    get $el() {
                        return Object(P.a)(this.map.getDiv())
                    }
                    constructor(t, e) {
                        super(t, Object(h.extend)({
                                accessToken: null
                            }, e)),
                        this.addAttributions = Object(h.debounce)((t => {
                                    if (Object(P.a)("#awxjs-attribution").length > 0)
                                        return;
                                    const e = Object(P.a)('<div id="awxjs-attribution"></div>');
                                    this.map.controls[google.maps.ControlPosition.BOTTOM_LEFT].push(e[0]);
                                    const s = t.join(" | "),
                                    i = {
                                        "background-color": "rgba(255,255,255,0.6)",
                                        "font-size": "10px",
                                        padding: "2px 4px 0",
                                        "white-space": "nowrap"
                                    };
                                    e.html('<span style="'.concat(Object.keys(i).map((t => "".concat(t, ": ").concat(i[t], ";"))).join(" "), '">').concat(s, "</span>"))
                                }), 500)
                    }
                    loadDependencies() {
                        return new Promise(((t, e) => {
                                if ("undefined" == typeof google || void 0 === google.maps) {
                                    Promise.all([Object(h.loadScript)("https://maps.googleapis.com/maps/api/js?key=".concat(this.opts.accessToken))]).then((() => {
                                            t()
                                        }))
                                } else
                                    t()
                            }))
                    }
                    setupMap(t) {
                        this._factory = new yt,
                        this._callout = new google.maps.InfoWindow,
                        this._eventMapping = {
                            click: "click",
                            dblclick: "dblclick",
                            mouseover: "mouseover",
                            mouseout: "mouseout",
                            mousemove: "mousemove",
                            zoom_changed: "zoom",
                            drag: "move",
                            dragstart: "move:start",
                            dragend: "move:end"
                        };
                        const e = this.opts.map;
                        if (e) {
                            const {
                                center: t,
                                zoom: s
                            } = e;
                            Object(h.isPlainObject)(t) && Object(h.isset)(t.lat) && Object(h.isset)(t.lng) && Object(h.set)(this.opts, "center", {
                                lat: t.lat,
                                lon: t.lng
                            }),
                            s && Object(h.set)(this.opts, "zoom", s)
                        }
                        if (Object(S.isGoogle)(t))
                            this._setInitialView = !1, this._map = t;
                        else {
                            if (Object(h.isString)(t) && (t = Object(P.a)(t)), Object(h.isArray)(t) && t.length > 0)
                                t = t[0];
                            else if (Object(h.isDOM)(t)) {
                                t = t[0]
                            }
                            const e = !1 === Object(h.get)(this.opts, "map.zoomControl");
                            this._map = new google.maps.Map(t, Object(h.extend)({
                                        disableDefaultUI: !0,
                                        zoomControl: !e,
                                        zoomControlOptions: {
                                            position: google.maps.ControlPosition.LEFT_BOTTOM
                                        }
                                    }, this.opts.map)),
                            Object(h.isset)(this.opts.center) || Object(h.set)(this.opts, "center", {
                                lat: 43,
                                lon: -93
                            }),
                            Object(h.isset)(this.opts.zoom) || Object(h.set)(this.opts, "zoom", 7)
                        }
                        setTimeout((() => {
                                this.trigger("map:ready")
                            }), 250)
                    }
                    setBaseStyle(t) {
                        console.warn("[Aeris] `setBaseStyle` is not supported for the Google Maps strategy")
                    }
                    setView(t, e) {
                        this.map.setOptions({
                            center: {
                                lat: t.lat,
                                lng: t.lon
                            },
                            zoom: e
                        })
                    }
                    getCenter() {
                        const t = this.map.getCenter();
                        return {
                            lat: t.lat(),
                            lon: t.lng()
                        }
                    }
                    setCenter(t) {
                        this.map.setCenter({
                            lat: t.lat,
                            lng: t.lon
                        })
                    }
                    getZoom() {
                        return this.map.getZoom()
                    }
                    setZoom(t) {
                        this.map.setZoom(t)
                    }
                    getBounds() {
                        const t = this.map.getBounds();
                        if (t) {
                            const e = t.getNorthEast(),
                            s = t.getSouthWest();
                            return {
                                north: e.lat(),
                                west: s.lng(),
                                south: s.lat(),
                                east: e.lng()
                            }
                        }
                        return null
                    }
                    setBounds(t) {
                        const e = new google.maps.LatLng(t.south, t.west),
                        s = new google.maps.LatLng(t.north, t.east);
                        this.map.fitBounds(new google.maps.LatLngBounds(e, s), 0)
                    }
                    fitBounds(t) {
                        let e = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : [10, 10];
                        const s = new google.maps.LatLng(t.south, t.west),
                        i = new google.maps.LatLng(t.north, t.east),
                        a = new google.maps.LatLngBounds(s, i);
                        let r;
                        1 === e.length ? r = e[0] : 2 === e.length ? r = {
                            top: e[1],
                            right: e[0],
                            bottom: e[1],
                            left: e[0]
                        }
                         : 4 === e.length && (r = {
                                top: e[0],
                                right: e[1],
                                bottom: e[2],
                                left: e[3]
                            }),
                        this.map.fitBounds(a, r)
                    }
                    removeAttributions() {
                        Object(P.a)("#awxjs-attribution").remove()
                    }
                    isTile(t) {
                        return t instanceof gt
                    }
                    isMarker(t) {
                        return (null == t ? void 0 : t.renderable) ? t.renderable instanceof google.maps.Marker : t instanceof google.maps.Marker
                    }
                    isPolygon(t) {
                        return t instanceof google.maps.Polygon
                    }
                    isPolyline(t) {
                        return t instanceof google.maps.Polyline
                    }
                    addSource(t) {
                        super.addSource(t),
                        this.opts.attribution && this.addAttributions([r])
                    }
                    removeSource(t) {
                        super.removeSource(t),
                        0 === this.sources.length && this.removeAttributions()
                    }
                    addOverlay(t) {
                        t instanceof ct ? (t.enabled = !0, t.addTo(this.map)) : t instanceof google.maps.ImageMapType ? this.map.overlayMapTypes.push(t) : t instanceof google.maps.GroundOverlay && t.setMap(this.map)
                    }
                    removeOverlay(t) {
                        if (t instanceof ct)
                            t.enabled = !1, t.remove();
                        else if (t instanceof google.maps.ImageMapType) {
                            const e = this.map.overlayMapTypes.getArray().indexOf(t);
                            -1 !== e && this.map.overlayMapTypes.removeAt(e)
                        } else
                            t instanceof google.maps.GroundOverlay && t.setMap(null)
                    }
                    addMarker(t, e) {
                        t instanceof pt ? (t.on("click", (() => this.trigger("marker:click", {
                                        data: e,
                                        marker: t
                                    }))), t.on("mouseover", (() => this.trigger("marker:mouseover", {
                                        data: e,
                                        marker: t
                                    }))), t.on("mouseout", (() => this.trigger("marker:mouseout", {
                                        data: e,
                                        marker: t
                                    }))), t.addTo(this.map)) : t instanceof google.maps.Marker && t.setMap(this.map),
                        super.addMarker(t, e)
                    }
                    removeMarker(t) {
                        t instanceof pt ? (t.offAll(), t.remove()) : t instanceof google.maps.Marker && t.setMap(null),
                        super.removeMarker(t)
                    }
                    updateMarker(t, e) {
                        e && t instanceof pt && t.update(e)
                    }
                    bindCalloutToMarker(t, e) {
                        this.isMarker(t) && t.addListener("click", (() => {
                                this._callout.setContent(e),
                                this._callout.open(this.map, t)
                            }))
                    }
                    addShape(t, e) {
                        t instanceof ht || t instanceof lt ? (t.on("click", (() => this.trigger("shape:click", {
                                        data: e,
                                        shape: t
                                    }))), t.on("mouseover", (() => this.trigger("shape:mouseover", {
                                        data: e,
                                        shape: t
                                    }))), t.on("mouseout", (() => this.trigger("shape:mouseout", {
                                        data: e,
                                        shape: t
                                    }))), t.addTo(this.map)) : (this.isPolygon(t) || this.isPolyline(t)) && t.setMap(this.map),
                        super.addShape(t, e)
                    }
                    removeShape(t) {
                        t instanceof ht || t instanceof lt ? (t.offAll(), t.remove()) : (this.isPolygon(t) || this.isPolyline(t)) && t.setMap(null),
                        super.removeShape(t)
                    }
                    showShape(t) {
                        this.addShape(t)
                    }
                    hideShape(t) {
                        this.removeShape(t)
                    }
                    coordToPoint(t) {
                        if (!Object(h.isset)(t))
                            return null;
                        const e = this.map.getProjection(),
                        s = this.map.getBounds(),
                        i = e.fromLatLngToPoint(s.getNorthEast()),
                        a = e.fromLatLngToPoint(s.getSouthWest()),
                        r = Math.pow(this.map.getZoom(), 2),
                        o = e.fromLatLngToPoint(new google.maps.LatLng(t.lat, t.lon));
                        return {
                            x: (o.x - a.x) * r,
                            y: (o.y - i.y) * r
                        }
                    }
                    pointToCoord(t) {
                        if (!Object(h.isset)(t))
                            return null;
                        const e = this.map.getProjection(),
                        s = this.map.getBounds(),
                        i = e.fromLatLngToPoint(s.getNorthEast()),
                        a = e.fromLatLngToPoint(s.getSouthWest()),
                        r = Math.pow(this.map.getZoom(), 2),
                        o = e.fromPointToLatLng(new google.maps.Point(t.x / r * a.x, t.y / r + i.y));
                        return {
                            lat: o.lat(),
                            lon: o.lng()
                        }
                    }
                    showCallout(t, e, s) {
                        if (Object(S.isCoordObject)(t)) {
                            new google.maps.InfoWindow(Object.assign(Object.assign({}, s), {
                                    position: new google.maps.LatLng(t.lat, t.lon),
                                    content: e
                                })).open(this.map)
                        } else if (t instanceof google.maps.Marker) {
                            new google.maps.InfoWindow(Object.assign(Object.assign({}, s), {
                                    content: e
                                })).open(this.map, t)
                        }
                    }
                    _setupEvents() {
                        super._setupEvents();
                        const t = () => {
                            this.trigger("change:bounds"),
                            this.trigger("change:center")
                        };
                        this.map.addListener("dragend", (e => {
                                t()
                            })),
                        this.map.addListener("zoom_changed", (e => {
                                t(),
                                this.trigger("change:zoom")
                            }))
                    }
                    _dataForMapEvent(t, e) {
                        if (!e)
                            return null;
                        const s = e.pixel || {
                            x: void 0,
                            y: void 0
                        };
                        let i = null;
                        switch (t) {
                        case "mouseover":
                        case "mousemove":
                        case "mousedown":
                        case "mouseup":
                        case "click":
                        case "dblclick":
                            i = {
                                coord: {
                                    lat: e.latLng.lat(),
                                    lon: e.latLng.lng()
                                },
                                point: {
                                    x: s.x,
                                    y: s.y
                                }
                            }
                        }
                        return i
                    }
                },
                bt = s("njwm"),
                vt = s("lnrW");
                var _t = class {
                    constructor(t) {
                        this._configs = {
                            "air-quality": bt.b.airquality,
                            convective: bt.b.convectiveOutlook,
                            "drought-monitor": bt.b.droughtMonitor,
                            earthquakes: bt.b.earthquakes,
                            fires: bt.b.fires,
                            "fire-outlook": bt.b.fireOutlook,
                            "lightning-strikes": bt.b.lightningStrikes,
                            records: bt.b.records,
                            "river-observations": bt.b.rivers,
                            stormcells: bt.b.stormcells,
                            stormreports: bt.b.stormreports,
                            text: bt.b.text
                        },
                        t && this.setStyles(t)
                    }
                    getConfig(t) {
                        return this._configs[t]
                    }
                    setConfig(t, e) {
                        this._configs[t] = e
                    }
                    setStyle(t, e) {
                        const s = this.getConfig(t) || {};
                        if (Object(vt.c)(t)) {
                            let t;
                            t = e.raster ? e.raster : e,
                            s.style = Object(h.extend)(s.style, t)
                        } else if (Object(vt.d)(t) || Object(vt.b)(t)) {
                            let t,
                            i,
                            a;
                            const r = Object(h.isset)(e.marker) || Object(h.isset)(e.polygon) || Object(h.isset)(e.polyline);
                            e.marker ? t = e.marker : !1 === r && (t = e),
                            e.polygon ? i = e.polygon : !1 === r && (i = e),
                            e.polyline ? a = e.polyline : !1 === r && (a = e),
                            s.style = Object(h.extend)(s.style, {
                                marker: t,
                                polygon: i,
                                polyline: a
                            })
                        }
                        this._configs[t] = Object(h.cloneDeep)(s)
                    }
                    setStyles(t) {
                        Object.keys(t).forEach((e => this.setStyle(e, t[e])))
                    }
                    getStyle(t, e) {
                        const s = this.getConfig(t);
                        if (s) {
                            const t = s.style;
                            return t[e] ? t[e] : t
                        }
                    }
                    setTextStyle(t) {
                        this.setStyle("text", {
                            marker: t
                        })
                    }
                    getTextStyle() {
                        return this.getStyle("text", "marker")
                    }
                },
                Ot = s("fnc3"),
                wt = s("GdSY"),
                jt = s("Hz+P"),
                kt = s("QAwG");
                class xt extends kt.a {
                    constructor() {
                        super(...arguments),
                        this._order = new Map,
                        this._mapping = new Map
                    }
                    get mapping() {
                        return this._mapping
                    }
                    get order() {
                        return this._order
                    }
                    add(t, e, s) {
                        super.add(t, e),
                        Object(h.isset)(s) && this._order.set(t, s)
                    }
                    get(t) {
                        let e = super.get(t);
                        if (!Object(h.isset)(e)) {
                            const s = this.mapping.get(t);
                            s && (e = super.get(s))
                        }
                        return e
                    }
                }
                var Tt = xt;
                var Lt = class extends m {
                    get sourceId() {
                        return "".concat(this.layerId, "-source")
                    }
                    get parentId() {
                        return this._relativeTo
                    }
                    set parentId(t) {
                        this._relativeTo = t
                    }
                    setOpacity(t) {
                        super.setOpacity(t),
                        this.exists() && !this.isHidden && ("raster" === this.renderable.type ? this.map.setPaintProperty(this.layerId, "raster-opacity", t) : "fill" === this.renderable.type && this.map.setPaintProperty(this.layerId, "fill-opacity", t))
                    }
                    setZIndex(t) {
                        if (this.exists()) {
                            const e = this.map.getStyle().layers;
                            let s = 0;
                            e.forEach(((t, e) => {
                                    "line" === t.type && /^admin-/.test(t.id) && 0 === s && (s = e)
                                }));
                            const i = e.map((t => t.id))[s + t];
                            this.map.removeLayer(this.layerId),
                            this.map.addLayer(this.renderable, i)
                        }
                    }
                    exists() {
                        const t = this.map;
                        return !!t && (void 0 !== t.getLayer(this.layerId) && void 0 !== t.getSource(this.sourceId))
                    }
                    invalidate() {
                        throw new Error("Subclasses must override `invalidate`")
                    }
                    createRenderable() {
                        return null
                    }
                    updateVisibility(t) {
                        this.exists() && ("raster" === this.renderable.type && this.map.setPaintProperty(this.layerId, "raster-opacity", this.opacity), this.map.setLayoutProperty(this.layerId, "visibility", t ? "visible" : "none"))
                    }
                    addToMap(t) {
                        if (this.exists())
                            return;
                        if (!this._relativeTo) {
                            t.getStyle().layers.forEach(((t, e) => {
                                    "line" === t.type && /^admin-/.test(t.id) && !this._relativeTo && (this._relativeTo = t.id)
                                }))
                        }
                        void 0 !== t.getLayer(this.layerId) || (this.source ? (t.addSource(this.sourceId, this.source), this._relativeTo && void 0 === t.getLayer(this._relativeTo) || t.addLayer(this.renderable, this._relativeTo)) : this.invalidate()),
                        this.isHidden && this.hide()
                    }
                    removeFromMap(t) {
                        void 0 !== t.getLayer(this.layerId) && (t.removeLayer(this.layerId), t.removeSource(this.sourceId))
                    }
                };
                var Mt = class extends Lt {
                    constructor(t, e) {
                        super(t, arguments.length > 2 && void 0 !== arguments[2] ? arguments[2] : {}, arguments.length > 3 && void 0 !== arguments[3] ? arguments[3] : void 0),
                        this._needsEventSetup = !0,
                        this._polygons = e
                    }
                    get strokeLayerId() {
                        return "".concat(this.layerId, "-stroke")
                    }
                    addTo(t) {
                        if (super.addTo(t), this._strokeLayer) {
                            void 0 !== t.getLayer(this.strokeLayerId) || t.addLayer(this._strokeLayer, this.layerId)
                        }
                        this._needsEventSetup && (t.on("click", this.layerId, (t => {
                                    this.trigger("click", {
                                        data: this.data,
                                        shape: this.renderable
                                    })
                                })), t.on("mouseenter", this.layerId, (t => {
                                    this.trigger("mouseover", {
                                        data: this.data,
                                        shape: this.renderable
                                    })
                                })), t.on("mouseleave", this.layerId, (t => {
                                    this.trigger("mouseout", {
                                        data: this.data,
                                        shape: this.renderable
                                    })
                                })), this._needsEventSetup = !1)
                    }
                    remove() {
                        if (this.map) {
                            if (this._strokeLayer) {
                                void 0 !== this.map.getLayer(this.strokeLayerId) && this.map.removeLayer(this.strokeLayerId)
                            }
                            super.remove()
                        }
                    }
                    invalidate() {
                        const t = this._polygons.length > 1,
                        e = (this._polygons || []).map((t => [t.outer.map((t => [t.lon, t.lat])), ...t.inner ? t.inner.map((t => t.map((t => [t.lon, t.lat])))) : []]));
                        if (this.source = {
                                type: "geojson",
                                data: {
                                    type: "FeatureCollection",
                                    features: [{
                                            type: "Feature",
                                            geometry: {
                                                type: t ? "MultiPolygon" : "Polygon",
                                                coordinates: t ? e : e[0] || []
                                            }
                                        }
                                    ]
                                }
                            }, this.createRenderable(), this.map) {
                            const t = this.map;
                            this.remove(),
                            this.addTo(t)
                        }
                    }
                    createRenderable() {
                        const t = this.opts,
                        e = {
                            fill: {},
                            stroke: {}
                        };
                        return ["fill", "line"].forEach((s => {
                                const i = "line" === s ? "stroke" : "fill";
                                Object.keys(t).filter((t => new RegExp("^".concat(s, "-")).test(t))).forEach((s => {
                                        const a = F.hyphenate(s);
                                        Object(h.isset)(t[s]) && (e[i][a] = t[s])
                                    }))
                            })),
                        Object.keys(e.stroke).length > 0 && (this._strokeLayer = {
                                id: this.strokeLayerId,
                                type: "line",
                                source: this.sourceId,
                                layout: {},
                                paint: e.stroke
                            }), {
                            id: this.layerId,
                            type: "fill",
                            source: this.sourceId,
                            layout: {},
                            paint: e.fill
                        }
                    }
                };
                var St = class extends Lt {
                    constructor(t, e) {
                        super(t, arguments.length > 2 && void 0 !== arguments[2] ? arguments[2] : {}, arguments.length > 3 && void 0 !== arguments[3] ? arguments[3] : void 0),
                        this._needsEventSetup = !0,
                        this._points = e
                    }
                    addTo(t) {
                        super.addTo(t),
                        this._needsEventSetup && (t.on("click", this.layerId, (t => {
                                    this.trigger("click", {
                                        data: this.data,
                                        shape: this.renderable
                                    })
                                })), t.on("mouseenter", this.layerId, (t => {
                                    this.trigger("mouseover", {
                                        data: this.data,
                                        shape: this.renderable
                                    })
                                })), t.on("mouseleave", this.layerId, (t => {
                                    this.trigger("mouseout", {
                                        data: this.data,
                                        shape: this.renderable
                                    })
                                })), this._needsEventSetup = !1)
                    }
                    invalidate() {
                        if (this.source = {
                                type: "geojson",
                                data: {
                                    type: "FeatureCollection",
                                    features: [{
                                            type: "Feature",
                                            geometry: {
                                                type: "LineString",
                                                coordinates: this._points.map((t => [t.lon, t.lat]))
                                            }
                                        }
                                    ]
                                }
                            }, this.createRenderable(), this.map) {
                            const t = this.map;
                            this.remove(),
                            this.addTo(t)
                        }
                    }
                    createRenderable() {
                        const t = Object(h.cloneDeep)(this.opts);
                        return {
                            id: this.layerId,
                            type: "line",
                            source: this.sourceId,
                            layout: {},
                            paint: t
                        }
                    }
                };
                var It = class extends Lt {
                    constructor(t, e) {
                        let s = arguments.length > 2 && void 0 !== arguments[2] ? arguments[2] : void 0;
                        super(t, Object(h.extend)({
                                type: "tile"
                            }, e), s),
                        this._type = this.opts.type
                    }
                    setUrl(t) {
                        this.opts.url = t,
                        this.map && this.invalidate()
                    }
                    setBounds(t) {
                        this.opts.bounds = t
                    }
                    setImage(t) {
                        let e = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : void 0;
                        this.opts.url = t;
                        const s = this.map;
                        if (!s)
                            return;
                        e || (e = this.opts.bounds);
                        const i = s.getSource(this.sourceId);
                        i ? i.updateImage({
                            url: t,
                            coordinates: [[e.west, e.north], [e.east, e.north], [e.east, e.south], [e.west, e.south]]
                        }) : this.invalidate()
                    }
                    invalidate() {
                        const {
                            url: t,
                            bounds: e
                        } = this.opts;
                        if (t) {
                            if ("image" === this._type) {
                                if (!e)
                                    return;
                                this.source = {
                                    type: "image",
                                    url: t,
                                    coordinates: [[e.west, e.north], [e.east, e.north], [e.east, e.south], [e.west, e.south]]
                                }
                            } else
                                this.source = {
                                    type: "raster",
                                    tiles: [1, 2, 3, 4].map((e => t.replace(/\{s\}/, "".concat(e)))),
                                    tileSize: 256,
                                    attribution: this.opts.attribution || ""
                                };
                            if (this.createRenderable(), this.map) {
                                const t = this.map;
                                this.remove(),
                                this.addTo(t)
                            }
                        }
                    }
                    updateVisibility(t) {
                        this.exists() && this.map.setPaintProperty(this.layerId, "raster-opacity", t ? this.opacity : 0)
                    }
                    createRenderable() {
                        return {
                            id: this.layerId,
                            type: "raster",
                            source: this.sourceId,
                            paint: {
                                "raster-opacity": this.opacity,
                                "raster-opacity-transition": {
                                    duration: 0,
                                    delay: 0
                                },
                                "raster-fade-duration": 0
                            }
                        }
                    }
                };
                var Et = class extends v {
                    update(t) {
                        var e;
                        if (!Object(h.isset)(t))
                            return;
                        const {
                            data: s
                        } = t;
                        Object(h.isset)(s) && (this.data = Object.assign(Object.assign({}, this.data), s));
                        const i = null === (e = this.data) || void 0 === e ? void 0 : e.value;
                        let a = t.style || {};
                        Object(h.isFunction)(a) && (a = a({
                                value: i
                            })),
                        this.setStyle(a)
                    }
                    setStyle(t) {
                        this.opts.style = t,
                        this.invalidate()
                    }
                    createRenderable() {
                        const {
                            style: t
                        } = this.opts,
                        e = this.coordinate,
                        s = {};
                        t && (s.icon = q(t), t.zIndex && (s.zIndex = t.zIndex));
                        const i = new maplibregl.Marker({
                            element: s.icon
                        });
                        if (i.setLngLat([e.lon, e.lat]), t && t.callout) {
                            let e = t.callout;
                            if (Object(h.isFunction)(t.callout)) {
                                e = (0, t.callout)()
                            }
                            const s = new maplibregl.Popup;
                            s.setHTML(e),
                            i.setPopup(s)
                        }
                        return i
                    }
                    updateVisibility(t) {}
                    addToMap(t, e) {
                        const s = this.renderable;
                        if (s) {
                            const e = s.getElement();
                            this._events.forEach((t => {
                                    const i = "__awxjs_".concat(t, "Handler");
                                    s[i] ? e.removeEventListener(t, s[i]) : s[i] = e => {
                                        e.stopPropagation(),
                                        this.trigger(t, {
                                            data: this.data,
                                            marker: s
                                        })
                                    },
                                    e.addEventListener(t, s[i])
                                })),
                            s.addTo(t)
                        }
                    }
                    removeFromMap(t) {
                        const e = this.renderable;
                        if (e) {
                            const t = e.getElement();
                            this._events.forEach((s => {
                                    const i = "__awxjs_".concat(s, "Handler");
                                    e[i] && t.removeEventListener(s, e.__awxjs_clickHandler)
                                })),
                            e.remove()
                        }
                    }
                };
                class zt extends M.a {
                    constructor(t, e, s) {
                        super(t, e, s);
                        const i = this.animation,
                        a = new It(t, Object(h.extend)(s, {
                                    type: "image"
                                }), "".concat(this.identifier, "-anim"));
                        null == i || i.on("show", (t => {
                                this.show()
                            })),
                        null == i || i.on("hide", (t => {
                                this.hide()
                            })),
                        null == i || i.on("load:image advance:image", (t => {
                                const e = t.data.img;
                                e && a.setImage(e.src)
                            })),
                        this._animationOverlay = a,
                        this.on("overlay:ready", (() => {
                                const t = Object(h.get)(s, "style.opacity"),
                                e = Object(h.get)(s, "style.belowLayer");
                                s.id && (this._overlay.id = s.id, this._animationOverlay.id = "".concat(s.id, "-anim")),
                                Object(h.isset)(t) && (this._overlay.setOpacity(t), this._animationOverlay.setOpacity(t)),
                                this._overlay.parentId = e,
                                this._animationOverlay.parentId = this._overlay.layerId
                            }))
                    }
                    get overlay() {
                        return this._overlay
                    }
                    set timestamp(t) {
                        var e;
                        this.enabled && Object(h.isset)(t) && (t = new Date(t.getFullYear(), t.getMonth(), t.getDate(), t.getHours(), t.getMinutes()), this._timestamp && t.getTime() === this._timestamp.getTime() || (this._timestamp = t, !1 === this.isAnimating() && !1 === this.isAnimationFrame && (null === (e = this.animation) || void 0 === e || e.hide(), this.updateVisibility()), !this.overlay || !this.canShow() && this.overlay.exists() || this.overlay.setUrl(this.urlTemplate())))
                    }
                    show() {
                        var t;
                        !1 !== this._hidden && (this._hidden = !1, (null === (t = this.animation) || void 0 === t ? void 0 : t.isAnimating()) && this._animationOverlay ? this._animationOverlay.show() : this.overlay && this.overlay.show())
                    }
                    hide() {
                        !0 !== this._hidden && (this._hidden = !0, this.overlay && this.overlay.hide(), this._animationOverlay && this._animationOverlay.hide())
                    }
                    remove() {
                        this.trigger("layer:remove", {
                            layer: this.overlay
                        })
                    }
                    setOpacity(t) {
                        var e;
                        this._opacity = t,
                        this.overlay && this.overlay.setOpacity(t),
                        this._animationOverlay && this._animationOverlay.setOpacity(t),
                        null === (e = this.animation) || void 0 === e || e.setOpacity(t)
                    }
                    setOrder(t) {
                        this.overlay && this.overlay.setZIndex(t),
                        this._animationOverlay && this._animationOverlay.setZIndex(t)
                    }
                    createOverlay(t) {
                        let e = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : {};
                        return new It(this.key, Object(h.extend)(e, {
                                type: "type"
                            }), this.identifier)
                    }
                    animationLayerForDate(t, e) {
                        let s = !(arguments.length > 2 && void 0 !== arguments[2]) || arguments[2];
                        return new Promise(((t, i) => {
                                if (this.dataSource) {
                                    const i = this.dataSource.tileLayer(this.key, e, Object(h.extend)({}, this._opts, {
                                                id: "".concat(this.identifier, "-anim-").concat(Object(S.mapTimestampFromDate)(e)),
                                                opacity: 0,
                                                data: {
                                                    service: this.service
                                                },
                                                animation: {
                                                    enabled: !1
                                                }
                                            }));
                                    if (i.isAnimationFrame = !0, i.setOpacity(this._opacity, !1), i.hide(), s) {
                                        this.overlay.map.on("sourcedata", (e => {
                                                const {
                                                    sourceId: s,
                                                    isSourceLoaded: a
                                                } = e || {};
                                                s === i.overlay.sourceId && a && t(i)
                                            }))
                                    } else
                                        t(i);
                                    i.on("layer:remove", (() => {
                                            this.trigger("layer:remove", {
                                                layer: i.overlay
                                            })
                                        })),
                                    this.trigger("layer:add", {
                                        layer: i.overlay
                                    })
                                } else
                                    i(new Error("No map strategy data source provided"))
                            }))
                    }
                }
                var Pt = zt;
                var Ct = class {
                    tileLayer(t, e, s) {
                        return new Pt(t, e, s)
                    }
                    marker(t, e, s) {
                        return s && s.skip && !0 === s.skip ? null : new Et(e, void 0, {
                            style: s
                        })
                    }
                    polygon(t, e, s) {
                        let i;
                        return s && (i = V(s)),
                        e.forEach((t => {
                                i.id || (i.id = t.id)
                            })),
                        new Mt(t, e, i, i.id)
                    }
                    polyline(t, e, s) {
                        let i;
                        s && s && (i = V(s), delete i.fill);
                        e.map((t => [t.lat, t.lon]));
                        return new St(t, e, i, i.id)
                    }
                };
                const At = "2.4.0",
                Ft = t => "https://unpkg.com/maplibre-gl@".concat(t, "/dist");
                var Bt = class extends u {
                    constructor() {
                        super(...arguments),
                        this._pointAnimationUpdates = {},
                        this._shapeDataById = {},
                        this._clickedMapLayer = !1
                    }
                    get strategy() {
                        return "maplibre"
                    }
                    get $el() {
                        return Object(P.a)(this.map.getContainer())
                    }
                    loadDependencies() {
                        const t = document.createElement("style");
                        return t.innerHTML = ".maplibregl-marker { line-height: 0; }",
                        window.document.body.appendChild(t),
                        new Promise(((t, e) => {
                                "undefined" == typeof maplibregl || void 0 === maplibregl.Map ? Promise.all([Object(h.loadStyles)("".concat(Ft(At), "/maplibre-gl.css")), Object(h.loadScript)("".concat(Ft(At), "/maplibre-gl.js"))]).then((() => {
                                        t()
                                    })) : t()
                            }))
                    }
                    setupMap(t) {
                        this._factory = new Ct,
                        this._eventMapping = {
                            load: "load",
                            remove: "unload",
                            resize: "resize",
                            click: "click",
                            dblclick: "dblclick",
                            mousedown: "mousedown",
                            mouseup: "mouseup",
                            mouseover: "mouseover",
                            mouseout: "mouseout",
                            mousemove: "mousemove",
                            zoom: "zoom",
                            zoomstart: "zoom:start",
                            zoomend: "zoom:end",
                            move: "move",
                            movestart: "move:start",
                            moveend: "move:end"
                        };
                        const e = this.opts.map;
                        if (e) {
                            const {
                                center: t,
                                zoom: s
                            } = e;
                            if (t && Object(h.isArray)(t)) {
                                const [e, s] = t;
                                Object(h.isset)(s) && Object(h.isset)(e) && Object(h.set)(this.opts, "center", {
                                    lat: s,
                                    lon: e
                                })
                            }
                            s && Object(h.set)(this.opts, "zoom", s)
                        }
                        if (Object(S.isMaplibre)(t))
                            this._setInitialView = !1, this._map = t, setTimeout((() => {
                                    this.trigger("map:ready")
                                }), 250);
                        else {
                            if (Object(h.isString)(t) && (t = Object(P.a)(t)), Object(h.isArray)(t) && t.length > 0)
                                t = t[0];
                            else if (Object(h.isDOM)(t)) {
                                t = t[0]
                            }
                            this._map = new maplibregl.Map(Object(h.extend)({}, this.opts.map, {
                                        container: t,
                                        style: this.opts.style
                                    })),
                            this._currentMapStyle = this.opts.style,
                            Object(h.isset)(this.opts.center) || Object(h.set)(this.opts, "center", {
                                lat: 43,
                                lon: -93
                            }),
                            Object(h.isset)(this.opts.zoom) || Object(h.set)(this.opts, "zoom", 7),
                            this.map.on("load", (() => {
                                    setTimeout((() => {
                                            this.trigger("map:ready")
                                        }), 250)
                                }))
                        }
                    }
                    setBaseStyle(t) {
                        if (t === this._currentMapStyle)
                            return;
                        const e = this.map,
                        s = e.getStyle(),
                        i = s.layers.filter((t => /^aeris-/.test(t.id))),
                        a = Object.keys(s.sources).filter((t => /^aeris-/.test(t))).reduce(((t, e) => (t[e] = s.sources[e], t)), {});
                        e.on("style.load", (() => {
                                Object.keys(a).forEach((t => {
                                        e.getSource(t) || e.addSource(t, a[t])
                                    })),
                                i.forEach((t => {
                                        e.getLayer(t.id) || e.addLayer(t)
                                    }))
                            })),
                        e.setStyle(t, {
                            diff: !0
                        })
                    }
                    setView(t, e) {
                        this.map.jumpTo({
                            center: {
                                lat: t.lat,
                                lon: t.lon
                            },
                            zoom: Math.max(1, e - 1)
                        })
                    }
                    getCenter() {
                        const t = this._map.getCenter();
                        return {
                            lat: t.lat,
                            lon: t.lng
                        }
                    }
                    setCenter(t) {
                        this._map.setCenter({
                            lat: t.lat,
                            lon: t.lon
                        })
                    }
                    getZoom() {
                        return this._map.getZoom() + 1
                    }
                    setZoom(t) {
                        this._map.setZoom(Math.max(0, t - 1))
                    }
                    getBounds() {
                        const t = this.map.getBounds();
                        return {
                            north: t.getNorth(),
                            west: t.getWest(),
                            south: t.getSouth(),
                            east: t.getEast()
                        }
                    }
                    setBounds(t) {
                        const e = new maplibregl.LngLat(t.west, t.south),
                        s = new maplibregl.LngLat(t.east, t.north);
                        this.map.fitBounds(new maplibregl.LngLatBounds(e, s))
                    }
                    fitBounds(t) {
                        let e = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : [10, 10];
                        const s = new maplibregl.LngLat(t.west, t.south),
                        i = new maplibregl.LngLat(t.east, t.north),
                        a = new maplibregl.LngLatBounds(s, i),
                        r = {};
                        1 === e.length ? r.padding = e[0] : 2 === e.length ? r.padding = {
                            top: e[1],
                            right: e[0],
                            bottom: e[1],
                            left: e[0]
                        }
                         : 4 === e.length && (r.padding = {
                                top: e[0],
                                right: e[1],
                                bottom: e[2],
                                left: e[3]
                            }),
                        this.map.fitBounds(a, r)
                    }
                    isTile(t) {
                        return t instanceof Pt
                    }
                    isMarker(t) {
                        return t instanceof maplibregl.Marker
                    }
                    isPolygon(t) {
                        return t instanceof Mt
                    }
                    isPolyline(t) {
                        return t instanceof St
                    }
                    addSource(t) {
                        super.addSource(t),
                        this.isTile(t) && t.updateVisibility()
                    }
                    addOverlay(t) {
                        t instanceof It && t.addTo(this.map)
                    }
                    removeOverlay(t) {
                        t instanceof It && t.remove()
                    }
                    addMarker(t, e) {
                        t instanceof Et ? (t.on("click", (() => this.trigger("marker:click", {
                                        data: e,
                                        marker: t
                                    }))), t.on("mouseover", (() => this.trigger("marker:mouseover", {
                                        data: e,
                                        marker: t
                                    }))), t.on("mouseout", (() => this.trigger("marker:mouseout", {
                                        data: e,
                                        marker: t
                                    }))), t.addTo(this.map)) : t instanceof maplibregl.Marker && t.addTo(this.map),
                        super.addMarker(t, e)
                    }
                    removeMarker(t) {
                        t instanceof Et ? (t.offAll(), t.remove()) : t instanceof maplibregl.Marker && t.remove(),
                        super.removeMarker(t)
                    }
                    updateMarker(t, e) {
                        Object(h.isset)(e) && t instanceof Et && t.update(e)
                    }
                    addShape(t, e) {
                        (t instanceof Mt || t instanceof St) && (t.on("click", (() => this.trigger("shape:click", {
                                        data: e,
                                        shape: t
                                    }))), t.on("mouseover", (() => this.trigger("shape:mouseover", {
                                        data: e,
                                        shape: t
                                    }))), t.on("mouseout", (() => this.trigger("shape:mouseout", {
                                        data: e,
                                        shape: t
                                    }))), t.addTo(this.map), this._shapeDataById[t.id] = e),
                        super.addShape(t, e)
                    }
                    removeShape(t) {
                        (t instanceof Mt || t instanceof St) && (t.offAll(), t.remove()),
                        super.removeShape(t)
                    }
                    showShape(t) {
                        this.isPolygon(t) || this.isPolyline(t) ? t.show() : super.showShape(t)
                    }
                    hideShape(t) {
                        this.isPolygon(t) || this.isPolyline(t) ? t.hide() : super.hideShape(t)
                    }
                    coordToPoint(t) {
                        const e = this.map.project({
                            lat: t.lat,
                            lng: t.lon
                        });
                        return {
                            x: e.x,
                            y: e.y
                        }
                    }
                    pointToCoord(t) {
                        const e = this.map.unproject([t.x, t.y]);
                        return {
                            lat: e.lat,
                            lon: e.lng
                        }
                    }
                    showCallout(t, e, s) {
                        const i = new maplibregl.Popup(s).setHTML(e);
                        Object(S.isCoordObject)(t) ? i.setLngLat({
                            lat: t.lat,
                            lng: t.lon
                        }).addTo(this.map) : this.isMarker(t) && (t.setPopup(i), t.togglePopup())
                    }
                    _setupEvents() {
                        this.map.on("movestart", (t => {
                                ["before:change:bounds", "before:change:center"].forEach((t => this.trigger(t)))
                            })),
                        this.map.on("moveend", (t => {
                                ["after:change:bounds", "after:change:center", "change:bounds", "change:center"].forEach((t => this.trigger(t)))
                            })),
                        this.map.on("zoomstart", (t => {
                                ["before:change:zoom"].forEach((t => this.trigger(t)))
                            })),
                        this.map.on("zoomend", (t => {
                                ["after:change:zoom", "change:zoom"].forEach((t => this.trigger(t)))
                            })),
                        super._setupEvents()
                    }
                    _shouldTriggerEvent(t) {
                        return "click" !== t || !1 === this._clickedMapLayer
                    }
                    _dataForMapEvent(t, e) {
                        if (!e)
                            return null;
                        let s = null;
                        switch (t) {
                        case "mouseover":
                        case "mousemove":
                        case "mousedown":
                        case "mouseup":
                        case "click":
                        case "dblclick":
                            s = {
                                coord: {
                                    lat: e.lngLat.lat,
                                    lon: e.lngLat.lng
                                },
                                point: {
                                    x: e.point.x,
                                    y: e.point.y
                                }
                            }
                        }
                        return s
                    }
                };
                const Dt = {
                    "tropical-cyclones": "tropical.Systems",
                    "tropical-cyclones-break-points": "tropical.Breakpoints"
                },
                Rt = t => Object(h.isset)(Dt[t]);
                class Vt extends i.a {
                    constructor(t, e, s) {
                        if (super(), this._ready = !1, this._metric = !1, this.store = new Tt, this._stateForData = {}, this._resumeAnimationTimer = null, this._resumeOnBoundsChange = !1, this.update = Object(h.debounce)((() => {
                                        this._loadForBounds(!0)
                                    }), 250), this._dblClickTimer = null, !t)
                            throw new Error("[Aeris] Invalid target specified for InteractiveMap, which must be a DOM element or map instance");
                        e = e || {},
                        t instanceof HTMLElement == !1 && (Object(S.isLeaflet)(t) ? e.strategy = "leaflet" : Object(S.isMapbox)(t) ? e.strategy = "mapbox" : Object(S.isMaplibre)(t) ? e.strategy = "maplibre" : Object(S.isGoogle)(t) ? e.strategy = "google" : Object(S.isOpenLayers)(t) && (e.strategy = "openlayers")),
                        e = Object(h.extend)({
                            strategy: "leaflet",
                            center: void 0,
                            zoom: 7,
                            metric: !1,
                            timeline: {
                                from: -7200,
                                to: 0,
                                intervals: 10,
                                bufferIntervals: 2,
                                showLoading: !0,
                                showLoadingIntervals: !0,
                                resetOnBoundsChange: !0
                            },
                            refresh: 0,
                            attribution: !0,
                            onInit: void 0,
                            reloadOnBoundsChange: !0
                        }, e),
                        this._opts = e,
                        e.account && (this.account = e.account),
                        "mapbox" === e.strategy ? this._strategy = new U(t, e) : "maplibre" === e.strategy ? this._strategy = new Bt(t, e) : "google" === e.strategy ? this._strategy = new ft(t, e) : "openlayers" === e.strategy ? this._strategy = new ot(t, e) : this._strategy = new C(t, e),
                        this._strategy.dataSource = this,
                        this._timeline = new a.a(Object(h.extend)(e.timeline, {
                                    key: "map-timeline"
                                })),
                        this._sourceOrder = {
                            tile: []
                        },
                        this._layers = new vt.a(this.account),
                        this._config = new _t(e.styles),
                        this._metric = this._opts.metric;
                        const i = () => {
                            if (this._indicator = new Ot.a, this._indicator.appendTo(this.strategy.$el), this.strategy.$el.addClass("awxjs__ia-map"), this._setupEvents(), this._ready = !0, e.layers) {
                                let t = e.layers;
                                Object(h.isArray)(t) || (t = t.split(",")),
                                t.forEach((t => {
                                        if (Object(h.isString)(t))
                                            this.addLayer(t);
                                        else if (Object(h.isPlainObject)(t)) {
                                            const {
                                                layer: e,
                                                options: s
                                            } = t;
                                            this.addLayer(e, s)
                                        }
                                    }))
                            }
                            e.refresh > 0 && this.enableAutoUpdate(e.refresh),
                            s && s(this),
                            this.trigger("load"),
                            this.trigger("ready")
                        };
                        this._layers.fetch().then((() => {
                                this.strategy.isReady() ? i() : this.strategy.on("ready", (t => {
                                        i()
                                    }))
                            }))
                    }
                    get map() {
                        return this.strategy.map
                    }
                    get strategy() {
                        return this._strategy
                    }
                    get opts() {
                        return this._opts
                    }
                    get config() {
                        return this._config
                    }
                    get timeline() {
                        return this._timeline
                    }
                    get layerInfo() {
                        return this._layers
                    }
                    get account() {
                        return this._account
                    }
                    set account(t) {
                        this._account = t
                    }
                    get isMetric() {
                        return this._metric
                    }
                    isReady() {
                        return this.strategy.isReady()
                    }
                    getCenter() {
                        return this.strategy.getCenter()
                    }
                    setCenter(t) {
                        this.strategy.setCenter(t)
                    }
                    getZoom() {
                        return this.strategy.getZoom()
                    }
                    setZoom(t) {
                        this.strategy.setZoom(t)
                    }
                    setView(t, e) {
                        this.strategy.setView(t, e)
                    }
                    getBounds() {
                        return this.strategy.getBounds()
                    }
                    setBounds(t) {
                        this.strategy.setBounds(t)
                    }
                    fitBounds(t, e) {
                        e = e || [10, 10],
                        this.strategy.fitBounds(t, e)
                    }
                    setMetric(t) {
                        this._metric !== t && (this._metric = t, this.trigger("change:units", {
                                metric: t,
                                unit: t ? "metric" : "imperial"
                            }))
                    }
                    addLayer(t, e) {
                        if (this._checkReady(), !Object(h.isset)(t) || Object(h.isEmpty)(t) || !Object(h.isString)(t))
                            return console.warn("[Aeris] Cannot add invalid layer code {".concat(t, "} to InteractiveMap."), t), this;
                        const s = Object(jt.d)(t),
                        i = Object(h.get)(e, "id") || s;
                        let a = this.getSourceForId(i);
                        if (a)
                            return this;
                        const o = Dt[t];
                        return o ? (Object(S.loadMapModuleConfig)(o, ((r, o, n) => {
                                    const l = Object(h.get)(e, "id") || r;
                                    n && n.initialize(this.account, null, this),
                                    o = Object(h.extend)({}, o, e);
                                    const c = this.createSource(l, o.type, o);
                                    c.code = t,
                                    this.store.mapping.set(t, l),
                                    this.addSource(c, e),
                                    this.trigger("layer:add", {
                                        id: i,
                                        layer: s,
                                        source: a
                                    })
                                })), this) : (a = Object(jt.a)(t, Object(h.extend)({}, Object(h.cloneDeep)(e), {
                                        account: this.account,
                                        servers: this._opts.servers,
                                        time: this.timeline.currentDate(),
                                        attribution: this._opts.attribution ? r : null,
                                        timeline: {
                                            intervals: Object(h.get)(this._opts, "timeline.intervals"),
                                            alwaysShowPast: Object(h.get)(this._opts, "timeline.alwaysShowPast"),
                                            alwaysShowFuture: Object(h.get)(this._opts, "timeline.alwaysShowFuture"),
                                            bufferIntervals: Object(h.get)(this._opts, "timeline.bufferIntervals"),
                                            showLoadingIntervals: Object(h.get)(this._opts, "timeline.showLoadingIntervals")
                                        }
                                    }), this.strategy.factory, this._layers), a && (a.code = s, this.addSource(a, e), this.store.mapping.set(s, i), this.trigger("layer:add", {
                                    id: i,
                                    layer: s,
                                    source: a
                                })), this)
                    }
                    addLayers(t) {
                        return this._checkReady(),
                        t.forEach((t => this.addLayer(t))),
                        this
                    }
                    removeLayer(t) {
                        t = t.replace(/\:.+$/, "");
                        const e = this.getSourceForLayer(t);
                        if (!e)
                            return this;
                        this.removeSource(e);
                        const s = this.store.mapping.get(e.key),
                        i = this.store.mapping.get(s);
                        return this.trigger("layer:remove", {
                            id: i,
                            layer: s,
                            source: e
                        }),
                        this
                    }
                    removeLayerForId(t) {
                        const e = this.getSourceForId(t);
                        if (!e)
                            return this;
                        const s = this.store.mapping.get(e.key),
                        i = this.store.mapping.get(s);
                        return this.removeSource(e),
                        this.trigger("layer:remove", {
                            id: i,
                            layer: s,
                            source: e
                        }),
                        this
                    }
                    removeLayers(t) {
                        return t.forEach((t => this.removeLayer(t))),
                        this
                    }
                    bringLayerToFront(t) {
                        const e = this.getSourceForLayer(t);
                        this.store.count;
                        if (e && e instanceof n.c) {
                            const e = this._sourceOrder.tile,
                            s = e.indexOf(t);
                            -1 !== s && (e.splice(s, 1), e.push(t)),
                            Object.keys(this.store.items).forEach((t => {
                                    const s = this.store.get(t);
                                    s instanceof n.c && s.setOrder(e.indexOf(t) + 1)
                                }))
                        }
                    }
                    sendLayerToBack(t) {
                        const e = this.getSourceForLayer(t);
                        if (e && e instanceof n.c) {
                            const e = this._sourceOrder.tile,
                            s = e.indexOf(t);
                            -1 !== s && (e.splice(s, 1), e.splice(0, 0, t)),
                            Object.keys(this.store.items).forEach((t => {
                                    const s = this.store.get(t);
                                    s instanceof n.c && s.setOrder(e.indexOf(t) + 1)
                                }))
                        }
                    }
                    setLayerOrder(t, e) {
                        const s = this.getSourceForLayer(t);
                        s && s instanceof n.c && Object(h.isset)(e) && s.setOrder(e)
                    }
                    getSourceForLayer(t) {
                        const e = this.store.mapping.get(t);
                        return e ? this.getSource(e) : this.getSource(t)
                    }
                    getSourceForId(t) {
                        const e = this.store.mapping.get(t);
                        return e ? this.getSource(e) : this.getSource(t)
                    }
                    createSource(t, e, s) {
                        return Object(jt.b)(t, e, Object.assign({
                                account: this.account,
                                servers: this._opts.servers
                            }, s), this.strategy.factory)
                    }
                    addSource(t, e) {
                        if (this._checkReady(), !Object(h.isset)(t.key))
                            return console.error("[Aeris] Cannot add a data source with an undefined key to the map. Make sure you have set the `key` property on your data source before adding to the map."), this;
                        t.strategy = this.strategy,
                        t.enabled = !0,
                        t.identifier = t.key,
                        this.store.add(t.identifier, t),
                        this.strategy.addSource(t);
                        const s = Object(h.get)(e, "style");
                        s && this._updateSourceStyle(t, s),
                        Object(h.has)(t, "animation") && Object(h.isset)(t.animation) && !0 === t.animation.isEnabled() && this.timeline.add(t.key, t.animation);
                        const i = this.getBounds();
                        return t instanceof n.d && (t.on("data:load:start", (t => this.trigger("source:load:start", t.data))), t.on("data:load:done", (t => this.trigger("source:load:done", t.data))), t.load({
                                bounds: i,
                                from: this.timeline.startDate(),
                                to: this.timeline.endDate()
                            }).catch((e => {
                                    console.error("[Aeris] Failed to load data for VectorSource with key ".concat(t.key), e)
                                }))),
                        this.trigger("source:add", {
                            source: t,
                            id: t.key
                        }),
                        this
                    }
                    addModule(t) {
                        let e = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : null,
                        s = arguments.length > 2 && void 0 !== arguments[2] ? arguments[2] : null;
                        const i = t => {
                            t.initialize(this.account, null, this);
                            const s = t.source(),
                            i = this.createSource(t.id, s.type, Object(h.extend)({}, s, e));
                            i && this.addSource(i)
                        },
                        a = t => {
                            this.isReady ? i(t) : this.on("ready", (() => {
                                    i(t)
                                }))
                        };
                        Object(h.isFunction)(t) ? t().then((t => {
                                const e = new(t = t.default || t)(s);
                                a(e)
                            })) : Object(h.has)(t, "source") && a(t)
                    }
                    removeSource(t) {
                        t.enabled = !1,
                        this.strategy.removeSource(t),
                        Object(h.has)(t, "animation") && Object(h.isset)(t.animation) && !0 === t.animation.isEnabled() && (t.animation.reset(), this.timeline.remove(t.animation)),
                        Object(h.has)(t, "reset") && t.reset(),
                        this.store.remove(t.identifier),
                        this.store.each(((e, s) => {
                                s === t && this.store.remove(e)
                            }));
                        const e = t.key,
                        s = t.code;
                        return this.trigger("source:remove", {
                            source: t,
                            id: e,
                            layer: s
                        }),
                        this
                    }
                    removeAllSources() {
                        return this.store.each(((t, e) => {
                                this.removeSource(e)
                            })),
                        this
                    }
                    getSource(t) {
                        let e = this.store.get(t);
                        return e || (t = Object(jt.c)(t), e = this.store.get(t)),
                        e
                    }
                    hasSource(t) {
                        return t = Object(jt.c)(t),
                        this.store.has(t)
                    }
                    showCallout(t, e, s) {
                        this.strategy.showCallout(t, e, s)
                    }
                    enableAutoUpdate(t) {
                        !this._refreshInterval && t > 0 && (t = Math.max(t, 10), this._refreshInterval && window.clearInterval(this._refreshInterval), this._refreshInterval = setInterval((() => {
                                        this._updateTimeline()
                                    }), 1e3 * t))
                    }
                    disableAutoUpdate() {
                        this._refreshInterval && clearInterval(this._refreshInterval),
                        this._refreshInterval = null
                    }
                    _updateTimeline() {
                        const t = this.timeline;
                        let e = !1;
                        (t.isAnimating() || t.isLoading()) && (t.stop(), t.reset(), e = !0),
                        t.refresh(),
                        t.goToInit(),
                        e && (clearTimeout(this._restartAnimationTimeout), this._restartAnimationTimeout = setTimeout((() => {
                                        t.play()
                                    }), 300))
                    }
                    _updateSourceStyle(t) {
                        let e = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : {};
                        if (t && t instanceof n.c) {
                            const {
                                zIndex: s,
                                opacity: i
                            } = e;
                            Object(h.isset)(i) && t.setOpacity(i),
                            Object(h.isset)(s) && t.setOrder(s)
                        }
                    }
                    _loadForBounds() {
                        let t = arguments.length > 0 && void 0 !== arguments[0] && arguments[0],
                        e = arguments.length > 1 && void 0 !== arguments[1] && arguments[1];
                        const s = this.getBounds();
                        this.store.each(((i, a) => {
                                if (a instanceof n.d) {
                                    const i = a;
                                    (i.requiresBounds || !1 === i.hasData() || t) && i.load({
                                        bounds: s,
                                        from: this.timeline.startDate(),
                                        to: this.timeline.endDate()
                                    }, e).catch((t => {
                                            console.error("[Aeris] Failed to load data for VectorSource with key ".concat(a.key), t)
                                        }))
                                }
                            }))
                    }
                    _updateSourcesForDate(t) {
                        Object(h.isDate)(t) || (t = new Date(t)),
                        this.store.each(((e, s) => {
                                s instanceof n.c && (s.timestamp = t)
                            }))
                    }
                    _beforeBoundsChange() {
                        this.timeline.isAnimating() && !1 === this.timeline.isPaused() ? (this._resumeOnBoundsChange = !0, this.timeline.pause()) : this._resumeOnBoundsChange = !1
                    }
                    _afterBoundsChange() {
                        const t = Object(h.get)(this._opts, "timeline.resetOnBoundsChange");
                        let e = this._opts.reloadOnBoundsChange;
                        if (this._resumeAnimationTimer && (clearTimeout(this._resumeAnimationTimer), this._resumeAnimationTimer = null), e && !Object(h.isEmpty)(this._stateForData)) {
                            const t = this._stateForData,
                            s = this.strategy.coordToPoint(t.center),
                            i = this.strategy.coordToPoint(this.getCenter());
                            if (Object(h.isset)(s) && Object(h.isset)(i)) {
                                e = Math.max(Math.abs(s.x - i.x), Math.abs(s.y - i.y)) >= 50
                            }
                            this.getZoom() !== t.zoom && (e = !0)
                        }
                        let s = !1;
                        if (this.store.each(((t, e) => {
                                    e instanceof n.d && (s = !0)
                                })), e && (!0 === t && this.timeline.reset(), s)) {
                            const t = this.timeline.isPaused() || this.timeline.isAnimating();
                            this._loadForBounds(!1, t),
                            this._stateForData = {
                                center: this.getCenter(),
                                bounds: this.getBounds(),
                                zoom: this.getZoom()
                            }
                        }
                        this._resumeOnBoundsChange && this.timeline.isPaused() && (this._resumeAnimationTimer = setTimeout((() => {
                                        this.timeline.resume()
                                    }), 5000))
                    }
                    _setupEvents() {
                        this.strategy.on("click", (t => {
                                null === this._dblClickTimer && (this._dblClickTimer = setTimeout((() => {
                                                t.data.coord = Object(o.b)(t.data.coord),
                                                this.trigger("click", t.data),
                                                this._dblClickTimer = null
                                            }), 200))
                            })),
                        this.strategy.on("dblclick", (t => {
                                clearTimeout(this._dblClickTimer),
                                this._dblClickTimer = null,
                                this.trigger("dblclick", t.data)
                            })),
                        this.strategy.on("resize", (t => this.trigger("resize", t.data))),
                        this.strategy.on("mousedown", (t => this.trigger("mousedown", t.data))),
                        this.strategy.on("mouseup", (t => this.trigger("mouseup", t.data))),
                        this.strategy.on("mouseover", (t => this.trigger("mouseover", t.data))),
                        this.strategy.on("mouseout", (t => this.trigger("mouseout", t.data))),
                        this.strategy.on("mousemove", (t => this.trigger("mousemove", t.data))),
                        this.strategy.on("before:change:bounds", (() => {
                                this._beforeBoundsChange()
                            })),
                        this.strategy.on("change:bounds", (t => {
                                this.trigger("change:bounds", {
                                    bounds: this.getBounds()
                                }),
                                this._afterBoundsChange()
                            })),
                        this.strategy.on("change:center", (t => this.trigger("change:center", {
                                    center: this.getCenter()
                                }))),
                        this.strategy.on("change:zoom", (t => this.trigger("change:zoom", {
                                    zoom: this.getZoom()
                                }))),
                        this.strategy.on("move", (t => this.trigger("move"))),
                        this.strategy.on("move:start", (t => {
                                this.trigger("move:start"),
                                this.trigger("before:change:bounds", {
                                    bounds: this.getBounds()
                                })
                            })),
                        this.strategy.on("move:end", (t => {
                                this.trigger("move:end"),
                                this.trigger("after:change:bounds", {
                                    bounds: this.getBounds()
                                })
                            })),
                        this.strategy.on("zoom", (t => this.trigger("zoom"))),
                        this.strategy.on("zoom:start", (t => {
                                this.trigger("zoom:start"),
                                this.trigger("before:change:bounds", {
                                    bounds: this.getBounds()
                                })
                            })),
                        this.strategy.on("zoom:end", (t => {
                                this.trigger("zoom:end"),
                                this.trigger("after:change:bounds", {
                                    bounds: this.getBounds()
                                })
                            })),
                        this.strategy.on("idle", (t => this.trigger("idle"))),
                        this.strategy.on("marker:click", (t => this.trigger("marker:click", t.data))),
                        this.strategy.on("marker:mouseover", (t => this.trigger("marker:mouseover", t.data))),
                        this.strategy.on("marker:mouseout", (t => this.trigger("marker:mouseout", t.data))),
                        this.strategy.on("marker:drag", (t => this.trigger("marker:drag", t.data))),
                        this.strategy.on("marker:dragstart", (t => this.trigger("marker:dragstart", t.data))),
                        this.strategy.on("marker:dragend", (t => this.trigger("marker:dragend", t.data))),
                        this.strategy.on("shape:click", (t => this.trigger("shape:click", t.data))),
                        this.strategy.on("shape:mouseover", (t => this.trigger("shape:mouseover", t.data))),
                        this.strategy.on("shape:mouseout", (t => this.trigger("shape:mouseout", t.data))),
                        this.timeline.on("play load:start", (() => {
                                this.trigger("timeline:play", {
                                    timeline: this.timeline
                                })
                            })),
                        this.timeline.on("stop", (t => {
                                clearTimeout(this._restartAnimationTimeout),
                                this.trigger("timeline:stop", {
                                    timeline: this.timeline
                                })
                            })),
                        this.timeline.on("advance", (t => {
                                this.timeline.isAnimating() || this._updateSourcesForDate(t.data.time),
                                this.trigger("timeline:change", Object(h.extend)({
                                        timeline: this.timeline
                                    }, t.data))
                            })),
                        this.timeline.on("start:change end:change", (() => {
                                this.timeline.reset(),
                                this.update()
                            })),
                        this.timeline.on("load:start", (() => {
                                this._indicator.startAnimating()
                            })),
                        this.timeline.on("load:done", (() => {
                                this._indicator.stopAnimating()
                            }))
                    }
                    _checkReady() {
                        if (!this._ready) {
                            throw new Error("[Aeris] Must wait for an instance of InteractiveMap to be fully\n\t\t\t\tinitialized before calling methods on it. Observe the `load` or `ready` events\n\t\t\t\tthat are triggered when an InteractiveMap instance is fully initialized.".replace(/\n\s+/g, " "))
                        }
                    }
                    requestForMap(t) {
                        const e = new wt.a({
                            server: Object(h.get)(this._opts, "servers.maps"),
                            client: {
                                id: this.account.id,
                                secret: this.account.secret
                            }
                        }, {
                            type: "tile"
                        });
                        return e.layers(t),
                        e
                    }
                }
                e.a = Vt
            },
            "7r+a": function (t, e, s) {
                "use strict";
                s.d(e, "e", (function () {
                        return r
                    })),
                s.d(e, "c", (function () {
                        return o
                    })),
                s.d(e, "a", (function () {
                        return n
                    })),
                s.d(e, "b", (function () {
                        return h
                    })),
                s.d(e, "f", (function () {
                        return c
                    })),
                s.d(e, "d", (function () {
                        return d
                    }));
                s("3bBZ");
                var i = s("l1hk"),
                a = s("0lfv");
                var r = class {
                    constructor(t) {
                        if (Object(a.isEmpty)(t))
                            throw new Error("Invalid coordinates for Point");
                        const [e, s] = t;
                        this.coordinates = {
                            lat: s,
                            lon: e
                        }
                    }
                    toArray() {
                        let t = arguments.length > 0 && void 0 !== arguments[0] && arguments[0];
                        const {
                            lat: e,
                            lon: s
                        } = this.coordinates;
                        return t ? [s, e] : [e, s]
                    }
                    bounds() {
                        return i.a.fromPoints([this.coordinates])
                    }
                };
                var o = class {
                    constructor(t) {
                        if (Object(a.isEmpty)(t))
                            throw new Error("Invalid coordinates for MultiPoint");
                        this.points = t.map((t => new r(t))),
                        this.coordinates = this.points.map((t => t.coordinates))
                    }
                    toArray() {
                        let t = arguments.length > 0 && void 0 !== arguments[0] && arguments[0];
                        return this.points.map((e => e.toArray(t)))
                    }
                    bounds() {
                        const t = {
                            north: null,
                            south: null,
                            west: null,
                            east: null
                        };
                        return this.coordinates.forEach((e => {
                                Object(a.isset)(e.lat) && Object(a.isset)(e.lon) && (t.north = Math.max(t.north, e.lat), t.south = Math.min(t.south, e.lat), t.west = Math.min(t.west, e.lon), t.east = Math.max(t.east, e.lon))
                            })),
                        i.a.fromBounds(t)
                    }
                };
                var n = class {
                    constructor(t) {
                        if (Object(a.isEmpty)(t) || !Object(a.isArray)(t))
                            throw new Error("Invalid coordinates for LineString");
                        if (t.length < 2)
                            throw new Error("Coordinate count in LineString is less than 2");
                        this.coordinates = t.map((t => {
                                    if (t.length < 2)
                                        throw new Error("Coordinate dimension count is less than 2");
                                    const [e, s] = t;
                                    return {
                                        lat: s,
                                        lon: e
                                    }
                                }))
                    }
                    add(t) {
                        this.coordinates.push(t)
                    }
                    toArray() {
                        let t = arguments.length > 0 && void 0 !== arguments[0] && arguments[0];
                        return this.coordinates.map((e => t ? [e.lon, e.lat] : [e.lat, e.lon]))
                    }
                    bounds() {
                        return i.a.fromPoints(this.coordinates)
                    }
                };
                var h = class {
                    constructor(t) {
                        if (Object(a.isEmpty)(t))
                            throw new Error("Invalid coordinates for MultiLineString");
                        this.lines = t.map((t => new n(t))),
                        this.coordinates = this.lines.map((t => t.coordinates))
                    }
                    toArray() {
                        let t = arguments.length > 0 && void 0 !== arguments[0] && arguments[0];
                        return this.lines.map((e => e.toArray(t)))
                    }
                    bounds() {
                        const t = {
                            north: null,
                            south: null,
                            west: null,
                            east: null
                        };
                        return this.lines.forEach((e => {
                                const s = e.bounds();
                                Object(a.isset)(s) && (t.north = Math.max(t.north, s.north), t.south = Math.min(t.south, s.south), t.west = Math.min(t.west, s.west), t.east = Math.max(t.east, s.east))
                            })),
                        i.a.fromBounds(t)
                    }
                };
                class l {
                    constructor(t) {
                        if (Object(a.isEmpty)(t))
                            throw new Error("Invalid vertices for PolygonGeometry");
                        this.coordinates = t.map((t => {
                                    if (t.length < 2)
                                        throw new Error("Coordinate dimension count is less than 2");
                                    const [e, s] = t;
                                    return {
                                        lat: s,
                                        lon: e
                                    }
                                }))
                    }
                }
                var c = class {
                    constructor(t) {
                        if (Object(a.isEmpty)(t))
                            throw new Error("Invalid coordinates for Polygon");
                        this.inner = [],
                        this.coordinates = t.map(((t, e) => {
                                    if (t.length < 4)
                                        throw new Error("Vertex count in Polygon is less than 4");
                                    const s = new l(t);
                                    return 0 === e ? this.outer = s : this.inner.push(s),
                                    s.coordinates
                                }))
                    }
                    toArray() {
                        let t = arguments.length > 0 && void 0 !== arguments[0] && arguments[0];
                        return this.coordinates.map((e => e.map((e => t ? [e.lon, e.lat] : [e.lat, e.lon]))))
                    }
                    bounds() {
                        return i.a.fromPoints(this.outer.coordinates)
                    }
                };
                var d = class {
                    constructor(t) {
                        if (Object(a.isEmpty)(t))
                            throw new Error("Invalid coordinates for MultiPolygon");
                        this.polygons = t.map((t => new c(t))),
                        this.coordinates = this.polygons.map((t => t.coordinates))
                    }
                    toArray() {
                        let t = arguments.length > 0 && void 0 !== arguments[0] && arguments[0];
                        return this.polygons.map((e => e.toArray(t)))
                    }
                    bounds() {
                        const t = {
                            north: null,
                            south: null,
                            west: null,
                            east: null
                        };
                        return this.polygons.forEach((e => {
                                const s = e.bounds();
                                Object(a.isset)(s) && (t.north = Math.max(t.north, s.north), t.south = Math.min(t.south, s.south), t.west = Math.min(t.west, s.west), t.east = Math.max(t.east, s.east))
                            })),
                        i.a.fromBounds(t)
                    }
                }
            },
            "8TS8": function (t, e, s) {
                "use strict";
                s.d(e, "a", (function () {
                        return r
                    })),
                s.d(e, "c", (function () {
                        return o
                    })),
                s.d(e, "b", (function () {
                        return n
                    }));
                var i = s("0lfv");
                class a {
                    get bounds() {
                        return this.geometry && Object(i.has)(this.geometry, "bounds") ? this.geometry.bounds() : null
                    }
                    get adjustOpacity() {
                        var t;
                        const e = null === (t = this.style) || void 0 === t ? void 0 : t.adjustOpacity;
                        return !Object(i.isset)(e) || e
                    }
                    constructor(t, e, s) {
                        this.data = t,
                        this.style = e,
                        this.renderable = s,
                        t.id && (this.id = t.id)
                    }
                }
                class r extends a {}
                class o extends a {}
                class n extends a {}
                e.d = a
            },
            CVtS: function (t, e, s) {
                "use strict";
                s("UxlC");
                var i = s("m0x2"),
                a = s("0lfv"),
                r = s("3j3Q");
                class o extends i.a {
                    get opts() {
                        return this._opts
                    }
                    get key() {
                        return this._key
                    }
                    get account() {
                        return this.opts.account
                    }
                    get $el() {
                        return this._target
                    }
                    constructor(t, e) {
                        super(),
                        this._key = t,
                        this._opts = Object(a.extend)({
                            size: void 0,
                            autosize: !1,
                            format: "svg",
                            metric: !1
                        }, e),
                        Object(a.isset)(this._opts.size) || (this._opts.autosize = !0),
                        this._target = Object(r.a)('<div class="awxjs__legend awxjs__legend-'.concat(t, '"></div>')),
                        setTimeout((() => {
                                this.update(this._opts)
                            }), 500)
                    }
                    show() {
                        this.$el.show()
                    }
                    hide() {
                        this.$el.hide()
                    }
                    setSize(t) {
                        this._opts.size = Object(a.extend)(this._opts.size, t),
                        this.update()
                    }
                    getSize() {
                        if (this.$el) {
                            const t = this.$el.bounds(),
                            e = this.$el.outerHeight(!0);
                            return {
                                width: t.width,
                                height: e
                            }
                        }
                        return {
                            width: 0,
                            height: 0
                        }
                    }
                    setMetric(t) {
                        this._opts.metric = t,
                        this.update(null, !0)
                    }
                    units() {
                        const t = this._opts.metric ? "metric" : "imperial";
                        let e = Object(a.get)(this._opts, "units.".concat(t));
                        return e && /^(f|c)$/.test(e) && (e = e.toUpperCase()),
                        e
                    }
                    reset() {
                        this.$el.empty()
                    }
                    update(t) {}
                    resize() {
                        const t = this.getSize(),
                        e = Object(r.a)(".awxjs__legend-content", this.$el).children();
                        e && e.forEach((e => {
                                t.width = Math.max(t.width, Object(r.a)(e).outerWidth(!0))
                            })),
                        this.$el.css("width", "".concat(t.width, "px")),
                        this.trigger("resize", t)
                    }
                }
                var n = o;
                s("3bBZ");
                var h = class extends n {
                    constructor() {
                        super(...arguments),
                        this._load = Object(a.debounce)((t => {
                                    if (!t) {
                                        const t = new Error("Invalid legend url");
                                        return this.trigger("load:error", {
                                            error: t
                                        }),
                                        void this.$el.hide()
                                    }
                                    this._image || (this._image = new Image),
                                    this.trigger("load:start"),
                                    this._image.onload = () => {
                                        const e = this.units(),
                                        s = this.opts.title ? this.opts.title.replace(/\([^\)]+\)$/, "".concat(e ? "(".concat(e, ")") : "")) : null;
                                        this.$el.html("\n\t\t\t\t".concat(this.opts.title ? '<div class="awxjs__legend-title">'.concat(s, "</div>") : "", '\n\t\t\t\t<div class="awxjs__legend-content"><img src="').concat(t, '"></div>\n\t\t\t')),
                                        this.trigger("load:done"),
                                        setTimeout((() => {
                                                const t = this.getSize();
                                                t.width = Math.max(t.width, this._image.width),
                                                this.$el.css("width", "".concat(t.width, "px")),
                                                this.trigger("resize", t)
                                            }), 150)
                                    },
                                    this._image.onerror = () => {
                                        console.warn("[Aeris] ImageLegend - Failed to load image from ".concat(t))
                                    },
                                    this._image.src = t
                                }), 250)
                    }
                    get image() {
                        return this._image
                    }
                    url() {
                        let t;
                        if (Object(a.isPlainObject)(this.opts.url)) {
                            t = t[this.opts.metric ? "metric" : "imperial"]
                        } else
                            Object(a.isString)(this.opts.url) && (t = this.opts.url);
                        return t
                    }
                    getSize() {
                        const t = super.getSize();
                        return this._image && (t.width = Math.max(t.width, this._image.width)),
                        t
                    }
                    reset() {
                        this.$el.empty(),
                        this._image && (this._image.onload = null),
                        this._image = null
                    }
                    update(t) {
                        let e = arguments.length > 1 && void 0 !== arguments[1] && arguments[1];
                        Object(a.isEmpty)(t) || (e = !0),
                        !e && this._image || this._load(this.url())
                    }
                };
                var l = class extends h {
                    setSize(t) {
                        this.opts.size = Object(a.extend)(this.opts.size, t),
                        this.update()
                    }
                    url() {
                        return this._url()
                    }
                    _url() {
                        const t = this.opts,
                        e = Object(a.extend)({
                            interval: 1,
                            gutter: null,
                            radius: 6,
                            columns: 4,
                            metric: !1,
                            orientation: "h",
                            cell: {
                                size: {
                                    width: 2,
                                    height: 10
                                }
                            },
                            label: {
                                interval: 20,
                                position: "b",
                                fontsize: 11,
                                color: "#222222"
                            }
                        }, t.styles),
                        s = t.type || "bar",
                        i = e.cell || {},
                        r = e.label || {},
                        o = {};
                        if ("point" === s)
                            if (Object(a.isset)(e.gutter)) {
                                if (Object(a.isString)(e.gutter)) {
                                    const t = e.gutter.split(",");
                                    e.gutter = {
                                        x: t[0],
                                        y: t[1]
                                    }
                                }
                            } else
                                e.gutter = {
                                    x: 20,
                                    y: 5
                                };
                        if (o.ls = r.fontsize, Object(a.isEmpty)(r.custom) || (o.labels = r.custom.replace(/,\s+/g, ",").replace(/\s/g, "%20")), !Object(a.isEmpty)(r.color)) {
                            const t = r.color.replace(/#/, "");
                            6 === t.length && (o.lc = t)
                        }
                        "point" !== s || Object(a.isEmpty)(e.filter_groups) || (o.filter = e.filter_groups),
                        Object(a.isset)(t.range) && (Object(a.isString)(t.range) ? o.range = ",".concat(t.range) : Object(a.isArray)(t.range) && (1 === t.range.length ? o.range = ",".concat(t.range[0]) : o.range = t.range.join(","))),
                        Object(a.isset)(t.keys) ? o.keys = t.keys : Object(a.isset)(t.filter) && (o.filter = t.filter);
                        const n = e.units;
                        n && (t.metric ? o.units = n.metric : o.units = n.imperial);
                        const {
                            width: h,
                            height: l
                        } = t.size || {
                            width: null,
                            height: null
                        }, {
                            width: c,
                            height: d
                        } = i.size || {
                            width: null,
                            height: null
                        },
                        u = {
                            type: s,
                            interval: Object(a.isEmpty)(e.interval) ? "" : "-i".concat(e.interval),
                            label: {
                                interval: Object(a.isEmpty)(r.interval) ? "" : "-li".concat(r.interval)
                            },
                            cell: {
                                size: Object(a.isEmpty)(c) || Object(a.isEmpty)(d) ? "" : "-c".concat(c, "x").concat(d),
                                pad: Object(a.isset)(e.gutter) ? "-p".concat(e.gutter.x, ",").concat(e.gutter.y) : ""
                            },
                            layout: "-".concat(e.orientation, ",").concat(r.position),
                            metric: t.metric ? "-metric" : "",
                            size: Object(a.isEmpty)(h) || Object(a.isEmpty)(l) || t.autosize ? "" : "_".concat(h, "x").concat(l),
                            format: t.format,
                            radius: Object(a.isEmpty)(e.radius) ? "" : "-r".concat(e.radius),
                            columns: !Object(a.isEmpty)(e.columns) && e.columns > 0 ? "-col".concat(e.columns) : ""
                        };
                        let p = "https://legends.aerisapi.com/".concat(this.key);
                        return p += "point" === s ? "".concat(u.radius).concat(u.columns).concat(u.cell.pad) : "".concat(u.interval).concat(u.label.interval).concat(u.cell.size).concat(u.cell.pad).concat(u.layout).concat(u.metric),
                        p += "".concat(u.size, ".").concat(u.format),
                        p += (p.indexOf("?") > -1 ? "&" : "?") + Object.keys(o).map((t => "".concat(encodeURIComponent(t), "=").concat(o[t]))).join("&"),
                        p
                    }
                },
                c = s("DA0x");
                const d = Math.PI / 180,
                u = 180 / Math.PI,
                p = t => 128 / Math.PI * Math.pow(2, t),
                m = t => t * d,
                g = t => t * u,
                y = (t, e, s) => {
                    const i = Math.PI,
                    a = 128 / i * Math.pow(2, e),
                    r = m(t.lat),
                    o = a * (m(t.lon) + i),
                    n = a * (i - Math.log(Math.tan(.25 * i + .5 * r)));
                    return {
                        x: .5 * s.width - o,
                        y: .5 * s.height - n
                    }
                },
                f = function (t) {
                    let e = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : 4;
                    const s = Math.pow(10, e);
                    return Math.round(t * s) / s
                };
                var b;
                !function (t) {
                    t.pointToCoord = function (t, e, s) {
                        let i = arguments.length > 3 && void 0 !== arguments[3] ? arguments[3] : void 0,
                        a = arguments.length > 4 && void 0 !== arguments[4] ? arguments[4] : void 0;
                        const r = Math.PI,
                        o = p(s),
                        n = i && a ? y(i, s, a) : {
                            x: 0,
                            y: 0
                        },
                        h = t - n.x,
                        l = e - n.y,
                        c = h / o - r,
                        d = 2 * (Math.atan(Math.exp(r - l / o)) - .25 * r);
                        return {
                            lat: g(d),
                            lon: g(c)
                        }
                    },
                    t.coordToPoint = function (t, e, s) {
                        let i = arguments.length > 3 && void 0 !== arguments[3] ? arguments[3] : void 0,
                        a = arguments.length > 4 && void 0 !== arguments[4] ? arguments[4] : void 0;
                        e *= d,
                        t *= d;
                        const r = Math.PI,
                        o = p(s),
                        n = i && a ? y(i, s, a) : {
                            x: 0,
                            y: 0
                        },
                        h = o * (e + r),
                        l = o * (r - Math.log(Math.tan(.25 * r + .5 * t)));
                        return {
                            x: h + n.x,
                            y: l + n.y
                        }
                    },
                    t.getBoundsCenter = t => {
                        let e = (t.west + t.east) / 2;
                        return t.west > t.east && (e = t.west - 360 + (t.west + t.east) / 2), {
                            lat: (t.south + t.north) / 2,
                            lon: e
                        }
                    },
                    t.getBoundsZoomLevel = (t, e) => {
                        const s = t => {
                            const e = Math.sin(t * Math.PI / 180),
                            s = Math.log((1 + e) / (1 - e)) / 2;
                            return Math.max(Math.min(s, Math.PI), -Math.PI) / 2
                        },
                        i = (t, e, s) => Math.floor(Math.log(t / e / s) / Math.LN2),
                        a = (s(t.north) - s(t.south)) / Math.PI,
                        r = t.east - t.west,
                        o = (r < 0 ? r + 360 : r) / 360,
                        n = i(e.height, 256, a),
                        h = i(e.width, 256, o);
                        return Math.min(n, h, 21)
                    },
                    t.getSizeForBounds = (e, s) => {
                        const i = t.coordToPoint(e.north, e.west, s),
                        a = t.coordToPoint(e.south, e.east, s);
                        return {
                            width: a.x - i.x,
                            height: a.y - i.y
                        }
                    },
                    t.getBoundsThatFits = function (e, s) {
                        let i = arguments.length > 2 && void 0 !== arguments[2] ? arguments[2] : 0;
                        const a = t.coordToPoint(e.north, e.west, 0),
                        r = t.coordToPoint(e.south, e.east, 0),
                        o = Math.abs(r.x - a.x),
                        n = Math.abs(r.y - a.y),
                        h = a.x + o / 2,
                        l = a.y + n / 2,
                        c = {
                            width: o,
                            height: n
                        },
                        d = s.height / s.width,
                        u = f(n / o, 2),
                        p = c.width / s.width;
                        if (d !== u)
                            if (s.width < s.height) {
                                const t = s.width / s.height;
                                c.height = c.width * (1 / t)
                            } else {
                                const t = s.height / s.width;
                                c.width = c.height * (1 / t)
                            }
                        c.width += i * p,
                        c.height += i * p;
                        const m = c.width / 2,
                        g = c.height / 2,
                        y = t.pointToCoord(h - m, l - g, 0),
                        b = t.pointToCoord(h + m, l + g, 0);
                        return {
                            north: f(y.lat),
                            south: f(b.lat),
                            west: f(y.lon),
                            east: f(b.lon)
                        }
                    },
                    t.coordToTile = (t, e) => {
                        const s = Math.PI,
                        i = t.lon,
                        a = m(t.lat);
                        return {
                            x: Math.floor((i + 180) / 360 * Math.pow(2, e)),
                            y: Math.floor((1 - Math.log(Math.tan(a) + 1 / Math.cos(a)) / s) / 2 * Math.pow(2, e))
                        }
                    },
                    t.tileToCoord = (t, e) => {
                        const s = Math.PI - 2 * Math.PI * t.y / Math.pow(2, e);
                        return {
                            lat: 180 / Math.PI * Math.atan(.5 * (Math.exp(s) - Math.exp(-s))),
                            lon: t.x / Math.pow(2, e) * 360 - 180
                        }
                    }
                }
                (b || (b = {}));
                const v = (t, e, s, i) => {
                    const a = {
                        lat: t,
                        lon: e
                    },
                    r = b.pointToCoord(0, 0, s, a, i),
                    o = b.pointToCoord(i.width, i.height, s, a, i);
                    return r.lat = parseFloat(r.lat.toFixed(2)),
                    r.lon = parseFloat(r.lon.toFixed(2)),
                    o.lat = parseFloat(o.lat.toFixed(2)),
                    o.lon = parseFloat(o.lon.toFixed(2)),
                    "".concat(r.lat, ",").concat(r.lon, ",").concat(o.lat, ",").concat(o.lon)
                };
                var _ = class extends l {
                    update(t) {
                        let e = arguments.length > 1 && void 0 !== arguments[1] && arguments[1];
                        if (t) {
                            if (t.within) {
                                if (t.within.bounds) {
                                    let {
                                        east: e,
                                        west: s
                                    } = t.within.bounds;
                                    const i = Math.abs(e - s);
                                    Math.floor(i / 360) > 0 && (s = -180, e = 180),
                                    t.within.bounds.west = s,
                                    t.within.bounds.east = e
                                }
                                this.opts.within = t.within
                            }
                            this._update()
                        } else
                            Object(a.isset)(this.opts.keys) && super.update(t, e)
                    }
                    _update() {
                        this.account ? (this._request || (this._request = Object(a.debounce)((t => {
                                            this._getVtecCodes(t).then((t => {
                                                    if (this.opts.keys = t.join(","), 0 === t.length) {
                                                        const t = this.opts.title ? this.opts.title.replace(/\([^\)]+\)$/, "") : null;
                                                        this.$el.html("\n\t\t\t\t\t\t\t".concat(t ? '<div class="awxjs__legend-title">'.concat(t, "</div>") : "", '\n\t\t\t\t\t\t\t<div class="awxjs__legend-content">\n\t\t\t\t\t\t\t\t<div class="awxjs__legend-empty">No advisories within map bounds.</div>\n\t\t\t\t\t\t\t</div>\n\t\t\t\t\t\t')),
                                                        this.resize()
                                                    } else
                                                        this.show(), this.update(null, !0)
                                                }))
                                        }), 1e3)), this._request(this.opts.within)) : console.warn("[Aeris] Cannot render advisories/alerts legend, no valid Aeris account defined")
                    }
                    _getVtecCodes() {
                        let t = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : {};
                        const {
                            size: e
                        } = t;
                        let {
                            center: s,
                            bounds: i,
                            zoom: r
                        } = t;
                        return r = parseInt(r, 10),
                        new Promise(((t, o) => {
                                if (!i) {
                                    if (!e || Number.isNaN(e.width) || Number.isNaN(e.height))
                                        return void o(new Error("Size is not a number"));
                                    !i && s && (Object(a.isString)(s) && /^[\d\.-]+,[\d\.-]+/.test(s) ? (s = s.split(","), i = v(s[0], s[1], r, e)) : Object(a.isObject)(s) && s.lat && s.lon && (i = v(s.lat, s.lon, r, e)))
                                }
                                i ? this._getAdvisories(i).then((e => {
                                        t(e)
                                    })) : s && this._getPlace(s, e, r).then((e => {
                                        this._getAdvisories(e).then((e => {
                                                t(e)
                                            }))
                                    }))
                            }))
                    }
                    _getPlace(t, e, s) {
                        return new Promise(((i, a) => {
                                new c.a({
                                    client: this.account.credentials()
                                }).endpoint("places").place(t).limit(1).get().then((t => {
                                        if (t.data) {
                                            const {
                                                loc: {
                                                    lat: r,
                                                    long: o
                                                }
                                            } = t.data,
                                            n = v(r, o, s, e).split(",").map((t => parseFloat(t)));
                                            4 === n.length ? i({
                                                north: n[0],
                                                west: n[1],
                                                south: n[2],
                                                east: n[3]
                                            }) : a()
                                        }
                                    }))
                            }))
                    }
                    _getAdvisories(t) {
                        return new Promise(((e, s) => {
                                const i = this.account.canAccess("advisories_summary");
                                let r = !0;
                                const o = (t, e) => {
                                    const s = new c.a({
                                        client: this.account.credentials()
                                    });
                                    return e ? (s.endpoint("alerts/summary").fields("summary.typeCodes,summary.types.type,summary.types.code"), s.sort("priority:1"), r = !1) : s.endpoint("alerts").fields("details.type,details.name").limit(300),
                                    (t.west < -180 || t.west > 180) && (t.west += 360 * Math.floor(t.west / 360)),
                                    s.action("within").bounds(t),
                                    s
                                },
                                n = t => {
                                    const e = [];
                                    if (t)
                                        if (i) {
                                            t = t[0] || t;
                                            (Object(a.get)(t, "summary.types") || []).filter((t => Object(a.isset)(t) && Object(a.isset)(t.code))).forEach((t => {
                                                    const {
                                                        code: s,
                                                        type: i
                                                    } = t,
                                                    a = e.some((t => t.code === s));
                                                    s && !1 === a && e.push({
                                                        code: s,
                                                        name: i.toUpperCase()
                                                    })
                                                }))
                                        } else
                                            t.filter((t => Object(a.isset)(t) && Object(a.isset)(t.type))).forEach((t => {
                                                    const {
                                                        type: s,
                                                        name: i
                                                    } = t.details,
                                                    a = e.some((t => t.code === s));
                                                    s && !1 === a && e.push({
                                                        code: s,
                                                        name: i.toUpperCase()
                                                    })
                                                }));
                                    return (r ? e.sort(((t, e) => t.name < e.name ? -1 : t.name > e.name ? 1 : 0)) : e).reduce(((t, e) => (t.push(e.code), t)), [])
                                }, {
                                    west: h,
                                    east: l
                                } = t,
                                d = h > l ? Math.abs(180 - h + (180 - Math.abs(l))) : Math.abs(l - h);
                                if (d > 180 || h > l) {
                                    const s = h > l,
                                    r = h + d / 2,
                                    u = new c.a({
                                        client: this.account.credentials()
                                    }),
                                    p = o(Object(a.extend)({}, t, {
                                                east: s ? 180 : r
                                            }), i),
                                    m = o(Object(a.extend)({}, t, {
                                                west: s ? -180 : r
                                            }), i);
                                    u.addRequest(p),
                                    u.addRequest(m),
                                    u.get().then((t => {
                                            const s = Object(a.get)(t, "data.responses");
                                            let r = i ? {
                                                summary: {
                                                    types: [],
                                                    typeCodes: []
                                                }
                                            }
                                             : [];
                                            s && s.forEach((t => {
                                                    if (t = t.response || t)
                                                        if (i) {
                                                            const e = t[0] || t, {
                                                                types: s,
                                                                typeCodes: i
                                                            } = e.summary || {};
                                                            r.summary.types = r.summary.types.concat(s),
                                                            r.summary.typeCodes = r.summary.typeCodes.concat(i)
                                                        } else
                                                            Object(a.isEmpty)(t) || (r = r.concat(t))
                                                }));
                                            const o = n(r || {});
                                            e(o)
                                        }))
                                } else {
                                    o(t, i).get().then((t => {
                                            const s = n(t.data || {});
                                            e(s)
                                        }))
                                }
                            }))
                    }
                };
                class O extends i.a {
                    get key() {
                        return this._key
                    }
                    get opts() {
                        return this._opts
                    }
                    get $el() {
                        return this._target
                    }
                    constructor(t, e) {
                        super(),
                        this._loaded = [],
                        this._key = t,
                        this._opts = Object(a.extend)({
                            types: null
                        }, e),
                        this._target = Object(r.a)('<div class="awxjs__legend awxjs__legend-group awxjs__legend-'.concat(t, '"></div>')),
                        this._legends = {},
                        this._opts.types && (this.trigger("load:start"), Object.keys(this._opts.types).forEach((t => {
                                    const s = Object(a.extend)({}, e, Object(a.cloneDeep)(this._opts.types[t]));
                                    delete s.types,
                                    Object(a.isEmpty)(s.use) || (t = s.use);
                                    const i = new l(t, s);
                                    i.on("load:done", (() => {
                                            this._loaded.push(t),
                                            this._checkLoaded()
                                        })),
                                    this._legends[t] = i,
                                    this.$el.append(i.$el)
                                })))
                    }
                    show() {
                        this.$el.show()
                    }
                    hide() {
                        this.$el.hide()
                    }
                    setSize(t) {
                        Object.keys(this._legends).forEach((e => {
                                const s = this.opts.types[e];
                                this._legends[e].setSize({
                                    width: t.width * s.factor,
                                    height: t.height
                                })
                            }))
                    }
                    getSize() {
                        const t = this.$el.bounds();
                        let e = 0,
                        s = t.height;
                        return Object.keys(this._legends).forEach((t => {
                                const i = this._legends[t];
                                if (i.$el) {
                                    const t = i.$el.bounds();
                                    e += t.width,
                                    s = Math.max(s, t.height)
                                }
                            })), {
                            width: e,
                            height: s
                        }
                    }
                    setMetric(t) {
                        Object.keys(this._legends).forEach((e => {
                                this._legends[e].setMetric(t)
                            }))
                    }
                    reset() {
                        this.$el.empty(),
                        this._legends = null,
                        this._loaded = []
                    }
                    update(t) {
                        let e = arguments.length > 1 && void 0 !== arguments[1] && arguments[1];
                        this.trigger("load:start"),
                        Object.keys(this._legends).forEach((t => {
                                this._legends[t].update(null, e)
                            }))
                    }
                    _checkLoaded() {
                        this._loaded.length === Object.keys(this._opts.types).length && (this.trigger("load:done"), setTimeout((() => {
                                    const t = this.getSize();
                                    this.$el.css("width", "".concat(t.width, "px")),
                                    this.trigger("resize", t)
                                }), 150))
                    }
                }
                var w = O,
                j = s("qV3b"),
                k = s("QAwG");
                class x extends k.a {
                    constructor() {
                        super(...arguments),
                        this._mapping = new Map,
                        this._refs = new Map
                    }
                    get mapping() {
                        return this._mapping
                    }
                    get refs() {
                        return this._refs
                    }
                    add(t, e) {
                        this.get(t) || super.add(t, e),
                        this.increment(t)
                    }
                    has(t) {
                        return Object(a.isset)(this.get(t))
                    }
                    remove(t) {
                        let e = arguments.length > 1 && void 0 !== arguments[1] && arguments[1];
                        if (this.get(t))
                            if (e)
                                super.remove(t), this.mapping.delete(t), this.refs.delete(t);
                            else {
                                this.decrement(t);
                                0 === this.refCount(t) && super.remove(t)
                            }
                    }
                    map(t, e) {
                        const s = this.mapping.get(t) || [];
                        this._mapping.set(t, [...s, e])
                    }
                    increment(t) {
                        const e = this.refCount(t);
                        this.refs.set(t, e + 1)
                    }
                    decrement(t) {
                        const e = this.refCount(t);
                        e > 0 && this.refs.set(t, e - 1)
                    }
                    refCount(t) {
                        return this.refs.get(t) || 0
                    }
                }
                var T = x,
                L = function (t, e, s, i) {
                    return new(s || (s = Promise))((function (a, r) {
                            function o(t) {
                                try {
                                    h(i.next(t))
                                } catch (t) {
                                    r(t)
                                }
                            }
                            function n(t) {
                                try {
                                    h(i.throw(t))
                                } catch (t) {
                                    r(t)
                                }
                            }
                            function h(t) {
                                var e;
                                t.done ? a(t.value) : (e = t.value, e instanceof s ? e : new s((function (t) {
                                            t(e)
                                        }))).then(o, n)
                            }
                            h((i = i.apply(t, e || [])).next())
                        }))
                };
                class M extends i.a {
                    get $el() {
                        return this._target
                    }
                    get count() {
                        return this._store.count
                    }
                    constructor(t, e) {
                        if (super(), this._loading = !1, this._loadCallbacks = {}, this._onResize = () => {
                            this.trigger("resize", this.getSize())
                        }, !t)
                            throw new Error("[Aeris] Invalid DOM target specified for LegendView");
                        this._opts = Object(a.extend)({
                            size: {
                                width: 400,
                                height: 40
                            }
                        }, e),
                        this._store = new T,
                        Object(r.a)(t).append('<div class="awxjs__legend-view"></div>'),
                        this._target = Object(r.a)(".awxjs__legend-view", t)
                    }
                    add(t, e) {
                        const s = this.getKey(t);
                        let i;
                        if (!this._configs)
                            return this._loadCallbacks[t] = () => {
                                this.add(t, e)
                            },
                        void(!1 === this._loading && this.loadStyles());
                        "image" === (e = Object(a.extend)(Object(a.cloneDeep)(this._opts), e)).type && (i = e);
                        const r = this.configForType(t);
                        if (r) {
                            const {
                                config: t
                            } = r;
                            if (Object(a.isEmpty)(t) || (i = t), !Object(a.isEmpty)(t.use)) {
                                const e = this.configForType(t.use);
                                i = Object.assign(Object.assign({}, e), i)
                            }
                        }
                        if (!Object(a.isset)(i))
                            return;
                        const o = Object(a.extend)(e, {
                            title: i.title,
                            size: this._opts.size,
                            autosize: this._opts.autosize,
                            format: this._opts.format,
                            metric: this._opts.metric
                        }, i, e);
                        let n = this._store.get(s);
                        if (n)
                            return this._store.increment(s), void n.update(o);
                        i && !Object(a.isEmpty)(i) && (n = this.createLegend(t, i, o), this.addLegend(n), s !== t && this._store.map(s, t))
                    }
                    get(t) {
                        const e = this.getKey(t);
                        return e ? this._store.get(e) : null
                    }
                    set(t, e) {
                        t = t || [],
                        this.removeAll(t),
                        t.forEach((t => {
                                this.has(t) ? this.get(t).update(e) : this.add(t, e)
                            }))
                    }
                    remove(t) {
                        const e = this.getKey(t);
                        if (e) {
                            const t = this._store.get(e);
                            t && (this._store.remove(e), 0 === this._store.refCount(e) && this.removeLegend(t)),
                            t instanceof i.a && t.off("resize", this._onResize),
                            this._onResize()
                        }
                        0 === this.count && (this.$el.hide(), this.trigger("empty"))
                    }
                    setUrl(t) {
                        this.removeAll(),
                        this.$el.empty(),
                        this.$el.append('<div class="awxjs__legend"><img src="'.concat(t, '"></div>'))
                    }
                    addLegend(t) {
                        const e = t.key;
                        this._store.add(e, t),
                        this.$el.append(t.$el),
                        this.$el.show(),
                        t instanceof i.a && t.on("resize", this._onResize),
                        this.trigger("add", {
                            key: t.key,
                            count: this.count
                        }),
                        this._onResize()
                    }
                    removeLegend(t) {
                        t && (t.$el.remove(), this._store.remove(t.key, !0), this.trigger("remove", {
                                key: t.key,
                                count: this.count
                            }))
                    }
                    removeAll(t) {
                        Object.keys(this._store.items).forEach((e => {
                                let s = !0;
                                if (t) {
                                    const i = this._store.mapping.get(e) || [];
                                    -1 !== t.indexOf(e) ? s = !1 : i && i.forEach((e => {
                                                -1 !== t.indexOf(e) && (s = !1)
                                            }))
                                }
                                s && this.remove(e)
                            }))
                    }
                    has(t) {
                        const {
                            key: e
                        } = this.configForType(t);
                        return !!e && this._store.has(e)
                    }
                    update(t) {
                        this._each(((e, s) => s.update(t)))
                    }
                    setMetric(t) {
                        this._opts.metric = t,
                        this._each(((e, s) => s.setMetric(t)))
                    }
                    setSize(t) {
                        this._opts.size = t,
                        this._each(((e, s) => s.setSize(t)))
                    }
                    getSize() {
                        let t = 0,
                        e = 0;
                        return this._each(((s, i) => {
                                const a = i.getSize();
                                t += a.height,
                                e = Math.max(e, a.width)
                            })), {
                            width: e,
                            height: t
                        }
                    }
                    setWidth(t) {
                        const {
                            height: e
                        } = this._opts.size;
                        this.setSize({
                            width: t,
                            height: e
                        })
                    }
                    configForType(t) {
                        if (!this._configs)
                            return {
                                key: null,
                                config: null
                            };
                        let e,
                        s = this._configs[t];
                        return !s && /^f/.test(t) && (e = t.replace(/^f/, ""), s = this._configs[e]),
                        s || Object.keys(this._configs).forEach((i => {
                                const r = this._configs[i];
                                if (!0 === r.enabled || !Object(a.isset)(r.enabled)) {
                                    const o = r.layers;
                                    o && (o.forEach((o => {
                                                new RegExp(o).test(t) && (s = Object(a.cloneDeep)(r), e = i)
                                            })), s && !e && (e = i))
                                }
                            })), {
                            key: e || t,
                            config: Object(a.cloneDeep)(s)
                        }
                    }
                    _reset() {
                        this.$el.empty(),
                        this._each(((t, e) => e.reset()))
                    }
                    _each(t) {
                        this._store.each(t)
                    }
                    getKey(t) {
                        let e = t;
                        const s = this.configForType(t);
                        if (s) {
                            const {
                                key: t
                            } = s;
                            e = t
                        }
                        return e
                    }
                    createLegend(t, e, s) {
                        const i = this.getKey(t);
                        let r;
                        if ("image" === e.type)
                            r = new h(i, s);
                        else if (e.grouped && e.items) {
                            const t = s.types || {};
                            s.types = e.items.reduce(((e, s) => {
                                        const {
                                            config: i
                                        } = this.configForType(s.key),
                                        r = Object(a.extend)({
                                            factor: s.factor,
                                            size: {
                                                height: this._opts.size.height
                                            }
                                        }, i, t[s.key]);
                                        return r.size.width = Math.floor(this._opts.size.width * r.factor),
                                        e[s.key] = r,
                                        e
                                    }), {}),
                            r = new w(i, s)
                        } else
                            "alerts" === t || "advisories" === t || /^alerts-/.test(t) ? (r = new _(i, s), Object(a.isset)(s.within) && setTimeout((() => {
                                        this.update({
                                            account: s.account,
                                            within: s.within
                                        })
                                    }), 500)) : r = new l(i, s);
                        return r
                    }
                    loadStyles() {
                        return this._loading = !0,
                        new Promise(((t, e) => L(this, void 0, void 0, (function  * () {
                                        this._configs ? t(this._configs) : j.b.request("https://legends.aerisapi.com/defaults.json").then((e => {
                                                if (e.data) {
                                                    const s = e.data;
                                                    Object.keys(s).forEach((t => {
                                                            const e = s[t];
                                                            e.config && (Object.keys(e.config).forEach((t => {
                                                                        if (-1 !== t.indexOf("_")) {
                                                                            const s = t.replace(/^labels_/, "label_").replace(/_/g, ".");
                                                                            Object(a.set)(e.config, s, e.config[t]),
                                                                            delete e.config[t]
                                                                        }
                                                                    })), e.styles = Object(a.cloneDeep)(e.config), delete e.config)
                                                        })),
                                                    this._configs = s,
                                                    this._loading = !1,
                                                    t(Object(a.cloneDeep)(this._configs)),
                                                    Object.keys(this._loadCallbacks).forEach((t => {
                                                            (0, this._loadCallbacks[t])()
                                                        }))
                                                }
                                            }))
                                    }))))
                    }
                }
                e.a = M
            },
            "Hz+P": function (t, e, s) {
                "use strict";
                s.d(e, "c", (function () {
                        return l
                    })),
                s.d(e, "b", (function () {
                        return d
                    })),
                s.d(e, "d", (function () {
                        return u
                    })),
                s.d(e, "a", (function () {
                        return p
                    }));
                s("UxlC");
                var i = s("DA0x"),
                a = s("GdSY"),
                r = s("gqGf"),
                o = s("0lfv"),
                n = s("lnrW"),
                h = s("njwm");
                const l = t => {
                    if (!Object(o.isString)(t))
                        return;
                    const e = t.split("::");
                    return e[e.length - 1]
                },
                c = (t, e, s) => {
                    let i = Object(o.get)(e, "data.service");
                    return Object(o.isFunction)(i) && (i = i()),
                    i instanceof a.a && i.type("tile"),
                    s.tileLayer(t, i, e)
                },
                d = (t, e, s, a) => {
                    const {
                        account: n,
                        servers: h
                    } = s || {};
                    if (delete s.account, delete s.servers, -1 === ["tile", "vector", "geojson", "text"].indexOf(e))
                        return null;
                    if ("tile" === e)
                        return c(t, s, a);
                    if (s.data && !Object(o.isset)(Object(o.get)(s, "data.service"))) {
                        const t = ((t, e) => {
                            if (!Object(o.isset)(e))
                                return null;
                            let s = e.service;
                            if (Object(o.isset)(e.request)) {
                                const a = e.request;
                                if (s) {
                                    const t = a.action,
                                    e = a.parameters;
                                    t && s.action(t),
                                    e && s.setParams(e)
                                } else
                                    a.endpoint && (s = new i.a({
                                            server: a.server,
                                            client: {
                                                id: t.id,
                                                secret: t.secret
                                            }
                                        }), s.endpoint(a.endpoint), a.action && s.action(a.action), a.parameters && s.setParams(a.parameters))
                            }
                            return s
                        })(n, Object(o.extend)({}, {
                                request: {
                                    server: h.api
                                }
                            }, s.data));
                        Object(o.set)(s, "data.service", t)
                    }
                    return "vector" === e ? new r.d(t, s) : "geojson" === e ? new r.a(t, s) : "text" === e ? new r.b(t, s) : null
                },
                u = t => t.replace(/\:[^,]+/g, ""),
                p = function (t) {
                    let e = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : {},
                    s = arguments.length > 2 ? arguments[2] : void 0,
                    i = arguments.length > 3 ? arguments[3] : void 0;
                    const {
                        account: r,
                        servers: l,
                        timeline: p = {}
                    } = e || {},
                    m = u(t),
                    g = Object(o.get)(e, "id") || m;
                    if (Object(n.c)(t) || "tile" === e.type) {
                        delete e.data;
                        if (!0 === (!Object(o.isset)(e.validate) || e.validate) && !i.exists(t)) {
                            const e = i.findInvalidIds(t);
                            return void console.warn("[Aeris] Cannot add layer(s) {".concat(e, "}, not a valid AerisWeather Maps layer. See https://www.aerisweather.com/support/docs/aeris-maps/reference/map-layers/ for the list of supported AMP layers."))
                        }
                        const n = i.isFuture(t),
                        h = i.isBase(t),
                        d = i.isOverlay(t);
                        let u = Object(o.get)(e, "alwaysShow");
                        Object(o.isset)(u) || (u = n ? p.alwaysShowFuture : p.alwaysShowPast);
                        const m = ((t, e) => {
                            const {
                                layer: s,
                                request: i
                            } = e,
                            r = new a.a({
                                server: i.server,
                                client: {
                                    id: t.id,
                                    secret: t.secret
                                }
                            }, {
                                type: "tile"
                            });
                            return r.layers(s),
                            r
                        })(r, {
                            layer: t,
                            request: {
                                server: l.maps
                            }
                        });
                        m.param("format", Object(o.get)(e, "style.format") || "png");
                        let y = e;
                        if (d || h)
                            y = Object(o.extend)(y, {
                                pane: d ? "admin" : null,
                                offset: 0,
                                alwaysShow: !0,
                                animation: {
                                    enabled: !1
                                }
                            });
                        else {
                            const t = p.intervals;
                            y = Object(o.extend)({
                                animation: {
                                    enabled: !0,
                                    intervals: t
                                }
                            }, y, {
                                offset: Object(o.get)(e, "data.offset"),
                                future: n,
                                alwaysShow: u,
                                animation: {
                                    bufferIntervals: p.bufferIntervals,
                                    showLoadingIntervals: p.showLoadingIntervals
                                }
                            })
                        }
                        y.zIndex = Object(o.get)(e, "style.zIndex");
                        const f = c(g, Object(o.extend)(y, {
                                    data: {
                                        service: m
                                    }
                                }), s);
                        return f.updateVisibility(),
                        f
                    }
                    let y = "vector";
                    Object(n.b)(t) && (y = "text");
                    const f = Object(h.a)(t),
                    b = Object(o.extend)({
                        data: {
                            request: {
                                parameters: {
                                    plimit: 1
                                }
                            },
                            coordinate: t => Object(o.get)(t, "loc")
                        },
                        requiresBounds: "search" !== Object(o.get)(f, "data.request.action")
                    }, f, e);
                    return d(g, y, b, s)
                }
            },
            QAwG: function (t, e, s) {
                "use strict";
                s("3bBZ");
                var i = s("0lfv");
                e.a = class {
                    constructor() {
                        this.store = new Map
                    }
                    get items() {
                        return Array.from(this.store.entries()).reduce(((t, e) => {
                                let [s, i] = e;
                                return t[s] = i,
                                t
                            }), {})
                    }
                    get count() {
                        return this.store.size
                    }
                    has(t) {
                        return Object(i.isset)(this.get(t))
                    }
                    get(t) {
                        return this.store.get(t)
                    }
                    add(t, e) {
                        this.store.set(t, e)
                    }
                    remove(t) {
                        this.store.delete(t)
                    }
                    each(t) {
                        const e = this.items;
                        Object.keys(e).forEach((s => t(s, e[s])))
                    }
                }
            },
            R1Yn: function (t, e, s) {
                "use strict";
                s.r(e),
                s.d(e, "mapTimestampFromDate", (function () {
                        return r
                    })),
                s.d(e, "isCoordObject", (function () {
                        return o
                    })),
                s.d(e, "isLeaflet", (function () {
                        return n
                    })),
                s.d(e, "isMapbox", (function () {
                        return h
                    })),
                s.d(e, "isMaplibre", (function () {
                        return l
                    })),
                s.d(e, "isGoogle", (function () {
                        return c
                    })),
                s.d(e, "isOpenLayers", (function () {
                        return d
                    })),
                s.d(e, "isMapsGLLayer", (function () {
                        return u
                    })),
                s.d(e, "renderWithFallback", (function () {
                        return p
                    })),
                s.d(e, "loadMapModuleConfig", (function () {
                        return m
                    }));
                var i = s("Cr01"),
                a = s("0lfv");
                const r = t => {
                    const e = new Date(t.getTime() + 60 * t.getTimezoneOffset() * 1e3);
                    return Object(a.formatDate)(e, "yyyyMMddHHmm00")
                },
                o = t => {
                    if (Object(a.isPlainObject)(t)) {
                        const {
                            lat: e,
                            lon: s
                        } = t;
                        return Object(a.isset)(e) && Object(a.isset)(s)
                    }
                    return !1
                },
                n = t => {
                    if (t) {
                        const e = Object(a.has)(t, "openPopup");
                        if ("undefined" != typeof L && (t instanceof L.map || t instanceof L.Map) && e)
                            return !0;
                        if (!Object(a.isHTMLElement)(t) && e)
                            return !0
                    }
                    return !1
                },
                h = t => {
                    if (t) {
                        const e = Object(a.has)(t, "queryRenderedFeatures");
                        if ("undefined" != typeof mapboxgl && t instanceof mapboxgl.Map && e)
                            return !0;
                        if (!Object(a.isHTMLElement)(t) && e)
                            return !0
                    }
                    return !1
                },
                l = t => {
                    if (t) {
                        const e = Object(a.has)(t, "queryRenderedFeatures");
                        if ("undefined" != typeof maplibregl && t instanceof maplibregl.Map && e)
                            return !0;
                        if (!Object(a.isHTMLElement)(t) && e)
                            return !0
                    }
                    return !1
                },
                c = t => {
                    if (t) {
                        const e = Object(a.has)(t, "getStreetView");
                        if ("undefined" != typeof google && t instanceof google.maps.Map && e)
                            return !0;
                        if (!Object(a.isHTMLElement)(t) && e)
                            return !0
                    }
                    return !1
                },
                d = t => {
                    if (t) {
                        const e = Object(a.has)(t, "forEachFeatureAtPixel");
                        if ("undefined" != typeof ol && t instanceof ol.Map && e)
                            return !0;
                        if (!Object(a.isHTMLElement)(t) && e)
                            return !0
                    }
                    return !1
                },
                u = t => /^mapsgl__/.test(t) || /^mapsgl::/.test(t),
                p = function (t, e) {
                    let s = arguments.length > 2 && void 0 !== arguments[2] ? arguments[2] : "";
                    return t && Object(a.isset)(e) && !Object(a.isEmpty)(e) ? t(e) : s
                },
                m = (t, e) => {
                    Object(i.modulesLoader)().then((s => {
                            const i = Object(a.get)(s, t);
                            i && i().then((t => {
                                    const s = new(t = t.default || t);
                                    e(s.id, s.source(), s)
                                }))
                        }))
                }
            },
            dB9R: function (t, e, s) {
                "use strict";
                s("UxlC");
                var i = s("m0x2"),
                a = s("0lfv"),
                r = s("pAjv");
                class o extends i.a {
                    get key() {
                        return this.opts.key
                    }
                    get timeline() {
                        return this._timeline
                    }
                    set timeline(t) {
                        this._timeline = t,
                        t && (this.now = t.now, this.from = t.from, this.to = t.to, ["duration", "endDelay"].forEach((e => {
                                    this.opt(e, t.opt(e))
                                })), this.goToTime(t.currentTime))
                    }
                    get from() {
                        return parseFloat("".concat(this.opts.from))
                    }
                    set from(t) {
                        this.stop(),
                        this.opts.from = t,
                        this._startOffset = t - this._now.getTime(),
                        this._onTimingChange(),
                        this.trigger("start:change", {
                            from: this.startDate(),
                            to: this.endDate()
                        })
                    }
                    get to() {
                        return parseFloat("".concat(this.opts.to))
                    }
                    set to(t) {
                        this.stop(),
                        this.opts.to = t,
                        this._endOffset = t - this._now.getTime(),
                        this._onTimingChange(),
                        this.trigger("end:change", {
                            from: this.startDate(),
                            to: this.endDate()
                        })
                    }
                    get now() {
                        return this._now
                    }
                    set now(t) {
                        this._now = t
                    }
                    get duration() {
                        return this.opts.duration
                    }
                    set duration(t) {
                        t !== this.opts.duration && (this.opts.duration = t, this._updateTiming())
                    }
                    get endDelay() {
                        return this.opts.endDelay
                    }
                    set endDelay(t) {
                        this.opts.endDelay = t
                    }
                    get totalTime() {
                        return this.to - this.from
                    }
                    get currentTime() {
                        return this._time
                    }
                    get currentOffset() {
                        return this._offset
                    }
                    get increment() {
                        return this._increment
                    }
                    get position() {
                        return this._offset / this.totalTime
                    }
                    set position(t) {
                        this.goToTime(this.from + (this.to - this.from) * t)
                    }
                    constructor() {
                        let t = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : null;
                        super(),
                        this.manualAdvance = !1,
                        this._startOffset = 0,
                        this._endOffset = 0,
                        this._elapsed = 0,
                        this._time = 0,
                        this._offset = 0,
                        this._manualTimes = !1,
                        this._delay = 1 / 60,
                        this._increment = 0,
                        this._timer = null,
                        this._restartTimer = null,
                        this._paused = !1,
                        this._currentInterval = 0,
                        this._active = !1,
                        this._enabled = !0,
                        t = Object(a.extend)({}, {
                            key: void 0,
                            enabled: !0,
                            from: 0,
                            to: 0,
                            duration: 2,
                            endDelay: 1,
                            intervals: 10,
                            autoplay: !1,
                            future: !1,
                            alwaysShow: !1,
                            manualAdvance: !1
                        }, t),
                        this._now = new Date,
                        this.manualAdvance = t.manualAdvance || !1;
                        const e = this._now.getTime();
                        if (Object.keys(t).forEach((e => {
                                    let s = t[e];
                                    if (("from" === e || "to" === e) && Object(a.isString)(s)) {
                                        const t = {
                                            year: ["y", "yr"],
                                            month: ["mn", "mth"],
                                            week: ["w", "wk"],
                                            day: ["d"],
                                            hour: ["h", "hr"],
                                            minute: ["m", "min"],
                                            second: ["s", "sec"]
                                        };
                                        s = s.replace(/\s/g, ""),
                                        Object.keys(t).forEach((e => {
                                                const i = t[e];
                                                Object(a.isArray)(i) && i.forEach((t => {
                                                        const i = new RegExp("^([\\d\\.-]+)".concat(t, "$"));
                                                        s = s.replace(i, "$1".concat(e))
                                                    }))
                                            })),
                                        /(year|month|week|day|hour|minute|second)/.test(s) && (s = 3600 * Object(a.toTimeOffsetHours)(s))
                                    }
                                    Object(a.isNumeric)(s) && (s = parseFloat(s)),
                                    t[e] = s
                                })), Object(a.isString)(t.from) && (t.from = Object(r.toDate)("".concat(t.from))), Object(a.isString)(t.to) && (t.to = Object(r.toDate)("".concat(t.to))), this.opts = t, Object(a.isDate)(t.from)) {
                            const s = t.from;
                            this._startOffset = s.getTime() - e,
                            this.from = s.getTime()
                        } else
                            this._startOffset = 1e3 * parseFloat("".concat(t.from)), this.from = e + this._startOffset;
                        if (Object(a.isDate)(t.to)) {
                            const s = t.to;
                            this._endOffset = s.getTime() - e,
                            this.to = s.getTime()
                        } else
                            this._endOffset = 1e3 * parseFloat("".concat(t.to)), this.to = e + this._endOffset;
                        this._enabled = t.enabled,
                        this.duration = t.duration || 2,
                        this.endDelay = t.endDelay || 1,
                        this.totalIntervals = t.intervals || 10,
                        this._time = this.from,
                        this._times = [],
                        this._startup()
                    }
                    opt(t, e) {
                        return e ? (Object(a.set)(this.opts, t, e), "intervals" === t && (this.reset(), this.totalIntervals = e, this._updateTimes()), this) : Object(a.get)(this.opts, t)
                    }
                    toggle() {
                        this.isAnimating() || this.isLoading() ? this.stop() : this.play()
                    }
                    play() {
                        this.isAnimating() || (this._paused || this.goToTime(this.from), this.canAnimate() && (this._paused = !1, this._active = !0, this._updateTiming(), this.trigger("play", {
                                    from: this.startDate(),
                                    to: this.endDate()
                                }), this._start()))
                    }
                    stop() {
                        this._clearTimers(),
                        (this.isAnimating() || this.isLoading()) && (this._paused = !1, this._active = !1, this.trigger("stop"), this.goToInit())
                    }
                    pause() {
                        this._clearTimers(),
                        this._paused = !0,
                        this.trigger("pause")
                    }
                    resume() {
                        this.isAnimating() && this._paused && this._start(),
                        this._paused = !1,
                        this.trigger("resume")
                    }
                    restart() {
                        this._clearTimers(),
                        this._restartTimer = setTimeout((() => {
                                    this.goToTime(this.from),
                                    this._start()
                                }), 1e3 * this.endDelay)
                    }
                    reset() {
                        let t = arguments.length > 0 && void 0 !== arguments[0] && arguments[0];
                        this.isAnimating() ? this.stop() : t && this.goToInit(),
                        this.trigger("reset")
                    }
                    goToInit() {
                        const t = this._now.getTime();
                        let e = t;
                        e > this.to ? e = this.to : e < this.from && (e = this.from),
                        this.from >= t ? e = this.from : this.to <= t && (e = this.to),
                        e > 0 && this.goToTime(e)
                    }
                    goToTime(t) {
                        let e;
                        e = Object(a.isDate)(t) ? t.getTime() : t,
                        this._offset = e - this.from;
                        const s = this._intervalClosestToTime(e);
                        return this._currentInterval = s,
                        this._time = e,
                        this._updateForTime(s),
                        this.trigger("advance", {
                            time: this._time,
                            offset: this._offset,
                            position: this.position
                        }),
                        this
                    }
                    neededIntervals() {
                        return this._times.slice(0)
                    }
                    currentInterval() {
                        return this._currentInterval
                    }
                    currentDate() {
                        return new Date(this.currentTime)
                    }
                    startDate() {
                        return new Date(this.from)
                    }
                    setStartDate(t) {
                        const e = Object(a.isDate)(t) ? t.getTime() : t;
                        return e > this.to ? (console.error("[Aeris] Animation start date cannot be set to a date after the current\n\t\t\t\tend date value. You may need to change the end date first."), this) : (this.from = e, this)
                    }
                    startOffset() {
                        return this._startOffset
                    }
                    setStartOffset(t) {
                        const e = this._now.getTime() + t;
                        return e > this.to ? (console.error("[Aeris] Animation start offset cannot be set to a time offset after the\n\t\t\t\tcurrent end date value. You may need to change the end date or time offset first."), this) : (this.from = e, this)
                    }
                    endDate() {
                        return new Date(this.to)
                    }
                    setEndDate(t) {
                        const e = Object(a.isDate)(t) ? t.getTime() : t;
                        if (e < this.from)
                            return console.error("[Aeris] Animation end date cannot be set to a date before the current\n\t\t\t\tstart date value. You may need to change the start date first."), this;
                        this.to = e;
                        const s = this._now.getTime();
                        return this.to > s ? this.goToTime(s) : this.currentTime > this.to && this.goToTime(this.to),
                        this
                    }
                    endOffset() {
                        return this._endOffset
                    }
                    setEndOffset(t) {
                        const e = this._now.getTime() + t;
                        return e < this.from ? (console.error("[Aeris] Animation end offset cannot be set to a time offset before the\n\t\t\t\tcurrent start date value. You may need to change the start date or time offset first."), this) : (this.to = e, this)
                    }
                    setTimes(t) {
                        let e = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : 1;
                        this.reset(),
                        Object(a.isset)(t) ? (this._manualTimes = !0, this._times = t.map((t => (Object(a.isset)(t.time) && (t = t.time), t instanceof Date ? t.getTime() : Object(a.isNumber)(t) ? t : Number.NaN))).filter(((t, s) => Object(a.isNumeric)(t) && s % e == 0))) : (this._manualTimes = !1, this._updateTimes())
                    }
                    refresh() {
                        this._now = new Date,
                        this.from = this._now.getTime() + this._startOffset,
                        this.to = this._now.getTime() + this._endOffset
                    }
                    canAnimate() {
                        return this.to !== this.from && this.isEnabled()
                    }
                    canShow(t) {
                        if (!0 === this.alwaysShow())
                            return !0;
                        t || (t = this._time);
                        const e = this._now.getTime(),
                        s = t - e;
                        return this.isFuture() ? !1 === this.containsPast() || this.startsAtNow() ? t >= e : t > e : this.startsAtNow() && this.containsFuture() ? s < 0 : t <= e
                    }
                    alwaysShow() {
                        return this.opts.alwaysShow
                    }
                    enabled(t) {
                        this._enabled = t
                    }
                    isEnabled() {
                        return this._enabled
                    }
                    isAutoPlay() {
                        return this.opts.autoplay
                    }
                    isReady() {
                        return !0
                    }
                    isLoading() {
                        return !1
                    }
                    isAnimating() {
                        return this._active
                    }
                    isPaused() {
                        return this._paused
                    }
                    isFuture() {
                        return !0 === this.opts.future
                    }
                    containsPast() {
                        return this.startDate().getTime() < this._now.getTime()
                    }
                    containsFuture() {
                        return this.endDate().getTime() > this._now.getTime()
                    }
                    startsAtNow() {
                        return Math.abs(this.startDate().getTime() - this.now.getTime()) <= 3e4
                    }
                    endsAtNow() {
                        return Math.abs(this.endDate().getTime() - this.now.getTime()) <= 3e4
                    }
                    needsData() {
                        return !1
                    }
                    _startup() {
                        this._updateTimes(),
                        this.opts.autoplay || this.goToInit()
                    }
                    _start() {
                        this.timeline || (this._active = !0, this.manualAdvance || (this._timer = setInterval((() => {
                                            const t = this._time + this._increment;
                                            t > this.to ? this.restart() : this.goToTime(t)
                                        }), 1e3 * this._delay)))
                    }
                    _clearTimers() {
                        this._timer && window.clearInterval(this._timer),
                        this._restartTimer && window.clearTimeout(this._restartTimer),
                        this._timer = void 0,
                        this._restartTimer = void 0
                    }
                    _onTimingChange() {
                        this._updateTiming(),
                        this._updateTimes(),
                        this._handleTimingChange(),
                        this.currentTime < this.from ? this.goToTime(this.from) : this.currentTime > this.to && this.goToTime(this.to)
                    }
                    _updateTiming() {
                        this.to < this.from || (this._increment = (this.to - this.from) / this.duration * this._delay)
                    }
                    _updateTimes() {
                        this._manualTimes || (this._times = this._timesForIntervals())
                    }
                    _handleTimingChange() {}
                    _updateForTime(t) {}
                    _intervalClosestToTime(t) {
                        let e = this.from,
                        s = Math.abs(t - e);
                        return void 0 === this._times && this._updateTimes(),
                        this._times.forEach((i => {
                                const a = Math.abs(t - i);
                                a < s && (s = a, e = i)
                            })),
                        Math.round(e)
                    }
                    _timesForIntervals() {
                        if (this.from === this.to)
                            return [];
                        const t = [],
                        e = e => {
                            this.canShow(e) && -1 === t.indexOf(e) && t.push(e)
                        },
                        s = this.opts.intervals,
                        i = Math.round((this.to - this.from) / (s - 1)),
                        a = this.isFuture() && this.startDate().getTime() === this.now.getTime() ? 6e4 : 0;
                        let r = null;
                        for (let t = 0; t < s - 1; t += 1) {
                            const s = 0 === t ? a : 0,
                            o = this.from + i * t + s;
                            0 !== t && o === r || (e(Math.round(o)), r = o)
                        }
                        return t.length > 0 && e(this.to),
                        this.totalIntervals = t.length,
                        t
                    }
                }
                e.a = o
            },
            dJbZ: function (t, e, s) {
                "use strict";
                var i = s("5ID0"),
                a = s("0lfv");
                e.a = class {
                    get features() {
                        return this._features
                    }
                    constructor(t) {
                        (t = t || {}).features = t.features || t,
                        Object(a.isEmpty)(t.features) || (this._features = t.features.map((t => new i.a(t))))
                    }
                }
            },
            dqFL: function (t, e, s) {
                "use strict";
                var i = s("dB9R"),
                a = s("hWIy"),
                r = s("ry37"),
                o = s("0lfv");
                class n extends i.a {
                    get animations() {
                        return this._animations || {}
                    }
                    set animations(t) {
                        this.stop(),
                        this._animations = t,
                        this._each((t => {
                                t.timeline = this
                            }))
                    }
                    constructor() {
                        super(arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : null),
                        this._loading = !1,
                        this._animations = {}
                    }
                    get(t) {
                        return this._animations[t]
                    }
                    opt(t, e) {
                        if (e) {
                            const s = ["intervals"];
                            return Object(o.set)(this.opts, t, e),
                            -1 !== s.indexOf(t) && this._each((s => {
                                    s.opt(t, e)
                                })),
                            this
                        }
                        return Object(o.get)(this.opts, t)
                    }
                    add(t, e) {
                        this.stop(),
                        e.timeline = this,
                        e.manualAdvance = this.manualAdvance,
                        this._animations[t] = e
                    }
                    remove(t) {
                        Object.keys(this._animations).forEach((e => {
                                this._animations[e] === t && this.removeBy(e)
                            }))
                    }
                    removeBy(t) {
                        const e = this._animations[t];
                        e && (this.stop(), e.timeline = void 0),
                        delete this._animations[t]
                    }
                    play() {
                        let t = !0;
                        const e = [],
                        s = [];
                        this.canAnimate() && (this._each((i => {
                                    const o = this.opt("showLoading"),
                                    n = !1 === this.containsPast();
                                    if (i instanceof a.a) {
                                        const t = i;
                                        t.showWhenLoading = o,
                                        i.isFuture() && (t.showWhenLoading = n || t.alwaysShow())
                                    } else if (i instanceof r.a) {
                                        const t = i;
                                        t.showWhenLoading = o,
                                        i.isFuture() && (t.showWhenLoading = n || t.alwaysShow())
                                    }
                                    i.isEnabled() && (i.isReady() ? (i.isLoading() || i.needsData()) && (s.push(i), i.once("load:done", (() => {
                                                    s.splice(s.indexOf(i), 1),
                                                    0 === s.length && (this._loading = !1, this.trigger("load:done"))
                                                }))) : (t = !1, e.push(i), s.push(i), i.once("ready", (() => {
                                                    e.splice(e.indexOf(i), 1),
                                                    s.splice(s.indexOf(i), 1),
                                                    0 === e.length && setTimeout((() => {
                                                            this.trigger("ready"),
                                                            this.play()
                                                        }), 100)
                                                }))), i.play())
                                })), !1 === this._loading && s.length > 0 ? (this._loading = !0, this.trigger("load:start")) : this._loading && 0 === s.length && (this._loading = !1, this.trigger("load:done")), t && (this._each((t => {
                                        t.play()
                                    })), super.play()))
                    }
                    stop() {
                        this._each((t => {
                                t.stop()
                            })),
                        super.stop(),
                        this._loading && this.trigger("load:done"),
                        this._loading = !1
                    }
                    pause() {
                        this._each((t => {
                                t.pause()
                            })),
                        super.pause()
                    }
                    restart() {
                        this._each((t => {
                                t.restart()
                            })),
                        super.restart()
                    }
                    reset() {
                        let t = arguments.length > 0 && void 0 !== arguments[0] && arguments[0];
                        this.stop(),
                        this._loading = !1,
                        this._each((e => {
                                e.reset(t)
                            })),
                        super.reset(t)
                    }
                    isLoading() {
                        return this._loading
                    }
                    goToTime(t) {
                        return this._each((e => {
                                e.goToTime(t)
                            })),
                        super.goToTime(t)
                    }
                    setStartDate(t) {
                        return this._each((e => {
                                e.setStartDate(t)
                            })),
                        super.setStartDate(t)
                    }
                    setStartOffset(t) {
                        return this._each((e => {
                                e.setStartOffset(t)
                            })),
                        super.setStartOffset(t)
                    }
                    setEndDate(t) {
                        return this._each((e => {
                                e.setEndDate(t)
                            })),
                        super.setEndDate(t)
                    }
                    setEndOffset(t) {
                        return this._each((e => {
                                e.setEndOffset(t)
                            })),
                        super.setEndOffset(t)
                    }
                    refresh() {
                        super.refresh(),
                        this._each((t => {
                                t.now = this.now
                            }))
                    }
                    _each(t) {
                        Object.keys(this.animations).forEach((e => {
                                const s = this._animations[e];
                                t(s)
                            }))
                    }
                    _onTimingChange() {
                        super._onTimingChange(),
                        this._each((t => {
                                t.from = this.from,
                                t.to = this.to
                            }))
                    }
                }
                e.a = n
            },
            fnc3: function (t, e, s) {
                "use strict";
                s("UxlC");
                var i = s("0lfv"),
                a = s("3j3Q"),
                r = s("J8dV");
                e.a = class {
                    get $el() {
                        return this._target
                    }
                    get $path() {
                        return Object(a.a)(".".concat(r.a.cssPrefix, "fill-path"), this.$el)
                    }
                    constructor() {
                        let t = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : null;
                        this._opts = Object(i.extend)({
                            strokeWidth: 4
                        }, t),
                        this.render()
                    }
                    appendTo(t) {
                        let e = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : null;
                        const s = Object(a.a)(t);
                        s.length > 0 && (s.append(this.$el), this._target = Object(a.a)(".".concat(r.a.cssPrefix, "loader"), s), e && this._target.css(e))
                    }
                    startAnimating() {
                        this.$el.addClass("animated")
                    }
                    stopAnimating() {
                        this.$el.removeClass("animated")
                    }
                    render() {
                        let t = !1,
                        e = Object(i.get)(this._opts, "size") || "100%";
                        Object(i.isString)(e) && (!1 === /%$/.test(e) ? (e = e.replace(/[0-9\.]/, ""), e = parseFloat(e)) : t = !0);
                        const s = Object(i.isString)(e) ? 60 : e,
                        o = Math.round(s / 2),
                        n = Math.round(s / 60 * 18),
                        h = Math.round(s / 2),
                        l = Object(i.get)(this._opts, "strokeWidth") || 4,
                        c = t ? e : "".concat(e, "px");
                        this._target = Object(a.a)('\n\t\t\t<div class="'.concat(r.a.cssPrefix, 'loader" style="width: ').concat(c, "; height: ").concat(c, ';">\n\t\t\t\t<svg version="1.1" class="').concat(r.a.cssPrefix, 'filler-loader" width="').concat(s, '" height="').concat(s, '" style="margin-top: -').concat(h, "px; margin-left: -").concat(h, 'px;">\n\t\t\t\t\t<circle class="').concat(r.a.cssPrefix, 'fill-path" cx="').concat(o, '" cy="').concat(o, '" r="').concat(n, '" stroke-width="').concat(l, '" />\n\t\t\t\t</svg>\n\t\t\t</div>\n\t\t'))
                    }
                }
            },
            gqGf: function (t, e, s) {
                "use strict";
                s.d(e, "b", (function () {
                        return x
                    })),
                s.d(e, "d", (function () {
                        return O
                    })),
                s.d(e, "a", (function () {
                        return L
                    })),
                s.d(e, "c", (function () {
                        return M.a
                    }));
                s("UxlC"),
                s("3bBZ");
                var i = s("m0x2"),
                a = s("l1hk"),
                r = s("8TS8"),
                o = s("5ID0"),
                n = s("7r+a"),
                h = s("0lfv");
                const l = (t, e, s, i, a) => {
                    const o = a.marker(t, {
                        lat: s.lat,
                        lon: s.lon
                    }, i);
                    if (!o)
                        return null;
                    const h = Object.assign(Object.assign({}, e), {
                        awxjs_source: t
                    }),
                    l = new r.a(h, i, o);
                    return l.geometry = new n.e([s.lon, s.lat]),
                    l
                },
                c = (t, e, s, i, a) => {
                    const o = Object(h.isFunction)(i) ? i(e) : i,
                    n = a.polyline(e.id, s, o),
                    l = Object.assign(Object.assign({}, e), {
                        awxjs_source: t
                    });
                    return new r.c(l, o, n)
                },
                d = (t, e, s, i, a) => {
                    const o = t => t.map(((t, s) => ({
                                    id: "".concat(e.id, "-").concat(s),
                                    outer: t.outer.coordinates,
                                    inner: t.inner.map((t => t.coordinates))
                                })));
                    let l = [];
                    s instanceof n.d ? l = o(s.polygons) : s instanceof n.f && (l = o([s]));
                    const c = Object(h.isFunction)(i) ? i(e) : i,
                    d = a.polygon(t, l, c),
                    u = Object.assign(Object.assign({}, e), {
                        awxjs_source: t
                    }),
                    p = new r.b(u, c, d);
                    return p.geometry = s,
                    p
                };
                var u = s("DA0x"),
                p = s("qV3b"),
                m = s("pAjv");
                var g = s("dB9R");
                class y extends g.a {
                    constructor() {
                        let t = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : null;
                        t = Object(h.extend)({}, {
                            refresh: 0
                        }, t),
                        super(t),
                        this.itemsByTime = {},
                        this.lastInterval = 0,
                        this.dataBeyondBounds = {
                            before: [],
                            after: []
                        },
                        this.on("stop", (() => {
                                this.trigger("data:add", {
                                    items: this.dataBeyondBounds.after.filter((t => void 0 !== t))
                                })
                            }))
                    }
                    dataByTime() {
                        return this.itemsByTime
                    }
                    setData(t) {
                        this.data = t,
                        this._prepareDataItems(t)
                    }
                    play() {
                        this.canAnimate() || !this.provider ? super.play() : this.provider.animationData(this).then((t => {
                                this.setData(t),
                                this.lastInterval = this.to
                            }))
                    }
                    _updateForTime(t) {
                        if (!this.dataByTime())
                            return;
                        this.lastInterval || (this.lastInterval = this.from);
                        const e = this.currentTime;
                        if (e === this.lastInterval)
                            return;
                        const s = Math.min(this.lastInterval, e),
                        i = Math.max(this.lastInterval, e);
                        let a,
                        r = e < this.lastInterval;
                        if (e === this.from ? (r = !0, a = this._elementsInIntervalRange(this.from, this.to)) : a = this._elementsInIntervalRange(s, r ? this.to : i), a.length > 0)
                            if (r) {
                                [].concat(this.itemsByTime[this.from]).forEach((t => {
                                        const e = a.indexOf(t);
                                        -1 !== e && a.splice(e, 1)
                                    })),
                                a = a.concat(this.dataBeyondBounds.after),
                                this.trigger("data:remove", {
                                    items: a.filter((t => void 0 !== t))
                                })
                            } else
                                this.trigger("data:add", {
                                    items: a.filter((t => void 0 !== t))
                                });
                        this.lastInterval = e
                    }
                    restart() {
                        this.lastInterval = this.to,
                        super.restart()
                    }
                    reset() {
                        this.data = null,
                        this.itemsByTime = {},
                        super.reset()
                    }
                    isVisible() {
                        return !0
                    }
                    isReady() {
                        return Object(h.isset)(this.data)
                    }
                    needsData() {
                        return !1 === Object(h.isset)(this.data)
                    }
                    canAnimate() {
                        return super.canAnimate() && this.dataByTime() && Object.keys(this.dataByTime()).length > 0
                    }
                    _handleTimingChange() {
                        this.data && this._prepareDataItems(this.data)
                    }
                    _prepareDataItems(t) {
                        if (this.increment <= 0 || !Object(h.isArray)(t))
                            return;
                        const e = this._prepareIntervals(),
                        s = t,
                        i = "timestamp";
                        this.dataBeyondBounds = {
                            before: [],
                            after: []
                        },
                        (s || []).forEach((t => {
                                if (Object(h.has)(t, i)) {
                                    const s = Object(h.get)(t, i);
                                    if (s < this.from)
                                        this.dataBeyondBounds.before.push(t);
                                    else if (s > this.to)
                                        this.dataBeyondBounds.after.push(t);
                                    else {
                                        const i = this.dataIntervalClosestToTime(s);
                                        s < this.to && e[i] && e[i].push(t)
                                    }
                                }
                            })),
                        this.trigger("load:done"),
                        this.trigger("ready")
                    }
                    _prepareIntervals() {
                        let t = this.from;
                        const e = this.to,
                        s = {};
                        for (; t < e; )
                            s[Math.round(t)] = [], t += this.increment;
                        return this.itemsByTime = s,
                        this.dataByTime()
                    }
                    dataIntervalClosestToTime(t) {
                        const e = Object.keys(this.dataByTime()).sort().reverse().map((t => parseInt(t, 10)));
                        let s = 0;
                        return t < this.from || t > this.to ? s = t : e.forEach((e => {
                                    t >= e && 0 === s && (s = e)
                                })),
                        s
                    }
                    _elementsInIntervalRange(t, e) {
                        if (t === e)
                            return [];
                        let s = [];
                        const i = Object.keys(this.dataByTime()).sort().map((t => parseInt(t, 10))),
                        a = [];
                        return i.forEach((i => {
                                let r = !1;
                                e < t ? i >= e && i < t && (r = !0) : (i === t && i === e || i >= t && i < e || i === e) && (r = !0),
                                r && -1 === a.indexOf(i) && (a.push(i), s = (s || []).concat(this.dataByTime()[i]))
                            })),
                        s
                    }
                }
                var f = y;
                var b = class {
                    constructor(t, e) {
                        this._animatableData = [],
                        this._nonAnimatableData = [],
                        this.source = t;
                        const s = e => ({
                            markers: e.filter((e => e.renderable ? t.strategy.isMarker(e.renderable) : t.strategy.isMarker(e))),
                            shapes: e.filter((e => e.renderable ? t.strategy.isPolygon(e.renderable) || t.strategy.isPolyline(e.renderable) : t.strategy.isPolygon(e) || t.strategy.isPolyline(e)))
                        }),
                        i = new f;
                        i.provider = this,
                        i.on("play", (() => {
                                const {
                                    markers: e,
                                    shapes: a
                                } = s(this._nonAnimatableData);
                                e.length > 0 && t.trigger("markers:remove", {
                                    markers: e,
                                    animation: i
                                }),
                                a.length > 0 && t.trigger("shapes:remove", {
                                    shapes: a,
                                    animation: i
                                })
                            })),
                        i.on("stop", (() => {
                                const {
                                    markers: e,
                                    shapes: a
                                } = s(this._nonAnimatableData);
                                e.length > 0 && t.trigger("markers:add", {
                                    markers: e,
                                    animation: i
                                }),
                                a.length > 0 && t.trigger("shapes:add", {
                                    shapes: a,
                                    animation: i
                                })
                            })),
                        i.on("reset", (() => {
                                t.enabled && (t.markers && t.trigger("markers:add", {
                                        markers: t.markers,
                                        animation: i
                                    }), t.shapes && t.trigger("shapes:add", {
                                        shapes: t.shapes,
                                        animation: i
                                    })),
                                this._animatableData = [],
                                this._nonAnimatableData = []
                            })),
                        i.on("data:add", (e => {
                                const {
                                    markers: a,
                                    shapes: r
                                } = s(e.data.items);
                                a.length > 0 && t.trigger("markers:add", {
                                    markers: a,
                                    animation: i
                                }),
                                r.length > 0 && t.trigger("shapes:add", {
                                    shapes: r,
                                    animation: i
                                })
                            })),
                        i.on("data:remove", (e => {
                                const {
                                    markers: a,
                                    shapes: r
                                } = s(e.data.items);
                                a.length > 0 && t.trigger("markers:remove", {
                                    markers: a,
                                    animation: i
                                }),
                                r.length > 0 && t.trigger("shapes:remove", {
                                    shapes: r,
                                    animation: i
                                })
                            })),
                        this.animation = i
                    }
                    animationData(t) {
                        const e = this.source,
                        s = () => {
                            const t = Object.keys(e.markersById).map((t => e.markersById[t])),
                            s = e.shapes;
                            let i = [];
                            if (t) {
                                const s = t.map((t => {
                                            var s,
                                            i;
                                            const {
                                                data: a,
                                                renderable: r,
                                                style: o
                                            } = t;
                                            if (!a || !r)
                                                return null;
                                            let n;
                                            const l = (null === (i = null === (s = e.opts.data) || void 0 === s ? void 0 : s.properties) || void 0 === i ? void 0 : i.timestamp) || "timestamp";
                                            return Object(h.has)(a, l) ? n = 1e3 * Object(h.get)(a, l) : this._nonAnimatableData.push(r), {
                                                timestamp: n,
                                                renderable: r,
                                                style: o,
                                                data: a
                                            }
                                        })).filter((t => t && !1 === Number.isNaN(t.timestamp)));
                                s && (i = i.concat(s))
                            }
                            if (s) {
                                const t = t => t.map((t => {
                                            var s,
                                            i;
                                            const {
                                                data: a,
                                                renderable: r,
                                                style: o
                                            } = t;
                                            if (!a)
                                                return null;
                                            const n = (null === (i = null === (s = e.opts.data) || void 0 === s ? void 0 : s.properties) || void 0 === i ? void 0 : i.timestamp) || "timestamp";
                                            let l,
                                            c;
                                            return "object" == typeof n && n.from ? c = n.from : "string" == typeof n && (c = n),
                                            Object(h.has)(a, c) ? l = 1e3 * Object(h.get)(a, c) : this._nonAnimatableData.push(r), {
                                                timestamp: l,
                                                renderable: r,
                                                style: o,
                                                data: a
                                            }
                                        })).filter((t => t && !1 === Number.isNaN(t.timestamp)));
                                s.forEach((e => {
                                        const s = e.polygons;
                                        if (Object(h.isset)(s)) {
                                            const e = t(s);
                                            e && (i = i.concat(e))
                                        } else {
                                            const s = t([e]);
                                            s && (i = i.concat(s))
                                        }
                                    }))
                            }
                            return this._animatableData = i,
                            i
                        };
                        return new Promise(((t, i) => {
                                if (e.isLoading)
                                    e.once("data:load", (() => {
                                            const e = s();
                                            t(e)
                                        }));
                                else if (this._animatableData && this._animatableData.length > 0)
                                    t(this._animatableData);
                                else if (e.markers) {
                                    const e = s();
                                    t(e)
                                } else
                                    t(null)
                            }))
                    }
                };
                const v = {
                    marker: {
                        svg: {
                            shape: {
                                type: "circle",
                                fill: {
                                    color: "#000"
                                }
                            }
                        },
                        size: [6, 6]
                    },
                    polygon: {
                        fill: {
                            color: "#000",
                            opacity: 1
                        },
                        stroke: {
                            color: "#000",
                            width: 2
                        }
                    },
                    polyline: {
                        stroke: {
                            color: "#000",
                            width: 2
                        }
                    }
                };
                class _ extends i.a {
                    get markers() {
                        var t;
                        return null === (t = this._result) || void 0 === t ? void 0 : t.markers
                    }
                    get markersById() {
                        return this._markers
                    }
                    get polygons() {
                        var t;
                        return null === (t = this._result) || void 0 === t ? void 0 : t.polygons
                    }
                    get polylines() {
                        var t;
                        return null === (t = this._result) || void 0 === t ? void 0 : t.polylines
                    }
                    get shapes() {
                        var t,
                        e;
                        let s = [];
                        return (null === (t = this.polygons) || void 0 === t ? void 0 : t.length) && (this.polygons[0].elements ? this.polygons.forEach((t => {
                                    s = s.concat(t.elements)
                                })) : s = s.concat(this.polygons)),
                        (null === (e = this.polylines) || void 0 === e ? void 0 : e.length) && (this.polylines[0].elements ? this.polylines.forEach((t => {
                                    s = s.concat(t.elements)
                                })) : s = s.concat(this.polylines)),
                        s
                    }
                    get strategy() {
                        return this._strategy
                    }
                    set strategy(t) {
                        t && (this._strategy = t, t.on("move:end", (e => {
                                    this._visibleBounds = a.a.fromBounds(t.getBounds())
                                })))
                    }
                    get service() {
                        return this._service
                    }
                    get animation() {
                        var t;
                        return null === (t = this._animator) || void 0 === t ? void 0 : t.animation
                    }
                    get enabled() {
                        return this._enabled
                    }
                    set enabled(t) {
                        this._enabled = t,
                        !1 === t ? this._stopAutoUpdate() : this._startAutoUpdateIfNeeded()
                    }
                    get isLoading() {
                        return this._loading
                    }
                    get animationEnabled() {
                        return Object(h.isset)(this.animation) && this.animation.isEnabled()
                    }
                    constructor(t, e) {
                        var s;
                        if (super(), this.requiresBounds = !1, this._animateOnLoad = !1, this.key = t, this.enabled = !0, this.opts = Object(h.extend)({
                                data: null,
                                style: e.style || Object.assign({}, v),
                                requiresBounds: !1,
                                restrictToTimeline: !0,
                                animation: {
                                    key: t,
                                    enabled: !1
                                },
                                refresh: 0
                            }, e), this._opacityByType = {
                                marker: 1,
                                polyline: 1,
                                polygon: 1
                            }, this.style = this.opts.style, this.style) {
                            const t = null === (s = this.style) || void 0 === s ? void 0 : s.opacity;
                            Object(h.isset)(t) && (this._opacity = t),
                            ["polyline", "polygon"].forEach((t => {
                                    var e,
                                    s;
                                    const i = function (t) {
                                        let e = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : {};
                                        return (Object(h.isFunction)(t) ? t(e) : t) || {}
                                    }
                                    (this.style[t]),
                                    a = (null === (e = i.fill) || void 0 === e ? void 0 : e.opacity) || (null === (s = i.stroke) || void 0 === s ? void 0 : s.opacity);
                                    Object(h.isset)(a) && (this._opacityByType[t] = a)
                                }))
                        }
                        const i = this.opts.animation;
                        i.enabled && (this._animator = new b(this, i));
                        let a = Object(h.get)(this.opts, "data.service");
                        Object(h.isFunction)(a) && (a = a()),
                        this._service = a,
                        this.requiresBounds = Object(h.get)(this.opts, "requiresBounds")
                    }
                    hasData() {
                        return !Object(h.isEmpty)(this.markers) || !Object(h.isEmpty)(this.polygons) || !Object(h.isEmpty)(this.polylines)
                    }
                    setData(t) {
                        this._data = Object(h.isPlainObject)(t) ? Object(h.cloneDeep)(t) : t,
                        this.render()
                    }
                    setOpacity() {
                        let t = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : 1;
                        this._opacity = t,
                        this.shapes.filter((t => t.adjustOpacity)).forEach((e => {
                                e instanceof r.c ? e.renderable.setOpacity(this._opacityByType.polyline * t) : e instanceof r.b && e.renderable.setOpacity(this._opacityByType.polygon * t)
                            }))
                    }
                    load(t) {
                        let e = arguments.length > 1 && void 0 !== arguments[1] && arguments[1],
                        s = arguments.length > 2 ? arguments[2] : void 0;
                        var i;
                        const r = null === (i = this.opts) || void 0 === i ? void 0 : i.data;
                        if (!r)
                            return new Promise(((t, e) => {
                                    e(new Error("Invalid configuration for VectorSource"))
                                }));
                        t = Object(h.extend)({}, Object(h.get)(this.opts, "data.request.parameters"), this._lastLoadParams, t),
                        Object(h.isset)(t.save) && !1 === t.save || (this._lastLoadParams = t),
                        this._animateOnLoad = e;
                        const {
                            service: o,
                            url: n,
                            items: l
                        } = r, {
                            bounds: c,
                            from: d,
                            to: g
                        } = t;
                        if (this.requiresBounds && !Object(h.isset)(c))
                            throw new Error("[Aeris] Vector source ".concat(this.key, " requires coordinate bounds when loading but bounds were not provided."));
                        if (c && (this._visibleBounds = a.a.fromBounds(c)), l)
                            return new Promise(((t, e) => {
                                    this._onLoad(l, ((s, i) => {
                                            s ? t(s) : e(i)
                                        }))
                                }));
                        const y = (t => {
                            let e, {
                                service: s,
                                url: i,
                                dataKeypath: a,
                                restrictToTimeline: r = !0,
                                onLoad: o = (() => {}),
                                onError: n = (() => {})
                            } = t;
                            return s ? e = (t, e, i, l, c) => {
                                const d = Object(h.isFunction)(s) ? s() : s;
                                if (!Object(h.isset)(d) || d instanceof u.a == 0)
                                    return void console.error("[Aeris] Invalid ApiRequest returned for data source");
                                const p = (null == l ? void 0 : l.limit) || d.param("limit") || 300,
                                g = (null == l ? void 0 : l.sort) || d.param("sort") || "dt:-1";
                                if (l && d.setParams(l), d.getAction() || d.action("within"), "within" === d.getAction()) {
                                    if (!t)
                                        return;
                                    d.place(Object(m.toBounds)(t))
                                }
                                r && d.from(e).to(i).limit(p).sort(g),
                                d.get().then((t => {
                                        o(Object(h.get)(t.data, a) || t.data, c)
                                    })).catch((t => n(t, c)))
                            }
                             : i && (e = (t, e, s, r, l) => {
                                const c = Object(h.isFunction)(i) ? i(r) : i;
                                p.b.request(c).then((t => {
                                        o(Object(h.get)(t.data, a) || t.data, l)
                                    })).catch((t => n(t, l)))
                            }),
                            e
                        })({
                            service: o,
                            url: n,
                            dataKeypath: Object(h.get)(this.opts, "data.properties.root"),
                            restrictToTimeline: this.opts.restrictToTimeline,
                            onLoad: (t, e) => {
                                this._onLoad(t, e, s)
                            },
                            onError: (t, e) => {
                                this._onError(t, e)
                            }
                        });
                        if (o && (this._service = Object(h.isFunction)(o) ? o() : o), !Object(h.isset)(y))
                            throw new Error("[Aeris] Cannot load data for VectorSource with key {".concat(this.key, '} due to an invalid configuration. Check that you have provided a valid "data.service" or "data.url" in your configuration. Refer to the docs for more info: https://www.aerisweather.com/support/docs/toolkits/aeris-js-sdk/map-modules/data-sources/'));
                        return this._request || (this._request = Object(h.debounce)(((t, e, s, i, a) => {
                                        this._loading = !0,
                                        y(t, e, s, i, a)
                                    }), 1500)),
                        new Promise(((e, s) => {
                                if (this._request) {
                                    const i = Object(h.get)(this.opts, "data.request.parameters.from") || d,
                                    a = Object(h.get)(this.opts, "data.request.parameters.to") || g;
                                    this._loading = !0,
                                    this.trigger("data:load:start", {
                                        layer: this.key
                                    }),
                                    this._request(c, i, a, t, ((t, i) => {
                                            this.trigger("data:load:done", {
                                                layer: this.key
                                            }),
                                            i ? s(i) : e(t),
                                            this._startAutoUpdateIfNeeded()
                                        }))
                                } else
                                    s(new Error("Invalid configuration for VectorSource"))
                            }))
                    }
                    reload(t, e) {
                        this.load(t, !1, e)
                    }
                    render() {
                        if (!Object(h.isset)(this._data))
                            return;
                        let t = this.markers,
                        e = this.shapes;
                        Object(h.isEmpty)(t) || this.trigger("markers:remove", {
                            markers: t
                        }),
                        Object(h.isEmpty)(e) || this.trigger("shapes:remove", {
                            shapes: e
                        }),
                        this._result = this._process(this._data),
                        this.setOpacity(this._opacity),
                        t = this.markers,
                        e = this.shapes,
                        Object(h.isEmpty)(t) || this.trigger("markers:add", {
                            markers: t
                        }),
                        Object(h.isEmpty)(e) || this.trigger("shapes:add", {
                            shapes: e
                        })
                    }
                    reset() {
                        const t = this.markers,
                        e = this.shapes;
                        Object(h.isEmpty)(t) || this.trigger("markers:remove", {
                            markers: t
                        }),
                        Object(h.isEmpty)(e) || this.trigger("shapes:remove", {
                            shapes: e
                        }),
                        this.animation && this.animation.reset(),
                        this._loading = !1,
                        this._result = {},
                        this.trigger("data:load:done", {
                            layer: this.key
                        }),
                        this.trigger("reset")
                    }
                    update(t) {
                        t && (this.opts.data = Object(h.extend)(this.opts.data, t), this._request = null),
                        this.reload()
                    }
                    _onLoad(t, e, s) {
                        !1 !== this.enabled && (t && (s && (Object(h.isArray)(t) ? t = [...s, ...t] : Object(h.isPlainObject)(t) && (t = Object.assign(Object.assign({}, s), t))), this.setData(t)), this._loading = !1, this.trigger("data:load", {
                                layer: this.key,
                                results: t
                            }), Object(h.isFunction)(e) && e(this._result, null), this._animateOnLoad && this.animation && (this.animation.reset(), this.animation.play()), this._animateOnLoad = !1)
                    }
                    _onError(t, e) {
                        console.error("[Aeris] Vector source request failed", t),
                        t.stack && t.stack,
                        this._loading = !1,
                        this.trigger("data:error", {
                            error: t
                        }),
                        e && e(null, t)
                    }
                    _visibleMapObjects() {
                        let t = this.markers,
                        e = this.shapes;
                        return t = t.filter((t => {
                                    const e = t.coord;
                                    return !e || this._visibleBounds.contains(e)
                                })),
                        e = e.filter((t => {
                                    const e = t.bounds;
                                    return !e || this._visibleBounds.contains(e)
                                })), {
                            markers: t,
                            shapes: e
                        }
                    }
                    _mapObjects() {
                        let t = [];
                        if (this.polygons && (t = t.concat(this.polygons)), this.polylines && (t = t.concat(this.polylines)), 0 === t.length)
                            return null;
                        const e = Object.keys(t).reduce(((e, s) => e.concat(t.map((t => t.polygons ? t.polygons.map((t => t.polygon)) : t.polylines ? t.polylines.map((t => t.polyline)) : t.polygon ? t.polygon : t.polyline ? t.polyline : t)))), []);
                        return Object(h.flatten)(e)
                    }
                    _process(t, e) {
                        if (!this.strategy)
                            throw new Error("No map strategy defined for VectorSource but one is required.");
                        t = t || {};
                        const s = Object(h.get)(this.opts, "data.formatter");
                        s && (t = s(t));
                        const i = {},
                        a = {},
                        r = {};
                        if (Object(h.isPlainObject)(t) && "FeatureCollection" === t.type)
                            return console.warn("[Aeris] Data for layer {".concat(this.key, '} is in GeoJSON format. Use GeoJsonSource (or "geojson" type) for this layer instead.')), null;
                        if (Object(h.isArray)(t)) {
                            const {
                                marker: s,
                                polygon: u,
                                polyline: p
                            } = this.style,
                            m = [],
                            g = Object(h.get)(this.opts, "data.properties") || {},
                            y = Object(h.get)(this.opts, "data.geometry");
                            t.forEach(((t, f) => {
                                    let b,
                                    v,
                                    _,
                                    O = "awxjs-shape-".concat(this.key, "-").concat(f);
                                    if (g && (g.id && (O = Object(h.get)(t, g.id)), g.category && !1 === /^\[path\]/.test(g.category) && (b = Object(h.get)(t, g.category)), g.path && (v = Object(h.get)(t, g.path)), s))
                                        if (g.points) {
                                            const s = g.points;
                                            !e && Object(h.isArray)(s) ? (_ = [], s.forEach((e => {
                                                        const s = Object(h.get)(t, e);
                                                        s && Object(h.isArray)(s) && (_ = _.concat(s))
                                                    }))) : _ = Object(h.get)(t, s)
                                        } else
                                            _ = [t];
                                    if (_ && s) {
                                        const t = Object(h.get)(this.opts, "data.coordinate");
                                        _.forEach((e => {
                                                const a = this._processRecord(e),
                                                r = a.loc || (t && Object(h.isFunction)(t) ? t(a) : {});
                                                if (r) {
                                                    const t = {
                                                        lat: r.lat,
                                                        lon: r.long || r.lon
                                                    },
                                                    e = Object(h.isFunction)(s) ? s(a) : s;
                                                    a.id = a.id || "".concat(this.key, "-").concat(O, "-").concat(t.lat, "_").concat(t.lon);
                                                    let c = !0;
                                                    if (e && e.spacing > 0) {
                                                        const s = this.strategy.coordToPoint(t);
                                                        m.forEach((t => {
                                                                const i = this.strategy.coordToPoint(t);
                                                                Math.sqrt(Math.pow(s.x - i.x, 2) + Math.pow(s.y - i.y, 2)) < e.spacing && (c = !1)
                                                            }))
                                                    }
                                                    if (c) {
                                                        const s = new o.a({
                                                            type: "Point",
                                                            coordinates: [t.lon, t.lat]
                                                        });
                                                        s.properties = a;
                                                        const r = s.geometry;
                                                        if (r instanceof n.e && Object(h.isValidCoord)(r.coordinates)) {
                                                            const o = l(this.key, s.properties, r.coordinates, e, this.strategy.factory);
                                                            o && (i[a.id] = o, m.push(t))
                                                        }
                                                    }
                                                }
                                            }))
                                    }
                                    if (v && (u || p)) {
                                        const e = Object(h.get)(this.opts, "data.reversedCoord") || !1;
                                        let s = v;
                                        Object(h.isArray)(s) ? s.length > 0 && Object(h.isArray)(s[0]) && 2 === s[0].length && Object(h.isNumber)(s[0][0]) && (s = [s]) : s = [s],
                                        y && Object(h.isFunction)(y) && (s = s.map((t => ({
                                                            type: "Feature",
                                                            properties: t,
                                                            geometry: y(t)
                                                        }))));
                                        s.map((s => {
                                                if (Object(h.isArray)(s) && 2 === s[0].length) {
                                                    s = {
                                                        type: "Polygon",
                                                        coordinates: [e ? v.map((t => [t[1], t[0]])) : s]
                                                    }
                                                }
                                                const i = new o.a(s);
                                                return i.properties = Object(h.extend)({}, t, i.properties),
                                                i
                                            })).forEach((t => {
                                                let e = t.geometry,
                                                s = g.category,
                                                i = b;
                                                if (!i && s && (s = s.replace(/^\[path\]\./, ""), i = Object(h.get)(t.properties, s)), e instanceof n.f ? e = new n.d([e.toArray(!0)]) : e instanceof n.a && (e = new n.b([e.toArray(!0)])), e instanceof n.d) {
                                                    const r = "".concat(t.properties.id || O),
                                                    o = Object.assign(Object.assign({}, t.properties), {
                                                        id: r
                                                    }),
                                                    n = d(this.key, o, e, u, this.strategy.factory);
                                                    if (i) {
                                                        let t = a[i];
                                                        if (!t) {
                                                            const e = Object(h.set)({}, s, i);
                                                            t = {
                                                                data: Object.assign(Object.assign(Object.assign({}, e), o), {
                                                                    awxjs_source: this.key
                                                                }),
                                                                elements: []
                                                            },
                                                            a[i] = t
                                                        }
                                                        t.elements.push(n)
                                                    } else
                                                        O && (a[O] = n)
                                                } else
                                                    e instanceof n.b && e.lines.forEach(((e, o) => {
                                                            const n = Object.assign(Object.assign({}, t.properties), {
                                                                id: "".concat(t.properties.id || O, "-").concat(o)
                                                            }),
                                                            l = c(this.key, n, e.coordinates, p, this.strategy.factory);
                                                            if (i) {
                                                                let t = a[i];
                                                                if (!t) {
                                                                    const e = Object(h.set)({}, s, i);
                                                                    t = {
                                                                        data: Object.assign(Object.assign({}, e), {
                                                                            awxjs_source: this.key
                                                                        }),
                                                                        elements: []
                                                                    },
                                                                    r[i] = t
                                                                }
                                                                t.elements.push(l)
                                                            } else
                                                                O && (r[O] = l)
                                                        }))
                                            }))
                                    }
                                    if (_ && p) {
                                        const t = ((t, e, s) => {
                                            const i = [];
                                            let a,
                                            r,
                                            o,
                                            n = [];
                                            return t.forEach(((t, l) => {
                                                    const c = t.loc || (s && Object(h.isFunction)(s) ? s(t) : {}),
                                                    d = Object(h.isEmpty)(c) && t.lat && t.lon ? t : {
                                                        lat: c.lat,
                                                        lon: c.long || c.lon
                                                    },
                                                    u = e ? t[e] : "none";
                                                    if (!Object(h.isset)(o) || d.lat !== o.lat || d.lon !== o.lon) {
                                                        n.push(d),
                                                        0 === l ? a = {
                                                            north: d.lat,
                                                            south: d.lat,
                                                            west: d.lon,
                                                            east: d.lon
                                                        }
                                                         : (a.north = Math.max(a.north, d.lat), a.south = Math.min(a.south, d.lat), a.west = Math.min(a.west, d.lon), a.east = Math.max(a.east, d.lon));
                                                        let e = !0;
                                                        i.push({
                                                            coords: n,
                                                            data: t,
                                                            bounds: a
                                                        }),
                                                        e = !0,
                                                        e && (n = [], n.push(d), a = {
                                                                north: d.lat,
                                                                south: d.lat,
                                                                west: d.lon,
                                                                east: d.lon
                                                            })
                                                    }
                                                    r = u,
                                                    o = d
                                                })),
                                            i
                                        })(_, Object(h.get)(this.opts, "data.properties.category"), Object(h.get)(this.opts, "data.coordinate"));
                                        t.forEach((t => {
                                                const e = c(this.key, t.data, t.coords, p, this.strategy.factory);
                                                r[e.id] = e
                                            }))
                                    }
                                }))
                        }
                        return this._markers = i,
                        this._polygons = a,
                        this._polylines = r, {
                            markers: Object.keys(i).map((t => i[t])),
                            polygons: Object.keys(a).map((t => a[t])),
                            polylines: Object.keys(r).map((t => r[t]))
                        }
                    }
                    _processRecord(t) {
                        return t
                    }
                    _startAutoUpdateIfNeeded() {
                        this._stopAutoUpdate();
                        const t = Object(h.get)(this.opts, "refresh");
                        this.enabled && t > 0 && (this._refreshTimer = setTimeout((() => {
                                        this.reload()
                                    }), 1e3 * t))
                    }
                    _stopAutoUpdate() {
                        this._refreshTimer && (clearTimeout(this._refreshTimer), this._refreshTimer = null)
                    }
                }
                var O = _;
                var w = class extends f {
                    constructor() {
                        let t = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : null;
                        t = Object(h.extend)({}, {
                            refresh: 0
                        }, t),
                        super(t)
                    }
                    _updateForTime(t) {
                        if (!this.dataByTime())
                            return;
                        this.lastInterval || (this.lastInterval = this.from);
                        const e = this.currentTime,
                        s = Math.min(this.lastInterval, e),
                        i = Math.max(this.lastInterval, e);
                        let a;
                        if (e < this.lastInterval) {
                            const t = [],
                            e = [];
                            Object.keys(this.dataByTime()).sort().map((t => parseInt(t, 10))).forEach((s => {
                                    this.dataByTime()[s].forEach((s => {
                                            -1 === t.indexOf(s.id) && (e.push(s), t.push(s.id))
                                        }))
                                })),
                            a = e
                        } else
                            a = this._elementsInIntervalRange(s, i);
                        a.length > 0 && this.trigger("data:update", {
                            items: a
                        }),
                        this.lastInterval = e
                    }
                    _prepareDataItems(t) {
                        if (this.increment <= 0 || !Object(h.isPlainObject)(t))
                            return;
                        const e = this._prepareIntervals(),
                        s = t;
                        Object.keys(s).forEach((s => {
                                const {
                                    renderable: i,
                                    data: a,
                                    style: r
                                } = t[s];
                                Object.keys(a).forEach((t => {
                                        const o = parseInt(t, 10),
                                        n = this.dataIntervalClosestToTime(o);
                                        o < this.to && e[n] && e[n].push({
                                            id: s,
                                            value: a[o],
                                            renderable: i,
                                            style: r
                                        })
                                    }))
                            })),
                        this.trigger("ready"),
                        this.trigger("load:done")
                    }
                },
                j = function (t, e, s, i) {
                    return new(s || (s = Promise))((function (a, r) {
                            function o(t) {
                                try {
                                    h(i.next(t))
                                } catch (t) {
                                    r(t)
                                }
                            }
                            function n(t) {
                                try {
                                    h(i.throw(t))
                                } catch (t) {
                                    r(t)
                                }
                            }
                            function h(t) {
                                var e;
                                t.done ? a(t.value) : (e = t.value, e instanceof s ? e : new s((function (t) {
                                            t(e)
                                        }))).then(o, n)
                            }
                            h((i = i.apply(t, e || [])).next())
                        }))
                };
                var k = class {
                    constructor(t, e) {
                        this.source = t;
                        const s = new w;
                        s.provider = this,
                        s.on("data:add", (e => t.trigger("markers:add", {
                                    markers: e.data.items
                                }))),
                        s.on("data:remove", (e => t.trigger("markers:remove", {
                                    markers: e.data.items
                                }))),
                        s.on("data:update", (e => t.trigger("markers:update", {
                                    markers: e.data.items
                                }))),
                        this.animation = s,
                        t.on("data:load:start reset", (() => {
                                this._animationMarkers = null
                            }))
                    }
                    _loadAnimationData() {
                        const t = this.source;
                        return new Promise(((e, s) => {
                                const i = t.service.param("limit") || 300,
                                a = t.service.param("plimit"),
                                o = t.service.param("sort") || "dt:-1",
                                n = t.style.marker || t.style;
                                t.service.action("within").plimit(100).limit(i).sort(o).get().then((s => {
                                        t.service.plimit(a);
                                        const i = {},
                                        o = Object(h.get)(s, "data") || [];
                                        Object(h.isArray)(o) && o.forEach((e => {
                                                const s = t.processRecord(e),
                                                a = s.loc || {},
                                                o = {
                                                    lat: a.lat,
                                                    lon: a.long || a.lon
                                                },
                                                l = s.id || "".concat(o.lat, ",").concat(o.long),
                                                c = t.markersById ? t.markersById[l] : null,
                                                d = Object(h.isFunction)(n) ? n(s) : n;
                                                if (c)
                                                    i[l] = new r.a(Object(h.extend)({}, c.data, s), c.style, c.renderable);
                                                else if (!1 === Object(h.isset)(d.spacing)) {
                                                    const e = t.strategy.factory.marker(t.key, {
                                                        lat: o.lat,
                                                        lon: o.lon
                                                    }, d);
                                                    i[l] = new r.a(Object.assign(Object.assign({}, s), {
                                                                awxjs_source: t.key
                                                            }), d, e)
                                                }
                                            })),
                                        e(i)
                                    })).catch((t => {
                                        console.error("Error requesting animation data for TextSource", t),
                                        s(t)
                                    }))
                            }))
                    }
                    animationData(t) {
                        return j(this, void 0, void 0, (function  * () {
                                const t = this.source,
                                e = () => {
                                    const e = this._animationMarkers,
                                    s = (Object(h.get)(t.opts, "data.properties.timestamp") || "").replace(/^periods\./, "");
                                    let i = Object(h.get)(t.opts, "data.properties.value");
                                    Object(h.isFunction)(i) || (i = (i || "").replace(/^periods\./, ""));
                                    return Object.keys(e).reduce(((a, r) => {
                                            const {
                                                data: o,
                                                renderable: n
                                            } = e[r];
                                            if (o && o.periods) {
                                                let e;
                                                const l = o.periods.reduce(((t, a) => {
                                                            const r = 1e3 * Object(h.get)(a, s);
                                                            let o = "";
                                                            return o = Object(h.isFunction)(i) ? i(a) : Object(h.get)(a, i),
                                                            o !== e && (t[r] = o, e = o),
                                                            t
                                                        }), {});
                                                return a[r] = {
                                                    data: l,
                                                    renderable: n,
                                                    style: t.style
                                                },
                                                a
                                            }
                                            return null
                                        }), {})
                                },
                                s = () => new Promise(((t, e) => {
                                        this._loadAnimationData().then((e => {
                                                this._animationMarkers = e,
                                                t(e)
                                            }))
                                    }));
                                return new Promise(((i, a) => {
                                        if (this._animationMarkers) {
                                            const t = e();
                                            i(t)
                                        } else
                                            t.isLoading ? t.once("data:load", (() => {
                                                    s().then((t => {
                                                            const s = e();
                                                            i(s)
                                                        }))
                                                })) : s().then((t => {
                                                    const s = e();
                                                    i(s)
                                                }))
                                    }))
                            }))
                    }
                };
                var x = class extends O {
                    constructor(t, e) {
                        var s;
                        super(t, e),
                        (null === (s = this.opts.animation) || void 0 === s ? void 0 : s.enabled) && (this._animator = new k(this, this.opts.animation))
                    }
                    processRecord(t) {
                        t = Object(h.cloneDeep)(t);
                        let e = Object(h.get)(this.opts, "data.properties.value");
                        return Object(h.isFunction)(e) || (e = (e || "").replace(/^periods\./, ""), t.periods && (e = "periods[0].".concat(e))),
                        t.value = t.value || (Object(h.isFunction)(e) ? e(t) : Object(h.get)(t, e)),
                        t
                    }
                },
                T = s("dJbZ");
                var L = class extends O {
                    _process(t, e) {
                        if (!this.strategy)
                            throw new Error("No map strategy defined for VectorSource but one is required.");
                        t = t || {};
                        const s = Object(h.get)(this.opts, "data.formatter");
                        s && (t = s(t));
                        const i = {},
                        a = {},
                        r = {};
                        if (Object(h.isArray)(t) && (t = t[0] && "FeatureCollection" === t[0].type ? t[0] : {
                                    type: "FeatureCollection",
                                    features: t
                                }), "Feature" === t.type ? t = {
                                type: "FeatureCollection",
                                features: [t]
                            }
                             : "GeometryCollection" === t.type && (t = {
                                    type: "FeatureCollection",
                                    features: (t.geometries || []).map((t => ({
                                                type: "Feature",
                                                geometry: t
                                            })))
                                }), !Object(h.isset)(t.type))
                            return console.warn("Invalid data provided for GeoJsonSource with key ".concat(this.key, ", not a valid GeoJSON format")), null;
                        const o = this.strategy.factory,
                        u = new T.a(t), {
                            marker: p,
                            polygon: m,
                            polyline: g
                        } = this.style;
                        return (u.features || []).forEach(((t, e) => {
                                const s = t.geometry,
                                u = t.properties || {};
                                let y;
                                const f = Object(h.get)(this.opts, "data.properties.id"),
                                b = Object(h.get)(this.opts, "data.properties.category");
                                if (Object(h.isset)(f) && (t.id = Object(h.get)(u, f)), Object(h.isset)(b)) {
                                    y = Object(h.get)(u, b);
                                    const t = Object(h.set)({}, b, y);
                                    a[y] || (a[y] = {
                                            data: Object.assign(Object.assign({}, t), {
                                                awxjs_source: this.key
                                            }),
                                            elements: []
                                        }),
                                    r[y] || (r[y] = {
                                            data: Object.assign(Object.assign({}, t), {
                                                awxjs_source: this.key
                                            }),
                                            elements: []
                                        })
                                }
                                if (u.id = "".concat(this.key), t.id ? u.id = "".concat(u.id, "-").concat(t.id) : u.id = "".concat(u.id, "-").concat(e), s instanceof n.e) {
                                    const t = Object(h.isFunction)(p) ? p(u) : p,
                                    e = l(this.key, u, s.coordinates, t, o);
                                    i[u.id] = e
                                } else if (s instanceof n.c)
                                    s.coordinates.forEach(((t, e) => {
                                            const s = Object.assign(Object.assign({}, u), {
                                                id: "".concat(u.id, "-").concat(e)
                                            }),
                                            a = Object(h.isFunction)(p) ? p(s) : p,
                                            r = l(this.key, s, t, a, o);
                                            i[u.id] = r
                                        }));
                                else if (s instanceof n.a) {
                                    const t = c(this.key, u, s.coordinates, g, o);
                                    y ? r[y].elements.push(t) : r[u.id] = t
                                } else if (s instanceof n.b)
                                    s.coordinates.forEach(((t, e) => {
                                            const s = Object.assign(Object.assign({}, u), {
                                                id: "".concat(u.id, "-").concat(e)
                                            }),
                                            i = c(this.key, s, t, g, o);
                                            y ? r[y].elements.push(i) : r[u.id] = i
                                        }));
                                else if (s instanceof n.f) {
                                    const t = d(this.key, u, s, m, o);
                                    y ? r[y].elements.push(t) : a[u.id] = t
                                } else if (s instanceof n.d) {
                                    const t = d(this.key, u, s, m, o);
                                    y ? r[y].elements.push(t) : a[u.id] = t
                                }
                            })), {
                            markers: Object.keys(i).map((t => i[t])),
                            polygons: Object.keys(a).map((t => a[t])),
                            polylines: Object.keys(r).map((t => r[t]))
                        }
                    }
                },
                M = s("uts4")
            },
            hWIy: function (t, e, s) {
                "use strict";
                var i = s("dB9R"),
                a = s("0lfv");
                class r extends i.a {
                    get showWhenLoading() {
                        return this.opts.showWhenLoading
                    }
                    set showWhenLoading(t) {
                        this.opts.showWhenLoading = t
                    }
                    get bufferCount() {
                        let t = this.opts.bufferIntervals;
                        return -1 === t ? this.totalIntervals : (this.isFuture() && this.containsPast() && (t = this.opts.bufferIntervals - (this.opts.intervals - this.totalIntervals)), Math.max(0, Math.min(t, this.totalIntervals)))
                    }
                    constructor() {
                        let t = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : null;
                        t = Object(a.extend)({}, {
                            refresh: 0,
                            showWhenLoading: !0,
                            showLoadingIntervals: !1,
                            bufferIntervals: -1,
                            reverseLoadOrder: !1,
                            times: void 0
                        }, t),
                        super(t),
                        this._layersByTime = null,
                        this._isReset = !1,
                        this._loading = !1,
                        this._hasLoaded = !1,
                        this._visible = !0,
                        Object(a.isset)(this.opts.times) && this.setTimes(this.opts.times),
                        this._startup()
                    }
                    dataByTime() {
                        return this._layersByTime || {}
                    }
                    dataItems() {
                        return Object.keys(this.dataByTime()).map((t => this._layersByTime[t]))
                    }
                    play() {
                        if (this.isAnimating())
                            return;
                        const t = this.totalIntervals,
                        e = this.bufferCount;
                        (e > 0 || 0 === this.bufferCount) && (!this._hasImages() && t > 0 || this._totalImages() < e) ? this._load() : (this.show(), super.play())
                    }
                    stop() {
                        super.stop(),
                        this._loading && this.reset()
                    }
                    reset() {
                        let t = arguments.length > 0 && void 0 !== arguments[0] && arguments[0];
                        super.reset(t),
                        this.hide(),
                        this._reloadTimer && window.clearTimeout(this._reloadTimer),
                        this._isReset = !0,
                        this._loading = !1,
                        this._hasLoaded = !1,
                        this._layersByTime = null,
                        this._currentLayer = null,
                        this._layersByTime && Object.keys(this._layersByTime).forEach((t => {
                                const e = parseInt(t, 10);
                                this._layersByTime[e].remove(),
                                delete this._layersByTime[e]
                            }))
                    }
                    isReady() {
                        const t = this.bufferCount,
                        e = this._totalImages();
                        return this.canBeginPlayback() && (this._hasImages() && e >= t || 0 === t)
                    }
                    needsData() {
                        return this._totalImages() < this.totalIntervals
                    }
                    canBeginPlayback() {
                        return this.bufferCount >= 0 ? this._totalImages() >= this.bufferCount : !this.isLoading()
                    }
                    canAnimate() {
                        let t = super.canAnimate();
                        return t && this._hasLoaded && this.needsData() && (t = !1),
                        t
                    }
                    isLoading() {
                        return this._loading
                    }
                    show() {
                        this._visible = !0,
                        this._currentLayer && this._currentLayer.show()
                    }
                    hide() {
                        this._visible = !1,
                        this._currentLayer && this._currentLayer.hide()
                    }
                    isVisible() {
                        return !this._currentLayer || this._currentLayer.isVisible()
                    }
                    setOpacity(t) {
                        this.dataItems().forEach((e => {
                                Object(a.has)(e, "setOpacity") && e.setOpacity(t, !0)
                            }))
                    }
                    _updateForTime(t) {
                        if (this.canShow(this.currentTime) ? this.show() : this.hide(), !1 === this._visible)
                            return;
                        const e = this._frameClosestToTime(t);
                        e && e !== this._currentLayer && (e.show(), this._currentLayer && this._currentLayer.hide(), this._currentLayer = e)
                    }
                    _frameClosestToTime(t) {
                        if (0 === Object.keys(this.dataByTime()).length)
                            return null;
                        const e = Object.keys(this._layersByTime).sort().reverse().map((t => parseInt(t, 10)));
                        let s = null,
                        i = e[e.length - 1],
                        a = Math.abs(t - i);
                        return e.forEach((e => {
                                const s = Math.abs(t - e);
                                s < a && (a = s, i = e)
                            })),
                        i !== this._lastImageTime && this._layersByTime[i] && (s = this._layersByTime[i], i = Math.round(i), this._lastImageTime = i, this.trigger("advance:image", {
                                time: i,
                                layer: s
                            })),
                        s
                    }
                    _hasImages() {
                        return this._totalImages() > 0
                    }
                    _totalImages() {
                        return Object.keys(this.dataByTime()).length
                    }
                    _load() {
                        if (this._loading)
                            return;
                        let t = this.neededIntervals();
                        if (!t || 0 === t.length)
                            return this._hasLoaded = !0, this.trigger("load:done"), void this.trigger("ready");
                        this._isReset = !1,
                        this._loading = !0;
                        const e = this.bufferCount;
                        this._layersByTime && Object.keys(this._layersByTime).forEach((e => {
                                const s = parseInt(e, 10),
                                i = t.indexOf(s);
                                -1 !== i && t.splice(i, 1)
                            }));
                        const s = () => {
                            this._loading = !1,
                            this._hasLoaded = !0,
                            this.trigger("load:done"),
                            (-1 === e || e >= t.length) && this.trigger("ready"),
                            this.timeline || this.play()
                        };
                        if (0 === t.length)
                            return void s();
                        e >= 0 && !0 === this.opts.reverseLoadOrder && (t = t.reverse()),
                        this.trigger("load:start", {
                            times: t
                        });
                        const i = i => {
                            const a = !1 === this.opts.showLoadingIntervals && 0 !== e;
                            i.forEach((e => {
                                    this._loadInterval(e, !0, a, (() => {
                                            this._totalImages() === t.length && s()
                                        }))
                                }))
                        };
                        let a = 0;
                        const r = () => {
                            const o = !1 === this.opts.showLoadingIntervals || 0 !== e && a <= this._totalImages();
                            this._loadInterval(t[a], !0, o, (() => {
                                    a += 1,
                                    this._isReset || (a >= t.length ? (s(), this.opts.refresh > 0 && (this._reloadTimer && window.clearTimeout(this._reloadTimer), this._reloadTimer = setTimeout((() => {
                                                            this.reset(),
                                                            this._load()
                                                        }), 1e3 * this.opts.refresh))) : e > 0 && this._totalImages() === e ? (this.trigger("ready"), this.opts.showLoadingIntervals ? i(t.slice(a)) : r()) : r())
                                }))
                        };
                        0 === e ? (this.trigger("ready"), i(t)) : r()
                    }
                    _loadInterval(t, e, s) {
                        let i = arguments.length > 3 && void 0 !== arguments[3] ? arguments[3] : null;
                        if (t = Math.round(t), this._layersByTime) {
                            if (this._layersByTime[t])
                                return void(i && i())
                        } else
                            this._layersByTime = {};
                        const a = new Date(t);
                        this.provider && this.provider.animationLayerForDate(this, a, s).then((e => {
                                this._isReset ? e.remove() : (this.showWhenLoading && this._totalImages() < this.bufferCount && (this._currentLayer && this._currentLayer.hide(), e.show(), this._currentLayer = e), this._layersByTime[t] = e, this.trigger("load:image", {
                                        date: new Date(t),
                                        layer: e
                                    }), this.trigger("load:progress", {
                                        time: t,
                                        loaded: Object.keys(this._layersByTime).length,
                                        total: this.totalIntervals
                                    }), i && i())
                            })).catch((t => {
                                console.error("Failed to load tile animation interval", t)
                            }))
                    }
                }
                e.a = r
            },
            l1hk: function (t, e, s) {
                "use strict";
                s.d(e, "b", (function () {
                        return o
                    }));
                class i extends Error {
                    constructor(t) {
                        super(t),
                        this.name = this.constructor.name,
                        this.stack = (new Error).stack
                    }
                }
                var a = i,
                r = s("0lfv");
                const o = t => {
                    let e = Math.ceil(Math.abs(t.lat) / 180);
                    return t.lat > 90 ? t.lat -= 180 * e : t.lat < -90 && (t.lat += 180 * e),
                    e = Math.ceil(Math.abs(t.lon) / 360),
                    t.lon > 180 ? t.lon -= 360 * e : t.lon < -180 && (t.lon += 360 * e),
                    t
                };
                class n {
                    constructor(t, e) {
                        if (this.north = 0, this.south = 0, this.west = 0, this.east = 0, t = o(t), e = o(e), void 0 === t || !Object(r.isObject)(t))
                            throw new a("CoordinateBounds - northwest coordinate value is required");
                        if (void 0 === e || !Object(r.isObject)(e))
                            throw new a("CoordinateBounds - southeast coordinate value is required");
                        if (t.lat < e.lat)
                            throw new a("CoordinateBounds - northern latitude must be greater than southern latitude");
                        this.north = t.lat,
                        this.south = e.lat,
                        this.west = t.lon,
                        this.east = e.lon
                    }
                    static fromBounds(t) {
                        return new n({
                            lat: t.north,
                            lon: t.west
                        }, {
                            lat: t.south,
                            lon: t.east
                        })
                    }
                    static fromPoints(t) {
                        const e = {
                            north: null,
                            south: null,
                            west: null,
                            east: null
                        };
                        return t.forEach(((t, s) => {
                                0 === s ? (e.north = t.lat, e.south = t.lat, e.west = t.lon, e.east = t.lon) : Object(r.isset)(t.lat) && Object(r.isset)(t.lon) && (e.north = Math.max(e.north, t.lat), e.south = Math.min(e.south, t.lat), e.west = Math.min(e.west, t.lon), e.east = Math.max(e.east, t.lon))
                            })),
                        n.fromBounds(e)
                    }
                    northwest() {
                        return {
                            lat: this.north,
                            lon: this.west
                        }
                    }
                    southwest() {
                        return {
                            lat: this.south,
                            lon: this.west
                        }
                    }
                    northeast() {
                        return {
                            lat: this.north,
                            lon: this.east
                        }
                    }
                    southeast() {
                        return {
                            lat: this.south,
                            lon: this.east
                        }
                    }
                    center() {
                        return {
                            lat: this.north - (this.north - this.south) / 2,
                            lon: this.west - (this.west - this.east) / 2
                        }
                    }
                    extend(t) {
                        if (!(this.north || this.south || this.west || this.east))
                            return this.north = t.lat, this.south = t.lat, this.west = t.lon, void(this.east = t.lon);
                        this.north = Math.max(this.north, t.lat),
                        this.south = Math.min(this.south, t.lat),
                        this.west = Math.min(this.west, t.lon),
                        this.east = Math.max(this.east, t.lon)
                    }
                    intersects(t) {
                        if (this.contains(t))
                            return !1;
                        const {
                            north: e,
                            south: s,
                            east: i,
                            west: a
                        } = t;
                        return (e <= this.north && e >= this.south || s >= this.south && s <= this.north) && (a >= this.west && a <= this.east || i <= this.east && i >= this.west)
                    }
                    contains(t) {
                        if (t instanceof n) {
                            const {
                                north: e,
                                south: s,
                                east: i,
                                west: a
                            } = t;
                            return e < this.north && s > this.south && a > this.west && i < this.east
                        }
                        const {
                            lat: e,
                            lon: s
                        } = t;
                        return e < this.north && e > this.south && s > this.west && s < this.east
                    }
                    toString() {
                        return "".concat(this.north, ",").concat(this.west, ",").concat(this.south, ",").concat(this.east)
                    }
                }
                e.a = n
            },
            lnrW: function (t, e, s) {
                "use strict";
                s.d(e, "d", (function () {
                        return u
                    })),
                s.d(e, "b", (function () {
                        return m
                    })),
                s.d(e, "c", (function () {
                        return g
                    }));
                s("UxlC");
                var i = s("m0x2"),
                a = s("qV3b"),
                r = s("0lfv");
                var o = class {
                    constructor(t) {
                        this.account = t
                    }
                    times(t) {
                        let e = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : 20;
                        return new Promise(((s, i) => {
                                const o = "https://maps.aerisapi.com/".concat(this.account.id, "_").concat(this.account.secret, "/").concat(t, ".json?limit=").concat(e);
                                a.b.request(o).then((t => {
                                        let e = [];
                                        if (t.data) {
                                            const s = t.data;
                                            Object(r.isset)(s.files) && (e = s.files.map((t => ({
                                                                time: new Date(1e3 * t.timestamp),
                                                                min: new Date(1e3 * t.minTimestamp),
                                                                max: new Date(1e3 * t.maxTimestamp),
                                                                run: new Date(1e3 * t.runTime)
                                                            }))))
                                        }
                                        s(e)
                                    })).catch((t => {
                                        i(t)
                                    }))
                            }))
                    }
                    timesInRange(t, e, s) {
                        let i = arguments.length > 3 && void 0 !== arguments[3] ? arguments[3] : 20;
                        return this.times(t, i).then((t => t.filter((t => t.time.getTime() >= e.getTime() && t.time.getTime() <= s.getTime()))))
                    }
                };
                let n,
                h = [];
                const l = ["air-quality", "earthquakes", "fires", "records", "river-observations", "stormreports"],
                c = ["convective", "drought-monitor", "fire-outlook", "tropical-cyclones-break-points"],
                d = l.concat(c).concat(["stormcells", "tropical-cyclones"]),
                u = t => -1 !== d.indexOf(t),
                p = ["observations"],
                m = t => -1 !== p.indexOf(t),
                g = t => !u(t) && !m(t),
                y = t => {
                    if (!Object(r.isset)(t) || !Object(r.isString)(t))
                        return [];
                    t = t.replace(/\:.+$/, "");
                    const e = (n || []).map((t => t.id)),
                    s = (t || "").split(","),
                    i = [];
                    s.forEach((t => {
                            -1 === e.indexOf(t) && h.forEach((e => {
                                    t = t.replace(new RegExp("-".concat(e)), "")
                                })),
                            i.push(t)
                        }));
                    const a = [];
                    return i.forEach((t => {
                            t = t.replace(/\:.*$/, "");
                            -1 !== e.indexOf(t) || u(t) || m(t) || a.push(t)
                        })),
                    a
                };
                class f extends i.a {
                    constructor(t) {
                        super(),
                        this._groups = {},
                        this._loading = !1,
                        this._validTimes = new o(t),
                        Object(r.isset)(n) ? this._process(n) : this.fetch()
                    }
                    get validTimes() {
                        return this._validTimes
                    }
                    fetch() {
                        return new Promise(((t, e) => {
                                n ? t(Object(r.cloneDeep)(n)) : this._loading ? this.on("load:done", (e => {
                                        t(Object(r.cloneDeep)(n))
                                    })) : this._fetchLayerMetadata().then((e => {
                                        t(Object(r.cloneDeep)(n))
                                    }))
                            })).catch((t => {
                                console.error("[Aeris] Failed to load map layer metadata - ".concat(t))
                            }))
                    }
                    cached() {
                        return void 0 !== n
                    }
                    loading() {
                        return this._loading
                    }
                    groups() {
                        return this._groups
                    }
                    inGroup(t, e) {
                        let s = arguments.length > 2 && void 0 !== arguments[2] && arguments[2];
                        const i = this._groups[e];
                        if (t = t.replace(/:.*$/, ""), i) {
                            if (s)
                                return -1 !== i.indexOf(t);
                            let e = !1;
                            return i.forEach((s => {
                                    const i = new RegExp("^".concat(s, "-"));
                                    (s === t || i.test(t)) && (e = !0)
                                })),
                            e
                        }
                        return !1
                    }
                    exists(t) {
                        return (t => 0 === y(t).length)(t)
                    }
                    find(t, e) {
                        let s = arguments.length > 2 && void 0 !== arguments[2] && arguments[2];
                        const i = this.findAll(t, [e], s);
                        if (i.length > 0)
                            return i[0]
                    }
                    findAll(t, e) {
                        let s = arguments.length > 2 && void 0 !== arguments[2] && arguments[2];
                        const i = n,
                        a = [];
                        return e = e || [],
                        i && e.forEach((e => {
                                i.forEach(((i, o) => {
                                        const n = i[t];
                                        let h = n === e;
                                        if (!h) {
                                            const a = new RegExp("^".concat(n, "-"));
                                            let r = (i.modifiers || []).map((t => [].concat((t.options || []).map((t => "".concat(i.id, "-").concat(t.id))))));
                                            r = r.length > 0 ? r[0] : r,
                                            "id" === t && (h = s ? -1 !== r.indexOf(e) : a.test(e))
                                        }
                                        h && ("id" === t && (i = Object(r.extend)(Object(r.cloneDeep)(i), {
                                                    id: e
                                                })), a.push(i))
                                    }))
                            })),
                        Object(r.cloneDeep)(a)
                    }
                    findInvalidIds(t) {
                        const e = Object(r.isArray)(t) ? t.join(",") : t;
                        return y(e)
                    }
                    future() {
                        if (!this._future) {
                            const t = this.findAll("category", ["forecasts", "models", "outlooks"]);
                            t.push(this.find("id", "fradar")),
                            t.push(this.find("id", "fsatellite")),
                            this._future = t
                        }
                        return this._future
                    }
                    futureCodes() {
                        return this.future().map((t => t ? t.id : void 0))
                    }
                    isFuture(t) {
                        let e = !1;
                        if (t.indexOf(",") >= 0)
                            return this._checkCombined(t, (t => this.isFuture(t)));
                        const s = this.futureCodes();
                        let i = t.replace(/:.*$/, "");
                        return e = -1 !== s.indexOf(i),
                        e || (i = i.replace(/\-\w+$/, ""), e = -1 !== s.indexOf(i)),
                        e
                    }
                    isBase(t) {
                        const e = t.replace(/:.*$/, "");
                        return this.inGroup(e, "base")
                    }
                    isOverlay(t) {
                        const e = t.replace(/:.*$/, "");
                        return this.inGroup(e, "overlay") || this.inGroup(e, "masks")
                    }
                    hasMetric(t) {
                        return !!this.inGroup(t, "text") && !1 === /^f?humidity-/.test(t)
                    }
                    _checkCombined(t, e) {
                        let s = !1;
                        return (t || "").split(",").forEach((t => {
                                e(t) && (s = !0)
                            })),
                        s
                    }
                    _process(t) {
                        if (!t)
                            return;
                        const e = {};
                        h = [],
                        t.forEach((t => {
                                let s = t.category;
                                s.match(/^base/) ? s = "base" : s.match(/overlay/) && (s = "overlay"),
                                void 0 === e[s] && (e[s] = []),
                                e[s].push(t.id),
                                /-text$/.test(t.id) && (void 0 === e.text && (e.text = []), e.text.push(t.id)),
                                t.modifiers && Object(r.isArray)(t.modifiers) && t.modifiers.forEach((t => {
                                        t.options && t.options.forEach((t => {
                                                -1 === h.indexOf(t.id) && h.push(t.id)
                                            }))
                                    }))
                            })),
                        h.push("aeris"),
                        this._groups = e
                    }
                    _fetchLayerMetadata() {
                        return this._loading = !0,
                        this.trigger("load:start"),
                        new Promise(((t, e) => {
                                a.b.request("https://cdn.aerisjs.com/layers.json").then((e => {
                                        e.data && (n = e.data, this._process(e.data), this._loading = !1, this.trigger("load:done"), t(n))
                                    })).catch((t => {
                                        e(t)
                                    }))
                            })).catch((t => {
                                console.error("Layers: Failed to load layers metadata - ".concat(t))
                            }))
                    }
                }
                e.a = f
            },
            njwm: function (t, e, s) {
                "use strict";
                s.d(e, "a", (function () {
                        return S
                    }));
                s("UxlC");
                var i = s("0lfv");
                const a = function () {
                    let t = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : "";
                    switch (t = t.toLowerCase().replace(/\s/, "-"), t) {
                    case "good":
                        return "#29e11f";
                    case "moderate":
                        return "#f8f92a";
                    case "usg":
                        return "#f9681b";
                    case "unhealthy":
                        return "#f60115";
                    case "very-unhealthy":
                        return "#7a2c83";
                    case "hazardous":
                        return "#65001b";
                    default:
                        return "#000000"
                    }
                },
                r = {
                    data: {
                        request: {
                            endpoint: "airquality"
                        },
                        properties: {
                            id: "id",
                            timestamp: "timestamp"
                        }
                    },
                    style: {
                        marker: t => {
                            const e = Object(i.get)(t, "periods.0");
                            if (!e)
                                return {
                                    skip: !0
                                };
                            const s = Object(i.get)(e, "category");
                            if (!s)
                                return {
                                    skip: !0
                                };
                            const r = function () {
                                let t = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : "";
                                switch (t = t.toLowerCase().replace(/\s/, "-"), t) {
                                case "moderate":
                                    return 12;
                                case "usg":
                                    return 14;
                                case "unhealthy":
                                    return 18;
                                case "very-unhealthy":
                                    return 20;
                                case "hazardous":
                                    return 24;
                                default:
                                    return 10
                                }
                            }
                            (s);
                            return {
                                className: "marker-airquality",
                                svg: {
                                    shape: {
                                        type: "circle",
                                        fill: {
                                            color: a(s)
                                        },
                                        stroke: {
                                            color: "#ffffff",
                                            width: 2
                                        }
                                    }
                                },
                                size: [r, r]
                            }
                        }
                    }
                };
                var o = r;
                const n = {
                default:
                    "#000000",
                    general: "#b3e6b1",
                    marginal: "#6cbd69",
                    slight: "#f4f964",
                    enhanced: "#e0b767",
                    moderate: "#e0686a",
                    high: "#fe59ff"
                };
                var h = {
                    data: {
                        request: {
                            endpoint: "convective/outlook",
                            action: "search",
                            parameters: {
                                filter: "geo"
                            }
                        },
                        properties: {
                            id: "id",
                            category: "details.risk.type",
                            timestamp: {
                                from: "details.range.minTimestamp",
                                to: "details.range.maxTimestamp"
                            },
                            path: "geoPoly"
                        }
                    },
                    style: {
                        polygon: t => {
                            const e = Object(i.get)(t, "details.risk.type");
                            return {
                                fill: {
                                    color: n[e] || n.default,
                                    opacity: 1
                                }
                            }
                        }
                    }
                };
                const l = function () {
                    let t = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : "";
                    switch (t = t.toLowerCase(), t) {
                    case "d0":
                        return "#ffff00";
                    case "d1":
                        return "#fccc66";
                    case "d2":
                        return "#ff9b00";
                    case "d3":
                        return "#e10000";
                    case "d4":
                        return "#600000";
                    default:
                        return "#000000"
                    }
                };
                var c = {
                    data: {
                        request: {
                            endpoint: "droughts/monitor",
                            action: "search",
                            parameters: {
                                filter: "geo"
                            }
                        },
                        properties: {
                            id: "id",
                            category: "details.category",
                            timestamp: {
                                from: "details.range.minTimestamp",
                                to: "details.range.maxTimestamp"
                            },
                            path: "geoPoly"
                        }
                    },
                    style: {
                        polygon: t => {
                            const e = Object(i.get)(t, "details.category");
                            return {
                                fill: {
                                    color: l(e),
                                    opacity: 1
                                }
                            }
                        }
                    }
                };
                const d = function () {
                    let t = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : "";
                    switch (t = t.toLowerCase().replace(/\s/, "-"), t) {
                    case "mini":
                        return "#6fb314";
                    case "minor":
                        return "#dfcb01";
                    case "light":
                        return "#ce8f00";
                    case "moderate":
                        return "#ff5d01";
                    case "strong":
                        return "#e90004";
                    case "major":
                        return "#ce0052";
                    case "great":
                        return "#b90285";
                    case "catastrophic":
                        return "#f500ff";
                    default:
                        return "#000000"
                    }
                },
                u = {
                    data: {
                        request: {
                            endpoint: "earthquakes"
                        },
                        properties: {
                            id: "report.id",
                            timestamp: "report.timestamp"
                        }
                    },
                    style: {
                        marker: t => {
                            let e = Object(i.get)(t, "report.type");
                            Object(i.get)(t, "report.mag") >= 9 && (e = "catastrophic");
                            const s = function () {
                                let t = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : "";
                                switch (t = t.toLowerCase().replace(/\s/, "-"), t) {
                                case "minor":
                                    return 18;
                                case "light":
                                    return 20;
                                case "moderate":
                                    return 22;
                                case "strong":
                                    return 26;
                                case "major":
                                    return 30;
                                case "great":
                                    return 36;
                                case "catastrophic":
                                    return 42;
                                default:
                                    return 16
                                }
                            }
                            (e);
                            return {
                                className: "marker-earthquake",
                                svg: {
                                    shape: {
                                        type: "circle",
                                        fill: {
                                            color: d(e)
                                        },
                                        stroke: {
                                            color: "#ffffff",
                                            width: 2
                                        }
                                    }
                                },
                                size: [s, s]
                            }
                        }
                    },
                    animation: {
                        enabled: !0
                    }
                };
                var p = u;
                var m = {
                    data: {
                        request: {
                            endpoint: "fires"
                        },
                        properties: {
                            id: "report.id",
                            timestamp: "report.timestamp"
                        }
                    },
                    style: {
                        marker: t => ({
                            className: "marker-earthquake",
                            svg: {
                                shape: {
                                    type: "circle",
                                    fill: {
                                        color: "#ff0000"
                                    },
                                    stroke: {
                                        color: "#ffffff",
                                        width: 2
                                    }
                                }
                            },
                            size: [12, 12]
                        })
                    },
                    animation: {
                        enabled: !0
                    }
                };
                const g = function () {
                    let t = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : "";
                    switch (t = t.toLowerCase(), t) {
                    case "elevated":
                        return "#ffb367";
                    case "critical":
                        return "#ff666a";
                    case "extreme":
                        return "#fe59ff";
                    default:
                        return "#000000"
                    }
                };
                var y = {
                    data: {
                        request: {
                            endpoint: "fires/outlook",
                            action: "search",
                            parameters: {
                                filter: "geo"
                            }
                        },
                        properties: {
                            id: "id",
                            path: "geoPoly",
                            category: "details.risk.type",
                            timestamp: {
                                from: "details.range.minTimestamp",
                                to: "details.range.maxTimestamp"
                            }
                        }
                    },
                    style: {
                        polygon: t => {
                            const e = Object(i.get)(t, "details.risk.type");
                            return {
                                fill: {
                                    color: g(e),
                                    opacity: .7
                                }
                            }
                        }
                    }
                };
                const f = t => t < 1 ? "#f5f5f5" : t < 5 ? "#dddddd" : t < 10 ? "#bbbbbb" : t < 15 ? "#888888" : "#545454";
                var b = {
                    data: {
                        request: {
                            endpoint: "lightning"
                        },
                        properties: {
                            id: "id",
                            timestamp: "ob.timestamp"
                        }
                    },
                    style: {
                        marker: t => {
                            const e = Object(i.get)(t, "ob.timestamp");
                            if (!e)
                                return null;
                            const s = ((new Date).getTime() - 1e3 * e) / 6e4;
                            return {
                                className: "marker-record",
                                svg: {
                                    shape: {
                                        type: "circle",
                                        fill: {
                                            color: f(s)
                                        },
                                        stroke: {
                                            color: "#ffffff",
                                            width: 2
                                        }
                                    }
                                },
                                size: [14, 14]
                            }
                        }
                    },
                    animation: {
                        enabled: !0
                    }
                };
                const v = function () {
                    let t = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : "";
                    switch (t = t.toLowerCase().replace(/\s/, "-"), t) {
                    case "prcp":
                        return "#2ef000";
                    case "snow":
                        return "#004fff";
                    case "hsnd":
                        return "#e402a4";
                    case "maxt":
                        return "#ff4b00";
                    case "mint":
                        return "#8700ff";
                    case "himn":
                        return "#eef500";
                    case "lomx":
                        return "#37b9f8";
                    default:
                        return "#000000"
                    }
                };
                var _ = {
                    data: {
                        request: {
                            endpoint: "records"
                        },
                        properties: {
                            id: "id",
                            timestamp: "report.timestamp"
                        }
                    },
                    style: {
                        marker: t => {
                            const e = Object(i.get)(t, "report.type");
                            return {
                                className: "marker-record",
                                svg: {
                                    shape: {
                                        type: "circle",
                                        fill: {
                                            color: v(e)
                                        },
                                        stroke: {
                                            color: "#ffffff",
                                            width: 2
                                        }
                                    }
                                },
                                size: [14, 14]
                            }
                        }
                    },
                    animation: {
                        enabled: !0
                    }
                };
                const O = function () {
                    let t = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : "";
                    switch (t = t.toLowerCase().replace(/\s/, "-"), t) {
                    case "out_of_service":
                        return "#535353";
                    case "obs_not_current":
                        return "#afb6ad";
                    case "not_defined":
                        return "#5f9de6";
                    case "low_threshold":
                        return "#7e5012";
                    case "no_flooding":
                        return "#0cff01";
                    case "action":
                        return "#ffff02";
                    case "minor":
                        return "#ff8700";
                    case "moderate":
                        return "#ff0000";
                    case "major":
                        return "#c000ff";
                    default:
                        return "#000000"
                    }
                };
                var w = {
                    data: {
                        request: {
                            endpoint: "rivers"
                        },
                        properties: {
                            id: "id",
                            timestamp: "ob.timestamp"
                        }
                    },
                    style: {
                        marker: t => {
                            const e = Object(i.get)(t, "ob.status");
                            return {
                                className: "marker-river",
                                svg: {
                                    shape: {
                                        type: "circle",
                                        fill: {
                                            color: O(e)
                                        },
                                        stroke: {
                                            color: "#ffffff",
                                            width: 2
                                        }
                                    }
                                },
                                size: [14, 14]
                            }
                        }
                    }
                };
                const j = function () {
                    let t = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : "";
                    switch (t = t.toLowerCase(), t) {
                    case "general":
                        return "#2ED300";
                    case "hail":
                        return "#EBE100";
                    case "rotating":
                        return "#F17200";
                    case "tornado":
                        return "#FF2600";
                    default:
                        return "#000000"
                    }
                };
                var k = {
                    data: {
                        request: {
                            endpoint: "stormcells"
                        },
                        properties: {
                            id: "id",
                            path: "forecast.cone.wide",
                            category: "traits.type",
                            timestamp: "ob.timestamp"
                        },
                        reversedCoord: !0
                    },
                    style: {
                        marker: t => {
                            const e = Object(i.get)(t, "traits.type");
                            return {
                                className: "marker-stormcell",
                                svg: {
                                    shape: {
                                        type: "circle",
                                        fill: {
                                            color: j(e)
                                        },
                                        stroke: {
                                            color: "#ffffff",
                                            width: 2
                                        }
                                    }
                                },
                                size: [12, 12]
                            }
                        },
                        polygon: t => {
                            const e = Object(i.get)(t, "traits.type");
                            return {
                                fill: {
                                    color: j(e),
                                    opacity: .5
                                }
                            }
                        }
                    }
                };
                const x = function () {
                    let t = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : "";
                    switch (t = t.toLowerCase(), t) {
                    case "avalanche":
                        return "#639fec";
                    case "blizzard":
                        return "#4100e2";
                    case "flood":
                        return "#117d00";
                    case "fog":
                        return "#767676";
                    case "ice":
                        return "#e100e2";
                    case "hail":
                        return "#62def7";
                    case "lightning":
                        return "#8c8c8c";
                    case "rain":
                        return "#38e600";
                    case "snow":
                        return "#175cef";
                    case "tides":
                        return "#40db83";
                    case "tornado":
                        return "#c50000";
                    case "tropical":
                        return "#FF5D00";
                    case "wind":
                        return "#d8cc00";
                    default:
                        return "#555555"
                    }
                };
                var T = {
                    data: {
                        request: {
                            endpoint: "stormreports"
                        },
                        properties: {
                            id: "id",
                            timestamp: "report.timestamp"
                        }
                    },
                    style: {
                        marker: t => {
                            const e = Object(i.get)(t, "report.cat");
                            return {
                                className: "marker-stormreport",
                                svg: {
                                    shape: {
                                        type: "circle",
                                        fill: {
                                            color: x(e)
                                        },
                                        stroke: {
                                            color: "#ffffff",
                                            width: 2
                                        }
                                    }
                                },
                                size: [14, 14]
                            }
                        }
                    },
                    animation: {
                        enabled: !0
                    }
                };
                var L = {
                    style: {
                        marker: t => ({
                            className: "marker-text",
                            svg: {
                                text: {
                                    value: t.value || "",
                                    x: 25,
                                    y: Math.round(16 - (16 - 14 * .7) / 2),
                                    size: 14,
                                    style: "bold",
                                    color: "rgb(0,0,0)",
                                    autosize: !0
                                }
                            },
                            spacing: 20
                        })
                    }
                };
                const M = {
                    "air-quality": o,
                    convective: h,
                    "drought-monitor": c,
                    earthquakes: p,
                    fires: m,
                    "fire-outlook": y,
                    "lightning-strikes": b,
                    records: _,
                    "river-observations": w,
                    stormcells: k,
                    stormreports: T,
                    text: L
                },
                S = t => M[t];
                e.b = {
                    airquality: o,
                    convectiveOutlook: h,
                    droughtMonitor: c,
                    earthquakes: p,
                    fires: m,
                    fireOutlook: y,
                    lightningStrikes: b,
                    records: _,
                    rivers: w,
                    stormcells: k,
                    stormreports: T,
                    text: L
                }
            },
            ry37: function (t, e, s) {
                "use strict";
                var i = s("dB9R"),
                a = s("3j3Q"),
                r = s("0lfv");
                class o extends i.a {
                    get showWhenLoading() {
                        return this.opts.showWhenLoading
                    }
                    set showWhenLoading(t) {
                        this.opts.showWhenLoading = t
                    }
                    constructor(t) {
                        let e = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : void 0;
                        e = Object(r.extend)({}, {
                            refresh: 0,
                            showWhenStopped: !0,
                            showWhenLoading: !0
                        }, e),
                        super(e),
                        this.element = t ? Object(a.a)(t) : void 0,
                        this._images = {},
                        this._targets = {},
                        this._idPrefix = "awxb-map-layer-",
                        this._isReset = !1,
                        this._loading = !1,
                        this._visible = !0,
                        this._hasLoaded = !1,
                        Object(r.isEmpty)(e.key) || (this._idPrefix += "".concat(e.key, "-")),
                        this.element && this.element.addClass("amp-map"),
                        this._startup()
                    }
                    dataByTime() {
                        return this._images
                    }
                    dataItems() {
                        return Object.keys(this.dataByTime()).map((t => this._images[t]))
                    }
                    play() {
                        this.isAnimating() || this.canAnimate() && (!this._hasImages() || this._totalImages() < this.totalIntervals ? this._load() : super.play())
                    }
                    stop() {
                        super.stop(),
                        this._loading && this.reset()
                    }
                    reset() {
                        let t = arguments.length > 0 && void 0 !== arguments[0] && arguments[0];
                        this._isReset = !0,
                        this._loading = !1,
                        this._hasLoaded = !1,
                        this._reloadTimer && window.clearTimeout(this._reloadTimer),
                        this._loaders && Object.keys(this._loaders).forEach((t => {
                                this._loaders[t].onload = void 0
                            })),
                        this._images = {},
                        this._loaders = {},
                        this.element && this.element.empty(),
                        super.reset(t)
                    }
                    isReady() {
                        const t = this.totalIntervals,
                        e = this._totalImages();
                        return !this.isLoading() && (this._hasImages() && e === t || 0 === t)
                    }
                    canAnimate() {
                        let t = super.canAnimate();
                        return (t && this._hasLoaded && !this._hasImages() || t && !this.isFuture() && !this.containsPast() || this.isFuture() && !this.containsFuture()) && (t = !1),
                        t
                    }
                    isLoading() {
                        return this._loading
                    }
                    show() {
                        this._visible = !0,
                        this.element ? this.element.show() : this._currentImage && Object(a.a)(this._currentImage).show(),
                        this.trigger("show")
                    }
                    hide() {
                        this._visible = !1,
                        this.element ? this.element.hide() : this._currentImage && Object(a.a)(this._currentImage).hide(),
                        this.trigger("hide")
                    }
                    isVisible() {
                        if (this.element) {
                            let t = this.element;
                            return Object(r.isDOM)(this.element) && this.element.length > 0 && (t = this.element[0]),
                            "none" !== t.style.display
                        }
                        return !this._currentImage || "none" !== this._currentImage.style.display
                    }
                    setOpacity(t) {
                        this.dataItems().forEach((e => {
                                Object(r.has)(e, "setOpacity") && e.setOpacity(t)
                            }))
                    }
                    _target(t) {
                        return this._targets[t]
                    }
                    _setImageVisible(t) {
                        t ? Object(a.a)(this._currentImage).show() : Object(a.a)(this._currentImage).hide()
                    }
                    _updateForTime(t) {
                        if (this.canShow(this.currentTime) ? this.show() : this.hide(), !1 === this._visible)
                            return;
                        const e = this._imageClosestToTime(t);
                        e ? e !== this._currentImage && (Object(a.a)(e).show(), this._setImageVisible(!1), this._currentImage = e) : this.isAnimating() || !0 !== this.opt("showWhenStopped") || (t = this._intervalClosestToTime(t), this.canShow(t) && (this._isReset = !1, this._loadInterval(t, !0, null)))
                    }
                    _imageClosestToTime(t) {
                        let e = null,
                        s = this.from,
                        i = Math.abs(t - s);
                        return this._images ? (Object.keys(this._images).forEach((e => {
                                    const a = Math.abs(t - +e);
                                    a < i && (i = a, s = +e)
                                })), s !== this._lastImageTime && this._images[s] && (e = this._images[s], s = Math.round(s), this._lastImageTime = s, this.trigger("advance:image", {
                                    time: s,
                                    img: e
                                })), e) : null
                    }
                    _hasImages() {
                        return this._totalImages() > 0
                    }
                    _totalImages() {
                        return Object(r.isUndefined)(this._images) ? 0 : Object.keys(this._images).filter((t => Object(r.isset)(this._images[t]))).length
                    }
                    _load() {
                        this._isReset = !1,
                        this._loading = !0;
                        const t = this.neededIntervals() || [];
                        Object.keys(this._images).forEach((e => {
                                const s = parseInt(e, 10),
                                i = t.indexOf(s);
                                -1 !== i && t.splice(i, 1)
                            }));
                        const e = () => {
                            this._loading = !1,
                            this._hasLoaded = !0,
                            this.trigger("load:done"),
                            this.trigger("ready"),
                            this.timeline || this.play()
                        };
                        if (0 === t.length)
                            return void e();
                        if (this.element && !0 === this.opts.autosize && this.provider) {
                            const t = this.provider.animationSizeForImage(this);
                            this.element.css({
                                width: "".concat(t.width, "px"),
                                height: "".concat(t.height, "px")
                            })
                        }
                        this.trigger("load:start", {
                            times: t
                        });
                        let s = 0;
                        const i = () => {
                            this._loadInterval(t[s], !0, (() => {
                                    s += 1,
                                    this._isReset || (s >= t.length ? (e(), this.opts.refresh > 0 && (this._reloadTimer && window.clearTimeout(this._reloadTimer), this._reloadTimer = setTimeout((() => {
                                                            this.reset(),
                                                            this._load()
                                                        }), 1e3 * this.opts.refresh))) : i())
                                }))
                        };
                        i()
                    }
                    _loadInterval(t, e, s) {
                        t = Math.round(t);
                        const i = document.getElementById("".concat(this._idPrefix).concat(t));
                        if (i) {
                            const t = Object(a.a)(i);
                            return t.show(),
                            this._setImageVisible(!1),
                            this._currentImage = t,
                            this._setImageVisible(!0),
                            void(s && s())
                        }
                        if (this._images || (this._images = {}), this._loaders || (this._loaders = {}), this._images[t])
                            return void(s && s());
                        if (this._loaders[t])
                            return;
                        const r = new Date(t);
                        let o;
                        this.provider && (o = this.provider.animationUrlForDate(this, r));
                        const n = t => {
                            this._images[t] = new Image,
                            this.trigger("load:error", {
                                date: r,
                                interval: Object.keys(this._images).length - 1
                            }),
                            s && s()
                        };
                        if (!o)
                            return void n(t);
                        const h = new Image;
                        this._loaders[t] = h,
                        h.onload = () => {
                            if (this._isReset)
                                return;
                            this._loaders[t] && delete this._loaders[t];
                            const i = "".concat(this._idPrefix).concat(t);
                            let r = {
                                width: h.width,
                                height: h.height
                            };
                            this.provider && (r = this.provider.animationSizeForImage(this));
                            const o = '<img id="'.concat(i, '" src="').concat(h.src, '" width="').concat(r.width, '" height="').concat(r.height, '" style="position:absolute;">');
                            this.element && this.element.append(o),
                            e && (this._images[t] = this._hasDOMTarget() ? Object(a.a)("#".concat(i)) : h),
                            this._setImageVisible(!1),
                            this._currentImage = this._hasDOMTarget() ? Object(a.a)("#".concat(i)) : h,
                            s && s();
                            const n = Object.keys(this._images).length;
                            this.trigger("load:image", {
                                date: new Date(t),
                                src: h.src,
                                img: h
                            }),
                            this.trigger("load:progress", {
                                time: t,
                                interval: n - 1,
                                loaded: n,
                                total: this.totalIntervals
                            })
                        },
                        h.onerror = () => {
                            n(t)
                        },
                        h.src = o
                    }
                    _hasDOMTarget() {
                        return this.element && this.element.length > 0
                    }
                }
                e.a = o
            },
            uts4: function (t, e, s) {
                "use strict";
                s("UxlC");
                var i = s("m0x2"),
                a = s("ry37"),
                r = s("hWIy");
                var o = class {
                    constructor(t, e) {
                        this.source = t;
                        const s = "image" === e.type ? new a.a(null, e) : new r.a(e);
                        s.provider = this,
                        s.on("stop reset", (e => {
                                s.hide(),
                                t.updateVisibility()
                            })),
                        "tile" === e.type && (s.on("load:progress", (e => {
                                    s.showWhenLoading && t.hide()
                                })).on("play", (e => {
                                    t.hide()
                                })), s.on("advance:image", (() => {}))),
                        this.animation = s,
                        t.on("overlay:ready", (() => {
                                (s instanceof a.a || s instanceof r.a) && (s.provider = this)
                            }))
                    }
                    animationLayerForDate(t, e) {
                        let s = !(arguments.length > 2 && void 0 !== arguments[2]) || arguments[2];
                        return this.source.animationLayerForDate(t, e, s)
                    }
                },
                n = s("0lfv");
                class h extends i.a {
                    constructor(t, e, s) {
                        var i;
                        super(),
                        this.isAnimationFrame = !1,
                        this._hidden = !1,
                        this.key = t,
                        this.enabled = !0,
                        (s = Object(n.extend)({
                                id: void 0,
                                type: "tile",
                                subdomains: ["1", "2", "3", "4"],
                                time: 0,
                                offset: void 0,
                                opacity: 1,
                                future: !1,
                                alwaysShow: !1,
                                animation: {
                                    enabled: !0,
                                    type: "tile"
                                }
                            }, s)).time && !Object(n.isDate)(s.time) && Object(n.isNumber)(s.time) && (s.time = new Date((new Date).getTime() + s.time)),
                        Object(n.isset)(s.offset) && (s.animation.enabled = !1),
                        Object(n.isset)(e) && e.offset(0),
                        this.key = t,
                        this._service = e,
                        this._opts = s;
                        const a = s.style || {};
                        this._opacity = a.opacity || 1;
                        if (!0 === (null === (i = s.animation) || void 0 === i ? void 0 : i.enabled)) {
                            const e = Object(n.extend)({
                                key: t,
                                type: "tile",
                                enabled: !0,
                                future: !1,
                                alwaysShow: !1,
                                showWhenStopped: !1
                            }, Object(n.pick)(s, ["future", "alwaysShow"]), s.animation);
                            this._animator = new o(this, e)
                        }
                        this.on("overlay:ready", (() => {
                                this.timestamp = this._opts.time
                            })),
                        this._overlay = this.createOverlay(e, s),
                        this.trigger("overlay:ready")
                    }
                    get identifier() {
                        return this._opts.id || this.key
                    }
                    set identifier(t) {
                        this._opts.id = t
                    }
                    get url() {
                        return this.service.url()
                    }
                    get overlay() {
                        return this._overlay
                    }
                    get timestamp() {
                        return this._timestamp
                    }
                    set timestamp(t) {
                        this._timestamp = t
                    }
                    get service() {
                        return this._service
                    }
                    get animation() {
                        var t;
                        return null === (t = this._animator) || void 0 === t ? void 0 : t.animation
                    }
                    urlTemplate() {
                        if (Object(n.isset)(this._opts.offset))
                            this.service.offset("".concat(this._opts.offset).replace(/\s/g, ""));
                        else {
                            let t = new Date(this._timestamp);
                            t = new Date(t.getTime() + 60 * t.getTimezoneOffset() * 1e3),
                            this.service.offset(Object(n.formatDate)(t, "yyyyMMddHHmm00"))
                        }
                        return this.service.url()
                    }
                    isFuture() {
                        return this._opts.future
                    }
                    updateVisibility() {
                        this.canShow() ? this.show() : this.hide()
                    }
                    canShow() {
                        const t = (new Date).getTime(),
                        e = this._timestamp.getTime();
                        return !!this._opts.alwaysShow || (this.isFuture() && e > t || !this.isFuture() && e <= t)
                    }
                    isAnimationActive() {
                        return this.animation && (this.animation.canAnimate() || this.animation.isAnimating())
                    }
                    isAnimating() {
                        return this.animation && this.animation.isAnimating()
                    }
                    show() {
                        throw new Error("Implementation must override abstract `show`")
                    }
                    hide() {
                        throw new Error("Implementation must override abstract `hide`")
                    }
                    remove() {
                        throw new Error("Implementation must override abstract `remove`")
                    }
                    isVisible() {
                        return !1 === this._hidden
                    }
                    setOpacity(t) {
                        throw new Error("Implementation must override abstract `setOpacity:`")
                    }
                    setOrder(t) {
                        throw new Error("Implementation must override abstract `setOrder:`")
                    }
                    destroy() {
                        this._overlay = null,
                        this._service = null
                    }
                    createOverlay(t) {
                        return null
                    }
                    animationLayerForDate(t, e) {
                        return null
                    }
                }
                e.a = h
            }
        }
    ]);
