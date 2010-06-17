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

/**
 * @fileoverview: This file is to be used for testing all functions and properties of 
 * JavaScript object CallRecordTypes. 
 */

function showCallRecordTypestest() {
    var CallRecordTypestest = document.getElementById("CallRecordTypestest");
    CallRecordTypestest.style.display = "block";
    var showDetail = document.getElementById("showDetail");
    showDetail.style.display = "none";
}

function showDetail_CallRecordTypes()
{
    var CallRecordTypestest = document.getElementById("CallRecordTypestest");
    CallRecordTypestest.style.display = "none";
    var showDetail = document.getElementById("showDetail");
    showDetail.style.display = "block";
}

function clickItRECEIVED() {
    showDetail_CallRecordTypes();
    document.getElementById("textdivshowResult").innerHTML = "";
    document.getElementById("textdivshowName").innerHTML = "Field RECEIVED";
    document.getElementById("textdivshowExplanation").innerHTML = " The identifier used for an INCOMING Call Record that is received and not missed. ";
    document.getElementById("textdivshowSampleCode").innerHTML = "E.g.: var v = Widget.Telephony.CallRecordTypes.RECEIVED;";
    document.getElementById("textdivshowInitialCondition").innerHTML = "Notice : n/a";
    flag = "RECEIVEDAction";
}

function RECEIVEDAction() {
    document.getElementById("textdivshowResult").innerHTML = "Result : "
            + Widget.Telephony.CallRecordTypes.RECEIVED;
}

function clickItOUTGOING() {
    showDetail_CallRecordTypes();
    document.getElementById("textdivshowResult").innerHTML = "";
    document.getElementById("textdivshowName").innerHTML = "Field OUTGOING";
    document.getElementById("textdivshowExplanation").innerHTML = " The identifier used for an OUTGOING Call Record. ";
    document.getElementById("textdivshowSampleCode").innerHTML = "E.g.: var v = Widget.Telephony.CallRecordTypes.OUTGOING;";
    document.getElementById("textdivshowInitialCondition").innerHTML = "Notice : n/a";
    flag = "OUTGOINGAction";
}

function OUTGOINGAction() {
    document.getElementById("textdivshowResult").innerHTML = "Result : "
            + Widget.Telephony.CallRecordTypes.OUTGOING;
}

function clickItMISSED() {
    showDetail_CallRecordTypes();
    document.getElementById("textdivshowResult").innerHTML = "";
    document.getElementById("textdivshowName").innerHTML = "Field MISSED";
    document.getElementById("textdivshowExplanation").innerHTML = " The identifier used for an MISSED Call Record. ";
    document.getElementById("textdivshowSampleCode").innerHTML = "E.g.: var v = Widget.Telephony.CallRecordTypes.MISSED;";
    document.getElementById("textdivshowInitialCondition").innerHTML = "Notice : n/a";
    flag = "MISSEDAction";
}

function MISSEDAction() {
    document.getElementById("textdivshowResult").innerHTML = "Result : "
            + Widget.Telephony.CallRecordTypes.MISSED;
}

function clickItbackCallRecordTypes() {
    showTelephonytest();
}
