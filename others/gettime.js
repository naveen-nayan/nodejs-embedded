
var current_time = function getDateTime() {

    var date = new Date();
    var hour = date.getHours();
    hour = (hour < 10 ? "0" : "") + hour;
    var min  = date.getMinutes();
    min = (min < 10 ? "0" : "") + min;
    return hour + ":" + min
};

//var current_time = getDateTime()
console.log(current_time)

