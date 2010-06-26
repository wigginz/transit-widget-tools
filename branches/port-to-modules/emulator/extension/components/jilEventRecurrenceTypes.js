const INTERFACE = Components.interfaces.jilEventRecurrenceTypes; //#
const CLASS_ID = Components.ID("22b6b0b1-bb66-11de-8a39-0800200c9a66"); //#
const CLASS_NAME = "JIL API EventRecurrenceTypes"; //#
const CONTRACT_ID = "@jil.org/jilapi-eventrecurrencetypes;1"; //#

/***********************************************************/

function JILEventRecurrenceTypes() //#
{
}

/***********************************************************/

JILEventRecurrenceTypes.prototype = //#
{
  DAILY                : "daily",
  EVERY_WEEKDAY        : "every_weekday",
  MONTHLY_ON_DAY       : "monthly_on_day",
  MONTHLY_ON_DAY_COUNT : "monthly_on_day_count",
  NOT_REPEAT           : "not_repeat",
  WEEKLY_ON_DAY        : "weekly_on_day",
  YEARLY               : "yearly",

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

var JILEventRecurrenceTypesFactory = { //#
  createInstance: function (aOuter, aIID)
  {
    if (aOuter != null)
      throw Components.results.NS_ERROR_NO_AGGREGATION;
    return (new JILEventRecurrenceTypes()).QueryInterface(aIID); //#
  }
};

/***********************************************************/

var JILEventRecurrenceTypesModule = { //#
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
      , "_EventRecurrenceTypes_122a"
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
      , "_EventRecurrenceTypes_122a"
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
      return JILEventRecurrenceTypesFactory; //#

    throw Components.results.NS_ERROR_NO_INTERFACE;
  },

  canUnload: function(aCompMgr) { return true; }
};

/***********************************************************/

function NSGetModule(aCompMgr, aFileSpec) { return JILEventRecurrenceTypesModule; } //#