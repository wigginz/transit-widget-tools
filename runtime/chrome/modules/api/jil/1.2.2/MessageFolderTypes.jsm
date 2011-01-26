var EXPORTED_SYMBOLS = ["MessageFolderTypes"];

var _MessageFolderTypes_122 = Components.classes["@jil.org/jilapi-messagefoldertypes;1"].createInstance(Components.interfaces.jilMessageFolderTypes);

function MessageFolderTypes()
{
}

MessageFolderTypes.prototype = function()
{  
};

MessageFolderTypes.prototype.toString = function()
{
  return("Widget.Messaging.MessageFolderTypes");
};  

MessageFolderTypes.prototype.DRAFTS = _MessageFolderTypes_122.DRAFTS;

MessageFolderTypes.prototype.INBOX = _MessageFolderTypes_122.INBOX;

MessageFolderTypes.prototype.OUTBOX = _MessageFolderTypes_122.OUTBOX;

MessageFolderTypes.prototype.SENTBOX = _MessageFolderTypes_122.SENTBOX;