const INTERFACE = Components.interfaces.jilWidget;
const CLASS_ID = Components.ID("a56d3b40-b9d7-11de-8a39-0800200c9a66");
const CLASS_NAME = "JIL API Widget";
const CONTRACT_ID = "@jil.org/jilapi-widget;1";
 
/***********************************************************/

var service = null;

function JILWidget() 
{
  this.Device  = Components.classes["@jil.org/jilapi-device;1"].createInstance(Components.interfaces.jilDevice);
  this.Exception  = Components.classes["@jil.org/jilapi-exception;1"].createInstance(Components.interfaces.jilException);
  this.ExceptionTypes  = Components.classes["@jil.org/jilapi-exceptiontypes;1"].createInstance(Components.interfaces.jilExceptionTypes);
  this.Messaging  = Components.classes["@jil.org/jilapi-messaging;1"].createInstance(Components.interfaces.jilMessaging);
  this.Multimedia  = Components.classes["@jil.org/jilapi-multimedia;1"].createInstance(Components.interfaces.jilMultimedia);
  this.PIM  = Components.classes["@jil.org/jilapi-pim;1"].createInstance(Components.interfaces.jilPIM);
  this.Telephony  = Components.classes["@jil.org/jilapi-telephony;1"].createInstance(Components.interfaces.jilTelephony);

  this.runtime = Components.classes["@jil.org/jilapi-emulatorruntime;1"].getService().wrappedJSObject;

  service = this;
}

// class definition
JILWidget.prototype = 
{
  Device         : null,
  Exception      : null,
  ExceptionTypes : null,
  Messaging      : null,
  Multimedia     : null,
  PIM            : null,
  Telephony      : null,
  
  onFocus : null,
  onMaximize : null,
  onRestore : null,
  onWakeup : null,

  runtime : null,

  openURL : function(url)
  {
    var height = this.runtime.getDeviceInfo().screenHeight;
    var width = this.runtime.getDeviceInfo().screenWidth;
    var windowOptions = "menubar=yes,location=yes,resizable=yes,scrollbars=yes,status=yes,outerHeight="+height+",outerWidth="+width;

    var ww = Components.classes["@mozilla.org/embedcomp/window-watcher;1"]
                   .getService(Components.interfaces.nsIWindowWatcher);

    ww.openWindow(null, url, "Widget.openURL()", windowOptions, null);

    this.runtime.logAction("Widget.openURL(): Launched url: "+url+" in new browser window.");
  },

  preferenceForKey : function(key)
  {
    var pref = this.runtime.getPreferenceForKey(key);
    if ( pref == null )
    {
      this.runtime.logAction("Widget.preferenceForKey(): No existing preference for key: "+key+", returning null.");
      return("");
    }

    this.runtime.logAction("Widget.preferenceForKey(): Retrieved value: "+pref.value+" for key: "+key);

    return(pref.value);
  },

  setPreferenceForKey : function(value, key)
  {
    this.runtime.setPreferenceForKey(value, key);

    this.runtime.logAction("Widget.setPreferenceForKey(): Set value: "+value+" for key: "+key);
  },

  reload : function()
  {
    this.onFocus = null;
    this.onMaximize = null;
    this.onRestore = null;
    this.onWakeup = null;
  },

  QueryInterface: function(aIID)
  {
    if (!aIID.equals(INTERFACE) &&    
        !aIID.equals(Components.interfaces.nsIClassInfo) &&
        !aIID.equals(Components.interfaces.nsISupports) ) 
      throw Components.results.NS_ERROR_NO_INTERFACE;
    return this;
  },

  // nsIClassInfo - required to expose the class to all windows
  flags: Components.interfaces.nsIClassInfo.DOM_OBJECT,

  implementationLanguage: Components.interfaces.nsIProgrammingLanguage.JAVASCRIPT,

  classDescription: CLASS_NAME,
  classID: CLASS_ID,
  contractID: CONTRACT_ID,

  getInterfaces: function(aCount) {
    var aResult = [
      INTERFACE
      , Components.interfaces.nsIClassInfo
    ];
    aCount.value = aResult.length;
    return aResult;
  },

  getHelperForLanguage: function(count) { return null; },
};

/***********************************************************/

var JILWidgetFactory = {
  createInstance: function (aOuter, aIID)
  {
    if (aOuter != null)
      throw Components.results.NS_ERROR_NO_AGGREGATION;
    
    if ( service == null )
      return(new JILWidget()).QueryInterface(aIID);
    else 
      return(service);
  }
};

/***********************************************************/

var JILWidgetModule = {
  registerSelf: function(aCompMgr, aFileSpec, aLocation, aType)
  {
    aCompMgr = aCompMgr.
        QueryInterface(Components.interfaces.nsIComponentRegistrar);
    aCompMgr.registerFactoryLocation(CLASS_ID, CLASS_NAME, 
        CONTRACT_ID, aFileSpec, aLocation, aType);

    var catman = Components.classes["@mozilla.org/categorymanager;1"].
              getService(Components.interfaces.nsICategoryManager);
    // Register Global Property, make object accessible to any window
    catman.addCategoryEntry(
      "JavaScript global property"
      , "_Widget_122a"
      , CONTRACT_ID
      , true
      , false
    );
    catman = null;
    aCompMgr = null;
  },

  unregisterSelf: function(aCompMgr, aLocation, aType)
  {
    var catman = Components.classes["@mozilla.org/categorymanager;1"].
            getService(Components.interfaces.nsICategoryManager);
    catman.deleteCategoryEntry(
      "JavaScript global property"
      , "_Widget_122a"
      , true
    );

    aCompMgr = aCompMgr.
        QueryInterface(Components.interfaces.nsIComponentRegistrar);
    aCompMgr.unregisterFactoryLocation(CLASS_ID, aLocation); 

    aCompMgr = null;        
    catman = null;           
  },
  
  getClassObject: function(aCompMgr, aCID, aIID)
  {
    if (!aIID.equals(Components.interfaces.nsIFactory))
      throw Components.results.NS_ERROR_NOT_IMPLEMENTED;

    if (aCID.equals(CLASS_ID))
      return JILWidgetFactory;

    throw Components.results.NS_ERROR_NO_INTERFACE;
  },

  canUnload: function(aCompMgr) { return true; }
};

/***********************************************************/

function NSGetModule(aCompMgr, aFileSpec) { return JILWidgetModule; }
