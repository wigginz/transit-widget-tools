var EXPORTED_SYMBOLS = ["Device"];

var _Device_122 = Components.classes["@jil.org/jilapi-device;1"].getService(Components.interfaces.jilDevice);

Components.utils.import("resource://transit-emulator/api/wac/SecurityManager.jsm");
Components.utils.import("resource://transit-emulator/api/wac/1.0/WidgetCommon.jsm");
Components.utils.import("resource://transit-emulator/api/wac/1.0/ApplicationTypes.jsm");
Components.utils.import("resource://transit-emulator/api/wac/1.0/DeviceStateInfo.jsm");
Components.utils.import("resource://transit-emulator/api/wac/1.0/PositionInfo.jsm");
Components.utils.import("resource://transit-emulator/api/wac/1.0/AddressBookItem.jsm");

function Device()
{
  this.ApplicationTypes = new ApplicationTypes();
  this.DeviceStateInfo = new DeviceStateInfo();
  this.PositionInfo = new PositionInfo();
}

Device.prototype = function()
{  
}; 

Device.prototype.toString = function()
{
  return("Widget.Device");
};

Device.prototype.ApplicationTypes = null;

Device.prototype.DeviceStateInfo = null;

Device.prototype.PositionInfo = null;

// the isEmulator flag is not part of this spec, but provided in case there's a need
Device.prototype.isEmulator = true;

Device.prototype.getAvailableApplications = function()
{
  var result = null;
  SecurityManager.checkSecurity("Get Available Applications (Device.getAvailableApplications)", SecurityManager.OP_BLANKET, SecurityManager.OP_ALLOWED, SecurityManager.OP_ALLOWED, function()
  {
    result = _Device_122.getAvailableApplications();
  });
  return(result);
};

Device.prototype.launchApplication = function(application, startParameter)
{
  SecurityManager.checkSecurity("Launch Application (Device.launchApplication)", SecurityManager.OP_ONE_SHOT, SecurityManager.OP_BLANKET, SecurityManager.OP_ALLOWED, function()
  {
    _Device_122.launchApplication(application, startParameter);
  });
};

Device.prototype.vibrate = function(durationSeconds)
{
  if ( (durationSeconds == null) || !(durationSeconds > -1) )
    WidgetCommon.throwIPException("Invalid argument type for durationSeconds in Device.vibrate");
  
  _Device_122.vibrate(durationSeconds);
};