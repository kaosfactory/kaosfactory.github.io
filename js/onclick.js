
function airports() {

  localStorage.setItem('loop', 'n');
  CONFIG.loop = false;
  
  window.parent.location.href= 'airports.html';

}



function zipcodes() {

  localStorage.setItem('loop', 'n');
  CONFIG.loop = false;
  
  window.parent.location.href= 'zipcodes.html';

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
  location.href = "fullscrn.html";
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

