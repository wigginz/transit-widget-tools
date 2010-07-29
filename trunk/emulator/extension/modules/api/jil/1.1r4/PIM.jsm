var EXPORTED_SYMBOLS = ["PIM"];

var _PIM_122 = Components.classes["@jil.org/jilapi-pim;1"].getService(Components.interfaces.jilPIM);

Components.utils.import("resource://transit-emulator/api/jil/1.2.2/SecurityManager.jsm");

Components.utils.import("resource://transit-emulator/api/jil/1.1r4/EventRecurrenceTypes.jsm");
Components.utils.import("resource://transit-emulator/api/jil/1.1r4/AddressBookItem.jsm");
Components.utils.import("resource://transit-emulator/api/jil/1.1r4/CalendarItem.jsm");

function PIM()
{
  this.onAddressBookItemsFound = null;
  this.onCalendarItemAlert = null;
  this.onCalendarItemsFound = null;
  this.onVCardExportingFinish = null;
}

PIM.prototype = function()
{  
};

PIM.prototype.toString = function()
{
  return("Widget.PIM");
};

PIM.prototype.EventRecurrenceTypes = new EventRecurrenceTypes();

PIM.prototype.onAddressBookItemsFound = null;

PIM.prototype.onCalendarItemAlert = null;

PIM.prototype.onCalendarItemsFound = null;

PIM.prototype.onVCardExportingFinish = null;

PIM.prototype.addAddressBookItem = function(contact)
{
  SecurityManager.checkSecurity("Add Contact (PIM.addAddressBookItem)", SecurityManager.OP_ONE_SHOT, SecurityManager.OP_BLANKET, SecurityManager.OP_ALLOWED, function()
  {
    _PIM_122.addAddressBookItem(contact.updateJIL());
  });
};

PIM.prototype.addCalendarItem = function(item)
{
  SecurityManager.checkSecurity("Add Calendar Entry (PIM.addCalendarItem)", SecurityManager.OP_ONE_SHOT, SecurityManager.OP_BLANKET, SecurityManager.OP_ALLOWED, function()
  {
    _PIM_122.addCalendarItem(item.updateJIL());
  });
};

PIM.prototype.createAddressBookGroup = function(groupName)
{
  SecurityManager.checkSecurity("Add Contact Group (PIM.createAddressBookGroup)", SecurityManager.OP_ONE_SHOT, SecurityManager.OP_BLANKET, SecurityManager.OP_ALLOWED, function()
  {
    _PIM_122.createAddressBookGroup(groupName);
  });
};

PIM.prototype.createAddressBookItem = function()
{
  var item = new AddressBookItem();
  item.setJIL(_PIM_122.createAddressBookItem());
  return(item);
};

PIM.prototype.deleteAddressBookGroup = function(groupName)
{
  SecurityManager.checkSecurity("Remove Contact Group (PIM.deleteAddressBookGroup)", SecurityManager.OP_ONE_SHOT, SecurityManager.OP_BLANKET, SecurityManager.OP_ALLOWED, function()
  {
    _PIM_122.deleteAddressBookGroup(groupName);
  });
};

PIM.prototype.deleteAddressBookItem = function(id)
{
  SecurityManager.checkSecurity("Remove Contact (PIM.deleteAddressBookItem)", SecurityManager.OP_ONE_SHOT, SecurityManager.OP_BLANKET, SecurityManager.OP_ALLOWED, function()
  {
    _PIM_122.deleteAddressBookItem(id);
  });
};

PIM.prototype.deleteCalendarItem = function(calendarId)
{
  SecurityManager.checkSecurity("Remove Calendar Entry (PIM.deleteCalendarItem)", SecurityManager.OP_ONE_SHOT, SecurityManager.OP_ONE_SHOT, SecurityManager.OP_BLANKET, function()
  {
    _PIM_122.deleteCalendarItem(calendarId);
  });
};

PIM.prototype.exportAsVCard = function(addressBookItems)
{
  SecurityManager.checkSecurity("Export Contact VCard (PIM.exportAsVCard)", SecurityManager.OP_ONE_SHOT, SecurityManager.OP_BLANKET, SecurityManager.OP_ALLOWED, function()
  {
    _PIM_122.exportAsVCard(addressBookItems, addressBookItems.length);
  });
};

PIM.prototype.findAddressBookItems = function(comparisonContact, startInx, endInx)
{
  SecurityManager.checkSecurity("Search Contacts (PIM.findAddressBookItems)", SecurityManager.OP_SESSION, SecurityManager.OP_BLANKET, SecurityManager.OP_ALLOWED, function()
  {
    var jilContact = null;
    if ( comparisonContact instanceof AddressBookItem )
      jilContact = comparisonContact.updateJIL();
    else
      jilContact = comparisonContact;
      
      _PIM_122.findAddressBookItems(jilContact, startInx, endInx);
  });
};

PIM.prototype.findCalendarItems = function(itemToMatch, startInx, endInx)
{
  SecurityManager.checkSecurity("Search Calendar Entries (PIM.findCalendarItems)", SecurityManager.OP_SESSION, SecurityManager.OP_BLANKET, SecurityManager.OP_ALLOWED, function()
  {
    _PIM_122.findCalendarItems(itemToMatch.updateJIL(), startInx, endInx);
  });
};

PIM.prototype.getAddressBookGroupMembers = function(groupName)
{
  var jilItems = null;
  SecurityManager.checkSecurity("Add Contact Group Members (PIM.getAddressBookGroupMembers)", SecurityManager.OP_ONE_SHOT, SecurityManager.OP_BLANKET, SecurityManager.OP_ALLOWED, function()
  {
    var results = _PIM_122.getAddressBookGroupMembers(groupName);
    jilItems = new Array();
    for ( var i = 0; i < results.length; i++ )
    {
      var wrappedItem = new AddressBookItem();
      wrappedItem.setJIL(results[i]);
      jilItems.push(wrappedItem);
    }
  });
  return(jilItems);
};

PIM.prototype.getAddressBookItem = function(id)
{
  var wrappedItem = null;
  SecurityManager.checkSecurity("Get Contact (PIM.getAddressBookItem)", SecurityManager.OP_ONE_SHOT, SecurityManager.OP_BLANKET, SecurityManager.OP_ALLOWED, function()
  {
    var jilItem = _PIM_122.getAddressBookItem(id);
    wrappedItem = new AddressBookItem();
    wrappedItem.setJIL(jilItem);
  });
  return(wrappedItem);
};

PIM.prototype.getAddressBookItemsCount = function()
{
  var result = null;
  SecurityManager.checkSecurity("Count Contacts (PIM.getAddressBookItemsCount)", SecurityManager.OP_SESSION, SecurityManager.OP_BLANKET, SecurityManager.OP_ALLOWED, function()
  {
    result = _PIM_122.getAddressBookItemsCount();
  });
  return(result);
};

PIM.prototype.getAvailableAddressGroupNames = function()
{
  var result = null;
  SecurityManager.checkSecurity("Get Contact Groups (PIM.getAvailableAddressGroupNames)", SecurityManager.OP_ONE_SHOT, SecurityManager.OP_BLANKET, SecurityManager.OP_ALLOWED, function()
  {
    result = _PIM_122.getAvailableAddressGroupNames();
  });
  return(result);
};

PIM.prototype.getCalendarItem = function(calendarId)
{
  var wrappedItem = null;
  SecurityManager.checkSecurity("Get Calendar Entry (PIM.getCalendarItem)", SecurityManager.OP_ONE_SHOT, SecurityManager.OP_BLANKET, SecurityManager.OP_ALLOWED, function()
  {
    var jilItem = _PIM_122.getCalendarItem(calendarId);
    wrappedItem = new CalendarItem();
    wrappedItem.setJIL(jilItem);
  });
  return(wrappedItem);
};

PIM.prototype.getCalendarItems = function(startTime, endTime)
{
  var wrappedArray = null;
  SecurityManager.checkSecurity("Get Calendar Entries (PIM.getCalendarItems)", SecurityManager.OP_ONE_SHOT, SecurityManager.OP_BLANKET, SecurityManager.OP_ALLOWED, function()
  {
    var jilArray = _PIM_122.getCalendarItems(startTime, endTime);
    wrappedArray = new Array();
    for ( var i = 0; i < jilArray.length; i++ )
    {
      var wrappedItem = new CalendarItem();
      wrappedItem.setJIL(jilArray[i]);
      wrappedArray.push(wrappedItem);
    }
  });
  return(wrappedArray);
};