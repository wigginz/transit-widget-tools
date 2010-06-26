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
 * JavaScript objects Messagingattachment. 
 */

function showMessagingQuantities() {
    var Messagingattquantities = document.getElementById("Messagingquantities");
    Messagingattquantities.style.display = "block";
    var showDetail = document.getElementById("showDetail");
    showDetail.style.display = "none"; 
}
 
function showDetail_Quantities()
{
    var Messagingattquantities = document.getElementById("Messagingquantities");
    Messagingattquantities.style.display = "none";
    var showDetail = document.getElementById("showDetail");
    showDetail.style.display = "block";      
}
 
function getTMessagecnt() {
    showDetail_Quantities();
    document.getElementById("textdivshowResult").innerHTML = "";
    document.getElementById("textdivshowName").innerHTML = "Field totalMessageCnt";
    document.getElementById("textdivshowExplanation").innerHTML = "Total messages found by the query returning this object.  ";
    document.getElementById("textdivshowSampleCode").innerHTML = "E.g.: var msgCount = Widget.Messaging.getMessageQuantities(Widget.Messaging.MessageTypes.SMSMessage, Widget.Messaging.MessageFolderTypes.INBOX);<br> var totalmscnt =msgCount.totalMessageCnt";
    document.getElementById("textdivshowInitialCondition").innerHTML = "Notice :  n/a";
    flag = "ActivegetTMessagecnt";
}

function ActivegetTMessagecnt() {
    var msgCount = Widget.Messaging.getMessageQuantities(Widget.Messaging.MessageTypes.SMSMessage, Widget.Messaging.MessageFolderTypes.INBOX);
    if (msgCount != null) {
        document.getElementById("textdivshowResult").innerHTML = "total message num = " +msgCount.totalMessageCnt;
    }
    else {
        document.getElementById("textdivshowResult").innerHTML = "get message quantity error";
    }
}

function getTMRCnt() {
    showDetail_Quantities();
    document.getElementById("textdivshowResult").innerHTML = "";
    document.getElementById("textdivshowName").innerHTML = "Field totalMessageReadCnt";
    document.getElementById("textdivshowExplanation").innerHTML = "Total messages read by the query returning this object.";
    document.getElementById("textdivshowSampleCode").innerHTML = "E.g.: var msgCount = Widget.Messaging.getMessageQuantities(Widget.Messaging.MessageTypes.SMSMessage, Widget.Messaging.MessageFolderTypes.INBOX);<br> var totalmsrcnt =msgCount.totalMessageReadCnt";
    document.getElementById("textdivshowInitialCondition").innerHTML = "Notice :  n/a";
    flag = "ActivegetTMRCnt";
}

function ActivegetTMRCnt() {
    var msgCount = Widget.Messaging.getMessageQuantities(Widget.Messaging.MessageTypes.SMSMessage, Widget.Messaging.MessageFolderTypes.INBOX);
    if (msgCount != null) {
        document.getElementById("textdivshowResult").innerHTML = "total readed message num = " +msgCount.totalMessageReadCnt;
    }
    else {
        document.getElementById("textdivshowResult").innerHTML = "get message quantity error";
    }
}

function getTMURcnt() {
    showDetail_Quantities();
    document.getElementById("textdivshowResult").innerHTML = "";
    document.getElementById("textdivshowName").innerHTML = "Field totalMessageUnreadCnt";
    document.getElementById("textdivshowExplanation").innerHTML = "Total messages unread by the query returning this object.";
    document.getElementById("textdivshowSampleCode").innerHTML = "E.g.: var msgCount = Widget.Messaging.getMessageQuantities(Widget.Messaging.MessageTypes.SMSMessage, Widget.Messaging.MessageFolderTypes.INBOX);<br> var totalmsrcnt =msgCount.totalMessageUnreadCnt";
    document.getElementById("textdivshowInitialCondition").innerHTML = "Notice :  n/a";
    flag = "ActivegetTMURCnt";
}

function ActivegetTMURCnt() {
    var msgCount = Widget.Messaging.getMessageQuantities(Widget.Messaging.MessageTypes.SMSMessage, Widget.Messaging.MessageFolderTypes.INBOX);
    if (msgCount != null) {
        document.getElementById("textdivshowResult").innerHTML = "total readed message num = " +msgCount.totalMessageUnreadCnt;
    }
    else {
        document.getElementById("textdivshowResult").innerHTML = "get message quantity error";
    }
}

/*
 * This function used to show the UI of the Widget. 
 */
function clickItbackMessagingattachment() 
{
    showMessagingtest();
}
