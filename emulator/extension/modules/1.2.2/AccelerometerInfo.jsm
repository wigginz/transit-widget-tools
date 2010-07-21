var EXPORTED_SYMBOLS = ["AccelerometerInfo"];

var _AccelerometerInfo_122 = Components.classes["@jil.org/jilapi-accelerometerinfo;1"].createInstance(Components.interfaces.jilAccelerometerInfo);

function AccelerometerInfo()
{
}

AccelerometerInfo.prototype = function()
{
  
};   

AccelerometerInfo.prototype.xAxis = _AccelerometerInfo_122.xAxis;

AccelerometerInfo.prototype.yAxis = _AccelerometerInfo_122.yAxis;

AccelerometerInfo.prototype.zAxis = _AccelerometerInfo_122.zAxis;