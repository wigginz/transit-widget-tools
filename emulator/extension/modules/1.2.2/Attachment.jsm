var EXPORTED_SYMBOLS = ["Attachment"];

var _Messaging_122 = Components.classes["@jil.org/jilapi-messaging;1"].getService(Components.interfaces.jilMessaging);

function Attachment()
{
}

Attachment.prototype = function()
{  
};

Attachment.prototype.toString = function()
{
  return("Widget.Messaging.Attachment");
}; 

Attachment.prototype._jilAttachment = null;

Attachment.prototype.fileName = null;

Attachment.prototype.MIMEType = null;

Attachment.prototype.size = null;

Attachment.prototype.setJIL = function(jilAttachment)
{
  this.fileName = jilAttachment.fileName;
  this.MIMEType = jilAttachment.MIMEType;
  this.size = jilAttachment.size;
  this._jilAttachment = jilAttachment;
};

Attachment.prototype.updateJIL = function()
{
  if ( this._jilAttachment == null )
    this._jilAttachment = _Messaging_122.getNewAttachment();
  
  this._jilAttachment.fileName = this.fileName;
  this._jilAttachment.MIMEType = this.MIMEType;
  this._jilAttachment.size = this.size;
  return(this._jilAttachment);
};