var EXPORTED_SYMBOLS = ["WidgetManager"];

Components.utils.import("resource://transit-runtime/TransitCommon.jsm");
Components.utils.import("resource://transit-runtime/runtime/RuntimeManager.jsm");
Components.utils.import("resource://transit-runtime/packaging/wac/WidgetIngester.jsm");

var WidgetManager = 
{
  installWidgetPackage : function()
  {
    var ww = Components.classes["@mozilla.org/embedcomp/window-watcher;1"].getService(Components.interfaces.nsIWindowWatcher);

    // show the file picker dialog
    var nsIFilePicker = Components.interfaces.nsIFilePicker;
    var fp = Components.classes["@mozilla.org/filepicker;1"].createInstance(nsIFilePicker);
    fp.init(ww.activeWindow, "Select Widget File", nsIFilePicker.modeOpen);
    fp.appendFilter("Widget File (*.wgt)","*.wgt");

    var configFile = null;
    var baseUrl = null;

    var res = fp.show();
    // accept an OK 
    if ( res == nsIFilePicker.returnOK )
    {
      var zipReader = Components.classes["@mozilla.org/libjar/zip-reader;1"]
                .createInstance(Components.interfaces.nsIZipReader);
      zipReader.open(fp.file);
      zipReader.test(null);      
      TransitCommon.debug("Opening widget package from path "+fp.file.path);

      var tempDir = RuntimeManager.getTempDirectory();

      var wgtDir = Components.classes["@mozilla.org/file/local;1"].createInstance(Components.interfaces.nsILocalFile);
      wgtDir.initWithPath(tempDir+TransitCommon.getFileSeparator()+fp.file.leafName);
      TransitCommon.debug("Creating directory to unzip widget contents to: "+tempDir+TransitCommon.getFileSeparator()+fp.file.leafName);
      
      // if it exists, delete it
      if ( wgtDir.exists() )
      {
        TransitCommon.debug("Temp directory for widget already exists, overwriting.");
        wgtDir.remove(true);
      }

      wgtDir.create(Components.interfaces.nsILocalFile.DIRECTORY_TYPE, 0777);
      
      var entries = zipReader.findEntries(null);
      var foundConfig = false;
      while (entries.hasMore()) 
      {
        var fileName = entries.getNext();
        if ( fileName.indexOf("config.xml") > -1 )
          foundConfig = true;
        
        TransitCommon.debug("Extracting file: "+fileName+" to: "+wgtDir.path+TransitCommon.getFileSeparator()+fileName);

        var extractedFile = RuntimeManager.getItemFile(wgtDir, fileName); 
        
        if ( extractedFile.exists() )
          continue;
        
        try 
        {
          extractedFile.create(Components.interfaces.nsILocalFile.DIRECTORY_TYPE, 0777);
	  zipReader.extract(fileName, extractedFile);
        }
        catch (e)
        {
          TransitCommon.debug("Failed to create target file for extraction " +
                " file = " + extractedFile.path + ", exception = " + e);
        }
      }
      zipReader.close();
      
      if ( !foundConfig )
        TransitCommon.alert("Widget package does not appear to be a valid widget package, no config.xml file found within package.");
      else
      {
	baseUrl = "file://"+wgtDir.path+TransitCommon.getFileSeparator();
	configFile = baseUrl+"config.xml";
      }
    }

    // get the dom doc and ingest the widget to see if it's a valid widget
    var domDoc = TransitCommon.getDomDocFromFile(configFile);

    var widgetResult = WidgetIngester.ingest(domDoc, baseUrl);
    var widget = widgetResult.widget;

    if ( (!widget) || (widgetResult.errors.length > 0) )
    {
      TransitCommon.alert("Widget config.xml is not valid and cannot be installed. Please check with the widget developer for a fix.");
      TransitCommon.debug("Widget ingestion failed, number of errors: "+widgetResult.errors.length+", actual widget: "+widget+" (if null, config.xml might be malformed).");
      return;
    }

    // check to see if it's already installed
    var emulatedWidget = RuntimeManager.getInstalledWidget(widget.id, widget.version);
    var reinstall = false;

    // if it doesnt, add it
    if ( emulatedWidget == null )
    {
      emulatedWidget = 
      {
        version : widget.version,
        name : widget.names[0].name, 
        author : widget.authorName,
        profileId : RuntimeManager.context.deviceProfile.id,
        applicationId: widget.id,
        iconFile : widget.iconLeafName,
        contentFile: widget.contentLeafName,
        new : true,
      };

      // set the new uuid
      var uuidGenerator = Components.classes["@mozilla.org/uuid-generator;1"].getService(Components.interfaces.nsIUUIDGenerator);
      emulatedWidget.uuid = uuidGenerator.generateUUID().toString();
    }
    // if it does, confirm that the user wants to overwrite the existing installation
    else
    {
      if ( !TransitCommon.confirm("This widget is already installed, would you like to re-install it? This may destroy any previously saved preferences with this widget.") )
      {
	TransitCommon.debug("Widget already installed, user did not want to re-install.");
	return(false);
      }
    }

    // now, copy the temp directory to the install directory
    var installDir = RuntimeManager.getInstallDirectory();

    var widgetInstallDir = Components.classes["@mozilla.org/file/local;1"].createInstance(Components.interfaces.nsILocalFile);
    widgetInstallDir.initWithPath(installDir);
    if ( !widgetInstallDir.exists() )
    {
      TransitCommon.debug("Widget install directory does not exist, creating it.");
      widgetInstallDir.create(Components.interfaces.nsILocalFile.DIRECTORY_TYPE, 0777);
    }

    TransitCommon.debug("Creating directory to copy widget contents to: "+tempDir+TransitCommon.getFileSeparator()+emulatedWidget.uuid);

    TransitCommon.debug("UUID for widget is "+emulatedWidget.uuid+", copying temp directory to "+installDir);

    if ( emulatedWidget.new != true )
    {
      TransitCommon.debug("Attempting to remove previously installed widget directory.");
      var oldInstallDir = Components.classes["@mozilla.org/file/local;1"].createInstance(Components.interfaces.nsILocalFile);
      oldInstallDir.initWithPath(installDir+TransitCommon.getFileSeparator()+emulatedWidget.uuid);
      if ( oldInstallDir.exists() )
	oldInstallDir.remove(true);
    }
    
    wgtDir.copyTo(widgetInstallDir, emulatedWidget.uuid);
    wgtDir.remove(true);
    
    var newContentSource = "file://"+
      widgetInstallDir.path+
      TransitCommon.getFileSeparator()+
      emulatedWidget.uuid+
      TransitCommon.getFileSeparator()+
      widget.contentLeafName;
    widget.contentSource = newContentSource;    

    // finally, update the profile database
    RuntimeManager.updateInstalledWidget(emulatedWidget);

    widget.emulatedWidget = emulatedWidget;
    return(widget);
  },
}