var EXPORTED_SYMBOLS = ["PositionInfo"];

function PositionInfo()
{
}

PositionInfo.prototype = function()
{
};

PositionInfo.prototype.toString = function()
{
  return("Widget.Device.PositionInfo");
};  

PositionInfo.prototype._jilPositionInfo = null;

PositionInfo.prototype.accuracy = null;

PositionInfo.prototype.altitude = null;

PositionInfo.prototype.altitudeAccuracy = null;

PositionInfo.prototype.cellID = null;

PositionInfo.prototype.latitude = null;

PositionInfo.prototype.longitude = null;

PositionInfo.prototype.timeStamp = null;

PositionInfo.prototype.setJIL = function(jilPositionInfo)
{
  this.accuracy = jilPositionInfo.accuracy;
  this.altitude = jilPositionInfo.altitude;
  this.altitudeAccuracy = jilPositionInfo.altitudeAccuracy;
  this.cellID = jilPositionInfo.cellID;
  this.latitude = jilPositionInfo.latitude;
  this.longitude = jilPositionInfo.longitude;
  this.timeStamp = jilPositionInfo.timeStamp;
  this._jilPositionInfo = jilPositionInfo;
};

PositionInfo.prototype.updateJIL = function()
{
  this._jilPositionInfo.accuracy = this.accuracy;
  this._jilPositionInfo.altitude = this.altitude;
  this._jilPositionInfo.altitudeAccuracy = this.altitudeAccuracy;
  this._jilPositionInfo.cellID = this.cellID;
  this._jilPositionInfo.latitude = this.latitude;
  this._jilPositionInfo.longitude = this.longitude;
  this._jilPositionInfo.timeStamp = this.timeStamp;
  return(this._jilPositionInfo);
};