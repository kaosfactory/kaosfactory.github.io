  console.log("Getting Geolocation");
  // load data and render the view for a specific location
  navigator.geolocation.getCurrentPosition(pos => {
    console.log(`Showing weather for lat ${pos.coords.latitude}, long ${pos.coords.longitude}`);


    view3.load({
      p: `${pos.coords.latitude}, ${pos.coords.longitude}`
    });


    view2.load({
      //p: `${pos.coords.latitude}, ${pos.coords.longitude}`
	  p: 'lake shore,md'
    });



    view1.load({
      //p: `${pos.coords.latitude}, ${pos.coords.longitude}`
	  p: 'lake shore,md'
    });


    view.load({
      //p: `${pos.coords.latitude}, ${pos.coords.longitude}`
	  p: 'lake shore,md'
    });


	 //window.location.href = "https://api.weatherphrase.com/stream/summary/" + pos.coords.latitude + "," + pos.coords.longitude + "?client_id=wgE96YE3scTQLKjnqiMsv&client_secret=SVG2gQFV8y9DjKR0BRY9wPoSLvrMrIqF9Lq2IYaY&metric=false&limit=3"; 

document.getElementById("myP").outerHTML = '<div class="awxb-view"  data-name="" data-lat= ' + pos.coords.latitude + ' data-lon= ' + pos.coords.longitude + ' >LOADED</div>'
	
  }, err => console.log(`Geolocation error: ${err.message}`));