var EXPORTED_SYMBOLS = ["ThemeHelper"];

Components.utils.import("resource://transit-runtime/TransitCommon.jsm");  

var ThemeHelper = 
{
  runtime : Components.classes['@transit/runtime-service;1'].getService().wrappedJSObject,
  
  getInstalledWidgets : function()
  {
    var widgets = this.runtime.getEmulatedWidgets();
  },
};