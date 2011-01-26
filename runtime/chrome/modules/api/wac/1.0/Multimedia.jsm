var EXPORTED_SYMBOLS = ["Multimedia"];

Components.utils.import("resource://transit-emulator/api/wac/1.0/Camera.jsm");
Components.utils.import("resource://transit-emulator/api/wac/1.0/AudioPlayer.jsm");

var _Multimedia_122 = Components.classes["@jil.org/jilapi-multimedia;1"].getService(Components.interfaces.jilMultimedia);

function Multimedia()
{
  this.Camera = new Camera();
  this.AudioPlayer = new AudioPlayer();
  this.isAudioPlaying = _Multimedia_122.isAudioPlaying;
}

Multimedia.prototype = function()
{
};

Multimedia.prototype.toString = function()
{
  return("Widget.Multimedia");
};  

Multimedia.prototype.Camera = null;

Multimedia.prototype.AudioPlayer = null;

Multimedia.prototype.isAudioPlaying = null;

Multimedia.prototype.getVolume = function()
{
  return(_Multimedia_122.getVolume());
};

Multimedia.prototype.stopAll = function()
{
  _Multimedia_122.stopAll();
};