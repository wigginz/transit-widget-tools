var EXPORTED_SYMBOLS = ["AccountInfo"];

var _AccountInfo_122 = Components.classes["@jil.org/jilapi-accountinfo;1"].getService(Components.interfaces.jilAccountInfo);

function AccountInfo()
{
}

AccountInfo.prototype = function()
{  
}; 

AccountInfo.prototype.toString = function()
{
  return("Widget.Device.AccountInfo");
};

AccountInfo.prototype.phoneMSISDN = _AccountInfo_122.phoneMSISDN;

AccountInfo.prototype.phoneOperatorName = _AccountInfo_122.phoneOperatorName;

AccountInfo.prototype.phoneUserUniqueId = _AccountInfo_122.phoneUserUniqueId;

AccountInfo.prototype.userAccountBalance = _AccountInfo_122.userAccountBalance;

AccountInfo.prototype.userSubscriptionType = _AccountInfo_122.userSubscriptionType;