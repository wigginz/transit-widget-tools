var EXPORTED_SYMBOLS = ["XMLHttpRequest"];

Components.utils.import("resource://transit-emulator/TransitCommon.jsm");

function XMLHttpRequest()
{
  var self = this;
  
  self.wrapped = Components.classes["@mozilla.org/xmlextras/xmlhttprequest;1"].createInstance(Components.interfaces.nsIXMLHttpRequest);
  
  self.headers = null;
  
  self.setRequestHeader = function(header, value) 
  {
    if ( self.headers == null )
      self.headers = new Object();
    
    self.headers[header] = value;
  };
  
  self.send = function(data)
  {
    self.data = data;
    
    self.wrapped.onreadystatechange = function()
    {
      copyValues();
      self.onreadystatechange();
    };
    self.wrapped.send(data);
  };
  
  self.open = function(method, url, sync)
  {
    self.method = method;
    self.url = url;
    self.sync = sync;
    
    self.wrapped.open(method, url, sync);
  };
  
  function copyValues() 
  {
    if ( self.wrapped.readyState )
        self.readyState = self.wrapped.readyState;

    if ( self.wrapped.status )
        self.status = self.wrapped.status;
            
    if ( self.wrapped.statusText )
        self.statusText = self.wrapped.statusText;

    if ( self.wrapped.responseText )
        self.responseText = self.wrapped.responseText;
            
    if ( self.wrapped.responseHeaders )
        self.responseHeaders = self.wrapped.responseHeaders;
    
    if ( self.responseText )
    {
      try 
      {
        var parser = Components.classes["@mozilla.org/xmlextras/domparser;1"].createInstance(Components.interfaces.nsIDOMParser);  

        self.responseXML = parser.parseFromString(self.responseText, 'text/xml');
      } 
      catch (ex) 
      {
        TransitCommon.debug(ex.message);
      }
    }
  }
} 