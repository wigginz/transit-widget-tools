var EXPORTED_SYMBOLS = ["RuntimeManager"];

Components.utils.import("resource://transit-runtime/TransitCommon.jsm");  

var RuntimeManager = 
{
  /** constants **/
  INSTALL_PREFIX : "widgets",

  /** structures **/
  services :
  {
    profiles : null,
  },

  dialogs : 
  {
    GET_A_WIDGET : 
    {
      resource : "chrome://transit-runtime/content/runtime/dialogs/getAWidget.xul",
      name : "twr_get_a_widget",
      args : "chrome,centerscreen",
    },
  },

  prefs :
  {
  },

  context :
  {
    deviceProfile : null,
  },

  /** methods **/
  init : function()
  {
    this.services.profiles = Components.classes['@jil.org/jilapi-profileservice;1'].getService().wrappedJSObject;

    this.context.deviceProfile = this.services.profiles.getAllDeviceProfiles()[0];
  },

  getStringPref : function(key)
  {
    var prefs = Components.classes["@mozilla.org/preferences-service;1"]
                    .getService(Components.interfaces.nsIPrefService).getBranch("extension.transit-runtime.");
    
    TransitCommon.debug("Getting string preference for key "+key);
    var value = prefs.getCharPref(key);
    TransitCommon.debug("Preference value is "+value);

    return(value);
  },

  openDialog : function(dialog)
  {
    var ww = Components.classes["@mozilla.org/embedcomp/window-watcher;1"].getService(Components.interfaces.nsIWindowWatcher);
    ww.openWindow(ww.activeWindow, dialog.resource, dialog.name, dialog.args, null).focus();
  },

  exit : function()
  {
    var appStartup = Components.classes["@mozilla.org/toolkit/app-startup;1"].getService(Components.interfaces.nsIAppStartup);

    TransitCommon.debug("Attempting to exit application forcefully.");
    // dump a new line to be friendly!
    dump("\n");

    appStartup.quit(Components.interfaces.nsIAppStartup.eForceQuit);
  },

  getInstallDirectory : function()
  {
    var profileDir = Components.classes["@mozilla.org/file/directory_service;1"].getService(Components.interfaces.nsIProperties).get("ProfD", Components.interfaces.nsIFile);
    var installPath = profileDir.path + TransitCommon.getFileSeparator() + this.INSTALL_PREFIX;

    TransitCommon.debug("Install directory is "+installPath);
    return(installPath);
  },

  getInstalledWidget : function(widgetId, version)
  {
    var emulatedWidget = this.services.profiles.getEmulatedWidgetByAppId(this.context.deviceProfile.id, widgetId, version);

    if ( emulatedWidget == null )
    {
      TransitCommon.debug("Widget with id "+widgetId+" and version "+version+" is not installed in the system.");
      return(null);
    }
    return(emulatedWidget);
  },

  getTempDirectory : function()
  {
    var tempDir = Components.classes["@mozilla.org/file/directory_service;1"].getService(Components.interfaces.nsIProperties).get("TmpD", Components.interfaces.nsIFile).path;

    TransitCommon.debug("Temp directory is "+tempDir);
    return(tempDir);
  },

  getItemFile : function (wgtDir, filePath) 
  {
    var itemLocation = wgtDir.clone();
    var parts = filePath.split("/");
    for (var i = 0; i < parts.length; ++i)
      itemLocation.append(parts[i]);
    return itemLocation;
  },

  updateInstalledWidget : function(widget)
  {
    if ( widget.new )
      this.services.profiles.addEmulatedWidget(widget);
    else
      this.services.profiles.updateEmulatedWidget(widget);
  },
};

RuntimeManager.init();