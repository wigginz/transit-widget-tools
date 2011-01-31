var EXPORTED_SYMBOLS = ["WidgetCommon"];

Components.utils.import("resource://transit-runtime/api/wac/SecurityManager.jsm");

Components.utils.import("resource://transit-runtime/api/wac/1.0/Exception.jsm");
Components.utils.import("resource://transit-runtime/api/wac/1.0/ExceptionTypes.jsm");

var WidgetCommon = 
{
  ExceptionTypes : new ExceptionTypes(),
  
  runtime : Components.classes["@jil.org/jilapi-emulatorruntime;1"].getService().wrappedJSObject,
  
  checkFeature : function(feature)
  {
    if ( !this.runtime.checkFeature(SecurityManager.Device_1_1) )
      this.throwSecurityException(SecurityManager.Device_1_1);
  },
  
  throwIPException : function(message)
  {
    var exc = new Exception();
    exc.message = message;
    exc.type = this.ExceptionTypes.INVALID_PARAMETER;
    throw(exc);
  },

  throwSecurityException : function(feature)
  {
    var exc = new Exception();
    exc.message = "Feature "+feature+" has not been configured for this widget (check feature tags in config.xml; case sensitive).";
    exc.type = this.ExceptionTypes.SECURITY;
    throw(exc);
  },
};




  