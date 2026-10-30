function guessZipCode(){
  // Skip geolookup until replaced with TWC (wunderground api dead)
  return;

  var zipCodeElement = getElement("zip-code-text");
  // Before filling with auto zip, check and see if
  // there is already an input
  if(zipCodeElement.value != ""){
    return;
  }

  // always use wunderground API for geolookup
  // only valid equivalent is GET v3/location/search
  // TODO: use TWC API GET v3/location/search instead of wunderground geolookup
  fetch(`https://api.wunderground.com/api/${CONFIG.secrets.wundergroundAPIKey}/geolookup/q/autoip.json`)
    .then(function(response) {
      //check for error
      if (response.status !== 200) {
        console.log("zip code request error");
        return;
      }
      response.json().then(function(data) {
        // Only fill zip if the user didn't touch
        // the box while the zip was fetching
        if(zipCodeElement.value == ""){
          zipCodeElement.value = data.location.zip;
        }
      });
    })
}

// ---------- NWS helpers ----------

// Unit helpers
function c2f(c) { return c == null ? null : Math.round(c * 9 / 5 + 32); }
function kmhToMph(v) { return v == null ? null : Math.round(v * 0.621371); }
function paToInHg(pa) { return pa == null ? null : (pa / 3386.389).toFixed(2); }
function paToMbar(pa) { return pa == null ? null : Math.round(pa / 100); }
function metersToMiles(m) { return m == null ? null : Math.round(m * 0.000621371); }
function metersToKm(m) { return m == null ? null : Math.round(m / 1000); }

// NWS gives Celsius for observations; convert to the user's unit system
function dispTemp(c) {
  if (c == null) return null;
  return CONFIG.units === 'm' ? Math.round(c) : c2f(c);
}

function cardinal(deg) {
  if (deg == null) return '';
  const dirs = ['N','NNE','NE','ENE','E','ESE','SE','SSE','S','SSW','SW','WSW','W','WNW','NW','NNW'];
  return dirs[Math.round(deg / 22.5) % 16];
}

// NWS text -> Weather Company icon codes (matches assets/icons/conditions/*.svg)
function nwsIconCode(text, isDay) {
  const t = (text || '').toLowerCase();
  if (t.includes('thunder') || t.includes('t-storm')) return 4;
  if (t.includes('freezing rain')) return 10;
  if (t.includes('sleet')) return 18;
  if (t.includes('snow') && t.includes('rain')) return 5;
  if (t.includes('snow')) return 16;
  if (t.includes('rain') || t.includes('showers') || t.includes('drizzle')) return 12;
  if (t.includes('fog')) return 20;
  if (t.includes('haze') || t.includes('smoke')) return 21;
  if (t.includes('mostly cloudy') || t.includes('mostly overcast')) return isDay ? 28 : 27;
  if (t.includes('partly')) return isDay ? 30 : 29;
  if (t.includes('cloudy') || t.includes('overcast')) return 26;
  if (t.includes('sunny') || t.includes('clear') || t.includes('fair')) return isDay ? 32 : 31;
  if (t.includes('wind')) return 24;
  return 44; // not available
}

function precipLabel(text) {
  const t = (text || '').toLowerCase();
  if (t.includes('snow')) return 'Snow';
  if (t.includes('thunder')) return 'Storms';
  if (t.includes('rain') || t.includes('showers') || t.includes('drizzle')) return 'Rain';
  return 'Precip';
}

function nwsGet(url) {
  return fetch(url).then(function (r) {
    if (!r.ok) throw new Error('NWS ' + r.status + ' for ' + url);
    return r.json();
  });
}

function fetchAlerts(){
  var alertCrawl = "";
  fetch(`https://api.weather.gov/alerts/active?point=${latitude},${longitude}`)
    .then(function(response) {
        if (response.status !== 200) {
            console.warn("Alerts Error, no alerts will be shown");
        }
      response.json().then(function(data) {
        if (data.features == undefined){
          fetchForecast();
          return;
        }
        if (data.features.length == 1) {
          alerts[0] = data.features[0].properties.event + '<br>' + data.features[0].properties.description.replace("..."," ").replace(/\*/g, "")
          for(var i = 0; i < data.features.length; i++){
            /* Take the most important alert message and set it as crawl text
            This will supply more information i.e. tornado warning coverage */
            alertCrawl = alertCrawl + " " + data.features[i].properties.description.replace("...", " ");
          }
        }
        else {
          for(var i = 0; i < data.features.length; i++){
            /* Take the most important alert message and set it as crawl text
            This will supply more information i.e. tornado warning coverage */
            alertCrawl = alertCrawl + " " + data.features[i].properties.description.replace("...", " ");

            alerts[i] = data.features[i].properties.event
          }
        }
        if(alertCrawl != ""){
          CONFIG.crawl = alertCrawl;
        }
        alertsActive = alerts.length > 0;
        fetchForecast();
      });
    })
}

// 4-slot forecast + 7-day outlook, from NWS
function fetchForecast(){
  nwsGet(nwsForecastUrl)
    .then(function (data) {
      const periods = data.properties.periods;
      const isMetric = CONFIG.units === 'm';
      // NWS forecast temperatures are Fahrenheit by default
      const disp = function (f) {
        if (f == null) return null;
        return isMetric ? Math.round((f - 32) * 5 / 9) : f;
      };

      isDay = periods[0].isDaytime;

      // Short-range slots: today / tonight / tomorrow / tomorrow night
      for (let i = 0; i <= 3; i++) {
        const p = periods[i];
        if (!p) continue;
        forecastTemp[i] = disp(p.temperature);
        forecastIcon[i] = nwsIconCode(p.shortForecast, p.isDaytime);
        forecastNarrative[i] = p.shortForecast;
        const pop = (p.probabilityOfPrecipitation && p.probabilityOfPrecipitation.value) || 0;
        forecastPrecip[i] = `${pop}% Chance<br/> of ${precipLabel(p.shortForecast)}`;
      }

      // Group NWS periods into days: each daytime period plus the night after it
      const days = [];
      periods.forEach(function (p, idx) {
        if (p.isDaytime) {
          const next = periods[idx + 1];
          days.push({ day: p, night: (next && !next.isDaytime) ? next : null });
        }
      });

      // 7-day outlook starts tomorrow. If the first period is daytime, that's today, so skip it.
      const offset = periods[0].isDaytime ? 1 : 0;
      for (let i = 0; i < 7; i++) {
        const d = days[offset + i];
        if (!d) continue;
        outlookHigh[i] = disp(d.day.temperature);
        outlookLow[i] = d.night ? disp(d.night.temperature) : null;
        outlookCondition[i] = d.day.shortForecast
          .split(' ').join('<br/>')
          .replace("Thunderstorm", "Thunder</br>storm");
        outlookIcon[i] = nwsIconCode(d.day.shortForecast, true);
      }

      fetchRadarImages();
    })
    .catch(function (err) {
      console.error(err);
    });
}

// Current conditions and location, from NWS
function fetchCurrentWeather(){
  if (CONFIG.locationMode == "AIRPORT") {
    alert("Airport mode is not supported on the NWS version yet. Use a postal code.");
    return;
  }
  if (CONFIG.locationMode != "POSTAL") {
    alert("Please select a location type");
    return;
  }

  const cc = (CONFIG.countryCode || 'US').toLowerCase();
  fetch(`https://api.zippopotam.us/${cc}/${zipCode}`)
    .then(function (response) {
      if (response.status == 404) {
        alert("Location not found!");
        throw new Error('postal code not found: ' + zipCode);
      }
      if (!response.ok) {
        alert("Something went wrong (check the console)");
        throw new Error('postal lookup ' + response.status);
      }
      return response.json();
    })
    .then(function (data) {
      const place = data.places[0];
      latitude = parseFloat(place.latitude);
      longitude = parseFloat(place.longitude);
      cityName = place['place name'].toUpperCase();
      return nwsGet(`https://api.weather.gov/points/${latitude},${longitude}`);
    })
    .then(function (point) {
      nwsForecastUrl = point.properties.forecast;
      return nwsGet(point.properties.observationStations);
    })
    .then(function (stations) {
      // First station in the list is the closest one
      return nwsGet(stations.features[0].id + '/observations/latest');
    })
    .then(function (obs) {
      const p = obs.properties;
      const isMetric = CONFIG.units === 'm';
      const isDay = !((p.icon || '').includes('/night/'));

      currentTemperature = dispTemp(p.temperature.value);
      currentCondition = p.textDescription || '';

      const spd = p.windSpeed.value;
      const gust = p.windGust.value;
      const spdDisp = spd == null ? 0 : (isMetric ? Math.round(spd) : kmhToMph(spd));
      windSpeed = `${cardinal(p.windDirection.value)} ${spdDisp} ${isMetric ? 'km/h' : 'mph'}`;
      gusts = gust == null ? 'NONE' : (isMetric ? Math.round(gust) : kmhToMph(gust));

      // NWS gives heat index or wind chill only when relevant; fall back to air temp
      const feels = p.heatIndex.value != null ? p.heatIndex.value
                  : (p.windChill.value != null ? p.windChill.value : p.temperature.value);
      feelsLike = dispTemp(feels);

      visibility = isMetric ? metersToKm(p.visibility.value) : metersToMiles(p.visibility.value);
      humidity = p.relativeHumidity.value == null ? null : Math.round(p.relativeHumidity.value);
      dewPoint = dispTemp(p.dewpoint.value);
      pressure = isMetric ? paToMbar(p.barometricPressure.value) : paToInHg(p.barometricPressure.value);
      pressureTrend = ''; // NWS observations have no pressure trend
      currentIcon = nwsIconCode(p.textDescription, isDay);

      fetchAlerts();
    })
    .catch(function (err) {
      console.error(err);
    });
}

function fetchRadarImages(){
  radarImage = document.createElement("iframe");
  radarImage.onerror = function () {
    getElement('radar-container').style.display = 'none';
  }

  mapSettings = btoa(JSON.stringify({
    "agenda": {
      "id": "weather",
      "center": [longitude, latitude],
      "location": null,
      "zoom": 8
    },
    "animating": true,
    "base": "standard",
    "artcc": false,
    "county": false,
    "cwa": false,
    "rfc": false,
    "state": false,
    "menu": false,
    "shortFusedOnly": false,
    "opacity": {
      "alerts": 0.0,
      "local": 0.0,
      "localStations": 0.0,
      "national": 0.6
    }
  }));
  
  radarImage.setAttribute("src", "https://kaosfactor.github.io/radar/radar.html");
  radarImage.style.width = "1239px"
  radarImage.style.height = "1200px"
  radarImage.style.marginTop = "-670px"
  radarImage.style.overflow = "hidden"




  //radarImage.setAttribute("src", "https://radar.weather.gov/?settings=v1_" + mapSettings);
  //radarImage.style.width = "1230px"
  //radarImage.style.height = "740px"
  //radarImage.style.marginTop = "-220px"
  //radarImage.style.overflow = "hidden"
  
  if(alertsActive){
    zoomedRadarImage = new Image();
    zoomedRadarImage.onerror = function () {
      getElement('zoomed-radar-container').style.display = 'none';
    }

    zoomedRadarImage = document.createElement("iframe");
    zoomedRadarImage.onerror = function () {
      getElement('zoomed-radar-container').style.display = 'none';
    }
  
    mapSettings = btoa(JSON.stringify({
      "agenda": {
        "id": "weather",
        "center": [longitude, latitude],
        "location": null,
        "zoom": 10
      },
      "animating": true,
      "base": "standard",
      "artcc": false,
      "county": false,
      "cwa": false,
      "rfc": false,
      "state": false,
      "menu": false,
      "shortFusedOnly": false,
      "opacity": {
        "alerts": 0.0,
        "local": 0.0,
        "localStations": 0.0,
        "national": 0.6
      }
    }));
    
   zoomedRadarImage.setAttribute("src", "https://kaosfactor.github.io/radar/radar1.html");
   zoomedRadarImage.style.width = "1239px"
   zoomedRadarImage.style.height = "1200px"
   zoomedRadarImage.style.marginTop = "-370px"
   zoomedRadarImage.style.overflow = "hidden"



    //zoomedRadarImage.setAttribute("src", "https://radar.weather.gov/?settings=v1_" + mapSettings);
    //zoomedRadarImage.style.width = "1230px"
    //zoomedRadarImage.style.height = "740px"
    //zoomedRadarImage.style.marginTop = "-220px"
    //zoomedRadarImage.style.overflow = "hidden"

  }

  scheduleTimeline();
 
}
