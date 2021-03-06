const INTERFACE = Components.interfaces.jilMessaging; //#
const CLASS_ID = Components.ID("9e558061-baa4-11de-8a39-0800200c9a66"); //#
const CLASS_NAME = "JIL API Messaging"; //#
const CONTRACT_ID = "@jil.org/jilapi-messaging;1"; //#

/***********************************************************/

var service = null;

function JILMessaging() //#
{
  Components.utils.import("resource://transit-runtime/TransitCommon.jsm");
  
  this.Account  = Components.classes["@jil.org/jilapi-account;1"].createInstance(Components.interfaces.jilAccount);
  this.MessageTypes  = Components.classes["@jil.org/jilapi-messagetypes;1"].createInstance(Components.interfaces.jilMessageTypes);
  this.MessageFolderTypes  = Components.classes["@jil.org/jilapi-messagefoldertypes;1"].createInstance(Components.interfaces.jilMessageFolderTypes);

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
  
  getNewAccount : function()
  {
    return(Components.classes["@jil.org/jilapi-account;1"].createInstance(Components.interfaces.jilAccount));
  },
  
  getNewAttachment : function()
  {
    return(Components.classes["@jil.org/jilapi-attachment;1"].createInstance(Components.interfaces.jilAttachment));
  },

  copyMessageToFolder : function(msg, destinationFolder)
  {
    // get the folder 
    var pFolder = this.runtime.getMessageFolder(destinationFolder);
    
    // if folder is null, return, dont want an orphan message
    if ( pFolder == null ) 
      return(null);
    
    // create a copy of the message
    var pMessage = TransitCommon.convertJILToMessage(msg);
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
        
        service.runtime.logAction("Messaging.findMessages(): found "+rtMessages.length+" messages from search. Returning start "+startInx+" to end "+endInx);
        
        TransitCommon.debug("Returning messages from start "+startInx+" and end "+endInx);
        rtMessages = rtMessages.splice(startInx, endInx);
        
        var jilMessages = new Array();
        for ( var i = 0; i < rtMessages.length; i++ )
          jilMessages.push(TransitCommon.convertMessageToJIL(rtMessages[i]));
        
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
    
    var jilMessage = TransitCommon.convertMessageToJIL(message);
    
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
    TransitCommon.alert("Messaging.sendMessage(): emulating send action for message with subject '"+msg.subject+"' and destination address '"+msg.getDestinationAddress()+"'");
    
    this.runtime.logAction("Messaging.sendMessage(): emulating send action for message with subject '"+msg.subject+"' and destination address '"+msg.getDestinationAddress()+"'");
    
    // put the message in the sent folder(s) of the current account
    // get the sent folders for this type
    var folders = this.runtime.getMessageFolders();
    TransitCommon.debug("Adding sent message to all sentbox type folders for this message type. If email, will only copy for sentbox of current email account.");
    var rMessage = TransitCommon.convertJILToMessage(msg);
    
    for ( var i = 0; i < folders.length; i++ )
    {
      if ( (folders[i].messageType == msg.messageType) &&
           (folders[i].type == this.MessageFolderTypes.SENTBOX) 
         )
      {
        TransitCommon.debug("Folder is of message type "+folders[i].messageType+", and folder type "+folders[i].type);
        
        // see if this is an email message, if so, only copy to the current account
        if ( msg.messageType == this.MessageTypes.EmailMessage )
        {
          if ( folders[i].emailAccountId != this.runtime.getDefaultEmailAccount().id )
          {
            TransitCommon.debug("Folder does not belong to the current email account, skipping.");
            continue;
          }
          TransitCommon.debug("Folder is of the current email account, adding the message to folder id "+folders[i].id);
        }
        // update it so it's in the DB
        TransitCommon.debug("Adding message to folder id "+folders[i].id);
        this.runtime.logAction("Messaging.sendMessage(): Adding sent message to the sentbox called "+folders[i].name +" for message type "+msg.messageType);
        rMessage.folderId = folders[i].id;
        this.runtime.updateMessage(rMessage);
      }
    }
  },

  setCurrentEmailAccount : function(accountId)
  {
    this.runtime.setDefaultEmailAccount(accountId);

    this.runtime.logAction("Messaging.setCurrentEmailAccount(): setting account id: "+accountId+"  as default account for this messaging profile.");
  },
  
  reload : function()
  {
    this.onMessageArrived = null;
    this.onMessageSendingFailure = null;
    this.onMessagesFound = null;
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