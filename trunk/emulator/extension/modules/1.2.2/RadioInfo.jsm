var EXPORTED_SYMBOLS = ["RadioInfo"];

Components.utils.import("resource://transit-emulator/1.2.2/RadioSignalSourceTypes.jsm");

var _RadioInfo_122a = Components.classes["@jil.org/jilapi-radioinfo;1"].getService(Components.interfaces.jilRadioInfo);

function RadioInfo()
{
}

RadioInfo.prototype = function()
{  
};

RadioInfo.prototype.toString = function()
{
  return("Widget.Device.RadioInfo");
};  

RadioInfo.prototype.RadioSignalSourceTypes = new RadioSignalSourceTypes();

RadioInfo.prototype.isRadioEnabled = _RadioInfo_122a.isRadioEnabled;

RadioInfo.prototype.isRoaming = _RadioInfo_122a.isRoaming;

RadioInfo.prototype.radioSignalSource = _RadioInfo_122a.radioSignalSource;

RadioInfo.prototype.radioSignalStrengthPercent = _RadioInfo_122a.radioSignalStrengthPercent;

RadioInfo.prototype.onSignalSourceChange = null;