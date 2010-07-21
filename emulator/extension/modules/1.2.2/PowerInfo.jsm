var EXPORTED_SYMBOLS = ["PowerInfo"];

var _PowerInfo_122 = Components.classes["@jil.org/jilapi-powerinfo;1"].getService(Components.interfaces.jilPowerInfo);

function PowerInfo()
{
}

PowerInfo.prototype = function()
{
  
};

PowerInfo.prototype.isCharging = _PowerInfo_122.isCharging;

PowerInfo.prototype.percentRemaining = _PowerInfo_122.percentRemaining;

PowerInfo.prototype.onChargeLevelChange = null;

PowerInfo.prototype.onChargeStateChange = null;

PowerInfo.prototype.onLowBattery = null;