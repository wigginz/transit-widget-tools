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
 * JavaScript object File. 
 */

function showApplicationTypes() {
    var ApplicationTypes = document.getElementById("ApplicationTypes");
    ApplicationTypes.style.display = "block";
    var showDetail = document.getElementById("showDetail");
    showDetail.style.display = "none";
}

function showDetail_ApplicationTypes()
{
    var ApplicationTypes = document.getElementById("ApplicationTypes");
    ApplicationTypes.style.display = "none";
    var showDetail = document.getElementById("showDetail");
    showDetail.style.display = "block";
}

function clickALARM() {
    showDetail_ApplicationTypes();
    document.getElementById("textdivshowResult").innerHTML = "";
    document.getElementById("textdivshowName").innerHTML = "Field ALARM";
    document.getElementById("textdivshowExplanation").innerHTML = " This represents the alarm clock application on the device";
    document.getElementById("textdivshowSampleCode").innerHTML = "E.g.: var v = new Widget.Device.ApplicationTypes.ALARM;";
    document.getElementById("textdivshowInitialCondition").innerHTML = "Notice : N/A";
    flag = "ALARMAction";
}

function ALARMAction() {
    var v = Widget.Device.ApplicationTypes.ALARM;
    document.getElementById("textdivshowResult").innerHTML = "Result : " + v;
}

function clickBROWSER() {
    showDetail_ApplicationTypes();
    document.getElementById("textdivshowResult").innerHTML = "";
    document.getElementById("textdivshowName").innerHTML = "Field BROWSER";
    document.getElementById("textdivshowExplanation").innerHTML = " This represents the browser application on the device";
    document.getElementById("textdivshowSampleCode").innerHTML = "E.g.: var v = new Widget.Device.ApplicationTypes.BROWSER;";
    document.getElementById("textdivshowInitialCondition").innerHTML = "Notice : N/A";
    flag = "BROWSERAction";
}

function BROWSERAction() {
    var v = Widget.Device.ApplicationTypes.BROWSER;
    document.getElementById("textdivshowResult").innerHTML = "Result : " + v;
}

function clickCALCULATOR() {
    showDetail_ApplicationTypes();
    document.getElementById("textdivshowResult").innerHTML = "";
    document.getElementById("textdivshowName").innerHTML = "Field CALCULATOR";
    document.getElementById("textdivshowExplanation").innerHTML = " This represents the calculator application on the device";
    document.getElementById("textdivshowSampleCode").innerHTML = "E.g.: var v = new Widget.Device.ApplicationTypes.CALCULATOR;";
    document.getElementById("textdivshowInitialCondition").innerHTML = "Notice : N/A";
    flag = "CALCULATORAction";
}

function CALCULATORAction() {
    var v = Widget.Device.ApplicationTypes.CALCULATOR;
    document.getElementById("textdivshowResult").innerHTML = "Result : " + v;
}

function clickCALENDAR() {
    showDetail_ApplicationTypes();
    document.getElementById("textdivshowResult").innerHTML = "";
    document.getElementById("textdivshowName").innerHTML = "Field CALENDAR";
    document.getElementById("textdivshowExplanation").innerHTML = " This represents the calendar application on the device";
    document.getElementById("textdivshowSampleCode").innerHTML = "E.g.: var v = new Widget.Device.ApplicationTypes.CALENDAR;";
    document.getElementById("textdivshowInitialCondition").innerHTML = "Notice : N/A";
    flag = "CALENDARAction";
}

function CALENDARAction() {
    var v = Widget.Device.ApplicationTypes.CALENDAR;
    document.getElementById("textdivshowResult").innerHTML = "Result : " + v;
}

function clickCAMERA() {
    showDetail_ApplicationTypes();
    document.getElementById("textdivshowResult").innerHTML = "";
    document.getElementById("textdivshowName").innerHTML = "Field CAMERA";
    document.getElementById("textdivshowExplanation").innerHTML = " This represents the camera application on the device";
    document.getElementById("textdivshowSampleCode").innerHTML = "E.g.: var v = new Widget.Device.ApplicationTypes.CAMERA;";
    document.getElementById("textdivshowInitialCondition").innerHTML = "Notice : N/A";
    flag = "CAMERAAction";
}

function CAMERAAction() {
    var v = Widget.Device.ApplicationTypes.CAMERA;
    document.getElementById("textdivshowResult").innerHTML = "Result : " + v;
}

function clickCONTACTS() {
    showDetail_ApplicationTypes();
    document.getElementById("textdivshowResult").innerHTML = "";
    document.getElementById("textdivshowName").innerHTML = "Field CONTACTS";
    document.getElementById("textdivshowExplanation").innerHTML = " This represents the contact application on the device";
    document.getElementById("textdivshowSampleCode").innerHTML = "E.g.: var v = new Widget.Device.ApplicationTypes.CONTACTS;";
    document.getElementById("textdivshowInitialCondition").innerHTML = "Notice : N/A";
    flag = "CONTACTSAction";
}

function CONTACTSAction() {
    var v = Widget.Device.ApplicationTypes.CONTACTS;
    document.getElementById("textdivshowResult").innerHTML = "Result : " + v;
}

function clickFILES() {
    showDetail_ApplicationTypes();
    document.getElementById("textdivshowResult").innerHTML = "";
    document.getElementById("textdivshowName").innerHTML = "Field FILES";
    document.getElementById("textdivshowExplanation").innerHTML = " This represents the file manager application on the device";
    document.getElementById("textdivshowSampleCode").innerHTML = "E.g.: var v = new Widget.Device.ApplicationTypes.FILES;";
    document.getElementById("textdivshowInitialCondition").innerHTML = "Notice : N/A";
    flag = "FILESAction";
}

function FILESAction() {
    var v = Widget.Device.ApplicationTypes.FILES;
    document.getElementById("textdivshowResult").innerHTML = "Result : " + v;
}

function clickGAMES() {
    showDetail_ApplicationTypes();
    document.getElementById("textdivshowResult").innerHTML = "";
    document.getElementById("textdivshowName").innerHTML = "Field GAMES";
    document.getElementById("textdivshowExplanation").innerHTML = " This represents the game manager or game folder on the device";
    document.getElementById("textdivshowSampleCode").innerHTML = "E.g.: var v = new Widget.Device.ApplicationTypes.GAMES;";
    document.getElementById("textdivshowInitialCondition").innerHTML = "Notice : N/A";
    flag = "GAMESAction";
}

function GAMESAction() {
    var v = Widget.Device.ApplicationTypes.GAMES;
    document.getElementById("textdivshowResult").innerHTML = "Result : " + v;
}

function clickMAIL() {
    showDetail_ApplicationTypes();
    document.getElementById("textdivshowResult").innerHTML = "";
    document.getElementById("textdivshowName").innerHTML = "Field MAIL";
    document.getElementById("textdivshowExplanation").innerHTML = " This represents the file mail application on the device";
    document.getElementById("textdivshowSampleCode").innerHTML = "E.g.: var v = new Widget.Device.ApplicationTypes.MAIL;";
    document.getElementById("textdivshowInitialCondition").innerHTML = "Notice : N/A";
    flag = "MAILAction";
}

function MAILAction() {
    var v = Widget.Device.ApplicationTypes.MAIL;
    document.getElementById("textdivshowResult").innerHTML = "Result : " + v;
}

