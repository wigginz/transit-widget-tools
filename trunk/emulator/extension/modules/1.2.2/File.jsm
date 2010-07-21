var EXPORTED_SYMBOLS = ["File"];

var _Device_122 = Components.classes["@jil.org/jilapi-device;1"].getService(Components.interfaces.jilDevice);

function File()
{
}

File.prototype = function()
{
  
};

File.prototype._jilFile = null;

File.prototype.createDate = null;

File.prototype.fileName = null;

File.prototype.filePath = null;

File.prototype.fileSize = null;

File.prototype.isDirectory = null;

File.prototype.lastModifyDate = null;

File.prototype.setJIL = function(jilFile)
{
  this.createDate = jilFile.createDate;
  this.fileName = jilFile.fileName;
  this.filePath = jilFile.filePath;
  this.fileSize = jilFile.fileSize;
  this.isDirectory = jilFile.isDirectory;
  this.lastModifyDate = jilFile.lastModifyDate;
  this._jil = jilFile;
};

File.prototype.updateJIL = function()
{
  if ( this._jilFile == null )
    this._jilFile = _Device_122.getNewFile();

  this._jilFile.createDate = this.createDate;
  this._jilFile.fileName = this.fileName;
  this._jilFile.filePath = this.filePath;
  this._jilFile.fileSize = this.fileSize;
  this._jilFile.isDirectory = this.isDirectory;
  this._jilFile.lastModifyDate = this.lastModifyDate;
  return(this._jilFile);
};