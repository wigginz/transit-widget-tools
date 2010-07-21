var EXPORTED_SYMBOLS = ["EventRecurrenceTypes"];

var _EventRecurrenceTypes_122 = Components.classes["@jil.org/jilapi-eventrecurrencetypes;1"].createInstance(Components.interfaces.jilEventRecurrenceTypes);

function EventRecurrenceTypes()
{
}

EventRecurrenceTypes.prototype = function()
{  
};

EventRecurrenceTypes.prototype.toString = function()
{
  return("Widget.PIM.EventRecurrenceTypes");
};  

EventRecurrenceTypes.prototype.DAILY = _EventRecurrenceTypes_122.DAILY;

EventRecurrenceTypes.prototype.EVERY_WEEKDAY = _EventRecurrenceTypes_122.EVERY_WEEKDAY;

EventRecurrenceTypes.prototype.MONTHLY_ON_DAY = _EventRecurrenceTypes_122.MONTHLY_ON_DAY;

EventRecurrenceTypes.prototype.MONTHLY_ON_DAY_COUNT = _EventRecurrenceTypes_122.MONTHLY_ON_DAY_COUNT;

EventRecurrenceTypes.prototype.NOT_REPEAT = _EventRecurrenceTypes_122.NOT_REPEAT;

EventRecurrenceTypes.prototype.WEEKLY_ON_DAY = _EventRecurrenceTypes_122.WEEKLY_ON_DAY;

EventRecurrenceTypes.prototype.YEARLY = _EventRecurrenceTypes_122.YEARLY;