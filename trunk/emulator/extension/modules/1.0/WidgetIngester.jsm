var EXPORTED_SYMBOLS = ["WidgetIngester_10"];

Components.utils.import("resource://transit-emulator/TransitCommon.jsm");

var WidgetIngester_10 =
{
  indexDefaults : ["index.html", "index.htm", "index.xhtml", "index.xht"],

  /**
    Returns a widget object with properties:
    
      widget.id
      widget.version
      widget.height
      widget.width

      widget.names - array
        name
        short
        lang
      widget.icons - array
        source
        lang
        height
        width
      widget.contentType
      widget.contentEncoding
      widget.contentSource
      widget.features - array
        name
        required
      widget.localFS
      widget.remoteScripts
      widget.network
      widget.maxHeight
      widget.maxWidth
      widget.billingRequired
      widget.updateHref
      widget.updatePeriod  
      widget.descriptions - array
        description
        lang
      widget.licenses - array
        name
        href
        lang
      widget.authorName
      widget.authorHref
      widget.authorEmail
      widget.jilSpec
    }
  **/
  ingest : function(config, baseUrl)
  {
    // determine if this is a 1.0 widget
    var widgetNs = config.namespaceURI;
    
    // if the namespace of the widget is http://www.w3.org/ns/widgets, it's a 1.0 widget
    // if not, we can't ingest it
    if ( widgetNs != "http://www.jil.org/ns/widgets" )
    {
      //throw {message: "config.xml does not represent a JIL 1.0 widget; widget element namespace not 'http://www.jil.org/ns/widgets'"};
      return(null);
    }
    
    var widget = {};
    widget.jilPackagingSpec = "1.0";
    widget.baseUrl = baseUrl;
    
    widget.id = config.getAttribute("id");
    
    // TODO: validate Id
    
    widget.version = config.getAttribute("version");
    
    // TODO: validate version
    
    widget.height = config.getAttribute("height");
    widget.width = config.getAttribute("width");
      
    var nameElements = config.getElementsByTagName("name");
    widget.names = new Array();
    for ( var i = 0; i < nameElements.length; i++ )
    {
      widget.names.push(
      {
        name : nameElements[i].firstChild.nodeValue,
        short : nameElements[i].getAttribute("short"),
        lang : nameElements[i].getAttribute("xml:lang"),
      });
    }
    
    var iconElements = config.getElementsByTagName("icon");
    widget.icons = new Array();
    for ( var i = 0; i < iconElements.length; i++ )
    {
      if ( !iconElements[i].getAttribute("src") )
        throw {message: "config.xml contains a icon element which does not specify a source file."};
        
      widget.icons.push(
      {
        source : "file://"+baseUrl+iconElements[i].getAttribute("src"), 
        lang : iconElements[i].getAttribute("xml:lang"), 
        height : iconElements[i].getAttribute("height"), 
        width : iconElements[i].getAttribute("width")
      });
    }
    
    var contentElement = config.getElementsByTagName("content")[0];
    widget.contentType = null;
    if ( contentElement )
    {
      widget.contentType = contentElement.getAttribute("type");
      widget.contentSource = "file://"+baseUrl+contentElement.getAttribute("src");
      widget.contentEncoding = contentElement.getAttribute("charset");
    }
    
    // if no index file was specified, check for default values    
    if ( !widget.contentSource ) 
    {
      for ( var i = 0; i < this.indexDefaults.length; i++ )
      {
        var testFile = Components.classes["@mozilla.org/file/local;1"].createInstance(Components.interfaces.nsILocalFile);  
        testFile.initWithPath(baseUrl+this.indexDefaults[i]);
      
        if ( testFile.exists() )
        {
          widget.contentSource = "file://"+baseUrl+this.indexDefaults;
          break;
        }
      }
      if ( !widget.contentSource ) 
        throw {message: "config.xml does not contain a valid source file, could not find one in the content element, or by looking for default files (index.html, etc.)."};
    }
    
    // add feature elements, if the 'required' attribute is missing, assume value is 'true'
    var featureElements = config.getElementsByTagName("feature");
    widget.features = new Array();
    for ( var i = 0; i < featureElements.length; i++ )
    {
      // name is required
      if ( !featureElements[i].getAttribute("name") )
        throw {message: "config.xml contains a feature element that does not define a name."};

      var wFeature = {name: featureElements[i].getAttribute("name")};

      var required = featureElements[i].getAttribute("required");
      if ( required == null )
        wFeature.required = "true";
      else 
        wFeature.required = required;
      
      widget.features.push(wFeature);      
    }
    
    if ( config.getElementsByTagName("access")[0] )
    {
      widget.localFS = config.getElementsByTagName("access")[0].getAttribute("localfs");
      widget.remoteScripts = config.getElementsByTagName("access")[0].getAttribute("remote_scripts");
      widget.network = config.getElementsByTagName("access")[0].getAttribute("network");
    }
    
    if ( config.getElementsByTagName("maximum_display_mode")[0] )
    {
      widget.maxHeight = config.getElementsByTagName("maximum_display_mode")[0].getAttribute("height");
      widget.maxWidth = config.getElementsByTagName("maximum_display_mode")[0].getAttribute("width");
    }
    
    widget.billingRequired = false;
    if ( config.getElementsByTagName("billing")[0] )
    {
      if ( config.getElementsByTagName("billing")[0].getAttribute("required") == "true" )
        widget.billingRequired = true;
    }
      
    if ( config.getElementsByTagName("update")[0] )
    {
      widget.updateHref = config.getElementsByTagName("update")[0].getAttribute("href");
      widget.updatePeriod = config.getElementsByTagName("update")[0].getAttribute("period");
    }

    var descriptionElements = config.getElementsByTagName("description");
    widget.descriptions = new Array();
    for ( var i = 0; i < descriptionElements.length; i++ )
    {
      widget.descriptions.push(
      {
        description : descriptionElements[i].firstChild.nodeValue,
        lang : descriptionElements[i].getAttribute("xml:lang"), 
      });
    }
    
    var licenseElements = config.getElementsByTagName("license");
    widget.licenses = new Array();
    for ( var i = 0; i < licenseElements.length; i++ )
    {
      widget.licenses.push(
      {
        name : licenseElements[i].firstChild.nodeValue,
        href : licenseElements[i].getAttribute("href"),
        lang : licenseElements[i].getAttribute("xml:lang"),
      });
    }
      
    if ( config.getElementsByTagName("author")[0] )
    {
      widget.authorName = config.getElementsByTagName("author")[0].firstChild.nodeValue;
      widget.authorHref = config.getElementsByTagName("author")[0].getAttribute("href");
      widget.authorEmail = config.getElementsByTagName("author")[0].getAttribute("email");
    }
    
    return(widget);
  },
};