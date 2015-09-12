function TimeHandler() {
  this.displayTime = $('.time');
}

TimeHandler.prototype.update = function(date, iterator) {
  date = new Date(date.getTime() + (iterator * 3600000));

  this.updateTime(date);
};

TimeHandler.prototype.updateTime = function(time) {
 this.displayTime.text(time.toLocaleTimeString());
}
