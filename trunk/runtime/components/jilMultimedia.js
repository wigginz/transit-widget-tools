const INTERFACE = Components.interfaces.jilMultimedia; //#
const CLASS_ID = Components.ID("300a4b90-be91-11de-8a39-0800200c9a66"); //#
const CLASS_NAME = "JIL API Multimedia"; //#
const CONTRACT_ID = "@jil.org/jilapi-multimedia;1"; //#

/***********************************************************/

var service = null;

function JILMultimedia() //#
{
  Components.utils.import("resource://transit-runtime/TransitCommon.jsm");
  
  this.Camera  = Components.classes["@jil.org/jilapi-camera;1"].createInstance(Components.interfaces.jilCamera);
  this.AudioPlayer  = Components.classes["@jil.org/jilapi-audioplayer;1"].createInstance(Components.interfaces.jilAudioPlayer);
  this.VideoPlayer  = Components.classes["@jil.org/jilapi-videoplayer;1"].createInstance(Components.interfaces.jilVideoPlayer);

  this.runtime = Components.classes["@jil.org/jilapi-emulatorruntime;1"].getService().wrappedJSObject;
  
  service = this;
}

/***********************************************************/

JILMultimedia.prototype = //#
{
  Camera : null,
  AudioPlayer : null,
  VideoPlayer : null,

  isAudioPlaying : null,
  isVideoPlaying : null,
  
  monitor : null,

  runtime : null,
  
  setAudioPlaying : function(isPlaying)
  {
    this.isAudioPlaying = isPlaying;
    
    if ( this.monitor != null )
      this.monitor.invoke(this.isAudioPlaying, this.isVideoPlaying);
  },
  
  setVideoPlaying : function(isPlaying)
  {
    this.isVideoPlaying = isPlaying;
    
    if ( this.monitor != null )
      this.monitor.invoke(this.isAudioPlaying, this.isVideoPlaying);
  },

  getVolume : function()
  {
    var volume = this.runtime.getMultimedia().volume;

    this.runtime.logAction("Multimedia.getVolume(): returning volume of: "+volume);

    return(volume);
  },

  stopAll : function()
  {
    this.AudioPlayer.stop();
    this.VideoPlayer.stop();
    
    this.runtime.logAction("Multimedia.stopAll(): stopped audio and video playback whether playing or not");
  },
  
  reload : function()
  {
    this.isAudioPlaying = null;
    this.isVideoPlaying = null;
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

var JILMultimediaFactory = { //#
  createInstance: function (aOuter, aIID)
  {
    if (aOuter != null)
      throw Components.results.NS_ERROR_NO_AGGREGATION;
    
    if ( service == null )
      return(new JILMultimedia()).QueryInterface(aIID);
    else 
      return(service);
  }
};

/***********************************************************/

var JILMultimediaModule = { //#
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
      , "_Multimedia_122a"
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
      , "_Multimedia_122a"
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
      return JILMultimediaFactory; //#

    throw Components.results.NS_ERROR_NO_INTERFACE;
  },

  canUnload: function(aCompMgr) { return true; }
};

/***********************************************************/

function NSGetModule(aCompMgr, aFileSpec) { return JILMultimediaModule; } //#