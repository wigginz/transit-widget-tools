var EXPORTED_SYMBOLS = ["AudioPlayer"];

Components.utils.import("resource://transit-runtime/api/jil/1.2.2/WidgetCommon.jsm");

var _AudioPlayer_122 = Components.classes["@jil.org/jilapi-audioplayer;1"].getService(Components.interfaces.jilAudioPlayer);

function AudioPlayer()
{
  this.onStateChange = null;
}

AudioPlayer.prototype = function()
{  
};

AudioPlayer.prototype.toString = function()
{
  return("Widget.Multimedia.AudioPlayer");
}; 

AudioPlayer.prototype.onStateChange = null;

AudioPlayer.prototype.open = function(fileUrl)
{
  if ( (fileUrl == null) || (fileUrl.constructor != String) )
    WidgetCommon.throwIPException("Invalid argument type for fileUrl in AudioPlayer.open");
     
  _AudioPlayer_122.open(fileUrl);
};

AudioPlayer.prototype.pause = function()
{
  _AudioPlayer_122.pause();
};

AudioPlayer.prototype.play = function(repeatTimes)
{
  if ( (repeatTimes == null) || (repeatTimes.constructor != Number) || (repeatTimes < 0) )
    WidgetCommon.throwIPException("Invalid argument type for repeatTimes in AudioPlayer.play");
      
  _AudioPlayer_122.play(repeatTimes);
};

AudioPlayer.prototype.resume = function()
{
  _AudioPlayer_122.resume();
};

AudioPlayer.prototype.stop = function()
{
  _AudioPlayer_122.stop();
};