const INTERFACE = Components.interfaces.jilMessaging; //#
const CLASS_ID = Components.ID("9e558061-baa4-11de-8a39-0800200c9a66"); //#
const CLASS_NAME = "JIL API Messaging"; //#
const CONTRACT_ID = "@jil.org/jilapi-messaging;1"; //#

/***********************************************************/

var service = null;

function JILMessaging() //#
{
  this.Account  = Components.classes["@jil.org/jilapi-account;1"].createInstance(Components.interfaces.jilAccount);
  this.MessageTypes  = Components.classes["@jil.org/jilapi-messagetypes;1"].createInstance(Components.interfaces.jilMessageTypes);

  this.runtime = Components.classes["@jil.org/jilapi-emulatorruntime;1"].getService().wrappedJSObject;
  
  service = this;
}

/***********************************************************/

JILMessaging.prototype = //#
{
  Account : null,
  MessageQuantities : null,
  MessageFolderTypes : null,
  Message : null,
  Attachment : null,
  MessageTypes : null,

  onMessageArrived : null,
  onMessageSendingFailure : null,
  onMessagesFound : null,

  runtime : null,
  
  getNewMessage : function()
  {
    return(Components.classes["@jil.org/jilapi-message;1"].createInstance(Components.interfaces.jilMessage));
  },

  copyMessageToFolder : function(msg, destinationFolder)
  {
    // get the folder 
    var pFolder = this.runtime.getMessageFolder(destinationFolder);
    
    // if folder is null, return, dont want an orphan message
    if ( pFolder == null ) 
      return(null);
    
    // create a copy of the message
    var pMessage = this.convertJILToMessage(msg);
    pMessage.folderId = pFolder.id;
    this.runtime.addMessage(pMessage);
    
    this.runtime.logAction("Messaging.copyMessageToFolder(): Message with Id "+msg.messageId+" has been copied to the folder "+destinationFolder);
  },

  createFolder : function(messageType, folderName)
  {
    var folderType = Components.classes["@jil.org/jilapi-messagefoldertypes;1"].createInstance(Components.interfaces.jilMessageFolderTypes).INBOX;
    
    this.runtime.addMessageFolder(folderType, messageType, folderName);
    
    this.runtime.logAction("Messaging.createFolder(): created new folder with name "+folderName+" and message type "+messageType+" as an inbox type folder");
  },

  createMessage : function(messageType)
  {
    var jilMessage = Components.classes["@jil.org/jilapi-message;1"].createInstance(Components.interfaces.jilMessage);
    
    jilMessage.messageType = messageType;
    
    this.runtime.logAction("Messaging.createMessage(): created message of type "+messageType);
        
    return(jilMessage);
  },

  deleteAllMessages : function(messageType, folderName)
  {
    // get the folder
    var pFolder = this.runtime.getMessageFolder(folderName);
    
    // if folder is null, return, dont want an orphan message
    if ( pFolder == null ) 
      return(null);
    
    this.runtime.deleteAllMessagesForFolder(messageType, pFolder);
    
    this.runtime.logAction("Messaging.deleteAllMessages(): deleted all messages of type "+messageType+" in folder "+folderName);
  },

  deleteEmailAccount : function(accountId)
  {
    this.runtime.deleteEmailAccount(accountId);
    
    this.runtime.logAction("Messaging.deleteEmailAccount(): deleted email account with Id "+accountId);
  },

  deleteFolder : function(messageType, folderName)
  {
    // get the folder
    var pFolder = this.runtime.getMessageFolder(folderName);
    
    // if folder is null, return, dont want an orphan message
    if ( pFolder == null ) 
      return(null);
    
    this.runtime.deleteFolder(messageType, pFolder);
    
    this.runtime.logAction("Messaging.deleteFolder(): deleted message folder "+folderName+" and type "+messageType);
  },

  deleteMessage : function(messageType, folderName, id)
  {
    this.runtime.deleteMessage(messageType, folderName, id);
    
    this.runtime.logAction("Messaging.deleteMessage(): deleted message with id "+id+". Type and folder are irrelevant since message Ids are completely unique in this runtime.");
  },

  findMessages : function(comparisonMsg, folderName, startInx, endInx)
  {
    // get the thread manager and tell it to use the callback 
    var tm = Components.classes["@mozilla.org/thread-manager;1"].getService(Components.interfaces.nsIThreadManager);

    tm.mainThread.dispatch(
    {
      run: function()
      {
        var rtMessages = Components.classes["@jil.org/jilapi-emulatorruntime;1"].getService().wrappedJSObject.findMessages(comparisonMsg, folderName, startInx, endInx);
        
        this.runtime.logAction("Messaging.findMessages(): found "+rtMessages.length+" messages from search");
        
        var jilMessages = new Array();
        for ( var i = 0; i < rtMessages.length; i++ )
          jilMessages.push(service.convertMessageToJIL(rtMessages[i]));
        
        if ( service.onMessagesFound == null )
          Components.classes["@jil.org/jilapi-emulatorruntime;1"].getService().wrappedJSObject.logAction("Messaging.findMessages(): No callback function set, no where to send results.");
        else
        {
          var count = {value: jilMessages.length};
          service.onMessagesFound.invoke(jilMessages, folderName, jilMessages.length);
        }
      }
    }, Components.interfaces.nsIThread.DISPATCH_NORMAL);    
  },

  getCurrentEmailAccount : function()
  {
    var curAccount = Components.classes["@jil.org/jilapi-account;1"].createInstance(Components.interfaces.jilAccount);

    var intAccount = this.runtime.getDefaultEmailAccount();
    curAccount.accountName = intAccount.name;
    curAccount.accountId = intAccount.id;

    this.runtime.logAction("Messaging.getCurrentEmailAccount(): returning default email account with Id: "+curAccount.accountId);

    return(curAccount);
  },

  getEmailAccounts : function(count, retv)
  {
    var intAccounts = this.runtime.getEmailAccounts();
    var curAccounts = new Array();

    for ( var i = 0; i < intAccounts.length; i++ )
    {
      var account = Components.classes["@jil.org/jilapi-account;1"].createInstance(Components.interfaces.jilAccount);
      account.accountName = intAccounts[i].name;
      account.accountId = intAccounts[i].id;
      curAccounts.push(account);
    }    
    
    count.value = curAccounts.length;
    this.runtime.logAction("Messaging.getEmailAccounts(): returning "+curAccounts.length+" email accounts.");

    return(curAccounts);
  },

  getFolderNames : function(messageType, count, retv)
  {
    var folderNames = this.runtime.getFolderNames(messageType);
    count.value = folderNames.length;
    
    this.runtime.logAction("Messaging.getFolderNames(): returning "+folderNames.length+" folder names for message type "+messageType);
    
    return(folderNames);
  },

  getMessage : function(messageType, folderName, index)
  {
    // I dont get the whole index thing, I'm assuming it's the position in the list or messages ordered by date descending (typical inbox)
    var message = this.runtime.getMessageByIndex(messageType, folderName, index);
    
    if ( message == null )
      return(null);
dump(message.toAddress);
    var jilMessage = this.convertMessageToJIL(message);
dump(jilMessage.getDestinationAddress());    
    this.runtime.logAction("Messaging.getMessage(): returning message with id: "+index);
    
    return(jilMessage);
  },

  getMessageQuantities : function(messageType, folderName)
  {
    var pFolder = this.runtime.getMessageFolder(folderName);
    
    if ( pFolder == null )
      return(null);
    
    var messageCount = this.runtime.getMessageCount(messageType, pFolder);
    
    var quantities = Components.classes["@jil.org/jilapi-messagequantities;1"].createInstance(Components.interfaces.jilMessageQuantities);
    
    quantities.totalMessageCnt = messageCount.total;
    quantities.totalMessageReadCnt = messageCount.read;
    quantities.totalMessageUnreadCnt = messageCount.unread;
    
    this.runtime.logAction("Messaging.getMessageQuantities(): returning message count for folder "+folderName+" and type "+messageType);
    
    return(quantities);
  },

  moveMessageToFolder : function(msg, destinationFolder)
  {
    var pFolder = this.runtime.getMessageFolder(destinationFolder);
    
    if ( pFolder == null )
      return(null);
    
    this.runtime.moveMessage(msg.messageId, pFolder); 
    this.runtime.logAction("Messaging.moveMessageToFolder(): moved message id "+msg.messageId+" to folder "+destinationFolder);
  },

  sendMessage : function(msg)
  {
    this.alert("Messaging.sendMessage(): emulating send action for message with subject '"+msg.subject+"' and destination address '"+msg.destinationAddress+"'");
    
    this.runtime.logAction("Messaging.sendMessage(): emulating send action for message with subject '"+msg.subject+"' and destination address '"+msg.destinationAddress+"'");
  },

  setCurrentEmailAccount : function(accountId)
  {
    this.runtime.setDefaultEmailAccount(accountId);

    this.runtime.logAction("Messaging.setCurrentEmailAccount(): setting account id: "+accountId+"  as default account for this messaging profile.");
  },
  
  convertJILToMessage : function(jilMessage)
  {
    // convert address arrays to semi colon separated strings 
    var toString = this.getAsString(jilMessage.getDestinationAddress());
    var ccString = this.getAsString(jilMessage.getCcAddress());
    var bccString = this.getAsString(jilMessage.getBccAddress());
    
    // attachments to file paths
    var attachmentString = this.getAsString(jilMessage.getAttachments());
    
    var profileMessage = 
    {
      id : jilMessage.messageId,
      toAddress : toString,
      sourceAddress : jilMessage.sourceAddress,
      subject : jilMessage.subject,
      ccAddress : ccString,
      bccAddress : bccString,
      priority : jilMessage.messagePriority,
      isRead : jilMessage.isRead,
      callback : jilMessage.callbackNumber,
      date : jilMessage.time,
      validity : jilMessage.validityPeriodHours,
      body : jilMessage.body,
      type : jilMessage.messageType,
      attachments : attachmentString,
    };
    return(profileMessage);
  },
  
  convertMessageToJIL : function(message)
  {
    // convert address arrays to semi colon separated strings 
    var toArray = this.getAsArray(message.toAddress);
    var ccArray = this.getAsArray(message.ccAddress);
    var bccArray = this.getAsArray(message.bccAddress);
    
    // attachments to file paths
    var attachmentArray = this.getAsArray(message.attachments);
    
    var jilMessage = Components.classes["@jil.org/jilapi-message;1"].createInstance(Components.interfaces.jilMessage);

    jilMessage.messageId = message.id;
    jilMessage.setDestinationAddress(toArray.length, toArray);
    jilMessage.sourceAddress = message.sourceAddress;
    jilMessage.subject = message.subject;
    jilMessage.setCcAddress(ccArray.length, ccArray);
    jilMessage.setBccAddress(bccArray.length, bccArray);
    jilMessage.messagePriority = message.priority;
    jilMessage.isRead = message.isRead;
    jilMessage.callbackNumber = message.callback;
    jilMessage.time = message.date;
    jilMessage.validityPeriodHours = message.validity;
    jilMessage.body = message.body;
    jilMessage.messageType = message.type;
    jilMessage.setAttachments(attachmentArray.length, attachmentArray);    
    return(jilMessage);
  },
  
  getAsArray : function(list)
  {
    if ( list == null )
      return(new Array());
    
    return(list.split(";"));
  },
  
  getAsString : function(list)
  {
    if ( list == null )
      return(null);
    
    var asString = "";
    for ( var i = 0; i < list.length; i++ )
      asString += list[i]+";";
    
    // remove the last char
    if ( asString.length > 0 )
      asString = asString.substr(0, asString.length-1);
    
    return(asString);
  },
  
  reload : function()
  {
    this.onMessageArrived = null;
    this.onMessageSendingFailure = null;
    this.onMessagesFound = null;
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

var JILMessagingFactory = { //#
  createInstance: function (aOuter, aIID)
  {
    if (aOuter != null)
      throw Components.results.NS_ERROR_NO_AGGREGATION;
    
    if ( service == null )
      return(new JILMessaging()).QueryInterface(aIID);
    else 
      return(service);
  }
};

/***********************************************************/

var JILMessagingModule = { //#
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
      , "_Messaging_122a"
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
      , "_Messaging_122a"
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
      return JILMessagingFactory; //#

    throw Components.results.NS_ERROR_NO_INTERFACE;
  },

  canUnload: function(aCompMgr) { return true; }
};

/***********************************************************/

function NSGetModule(aCompMgr, aFileSpec) { return JILMessagingModule; } //#