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
 * @fileoverview: This file is set as the Widget of testing all classes of
 * JavaScript API.
 */
var flag = "";
function clickItResult(){
    switch (flag) {
        case "clickfindAddressBookItems":
            clickfindAddressBookItems();
            break;
        case "clickaddAddressBookItem":
            clickaddAddressBookItem();
            break;
        case "clickdeleteAddressBookItem":
            clickdeleteAddressBookItem();
            break;
        case "onAddressBookItemsFoundAction":
            onAddressBookItemsFoundAction();
            break;
        case "onCalendarItemAlertAction":
            onCalendarItemAlertAction();
            break;
        case "createAddressBookItemAction":
            createAddressBookItemAction();
            break;
        case "clickgetAddressBookItem":
            clickgetAddressBookItem();
            break;
        case "clickgetAddressBookItemsCount":
            clickgetAddressBookItemsCount();
            break;
        case "clickaddCalendarItem": 
            clickaddCalendarItem();
            break;
        case "clickfindCalendarItems":
        clickfindCalendarItems();
            break;
        case "clickdeleteCalendarItem":
            clickdeleteCalendarItem();
            break;
        case "clickgetCalendarItem":
            clickgetCalendarItem();
            break;
        case "clickgetCalendarItems":
            clickgetCalendarItems();
            break;
        case "onCalendarItemsFoundAction":
            onCalendarItemsFoundAction();
            break;
        case "clickcreateAddressBookGroup":
            clickcreateAddressBookGroup();
            break;
        case "clickdeleteAddressBookGroup":
            clickdeleteAddressBookGroup();
            break;
        case "clickgetAvailableAddressGroupNames":
            clickgetAvailableAddressGroupNames();
            break;
        case "clickexportAsVCard":
            clickexportAsVCard();
            break;
        case "clickonVCardExportingFinish":
            clickonVCardExportingFinish();
            break;
        case "getAddressBookGroupMembersAction":
        	getAddressBookGroupMembersAction();
            break;
        case "addressAction":
        	addressAction();
            break;
        case "addressBookItemIdAction":
        	addressBookItemIdAction();
            break;
        case "companysAction":
        	companysAction();
            break;
        case "eMailAction":
        	eMailAction();
            break;
        case "fullNameAction":
        	fullNameAction();
            break;
        case "homePhoneAction":
        	homePhoneAction();
            break;
        case "mobilePhoneAction":
        	mobilePhoneAction();
            break;
        case "titleAction":
        	titleAction();
            break;
        case "workPhoneAction":
        	workPhoneAction();
            break;
        case "clickgetAttributeValue":
        	clickgetAttributeValue();
            break;
        case "clicksetAttributeValue":
            clicksetAttributeValue();
            break;
        case "clickgetAvailableAttributes":
            clickgetAvailableAttributes();
            break;
        case "clickupdateAddressBookItem":
            clickupdateAddressBookItem();
            break;
        case "clicksetAddressGroupNames":
            clicksetAddressGroupNames();
            break;
        case "clickgetAddressGroupNames":
            clickgetAddressGroupNames();
            break;
        case "clickupdate":
            clickupdate();
            break;
        case "alarmDateAction":
        	alarmDateAction();
            break;
        case "alarmedAction":
        	alarmedAction();
            break;
        case "calendarItemIdAction":
        	calendarItemIdAction();
            break;
        case "eventEndTimeAction":
        	eventEndTimeAction();
            break;
        case "eventStartTimeAction":
        	eventStartTimeAction();
            break;
        case "eventNameAction":
        	eventNameAction();
            break;
        case "eventNotesAction":
        	eventNotesAction();
            break;
        case "eventRecurrenceAction":
        	eventRecurrenceAction();
            break;
        case "clicknot_repeat":
            clicknot_repeat();
            break;
        case "clickdaily":
            clickdaily();
            break;
        case "clickevery_weekday":
            clickevery_weekday();
            break;
        case "clickweekly_on_day":
            clickweekly_on_day();
            break;
        case "clickmonthly_on_day":
            clickmonthly_on_day();
            break;
        case "clickmonthly_on_day_count":
            clickmonthly_on_day_count();
            break;
        case "clickyearly":
            clickyearly();
            break;
        default:
            break;
    }
}