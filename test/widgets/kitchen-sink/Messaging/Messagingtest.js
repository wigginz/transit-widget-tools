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
 * JavaScript objects Messaging. 
 */


function showMessagingtest() {
     var Messagingtest = document.getElementById("Messagingtest");
     Messagingtest.style.display = "block";
     var showDetail = document.getElementById("showDetail");
     showDetail.style.display = "none"; 
}

//It seems this part has no use
/*
function createMessage()
{    
    document.getElementById("divCreatemessaging").style.display = "block";
}

function findMessage()
{
    document.getElementById("divfindMessage").style.display = "block";
}

function getMessage()
{
    document.getElementById("divGetemessaging").style.display = "block";
}

function getFolderNames()
{
    document.getElementById("divGetFolderNames").style.display = "block";
}

function deleteAllMessages()
{
    document.getElementById("divdeleteAllMessages").style.display = "block";
}

function deleteAMessages()
{
    document.getElementById("divdeleteAMessages").style.display = "block";
}

function copyMessageToFolder()
{
    document.getElementById("divcopyMessageToFolder").style.display = "block";
}

function getMessageQuantities()
{
    document.getElementById("divgetMessageQuantities").style.display = "block";
}

function moveMessageToFolder()
{
    document.getElementById("divmoveMessageToFolder").style.display = "block";
}
function createFolder()
{
    document.getElementById("divcreateFolde").style.display = "block";
}

function BackToMessageMainPage()
{
    showMessagingtest();
}
*/
/*
 * This function used to show the UI of testing the showMessageObject class
 */
function showDetail_Messaging()
{
     var Messagingtest = document.getElementById("Messagingtest");
     Messagingtest.style.display = "none";
     var showDetail = document.getElementById("showDetail");
     showDetail.style.display = "block"; 
}
 
function createSMSMessage() {
    showDetail_Messaging();
    document.getElementById("textdivshowResult").innerHTML = "";
    document.getElementById("textdivshowName").innerHTML = "Method createMessage";
    document.getElementById("textdivshowExplanation").innerHTML = "Create a message.  It can be a sms,mms or email message.";
    document.getElementById("textdivshowSampleCode").innerHTML = "E.g.: var msg = Widget.Messaging.createMessage\n(Widget.Messaging.MessageTypes.SMSMessage); ";
    document.getElementById("textdivshowInitialCondition").innerHTML = "Notice : n/a";
    flag = "ActiveCreateSMSMessage";
}

function ActiveCreateSMSMessage() {
    msg = Widget.Messaging.createMessage(Widget.Messaging.MessageTypes.SMSMessage);
    var phoneNum ="10086";
    var subject="create SMS";
    var body="Test create SMS message with JIL widget API";
    if(isNotEmpty(phoneNum)&&verifyPhoneNumber(phoneNum))
        msg.addAddress("destination", phoneNum);
    if(isNotEmpty(subject))
        msg.subject = subject;
    if(isNotEmpty(body))
        msg.body=body;
    document.getElementById("textdivshowResult").innerHTML = "Result : "
            + "create " + msg.messageType + " succeeded";
}

function createMMSMessage()
{
    showDetail_Messaging();
    document.getElementById("textdivshowResult").innerHTML = "";
    document.getElementById("textdivshowName").innerHTML = "Method createMessage";
    document.getElementById("textdivshowExplanation").innerHTML = "Create a MMS message. ";
    document.getElementById("textdivshowSampleCode").innerHTML = "E.g.: var msg = Widget.Messaging.createMessage\n(Widget.Messaging.MessageTypes.MMSMessage);";
    document.getElementById("textdivshowInitialCondition").innerHTML = "Notice : n/a";
    flag = "ActivecreateMMSMessage";
}

function ActivecreateMMSMessage() {
    var msg = Widget.Messaging.createMessage( Widget.Messaging.MessageTypes.MMSMessage);
    msg.addAddress("destination", "10086");
    msg.subject = "Test send MMS";
    msg.body="Test to send a MMS through message API, with an attachment.";
    msg.addAttachment("/sdcard/myAttachment.png");
    document.getElementById("textdivshowResult").innerHTML = "Result : "
            + "create " + msg.messageType + " succeeded";





}

function createEmailMessage() {
    showDetail_Messaging();
    document.getElementById("textdivshowResult").innerHTML = "";
    document.getElementById("textdivshowName").innerHTML = "Method createMessage";
    document.getElementById("textdivshowExplanation").innerHTML = "Create a message.  It can be a sms,mms or email message.";
    document.getElementById("textdivshowSampleCode").innerHTML = "E.g.: var msg = Widget.Messaging.createMessage\n(Widget.Messaging.MessageTypes.EmailMessage );";
    document.getElementById("textdivshowInitialCondition").innerHTML = "Notice : n/a";
    flag = "ActiveCreateEmailMessage";
}

function ActiveCreateEmailMessage() {
    msg = Widget.Messaging.createMessage(Widget.Messaging.MessageTypes.EmailMessage);
    var destEmailAddr="test@borqs.com";
    if(isNotEmpty(destEmailAddr)&&verifyEmailAddress(destEmailAddr))
        msg.addAddress("destination",destEmailAddr);
    msg.messagePriority = true;
    msg.subject = "create Email succeeded";
    msg.body = "Create a new Email message via widget API";
    document.getElementById("textdivshowResult").innerHTML = "Result : "
            + "create " + msg.messageType + " succeeded";
}

function sendSMSMessage() {
    showDetail_Messaging();
    document.getElementById("textdivshowResult").innerHTML = "";
    document.getElementById("textdivshowName").innerHTML = "Method sendMessage";
    document.getElementById("textdivshowExplanation").innerHTML = "Attempt to send the specified message.";
    document.getElementById("textdivshowSampleCode").innerHTML = "E.g.: var msg = Widget.Messaging.createMessage\n(Widget.Messaging.MessageTypes.SMSMessage); " +
	"msg.subject = \"create SMS succeeded\";\n" +
					"Widget.Messaging.sendMessage(msg);";
    document.getElementById("textdivshowInitialCondition").innerHTML = "Notice : n/a";
    flag = "ActiveSendSMSMessage";
}

function ActiveSendSMSMessage() {
    msg = Widget.Messaging.createMessage(Widget.Messaging.MessageTypes.SMSMessage);
    var destAddress ="10086";
    if(isNotEmpty(destAddress)&&verifyPhoneNumber(destAddress))
        msg.addAddress("destination", destAddress);
    msg.subject = "create SMS succeeded";
    msg.body = "send an sms out to 1008 via widget API";
    Widget.Messaging.sendMessage(msg);
    document.getElementById("textdivshowResult").innerHTML = "Result : "
            + "send " + msg.messageType + " out";
}

function getSMSMessage()
{    
    showDetail_Messaging();
    document.getElementById("textdivshowResult").innerHTML = "";
    document.getElementById("textdivshowName").innerHTML = "Method getMessage";
    document.getElementById("textdivshowExplanation").innerHTML = "Get a SMS message.  ";
    document.getElementById("textdivshowSampleCode").innerHTML = "E.g.: Widget.Messaging.getMessage\n(Widget.Messaging.MessageTypes.SMSMessage, Widget.Messaging.MessageFolderTypes.OUTBOX,\n0);";
    document.getElementById("textdivshowInitialCondition").innerHTML = "Notice : Need test on phone.";
    flag = "ActivegetSMSMessage";
}

function getMMSMessage()
{    
    showDetail_Messaging();
    document.getElementById("textdivshowResult").innerHTML = "";
    document.getElementById("textdivshowName").innerHTML = "Method getMessage";
    document.getElementById("textdivshowExplanation").innerHTML = "Get a MMS message.  ";
    document.getElementById("textdivshowSampleCode").innerHTML = "E.g.:Widget.Messaging.getMessage\n(Widget.Messaging.MessageTypes.MMSMessage,\nWidget.Messaging.MessageFolderTypes.INBOX,\n0);";
    document.getElementById("textdivshowInitialCondition").innerHTML = "Notice : Need test on phone.";
    flag = "ActivegetMMSMessage";
}

function getEmailMessage()
{    showDetail_Messaging();
    document.getElementById("textdivshowResult").innerHTML = "";
    document.getElementById("textdivshowName").innerHTML = "Method getMessage";
    document.getElementById("textdivshowExplanation").innerHTML = "Get an Email message.  ";
    document.getElementById("textdivshowSampleCode").innerHTML = "E.g.:Widget.Messaging.getMessage\n(Widget.Messaging.MessageTypes.EmailMessage,\nWidget.Messaging.MessageFolderTypes.INBOX,\n0);";
    document.getElementById("textdivshowInitialCondition").innerHTML = "Notice : n/a";
    flag = "ActivegetEmailMessage";
}

function ActivegetSMSMessage()
{
    var msg =  Widget.Messaging.getMessage(Widget.Messaging.MessageTypes.SMSMessage, Widget.Messaging.MessageFolderTypes.SENTBOX,0);
    if (msg != null)
    {
        document.getElementById("textdivshowResult").innerHTML = "sms content = "+ msg.body;
    }
    else
    {
        document.getElementById("textdivshowResult").innerHTML = "No Sms message in Sentbox";
    }
}

function ActivegetMMSMessage()
{
    var msg =  Widget.Messaging.getMessage(Widget.Messaging.MessageTypes.MMSMessage, Widget.Messaging.MessageFolderTypes.INBOX,0);
    if (msg != null)
    {
        document.getElementById("textdivshowResult").innerHTML = "Mms content = "+ msg.body;
    }
    else
    {
        document.getElementById("textdivshowResult").innerHTML = "No Mms message in inbox";
    }
}

function ActivegetEmailMessage()
{
    var msg =  Widget.Messaging.getMessage(Widget.Messaging.MessageTypes.EmailMessage, Widget.Messaging.MessageFolderTypes.INBOX,0);
    if (msg != null)
    {
        document.getElementById("textdivshowResult").innerHTML = "Email body = "+ msg.body;
    }
    else
    {
        document.getElementById("textdivshowResult").innerHTML = "No Email message in inbox";
    }
}

function getSMSFolderNames()
{
    showDetail_Messaging();
    document.getElementById("textdivshowResult").innerHTML = "";
    document.getElementById("textdivshowName").innerHTML = "Method getFolderNames";
    document.getElementById("textdivshowExplanation").innerHTML = "Get supported SMS folders";
    document.getElementById("textdivshowSampleCode").innerHTML = "E.g.:  var folder= Widget.Messaging.getFolderNames\n(Widget.Messaging.MessageTypes.SMSMessage);";
    document.getElementById("textdivshowInitialCondition").innerHTML = "Notice : Need test on phone.";
    flag = "ActivegetSMSFolderNames";
}

function ActivegetSMSFolderNames()
{
    var folder= Widget.Messaging.getFolderNames(Widget.Messaging.MessageTypes.SMSMessage);
    
    for(i=0; i<folder.length; i++)
    {
        var str = "Sms folder["+i+"] = "+folder[i];
    }
    document.getElementById("textdivshowResult").innerHTML = str;
}

function getMMSFolderNames()
{
    showDetail_Messaging();
    document.getElementById("textdivshowResult").innerHTML = "";
    document.getElementById("textdivshowName").innerHTML = "Method getFolderNames";
    document.getElementById("textdivshowExplanation").innerHTML = "Get supported MMS folders";
    document.getElementById("textdivshowSampleCode").innerHTML = "E.g.:  var folder= Widget.Messaging.getFolderNames\n(Widget.Messaging.MessageTypes.MMSMessage);";
    document.getElementById("textdivshowInitialCondition").innerHTML = "Notice : n/a";
    flag = "ActivegetMMSFolderNames";
}

function getEmailFolderNames()
{
    showDetail_Messaging();
    document.getElementById("textdivshowResult").innerHTML = "";
    document.getElementById("textdivshowName").innerHTML = "Method getFolderNames";
    document.getElementById("textdivshowExplanation").innerHTML = "Get supported Email folders";
    document.getElementById("textdivshowSampleCode").innerHTML = "E.g.:  var folder= Widget.Messaging.getFolderNames\n(Widget.Messaging.MessageTypes.EmailMessage);";
    document.getElementById("textdivshowInitialCondition").innerHTML = "Notice : n/a";
    flag = "ActivegetEmailFolderNames";
}

function ActivegetEmailFolderNames()
{
    var folder= Widget.Messaging.getFolderNames(Widget.Messaging.MessageTypes.EmailMessage);
    
    for(i=0; i<folder.length; i++)
    {
        var str = "eMail folder["+i+"] = "+folder[i];
    }
    document.getElementById("textdivshowResult").innerHTML = str;

}

function ActivegetMMSFolderNames()
{
    var folder= Widget.Messaging.getFolderNames(Widget.Messaging.MessageTypes.MMSMessage);    
    var str=" ";
    for(var i=0; i<folder.length; i++)
    {
        str += "Mms folder["+i+"] = "+folder[i] +"<br>";
    }
    document.getElementById("textdivshowResult").innerHTML = str;
}

//-----------------------------------------delete All message------------------------------------------------
function deleteAllSMSMessages()
{
    showDetail_Messaging();
    document.getElementById("textdivshowResult").innerHTML = "";
    document.getElementById("textdivshowName").innerHTML = "Method deleteAllMessages";
    document.getElementById("textdivshowExplanation").innerHTML = "Delete All SMS messages in specified box";
    document.getElementById("textdivshowSampleCode").innerHTML = "E.g.: Widget.Messaging.deleteAllMessages\n(Widget.Messaging.MessageTypes.SMSMessage,\n Widget.Messaging.MessageFolderTypes.SENTBOX);";
    document.getElementById("textdivshowInitialCondition").innerHTML = "Notice : n/a";
    flag = "ActivedeleteAllSMSMessages";
}

function deleteAllMMSMessages()
{
    showDetail_Messaging();
    document.getElementById("textdivshowResult").innerHTML = "";
    document.getElementById("textdivshowName").innerHTML = "Method deleteAllMessages";
    document.getElementById("textdivshowExplanation").innerHTML = "Delete All MMS messages in specified box ";
    document.getElementById("textdivshowSampleCode").innerHTML = "E.g.: Widget.Messaging.deleteAllMessages\n(Widget.Messaging.MessageTypes.MMSMessage,\n Widget.Messaging.MessageFolderTypes.INBOX);";
    document.getElementById("textdivshowInitialCondition").innerHTML = "Notice : n/a";
    flag = "ActivedeleteAllMMSMessages";
}


function deleteAllEmailMessages()
{
    showDetail_Messaging();
    document.getElementById("textdivshowResult").innerHTML = "";
    document.getElementById("textdivshowName").innerHTML = "Method deleteAllMessages";
    document.getElementById("textdivshowExplanation").innerHTML = "Delete All Email messages in specified box";
    document.getElementById("textdivshowSampleCode").innerHTML = "E.g.: Widget.Messaging.deleteAllMessages\n(Widget.Messaging.MessageTypes.EmailMessage,\n Widget.Messaging.MessageFolderTypes.INBOX);";
    document.getElementById("textdivshowInitialCondition").innerHTML = "Notice : n/a";
    flag = "ActivedeleteAllEmailMessages";
}

function deleteOneSmsMessages1()
{    
    showDetail_Messaging();
    document.getElementById("textdivshowResult").innerHTML = "";
    document.getElementById("textdivshowName").innerHTML = "Method deleteMessage";
    document.getElementById("textdivshowExplanation").innerHTML = "Delete one SMS in inbox.";
    document.getElementById("textdivshowSampleCode").innerHTML = "E.g.:  var msg =  Widget.Messaging.getMessage\n(Widget.Messaging.MessageTypes.SMSMessage, \nWidget.Messaging.MessageFolderTypes.INBOX,0);<br>Widget.Messaging.deleteMessage(Widget.Messaging.MessageTypes.SMSMessage, Widget.Messaging.MessageFolderTypes.INBOX, msg.messageId);";
    document.getElementById("textdivshowInitialCondition").innerHTML = "Notice : n/a";
    flag = "ActivedeleteOneSMSMessage";
}
function deleteOneMmsMessages1()
{
    showDetail_Messaging();
    document.getElementById("textdivshowResult").innerHTML = "";
    document.getElementById("textdivshowName").innerHTML = "Method deleteMessage";
    document.getElementById("textdivshowExplanation").innerHTML = "Delete one MMS in inbox.";
    document.getElementById("textdivshowSampleCode").innerHTML = "E.g.:  var msg =  Widget.Messaging.getMessage\n(Widget.Messaging.MessageTypes.MMSMessage, \nWidget.Messaging.MessageFolderTypes.INBOX,0);<br>Widget.Messaging.deleteMessage(Widget.Messaging.MessageTypes.MMSMessage, Widget.Messaging.MessageFolderTypes.INBOX, msg.messageId);";
    document.getElementById("textdivshowInitialCondition").innerHTML = "Notice : n/a";
    flag = "ActivedeleteOneMMSMessage";
}

function deleteOneEmailMessages1()
{
    showDetail_Messaging();
    document.getElementById("textdivshowResult").innerHTML = "";
    document.getElementById("textdivshowName").innerHTML = "Method deleteMessage";
    document.getElementById("textdivshowExplanation").innerHTML = "Delete an Email in inbox.";
    document.getElementById("textdivshowSampleCode").innerHTML = "E.g.:  var msg =  Widget.Messaging.getMessage\n(Widget.Messaging.MessageTypes.EmailMessage, \nWidget.Messaging.MessageFolderTypes.INBOX,0);<br>Widget.Messaging.deleteMessage(Widget.Messaging.MessageTypes.EmailMessage, Widget.Messaging.MessageFolderTypes.INBOX, msg.messageId);";
    document.getElementById("textdivshowInitialCondition").innerHTML = "Notice : n/a";
    flag = "ActivedeleteOneEmailMessage";
}
function ActivedeleteAllSMSMessages()
{
    document.getElementById("textdivshowResult").innerHTML = "deleting.....";
    Widget.Messaging.deleteAllMessages(Widget.Messaging.MessageTypes.SMSMessage,
                                    Widget.Messaging.MessageFolderTypes.SENTBOX);
    document.getElementById("textdivshowResult").innerHTML = "delete All SMS in sentbox";
}

function ActivedeleteAllMMSMessages()
{
    document.getElementById("textdivshowResult").innerHTML = "deleting.....";
    Widget.Messaging.deleteAllMessages(Widget.Messaging.MessageTypes.MMSMessage,
                                     Widget.Messaging.MessageFolderTypes.INBOX);
    document.getElementById("textdivshowResult").innerHTML = "delete All MMS in inbox";
}

function ActivedeleteAllEmailMessages()
{
    document.getElementById("textdivshowResult").innerHTML = "deleting.....";
    Widget.Messaging.deleteAllMessages(Widget.Messaging.MessageTypes.EmailMessage,
                                        Widget.Messaging.MessageFolderTypes.INBOX);
    document.getElementById("textdivshowResult").innerHTML = "delete All Email in inbox";
}





function ActivedeleteOneSMSMessage()
{
    document.getElementById("textdivshowResult").innerHTML = "deleting.....";
    var msg =  Widget.Messaging.getMessage(Widget.Messaging.MessageTypes.SMSMessage, Widget.Messaging.MessageFolderTypes.INBOX,0);
    if (msg != null)
    {
        Widget.Messaging.deleteMessage(Widget.Messaging.MessageTypes.SMSMessage, Widget.Messaging.MessageFolderTypes.INBOX, msg.messageId);
        document.getElementById("textdivshowResult").innerHTML = "Delete first SMS message in inbox";
    }
    else
    {
        document.getElementById("textdivshowResult").innerHTML = "No SMS in inbox";
    }
}

function ActivedeleteOneMMSMessage()
{
   document.getElementById("textdivshowResult").innerHTML = "deleting.....";
    var msg =  Widget.Messaging.getMessage(Widget.Messaging.MessageTypes.MMSMessage, Widget.Messaging.MessageFolderTypes.INBOX,0);
    if (msg != null)
    {
        Widget.Messaging.deleteMessage(Widget.Messaging.MessageTypes.MMSMessage, Widget.Messaging.MessageFolderTypes.INBOX, msg.messageId);
        document.getElementById("textdivshowResult").innerHTML = "Delete first MMS message in inbox";
    }
    else
    {
        document.getElementById("textdivshowResult").innerHTML = "No MMS in inbox";
    }
}

function ActivedeleteOneEmailMessage()
{
    document.getElementById("textdivshowResult").innerHTML = "deleting.....";
    var msg =  Widget.Messaging.getMessage(Widget.Messaging.MessageTypes.EmailMessage, Widget.Messaging.MessageFolderTypes.INBOX,0);
    if (msg != null)
    {
        Widget.Messaging.deleteMessage(Widget.Messaging.MessageTypes.EmailMessage, Widget.Messaging.MessageFolderTypes.INBOX, msg.messageId);
        document.getElementById("textdivshowResult").innerHTML = "Delete first Email message in inbox";
    }
    else
    {
        document.getElementById("textdivshowResult").innerHTML = "No Email in inbox";
    }
}

//-------------------------------------------copy message to folder -----------------------------------------
function copySmsMessageToFolder()
{
    showDetail_Messaging();
    document.getElementById("textdivshowResult").innerHTML = "";
    document.getElementById("textdivshowName").innerHTML = "Method copyMessageToFolder";
    document.getElementById("textdivshowExplanation").innerHTML = "copy SMS message of outbox to sentbox";
    document.getElementById("textdivshowSampleCode").innerHTML = "E.g.: var msg = Widget.Messaging.getMessage\n(Widget.Messaging.MessageTypes.SMSMessage, \nWidget.Messaging.MessageFolderTypes.OUTBOX,\n0); <br>Widget.Messaging.copyMessageToFolder(msg, \"sentbox\");";
    document.getElementById("textdivshowInitialCondition").innerHTML = "Notice : n/a";
    flag = "ActivecopySMSMessageToFolder";
}

function copyMmsMessageToFolder()
{
    showDetail_Messaging();
    document.getElementById("textdivshowResult").innerHTML = "";
    document.getElementById("textdivshowName").innerHTML = "Method copyMessageToFolder";
    document.getElementById("textdivshowExplanation").innerHTML = "copy MMS message of outbox to sentbox";
    document.getElementById("textdivshowSampleCode").innerHTML = "E.g.: var msg = Widget.Messaging.getMessage\n(Widget.Messaging.MessageTypes.MMSMessage,\n Widget.Messaging.MessageFolderTypes.OUTBOX,\n0); <br>Widget.Messaging.copyMessageToFolder(msg, \"sentbox\");";
    document.getElementById("textdivshowInitialCondition").innerHTML = "Notice : n/a";
    flag = "ActivecopyMmsMessageToFolder";
}

function copyEmailMessageToFolder()
{
    showDetail_Messaging();
    document.getElementById("textdivshowResult").innerHTML = "";
    document.getElementById("textdivshowName").innerHTML = "Method copyMessageToFolder";
    document.getElementById("textdivshowExplanation").innerHTML = "copy Email message of outbox to sentbox";
    document.getElementById("textdivshowSampleCode").innerHTML = "E.g.: var msg = Widget.Messaging.getMessage\n(Widget.Messaging.MessageTypes.EmailMessage, \nWidget.Messaging.MessageFolderTypes.OUTBOX,\n0); <br>Widget.Messaging.copyMessageToFolder(msg, \"sentbox\");";
    document.getElementById("textdivshowInitialCondition").innerHTML = "Notice : n/a";
    flag = "ActivecopyEmailMessageToFolder";
}

function ActivecopySMSMessageToFolder()
{


     var msg = Widget.Messaging.getMessage(Widget.Messaging.MessageTypes.SMSMessage, Widget.Messaging.MessageFolderTypes.OUTBOX,0);
     if (msg != null )
     {
         Widget.Messaging.copyMessageToFolder(msg, "sentbox");
         document.getElementById("textdivshowResult").innerHTML = "Copy one SMS message from outbox to sentbox";
     }
     else
     {
         document.getElementById("textdivshowResult").innerHTML = "No SMS message in outbox";
     }
}

function ActivecopyMmsMessageToFolder()
{
     var msg = Widget.Messaging.getMessage(Widget.Messaging.MessageTypes.MMSMessage, Widget.Messaging.MessageFolderTypes.OUTBOX,0);
     if (msg != null )
     {
         Widget.Messaging.copyMessageToFolder(msg, "sentbox");
         document.getElementById("textdivshowResult").innerHTML = "Copy one MMS message from outbox to sentbox";
     }
     else
     {
         document.getElementById("textdivshowResult").innerHTML = "No MMS message in outbox";
     }
}

function ActivecopyEmailMessageToFolder()
{
    var msg = Widget.Messaging.getMessage(Widget.Messaging.MessageTypes.EmailMessage, Widget.Messaging.MessageFolderTypes.OUTBOX,0);
     if (msg != null )
     {
         Widget.Messaging.copyMessageToFolder(msg, "sentbox");
         document.getElementById("textdivshowResult").innerHTML = "Copy one Email message from outbox to sentbox";
     }
     else
     {
         document.getElementById("textdivshowResult").innerHTML = "No Email message in outbox";
     }
}

function getSmsMessageQuantities()
{
    showDetail_Messaging();
    document.getElementById("textdivshowResult").innerHTML = "";
    document.getElementById("textdivshowName").innerHTML = "Method getMessageQuantities";
    document.getElementById("textdivshowExplanation").innerHTML = "Get SMS count in inbox";
    document.getElementById("textdivshowSampleCode").innerHTML = "E.g.: Widget.Messaging.getMessageQuantities\v(Widget.Messaging.MessageTypes.SMSMessage,\n Widget.Messaging.MessageFolderTypes.INBOX);";
    document.getElementById("textdivshowInitialCondition").innerHTML = "Notice : n/a";
    flag = "ActivegetSMSMessageQuantities";
}

function getMmsMessageQuantities()
{
    showDetail_Messaging();
    document.getElementById("textdivshowResult").innerHTML = "";
    document.getElementById("textdivshowName").innerHTML = "Method getMessageQuantities";
    document.getElementById("textdivshowExplanation").innerHTML = "Get MMS count in inbox";
    document.getElementById("textdivshowSampleCode").innerHTML = "E.g.: Widget.Messaging.getMessageQuantities\v(Widget.Messaging.MessageTypes.MMSMessage,\n Widget.Messaging.MessageFolderTypes.INBOX);";
    document.getElementById("textdivshowInitialCondition").innerHTML = "Notice : n/a";
    flag = "ActivegetMmsMessageQuantities";
}

function getEmailMessageQuantities()
{
    showDetail_Messaging();
    document.getElementById("textdivshowResult").innerHTML = "";
    document.getElementById("textdivshowName").innerHTML = "Method getMessageQuantities";
    document.getElementById("textdivshowExplanation").innerHTML = "Get Email count in inbox";
    document.getElementById("textdivshowSampleCode").innerHTML = "E.g.: Widget.Messaging.getMessageQuantities\v(Widget.Messaging.MessageTypes.EmailMessage,\n Widget.Messaging.MessageFolderTypes.INBOX);";
    document.getElementById("textdivshowInitialCondition").innerHTML = "Notice : n/a";
    flag = "ActivegetEmailMessageQuantities";
}

function ActivegetSMSMessageQuantities()
{
    var msgCount = Widget.Messaging.getMessageQuantities(Widget.Messaging.MessageTypes.SMSMessage, Widget.Messaging.MessageFolderTypes.INBOX);
    if (msgCount != null) {
        document.getElementById("textdivshowResult").innerHTML = "total message num = " +msgCount.totalMessageCnt;
    }
    else {
        document.getElementById("textdivshowResult").innerHTML = "get message quantity error";
    }
}

function ActivegetMmsMessageQuantities()
{
    var msgCount = Widget.Messaging.getMessageQuantities(Widget.Messaging.MessageTypes.MMSMessage, Widget.Messaging.MessageFolderTypes.INBOX);
    if (msgCount != null) {
        document.getElementById("textdivshowResult").innerHTML = "total mms messages num in inbox = " +msgCount.totalMessageCnt;
    }
    else {
        document.getElementById("textdivshowResult").innerHTML = "get message quantity error";
    }
}

function ActivegetEmailMessageQuantities()
{
    var msgCount = Widget.Messaging.getMessageQuantities(Widget.Messaging.MessageTypes.EmailMessage, Widget.Messaging.MessageFolderTypes.INBOX);
    if (msgCount != null) {
        document.getElementById("textdivshowResult").innerHTML = "total message num = " +msgCount.totalMessageCnt;
    }
    else {
        document.getElementById("textdivshowResult").innerHTML = "get message quantity error";
    }
}




//------------------------------------------------------------------Move message to folder----------------------------------------
function moveSmsMessageToFolder()
{
    showDetail_Messaging();
    document.getElementById("textdivshowResult").innerHTML = "";
    document.getElementById("textdivshowName").innerHTML = "Method moveMessageToFolder";
    document.getElementById("textdivshowExplanation").innerHTML = "move SMS messages of outbox to sentbox";
    document.getElementById("textdivshowSampleCode").innerHTML = "E.g.: var msg = Widget.Messaging.getMessage\n(Widget.Messaging.MessageTypes.SMSMessage, \nWidget.Messaging.MessageFolderTypes.OUTBOX,\n0); <br>Widget.Messaging.moveMessageToFolder(msg, \"sentbox\");";
    document.getElementById("textdivshowInitialCondition").innerHTML = "Notice : n/a";
    flag = "ActivemoveSMSMessageToFolder";
}

function moveMmsMessageToFolder()
{
    showDetail_Messaging();
    document.getElementById("textdivshowResult").innerHTML = "";
    document.getElementById("textdivshowName").innerHTML = "Method moveMessageToFolder";
    document.getElementById("textdivshowExplanation").innerHTML = "move MMS messages of outbox to sentbox";
    document.getElementById("textdivshowSampleCode").innerHTML = "E.g.: var msg = Widget.Messaging.getMessage\n(Widget.Messaging.MessageTypes.MMSMessage, \nWidget.Messaging.MessageFolderTypes.OUTBOX,\n0); <br>Widget.Messaging.moveMessageToFolder(msg, \"sentbox\");";
    document.getElementById("textdivshowInitialCondition").innerHTML = "Notice : n/a";
    flag = "ActivemoveMmsMessageToFolder";
}

function moveEmailMessageToFolder()
{
    showDetail_Messaging();
    document.getElementById("textdivshowResult").innerHTML = "";
    document.getElementById("textdivshowName").innerHTML = "Method moveMessageToFolder";
    document.getElementById("textdivshowExplanation").innerHTML = "move Email messages of outbox to sentbox";
    document.getElementById("textdivshowSampleCode").innerHTML = "E.g.: var msg = Widget.Messaging.getMessage\n(Widget.Messaging.MessageTypes.EmailMessage, \nWidget.Messaging.MessageFolderTypes.OUTBOX,\n0); <br>Widget.Messaging.moveMessageToFolder(msg, \"sentbox\");";
    document.getElementById("textdivshowInitialCondition").innerHTML = "Notice : n/a";
    flag = "ActivemoveEmailMessageToFolder";
}

function ActivemoveSMSMessageToFolder()
{
     var msg = Widget.Messaging.getMessage(Widget.Messaging.MessageTypes.SMSMessage, Widget.Messaging.MessageFolderTypes.OUTBOX,0);
     if (msg != null )
     {
         Widget.Messaging.moveMessageToFolder(msg, "sentbox");
         document.getElementById("textdivshowResult").innerHTML = "Move one SMS message from outbox to sentbox";
     }
     else
     {
         document.getElementById("textdivshowResult").innerHTML = "No SMS message in outbox";
     }
}

function ActivemoveMmsMessageToFolder()
{
    var msg = Widget.Messaging.getMessage(Widget.Messaging.MessageTypes.MMSMessage, Widget.Messaging.MessageFolderTypes.OUTBOX,0);
     if (msg != null )
     {
         Widget.Messaging.moveMessageToFolder(msg, "sentbox");
         document.getElementById("textdivshowResult").innerHTML = "Move one MMS message from outbox to sentbox";
     }
     else
     {
         document.getElementById("textdivshowResult").innerHTML = "No MMS message in outbox";
     }
}

function ActivemoveEmailMessageToFolder()
{
    var msg = Widget.Messaging.getMessage(Widget.Messaging.MessageTypes.EmailMessage, Widget.Messaging.MessageFolderTypes.OUTBOX,0);
     if (msg != null )
     {
         Widget.Messaging.moveMessageToFolder(msg, "sentbox");
         document.getElementById("textdivshowResult").innerHTML = "Move one Email message from outbox to sentbox";
     }
     else
     {
         document.getElementById("textdivshowResult").innerHTML = "No Email message in outbox";
     }
}

function findMMSMessage()
{
    showDetail_Messaging();
    document.getElementById("textdivshowResult").innerHTML = "";
    document.getElementById("textdivshowName").innerHTML = "Method findMessages of MMS";
    document.getElementById("textdivshowExplanation").innerHTML = "This method search messages with designed\n condition in specified message box. ";
    document.getElementById("textdivshowSampleCode").innerHTML = "E.g.var msg = Widget.Messaging.createMessage(Widget.Messaging.\nMessageTypes.MMSessage);\n"+
                                                                    "msg.addAddress(\"destination\",\"10086\");\n"+
                                                                    "Widget.Messaging.onMessagesFound = myCallBack;\n"+
                                                                    "Widget.Messaging.findMessages(msg, \"inbox\", 0, 9);\n"+
                                                                    "function myCallBack(messages) {\n"+
                                                                    "var size = messages.length;\n"+
                                                                    "}";
    document.getElementById("textdivshowInitialCondition").innerHTML = "Notice : n/a";
    flag = "ActivefindMMSMessage";
}

function findSMSMessage()
{
    showDetail_Messaging();
    document.getElementById("textdivshowResult").innerHTML = "";
    document.getElementById("textdivshowName").innerHTML = "Method findMessages of SMS";
    document.getElementById("textdivshowExplanation").innerHTML = "This method search messages with designed\n condition in specified message box. ";
    document.getElementById("textdivshowSampleCode").innerHTML = "E.g.var msg = Widget.Messaging.createMessage(Widget.Messaging.\nMessageTypes.SMSMessage);\n"+
                                                                    "msg.addAddress(\"destination\",\"10086\");\n"+
                                                                    "Widget.Messaging.onMessagesFound = myCallBack;\n"+
                                                                    "Widget.Messaging.findMessages(msg,\"inbox\",0, 9);\n"+
                                                                    "function myCallBack(messages) {\n"+
                                                                        "var size = messages.length;\n"+
                                                                    "}" ;
    document.getElementById("textdivshowInitialCondition").innerHTML = "Notice : n/a";
    flag = "ActivefindSMSMessage";
}

function findEmailMessage()
{
    showDetail_Messaging();
    document.getElementById("textdivshowResult").innerHTML = "";
    document.getElementById("textdivshowName").innerHTML = "Method findMessages";
    document.getElementById("textdivshowExplanation").innerHTML = "find Email messages whose \"to\" address contains \"gmail\" in sentbox";
    document.getElementById("textdivshowSampleCode").innerHTML = "E.g.var msg = Widget.Messaging.createMessage(Widget.Messaging.\nMessageTypes.EmailMessage);\n"+
                                                                    "msg.addAddress(\"cc\",\"gmail\");\n"+
                                                                    "Widget.Messaging.onMessagesFound = myCallBack;\n"+
                                                                    "Widget.Messaging.findMessages(msg, \"inbox\",0, 9);\n"+
                                                                    "function myCallBack(messages) {\n"+
                                                                    "var size = messages.length;\n"+
                                                                    "}";
    document.getElementById("textdivshowInitialCondition").innerHTML = "Notice : n/a";
    flag = "ActivefindEmailMessage";
}

function ActivefindMMSMessage()
{
    var msg = Widget.Messaging.createMessage(Widget.Messaging.MessageTypes.MMSMessage);
    msg.addAddress("destination", "10086");  
    document.getElementById("textdivshowResult").innerHTML = "searching MMS ...";
    ActiveonMmsMessagesFound();
    Widget.Messaging.findMessages(msg, "outbox", 0, 9);    
}

function ActivefindSMSMessage()
{
    var msg = Widget.Messaging.createMessage(Widget.Messaging.MessageTypes.SMSMessage);
    msg.addAddress("destination", "10086");
    document.getElementById("textdivshowResult").innerHTML = "searching SMS";
    ActiveonSmsMessagesFound();
    Widget.Messaging.findMessages(msg, "sentbox", 0, 9);
}

function ActivefindEmailMessage()
{
    var msg = Widget.Messaging.createMessage(Widget.Messaging.MessageTypes.EmailMessage);
    msg.addAddress("destination", "gmail"); 
    document.getElementById("textdivshowResult").innerHTML = "searching Email";
    ActiveonEmailMessagesFound();
    Widget.Messaging.findMessages(msg, "inbox", 0, 9);
}

function onMmsMessageArrived()
{
    showDetail_Messaging();
    document.getElementById("textdivshowResult").innerHTML = "";
    document.getElementById("textdivshowName").innerHTML = "Field onMessageArrived";
    document.getElementById("textdivshowExplanation").innerHTML = "This registed callback function will be called when SMS/MMS/Email message arrives.";
    document.getElementById("textdivshowSampleCode").innerHTML = "E.g.:  Widget.Messaging.onMessageArrived = onMessageComing_callback;";
    document.getElementById("textdivshowInitialCondition").innerHTML = "Notice : onMessageComing_callback is a callback function, and need test on phone..";
    flag = "ActiveonMmsMessageArrived";
}

function ActiveonMmsMessageArrived()
{     
    Widget.Messaging.onMessageArrived = function(msg){
        document.getElementById("textdivshowResult").innerHTML = "New message. Type = "+msg.messageType;    
    };
    document.getElementById("textdivshowResult").innerHTML = "waiting new message.....";
}

function onMmsMessagesFound()
{
    showDetail_Messaging();
    document.getElementById("textdivshowResult").innerHTML = "";
    document.getElementById("textdivshowName").innerHTML = "Field onMessagesFound";
    document.getElementById("textdivshowExplanation").innerHTML = "register a mms onMessageFound callback function";
    document.getElementById("textdivshowSampleCode").innerHTML = "E.g.: ";
    document.getElementById("textdivshowInitialCondition").innerHTML = "Notice : Need test on phone.";
    flag = "ActiveonMmsMessagesFound";
}

function ActiveonMmsMessagesFound()
{
    document.getElementById("textdivshowResult").innerHTML = "waiting search result...";
    function onMessageFound_callback(msgs, folder)
    {
        if (msgs != null && msgs.length != 0)
        {
            document.getElementById("textdivshowResult").innerHTML = "matched messages in "+folder+", number = " + msgs.length;
        }
        else
        {
            document.getElementById("textdivshowResult").innerHTML = "Did not find matched messages in "+folder;
        }
    }
    Widget.Messaging.onMessagesFound = onMessageFound_callback;
}

function onSmsMessagesFound()
{
    showDetail_Messaging();
    document.getElementById("textdivshowResult").innerHTML = "";
    document.getElementById("textdivshowName").innerHTML = "Field onMessagesFound";
    document.getElementById("textdivshowExplanation").innerHTML = "register a sms onMessageFound callback function";
    document.getElementById("textdivshowSampleCode").innerHTML = "E.g.: ";
    document.getElementById("textdivshowInitialCondition").innerHTML = "Notice : Need test on phone.";
    flag = "ActiveonSmsMessagesFound";
}

function ActiveonSmsMessagesFound()
{
    document.getElementById("textdivshowResult").innerHTML = "waiting search result...";
    function onMessageFound_callback(msgs, folder)
    {
        if (msgs != null && msgs.length != 0)
        {
            document.getElementById("textdivshowResult").innerHTML = "matched messages in "+folder+", number = " + msgs.length;
        }
        else
        {
            document.getElementById("textdivshowResult").innerHTML = "Did not find matched messages in "+folder;
        }
    }
    Widget.Messaging.onMessagesFound = onMessageFound_callback;
}


function onEmailMessagesFound()
{
    showDetail_Messaging();
    document.getElementById("textdivshowResult").innerHTML = "";
    document.getElementById("textdivshowName").innerHTML = "Field onMessagesFound";
    document.getElementById("textdivshowExplanation").innerHTML = "register an Email onMessageFound callback function";
    document.getElementById("textdivshowSampleCode").innerHTML = "E.g.: ";
    document.getElementById("textdivshowInitialCondition").innerHTML = "Notice : n/a";
    flag = "ActiveonEmailMessagesFound";
}

function ActiveonEmailMessagesFound()
{
    document.getElementById("textdivshowResult").innerHTML = "waiting search result...";
    function onMessageFound_callback(msgs, folder)
    {
        if (msgs != null && msgs.length != 0)
        {
            document.getElementById("textdivshowResult").innerHTML = "matched messages in "+folder+", number = " + msgs.length;
        }
        else
        {
            document.getElementById("textdivshowResult").innerHTML = "Did not find matched messages in "+folder;
        }
    }
    Widget.Messaging.onMessagesFound = onMessageFound_callback;
}

//get Email Accounts test case:
function getAllEmailAccounts()
{
    showDetail_Messaging();
    document.getElementById("textdivshowResult").innerHTML = "";
    document.getElementById("textdivshowName").innerHTML = "Method getEmailAccounts";
    document.getElementById("textdivshowExplanation").innerHTML = "get all email accouts in the email applicaton";
    document.getElementById("textdivshowSampleCode").innerHTML = "E.g.: var accounts = Widget.Messaging.getEmailAccounts()";
    document.getElementById("textdivshowInitialCondition").innerHTML = "Notice : n/a";
    flag = "ActivegetAllEmailAccounts";
}

function ActivegetAllEmailAccounts()
{
    var accounts = Widget.Messaging.getEmailAccounts();

    if (accounts != null && accounts.length != 0)
    {
         document.getElementById("textdivshowResult").innerHTML = "find "+ accounts.length +"email accounts.";
    }
    else
    {
         document.getElementById("textdivshowResult").innerHTML = "No Email accounts found";
    }
}

//get currentEmailAccount test case:
function getCurrentEmailAccount()
{
    showDetail_Messaging();
    document.getElementById("textdivshowResult").innerHTML = "";
    document.getElementById("textdivshowName").innerHTML = "Method getCurrentEmailAccount";
    document.getElementById("textdivshowExplanation").innerHTML = "get default email account in the email applicaton";
    document.getElementById("textdivshowSampleCode").innerHTML = "E.g.: var account = Widget.Messaging.getCurrentEmailAccount();";
    document.getElementById("textdivshowInitialCondition").innerHTML = "Notice : n/a";
    flag = "ActivegetCurrentEmailAccount";
}

function ActivegetCurrentEmailAccount()
{
    var accounts = Widget.Messaging.getCurrentEmailAccount();

    if (accounts != null)
    {
         document.getElementById("textdivshowResult").innerHTML = "default email account name = "+ accounts.accountName;
    }
    else
    {
         document.getElementById("textdivshowResult").innerHTML = "No default Email account found";
    }
}


//set currentEmailAccount test case:
function setCurrentEmailAccount()
{
    showDetail_Messaging();
    document.getElementById("textdivshowResult").innerHTML = "";
    document.getElementById("textdivshowName").innerHTML = "Method setCurrentEmailAccount";
    document.getElementById("textdivshowExplanation").innerHTML = "Set the Email account specified by account ID as default Email account.";
    document.getElementById("textdivshowSampleCode").innerHTML = "E.g.: var accounts = Widget.Messaging.getEmailAccounts();"+"<br>"
+ "Widget.Messaging.setCurrentEmailAccount(accounts[0].accountId);";
    document.getElementById("textdivshowInitialCondition").innerHTML = "Notice : n/a";
    flag = "ActivesetCurrentEmailAccount";
}

function ActivesetCurrentEmailAccount()
{
    var accounts = Widget.Messaging.getEmailAccounts();
    if (accounts != null && accounts.length != 0)
    {
        Widget.Messaging.setCurrentEmailAccount(accounts[0].accountId);
        document.getElementById("textdivshowResult").innerHTML = "set account " + accounts[0].accountId +"as default account";
    }
    else
    {
         document.getElementById("textdivshowResult").innerHTML = "No Email accounts found";
    }
}

//deleteEmailAccount test case:
function deleteEmailAccount()
{
    showDetail_Messaging();
    document.getElementById("textdivshowResult").innerHTML = "";
    document.getElementById("textdivshowName").innerHTML = "Method deleteEmailAccount";
    document.getElementById("textdivshowExplanation").innerHTML = "delete an email account";
    document.getElementById("textdivshowSampleCode").innerHTML = "E.g.: var accounts = Widget.Messaging.getEmailAccounts();"+"<br>"
+ " Widget.Messaging.deleteEmailAccount(accounts[0].accountId);";
    document.getElementById("textdivshowInitialCondition").innerHTML = "Notice : n/a";
    flag = "ActivedeleteEmailAccount";
}

function ActivedeleteEmailAccount()
{
    var accounts = Widget.Messaging.getEmailAccounts();
    if (accounts != null)
    {
        Widget.Messaging.deleteEmailAccount(accounts[0].accountId);
        document.getElementById("textdivshowResult").innerHTML = "delete email account id=" + accounts[0].accountId;
    }
    else
    {
         document.getElementById("textdivshowResult").innerHTML = "No Email accounts found";
    }
    
}


function createSMSFolder()
{    
    showDetail_Messaging();
    document.getElementById("textdivshowResult").innerHTML = "";
    document.getElementById("textdivshowName").innerHTML = "Method createFolder";
    document.getElementById("textdivshowExplanation").innerHTML = "Create a SMS folder.  ";
    document.getElementById("textdivshowSampleCode").innerHTML = "E.g.:  Widget.Messaging.createFolder(Widget.Messaging.MessageTypes.SMSMessage, \"myfolder\");";
    document.getElementById("textdivshowInitialCondition").innerHTML = "Notice : n/a";
    flag = "ActivecreateSMSFolder";
}

function ActivecreateSMSFolder()
{
   Widget.Messaging.createFolder(Widget.Messaging.MessageTypes.SMSMessage, "myfolder");
    document.getElementById("textdivshowResult").innerHTML = "create myFolder finished";

}

function createMMSFolder()
{
    showDetail_Messaging();
    document.getElementById("textdivshowResult").innerHTML = "";
    document.getElementById("textdivshowName").innerHTML = "Method createFolder";
    document.getElementById("textdivshowExplanation").innerHTML = "Create a MMS folder.  ";
    document.getElementById("textdivshowSampleCode").innerHTML = "E.g.:     Widget.Messaging.createFolder(Widget.Messaging.MessageTypes.MMSMessage, \"myMMSfolder\");";
    document.getElementById("textdivshowInitialCondition").innerHTML = "Notice : n/a";
    flag = "ActivecreateMMSFolder";
}
function ActivecreateMMSFolder()
{
    Widget.Messaging.createFolder(Widget.Messaging.MessageTypes.MMSMessage, "myMMSfolder");
    document.getElementById("textdivshowResult").innerHTML = "create myMMSFolder finished";

}
function createEmailFolder()
{    
    showDetail_Messaging();
    document.getElementById("textdivshowResult").innerHTML = "";
    document.getElementById("textdivshowName").innerHTML = "Method createFolder";
    document.getElementById("textdivshowExplanation").innerHTML = "Create a Email folder.  ";
    document.getElementById("textdivshowSampleCode").innerHTML = "E.g.:     Widget.Messaging.createFolder(Widget.Messaging.MessageTypes.EmailMessage, \"myfolder\");";
    document.getElementById("textdivshowInitialCondition").innerHTML = "Notice : n/a";
    flag = "ActivecreateEmailFolder";
}

function ActivecreateEmailFolder()
{
    Widget.Messaging.createFolder(Widget.Messaging.MessageTypes.EmailMessage, "myfolder");
    document.getElementById("textdivshowResult").innerHTML = "create email myFolder finished";

}


function deleteSMSFolder()
{    
    showDetail_Messaging();
    document.getElementById("textdivshowResult").innerHTML = "";
    document.getElementById("textdivshowName").innerHTML = "Method deleteFolder";
    document.getElementById("textdivshowExplanation").innerHTML = "Delete a SMS folder.  ";
    document.getElementById("textdivshowSampleCode").innerHTML = "E.g.:     Widget.Messaging.deleteFolder(Widget.Messaging.MessageTypes.SMSMessage, \"myfolder\");";
    document.getElementById("textdivshowInitialCondition").innerHTML = "Notice : Need test on phone.";
    flag = "ActivedeleteSMSFolder";
}

function ActivedeleteSMSFolder()
{
    Widget.Messaging.deleteFolder(Widget.Messaging.MessageTypes.SMSMessage, "myfolder");
    document.getElementById("textdivshowResult").innerHTML = "Delete myFolder finished";

}

function  deleteMMSFolder ()
{    
    showDetail_Messaging();
    document.getElementById("textdivshowResult").innerHTML = "";
    document.getElementById("textdivshowName").innerHTML = "Method deleteFolder";
    document.getElementById("textdivshowExplanation").innerHTML = "Delete a MMS folder.  ";
    document.getElementById("textdivshowSampleCode").innerHTML = "E.g.:     Widget.Messaging.deleteFolder(Widget.Messaging.MessageTypes.MMSMessage, \"myMMSfolder\");";
    document.getElementById("textdivshowInitialCondition").innerHTML = "Notice : n/a";
    flag = "ActiDeleteMMSFolder";
}

function ActiDeleteMMSFolder()
{

   Widget.Messaging.deleteFolder(Widget.Messaging.MessageTypes.MMSMessage, "myMMSfolder");
    document.getElementById("textdivshowResult").innerHTML = "Delete myMMSFolder finished";

}
function deleteEmailFolder()
{    
    showDetail_Messaging();
    document.getElementById("textdivshowResult").innerHTML = "";
    document.getElementById("textdivshowName").innerHTML = "Method deleteFolder";
    document.getElementById("textdivshowExplanation").innerHTML = "Delete a Email folder.  ";
    document.getElementById("textdivshowSampleCode").innerHTML = "E.g.:     Widget.Messaging.deleteFolder(Widget.Messaging.MessageTypes.EmailMessage, \"myfolder\");";
    document.getElementById("textdivshowInitialCondition").innerHTML = "Notice : n/a";
    flag = "ActivedeleteEmailFolder";
}

function ActivedeleteEmailFolder()
{
    Widget.Messaging.deleteFolder(Widget.Messaging.MessageTypes.EmailMessage, "myfolder");
    document.getElementById("textdivshowResult").innerHTML = "Delete email myFolder finished";

}
function ActivesendSMSMessage()
{
   var msg = Widget.Messaging.createMessage(Widget.Messaging.MessageTypes.SMSMessage);
   msg.addAddress("destination", "10086");
   msg.body="Test email"; 
   Widget.Messaging.sendMessage(msg);
document.getElementById("textdivshowResult").innerHTML = "Send message finished";

}

function sendEmailMessage()
{    
    showDetail_Messaging();
    document.getElementById("textdivshowResult").innerHTML = "";
    document.getElementById("textdivshowName").innerHTML = "Method sendMessage";
    document.getElementById("textdivshowExplanation").innerHTML = "Attempt to send the specified message (Emal). ";
    document.getElementById("textdivshowSampleCode").innerHTML = "E.g.:   var msg = Widget.Messaging.createMessage(Widget.Messaging.MessageTypes.EmailMessage);<br>  msg.addAddress(\"destination\", \"testme@gmail.com\");; <br>msg.body=\"Test body\"; <br>msg.subject = \"Test sending Email\";<br>Widget.Messaging.sendMessage(msg);"
    document.getElementById("textdivshowInitialCondition").innerHTML = "Notice : n/a";
    flag = "ActivesendEmailMessage";
}

function ActivesendEmailMessage()
{
   var msg = Widget.Messaging.createMessage(Widget.Messaging.MessageTypes.EmailMessage);
   msg.addAddress("destination", "testme@gmail.com");
   msg.body = "Test body";
   msg.subject = "Test sending Email";
   Widget.Messaging.sendMessage(msg);
document.getElementById("textdivshowResult").innerHTML = "Send message finished";

}


function sendMMSMessage()
{    
    showDetail_Messaging();
    document.getElementById("textdivshowResult").innerHTML = "";
    document.getElementById("textdivshowName").innerHTML = "Method sendMessage";
    document.getElementById("textdivshowExplanation").innerHTML = "Attempt to send the specified message (MMS). ";
    document.getElementById("textdivshowSampleCode").innerHTML = "E.g.:   var msg = Widget.Messaging.createMessage(Widget.Messaging.MessageTypes.MMSMessage);<br>  msg.addAddress(\"destination\", \"10086\");; <br>msg.body=\"Test body\"; <br>msg.subject = \"Test sending MMS\";<br>msg.addAttachment(\"/sdcard/myAttachment.png\");<br>Widget.Messaging.sendMessage(msg);"
    document.getElementById("textdivshowInitialCondition").innerHTML = "Notice : n/a";
    flag = "ActivesendMMSMessage";
}

function ActivesendMMSMessage()
{
Widget.Messaging.onMessageSendingFailure = function(msg, errcode) 
   {
 
        document.getElementById("textdivshowResult").innerHTML = "send message failed" + errcode;
   }


    var msg = Widget.Messaging.createMessage( Widget.Messaging.MessageTypes.MMSMessage);
    msg.addAddress("destination", "10086");
    msg.subject = "Test send MMS";
    msg.body="Test to send a MMS through message API, with an attachment.";
    msg.addAttachment("/sdcard/myAttachment.png");

    Widget.Messaging.sendMessage(msg);

    document.getElementById("textdivshowResult").innerHTML = "send message done";

}


function onMessageArrived()
{    
    showDetail_Messaging();
    document.getElementById("textdivshowResult").innerHTML = "";
    document.getElementById("textdivshowName").innerHTML = "Method onMessageArrived";
    document.getElementById("textdivshowExplanation").innerHTML = "Called asynchronously if a  message arrived. ";
    document.getElementById("textdivshowSampleCode").innerHTML = "E.g.:    function onMessageComing_callback(msg)<br>    {<br>        document.getElementById(\"textdivshowResult\").innerHTML = \"message from \" +msg.sourceAddress;<br> }<br>Widget.Messaging.onMessageArrived = onMessageComing_callback;"
    document.getElementById("textdivshowInitialCondition").innerHTML = "Notice : n/a";
    flag = "ActiveonMessageArrived";
}

function ActiveonMessageArrived()
{
 function onMessageComing_callback(msg)
    {
        document.getElementById("textdivshowResult").innerHTML = "message from " +msg.sourceAddress;

    }
    Widget.Messaging.onMessageArrived = onMessageComing_callback;
    
    document.getElementById("textdivshowResult").innerHTML = "waiting new Message...";


}


function onMessageSendingFailure()
{    
    showDetail_Messaging();
    document.getElementById("textdivshowResult").innerHTML = "";
    document.getElementById("textdivshowName").innerHTML = "Method onMessageSendingFailure";
    document.getElementById("textdivshowExplanation").innerHTML = "Called asynchronously if the message could not be delivered to the message sender.";
    document.getElementById("textdivshowSampleCode").innerHTML = "E.g.:    Widget.Messaging.onMessageSendingFailure = function(msg, errcode)<br> {<br> document.getElementById(\"textdivshowResult\").innerHTML = \"send message failed\" + errcode;<br> }<br>"
    document.getElementById("textdivshowInitialCondition").innerHTML = "Notice : n/a";
    flag = "ActiveonMessageSendingFailure";
}

function ActiveonMessageSendingFailure()
{

Widget.Messaging.onMessageSendingFailure = function(msg, errcode) 
   {

        document.getElementById("textdivshowResult").innerHTML = "send message failed" + errcode;
   }
   var msg = Widget.Messaging.createMessage(Widget.Messaging.MessageTypes.SMSMessage);
   msg.addAddress("destination", "1008677999999999999999999");
   msg.body="Test email"; 
   Widget.Messaging.sendMessage(msg);
document.getElementById("textdivshowResult").innerHTML = "Send message finished";


}


function onMessagesFound()
{    
    showDetail_Messaging();
    document.getElementById("textdivshowResult").innerHTML = "";
    document.getElementById("textdivshowName").innerHTML = "Method onMessagesFound";
    document.getElementById("textdivshowExplanation").innerHTML = "Callback method to invoke when Messaging.findMessages completes.";
    document.getElementById("textdivshowSampleCode").innerHTML = "E.g.: Widget.Messaging.onMessagesFound = function (msgs, folder)<br>{<br>document.getElementById(\"textdivshowResult\").innerHTML = \"matched messages number\" + msgs.length;<br>}"
    document.getElementById("textdivshowInitialCondition").innerHTML = "Notice : n/a";
    flag = "ActiveonMessagesFound";
}

function ActiveonMessagesFound()
{

   Widget.Messaging.onMessagesFound = onMessageFound_callback;
   var msg = Widget.Messaging.createMessage(Widget.Messaging.MessageTypes.SMSMessage);
   msg.addAddress("destination", "1008");  
    document.getElementById("textdivshowResult").innerHTML = "searching SMS ...";
    Widget.Messaging.findMessages(msg, "all", 0, 9);



}

function onMessageFound_callback(msgs, folder)
{
    if (msgs == null)
    {
        document.getElementById("textdivshowResult").innerHTML = "Did not find matched message";
        return;
    }

    document.getElementById("textdivshowResult").innerHTML = "matched messages number" + msgs.length;
}




