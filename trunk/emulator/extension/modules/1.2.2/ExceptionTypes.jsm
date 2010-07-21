var EXPORTED_SYMBOLS = ["ExceptionTypes"];

var _ExceptionTypes_122 = Components.classes["@jil.org/jilapi-exceptiontypes;1"].createInstance(Components.interfaces.jilExceptionTypes);

function ExceptionTypes()
{
}

ExceptionTypes.prototype = function()
{
  
};

ExceptionTypes.prototype.INVALID_PARAMETER = _ExceptionTypes_122.INVALID_PARAMETER;

ExceptionTypes.prototype.SECURITY = _ExceptionTypes_122.SECURITY;

ExceptionTypes.prototype.UNKNOWN = _ExceptionTypes_122.UNKNOWN;

ExceptionTypes.prototype.UNSUPPORTED = _ExceptionTypes_122.UNSUPPORTED;