const INTERFACE = Components.interfaces.jilDataNetworkInfo; //#
const CLASS_ID = Components.ID("2b011be1-be8e-11de-8a39-0800200c9a66"); //#
const CLASS_NAME = "JIL API DataNetworkInfo"; //#
const CONTRACT_ID = "@jil.org/jilapi-datanetworkinfo;1"; //#

/***********************************************************/

var service = null;

function JILDataNetworkInfo() //#
{
  this.runtime = Components.classes["@jil.org/jilapi-emulatorruntime;1"].getService().wrappedJSObject;

  this.connections =  this.runtime.getDataNetworkInfo();

  this.reload();

  service = this;
}

/***********************************************************/

JILDataNetworkInfo.prototype = //#
{
  isDataNetworkConnected : null,
  
  connections : null,
  types : null,

  onNetworkConnectionChanged : null,

  runtime : null,

  getNetworkConnectionTypes : function(count, retv)
  {
    count.value = this.types.length;
    return(this.types);
  },

  getNetworkConnectionName : function(networkConnecionType) 
  {
    var name = null;
    for ( var i = 0; i < this.connections.length; i++ )
    {
      if ( this.connections[i].type == networkConnecionType )
        name = this.connections[i].nickname;
    }
  
    if ( name != null )
      this.runtime.logAction("DataNetworkInfo.getNetworkConnectionName(): could not locate a data connection of type: "+networkConnecionType);
    else 
      this.runtime.logAction("DataNetworkInfo.getNetworkConnectionName(): located a data connection of type: "+networkConnecionType+" called: "+name);

    return(name);
  },
  
  reload : function()
  {
    this.connections =  this.runtime.getDataNetworkInfo();
    
    this.types = new Array();
    this.isDataNetworkConnected = false;
    for ( var i = 0; i < this.connections.length; i++ )
    {
      if ( this.connections[i].enabled )
      {
        this.isDataNetworkConnected = true;
        this.types.push(this.connections[i].type);
      }
    }
    
    this.onNetworkConnectionChanged = null;
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

var JILDataNetworkInfoFactory = { //#
  createInstance: function (aOuter, aIID)
  {
    if (aOuter != null)
      throw Components.results.NS_ERROR_NO_AGGREGATION;
    
    if ( service == null )
      return(new JILDataNetworkInfo()).QueryInterface(aIID);
    else 
      return(service);
  }
};

/***********************************************************/

var JILDataNetworkInfoModule = { //#
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
      , "_DataNetworkInfo_122a"
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
      , "_DataNetworkInfo_122a"
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
      return JILDataNetworkInfoFactory; //#

    throw Components.results.NS_ERROR_NO_INTERFACE;
  },

  canUnload: function(aCompMgr) { return true; }
};

/***********************************************************/

function NSGetModule(aCompMgr, aFileSpec) { return JILDataNetworkInfoModule; } //#