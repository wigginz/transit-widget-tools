/*
 * Copyright by JIL, 2009. 
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *      http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

/*
 * @fileoverview: This file is to be used for testing all functions and properties of 
 * JavaScript objects Telephony. 
 */

function showTelephonytest() {
    var Telephonytest = document.getElementById("Telephonytest");
    Telephonytest.style.display = "block";
    var showDetail = document.getElementById("showDetail");
    showDetail.style.display = "none";
}

/*
 * This function used to test the method initiateVoiceCall. 
 * This method automatically initiates an outgoing voice call with the string specified. Expected to invoke the native 
 * dialer application.
 */
function clickinitiateVoiceCall() {
    var phoneNumber = "10086";
    if (isNotEmpty(phoneNumber) && isNumber(phoneNumber)) {
        Widget.Telephony.initiateVoiceCall(phoneNumber);
    }
}

function showDetail_Telephony()
{
    var Telephonytest = document.getElementById("Telephonytest");
    Telephonytest.style.display = "none";
    var showDetail = document.getElementById("showDetail");
    showDetail.style.display = "block";
}
 
function clickItinitiateVoiceCall() {
    showDetail_Telephony();
    document.getElementById("textdivshowResult").innerHTML = "";
    document.getElementById("textdivshowName").innerHTML = "Method initiateVoiceCall";
    document.getElementById("textdivshowExplanation").innerHTML = "Automatically initiates an outgoing voice call with the string specified. ";
    document.getElementById("textdivshowSampleCode").innerHTML = "E.g.Widget.Telephony.initiateVoiceCall\n(\"10086\");";
    document.getElementById("textdivshowInitialCondition").innerHTML = "Notice : n/a";
    flag = "clickinitiateVoiceCall";
}

/*
 * This function used to test the method getCallRecordCnt. 
 * This method get the number of call records from the call log for the specified call record type. 
 */
function clickgetCallRecordCnt() {
    /* 
     * Return the total number of records for the specified type. 0 is returned if the type is unknown
     */
    document.getElementById("textdivshowResult").innerHTML = "Result : OUTGOING callrecord count = "
            + Widget.Telephony.getCallRecordCnt(Widget.Telephony.CallRecordTypes.OUTGOING);
}

function clickItgetCallRecordCnt() {
    showDetail_Telephony();
    document.getElementById("textdivshowResult").innerHTML = "";
    document.getElementById("textdivshowName").innerHTML = "Method getCallRecordCnt";
    document.getElementById("textdivshowExplanation").innerHTML = "Get the number of call records from the call log for the specified call record type.";
    document.getElementById("textdivshowSampleCode").innerHTML = "E.g. var v = Widget.Telephony.getCallRecordCnt\n(Widget.Telephony.CallRecordTypes.OUTGOING);";
    document.getElementById("textdivshowInitialCondition").innerHTML = "Notice : n/a";
    flag = "clickgetCallRecordCnt";
}

/*
 * This function used to test the method findCallRecords. 
 * This method retrieves all call records of the specified call record type having a match against the specified fields defined in 
 * the comparisonRecord. Supports * as wildcards in Strings. Search is case insensitive. Widget can specify only search a range 
 * of files between startInx and endInx. This is an asynchronous function, and will invoke Telephony.onCallRecordsFound() when 
 * search completes. 
 */
function clickfindCallRecords() {
    /* 
     * Return an array of CallRecord objects that match. An empty array is returned if no matches are found. 
     */
    var compareRecord = new Widget.Telephony.CallRecord();
    compareRecord.callRecordAddress = "10086";
    var beginInx = 0;
    var endInx = 9;
    Widget.Telephony.onCallRecordsFound = function testOnCallRecordsFound(records) {
        if (records != null && records.length > 0) {
            document.getElementById("textdivshowResult").innerHTML = "Result count: "
                    + records.length
                    + ". The first record is "
                    + records[0].callRecordType
                    + ":"
                    + records[0].callRecordName
                    + ":"
                    + records[0].callRecordAddress
                    + ":"
                    + records[0].startTime.toString()
                    + ":"
                    + records[0].durationSeconds;
        } else {
            document.getElementById("textdivshowResult").innerHTML = "Result : Can not find any record.";
        }
    };
     try{
        Widget.Telephony.findCallRecords(compareRecord, beginInx, endInx);
    }
    catch(e)
    {
        document.getElementById("textdivshowResult").innerHTML = "Exception happen: " + e.type;
    }
}

function clickItfindCallRecords() {
    showDetail_Telephony();
    document.getElementById("textdivshowResult").innerHTML = "";
    document.getElementById("textdivshowName").innerHTML = "Method findCallRecords";
    document.getElementById("textdivshowExplanation").innerHTML = "Retrieves all call records of the specified call record type having a match against the specified fields defined in the comparisonRecord.";
    document.getElementById("textdivshowSampleCode").innerHTML = "e.g.     Widget.Telephony.onCallRecordsFound = someCallBackFunction;<br/>var compareRecord = new Widget.Telephony.CallRecord();\n compareRecord.callRecordAddress = \"10086\"; \nWidget.Telephony.findCallRecords\n(compareRecord, 0 9);";
    document.getElementById("textdivshowInitialCondition").innerHTML = "Notice : n/a";
    flag = "clickfindCallRecords";
}

function extendTelephony() 
{
    var tmp = "";
    var props;
    for (props in Widget.Telephony)
        tmp += props + ", ";
    document.getElementById("textdivExtendTelephony").innerHTML = tmp;
}

/*
 * This function used to test the method getCallRecord. 
 * This method retrieves the call record of the specified call record type by index 
 */
function clickgetCallRecord() {
    /* 
     * Return a CallRecord object specified by id parameter 
     */
    var callRecord = Widget.Telephony.getCallRecord(
            Widget.Telephony.CallRecordTypes.RECEIVED, "1");
    if (callRecord) {
        document.getElementById("textdivshowResult").innerHTML = "Get id="
                + callRecord.callRecordId + ":type="
                + callRecord.callRecordType + " callrecord. The record is "
                + callRecord.callRecordName + ":"
                + callRecord.callRecordAddress + ":"
                + callRecord.startTime.toString() + ":"
                + callRecord.durationSeconds;
    } else {
        document.getElementById("textdivshowResult").innerHTML = "Can not get any record.";
    }
}

function clickItgetCallRecord() {
    showDetail_Telephony();
    document.getElementById("textdivshowResult").innerHTML = "";
    document.getElementById("textdivshowName").innerHTML = "Method getCallRecord";
    document.getElementById("textdivshowExplanation").innerHTML = "Retrieves the call record of the specified call record type by index ";
    document.getElementById("textdivshowSampleCode").innerHTML = "e.g. var callRecord = Widget.Telephony.getCallRecord\n(Widget.Telephony.CallRecordTypes.RECEIVED, \"1\");";
    document.getElementById("textdivshowInitialCondition").innerHTML = "Notice : n/a";
    flag = "clickgetCallRecord";
}

/*
 * This function used to test the method deleteCallRecord. 
 * This method deletes the call record of the specified call record type by index 
 */
function clickdeleteCallRecord() {
    var v1 = Widget.Telephony.getCallRecordCnt(Widget.Telephony.CallRecordTypes.RECEIVED);
    Widget.Telephony.deleteCallRecord(
            Widget.Telephony.CallRecordTypes.RECEIVED, "1");
    var v2 = Widget.Telephony.getCallRecordCnt(Widget.Telephony.CallRecordTypes.RECEIVED);
    document.getElementById("textdivshowResult").innerHTML = 
        "Before deleteCallRecord: RECEIVED callrecord count=" + v1 + 
        ";\nAfter deleteCallRecord: RECEIVED callrecord count=" + v2;
}

function clickItdeleteCallRecord() {
    showDetail_Telephony();
    document.getElementById("textdivshowResult").innerHTML = "";
    document.getElementById("textdivshowName").innerHTML = "Method deleteCallRecord";
    document.getElementById("textdivshowExplanation").innerHTML = "Deletes the call record of the specified call record type by index .";
    document.getElementById("textdivshowSampleCode").innerHTML = "e.g. Widget.Telephony.deleteCallRecord\n(Widget.Telephony.CallRecordTypes.RECEIVED, \"1\");";
    document.getElementById("textdivshowInitialCondition").innerHTML = "Notice : n/a";
    flag = "clickdeleteCallRecord";
}

/*
 * This function used to test the method deleteAllCallRecords. 
 * This method deletes all call records of the specified call record type.
 */
function clickdeleteAllCallRecords() {
    var v1 = Widget.Telephony.getCallRecordCnt(Widget.Telephony.CallRecordTypes.MISSED);
    Widget.Telephony
            .deleteAllCallRecords(Widget.Telephony.CallRecordTypes.MISSED);
    var v2 = Widget.Telephony.getCallRecordCnt(Widget.Telephony.CallRecordTypes.MISSED);
    document.getElementById("textdivshowResult").innerHTML = 
        "Before deleteAllCallRecords: MISSED callrecord count = " + v1 + 
        ";\nAfter deleteAllCallRecords: MISSED callrecord count = " + v2;
}

function clickItdeleteAllCallRecords() {
    showDetail_Telephony();
    document.getElementById("textdivshowResult").innerHTML = "";
    document.getElementById("textdivshowName").innerHTML = "Method deleteAllCallRecords";
    document.getElementById("textdivshowExplanation").innerHTML = "Deletes all call records of the specified call record type.";
    document.getElementById("textdivshowSampleCode").innerHTML = "e.g. Widget.Telephony.deleteAllCallRecords\n(Widget.Telephony.CallRecordTypes.MISSED);";
    document.getElementById("textdivshowInitialCondition").innerHTML = "Notice : n/a";
    flag = "clickdeleteAllCallRecords";
}

function clickItonCallRecordsFound()
{
	showDetail_Telephony();
    document.getElementById("textdivshowResult").innerHTML = "";
    document.getElementById("textdivshowName").innerHTML = "Method onCallRecordsFound";
    document.getElementById("textdivshowExplanation").innerHTML = "This is a call back method to invoke when Telephony.findCallRecords completes.";
    document.getElementById("textdivshowSampleCode").innerHTML = "e.g:<br/>Widget.Telephony.onCallRecordsFound = myCallBack;"+
															    "<br/>var record = new Widget.Telephony.CallRecord();"+
															    "<br/>record.callRecordAddress = \"10086\";"+
															    "<br/>Widget.Telephony.findCallRecords(record, 0, 9);" +
															    "<br/>function myCallBack(callRecords){" +
															    "<br/>var address = callRecords[0].callRecordAddress;}";
    document.getElementById("textdivshowInitialCondition").innerHTML = "Notice : n/a";
    flag = "onCallRecordsFoundAction";
}

function onCallRecordsFoundAction()
{
	Widget.Telephony.onCallRecordsFound = myCallBack;
    var record = new Widget.Telephony.CallRecord();
    record.callRecordAddress = "10086";
    Widget.Telephony.findCallRecords(record, 0, 9);
    function myCallBack(callRecords)
    {
        document.getElementById("textdivshowResult").innerHTML = "Result: there is no call records.";
        document.getElementById("textdivshowResult").innerHTML = "Result:"+callRecords[0].callRecordAddress;
    }
}

function captureCallEvent() {
    Widget.Telephony.onCallEvent = testOnCallEvent;
    function testOnCallEvent(type, phoneNumber) {
        document.getElementById("textdivCallEvent").innerHTML = "onCallEvent -- type:"
                + type + "; number:" + phoneNumber;
    }
}

/*
 * This function used to test the method onCallEvent.  
 * This method is a call back method which will be triggered when there's an incoming call, missed call or outgoing call. 
 */
function clickTelephonycallback() {
    Widget.Telephony.onCallEvent = testOnCallEvent;
}

function clickItTelephonycallback() {
    showDetail_Telephony();
    document.getElementById("textdivshowResult").innerHTML = "";
    document.getElementById("textdivshowName").innerHTML = "Method onCallEvent";
    document.getElementById("textdivshowExplanation").innerHTML = "This is a call back method which will be triggered when there's an incoming call, missed call or outgoing call.";
    document.getElementById("textdivshowSampleCode").innerHTML = "e.g. Widget.Telephony.onCallEvent = callback; function callback(callType, phonrNumber) { //to do }";
    document.getElementById("textdivshowInitialCondition").innerHTML = "Notice : Need event to happen";
    flag = "clickTelephonycallback";
}

/*
 * This function used to test the method onCallEvent. 
 * This method is a call back method which will be triggered when there's an incoming call, missed call or outgoing call. 
 */
function testOnCallEvent(callType, phoneNumber) {
    document.getElementById("textdivshowResult").innerHTML = "onCallEvent -- type:"
            + callType + "; number:" + phoneNumber;
}

/*
 * This function used to test the exception of widget.
 */
function clickTelephonyexception() {
    document.getElementById("textdivshowResult").innerHTML = "Result : "
            + e.name;
}
 
function clickItTelephonyexception() {
    showDetail_Telephony();
    document.getElementById("textdivshowResult").innerHTML = "";
    document.getElementById("textdivshowName").innerHTML = "Method exception";
    document.getElementById("textdivshowExplanation").innerHTML = "";
    document.getElementById("textdivshowSampleCode").innerHTML = "E.g. ";
    document.getElementById("textdivshowInitialCondition").innerHTML = "Notice : n/a";
    flag = "clickTelephonyexception";
}
