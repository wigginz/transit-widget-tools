var EXPORTED_SYMBOLS = ["DeviceStateInfo"];

Components.utils.import("resource://transit-runtime/api/wac/SecurityManager.jsm");
Components.utils.import("resource://transit-runtime/api/wac/1.0/WidgetCommon.jsm");
Components.utils.import("resource://transit-runtime/api/wac/1.0/AccelerometerInfo.jsm");

var _DeviceStateInfo_122 = Components.classes["@jil.org/jilapi-devicestateinfo;1"].getService(Components.interfaces.jilDeviceStateInfo);

function DeviceStateInfo()
{
  this.AccelerometerInfo = new AccelerometerInfo();
  
  this.onPositionRetrieved = null;
}

DeviceStateInfo.prototype = function()
{  
};      

DeviceStateInfo.prototype.toString = function()
{
  return("Widget.Device.DeviceStateInfo");
};  

DeviceStateInfo.prototype.AccelerometerInfo = null;

DeviceStateInfo.prototype.onPositionRetrieved = null;

DeviceStateInfo.prototype.requestPositionInfo = function(method)
{
  if ( ! this.testPositionInfoMethods(method) )
    WidgetCommon.throwIPException("Invalid argument type for method in DeviceStateInfo.requestPositionInfo");
  
  SecurityManager.checkSecurity("Determine Location (DeviceStateInfo.requestPositionInfo)", SecurityManager.OP_ONE_SHOT, SecurityManager.OP_SESSION, SecurityManager.OP_ALLOWED, function()
  {
    _DeviceStateInfo_122.requestPositionInfo(method);
  });
};

DeviceStateInfo.prototype.testPositionInfoMethods = function(type)
{
  if ( (type != "cellid" ) &&
       (type != "gps" ) &&
       (type != "agps" )
    )
    return(false);
  else
    return(true);
};