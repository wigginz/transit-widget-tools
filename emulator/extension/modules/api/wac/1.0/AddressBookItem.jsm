var EXPORTED_SYMBOLS = ["AddressBookItem"];

var _PIM_122a = Components.classes["@jil.org/jilapi-pim;1"].getService(Components.interfaces.jilPIM);

Components.utils.import("resource://transit-emulator/api/wac/SecurityManager.jsm");

function AddressBookItem()
{
}

AddressBookItem.prototype = function()
{  
};

AddressBookItem.prototype.toString = function()
{
  return("Widget.PIM.AddressBookItem");
};
      
AddressBookItem.prototype._jilAddrItem = null;

AddressBookItem.prototype.address = null;

AddressBookItem.prototype.addressBookItemId = null;

AddressBookItem.prototype.company = null;

AddressBookItem.prototype.eMail = null;

AddressBookItem.prototype.fullName = null;

AddressBookItem.prototype.homePhone = null;

AddressBookItem.prototype.mobilePhone = null;

AddressBookItem.prototype.title = null;

AddressBookItem.prototype.workPhone = null;

AddressBookItem.prototype.getAttributeValue = function(attr)
{
  this.updateJIL();
  return(this._jilAddrItem.getAttributeValue(attr));
};

AddressBookItem.prototype.getAvailableAttributes = function()
{
  this.updateJIL();
  return(this._jilAddrItem.getAvailableAttributes());
};

AddressBookItem.prototype.setAddressGroupNames = function(groups)
{
  this.updateJIL();
  this._jilAddrItem.setAddressGroupNames(groups, groups.length);
};

AddressBookItem.prototype.setAttributeValue = function(attr, value)
{
  this.updateJIL();
  this._jilAddrItem.setAttributeValue(attr, value);
};

AddressBookItem.prototype.update = function()     
{
  var allowed = false;
  SecurityManager.checkSecurity("Update Contact (AddressBookItem.update)", SecurityManager.OP_ONE_SHOT, SecurityManager.OP_BLANKET, SecurityManager.OP_ALLOWED, function()
  {
    allowed = true;          
  });
  
  if ( allowed )
  {
    this.updateJIL();
    this._jilAddrItem.update();
  }
};

AddressBookItem.prototype.setJIL = function(jilAddrItem)
{
  this.address = jilAddrItem.address;
  this.addressBookItemId = jilAddrItem.addressBookItemId;
  this.company = jilAddrItem.company;
  this.eMail = jilAddrItem.eMail;
  this.fullName = jilAddrItem.fullName;
  this.homePhone = jilAddrItem.homePhone;
  this.mobilePhone = jilAddrItem.mobilePhone;
  this.title = jilAddrItem.title;
  this.workPhone = jilAddrItem.workPhone;
  this.ringtone = jilAddrItem.ringtone;
  this._jilAddrItem = jilAddrItem;
};

AddressBookItem.prototype.updateJIL = function()
{
  if ( this._jilAddrItem == null )
    this._jilAddrItem = _PIM_122a.createAddressBookItem();
  
  this._jilAddrItem.address = this.address;
  this._jilAddrItem.addressBookItemId = this.addressBookItemId;
  this._jilAddrItem.company = this.company;
  this._jilAddrItem.eMail = this.eMail;
  this._jilAddrItem.fullName = this.fullName;
  this._jilAddrItem.homePhone = this.homePhone;
  this._jilAddrItem.mobilePhone = this.mobilePhone;
  this._jilAddrItem.title = this.title;
  this._jilAddrItem.workPhone = this.workPhone;
  this._jilAddrItem.ringtone = this.ringtone;
  return(this._jilAddrItem);
};