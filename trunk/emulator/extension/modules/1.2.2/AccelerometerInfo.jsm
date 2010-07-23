var EXPORTED_SYMBOLS = ["AccelerometerInfo"];

var _AccelerometerInfo_122 = Components.classes["@jil.org/jilapi-accelerometerinfo;1"].createInstance(Components.interfaces.jilAccelerometerInfo);

function AccelerometerInfo()
{
  this.xAxis = _AccelerometerInfo_122.xAxis;
  this.yAxis = _AccelerometerInfo_122.yAxis;
  this.zAxis = _AccelerometerInfo_122.zAxis;
}

AccelerometerInfo.prototype = function()
{  
};   

AccelerometerInfo.prototype.toString = function()
{
  return("Widget.Device.DeviceStateInfo.AccelerometerInfo");
};

AccelerometerInfo.prototype.xAxis = null;

AccelerometerInfo.prototype.yAxis = null;

AccelerometerInfo.prototype.zAxis = null;