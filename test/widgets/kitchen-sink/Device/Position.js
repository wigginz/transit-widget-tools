/*
 * Copyright by JIL, 2009. 
 * 
 * @fileoverview: This file is to be used for testing all functions and properties of 
 * JavaScript objects Position. 
 * @version 0.9
 */

function showPositiontest() {
    var Positiontest = document.getElementById("Positiontest");
    Positiontest.style.display = "block";
    var showDetail = document.getElementById("showDetail");
    showDetail.style.display = "none";    
}
 
function showDetail_Position()
{
    var Positiontest = document.getElementById("Positiontest");
    Positiontest.style.display = "none";
    var showDetail = document.getElementById("showDetail");
    showDetail.style.display = "block";    
}
 
function clickItlatitude() {
    showDetail_Position();
    document.getElementById("textdivshowResult").innerHTML = "";
    document.getElementById("textdivshowName").innerHTML = "Field latitude";
    document.getElementById("textdivshowExplanation").innerHTML = "Latitude in meters using the World Geodetic System 1984 (WGS84) datum.";
    document.getElementById("textdivshowSampleCode").innerHTML = "E.g.: Widget.Device.DeviceStateInfo.onPositionRetrieved=callback; Widget.Device.DeviceStateInfo.requestPositionInfo(\"agps\"); function callback(position, method){var result = position.latitude+ position.longitude+ position.altitude+ position.cellID+ position.accuracy+ position.method+ position.timeStamp;} ";
    flag = "clicklatitude";
}

/*
* This function used to test the fields in class position. 
*/
function clicklatitude() {
   var locationModel = "gps";
   if (isNotEmpty(locationModel)) {
       Widget.Device.DeviceStateInfo.onPositionRetrieved = callback;
       Widget.Device.DeviceStateInfo.requestPositionInfo(locationModel);
   }
}

/*
 * This function used to test the fields in class position. 
 */
function callback(position, method) {
    document.getElementById("textdivshowResult").innerHTML = "Result : latitude:"
            + position.latitude
            + ", longitude: "
            + position.longitude
            + ", altitude: "
            + position.altitude
            + ", cellID: "
            + position.cellID
            + ", accuracy: "
            + position.accuracy
            + ", method: "
            + method
            + ", timeStamp: " + position.timeStamp;
}

function clickItlongitude() {
    showDetail_Position();
    document.getElementById("textdivshowResult").innerHTML = "";
    document.getElementById("textdivshowName").innerHTML = "Field longitude";
    document.getElementById("textdivshowExplanation").innerHTML = "Longitude in degrees using the World Geodetic System 1984 (WGS84) datum.";
    document.getElementById("textdivshowSampleCode").innerHTML = "E.g.: Widget.Device.DeviceStateInfo.onPositionRetrieved=callback; Widget.Device.DeviceStateInfo.requestPositionInfo(\"agps\"); function callback(position, method){var result = position.latitude+ position.longitude+ position.altitude+ position.cellID+ position.accuracy+ position.method+ position.timeStamp;} ";
    flag = "clicklongitude";
}

function clicklongitude() {
    var locationModel = "gps";
    if (isNotEmpty(locationModel)) {
        Widget.Device.DeviceStateInfo.onPositionRetrieved = callback;
        Widget.Device.DeviceStateInfo.requestPositionInfo(locationModel);
    }
}

function clickaltitude() {
	 var locationModel = "gps";
     if (isNotEmpty(locationModel)) {
        Widget.Device.DeviceStateInfo.onPositionRetrieved = callback;
        Widget.Device.DeviceStateInfo.requestPositionInfo(locationModel);
     }
}

function clickItaltitude() {
    showDetail_Position();
    document.getElementById("textdivshowResult").innerHTML = "";
    document.getElementById("textdivshowName").innerHTML = "Field altitude";
    document.getElementById("textdivshowExplanation").innerHTML = "Altitude in degrees using the World Geodetic System 1984 (WGS84) datum.";
    document.getElementById("textdivshowSampleCode").innerHTML = "E.g.: Widget.Device.DeviceStateInfo.onPositionRetrieved=callback; Widget.Device.DeviceStateInfo.requestPositionInfo(\"agps\"); function callback(position, method){var result = position.latitude+ position.longitude+ position.altitude+ position.cellID+ position.accuracy+ position.method+ position.timeStamp;} ";
    flag = "clickaltitude";
}

function clickcellID() {
	var locationModel = "gps";
    if (isNotEmpty(locationModel)) {
       Widget.Device.DeviceStateInfo.onPositionRetrieved = callback;
       Widget.Device.DeviceStateInfo.requestPositionInfo(locationModel);
    }
}

function clickItcellID() {
    showDetail_Position();
    document.getElementById("textdivshowResult").innerHTML = "";
    document.getElementById("textdivshowName").innerHTML = "Field cellID";
    document.getElementById("textdivshowExplanation").innerHTML = "This is the id of the cell.";
    document.getElementById("textdivshowSampleCode").innerHTML = "E.g.: Widget.Device.DeviceStateInfo.onPositionRetrieved=callback; Widget.Device.DeviceStateInfo.requestPositionInfo(\"agps\"); function callback(position, method){var result = position.latitude+ position.longitude+ position.altitude+ position.cellID+ position.accuracy+ position.method+ position.timeStamp;} ";
    flag = "clickcellID";
}

function clickaccuracy() {
	var locationModel = "gps";
    if (isNotEmpty(locationModel)) {
       Widget.Device.DeviceStateInfo.onPositionRetrieved = callback;
       Widget.Device.DeviceStateInfo.requestPositionInfo(locationModel);
    }
}

function clickItaccuracy() {
    showDetail_Position();
    document.getElementById("textdivshowResult").innerHTML = "";
    document.getElementById("textdivshowName").innerHTML = "Field accuracy";
    document.getElementById("textdivshowExplanation").innerHTML = "The horizontal accuracy of the position in meters, or null if not available.";
    document.getElementById("textdivshowSampleCode").innerHTML = "E.g.: Widget.Device.DeviceStateInfo.onPositionRetrieved=callback; Widget.Device.DeviceStateInfo.requestPositionInfo(\"agps\"); function callback(position, method){var result = position.latitude+ position.longitude+ position.altitude+ position.cellID+ position.accuracy+ position.method+ position.timeStamp;} ";
    flag = "clickaccuracy";
}

function altitudeAccuracyAction() {
	var locationModel = "gps";
    if (isNotEmpty(locationModel)) {
       Widget.Device.DeviceStateInfo.onPositionRetrieved = callback;
       Widget.Device.DeviceStateInfo.requestPositionInfo(locationModel);
    }
}

function clickItaltitudeAccuracy() {
   showDetail_Position();
   document.getElementById("textdivshowResult").innerHTML = "";
   document.getElementById("textdivshowName").innerHTML = "Field altitudeAccuracy";
   document.getElementById("textdivshowExplanation").innerHTML = "The vertical accuracy of the position in meters, or null if not available.";
   document.getElementById("textdivshowSampleCode").innerHTML = "E.g.: Widget.Device.DeviceStateInfo.onPositionRetrieved=callback; Widget.Device.DeviceStateInfo.requestPositionInfo(\"agps\"); function callback(position, method){var result = position.latitude+ position.longitude+ position.altitude+ position.cellID+ position.accuracy+ position.method+ position.timeStamp;} ";
   flag = "altitudeAccuracyAction";
}
	
function clicktimeStamp() {
	var locationModel = "gps";
    if (isNotEmpty(locationModel)) {
       Widget.Device.DeviceStateInfo.onPositionRetrieved = callback;
       Widget.Device.DeviceStateInfo.requestPositionInfo(locationModel);
    }
}

function clickIttimeStamp() {
    showDetail_Position();
    document.getElementById("textdivshowResult").innerHTML = "";
    document.getElementById("textdivshowName").innerHTML = "Field timeStamp";
    document.getElementById("textdivshowExplanation").innerHTML = "The time when the location was established.";
    document.getElementById("textdivshowSampleCode").innerHTML = "E.g.: Widget.Device.DeviceStateInfo.onPositionRetrieved=callback; Widget.Device.DeviceStateInfo.requestPositionInfo(\"agps\"); function callback(position, method){var result = position.latitude+ position.longitude+ position.altitude+ position.cellID+ position.accuracy+ position.method+ position.timeStamp;} ";
    flag = "clicktimeStamp";
}