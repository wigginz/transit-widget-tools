var EXPORTED_SYMBOLS = ["RadioInfo"];

Components.utils.import("resource://transit-emulator/1.2.2/RadioSignalSourceTypes.jsm");

var _RadioInfo_122a = Components.classes["@jil.org/jilapi-radioinfo;1"].getService(Components.interfaces.jilRadioInfo);

function RadioInfo()
{
  this.isRadioEnabled = _RadioInfo_122a.isRadioEnabled;
  this.isRoaming = _RadioInfo_122a.isRoaming;
  this.radioSignalSource = _RadioInfo_122a.radioSignalSource;
  this.radioSignalStrengthPercent = _RadioInfo_122a.radioSignalStrengthPercent;
  
  this.onSignalSourceChange = null;
}

RadioInfo.prototype = function()
{  
};

RadioInfo.prototype.toString = function()
{
  return("Widget.Device.RadioInfo");
};  

RadioInfo.prototype.RadioSignalSourceTypes = new RadioSignalSourceTypes();

RadioInfo.prototype.isRadioEnabled = null;

RadioInfo.prototype.isRoaming = null;

RadioInfo.prototype.radioSignalSource = null;

RadioInfo.prototype.radioSignalStrengthPercent = null;

RadioInfo.prototype.onSignalSourceChange = null;