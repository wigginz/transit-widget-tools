var EXPORTED_SYMBOLS = ["AccountInfo"];

var _AccountInfo_122 = Components.classes["@jil.org/jilapi-accountinfo;1"].getService(Components.interfaces.jilAccountInfo);

function AccountInfo()
{
  this.phoneMSISDN = _AccountInfo_122.phoneMSISDN;
  this.phoneOperatorName = _AccountInfo_122.phoneOperatorName;
  this.phoneUserUniqueId = _AccountInfo_122.phoneUserUniqueId;
  this.userAccountBalance = _AccountInfo_122.userAccountBalance;
  this.userSubscriptionType = _AccountInfo_122.userSubscriptionType;
}

AccountInfo.prototype = function()
{  
}; 

AccountInfo.prototype.toString = function()
{
  return("Widget.Device.AccountInfo");
};

AccountInfo.prototype.phoneMSISDN = null;

AccountInfo.prototype.phoneOperatorName = null;

AccountInfo.prototype.phoneUserUniqueId = null;

AccountInfo.prototype.userAccountBalance = null;

AccountInfo.prototype.userSubscriptionType = null;