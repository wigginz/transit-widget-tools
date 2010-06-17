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

function showownerInfo() {
    var Devicetest = document.getElementById("ownerInfo");
    Devicetest.style.display = "block";
    var showDetail = document.getElementById("showDetail");
    showDetail.style.display = "none";
}

function showDetail_ownerInfo()
{
    var ownerInfo = document.getElementById("ownerInfo");
    ownerInfo.style.display = "none";
    var showDetail = document.getElementById("showDetail");
    showDetail.style.display = "block";
}

function clickItmobilePhone()
{
	showDetail_ownerInfo();
    document.getElementById("textdivshowResult").innerHTML = "";
    document.getElementById("textdivshowName").innerHTML = "Method mobilePhone";
    document.getElementById("textdivshowExplanation").innerHTML = "This is the mobile phone number of the contact. ";
    document.getElementById("textdivshowInitialCondition").innerHTML = "Notice : N/A";
    document.getElementById("textdivshowSampleCode").innerHTML = "E.g.: var v = Widget.Device.DeviceInfo.ownerInfo.mobilePhone; ";
    flag = "mobilePhoneAction";
}

function mobilePhoneAction() {
	document.getElementById("textdivshowResult").innerHTML = "Result : "
        + Widget.Device.DeviceInfo.ownerInfo.mobilePhone;
}