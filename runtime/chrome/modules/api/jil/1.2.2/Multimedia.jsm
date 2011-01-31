var EXPORTED_SYMBOLS = ["Multimedia"];

Components.utils.import("resource://transit-runtime/api/jil/1.2.2/Camera.jsm");
Components.utils.import("resource://transit-runtime/api/jil/1.2.2/AudioPlayer.jsm");
Components.utils.import("resource://transit-runtime/api/jil/1.2.2/VideoPlayer.jsm");

var _Multimedia_122 = Components.classes["@jil.org/jilapi-multimedia;1"].getService(Components.interfaces.jilMultimedia);

function Multimedia()
{
  this.Camera = new Camera();
  this.AudioPlayer = new AudioPlayer();
  this.VideoPlayer = new VideoPlayer();
  this.isAudioPlaying = _Multimedia_122.isAudioPlaying;
  this.isVideoPlaying = _Multimedia_122.isVideoPlaying;
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

Multimedia.prototype.VideoPlayer = null;

Multimedia.prototype.isAudioPlaying = null;

Multimedia.prototype.isVideoPlaying = null;

Multimedia.prototype.getVolume = function()
{
  return(_Multimedia_122.getVolume());
};

Multimedia.prototype.stopAll = function()
{
  _Multimedia_122.stopAll();
};