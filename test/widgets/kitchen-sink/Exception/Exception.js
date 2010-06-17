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

function showException() {
    var Exception = document.getElementById("widgetException");
    Exception.style.display = "block";
    var showDetail = document.getElementById("showDetail");
    showDetail.style.display = "none";
}

function showDetail_Exception()
{
    var Exception = document.getElementById("widgetException");
    Exception.style.display = "none";
    var showDetail = document.getElementById("showDetail");
    showDetail.style.display = "block";
}

function checkMessage() {
	showDetail_Exception();
    document.getElementById("textdivshowResult").innerHTML = "";
    document.getElementById("textdivshowName").innerHTML = "field message";
    document.getElementById("textdivshowExplanation").innerHTML = "The detail message of the exception.";
    document.getElementById("textdivshowSampleCode").innerHTML = "E.g.: var v =  Widget.Exception; v.message = \" invalid parameter\"";
    document.getElementById("textdivshowInitialCondition").innerHTML = "Notice: exact value depends on the widget engine implementation";
    flag = "messageAction";
}

function messageAction() {
	var v = Widget.Exception;
	v.message = "invalid parameter";
    document.getElementById("textdivshowResult").innerHTML = "Result : " + v.message;
 }

function checkType() {
	showDetail_Exception();
    document.getElementById("textdivshowResult").innerHTML = "";
    document.getElementById("textdivshowName").innerHTML = "field type";
    document.getElementById("textdivshowExplanation").innerHTML = "The type of exception.";
    document.getElementById("textdivshowSampleCode").innerHTML = "E.g.: var v = Widget.Exception; v.type = \" UNSUPPORTED \"";
    document.getElementById("textdivshowInitialCondition").innerHTML = "Notice: N/A";
    flag = "typeAction";
}

function typeAction() {
	var v = Widget.Exception;
	v.type = " UNSUPPORTED";	
    document.getElementById("textdivshowResult").innerHTML = "Result : " + v.type;
 }
