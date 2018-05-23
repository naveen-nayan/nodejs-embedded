function getDateTime() {

    var date = new Date();

    var hour = date.getHours();
    hour = (hour < 10 ? "0" : "") + hour;
    console.log(hour);
    var min  = date.getMinutes();
    console.log(min);
    min = (min < 10 ? "0" : "") + min;

    console.log(hour + ":" + min);

}

getDateTime()
