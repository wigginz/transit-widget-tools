var EXPORTED_SYMBOLS = ["Config"];

Components.utils.import("resource://transit-emulator/api/jil/SecurityManager.jsm");

var _Config_122 = Components.classes["@jil.org/jilapi-config;1"].getService(Components.interfaces.jilConfig);

function Config()
{
  this.msgRingtoneVolume = _Config_122.msgRingtoneVolume;
  this.ringtoneVolume = _Config_122.ringtoneVolume;
  this.vibrationSetting = _Config_122.vibrationSetting;
}

Config.prototype = function()
{
};

Config.prototype.toString = function()
{
  return("Widget.Device.DeviceStateInfo.Config");
};   

Config.prototype.msgRingtoneVolume = null;

Config.prototype.ringtoneVolume = null;

Config.prototype.vibrationSetting = null;

Config.prototype.setAsWallpaper = function(wallpaperFileUrl)
{
  if ( (wallpaperFileUrl == null) || (wallpaperFileUrl.constructor != String) )
    this.throwIPException("Invalid argument type for wallpaperFileUrl in Config.setAsWallpaper");
  
  SecurityManager.checkSecurity("Set Wallpaper (Config.setAsWallpaper)", SecurityManager.OP_SESSION, SecurityManager.OP_ALLOWED, SecurityManager.OP_ALLOWED, function()
  {
    _Config_122.setAsWallpaper(wallpaperFileUrl);
  });
};

Config.prototype.setDefaultRingtone = function(ringtoneFileUrl)
{
  if ( (ringtoneFileUrl == null) || (ringtoneFileUrl.constructor != String) )
    this.throwIPException("Invalid argument type for ringtoneFileUrl in Config.setDefaultRingtone");

  SecurityManager.checkSecurity("Set Default Ringtone (Config.setDefaultRingtone)", SecurityManager.OP_SESSION, SecurityManager.OP_ALLOWED, SecurityManager.OP_ALLOWED, function()
  {
    _Config_122.setDefaultRingtone(ringtoneFileUrl);
  });
};

Config.prototype.throwIPException = function(message)
{
//   var exc = new Exception();
//   exc.message = message;
//   exc.type = ExceptionTypes.INVALID_PARAMETER;
//   throw(exc);
};