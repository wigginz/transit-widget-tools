var EXPORTED_SYMBOLS = ["DeviceStateInfo"];

Components.utils.import("resource://transit-emulator/api/jil/SecurityManager.jsm");

Components.utils.import("resource://transit-emulator/api/jil/1.1r4/AccelerometerInfo.jsm");
Components.utils.import("resource://transit-emulator/api/jil/1.1r4/Config.jsm");

var _DeviceStateInfo_122 = Components.classes["@jil.org/jilapi-devicestateinfo;1"].getService(Components.interfaces.jilDeviceStateInfo);

function DeviceStateInfo()
{
  this.AccelerometerInfo = new AccelerometerInfo();
  this.Config = new Config();

  this.audioPath = _DeviceStateInfo_122.audioPath;
  this.availableMemory = _DeviceStateInfo_122.availableMemory;
  this.backLightOn = _DeviceStateInfo_122.backLightOn;
  this.keypadLightOn = _DeviceStateInfo_122.keypadLightOn;
  this.language = _DeviceStateInfo_122.language;
  this.processorUtilizationPercent = _DeviceStateInfo_122.processorUtilizationPercent;
  
  this.onPositionRetrieved = null;
  this.onScreenChangeDimensions = null;
}

DeviceStateInfo.prototype = function()
{  
};      

DeviceStateInfo.prototype.toString = function()
{
  return("Widget.Device.DeviceStateInfo");
};  

DeviceStateInfo.prototype.AccelerometerInfo = null;

DeviceStateInfo.prototype.Config = null;

DeviceStateInfo.prototype.onFlipEvent = null;

DeviceStateInfo.prototype.onPositionRetrieved = null;

DeviceStateInfo.prototype.onScreenChangeDimensions = null;

DeviceStateInfo.prototype.audioPath = null;

DeviceStateInfo.prototype.availableMemory = null;

DeviceStateInfo.prototype.backLightOn = null;

DeviceStateInfo.prototype.keypadLightOn = null;

DeviceStateInfo.prototype.language = null;

DeviceStateInfo.prototype.processorUtilizationPercent = null;

DeviceStateInfo.prototype.requestPositionInfo = function(method)
{
  if ( ! this.testPositionInfoMethods(method) )
    this.throwIPException("Invalid argument type for method in DeviceStateInfo.requestPositionInfo");
  
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

DeviceStateInfo.prototype.throwIPException = function(message)
{
//   var exc = new Exception();
//   exc.message = message;
//   exc.type = ExceptionTypes.INVALID_PARAMETER;
//   throw(exc);
};