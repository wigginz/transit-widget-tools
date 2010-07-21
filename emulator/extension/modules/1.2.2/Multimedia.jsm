var EXPORTED_SYMBOLS = ["Multimedia"];

Components.utils.import("resource://transit-emulator/1.2.2/Camera.jsm");
Components.utils.import("resource://transit-emulator/1.2.2/AudioPlayer.jsm");
Components.utils.import("resource://transit-emulator/1.2.2/VideoPlayer.jsm");

var _Multimedia_122 = Components.classes["@jil.org/jilapi-multimedia;1"].getService(Components.interfaces.jilMultimedia);

function Multimedia()
{
}

Multimedia.prototype = function()
{

};

Multimedia.prototype.Camera = new Camera();

Multimedia.prototype.AudioPlayer = new AudioPlayer();

Multimedia.prototype.VideoPlayer = new VideoPlayer();

Multimedia.prototype.isAudioPlaying = _Multimedia_122.isAudioPlaying;
Multimedia.prototype.isVideoPlaying = _Multimedia_122.isVideoPlaying;

Multimedia.prototype.getVolume = function()
{
  return(_Multimedia_122.getVolume());
};

Multimedia.prototype.stopAll = function()
{
  _Multimedia_122.stopAll();
};