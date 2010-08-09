var EXPORTED_SYMBOLS = ["WidgetManager"];

Components.utils.import("resource://transit-emulator/api/jil/SecurityManager.jsm");

var _WidgetManager_122 = Components.classes["@jil.org/jilapi-widgetmanager;1"].getService(Components.interfaces.jilWidgetManager);

var WidgetManager =
{
  checkWidgetInstallationStatus : function(widgetId, widgetName, widgetVersion)
  {
    var status = null;
    
    SecurityManager.checkSecurity("Check Widget Installation Status (WidgetManager.checkWidgetInstallationStatus)", SecurityManager.OP_SESSION, SecurityManager.OP_ALLOWED, SecurityManager.OP_ALLOWED, function()
    {
      status = _WidgetManager_122.checkWidgetInstallationStatus(widgetId, widgetName, widgetVersion);
    });
    
    return(status);
  },
}