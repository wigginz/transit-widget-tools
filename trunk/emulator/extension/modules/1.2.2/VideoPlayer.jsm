var EXPORTED_SYMBOLS = ["VideoPlayer"];

var _VideoPlayer_122 = Components.classes["@jil.org/jilapi-videoplayer;1"].getService(Components.interfaces.jilVideoPlayer);

function VideoPlayer()
{
  this.onStateChange = null;
  this.source = null;
  this.video = null;
}

VideoPlayer.prototype = function()
{
};

VideoPlayer.prototype.toString = function()
{
  return("Widget.Multimedia.VideoPlayer");
};  

VideoPlayer.prototype.onStateChange = null;

VideoPlayer.prototype.source = null;

VideoPlayer.prototype.video = null;

VideoPlayer.prototype.open = function(fileUrl)
{
  _VideoPlayer_122.open(fileUrl);
};

VideoPlayer.prototype.pause = function()
{
  _VideoPlayer_122.pause();
};

VideoPlayer.prototype.play = function(repeatTimes)
{
  _VideoPlayer_122.play(repeatTimes);
};

VideoPlayer.prototype.resume = function()
{
  _VideoPlayer_122.resume();
};

VideoPlayer.prototype.stop = function()
{
  _VideoPlayer_122.stop();
};

VideoPlayer.prototype.setWindow = function(domObj)
{
  _VideoPlayer_122.setWindow(domObj, domObj.ownerDocument.createElement("video"));
};
