

function location0() {
	
	
getParameter = (key) => { 
  
    // Address of the current window 
    address = window.location.search 
  
    // Returns a URLSearchParams object instance 
    parameterList = new URLSearchParams(address) 
  
    // Returning the respected value associated 
    // with the provided key 
    return parameterList.get(key) 
}  

console.log(getParameter("lat"))

var lat = (getParameter("lat"))

 window.location.href = "/wxblox/fmap.html?lat=" + lat; 
	
}	


function location3() {
	
	
getParameter = (key) => { 
  
    // Address of the current window 
    address = window.location.search 
  
    // Returns a URLSearchParams object instance 
    parameterList = new URLSearchParams(address) 
  
    // Returning the respected value associated 
    // with the provided key 
    return parameterList.get(key) 
}  

console.log(getParameter("lat"))

var lat = (getParameter("lat"))

 window.location.href = "/wxblox/fmap2.html?lat=" + lat; 
	
}	


function location4() {
	
	
getParameter = (key) => { 
  
    // Address of the current window 
    address = window.location.search 
  
    // Returns a URLSearchParams object instance 
    parameterList = new URLSearchParams(address) 
  
    // Returning the respected value associated 
    // with the provided key 
    return parameterList.get(key) 
}  

console.log(getParameter("lat"))

var lat = (getParameter("lat"))

 window.location.href = "/wxblox/fmap3.html?lat=" + lat; 
	
}	


function location5() {
	
	
getParameter = (key) => { 
  
    // Address of the current window 
    address = window.location.search 
  
    // Returns a URLSearchParams object instance 
    parameterList = new URLSearchParams(address) 
  
    // Returning the respected value associated 
    // with the provided key 
    return parameterList.get(key) 
}  

console.log(getParameter("lat"))

var lat = (getParameter("lat"))

 window.location.href = "/wxblox/kaos-wx.html?lat=" + lat; 
	
}	


function location6() {
	
	
getParameter = (key) => { 
  
    // Address of the current window 
    address = window.location.search 
  
    // Returns a URLSearchParams object instance 
    parameterList = new URLSearchParams(address) 
  
    // Returning the respected value associated 
    // with the provided key 
    return parameterList.get(key) 
}  

console.log(getParameter("lat"))

var lat = (getParameter("lat"))

 window.location.href = "/wxblox/map.html?lat=" + lat; 
	
}	




function location1() {
	
	
getParameter = (key) => { 
  
    // Address of the current window 
    address = window.location.search 
  
    // Returns a URLSearchParams object instance 
    parameterList = new URLSearchParams(address) 
  
    // Returning the respected value associated 
    // with the provided key 
    return parameterList.get(key) 
}  

console.log(getParameter("lat"))

var lat = (getParameter("lat"))

 window.location.href = "/wxblox/calendar.html?lat=" + lat; 
	
}	


function location2() {
	
	
getParameter = (key) => { 
  
    // Address of the current window 
    address = window.location.search 
  
    // Returns a URLSearchParams object instance 
    parameterList = new URLSearchParams(address) 
  
    // Returning the respected value associated 
    // with the provided key 
    return parameterList.get(key) 
}  

console.log(getParameter("lat"))

var lat = (getParameter("lat"))

 window.location.href = "/wxblox/air.html?lat=" + lat; 
	
}	

function wxapp() {


  
  window.parent.location.href= '/wxblox/geo.html';

}


function airports() {

  localStorage.setItem('loop', 'n');
  CONFIG.loop = false;
  
  window.parent.location.href= 'airports.html';

}


function airports2() {

  localStorage.setItem('loop', 'n');
  CONFIG.loop = false;
  
  window.parent.location.href= 'airports2.html';

}


function zipcodes() {

  localStorage.setItem('loop', 'n');
  CONFIG.loop = false;
  
  window.parent.location.href= 'zipcodes.html';

}

function zipcodes2() {

  localStorage.setItem('loop', 'n');
  CONFIG.loop = false;
  
  window.parent.location.href= 'zipcodes2.html';

}


function radaralerts() {

  localStorage.setItem('loop', 'y');
  CONFIG.loop = true;
  
  window.parent.location.href= 'MOBILE_APP_INTELLISTAR2.html';

}




function radarfull() {

  localStorage.setItem('loop', 'y');
  CONFIG.loop = true;
  
  window.parent.location.href= 'MOBILE_APP_INTELLISTAR1.html';

}


function radarfull2() {

  localStorage.setItem('loop', 'y');
  CONFIG.loop = true;
  
  window.parent.location.href= 'DESKTOP_APP_INTELLISTAR1.html';

}




function radar() {

  localStorage.setItem('loop', 'y');
  CONFIG.loop = true;
  
  window.parent.location.href= 'MOBILE_APP_INTELLISTAR1.html';

}




function nws() {

  localStorage.setItem('loop', 'n');
  CONFIG.loop = false;
  location.href = "mobilefullscrn.html";
}


function fullscreenNWS() {

  localStorage.setItem('loop', 'n');
  CONFIG.loop = false;
  location.href = "nwsalerts.html";
}

function fullscreenNWS2() {

  localStorage.setItem('loop', 'y');
  CONFIG.loop = true;
  location.href = "nwsalerts2.html";
}


function mapbox() {

  localStorage.setItem('loop', 'y');
  CONFIG.loop = true;
  location.href = "mapbox.html";
}




function app() {

  localStorage.setItem('loop', 'y');
  CONFIG.loop = true;
  location.href = "MOBILE_APP_INTELLISTAR.html";

}

function app2() {

  localStorage.setItem('loop', 'y');
  CONFIG.loop = true;
  location.href = "LITE_APP_INTELLISTAR.html";

}



function desktopapp() {

  localStorage.setItem('loop', 'y');
  CONFIG.loop = true;
  location.href = "WX_APP.html";
}


function twc() {

  localStorage.setItem('loop', 'y');
  CONFIG.loop = true;
  location.href = "staticradarX.html";
}



function intellistar() {

  localStorage.setItem('loop', 'n');
  CONFIG.loop = false;

  window.location.reload();
}


function lightning() {


aeris.mapsgl(app, {	version: '1.4.2', }) .then(({controller, mapsgl }) => { controller.addWeatherLayer('lightning-strikes'); });	



}

