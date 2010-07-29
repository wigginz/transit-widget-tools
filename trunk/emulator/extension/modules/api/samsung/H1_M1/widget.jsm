var EXPORTED_SYMBOLS = ["widget"];

var _Widget_122 = Components.classes["@jil.org/jilapi-widget;1"].getService(Components.interfaces.jilWidget);

var widget =
{
  openURL : function(url) 
  {
    if ( (url == null) || (url.constructor != String) )
      this.throwIPException("Invalid argument type for url in Widget.openUrl");
    
    _Widget_122.openURL(url);
  },

  throwIPException : function(message)
  {
  //   var exc = new Widget.Exception();
  //   exc.message = message;
  //   exc.type = Widget.ExceptionTypes.INVALID_PARAMETER;
  //   throw(exc);
  },
};