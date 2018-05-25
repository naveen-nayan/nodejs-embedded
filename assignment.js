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

function readTemperature() {
  var readout = dht.read();
  temperature = readout.temperature.toFixed(2)
  return temperature
};

// modbus configured assumed on USB0 and baud 9600
const SerialPort = require('serialport');
const ModbusMaster = require('modbus-rtu').ModbusMaster;

const serialPort = new SerialPort("/dev/ttyUSB0", {
   baudRate: 9600
});
const master = new ModbusMaster(serialPort);


function onOffLogic(){
  start_time = "10:00"
  off_time = "17:00"
  temperature_limit = "27.00"
  current_time = getTime()
  if (current_time > start_time && current_time < off_time){
    current_temp = readTemperature()
    if (current_temp > temperature_limit)
      console.log("Current Temperature :" + current_temp + "C")

      master.readHoldingRegisters(28, 0, 0).then((data) => {
      var reg_data = data;
      if (reg_data[0] == "0")
         master.writeSingleRegister(28, 0, 1);
        }, (err) => {
        });
    else
      console.log("Temperatue is lower than 27.00");
      master.readHoldingRegisters(28, 0, 0).then((data) => {
      var reg_data = data;
      if (reg_data[0] == "1")
         master.writeSingleRegister(28, 0, 0);
   }
  else
    console.log("Time is out off bound");
  setTimeout(onOffLogic, 5000);
};


onOffLogic();
