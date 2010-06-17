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
 * JavaScript objects MessageObject. 
 */

function showMessageObject() {
    var MessageObject = document.getElementById("MessageObject");
    MessageObject.style.display = "block";
    var showDetail = document.getElementById("showDetail");
    showDetail.style.display = "none";
}

function showDetail_Message()
{
    var MessageObject = document.getElementById("MessageObject");
    MessageObject.style.display = "none";
    var showDetail = document.getElementById("showDetail");
    showDetail.style.display = "block";
}

function addSourceAddess() {
    showDetail_Message();
    document.getElementById("textdivshowResult").innerHTML = "";
    document.getElementById("textdivshowName").innerHTML = "Field sourceAddress";
    document.getElementById("textdivshowExplanation").innerHTML = "The source address of this Message. ";
    document.getElementById("textdivshowSampleCode").innerHTML = "E.g.: msg.sourceAddress = \"13800138000\";";
    document.getElementById("textdivshowInitialCondition").innerHTML = "Notice : n/a";
    flag = "addSourceAddess1";
}

function addSourceAddess1() 
{
    var msg = Widget.Messaging
            .createMessage(Widget.Messaging.MessageTypes.SMSMessage);
    var phoneNumber= "13800138000";
    if(isNotEmpty(phoneNumber))
        if(verifyPhoneNumber(phoneNumber))
            msg.sourceAddress = phoneNumber;
    document.getElementById("textdivshowResult").innerHTML = "Result : "
            + msg.sourceAddress;
}

function setattachments() {
    showDetail_Message();
    document.getElementById("textdivshowResult").innerHTML = "";
    document.getElementById("textdivshowName").innerHTML = "Field attachments";
    document.getElementById("textdivshowExplanation").innerHTML = "The attachments of a message. ";
    document.getElementById("textdivshowSampleCode").innerHTML = "E.g.: var attachment = msg.attachments[i].fileName ;";
    document.getElementById("textdivshowInitialCondition").innerHTML = "Notice : n/a";
    flag = "Activesetattachments";
}

function Activesetattachments() 
{
	 var msg = Widget.Messaging.getMessage(Widget.Messaging.MessageTypes.EmailMessage, Widget.Messaging.MessageFolderTypes.INBOX,0);

    if (msg == null || msg.attachments == null)
    {
        document.getElementById("textdivshowResult").innerHTML = "Did not find Attachments of the first email in Inbox";
    }
    else
    {
	var attachments = "Attachments of the first email in Inbox: <br>";
        for(i= 0; i<msg.attachments.length;  i++)
        {
            attachments = attachments + "attachments[" + i + "] = " +msg.attachments[i].fileName + "<br>";
        }
        
        document.getElementById("textdivshowResult").innerHTML = attachments;
    
    }

}

function setbccAddress() {
    showDetail_Message();
    document.getElementById("textdivshowResult").innerHTML = "";
    document.getElementById("textdivshowName").innerHTML = "Field bccAddress";
    document.getElementById("textdivshowExplanation").innerHTML = "The Bcc address of a message.. ";
    document.getElementById("textdivshowSampleCode").innerHTML = "E.g.: var msg = Widget.Messaging.getMessage(Widget.Messaging.MessageTypes.EmailMessage, Widget.Messaging.MessageFolderTypes.INBOX,0);<br> var storedbbcAdr = msg.bccAddress[0];"
    document.getElementById("textdivshowInitialCondition").innerHTML = "Notice : n/a";
    flag = "ActivesetbccAddress";
}

function ActivesetbccAddress() 
{
    var msg = Widget.Messaging.getMessage(Widget.Messaging.MessageTypes.EmailMessage, Widget.Messaging.MessageFolderTypes.INBOX,0);

    if (msg == null || msg.bccAddress == null)
    {
        document.getElementById("textdivshowResult").innerHTML = "Did not find bccAddress of the first email in INBOX";
    }
    else
    {
       
        document.getElementById("textdivshowResult").innerHTML = "The bccAddress of the first email in INBOX: " + msg.bccAddress[0];
    
    }
}

function setbody() {
    showDetail_Message();
    document.getElementById("textdivshowResult").innerHTML = "";
    document.getElementById("textdivshowName").innerHTML = "Field body";
    document.getElementById("textdivshowExplanation").innerHTML = "The body of a message. ";
    document.getElementById("textdivshowSampleCode").innerHTML = "E.g.: var msg = Widget.Messaging.getMessage(Widget.Messaging.MessageTypes.EmailMessage, Widget.Messaging.MessageFolderTypes.INBOX,0);<br> var storedbody = msg.body;"
    document.getElementById("textdivshowInitialCondition").innerHTML = "Notice : n/a";
    flag = "Activesetbody";
}

function Activesetbody() 
{
    var msg = Widget.Messaging.getMessage(Widget.Messaging.MessageTypes.EmailMessage, Widget.Messaging.MessageFolderTypes.INBOX,0);

    if (msg == null || msg.body == null)
    {
        document.getElementById("textdivshowResult").innerHTML = "Did not find body of the first email in INBOX";
    }
    else
    {
       
        document.getElementById("textdivshowResult").innerHTML = "The body of the first email in INBOX: " + msg.body;
    
    }
}

function setcallbackNumber() {
    showDetail_Message();
    document.getElementById("textdivshowResult").innerHTML = "";
    document.getElementById("textdivshowName").innerHTML = "Field callbackNumber";
    document.getElementById("textdivshowExplanation").innerHTML = "The callbackNumber of a message. ";
    document.getElementById("textdivshowSampleCode").innerHTML = "E.g.: var msg = Widget.Messaging.getMessage(Widget.Messaging.MessageTypes.EmailMessage, Widget.Messaging.MessageFolderTypes.INBOX,0);<br> var storedValue = msg.callbackNumber;"
    document.getElementById("textdivshowInitialCondition").innerHTML = "Notice : n/a";
    flag = "ActivesetcallbackNumber";
}

function ActivesetcallbackNumber() 
{
    var msg = Widget.Messaging.getMessage(Widget.Messaging.MessageTypes.EmailMessage, Widget.Messaging.MessageFolderTypes.INBOX,0);

    if (msg == null || msg.callbackNumber == null)
    {
        document.getElementById("textdivshowResult").innerHTML = "No callbackNumber of the first email in INBOX";
    }
    else
    {
       
        document.getElementById("textdivshowResult").innerHTML = "The callbackNumber of the first email in INBOX: " + msg.callbackNumber;
    
    }
}

function setccAddress() {
    showDetail_Message();
    document.getElementById("textdivshowResult").innerHTML = "";
    document.getElementById("textdivshowName").innerHTML = "Field ccAddress";
    document.getElementById("textdivshowExplanation").innerHTML = "The ccAddress of a message. ";
    document.getElementById("textdivshowSampleCode").innerHTML = "E.g.: var msg = Widget.Messaging.getMessage(Widget.Messaging.MessageTypes.EmailMessage, Widget.Messaging.MessageFolderTypes.INBOX,0);<br> var storedValue = msg.ccAddress[0];"
    document.getElementById("textdivshowInitialCondition").innerHTML = "Notice : n/a";
    flag = "ActivesetccAddress";
}

function ActivesetccAddress() 
{
    var msg = Widget.Messaging.getMessage(Widget.Messaging.MessageTypes.EmailMessage, Widget.Messaging.MessageFolderTypes.INBOX,0);

    if (msg == null || msg.ccAddress == null)
    {
        document.getElementById("textdivshowResult").innerHTML = "No ccAddress of the first email in INBOX";
    }
    else
    {
       
        document.getElementById("textdivshowResult").innerHTML = "The ccAddress[0] of the first email in INBOX: " + msg.ccAddress[0];
    
    }
}

function setdestinationAddress() {
    showDetail_Message();
    document.getElementById("textdivshowResult").innerHTML = "";
    document.getElementById("textdivshowName").innerHTML = "Field destinationAddress";
    document.getElementById("textdivshowExplanation").innerHTML = "The destinationAddress of a message. ";
    document.getElementById("textdivshowSampleCode").innerHTML = "E.g.: var msg = Widget.Messaging.getMessage(Widget.Messaging.MessageTypes.EmailMessage, Widget.Messaging.MessageFolderTypes.INBOX,0);<br> var storedValue = msg.destinationAddress[0];"
    document.getElementById("textdivshowInitialCondition").innerHTML = "Notice : n/a";
    flag = "ActivesetdestinationAddress";
}

function ActivesetdestinationAddress() 
{
    var msg = Widget.Messaging.getMessage(Widget.Messaging.MessageTypes.EmailMessage, Widget.Messaging.MessageFolderTypes.INBOX,0);

    if (msg == null || msg.destinationAddress == null)
    {
        document.getElementById("textdivshowResult").innerHTML = "No destinationAddress of the first email in INBOX";
    }
    else
    {
       
        document.getElementById("textdivshowResult").innerHTML = "The destinationAddress of the first email in INBOX: " + msg.destinationAddress[0];
    
    }
}


function setisRead() {
    showDetail_Message();
    document.getElementById("textdivshowResult").innerHTML = "";
    document.getElementById("textdivshowName").innerHTML = "Field isRead";
    document.getElementById("textdivshowExplanation").innerHTML = "The flag \"read\" for this Message. ";
    document.getElementById("textdivshowSampleCode").innerHTML = "E.g.: var msg = Widget.Messaging.getMessage(Widget.Messaging.MessageTypes.EmailMessage, Widget.Messaging.MessageFolderTypes.INBOX,0);<br> var storedValue = msg.isRead;"
    document.getElementById("textdivshowInitialCondition").innerHTML = "Notice : n/a";
    flag = "ActivesetisRead";
}

function ActivesetisRead() 
{
    var msg = Widget.Messaging.getMessage(Widget.Messaging.MessageTypes.EmailMessage, Widget.Messaging.MessageFolderTypes.INBOX,0);

    if (msg == null )
    {
        document.getElementById("textdivshowResult").innerHTML = "Did not find email in INBOX";
    }
    else
    {
       
        document.getElementById("textdivshowResult").innerHTML = "The  first email in INBOX is readed: " + msg.isRead;
    
    }
}

function setmessageId() {
    showDetail_Message();
    document.getElementById("textdivshowResult").innerHTML = "";
    document.getElementById("textdivshowName").innerHTML = "Field messageId";
    document.getElementById("textdivshowExplanation").innerHTML = "A unique indicator (potentially assigned by the WRT) for identifying the Message. ";
    document.getElementById("textdivshowSampleCode").innerHTML = "E.g.: var msg = Widget.Messaging.getMessage(Widget.Messaging.MessageTypes.EmailMessage, Widget.Messaging.MessageFolderTypes.INBOX,0);<br> var storedValue = msg.messageId;"
    document.getElementById("textdivshowInitialCondition").innerHTML = "Notice : n/a";
    flag = "ActivesetmessageId";
}

function ActivesetmessageId() 
{
    var msg = Widget.Messaging.getMessage(Widget.Messaging.MessageTypes.EmailMessage, Widget.Messaging.MessageFolderTypes.INBOX,0);

    if (msg == null )
    {
        document.getElementById("textdivshowResult").innerHTML = "Did not find email in INBOX";
    }
    else
    {
       
        document.getElementById("textdivshowResult").innerHTML = "The messageId of the first email in INBOX: " + msg.messageId;
    
    }
}


function setmessagePriority() {
    showDetail_Message();
    document.getElementById("textdivshowResult").innerHTML = "";
    document.getElementById("textdivshowName").innerHTML = "Field messagePriority";
    document.getElementById("textdivshowExplanation").innerHTML = "The priority of a message.. ";
    document.getElementById("textdivshowSampleCode").innerHTML = "E.g.: var msg = Widget.Messaging.getMessage(Widget.Messaging.MessageTypes.EmailMessage, Widget.Messaging.MessageFolderTypes.INBOX,0);<br> var storedValue = msg.messagePriority;"
    document.getElementById("textdivshowInitialCondition").innerHTML = "Notice : n/a";
    flag = "ActivesetmessagePriority";
}

function ActivesetmessagePriority() 
{
    var msg = Widget.Messaging.getMessage(Widget.Messaging.MessageTypes.EmailMessage, Widget.Messaging.MessageFolderTypes.INBOX,0);

    if (msg == null || msg.messagePriority == null )
    {
        document.getElementById("textdivshowResult").innerHTML = "No messagePriority of the first email in INBOX";
    }
    else
    {
       
        document.getElementById("textdivshowResult").innerHTML = "The messagePriority of the first email in INBOX: " + msg.messagePriority;
    
    }
}

function setmessageType() {
    showDetail_Message();
    document.getElementById("textdivshowResult").innerHTML = "";
    document.getElementById("textdivshowName").innerHTML = "Field messageType";
    document.getElementById("textdivshowExplanation").innerHTML = "The type of a message. ";
    document.getElementById("textdivshowSampleCode").innerHTML = "E.g.: var msg = Widget.Messaging.getMessage(Widget.Messaging.MessageTypes.EmailMessage, Widget.Messaging.MessageFolderTypes.INBOX,0);<br> var storedValue = msg.messageType;"
    document.getElementById("textdivshowInitialCondition").innerHTML = "Notice : n/a";
    flag = "ActivesetmessageType";
}

function ActivesetmessageType() 
{
    var msg = Widget.Messaging.getMessage(Widget.Messaging.MessageTypes.EmailMessage, Widget.Messaging.MessageFolderTypes.INBOX,0);

    if (msg == null )
    {
        document.getElementById("textdivshowResult").innerHTML = "Did not find email in INBOX";
    }
    else
    {
       
        document.getElementById("textdivshowResult").innerHTML = "The messageType of the first email in INBOX: " + msg.messageType;
    
    }
}

function setsubject() {
    showDetail_Message();
    document.getElementById("textdivshowResult").innerHTML = "";
    document.getElementById("textdivshowName").innerHTML = "Field subject";
    document.getElementById("textdivshowExplanation").innerHTML = "The subject of a message. ";
    document.getElementById("textdivshowSampleCode").innerHTML = "E.g.: var msg = Widget.Messaging.getMessage(Widget.Messaging.MessageTypes.EmailMessage, Widget.Messaging.MessageFolderTypes.INBOX,0);<br> var storedValue = msg.subject;"
    document.getElementById("textdivshowInitialCondition").innerHTML = "Notice : n/a";
    flag = "Activesetsubject";
}

function Activesetsubject() 
{
    var msg = Widget.Messaging.getMessage(Widget.Messaging.MessageTypes.EmailMessage, Widget.Messaging.MessageFolderTypes.INBOX,0);

    if (msg == null )
    {
        document.getElementById("textdivshowResult").innerHTML = "Did not find email in INBOX";
    }
    else
    {
       
        document.getElementById("textdivshowResult").innerHTML = "The subject of the first email in INBOX: " + msg.subject;
    
    }
}

function setvalidityPeriodHours() {
    showDetail_Message();
    document.getElementById("textdivshowResult").innerHTML = "";
    document.getElementById("textdivshowName").innerHTML = "Field validityPeriodHours";
    document.getElementById("textdivshowExplanation").innerHTML = "The validityPeriodHours of a message.";
    document.getElementById("textdivshowSampleCode").innerHTML = "E.g.: var msg = Widget.Messaging.getMessage(Widget.Messaging.MessageTypes.EmailMessage, Widget.Messaging.MessageFolderTypes.INBOX,0);<br> var storedValue = msg.validityPeriodHours;"
    document.getElementById("textdivshowInitialCondition").innerHTML = "Notice : n/a";
    flag = "ActivesetvalidityPeriodHours";
}

function ActivesetvalidityPeriodHours() 
{
    var msg = Widget.Messaging.getMessage(Widget.Messaging.MessageTypes.EmailMessage, Widget.Messaging.MessageFolderTypes.INBOX,0);

    if (msg == null )
    {
        document.getElementById("textdivshowResult").innerHTML = "Did not find email in INBOX";
    }
    else
    {
       
        document.getElementById("textdivshowResult").innerHTML = "The validityPeriodHours of the first email in INBOX: " + msg.validityPeriodHours;
    
    }
}


/*
 * This fucntion is used to test print a string and integer number in the log screen
 */
function addDestinationAddress() {
    showDetail_Message();
    document.getElementById("textdivshowResult").innerHTML = "";
    document.getElementById("textdivshowName").innerHTML = "Method addAddress";
    document.getElementById("textdivshowExplanation").innerHTML = "Add an address as the message's destination/cc/bcc address.Multiple addresses are separated by \";\"";
    document.getElementById("textdivshowSampleCode").innerHTML = "E.g.1: msg.addAddress(\"destination\",\"13511071062\"); E.g.2: msg.addAddress(\"cc\",\"13511071063\");";
    document.getElementById("textdivshowInitialCondition").innerHTML = "Notice : n/a";
    flag = "addDestinationAddress1";
}

function addDestinationAddress1() {
    var msg = Widget.Messaging
            .createMessage(Widget.Messaging.MessageTypes.SMSMessage);
    var phoneNumber="13800138000";
    if(isNotEmpty(phoneNumber)&&verifyPhoneNumber(phoneNumber))
        msg.addAddress("destination", phoneNumber);
    phoneNumber="13511071063";
    if(isNotEmpty(phoneNumber)&&verifyPhoneNumber(phoneNumber))
        msg.addAddress("cc", phoneNumber);
    phoneNumber="10086";
    if(isNotEmpty(phoneNumber)&&verifyPhoneNumber(phoneNumber))
        msg.addAddress("bcc", phoneNumber);
    var destAdd = msg.destinationAddress;
    document.getElementById("textdivshowResult").innerHTML = "Result : destination Add ="
            + destAdd[0];
}

function deleteDestinationAddress() {
    showDetail_Message();
    document.getElementById("textdivshowResult").innerHTML = "";
    document.getElementById("textdivshowName").innerHTML = "Method deleteAddress";

    document.getElementById("textdivshowExplanation").innerHTML = "Delete an address from the message's destination/cc/bcc addresses. ";
    document.getElementById("textdivshowSampleCode").innerHTML = "E.g.: msg.deleteAddress(\"cc\",\"13511071062\"); ";
    document.getElementById("textdivshowInitialCondition").innerHTML = "Notice : n/a";
    flag = "deleteDestinationAddress1";
}

function deleteDestinationAddress1() {
    var msg = Widget.Messaging
            .createMessage(Widget.Messaging.MessageTypes.SMSMessage);
    var phoneNumber="13880088800";
    if(isNotEmpty(phoneNumber)&&verifyPhoneNumber(phoneNumber))
        msg.addAddress("destination",phoneNumber);
    phoneNumber="13500000000";
    if(isNotEmpty(phoneNumber)&&verifyPhoneNumber(phoneNumber))
        msg.addAddress("destination",phoneNumber);
    phoneNumber="10086";
    if(isNotEmpty(phoneNumber)&&verifyPhoneNumber(phoneNumber))
        msg.addAddress("destination",phoneNumber);
    phoneNumber="13500000000";
    if(isNotEmpty(phoneNumber)&&verifyPhoneNumber(phoneNumber))
       msg.deleteAddress("destination",phoneNumber);
    var destAdd = msg.destinationAddress;
    if (destAdd[1] == "10086") {
        document.getElementById("textdivshowResult").innerHTML = "Result : "
                + "deleting address succeeded";
    } else {
        document.getElementById("textdivshowResult").innerHTML = "Result : "
                + destAdd[1];
    }
}

function addAttchment() {
    showDetail_Message();
    document.getElementById("textdivshowResult").innerHTML = "";
    document.getElementById("textdivshowName").innerHTML = "Method addAttachment";
    document.getElementById("textdivshowExplanation").innerHTML = "Add a file to a Message as an attachment. ";
    document.getElementById("textdivshowSampleCode").innerHTML = "E.g.: msg.addAttachment(\"/local/test.cpp\"); ";
    document.getElementById("textdivshowInitialCondition").innerHTML = "Notice : n/a";
    flag = "addAttchment1";
}

function addAttchment1() {
    var msg = Widget.Messaging
            .createMessage(Widget.Messaging.MessageTypes.MMSMessage);
    var file ="/local/file.cpp";
    if(isNotEmpty(file))
        msg.addAttachment(file);
    file="/local/test.cpp";
    if(isNotEmpty(file))
        msg.addAttachment(file);
    file="/local/linux.cpp";
    if(isNotEmpty(file))
        msg.addAttachment(file);
    var att = msg.attachments;
    document.getElementById("textdivshowResult").innerHTML = att[1].fileName +"path was added to message." ;
}

function deleteAttchment() {
    showDetail_Message();
    document.getElementById("textdivshowResult").innerHTML = "";
    document.getElementById("textdivshowName").innerHTML = "Method deleteAttachment";
    document.getElementById("textdivshowExplanation").innerHTML = "Delete an attachment from the Message. ";
    document.getElementById("textdivshowSampleCode").innerHTML = "E.g.: msg.deleteAttachment(\"/local/test.cpp\");";
    document.getElementById("textdivshowInitialCondition").innerHTML = "Notice : n/a";
    flag = "deleteAttchment1";
}

function deleteAttchment1() {
    var msg = Widget.Messaging
            .createMessage(Widget.Messaging.MessageTypes.MMSMessage);
    var file ="/local/file.cpp";
    if(isNotEmpty(file))
        msg.addAttachment(file);
    file="/local/test.cpp";
    if(isNotEmpty(file))
        msg.addAttachment(file);
    file="/local/linux.cpp";
    if(isNotEmpty(file))
        msg.addAttachment(file);
    var att = msg.attachments;
    msg.deleteAttachment(att[1]);
    document.getElementById("textdivshowResult").innerHTML = "Result , one of deleted attachment: "
            + msg.attachments[1].fileName;
}

function saveAttachment() {
    showDetail_Message();
    document.getElementById("textdivshowResult").innerHTML = "";
    document.getElementById("textdivshowName").innerHTML = "Method saveAttchment";
    document.getElementById("textdivshowExplanation").innerHTML = "save an attachment from the Message. ";
    document.getElementById("textdivshowSampleCode").innerHTML = "E.g.: var msg = Widget.Messaging.getMessage(Widget.Messaging.MessageTypes.EmailMessage, Widget.Messaging.MessageFolderTypes.INBOX,0); msg.saveAttachment(\"/sdcard\", msg.attachments[0]);";
    document.getElementById("textdivshowInitialCondition").innerHTML = "Notice : The first email in the inbox should have attachment for this test case.";
    flag = "ActiveSaveAttchment";
}

function ActiveSaveAttchment() {


    var msg = Widget.Messaging.getMessage(Widget.Messaging.MessageTypes.EmailMessage, Widget.Messaging.MessageFolderTypes.INBOX,0);

    if (msg == null || msg.attachments == null)
    {
        document.getElementById("textdivshowResult").innerHTML = "Did not find attachment";
    }
    else
    {
        for(i= 0; i<msg.attachments.length;  i++)
        {
            msg.saveAttachment("/sdcard/"+msg.attachments[i].fileName, msg.attachments[i]);
        }
        
        document.getElementById("textdivshowResult").innerHTML = "save All attachments done";
    
    }




}

function setMessageDate() {
    showDetail_Message();
    document.getElementById("textdivshowResult").innerHTML = "";
    document.getElementById("textdivshowName").innerHTML = "Field time";
    document.getElementById("textdivshowExplanation").innerHTML = "The time of this Message. ";
    document.getElementById("textdivshowSampleCode").innerHTML = "E.g.: var msgdate = new Date(); msg.time = msgdate; ";
    document.getElementById("textdivshowInitialCondition").innerHTML = "Notice : n/a";
    flag = "setMessageDate1";
}

function setMessageDate1() {
    var msg = Widget.Messaging
            .createMessage(Widget.Messaging.MessageTypes.EmailMessage);
    var msgdate = new Date();
    msg.time = msgdate;
    document.getElementById("textdivshowResult").innerHTML = "Result : "
            + msg.time.toString();
}

//set/get message body
function setMessageBody() {
    showDetail_Message();
    document.getElementById("textdivshowResult").innerHTML = "";
    document.getElementById("textdivshowName").innerHTML = "Field body";
    document.getElementById("textdivshowExplanation").innerHTML = "The message body of this Message. ";
    document.getElementById("textdivshowSampleCode").innerHTML = "E.g.: msg.body = \"This is a test message.\";";
    document.getElementById("textdivshowInitialCondition").innerHTML = "Notice : n/a";
    flag = "setMessageBody1";
}

function setMessageBody1() 
{
    var msg = Widget.Messaging
            .createMessage(Widget.Messaging.MessageTypes.SMSMessage);
    msg.body = "This is a test message.";
    document.getElementById("textdivshowResult").innerHTML = "message body = : "
            + msg.body;
}

/*
// the follow seem usefulless
//set/get message subject
function setMessageSubject() {
    showDetail_Message();
    document.getElementById("textdivshowResult").innerHTML = "";
    document.getElementById("textdivshowName").innerHTML = "Field subject";
    document.getElementById("textdivshowExplanation").innerHTML = "The message subject of this Message. ";
    document.getElementById("textdivshowSampleCode").innerHTML = "E.g.: msg.subject = \"Test message.\";";
    document.getElementById("textdivshowInitialCondition").innerHTML = "Notice : n/a";
    flag = "setMessageSubject1";
}

function setMessageSubject1() 
{
    var msg = Widget.Messaging
            .createMessage(Widget.Messaging.MessageTypes.SMSMessage);
    msg.subject = "Test message";
    document.getElementById("textdivshowResult").innerHTML = "message subject = : "
            + msg.subject;
}

//set/get message type
function setMessageSubject() {
    showDetail_Message();
    document.getElementById("textdivshowResult").innerHTML = "";
    document.getElementById("textdivshowName").innerHTML = "Field messageType";
    document.getElementById("textdivshowExplanation").innerHTML = "The message type of this Message. ";
    document.getElementById("textdivshowSampleCode").innerHTML = "E.g.: msg.messageType = \"sms\";";
    document.getElementById("textdivshowInitialCondition").innerHTML = "Notice : n/a";
    flag = "setMessageSubject1";
}

function setMessageSubject1() 
{
    var msg = Widget.Messaging
            .createMessage(Widget.Messaging.MessageTypes.SMSMessage);
    document.getElementById("textdivshowResult").innerHTML = "message type: "
            + msg.messageType;
}



/*
 * This function used to show the UI of the Widget. 
 */
function clickItbackMessageObject() {
    showMessagingtest();
}
