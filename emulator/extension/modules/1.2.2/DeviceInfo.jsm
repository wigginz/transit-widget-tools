var EXPORTED_SYMBOLS = ["DeviceInfo"];

var _DeviceInfo_122 = Components.classes["@jil.org/jilapi-deviceinfo;1"].getService(Components.interfaces.jilDeviceInfo);

function DeviceInfo()
{
}

DeviceInfo.prototype = function()
{
  
}; 

DeviceInfo.prototype.ownerInfo = _DeviceInfo_122.getOwnerInfo(),

DeviceInfo.prototype.phoneColorDepthDefault = _DeviceInfo_122.phoneColorDepthDefault;

DeviceInfo.prototype.phoneFirmware = _DeviceInfo_122.phoneFirmware;

DeviceInfo.prototype.phoneManufacturer = _DeviceInfo_122.phoneManufacturer;

DeviceInfo.prototype.phoneModel = _DeviceInfo_122.phoneModel;

DeviceInfo.prototype.phoneOS = _DeviceInfo_122.phoneOS;

DeviceInfo.prototype.phoneScreenHeightDefault = _DeviceInfo_122.phoneScreenHeightDefault;

DeviceInfo.prototype.phoneScreenWidthDefault = _DeviceInfo_122.phoneScreenWidthDefault;

DeviceInfo.prototype.phoneSoftware = _DeviceInfo_122.phoneSoftware;

DeviceInfo.prototype.totalMemory = _DeviceInfo_122.totalMemory;