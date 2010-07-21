var EXPORTED_SYMBOLS = ["MessageQuantities"];

function MessageQuantities()
{
}

MessageQuantities.prototype = function()
{
  
};

MessageQuantities.prototype._jilMsgQuantities = null;

MessageQuantities.prototype.totalMessageCnt = null;

MessageQuantities.prototype.totalMessageReadCnt = null;

MessageQuantities.prototype.totalMessageUnreadCnt = null;

MessageQuantities.prototype.setJIL = function(jilMsgQuantities)
{
  this.totalMessageCnt = jilMsgQuantities.totalMessageCnt;
  this.totalMessageReadCnt = jilMsgQuantities.totalMessageReadCnt;
  this.totalMessageUnreadCnt = jilMsgQuantities.totalMessageUnreadCnt;
  this._jilMsgQuantities = jilMsgQuantities;
};

MessageQuantities.prototype.updateJIL = function()
{
  this._jilMsgQuantities.totalMessageCnt = this.totalMessageCnt;
  this._jilMsgQuantities.totalMessageReadCnt = this.totalMessageReadCnt;
  this._jilMsgQuantities.totalMessageUnreadCnt = this.totalMessageUnreadCnt;
  return(this._jilMsgQuantities);
};