var EXPORTED_SYMBOLS = ["PIM"];

var _PIM_122 = Components.classes["@jil.org/jilapi-pim;1"].getService(Components.interfaces.jilPIM);

Components.utils.import("resource://transit-emulator/api/wac/SecurityManager.jsm");
Components.utils.import("resource://transit-emulator/api/wac/1.0/AddressBookItem.jsm");

function PIM()
{
  this.onAddressBookItemsFound = null;
}

PIM.prototype = function()
{  
};

PIM.prototype.toString = function()
{
  return("Widget.PIM");
};

PIM.prototype.onAddressBookItemsFound = null;

PIM.prototype.createAddressBookItem = function()
{
  var item = new AddressBookItem();
  item.setJIL(_PIM_122.createAddressBookItem());
  return(item);
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

PIM.prototype.getAddressBookItem = function(id)
{
  var wrappedItem = null;
  SecurityManager.checkSecurity("Get Contact (PIM.getAddressBookItem)", SecurityManager.OP_SESSION, SecurityManager.OP_BLANKET, SecurityManager.OP_ALLOWED, function()
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