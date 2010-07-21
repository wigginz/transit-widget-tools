var EXPORTED_SYMBOLS = ["CallRecord"];

var _Telephony_122 = Components.classes["@jil.org/jilapi-telephony;1"].getService(Components.interfaces.jilTelephony);

function CallRecord()
{
}

CallRecord.prototype = function()
{
  
};

CallRecord.prototype._jilCallRecord = null;

CallRecord.prototype.callRecordAddress = null;

CallRecord.prototype.callRecordId = null;

CallRecord.prototype.callRecordName = null;

CallRecord.prototype.callRecordType = null;

CallRecord.prototype.durationSeconds = null;

CallRecord.prototype.startTime = null;

CallRecord.prototype.setJIL = function(jilCallRecord)
{
  this.callRecordAddress = jilCallRecord.callRecordAddress;
  this.callRecordId = jilCallRecord.callRecordId;
  this.callRecordName = jilCallRecord.callRecordName;
  this.callRecordType = jilCallRecord.callRecordType;
  this.durationSeconds = jilCallRecord.durationSeconds;
  this.startTime = jilCallRecord.startTime;
  this._jilCallRecord = jilCallRecord;
};

CallRecord.prototype.updateJIL = function()
{
  if ( this._jilCallRecord == null )
    this._jilCallRecord = _Telephony_122.createCallRecord();

  this._jilCallRecord.callRecordAddress = this.callRecordAddress;
  this._jilCallRecord.callRecordId = this.callRecordId;
  this._jilCallRecord.callRecordName = this.callRecordName;
  this._jilCallRecord.callRecordType = this.callRecordType;
  this._jilCallRecord.durationSeconds = this.durationSeconds;
  this._jilCallRecord.startTime = this.startTime;
  return(this._jilCallRecord);
};