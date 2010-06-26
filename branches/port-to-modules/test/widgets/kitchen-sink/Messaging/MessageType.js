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
 * JavaScript objects MessageType. 
 */

function showMessageType() {
    var MessageType = document.getElementById("MessageType");
    MessageType.style.display = "block";
    var showDetail = document.getElementById("showDetail");
    showDetail.style.display = "none";
}

function showDetail_MessageTypes()
{
    var MessageType = document.getElementById("MessageType");
    MessageType.style.display = "none";
    var showDetail = document.getElementById("showDetail");
    showDetail.style.display = "block";
}

function getSMSMessageType() {
    showDetail_MessageTypes();
    document.getElementById("textdivshowResult").innerHTML = "";
    document.getElementById("textdivshowName").innerHTML = "Field SMSMessage";
    document.getElementById("textdivshowExplanation").innerHTML = "Identifier for SMS Message Types.";
    document.getElementById("textdivshowSampleCode").innerHTML = "E.g.: var smsType = Widget.Messaging.MessageTypes.SMSMessage;";
    document.getElementById("textdivshowInitialCondition").innerHTML = "Notice : n/a";
    flag = "getSMSMessageType1";

}
function getSMSMessageType1() {
    var smsType = Widget.Messaging.MessageTypes.SMSMessage;
    document.getElementById("textdivshowResult").innerHTML = "Result : "
            + smsType;
}

function getMMSMessageType() {
    showDetail_MessageTypes();
    document.getElementById("textdivshowResult").innerHTML = "";
    document.getElementById("textdivshowName").innerHTML = "Field MMSMessage";
    document.getElementById("textdivshowExplanation").innerHTML = " Identifier for MMS Message Types.";
    document.getElementById("textdivshowSampleCode").innerHTML = "E.g.: var mmsType = Widget.Messaging.MessageTypes.MMSMessage;";
    document.getElementById("textdivshowInitialCondition").innerHTML = "Notice : n/a";
    flag = "getMMSMessageType1";
}
function getMMSMessageType1() {
    var mmsType = Widget.Messaging.MessageTypes.MMSMessage;
    document.getElementById("textdivshowResult").innerHTML = "Result : "
            + mmsType;
}

function getEmailMessageType() {
    showDetail_MessageTypes();
    document.getElementById("textdivshowResult").innerHTML = "";
    document.getElementById("textdivshowName").innerHTML = "Field EmailMessage";
    document.getElementById("textdivshowExplanation").innerHTML = "Identifier for Email Message Types.";
    document.getElementById("textdivshowSampleCode").innerHTML = "E.g.: var emailType = Widget.Messaging.MessageTypes.EmailMessage;";
    document.getElementById("textdivshowInitialCondition").innerHTML = "Notice : n/a";
    flag = "getEmailMessageType1";
}

function getEmailMessageType1() {
    var emailType = Widget.Messaging.MessageTypes.EmailMessage;
    document.getElementById("textdivshowResult").innerHTML = "Result : "
            + emailType;
}

/*
 * This function used to show the UI of the Widget. 
 */
function clickItbackMessageType() {
    showMessagingtest();
}
