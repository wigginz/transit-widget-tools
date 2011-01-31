var EXPORTED_SYMBOLS = ["DeviceInfo"];

var _DeviceInfo_122 = Components.classes["@jil.org/jilapi-deviceinfo;1"].getService(Components.interfaces.jilDeviceInfo);

Components.utils.import("resource://transit-runtime/api/jil/1.1r4/AddressBookItem.jsm");

function DeviceInfo()
{
  var oInfo = _DeviceInfo_122.getOwnerInfo();
  this.ownerInfo = new AddressBookItem();
  this.ownerInfo.setJIL(oInfo);
  
  this.phoneColorDepthDefault = _DeviceInfo_122.phoneColorDepthDefault;
  this.phoneFirmware = _DeviceInfo_122.phoneFirmware;
  this.phoneManufacturer = _DeviceInfo_122.phoneManufacturer;
  this.phoneModel = _DeviceInfo_122.phoneModel;
  this.phoneOS = _DeviceInfo_122.phoneOS;
  this.phoneScreenHeightDefault = _DeviceInfo_122.phoneScreenHeightDefault;
  this.phoneScreenWidthDefault = _DeviceInfo_122.phoneScreenWidthDefault;
  this.phoneSoftware = _DeviceInfo_122.phoneSoftware;
  this.totalMemory = _DeviceInfo_122.totalMemory;
}

DeviceInfo.prototype = function()
{
}; 

DeviceInfo.prototype.toString = function()
{
  return("Widget.Device.DeviceInfo");
}; 

DeviceInfo.prototype.ownerInfo = null;

DeviceInfo.prototype.phoneColorDepthDefault = null;

DeviceInfo.prototype.phoneFirmware = null;

DeviceInfo.prototype.phoneManufacturer = null;

DeviceInfo.prototype.phoneModel = null;

DeviceInfo.prototype.phoneOS = null;

DeviceInfo.prototype.phoneScreenHeightDefault = null;

DeviceInfo.prototype.phoneScreenWidthDefault = null;

DeviceInfo.prototype.phoneSoftware = null;

DeviceInfo.prototype.totalMemory = null;