var EXPORTED_SYMBOLS = ["Telephony"];

var _Telephony_122 = Components.classes["@jil.org/jilapi-telephony;1"].getService(Components.interfaces.jilTelephony);

Components.utils.import("resource://transit-emulator/1.2.2/SecurityManager.jsm");

Components.utils.import("resource://transit-emulator/1.0/CallRecordTypes.jsm");
Components.utils.import("resource://transit-emulator/1.0/CallRecord.jsm");

function Telephony()
{
  this.onCallEvent = null;
  this.onCallRecordsFound = null;
}

Telephony.prototype = function()
{
};

Telephony.prototype.toString = function()
{
  return("Widget.Telephony");
};

Telephony.prototype.CallRecordTypes = new CallRecordTypes();

Telephony.prototype.onCallEvent = null;

Telephony.prototype.onCallRecordsFound = null;

Telephony.prototype.deleteAllCallRecords = function(callRecordType)
{
  SecurityManager.checkSecurity("Remove Call Records (Telephony.deleteAllCallRecords)", SecurityManager.OP_DISALLOWED, SecurityManager.OP_SESSION, SecurityManager.OP_ALLOWED, function()
  {
    _Telephony_122.deleteAllCallRecords(callRecordType);
  });
};

Telephony.prototype.deleteCallRecord = function(callRecordType, id)
{
  SecurityManager.checkSecurity("Remove Call Record (Telephony.deleteCallRecord)", SecurityManager.OP_ONE_SHOT, SecurityManager.OP_SESSION, SecurityManager.OP_ALLOWED, function()
  {
    _Telephony_122.deleteCallRecord(callRecordType, id);
  });
};

Telephony.prototype.findCallRecords = function(comparisonRecord, startInx, endInx)
{
  if ( !(comparisonRecord instanceof CallRecord) )
    this.throwIPException("Invalid argument type for comparisonRecord in Telephony.findCallRecords");
  if ( !(startInx > -1) )
    this.throwIPException("Invalid argument type for startIdx in Telephony.findCallRecords");
  if ( !(endInx > -1) )
    this.throwIPException("Invalid argument type for endIdx in Telephony.findCallRecords");
  
  SecurityManager.checkSecurity("Search Call Records (Telephony.findCallRecords)", SecurityManager.OP_SESSION, SecurityManager.OP_BLANKET, SecurityManager.OP_ALLOWED, function()
  {
    _Telephony_122.findCallRecords(comparisonRecord.updateJIL(), startInx, endInx);
  });
};

Telephony.prototype.getCallRecord = function(callRecordType, id)
{
  if ( ! this.testCallRecordType(callRecordType) )
    this.throwIPException("Invalid argument type for callRecordType in Telephony.getCallRecord");
  
  if ( id == null )
    this.throwIPException("Invalid argument type for id in Telephony.getCallRecord");
  
  var result = null;
  SecurityManager.checkSecurity("Search Call Records (Telephony.findCallRecords)", SecurityManager.OP_ONE_SHOT, SecurityManager.OP_BLANKET, SecurityManager.OP_ALLOWED, function()
  {
    var jilRecord = _Telephony_122.getCallRecord(callRecordType, id);
    var wrappedRecord = new this.CallRecord();
    wrappedRecord.setJIL(jilRecord);
    result = wrappedRecord;
  });
  return(result);
};

Telephony.prototype.getCallRecordCnt = function(callRecordType)
{
  if ( ! this.testCallRecordType(callRecordType) )
    this.throwIPException("Invalid argument type for callRecordType in Telephony.getCallRecordCnt");
  
  var result = null;
  SecurityManager.checkSecurity("Count Call Records (Telephony.getCallRecordCnt)", SecurityManager.OP_ONE_SHOT, SecurityManager.OP_ALLOWED, SecurityManager.OP_ALLOWED, function()
  {
    result = _Telephony_122.getCallRecordCnt(callRecordType);
  });
  return(result);
};

Telephony.prototype.initiateVoiceCall = function(phoneNumber)
{
  if ( !(phoneNumber > -1) )
    this.throwIPException("Invalid argument type for phoneNumber in Telephony.initiateVoiceCall");
  
  //var phoneNumberPattern = /^\(?(\d{3})\)?[- ]?(\d{3})[- ]?(\d{4})$/;
  //if ( !(phoneNumberPattern.test(phoneNumber)) )
  //  Widget.throwIPException("Invalid argument type (format) for phoneNumber in Telephony.initiateVoiceCall");
    
  SecurityManager.checkSecurity("Initiate Phone Call (Telephony.initiateVoiceCall)", SecurityManager.OP_ONE_SHOT, SecurityManager.OP_BLANKET, SecurityManager.OP_ALLOWED, function()
  {
    _Telephony_122.initiateVoiceCall(phoneNumber);
  });
};

Telephony.prototype.createCallRecord = function()
{
  return(_Telephony_122.createCallRecord());
};

Telephony.prototype.testCallRecordType = function(type)
{
  if ( (type != this.CallRecordTypes.MISSED ) &&
        (type != this.CallRecordTypes.OUTGOING ) &&
        (type != this.CallRecordTypes.RECEIVED )
      )
    return(false);
  else
    return(true);
};

Telephony.prototype.throwIPException = function(message)
{
//   var exc = new Exception();
//   exc.message = message;
//   exc.type = ExceptionTypes.INVALID_PARAMETER;
//   throw(exc);
};