var EXPORTED_SYMBOLS = ["widget"];

var _Widget_122 = Components.classes["@jil.org/jilapi-widget;1"].getService(Components.interfaces.jilWidget);
u
function widget()
{
}

widget.prototype = function()
{  
};   

widget.prototype.openURL = function(url) 
{
  if ( (url == null) || (url.constructor != String) )
    widget.throwIPException("Invalid argument type for url in Widget.openUrl");
  
  _Widget_122.openURL(url);
};

widget.prototype.throwIPException = function(message)
{
//   var exc = new Widget.Exception();
//   exc.message = message;
//   exc.type = Widget.ExceptionTypes.INVALID_PARAMETER;
//   throw(exc);
};