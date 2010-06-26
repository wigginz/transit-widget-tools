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

function showEventRecurrent() {
    var EventRecurrenceTypestest = document.getElementById("EventRecurrenceTypestest");
    EventRecurrenceTypestest.style.display = "block";
    var showDetail = document.getElementById("showDetail");
    showDetail.style.display = "none";
}

function showDetail_EventRecurrenceType()
{
    var EventRecurrenceTypestest = document.getElementById("EventRecurrenceTypestest");
    EventRecurrenceTypestest.style.display = "none";
    var showDetail = document.getElementById("showDetail");
    showDetail.style.display = "block";
}

function not_repeat() {
    showDetail_EventRecurrenceType();
    document.getElementById("textdivshowResult").innerHTML = "";
    document.getElementById("textdivshowName").innerHTML = "Field NOT_REPEAT";
    document.getElementById("textdivshowExplanation").innerHTML = "This represents the reminder will not repeat.";
    document.getElementById("textdivshowSampleCode").innerHTML = "E.g. var calendarItem = new Widget.PIM.CalendarItem(); calendarItem.eventRecurrence =Widget.PIM.EventRecurrenceTypes.NOT_REPEAT ;";
    flag = "clicknot_repeat";
}

function clicknot_repeat() {
    var calendarItem = new Widget.PIM.CalendarItem();
    calendarItem.eventRecurrence = Widget.PIM.EventRecurrenceTypes.NOT_REPEAT;
    document.getElementById("textdivshowResult").innerHTML = "Result : Success";
}

function daily() {
    showDetail_EventRecurrenceType();
    document.getElementById("textdivshowResult").innerHTML = "";
    document.getElementById("textdivshowName").innerHTML = "Field DAILY";
    document.getElementById("textdivshowExplanation").innerHTML = "This represents the reminder will repeat daily.";
    document.getElementById("textdivshowSampleCode").innerHTML = "E.g. var calendarItem = new Widget.PIM.CalendarItem(); calendarItem.eventRecurrence =Widget.PIM.EventRecurrenceTypes.DAILY ;";
    flag = "clickdaily";
}

function clickdaily() {
    var calendarItem = new Widget.PIM.CalendarItem();
    calendarItem.eventRecurrence = Widget.PIM.EventRecurrenceTypes.DAILY;
    document.getElementById("textdivshowResult").innerHTML = "Result : Success";
}

function every_weekday() {
    showDetail_EventRecurrenceType();
    document.getElementById("textdivshowResult").innerHTML = "";
    document.getElementById("textdivshowName").innerHTML = "Field EVERY_WEEKDAY";
    document.getElementById("textdivshowExplanation").innerHTML = "This represents the reminder will repeat on weekday.";
    document.getElementById("textdivshowSampleCode").innerHTML = "E.g. var calendarItem = new Widget.PIM.CalendarItem(); calendarItem.eventRecurrence =Widget.PIM.EventRecurrenceTypes.EVERY_WEEKDAY ;";
    flag = "clickevery_weekday";
}

function clickevery_weekday() {
    var calendarItem = new Widget.PIM.CalendarItem();
    calendarItem.eventRecurrence = Widget.PIM.EventRecurrenceTypes.EVERY_WEEKDAY;
    document.getElementById("textdivshowResult").innerHTML = "Result : Success";
}

function weekly_on_day() {
    showDetail_EventRecurrenceType();
    document.getElementById("textdivshowResult").innerHTML = "";
    document.getElementById("textdivshowName").innerHTML = "Field WEEKLY_ON_DAY";
    document.getElementById("textdivshowExplanation").innerHTML = "This represents the reminder will repeat every week.";
    document.getElementById("textdivshowSampleCode").innerHTML = "E.g. var calendarItem = new Widget.PIM.CalendarItem(); calendarItem.eventRecurrence =Widget.PIM.EventRecurrenceTypes.WEEKLY_ON_DAY ;";
    flag = "clickweekly_on_day";
}

function clickweekly_on_day() {
    var calendarItem = new Widget.PIM.CalendarItem();
    calendarItem.eventRecurrence = Widget.PIM.EventRecurrenceTypes.WEEKLY_ON_DAY;
    document.getElementById("textdivshowResult").innerHTML = "Result : Success";
}

function monthly_on_day() {
    showDetail_EventRecurrenceType();
    document.getElementById("textdivshowResult").innerHTML = "";
    document.getElementById("textdivshowName").innerHTML = "Field MONTHLY_ON_DAY";
    document.getElementById("textdivshowExplanation").innerHTML = "This represents the reminder will repeat monthly, on the weekday every month.";
    document.getElementById("textdivshowSampleCode").innerHTML = "E.g. var calendarItem = new Widget.PIM.CalendarItem(); calendarItem.eventRecurrence =Widget.PIM\n.EventRecurrenceTypes.MONTHLY_ON_DAY ;";
    flag = "clickmonthly_on_day";
}

function clickmonthly_on_day() {
    var calendarItem = new Widget.PIM.CalendarItem();
    calendarItem.eventRecurrence = Widget.PIM.EventRecurrenceTypes.MONTHLY_ON_DAY;
    document.getElementById("textdivshowResult").innerHTML = "Result : Success";
}

function monthly_on_day_count() {
    showDetail_EventRecurrenceType();
    document.getElementById("textdivshowResult").innerHTML = "";
    document.getElementById("textdivshowName").innerHTML = "Field MONTHLY_ON_DAY_\nCOUNT";
    document.getElementById("textdivshowExplanation").innerHTML = "This represents the reminder will repeat monthly, on the monthday every month.";
    document.getElementById("textdivshowSampleCode").innerHTML = "E.g. var calendarItem = new Widget.PIM.CalendarItem(); calendarItem.eventRecurrence =Widget.PIM\n.EventRecurrenceTypes.MONTHLY_ON_DAY_COUNT ;";
    flag = "clickmonthly_on_day_count";
}

function clickmonthly_on_day_count() {
    var calendarItem = new Widget.PIM.CalendarItem();
    calendarItem.eventRecurrence = Widget.PIM.EventRecurrenceTypes.MONTHLY_ON_DAY_COUNT;
    document.getElementById("textdivshowResult").innerHTML = "Result : Success";
}

function yearly() {
    showDetail_EventRecurrenceType();
    document.getElementById("textdivshowResult").innerHTML = "";
    document.getElementById("textdivshowName").innerHTML = "Field YEARLY";
    document.getElementById("textdivshowExplanation").innerHTML = "This represents the reminder will repeat yearly.";
    document.getElementById("textdivshowSampleCode").innerHTML = "E.g. var calendarItem = new Widget.PIM.CalendarItem(); calendarItem.eventRecurrence =Widget.PIM.EventRecurrenceTypes.YEARLY ;";
    flag = "clickyearly";
}

function clickyearly() {
    var calendarItem = new Widget.PIM.CalendarItem();
    calendarItem.eventRecurrence = Widget.PIM.EventRecurrenceTypes.YEARLY;
    document.getElementById("textdivshowResult").innerHTML = "Result : Success";
}
