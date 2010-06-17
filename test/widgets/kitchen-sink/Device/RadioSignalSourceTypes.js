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
 * JavaScript objects Device. 
 */

function showRadioSignalSourceTypes() {
    var SourceTypes = document.getElementById("widgetRadioSignalSourceTypes");
    SourceTypes.style.display = "block";
    var showDetail = document.getElementById("showDetail");
    showDetail.style.display = "none";
}

function showDetail_RadioSignalSourceTypes()
{
    var SourceTypes = document.getElementById("widgetRadioSignalSourceTypes");
    SourceTypes.style.display = "none";
    var showDetail = document.getElementById("showDetail");
    showDetail.style.display = "block";
}

function checkCDMA() {
	showDetail_RadioSignalSourceTypes();
    document.getElementById("textdivshowResult").innerHTML = "";
    document.getElementById("textdivshowName").innerHTML = "field CDMA";
    document.getElementById("textdivshowExplanation").innerHTML = "The radio signal source is CDMA.";
    document.getElementById("textdivshowSampleCode").innerHTML = "E.g.: var v = Widget.Device.RadioInfo.RadioSignalSourceTypes.CDMA";
    document.getElementById("textdivshowInitialCondition").innerHTML = "Notice: N/A";
    flag = "CDMAAction";
}

function CDMAAction() {
	var v = Widget.Device.RadioInfo.RadioSignalSourceTypes.CDMA;
    document.getElementById("textdivshowResult").innerHTML = "Result : " + v;
 }

function checkGSM() {
	showDetail_RadioSignalSourceTypes();
    document.getElementById("textdivshowResult").innerHTML = "";
    document.getElementById("textdivshowName").innerHTML = "field GSM";
    document.getElementById("textdivshowExplanation").innerHTML = "The radio signal source is GSM.";
    document.getElementById("textdivshowSampleCode").innerHTML = "E.g.: var v = Widget.Device.RadioInfo.RadioSignalSourceTypes.GSM";
    document.getElementById("textdivshowInitialCondition").innerHTML = "Notice: N/A";
    flag = "GSMAction";
}

function GSMAction() {
	var v = Widget.Device.RadioInfo.RadioSignalSourceTypes.GSM;
    document.getElementById("textdivshowResult").innerHTML = "Result : " + v;
 }

function checkLTE() {
	showDetail_RadioSignalSourceTypes();
    document.getElementById("textdivshowResult").innerHTML = "";
    document.getElementById("textdivshowName").innerHTML = "field LTE";
    document.getElementById("textdivshowExplanation").innerHTML = "The radio signal source is LTE.";
    document.getElementById("textdivshowSampleCode").innerHTML = "E.g.: var v = Widget.Device.RadioInfo.RadioSignalSourceTypes.LTE";
    document.getElementById("textdivshowInitialCondition").innerHTML = "Notice: N/A";
    flag = "LTEAction";
}

function LTEAction() {
	var v = Widget.Device.RadioInfo.RadioSignalSourceTypes.LTE;
    document.getElementById("textdivshowResult").innerHTML = "Result : " + v;
 }

function checkTDSCDMA() {
	showDetail_RadioSignalSourceTypes();
    document.getElementById("textdivshowResult").innerHTML = "";
    document.getElementById("textdivshowName").innerHTML = "field TDSCDMA";
    document.getElementById("textdivshowExplanation").innerHTML = "The radio signal source is TDSCDMA.";
    document.getElementById("textdivshowSampleCode").innerHTML = "E.g.: var v = Widget.Device.RadioInfo.RadioSignalSourceTypes.TDSCDMA";
    document.getElementById("textdivshowInitialCondition").innerHTML = "Notice: N/A";
    flag = "TDSCDMAAction";
}

function TDSCDMAAction() {
	var v = Widget.Device.RadioInfo.RadioSignalSourceTypes.TDSCDMA;
    document.getElementById("textdivshowResult").innerHTML = "Result : " + v;
 }

function checkWCDMA() {
	showDetail_RadioSignalSourceTypes();
    document.getElementById("textdivshowResult").innerHTML = "";
    document.getElementById("textdivshowName").innerHTML = "field WCDMA";
    document.getElementById("textdivshowExplanation").innerHTML = "The radio signal source is WCDMA.";
    document.getElementById("textdivshowSampleCode").innerHTML = "E.g.: var v = Widget.Device.RadioInfo.RadioSignalSourceTypes.WCDMA";
    document.getElementById("textdivshowInitialCondition").innerHTML = "Notice: N/A";
    flag = "WCDMAAction";
}

function WCDMAAction() {
	var v = Widget.Device.RadioInfo.RadioSignalSourceTypes.WCDMA;
    document.getElementById("textdivshowResult").innerHTML = "Result : " + v;
 }
