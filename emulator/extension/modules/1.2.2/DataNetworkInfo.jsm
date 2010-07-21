var EXPORTED_SYMBOLS = ["DataNetworkInfo"];

Components.utils.import("resource://transit-emulator/1.2.2/DataNetworkConnectionTypes.jsm");
Components.utils.import("resource://transit-emulator/1.2.2/Exception.jsm");
Components.utils.import("resource://transit-emulator/1.2.2/ExceptionTypes.jsm");

var _DataNetworkInfo_122 = Components.classes["@jil.org/jilapi-datanetworkinfo;1"].getService(Components.interfaces.jilDataNetworkInfo);

function DataNetworkInfo()
{
}

DataNetworkInfo.prototype = function()
{  
}; 

DataNetworkInfo.prototype.toString = function()
{
  return("Widget.Device.DataNetworkInfo");
}; 

DataNetworkInfo.prototype.DataNetworkConnectionTypes = new DataNetworkConnectionTypes();

DataNetworkInfo.prototype.isDataNetworkConnected = _DataNetworkInfo_122.isDataNetworkConnected;

DataNetworkInfo.prototype.networkConnectionType = _DataNetworkInfo_122.getNetworkConnectionTypes();

DataNetworkInfo.prototype.onNetworkConnectionChanged = null;

DataNetworkInfo.prototype.getNetworkConnectionName = function(networkConnecionType)
{
  if ( ! this.testDataNetworkConnectionTypes(networkConnecionType) )
    this.throwIPException("Invalid argument type for networkConnecionType in DataNetworkInfo.getNetworkConnectionName");      
  
  return(_DataNetworkInfo_122.getNetworkConnectionName(networkConnecionType));
};

DataNetworkInfo.prototype.testDataNetworkConnectionTypes = function(type)
{
  if ( (type != this.DataNetworkConnectionTypes.BLUETOOTH ) &&
       (type != this.DataNetworkConnectionTypes.EDGE ) &&
       (type != this.DataNetworkConnectionTypes.EVDO ) &&
       (type != this.DataNetworkConnectionTypes.GPRS ) &&
       (type != this.DataNetworkConnectionTypes.IRDA ) &&
       (type != this.DataNetworkConnectionTypes.LTE ) &&
       (type != this.DataNetworkConnectionTypes.ONEXRTT ) &&
       (type != this.DataNetworkConnectionTypes.WIFI )
    )
    return(false);
  else
    return(true);
};

DataNetworkInfo.prototype.throwIPException = function(message)
{
  var exc = new Exception();
  exc.message = message;
  exc.type = ExceptionTypes.INVALID_PARAMETER;
  throw(exc);
};