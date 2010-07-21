var EXPORTED_SYMBOLS = ["Message"];

Components.utils.import("resource://transit-emulator/1.2.2/JIL122aWrapper.jsm");

var _Messaging_122 = Components.classes["@jil.org/jilapi-messaging;1"].getService(Components.interfaces.jilMessaging);

function Message()
{
}

Message.prototype = function()
{
  
};

Message.prototype._jilMessage = null;

Message.prototype.attachments = null;

Message.prototype.bccAddress = null;

Message.prototype.body = null;

Message.prototype.callbackNumber = null;

Message.prototype.ccAddress = null;

Message.prototype.destinationAddress = null;

Message.prototype.isRead = null;

Message.prototype.messageId = null;

Message.prototype.messagePriority = null;

Message.prototype.messageType = null;

Message.prototype.sourceAddress = null;

Message.prototype.subject = null;

Message.prototype.time = null;

Message.prototype.validityPeriodHours = null;

Message.prototype.updateAddress = function(type, address)
{
  if ( type == "cc" )
    this.ccAddress = this._jilMessage.getCcAddress();
  else if ( type == "bcc" )
    this.bccAddress = this._jilMessage.getBccAddress();
  else if ( type == "destination" )
    this.destinationAddress = this._jilMessage.getDestinationAddress();
};

Message.prototype.addAddress = function(type, address)
{
  this.updateJIL();
  this._jilMessage.addAddress(type, address);
  this.updateAddress(type);
};

Message.prototype.addAttachment = function(fileFullName)
{
  this.updateJIL();
  this._jilMessage.addAttachment(fileFullName);
  this.attachments = this._jilMessage.getAttachments();
};

Message.prototype.deleteAddress = function(type, address)
{
  var allowed = false;
  SecurityManager.checkSecurity("Remove Message Recipient (Message.deleteAddress)", SecurityManager.OP_DISALLOWED, SecurityManager.OP_ONE_SHOT, SecurityManager.OP_ALLOWED, function()
  {
    allowed = true;
  });
  
  if ( allowed )
  {
    this.updateJIL();
    this._jilMessage.deleteAddress(type, address);
    this.updateAddress(type);
  }
};

Message.prototype.deleteAttachment = function(attachment)
{
  SecurityManager.checkSecurity("Remove Message Attachment (Message.deleteAttachment)", SecurityManager.OP_DISALLOWED, SecurityManager.OP_ONE_SHOT, SecurityManager.OP_ALLOWED, function()
  {
    this.updateJIL();
    this._jilMessage.deleteAttachment(attachment.updateJIL());
    this.attachments = this._jilMessage().getAttachments();
  });
};

Message.prototype.saveAttachment = function(fileFullName, attachment)
{
  SecurityManager.checkSecurity("Save Message Attachment (Message.saveAttachment)", SecurityManager.OP_ONE_SHOT, SecurityManager.OP_SESSION, SecurityManager.OP_BLANKET, function()
  {
    this.updateJIL();
    this._jilMessage.saveAttachment(fileFullName, attachment.updateJIL());
    this.attachments = this._jilMessage.getAttachments();
  });
};

Message.prototype.update = function()
{
  this.updateJIL().update();
};

Message.prototype.setJIL = function(jilMessage)
{
  this.attachments = jilMessage.getAttachments();
  this.bccAddress = jilMessage.getBccAddress();
  this.ccAddress = jilMessage.getCcAddress();
  this.destinationAddress = jilMessage.getDestinationAddress();
  
  this.body = jilMessage.body;
  this.callbackNumber = jilMessage.callbackNumber;
  this.isRead = jilMessage.isRead;
  this.messageId = jilMessage.messageId;
  this.messagePriority = jilMessage.messagePriority;
  this.messageType = jilMessage.messageType;
  this.sourceAddress = jilMessage.sourceAddress;
  this.subject = jilMessage.subject;
  
  this.time = new Date();
  this.time.setTime(jilMessage.time);
  
  this.validityPeriodHours = jilMessage.validityPeriodHours;
  this._jilMessage = jilMessage;
};

Message.prototype.updateJIL = function()
{               
  if ( this._jilMessage == null )
    this._jilMessage = _Messaging_122.getNewMessage();
  
  if ( this.attachments != null )
    this._jilMessage.setAttachments(this.attachments.length, this.attachments);
  if ( this.bccAddress != null )
    this._jilMessage.setBccAddress(this.bccAddress.length, this.bccAddress);
  if ( this.ccAddress != null )
    this._jilMessage.setCcAddress(this.ccAddress.length, this.ccAddress);
  
  if ( this.destinationAddress != null )
    this._jilMessage.setDestinationAddress(this.destinationAddress.length, this.destinationAddress);
  
  this._jilMessage.body = this.body;
  this._jilMessage.callbackNumber = this.callbackNumber;        
  this._jilMessage.isRead = this.isRead;
  this._jilMessage.messageId = this.messageId;
  this._jilMessage.messagePriority = this.messagePriority;
  this._jilMessage.messageType = this.messageType;
  this._jilMessage.sourceAddress = this.sourceAddress;
  this._jilMessage.subject = this.subject;
  
  if ( this.time != null )
    this._jilMessage.time = this.time.getTime();
  
  this._jilMessage.validityPeriodHours = this.validityPeriodHours;
  return(this._jilMessage);
};