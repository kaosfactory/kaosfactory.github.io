/*!
 * 
 * 	@aerisweather/javascript-sdk - 1.8.4
 * 	(c) 2024 AerisWeather
 * 	License: BSD
 * 	https://www.aerisweather.com/support/docs/toolkits/aeris-js-sdk/
 * 
 */
(this.webpackJsonp=this.webpackJsonp||[]).push([["aerisweather.modules.tropical.Windfields"],{Xi3S:function(i,e,t){"use strict";t.r(e);var d=t("at9D"),n=t("0lfv");const r={34:"#ffff00",50:"#FFA500",64:"#FF0000"};class c extends d.a{get id(){return this.opts.id||"tropical-windfields-current"}source(){return{type:"vector",data:{service:this.account.api().endpoint("tropicalcyclones").action("search").fields("id,position.details.windRadii,forecast.details.windRadii").filter("windfield"),properties:{id:"id",category:"windSpeedKTS",path:"windField"},formatter:i=>{const e=[];return Object(n.isArray)(i)&&i.forEach((i=>{const{id:t,position:d,forecast:r}=i;let c=Object(n.get)(d,"details.windRadii")||[];r&&Object(n.isArray)(r)&&r.forEach((i=>{const e=Object(n.get)(i,"details.windRadii");e&&(c=c.concat(e))})),Object(n.isArray)(c)&&c.forEach((i=>{if(i.windField){const d={id:"".concat(t,"_").concat(e.length),windSpeedKTS:i.windSpeedKTS,windSpeedMPH:i.windSpeedMPH,windField:i.windField};e.push(d)}}))})),e}},style:{polygon:i=>{return i&&i.windSpeedKTS?{fill:{color:(e=i.windSpeedKTS,r[e]||"#000000"),opacity:.85}}:null;var e}}}}controls(){return{value:this.id,title:"Windfields"}}legend(){return{title:"Tropical Windfields",code:"tropical-windfields"}}}e.default=c}}]);