function BikeRepository() {
  this.BIKE_DIV = $(".bike-traffic");
  this.BASE_URL = "https://data.seattle.gov/resource/65db-xm6k.json?";
  this.data = {};
}

BikeRepository.prototype.fetch = function(date, callback) {
  if (this.data[date]) {
    callback(this.data[date], 0);
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

BikeRepository.prototype.fetchURL = function(date) {
  var d1 = date.getFullYear() + '-' + this._to2Digits(date.getMonth() + 1) + '-' + this._to2Digits(date.getDate());
  var d2 = date.getFullYear() + '-' + this._to2Digits(date.getMonth() + 1) + '-' + this._to2Digits(date.getDate() + 1);
  var url = this.BASE_URL + "$where=date >= '" + d1 +  "T00:00:00' and date < '" + d2 + "T00:00:00'";
  return url;
}

BikeRepository.prototype.handleError = function(data) {
  alert('Sorry, something went wrong!');
  console.log('Error: data was: ' + data);
}

BikeRepository.prototype.recordData = function(date, api_response) {
  if (api_response.length == 24) {
    this.data[date] = api_response;
  }
  else {
    // Not sure how to handle this right now. If < 24, missing data. If > 24, extra data.
    this.handleError(api_response);
  }
}

BikeRepository.prototype._to2Digits = function(num) {
  num = num.toString(); // this is necessary for num.length to work properly
  while (num.length < 2) { num = '0' + num; }
  return num;
}

BikeRepository.prototype.update = function(date, i) {
  var nbNum = this.data[date][i]['fremont_bridge_nb'];
  var sbNum = this.data[date][i]['fremont_bridge_sb'];
  this.animateNBBikes(nbNum, 0);
  this.animateSBBikes(sbNum, 0);

  $('.nb-rate').text(nbNum);
  $('.sb-rate').text(sbNum);
}

BikeRepository.prototype.animateNBBikes = function(num, iterator) {
  if (num < 1) { return; }

  var bike = $('<img src="assets/images/bike.svg" class="bike-small bike-nb">');
  bike.on('animationend', function() { $(this).remove(); });
  this.BIKE_DIV.append(bike);

  var scaledNum = num / bikeScale;
  if (iterator < (scaledNum - 1)) {
    setTimeout(this.animateNBBikes.bind(this), HOUR_LENGTH/scaledNum, num, iterator + 1)
  }
}

BikeRepository.prototype.animateSBBikes = function(num, iterator) {
  if (num < 1) { return; }

  var scaledNum = num / bikeScale;
  var bike = $('<img src="assets/images/bike.svg" class="bike-small bike-sb">');
  bike.on('animationend', function() { $(this).remove(); });
  this.BIKE_DIV.append(bike);

  var scaledNum = num / bikeScale;
  if (iterator < (scaledNum - 1)) {
    setTimeout(this.animateSBBikes.bind(this), HOUR_LENGTH/scaledNum, num, iterator + 1)
  }
}
