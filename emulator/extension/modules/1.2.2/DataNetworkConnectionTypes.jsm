var EXPORTED_SYMBOLS = ["DataNetworkConnectionTypes"];

var _DataNetworkConnectionTypes_122 = Components.classes["@jil.org/jilapi-datanetworkconnectiontypes;1"].getService(Components.interfaces.jilDataNetworkConnectionTypes);

function DataNetworkConnectionTypes()
{
}

DataNetworkConnectionTypes.prototype = function()
{  
}; 

DataNetworkConnectionTypes.prototype.toString = function()
{
  return("Widget.Device.DataNetworkInfo.DataNetworkConnectionTypes");
}; 

DataNetworkConnectionTypes.prototype.BLUETOOTH = _DataNetworkConnectionTypes_122.BLUETOOTH;

DataNetworkConnectionTypes.prototype.EDGE = _DataNetworkConnectionTypes_122.EDGE;

DataNetworkConnectionTypes.prototype.EVDO = _DataNetworkConnectionTypes_122.EVDO;

DataNetworkConnectionTypes.prototype.GPRS = _DataNetworkConnectionTypes_122.GPRS;

DataNetworkConnectionTypes.prototype.IRDA = _DataNetworkConnectionTypes_122.IRDA;

DataNetworkConnectionTypes.prototype.LTE = _DataNetworkConnectionTypes_122.LTE;

DataNetworkConnectionTypes.prototype.ONEXRTT = _DataNetworkConnectionTypes_122.ONEXRTT;

DataNetworkConnectionTypes.prototype.WIFI = _DataNetworkConnectionTypes_122.WIFI;