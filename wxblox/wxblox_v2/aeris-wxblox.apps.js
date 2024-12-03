/*!
 * 
 * 	aeris-weatherblox - 2.2.6
 * 	(c) 2023 AerisWeather
 * 	License: ISC
 * 	https://www.aerisweather.com/support/docs/toolkits/aeris-weatherblox/
 * 
 */
(this.wpAerisWxbloxJsonp = this.wpAerisWxbloxJsonp || []).push([[1], {
            "+fMx": function (t, e, s) {
                "use strict";
                Object.defineProperty(e, "__esModule", {
                    value: !0
                }),
                e.default = void 0;
                var i = o(s("TtNf")),
                a = o(s("D5/V")),
                r = s("eLVM"),
                n = s("jNhv");
                function o(t) {
                    return t && t.__esModule ? t : {
                    default:
                        t
                    }
                }
                const l = (t, e, s, i) => {
                    const a = {
                        lat: t,
                        lon: e
                    },
                    n = r.Mercator.pointToCoord(0, 0, s, a, i),
                    o = r.Mercator.pointToCoord(i.width, i.height, s, a, i);
                    return n.lat = parseFloat(n.lat.toFixed(2)),
                    n.lon = parseFloat(n.lon.toFixed(2)),
                    o.lat = parseFloat(o.lat.toFixed(2)),
                    o.lon = parseFloat(o.lon.toFixed(2)),
`${n.lat},${n.lon},${o.lat},${o.lon}`
                };
                class h extends i.default {
                    update(t, e = !1) {
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
                        } else (0, n.isset)(this.opts.keys) && super.update(t, e)
                    }
                    _update() {
                        this.account ? (this._request || (this._request = (0, n.debounce)(t => {
                                    this._getVtecCodes(t).then(t => {
                                        if (this.opts.keys = t.join(","), 0 === t.length) {
                                            const t = this.opts.title ? this.opts.title.replace(/\([^\)]+\)$/, "") : null;
                                            this.$el.html(`\n\t\t\t\t\t\t\t${t ? `<div class="awxjs__legend-title">${t}</div>` : ""}\n\t\t\t\t\t\t\t<div class="awxjs__legend-content">\n\t\t\t\t\t\t\t\t<div class="awxjs__legend-empty">No advisories within map bounds.</div>\n\t\t\t\t\t\t\t</div>\n\t\t\t\t\t\t`),
                                            this.resize()
                                        } else
                                            this.show(), this.update(null, !0)
                                    })
                                }, 1e3)), this._request(this.opts.within)) : console.warn("[Aeris] Cannot render advisories/alerts legend, no valid Aeris account defined")
                    }
                    _getVtecCodes(t = {}) {
                        const {
                            size: e
                        } = t;
                        let {
                            center: s,
                            bounds: i,
                            zoom: a
                        } = t;
                        return a = parseInt(a, 10),
                        new Promise((t, r) => {
                            if (!i) {
                                if (!e || Number.isNaN(e.width) || Number.isNaN(e.height))
                                    return void r(new Error("Size is not a number"));
                                !i && s && ((0, n.isString)(s) && /^[\d\.-]+,[\d\.-]+/.test(s) ? (s = s.split(","), i = l(s[0], s[1], a, e)) : (0, n.isObject)(s) && s.lat && s.lon && (i = l(s.lat, s.lon, a, e)))
                            }
                            i ? this._getAdvisories(i).then(e => {
                                t(e)
                            }) : s && this._getPlace(s, e, a).then(e => {
                                this._getAdvisories(e).then(e => {
                                    t(e)
                                })
                            })
                        })
                    }
                    _getPlace(t, e, s) {
                        return new Promise((i, r) => {
                            new a.default({
                                client: this.account.credentials()
                            }).endpoint("places").place(t).limit(1).get().then(t => {
                                if (t.data) {
                                    const {
                                        loc: {
                                            lat: a,
                                            long: n
                                        }
                                    } = t.data,
                                    o = l(a, n, s, e).split(",").map(t => parseFloat(t));
                                    4 === o.length ? i({
                                        north: o[0],
                                        west: o[1],
                                        south: o[2],
                                        east: o[3]
                                    }) : r()
                                }
                            })
                        })
                    }
                    _getAdvisories(t) {
                        return new Promise((e, s) => {
                            const i = this.account.canAccess("advisories_summary"),
                            r = (t, e) => {
                                const s = new a.default({
                                    client: this.account.credentials()
                                });
                                return e ? s.endpoint("alerts/summary").fields("summary.typeCodes,summary.types.type,summary.types.code") : s.endpoint("alerts").fields("details.type,details.name").limit(300),
                                (t.west < -180 || t.west > 180) && (t.west += 360 * Math.floor(t.west / 360)),
                                s.action("within").bounds(t),
                                s
                            },
                            o = t => {
                                const e = [];
                                if (t)
                                    if (i) {
                                        t = t[0] || t;
                                        ((0, n.get)(t, "summary.types") || []).filter(t => (0, n.isset)(t) && (0, n.isset)(t.code)).forEach(t => {
                                            const {
                                                code: s,
                                                type: i
                                            } = t,
                                            a = e.some(t => t.code === s);
                                            s && !1 === a && e.push({
                                                code: s,
                                                name: i.toUpperCase()
                                            })
                                        })
                                    } else
                                        t.filter(t => (0, n.isset)(t) && (0, n.isset)(t.type)).forEach(t => {
                                            const {
                                                type: s,
                                                name: i
                                            } = t.details,
                                            a = e.some(t => t.code === s);
                                            s && !1 === a && e.push({
                                                code: s,
                                                name: i.toUpperCase()
                                            })
                                        });
                                return e.sort((t, e) => t.name < e.name ? -1 : t.name > e.name ? 1 : 0).reduce((t, e) => (t.push(e.code), t), [])
                            }, {
                                west: l,
                                east: h
                            } = t,
                            d = l > h ? Math.abs(180 - l + (180 - Math.abs(h))) : Math.abs(h - l);
                            if (d > 180 || l > h) {
                                const s = l > h,
                                u = l + d / 2,
                                c = new a.default({
                                    client: this.account.credentials()
                                }),
                                p = r((0, n.extend)({}, t, {
                                            east: s ? 180 : u
                                        }), i),
                                f = r((0, n.extend)({}, t, {
                                            west: s ? -180 : u
                                        }), i);
                                c.addRequest(p),
                                c.addRequest(f),
                                c.get().then(t => {
                                    const s = (0, n.get)(t, "data.responses");
                                    let a = i ? {
                                        summary: {
                                            types: [],
                                            typeCodes: []
                                        }
                                    }
                                     : [];
                                    s && s.forEach(t => {
                                        if (t = t.response || t)
                                            if (i) {
                                                const e = t[0] || t, {
                                                    types: s,
                                                    typeCodes: i
                                                } = e.summary || {};
                                                a.summary.types = a.summary.types.concat(s),
                                                a.summary.typeCodes = a.summary.typeCodes.concat(i)
                                            } else (0, n.isEmpty)(t) || (a = a.concat(t))
                                    });
                                    const r = o(a || {});
                                    e(r)
                                })
                            } else {
                                r(t, i).get().then(t => {
                                    const s = o(t.data || {});
                                    e(s)
                                })
                            }
                        })
                    }
                }
                var d = h;
                e.default = d,
                t.exports = e.default
            },
            "+l/j": function (t, e, s) {
                "use strict";
                Object.defineProperty(e, "__esModule", {
                    value: !0
                }),
                e.markerIconFromStyle = e.formatLayerOptions = void 0;
                var i = s("GK1F"),
                a = s("jNhv");
                e.formatLayerOptions = t => {
                    const e = {};
                    return t.stroke ? (e.strokeColor = t.stroke.color, e.strokeOpacity = t.stroke.opacity, e.strokeWeight = t.stroke.width) : e.strokeOpacity = 0,
                    t.fill ? (e.fillColor = t.fill.color, e.fillOpacity = t.fill.opacity) : e.fillOpacity = 0,
                    (0, a.isset)(t.fillOpacity) || (t.fillOpacity = 1),
                    (0, a.isset)(t.strokeOpacity) || (t.strokeOpacity = 1),
                    e
                };
                e.markerIconFromStyle = t => {
                    if (t.html && console.warn("awxjs - HTML markers are not currently supported with Google Maps"), t.svg) {
                        let [e, s] = t.size || [12, 12];
                        if (t.svg.text) {
                            const r = t.svg.text;
                            if ((0, a.isArray)(r))
                                r.forEach(t => {
                                    t.autosize && ([e, s] = i.SVG.calculateTextSize(t.value, t.size))
                                });
                            else {
                                const t = r;
                                t.autosize && ([e, s] = i.SVG.calculateTextSize(t.value, t.size))
                            }
                        }
                        s += 3;
                        const r = i.SVG.draw(e, s, t.svg);
                        return {
                            url: "data:image/svg+xml;base64," + btoa(r),
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
                }
            },
            "/BY0": function (t, e, s) {
                "use strict";
                Object.defineProperty(e, "__esModule", {
                    value: !0
                }),
                e.default = void 0;
                var i = o(s("26Hj")),
                a = o(s("W11p")),
                r = s("jNhv"),
                n = s("T1DL");
                function o(t) {
                    return t && t.__esModule ? t : {
                    default:
                        t
                    }
                }
                class l extends i.default {
                    get overlay() {
                        return this._overlay
                    }
                    set timestamp(t) {
                        if (this.enabled && (0, r.isset)(t) && (t = new Date(t.getFullYear(), t.getMonth(), t.getDate(), t.getHours(), t.getMinutes()), (!this._timestamp || t.getTime() !== this._timestamp.getTime()) && (this._timestamp = t, !1 === this.isAnimating() && !1 === this.isAnimationFrame && (this.animation.hide(), this.updateVisibility()), this.overlay && !1 === this.overlay.isHidden && this.canShow()))) {
                            let t = this.urlTemplate();
                            if (t) {
                                const e = this.service.range(),
                                s = e.filter((t, s) => 0 === s || s === e.length - 1).join("-");
                                t = t.replace(/\{s\}/, `{${s}}`)
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
                    setOpacity(t, e = !0) {
                        this._opacity = t,
                        this._hidden && (t = 0),
                        this.overlay && !0 === e && this.overlay.setOpacity(t),
                        this.animation && this.animation.setOpacity(t)
                    }
                    setOrder(t) {
                        this.overlay && this.overlay.setZIndex(t)
                    }
                    createOverlay(t, e = {}) {
                        return new a.default(this.key, {
                            type: "tile",
                            attribution: e.attribution
                        }, this.identifier)
                    }
                    animationLayerForDate(t, e, s = !0) {
                        return new Promise((t, i) => {
                            if (this.dataSource) {
                                const i = this.dataSource.tileLayer(this.key, e, (0, r.extend)((0, r.cloneDeep)(this._opts), {
                                            id: `${this.identifier}-anim-${(0, n.mapTimestampFromDate)(e)}`,
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
                                i.overlay.on("load", () => {
                                    s && t(i),
                                    i.setOpacity(this._opacity, !0)
                                }),
                                i.on("layer:remove", () => {
                                    this.trigger("layer:remove", {
                                        layer: i.overlay
                                    })
                                }),
                                this.trigger("layer:add", {
                                    layer: i.overlay,
                                    relativeTo: this.overlay.renderable,
                                    offset: 1
                                })
                            } else
                                i(new Error("No map strategy data source provided"))
                        })
                    }
                }
                var h = l;
                e.default = h,
                t.exports = e.default
            },
            "/NXb": function (t, e, s) {
                "use strict";
                Object.defineProperty(e, "__esModule", {
                    value: !0
                }),
                e.default = void 0;
                var i = l(s("GpM6")),
                a = l(s("bBV4")),
                r = l(s("BhJo")),
                n = s("jNhv"),
                o = l(s("b9Bd"));
                function l(t) {
                    return t && t.__esModule ? t : {
                    default:
                        t
                    }
                }
                class h extends i.default {
                    constructor(t) {
                        super((0, n.extend)({
                                filter: !1,
                                multiselect: !1,
                                groupMultiselect: !0,
                                reloadOnChange: !0,
                                ui: {
                                    all: ".awxjs__ui-btn-segmented__option-all",
                                    segments: ".awxjs__ui-btn-segments",
                                    groups: ".awxjs__ui-btn-segmented__groups"
                                }
                            }, t, {
                                className: t.className ? "ui-btn-segmented " + t.className : "ui-btn-segmented"
                            })),
                        this._segments = [],
                        this._groups = [],
                        this._groupsById = {},
                        this._value = null,
                        this._expanded = !1,
                        this._handleValueChange = (0, n.debounce)((t = {}, e = !0) => {
                            const s = (0, n.isEmpty)(this._value) ? [] : (0, n.cloneDeep)(this._value);
                            let i;
                            const a = this.value;
                            (0, n.isPlainObject)(s) ? i = this.segments().filter(t => {
                                let e = !1;
                                return Object.keys(s).forEach(i => {
                                    t.value === s[i] && t.groupId === i && (e = !0)
                                }),
                                e
                            }).map(t => t.info) : (0, n.isArray)(s) && (i = this.segments().filter(t => -1 !== s.indexOf(t.value)).map(t => t.info)),
                            this._value = (0, n.cloneDeep)(a),
                            e && this.trigger("value:change", {
                                value: a,
                                previous: s,
                                previousSegments: i,
                                reload: this.opts.reloadOnChange
                            })
                        }, 200),
                        this._triggerTimeout = null
                    }
                    get value() {
                        const t = this.selectedSegments();
                        return this._groups.length > 0 ? this.opts.groupMultiselect ? this._groups.reduce((t, e) => (t[e.id] = e.value, t), {}) : this._groups.map(t => t.value).filter(t => !(0, n.isEmpty)(t)) : t.map(t => t.value)
                    }
                    set value(t) {
                        const e = (0, n.isArray)(t) ? t : [t],
                        s = this.selectedSegments();
                        t instanceof Array ? (e.forEach(t => {
                                this.selectSegment(t)
                            }), s.forEach(t => {
                                -1 === e.indexOf(t.value) && -1 === e.indexOf(t.key) && this.deselectSegment(t.key)
                            })) : this._groups.length > 0 && this._groups.forEach(t => {})
                    }
                    get info() {
                        return Object.assign(Object.assign({}, super.info), {
                            valueSegments: this.segmentInfo(!0),
                            filter: this.opts.filter,
                            reload: this.opts.filter && this.opts.reloadOnChange
                        })
                    }
                    get isExpanded() {
                        return this._expanded
                    }
                    get isFilter() {
                        return this.opts.filter
                    }
                    size() {
                        const t = super.size();
                        if (this.selected) {
                            const e = this.ui.groups || this.ui.segments,
                            s = e.css("max-height");
                            e.css("max-height", "auto");
                            let i = parseFloat(s.replace(/[^0-9\.]/, ""));
                            i += this.el(".awxjs__ui-btn-label").outerHeight(!0),
                            e.css("max-height", s);
                            const a = this.$el.padding();
                            i += a.top + a.bottom;
                            const r = this.$el.margins();
                            i += r.top + r.bottom,
                            t.height = i
                        }
                        return t
                    }
                    segments() {
                        return this._groups.length > 0 ? this._groups.reduce((t, e) => t = t.concat(e.segments), []) : this._segments
                    }
                    segmentValues() {
                        return this.segments().map(t => t.value)
                    }
                    segmentIds(t = !0) {
                        return this.segments().map(e => t ? e.key : e.id)
                    }
                    segmentInfo(t = !1) {
                        return (t ? this.selectedSegments() : this.segments()).map(t => t.info)
                    }
                    segmentGroups() {
                        return this._groups
                    }
                    containsValue(t) {
                        return this.segmentValues().indexOf(t) > -1 || this.segmentIds().indexOf(t) > -1
                    }
                    containsId(t) {
                        return this.segmentIds(!0).indexOf(t) > -1
                    }
                    selectSegment(t, e = !0) {
                        this.setSegmentSelected(t, !0, e)
                    }
                    deselectSegment(t) {
                        this.setSegmentSelected(t, !1)
                    }
                    setSegmentSelected(t, e, s = !1) {
                        let i = !1;
                        const a = this.segments();
                        return a && a.length > 0 && a.forEach(s => {
                            (0, n.isString)(t) ? s.id === t || s.key === t ? (e ? s.select() : s.deselect(), i = !0) : this.id === t && (i = !0) : (0, n.isPlainObject)(t) && Object.keys(t).forEach(a => {
                                const r = this._groupsById[a];
                                r && r.segments.forEach(a => {
                                    a.id !== t && a.key !== t || (e ? s.select() : s.deselect(), i = !0)
                                })
                            })
                        }),
                        i && e && s && ((0, n.isEmpty)(this._value) && (this._value = this.value), this.select()),
                        i
                    }
                    selectedSegments() {
                        return this.segments().filter(t => t.selected)
                    }
                    _onSelect(t = !0) {
                        this.isExpanded || this._showSegments(!0),
                        super._onSelect(t)
                    }
                    _onDeselect(t = !0) {
                        this.isExpanded && this._showSegments(!1),
                        super._onDeselect(t)
                    }
                    _render(t) {
                        let e = "";
                        const s = (0, n.get)(this.opts, "segments");
                        return s && ((0, n.isArray)(s) ? (this._renderSegments(s), e += '<div class="awxjs__ui-btn-segments"><ul></ul></div>') : s.groups && (this._renderGroups(s.groups), e += '<div class="awxjs__ui-btn-segmented__groups"></div>')),
`\n\t\t\t<div class="awxjs__ui-btn-segmented">\n\t\t\t\t<div class="awxjs__ui-btn-target">\n\t\t\t\t\t<div class="awxjs__ui-btn-label">${this.opts.title}</div>\n\t\t\t\t</div>\n\t\t\t\t${e}\n\t\t\t</div>\n\t\t`
                    }
                    _renderSegments(t) {
                        this._segments = (t || []).map(t => {
                            const e = (0, n.cloneDeep)(t);
                            return e.id = e.id || e.value.replace(/\:.+$/, "").replace(/,/, "--").replace(/;/, "__"),
                            e.options = (0, n.extend)({}, this.options, e.options),
                            new a.default(Object.assign(Object.assign({
                                        multiselect: this.opts.multiselect
                                    }, e), {
                                    loader: !1,
                                    toggleable: !0 === this.opts.multiselect,
                                    parent: this.id
                                }))
                        })
                    }
                    _renderGroups(t) {
                        (0, n.isset)(this._groupsById) || (this._groupsById = {}),
                        this._groups = (t || []).map((t, e) => {
                            const s = (0, n.cloneDeep)(t);
                            s.id = s.id || `${this.id}-${e}`,
                            s.options = (0, n.extend)({}, this.options, s.options);
                            const i = new r.default(Object.assign({
                                        filter: this.opts.filter,
                                        multiselect: this.opts.multiselect,
                                        requiresSelection: !0 === this.opts.groupMultiselect,
                                        reloadOnChange: this.opts.reloadOnChange,
                                        parentId: this.id
                                    }, s));
                            return this._groupsById[s.id] = i,
                            i
                        })
                    }
                    _onAddedToDOM() {
                        if (super._onAddedToDOM(), this._groups && this.ui.groups)
                            this._groups.forEach(t => {
                                t.addTo(this.ui.groups),
                                t.on("change", t => {
                                    const {
                                        id: e,
                                        value: s,
                                        reload: i
                                    } = t.data || {};
                                    !1 === this.opts.groupMultiselect && (0, n.isset)(s) && this._groups.forEach(t => {
                                        t.id !== e && t.clear(!1)
                                    }),
                                    this._handleValueChange({
                                        reload: i
                                    })
                                })
                            });
                        else if (this._segments && this.ui.segments) {
                            const t = (0, o.default)("ul", this.ui.segments);
                            this._segments.forEach(e => {
                                e.addTo(t),
                                e.on("select", t => {
                                    this._handleSelectSegment(e, this.selected)
                                }).on("deselect", t => {
                                    this._handleDeselectSegment(e, this.selected)
                                })
                            })
                        }
                        this._value = this.value
                    }
                    _setupEvents() {
                        super._setupEvents(),
                        this.ui.groups && this.ui.groups.on("click", t => {
                            t.stopPropagation()
                        })
                    }
                    _handleSelectSegment(t, e = !0) {
                        !1 === (this.opts.multiselect && "all" !== t.value && !1 !== t.multiselect) ? this.selectedSegments().forEach(e => {
                            e.value !== t.value && e.deselect()
                        }) : this.selectedSegments().forEach(t => {
                            !1 === t.multiselect && t.deselect()
                        }),
                        this._handleValueChange({
                            reload: this.opts.filter && this.opts.reloadOnChange
                        }, e)
                    }
                    _handleDeselectSegment(t, e = !0) {
                        if (this.state.selected) {
                            if (0 === this.selectedSegments().length && this.opts.multiselect) {
                                let t;
                                this.segments().forEach(e => {
                                    t || "all" !== e.value && !1 !== e.multiselect || (e.select(), t = e)
                                })
                            }
                        }
                        this._handleValueChange({
                            reload: this.opts.filter && this.opts.reloadOnChange
                        }, e)
                    }
                    _showSegments(t) {
                        var e;
                        if (t)
                            if (this._value && this._value.length > 0)
                                this._handleValueChange();
                            else if (this._groups && this._groups.length > 0) {
                                let t = null;
                                this._groups.forEach(e => {
                                    e.segments.length > 0 && (!(0, n.isset)(t) || !0 === this.opts.groupMultiselect) && (e.segments[0].select(), t = e.segments[0])
                                })
                            } else {
                                null === (e = this.segments()[0]) || void 0 === e || e.select()
                            }
                        let s = 0,
                        i = this.ui.segments;
                        this.ui.groups && this.ui.groups.length > 0 ? (i = this.ui.groups, s = this.ui.groups.children().reduce((t, e) => t += (0, o.default)(e).outerHeight(!0), 0)) : s = (0, o.default)("ul", this.ui.segments).height(),
                        i.css({
                            "max-height": (t ? s : 0) + "px"
                        }),
                        this._triggerTimeout && clearTimeout(this._triggerTimeout),
                        this._expanded = t,
                        this._triggerTimeout = setTimeout(() => {
                            const e = t ? "expanded" : "collapsed";
                            this.trigger(e)
                        }, t ? 0 : 600)
                    }
                }
                var d = h;
                e.default = d,
                t.exports = e.default
            },
            "/zIx": function (t, e, s) {
                "use strict";
                Object.defineProperty(e, "__esModule", {
                    value: !0
                }),
                e.default = void 0;
                var i = o(s("26Hj")),
                a = o(s("xctJ")),
                r = s("jNhv"),
                n = s("T1DL");
                function o(t) {
                    return t && t.__esModule ? t : {
                    default:
                        t
                    }
                }
                class l extends i.default {
                    constructor(t, e, s) {
                        super(t, e, s);
                        const i = this.animation,
                        n = new a.default(t, (0, r.extend)(s, {
                                    type: "image"
                                }), this.identifier + "-anim");
                        null == i || i.on("show", t => {
                            this.show()
                        }),
                        null == i || i.on("hide", t => {
                            this.hide()
                        }),
                        null == i || i.on("load:image advance:image", t => {
                            const e = t.data.img;
                            e && n.setImage(e.src)
                        }),
                        this._animationOverlay = n,
                        this.on("overlay:ready", () => {
                            const t = (0, r.get)(s, "style.opacity"),
                            e = (0, r.get)(s, "style.belowLayer");
                            s.id && (this._overlay.id = s.id, this._animationOverlay.id = s.id + "-anim"),
                            (0, r.isset)(t) && (this._overlay.setOpacity(t), this._animationOverlay.setOpacity(t)),
                            this._overlay.parentId = e,
                            this._animationOverlay.parentId = this._overlay.layerId
                        })
                    }
                    get overlay() {
                        return this._overlay
                    }
                    set timestamp(t) {
                        var e;
                        this.enabled && (0, r.isset)(t) && (t = new Date(t.getFullYear(), t.getMonth(), t.getDate(), t.getHours(), t.getMinutes()), this._timestamp && t.getTime() === this._timestamp.getTime() || (this._timestamp = t, !1 === this.isAnimating() && !1 === this.isAnimationFrame && (null === (e = this.animation) || void 0 === e || e.hide(), this.updateVisibility()), !this.overlay || !this.canShow() && this.overlay.exists() || this.overlay.setUrl(this.urlTemplate())))
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
                    setOpacity(t, e = !0) {
                        var s;
                        this._opacity = t,
                        this.overlay && this.overlay.setOpacity(t),
                        this._animationOverlay && this._animationOverlay.setOpacity(t),
                        null === (s = this.animation) || void 0 === s || s.setOpacity(t)
                    }
                    setOrder(t) {
                        this.overlay && this.overlay.setZIndex(t),
                        this._animationOverlay && this._animationOverlay.setZIndex(t)
                    }
                    createOverlay(t, e = {}) {
                        return new a.default(this.key, (0, r.extend)(e, {
                                type: "type"
                            }), this.identifier)
                    }
                    animationLayerForDate(t, e, s = !0) {
                        return new Promise((t, i) => {
                            if (this.dataSource) {
                                const i = this.dataSource.tileLayer(this.key, e, (0, r.extend)({}, this._opts, {
                                            id: `${this.identifier}-anim-${(0, n.mapTimestampFromDate)(e)}`,
                                            opacity: 0,
                                            data: {
                                                service: this.service
                                            },
                                            animation: {
                                                enabled: !1
                                            }
                                        }));
                                if (i.isAnimationFrame = !0, i.setOpacity(this._opacity, !1), i.hide(), s) {
                                    this.overlay.map.on("sourcedata", e => {
                                        const {
                                            sourceId: s,
                                            isSourceLoaded: a
                                        } = e || {};
                                        s === i.overlay.sourceId && a && t(i)
                                    })
                                } else
                                    t(i);
                                i.on("layer:remove", () => {
                                    this.trigger("layer:remove", {
                                        layer: i.overlay
                                    })
                                }),
                                this.trigger("layer:add", {
                                    layer: i.overlay
                                })
                            } else
                                i(new Error("No map strategy data source provided"))
                        })
                    }
                }
                var h = l;
                e.default = h,
                t.exports = e.default
            },
            "0d06": function (t, e, s) {
                "use strict";
                Object.defineProperty(e, "__esModule", {
                    value: !0
                }),
                e.default = void 0;
                var i = function (t) {
                    if (t && t.__esModule)
                        return t;
                    if (null === t || "object" != typeof t && "function" != typeof t)
                        return {
                        default:
                            t
                        };
                    var e = r();
                    if (e && e.has(t))
                        return e.get(t);
                    var s = {},
                    i = Object.defineProperty && Object.getOwnPropertyDescriptor;
                    for (var a in t)
                        if (Object.prototype.hasOwnProperty.call(t, a)) {
                            var n = i ? Object.getOwnPropertyDescriptor(t, a) : null;
                            n && (n.get || n.set) ? Object.defineProperty(s, a, n) : s[a] = t[a]
                        }
                    s.default = t,
                    e && e.set(t, s);
                    return s
                }
                (s("Li+i")),
                a = s("+l/j");
                function r() {
                    if ("function" != typeof WeakMap)
                        return null;
                    var t = new WeakMap;
                    return r = function () {
                        return t
                    },
                    t
                }
                var n = class {
                    tileLayer(t, e, s) {
                        return new i.TileSource(t, e, s)
                    }
                    marker(t, e, s) {
                        return s && s.skip && !0 === s.skip ? null : new i.Marker(e, null, {
                            style: s
                        })
                    }
                    polygon(t, e, s) {
                        let r;
                        return s && (r = (0, a.formatLayerOptions)(s)),
                        new i.Polygon(t, e, r)
                    }
                    polyline(t, e, s) {
                        let r;
                        return s && (r = (0, a.formatLayerOptions)(s)),
                        new i.Polyline(t, e, r)
                    }
                };
                e.default = n,
                t.exports = e.default
            },
            "0oAq": function (t, e, s) {
                "use strict";
                Object.defineProperty(e, "__esModule", {
                    value: !0
                }),
                e.default = void 0;
                var i,
                a = (i = s("8Zrd")) && i.__esModule ? i : {
                default:
                    i
                },
                r = s("jNhv");
                class n extends a.default {
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
                        setTimeout(() => {
                            this.enabled && this.addTo(t)
                        }, 200)
                    }
                    createRenderable() {
                        const t = new google.maps.ImageMapType({
                            name: this.id,
                            opacity: this.opacity,
                            tileSize: new google.maps.Size(256, 256),
                            getTileUrl: (t, e) => {
                                let s = this.opts.url;
                                if (!(0, r.isset)(s))
                                    return null;
                                const i = {
                                    x: t.x,
                                    y: t.y,
                                    z: e,
                                    s: Math.abs(t.x + t.y) % 4 + 1
                                };
                                return Object.keys(i).forEach(t => {
                                    s = s.replace(new RegExp(`{${t}}`), "" + i[t])
                                }),
                                s
                            }
                        });
                        return google.maps.event.addListenerOnce(t, "tilesloaded", () => {
                            this.trigger("load", {
                                overlay: t
                            })
                        }),
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
                }
                var o = n;
                e.default = o,
                t.exports = e.default
            },
            "26Hj": function (t, e, s) {
                "use strict";
                Object.defineProperty(e, "__esModule", {
                    value: !0
                }),
                e.default = void 0;
                var i = n(s("AIg7")),
                a = n(s("Vtag")),
                r = s("jNhv");
                function n(t) {
                    return t && t.__esModule ? t : {
                    default:
                        t
                    }
                }
                class o extends i.default {
                    constructor(t, e, s) {
                        var i;
                        super(),
                        this.isAnimationFrame = !1,
                        this._hidden = !1,
                        this.key = t,
                        this.enabled = !0,
                        (s = (0, r.extend)({
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
                            }, s)).time && !(0, r.isDate)(s.time) && (0, r.isNumber)(s.time) && (s.time = new Date((new Date).getTime() + s.time)),
                        (0, r.isset)(s.offset) && (s.animation.enabled = !1),
                        (0, r.isset)(e) && e.offset(0),
                        this.key = t,
                        this._service = e,
                        this._opts = s;
                        const n = s.style || {};
                        this._opacity = n.opacity || 1;
                        if (!0 === (null === (i = s.animation) || void 0 === i ? void 0 : i.enabled)) {
                            const e = (0, r.extend)({
                                key: t,
                                type: "tile",
                                enabled: !0,
                                future: !1,
                                alwaysShow: !1,
                                showWhenStopped: !1
                            }, (0, r.pick)(s, ["future", "alwaysShow"]), s.animation);
                            this._animator = new a.default(this, e)
                        }
                        this.on("overlay:ready", () => {
                            this.timestamp = this._opts.time
                        }),
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
                        if ((0, r.isset)(this._opts.offset))
                            this.service.offset(("" + this._opts.offset).replace(/\s/g, ""));
                        else {
                            let t = new Date(this._timestamp);
                            t = new Date(t.getTime() + 60 * t.getTimezoneOffset() * 1e3),
                            this.service.offset((0, r.formatDate)(t, "yyyyMMddHHmm00"))
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
                    setOpacity(t, e = !0) {
                        throw new Error("Implementation must override abstract `setOpacity:`")
                    }
                    setOrder(t) {
                        throw new Error("Implementation must override abstract `setOrder:`")
                    }
                    destroy() {
                        this._overlay = null,
                        this._service = null
                    }
                    createOverlay(t, e = {}) {
                        return null
                    }
                    animationLayerForDate(t, e, s = !0) {
                        return null
                    }
                }
                var l = o;
                e.default = l,
                t.exports = e.default
            },
            "2EEu": function (t, e, s) {
                "use strict";
                Object.defineProperty(e, "__esModule", {
                    value: !0
                }),
                e.default = void 0;
                var i = h(s("AIg7")),
                a = h(s("p0fd")),
                r = s("jNhv"),
                n = function (t) {
                    if (t && t.__esModule)
                        return t;
                    if (null === t || "object" != typeof t && "function" != typeof t)
                        return {
                        default:
                            t
                        };
                    var e = l();
                    if (e && e.has(t))
                        return e.get(t);
                    var s = {},
                    i = Object.defineProperty && Object.getOwnPropertyDescriptor;
                    for (var a in t)
                        if (Object.prototype.hasOwnProperty.call(t, a)) {
                            var r = i ? Object.getOwnPropertyDescriptor(t, a) : null;
                            r && (r.get || r.set) ? Object.defineProperty(s, a, r) : s[a] = t[a]
                        }
                    s.default = t,
                    e && e.set(t, s);
                    return s
                }
                (s("BJxM")),
                o = h(s("b9Bd"));
                function l() {
                    if ("function" != typeof WeakMap)
                        return null;
                    var t = new WeakMap;
                    return l = function () {
                        return t
                    },
                    t
                }
                function h(t) {
                    return t && t.__esModule ? t : {
                    default:
                        t
                    }
                }
                const d = t => {
                    const e = t ? t.document : null,
                    s = e ? e.defaultView || e.parentWindow : null;
                    return !!(t && "object" == typeof t && "object" == typeof t.window && t.window === t && t.setTimeout && t.alert && (0, r.isset)(e) && "object" == typeof e && (0, r.isset)(s) && "object" == typeof s && s === t)
                },
                u = (t, e) => {
                    const s = d(t),
                    i = s ? t.document : t.ownerDocument || t,
                    a = i.documentElement,
                    r = d(e) ? e : i.defaultView || window;
                    t === i && (t = a),
                    e = e && e !== i ? e : a;
                    const n = (r.pageYOffset || a.scrollTop) - a.clientTop,
                    o = (r.pageXOffset || a.scrollLeft) - a.clientLeft,
                    l = {
                        top: 0,
                        left: 0,
                        right: 0,
                        bottom: 0,
                        width: 0,
                        height: 0
                    };
                    if (s)
                        l.width = r.innerWidth || a.clientWidth, l.height = r.innerHeight || a.clientHeight, l.right = l.width, l.bottom = l.height;
                    else if (t === a)
                        l.top = -n, l.left = -o, l.width = Math.max(a.clientWidth, a.scrollWidth), l.height = Math.max(a.clientHeight, a.scrollHeight), l.right = l.width - o, l.bottom = l.height - n;
                    else {
                        if (!a.contains(t) || !t.getBoundingClientRect)
                            return null; {
                            const e = t.getBoundingClientRect();
                            Object.keys(l).forEach(t => {
                                l[t] = e[t]
                            }),
                            l.width = l.right - l.left,
                            l.height = l.bottom - l.top
                        }
                    }
                    if (e === r)
                        return l;
                    if (l.top += n, l.left += o, l.right += o, l.bottom += n, e === a)
                        return l;
                    const h = u(e);
                    return l.left -= h.left,
                    l.right -= h.left,
                    l.top -= h.top,
                    l.bottom -= h.top,
                    l
                };
                let c;
                class p extends i.default {
                    constructor(t, e) {
                        super(),
                        this._size = {
                            width: 0,
                            height: 0
                        },
                        this._observers = {
                            mutation: void 0,
                            key: new a.default
                        },
                        this._reposition = () => {
                            const t = window.requestAnimationFrame || window.webkitRequestAnimationFrame || (t => setTimeout(t, 17));
                            (() => {
                                t(() => {
                                    this.position()
                                })
                            })()
                        },
                        this._opts = (0, r.extend)({
                            place: "top",
                            effect: "slide",
                            spacing: 5,
                            showClose: !1
                        }, e),
                        this._hidden = !0,
                        this._element = (0, o.default)('<div class="awxjs__ui-tooltip"></div>');
                        const s = this._opts.showClose ? `\n\t\t\t<button class="awxjs__ui-btn-icon-sm awxjs__ui-tooltip-close">\n\t\t\t\t${n.close()}\n\t\t\t</button>\n\t\t` : "";
                        this.$el.html(`\n\t\t\t${s}\n\t\t\t<div class="awxjs__ui-tooltip-content"></div>\n\t\t`),
                        this._opts.className && this.$el.addClass(this._opts.className),
                        this._opts.effect && this.$el.addClass(this._opts.effect),
                        t && this.setContent(t),
                        this._observers.key.on("escape", () => {
                            this.hide()
                        }),
                        this._observers.mutation = new MutationObserver((t, e) => {
                            if (t && this._target.length > 0) {
                                const e = this._target[0];
                                t.forEach(t => {
                                    t.removedNodes && t.removedNodes.length > 0 && !1 === document.body.contains(e) && this.destroy()
                                })
                            }
                        })
                    }
                    get $el() {
                        return this._element
                    }
                    get $content() {
                        return (0, o.default)(".awxjs__ui-tooltip-content", this.$el)
                    }
                    get $close() {
                        return (0, o.default)(".awxjs__ui-tooltip-close", this.$el)
                    }
                    get $target() {
                        return this._target
                    }
                    get size() {
                        return this._size
                    }
                    get visible() {
                        return !1 === this._hidden
                    }
                    show(t = !0) {
                        return clearTimeout(this._hideTimeout),
                        c && t && (c.hide(), c = this),
                        this._target && this.position(this._target),
                        this._hidden && (this._hidden = !1, (0, o.default)("body").append(this.$el)),
                        this._observers.key.start(),
                        this.$close.on("click", this.hide.bind(this)),
                        (0, o.default)(window).on("scroll resize", this._reposition),
                        setTimeout(() => {
                            this.$el.addClass("in")
                        }, 100),
                        this
                    }
                    hide() {
                        if (this._hidden)
                            return this;
                        this._observers.key.stop(),
                        this.$close.off("click", this.hide.bind(this)),
                        this.$el.removeClass("in"),
                        (0, o.default)(window).off("scroll resize", this._reposition),
                        clearTimeout(this._hideTimeout);
                        const t = (t => {
                            const e = window.getComputedStyle(t),
                            s = String(e.getPropertyValue("transition-duration") || e.getPropertyValue("-webkit-transition-duration")).match(/([0-9.]+)([ms]{1,2})/);
                            let i = 0;
                            return s && (i = Number(s[1]), "s" === s[2] && (i *= 1e3)),
                            i || 0
                        })(this.$el[0]);
                        return this._hideTimeout = setTimeout(() => {
                            this.$el.remove()
                        }, t),
                        this._hidden = !0,
                        this
                    }
                    toggle() {
                        return this.visible ? this.hide() : this.show()
                    }
                    setContent(t) {
                        return (0, r.isString)(t) ? this.$content.html(t) : this.$content.empty().append(t),
                        this._updateSize(),
                        this
                    }
                    attachTo(t) {
                        return this._target = t,
                        t && (this._observers.mutation.disconnect(), this._observers.mutation.observe(document, {
                                childList: !0,
                                subtree: !0
                            })),
                        this._hidden || this.position(),
                        this
                    }
                    detach() {
                        return this.hide(),
                        this._target = null,
                        this._observers.mutation.disconnect(),
                        this
                    }
                    destroy() {
                        this.detach(),
                        this.$el.remove()
                    }
                    position(t, e) {
                        t = this._target || t,
                        !(0, r.isset)(t) && this._p ? (t = this._p[0], e = this._p[1]) : (this._p = [], t && this._p.push(t), e && this._p.push(e)),
                        t = t[0] || t;
                        const s = (0, r.isNumber)(t) ? {
                            left: t || 0,
                            right: t || 0,
                            top: e || 0,
                            bottom: e || 0,
                            width: 0,
                            height: 0
                        }
                         : u(t);
                        if (!s)
                            return this;
                        const i = this._opts.spacing || 0,
                        a = this._pickPlace(s);
                        a !== this._lastPlace && (this._lastPlace && this.$el.removeClass(this._lastPlace), this.$el.addClass(a), this._lastPlace = a);
                        const n = this._lastPlace, {
                            width: o,
                            height: l
                        } = this.size;
                        let h = 0,
                        d = 0;
                        return /^top/.test(n) ? h = s.top - l - i : /^bottom/.test(n) ? h = s.bottom + i : /^left/.test(n) ? d = s.left - o - i : /^right/.test(n) && (d = s.right + i),
                        /-left$/.test(n) ? d = s.right - o : /-right$/.test(n) ? d = s.left : /-top$/.test(n) ? h = s.bottom - l : /-bottom$/.test(n) && (h = s.top),
                        "left" === n || "right" === n ? h = s.top + s.height / 2 - l / 2 : "top" !== n && "bottom" !== n || (d = s.left + s.width / 2 - o / 2),
                        this.$el.css({
                            top: Math.round(h) + "px",
                            left: Math.round(d) + "px"
                        }),
                        this
                    }
                    _updateSize() {
                        this._hidden && (this.$el.css("visibility", "hidden"), (0, o.default)("body").append(this.$el)),
                        this._size = {
                            width: this.$el.outerWidth(!0),
                            height: this.$el.outerHeight(!0)
                        },
                        this._hidden ? (this.$el.remove(), this.$el.css("visibility", "")) : this.position()
                    }
                    _pickPlace(t) {
                        const e = u(window),
                        s = this._opts.place.split("-"),
                        i = this._opts.spacing || 0;
                        if (-1 !== ["top", "bottom"].indexOf(s[0]))
                            switch (t.top - this.size.height - i <= e.top ? s[0] = "bottom" : t.bottom + this.size.height + i >= e.bottom && (s[0] = "top"), s[1]) {
                            case "left":
                                t.right - this.size.width <= e.left && (s[1] = "right");
                                break;
                            case "right":
                                t.left + this.size.width >= e.right && (s[1] = "left");
                                break;
                            default:
                                t.left + t.width / 2 + this.size.width / 2 >= e.right ? s[1] = "left" : t.right - t.width / 2 - this.size.width / 2 <= e.left && (s[1] = "right")
                            }
                        else
                            switch (t.left - this.size.width - i <= e.left ? s[0] = "right" : t.right + this.size.width + i >= e.right && (s[0] = "left"), s[1]) {
                            case "top":
                                t.bottom - this.size.height <= e.top && (s[1] = "bottom");
                                break;
                            case "bottom":
                                t.top + this.size.height >= e.bottom && (s[1] = "top");
                                break;
                            default:
                                t.top + t.height / 2 + this.size.height / 2 >= e.bottom ? s[1] = "top" : t.bottom - t.height / 2 - this.size.height / 2 <= e.top && (s[1] = "bottom")
                            }
                        return s.join("-")
                    }
                }
                var f = p;
                e.default = f,
                t.exports = e.default
            },
            "2HOs": function (t, e, s) {
                "use strict";
                Object.defineProperty(e, "__esModule", {
                    value: !0
                }),
                e.default = void 0;
                var i = n(s("zILR")),
                a = n(s("LewK")),
                r = s("jNhv");
                function n(t) {
                    return t && t.__esModule ? t : {
                    default:
                        t
                    }
                }
                var o = class {
                    constructor(t, e) {
                        this._targets = t,
                        this._opts = (0, r.extend)({
                            enabled: !0,
                            autoplay: !1,
                            alwaysShowPast: !1,
                            alwaysShowFuture: !1
                        }, e),
                        this.init()
                    }
                    get timeline() {
                        return this._timeline
                    }
                    set provider(t) {
                        Object.keys(this.timeline.animations).forEach(e => {
                            const s = this.timeline.animations[e];
                            s instanceof i.default && (s.provider = t)
                        })
                    }
                    get past() {
                        return this.timeline.get("past")
                    }
                    get future() {
                        return this.timeline.get("future")
                    }
                    get pastText() {
                        return this.timeline.get("pastText")
                    }
                    get futureText() {
                        return this.timeline.get("futureText")
                    }
                    init() {
                        const t = this._targets,
                        e = new a.default(this._opts);
                        if (this._timeline = e, t.past) {
                            const s = new i.default(t.past, (0, r.extend)({}, this._opts, {
                                        key: "past",
                                        alwaysShow: this._opts.alwaysShowPast
                                    }));
                            e.add("past", s)
                        }
                        if (t.future) {
                            const s = new i.default(t.future, (0, r.extend)({}, this._opts, {
                                        key: "future",
                                        future: !0,
                                        alwaysShow: this._opts.alwaysShowFuture
                                    }));
                            e.add("future", s)
                        }
                        if (t.pastText) {
                            const s = new i.default(t.pastText, (0, r.extend)({}, this._opts, {
                                        key: "pastText",
                                        alwaysShow: this._opts.alwaysShowPast
                                    }));
                            e.add("pastText", s)
                        }
                        if (t.futureText) {
                            const s = new i.default(t.futureText, (0, r.extend)({}, this._opts, {
                                        key: "futureText",
                                        future: !0,
                                        alwaysShow: this._opts.alwaysShowFuture
                                    }));
                            e.add("futureText", s)
                        }
                    }
                };
                e.default = o,
                t.exports = e.default
            },
            "2xxI": function (t, e, s) {
                "use strict";
                Object.defineProperty(e, "__esModule", {
                    value: !0
                }),
                e.default = void 0;
                var i,
                a = s("jNhv"),
                r = (i = s("bzMN")) && i.__esModule ? i : {
                default:
                    i
                },
                n = s("7Z8C");
                var o = function (t, e, s, i) {
                    return new(s || (s = Promise))((function (a, r) {
                            function n(t) {
                                try {
                                    l(i.next(t))
                                } catch (t) {
                                    r(t)
                                }
                            }
                            function o(t) {
                                try {
                                    l(i.throw(t))
                                } catch (t) {
                                    r(t)
                                }
                            }
                            function l(t) {
                                var e;
                                t.done ? a(t.value) : (e = t.value, e instanceof s ? e : new s((function (t) {
                                            t(e)
                                        }))).then(n, o)
                            }
                            l((i = i.apply(t, e || [])).next())
                        }))
                };
                var l = class {
                    constructor(t, e) {
                        this.source = t;
                        const s = new r.default;
                        s.provider = this,
                        s.on("data:add", e => t.trigger("markers:add", {
                                markers: e.data.items
                            })),
                        s.on("data:remove", e => t.trigger("markers:remove", {
                                markers: e.data.items
                            })),
                        s.on("data:update", e => t.trigger("markers:update", {
                                markers: e.data.items
                            })),
                        this.animation = s,
                        t.on("data:load:start reset", () => {
                            this._animationMarkers = null
                        })
                    }
                    _loadAnimationData() {
                        const t = this.source;
                        return new Promise((e, s) => {
                            const i = t.service.param("limit") || 300,
                            r = t.service.param("plimit"),
                            o = t.service.param("sort") || "dt:-1",
                            l = t.style.marker || t.style;
                            t.service.action("within").plimit(100).limit(i).sort(o).get().then(s => {
                                t.service.plimit(r);
                                const i = {},
                                o = (0, a.get)(s, "data") || [];
                                (0, a.isArray)(o) && o.forEach(e => {
                                    const s = t.processRecord(e),
                                    r = s.loc || {},
                                    o = {
                                        lat: r.lat,
                                        lon: r.long || r.lon
                                    },
                                    h = s.id || `${o.lat},${o.long}`,
                                    d = t.markersById ? t.markersById[h] : null,
                                    u = (0, a.isFunction)(l) ? l(s) : l;
                                    if (d)
                                        i[h] = new n.MarkerMapElement((0, a.extend)({}, d.data, s), d.style, d.renderable);
                                    else if (!1 === (0, a.isset)(u.spacing)) {
                                        const e = t.strategy.factory.marker(t.key, {
                                            lat: o.lat,
                                            lon: o.lon
                                        }, u);
                                        i[h] = new n.MarkerMapElement(Object.assign(Object.assign({}, s), {
                                                    awxjs_source: t.key
                                                }), u, e)
                                    }
                                }),
                                e(i)
                            }).catch(t => {
                                console.error("Error requesting animation data for TextSource", t),
                                s(t)
                            })
                        })
                    }
                    animationData(t) {
                        return o(this, void 0, void 0, (function  * () {
                                const t = this.source,
                                e = () => {
                                    const e = this._animationMarkers,
                                    s = ((0, a.get)(t.opts, "data.properties.timestamp") || "").replace(/^periods\./, "");
                                    let i = (0, a.get)(t.opts, "data.properties.value");
                                    (0, a.isFunction)(i) || (i = (i || "").replace(/^periods\./, ""));
                                    return Object.keys(e).reduce((r, n) => {
                                        const {
                                            data: o,
                                            renderable: l
                                        } = e[n];
                                        if (o && o.periods) {
                                            let e;
                                            const h = o.periods.reduce((t, r) => {
                                                const n = 1e3 * (0, a.get)(r, s);
                                                let o = "";
                                                return o = (0, a.isFunction)(i) ? i(r) : (0, a.get)(r, i),
                                                o !== e && (t[n] = o, e = o),
                                                t
                                            }, {});
                                            return r[n] = {
                                                data: h,
                                                renderable: l,
                                                style: t.style
                                            },
                                            r
                                        }
                                        return null
                                    }, {})
                                },
                                s = () => new Promise((t, e) => {
                                    this._loadAnimationData().then(e => {
                                        this._animationMarkers = e,
                                        t(e)
                                    })
                                });
                                return new Promise((i, a) => {
                                    if (this._animationMarkers) {
                                        const t = e();
                                        i(t)
                                    } else
                                        t.isLoading ? t.once("data:load", () => {
                                            s().then(t => {
                                                const s = e();
                                                i(s)
                                            })
                                        }) : s().then(t => {
                                            const s = e();
                                            i(s)
                                        })
                                })
                            }))
                    }
                };
                e.default = l,
                t.exports = e.default
            },
            "5bFp": function (t, e, s) {
                "use strict";
                Object.defineProperty(e, "__esModule", {
                    value: !0
                }),
                e.default = void 0;
                var i = n(s("AIg7")),
                a = s("jNhv"),
                r = n(s("b9Bd"));
                function n(t) {
                    return t && t.__esModule ? t : {
                    default:
                        t
                    }
                }
                class o extends i.default {
                    constructor(t, e) {
                        super(),
                        this._key = t,
                        this._opts = (0, a.extend)({
                            size: void 0,
                            autosize: !1,
                            format: "svg",
                            metric: !1
                        }, e),
                        (0, a.isset)(this._opts.size) || (this._opts.autosize = !0),
                        this._target = (0, r.default)(`<div class="awxjs__legend awxjs__legend-${t}"></div>`),
                        setTimeout(() => {
                            this.update(this._opts)
                        }, 500)
                    }
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
                    show() {
                        this.$el.show()
                    }
                    hide() {
                        this.$el.hide()
                    }
                    setSize(t) {
                        this._opts.size = (0, a.extend)(this._opts.size, t),
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
                        this.update()
                    }
                    units() {
                        const t = this._opts.metric ? "metric" : "imperial";
                        let e = (0, a.get)(this._opts, "units." + t);
                        return e && /^(f|c)$/.test(e) && (e = e.toUpperCase()),
                        e
                    }
                    reset() {
                        this.$el.empty()
                    }
                    update(t) {}
                    resize() {
                        const t = this.getSize(),
                        e = (0, r.default)(".awxjs__legend-content", this.$el).children();
                        e && e.forEach(e => {
                            t.width = Math.max(t.width, (0, r.default)(e).outerWidth(!0))
                        }),
                        this.$el.css("width", t.width + "px"),
                        this.trigger("resize", t)
                    }
                }
                var l = o;
                e.default = l,
                t.exports = e.default
            },
            "5bKP": function (t, e, s) {
                "use strict";
                Object.defineProperty(e, "__esModule", {
                    value: !0
                }),
                e.default = void 0;
                var i,
                a = (i = s("OmhM")) && i.__esModule ? i : {
                default:
                    i
                },
                r = s("S5Ho"),
                n = s("jNhv");
                var o = class {
                    constructor(t) {
                        this._configs = {
                            "air-quality": a.default.airquality,
                            convective: a.default.convectiveOutlook,
                            "drought-monitor": a.default.droughtMonitor,
                            earthquakes: a.default.earthquakes,
                            fires: a.default.fires,
                            "fire-outlook": a.default.fireOutlook,
                            "lightning-strikes": a.default.lightningStrikes,
                            records: a.default.records,
                            "river-observations": a.default.rivers,
                            stormcells: a.default.stormcells,
                            stormreports: a.default.stormreports,
                            text: a.default.text
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
                        if ((0, r.isTile)(t)) {
                            let t;
                            t = e.raster ? e.raster : e,
                            s.style = (0, n.extend)(s.style, t)
                        } else if ((0, r.isVector)(t) || (0, r.isText)(t)) {
                            let t,
                            i,
                            a;
                            const r = (0, n.isset)(e.marker) || (0, n.isset)(e.polygon) || (0, n.isset)(e.polyline);
                            e.marker ? t = e.marker : !1 === r && (t = e),
                            e.polygon ? i = e.polygon : !1 === r && (i = e),
                            e.polyline ? a = e.polyline : !1 === r && (a = e),
                            s.style = (0, n.extend)(s.style, {
                                marker: t,
                                polygon: i,
                                polyline: a
                            })
                        }
                        this._configs[t] = (0, n.cloneDeep)(s)
                    }
                    setStyles(t) {
                        Object.keys(t).forEach(e => this.setStyle(e, t[e]))
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
                };
                e.default = o,
                t.exports = e.default
            },
            "6TFz": function (t, e, s) {
                "use strict";
                Object.defineProperty(e, "__esModule", {
                    value: !0
                }),
                e.default = void 0;
                var i,
                a = (i = s("AIg7")) && i.__esModule ? i : {
                default:
                    i
                };
                class r extends a.default {
                    constructor(t, e, s, i) {
                        super(),
                        this._hidden = !1,
                        this._events = ["click", "mouseover", "mouseout"],
                        this.id = i,
                        this.coordinate = t,
                        this.data = e,
                        this.opts = Object.assign({}, s)
                    }
                    get map() {
                        return this._map
                    }
                    get renderable() {
                        return this._renderable
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
                var n = r;
                e.default = n,
                t.exports = e.default
            },
            "6awg": function (t, e, s) {
                "use strict";
                Object.defineProperty(e, "__esModule", {
                    value: !0
                }),
                e.default = void 0;
                var i,
                a = (i = s("26Hj")) && i.__esModule ? i : {
                default:
                    i
                },
                r = s("jNhv"),
                n = s("T1DL");
                class o extends a.default {
                    constructor() {
                        super(...arguments),
                        this._visible = !0,
                        this._exists = !1
                    }
                    get overlay() {
                        return this._overlay
                    }
                    set timestamp(t) {
                        this.enabled && (0, r.isset)(t) && (t = new Date(t.getFullYear(), t.getMonth(), t.getDate(), t.getHours(), t.getMinutes()), this._timestamp && t.getTime() === this._timestamp.getTime() || (this._timestamp = t, !1 === this.isAnimating() && !1 === this.isAnimationFrame && (this.animation.hide(), this.updateVisibility()), this.overlay && this.canShow() && this.overlay.setUrl(this.urlTemplate())))
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
                    setOpacity(t, e = !0) {
                        this._opacity = t,
                        this.overlay && this.isVisible() && !0 === e && this.overlay.setOpacity(t),
                        this.animation && this.animation.setOpacity(t)
                    }
                    setOrder(t) {
                        this.overlay.setZIndex(t)
                    }
                    createOverlay(t, e = {}) {
                        const s = L.tileLayer(t.url(), (0, r.extend)({}, e, {
                                    subdomains: t.range().join("")
                                }));
                        return s.on("add", () => {
                            this._exists = !0
                        }).on("remove", () => {
                            this._exists = !1
                        }),
                        s
                    }
                    animationLayerForDate(t, e, s = !0) {
                        return new Promise((t, i) => {
                            if (this.dataSource) {
                                const i = this.dataSource.tileLayer(this.key, e, (0, r.extend)({}, this._opts, {
                                            id: `${this.identifier}-anim-${(0, n.mapTimestampFromDate)(e)}`,
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
                                s ? i.overlay.on("load", () => {
                                    t(i)
                                }) : t(i),
                                i.on("layer:remove", () => {
                                    this.trigger("layer:remove", {
                                        layer: i.overlay
                                    })
                                }),
                                this.trigger("layer:add", {
                                    layer: i.overlay
                                })
                            } else
                                i(new Error("No map strategy data source provided"))
                        })
                    }
                }
                var l = o;
                e.default = l,
                t.exports = e.default
            },
            "6b7i": function (t, e, s) {
                "use strict";
                Object.defineProperty(e, "__esModule", {
                    value: !0
                }),
                e.default = void 0;
                var i,
                a = (i = s("hV9s")) && i.__esModule ? i : {
                default:
                    i
                };
                class r extends a.default {
                    constructor(t, e, s = {}, i) {
                        super(t, s, i),
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
                        this.renderable.on("click", () => this.trigger("click", {
                                data: this.data,
                                shape: this.renderable
                            })),
                        this.renderable.on("mouseover", () => this.trigger("mouseover", {
                                data: this.data,
                                shape: this.renderable
                            })),
                        this.renderable.on("mouseout", () => this.trigger("mouseout", {
                                data: this.data,
                                shape: this.renderable
                            })),
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
                }
                var n = r;
                e.default = n,
                t.exports = e.default
            },
            "6t7K": function (t, e, s) {
                "use strict";
                Object.defineProperty(e, "__esModule", {
                    value: !0
                }),
                e.default = e.config = void 0;
                const i = {
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
                e.config = i;
                var a = i;
                e.default = a
            },
            "6yI3": function (t, e, s) {
                "use strict";
                Object.defineProperty(e, "__esModule", {
                    value: !0
                }),
                Object.defineProperty(e, "Polygon", {
                    enumerable: !0,
                    get: function () {
                        return i.default
                    }
                }),
                Object.defineProperty(e, "Polyline", {
                    enumerable: !0,
                    get: function () {
                        return a.default
                    }
                }),
                Object.defineProperty(e, "Tile", {
                    enumerable: !0,
                    get: function () {
                        return r.default
                    }
                }),
                Object.defineProperty(e, "Marker", {
                    enumerable: !0,
                    get: function () {
                        return n.default
                    }
                }),
                Object.defineProperty(e, "TileSource", {
                    enumerable: !0,
                    get: function () {
                        return o.default
                    }
                });
                var i = l(s("o+BN")),
                a = l(s("cOOT")),
                r = l(s("xctJ")),
                n = l(s("qTT9")),
                o = l(s("/zIx"));
                function l(t) {
                    return t && t.__esModule ? t : {
                    default:
                        t
                    }
                }
            },
            "76qJ": function (t, e, s) {
                "use strict";
                Object.defineProperty(e, "__esModule", {
                    value: !0
                }),
                Object.defineProperty(e, "Polygon", {
                    enumerable: !0,
                    get: function () {
                        return i.default
                    }
                }),
                Object.defineProperty(e, "Polyline", {
                    enumerable: !0,
                    get: function () {
                        return a.default
                    }
                }),
                Object.defineProperty(e, "Tile", {
                    enumerable: !0,
                    get: function () {
                        return r.default
                    }
                }),
                Object.defineProperty(e, "Marker", {
                    enumerable: !0,
                    get: function () {
                        return n.default
                    }
                }),
                Object.defineProperty(e, "TileSource", {
                    enumerable: !0,
                    get: function () {
                        return o.default
                    }
                });
                var i = l(s("wyPF")),
                a = l(s("6b7i")),
                r = l(s("fU9j")),
                n = l(s("nkx+")),
                o = l(s("6awg"));
                function l(t) {
                    return t && t.__esModule ? t : {
                    default:
                        t
                    }
                }
            },
            "7Z8C": function (t, e, s) {
                "use strict";
                Object.defineProperty(e, "__esModule", {
                    value: !0
                }),
                e.default = e.PolygonMapElement = e.PolylineMapElement = e.MarkerMapElement = void 0;
                var i = s("jNhv");
                class a {
                    constructor(t, e, s) {
                        this.data = t,
                        this.style = e,
                        this.renderable = s,
                        t.id && (this.id = t.id)
                    }
                    get bounds() {
                        return this.geometry && (0, i.has)(this.geometry, "bounds") ? this.geometry.bounds() : null
                    }
                    get adjustOpacity() {
                        var t;
                        const e = null === (t = this.style) || void 0 === t ? void 0 : t.adjustOpacity;
                        return !(0, i.isset)(e) || e
                    }
                }
                e.MarkerMapElement = class extends a {};
                e.PolylineMapElement = class extends a {};
                e.PolygonMapElement = class extends a {};
                var r = a;
                e.default = r
            },
            "7rjk": function (t, e, s) {
                "use strict";
                Object.defineProperty(e, "__esModule", {
                    value: !0
                }),
                e.default = void 0;
                var i = o(s("AIg7")),
                a = s("SJ39"),
                r = s("jNhv"),
                n = o(s("7Z8C"));
                function o(t) {
                    return t && t.__esModule ? t : {
                    default:
                        t
                    }
                }
                const l = {};
                class h extends i.default {
                    constructor(t, e) {
                        super(),
                        this._setInitialView = !0,
                        this._ready = !1,
                        e = (0, r.extend)({
                            zoom: 7
                        }, e),
                        this._opts = e,
                        this._sources = {},
                        this._sourceOrder = [];
                        const s = this.strategy;
                        l[s] || (l[s] = {
                                loading: !1,
                                callbacks: []
                            }),
                        l[s].loading ? l[s].callbacks.push(() => {
                            this.init(t)
                        }) : (l[s].loading = !0, this.loadDependencies().then(() => {
                                l[s].loading = !1,
                                this.init(t),
                                l[s].callbacks.forEach(t => t()),
                                l[s].callbacks = [],
                                delete l[s]
                            }))
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
                        return Object.keys(this._sources).map(t => this._sources[t])
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
                        if ((0, r.isset)(this._opts.zoom) && (e.zoom = this._opts.zoom), this._opts.center && (e.center = {
                                    lat: this._opts.center.lat,
                                    lon: this._opts.center.lon
                                }), !this._factory)
                            throw new Error("Cannot initialize map, overlay factory is undefined.");
                        if (this._setupEvents(), this._setInitialView) {
                            const t = (0, r.isset)(e.zoom) ? Math.max(0, e.zoom) : 8, {
                                lat: s,
                                lon: i
                            } = e.center || {};
                            (0, r.isset)(s) && (0, r.isset)(i) ? this.setView({
                                lat: parseFloat(s),
                                lon: parseFloat(i)
                            }, t) : t > 0 && this.setZoom(t)
                        }
                        this.on("map:ready", () => {
                            this._ready = !0,
                            this.trigger("ready")
                        })
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
                        this.isTile(t) ? (this._sourceOrder.push(e), t.dataSource = this, this.addOverlay(t.overlay), t.on("layer:add", t => {
                                this.addOverlay(t.data.layer)
                            }), t.on("layer:remove", t => {
                                this.removeOverlay(t.data.layer)
                            })) : this.isVector(t) && (t.on("markers:add", t => {
                                const {
                                    markers: e,
                                    animation: s
                                } = t.data;
                                e && this.addMarkers(e)
                            }), t.on("markers:remove", t => {
                                const {
                                    markers: e
                                } = t.data;
                                e && this.removeMarkers(e)
                            }), t.on("markers:update", t => {
                                (t.data.markers || []).forEach(t => {
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
                                })
                            }), t.on("shapes:add", t => {
                                const {
                                    shapes: e,
                                    animation: s
                                } = t.data;
                                e && (s ? this.showShapes(e) : this.addShapes(e))
                            }), t.on("shapes:remove", t => {
                                const {
                                    shapes: e,
                                    animation: s
                                } = t.data;
                                e && (s ? this.hideShapes(e) : this.removeShapes(e))
                            }))
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
                        return t instanceof a.VectorSource
                    }
                    isText(t) {
                        return t instanceof a.TextSource
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
                        (t || []).forEach(t => this.addOverlay(t))
                    }
                    removeOverlay(t) {
                        throw new Error("Subclasses of MapStrategy must override removeOverlay()")
                    }
                    removeOverlays(t) {
                        (t || []).forEach(t => this.removeOverlay(t))
                    }
                    addMarker(t, e) {
                        if (t instanceof n.default) {
                            if (t.renderable) {
                                if (t.style && t.style.callout) {
                                    const e = t.style.callout,
                                    s = (0, r.isFunction)(e) ? e(t.data) : e;
                                    this.bindCalloutToMarker(t.renderable, s)
                                }
                                this.addMarker(t.renderable, t.data)
                            }
                        } else if ((0, r.isPlainObject)(t)) {
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
                                    const e = (0, r.isFunction)(i) ? i(s) : i;
                                    this.bindCalloutToMarker(t.renderable, e)
                                }
                                this.addMarker(e, s)
                            }
                        }
                    }
                    addMarkers(t) {
                        (t || []).forEach(t => this.addMarker(t))
                    }
                    removeMarker(t) {
                        if (t instanceof n.default)
                            t.renderable && this.removeMarker(t.renderable);
                        else if ((0, r.isPlainObject)(t)) {
                            const {
                                renderable: e
                            } = t;
                            e && this.removeMarker(e)
                        }
                    }
                    removeMarkers(t) {
                        (t || []).forEach(t => this.removeMarker(t))
                    }
                    updateMarker(t, e, s = null) {
                        if (t instanceof n.default)
                            t.renderable && this.updateMarker(t.renderable, e, s);
                        else if ((0, r.isPlainObject)(t)) {
                            const {
                                renderable: i
                            } = t;
                            i && this.updateMarker(i, e, s)
                        }
                    }
                    bindCalloutToMarker(t, e) {}
                    addShape(t, e) {
                        if ((0, r.isArray)(t))
                            this.addShapes(t, e);
                        else if (t instanceof n.default)
                            t.renderable && this.addShape(t.renderable, t.data || e);
                        else if ((0, r.isPlainObject)(t)) {
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
                        (t || []).forEach(t => this.addShape(t, e))
                    }
                    removeShape(t) {
                        if ((0, r.isArray)(t))
                            this.removeShapes(t);
                        else if (t instanceof n.default)
                            t.renderable && this.removeShape(t.renderable);
                        else if ((0, r.isPlainObject)(t)) {
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
                        (t || []).forEach(t => this.removeShape(t))
                    }
                    showShape(t) {
                        if ((0, r.isArray)(t))
                            this.showShape(t);
                        else if (t instanceof n.default)
                            t.renderable && this.showShape(t.renderable);
                        else if ((0, r.isPlainObject)(t)) {
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
                        (t || []).forEach(t => this.showShape(t))
                    }
                    hideShape(t) {
                        if ((0, r.isArray)(t))
                            this.hideShape(t);
                        else if (t instanceof n.default)
                            t.renderable && this.hideShape(t.renderable);
                        else if ((0, r.isPlainObject)(t)) {
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
                        (t || []).forEach(t => this.hideShape(t))
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
                            (0, r.has)(this.map, e) || ((0, r.has)(this.map, "addEventListener") ? e = "addEventListener" : (0, r.has)(this.map, "addListener") && (e = "addListener")),
                            (0, r.has)(this.map, e) && Object.keys(t).forEach(s => {
                                this.map[e](s, e => {
                                    const i = this._dataForMapEvent(s, e);
                                    this._shouldTriggerEvent(s) && this.trigger(t[s], i)
                                })
                            })
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
                        let i = (0, r.isset)(s.zIndex) ? s.zIndex : 1;
                        const a = this._sourceOrder.indexOf(t);
                        a >= 0 && (i = a + 1);
                        let n = (0, r.get)(s, "data.service");
                        n || (n = this.dataSource.requestForMap(t)),
                        n.param("format", (0, r.get)(s, "style.format") || "png");
                        return this.factory.tileLayer(t, n, (0, r.extend)((0, r.cloneDeep)(s), {
                                time: e,
                                zIndex: i
                            }))
                    }
                }
                var d = h;
                e.default = d,
                t.exports = e.default
            },
            "8Zrd": function (t, e, s) {
                "use strict";
                Object.defineProperty(e, "__esModule", {
                    value: !0
                }),
                e.default = void 0;
                var i,
                a = (i = s("Bte/")) && i.__esModule ? i : {
                default:
                    i
                };
                class r extends a.default {
                    invalidate() {}
                    createRenderable() {}
                    updateVisibility(t) {}
                    addToMap(t) {
                        this.renderable && this.renderable.setMap(t)
                    }
                    removeFromMap(t) {
                        this.renderable && this.renderable.setMap(null)
                    }
                }
                var n = r;
                e.default = n,
                t.exports = e.default
            },
            "8hz/": function (t, e, s) {
                "use strict";
                Object.defineProperty(e, "__esModule", {
                    value: !0
                }),
                e.markerIconFromStyle = e.formatLayerOptions = void 0;
                var i = s("GK1F"),
                a = s("jNhv"),
                r = s("+mSH");
                e.formatLayerOptions = t => {
                    const e = {
                        stroke: !1,
                        fill: !1
                    };
                    return e.id = t.id,
                    t.stroke && (e.stroke = !0, e.lineColor = t.stroke.color, e.lineOpacity = t.stroke.opacity, e.lineWidth = t.stroke.width, e.lineCap = t.stroke.lineCap, e.lineJoin = t.stroke.lineJoin, e.lineDasharray = t.stroke.dashArray, e.dashOffset = t.stroke.dashOffset),
                    t.fill && (e.fill = !0, e.fillColor = t.fill.color, e.fillOpacity = t.fill.opacity),
                    e.fill && !(0, a.isset)(t.fillOpacity) && (t.fillOpacity = 1),
                    e.stroke && !(0, a.isset)(t.strokeOpacity) && (t.strokeOpacity = 1),
                    delete e.fill,
                    delete e.stroke,
                    Object.keys(e).forEach(t => {
                        const s = (0, r.hyphenate)(t);
                        s !== t && (e[s] = e[t], delete e[t])
                    }),
                    e
                };
                e.markerIconFromStyle = t => {
                    if (!t)
                        return null;
                    if (t.html && console.warn("awxjs - HTML markers are not currently supported with Mapbox GL"), t.svg) {
                        const [e, s] = t.size || [12, 12];
                        if (document) {
                            const a = document.createElement("div");
                            return a.innerHTML = i.SVG.draw(e, s, t.svg),
                            t.zIndex && (a.style.zIndex = "" + t.zIndex),
                            a
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
                }
            },
            AM6C: function (t, e, s) {
                "use strict";
                Object.defineProperty(e, "__esModule", {
                    value: !0
                }),
                e.default = void 0;
                var i,
                a = (i = s("gQtN")) && i.__esModule ? i : {
                default:
                    i
                },
                r = s("jNhv");
                class n extends a.default {
                    constructor(t = null) {
                        super(t = (0, r.extend)({}, {
                                refresh: 0
                            }, t)),
                        this.itemsByTime = {},
                        this.lastInterval = 0,
                        this.dataBeyondBounds = {
                            before: [],
                            after: []
                        },
                        this.on("stop", () => {
                            this.trigger("data:add", {
                                items: this.dataBeyondBounds.after.filter(t => void 0 !== t)
                            })
                        })
                    }
                    dataByTime() {
                        return this.itemsByTime
                    }
                    setData(t) {
                        this.data = t,
                        this._prepareDataItems(t)
                    }
                    play() {
                        this.canAnimate() || !this.provider ? super.play() : this.provider.animationData(this).then(t => {
                            this.setData(t),
                            this.lastInterval = this.to
                        })
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
                                [].concat(this.itemsByTime[this.from]).forEach(t => {
                                    const e = a.indexOf(t);
                                    -1 !== e && a.splice(e, 1)
                                }),
                                a = a.concat(this.dataBeyondBounds.after),
                                this.trigger("data:remove", {
                                    items: a.filter(t => void 0 !== t)
                                })
                            } else
                                this.trigger("data:add", {
                                    items: a.filter(t => void 0 !== t)
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
                        return (0, r.isset)(this.data)
                    }
                    needsData() {
                        return !1 === (0, r.isset)(this.data)
                    }
                    canAnimate() {
                        return super.canAnimate() && this.dataByTime() && Object.keys(this.dataByTime()).length > 0
                    }
                    _handleTimingChange() {
                        this.data && this._prepareDataItems(this.data)
                    }
                    _prepareDataItems(t) {
                        if (this.increment <= 0 || !(0, r.isArray)(t))
                            return;
                        const e = this._prepareIntervals(),
                        s = t;
                        this.dataBeyondBounds = {
                            before: [],
                            after: []
                        },
                        (s || []).forEach(t => {
                            if ((0, r.has)(t, "timestamp")) {
                                const s = (0, r.get)(t, "timestamp");
                                if (s < this.from)
                                    this.dataBeyondBounds.before.push(t);
                                else if (s > this.to)
                                    this.dataBeyondBounds.after.push(t);
                                else {
                                    const i = this.dataIntervalClosestToTime(s);
                                    s < this.to && e[i] && e[i].push(t)
                                }
                            }
                        }),
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
                        const e = Object.keys(this.dataByTime()).sort().reverse().map(t => parseInt(t, 10));
                        let s = 0;
                        return t < this.from || t > this.to ? s = t : e.forEach(e => {
                            t >= e && 0 === s && (s = e)
                        }),
                        s
                    }
                    _elementsInIntervalRange(t, e) {
                        if (t === e)
                            return [];
                        let s = [];
                        const i = Object.keys(this.dataByTime()).sort().map(t => parseInt(t, 10)),
                        a = [];
                        return i.forEach(i => {
                            let r = !1;
                            e < t ? i >= e && i < t && (r = !0) : (i === t && i === e || i >= t && i < e || i === e) && (r = !0),
                            r && -1 === a.indexOf(i) && (a.push(i), s = (s || []).concat(this.dataByTime()[i]))
                        }),
                        s
                    }
                }
                var o = n;
                e.default = o,
                t.exports = e.default
            },
            BJxM: function (t, e, s) {
                "use strict";
                Object.defineProperty(e, "__esModule", {
                    value: !0
                }),
                e.legends = e.close = void 0;
                e.close = () => '\n\t<svg width="100pt" height="100pt" version="1.1" viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">\n\t\t<path d="m22.699 77.301c0.80078 0.80078 1.8008 1.1992 2.8008 1.1992s2-0.39844 2.8008-1.1992l21.699-21.602 21.699 21.699c0.80078 0.80078 1.8008 1.1992 2.8008 1.1992s2-0.39844 2.8008-1.1992c1.6016-1.6016 1.6016-4.1016 0-5.6992l-21.602-21.699 21.699-21.699c1.6016-1.6016 1.6016-4.1016 0-5.6992-1.6016-1.6016-4.1016-1.6016-5.6992 0l-21.699 21.699-21.699-21.602c-1.6016-1.6016-4.1016-1.6016-5.6992 0-1.6016 1.6016-1.6016 4.1016 0 5.6992l21.699 21.602-21.602 21.699c-1.5977 1.5-1.5977 4.1016 0 5.6016z"/>\n\t</svg>\n';
                e.legends = () => '\n\t<svg version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 0 90 90">\n\t\t<g>\n\t\t\t<path d="M45,9c19.9,0,36,16.1,36,36S64.9,81,45,81S9,64.9,9,45C9,25.1,25.1,9,45,9 M45,0C20.1,0,0,20.1,0,45s20.1,45,45,45\n\t\t\t\ts45-20.1,45-45C90,20.1,69.9,0,45,0z"/>\n\t\t\t<path d="M48.7,29.3c0,1-0.4,1.9-1.1,2.7c-0.7,0.7-1.6,1.1-2.6,1.1c-0.5,0-0.9-0.1-1.4-0.3c-0.4-0.2-0.8-0.5-1.2-0.8\n\t\t\t\tc-0.3-0.3-0.6-0.7-0.8-1.2c-0.2-0.5-0.3-0.9-0.3-1.5c0-0.5,0.1-0.9,0.3-1.3c0.2-0.4,0.5-0.8,0.8-1.2c0.3-0.3,0.7-0.6,1.2-0.8\n\t\t\t\tc0.4-0.2,0.9-0.3,1.4-0.3s0.9,0.1,1.4,0.3c0.4,0.2,0.8,0.5,1.2,0.8c0.4,0.3,0.6,0.7,0.8,1.1C48.6,28.3,48.7,28.8,48.7,29.3\n\t\t\t\tL48.7,29.3z M48.3,59.8c0,1.1-0.3,2-0.9,2.6c-0.6,0.7-1.4,1-2.4,1s-1.8-0.3-2.4-1c-0.6-0.7-0.9-1.5-0.9-2.6v-18\n\t\t\t\tc0-1.1,0.3-2,0.9-2.6c0.6-0.7,1.4-1,2.4-1s1.8,0.3,2.4,1c0.6,0.7,0.9,1.5,0.9,2.6V59.8z"/>\n\t\t</g>\n\t</svg>\n'
            },
            BhJo: function (t, e, s) {
                "use strict";
                Object.defineProperty(e, "__esModule", {
                    value: !0
                }),
                e.default = void 0;
                var i = o(s("KuXL")),
                a = o(s("bBV4")),
                r = s("s8Ky"),
                n = s("jNhv");
                function o(t) {
                    return t && t.__esModule ? t : {
                    default:
                        t
                    }
                }
                class l extends i.default {
                    constructor(t) {
                        super((0, n.extend)({
                                reloadOnChange: !0
                            }, t, {
                                ui: {
                                    segments: ".awxjs__ui-btn-segments ul"
                                }
                            })),
                        this.storedSegments = []
                    }
                    get id() {
                        return this.opts.id
                    }
                    get parentId() {
                        return this.opts.parentId
                    }
                    get title() {
                        return this.opts.title
                    }
                    get value() {
                        const t = this.selectedSegments().map(t => t.value);
                        return !1 === this.opts.multiselect ? t.join(",") : t
                    }
                    get segments() {
                        return this.storedSegments
                    }
                    setSegments(t) {
                        this.storedSegments = t,
                        this.ui.segments && t.forEach(t => {
                            t.addTo(this.ui.segments),
                            t.on("select", e => {
                                this._handleSelectSegment(t)
                            }).on("deselect", e => {
                                this._handleDeselectSegment(t)
                            })
                        })
                    }
                    selectedSegments() {
                        return this.segments.filter(t => t.selected)
                    }
                    clear(t = !0) {
                        this.selectedSegments().forEach(e => {
                            e.deselect(t)
                        })
                    }
                    _handleSelectSegment(t) {
                        !1 === (this.opts.multiselect && "all" !== t.value && !1 !== t.multiselect) ? this.selectedSegments().forEach(e => {
                            e.value !== t.value && e.deselect()
                        }) : this.selectedSegments().forEach(t => {
                            !1 === t.multiselect && t.deselect()
                        }),
                        this._handleValueChange()
                    }
                    _handleDeselectSegment(t) {
                        if (0 === this.selectedSegments().length)
                            if (this.opts.multiselect) {
                                let t;
                                this.segments.forEach(e => {
                                    t || "all" !== e.value && !1 !== e.multiselect || (e.select(), t = e)
                                })
                            } else
                                this.opts.requiresSelection && this.segments[0].select();
                        this._handleValueChange()
                    }
                    _handleValueChange() {
                        this.trigger("change", {
                            id: this.id,
                            value: this.value,
                            reload: this.opts.reloadOnChange
                        })
                    }
                    _render(t) {
                        return `\n\t\t\t<div data-group="${this.id}" class="${r.Globals.cssPrefix}ui-btn-segmented__group">\n\t\t\t\t${(0, n.isEmpty)(this.title) ? "" : `<p class="${r.Globals.cssPrefix}ui-btn-segmented__group-title">${this.title}</p>`}\n\t\t\t\t<div class="${r.Globals.cssPrefix}ui-btn-segments"><ul></ul></div>\n\t\t\t</div>\n\t\t`
                    }
                    _onAddedToDOM() {
                        super._onAddedToDOM();
                        const t = (this.opts.segments || []).map(t => {
                            const e = (0, n.cloneDeep)(t),
                            s = e.value.replace(/\:.+$/, "").replace(/,/, "--").replace(/;/, "__");
                            return e.id = e.id || s,
                            new a.default(Object.assign(Object.assign({}, e), {
                                    loader: !1,
                                    toggleable: !0 === this.opts.multiselect,
                                    parent: this.parentId,
                                    group: this.id
                                }))
                        });
                        this.setSegments(t)
                    }
                }
                var h = l;
                e.default = h,
                t.exports = e.default
            },
            Bl0l: function (t, e, s) {
                "use strict";
                Object.defineProperty(e, "__esModule", {
                    value: !0
                }),
                e.getDataFetcher = void 0;
                var i = o(s("D5/V")),
                a = o(s("W5Dk")),
                r = s("jNhv"),
                n = s("+mSH");
                function o(t) {
                    return t && t.__esModule ? t : {
                    default:
                        t
                    }
                }
                e.getDataFetcher = ({
                    service: t,
                    url: e,
                    dataKeypath: s,
                    restrictToTimeline: o = !0,
                    onLoad: l = (() => {}),
                    onError: h = (() => {})
                }) => {
                    let d;
                    return t ? d = (e, a, d, u, c) => {
                        const p = (0, r.isFunction)(t) ? t() : t;
                        if (!(0, r.isset)(p) || p instanceof i.default == !1)
                            return void console.error("[Aeris] Invalid ApiRequest returned for data source");
                        const f = p.param("limit") || 300,
                        g = p.param("sort") || "dt:-1";
                        u && p.setParams(u);
                        if (p.getAction() || p.action("within"), "within" === p.getAction()) {
                            if (!e)
                                return;
                            p.place((0, n.toBounds)(e))
                        }
                        o && p.from(a).to(d).limit(f).sort(g),
                        p.get().then(t => {
                            l((0, r.get)(t.data, s) || t.data, c)
                        }).catch(t => h(t, c))
                    }
                     : e && (d = (t, i, n, o, d) => {
                        const u = (0, r.isFunction)(e) ? e(o) : e;
                        a.default.request(u).then(t => {
                            l((0, r.get)(t.data, s) || t.data, d)
                        }).catch(t => h(t, d))
                    }),
                    d
                }
            },
            Bnei: function (t, e, s) {
                "use strict";
                Object.defineProperty(e, "__esModule", {
                    value: !0
                }),
                e.createAerisSource = e.identifierForLayer = e.createSource = e.createTextSource = e.createGeoJsonSource = e.createVectorSource = e.createTileSource = e.mapRequestForConfig = e.apiRequestForConfig = e.getSourceId = void 0;
                var i = h(s("D5/V")),
                a = h(s("h1m7")),
                r = s("SJ39"),
                n = s("jNhv"),
                o = s("S5Ho"),
                l = s("OmhM");
                function h(t) {
                    return t && t.__esModule ? t : {
                    default:
                        t
                    }
                }
                e.getSourceId = t => {
                    if (!(0, n.isString)(t))
                        return;
                    const e = t.split("::");
                    return e[e.length - 1]
                };
                const d = (t, e) => {
                    if (!(0, n.isset)(e))
                        return null;
                    let s = e.service;
                    if ((0, n.isset)(e.request)) {
                        const a = e.request;
                        if (s) {
                            const t = a.action,
                            e = a.parameters;
                            t && s.action(t),
                            e && s.setParams(e)
                        } else
                            a.endpoint && (s = new i.default({
                                    server: a.server,
                                    client: {
                                        id: t.id,
                                        secret: t.secret
                                    }
                                }), s.endpoint(a.endpoint), a.action && s.action(a.action), a.parameters && s.setParams(a.parameters))
                    }
                    return s
                };
                e.apiRequestForConfig = d;
                const u = (t, e) => {
                    const {
                        layer: s,
                        request: i
                    } = e,
                    r = new a.default({
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
                };
                e.mapRequestForConfig = u;
                const c = (t, e, s) => {
                    let i = (0, n.get)(e, "data.service");
                    return (0, n.isFunction)(i) && (i = i()),
                    i instanceof a.default && i.type("tile"),
                    s.tileLayer(t, i, e)
                };
                e.createTileSource = c;
                e.createVectorSource = (t, e) => new r.VectorSource(t, e);
                e.createGeoJsonSource = (t, e) => new r.GeoJsonSource(t, e);
                e.createTextSource = (t, e) => {
                    const s = (0, n.get)(e, "data.properties");
                    if (!s)
                        throw new Error("Value for `data.properties` option is required for text layers"); {
                        const {
                            timestamp: t,
                            value: e
                        } = s;
                        if (!t || !e)
                            throw new Error("Value for `data.properties.timestamp` and `data.properties.value` options are required for text layers")
                    }
                    return new r.TextSource(t, e)
                };
                const p = (t, e, s, i) => {
                    const {
                        account: a,
                        servers: o
                    } = s || {};
                    if (delete s.account, delete s.servers, -1 === ["tile", "vector", "geojson", "text"].indexOf(e))
                        return null;
                    if ("tile" === e)
                        return c(t, s, i);
                    if (s.data && !(0, n.isset)((0, n.get)(s, "data.service"))) {
                        const t = d(a, (0, n.extend)({}, {
                                    request: {
                                        server: o.api
                                    }
                                }, s.data));
                        (0, n.set)(s, "data.service", t)
                    }
                    return "vector" === e ? new r.VectorSource(t, s) : "geojson" === e ? new r.GeoJsonSource(t, s) : "text" === e ? new r.TextSource(t, s) : null
                };
                e.createSource = p;
                const f = t => t.replace(/\:[^,]+/g, "");
                e.identifierForLayer = f;
                e.createAerisSource = (t, e = {}, s, i) => {
                    const {
                        account: a,
                        servers: r,
                        timeline: h = {}
                    } = e || {},
                    d = f(t),
                    g = (0, n.get)(e, "id") || d;
                    if ((0, o.isTile)(t) || "tile" === e.type) {
                        delete e.data;
                        if (!0 === (!(0, n.isset)(e.validate) || e.validate) && !i.exists(t)) {
                            const e = i.findInvalidIds(t);
                            return void console.warn(`[Aeris] Cannot add layer(s) {${e}}, not a valid AerisWeather Maps layer. See https://www.aerisweather.com/support/docs/aeris-maps/reference/map-layers/ for the list of supported AMP layers.`)
                        }
                        const o = i.isFuture(t),
                        l = i.isBase(t),
                        d = i.isOverlay(t);
                        let p = (0, n.get)(e, "alwaysShow");
                        (0, n.isset)(p) || (p = o ? h.alwaysShowFuture : h.alwaysShowPast);
                        const f = u(a, {
                            layer: t,
                            request: {
                                server: r.maps
                            }
                        });
                        f.param("format", (0, n.get)(e, "style.format") || "png");
                        let m = e;
                        if (d || l)
                            m = (0, n.extend)(m, {
                                pane: d ? "admin" : null,
                                offset: 0,
                                alwaysShow: !0,
                                animation: {
                                    enabled: !1
                                }
                            });
                        else {
                            const t = h.intervals;
                            m = (0, n.extend)({
                                animation: {
                                    enabled: !0,
                                    intervals: t
                                }
                            }, m, {
                                offset: (0, n.get)(e, "data.offset"),
                                future: o,
                                alwaysShow: p,
                                animation: {
                                    bufferIntervals: h.bufferIntervals,
                                    showLoadingIntervals: h.showLoadingIntervals
                                }
                            })
                        }
                        m.zIndex = (0, n.get)(e, "style.zIndex");
                        const _ = c(g, (0, n.extend)(m, {
                                    data: {
                                        service: f
                                    }
                                }), s);
                        return _.updateVisibility(),
                        _
                    }
                    let m = "vector";
                    (0, o.isText)(t) && (m = "text");
                    const _ = (0, l.configForLayer)(t),
                    y = (0, n.extend)({
                        data: {
                            request: {
                                parameters: {
                                    plimit: 1
                                }
                            },
                            coordinate: t => (0, n.get)(t, "loc")
                        },
                        requiresBounds: "search" !== (0, n.get)(_, "data.request.action")
                    }, _, e);
                    return p(g, m, y, s)
                }
            },
            "Bte/": function (t, e, s) {
                "use strict";
                Object.defineProperty(e, "__esModule", {
                    value: !0
                }),
                e.default = void 0;
                var i,
                a = (i = s("AIg7")) && i.__esModule ? i : {
                default:
                    i
                },
                r = s("jNhv");
                class n extends a.default {
                    constructor(t, e, s) {
                        super(),
                        this._opacity = 1,
                        this._hidden = !1,
                        this._events = ["click", "mouseover", "mouseout"],
                        this._idPrefix = "aeris-layer",
                        this.id = s || t,
                        this._opts = (0, r.cloneDeep)(e),
                        this._opacity = (0, r.isset)(e.opacity) ? e.opacity : 1
                    }
                    get opts() {
                        return this._opts
                    }
                    get layerId() {
                        const t = this.id ? "-" + this.id : "";
                        return `${this._idPrefix}${t}`
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
                var o = n;
                e.default = o,
                t.exports = e.default
            },
            C65s: function (t, e, s) {
                "use strict";
                Object.defineProperty(e, "__esModule", {
                    value: !0
                }),
                e.default = void 0;
                var i = n(s("wAJf")),
                a = n(s("KzFB")),
                r = s("jNhv");
                function n(t) {
                    return t && t.__esModule ? t : {
                    default:
                        t
                    }
                }
                class o extends a.default {
                    constructor(t, e) {
                        super(t = (0, r.extend)({
                                units: "imperial",
                                className: t.className ? "app__ui-panel-info__content-view " + t.className : "app__ui-panel-info__content-view"
                            }, t), e),
                        this.units = t.units,
                        (0, r.isArray)(t.views) && (this._views = [], t.views.forEach(t => {
                                if ((0, r.isPlainObject)(t)) {
                                    const e = t;
                                    t = new i.default(e)
                                }
                                t instanceof i.default && this._views.push(t)
                            }))
                    }
                    get views() {
                        return this._views
                    }
                    get units() {
                        return this._units
                    }
                    set units(t) {
                        t !== this._units && (this._units = t, this.trigger("change:units", {
                                units: t
                            }), this.update())
                    }
                    load(t, e, s) {
                        let i = (0, r.isFunction)(this.opts.request) ? this.opts.request(s) : this.opts.request;
                        if (!i) {
                            const s = [];
                            this._views.forEach(i => {
                                if (i.request && (0, r.isFunction)(i.request)) {
                                    const a = i.request(t, e);
                                    a && s.push(a)
                                }
                            }),
                            s.length > 0 && (i = t.api(), s.forEach(t => {
                                    t.requests && t.requests.length > 0 ? t.requests.forEach(t => i.addRequest(t)) : i.addRequest(t)
                                }))
                        }
                        i ? (e && i.setParams(e), this.trigger("load:start"), i.get().then(t => {
                                let e = t.data || {};
                                if (e.responses && e.responses.length > 0) {
                                    const t = {};
                                    e.responses.forEach(e => {
                                        const s = e.request.replace(/\?.*$/, "").replace(/^\//, "").replace(/(\/|,)/g, "_");
                                        t[s] = e.response
                                    }),
                                    e = t
                                }
                                e = Object.assign(Object.assign({}, e), s),
                                this.update(e),
                                this.trigger("load:done")
                            }).catch(t => {
                                console.error("awxjs.InfoPanelContentView.load", t)
                            })) : s && this.update(s)
                    }
                    update(t) {
                        super.update(t, !1),
                        (0, r.isset)(this.data) && 0 !== Object.keys(this.data).length && this.$el && this.views && (this.views.forEach((e, s) => {
                                const i = this._dataForView(e);
                                !1 === e.isMounted ? this._renderView(e, t, s) : !0 !== e.static && e.update(i)
                            }), this._afterRender())
                    }
                    _render(t) {
                        return '\n\t\t\t<div class="awxjs__app__ui-panel-info__content-view"></div>\n\t\t'
                    }
                    _renderView(t, e = {}, s = -1) {
                        const i = this._dataForView(t);
                        t.update(i),
                        t.addToContentView(this, s)
                    }
                    _dataForView(t) {
                        const e = this.data,
                        s = (0, r.isFunction)(t.opts.data) ? t.opts.data((0, r.cloneDeep)(e)) : e;
                        return s && (s.units = this.units),
                        s
                    }
                    _afterRender() {
                        this.$el.parent() && this.trigger("update")
                    }
                    _onAddedToDOM() {
                        super._onAddedToDOM();
                        const t = this.data;
                        this.views && this.views.forEach(e => this._renderView(e, t))
                    }
                }
                var l = o;
                e.default = l,
                t.exports = e.default
            },
            DQdV: function (t, e, s) {
                "use strict";
                Object.defineProperty(e, "__esModule", {
                    value: !0
                }),
                e.default = void 0;
                var i,
                a = (i = s("NK6d")) && i.__esModule ? i : {
                default:
                    i
                };
                class r extends a.default {
                    constructor(t, e, s = {}, i) {
                        super(t, s, i),
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
                        e = this._points.map(t => ol.proj.transform([t.lon, t.lat], "EPSG:4326", "EPSG:3857")),
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
                }
                var n = r;
                e.default = n,
                t.exports = e.default
            },
            DSsK: function (t, e, s) {
                "use strict";
                Object.defineProperty(e, "__esModule", {
                    value: !0
                }),
                e.default = e.config = void 0;
                var i = s("jNhv");
                const a = (t = "") => {
                    switch (t = t.toLowerCase()) {
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
                    case "wind":
                        return "#d8cc00";
                    default:
                        return "#000000"
                    }
                },
                r = {
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
                            const e = (0, i.get)(t, "report.cat");
                            return {
                                className: "marker-stormreport",
                                svg: {
                                    shape: {
                                        type: "circle",
                                        fill: {
                                            color: a(e)
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
                e.config = r;
                var n = r;
                e.default = n
            },
            E4z8: function (t, e, s) {
                "use strict";
                Object.defineProperty(e, "__esModule", {
                    value: !0
                }),
                e.default = void 0;
                var i = c(s("AIg7")),
                a = c(s("NvVb")),
                r = s("7Z8C"),
                n = c(s("dYcN")),
                o = s("Lm4Y"),
                l = s("jNhv"),
                h = s("UiiV"),
                d = s("Bl0l"),
                u = c(s("lJXG"));
                function c(t) {
                    return t && t.__esModule ? t : {
                    default:
                        t
                    }
                }
                const p = {
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
                class f extends i.default {
                    constructor(t, e) {
                        var s;
                        if (super(), this.requiresBounds = !1, this._animateOnLoad = !1, this.key = t, this.enabled = !0, this.opts = (0, l.extend)({
                                data: null,
                                style: e.style || Object.assign({}, p),
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
                            (0, l.isset)(t) && (this._opacity = t),
                            ["polyline", "polygon"].forEach(t => {
                                var e,
                                s;
                                const i = ((t, e = {}) => ((0, l.isFunction)(t) ? t(e) : t) || {})(this.style[t]),
                                a = (null === (e = i.fill) || void 0 === e ? void 0 : e.opacity) || (null === (s = i.stroke) || void 0 === s ? void 0 : s.opacity);
                                (0, l.isset)(a) && (this._opacityByType[t] = a)
                            })
                        }
                        const i = this.opts.animation;
                        i.enabled && (this._animator = new u.default(this, i));
                        let a = (0, l.get)(this.opts, "data.service");
                        (0, l.isFunction)(a) && (a = a()),
                        this._service = a,
                        this.requiresBounds = (0, l.get)(this.opts, "requiresBounds")
                    }
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
                        return (null === (t = this.polygons) || void 0 === t ? void 0 : t.length) && (this.polygons[0].elements ? this.polygons.forEach(t => {
                                s = s.concat(t.elements)
                            }) : s = s.concat(this.polygons)),
                        (null === (e = this.polylines) || void 0 === e ? void 0 : e.length) && (this.polylines[0].elements ? this.polylines.forEach(t => {
                                s = s.concat(t.elements)
                            }) : s = s.concat(this.polylines)),
                        s
                    }
                    get strategy() {
                        return this._strategy
                    }
                    set strategy(t) {
                        t && (this._strategy = t, t.on("move:end", e => {
                                this._visibleBounds = a.default.fromBounds(t.getBounds())
                            }))
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
                        return (0, l.isset)(this.animation) && this.animation.isEnabled()
                    }
                    hasData() {
                        return !(0, l.isEmpty)(this.markers) || !(0, l.isEmpty)(this.polygons) || !(0, l.isEmpty)(this.polylines)
                    }
                    setData(t) {
                        this._data = (0, l.isPlainObject)(t) ? (0, l.cloneDeep)(t) : t,
                        this.render()
                    }
                    setOpacity(t = 1) {
                        this._opacity = t,
                        this.shapes.filter(t => t.adjustOpacity).forEach(e => {
                            e instanceof r.PolylineMapElement ? e.renderable.setOpacity(this._opacityByType.polyline * t) : e instanceof r.PolygonMapElement && e.renderable.setOpacity(this._opacityByType.polygon * t)
                        })
                    }
                    load(t, e = !1, s) {
                        var i;
                        const r = null === (i = this.opts) || void 0 === i ? void 0 : i.data;
                        if (!r)
                            return new Promise((t, e) => {
                                e(new Error("Invalid configuration for VectorSource"))
                            });
                        t = (0, l.extend)({}, this._lastLoadParams, t),
                        this._lastLoadParams = t,
                        this._animateOnLoad = e;
                        const {
                            service: n,
                            url: o,
                            items: h
                        } = r, {
                            bounds: u,
                            from: c,
                            to: p
                        } = t;
                        if (this.requiresBounds && !(0, l.isset)(u))
                            throw new Error(`[Aeris] Vector source ${this.key} requires coordinate bounds when loading but bounds were not provided.`);
                        if (u && (this._visibleBounds = a.default.fromBounds(u)), h)
                            return new Promise((t, e) => {
                                this._onLoad(h, (s, i) => {
                                    s ? t(s) : e(i)
                                })
                            });
                        const f = (0, d.getDataFetcher)({
                            service: n,
                            url: o,
                            dataKeypath: (0, l.get)(this.opts, "data.properties.root"),
                            restrictToTimeline: this.opts.restrictToTimeline,
                            onLoad: (t, e) => {
                                this._onLoad(t, e, s)
                            },
                            onError: (t, e) => {
                                this._onError(t, e)
                            }
                        });
                        if (n && (this._service = (0, l.isFunction)(n) ? n() : n), !(0, l.isset)(f))
                            throw new Error(`[Aeris] Cannot load data for VectorSource with key {${this.key}} due to an invalid configuration. Check that you have provided a valid "data.service" or "data.url" in your configuration. Refer to the docs for more info: https://www.aerisweather.com/support/docs/toolkits/aeris-js-sdk/map-modules/data-sources/`);
                        return this._request || (this._request = (0, l.debounce)((t, e, s, i, a) => {
                                this._loading = !0,
                                f(t, e, s, i, a)
                            }, 1500)),
                        new Promise((t, e) => {
                            this._request ? (this._loading = !0, this.trigger("data:load:start", {
                                    layer: this.key
                                }), this._request(u, c, p, this._lastLoadParams, (s, i) => {
                                    this.trigger("data:load:done", {
                                        layer: this.key
                                    }),
                                    i ? e(i) : t(s),
                                    this._startAutoUpdateIfNeeded()
                                })) : e(new Error("Invalid configuration for VectorSource"))
                        })
                    }
                    reload(t, e) {
                        this.load(t, !1, e)
                    }
                    render() {
                        if (!(0, l.isset)(this._data))
                            return;
                        let t = this.markers,
                        e = this.shapes;
                        (0, l.isEmpty)(t) || this.trigger("markers:remove", {
                            markers: t
                        }),
                        (0, l.isEmpty)(e) || this.trigger("shapes:remove", {
                            shapes: e
                        }),
                        this._result = this._process(this._data),
                        this.setOpacity(this._opacity),
                        t = this.markers,
                        e = this.shapes,
                        (0, l.isEmpty)(t) || this.trigger("markers:add", {
                            markers: t
                        }),
                        (0, l.isEmpty)(e) || this.trigger("shapes:add", {
                            shapes: e
                        })
                    }
                    reset() {
                        const t = this.markers,
                        e = this.shapes;
                        (0, l.isEmpty)(t) || this.trigger("markers:remove", {
                            markers: t
                        }),
                        (0, l.isEmpty)(e) || this.trigger("shapes:remove", {
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
                        t && (this.opts.data = (0, l.extend)(this.opts.data, t), this._request = null),
                        this.reload()
                    }
                    _onLoad(t, e, s) {
                        !1 !== this.enabled && (t && (s && ((0, l.isArray)(t) ? t = [...s, ...t] : (0, l.isPlainObject)(t) && (t = Object.assign(Object.assign({}, s), t))), this.setData(t)), this._loading = !1, this.trigger("data:load", {
                                layer: this.key,
                                results: t
                            }), (0, l.isFunction)(e) && e(this._result, null), this._animateOnLoad && this.animation && (this.animation.reset(), this.animation.play()), this._animateOnLoad = !1)
                    }
                    _onError(t, e) {
                        console.error("[Aeris] Vector source request failed", t),
                        t.stack && console.log(t.stack),
                        this._loading = !1,
                        this.trigger("data:error", {
                            error: t
                        }),
                        e && e(null, t)
                    }
                    _visibleMapObjects() {
                        let t = this.markers,
                        e = this.shapes;
                        return t = t.filter(t => {
                            const e = t.coord;
                            return !e || this._visibleBounds.contains(e)
                        }),
                        e = e.filter(t => {
                            const e = t.bounds;
                            return !e || this._visibleBounds.contains(e)
                        }), {
                            markers: t,
                            shapes: e
                        }
                    }
                    _mapObjects() {
                        let t = [];
                        if (this.polygons && (t = t.concat(this.polygons)), this.polylines && (t = t.concat(this.polylines)), 0 === t.length)
                            return null;
                        const e = Object.keys(t).reduce((e, s) => e.concat(t.map(t => t.polygons ? t.polygons.map(t => t.polygon) : t.polylines ? t.polylines.map(t => t.polyline) : t.polygon ? t.polygon : t.polyline ? t.polyline : t)), []);
                        return (0, l.flatten)(e)
                    }
                    _process(t, e) {
                        if (!this.strategy)
                            throw new Error("No map strategy defined for VectorSource but one is required.");
                        t = t || {};
                        const s = (0, l.get)(this.opts, "data.formatter");
                        s && (t = s(t));
                        const i = {},
                        a = {},
                        r = {};
                        if ((0, l.isPlainObject)(t) && "FeatureCollection" === t.type)
                            return console.warn(`[Aeris] Data for layer {${this.key}} is in GeoJSON format. Use GeoJsonSource (or "geojson" type) for this layer instead.`), null;
                        if ((0, l.isArray)(t)) {
                            const {
                                marker: s,
                                polygon: d,
                                polyline: u
                            } = this.style,
                            c = [],
                            p = (0, l.get)(this.opts, "data.properties") || {},
                            f = (0, l.get)(this.opts, "data.geometry");
                            t.forEach((t, g) => {
                                let m,
                                _,
                                y,
                                v = `awxjs-shape-${this.key}-${g}`;
                                if (p && (p.id && (v = (0, l.get)(t, p.id)), p.category && !1 === /^\[path\]/.test(p.category) && (m = (0, l.get)(t, p.category)), p.path && (_ = (0, l.get)(t, p.path)), s))
                                    if (p.points) {
                                        const s = p.points;
                                        !e && (0, l.isArray)(s) ? (y = [], s.forEach(e => {
                                                const s = (0, l.get)(t, e);
                                                s && (0, l.isArray)(s) && (y = y.concat(s))
                                            })) : y = (0, l.get)(t, s)
                                    } else
                                        y = [t];
                                if (y && s) {
                                    const t = (0, l.get)(this.opts, "data.coordinate");
                                    y.forEach(e => {
                                        const a = this._processRecord(e),
                                        r = a.loc || (t && (0, l.isFunction)(t) ? t(a) : {});
                                        if (r) {
                                            const t = {
                                                lat: r.lat,
                                                lon: r.long || r.lon
                                            },
                                            e = (0, l.isFunction)(s) ? s(a) : s;
                                            a.id = a.id || `${this.key}-${v}-${t.lat}_${t.lon}`;
                                            let d = !0;
                                            if (e && e.spacing > 0) {
                                                const s = this.strategy.coordToPoint(t);
                                                c.forEach(t => {
                                                    const i = this.strategy.coordToPoint(t);
                                                    Math.sqrt(Math.pow(s.x - i.x, 2) + Math.pow(s.y - i.y, 2)) < e.spacing && (d = !1)
                                                })
                                            }
                                            if (d) {
                                                const s = new n.default({
                                                    type: "Point",
                                                    coordinates: [t.lon, t.lat]
                                                });
                                                s.properties = a;
                                                const r = s.geometry;
                                                if (r instanceof o.Point && (0, l.isValidCoord)(r.coordinates)) {
                                                    const n = (0, h.generateMarker)(this.key, s.properties, r.coordinates, e, this.strategy.factory);
                                                    n && (i[a.id] = n, c.push(t))
                                                }
                                            }
                                        }
                                    })
                                }
                                if (_ && (d || u)) {
                                    const e = (0, l.get)(this.opts, "data.reversedCoord") || !1;
                                    let s = _;
                                    (0, l.isArray)(s) ? s.length > 0 && (0, l.isArray)(s[0]) && 2 === s[0].length && (0, l.isNumber)(s[0][0]) && (s = [s]) : s = [s],
                                    f && (0, l.isFunction)(f) && (s = s.map(t => ({
                                                    type: "Feature",
                                                    properties: t,
                                                    geometry: f(t)
                                                })));
                                    s.map(s => {
                                        if ((0, l.isArray)(s) && 2 === s[0].length) {
                                            s = {
                                                type: "Polygon",
                                                coordinates: [e ? _.map(t => [t[1], t[0]]) : s]
                                            }
                                        }
                                        const i = new n.default(s);
                                        return i.properties = (0, l.extend)({}, t, i.properties),
                                        i
                                    }).forEach(t => {
                                        let e = t.geometry,
                                        s = p.category,
                                        i = m;
                                        if (!i && s && (s = s.replace(/^\[path\]\./, ""), i = (0, l.get)(t.properties, s)), e instanceof o.Polygon ? e = new o.MultiPolygon([e.toArray(!0)]) : e instanceof o.LineString && (e = new o.MultiLineString([e.toArray(!0)])), e instanceof o.MultiPolygon) {
                                            const r = "" + (t.properties.id || v),
                                            n = Object.assign(Object.assign({}, t.properties), {
                                                id: r
                                            }),
                                            o = (0, h.generatePolygon)(this.key, n, e, d, this.strategy.factory);
                                            if (i) {
                                                let t = a[i];
                                                if (!t) {
                                                    const e = (0, l.set)({}, s, i);
                                                    t = {
                                                        data: Object.assign(Object.assign(Object.assign({}, e), n), {
                                                            awxjs_source: this.key
                                                        }),
                                                        elements: []
                                                    },
                                                    a[i] = t
                                                }
                                                t.elements.push(o)
                                            } else
                                                v && (a[v] = o)
                                        } else
                                            e instanceof o.MultiLineString && e.lines.forEach((e, n) => {
                                                const o = Object.assign(Object.assign({}, t.properties), {
                                                    id: `${t.properties.id || v}-${n}`
                                                }),
                                                d = (0, h.generatePolyline)(this.key, o, e.coordinates, u, this.strategy.factory);
                                                if (i) {
                                                    let t = a[i];
                                                    if (!t) {
                                                        const e = (0, l.set)({}, s, i);
                                                        t = {
                                                            data: Object.assign(Object.assign({}, e), {
                                                                awxjs_source: this.key
                                                            }),
                                                            elements: []
                                                        },
                                                        r[i] = t
                                                    }
                                                    t.elements.push(d)
                                                } else
                                                    v && (r[v] = d)
                                            })
                                    })
                                }
                                if (y && u) {
                                    (0, h.generateLineSegments)(y, (0, l.get)(this.opts, "data.properties.category"), (0, l.get)(this.opts, "data.coordinate")).forEach(t => {
                                        const e = (0, h.generatePolyline)(this.key, t.data, t.coords, u, this.strategy.factory);
                                        r[e.id] = e
                                    })
                                }
                            })
                        }
                        return this._markers = i,
                        this._polygons = a,
                        this._polylines = r, {
                            markers: Object.keys(i).map(t => i[t]),
                            polygons: Object.keys(a).map(t => a[t]),
                            polylines: Object.keys(r).map(t => r[t])
                        }
                    }
                    _processRecord(t) {
                        return t
                    }
                    _startAutoUpdateIfNeeded() {
                        this._stopAutoUpdate();
                        const t = (0, l.get)(this.opts, "refresh");
                        this.enabled && t > 0 && (this._refreshTimer = setTimeout(() => {
                                this.reload()
                            }, 1e3 * t))
                    }
                    _stopAutoUpdate() {
                        this._refreshTimer && (clearTimeout(this._refreshTimer), this._refreshTimer = null)
                    }
                }
                var g = f;
                e.default = g,
                t.exports = e.default
            },
            EeSF: function (t, e, s) {
                "use strict";
                Object.defineProperty(e, "__esModule", {
                    value: !0
                }),
                e.default = void 0;
                var i = o(s("KzFB")),
                a = o(s("g8Bo")),
                r = s("jNhv"),
                n = o(s("b9Bd"));
                function o(t) {
                    return t && t.__esModule ? t : {
                    default:
                        t
                    }
                }
                class l extends i.default {
                    constructor(t) {
                        t = t || {},
                        (t = (0, r.extend)({
                                placeholder: "Search",
                                autocomplete: !0,
                                autoselect: !0,
                                ui: {
                                    form: ".awxjs__ui-searchfield-form > form",
                                    input: ".awxjs__ui-searchfield-form input",
                                    submit: ".awxjs__ui-searchfield-form button",
                                    results: ".awxjs__ui-searchfield-results"
                                }
                            }, t, {
                                className: t.className ? "ui-searchfield " + t.className : "ui-searchfield"
                            })).id = t.id || t.value,
                        super(t),
                        this._selectedIndex = -1,
                        this._indicator = new a.default({
                            size: 30,
                            strokeWidth: 2
                        })
                    }
                    get value() {
                        return this.ui.input.val()
                    }
                    set value(t) {
                        this.ui.input.val(t),
                        this.ui.input.trigger("input")
                    }
                    setResults(t) {
                        this.clear(),
                        (0, r.isArray)(t) || (t = [t]),
                        this._results = (0, r.cloneDeep)(t),
                        this._renderResults(t)
                    }
                    reset() {
                        this.clear(),
                        this.ui.input.val(""),
                        this.ui.results.hide(),
                        (0, n.default)(document).off("click", this._docHandler)
                    }
                    clear() {
                        this.ui.results.empty(),
                        this._results = null,
                        this._selectedIndex = -1,
                        this.$el.removeClass("awxjs__ui-searchfield-expanded")
                    }
                    focus() {
                        this.ui.input.focus()
                    }
                    blur() {
                        this.ui.input.blur()
                    }
                    _render(t) {
                        return `\n\t\t\t<div class="awxjs__ui-searchfield">\n\t\t\t\t<div class="awxjs__ui-searchfield-container">\n\t\t\t\t\t<div class="awxjs__ui-searchfield-form">\n\t\t\t\t\t\t<form method="POST">\n\t\t\t\t\t\t\t<input type="text" value="" placeholder="${this.opts.placeholder}">\n\t\t\t\t\t\t\t<button>\n\t\t\t\t\t\t\t\t<svg version="1.1" viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">\n\t\t\t\t\t\t\t\t\t<path d="m69.777 61.273 26.562 26.562c4.25 4.3672-4.1328 12.75-8.5 8.5l-26.562-26.562c-14.641 10.508-35.066 8.9727-47.934-3.8945-14.523-14.523-14.523-38.016 0-52.539 14.523-14.523 38.016-14.523 52.539 0 12.867 12.867 14.402 33.293 3.8945 47.934zm-48.051-39.551c-9.8008 9.918-9.8008 25.855 0 35.656 9.918 9.918 25.855 9.918 35.656 0 9.918-9.8008 9.918-25.738 0-35.656-9.8008-9.8008-25.738-9.8008-35.656 0z" fill-rule="evenodd"/>\n\t\t\t\t\t\t\t\t</svg>\n\t\t\t\t\t\t\t</button>\n\t\t\t\t\t\t</form>\n\t\t\t\t\t</div>\n\t\t\t\t\t<div class="awxjs__ui-searchfield-results"></div>\n\t\t\t\t</div>\n\t\t\t</div>\n\t\t`
                    }
                    _onAddedToDOM() {
                        super._onAddedToDOM(),
                        this._indicator.appendTo(this.ui.form)
                    }
                    _setupEvents() {
                        super._setupEvents();
                        const t = this.ui.input,
                        e = (0, r.debounce)(() => {
                            const e = t.val();
                            this.trigger("change:value", {
                                value: e
                            }),
                            e.length > 3 ? this._search(t.val()) : 0 === e.length ? this.reset() : this._renderResults([])
                        }, 300);
                        this._docHandler = t => {
                            this._handleDocClick(t)
                        },
                        this._keyHandler = t => {
                            this._listenForKeys(t)
                        },
                        this.opts.autocomplete ? t.on("input", e) : t.on("input", e => {
                            ("" === t.val() || this._results && this._results.length > 0) && this.reset()
                        }),
                        this.ui.form.on("submit", e => (e.preventDefault(), this._search(t.val()), this.trigger("submit", {
                                    value: t.val()
                                }), !1)),
                        this.ui.submit.on("click", e => {
                            e.preventDefault();
                            const s = t.val();
                            (0, r.isEmpty)(s) || (this._search(s), this.trigger("submit", {
                                    value: s
                                }))
                        }),
                        t.on("focus", t => {
                            this.$el.addClass("awxjs__ui-searchfield-focused"),
                            (0, n.default)(document).off("keyup keypress", this._keyHandler),
                            (0, n.default)(document).on("keyup keypress", this._keyHandler),
                            (0, n.default)(document).off("click", this._docHandler),
                            (0, n.default)(document).on("click", this._docHandler)
                        }),
                        t.on("blur", t => {
                            this.$el.removeClass("awxjs__ui-searchfield-focused"),
                            (0, n.default)(document).off("keyup keypress", this._keyHandler)
                        })
                    }
                    _search(t) {
                        const e = (0, r.get)(this.opts, "data.request");
                        e ? (0, r.isFunction)(e) && (this._indicator.startAnimating(), e(t).then(t => {
                                this._indicator.stopAnimating(),
                                this.setResults(t)
                            })) : console.error("No request task defined for SearchField, check your component configuration.")
                    }
                    _renderResults(t) {
                        if (this.trigger("update:results", t), t) {
                            if (0 === t.length)
                                return this.ui.results.hide(), void this.$el.removeClass("awxjs__ui-searchfield-expanded");
                            const e = (0, r.get)(this.opts, "data.formatter"),
                            s = t.map((t, s) => `<li data-result="${s}">${e(t)}</li>`);
                            this.ui.results.html(`<ul>${s.join("")}</ul>`),
                            this.$el.addClass("awxjs__ui-searchfield-expanded"),
                            (0, n.default)("li", this.ui.results).on("click", t => {
                                this._handleResultClick(t)
                            }).on("mouseover", t => {
                                this._handleResultMouseover(t)
                            }),
                            this.ui.results.show(),
                            s.length > 0 && this.opts.autoselect && this._selectResultAtIndex(0)
                        } else
                            this.reset()
                    }
                    _handleResultMouseover(t) {
                        const e = (0, n.default)(t.target),
                        s = parseInt(e.data("result"), 10);
                        this._selectResultAtIndex(s)
                    }
                    _handleResultClick(t) {
                        const e = (0, n.default)(t.target),
                        s = parseInt(e.data("result"), 10);
                        this.trigger("select", {
                            result: (0, r.cloneDeep)(this._results[s]),
                            index: s
                        }),
                        this.reset()
                    }
                    _selectResultAtIndex(t) {
                        if (t !== this._selectedIndex) {
                            const e = (0, n.default)("li", this.ui.results);
                            e.removeClass("selected"),
                            t >= 0 && e.eq(t).addClass("selected"),
                            this._selectedIndex = t
                        }
                    }
                    _handleDocClick(t) {
                        const e = (0, n.default)(t.target).closest(".awxjs__ui-searchfield-container");
                        e && 0 !== e.length || this.reset()
                    }
                    _listenForKeys(t) {
                        const e = (t.key || "").toLowerCase();
                        if ("keypress" === t.type)
                            "enter" !== e && 13 !== t.keyCode || (t.preventDefault(), this.opts.autocomplete || this._results && this._results.length > 0 ? (this.trigger("key:enter"), this._selectedIndex > -1 && this._results && (this.trigger("select", {
                                            result: (0, r.cloneDeep)(this._results[this._selectedIndex]),
                                            index: this._selectedIndex
                                        }), this.reset())) : this._search(this.ui.input.val()));
                        else if ("keyup" === t.type)
                            if ("escape" === e || "esc" === e || 27 === t.keyCode)
                                this.trigger("key:escape"), this.reset();
                            else if (40 === t.keyCode) {
                                let t = this._selectedIndex;
                                this._results && t < this._results.length - 1 ? t += 1 : -1 === t && (t = 0),
                                this._selectResultAtIndex(t)
                            } else if (38 === t.keyCode) {
                                let t = this._selectedIndex;
                                t > 0 && (t -= 1),
                                this._selectResultAtIndex(t)
                            }
                    }
                }
                var h = l;
                e.default = h,
                t.exports = e.default
            },
            FdfE: function (t, e, s) {
                "use strict";
                Object.defineProperty(e, "__esModule", {
                    value: !0
                }),
                e.default = void 0;
                var i = o(s("26Hj")),
                a = s("jNhv"),
                r = s("T1DL"),
                n = o(s("0oAq"));
                function o(t) {
                    return t && t.__esModule ? t : {
                    default:
                        t
                    }
                }
                class l extends i.default {
                    constructor(t, e, s) {
                        super(t, e, s),
                        this._layerRemovedWhileLoading = !1,
                        this._tileLoadCheckInterval = null,
                        this.animation.on("reset", () => {
                            this._loadingSource && this.trigger("layer:remove", {
                                layer: this._loadingSource.overlay
                            })
                        })
                    }
                    get overlay() {
                        return this._overlay
                    }
                    set timestamp(t) {
                        this.enabled && (0, a.isset)(t) && (t = new Date(t.getFullYear(), t.getMonth(), t.getDate(), t.getHours(), t.getMinutes()), this._timestamp && t.getTime() === this._timestamp.getTime() || (this._timestamp = t, !1 === this.isAnimating() && !1 === this.isAnimationFrame && (this.animation.hide(), this.updateVisibility()), this.overlay && !1 === this.overlay.isHidden && this.canShow() && this.overlay.setUrl(this.urlTemplate())))
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
                    setOpacity(t, e = !0) {
                        this._opacity = t,
                        this.overlay && !0 === e && this.isVisible() && this.overlay.setOpacity(t),
                        this.animation && this.animation.setOpacity(t)
                    }
                    setOrder(t) {
                        this.overlay.setZIndex(t)
                    }
                    createOverlay(t, e = {}) {
                        const s = new n.default(this.key, {
                            opacity: (0, a.isset)((0, a.get)(e, "style.opacity")) ? (0, a.get)(e, "style.opacity") : 1,
                            zIndex: (0, a.get)(e, "style.zIndex")
                        }, this.identifier);
                        return s.on("map:add", t => {
                            const {
                                map: e
                            } = t.data || {};
                            e && google.maps.event.addListener(e.overlayMapTypes, "remove_at", (t, e) => {
                                this._layerRemovedWhileLoading = !0
                            })
                        }),
                        s
                    }
                    animationLayerForDate(t, e, s = !0) {
                        return new Promise((t, i) => {
                            if (this.dataSource) {
                                const i = this.dataSource.tileLayer(this.key, e, (0, a.extend)({}, this._opts, {
                                            id: `${this.identifier}-anim-${(0, r.mapTimestampFromDate)(e)}`,
                                            data: {
                                                service: this.service
                                            },
                                            style: {
                                                opacity: 0
                                            }
                                        }));
                                i.isAnimationFrame = !0,
                                i.hide();
                                const n = () => {
                                    t(i),
                                    this._loadingSource = null
                                };
                                this._loadingSource = i,
                                s ? (this._tileLoadCheckInterval = setTimeout(() => {
                                        this._layerRemovedWhileLoading && n(),
                                        this._layerRemovedWhileLoading = !1
                                    }, 2e3), i.overlay.once("load", () => {
                                        this._tileLoadCheckInterval && window.clearInterval(this._tileLoadCheckInterval),
                                        this._tileLoadCheckInterval = null,
                                        n()
                                    })) : n(),
                                i.on("layer:remove", () => {
                                    this.trigger("layer:remove", {
                                        layer: i.overlay
                                    })
                                }),
                                this.trigger("layer:add", {
                                    layer: i.overlay
                                })
                            } else
                                i(new Error("No map strategy data source provided"))
                        })
                    }
                }
                var h = l;
                e.default = h,
                t.exports = e.default
            },
            GIM7: function (t, e, s) {
                "use strict";
                Object.defineProperty(e, "__esModule", {
                    value: !0
                }),
                e.default = void 0;
                var i = s("jNhv"),
                a = n(s("KuXL")),
                r = n(s("wEP0"));
                function n(t) {
                    return t && t.__esModule ? t : {
                    default:
                        t
                    }
                }
                var o = function (t, e) {
                    var s = {};
                    for (var i in t)
                        Object.prototype.hasOwnProperty.call(t, i) && e.indexOf(i) < 0 && (s[i] = t[i]);
                    if (null != t && "function" == typeof Object.getOwnPropertySymbols) {
                        var a = 0;
                        for (i = Object.getOwnPropertySymbols(t); a < i.length; a++)
                            e.indexOf(i[a]) < 0 && Object.prototype.propertyIsEnumerable.call(t, i[a]) && (s[i[a]] = t[i[a]])
                    }
                    return s
                };
                const l = {
                    opacity: {
                        type: "slider",
                        label: "Opacity",
                        options: {
                            value: [100],
                            range: {
                                min: 0,
                                max: 100
                            },
                            marksEvery: "% 50",
                            marksFormatter: t => t + "%",
                            step: 5,
                            dots: !1,
                            tooltip: t => t + "%"
                        }
                    }
                };
                class h extends a.default {
                    constructor(t) {
                        super(t),
                        this.initialize()
                    }
                    _render(t) {
                        return '\n\t\t\t<div class="awxjs__ui-layer-controls"></div>\n\t\t'
                    }
                    _setupEvents() {
                        super._setupEvents();
                        (this.opts.controls || []).map(t => {
                            const {
                                type: e
                            } = t,
                            s = o(t, ["type"]);
                            return Object.keys(l).indexOf(e) > -1 ? (0, i.extend)({}, l[e], s) : t
                        }).forEach(({
                                type: t,
                                id: e,
                                label: s,
                                options: a
                            }) => {
                            const n = e || s.replace(/\s+/, "-").toLowerCase();
                            if ("slider" === t) {
                                const t = new r.default((0, i.extend)(Object.assign(Object.assign({}, a), {
                                                title: s,
                                                width: 150
                                            }), {}));
                                t.addTo(this.$el),
                                t.on("change", t => {
                                    let e = (0, i.get)(t, "data.value");
                                    e && (0, i.isset)(e[0]) && (e = e[0]),
                                    this.trigger("change", {
                                        id: n,
                                        value: e
                                    })
                                })
                            }
                        })
                    }
                }
                var d = h;
                e.default = d,
                t.exports = e.default
            },
            GK1F: function (t, e, s) {
                "use strict";
                Object.defineProperty(e, "__esModule", {
                    value: !0
                }),
                e.SVG = void 0;
                var i = s("jNhv");
                const a = (t, e, s, a) => {
                    let r = 0,
                    n = 0;
                    if (a = (0, i.extend)({
                            x: 0,
                            y: 0
                        }, a), (0, i.isString)(t)) {
                        const i = t;
                        r = (s.width - e.width) / 2,
                        n = (s.height - e.height) / 2,
                        /^top/.test(i) ? n = 0 : /^bottom/.test(i) && (n = s.height - e.height),
                        /left$/.test(i) ? r = 0 : /right$/.test(i) && (r = s.width - e.width)
                    } else {
                        const e = t;
                        r = e.x,
                        n = e.y
                    }
                    return r += a.x,
                    n += a.y, {
                        x: r,
                        y: n
                    }
                },
                r = t => {
                    const e = t.stroke ? Object.keys(t.stroke).reduce((e, s) => {
                        const a = t.stroke[s];
                        return (0, i.isset)(a) && ("width" === s && (e += ` stroke-width="${a}"`), "color" === s && (e += ` stroke="${a}"`), "opacity" === s && (e += ` stroke-opacity="${a}"`)),
                        e
                    }, "") : "",
                    s = t.fill ? Object.keys(t.fill).reduce((e, s) => {
                        const a = t.fill[s];
                        return (0, i.isset)(a) && ("color" === s && (e += ` fill="${a}"`), "opacity" === s && (e += ` fill-opacity="${a}"`)),
                        e
                    }, "") : "";
                    return s || e ? `${s}${e}` : ""
                };
                var n;
                e.SVG = n,
                function (t) {
                    t.calculateTextSize = (t, e, s, a) => {
                        let r = 0,
                        n = 0;
                        if (a = a || [0, 0], e = e || 12, window && window.document) {
                            const a = window.document,
                            o = a.createElement("text");
                            o.style.fontSize = (0, i.isString)(e) ? "" + e : e + "px",
                            o.style.fontWeight = s || "normal",
                            o.style.visibility = "hidden",
                            o.innerHTML = t,
                            a.body.appendChild(o);
                            const l = o.getBoundingClientRect();
                            a.body.removeChild(o),
                            l.width > 0 && (r = l.width),
                            l.height > 0 && (n = l.height)
                        }
                        const [o, l] = a;
                        return r += 2 * o,
                        n += 2 * l,
                        [r, n]
                    },
                    t.path = (t, e) => {
                        e = (0, i.extend)({
                            stroke: {
                                opacity: 1
                            },
                            fill: {
                                color: "#ffffff",
                                opacity: 1
                            }
                        }, e);
                        const s = r(e);
                        return `<g${e.transform ? ` transform="${e.transform}"` : ""}><path d="${t}"${s} /></g>`
                    },
                    t.rect = (e, s, a) => {
                        a = (0, i.extend)({
                            margin: 0,
                            radius: 0,
                            stroke: null,
                            fill: {
                                color: "#ffffff",
                                opacity: 1
                            }
                        }, a);
                        const {
                            margin: r,
                            radius: n
                        } = a;
                        let o = r;
                        a.stroke && a.stroke.width > 0 && (o += a.stroke.width / 2, e -= a.stroke.width, s -= a.stroke.width);
                        let l = `M${o + n},${o} `;
                        return l += `L${o + e - n},${o} `,
                        n > 0 && (l += `A${n},${n} 0 0,1 ${o + e},${o + n} `),
                        l += `L${o + e},${o + s - n} `,
                        n > 0 && (l += `A${n},${n} 0 0,1 ${o + e - n},${o + s} `),
                        l += `L${o + n},${o + s} `,
                        n > 0 && (l += `A${n},${n} 0 0,1 ${o},${o + s - n} `),
                        l += `L${o},${o + n} `,
                        n > 0 && (l += `A${n},${n} 0 0,1 ${o + n},${o} `),
                        l += "Z",
                        t.path(l, a)
                    },
                    t.circle = (t, e) => {
                        const s = 2 * (((e = (0, i.extend)({
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
                                        }, e)).radius || 8) + ((0, i.get)(e, "stroke.width") || 0) + 1),
                        n = a(e.position, {
                            width: s,
                            height: s
                        }, t, e.translate),
                        o = r(e);
                        return n.x += s / 2,
                        n.y += s / 2,
`<circle${e.transform ? ` transform="${e.transform}"` : ""} cx="${n.x}" cy="${n.y}" r="${e.radius}"${o} />`
                    },
                    t.text = (e, s, r) => {
                        r = (0, i.extend)({
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
                        }, r),
                        e = e || r.value;
                        const [n, o] = t.calculateTextSize("" + e, r.size, r.style, r.padding);
                        r.translate.y += o - 1;
                        const l = a(r.position, {
                            width: n,
                            height: o
                        }, s, r.translate);
                        let h = "";
                        if (r.stroke) {
                            const {
                                color: t = "#333333",
                                width: s = 2
                            } = r.stroke;
                            h += `<text${r.transform ? ` transform="${r.transform}"` : ""} dominent-baseline="hanging" text-anchor="${r.anchor}" x="${l.x}" y="${l.y}" style="font-family:${r.font};font-size:${r.size}px;font-weight:${r.style};" stroke="${t}" stroke-width="${s}">${e || ""}</text>`
                        }
                        return h += `<text${r.transform ? ` transform="${r.transform}"` : ""} dominent-baseline="hanging" text-anchor="${r.anchor}" x="${l.x}" y="${l.y}" style="font-family:${r.font};font-size:${r.size}px;font-weight:${r.style};" fill="${r.color}">${e || ""}</text>`,
                        h
                    },
                    t.image = (t, e, s) => {
                        s = (0, i.extend)({
                            position: "center",
                            size: [30, 30]
                        }, s),
                        t = t || s.url;
                        const [r, n] = s.size,
                        o = a(s.position, {
                            width: r,
                            height: n
                        }, e, s.translate),
                        [l, h] = s.size;
                        return `<image${s.transform ? ` transform="${s.transform}"` : ""} x="${o.x}" y="${o.y}" width="${l}" height="${h}" xlink:href="${t}" />`
                    },
                    t.svg = (t, e, s, i = null) => `<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" version="1.1" width="${t}" height="${e}"${i ? ` viewBox="${i}"` : ""}>\n\t\t\t${(s || []).map(t => t).join("")}\n\t\t</svg>`,
                    t.draw = (e, s, a) => {
                        const {
                            value: r
                        } = a;
                        let n = !0,
                        o = !1;
                        const {
                            shape: l,
                            text: h,
                            image: d
                        } = a;
                        let u = [];
                        const c = [];
                        if (h) {
                            const a = (a, r) => {
                                const n = a || r.value || "",
                                o = r.x || 0,
                                h = r.y || 0,
                                d = r.size || 12,
                                [u, c] = t.calculateTextSize(n, d, r.style, r.padding),
                                p = !(0, i.isset)(r.autosize) || r.autosize;
                                if ((0, i.isEmpty)(n))
                                    return null;
                                p && (u && c ? (e = u, s = c) : (e = 5 * n.length, s = d + 2));
                                let f = 0;
                                l && l.stroke && (f = l.stroke.width / 2 || 0);
                                return t.text(n, {
                                    width: e,
                                    height: s
                                }, (0, i.extend)(r, {
                                        x: f + e / 2 + o,
                                        y: f + Math.round(s - (s - .7 * d) / 2) + h
                                    }))
                            };
                            if ((0, i.isArray)(h))
                                h.forEach(t => {
                                    const e = a(r, t);
                                    e && c.push(e)
                                });
                            else {
                                const t = a(r, h);
                                t && c.push(t)
                            }
                            c.length > 0 && (o = !0)
                        }
                        if (l) {
                            let a = e,
                            r = s;
                            const {
                                type: n,
                                size: o
                            } = l;
                            if (o && 2 === o.length && (a = o[0], r = o[1]), "rect" === n) {
                                const e = t.rect(a, r, l);
                                u.push(e)
                            } else if ("path" === n) {
                                const e = t.path((0, i.get)(l, "path"), l);
                                u.push(e)
                            } else {
                                const n = (0, i.get)(l, "stroke.width") || 0;
                                l.radius = Math.floor((a - 2 * n) / 2),
                                l.center = {
                                    x: Math.round(a / 2) + 1,
                                    y: Math.round(r / 2) + 1
                                };
                                const o = t.circle({
                                    width: e,
                                    height: s
                                }, l);
                                u.push(o)
                            }
                        }
                        if (d) {
                            const a = d.url;
                            if (a) {
                                const r = d.x || 0,
                                n = d.y || 0,
                                o = {
                                    x: e / 2,
                                    y: s / 2
                                },
                                [l, h] = d.size || [30, 30],
                                c = t.image(a, {
                                    width: e,
                                    height: s
                                }, (0, i.extend)(d, {
                                            x: o.x - l / 2 + r,
                                            y: o.y - h / 2 + n
                                        }));
                                u.push(c)
                            }
                        }
                        return c.length > 0 ? u = u.concat(c) : o && (n = !1),
                        n ? t.svg(e, s, u, a.viewBox) : null
                    }
                }
                (n || (e.SVG = n = {}))
            },
            GpM6: function (t, e, s) {
                "use strict";
                Object.defineProperty(e, "__esModule", {
                    value: !0
                }),
                e.default = e.buttonIdentifier = void 0;
                var i = n(s("KuXL")),
                a = n(s("KqXO")),
                r = s("jNhv");
                function n(t) {
                    return t && t.__esModule ? t : {
                    default:
                        t
                    }
                }
                const o = t => (t || "").replace(/\:.+$/, "").replace(/[^a-zA-Z0-9]/g, "-").replace(/-+/g, "-").replace(/,/g, "__").toLowerCase();
                e.buttonIdentifier = o;
                class l extends i.default {
                    constructor(t) {
                        (t = (0, r.extend)({
                                toggleable: !0,
                                controls: {
                                    close: !0,
                                    activity: !0
                                }
                            }, t, {
                                className: t.className ? "ui-btn " + t.className : "ui-btn",
                                ui: {
                                    target: ".awxjs__ui-btn-target",
                                    label: ".awxjs__ui-btn-label",
                                    close: ".awxjs__ui-btn-close",
                                    settings: ".awxjs__ui-btn-settings",
                                    controls: ".awxjs__ui-btn-controls"
                                }
                            })).id = t.id || (t.value ? t.value.replace(/,/g, "__") : null),
                        super(t),
                        t.controls && (this._controls = new a.default({
                                controls: t.controls
                            })),
                        this.setState({
                            selected: !1
                        }),
                        this.initialize()
                    }
                    get id() {
                        return o(this.opts.id || this.opts.value)
                    }
                    get key() {
                        return `${this.parentId ? this.parentId + "::" : ""}${this.groupId ? this.groupId + "::" : ""}${this.id}`
                    }
                    get parentId() {
                        return this.opts.parent
                    }
                    get groupId() {
                        return this.opts.group
                    }
                    get info() {
                        return {
                            id: this.id,
                            key: this.key,
                            value: this.value,
                            group: this.groupId,
                            parent: this.parentId,
                            options: this.options
                        }
                    }
                    get selected() {
                        const {
                            selected: t
                        } = this.state;
                        return t
                    }
                    get toggleable() {
                        return this.opts.toggleable
                    }
                    get controls() {
                        return this._controls
                    }
                    get value() {
                        return this.opts.value
                    }
                    get title() {
                        return this.opts.title
                    }
                    get options() {
                        return this.opts.options
                    }
                    select(t = !0) {
                        !1 === this.selected && (this.$el.addClass("selected"), this._onSelect(t))
                    }
                    deselect(t = !0) {
                        this.selected && (this.$el.removeClass("selected"), this._onDeselect(t))
                    }
                    disable(t) {
                        this.$el.attr("data-disabled", t ? 1 : 0)
                    }
                    matches(t) {
                        return ((0, r.isArray)(t) ? t : [t]).filter(t => this.id === t || this.key === t || this.value === t).length > 0
                    }
                    setLoading(t) {
                        this.controls && this.controls.setLoading(t)
                    }
                    _onSelect(t = !0) {
                        this.setState({
                            selected: !0
                        }),
                        t && this.trigger("select", {
                            value: this.value
                        })
                    }
                    _onDeselect(t = !0) {
                        this.setState({
                            selected: !1
                        }),
                        t && this.trigger("deselect", {
                            value: this.value
                        })
                    }
                    _render() {
                        return `\n\t\t\t<div class="awxjs__ui-btn">\n\t\t\t\t<div class="awxjs__ui-btn-target">\n\t\t\t\t\t<div class="awxjs__ui-btn-label">${this.opts.title}</div>\n\t\t\t\t</div>\n\t\t\t</div>\n\t\t`
                    }
                    _onAddedToDOM() {
                        super._onAddedToDOM(),
                        this.$el.attr("data-id", this.id),
                        this.opts.selected && this.select(),
                        this.controls && this.controls.addToButton(this)
                    }
                    _setupEvents() {
                        super._setupEvents(),
                        this.$el.on("click", t => {
                            t.stopPropagation();
                            (0, r.toBool)(this.$el.attr("data-disabled")) || !1 || (this.selected ? this.toggleable && this.deselect() : this.select())
                        });
                        const t = this.controls;
                        t && (t.on("change", t => {
                                this.trigger("control:change", Object.assign(Object.assign({}, this.info), {
                                        control: Object.assign({}, t.data)
                                    }))
                            }), t.ui.settings && !this.opts.selected && t.ui.settings.hide(), t.ui.close && this.ui.target.on("mouseenter", () => {
                                this.$el.hasClass("selected") && !0 !== (0, r.toBool)(this.$el.attr("data-disabled")) && t.ui.close.css("opacity", 1)
                            }).on("mouseleave", e => {
                                t.ui.close.css("opacity", 0)
                            }))
                    }
                }
                var h = l;
                e.default = h
            },
            HAIv: function (t, e, s) {
                "use strict";
                Object.defineProperty(e, "__esModule", {
                    value: !0
                }),
                e.default = void 0;
                var i = d(s("7rjk")),
                a = d(s("rpc3")),
                r = function (t) {
                    if (t && t.__esModule)
                        return t;
                    if (null === t || "object" != typeof t && "function" != typeof t)
                        return {
                        default:
                            t
                        };
                    var e = h();
                    if (e && e.has(t))
                        return e.get(t);
                    var s = {},
                    i = Object.defineProperty && Object.getOwnPropertyDescriptor;
                    for (var a in t)
                        if (Object.prototype.hasOwnProperty.call(t, a)) {
                            var r = i ? Object.getOwnPropertyDescriptor(t, a) : null;
                            r && (r.get || r.set) ? Object.defineProperty(s, a, r) : s[a] = t[a]
                        }
                    s.default = t,
                    e && e.set(t, s);
                    return s
                }
                (s("76qJ")),
                n = s("T1DL"),
                o = s("jNhv"),
                l = d(s("b9Bd"));
                function h() {
                    if ("function" != typeof WeakMap)
                        return null;
                    var t = new WeakMap;
                    return h = function () {
                        return t
                    },
                    t
                }
                function d(t) {
                    return t && t.__esModule ? t : {
                    default:
                        t
                    }
                }
                class u extends i.default {
                    constructor(t, e) {
                        super(t, (0, o.extend)({
                                style: null,
                                map: {
                                    worldCopyJump: !0
                                }
                            }, e)),
                        this._clickedMapLayer = !1
                    }
                    get strategy() {
                        return "leaflet"
                    }
                    get $el() {
                        return (0, l.default)(this.map.getContainer())
                    }
                    loadDependencies() {
                        return new Promise((t, e) => {
                            if ("undefined" == typeof L || void 0 === L.map) {
                                const e = "1.7.0";
                                Promise.all([(0, o.loadStyles)(`https://unpkg.com/leaflet@${e}/dist/leaflet.css`), (0, o.loadScript)(`https://unpkg.com/leaflet@${e}/dist/leaflet.js`)]).then(() => {
                                    t()
                                })
                            } else
                                t()
                        })
                    }
                    setupMap(t) {
                        this._factory = new a.default,
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
                            t && (0, o.isset)(t.lat) && (0, o.isset)(t.lng) && (0, o.set)(this.opts, "center", {
                                lat: t.lat,
                                lon: t.lng
                            }),
                            s && (0, o.set)(this.opts, "zoom", s)
                        }
                        if ((0, n.isLeaflet)(t))
                            this._setInitialView = !1, this._map = t;
                        else {
                            if ((0, o.isString)(t) && (t = (0, l.default)(t)), (0, o.isArray)(t) && t.length > 0)
                                t = t[0];
                            else if ((0, o.isDOM)(t)) {
                                t = t[0]
                            }
                            this._map = L.map(t, (0, o.extend)({
                                        zoomControl: !1
                                    }, this.opts.map));
                            !1 === (0, o.get)(this.opts, "map.zoomControl") || L.control.zoom({
                                position: "bottomleft"
                            }).addTo(this._map),
                            (0, o.isset)(this.opts.center) || (0, o.set)(this.opts, "center", {
                                lat: 43,
                                lon: -93
                            }),
                            (0, o.isset)(this.opts.zoom) || (0, o.set)(this.opts, "zoom", 7),
                            this.map.createPane("base"),
                            this.map.getPane("base").style.zIndex = "199";
                            const e = (0, o.get)(this.opts, "style");
                            (0, o.isEmpty)(e) ? this._baseLayer = L.tileLayer("https://{s}.tile.osm.org/{z}/{x}/{y}.png", {
                                attribution: '&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors',
                                pane: "base"
                            }) : this._baseLayer = L.tileLayer(e, {
                                pane: "base"
                            }),
                            this._baseLayer.addTo(this.map)
                        }
                        this.map.createPane("admin"),
                        this.map.getPane("admin").style.zIndex = "210",
                        setTimeout(() => {
                            this.trigger("map:ready")
                        }, 250)
                    }
                    setBaseUrl(t) {
                        (0, o.isEmpty)(t) || (this._baseLayer && this._baseLayer.remove(), this._baseLayer = L.tileLayer(t, {
                                pane: "base"
                            }), this._baseLayer.addTo(this.map))
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
                    fitBounds(t, e = [10, 10]) {
                        if (!this._map)
                            return;
                        const s = new L.LatLng(t.south, t.west),
                        i = new L.LatLng(t.north, t.east),
                        a = new L.LatLngBounds(s, i);
                        if (!a.isValid())
                            return void console.warn(`[Aeris] Cannot fit bounds, invalid bounds - nw: ${t.north}, ${t.west}; se: ${t.south}, ${t.east}`);
                        const r = {};
                        2 === e.length ? r.padding = L.point(e[0], e[1]) : 4 === e.length && (r.paddingTopLeft = L.point(e[3], e[0]), r.paddingBottomRight = L.point(e[1], e[2])),
                        this.map.fitBounds(a, r)
                    }
                    isTile(t) {
                        return t instanceof r.TileSource
                    }
                    isMarker(t) {
                        return t instanceof L.Marker
                    }
                    isPolygon(t) {
                        return t instanceof r.Polygon
                    }
                    isPolyline(t) {
                        return t instanceof r.Polyline
                    }
                    addOverlay(t) {
                        (t instanceof L.Layer || t instanceof L.TileLayer) && t.addTo(this.map)
                    }
                    removeOverlay(t) {
                        (t instanceof L.Layer || t instanceof L.TileLayer) && t.remove()
                    }
                    addMarker(t, e) {
                        t instanceof r.Marker ? (t.on("click", () => this.trigger("marker:click", {
                                    data: e,
                                    marker: t
                                })), t.on("mouseover", () => this.trigger("marker:mouseover", {
                                    data: e,
                                    marker: t
                                })), t.on("mouseout", () => this.trigger("marker:mouseout", {
                                    data: e,
                                    marker: t
                                })), t.addTo(this.map)) : t instanceof L.Marker && t.addTo(this.map),
                        super.addMarker(t, e)
                    }
                    removeMarker(t) {
                        t instanceof r.Marker ? (t.offAll(), t.remove()) : t instanceof L.Marker && t.remove(),
                        super.removeMarker(t)
                    }
                    updateMarker(t, e, s = null) {
                        e && t instanceof r.Marker && t.update(e)
                    }
                    bindCalloutToMarker(t, e) {}
                    addShape(t, e) {
                        (t instanceof r.Polyline || t instanceof r.Polygon) && (t.on("click", () => this.trigger("shape:click", {
                                    data: e,
                                    shape: t
                                })), t.on("mouseover", () => this.trigger("shape:mouseover", {
                                    data: e,
                                    shape: t
                                })), t.on("mouseout", () => this.trigger("shape:mouseout", {
                                    data: e,
                                    shape: t
                                })), t.addTo(this.map)),
                        super.addShape(t, e)
                    }
                    removeShape(t) {
                        (t instanceof r.Polyline || t instanceof r.Polygon) && (t.offAll(), t.remove()),
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
                        (0, n.isCoordObject)(t) ? this.map.openPopup(e, new L.LatLng(t.lat, t.lon), s) : this.isMarker(t) && t.unbindPopup().bindPopup(e, s).openPopup()
                    }
                    _setupEvents() {
                        super._setupEvents(),
                        this.map.on("movestart", t => {
                            ["before:change:bounds", "before:change:center"].forEach(t => this.trigger(t))
                        }),
                        this.map.on("moveend", t => {
                            ["after:change:bounds", "after:change:center", "change:bounds", "change:center"].forEach(t => this.trigger(t))
                        }),
                        this.map.on("zoomstart", t => {
                            ["before:change:zoom"].forEach(t => this.trigger(t))
                        }),
                        this.map.on("zoomend", t => {
                            ["after:change:zoom", "change:zoom"].forEach(t => this.trigger(t))
                        })
                    }
                    _shouldTriggerEvent(t) {
                        return "click" !== t || !1 === this._clickedMapLayer
                    }
                    _dataForMapEvent(t, e) {
                        if (!e)
                            return null;
                        let s = null;
                        switch (t) {
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
                }
                var c = u;
                e.default = c,
                t.exports = e.default
            },
            IRno: function (t, e, s) {
                "use strict";
                Object.defineProperty(e, "__esModule", {
                    value: !0
                }),
                e.default = void 0;
                var i = o(s("KuXL")),
                a = s("jNhv"),
                r = o(s("b9Bd")),
                n = s("+mSH");
                function o(t) {
                    return t && t.__esModule ? t : {
                    default:
                        t
                    }
                }
                class l extends i.default {
                    constructor(t) {
                        (t = (0, a.extend)({
                                enabled: !0,
                                toggleable: !1,
                                ui: {
                                    container: ".awxjs__app__ui-panel-container",
                                    toolbar: ".awxjs__app__ui-panel-toolbar",
                                    content: ".awxjs__app__ui-panel-content",
                                    toggle: ".awxjs__app__ui-panel-toggle",
                                    close: ".awxjs__app__ui-panel-close"
                                }
                            }, t)).className = (0, a.isset)(t.className) ? "app__ui-panel " + t.className : "app__ui-panel",
                        super(t),
                        this._bounds = {},
                        this.setState({
                            visible: !0 !== this.opts.toggleable,
                            maxContentSize: {
                                width: 1e4,
                                height: 1e4
                            }
                        })
                    }
                    get content() {
                        return this.ui.content
                    }
                    get toolbar() {
                        return this.ui.toolbar
                    }
                    get visible() {
                        const {
                            visible: t
                        } = this.state;
                        return t
                    }
                    open() {
                        !1 !== this.opts.toggleable && (this.setState({
                                visible: !0
                            }), this._updateSize(), this.$el.addClass("awxjs__app__ui-panel-toggleable-open"))
                    }
                    close() {
                        !1 !== this.opts.toggleable && (this.setState({
                                visible: !1
                            }), this._updateSize(), this.$el.removeClass("awxjs__app__ui-panel-toggleable-open"))
                    }
                    toggle() {
                        this.visible ? this.close() : this.open()
                    }
                    getContentContainer() {
                        return this.ui.content
                    }
                    size() {
                        if (!this.$el)
                            return {
                                width: 0,
                                height: 0
                            };
                        let t = this.$el;
                        return this.opts.toggleable && this.ui.toggle ? t = this.ui.toggle : this.ui.content && (t = this.ui.content), {
                            width: t.outerWidth(!0),
                            height: t.outerHeight(!0)
                        }
                    }
                    contentSize() {
                        const t = {
                            width: 0,
                            height: 0
                        },
                        e = this.getContentContainer(),
                        s = (e[0].style.height, e[0].style.width);
                        let i = (0, n.prefixCSSClassName)(this.opts.className);
                        i = "awxjs__app__component " + i;
                        let a = (0, r.default)(`\n\t\t\t<div id="awxjs__panel-calc" class="${i}" style="display:inline-block;visibility:none;left:-10000px;width:${s}">\n\t\t\t\t<div class="awxjs__app__ui-panel-content">\n\t\t\t\t\t${e.html()}\n\t\t\t\t</div>\n\t\t\t</div>\n\t\t`);
                        (0, r.default)("body").append(a),
                        a = (0, r.default)("#awxjs__panel-calc"),
                        t.width = a.outerWidth(!0),
                        t.height = a.outerHeight(!0);
                        const o = {
                            width: 0,
                            height: 0
                        };
                        return a.children().forEach(e => {
                            if ("absolute" !== window.getComputedStyle(e).position) {
                                const s = (0, r.default)(e);
                                o.width = Math.max(t.width, s.outerWidth(!0)),
                                o.height += s.outerHeight(!0)
                            }
                        }),
                        t.height = Math.max(t.height, o.height),
                        t.height = Math.min(t.height, this.state.maxContentSize.height),
                        a.remove(),
                        t
                    }
                    setContentSize(t, e = !0) {
                        e && (t.height -= this.toolbar.outerHeight()),
                        this.ui.content.css({
                            "max-height": t.height + "px",
                            width: t.width + "px",
                            overflow: "auto"
                        })
                    }
                    setMaxContentSize(t) {
                        this.setState({
                            maxContentSize: t
                        });
                        const e = this.contentSize();
                        this.setContentSize(e, !1),
                        this._updateSize()
                    }
                    _updateSize() {
                        if (!this.opts.toggleable)
                            return;
                        if (!this.ui.close)
                            return;
                        const t = {
                            width: 0,
                            height: 0
                        };
                        if (this.visible && this._bounds.content) {
                            let {
                                height: e,
                                width: s
                            } = this.contentSize();
                            this.ui.content.padding();
                            e += this.ui.toolbar.outerHeight(!0),
                            t.width = s,
                            t.height = e
                        } else if (!this.visible && this._bounds.toggle) {
                            const {
                                height: e,
                                width: s
                            } = this._bounds.toggle;
                            t.width = s,
                            t.height = e
                        }
                        this.ui.container.css({
                            "max-height": t.height + "px",
                            "max-width": t.width + "px"
                        }),
                        this.$el.css({
                            "min-height": t.height + "px",
                            "min-width": t.width + "px"
                        })
                    }
                    _render() {
                        return `\n\t\t\t<div class="awxjs__app__ui-panel">\n\t\t\t\t<div class="awxjs__app__ui-panel-container">\n\t\t\t\t\t<div class="awxjs__app__ui-panel-toolbar">\n\t\t\t\t\t\t${this.opts.title ? `<div class="awxjs__app__ui-panel-title">${this.opts.title}</div>` : ""}\n\t\t\t\t\t\t<button class="awxjs__app__ui-panel-close">\n\t\t\t\t\t\t\t<svg version="1.1" viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">\n\t\t\t\t\t\t\t\t<path d="m22.699 77.301c0.80078 0.80078 1.8008 1.1992 2.8008 1.1992s2-0.39844 2.8008-1.1992l21.699-21.602 21.699 21.699c0.80078 0.80078 1.8008 1.1992 2.8008 1.1992s2-0.39844 2.8008-1.1992c1.6016-1.6016 1.6016-4.1016 0-5.6992l-21.602-21.699 21.699-21.699c1.6016-1.6016 1.6016-4.1016 0-5.6992-1.6016-1.6016-4.1016-1.6016-5.6992 0l-21.699 21.699-21.699-21.602c-1.6016-1.6016-4.1016-1.6016-5.6992 0-1.6016 1.6016-1.6016 4.1016 0 5.6992l21.699 21.602-21.602 21.699c-1.5977 1.5-1.5977 4.1016 0 5.6016z"/>\n\t\t\t\t\t\t\t</svg>\n\t\t\t\t\t\t</button>\n\t\t\t\t\t</div>\n\t\t\t\t\t<div class="awxjs__app__ui-panel-content"></div>\n\t\t\t\t\t<div class="awxjs__app__ui-panel-toggle">${this.opts.icon}</div>\n\t\t\t\t</div>\n\t\t\t</div>\n\t\t`
                    }
                    _layout() {
                        if (super._layout(), this.ui.content) {
                            const t = this.contentSize();
                            if (t.width > 0 && t.height > 0) {
                                const e = this.ui.content.padding();
                                this._bounds.content = (0, a.extend)(this.ui.content.bounds(), {
                                    height: t.height + e.top + e.bottom,
                                    width: t.width + e.left + e.right
                                })
                            }
                        }
                        this.ui.toggle && (this._bounds.toggle = this.ui.toggle.bounds()),
                        this._updateSize()
                    }
                    _afterRender() {
                        this.opts.toggleable && this.$el.addClass("awxjs__app__ui-panel-toggleable")
                    }
                    _onAddedToDOM() {
                        super._onAddedToDOM(),
                        this.opts.toggleable && this.close()
                    }
                    _setupEvents() {
                        this.opts.toggleable && (this.ui.toggle.on("click", () => {
                                this.open()
                            }), this.ui.close.on("click", () => {
                                this.close()
                            }))
                    }
                }
                var h = l;
                e.default = h,
                t.exports = e.default
            },
            IpC2: function (t, e, s) {
                "use strict";
                Object.defineProperty(e, "__esModule", {
                    value: !0
                }),
                e.default = void 0;
                var i,
                a = (i = s("NK6d")) && i.__esModule ? i : {
                default:
                    i
                },
                r = s("jNhv");
                class n extends a.default {
                    constructor(t, e, s = {}, i) {
                        super(t, s, i),
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
                        a = (this._polygons || []).map(t => {
                            !(0, r.isset)(s) && (0, r.isset)(t.id) && (s = t.id);
                            return [t.outer.map(t => [t.lon, t.lat]), ...t.inner ? t.inner.map(t => t.map(t => [t.lon, t.lat])) : []]
                        });
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
                }
                var o = n;
                e.default = o,
                t.exports = e.default
            },
            JD76: function (t, e, s) {
                "use strict";
                Object.defineProperty(e, "__esModule", {
                    value: !0
                }),
                e.default = void 0;
                var i = d(s("7rjk")),
                a = function (t) {
                    if (t && t.__esModule)
                        return t;
                    if (null === t || "object" != typeof t && "function" != typeof t)
                        return {
                        default:
                            t
                        };
                    var e = h();
                    if (e && e.has(t))
                        return e.get(t);
                    var s = {},
                    i = Object.defineProperty && Object.getOwnPropertyDescriptor;
                    for (var a in t)
                        if (Object.prototype.hasOwnProperty.call(t, a)) {
                            var r = i ? Object.getOwnPropertyDescriptor(t, a) : null;
                            r && (r.get || r.set) ? Object.defineProperty(s, a, r) : s[a] = t[a]
                        }
                    s.default = t,
                    e && e.set(t, s);
                    return s
                }
                (s("6yI3")),
                r = d(s("QvAu")),
                n = s("jNhv"),
                o = s("T1DL"),
                l = d(s("b9Bd"));
                function h() {
                    if ("function" != typeof WeakMap)
                        return null;
                    var t = new WeakMap;
                    return h = function () {
                        return t
                    },
                    t
                }
                function d(t) {
                    return t && t.__esModule ? t : {
                    default:
                        t
                    }
                }
                class u extends i.default {
                    constructor(t, e) {
                        super(t, (0, n.extend)({
                                accessToken: null,
                                style: "mapbox://styles/mapbox/streets-v9"
                            }, e)),
                        this._pointAnimationUpdates = {},
                        this._shapeDataById = {},
                        this._clickedMapLayer = !1
                    }
                    get strategy() {
                        return "mapbox"
                    }
                    get $el() {
                        return (0, l.default)(this.map.getContainer())
                    }
                    loadDependencies() {
                        const t = document.createElement("style");
                        return t.innerHTML = ".mapboxgl-marker { line-height: 0; }",
                        window.document.body.appendChild(t),
                        new Promise((t, e) => {
                            "undefined" == typeof mapboxgl || void 0 === mapboxgl.Map ? Promise.all([(0, n.loadStyles)("https://api.tiles.mapbox.com/mapbox-gl-js/v2.0.0/mapbox-gl.css"), (0, n.loadScript)("https://api.tiles.mapbox.com/mapbox-gl-js/v2.0.0/mapbox-gl.js")]).then(() => {
                                t()
                            }) : t()
                        })
                    }
                    setupMap(t) {
                        this._factory = new r.default,
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
                                throw new Error(`AerisWeather SDK requires Mapbox GL JS version 0.50.0 or higher. You are using version ${e}.`)
                        }
                        const s = this.opts.map;
                        if (s) {
                            const {
                                center: t,
                                zoom: e
                            } = s;
                            if (t && (0, n.isArray)(t)) {
                                const [e, s] = t;
                                (0, n.isset)(s) && (0, n.isset)(e) && (0, n.set)(this.opts, "center", {
                                    lat: s,
                                    lon: e
                                })
                            }
                            e && (0, n.set)(this.opts, "zoom", e)
                        }
                        if ((0, o.isMapbox)(t))
                            this._setInitialView = !1, this._map = t, setTimeout(() => {
                                this.trigger("map:ready")
                            }, 250);
                        else {
                            if ((0, n.isString)(t) && (t = (0, l.default)(t)), (0, n.isArray)(t) && t.length > 0)
                                t = t[0];
                            else if ((0, n.isDOM)(t)) {
                                t = t[0]
                            }
                            mapboxgl.accessToken = this.opts.accessToken,
                            this._map = new mapboxgl.Map((0, n.extend)({}, this.opts.map, {
                                        container: t,
                                        style: this.opts.style
                                    })),
                            this._currentMapStyle = this.opts.style;
                            const e = new mapboxgl.NavigationControl;
                            this._map.addControl(e, "bottom-left"),
                            (0, n.isset)(this.opts.center) || (0, n.set)(this.opts, "center", {
                                lat: 43,
                                lon: -93
                            }),
                            (0, n.isset)(this.opts.zoom) || (0, n.set)(this.opts, "zoom", 7),
                            this.map.on("load", () => {
                                setTimeout(() => {
                                    this.trigger("map:ready")
                                }, 250)
                            })
                        }
                    }
                    setStyle(t) {
                        if (t === this._currentMapStyle)
                            return;
                        const e = this.map,
                        s = e.getStyle(),
                        i = s.layers.filter(t => /^aeris-/.test(t.id)),
                        a = Object.keys(s.sources).filter(t => /^aeris-/.test(t)).reduce((t, e) => (t[e] = s.sources[e], t), {});
                        e.on("style.load", () => {
                            Object.keys(a).forEach(t => {
                                e.getSource(t) || e.addSource(t, a[t])
                            }),
                            i.forEach(t => {
                                e.getLayer(t.id) || e.addLayer(t)
                            })
                        }),
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
                    fitBounds(t, e = [10, 10]) {
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
                        return t instanceof a.TileSource
                    }
                    isMarker(t) {
                        return t instanceof mapboxgl.Marker
                    }
                    isPolygon(t) {
                        return t instanceof a.Polygon
                    }
                    isPolyline(t) {
                        return t instanceof a.Polyline
                    }
                    addSource(t) {
                        super.addSource(t),
                        this.isTile(t) && t.updateVisibility()
                    }
                    addOverlay(t) {
                        t instanceof a.Tile && t.addTo(this.map)
                    }
                    removeOverlay(t) {
                        t instanceof a.Tile && t.remove()
                    }
                    addMarker(t, e) {
                        t instanceof a.Marker ? (t.on("click", () => this.trigger("marker:click", {
                                    data: e,
                                    marker: t
                                })), t.on("mouseover", () => this.trigger("marker:mouseover", {
                                    data: e,
                                    marker: t
                                })), t.on("mouseout", () => this.trigger("marker:mouseout", {
                                    data: e,
                                    marker: t
                                })), t.addTo(this.map)) : t instanceof mapboxgl.Marker && t.addTo(this.map),
                        super.addMarker(t, e)
                    }
                    removeMarker(t) {
                        t instanceof a.Marker ? (t.offAll(), t.remove()) : t instanceof mapboxgl.Marker && t.remove(),
                        super.removeMarker(t)
                    }
                    updateMarker(t, e, s = null) {
                        (0, n.isset)(e) && t instanceof a.Marker && t.update(e)
                    }
                    addShape(t, e) {
                        (t instanceof a.Polygon || t instanceof a.Polyline) && (t.on("click", () => this.trigger("shape:click", {
                                    data: e,
                                    shape: t
                                })), t.on("mouseover", () => this.trigger("shape:mouseover", {
                                    data: e,
                                    shape: t
                                })), t.on("mouseout", () => this.trigger("shape:mouseout", {
                                    data: e,
                                    shape: t
                                })), t.addTo(this.map), this._shapeDataById[t.id] = e),
                        super.addShape(t, e)
                    }
                    removeShape(t) {
                        (t instanceof a.Polygon || t instanceof a.Polyline) && (t.offAll(), t.remove()),
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
                        (0, o.isCoordObject)(t) ? i.setLngLat({
                            lat: t.lat,
                            lng: t.lon
                        }).addTo(this.map) : this.isMarker(t) && (t.setPopup(i), t.togglePopup())
                    }
                    _setupEvents() {
                        this.map.on("movestart", t => {
                            ["before:change:bounds", "before:change:center"].forEach(t => this.trigger(t))
                        }),
                        this.map.on("moveend", t => {
                            ["after:change:bounds", "after:change:center", "change:bounds", "change:center"].forEach(t => this.trigger(t))
                        }),
                        this.map.on("zoomstart", t => {
                            ["before:change:zoom"].forEach(t => this.trigger(t))
                        }),
                        this.map.on("zoomend", t => {
                            ["after:change:zoom", "change:zoom"].forEach(t => this.trigger(t))
                        }),
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
                }
                var c = u;
                e.default = c,
                t.exports = e.default
            },
            Jfte: function (t, e, s) {
                "use strict";
                Object.defineProperty(e, "__esModule", {
                    value: !0
                }),
                e.default = void 0;
                var i,
                a = (i = s("gQtN")) && i.__esModule ? i : {
                default:
                    i
                },
                r = s("jNhv");
                class n extends a.default {
                    constructor(t = null) {
                        super(t = (0, r.extend)({}, {
                                refresh: 0,
                                showWhenLoading: !0,
                                showLoadingIntervals: !1,
                                bufferIntervals: -1,
                                reverseLoadOrder: !1,
                                times: void 0
                            }, t)),
                        this._layersByTime = null,
                        this._isReset = !1,
                        this._loading = !1,
                        this._hasLoaded = !1,
                        this._visible = !0,
                        (0, r.isset)(this.opts.times) && this.setTimes(this.opts.times),
                        this._startup()
                    }
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
                    dataByTime() {
                        return this._layersByTime || {}
                    }
                    dataItems() {
                        return Object.keys(this.dataByTime()).map(t => this._layersByTime[t])
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
                    reset(t = !1) {
                        super.reset(t),
                        this.hide(),
                        this._reloadTimer && window.clearTimeout(this._reloadTimer),
                        this._isReset = !0,
                        this._loading = !1,
                        this._hasLoaded = !1,
                        this._layersByTime = null,
                        this._currentLayer = null,
                        this._layersByTime && Object.keys(this._layersByTime).forEach(t => {
                            const e = parseInt(t, 10);
                            this._layersByTime[e].remove(),
                            delete this._layersByTime[e]
                        })
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
                        this.dataItems().forEach(e => {
                            (0, r.has)(e, "setOpacity") && e.setOpacity(t, !0)
                        })
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
                        const e = Object.keys(this._layersByTime).sort().reverse().map(t => parseInt(t, 10));
                        let s = null,
                        i = e[e.length - 1],
                        a = Math.abs(t - i);
                        return e.forEach(e => {
                            const s = Math.abs(t - e);
                            s < a && (a = s, i = e)
                        }),
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
                        this._layersByTime && Object.keys(this._layersByTime).forEach(e => {
                            const s = parseInt(e, 10),
                            i = t.indexOf(s);
                            -1 !== i && t.splice(i, 1)
                        });
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
                            i.forEach(e => {
                                this._loadInterval(e, !0, a, () => {
                                    this._totalImages() === t.length && s()
                                })
                            })
                        };
                        let a = 0;
                        const r = () => {
                            const n = !1 === this.opts.showLoadingIntervals || 0 !== e && a <= this._totalImages();
                            this._loadInterval(t[a], !0, n, () => {
                                a += 1,
                                this._isReset || (a >= t.length ? (s(), this.opts.refresh > 0 && (this._reloadTimer && window.clearTimeout(this._reloadTimer), this._reloadTimer = setTimeout(() => {
                                                this.reset(),
                                                this._load()
                                            }, 1e3 * this.opts.refresh))) : e > 0 && this._totalImages() === e ? (this.trigger("ready"), this.opts.showLoadingIntervals ? i(t.slice(a)) : r()) : r())
                            })
                        };
                        0 === e ? (this.trigger("ready"), i(t)) : r()
                    }
                    _loadInterval(t, e, s, i = null) {
                        if (t = Math.round(t), this._layersByTime) {
                            if (this._layersByTime[t])
                                return void(i && i())
                        } else
                            this._layersByTime = {};
                        const a = new Date(t);
                        this.provider && this.provider.animationLayerForDate(this, a, s).then(e => {
                            this._isReset ? e.remove() : (this.showWhenLoading && this._totalImages() < this.bufferCount && (this._currentLayer && this._currentLayer.hide(), e.show(), this._currentLayer = e), this._layersByTime[t] = e, this.trigger("load:image", {
                                    date: new Date(t),
                                    layer: e
                                }), this.trigger("load:progress", {
                                    time: t,
                                    loaded: Object.keys(this._layersByTime).length,
                                    total: this.totalIntervals
                                }), i && i())
                        }).catch(t => {
                            console.error("Failed to load tile animation interval", t)
                        })
                    }
                }
                var o = n;
                e.default = o,
                t.exports = e.default
            },
            KRIx: function (t, e, s) {
                "use strict";
                Object.defineProperty(e, "__esModule", {
                    value: !0
                }),
                e.default = void 0;
                var i,
                a,
                r = (i = s("AIg7")) && i.__esModule ? i : {
                default:
                    i
                },
                n = s("jNhv"),
                o = s("SJ39"),
                l = s("Bnei");
                !function (t) {
                    t.Select = "select",
                    t.Deselect = "deselect",
                    t.Change = "change"
                }
                (a || (a = {}));
                class h extends r.default {
                    constructor(t, e) {
                        super(),
                        this.storedSources = {},
                        this.sourceState = {},
                        this.respondToSourceEvents = !0,
                        this.map = t,
                        this.linkPanel(e),
                        this.setupEvents()
                    }
                    get sources() {
                        return this.storedSources
                    }
                    linkPanel(t) {
                        this.panel !== t && (this.panel && this.panel.off("select", this.handleSelect).off("deselect", this.handleDeselect).off("change", this.handleOptionChange), this.panel = t, this.panel.on("select", this.handleSelect.bind(this)).on("deselect", this.handleDeselect.bind(this)).on("change", this.handleOptionChange.bind(this)).on("control:change", t => {
                                const {
                                    key: e,
                                    valueSegments: s,
                                    control: i = {}
                                } = t.data || {};
                                if ("opacity" === i.id) {
                                    let t = this.findSource(e);
                                    if (s && s.forEach(e => {
                                            const s = this.findSource(e.key, e.value);
                                            s && (t = s)
                                        }), t && (t instanceof o.TileSource || t instanceof o.VectorSource)) {
                                        const s = i.value / 100;
                                        t.setOpacity(s),
                                        this.setSourceState(e, {
                                            style: {
                                                opacity: s
                                            }
                                        })
                                    }
                                }
                                this.trigger("change:control", t.data)
                            }))
                    }
                    getSource(t) {
                        return this.sources[t]
                    }
                    findSource(t, e) {
                        let s = this.getSource(t);
                        if (s || (s = this.map.getSourceForId(t)), s || (s = this.map.getSourceForLayer(t)), !s && (0, n.isString)(e) && (s = this.findSource(e)), !s && !0 === /\:\:/.test(t)) {
                            const i = (0, l.getSourceId)(t || e);
                            s = this.findSource(i)
                        }
                        return s
                    }
                    addSource(t, e) {
                        this.sources[t] = e
                    }
                    setSourceState(t, e) {
                        this.sourceState[t] = Object.assign(Object.assign({}, this.sourceState[t]), e)
                    }
                    handleSourceEvent(t, e) {
                        if (this.respondToSourceEvents)
                            switch (t) {
                            case "add":
                                this.panel.select(e, !0);
                                break;
                            case "remove":
                                this.panel.deselect(e, !0)
                            }
                    }
                    handleSelect(t) {
                        const {
                            changed: e
                        } = this.handleAction(a.Select, t.data);
                        e && this.trigger("select", Object.assign({}, t.data))
                    }
                    handleDeselect(t) {
                        const {
                            changed: e
                        } = this.handleAction(a.Deselect, t.data);
                        e && this.trigger("deselect", Object.assign({}, t.data))
                    }
                    handleOptionChange(t) {
                        const {
                            id: e,
                            value: s,
                            reload: i,
                            filter: r = !1
                        } = t.data || {};
                        if (!s)
                            return;
                        if (!1 === this.map.hasSource(e) && s.filters)
                            return void this.panel.trigger("select", t.data);
                        if (this.handleAction(a.Change, Object.assign({}, t.data))) {
                            const a = (t => {
                                const e = {};
                                return (0, n.isPlainObject)(t) ? Object.keys(t).forEach(s => {
                                    const i = t[s];
                                    e[s] = (0, n.isPlainObject)(i) ? null == i ? void 0 : i.value : i
                                }) : (0, n.isArray)(t) && t.length > 0 ? e.filter = t.join(";") : (0, n.isString)(t) && (e.filter = t),
                                "all" === e.filter && (e.filter = ""),
                                e
                            })(s);
                            if (a.bounds = this.map.getBounds(), this.trigger("change", Object.assign(Object.assign({}, t.data), {
                                        params: a
                                    })), r) {
                                const t = this.findSource(e, s);
                                t && ((0, n.isset)(i) && !0 !== i ? t.render() : t.reload(a))
                            }
                        }
                    }
                    handleAction(t, e) {
                        const {
                            id: s,
                            key: i,
                            value: r,
                            previous: o,
                            options: l,
                            valueSegments: h,
                            previousSegments: d,
                            filter: u = !1
                        } = e,
                        c = ["id", "key", "value", "options"];
                        if (!r)
                            return {
                                changed: !1,
                                added: [],
                                removed: []
                            };
                        if (this.map.isReady()) {
                            let i = [],
                            l = [];
                            if (u || r.filters) {
                                if (t === a.Deselect ? l.push((0, n.pick)(e, c)) : i.push((0, n.pick)(e, c)), t === a.Change)
                                    return {
                                        changed: !0,
                                        added: i,
                                        removed: l
                                    }
                            } else
                                t === a.Select ? h ? i = i.concat(h.map(t => (0, n.pick)(t, c))) : i.push((0, n.pick)(e, c)) : t === a.Deselect && (h ? l = l.concat(h.map(t => (0, n.pick)(t, c))) : l.push((0, n.pick)(e, c)));
                            t === a.Change && (h || d ? (h && (i = i.concat(h.map(t => (0, n.pick)(t, c)))), d && (l = l.concat(d.map(t => (0, n.pick)(t, c))))) : (l.push(Object.assign(Object.assign({}, (0, n.pick)(e, c)), {
                                            value: o
                                        })), i.push((0, n.pick)(e, c)))),
                            t === a.Select ? l = [] : t === a.Deselect && (i = []);
                            const p = i.map(t => t.key),
                            f = l.reduce((t, e) => (-1 === p.indexOf(e.key) && t.push(e), t), []);
                            if (i.length > 0 || f.length > 0) {
                                const t = i.map(t => Object.assign(Object.assign({}, t), {
                                            parentId: s
                                        })),
                                e = f.map(t => Object.assign(Object.assign({}, t), {
                                            parentId: s
                                        }));
                                return this.updateSources(t, e), {
                                    changed: !0,
                                    added: i,
                                    removed: f
                                }
                            }
                        }
                        return {
                            changed: !1,
                            added: [],
                            removed: []
                        }
                    }
                    updateSources(t = [], e = []) {
                        const s = [],
                        i = [];
                        this.respondToSourceEvents = !1,
                        e.forEach(t => {
                            const {
                                id: e,
                                key: s,
                                value: a,
                                options: r
                            } = t,
                            n = this.findSource(e, a);
                            n && (this.map.removeSource(n), i.push(n))
                        }),
                        t.forEach(t => {
                            const {
                                id: e,
                                key: i,
                                parentId: a,
                                value: r,
                                options: o
                            } = t,
                            l = (0, n.extend)({}, o, this.sourceState[e], this.sourceState[a]),
                            h = (0, n.isArray)(r) ? r.join(",") : r;
                            let d = this.findSource(e, h);
                            d ? this.map.addSource(d, l) : (0, n.isString)(h) && (this.map.layerInfo.exists(h) || !1 === l.validate) ? (this.map.addLayer(h, Object.assign(Object.assign({}, l), {
                                        id: e
                                    })), d = this.map.getSourceForLayer(h)) : this.map.layerInfo.exists(e) && (this.map.addLayer(e, Object.assign(Object.assign({}, l), {
                                        id: e
                                    })), d = this.map.getSourceForLayer(e)),
                            d ? s.push(d) : console.warn(`[Aeris] Cannot add map data source {${e}}, source not registered and/or not a valid Aeris Maps layer.`)
                        }),
                        this.respondToSourceEvents = !0,
                        this.trigger("source:change", {
                            added: s,
                            removed: i
                        })
                    }
                    setupEvents() {
                        this.on("source:change", t => {})
                    }
                }
                var d = h;
                e.default = d,
                t.exports = e.default
            },
            KqXO: function (t, e, s) {
                "use strict";
                Object.defineProperty(e, "__esModule", {
                    value: !0
                }),
                e.default = void 0;
                var i = h(s("g8Bo")),
                a = h(s("2EEu")),
                r = h(s("GIM7")),
                n = s("jNhv"),
                o = h(s("KzFB")),
                l = h(s("b9Bd"));
                function h(t) {
                    return t && t.__esModule ? t : {
                    default:
                        t
                    }
                }
                let d = null;
                class u extends o.default {
                    constructor(t) {
                        super((0, n.extend)({
                                controls: [{
                                        close: !0,
                                        activity: !1,
                                        settings: void 0
                                    }
                                ]
                            }, t, {
                                ui: {
                                    close: ".awxjs__ui-btn-close",
                                    settings: ".awxjs__ui-btn-settings",
                                    controls: ".awxjs__ui-btn-controls"
                                }
                            })),
                        this._handleWindowClick = t => {
                            const e = (0, l.default)(t.target),
                            s = this._popover.$el;
                            s !== e && !1 === s.contains(e) && (this._hidePopover(), window.removeEventListener("click", this._handleWindowClick))
                        };
                        this.opts.controls.activity && (this._indicator = new i.default({
                                size: 24,
                                strokeWidth: 2
                            }))
                    }
                    setLoading(t) {
                        this._indicator && (t ? this._indicator.startAnimating() : this._indicator.stopAnimating()),
                        this.ui.close.css("opacity", t ? 0 : 1),
                        this.ui.settings && this.ui.settings.css("opacity", t ? 0 : 1)
                    }
                    addToButton(t) {
                        t.ui.target && (this.remove(), this.addTo(t.$el), t.on("select", () => {
                                this.ui.settings && this.ui.settings.show()
                            }).on("deselect", () => {
                                this.ui.close && this.ui.close.css("opacity", 0),
                                this.ui.settings && this.ui.settings.hide(),
                                this._popover && this._hidePopover()
                            }))
                    }
                    _render() {
                        const t = this.opts.controls;
                        let e = "";
                        return t.close && (e += '\n\t\t\t\t<div class="awxjs__ui-btn-action awxjs__ui-btn-close" title="Close">\n\t\t\t\t\t<svg width="100pt" height="100pt" version="1.1" viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">\n\t\t\t\t\t\t<path d="m22.699 77.301c0.80078 0.80078 1.8008 1.1992 2.8008 1.1992s2-0.39844 2.8008-1.1992l21.699-21.602 21.699 21.699c0.80078 0.80078 1.8008 1.1992 2.8008 1.1992s2-0.39844 2.8008-1.1992c1.6016-1.6016 1.6016-4.1016 0-5.6992l-21.602-21.699 21.699-21.699c1.6016-1.6016 1.6016-4.1016 0-5.6992-1.6016-1.6016-4.1016-1.6016-5.6992 0l-21.699 21.699-21.699-21.602c-1.6016-1.6016-4.1016-1.6016-5.6992 0-1.6016 1.6016-1.6016 4.1016 0 5.6992l21.699 21.602-21.602 21.699c-1.5977 1.5-1.5977 4.1016 0 5.6016z"/>\n\t\t\t\t\t</svg>\n\t\t\t\t</div>\n\t\t\t'),
                        t.settings && (e += '\n\t\t\t\t<div class="awxjs__ui-btn-action awxjs__ui-btn-settings" title="Settings">\n\t\t\t\t\t<svg version="1.1" viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">\n\t\t\t\t\t\t<path d="m94.801 40.801-10.602-1.8008c-0.60156-1.8984-1.3984-3.6992-2.3008-5.5l6.1992-8.6992c0.89844-1.3008 0.80078-3.1016-0.30078-4.1992l-8.5-8.5c-1.1016-1.1016-2.8984-1.3008-4.1992-0.30078l-8.6992 6.1992c-1.6992-0.89844-3.6016-1.6992-5.5-2.3008l-1.6992-10.5c-0.30078-1.6016-1.6016-2.6992-3.1992-2.6992h-12c-1.6016 0-2.8984 1.1016-3.1992 2.6992l-1.8008 10.602c-1.8984 0.60156-3.6992 1.3984-5.5 2.3008l-8.6992-6.1992c-1.3008-0.89844-3.1016-0.80078-4.1992 0.30078l-8.5 8.5c-1.1016 1.1016-1.3008 2.8984-0.30078 4.1992l6.1992 8.6992c-0.89844 1.6992-1.6992 3.6016-2.3008 5.5l-10.5 1.6992c-1.6016 0.30078-2.6992 1.6016-2.6992 3.1992v12c0 1.6016 1.1016 2.8984 2.6992 3.1992l10.602 1.8008c0.60156 1.8984 1.3984 3.6992 2.3008 5.5l-6.1992 8.6992c-0.89844 1.3008-0.80078 3.1016 0.30078 4.1992l8.5 8.5c1.1016 1.1016 2.8984 1.3008 4.1992 0.30078l8.6992-6.1992c1.6992 0.89844 3.6016 1.6992 5.5 2.3008l1.8008 10.602c0.30078 1.6016 1.6016 2.6992 3.1992 2.6992h12c1.6016 0 2.8984-1.1016 3.1992-2.6992l1.6992-10.703c1.8984-0.60156 3.6992-1.3984 5.5-2.3008l8.6992 6.1992c1.3008 0.89844 3.1016 0.80078 4.1992-0.30078l8.5-8.5c1.1016-1.1016 1.3008-2.8984 0.30078-4.1992l-6.1992-8.6992c0.89844-1.6992 1.6992-3.6016 2.3008-5.5l10.602-1.8008c1.6016-0.30078 2.6992-1.6016 2.6992-3.1992v-11.898c-0.10156-1.6016-1.2031-2.8984-2.8008-3.1992zm-44.801 26.301c-9.5 0-17.102-7.6992-17.102-17.102 0-9.5 7.6992-17.102 17.102-17.102 9.3984 0 17.102 7.6016 17.102 17.102s-7.6016 17.102-17.102 17.102z"/>\n\t\t\t\t\t</svg>\n\t\t\t\t</div>\n\t\t\t'),
                        "" !== e && (e = `<div class="awxjs__ui-btn-controls">${e}</div>`),
                        e
                    }
                    _setupEvents() {
                        super._setupEvents();
                        const t = this.opts.controls;
                        this._indicator && this._indicator.appendTo(this.$el),
                        t.settings && this.ui.settings && this.ui.settings.on("click", e => {
                            if (e.preventDefault(), e.stopPropagation(), !this._popover) {
                                const e = new r.default({
                                    controls: t.settings
                                });
                                e.on("change", t => {
                                    this.trigger("change", Object.assign({}, t.data))
                                });
                                const s = new a.default(e.$el, {
                                    place: "left",
                                    className: "awxjs__ui-layer-controls-popover",
                                    showClose: !0
                                });
                                e.addTo(s.$el),
                                s.attachTo(this.parent()),
                                s.setContent(e.$el),
                                this._popover = s,
                                this._controls = e
                            }
                            this._popover.visible ? this._hidePopover() : this._showPopover(),
                            window.addEventListener("click", this._handleWindowClick)
                        })
                    }
                    _showPopover() {
                        d && d.hide(),
                        this._popover.show(),
                        d = this._popover
                    }
                    _hidePopover() {
                        this._popover.hide(),
                        d = null
                    }
                }
                var c = u;
                e.default = c,
                t.exports = e.default
            },
            LA41: function (t, e, s) {
                "use strict";
                Object.defineProperty(e, "__esModule", {
                    value: !0
                }),
                Object.defineProperty(e, "Polygon", {
                    enumerable: !0,
                    get: function () {
                        return i.default
                    }
                }),
                Object.defineProperty(e, "Polyline", {
                    enumerable: !0,
                    get: function () {
                        return a.default
                    }
                }),
                Object.defineProperty(e, "Tile", {
                    enumerable: !0,
                    get: function () {
                        return r.default
                    }
                }),
                Object.defineProperty(e, "Marker", {
                    enumerable: !0,
                    get: function () {
                        return n.default
                    }
                }),
                Object.defineProperty(e, "TileSource", {
                    enumerable: !0,
                    get: function () {
                        return o.default
                    }
                });
                var i = l(s("IpC2")),
                a = l(s("DQdV")),
                r = l(s("W11p")),
                n = l(s("nOlR")),
                o = l(s("/BY0"));
                function l(t) {
                    return t && t.__esModule ? t : {
                    default:
                        t
                    }
                }
            },
            LewK: function (t, e, s) {
                "use strict";
                Object.defineProperty(e, "__esModule", {
                    value: !0
                }),
                e.default = void 0;
                var i = o(s("gQtN")),
                a = o(s("Jfte")),
                r = o(s("zILR")),
                n = s("jNhv");
                function o(t) {
                    return t && t.__esModule ? t : {
                    default:
                        t
                    }
                }
                class l extends i.default {
                    constructor(t = null) {
                        super(t),
                        this._loading = !1,
                        this._animations = {}
                    }
                    get animations() {
                        return this._animations || {}
                    }
                    set animations(t) {
                        this.stop(),
                        this._animations = t,
                        this._each(t => {
                            t.timeline = this
                        })
                    }
                    get(t) {
                        return this._animations[t]
                    }
                    opt(t, e) {
                        if (e) {
                            const s = ["intervals"];
                            return (0, n.set)(this.opts, t, e),
                            -1 !== s.indexOf(t) && this._each(s => {
                                s.opt(t, e)
                            }),
                            this
                        }
                        return (0, n.get)(this.opts, t)
                    }
                    add(t, e) {
                        this.stop(),
                        e.timeline = this,
                        this._animations[t] = e
                    }
                    remove(t) {
                        Object.keys(this._animations).forEach(e => {
                            this._animations[e] === t && this.removeBy(e)
                        })
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
                        this.canAnimate() && (this._each(i => {
                                const n = this.opt("showLoading"),
                                o = !1 === this.containsPast();
                                if (i instanceof a.default) {
                                    const t = i;
                                    t.showWhenLoading = n,
                                    i.isFuture() && (t.showWhenLoading = o || t.alwaysShow())
                                } else if (i instanceof r.default) {
                                    const t = i;
                                    t.showWhenLoading = n,
                                    i.isFuture() && (t.showWhenLoading = o || t.alwaysShow())
                                }
                                i.isEnabled() && (i.isReady() ? (i.isLoading() || i.needsData()) && (s.push(i), i.once("load:done", () => {
                                            s.splice(s.indexOf(i), 1),
                                            0 === s.length && (this._loading = !1, this.trigger("load:done"))
                                        })) : (t = !1, e.push(i), s.push(i), i.once("ready", () => {
                                            e.splice(e.indexOf(i), 1),
                                            s.splice(s.indexOf(i), 1),
                                            0 === e.length && setTimeout(() => {
                                                this.trigger("ready"),
                                                this.play()
                                            }, 100)
                                        })), i.play())
                            }), !1 === this._loading && s.length > 0 ? (this._loading = !0, this.trigger("load:start")) : this._loading && 0 === s.length && (this._loading = !1, this.trigger("load:done")), t && (this._each(t => {
                                    t.play()
                                }), super.play()))
                    }
                    stop() {
                        this._each(t => {
                            t.stop()
                        }),
                        super.stop(),
                        this._loading && this.trigger("load:done"),
                        this._loading = !1
                    }
                    pause() {
                        this._each(t => {
                            t.pause()
                        }),
                        super.pause()
                    }
                    restart() {
                        this._each(t => {
                            t.restart()
                        }),
                        super.restart()
                    }
                    reset(t = !1) {
                        this.stop(),
                        this._loading = !1,
                        this._each(e => {
                            e.reset(t)
                        }),
                        super.reset(t)
                    }
                    isLoading() {
                        return this._loading
                    }
                    goToTime(t) {
                        return this._each(e => {
                            e.goToTime(t)
                        }),
                        super.goToTime(t)
                    }
                    setStartDate(t) {
                        return this._each(e => {
                            e.setStartDate(t)
                        }),
                        super.setStartDate(t)
                    }
                    setStartOffset(t) {
                        return this._each(e => {
                            e.setStartOffset(t)
                        }),
                        super.setStartOffset(t)
                    }
                    setEndDate(t) {
                        return this._each(e => {
                            e.setEndDate(t)
                        }),
                        super.setEndDate(t)
                    }
                    setEndOffset(t) {
                        return this._each(e => {
                            e.setEndOffset(t)
                        }),
                        super.setEndOffset(t)
                    }
                    refresh() {
                        super.refresh(),
                        this._each(t => {
                            t.now = this.now
                        })
                    }
                    _each(t) {
                        Object.keys(this.animations).forEach(e => {
                            const s = this._animations[e];
                            t(s)
                        })
                    }
                    _onTimingChange() {
                        super._onTimingChange(),
                        this._each(t => {
                            t.from = this.from,
                            t.to = this.to
                        })
                    }
                }
                var h = l;
                e.default = h,
                t.exports = e.default
            },
            "Li+i": function (t, e, s) {
                "use strict";
                Object.defineProperty(e, "__esModule", {
                    value: !0
                }),
                Object.defineProperty(e, "Polygon", {
                    enumerable: !0,
                    get: function () {
                        return i.default
                    }
                }),
                Object.defineProperty(e, "Polyline", {
                    enumerable: !0,
                    get: function () {
                        return a.default
                    }
                }),
                Object.defineProperty(e, "Tile", {
                    enumerable: !0,
                    get: function () {
                        return r.default
                    }
                }),
                Object.defineProperty(e, "Marker", {
                    enumerable: !0,
                    get: function () {
                        return n.default
                    }
                }),
                Object.defineProperty(e, "TileSource", {
                    enumerable: !0,
                    get: function () {
                        return o.default
                    }
                });
                var i = l(s("Wn7q")),
                a = l(s("djCz")),
                r = l(s("0oAq")),
                n = l(s("UHVH")),
                o = l(s("FdfE"));
                function l(t) {
                    return t && t.__esModule ? t : {
                    default:
                        t
                    }
                }
            },
            NK6d: function (t, e, s) {
                "use strict";
                Object.defineProperty(e, "__esModule", {
                    value: !0
                }),
                e.default = void 0;
                var i,
                a = (i = s("Bte/")) && i.__esModule ? i : {
                default:
                    i
                };
                class r extends a.default {
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
                }
                var n = r;
                e.default = n,
                t.exports = e.default
            },
            Nt2h: function (t, e, s) {
                "use strict";
                Object.defineProperty(e, "__esModule", {
                    value: !0
                }),
                e.default = e.config = void 0;
                var i = s("jNhv");
                const a = {
                default:
                    "#000000",
                    general: "#b3e6b1",
                    marginal: "#6cbd69",
                    slight: "#f4f964",
                    enhanced: "#e0b767",
                    moderate: "#e0686a",
                    high: "#fe59ff"
                },
                r = {
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
                            const e = (0, i.get)(t, "details.risk.type");
                            return {
                                fill: {
                                    color: a[e] || a.default,
                                    opacity: 1
                                }
                            }
                        }
                    }
                };
                e.config = r;
                var n = r;
                e.default = n
            },
            OeEA: function (t, e, s) {
                "use strict";
                Object.defineProperty(e, "__esModule", {
                    value: !0
                }),
                e.default = void 0;
                var i = o(s("AIg7")),
                a = o(s("TtNf")),
                r = s("jNhv"),
                n = o(s("b9Bd"));
                function o(t) {
                    return t && t.__esModule ? t : {
                    default:
                        t
                    }
                }
                class l extends i.default {
                    constructor(t, e) {
                        super(),
                        this._loaded = [],
                        this._key = t,
                        this._opts = (0, r.extend)({
                            types: null
                        }, e),
                        this._target = (0, n.default)(`<div class="awxjs__legend awxjs__legend-group awxjs__legend-${t}"></div>`),
                        this._legends = {},
                        this._opts.types && (this.trigger("load:start"), Object.keys(this._opts.types).forEach(t => {
                                const s = (0, r.extend)({}, e, (0, r.cloneDeep)(this._opts.types[t]));
                                delete s.types,
                                (0, r.isEmpty)(s.use) || (t = s.use);
                                const i = new a.default(t, s);
                                i.on("load:done", () => {
                                    this._loaded.push(t),
                                    this._checkLoaded()
                                }),
                                this._legends[t] = i,
                                this.$el.append(i.$el)
                            }))
                    }
                    get key() {
                        return this._key
                    }
                    get opts() {
                        return this._opts
                    }
                    get $el() {
                        return this._target
                    }
                    show() {
                        this.$el.show()
                    }
                    hide() {
                        this.$el.hide()
                    }
                    setSize(t) {
                        Object.keys(this._legends).forEach(e => {
                            const s = this.opts.types[e];
                            this._legends[e].setSize({
                                width: t.width * s.factor,
                                height: t.height
                            })
                        })
                    }
                    getSize() {
                        const t = this.$el.bounds();
                        let e = 0,
                        s = t.height;
                        return Object.keys(this._legends).forEach(t => {
                            const i = this._legends[t];
                            if (i.$el) {
                                const t = i.$el.bounds();
                                e += t.width,
                                s = Math.max(s, t.height)
                            }
                        }), {
                            width: e,
                            height: s
                        }
                    }
                    setMetric(t) {
                        Object.keys(this._legends).forEach(e => {
                            this._legends[e].setMetric(t)
                        })
                    }
                    reset() {
                        this.$el.empty(),
                        this._legends = null,
                        this._loaded = []
                    }
                    update(t) {
                        this.trigger("load:start"),
                        Object.keys(this._legends).forEach(t => {
                            this._legends[t].update()
                        })
                    }
                    _checkLoaded() {
                        this._loaded.length === Object.keys(this._opts.types).length && (this.trigger("load:done"), setTimeout(() => {
                                const t = this.getSize();
                                this.$el.css("width", t.width + "px"),
                                this.trigger("resize", t)
                            }, 150))
                    }
                }
                var h = l;
                e.default = h,
                t.exports = e.default
            },
            OmhM: function (t, e, s) {
                "use strict";
                Object.defineProperty(e, "__esModule", {
                    value: !0
                }),
                e.default = e.configForLayer = void 0;
                var i = g(s("mn6z")),
                a = g(s("Nt2h")),
                r = g(s("oRHp")),
                n = g(s("jiPZ")),
                o = g(s("wI+p")),
                l = g(s("Q5Cw")),
                h = g(s("ZbGd")),
                d = g(s("bOlB")),
                u = g(s("ZOIN")),
                c = g(s("oi+Y")),
                p = g(s("DSsK")),
                f = g(s("6t7K"));
                function g(t) {
                    return t && t.__esModule ? t : {
                    default:
                        t
                    }
                }
                const m = {
                    "air-quality": i.default,
                    convective: a.default,
                    "drought-monitor": r.default,
                    earthquakes: n.default,
                    fires: o.default,
                    "fire-outlook": l.default,
                    "lightning-strikes": h.default,
                    records: d.default,
                    "river-observations": u.default,
                    stormcells: c.default,
                    stormreports: p.default,
                    text: f.default
                };
                e.configForLayer = t => m[t];
                var _ = {
                    airquality: i.default,
                    convectiveOutlook: a.default,
                    droughtMonitor: r.default,
                    earthquakes: n.default,
                    fires: o.default,
                    fireOutlook: l.default,
                    lightningStrikes: h.default,
                    records: d.default,
                    rivers: u.default,
                    stormcells: c.default,
                    stormreports: p.default,
                    text: f.default
                };
                e.default = _
            },
            Pcd9: function (t, e, s) {
                "use strict";
                Object.defineProperty(e, "__esModule", {
                    value: !0
                }),
                e.markerIconFromStyle = e.formatLayerOptions = void 0;
                var i = s("jNhv"),
                a = s("+mSH"),
                r = s("p+P+"),
                n = s("GK1F");
                e.formatLayerOptions = t => {
                    const e = {
                        stroke: null,
                        fill: null
                    };
                    if (t.stroke) {
                        const {
                            r: s,
                            g: i,
                            b: a
                        } = (0, r.toRGB)(t.stroke.color);
                        e.stroke = {
                            color: `rgba(${s}, ${i}, ${a}, ${t.stroke.opacity || 1})`,
                            width: t.stroke.width,
                            lineCap: t.stroke.lineCap,
                            lineJoin: t.stroke.lineJoin,
                            lineDash: t.stroke.dashArray,
                            lineDashOffset: t.stroke.dashOffset
                        }
                    }
                    if (t.fill) {
                        const {
                            r: s,
                            g: a,
                            b: n
                        } = (0, r.toRGB)(t.fill.color);
                        e.fill = {
                            color: `rgba(${s}, ${a}, ${n}, ${(0, i.isset)(t.fill.opacity) ? t.fill.opacity : 1})`
                        }
                    }
                    return Object.keys(e).forEach(t => {
                        const s = (0, a.hyphenate)(t);
                        s !== t && (e[s] = e[t], delete e[t])
                    }),
                    e
                };
                e.markerIconFromStyle = t => {
                    if (t.html && console.warn("awxjs - HTML markers are not currently supported with OpenLayers"), t.svg) {
                        let [e, s] = t.size || [12, 12];
                        if (t.svg.text) {
                            const a = t.svg.text;
                            if ((0, i.isArray)(a))
                                a.forEach(t => {
                                    t.autosize && ([e, s] = n.SVG.calculateTextSize(t.value, t.size))
                                });
                            else {
                                const t = a;
                                t.autosize && ([e, s] = n.SVG.calculateTextSize(t.value, t.size))
                            }
                        }
                        s += 3;
                        const a = n.SVG.draw(e, s, t.svg);
                        return new ol.style.Icon({
                            src: "data:image/svg+xml;base64," + btoa(a),
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
            },
            PuGD: function (t, e, s) {
                "use strict";
                Object.defineProperty(e, "__esModule", {
                    value: !0
                }),
                e.default = void 0;
                var i,
                a = s("lTyK"),
                r = s("T1DL"),
                n = (i = s("cKwr")) && i.__esModule ? i : {
                default:
                    i
                },
                o = s("jNhv"),
                l = s("+mSH"),
                h = s("neGM");
                var d = {
                    units: {
                        id: "units",
                        static: !0,
                        renderer: t => '\n\t\t\t<div class="awxjs__app__ui-panel-info__units">\n\t\t\t\t<div class="awxjs__ui-cols align-center justify-between">\n\t\t\t\t\t<div class="label">Units</div>\n\t\t\t\t\t<div class="control"></div>\n\t\t\t\t</div>\n\t\t\t</div>\n\t\t',
                        init: (t, e) => {
                            const s = new n.default({
                                values: [{
                                        label: "Imperial",
                                        value: "imperial"
                                    }, {
                                        label: "Metric",
                                        value: "metric"
                                    }
                                ]
                            }),
                            i = () => {
                                "metric" === e.units ? s.select() : s.deselect()
                            };
                            e.on("change:units", t => {
                                i()
                            }),
                            s.addTo(t.el(".control")),
                            s.on("select", () => {
                                e.units = "metric"
                            }).on("deselect", () => {
                                e.units = "imperial"
                            }),
                            i()
                        }
                    },
                    place: {
                        id: "place",
                        requiresData: !0,
                        request: (t, e) => t.api().endpoint("places"),
                        data: t => (0, o.isEmpty)(t) ? null : (t = t.places || t).place,
                        renderer: t => `\n\t\t\t<div class="awxjs__app__ui-panel-info__place">\n\t\t\t\t<div class="awxjs__app__ui-panel-info__place-name">${t.name}${(0, o.isEmpty)(t.state) ? "" : ", " + t.state}, ${t.country}</div>\n\t\t\t</div>\n\t\t`
                    },
                    obs: {
                        id: "observations",
                        requiresData: !0,
                        request: (t, e) => t.api().endpoint("conditions"),
                        data: t => {
                            var e;
                            if ((0, o.isEmpty)(t))
                                return null;
                            if ((null === (e = (t = t.observations || t).conditions) || void 0 === e ? void 0 : e.length) > 0) {
                                return (t.conditions[0] || []).periods[0]
                            }
                            return t.ob
                        },
                        renderer: t => {
                            const e = (0, o.dateFromISO)(t.dateTimeISO),
                            s = "metric" === t.units;
                            return `\n\t\t\t\t<div class="awxjs__app__ui-panel-info__obs">\n\t\t\t\t\t<div class="awxjs__app__ui-panel-info__obs-timestamp">Last updated at ${(0, o.formatDate)(e, s ? "HH:mm, MMM d, yyyy" : "h:mm a, MMM dd, yyyy")}</div>\n\t\t\t\t\t<div class="awxjs__ui-cols">\n\t\t\t\t\t\t<div>\n\t\t\t\t\t\t\t<div class="awxjs__ui-cols">\n\t\t\t\t\t\t\t\t<div>\n\t\t\t\t\t\t\t\t\t<div class="awxjs__app__ui-panel-info__obs-temp">${(0, a.formatDataValue)(t, "tempF", "tempC", s) || "N/A"}</div>\n\t\t\t\t\t\t\t\t</div>\n\t\t\t\t\t\t\t\t<div>\n\t\t\t\t\t\t\t\t\t<img class="awxjs__app__ui-panel-info__obs-icon" src="https://cdn.aerisapi.com/wxblox/icons/${t.icon || "na.png"}">\n\t\t\t\t\t\t\t\t</div>\n\t\t\t\t\t\t\t</div>\n\t\t\t\t\t\t\t<div class="awxjs__app__ui-panel-info__obs-wx">${t.weatherPrimary}</div>\n\t\t\t\t\t\t</div>\n\t\t\t\t\t\t<div class="awxjs__app__ui-panel-info__obs-details">\n\t\t\t\t\t\t\t<div class="awxjs__ui-row">\n\t\t\t\t\t\t\t\t<div>Winds</div>\n\t\t\t\t\t\t\t\t<div>${t.windSpeedMPH > 0 ? "" + (0, a.formatDataValue)(t, "windSpeedMPH", "windSpeedKPH", s) : "Calm"}</div>\n\t\t\t\t\t\t\t</div>\n\t\t\t\t\t\t\t<div class="awxjs__ui-row">\n\t\t\t\t\t\t\t\t<div>Dew Point</div>\n\t\t\t\t\t\t\t\t<div>${(0, a.formatDataValue)(t, "dewpointF", "dewpointC", s)}</div>\n\t\t\t\t\t\t\t</div>\n\t\t\t\t\t\t\t<div class="awxjs__ui-row">\n\t\t\t\t\t\t\t\t<div>Humidity</div>\n\t\t\t\t\t\t\t\t<div>${(0, a.formatDataValue)(t, "humidity")}</div>\n\t\t\t\t\t\t\t</div>\n\t\t\t\t\t\t\t<div class="awxjs__ui-row">\n\t\t\t\t\t\t\t\t<div>Pressure</div>\n\t\t\t\t\t\t\t\t<div>${(0, a.formatDataValue)(t, "pressureIN", "pressureMB", s)}</div>\n\t\t\t\t\t\t\t</div>\n\t\t\t\t\t\t\t<div class="awxjs__ui-row">\n\t\t\t\t\t\t\t\t<div>Visibility</div>\n\t\t\t\t\t\t\t\t<div>${(0, a.formatDataValue)(t, "visibilityMI", "visibilityKM", s)}</div>\n\t\t\t\t\t\t\t</div>\n\t\t\t\t\t\t\t<div class="awxjs__ui-row">\n\t\t\t\t\t\t\t\t<div>Sky Cover</div>\n\t\t\t\t\t\t\t\t<div>${(0, a.formatDataValue)(t, "sky")}</div>\n\t\t\t\t\t\t\t</div>\n\t\t\t\t\t\t</div>\n\t\t\t\t\t</div>\n\t\t\t\t</div>\n\t\t\t`
                        }
                    },
                    forecast: {
                        id: "forecast",
                        requiresData: !0,
                        request: (t, e) => {
                            const s = "\n\t\t\t\t\ttimestamp,dateTimeISO,tempF,tempC,icon,weatherPrimary,windSpeedMPH,windSpeedKPH,windSpeedMinMPH,windSpeedMinKPH,\n\t\t\t\t\twindSpeedMaxMPH,windSpeedMaxKPH,windGustMPH,windGustKPH,snowIN,snowCM,precipIN,precipMM\n\t\t\t\t".split(",").map(t => "periods." + t);
                            return t.api().endpoint("forecasts").fields(s.join(",")).filter("3hr").limit(7)
                        },
                        data: t => (0, o.isEmpty)(t) ? null : ((t = t.forecasts || t) && (t[0] && (t = t[0]), t = t.periods), {
                            periods: t || []
                        }),
                        renderer: t => {
                            const e = "metric" === t.units;
                            return t.periods.map(t => {
                                const s = (0, o.dateFromISO)(t.dateTimeISO);
                                let i = "Calm";
                                return t.windSpeedMaxMPH > 5 ? i = e ? `${(0, o.toRangeStr)(t.windSpeedMinKPH, t.windSpeedMaxKPH, 5)} ${(0, a.unitsForDataType)("speed", !0)}` : `${(0, o.toRangeStr)(t.windSpeedMinMPH, t.windSpeedMaxMPH, 5)} ${(0, a.unitsForDataType)("speed", !1)}` : t.windSpeedMaxMPH < 5 && t.windSpeedMinMPH > 0 && (i = e ? "< 8 kmh" : "< 5 mph"),
`\n\t\t\t\t\t<div class="awxjs__app__ui-panel-info__forecast">\n\t\t\t\t\t\t<div class="awxjs__app__ui-panel-info__forecast-period">\n\t\t\t\t\t\t\t<div class="awxjs__ui-cols align-center">\n\t\t\t\t\t\t\t\t<div class="awxjs__app__ui-panel-info__forecast-ts">${(0, o.formatDate)(s, e ? "HH:00" : "h a")}</div>\n\t\t\t\t\t\t\t\t<div><img class="awxjs__app__ui-panel-info__forecast-icon" src="https://cdn.aerisapi.com/wxblox/icons/${t.icon || "na.png"}"></div>\n\t\t\t\t\t\t\t\t<div class="awxjs__app__ui-panel-info__forecast-temp">${(0, a.formatDataValue)(t, "tempF", "tempC", e)}</div>\n\t\t\t\t\t\t\t\t<div class="awxjs__app__ui-panel-info__forecast-conditions">\n\t\t\t\t\t\t\t\t\t<div class="awxjs__app__ui-panel-info__forecast-wx">${t.weatherPrimary}</div>\n\t\t\t\t\t\t\t\t\t<div class="awxjs__app__ui-panel-info__forecast-detail"><span>Winds</span> ${i}</div>\n\t\t\t\t\t\t\t\t</div>\n\t\t\t\t\t\t\t</div>\n\t\t\t\t\t\t</div>\n\t\t\t\t\t</div>\n\t\t\t\t`
                            }).join("")
                        }
                    },
                    alerts: {
                        id: "alerts",
                        requiresData: !0,
                        request: (t, e) => t.api().endpoint("alerts").fields("details.type,details.name,timestamps"),
                        data: t => {
                            if ((0, o.isEmpty)(t))
                                return null;
                            const e = (0, o.get)(t, "places.profile");
                            return t.alerts && (t = t.alerts),
                            (0, o.isArray)(t) ? t.map(t => (0, o.extend)(t, {
                                    profile: e
                                })) : null
                        },
                        renderer: t => {
                            const e = "metric" === t.units;
                            return `<div class="awxjs__app__ui-panel-info__alerts">${t.map(t => {
                                let s = "";
                                const i = t.timestamps;
                                if (i) {
                                    const a = (0, o.get)(t, "profile.tzoffset") ? 1e3 * (0, o.get)(t, "profile.tzoffset") : 0,
                                    r = 6e4 * (new Date).getTimezoneOffset() + a,
                                    n = (0, o.get)(t, "profile.tzname") || "",
                                    l = new Date((new Date).getTime() + r),
                                    h = new Date(new Date(1e3 * i.begins).getTime() + r),
                                    d = new Date(new Date(1e3 * i.expires).getTime() + r),
                                    u = e ? `HH:00 [${n}], ddd M/d` : `h:mm a '${n}', EEE M/d`;
                                    s = h.getTime() < l.getTime() ? " until " + (0, o.formatDate)(d, u) : ` from ${(0, o.formatDate)(h, u)} until ${(0, o.formatDate)(d, u)}`
                                }
                                return `\n\t\t\t\t\t<div class="awxjs__app__ui-panel-info__alert">\n\t\t\t\t\t\t<span class="awxjs__app__ui-panel-info__alert-name"><strong>${(0, l.ucwords)(t.details.name.toLowerCase())}</strong></span>\n\t\t\t\t\t<br>${s}</div>\n\t\t\t\t`
                            }).join("")}</div>`
                        }
                    },
                    threats: {
                        id: "threats",
                        requiresData: !0,
                        request: (t, e) => t.api().endpoint("threats").radius("50mi"),
                        data: t => (0, o.get)(t, "threats.0.periods.0.storms"),
                        renderer: t => (0, r.renderWithFallback)(t => `<div class="awxjs__app__ui-panel-info__threats"><div class="awxjs__app__ui-panel-info__threats-row">${(0, l.formatDirections)(t.phrase.long)}</div></div>\n\t\t`, t)
                    },
                    outlook: {
                        id: "outlook",
                        requiresData: !0,
                        request: (t, e) => t.api().endpoint("phrases/summary"),
                        data: t => (0, o.get)(t, "phrases_summary.0"),
                        renderer: t => (0, r.renderWithFallback)(t => `<div class="awxjs__app__ui-panel-info__outlook">${"metric" === t.units ? (0, o.get)(t, "phrases.longMET") : (0, o.get)(t, "phrases.long")}</div>`, t)
                    },
                    hazards: {
                        id: "hazards",
                        requiresData: !0,
                        request: (t, e) => {
                            if (!(0, o.isset)(e.p))
                                return;
                            const s = t.api(),
                            i = "\n\t\t\t\t\ttimestamp,dateTimeISO,tempF,tempC,icon,weatherPrimary,windSpeedMPH,windSpeedKPH,windSpeedMinMPH,windSpeedMinKPH,\n\t\t\t\t\twindSpeedMaxMPH,windSpeedMaxKPH,windGustMPH,windGustKPH,snowIN,snowCM,precipIN,precipMM\n\t\t\t\t".split(",").map(t => "periods." + t);
                            return s.addRequest(t.api().endpoint("forecasts").fields(i.join(",")).filter("3hr").limit(7)),
                            s.addRequest(t.api().endpoint("observations")),
                            s.addRequest(t.api().endpoint("convective/outlook").action("contains")),
                            s.addRequest(t.api().endpoint("lightning/summary").action("closest").radius("60mi").limit(100)),
                            s
                        },
                        data: t => {
                            if ((0, o.isEmpty)(t))
                                return;
                            const e = (0, o.get)(t, "observations.ob") || {},
                            s = (0, o.get)(t, "forecasts"),
                            i = (0, o.get)(t, "convective_outlook_contains"),
                            a = (0, o.get)(t, "lightning_summary_closest");
                            if ((0, o.isEmpty)(e) && (0, o.isEmpty)(s))
                                return;
                            const r = [];
                            if (s && s.length > 0) {
                                const t = s[0].periods;
                                let i = 0,
                                a = 0,
                                n = 0,
                                o = 0;
                                e && e.tempF <= 30 && !1 === /snow/.test(e.weatherPrimary) && (o += e.precipIN),
                                t.forEach(t => {
                                    i += t.snowIN,
                                    n = Math.max(n, t.windGustMPH),
                                    t.tempF >= 30 && (a += t.precipIN),
                                    t.tempF >= 28 && t.tempF <= 32 && (o += t.precipIN)
                                }),
                                r.push({
                                    type: "snow",
                                    name: "Snow",
                                    value: i
                                }),
                                r.push({
                                    type: "ice",
                                    name: "Ice",
                                    value: o
                                }),
                                r.push({
                                    type: "rain",
                                    name: "Rain",
                                    value: a
                                }),
                                r.push({
                                    type: "wind",
                                    name: "Wind",
                                    value: n
                                })
                            }
                            if (i && i.length > 0) {
                                const t = i[0].details.risk;
                                r.push({
                                    type: "convective",
                                    name: "Convective",
                                    value: t.type
                                })
                            } else
                                r.push({
                                    type: "convective",
                                    name: "Convective",
                                    value: "none"
                                });
                            if (a) {
                                const t = (0, o.get)(a[0] || a, "summary.pulse.count");
                                r.push({
                                    type: "lightning",
                                    name: "Lightning",
                                    value: t
                                })
                            } else
                                r.push({
                                    type: "lightning",
                                    name: "Lightning",
                                    value: 0
                                });
                            return r
                        },
                        renderer: t => `<div class="awxjs__app__ui-panel-info__hazards">${t.map(t => {
                            const e = (0, h.valueForIndice)(t.type, t.value) || 0,
                            s = Math.round(e / 5 * 1e3) / 10,
                            i = ("" + e).replace(/\./g, "p");
                            let a = "None";
                            return s >= 80 ? a = "Major" : s >= 60 ? a = "High" : s >= 40 ? a = "Moderate" : s >= 20 ? a = "Low" : s > 0 && (a = "Minimal"),
`\n\t\t\t\t\t<div class="awxjs__app__ui-panel-info__hazard awxjs__ui-cols align-center">\n\t\t\t\t\t\t<div class="awxjs__app__ui-panel-info__hazard-label">${t.name}</div>\n\t\t\t\t\t\t<div class="awxjs__app__ui-panel-info__hazard-bar">\n\t\t\t\t\t\t\t<div class="awxjs__app__ui-panel-info__hazard-bar-inner">\n\t\t\t\t\t\t\t\t<div class="awxjs__app__ui-panel-info__hazard-bar-progress awxjs__app__ui-panel-info__hazard-indice-fill-${i}" style="width:${s}%;"></div>\n\t\t\t\t\t\t\t</div>\n\t\t\t\t\t\t</div>\n\t\t\t\t\t\t<div class="awxjs__app__ui-panel-info__hazard-value awxjs__app__ui-panel-info__hazard-value-${i}">${a}</div>\n\t\t\t\t\t</div>\n\t\t\t\t`
                        }).join("")}</div>`
                    }
                };
                e.default = d,
                t.exports = e.default
            },
            Q5Cw: function (t, e, s) {
                "use strict";
                Object.defineProperty(e, "__esModule", {
                    value: !0
                }),
                e.default = e.config = void 0;
                var i = s("jNhv");
                const a = (t = "") => {
                    switch (t = t.toLowerCase()) {
                    case "elevated":
                        return "#ffb367";
                    case "critical":
                        return "#ff666a";
                    case "extreme":
                        return "#fe59ff";
                    default:
                        return "#000000"
                    }
                },
                r = {
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
                            const e = (0, i.get)(t, "details.risk.type");
                            return {
                                fill: {
                                    color: a(e),
                                    opacity: .7
                                }
                            }
                        }
                    }
                };
                e.config = r;
                var n = r;
                e.default = n
            },
            QvAu: function (t, e, s) {
                "use strict";
                Object.defineProperty(e, "__esModule", {
                    value: !0
                }),
                e.default = void 0;
                var i = function (t) {
                    if (t && t.__esModule)
                        return t;
                    if (null === t || "object" != typeof t && "function" != typeof t)
                        return {
                        default:
                            t
                        };
                    var e = r();
                    if (e && e.has(t))
                        return e.get(t);
                    var s = {},
                    i = Object.defineProperty && Object.getOwnPropertyDescriptor;
                    for (var a in t)
                        if (Object.prototype.hasOwnProperty.call(t, a)) {
                            var n = i ? Object.getOwnPropertyDescriptor(t, a) : null;
                            n && (n.get || n.set) ? Object.defineProperty(s, a, n) : s[a] = t[a]
                        }
                    s.default = t,
                    e && e.set(t, s);
                    return s
                }
                (s("6yI3")),
                a = s("8hz/");
                function r() {
                    if ("function" != typeof WeakMap)
                        return null;
                    var t = new WeakMap;
                    return r = function () {
                        return t
                    },
                    t
                }
                var n = class {
                    tileLayer(t, e, s) {
                        return new i.TileSource(t, e, s)
                    }
                    marker(t, e, s) {
                        return s && s.skip && !0 === s.skip ? null : new i.Marker(e, void 0, {
                            style: s
                        })
                    }
                    polygon(t, e, s) {
                        let r;
                        return s && (r = (0, a.formatLayerOptions)(s)),
                        e.forEach(t => {
                            r.id || (r.id = t.id)
                        }),
                        new i.Polygon(t, e, r, r.id)
                    }
                    polyline(t, e, s) {
                        let r;
                        s && s && (r = (0, a.formatLayerOptions)(s), delete r.fill);
                        e.map(t => [t.lat, t.lon]);
                        return new i.Polyline(t, e, r, r.id)
                    }
                };
                e.default = n,
                t.exports = e.default
            },
            Rld3: function (t, e, s) {
                "use strict";
                Object.defineProperty(e, "__esModule", {
                    value: !0
                }),
                e.default = void 0;
                var i = h(s("KuXL")),
                a = function (t) {
                    if (t && t.__esModule)
                        return t;
                    if (null === t || "object" != typeof t && "function" != typeof t)
                        return {
                        default:
                            t
                        };
                    var e = l();
                    if (e && e.has(t))
                        return e.get(t);
                    var s = {},
                    i = Object.defineProperty && Object.getOwnPropertyDescriptor;
                    for (var a in t)
                        if (Object.prototype.hasOwnProperty.call(t, a)) {
                            var r = i ? Object.getOwnPropertyDescriptor(t, a) : null;
                            r && (r.get || r.set) ? Object.defineProperty(s, a, r) : s[a] = t[a]
                        }
                    s.default = t,
                    e && e.set(t, s);
                    return s
                }
                (s("GpM6")),
                r = h(s("/NXb")),
                n = s("jNhv"),
                o = s("s8Ky");
                function l() {
                    if ("function" != typeof WeakMap)
                        return null;
                    var t = new WeakMap;
                    return l = function () {
                        return t
                    },
                    t
                }
                function h(t) {
                    return t && t.__esModule ? t : {
                    default:
                        t
                    }
                }
                class d extends i.default {
                    constructor(t) {
                        t = t || {},
                        super(t = (0, n.extend)({
                                defaultType: "data-item",
                                multiselect: !0
                            }, t, {
                                className: t.className ? "ui-btn-group " + t.className : "ui-btn-group",
                                ui: {
                                    label: `.${o.Globals.cssPrefix}ui-btn-group-label`,
                                    buttons: `.${o.Globals.cssPrefix}ui-btn-group-items`
                                }
                            })),
                        this._buttons = [],
                        this.setState({
                            expanded: !0
                        })
                    }
                    get id() {
                        return (0, a.buttonIdentifier)(this.opts.id || this.opts.title)
                    }
                    get key() {
                        return this.id
                    }
                    get buttons() {
                        return this._buttons
                    }
                    buttonForId(t) {
                        let e;
                        return this.buttons.forEach((s, i) => {
                            s.id !== t || (0, n.isset)(e) || (e = s)
                        }),
                        e
                    }
                    buttonForKey(t) {
                        let e;
                        return this.buttons.forEach((s, i) => {
                            s.key !== t || (0, n.isset)(e) || (e = s)
                        }),
                        e
                    }
                    buttonForValue(t) {
                        let e;
                        return this.buttons.forEach((s, i) => {
                            s.value !== t || (0, n.isset)(e) || (e = s)
                        }),
                        e
                    }
                    size() {
                        const t = super.size();
                        let e = 0;
                        this.ui.label && (e += this.ui.label.outerHeight(!0)),
                        this.buttons.forEach(t => {
                            e += t.size().height
                        });
                        const s = this.$el.padding(),
                        i = this.$el.borders();
                        return e += s.top + s.bottom,
                        e += i.top + i.bottom,
                        t.height = e,
                        t
                    }
                    _render(t) {
                        return `\n\t\t\t<div class="awxjs__ui-btn-group">\n\t\t\t\t${(0, n.isEmpty)(this.opts.title) ? "" : `<div class="${o.Globals.cssPrefix}ui-btn-group-label">${this.opts.title}</div>`}\n\t\t\t\t<div class="${o.Globals.cssPrefix}ui-btn-group-items" data-multiselect="${this.opts.multiselect ? 1 : 0}"></div>\n\t\t\t</div>\n\t\t`
                    }
                    _onAddedToDOM() {
                        super._onAddedToDOM(),
                        this.opts.buttons && (this._buttons = (this.opts.buttons || []).map(t => {
                                if (t.parent = this.id, t.options = Object.assign(Object.assign({}, this.opts.options), t.options), this.opts.controls && !(0, n.isset)(t.controls) && (t.controls = (0, n.extend)({}, this.opts.controls)), t.segments)
                                    return new r.default(t);
                                t.type || this.opts.defaultType;
                                return new a.default(t)
                            })),
                        this.ui.buttons && 0 === this.ui.buttons.children().length && this.buttons.forEach(t => {
                            t.addTo(this.ui.buttons)
                        })
                    }
                    _setupEvents() {
                        super._setupEvents(),
                        this.buttons.forEach(t => {
                            t instanceof r.default && t.on("expanded collapsed", t => {
                                this.trigger("change:size", t.data)
                            })
                        }),
                        !1 === this.opts.multiselect && this.buttons.forEach(t => {
                            t.selected && (t.disable(!0), this._selectedButton = t),
                            t.on("select", () => {
                                this._selectedButton && (this._selectedButton.deselect(), this._selectedButton.disable(!1)),
                                this._selectedButton = t,
                                t.disable(!0),
                                (0, n.isFunction)(this.opts.onChange) && this.opts.onChange(t.value),
                                this.trigger("change", {
                                    value: t.value
                                })
                            })
                        })
                    }
                }
                var u = d;
                e.default = u,
                t.exports = e.default
            },
            RoH1: function (t, e, s) {
                "use strict";
                Object.defineProperty(e, "__esModule", {
                    value: !0
                }),
                e.Apps = void 0;
                var i = h(s("S5ko")),
                a = h(s("yrzZ")),
                r = h(s("bLvX")),
                n = h(s("Zm+Z")),
                o = h(s("nkQW")),
                l = h(s("uACZ"));
                function h(t) {
                    return t && t.__esModule ? t : {
                    default:
                        t
                    }
                }
                class d extends i.default {}
                class u extends a.default {}
                class c extends r.default {}
                class p extends n.default {}
                class f extends o.default {}
                class g extends l.default {}
                let m,
                _;
                var y;
                e.Apps = y,
                function (t) {
                    t.setAccount = t => {
                        m = t
                    },
                    t.setServers = t => {
                        _ = t
                    },
                    t.InteractiveMapApp = function (t, e) {
                        return new d(t, Object.assign({}, e, {
                                account: m,
                                servers: e.servers || _
                            }))
                    },
                    t.panels = {
                        LayersPanel: function (t) {
                            return new u(t)
                        },
                        InfoPanel: function (t) {
                            return new c(t)
                        },
                        TimelinePanel: function (t, e) {
                            return new p(t, e)
                        },
                        LegendPanel: function (t) {
                            return new f(t)
                        },
                        PlaceSearchPanel: function (t) {
                            return new g(t)
                        }
                    }
                }
                (y || (e.Apps = y = {}))
            },
            "S/2/": function (t, e, s) {
                "use strict";
                Object.defineProperty(e, "__esModule", {
                    value: !0
                }),
                e.default = void 0;
                var i,
                a = (i = s("AIg7")) && i.__esModule ? i : {
                default:
                    i
                },
                r = s("uWkz"),
                n = s("jNhv");
                class o extends a.default {
                    constructor(t) {
                        super(),
                        this.onChange = (0, n.debounce)(() => {
                            this.trigger("change")
                        }, 500),
                        this._opts = (0, n.extend)({}, {
                            layers: {
                                base: void 0,
                                data: void 0,
                                overlays: void 0,
                                text: void 0
                            },
                            center: void 0,
                            zoom: 3,
                            bounds: void 0,
                            size: {
                                width: 600,
                                height: 400
                            },
                            offset: "0",
                            date: void 0,
                            autoFuture: !0,
                            combined: !1,
                            metric: !1
                        }, t)
                    }
                    get layers() {
                        return this._layers
                    }
                    set layers(t) {
                        this._layers = t
                    }
                    opts(t, e) {
                        return (0, n.isset)(e) ? ((0, n.set)(this._opts, t, e), null) : (0, n.get)(this._opts, t)
                    }
                    data() {
                        return this.opts("layers.data")
                    }
                    setData(t) {
                        if (this._opts.combined)
                            this.opts("layers.data", t);
                        else {
                            const e = [],
                            s = [];
                            t.forEach(t => {
                                /-text-?/.test(t) && this.layers.inGroup(t, "text") ? e.push(t) : s.push(t)
                            }),
                            this.opts("layers.data", s),
                            this.opts("layers.text", e)
                        }
                        return this.trigger("change:data", {
                            data: t
                        }),
                        this.onChange(),
                        this
                    }
                    base() {
                        return this.opts("layers.base")
                    }
                    setBase(t) {
                        return this.opts("layers.base", t),
                        this.trigger("change:base", {
                            base: t
                        }),
                        this.onChange(),
                        this
                    }
                    overlays() {
                        return this.opts("layers.overlays")
                    }
                    setOverlays(t) {
                        return this.opts("layers.overlays", t),
                        this.trigger("change:overlays", {
                            overlays: t
                        }),
                        this.onChange(),
                        this
                    }
                    hasOverlays() {
                        const t = this.overlays();
                        return t && !(0, n.isEmpty)(t)
                    }
                    text() {
                        return this.opts("layers.text")
                    }
                    setText(t) {
                        return this.opts("layers.text", t),
                        this.trigger("change:text", {
                            text: t
                        }),
                        this.onChange(),
                        this
                    }
                    hasText() {
                        const t = this.text();
                        return t && !(0, n.isEmpty)(t)
                    }
                    setLayers(t) {
                        return (t = t || {}).base && this.setBase(t.base),
                        t.data && this.setData(t.data),
                        t.overlays && this.setOverlays(t.overlays),
                        t.text && this.setText(t.text),
                        this
                    }
                    offset() {
                        return this.opts("offset")
                    }
                    setOffset(t) {
                        return this.opts("offset", "" + t),
                        this.trigger("change:offset", {
                            offset: t
                        }),
                        this.onChange(),
                        this
                    }
                    setDate(t) {
                        t instanceof Date ? this.setOffset((t => {
                                const e = new Date(t.getTime() + 60 * t.getTimezoneOffset() * 1e3);
                                return (0, n.formatDate)(e, "yyyyMMddHHmm00")
                            })(t)) : this.setOffset("" + t)
                    }
                    center() {
                        const t = this.opts("center");
                        if (t && /^[\d\.-]+,[\d\.-]+$/.test(t)) {
                            const e = t.split(",");
                            if (e && 2 === e.length)
                                return {
                                    lat: parseFloat(e[0]),
                                    lon: parseFloat(e[1])
                                }
                        }
                        return t
                    }
                    setCenter(t, e = null) {
                        if ((0, n.isPlainObject)(t)) {
                            const e = t;
                            t = `${e.lat},${e.lon}`
                        }
                        return this.opts("center", t),
                        delete this._opts.bounds,
                        e >= 0 && this.opts("zoom", e),
                        this.trigger("change:center"),
                        this.trigger("change:bounds"),
                        this.onChange(),
                        this
                    }
                    zoom() {
                        return this.opts("zoom")
                    }
                    setZoom(t) {
                        return this.opts("zoom", t),
                        this.trigger("change:zoom"),
                        this.trigger("change:bounds"),
                        this.onChange(),
                        this
                    }
                    bounds() {
                        return this.opts("bounds")
                    }
                    setBounds(t) {
                        return this.opts("bounds", t),
                        delete this._opts.center,
                        this.trigger("change:bounds"),
                        this.onChange(),
                        this
                    }
                    setRegion(t) {
                        const e = r.Regions.get(t);
                        return e && (e.center ? this.setCenter(`${e.center.lat},${e.center.lon}`, this.zoom()) : e.bounds && this.setBounds(e.bounds)),
                        this
                    }
                    size() {
                        const t = this.opts("size");
                        return t && t.width && t.height ? {
                            width: t.width,
                            height: t.height
                        }
                         : null
                    }
                    setSize(t, e) {
                        if ("auto" === e) {
                            const s = this.opts("size.factor");
                            s && (e = Math.round(t * s))
                        }
                        return this._opts.size = {
                            width: t,
                            height: e
                        },
                        this.trigger("change:size", this.size()),
                        this.trigger("change:bounds"),
                        this.onChange(),
                        this
                    }
                    metric() {
                        return this.opts("metric")
                    }
                    setMetric(t) {
                        return this.opts("metric", t),
                        this.trigger("change:metric", {
                            metric: t
                        }),
                        this.onChange(),
                        this
                    }
                    toRequestOpts(t, e = !1) {
                        let s = [];
                        if ((t = t || ["base", "data", "overlays", "text"]).forEach(t => {
                                const e = this.opts("layers." + t);
                                (0, n.isEmpty)(e) || (s = s.concat(e))
                            }), s) {
                            let i = [...s];
                            if (t.indexOf("text") > -1 && (i = i.map(t => {
                                        if (/-text-?/.test(t) && this.layers.hasMetric(t)) {
                                            const e = this.opts("metric") ? "text-metric" : "text",
                                            s = t.match(/^([\w-]+-text)(-metric)?(-(dk|lg)){0,2}/);
                                            return `${s[1].replace(/-text.*$/, "")}-${e}${s[3] || ""}`
                                        }
                                        return t.replace(/-metric/, "")
                                    })), -1 !== t.indexOf("data") || -1 !== t.indexOf("text")) {
                                this.layers.future();
                                const t = this.layers.futureCodes();
                                this.opts("autoFuture") && s.forEach(t => {
                                    const e = this.layers.find("id", "f" + t, !0);
                                    e && -1 === i.indexOf(e.id) && i.splice(s.indexOf(t) + 1, 0, e.id)
                                });
                                const a = e => {
                                    let s = -1 !== t.indexOf(e);
                                    return s || t.forEach(t => {
                                        const i = new RegExp(`^${t}-`);
                                        !s && i.test(e) && (s = !0)
                                    }),
                                    s
                                };
                                i = i.filter(t => !(!this.layers.inGroup(t, "overlay") && !this.layers.inGroup(t, "masks")) || (e ? a(t) : !a(t)))
                            }
                            s = 0 === i.length ? null : i
                        }
                        let i = this.center();
                        if ((0, n.isPlainObject)(i)) {
                            const t = i;
                            i = `${t.lat},${t.lon}`
                        }
                        return {
                            layers: {
                                base: -1 !== t.indexOf("base") ? this.base() : null,
                                data: -1 !== t.indexOf("data") ? s : null,
                                overlays: -1 !== t.indexOf("overlays") ? this.overlays() : null,
                                text: -1 !== t.indexOf("text") ? s : null
                            },
                            p: i,
                            zoom: this.zoom(),
                            bounds: this.bounds(),
                            size: this.size(),
                            offset: this.offset(),
                            metric: this.metric(),
                            format: "png"
                        }
                    }
                }
                var l = o;
                e.default = l,
                t.exports = e.default
            },
            S5ko: function (t, e, s) {
                "use strict";
                Object.defineProperty(e, "__esModule", {
                    value: !0
                }),
                e.default = void 0;
                var i = y(s("AIg7")),
                a = y(s("s9Ns")),
                r = y(s("yrzZ")),
                n = y(s("bLvX")),
                o = y(s("Zm+Z")),
                l = y(s("nkQW")),
                h = y(s("uACZ")),
                d = y(s("lQHJ")),
                u = s("NvVb"),
                c = s("xgna"),
                p = y(s("b9Bd")),
                f = y(s("KRIx")),
                g = s("tPWv"),
                m = s("jNhv"),
                _ = s("TpAr");
                function y(t) {
                    return t && t.__esModule ? t : {
                    default:
                        t
                    }
                }
                class v extends i.default {
                    constructor(t, e) {
                        if (super(), this._ready = !1, this._layoutCache = {}, this._layout = (0, m.debounce)((t = !1) => {
                                t || Object.keys(this._panels).forEach(t => {
                                    const e = this._panels[t];
                                    if (e) {
                                        const s = (0, m.get)(this._opts, `panels.${t}.position`);
                                        s && (0, m.isPlainObject)(s) && ("info" !== t && e.layout(), s.pin ? e.pinTo(s.pin, s.translate) : (0, m.isset)(s.x) && (0, m.isset)(s.y) && e.moveTo(s))
                                    }
                                });
                                const e = this.panels.layers,
                                s = this.panels.timeline,
                                i = this.panels.legends,
                                a = this.$el.bounds(!0),
                                r = {
                                    top: 0,
                                    left: 0,
                                    right: a.right,
                                    bottom: a.height,
                                    width: a.width,
                                    height: a.height
                                };
                                let n = Object.assign({}, r);
                                if (s) {
                                    const t = s.size(),
                                    e = 10, {
                                        pin: i
                                    } = (0, m.get)(this._opts, "panels.timeline.position") || {};
                                    if ((0, c.isCenterPinned)(i)) {
                                        n = (0, c.insetBounds)(r, e);
                                        const s = {};
                                        t.width >= n.width ? s.left = e + "px" : s.left = Math.floor((a.width - t.width) / 2) + "px",
                                        this._layoutCache.timeline = s
                                    }
                                }
                                if (e) {
                                    const t = e,
                                    o = t.contentSize(),
                                    l = t.bounds(!0, this.$el);
                                    let h = l.top;
                                    n = Object.assign({}, r);
                                    const {
                                        pin: d,
                                        translate: u
                                    } = (0, m.get)(this._opts, "panels.layers.position") || {};
                                    (0, c.isMiddlePinned)(d) && (n.top = Math.max(0, Math.round((a.height - l.height) / 2)), n.bottom = Math.min(a.height, n.top + n.height), h = u.y, h = Math.abs(u.y)),
                                    n = (0, c.boundsAdjustedForAnchor)(n, {
                                        width: l.width,
                                        height: l.height
                                    }, d);
                                    const p = (0, c.insetBounds)(n, 10);
                                    if (i) {
                                        const {
                                            pin: t
                                        } = (0, m.get)(this._opts, "panels.legends.position") || {},
                                        e = i.bounds(!0, this.$el);
                                        (0, c.intersects)(p, e, !1) && ((0, c.isBottomPinned)(t) ? n.bottom = e.top : (0, c.isTopPinned)(t) && (n.top = e.bottom))
                                    }
                                    if (s) {
                                        const {
                                            pin: t
                                        } = (0, m.get)(this._opts, "panels.timeline.position") || {},
                                        e = s.bounds(!0, this.$el);
                                        (0, c.intersects)(p, e, !1) && ((0, c.isBottomPinned)(t) ? n.bottom = e.top : (0, c.isTopPinned)(t) && (n.top = e.bottom))
                                    }
                                    n = (0, c.insetBounds)(n, h);
                                    let f = Math.max(n.bottom - n.top, 0);
                                    0 === f && (f = r.bottom - r.top),
                                    f = Math.min(f, n.height) - e.toolbar.outerHeight();
                                    const _ = (0, g.scrollBarWidth)(),
                                    y = {
                                        top: n.top + "px",
                                        height: o.height + "px",
                                        "max-height": f + "px",
                                        width: o.width + _ + "px"
                                    };
                                    t.setMaxContentSize({
                                        height: f,
                                        width: o.width + _
                                    }),
                                    t.content.css({
                                        "padding-right": _ + "px"
                                    }),
                                    this._layoutCache.layers = y
                                }
                            }, 50), !t)
                            throw new Error("[Aeris] Invalid DOM target specified for InteractiveMapApp");
                        const s = (0, c.viewportSizeClass)();
                        if (e = (0, m.extend)((0, _.getMapAppDefaults)(s), {
                                map: {
                                    account: e.account,
                                    servers: e.servers
                                },
                                panels: {
                                    search: {
                                        account: e.account
                                    }
                                }
                            }, e), this._opts = e, this._account = e.account, !t)
                            throw new Error("Invalid target for InteractiveMapApp");
                        if (!this.account)
                            throw new Error("An InteractiveMapApp must be configured with a valid `account` value.");
                        (0, p.default)(t).html('\n\t\t\t<div class="awxjs__app__component awxjs__app__fullscreen">\n\t\t\t\t<div class="awxjs__app__map"></div>\n\t\t\t</div>\n\t\t'),
                        this._target = (0, p.default)(".awxjs__app__component", (0, p.default)(t)),
                        this._panels = {
                            layers: null,
                            info: null,
                            timeline: null,
                            legends: null,
                            search: null
                        },
                        this._modules = new d.default(this);
                        const {
                            layers: i,
                            info: r,
                            timeline: n,
                            search: o,
                            legends: l
                        } = e.panels,
                        h = (0, m.cloneDeep)(e.map);
                        if (h && i) {
                            let t = (0, m.get)(e, "map.layers");
                            if (t) {
                                (0, m.isString)(t) && (t = t.replace(/\s/g, "").split(","));
                                const s = (i.buttons || []).reduce((t, e) => {
                                    if (!1 === (0, m.isset)(e.buttons)) {
                                        const s = e.value || e.id,
                                        i = e.segments;
                                        i && (0, m.isArray)(i) && !e.filter ? i.forEach(e => {
                                            const s = e.value.replace(/\:.+$/, "");
                                            (0, m.replace)(t, s, e.value)
                                        }) : ((0, m.replace)(t, e.value, s), (0, m.replace)(t, e.id, s))
                                    }
                                    return t
                                }, (0, m.cloneDeep)(t));
                                (0, m.set)(e, "map.layers", s),
                                (0, m.set)(h, "layers", null)
                            }
                        }
                        this._map = new a.default((0, p.default)(".awxjs__app__map", this._target), h),
                        i && !1 !== i.enabled && this._setupLayersPanel(i),
                        r && !1 !== r.enabled && this._setupInfoPanel(r),
                        n && !1 !== n.enabled && this._setupTimeline(n),
                        o && !1 !== o.enabled && this._setupSearchPanel(o),
                        l && !1 !== l.enabled && this._setupLegendsPanel(l);
                        const u = new f.default(this.map, this.panels.layers);
                        u.on("select", t => {
                            this.trigger("layer:select", Object.assign(Object.assign({}, t.data), {
                                    source: this.getSource(t.data.key)
                                }))
                        }).on("deselect", t => {
                            this.trigger("layer:deselect", Object.assign(Object.assign({}, t.data), {
                                    source: this.getSource(t.data.key)
                                }))
                        }).on("change", t => {
                            this.trigger("layer:change", Object.assign(Object.assign({}, t.data), {
                                    source: this.getSource(t.data.key)
                                }))
                        }).on("change:control", t => {
                            this.trigger("layer:change:control", Object.assign(Object.assign({}, t.data), {
                                    source: this.getSource(t.data.key)
                                }))
                        }),
                        this._sourceManager = u,
                        this._map.on("change:units", t => {
                            this.trigger("change:units", t.data)
                        }),
                        this._map.on("ready", () => {
                            this._ready = !0,
                            this.trigger("ready")
                        }),
                        (0, p.default)(window).on("resize", () => {
                            this._layout()
                        }),
                        this._layout(),
                        setTimeout(() => this._layout(), 200)
                    }
                    get account() {
                        return this._account
                    }
                    get $el() {
                        return this._target
                    }
                    get map() {
                        return this._map
                    }
                    get panels() {
                        return this._panels
                    }
                    get sources() {
                        return this._sourceManager.sources
                    }
                    get modules() {
                        return this._modules
                    }
                    addSource(t, e, s) {
                        const i = this.map.createSource(t, e, s);
                        if (!i)
                            return console.warn(`[Aeris] Unable to add data source to InteractiveMapApp for key {${t}}, type {${e}} is invalid.\n\t\t\t\tData sources must be of type 'tile', 'vector', 'geojson' or 'text'. See\n\t\t\t\thttps://www.aerisweather.com/support/docs/toolkits/aeris-js-sdk/map-modules/data-sources/ for more info.`), null;
                        i.strategy = this.map.strategy,
                        this._sourceManager.addSource(t, i);
                        const a = this.initialLayers();
                        if ((0, m.isArray)(a) && -1 !== a.indexOf(t)) {
                            const e = this.panels.layers;
                            e ? e.select([t]) : this.map.addSource(i, {
                                id: t
                            })
                        }
                        return i
                    }
                    getSource(t) {
                        return this._sourceManager.findSource(t)
                    }
                    showInfo(t, e, s) {
                        const i = this.panels.info;
                        return i && i.showContent(t, e, s),
                        i
                    }
                    showInfoAtCoord(t, e, s, i) {
                        const a = this.panels.info;
                        if (!t)
                            return a;
                        i || (i = (0, m.get)(this._opts, "panels.info.marker"));
                        const {
                            lat: r,
                            lon: n
                        } = (0, u.normalize)(t);
                        return a && (0, m.isset)(r) && (0, m.isset)(n) && (a.showContent(e, s).load({
                                p: `${r},${n}`
                            }), this._infoPanelMarker && this.map.strategy.removeMarker(this._infoPanelMarker), i && (this._infoPanelMarker = this.map.strategy.factory.marker("info", t, i), this._infoPanelMarker && this.map.strategy.addMarker(this._infoPanelMarker))),
                        a
                    }
                    closeInfoPanel() {
                        this.panels.info.close()
                    }
                    getPanel(t) {
                        const e = this._panels[t];
                        return e || null
                    }
                    updatePanel(t, e) {
                        const s = this.getPanel(t);
                        if (s && (e = Object.assign(Object.assign({}, s.opts), e), s.remove(!0), "layers" === t && this.map.removeAllSources()), (0, m.set)(this._opts, "panels." + t, e), !1 !== e.enabled) {
                            switch (t) {
                            case "layers":
                                this._setupLayersPanel(e);
                                break;
                            case "timeline":
                                this._setupTimeline(e);
                                break;
                            case "legends":
                                this._setupLegendsPanel(e);
                                break;
                            case "search":
                                this._setupSearchPanel(e);
                                break;
                            case "info":
                                this._setupInfoPanel(e)
                            }
                            this._layout()
                        }
                    }
                    setMetric(t) {
                        this.map.setMetric(t)
                    }
                    isReady() {
                        return this._ready
                    }
                    initialLayers() {
                        var t,
                        e;
                        const s = (null === (e = null === (t = this._opts) || void 0 === t ? void 0 : t.map) || void 0 === e ? void 0 : e.layers) || [];
                        let i;
                        return i = (0, m.isString)(s) ? s.replace(/,\s+/, ",").split(",") : s,
                        i
                    }
                    _setupLayersPanel(t) {
                        const e = new r.default((0, m.extend)({}, t, {
                                    id: "layers"
                                }));
                        e.addTo(this.$el),
                        e.on("button:add button:remove change:size", () => {
                            this._layout(!0)
                        }).on("show hide", () => {
                            this._layout()
                        }),
                        this._panels.layers = e,
                        this._sourceManager && this._sourceManager.linkPanel(e);
                        const s = (t, s) => {
                            if (t) {
                                const i = e.buttonForId(t);
                                i && i.setLoading(s)
                            }
                        };
                        this.map.on("source:load:start", t => {
                            s(t.data.layer, !0)
                        }).on("source:load:done", t => {
                            s(t.data.layer, !1)
                        }).on("source:add", t => {
                            this._sourceManager.handleSourceEvent("add", t.data.id)
                        }).on("source:remove", t => {
                            this._sourceManager.handleSourceEvent("remove", t.data.id)
                        });
                        let i = (0, m.get)(this._opts, "map.layers");
                        i && ((0, m.isString)(i) && (i = i.replace(/\s/g, "").split(",")), this.map.on("ready", () => {
                                e.select(i)
                            }))
                    }
                    _setupInfoPanel(t) {
                        var e,
                        s,
                        i;
                        const a = new n.default((0, m.extend)({}, t, {
                                    id: "info",
                                    account: this.account
                                }));
                        a.addTo(this.$el),
                        this._panels.info = a,
                        a.on("close", () => {
                            this._infoPanelMarker && (this.map.strategy.removeMarker(this._infoPanelMarker), this._infoPanelMarker = null)
                        }).on("show hide", () => {
                            this._layout()
                        }),
                        this.on("change:units", t => {
                            const e = t.data.metric || !1;
                            a.setMetric(e)
                        });
                        const r = (null === (i = null === (s = null === (e = this._opts.panels) || void 0 === e ? void 0 : e.info) || void 0 === s ? void 0 : s.views) || void 0 === i ? void 0 : i.localweather) || {
                            views: [{
                                    renderer: "place"
                                }, {
                                    renderer: "units"
                                }, {
                                    title: "Active Threats",
                                    renderer: "threats"
                                }, {
                                    title: "Active Alerts",
                                    renderer: "alerts"
                                }, {
                                    title: "Impacts",
                                    renderer: "hazards"
                                }, {
                                    title: "Observations",
                                    renderer: "obs"
                                }, {
                                    title: "Outlook",
                                    renderer: "outlook"
                                }, {
                                    title: "Short-Term Forecast",
                                    renderer: "forecast"
                                }
                            ]
                        };
                        this.panels.info.setContentView("localweather", r)
                    }
                    _setupTimeline(t) {
                        const e = (0, m.get)(t, "range.value"),
                        s = (0, m.get)(this._opts, "map.timeline.from"),
                        i = (0, m.get)(this._opts, "map.timeline.to");
                        if (!e || (0, m.isset)(s) || (0, m.isset)(i))
                            (0, m.set)(t, "range.value", [this.map.timeline.startOffset() / 3600 / 1e3, this.map.timeline.endOffset() / 3600 / 1e3]);
                        else {
                            const [t, s] = e;
                            (0, m.isNumber)(t) && this.map.timeline.setStartOffset(3600 * t * 1e3),
                            (0, m.isNumber)(s) && this.map.timeline.setEndOffset(3600 * s * 1e3)
                        }
                        const a = new o.default(this.map.timeline, (0, m.extend)({}, t, {
                                    id: "timeline"
                                }));
                        a.on("change:range", () => {
                            const t = this.map.timeline.currentTime;
                            this.map.timeline.goToTime(t)
                        }).on("show hide", () => {
                            this._layout()
                        }),
                        a.addTo(this.$el),
                        this._panels.timeline = a
                    }
                    _setupSearchPanel(t) {
                        const e = new h.default((0, m.extend)({}, t, {
                                    id: "search"
                                }));
                        e.addTo(this.$el),
                        this._panels.search = e,
                        e.on("select", t => {
                            const e = (0, m.get)(t.data, "result.loc");
                            if (e) {
                                const {
                                    lat: t,
                                    long: s
                                } = e,
                                i = {
                                    lat: t,
                                    lon: s
                                };
                                this.map.setView(i, 8),
                                this.showInfoAtCoord(i, "localweather", "Local Weather")
                            }
                        })
                    }
                    _setupLegendsPanel(t) {
                        const e = new l.default((0, m.extend)({}, t, {
                                    id: "legends"
                                }));
                        e.addTo(this.$el),
                        this._panels.legends = e,
                        this.map.on("layer:add", t => {
                            if (!(0, m.isset)(t.data))
                                return;
                            const {
                                layer: s,
                                id: i
                            } = t.data,
                            a = s || i;
                            if (a) {
                                a.toLowerCase().replace(/^[^\:]+\:\:/, "").replace(/\:[^,]+/g, "").replace(/__/, ",").split(",").forEach(t => {
                                    e.legend.add(t, {
                                        account: this.account,
                                        within: {
                                            bounds: this.map.getBounds()
                                        }
                                    })
                                })
                            }
                        }).on("layer:remove source:remove", t => {
                            if (!(0, m.isset)(t.data))
                                return;
                            const {
                                layer: s,
                                id: i
                            } = t.data,
                            a = s || i;
                            if (a) {
                                a.toLowerCase().replace(/^[^\:]+\:\:/, "").replace(/\:[^,]+/g, "").replace(/__/, ",").split(",").forEach(t => {
                                    e.legend.remove(t)
                                })
                            }
                        }).on("change:bounds", t => {
                            const s = {
                                account: this.account
                            };
                            s.within = {
                                bounds: this.map.getBounds()
                            },
                            e.legend.update(s)
                        })
                    }
                }
                var b = v;
                e.default = b,
                t.exports = e.default
            },
            SJ39: function (t, e, s) {
                "use strict";
                Object.defineProperty(e, "__esModule", {
                    value: !0
                }),
                Object.defineProperty(e, "TextSource", {
                    enumerable: !0,
                    get: function () {
                        return i.default
                    }
                }),
                Object.defineProperty(e, "VectorSource", {
                    enumerable: !0,
                    get: function () {
                        return a.default
                    }
                }),
                Object.defineProperty(e, "GeoJsonSource", {
                    enumerable: !0,
                    get: function () {
                        return r.default
                    }
                }),
                Object.defineProperty(e, "TileSource", {
                    enumerable: !0,
                    get: function () {
                        return n.default
                    }
                });
                var i = o(s("pa5O")),
                a = o(s("E4z8")),
                r = o(s("gIvP")),
                n = o(s("26Hj"));
                function o(t) {
                    return t && t.__esModule ? t : {
                    default:
                        t
                    }
                }
            },
            T1DL: function (t, e, s) {
                "use strict";
                Object.defineProperty(e, "__esModule", {
                    value: !0
                }),
                e.loadMapModuleConfig = e.renderWithFallback = e.isOpenLayers = e.isGoogle = e.isMapbox = e.isLeaflet = e.isCoordObject = e.mapTimestampFromDate = void 0;
                var i = s("dgv4"),
                a = s("jNhv");
                e.mapTimestampFromDate = t => {
                    const e = new Date(t.getTime() + 60 * t.getTimezoneOffset() * 1e3);
                    return (0, a.formatDate)(e, "yyyyMMddHHmm00")
                };
                e.isCoordObject = t => {
                    if ((0, a.isPlainObject)(t)) {
                        const {
                            lat: e,
                            lon: s
                        } = t;
                        return (0, a.isset)(e) && (0, a.isset)(s)
                    }
                    return !1
                };
                e.isLeaflet = t => {
                    if (t) {
                        const e = (0, a.has)(t, "openPopup");
                        if ("undefined" != typeof L && (t instanceof L.map || t instanceof L.Map) && e)
                            return !0;
                        if (!(0, a.isHTMLElement)(t) && e)
                            return !0
                    }
                    return !1
                };
                e.isMapbox = t => {
                    if (t) {
                        const e = (0, a.has)(t, "queryRenderedFeatures");
                        if ("undefined" != typeof mapboxgl && t instanceof mapboxgl.Map && e)
                            return !0;
                        if (!(0, a.isHTMLElement)(t) && e)
                            return !0
                    }
                    return !1
                };
                e.isGoogle = t => {
                    if (t) {
                        const e = (0, a.has)(t, "getStreetView");
                        if ("undefined" != typeof google && t instanceof google.maps.Map && e)
                            return !0;
                        if (!(0, a.isHTMLElement)(t) && e)
                            return !0
                    }
                    return !1
                };
                e.isOpenLayers = t => {
                    if (t) {
                        const e = (0, a.has)(t, "forEachFeatureAtPixel");
                        if ("undefined" != typeof ol && t instanceof ol.Map && e)
                            return !0;
                        if (!(0, a.isHTMLElement)(t) && e)
                            return !0
                    }
                    return !1
                };
                e.renderWithFallback = (t, e, s = "") => t && (0, a.isset)(e) && !(0, a.isEmpty)(e) ? t(e) : s;
                e.loadMapModuleConfig = (t, e) => {
                    (0, i.modulesLoader)().then(s => {
                        const i = (0, a.get)(s, t);
                        i && i().then(t => {
                            const s = new(t = t.default || t);
                            e(s.id, s.source(), s)
                        })
                    })
                }
            },
            TSzo: function (t, e, s) {
                "use strict";
                Object.defineProperty(e, "__esModule", {
                    value: !0
                }),
                e.Views = void 0;
                var i = h(s("s9Ns")),
                a = h(s("u1da")),
                r = h(s("Xl8N")),
                n = s("SJ39"),
                o = function (t) {
                    if (t && t.__esModule)
                        return t;
                    if (null === t || "object" != typeof t && "function" != typeof t)
                        return {
                        default:
                            t
                        };
                    var e = l();
                    if (e && e.has(t))
                        return e.get(t);
                    var s = {},
                    i = Object.defineProperty && Object.getOwnPropertyDescriptor;
                    for (var a in t)
                        if (Object.prototype.hasOwnProperty.call(t, a)) {
                            var r = i ? Object.getOwnPropertyDescriptor(t, a) : null;
                            r && (r.get || r.set) ? Object.defineProperty(s, a, r) : s[a] = t[a]
                        }
                    s.default = t,
                    e && e.set(t, s);
                    return s
                }
                (s("T1DL"));
                function l() {
                    if ("function" != typeof WeakMap)
                        return null;
                    var t = new WeakMap;
                    return l = function () {
                        return t
                    },
                    t
                }
                function h(t) {
                    return t && t.__esModule ? t : {
                    default:
                        t
                    }
                }
                class d extends i.default {}
                let u,
                c;
                var p;
                e.Views = p,
                function (t) {
                    t.utils = Object.assign({}, o),
                    t.datasources = {
                        Tile: n.TileSource,
                        Vector: n.VectorSource,
                        GeoJson: n.GeoJsonSource,
                        Text: n.TextSource
                    },
                    t.setAccount = t => {
                        u = t
                    },
                    t.setServers = t => {
                        c = t
                    },
                    t.InteractiveMap = function (t, e, s) {
                        return new d(t, Object.assign({}, e, {
                                account: u,
                                servers: e.servers || c
                            }), s)
                    },
                    t.Map = function (t, e) {
                        return new a.default(t, Object.assign({}, e, {
                                account: u,
                                servers: e.servers || c
                            }))
                    },
                    t.Legend = function (t, e) {
                        return new r.default(t, Object.assign({}, e, {
                                account: u
                            }))
                    }
                }
                (p || (e.Views = p = {}))
            },
            TTjL: function (t, e, s) {
                "use strict";
                Object.defineProperty(e, "__esModule", {
                    value: !0
                }),
                e.default = void 0;
                var i = n(s("KuXL")),
                a = s("jNhv"),
                r = n(s("b9Bd"));
                function n(t) {
                    return t && t.__esModule ? t : {
                    default:
                        t
                    }
                }
                class o extends i.default {
                    constructor(t) {
                        super((0, a.extend)({}, t, {
                                className: (0, a.get)(t, "className") ? "ui-slider-range-handle " + t.className : "ui-slider-range-handle"
                            })),
                        this._handleMouseDown = t => {
                            this.focus()
                        },
                        this._handleMouseUp = t => {
                            document.activeElement === this.$el[0] && this.setClickFocus(!0)
                        },
                        this._handleBlur = t => {
                            this.setClickFocus(!1)
                        },
                        this.initialize(),
                        this.$el.on("mousedown", this._handleMouseDown),
                        this.$el.on("blur", this._handleBlur),
                        (0, r.default)(document).on("mouseup", this._handleMouseUp)
                    }
                    initialize(t) {
                        super.initialize(t),
                        this.updatePosition(0, this.opts)
                    }
                    setClickFocus(t) {
                        this.setState({
                            clickFocused: t
                        }),
                        t ? this.$el.addClass("awxjs__ui-slider-range-handle-click-focused") : this.$el.removeClass("awxjs__ui-slider-range-handle-click-focused")
                    }
                    clickFocus() {
                        this.setClickFocus(!0),
                        this.focus()
                    }
                    focus() {
                        this.$el[0].focus()
                    }
                    blur() {
                        this.$el[0].blur()
                    }
                    updatePosition(t, e) {
                        this.$el.css("left", t + "%"),
                        e && (this.$el.attr("aria-valuemin", e.values.min), this.$el.attr("aria-valuemax", e.values.max), this.$el.attr("aria-valuenow", e.values.current), this.$el.attr("aria-disabled", !0 === e.disabled))
                    }
                    _render(t) {
                        return '\n\t\t\t<div class="awxjs__ui-slider-range-handle"></div>\n\t\t'
                    }
                    _afterRender() {
                        this.$el.attr("role", "slider"),
                        (0, a.isset)(this.opts.tabindex) && this.$el.attr("tabindex", this.opts.tabindex)
                    }
                }
                var l = o;
                e.default = l,
                t.exports = e.default
            },
            TpAr: function (t, e, s) {
                "use strict";
                Object.defineProperty(e, "__esModule", {
                    value: !0
                }),
                e.getMapAppDefaults = void 0;
                e.getMapAppDefaults = t => ({
                    map: {},
                    panels: {
                        layers: {
                            title: "Layers",
                            enabled: !0,
                            toggleable: "compact" === t.width,
                            className: "app__ui-panel-layers",
                            position: {
                                pin: "topright",
                                translate: {
                                    x: -10,
                                    y: 10
                                }
                            }
                        },
                        timeline: {
                            title: "Timeline",
                            enabled: !0,
                            position: {
                                pin: "compact" === t.width ? "bottomleft" : "bottom",
                                translate: {
                                    x: "compact" === t.width ? 10 : 0,
                                    y: -10
                                }
                            }
                        },
                        info: {
                            enabled: !0,
                            position: {
                                pin: "topleft",
                                translate: {
                                    x: 10,
                                    y: 10
                                }
                            },
                            marker: {
                                svg: {
                                    shape: {
                                        type: "circle",
                                        fill: {
                                            color: "#15a8e1"
                                        },
                                        stroke: {
                                            color: "#ffffff",
                                            width: 2
                                        }
                                    }
                                },
                                size: [20, 20]
                            }
                        },
                        legends: {
                            title: "Legends",
                            enabled: !0,
                            toggleable: !0,
                            position: {
                                pin: "bottomright",
                                translate: {
                                    x: -10,
                                    y: -10
                                }
                            }
                        },
                        search: {
                            title: "Location Search",
                            enabled: !0,
                            position: {
                                pin: "top",
                                translate: {
                                    y: 10
                                }
                            }
                        }
                    }
                })
            },
            TtNf: function (t, e, s) {
                "use strict";
                Object.defineProperty(e, "__esModule", {
                    value: !0
                }),
                e.default = void 0;
                var i,
                a = (i = s("yP8Q")) && i.__esModule ? i : {
                default:
                    i
                },
                r = s("jNhv");
                class n extends a.default {
                    setSize(t) {
                        this.opts.size = (0, r.extend)(this.opts.size, t),
                        this.update()
                    }
                    url() {
                        return this._url()
                    }
                    _url() {
                        const t = this.opts,
                        e = (0, r.extend)({
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
                        a = e.label || {},
                        n = {};
                        if ("point" === s)
                            if ((0, r.isset)(e.gutter)) {
                                if ((0, r.isString)(e.gutter)) {
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
                        if (n.ls = a.fontsize, (0, r.isEmpty)(a.custom) || (n.labels = a.custom.replace(/,\s+/g, ",").replace(/\s/g, "%20")), !(0, r.isEmpty)(a.color)) {
                            const t = a.color.replace(/#/, "");
                            6 === t.length && (n.lc = t)
                        }
                        "point" !== s || (0, r.isEmpty)(e.filter_groups) || (n.filter = e.filter_groups),
                        (0, r.isset)(t.range) && ((0, r.isString)(t.range) ? n.range = "," + t.range : (0, r.isArray)(t.range) && (1 === t.range.length ? n.range = "," + t.range[0] : n.range = t.range.join(","))),
                        (0, r.isset)(t.keys) ? n.keys = t.keys : (0, r.isset)(t.filter) && (n.filter = t.filter);
                        const o = e.units;
                        o && (t.metric ? n.units = o.metric : n.units = o.imperial);
                        const {
                            width: l,
                            height: h
                        } = t.size || {
                            width: null,
                            height: null
                        }, {
                            width: d,
                            height: u
                        } = i.size || {
                            width: null,
                            height: null
                        },
                        c = (0, r.isEmpty)(e.interval) ? "" : "-i" + e.interval,
                        p = {
                            interval: (0, r.isEmpty)(a.interval) ? "" : "-li" + a.interval
                        },
                        f = {
                            size: (0, r.isEmpty)(d) || (0, r.isEmpty)(u) ? "" : `-c${d}x${u}`,
                            pad: (0, r.isset)(e.gutter) ? `-p${e.gutter.x},${e.gutter.y}` : ""
                        },
                        g = `-${e.orientation},${a.position}`,
                        m = t.metric ? "-metric" : "",
                        _ = (0, r.isEmpty)(l) || (0, r.isEmpty)(h) || t.autosize ? "" : `_${l}x${h}`,
                        y = t.format,
                        v = (0, r.isEmpty)(e.radius) ? "" : "-r" + e.radius,
                        b = !(0, r.isEmpty)(e.columns) && e.columns > 0 ? "-col" + e.columns : "";
                        let w = "https://legends.aerisapi.com/" + this.key;
                        return w += "point" === s ? `${v}${b}${f.pad}` : `${c}${p.interval}${f.size}${f.pad}${g}${m}`,
                        w += `${_}.${y}`,
                        w += (w.indexOf("?") > -1 ? "&" : "?") + Object.keys(n).map(t => `${encodeURIComponent(t)}=${n[t]}`).join("&"),
                        w
                    }
                }
                var o = n;
                e.default = o,
                t.exports = e.default
            },
            UHVH: function (t, e, s) {
                "use strict";
                Object.defineProperty(e, "__esModule", {
                    value: !0
                }),
                e.default = void 0;
                var i,
                a = s("jNhv"),
                r = (i = s("6TFz")) && i.__esModule ? i : {
                default:
                    i
                },
                n = s("+l/j");
                class o extends r.default {
                    update(t) {
                        var e;
                        if (!(0, a.isset)(t))
                            return;
                        const s = null === (e = t.data) || void 0 === e ? void 0 : e.value;
                        let i = t.style || {};
                        (0, a.isFunction)(i) && (i = i({
                                value: s
                            })),
                        this.setStyle(i)
                    }
                    setStyle(t) {
                        const e = (0, n.markerIconFromStyle)(t);
                        e && this.renderable.setIcon(e)
                    }
                    createRenderable() {
                        const {
                            style: t
                        } = this.opts,
                        e = this.coordinate,
                        s = {};
                        t && (s.icon = (0, n.markerIconFromStyle)(t), t.zIndex && (s.zIndex = t.zIndex));
                        const i = new google.maps.Marker((0, a.extend)({
                                    position: new google.maps.LatLng(e.lat, e.lon),
                                    optimized: !1
                                }, s));
                        if (t && t.callout) {
                            let e = t.callout;
                            if ((0, a.isFunction)(t.callout)) {
                                e = (0, t.callout)()
                            }
                        }
                        return i
                    }
                    updateVisibility(t) {}
                    addToMap(t, e) {
                        const s = this.renderable;
                        s && (this._events.forEach(t => {
                                const e = `__awxjs_${t}Handler`;
                                s[e] ? s[e].remove() : s[e] = s.addListener(t, () => {
                                    this.trigger(t, {
                                        data: this.data,
                                        marker: s
                                    })
                                })
                            }), s.setMap(t))
                    }
                    removeFromMap(t) {
                        const e = this.renderable;
                        e && (this._events.forEach(t => {
                                const s = `__awxjs_${t}Handler`;
                                e[s] && e[s].remove()
                            }), e.setMap(null))
                    }
                }
                var l = o;
                e.default = l,
                t.exports = e.default
            },
            UiiV: function (t, e, s) {
                "use strict";
                Object.defineProperty(e, "__esModule", {
                    value: !0
                }),
                e.generateLineSegments = e.generatePolygon = e.generatePolyline = e.generateMarker = void 0;
                var i = s("jNhv"),
                a = s("Lm4Y"),
                r = s("7Z8C");
                e.generateMarker = (t, e, s, i, n) => {
                    const o = n.marker(t, {
                        lat: s.lat,
                        lon: s.lon
                    }, i);
                    if (!o)
                        return null;
                    const l = Object.assign(Object.assign({}, e), {
                        awxjs_source: t
                    }),
                    h = new r.MarkerMapElement(l, i, o);
                    return h.geometry = new a.Point([s.lon, s.lat]),
                    h
                };
                e.generatePolyline = (t, e, s, a, n) => {
                    const o = (0, i.isFunction)(a) ? a(e) : a,
                    l = n.polyline(e.id, s, o),
                    h = Object.assign(Object.assign({}, e), {
                        awxjs_source: t
                    });
                    return new r.PolylineMapElement(h, o, l)
                };
                e.generatePolygon = (t, e, s, n, o) => {
                    const l = t => t.map((t, s) => ({
                                id: `${e.id}-${s}`,
                                outer: t.outer.coordinates,
                                inner: t.inner.map(t => t.coordinates)
                            }));
                    let h = [];
                    s instanceof a.MultiPolygon ? h = l(s.polygons) : s instanceof a.Polygon && (h = l([s]));
                    const d = (0, i.isFunction)(n) ? n(e) : n,
                    u = o.polygon(t, h, d),
                    c = Object.assign(Object.assign({}, e), {
                        awxjs_source: t
                    }),
                    p = new r.PolygonMapElement(c, d, u);
                    return p.geometry = s,
                    p
                };
                e.generateLineSegments = (t, e, s) => {
                    const a = [];
                    let r,
                    n,
                    o,
                    l = [];
                    return t.forEach((t, h) => {
                        const d = t.loc || (s && (0, i.isFunction)(s) ? s(t) : {}),
                        u = (0, i.isEmpty)(d) && t.lat && t.lon ? t : {
                            lat: d.lat,
                            lon: d.long || d.lon
                        },
                        c = e ? t[e] : "none";
                        if (!(0, i.isset)(o) || u.lat !== o.lat || u.lon !== o.lon) {
                            l.push(u),
                            0 === h ? r = {
                                north: u.lat,
                                south: u.lat,
                                west: u.lon,
                                east: u.lon
                            }
                             : (r.north = Math.max(r.north, u.lat), r.south = Math.min(r.south, u.lat), r.west = Math.min(r.west, u.lon), r.east = Math.max(r.east, u.lon));
                            let e = !0;
                            a.push({
                                coords: l,
                                data: t,
                                bounds: r
                            }),
                            e = !0,
                            e && (l = [], l.push(u), r = {
                                    north: u.lat,
                                    south: u.lat,
                                    west: u.lon,
                                    east: u.lon
                                })
                        }
                        n = c,
                        o = u
                    }),
                    a
                }
            },
            Vtag: function (t, e, s) {
                "use strict";
                Object.defineProperty(e, "__esModule", {
                    value: !0
                }),
                e.default = void 0;
                var i = r(s("zILR")),
                a = r(s("Jfte"));
                function r(t) {
                    return t && t.__esModule ? t : {
                    default:
                        t
                    }
                }
                var n = class {
                    constructor(t, e) {
                        this.source = t;
                        const s = "image" === e.type ? new i.default(null, e) : new a.default(e);
                        s.provider = this,
                        s.on("stop reset", e => {
                            s.hide(),
                            t.updateVisibility()
                        }),
                        "tile" === e.type && (s.on("load:progress", e => {
                                s.showWhenLoading && t.hide()
                            }).on("play", e => {
                                t.hide()
                            }), s.on("advance:image", () => {})),
                        this.animation = s,
                        t.on("overlay:ready", () => {
                            (s instanceof i.default || s instanceof a.default) && (s.provider = this)
                        })
                    }
                    animationLayerForDate(t, e, s = !0) {
                        return this.source.animationLayerForDate(t, e, s)
                    }
                };
                e.default = n,
                t.exports = e.default
            },
            W11p: function (t, e, s) {
                "use strict";
                Object.defineProperty(e, "__esModule", {
                    value: !0
                }),
                e.default = void 0;
                var i,
                a = (i = s("NK6d")) && i.__esModule ? i : {
                default:
                    i
                };
                class r extends a.default {
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
                        t.on("tileloadstart", t => {
                            this._loadCounter.loading += 1
                        }),
                        t.on(["tileloadend", "tileloaderror"], t => {
                            this._loadCounter.loaded += 1,
                            this._loadCounter.loaded === this._loadCounter.loading && this.trigger("load")
                        }),
                        this._source = t;
                        const e = new ol.layer.Tile({
                            source: this._source
                        });
                        return e.setOpacity(this.isHidden ? 0 : this.opacity),
                        e
                    }
                }
                var n = r;
                e.default = n,
                t.exports = e.default
            },
            Wn7q: function (t, e, s) {
                "use strict";
                Object.defineProperty(e, "__esModule", {
                    value: !0
                }),
                e.default = void 0;
                var i,
                a = (i = s("8Zrd")) && i.__esModule ? i : {
                default:
                    i
                };
                class r extends a.default {
                    constructor(t, e, s = {}, i) {
                        super(t, s, i),
                        this._polygons = e
                    }
                    setOpacity(t) {
                        super.setOpacity(t),
                        this.renderable && this.renderable.forEach(e => e.setOptions(Object.assign(Object.assign({}, this.opts), {
                                    fillOpacity: this.opts.fillOpacity * t,
                                    strokeOpacity: this.opts.strokeOpacity * t
                                })))
                    }
                    createRenderable() {
                        const t = [],
                        e = this.opts;
                        return this._polygons.forEach(s => {
                            const i = s.outer.map(t => ({
                                        lat: t.lat,
                                        lng: t.lon
                                    })),
                            a = s.inner.map(t => t.map(t => ({
                                            lat: t.lat,
                                            lng: t.lon
                                        })));
                            e.paths = [i].concat(a);
                            const r = new google.maps.Polygon(Object.assign(Object.assign({}, e), {
                                        fillOpacity: this.opts.fillOpacity * this.opacity,
                                        opacity: this.opts.strokeOpacity * this.opacity
                                    }));
                            r.addListener("click", () => this.trigger("click", {
                                    polygon: this
                                })),
                            r.addListener("mouseover", () => this.trigger("mouseover", {
                                    polygon: this
                                })),
                            r.addListener("mouseout", () => this.trigger("mouseout", {
                                    polygon: this
                                })),
                            t.push(r)
                        }),
                        t
                    }
                    addToMap(t) {
                        this.renderable && this.renderable.forEach(e => e.setMap(t))
                    }
                    removeFromMap(t) {
                        this.renderable && this.renderable.forEach(t => t.setMap(null))
                    }
                }
                var n = r;
                e.default = n,
                t.exports = e.default
            },
            Xl8N: function (t, e, s) {
                "use strict";
                Object.defineProperty(e, "__esModule", {
                    value: !0
                }),
                e.default = void 0;
                var i = h(s("AIg7")),
                a = s("bamr"),
                r = h(s("W5Dk")),
                n = h(s("yoyN")),
                o = s("jNhv"),
                l = h(s("b9Bd"));
                function h(t) {
                    return t && t.__esModule ? t : {
                    default:
                        t
                    }
                }
                var d = function (t, e, s, i) {
                    return new(s || (s = Promise))((function (a, r) {
                            function n(t) {
                                try {
                                    l(i.next(t))
                                } catch (t) {
                                    r(t)
                                }
                            }
                            function o(t) {
                                try {
                                    l(i.throw(t))
                                } catch (t) {
                                    r(t)
                                }
                            }
                            function l(t) {
                                var e;
                                t.done ? a(t.value) : (e = t.value, e instanceof s ? e : new s((function (t) {
                                            t(e)
                                        }))).then(n, o)
                            }
                            l((i = i.apply(t, e || [])).next())
                        }))
                };
                class u extends i.default {
                    constructor(t, e) {
                        if (super(), this._loading = !1, this._loadCallbacks = {}, this._onResize = () => {
                            this.trigger("resize", this.getSize())
                        }, !t)
                            throw new Error("[Aeris] Invalid DOM target specified for LegendView");
                        this._opts = (0, o.extend)({
                            size: {
                                width: 400,
                                height: 40
                            }
                        }, e),
                        this._store = new n.default,
                        (0, l.default)(t).append('<div class="awxjs__legend-view"></div>'),
                        this._target = (0, l.default)(".awxjs__legend-view", t)
                    }
                    get $el() {
                        return this._target
                    }
                    get count() {
                        return this._store.count
                    }
                    add(t, e) {
                        const s = this.getKey(t);
                        let i;
                        if (!this._configs)
                            return this._loadCallbacks[t] = () => {
                                this.add(t, e)
                            },
                        void(!1 === this._loading && this.loadStyles());
                        "image" === (e = (0, o.extend)((0, o.cloneDeep)(this._opts), e)).type && (i = e);
                        const a = this.configForType(t);
                        if (a) {
                            const {
                                config: t
                            } = a;
                            if ((0, o.isEmpty)(t) || (i = t), !(0, o.isEmpty)(t.use)) {
                                const e = this.configForType(t.use);
                                i = Object.assign(Object.assign({}, e), i)
                            }
                        }
                        if (!(0, o.isset)(i))
                            return;
                        const r = (0, o.extend)(e, {
                            title: i.title,
                            size: this._opts.size,
                            autosize: this._opts.autosize,
                            format: this._opts.format,
                            metric: this._opts.metric
                        }, i, e);
                        let n = this._store.get(s);
                        if (n)
                            return this._store.increment(s), void n.update(r);
                        i && !(0, o.isEmpty)(i) && (n = this.createLegend(t, i, r), this.addLegend(n), s !== t && this._store.map(s, t))
                    }
                    get(t) {
                        const e = this.getKey(t);
                        return e ? this._store.get(e) : null
                    }
                    set(t, e) {
                        t = t || [],
                        this.removeAll(t),
                        t.forEach(t => {
                            this.has(t) ? this.get(t).update(e) : this.add(t, e)
                        })
                    }
                    remove(t) {
                        const e = this.getKey(t);
                        if (e) {
                            const t = this._store.get(e);
                            t && (this._store.remove(e), 0 === this._store.refCount(e) && this.removeLegend(t)),
                            t instanceof i.default && t.off("resize", this._onResize),
                            this._onResize()
                        }
                        0 === this.count && (this.$el.hide(), this.trigger("empty"))
                    }
                    setUrl(t) {
                        this.removeAll(),
                        this.$el.empty(),
                        this.$el.append(`<div class="awxjs__legend"><img src="${t}"></div>`)
                    }
                    addLegend(t) {
                        const e = t.key;
                        this._store.add(e, t),
                        this.$el.append(t.$el),
                        this.$el.show(),
                        t instanceof i.default && t.on("resize", this._onResize),
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
                        Object.keys(this._store.items).forEach(e => {
                            let s = !0;
                            if (t) {
                                const i = this._store.mapping.get(e) || [];
                                -1 !== t.indexOf(e) ? s = !1 : i && i.forEach(e => {
                                    -1 !== t.indexOf(e) && (s = !1)
                                })
                            }
                            s && this.remove(e)
                        })
                    }
                    has(t) {
                        const {
                            key: e
                        } = this.configForType(t);
                        return !!e && this._store.has(e)
                    }
                    update(t) {
                        this._each((e, s) => s.update(t))
                    }
                    setMetric(t) {
                        this._opts.metric = t,
                        this._each((e, s) => s.setMetric(t))
                    }
                    setSize(t) {
                        this._opts.size = t,
                        this._each((e, s) => s.setSize(t))
                    }
                    getSize() {
                        let t = 0,
                        e = 0;
                        return this._each((s, i) => {
                            const a = i.getSize();
                            t += a.height,
                            e = Math.max(e, a.width)
                        }), {
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
                        s || Object.keys(this._configs).forEach(i => {
                            const a = this._configs[i];
                            if (!0 === a.enabled || !(0, o.isset)(a.enabled)) {
                                const r = a.layers;
                                r && (r.forEach(r => {
                                        new RegExp(r).test(t) && (s = (0, o.cloneDeep)(a), e = i)
                                    }), s && !e && (e = i))
                            }
                        }), {
                            key: e || t,
                            config: (0, o.cloneDeep)(s)
                        }
                    }
                    _reset() {
                        this.$el.empty(),
                        this._each((t, e) => e.reset())
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
                            r = new a.ImageLegend(i, s);
                        else if (e.grouped && e.items) {
                            const t = s.types || {};
                            s.types = e.items.reduce((e, s) => {
                                const {
                                    config: i
                                } = this.configForType(s.key),
                                a = (0, o.extend)({
                                    factor: s.factor,
                                    size: {
                                        height: this._opts.size.height
                                    }
                                }, i, t[s.key]);
                                return a.size.width = Math.floor(this._opts.size.width * a.factor),
                                e[s.key] = a,
                                e
                            }, {}),
                            r = new a.GroupedLegend(i, s)
                        } else
                            "alerts" === t || "advisories" === t || /^alerts-/.test(t) ? (r = new a.AdvisoryLegend(i, s), (0, o.isset)(s.within) && setTimeout(() => {
                                    this.update({
                                        account: s.account,
                                        within: s.within
                                    })
                                }, 500)) : r = new a.StyledLegend(i, s);
                        return r
                    }
                    loadStyles() {
                        return this._loading = !0,
                        new Promise((t, e) => d(this, void 0, void 0, (function  * () {
                                    this._configs ? t(this._configs) : r.default.request("https://legends.aerisapi.com/defaults.json").then(e => {
                                        if (e.data) {
                                            const s = e.data;
                                            Object.keys(s).forEach(t => {
                                                const e = s[t];
                                                e.config && (Object.keys(e.config).forEach(t => {
                                                        if (-1 !== t.indexOf("_")) {
                                                            const s = t.replace(/^labels_/, "label_").replace(/_/g, ".");
                                                            (0, o.set)(e.config, s, e.config[t]),
                                                            delete e.config[t]
                                                        }
                                                    }), e.styles = (0, o.cloneDeep)(e.config), delete e.config)
                                            }),
                                            this._configs = s,
                                            this._loading = !1,
                                            t((0, o.cloneDeep)(this._configs)),
                                            Object.keys(this._loadCallbacks).forEach(t => {
                                                (0, this._loadCallbacks[t])()
                                            })
                                        }
                                    })
                                })))
                    }
                }
                var c = u;
                e.default = c,
                t.exports = e.default
            },
            ZOIN: function (t, e, s) {
                "use strict";
                Object.defineProperty(e, "__esModule", {
                    value: !0
                }),
                e.default = e.config = void 0;
                var i = s("jNhv");
                const a = (t = "") => {
                    switch (t = t.toLowerCase().replace(/\s/, "-")) {
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
                },
                r = {
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
                            const e = (0, i.get)(t, "ob.status");
                            return {
                                className: "marker-river",
                                svg: {
                                    shape: {
                                        type: "circle",
                                        fill: {
                                            color: a(e)
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
                e.config = r;
                var n = r;
                e.default = n
            },
            ZbGd: function (t, e, s) {
                "use strict";
                Object.defineProperty(e, "__esModule", {
                    value: !0
                }),
                e.default = e.config = void 0;
                var i = s("jNhv");
                const a = t => t < 1 ? "#f5f5f5" : t < 5 ? "#dddddd" : t < 10 ? "#bbbbbb" : t < 15 ? "#888888" : "#545454",
                r = {
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
                            const e = (0, i.get)(t, "ob.timestamp");
                            if (!e)
                                return null;
                            const s = ((new Date).getTime() - 1e3 * e) / 6e4;
                            return {
                                className: "marker-record",
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
                                size: [14, 14]
                            }
                        }
                    },
                    animation: {
                        enabled: !0
                    }
                };
                e.config = r;
                var n = r;
                e.default = n
            },
            "Zm+Z": function (t, e, s) {
                "use strict";
                Object.defineProperty(e, "__esModule", {
                    value: !0
                }),
                e.default = void 0;
                var i = d(s("IRno")),
                a = d(s("qn4x")),
                r = d(s("g8Bo")),
                n = d(s("wEP0")),
                o = d(s("2EEu")),
                l = s("jNhv"),
                h = s("xgna");
                function d(t) {
                    return t && t.__esModule ? t : {
                    default:
                        t
                    }
                }
                class u extends i.default {
                    constructor(t, e) {
                        const s = (0, l.get)(e, "range.marks");
                        (e = (0, l.extend)({
                                range: {},
                                formatters: {
                                    time: "h:mm a",
                                    day: "EEE, MMM d"
                                },
                                ui: {
                                    left: ".awxjs__app__ui-panel-timeline-left",
                                    center: ".awxjs__app__ui-panel-timeline-center",
                                    right: ".awxjs__app__ui-panel-timeline-right",
                                    controls: ".awxjs__app__ui-panel-timeline-center",
                                    timeline: ".awxjs__app__ui-panel-timeline-right",
                                    play: ".awxjs__ui-btn-play",
                                    now: ".awxjs__ui-btn-now",
                                    time: ".awxjs__app__ui-panel-timeline-daytime",
                                    settings: ".awxjs__ui-btn-settings"
                                },
                                icon: '\n\t\t\t\t<svg version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 0 96.3 85.4">\n\t\t\t\t\t<g>\n\t\t\t\t\t\t<path d="M75.2,39.9h9.4v5.2h-9.4L75.2,39.9z"/>\n\t\t\t\t\t\t<path d="M49,64.9h5.2v9.4H49V64.9z"/>\n\t\t\t\t\t\t<path d="M65.5,24.9l6.6-6.6l3.7,3.7l-6.6,6.6L65.5,24.9z"/>\n\t\t\t\t\t\t<path d="M69.2,56.5l6.6,6.6l-3.7,3.7l-6.6-6.6L69.2,56.5z"/>\n\t\t\t\t\t\t<path d="M36.6,56.7l12.4-12.4l0-25.1h8v28.3c-0.6,0.6-14.8,14.9-14.8,14.9L36.6,56.7z"/>\n\t\t\t\t\t\t<path d="M53.6,0v7.5c19.4,0,35.2,15.8,35.2,35.2c0,19.4-15.8,35.2-35.2,35.2c-17.8,0-32.6-13.3-34.9-30.5l5.4,5.3l5.3-5.3\n\t\t\t\t\t\t\tL14.7,32.7L0,47.4l5.3,5.3l5.8-5.8c2.1,21.6,20.4,38.5,42.5,38.5c23.5,0,42.7-19.2,42.7-42.7S77.1,0,53.6,0L53.6,0z"/>\n\t\t\t\t\t</g>\n\t\t\t\t</svg>\n\t\t\t'
                            }, e)).className = (0, l.isset)(e.className) ? "app__ui-panel-timeline " + e.className : "app__ui-panel-timeline",
                        super(e);
                        const i = (0, h.viewportSizeClass)();
                        this._animation = t,
                        this._timeline = new a.default(t),
                        this._indicator = new r.default({
                            size: 30,
                            strokeWidth: 2
                        }),
                        this._slider = new n.default((0, l.extend)({
                                    title: "Time Range <span>(hours)</span>",
                                    width: "compact" === i.width ? 200 : 300,
                                    value: [-6, 0],
                                    range: {
                                        min: -24,
                                        max: 24
                                    },
                                    marksEvery: (0, l.get)(e, "range.marksEvery") || "% 12",
                                    marks: s || {
                                        0: "Now"
                                    },
                                    step: "compact" === i.width ? 6 : 2,
                                    tooltip: t => {
                                        if (0 === t)
                                            return "Now";
                                        return `${t > 0 ? "+" : ""}${t} hours`
                                    }
                                }, this.opts.range))
                    }
                    close() {
                        super.close(),
                        this._tooltip && this._tooltip.hide()
                    }
                    setFormatters(t) {
                        this.opts.formatters = (0, l.extend)({}, this.opts.formatters, t),
                        (0, l.isset)(this._time) && this._setTime(this._time),
                        this._timeline.setFormatters({
                            time: this.opts.formatters.time
                        })
                    }
                    setSize(t, e) {
                        const s = this.ui.content.padding(),
                        i = this.ui.left.outerWidth(!0),
                        a = this.ui.center.outerWidth(!0);
                        this.ui.right.outerWidth(!0);
                        let r = t;
                        r -= s.left + s.right,
                        r -= i + a;
                        const n = this._timeline.$el.margins();
                        r -= n.left + n.right,
                        r -= 20,
                        r = Math.floor(r);
                        this._timeline.size().width !== r && (r < 200 ? (this.ui.settings.hide(), this._timeline.hide()) : (this.ui.settings.show(), this._timeline.show(), this._timeline.setSize(r, 0)))
                    }
                    _render() {
                        return `\n\t\t\t<div class="awxjs__app__ui-panel-timeline">\n\t\t\t\t<div class="awxjs__app__ui-panel-container">\n\t\t\t\t\t<div class="awxjs__app__ui-panel-toolbar">\n\t\t\t\t\t\t${this.opts.title ? `<div class="awxjs__app__ui-panel-title">${this.opts.title}</div>` : ""}\n\t\t\t\t\t\t<button class="awxjs__app__ui-panel-close">\n\t\t\t\t\t\t\t<svg version="1.1" viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">\n\t\t\t\t\t\t\t\t<path d="m22.699 77.301c0.80078 0.80078 1.8008 1.1992 2.8008 1.1992s2-0.39844 2.8008-1.1992l21.699-21.602 21.699 21.699c0.80078 0.80078 1.8008 1.1992 2.8008 1.1992s2-0.39844 2.8008-1.1992c1.6016-1.6016 1.6016-4.1016 0-5.6992l-21.602-21.699 21.699-21.699c1.6016-1.6016 1.6016-4.1016 0-5.6992-1.6016-1.6016-4.1016-1.6016-5.6992 0l-21.699 21.699-21.699-21.602c-1.6016-1.6016-4.1016-1.6016-5.6992 0-1.6016 1.6016-1.6016 4.1016 0 5.6992l21.699 21.602-21.602 21.699c-1.5977 1.5-1.5977 4.1016 0 5.6016z"/>\n\t\t\t\t\t\t\t</svg>\n\t\t\t\t\t\t</button>\n\t\t\t\t\t</div>\n\t\t\t\t\t<div class="awxjs__app__ui-panel-content">\n\t\t\t\t\t\t<div class="awxjs__ui-cols align-center">\n\t\t\t\t\t\t\t<div class="awxjs__app__ui-panel-timeline-left">\n\t\t\t\t\t\t\t\t<div class="awxjs__app__ui-panel-timeline-daytime"></div>\n\t\t\t\t\t\t\t</div>\n\t\t\t\t\t\t\t<div class="awxjs__app__ui-panel-timeline-center">\n\t\t\t\t\t\t\t\t<div class="awxjs__app__ui-panel-timeline-controls awxjs__ui-row align-center">\n\t\t\t\t\t\t\t\t\t<button class="awxjs__ui-btn awxjs__ui-btn-icon awxjs__ui-btn-play">\n\t\t\t\t\t\t\t\t\t\t<svg width="100pt" height="100pt" version="1.1" viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">\n\t\t\t\t\t\t\t\t\t\t\t<path transform="scale(.3003)" d="m260 166.99l-93.006 54.008-93.994 52.994v-214.99l93.994 53.995zm0 0" fill-rule="evenodd" />\n\t\t\t\t\t\t\t\t\t\t</svg>\n\t\t\t\t\t\t\t\t\t</button>\n\t\t\t\t\t\t\t\t\t<button class="awxjs__ui-btn awxjs__ui-btn-now">Now</button>\n\t\t\t\t\t\t\t\t</div>\n\t\t\t\t\t\t\t</div>\n\t\t\t\t\t\t\t<div class="awxjs__app__ui-panel-timeline-right"></div>\n\t\t\t\t\t\t</div>\n\t\t\t\t\t\t<div class="awxjs__ui-btn-icon awxjs__ui-btn-settings">\n\t\t\t\t\t\t\t<svg version="1.1" viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">\n\t\t\t\t\t\t\t\t<path d="m94.801 40.801-10.602-1.8008c-0.60156-1.8984-1.3984-3.6992-2.3008-5.5l6.1992-8.6992c0.89844-1.3008 0.80078-3.1016-0.30078-4.1992l-8.5-8.5c-1.1016-1.1016-2.8984-1.3008-4.1992-0.30078l-8.6992 6.1992c-1.6992-0.89844-3.6016-1.6992-5.5-2.3008l-1.6992-10.5c-0.30078-1.6016-1.6016-2.6992-3.1992-2.6992h-12c-1.6016 0-2.8984 1.1016-3.1992 2.6992l-1.8008 10.602c-1.8984 0.60156-3.6992 1.3984-5.5 2.3008l-8.6992-6.1992c-1.3008-0.89844-3.1016-0.80078-4.1992 0.30078l-8.5 8.5c-1.1016 1.1016-1.3008 2.8984-0.30078 4.1992l6.1992 8.6992c-0.89844 1.6992-1.6992 3.6016-2.3008 5.5l-10.5 1.6992c-1.6016 0.30078-2.6992 1.6016-2.6992 3.1992v12c0 1.6016 1.1016 2.8984 2.6992 3.1992l10.602 1.8008c0.60156 1.8984 1.3984 3.6992 2.3008 5.5l-6.1992 8.6992c-0.89844 1.3008-0.80078 3.1016 0.30078 4.1992l8.5 8.5c1.1016 1.1016 2.8984 1.3008 4.1992 0.30078l8.6992-6.1992c1.6992 0.89844 3.6016 1.6992 5.5 2.3008l1.8008 10.602c0.30078 1.6016 1.6016 2.6992 3.1992 2.6992h12c1.6016 0 2.8984-1.1016 3.1992-2.6992l1.6992-10.703c1.8984-0.60156 3.6992-1.3984 5.5-2.3008l8.6992 6.1992c1.3008 0.89844 3.1016 0.80078 4.1992-0.30078l8.5-8.5c1.1016-1.1016 1.3008-2.8984 0.30078-4.1992l-6.1992-8.6992c0.89844-1.6992 1.6992-3.6016 2.3008-5.5l10.602-1.8008c1.6016-0.30078 2.6992-1.6016 2.6992-3.1992v-11.898c-0.10156-1.6016-1.2031-2.8984-2.8008-3.1992zm-44.801 26.301c-9.5 0-17.102-7.6992-17.102-17.102 0-9.5 7.6992-17.102 17.102-17.102 9.3984 0 17.102 7.6016 17.102 17.102s-7.6016 17.102-17.102 17.102z"/>\n\t\t\t\t\t\t\t</svg>\n\t\t\t\t\t\t</div>\n\t\t\t\t\t</div>\n\t\t\t\t\t<div class="awxjs__app__ui-panel-toggle">${this.opts.icon}</div>\n\t\t\t\t</div>\n\t\t\t</div>\n\t\t`
                    }
                    _onAddedToDOM() {
                        super._onAddedToDOM(),
                        this._timeline.addTo(this.ui.timeline),
                        this._indicator.appendTo(this.ui.timeline),
                        this._setTime(this._animation.currentTime)
                    }
                    _setupEvents() {
                        super._setupEvents(),
                        this._animation.on("load:start play", () => {
                            this.ui.play.html('\n\t\t\t\t<svg width="100pt" height="100pt" version="1.1" viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">\n\t\t\t\t\t<path d="m76.5 15h-53c-4.6875 0-8.5 3.8125-8.5 8.5v53c0 4.6875 3.8125 8.5 8.5 8.5h53c4.6875 0 8.5-3.8125 8.5-8.5v-53c0-4.6875-3.8125-8.5-8.5-8.5z"/>\n\t\t\t\t</svg>\n\t\t\t')
                        }).on("stop", () => {
                            this.ui.play.html('\n\t\t\t\t<svg width="100pt" height="100pt" version="1.1" viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">\n\t\t\t\t\t<path transform="scale(.3003)" d="m260 166.99l-93.006 54.008-93.994 52.994v-214.99l93.994 53.995zm0 0" fill-rule="evenodd" />\n\t\t\t\t</svg>\n\t\t\t')
                        }).on("advance", t => {
                            const {
                                time: e
                            } = t.data;
                            e && this._setTime(e)
                        }).on("start:change end:change", () => {
                            this._slider.value = [this._animation.startOffset() / 36e5, this._animation.endOffset() / 36e5],
                            this.trigger("change:range", {
                                start: this._animation.startDate(),
                                end: this._animation.endDate()
                            })
                        }),
                        this._indicator && this._animation.on("load:start", () => {
                            this._indicator.startAnimating()
                        }).on("load:done", () => {
                            this._indicator.stopAnimating()
                        }),
                        this._timeline.slider.on("change", t => {
                            const {
                                progress: e
                            } = t.data;
                            if ((0, l.isset)(e)) {
                                const t = this._animation,
                                s = t.endDate().getTime() - t.startDate().getTime(),
                                i = Math.round(t.startDate().getTime() + s * e);
                                this._setTime(i)
                            }
                        }),
                        this._slider.on("change:end", t => {
                            const [e, s] = t.data.value;
                            this._animation.setStartOffset(3600 * e * 1e3),
                            this._animation.setEndOffset(3600 * s * 1e3)
                        }),
                        this.ui.play.on("click", () => {
                            this._animation.isAnimating() || this._animation.isLoading() ? this._animation.stop() : this._animation.play()
                        }),
                        this.ui.now.on("click", () => {
                            this._animation.goToInit()
                        }),
                        this.ui.settings && this.ui.settings.on("click", () => {
                            if (!this._tooltip) {
                                this._slider.initialize();
                                const t = new o.default(this._slider.$el, {
                                    showClose: !0
                                });
                                t.attachTo(this.ui.settings),
                                this._tooltip = t
                            }
                            this._tooltip.visible ? this._tooltip.hide() : this._tooltip.show()
                        })
                    }
                    _setTime(t) {
                        if (this._time = t, !this.ui.time)
                            return;
                        const e = new Date(t);
                        this.ui.time.html(`\n\t\t\t<div class="awxjs__app__ui-panel-timeline-time">${(0, l.formatDate)(e, this.opts.formatters.time)}</div>\n\t\t\t<div class="awxjs__app__ui-panel-timeline-day">${(0, l.formatDate)(e, this.opts.formatters.day)}</div>\n\t\t`)
                    }
                }
                var c = u;
                e.default = c,
                t.exports = e.default
            },
            "b/Os": function (t, e, s) {
                "use strict";
                Object.defineProperty(e, "__esModule", {
                    value: !0
                }),
                e.AERIS_ATTRIBUTION = void 0;
                e.AERIS_ATTRIBUTION = 'Weather data &copy; <a href="https://www.aerisweather.com/" target="_blank">AerisWeather</a>'
            },
            bBV4: function (t, e, s) {
                "use strict";
                Object.defineProperty(e, "__esModule", {
                    value: !0
                }),
                e.default = void 0;
                var i,
                a = s("jNhv"),
                r = (i = s("GpM6")) && i.__esModule ? i : {
                default:
                    i
                };
                class n extends r.default {
                    constructor(t) {
                        "all" === t.value ? t.multiselect = !1 : (0, a.isset)(t.multiselect) || (t.multiselect = !0),
                        super(t)
                    }
                    get key() {
                        return `${this.parentId ? this.parentId + "::" : ""}${this.groupId ? this.groupId + "::" : ""}${this.id}`
                    }
                    get multiselect() {
                        return this.opts.multiselect
                    }
                    _render(t) {
                        return `\n\t\t\t<li>${this.title}</li>\n\t\t`
                    }
                }
                var o = n;
                e.default = o,
                t.exports = e.default
            },
            bLvX: function (t, e, s) {
                "use strict";
                Object.defineProperty(e, "__esModule", {
                    value: !0
                }),
                e.default = void 0;
                var i = u(s("IRno")),
                a = u(s("C65s")),
                r = u(s("wAJf")),
                n = u(s("g8Bo")),
                o = s("jNhv"),
                l = s("xgna"),
                h = function (t) {
                    if (t && t.__esModule)
                        return t;
                    if (null === t || "object" != typeof t && "function" != typeof t)
                        return {
                        default:
                            t
                        };
                    var e = d();
                    if (e && e.has(t))
                        return e.get(t);
                    var s = {},
                    i = Object.defineProperty && Object.getOwnPropertyDescriptor;
                    for (var a in t)
                        if (Object.prototype.hasOwnProperty.call(t, a)) {
                            var r = i ? Object.getOwnPropertyDescriptor(t, a) : null;
                            r && (r.get || r.set) ? Object.defineProperty(s, a, r) : s[a] = t[a]
                        }
                    s.default = t,
                    e && e.set(t, s);
                    return s
                }
                (s("BJxM"));
                function d() {
                    if ("function" != typeof WeakMap)
                        return null;
                    var t = new WeakMap;
                    return d = function () {
                        return t
                    },
                    t
                }
                function u(t) {
                    return t && t.__esModule ? t : {
                    default:
                        t
                    }
                }
                class c extends i.default {
                    constructor(t) {
                        (t = (0, o.extend)({
                                metric: !1,
                                ui: {
                                    container: ".awxjs__app__ui-panel-info-container",
                                    inner: ".awxjs__app__ui-panel-info-inner",
                                    title: ".awxjs__app__ui-panel-info-title",
                                    content: ".awxjs__app__ui-panel-info-content",
                                    close: ".awxjs__app__ui-panel-info-close"
                                }
                            }, t)).className = (0, o.isset)(t.className) ? "app__ui-panel-info " + t.className : "app__ui-panel-info",
                        super(t),
                        this._account = t.account,
                        this._indicator = new n.default,
                        this.setState({
                            visible: !1
                        }),
                        this._content = {},
                        this.units = t.metric ? "metric" : "imperial",
                        t.sections && Object.keys(t.sections).forEach(e => {
                            r.default.setSection(e, t.sections[e])
                        }),
                        t.views && Object.keys(t.views).forEach((e, s) => {
                            const i = t.views[e],
                            a = this.setContentView(e, i);
                            a && 0 === s && (this._contentView = a)
                        })
                    }
                    get units() {
                        return this._units
                    }
                    set units(t) {
                        t !== this._units && (this._units = t, this._contentView && (this._contentView.units = t), this.trigger("change:units", {
                                units: t
                            }))
                    }
                    show(t, e) {
                        return this.setState({
                            visible: !0
                        }),
                        e && this.update(e),
                        t && this.setTitle(t),
                        this._updateSize(),
                        this.ui.content.css({
                            opacity: 1
                        }),
                        this.trigger("show"),
                        this
                    }
                    getContentContainer() {
                        return this.ui.inner
                    }
                    showContent(t, e, s) {
                        const i = this._content[t];
                        return i ? (i.units = this.units, i !== this._contentView && (this.reset(), this._contentView = i), this._contentView.parent() || this._contentView.addTo(this.ui.content), s && this.update(s), this.trigger("change:content", {
                                key: t
                            }), this.show(e, null)) : console.error(`[Aeris] Invalid view key '${t}' requested for InfoPanel. Make sure view has been defined in the InfoPanel 'views' configuration.`),
                        this
                    }
                    setContentView(t, e) {
                        let s;
                        return (0, o.isPlainObject)(e) ? s = new a.default(e) : e instanceof a.default && (s = e),
                        s && (s.on("load:start", () => {
                                this._indicator.startAnimating(),
                                this.ui.content.css({
                                    opacity: 0
                                }),
                                this.trigger("load:start")
                            }).on("load:done", () => {
                                this._indicator.stopAnimating(),
                                this.ui.content.css({
                                    opacity: 1
                                }),
                                this.trigger("load:done")
                            }).on("update", () => {
                                this._updateSize()
                            }).on("change:units", t => {
                                this.units = t.data.units
                            }), this._content[t] = s),
                        s
                    }
                    close() {
                        return this._indicator.stopAnimating(),
                        this.setHeight(0),
                        this.ui.content.css({
                            opacity: 0
                        }),
                        this.setState({
                            visible: !1
                        }),
                        this.trigger("close"),
                        setTimeout(() => {
                            this.ui.content.empty()
                        }, 500),
                        this
                    }
                    setTitle(t) {
                        return this.ui.title.html(t),
                        this
                    }
                    update(t) {
                        return this._contentView && this._contentView.update(t),
                        this
                    }
                    setWidth(t) {
                        return this.$el.css({
                            "max-width": t + "px"
                        }),
                        this
                    }
                    setHeight(t) {
                        this.$el.css({
                            "max-height": t + "px"
                        });
                        const e = this.ui.inner.bounds();
                        return this._indicator.$el.css({
                            "max-height": t - e.top - 75 + "px"
                        }),
                        this
                    }
                    setMetric(t) {
                        this.opts.metric = t,
                        this.units = t ? "metric" : "imperial"
                    }
                    load(t, e) {
                        this._contentView ? this._contentView.load(this._account, t, e) : console.error("[Aeris] Cannot load data for InfoPanel, no active content view defined. Use `showContent(:key, :title, :data)` to set the active content view before calling `load()`.")
                    }
                    reset() {
                        this._contentView && this._contentView.remove(),
                        this.ui.content.empty()
                    }
                    _render() {
                        return `\n\t\t\t<div class="awxjs__app__ui-panel-info">\n\t\t\t\t<div class="awxjs__app__ui-panel-info-top">\n\t\t\t\t\t<div class="awxjs__app__ui-panel-info-title"></div>\n\t\t\t\t</div>\n\t\t\t\t<div class="awxjs__app__ui-panel-info-container">\n\t\t\t\t\t<div class="awxjs__app__ui-panel-info-inner">\n\t\t\t\t\t\t<div class="awxjs__app__ui-panel-info-content"></div>\n\t\t\t\t\t</div>\n\t\t\t\t</div>\n\t\t\t\t<button class="awxjs__app__ui-panel-info-close">\n\t\t\t\t\t${h.close()}\n\t\t\t\t</button>\n\t\t\t</div>\n\t\t`
                    }
                    _setupEvents() {
                        super._setupEvents(),
                        this._indicator.appendTo(this.ui.inner),
                        this.ui.close.on("click", () => {
                            this.close()
                        })
                    }
                    _updateSize() {
                        if (!this.visible)
                            return;
                        const t = this.$el.parent();
                        if (!t)
                            return;
                        const e = t.bounds(!0),
                        s = this.$el.bounds(!0),
                        i = this.ui.inner.bounds(!0),
                        a = s.top - e.top;
                        let r = e.height - 2 * a - 100,
                        n = Math.max(175, i.height + (i.top - s.top));
                        r > 900 && (r = 900);
                        "compact" === (0, l.viewportSizeClass)().width ? (this.setWidth(e.width - 2 * s.left), n = .5 * e.height) : s.width > .3 * e.width ? this.setWidth(Math.max(300, Math.ceil(.3 * e.width))) : this.setWidth(400),
                        this.$el.width() <= 320 ? this.$el.addClass("awxjs__app__ui-panel-info-compact") : this.$el.removeClass("awxjs__app__ui-panel-info-compact"),
                        this.setHeight(Math.min(r, n))
                    }
                }
                var p = c;
                e.default = p,
                t.exports = e.default
            },
            bMim: function (t, e, s) {
                "use strict";
                Object.defineProperty(e, "__esModule", {
                    value: !0
                }),
                e.default = void 0;
                var i = s("jNhv");
                var a = class {
                    constructor() {
                        this.store = new Map
                    }
                    get items() {
                        return Array.from(this.store.entries()).reduce((t, [e, s]) => (t[e] = s, t), {})
                    }
                    get count() {
                        return this.store.size
                    }
                    has(t) {
                        return (0, i.isset)(this.get(t))
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
                        Object.keys(e).forEach(s => t(s, e[s]))
                    }
                };
                e.default = a,
                t.exports = e.default
            },
            bOlB: function (t, e, s) {
                "use strict";
                Object.defineProperty(e, "__esModule", {
                    value: !0
                }),
                e.default = e.config = void 0;
                var i = s("jNhv");
                const a = (t = "") => {
                    switch (t = t.toLowerCase().replace(/\s/, "-")) {
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
                },
                r = {
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
                            const e = (0, i.get)(t, "report.type");
                            return {
                                className: "marker-record",
                                svg: {
                                    shape: {
                                        type: "circle",
                                        fill: {
                                            color: a(e)
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
                e.config = r;
                var n = r;
                e.default = n
            },
            bamr: function (t, e, s) {
                "use strict";
                Object.defineProperty(e, "__esModule", {
                    value: !0
                }),
                Object.defineProperty(e, "Legend", {
                    enumerable: !0,
                    get: function () {
                        return i.default
                    }
                }),
                Object.defineProperty(e, "ImageLegend", {
                    enumerable: !0,
                    get: function () {
                        return a.default
                    }
                }),
                Object.defineProperty(e, "StyledLegend", {
                    enumerable: !0,
                    get: function () {
                        return r.default
                    }
                }),
                Object.defineProperty(e, "AdvisoryLegend", {
                    enumerable: !0,
                    get: function () {
                        return n.default
                    }
                }),
                Object.defineProperty(e, "GroupedLegend", {
                    enumerable: !0,
                    get: function () {
                        return o.default
                    }
                });
                var i = l(s("5bFp")),
                a = l(s("yP8Q")),
                r = l(s("TtNf")),
                n = l(s("+fMx")),
                o = l(s("OeEA"));
                function l(t) {
                    return t && t.__esModule ? t : {
                    default:
                        t
                    }
                }
            },
            bzMN: function (t, e, s) {
                "use strict";
                Object.defineProperty(e, "__esModule", {
                    value: !0
                }),
                e.default = void 0;
                var i,
                a = (i = s("AM6C")) && i.__esModule ? i : {
                default:
                    i
                },
                r = s("jNhv");
                class n extends a.default {
                    constructor(t = null) {
                        super(t = (0, r.extend)({}, {
                                refresh: 0
                            }, t))
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
                            Object.keys(this.dataByTime()).sort().map(t => parseInt(t, 10)).forEach(s => {
                                this.dataByTime()[s].forEach(s => {
                                    -1 === t.indexOf(s.id) && (e.push(s), t.push(s.id))
                                })
                            }),
                            a = e
                        } else
                            a = this._elementsInIntervalRange(s, i);
                        a.length > 0 && this.trigger("data:update", {
                            items: a
                        }),
                        this.lastInterval = e
                    }
                    _prepareDataItems(t) {
                        if (this.increment <= 0 || !(0, r.isPlainObject)(t))
                            return;
                        const e = this._prepareIntervals(),
                        s = t;
                        Object.keys(s).forEach(s => {
                            const {
                                renderable: i,
                                data: a,
                                style: r
                            } = t[s];
                            Object.keys(a).forEach(t => {
                                const n = parseInt(t, 10),
                                o = this.dataIntervalClosestToTime(n);
                                n < this.to && e[o] && e[o].push({
                                    id: s,
                                    value: a[n],
                                    renderable: i,
                                    style: r
                                })
                            })
                        }),
                        this.trigger("ready"),
                        this.trigger("load:done")
                    }
                }
                var o = n;
                e.default = o,
                t.exports = e.default
            },
            cKwr: function (t, e, s) {
                "use strict";
                Object.defineProperty(e, "__esModule", {
                    value: !0
                }),
                e.default = void 0;
                var i,
                a = (i = s("GpM6")) && i.__esModule ? i : {
                default:
                    i
                },
                r = s("jNhv");
                class n extends a.default {
                    get value() {
                        let t = this.opts.value;
                        const {
                            values: e
                        } = this.opts;
                        return e && e.forEach((e, s) => {
                            this.selected && 1 === s ? t = e.value || e : this.selected || 0 !== s || (t = e.value || e)
                        }),
                        t
                    }
                    constructor(t) {
                        (t = (0, r.extend)({
                                loader: !1
                            }, t, {
                                className: t.className ? "ui-switch " + t.className : "ui-switch"
                            })).values && (t.values = t.values.map(t => (0, r.isPlainObject)(t) ? t : {
                                label: t,
                                value: t
                            })),
                        super(t)
                    }
                    _render(t) {
                        const {
                            label: e,
                            values: s
                        } = this.opts,
                        i = {
                            left: "",
                            right: ""
                        };
                        return s && s.forEach((t, e) => {
                            const s = 0 === e ? "left" : "right";
                            let a = "";
                            a = (0, r.isPlainObject)(t) ? t.label : t,
                            i[s] = `<div class="awxjs__ui-switch-label awxjs__ui-switch-label-${s}">${a}</div>`
                        }),
`\n\t\t\t<div class="awxjs__ui-switch">\n\t\t\t\t${e ? `<div class="awxjs__ui-switch-label">${e}</div>` : ""}\n\t\t\t\t${i.left}\n\t\t\t\t<div class="awxjs__ui-switch__control">\n\t\t\t\t\t<div class="awxjs__ui-switch__control-indicator"></div>\n\t\t\t\t</div>\n\t\t\t\t${i.right}\n\t\t\t</div>\n\t\t`
                    }
                }
                var o = n;
                e.default = o,
                t.exports = e.default
            },
            cOOT: function (t, e, s) {
                "use strict";
                Object.defineProperty(e, "__esModule", {
                    value: !0
                }),
                e.default = void 0;
                var i,
                a = (i = s("ccXq")) && i.__esModule ? i : {
                default:
                    i
                },
                r = s("jNhv");
                class n extends a.default {
                    constructor(t, e, s = {}, i) {
                        super(t, s, i),
                        this._needsEventSetup = !0,
                        this._points = e
                    }
                    addTo(t) {
                        super.addTo(t),
                        this._needsEventSetup && (t.on("click", this.layerId, t => {
                                this.trigger("click", {
                                    data: this.data,
                                    shape: this.renderable
                                })
                            }), t.on("mouseenter", this.layerId, t => {
                                this.trigger("mouseover", {
                                    data: this.data,
                                    shape: this.renderable
                                })
                            }), t.on("mouseleave", this.layerId, t => {
                                this.trigger("mouseout", {
                                    data: this.data,
                                    shape: this.renderable
                                })
                            }), this._needsEventSetup = !1)
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
                                                coordinates: this._points.map(t => [t.lon, t.lat])
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
                        const t = (0, r.cloneDeep)(this.opts);
                        return {
                            id: this.layerId,
                            type: "line",
                            source: this.sourceId,
                            layout: {},
                            paint: t
                        }
                    }
                }
                var o = n;
                e.default = o,
                t.exports = e.default
            },
            ccXq: function (t, e, s) {
                "use strict";
                Object.defineProperty(e, "__esModule", {
                    value: !0
                }),
                e.default = void 0;
                var i,
                a = (i = s("Bte/")) && i.__esModule ? i : {
                default:
                    i
                };
                class r extends a.default {
                    get sourceId() {
                        return this.layerId + "-source"
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
                            e.forEach((t, e) => {
                                "line" === t.type && /^admin-/.test(t.id) && 0 === s && (s = e)
                            });
                            const i = e.map(t => t.id)[s + t];
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
                            t.getStyle().layers.forEach((t, e) => {
                                "line" === t.type && /^admin-/.test(t.id) && !this._relativeTo && (this._relativeTo = t.id)
                            })
                        }
                        void 0 !== t.getLayer(this.layerId) || (this.source ? (t.addSource(this.sourceId, this.source), this._relativeTo && void 0 === t.getLayer(this._relativeTo) || t.addLayer(this.renderable, this._relativeTo)) : this.invalidate()),
                        this.isHidden && this.hide()
                    }
                    removeFromMap(t) {
                        void 0 !== t.getLayer(this.layerId) && (t.removeLayer(this.layerId), t.removeSource(this.sourceId))
                    }
                }
                var n = r;
                e.default = n,
                t.exports = e.default
            },
            dgv4: function (t, e, s) {
                "use strict";
                Object.defineProperty(e, "__esModule", {
                    value: !0
                }),
                e.modulesLoader = f,
                e.default = void 0;
                var i = h(s("HxwC")),
                a = u(s("jNhv")),
                r = u(s("+mSH")),
                n = u(s("p+P+")),
                o = h(s("b9Bd")),
                l = s("s8Ky");
                function h(t) {
                    return t && t.__esModule ? t : {
                    default:
                        t
                    }
                }
                function d() {
                    if ("function" != typeof WeakMap)
                        return null;
                    var t = new WeakMap;
                    return d = function () {
                        return t
                    },
                    t
                }
                function u(t) {
                    if (t && t.__esModule)
                        return t;
                    if (null === t || "object" != typeof t && "function" != typeof t)
                        return {
                        default:
                            t
                        };
                    var e = d();
                    if (e && e.has(t))
                        return e.get(t);
                    var s = {},
                    i = Object.defineProperty && Object.getOwnPropertyDescriptor;
                    for (var a in t)
                        if (Object.prototype.hasOwnProperty.call(t, a)) {
                            var r = i ? Object.getOwnPropertyDescriptor(t, a) : null;
                            r && (r.get || r.set) ? Object.defineProperty(s, a, r) : s[a] = t[a]
                        }
                    return s.default = t,
                    e && e.set(t, s),
                    s
                }
                var c = function (t, e, s, i) {
                    return new(s || (s = Promise))((function (a, r) {
                            function n(t) {
                                try {
                                    l(i.next(t))
                                } catch (t) {
                                    r(t)
                                }
                            }
                            function o(t) {
                                try {
                                    l(i.throw(t))
                                } catch (t) {
                                    r(t)
                                }
                            }
                            function l(t) {
                                var e;
                                t.done ? a(t.value) : (e = t.value, e instanceof s ? e : new s((function (t) {
                                            t(e)
                                        }))).then(n, o)
                            }
                            l((i = i.apply(t, e || [])).next())
                        }))
                };
                const p = t => !1 === a.isEmpty(t) && a.isString(t) && !1 === /_/.test(t);
                function f(t) {
                    return c(this, void 0, void 0, (function  * () {
                            const e = yield Promise.resolve().then(() => u(s("vFR8")));
                            return new Promise((s, i) => {
                                const a = e.Modules;
                                s(a),
                                t && t(a)
                            }).catch(t => {
                                console.error("AerisWeather.Modules - ERROR", t)
                            })
                        }))
                }
                var g = class {
                    constructor(t, e, s) {
                        if (!p(t) || !p(e)) {
                            const t = new Error("AerisWeather must be initialized with valid access keys. Refer to https://www.aerisweather.com/support/docs/api/getting-started/ for more information.");
                            throw console.error(t.message),
                            t
                        }
                        this._account = new i.default(t, e),
                        this._servers = s || l.servers,
                        this._account.servers = this._servers
                    }
                    get utils() {
                        return Object.assign(Object.assign({
                                $: o.default
                            }, a), {
                            strings: Object.assign({}, r),
                            colors: Object.assign({}, n),
                            dates: {
                                format: a.formatDate,
                                parse: a.parseDate
                            }
                        })
                    }
                    account() {
                        return this._account
                    }
                    servers() {
                        return this._servers
                    }
                    api(t) {
                        return this.account().api(t)
                    }
                    map(t) {
                        return this.account().map(t)
                    }
                    views(t) {
                        return c(this, void 0, void 0, (function  * () {
                                const e = yield Promise.resolve().then(() => u(s("TSzo")));
                                return new Promise((s, i) => {
                                    const a = e.Views;
                                    a.setAccount(this.account()),
                                    a.setServers(this.servers()),
                                    s(e.Views),
                                    t && t(e.Views)
                                }).catch(t => {
                                    console.error("AerisWeather.Views - ERROR", t)
                                })
                            }))
                    }
                    apps(t) {
                        return c(this, void 0, void 0, (function  * () {
                                const e = yield Promise.resolve().then(() => u(s("RoH1")));
                                return new Promise((s, i) => {
                                    const a = e.Apps;
                                    a.setAccount(this.account()),
                                    a.setServers(this.servers()),
                                    s(e.Apps),
                                    t && t(e.Apps)
                                }).catch(t => {
                                    console.error("AerisWeather.Apps - ERROR", t)
                                })
                            }))
                    }
                    modules(t) {
                        return c(this, void 0, void 0, (function  * () {
                                return f(t)
                            }))
                    }
                };
                e.default = g
            },
            djCz: function (t, e, s) {
                "use strict";
                Object.defineProperty(e, "__esModule", {
                    value: !0
                }),
                e.default = void 0;
                var i,
                a = (i = s("8Zrd")) && i.__esModule ? i : {
                default:
                    i
                };
                class r extends a.default {
                    constructor(t, e, s, i) {
                        super(t, s, i),
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
                                    path: this._points.map(t => ({
                                            lat: t.lat,
                                            lng: t.lon
                                        }))
                                }));
                        return t.addListener("click", () => this.trigger("click", {
                                polyline: this
                            })),
                        t.addListener("mouseover", () => this.trigger("mouseover", {
                                polyline: this
                            })),
                        t.addListener("mouseout", () => this.trigger("mouseout", {
                                polyline: this
                            })),
                        t
                    }
                    addToMap(t) {
                        this.renderable && this.renderable.setMap(t)
                    }
                    removeFromMap(t) {
                        this.renderable && this.renderable.setMap(null)
                    }
                }
                var n = r;
                e.default = n,
                t.exports = e.default
            },
            fOum: function (t, e, s) {
                "use strict";
                Object.defineProperty(e, "__esModule", {
                    value: !0
                }),
                e.default = void 0;
                var i,
                a = (i = s("bMim")) && i.__esModule ? i : {
                default:
                    i
                },
                r = s("jNhv");
                class n extends a.default {
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
                        (0, r.isset)(s) && this._order.set(t, s)
                    }
                    get(t) {
                        let e = super.get(t);
                        if (!(0, r.isset)(e)) {
                            const s = this.mapping.get(t);
                            s && (e = super.get(s))
                        }
                        return e
                    }
                }
                var o = n;
                e.default = o,
                t.exports = e.default
            },
            fU9j: function (t, e, s) {
                "use strict";
                Object.defineProperty(e, "__esModule", {
                    value: !0
                }),
                e.default = void 0;
                var i,
                a = (i = s("hV9s")) && i.__esModule ? i : {
                default:
                    i
                },
                r = s("jNhv");
                class n extends a.default {
                    constructor(t, e, s, i) {
                        super(t, s, i),
                        this._service = e
                    }
                    setUrl(t) {
                        this.opts.url = t,
                        this.map && this.invalidate()
                    }
                    setOpacity(t) {
                        super.setOpacity(t),
                        this.renderable.setOpacity(t)
                    }
                    setZIndex(t) {
                        this.renderable.setZIndex(t)
                    }
                    updateVisibility(t) {
                        this.renderable && this.renderable.setOpacity(t ? this.opacity : 0)
                    }
                    createRenderable() {
                        const t = this._service;
                        return L.tileLayer(t.url(), (0, r.extend)({}, this.opts, {
                                subdomains: t.range().join("")
                            }))
                    }
                }
                var o = n;
                e.default = o,
                t.exports = e.default
            },
            g8Bo: function (t, e, s) {
                "use strict";
                Object.defineProperty(e, "__esModule", {
                    value: !0
                }),
                e.default = void 0;
                var i,
                a = s("jNhv"),
                r = (i = s("b9Bd")) && i.__esModule ? i : {
                default:
                    i
                },
                n = s("s8Ky");
                var o = class {
                    constructor(t = null) {
                        this._opts = (0, a.extend)({
                            strokeWidth: 4
                        }, t),
                        this.render()
                    }
                    get $el() {
                        return this._target
                    }
                    get $path() {
                        return (0, r.default)(`.${n.Globals.cssPrefix}fill-path`, this.$el)
                    }
                    appendTo(t, e = null) {
                        const s = (0, r.default)(t);
                        s.length > 0 && (s.append(this.$el), this._target = (0, r.default)(`.${n.Globals.cssPrefix}loader`, s), e && this._target.css(e))
                    }
                    startAnimating() {
                        this.$el.addClass("animated")
                    }
                    stopAnimating() {
                        this.$el.removeClass("animated")
                    }
                    render() {
                        let t = !1,
                        e = (0, a.get)(this._opts, "size") || "100%";
                        (0, a.isString)(e) && (!1 === /%$/.test(e) ? (e = e.replace(/[0-9\.]/, ""), e = parseFloat(e)) : t = !0);
                        const s = (0, a.isString)(e) ? 60 : e,
                        i = Math.round(s / 2),
                        o = Math.round(s / 60 * 18),
                        l = Math.round(s / 2),
                        h = (0, a.get)(this._opts, "strokeWidth") || 4,
                        d = t ? e : e + "px";
                        this._target = (0, r.default)(`\n\t\t\t<div class="${n.Globals.cssPrefix}loader" style="width: ${d}; height: ${d};">\n\t\t\t\t<svg version="1.1" class="${n.Globals.cssPrefix}filler-loader" width="${s}" height="${s}" style="margin-top: -${l}px; margin-left: -${l}px;">\n\t\t\t\t\t<circle class="${n.Globals.cssPrefix}fill-path" cx="${i}" cy="${i}" r="${o}" stroke-width="${h}" />\n\t\t\t\t</svg>\n\t\t\t</div>\n\t\t`)
                    }
                };
                e.default = o,
                t.exports = e.default
            },
            gIvP: function (t, e, s) {
                "use strict";
                Object.defineProperty(e, "__esModule", {
                    value: !0
                }),
                e.default = void 0;
                var i = h(s("E4z8")),
                a = h(s("2m5s")),
                r = function (t) {
                    if (t && t.__esModule)
                        return t;
                    if (null === t || "object" != typeof t && "function" != typeof t)
                        return {
                        default:
                            t
                        };
                    var e = l();
                    if (e && e.has(t))
                        return e.get(t);
                    var s = {},
                    i = Object.defineProperty && Object.getOwnPropertyDescriptor;
                    for (var a in t)
                        if (Object.prototype.hasOwnProperty.call(t, a)) {
                            var r = i ? Object.getOwnPropertyDescriptor(t, a) : null;
                            r && (r.get || r.set) ? Object.defineProperty(s, a, r) : s[a] = t[a]
                        }
                    s.default = t,
                    e && e.set(t, s);
                    return s
                }
                (s("Lm4Y")),
                n = s("jNhv"),
                o = s("UiiV");
                function l() {
                    if ("function" != typeof WeakMap)
                        return null;
                    var t = new WeakMap;
                    return l = function () {
                        return t
                    },
                    t
                }
                function h(t) {
                    return t && t.__esModule ? t : {
                    default:
                        t
                    }
                }
                class d extends i.default {
                    _process(t, e) {
                        if (!this.strategy)
                            throw new Error("No map strategy defined for VectorSource but one is required.");
                        t = t || {};
                        const s = (0, n.get)(this.opts, "data.formatter");
                        s && (t = s(t));
                        const i = {},
                        l = {},
                        h = {};
                        if ((0, n.isArray)(t) && (t = t[0] && "FeatureCollection" === t[0].type ? t[0] : {
                                    type: "FeatureCollection",
                                    features: t
                                }), "Feature" === t.type ? t = {
                                type: "FeatureCollection",
                                features: [t]
                            }
                             : "GeometryCollection" === t.type && (t = {
                                    type: "FeatureCollection",
                                    features: (t.geometries || []).map(t => ({
                                            type: "Feature",
                                            geometry: t
                                        }))
                                }), !(0, n.isset)(t.type))
                            return console.warn(`Invalid data provided for GeoJsonSource with key ${this.key}, not a valid GeoJSON format`), null;
                        const d = this.strategy.factory,
                        u = new a.default(t), {
                            marker: c,
                            polygon: p,
                            polyline: f
                        } = this.style;
                        return (u.features || []).forEach((t, e) => {
                            const s = t.geometry,
                            a = t.properties || {};
                            let u;
                            const g = (0, n.get)(this.opts, "data.properties.id"),
                            m = (0, n.get)(this.opts, "data.properties.category");
                            if ((0, n.isset)(g) && (t.id = (0, n.get)(a, g)), (0, n.isset)(m)) {
                                u = (0, n.get)(a, m);
                                const t = (0, n.set)({}, m, u);
                                l[u] || (l[u] = {
                                        data: Object.assign(Object.assign({}, t), {
                                            awxjs_source: this.key
                                        }),
                                        elements: []
                                    }),
                                h[u] || (h[u] = {
                                        data: Object.assign(Object.assign({}, t), {
                                            awxjs_source: this.key
                                        }),
                                        elements: []
                                    })
                            }
                            if (a.id = "" + this.key, t.id ? a.id = `${a.id}-${t.id}` : a.id = `${a.id}-${e}`, s instanceof r.Point) {
                                const t = (0, n.isFunction)(c) ? c(a) : c,
                                e = (0, o.generateMarker)(this.key, a, s.coordinates, t, d);
                                i[a.id] = e
                            } else if (s instanceof r.MultiPoint)
                                s.coordinates.forEach((t, e) => {
                                    const s = Object.assign(Object.assign({}, a), {
                                        id: `${a.id}-${e}`
                                    }),
                                    r = (0, n.isFunction)(c) ? c(s) : c,
                                    l = (0, o.generateMarker)(this.key, s, t, r, d);
                                    i[a.id] = l
                                });
                            else if (s instanceof r.LineString) {
                                const t = (0, o.generatePolyline)(this.key, a, s.coordinates, f, d);
                                u ? h[u].elements.push(t) : h[a.id] = t
                            } else if (s instanceof r.MultiLineString)
                                s.coordinates.forEach((t, e) => {
                                    const s = Object.assign(Object.assign({}, a), {
                                        id: `${a.id}-${e}`
                                    }),
                                    i = (0, o.generatePolyline)(this.key, s, t, f, d);
                                    u ? h[u].elements.push(i) : h[a.id] = i
                                });
                            else if (s instanceof r.Polygon) {
                                const t = (0, o.generatePolygon)(this.key, a, s, p, d);
                                u ? h[u].elements.push(t) : l[a.id] = t
                            } else if (s instanceof r.MultiPolygon) {
                                const t = (0, o.generatePolygon)(this.key, a, s, p, d);
                                u ? h[u].elements.push(t) : l[a.id] = t
                            }
                        }), {
                            markers: Object.keys(i).map(t => i[t]),
                            polygons: Object.keys(l).map(t => l[t]),
                            polylines: Object.keys(h).map(t => h[t])
                        }
                    }
                }
                var u = d;
                e.default = u,
                t.exports = e.default
            },
            gQtN: function (t, e, s) {
                "use strict";
                Object.defineProperty(e, "__esModule", {
                    value: !0
                }),
                e.default = void 0;
                var i,
                a = (i = s("AIg7")) && i.__esModule ? i : {
                default:
                    i
                },
                r = s("jNhv"),
                n = s("+mSH");
                class o extends a.default {
                    constructor(t = null) {
                        super(),
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
                        t = (0, r.extend)({}, {
                            key: void 0,
                            enabled: !0,
                            from: 0,
                            to: 0,
                            duration: 2,
                            endDelay: 1,
                            intervals: 10,
                            autoplay: !1,
                            future: !1,
                            alwaysShow: !1
                        }, t),
                        this._now = new Date;
                        const e = this._now.getTime();
                        if (Object.keys(t).forEach(e => {
                                let s = t[e];
                                if (("from" === e || "to" === e) && (0, r.isString)(s)) {
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
                                    Object.keys(t).forEach(e => {
                                        const i = t[e];
                                        (0, r.isArray)(i) && i.forEach(t => {
                                            const i = new RegExp(`^([\\d\\.-]+)${t}$`);
                                            s = s.replace(i, "$1" + e)
                                        })
                                    }),
                                    /(year|month|week|day|hour|minute|second)/.test(s) && (s = 3600 * (0, r.toTimeOffsetHours)(s))
                                }
                                (0, r.isNumeric)(s) && (s = parseFloat(s)),
                                t[e] = s
                            }), (0, r.isString)(t.from) && (t.from = (0, n.toDate)("" + t.from)), (0, r.isString)(t.to) && (t.to = (0, n.toDate)("" + t.to)), this.opts = t, (0, r.isDate)(t.from)) {
                            const s = t.from;
                            this._startOffset = s.getTime() - e,
                            this.from = s.getTime()
                        } else
                            this._startOffset = 1e3 * parseFloat("" + t.from), this.from = e + this._startOffset;
                        if ((0, r.isDate)(t.to)) {
                            const s = t.to;
                            this._endOffset = s.getTime() - e,
                            this.to = s.getTime()
                        } else
                            this._endOffset = 1e3 * parseFloat("" + t.to), this.to = e + this._endOffset;
                        this._enabled = t.enabled,
                        this.duration = t.duration || 2,
                        this.endDelay = t.endDelay || 1,
                        this.totalIntervals = t.intervals || 10,
                        this._time = this.from,
                        this._times = [],
                        this._startup()
                    }
                    get key() {
                        return this.opts.key
                    }
                    get timeline() {
                        return this._timeline
                    }
                    set timeline(t) {
                        this._timeline = t,
                        t && (this.now = t.now, this.from = t.from, this.to = t.to, ["duration", "endDelay"].forEach(e => {
                                this.opt(e, t.opt(e))
                            }), this.goToTime(t.currentTime))
                    }
                    get from() {
                        return parseFloat("" + this.opts.from)
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
                        return parseFloat("" + this.opts.to)
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
                    opt(t, e) {
                        return e ? ((0, r.set)(this.opts, t, e), "intervals" === t && (this.reset(), this.totalIntervals = e, this._updateTimes()), this) : (0, r.get)(this.opts, t)
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
                        this._paused = !0
                    }
                    resume() {
                        this.isAnimating() && this._paused && this._start(),
                        this._paused = !1
                    }
                    restart() {
                        this._clearTimers(),
                        this._restartTimer = setTimeout(() => {
                            this.goToTime(this.from),
                            this._start()
                        }, 1e3 * this.endDelay)
                    }
                    reset(t = !1) {
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
                        e = (0, r.isDate)(t) ? t.getTime() : t,
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
                        const e = (0, r.isDate)(t) ? t.getTime() : t;
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
                        const e = (0, r.isDate)(t) ? t.getTime() : t;
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
                    setTimes(t, e = 1) {
                        this.reset(),
                        (0, r.isset)(t) ? (this._manualTimes = !0, this._times = t.map(t => ((0, r.isset)(t.time) && (t = t.time), t instanceof Date ? t.getTime() : (0, r.isNumber)(t) ? t : Number.NaN)).filter((t, s) => (0, r.isNumeric)(t) && s % e == 0)) : (this._manualTimes = !1, this._updateTimes())
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
                        this.timeline || (this._active = !0, this._timer = setInterval(() => {
                                const t = this._time + this._increment;
                                t > this.to ? this.restart() : this.goToTime(t)
                            }, 1e3 * this._delay))
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
                        this._times.forEach(i => {
                            const a = Math.abs(t - i);
                            a < s && (s = a, e = i)
                        }),
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
                            n = this.from + i * t + s;
                            0 !== t && n === r || (e(Math.round(n)), r = n)
                        }
                        return t.length > 0 && e(this.to),
                        this.totalIntervals = t.length,
                        t
                    }
                }
                var l = o;
                e.default = l,
                t.exports = e.default
            },
            hV9s: function (t, e, s) {
                "use strict";
                Object.defineProperty(e, "__esModule", {
                    value: !0
                }),
                e.default = void 0;
                var i,
                a = (i = s("Bte/")) && i.__esModule ? i : {
                default:
                    i
                };
                class r extends a.default {
                    invalidate() {}
                    createRenderable() {}
                    updateVisibility(t) {}
                    addToMap(t, e) {
                        this.renderable && this.renderable.addTo(t)
                    }
                    removeFromMap(t) {
                        this.renderable && this.renderable.remove()
                    }
                }
                var n = r;
                e.default = n,
                t.exports = e.default
            },
            "j/OV": function (t, e, s) {
                "use strict";
                Object.defineProperty(e, "__esModule", {
                    value: !0
                }),
                e.default = void 0;
                var i,
                a = (i = s("b9Bd")) && i.__esModule ? i : {
                default:
                    i
                };
                var r = class {
                    constructor(t) {
                        if (!document)
                            return;
                        const e = (0, a.default)('<div class="aeris__openlayers__popup"></div>');
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
                            marginLeft: `-${Math.round(e / 2)}px`
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
                        (0, a.default)("head").append("<style type=\"text/css\">\n\t\t\t.aeris__openlayers__popup {\n\t\t\t\tbackground: #fff;\n\t\t\t\tborder-radius: 6px;\n\t\t\t\tbottom: 100%;\n\t\t\t\tcolor: #222;\n\t\t\t\tdisplay: block;\n\t\t\t\tfilter: drop-shadow(0 1px 4px rgba(0,0,0,0.2));\n\t\t\t\tfont-family: 'Helvetica','Arial',sans-serif;\n\t\t\t\tfont-size: 13px;\n\t\t\t\tfont-weight: normal;\n\t\t\t\tleft: 50%;\n\t\t\t\tline-height: 14px;\n\t\t\t\tmargin-bottom: 15px;\n\t\t\t\tmargin-left: -100px;\n\t\t\t\tmin-width: 120px;\n\t\t\t\tpadding: 8px 10px;\n\t\t\t\tpointer-events: none;\n\t\t\t\tposition: absolute;\n\t\t\t\ttransition: opacity .2s ease-out;\n\t\t\t\tz-index: 10000;\n\t\t\t\t-webkit-font-smoothing: antialiased\n\t\t\t}\n\n\t\t\t.aeris__openlayers__popup:after {\n\t\t\t\tborder-left: solid transparent 10px;\n\t\t\t\tborder-right: solid transparent 10px;\n\t\t\t\tborder-top: solid #fff 10px;\n\t\t\t\tbottom: -10px;\n\t\t\t\tcontent: \" \";\n\t\t\t\theight: 0;\n\t\t\t\tleft: 50%;\n\t\t\t\tmargin-left: -9px;\n\t\t\t\tposition: absolute;\n\t\t\t\twidth: 0\n\t\t\t}\n\t\t</style>")
                    }
                };
                e.default = r,
                t.exports = e.default
            },
            jiPZ: function (t, e, s) {
                "use strict";
                Object.defineProperty(e, "__esModule", {
                    value: !0
                }),
                e.default = e.config = void 0;
                var i = s("jNhv");
                const a = (t = "") => {
                    switch (t = t.toLowerCase().replace(/\s/, "-")) {
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
                r = {
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
                            let e = (0, i.get)(t, "report.type");
                            (0, i.get)(t, "report.mag") >= 9 && (e = "catastrophic");
                            const s = ((t = "") => {
                                switch (t = t.toLowerCase().replace(/\s/, "-")) {
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
                            })(e);
                            return {
                                className: "marker-earthquake",
                                svg: {
                                    shape: {
                                        type: "circle",
                                        fill: {
                                            color: a(e)
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
                e.config = r;
                var n = r;
                e.default = n
            },
            kghW: function (t, e, s) {
                "use strict";
                Object.defineProperty(e, "__esModule", {
                    value: !0
                }),
                e.default = void 0;
                var i = p(s("7rjk")),
                a = function (t) {
                    if (t && t.__esModule)
                        return t;
                    if (null === t || "object" != typeof t && "function" != typeof t)
                        return {
                        default:
                            t
                        };
                    var e = c();
                    if (e && e.has(t))
                        return e.get(t);
                    var s = {},
                    i = Object.defineProperty && Object.getOwnPropertyDescriptor;
                    for (var a in t)
                        if (Object.prototype.hasOwnProperty.call(t, a)) {
                            var r = i ? Object.getOwnPropertyDescriptor(t, a) : null;
                            r && (r.get || r.set) ? Object.defineProperty(s, a, r) : s[a] = t[a]
                        }
                    s.default = t,
                    e && e.set(t, s);
                    return s
                }
                (s("LA41")),
                r = p(s("4aZo")),
                n = p(s("sifU")),
                o = p(s("/BY0")),
                l = p(s("j/OV")),
                h = s("jNhv"),
                d = p(s("b9Bd")),
                u = s("T1DL");
                function c() {
                    if ("function" != typeof WeakMap)
                        return null;
                    var t = new WeakMap;
                    return c = function () {
                        return t
                    },
                    t
                }
                function p(t) {
                    return t && t.__esModule ? t : {
                    default:
                        t
                    }
                }
                class f extends i.default {
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
                        return (0, d.default)(this.map.getTarget())
                    }
                    loadDependencies() {
                        return new Promise((t, e) => {
                            if ("undefined" == typeof ol || void 0 === ol.Map) {
                                const e = "6.5.0";
                                Promise.all([(0, h.loadStyles)(`https://openlayers.org/en/v${e}/css/ol.css`), (0, h.loadScript)(`https://cdn.rawgit.com/openlayers/openlayers.github.io/master/en/v${e}/build/ol.js`)]).then(() => {
                                    t()
                                })
                            } else
                                t()
                        })
                    }
                    setupMap(t) {
                        this._factory = new n.default,
                        this._eventMapping = {
                            unload: "unload",
                            resize: "resize",
                            dblclick: "dblclick",
                            mousedown: "mousedown",
                            mouseup: "mouseup",
                            mouseover: "mouseover",
                            mouseout: "mouseout",
                            mousemove: "mousemove",
                            zoom: "zoom",
                            zoomstart: "zoom:start",
                            zoomend: "zoom:end",
                            movestart: "move:start",
                            moveend: "move:end",
                            popupopen: "popupopen",
                            popupclose: "popupclose"
                        },
                        l.default.injectStyles();
                        const e = (0, h.get)(this.opts, "map.view");
                        if (e && e instanceof ol.View) {
                            const [t, s] = ol.proj.toLonLat(e.getCenter());
                            (0, h.isset)(s) && (0, h.isset)(t) && (0, h.set)(this.opts, "center", {
                                lat: s,
                                lon: t
                            }),
                            (0, h.set)(this.opts, "zoom", e.getZoom())
                        }
                        if ((0, u.isOpenLayers)(t))
                            this._setInitialView = !1, this._map = t;
                        else {
                            if ((0, h.isString)(t) && (t = (0, d.default)(t)), (0, h.isArray)(t) && t.length > 0)
                                t = t[0];
                            else if ((0, h.isDOM)(t)) {
                                t = t[0]
                            }
                            const e = (0, h.extend)({
                                layers: [new ol.layer.Tile({
                                        source: new ol.source.OSM
                                    })]
                            }, this.opts.map);
                            e.target = t,
                            this._map = new ol.Map(e),
                            (0, d.default)("head").append("<style>.ol-zoom { top: auto; bottom: .5em; }</style>"),
                            (0, h.isset)(this.opts.center) || (0, h.set)(this.opts, "center", {
                                lat: 43,
                                lon: -93
                            }),
                            (0, h.isset)(this.opts.zoom) || (0, h.set)(this.opts, "zoom", 7)
                        }
                        setTimeout(() => {
                            this.trigger("map:ready")
                        }, 250)
                    }
                    setBaseUrl(t) {
                        const e = this.map.getLayers().item(0);
                        this.map.removeLayer(e),
                        this.map.getLayers().insertAt(0, new ol.layer.Tile({
                                source: (0, h.isset)(t) ? new ol.source.XYZ({
                                    url: t.replace(/\{s\}/, "1")
                                }) : new ol.source.OSM
                            }))
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
                    fitBounds(t, e = [10, 10]) {
                        const [s, i] = ol.proj.fromLonLat([t.west, t.south]),
                        [a, r] = ol.proj.fromLonLat([t.east, t.north]),
                        n = [s, i, a, r];
                        let o;
                        1 === e.length ? o = [e[0], e[0], e[0], e[0]] : 2 === e.length ? o = [e[1], e[0], e[1], e[0]] : 4 === e.length && (o = [e[0], e[1], e[2], e[3]]),
                        this.map.getView().fit(n, {
                            padding: o
                        })
                    }
                    isTile(t) {
                        return t instanceof o.default
                    }
                    isMarker(t) {
                        return t instanceof a.Marker
                    }
                    isPolygon(t) {
                        return t instanceof a.Polygon
                    }
                    isPolyline(t) {
                        return t instanceof a.Polyline
                    }
                    addOverlay(t, e) {
                        t instanceof a.Tile ? t.addTo(this.map, e) : (t instanceof ol.layer.Base || t instanceof ol.layer.Tile) && (e ? this.map.getLayers().insertAt(e, t) : this.map.addLayer(t))
                    }
                    removeOverlay(t) {
                        t instanceof a.Tile ? t.remove() : (t instanceof ol.layer.Base || t instanceof ol.layer.Tile) && this.map.removeLayer(t)
                    }
                    addMarker(t, e) {
                        if (t instanceof a.Marker)
                            this.containsLayer(t.renderable) || (t.on("click", () => this.trigger("marker:click", {
                                        data: e,
                                        marker: t
                                    })), t.on("mouseover", () => this.trigger("marker:mouseover", {
                                        data: e,
                                        marker: t
                                    })), t.on("mouseout", () => this.trigger("marker:mouseout", {
                                        data: e,
                                        marker: t
                                    })), t.addTo(this.map));
                        else if (t instanceof ol.layer.Vector)
                            return void(this.containsLayer(t) || this.map.addLayer(t));
                        super.addMarker(t, e)
                    }
                    removeMarker(t) {
                        t instanceof a.Marker ? (t.offAll(), t.remove()) : t instanceof ol.layer.Vector && this.map.removeLayer(t),
                        super.removeMarker(t)
                    }
                    updateMarker(t, e, s = null) {
                        e && (t instanceof a.Marker && t.update(e), super.updateMarker(t, e, s))
                    }
                    showMarkers(t, e) {
                        t.forEach(t => {
                            this.isMarker(t) && (t = t.layer),
                            t instanceof ol.layer.Vector && t.setVisible(e)
                        })
                    }
                    addShape(t, e) {
                        if ((t instanceof a.Polygon || t instanceof a.Polyline) && !this.containsLayer(t.renderable)) {
                            const s = this.getIndexBoundForGeom("point", !0);
                            t.on("click", () => this.trigger("shape:click", {
                                    data: e,
                                    shape: t
                                })),
                            t.on("mouseover", () => this.trigger("shape:mouseover", {
                                    data: e,
                                    shape: t
                                })),
                            t.on("mouseout", () => this.trigger("shape:mouseout", {
                                    data: e,
                                    shape: t
                                })),
                            t.addTo(this.map, s),
                            this._shapeDataById[t.id] = e
                        }
                        super.addShape(t, e)
                    }
                    removeShape(t) {
                        (t instanceof a.Polygon || t instanceof a.Polyline) && (t.offAll(), t.remove()),
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
                        if (!(0, h.isset)(t))
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
                        if (!(0, h.isset)(t))
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
                    getIndexBoundForGeom(t, e = !1) {
                        let s = 0;
                        return this.map.getLayers().getArray().forEach((i, a) => {
                            if (i instanceof ol.layer.Vector) {
                                const r = i.getSource().getFeatures();
                                if (r && r.length > 0) {
                                    r[0].getGeometry().getType().toLowerCase() === t.toLowerCase() && (s = e ? Math.min(s, a) : Math.max(s, a))
                                }
                            }
                        }),
                        Math.max(1, s)
                    }
                    showCallout(t, e, s) {
                        const i = new l.default;
                        if (i.setHTML(e), (0, u.isCoordObject)(t))
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
                        super._setupEvents(),
                        this.map.on("rendercomplete", () => {
                            !1 === this._hasLoaded && (this._hasLoaded = !0, this.trigger("load"))
                        }),
                        this.map.on("click", t => {
                            let e = !1,
                            s = !1;
                            this.map.forEachFeatureAtPixel(t.pixel, (t, i) => {
                                if (!s) {
                                    const a = t.getGeometry(),
                                    n = t.getProperties(),
                                    o = ((0, h.get)(n, "id") || (0, h.get)(n, "properties.id") || "").replace(/^aeris-layer-/, "");
                                    if (a instanceof ol.geom.Point)
                                        e = !0, i.dispatchEvent(new r.default("marker:click")), s = !0;
                                    else if (a instanceof ol.geom.SimpleGeometry) {
                                        const e = this._shapeDataById[o];
                                        this.trigger("shape:click", {
                                            shape: t,
                                            data: e
                                        }),
                                        s = !0
                                    }
                                }
                            }, {
                                hitTolerance: 10
                            }),
                            s ? (this._clickedMapLayer = !0, setTimeout(() => {
                                    this._clickedMapLayer = !1
                                }, 100)) : this.trigger("click", this._dataForMapEvent("click", t)),
                            !e && this._activePopup && this._activePopup.remove()
                        }),
                        this.map.on("moveend", t => {
                            this.trigger("change:bounds"),
                            this.trigger("change:center")
                        }),
                        this.map.on("zoomend", t => {
                            this.trigger("change:zoom")
                        });
                        const t = () => {
                            if (this._hoveredMapLayer) {
                                const {
                                    type: t,
                                    feature: e
                                } = this._hoveredMapLayer;
                                this.trigger(t + ":mouseout", {
                                    [t]: e,
                                    data: null
                                }),
                                this._hoveredMapLayer = void 0
                            }
                        };
                        this.map.on("pointermove", e => {
                            let s = !1;
                            this.map.forEachFeatureAtPixel(e.pixel, (e, i) => {
                                var a,
                                r;
                                if (!s) {
                                    const i = e.getGeometry(),
                                    n = e.getProperties(),
                                    o = ((0, h.get)(n, "id") || (0, h.get)(n, "properties.id") || "").replace(/^aeris-layer-/, "");
                                    if (i instanceof ol.geom.Point)
                                        s = !0, e !== (null === (a = this._hoveredMapLayer) || void 0 === a ? void 0 : a.feature) && (t(), this.trigger("marker:mouseover", {
                                                marker: e,
                                                data: null
                                            }), this._hoveredMapLayer = {
                                                type: "marker",
                                                feature: e
                                            });
                                    else if (i instanceof ol.geom.SimpleGeometry && (s = !0, e !== (null === (r = this._hoveredMapLayer) || void 0 === r ? void 0 : r.feature))) {
                                        t();
                                        const s = this._shapeDataById[o];
                                        this.trigger("shape:mouseover", {
                                            shape: e,
                                            data: s
                                        }),
                                        this._hoveredMapLayer = {
                                            type: "shape",
                                            feature: e
                                        }
                                    }
                                }
                            }),
                            s || t()
                        })
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
                }
                var g = f;
                e.default = g,
                t.exports = e.default
            },
            lJXG: function (t, e, s) {
                "use strict";
                Object.defineProperty(e, "__esModule", {
                    value: !0
                }),
                e.default = void 0;
                var i,
                a = s("jNhv"),
                r = (i = s("AM6C")) && i.__esModule ? i : {
                default:
                    i
                };
                var n = class {
                    constructor(t, e) {
                        this._animatableData = [],
                        this._nonAnimatableData = [],
                        this.source = t;
                        const s = e => ({
                            markers: e.filter(e => e.renderable ? t.strategy.isMarker(e.renderable) : t.strategy.isMarker(e)),
                            shapes: e.filter(e => e.renderable ? t.strategy.isPolygon(e.renderable) || t.strategy.isPolyline(e.renderable) : t.strategy.isPolygon(e) || t.strategy.isPolyline(e))
                        }),
                        i = new r.default;
                        i.provider = this,
                        i.on("play", () => {
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
                        }),
                        i.on("stop", () => {
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
                        }),
                        i.on("reset", () => {
                            t.enabled && (t.markers && t.trigger("markers:add", {
                                    markers: t.markers,
                                    animation: i
                                }), t.shapes && t.trigger("shapes:add", {
                                    shapes: t.shapes,
                                    animation: i
                                })),
                            this._animatableData = [],
                            this._nonAnimatableData = []
                        }),
                        i.on("data:add", e => {
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
                        }),
                        i.on("data:remove", e => {
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
                        }),
                        this.animation = i
                    }
                    animationData(t) {
                        const e = this.source,
                        s = () => {
                            const t = Object.keys(e.markersById).map(t => e.markersById[t]),
                            s = e.shapes;
                            let i = [];
                            if (t) {
                                const s = t.map(t => {
                                    var s,
                                    i;
                                    const {
                                        data: r,
                                        renderable: n,
                                        style: o
                                    } = t;
                                    if (!r || !n)
                                        return null;
                                    let l;
                                    const h = (null === (i = null === (s = e.opts.data) || void 0 === s ? void 0 : s.properties) || void 0 === i ? void 0 : i.timestamp) || "timestamp";
                                    return (0, a.has)(r, h) ? l = 1e3 * (0, a.get)(r, h) : this._nonAnimatableData.push(n), {
                                        timestamp: l,
                                        renderable: n,
                                        style: o,
                                        data: r
                                    }
                                }).filter(t => t && !1 === Number.isNaN(t.timestamp));
                                s && (i = i.concat(s))
                            }
                            if (s) {
                                const t = t => t.map(t => {
                                    var s,
                                    i;
                                    const {
                                        data: r,
                                        renderable: n,
                                        style: o
                                    } = t;
                                    if (!r)
                                        return null;
                                    const l = (null === (i = null === (s = e.opts.data) || void 0 === s ? void 0 : s.properties) || void 0 === i ? void 0 : i.timestamp) || "timestamp";
                                    let h,
                                    d;
                                    return "object" == typeof l && l.from ? d = l.from : "string" == typeof l && (d = l),
                                    (0, a.has)(r, d) ? h = 1e3 * (0, a.get)(r, d) : this._nonAnimatableData.push(n), {
                                        timestamp: h,
                                        renderable: n,
                                        style: o,
                                        data: r
                                    }
                                }).filter(t => t && !1 === Number.isNaN(t.timestamp));
                                s.forEach(e => {
                                    const s = e.polygons;
                                    if ((0, a.isset)(s)) {
                                        const e = t(s);
                                        e && (i = i.concat(e))
                                    } else {
                                        const s = t([e]);
                                        s && (i = i.concat(s))
                                    }
                                })
                            }
                            return this._animatableData = i,
                            i
                        };
                        return new Promise((t, i) => {
                            if (e.isLoading)
                                e.once("data:load", () => {
                                    const e = s();
                                    t(e)
                                });
                            else if (this._animatableData && this._animatableData.length > 0)
                                t(this._animatableData);
                            else if (e.markers) {
                                const e = s();
                                t(e)
                            } else
                                t(null)
                        })
                    }
                };
                e.default = n,
                t.exports = e.default
            },
            lQHJ: function (t, e, s) {
                "use strict";
                Object.defineProperty(e, "__esModule", {
                    value: !0
                }),
                e.default = void 0;
                var i = n(s("AIg7")),
                a = n(s("wAJf")),
                r = s("jNhv");
                function n(t) {
                    return t && t.__esModule ? t : {
                    default:
                        t
                    }
                }
                var o = function (t, e) {
                    var s = {};
                    for (var i in t)
                        Object.prototype.hasOwnProperty.call(t, i) && e.indexOf(i) < 0 && (s[i] = t[i]);
                    if (null != t && "function" == typeof Object.getOwnPropertySymbols) {
                        var a = 0;
                        for (i = Object.getOwnPropertySymbols(t); a < i.length; a++)
                            e.indexOf(i[a]) < 0 && Object.prototype.propertyIsEnumerable.call(t, i[a]) && (s[i[a]] = t[i[a]])
                    }
                    return s
                };
                const l = (t, e) => (0, r.extend)({}, t, e);
                class h extends i.default {
                    constructor(t) {
                        super(),
                        this._moduleLegendCache = {},
                        this._app = t,
                        this._modules = {}
                    }
                    add(t, e = null, s = null) {
                        if ((0, r.isset)(t))
                            if ((0, r.has)(t, "id") && (0, r.has)(t, "load"))
                                this.addGroup(t, e);
                            else if ((0, r.isFunction)(t))
                                t().then(t => {
                                    t = t.default || t,
                                    (0, r.isPlainObject)(t) ? console.error("[Aeris] Module is not a valid class.") : this.add(new t(s), e)
                                }).catch(t => {
                                    console.error("[Aeris] Failed to load built-in module", t)
                                });
                            else {
                                if ((0, r.isEmpty)(t.id))
                                    throw new Error("[Aeris] Map modules must provide a unique identifier using the `id` property.");
                                if (!1 === (0, r.has)(t, "initialize"))
                                    throw new Error(`[Aeris] Cannot add invalid map module ${t.id}. Modules must implement the IMapSourceModule interface and its required methods.`);
                                this._modules[t.id] = t,
                                t.initialize(this._app.account, this._app),
                                this._onAppReady(() => {
                                    const {
                                        source: s,
                                        controls: i,
                                        legend: a,
                                        infopanel: n
                                    } = e || {},
                                    o = (0, r.extend)({}, t.source(), (0, r.isFunction)(s) ? s() : s),
                                    h = (0, r.extend)({}, t.legend(), a),
                                    d = (0, r.extend)({}, t.infopanel(), n),
                                    u = l(t.controls(), i);
                                    if (!(0, r.isset)(o) || (0, r.isEmpty)(o))
                                        throw new Error(`[Aeris] Cannot add map module ${t.id}, a valid map content source was not provided.`);
                                    t.group || this._setupControls(t.id, u),
                                    this._setupLegends(t.id, h),
                                    this._setupInfoPanel(t.id, d);
                                    const c = this._setupSource(t.id, o);
                                    t.dataSource = c,
                                    this._setupModuleEvents(t),
                                    this.trigger("module:load", {
                                        id: t.id,
                                        module: t
                                    });
                                    const p = this._app.initialLayers(),
                                    f = this._app.panels.layers;
                                    if (f && (null == p ? void 0 : p.length) > 0) {
                                        f.buttonForId(t.id) && f.select(p)
                                    }
                                })
                            }
                        else
                            console.error("[Aeris] Invalid module specified, received " + t)
                    }
                    insertAt(t, e, s = null, i = null) {
                        this.add(e, (0, r.extend)(s, {
                                controls: {
                                    index: t
                                }
                            }), i)
                    }
                    addGroup(t, e = null) {
                        e = e || {},
                        t.load().then(s => {
                            (0, r.has)(t, "initialize") && t.initialize(this._app.account, this._app),
                            this._onAppReady(() => {
                                const s = t.controls();
                                if (s) {
                                    const {
                                        controls: i
                                    } = e,
                                    a = l(s, i);
                                    this._setupControls(t.id, a)
                                }
                                this._setupGroupEvents(t)
                            });
                            const i = e.modules || {};
                            s.forEach(e => {
                                e.group = t,
                                this.add(e, i[e.id])
                            })
                        }).catch(t => {
                            console.error("[Aeris] Module group failed to load - ERROR", t)
                        })
                    }
                    remove(t) {
                        const e = this._app.map,
                        s = e.getSourceForId(t.id);
                        s && e.removeSource(s),
                        delete this._modules[t.id],
                        this.trigger("module:unload", {
                            id: t.id,
                            module: t
                        })
                    }
                    removeById(t) {
                        let e;
                        Object.keys(this._modules).forEach(s => {
                            s === t && (e = this._modules[s])
                        }),
                        e && this.remove(e)
                    }
                    _onAppReady(t) {
                        t && (this._app.isReady() ? t() : this._app.on("ready", () => t()))
                    }
                    _setupSource(t, e) {
                        if (e) {
                            const {
                                type: s
                            } = e,
                            i = o(e, ["type"]);
                            return this._app.addSource(t, s, i)
                        }
                        throw new Error(`[Aeris] Cannot add module ${t}, source is invalid.`)
                    }
                    _setupControls(t, e) {
                        if (!e)
                            return;
                        const s = this._app.panels.layers;
                        if (s) {
                            const i = e.index,
                            a = (0, r.extend)({}, e, {
                                id: t
                            });
                            (0, r.isset)(i) ? (delete a.index, s.insertAt(i, a)) : s.add(a)
                        }
                    }
                    _setupLegends(t, e) {
                        if (!e)
                            return;
                        const s = this._app.panels.legends;
                        if (s) {
                            const i = this._app.map,
                            a = this._app.getPanel("layers"),
                            n = t => {
                                s.legend.remove(this._moduleLegendCache[t]),
                                delete this._moduleLegendCache[t]
                            },
                            o = i => {
                                const {
                                    title: a,
                                    url: o,
                                    code: l
                                } = (0, r.isset)(e.get) && (0, r.isFunction)(e.get) ? e.get() : e;
                                l !== this._moduleLegendCache[i] && (n(i), (0, r.isset)(l) ? (s.legend.add(l, {
                                            account: this._app.account,
                                            within: {
                                                bounds: this._app.map.getBounds()
                                            },
                                            title: a
                                        }), this._moduleLegendCache[t] = l) : (0, r.isset)(o) && (s.legend.add(t, {
                                            type: "image",
                                            title: a,
                                            url: o
                                        }), this._moduleLegendCache[t] = t))
                            };
                            i.on("source:add", e => {
                                const s = (0, r.get)(e.data, "id");
                                t === s && o(t)
                            }).on("source:remove", e => {
                                const s = (0, r.get)(e.data, "id");
                                t === s && n(t)
                            }),
                            a && a.on("change", e => {
                                const s = (0, r.get)(e.data, "id");
                                t === s && o(t)
                            })
                        }
                    }
                    _setupInfoPanel(t, e) {
                        if (!e)
                            return;
                        const {
                            sections: s,
                            view: i
                        } = e,
                        r = this._app.panels.info;
                        r && (s || i ? (s && Object.keys(s).forEach(t => a.default.setSection(t, s[t])), i && r.setContentView(t, i)) : r.setContentView(t, e))
                    }
                    _setupModuleEvents(t) {
                        const e = this._app.map;
                        (0, r.has)(t, "onAdd") && e.on("source:add", e => {
                            (0, r.get)(e.data, "id") === t.id && t.onAdd()
                        }),
                        (0, r.has)(t, "onRemove") && e.on("source:remove", e => {
                            (0, r.get)(e.data, "id") === t.id && t.onRemove()
                        }),
                        (0, r.has)(t, "onMarkerClick") && e.on("marker:click", e => {
                            const s = e.data.marker,
                            i = e.data.data || {};
                            i.awxjs_source === t.id && t.onMarkerClick(s, i)
                        }),
                        (0, r.has)(t, "onShapeClick") && e.on("shape:click", e => {
                            const s = e.data.shape,
                            i = e.data.data || {};
                            i.awxjs_source === t.id && t.onShapeClick(s, i)
                        }),
                        (0, r.has)(t, "onInit") && t.onInit()
                    }
                    _setupGroupEvents(t) {
                        const e = this._app.map,
                        s = t.modules.map(t => t.id),
                        i = t.controls();
                        i && i.buttons && (i.buttons || []).forEach(t => {
                            const e = t.id || t.value;
                            -1 === s.indexOf(e) && s.push(e)
                        }),
                        (0, r.has)(t, "onMarkerClick") && e.on("marker:click", e => {
                            const i = e.data.marker,
                            a = e.data.data || {},
                            r = a.awxjs_source;
                            s.indexOf(r) >= 0 && t.onMarkerClick(i, a)
                        }),
                        (0, r.has)(t, "onShapeClick") && e.on("shape:click", e => {
                            const i = e.data.shape,
                            a = e.data.data || {},
                            r = a.awxjs_source;
                            s.indexOf(r) >= 0 && t.onShapeClick(i, a)
                        }),
                        (0, r.has)(t, "onInit") && t.onInit()
                    }
                }
                var d = h;
                e.default = d,
                t.exports = e.default
            },
            m1ZP: function (t, e, s) {
                "use strict";
                Object.defineProperty(e, "__esModule", {
                    value: !0
                }),
                e.markerIconFromStyle = e.formatLayerOptions = void 0;
                var i = s("GK1F"),
                a = s("jNhv");
                e.formatLayerOptions = t => {
                    const e = {
                        stroke: !1,
                        fill: !1
                    };
                    return t.stroke && (e.stroke = !0, e.color = t.stroke.color, e.opacity = t.stroke.opacity, e.weight = t.stroke.width, e.lineCap = t.stroke.lineCap, e.lineJoin = t.stroke.lineJoin, e.dashArray = t.stroke.dashArray, e.dashOffset = t.stroke.dashOffset),
                    t.fill && (e.fill = !0, e.fillColor = t.fill.color, e.fillOpacity = t.fill.opacity, e.fillRule = t.fill.rule || "nonzero"),
                    e.fill && !(0, a.isset)(t.fillOpacity) && (t.fillOpacity = 1),
                    e.stroke && !(0, a.isset)(t.strokeOpacity) && (t.strokeOpacity = 1),
                    e
                };
                e.markerIconFromStyle = t => {
                    if (t.html)
                        return L.divIcon({
                            html: t.html,
                            iconSize: t.size,
                            className: t.className || ""
                        });
                    if (t.svg) {
                        const [e, s] = t.size || [12, 12];
                        return L.divIcon({
                            html: i.SVG.draw(e, s, t.svg),
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
            },
            mn6z: function (t, e, s) {
                "use strict";
                Object.defineProperty(e, "__esModule", {
                    value: !0
                }),
                e.default = e.config = void 0;
                var i = s("jNhv");
                const a = (t = "") => {
                    switch (t = t.toLowerCase().replace(/\s/, "-")) {
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
                            const e = (0, i.get)(t, "periods.0");
                            if (!e)
                                return {
                                    skip: !0
                                };
                            const s = (0, i.get)(e, "category");
                            if (!s)
                                return {
                                    skip: !0
                                };
                            const r = ((t = "") => {
                                switch (t = t.toLowerCase().replace(/\s/, "-")) {
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
                            })(s);
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
                e.config = r;
                var n = r;
                e.default = n
            },
            nOlR: function (t, e, s) {
                "use strict";
                Object.defineProperty(e, "__esModule", {
                    value: !0
                }),
                e.default = void 0;
                var i = s("jNhv"),
                a = o(s("6TFz")),
                r = s("Pcd9"),
                n = o(s("j/OV"));
                function o(t) {
                    return t && t.__esModule ? t : {
                    default:
                        t
                    }
                }
                class l extends a.default {
                    get feature() {
                        return this._feature
                    }
                    get popup() {
                        return this._popup
                    }
                    update(t) {
                        var e;
                        if (!(0, i.isset)(t))
                            return;
                        const s = null === (e = t.data) || void 0 === e ? void 0 : e.value;
                        let a = t.style || {};
                        (0, i.isFunction)(a) && (a = a({
                                value: s
                            })),
                        this.setStyle(a)
                    }
                    setStyle(t) {
                        const e = (0, r.markerIconFromStyle)(t);
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
                        if (t && (s = (0, r.markerIconFromStyle)(t), t.callout)) {
                            let s = t.callout;
                            if ((0, i.isFunction)(t.callout)) {
                                s = (0, t.callout)()
                            }
                            const a = new n.default(e);
                            a.setHTML(s),
                            this._popup = a
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
                        s && ["click", "mouseover", "mouseout"].forEach(e => {
                            const i = `__awxjs_${e}Handler`;
                            s[i] ? s.un(e, s[i]) : (s[i] = i => {
                                    this.trigger(e, {
                                        data: this.data,
                                        marker: s
                                    }),
                                    this.popup && (this._activePopup && this._activePopup.remove(), this.popup.addTo(t), this._activePopup = this.popup)
                                }, s.on("marker:click", s[i]))
                        }),
                        t.addLayer(this.renderable)
                    }
                    removeFromMap(t) {
                        const e = this.renderable;
                        e && ["click", "mouseover", "mouseout"].forEach(t => {
                            const s = `__awxjs_${t}Handler`;
                            e[s] && e.un(t, e[s])
                        }),
                        t.removeLayer(this.renderable)
                    }
                }
                var h = l;
                e.default = h,
                t.exports = e.default
            },
            neGM: function (t, e, s) {
                "use strict";
                var i;
                Object.defineProperty(e, "__esModule", {
                    value: !0
                }),
                e.valueForIndice = e.Indices = void 0,
                e.Indices = i,
                function (t) {
                    t.snow = t => t >= 4 ? 5 : t >= 3 ? 4 : t >= 2 ? 3 : t >= 1 ? 2 : t > .1 ? 1 : 0,
                    t.ice = t => t >= .4 ? 5 : t >= .3 ? 4 : t >= .2 ? 3 : t >= .1 ? 2 : t < .1 && t > 0 ? 1 : 0,
                    t.rain = t => t >= 1 ? 5 : t >= .75 ? 4 : t >= .5 ? 3 : t >= .25 ? 2 : t >= .1 ? 1 : 0,
                    t.wind = t => t >= 50 ? 5 : t >= 40 ? 4 : t >= 30 ? 3 : t >= 20 ? 2 : t > 10 ? 1 : 0,
                    t.lightning = t => t >= 80 ? 5 : t >= 60 ? 4 : t >= 40 ? 3 : t >= 15 ? 2 : t < 15 && t > 0 ? 1 : 0,
                    t.convective = t => ({
                        high: 5,
                        moderate: 4,
                        enhanced: 3,
                        slight: 2,
                        marginal: 1,
                        general: .5,
                        none: 0
                    }
                            [t])
                }
                (i || (e.Indices = i = {}));
                e.valueForIndice = (t, e) => "snow" === t ? i.snow(e) : "ice" === t ? i.ice(e) : "rain" === t ? i.rain(e) : "wind" === t ? i.wind(e) : "lightning" === t ? i.lightning(e) : "convective" === t ? i.convective(e) : 0
            },
            nkQW: function (t, e, s) {
                "use strict";
                Object.defineProperty(e, "__esModule", {
                    value: !0
                }),
                e.default = void 0;
                var i = o(s("IRno")),
                a = o(s("Xl8N")),
                r = s("tPWv"),
                n = s("jNhv");
                function o(t) {
                    return t && t.__esModule ? t : {
                    default:
                        t
                    }
                }
                class l extends i.default {
                    constructor(t) {
                        (t = (0, n.extend)({
                                legend: {
                                    size: {
                                        width: 300,
                                        height: 0
                                    }
                                },
                                icon: '\n\t\t\t\t<svg version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 0 90 90">\n\t\t\t\t\t<g>\n\t\t\t\t\t\t<path d="M45,9c19.9,0,36,16.1,36,36S64.9,81,45,81S9,64.9,9,45C9,25.1,25.1,9,45,9 M45,0C20.1,0,0,20.1,0,45s20.1,45,45,45\n\t\t\t\t\t\t\ts45-20.1,45-45C90,20.1,69.9,0,45,0z"/>\n\t\t\t\t\t\t<path d="M48.7,29.3c0,1-0.4,1.9-1.1,2.7c-0.7,0.7-1.6,1.1-2.6,1.1c-0.5,0-0.9-0.1-1.4-0.3c-0.4-0.2-0.8-0.5-1.2-0.8\n\t\t\t\t\t\t\tc-0.3-0.3-0.6-0.7-0.8-1.2c-0.2-0.5-0.3-0.9-0.3-1.5c0-0.5,0.1-0.9,0.3-1.3c0.2-0.4,0.5-0.8,0.8-1.2c0.3-0.3,0.7-0.6,1.2-0.8\n\t\t\t\t\t\t\tc0.4-0.2,0.9-0.3,1.4-0.3s0.9,0.1,1.4,0.3c0.4,0.2,0.8,0.5,1.2,0.8c0.4,0.3,0.6,0.7,0.8,1.1C48.6,28.3,48.7,28.8,48.7,29.3\n\t\t\t\t\t\t\tL48.7,29.3z M48.3,59.8c0,1.1-0.3,2-0.9,2.6c-0.6,0.7-1.4,1-2.4,1s-1.8-0.3-2.4-1c-0.6-0.7-0.9-1.5-0.9-2.6v-18\n\t\t\t\t\t\t\tc0-1.1,0.3-2,0.9-2.6c0.6-0.7,1.4-1,2.4-1s1.8,0.3,2.4,1c0.6,0.7,0.9,1.5,0.9,2.6V59.8z"/>\n\t\t\t\t\t</g>\n\t\t\t\t</svg>\n\t\t\t'
                            }, t)).className = (0, n.isset)(t.className) ? "app__ui-panel-legends " + t.className : "app__ui-panel-legends";
                        const e = (0, n.get)(t, "legend.size");
                        e && (0, n.set)(t, "legend.size.width", Math.min(e.width, (0, r.windowSize)().width)),
                        super(t)
                    }
                    get legend() {
                        return this._legendView
                    }
                    open() {
                        0 !== this._legendView.count && super.open()
                    }
                    contentSize() {
                        const t = super.contentSize(),
                        e = this._legendView.getSize(),
                        s = this.getContentContainer();
                        t.height = Math.min(e.height, s.outerHeight(!0));
                        const i = s.padding();
                        return t.height += i.top + i.bottom,
                        t
                    }
                    _onAddedToDOM() {
                        super._onAddedToDOM(),
                        this.$el.addClass("awxjs__app__ui-panel-legends"),
                        this._legendView || (this._legendView = new a.default(this.ui.content, (0, n.extend)({
                                        styles: {
                                            label: {
                                                color: "#ffffff"
                                            }
                                        }
                                    }, this.opts.legend))),
                        0 === this._legendView.count && this.hide()
                    }
                    _setupEvents() {
                        super._setupEvents(),
                        this._legendView.on("add remove", t => {
                            const {
                                count: e
                            } = t.data;
                            0 === e ? (this.close(), this.hide()) : this.show()
                        }).on("resize", t => {
                            this._layout()
                        })
                    }
                }
                var h = l;
                e.default = h,
                t.exports = e.default
            },
            "nkx+": function (t, e, s) {
                "use strict";
                Object.defineProperty(e, "__esModule", {
                    value: !0
                }),
                e.default = void 0;
                var i,
                a = s("jNhv"),
                r = (i = s("6TFz")) && i.__esModule ? i : {
                default:
                    i
                },
                n = s("m1ZP");
                class o extends r.default {
                    update(t) {
                        var e;
                        if (!(0, a.isset)(t))
                            return;
                        const s = null === (e = t.data) || void 0 === e ? void 0 : e.value;
                        let i = t.style || {};
                        (0, a.isFunction)(i) && (i = i({
                                value: s
                            })),
                        this.setStyle(i)
                    }
                    setStyle(t) {
                        const e = (0, n.markerIconFromStyle)(t);
                        e && this.renderable.setIcon(e)
                    }
                    createRenderable() {
                        const {
                            style: t
                        } = this.opts,
                        e = this.coordinate,
                        s = {};
                        t && (s.icon = (0, n.markerIconFromStyle)(t), t.zIndex && (s.zIndexOffset = t.zIndex));
                        const i = L.marker([e.lat, e.lon], s);
                        if (t.callout) {
                            let e = t.callout;
                            if ((0, a.isFunction)(t.callout)) {
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
                        this.renderable.on("click", () => this.trigger("click", {
                                data: this.data,
                                marker: this.renderable
                            })),
                        this.renderable.on("mouseover", () => this.trigger("mouseover", {
                                data: this.data,
                                marker: this.renderable
                            })),
                        this.renderable.on("mouseout", () => this.trigger("mouseout", {
                                data: this.data,
                                marker: this.renderable
                            })),
                        this.renderable.addTo(t)
                    }
                    removeFromMap(t) {
                        this.renderable.off(),
                        this.renderable.remove()
                    }
                }
                var l = o;
                e.default = l,
                t.exports = e.default
            },
            "o+BN": function (t, e, s) {
                "use strict";
                Object.defineProperty(e, "__esModule", {
                    value: !0
                }),
                e.default = void 0;
                var i,
                a = (i = s("ccXq")) && i.__esModule ? i : {
                default:
                    i
                },
                r = function (t) {
                    if (t && t.__esModule)
                        return t;
                    if (null === t || "object" != typeof t && "function" != typeof t)
                        return {
                        default:
                            t
                        };
                    var e = o();
                    if (e && e.has(t))
                        return e.get(t);
                    var s = {},
                    i = Object.defineProperty && Object.getOwnPropertyDescriptor;
                    for (var a in t)
                        if (Object.prototype.hasOwnProperty.call(t, a)) {
                            var r = i ? Object.getOwnPropertyDescriptor(t, a) : null;
                            r && (r.get || r.set) ? Object.defineProperty(s, a, r) : s[a] = t[a]
                        }
                    s.default = t,
                    e && e.set(t, s);
                    return s
                }
                (s("+mSH")),
                n = s("jNhv");
                function o() {
                    if ("function" != typeof WeakMap)
                        return null;
                    var t = new WeakMap;
                    return o = function () {
                        return t
                    },
                    t
                }
                class l extends a.default {
                    constructor(t, e, s = {}, i) {
                        super(t, s, i),
                        this._needsEventSetup = !0,
                        this._polygons = e
                    }
                    get strokeLayerId() {
                        return this.layerId + "-stroke"
                    }
                    addTo(t) {
                        if (super.addTo(t), this._strokeLayer) {
                            void 0 !== t.getLayer(this.strokeLayerId) || t.addLayer(this._strokeLayer, this.layerId)
                        }
                        this._needsEventSetup && (t.on("click", this.layerId, t => {
                                this.trigger("click", {
                                    data: this.data,
                                    shape: this.renderable
                                })
                            }), t.on("mouseenter", this.layerId, t => {
                                this.trigger("mouseover", {
                                    data: this.data,
                                    shape: this.renderable
                                })
                            }), t.on("mouseleave", this.layerId, t => {
                                this.trigger("mouseout", {
                                    data: this.data,
                                    shape: this.renderable
                                })
                            }), this._needsEventSetup = !1)
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
                        e = (this._polygons || []).map(t => [t.outer.map(t => [t.lon, t.lat]), ...t.inner ? t.inner.map(t => t.map(t => [t.lon, t.lat])) : []]);
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
                        return ["fill", "line"].forEach(s => {
                            const i = "line" === s ? "stroke" : "fill";
                            Object.keys(t).filter(t => new RegExp(`^${s}-`).test(t)).forEach(s => {
                                const a = r.hyphenate(s);
                                (0, n.isset)(t[s]) && (e[i][a] = t[s])
                            })
                        }),
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
                }
                var h = l;
                e.default = h,
                t.exports = e.default
            },
            oRHp: function (t, e, s) {
                "use strict";
                Object.defineProperty(e, "__esModule", {
                    value: !0
                }),
                e.default = e.config = void 0;
                var i = s("jNhv");
                const a = (t = "") => {
                    switch (t = t.toLowerCase()) {
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
                },
                r = {
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
                            const e = (0, i.get)(t, "details.category");
                            return {
                                fill: {
                                    color: a(e),
                                    opacity: 1
                                }
                            }
                        }
                    }
                };
                e.config = r;
                var n = r;
                e.default = n
            },
            "oi+Y": function (t, e, s) {
                "use strict";
                Object.defineProperty(e, "__esModule", {
                    value: !0
                }),
                e.default = e.config = void 0;
                var i = s("jNhv");
                const a = (t = "") => {
                    switch (t = t.toLowerCase()) {
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
                },
                r = {
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
                            const e = (0, i.get)(t, "traits.type");
                            return {
                                className: "marker-stormcell",
                                svg: {
                                    shape: {
                                        type: "circle",
                                        fill: {
                                            color: a(e)
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
                            const e = (0, i.get)(t, "traits.type");
                            return {
                                fill: {
                                    color: a(e),
                                    opacity: .5
                                }
                            }
                        }
                    }
                };
                e.config = r;
                var n = r;
                e.default = n
            },
            osTS: function (t, e, s) {
                "use strict";
                Object.defineProperty(e, "__esModule", {
                    value: !0
                }),
                e.default = void 0;
                var i = c(s("7rjk")),
                a = function (t) {
                    if (t && t.__esModule)
                        return t;
                    if (null === t || "object" != typeof t && "function" != typeof t)
                        return {
                        default:
                            t
                        };
                    var e = u();
                    if (e && e.has(t))
                        return e.get(t);
                    var s = {},
                    i = Object.defineProperty && Object.getOwnPropertyDescriptor;
                    for (var a in t)
                        if (Object.prototype.hasOwnProperty.call(t, a)) {
                            var r = i ? Object.getOwnPropertyDescriptor(t, a) : null;
                            r && (r.get || r.set) ? Object.defineProperty(s, a, r) : s[a] = t[a]
                        }
                    s.default = t,
                    e && e.set(t, s);
                    return s
                }
                (s("Li+i")),
                r = c(s("0d06")),
                n = c(s("FdfE")),
                o = s("jNhv"),
                l = s("T1DL"),
                h = c(s("b9Bd")),
                d = s("b/Os");
                function u() {
                    if ("function" != typeof WeakMap)
                        return null;
                    var t = new WeakMap;
                    return u = function () {
                        return t
                    },
                    t
                }
                function c(t) {
                    return t && t.__esModule ? t : {
                    default:
                        t
                    }
                }
                class p extends i.default {
                    constructor(t, e) {
                        super(t, (0, o.extend)({
                                accessToken: null
                            }, e)),
                        this.addAttributions = (0, o.debounce)(t => {
                            if ((0, h.default)("#awxjs-attribution").length > 0)
                                return;
                            const e = (0, h.default)('<div id="awxjs-attribution"></div>');
                            this.map.controls[google.maps.ControlPosition.BOTTOM_LEFT].push(e[0]);
                            const s = t.join(" | "),
                            i = {
                                "background-color": "rgba(255,255,255,0.6)",
                                "font-size": "10px",
                                padding: "2px 4px 0",
                                "white-space": "nowrap"
                            };
                            e.html(`<span style="${Object.keys(i).map(t => `${t}: ${i[t]};`).join(" ")}">${s}</span>`)
                        }, 500)
                    }
                    get strategy() {
                        return "google"
                    }
                    get $el() {
                        return (0, h.default)(this.map.getDiv())
                    }
                    loadDependencies() {
                        return new Promise((t, e) => {
                            if ("undefined" == typeof google || void 0 === google.maps) {
                                Promise.all([(0, o.loadScript)("https://maps.googleapis.com/maps/api/js?key=" + this.opts.accessToken)]).then(() => {
                                    t()
                                })
                            } else
                                t()
                        })
                    }
                    setupMap(t) {
                        this._factory = new r.default,
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
                            (0, o.isPlainObject)(t) && (0, o.isset)(t.lat) && (0, o.isset)(t.lng) && (0, o.set)(this.opts, "center", {
                                lat: t.lat,
                                lon: t.lng
                            }),
                            s && (0, o.set)(this.opts, "zoom", s)
                        }
                        if ((0, l.isGoogle)(t))
                            this._setInitialView = !1, this._map = t;
                        else {
                            if ((0, o.isString)(t) && (t = (0, h.default)(t)), (0, o.isArray)(t) && t.length > 0)
                                t = t[0];
                            else if ((0, o.isDOM)(t)) {
                                t = t[0]
                            }
                            this._map = new google.maps.Map(t, (0, o.extend)({
                                        disableDefaultUI: !0,
                                        zoomControl: !0,
                                        zoomControlOptions: {
                                            position: google.maps.ControlPosition.LEFT_BOTTOM
                                        }
                                    }, this.opts.map)),
                            (0, o.isset)(this.opts.center) || (0, o.set)(this.opts, "center", {
                                lat: 43,
                                lon: -93
                            }),
                            (0, o.isset)(this.opts.zoom) || (0, o.set)(this.opts, "zoom", 7)
                        }
                        setTimeout(() => {
                            this.trigger("map:ready")
                        }, 250)
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
                    fitBounds(t, e = [10, 10]) {
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
                        (0, h.default)("#awxjs-attribution").remove()
                    }
                    isTile(t) {
                        return t instanceof n.default
                    }
                    isMarker(t) {
                        return t instanceof google.maps.Marker
                    }
                    isPolygon(t) {
                        return t instanceof google.maps.Polygon
                    }
                    isPolyline(t) {
                        return t instanceof google.maps.Polyline
                    }
                    addSource(t) {
                        super.addSource(t),
                        n.default,
                        this.opts.attribution && this.addAttributions([d.AERIS_ATTRIBUTION])
                    }
                    removeSource(t) {
                        super.removeSource(t),
                        0 === this.sources.length && this.removeAttributions()
                    }
                    addOverlay(t) {
                        t instanceof a.Tile ? (t.enabled = !0, t.addTo(this.map)) : t instanceof google.maps.ImageMapType ? this.map.overlayMapTypes.push(t) : t instanceof google.maps.GroundOverlay && t.setMap(this.map)
                    }
                    removeOverlay(t) {
                        if (t instanceof a.Tile)
                            t.enabled = !1, t.remove();
                        else if (t instanceof google.maps.ImageMapType) {
                            const e = this.map.overlayMapTypes.getArray().indexOf(t);
                            -1 !== e && this.map.overlayMapTypes.removeAt(e)
                        } else
                            t instanceof google.maps.GroundOverlay && t.setMap(null)
                    }
                    addMarker(t, e) {
                        t instanceof a.Marker ? (t.on("click", () => this.trigger("marker:click", {
                                    data: e,
                                    marker: t
                                })), t.on("mouseover", () => this.trigger("marker:mouseover", {
                                    data: e,
                                    marker: t
                                })), t.on("mouseout", () => this.trigger("marker:mouseout", {
                                    data: e,
                                    marker: t
                                })), t.addTo(this.map)) : t instanceof google.maps.Marker && t.setMap(this.map),
                        super.addMarker(t, e)
                    }
                    removeMarker(t) {
                        t instanceof a.Marker ? (t.offAll(), t.remove()) : t instanceof google.maps.Marker && t.setMap(null),
                        super.removeMarker(t)
                    }
                    updateMarker(t, e, s = null) {
                        e && t instanceof a.Marker && t.update(e)
                    }
                    bindCalloutToMarker(t, e) {
                        this.isMarker(t) && t.addListener("click", () => {
                            this._callout.setContent(e),
                            this._callout.open(this.map, t)
                        })
                    }
                    addShape(t, e) {
                        t instanceof a.Polygon || t instanceof a.Polyline ? (t.on("click", () => this.trigger("shape:click", {
                                    data: e,
                                    shape: t
                                })), t.on("mouseover", () => this.trigger("shape:mouseover", {
                                    data: e,
                                    shape: t
                                })), t.on("mouseout", () => this.trigger("shape:mouseout", {
                                    data: e,
                                    shape: t
                                })), t.addTo(this.map)) : (this.isPolygon(t) || this.isPolyline(t)) && t.setMap(this.map),
                        super.addShape(t, e)
                    }
                    removeShape(t) {
                        t instanceof a.Polygon || t instanceof a.Polyline ? (t.offAll(), t.remove()) : (this.isPolygon(t) || this.isPolyline(t)) && t.setMap(null),
                        super.removeShape(t)
                    }
                    showShape(t) {
                        this.addShape(t)
                    }
                    hideShape(t) {
                        this.removeShape(t)
                    }
                    coordToPoint(t) {
                        if (!(0, o.isset)(t))
                            return null;
                        const e = this.map.getProjection(),
                        s = this.map.getBounds(),
                        i = e.fromLatLngToPoint(s.getNorthEast()),
                        a = e.fromLatLngToPoint(s.getSouthWest()),
                        r = Math.pow(this.map.getZoom(), 2),
                        n = e.fromLatLngToPoint(new google.maps.LatLng(t.lat, t.lon));
                        return {
                            x: (n.x - a.x) * r,
                            y: (n.y - i.y) * r
                        }
                    }
                    pointToCoord(t) {
                        if (!(0, o.isset)(t))
                            return null;
                        const e = this.map.getProjection(),
                        s = this.map.getBounds(),
                        i = e.fromLatLngToPoint(s.getNorthEast()),
                        a = e.fromLatLngToPoint(s.getSouthWest()),
                        r = Math.pow(this.map.getZoom(), 2),
                        n = e.fromPointToLatLng(new google.maps.Point(t.x / r * a.x, t.y / r + i.y));
                        return {
                            lat: n.lat(),
                            lon: n.lng()
                        }
                    }
                    showCallout(t, e, s) {
                        if ((0, l.isCoordObject)(t)) {
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
                        this.map.addListener("dragend", e => {
                            t()
                        }),
                        this.map.addListener("zoom_changed", e => {
                            t(),
                            this.trigger("change:zoom")
                        })
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
                }
                var f = p;
                e.default = f,
                t.exports = e.default
            },
            p0fd: function (t, e, s) {
                "use strict";
                Object.defineProperty(e, "__esModule", {
                    value: !0
                }),
                e.default = void 0;
                var i = r(s("AIg7")),
                a = r(s("b9Bd"));
                function r(t) {
                    return t && t.__esModule ? t : {
                    default:
                        t
                    }
                }
                class n extends i.default {
                    constructor() {
                        super(),
                        this.keyHandler = t => {
                            this.listenForKeys(t)
                        }
                    }
                    start() {
                        (0, a.default)(document).on("keyup keypress", this.keyHandler)
                    }
                    stop() {
                        (0, a.default)(document).off("keyup keypress", this.keyHandler)
                    }
                    listenForKeys(t) {
                        const e = t.type,
                        s = (t.key || "").toLowerCase();
                        this.trigger(e, {
                            event: e,
                            key: s
                        }),
                        "keyup" === e && ("escape" === s || "esc" === s || 27 === t.keyCode ? this.trigger("escape") : "enter" === s && this.trigger("enter"))
                    }
                }
                var o = n;
                e.default = o,
                t.exports = e.default
            },
            pa5O: function (t, e, s) {
                "use strict";
                Object.defineProperty(e, "__esModule", {
                    value: !0
                }),
                e.default = void 0;
                var i = n(s("E4z8")),
                a = s("jNhv"),
                r = n(s("2xxI"));
                function n(t) {
                    return t && t.__esModule ? t : {
                    default:
                        t
                    }
                }
                class o extends i.default {
                    constructor(t, e) {
                        var s;
                        super(t, e),
                        (null === (s = this.opts.animation) || void 0 === s ? void 0 : s.enabled) && (this._animator = new r.default(this, this.opts.animation))
                    }
                    processRecord(t) {
                        t = (0, a.cloneDeep)(t);
                        let e = (0, a.get)(this.opts, "data.properties.value");
                        return (0, a.isFunction)(e) || (e = (e || "").replace(/^periods\./, ""), t.periods && (e = "periods[0]." + e)),
                        t.value = t.value || ((0, a.isFunction)(e) ? e(t) : (0, a.get)(t, e)),
                        t
                    }
                }
                var l = o;
                e.default = l,
                t.exports = e.default
            },
            qTT9: function (t, e, s) {
                "use strict";
                Object.defineProperty(e, "__esModule", {
                    value: !0
                }),
                e.default = void 0;
                var i,
                a = s("jNhv"),
                r = (i = s("6TFz")) && i.__esModule ? i : {
                default:
                    i
                },
                n = s("8hz/");
                class o extends r.default {
                    update(t) {
                        var e;
                        if (!(0, a.isset)(t))
                            return;
                        const {
                            data: s
                        } = t;
                        (0, a.isset)(s) && (this.data = Object.assign(Object.assign({}, this.data), s));
                        const i = null === (e = this.data) || void 0 === e ? void 0 : e.value;
                        let r = t.style || {};
                        (0, a.isFunction)(r) && (r = r({
                                value: i
                            })),
                        this.setStyle(r)
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
                        t && (s.icon = (0, n.markerIconFromStyle)(t), t.zIndex && (s.zIndex = t.zIndex));
                        const i = new mapboxgl.Marker({
                            element: s.icon
                        });
                        if (i.setLngLat([e.lon, e.lat]), t && t.callout) {
                            let e = t.callout;
                            if ((0, a.isFunction)(t.callout)) {
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
                            this._events.forEach(t => {
                                const i = `__awxjs_${t}Handler`;
                                s[i] ? e.removeEventListener(t, s[i]) : s[i] = e => {
                                    e.stopPropagation(),
                                    this.trigger(t, {
                                        data: this.data,
                                        marker: s
                                    })
                                },
                                e.addEventListener(t, s[i])
                            }),
                            s.addTo(t)
                        }
                    }
                    removeFromMap(t) {
                        const e = this.renderable;
                        if (e) {
                            const t = e.getElement();
                            this._events.forEach(s => {
                                e[`__awxjs_${s}Handler`] && t.removeEventListener(s, e.__awxjs_clickHandler)
                            }),
                            e.remove()
                        }
                    }
                }
                var l = o;
                e.default = l,
                t.exports = e.default
            },
            rpc3: function (t, e, s) {
                "use strict";
                Object.defineProperty(e, "__esModule", {
                    value: !0
                }),
                e.default = void 0;
                var i = function (t) {
                    if (t && t.__esModule)
                        return t;
                    if (null === t || "object" != typeof t && "function" != typeof t)
                        return {
                        default:
                            t
                        };
                    var e = n();
                    if (e && e.has(t))
                        return e.get(t);
                    var s = {},
                    i = Object.defineProperty && Object.getOwnPropertyDescriptor;
                    for (var a in t)
                        if (Object.prototype.hasOwnProperty.call(t, a)) {
                            var r = i ? Object.getOwnPropertyDescriptor(t, a) : null;
                            r && (r.get || r.set) ? Object.defineProperty(s, a, r) : s[a] = t[a]
                        }
                    s.default = t,
                    e && e.set(t, s);
                    return s
                }
                (s("76qJ")),
                a = s("GK1F"),
                r = s("m1ZP");
                function n() {
                    if ("function" != typeof WeakMap)
                        return null;
                    var t = new WeakMap;
                    return n = function () {
                        return t
                    },
                    t
                }
                var o = class {
                    tileLayer(t, e, s) {
                        return new i.TileSource(t, e, s)
                    }
                    marker(t, e, s) {
                        return s && s.skip && !0 === s.skip ? null : new i.Marker(e, null, {
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
                                html: a.SVG.draw(e, s, t.svg),
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
                        let a;
                        return s && (a = (0, r.formatLayerOptions)(s)),
                        new i.Polygon(t, e, a)
                    }
                    polyline(t, e, s) {
                        let a;
                        s && (a = (0, r.formatLayerOptions)(s));
                        const n = e.map(t => [t.lat, t.lon]);
                        return new i.Polyline(t, n, a)
                    }
                };
                e.default = o,
                t.exports = e.default
            },
            s9Ns: function (t, e, s) {
                "use strict";
                Object.defineProperty(e, "__esModule", {
                    value: !0
                }),
                e.default = void 0;
                var i = _(s("AIg7")),
                a = _(s("LewK")),
                r = s("b/Os"),
                n = s("NvVb"),
                o = s("u/IE"),
                l = s("SJ39"),
                h = _(s("5bKP")),
                d = _(s("g8Bo")),
                u = _(s("S5Ho")),
                c = _(s("h1m7")),
                p = s("T1DL"),
                f = s("jNhv"),
                g = s("Bnei"),
                m = _(s("fOum"));
                function _(t) {
                    return t && t.__esModule ? t : {
                    default:
                        t
                    }
                }
                const y = {
                    "tropical-cyclones": "tropical.Systems",
                    "tropical-cyclones-break-points": "tropical.Breakpoints"
                };
                class v extends i.default {
                    constructor(t, e, s) {
                        if (super(), this._ready = !1, this._metric = !1, this.store = new m.default, this._stateForData = {}, this._resumeAnimationTimer = null, this._resumeOnBoundsChange = !1, this.update = (0, f.debounce)(() => {
                                this._loadForBounds(!0)
                            }, 250), this._dblClickTimer = null, !t)
                            throw new Error("[Aeris] Invalid target specified for InteractiveMap, which must be a DOM element or map instance");
                        e = e || {},
                        t instanceof HTMLElement == !1 && ((0, p.isLeaflet)(t) ? e.strategy = "leaflet" : (0, p.isMapbox)(t) ? e.strategy = "mapbox" : (0, p.isGoogle)(t) ? e.strategy = "google" : (0, p.isOpenLayers)(t) && (e.strategy = "openlayers")),
                        e = (0, f.extend)({
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
                                resetOnBoundsChange: !1
                            },
                            refresh: 0,
                            attribution: !0,
                            onInit: void 0,
                            reloadOnBoundsChange: !0
                        }, e),
                        this._opts = e,
                        e.account && (this.account = e.account),
                        "mapbox" === e.strategy ? this._strategy = new o.MapboxMapStrategy(t, e) : "google" === e.strategy ? this._strategy = new o.GoogleMapStrategy(t, e) : "openlayers" === e.strategy ? this._strategy = new o.OpenLayersMapStrategy(t, e) : this._strategy = new o.LeafletMapStrategy(t, e),
                        this._strategy.dataSource = this,
                        this._timeline = new a.default((0, f.extend)(e.timeline, {
                                    key: "map-timeline"
                                })),
                        this._sourceOrder = {
                            tile: []
                        },
                        this._layers = new u.default(this.account),
                        this._config = new h.default(e.styles),
                        this._metric = this._opts.metric;
                        const i = () => {
                            if (this._indicator = new d.default, this._indicator.appendTo(this.strategy.$el), this.strategy.$el.addClass("awxjs__ia-map"), this._setupEvents(), this._ready = !0, e.layers) {
                                let t = e.layers;
                                (0, f.isArray)(t) || (t = t.split(",")),
                                t.forEach(t => {
                                    if ((0, f.isString)(t))
                                        this.addLayer(t);
                                    else if ((0, f.isPlainObject)(t)) {
                                        const {
                                            layer: e,
                                            options: s
                                        } = t;
                                        this.addLayer(e, s)
                                    }
                                })
                            }
                            e.refresh > 0 && this.enableAutoUpdate(e.refresh),
                            s && s(this),
                            this.trigger("load"),
                            this.trigger("ready")
                        };
                        this._layers.fetch().then(() => {
                            this.strategy.isReady() ? i() : this.strategy.on("ready", t => {
                                i()
                            })
                        })
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
                        if (this._checkReady(), !(0, f.isset)(t) || (0, f.isEmpty)(t) || !(0, f.isString)(t))
                            return console.warn(`[Aeris] Cannot add invalid layer code {${t}} to InteractiveMap.`, t), this;
                        const s = (0, g.identifierForLayer)(t),
                        i = (0, f.get)(e, "id") || s;
                        let a = this.getSourceForId(i);
                        if (a)
                            return this;
                        const n = y[t];
                        return n ? ((0, p.loadMapModuleConfig)(n, (r, n, o) => {
                                const l = (0, f.get)(e, "id") || r;
                                o && o.initialize(this.account, null, this),
                                n = (0, f.extend)({}, n, e);
                                const h = this.createSource(l, n.type, n);
                                h.code = t,
                                this.store.mapping.set(t, l),
                                this.addSource(h, e),
                                this.trigger("layer:add", {
                                    id: i,
                                    layer: s,
                                    source: a
                                })
                            }), this) : (a = (0, g.createAerisSource)(t, (0, f.extend)({}, (0, f.cloneDeep)(e), {
                                    account: this.account,
                                    servers: this._opts.servers,
                                    time: this.timeline.currentDate(),
                                    attribution: this._opts.attribution ? r.AERIS_ATTRIBUTION : null,
                                    timeline: {
                                        intervals: (0, f.get)(this._opts, "timeline.intervals"),
                                        alwaysShowPast: (0, f.get)(this._opts, "timeline.alwaysShowPast"),
                                        alwaysShowFuture: (0, f.get)(this._opts, "timeline.alwaysShowFuture"),
                                        bufferIntervals: (0, f.get)(this._opts, "timeline.bufferIntervals"),
                                        showLoadingIntervals: (0, f.get)(this._opts, "timeline.showLoadingIntervals")
                                    }
                                }), this.strategy.factory, this._layers), a && (a.code = s, this.addSource(a, e), this.store.mapping.set(s, i), this.trigger("layer:add", {
                                    id: i,
                                    layer: s,
                                    source: a
                                })), this)
                    }
                    addLayers(t) {
                        return this._checkReady(),
                        t.forEach(t => this.addLayer(t)),
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
                        return t.forEach(t => this.removeLayer(t)),
                        this
                    }
                    bringLayerToFront(t) {
                        const e = this.getSourceForLayer(t);
                        this.store.count;
                        if (e && e instanceof l.TileSource) {
                            const e = this._sourceOrder.tile,
                            s = e.indexOf(t);
                            -1 !== s && (e.splice(s, 1), e.push(t)),
                            Object.keys(this.store.items).forEach(t => {
                                const s = this.store.get(t);
                                s instanceof l.TileSource && s.setOrder(e.indexOf(t) + 1)
                            })
                        }
                    }
                    sendLayerToBack(t) {
                        const e = this.getSourceForLayer(t);
                        if (e && e instanceof l.TileSource) {
                            const e = this._sourceOrder.tile,
                            s = e.indexOf(t);
                            -1 !== s && (e.splice(s, 1), e.splice(0, 0, t)),
                            Object.keys(this.store.items).forEach(t => {
                                const s = this.store.get(t);
                                s instanceof l.TileSource && s.setOrder(e.indexOf(t) + 1)
                            })
                        }
                    }
                    setLayerOrder(t, e) {
                        const s = this.getSourceForLayer(t);
                        s && s instanceof l.TileSource && (0, f.isset)(e) && s.setOrder(e)
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
                        return (0, g.createSource)(t, e, Object.assign({
                                account: this.account,
                                servers: this._opts.servers
                            }, s), this.strategy.factory)
                    }
                    addSource(t, e) {
                        if (this._checkReady(), !(0, f.isset)(t.key))
                            return console.error("[Aeris] Cannot add a data source with an undefined key to the map. Make sure you have set the `key` property on your data source before adding to the map."), this;
                        t.strategy = this.strategy,
                        t.enabled = !0,
                        t.identifier = t.key,
                        this.store.add(t.identifier, t),
                        this.strategy.addSource(t);
                        const s = (0, f.get)(e, "style");
                        s && this._updateSourceStyle(t, s),
                        (0, f.has)(t, "animation") && (0, f.isset)(t.animation) && !0 === t.animation.isEnabled() && this.timeline.add(t.key, t.animation);
                        const i = this.getBounds();
                        return t instanceof l.VectorSource && (t.on("data:load:start", t => this.trigger("source:load:start", t.data)), t.on("data:load:done", t => this.trigger("source:load:done", t.data)), t.load({
                                bounds: i,
                                from: this.timeline.startDate(),
                                to: this.timeline.endDate()
                            }).catch(e => {
                                console.error("[Aeris] Failed to load data for VectorSource with key " + t.key, e)
                            })),
                        this.trigger("source:add", {
                            source: t,
                            id: t.key
                        }),
                        this
                    }
                    addModule(t, e = null, s = null) {
                        const i = t => {
                            t.initialize(this.account, null, this);
                            const s = t.source(),
                            i = this.createSource(t.id, s.type, (0, f.extend)({}, s, e));
                            i && this.addSource(i)
                        },
                        a = t => {
                            this.isReady ? i(t) : this.on("ready", () => {
                                i(t)
                            })
                        };
                        (0, f.isFunction)(t) ? t().then(t => {
                            const e = new(t = t.default || t)(s);
                            a(e)
                        }) : (0, f.has)(t, "source") && a(t)
                    }
                    removeSource(t) {
                        t.enabled = !1,
                        this.strategy.removeSource(t),
                        (0, f.has)(t, "animation") && (0, f.isset)(t.animation) && !0 === t.animation.isEnabled() && (t.animation.reset(), this.timeline.remove(t.animation)),
                        (0, f.has)(t, "reset") && t.reset(),
                        this.store.remove(t.identifier),
                        this.store.each((e, s) => {
                            s === t && this.store.remove(e)
                        });
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
                        return this.store.each((t, e) => {
                            this.removeSource(e)
                        }),
                        this
                    }
                    getSource(t) {
                        let e = this.store.get(t);
                        return e || (t = (0, g.getSourceId)(t), e = this.store.get(t)),
                        e
                    }
                    hasSource(t) {
                        return t = (0, g.getSourceId)(t),
                        this.store.has(t)
                    }
                    showCallout(t, e, s) {
                        this.strategy.showCallout(t, e, s)
                    }
                    enableAutoUpdate(t) {
                        !this._refreshInterval && t > 0 && (t = Math.max(t, 10), this._refreshInterval && window.clearInterval(this._refreshInterval), this._refreshInterval = setInterval(() => {
                                this._updateTimeline()
                            }, 1e3 * t))
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
                        e && (clearTimeout(this._restartAnimationTimeout), this._restartAnimationTimeout = setTimeout(() => {
                                t.play()
                            }, 300))
                    }
                    _updateSourceStyle(t, e = {}) {
                        if (t && t instanceof l.TileSource) {
                            const {
                                zIndex: s,
                                opacity: i
                            } = e;
                            (0, f.isset)(i) && t.setOpacity(i),
                            (0, f.isset)(s) && t.setOrder(s)
                        }
                    }
                    _loadForBounds(t = !1, e = !1) {
                        const s = this.getBounds();
                        this.store.each((i, a) => {
                            if (a instanceof l.VectorSource) {
                                const i = a;
                                (i.requiresBounds || !1 === i.hasData() || t) && i.load({
                                    bounds: s,
                                    from: this.timeline.startDate(),
                                    to: this.timeline.endDate()
                                }, e).catch(t => {
                                    console.error("[Aeris] Failed to load data for VectorSource with key " + a.key, t)
                                })
                            }
                        })
                    }
                    _updateSourcesForDate(t) {
                        (0, f.isDate)(t) || (t = new Date(t)),
                        this.store.each((e, s) => {
                            s instanceof l.TileSource && (s.timestamp = t)
                        })
                    }
                    _beforeBoundsChange() {
                        this.timeline.isAnimating() && !1 === this.timeline.isPaused() ? (this._resumeOnBoundsChange = !0, this.timeline.pause()) : this._resumeOnBoundsChange = !1
                    }
                    _afterBoundsChange() {
                        const t = (0, f.get)(this._opts, "timeline.resetOnBoundsChange");
                        let e = this._opts.reloadOnBoundsChange;
                        if (this._resumeAnimationTimer && (clearTimeout(this._resumeAnimationTimer), this._resumeAnimationTimer = null), e && !(0, f.isEmpty)(this._stateForData)) {
                            const t = this._stateForData,
                            s = this.strategy.coordToPoint(t.center),
                            i = this.strategy.coordToPoint(this.getCenter());
                            if ((0, f.isset)(s) && (0, f.isset)(i)) {
                                e = Math.max(Math.abs(s.x - i.x), Math.abs(s.y - i.y)) >= 50
                            }
                            this.getZoom() !== t.zoom && (e = !0)
                        }
                        let s = !1;
                        if (this.store.each((t, e) => {
                                e instanceof l.VectorSource && (s = !0)
                            }), e && (!0 === t && this.timeline.reset(), s)) {
                            const t = this.timeline.isPaused() || this.timeline.isAnimating();
                            this._loadForBounds(!1, t),
                            this._stateForData = {
                                center: this.getCenter(),
                                bounds: this.getBounds(),
                                zoom: this.getZoom()
                            }
                        }
                        this._resumeOnBoundsChange && this.timeline.isPaused() && (this._resumeAnimationTimer = setTimeout(() => {
                                this.timeline.resume()
                            }, 500))
                    }
                    _setupEvents() {
                        this.strategy.on("click", t => {
                            null === this._dblClickTimer && (this._dblClickTimer = setTimeout(() => {
                                    t.data.coord = (0, n.normalize)(t.data.coord),
                                    this.trigger("click", t.data),
                                    this._dblClickTimer = null
                                }, 200))
                        }),
                        this.strategy.on("dblclick", t => {
                            clearTimeout(this._dblClickTimer),
                            this._dblClickTimer = null,
                            this.trigger("dblclick", t.data)
                        }),
                        this.strategy.on("resize", t => this.trigger("resize", t.data)),
                        this.strategy.on("mousedown", t => this.trigger("mousedown", t.data)),
                        this.strategy.on("mouseup", t => this.trigger("mouseup", t.data)),
                        this.strategy.on("mouseover", t => this.trigger("mouseover", t.data)),
                        this.strategy.on("mouseout", t => this.trigger("mouseout", t.data)),
                        this.strategy.on("mousemove", t => this.trigger("mousemove", t.data)),
                        this.strategy.on("before:change:bounds", () => {
                            this._beforeBoundsChange()
                        }),
                        this.strategy.on("change:bounds", t => {
                            this.trigger("change:bounds", {
                                bounds: this.getBounds()
                            }),
                            this._afterBoundsChange()
                        }),
                        this.strategy.on("change:center", t => this.trigger("change:center", {
                                center: this.getCenter()
                            })),
                        this.strategy.on("change:zoom", t => this.trigger("change:zoom", {
                                zoom: this.getZoom()
                            })),
                        this.strategy.on("move", t => this.trigger("move")),
                        this.strategy.on("move:start", t => {
                            this.trigger("move:start"),
                            this.trigger("before:change:bounds", {
                                bounds: this.getBounds()
                            })
                        }),
                        this.strategy.on("move:end", t => {
                            this.trigger("move:end"),
                            this.trigger("after:change:bounds", {
                                bounds: this.getBounds()
                            })
                        }),
                        this.strategy.on("zoom", t => this.trigger("zoom")),
                        this.strategy.on("zoom:start", t => {
                            this.trigger("zoom:start"),
                            this.trigger("before:change:bounds", {
                                bounds: this.getBounds()
                            })
                        }),
                        this.strategy.on("zoom:end", t => {
                            this.trigger("zoom:end"),
                            this.trigger("after:change:bounds", {
                                bounds: this.getBounds()
                            })
                        }),
                        this.strategy.on("idle", t => this.trigger("idle")),
                        this.strategy.on("marker:click", t => this.trigger("marker:click", t.data)),
                        this.strategy.on("marker:mouseover", t => this.trigger("marker:mouseover", t.data)),
                        this.strategy.on("marker:mouseout", t => this.trigger("marker:mouseout", t.data)),
                        this.strategy.on("marker:drag", t => this.trigger("marker:drag", t.data)),
                        this.strategy.on("marker:dragstart", t => this.trigger("marker:dragstart", t.data)),
                        this.strategy.on("marker:dragend", t => this.trigger("marker:dragend", t.data)),
                        this.strategy.on("shape:click", t => this.trigger("shape:click", t.data)),
                        this.strategy.on("shape:mouseover", t => this.trigger("shape:mouseover", t.data)),
                        this.strategy.on("shape:mouseout", t => this.trigger("shape:mouseout", t.data)),
                        this.timeline.on("play load:start", () => {
                            this.trigger("timeline:play", {
                                timeline: this.timeline
                            })
                        }),
                        this.timeline.on("stop", t => {
                            clearTimeout(this._restartAnimationTimeout),
                            this.trigger("timeline:stop", {
                                timeline: this.timeline
                            })
                        }),
                        this.timeline.on("advance", t => {
                            this.timeline.isAnimating() || this._updateSourcesForDate(t.data.time),
                            this.trigger("timeline:change", (0, f.extend)({
                                    timeline: this.timeline
                                }, t.data))
                        }),
                        this.timeline.on("start:change end:change", () => {
                            this.timeline.reset(),
                            this.update()
                        }),
                        this.timeline.on("load:start", () => {
                            this._indicator.startAnimating()
                        }),
                        this.timeline.on("load:done", () => {
                            this._indicator.stopAnimating()
                        })
                    }
                    _checkReady() {
                        if (!this._ready) {
                            throw new Error("[Aeris] Must wait for an instance of InteractiveMap to be fully\n\t\t\t\tinitialized before calling methods on it. Observe the `load` or `ready` events\n\t\t\t\tthat are triggered when an InteractiveMap instance is fully initialized.".replace(/\n\s+/g, " "))
                        }
                    }
                    requestForMap(t) {
                        const e = new c.default({
                            server: (0, f.get)(this._opts, "servers.maps"),
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
                var b = v;
                e.default = b,
                t.exports = e.default
            },
            sifU: function (t, e, s) {
                "use strict";
                Object.defineProperty(e, "__esModule", {
                    value: !0
                }),
                e.default = void 0;
                var i = function (t) {
                    if (t && t.__esModule)
                        return t;
                    if (null === t || "object" != typeof t && "function" != typeof t)
                        return {
                        default:
                            t
                        };
                    var e = o();
                    if (e && e.has(t))
                        return e.get(t);
                    var s = {},
                    i = Object.defineProperty && Object.getOwnPropertyDescriptor;
                    for (var a in t)
                        if (Object.prototype.hasOwnProperty.call(t, a)) {
                            var r = i ? Object.getOwnPropertyDescriptor(t, a) : null;
                            r && (r.get || r.set) ? Object.defineProperty(s, a, r) : s[a] = t[a]
                        }
                    s.default = t,
                    e && e.set(t, s);
                    return s
                }
                (s("LA41")),
                a = s("GK1F"),
                r = s("jNhv"),
                n = s("p+P+");
                function o() {
                    if ("function" != typeof WeakMap)
                        return null;
                    var t = new WeakMap;
                    return o = function () {
                        return t
                    },
                    t
                }
                var l = class {
                    tileLayer(t, e, s) {
                        return new i.TileSource(t, e, s)
                    }
                    marker(t, e, s) {
                        return s && s.skip && !0 === s.skip ? null : new i.Marker(e, null, {
                            style: s
                        })
                    }
                    markerIcon(t) {
                        if (t.html && console.warn("awxjs - HTML markers are not currently supported with OpenLayers"), t.svg) {
                            let [e, s] = t.size || [12, 12];
                            if (t.svg.text) {
                                const i = t.svg.text;
                                if ((0, r.isArray)(i))
                                    i.forEach(t => {
                                        t.autosize && ([e, s] = a.SVG.calculateTextSize(t.value, t.size))
                                    });
                                else {
                                    const t = i;
                                    t.autosize && ([e, s] = a.SVG.calculateTextSize(t.value, t.size))
                                }
                            }
                            s += 3;
                            const i = a.SVG.draw(e, s, t.svg);
                            return new ol.style.Icon({
                                src: "data:image/svg+xml;base64," + btoa(i),
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
                        let a;
                        if (s) {
                            if (a = {
                                    stroke: null,
                                    fill: null
                                }, a.id = s.id, s.stroke) {
                                const {
                                    r: t,
                                    g: e,
                                    b: i
                                } = (0, n.toRGB)(s.stroke.color);
                                a.stroke = {
                                    color: `rgba(${t}, ${e}, ${i}, ${s.stroke.opacity || 1})`,
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
                                    b: i
                                } = (0, n.toRGB)(s.fill.color);
                                a.fill = {
                                    color: `rgba(${t}, ${e}, ${i}, ${(0, r.isset)(s.fill.opacity) ? s.fill.opacity : 1})`
                                }
                            }
                        }
                        return e.forEach(t => {
                            a.id || (a.id = t.id)
                        }),
                        new i.Polygon(t, e, a)
                    }
                    polyline(t, e, s) {
                        let a;
                        if (s && (a = {
                                    stroke: null,
                                    fill: null
                                }, a.id = s.id, s.stroke)) {
                            const {
                                r: t,
                                g: e,
                                b: i
                            } = (0, n.toRGB)(s.stroke.color);
                            a.stroke = {
                                color: `rgba(${t}, ${e}, ${i}, ${s.stroke.opacity || 1})`,
                                width: s.stroke.width,
                                lineCap: s.stroke.lineCap,
                                lineJoin: s.stroke.lineJoin,
                                lineDash: s.stroke.dashArray,
                                lineDashOffset: s.stroke.dashOffset
                            }
                        }
                        return new i.Polyline(t, e, a)
                    }
                };
                e.default = l,
                t.exports = e.default
            },
            tPWv: function (t, e, s) {
                "use strict";
                Object.defineProperty(e, "__esModule", {
                    value: !0
                }),
                e.scrollBarWidth = e.windowSize = void 0;
                e.windowSize = () => {
                    if (!document || !window)
                        return null;
                    return {
                        width: Math.max(document.documentElement.clientWidth, window.innerWidth || 0),
                        height: Math.max(document.documentElement.clientHeight, window.innerHeight || 0)
                    }
                };
                e.scrollBarWidth = () => {
                    const t = document.createElement("div");
                    t.style.height = "100px",
                    t.style.overflow = "scroll",
                    t.style.position = "absolute",
                    t.style.top = "-9999px",
                    t.style.width = "100px",
                    document.body.appendChild(t);
                    const e = t.offsetWidth - t.clientWidth;
                    return document.body.removeChild(t),
                    e
                }
            },
            "u/IE": function (t, e, s) {
                "use strict";
                Object.defineProperty(e, "__esModule", {
                    value: !0
                }),
                Object.defineProperty(e, "LeafletMapStrategy", {
                    enumerable: !0,
                    get: function () {
                        return i.default
                    }
                }),
                Object.defineProperty(e, "MapboxMapStrategy", {
                    enumerable: !0,
                    get: function () {
                        return a.default
                    }
                }),
                Object.defineProperty(e, "OpenLayersMapStrategy", {
                    enumerable: !0,
                    get: function () {
                        return r.default
                    }
                }),
                Object.defineProperty(e, "GoogleMapStrategy", {
                    enumerable: !0,
                    get: function () {
                        return n.default
                    }
                });
                var i = o(s("HAIv")),
                a = o(s("JD76")),
                r = o(s("kghW")),
                n = o(s("osTS"));
                function o(t) {
                    return t && t.__esModule ? t : {
                    default:
                        t
                    }
                }
            },
            u1da: function (t, e, s) {
                "use strict";
                Object.defineProperty(e, "__esModule", {
                    value: !0
                }),
                e.default = void 0;
                var i = g(s("AIg7")),
                a = g(s("S/2/")),
                r = g(s("h1m7")),
                n = g(s("2HOs")),
                o = g(s("Xl8N")),
                l = g(s("LewK")),
                h = g(s("S5Ho")),
                d = g(s("g8Bo")),
                u = s("jNhv"),
                c = s("+mSH"),
                p = s("s8Ky"),
                f = g(s("b9Bd"));
                function g(t) {
                    return t && t.__esModule ? t : {
                    default:
                        t
                    }
                }
                const m = {
                    combined: ["layers"],
                    split: ["base", "past", "future", "overlays", "past-text", "future-text"]
                };
                class _ {
                    constructor(t) {
                        this._opts = (0, u.extend)({
                            format: "MM/dd/yyyy hh:mm a",
                            continuous: !0
                        }, t),
                        this.element = (0, f.default)('<div class="awxjs__map-overlay__timestamp"></div>')
                    }
                    continuous() {
                        return !0 === this._opts.continuous
                    }
                    update(t) {
                        const e = new Date(t);
                        this.element.html((0, u.formatDate)(e, this._opts.format))
                    }
                }
                class y extends i.default {
                    constructor(t, e) {
                        if (super(), this._ready = !1, this.handleLayerChange = t => {
                                if (this.timeline) {
                                    const t = this.config.hasText(),
                                    e = this.timeline.get("pastText"),
                                    s = this.timeline.get("futureText");
                                    e && e.enabled(t),
                                    s && s.enabled(t)
                                }
                                this.trigger("change:data", {
                                    layers: this.config.data()
                                })
                            }, this.handleOffsetChange = t => {
                                let {
                                    data: {
                                        offset: e
                                    }
                                } = t;
                                if ((0, u.isset)(e) && (e = "" + e, /^-/.test(e) || "0" === e || "current" == e ? (0, u.get)(this.opts, "animation.alwaysShowFuture") || ["future", "futureText"].forEach(t => this._targets[t].hide()) : (0, u.get)(this.opts, "animation.alwaysShowPast") || ["past", "pastText"].forEach(t => this._targets[t].hide()), this._timestamp)) {
                                    const t = (0, u.offsetToTime)(this.config.offset());
                                    this._timestamp.update(t)
                                }
                            }, this._loadingGroups = [], this.update = (0, u.debounce)(t => {
                                if (!this._ready)
                                    return;
                                const e = (this.config.data() || []).length > 0;
                                this._animator.past.enabled(e),
                                this._animator.pastText.enabled(e),
                                this._animator.future.enabled(e),
                                this._animator.futureText.enabled(e);
                                let s = t || this._loadingGroups;
                                if (s = this._adjustTypesForUpdate(s), 0 === s.length)
                                    return;
                                if (this.timeline && this.timeline.reset(), this._timestamp && (!this.timeline || !this.timeline.isEnabled())) {
                                    const t = (0, u.offsetToTime)(this.config.offset());
                                    this._timestamp.update(t)
                                }
                                this.trigger("load:start");
                                const i = () => {
                                    Object.keys(r).forEach(t => {
                                        this.setImage(t, r[t])
                                    }),
                                    this.trigger("load:done")
                                },
                                a = function () {
                                    0 === n.length && i()
                                },
                                r = {},
                                n = s.slice(0);
                                s.forEach(t => {
                                    const e = "future" == t;
                                    let s = t;
                                    "past" === t || "future" === t ? s = "data" : "pastText" !== t && "futureText" !== t || (s = "text");
                                    if ((0, u.isset)(this.config.opts("layers." + s))) {
                                        if (this.timeline && ("data" === s || "text" === s)) {
                                            const e = this.timeline.get(t);
                                            return void(e && (e.canShow() ? e.once("load:image load:error", e => {
                                                        n.splice(n.indexOf(t), 1),
                                                        a()
                                                    }) : (n.splice(n.indexOf(t), 1), a()), e.goToTime(this.timeline.currentTime)))
                                        }
                                        const i = this._request.clone();
                                        i.setParams(this.config.toRequestOpts([s], e)),
                                        i.get().then(e => {
                                            n.splice(n.indexOf(t), 1),
                                            e.image && (r[t] = e.image.src),
                                            a()
                                        }).catch(t => {
                                            console.error("ERROR", t)
                                        })
                                    } else
                                        n.forEach((t, e) => {
                                            "past" !== t && "future" !== t && "pastText" !== t && "futureText" !== t || n.splice(e, 1)
                                        }), this.setImage(t, null)
                                })
                            }, 500), !t)
                            throw new Error("[Aeris] Invalid DOM target specified for MapView");
                        ["base", "data", "overlays"].forEach(t => {
                            const s = "map.layers." + t,
                            i = (0, u.get)(e, s);
                            (0, u.isString)(i) && (0, u.set)(e, s, i.replace(/\s/, "").split(","))
                        }),
                        this._opts = (0, u.extend)({
                            account: null,
                            map: {
                                layers: {
                                    base: ["flat"],
                                    overlays: ["admin"]
                                },
                                center: {
                                    lat: 40,
                                    lon: -93
                                },
                                size: {
                                    width: 600,
                                    height: 400
                                },
                                autoFuture: !0,
                                combine: !1
                            },
                            animation: {
                                enabled: !0,
                                from: -7200,
                                to: 0,
                                autoplay: !1,
                                alwaysShowPast: !1,
                                alwaysShowFuture: !1
                            },
                            overlays: {
                                title: void 0,
                                timestamp: "MM/dd/yyyy hh:mm a",
                                branding: {
                                    html: void 0,
                                    img: void 0
                                }
                            },
                            legend: {
                                enabled: !0
                            },
                            controls: {
                                layers: void 0,
                                regions: void 0
                            }
                        }, e),
                        this._target = (0, f.default)(t),
                        this._config = new a.default(this._opts.map),
                        this._config.on("change", () => this.trigger("change")),
                        this.account && (this._request = new r.default({
                                server: (0, u.get)(this._opts, "servers.maps"),
                                client: this.account.credentials()
                            })),
                        this._layers = new h.default(this.account),
                        this._layers.fetch().then(t => {
                            this.config.layers = this._layers,
                            this.render()
                        })
                    }
                    get $el() {
                        return this._target
                    }
                    get $map() {
                        return this._map
                    }
                    get $container() {
                        return (0, f.default)(`.${p.Globals.cssPrefix}map-container`, this.$el)
                    }
                    get account() {
                        return this.opts.account
                    }
                    get opts() {
                        return this._opts
                    }
                    get config() {
                        return this._config
                    }
                    get timeline() {
                        return this._animator ? this._animator.timeline : null
                    }
                    get legend() {
                        return this._legend
                    }
                    el(t) {
                        return (0, f.default)(t, this.$el)
                    }
                    setLayers(t, e) {
                        this.config.setLayers(t),
                        e && this.setLegend(e)
                    }
                    setLegend(t) {
                        if (this._legendUrl = null, t)
                            if ((0, u.isString)(t)) {
                                const e = t;
                                e.match(/^(https?:)?\/\//) ? (this._legendUrl = e, this.legend.setUrl(e)) : this.legend.set(e.replace(/\s/g, "").split(","))
                            } else (0, u.isArray)(t) && this.legend.set(t)
                    }
                    setMetric(t) {
                        this.config.setMetric(t)
                    }
                    render() {
                        this.$el.empty(),
                        this.$el.html('\n\t\t\t<div class="awxjs__mapview">\n\t\t\t\t<ul class="awxjs__map-nav"></ul>\n\t\t\t\t<div class="awxjs__map-container">\n\t\t\t\t\t<div class="awxjs__map">\n\t\t\t\t\t\t<ul class="awxjs__map-region-nav horizontal"></ul>\n\t\t\t\t\t\t<ul class="awxjs__map-anim-controls">\n\t\t\t\t\t\t\t<li data-anim-action="toggle"><button>Play</button></li>\n\t\t\t\t\t\t</ul>\n\t\t\t\t\t</div>\n\t\t\t\t\t<div class="awxjs__map-legend"></div>\n\t\t\t\t</div>\n\t\t\t</div>\n\t\t');
                        const t = this.opts,
                        e = (0, f.default)(`.${p.Globals.cssPrefix}map-container > .${p.Globals.cssPrefix}map`, this.$el);
                        this._map = e;
                        let s = e.width() || 320,
                        i = e.height() || 300;
                        t.map.size && (s = t.map.size.width || s, i = t.map.size.height || i, "auto" === s && (s = e.width(), t.map.size.width = s, t.map.size.autoscale && (0, f.default)(window).on("resize", s => {
                                    const i = e.width();
                                    t.map.size.width = i
                                })));
                        const {
                            width: a,
                            height: r
                        } = this.config.size();
                        a && r && (e.width(a).height(r), this.$container.width(a)),
                        t.map.region && !t.map.bounds && this.config.setRegion(t.map.region);
                        const n = this.opts.overlays,
                        o = this.opts.controls,
                        l = this.opts.animation,
                        h = this.opts.legend;
                        this.setupContainers(e),
                        n && this.setupOverlays(n),
                        o && this.setupControls(o),
                        l && this.setupAnimation(l),
                        h && this.setupLegend(h),
                        this.setupEvents(),
                        this.trigger("ready"),
                        this._ready = !0,
                        this.updateGroups()
                    }
                    setupEvents() {
                        if (this.config.on("change:data change:offset", t => {
                                this.updateGroups(["past", "future"])
                            }), this.config.on("change:units", t => {
                                this.updateGroups(["pastText", "futureText"])
                            }), this.config.on("change:data", this.handleLayerChange), this.config.on("change:bounds change:size", t => {
                                this.updateGroups()
                            }), this.config.on("change:size", t => {
                                const {
                                    width: e,
                                    height: s
                                } = t.data;
                                e && s && (this.$map.width(e).height(s), this.$container.width(e))
                            }), this.timeline || (this.config.on("change:offset", this.handleOffsetChange), this.config.setOffset(this.config.offset())), this._timestamp && this.timeline) {
                            const t = this._timestamp;
                            !1 === t.continuous() ? this.timeline.on("advance:image", e => {
                                t.update(e.data.time)
                            }) : this.timeline.on("advance", e => {
                                t.update(e.data.time)
                            }),
                            this.timeline instanceof l.default && Object.keys(this.timeline.animations).forEach(e => {
                                const s = this.timeline.get(e);
                                let i;
                                s.isEnabled() && ("past" === e || "future" === e) && (i = s),
                                i && i.on("load:progress", e => {
                                    i.canShow() && t.update(e.data.time)
                                })
                            })
                        }
                    }
                    setupContainers(t) {
                        const e = p.Globals.cssPrefix + "map__layers";
                        t.append(`<div class="${e}"></div>`);
                        const s = this.el("." + e);
                        this._indicator = new d.default,
                        this._indicator.appendTo(s[0]),
                        this.on("load:start", () => {
                            this._indicator.startAnimating()
                        }),
                        this.on("load:done", () => {
                            this._indicator.stopAnimating()
                        });
                        const i = this.opts.map.combine ? m.combined : m.split,
                        a = {};
                        i.forEach((t, e) => {
                            const i = `${p.Globals.cssPrefix}map-layer-${t}`;
                            s.append(`<div class="${i}"></div>`);
                            const r = (0, c.camelcase)(t),
                            n = (0, f.default)("." + i, s);
                            n.css({
                                position: "absolute",
                                top: 0,
                                left: 0,
                                bottom: 0,
                                right: 0,
                                "z-index": e
                            }),
                            a[r] = n
                        }),
                        this._targets = a
                    }
                    setupControls(t) {
                        if (t.layers) {
                            const e = this.el(`.${p.Globals.cssPrefix}map-nav`);
                            t.layers.forEach(t => {
                                e.append(`<li data-map-layer="${t.value}"><button>${t.title}</button></li>`)
                            });
                            const s = (0, f.default)("li", e);
                            s.on("click", t => {
                                t.preventDefault();
                                const e = "button" === t.target.tagName.toLowerCase() ? (0, f.default)(t.target).parent() : (0, f.default)(t.target),
                                i = e.allData("map-layer");
                                s.removeClass("selected"),
                                e.addClass("selected"),
                                i && this.config.setData(i.split(","))
                            }),
                            this.on("ready", t => {
                                const e = (0, u.get)(this.opts, "map.layers.data") || null;
                                e ? s.each((t, s) => {
                                    const i = (0, f.default)(t);
                                    (i.allData("map-layer") === e.join(",") || 0 === s) && i.click()
                                }) : s.get(0).click()
                            })
                        }
                        if (t.regions) {
                            const e = this,
                            s = this.el(`.${p.Globals.cssPrefix}map-region-nav`);
                            t.regions.forEach(t => {
                                const e = Object.keys(t).reduce((e, s) => {
                                    if ("title" !== s) {
                                        let i = t[s];
                                        (0, u.isObject)(i) && ("center" === s ? i = `${i.lat},${i.lon}` : "bounds" === s && (i = `${i.north},${i.west},${i.south},${i.east}`)),
                                        e.push(`data-map-${s}="${i}"`)
                                    }
                                    return e
                                }, []);
                                s.append(`<li ${e.join(" ")}><button>${t.title}</button></li>`)
                            });
                            const i = (0, f.default)("li", s);
                            i.on("click", t => {
                                t.preventDefault();
                                const s = "button" === t.target.tagName.toLowerCase() ? (0, f.default)(t.target).parent() : (0, f.default)(t.target),
                                a = s.allData("map-zoom"),
                                r = s.allData("map-center") || (0, u.get)(this.opts, "map.center"),
                                n = s.allData("map-region"),
                                o = s.allData("map-bounds");
                                if (i.removeClass("selected"), s.addClass("selected"), n)
                                    e.config.setRegion(n);
                                else if (o) {
                                    const t = o.split(",");
                                    4 === t.length && e.config.setBounds({
                                        north: t[0],
                                        west: t[1],
                                        south: t[2],
                                        east: t[3]
                                    })
                                } else
                                    r && !(0, u.isEmpty)(r) ? (0, u.isset)(a) && a > 0 ? e.config.setCenter(r, a) : e.config.setCenter(r, this.config.zoom()) : a > 0 && e.config.setZoom(a)
                            }),
                            this.on("ready", t => {
                                const e = (0, u.get)(this.opts, "map.zoom") || null;
                                (0, u.isset)(e) ? i.each((t, s) => {
                                    const i = (0, f.default)(t);
                                    (i.allData("map-zoom") === "" + e || 0 === s) && i.click()
                                }) : i.get(0).click()
                            })
                        }
                    }
                    setupOverlays(t) {
                        const e = p.Globals.cssPrefix + "map__overlays";
                        this.$map.append(`<div class="${e}"></div>`);
                        const s = this.el("." + e);
                        if (t.timestamp) {
                            let e = t.timestamp;
                            (0, u.isString)(e) && (e = {
                                    format: e
                                });
                            const i = new _(e);
                            i.element.css({
                                "z-index": 10
                            }),
                            s.append(i.element),
                            this._timestamp = i
                        }
                        if (t.title) {
                            const e = p.Globals.cssPrefix + "map-overlay__title";
                            s.append(`<div class="${e}">${t.title}</div>`),
                            (0, f.default)("." + e, s).css({
                                "z-index": 11
                            })
                        }
                        if (t.branding) {
                            const {
                                img: e,
                                html: i
                            } = t.branding,
                            a = p.Globals.cssPrefix + "map-overlay__branding";
                            s.append(`<div class="${a}"></div>`);
                            const r = (0, f.default)("." + a, s);
                            r.css({
                                "z-index": 12
                            }),
                            (0, u.isset)(e) ? r.html(`<img src="${e}" />`) : (0, u.isset)(i) && r.html(i)
                        }
                    }
                    setupAnimation(t) {
                        const e = this.el(".awxjs__map-anim-controls > li");
                        if (!t.enabled)
                            return this.config.setOffset((0, u.get)(this.opts, "map.offset") || 0), void e.remove();
                        const s = new n.default({
                            past: this._targets.past,
                            future: this._targets.future,
                            pastText: this._targets.pastText,
                            futureText: this._targets.futureText
                        }, t);
                        s.provider = this,
                        this._animator = s;
                        const i = s.timeline;
                        i.on("load:start", () => {
                            this._indicator.startAnimating()
                        }),
                        i.on("load:done load:error", () => {
                            this._indicator.stopAnimating()
                        }),
                        this.config.opts("autoFuture", i.containsFuture()),
                        i.on("end:change", t => {
                            this.config.opts("autoFuture", i.containsFuture())
                        }),
                        i.on("start:change end:change", t => {
                            i.canAnimate() ? e.show() : e.hide()
                        }),
                        i.canAnimate() || e.hide(),
                        this.on("ready", () => {
                            this.config.on("change:data change:size change:zoom change:offset change:center change:bounds", t => {}),
                            this.config.on("change:units", t => {
                                i.stop();
                                const e = i.get("pastText");
                                e && e.reset();
                                const s = i.get("futureText");
                                s && s.reset()
                            }),
                            i.goToInit(),
                            i.isAutoPlay() && this.once("load:done", () => {
                                setTimeout(() => {
                                    i.play()
                                }, 500)
                            })
                        }),
                        e.each(t => {
                            const e = (0, f.default)(t);
                            if ("toggle" === e.allData("anim-action")) {
                                const t = (0, f.default)("button", e);
                                i.on("play load:start", () => {
                                    t.html("Stop")
                                }),
                                i.on("stop", () => {
                                    t.html("Play")
                                })
                            }
                        }).on("click", t => {
                            t.preventDefault();
                            const e = ("button" === t.target.tagName.toLowerCase() ? (0, f.default)(t.target).parent() : (0, f.default)(t.target)).allData("anim-action");
                            "toggle" === e ? i.toggle() : "play" === e ? i.play() : "pause" === e ? i.pause() : "stop" === e && i.stop()
                        })
                    }
                    setupLegend(t) {
                        const e = this.el(".awxjs__map-legend");
                        if (!t.enabled)
                            return void e.remove();
                        const s = new o.default(e, (0, u.extend)({
                                    size: {
                                        width: this.$map.width()
                                    }
                                }, t));
                        this._legend = s;
                        const i = (0, u.debounce)(() => {
                            if (this._legendUrl)
                                return;
                            const t = this.config.data(),
                            e = {
                                account: this.account
                            };
                            t && -1 !== t.indexOf("alerts") && (e.within = {
                                    bounds: this.config.bounds(),
                                    center: this.config.center(),
                                    zoom: this.config.zoom(),
                                    size: this.config.size()
                                }),
                            s.set(t, e)
                        }, 50);
                        this.config.on("change:data change:bounds", t => {
                            i()
                        }),
                        this.config.on("change:size", t => {
                            s.setWidth(t.data.width)
                        }),
                        this.config.on("change:metric", t => {
                            s.setMetric(t.data.metric)
                        }),
                        i()
                    }
                    setImage(t, e) {
                        const s = (0, f.default)(`.${p.Globals.cssPrefix}map-layer-${t}`, this.$el);
                        s && (s.empty(), e && s.append(`<img src="${e}" width="${this.config.size().width}" height="${this.config.size().height}">`))
                    }
                    updateGroups(t) {
                        (t = t || ["base", "past", "future", "overlays"]).forEach(t => {
                            -1 === this._loadingGroups.indexOf(t) && this._loadingGroups.push(t)
                        }),
                        this.update()
                    }
                    _adjustTypesForUpdate(t) {
                        const e = t.splice(0),
                        s = (new Date).getTime();
                        if (this.timeline && this.timeline.isEnabled()) {
                            const t = e.indexOf("past");
                            t > -1 && this.timeline.startDate().getTime() > s && e.splice(t, 1);
                            const i = e.indexOf("future");
                            i > -1 && this.timeline.endDate().getTime() <= s && !1 === this._animator.timeline.get("future").canShow() && e.splice(i, 1)
                        }
                        return this.config.hasText() && (e.indexOf("past") > -1 && e.push("pastText"), e.indexOf("future") > -1 && e.push("futureText")),
                        e
                    }
                    animationUrlForDate(t, e) {
                        const s = this._request.clone(),
                        i = /text$/i.test(t.key) ? "text" : "data",
                        a = this.config.toRequestOpts([i], t.isFuture());
                        return "data" === i && (0, u.isset)(a.layers.data) || "text" === i && (0, u.isset)(a.layers.text) ? (s.setParams(a), s.date(e), s.url()) : null
                    }
                    animationSizeForImage(t) {
                        return this.config.size()
                    }
                }
                var v = y;
                e.default = v,
                t.exports = e.default
            },
            uACZ: function (t, e, s) {
                "use strict";
                Object.defineProperty(e, "__esModule", {
                    value: !0
                }),
                e.default = void 0;
                var i = o(s("IRno")),
                a = o(s("EeSF")),
                r = s("jNhv"),
                n = s("+mSH");
                function o(t) {
                    return t && t.__esModule ? t : {
                    default:
                        t
                    }
                }
                class l extends i.default {
                    constructor(t) {
                        (t = (0, r.extend)({
                                field: {
                                    placeholder: "Search for place...",
                                    data: {
                                        request: t => new Promise((e, s) => {
                                            this._prepareServiceForQuery(t),
                                            this._service.get().then(t => {
                                                let s = t.data || {};
                                                if (s.responses) {
                                                    let t = [];
                                                    s.responses.forEach(e => {
                                                        e.response && (t = t.concat(e.response))
                                                    }),
                                                    s = t
                                                }
                                                e(s)
                                            }).catch(t => {
                                                s(t)
                                            })
                                        }),
                                        formatter: t => {
                                            if (!t)
                                                return null;
                                            if (!t.place)
                                                return null;
                                            const e = [(0, n.ucwords)(t.place.name)];
                                            "US" === t.place.country ? e.push(t.place.state.toUpperCase()) : e.push((0, n.ucwords)(t.place.countryFull));
                                            let s = e.join(", ");
                                            return t.type && "airport" === t.type && (s += " (Airport)"),
                                            s
                                        }
                                    }
                                },
                                icon: '\n\t\t\t\t<svg version="1.1" viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">\n\t\t\t\t\t<path d="m69.777 61.273 26.562 26.562c4.25 4.3672-4.1328 12.75-8.5 8.5l-26.562-26.562c-14.641 10.508-35.066 8.9727-47.934-3.8945-14.523-14.523-14.523-38.016\n\t\t\t\t\t\t0-52.539 14.523-14.523 38.016-14.523 52.539 0 12.867 12.867 14.402 33.293 3.8945 47.934zm-48.051-39.551c-9.8008 9.918-9.8008 25.855 0 35.656 9.918 9.918\n\t\t\t\t\t\t25.855 9.918 35.656 0 9.918-9.8008 9.918-25.738 0-35.656-9.8008-9.8008-25.738-9.8008-35.656 0z" fill-rule="evenodd"/>\n\t\t\t\t</svg>\n\t\t\t'
                            }, t)).className = t && t.className ? "app__ui-panel-search " + t.className : "app__ui-panel-search",
                        super(t),
                        this._account = this.opts.account
                    }
                    get field() {
                        return this._field
                    }
                    _onAddedToDOM() {
                        super._onAddedToDOM(),
                        this._field || (this._field = new a.default(this.opts.field)),
                        this._field.addTo(this.ui.content)
                    }
                    _setupEvents() {
                        super._setupEvents(),
                        this._field.on("select", t => {
                            this.trigger("select", t.data)
                        }).on("change:value", t => {
                            this.trigger("change:value", t.data)
                        }).on("update:results", t => {
                            this.trigger("update:results", t.data)
                        })
                    }
                    _prepareServiceForQuery(t) {
                        this._service || (this._service = this._account.api());
                        const e = this._service;
                        if (e.removeAllRequests(), e.resetParams(), 0 !== (t = (t = (t = t.replace(/^\s+/, "").replace(/\s+$/, "")).replace(/,\s+/, ",")).replace(/,$/, "")).length)
                            if (/^(-?[\d\.]+),\s*(-?[\d\.]+)$/.test(t)) {
                                const s = this._account.api().endpoint("places").action("closest").place(t);
                                e.addRequest(s)
                            } else if (/^(\d\d\d\d\d(?:-\d\d\d\d)?|[ABCEGHJKLMNPRSTVXY]\d[A-Z] ?\d[A-Z]\d)$/i.test(t)) {
                                const s = this._account.api().endpoint("places").place(t);
                                e.addRequest(s)
                            } else {
                                if (/^\w{4}$/.test(t)) {
                                    const s = this._account.api().endpoint("places").place(t);
                                    e.addRequest(s)
                                }
                                const s = t.split(",");
                                if (s.length > 1) {
                                    if (t = `name:${s[0]};altname:${s[0]}`, 3 === s.length)
                                        t += `,state:${s[1]},country:${s[2]}`;
                                    else if (2 === s.length && s[1].length > 0) {
                                        const e = s[1],
                                        i = [];
                                        let a = !1;
                                        if (e.length > 1) {
                                            const t = (0, n.states)(),
                                            s = (0, n.countries)(),
                                            o = (0, r.extend)({}, t.us, t.ca),
                                            l = new RegExp("^" + e, "i");
                                            Object.keys(o).forEach(t => {
                                                l.test(o[t]) && (i.push(t), a = !0)
                                            }),
                                            a || Object.keys(s).forEach(t => {
                                                l.test(s[t]) && i.push(t)
                                            })
                                        }
                                        t += `,state:^${e};country:^${e}`,
                                        i.length > 0 && i.forEach(e => {
                                            t += a ? ";state:^" + e : ";country:^" + e
                                        })
                                    }
                                } else
                                    t = `name:^${s[0]};altname:^${s[0]}`;
                                const i = this._account.api().endpoint("places").action("search").query(t).limit(20).sort("pop:-1,haszip:-1");
                                e.addRequest(i)
                            }
                        else
                            this._field.setResults([])
                    }
                }
                var h = l;
                e.default = h,
                t.exports = e.default
            },
            wAJf: function (t, e, s) {
                "use strict";
                Object.defineProperty(e, "__esModule", {
                    value: !0
                }),
                e.default = void 0;
                var i = n(s("KzFB")),
                a = s("jNhv"),
                r = n(s("PuGD"));
                function n(t) {
                    return t && t.__esModule ? t : {
                    default:
                        t
                    }
                }
                class o extends i.default {
                    constructor(t, e) {
                        if (t = (0, a.extend)({}, t, {
                                className: t.className ? "app__ui-panel-info__view " + t.className : "app__ui-panel-info__view"
                            }), (0, a.isString)(t.renderer)) {
                            const e = o.getSection(t.renderer);
                            e && (t = (0, a.extend)({}, e, t, {
                                    renderer: e.renderer
                                }))
                        }
                        super(t, e)
                    }
                    get static() {
                        return this.opts.static
                    }
                    get request() {
                        return this.opts.request
                    }
                    addToContentView(t, e = -1) {
                        const s = this.opts.init;
                        this.addTo(t.$el, !1, e),
                        s && (0, a.isFunction)(s) && s(this, t)
                    }
                    static setSection(t, e) {
                        r.default[t] = e
                    }
                    static getSection(t) {
                        return r.default[t]
                    }
                    _render(t) {
                        let e = "",
                        s = this.opts.renderer;
                        if (this.opts.requiresData && (0, a.isEmpty)(t) && (s = null), s) {
                            const i = Object.keys(r.default).reduce((t, e) => (t[e] = r.default[e].renderer, t), {}),
                            n = this.opts.title ? `<div class="awxjs__app__ui-panel-info__view-title">${this.opts.title}</div>` : "";
                            if ((0, a.isFunction)(s)) {
                                e = `\n\t\t\t\t\t${n}\n\t\t\t\t\t${s(t || {}, i)}\n\t\t\t\t`
                            } else (0, a.isString)(s) && (e = `\n\t\t\t\t\t${n}\n\t\t\t\t\t${s}\n\t\t\t\t`)
                        }
                        return `\n\t\t\t<div class="awxjs__app__ui-panel-info__view">${e}</div>\n\t\t`
                    }
                }
                o.cached = r.default;
                var l = o;
                e.default = l,
                t.exports = e.default
            },
            wEP0: function (t, e, s) {
                "use strict";
                Object.defineProperty(e, "__esModule", {
                    value: !0
                }),
                e.default = void 0;
                var i = l(s("KuXL")),
                a = l(s("TTjL")),
                r = l(s("2EEu")),
                n = s("jNhv"),
                o = l(s("b9Bd"));
                function l(t) {
                    return t && t.__esModule ? t : {
                    default:
                        t
                    }
                }
                const h = (t, e, s, i, a) => {
                    const r = ((t, e, s, i, a) => {
                        const r = Object.keys(e).map(parseFloat);
                        if (null !== s) {
                            const e = Math.floor((a - i) / s),
                            n = Math.min((t - i) / s, e),
                            o = Math.round(n) * s + i;
                            r.push(o)
                        }
                        const n = r.map(e => Math.abs(t - e));
                        return r[n.indexOf(Math.min(...n))]
                    })(t, e, s, i, a),
                    o = Number.isFinite(r) ? r : 0;
                    return (0, n.isset)(s) ? parseFloat(o.toFixed((t => {
                                const e = t.toString();
                                let s = 0;
                                return e.indexOf(".") >= 0 && (s = e.length - e.indexOf(".") - 1),
                                s
                            })(s))) : o
                },
                d = t => {
                    if (t.touches) {
                        const e = t;
                        if (e.touches.length > 0)
                            return e.touches[0]
                    }
                    return t
                };
                class u extends i.default {
                    constructor(t) {
                        if (super((0, n.extend)({
                                    range: {
                                        min: 0,
                                        max: 100
                                    },
                                    count: 1,
                                    step: 10,
                                    marks: {},
                                    marksEvery: void 0,
                                    dots: !0,
                                    disabled: !1,
                                    tooltip: !0,
                                    ui: {
                                        inner: ".awxjs__ui-slider-range-inner",
                                        track: ".awxjs__ui-slider-range-track",
                                        rail: ".awxjs__ui-slider-range-rail",
                                        steps: ".awxjs__ui-slider-range-steps",
                                        marks: ".awxjs__ui-slider-range-marks",
                                        handles: ".awxjs__ui-slider-range-handle"
                                    }
                                }, t, {
                                    className: (0, n.get)(t, "className") ? "ui-slider-range " + t.className : "ui-slider-range"
                                })), this._handles = [], this._onBoundsChange = t => {
                                const {
                                    bounds: e
                                } = t,
                                s = e.map(t => this._offsetForValue(t));
                                (0, n.isset)(this._handles) && this._handles.length <= s.length && s.forEach((t, e) => {
                                    const i = this._handles[e];
                                    i && i.updatePosition(s[e])
                                }),
                                this._onChange(t)
                            }, this._onChange = t => {
                                if ((0, n.isEmpty)(this._handles))
                                    return;
                                const {
                                    bounds: e,
                                    handle: s
                                } = t,
                                i = e.map(t => this._offsetForValue(t)),
                                a = this._handles[s];
                                if (a && (a.updatePosition(i[s]), this._updateTooltip(e[s], s)), 1 === i.length)
                                    this.ui.track.css({
                                        left: "0%",
                                        width: i[0] + "%"
                                    });
                                    else {
                                        const t = i[i.length - 1] - i[0];
                                        this.ui.track.css({
                                            left: i[0] + "%",
                                            width: t + "%"
                                        })
                                    }
                                    this.setState({
                                        bounds: e
                                    });
                                    const r = this._getLowerBound(),
                                    l = this._getUpperBound();
                                    this.ui.steps.children().forEach(t => {
                                        const e = (0, o.default)(t),
                                        s = parseFloat(e.data("key"));
                                        s === l || s <= l && s >= r ? e.addClass("awxjs__ui-slider-range-dot-active") : e.removeClass("awxjs__ui-slider-range-dot-active")
                                    }),
                                    this.ui.marks.children().forEach(t => {
                                        const e = (0, o.default)(t),
                                        s = parseFloat(e.data("key"));
                                        s === l || s <= l && s >= r ? e.addClass("awxjs__ui-slider-range-mark-text-active") : e.removeClass("awxjs__ui-slider-range-mark-text-active")
                                    }),
                                    this.trigger("change", {
                                        value: Object.assign({}, t.bounds)
                                    })
                                }, this._onStart = t => {
                                    const e = this.value,
                                    s = this._valueAtPosition(t),
                                    i = this._getClosestBound(s),
                                    a = this._getBoundNeedMoving(s, i);
                                    this.trigger("change:start", {
                                        value: this.value
                                    }),
                                    this.setState({
                                        handle: a,
                                        recent: a
                                    });
                                    if (s === e[a])
                                        return;
                                    const r = [...this.state.bounds];
                                    r[a] = s,
                                    this._lastMovedHandle = a,
                                    this._onChange({
                                        bounds: r,
                                        handle: a
                                    })
                                }, this._onEnd = (t = !1) => {
                                const {
                                    handle: e
                                } = this.state;
                                this._removeDocumentEvents(),
                                (0, n.isset)(e),
                                this.setState({
                                    handle: null
                                }),
                                this.trigger("change:end", {
                                    value: this.value
                                })
                            }, this._onMove = (t, e) => {
                                const {
                                    bounds: s,
                                    handle: i
                                } = this.state,
                                a = this._valueAtPosition(e);
                                a !== s[i] && this._moveTo(a)
                            }, this._onKeyboard = t => {}, this._onMouseDown = t => {
                                    const e = t.target;
                                    if (-1 === this._handles.map(t => t.$el[0]).indexOf(e))
                                        return;
                                    t.preventDefault();
                                    let s = d(t).pageX;
                                    if (!1 === ((t, e) => {
                                            try {
                                                return (0, n.isArray)(e) ? e.some(e => t.target === e) : Object.keys(e).some(s => t.target === e[s])
                                            } catch (t) {
                                                return !1
                                            }
                                        })(t, this._handles.map(t => t.$el)))
                                        this._dragOffset = 0;
                                    else {
                                        const t = (t => {
                                            const e = (0, o.default)(t).bounds();
                                            return window.pageXOffset + e.left + .5 * e.width
                                        })(e);
                                        this._dragOffset = s - t,
                                        s = t
                                    }
                                    this._removeDocumentEvents(),
                                    this._onStart(s),
                                    this._addDocumentEvents();
                                    const {
                                        bounds: i,
                                        handle: a
                                    } = this.state;
                                    this._updateTooltip(i[a], a),
                                    this._tooltip.show(!1)
                                }, this._onMouseUp = t => {
                                    this._tooltip.hide(),
                                    this._onEnd()
                                }, this._onMouseMove = t => {
                                    if (!this.ui.rail)
                                        return void this._onEnd();
                                    const e = d(t).pageX;
                                    this._onMove(t, e - this._dragOffset)
                                }, (0, n.isArray)(this.opts.value)) {
                                const [t, e] = this.opts.value,
                                s = this.opts.step;
                                if (t % s != 0) {
                                    const i = `[Aeris] The 'value' property passed to the range configuration\n\t\t\t\t\t([${t}, ${e}]) does not contain from/to values equally divisible by the\n\t\t\t\t\tstep value (${s}, which may affect the rendered step range in the\n\t\t\t\t\tcontrol.`;
                                    console.warn(i.replace(/\s+/g, " "))
                                }
                            }
                        const e = (this.opts.value || Array(...Array(this.opts.count + 1)).map(() => this.opts.range.min)).map((t, e) => this._trimAlignValue(t, e));
                        this.setState({
                            bounds: e
                        }),
                        this._tooltip = new r.default,
                        this.update()
                    }
                    get value() {
                        const {
                            bounds: t
                        } = this.state;
                        return t
                    }
                    set value(t) {
                        const e = t.map((t, e) => this._trimAlignValue(t, e));
                        this.setState({
                            bounds: e
                        }),
                        this._onBoundsChange(this.state)
                    }
                    _render() {
                        const {
                            bounds: t
                        } = this.state;
                        if (!t)
                            return null;
                        const {
                            range: {
                                min: e,
                                max: s
                            },
                            marks: i,
                            marksEvery: r,
                            step: o
                        } = this.opts,
                        l = s - e,
                        h = this.opts.dots && o > 1,
                        d = Object.keys(i).map(parseFloat).filter(t => t >= e && t <= s).sort((t, e) => t - e);
                        if (h)
                            for (let t = e; t <= s; t += o)
                                 - 1 === d.indexOf(t) && d.push(t);
                        const u = i || {};
                        if ((0, n.isset)(r)) {
                            let t = 1,
                            i = !1;
                            if ((0, n.isString)(r)) {
                                const e = "" + r;
                                i = /^%\s*\d+$/.test(e),
                                t = parseInt(e.replace(/\D/, ""), 10)
                            } else
                                t = parseInt("" + r, 10);
                            let a = e,
                            l = 0;
                            for (; a <= s; ) {
                                if (i ? a % t == 0 : l % t == 0) {
                                    const t = "" + a;
                                    if (!(0, n.isset)(u[a])) {
                                        const e = this.opts.marksFormatter;
                                        u[t] = (0, n.isset)(e) && (0, n.isFunction)(e) ? e(a) : t
                                    }
                                }
                                a += o,
                                l += 1
                            }
                            (0, n.set)(this.opts, "marks", u)
                        }
                        const c = Object.keys(u).map(parseFloat).filter(t => t >= e && t <= s).sort((t, e) => t - e).map(t => {
                            const s = u[t];
                            if ((0, n.isEmpty)(s))
                                return null;
                            return `<div\n\t\t\t\t\tclass="awxjs__ui-slider-range-mark-text"\n\t\t\t\t\tstyle="left:${Math.abs(t - e) / l * 100 + "%"};transform:translateX(-50%);msTransform:translateX(-50%);"\n\t\t\t\t\tdata-key="${t}"\n\t\t\t\t>${s}</div>`
                        }),
                        p = d.map(t => `<div\n\t\t\t\tclass="awxjs__ui-slider-range-dot"\n\t\t\t\tstyle="left:${Math.abs(t - e) / l * 100 + "%"};"\n\t\t\t\tdata-key="${t}"\n\t\t\t></div>`);
                        return this._handles = t.map((t, i) => new a.default({
                                    values: {
                                        min: e,
                                        max: s,
                                        current: t
                                    }
                                })),
`\n\t\t\t<div class="awxjs__ui-slider-range">\n\t\t\t\t${this.opts.title ? `<div class="awxjs__ui-slider-range-title">${this.opts.title}</div>` : ""}\n\t\t\t\t<div class="awxjs__ui-slider-range-inner">\n\t\t\t\t\t<div class="awxjs__ui-slider-range-rail"></div>\n\t\t\t\t\t<div class="awxjs__ui-slider-range-track"></div>\n\t\t\t\t\t<div class="awxjs__ui-slider-range-steps">${p.join("")}</div>\n\t\t\t\t\t<div class="awxjs__ui-slider-range-marks">${c.join("")}</div>\n\t\t\t\t</div>\n\t\t\t</div>\n\t\t`
                    }
                    _afterRender() {
                        const {
                            bounds: t
                        } = this.state,
                        e = t.map(t => this._offsetForValue(t));
                        this.opts.ui && (this.setUI(this.opts.ui), this.ui.marks.children().length > 0 && this.$el.addClass("awxjs__ui-slider-range-with-marks"), this._setupEvents(), this.opts.width > 0 && this.ui.inner.width(this.opts.width), this._handles.forEach((t, s) => {
                                t.addTo(this.ui.inner),
                                t.updatePosition(e[s])
                            })),
                        this._onChange(this.state)
                    }
                    _setupEvents() {
                        super._setupEvents(),
                        this.$el.on("mousedown touchstart", this._onMouseDown)
                    }
                    _getClosestBound(t) {
                        const {
                            bounds: e
                        } = this.state;
                        let s = 0;
                        for (let i = 1; i < e.length - 1; i += 1)
                            t > e[i] && (s = i);
                        return Math.abs(e[s + 1] - t) < Math.abs(e[s] - t) && (s += 1),
                        s
                    }
                    _getBoundNeedMoving(t, e) {
                        const {
                            bounds: s,
                            recent: i
                        } = this.state;
                        let a = e;
                        const r = s[e + 1] === s[e];
                        return r && s[i] === s[e] && (a = i),
                        r && t !== s[e + 1] && (a = t < s[e + 1] ? e : e + 1),
                        a
                    }
                    _getLowerBound() {
                        const {
                            bounds: t
                        } = this.state, {
                            range: {
                                min: e,
                                max: s
                            }
                        } = this.opts;
                        return 1 === t.length ? e : t[0]
                    }
                    _getUpperBound() {
                        const {
                            bounds: t
                        } = this.state;
                        return t[t.length - 1]
                    }
                    _getPoints() {
                        const {
                            marks: t,
                            range: {
                                min: e,
                                max: s
                            },
                            step: i
                        } = this.opts,
                        a = this._points;
                        if (!a || a.marks !== t || a.step !== i) {
                            const a = Object.assign({}, t);
                            if ((0, n.isset)(i))
                                for (let t = e; t <= s; t += i)
                                    a[t] = t;
                            const r = Object.keys(a).map(parseFloat);
                            r.sort((t, e) => t - e),
                            this._points = {
                                marks: t,
                                step: i,
                                points: r
                            }
                        }
                        return this._points.points
                    }
                    _moveTo(t, e = !1) {
                        const {
                            handle: s,
                            recent: i,
                            bounds: a
                        } = this.state,
                        r = (0, n.isset)(s) ? s : i,
                        o = [...a];
                        o[r] = t;
                        const l = r;
                        this._onChange({
                            handle: l,
                            bounds: o
                        })
                    }
                    _trimAlignValue(t, e) {
                        const {
                            range: {
                                min: s,
                                max: i
                            }
                        } = this.opts,
                        a = ((t, e, s) => t <= e ? e : t >= s ? s : t)(t, s, i),
                        r = this._ensureValueNotConflict(a, e);
                        return h(r, this.opts.marks, this.opts.step, this.opts.range.min, this.opts.range.max)
                    }
                    _ensureValueNotConflict(t, e) {
                        const {
                            bounds: s,
                            handle: i
                        } = this.state;
                        if (e = (0, n.isset)(e) ? e : i, (0, n.isset)(e) && (0, n.isset)(s)) {
                            if (e > 0 && t <= s[e - 1])
                                return s[e - 1];
                            if (e < s.length - 1 && t >= s[e + 1])
                                return s[e + 1]
                        }
                        return t
                    }
                    _valueAtPosition(t) {
                        const e = t - (this.ui.rail.bounds().left + window.pageXOffset);
                        return this._trimAlignValue(this._valueAtOffset(e))
                    }
                    _valueAtOffset(t) {
                        const {
                            range: {
                                min: e,
                                max: s
                            }
                        } = this.opts,
                        i = this.ui.rail ? this.ui.rail.bounds().width : 0;
                        return Math.abs(Math.max(t, 0) / i) * (s - e) + e
                    }
                    _offsetForValue(t) {
                        const {
                            range: {
                                min: e,
                                max: s
                            }
                        } = this.opts;
                        return 100 * ((t - e) / (s - e))
                    }
                    _updateTooltip(t, e) {
                        if ((0, n.isEmpty)(this._handles))
                            return;
                        const s = this._handles[e];
                        let i = t.toString();
                        (0, n.isFunction)(this.opts.tooltip) && (i = this.opts.tooltip(t)),
                        this._tooltip.setContent(i).position(s.$el)
                    }
                    _addDocumentEvents() {
                        (0, o.default)(document).on("mousemove touchmove", this._onMouseMove).on("mouseup touchend", this._onMouseUp)
                    }
                    _removeDocumentEvents() {
                        (0, o.default)(document).off("mousemove touchmove", this._onMouseMove).off("mouseup touchend", this._onMouseUp)
                    }
                }
                var c = u;
                e.default = c,
                t.exports = e.default
            },
            "wI+p": function (t, e, s) {
                "use strict";
                Object.defineProperty(e, "__esModule", {
                    value: !0
                }),
                e.default = e.config = void 0;
                const i = {
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
                e.config = i;
                var a = i;
                e.default = a
            },
            wyPF: function (t, e, s) {
                "use strict";
                Object.defineProperty(e, "__esModule", {
                    value: !0
                }),
                e.default = void 0;
                var i,
                a = (i = s("hV9s")) && i.__esModule ? i : {
                default:
                    i
                };
                class r extends a.default {
                    constructor(t, e, s = {}, i) {
                        super(t, s, i),
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
                        this.renderable.on("click", () => this.trigger("click", {
                                data: this.data,
                                shape: this.renderable
                            })),
                        this.renderable.on("mouseover", () => this.trigger("mouseover", {
                                data: this.data,
                                shape: this.renderable
                            })),
                        this.renderable.on("mouseout", () => this.trigger("mouseout", {
                                data: this.data,
                                shape: this.renderable
                            })),
                        super.addToMap(t, e)
                    }
                    removeFromMap(t) {
                        this.renderable.off(),
                        this.renderable.remove()
                    }
                    createRenderable() {
                        const t = [];
                        return this._polygons.forEach(e => {
                            const s = e.outer,
                            i = e.inner ? e.inner : [];
                            t.push([s, ...i])
                        }),
                        L.polygon(t, Object.assign(Object.assign({}, this.opts), {
                                fillOpacity: this.opts.fillOpacity * this.opacity,
                                opacity: this.opts.opacity * this.opacity
                            }))
                    }
                }
                var n = r;
                e.default = n,
                t.exports = e.default
            },
            xctJ: function (t, e, s) {
                "use strict";
                Object.defineProperty(e, "__esModule", {
                    value: !0
                }),
                e.default = void 0;
                var i,
                a = (i = s("ccXq")) && i.__esModule ? i : {
                default:
                    i
                },
                r = s("jNhv");
                class n extends a.default {
                    constructor(t, e, s) {
                        super(t, (0, r.extend)({
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
                    setImage(t, e) {
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
                                    tiles: [1, 2, 3, 4].map(e => t.replace(/\{s\}/, "" + e)),
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
                }
                var o = n;
                e.default = o,
                t.exports = e.default
            },
            yP8Q: function (t, e, s) {
                "use strict";
                Object.defineProperty(e, "__esModule", {
                    value: !0
                }),
                e.default = void 0;
                var i,
                a = (i = s("5bFp")) && i.__esModule ? i : {
                default:
                    i
                },
                r = s("jNhv");
                class n extends a.default {
                    constructor() {
                        super(...arguments),
                        this._load = (0, r.debounce)(t => {
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
                                s = this.opts.title ? this.opts.title.replace(/\([^\)]+\)$/, "" + (e ? `(${e})` : "")) : null;
                                this.$el.html(`\n\t\t\t\t${this.opts.title ? `<div class="awxjs__legend-title">${s}</div>` : ""}\n\t\t\t\t<div class="awxjs__legend-content"><img src="${t}"></div>\n\t\t\t`),
                                this.trigger("load:done"),
                                setTimeout(() => {
                                    const t = this.getSize();
                                    t.width = Math.max(t.width, this._image.width),
                                    this.$el.css("width", t.width + "px"),
                                    this.trigger("resize", t)
                                }, 150)
                            },
                            this._image.onerror = () => {
                                console.warn("[Aeris] ImageLegend - Failed to load image from " + t)
                            },
                            this._image.src = t
                        }, 250)
                    }
                    get image() {
                        return this._image
                    }
                    url() {
                        let t;
                        if ((0, r.isPlainObject)(this.opts.url)) {
                            t = t[this.opts.metric ? "metric" : "imperial"]
                        } else (0, r.isString)(this.opts.url) && (t = this.opts.url);
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
                    update(t, e = !1) {
                        (0, r.isEmpty)(t) || (e = !0),
                        !e && this._image || this._load(this.url())
                    }
                }
                var o = n;
                e.default = o,
                t.exports = e.default
            },
            yoyN: function (t, e, s) {
                "use strict";
                Object.defineProperty(e, "__esModule", {
                    value: !0
                }),
                e.default = void 0;
                var i,
                a = (i = s("bMim")) && i.__esModule ? i : {
                default:
                    i
                },
                r = s("jNhv");
                class n extends a.default {
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
                        return (0, r.isset)(this.get(t))
                    }
                    remove(t, e = !1) {
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
                var o = n;
                e.default = o,
                t.exports = e.default
            },
            yrzZ: function (t, e, s) {
                "use strict";
                Object.defineProperty(e, "__esModule", {
                    value: !0
                }),
                e.default = void 0;
                var i = h(s("IRno")),
                a = h(s("GpM6")),
                r = h(s("/NXb")),
                n = h(s("Rld3")),
                o = s("jNhv"),
                l = h(s("b9Bd"));
                function h(t) {
                    return t && t.__esModule ? t : {
                    default:
                        t
                    }
                }
                const d = t => {
                    const e = t;
                    e.type;
                    let s;
                    const i = e.controls;
                    if (i) {
                        const t = i.settings;
                        (0, o.isArray)(t) && (0, o.set)(e, "controls.settings", t.map(t => {
                                var s;
                                const {
                                    type: i
                                } = t;
                                if ("opacity" === i) {
                                    const i = ((t = {}) => {
                                        let e = 1;
                                        return (0, o.isset)(t.opacity) ? e = t.opacity : ["polyline", "polygon"].forEach(s => {
                                            const i = t[s],
                                            a = (0, o.isFunction)(i) ? i({}) : i;
                                            a && (a.fill ? e = a.fill.opacity : a.stroke && (e = a.stroke.opacity))
                                        }),
                                        e
                                    })(null === (s = e.options) || void 0 === s ? void 0 : s.style);
                                    (0, o.isset)(i) && (t.options = Object.assign(Object.assign({}, t.options), {
                                            value: [100 * i]
                                        }))
                                }
                                return t
                            }))
                    }
                    return s = e.buttons ? new n.default(e) : e.segments || e.groups ? new r.default(e) : new a.default(e),
                    s
                };
                class u extends i.default {
                    constructor(t) {
                        super((0, o.extend)({
                                icon: '\n\t\t\t\t<svg version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 0 100 80.5">\n\t\t\t\t\t<g>\n\t\t\t\t\t\t<path d="M98.5,51.3l-13.7-7.3L58,58.2c-2.5,1.3-5.2,2-8,2c-2.8,0-5.5-0.7-8-2L15.2,44.1L1.5,51.3C0.6,51.8,0,52.8,0,53.8\n\t\t\t\t\t\t\ts0.6,2,1.5,2.5l43.5,23c3.2,1.7,6.9,1.7,10.1,0l43.5-23c0.9-0.5,1.5-1.4,1.5-2.5S99.4,51.8,98.5,51.3L98.5,51.3z"/>\n\t\t\t\t\t\t<path d="M1.5,29.2l43.5,23c1.6,0.8,3.3,1.2,5,1.2c1.7,0,3.5-0.4,5-1.3l43.5-23c0.9-0.5,1.5-1.4,1.5-2.5c0-1-0.6-2-1.5-2.5L55,1.3\n\t\t\t\t\t\t\tC53.5,0.4,51.7,0,50,0c-1.7,0-3.4,0.4-5,1.3l-43.5,23C0.6,24.7,0,25.7,0,26.7C0,27.8,0.6,28.7,1.5,29.2L1.5,29.2z"/>\n\t\t\t\t\t</g>\n\t\t\t\t</svg>\n\t\t\t'
                            }, t))
                    }
                    get buttons() {
                        return [...this._buttons || []]
                    }
                    buttonForId(t) {
                        let e;
                        return this.buttons.forEach((s, i) => {
                            (0, o.isset)(e) || (s instanceof n.default ? e = s.buttonForId(t) : s.id !== t || (0, o.isset)(e) || (e = s))
                        }),
                        e
                    }
                    buttonForKey(t) {
                        let e;
                        return this.buttons.forEach((s, i) => {
                            (0, o.isset)(e) || (s instanceof n.default ? e = s.buttonForKey(t) : s.key !== t || (0, o.isset)(e) || (e = s))
                        }),
                        e
                    }
                    add(t, e = !0) {
                        const s = this.buttons.length;
                        return this.insertAt(s, t, e)
                    }
                    insertAt(t, e, s = !0) {
                        this._buttons || (this._buttons = []);
                        const i = d(e);
                        return t >= this._buttons.length ? (this._buttons.push(i), t = -1) : (t = Math.max(0, t), this._buttons.splice(t, 0, i)),
                        this._appendButton(i, s, t),
                        this.trigger("button:add", {
                            button: i
                        }),
                        i
                    }
                    insertBefore(t, e, s = !0) {
                        const i = this._indexForId(t);
                        return 0 === i ? this.insertAt(0, e, s) : i > 0 ? this.insertAt(i - 1, e, s) : this.add(e, s)
                    }
                    insertAfter(t, e, s = !0) {
                        const i = this._indexForId(t);
                        return i >= 0 ? this.insertAt(i + 1, e, s) : this.add(e, s)
                    }
                    removeAt(t) {
                        if (!(0, o.isset)(this._buttons) || t > this._buttons.length - 1 || t < 0)
                            return;
                        const e = this.buttons[t];
                        e && (this._buttons.splice(t, 1), e.$el.remove(), this.trigger("button:remove", {
                                button: e
                            }))
                    }
                    removeForId(t) {
                        let e = -1;
                        this.buttons.forEach((s, i) => {
                            s.id === t && -1 === e && (e = i)
                        }),
                        e >= 0 && this.removeAt(e)
                    }
                    select(t, e = !1) {
                        this.handleSelectionState(t, !0, e)
                    }
                    deselect(t, e = !1) {
                        this.handleSelectionState(t, !1, e)
                    }
                    set(t, e) {
                        const s = this.buttonForId(t) || this.buttonForKey(t);
                        s && s instanceof r.default && (s.value = e)
                    }
                    handleSelectionState(t, e, s = !1) {
                        const i = (t, e) => {
                            if (t instanceof r.default) {
                                const i = t.containsId(e),
                                a = t.containsValue(e);
                                s ? i && t.selectSegment(e) : i || a ? t.selectSegment(e) : t.matches(e) && t.select()
                            } else
                                t instanceof a.default && t.matches(e) && t.select()
                        },
                        l = (t, e) => {
                            if (t instanceof r.default) {
                                const i = t.containsId(e),
                                a = t.containsValue(e);
                                t.matches(e) ? t.deselect() : s ? i && t.deselectSegment(e) : (i || a) && t.deselectSegment(e)
                            } else
                                t instanceof a.default && t.matches(e) && t.deselect()
                        };
                        (0, o.isArray)(t) ? t.filter(t => !(0, o.isEmpty)(t)).forEach(t => this.handleSelectionState(t, e)) : this.buttons && this.buttons.forEach(s => {
                            const o = t;
                            if (s instanceof n.default) {
                                s.buttons.forEach(t => {
                                    e ? i(t, o) : l(t, o)
                                })
                            } else (s instanceof a.default || s instanceof r.default) && (e ? i(s, o) : l(s, o))
                        })
                    }
                    _onAddedToDOM() {
                        if (this.ui.content.append('<div class="awxjs__app__ui-panel-buttons"></div>'), this.ui.buttons = (0, l.default)(".awxjs__app__ui-panel-buttons", this.$el), this.opts.buttons) {
                            const t = [],
                            e = [];
                            this.opts.buttons.forEach(s => {
                                const i = d(s);
                                i instanceof n.default && e.push(i),
                                t.push(i)
                            }),
                            this._buttons = t
                        }
                        this.buttons.forEach(t => {
                            this._appendButton(t)
                        });
                        const t = () => {
                            0 === this.buttons.length ? this.hide() : this.show()
                        };
                        this.on("button:add button:remove", () => {
                            t()
                        }),
                        t()
                    }
                    _indexForId(t) {
                        let e = -1;
                        return this.buttons.forEach((s, i) => {
                            s.id === t && -1 === e && (e = i)
                        }),
                        e
                    }
                    _appendButton(t, e = !0, s = -1) {
                        if (s >= 0 ? t.addTo(this.ui.buttons, !1, s) : t.addTo(this.ui.buttons), e)
                            if (t instanceof n.default) {
                                t.buttons.forEach(t => {
                                    this._addButtonEvents(t)
                                })
                            } else
                                this._addButtonEvents(t)
                    }
                    _addButtonEvents(t) {
                        t.on("select", e => {
                            this.trigger("select", Object.assign({}, t.info))
                        }).on("deselect", e => {
                            this.trigger("deselect", Object.assign({}, t.info))
                        }).on("value:change", e => {
                            this.trigger("change", Object.assign(Object.assign({}, t.info), e.data))
                        }).on("control:change", e => {
                            this.trigger("control:change", Object.assign(Object.assign({}, t.info), e.data))
                        }),
                        t instanceof n.default ? t.on("change:size", t => {
                            this.trigger("change:size")
                        }) : t instanceof r.default && t.on("expanded", () => {
                            this.trigger("change:size")
                        }).on("collapsed", () => {
                            this.trigger("change:size")
                        })
                    }
                }
                var c = u;
                e.default = c,
                t.exports = e.default
            },
            zILR: function (t, e, s) {
                "use strict";
                Object.defineProperty(e, "__esModule", {
                    value: !0
                }),
                e.default = void 0;
                var i = n(s("gQtN")),
                a = n(s("b9Bd")),
                r = s("jNhv");
                function n(t) {
                    return t && t.__esModule ? t : {
                    default:
                        t
                    }
                }
                class o extends i.default {
                    constructor(t, e) {
                        super(e = (0, r.extend)({}, {
                                refresh: 0,
                                showWhenStopped: !0,
                                showWhenLoading: !0
                            }, e)),
                        this.element = t ? (0, a.default)(t) : void 0,
                        this._images = {},
                        this._targets = {},
                        this._idPrefix = "awxb-map-layer-",
                        this._isReset = !1,
                        this._loading = !1,
                        this._visible = !0,
                        this._hasLoaded = !1,
                        (0, r.isEmpty)(e.key) || (this._idPrefix += e.key + "-"),
                        this.element && this.element.addClass("amp-map"),
                        this._startup()
                    }
                    get showWhenLoading() {
                        return this.opts.showWhenLoading
                    }
                    set showWhenLoading(t) {
                        this.opts.showWhenLoading = t
                    }
                    dataByTime() {
                        return this._images
                    }
                    dataItems() {
                        return Object.keys(this.dataByTime()).map(t => this._images[t])
                    }
                    play() {
                        this.isAnimating() || this.canAnimate() && (!this._hasImages() || this._totalImages() < this.totalIntervals ? this._load() : super.play())
                    }
                    stop() {
                        super.stop(),
                        this._loading && this.reset()
                    }
                    reset(t = !1) {
                        this._isReset = !0,
                        this._loading = !1,
                        this._hasLoaded = !1,
                        this._reloadTimer && window.clearTimeout(this._reloadTimer),
                        this._loaders && Object.keys(this._loaders).forEach(t => {
                            this._loaders[t].onload = void 0
                        }),
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
                        this.element ? this.element.show() : this._currentImage && (0, a.default)(this._currentImage).show(),
                        this.trigger("show")
                    }
                    hide() {
                        this._visible = !1,
                        this.element ? this.element.hide() : this._currentImage && (0, a.default)(this._currentImage).hide(),
                        this.trigger("hide")
                    }
                    isVisible() {
                        if (this.element) {
                            let t = this.element;
                            return (0, r.isDOM)(this.element) && this.element.length > 0 && (t = this.element[0]),
                            "none" !== t.style.display
                        }
                        return !this._currentImage || "none" !== this._currentImage.style.display
                    }
                    setOpacity(t) {
                        this.dataItems().forEach(e => {
                            (0, r.has)(e, "setOpacity") && e.setOpacity(t)
                        })
                    }
                    _target(t) {
                        return this._targets[t]
                    }
                    _setImageVisible(t) {
                        t ? (0, a.default)(this._currentImage).show() : (0, a.default)(this._currentImage).hide()
                    }
                    _updateForTime(t) {
                        if (this.canShow(this.currentTime) ? this.show() : this.hide(), !1 === this._visible)
                            return;
                        const e = this._imageClosestToTime(t);
                        e ? e !== this._currentImage && ((0, a.default)(e).show(), this._setImageVisible(!1), this._currentImage = e) : this.isAnimating() || !0 !== this.opt("showWhenStopped") || (t = this._intervalClosestToTime(t), this.canShow(t) && (this._isReset = !1, this._loadInterval(t, !0, null)))
                    }
                    _imageClosestToTime(t) {
                        let e = null,
                        s = this.from,
                        i = Math.abs(t - s);
                        return this._images ? (Object.keys(this._images).forEach(e => {
                                const a = Math.abs(t - +e);
                                a < i && (i = a, s = +e)
                            }), s !== this._lastImageTime && this._images[s] && (e = this._images[s], s = Math.round(s), this._lastImageTime = s, this.trigger("advance:image", {
                                    time: s,
                                    img: e
                                })), e) : null
                    }
                    _hasImages() {
                        return this._totalImages() > 0
                    }
                    _totalImages() {
                        return (0, r.isUndefined)(this._images) ? 0 : Object.keys(this._images).filter(t => (0, r.isset)(this._images[t])).length
                    }
                    _load() {
                        this._isReset = !1,
                        this._loading = !0;
                        const t = this.neededIntervals() || [];
                        Object.keys(this._images).forEach(e => {
                            const s = parseInt(e, 10),
                            i = t.indexOf(s);
                            -1 !== i && t.splice(i, 1)
                        });
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
                                width: t.width + "px",
                                height: t.height + "px"
                            })
                        }
                        this.trigger("load:start", {
                            times: t
                        });
                        let s = 0;
                        const i = () => {
                            this._loadInterval(t[s], !0, () => {
                                s += 1,
                                this._isReset || (s >= t.length ? (e(), this.opts.refresh > 0 && (this._reloadTimer && window.clearTimeout(this._reloadTimer), this._reloadTimer = setTimeout(() => {
                                                this.reset(),
                                                this._load()
                                            }, 1e3 * this.opts.refresh))) : i())
                            })
                        };
                        i()
                    }
                    _loadInterval(t, e, s) {
                        t = Math.round(t);
                        const i = document.getElementById(`${this._idPrefix}${t}`);
                        if (i) {
                            const t = (0, a.default)(i);
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
                        let n;
                        this.provider && (n = this.provider.animationUrlForDate(this, r));
                        const o = t => {
                            this._images[t] = new Image,
                            this.trigger("load:error", {
                                date: r,
                                interval: Object.keys(this._images).length - 1
                            }),
                            s && s()
                        };
                        if (!n)
                            return void o(t);
                        const l = new Image;
                        this._loaders[t] = l,
                        l.onload = () => {
                            if (this._isReset)
                                return;
                            this._loaders[t] && delete this._loaders[t];
                            const i = `${this._idPrefix}${t}`;
                            let r = {
                                width: l.width,
                                height: l.height
                            };
                            this.provider && (r = this.provider.animationSizeForImage(this));
                            const n = `<img id="${i}" src="${l.src}" width="${r.width}" height="${r.height}" style="position:absolute;">`;
                            this.element && this.element.append(n),
                            e && (this._images[t] = this._hasDOMTarget() ? (0, a.default)("#" + i) : l),
                            this._setImageVisible(!1),
                            this._currentImage = this._hasDOMTarget() ? (0, a.default)("#" + i) : l,
                            s && s();
                            const o = Object.keys(this._images).length;
                            this.trigger("load:image", {
                                date: new Date(t),
                                src: l.src,
                                img: l
                            }),
                            this.trigger("load:progress", {
                                time: t,
                                interval: o - 1,
                                loaded: o,
                                total: this.totalIntervals
                            })
                        },
                        l.onerror = () => {
                            o(t)
                        },
                        l.src = n
                    }
                    _hasDOMTarget() {
                        return this.element && this.element.length > 0
                    }
                }
                var l = o;
                e.default = l,
                t.exports = e.default
            }
        }
    ]);