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
 * JavaScript objects MessageFolderType. 
 */

function showMessageFolderType() {
    var MessageFolderTypestest = document.getElementById("MessageFolderTypestest");
    MessageFolderTypestest.style.display = "block";
    var showDetail = document.getElementById("showDetail");
    showDetail.style.display = "none";
}

function showDetail_MessageFolderTypes()
{
    var MessageFolderTypestest = document.getElementById("MessageFolderTypestest");
    MessageFolderTypestest.style.display = "none";
    var showDetail = document.getElementById("showDetail");
    showDetail.style.display = "block";
}

function getInboxType() {
    showDetail_MessageFolderTypes();
    document.getElementById("textdivshowResult").innerHTML = "";
    document.getElementById("textdivshowName").innerHTML = "Field INBOX";
    document.getElementById("textdivshowExplanation").innerHTML = "The inbox folder. ";
    document.getElementById("textdivshowSampleCode").innerHTML = "E.g.: var inbox = Widget.Messaging.MessageFolderTypes.INBOX;";
    document.getElementById("textdivshowInitialCondition").innerHTML = "Notice :  n/a";
    flag = "getInboxType1";
}

function getInboxType1() {
    var inbox = Widget.Messaging.MessageFolderTypes.INBOX;
    document.getElementById("textdivshowResult").innerHTML = "Result : "
            + inbox;
}

function getOutboxType() {
     showDetail_MessageFolderTypes();
    document.getElementById("textdivshowResult").innerHTML = "";
    document.getElementById("textdivshowName").innerHTML = "Field OUTBOX";
    document.getElementById("textdivshowExplanation").innerHTML = " The outbox folder.";
    document.getElementById("textdivshowSampleCode").innerHTML = "E.g.: var out = Widget.Messaging.MessageFolderTypes.OUTBOX; ";
    document.getElementById("textdivshowInitialCondition").innerHTML = "Notice :  n/a";
    flag = "getOutboxType1";

}
function getOutboxType1() {
    var out = Widget.Messaging.MessageFolderTypes.OUTBOX;

    document.getElementById("textdivshowResult").innerHTML = "Result : " + out;
}

function getSentboxType() {
    showDetail_MessageFolderTypes();
    document.getElementById("textdivshowResult").innerHTML = "";
    document.getElementById("textdivshowName").innerHTML = "Field SENTBOX";
    document.getElementById("textdivshowExplanation").innerHTML = "The sentbox folder. ";
    document.getElementById("textdivshowSampleCode").innerHTML = "E.g.: var sent = Widget.Messaging.MessageFolderTypes.SENTBOX;";
    document.getElementById("textdivshowInitialCondition").innerHTML = "Notice :  n/a";
    flag = "getSentboxType1";
}

function getSentboxType1()
{
    var setbox = Widget.Messaging.MessageFolderTypes.SENTBOX;
    document.getElementById("textdivshowResult").innerHTML = "Result : " + setbox;
}

function getDraftboxType() {
    showDetail_MessageFolderTypes();
    document.getElementById("textdivshowResult").innerHTML = "";
    document.getElementById("textdivshowName").innerHTML = "Field DRAFTS";
    document.getElementById("textdivshowExplanation").innerHTML = "The drafts folder. ";
    document.getElementById("textdivshowSampleCode").innerHTML = "E.g.: var draft = Widget.Messaging.MessageFolderTypes.DRAFTS;";
    document.getElementById("textdivshowInitialCondition").innerHTML = "Notice :  n/a";
    flag = "getDraftboxType1";

}

function getDraftboxType1() {
    var draft = Widget.Messaging.MessageFolderTypes.DRAFTS;
    document.getElementById("textdivshowResult").innerHTML = "Result : "
            + draft;
}

/*
 * This function used to show the UI of the Widget.
 */

function clickItbackMessageFolderType() {
    showMessagingtest();
}
