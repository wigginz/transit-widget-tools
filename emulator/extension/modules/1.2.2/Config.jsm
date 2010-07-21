var EXPORTED_SYMBOLS = ["Config"];

Components.utils.import("resource://transit-emulator/1.2.2/SecurityManager.jsm");
Components.utils.import("resource://transit-emulator/1.2.2/Exception.jsm");
Components.utils.import("resource://transit-emulator/1.2.2/ExceptionTypes.jsm");

var _Config_122 = Components.classes["@jil.org/jilapi-config;1"].getService(Components.interfaces.jilConfig);

function Config()
{
}

Config.prototype = function()
{
};

Config.prototype.toString = function()
{
  return("Widget.Device.DeviceStateInfo.Config");
};   

Config.prototype.msgRingtoneVolume = _Config_122.msgRingtoneVolume;

Config.prototype.ringtoneVolume = _Config_122.ringtoneVolume;

Config.prototype.vibrationSetting = _Config_122.vibrationSetting;

Config.prototype.setAsWallpaper = function(wallpaperFileUrl)
{
  if ( (wallpaperFileUrl == null) || (wallpaperFileUrl.constructor != String) )
    this.throwIPException("Invalid argument type for wallpaperFileUrl in Config.setAsWallpaper");
  
  SecurityManager.checkSecurity("Set Wallpaper (Config.setAsWallpaper)", SecurityManager.OP_ONE_SHOT, SecurityManager.OP_BLANKET, SecurityManager.OP_BLANKET, function()
  {
    _Config_122.setAsWallpaper(wallpaperFileUrl);
  });
};

Config.prototype.setDefaultRingtone = function(ringtoneFileUrl)
{
  if ( (ringtoneFileUrl == null) || (ringtoneFileUrl.constructor != String) )
    this.throwIPException("Invalid argument type for ringtoneFileUrl in Config.setDefaultRingtone");

  SecurityManager.checkSecurity("Set Default Ringtone (Config.setDefaultRingtone)", SecurityManager.OP_ONE_SHOT, SecurityManager.OP_BLANKET, SecurityManager.OP_BLANKET, function()
  {
    _Config_122.setDefaultRingtone(ringtoneFileUrl);
  });
};

Config.prototype.throwIPException = function(message)
{
  var exc = new Exception();
  exc.message = message;
  exc.type = ExceptionTypes.INVALID_PARAMETER;
  throw(exc);
};