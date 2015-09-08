function TimeHandler() {
  this.displayDate = $('.date');
  this.displayTime = $('.time');
}

TimeHandler.prototype.update = function(date) {
  this.updateDate(date);
  this.updateTime(date);
};

TimeHandler.prototype.updateDate = function(date) {
  this.displayDate.text(date.toLocaleDateString());
}

TimeHandler.prototype.updateTime = function(time) {
 this.displayTime.text(time.toLocaleTimeString());
}
