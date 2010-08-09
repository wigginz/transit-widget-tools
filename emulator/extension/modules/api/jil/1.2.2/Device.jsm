var EXPORTED_SYMBOLS = ["Device"];

var _Device_122 = Components.classes["@jil.org/jilapi-device;1"].getService(Components.interfaces.jilDevice);

Components.utils.import("resource://transit-emulator/api/jil/SecurityManager.jsm");
Components.utils.import("resource://transit-emulator/api/jil/1.2.2/AccountInfo.jsm");
Components.utils.import("resource://transit-emulator/api/jil/1.2.2/ApplicationTypes.jsm");
Components.utils.import("resource://transit-emulator/api/jil/1.2.2/DataNetworkInfo.jsm");
Components.utils.import("resource://transit-emulator/api/jil/1.2.2/DeviceInfo.jsm");
Components.utils.import("resource://transit-emulator/api/jil/1.2.2/DeviceStateInfo.jsm");
Components.utils.import("resource://transit-emulator/api/jil/1.2.2/File.jsm");
Components.utils.import("resource://transit-emulator/api/jil/1.2.2/PositionInfo.jsm");
Components.utils.import("resource://transit-emulator/api/jil/1.2.2/PowerInfo.jsm");
Components.utils.import("resource://transit-emulator/api/jil/1.2.2/RadioInfo.jsm");
Components.utils.import("resource://transit-emulator/api/jil/1.2.2/Exception.jsm");
Components.utils.import("resource://transit-emulator/api/jil/1.2.2/ExceptionTypes.jsm");
Components.utils.import("resource://transit-emulator/api/jil/1.2.2/AddressBookItem.jsm");

var device_runtime = Components.classes["@jil.org/jilapi-emulatorruntime;1"].getService().wrappedJSObject;

function Device()
{
  this.DeviceInfo = new DeviceInfo();
  this.AccountInfo = new AccountInfo();
  this.ApplicationTypes = new ApplicationTypes();
  this.DataNetworkInfo = new DataNetworkInfo();
  this.DeviceStateInfo = new DeviceStateInfo();
  this.PowerInfo = new PowerInfo();
  this.RadioInfo = new RadioInfo();
  
  this.clipboardString = _Device_122.clipboardString;
  this.widgetEngineName = _Device_122.widgetEngineName;
  this.widgetEngineProvider = _Device_122.widgetEngineProvider;
  this.widgetEngineVersion = _Device_122.widgetEngineVersion;
  
  this.onFilesFound = null;
}

Device.prototype = function()
{  
}; 

Device.prototype.toString = function()
{
  return("Widget.Device");
};

Device.prototype.AccountInfo = null;

Device.prototype.ApplicationTypes = null;

Device.prototype.DataNetworkInfo = null;

Device.prototype.DeviceInfo = null;

Device.prototype.DeviceStateInfo = null;

Device.prototype.PowerInfo = null;

Device.prototype.RadioInfo = null;

// the isEmulator flag is not part of this spec, but provided in case there's a need
Device.prototype.isEmulator = true;
  
Device.prototype.clipboardString = null;

Device.prototype.widgetEngineName = null;

Device.prototype.widgetEngineProvider = null;

Device.prototype.widgetEngineVersion = null;

Device.prototype.onFilesFound = null;

Device.prototype.copyFile = function(originalFile, destinationFullName)
{
  if ( !device_runtime.checkFeature(SecurityManager.Device_1_1) )
    this.throwSecurityException(SecurityManager.Device_1_1);
  
  var result = null;
  SecurityManager.checkSecurity("Copy File (Device.copyFile)", SecurityManager.OP_ONE_SHOT, SecurityManager.OP_BLANKET, SecurityManager.OP_ALLOWED, function()
  {
    result = _Device_122.copyFile(originalFile, destinationFullName);
  });
  return(result);
};

Device.prototype.deleteFile = function(destinationFullName)
{
  if ( !device_runtime.checkFeature(SecurityManager.Device_1_1) )
    this.throwSecurityException(SecurityManager.Device_1_1);
  
  var result = null;
  SecurityManager.checkSecurity("Delete File (Device.deleteFile)", SecurityManager.OP_ONE_SHOT, SecurityManager.OP_BLANKET, SecurityManager.OP_ALLOWED, function()
  {
    result = _Device_122.deleteFile(destinationFullName);
  });
  return(result);
};

Device.prototype.findFiles = function(matchFile, startInx, endInx)
{
  if ( !device_runtime.checkFeature(SecurityManager.Device_1_1) )
    this.throwSecurityException(SecurityManager.Device_1_1);
  
  SecurityManager.checkSecurity("File Search (Device.findFiles)", SecurityManager.OP_SESSION, SecurityManager.OP_BLANKET, SecurityManager.OP_ALLOWED, function()
  {
    _Device_122.findFiles(matchFile.updateJIL(), startInx, endInx);
  });
};

Device.prototype.getAvailableApplications = function()
{
  if ( !device_runtime.checkFeature(SecurityManager.Device_1_1) )
    this.throwSecurityException(SecurityManager.Device_1_1);
  
  var result = null;
  SecurityManager.checkSecurity("Get Available Applications (Device.getAvailableApplications)", SecurityManager.OP_BLANKET, SecurityManager.OP_ALLOWED, SecurityManager.OP_ALLOWED, function()
  {
    result = _Device_122.getAvailableApplications();
  });
  return(result);
};

Device.prototype.getDirectoryFileNames = function(sourceDirectory)
{
  if ( !device_runtime.checkFeature(SecurityManager.Device_1_1) )
    this.throwSecurityException(SecurityManager.Device_1_1);
  
  var result = null;
  SecurityManager.checkSecurity("List Files in a Folder (Device.getDirectoryFileNames)", SecurityManager.OP_BLANKET, SecurityManager.OP_BLANKET, SecurityManager.OP_ALLOWED, function()
  {
    result = _Device_122.getDirectoryFileNames(sourceDirectory);
  });
  return(result);
};

Device.prototype.getFile = function(fullName)
{
  if ( !device_runtime.checkFeature(SecurityManager.Device_1_1) )
    this.throwSecurityException(SecurityManager.Device_1_1);
  
  var wrappedFile = null;
  SecurityManager.checkSecurity("Access a File (Device.getFile)", SecurityManager.OP_ONE_SHOT, SecurityManager.OP_BLANKET, SecurityManager.OP_ALLOWED, function()
  {
    var jilFile = _Device_122.getFile(fullName);
    
    wrappedFile = new File();
    wrappedFile.setJIL(jilFile);
  });
  return(wrappedFile);
};

Device.prototype.getFileSystemRoots = function()
{
  if ( !device_runtime.checkFeature(SecurityManager.Device_1_1) )
    this.throwSecurityException(SecurityManager.Device_1_1);
  
  var result = null;
  SecurityManager.checkSecurity("List File Systems (Device.getFileSystemRoots)", SecurityManager.OP_BLANKET, SecurityManager.OP_ALLOWED, SecurityManager.OP_ALLOWED, function()
  {
    result = _Device_122.getFileSystemRoots();
  });
  return(result);
};

Device.prototype.getFileSystemSize = function(fileSystemRoot)
{
  if ( !device_runtime.checkFeature(SecurityManager.Device_1_1) )
    this.throwSecurityException(SecurityManager.Device_1_1);
  
  return(_Device_122.getFileSystemSize(fileSystemRoot));
};

Device.prototype.launchApplication = function(application, startParameter)
{
  if ( !device_runtime.checkFeature(SecurityManager.Device_1_1) )
    this.throwSecurityException(SecurityManager.Device_1_1);
  
  SecurityManager.checkSecurity("Launch Application (Device.launchApplication)", SecurityManager.OP_ONE_SHOT, SecurityManager.OP_BLANKET, SecurityManager.OP_ALLOWED, function()
  {
    _Device_122.launchApplication(application, startParameter);
  });
};

Device.prototype.moveFile = function(originalFile, destinationFullName)
{
  if ( !device_runtime.checkFeature(SecurityManager.Device_1_1) )
    this.throwSecurityException(SecurityManager.Device_1_1);
  
  var result = null;
  SecurityManager.checkSecurity("Move File (Device.moveFile)", SecurityManager.OP_ONE_SHOT, SecurityManager.OP_BLANKET, SecurityManager.OP_ALLOWED, function()
  {
    result = _Device_122.moveFile(originalFile, destinationFullName);
  });
  return(result);
};

Device.prototype.setRingtone = function(ringtoneFileUrl, addressBookItem)
{
  if ( !device_runtime.checkFeature(SecurityManager.Device_1_1) )
    this.throwSecurityException(SecurityManager.Device_1_1);
  
  if ( (ringtoneFileUrl == null) || (ringtoneFileUrl.constructor != String) )
    this.throwIPException("Invalid argument type for ringtoneFileUrl in Device.setRingtone");

  if ( (addressBookItem == null) || !(addressBookItem instanceof AddressBookItem) )
    this.throwIPException("Invalid argument type for addressBookItem in Device.setRingtone");

  SecurityManager.checkSecurity("Set Contact Ringtone (Device.setRingtone)", SecurityManager.OP_ONE_SHOT, SecurityManager.OP_BLANKET, SecurityManager.OP_ALLOWED, function()
  {
    _Device_122.setRingtone(ringtoneFileUrl, addressBookItem.updateJIL());
  });
};

Device.prototype.vibrate = function(durationSeconds)
{
  if ( !device_runtime.checkFeature(SecurityManager.Device_1_1) )
    this.throwSecurityException(SecurityManager.Device_1_1);
  
  if ( (durationSeconds == null) || !(durationSeconds > -1) )
    this.throwIPException("Invalid argument type for durationSeconds in Device.vibrate");
  
  _Device_122.vibrate(durationSeconds);
};

Device.prototype.throwIPException = function(message)
{
  var exc = new Exception();
  exc.message = message;
  exc.type = ExceptionTypes.INVALID_PARAMETER;
  throw(exc);
};

Device.prototype.throwSecurityException = function(feature)
{
  var exc = new Exception();
  exc.message = "Feature "+feature+" has not been configured for this widget (check feature tags in config.xml; case sensitive).";
  exc.type = ExceptionTypes.SECURITY;
  throw(exc);
};