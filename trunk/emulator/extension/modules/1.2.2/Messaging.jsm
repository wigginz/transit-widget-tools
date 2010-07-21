var EXPORTED_SYMBOLS = ["Messaging"];

Components.utils.import("resource://transit-emulator/1.2.2/JIL122aWrapper.jsm");
Components.utils.import("resource://transit-emulator/1.2.2/Account.jsm");
Components.utils.import("resource://transit-emulator/1.2.2/MessageQuantities.jsm");
Components.utils.import("resource://transit-emulator/1.2.2/MessageFolderTypes.jsm");
Components.utils.import("resource://transit-emulator/1.2.2/Message.jsm");
Components.utils.import("resource://transit-emulator/1.2.2/Attachment.jsm");
Components.utils.import("resource://transit-emulator/1.2.2/MessageTypes.jsm");

var _Messaging_122 = Components.classes["@jil.org/jilapi-messaging;1"].getService(Components.interfaces.jilMessaging);

function Messaging()
{
}

Messaging.prototype = function()
{
  
};

Messaging.prototype.Account = function() {};

Messaging.prototype.MessageQuantities = function() {};

Messaging.prototype.MessageFolderTypes = new MessageFolderTypes();

Messaging.prototype.Message = function() {};

Messaging.prototype.Attachment = function() {};

Messaging.prototype.MessageTypes = new MessageTypes();

Messaging.prototype.onMessageArrived = null;

Messaging.prototype.onMessageSendingFailure = null;

Messaging.prototype.onMessagesFound = null;

Messaging.prototype.copyMessageToFolder = function(msg, destinationFolder)
{
  SecurityManager.checkSecurity("Copy Message to Folder (Messaging.copyMessageToFolder)", SecurityManager.OP_SESSION, SecurityManager.OP_BLANKET, SecurityManager.OP_ALLOWED, function()
  {
    _Messaging_122.copyMessageToFolder(msg.updateJIL(), destinationFolder);
  });
};

Messaging.prototype.createFolder = function(messageType, folderName)
{
  SecurityManager.checkSecurity("Create Message Folder (Messaging.createFolder)", SecurityManager.OP_ONE_SHOT, SecurityManager.OP_BLANKET, SecurityManager.OP_ALLOWED, function()
  {
    _Messaging_122.createFolder(messageType, folderName);
  });
};

Messaging.prototype.createMessage = function(messageType)
{
  var jilMessage = _Messaging_122.createMessage(messageType);
  var wrappedMessage = new Widget.Messaging.Message();
  wrappedMessage.setJIL(jilMessage);
  return(wrappedMessage);
};

Messaging.prototype.deleteAllMessages = function(messageType, folderName)
{
  SecurityManager.checkSecurity("Delete All Messages in Folder (Messaging.deleteAllMessages)", SecurityManager.OP_DISALLOWED, SecurityManager.OP_ONE_SHOT, SecurityManager.OP_ALLOWED, function()
  {
    _Messaging_122.deleteAllMessages(messageType, folderName);
  });
};

Messaging.prototype.deleteEmailAccount = function(accountId)
{
  SecurityManager.checkSecurity("Delete Email Account (Messaging.deleteEmailAccount)", SecurityManager.OP_DISALLOWED, SecurityManager.OP_ONE_SHOT, SecurityManager.OP_ALLOWED, function()
  {
    _Messaging_122.deleteEmailAccount(accountId);
  });
};

Messaging.prototype.deleteFolder = function(messageType, folderName)
{
  SecurityManager.checkSecurity("Delete Message Folder (Messaging.deleteFolder)", SecurityManager.OP_DISALLOWED, SecurityManager.OP_ONE_SHOT, SecurityManager.OP_ALLOWED, function()
  {
    _Messaging_122.deleteFolder(messageType, folderName);
  });
};

Messaging.prototype.deleteMessage = function(messageType, folderName, id)
{
  SecurityManager.checkSecurity("Delete Message (Messaging.deleteMessage)", SecurityManager.OP_DISALLOWED, SecurityManager.OP_ONE_SHOT, SecurityManager.OP_ALLOWED, function()
  {
    _Messaging_122.deleteMessage(messageType, folderName, id);
  });
};

Messaging.prototype.findMessages = function(comparisonMsg, folderName, startInx, endInx)
{
  SecurityManager.checkSecurity("Search Messages (Messaging.findMessages)", SecurityManager.OP_SESSION, SecurityManager.OP_BLANKET, SecurityManager.OP_ALLOWED, function()
  {
    _Messaging_122.findMessages(comparisonMsg.updateJIL(), folderName, startInx, endInx);
  });
};

Messaging.prototype.getCurrentEmailAccount = function()
{
  var wrappedAccount = null;
  SecurityManager.checkSecurity("Access Current Email Account (Messaging.getCurrentEmailAccount)", SecurityManager.OP_SESSION, SecurityManager.OP_BLANKET, SecurityManager.OP_ALLOWED, function()
  {
    var jilAccount = _Messaging_122.getCurrentEmailAccount();
    wrappedAccount = new Widget.Messaging.Account();
    wrappedAccount.setJIL(jilAccount);
  });
  return(wrappedAccount);
};

Messaging.prototype.getEmailAccounts = function()
{
  var result = new Array();
  SecurityManager.checkSecurity("Access All Email Accounts (Messaging.getEmailAccounts)", SecurityManager.OP_SESSION, SecurityManager.OP_BLANKET, SecurityManager.OP_ALLOWED, function()
  {
    var accounts = _Messaging_122.getEmailAccounts();
    for ( var i = 0; i < accounts.length; i++ )
    {
      var wrappedAccount = new Widget.Messaging.Account();
      wrappedAccount.setJIL(accounts[i]);
      result.push(wrappedAccount);
    }
  });
  return(result);
};

Messaging.prototype.getFolderNames = function(messageType)
{
  var result = null;
  SecurityManager.checkSecurity("Access All Message Folders (Messaging.getFolderNames)", SecurityManager.OP_SESSION, SecurityManager.OP_BLANKET, SecurityManager.OP_ALLOWED, function()
  {
    result = _Messaging_122.getFolderNames(messageType);
  });
  return(result);
};

Messaging.prototype.getMessage = function(messageType, folderName, index)
{
  var wrappedMessage = null;
  SecurityManager.checkSecurity("Access Message (Messaging.getMessage)", SecurityManager.OP_SESSION, SecurityManager.OP_BLANKET, SecurityManager.OP_ALLOWED, function()
  {
    var jilMessage = _Messaging_122.getMessage(messageType, folderName, index);
    wrappedMessage = new Widget.Messaging.Message();
    wrappedMessage.setJIL(jilMessage);
  });
  return(wrappedMessage);
};

Messaging.prototype.getMessageQuantities = function(messageType, folderName)
{
  var jilQuantities = _Messaging_122.getMessageQuantities(messageType, folderName);
  var wrappedQuantities = new Widget.Messaging.MessageQuantities();
  wrappedQuantities.setJIL(jilQuantities);      
  return(wrappedQuantities);
};

Messaging.prototype.moveMessageToFolder = function(msg, destinationFolder)
{
  SecurityManager.checkSecurity("Move Message to Folder (Messaging.moveMessageToFolder)", SecurityManager.OP_SESSION, SecurityManager.OP_BLANKET, SecurityManager.OP_ALLOWED, function()
  {
    _Messaging_122.moveMessageToFolder(msg.updateJIL(), destinationFolder);
  });
};

Messaging.prototype.sendMessage = function(msg)
{
  SecurityManager.checkSecurity("Send Message (Messaging.sendMessage)", SecurityManager.OP_ONE_SHOT, SecurityManager.OP_BLANKET, SecurityManager.OP_ALLOWED, function()
  {
    _Messaging_122.sendMessage(msg.updateJIL());
  });
};

Messaging.prototype.setCurrentEmailAccount = function(accountId)
{
  SecurityManager.checkSecurity("Set Current Email Account (Messaging.setCurrentEmailAccount)", SecurityManager.OP_SESSION, SecurityManager.OP_ALLOWED, SecurityManager.OP_ALLOWED, function()
  {
    _Messaging_122.setCurrentEmailAccount(accountId);
  });
};