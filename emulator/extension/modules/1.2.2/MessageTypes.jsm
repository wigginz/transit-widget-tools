var EXPORTED_SYMBOLS = ["MessageTypes"];

var _MessageTypes_122 = Components.classes["@jil.org/jilapi-messagetypes;1"].createInstance(Components.interfaces.jilMessageTypes);

function MessageTypes()
{
}

MessageTypes.prototype = function()
{
  
};

MessageTypes.prototype.EmailMessage = _MessageTypes_122.EmailMessage;

MessageTypes.prototype.MMSMessage = _MessageTypes_122.MMSMessage;

MessageTypes.prototype.SMSMessage = _MessageTypes_122.SMSMessage;