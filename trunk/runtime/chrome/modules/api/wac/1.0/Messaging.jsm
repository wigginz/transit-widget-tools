var EXPORTED_SYMBOLS = ["Messaging"];

Components.utils.import("resource://transit-runtime/api/wac/SecurityManager.jsm");
Components.utils.import("resource://transit-runtime/api/wac/1.0/MessageTypes.jsm");
Components.utils.import("resource://transit-runtime/api/wac/1.0/Message.jsm");

var _Messaging_122 = Components.classes["@jil.org/jilapi-messaging;1"].getService(Components.interfaces.jilMessaging);

function Messaging()
{
  this.onMessageSendingFailure = null;
}

Messaging.prototype = function()
{
};

Messaging.prototype.toString = function()
{
  return("Widget.Messaging");
};

Messaging.prototype.MessageTypes = new MessageTypes();

Messaging.prototype.onMessageSendingFailure = null;

Messaging.prototype.createMessage = function(messageType)
{
  var jilMessage = _Messaging_122.createMessage(messageType);
  var wrappedMessage = new Message();
  wrappedMessage.setJIL(jilMessage);
  return(wrappedMessage);
};

Messaging.prototype.sendMessage = function(msg)
{
  SecurityManager.checkSecurity("Send Message (Messaging.sendMessage)", SecurityManager.OP_ONE_SHOT, SecurityManager.OP_BLANKET, SecurityManager.OP_ALLOWED, function()
  {
    _Messaging_122.sendMessage(msg.updateJIL());
  });
};