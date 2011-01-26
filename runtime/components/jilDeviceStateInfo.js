const INTERFACE = Components.interfaces.jilDeviceStateInfo; //#
const CLASS_ID = Components.ID("ddc351f0-bad1-11de-8a39-0800200c9a66"); //#
const CLASS_NAME = "JIL API DeviceStateInfo"; //#
const CONTRACT_ID = "@jil.org/jilapi-devicestateinfo;1"; //#

/***********************************************************/

var service = null;

function JILDeviceStateInfo() //#
{
  Components.utils.import("resource://transit-runtime/TransitCommon.jsm");
  
  this.AccelerometerInfo  = Components.classes["@jil.org/jilapi-accelerometerinfo;1"].createInstance(Components.interfaces.jilAccelerometerInfo);
  this.Config  = Components.classes["@jil.org/jilapi-config;1"].createInstance(Components.interfaces.jilConfig);

  this.runtime = Components.classes["@jil.org/jilapi-emulatorruntime;1"].getService().wrappedJSObject;

  this.reload();
  
  service = this;
}

/***********************************************************/

JILDeviceStateInfo.prototype = //#
{
  AccelerometerInfo : null,
  Config : null,

  onFlipEvent : null,
  onPositionRetrieved : null,
  onScreenChangeDimensions : null,

  audioPath : null,
  availableMemory : null,
  backLightOn : null,
  keypadLightOn : null,
  language : null,
  processorUtilizationPercent : null,

  positionMethod : null,

  runtime : null,

  requestPositionInfo : function(method) 
  {
    this.positionMethod = method;
    
    this.runtime.logAction("DeviceStateInfo.requestPositionInfo(): Position requested and sent back to callback function.");
    
    var tm = Components.classes["@mozilla.org/thread-manager;1"].getService(Components.interfaces.nsIThreadManager);

    tm.mainThread.dispatch(
    {
      run: function()
      {
        if ( service.onPositionRetrieved == null )
          Components.classes["@jil.org/jilapi-emulatorruntime;1"].getService().wrappedJSObject.logAction("DeviceStateInfo.requestPositionInfo(): No callback function set, no where to send results.");
        else
        {
          var positionInfo = service.runtime.getPositionInfo();
          TransitCommon.debug(positionInfo.cellID);
          positionInfo.timeStamp = new Date();
          service.onPositionRetrieved.invoke(positionInfo, method);
        }
      }
    }, Components.interfaces.nsIThread.DISPATCH_NORMAL);    
  },
  
  reload : function()
  {
    var deviceState = this.runtime.getDeviceState();
    
    this.audioPath = deviceState.audioPath;
    this.availableMemory = deviceState.availableMemory;
    this.backLightOn = deviceState.backLight;
    this.keypadLightOn = deviceState.keypadLight;
    this.language = deviceState.language;
    this.processorUtilizationPercent = deviceState.procUtilization;
    
    this.onFlipEvent = null;
    this.onPositionRetrieved = null;
    this.onScreenChangeDimensions = null;
    this.positionMethod = null;
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

var JILDeviceStateInfoFactory = { //#
  createInstance: function (aOuter, aIID)
  {
    if (aOuter != null)
      throw Components.results.NS_ERROR_NO_AGGREGATION;
    
    if ( service == null )
      return(new JILDeviceStateInfo()).QueryInterface(aIID);
    else 
      return(service);
  }
};

/***********************************************************/

var JILDeviceStateInfoModule = { //#
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
      , "_DeviceStateInfo_122a"
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
      , "_DeviceStateInfo_122a"
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
      return JILDeviceStateInfoFactory; //#

    throw Components.results.NS_ERROR_NO_INTERFACE;
  },

  canUnload: function(aCompMgr) { return true; }
};

/***********************************************************/

function NSGetModule(aCompMgr, aFileSpec) { return JILDeviceStateInfoModule; } //#