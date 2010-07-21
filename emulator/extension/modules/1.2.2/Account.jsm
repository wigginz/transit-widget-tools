var EXPORTED_SYMBOLS = ["Account"];

var _Messaging_122 = Components.classes["@jil.org/jilapi-messaging;1"].getService(Components.interfaces.jilMessaging);

function Account()
{
}

Account.prototype = function()
{
  
};

Account.prototype._jilAccount = null;

Account.prototype.accountId = null;

Account.prototype.accountName = null;

Account.prototype.setJIL = function(jilAccount)
{
  this.accountId = jilAccount.accountId;
  this.accountName = jilAccount.accountName;
  this._jilAccount = jilAccount;
};

Account.prototype.updateJIL = function()
{
  if ( this._jilAccount == null )
    this._jilAccount = _Messaging_122.getNewAccount();
  
  this.accountId = this._jilAccount.accountId;
  this.accountName = this._jilAccount.accountName;
  return(this._jilAccount);
};