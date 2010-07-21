var EXPORTED_SYMBOLS = ["CallRecordTypes"];

var _CallRecordTypes_122 = Components.classes["@jil.org/jilapi-callrecordtypes;1"].createInstance(Components.interfaces.jilCallRecordTypes);

function CallRecordTypes()
{
}

CallRecordTypes.prototype = function()
{
  
};

CallRecordTypes.prototype.MISSED = _CallRecordTypes_122.MISSED;

CallRecordTypes.prototype.OUTGOING = _CallRecordTypes_122.OUTGOING;

CallRecordTypes.prototype.RECEIVED = _CallRecordTypes_122.RECEIVED;