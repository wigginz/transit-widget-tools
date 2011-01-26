const INTERFACE = Components.interfaces.jilConfig; //#
const CLASS_ID = Components.ID("f170f981-be8e-11de-8a39-0800200c9a66"); //#
const CLASS_NAME = "JIL API Config"; //#
const CONTRACT_ID = "@jil.org/jilapi-config;1"; //#

/***********************************************************/

var service = null;

function JILConfig() //#
{
  Components.utils.import("resource://transit-runtime/TransitCommon.jsm");
  
  this.runtime = Components.classes["@jil.org/jilapi-emulatorruntime;1"].getService().wrappedJSObject;
  
  this.reload();
  
  service = this;
}

/***********************************************************/

JILConfig.prototype = //#
{
  msgRingtoneVolume : null,
  ringtoneVolume : null,
  vibrationSetting : null,

  runtime : null,

  setAsWallpaper : function(wallpaperFileurl) 
  {
    TransitCommon.alert("Config.setAsWallpaper(): simulated changing device wallpaper to: "+wallpaperFileurl);

    this.runtime.logAction("Config.setAsWallpaper(): simulated changing device wallpaper to: "+wallpaperFileurl);
  },

  setDefaultRingtone : function(ringtoneFileurl) 
  {
    TransitCommon.alert("Config.setDefaultRingtone(): simulated changing device default ringtone to: "+ringtoneFileurl);

    this.runtime.logAction("Config.setDefaultRingtone(): simulated changing device default ringtone to: "+ringtoneFileurl); 
  },
  
  reload : function()
  {
    var config = this.runtime.getConfig();
    
    this.msgRingtoneVolume = config.messageVolume;
    this.ringtoneVolume = config.ringtoneVolume;
    this.vibrationSetting = config.vibrationOn;
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

var JILConfigFactory = { //#
  createInstance: function (aOuter, aIID)
  {
    if (aOuter != null)
      throw Components.results.NS_ERROR_NO_AGGREGATION;
    
    if ( service == null )
      return(new JILConfig()).QueryInterface(aIID);
    else 
      return(service);
  }
};

/***********************************************************/

var JILConfigModule = { //#
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
      , "_Config_122a"
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
      , "_Config_122a"
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
      return JILConfigFactory; //#

    throw Components.results.NS_ERROR_NO_INTERFACE;
  },

  canUnload: function(aCompMgr) { return true; }
};

/***********************************************************/

function NSGetModule(aCompMgr, aFileSpec) { return JILConfigModule; } //#