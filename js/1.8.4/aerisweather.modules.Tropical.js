/*!
 * 
 * 	@aerisweather/javascript-sdk - 1.8.4
 * 	(c) 2024 AerisWeather
 * 	License: BSD
 * 	https://www.aerisweather.com/support/docs/toolkits/aeris-js-sdk/
 * 
 */
(this.webpackJsonp=this.webpackJsonp||[]).push([["aerisweather.modules.Tropical"],{"/KVL":function(t,e,n){"use strict";n.r(e);var o=n("j2HP"),i=n("Vaa4"),s=n("WGGG"),a=n("RsGA"),c=n("6yqG"),r=function(t,e,n,o){return new(n||(n=Promise))((function(i,s){function a(t){try{r(o.next(t))}catch(t){s(t)}}function c(t){try{r(o.throw(t))}catch(t){s(t)}}function r(t){var e;t.done?i(t.value):(e=t.value,e instanceof n?e:new n((function(t){t(e)}))).then(a,c)}r((o=o.apply(t,e||[])).next())}))};class u extends o.a{get id(){return"tropical"}load(){return r(this,void 0,void 0,(function*(){const t=yield Object(i.a)(),e=yield Object(s.a)(),n=yield Object(a.a)(),o=yield Object(c.a)();return new Promise(((i,s)=>{this._modules=[t,e,n,o].map((t=>new t.default)),i(this._modules)}))}))}controls(){return{title:"Tropical",buttons:this.modules?this.modules.map((t=>t.controls())):[]}}}e.default=u}}]);