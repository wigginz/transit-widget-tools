var EXPORTED_SYMBOLS = ["ApplicationTypes"];

var _ApplicationTypes_122 = Components.classes["@jil.org/jilapi-applicationtypes;1"].getService(Components.interfaces.jilApplicationTypes);

function ApplicationTypes()
{
}

ApplicationTypes.prototype = function()
{  
};

ApplicationTypes.prototype.toString = function()
{
  return("Widget.Device.ApplicationTypes");
}; 

ApplicationTypes.prototype.CAMERA = _ApplicationTypes_122.CAMERA;

ApplicationTypes.prototype.MEDIAPLAYER = _ApplicationTypes_122.MEDIAPLAYER;

ApplicationTypes.prototype.MESSAGING = _ApplicationTypes_122.MESSAGING;