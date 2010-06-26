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
 * JavaScript objects PIM. 
 */

function showPIMtest() {
    var PIMtest = document.getElementById("PIMtest");
    PIMtest.style.display = "block";
    var showDetail = document.getElementById("showDetail");
    showDetail.style.display = "none";
}

/*
 * This function used to show the UI of testing the PIM class
 */

function clickItshowCalendarItemtest() {
    showCalendarItemtest();
}

function clickfindAddressBookItems() {
	Widget.PIM.onAddressBookItemsFound = myCallBack;
	var adressToBeFound = new Widget.PIM.AddressBookItem(); 
	adressToBeFound.setAttributeValue ("mobilePhone","10086"); 
	Widget.PIM.addAddressBookItem(adressToBeFound);

	try{
    		Widget.PIM.findAddressBookItems(adressToBeFound, 0, 9);
    	}
    	catch(e){
    		document.getElementById("textdivshowResult").innerHTML = "Exception happen:" + e.type;
    	}
    function myCallBack(AddressbookItems)
	{
		var addressbook = AddressbookItems[0];
		document.getElementById("textdivshowResult").innerHTML = "Result: the first addressbookitem found:"+addressbook.mobilePhone;
		Widget.PIM.deleteAddressBookItem(AddressbookItems);
	}
}

function clickItfindAddressBookItems() {
    showDetail_PIM();
    document.getElementById("textdivshowResult").innerHTML = "";
    document.getElementById("textdivshowName").innerHTML = "Method findAddressBookItems";
    document.getElementById("textdivshowExplanation").innerHTML = "Find all contacts matching the supplied comparison contact.";
    document.getElementById("textdivshowSampleCode").innerHTML = "E.g.:Widget.PIM.onAddressBookItemsFound = myCallBack;"+
																"var adressToBeFound = new Widget.PIM.AddressBookItem();"+ 
																"adressToBeFound.setAttributeValue (\"mobilePhone\",\"10086\");"+ 
																"Widget.PIM.findAddressBookItems(adressToBeFound, 0, 9);"+
															    "document.getElementById(\"textdivshowResult\").innerHTML = \"Waiting for result...\";"+ 
															    "function myCallBack(AddressbookItems){"+
																"	var addressbook = AddressbookItems[0];"+
																"	var phone = addressbook.mobilePhone;}";
    document.getElementById("textdivshowInitialCondition").innerHTML = "Notice : n/a";
    flag = "clickfindAddressBookItems";
}

function clickaddAddressBookItem() {
    var myContact = new Widget.PIM.AddressBookItem();
    var attribute ="mobilePhone";
    var mobilePhone="10086";
    
    if(isNotEmpty(attribute)&&isNotEmpty(mobilePhone))
        if(isNumber(mobilePhone)){
            myContact.setAttributeValue(attribute,mobilePhone);
            Widget.PIM.addAddressBookItem(myContact);
            document.getElementById("textdivshowResult").innerHTML = "Result : Success";
        }
}

function showDetail_PIM()
{
    var PIMtest = document.getElementById("PIMtest");
    PIMtest.style.display = "none";
    var showDetail = document.getElementById("showDetail");
    showDetail.style.display = "block";
}

function clickItaddAddressBookItem() {
    showDetail_PIM();
    document.getElementById("textdivshowResult").innerHTML = "";
    document.getElementById("textdivshowName").innerHTML = "Method addAddressBookItem";
    document.getElementById("textdivshowExplanation").innerHTML = " Add a contact to the device. ";
    document.getElementById("textdivshowSampleCode").innerHTML = "E.g.: var myContact = new Widget.PIM.AddressBookItem();\n myContact.setAttributeValue(\"mobilePhone\", \"10086\");\n Widget.PIM.addAddressBookItem(myContact); ";
    flag = "clickaddAddressBookItem";
}

function clickdeleteAddressBookItem() {
    var bookItemID =document.getElementById('PIMtestid').value;
    Widget.PIM.deleteAddressBookItem(bookItemID);
    document.getElementById("textdivshowResult").innerHTML = "Result : Success";
}

function clickItdeleteAddressBookItem() {
    showDetail_PIM();
    document.getElementById("textdivshowResult").innerHTML = "";
    document.getElementById("textdivshowName").innerHTML = "Method deleteAddressBookItem";
    document.getElementById("textdivshowExplanation").innerHTML = "Delete a contact with the specified ID.";
    document.getElementById("textdivshowSampleCode").innerHTML = "E.g.: Widget.PIM.deleteAddressBookItem(\"1\");";
    document.getElementById("textdivshowInitialCondition").innerHTML = "Notice : input the id in the text.";
    flag = "clickdeleteAddressBookItem";
}

function clickItonAddressBookItemsFound() {
    showDetail_PIM();
    document.getElementById("textdivshowResult").innerHTML = "";
    document.getElementById("textdivshowName").innerHTML = "Method onAddressBookItemsFound";
    document.getElementById("textdivshowExplanation").innerHTML = "Callback method to invoke when PIM.findAddressBookItems completes.";
    document.getElementById("textdivshowSampleCode").innerHTML = "E.g.:Widget.PIM.onAddressBookItemsFound = myCallBack;"+
																"var adressToBeFound = new Widget.PIM.AddressBookItem();"+ 
																"adressToBeFound.setAttributeValue (\"mobilePhone\",\"10086\");"+ 
																"Widget.PIM.findAddressBookItems(adressToBeFound, 0, 9);"+
															    "function myCallBack(AddressbookItems){"+
																"	var addressbook = AddressbookItems[0];"+
																"	var phone = addressbook.mobilePhone;}";
    flag = "onAddressBookItemsFoundAction";
}


function onAddressBookItemsFoundAction()
{
	Widget.PIM.onAddressBookItemsFound = myCallBack;
	var adressToBeFound = new Widget.PIM.AddressBookItem(); 
	adressToBeFound.setAttributeValue ("mobilePhone","10086"); 
	Widget.PIM.addCalendarItem(adressToBeFound);
	
	try{
		Widget.PIM.findAddressBookItems(adressToBeFound, 0, 9);
		}
	catch(e){
		document.getElementById("textdivshowResult").innerHTML = "Exception happen: " + e.type;
		}
    function myCallBack(AddressbookItems)
	{
		var addressbook = AddressbookItems[0];
		document.getElementById("textdivshowResult").innerHTML = "Result: the first addressbookitem found:"+addressbook.mobilePhone;
		Widget.PIM.deleteCalendarItem(AddressbookItems);
	}
}

function clickItonCalendarItemAlert() {
    showDetail_PIM();
    document.getElementById("textdivshowResult").innerHTML = "";
    document.getElementById("textdivshowName").innerHTML = "Method onCalendarItemAlert";
    document.getElementById("textdivshowExplanation").innerHTML = "Call back method to invoke when the alarm associated with a calendar item starts.";
    document.getElementById("textdivshowSampleCode").innerHTML = "E.g.: " +
    		"Widget.PIM.onCalendarItemAlert = myCallBack;" +
    		" var newCalendarItem = new Widget.PIM.CalendarItem();" +
    		"newCalendarItem.eventName = \"Name\";" +
    		"newCalendarItem.alarmed = true;" +
    		" var alarmdate = new Date();" +
    		"var eventStartT = new Date();" +
    		"var alarmD = alarmdate.getTime()+ 1*60*1000;" +
    		"var eventST = alarmD + 6*60*1000;" +
    		" alarmdate.setTime(alarmD);" +
    		"eventStartT.setTime(eventST);" +
    		"newCalendarItem.alarmDate = alarmdate;" +
    		"newCalendarItem.eventStartTime = eventStartT;" +
    		"Widget.PIM.addCalendarItem(newCalendarItem);" +
    		" function myCallBack(calendarItem){" +
    		"var name = calendarItem.eventName;"+
    		"Widget.PIM.deleteCalendarItem(newCalendarItem);}";
    flag = "onCalendarItemAlertAction";
}

function onCalendarItemAlertAction()
{
    Widget.PIM.onCalendarItemAlert = myCallBack;
    var newCalendarItem = new Widget.PIM.CalendarItem();
    newCalendarItem.eventName = "Name";
    newCalendarItem.alarmed = true;
    var alarmdate = new Date();
    var eventStartT = new Date();
    var alarmD = alarmdate.getTime()+ 1*60*1000;
    var eventST = alarmD + 6*60*1000;
    alarmdate.setTime(alarmD);
    eventStartT.setTime(eventST);
    newCalendarItem.alarmDate = alarmdate;
    newCalendarItem.eventStartTime = eventStartT;
    Widget.PIM.addCalendarItem(newCalendarItem);
    document.getElementById("textdivshowResult").innerHTML = "Waiting for result...";
    function myCallBack(calendarItem)
    { 
    	document.getElementById("textdivshowResult").innerHTML = "Result: "+calendarItem.eventName;
    	Widget.PIM.deleteCalendarItem(calendarItem);
    }
}

function clickItcreateAddressBookItem() {
    showDetail_PIM();
    document.getElementById("textdivshowResult").innerHTML = "";
    document.getElementById("textdivshowName").innerHTML = "Method createAddressBookItem";
    document.getElementById("textdivshowExplanation").innerHTML = "Creates an empty AddressBookItem.";
    document.getElementById("textdivshowSampleCode").innerHTML = "E.g.:  var myContact = Widget.PIM.createAddressBookItem();";
    document.getElementById("textdivshowInitialCondition").innerHTML = "Notice : Return an AddressBookItem object.";
    flag = "createAddressBookItemAction";
}

function createAddressBookItemAction()
{
    var myContact = Widget.PIM.createAddressBookItem();
    document.getElementById("textdivshowResult").innerHTML = "Result : Success";
}

function clickgetAddressBookItem() {
    var contact =null;
    var addressBookItemID=document.getElementById('PIMtestid').value;
    if(isNotEmpty(addressBookItemID))
            if(isNumber(addressBookItemID))
                contact=Widget.PIM.getAddressBookItem(addressBookItemID);
    if (contact == null) {
        document.getElementById("textdivshowResult").innerHTML = "Result : "
                + "no contcatItem find";
    } else {
        document.getElementById("textdivshowResult").innerHTML = "Result : "
                + "company=" + contact.company + ";eMail=" + contact.eMail
                + ";fullName=" + contact.fullName + ";mobilePhone="
                + contact.mobilePhone;
    }
}

function clickItgetAddressBookItem() {
    showDetail_PIM();
    document.getElementById("textdivshowResult").innerHTML = "";
    document.getElementById("textdivshowName").innerHTML = "Method getAddressBookItem";
    document.getElementById("textdivshowExplanation").innerHTML = "Get a contact from the specified index.";
    document.getElementById("textdivshowSampleCode").innerHTML = "E.g.: var contact = Widget.PIM.getAddressBookItem(\"1\");";
    document.getElementById("textdivshowInitialCondition").innerHTML = "Notice : input the id in the text.";
    flag = "clickgetAddressBookItem";
}

function clickgetAddressBookItemsCount() {
    var ret = Widget.PIM.getAddressBookItemsCount();
    document.getElementById("textdivshowResult").innerHTML = "Result : " + "AddressBookItemsCount=" + ret;
}

function clickItgetAddressBookItemsCount() {
    showDetail_PIM();
    document.getElementById("textdivshowResult").innerHTML = "";
    document.getElementById("textdivshowName").innerHTML = "Method getAddressBookItemsCount";
    document.getElementById("textdivshowExplanation").innerHTML = "Return how many contacts are available on the phone. ";
    document.getElementById("textdivshowSampleCode").innerHTML = "E.g.: var ret = Widget.PIM.getAddressBookItemsCount();";
    document.getElementById("textdivshowInitialCondition").innerHTML = "Notice : a Number indicating how many contacts are present. This value should be an integer.";
    flag = "clickgetAddressBookItemsCount";
}

function clickItaddCalendarItem() {
    showDetail_PIM();
    document.getElementById("textdivshowResult").innerHTML = "";
    document.getElementById("textdivshowName").innerHTML = "Method addCalendarItem";
    document.getElementById("textdivshowExplanation").innerHTML = "Add an event.";
    document.getElementById("textdivshowInitialCondition").innerHTML = "Notice : n/a";
    document.getElementById("textdivshowSampleCode").innerHTML = "E.g.: var day = new Date (2008, 9, 23, 0, 0, 0);\nvar myCalendarItem = new Widget.PIM.CalendarItem();\nmyCalendarItem.eventStartTime = day;\n myCalendarItem.eventName = \"Meeting\"; \nWidget.PIM.addCalendarItem(myCalendarItem);";
    flag = "clickaddCalendarItem";
}

function clickaddCalendarItem() {
    var day = new Date(2008, 9, 23, 0, 0, 0);
    var myCalendarItem = new Widget.PIM.CalendarItem();
    myCalendarItem.eventStartTime = day;
    var _name = "Meeting";
    myCalendarItem.eventName =_name ;
    Widget.PIM.addCalendarItem(myCalendarItem);
    document.getElementById("textdivshowResult").innerHTML = "Result : Success";        
}

function clickItdeleteCalendarItem() {
    showDetail_PIM();
    document.getElementById("textdivshowResult").innerHTML = "";
    document.getElementById("textdivshowName").innerHTML = "Method deleteCalendarItem";
    document.getElementById("textdivshowExplanation").innerHTML = " Delete a calendar item with a specified id. ";
    document.getElementById("textdivshowInitialCondition").innerHTML = "Notice : input the id in the text";
    document.getElementById("textdivshowSampleCode").innerHTML = "E.g.: Widget.PIM.deleteCalendarItem(\"1\");";
    flag = "clickdeleteCalendarItem";
}

function clickdeleteCalendarItem() {
    var calendarId=document.getElementById('PIMtestid').value;
    Widget.PIM.deleteCalendarItem(calendarId);
    document.getElementById("textdivshowResult").innerHTML = "Result : Success";
}

function clickItfindCalendarItems() {
    showDetail_PIM();
    document.getElementById("textdivshowResult").innerHTML = "";
    document.getElementById("textdivshowName").innerHTML = "Method findCalendarItems";
    document.getElementById("textdivshowExplanation").innerHTML = "Find all calendar items matching the supplied itemToMatch.";
    document.getElementById("textdivshowInitialCondition").innerHTML = "Notice : n/a";
    document.getElementById("textdivshowSampleCode").innerHTML = "E.g.:Widget.PIM.onCalendarItemsFound = myCallBack;"+
															    "var calendarToBeFound = new Widget.PIM.CalendarItem(); "+
															    "calendarToBeFound.eventName= \"Meeting\"; "+
															    "Widget.PIM.addCalendarItem(calendarToBeFound);"+
																"Widget.PIM.findCalendarItems(calendarToBeFound, 0, 9);"+
															    "document.getElementById(\"textdivshowResult\").innerHTML = \"Waiting for result...\"; "+
															    "function myCallBack(calendarItems){"+
																"	var calendarItem = calendarItems[0];"+
																"	var eventname = calendarItem.eventName;"+
																"	Widget.PIM.deleteCalendarItem(calendarToBeFound);}";	
    flag = "clickfindCalendarItems";
}

function clickfindCalendarItems() {
	Widget.PIM.onCalendarItemsFound = myCallBack;
    var calendarToBeFound = new Widget.PIM.CalendarItem(); 
    calendarToBeFound.eventName= "Meeting"; 
    Widget.PIM.addCalendarItem(calendarToBeFound);
	
	try{
    		Widget.PIM.findCalendarItems(calendarToBeFound, 0, 9);
    	}
    	catch(e){
    		document.getElementById("textdivshowResult").innerHTML = "Exception happen: " + e.type;
    	}
    function myCallBack(calendarItems)
	{
		var calendarItem = calendarItems[0];
		document.getElementById("textdivshowResult").innerHTML = "Result: the first calendarItems found:"+calendarItem.eventName;
		Widget.PIM.deleteCalendarItem(calendarToBeFound);
	}
}

function clickItgetCalendarItem() {
    showDetail_PIM();
    document.getElementById("textdivshowResult").innerHTML = "";
    document.getElementById("textdivshowName").innerHTML = "Method getCalendarItem";
    document.getElementById("textdivshowExplanation").innerHTML = "Get a calendar item of the specified index. ";
    document.getElementById("textdivshowInitialCondition").innerHTML = "Notice : input the id in the text";
    document.getElementById("textdivshowSampleCode").innerHTML = "E.g.: var calendarItem = Widget.PIM.getCalendarItem(\"1\");";
    flag = "clickgetCalendarItem";
}

function clickgetCalendarItem() {
    var calendarId=document.getElementById('PIMtestid').value;
    var calendarItem=null;
    if(isNotEmpty(calendarId)){
        if(isNumber(calendarId)){
            calendarItem = Widget.PIM.getCalendarItem(calendarId);
        }
    }
    if (calendarItem == null) {
        document.getElementById("textdivshowResult").innerHTML = "Result : "
                + "no calendar find";
    } else {
        document.getElementById("textdivshowResult").innerHTML = "Result : "
                + "eventName=" + calendarItem.eventName + ";eventRecurrence=" + calendarItem.eventRecurrence;
    }
}

function clickItgetCalendarItems() {
    showDetail_PIM();
    document.getElementById("textdivshowResult").innerHTML = "";
    document.getElementById("textdivshowName").innerHTML = "Method getCalendarItems";
    document.getElementById("textdivshowExplanation").innerHTML = "Find all events that are scheduled to happen between the specified start and end time.";
    document.getElementById("textdivshowInitialCondition").innerHTML = "Notice : n/a";
    document.getElementById("textdivshowSampleCode").innerHTML = "E.g.: var startTime = new Date(2008, 9, 11, 0, 0, 0); var endTime = new Date(2008, 9, 23, 0, 0, 0); var calendarItems = Widget.PIM.getCalendarItems(startTime, endTime);";
    flag = "clickgetCalendarItems";
}

function clickgetCalendarItems() {
    var startTime = new Date(2008, 9, 11, 0, 0, 0);
    var endTime = new Date(2008, 9, 24, 0, 0, 0);
    var calendarItems = Widget.PIM.getCalendarItems(startTime, endTime);
    if (calendarItems.length == 0) {
        document.getElementById("textdivshowResult").innerHTML = "Result : "
                + "no calendarItem find";
    } else {
        document.getElementById("textdivshowResult").innerHTML = "Result : "
                + "eventName=" + calendarItems[0].eventName
                + ";eventRecurrence=" + calendarItems[0].eventRecurrence;
    }
}


function clickItonCalendarItemsFound() {
    showDetail_PIM();
    document.getElementById("textdivshowResult").innerHTML = "";
    document.getElementById("textdivshowName").innerHTML = "Method onCalendarItemsFound";
    document.getElementById("textdivshowExplanation").innerHTML = "Callback method to invoke when PIM.findCalendarItems completes. ";
    document.getElementById("textdivshowSampleCode").innerHTML = "E.g.:Widget.PIM.onCalendarItemsFound = myCallBack;"+
															    "var calendarToBeFound = new Widget.PIM.CalendarItem(); "+
															    "calendarToBeFound.eventName= \"Meeting\"; "+
															    "Widget.PIM.addCalendarItem(calendarToBeFound);"+
																"Widget.PIM.findCalendarItems(calendarToBeFound, 0, 9);"+
															    "document.getElementById(\"textdivshowResult\").innerHTML = \"Waiting for result...\"; "+
															    "function myCallBack(calendarItems){"+
																"	var calendarItem = calendarItems[0];"+
																"	var eventname = calendarItem.eventName;"+
																"	Widget.PIM.deleteCalendarItem(calendarToBeFound);}";
    flag = "onCalendarItemsFoundAction";
}

function onCalendarItemsFoundAction() 
{
    Widget.PIM.onCalendarItemsFound = myCallBack;
    var calendarToBeFound = new Widget.PIM.CalendarItem(); 
    calendarToBeFound.eventName= "Meeting"; 
    Widget.PIM.addCalendarItem(calendarToBeFound);
	Widget.PIM.findCalendarItems(calendarToBeFound, 0, 9);
    document.getElementById("textdivshowResult").innerHTML = "Waiting for result..."; 
    function myCallBack(calendarItems)
	{
		var calendarItem = calendarItems[0];
		document.getElementById("textdivshowResult").innerHTML = "Result: the first calendarItems found:"+calendarItem.eventName;
		Widget.PIM.deleteCalendarItem(calendarToBeFound);
	}
}

function clickcreateAddressBookGroup() {
    Widget.PIM.createAddressBookGroup("Family");
    document.getElementById("textdivshowResult").innerHTML = "Result  : Success";
}

function clickItcreateAddressBookGroup() {
    showDetail_PIM();
    document.getElementById("textdivshowResult").innerHTML = "";
    document.getElementById("textdivshowName").innerHTML = "Method createAddressBookGroup";
    document.getElementById("textdivshowExplanation").innerHTML = "Create a new contact group in the address book. ";
    document.getElementById("textdivshowSampleCode").innerHTML = "E.g.: Widget.PIM.createAddressBookGroup(\"Family\");";
    document.getElementById("textdivshowInitialCondition").innerHTML = "Notice : n/a";
    flag = "clickcreateAddressBookGroup";

}

function clickdeleteAddressBookGroup() {
    Widget.PIM.deleteAddressBookGroup("Family");
    document.getElementById("textdivshowResult").innerHTML = "Result  : Success";
}

function clickItdeleteAddressBookGroup() {
    showDetail_PIM();
    document.getElementById("textdivshowResult").innerHTML = "";
    document.getElementById("textdivshowName").innerHTML = "Method deleteAddressBookGroup";
    document.getElementById("textdivshowExplanation").innerHTML = "Delete contact group in the address book. ";
    document.getElementById("textdivshowSampleCode").innerHTML = "E.g.: Widget.PIM.deleteAddressBookGroup(\"Family\");";
    document.getElementById("textdivshowInitialCondition").innerHTML = "Notice : n/a";
    flag = "clickdeleteAddressBookGroup";

}

function clickgetAvailableAddressGroupNames() {
    var ret = Widget.PIM.getAvailableAddressGroupNames();
    var result = "";
    if( ret.length == 0) {
        result = "No available address group found.";
    } else {
    	result =ret[0];
        for(var i=1; i<ret.length; i++){
                result = result + "," + ret[i];
            }
    }
    document.getElementById("textdivshowResult").innerHTML = "Result  : " + result;
}

function clickItgetAvailableAddressGroupNames() {
    showDetail_PIM();
    document.getElementById("textdivshowResult").innerHTML = "";
    document.getElementById("textdivshowName").innerHTML = "Method getAvailableAddress-\nGroupNames";
    document.getElementById("textdivshowExplanation").innerHTML = "Return all unique listing of all group names associated with all contacts. ";
    document.getElementById("textdivshowSampleCode").innerHTML = "E.g.: var ret = Widget.PIM.getAvailableAddressGroupNames();";
    document.getElementById("textdivshowInitialCondition").innerHTML = "Notice : n/a";
    flag = "clickgetAvailableAddressGroupNames";

}

function clickexportAsVCard() {
	/*
	if(isSdcardAvailable()== false )
	{
		document.getElementById("textdivshowResult").innerHTML = "No sdcard Available!" ;
		return;
	}
	*/
    var addressBookItemID=document.getElementById('PIMtestid').value;
    var contact = Widget.PIM.getAddressBookItem(addressBookItemID);
    if (contact == null) {
        document.getElementById("textdivshowResult").innerHTML = "Result  : no addressBookItem find";
    } else {
        var arrayContacts = new Array(contact);
        Widget.PIM.onVCardExportingFinish = myVcardCallBack;
        Widget.PIM.exportAsVCard(arrayContacts);
        document.getElementById("textdivshowResult").innerHTML = "Result  : Waiting for result...";
    }
}

function clickItexportAsVCard() {
    showDetail_PIM();
    document.getElementById("textdivshowResult").innerHTML = "";
    document.getElementById("textdivshowName").innerHTML = "Method exportAsVCard";
    document.getElementById("textdivshowExplanation").innerHTML = "This is an asynchronous function that takes in an Array of AddressBookItems and exports them into a vCard file. ";
    document.getElementById("textdivshowSampleCode").innerHTML = "E.g.: var contact = Widget.PIM.getAddressBookItem(\"1\");\n var arrayContacts = new Array(contact);\n Widget.PIM.exportAsVCard(arrayContacts);";
    document.getElementById("textdivshowInitialCondition").innerHTML = "Notice : n/a";
    flag = "clickexportAsVCard";
}
/*
function isSdcardAvailable()
{
    var destFile = "/sdcard/test3.txt";
    Widget.Device.deleteFile(destFile);
    var b = null;
    if (isNotEmpty(destFile)){
        b = Widget.Device.createFile(destFile);
    }
    if (b) {
    	Widget.Device.deleteFile(destFile);
    	return true;
    } else {
        return false;
    }
}
*/
function clickonVCardExportingFinish() {
	/*
	if(isSdcardAvailable()== false)
	{
		document.getElementById("textdivshowResult").innerHTML = "No sdcard Available!" ;
		return;
	}
	*/
	var addressBookItemID=document.getElementById('PIMtestid').value;
    var contact = Widget.PIM.getAddressBookItem(addressBookItemID);
    if (contact == null) {
        document.getElementById("textdivshowResult").innerHTML = "Result  : no addressBookItem find.";
        return;
    }
    Widget.PIM.onVCardExportingFinish = myVcardCallBack;
    var arrayContacts = new Array(contact);
    Widget.PIM.exportAsVCard(arrayContacts);
    document.getElementById("textdivshowResult").innerHTML = "Waiting for result..."; 
}

function myVcardCallBack(vcardPath)
{
	document.getElementById("textdivshowResult").innerHTML = "Result:" +vcardPath ;
}

function clickItonVCardExportingFinish() {
    showDetail_PIM();
    document.getElementById("textdivshowResult").innerHTML = "";
    document.getElementById("textdivshowName").innerHTML = "Method onVCardExportingFinish";
    document.getElementById("textdivshowExplanation").innerHTML = "Callback method to invoke when the widget finishes exporting the vCard file. ";
    document.getElementById("textdivshowSampleCode").innerHTML = "E.g.: Widget.PIM.onVCardExportingFinish = myCallBack;\n function myCallBack(path){var p = path;}";
    document.getElementById("textdivshowInitialCondition").innerHTML = "Notice : n/a";
    flag = "clickonVCardExportingFinish";
}

function clickgetAddressBookGroupMembers()
{
 showDetail_PIM();
    document.getElementById("textdivshowResult").innerHTML = "";
    document.getElementById("textdivshowName").innerHTML = "Method getAddressBookGroup-\nMembers";
    document.getElementById("textdivshowExplanation").innerHTML = "Find all AddressBookItems currently associated with the supplied group name. ";
    document.getElementById("textdivshowSampleCode").innerHTML = "E.g.: Widget.PIM.onAddressBookItemsFound = getAddressBookGroupMembersCallBack;Widget.PIM.getAddressBookGroupMembers(\"family\");" +
      "function getAddressBookGroupMembersCallBack(AddressBookItem){" +
      "if( AddressBookItem.length == 0) {" +
      "var result = \"no contacts find\";}" +
      " else {var result = \"homePhone=\" + AddressBookItem[0].homePhone + \";workPhone=\" + AddressBookItem[0].workPhone + \";mobilePhone=\" + AddressBookItem[0].mobilePhone;}";
    document.getElementById("textdivshowInitialCondition").innerHTML = "Notice : n/a";
    flag = "getAddressBookGroupMembersAction";
}
 
function getAddressBookGroupMembersAction()
{
 Widget.PIM.onAddressBookItemsFound = getAddressBookGroupMembersCallBack;
 Widget.PIM.getAddressBookGroupMembers("Family");
}

function getAddressBookGroupMembersCallBack(AddressBookItem)
{
 if( AddressBookItem.length == 0) {
  document.getElementById("textdivshowResult").innerHTML = "no contacts find";
 } else {
  document.getElementById("textdivshowResult").innerHTML = "homePhone=" + AddressBookItem[0].homePhone + ";workPhone=" + AddressBookItem[0].workPhone + ";mobilePhone=" + AddressBookItem[0].mobilePhone;
 }
}
