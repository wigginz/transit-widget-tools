var EXPORTED_SYMBOLS = ["PowerInfo"];

var _PowerInfo_122 = Components.classes["@jil.org/jilapi-powerinfo;1"].getService(Components.interfaces.jilPowerInfo);

function PowerInfo()
{
  this.isCharging = _PowerInfo_122.isCharging;
  this.percentRemaining = _PowerInfo_122.percentRemaining;
  
  this.onChargeLevelChange = null;
  this.onChargeStateChange = null;
  this.onLowBattery = null;
}

PowerInfo.prototype = function()
{
};

PowerInfo.prototype.toString = function()
{
  return("Widget.Device.PowerInfo");
};  

PowerInfo.prototype.isCharging = null;

PowerInfo.prototype.percentRemaining = null;

PowerInfo.prototype.onChargeLevelChange = null;

PowerInfo.prototype.onChargeStateChange = null;

PowerInfo.prototype.onLowBattery = null;