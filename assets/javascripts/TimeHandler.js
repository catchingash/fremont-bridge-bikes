function TimeHandler() {
  this.displayTime = $('.time');
  this.displayDate = $('.date');
}

TimeHandler.prototype.update = function(date, iterator) {
  date = new Date(date.getTime() + (iterator * 3600000));

  this.updateTime(date);
  this.updateDate(date);
};

TimeHandler.prototype.updateTime = function(time) {
  var hours = time.getHours();
  if (hours < 12) {
    hours = hours < 1 ? '12 AM' : hours + ' AM';
  } else {
    hours = hours == 12 ? '12 PM' : (hours % 12) + ' PM';
  }
  this.displayTime.text(hours);
}

TimeHandler.prototype.updateDate = function(date) {
  this.displayDate.text(date.toLocaleDateString());
}
