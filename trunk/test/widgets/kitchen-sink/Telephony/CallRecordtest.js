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
 * JavaScript object CallRecord. 
 */

function showCallRecordtest() 
{
    var CallRecordtest = document.getElementById("CallRecordtest");
    CallRecordtest.style.display = "block";
    var showDetail = document.getElementById("showDetail");
    showDetail.style.display = "none";
}

function showDetail_CallRecord()
{
    var CallRecordtest = document.getElementById("CallRecordtest");
    CallRecordtest.style.display = "none";
    var showDetail = document.getElementById("showDetail");
    showDetail.style.display = "block";
}

function clickItcallRecordAddress() {
    showDetail_CallRecord();
    document.getElementById("textdivshowResult").innerHTML = "";
    document.getElementById("textdivshowName").innerHTML = "Field callRecordAddress";
    document.getElementById("textdivshowExplanation").innerHTML = " If this is an incoming or missed call record, then this is the phone number of the party originating the call. If this is an outgoing call record, then this is the phone number of the party receiving the call. ";
    document.getElementById("textdivshowSampleCode").innerHTML = "E.g.: var v = new Widget.Telephony.CallRecord(); v.callRecordAddress = '10086';";
    document.getElementById("textdivshowInitialCondition").innerHTML = "Notice : n/a";
    flag = "callRecordAddressAction";
}

function callRecordAddressAction() {
    var v = new Widget.Telephony.CallRecord();
    v.callRecordAddress = '10086';
    document.getElementById("textdivshowResult").innerHTML = "Result : "
            + v.callRecordAddress;
}

function clickItcallRecordId() {
    showDetail_CallRecord();
    document.getElementById("textdivshowResult").innerHTML = "";
    document.getElementById("textdivshowName").innerHTML = "Field callRecordId";
    document.getElementById("textdivshowExplanation").innerHTML = " A unique indicator (potentially assigned by the WRT) for identifying the call record. ";
    document.getElementById("textdivshowSampleCode").innerHTML = "E.g.: var v = new Widget.Telephony.CallRecord(); v.callRecordId = '1';";
    document.getElementById("textdivshowInitialCondition").innerHTML = "Notice : n/a";
    flag = "callRecordIdAction";
}

function callRecordIdAction() {
    var v = new Widget.Telephony.CallRecord();
    v.callRecordId = '1';
    document.getElementById("textdivshowResult").innerHTML = "Result : "
            + v.callRecordId;
}

function clickItcallRecordName() {
    showDetail_CallRecord();
    document.getElementById("textdivshowResult").innerHTML = "";
    document.getElementById("textdivshowName").innerHTML = "Field callRecordName";
    document.getElementById("textdivshowExplanation").innerHTML = " If this is an incoming or missed call record, then this is the name from the address book that the phone was able to associate with the source phone number, if any applies. If this is an outgoing call record, then this is the name from the address book that the phone was able to associate with the destination phone number, if any applies. ";
    document.getElementById("textdivshowSampleCode").innerHTML = "E.g.: var v = new Widget.Telephony.CallRecord(); v.callRecordName = 'somename';";
    document.getElementById("textdivshowInitialCondition").innerHTML = "Notice : n/a";
    flag = "callRecordNameAction";
}

function callRecordNameAction() {
    var v = new Widget.Telephony.CallRecord();
    v.callRecordName = 'somename';
    document.getElementById("textdivshowResult").innerHTML = "Result : "
            + v.callRecordName;
}

function clickItcallRecordType() {
    showDetail_CallRecord();
    document.getElementById("textdivshowResult").innerHTML = "";
    document.getElementById("textdivshowName").innerHTML = "Field callRecordType";
    document.getElementById("textdivshowExplanation").innerHTML = " A String indicating the type of call record i.e.: 'received', 'outgoing', 'missed'. This corresponds to the constants defined in the CallRecordType object.";
    document.getElementById("textdivshowSampleCode").innerHTML = "E.g.: var v = new Widget.Telephony.CallRecord(); v.callRecordType = Widget.Telephony.CallRecordType.OUTGOING;";
    document.getElementById("textdivshowInitialCondition").innerHTML = "Notice : n/a";
    flag = "callRecordTypeAction";
}

function callRecordTypeAction() {
    var v = new Widget.Telephony.CallRecord();
    v.callRecordType = Widget.Telephony.CallRecordTypes.OUTGOING;
    document.getElementById("textdivshowResult").innerHTML = "Result : "
            + v.callRecordType;
}

function clickItdurationSeconds() {
    showDetail_CallRecord();
    document.getElementById("textdivshowResult").innerHTML = "";
    document.getElementById("textdivshowName").innerHTML = "Field durationSeconds";
    document.getElementById("textdivshowExplanation").innerHTML = " The number of seconds occupied by the call. This field should be an integer value. Due the limitation of some handsets, this could be an approximate value.";
    document.getElementById("textdivshowSampleCode").innerHTML = "E.g.: var v = new Widget.Telephony.CallRecord(); v.durationSeconds = 10;";
    document.getElementById("textdivshowInitialCondition").innerHTML = "Notice : n/a";
    flag = "durationSecondsAction";
}

function durationSecondsAction() {
    var v = new Widget.Telephony.CallRecord();
    v.durationSeconds = 10;
    document.getElementById("textdivshowResult").innerHTML = "Result : "
            + v.durationSeconds;
}

function clickItstartTime() {
    showDetail_CallRecord();
    document.getElementById("textdivshowResult").innerHTML = "";
    document.getElementById("textdivshowName").innerHTML = "Field startTime";
    document.getElementById("textdivshowExplanation").innerHTML = " The time and date when the call begins. ";
    document.getElementById("textdivshowSampleCode").innerHTML = "E.g.: var v = new Widget.Telephony.CallRecord(); v.startTime = new Date(2008, 9, 22, 0, 0, 0);";
    document.getElementById("textdivshowInitialCondition").innerHTML = "Notice : n/a";
    flag = "startTimeAction";
}

function startTimeAction() {
    var v = new Widget.Telephony.CallRecord();
    v.startTime = new Date(2008, 9, 22, 0, 0, 0);
    document.getElementById("textdivshowResult").innerHTML = "Result : "
            + v.startTime;

}
