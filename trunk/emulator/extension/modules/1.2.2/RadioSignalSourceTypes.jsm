var EXPORTED_SYMBOLS = ["RadioSignalSourceTypes"];

var _RadioSignalSourceTypes_122 = Components.classes["@jil.org/jilapi-radiosignalsourcetypes;1"].createInstance(Components.interfaces.jilRadioSignalSourceTypes);

function RadioSignalSourceTypes()
{
}

RadioSignalSourceTypes.prototype = function()
{
  
};

RadioSignalSourceTypes.prototype.CDMA = _RadioSignalSourceTypes_122.CDMA;

RadioSignalSourceTypes.prototype.GSM = _RadioSignalSourceTypes_122.GSM;

RadioSignalSourceTypes.prototype.LTE = _RadioSignalSourceTypes_122.LTE;

RadioSignalSourceTypes.prototype.TDSCDMA = _RadioSignalSourceTypes_122.TDSCDMA;

RadioSignalSourceTypes.prototype.WCDMA = _RadioSignalSourceTypes_122.WCDMA;