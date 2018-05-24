
//  method to find current time in 24 hour format
function getTime() {
    var date = new Date();
    var hour = date.getHours();
    hour = (hour < 10 ? "0" : "") + hour;
    var min  = date.getMinutes();
    min = (min < 10 ? "0" : "") + min;
    return hour + ":" + min
};

//  method to find temperature from dht22
var rpiDhtSensor = require('rpi-dht-sensor');
var dht = new rpiDhtSensor.DHT22(18);

function readTemperate() {
  var readout = dht.read();
  temperature = readout.temperature.toFixed(18)
  return temperature
}

function onOffLogic(){
  start_time = "00:00"
  off_time = "17:00"
  temperature_limit = "27.00"
  current_time = getTime()
  if (current_time > start_time && current_time < off_time)
    current_temp = readTemperate()
//    if (current_temp > temperature_limit)
//      console.log(current_temp)
//    else
//      console.log("Temperatue is lower");
  else
    console.log("Time is out off bound");
  setTimeout(read, 5000);
}

