const INTERFACE = Components.interfaces.jilMessage; //#
const CLASS_ID = Components.ID("20e45300-baa8-11de-8a39-0800200c9a66"); //#
const CLASS_NAME = "JIL API Message"; //#
const CONTRACT_ID = "@jil.org/jilapi-message;1"; //#

/***********************************************************/

function JILMessage() //#
{    
  Components.utils.import("resource://transit-emulator/TransitCommon.jsm");
  
  this.runtime = Components.classes["@jil.org/jilapi-emulatorruntime;1"].getService().wrappedJSObject;
}

/***********************************************************/

JILMessage.prototype = //#
{
  attachments         : new Array(),
  bccAddress          : new Array(),
  ccAddress           : new Array(),
  destinationAddress  : new Array(),
  
  getAttachments : function(count, retv)
  {
    count.value = this.attachments.length;
    return(this.attachments);
  },
  
  setAttachments : function(count, argv)
  {
    this.attachments = argv;
  },

  getBccAddress : function(count, retv)
  {
    count.value = this.bccAddress.length;
    return(this.bccAddress);
  },
  
  setBccAddress : function(count, argv)
  {
    this.bccAddress = argv;
  },
  
  getCcAddress : function(count, retv)
  {
    count.value = this.ccAddress.length;
    return(this.ccAddress);
  },
  
  setCcAddress : function(count, argv)
  {
    this.ccAddress = argv;
  },
  
  getDestinationAddress : function(count, retv)
  {
    count.value = this.destinationAddress.length;
    return(this.destinationAddress);
  },
  
  setDestinationAddress : function(count, argv)
  {
    this.destinationAddress = argv;
  },
  
  body                : null,
  callbackNumber      : null,
  isRead              : true, // default is supposed to be true
  messageId           : null,
  messagePriority     : null,
  messageType         : null,
  sourceAddress       : null,
  subject             : null,
  time                : null,
  validityPeriodHours : null,

  ccType : "cc",
  bccType : "bcc",
  destinationType : "destination",
  
  runtime : null,

  addAddress : function(type, address)
  {    
    if ( this.ccAddress == null )
      this.ccAddress = new Array();
    
    if ( this.bccAddress == null )
      this.bccAddress = new Array();
    
    if ( this.destinationAddress == null )
      this.destinationAddress = new Array();
    
    if ( type == this.ccType )
      this.ccAddress.push(address);
    
    else if ( type == this.bccType )
      this.bccAddress.push(address);
    
    else if ( type == this.destinationType )
      this.destinationAddress.push(address);
    
    this.runtime.logAction("Message.addAddress(): added address "+address+" to destination type "+type);
  },

  addAttachment : function(fileFullName)
  {
    if ( this.attachments == null )
      this.attachments = new Array();
    
    // get the file as an attachment object
    this.attachments[fileFullName] = null;
    
    this.runtime.logAction("Message.addAttachment(): added attachment with file name: "+fileFullName);
  },

  deleteAddress : function(type, address)
  {
    if ( type == this.ccType )
      this.ccAddress = this.remove(this.ccAddress, address);
    
    else if ( type == this.bccType )
      this.bccAddress = this.remove(this.bccAddress, address);
    
    else if ( type == this.destinationType )
      this.destinationAddress = this.remove(this.destinationAddress, address);
    
    this.runtime.logAction("Message.addAddress(): deleted address "+address+" of type "+type+"from message");
  },
  
  remove : function(array, element)
  {
    for ( var i = 0; i < array.length; i++ )
    {
      if ( array.length[i] == element )
        array.splice(i, 1);
    }    
    return(array);
  },

  deleteAttachment : function(attachment)
  {
    this.attachments.remove[attachment.fileName];
    
    this.runtime.logAction("Message.deleteAttachment(): deleted attachment with file name: "+fileFullName);
  },

  saveAttachment : function(fileFullName, attachment)
  {
    // essentially saving an attachment is a copy. There must exist an original file
    // pointed to by the attachment object. since attachment objects are only pointers
    // and do not encapsulate an actual file
    if ( this.runtime.copyFile(attachment.fileName, fileFullName, false) )
    {
       this.runtime.logAction("Message.saveAttachment(): successfully saved (copied) file in attachment "+attachment.fileName+" to "+fileFullName+", existing attachment file untouched.");
      return(true);
    }
    else
    {
      this.runtime.logAction("Message.saveAttachment(): failed to save (copy) attachment file "+attachment.fileName+" to "+fileFullName);
      return(false);
    }
  },
  
  update : function()
  {
    var pMessage = TransitCommon.convertJILToMessage(this);
    this.runtime.updateMessage(pMessage);
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

var JILMessageFactory = { //#
  createInstance: function (aOuter, aIID)
  {
    if (aOuter != null)
      throw Components.results.NS_ERROR_NO_AGGREGATION;
    return (new JILMessage()).QueryInterface(aIID); //#
  }
};

/***********************************************************/

var JILMessageModule = { //#
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
      , "_Message_122a"
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
      , "_Message_122a"
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
      return JILMessageFactory; //#

    throw Components.results.NS_ERROR_NO_INTERFACE;
  },

  canUnload: function(aCompMgr) { return true; }
};

/***********************************************************/

function NSGetModule(aCompMgr, aFileSpec) { return JILMessageModule; } //#