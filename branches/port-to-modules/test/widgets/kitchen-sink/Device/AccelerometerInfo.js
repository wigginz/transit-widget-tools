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
 * JavaScript objects AccelerometerInfo. 
 */

function showAccelerometerInfo() {
    var AccelerometerInfo = document.getElementById("AccelerometerInfo");
    AccelerometerInfo.style.display = "block";
    var showDetail = document.getElementById("showDetail");
    showDetail.style.display = "none";
}

function showDetail_AccelerometerInfo()
{
    var AccelerometerInfo = document.getElementById("AccelerometerInfo");
    AccelerometerInfo.style.display = "none";
    var showDetail = document.getElementById("showDetail");
    showDetail.style.display = "block";
}

function getxAccelerometerInfo() {
    showDetail_AccelerometerInfo();
    document.getElementById("textdivshowResult").innerHTML = "";
    document.getElementById("textdivshowName").innerHTML = "Field x-axis";
    document.getElementById("textdivshowExplanation").innerHTML = " The value of x-axis.";
    document.getElementById("textdivshowSampleCode").innerHTML = "E.g.:  var accelerometerInfo = Widget.Device.DeviceStateInfo.AccelerometerInfo;"+
                                                                 "\ndocument.getElementById(\"textdivshowResult\")\n.innerHTML = \"xAxis:\" + accelerometerInfo.xAxis;";
    document.getElementById("textdivshowInitialCondition").innerHTML = "Notice : n/a";
    flag = "getx";
}


function getx() {
    var accelerometerInfo = Widget.Device.DeviceStateInfo.AccelerometerInfo;
    document.getElementById("textdivshowResult").innerHTML = "xAxis:"
            + accelerometerInfo.xAxis;
}

function getyAccelerometerInfo() {
    showDetail_AccelerometerInfo();
    document.getElementById("textdivshowResult").innerHTML = "";
    document.getElementById("textdivshowName").innerHTML = "Field y-axis";
    document.getElementById("textdivshowExplanation").innerHTML = "The value of y-axis.";
    document.getElementById("textdivshowSampleCode").innerHTML = "E.g.:  var accelerometerInfo = Widget.Device.DeviceStateInfo.AccelerometerInfo;\n"+
                                                                "document.getElementById(\"textdivshowResult\")\n.innerHTML = \"yAxis:\" + accelerometerInfo.yAxis;";
    document.getElementById("textdivshowInitialCondition").innerHTML = "Notice : n/a";
    flag = "gety";
}


function gety() {
    var accelerometerInfo = Widget.Device.DeviceStateInfo.AccelerometerInfo;
    document.getElementById("textdivshowResult").innerHTML = "yAxis:"
            + accelerometerInfo.yAxis;
}

function getzAccelerometerInfo() {
    showDetail_AccelerometerInfo();
    document.getElementById("textdivshowResult").innerHTML = "";
    document.getElementById("textdivshowName").innerHTML = "Field z-axis";
    document.getElementById("textdivshowExplanation").innerHTML = " The value of z-axis.";
    document.getElementById("textdivshowSampleCode").innerHTML = "E.g.:  var accelerometerInfo = Widget.Device.DeviceStateInfo.AccelerometerInfo;"
    	                                                          +"\ndocument.getElementById(\"textdivshowResult\")\n.innerHTML = \"zAxis:\" + accelerometerInfo.zAxis;";
    document.getElementById("textdivshowInitialCondition").innerHTML = "Notice : n/a";
    flag = "getz";
}

function getz() {
    var accelerometerInfo = Widget.Device.DeviceStateInfo.AccelerometerInfo;
    document.getElementById("textdivshowResult").innerHTML = "zAxis:"
            + accelerometerInfo.zAxis;
}

