(this.webpackJsonp=this.webpackJsonp||[]).push([["aerisweather.maps.common"],{"5ID0":function(t,e,n){"use strict";var r=n("lwsE"),i=n.n(r),a=n("W8MJ"),o=n.n(a),s=n("7r+a"),c=function(t){var e,n=t.type,r=t.coordinates;switch(n){case"Point":e=new s.e(r);break;case"MultiPoint":e=new s.c(r);break;case"LineString":e=new s.a(r);break;case"MultiLineString":e=new s.b(r);break;case"Polygon":e=new s.f(r);break;case"MultiPolygon":e=new s.d(r);break;default:e=null}
return e},u=n("0lfv"),l=function(){function t(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:{};i()(this,t),e.type&&e.coordinates&&(e={type:"Feature",geometry:e,properties:e.properties}),Object(u.isEmpty)(e.geometry)||(this._geometry=c(e.geometry),this.properties=e.properties||{},e.id&&(this.id="".concat(e.id)))}
return o()(t,[{key:"geometry",get:function(){return this._geometry}},{key:"coordinates",get:function(){if(this.geometry)
return this.geometry.coordinates}}]),t}
();e.a=l},"5kaa":function(t,e,n){"use strict";n.d(e,"b",(function(){return De}));n("QWBl"),n("yXV3"),n("2B1R"),n("pDQq"),n("zKZe"),n("tkto"),n("07d7"),n("SuFq"),n("rB9j"),n("JfAA"),n("UxlC"),n("EnZy"),n("FZtP");var r=n("lwsE"),i=n.n(r),a=n("W8MJ"),o=n.n(a),s=n("PJYZ"),c=n.n(s),u=n("7W2i"),l=n.n(u),h=n("a1gu"),f=n.n(h),d=n("Nsbk"),p=n.n(d),v=n("m0x2"),y=n("dqFL"),m='Weather data &copy; <a href="https://www.xweather.com/" target="_blank">Vaisala Xweather</a>',g=n("l1hk"),k=(n("ma9I"),n("4mDm"),n("5s+n"),n("PKPk"),n("3bBZ"),n("iWIM")),b=n.n(k),_=n("gqGf"),O=n("0lfv"),w=n("8TS8");function j(t){var e=function(){if("undefined"==typeof Reflect||!Reflect.construct)
return!1;if(Reflect.construct.sham)
return!1;if("function"==typeof Proxy)
return!0;try{return Date.prototype.toString.call(Reflect.construct(Date,[],(function(){}))),!0}catch(t){return!1}}
();return function(){var n,r=p()(t);if(e){var i=p()(this).constructor;n=Reflect.construct(r,arguments,i)}else
n=r.apply(this,arguments);return f()(this,n)}}
var x={},T=function(t){l()(n,t);var e=j(n);function n(t,r){var a;i()(this,n),(a=e.call(this))._setInitialView=!0,a._ready=!1,r=Object(O.extend)({zoom:7},r),a._opts=r,a._sources={},a._sourceOrder=[];var o=a.strategy;return x[o]||(x[o]={loading:!1,callbacks:[]}),x[o].loading?x[o].callbacks.push((function(){a.init(t)})):(x[o].loading=!0,a.loadDependencies().then((function(){x[o].loading=!1,a.init(t),x[o].callbacks.forEach((function(t){return t()})),x[o].callbacks=[],delete x[o]}))),a}
return o()(n,[{key:"isReady",value:function(){return this._ready}},{key:"init",value:function(t){var e=this;this.setupMap(t);var n={};if(Object(O.isset)(this._opts.zoom)&&(n.zoom=this._opts.zoom),this._opts.center&&(n.center={lat:this._opts.center.lat,lon:this._opts.center.lon}),!this._factory)
throw new Error("Cannot initialize map, overlay factory is undefined.");if(this._setupEvents(),this._setInitialView){var r=Object(O.isset)(n.zoom)?Math.max(0,n.zoom):8,i=n.center||{},a=i.lat,o=i.lon;Object(O.isset)(a)&&Object(O.isset)(o)?this.setView({lat:parseFloat(a),lon:parseFloat(o)},r):r>0&&this.setZoom(r)}
this.on("map:ready",(function(){e._ready=!0,e.trigger("ready")}))}},{key:"loadDependencies",value:function(){return null}},{key:"setupMap",value:function(t){throw new Error("Subclasses of MapStrategy must override setupMap()")}},{key:"setView",value:function(t,e){throw new Error("Subclasses of MapStrategy must override setView()")}},{key:"getCenter",value:function(){throw new Error("Subclasses of MapStrategy must override getCenter()")}},{key:"setCenter",value:function(t){throw new Error("Subclasses of MapStrategy must override setCenter()")}},{key:"getZoom",value:function(){throw new Error("Subclasses of MapStrategy must override getZoom()")}},{key:"setZoom",value:function(t){throw new Error("Subclasses of MapStrategy must override setZoom()")}},{key:"getBounds",value:function(){throw new Error("Subclasses of MapStrategy must override getBounds()")}},{key:"setBounds",value:function(t){throw new Error("Subclasses of MapStrategy must override setBounds()")}},{key:"fitBounds",value:function(t,e){throw new Error("Subclasses of MapStrategy must override fitBounds()")}},{key:"addSource",value:function(t){var e=this,n=t.identifier;this._sources[n]=t,this.isTile(t)?(this._sourceOrder.push(n),t.dataSource=this,this.addOverlay(t.overlay),t.on("layer:add",(function(t){e.addOverlay(t.data.layer)})),t.on("layer:remove",(function(t){e.removeOverlay(t.data.layer)}))):this.isVector(t)&&(t.on("markers:add",(function(t){var n=t.data,r=n.markers;n.animation;r&&e.addMarkers(r)})),t.on("markers:remove",(function(t){var n=t.data.markers;n&&e.removeMarkers(n)})),t.on("markers:update",(function(t){(t.data.markers||[]).forEach((function(t){var n=t.id,r=t.renderable,i=t.value,a=t.style;i&&e.updateMarker(r,{data:{value:i},style:a.marker||a},n)}))})),t.on("shapes:add",(function(t){var n=t.data,r=n.shapes,i=n.animation;r&&(i?e.showShapes(r):e.addShapes(r))})),t.on("shapes:remove",(function(t){var n=t.data,r=n.shapes,i=n.animation;r&&(i?e.hideShapes(r):e.removeShapes(r))})))}},{key:"removeSource",value:function(t){var e=t.identifier;if(this.isTile(t)){t.remove();var n=this._sourceOrder.indexOf(e);n>=0&&this._sourceOrder.splice(n,1)}else
this.isVector(t)&&(this.removeMarkers(t.markers),this.removeShapes(t.shapes));t.strategy=null,delete this._sources[e]}},{key:"isTile",value:function(t){return!1}},{key:"isVector",value:function(t){return t instanceof _.d}},{key:"isText",value:function(t){return t instanceof _.b}},{key:"isMarker",value:function(t){return!1}},{key:"isPolygon",value:function(t){return!1}},{key:"isPolyline",value:function(t){return!1}},{key:"addOverlay",value:function(t){throw new Error("Subclasses of MapStrategy must override addOverlay()")}},{key:"addOverlays",value:function(t){var e=this;(t||[]).forEach((function(t){return e.addOverlay(t)}))}},{key:"removeOverlay",value:function(t){throw new Error("Subclasses of MapStrategy must override removeOverlay()")}},{key:"removeOverlays",value:function(t){var e=this;(t||[]).forEach((function(t){return e.removeOverlay(t)}))}},{key:"addMarker",value:function(t,e){if(t instanceof w.d){if(t.renderable){if(t.style&&t.style.callout){var n=t.style.callout,r=Object(O.isFunction)(n)?n(t.data):n;this.bindCalloutToMarker(t.renderable,r)}
this.addMarker(t.renderable,t.data)}}else if(Object(O.isPlainObject)(t)){t.style=t.style||{};var i=t.renderable,a=t.data,o=t.style.callout;if(i){if(o){var s=Object(O.isFunction)(o)?o(a):o;this.bindCalloutToMarker(t.renderable,s)}
this.addMarker(i,a)}}}},{key:"addMarkers",value:function(t){var e=this;(t||[]).forEach((function(t){return e.addMarker(t)}))}},{key:"removeMarker",value:function(t){if(t instanceof w.d)
t.renderable&&this.removeMarker(t.renderable);else if(Object(O.isPlainObject)(t)){var e=t.renderable;e&&this.removeMarker(e)}}},{key:"removeMarkers",value:function(t){var e=this;(t||[]).forEach((function(t){return e.removeMarker(t)}))}},{key:"updateMarker",value:function(t,e){var n=arguments.length>2&&void 0!==arguments[2]?arguments[2]:null;if(t instanceof w.d)
t.renderable&&this.updateMarker(t.renderable,e,n);else if(Object(O.isPlainObject)(t)){var r=t.renderable;r&&this.updateMarker(r,e,n)}}},{key:"bindCalloutToMarker",value:function(t,e){}},{key:"addShape",value:function(t,e){if(Object(O.isArray)(t))
this.addShapes(t,e);else if(t instanceof w.d)
t.renderable&&this.addShape(t.renderable,t.data||e);else if(Object(O.isPlainObject)(t)){var n=t.renderable,r=t.polygons,i=t.polylines,a=t.data;r&&this.addShapes(r,a),i&&this.addShapes(i,a),n&&this.addShape(n,a)}}},{key:"addShapes",value:function(t,e){var n=this;(t||[]).forEach((function(t){return n.addShape(t,e)}))}},{key:"removeShape",value:function(t){if(Object(O.isArray)(t))
this.removeShapes(t);else if(t instanceof w.d)
t.renderable&&this.removeShape(t.renderable);else if(Object(O.isPlainObject)(t)){var e=t.renderable,n=t.polygons,r=t.polylines;n&&this.removeShapes(n),r&&this.removeShapes(r),e&&this.removeShape(e)}}},{key:"removeShapes",value:function(t){var e=this;(t||[]).forEach((function(t){return e.removeShape(t)}))}},{key:"showShape",value:function(t){if(Object(O.isArray)(t))
this.showShape(t);else if(t instanceof w.d)
t.renderable&&this.showShape(t.renderable);else if(Object(O.isPlainObject)(t)){var e=t.shape,n=t.polygons,r=t.polylines;n&&this.showShapes(n),r&&this.showShapes(r),e&&this.showShape(e)}}},{key:"showShapes",value:function(t){var e=this;(t||[]).forEach((function(t){return e.showShape(t)}))}},{key:"hideShape",value:function(t){if(Object(O.isArray)(t))
this.hideShape(t);else if(t instanceof w.d)
t.renderable&&this.hideShape(t.renderable);else if(Object(O.isPlainObject)(t)){var e=t.shape,n=t.polygons,r=t.polylines;n&&this.hideShapes(n),r&&this.hideShapes(r),e&&this.hideShape(e)}}},{key:"hideShapes",value:function(t){var e=this;(t||[]).forEach((function(t){return e.hideShape(t)}))}},{key:"showCallout",value:function(t,e,n){}},{key:"coordToPoint",value:function(t){throw new Error("Subclasses of MapStrategy must override coordToPoint()")}},{key:"pointToCoord",value:function(t){throw new Error("Subclasses of MapStrategy must override pointToCoord()")}},{key:"clear",value:function(){}},{key:"_setupEvents",value:function(){var t=this,e=this._eventMapping;if(e){var n="on";Object(O.has)(this.map,n)||(Object(O.has)(this.map,"addEventListener")?n="addEventListener":Object(O.has)(this.map,"addListener")&&(n="addListener")),Object(O.has)(this.map,n)&&Object.keys(e).forEach((function(r){t.map[n](r,(function(n){var i=t._dataForMapEvent(r,n);t._shouldTriggerEvent(r)&&t.trigger(e[r],i)}))}))}}},{key:"_shouldTriggerEvent",value:function(t){return!0}},{key:"_dataForMapEvent",value:function(t,e){return null}},{key:"tileLayer",value:function(t,e,n){if(!this.dataSource)
return null;var r=Object(O.isset)(n.zIndex)?n.zIndex:1,i=this._sourceOrder.indexOf(t);i>=0&&(r=i+1);var a=Object(O.get)(n,"data.service");return a||(a=this.dataSource.requestForMap(t)),a.param("format",Object(O.get)(n,"style.format")||"png"),this.factory.tileLayer(t,a,Object(O.extend)(Object(O.cloneDeep)(n),{time:e,zIndex:r}))}},{key:"strategy",get:function(){throw new Error("[Aeris] Subclasses must override `strategy`.")}},{key:"$el",get:function(){return null}},{key:"map",get:function(){return this._map}},{key:"factory",get:function(){return this._factory}},{key:"sources",get:function(){var t=this;return Object.keys(this._sources).map((function(e){return t._sources[e]}))}},{key:"opts",get:function(){return this._opts}}]),n}
(v.a),S=(n("GKVU"),n("J4zp")),M=n.n(S),I=n("RIqP"),R=n.n(I);function E(t){var e=function(){if("undefined"==typeof Reflect||!Reflect.construct)
return!1;if(Reflect.construct.sham)
return!1;if("function"==typeof Proxy)
return!0;try{return Date.prototype.toString.call(Reflect.construct(Date,[],(function(){}))),!0}catch(t){return!1}}
();return function(){var n,r=p()(t);if(e){var i=p()(this).constructor;n=Reflect.construct(r,arguments,i)}else
n=r.apply(this,arguments);return f()(this,n)}}
var P=function(t){l()(n,t);var e=E(n);function n(t,r){var a,o=arguments.length>2&&void 0!==arguments[2]?arguments[2]:void 0;return i()(this,n),(a=e.call(this))._opacity=1,a._hidden=!1,a._events=["click","mouseover","mouseout"],a._idPrefix="aeriswx",a.id=o||t,a._opts=Object(O.cloneDeep)(r),a._opacity=Object(O.isset)(r.opacity)?r.opacity:1,a}
return o()(n,[{key:"addTo",value:function(t,e){this.map!==t&&(this._map=t,this._targetIndex=e,this._renderable=this.createRenderable(),this.addToMap(t,e),this.trigger("map:add",{map:t,index:e}))}},{key:"remove",value:function(){this.map&&(this.removeFromMap(this.map),this._map=null,this.trigger("map:remove"))}},{key:"show",value:function(){this._hidden=!1,this.updateVisibility(!0)}},{key:"hide",value:function(){this._hidden=!0,this.updateVisibility(!1)}},{key:"setOpacity",value:function(t){this._opacity=t}},{key:"setZIndex",value:function(t){throw new Error("Subclasses of MapLayer should override setZIndex()")}},{key:"exists",value:function(){this.map;return!1}},{key:"opts",get:function(){return this._opts}},{key:"layerId",get:function(){var t=this.id?"-".concat(this.id):"";return"".concat(this._idPrefix).concat(t)}},{key:"map",get:function(){return this._map}},{key:"renderable",get:function(){return this._renderable}},{key:"opacity",get:function(){return this._opacity}},{key:"isHidden",get:function(){return this._hidden}}]),n}
(v.a);function D(t){var e=function(){if("undefined"==typeof Reflect||!Reflect.construct)
return!1;if(Reflect.construct.sham)
return!1;if("function"==typeof Proxy)
return!0;try{return Date.prototype.toString.call(Reflect.construct(Date,[],(function(){}))),!0}catch(t){return!1}}
();return function(){var n,r=p()(t);if(e){var i=p()(this).constructor;n=Reflect.construct(r,arguments,i)}else
n=r.apply(this,arguments);return f()(this,n)}}
var z=function(t){l()(n,t);var e=D(n);function n(){return i()(this,n),e.apply(this,arguments)}
return o()(n,[{key:"invalidate",value:function(){}},{key:"createRenderable",value:function(){}},{key:"updateVisibility",value:function(t){}},{key:"addToMap",value:function(t,e){this.renderable&&this.renderable.addTo(t)}},{key:"removeFromMap",value:function(t){this.renderable&&this.renderable.remove()}}]),n}
(P);function A(t){var e=function(){if("undefined"==typeof Reflect||!Reflect.construct)
return!1;if(Reflect.construct.sham)
return!1;if("function"==typeof Proxy)
return!0;try{return Date.prototype.toString.call(Reflect.construct(Date,[],(function(){}))),!0}catch(t){return!1}}
();return function(){var n,r=p()(t);if(e){var i=p()(this).constructor;n=Reflect.construct(r,arguments,i)}else
n=r.apply(this,arguments);return f()(this,n)}}
var F=function(t){l()(n,t);var e=A(n);function n(t,r){var a,o=arguments.length>2&&void 0!==arguments[2]?arguments[2]:{},s=arguments.length>3&&void 0!==arguments[3]?arguments[3]:void 0;return i()(this,n),(a=e.call(this,t,o,s)).setOpacity(o.fillOpacity),a._polygons=r,a}
return o()(n,[{key:"setOpacity",value:function(t){b()(p()(n.prototype),"setOpacity",this).call(this,t),this.renderable&&this.renderable.setStyle(Object.assign(Object.assign({},this.opts),{fillOpacity:this.opts.fillOpacity*t,opacity:this.opts.opacity*t}))}},{key:"addToMap",value:function(t,e){var r=this;this.renderable.off(),this.renderable.on("click",(function(){return r.trigger("click",{data:r.data,shape:r.renderable})})),this.renderable.on("mouseover",(function(){return r.trigger("mouseover",{data:r.data,shape:r.renderable})})),this.renderable.on("mouseout",(function(){return r.trigger("mouseout",{data:r.data,shape:r.renderable})})),b()(p()(n.prototype),"addToMap",this).call(this,t,e)}},{key:"removeFromMap",value:function(t){this.renderable.off(),this.renderable.remove()}},{key:"createRenderable",value:function(){var t=[];return this._polygons.forEach((function(e){var n=e.outer,r=e.inner?e.inner:[];t.push([n].concat(R()(r)))})),L.polygon(t,Object.assign(Object.assign({},this.opts),{fillOpacity:this.opts.fillOpacity*this.opacity,opacity:this.opts.opacity*this.opacity}))}}]),n}
(z);function C(t){var e=function(){if("undefined"==typeof Reflect||!Reflect.construct)
return!1;if(Reflect.construct.sham)
return!1;if("function"==typeof Proxy)
return!0;try{return Date.prototype.toString.call(Reflect.construct(Date,[],(function(){}))),!0}catch(t){return!1}}
();return function(){var n,r=p()(t);if(e){var i=p()(this).constructor;n=Reflect.construct(r,arguments,i)}else
n=r.apply(this,arguments);return f()(this,n)}}
var B=function(t){l()(n,t);var e=C(n);function n(t,r){var a,o=arguments.length>2&&void 0!==arguments[2]?arguments[2]:{},s=arguments.length>3&&void 0!==arguments[3]?arguments[3]:void 0;return i()(this,n),(a=e.call(this,t,o,s))._points=r,a}
return o()(n,[{key:"setOpacity",value:function(t){b()(p()(n.prototype),"setOpacity",this).call(this,t),this.renderable&&this.renderable.setStyle(Object.assign(Object.assign({},this.opts),{opacity:t}))}},{key:"addToMap",value:function(t,e){var r=this;this.renderable.off(),this.renderable.on("click",(function(){return r.trigger("click",{data:r.data,shape:r.renderable})})),this.renderable.on("mouseover",(function(){return r.trigger("mouseover",{data:r.data,shape:r.renderable})})),this.renderable.on("mouseout",(function(){return r.trigger("mouseout",{data:r.data,shape:r.renderable})})),b()(p()(n.prototype),"addToMap",this).call(this,t,e)}},{key:"removeFromMap",value:function(t){this.renderable.off(),this.renderable.remove()}},{key:"createRenderable",value:function(){return L.polyline(this._points,Object.assign(Object.assign({},this.opts),{opacity:this.opacity}))}}]),n}
(z);n("oVuX");function V(t){var e=function(){if("undefined"==typeof Reflect||!Reflect.construct)
return!1;if(Reflect.construct.sham)
return!1;if("function"==typeof Proxy)
return!0;try{return Date.prototype.toString.call(Reflect.construct(Date,[],(function(){}))),!0}catch(t){return!1}}
();return function(){var n,r=p()(t);if(e){var i=p()(this).constructor;n=Reflect.construct(r,arguments,i)}else
n=r.apply(this,arguments);return f()(this,n)}}
var q,W,N=function(t){l()(n,t);var e=V(n);function n(t,r,a){var o,s=arguments.length>3&&void 0!==arguments[3]?arguments[3]:void 0;return i()(this,n),(o=e.call(this))._hidden=!1,o._events=["click","mouseover","mouseout"],o.id=s,o.coordinate=t,o.data=r,o.opts=Object.assign({},a),o}
return o()(n,[{key:"map",get:function(){return this._map}},{key:"renderable",get:function(){return this._renderable}}]),o()(n,[{key:"addTo",value:function(t,e){this.map!==t&&(this._map=t,this._renderable||(this._renderable=this.createRenderable()),this.addToMap(t,e),this.trigger("map:add",{map:t,index:e}))}},{key:"remove",value:function(){this.map&&(this.removeFromMap(this.map),this._map=null,this.trigger("map:remove"))}},{key:"update",value:function(t){}},{key:"setStyle",value:function(t){}},{key:"invalidate",value:function(){var t=this.map;this.remove(),this._renderable=this.createRenderable(),this.addTo(t)}},{key:"isHidden",get:function(){return this._hidden}}]),n}
(v.a),Z=(n("yyme"),n("E9XD"),function(t,e,n,r){var i=0,a=0;if(r=Object(O.extend)({x:0,y:0},r),Object(O.isString)(t)){var o=t;i=(n.width-e.width)/2,a=(n.height-e.height)/2,/^top/.test(o)?a=0:/^bottom/.test(o)&&(a=n.height-e.height),/left$/.test(o)?i=0:/right$/.test(o)&&(i=n.width-e.width)}else{var s=t;i=s.x,a=s.y}
return{x:i+=r.x,y:a+=r.y}}),$=function(t){var e=t.stroke?Object.keys(t.stroke).reduce((function(e,n){var r=t.stroke[n];return Object(O.isset)(r)&&("width"===n&&(e+=' stroke-width="'.concat(r,'"')),"color"===n&&(e+=' stroke="'.concat(r,'"')),"opacity"===n&&(e+=' stroke-opacity="'.concat(r,'"'))),e}),""):"",n=t.fill?Object.keys(t.fill).reduce((function(e,n){var r=t.fill[n];return Object(O.isset)(r)&&("color"===n&&(e+=' fill="'.concat(r,'"')),"opacity"===n&&(e+=' fill-opacity="'.concat(r,'"'))),e}),""):"";return n||e?"".concat(n).concat(e):""};(W=q||(q={})).calculateTextSize=function(t,e,n,r){var i=0,a=0;if(r=r||[0,0],e=e||12,window&&window.document){var o=window.document,s=o.createElement("text");s.style.fontSize=Object(O.isString)(e)?"".concat(e):"".concat(e,"px"),s.style.fontWeight=n||"normal",s.style.visibility="hidden",s.innerHTML=t,o.body.appendChild(s);var c=s.getBoundingClientRect();o.body.removeChild(s),c.width>0&&(i=c.width),c.height>0&&(a=c.height)}
var u=r,l=M()(u,2);return[i+=2*l[0],a+=2*l[1]]},W.path=function(t,e){e=Object(O.extend)({stroke:{opacity:1},fill:{color:"#ffffff",opacity:1}},e);var n=$(e);return"<g".concat(e.transform?' transform="'.concat(e.transform,'"'):"",'><path d="').concat(t,'"').concat(n," /></g>")},W.rect=function(t,e,n){var r=n=Object(O.extend)({margin:0,radius:0,stroke:null,fill:{color:"#ffffff",opacity:1}},n),i=r.margin,a=r.radius,o=i;n.stroke&&n.stroke.width>0&&(o+=n.stroke.width/2,t-=n.stroke.width,e-=n.stroke.width);var s="M".concat(o+a,",").concat(o," ");return s+="L".concat(o+t-a,",").concat(o," "),a>0&&(s+="A".concat(a,",").concat(a," 0 0,1 ").concat(o+t,",").concat(o+a," ")),s+="L".concat(o+t,",").concat(o+e-a," "),a>0&&(s+="A".concat(a,",").concat(a," 0 0,1 ").concat(o+t-a,",").concat(o+e," ")),s+="L".concat(o+a,",").concat(o+e," "),a>0&&(s+="A".concat(a,",").concat(a," 0 0,1 ").concat(o,",").concat(o+e-a," ")),s+="L".concat(o,",").concat(o+a," "),a>0&&(s+="A".concat(a,",").concat(a," 0 0,1 ").concat(o+a,",").concat(o," ")),s+="Z",W.path(s,n)},W.circle=function(t,e){var n=2*(((e=Object(O.extend)({position:"center",translate:{x:0,y:0},radius:0,stroke:null,fill:{color:"#ffffff",opacity:1}},e)).radius||8)+(Object(O.get)(e,"stroke.width")||0)+1),r=Z(e.position,{width:n,height:n},t,e.translate),i=$(e);return r.x+=n/2,r.y+=n/2,"<circle".concat(e.transform?' transform="'.concat(e.transform,'"'):"",' cx="').concat(r.x,'" cy="').concat(r.y,'" r="').concat(e.radius,'"').concat(i," />")},W.text=function(t,e,n){n=Object(O.extend)({position:"center",translate:{x:0,y:0},anchor:"start",size:12,font:"'Helvetica','Arial',sans-serif",style:"bold",color:"#222222"},n),t=t||n.value;var r=W.calculateTextSize("".concat(t),n.size,n.style,n.padding),i=M()(r,2),a=i[0],o=i[1];n.translate.y+=o-1;var s=Z(n.position,{width:a,height:o},e,n.translate),c="";if(n.stroke){var u=n.stroke,l=u.color,h=void 0===l?"#333333":l,f=u.width,d=void 0===f?2:f;c+="<text".concat(n.transform?' transform="'.concat(n.transform,'"'):"",' dominent-baseline="hanging" text-anchor="').concat(n.anchor,'" x="').concat(s.x,'" y="').concat(s.y,'" style="font-family:').concat(n.font,";font-size:").concat(n.size,"px;font-weight:").concat(n.style,';" stroke="').concat(h,'" stroke-width="').concat(d,'">').concat(t||"","</text>")}
return c+="<text".concat(n.transform?' transform="'.concat(n.transform,'"'):"",' dominent-baseline="hanging" text-anchor="').concat(n.anchor,'" x="').concat(s.x,'" y="').concat(s.y,'" style="font-family:').concat(n.font,";font-size:").concat(n.size,"px;font-weight:").concat(n.style,';" fill="').concat(n.color,'">').concat(t||"","</text>")},W.image=function(t,e,n){n=Object(O.extend)({position:"center",size:[30,30]},n),t=t||n.url;var r=M()(n.size,2),i=r[0],a=r[1],o=Z(n.position,{width:i,height:a},e,n.translate),s=M()(n.size,2),c=s[0],u=s[1];return"<image".concat(n.transform?' transform="'.concat(n.transform,'"'):"",' x="').concat(o.x,'" y="').concat(o.y,'" width="').concat(c,'" height="').concat(u,'" xlink:href="').concat(t,'" />')},W.svg=function(t,e,n){var r=arguments.length>3&&void 0!==arguments[3]?arguments[3]:null;return'<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" version="1.1" width="'.concat(t,'" height="').concat(e,'"').concat(r?' viewBox="'.concat(r,'"'):"",">\n\t\t\t").concat((n||[]).map((function(t){return t})).join(""),"\n\t\t</svg>")},W.draw=function(t,e,n){var r=n.value,i=!0,a=!1,o=n.shape,s=n.text,c=n.image,u=[],l=[];if(s){var h=function(n,r){var i=n||r.value||"",a=r.x||0,s=r.y||0,c=r.size||12,u=W.calculateTextSize(i,c,r.style,r.padding),l=M()(u,2),h=l[0],f=l[1],d=!Object(O.isset)(r.autosize)||r.autosize;if(Object(O.isEmpty)(i))
return null;d&&(h&&f?(t=h,e=f):(t=5*i.length,e=c+2));var p=0;return o&&o.stroke&&(p=o.stroke.width/2||0),W.text(i,{width:t,height:e},Object(O.extend)(r,{x:p+t/2+a,y:p+Math.round(e-(e-.7*c)/2)+s}))};if(Object(O.isArray)(s))
s.forEach((function(t){var e=h(r,t);e&&l.push(e)}));else{var f=h(r,s);f&&l.push(f)}
l.length>0&&(a=!0)}
if(o){var d=t,p=e,v=o.type,y=o.size;if(y&&2===y.length&&(d=y[0],p=y[1]),"rect"===v){var m=W.rect(d,p,o);u.push(m)}else if("path"===v){var g=W.path(Object(O.get)(o,"path"),o);u.push(g)}else{var k=Object(O.get)(o,"stroke.width")||0;o.radius=Math.floor((d-2*k)/2),o.center={x:Math.round(d/2)+1,y:Math.round(p/2)+1};var b=W.circle({width:t,height:e},o);u.push(b)}}
if(c){var _=c.url;if(_){var w=c.x||0,j=c.y||0,x={x:t/2,y:e/2},T=c.size||[30,30],S=M()(T,2),L=S[0],I=S[1],R=W.image(_,{width:t,height:e},Object(O.extend)(c,{x:x.x-L/2+w,y:x.y-I/2+j}));u.push(R)}}
return l.length>0?u=u.concat(l):a&&(i=!1),i?W.svg(t,e,u,n.viewBox):null};var H=function(t){var e={stroke:!1,fill:!1};return t.stroke&&(e.stroke=!0,e.color=t.stroke.color,e.opacity=t.stroke.opacity,e.weight=t.stroke.width,e.lineCap=t.stroke.lineCap,e.lineJoin=t.stroke.lineJoin,e.dashArray=t.stroke.dashArray,e.dashOffset=t.stroke.dashOffset),t.fill&&(e.fill=!0,e.fillColor=t.fill.color,e.fillOpacity=t.fill.opacity,e.fillRule=t.fill.rule||"nonzero"),e.fill&&!Object(O.isset)(t.fillOpacity)&&(t.fillOpacity=1),e.stroke&&!Object(O.isset)(t.strokeOpacity)&&(t.strokeOpacity=1),e},U=function(t){if(t.html)
return L.divIcon({html:t.html,iconSize:t.size,className:t.className||""});if(t.svg){var e=t.size||[12,12],n=M()(e,2),r=n[0],i=n[1];return L.divIcon({html:q.draw(r,i,t.svg),iconSize:t.size,className:t.className||""})}
if(t.icon){var a=t.icon;return L.icon({iconUrl:a.url,iconRetinaUrl:a.retinaUrl,iconSize:t.size,iconAnchor:a.anchor,className:t.className||""})}
return null};function J(t){var e=function(){if("undefined"==typeof Reflect||!Reflect.construct)
return!1;if(Reflect.construct.sham)
return!1;if("function"==typeof Proxy)
return!0;try{return Date.prototype.toString.call(Reflect.construct(Date,[],(function(){}))),!0}catch(t){return!1}}
();return function(){var n,r=p()(t);if(e){var i=p()(this).constructor;n=Reflect.construct(r,arguments,i)}else
n=r.apply(this,arguments);return f()(this,n)}}
var G=function(t){l()(n,t);var e=J(n);function n(){return i()(this,n),e.apply(this,arguments)}
return o()(n,[{key:"update",value:function(t){var e;if(Object(O.isset)(t)){var n=null===(e=t.data)||void 0===e?void 0:e.value,r=t.style||{};Object(O.isFunction)(r)&&(r=r({value:n})),this.setStyle(r)}}},{key:"setStyle",value:function(t){var e=U(t);e&&this.renderable.setIcon(e)}},{key:"createRenderable",value:function(){var t=this.opts.style,e=this.coordinate,n={};t&&(n.icon=U(t),t.zIndex&&(n.zIndexOffset=t.zIndex));var r=L.marker([e.lat,e.lon],n);if(t.callout){var i=t.callout;if(Object(O.isFunction)(t.callout))
i=(0,t.callout)();var a=L.popup().setContent(i);r.bindPopup(a)}
return r}},{key:"updateVisibility",value:function(t){}},{key:"addToMap",value:function(t,e){var n=this;this.renderable.off(),this.renderable.on("click",(function(){return n.trigger("click",{data:n.data,marker:n.renderable})})),this.renderable.on("mouseover",(function(){return n.trigger("mouseover",{data:n.data,marker:n.renderable})})),this.renderable.on("mouseout",(function(){return n.trigger("mouseout",{data:n.data,marker:n.renderable})})),this.renderable.addTo(t)}},{key:"removeFromMap",value:function(t){this.renderable.off(),this.renderable.remove()}}]),n}
(N),Q=n("uts4"),X=n("R1Yn");function Y(t){var e=function(){if("undefined"==typeof Reflect||!Reflect.construct)
return!1;if(Reflect.construct.sham)
return!1;if("function"==typeof Proxy)
return!0;try{return Date.prototype.toString.call(Reflect.construct(Date,[],(function(){}))),!0}catch(t){return!1}}
();return function(){var n,r=p()(t);if(e){var i=p()(this).constructor;n=Reflect.construct(r,arguments,i)}else
n=r.apply(this,arguments);return f()(this,n)}}
var K=function(t){l()(n,t);var e=Y(n);function n(){var t;return i()(this,n),(t=e.apply(this,arguments))._visible=!0,t._exists=!1,t}
return o()(n,[{key:"show",value:function(){!1!==this._hidden&&(this._hidden=!1,this.overlay&&this.overlay.setOpacity(this._opacity))}},{key:"hide",value:function(){!0!==this._hidden&&(this._hidden=!0,this.overlay&&this.overlay.setOpacity(0))}},{key:"remove",value:function(){this.trigger("layer:remove",{layer:this.overlay})}},{key:"setOpacity",value:function(t){var e=!(arguments.length>1&&void 0!==arguments[1])||arguments[1];this._opacity=t,this.overlay&&this.isVisible()&&!0===e&&this.overlay.setOpacity(t),this.animation&&this.animation.setOpacity(t)}},{key:"setOrder",value:function(t){this.overlay.setZIndex(t)}},{key:"createOverlay",value:function(t){var e=this,n=arguments.length>1&&void 0!==arguments[1]?arguments[1]:{},r=L.tileLayer(t.url(),Object(O.extend)({},n,{subdomains:t.range().join("")}));return r.on("add",(function(){e._exists=!0})).on("remove",(function(){e._exists=!1})),r}},{key:"animationLayerForDate",value:function(t,e){var n=this,r=!(arguments.length>2&&void 0!==arguments[2])||arguments[2];return new Promise((function(t,i){if(n.dataSource){var a=n.dataSource.tileLayer(n.key,e,Object(O.extend)({},n._opts,{id:"".concat(n.identifier,"-anim-").concat(Object(X.mapTimestampFromDate)(e)),opacity:0,data:{service:n.service},animation:{enabled:!1}}));a.isAnimationFrame=!0,a.setOpacity(n._opacity,!1),a.hide(),r?a.overlay.on("load",(function(){t(a)})):t(a),a.on("layer:remove",(function(){n.trigger("layer:remove",{layer:a.overlay})})),n.trigger("layer:add",{layer:a.overlay})}else
i(new Error("No map strategy data source provided"))}))}},{key:"overlay",get:function(){return this._overlay}},{key:"timestamp",set:function(t){this.enabled&&Object(O.isset)(t)&&(t=new Date(t.getFullYear(),t.getMonth(),t.getDate(),t.getHours(),t.getMinutes()),this._timestamp&&t.getTime()===this._timestamp.getTime()||(this._timestamp=t,!1===this.isAnimating()&&!1===this.isAnimationFrame&&(this.animation.hide(),this.updateVisibility()),this.overlay&&this.canShow()&&this.overlay.setUrl(this.urlTemplate())))}}]),n}
(Q.a),tt=function(){function t(){i()(this,t)}
return o()(t,[{key:"tileLayer",value:function(t,e,n){return new K(t,e,n)}},{key:"marker",value:function(t,e,n){return n&&n.skip&&!0===n.skip?null:new G(e,null,{style:n})}},{key:"markerIcon",value:function(t){if(t.html)
return L.divIcon({html:t.html,iconSize:t.size,className:t.className||""});if(t.svg){var e=t.size||[12,12],n=M()(e,2),r=n[0],i=n[1];return L.divIcon({html:q.draw(r,i,t.svg),iconSize:t.size,className:t.className||""})}
if(t.icon){var a=t.icon;return L.icon({iconUrl:a.url,iconRetinaUrl:a.retinaUrl,iconSize:t.size,iconAnchor:a.anchor,className:t.className||""})}
return null}},{key:"polygon",value:function(t,e,n){var r;return n&&(r=H(n)),new F(t,e,r)}},{key:"polyline",value:function(t,e,n){var r;n&&(r=H(n));var i=e.map((function(t){return[t.lat,t.lon]}));return new B(t,i,r)}}]),t}
(),et=n("3j3Q");function nt(t){var e=function(){if("undefined"==typeof Reflect||!Reflect.construct)
return!1;if(Reflect.construct.sham)
return!1;if("function"==typeof Proxy)
return!0;try{return Date.prototype.toString.call(Reflect.construct(Date,[],(function(){}))),!0}catch(t){return!1}}
();return function(){var n,r=p()(t);if(e){var i=p()(this).constructor;n=Reflect.construct(r,arguments,i)}else
n=r.apply(this,arguments);return f()(this,n)}}
var rt=function(t){l()(n,t);var e=nt(n);function n(t,r){var a;return i()(this,n),(a=e.call(this,t,Object(O.extend)({style:null,map:{worldCopyJump:!0}},r)))._clickedMapLayer=!1,a}
return o()(n,[{key:"strategy",get:function(){return"leaflet"}},{key:"$el",get:function(){return Object(et.a)(this.map.getContainer())}}]),o()(n,[{key:"loadDependencies",value:function(){return new Promise((function(t,e){if("undefined"==typeof L||void 0===L.map){var n="1.7.0";Promise.all([Object(O.loadStyles)("https://unpkg.com/leaflet@".concat(n,"/dist/leaflet.css")),Object(O.loadScript)("https://unpkg.com/leaflet@".concat(n,"/dist/leaflet.js"))]).then((function(){t()}))}else
t()}))}},{key:"setupMap",value:function(t){var e=this;this._factory=new tt,this._eventMapping={load:"load",unload:"unload",resize:"resize",click:"click",dblclick:"dblclick",mousedown:"mousedown",mouseup:"mouseup",mouseover:"mouseover",mouseout:"mouseout",mousemove:"mousemove",zoom:"zoom",zoomstart:"zoom:start",zoomend:"zoom:end",move:"move",movestart:"move:start",moveend:"move:end",popupopen:"popupopen",popupclose:"popupclose"};var n=this.opts.map;if(n){var r=n.center,i=n.zoom;r&&Object(O.isset)(r.lat)&&Object(O.isset)(r.lng)&&Object(O.set)(this.opts,"center",{lat:r.lat,lon:r.lng}),i&&Object(O.set)(this.opts,"zoom",i)}
if(Object(X.isLeaflet)(t))
this._setInitialView=!1,this._map=t;else{if(Object(O.isString)(t)&&(t=Object(et.a)(t)),Object(O.isArray)(t)&&t.length>0)
t=t[0];else if(Object(O.isDOM)(t)){t=t[0]}
this._map=L.map(t,Object(O.extend)({zoomControl:!1},this.opts.map)),!1===Object(O.get)(this.opts,"map.zoomControl")||L.control.zoom({position:"bottomleft"}).addTo(this._map),Object(O.isset)(this.opts.center)||Object(O.set)(this.opts,"center",{lat:43,lon:-93}),Object(O.isset)(this.opts.zoom)||Object(O.set)(this.opts,"zoom",7),this.map.createPane("base"),this.map.getPane("base").style.zIndex="199";var a=Object(O.get)(this.opts,"style");Object(O.isEmpty)(a)?this._baseLayer=L.tileLayer("https://maps.api.xweather.com/wgE96YE3scTQLKjnqiMsv_SVG2gQFV8y9DjKR0BRY9wPoSLvrMrIqF9Lq2IYaY/flat-dk,states-outlines-dk:invert(),counties-dk:30:invert()/{z}/{x}/{y}/current.png",{attribution:'&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors',pane:"base"}):this._baseLayer=L.tileLayer(a,{pane:"base"}),this._baseLayer.addTo(this.map)}
this.map.createPane("admin"),this.map.getPane("admin").style.zIndex="210",setTimeout((function(){e.trigger("map:ready")}),250)}},{key:"setBaseStyle",value:function(t){Object(O.isEmpty)(t)||(this._baseLayer&&this._baseLayer.remove(),this._baseLayer=L.tileLayer(t,{pane:"base"}),this._baseLayer.addTo(this.map))}},{key:"setBaseUrl",value:function(t){this.setBaseStyle(t)}},{key:"setView",value:function(t,e){this._map&&this.map.setView({lat:t.lat,lng:t.lon},e)}},{key:"getCenter",value:function(){if(!this._map)
return null;var t=this._map.getCenter();return{lat:t.lat,lon:t.lng}}},{key:"setCenter",value:function(t){this._map&&this._map.setView({lat:t.lat,lng:t.lon},this.getZoom())}},{key:"getZoom",value:function(){return this._map?this._map.getZoom():0}},{key:"setZoom",value:function(t){this._map&&this._map.setZoom(t)}},{key:"getBounds",value:function(){if(!this._map)
return null;var t=this.map.getBounds();return{north:t.getNorth(),west:t.getWest(),south:t.getSouth(),east:t.getEast()}}},{key:"setBounds",value:function(t){if(this._map){var e=new L.LatLng(t.south,t.west),n=new L.LatLng(t.north,t.east);this.map.fitBounds(new L.LatLngBounds(e,n))}}},{key:"fitBounds",value:function(t){var e=arguments.length>1&&void 0!==arguments[1]?arguments[1]:[10,10];if(this._map){var n=new L.LatLng(t.south,t.west),r=new L.LatLng(t.north,t.east),i=new L.LatLngBounds(n,r);if(i.isValid()){var a={};2===e.length?a.padding=L.point(e[0],e[1]):4===e.length&&(a.paddingTopLeft=L.point(e[3],e[0]),a.paddingBottomRight=L.point(e[1],e[2])),this.map.fitBounds(i,a)}else
console.warn("[Aeris] Cannot fit bounds, invalid bounds - nw: ".concat(t.north,", ").concat(t.west,"; se: ").concat(t.south,", ").concat(t.east))}}},{key:"isTile",value:function(t){return t instanceof K}},{key:"isMarker",value:function(t){return(null==t?void 0:t.renderable)?t.renderable instanceof L.Marker:t instanceof L.Marker}},{key:"isPolygon",value:function(t){return!!((null==t?void 0:t.renderable)&&t.renderable instanceof F)||t instanceof F}},{key:"isPolyline",value:function(t){return!!((null==t?void 0:t.renderable)&&t.renderable instanceof B)||t instanceof B}},{key:"addOverlay",value:function(t){(t instanceof L.Layer||t instanceof L.TileLayer)&&t.addTo(this.map)}},{key:"removeOverlay",value:function(t){(t instanceof L.Layer||t instanceof L.TileLayer)&&t.remove()}},{key:"addMarker",value:function(t,e){var r=this;t instanceof G?(t.on("click",(function(){return r.trigger("marker:click",{data:e,marker:t})})),t.on("mouseover",(function(){return r.trigger("marker:mouseover",{data:e,marker:t})})),t.on("mouseout",(function(){return r.trigger("marker:mouseout",{data:e,marker:t})})),t.addTo(this.map)):t instanceof L.Marker&&t.addTo(this.map),b()(p()(n.prototype),"addMarker",this).call(this,t,e)}},{key:"removeMarker",value:function(t){t instanceof G?(t.offAll(),t.remove()):t instanceof L.Marker&&t.remove(),b()(p()(n.prototype),"removeMarker",this).call(this,t)}},{key:"updateMarker",value:function(t,e){e&&t instanceof G&&t.update(e)}},{key:"bindCalloutToMarker",value:function(t,e){}},{key:"addShape",value:function(t,e){var r=this;(t instanceof B||t instanceof F)&&(t.on("click",(function(){return r.trigger("shape:click",{data:e,shape:t})})),t.on("mouseover",(function(){return r.trigger("shape:mouseover",{data:e,shape:t})})),t.on("mouseout",(function(){return r.trigger("shape:mouseout",{data:e,shape:t})})),t.addTo(this.map)),b()(p()(n.prototype),"addShape",this).call(this,t,e)}},{key:"removeShape",value:function(t){(t instanceof B||t instanceof F)&&(t.offAll(),t.remove()),b()(p()(n.prototype),"removeShape",this).call(this,t)}},{key:"showShape",value:function(t){this.addShape(t)}},{key:"hideShape",value:function(t){this.removeShape(t)}},{key:"coordToPoint",value:function(t){if(!t)
return null;var e=this.map.latLngToContainerPoint({lat:t.lat,lng:t.lon});return{x:e.x,y:e.y}}},{key:"pointToCoord",value:function(t){if(!t)
return null;var e=this.map.containerPointToLatLng([t.x,t.y]);return{lat:e.lat,lon:e.lng}}},{key:"showCallout",value:function(t,e,n){Object(X.isCoordObject)(t)?this.map.openPopup(e,new L.LatLng(t.lat,t.lon),n):this.isMarker(t)&&t.unbindPopup().bindPopup(e,n).openPopup()}},{key:"_setupEvents",value:function(){var t=this;b()(p()(n.prototype),"_setupEvents",this).call(this),this.map.on("movestart",(function(e){["before:change:bounds","before:change:center"].forEach((function(e){return t.trigger(e)}))})),this.map.on("moveend",(function(e){["after:change:bounds","after:change:center","change:bounds","change:center"].forEach((function(e){return t.trigger(e)}))})),this.map.on("zoomstart",(function(e){["before:change:zoom"].forEach((function(e){return t.trigger(e)}))})),this.map.on("zoomend",(function(e){["after:change:zoom","change:zoom"].forEach((function(e){return t.trigger(e)}))}))}},{key:"_shouldTriggerEvent",value:function(t){return"click"!==t||!1===this._clickedMapLayer}},{key:"_dataForMapEvent",value:function(t,e){if(!e)
return null;var n=null;switch(t){case"mouseover":case"mousemove":case"mousedown":case"mouseup":case"click":case"dblclick":n={coord:{lat:e.latlng.lat,lon:e.latlng.lng},point:{x:e.containerPoint.x,y:e.containerPoint.y}}}
return n}}]),n}
(T);n("TeQF"),n("TWNs");function it(t){var e=function(){if("undefined"==typeof Reflect||!Reflect.construct)
return!1;if(Reflect.construct.sham)
return!1;if("function"==typeof Proxy)
return!0;try{return Date.prototype.toString.call(Reflect.construct(Date,[],(function(){}))),!0}catch(t){return!1}}
();return function(){var n,r=p()(t);if(e){var i=p()(this).constructor;n=Reflect.construct(r,arguments,i)}else
n=r.apply(this,arguments);return f()(this,n)}}
var at=function(t){l()(n,t);var e=it(n);function n(){return i()(this,n),e.apply(this,arguments)}
return o()(n,[{key:"setOpacity",value:function(t){b()(p()(n.prototype),"setOpacity",this).call(this,t),this.exists()&&!this.isHidden&&("raster"===this.renderable.type?this.map.setPaintProperty(this.layerId,"raster-opacity",t):"fill"===this.renderable.type&&this.map.setPaintProperty(this.layerId,"fill-opacity",t))}},{key:"setZIndex",value:function(t){if(this.exists()){var e=this.map.getStyle().layers,n=0;e.forEach((function(t,e){"line"===t.type&&/^admin-/.test(t.id)&&0===n&&(n=e)}));var r=e.map((function(t){return t.id}))[n+t];this.map.removeLayer(this.layerId),this.map.addLayer(this.renderable,r)}}},{key:"exists",value:function(){var t=this.map;return!!t&&(void 0!==t.getLayer(this.layerId)&&void 0!==t.getSource(this.sourceId))}},{key:"invalidate",value:function(){throw new Error("Subclasses must override `invalidate`")}},{key:"createRenderable",value:function(){return null}},{key:"updateVisibility",value:function(t){this.exists()&&("raster"===this.renderable.type&&this.map.setPaintProperty(this.layerId,"raster-opacity",this.opacity),this.map.setLayoutProperty(this.layerId,"visibility",t?"visible":"none"))}},{key:"addToMap",value:function(t){var e=this;if(!this.exists()){if(!this._relativeTo)
t.getStyle().layers.forEach((function(t,n){"line"===t.type&&/^admin-/.test(t.id)&&!e._relativeTo&&(e._relativeTo=t.id)}));void 0!==t.getLayer(this.layerId)||(this.source?(t.addSource(this.sourceId,this.source),this._relativeTo&&void 0===t.getLayer(this._relativeTo)||t.addLayer(this.renderable,this._relativeTo)):this.invalidate()),this.isHidden&&this.hide()}}},{key:"removeFromMap",value:function(t){void 0!==t.getLayer(this.layerId)&&(t.removeLayer(this.layerId),t.removeSource(this.sourceId))}},{key:"sourceId",get:function(){return"".concat(this.layerId,"-source")}},{key:"parentId",get:function(){return this._relativeTo},set:function(t){this._relativeTo=t}}]),n}
(P),ot=n("pAjv");function st(t){var e=function(){if("undefined"==typeof Reflect||!Reflect.construct)
return!1;if(Reflect.construct.sham)
return!1;if("function"==typeof Proxy)
return!0;try{return Date.prototype.toString.call(Reflect.construct(Date,[],(function(){}))),!0}catch(t){return!1}}
();return function(){var n,r=p()(t);if(e){var i=p()(this).constructor;n=Reflect.construct(r,arguments,i)}else
n=r.apply(this,arguments);return f()(this,n)}}
var ct=function(t){l()(n,t);var e=st(n);function n(t,r){var a,o=arguments.length>2&&void 0!==arguments[2]?arguments[2]:{},s=arguments.length>3&&void 0!==arguments[3]?arguments[3]:void 0;return i()(this,n),(a=e.call(this,t,o,s))._needsEventSetup=!0,a._polygons=r,a}
return o()(n,[{key:"addTo",value:function(t){var e=this;(b()(p()(n.prototype),"addTo",this).call(this,t),this._strokeLayer)&&(void 0!==t.getLayer(this.strokeLayerId)||t.addLayer(this._strokeLayer,this.layerId));this._needsEventSetup&&(t.on("click",this.layerId,(function(t){e.trigger("click",{data:e.data,shape:e.renderable})})),t.on("mouseenter",this.layerId,(function(t){e.trigger("mouseover",{data:e.data,shape:e.renderable})})),t.on("mouseleave",this.layerId,(function(t){e.trigger("mouseout",{data:e.data,shape:e.renderable})})),this._needsEventSetup=!1)}},{key:"remove",value:function(){if(this.map){if(this._strokeLayer)
void 0!==this.map.getLayer(this.strokeLayerId)&&this.map.removeLayer(this.strokeLayerId);b()(p()(n.prototype),"remove",this).call(this)}}},{key:"invalidate",value:function(){var t=this._polygons.length>1,e=(this._polygons||[]).map((function(t){var e=t.outer.map((function(t){return[t.lon,t.lat]})),n=t.inner?t.inner.map((function(t){return t.map((function(t){return[t.lon,t.lat]}))})):[];return[e].concat(R()(n))}));if(this.source={type:"geojson",data:{type:"FeatureCollection",features:[{type:"Feature",geometry:{type:t?"MultiPolygon":"Polygon",coordinates:t?e:e[0]||[]}}]}},this.createRenderable(),this.map){var n=this.map;this.remove(),this.addTo(n)}}},{key:"createRenderable",value:function(){var t=this.opts,e={fill:{},stroke:{}};return["fill","line"].forEach((function(n){var r="line"===n?"stroke":"fill";Object.keys(t).filter((function(t){return new RegExp("^".concat(n,"-")).test(t)})).forEach((function(n){var i=ot.hyphenate(n);Object(O.isset)(t[n])&&(e[r][i]=t[n])}))})),Object.keys(e.stroke).length>0&&(this._strokeLayer={id:this.strokeLayerId,type:"line",source:this.sourceId,layout:{},paint:e.stroke}),{id:this.layerId,type:"fill",source:this.sourceId,layout:{},paint:e.fill}}},{key:"strokeLayerId",get:function(){return"".concat(this.layerId,"-stroke")}}]),n}
(at);function ut(t){var e=function(){if("undefined"==typeof Reflect||!Reflect.construct)
return!1;if(Reflect.construct.sham)
return!1;if("function"==typeof Proxy)
return!0;try{return Date.prototype.toString.call(Reflect.construct(Date,[],(function(){}))),!0}catch(t){return!1}}
();return function(){var n,r=p()(t);if(e){var i=p()(this).constructor;n=Reflect.construct(r,arguments,i)}else
n=r.apply(this,arguments);return f()(this,n)}}
var lt=function(t){l()(n,t);var e=ut(n);function n(t,r){var a,o=arguments.length>2&&void 0!==arguments[2]?arguments[2]:{},s=arguments.length>3&&void 0!==arguments[3]?arguments[3]:void 0;return i()(this,n),(a=e.call(this,t,o,s))._needsEventSetup=!0,a._points=r,a}
return o()(n,[{key:"addTo",value:function(t){var e=this;b()(p()(n.prototype),"addTo",this).call(this,t),this._needsEventSetup&&(t.on("click",this.layerId,(function(t){e.trigger("click",{data:e.data,shape:e.renderable})})),t.on("mouseenter",this.layerId,(function(t){e.trigger("mouseover",{data:e.data,shape:e.renderable})})),t.on("mouseleave",this.layerId,(function(t){e.trigger("mouseout",{data:e.data,shape:e.renderable})})),this._needsEventSetup=!1)}},{key:"invalidate",value:function(){if(this.source={type:"geojson",data:{type:"FeatureCollection",features:[{type:"Feature",geometry:{type:"LineString",coordinates:this._points.map((function(t){return[t.lon,t.lat]}))}}]}},this.createRenderable(),this.map){var t=this.map;this.remove(),this.addTo(t)}}},{key:"createRenderable",value:function(){var t=Object(O.cloneDeep)(this.opts);return{id:this.layerId,type:"line",source:this.sourceId,layout:{},paint:t}}}]),n}
(at);function ht(t){var e=function(){if("undefined"==typeof Reflect||!Reflect.construct)
return!1;if(Reflect.construct.sham)
return!1;if("function"==typeof Proxy)
return!0;try{return Date.prototype.toString.call(Reflect.construct(Date,[],(function(){}))),!0}catch(t){return!1}}
();return function(){var n,r=p()(t);if(e){var i=p()(this).constructor;n=Reflect.construct(r,arguments,i)}else
n=r.apply(this,arguments);return f()(this,n)}}
var ft=function(t){l()(n,t);var e=ht(n);function n(t,r){var a,o=arguments.length>2&&void 0!==arguments[2]?arguments[2]:void 0;return i()(this,n),(a=e.call(this,t,Object(O.extend)({type:"tile"},r),o))._type=a.opts.type,a}
return o()(n,[{key:"setUrl",value:function(t){this.opts.url=t,this.map&&this.invalidate()}},{key:"setBounds",value:function(t){this.opts.bounds=t}},{key:"setImage",value:function(t){var e=arguments.length>1&&void 0!==arguments[1]?arguments[1]:void 0;this.opts.url=t;var n=this.map;if(n){e||(e=this.opts.bounds);var r=n.getSource(this.sourceId);r?r.updateImage({url:t,coordinates:[[e.west,e.north],[e.east,e.north],[e.east,e.south],[e.west,e.south]]}):this.invalidate()}}},{key:"invalidate",value:function(){var t=this.opts,e=t.url,n=t.bounds;if(e){if("image"===this._type){if(!n)
return;this.source={type:"image",url:e,coordinates:[[n.west,n.north],[n.east,n.north],[n.east,n.south],[n.west,n.south]]}}else
this.source={type:"raster",tiles:[1,2,3,4].map((function(t){return e.replace(/\{s\}/,"".concat(t))})),tileSize:256,attribution:this.opts.attribution||""};if(this.createRenderable(),this.map){var r=this.map;this.remove(),this.addTo(r)}}}},{key:"updateVisibility",value:function(t){this.exists()&&this.map.setPaintProperty(this.layerId,"raster-opacity",t?this.opacity:0)}},{key:"createRenderable",value:function(){return{id:this.layerId,type:"raster",source:this.sourceId,paint:{"raster-opacity":this.opacity,"raster-opacity-transition":{duration:0,delay:0},"raster-fade-duration":0}}}}]),n}
(at),dt=function(t){var e={stroke:!1,fill:!1};return e.id=t.id,t.stroke&&(e.stroke=!0,e.lineColor=t.stroke.color,e.lineOpacity=t.stroke.opacity,e.lineWidth=t.stroke.width,e.lineCap=t.stroke.lineCap,e.lineJoin=t.stroke.lineJoin,e.lineDasharray=t.stroke.dashArray,e.dashOffset=t.stroke.dashOffset),t.fill&&(e.fill=!0,e.fillColor=t.fill.color,e.fillOpacity=t.fill.opacity),e.fill&&!Object(O.isset)(t.fillOpacity)&&(t.fillOpacity=1),e.stroke&&!Object(O.isset)(t.strokeOpacity)&&(t.strokeOpacity=1),delete e.fill,delete e.stroke,Object.keys(e).forEach((function(t){var n=Object(ot.hyphenate)(t);n!==t&&(e[n]=e[t],delete e[t])})),e},pt=function(t){if(!t)
return null;if(t.html&&console.warn("awxjs - HTML markers are not currently supported with Mapbox GL"),t.svg){var e=t.size||[12,12],n=M()(e,2),r=n[0],i=n[1];if(document){var a=document.createElement("div");return a.innerHTML=q.draw(r,i,t.svg),t.zIndex&&(a.style.zIndex="".concat(t.zIndex)),a}}
if(t.icon){var o=new Image;return o.src=t.icon.url,o.width=t.size[0],o.height=t.size[1],o}
return null};function vt(t){var e=function(){if("undefined"==typeof Reflect||!Reflect.construct)
return!1;if(Reflect.construct.sham)
return!1;if("function"==typeof Proxy)
return!0;try{return Date.prototype.toString.call(Reflect.construct(Date,[],(function(){}))),!0}catch(t){return!1}}
();return function(){var n,r=p()(t);if(e){var i=p()(this).constructor;n=Reflect.construct(r,arguments,i)}else
n=r.apply(this,arguments);return f()(this,n)}}
var yt=function(t){l()(n,t);var e=vt(n);function n(){return i()(this,n),e.apply(this,arguments)}
return o()(n,[{key:"update",value:function(t){var e;if(Object(O.isset)(t)){var n=t.data;Object(O.isset)(n)&&(this.data=Object.assign(Object.assign({},this.data),n));var r=null===(e=this.data)||void 0===e?void 0:e.value,i=t.style||{};Object(O.isFunction)(i)&&(i=i({value:r})),this.setStyle(i)}}},{key:"setStyle",value:function(t){this.opts.style=t,this.invalidate()}},{key:"createRenderable",value:function(){var t=this.opts.style,e=this.coordinate,n={};t&&(n.icon=pt(t),t.zIndex&&(n.zIndex=t.zIndex));var r=new mapboxgl.Marker({element:n.icon});if(r.setLngLat([e.lon,e.lat]),t&&t.callout){var i=t.callout;if(Object(O.isFunction)(t.callout))
i=(0,t.callout)();var a=new mapboxgl.Popup;a.setHTML(i),r.setPopup(a)}
return r}},{key:"updateVisibility",value:function(t){}},{key:"addToMap",value:function(t,e){var n=this,r=this.renderable;if(r){var i=r.getElement();this._events.forEach((function(t){var e="__awxjs_".concat(t,"Handler");r[e]?i.removeEventListener(t,r[e]):r[e]=function(e){e.stopPropagation(),n.trigger(t,{data:n.data,marker:r})},i.addEventListener(t,r[e])})),r.addTo(t)}}},{key:"removeFromMap",value:function(t){var e=this.renderable;if(e){var n=e.getElement();this._events.forEach((function(t){var r="__awxjs_".concat(t,"Handler");e[r]&&n.removeEventListener(t,e.__awxjs_clickHandler)})),e.remove()}}}]),n}
(N);function mt(t){var e=function(){if("undefined"==typeof Reflect||!Reflect.construct)
return!1;if(Reflect.construct.sham)
return!1;if("function"==typeof Proxy)
return!0;try{return Date.prototype.toString.call(Reflect.construct(Date,[],(function(){}))),!0}catch(t){return!1}}
();return function(){var n,r=p()(t);if(e){var i=p()(this).constructor;n=Reflect.construct(r,arguments,i)}else
n=r.apply(this,arguments);return f()(this,n)}}
var gt=function(t){l()(n,t);var e=mt(n);function n(t,r,a){var o;i()(this,n);var s=(o=e.call(this,t,r,a)).animation,c=new ft(t,Object(O.extend)(a,{type:"image"}),"".concat(o.identifier,"-anim"));return null==s||s.on("show",(function(t){o.show()})),null==s||s.on("hide",(function(t){o.hide()})),null==s||s.on("load:image advance:image",(function(t){var e=t.data.img;e&&c.setImage(e.src)})),o._animationOverlay=c,o.on("overlay:ready",(function(){var t=Object(O.get)(a,"style.opacity"),e=Object(O.get)(a,"style.belowLayer");a.id&&(o._overlay.id=a.id,o._animationOverlay.id="".concat(a.id,"-anim")),Object(O.isset)(t)&&(o._overlay.setOpacity(t),o._animationOverlay.setOpacity(t)),o._overlay.parentId=e,o._animationOverlay.parentId=o._overlay.layerId})),o}
return o()(n,[{key:"show",value:function(){var t;!1!==this._hidden&&(this._hidden=!1,(null===(t=this.animation)||void 0===t?void 0:t.isAnimating())&&this._animationOverlay?this._animationOverlay.show():this.overlay&&this.overlay.show())}},{key:"hide",value:function(){!0!==this._hidden&&(this._hidden=!0,this.overlay&&this.overlay.hide(),this._animationOverlay&&this._animationOverlay.hide())}},{key:"remove",value:function(){this.trigger("layer:remove",{layer:this.overlay})}},{key:"setOpacity",value:function(t){var e;this._opacity=t,this.overlay&&this.overlay.setOpacity(t),this._animationOverlay&&this._animationOverlay.setOpacity(t),null===(e=this.animation)||void 0===e||e.setOpacity(t)}},{key:"setOrder",value:function(t){this.overlay&&this.overlay.setZIndex(t),this._animationOverlay&&this._animationOverlay.setZIndex(t)}},{key:"createOverlay",value:function(t){var e=arguments.length>1&&void 0!==arguments[1]?arguments[1]:{},n=new ft(this.key,Object(O.extend)(e,{type:"type"}),this.identifier);return n}},{key:"animationLayerForDate",value:function(t,e){var n=this,r=!(arguments.length>2&&void 0!==arguments[2])||arguments[2];return new Promise((function(t,i){if(n.dataSource){var a=n.dataSource.tileLayer(n.key,e,Object(O.extend)({},n._opts,{id:"".concat(n.identifier,"-anim-").concat(Object(X.mapTimestampFromDate)(e)),opacity:0,data:{service:n.service},animation:{enabled:!1}}));if(a.isAnimationFrame=!0,a.setOpacity(n._opacity,!1),a.hide(),r)
n.overlay.map.on("sourcedata",(function(e){var n=e||{},r=n.sourceId,i=n.isSourceLoaded;r===a.overlay.sourceId&&i&&t(a)}));else
t(a);a.on("layer:remove",(function(){n.trigger("layer:remove",{layer:a.overlay})})),n.trigger("layer:add",{layer:a.overlay})}else
i(new Error("No map strategy data source provided"))}))}},{key:"overlay",get:function(){return this._overlay}},{key:"timestamp",set:function(t){var e;this.enabled&&Object(O.isset)(t)&&(t=new Date(t.getFullYear(),t.getMonth(),t.getDate(),t.getHours(),t.getMinutes()),this._timestamp&&t.getTime()===this._timestamp.getTime()||(this._timestamp=t,!1===this.isAnimating()&&!1===this.isAnimationFrame&&(null===(e=this.animation)||void 0===e||e.hide(),this.updateVisibility()),!this.overlay||!this.canShow()&&this.overlay.exists()||this.overlay.setUrl(this.urlTemplate())))}}]),n}
(Q.a),kt=function(){function t(){i()(this,t)}
return o()(t,[{key:"tileLayer",value:function(t,e,n){return new gt(t,e,n)}},{key:"marker",value:function(t,e,n){return n&&n.skip&&!0===n.skip?null:new yt(e,void 0,{style:n})}},{key:"polygon",value:function(t,e,n){var r;return n&&(r=dt(n)),e.forEach((function(t){r.id||(r.id=t.id)})),new ct(t,e,r,r.id)}},{key:"polyline",value:function(t,e,n){var r;n&&n&&delete(r=dt(n)).fill;e.map((function(t){return[t.lat,t.lon]}));return new lt(t,e,r,r.id)}}]),t}
();function bt(t){var e=function(){if("undefined"==typeof Reflect||!Reflect.construct)
return!1;if(Reflect.construct.sham)
return!1;if("function"==typeof Proxy)
return!0;try{return Date.prototype.toString.call(Reflect.construct(Date,[],(function(){}))),!0}catch(t){return!1}}
();return function(){var n,r=p()(t);if(e){var i=p()(this).constructor;n=Reflect.construct(r,arguments,i)}else
n=r.apply(this,arguments);return f()(this,n)}}
var _t="2.0.0",Ot=function(t){l()(n,t);var e=bt(n);function n(t,r){var a;return i()(this,n),(a=e.call(this,t,Object(O.extend)({accessToken:null,style:"mapbox://styles/mapbox/streets-v9"},r)))._pointAnimationUpdates={},a._shapeDataById={},a._clickedMapLayer=!1,a}
return o()(n,[{key:"strategy",get:function(){return"mapbox"}},{key:"$el",get:function(){return Object(et.a)(this.map.getContainer())}}]),o()(n,[{key:"loadDependencies",value:function(){var t=document.createElement("style");return t.innerHTML=".mapboxgl-marker { line-height: 0; }",window.document.body.appendChild(t),new Promise((function(t,e){"undefined"==typeof mapboxgl||void 0===mapboxgl.Map?Promise.all([Object(O.loadStyles)("https://api.tiles.mapbox.com/mapbox-gl-js/v".concat(_t,"/mapbox-gl.css")),Object(O.loadScript)("https://api.tiles.mapbox.com/mapbox-gl-js/v".concat(_t,"/mapbox-gl.js"))]).then((function(){t()})):t()}))}},{key:"setupMap",value:function(t){var e=this;this._factory=new kt,this._eventMapping={load:"load",remove:"unload",resize:"resize",click:"click",dblclick:"dblclick",mousedown:"mousedown",mouseup:"mouseup",mouseover:"mouseover",mouseout:"mouseout",mousemove:"mousemove",zoom:"zoom",zoomstart:"zoom:start",zoomend:"zoom:end",move:"move",movestart:"move:start",moveend:"move:end"};var n=mapboxgl.version;if(n){var r=n.split("."),i=M()(r,2),a=i[0],o=i[1];if(a=parseInt(a,10),o=parseInt(o,10),0===a&&o<50)
throw new Error("AerisWeather SDK requires Mapbox GL JS version 0.50.0 or higher. You are using version ".concat(n,"."))}
var s=this.opts.map;if(s){var c=s.center,u=s.zoom;if(c&&Object(O.isArray)(c)){var l=M()(c,2),h=l[0],f=l[1];Object(O.isset)(f)&&Object(O.isset)(h)&&Object(O.set)(this.opts,"center",{lat:f,lon:h})}
u&&Object(O.set)(this.opts,"zoom",u)}
if(Object(X.isMapbox)(t))
this._setInitialView=!1,this._map=t,setTimeout((function(){e.trigger("map:ready")}),250);else{if(Object(O.isString)(t)&&(t=Object(et.a)(t)),Object(O.isArray)(t)&&t.length>0)
t=t[0];else if(Object(O.isDOM)(t)){t=t[0]}
if(mapboxgl.accessToken=this.opts.accessToken,this._map=new mapboxgl.Map(Object(O.extend)({},this.opts.map,{container:t,style:this.opts.style})),this._currentMapStyle=this.opts.style,!(!1===Object(O.get)(this.opts,"map.zoomControl"))){var d=new mapboxgl.NavigationControl;this._map.addControl(d,"bottom-left")}
Object(O.isset)(this.opts.center)||Object(O.set)(this.opts,"center",{lat:43,lon:-93}),Object(O.isset)(this.opts.zoom)||Object(O.set)(this.opts,"zoom",7),this.map.on("load",(function(){setTimeout((function(){e.trigger("map:ready")}),250)}))}}},{key:"setBaseStyle",value:function(t){if(t!==this._currentMapStyle){var e=this.map,n=e.getStyle(),r=n.layers.filter((function(t){return/^aeris-/.test(t.id)
                                                })),
                                        i = Object.keys(n.sources).filter((function (t) {
                                                    return /^aeris-/.test(t)
                                                })).reduce((function (t, e) {
                                                    return t[e] = n.sources[e],
                                                    t
                                                }), {});
                                        e.on("style.load", (function () {
                                                Object.keys(i).forEach((function (t) {
                                                        e.getSource(t) || e.addSource(t, i[t])
                                                    })),
                                                r.forEach((function (t) {
                                                        e.getLayer(t.id) || e.addLayer(t)
                                                    }))
                                            })),
                                        e.setStyle(t, {
                                            diff: !0
                                        })
                                    }
                                }
                            }, {
                                key: "setView",
                                value: function (t, e) {
                                    this.map.jumpTo({
                                        center: {
                                            lat: t.lat,
                                            lon: t.lon
                                        },
                                        zoom: Math.max(1, e - 1)
                                    })
                                }
                            }, {
                                key: "getCenter",
                                value: function () {
                                    var t = this._map.getCenter();
                                    return {
                                        lat: t.lat,
                                        lon: t.lng
                                    }
                                }
                            }, {
                                key: "setCenter",
                                value: function (t) {
                                    this._map.setCenter({
                                        lat: t.lat,
                                        lon: t.lon
                                    })
                                }
                            }, {
                                key: "getZoom",
                                value: function () {
                                    return this._map.getZoom() + 1
                                }
                            }, {
                                key: "setZoom",
                                value: function (t) {
                                    this._map.setZoom(Math.max(0, t - 1))
                                }
                            }, {
                                key: "getBounds",
                                value: function () {
                                    var t = this.map.getBounds();
                                    return {
                                        north: t.getNorth(),
                                        west: t.getWest(),
                                        south: t.getSouth(),
                                        east: t.getEast()
                                    }
                                }
                            }, {
                                key: "setBounds",
                                value: function (t) {
                                    var e = new mapboxgl.LngLat(t.west, t.south),
                                    n = new mapboxgl.LngLat(t.east, t.north);
                                    this.map.fitBounds(new mapboxgl.LngLatBounds(e, n))
                                }
                            }, {
                                key: "fitBounds",
                                value: function (t) {
                                    var e = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : [10, 10],
                                    n = new mapboxgl.LngLat(t.west, t.south),
                                    r = new mapboxgl.LngLat(t.east, t.north),
                                    i = new mapboxgl.LngLatBounds(n, r),
                                    a = {};
                                    1 === e.length ? a.padding = e[0] : 2 === e.length ? a.padding = {
                                        top: e[1],
                                        right: e[0],
                                        bottom: e[1],
                                        left: e[0]
                                    }
                                     : 4 === e.length && (a.padding = {
                                            top: e[0],
                                            right: e[1],
                                            bottom: e[2],
                                            left: e[3]
                                        }),
                                    this.map.fitBounds(i, a)
                                }
                            }, {
                                key: "isTile",
                                value: function (t) {
                                    return t instanceof gt
                                }
                            }, {
                                key: "isMarker",
                                value: function (t) {
                                    return (null == t ? void 0 : t.renderable) ? t.renderable instanceof mapboxgl.Marker : t instanceof mapboxgl.Marker
                                }
                            }, {
                                key: "isPolygon",
                                value: function (t) {
                                    return t instanceof ct
                                }
                            }, {
                                key: "isPolyline",
                                value: function (t) {
                                    return t instanceof lt
                                }
                            }, {
                                key: "addSource",
                                value: function (t) {
                                    b()(p()(n.prototype), "addSource", this).call(this, t),
                                    this.isTile(t) && t.updateVisibility()
                                }
                            }, {
                                key: "addOverlay",
                                value: function (t) {
                                    t instanceof ft && t.addTo(this.map)
                                }
                            }, {
                                key: "removeOverlay",
                                value: function (t) {
                                    t instanceof ft && t.remove()
                                }
                            }, {
                                key: "addMarker",
                                value: function (t, e) {
                                    var r = this;
                                    t instanceof yt ? (t.on("click", (function () {
                                                return r.trigger("marker:click", {
                                                    data: e,
                                                    marker: t
                                                })
                                            })), t.on("mouseover", (function () {
                                                return r.trigger("marker:mouseover", {
                                                    data: e,
                                                    marker: t
                                                })
                                            })), t.on("mouseout", (function () {
                                                return r.trigger("marker:mouseout", {
                                                    data: e,
                                                    marker: t
                                                })
                                            })), t.addTo(this.map)) : t instanceof mapboxgl.Marker && t.addTo(this.map),
                                    b()(p()(n.prototype), "addMarker", this).call(this, t, e)
                                }
                            }, {
                                key: "removeMarker",
                                value: function (t) {
                                    t instanceof yt ? (t.offAll(), t.remove()) : t instanceof mapboxgl.Marker && t.remove(),
                                    b()(p()(n.prototype), "removeMarker", this).call(this, t)
                                }
                            }, {
                                key: "updateMarker",
                                value: function (t, e) {
                                    Object(O.isset)(e) && t instanceof yt && t.update(e)
                                }
                            }, {
                                key: "addShape",
                                value: function (t, e) {
                                    var r = this;
                                    (t instanceof ct || t instanceof lt) && (t.on("click", (function () {
                                                return r.trigger("shape:click", {
                                                    data: e,
                                                    shape: t
                                                })
                                            })), t.on("mouseover", (function () {
                                                return r.trigger("shape:mouseover", {
                                                    data: e,
                                                    shape: t
                                                })
                                            })), t.on("mouseout", (function () {
                                                return r.trigger("shape:mouseout", {
                                                    data: e,
                                                    shape: t
                                                })
                                            })), t.addTo(this.map), this._shapeDataById[t.id] = e),
                                    b()(p()(n.prototype), "addShape", this).call(this, t, e)
                                }
                            }, {
                                key: "removeShape",
                                value: function (t) {
                                    (t instanceof ct || t instanceof lt) && (t.offAll(), t.remove()),
                                    b()(p()(n.prototype), "removeShape", this).call(this, t)
                                }
                            }, {
                                key: "showShape",
                                value: function (t) {
                                    this.isPolygon(t) || this.isPolyline(t) ? t.show() : b()(p()(n.prototype), "showShape", this).call(this, t)
                                }
                            }, {
                                key: "hideShape",
                                value: function (t) {
                                    this.isPolygon(t) || this.isPolyline(t) ? t.hide() : b()(p()(n.prototype), "hideShape", this).call(this, t)
                                }
                            }, {
                                key: "coordToPoint",
                                value: function (t) {
                                    var e = this.map.project({
                                        lat: t.lat,
                                        lng: t.lon
                                    });
                                    return {
                                        x: e.x,
                                        y: e.y
                                    }
                                }
                            }, {
                                key: "pointToCoord",
                                value: function (t) {
                                    var e = this.map.unproject([t.x, t.y]);
                                    return {
                                        lat: e.lat,
                                        lon: e.lng
                                    }
                                }
                            }, {
                                key: "showCallout",
                                value: function (t, e, n) {
                                    var r = new mapboxgl.Popup(n).setHTML(e);
                                    Object(X.isCoordObject)(t) ? r.setLngLat({
                                        lat: t.lat,
                                        lng: t.lon
                                    }).addTo(this.map) : this.isMarker(t) && (t.setPopup(r), t.togglePopup())
                                }
                            }, {
                                key: "_setupEvents",
                                value: function () {
                                    var t = this;
                                    this.map.on("movestart", (function (e) {
                                            ["before:change:bounds", "before:change:center"].forEach((function (e) {
                                                    return t.trigger(e)
                                                }))
                                        })),
                                    this.map.on("moveend", (function (e) {
                                            ["after:change:bounds", "after:change:center", "change:bounds", "change:center"].forEach((function (e) {
                                                    return t.trigger(e)
                                                }))
                                        })),
                                    this.map.on("zoomstart", (function (e) {
                                            ["before:change:zoom"].forEach((function (e) {
                                                    return t.trigger(e)
                                                }))
                                        })),
                                    this.map.on("zoomend", (function (e) {
                                            ["after:change:zoom", "change:zoom"].forEach((function (e) {
                                                    return t.trigger(e)
                                                }))
                                        })),
                                    b()(p()(n.prototype), "_setupEvents", this).call(this)
                                }
                            }, {
                                key: "_shouldTriggerEvent",
                                value: function (t) {
                                    return "click" !== t || !1 === this._clickedMapLayer
                                }
                            }, {
                                key: "_dataForMapEvent",
                                value: function (t, e) {
                                    if (!e)
                                        return null;
                                    var n = null;
                                    switch (t) {
                                    case "mouseover":
                                    case "mousemove":
                                    case "mousedown":
                                    case "mouseup":
                                    case "click":
                                    case "dblclick":
                                        n = {
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
                                    return n
                                }
                            }
                        ]),
                    n
                }
                (T),
                wt = n("lSNA"),
                jt = n.n(wt);
                function xt(t) {
                    var e = function () {
                        if ("undefined" == typeof Reflect || !Reflect.construct)
                            return !1;
                        if (Reflect.construct.sham)
                            return !1;
                        if ("function" == typeof Proxy)
                            return !0;
                        try {
                            return Date.prototype.toString.call(Reflect.construct(Date, [], (function () {}))),
                            !0
                        } catch (t) {
                            return !1
                        }
                    }
                    ();
                    return function () {
                        var n,
                        r = p()(t);
                        if (e) {
                            var i = p()(this).constructor;
                            n = Reflect.construct(r, arguments, i)
                        } else
                            n = r.apply(this, arguments);
                        return f()(this, n)
                    }
                }
                var Tt = function (t) {
                    l()(n, t);
                    var e = xt(n);
                    function n() {
                        return i()(this, n),
                        e.apply(this, arguments)
                    }
                    return o()(n, [{
                                key: "setOpacity",
                                value: function (t) {
                                    var e;
                                    b()(p()(n.prototype), "setOpacity", this).call(this, t),
                                    null === (e = this.renderable) || void 0 === e || e.setOpacity(t)
                                }
                            }, {
                                key: "setZIndex",
                                value: function (t) {
                                    var e;
                                    null === (e = this.renderable) || void 0 === e || e.setZIndex(t)
                                }
                            }, {
                                key: "exists",
                                value: function () {
                                    this.map;
                                    return !1
                                }
                            }, {
                                key: "invalidate",
                                value: function () {}
                            }, {
                                key: "createRenderable",
                                value: function () {}
                            }, {
                                key: "updateVisibility",
                                value: function (t) {
                                    var e;
                                    null === (e = this.renderable) || void 0 === e || e.setVisible(t)
                                }
                            }, {
                                key: "addToMap",
                                value: function (t, e) {
                                    this._targetIndex = e,
                                    this.renderable ? e >= 0 ? t.getLayers().insertAt(e, this.renderable) : t.addLayer(this.renderable) : this.invalidate()
                                }
                            }, {
                                key: "removeFromMap",
                                value: function (t) {
                                    this.renderable && t.removeLayer(this.renderable)
                                }
                            }
                        ]),
                    n
                }
                (P);
                function St(t) {
                    var e = function () {
                        if ("undefined" == typeof Reflect || !Reflect.construct)
                            return !1;
                        if (Reflect.construct.sham)
                            return !1;
                        if ("function" == typeof Proxy)
                            return !0;
                        try {
                            return Date.prototype.toString.call(Reflect.construct(Date, [], (function () {}))),
                            !0
                        } catch (t) {
                            return !1
                        }
                    }
                    ();
                    return function () {
                        var n,
                        r = p()(t);
                        if (e) {
                            var i = p()(this).constructor;
                            n = Reflect.construct(r, arguments, i)
                        } else
                            n = r.apply(this, arguments);
                        return f()(this, n)
                    }
                }
                var Mt = function (t) {
                    l()(n, t);
                    var e = St(n);
                    function n(t, r) {
                        var a,
                        o = arguments.length > 2 && void 0 !== arguments[2] ? arguments[2] : {},
                        s = arguments.length > 3 && void 0 !== arguments[3] ? arguments[3] : void 0;
                        return i()(this, n),
                        (a = e.call(this, t, o, s))._polygons = r,
                        a
                    }
                    return o()(n, [{
                                key: "invalidate",
                                value: function () {
                                    if (this.createRenderable(), this.map) {
                                        var t = this.map;
                                        this.remove(),
                                        this.addTo(t, this._targetIndex)
                                    }
                                }
                            }, {
                                key: "createRenderable",
                                value: function () {
                                    var t,
                                    e = this.opts,
                                    n = e.stroke,
                                    r = e.fill,
                                    i = this._polygons.length > 1,
                                    a = (this._polygons || []).map((function (e) {
                                            !Object(O.isset)(t) && Object(O.isset)(e.id) && (t = e.id);
                                            var n = e.outer.map((function (t) {
                                                        return [t.lon, t.lat]
                                                    })),
                                            r = e.inner ? e.inner.map((function (t) {
                                                        return t.map((function (t) {
                                                                return [t.lon, t.lat]
                                                            }))
                                                    })) : [];
                                            return [n].concat(R()(r))
                                        }));
                                    return this.source = new ol.source.Vector({
                                        features: (new ol.format.GeoJSON).readFeatures({
                                            type: "FeatureCollection",
                                            features: [{
                                                    type: "Feature",
                                                    properties: {
                                                        id: t
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
                                            stroke: n ? new ol.style.Stroke(n) : null,
                                            fill: r ? new ol.style.Fill(r) : null
                                        })
                                    })
                                }
                            }
                        ]),
                    n
                }
                (Tt);
                function Lt(t) {
                    var e = function () {
                        if ("undefined" == typeof Reflect || !Reflect.construct)
                            return !1;
                        if (Reflect.construct.sham)
                            return !1;
                        if ("function" == typeof Proxy)
                            return !0;
                        try {
                            return Date.prototype.toString.call(Reflect.construct(Date, [], (function () {}))),
                            !0
                        } catch (t) {
                            return !1
                        }
                    }
                    ();
                    return function () {
                        var n,
                        r = p()(t);
                        if (e) {
                            var i = p()(this).constructor;
                            n = Reflect.construct(r, arguments, i)
                        } else
                            n = r.apply(this, arguments);
                        return f()(this, n)
                    }
                }
                var It = function (t) {
                    l()(n, t);
                    var e = Lt(n);
                    function n(t, r) {
                        var a,
                        o = arguments.length > 2 && void 0 !== arguments[2] ? arguments[2] : {},
                        s = arguments.length > 3 && void 0 !== arguments[3] ? arguments[3] : void 0;
                        return i()(this, n),
                        (a = e.call(this, t, o, s))._points = r,
                        a
                    }
                    return o()(n, [{
                                key: "invalidate",
                                value: function () {
                                    if (this.createRenderable(), this.map) {
                                        var t = this.map;
                                        this.remove(),
                                        this.addTo(t, this._targetIndex)
                                    }
                                }
                            }, {
                                key: "createRenderable",
                                value: function () {
                                    var t = this.opts.stroke,
                                    e = this._points.map((function (t) {
                                                return ol.proj.transform([t.lon, t.lat], "EPSG:4326", "EPSG:3857")
                                            })),
                                    n = new ol.Feature({
                                        properties: {
                                            id: this.id
                                        },
                                        geometry: new ol.geom.LineString(e)
                                    });
                                    return this.source = new ol.source.Vector,
                                    this.source.addFeature(n),
                                    new ol.layer.Vector({
                                        source: this.source,
                                        style: new ol.style.Style({
                                            stroke: t ? new ol.style.Stroke(t) : null
                                        })
                                    })
                                }
                            }
                        ]),
                    n
                }
                (Tt);
                function Rt(t) {
                    var e = function () {
                        if ("undefined" == typeof Reflect || !Reflect.construct)
                            return !1;
                        if (Reflect.construct.sham)
                            return !1;
                        if ("function" == typeof Proxy)
                            return !0;
                        try {
                            return Date.prototype.toString.call(Reflect.construct(Date, [], (function () {}))),
                            !0
                        } catch (t) {
                            return !1
                        }
                    }
                    ();
                    return function () {
                        var n,
                        r = p()(t);
                        if (e) {
                            var i = p()(this).constructor;
                            n = Reflect.construct(r, arguments, i)
                        } else
                            n = r.apply(this, arguments);
                        return f()(this, n)
                    }
                }
                var Et = function (t) {
                    l()(n, t);
                    var e = Rt(n);
                    function n() {
                        var t;
                        return i()(this, n),
                        (t = e.apply(this, arguments))._loadCounter = {
                            loading: 0,
                            loaded: 0
                        },
                        t
                    }
                    return o()(n, [{
                                key: "setUrl",
                                value: function (t) {
                                    this.opts.url = t,
                                    this.map && this.invalidate()
                                }
                            }, {
                                key: "setBounds",
                                value: function (t) {
                                    this.opts.bounds = t
                                }
                            }, {
                                key: "invalidate",
                                value: function () {
                                    var t = this.map;
                                    this.remove(),
                                    this.createRenderable(),
                                    t && this.addTo(t, this._targetIndex)
                                }
                            }, {
                                key: "createRenderable",
                                value: function () {
                                    var t = this;
                                    this._loadCounter = {
                                        loading: 0,
                                        loaded: 0
                                    };
                                    var e = new ol.source.XYZ({
                                        url: this.opts.url,
                                        attributions: this.opts.attribution ? [this.opts.attribution] : null
                                    });
                                    e.on("tileloadstart", (function (e) {
                                            t._loadCounter.loading += 1
                                        })),
                                    e.on(["tileloadend", "tileloaderror"], (function (e) {
                                            t._loadCounter.loaded += 1,
                                            t._loadCounter.loaded === t._loadCounter.loading && t.trigger("load")
                                        })),
                                    this._source = e;
                                    var n = new ol.layer.Tile({
                                        source: this._source
                                    });
                                    return n.setOpacity(this.isHidden ? 0 : this.opacity),
                                    n
                                }
                            }
                        ]),
                    n
                }
                (Tt),
                Pt = n("2dk7"),
                Dt = function (t) {
                    if (t.html && console.warn("awxjs - HTML markers are not currently supported with OpenLayers"), t.svg) {
                        var e = t.size || [12, 12],
                        n = M()(e, 2),
                        r = n[0],
                        i = n[1];
                        if (t.svg.text) {
                            var a = t.svg.text;
                            if (Object(O.isArray)(a))
                                a.forEach((function (t) {
                                        if (t.autosize) {
                                            var e = q.calculateTextSize(t.value, t.size),
                                            n = M()(e, 2);
                                            r = n[0],
                                            i = n[1]
                                        }
                                    }));
                            else {
                                var o = a;
                                if (o.autosize) {
                                    var s = q.calculateTextSize(o.value, o.size),
                                    c = M()(s, 2);
                                    r = c[0],
                                    i = c[1]
                                }
                            }
                        }
                        i += 3;
                        var u = q.draw(r, i, t.svg);
                        return new ol.style.Icon({
                            src: "data:image/svg+xml;base64,".concat(btoa(u)),
                            size: [r, i],
                            imgSize: [r, i],
                            crossOrigin: "anonymous"
                        })
                    }
                    if (t.icon) {
                        var l = t.icon;
                        return new ol.style.Icon({
                            src: l.url,
                            size: t.size,
                            imgSize: t.size,
                            anchor: l.anchor,
                            crossOrigin: "anonymous"
                        })
                    }
                    return null
                },
                zt = function () {
                    function t(e) {
                        if (i()(this, t), document) {
                            var n = Object(et.a)('<div class="aeris__openlayers__popup"></div>');
                            this._container = n,
                            this._overlay = new ol.Overlay({
                                insertFirst: !0,
                                element: n[0],
                                autoPan: !0,
                                autoPanAnimation: {
                                    duration: 250,
                                    source: null
                                }
                            }),
                            e && this.setCoordinate(e)
                        }
                    }
                    return o()(t, [{
                                key: "addTo",
                                value: function (t) {
                                    this._map = t,
                                    t.addOverlay(this._overlay);
                                    var e = this._container.width();
                                    e > 0 && this._container.css({
                                        marginLeft: "-".concat(Math.round(e / 2), "px")
                                    })
                                }
                            }, {
                                key: "remove",
                                value: function () {
                                    this._map && this._map.removeOverlay(this._overlay)
                                }
                            }, {
                                key: "setCoordinate",
                                value: function (t) {
                                    var e = ol.proj.fromLonLat([t.lon, t.lat]),
                                    n = M()(e, 2),
                                    r = n[0],
                                    i = n[1];
                                    this._overlay.setPosition([Math.round(r), Math.round(i)])
                                }
                            }, {
                                key: "setHTML",
                                value: function (t) {
                                    this._container.html(t)
                                }
                            }, {
                                key: "setDOMContent",
                                value: function (t) {
                                    this._container.empty().append(t)
                                }
                            }
                        ], [{
                                key: "injectStyles",
                                value: function () {
                                    Object(et.a)("head").append('<style type="text/css">'.concat("\n\t\t\t.aeris__openlayers__popup{\n\t\t\t\tbackground:#fff;\n\t\t\t\tborder-radius:6px;\n\t\t\t\tbottom:100%;\n\t\t\t\tcolor:#222;\n\t\t\t\tdisplay:block;\n\t\t\t\tfilter:drop-shadow(0 1px 4px rgba(0,0,0,0.2));\n\t\t\t\tfont-family:'Helvetica','Arial',sans-serif;\n\t\t\t\tfont-size:13px;\n\t\t\t\tfont-weight:normal;\n\t\t\t\tleft:50%;\n\t\t\t\tline-height:14px;\n\t\t\t\tmargin-bottom:15px;\n\t\t\t\tmargin-left:-100px;\n\t\t\t\tmin-width:120px;\n\t\t\t\tpadding:8px 10px;\n\t\t\t\tpointer-events:none;\n\t\t\t\tposition:absolute;\n\t\t\t\ttransition:opacity.2s ease-out;\n\t\t\t\tz-index:10000;\n\t\t\t\t-webkit-font-smoothing:antialiased\n\t\t\t}\n\n\t\t\t.aeris__openlayers__popup:after{\n\t\t\t\tborder-left:solid transparent 10px;\n\t\t\t\tborder-right:solid transparent 10px;\n\t\t\t\tborder-top:solid#fff 10px;\n\t\t\t\tbottom:-10px;\n\t\t\t\tcontent:\" \";\n\t\t\t\theight: 0;\n\t\t\t\tleft: 50%;\n\t\t\t\tmargin-left: -9px;\n\t\t\t\tposition: absolute;\n\t\t\t\twidth: 0\n\t\t\t}\n\t\t","</style>"))}}]),t}
();function At(t){var e=function(){if("undefined"==typeof Reflect||!Reflect.construct)
return!1;if(Reflect.construct.sham)
return!1;if("function"==typeof Proxy)
return!0;try{return Date.prototype.toString.call(Reflect.construct(Date,[],(function(){}))),!0}catch(t){return!1}}
();return function(){var n,r=p()(t);if(e){var i=p()(this).constructor;n=Reflect.construct(r,arguments,i)}else
n=r.apply(this,arguments);return f()(this,n)}}
var Ft=function(t){l()(n,t);var e=At(n);function n(){return i()(this,n),e.apply(this,arguments)}
return o()(n,[{key:"update",value:function(t){var e;if(Object(O.isset)(t)){var n=null===(e=t.data)||void 0===e?void 0:e.value,r=t.style||{};Object(O.isFunction)(r)&&(r=r({value:n})),this.setStyle(r)}}},{key:"setStyle",value:function(t){var e=Dt(t);this.feature&&e&&this.feature.setStyle(new ol.style.Style({image:e}))}},{key:"setPopup",value:function(t){this._popup=t}},{key:"createRenderable",value:function(){var t,e=this.opts.style,n=this.coordinate;if(e&&(t=Dt(e),e.callout)){var r=e.callout;if(Object(O.isFunction)(e.callout))
r=(0,e.callout)();var i=new zt(n);i.setHTML(r),this._popup=i}
return this._feature=new ol.Feature({geometry:new ol.geom.Point(ol.proj.fromLonLat([n.lon,n.lat]))}),new ol.layer.Vector({source:new ol.source.Vector({features:[this.feature]}),style:new ol.style.Style({image:t}),zIndex:e?e.zIndex:null})}},{key:"updateVisibility",value:function(t){}},{key:"addToMap",value:function(t,e){var n=this,r=this.renderable;r&&["click","mouseover","mouseout"].forEach((function(e){var i="__awxjs_".concat(e,"Handler");r[i]?r.un(e,r[i]):(r[i]=function(i){n.trigger(e,{data:n.data,marker:r}),n.popup&&(n._activePopup&&n._activePopup.remove(),n.popup.addTo(t),n._activePopup=n.popup)},r.on("marker:click",r[i]))})),t.addLayer(this.renderable)}},{key:"removeFromMap",value:function(t){var e=this.renderable;e&&["click","mouseover","mouseout"].forEach((function(t){var n="__awxjs_".concat(t,"Handler");e[n]&&e.un(t,e[n])})),t.removeLayer(this.renderable)}},{key:"feature",get:function(){return this._feature}},{key:"popup",get:function(){return this._popup}}]),n}
(N);function Ct(t){var e=function(){if("undefined"==typeof Reflect||!Reflect.construct)
return!1;if(Reflect.construct.sham)
return!1;if("function"==typeof Proxy)
return!0;try{return Date.prototype.toString.call(Reflect.construct(Date,[],(function(){}))),!0}catch(t){return!1}}
();return function(){var n,r=p()(t);if(e){var i=p()(this).constructor;n=Reflect.construct(r,arguments,i)}else
n=r.apply(this,arguments);return f()(this,n)}}
var Bt=function(t){l()(n,t);var e=Ct(n);function n(){return i()(this,n),e.apply(this,arguments)}
return o()(n,[{key:"show",value:function(){!1!==this._hidden&&(this._hidden=!1,this.overlay&&(this.overlay.setOpacity(this._opacity),this.overlay.show()))}},{key:"hide",value:function(){!0!==this._hidden&&(this._hidden=!0,this.overlay&&this.overlay.hide())}},{key:"remove",value:function(){this.trigger("layer:remove",{layer:this.overlay})}},{key:"setOpacity",value:function(t){var e=!(arguments.length>1&&void 0!==arguments[1])||arguments[1];this._opacity=t,this._hidden&&(t=0),this.overlay&&!0===e&&this.overlay.setOpacity(t),this.animation&&this.animation.setOpacity(t)}},{key:"setOrder",value:function(t){this.overlay&&this.overlay.setZIndex(t)}},{key:"createOverlay",value:function(t){var e=arguments.length>1&&void 0!==arguments[1]?arguments[1]:{},n=new Et(this.key,{type:"tile",attribution:e.attribution},this.identifier);return n}},{key:"animationLayerForDate",value:function(t,e){var n=this,r=!(arguments.length>2&&void 0!==arguments[2])||arguments[2];return new Promise((function(t,i){if(n.dataSource){var a=n.dataSource.tileLayer(n.key,e,Object(O.extend)(Object(O.cloneDeep)(n._opts),{id:"".concat(n.identifier,"-anim-").concat(Object(X.mapTimestampFromDate)(e)),data:{service:n.service},animation:{enabled:!1}}));a.isAnimationFrame=!0,a.setOpacity(n._opacity,!0),a.hide(),!1===r&&t(a),a.overlay.on("load",(function(){r&&t(a),a.setOpacity(n._opacity,!0)})),a.on("layer:remove",(function(){n.trigger("layer:remove",{layer:a.overlay})})),n.trigger("layer:add",{layer:a.overlay,relativeTo:n.overlay.renderable,offset:1})}else
i(new Error("No map strategy data source provided"))}))}},{key:"overlay",get:function(){return this._overlay}},{key:"timestamp",set:function(t){if(this.enabled&&Object(O.isset)(t)&&(t=new Date(t.getFullYear(),t.getMonth(),t.getDate(),t.getHours(),t.getMinutes()),(!this._timestamp||t.getTime()!==this._timestamp.getTime())&&(this._timestamp=t,!1===this.isAnimating()&&!1===this.isAnimationFrame&&(this.animation.hide(),this.updateVisibility()),this.overlay&&!1===this.overlay.isHidden&&this.canShow()))){var e=this.urlTemplate();if(e){var n=this.service.range(),r=n.filter((function(t,e){return 0===e||e===n.length-1})).join("-");e=e.replace(/\{s\}/,"{".concat(r,"}"))}
this.overlay.setUrl(e)}}}]),n}
(Q.a),Vt=n("ad4Q"),qt=function(){function t(){i()(this,t)}
return o()(t,[{key:"tileLayer",value:function(t,e,n){return new Bt(t,e,n)}},{key:"marker",value:function(t,e,n){return n&&n.skip&&!0===n.skip?null:new Ft(e,null,{style:n})}},{key:"markerIcon",value:function(t){if(t.html&&console.warn("awxjs - HTML markers are not currently supported with OpenLayers"),t.svg){var e=t.size||[12,12],n=M()(e,2),r=n[0],i=n[1];if(t.svg.text){var a=t.svg.text;if(Object(O.isArray)(a))
a.forEach((function(t){if(t.autosize){var e=q.calculateTextSize(t.value,t.size),n=M()(e,2);r=n[0],i=n[1]}}));else{var o=a;if(o.autosize){var s=q.calculateTextSize(o.value,o.size),c=M()(s,2);r=c[0],i=c[1]}}}
i+=3;var u=q.draw(r,i,t.svg);return new ol.style.Icon({src:"data:image/svg+xml;base64,".concat(btoa(u)),size:[r,i],imgSize:[r,i],crossOrigin:"anonymous"})}
if(t.icon){var l=t.icon;return new ol.style.Icon({src:l.url,size:t.size,imgSize:t.size,anchor:l.anchor,crossOrigin:"anonymous"})}
return null}},{key:"polygon",value:function(t,e,n){var r;if(n){if((r={stroke:null,fill:null}).id=n.id,n.stroke){var i=Object(Pt.toRGB)(n.stroke.color),a=i.r,o=i.g,s=i.b;r.stroke={color:"rgba(".concat(a,", ").concat(o,", ").concat(s,", ").concat(n.stroke.opacity||1,")"),width:n.stroke.width,lineCap:n.stroke.lineCap,lineJoin:n.stroke.lineJoin,lineDash:n.stroke.dashArray,lineDashOffset:n.stroke.dashOffset}}
if(n.fill){var c=Object(Pt.toRGB)(n.fill.color),u=c.r,l=c.g,h=c.b;r.fill={color:"rgba(".concat(u,", ").concat(l,", ").concat(h,", ").concat(Object(O.isset)(n.fill.opacity)?n.fill.opacity:1,")")}}}
return e.forEach((function(t){r.id||(r.id=t.id)})),new Mt(t,e,r)}},{key:"polyline",value:function(t,e,n){var r;if(n&&((r={stroke:null,fill:null}).id=n.id,n.stroke)){var i=Object(Pt.toRGB)(n.stroke.color),a=i.r,o=i.g,s=i.b;r.stroke={color:"rgba(".concat(a,", ").concat(o,", ").concat(s,", ").concat(n.stroke.opacity||1,")"),width:n.stroke.width,lineCap:n.stroke.lineCap,lineJoin:n.stroke.lineJoin,lineDash:n.stroke.dashArray,lineDashOffset:n.stroke.dashOffset}}
return new It(t,e,r)}}]),t}
();function Wt(t){var e=function(){if("undefined"==typeof Reflect||!Reflect.construct)
return!1;if(Reflect.construct.sham)
return!1;if("function"==typeof Proxy)
return!0;try{return Date.prototype.toString.call(Reflect.construct(Date,[],(function(){}))),!0}catch(t){return!1}}
();return function(){var n,r=p()(t);if(e){var i=p()(this).constructor;n=Reflect.construct(r,arguments,i)}else
n=r.apply(this,arguments);return f()(this,n)}}
var Nt=function(t){l()(n,t);var e=Wt(n);function n(){var t;return i()(this,n),(t=e.apply(this,arguments))._hasLoaded=!1,t._clickedMapLayer=!1,t._shapeDataById={},t}
return o()(n,[{key:"loadDependencies",value:function(){return new Promise((function(t,e){if("undefined"==typeof ol||void 0===ol.Map){var n="6.5.0";Promise.all([Object(O.loadStyles)("https://openlayers.org/en/v".concat(n,"/css/ol.css")),Object(O.loadScript)("https://cdn.rawgit.com/openlayers/openlayers.github.io/master/en/v".concat(n,"/build/ol.js"))]).then((function(){t()}))}else
t()}))}},{key:"setupMap",value:function(t){var e=this;this._factory=new qt,this._eventMapping={unload:"unload",resize:"resize",dblclick:"dblclick",pointermove:"mousemove",zoom:"zoom",zoomstart:"zoom:start",zoomend:"zoom:end",movestart:"move:start",moveend:"move:end",popupopen:"popupopen",popupclose:"popupclose"},zt.injectStyles();var n=Object(O.get)(this.opts,"map.view");if(n&&n instanceof ol.View){var r=ol.proj.toLonLat(n.getCenter()),i=M()(r,2),a=i[0],o=i[1];Object(O.isset)(o)&&Object(O.isset)(a)&&Object(O.set)(this.opts,"center",{lat:o,lon:a}),Object(O.set)(this.opts,"zoom",n.getZoom())}
if(Object(X.isOpenLayers)(t))
this._setInitialView=!1,this._map=t;else{if(Object(O.isString)(t)&&(t=Object(et.a)(t)),Object(O.isArray)(t)&&t.length>0)
t=t[0];else if(Object(O.isDOM)(t)){t=t[0]}
var s=Object(O.extend)({layers:[new ol.layer.Tile({source:new ol.source.OSM})]},this.opts.map);s.target=t,this._map=new ol.Map(s),Object(et.a)("head").append("<style>.ol-zoom { top: auto; bottom: .5em; }</style>"),Object(O.isset)(this.opts.center)||Object(O.set)(this.opts,"center",{lat:43,lon:-93}),Object(O.isset)(this.opts.zoom)||Object(O.set)(this.opts,"zoom",7)}
setTimeout((function(){e.trigger("map:ready")}),250)}},{key:"setBaseStyle",value:function(t){var e=this.map.getLayers().item(0);this.map.removeLayer(e),this.map.getLayers().insertAt(0,new ol.layer.Tile({source:Object(O.isset)(t)?new ol.source.XYZ({url:t.replace(/\{s\}/,"1")}):new ol.source.OSM}))}},{key:"setBaseUrl",value:function(t){this.setBaseStyle(t)}},{key:"setView",value:function(t,e){this.map.setView(new ol.View({center:ol.proj.fromLonLat([t.lon,t.lat]),zoom:e}))}},{key:"getCenter",value:function(){var t=ol.proj.toLonLat(this.map.getView().getCenter()),e=M()(t,2),n=e[0];return{lat:e[1],lon:n}}},{key:"setCenter",value:function(t){this.map.getView().setCenter(ol.proj.fromLonLat([t.lon,t.lat]))}},{key:"getZoom",value:function(){return this.map.getView().getZoom()}},{key:"setZoom",value:function(t){this.map.getView().setZoom(t)}},{key:"getBounds",value:function(){var t=this.map.getView().calculateExtent(this.map.getSize()),e=ol.proj.transformExtent(t,"EPSG:3857","EPSG:4326"),n=M()(e,4),r=n[0],i=n[1],a=n[2];return{north:n[3],west:r,south:i,east:a}}},{key:"setBounds",value:function(t){var e=ol.proj.fromLonLat([t.west,t.south]),n=M()(e,2),r=n[0],i=n[1],a=ol.proj.fromLonLat([t.east,t.north]),o=M()(a,2),s=[r,i,o[0],o[1]];this.map.getView().fit(s)}},{key:"fitBounds",value:function(t){var e,n=arguments.length>1&&void 0!==arguments[1]?arguments[1]:[10,10],r=ol.proj.fromLonLat([t.west,t.south]),i=M()(r,2),a=i[0],o=i[1],s=ol.proj.fromLonLat([t.east,t.north]),c=M()(s,2),u=c[0],l=c[1],h=[a,o,u,l];1===n.length?e=[n[0],n[0],n[0],n[0]]:2===n.length?e=[n[1],n[0],n[1],n[0]]:4===n.length&&(e=[n[0],n[1],n[2],n[3]]),this.map.getView().fit(h,{padding:e})}},{key:"isTile",value:function(t){return t instanceof Bt}},{key:"isMarker",value:function(t){return t instanceof Ft}},{key:"isPolygon",value:function(t){return t instanceof Mt}},{key:"isPolyline",value:function(t){return t instanceof It}},{key:"addOverlay",value:function(t,e){t instanceof Et?t.addTo(this.map,e):(t instanceof ol.layer.Base||t instanceof ol.layer.Tile)&&(e?this.map.getLayers().insertAt(e,t):this.map.addLayer(t))}},{key:"removeOverlay",value:function(t){t instanceof Et?t.remove():(t instanceof ol.layer.Base||t instanceof ol.layer.Tile)&&this.map.removeLayer(t)}},{key:"addMarker",value:function(t,e){var r=this;if(t instanceof Ft)
this.containsLayer(t.renderable)||(t.on("click",(function(){return r.trigger("marker:click",{data:e,marker:t})})),t.on("mouseover",(function(){return r.trigger("marker:mouseover",{data:e,marker:t})})),t.on("mouseout",(function(){return r.trigger("marker:mouseout",{data:e,marker:t})})),t.addTo(this.map));else if(t instanceof ol.layer.Vector)
return void(this.containsLayer(t)||this.map.addLayer(t));b()(p()(n.prototype),"addMarker",this).call(this,t,e)}},{key:"removeMarker",value:function(t){t instanceof Ft?(t.offAll(),t.remove()):t instanceof ol.layer.Vector&&this.map.removeLayer(t),b()(p()(n.prototype),"removeMarker",this).call(this,t)}},{key:"updateMarker",value:function(t,e){var r=arguments.length>2&&void 0!==arguments[2]?arguments[2]:null;e&&(t instanceof Ft&&t.update(e),b()(p()(n.prototype),"updateMarker",this).call(this,t,e,r))}},{key:"showMarkers",value:function(t,e){var n=this;t.forEach((function(t){n.isMarker(t)&&(t=t.layer),t instanceof ol.layer.Vector&&t.setVisible(e)}))}},{key:"addShape",value:function(t,e){var r=this;if((t instanceof Mt||t instanceof It)&&!this.containsLayer(t.renderable)){var i=this.getIndexBoundForGeom("point",!0);t.on("click",(function(){return r.trigger("shape:click",{data:e,shape:t})})),t.on("mouseover",(function(){return r.trigger("shape:mouseover",{data:e,shape:t})})),t.on("mouseout",(function(){return r.trigger("shape:mouseout",{data:e,shape:t})})),t.addTo(this.map,i),this._shapeDataById[t.id]=e}
b()(p()(n.prototype),"addShape",this).call(this,t,e)}},{key:"removeShape",value:function(t){(t instanceof Mt||t instanceof It)&&(t.offAll(),t.remove()),b()(p()(n.prototype),"removeShape",this).call(this,t)}},{key:"showShape",value:function(t){this.addShape(t)}},{key:"hideShape",value:function(t){this.removeShape(t)}},{key:"containsLayer",value:function(t){return-1!==this.map.getLayers().getArray().indexOf(t)}},{key:"coordToPoint",value:function(t){if(!Object(O.isset)(t))
return null;var e=this.map.getPixelFromCoordinate(ol.proj.fromLonLat([t.lon,t.lat]));if(e){var n=M()(e,2);return{x:n[0],y:n[1]}}
return null}},{key:"pointToCoord",value:function(t){if(!Object(O.isset)(t))
return null;var e=this.map.getCoordinateFromPixel(ol.proj.toLonLat([t.x,t.y]));if(e){var n=M()(e,2),r=n[0];return{lat:n[1],lon:r}}
return null}},{key:"getInsertIndex",value:function(t,e){var n=this.map.getLayers().getArray(),r=n.indexOf(t);return-1!==r?Math.max(0,r+e):n.length}},{key:"getIndexBoundForGeom",value:function(t){var e=arguments.length>1&&void 0!==arguments[1]&&arguments[1],n=0,r=this.map.getLayers().getArray();return r.forEach((function(r,i){if(r instanceof ol.layer.Vector){var a=r.getSource().getFeatures();if(a&&a.length>0)
a[0].getGeometry().getType().toLowerCase()===t.toLowerCase()&&(n=e?Math.min(n,i):Math.max(n,i))}})),Math.max(1,n)}},{key:"showCallout",value:function(t,e,n){var r=new zt;if(r.setHTML(e),Object(X.isCoordObject)(t))
r.setCoordinate(t);else if(this.isMarker(t))
r.setCoordinate(t.coordinate);else if(t instanceof ol.Feature){var i=t.getGeometry();if(i instanceof ol.geom.Point){var a=i.getCoordinates(),o=M()(a,2),s=o[0],c=o[1];r.setCoordinate({lat:c,lon:s})}}
this._activePopup&&this._activePopup.remove(),this._activePopup=r,r.addTo(this.map)}},{key:"_setupEvents",value:function(){var t=this;b()(p()(n.prototype),"_setupEvents",this).call(this);["mouseover","mouseout","mousedown","mouseup"].forEach((function(e){t.map.getTargetElement().addEventListener(e,(function(n){var r=function(e){var n=t.map.getEventPixel(e),r=t.map.getEventCoordinate(e);return{pixel:n,coord:r?ol.proj.toLonLat(r):[null,null]}}
(n),i=r.pixel,a=r.coord;t.trigger(e,{coord:{lat:a[1],lon:a[0]},point:{x:i[0],y:i[1]}})}))})),this.map.on("rendercomplete",(function(){!1===t._hasLoaded&&(t._hasLoaded=!0,t.trigger("load"))})),this.map.on("click",(function(e){var n=!1,r=!1;t.map.forEachFeatureAtPixel(e.pixel,(function(e,i){if(!r){var a=e.getGeometry(),o=e.getProperties(),s=(Object(O.get)(o,"id")||Object(O.get)(o,"properties.id")||"").replace(/^aeriswx-/,"");if(a instanceof ol.geom.Point)
n=!0,i.dispatchEvent(new Vt.a("marker:click")),r=!0;else if(a instanceof ol.geom.SimpleGeometry){var c=t._shapeDataById[s];t.trigger("shape:click",{shape:e,data:c}),r=!0}}}),{hitTolerance:10}),r?(t._clickedMapLayer=!0,setTimeout((function(){t._clickedMapLayer=!1}),100)):t.trigger("click",t._dataForMapEvent("click",e)),!n&&t._activePopup&&t._activePopup.remove()})),this.map.on("moveend",(function(e){t.trigger("change:bounds"),t.trigger("change:center")})),this.map.on("zoomend",(function(e){t.trigger("change:zoom")}));var e=function(){if(t._hoveredMapLayer){var e,n=t._hoveredMapLayer,r=n.type,i=n.feature;t.trigger("".concat(r,":mouseout"),(e={},jt()(e,r,i),jt()(e,"data",null),e)),t._hoveredMapLayer=void 0}};this.map.on("pointermove",(function(n){var r=!1;t.map.forEachFeatureAtPixel(n.pixel,(function(n,i){var a,o;if(!r){var s=n.getGeometry(),c=n.getProperties(),u=(Object(O.get)(c,"id")||Object(O.get)(c,"properties.id")||"").replace(/^aeriswx-/,"");if(s instanceof ol.geom.Point)
r=!0,n!==(null===(a=t._hoveredMapLayer)||void 0===a?void 0:a.feature)&&(e(),t.trigger("marker:mouseover",{marker:n,data:null}),t._hoveredMapLayer={type:"marker",feature:n});else if(s instanceof ol.geom.SimpleGeometry&&(r=!0,n!==(null===(o=t._hoveredMapLayer)||void 0===o?void 0:o.feature))){e();var l=t._shapeDataById[u];t.trigger("shape:mouseover",{shape:n,data:l}),t._hoveredMapLayer={type:"shape",feature:n}}}})),r||e()}))}},{key:"_shouldTriggerEvent",value:function(t){return"click"!==t||!1===this._clickedMapLayer}},{key:"_dataForMapEvent",value:function(t,e){if(!e)
return null;var n,r=null;switch(t){case"pointermove":case"click":case"dblclick":r={coord:{lat:(n=ol.proj.toLonLat(e.coordinate))[1],lon:n[0]},point:{x:e.pixel[0],y:e.pixel[1]}}}
return r}},{key:"strategy",get:function(){return"openlayers"}},{key:"$el",get:function(){return Object(et.a)(this.map.getTarget())}}]),n}
(T);function Zt(t){var e=function(){if("undefined"==typeof Reflect||!Reflect.construct)
return!1;if(Reflect.construct.sham)
return!1;if("function"==typeof Proxy)
return!0;try{return Date.prototype.toString.call(Reflect.construct(Date,[],(function(){}))),!0}catch(t){return!1}}
();return function(){var n,r=p()(t);if(e){var i=p()(this).constructor;n=Reflect.construct(r,arguments,i)}else
n=r.apply(this,arguments);return f()(this,n)}}
var $t=function(t){l()(n,t);var e=Zt(n);function n(){return i()(this,n),e.apply(this,arguments)}
return o()(n,[{key:"invalidate",value:function(){}},{key:"createRenderable",value:function(){}},{key:"updateVisibility",value:function(t){}},{key:"addToMap",value:function(t){this.renderable&&this.renderable.setMap(t)}},{key:"removeFromMap",value:function(t){this.renderable&&this.renderable.setMap(null)}}]),n}
(P);function Ht(t){var e=function(){if("undefined"==typeof Reflect||!Reflect.construct)
return!1;if(Reflect.construct.sham)
return!1;if("function"==typeof Proxy)
return!0;try{return Date.prototype.toString.call(Reflect.construct(Date,[],(function(){}))),!0}catch(t){return!1}}
();return function(){var n,r=p()(t);if(e){var i=p()(this).constructor;n=Reflect.construct(r,arguments,i)}else
n=r.apply(this,arguments);return f()(this,n)}}
var Ut=function(t){l()(n,t);var e=Ht(n);function n(t,r){var a,o=arguments.length>2&&void 0!==arguments[2]?arguments[2]:{},s=arguments.length>3&&void 0!==arguments[3]?arguments[3]:void 0;return i()(this,n),(a=e.call(this,t,o,s))._polygons=r,a}
return o()(n,[{key:"setOpacity",value:function(t){var e=this;b()(p()(n.prototype),"setOpacity",this).call(this,t),this.renderable&&this.renderable.forEach((function(n){return n.setOptions(Object.assign(Object.assign({},e.opts),{fillOpacity:e.opts.fillOpacity*t,strokeOpacity:e.opts.strokeOpacity*t}))}))}},{key:"createRenderable",value:function(){var t=this,e=[],n=this.opts;return this._polygons.forEach((function(r){var i=r.outer.map((function(t){return{lat:t.lat,lng:t.lon}})),a=r.inner.map((function(t){return t.map((function(t){return{lat:t.lat,lng:t.lon}}))}));n.paths=[i].concat(a);var o=new google.maps.Polygon(Object.assign(Object.assign({},n),{fillOpacity:t.opts.fillOpacity*t.opacity,opacity:t.opts.strokeOpacity*t.opacity}));o.addListener("click",(function(){return t.trigger("click",{polygon:t})})),o.addListener("mouseover",(function(){return t.trigger("mouseover",{polygon:t})})),o.addListener("mouseout",(function(){return t.trigger("mouseout",{polygon:t})})),e.push(o)})),e}},{key:"addToMap",value:function(t){this.renderable&&this.renderable.forEach((function(e){return e.setMap(t)}))}},{key:"removeFromMap",value:function(t){this.renderable&&this.renderable.forEach((function(t){return t.setMap(null)}))}}]),n}
($t);function Jt(t){var e=function(){if("undefined"==typeof Reflect||!Reflect.construct)
return!1;if(Reflect.construct.sham)
return!1;if("function"==typeof Proxy)
return!0;try{return Date.prototype.toString.call(Reflect.construct(Date,[],(function(){}))),!0}catch(t){return!1}}
();return function(){var n,r=p()(t);if(e){var i=p()(this).constructor;n=Reflect.construct(r,arguments,i)}else
n=r.apply(this,arguments);return f()(this,n)}}
var Gt=function(t){l()(n,t);var e=Jt(n);function n(t,r){var a,o=arguments.length>2&&void 0!==arguments[2]?arguments[2]:void 0,s=arguments.length>3&&void 0!==arguments[3]?arguments[3]:void 0;return i()(this,n),(a=e.call(this,t,o,s))._points=r,a}
return o()(n,[{key:"setOpacity",value:function(t){b()(p()(n.prototype),"setOpacity",this).call(this,t),this.renderable&&this.renderable.setOptions(Object.assign(Object.assign({},this.opts),{strokeOpacity:t}))}},{key:"createRenderable",value:function(){var t=this,e=new google.maps.Polyline(Object.assign(Object.assign({},this.opts),{path:this._points.map((function(t){return{lat:t.lat,lng:t.lon}}))}));return e.addListener("click",(function(){return t.trigger("click",{polyline:t})})),e.addListener("mouseover",(function(){return t.trigger("mouseover",{polyline:t})})),e.addListener("mouseout",(function(){return t.trigger("mouseout",{polyline:t})})),e}},{key:"addToMap",value:function(t){this.renderable&&this.renderable.setMap(t)}},{key:"removeFromMap",value:function(t){this.renderable&&this.renderable.setMap(null)}}]),n}
($t);function Qt(t){var e=function(){if("undefined"==typeof Reflect||!Reflect.construct)
return!1;if(Reflect.construct.sham)
return!1;if("function"==typeof Proxy)
return!0;try{return Date.prototype.toString.call(Reflect.construct(Date,[],(function(){}))),!0}catch(t){return!1}}
();return function(){var n,r=p()(t);if(e){var i=p()(this).constructor;n=Reflect.construct(r,arguments,i)}else
n=r.apply(this,arguments);return f()(this,n)}}
var Xt=function(t){l()(n,t);var e=Qt(n);function n(){return i()(this,n),e.apply(this,arguments)}
return o()(n,[{key:"setOpacity",value:function(t){b()(p()(n.prototype),"setOpacity",this).call(this,t),this.renderable&&this.renderable.setOpacity(t)}},{key:"setZIndex",value:function(t){if(this.map&&this.renderable){var e=this.map.overlayMapTypes.getArray().indexOf(this.renderable);-1!==e&&(this.map.overlayMapTypes.removeAt(e),this.map.overlayMapTypes.insertAt(t,this.renderable))}}},{key:"updateVisibility",value:function(t){this.renderable&&this.renderable.setOpacity(t?this.opacity:0)}},{key:"setUrl",value:function(t){this.opts.url=t,this.map&&this.invalidate()}},{key:"invalidate",value:function(){var t=this,e=this.map;this.remove(),setTimeout((function(){t.enabled&&t.addTo(e)}),200)}},{key:"createRenderable",value:function(){var t=this,e=new google.maps.ImageMapType({name:this.id,opacity:this.opacity,tileSize:new google.maps.Size(256,256),getTileUrl:function(e,n){var r=t.opts.url;if(!Object(O.isset)(r))
return null;var i={x:e.x,y:e.y,z:n,s:Math.abs(e.x+e.y)%4+1};return Object.keys(i).forEach((function(t){r=r.replace(new RegExp("{".concat(t,"}")),"".concat(i[t]))})),r}});return google.maps.event.addListenerOnce(e,"tilesloaded",(function(){t.trigger("load",{overlay:e})})),e}},{key:"addToMap",value:function(t){this.renderable&&(this.opts.zIndex>=0?t.overlayMapTypes.insertAt(this.opts.zIndex,this.renderable):t.overlayMapTypes.push(this.renderable))}},{key:"removeFromMap",value:function(t){if(this.renderable){google.maps.event.clearListeners(this.renderable,"tilesloaded");var e=this.map.overlayMapTypes.getArray().indexOf(this.renderable);-1!==e&&this.map.overlayMapTypes.removeAt(e)}}}]),n}
($t),Yt=function(t){var e={};return t.stroke?(e.strokeColor=t.stroke.color,e.strokeOpacity=t.stroke.opacity,e.strokeWeight=t.stroke.width):e.strokeOpacity=0,t.fill?(e.fillColor=t.fill.color,e.fillOpacity=t.fill.opacity):e.fillOpacity=0,Object(O.isset)(t.fillOpacity)||(t.fillOpacity=1),Object(O.isset)(t.strokeOpacity)||(t.strokeOpacity=1),e},Kt=function(t){if(t.html&&console.warn("awxjs - HTML markers are not currently supported with Google Maps"),t.svg){var e=t.size||[12,12],n=M()(e,2),r=n[0],i=n[1];if(t.svg.text){var a=t.svg.text;if(Object(O.isArray)(a))
a.forEach((function(t){if(t.autosize){var e=q.calculateTextSize(t.value,t.size),n=M()(e,2);r=n[0],i=n[1]}}));else{var o=a;if(o.autosize){var s=q.calculateTextSize(o.value,o.size),c=M()(s,2);r=c[0],i=c[1]}}}
i+=3;var u=q.draw(r,i,t.svg);return{url:"data:image/svg+xml;base64,".concat(btoa(u)),size:new google.maps.Size(r,i),scaledSize:new google.maps.Size(r,i),anchor:new google.maps.Point(r/2,i/2)}}
if(t.icon){var l=t.icon,h={url:l.url,size:new google.maps.Size(t.size[0],t.size[1]),scaledSize:new google.maps.Size(t.size[0],t.size[1])};return l.anchor&&2===l.anchor.length&&(h.anchor=new google.maps.Point(l.anchor[0],l.anchor[1])),h}
return null};function te(t){var e=function(){if("undefined"==typeof Reflect||!Reflect.construct)
return!1;if(Reflect.construct.sham)
return!1;if("function"==typeof Proxy)
return!0;try{return Date.prototype.toString.call(Reflect.construct(Date,[],(function(){}))),!0}catch(t){return!1}}
();return function(){var n,r=p()(t);if(e){var i=p()(this).constructor;n=Reflect.construct(r,arguments,i)}else
n=r.apply(this,arguments);return f()(this,n)}}
var ee=function(t){l()(n,t);var e=te(n);function n(){return i()(this,n),e.apply(this,arguments)}
return o()(n,[{key:"update",value:function(t){var e;if(Object(O.isset)(t)){var n=null===(e=t.data)||void 0===e?void 0:e.value,r=t.style||{};Object(O.isFunction)(r)&&(r=r({value:n})),this.setStyle(r)}}},{key:"setStyle",value:function(t){var e=Kt(t);e&&this.renderable.setIcon(e)}},{key:"createRenderable",value:function(){var t=this.opts.style,e=this.coordinate,n={};t&&(n.icon=Kt(t),t.zIndex&&(n.zIndex=t.zIndex));var r=new google.maps.Marker(Object(O.extend)({position:new google.maps.LatLng(e.lat,e.lon),optimized:!1},n));if(t&&t.callout){t.callout;if(Object(O.isFunction)(t.callout))
(0,t.callout)()}
return r}},{key:"updateVisibility",value:function(t){}},{key:"addToMap",value:function(t,e){var n=this,r=this.renderable;r&&(this._events.forEach((function(t){var e="__awxjs_".concat(t,"Handler");r[e]?r[e].remove():r[e]=r.addListener(t,(function(){n.trigger(t,{data:n.data,marker:r})}))})),r.setMap(t))}},{key:"removeFromMap",value:function(t){var e=this.renderable;e&&(this._events.forEach((function(t){var n="__awxjs_".concat(t,"Handler");e[n]&&e[n].remove()})),e.setMap(null))}}]),n}
(N);function ne(t){var e=function(){if("undefined"==typeof Reflect||!Reflect.construct)
return!1;if(Reflect.construct.sham)
return!1;if("function"==typeof Proxy)
return!0;try{return Date.prototype.toString.call(Reflect.construct(Date,[],(function(){}))),!0}catch(t){return!1}}
();return function(){var n,r=p()(t);if(e){var i=p()(this).constructor;n=Reflect.construct(r,arguments,i)}else
n=r.apply(this,arguments);return f()(this,n)}}
var re=function(t){l()(n,t);var e=ne(n);function n(t,r,a){var o,s;return i()(this,n),(o=e.call(this,t,r,a))._layerRemovedWhileLoading=!1,o._tileLoadCheckInterval=null,null===(s=o.animation)||void 0===s||s.on("reset",(function(){o._loadingSource&&o.trigger("layer:remove",{layer:o._loadingSource.overlay})})),o}
return o()(n,[{key:"show",value:function(){!1!==this._hidden&&(this._hidden=!1,this.overlay&&this.overlay.setOpacity(this._opacity))}},{key:"hide",value:function(){!0!==this._hidden&&(this._hidden=!0,this.overlay&&this.overlay.setOpacity(0))}},{key:"remove",value:function(){this.trigger("layer:remove",{layer:this.overlay})}},{key:"setOpacity",value:function(t){var e=!(arguments.length>1&&void 0!==arguments[1])||arguments[1];this._opacity=t,this.overlay&&!0===e&&this.isVisible()&&this.overlay.setOpacity(t),this.animation&&this.animation.setOpacity(t)}},{key:"setOrder",value:function(t){this.overlay.setZIndex(t)}},{key:"createOverlay",value:function(t){var e=this,n=arguments.length>1&&void 0!==arguments[1]?arguments[1]:{},r=new Xt(this.key,{opacity:Object(O.isset)(Object(O.get)(n,"style.opacity"))?Object(O.get)(n,"style.opacity"):1,zIndex:Object(O.get)(n,"style.zIndex")},this.identifier);return r.on("map:add",(function(t){var n=(t.data||{}).map;n&&google.maps.event.addListener(n.overlayMapTypes,"remove_at",(function(t,n){e._layerRemovedWhileLoading=!0}))})),r}},{key:"animationLayerForDate",value:function(t,e){var n=this,r=!(arguments.length>2&&void 0!==arguments[2])||arguments[2];return new Promise((function(t,i){if(n.dataSource){var a=n.dataSource.tileLayer(n.key,e,Object(O.extend)({},n._opts,{id:"".concat(n.identifier,"-anim-").concat(Object(X.mapTimestampFromDate)(e)),data:{service:n.service},style:{opacity:0}}));a.isAnimationFrame=!0,a.hide();var o=function(){t(a),n._loadingSource=null};n._loadingSource=a,r?(n._tileLoadCheckInterval=setTimeout((function(){n._layerRemovedWhileLoading&&o(),n._layerRemovedWhileLoading=!1}),2e3),a.overlay.once("load",(function(){n._tileLoadCheckInterval&&window.clearInterval(n._tileLoadCheckInterval),n._tileLoadCheckInterval=null,o()}))):o(),a.on("layer:remove",(function(){n.trigger("layer:remove",{layer:a.overlay})})),n.trigger("layer:add",{layer:a.overlay})}else
i(new Error("No map strategy data source provided"))}))}},{key:"overlay",get:function(){return this._overlay}},{key:"timestamp",set:function(t){this.enabled&&Object(O.isset)(t)&&(t=new Date(t.getFullYear(),t.getMonth(),t.getDate(),t.getHours(),t.getMinutes()),this._timestamp&&t.getTime()===this._timestamp.getTime()||(this._timestamp=t,!1===this.isAnimating()&&!1===this.isAnimationFrame&&(this.animation.hide(),this.updateVisibility()),this.overlay&&!1===this.overlay.isHidden&&this.canShow()&&this.overlay.setUrl(this.urlTemplate())))}}]),n}
(Q.a),ie=function(){function t(){i()(this,t)}
return o()(t,[{key:"tileLayer",value:function(t,e,n){return new re(t,e,n)}},{key:"marker",value:function(t,e,n){return n&&n.skip&&!0===n.skip?null:new ee(e,null,{style:n})}},{key:"polygon",value:function(t,e,n){var r;return n&&(r=Yt(n)),new Ut(t,e,r)}},{key:"polyline",value:function(t,e,n){var r;return n&&(r=Yt(n)),new Gt(t,e,r)}}]),t}
();function ae(t){var e=function(){if("undefined"==typeof Reflect||!Reflect.construct)
return!1;if(Reflect.construct.sham)
return!1;if("function"==typeof Proxy)
return!0;try{return Date.prototype.toString.call(Reflect.construct(Date,[],(function(){}))),!0}catch(t){return!1}}
();return function(){var n,r=p()(t);if(e){var i=p()(this).constructor;n=Reflect.construct(r,arguments,i)}else
n=r.apply(this,arguments);return f()(this,n)}}
var oe=function(t){l()(n,t);var e=ae(n);function n(t,r){var a;return i()(this,n),(a=e.call(this,t,Object(O.extend)({accessToken:null},r))).addAttributions=Object(O.debounce)((function(t){if(!(Object(et.a)("#awxjs-attribution").length>0)){var e=Object(et.a)('<div id="awxjs-attribution"></div>');a.map.controls[google.maps.ControlPosition.BOTTOM_LEFT].push(e[0]);var n=t.join(" | "),r={"background-color":"rgba(255,255,255,0.6)","font-size":"10px",padding:"2px 4px 0","white-space":"nowrap"};e.html('<span style="'.concat(Object.keys(r).map((function(t){return"".concat(t,": ").concat(r[t],";")})).join(" "),'">').concat(n,"</span>"))}}),500),a}
return o()(n,[{key:"strategy",get:function(){return"google"}},{key:"$el",get:function(){return Object(et.a)(this.map.getDiv())}}]),o()(n,[{key:"loadDependencies",value:function(){var t=this;return new Promise((function(e,n){if("undefined"==typeof google||void 0===google.maps){Promise.all([Object(O.loadScript)("https://maps.googleapis.com/maps/api/js?key=".concat(t.opts.accessToken))]).then((function(){e()}))}else
e()}))}},{key:"setupMap",value:function(t){var e=this;this._factory=new ie,this._callout=new google.maps.InfoWindow,this._eventMapping={click:"click",dblclick:"dblclick",mouseover:"mouseover",mouseout:"mouseout",mousemove:"mousemove",zoom_changed:"zoom",drag:"move",dragstart:"move:start",dragend:"move:end"};var n=this.opts.map;if(n){var r=n.center,i=n.zoom;Object(O.isPlainObject)(r)&&Object(O.isset)(r.lat)&&Object(O.isset)(r.lng)&&Object(O.set)(this.opts,"center",{lat:r.lat,lon:r.lng}),i&&Object(O.set)(this.opts,"zoom",i)}
if(Object(X.isGoogle)(t))
this._setInitialView=!1,this._map=t;else{if(Object(O.isString)(t)&&(t=Object(et.a)(t)),Object(O.isArray)(t)&&t.length>0)
t=t[0];else if(Object(O.isDOM)(t)){t=t[0]}
var a=!1===Object(O.get)(this.opts,"map.zoomControl");this._map=new google.maps.Map(t,Object(O.extend)({disableDefaultUI:!0,zoomControl:!a,zoomControlOptions:{position:google.maps.ControlPosition.LEFT_BOTTOM}},this.opts.map)),Object(O.isset)(this.opts.center)||Object(O.set)(this.opts,"center",{lat:43,lon:-93}),Object(O.isset)(this.opts.zoom)||Object(O.set)(this.opts,"zoom",7)}
setTimeout((function(){e.trigger("map:ready")}),250)}},{key:"setBaseStyle",value:function(t){console.warn("[Aeris] `setBaseStyle` is not supported for the Google Maps strategy")}},{key:"setView",value:function(t,e){this.map.setOptions({center:{lat:t.lat,lng:t.lon},zoom:e})}},{key:"getCenter",value:function(){var t=this.map.getCenter();return{lat:t.lat(),lon:t.lng()}}},{key:"setCenter",value:function(t){this.map.setCenter({lat:t.lat,lng:t.lon})}},{key:"getZoom",value:function(){return this.map.getZoom()}},{key:"setZoom",value:function(t){this.map.setZoom(t)}},{key:"getBounds",value:function(){var t=this.map.getBounds();if(t){var e=t.getNorthEast(),n=t.getSouthWest();return{north:e.lat(),west:n.lng(),south:n.lat(),east:e.lng()}}
return null}},{key:"setBounds",value:function(t){var e=new google.maps.LatLng(t.south,t.west),n=new google.maps.LatLng(t.north,t.east);this.map.fitBounds(new google.maps.LatLngBounds(e,n),0)}},{key:"fitBounds",value:function(t){var e,n=arguments.length>1&&void 0!==arguments[1]?arguments[1]:[10,10],r=new google.maps.LatLng(t.south,t.west),i=new google.maps.LatLng(t.north,t.east),a=new google.maps.LatLngBounds(r,i);1===n.length?e=n[0]:2===n.length?e={top:n[1],right:n[0],bottom:n[1],left:n[0]}:4===n.length&&(e={top:n[0],right:n[1],bottom:n[2],left:n[3]}),this.map.fitBounds(a,e)}},{key:"removeAttributions",value:function(){Object(et.a)("#awxjs-attribution").remove()}},{key:"isTile",value:function(t){return t instanceof re}},{key:"isMarker",value:function(t){return(null==t?void 0:t.renderable)?t.renderable instanceof google.maps.Marker:t instanceof google.maps.Marker}},{key:"isPolygon",value:function(t){return t instanceof google.maps.Polygon}},{key:"isPolyline",value:function(t){return t instanceof google.maps.Polyline}},{key:"addSource",value:function(t){b()(p()(n.prototype),"addSource",this).call(this,t),this.opts.attribution&&this.addAttributions([m])}},{key:"removeSource",value:function(t){b()(p()(n.prototype),"removeSource",this).call(this,t),0===this.sources.length&&this.removeAttributions()}},{key:"addOverlay",value:function(t){t instanceof Xt?(t.enabled=!0,t.addTo(this.map)):t instanceof google.maps.ImageMapType?this.map.overlayMapTypes.push(t):t instanceof google.maps.GroundOverlay&&t.setMap(this.map)}},{key:"removeOverlay",value:function(t){if(t instanceof Xt)
t.enabled=!1,t.remove();else if(t instanceof google.maps.ImageMapType){var e=this.map.overlayMapTypes.getArray().indexOf(t);-1!==e&&this.map.overlayMapTypes.removeAt(e)}else
t instanceof google.maps.GroundOverlay&&t.setMap(null)}},{key:"addMarker",value:function(t,e){var r=this;t instanceof ee?(t.on("click",(function(){return r.trigger("marker:click",{data:e,marker:t})})),t.on("mouseover",(function(){return r.trigger("marker:mouseover",{data:e,marker:t})})),t.on("mouseout",(function(){return r.trigger("marker:mouseout",{data:e,marker:t})})),t.addTo(this.map)):t instanceof google.maps.Marker&&t.setMap(this.map),b()(p()(n.prototype),"addMarker",this).call(this,t,e)}},{key:"removeMarker",value:function(t){t instanceof ee?(t.offAll(),t.remove()):t instanceof google.maps.Marker&&t.setMap(null),b()(p()(n.prototype),"removeMarker",this).call(this,t)}},{key:"updateMarker",value:function(t,e){e&&t instanceof ee&&t.update(e)}},{key:"bindCalloutToMarker",value:function(t,e){var n=this;this.isMarker(t)&&t.addListener("click",(function(){n._callout.setContent(e),n._callout.open(n.map,t)}))}},{key:"addShape",value:function(t,e){var r=this;t instanceof Ut||t instanceof Gt?(t.on("click",(function(){return r.trigger("shape:click",{data:e,shape:t})})),t.on("mouseover",(function(){return r.trigger("shape:mouseover",{data:e,shape:t})})),t.on("mouseout",(function(){return r.trigger("shape:mouseout",{data:e,shape:t})})),t.addTo(this.map)):(this.isPolygon(t)||this.isPolyline(t))&&t.setMap(this.map),b()(p()(n.prototype),"addShape",this).call(this,t,e)}},{key:"removeShape",value:function(t){t instanceof Ut||t instanceof Gt?(t.offAll(),t.remove()):(this.isPolygon(t)||this.isPolyline(t))&&t.setMap(null),b()(p()(n.prototype),"removeShape",this).call(this,t)}},{key:"showShape",value:function(t){this.addShape(t)}},{key:"hideShape",value:function(t){this.removeShape(t)}},{key:"coordToPoint",value:function(t){if(!Object(O.isset)(t))
return null;var e=this.map.getProjection(),n=this.map.getBounds(),r=e.fromLatLngToPoint(n.getNorthEast()),i=e.fromLatLngToPoint(n.getSouthWest()),a=Math.pow(this.map.getZoom(),2),o=e.fromLatLngToPoint(new google.maps.LatLng(t.lat,t.lon));return{x:(o.x-i.x)*a,y:(o.y-r.y)*a}}},{key:"pointToCoord",value:function(t){if(!Object(O.isset)(t))
return null;var e=this.map.getProjection(),n=this.map.getBounds(),r=e.fromLatLngToPoint(n.getNorthEast()),i=e.fromLatLngToPoint(n.getSouthWest()),a=Math.pow(this.map.getZoom(),2),o=e.fromPointToLatLng(new google.maps.Point(t.x/a*i.x,t.y/a+r.y));return{lat:o.lat(),lon:o.lng()}}},{key:"showCallout",value:function(t,e,n){if(Object(X.isCoordObject)(t))
new google.maps.InfoWindow(Object.assign(Object.assign({},n),{position:new google.maps.LatLng(t.lat,t.lon),content:e})).open(this.map);else if(t instanceof google.maps.Marker){new google.maps.InfoWindow(Object.assign(Object.assign({},n),{content:e})).open(this.map,t)}}},{key:"_setupEvents",value:function(){var t=this;b()(p()(n.prototype),"_setupEvents",this).call(this);var e=function(){t.trigger("change:bounds"),t.trigger("change:center")};this.map.addListener("dragend",(function(t){e()})),this.map.addListener("zoom_changed",(function(n){e(),t.trigger("change:zoom")}))}},{key:"_dataForMapEvent",value:function(t,e){if(!e)
return null;var n=e.pixel||{x:void 0,y:void 0},r=null;switch(t){case"mouseover":case"mousemove":case"mousedown":case"mouseup":case"click":case"dblclick":r={coord:{lat:e.latLng.lat(),lon:e.latLng.lng()},point:{x:n.x,y:n.y}}}
return r}}]),n}
(T),se=n("njwm"),ce=n("lnrW"),ue=function(){function t(e){i()(this,t),this._configs={"air-quality":se.b.airquality,convective:se.b.convectiveOutlook,"drought-monitor":se.b.droughtMonitor,earthquakes:se.b.earthquakes,fires:se.b.fires,"fire-outlook":se.b.fireOutlook,"lightning-strikes":se.b.lightningStrikes,records:se.b.records,"river-observations":se.b.rivers,stormcells:se.b.stormcells,stormreports:se.b.stormreports,text:se.b.text},e&&this.setStyles(e)}
return o()(t,[{key:"getConfig",value:function(t){return this._configs[t]}},{key:"setConfig",value:function(t,e){this._configs[t]=e}},{key:"setStyle",value:function(t,e){var n,r=this.getConfig(t)||{};if(Object(ce.c)(t))
n=e.raster?e.raster:e,r.style=Object(O.extend)(r.style,n);else if(Object(ce.d)(t)||Object(ce.b)(t)){var i,a,o,s=Object(O.isset)(e.marker)||Object(O.isset)(e.polygon)||Object(O.isset)(e.polyline);e.marker?i=e.marker:!1===s&&(i=e),e.polygon?a=e.polygon:!1===s&&(a=e),e.polyline?o=e.polyline:!1===s&&(o=e),r.style=Object(O.extend)(r.style,{marker:i,polygon:a,polyline:o})}
this._configs[t]=Object(O.cloneDeep)(r)}},{key:"setStyles",value:function(t){var e=this;Object.keys(t).forEach((function(n){return e.setStyle(n,t[n])}))}},{key:"getStyle",value:function(t,e){var n=this.getConfig(t);if(n){var r=n.style;return r[e]?r[e]:r}}},{key:"setTextStyle",value:function(t){this.setStyle("text",{marker:t})}},{key:"getTextStyle",value:function(){return this.getStyle("text","marker")}}]),t}
(),le=n("fnc3"),he=n("GdSY"),fe=n("Hz+P");n("Tskq");function de(t){var e=function(){if("undefined"==typeof Reflect||!Reflect.construct)
return!1;if(Reflect.construct.sham)
return!1;if("function"==typeof Proxy)
return!0;try{return Date.prototype.toString.call(Reflect.construct(Date,[],(function(){}))),!0}catch(t){return!1}}
();return function(){var n,r=p()(t);if(e){var i=p()(this).constructor;n=Reflect.construct(r,arguments,i)}else
n=r.apply(this,arguments);return f()(this,n)}}
var pe=function(t){l()(n,t);var e=de(n);function n(){var t;return i()(this,n),(t=e.apply(this,arguments))._order=new Map,t._mapping=new Map,t}
return o()(n,[{key:"add",value:function(t,e,r){b()(p()(n.prototype),"add",this).call(this,t,e),Object(O.isset)(r)&&this._order.set(t,r)}},{key:"get",value:function(t){var e=b()(p()(n.prototype),"get",this).call(this,t);if(!Object(O.isset)(e)){var r=this.mapping.get(t);r&&(e=b()(p()(n.prototype),"get",this).call(this,r))}
return e}},{key:"mapping",get:function(){return this._mapping}},{key:"order",get:function(){return this._order}}]),n}
(n("QAwG").a);function ve(t){var e=function(){if("undefined"==typeof Reflect||!Reflect.construct)
return!1;if(Reflect.construct.sham)
return!1;if("function"==typeof Proxy)
return!0;try{return Date.prototype.toString.call(Reflect.construct(Date,[],(function(){}))),!0}catch(t){return!1}}
();return function(){var n,r=p()(t);if(e){var i=p()(this).constructor;n=Reflect.construct(r,arguments,i)}else
n=r.apply(this,arguments);return f()(this,n)}}
var ye=function(t){l()(n,t);var e=ve(n);function n(){return i()(this,n),e.apply(this,arguments)}
return o()(n,[{key:"setOpacity",value:function(t){b()(p()(n.prototype),"setOpacity",this).call(this,t),this.exists()&&!this.isHidden&&("raster"===this.renderable.type?this.map.setPaintProperty(this.layerId,"raster-opacity",t):"fill"===this.renderable.type&&this.map.setPaintProperty(this.layerId,"fill-opacity",t))}},{key:"setZIndex",value:function(t){if(this.exists()){var e=this.map.getStyle().layers,n=0;e.forEach((function(t,e){"line"===t.type&&/^admin-/.test(t.id)&&0===n&&(n=e)}));var r=e.map((function(t){return t.id}))[n+t];this.map.removeLayer(this.layerId),this.map.addLayer(this.renderable,r)}}},{key:"exists",value:function(){var t=this.map;return!!t&&(void 0!==t.getLayer(this.layerId)&&void 0!==t.getSource(this.sourceId))}},{key:"invalidate",value:function(){throw new Error("Subclasses must override `invalidate`")}},{key:"createRenderable",value:function(){return null}},{key:"updateVisibility",value:function(t){this.exists()&&("raster"===this.renderable.type&&this.map.setPaintProperty(this.layerId,"raster-opacity",this.opacity),this.map.setLayoutProperty(this.layerId,"visibility",t?"visible":"none"))}},{key:"addToMap",value:function(t){var e=this;if(!this.exists()){if(!this._relativeTo)
t.getStyle().layers.forEach((function(t,n){"line"===t.type&&/^admin-/.test(t.id)&&!e._relativeTo&&(e._relativeTo=t.id)}));void 0!==t.getLayer(this.layerId)||(this.source?(t.addSource(this.sourceId,this.source),this._relativeTo&&void 0===t.getLayer(this._relativeTo)||t.addLayer(this.renderable,this._relativeTo)):this.invalidate()),this.isHidden&&this.hide()}}},{key:"removeFromMap",value:function(t){void 0!==t.getLayer(this.layerId)&&(t.removeLayer(this.layerId),t.removeSource(this.sourceId))}},{key:"sourceId",get:function(){return"".concat(this.layerId,"-source")}},{key:"parentId",get:function(){return this._relativeTo},set:function(t){this._relativeTo=t}}]),n}
(P);function me(t){var e=function(){if("undefined"==typeof Reflect||!Reflect.construct)
return!1;if(Reflect.construct.sham)
return!1;if("function"==typeof Proxy)
return!0;try{return Date.prototype.toString.call(Reflect.construct(Date,[],(function(){}))),!0}catch(t){return!1}}
();return function(){var n,r=p()(t);if(e){var i=p()(this).constructor;n=Reflect.construct(r,arguments,i)}else
n=r.apply(this,arguments);return f()(this,n)}}
var ge=function(t){l()(n,t);var e=me(n);function n(t,r){var a,o=arguments.length>2&&void 0!==arguments[2]?arguments[2]:{},s=arguments.length>3&&void 0!==arguments[3]?arguments[3]:void 0;return i()(this,n),(a=e.call(this,t,o,s))._needsEventSetup=!0,a._polygons=r,a}
return o()(n,[{key:"addTo",value:function(t){var e=this;(b()(p()(n.prototype),"addTo",this).call(this,t),this._strokeLayer)&&(void 0!==t.getLayer(this.strokeLayerId)||t.addLayer(this._strokeLayer,this.layerId));this._needsEventSetup&&(t.on("click",this.layerId,(function(t){e.trigger("click",{data:e.data,shape:e.renderable})})),t.on("mouseenter",this.layerId,(function(t){e.trigger("mouseover",{data:e.data,shape:e.renderable})})),t.on("mouseleave",this.layerId,(function(t){e.trigger("mouseout",{data:e.data,shape:e.renderable})})),this._needsEventSetup=!1)}},{key:"remove",value:function(){if(this.map){if(this._strokeLayer)
void 0!==this.map.getLayer(this.strokeLayerId)&&this.map.removeLayer(this.strokeLayerId);b()(p()(n.prototype),"remove",this).call(this)}}},{key:"invalidate",value:function(){var t=this._polygons.length>1,e=(this._polygons||[]).map((function(t){var e=t.outer.map((function(t){return[t.lon,t.lat]})),n=t.inner?t.inner.map((function(t){return t.map((function(t){return[t.lon,t.lat]}))})):[];return[e].concat(R()(n))}));if(this.source={type:"geojson",data:{type:"FeatureCollection",features:[{type:"Feature",geometry:{type:t?"MultiPolygon":"Polygon",coordinates:t?e:e[0]||[]}}]}},this.createRenderable(),this.map){var n=this.map;this.remove(),this.addTo(n)}}},{key:"createRenderable",value:function(){var t=this.opts,e={fill:{},stroke:{}};return["fill","line"].forEach((function(n){var r="line"===n?"stroke":"fill";Object.keys(t).filter((function(t){return new RegExp("^".concat(n,"-")).test(t)})).forEach((function(n){var i=ot.hyphenate(n);Object(O.isset)(t[n])&&(e[r][i]=t[n])}))})),Object.keys(e.stroke).length>0&&(this._strokeLayer={id:this.strokeLayerId,type:"line",source:this.sourceId,layout:{},paint:e.stroke}),{id:this.layerId,type:"fill",source:this.sourceId,layout:{},paint:e.fill}}},{key:"strokeLayerId",get:function(){return"".concat(this.layerId,"-stroke")}}]),n}
(ye);function ke(t){var e=function(){if("undefined"==typeof Reflect||!Reflect.construct)
return!1;if(Reflect.construct.sham)
return!1;if("function"==typeof Proxy)
return!0;try{return Date.prototype.toString.call(Reflect.construct(Date,[],(function(){}))),!0}catch(t){return!1}}
();return function(){var n,r=p()(t);if(e){var i=p()(this).constructor;n=Reflect.construct(r,arguments,i)}else
n=r.apply(this,arguments);return f()(this,n)}}
var be=function(t){l()(n,t);var e=ke(n);function n(t,r){var a,o=arguments.length>2&&void 0!==arguments[2]?arguments[2]:{},s=arguments.length>3&&void 0!==arguments[3]?arguments[3]:void 0;return i()(this,n),(a=e.call(this,t,o,s))._needsEventSetup=!0,a._points=r,a}
return o()(n,[{key:"addTo",value:function(t){var e=this;b()(p()(n.prototype),"addTo",this).call(this,t),this._needsEventSetup&&(t.on("click",this.layerId,(function(t){e.trigger("click",{data:e.data,shape:e.renderable})})),t.on("mouseenter",this.layerId,(function(t){e.trigger("mouseover",{data:e.data,shape:e.renderable})})),t.on("mouseleave",this.layerId,(function(t){e.trigger("mouseout",{data:e.data,shape:e.renderable})})),this._needsEventSetup=!1)}},{key:"invalidate",value:function(){if(this.source={type:"geojson",data:{type:"FeatureCollection",features:[{type:"Feature",geometry:{type:"LineString",coordinates:this._points.map((function(t){return[t.lon,t.lat]}))}}]}},this.createRenderable(),this.map){var t=this.map;this.remove(),this.addTo(t)}}},{key:"createRenderable",value:function(){var t=Object(O.cloneDeep)(this.opts);return{id:this.layerId,type:"line",source:this.sourceId,layout:{},paint:t}}}]),n}
(ye);function _e(t){var e=function(){if("undefined"==typeof Reflect||!Reflect.construct)
return!1;if(Reflect.construct.sham)
return!1;if("function"==typeof Proxy)
return!0;try{return Date.prototype.toString.call(Reflect.construct(Date,[],(function(){}))),!0}catch(t){return!1}}
();return function(){var n,r=p()(t);if(e){var i=p()(this).constructor;n=Reflect.construct(r,arguments,i)}else
n=r.apply(this,arguments);return f()(this,n)}}
var Oe=function(t){l()(n,t);var e=_e(n);function n(t,r){var a,o=arguments.length>2&&void 0!==arguments[2]?arguments[2]:void 0;return i()(this,n),(a=e.call(this,t,Object(O.extend)({type:"tile"},r),o))._type=a.opts.type,a}
return o()(n,[{key:"setUrl",value:function(t){this.opts.url=t,this.map&&this.invalidate()}},{key:"setBounds",value:function(t){this.opts.bounds=t}},{key:"setImage",value:function(t){var e=arguments.length>1&&void 0!==arguments[1]?arguments[1]:void 0;this.opts.url=t;var n=this.map;if(n){e||(e=this.opts.bounds);var r=n.getSource(this.sourceId);r?r.updateImage({url:t,coordinates:[[e.west,e.north],[e.east,e.north],[e.east,e.south],[e.west,e.south]]}):this.invalidate()}}},{key:"invalidate",value:function(){var t=this.opts,e=t.url,n=t.bounds;if(e){if("image"===this._type){if(!n)
return;this.source={type:"image",url:e,coordinates:[[n.west,n.north],[n.east,n.north],[n.east,n.south],[n.west,n.south]]}}else
this.source={type:"raster",tiles:[1,2,3,4].map((function(t){return e.replace(/\{s\}/,"".concat(t))})),tileSize:256,attribution:this.opts.attribution||""};if(this.createRenderable(),this.map){var r=this.map;this.remove(),this.addTo(r)}}}},{key:"updateVisibility",value:function(t){this.exists()&&this.map.setPaintProperty(this.layerId,"raster-opacity",t?this.opacity:0)}},{key:"createRenderable",value:function(){return{id:this.layerId,type:"raster",source:this.sourceId,paint:{"raster-opacity":this.opacity,"raster-opacity-transition":{duration:0,delay:0},"raster-fade-duration":0}}}}]),n}
(ye);function we(t){var e=function(){if("undefined"==typeof Reflect||!Reflect.construct)
return!1;if(Reflect.construct.sham)
return!1;if("function"==typeof Proxy)
return!0;try{return Date.prototype.toString.call(Reflect.construct(Date,[],(function(){}))),!0}catch(t){return!1}}
();return function(){var n,r=p()(t);if(e){var i=p()(this).constructor;n=Reflect.construct(r,arguments,i)}else
n=r.apply(this,arguments);return f()(this,n)}}
var je=function(t){l()(n,t);var e=we(n);function n(){return i()(this,n),e.apply(this,arguments)}
return o()(n,[{key:"update",value:function(t){var e;if(Object(O.isset)(t)){var n=t.data;Object(O.isset)(n)&&(this.data=Object.assign(Object.assign({},this.data),n));var r=null===(e=this.data)||void 0===e?void 0:e.value,i=t.style||{};Object(O.isFunction)(i)&&(i=i({value:r})),this.setStyle(i)}}},{key:"setStyle",value:function(t){this.opts.style=t,this.invalidate()}},{key:"createRenderable",value:function(){var t=this.opts.style,e=this.coordinate,n={};t&&(n.icon=pt(t),t.zIndex&&(n.zIndex=t.zIndex));var r=new maplibregl.Marker({element:n.icon});if(r.setLngLat([e.lon,e.lat]),t&&t.callout){var i=t.callout;if(Object(O.isFunction)(t.callout))
i=(0,t.callout)();var a=new maplibregl.Popup;a.setHTML(i),r.setPopup(a)}
return r}},{key:"updateVisibility",value:function(t){}},{key:"addToMap",value:function(t,e){var n=this,r=this.renderable;if(r){var i=r.getElement();this._events.forEach((function(t){var e="__awxjs_".concat(t,"Handler");r[e]?i.removeEventListener(t,r[e]):r[e]=function(e){e.stopPropagation(),n.trigger(t,{data:n.data,marker:r})},i.addEventListener(t,r[e])})),r.addTo(t)}}},{key:"removeFromMap",value:function(t){var e=this.renderable;if(e){var n=e.getElement();this._events.forEach((function(t){var r="__awxjs_".concat(t,"Handler");e[r]&&n.removeEventListener(t,e.__awxjs_clickHandler)})),e.remove()}}}]),n}
(N);function xe(t){var e=function(){if("undefined"==typeof Reflect||!Reflect.construct)
return!1;if(Reflect.construct.sham)
return!1;if("function"==typeof Proxy)
return!0;try{return Date.prototype.toString.call(Reflect.construct(Date,[],(function(){}))),!0}catch(t){return!1}}
();return function(){var n,r=p()(t);if(e){var i=p()(this).constructor;n=Reflect.construct(r,arguments,i)}else
n=r.apply(this,arguments);return f()(this,n)}}
var Te=function(t){l()(n,t);var e=xe(n);function n(t,r,a){var o;i()(this,n);var s=(o=e.call(this,t,r,a)).animation,c=new Oe(t,Object(O.extend)(a,{type:"image"}),"".concat(o.identifier,"-anim"));return null==s||s.on("show",(function(t){o.show()})),null==s||s.on("hide",(function(t){o.hide()})),null==s||s.on("load:image advance:image",(function(t){var e=t.data.img;e&&c.setImage(e.src)})),o._animationOverlay=c,o.on("overlay:ready",(function(){var t=Object(O.get)(a,"style.opacity"),e=Object(O.get)(a,"style.belowLayer");a.id&&(o._overlay.id=a.id,o._animationOverlay.id="".concat(a.id,"-anim")),Object(O.isset)(t)&&(o._overlay.setOpacity(t),o._animationOverlay.setOpacity(t)),o._overlay.parentId=e,o._animationOverlay.parentId=o._overlay.layerId})),o}
return o()(n,[{key:"show",value:function(){var t;!1!==this._hidden&&(this._hidden=!1,(null===(t=this.animation)||void 0===t?void 0:t.isAnimating())&&this._animationOverlay?this._animationOverlay.show():this.overlay&&this.overlay.show())}},{key:"hide",value:function(){!0!==this._hidden&&(this._hidden=!0,this.overlay&&this.overlay.hide(),this._animationOverlay&&this._animationOverlay.hide())}},{key:"remove",value:function(){this.trigger("layer:remove",{layer:this.overlay})}},{key:"setOpacity",value:function(t){var e;this._opacity=t,this.overlay&&this.overlay.setOpacity(t),this._animationOverlay&&this._animationOverlay.setOpacity(t),null===(e=this.animation)||void 0===e||e.setOpacity(t)}},{key:"setOrder",value:function(t){this.overlay&&this.overlay.setZIndex(t),this._animationOverlay&&this._animationOverlay.setZIndex(t)}},{key:"createOverlay",value:function(t){var e=arguments.length>1&&void 0!==arguments[1]?arguments[1]:{},n=new Oe(this.key,Object(O.extend)(e,{type:"type"}),this.identifier);return n}},{key:"animationLayerForDate",value:function(t,e){var n=this,r=!(arguments.length>2&&void 0!==arguments[2])||arguments[2];return new Promise((function(t,i){if(n.dataSource){var a=n.dataSource.tileLayer(n.key,e,Object(O.extend)({},n._opts,{id:"".concat(n.identifier,"-anim-").concat(Object(X.mapTimestampFromDate)(e)),opacity:0,data:{service:n.service},animation:{enabled:!1}}));if(a.isAnimationFrame=!0,a.setOpacity(n._opacity,!1),a.hide(),r)
n.overlay.map.on("sourcedata",(function(e){var n=e||{},r=n.sourceId,i=n.isSourceLoaded;r===a.overlay.sourceId&&i&&t(a)}));else
t(a);a.on("layer:remove",(function(){n.trigger("layer:remove",{layer:a.overlay})})),n.trigger("layer:add",{layer:a.overlay})}else
i(new Error("No map strategy data source provided"))}))}},{key:"overlay",get:function(){return this._overlay}},{key:"timestamp",set:function(t){var e;this.enabled&&Object(O.isset)(t)&&(t=new Date(t.getFullYear(),t.getMonth(),t.getDate(),t.getHours(),t.getMinutes()),this._timestamp&&t.getTime()===this._timestamp.getTime()||(this._timestamp=t,!1===this.isAnimating()&&!1===this.isAnimationFrame&&(null===(e=this.animation)||void 0===e||e.hide(),this.updateVisibility()),!this.overlay||!this.canShow()&&this.overlay.exists()||this.overlay.setUrl(this.urlTemplate())))}}]),n}
(Q.a),Se=function(){function t(){i()(this,t)}
return o()(t,[{key:"tileLayer",value:function(t,e,n){return new Te(t,e,n)}},{key:"marker",value:function(t,e,n){return n&&n.skip&&!0===n.skip?null:new je(e,void 0,{style:n})}},{key:"polygon",value:function(t,e,n){var r;return n&&(r=dt(n)),e.forEach((function(t){r.id||(r.id=t.id)})),new ge(t,e,r,r.id)}},{key:"polyline",value:function(t,e,n){var r;n&&n&&delete(r=dt(n)).fill;e.map((function(t){return[t.lat,t.lon]}));return new be(t,e,r,r.id)}}]),t}
();function Me(t){var e=function(){if("undefined"==typeof Reflect||!Reflect.construct)
return!1;if(Reflect.construct.sham)
return!1;if("function"==typeof Proxy)
return!0;try{return Date.prototype.toString.call(Reflect.construct(Date,[],(function(){}))),!0}catch(t){return!1}}
();return function(){var n,r=p()(t);if(e){var i=p()(this).constructor;n=Reflect.construct(r,arguments,i)}else
n=r.apply(this,arguments);return f()(this,n)}}
var Le="2.4.0",Ie=function(t){return"https://unpkg.com/maplibre-gl@".concat(t,"/dist")},Re=function(t){l()(n,t);var e=Me(n);function n(){var t;return i()(this,n),(t=e.apply(this,arguments))._pointAnimationUpdates={},t._shapeDataById={},t._clickedMapLayer=!1,t}
return o()(n,[{key:"loadDependencies",value:function(){var t=document.createElement("style");return t.innerHTML=".maplibregl-marker { line-height: 0; }",window.document.body.appendChild(t),new Promise((function(t,e){"undefined"==typeof maplibregl||void 0===maplibregl.Map?Promise.all([Object(O.loadStyles)("".concat(Ie(Le),"/maplibre-gl.css")),Object(O.loadScript)("".concat(Ie(Le),"/maplibre-gl.js"))]).then((function(){t()})):t()}))}},{key:"setupMap",value:function(t){var e=this;this._factory=new Se,this._eventMapping={load:"load",remove:"unload",resize:"resize",click:"click",dblclick:"dblclick",mousedown:"mousedown",mouseup:"mouseup",mouseover:"mouseover",mouseout:"mouseout",mousemove:"mousemove",zoom:"zoom",zoomstart:"zoom:start",zoomend:"zoom:end",move:"move",movestart:"move:start",moveend:"move:end"};var n=this.opts.map;if(n){var r=n.center,i=n.zoom;if(r&&Object(O.isArray)(r)){var a=M()(r,2),o=a[0],s=a[1];Object(O.isset)(s)&&Object(O.isset)(o)&&Object(O.set)(this.opts,"center",{lat:s,lon:o})}
i&&Object(O.set)(this.opts,"zoom",i)}
if(Object(X.isMaplibre)(t))
this._setInitialView=!1,this._map=t,setTimeout((function(){e.trigger("map:ready")}),250);else{if(Object(O.isString)(t)&&(t=Object(et.a)(t)),Object(O.isArray)(t)&&t.length>0)
t=t[0];else if(Object(O.isDOM)(t)){t=t[0]}
this._map=new maplibregl.Map(Object(O.extend)({},this.opts.map,{container:t,style:this.opts.style})),this._currentMapStyle=this.opts.style,Object(O.isset)(this.opts.center)||Object(O.set)(this.opts,"center",{lat:43,lon:-93}),Object(O.isset)(this.opts.zoom)||Object(O.set)(this.opts,"zoom",7),this.map.on("load",(function(){setTimeout((function(){e.trigger("map:ready")}),250)}))}}},{key:"setBaseStyle",value:function(t){if(t!==this._currentMapStyle){var e=this.map,n=e.getStyle(),r=n.layers.filter((function(t){return/^aeris-/.test(t.id)
                                                })),
                                        i = Object.keys(n.sources).filter((function (t) {
                                                    return /^aeris-/.test(t)
                                                })).reduce((function (t, e) {
                                                    return t[e] = n.sources[e],
                                                    t
                                                }), {});
                                        e.on("style.load", (function () {
                                                Object.keys(i).forEach((function (t) {
                                                        e.getSource(t) || e.addSource(t, i[t])
                                                    })),
                                                r.forEach((function (t) {
                                                        e.getLayer(t.id) || e.addLayer(t)
                                                    }))
                                            })),
                                        e.setStyle(t, {
                                            diff: !0
                                        })
                                    }
                                }
                            }, {
                                key: "setView",
                                value: function (t, e) {
                                    this.map.jumpTo({
                                        center: {
                                            lat: t.lat,
                                            lon: t.lon
                                        },
                                        zoom: Math.max(1, e - 1)
                                    })
                                }
                            }, {
                                key: "getCenter",
                                value: function () {
                                    var t = this._map.getCenter();
                                    return {
                                        lat: t.lat,
                                        lon: t.lng
                                    }
                                }
                            }, {
                                key: "setCenter",
                                value: function (t) {
                                    this._map.setCenter({
                                        lat: t.lat,
                                        lon: t.lon
                                    })
                                }
                            }, {
                                key: "getZoom",
                                value: function () {
                                    return this._map.getZoom() + 1
                                }
                            }, {
                                key: "setZoom",
                                value: function (t) {
                                    this._map.setZoom(Math.max(0, t - 1))
                                }
                            }, {
                                key: "getBounds",
                                value: function () {
                                    var t = this.map.getBounds();
                                    return {
                                        north: t.getNorth(),
                                        west: t.getWest(),
                                        south: t.getSouth(),
                                        east: t.getEast()
                                    }
                                }
                            }, {
                                key: "setBounds",
                                value: function (t) {
                                    var e = new maplibregl.LngLat(t.west, t.south),
                                    n = new maplibregl.LngLat(t.east, t.north);
                                    this.map.fitBounds(new maplibregl.LngLatBounds(e, n))
                                }
                            }, {
                                key: "fitBounds",
                                value: function (t) {
                                    var e = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : [10, 10],
                                    n = new maplibregl.LngLat(t.west, t.south),
                                    r = new maplibregl.LngLat(t.east, t.north),
                                    i = new maplibregl.LngLatBounds(n, r),
                                    a = {};
                                    1 === e.length ? a.padding = e[0] : 2 === e.length ? a.padding = {
                                        top: e[1],
                                        right: e[0],
                                        bottom: e[1],
                                        left: e[0]
                                    }
                                     : 4 === e.length && (a.padding = {
                                            top: e[0],
                                            right: e[1],
                                            bottom: e[2],
                                            left: e[3]
                                        }),
                                    this.map.fitBounds(i, a)
                                }
                            }, {
                                key: "isTile",
                                value: function (t) {
                                    return t instanceof Te
                                }
                            }, {
                                key: "isMarker",
                                value: function (t) {
                                    return t instanceof maplibregl.Marker
                                }
                            }, {
                                key: "isPolygon",
                                value: function (t) {
                                    return t instanceof ge
                                }
                            }, {
                                key: "isPolyline",
                                value: function (t) {
                                    return t instanceof be
                                }
                            }, {
                                key: "addSource",
                                value: function (t) {
                                    b()(p()(n.prototype), "addSource", this).call(this, t),
                                    this.isTile(t) && t.updateVisibility()
                                }
                            }, {
                                key: "addOverlay",
                                value: function (t) {
                                    t instanceof Oe && t.addTo(this.map)
                                }
                            }, {
                                key: "removeOverlay",
                                value: function (t) {
                                    t instanceof Oe && t.remove()
                                }
                            }, {
                                key: "addMarker",
                                value: function (t, e) {
                                    var r = this;
                                    t instanceof je ? (t.on("click", (function () {
                                                return r.trigger("marker:click", {
                                                    data: e,
                                                    marker: t
                                                })
                                            })), t.on("mouseover", (function () {
                                                return r.trigger("marker:mouseover", {
                                                    data: e,
                                                    marker: t
                                                })
                                            })), t.on("mouseout", (function () {
                                                return r.trigger("marker:mouseout", {
                                                    data: e,
                                                    marker: t
                                                })
                                            })), t.addTo(this.map)) : t instanceof maplibregl.Marker && t.addTo(this.map),
                                    b()(p()(n.prototype), "addMarker", this).call(this, t, e)
                                }
                            }, {
                                key: "removeMarker",
                                value: function (t) {
                                    t instanceof je ? (t.offAll(), t.remove()) : t instanceof maplibregl.Marker && t.remove(),
                                    b()(p()(n.prototype), "removeMarker", this).call(this, t)
                                }
                            }, {
                                key: "updateMarker",
                                value: function (t, e) {
                                    Object(O.isset)(e) && t instanceof je && t.update(e)
                                }
                            }, {
                                key: "addShape",
                                value: function (t, e) {
                                    var r = this;
                                    (t instanceof ge || t instanceof be) && (t.on("click", (function () {
                                                return r.trigger("shape:click", {
                                                    data: e,
                                                    shape: t
                                                })
                                            })), t.on("mouseover", (function () {
                                                return r.trigger("shape:mouseover", {
                                                    data: e,
                                                    shape: t
                                                })
                                            })), t.on("mouseout", (function () {
                                                return r.trigger("shape:mouseout", {
                                                    data: e,
                                                    shape: t
                                                })
                                            })), t.addTo(this.map), this._shapeDataById[t.id] = e),
                                    b()(p()(n.prototype), "addShape", this).call(this, t, e)
                                }
                            }, {
                                key: "removeShape",
                                value: function (t) {
                                    (t instanceof ge || t instanceof be) && (t.offAll(), t.remove()),
                                    b()(p()(n.prototype), "removeShape", this).call(this, t)
                                }
                            }, {
                                key: "showShape",
                                value: function (t) {
                                    this.isPolygon(t) || this.isPolyline(t) ? t.show() : b()(p()(n.prototype), "showShape", this).call(this, t)
                                }
                            }, {
                                key: "hideShape",
                                value: function (t) {
                                    this.isPolygon(t) || this.isPolyline(t) ? t.hide() : b()(p()(n.prototype), "hideShape", this).call(this, t)
                                }
                            }, {
                                key: "coordToPoint",
                                value: function (t) {
                                    var e = this.map.project({
                                        lat: t.lat,
                                        lng: t.lon
                                    });
                                    return {
                                        x: e.x,
                                        y: e.y
                                    }
                                }
                            }, {
                                key: "pointToCoord",
                                value: function (t) {
                                    var e = this.map.unproject([t.x, t.y]);
                                    return {
                                        lat: e.lat,
                                        lon: e.lng
                                    }
                                }
                            }, {
                                key: "showCallout",
                                value: function (t, e, n) {
                                    var r = new maplibregl.Popup(n).setHTML(e);
                                    Object(X.isCoordObject)(t) ? r.setLngLat({
                                        lat: t.lat,
                                        lng: t.lon
                                    }).addTo(this.map) : this.isMarker(t) && (t.setPopup(r), t.togglePopup())
                                }
                            }, {
                                key: "_setupEvents",
                                value: function () {
                                    var t = this;
                                    this.map.on("movestart", (function (e) {
                                            ["before:change:bounds", "before:change:center"].forEach((function (e) {
                                                    return t.trigger(e)
                                                }))
                                        })),
                                    this.map.on("moveend", (function (e) {
                                            ["after:change:bounds", "after:change:center", "change:bounds", "change:center"].forEach((function (e) {
                                                    return t.trigger(e)
                                                }))
                                        })),
                                    this.map.on("zoomstart", (function (e) {
                                            ["before:change:zoom"].forEach((function (e) {
                                                    return t.trigger(e)
                                                }))
                                        })),
                                    this.map.on("zoomend", (function (e) {
                                            ["after:change:zoom", "change:zoom"].forEach((function (e) {
                                                    return t.trigger(e)
                                                }))
                                        })),
                                    b()(p()(n.prototype), "_setupEvents", this).call(this)
                                }
                            }, {
                                key: "_shouldTriggerEvent",
                                value: function (t) {
                                    return "click" !== t || !1 === this._clickedMapLayer
                                }
                            }, {
                                key: "_dataForMapEvent",
                                value: function (t, e) {
                                    if (!e)
                                        return null;
                                    var n = null;
                                    switch (t) {
                                    case "mouseover":
                                    case "mousemove":
                                    case "mousedown":
                                    case "mouseup":
                                    case "click":
                                    case "dblclick":
                                        n = {
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
                                    return n
                                }
                            }, {
                                key: "strategy",
                                get: function () {
                                    return "maplibre"
                                }
                            }, {
                                key: "$el",
                                get: function () {
                                    return Object(et.a)(this.map.getContainer())
                                }
                            }
                        ]),
                    n
                }
                (T);
                function Ee(t) {
                    var e = function () {
                        if ("undefined" == typeof Reflect || !Reflect.construct)
                            return !1;
                        if (Reflect.construct.sham)
                            return !1;
                        if ("function" == typeof Proxy)
                            return !0;
                        try {
                            return Date.prototype.toString.call(Reflect.construct(Date, [], (function () {}))),
                            !0
                        } catch (t) {
                            return !1
                        }
                    }
                    ();
                    return function () {
                        var n,
                        r = p()(t);
                        if (e) {
                            var i = p()(this).constructor;
                            n = Reflect.construct(r, arguments, i)
                        } else
                            n = r.apply(this, arguments);
                        return f()(this, n)
                    }
                }
                var Pe = {
                    "tropical-cyclones": "tropical.Systems",
                    "tropical-cyclones-break-points": "tropical.Breakpoints"
                },
                De = function (t) {
                    return Object(O.isset)(Pe[t])
                },
                ze = function (t) {
                    l()(n, t);
                    var e = Ee(n);
                    function n(t, r, a) {
                        var o;
                        if (i()(this, n), (o = e.call(this))._ready = !1, o._metric = !1, o.store = new pe, o._stateForData = {}, o._resumeAnimationTimer = null, o._resumeOnBoundsChange = !1, o.update = Object(O.debounce)((function () {
                                        o._loadForBounds(!0)
                                    }), 250), o._dblClickTimer = null, !t)
                            throw new Error("[Aeris] Invalid target specified for InteractiveMap, which must be a DOM element or map instance");
                        r = r || {},
                        t instanceof HTMLElement == !1 && (Object(X.isLeaflet)(t) ? r.strategy = "leaflet" : Object(X.isMapbox)(t) ? r.strategy = "mapbox" : Object(X.isMaplibre)(t) ? r.strategy = "maplibre" : Object(X.isGoogle)(t) ? r.strategy = "google" : Object(X.isOpenLayers)(t) && (r.strategy = "openlayers")),
                        r = Object(O.extend)({
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
                        }, r),
                        o._opts = r,
                        r.account && (o.account = r.account),
                        "mapbox" === r.strategy ? o._strategy = new Ot(t, r) : "maplibre" === r.strategy ? o._strategy = new Re(t, r) : "google" === r.strategy ? o._strategy = new oe(t, r) : "openlayers" === r.strategy ? o._strategy = new Nt(t, r) : o._strategy = new rt(t, r),
                        o._strategy.dataSource = c()(o),
                        o._timeline = new y.a(Object(O.extend)(r.timeline, {
                                    key: "map-timeline"
                                })),
                        o._sourceOrder = {
                            tile: []
                        },
                        o._layers = new ce.a(o.account),
                        o._config = new ue(r.styles),
                        o._metric = o._opts.metric;
                        var s = function () {
                            if (o._indicator = new le.a, o._indicator.appendTo(o.strategy.$el), o.strategy.$el.addClass("awxjs__ia-map"), o._setupEvents(), o._ready = !0, r.layers) {
                                var t = r.layers;
                                Object(O.isArray)(t) || (t = t.split(",")),
                                t.forEach((function (t) {
                                        if (Object(O.isString)(t))
                                            o.addLayer(t);
                                        else if (Object(O.isPlainObject)(t)) {
                                            var e = t.layer,
                                            n = t.options;
                                            o.addLayer(e, n)
                                        }
                                    }))
                            }
                            r.refresh > 0 && o.enableAutoUpdate(r.refresh),
                            a && a(c()(o)),
                            o.trigger("load"),
                            o.trigger("ready")
                        };
                        return o._layers.fetch().then((function () {
                                o.strategy.isReady() ? s() : o.strategy.on("ready", (function (t) {
                                        s()
                                    }))
                            })),
                        o
                    }
                    return o()(n, [{
                                key: "isReady",
                                value: function () {
                                    return this.strategy.isReady()
                                }
                            }, {
                                key: "getCenter",
                                value: function () {
                                    return this.strategy.getCenter()
                                }
                            }, {
                                key: "setCenter",
                                value: function (t) {
                                    this.strategy.setCenter(t)
                                }
                            }, {
                                key: "getZoom",
                                value: function () {
                                    return this.strategy.getZoom()
                                }
                            }, {
                                key: "setZoom",
                                value: function (t) {
                                    this.strategy.setZoom(t)
                                }
                            }, {
                                key: "setView",
                                value: function (t, e) {
                                    this.strategy.setView(t, e)
                                }
                            }, {
                                key: "getBounds",
                                value: function () {
                                    return this.strategy.getBounds()
                                }
                            }, {
                                key: "setBounds",
                                value: function (t) {
                                    this.strategy.setBounds(t)
                                }
                            }, {
                                key: "fitBounds",
                                value: function (t, e) {
                                    e = e || [10, 10],
                                    this.strategy.fitBounds(t, e)
                                }
                            }, {
                                key: "setMetric",
                                value: function (t) {
                                    this._metric !== t && (this._metric = t, this.trigger("change:units", {
                                            metric: t,
                                            unit: t ? "metric" : "imperial"
                                        }))
                                }
                            }, {
                                key: "addLayer",
                                value: function (t, e) {
                                    var n = this;
                                    if (this._checkReady(), !Object(O.isset)(t) || Object(O.isEmpty)(t) || !Object(O.isString)(t))
                                        return console.warn("[Aeris] Cannot add invalid layer code {".concat(t, "} to InteractiveMap."), t), this;
                                    var r = Object(fe.d)(t),
                                    i = Object(O.get)(e, "id") || r,
                                    a = this.getSourceForId(i);
                                    if (a)
                                        return this;
                                    var o = Pe[t];
                                    return o ? (Object(X.loadMapModuleConfig)(o, (function (o, s, c) {
                                                var u = Object(O.get)(e, "id") || o;
                                                c && c.initialize(n.account, null, n),
                                                s = Object(O.extend)({}, s, e);
                                                var l = n.createSource(u, s.type, s);
                                                l.code = t,
                                                n.store.mapping.set(t, u),
                                                n.addSource(l, e),
                                                n.trigger("layer:add", {
                                                    id: i,
                                                    layer: r,
                                                    source: a
                                                })
                                            })), this) : ((a = Object(fe.a)(t, Object(O.extend)({}, Object(O.cloneDeep)(e), {
                                                        account: this.account,
                                                        servers: this._opts.servers,
                                                        time: this.timeline.currentDate(),
                                                        attribution: this._opts.attribution ? m : null,
                                                        timeline: {
                                                            intervals: Object(O.get)(this._opts, "timeline.intervals"),
                                                            alwaysShowPast: Object(O.get)(this._opts, "timeline.alwaysShowPast"),
                                                            alwaysShowFuture: Object(O.get)(this._opts, "timeline.alwaysShowFuture"),
                                                            bufferIntervals: Object(O.get)(this._opts, "timeline.bufferIntervals"),
                                                            showLoadingIntervals: Object(O.get)(this._opts, "timeline.showLoadingIntervals")
                                                        }
                                                    }), this.strategy.factory, this._layers)) && (a.code = r, this.addSource(a, e), this.store.mapping.set(r, i), this.trigger("layer:add", {
                                                id: i,
                                                layer: r,
                                                source: a
                                            })), this)
                                }
                            }, {
                                key: "addLayers",
                                value: function (t) {
                                    var e = this;
                                    return this._checkReady(),
                                    t.forEach((function (t) {
                                            return e.addLayer(t)
                                        })),
                                    this
                                }
                            }, {
                                key: "removeLayer",
                                value: function (t) {
                                    t = t.replace(/\:.+$/,"");var e=this.getSourceForLayer(t);if(!e)
return this;this.removeSource(e);var n=this.store.mapping.get(e.key),r=this.store.mapping.get(n);return this.trigger("layer:remove",{id:r,layer:n,source:e}),this}},{key:"removeLayerForId",value:function(t){var e=this.getSourceForId(t);if(!e)
return this;var n=this.store.mapping.get(e.key),r=this.store.mapping.get(n);return this.removeSource(e),this.trigger("layer:remove",{id:r,layer:n,source:e}),this}},{key:"removeLayers",value:function(t){var e=this;return t.forEach((function(t){return e.removeLayer(t)})),this}},{key:"bringLayerToFront",value:function(t){var e=this,n=this.getSourceForLayer(t);this.store.count;if(n&&n instanceof _.c){var r=this._sourceOrder.tile,i=r.indexOf(t);-1!==i&&(r.splice(i,1),r.push(t)),Object.keys(this.store.items).forEach((function(t){var n=e.store.get(t);n instanceof _.c&&n.setOrder(r.indexOf(t)+1)}))}}},{key:"sendLayerToBack",value:function(t){var e=this,n=this.getSourceForLayer(t);if(n&&n instanceof _.c){var r=this._sourceOrder.tile,i=r.indexOf(t);-1!==i&&(r.splice(i,1),r.splice(0,0,t)),Object.keys(this.store.items).forEach((function(t){var n=e.store.get(t);n instanceof _.c&&n.setOrder(r.indexOf(t)+1)}))}}},{key:"setLayerOrder",value:function(t,e){var n=this.getSourceForLayer(t);n&&n instanceof _.c&&Object(O.isset)(e)&&n.setOrder(e)}},{key:"getSourceForLayer",value:function(t){var e=this.store.mapping.get(t);return e?this.getSource(e):this.getSource(t)}},{key:"getSourceForId",value:function(t){var e=this.store.mapping.get(t);return e?this.getSource(e):this.getSource(t)}},{key:"createSource",value:function(t,e,n){return Object(fe.b)(t,e,Object.assign({account:this.account,servers:this._opts.servers},n),this.strategy.factory)}},{key:"addSource",value:function(t,e){var n=this;if(this._checkReady(),!Object(O.isset)(t.key))
return console.error("[Aeris] Cannot add a data source with an undefined key to the map. Make sure you have set the `key` property on your data source before adding to the map."),this;t.strategy=this.strategy,t.enabled=!0,t.identifier=t.key,this.store.add(t.identifier,t),this.strategy.addSource(t);var r=Object(O.get)(e,"style");r&&this._updateSourceStyle(t,r),Object(O.has)(t,"animation")&&Object(O.isset)(t.animation)&&!0===t.animation.isEnabled()&&this.timeline.add(t.key,t.animation);var i=this.getBounds();return t instanceof _.d&&(t.on("data:load:start",(function(t){return n.trigger("source:load:start",t.data)})),t.on("data:load:done",(function(t){return n.trigger("source:load:done",t.data)})),t.load({bounds:i,from:this.timeline.startDate(),to:this.timeline.endDate()}).catch((function(e){console.error("[Aeris] Failed to load data for VectorSource with key ".concat(t.key),e)}))),this.trigger("source:add",{source:t,id:t.key}),this}},{key:"addModule",value:function(t){var e=this,n=arguments.length>1&&void 0!==arguments[1]?arguments[1]:null,r=arguments.length>2&&void 0!==arguments[2]?arguments[2]:null,i=function(t){t.initialize(e.account,null,e);var r=t.source(),i=e.createSource(t.id,r.type,Object(O.extend)({},r,n));i&&e.addSource(i)},a=function(t){e.isReady?i(t):e.on("ready",(function(){i(t)}))};Object(O.isFunction)(t)?t().then((function(t){var e=new(t=t.default||t)(r);a(e)})):Object(O.has)(t,"source")&&a(t)}},{key:"removeSource",value:function(t){var e=this;t.enabled=!1,this.strategy.removeSource(t),Object(O.has)(t,"animation")&&Object(O.isset)(t.animation)&&!0===t.animation.isEnabled()&&(t.animation.reset(),this.timeline.remove(t.animation)),Object(O.has)(t,"reset")&&t.reset(),this.store.remove(t.identifier),this.store.each((function(n,r){r===t&&e.store.remove(n)}));var n=t.key,r=t.code;return this.trigger("source:remove",{source:t,id:n,layer:r}),this}},{key:"removeAllSources",value:function(){var t=this;return this.store.each((function(e,n){t.removeSource(n)})),this}},{key:"getSource",value:function(t){var e=this.store.get(t);return e||(t=Object(fe.c)(t),e=this.store.get(t)),e}},{key:"hasSource",value:function(t){return t=Object(fe.c)(t),this.store.has(t)}},{key:"showCallout",value:function(t,e,n){this.strategy.showCallout(t,e,n)}},{key:"enableAutoUpdate",value:function(t){var e=this;!this._refreshInterval&&t>0&&(t=Math.max(t,10),this._refreshInterval&&window.clearInterval(this._refreshInterval),this._refreshInterval=setInterval((function(){e._updateTimeline()}),1e3*t))}},{key:"disableAutoUpdate",value:function(){this._refreshInterval&&clearInterval(this._refreshInterval),this._refreshInterval=null}},{key:"_updateTimeline",value:function(){var t=this.timeline,e=!1;(t.isAnimating()||t.isLoading())&&(t.stop(),t.reset(),e=!0),t.refresh(),t.goToInit(),e&&(clearTimeout(this._restartAnimationTimeout),this._restartAnimationTimeout=setTimeout((function(){t.play()}),300))}},{key:"_updateSourceStyle",value:function(t){var e=arguments.length>1&&void 0!==arguments[1]?arguments[1]:{};if(t&&t instanceof _.c){var n=e.zIndex,r=e.opacity;Object(O.isset)(r)&&t.setOpacity(r),Object(O.isset)(n)&&t.setOrder(n)}}},{key:"_loadForBounds",value:function(){var t=this,e=arguments.length>0&&void 0!==arguments[0]&&arguments[0],n=arguments.length>1&&void 0!==arguments[1]&&arguments[1],r=this.getBounds();this.store.each((function(i,a){if(a instanceof _.d){var o=a;(o.requiresBounds||!1===o.hasData()||e)&&o.load({bounds:r,from:t.timeline.startDate(),to:t.timeline.endDate()},n).catch((function(t){console.error("[Aeris] Failed to load data for VectorSource with key ".concat(a.key),t)}))}}))}},{key:"_updateSourcesForDate",value:function(t){Object(O.isDate)(t)||(t=new Date(t)),this.store.each((function(e,n){n instanceof _.c&&(n.timestamp=t)}))}},{key:"_beforeBoundsChange",value:function(){this.timeline.isAnimating()&&!1===this.timeline.isPaused()?(this._resumeOnBoundsChange=!0,this.timeline.pause()):this._resumeOnBoundsChange=!1}},{key:"_afterBoundsChange",value:function(){var t=this,e=Object(O.get)(this._opts,"timeline.resetOnBoundsChange"),n=this._opts.reloadOnBoundsChange;if(this._resumeAnimationTimer&&(clearTimeout(this._resumeAnimationTimer),this._resumeAnimationTimer=null),n&&!Object(O.isEmpty)(this._stateForData)){var r=this._stateForData,i=this.strategy.coordToPoint(r.center),a=this.strategy.coordToPoint(this.getCenter());if(Object(O.isset)(i)&&Object(O.isset)(a))
n=Math.max(Math.abs(i.x-a.x),Math.abs(i.y-a.y))>=50;this.getZoom()!==r.zoom&&(n=!0)}
var o=!1;if(this.store.each((function(t,e){e instanceof _.d&&(o=!0)})),n&&(!0===e&&this.timeline.reset(),o)){var s=this.timeline.isPaused()||this.timeline.isAnimating();this._loadForBounds(!1,s),this._stateForData={center:this.getCenter(),bounds:this.getBounds(),zoom:this.getZoom()}}
this._resumeOnBoundsChange&&this.timeline.isPaused()&&(this._resumeAnimationTimer=setTimeout((function(){t.timeline.resume()}),500))}},{key:"_setupEvents",value:function(){var t=this;this.strategy.on("click",(function(e){null===t._dblClickTimer&&(t._dblClickTimer=setTimeout((function(){e.data.coord=Object(g.b)(e.data.coord),t.trigger("click",e.data),t._dblClickTimer=null}),200))})),this.strategy.on("dblclick",(function(e){clearTimeout(t._dblClickTimer),t._dblClickTimer=null,t.trigger("dblclick",e.data)})),this.strategy.on("resize",(function(e){return t.trigger("resize",e.data)})),this.strategy.on("mousedown",(function(e){return t.trigger("mousedown",e.data)})),this.strategy.on("mouseup",(function(e){return t.trigger("mouseup",e.data)})),this.strategy.on("mouseover",(function(e){return t.trigger("mouseover",e.data)})),this.strategy.on("mouseout",(function(e){return t.trigger("mouseout",e.data)})),this.strategy.on("mousemove",(function(e){return t.trigger("mousemove",e.data)})),this.strategy.on("before:change:bounds",(function(){t._beforeBoundsChange()})),this.strategy.on("change:bounds",(function(e){t.trigger("change:bounds",{bounds:t.getBounds()}),t._afterBoundsChange()})),this.strategy.on("change:center",(function(e){return t.trigger("change:center",{center:t.getCenter()})})),this.strategy.on("change:zoom",(function(e){return t.trigger("change:zoom",{zoom:t.getZoom()})})),this.strategy.on("move",(function(e){return t.trigger("move")})),this.strategy.on("move:start",(function(e){t.trigger("move:start"),t.trigger("before:change:bounds",{bounds:t.getBounds()})})),this.strategy.on("move:end",(function(e){t.trigger("move:end"),t.trigger("after:change:bounds",{bounds:t.getBounds()})})),this.strategy.on("zoom",(function(e){return t.trigger("zoom")})),this.strategy.on("zoom:start",(function(e){t.trigger("zoom:start"),t.trigger("before:change:bounds",{bounds:t.getBounds()})})),this.strategy.on("zoom:end",(function(e){t.trigger("zoom:end"),t.trigger("after:change:bounds",{bounds:t.getBounds()})})),this.strategy.on("idle",(function(e){return t.trigger("idle")})),this.strategy.on("marker:click",(function(e){return t.trigger("marker:click",e.data)})),this.strategy.on("marker:mouseover",(function(e){return t.trigger("marker:mouseover",e.data)})),this.strategy.on("marker:mouseout",(function(e){return t.trigger("marker:mouseout",e.data)})),this.strategy.on("marker:drag",(function(e){return t.trigger("marker:drag",e.data)})),this.strategy.on("marker:dragstart",(function(e){return t.trigger("marker:dragstart",e.data)})),this.strategy.on("marker:dragend",(function(e){return t.trigger("marker:dragend",e.data)})),this.strategy.on("shape:click",(function(e){return t.trigger("shape:click",e.data)})),this.strategy.on("shape:mouseover",(function(e){return t.trigger("shape:mouseover",e.data)})),this.strategy.on("shape:mouseout",(function(e){return t.trigger("shape:mouseout",e.data)})),this.timeline.on("play load:start",(function(){t.trigger("timeline:play",{timeline:t.timeline})})),this.timeline.on("stop",(function(e){clearTimeout(t._restartAnimationTimeout),t.trigger("timeline:stop",{timeline:t.timeline})})),this.timeline.on("advance",(function(e){t.timeline.isAnimating()||t._updateSourcesForDate(e.data.time),t.trigger("timeline:change",Object(O.extend)({timeline:t.timeline},e.data))})),this.timeline.on("start:change end:change",(function(){t.timeline.reset(),t.update()})),this.timeline.on("load:start",(function(){t._indicator.startAnimating()})),this.timeline.on("load:done",(function(){t._indicator.stopAnimating()}))}},{key:"_checkReady",value:function(){if(!this._ready){throw new Error("[Aeris] Must wait for an instance of InteractiveMap to be fully\n\t\t\t\tinitialized before calling methods on it. Observe the `load` or `ready` events\n\t\t\t\tthat are triggered when an InteractiveMap instance is fully initialized.".replace(/\n\s+/g," "))}}},{key:"requestForMap",value:function(t){var e=new he.a({server:Object(O.get)(this._opts,"servers.maps"),client:{id:this.account.id,secret:this.account.secret}},{type:"tile"});return e.layers(t),e}},{key:"map",get:function(){return this.strategy.map}},{key:"strategy",get:function(){return this._strategy}},{key:"opts",get:function(){return this._opts}},{key:"config",get:function(){return this._config}},{key:"timeline",get:function(){return this._timeline}},{key:"layerInfo",get:function(){return this._layers}},{key:"account",get:function(){return this._account},set:function(t){this._account=t}},{key:"isMetric",get:function(){return this._metric}}]),n}
(v.a);e.a=ze},"7r+a":function(t,e,n){"use strict";n.d(e,"e",(function(){return h})),n.d(e,"c",(function(){return f})),n.d(e,"a",(function(){return d})),n.d(e,"b",(function(){return p})),n.d(e,"f",(function(){return y})),n.d(e,"d",(function(){return m}));var r=n("J4zp"),i=n.n(r),a=n("lwsE"),o=n.n(a),s=n("W8MJ"),c=n.n(s),u=n("l1hk"),l=n("0lfv"),h=function(){function t(e){if(o()(this,t),Object(l.isEmpty)(e))
throw new Error("Invalid coordinates for Point");var n=i()(e,2),r=n[0],a=n[1];this.coordinates={lat:a,lon:r}}
return c()(t,[{key:"toArray",value:function(){var t=arguments.length>0&&void 0!==arguments[0]&&arguments[0],e=this.coordinates,n=e.lat,r=e.lon;return t?[r,n]:[n,r]}},{key:"bounds",value:function(){return u.a.fromPoints([this.coordinates])}}]),t}
(),f=(n("QWBl"),n("2B1R"),n("FZtP"),function(){function t(e){if(o()(this,t),Object(l.isEmpty)(e))
throw new Error("Invalid coordinates for MultiPoint");this.points=e.map((function(t){return new h(t)})),this.coordinates=this.points.map((function(t){return t.coordinates}))}
return c()(t,[{key:"toArray",value:function(){var t=arguments.length>0&&void 0!==arguments[0]&&arguments[0];return this.points.map((function(e){return e.toArray(t)}))}},{key:"bounds",value:function(){var t={north:null,south:null,west:null,east:null};return this.coordinates.forEach((function(e){Object(l.isset)(e.lat)&&Object(l.isset)(e.lon)&&(t.north=Math.max(t.north,e.lat),t.south=Math.min(t.south,e.lat),t.west=Math.min(t.west,e.lon),t.east=Math.max(t.east,e.lon))})),u.a.fromBounds(t)}}]),t}
()),d=function(){function t(e){if(o()(this,t),Object(l.isEmpty)(e)||!Object(l.isArray)(e))
throw new Error("Invalid coordinates for LineString");if(e.length<2)
throw new Error("Coordinate count in LineString is less than 2");this.coordinates=e.map((function(t){if(t.length<2)
throw new Error("Coordinate dimension count is less than 2");var e=i()(t,2),n=e[0];return{lat:e[1],lon:n}}))}
return c()(t,[{key:"add",value:function(t){this.coordinates.push(t)}},{key:"toArray",value:function(){var t=arguments.length>0&&void 0!==arguments[0]&&arguments[0];return this.coordinates.map((function(e){return t?[e.lon,e.lat]:[e.lat,e.lon]}))}},{key:"bounds",value:function(){return u.a.fromPoints(this.coordinates)}}]),t}
(),p=function(){function t(e){if(o()(this,t),Object(l.isEmpty)(e))
throw new Error("Invalid coordinates for MultiLineString");this.lines=e.map((function(t){return new d(t)})),this.coordinates=this.lines.map((function(t){return t.coordinates}))}
return c()(t,[{key:"toArray",value:function(){var t=arguments.length>0&&void 0!==arguments[0]&&arguments[0];return this.lines.map((function(e){return e.toArray(t)}))}},{key:"bounds",value:function(){var t={north:null,south:null,west:null,east:null};return this.lines.forEach((function(e){var n=e.bounds();Object(l.isset)(n)&&(t.north=Math.max(t.north,n.north),t.south=Math.min(t.south,n.south),t.west=Math.min(t.west,n.west),t.east=Math.max(t.east,n.east))})),u.a.fromBounds(t)}}]),t}
(),v=function t(e){if(o()(this,t),Object(l.isEmpty)(e))
throw new Error("Invalid vertices for PolygonGeometry");this.coordinates=e.map((function(t){if(t.length<2)
throw new Error("Coordinate dimension count is less than 2");var e=i()(t,2),n=e[0];return{lat:e[1],lon:n}}))},y=function(){function t(e){var n=this;if(o()(this,t),Object(l.isEmpty)(e))
throw new Error("Invalid coordinates for Polygon");this.inner=[],this.coordinates=e.map((function(t,e){if(t.length<4)
throw new Error("Vertex count in Polygon is less than 4");var r=new v(t);return 0===e?n.outer=r:n.inner.push(r),r.coordinates}))}
return c()(t,[{key:"toArray",value:function(){var t=arguments.length>0&&void 0!==arguments[0]&&arguments[0];return this.coordinates.map((function(e){return e.map((function(e){return t?[e.lon,e.lat]:[e.lat,e.lon]}))}))}},{key:"bounds",value:function(){return u.a.fromPoints(this.outer.coordinates)}}]),t}
(),m=function(){function t(e){if(o()(this,t),Object(l.isEmpty)(e))
throw new Error("Invalid coordinates for MultiPolygon");this.polygons=e.map((function(t){return new y(t)})),this.coordinates=this.polygons.map((function(t){return t.coordinates}))}
return c()(t,[{key:"toArray",value:function(){var t=arguments.length>0&&void 0!==arguments[0]&&arguments[0];return this.polygons.map((function(e){return e.toArray(t)}))}},{key:"bounds",value:function(){var t={north:null,south:null,west:null,east:null};return this.polygons.forEach((function(e){var n=e.bounds();Object(l.isset)(n)&&(t.north=Math.max(t.north,n.north),t.south=Math.min(t.south,n.south),t.west=Math.min(t.west,n.west),t.east=Math.max(t.east,n.east))})),u.a.fromBounds(t)}}]),t}
()},"8TS8":function(t,e,n){"use strict";n.d(e,"a",(function(){return y})),n.d(e,"c",(function(){return m})),n.d(e,"b",(function(){return g}));n("07d7"),n("SuFq"),n("JfAA");var r=n("7W2i"),i=n.n(r),a=n("a1gu"),o=n.n(a),s=n("Nsbk"),c=n.n(s),u=n("lwsE"),l=n.n(u),h=n("W8MJ"),f=n.n(h),d=n("0lfv");function p(t){var e=function(){if("undefined"==typeof Reflect||!Reflect.construct)
return!1;if(Reflect.construct.sham)
return!1;if("function"==typeof Proxy)
return!0;try{return Date.prototype.toString.call(Reflect.construct(Date,[],(function(){}))),!0}catch(t){return!1}}
();return function(){var n,r=c()(t);if(e){var i=c()(this).constructor;n=Reflect.construct(r,arguments,i)}else
n=r.apply(this,arguments);return o()(this,n)}}
var v=function(){function t(e,n,r){l()(this,t),this.data=e,this.style=n,this.renderable=r,e.id&&(this.id=e.id)}
return f()(t,[{key:"bounds",get:function(){return this.geometry&&Object(d.has)(this.geometry,"bounds")?this.geometry.bounds():null}},{key:"adjustOpacity",get:function(){var t,e=null===(t=this.style)||void 0===t?void 0:t.adjustOpacity;return!Object(d.isset)(e)||e}}]),t}
(),y=function(t){i()(n,t);var e=p(n);function n(){return l()(this,n),e.apply(this,arguments)}
return n}
(v),m=function(t){i()(n,t);var e=p(n);function n(){return l()(this,n),e.apply(this,arguments)}
return n}
(v),g=function(t){i()(n,t);var e=p(n);function n(){return l()(this,n),e.apply(this,arguments)}
return n}
(v);e.d=v},"8YOa":function(t,e,n){var r=n("0BK2"),i=n("hh1v"),a=n("UTVS"),o=n("m/L8").f,s=n("kOOl"),c=n("uy83"),u=s("meta"),l=0,h=Object.isExtensible||function(){return!0},f=function(t){o(t,u,{value:{objectID:"O"+ ++l,weakData:{}}})},d=t.exports={REQUIRED:!1,fastKey:function(t,e){if(!i(t))
return"symbol"==typeof t?t:("string"==typeof t?"S":"P")+t;if(!a(t,u)){if(!h(t))
return"F";if(!e)
return"E";f(t)}
return t[u].objectID},getWeakData:function(t,e){if(!a(t,u)){if(!h(t))
return!0;if(!e)
return!1;f(t)}
return t[u].weakData},onFreeze:function(t){return c&&d.REQUIRED&&h(t)&&!a(t,u)&&f(t),t}};r[u]=!0},CVtS:function(t,e,n){"use strict";n("QWBl"),n("yXV3"),n("2B1R"),n("E9XD"),n("zKZe"),n("tkto"),n("07d7"),n("5s+n"),n("SuFq"),n("TWNs"),n("rB9j"),n("JfAA"),n("UxlC"),n("FZtP");var r=n("o0o1"),i=n.n(r),a=(n("ls82"),n("lwsE")),o=n.n(a),s=n("W8MJ"),c=n.n(s),u=n("7W2i"),l=n.n(u),h=n("a1gu"),f=n.n(h),d=n("Nsbk"),p=n.n(d),v=n("m0x2"),y=n("0lfv"),m=n("3j3Q");function g(t){var e=function(){if("undefined"==typeof Reflect||!Reflect.construct)
return!1;if(Reflect.construct.sham)
return!1;if("function"==typeof Proxy)
return!0;try{return Date.prototype.toString.call(Reflect.construct(Date,[],(function(){}))),!0}catch(t){return!1}}
();return function(){var n,r=p()(t);if(e){var i=p()(this).constructor;n=Reflect.construct(r,arguments,i)}else
n=r.apply(this,arguments);return f()(this,n)}}
var k=function(t){l()(n,t);var e=g(n);function n(t,r){var i;return o()(this,n),(i=e.call(this))._key=t,i._opts=Object(y.extend)({size:void 0,autosize:!1,format:"svg",metric:!1},r),Object(y.isset)(i._opts.size)||(i._opts.autosize=!0),i._target=Object(m.a)('<div class="awxjs__legend awxjs__legend-'.concat(t,'"></div>')),setTimeout((function(){i.update(i._opts)}),500),i}
return c()(n,[{key:"opts",get:function(){return this._opts}},{key:"key",get:function(){return this._key}},{key:"account",get:function(){return this.opts.account}},{key:"$el",get:function(){return this._target}}]),c()(n,[{key:"show",value:function(){this.$el.show()}},{key:"hide",value:function(){this.$el.hide()}},{key:"setSize",value:function(t){this._opts.size=Object(y.extend)(this._opts.size,t),this.update()}},{key:"getSize",value:function(){if(this.$el){var t=this.$el.bounds(),e=this.$el.outerHeight(!0);return{width:t.width,height:e}}
return{width:0,height:0}}},{key:"setMetric",value:function(t){this._opts.metric=t,this.update(null,!0)}},{key:"units",value:function(){var t=this._opts.metric?"metric":"imperial",e=Object(y.get)(this._opts,"units.".concat(t));return e&&/^(f|c)$/.test(e)&&(e=e.toUpperCase()),e}},{key:"reset",value:function(){this.$el.empty()}},{key:"update",value:function(t){}},{key:"resize",value:function(){var t=this.getSize(),e=Object(m.a)(".awxjs__legend-content",this.$el).children();e&&e.forEach((function(e){t.width=Math.max(t.width,Object(m.a)(e).outerWidth(!0))})),this.$el.css("width","".concat(t.width,"px")),this.trigger("resize",t)}}]),n}
(v.a),b=(n("ma9I"),n("iWIM")),_=n.n(b);function O(t){var e=function(){if("undefined"==typeof Reflect||!Reflect.construct)
return!1;if(Reflect.construct.sham)
return!1;if("function"==typeof Proxy)
return!0;try{return Date.prototype.toString.call(Reflect.construct(Date,[],(function(){}))),!0}catch(t){return!1}}
();return function(){var n,r=p()(t);if(e){var i=p()(this).constructor;n=Reflect.construct(r,arguments,i)}else
n=r.apply(this,arguments);return f()(this,n)}}
var w=function(t){l()(n,t);var e=O(n);function n(){var t;return o()(this,n),(t=e.apply(this,arguments))._load=Object(y.debounce)((function(e){if(!e){var n=new Error("Invalid legend url");return t.trigger("load:error",{error:n}),void t.$el.hide()}
t._image||(t._image=new Image),t.trigger("load:start"),t._image.onload=function(){var n=t.units(),r=t.opts.title?t.opts.title.replace(/\([^\)]+\)$/,"".concat(n?"(".concat(n,")"):"")):null;t.$el.html("\n\t\t\t\t".concat(t.opts.title?'<div class="awxjs__legend-title">'.concat(r,"</div>"):"",'\n\t\t\t\t<div class="awxjs__legend-content"><img src="').concat(e,'"></div>\n\t\t\t')),t.trigger("load:done"),setTimeout((function(){var e=t.getSize();e.width=Math.max(e.width,t._image.width),t.$el.css("width","".concat(e.width,"px")),t.trigger("resize",e)}),150)},t._image.onerror=function(){console.warn("[Aeris] ImageLegend - Failed to load image from ".concat(e))},t._image.src=e}),250),t}
return c()(n,[{key:"url",value:function(){var t;Object(y.isPlainObject)(this.opts.url)?t=t[this.opts.metric?"metric":"imperial"]:Object(y.isString)(this.opts.url)&&(t=this.opts.url);return t}},{key:"getSize",value:function(){var t=_()(p()(n.prototype),"getSize",this).call(this);return this._image&&(t.width=Math.max(t.width,this._image.width)),t}},{key:"reset",value:function(){this.$el.empty(),this._image&&(this._image.onload=null),this._image=null}},{key:"update",value:function(t){var e=arguments.length>1&&void 0!==arguments[1]&&arguments[1];Object(y.isEmpty)(t)||(e=!0),!e&&this._image||this._load(this.url())}},{key:"image",get:function(){return this._image}}]),n}
(k);n("TeQF"),n("4mDm"),n("oVuX"),n("EnZy"),n("GRPF"),n("3bBZ");function j(t){var e=function(){if("undefined"==typeof Reflect||!Reflect.construct)
return!1;if(Reflect.construct.sham)
return!1;if("function"==typeof Proxy)
return!0;try{return Date.prototype.toString.call(Reflect.construct(Date,[],(function(){}))),!0}catch(t){return!1}}
();return function(){var n,r=p()(t);if(e){var i=p()(this).constructor;n=Reflect.construct(r,arguments,i)}else
n=r.apply(this,arguments);return f()(this,n)}}
var x,T=function(t){l()(n,t);var e=j(n);function n(){return o()(this,n),e.apply(this,arguments)}
return c()(n,[{key:"setSize",value:function(t){this.opts.size=Object(y.extend)(this.opts.size,t),this.update()}},{key:"url",value:function(){return this._url()}},{key:"_url",value:function(){var t=this.opts,e=Object(y.extend)({interval:1,gutter:null,radius:6,columns:4,metric:!1,orientation:"h",cell:{size:{width:2,height:10}},label:{interval:20,position:"b",fontsize:11,color:"#222222"}},t.styles),n=t.type||"bar",r=e.cell||{},i=e.label||{},a={};if("point"===n)
if(Object(y.isset)(e.gutter)){if(Object(y.isString)(e.gutter)){var o=e.gutter.split(",");e.gutter={x:o[0],y:o[1]}}}else
e.gutter={x:20,y:5};if(a.ls=i.fontsize,Object(y.isEmpty)(i.custom)||(a.labels=i.custom.replace(/,\s+/g,",").replace(/\s/g,"%20")),!Object(y.isEmpty)(i.color)){var s=i.color.replace(/#/,"");6===s.length&&(a.lc=s)}"point"!==n||Object(y.isEmpty)(e.filter_groups)||(a.filter=e.filter_groups),Object(y.isset)(t.range)&&(Object(y.isString)(t.range)?a.range=",".concat(t.range):Object(y.isArray)(t.range)&&(1===t.range.length?a.range=",".concat(t.range[0]):a.range=t.range.join(","))),Object(y.isset)(t.keys)?a.keys=t.keys:Object(y.isset)(t.filter)&&(a.filter=t.filter);var c=e.units;c&&(t.metric?a.units=c.metric:a.units=c.imperial);var u=t.size||{width:null,height:null},l=u.width,h=u.height,f=r.size||{width:null,height:null},d=f.width,p=f.height,v={type:n,interval:Object(y.isEmpty)(e.interval)?"":"-i".concat(e.interval),label:{interval:Object(y.isEmpty)(i.interval)?"":"-li".concat(i.interval)},cell:{size:Object(y.isEmpty)(d)||Object(y.isEmpty)(p)?"":"-c".concat(d,"x").concat(p),pad:Object(y.isset)(e.gutter)?"-p".concat(e.gutter.x,",").concat(e.gutter.y):""},layout:"-".concat(e.orientation,",").concat(i.position),metric:t.metric?"-metric":"",size:Object(y.isEmpty)(l)||Object(y.isEmpty)(h)||t.autosize?"":"_".concat(l,"x").concat(h),format:t.format,radius:Object(y.isEmpty)(e.radius)?"":"-r".concat(e.radius),columns:!Object(y.isEmpty)(e.columns)&&e.columns>0?"-col".concat(e.columns):""},m="https://legends.aerisapi.com/".concat(this.key);return m+="point"===n?"".concat(v.radius).concat(v.columns).concat(v.cell.pad):"".concat(v.interval).concat(v.label.interval).concat(v.cell.size).concat(v.cell.pad).concat(v.layout).concat(v.metric),m+="".concat(v.size,".").concat(v.format),m+=(m.indexOf("?")>-1?"&":"?")+Object.keys(a).map((function(t){return"".concat(encodeURIComponent(t),"=").concat(a[t])})).join("&")}}]),n}
(w),S=(n("Rfxz"),n("sMBO"),n("qePV"),n("kSko"),n("toAj"),n("DA0x")),M=Math.PI/180,L=180/Math.PI,I=function(t){return 128/Math.PI*Math.pow(2,t)},R=function(t){return t*M},E=function(t){return t*L},P=function(t,e,n){var r=Math.PI,i=128/r*Math.pow(2,e),a=R(t.lat),o=i*(R(t.lon)+r),s=i*(r-Math.log(Math.tan(.25*r+.5*a)));return{x:.5*n.width-o,y:.5*n.height-s}},D=function(t){var e=arguments.length>1&&void 0!==arguments[1]?arguments[1]:4,n=Math.pow(10,e);return Math.round(t*n)/n};function z(t){var e=function(){if("undefined"==typeof Reflect||!Reflect.construct)
return!1;if(Reflect.construct.sham)
return!1;if("function"==typeof Proxy)
return!0;try{return Date.prototype.toString.call(Reflect.construct(Date,[],(function(){}))),!0}catch(t){return!1}}
();return function(){var n,r=p()(t);if(e){var i=p()(this).constructor;n=Reflect.construct(r,arguments,i)}else
n=r.apply(this,arguments);return f()(this,n)}}
!function(t){t.pointToCoord=function(t,e,n){var r=arguments.length>3&&void 0!==arguments[3]?arguments[3]:void 0,i=arguments.length>4&&void 0!==arguments[4]?arguments[4]:void 0,a=Math.PI,o=I(n),s=r&&i?P(r,n,i):{x:0,y:0},c=t-s.x,u=e-s.y,l=c/o-a,h=2*(Math.atan(Math.exp(a-u/o))-.25*a);return{lat:E(h),lon:E(l)}},t.coordToPoint=function(t,e,n){var r=arguments.length>3&&void 0!==arguments[3]?arguments[3]:void 0,i=arguments.length>4&&void 0!==arguments[4]?arguments[4]:void 0;e*=M,t*=M;var a=Math.PI,o=I(n),s=r&&i?P(r,n,i):{x:0,y:0},c=o*(e+a),u=o*(a-Math.log(Math.tan(.25*a+.5*t)));return{x:c+s.x,y:u+s.y}},t.getBoundsCenter=function(t){var e=(t.west+t.east)/2;return t.west>t.east&&(e=t.west-360+(t.west+t.east)/2),{lat:(t.south+t.north)/2,lon:e}},t.getBoundsZoomLevel=function(t,e){var n=function(t){var e=Math.sin(t*Math.PI/180),n=Math.log((1+e)/(1-e))/2;return Math.max(Math.min(n,Math.PI),-Math.PI)/2},r=function(t,e,n){return Math.floor(Math.log(t/e/n)/Math.LN2)},i=(n(t.north)-n(t.south))/Math.PI,a=t.east-t.west,o=(a<0?a+360:a)/360,s=r(e.height,256,i),c=r(e.width,256,o);return Math.min(s,c,21)},t.getSizeForBounds=function(e,n){var r=t.coordToPoint(e.north,e.west,n),i=t.coordToPoint(e.south,e.east,n);return{width:i.x-r.x,height:i.y-r.y}},t.getBoundsThatFits=function(e,n){var r=arguments.length>2&&void 0!==arguments[2]?arguments[2]:0,i=0,a=t.coordToPoint(e.north,e.west,i),o=t.coordToPoint(e.south,e.east,i),s=Math.abs(o.x-a.x),c=Math.abs(o.y-a.y),u={x:a.x+s/2,y:a.y+c/2},l={width:s,height:c},h=n.height/n.width,f=D(c/s,2),d=l.width/n.width;if(h!==f)
if(n.width<n.height){var p=n.width/n.height;l.height=l.width*(1/p)}else{var v=n.height/n.width;l.width=l.height*(1/v)}
l.width+=r*d,l.height+=r*d;var y={x:l.width/2,y:l.height/2},m=t.pointToCoord(u.x-y.x,u.y-y.y,i),g=t.pointToCoord(u.x+y.x,u.y+y.y,i);return{north:D(m.lat),south:D(g.lat),west:D(m.lon),east:D(g.lon)}},t.coordToTile=function(t,e){var n=Math.PI,r=t.lon,i=R(t.lat);return{x:Math.floor((r+180)/360*Math.pow(2,e)),y:Math.floor((1-Math.log(Math.tan(i)+1/Math.cos(i))/n)/2*Math.pow(2,e))}},t.tileToCoord=function(t,e){var n=Math.PI-2*Math.PI*t.y/Math.pow(2,e);return{lat:180/Math.PI*Math.atan(.5*(Math.exp(n)-Math.exp(-n))),lon:t.x/Math.pow(2,e)*360-180}}}
(x||(x={}));var A=function(t,e,n,r){var i={lat:t,lon:e},a=x.pointToCoord(0,0,n,i,r),o=x.pointToCoord(r.width,r.height,n,i,r);return a.lat=parseFloat(a.lat.toFixed(2)),a.lon=parseFloat(a.lon.toFixed(2)),o.lat=parseFloat(o.lat.toFixed(2)),o.lon=parseFloat(o.lon.toFixed(2)),"".concat(a.lat,",").concat(a.lon,",").concat(o.lat,",").concat(o.lon)},F=function(t){l()(n,t);var e=z(n);function n(){return o()(this,n),e.apply(this,arguments)}
return c()(n,[{key:"update",value:function(t){var e=arguments.length>1&&void 0!==arguments[1]&&arguments[1];if(t){if(t.within){if(t.within.bounds){var r=t.within.bounds,i=r.east,a=r.west,o=Math.abs(i-a),s=Math.floor(o/360);s>0&&(a=-180,i=180),t.within.bounds.west=a,t.within.bounds.east=i}
this.opts.within=t.within}
this._update()}else
Object(y.isset)(this.opts.keys)&&_()(p()(n.prototype),"update",this).call(this,t,e)}},{key:"_update",value:function(){var t=this;this.account?(this._request||(this._request=Object(y.debounce)((function(e){t._getVtecCodes(e).then((function(e){if(t.opts.keys=e.join(","),0===e.length){var n=t.opts.title?t.opts.title.replace(/\([^\)]+\)$/,""):null;t.$el.html("\n\t\t\t\t\t\t\t".concat(n?'<div class="awxjs__legend-title">'.concat(n,"</div>"):"",'\n\t\t\t\t\t\t\t<div class="awxjs__legend-content">\n\t\t\t\t\t\t\t\t<div class="awxjs__legend-empty">No advisories within map bounds.</div>\n\t\t\t\t\t\t\t</div>\n\t\t\t\t\t\t')),t.resize()}else
t.show(),t.update(null,!0)}))}),1e3)),this._request(this.opts.within)):console.warn("[Aeris] Cannot render advisories/alerts legend, no valid Aeris account defined")}},{key:"_getVtecCodes",value:function(){var t=this,e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:{},n=e.size,r=e.center,i=e.bounds,a=e.zoom;return a=parseInt(a,10),new Promise((function(e,o){if(!i){if(!n||Number.isNaN(n.width)||Number.isNaN(n.height))
return void o(new Error("Size is not a number"));!i&&r&&(Object(y.isString)(r)&&/^[\d\.-]+,[\d\.-]+/.test(r)?(r=r.split(","),i=A(r[0],r[1],a,n)):Object(y.isObject)(r)&&r.lat&&r.lon&&(i=A(r.lat,r.lon,a,n)))}
i?t._getAdvisories(i).then((function(t){e(t)})):r&&t._getPlace(r,n,a).then((function(n){t._getAdvisories(n).then((function(t){e(t)}))}))}))}},{key:"_getPlace",value:function(t,e,n){var r=this;return new Promise((function(i,a){new S.a({client:r.account.credentials()}).endpoint("places").place(t).limit(1).get().then((function(t){if(t.data){var r=t.data.loc,o=r.lat,s=r.long,c=A(o,s,n,e).split(",").map((function(t){return parseFloat(t)}));4===c.length?i({north:c[0],west:c[1],south:c[2],east:c[3]}):a()}}))}))}},{key:"_getAdvisories",value:function(t){var e=this;return new Promise((function(n,r){var i=e.account.canAccess("advisories_summary"),a=!0,o=function(t,n){var r=new S.a({client:e.account.credentials()});return n?(r.endpoint("alerts/summary").fields("summary.typeCodes,summary.types.type,summary.types.code"),r.sort("priority:1"),a=!1):r.endpoint("alerts").fields("details.type,details.name").limit(300),(t.west<-180||t.west>180)&&(t.west+=360*Math.floor(t.west/360)),r.action("within").bounds(t),r},s=function(t){var e=[];t&&(i?(t=t[0]||t,(Object(y.get)(t,"summary.types")||[]).filter((function(t){return Object(y.isset)(t)&&Object(y.isset)(t.code)})).forEach((function(t){var n=t.code,r=t.type,i=e.some((function(t){return t.code===n}));n&&!1===i&&e.push({code:n,name:r.toUpperCase()})}))):t.filter((function(t){return Object(y.isset)(t)&&Object(y.isset)(t.type)})).forEach((function(t){var n=t.details,r=n.type,i=n.name,a=e.some((function(t){return t.code===r}));r&&!1===a&&e.push({code:r,name:i.toUpperCase()})})));return(a?e.sort((function(t,e){return t.name<e.name?-1:t.name>e.name?1:0})):e).reduce((function(t,e){return t.push(e.code),t}),[])},c=t.west,u=t.east,l=c>u?Math.abs(180-c+(180-Math.abs(u))):Math.abs(u-c);if(l>180||c>u){var h=c>u,f=c+l/2,d=new S.a({client:e.account.credentials()}),p=o(Object(y.extend)({},t,{east:h?180:f}),i),v=o(Object(y.extend)({},t,{west:h?-180:f}),i);d.addRequest(p),d.addRequest(v),d.get().then((function(t){var e=Object(y.get)(t,"data.responses"),r=i?{summary:{types:[],typeCodes:[]}}:[];e&&e.forEach((function(t){if(t=t.response||t)
if(i){var e=(t[0]||t).summary||{},n=e.types,a=e.typeCodes;r.summary.types=r.summary.types.concat(n),r.summary.typeCodes=r.summary.typeCodes.concat(a)}else
Object(y.isEmpty)(t)||(r=r.concat(t))}));var a=s(r||{});n(a)}))}else{o(t,i).get().then((function(t){var e=s(t.data||{});n(e)}))}}))}}]),n}
(T);function C(t){var e=function(){if("undefined"==typeof Reflect||!Reflect.construct)
return!1;if(Reflect.construct.sham)
return!1;if("function"==typeof Proxy)
return!0;try{return Date.prototype.toString.call(Reflect.construct(Date,[],(function(){}))),!0}catch(t){return!1}}
();return function(){var n,r=p()(t);if(e){var i=p()(this).constructor;n=Reflect.construct(r,arguments,i)}else
n=r.apply(this,arguments);return f()(this,n)}}
var B=function(t){l()(n,t);var e=C(n);function n(t,r){var i;return o()(this,n),(i=e.call(this))._loaded=[],i._key=t,i._opts=Object(y.extend)({types:null},r),i._target=Object(m.a)('<div class="awxjs__legend awxjs__legend-group awxjs__legend-'.concat(t,'"></div>')),i._legends={},i._opts.types&&(i.trigger("load:start"),Object.keys(i._opts.types).forEach((function(t){var e=Object(y.extend)({},r,Object(y.cloneDeep)(i._opts.types[t]));delete e.types,Object(y.isEmpty)(e.use)||(t=e.use);var n=new T(t,e);n.on("load:done",(function(){i._loaded.push(t),i._checkLoaded()})),i._legends[t]=n,i.$el.append(n.$el)}))),i}
return c()(n,[{key:"key",get:function(){return this._key}},{key:"opts",get:function(){return this._opts}},{key:"$el",get:function(){return this._target}}]),c()(n,[{key:"show",value:function(){this.$el.show()}},{key:"hide",value:function(){this.$el.hide()}},{key:"setSize",value:function(t){var e=this;Object.keys(this._legends).forEach((function(n){var r=e.opts.types[n];e._legends[n].setSize({width:t.width*r.factor,height:t.height})}))}},{key:"getSize",value:function(){var t=this,e=this.$el.bounds(),n=0,r=e.height;return Object.keys(this._legends).forEach((function(e){var i=t._legends[e];if(i.$el){var a=i.$el.bounds();n+=a.width,r=Math.max(r,a.height)}})),{width:n,height:r}}},{key:"setMetric",value:function(t){var e=this;Object.keys(this._legends).forEach((function(n){e._legends[n].setMetric(t)}))}},{key:"reset",value:function(){this.$el.empty(),this._legends=null,this._loaded=[]}},{key:"update",value:function(t){var e=this,n=arguments.length>1&&void 0!==arguments[1]&&arguments[1];this.trigger("load:start"),Object.keys(this._legends).forEach((function(t){e._legends[t].update(null,n)}))}},{key:"_checkLoaded",value:function(){var t=this;this._loaded.length===Object.keys(this._opts.types).length&&(this.trigger("load:done"),setTimeout((function(){var e=t.getSize();t.$el.css("width","".concat(e.width,"px")),t.trigger("resize",e)}),150))}}]),n}
(v.a),V=n("qV3b"),q=(n("Tskq"),n("PKPk"),n("RIqP")),W=n.n(q);function N(t){var e=function(){if("undefined"==typeof Reflect||!Reflect.construct)
return!1;if(Reflect.construct.sham)
return!1;if("function"==typeof Proxy)
return!0;try{return Date.prototype.toString.call(Reflect.construct(Date,[],(function(){}))),!0}catch(t){return!1}}
();return function(){var n,r=p()(t);if(e){var i=p()(this).constructor;n=Reflect.construct(r,arguments,i)}else
n=r.apply(this,arguments);return f()(this,n)}}
var Z=function(t){l()(n,t);var e=N(n);function n(){var t;return o()(this,n),(t=e.apply(this,arguments))._mapping=new Map,t._refs=new Map,t}
return c()(n,[{key:"add",value:function(t,e){this.get(t)||_()(p()(n.prototype),"add",this).call(this,t,e),this.increment(t)}},{key:"has",value:function(t){return Object(y.isset)(this.get(t))}},{key:"remove",value:function(t){var e=arguments.length>1&&void 0!==arguments[1]&&arguments[1],r=this.get(t);if(r)
if(e)
_()(p()(n.prototype),"remove",this).call(this,t),this.mapping.delete(t),this.refs.delete(t);else{this.decrement(t);var i=this.refCount(t);0===i&&_()(p()(n.prototype),"remove",this).call(this,t)}}},{key:"map",value:function(t,e){var n=this.mapping.get(t)||[];this._mapping.set(t,[].concat(W()(n),[e]))}},{key:"increment",value:function(t){var e=this.refCount(t);this.refs.set(t,e+1)}},{key:"decrement",value:function(t){var e=this.refCount(t);e>0&&this.refs.set(t,e-1)}},{key:"refCount",value:function(t){return this.refs.get(t)||0}},{key:"mapping",get:function(){return this._mapping}},{key:"refs",get:function(){return this._refs}}]),n}
(n("QAwG").a);function $(t){var e=function(){if("undefined"==typeof Reflect||!Reflect.construct)
return!1;if(Reflect.construct.sham)
return!1;if("function"==typeof Proxy)
return!0;try{return Date.prototype.toString.call(Reflect.construct(Date,[],(function(){}))),!0}catch(t){return!1}}
();return function(){var n,r=p()(t);if(e){var i=p()(this).constructor;n=Reflect.construct(r,arguments,i)}else
n=r.apply(this,arguments);return f()(this,n)}}
var H=function(t,e,n,r){return new(n||(n=Promise))((function(i,a){function o(t){try{c(r.next(t))}catch(t){a(t)}}
function s(t){try{c(r.throw(t))}catch(t){a(t)}}
function c(t){var e;t.done?i(t.value):(e=t.value,e instanceof n?e:new n((function(t){t(e)}))).then(o,s)}
c((r=r.apply(t,e||[])).next())}))},U=function(t){l()(n,t);var e=$(n);function n(t,r){var i;if(o()(this,n),(i=e.call(this))._loading=!1,i._loadCallbacks={},i._onResize=function(){i.trigger("resize",i.getSize())},!t)
throw new Error("[Aeris] Invalid DOM target specified for LegendView");return i._opts=Object(y.extend)({size:{width:400,height:40}},r),i._store=new Z,Object(m.a)(t).append('<div class="awxjs__legend-view"></div>'),i._target=Object(m.a)(".awxjs__legend-view",t),i}
return c()(n,[{key:"$el",get:function(){return this._target}},{key:"count",get:function(){return this._store.count}}]),c()(n,[{key:"add",value:function(t,e){var n,r=this,i=this.getKey(t);if(!this._configs)
return this._loadCallbacks[t]=function(){r.add(t,e)},void(!1===this._loading&&this.loadStyles());"image"===(e=Object(y.extend)(Object(y.cloneDeep)(this._opts),e)).type&&(n=e);var a=this.configForType(t);if(a){var o=a.config;if(Object(y.isEmpty)(o)||(n=o),!Object(y.isEmpty)(o.use)){var s=this.configForType(o.use);n=Object.assign(Object.assign({},s),n)}}
if(Object(y.isset)(n)){var c=Object(y.extend)(e,{title:n.title,size:this._opts.size,autosize:this._opts.autosize,format:this._opts.format,metric:this._opts.metric},n,e),u=this._store.get(i);if(u)
return this._store.increment(i),void u.update(c);n&&!Object(y.isEmpty)(n)&&(u=this.createLegend(t,n,c),this.addLegend(u),i!==t&&this._store.map(i,t))}}},{key:"get",value:function(t){var e=this.getKey(t);return e?this._store.get(e):null}},{key:"set",value:function(t,e){var n=this;t=t||[],this.removeAll(t),t.forEach((function(t){n.has(t)?n.get(t).update(e):n.add(t,e)}))}},{key:"remove",value:function(t){var e=this.getKey(t);if(e){var n=this._store.get(e);n&&(this._store.remove(e),0===this._store.refCount(e)&&this.removeLegend(n)),n instanceof v.a&&n.off("resize",this._onResize),this._onResize()}
0===this.count&&(this.$el.hide(),this.trigger("empty"))}},{key:"setUrl",value:function(t){this.removeAll(),this.$el.empty(),this.$el.append('<div class="awxjs__legend"><img src="'.concat(t,'"></div>'))}},{key:"addLegend",value:function(t){var e=t.key;this._store.add(e,t),this.$el.append(t.$el),this.$el.show(),t instanceof v.a&&t.on("resize",this._onResize),this.trigger("add",{key:t.key,count:this.count}),this._onResize()}},{key:"removeLegend",value:function(t){t&&(t.$el.remove(),this._store.remove(t.key,!0),this.trigger("remove",{key:t.key,count:this.count}))}},{key:"removeAll",value:function(t){var e=this;Object.keys(this._store.items).forEach((function(n){var r=!0;if(t){var i=e._store.mapping.get(n)||[];-1!==t.indexOf(n)?r=!1:i&&i.forEach((function(e){-1!==t.indexOf(e)&&(r=!1)}))}
r&&e.remove(n)}))}},{key:"has",value:function(t){var e=this.configForType(t).key;return!!e&&this._store.has(e)}},{key:"update",value:function(t){this._each((function(e,n){return n.update(t)}))}},{key:"setMetric",value:function(t){this._opts.metric=t,this._each((function(e,n){return n.setMetric(t)}))}},{key:"setSize",value:function(t){this._opts.size=t,this._each((function(e,n){return n.setSize(t)}))}},{key:"getSize",value:function(){var t=0,e=0;return this._each((function(n,r){var i=r.getSize();t+=i.height,e=Math.max(e,i.width)})),{width:e,height:t}}},{key:"setWidth",value:function(t){var e=this._opts.size.height;this.setSize({width:t,height:e})}},{key:"configForType",value:function(t){var e=this;if(!this._configs)
return{key:null,config:null};var n,r=this._configs[t];return!r&&/^f/.test(t)&&(n=t.replace(/^f/,""),r=this._configs[n]),r||Object.keys(this._configs).forEach((function(i){var a=e._configs[i];if(!0===a.enabled||!Object(y.isset)(a.enabled)){var o=a.layers;o&&(o.forEach((function(e){new RegExp(e).test(t)&&(r=Object(y.cloneDeep)(a),n=i)})),r&&!n&&(n=i))}})),{key:n||t,config:Object(y.cloneDeep)(r)}}},{key:"_reset",value:function(){this.$el.empty(),this._each((function(t,e){return e.reset()}))}},{key:"_each",value:function(t){this._store.each(t)}},{key:"getKey",value:function(t){var e=t,n=this.configForType(t);n&&(e=n.key);return e}},{key:"createLegend",value:function(t,e,n){var r,i=this,a=this.getKey(t);if("image"===e.type)
r=new w(a,n);else if(e.grouped&&e.items){var o=n.types||{};n.types=e.items.reduce((function(t,e){var n=i.configForType(e.key).config,r=Object(y.extend)({factor:e.factor,size:{height:i._opts.size.height}},n,o[e.key]);return r.size.width=Math.floor(i._opts.size.width*r.factor),t[e.key]=r,t}),{}),r=new B(a,n)}else"alerts"===t||"advisories"===t||/^alerts-/.test(t)?(r=new F(a,n),Object(y.isset)(n.within)&&setTimeout((function(){i.update({account:n.account,within:n.within})}),500)):r=new T(a,n);return r}},{key:"loadStyles",value:function(){var t=this;return this._loading=!0,new Promise((function(e,n){return H(t,void 0,void 0,i.a.mark((function t(){var n=this;return i.a.wrap((function(t){for(;;)
switch(t.prev=t.next){case 0:if(!this._configs){t.next=3;break}
return e(this._configs),t.abrupt("return");case 3:V.b.request("https://legends.aerisapi.com/defaults.json").then((function(t){if(t.data){var r=t.data;Object.keys(r).forEach((function(t){var e=r[t];e.config&&(Object.keys(e.config).forEach((function(t){if(-1!==t.indexOf("_")){var n=t.replace(/^labels_/,"label_").replace(/_/g,".");Object(y.set)(e.config,n,e.config[t]),delete e.config[t]}})),e.styles=Object(y.cloneDeep)(e.config),delete e.config)})),n._configs=r,n._loading=!1,e(Object(y.cloneDeep)(n._configs)),Object.keys(n._loadCallbacks).forEach((function(t){(0,n._loadCallbacks[t])()}))}}));case 4:case"end":return t.stop()}}),t,this)})))}))}}]),n}
(v.a);e.a=U},GKVU:function(t,e,n){"use strict";var r=n("I+eb"),i=n("hXpO");r({target:"String",proto:!0,forced:n("rwPt")("anchor")},{anchor:function(t){return i(this,"a","name",t)}})},GRPF:function(t,e,n){"use strict";var r=n("I+eb"),i=n("hXpO");r({target:"String",proto:!0,forced:n("rwPt")("fontsize")},{fontsize:function(t){return i(this,"font","size",t)}})},"Hz+P":function(t,e,n){"use strict";n.d(e,"c",(function(){return l})),n.d(e,"b",(function(){return d})),n.d(e,"d",(function(){return p})),n.d(e,"a",(function(){return v}));n("yXV3"),n("rB9j"),n("UxlC"),n("EnZy");var r=n("DA0x"),i=n("GdSY"),a=n("gqGf"),o=n("0lfv"),s=n("lnrW"),c=n("njwm"),u=void 0,l=function(t){if(Object(o.isString)(t)){var e=t.split("::");return e[e.length-1]}},h=function(t,e){var n=e.layer,r=e.request,a=new i.a({server:r.server,client:{id:t.id,secret:t.secret}},{type:"tile"});return a.layers(n),a},f=function(t,e,n){var r=Object(o.get)(e,"data.service");return Object(o.isFunction)(r)&&(r=r()),r instanceof i.a&&r.type("tile"),n.tileLayer(t,r,e)},d=function(t,e,n,i){var s=n||{},c=s.account,u=s.servers;if(delete n.account,delete n.servers,-1===["tile","vector","geojson","text"].indexOf(e))
return null;if("tile"===e)
return f(t,n,i);if(n.data&&!Object(o.isset)(Object(o.get)(n,"data.service"))){var l=function(t,e){if(!Object(o.isset)(e))
return null;var n=e.service;if(Object(o.isset)(e.request)){var i=e.request;if(n){var a=i.action,s=i.parameters;a&&n.action(a),s&&n.setParams(s)}else
i.endpoint&&((n=new r.a({server:i.server,client:{id:t.id,secret:t.secret}})).endpoint(i.endpoint),i.action&&n.action(i.action),i.parameters&&n.setParams(i.parameters))}
return n}
(c,Object(o.extend)({},{request:{server:u.api}},n.data));Object(o.set)(n,"data.service",l)}
return"vector"===e?new a.d(t,n):"geojson"===e?new a.a(t,n):"text"===e?new a.b(t,n):null},p=function(t){return t.replace(/\:[^,]+/g,"")},v=function(t){var e=arguments.length>1&&void 0!==arguments[1]?arguments[1]:{},n=arguments.length>2?arguments[2]:void 0,r=arguments.length>3?arguments[3]:void 0,i=e||{},a=i.account,l=i.servers,v=i.timeline,y=void 0===v?{}:v,m=p(t),g=Object(o.get)(e,"id")||m;if(Object(s.c)(t)||"tile"===e.type){delete e.data;var k=!Object(o.isset)(e.validate)||e.validate;if(!0===k&&!r.exists(t)){var b=r.findInvalidIds(t);return console.warn("[Aeris] Cannot add layer(s) {".concat(b,"}, not a valid AerisWeather Maps layer. See https://www.aerisweather.com/support/docs/aeris-maps/reference/map-layers/ for the list of supported AMP layers.")),u}
var _=r.isFuture(t),O=r.isBase(t),w=r.isOverlay(t),j=Object(o.get)(e,"alwaysShow");Object(o.isset)(j)||(j=_?y.alwaysShowFuture:y.alwaysShowPast);var x=h(a,{layer:t,request:{server:l.maps}});x.param("format",Object(o.get)(e,"style.format")||"png");var T=e;if(w||O)
T=Object(o.extend)(T,{pane:w?"admin":null,offset:0,alwaysShow:!0,animation:{enabled:!1}});else{var S=y.intervals;T=Object(o.extend)({animation:{enabled:!0,intervals:S}},T,{offset:Object(o.get)(e,"data.offset"),future:_,alwaysShow:j,animation:{bufferIntervals:y.bufferIntervals,showLoadingIntervals:y.showLoadingIntervals}})}
T.zIndex=Object(o.get)(e,"style.zIndex");var M=f(g,Object(o.extend)(T,{data:{service:x}}),n);return M.updateVisibility(),M}
var L="vector";Object(s.b)(t)&&(L="text");var I=Object(c.a)(t),R=Object(o.extend)({data:{request:{parameters:{plimit:1}},coordinate:function(t){return Object(o.get)(t,"loc")}},requiresBounds:"search"!==Object(o.get)(I,"data.request.action")},I,e);return d(g,L,R,n)}},QAwG:function(t,e,n){"use strict";n("QWBl"),n("pjDv"),n("4mDm"),n("E9XD"),n("Tskq"),n("tkto"),n("07d7"),n("PKPk"),n("FZtP"),n("3bBZ");var r=n("J4zp"),i=n.n(r),a=n("lwsE"),o=n.n(a),s=n("W8MJ"),c=n.n(s),u=n("0lfv"),l=function(){function t(){o()(this,t),this.store=new Map}
return c()(t,[{key:"has",value:function(t){return Object(u.isset)(this.get(t))}},{key:"get",value:function(t){return this.store.get(t)}},{key:"add",value:function(t,e){this.store.set(t,e)}},{key:"remove",value:function(t){this.store.delete(t)}},{key:"each",value:function(t){var e=this.items;Object.keys(e).forEach((function(n){return t(n,e[n])}))}},{key:"items",get:function(){return Array.from(this.store.entries()).reduce((function(t,e){var n=i()(e,2),r=n[0],a=n[1];return t[r]=a,t}),{})}},{key:"count",get:function(){return this.store.size}}]),t}
();e.a=l},R1Yn:function(t,e,n){"use strict";n.r(e),n.d(e,"mapTimestampFromDate",(function(){return a})),n.d(e,"isCoordObject",(function(){return o})),n.d(e,"isLeaflet",(function(){return s})),n.d(e,"isMapbox",(function(){return c})),n.d(e,"isMaplibre",(function(){return u})),n.d(e,"isGoogle",(function(){return l})),n.d(e,"isOpenLayers",(function(){return h})),n.d(e,"isMapsGLLayer",(function(){return f})),n.d(e,"renderWithFallback",(function(){return d})),n.d(e,"loadMapModuleConfig",(function(){return p}));n("2B1R");var r=n("Cr01"),i=n("0lfv"),a=function(t){var e=new Date(t.getTime()+60*t.getTimezoneOffset()*1e3);return Object(i.formatDate)(e,"yyyyMMddHHmm00")},o=function(t){if(Object(i.isPlainObject)(t)){var e=t.lat,n=t.lon;return Object(i.isset)(e)&&Object(i.isset)(n)}
return!1},s=function(t){if(t){var e=Object(i.has)(t,"openPopup");if("undefined"!=typeof L&&(t instanceof L.map||t instanceof L.Map)&&e)
return!0;if(!Object(i.isHTMLElement)(t)&&e)
return!0}
return!1},c=function(t){if(t){var e=Object(i.has)(t,"queryRenderedFeatures");if("undefined"!=typeof mapboxgl&&t instanceof mapboxgl.Map&&e)
return!0;if(!Object(i.isHTMLElement)(t)&&e)
return!0}
return!1},u=function(t){if(t){var e=Object(i.has)(t,"queryRenderedFeatures");if("undefined"!=typeof maplibregl&&t instanceof maplibregl.Map&&e)
return!0;if(!Object(i.isHTMLElement)(t)&&e)
return!0}
return!1},l=function(t){if(t){var e=Object(i.has)(t,"getStreetView");if("undefined"!=typeof google&&t instanceof google.maps.Map&&e)
return!0;if(!Object(i.isHTMLElement)(t)&&e)
return!0}
return!1},h=function(t){if(t){var e=Object(i.has)(t,"forEachFeatureAtPixel");if("undefined"!=typeof ol&&t instanceof ol.Map&&e)
return!0;if(!Object(i.isHTMLElement)(t)&&e)
return!0}
return!1},f=function(t){return/^mapsgl__/.test(t)||/^mapsgl::/.test(t)},d=function(t,e){var n=arguments.length>2&&void 0!==arguments[2]?arguments[2]:"";return t&&Object(i.isset)(e)&&!Object(i.isEmpty)(e)?t(e):n},p=function(t,e){Object(r.modulesLoader)().then((function(n){var r=Object(i.get)(n,t);r&&r().then((function(t){var n=new(t=t.default||t);e(n.id,n.source(),n)}))}))}},TfTi:function(t,e,n){"use strict";var r=n("A2ZE"),i=n("ewvW"),a=n("m92n"),o=n("6VoE"),s=n("UMSQ"),c=n("hBjN"),u=n("NaFW");t.exports=function(t){var e,n,l,h,f,d,p=i(t),v="function"==typeof this?this:Array,y=arguments.length,m=y>1?arguments[1]:void 0,g=void 0!==m,k=u(p),b=0;if(g&&(m=r(m,y>2?arguments[2]:void 0,2)),null==k||v==Array&&o(k))
for(n=new v(e=s(p.length));e>b;b++)
d=g?m(p[b],b):p[b],c(n,b,d);else
for(f=(h=k.call(p)).next,n=new v;!(l=f.call(h)).done;b++)
d=g?a(h,m,[l.value,b],!0):l.value,c(n,b,d);return n.length=b,n}},Tskq:function(t,e,n){"use strict";var r=n("bWFh"),i=n("ZWaQ");t.exports=r("Map",(function(t){return function(){return t(this,arguments.length?arguments[0]:void 0)}}),i)},ZWaQ:function(t,e,n){"use strict";var r=n("m/L8").f,i=n("fHMY"),a=n("4syw"),o=n("A2ZE"),s=n("GarU"),c=n("ImZN"),u=n("fdAy"),l=n("JiZb"),h=n("g6v/"),f=n("8YOa").fastKey,d=n("afO8"),p=d.set,v=d.getterFor;t.exports={getConstructor:function(t,e,n,u){var l=t((function(t,r){s(t,l,e),p(t,{type:e,index:i(null),first:void 0,last:void 0,size:0}),h||(t.size=0),null!=r&&c(r,t[u],{that:t,AS_ENTRIES:n})})),d=v(e),y=function(t,e,n){var r,i,a=d(t),o=m(t,e);return o?o.value=n:(a.last=o={index:i=f(e,!0),key:e,value:n,previous:r=a.last,next:void 0,removed:!1},a.first||(a.first=o),r&&(r.next=o),h?a.size++:t.size++,"F"!==i&&(a.index[i]=o)),t},m=function(t,e){var n,r=d(t),i=f(e);if("F"!==i)
return r.index[i];for(n=r.first;n;n=n.next)
if(n.key==e)
return n};return a(l.prototype,{clear:function(){for(var t=d(this),e=t.index,n=t.first;n;)
n.removed=!0,n.previous&&(n.previous=n.previous.next=void 0),delete e[n.index],n=n.next;t.first=t.last=void 0,h?t.size=0:this.size=0},delete:function(t){var e=this,n=d(e),r=m(e,t);if(r){var i=r.next,a=r.previous;delete n.index[r.index],r.removed=!0,a&&(a.next=i),i&&(i.previous=a),n.first==r&&(n.first=i),n.last==r&&(n.last=a),h?n.size--:e.size--}
return!!r},forEach:function(t){for(var e,n=d(this),r=o(t,arguments.length>1?arguments[1]:void 0,3);e=e?e.next:n.first;)
for(r(e.value,e.key,this);e&&e.removed;)
e=e.previous},has:function(t){return!!m(this,t)}}),a(l.prototype,n?{get:function(t){var e=m(this,t);return e&&e.value},set:function(t,e){return y(this,0===t?0:t,e)}}:{add:function(t){return y(this,t=0===t?0:t,t)}}),h&&r(l.prototype,"size",{get:function(){return d(this).size}}),l},setStrong:function(t,e,n){var r=e+" Iterator",i=v(e),a=v(r);u(t,e,(function(t,e){p(this,{type:r,target:t,state:i(t),kind:e,last:void 0})}),(function(){for(var t=a(this),e=t.kind,n=t.last;n&&n.removed;)
n=n.previous;return t.target&&(t.last=n=n?n.next:t.state.first)?"keys"==e?{value:n.key,done:!1}:"values"==e?{value:n.value,done:!1}:{value:[n.key,n.value],done:!1}:(t.target=void 0,{value:void 0,done:!0})}),n?"entries":"values",!n,!0),l(e)}}},b48C:function(t,e){t.exports=function(){if("undefined"==typeof Reflect||!Reflect.construct)
return!1;if(Reflect.construct.sham)
return!1;if("function"==typeof Proxy)
return!0;try{return Date.prototype.toString.call(Reflect.construct(Date,[],(function(){}))),!0}catch(t){return!1}}},bWFh:function(t,e,n){"use strict";var r=n("I+eb"),i=n("2oRo"),a=n("lMq5"),o=n("busE"),s=n("8YOa"),c=n("ImZN"),u=n("GarU"),l=n("hh1v"),h=n("0Dky"),f=n("HH4o"),d=n("1E5z"),p=n("cVYH");t.exports=function(t,e,n){var v=-1!==t.indexOf("Map"),y=-1!==t.indexOf("Weak"),m=v?"set":"add",g=i[t],k=g&&g.prototype,b=g,_={},O=function(t){var e=k[t];o(k,t,"add"==t?function(t){return e.call(this,0===t?0:t),this}:"delete"==t?function(t){return!(y&&!l(t))&&e.call(this,0===t?0:t)}:"get"==t?function(t){return y&&!l(t)?void 0:e.call(this,0===t?0:t)}:"has"==t?function(t){return!(y&&!l(t))&&e.call(this,0===t?0:t)}:function(t,n){return e.call(this,0===t?0:t,n),this})};if(a(t,"function"!=typeof g||!(y||k.forEach&&!h((function(){(new g).entries().next()})))))
b=n.getConstructor(e,t,v,m),s.REQUIRED=!0;else if(a(t,!0)){var w=new b,j=w[m](y?{}:-0,1)!=w,x=h((function(){w.has(1)})),T=f((function(t){new g(t)})),S=!y&&h((function(){for(var t=new g,e=5;e--;)
t[m](e,e);return!t.has(-0)}));T||((b=e((function(e,n){u(e,b,t);var r=p(new g,e,b);return null!=n&&c(n,r[m],{that:r,AS_ENTRIES:v}),r}))).prototype=k,k.constructor=b),(x||S)&&(O("delete"),O("has"),v&&O("get")),(S||j)&&O(m),y&&k.clear&&delete k.clear}
return _[t]=b,r({global:!0,forced:b!=g},_),d(b,t),y||n.setStrong(b,t,v),b}},dB9R:function(t,e,n){"use strict";n("TeQF"),n("QWBl"),n("yXV3"),n("2B1R"),n("+2oP"),n("qePV"),n("tkto"),n("07d7"),n("SuFq"),n("TWNs"),n("rB9j"),n("JfAA"),n("UxlC"),n("FZtP");var r=n("lwsE"),i=n.n(r),a=n("W8MJ"),o=n.n(a),s=n("7W2i"),c=n.n(s),u=n("a1gu"),l=n.n(u),h=n("Nsbk"),f=n.n(h),d=n("m0x2"),p=n("0lfv"),v=n("pAjv");function y(t){var e=function(){if("undefined"==typeof Reflect||!Reflect.construct)
return!1;if(Reflect.construct.sham)
return!1;if("function"==typeof Proxy)
return!0;try{return Date.prototype.toString.call(Reflect.construct(Date,[],(function(){}))),!0}catch(t){return!1}}
();return function(){var n,r=f()(t);if(e){var i=f()(this).constructor;n=Reflect.construct(r,arguments,i)}else
n=r.apply(this,arguments);return l()(this,n)}}
var m=function(t){c()(n,t);var e=y(n);function n(){var t,r=arguments.length>0&&void 0!==arguments[0]?arguments[0]:null;i()(this,n),(t=e.call(this)).manualAdvance=!1,t._startOffset=0,t._endOffset=0,t._elapsed=0,t._time=0,t._offset=0,t._manualTimes=!1,t._delay=1/60,t._increment=0,t._timer=null,t._restartTimer=null,t._paused=!1,t._currentInterval=0,t._active=!1,t._enabled=!0,r=Object(p.extend)({},{key:void 0,enabled:!0,from:0,to:0,duration:2,endDelay:1,intervals:10,autoplay:!1,future:!1,alwaysShow:!1,manualAdvance:!1},r),t._now=new Date,t.manualAdvance=r.manualAdvance||!1;var a=t._now.getTime();if(Object.keys(r).forEach((function(t){var e=r[t];if(("from"===t||"to"===t)&&Object(p.isString)(e)){var n={year:["y","yr"],month:["mn","mth"],week:["w","wk"],day:["d"],hour:["h","hr"],minute:["m","min"],second:["s","sec"]};e=e.replace(/\s/g,""),Object.keys(n).forEach((function(t){var r=n[t];Object(p.isArray)(r)&&r.forEach((function(n){var r=new RegExp("^([\\d\\.-]+)".concat(n,"$"));e=e.replace(r,"$1".concat(t))}))})),/(year|month|week|day|hour|minute|second)/.test(e)&&(e=3600*Object(p.toTimeOffsetHours)(e))}
Object(p.isNumeric)(e)&&(e=parseFloat(e)),r[t]=e})),Object(p.isString)(r.from)&&(r.from=Object(v.toDate)("".concat(r.from))),Object(p.isString)(r.to)&&(r.to=Object(v.toDate)("".concat(r.to))),t.opts=r,Object(p.isDate)(r.from)){var o=r.from;t._startOffset=o.getTime()-a,t.from=o.getTime()}else
t._startOffset=1e3*parseFloat("".concat(r.from)),t.from=a+t._startOffset;if(Object(p.isDate)(r.to)){var s=r.to;t._endOffset=s.getTime()-a,t.to=s.getTime()}else
t._endOffset=1e3*parseFloat("".concat(r.to)),t.to=a+t._endOffset;return t._enabled=r.enabled,t.duration=r.duration||2,t.endDelay=r.endDelay||1,t.totalIntervals=r.intervals||10,t._time=t.from,t._times=[],t._startup(),t}
return o()(n,[{key:"key",get:function(){return this.opts.key}},{key:"timeline",get:function(){return this._timeline},set:function(t){var e=this;this._timeline=t,t&&(this.now=t.now,this.from=t.from,this.to=t.to,["duration","endDelay"].forEach((function(n){e.opt(n,t.opt(n))})),this.goToTime(t.currentTime))}},{key:"from",get:function(){return parseFloat("".concat(this.opts.from))},set:function(t){this.stop(),this.opts.from=t,this._startOffset=t-this._now.getTime(),this._onTimingChange(),this.trigger("start:change",{from:this.startDate(),to:this.endDate()})}},{key:"to",get:function(){return parseFloat("".concat(this.opts.to))},set:function(t){this.stop(),this.opts.to=t,this._endOffset=t-this._now.getTime(),this._onTimingChange(),this.trigger("end:change",{from:this.startDate(),to:this.endDate()})}},{key:"now",get:function(){return this._now},set:function(t){this._now=t}},{key:"duration",get:function(){return this.opts.duration},set:function(t){t!==this.opts.duration&&(this.opts.duration=t,this._updateTiming())}},{key:"endDelay",get:function(){return this.opts.endDelay},set:function(t){this.opts.endDelay=t}},{key:"totalTime",get:function(){return this.to-this.from}},{key:"currentTime",get:function(){return this._time}},{key:"currentOffset",get:function(){return this._offset}},{key:"increment",get:function(){return this._increment}},{key:"position",get:function(){return this._offset/this.totalTime},set:function(t){this.goToTime(this.from+(this.to-this.from)*t)}}]),o()(n,[{key:"opt",value:function(t,e){return e?(Object(p.set)(this.opts,t,e),"intervals"===t&&(this.reset(),this.totalIntervals=e,this._updateTimes()),this):Object(p.get)(this.opts,t)}},{key:"toggle",value:function(){this.isAnimating()||this.isLoading()?this.stop():this.play()}},{key:"play",value:function(){this.isAnimating()||(this._paused||this.goToTime(this.from),this.canAnimate()&&(this._paused=!1,this._active=!0,this._updateTiming(),this.trigger("play",{from:this.startDate(),to:this.endDate()}),this._start()))}},{key:"stop",value:function(){this._clearTimers(),(this.isAnimating()||this.isLoading())&&(this._paused=!1,this._active=!1,this.trigger("stop"),this.goToInit())}},{key:"pause",value:function(){this._clearTimers(),this._paused=!0,this.trigger("pause")}},{key:"resume",value:function(){this.isAnimating()&&this._paused&&this._start(),this._paused=!1,this.trigger("resume")}},{key:"restart",value:function(){var t=this;this._clearTimers(),this._restartTimer=setTimeout((function(){t.goToTime(t.from),t._start()}),1e3*this.endDelay)}},{key:"reset",value:function(){var t=arguments.length>0&&void 0!==arguments[0]&&arguments[0];this.isAnimating()?this.stop():t&&this.goToInit(),this.trigger("reset")}},{key:"goToInit",value:function(){var t=this._now.getTime(),e=t;e>this.to?e=this.to:e<this.from&&(e=this.from),this.from>=t?e=this.from:this.to<=t&&(e=this.to),e>0&&this.goToTime(e)}},{key:"goToTime",value:function(t){var e;e=Object(p.isDate)(t)?t.getTime():t,this._offset=e-this.from;var n=this._intervalClosestToTime(e);return this._currentInterval=n,this._time=e,this._updateForTime(n),this.trigger("advance",{time:this._time,offset:this._offset,position:this.position}),this}},{key:"neededIntervals",value:function(){return this._times.slice(0)}},{key:"currentInterval",value:function(){return this._currentInterval}},{key:"currentDate",value:function(){return new Date(this.currentTime)}},{key:"startDate",value:function(){return new Date(this.from)}},{key:"setStartDate",value:function(t){var e=Object(p.isDate)(t)?t.getTime():t;return e>this.to?(console.error("[Aeris] Animation start date cannot be set to a date after the current\n\t\t\t\tend date value. You may need to change the end date first."),this):(this.from=e,this)}},{key:"startOffset",value:function(){return this._startOffset}},{key:"setStartOffset",value:function(t){var e=this._now.getTime()+t;return e>this.to?(console.error("[Aeris] Animation start offset cannot be set to a time offset after the\n\t\t\t\tcurrent end date value. You may need to change the end date or time offset first."),this):(this.from=e,this)}},{key:"endDate",value:function(){return new Date(this.to)}},{key:"setEndDate",value:function(t){var e=Object(p.isDate)(t)?t.getTime():t;if(e<this.from)
return console.error("[Aeris] Animation end date cannot be set to a date before the current\n\t\t\t\tstart date value. You may need to change the start date first."),this;this.to=e;var n=this._now.getTime();return this.to>n?this.goToTime(n):this.currentTime>this.to&&this.goToTime(this.to),this}},{key:"endOffset",value:function(){return this._endOffset}},{key:"setEndOffset",value:function(t){var e=this._now.getTime()+t;return e<this.from?(console.error("[Aeris] Animation end offset cannot be set to a time offset before the\n\t\t\t\tcurrent start date value. You may need to change the start date or time offset first."),this):(this.to=e,this)}},{key:"setTimes",value:function(t){var e=arguments.length>1&&void 0!==arguments[1]?arguments[1]:1;this.reset(),Object(p.isset)(t)?(this._manualTimes=!0,this._times=t.map((function(t){return Object(p.isset)(t.time)&&(t=t.time),t instanceof Date?t.getTime():Object(p.isNumber)(t)?t:Number.NaN})).filter((function(t,n){return Object(p.isNumeric)(t)&&n%e==0}))):(this._manualTimes=!1,this._updateTimes())}},{key:"refresh",value:function(){this._now=new Date,this.from=this._now.getTime()+this._startOffset,this.to=this._now.getTime()+this._endOffset}},{key:"canAnimate",value:function(){return this.to!==this.from&&this.isEnabled()}},{key:"canShow",value:function(t){if(!0===this.alwaysShow())
return!0;t||(t=this._time);var e=this._now.getTime(),n=t-e;return this.isFuture()?!1===this.containsPast()||this.startsAtNow()?t>=e:t>e:this.startsAtNow()&&this.containsFuture()?n<0:t<=e}},{key:"alwaysShow",value:function(){return this.opts.alwaysShow}},{key:"enabled",value:function(t){this._enabled=t}},{key:"isEnabled",value:function(){return this._enabled}},{key:"isAutoPlay",value:function(){return this.opts.autoplay}},{key:"isReady",value:function(){return!0}},{key:"isLoading",value:function(){return!1}},{key:"isAnimating",value:function(){return this._active}},{key:"isPaused",value:function(){return this._paused}},{key:"isFuture",value:function(){return!0===this.opts.future}},{key:"containsPast",value:function(){return this.startDate().getTime()<this._now.getTime()}},{key:"containsFuture",value:function(){return this.endDate().getTime()>this._now.getTime()}},{key:"startsAtNow",value:function(){return Math.abs(this.startDate().getTime()-this.now.getTime())<=3e4}},{key:"endsAtNow",value:function(){return Math.abs(this.endDate().getTime()-this.now.getTime())<=3e4}},{key:"needsData",value:function(){return!1}},{key:"_startup",value:function(){this._updateTimes(),this.opts.autoplay||this.goToInit()}},{key:"_start",value:function(){var t=this;this.timeline||(this._active=!0,this.manualAdvance||(this._timer=setInterval((function(){var e=t._time+t._increment;e>t.to?t.restart():t.goToTime(e)}),1e3*this._delay)))}},{key:"_clearTimers",value:function(){this._timer&&window.clearInterval(this._timer),this._restartTimer&&window.clearTimeout(this._restartTimer),this._timer=void 0,this._restartTimer=void 0}},{key:"_onTimingChange",value:function(){this._updateTiming(),this._updateTimes(),this._handleTimingChange(),this.currentTime<this.from?this.goToTime(this.from):this.currentTime>this.to&&this.goToTime(this.to)}},{key:"_updateTiming",value:function(){this.to<this.from||(this._increment=(this.to-this.from)/this.duration*this._delay)}},{key:"_updateTimes",value:function(){this._manualTimes||(this._times=this._timesForIntervals())}},{key:"_handleTimingChange",value:function(){}},{key:"_updateForTime",value:function(t){}},{key:"_intervalClosestToTime",value:function(t){var e=this.from,n=Math.abs(t-e);return void 0===this._times&&this._updateTimes(),this._times.forEach((function(r){var i=Math.abs(t-r);i<n&&(n=i,e=r)})),Math.round(e)}},{key:"_timesForIntervals",value:function(){var t=this;if(this.from===this.to)
return[];for(var e=[],n=function(n){t.canShow(n)&&-1===e.indexOf(n)&&e.push(n)},r=this.opts.intervals,i=Math.round((this.to-this.from)/(r-1)),a=this.isFuture()&&this.startDate().getTime()===this.now.getTime()?6e4:0,o=null,s=0;s<r-1;s+=1){var c=0===s?a:0,u=this.from+i*s+c;0!==s&&u===o||(n(Math.round(u)),o=u)}
return e.length>0&&n(this.to),this.totalIntervals=e.length,e}}]),n}
(d.a);e.a=m},dJbZ:function(t,e,n){"use strict";n("2B1R");var r=n("lwsE"),i=n.n(r),a=n("W8MJ"),o=n.n(a),s=n("5ID0"),c=n("0lfv"),u=function(){function t(e){i()(this,t),(e=e||{}).features=e.features||e,Object(c.isEmpty)(e.features)||(this._features=e.features.map((function(t){return new s.a(t)})))}
return o()(t,[{key:"features",get:function(){return this._features}}]),t}
();e.a=u},dqFL:function(t,e,n){"use strict";n("QWBl"),n("yXV3"),n("pDQq"),n("tkto"),n("07d7"),n("SuFq"),n("JfAA"),n("FZtP");var r=n("lwsE"),i=n.n(r),a=n("iWIM"),o=n.n(a),s=n("W8MJ"),c=n.n(s),u=n("7W2i"),l=n.n(u),h=n("a1gu"),f=n.n(h),d=n("Nsbk"),p=n.n(d),v=n("dB9R"),y=n("hWIy"),m=n("ry37"),g=n("0lfv");function k(t){var e=function(){if("undefined"==typeof Reflect||!Reflect.construct)
return!1;if(Reflect.construct.sham)
return!1;if("function"==typeof Proxy)
return!0;try{return Date.prototype.toString.call(Reflect.construct(Date,[],(function(){}))),!0}catch(t){return!1}}
();return function(){var n,r=p()(t);if(e){var i=p()(this).constructor;n=Reflect.construct(r,arguments,i)}else
n=r.apply(this,arguments);return f()(this,n)}}
var b=function(t){l()(n,t);var e=k(n);function n(){var t,r=arguments.length>0&&void 0!==arguments[0]?arguments[0]:null;return i()(this,n),(t=e.call(this,r))._loading=!1,t._animations={},t}
return c()(n,[{key:"animations",get:function(){return this._animations||{}},set:function(t){var e=this;this.stop(),this._animations=t,this._each((function(t){t.timeline=e}))}}]),c()(n,[{key:"get",value:function(t){return this._animations[t]}},{key:"opt",value:function(t,e){if(e){return Object(g.set)(this.opts,t,e),-1!==["intervals"].indexOf(t)&&this._each((function(n){n.opt(t,e)})),this}
return Object(g.get)(this.opts,t)}},{key:"add",value:function(t,e){this.stop(),e.timeline=this,e.manualAdvance=this.manualAdvance,this._animations[t]=e}},{key:"remove",value:function(t){var e=this;Object.keys(this._animations).forEach((function(n){e._animations[n]===t&&e.removeBy(n)}))}},{key:"removeBy",value:function(t){var e=this._animations[t];e&&(this.stop(),e.timeline=void 0),delete this._animations[t]}},{key:"play",value:function(){var t=this,e=!0,r=[],i=[];this.canAnimate()&&(this._each((function(n){var a=t.opt("showLoading"),o=!1===t.containsPast();if(n instanceof y.a){var s=n;s.showWhenLoading=a,n.isFuture()&&(s.showWhenLoading=o||s.alwaysShow())}else if(n instanceof m.a){var c=n;c.showWhenLoading=a,n.isFuture()&&(c.showWhenLoading=o||c.alwaysShow())}
n.isEnabled()&&(n.isReady()?(n.isLoading()||n.needsData())&&(i.push(n),n.once("load:done",(function(){i.splice(i.indexOf(n),1),0===i.length&&(t._loading=!1,t.trigger("load:done"))}))):(e=!1,r.push(n),i.push(n),n.once("ready",(function(){r.splice(r.indexOf(n),1),i.splice(i.indexOf(n),1),0===r.length&&setTimeout((function(){t.trigger("ready"),t.play()}),100)}))),n.play())})),!1===this._loading&&i.length>0?(this._loading=!0,this.trigger("load:start")):this._loading&&0===i.length&&(this._loading=!1,this.trigger("load:done")),e&&(this._each((function(t){t.play()})),o()(p()(n.prototype),"play",this).call(this)))}},{key:"stop",value:function(){this._each((function(t){t.stop()})),o()(p()(n.prototype),"stop",this).call(this),this._loading&&this.trigger("load:done"),this._loading=!1}},{key:"pause",value:function(){this._each((function(t){t.pause()})),o()(p()(n.prototype),"pause",this).call(this)}},{key:"restart",value:function(){this._each((function(t){t.restart()})),o()(p()(n.prototype),"restart",this).call(this)}},{key:"reset",value:function(){var t=arguments.length>0&&void 0!==arguments[0]&&arguments[0];this.stop(),this._loading=!1,this._each((function(e){e.reset(t)})),o()(p()(n.prototype),"reset",this).call(this,t)}},{key:"isLoading",value:function(){return this._loading}},{key:"goToTime",value:function(t){return this._each((function(e){e.goToTime(t)})),o()(p()(n.prototype),"goToTime",this).call(this,t)}},{key:"setStartDate",value:function(t){return this._each((function(e){e.setStartDate(t)})),o()(p()(n.prototype),"setStartDate",this).call(this,t)}},{key:"setStartOffset",value:function(t){return this._each((function(e){e.setStartOffset(t)})),o()(p()(n.prototype),"setStartOffset",this).call(this,t)}},{key:"setEndDate",value:function(t){return this._each((function(e){e.setEndDate(t)})),o()(p()(n.prototype),"setEndDate",this).call(this,t)}},{key:"setEndOffset",value:function(t){return this._each((function(e){e.setEndOffset(t)})),o()(p()(n.prototype),"setEndOffset",this).call(this,t)}},{key:"refresh",value:function(){var t=this;o()(p()(n.prototype),"refresh",this).call(this),this._each((function(e){e.now=t.now}))}},{key:"_each",value:function(t){var e=this;Object.keys(this.animations).forEach((function(n){var r=e._animations[n];t(r)}))}},{key:"_onTimingChange",value:function(){var t=this;o()(p()(n.prototype),"_onTimingChange",this).call(this),this._each((function(e){e.from=t.from,e.to=t.to}))}}]),n}
(v.a);e.a=b},fbCW:function(t,e,n){"use strict";var r=n("I+eb"),i=n("tycR").find,a=n("RNIs"),o=n("rkAj"),s="find",c=!0,u=o(s);s in[]&&Array(1).find((function(){c=!1})),r({target:"Array",proto:!0,forced:c||!u},{find:function(t){return i(this,t,arguments.length>1?arguments[1]:void 0)}}),a(s)},fnc3:function(t,e,n){"use strict";n("ma9I"),n("rB9j"),n("UxlC");var r=n("lwsE"),i=n.n(r),a=n("W8MJ"),o=n.n(a),s=n("0lfv"),c=n("3j3Q"),u=n("J8dV"),l=function(){function t(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:null;i()(this,t),this._opts=Object(s.extend)({strokeWidth:4},e),this.render()}
return o()(t,[{key:"$el",get:function(){return this._target}},{key:"$path",get:function(){return Object(c.a)(".".concat(u.a.cssPrefix,"fill-path"),this.$el)}}]),o()(t,[{key:"appendTo",value:function(t){var e=arguments.length>1&&void 0!==arguments[1]?arguments[1]:null,n=Object(c.a)(t);n.length>0&&(n.append(this.$el),this._target=Object(c.a)(".".concat(u.a.cssPrefix,"loader"),n),e&&this._target.css(e))}},{key:"startAnimating",value:function(){this.$el.addClass("animated")}},{key:"stopAnimating",value:function(){this.$el.removeClass("animated")}},{key:"render",value:function(){var t=!1,e=Object(s.get)(this._opts,"size")||"100%";Object(s.isString)(e)&&(!1===/%$/.test(e)?(e=e.replace(/[0-9\.]/,""),e=parseFloat(e)):t=!0);var n=Object(s.isString)(e)?60:e,r=Math.round(n/2),i=Math.round(n/60*18),a=Math.round(n/2),o=Object(s.get)(this._opts,"strokeWidth")||4,l=t?e:"".concat(e,"px");this._target=Object(c.a)('\n\t\t\t<div class="'.concat(u.a.cssPrefix,'loader" style="width: ').concat(l,"; height: ").concat(l,';">\n\t\t\t\t<svg version="1.1" class="').concat(u.a.cssPrefix,'filler-loader" width="').concat(n,'" height="').concat(n,'" style="margin-top: -').concat(a,"px; margin-left: -").concat(a,'px;">\n\t\t\t\t\t<circle class="').concat(u.a.cssPrefix,'fill-path" cx="').concat(r,'" cy="').concat(r,'" r="').concat(i,'" stroke-width="').concat(o,'" />\n\t\t\t\t</svg>\n\t\t\t</div>\n\t\t'))}}]),t}
();e.a=l},gdVl:function(t,e,n){"use strict";var r=n("ewvW"),i=n("I8vh"),a=n("UMSQ");t.exports=function(t){for(var e=r(this),n=a(e.length),o=arguments.length,s=i(o>1?arguments[1]:void 0,n),c=o>2?arguments[2]:void 0,u=void 0===c?n:i(c,n);u>s;)
e[s++]=t;return e}},gqGf:function(t,e,n){"use strict";n.d(e,"b",(function(){return U})),n.d(e,"d",(function(){return B})),n.d(e,"a",(function(){return Q})),n.d(e,"c",(function(){return X.a}));n("07d7"),n("SuFq"),n("rB9j"),n("JfAA"),n("UxlC");var r=n("lwsE"),i=n.n(r),a=n("W8MJ"),o=n.n(a),s=n("PJYZ"),c=n.n(s),u=n("7W2i"),l=n.n(u),h=n("a1gu"),f=n.n(h),d=n("Nsbk"),p=n.n(d),v=(n("ma9I"),n("yyme"),n("TeQF"),n("QWBl"),n("2B1R"),n("E9XD"),n("zKZe"),n("tkto"),n("5s+n"),n("FZtP"),n("RIqP")),y=n.n(v),m=n("m0x2"),g=n("l1hk"),k=n("8TS8"),b=n("5ID0"),_=n("7r+a"),O=n("0lfv"),w=function(t,e,n,r,i){var a=i.marker(t,{lat:n.lat,lon:n.lon},r);if(!a)
return null;var o=Object.assign(Object.assign({},e),{awxjs_source:t}),s=new k.a(o,r,a);return s.geometry=new _.e([n.lon,n.lat]),s},j=function(t,e,n,r,i){var a=Object(O.isFunction)(r)?r(e):r,o=i.polyline(e.id,n,a),s=Object.assign(Object.assign({},e),{awxjs_source:t});return new k.c(s,a,o)},x=function(t,e,n,r,i){var a=function(t){return t.map((function(t,n){return{id:"".concat(e.id,"-").concat(n),outer:t.outer.coordinates,inner:t.inner.map((function(t){return t.coordinates}))}}))},o=[];n instanceof _.d?o=a(n.polygons):n instanceof _.f&&(o=a([n]));var s=Object(O.isFunction)(r)?r(e):r,c=i.polygon(t,o,s),u=Object.assign(Object.assign({},e),{awxjs_source:t}),l=new k.b(u,s,c);return l.geometry=n,l},T=n("DA0x"),S=n("qV3b"),M=n("pAjv"),L=function(t){var e,n=t.service,r=t.url,i=t.dataKeypath,a=t.restrictToTimeline,o=void 0===a||a,s=t.onLoad,c=void 0===s?function(){}:s,u=t.onError,l=void 0===u?function(){}:u;return n?e=function(t,e,r,a,s){var u=Object(O.isFunction)(n)?n():n;if(Object(O.isset)(u)&&u instanceof T.a!=!1){var h=(null==a?void 0:a.limit)||u.param("limit")||300,f=(null==a?void 0:a.sort)||u.param("sort")||"dt:-1";if(a&&u.setParams(a),u.getAction()||u.action("within"),"within"===u.getAction()){if(!t)
return;u.place(Object(M.toBounds)(t))}
o&&u.from(e).to(r).limit(h).sort(f),u.get().then((function(t){c(Object(O.get)(t.data,i)||t.data,s)})).catch((function(t){return l(t,s)}))}else
console.error("[Aeris] Invalid ApiRequest returned for data source")}:r&&(e=function(t,e,n,a,o){var s=Object(O.isFunction)(r)?r(a):r;S.b.request(s).then((function(t){c(Object(O.get)(t.data,i)||t.data,o)})).catch((function(t){return l(t,o)}))}),e},I=(n("qePV"),n("kSko"),n("cDf5")),R=n.n(I),E=(n("yXV3"),n("pDQq"),n("iWIM")),P=n.n(E);function D(t){var e=function(){if("undefined"==typeof Reflect||!Reflect.construct)
return!1;if(Reflect.construct.sham)
return!1;if("function"==typeof Proxy)
return!0;try{return Date.prototype.toString.call(Reflect.construct(Date,[],(function(){}))),!0}catch(t){return!1}}
();return function(){var n,r=p()(t);if(e){var i=p()(this).constructor;n=Reflect.construct(r,arguments,i)}else
n=r.apply(this,arguments);return f()(this,n)}}
var z=function(t){l()(n,t);var e=D(n);function n(){var t,r=arguments.length>0&&void 0!==arguments[0]?arguments[0]:null;return i()(this,n),r=Object(O.extend)({},{refresh:0},r),(t=e.call(this,r)).itemsByTime={},t.lastInterval=0,t.dataBeyondBounds={before:[],after:[]},t.on("stop",(function(){t.trigger("data:add",{items:t.dataBeyondBounds.after.filter((function(t){return void 0!==t}))})})),t}
return o()(n,[{key:"dataByTime",value:function(){return this.itemsByTime}},{key:"setData",value:function(t){this.data=t,this._prepareDataItems(t)}},{key:"play",value:function(){var t=this;this.canAnimate()||!this.provider?P()(p()(n.prototype),"play",this).call(this):this.provider.animationData(this).then((function(e){t.setData(e),t.lastInterval=t.to}))}},{key:"_updateForTime",value:function(t){if(this.dataByTime()){this.lastInterval||(this.lastInterval=this.from);var e=this.currentTime;if(e!==this.lastInterval){var n,r=Math.min(this.lastInterval,e),i=Math.max(this.lastInterval,e),a=e<this.lastInterval;if(e===this.from?(a=!0,n=this._elementsInIntervalRange(this.from,this.to)):n=this._elementsInIntervalRange(r,a?this.to:i),n.length>0)
if(a)
[].concat(this.itemsByTime[this.from]).forEach((function(t){var e=n.indexOf(t);-1!==e&&n.splice(e,1)})),n=n.concat(this.dataBeyondBounds.after),this.trigger("data:remove",{items:n.filter((function(t){return void 0!==t}))});else
this.trigger("data:add",{items:n.filter((function(t){return void 0!==t}))});this.lastInterval=e}}}},{key:"restart",value:function(){this.lastInterval=this.to,P()(p()(n.prototype),"restart",this).call(this)}},{key:"reset",value:function(){this.data=null,this.itemsByTime={},P()(p()(n.prototype),"reset",this).call(this)}},{key:"isVisible",value:function(){return!0}},{key:"isReady",value:function(){return Object(O.isset)(this.data)}},{key:"needsData",value:function(){return!1===Object(O.isset)(this.data)}},{key:"canAnimate",value:function(){return P()(p()(n.prototype),"canAnimate",this).call(this)&&this.dataByTime()&&Object.keys(this.dataByTime()).length>0}},{key:"_handleTimingChange",value:function(){this.data&&this._prepareDataItems(this.data)}},{key:"_prepareDataItems",value:function(t){var e=this;if(!(this.increment<=0)&&Object(O.isArray)(t)){var n=this._prepareIntervals(),r=t,i="timestamp";this.dataBeyondBounds={before:[],after:[]},(r||[]).forEach((function(t){if(Object(O.has)(t,i)){var r=Object(O.get)(t,i);if(r<e.from)
e.dataBeyondBounds.before.push(t);else if(r>e.to)
e.dataBeyondBounds.after.push(t);else{var a=e.dataIntervalClosestToTime(r);r<e.to&&n[a]&&n[a].push(t)}}})),this.trigger("load:done"),this.trigger("ready")}}},{key:"_prepareIntervals",value:function(){for(var t=this.from,e=this.to,n={};t<e;)
n[Math.round(t)]=[],t+=this.increment;return this.itemsByTime=n,this.dataByTime()}},{key:"dataIntervalClosestToTime",value:function(t){var e=Object.keys(this.dataByTime()).sort().reverse().map((function(t){return parseInt(t,10)})),n=0;return t<this.from||t>this.to?n=t:e.forEach((function(e){t>=e&&0===n&&(n=e)})),n}},{key:"_elementsInIntervalRange",value:function(t,e){var n=this;if(t===e)
return[];var r=[],i=Object.keys(this.dataByTime()).sort().map((function(t){return parseInt(t,10)})),a=[];return i.forEach((function(i){var o=!1;e<t?i>=e&&i<t&&(o=!0):(i===t&&i===e||i>=t&&i<e||i===e)&&(o=!0),o&&-1===a.indexOf(i)&&(a.push(i),r=(r||[]).concat(n.dataByTime()[i]))})),r}}]),n}
(n("dB9R").a),A=function(){function t(e,n){var r=this;i()(this,t),this._animatableData=[],this._nonAnimatableData=[],this.source=e;var a=function(t){return{markers:t.filter((function(t){return t.renderable?e.strategy.isMarker(t.renderable):e.strategy.isMarker(t)})),shapes:t.filter((function(t){return t.renderable?e.strategy.isPolygon(t.renderable)||e.strategy.isPolyline(t.renderable):e.strategy.isPolygon(t)||e.strategy.isPolyline(t)}))}},o=new z;o.provider=this,o.on("play",(function(){var t=a(r._nonAnimatableData),n=t.markers,i=t.shapes;n.length>0&&e.trigger("markers:remove",{markers:n,animation:o}),i.length>0&&e.trigger("shapes:remove",{shapes:i,animation:o})})),o.on("stop",(function(){var t=a(r._nonAnimatableData),n=t.markers,i=t.shapes;n.length>0&&e.trigger("markers:add",{markers:n,animation:o}),i.length>0&&e.trigger("shapes:add",{shapes:i,animation:o})})),o.on("reset",(function(){e.enabled&&(e.markers&&e.trigger("markers:add",{markers:e.markers,animation:o}),e.shapes&&e.trigger("shapes:add",{shapes:e.shapes,animation:o})),r._animatableData=[],r._nonAnimatableData=[]})),o.on("data:add",(function(t){var n=a(t.data.items),r=n.markers,i=n.shapes;r.length>0&&e.trigger("markers:add",{markers:r,animation:o}),i.length>0&&e.trigger("shapes:add",{shapes:i,animation:o})})),o.on("data:remove",(function(t){var n=a(t.data.items),r=n.markers,i=n.shapes;r.length>0&&e.trigger("markers:remove",{markers:r,animation:o}),i.length>0&&e.trigger("shapes:remove",{shapes:i,animation:o})})),this.animation=o}
return o()(t,[{key:"animationData",value:function(t){var e=this,n=this.source,r=function(){var t=Object.keys(n.markersById).map((function(t){return n.markersById[t]})),r=n.shapes,i=[];if(t){var a=t.map((function(t){var r,i,a,o=t.data,s=t.renderable,c=t.style;if(!o||!s)
return null;var u=(null===(i=null===(r=n.opts.data)||void 0===r?void 0:r.properties)||void 0===i?void 0:i.timestamp)||"timestamp";return Object(O.has)(o,u)?a=1e3*Object(O.get)(o,u):e._nonAnimatableData.push(s),{timestamp:a,renderable:s,style:c,data:o}})).filter((function(t){return t&&!1===Number.isNaN(t.timestamp)}));a&&(i=i.concat(a))}
if(r){var o=function(t){return t.map((function(t){var r,i,a=t.data,o=t.renderable,s=t.style;if(!a)
return null;var c,u,l=(null===(i=null===(r=n.opts.data)||void 0===r?void 0:r.properties)||void 0===i?void 0:i.timestamp)||"timestamp";return"object"===R()(l)&&l.from?u=l.from:"string"==typeof l&&(u=l),Object(O.has)(a,u)?c=1e3*Object(O.get)(a,u):e._nonAnimatableData.push(o),{timestamp:c,renderable:o,style:s,data:a}})).filter((function(t){return t&&!1===Number.isNaN(t.timestamp)}))};r.forEach((function(t){var e=t.polygons;if(Object(O.isset)(e)){var n=o(e);n&&(i=i.concat(n))}else{var r=o([t]);r&&(i=i.concat(r))}}))}
return e._animatableData=i,i};return new Promise((function(t,i){if(n.isLoading)
n.once("data:load",(function(){var e=r();t(e)}));else if(e._animatableData&&e._animatableData.length>0)
t(e._animatableData);else if(n.markers){var a=r();t(a)}else
t(null)}))}}]),t}
();function F(t){var e=function(){if("undefined"==typeof Reflect||!Reflect.construct)
return!1;if(Reflect.construct.sham)
return!1;if("function"==typeof Proxy)
return!0;try{return Date.prototype.toString.call(Reflect.construct(Date,[],(function(){}))),!0}catch(t){return!1}}
();return function(){var n,r=p()(t);if(e){var i=p()(this).constructor;n=Reflect.construct(r,arguments,i)}else
n=r.apply(this,arguments);return f()(this,n)}}
var C={marker:{svg:{shape:{type:"circle",fill:{color:"#000"}}},size:[6,6]},polygon:{fill:{color:"#000",opacity:1},stroke:{color:"#000",width:2}},polyline:{stroke:{color:"#000",width:2}}},B=function(t){l()(n,t);var e=F(n);function n(t,r){var a,o;if(i()(this,n),(a=e.call(this)).requiresBounds=!1,a._animateOnLoad=!1,a.key=t,a.enabled=!0,a.opts=Object(O.extend)({data:null,style:r.style||Object.assign({},C),requiresBounds:!1,restrictToTimeline:!0,animation:{key:t,enabled:!1},refresh:0},r),a._opacityByType={marker:1,polyline:1,polygon:1},a.style=a.opts.style,a.style){var s=null===(o=a.style)||void 0===o?void 0:o.opacity;Object(O.isset)(s)&&(a._opacity=s),["polyline","polygon"].forEach((function(t){var e,n,r=function(t){var e=arguments.length>1&&void 0!==arguments[1]?arguments[1]:{};return(Object(O.isFunction)(t)?t(e):t)||{}}
(a.style[t]),i=(null===(e=r.fill)||void 0===e?void 0:e.opacity)||(null===(n=r.stroke)||void 0===n?void 0:n.opacity);Object(O.isset)(i)&&(a._opacityByType[t]=i)}))}
var u=a.opts.animation;u.enabled&&(a._animator=new A(c()(a),u));var l=Object(O.get)(a.opts,"data.service");return Object(O.isFunction)(l)&&(l=l()),a._service=l,a.requiresBounds=Object(O.get)(a.opts,"requiresBounds"),a}
return o()(n,[{key:"markers",get:function(){var t;return null===(t=this._result)||void 0===t?void 0:t.markers}},{key:"markersById",get:function(){return this._markers}},{key:"polygons",get:function(){var t;return null===(t=this._result)||void 0===t?void 0:t.polygons}},{key:"polylines",get:function(){var t;return null===(t=this._result)||void 0===t?void 0:t.polylines}},{key:"shapes",get:function(){var t,e,n=[];return(null===(t=this.polygons)||void 0===t?void 0:t.length)&&(this.polygons[0].elements?this.polygons.forEach((function(t){n=n.concat(t.elements)})):n=n.concat(this.polygons)),(null===(e=this.polylines)||void 0===e?void 0:e.length)&&(this.polylines[0].elements?this.polylines.forEach((function(t){n=n.concat(t.elements)})):n=n.concat(this.polylines)),n}},{key:"strategy",get:function(){return this._strategy},set:function(t){var e=this;t&&(this._strategy=t,t.on("move:end",(function(n){e._visibleBounds=g.a.fromBounds(t.getBounds())})))}},{key:"service",get:function(){return this._service}},{key:"animation",get:function(){var t;return null===(t=this._animator)||void 0===t?void 0:t.animation}},{key:"enabled",get:function(){return this._enabled},set:function(t){this._enabled=t,!1===t?this._stopAutoUpdate():this._startAutoUpdateIfNeeded()}},{key:"isLoading",get:function(){return this._loading}},{key:"animationEnabled",get:function(){return Object(O.isset)(this.animation)&&this.animation.isEnabled()}}]),o()(n,[{key:"hasData",value:function(){return!Object(O.isEmpty)(this.markers)||!Object(O.isEmpty)(this.polygons)||!Object(O.isEmpty)(this.polylines)}},{key:"setData",value:function(t){this._data=Object(O.isPlainObject)(t)?Object(O.cloneDeep)(t):t,this.render()}},{key:"setOpacity",value:function(){var t=this,e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:1;this._opacity=e,this.shapes.filter((function(t){return t.adjustOpacity})).forEach((function(n){n instanceof k.c?n.renderable.setOpacity(t._opacityByType.polyline*e):n instanceof k.b&&n.renderable.setOpacity(t._opacityByType.polygon*e)}))}},{key:"load",value:function(t){var e,n=this,r=arguments.length>1&&void 0!==arguments[1]&&arguments[1],i=arguments.length>2?arguments[2]:void 0,a=null===(e=this.opts)||void 0===e?void 0:e.data;if(!a)
return new Promise((function(t,e){e(new Error("Invalid configuration for VectorSource"))}));t=Object(O.extend)({},Object(O.get)(this.opts,"data.request.parameters"),this._lastLoadParams,t),Object(O.isset)(t.save)&&!1===t.save||(this._lastLoadParams=t),this._animateOnLoad=r;var o=a.service,s=a.url,c=a.items,u=t,l=u.bounds,h=u.from,f=u.to;if(this.requiresBounds&&!Object(O.isset)(l))
throw new Error("[Aeris] Vector source ".concat(this.key," requires coordinate bounds when loading but bounds were not provided."));if(l&&(this._visibleBounds=g.a.fromBounds(l)),c)
return new Promise((function(t,e){n._onLoad(c,(function(n,r){n?t(n):e(r)}))}));var d=L({service:o,url:s,dataKeypath:Object(O.get)(this.opts,"data.properties.root"),restrictToTimeline:this.opts.restrictToTimeline,onLoad:function(t,e){n._onLoad(t,e,i)},onError:function(t,e){n._onError(t,e)}});if(o&&(this._service=Object(O.isFunction)(o)?o():o),!Object(O.isset)(d))
throw new Error("[Aeris] Cannot load data for VectorSource with key {".concat(this.key,'} due to an invalid configuration. Check that you have provided a valid "data.service" or "data.url" in your configuration. Refer to the docs for more info: https://www.aerisweather.com/support/docs/toolkits/aeris-js-sdk/map-modules/data-sources/'));return this._request||(this._request=Object(O.debounce)((function(t,e,r,i,a){n._loading=!0,d(t,e,r,i,a)}),1500)),new Promise((function(e,r){if(n._request){var i=Object(O.get)(n.opts,"data.request.parameters.from")||h,a=Object(O.get)(n.opts,"data.request.parameters.to")||f;n._loading=!0,n.trigger("data:load:start",{layer:n.key}),n._request(l,i,a,t,(function(t,i){n.trigger("data:load:done",{layer:n.key}),i?r(i):e(t),n._startAutoUpdateIfNeeded()}))}else
r(new Error("Invalid configuration for VectorSource"))}))}},{key:"reload",value:function(t,e){this.load(t,!1,e)}},{key:"render",value:function(){if(Object(O.isset)(this._data)){var t=this.markers,e=this.shapes;Object(O.isEmpty)(t)||this.trigger("markers:remove",{markers:t}),Object(O.isEmpty)(e)||this.trigger("shapes:remove",{shapes:e}),this._result=this._process(this._data),this.setOpacity(this._opacity),t=this.markers,e=this.shapes,Object(O.isEmpty)(t)||this.trigger("markers:add",{markers:t}),Object(O.isEmpty)(e)||this.trigger("shapes:add",{shapes:e})}}},{key:"reset",value:function(){var t=this.markers,e=this.shapes;Object(O.isEmpty)(t)||this.trigger("markers:remove",{markers:t}),Object(O.isEmpty)(e)||this.trigger("shapes:remove",{shapes:e}),this.animation&&this.animation.reset(),this._loading=!1,this._result={},this.trigger("data:load:done",{layer:this.key}),this.trigger("reset")}},{key:"update",value:function(t){t&&(this.opts.data=Object(O.extend)(this.opts.data,t),this._request=null),this.reload()}},{key:"_onLoad",value:function(t,e,n){!1!==this.enabled&&(t&&(n&&(Object(O.isArray)(t)?t=[].concat(y()(n),y()(t)):Object(O.isPlainObject)(t)&&(t=Object.assign(Object.assign({},n),t))),this.setData(t)),this._loading=!1,this.trigger("data:load",{layer:this.key,results:t}),Object(O.isFunction)(e)&&e(this._result,null),this._animateOnLoad&&this.animation&&(this.animation.reset(),this.animation.play()),this._animateOnLoad=!1)}},{key:"_onError",value:function(t,e){console.error("[Aeris] Vector source request failed",t),t.stack&&t.stack,this._loading=!1,this.trigger("data:error",{error:t}),e&&e(null,t)}},{key:"_visibleMapObjects",value:function(){var t=this,e=this.markers,n=this.shapes;return{markers:e=e.filter((function(e){var n=e.coord;return!n||t._visibleBounds.contains(n)})),shapes:n=n.filter((function(e){var n=e.bounds;return!n||t._visibleBounds.contains(n)}))}}},{key:"_mapObjects",value:function(){var t=[];if(this.polygons&&(t=t.concat(this.polygons)),this.polylines&&(t=t.concat(this.polylines)),0===t.length)
return null;var e=Object.keys(t).reduce((function(e,n){return e.concat(t.map((function(t){return t.polygons?t.polygons.map((function(t){return t.polygon})):t.polylines?t.polylines.map((function(t){return t.polyline})):t.polygon?t.polygon:t.polyline?t.polyline:t})))}),[]);return Object(O.flatten)(e)}},{key:"_process",value:function(t,e){var n=this;if(!this.strategy)
throw new Error("No map strategy defined for VectorSource but one is required.");t=t||{};var r=Object(O.get)(this.opts,"data.formatter");r&&(t=r(t));var i={},a={},o={};if(Object(O.isPlainObject)(t)&&"FeatureCollection"===t.type)
return console.warn("[Aeris] Data for layer {".concat(this.key,'} is in GeoJSON format. Use GeoJsonSource (or "geojson" type) for this layer instead.')),null;if(Object(O.isArray)(t)){var s=this.style,c=s.marker,u=s.polygon,l=s.polyline,h=[],f=Object(O.get)(this.opts,"data.properties")||{},d=Object(O.get)(this.opts,"data.geometry");t.forEach((function(t,r){var s,p,v,y="awxjs-shape-".concat(n.key,"-").concat(r);if(f&&(f.id&&(y=Object(O.get)(t,f.id)),f.category&&!1===/^\[path\]/.test(f.category)&&(s=Object(O.get)(t,f.category)),f.path&&(p=Object(O.get)(t,f.path)),c))
if(f.points){var m=f.points;!e&&Object(O.isArray)(m)?(v=[],m.forEach((function(e){var n=Object(O.get)(t,e);n&&Object(O.isArray)(n)&&(v=v.concat(n))}))):v=Object(O.get)(t,m)}else
v=[t];if(v&&c){var g=Object(O.get)(n.opts,"data.coordinate");v.forEach((function(t){var e=n._processRecord(t),r=e.loc||(g&&Object(O.isFunction)(g)?g(e):{});if(r){var a={lat:r.lat,lon:r.long||r.lon},o=Object(O.isFunction)(c)?c(e):c;e.id=e.id||"".concat(n.key,"-").concat(y,"-").concat(a.lat,"_").concat(a.lon);var s=!0;if(o&&o.spacing>0){var u=n.strategy.coordToPoint(a);h.forEach((function(t){var e=n.strategy.coordToPoint(t);Math.sqrt(Math.pow(u.x-e.x,2)+Math.pow(u.y-e.y,2))<o.spacing&&(s=!1)}))}
if(s){var l=new b.a({type:"Point",coordinates:[a.lon,a.lat]});l.properties=e;var f=l.geometry;if(f instanceof _.e&&Object(O.isValidCoord)(f.coordinates)){var d=w(n.key,l.properties,f.coordinates,o,n.strategy.factory);d&&(i[e.id]=d,h.push(a))}}}}))}
if(p&&(u||l)){var k=Object(O.get)(n.opts,"data.reversedCoord")||!1,T=p;Object(O.isArray)(T)?T.length>0&&Object(O.isArray)(T[0])&&2===T[0].length&&Object(O.isNumber)(T[0][0])&&(T=[T]):T=[T],d&&Object(O.isFunction)(d)&&(T=T.map((function(t){return{type:"Feature",properties:t,geometry:d(t)}}))),T.map((function(e){Object(O.isArray)(e)&&2===e[0].length&&(e={type:"Polygon",coordinates:[k?p.map((function(t){return[t[1],t[0]]})):e]});var n=new b.a(e);return n.properties=Object(O.extend)({},t,n.properties),n})).forEach((function(t){var e=t.geometry,r=f.category,i=s;if(!i&&r&&(r=r.replace(/^\[path\]\./,""),i=Object(O.get)(t.properties,r)),e instanceof _.f?e=new _.d([e.toArray(!0)]):e instanceof _.a&&(e=new _.b([e.toArray(!0)])),e instanceof _.d){var c="".concat(t.properties.id||y),h=Object.assign(Object.assign({},t.properties),{id:c}),d=x(n.key,h,e,u,n.strategy.factory);if(i){var p=a[i];if(!p){var v=Object(O.set)({},r,i);p={data:Object.assign(Object.assign(Object.assign({},v),h),{awxjs_source:n.key}),elements:[]},a[i]=p}
p.elements.push(d)}else
y&&(a[y]=d)}else
e instanceof _.b&&e.lines.forEach((function(e,s){var c=Object.assign(Object.assign({},t.properties),{id:"".concat(t.properties.id||y,"-").concat(s)}),u=j(n.key,c,e.coordinates,l,n.strategy.factory);if(i){var h=a[i];if(!h){var f=Object(O.set)({},r,i);h={data:Object.assign(Object.assign({},f),{awxjs_source:n.key}),elements:[]},o[i]=h}
h.elements.push(u)}else
y&&(o[y]=u)}))}))}
v&&l&&function(t,e,n){var r,i,a=[],o=[];return t.forEach((function(t,s){var c=t.loc||(n&&Object(O.isFunction)(n)?n(t):{}),u=Object(O.isEmpty)(c)&&t.lat&&t.lon?t:{lat:c.lat,lon:c.long||c.lon};e&&t[e];Object(O.isset)(i)&&u.lat===i.lat&&u.lon===i.lon||(o.push(u),0===s?r={north:u.lat,south:u.lat,west:u.lon,east:u.lon}:(r.north=Math.max(r.north,u.lat),r.south=Math.min(r.south,u.lat),r.west=Math.min(r.west,u.lon),r.east=Math.max(r.east,u.lon)),a.push({coords:o,data:t,bounds:r}),(o=[]).push(u),r={north:u.lat,south:u.lat,west:u.lon,east:u.lon}),i=u})),a}
(v,Object(O.get)(n.opts,"data.properties.category"),Object(O.get)(n.opts,"data.coordinate")).forEach((function(t){var e=j(n.key,t.data,t.coords,l,n.strategy.factory);o[e.id]=e}))}))}
return this._markers=i,this._polygons=a,this._polylines=o,{markers:Object.keys(i).map((function(t){return i[t]})),polygons:Object.keys(a).map((function(t){return a[t]})),polylines:Object.keys(o).map((function(t){return o[t]}))}}},{key:"_processRecord",value:function(t){return t}},{key:"_startAutoUpdateIfNeeded",value:function(){var t=this;this._stopAutoUpdate();var e=Object(O.get)(this.opts,"refresh");this.enabled&&e>0&&(this._refreshTimer=setTimeout((function(){t.reload()}),1e3*e))}},{key:"_stopAutoUpdate",value:function(){this._refreshTimer&&(clearTimeout(this._refreshTimer),this._refreshTimer=null)}}]),n}
(m.a),V=n("o0o1"),q=n.n(V);n("ls82");function W(t){var e=function(){if("undefined"==typeof Reflect||!Reflect.construct)
return!1;if(Reflect.construct.sham)
return!1;if("function"==typeof Proxy)
return!0;try{return Date.prototype.toString.call(Reflect.construct(Date,[],(function(){}))),!0}catch(t){return!1}}
();return function(){var n,r=p()(t);if(e){var i=p()(this).constructor;n=Reflect.construct(r,arguments,i)}else
n=r.apply(this,arguments);return f()(this,n)}}
var N=function(t){l()(n,t);var e=W(n);function n(){var t=arguments.length>0&&void 0!==arguments[0]?arguments[0]:null;return i()(this,n),t=Object(O.extend)({},{refresh:0},t),e.call(this,t)}
return o()(n,[{key:"_updateForTime",value:function(t){var e=this;if(this.dataByTime()){this.lastInterval||(this.lastInterval=this.from);var n,r=this.currentTime,i=Math.min(this.lastInterval,r),a=Math.max(this.lastInterval,r);if(r<this.lastInterval){var o=[],s=[];Object.keys(this.dataByTime()).sort().map((function(t){return parseInt(t,10)})).forEach((function(t){e.dataByTime()[t].forEach((function(t){-1===o.indexOf(t.id)&&(s.push(t),o.push(t.id))}))})),n=s}else
n=this._elementsInIntervalRange(i,a);n.length>0&&this.trigger("data:update",{items:n}),this.lastInterval=r}}},{key:"_prepareDataItems",value:function(t){var e=this;if(!(this.increment<=0)&&Object(O.isPlainObject)(t)){var n=this._prepareIntervals(),r=t;Object.keys(r).forEach((function(r){var i=t[r],a=i.renderable,o=i.data,s=i.style;Object.keys(o).forEach((function(t){var i=parseInt(t,10),c=e.dataIntervalClosestToTime(i);i<e.to&&n[c]&&n[c].push({id:r,value:o[i],renderable:a,style:s})}))})),this.trigger("ready"),this.trigger("load:done")}}}]),n}
(z),Z=function(t,e,n,r){return new(n||(n=Promise))((function(i,a){function o(t){try{c(r.next(t))}catch(t){a(t)}}
function s(t){try{c(r.throw(t))}catch(t){a(t)}}
function c(t){var e;t.done?i(t.value):(e=t.value,e instanceof n?e:new n((function(t){t(e)}))).then(o,s)}
c((r=r.apply(t,e||[])).next())}))},$=function(){function t(e,n){var r=this;i()(this,t),this.source=e;var a=new N;a.provider=this,a.on("data:add",(function(t){return e.trigger("markers:add",{markers:t.data.items})})),a.on("data:remove",(function(t){return e.trigger("markers:remove",{markers:t.data.items})})),a.on("data:update",(function(t){return e.trigger("markers:update",{markers:t.data.items})})),this.animation=a,e.on("data:load:start reset",(function(){r._animationMarkers=null}))}
return o()(t,[{key:"_loadAnimationData",value:function(){var t=this.source;return new Promise((function(e,n){var r=t.service.param("limit")||300,i=t.service.param("plimit"),a=t.service.param("sort")||"dt:-1",o=t.style.marker||t.style;t.service.action("within").plimit(100).limit(r).sort(a).get().then((function(n){t.service.plimit(i);var r={},a=Object(O.get)(n,"data")||[];Object(O.isArray)(a)&&a.forEach((function(e){var n=t.processRecord(e),i=n.loc||{},a={lat:i.lat,lon:i.long||i.lon},s=n.id||"".concat(a.lat,",").concat(a.long),c=t.markersById?t.markersById[s]:null,u=Object(O.isFunction)(o)?o(n):o;if(c)
r[s]=new k.a(Object(O.extend)({},c.data,n),c.style,c.renderable);else if(!1===Object(O.isset)(u.spacing)){var l=t.strategy.factory.marker(t.key,{lat:a.lat,lon:a.lon},u);r[s]=new k.a(Object.assign(Object.assign({},n),{awxjs_source:t.key}),u,l)}})),e(r)})).catch((function(t){console.error("Error requesting animation data for TextSource",t),n(t)}))}))}},{key:"animationData",value:function(t){return Z(this,void 0,void 0,q.a.mark((function t(){var e,n,r,i=this;return q.a.wrap((function(t){for(;;)
switch(t.prev=t.next){case 0:return e=this.source,n=function(){var t=i._animationMarkers,n=(Object(O.get)(e.opts,"data.properties.timestamp")||"").replace(/^periods\./,""),r=Object(O.get)(e.opts,"data.properties.value");return Object(O.isFunction)(r)||(r=(r||"").replace(/^periods\./,"")),Object.keys(t).reduce((function(i,a){var o=t[a],s=o.data,c=o.renderable;if(s&&s.periods){var u,l=s.periods.reduce((function(t,e){var i=1e3*Object(O.get)(e,n),a="";return(a=Object(O.isFunction)(r)?r(e):Object(O.get)(e,r))!==u&&(t[i]=a,u=a),t}),{});return i[a]={data:l,renderable:c,style:e.style},i}
return null}),{})},r=function(){return new Promise((function(t,e){i._loadAnimationData().then((function(e){i._animationMarkers=e,t(e)}))}))},t.abrupt("return",new Promise((function(t,a){if(i._animationMarkers){var o=n();t(o)}else
e.isLoading?e.once("data:load",(function(){r().then((function(e){var r=n();t(r)}))})):r().then((function(e){var r=n();t(r)}))})));case 4:case"end":return t.stop()}}),t,this)})))}}]),t}
();function H(t){var e=function(){if("undefined"==typeof Reflect||!Reflect.construct)
return!1;if(Reflect.construct.sham)
return!1;if("function"==typeof Proxy)
return!0;try{return Date.prototype.toString.call(Reflect.construct(Date,[],(function(){}))),!0}catch(t){return!1}}
();return function(){var n,r=p()(t);if(e){var i=p()(this).constructor;n=Reflect.construct(r,arguments,i)}else
n=r.apply(this,arguments);return f()(this,n)}}
var U=function(t){l()(n,t);var e=H(n);function n(t,r){var a,o;return i()(this,n),(null===(o=(a=e.call(this,t,r)).opts.animation)||void 0===o?void 0:o.enabled)&&(a._animator=new $(c()(a),a.opts.animation)),a}
return o()(n,[{key:"processRecord",value:function(t){t=Object(O.cloneDeep)(t);var e=Object(O.get)(this.opts,"data.properties.value");return Object(O.isFunction)(e)||(e=(e||"").replace(/^periods\./,""),t.periods&&(e="periods[0].".concat(e))),t.value=t.value||(Object(O.isFunction)(e)?e(t):Object(O.get)(t,e)),t}}]),n}
(B),J=n("dJbZ");function G(t){var e=function(){if("undefined"==typeof Reflect||!Reflect.construct)
return!1;if(Reflect.construct.sham)
return!1;if("function"==typeof Proxy)
return!0;try{return Date.prototype.toString.call(Reflect.construct(Date,[],(function(){}))),!0}catch(t){return!1}}
();return function(){var n,r=p()(t);if(e){var i=p()(this).constructor;n=Reflect.construct(r,arguments,i)}else
n=r.apply(this,arguments);return f()(this,n)}}
var Q=function(t){l()(n,t);var e=G(n);function n(){return i()(this,n),e.apply(this,arguments)}
return o()(n,[{key:"_process",value:function(t,e){var n=this;if(!this.strategy)
throw new Error("No map strategy defined for VectorSource but one is required.");t=t||{};var r=Object(O.get)(this.opts,"data.formatter");r&&(t=r(t));var i={},a={},o={};if(Object(O.isArray)(t)&&(t=t[0]&&"FeatureCollection"===t[0].type?t[0]:{type:"FeatureCollection",features:t}),"Feature"===t.type?t={type:"FeatureCollection",features:[t]}:"GeometryCollection"===t.type&&(t={type:"FeatureCollection",features:(t.geometries||[]).map((function(t){return{type:"Feature",geometry:t}}))}),!Object(O.isset)(t.type))
return console.warn("Invalid data provided for GeoJsonSource with key ".concat(this.key,", not a valid GeoJSON format")),null;var s=this.strategy.factory,c=new J.a(t),u=this.style,l=u.marker,h=u.polygon,f=u.polyline;return(c.features||[]).forEach((function(t,e){var r,c=t.geometry,u=t.properties||{},d=Object(O.get)(n.opts,"data.properties.id"),p=Object(O.get)(n.opts,"data.properties.category");if(Object(O.isset)(d)&&(t.id=Object(O.get)(u,d)),Object(O.isset)(p)){r=Object(O.get)(u,p);var v=Object(O.set)({},p,r);a[r]||(a[r]={data:Object.assign(Object.assign({},v),{awxjs_source:n.key}),elements:[]}),o[r]||(o[r]={data:Object.assign(Object.assign({},v),{awxjs_source:n.key}),elements:[]})}
if(u.id="".concat(n.key),t.id?u.id="".concat(u.id,"-").concat(t.id):u.id="".concat(u.id,"-").concat(e),c instanceof _.e){var y=Object(O.isFunction)(l)?l(u):l,m=w(n.key,u,c.coordinates,y,s);i[u.id]=m}else if(c instanceof _.c)
c.coordinates.forEach((function(t,e){var r=Object.assign(Object.assign({},u),{id:"".concat(u.id,"-").concat(e)}),a=Object(O.isFunction)(l)?l(r):l,o=w(n.key,r,t,a,s);i[u.id]=o}));else if(c instanceof _.a){var g=j(n.key,u,c.coordinates,f,s);r?o[r].elements.push(g):o[u.id]=g}else if(c instanceof _.b)
c.coordinates.forEach((function(t,e){var i=Object.assign(Object.assign({},u),{id:"".concat(u.id,"-").concat(e)}),a=j(n.key,i,t,f,s);r?o[r].elements.push(a):o[u.id]=a}));else if(c instanceof _.f){var k=x(n.key,u,c,h,s);r?o[r].elements.push(k):a[u.id]=k}else if(c instanceof _.d){var b=x(n.key,u,c,h,s);r?o[r].elements.push(b):a[u.id]=b}})),{markers:Object.keys(i).map((function(t){return i[t]})),polygons:Object.keys(a).map((function(t){return a[t]})),polylines:Object.keys(o).map((function(t){return o[t]}))}}}]),n}
(B),X=n("uts4")},hWIy:function(t,e,n){"use strict";n("QWBl"),n("yXV3"),n("2B1R"),n("+2oP"),n("pDQq"),n("tkto"),n("07d7"),n("SuFq"),n("JfAA"),n("FZtP");var r=n("lwsE"),i=n.n(r),a=n("iWIM"),o=n.n(a),s=n("W8MJ"),c=n.n(s),u=n("7W2i"),l=n.n(u),h=n("a1gu"),f=n.n(h),d=n("Nsbk"),p=n.n(d),v=n("dB9R"),y=n("0lfv");function m(t){var e=function(){if("undefined"==typeof Reflect||!Reflect.construct)
return!1;if(Reflect.construct.sham)
return!1;if("function"==typeof Proxy)
return!0;try{return Date.prototype.toString.call(Reflect.construct(Date,[],(function(){}))),!0}catch(t){return!1}}
();return function(){var n,r=p()(t);if(e){var i=p()(this).constructor;n=Reflect.construct(r,arguments,i)}else
n=r.apply(this,arguments);return f()(this,n)}}
var g=function(t){l()(n,t);var e=m(n);function n(){var t,r=arguments.length>0&&void 0!==arguments[0]?arguments[0]:null;return i()(this,n),r=Object(y.extend)({},{refresh:0,showWhenLoading:!0,showLoadingIntervals:!1,bufferIntervals:-1,reverseLoadOrder:!1,times:void 0},r),(t=e.call(this,r))._layersByTime=null,t._isReset=!1,t._loading=!1,t._hasLoaded=!1,t._visible=!0,Object(y.isset)(t.opts.times)&&t.setTimes(t.opts.times),t._startup(),t}
return c()(n,[{key:"showWhenLoading",get:function(){return this.opts.showWhenLoading},set:function(t){this.opts.showWhenLoading=t}},{key:"bufferCount",get:function(){var t=this.opts.bufferIntervals;return-1===t?this.totalIntervals:(this.isFuture()&&this.containsPast()&&(t=this.opts.bufferIntervals-(this.opts.intervals-this.totalIntervals)),Math.max(0,Math.min(t,this.totalIntervals)))}}]),c()(n,[{key:"dataByTime",value:function(){return this._layersByTime||{}}},{key:"dataItems",value:function(){var t=this;return Object.keys(this.dataByTime()).map((function(e){return t._layersByTime[e]}))}},{key:"play",value:function(){if(!this.isAnimating()){var t=this.totalIntervals,e=this.bufferCount;(e>0||0===this.bufferCount)&&(!this._hasImages()&&t>0||this._totalImages()<e)?this._load():(this.show(),o()(p()(n.prototype),"play",this).call(this))}}},{key:"stop",value:function(){o()(p()(n.prototype),"stop",this).call(this),this._loading&&this.reset()}},{key:"reset",value:function(){var t=this,e=arguments.length>0&&void 0!==arguments[0]&&arguments[0];o()(p()(n.prototype),"reset",this).call(this,e),this.hide(),this._reloadTimer&&window.clearTimeout(this._reloadTimer),this._isReset=!0,this._loading=!1,this._hasLoaded=!1,this._layersByTime=null,this._currentLayer=null,this._layersByTime&&Object.keys(this._layersByTime).forEach((function(e){var n=parseInt(e,10);t._layersByTime[n].remove(),delete t._layersByTime[n]}))}},{key:"isReady",value:function(){var t=this.bufferCount,e=this._totalImages();return this.canBeginPlayback()&&(this._hasImages()&&e>=t||0===t)}},{key:"needsData",value:function(){return this._totalImages()<this.totalIntervals}},{key:"canBeginPlayback",value:function(){return this.bufferCount>=0?this._totalImages()>=this.bufferCount:!this.isLoading()}},{key:"canAnimate",value:function(){var t=o()(p()(n.prototype),"canAnimate",this).call(this);return t&&this._hasLoaded&&this.needsData()&&(t=!1),t}},{key:"isLoading",value:function(){return this._loading}},{key:"show",value:function(){this._visible=!0,this._currentLayer&&this._currentLayer.show()}},{key:"hide",value:function(){this._visible=!1,this._currentLayer&&this._currentLayer.hide()}},{key:"isVisible",value:function(){return!this._currentLayer||this._currentLayer.isVisible()}},{key:"setOpacity",value:function(t){this.dataItems().forEach((function(e){Object(y.has)(e,"setOpacity")&&e.setOpacity(t,!0)}))}},{key:"_updateForTime",value:function(t){if(this.canShow(this.currentTime)?this.show():this.hide(),!1!==this._visible){var e=this._frameClosestToTime(t);e&&e!==this._currentLayer&&(e.show(),this._currentLayer&&this._currentLayer.hide(),this._currentLayer=e)}}},{key:"_frameClosestToTime",value:function(t){if(0===Object.keys(this.dataByTime()).length)
return null;var e=Object.keys(this._layersByTime).sort().reverse().map((function(t){return parseInt(t,10)})),n=null,r=e[e.length-1],i=Math.abs(t-r);return e.forEach((function(e){var n=Math.abs(t-e);n<i&&(i=n,r=e)})),r!==this._lastImageTime&&this._layersByTime[r]&&(n=this._layersByTime[r],r=Math.round(r),this._lastImageTime=r,this.trigger("advance:image",{time:r,layer:n})),n}},{key:"_hasImages",value:function(){return this._totalImages()>0}},{key:"_totalImages",value:function(){return Object.keys(this.dataByTime()).length}},{key:"_load",value:function(){var t=this;if(!this._loading){var e=this.neededIntervals();if(!e||0===e.length)
return this._hasLoaded=!0,this.trigger("load:done"),void this.trigger("ready");this._isReset=!1,this._loading=!0;var n=this.bufferCount;this._layersByTime&&Object.keys(this._layersByTime).forEach((function(t){var n=parseInt(t,10),r=e.indexOf(n);-1!==r&&e.splice(r,1)}));var r=function(){t._loading=!1,t._hasLoaded=!0,t.trigger("load:done"),(-1===n||n>=e.length)&&t.trigger("ready"),t.timeline||t.play()};if(0!==e.length){n>=0&&!0===this.opts.reverseLoadOrder&&(e=e.reverse()),this.trigger("load:start",{times:e});var i=function(i){var a=!1===t.opts.showLoadingIntervals&&0!==n;i.forEach((function(n){t._loadInterval(n,!0,a,(function(){t._totalImages()===e.length&&r()}))}))},a=0;0===n?(this.trigger("ready"),i(e)):function o(){var s=!1===t.opts.showLoadingIntervals||0!==n&&a<=t._totalImages();t._loadInterval(e[a],!0,s,(function(){a+=1,t._isReset||(a>=e.length?(r(),t.opts.refresh>0&&(t._reloadTimer&&window.clearTimeout(t._reloadTimer),t._reloadTimer=setTimeout((function(){t.reset(),t._load()}),1e3*t.opts.refresh))):n>0&&t._totalImages()===n?(t.trigger("ready"),t.opts.showLoadingIntervals?i(e.slice(a)):o()):o())}))}
()}else
r()}}},{key:"_loadInterval",value:function(t,e,n){var r=this,i=arguments.length>3&&void 0!==arguments[3]?arguments[3]:null;if(t=Math.round(t),this._layersByTime){if(this._layersByTime[t])
return void(i&&i())}else
this._layersByTime={};var a=new Date(t);this.provider&&this.provider.animationLayerForDate(this,a,n).then((function(e){r._isReset?e.remove():(r.showWhenLoading&&r._totalImages()<r.bufferCount&&(r._currentLayer&&r._currentLayer.hide(),e.show(),r._currentLayer=e),r._layersByTime[t]=e,r.trigger("load:image",{date:new Date(t),layer:e}),r.trigger("load:progress",{time:t,loaded:Object.keys(r._layersByTime).length,total:r.totalIntervals}),i&&i())})).catch((function(t){console.error("Failed to load tile animation interval",t)}))}}]),n}
(v.a);e.a=g},hXpO:function(t,e,n){var r=n("HYAF"),i=/"/g;t.exports=function(t,e,n,a){var o=String(r(t)),s="<"+e;return""!==n&&(s+=" "+n+'="'+String(a).replace(i,"&quot;")+'"'),s+">"+o+"</"+e+">"}},iWIM:function(t,e,n){var r=n("n3AX");function i(e,n,a){return"undefined"!=typeof Reflect&&Reflect.get?t.exports=i=Reflect.get:t.exports=i=function(t,e,n){var i=r(t,e);if(i){var a=Object.getOwnPropertyDescriptor(i,e);return a.get?a.get.call(n):a.value}},i(e,n,a||e)}
t.exports=i},l1hk:function(t,e,n){"use strict";n.d(e,"b",(function(){return m}));n("ma9I"),n("QWBl"),n("FZtP");var r=n("lwsE"),i=n.n(r),a=n("W8MJ"),o=n.n(a),s=(n("sMBO"),n("07d7"),n("SuFq"),n("JfAA"),n("7W2i")),c=n.n(s),u=n("a1gu"),l=n.n(u),h=n("Nsbk"),f=n.n(h),d=n("oShl");function p(t){var e=function(){if("undefined"==typeof Reflect||!Reflect.construct)
return!1;if(Reflect.construct.sham)
return!1;if("function"==typeof Proxy)
return!0;try{return Date.prototype.toString.call(Reflect.construct(Date,[],(function(){}))),!0}catch(t){return!1}}
();return function(){var n,r=f()(t);if(e){var i=f()(this).constructor;n=Reflect.construct(r,arguments,i)}else
n=r.apply(this,arguments);return l()(this,n)}}
var v=function(t){c()(n,t);var e=p(n);function n(t){var r;return i()(this,n),(r=e.call(this,t)).name=r.constructor.name,r.stack=(new Error).stack,r}
return n}
(n.n(d)()(Error)),y=n("0lfv"),m=function(t){var e=Math.ceil(Math.abs(t.lat)/180);return t.lat>90?t.lat-=180*e:t.lat<-90&&(t.lat+=180*e),e=Math.ceil(Math.abs(t.lon)/360),t.lon>180?t.lon-=360*e:t.lon<-180&&(t.lon+=360*e),t},g=function(){function t(e,n){if(i()(this,t),this.north=0,this.south=0,this.west=0,this.east=0,e=m(e),n=m(n),void 0===e||!Object(y.isObject)(e))
throw new v("CoordinateBounds - northwest coordinate value is required");if(void 0===n||!Object(y.isObject)(n))
throw new v("CoordinateBounds - southeast coordinate value is required");if(e.lat<n.lat)
throw new v("CoordinateBounds - northern latitude must be greater than southern latitude");this.north=e.lat,this.south=n.lat,this.west=e.lon,this.east=n.lon}
return o()(t,[{key:"northwest",value:function(){return{lat:this.north,lon:this.west}}},{key:"southwest",value:function(){return{lat:this.south,lon:this.west}}},{key:"northeast",value:function(){return{lat:this.north,lon:this.east}}},{key:"southeast",value:function(){return{lat:this.south,lon:this.east}}},{key:"center",value:function(){return{lat:this.north-(this.north-this.south)/2,lon:this.west-(this.west-this.east)/2}}},{key:"extend",value:function(t){if(!(this.north||this.south||this.west||this.east))
return this.north=t.lat,this.south=t.lat,this.west=t.lon,void(this.east=t.lon);this.north=Math.max(this.north,t.lat),this.south=Math.min(this.south,t.lat),this.west=Math.min(this.west,t.lon),this.east=Math.max(this.east,t.lon)}},{key:"intersects",value:function(t){if(this.contains(t))
return!1;var e=t.north,n=t.south,r=t.east,i=t.west;return(e<=this.north&&e>=this.south||n>=this.south&&n<=this.north)&&(i>=this.west&&i<=this.east||r<=this.east&&r>=this.west)}},{key:"contains",value:function(e){if(e instanceof t){var n=e.north,r=e.south,i=e.east,a=e.west;return n<this.north&&r>this.south&&a>this.west&&i<this.east}
var o=e.lat,s=e.lon;return o<this.north&&o>this.south&&s>this.west&&s<this.east}},{key:"toString",value:function(){return"".concat(this.north,",").concat(this.west,",").concat(this.south,",").concat(this.east)}}],[{key:"fromBounds",value:function(e){return new t({lat:e.north,lon:e.west},{lat:e.south,lon:e.east})}},{key:"fromPoints",value:function(e){var n={north:null,south:null,west:null,east:null};return e.forEach((function(t,e){0===e?(n.north=t.lat,n.south=t.lat,n.west=t.lon,n.east=t.lon):Object(y.isset)(t.lat)&&Object(y.isset)(t.lon)&&(n.north=Math.max(n.north,t.lat),n.south=Math.min(n.south,t.lat),n.west=Math.min(n.west,t.lon),n.east=Math.max(n.east,t.lon))})),t.fromBounds(n)}}]),t}
();e.a=g},lSNA:function(t,e){t.exports=function(t,e,n){return e in t?Object.defineProperty(t,e,{value:n,enumerable:!0,configurable:!0,writable:!0}):t[e]=n,t}},lnrW:function(t,e,n){"use strict";n.d(e,"d",(function(){return w})),n.d(e,"b",(function(){return x})),n.d(e,"c",(function(){return T}));n("ma9I"),n("fbCW"),n("QWBl"),n("yXV3"),n("oVuX"),n("2B1R"),n("07d7"),n("5s+n"),n("SuFq"),n("TWNs"),n("rB9j"),n("JfAA"),n("Rm1S"),n("UxlC"),n("EnZy"),n("FZtP");var r,i=n("lwsE"),a=n.n(i),o=n("W8MJ"),s=n.n(o),c=n("7W2i"),u=n.n(c),l=n("a1gu"),h=n.n(l),f=n("Nsbk"),d=n.n(f),p=n("m0x2"),v=n("qV3b"),y=n("0lfv"),m=(n("TeQF"),function(){function t(e){a()(this,t),this.account=e}
return s()(t,[{key:"times",value:function(t){var e=this,n=arguments.length>1&&void 0!==arguments[1]?arguments[1]:20;return new Promise((function(r,i){var a="https://maps.aerisapi.com/".concat(e.account.id,"_").concat(e.account.secret,"/").concat(t,".json?limit=").concat(n);v.b.request(a).then((function(t){var e=[];if(t.data){var n=t.data;Object(y.isset)(n.files)&&(e=n.files.map((function(t){return{time:new Date(1e3*t.timestamp),min:new Date(1e3*t.minTimestamp),max:new Date(1e3*t.maxTimestamp),run:new Date(1e3*t.runTime)}})))}
r(e)})).catch((function(t){i(t)}))}))}},{key:"timesInRange",value:function(t,e,n){var r=arguments.length>3&&void 0!==arguments[3]?arguments[3]:20;return this.times(t,r).then((function(t){return t.filter((function(t){return t.time.getTime()>=e.getTime()&&t.time.getTime()<=n.getTime()}))}))}}]),t}
());function g(t){var e=function(){if("undefined"==typeof Reflect||!Reflect.construct)
return!1;if(Reflect.construct.sham)
return!1;if("function"==typeof Proxy)
return!0;try{return Date.prototype.toString.call(Reflect.construct(Date,[],(function(){}))),!0}catch(t){return!1}}
();return function(){var n,r=d()(t);if(e){var i=d()(this).constructor;n=Reflect.construct(r,arguments,i)}else
n=r.apply(this,arguments);return h()(this,n)}}
var k=[],b=["air-quality","earthquakes","fires","records","river-observations","stormreports"],_=["convective","drought-monitor","fire-outlook","tropical-cyclones-break-points"],O=b.concat(_).concat(["stormcells","tropical-cyclones"]),w=function(t){return-1!==O.indexOf(t)},j=["observations"],x=function(t){return-1!==j.indexOf(t)},T=function(t){return!w(t)&&!x(t)},S=function(t){if(!Object(y.isset)(t)||!Object(y.isString)(t))
return[];t=t.replace(/\:.+$/,"");var e=(r||[]).map((function(t){return t.id})),n=(t||"").split(","),i=[];n.forEach((function(t){-1===e.indexOf(t)&&k.forEach((function(e){t=t.replace(new RegExp("-".concat(e)),"")})),i.push(t)}));var a=[];return i.forEach((function(t){t=t.replace(/\:.*$/,""),-1!==e.indexOf(t)||w(t)||x(t)||a.push(t)})),a},M=function(t){u()(n,t);var e=g(n);function n(t){var i;return a()(this,n),(i=e.call(this))._groups={},i._loading=!1,i._validTimes=new m(t),Object(y.isset)(r)?i._process(r):i.fetch(),i}
return s()(n,[{key:"fetch",value:function(){var t=this;return new Promise((function(e,n){r?e(Object(y.cloneDeep)(r)):t._loading?t.on("load:done",(function(t){e(Object(y.cloneDeep)(r))})):t._fetchLayerMetadata().then((function(t){e(Object(y.cloneDeep)(r))}))})).catch((function(t){console.error("[Aeris] Failed to load map layer metadata - ".concat(t))}))}},{key:"cached",value:function(){return void 0!==r}},{key:"loading",value:function(){return this._loading}},{key:"groups",value:function(){return this._groups}},{key:"inGroup",value:function(t,e){var n=arguments.length>2&&void 0!==arguments[2]&&arguments[2],r=this._groups[e];if(t=t.replace(/:.*$/,""),r){if(n)
return-1!==r.indexOf(t);var i=!1;return r.forEach((function(e){var n=new RegExp("^".concat(e,"-"));(e===t||n.test(t))&&(i=!0)})),i}
return!1}},{key:"exists",value:function(t){return function(t){return 0===S(t).length}
(t)}},{key:"find",value:function(t,e){var n=arguments.length>2&&void 0!==arguments[2]&&arguments[2],r=this.findAll(t,[e],n);if(r.length>0)
return r[0]}},{key:"findAll",value:function(t,e){var n=arguments.length>2&&void 0!==arguments[2]&&arguments[2],i=r,a=[];return e=e||[],i&&e.forEach((function(e){i.forEach((function(r,i){var o=r[t],s=o===e;if(!s){var c=new RegExp("^".concat(o,"-")),u=(r.modifiers||[]).map((function(t){return[].concat((t.options||[]).map((function(t){return"".concat(r.id,"-").concat(t.id)})))}));u=u.length>0?u[0]:u,"id"===t&&(s=n?-1!==u.indexOf(e):c.test(e))}
s&&("id"===t&&(r=Object(y.extend)(Object(y.cloneDeep)(r),{id:e})),a.push(r))}))})),Object(y.cloneDeep)(a)}},{key:"findInvalidIds",value:function(t){var e=Object(y.isArray)(t)?t.join(","):t;return S(e)}},{key:"future",value:function(){if(!this._future){var t=this.findAll("category",["forecasts","models","outlooks"]);t.push(this.find("id","fradar")),t.push(this.find("id","fsatellite")),this._future=t}
return this._future}},{key:"futureCodes",value:function(){return this.future().map((function(t){return t?t.id:void 0}))}},{key:"isFuture",value:function(t){var e=this,n=!1;if(t.indexOf(",")>=0)
return this._checkCombined(t,(function(t){return e.isFuture(t)}));var r=this.futureCodes(),i=t.replace(/:.*$/,"");return(n=-1!==r.indexOf(i))||(i=i.replace(/\-\w+$/,""),n=-1!==r.indexOf(i)),n}},{key:"isBase",value:function(t){var e=t.replace(/:.*$/,"");return this.inGroup(e,"base")}},{key:"isOverlay",value:function(t){var e=t.replace(/:.*$/,"");return this.inGroup(e,"overlay")||this.inGroup(e,"masks")}},{key:"hasMetric",value:function(t){return!!this.inGroup(t,"text")&&!1===/^f?humidity-/.test(t)}},{key:"_checkCombined",value:function(t,e){var n=!1;return(t||"").split(",").forEach((function(t){e(t)&&(n=!0)})),n}},{key:"_process",value:function(t){if(t){var e={};k=[],t.forEach((function(t){var n=t.category;n.match(/^base/)?n="base":n.match(/overlay/)&&(n="overlay"),void 0===e[n]&&(e[n]=[]),e[n].push(t.id),/-text$/.test(t.id)&&(void 0===e.text&&(e.text=[]),e.text.push(t.id)),t.modifiers&&Object(y.isArray)(t.modifiers)&&t.modifiers.forEach((function(t){t.options&&t.options.forEach((function(t){-1===k.indexOf(t.id)&&k.push(t.id)}))}))})),k.push("aeris"),this._groups=e}}},{key:"_fetchLayerMetadata",value:function(){var t=this;return this._loading=!0,this.trigger("load:start"),new Promise((function(e,n){v.b.request("https://cdn.aerisjs.com/layers.json").then((function(n){n.data&&(r=n.data,t._process(n.data),t._loading=!1,t.trigger("load:done"),e(r))})).catch((function(t){n(t)}))})).catch((function(t){console.error("Layers: Failed to load layers metadata - ".concat(t))}))}},{key:"validTimes",get:function(){return this._validTimes}}]),n}
(p.a);e.a=M},m92n:function(t,e,n){var r=n("glrk"),i=n("KmKo");t.exports=function(t,e,n,a){try{return a?e(r(n)[0],n[1]):e(n)}catch(e){throw i(t),e}}},n3AX:function(t,e,n){var r=n("Nsbk");t.exports=function(t,e){for(;!Object.prototype.hasOwnProperty.call(t,e)&&null!==(t=r(t)););return t}},njwm:function(t,e,n){"use strict";n.d(e,"a",(function(){return S}));n("rB9j"),n("UxlC");var r=n("0lfv"),i=function(){var t=arguments.length>0&&void 0!==arguments[0]?arguments[0]:"";switch(t=t.toLowerCase().replace(/\s/,"-")){case"good":return"#29e11f";case"moderate":return"#f8f92a";case"usg":return"#f9681b";case"unhealthy":return"#f60115";case"very-unhealthy":return"#7a2c83";case"hazardous":return"#65001b";default:return"#000000"}},a={data:{request:{endpoint:"airquality"},properties:{id:"id",timestamp:"timestamp"}},style:{marker:function(t){var e=Object(r.get)(t,"periods.0");if(!e)
return{skip:!0};var n=Object(r.get)(e,"category");if(!n)
return{skip:!0};var a=function(){var t=arguments.length>0&&void 0!==arguments[0]?arguments[0]:"";switch(t=t.toLowerCase().replace(/\s/,"-")){case"moderate":return 12;case"usg":return 14;case"unhealthy":return 18;case"very-unhealthy":return 20;case"hazardous":return 24;default:return 10}}
(n);return{className:"marker-airquality",svg:{shape:{type:"circle",fill:{color:i(n)},stroke:{color:"#ffffff",width:2}}},size:[a,a]}}}},o={default:"#000000",general:"#b3e6b1",marginal:"#6cbd69",slight:"#f4f964",enhanced:"#e0b767",moderate:"#e0686a",high:"#fe59ff"},s={data:{request:{endpoint:"convective/outlook",action:"search",parameters:{filter:"geo"}},properties:{id:"id",category:"details.risk.type",timestamp:{from:"details.range.minTimestamp",to:"details.range.maxTimestamp"},path:"geoPoly"}},style:{polygon:function(t){var e=Object(r.get)(t,"details.risk.type");return{fill:{color:o[e]||o.default,opacity:1}}}}},c=function(){var t=arguments.length>0&&void 0!==arguments[0]?arguments[0]:"";switch(t=t.toLowerCase()){case"d0":return"#ffff00";case"d1":return"#fccc66";case"d2":return"#ff9b00";case"d3":return"#e10000";case"d4":return"#600000";default:return"#000000"}},u={data:{request:{endpoint:"droughts/monitor",action:"search",parameters:{filter:"geo"}},properties:{id:"id",category:"details.category",timestamp:{from:"details.range.minTimestamp",to:"details.range.maxTimestamp"},path:"geoPoly"}},style:{polygon:function(t){var e=Object(r.get)(t,"details.category");return{fill:{color:c(e),opacity:1}}}}},l=function(){var t=arguments.length>0&&void 0!==arguments[0]?arguments[0]:"";switch(t=t.toLowerCase().replace(/\s/,"-")){case"mini":return"#6fb314";case"minor":return"#dfcb01";case"light":return"#ce8f00";case"moderate":return"#ff5d01";case"strong":return"#e90004";case"major":return"#ce0052";case"great":return"#b90285";case"catastrophic":return"#f500ff";default:return"#000000"}},h={data:{request:{endpoint:"earthquakes"},properties:{id:"report.id",timestamp:"report.timestamp"}},style:{marker:function(t){var e=Object(r.get)(t,"report.type");Object(r.get)(t,"report.mag")>=9&&(e="catastrophic");var n=function(){var t=arguments.length>0&&void 0!==arguments[0]?arguments[0]:"";switch(t=t.toLowerCase().replace(/\s/,"-")){case"minor":return 18;case"light":return 20;case"moderate":return 22;case"strong":return 26;case"major":return 30;case"great":return 36;case"catastrophic":return 42;default:return 16}}
(e);return{className:"marker-earthquake",svg:{shape:{type:"circle",fill:{color:l(e)},stroke:{color:"#ffffff",width:2}}},size:[n,n]}}},animation:{enabled:!0}},f={data:{request:{endpoint:"fires"},properties:{id:"report.id",timestamp:"report.timestamp"}},style:{marker:function(t){return{className:"marker-earthquake",svg:{shape:{type:"circle",fill:{color:"#ff0000"},stroke:{color:"#ffffff",width:2}}},size:[12,12]}}},animation:{enabled:!0}},d=function(){var t=arguments.length>0&&void 0!==arguments[0]?arguments[0]:"";switch(t=t.toLowerCase()){case"elevated":return"#ffb367";case"critical":return"#ff666a";case"extreme":return"#fe59ff";default:return"#000000"}},p={data:{request:{endpoint:"fires/outlook",action:"search",parameters:{filter:"geo"}},properties:{id:"id",path:"geoPoly",category:"details.risk.type",timestamp:{from:"details.range.minTimestamp",to:"details.range.maxTimestamp"}}},style:{polygon:function(t){var e=Object(r.get)(t,"details.risk.type");return{fill:{color:d(e),opacity:.7}}}}},v=function(t){return t<1?"#f5f5f5":t<5?"#dddddd":t<10?"#bbbbbb":t<15?"#888888":"#545454"},y={data:{request:{endpoint:"lightning"},properties:{id:"id",timestamp:"ob.timestamp"}},style:{marker:function(t){var e=Object(r.get)(t,"ob.timestamp");if(!e)
return null;var n=((new Date).getTime()-1e3*e)/6e4;return{className:"marker-record",svg:{shape:{type:"circle",fill:{color:v(n)},stroke:{color:"#ffffff",width:2}}},size:[14,14]}}},animation:{enabled:!0}},m=function(){var t=arguments.length>0&&void 0!==arguments[0]?arguments[0]:"";switch(t=t.toLowerCase().replace(/\s/,"-")){case"prcp":return"#2ef000";case"snow":return"#004fff";case"hsnd":return"#e402a4";case"maxt":return"#ff4b00";case"mint":return"#8700ff";case"himn":return"#eef500";case"lomx":return"#37b9f8";default:return"#000000"}},g={data:{request:{endpoint:"records"},properties:{id:"id",timestamp:"report.timestamp"}},style:{marker:function(t){var e=Object(r.get)(t,"report.type");return{className:"marker-record",svg:{shape:{type:"circle",fill:{color:m(e)},stroke:{color:"#ffffff",width:2}}},size:[14,14]}}},animation:{enabled:!0}},k=function(){var t=arguments.length>0&&void 0!==arguments[0]?arguments[0]:"";switch(t=t.toLowerCase().replace(/\s/,"-")){case"out_of_service":return"#535353";case"obs_not_current":return"#afb6ad";case"not_defined":return"#5f9de6";case"low_threshold":return"#7e5012";case"no_flooding":return"#0cff01";case"action":return"#ffff02";case"minor":return"#ff8700";case"moderate":return"#ff0000";case"major":return"#c000ff";default:return"#000000"}},b={data:{request:{endpoint:"rivers"},properties:{id:"id",timestamp:"ob.timestamp"}},style:{marker:function(t){var e=Object(r.get)(t,"ob.status");return{className:"marker-river",svg:{shape:{type:"circle",fill:{color:k(e)},stroke:{color:"#ffffff",width:2}}},size:[14,14]}}}},_=function(){var t=arguments.length>0&&void 0!==arguments[0]?arguments[0]:"";switch(t=t.toLowerCase()){case"general":return"#2ED300";case"hail":return"#EBE100";case"rotating":return"#F17200";case"tornado":return"#FF2600";default:return"#000000"}},O={data:{request:{endpoint:"stormcells"},properties:{id:"id",path:"forecast.cone.wide",category:"traits.type",timestamp:"ob.timestamp"},reversedCoord:!0},style:{marker:function(t){var e=Object(r.get)(t,"traits.type");return{className:"marker-stormcell",svg:{shape:{type:"circle",fill:{color:_(e)},stroke:{color:"#ffffff",width:2}}},size:[12,12]}},polygon:function(t){var e=Object(r.get)(t,"traits.type");return{fill:{color:_(e),opacity:.5}}}}},w=(n("toAj"),function(){var t=arguments.length>0&&void 0!==arguments[0]?arguments[0]:"";switch(t=t.toLowerCase()){case"avalanche":return"#639fec";case"blizzard":return"#4100e2";case"flood":return"#117d00";case"fog":return"#767676";case"ice":return"#e100e2";case"hail":return"#62def7";case"lightning":return"#8c8c8c";case"rain":return"#38e600";case"snow":return"#175cef";case"tides":return"#40db83";case"tornado":return"#c50000";case"tropical":return"#FF5D00";case"wind":return"#d8cc00";default:return"#555555"}}),j={data:{request:{endpoint:"stormreports"},properties:{id:"id",timestamp:"report.timestamp"}},style:{marker:function(t){var e=Object(r.get)(t,"report.cat");return{className:"marker-stormreport",svg:{shape:{type:"circle",fill:{color:w(e)},stroke:{color:"#ffffff",width:2}}},size:[14,14]}}},animation:{enabled:!0}},x={style:{marker:function(t){return{className:"marker-text",svg:{text:{value:t.value||"",x:25,y:Math.round(16-(16-14*.7)/2),size:14,style:"bold",color:"rgb(0,0,0)",autosize:!0}},spacing:20}}}},T={"air-quality":a,convective:s,"drought-monitor":u,earthquakes:h,fires:f,"fire-outlook":p,"lightning-strikes":y,records:g,"river-observations":b,stormcells:O,stormreports:j,text:x},S=function(t){return T[t]};e.b={airquality:a,convectiveOutlook:s,droughtMonitor:u,earthquakes:h,fires:f,fireOutlook:p,lightningStrikes:y,records:g,rivers:b,stormcells:O,stormreports:j,text:x}},oShl:function(t,e,n){var r=n("Nsbk"),i=n("SksO"),a=n("xfeJ"),o=n("sXyB");function s(e){var n="function"==typeof Map?new Map:void 0;return t.exports=s=function(t){if(null===t||!a(t))
return t;if("function"!=typeof t)
throw new TypeError("Super expression must either be null or a function");if(void 0!==n){if(n.has(t))
return n.get(t);n.set(t,e)}
function e(){return o(t,arguments,r(this).constructor)}
return e.prototype=Object.create(t.prototype,{constructor:{value:e,enumerable:!1,writable:!0,configurable:!0}}),i(e,t)},s(e)}
t.exports=s},pjDv:function(t,e,n){var r=n("I+eb"),i=n("TfTi");r({target:"Array",stat:!0,forced:!n("HH4o")((function(t){Array.from(t)}))},{from:i})},rwPt:function(t,e,n){var r=n("0Dky");t.exports=function(t){return r((function(){var e=""[t]('"');return e!==e.toLowerCase()||e.split('"').length>3}))}},ry37:function(t,e,n){"use strict";n("ma9I"),n("TeQF"),n("QWBl"),n("yXV3"),n("2B1R"),n("pDQq"),n("tkto"),n("07d7"),n("SuFq"),n("JfAA"),n("FZtP");var r=n("lwsE"),i=n.n(r),a=n("iWIM"),o=n.n(a),s=n("W8MJ"),c=n.n(s),u=n("7W2i"),l=n.n(u),h=n("a1gu"),f=n.n(h),d=n("Nsbk"),p=n.n(d),v=n("dB9R"),y=n("3j3Q"),m=n("0lfv");function g(t){var e=function(){if("undefined"==typeof Reflect||!Reflect.construct)
return!1;if(Reflect.construct.sham)
return!1;if("function"==typeof Proxy)
return!0;try{return Date.prototype.toString.call(Reflect.construct(Date,[],(function(){}))),!0}catch(t){return!1}}
();return function(){var n,r=p()(t);if(e){var i=p()(this).constructor;n=Reflect.construct(r,arguments,i)}else
n=r.apply(this,arguments);return f()(this,n)}}
var k=function(t){l()(n,t);var e=g(n);function n(t){var r,a=arguments.length>1&&void 0!==arguments[1]?arguments[1]:void 0;return i()(this,n),a=Object(m.extend)({},{refresh:0,showWhenStopped:!0,showWhenLoading:!0},a),(r=e.call(this,a)).element=t?Object(y.a)(t):void 0,r._images={},r._targets={},r._idPrefix="awxb-map-layer-",r._isReset=!1,r._loading=!1,r._visible=!0,r._hasLoaded=!1,Object(m.isEmpty)(a.key)||(r._idPrefix+="".concat(a.key,"-")),r.element&&r.element.addClass("amp-map"),r._startup(),r}
return c()(n,[{key:"showWhenLoading",get:function(){return this.opts.showWhenLoading},set:function(t){this.opts.showWhenLoading=t}}]),c()(n,[{key:"dataByTime",value:function(){return this._images}},{key:"dataItems",value:function(){var t=this;return Object.keys(this.dataByTime()).map((function(e){return t._images[e]}))}},{key:"play",value:function(){this.isAnimating()||this.canAnimate()&&(!this._hasImages()||this._totalImages()<this.totalIntervals?this._load():o()(p()(n.prototype),"play",this).call(this))}},{key:"stop",value:function(){o()(p()(n.prototype),"stop",this).call(this),this._loading&&this.reset()}},{key:"reset",value:function(){var t=this,e=arguments.length>0&&void 0!==arguments[0]&&arguments[0];this._isReset=!0,this._loading=!1,this._hasLoaded=!1,this._reloadTimer&&window.clearTimeout(this._reloadTimer),this._loaders&&Object.keys(this._loaders).forEach((function(e){t._loaders[e].onload=void 0})),this._images={},this._loaders={},this.element&&this.element.empty(),o()(p()(n.prototype),"reset",this).call(this,e)}},{key:"isReady",value:function(){var t=this.totalIntervals,e=this._totalImages();return!this.isLoading()&&(this._hasImages()&&e===t||0===t)}},{key:"canAnimate",value:function(){var t=o()(p()(n.prototype),"canAnimate",this).call(this);return(t&&this._hasLoaded&&!this._hasImages()||t&&!this.isFuture()&&!this.containsPast()||this.isFuture()&&!this.containsFuture())&&(t=!1),t}},{key:"isLoading",value:function(){return this._loading}},{key:"show",value:function(){this._visible=!0,this.element?this.element.show():this._currentImage&&Object(y.a)(this._currentImage).show(),this.trigger("show")}},{key:"hide",value:function(){this._visible=!1,this.element?this.element.hide():this._currentImage&&Object(y.a)(this._currentImage).hide(),this.trigger("hide")}},{key:"isVisible",value:function(){if(this.element){var t=this.element;return Object(m.isDOM)(this.element)&&this.element.length>0&&(t=this.element[0]),"none"!==t.style.display}
return!this._currentImage||"none"!==this._currentImage.style.display}},{key:"setOpacity",value:function(t){this.dataItems().forEach((function(e){Object(m.has)(e,"setOpacity")&&e.setOpacity(t)}))}},{key:"_target",value:function(t){return this._targets[t]}},{key:"_setImageVisible",value:function(t){t?Object(y.a)(this._currentImage).show():Object(y.a)(this._currentImage).hide()}},{key:"_updateForTime",value:function(t){if(this.canShow(this.currentTime)?this.show():this.hide(),!1!==this._visible){var e=this._imageClosestToTime(t);e?e!==this._currentImage&&(Object(y.a)(e).show(),this._setImageVisible(!1),this._currentImage=e):this.isAnimating()||!0!==this.opt("showWhenStopped")||(t=this._intervalClosestToTime(t),this.canShow(t)&&(this._isReset=!1,this._loadInterval(t,!0,null)))}}},{key:"_imageClosestToTime",value:function(t){var e=null,n=this.from,r=Math.abs(t-n);return this._images?(Object.keys(this._images).forEach((function(e){var i=Math.abs(t- +e);i<r&&(r=i,n=+e)})),n!==this._lastImageTime&&this._images[n]&&(e=this._images[n],n=Math.round(n),this._lastImageTime=n,this.trigger("advance:image",{time:n,img:e})),e):null}},{key:"_hasImages",value:function(){return this._totalImages()>0}},{key:"_totalImages",value:function(){var t=this;return Object(m.isUndefined)(this._images)?0:Object.keys(this._images).filter((function(e){return Object(m.isset)(t._images[e])})).length}},{key:"_load",value:function(){var t=this;this._isReset=!1,this._loading=!0;var e=this.neededIntervals()||[];Object.keys(this._images).forEach((function(t){var n=parseInt(t,10),r=e.indexOf(n);-1!==r&&e.splice(r,1)}));var n=function(){t._loading=!1,t._hasLoaded=!0,t.trigger("load:done"),t.trigger("ready"),t.timeline||t.play()};if(0!==e.length){if(this.element&&!0===this.opts.autosize&&this.provider){var r=this.provider.animationSizeForImage(this);this.element.css({width:"".concat(r.width,"px"),height:"".concat(r.height,"px")})}
this.trigger("load:start",{times:e});var i=0;!function r(){t._loadInterval(e[i],!0,(function(){i+=1,t._isReset||(i>=e.length?(n(),t.opts.refresh>0&&(t._reloadTimer&&window.clearTimeout(t._reloadTimer),t._reloadTimer=setTimeout((function(){t.reset(),t._load()}),1e3*t.opts.refresh))):r())}))}
()}else
n()}},{key:"_loadInterval",value:function(t,e,n){var r=this;t=Math.round(t);var i=document.getElementById("".concat(this._idPrefix).concat(t));if(i){var a=Object(y.a)(i);return a.show(),this._setImageVisible(!1),this._currentImage=a,this._setImageVisible(!0),void(n&&n())}
if(this._images||(this._images={}),this._loaders||(this._loaders={}),this._images[t])
n&&n();else if(!this._loaders[t]){var o,s=new Date(t);this.provider&&(o=this.provider.animationUrlForDate(this,s));var c=function(t){r._images[t]=new Image,r.trigger("load:error",{date:s,interval:Object.keys(r._images).length-1}),n&&n()};if(o){var u=new Image;this._loaders[t]=u,u.onload=function(){if(!r._isReset){r._loaders[t]&&delete r._loaders[t];var i="".concat(r._idPrefix).concat(t),a={width:u.width,height:u.height};r.provider&&(a=r.provider.animationSizeForImage(r));var o='<img id="'.concat(i,'" src="').concat(u.src,'" width="').concat(a.width,'" height="').concat(a.height,'" style="position:absolute;">');r.element&&r.element.append(o),e&&(r._images[t]=r._hasDOMTarget()?Object(y.a)("#".concat(i)):u),r._setImageVisible(!1),r._currentImage=r._hasDOMTarget()?Object(y.a)("#".concat(i)):u,n&&n();var s=Object.keys(r._images).length;r.trigger("load:image",{date:new Date(t),src:u.src,img:u}),r.trigger("load:progress",{time:t,interval:s-1,loaded:s,total:r.totalIntervals})}},u.onerror=function(){c(t)},u.src=o}else
c(t)}}},{key:"_hasDOMTarget",value:function(){return this.element&&this.element.length>0}}]),n}
(v.a);e.a=k},sXyB:function(t,e,n){var r=n("SksO"),i=n("b48C");function a(e,n,o){return i()?t.exports=a=Reflect.construct:t.exports=a=function(t,e,n){var i=[null];i.push.apply(i,e);var a=new(Function.bind.apply(t,i));return n&&r(a,n.prototype),a},a.apply(null,arguments)}
t.exports=a},uts4:function(t,e,n){"use strict";n("07d7"),n("SuFq"),n("rB9j"),n("JfAA"),n("UxlC");var r=n("lwsE"),i=n.n(r),a=n("W8MJ"),o=n.n(a),s=n("PJYZ"),c=n.n(s),u=n("7W2i"),l=n.n(u),h=n("a1gu"),f=n.n(h),d=n("Nsbk"),p=n.n(d),v=n("m0x2"),y=n("ry37"),m=n("hWIy"),g=function(){function t(e,n){var r=this;i()(this,t),this.source=e;var a="image"===n.type?new y.a(null,n):new m.a(n);a.provider=this,a.on("stop reset",(function(t){a.hide(),e.updateVisibility()})),"tile"===n.type&&(a.on("load:progress",(function(t){a.showWhenLoading&&e.hide()})).on("play",(function(t){e.hide()})),a.on("advance:image",(function(){}))),this.animation=a,e.on("overlay:ready",(function(){(a instanceof y.a||a instanceof m.a)&&(a.provider=r)}))}
return o()(t,[{key:"animationLayerForDate",value:function(t,e){var n=!(arguments.length>2&&void 0!==arguments[2])||arguments[2];return this.source.animationLayerForDate(t,e,n)}}]),t}
(),k=n("0lfv");function b(t){var e=function(){if("undefined"==typeof Reflect||!Reflect.construct)
return!1;if(Reflect.construct.sham)
return!1;if("function"==typeof Proxy)
return!0;try{return Date.prototype.toString.call(Reflect.construct(Date,[],(function(){}))),!0}catch(t){return!1}}
();return function(){var n,r=p()(t);if(e){var i=p()(this).constructor;n=Reflect.construct(r,arguments,i)}else
n=r.apply(this,arguments);return f()(this,n)}}
var _=function(t){l()(n,t);var e=b(n);function n(t,r,a){var o,s;i()(this,n),(o=e.call(this)).isAnimationFrame=!1,o._hidden=!1,o.key=t,o.enabled=!0,(a=Object(k.extend)({id:void 0,type:"tile",subdomains:["1","2","3","4"],time:0,offset:void 0,opacity:1,future:!1,alwaysShow:!1,animation:{enabled:!0,type:"tile"}},a)).time&&!Object(k.isDate)(a.time)&&Object(k.isNumber)(a.time)&&(a.time=new Date((new Date).getTime()+a.time)),Object(k.isset)(a.offset)&&(a.animation.enabled=!1),Object(k.isset)(r)&&r.offset(0),o.key=t,o._service=r,o._opts=a;var u=a.style||{};if(o._opacity=u.opacity||1,!0===(null===(s=a.animation)||void 0===s?void 0:s.enabled)){var l=Object(k.extend)({key:t,type:"tile",enabled:!0,future:!1,alwaysShow:!1,showWhenStopped:!1},Object(k.pick)(a,["future","alwaysShow"]),a.animation);o._animator=new g(c()(o),l)}
return o.on("overlay:ready",(function(){o.timestamp=o._opts.time})),o._overlay=o.createOverlay(r,a),o.trigger("overlay:ready"),o}
return o()(n,[{key:"urlTemplate",value:function(){if(Object(k.isset)(this._opts.offset))
this.service.offset("".concat(this._opts.offset).replace(/\s/g,""));else{var t=new Date(this._timestamp);t=new Date(t.getTime()+60*t.getTimezoneOffset()*1e3),this.service.offset(Object(k.formatDate)(t,"yyyyMMddHHmm00"))}
return this.service.url()}},{key:"isFuture",value:function(){return this._opts.future}},{key:"updateVisibility",value:function(){this.canShow()?this.show():this.hide()}},{key:"canShow",value:function(){var t=(new Date).getTime(),e=this._timestamp.getTime();return!!this._opts.alwaysShow||(this.isFuture()&&e>t||!this.isFuture()&&e<=t)}},{key:"isAnimationActive",value:function(){return this.animation&&(this.animation.canAnimate()||this.animation.isAnimating())}},{key:"isAnimating",value:function(){return this.animation&&this.animation.isAnimating()}},{key:"show",value:function(){throw new Error("Implementation must override abstract `show`")}},{key:"hide",value:function(){throw new Error("Implementation must override abstract `hide`")}},{key:"remove",value:function(){throw new Error("Implementation must override abstract `remove`")}},{key:"isVisible",value:function(){return!1===this._hidden}},{key:"setOpacity",value:function(t){throw new Error("Implementation must override abstract `setOpacity:`")}},{key:"setOrder",value:function(t){throw new Error("Implementation must override abstract `setOrder:`")}},{key:"destroy",value:function(){this._overlay=null,this._service=null}},{key:"createOverlay",value:function(t){return null}},{key:"animationLayerForDate",value:function(t,e){return null}},{key:"identifier",get:function(){return this._opts.id||this.key},set:function(t){this._opts.id=t}},{key:"url",get:function(){return this.service.url()}},{key:"overlay",get:function(){return this._overlay}},{key:"timestamp",get:function(){return this._timestamp},set:function(t){this._timestamp=t}},{key:"service",get:function(){return this._service}},{key:"animation",get:function(){var t;return null===(t=this._animator)||void 0===t?void 0:t.animation}}]),n}
(v.a);e.a=_},uy83:function(t,e,n){var r=n("0Dky");t.exports=!r((function(){return Object.isExtensible(Object.preventExtensions({}))}))},xfeJ:function(t,e){t.exports=function(t){return-1!==Function.toString.call(t).indexOf("[native code]")}},yyme:function(t,e,n){var r=n("I+eb"),i=n("gdVl"),a=n("RNIs");r({target:"Array",proto:!0},{fill:i}),a("fill")}}]);