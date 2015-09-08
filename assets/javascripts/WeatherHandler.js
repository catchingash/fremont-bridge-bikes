function WeatherHandler() {
  this.displayImg = $('.weather-icon');
  this.displayDesc = $('.weather-desc');
  this.displayTemp = $('.weather-temp');
  this.displayWind = $('.weather-wind');
}

WeatherHandler.prototype.update = function(api_response) {
  this.updateIcon(api_response['weather'][0]['icon']);
  this.updateDesc(api_response['weather'][0]['description']);
  this.updateTemp(api_response.main.temp);
  this.updateWindSpeed(api_response.wind.speed);
}

WeatherHandler.prototype.updateIcon = function(iconID) {
  this.displayImg.prop('src', 'http://openweathermap.org/img/w/' + iconID + '.png');
}

WeatherHandler.prototype.updateDesc = function(description) {
  this.displayDesc.text(description);
}

WeatherHandler.prototype.updateTemp = function(tmp) {
  this.displayTemp.html(convertK_F(tmp) + '&deg;F'); // needs to be .html because of the unicode char
}

WeatherHandler.prototype.updateWindSpeed = function(speed) {
  this.displayWind.text(speed + ' mph')
}

function convertK_F(K) {
  return Math.round(9/5 * (K - 273) + 32);
}
