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

function showWidgetManager() {
    var widgetManager = document.getElementById("widgetManager");
    widgetManager.style.display = "block";
    var showDetail = document.getElementById("showDetail");
    showDetail.style.display = "none";
}

function showDetail_widgetManager()
{
    var widgetManager = document.getElementById("widgetManager");
    widgetManager.style.display = "none";
    var showDetail = document.getElementById("showDetail");
    showDetail.style.display = "block";
}

function checkWidgetInstallationStatus() {
	showDetail_widgetManager();
    document.getElementById("textdivshowResult").innerHTML = "";
    document.getElementById("textdivshowName").innerHTML = "Method checkWidgetInstallationStatus";
    document.getElementById("textdivshowExplanation").innerHTML = "This method is used to check the installation status of a specific widget.";
    document.getElementById("textdivshowSampleCode").innerHTML = "E.g.: var v = WidgetManager.checkWidgetInstallationStatus(\"0df9f49e-c46d-4300-9ea4-e1c0f1f8398a\",\n\"APISample\",\"01.00.Beta\");";
    document.getElementById("textdivshowInitialCondition").innerHTML = "Notice : widgetId - The id of the widget to be checked.\n"+
    "widgetName - The name of the widget to be checked.\n"+
    "widgetVersion - The version of the widget to be checked.";
    flag = "checkWidgetInstallationStatusAction";
}

function checkWidgetInstallationStatusAction() {
    document.getElementById("textdivshowResult").innerHTML = "Result : "
            + WidgetManager.checkWidgetInstallationStatus("0df9f49e-c46d-4300-9ea4-e1c0f1f8398a","APISample","01.00.Beta");
 }
