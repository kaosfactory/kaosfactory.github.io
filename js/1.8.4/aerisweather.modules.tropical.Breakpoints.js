/*!
 * 
 * 	@aerisweather/javascript-sdk - 1.8.4
 * 	(c) 2024 AerisWeather
 * 	License: BSD
 * 	https://www.aerisweather.com/support/docs/toolkits/aeris-js-sdk/
 * 
 */
(this.webpackJsonp=this.webpackJsonp||[]).push([["aerisweather.modules.tropical.Breakpoints"],{sAua:function(e,t,r){"use strict";r.r(t);var o=r("at9D"),a=r("0lfv");const s=e=>{switch(e=(e||"").toUpperCase()){case"TR.A":return"#ffe401";case"TR.W":return"#ff9000";case"HU.A":return"#ff00d2";case"HU.W":return"#ff0017";default:return"#000000"}};class i extends o.a{get id(){return this.opts.id||"tropical-breakpoints"}source(){return{type:"vector",data:{request:{endpoint:"tropicalcyclones",action:":id",parameters:{filter:"geo",fields:"id,profile,breakPointAlerts",limit:50}},properties:{id:"id",category:"[path].alertType",path:"breakPointAlerts"},formatter:e=>((Object(a.isArray)(e)?e:[e]).forEach((e=>{const t={};(e.breakPointAlerts||[]).forEach((e=>{const r=e.alertType;t[r]||(t[r]=[]),t[r].push(e.coords.coordinates)}));const r=[];Object.keys(t).forEach((o=>{r.push({type:"Feature",properties:{id:"".concat(e.id,"-").concat(o),alertType:o},geometry:{type:"MultiLineString",coordinates:t[o]}})})),e.breakPointAlerts=r})),e)},style:{polyline:e=>{const t=Object(a.get)(e,"alertType");return{stroke:{color:s(t),width:6}}}}}}controls(){return{value:this.id,title:"Breakpoints"}}legend(){return{title:"Tropical Breakpoints",code:"tropical-breakpoints"}}}t.default=i}}]);