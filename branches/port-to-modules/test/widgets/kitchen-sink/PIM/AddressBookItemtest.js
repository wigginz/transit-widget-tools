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
 * JavaScript objects AddressBookItem. 
 */

function showAddressBookItemtest() {
    var AddressBookItemtest = document.getElementById("AddressBookItemtest");
    AddressBookItemtest.style.display = "block";
    var showDetail = document.getElementById("showDetail");
    showDetail.style.display = "none";
}

function showDetail_AddressBookItem()
{ 
    var AddressBookItemtest = document.getElementById("AddressBookItemtest");
    AddressBookItemtest.style.display = "none";
    var showDetail = document.getElementById("showDetail");
    showDetail.style.display = "block";
}

function clickAddress()
{
	showDetail_AddressBookItem();
    document.getElementById("textdivshowResult").innerHTML = "";
    document.getElementById("textdivshowName").innerHTML = "Field address";
    document.getElementById("textdivshowExplanation").innerHTML = "This is the address of the contact. ";
    document.getElementById("textdivshowSampleCode").innerHTML = "E.g.:var obj = Wsidget.PIM.AddressBoolItem();obj.address = \"beijing\";";
    document.getElementById("textdivshowInitialCondition").innerHTML = "Notice :N/A.";
    flag = "addressAction";
}

function addressAction()
{
	var obj = new Widget.PIM.AddressBookItem();
	obj.address = "beijing";
	document.getElementById("textdivshowResult").innerHTML = "Result:"+obj.address;
}

function clickAddressBookItemId()
{
	showDetail_AddressBookItem();
    document.getElementById("textdivshowResult").innerHTML = "";
    document.getElementById("textdivshowName").innerHTML = "Field addressBookItemId";
    document.getElementById("textdivshowExplanation").innerHTML = "This is a unique indicator (potentially assigned by the WRT) for identifying the contact. ";
    document.getElementById("textdivshowSampleCode").innerHTML = "E.g.:Widget.PIM.onAddressBookItemsFound = myCallBack;"+
												    "var myContact = new Widget.PIM.AddressBookItem();"+
												    "myContact.setAttributeValue(\"mobilePhone\", \"10086\");"+
												    "Widget.PIM.findAddressBookItems(myContact, 0, 9);"+
												    "function myCallBack(addressBookItems) {"+
												       " var contact = addressBookItems[0];"+
												       " Widget.PIM.deleteAddressBookItem(contact.addressBookItemId);"+
												       " var id = contact.addressBookItemId;"+
												       "Widget.PIM.deleteAddressBookItem(contact.addressBookItemId);}";
    document.getElementById("textdivshowInitialCondition").innerHTML = "Notice :N/A.";
    flag = "addressBookItemIdAction";
}

function addressBookItemIdAction()
{
	Widget.PIM.onAddressBookItemsFound = myCallBack;
    var myContact = new Widget.PIM.AddressBookItem();
    myContact.setAttributeValue("mobilePhone", "10086");
    Widget.PIM.addAddressBookItem(myContact);
    Widget.PIM.findAddressBookItems(myContact, 0, 9);
    function myCallBack(addressBookItems){
        var contact = addressBookItems[0];
        document.getElementById("textdivshowResult").innerHTML = "Result:"+contact.addressBookItemId;
        Widget.PIM.deleteAddressBookItem(contact.addressBookItemId);
    }
}

function clickCompany()
{
	showDetail_AddressBookItem();
    document.getElementById("textdivshowResult").innerHTML = "";
    document.getElementById("textdivshowName").innerHTML = "Field company";
    document.getElementById("textdivshowExplanation").innerHTML = "This is a unique indicator (potentially assigned by the WRT) for identifying the contact. ";
    document.getElementById("textdivshowSampleCode").innerHTML = "E.g.:var obj = Widget.PIM.AddressBoolItem();obj.company = \"Company Name\";";
    document.getElementById("textdivshowInitialCondition").innerHTML = "Notice :N/A.";
    flag = "companysAction";
}

function companysAction()
{
	var obj = new Widget.PIM.AddressBookItem();
	obj.company = "Company Name";
	document.getElementById("textdivshowResult").innerHTML = "Result:"+obj.company;
}

function clickEMail()
{
	showDetail_AddressBookItem();
    document.getElementById("textdivshowResult").innerHTML = "";
    document.getElementById("textdivshowName").innerHTML = "Field eMail";
    document.getElementById("textdivshowExplanation").innerHTML = "This is the email address of the contact. ";
    document.getElementById("textdivshowSampleCode").innerHTML = "E.g.:var obj = Widget.PIM.AddressBoolItem();obj.company = \"yourEmail@gmail.com\";";
    document.getElementById("textdivshowInitialCondition").innerHTML = "Notice :N/A.";
    flag = "eMailAction";
}

function eMailAction()
{
	var obj = new Widget.PIM.AddressBookItem();
	obj.eMail = "yourEmail@gmail.com";
	document.getElementById("textdivshowResult").innerHTML = "Result:"+obj.eMail;
}

function clickFullName()
{
	showDetail_AddressBookItem();
    document.getElementById("textdivshowResult").innerHTML = "";
    document.getElementById("textdivshowName").innerHTML = "Field fullName";
    document.getElementById("textdivshowExplanation").innerHTML = "This is the full name of the contact. ";
    document.getElementById("textdivshowSampleCode").innerHTML = "E.g.:var obj = Widget.PIM.AddressBoolItem();obj.fullName = \"yourFullName\";";
    document.getElementById("textdivshowInitialCondition").innerHTML = "Notice :N/A.";
    flag = "fullNameAction";
}

function fullNameAction()
{
	var obj = new Widget.PIM.AddressBookItem();
	obj.fullName = "yourFullName";
	document.getElementById("textdivshowResult").innerHTML = "Result:"+obj.fullName;
}

function clickHomePhone()
{
	showDetail_AddressBookItem();
    document.getElementById("textdivshowResult").innerHTML = "";
    document.getElementById("textdivshowName").innerHTML = "Field homePhone";
    document.getElementById("textdivshowExplanation").innerHTML = "This is the home phone number of the contact. ";
    document.getElementById("textdivshowSampleCode").innerHTML = "E.g.:var obj = Widget.PIM.AddressBoolItem();obj.homePhone = \"010-100086\";";
    document.getElementById("textdivshowInitialCondition").innerHTML = "Notice :N/A.";
    flag = "homePhoneAction";
}

function homePhoneAction()
{
	var obj = new Widget.PIM.AddressBookItem();
	obj.homePhone = "010-100086";
	document.getElementById("textdivshowResult").innerHTML = "Result:"+obj.homePhone;
}

function clickMobilePhone()
{
	showDetail_AddressBookItem();
    document.getElementById("textdivshowResult").innerHTML = "";
    document.getElementById("textdivshowName").innerHTML = "Field mobilePhone";
    document.getElementById("textdivshowExplanation").innerHTML = "This is the mobile phone number of the contact. ";
    document.getElementById("textdivshowSampleCode").innerHTML = "E.g.:var obj = Widget.PIM.AddressBoolItem();obj.mobilePhone = \"13900000000\";";
    document.getElementById("textdivshowInitialCondition").innerHTML = "Notice :N/A.";
    flag = "mobilePhoneAction";
}

function mobilePhoneAction()
{
	var obj = new Widget.PIM.AddressBookItem();
	obj.mobilePhone = "13900000000";
	document.getElementById("textdivshowResult").innerHTML = "Result:"+obj.mobilePhone;
}

function clickTitle()
{
	showDetail_AddressBookItem();
    document.getElementById("textdivshowResult").innerHTML = "";
    document.getElementById("textdivshowName").innerHTML = "Field title";
    document.getElementById("textdivshowExplanation").innerHTML = "This is the title of the contact. ";
    document.getElementById("textdivshowSampleCode").innerHTML = "E.g.:Widget.PIM.onAddressBookItemsFound = myCallBack;"
    +"var myContact = new Widget.PIM.AddressBookItem();"
    +"myContact.setAttributeValue(\"mobilePhone\", \"10086\");"
    +"Widget.PIM.findAddressBookItems(myContact, 0, 9);"
    +"function myCallBack(addressBookItems) {"
        +"var contact = addressBookItems[0]; "
        +"return contact.title;}";
    document.getElementById("textdivshowInitialCondition").innerHTML = "Notice :N/A.";
    flag = "titleAction";
}

function titleAction()
{
	Widget.PIM.onAddressBookItemsFound = myCallBack;
    var myContact = new Widget.PIM.AddressBookItem();
    myContact.setAttributeValue("mobilePhone", "10089");
    myContact.setAttributeValue("title","manager");
    Widget.PIM.addAddressBookItem(myContact);
    Widget.PIM.findAddressBookItems(myContact, 0, 9);
    function myCallBack(addressBookItems) {
        var contact = addressBookItems[0];
        if(contact)
        document.getElementById("textdivshowResult").innerHTML = "Result: "+ contact.title;
    }
}

function clickWorkPhone()
{
	showDetail_AddressBookItem();
    document.getElementById("textdivshowResult").innerHTML = "";
    document.getElementById("textdivshowName").innerHTML = "Field workPhone";
    document.getElementById("textdivshowExplanation").innerHTML = "This is the work phone number of the contact. ";
    document.getElementById("textdivshowSampleCode").innerHTML = "E.g.:var obj = Widget.PIM.AddressBoolItem();obj.workPhone = \"13900000000\";";
    document.getElementById("textdivshowInitialCondition").innerHTML = "Notice :N/A.";
    flag = "workPhoneAction";
}

function workPhoneAction()
{
	var obj = new Widget.PIM.AddressBookItem();
	obj.workPhone = "13900000000";
	document.getElementById("textdivshowResult").innerHTML = "Result:"+obj.workPhone;
}
//clickMobilePhone
function clickItgetAttributeValue() {
    showDetail_AddressBookItem();
    document.getElementById("textdivshowResult").innerHTML = "";
    document.getElementById("textdivshowName").innerHTML = "Method getAttributeValue";
    document.getElementById("textdivshowSampleCode").innerHTML = "E.g.: var contact = Widget.PIM.getAddressBookItem(\"1\");var fullName = myContact.getAttributeValue( \"fullName\");";
    document.getElementById("textdivshowExplanation").innerHTML = "Get the attribute value of a contact. ";
    document.getElementById("textdivshowInitialCondition").innerHTML = "Notice : input the id in the text.";
    flag = "clickgetAttributeValue";
}

function clickgetAttributeValue() {
    var addressBookItemID=document.getElementById('AddressBookItemtestid').value;
    var contact = Widget.PIM.getAddressBookItem(addressBookItemID);
    var fullName = contact.getAttributeValue("fullName");
        
    if (contact == null) {
        document.getElementById("textdivshowResult").innerHTML = "Result : no addressBookItem find";
    } else {
        document.getElementById("textdivshowResult").innerHTML = "Result : "+ fullName;
    }
}

function clickItsetAttributeValue() {

    showDetail_AddressBookItem();
    document.getElementById("textdivshowResult").innerHTML = "";
    document.getElementById("textdivshowName").innerHTML = "Method setAttributeValue";
    document.getElementById("textdivshowSampleCode").innerHTML = "E.g.: var contact = new Widget.PIM.AddressBookItem(); contact.setAttributeValue(\"fullName\", \"George Brown\");";
    document.getElementById("textdivshowExplanation").innerHTML = "Set the attribute value of a contact.  ";
    document.getElementById("textdivshowInitialCondition").innerHTML = "Notice : n/a";
    flag = "clicksetAttributeValue";
}

function clicksetAttributeValue() {
    var contact = new Widget.PIM.AddressBookItem();
    var attribute = "fullName";
    var fullName = "George Brown";
    if (attribute != null && fullName != null){
        if (isNotEmpty(attribute) && isNotEmpty(fullName)) {
            contact.setAttributeValue(attribute, fullName);
            document.getElementById("textdivshowResult").innerHTML = "Result : "+ contact.fullName;
        }
    }
}

function clickItgetAvailableAttributes() {
    showDetail_AddressBookItem();
    document.getElementById("textdivshowResult").innerHTML = "";
    document.getElementById("textdivshowName").innerHTML = "Method getAvailableAttributes";
    document.getElementById("textdivshowSampleCode").innerHTML = "E.g.: var contact = Widget.PIM.getAddressBookItem(\"1\");var attributes =contact.getAvailableAttributes();";
    document.getElementById("textdivshowExplanation").innerHTML = "Get the names of the attribute values of a contact.  ";
    document.getElementById("textdivshowInitialCondition").innerHTML = "Notice : input the id in the text.";
    flag = "clickgetAvailableAttributes";
}

function clickgetAvailableAttributes() {
    var addressBookItemID=document.getElementById('AddressBookItemtestid').value;
    var contact = Widget.PIM.getAddressBookItem(addressBookItemID);
    if (contact == null) {
        document.getElementById("textdivshowResult").innerHTML = "Result : no addressBookItem find";
    } else {
        var attribute = contact.getAvailableAttributes();
        var result=attribute[0];
	
        for(var i=1; i<attribute.length; i++){
                result += ","+attribute[i];
        }
        document.getElementById("textdivshowResult").innerHTML = "Result : "+ result;
    }
}

function clickItupdateAddressBookItem() {
    showDetail_AddressBookItem();
    document.getElementById("textdivshowResult").innerHTML = "";
    document.getElementById("textdivshowName").innerHTML = "Method update";
    document.getElementById("textdivshowExplanation").innerHTML = "Update an event. ";
    document.getElementById("textdivshowInitialCondition").innerHTML = "Notice : input the id in the text.";
    document.getElementById("textdivshowSampleCode").innerHTML = "E.g.: var contact = Widget.PIM.getAddressBookItem(\"1\"); contact.setAttributeValue(\"fullName\", \"bill\"); contact.update();";
    flag = "clickupdateAddressBookItem";
}

function clickupdateAddressBookItem() {
    var addressBookItemID=document.getElementById('AddressBookItemtestid').value;
    var contact = Widget.PIM.getAddressBookItem(addressBookItemID);
    if (contact == null) {
        document.getElementById("textdivshowResult").innerHTML = "Result : no addressBookItem find";
    } else {
        var attr = "fullName";
        var val = "bill";
        if (isNotEmpty(attr) && isNotEmpty(val)) {
            contact.setAttributeValue(attr, val);
            contact.update();
        }
        document.getElementById("textdivshowResult").innerHTML = "Result : Success";
    }
}

function clickItsetAddressGroupNames() {
    showDetail_AddressBookItem();
    document.getElementById("textdivshowResult").innerHTML = "";
    document.getElementById("textdivshowName").innerHTML = "Method setAddressGroupNames";
    document.getElementById("textdivshowSampleCode").innerHTML = "E.g.: var contact = Widget.PIM.getAddressBookItem(\"1\");\n var groups = new Array(\"Friends\",\"Family\");contact.setAddressGroupNames(groups);";
    document.getElementById("textdivshowExplanation").innerHTML = "Puts the contact into multiple contact groups.  ";
    document.getElementById("textdivshowInitialCondition").innerHTML = "Notice : input the id in the text.";
    flag = "clicksetAddressGroupNames";
}

function clicksetAddressGroupNames() {
    var addressBookItemID=document.getElementById('AddressBookItemtestid').value;
    var contact = Widget.PIM.getAddressBookItem(addressBookItemID);
    if (contact == null) {
        document.getElementById("textdivshowResult").innerHTML = "Result : no addressBookItem find";
    } else {
	var groupNames = new Array();
	groupNames[0] = "Friends";
	groupNames[1] = "Family";
    contact.setAddressGroupNames(groupNames);
    document.getElementById("textdivshowResult").innerHTML = "Result : Success";
    }
}

function clickItgetAddressGroupNames() {
    showDetail_AddressBookItem();
    document.getElementById("textdivshowResult").innerHTML = "";
    document.getElementById("textdivshowName").innerHTML = "Method getAddressGroupNames";
    document.getElementById("textdivshowSampleCode").innerHTML = "E.g.: var contact = Widget.PIM.getAddressBookItem(\"1\");\n var ret = contact.getAddressGroupNames();";
    document.getElementById("textdivshowExplanation").innerHTML = "Returns the group names the contact belongs to.  ";
    document.getElementById("textdivshowInitialCondition").innerHTML = "Notice : input the id in the text.";
    flag = "clickgetAddressGroupNames";
}

function clickgetAddressGroupNames() {
    var addressBookItemID=document.getElementById('AddressBookItemtestid').value;
    var contact = Widget.PIM.getAddressBookItem(addressBookItemID);
    if (contact == null) {
        document.getElementById("textdivshowResult").innerHTML = "Result : no addressBookItem find";
    } else {
        var ret = contact.getAddressGroupNames();
        var result = "";
        if( ret.length == 0) {
            result = "No available address group found.";
        } else {
        	result = ret[0];
            for(var i=1; i<ret.length; i++) {
                    result = result + "," + ret[i];
            }
        }
        document.getElementById("textdivshowResult").innerHTML = "Result  : " + result;
    }
}
