const SerialPort = require('serialport');
const ModbusMaster = require('modbus-rtu').ModbusMaster;

const serialPort = new SerialPort("/dev/ttyUSB2", {
   baudRate: 9600
});

const master = new ModbusMaster(serialPort);

master.readHoldingRegisters(28, 0, 0).then((data) => {
    console.log(data);
}, (err) => {
});

master.writeSingleRegister(28, 2, 1);