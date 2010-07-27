var EXPORTED_SYMBOLS = ["CalendarItem"];

var _PIM_122 = Components.classes["@jil.org/jilapi-pim;1"].getService(Components.interfaces.jilPIM);

Components.utils.import("resource://transit-emulator/1.2.2/SecurityManager.jsm");

function CalendarItem()
{
}

CalendarItem.prototype = function()
{  
};

CalendarItem.prototype.toString = function()
{
  return("Widget.PIM.CalendarItem");
}; 

CalendarItem.prototype._jilCalItem = null;

CalendarItem.prototype.alarmDate = null;

CalendarItem.prototype.alarmed = null;

CalendarItem.prototype.calendarItemId = null;

CalendarItem.prototype.eventEndTime = null;

CalendarItem.prototype.eventName = null;

CalendarItem.prototype.eventNotes = null;

CalendarItem.prototype.eventRecurrence = null;

CalendarItem.prototype.eventStartTime = null;

CalendarItem.prototype.update = function()
{
  SecurityManager.checkSecurity("Update Calendar Entry (CalendarItem.update)", SecurityManager.OP_ONE_SHOT, SecurityManager.OP_BLANKET, SecurityManager.OP_ALLOWED, function()
  {
    this.updateJIL();
    this._jilCalItem.update();
  });
};

CalendarItem.prototype.setJIL = function(jilCalItem)
{
  this.alarmDate = jilCalItem.alarmDate;
  this.alarmed = jilCalItem.alarmed;
  this.calendarItemId = jilCalItem.calendarItemId;
  this.eventEndTime = jilCalItem.eventEndTime;
  this.eventName = jilCalItem.eventName;
  this.eventNotes = jilCalItem.eventNotes;
  this.eventRecurrence = jilCalItem.eventRecurrence;
  this.eventStartTime = jilCalItem.eventStartTime;
  this._jilCalItem = jilCalItem;
};

CalendarItem.prototype.updateJIL = function()
{
  if ( this._jilCalItem == null )
    this._jilCalItem = _PIM_122.getNewCalendarItem();
    
  this._jilCalItem.alarmDate = this.alarmDate;
  this._jilCalItem.alarmed = this.alarmed;
  this._jilCalItem.calendarItemId = this.calendarItemId;
  this._jilCalItem.eventEndTime = this.eventEndTime;
  this._jilCalItem.eventName = this.eventName;
  this._jilCalItem.eventNotes = this.eventNotes;
  this._jilCalItem.eventRecurrence = this.eventRecurrence;
  this._jilCalItem.eventStartTime = this.eventStartTime;
  return(this._jilCalItem);
};