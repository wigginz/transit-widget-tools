const INTERFACE = Components.interfaces.jilWidgetManager; //#
const CLASS_ID = Components.ID("abb49f20-babd-11de-8a39-0800200c9a66"); //#
const CLASS_NAME = "JIL API WidgetManager"; //#
const CONTRACT_ID = "@jil.org/jilapi-widgetmanager;1"; //#

/***********************************************************/

var service = null;

function JILWidgetManager() //#
{
  this.runtime = Components.classes['@jil.org/jilapi-emulatorruntime;1'].getService().wrappedJSObject;
  
  service = this;
}

/***********************************************************/

JILWidgetManager.prototype = //#
{
  runtime : null,
  
  checkWidgetInstallationStatus : function(widgetId, widgetName, widgetVersion)
  {
    var found = false;
    
    // get the list of installed widgets
    var widgets = this.runtime.getEmulatedWidgets();
    for ( var i = 0; i < widgets.length; i++ )
    {
      if ( (widgets[i].applicationId == widgetId) && 
           (widgets[i].name == widgetName) &&
           (widgets[i].version == widgetVersion)
         )
        found = true;
    }
    
    if ( found )
      return("installed");
    else
      return("uninstalled");
  },
  
  reload : function()
  {

  },

  QueryInterface: function(aIID)
  {
    if (!aIID.equals(INTERFACE) &&    
        !aIID.equals(Components.interfaces.nsIClassInfo) &&
        !aIID.equals(Components.interfaces.nsISupports) ) 
      throw Components.results.NS_ERROR_NO_INTERFACE;
    return this;
  },

  // nsIClassInfo
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

var JILWidgetManagerFactory = { //#
  createInstance: function (aOuter, aIID)
  {
    if (aOuter != null)
      throw Components.results.NS_ERROR_NO_AGGREGATION;
    
    if ( service == null )
      return(new JILWidgetManager()).QueryInterface(aIID);
    else 
      return(service);
  }
};

/***********************************************************/

var JILWidgetManagerModule = { //#
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
      , "_WidgetManager_122a"
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
      , "_WidgetManager_122a"
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
      return JILWidgetManagerFactory; //#

    throw Components.results.NS_ERROR_NO_INTERFACE;
  },

  canUnload: function(aCompMgr) { return true; }
};

/***********************************************************/

function NSGetModule(aCompMgr, aFileSpec) { return JILWidgetManagerModule; } //#