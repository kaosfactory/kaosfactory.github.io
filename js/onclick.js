
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
  
  window.parent.location.href= 'trimble.html';

}




function radarfull() {

  localStorage.setItem('loop', 'y');
  CONFIG.loop = true;
  
  window.parent.location.href= 'mapbox.html';

}






function nws() {

  localStorage.setItem('loop', 'n');
  CONFIG.loop = false;
  location.href = "mobilefullscrn.html";
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



