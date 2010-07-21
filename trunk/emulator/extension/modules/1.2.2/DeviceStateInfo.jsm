var EXPORTED_SYMBOLS = ["DeviceStateInfo"];

Components.utils.import("resource://transit-emulator/1.2.2/SecurityManager.jsm");
Components.utils.import("resource://transit-emulator/1.2.2/AccelerometerInfo.jsm");
Components.utils.import("resource://transit-emulator/1.2.2/Config.jsm");

var _DeviceStateInfo_122 = Components.classes["@jil.org/jilapi-devicestateinfo;1"].getService(Components.interfaces.jilDeviceStateInfo);

function DeviceStateInfo()
{
}

DeviceStateInfo.prototype = function()
{
  
};       

DeviceStateInfo.prototype.AccelerometerInfo = new AccelerometerInfo();

DeviceStateInfo.prototype.Config = new Config();

DeviceStateInfo.prototype.onFlipEvent = null;

DeviceStateInfo.prototype.onPositionRetrieved = null;

DeviceStateInfo.prototype.onScreenChangeDimensions = null;

DeviceStateInfo.prototype.audioPath = _DeviceStateInfo_122.audioPath;

DeviceStateInfo.prototype.availableMemory = _DeviceStateInfo_122.availableMemory;

DeviceStateInfo.prototype.backLightOn = _DeviceStateInfo_122.backLightOn;

DeviceStateInfo.prototype.keypadLightOn = _DeviceStateInfo_122.keypadLightOn;

DeviceStateInfo.prototype.language = _DeviceStateInfo_122.language;

DeviceStateInfo.prototype.processorUtilizationPercent = _DeviceStateInfo_122.processorUtilizationPercent;

DeviceStateInfo.prototype.positionMethod = _DeviceStateInfo_122.positionMethod;

DeviceStateInfo.prototype.requestPositionInfo = function(method)
{
  if ( ! this.testPositionInfoMethods(method) )
    Widget.throwIPException("Invalid argument type for method in DeviceStateInfo.requestPositionInfo");
  
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