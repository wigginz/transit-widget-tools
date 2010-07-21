var EXPORTED_SYMBOLS = ["WidgetManager"];

var _WidgetManager_122 = Components.classes["@jil.org/jilapi-widgetmanager;1"].getService(Components.interfaces.jilWidgetManager);

function WidgetManager()
{
}

WidgetManager.prototype = function()
{
  
};

WidgetManager.prototype.checkWidgetInstallationStatus = function(widgetId, widgetName, widgetVersion)
{
  return(_WidgetManager_122.checkWidgetInstallationStatus(widgetId, widgetName, widgetVersion));
};