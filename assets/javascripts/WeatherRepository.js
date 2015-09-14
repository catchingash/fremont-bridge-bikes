function WeatherRepository() {
  this.displayImg = $('.weather-icon');
  this.displayDesc = $('.weather-desc');
  this.displayTemp = $('.weather-temp');
  this.displayWind = $('.weather-wind');
  this.data = {};

  this.BASE_URL = 'http://api.openweathermap.org/data/2.5/history/city?lat=47.65&lon=-122.35&type=hour';
}

WeatherRepository.prototype.fetch = function(date, callback) {
  if (this.data[date]) {
    callback(date, 0);
  } else {
    var url = this.fetchURL(date);

    $.ajax(url, {
      method: 'GET',
      success: function(result) {
        this.recordData(date, result);
        callback(date, 0);
      }.bind(this),
      error: this.handleError
    });
  }
}

WeatherRepository.prototype.fetchURL = function(date) {
  var start = date.getTime()/1000;
  var end = start + 86400; // 86400 seconds/day
  var url = this.BASE_URL + "&start=" + start + "&end=" + end;

  return url;
}

WeatherRepository.prototype.handleError = function(data) {
  alert('Sorry, something went wrong!');
  console.log('Error: data was: ' + data);
}

WeatherRepository.prototype.recordData = function(date, api_response) {
  this.data[date] = [];
  var t0 = date.getTime()/1000 + 1800; // 12:30am
  var allWeather = api_response.list;

  for (var i = 0; i < 24; i++) {
    var targetTime = t0 + (3600 * i); // hourly increments
    var closestWeatherIndex = 0;
    var minDiff = Math.abs(allWeather[0].dt - targetTime);

    for (var j = 1; j < allWeather.length; j++) {
      var diff = Math.abs(allWeather[j].dt - targetTime)
      if (diff < minDiff) {
        closestWeatherIndex = j;
        minDiff = diff;
      }
    }

    var weather = allWeather[closestWeatherIndex];
    var w = {
      icon: weather['weather'][0]['icon'],
      desc: this.formatDesc(weather['weather'][0]['description']),
      temp: weather.main.temp,
      windSpeed: weather.wind.speed
    }
    this.data[date].push(w);
  }
}

WeatherRepository.prototype.update = function(date, i) {
  this.updateIcon(this.data[date][i].icon);
  this.updateDesc(this.data[date][i].desc);
  this.updateTemp(this.data[date][i].temp);
  this.updateWindSpeed(this.data[date][i].windSpeed);
}

WeatherRepository.prototype.updateIcon = function(iconID) {
  this.displayImg.prop('src', 'http://openweathermap.org/img/w/' + iconID + '.png');
}

WeatherRepository.prototype.updateDesc = function(desc) {
  this.displayDesc.text(desc);
}

WeatherRepository.prototype.updateTemp = function(temp) {
  this.displayTemp.html(this._convertK_F(temp) + '&deg;F'); // needs to be .html because of the unicode char
}

WeatherRepository.prototype.updateWindSpeed = function(speed) {
  this.displayWind.text(speed + ' mph');
}

WeatherRepository.prototype.formatDesc = function(desc) {
  desc = desc.split(' ');
  for (var i = 0; i < desc.length; i++) {
    var letter = desc[i][0];
    desc[i] = desc[i].replace(letter, letter.toUpperCase()); // replace will replace the first instance only
  }
  desc = desc.join(' ');

  return desc;
}

WeatherRepository.prototype._convertK_F = function(K) {
  return Math.round(9/5 * (K - 273) + 32);
}
