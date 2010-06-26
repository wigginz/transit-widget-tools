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

function showMessagingattachment() {
    var Messagingattachmenttest = document.getElementById("Messagingattachmenttest");
    Messagingattachmenttest.style.display = "block";
    var showDetail = document.getElementById("showDetail");
    showDetail.style.display = "none"; 
}
 
function showDetail_Attachment()
{
    var Messagingattachmenttest = document.getElementById("Messagingattachmenttest");
    Messagingattachmenttest.style.display = "none";
    var showDetail = document.getElementById("showDetail");
    showDetail.style.display = "block";      
}
 
function setFileName() {
    showDetail_Attachment();
    document.getElementById("textdivshowResult").innerHTML = "";
    document.getElementById("textdivshowName").innerHTML = "Field fileName";
    document.getElementById("textdivshowExplanation").innerHTML = "The name of this Attachment.  ";
    document.getElementById("textdivshowSampleCode").innerHTML = "E.g.: var att = new Widget.Messaging.Attachment(); att.fileName = \"/sdcard/test/work/test.cpp\"; ";
    document.getElementById("textdivshowInitialCondition").innerHTML = "Notice :  n/a";
    flag = "setFileName1";
}

function setFileName1() {
    var att = new Widget.Messaging.Attachment();
    var _name ="/sdcard/test/work/test.cpp";
    if(isNotEmpty(_name))        
            att.fileName =_name ;
    document.getElementById("textdivshowResult").innerHTML = "Result : "
            + att.fileName;
}

function setMIMEType() {
    showDetail_Attachment();
    document.getElementById("textdivshowResult").innerHTML = "";
    document.getElementById("textdivshowName").innerHTML = "Field MIMEType";
    document.getElementById("textdivshowExplanation").innerHTML = "The MIME type of this Attachment.  ";
    document.getElementById("textdivshowSampleCode").innerHTML = "E.g.: var att = new Widget.Messaging.Attachment(); att.MIMEType = \"cpp File\"; ";
    document.getElementById("textdivshowInitialCondition").innerHTML = "Notice :  n/a";
    flag = "setMIMEType1";
}

function setMIMEType1() {
    var att = new Widget.Messaging.Attachment();
    var type="cpp File";
    if(isNotEmpty(type))        
            att.MIMEType = type;
    document.getElementById("textdivshowResult").innerHTML = "Result : "
            + att.MIMEType;
}

function setSize() {
    showDetail_Attachment();
    document.getElementById("textdivshowResult").innerHTML = "";
    document.getElementById("textdivshowName").innerHTML = "Field size";
    document.getElementById("textdivshowExplanation").innerHTML = "The size of this Attachment. The units are bytes.  ";
    document.getElementById("textdivshowSampleCode").innerHTML = "E.g.: var att = new Widget.Messaging.Attachment(); att.size = 100;";
    document.getElementById("textdivshowInitialCondition").innerHTML = "Notice :  n/a";
    flag = "setSize1";
}

function setSize1() {
    var att = new Widget.Messaging.Attachment();
    var _size=100;
    if(isNotEmpty(_size))
        if(isNumber(_size))
            att.size = _size;
    document.getElementById("textdivshowResult").innerHTML = "Result : "
            + "File Size" + att.size + " Byte";
}

/*
 * This function used to show the UI of the Widget. 
 */
function clickItbackMessagingattachment() 
{
    showMessagingtest();
}
