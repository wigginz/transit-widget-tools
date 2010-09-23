var EXPORTED_SYMBOLS = ["WidgetCommon"];

Components.utils.import("resource://transit-emulator/api/jil/SecurityManager.jsm");

Components.utils.import("resource://transit-emulator/api/jil/1.2.2/Exception.jsm");
Components.utils.import("resource://transit-emulator/api/jil/1.2.2/ExceptionTypes.jsm");

var WidgetCommon = 
{
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
    exc.type = ExceptionTypes.INVALID_PARAMETER;
    throw(exc);
  },

  throwSecurityException : function(feature)
  {
    var exc = new Exception();
    exc.message = "Feature "+feature+" has not been configured for this widget (check feature tags in config.xml; case sensitive).";
    exc.type = ExceptionTypes.SECURITY;
    throw(exc);
  },
};




  