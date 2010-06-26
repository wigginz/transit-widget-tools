const INTERFACE = Components.interfaces.jilTelephony;
const CLASS_ID = Components.ID("f07d48a0-ba86-11de-8a39-0800200c9a66");
const CLASS_NAME = "JIL API Telephony";
const CONTRACT_ID = "@jil.org/jilapi-telephony;1";

/***********************************************************/

var service = null;

function JILTelephony() 
{
  this.CallRecordTypes  = Components.classes["@jil.org/jilapi-callrecordtypes;1"].createInstance(Components.interfaces.jilCallRecordTypes);
  this.CallRecord  = Components.classes["@jil.org/jilapi-callrecord;1"].createInstance(Components.interfaces.jilCallRecord);
  
  this.runtime = Components.classes["@jil.org/jilapi-emulatorruntime;1"].getService().wrappedJSObject;
   
  service = this;
}

/***********************************************************/

JILTelephony.prototype = 
{
  CallRecordTypes : null,
  CallRecord : null,

  onCallEvent : null,
  onCallRecordsFound : null,
  
  runtime : null,
  
  ts : null,

  deleteAllCallRecords : function(callRecordType)
  {
    this.runtime.deleteAllCallRecords(callRecordType);
    
    this.runtime.logAction("Telephony.deleteAllCallRecords(): all call records of type "+callRecordType+" were deleted.");
  },

  deleteCallRecord : function(callRecordType, id)
  {
    this.runtime.deleteCallRecord(callRecordType, id);
    
    this.runtime.logAction("Telephony.deleteCallRecord(): call records of type "+callRecordType+" and id "+id+" was deleted (if it existed).");
  },

  findCallRecords : function(comparisonRecord, startInx, endInx)
  {
    dump(comparisonRecord.QueryInterface(Components.interfaces.jilCallRecord));
    
    // get the thread manager and tell it to use the callback 
    var tm = Components.classes["@mozilla.org/thread-manager;1"].getService(Components.interfaces.nsIThreadManager);

    tm.mainThread.dispatch(
    {
      run: function()
      {
        var rtRecords = Components.classes["@jil.org/jilapi-emulatorruntime;1"].getService().wrappedJSObject.findCallRecords(service.convertJILToRecord(comparisonRecord), startInx, endInx);
        
        var jilRecords = new Array();
        for ( var i = 0; i < rtRecords.length; i++ )
          jilRecords.push(service.convertRecordToJIL(rtRecords[i]));
        
        if ( service.onCallRecordsFound == null )
          Components.classes["@jil.org/jilapi-emulatorruntime;1"].getService().wrappedJSObject.logAction("Telephony.findCallRecords(): No callback function set, no where to send results.");
        else
          service.onCallRecordsFound.invoke(jilRecords, jilRecords.length);
      }
    }, Components.interfaces.nsIThread.DISPATCH_NORMAL);    
  },

  getCallRecord : function(callRecordType, id)
  {
    var record = this.runtime.getCallRecord(callRecordType, id);
    var jilRecord = this.convertRecordToJIL(record);
    
    this.runtime.logAction("Telephony.getCallRecord(): retrieving call record of type "+callRecordType+" and id "+id+" (if it existed).");
    
    return(jilRecord);
  },

  getCallRecordCnt : function(callRecordType)
  {
    var count = this.runtime.getCallRecordCount(callRecordType);
    
    this.runtime.logAction("Telephony.getCallRecordCnt(): count of "+count+" for call records of type "+callRecordType);
    
    return(count);
  },

  initiateVoiceCall : function(phoneNumber)
  {
    this.runtime.logAction("Telephony.initiateVoiceCall(): simulating voice call to: "+phoneNumber);
    
    this.alert("Simulating voice call to: "+phoneNumber);
  },

  reload : function()
  {
    this.onCallEvent = null;
    this.onCallRecordsFound = null;
  },
  
  createCallRecord : function()
  {
    return(Components.classes["@jil.org/jilapi-callrecord;1"].createInstance(Components.interfaces.jilCallRecord));
  },
  
  convertRecordToJIL : function(record)
  {
    var jilRecord = Components.classes["@jil.org/jilapi-callrecord;1"].createInstance(Components.interfaces.jilCallRecord);
    
    jilRecord.callRecordAddress = record.address;
    jilRecord.callRecordId = record.id;
    jilRecord.callRecordName = record.name;
    jilRecord.callRecordType = record.type;
    jilRecord.durationSeconds = record.durationSeconds;
    jilRecord.startTime = record.startTime;
    
    return(jilRecord);
  },
  
  convertJILToRecord : function(jilRecord)
  {
    var record = 
    {
      id : jilRecord.callRecordId,
      address : jilRecord.callRecordAddress,
      name : jilRecord.callRecordName,
      type : jilRecord.callRecordType,
      durationSeconds : jilRecord.durationSeconds,
      startTime : jilRecord.startTime,
    };
    return(record);
  },

  alert: function(aMsg){
    var promptService = 
      Components.classes["@mozilla.org/embedcomp/prompt-service;1"]
        .getService(Components.interfaces.nsIPromptService);
    promptService.alert(null, "JIL Debug", aMsg);
    promptService = null; 
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

var JILTelephonyFactory = {
  createInstance: function (aOuter, aIID)
  {
    if (aOuter != null)
      throw Components.results.NS_ERROR_NO_AGGREGATION;
    
    if ( service == null )
      return(new JILTelephony()).QueryInterface(aIID);
    else 
      return(service);
  },
};

/***********************************************************/

var JILTelephonyModule = {
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
      , "_Telephony_122a"
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
      , "_Telephony_122a"
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
      return JILTelephonyFactory;

    throw Components.results.NS_ERROR_NO_INTERFACE;
  },

  canUnload: function(aCompMgr) { return true; }
};

/***********************************************************/

function NSGetModule(aCompMgr, aFileSpec) { return JILTelephonyModule; }