/*!
 * 
 * 	@aerisweather/javascript-sdk - 1.8.4
 * 	(c) 2024 AerisWeather
 * 	License: BSD
 * 	https://www.aerisweather.com/support/docs/toolkits/aeris-js-sdk/
 * 
 */
(this.webpackJsonp=this.webpackJsonp||[]).push([["aerisweather.modules.tropical.Invests"],{C7Vp:function(t,e,r){"use strict";r.r(e);var s=r("0lfv"),o=r("/654"),i=r("Lncu");class a extends o.default{get id(){return this.opts.id||"tropical-invests"}source(){return{type:"vector",data:{service:this.account.api().endpoint("tropicalcyclones").action("search").limit(50).filter("invests"),properties:{id:"id",category:"details.stormCat",timestamp:"timestamp",points:["track","forecast"]},formatter:t=>Object(i.formatStormData)(t)},style:{marker:t=>Object(i.getStormMarkerConfig)(t),polygon:t=>({fill:{color:"#ffffff",opacity:.7}}),polyline:t=>{const e=Object(s.get)(t,"details.stormCat");return{stroke:{color:Object(i.color)(e),width:3}}}},animation:{enabled:!0}}}controls(){return{value:this.id,title:"Invests"}}}e.default=a}}]);