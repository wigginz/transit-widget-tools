var EXPORTED_SYMBOLS = ["Exception"];

function Exception()
{
}

Exception.prototype = function()
{
};

Exception.prototype.toString = function()
{
  return("Widget.Exception");
};  

Exception.prototype._jilException = null;

Exception.prototype.message = null;

Exception.prototype.type = null;

Exception.prototype.setJIL = function(jilException)
{
  this.message = jilException.message;
  this.type = jilException.type;
  this._jilException = jilException;
};

Exception.prototype.updateJIL = function()
{
  this._jilException.message = this.message;
  this._jilException.type = this.type;
  return(this._jilException);
};