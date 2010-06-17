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

function showExceptionType() {
    var ExceptionType = document.getElementById("widgetExceptionTypes");
    ExceptionType.style.display = "block";
    var showDetail = document.getElementById("showDetail");
    showDetail.style.display = "none";
}

function showDetail_ExceptionTypes()
{
    var ExceptionType = document.getElementById("widgetExceptionTypes");
    ExceptionType.style.display = "none";
    var showDetail = document.getElementById("showDetail");
    showDetail.style.display = "block";
}

function checkINVALID_PARAMETER() {
	showDetail_ExceptionTypes();
    document.getElementById("textdivshowResult").innerHTML = "";
    document.getElementById("textdivshowName").innerHTML = "field INVALID_PARAMETER";
    document.getElementById("textdivshowExplanation").innerHTML = "This exception means the paramters do not meet the parameter requirement of a function.";
    document.getElementById("textdivshowSampleCode").innerHTML = "E.g.: var v = Widget.ExceptionTypes.INVALID_PARAMETER";
    document.getElementById("textdivshowInitialCondition").innerHTML = "Notice:N/A";
    flag = "INVALID_PARAMETERAction";
}

function INVALID_PARAMETERAction() {
	var v = Widget.ExceptionTypes.INVALID_PARAMETER;
    document.getElementById("textdivshowResult").innerHTML = "Result : " + v;
 }

function checkSECURITY() {
	showDetail_ExceptionTypes();
    document.getElementById("textdivshowResult").innerHTML = "";
    document.getElementById("textdivshowName").innerHTML = "field SECURITY";
    document.getElementById("textdivshowExplanation").innerHTML = "This exception means the widget hasn't privilege to access the function.";
    document.getElementById("textdivshowSampleCode").innerHTML = "E.g.: var v = Widget.ExceptionTypes.SECURITY";
    document.getElementById("textdivshowInitialCondition").innerHTML = "Notice:N/A";
    flag = "SECURITYAction";
}

function SECURITYAction() {
	var v = Widget.ExceptionTypes.SECURITY;
    document.getElementById("textdivshowResult").innerHTML = "Result : " + v;
 }

function checkUNKNOWN() {
	showDetail_ExceptionTypes();
    document.getElementById("textdivshowResult").innerHTML = "";
    document.getElementById("textdivshowName").innerHTML = "field UNKNOWN";
    document.getElementById("textdivshowExplanation").innerHTML = "This exception means the exception is not belong to the defined exceptions.";
    document.getElementById("textdivshowSampleCode").innerHTML = "E.g.: var v = Widget.ExceptionTypes.UNKNOWN";
    document.getElementById("textdivshowInitialCondition").innerHTML = "Notice: N/A";
    flag = "UNKNOWNAction";
}

function UNKNOWNAction() {
	var v = Widget.ExceptionTypes.UNKNOWN;
    document.getElementById("textdivshowResult").innerHTML = "Result : " + v;
 }

function checkUNSUPPORTED() {
	showDetail_ExceptionTypes();
    document.getElementById("textdivshowResult").innerHTML = "";
    document.getElementById("textdivshowName").innerHTML = "field UNSUPPORTED";
    document.getElementById("textdivshowExplanation").innerHTML = "This exception means the function is not supported by widget engine.";
    document.getElementById("textdivshowSampleCode").innerHTML = "E.g.: var v = Widget.ExceptionTypes.UNSUPPORTED";
    document.getElementById("textdivshowInitialCondition").innerHTML = "Notice: N/A";
    flag = "UNSUPPORTEDAction";
}

function UNSUPPORTEDAction() {
	var v = Widget.ExceptionTypes.UNSUPPORTED;
    document.getElementById("textdivshowResult").innerHTML = "Result : " + v;
 }
