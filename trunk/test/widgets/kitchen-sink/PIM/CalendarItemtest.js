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
 * JavaScript objects CalendarItem. 
 */

function showCalendarItemtest() {
    var CalendarItemtest = document.getElementById("CalendarItemtest");
    CalendarItemtest.style.display = "block";
    var showDetail = document.getElementById("showDetail");
    showDetail.style.display = "none";
}

function showDetail_CalendarItem()
{
    var CalendarItemtest = document.getElementById("CalendarItemtest");
    CalendarItemtest.style.display = "none";
    var showDetail = document.getElementById("showDetail");
    showDetail.style.display = "block";
}

function clickAlarmDate()
{
	showDetail_CalendarItem();
    document.getElementById("textdivshowResult").innerHTML = "";
    document.getElementById("textdivshowName").innerHTML = "Field alarmDate";
    document.getElementById("textdivshowExplanation").innerHTML = "Alarm time of this event. ";
    document.getElementById("textdivshowSampleCode").innerHTML = "E.g.: var d = new Widget.PIM.CalendarItem();d.alarmDate = new Date();";
    document.getElementById("textdivshowInitialCondition").innerHTML = "Notice :  n/a";
    flag = "alarmDateAction";
}

function alarmDateAction()
{
	var d = new Widget.PIM.CalendarItem();
	d.alarmDate = new Date();
    document.getElementById("textdivshowResult").innerHTML = "Result:"+d.alarmDate;
}

function clickAlarmed()
{
	showDetail_CalendarItem();
    document.getElementById("textdivshowResult").innerHTML = "";
    document.getElementById("textdivshowName").innerHTML = "Field alarmed";
    document.getElementById("textdivshowExplanation").innerHTML = "Indicates whether an alarm is to be activated for the event. ";
    document.getElementById("textdivshowSampleCode").innerHTML = "E.g.: var obj = new Widget.PIM.CalendarItem();var flag = obj.alarmed";
    document.getElementById("textdivshowInitialCondition").innerHTML = "Notice :  n/a";
    flag = "alarmedAction";
}

function alarmedAction()
{
	var obj = new Widget.PIM.CalendarItem();
    document.getElementById("textdivshowResult").innerHTML = "Result:"+(obj.alarmed?'true':'false');
}

function clickCalendarItemId()
{
	showDetail_CalendarItem();
    document.getElementById("textdivshowResult").innerHTML = "";
    document.getElementById("textdivshowName").innerHTML = "Field calendarItemId";
    document.getElementById("textdivshowExplanation").innerHTML = "A unique indicator (potentially assigned by the WRT) for identifying the calendar event. ";
    document.getElementById("textdivshowSampleCode").innerHTML = "E.g.:Widget.PIM.onCalendarItemsFound = myCallBack;"
																    + "var myCalendar = new Widget.PIM.CalendarItem();"
																    + "myCalendar.eventStartTime = new Date(2009,8,12,0,0,0);"
																    + "Widget.PIM.addCalendarItem(myCalendar);"
																    + "Widget.PIM.findCalendarItems(myCalendar, 0, 9);"
																    + "function myCallBack(calendarItem){"
                                                                    + "          var mycalendar = calendarItem[0];" 
                                                                    + "          var id = mycalendar.calendarItemId;"
                                                                    + "          Widget.PIM.deleteCalendarItem(mycalendar.calendarItemId);}";
    document.getElementById("textdivshowInitialCondition").innerHTML = "Notice :  n/a";
    flag = "calendarItemIdAction";
}

function calendarItemIdAction()
{   
    Widget.PIM.onCalendarItemsFound = myCallBack;
    var myCalendar = new Widget.PIM.CalendarItem();
    myCalendar.eventStartTime = new Date(2009,8,12,0,0,0);
    Widget.PIM.addCalendarItem(myCalendar);
    Widget.PIM.findCalendarItems(myCalendar, 0, 9);
    function myCallBack(calendarItem){
        var mycalendar = calendarItem[0];
        document.getElementById("textdivshowResult").innerHTML = "Result:"+mycalendar.calendarItemId;
        Widget.PIM.deleteCalendarItem(mycalendar.calendarItemId);
    }
}

function clickEventEndTime()
{
	showDetail_CalendarItem();
    document.getElementById("textdivshowResult").innerHTML = "";
    document.getElementById("textdivshowName").innerHTML = "Field eventEndTime";
    document.getElementById("textdivshowExplanation").innerHTML = "End time of this event.";
    document.getElementById("textdivshowSampleCode").innerHTML = "E.g.: var obj = new Widget.PIM.CalendarItem();obj.eventEndTime = new Date(2009,8,12,0,0,0);";
    document.getElementById("textdivshowInitialCondition").innerHTML = "Notice :  n/a";
    flag = "eventEndTimeAction";
}

function eventEndTimeAction()
{
	var obj = new Widget.PIM.CalendarItem();
	obj.eventEndTime = new Date(2009,8,12,0,0,0);
    document.getElementById("textdivshowResult").innerHTML = "Result:"+obj.eventEndTime;
}

function clickEventStartTime()
{
	showDetail_CalendarItem();
    document.getElementById("textdivshowResult").innerHTML = "";
    document.getElementById("textdivshowName").innerHTML = "Field eventStartTime";
    document.getElementById("textdivshowExplanation").innerHTML = "Start time of this event.";
    document.getElementById("textdivshowSampleCode").innerHTML = "E.g.: var obj = new Widget.PIM.CalendarItem();obj.eventStartTime = new Date(2009,8,12,0,0,0);";
    document.getElementById("textdivshowInitialCondition").innerHTML = "Notice :  n/a";
    flag = "eventStartTimeAction";
}

function eventStartTimeAction()
{
	var obj = new Widget.PIM.CalendarItem();
	obj.eventStartTime = new Date(2009,8,12,0,0,0);
    document.getElementById("textdivshowResult").innerHTML = "Result:"+obj.eventStartTime;
}

function clickEventName()
{
	showDetail_CalendarItem();
    document.getElementById("textdivshowResult").innerHTML = "";
    document.getElementById("textdivshowName").innerHTML = "Field eventName";
    document.getElementById("textdivshowExplanation").innerHTML = "Subject of this event.";
    document.getElementById("textdivshowSampleCode").innerHTML = "E.g.: var obj = new Widget.PIM.CalendarItem();obj.eventName = \"meeting\";";
    document.getElementById("textdivshowInitialCondition").innerHTML = "Notice :  n/a";
    flag = "eventNameAction";
}

function eventNameAction()
{
	var obj = new Widget.PIM.CalendarItem();
	obj.eventName = "meeting";
    document.getElementById("textdivshowResult").innerHTML = "Result:"+obj.eventName;
}

function clickEventNotes()
{
	showDetail_CalendarItem();
    document.getElementById("textdivshowResult").innerHTML = "";
    document.getElementById("textdivshowName").innerHTML = "Field eventNotes";
    document.getElementById("textdivshowExplanation").innerHTML = "Description of this event.";
    document.getElementById("textdivshowSampleCode").innerHTML = "E.g.: var obj = new Widget.PIM.CalendarItem();obj.eventNotes = \"Description of this event\";";
    document.getElementById("textdivshowInitialCondition").innerHTML = "Notice :  n/a";
    flag = "eventNotesAction";
}

function eventNotesAction()
{
	var obj = new Widget.PIM.CalendarItem();
	obj.eventNotes = "Description of this event";
    document.getElementById("textdivshowResult").innerHTML = "Result:"+obj.eventNotes;
}

function ClickEventRecurrence()
{
	showDetail_CalendarItem();
    document.getElementById("textdivshowResult").innerHTML = "";
    document.getElementById("textdivshowName").innerHTML = "Field eventRecurrence";
    document.getElementById("textdivshowExplanation").innerHTML = "Recurrent interval of this event.The values are defined in EventRecurrenceTypes Object.";
    document.getElementById("textdivshowSampleCode").innerHTML = "E.g.: var obj = new Widget.PIM.CalendarItem();obj.eventRecurrence = Widget.PIM.EventRecurrenceTypes.NOT_REPEAT;";
    document.getElementById("textdivshowInitialCondition").innerHTML = "Notice :  n/a";
    flag = "eventRecurrenceAction";
}

function eventRecurrenceAction()
{
	var obj = new Widget.PIM.CalendarItem();
	obj.eventRecurrence = Widget.PIM.EventRecurrenceTypes.NOT_REPEAT;
    document.getElementById("textdivshowResult").innerHTML = "Result:"+obj.eventRecurrence;
}

function clickItupdate() {
    showDetail_CalendarItem();
    document.getElementById("textdivshowResult").innerHTML = "";
    document.getElementById("textdivshowName").innerHTML = "Method update";
    document.getElementById("textdivshowExplanation").innerHTML = "Update an event. ";
    document.getElementById("textdivshowSampleCode").innerHTML = "E.g.: var calendarItem = Widget.PIM.getCalendarItem(\"1\"); calendarItem.eventStartTime = new Date(2008, 9, 22, 0, 0, 0); calendarItem.update();";
    document.getElementById("textdivshowInitialCondition").innerHTML = "Notice :  n/a";
    flag = "clickupdate";
}

function clickupdate() {
    var calendarId=document.getElementById('CalendarItemtestid').value;
    var calendarItem = Widget.PIM.getCalendarItem(calendarId);
    if (calendarItem == null) {
        document.getElementById("textdivshowResult").innerHTML = "Result  : no calendarItem find";
    } else {
        calendarItem.eventStartTime = new Date(2008, 9, 22, 0, 0, 0);
        calendarItem.update();
        document.getElementById("textdivshowResult").innerHTML = "Result : Success";
    }
}
