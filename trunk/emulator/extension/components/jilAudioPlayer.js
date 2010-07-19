const INTERFACE = Components.interfaces.jilAudioPlayer; //#
const CLASS_ID = Components.ID("a6793ed2-bb5d-11de-8a39-0800200c9a66"); //#
const CLASS_NAME = "JIL API AudioPlayer"; //#
const CONTRACT_ID = "@jil.org/jilapi-audioplayer;1"; //#

const STATE_PLAYING = "playing";
const STATE_STOPPED = "stopped";
const STATE_COMPLETED = "completed";
const STATE_PAUSED = "paused";
const STATE_OPENED = "opened";

var urlRegexp = /(ftp|http|https|file):\/\/(\w+:{0,1}\w*@)?(\S+)(:[0-9]+)?(\/|\/([\w#!:.?+=&%@!\-\/]))?/;

/***********************************************************/

var service = null;

function JILAudioPlayer() //#
{
  Components.utils.import("resource://transit-emulator/TransitCommon.jsm");
  
  this.runtime = Components.classes['@jil.org/jilapi-emulatorruntime;1'].getService().wrappedJSObject;
  
  this.reload();
  
  service = this;
}

/***********************************************************/

JILAudioPlayer.prototype = //#
{
  runtime : null,

  _isPlaying : false,

  onStateChange : null,
  
  repeatsRemaining : null,

  open : function(fileUrl)
  {
    var eWindow = this.runtime.getEmulatorWindow();
    var baseUrl = this.runtime.getWidget().baseUrl;

    // check if it's a URL
    if ( !urlRegexp.test(fileUrl) )
       fileUrl = "file://"+baseUrl+fileUrl;

    // load the file
    eWindow.document.getElementById("jwe-audioplayer").src = fileUrl; //"file://"+baseUrl+fileUrl;
    eWindow.document.getElementById("jwe-audioplayer").load();

    // invoke the state change callback indicating audio is opened
    this.triggerStateChange(STATE_OPENED);

    // log it
    this.runtime.logAction("AudioPlayer.open(): Loaded audio file "+fileUrl);
  },

  pause : function()
  {
    this._isPlaying = false;
    this.runtime.logAction("AudioPlayer.pause(): isPlaying now set to false");
    
    var eWindow = this.runtime.getEmulatorWindow();
    eWindow.document.getElementById("jwe-audioplayer").pause();
    
    this.runtime.logAction("AudioPlayer.pause(): paused current audio playback (if running)");

    this.triggerStateChange(STATE_PAUSED);
  },

  play : function(repeatTimes)
  {
    var eWindow = this.runtime.getEmulatorWindow();
    eWindow.document.getElementById("jwe-audioplayer").play();
    
    this.repeatsRemaining = repeatTimes - 1;
    
    eWindow.document.getElementById("jwe-audioplayer").addEventListener("ended", function() 
    { 
      // only repeat if the audio hadnt been stopped (_isPlaying == false)
      if ( (service._isPlaying == true) && (service.repeatsRemaining > 0) )
      {
        var eWindow = service.runtime.getEmulatorWindow();
        eWindow.document.getElementById("jwe-audioplayer").play();
        service.repeatsRemaining -= 1;
        
        service.runtime.logAction("AudioPlayer.play(): Playback has completed with repeat times remaining. Repeat times now remaining: "+service.repeatsRemaining);
      }
      // else, trigger playback complete event
      else if ( service.repeatsRemaining < 1 )
      {
        service.triggerStateChange(STATE_COMPLETED);
        service._isPlaying = false;
        service.runtime.logAction("AudioPlayer.play(): Playback of audio file has ended with zero repeat times remaining. Setting audio state to completed and isPlaying to false.");
      }
      
    }, true);  

    // log it
    this.runtime.logAction("AudioPlayer.play(): playing loaded audio file. Repeat times: "+repeatTimes);

    // invoke the state change callback indicating audio is opened
    this.triggerStateChange(STATE_PLAYING);

    this._isPlaying = true;
    this.runtime.logAction("AudioPlayer.play(): isPlaying now set to true");
  },

  resume : function()
  {
    this._isPlaying = true;
    this.runtime.logAction("AudioPlayer.resume(): isPlaying now set to true");
    
    var eWindow = this.runtime.getEmulatorWindow();
    eWindow.document.getElementById("jwe-audioplayer").play();
    
    this.runtime.logAction("AudioPlayer.resume(): resumed current audio playback (if paused)");

    this.triggerStateChange(STATE_PLAYING);
  },

  stop : function()
  {
    // do this first to avoid triggering any events relying on this value
    this._isPlaying = false;
    this.runtime.logAction("AudioPlayer.stop(): isPlaying now set to false");
    
    var eWindow = this.runtime.getEmulatorWindow();
    
    // pause first, then reload to reset the play position to beginning
    eWindow.document.getElementById("jwe-audioplayer").pause();
    eWindow.document.getElementById("jwe-audioplayer").load();
    
    // log it
    this.runtime.logAction("AudioPlayer.stop(): stopped current audio playback");

    this.triggerStateChange(STATE_STOPPED);
  },

  triggerStateChange : function(state)
  {
    if ( this.onStateChange != null )
    {
      this.onStateChange.invoke(state);
      this.runtime.logAction("AudioPlayer.onStateChange(): Triggering onStateChange callback: "+state);
    }
  },
  
  reload : function()
  {
    this.unwatch("_isPlaying");
    
    this.repeatsRemaining = 0;
    this._isPlaying = false;    
    this.onStateChange = null;
    
    // watch
    this.watch("_isPlaying", function(id, oldValue, newValue) 
    {
      Components.classes["@jil.org/jilapi-multimedia;1"].createInstance(Components.interfaces.jilMultimedia).setAudioPlaying(newValue);
    });
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

var JILAudioPlayerFactory = { //#
  createInstance: function (aOuter, aIID)
  {
    if (aOuter != null)
      throw Components.results.NS_ERROR_NO_AGGREGATION;
    
    if ( service == null )
      return(new JILAudioPlayer()).QueryInterface(aIID);
    else 
      return(service);
  }
};

/***********************************************************/

var JILAudioPlayerModule = { //#
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
      , "_AudioPlayer_122a"
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
      , "_AudioPlayer_122a"
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
      return JILAudioPlayerFactory; //#

    throw Components.results.NS_ERROR_NO_INTERFACE;
  },

  canUnload: function(aCompMgr) { return true; }
};

/***********************************************************/

function NSGetModule(aCompMgr, aFileSpec) { return JILAudioPlayerModule; } //#