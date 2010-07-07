const INTERFACE = Components.interfaces.jilVideoPlayer; //#
const CLASS_ID = Components.ID("639cdd20-bb61-11de-8a39-0800200c9a66"); //#
const CLASS_NAME = "JIL API VideoPlayer"; //#
const CONTRACT_ID = "@jil.org/jilapi-videoplayer;1"; //#

const STATE_PLAYING = "playing";
const STATE_STOPPED = "stopped";
const STATE_COMPLETED = "completed";
const STATE_PAUSED = "paused";
const STATE_OPENED = "opened";

var urlRegexp = /(ftp|http|https|file):\/\/(\w+:{0,1}\w*@)?(\S+)(:[0-9]+)?(\/|\/([\w#!:.?+=&%@!\-\/]))?/;

/***********************************************************/

var service = null;

function JILVideoPlayer() //#
{
  this.runtime = Components.classes['@jil.org/jilapi-emulatorruntime;1'].getService().wrappedJSObject;

  this.reload();
  
  service = this;
}

/***********************************************************/

JILVideoPlayer.prototype = //#
{
  onStateChange : null,
  
  container : null,
  
  video : null,
  
  runtime : null,

  _isPlaying : false,
  
  repeatsRemaining : null,
  
  source : null,

  open : function(fileUrl)
  {
    var baseUrl = this.runtime.getWidget().baseUrl;

    // check if it's a URL
    if ( !urlRegexp.test(fileUrl) )
       fileUrl = "file://"+baseUrl+fileUrl;

    // load the file
    this.source = fileUrl;

    // invoke the state change callback indicating audio is opened
    this.triggerStateChange(STATE_OPENED);

    // log it
    this.runtime.logAction("VideoPlayer.open(): Loaded video file "+fileUrl);
  },

  pause : function()
  {
    this._isPlaying = false;
    this.runtime.logAction("VideoPlayer.pause(): isPlaying now set to false");
    
    this.video.pause();
    
    this.runtime.logAction("VideoPlayer.pause(): paused current audio playback (if running)");

    this.triggerStateChange(STATE_PAUSED);
  },

  play : function(repeatTimes)
  {
    this.video.play();
    
    this.repeatsRemaining = repeatTimes - 1;
    
    this.video.addEventListener("ended", function() 
    { 
      // only repeat if the video hadnt been stopped (_isPlaying == false)
      if ( (service._isPlaying == true) && (service.repeatsRemaining > 0) )
      {
        service.video.play();
        service.repeatsRemaining -= 1;
        
        service.runtime.logAction("VideoPlayer.play(): Playback has completed with repeat times remaining. Repeat times now remaining: "+service.repeatsRemaining);
      }
      // else, trigger playback complete event
      else if ( service.repeatsRemaining < 1 )
      {
        service.triggerStateChange(STATE_COMPLETED);
        service._isPlaying = false;
        service.runtime.logAction("VideoPlayer.play(): Playback of video file has ended with zero repeat times remaining. Setting video state to completed and isPlaying to false.");
      }
      
    }, true);  

    this.runtime.logAction("VideoPlayer.play(): playing loaded video file. Repeat times: "+repeatTimes);

    this.triggerStateChange(STATE_PLAYING);

    this._isPlaying = true;
    this.runtime.logAction("VideoPlayer.play(): isPlaying now set to true");
  },

  resume : function()
  {
    this._isPlaying = true;
    this.runtime.logAction("VideoPlayer.resume(): isPlaying now set to true");
    
    this.video.play();
    
    this.runtime.logAction("VideoPlayer.resume(): resumed current audio playback (if paused)");

    this.triggerStateChange(STATE_PLAYING);
  },

  setWindow : function(domObj, videoElement)
  {
    this.container = domObj;
    this.video = videoElement;

    this.video.src = this.source;
    this.video.setAttribute("controls", "true");
    this.container.appendChild(this.video);

    this.runtime.logAction("VideoPlayer.setWindow(): Set window element with id "+domObj.getAttribute("id"));
  },

  stop : function()
  {
    // do this first to avoid triggering any events relying on this value
    this._isPlaying = false;
    this.runtime.logAction("VideoPlayer.stop(): isPlaying now set to false");

    // pause first, then reload to reset the play position to beginning
    if ( this.video != null )
    {
      this.video.pause();
      this.video.load();
    }
    
    // log it
    this.runtime.logAction("VideoPlayer.stop(): stopped current audio playback");

    this.triggerStateChange(STATE_STOPPED);
  },
  
  triggerStateChange : function(state)
  {
    if ( this.onStateChange != null )
    {
      this.onStateChange.invoke(state);
      this.runtime.logAction("VideoPlayer.onStateChange(): Triggering onStateChange callback: "+state);
    }
  },
  
  reload : function()
  {
    this.repeatsRemaining = 0;
    this._isPlaying = false;
    this.onStateChange = null;
    this.video = null;
    this.container = null;
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

var JILVideoPlayerFactory = { //#
  createInstance: function (aOuter, aIID)
  {
    if (aOuter != null)
      throw Components.results.NS_ERROR_NO_AGGREGATION;
    
    if ( service == null )
      return(new JILVideoPlayer()).QueryInterface(aIID);
    else 
      return(service);
  }
};

/***********************************************************/

var JILVideoPlayerModule = { //#
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
      , "_VideoPlayer_122a"
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
      , "_VideoPlayer_122a"
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
      return JILVideoPlayerFactory; //#

    throw Components.results.NS_ERROR_NO_INTERFACE;
  },

  canUnload: function(aCompMgr) { return true; }
};

/***********************************************************/

function NSGetModule(aCompMgr, aFileSpec) { return JILVideoPlayerModule; } //#