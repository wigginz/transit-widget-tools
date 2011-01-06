const CLASS_ID = Components.ID("ecfecdb0-c3f1-11de-8a39-0800200c9a66"); //#
const CLASS_NAME = "JIL API EmulatorRuntime"; //#
const CONTRACT_ID = "@jil.org/jilapi-emulatorruntime;1"; //#

/***********************************************************/

var service = null;

function JILEmulatorRuntime() //#
{
  Components.utils.import("resource://transit-emulator/TransitCommon.jsm");
  
  this.wrappedJSObject = this;
  this.profileService = Components.classes['@jil.org/jilapi-profileservice;1'].getService().wrappedJSObject;

  service = this;
}

/***********************************************************/

JILEmulatorRuntime.prototype = //#
{
  widget : null,

  emulatorWindow : null,

  emulatorLog : "",

  deviceProfile : null,

  configUri : null,

  domDoc : null,

  profileService : null,
  
  cache : new Array(),

  reloadServices : function()
  {
    // reload the API services
    Components.classes["@jil.org/jilapi-accountinfo;1"].getService(Components.interfaces.jilAccountInfo).reload();
    Components.classes["@jil.org/jilapi-audioplayer;1"].getService(Components.interfaces.jilAudioPlayer).reload();
    Components.classes["@jil.org/jilapi-config;1"].getService(Components.interfaces.jilConfig).reload();
    Components.classes["@jil.org/jilapi-datanetworkinfo;1"].getService(Components.interfaces.jilDataNetworkInfo).reload();
    Components.classes["@jil.org/jilapi-device;1"].getService(Components.interfaces.jilDevice).reload();
    Components.classes["@jil.org/jilapi-deviceinfo;1"].getService(Components.interfaces.jilDeviceInfo).reload();
    Components.classes["@jil.org/jilapi-devicestateinfo;1"].getService(Components.interfaces.jilDeviceStateInfo).reload();
    Components.classes["@jil.org/jilapi-messaging;1"].getService(Components.interfaces.jilMessaging).reload();
    Components.classes["@jil.org/jilapi-multimedia;1"].getService(Components.interfaces.jilMultimedia).reload();
    Components.classes["@jil.org/jilapi-pim;1"].getService(Components.interfaces.jilPIM).reload();
    Components.classes["@jil.org/jilapi-powerinfo;1"].getService(Components.interfaces.jilPowerInfo).reload();
    Components.classes["@jil.org/jilapi-radioinfo;1"].getService(Components.interfaces.jilRadioInfo).reload();
    Components.classes["@jil.org/jilapi-telephony;1"].getService(Components.interfaces.jilTelephony).reload();
    Components.classes["@jil.org/jilapi-videoplayer;1"].getService(Components.interfaces.jilVideoPlayer).reload();
    Components.classes["@jil.org/jilapi-widget;1"].getService(Components.interfaces.jilWidget).reload();
    Components.classes["@jil.org/jilapi-widgetmanager;1"].getService(Components.interfaces.jilWidgetManager).reload();  
    Components.classes["@jil.org/jilapi-camera;1"].getService(Components.interfaces.jilCamera).reload();
    
    this.cache = new Array();
  },
  
  reload : function(profileId)
  {
    this.emulateWidget(this.configUri, this.domDoc, profileId);
    
    this.cache = new Array();
  },
  
  setInCache : function(key, value)
  {
    this.cache[key] = value;
  },
  
  getFromCache : function(key)
  {
    return(this.cache[key]);
  },

  checkFeature : function(feature)
  {
    TransitCommon.debug("Feature check requested for feature "+feature);
    
    if ( ! this.widget.features )
    {
      TransitCommon.debug("Widget has not configured any requested features, denying access.");
      this.logAction("Widget has not configured any requested features, denying access to "+feature);
      return(false);
    }
    
    var found = false;
    for ( var i = 0; i < this.widget.features.length; i++ )
    {
      if ( this.widget.features[i].name == feature )
      {
        found = true;
        break;
      }
    }
    
    if ( ! found )
    {
      TransitCommon.debug("Widget has not requested access to feature denying access.");
      this.logAction("Widget has not requested access to this feature "+feature+", denying access.");
      return(false);
    }
    else
    {
      TransitCommon.debug("Widget has requested access to this feature allowing access.");
      this.logAction("Widget has requested access to this feature "+feature+", allowing access.");
      return(true);
    }
  },
  
  emulateWidget : function(configUri, domDoc, profileId, openWindow)
  {
    if ( profileId == null )
      this.deviceProfile = this.profileService.getAllDeviceProfiles()[0];
    else
      this.deviceProfile = this.profileService.getDeviceProfile(profileId);

    this.configUri = configUri;
    this.domDoc = domDoc;
    
    // the current window must be showing a valid config.xml
    var fileName = this.getFileName(configUri);
    var baseUrl = configUri.substring(0, configUri.length-10);
    
    this.logAction("Widget emulation requested on configuration file: "+configUri);

    // must be called "config.xml"
    if ( fileName.toLowerCase() != "config.xml" )
    {
      TransitCommon.alert("To start widget emulation, the current window location must be a valid JIL config.xml file.");
      this.logAction("Configuration file is not named config.xml, exiting.");
      return;
    }

    var onError = false;
    Components.utils.import("resource://transit-emulator/packaging/jil/WidgetIngester.jsm");
    
    var widgetResult = WidgetIngester.ingest(domDoc, baseUrl);
    var widget = widgetResult.widget;
    
    if ( !widget )
    {
      TransitCommon.alert("Widget config.xml does not conform to JIL 1.0 or 1.2 packaging specs, cannot load.");
      this.logAction("Widget config.xml does not conform to JIL 1.0 or 1.2 packging specs, cannot load.");
      return;
    }
    
    if ( widgetResult.errors.length > 0 )
    {
      var errors = "";
      for ( var i = 0; i < widgetResult.errors.length; i++ )
        errors += "\n"+widgetResult.errors[i];
      
      TransitCommon.alert("Widget config.xml is missing some required components and cannot load. Please correct the following missing components to emulate: \n"+errors);
      this.logAction("Widget config.xml is missing some required components and cannot load. Please correct the following missing components to emulate: "+errors);
      return;
    }
    
    if ( widgetResult.warnings.length > 0 )
    {
      var warnings = "";
      for ( var i = 0; i < widgetResult.warnings.length; i++ )
        warnings += "\n"+widgetResult.warnings[i];
      
      TransitCommon.alert("Widget config.xml is missing some components but emulation can proceed. We recommend fixing these missing components: \n"+warnings);
      this.logAction("Widget config.xml is missing some components but emulation can proceed. We recommend fixing these missing components: "+warnings);
    }

    try
    { 
      var ww = Components.classes["@mozilla.org/embedcomp/window-watcher;1"]
                   .getService(Components.interfaces.nsIWindowWatcher);

      this.logAction("Configuration file successfully parsed, opening widget in emulator window.");

      if ( openWindow )
      {
        this.emulatorWindow = ww.openWindow(ww.activeWindow, "chrome://transit-emulator/content/emulator/emulator.xul", "emulator", "chrome,scrollbars=yes,resizable,dialog=no,centerscreen", null);
        this.emulatorWindow.focus();
      }
      
      this.logAction("Starting widget emulation for widget: "+widget.names[0].name+", version: "+widget.version);
      
      this.logAction("Widget conforms to JIL Packaging specification "+widget.jilPackagingSpec);

      // check to see if this widget exists in the database
      var emulatedWidget = this.profileService.getEmulatedWidgetByAppId(this.deviceProfile.id, widget.id, widget.version);
      // if it doesnt, add it
      if ( emulatedWidget == null )
      {
        emulatedWidget = 
        {
          version : widget.version,
          name : widget.names[0].name, 
          author : widget.authorName,
          profileId : this.deviceProfile.id,
          applicationId: widget.id
        };
        this.profileService.addEmulatedWidget(emulatedWidget);
        // get it again so we have the ID, should rework the add so we don't have to do this...
        emulatedWidget = this.profileService.getEmulatedWidgetByAppId(this.deviceProfile.id, widget.id, widget.version);
      }
      // if it does, update it
      else
      {
        emulatedWidget.version = widget.version;
        emulatedWidget.name = widget.names[0].name;
        emulatedWidget.author = widget.authorName;
        this.profileService.updateEmulatedWidget(emulatedWidget);
      }

      widget.internalId = emulatedWidget.id;
      this.widget = widget;
      
      // initialize the services
      this.reloadServices();
    }
    catch (e) 
    {
        onError = true;
        dump( 'Error: could not read config.xml ' + e );
    }   
  },
 
  openWidgetPackage : function(window)
  {
    var nsIFilePicker = Components.interfaces.nsIFilePicker;
    var fp = Components.classes["@mozilla.org/filepicker;1"].createInstance(nsIFilePicker);
    fp.init(window, "Select a JIL Widget Package", nsIFilePicker.modeOpen);
    fp.appendFilter("JIL Widget Package File (*.wgt)","*.wgt");

    var configFile = null;

    var res = fp.show();
    // accept an OK 
    if ( res == nsIFilePicker.returnOK )
    {
      var zipReader = Components.classes["@mozilla.org/libjar/zip-reader;1"]
                .createInstance(Components.interfaces.nsIZipReader);
      zipReader.open(fp.file);
      zipReader.test(null);      
      TransitCommon.debug("Opening widget package from path "+fp.file.path);
      
      // create a temp directory
      var tempDirectory = Components.classes["@mozilla.org/file/directory_service;1"].getService(Components.interfaces.nsIProperties).get("TmpD", Components.interfaces.nsIFile);
      TransitCommon.debug("Local machine temp directory is "+tempDirectory.path);
      
      var wgtDir = Components.classes["@mozilla.org/file/local;1"].createInstance(Components.interfaces.nsILocalFile);
      wgtDir.initWithPath(tempDirectory.path+TransitCommon.getFileSeparator()+fp.file.leafName);
      TransitCommon.debug("Creating directory to unzip widget contents to: "+tempDirectory.path+TransitCommon.getFileSeparator()+fp.file.leafName);
      
      // if it exists, delete it
      if ( wgtDir.exists() )
      {
        TransitCommon.debug("Directory already exists, removing it and re-creating it.");
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

        var extractedFile = this.getItemFile(wgtDir, fileName); 
        
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
        //var req = Components.classes["@mozilla.org/xmlextras/xmlhttprequest;1"].createInstance(Components.interfaces.nsIXMLHttpRequest);
        //req.open("GET", "file://"+wgtDir.path+TransitCommon.getFileSeparator()+"config.xml", false); 
        //req.send(null);

        //window.location = "file://"+wgtDir.path+TransitCommon.getFileSeparator()+"config.xml";
        //this.emulateWidget(window.location.pathname, window.document.documentElement, null, false);
		configFile = "file://"+wgtDir.path+TransitCommon.getFileSeparator()+"config.xml";
      }
    }
	return(configFile);
  },
  
  getItemFile : function (wgtDir, filePath) 
  {
    var itemLocation = wgtDir.clone();
    var parts = filePath.split("/");
    for (var i = 0; i < parts.length; ++i)
      itemLocation.append(parts[i]);
    return itemLocation;
  },
  
  unload : function(internalId)
  {
    this.emulatorWindow = null;

    this.logAction("Emulator widget: "+this.widget.name+", version: "+this.widget.version+", has been unloaded. Stopping widget emulation.");
    this.widget = null;
  },
  
  updateStatusMessage : function(message, warn)
  {
    this.getEmulatorWindow().document.getElementById("jwe-emulator-status-bar-message").value = message;
    
    if ( warn )
    {
      this.getEmulatorWindow().document.getElementById("jwe-emulator-status-bar-message").style.color = "red";
      this.logAction("Status WARNING: "+message);
    }
    else
    {
      this.getEmulatorWindow().document.getElementById("jwe-emulator-status-bar-message").style.color = "green";
      this.logAction("Status change: "+message);
    }
  },  

  getWidget : function() 
  {
    return(this.widget);
  },

  getEmulatorWindow : function()
  {
    return(this.emulatorWindow);
  },
  
  setEmulatorWindow : function(window)
  {
    this.emulatorWindow = window;
  },

  getFileName : function (path)
  {
    var newPath = path.substring(0, (path.indexOf("#") == -1) ? path.length : path.indexOf("#"));
    //this removes the query after the file name, if there is one
    path = path.substring(0, (path.indexOf("?") == -1) ? path.length : path.indexOf("?"));
    //this removes everything before the last slash in the path
    path = path.substring(path.lastIndexOf("/") + 1, path.length);
    
    return path;
  },

  logAction : function(message) 
  {
    var nowDate = new Date();
    this.emulatorLog = nowDate.getHours()+":"+nowDate.getMinutes()+":"+nowDate.getSeconds()+": "
      +message+"\n" + this.emulatorLog;

    if ( this.emulatorWindow && this.emulatorWindow.document && this.emulatorWindow.document.getElementById("jwe-log") )
    {
        this.emulatorWindow.document.getElementById("jwe-log").value = this.emulatorLog;
    }
  },

  getLog : function()
  {
    return(this.emulatorLog);
  },

  clearLog : function()
  {
    this.emulatorLog = "";
  },

  showLogViewer : function()
  {
    var ww = Components.classes["@mozilla.org/embedcomp/window-watcher;1"]
                   .getService(Components.interfaces.nsIWindowWatcher);
    ww.openWindow(ww.activeWindow, "chrome://transit-emulator/content/emulator/log.xul",
                        "logviewer", "chrome,centerscreen", null).focus();
  },

  showProfiles : function()
  {
    var ww = Components.classes["@mozilla.org/embedcomp/window-watcher;1"]
                   .getService(Components.interfaces.nsIWindowWatcher);
    ww.openWindow(ww.activeWindow, "chrome://transit-emulator/content/profiles/profiles.xul",
                        "profiles", "chrome,centerscreen", null).focus();
  },
  
  showControls : function()
  {
    var ww = Components.classes["@mozilla.org/embedcomp/window-watcher;1"]
                   .getService(Components.interfaces.nsIWindowWatcher);
    ww.openWindow(ww.activeWindow, "chrome://transit-emulator/content/emulator/controls.xul",
                        "jwe-controls", "chrome,centerscreen", null).focus();
  },
  
  getAPIExtensions : function()
  {
    return(this.profileService.getAPIExtensionsForDevice(this.deviceProfile.id));
  },
  
  getDeviceInfo : function()
  {
    return(this.profileService.getDeviceInfo(this.deviceProfile.id));
  },

  getAllDeviceProfiles : function()
  { 
    return(this.profileService.getAllDeviceProfiles());
  },

  getAccelerometer : function()
  { 
    return(this.profileService.getAccelerometer(this.deviceProfile.id));
  },

  getPreferenceForKey : function(key)
  {
    return(this.profileService.getWidgetPreferenceByKey(this.deviceProfile.id, this.widget.internalId, key));
  },

  setPreferenceForKey : function(value, key)
  {
    this.profileService.setWidgetPreferenceByKey(this.deviceProfile.id, this.widget.internalId, key, value);
  },

  getDeviceData : function()
  {
    return(this.profileService.getDeviceData(this.deviceProfile.id));
  },

  setRingtone : function(ringtoneFileUrl, addressBookItem)
  {
    var addrItem = this.profileService.getAddressBookItem(this.deviceProfile.pimProfileId, addressBookItem.addressBookItemId);

    addrItem.ringtoneFileUrl = ringtoneFileUrl;
    this.profileService.updateAddressBookItem(addrItem);
  },

  getAccountInfo : function()
  {
    return(this.profileService.getAccountInfo(this.deviceProfile.id));
  },

  getDeviceInfo : function()
  {
    return(this.profileService.getDeviceInfo(this.deviceProfile.id));
  },

  getRadioInfo : function()
  {
    return(this.profileService.getRadioInfo(this.deviceProfile.id));
  },

  getPowerInfo : function()
  {
    return(this.profileService.getPowerInfo(this.deviceProfile.id));
  },

  getPositionInfo : function()
  {
    return(this.profileService.getPositionInfo(this.deviceProfile.id));
  },

  getDataNetworkInfo : function()
  {
    return(this.profileService.getDataNetworkInfo(this.deviceProfile.id));
  },

  getDeviceState : function()
  {
    return(this.profileService.getDeviceState(this.deviceProfile.id));
  },

  getConfig : function()
  {
    return(this.profileService.getConfig(this.deviceProfile.id));
  },

  getMultimedia : function()
  {
    return(this.profileService.getMultimedia(this.deviceProfile.id));
  },

  getDefaultEmailAccount : function()
  {
    return(this.profileService.getDefaultEmailAccount(this.deviceProfile.messageProfileId));
  },

  getEmailAccounts : function()
  {
    return(this.profileService.getEmailAccounts(this.deviceProfile.messageProfileId));
  },

  setDefaultEmailAccount : function(accountId)
  {
    var account = 
    {
      id: accountId,
      msgProfileId: this.deviceProfile.messageProfileId
    };
    this.profileService.setDefaultEmailAccount(account);
  },
  
  getAllMessages : function()
  {
    return(this.profileService.getMessages(this.deviceProfile.messageProfileId));
  },
  
  getFileSystems : function()
  {
    return(this.profileService.getFileSystems(this.deviceProfile.id));
  },
  
  getCalendarItems : function()
  {
    return(this.profileService.getCalendarItems(this.deviceProfile.pimProfileId));
  },
  
  getEmulatedWidgets : function()
  {
    return(this.profileService.getEmulatedWidgets(this.deviceProfile.id));
  },

  invokeWOnFocus : function()
  {
    var onFocus = Components.classes["@jil.org/jilapi-widget;1"].getService(Components.interfaces.jilWidget).onFocus;

    if ( onFocus != null )
      onFocus.invoke();
  },

  invokeWOnMaximize : function()
  {
    var onMaximize = Components.classes["@jil.org/jilapi-widget;1"].getService(Components.interfaces.jilWidget).onMaximize;

    if ( onMaximize != null )
      onMaximize.invoke();
  },

  invokeWOnRestore : function()
  {
    var onRestore = Components.classes["@jil.org/jilapi-widget;1"].getService(Components.interfaces.jilWidget).onRestore;

    if ( onRestore != null )
      onRestore.invoke();
  },

  invokeWOnWakeup : function()
  {
    var onWakeup = Components.classes["@jil.org/jilapi-widget;1"].getService(Components.interfaces.jilWidget).onWakeup;

    if ( onWakeup != null )
      onWakeup.invoke();
  },

  invokeDOnFilesFound : function()
  {
    var onFilesFound = Components.classes["@jil.org/jilapi-device;1"].getService(Components.interfaces.jilDevice).onFilesFound;

    if ( onFilesFound != null )
      onFilesFound.invoke({});
  },
  
  invokeDSOnFlipEvent : function(flipClosed)
  {
    var onFlipEvent = Components.classes["@jil.org/jilapi-devicestateinfo;1"].getService(Components.interfaces.jilDeviceStateInfo).onFlipEvent;

    if ( onFlipEvent != null )
      onFlipEvent.invoke(flipClosed);
  },

  invokeDSOnPositionRetrieved : function(positionInfo)
  {
    var onPositionRetrieved = Components.classes["@jil.org/jilapi-devicestateinfo;1"].getService(Components.interfaces.jilDeviceStateInfo).onPositionRetrieved;

    var positionMethod = Components.classes["@jil.org/jilapi-devicestateinfo;1"].getService(Components.interfaces.jilDeviceStateInfo).positionMethod;

    if ( onPositionRetrieved != null )
      onPositionRetrieved.invoke(positionInfo, positionMethod);
  },

  invokeDSOnScreenChangeDimensions : function(newWidth, newHeight)
  {
    var onScreen = Components.classes["@jil.org/jilapi-devicestateinfo;1"].getService(Components.interfaces.jilDeviceStateInfo).onScreenChangeDimensions;

    if ( onScreen != null )
      onScreen.invoke(newWidth, newHeight);
  },

  invokePOnChargeLevelChange : function(newPercent)
  {
    var onChargeLevelChange = Components.classes["@jil.org/jilapi-powerinfo;1"].getService(Components.interfaces.jilPowerInfo).onChargeLevelChange;

    if ( onChargeLevelChange != null )
      onChargeLevelChange.invoke(newPercent);
  },

  invokePOnChargeStateChange : function(state)
  {
    var onChargeStateChange = Components.classes["@jil.org/jilapi-powerinfo;1"].getService(Components.interfaces.jilPowerInfo).onChargeStateChange;

    if ( onChargeStateChange != null )
      onChargeStateChange.invoke(state);
  },

  invokePOnLowBattery : function(newPercent)
  {
    var onLowBattery = Components.classes["@jil.org/jilapi-powerinfo;1"].getService(Components.interfaces.jilPowerInfo).onLowBattery;

    if ( onLowBattery != null )
      onLowBattery.invoke(newPercent);
  },

  invokeDNOnNetworkConnectionChanged : function(name)
  {
    var onNetworkConnectionChanged = Components.classes["@jil.org/jilapi-datanetworkinfo;1"].getService(Components.interfaces.jilDataNetworkInfo).onNetworkConnectionChanged;

    if ( onNetworkConnectionChanged != null )
      onNetworkConnectionChanged.invoke(name);
  },

  invokeROnSignalSourceChange : function(source, isRoaming)
  {
    var onSignalSourceChange = Components.classes["@jil.org/jilapi-radioinfo;1"].getService(Components.interfaces.jilRadioInfo).onSignalSourceChange;

    if ( onSignalSourceChange != null )
      onSignalSourceChange.invoke(source, isRoaming);
  },
  
  invokeMOnMessageArrived : function(messageId)
  {
    var message = this.getJILMessage(messageId);

    var onMessageArrived = Components.classes["@jil.org/jilapi-messaging;1"].getService(Components.interfaces.jilMessaging).onMessageArrived;

    if ( onMessageArrived != null )
      onMessageArrived.invoke(message);
  },
  
  invokeMOnMessageSendingFailure : function(messageId, error)
  {
    var message = this.getJILMessage(messageId);

    var onMessageSendingFailure = Components.classes["@jil.org/jilapi-messaging;1"].getService(Components.interfaces.jilMessaging).onMessageSendingFailure;

    if ( onMessageSendingFailure != null )
      onMessageSendingFailure.invoke(message, error);
  },
  
  getJILMessage : function(messageId)
  {
    var message = this.profileService.getMessage(this.deviceProfile.messageProfileId, messageId);
    
    // convert it to a JIL API Message
    var jilMessage = TransitCommon.convertMessageToJIL(message);
    
    return(jilMessage);
  },
  
  invokeAOnStateChange : function(state)
  {
    var onStateChange = Components.classes["@jil.org/jilapi-audioplayer;1"].getService(Components.interfaces.jilAudioPlayer).onStateChange;
  
    if ( onStateChange != null )
      onStateChange.invoke(state);
  },
  
  invokeVOnStateChange : function(state)
  {
    var onStateChange = Components.classes["@jil.org/jilapi-videoplayer;1"].getService(Components.interfaces.jilVideoPlayer).onStateChange;
    
    if ( onStateChange != null )
      onStateChange.invoke(state);
  },
  
  invokeCOnCameraCapture : function(filePath)
  {
    var onCameraCaptured = Components.classes["@jil.org/jilapi-camera;1"].getService(Components.interfaces.jilCamera).onCameraCaptured;
    
    if ( onCameraCaptured != null )
      onCameraCaptured.invoke(filePath);
  },
  
  invokePOnCalendarItemAlert : function(itemId)
  {
    var onCalendarItemAlert = Components.classes["@jil.org/jilapi-pim;1"].getService(Components.interfaces.jilPIM).onCalendarItemAlert;
    
    var calendarItem = this.profileService.getCalendarItem(itemId);

    var jilCalItem = TransitCommon.convertCalendarToJIL(calendarItem);
    
    if ( onCalendarItemAlert != null )
      onCalendarItemAlert.invoke(jilCalItem);
  },
  
  invokeTOnCallEvent : function(type, number)
  {
    var onCallEvent = Components.classes["@jil.org/jilapi-telephony;1"].getService(Components.interfaces.jilTelephony).onCallEvent;
        
    if ( onCallEvent != null )
      onCallEvent.invoke(type, number);
  },
  
  addAddressBookItem : function(contact)
  {
    contact.pimProfileId = this.deviceProfile.pimProfileId;
    this.profileService.addAddressBookItem(contact);
  },
  
  getAddressAvailableAttributes : function()
  {
    return(this.profileService.getAddressAvailableAttributes(this.deviceProfile.pimProfileId));
  },

  addAddressBookGroup : function(groupName)
  {
    var group =
    {
      pimProfileId : this.deviceProfile.pimProfileId,
      name : groupName,
    };
    this.profileService.addAddressBookGroup(group);
  },
  
  findAddressBookItems : function(comparison, start, end)
  {
    return(this.profileService.findAddressBookItems(this.deviceProfile.pimProfileId, comparison, start, end));
  },
  
  deleteAddressBookItem : function(itemId)
  {
    this.profileService.deleteAddressBookItem(this.deviceProfile.pimProfileId, itemId);
  },
  
  addAddressBookItemToGroup : function(itemId, groupName)
  {
    return(this.profileService.addAddressBookItemToGroup(this.deviceProfile.pimProfileId, itemId, groupName));
  },
  
  getGroupNamesForAddressBookItem : function(itemId)
  {
    return(this.profileService.getGroupNamesForAddressBookItem(itemId));
  },
  
  updateAddressBookItem : function(item)
  {
    item.pimProfileId = this.deviceProfile.pimProfileId;
    return(this.profileService.updateAddressBookItem(item));
  },
  
  getAddressBookItem : function(itemId)
  {
    return(this.profileService.getAddressBookItem(this.deviceProfile.pimProfileId, itemId));
  },
  
  getAddressBookItemsCount : function()
  {
    return(this.profileService.getAddressBookItemsCount(this.deviceProfile.pimProfileId));
  },
  
  getAddressBookGroupNames : function()
  {
    return(this.profileService.getAddressBookGroupNames(this.deviceProfile.pimProfileId));
  },
  
  getAddressBookGroupMembers : function(groupName)
  {
    return(this.profileService.getAddressBookGroupMembers(this.deviceProfile.pimProfileId, groupName));
  },
  
  addCalendarItem : function(item)
  {
    item.pimProfileId = this.deviceProfile.pimProfileId;
    this.profileService.addCalendarItem(item);
  },
  
  deleteAddressBookGroup : function(groupName)
  {
    this.profileService.deleteAddressBookGroupByName(this.deviceProfile.pimProfileId, groupName);
  },
  
  findCalendarItems : function(comparison, start, end)
  {
    return(this.profileService.findCalendarItems(this.deviceProfile.pimProfileId, comparison, start, end));
  },
  
  deleteCalendarItem : function(itemId)
  {
    return(this.profileService.deleteCalendarItem(this.deviceProfile.pimProfileId, itemId));
  },
  
  getCalendarItem : function(itemId)
  {
    return(this.profileService.getCalendarItem(itemId));
  },
  
  getCalendarItemsStartingBetween : function(startDate, endDate)
  {
    return(this.profileService.getCalendarItemsStartingBetween(this.deviceProfile.pimProfileId, startDate, endDate));
  },
  
  updateCalendarItem : function(item)
  {
    item.pimProfileId = this.deviceProfile.pimProfileId;
    this.profileService.updateCalendarItem(item);
  },
  
  findCallRecords : function(comparison, start, end)
  {
    return(this.profileService.findCallRecords(this.deviceProfile.id, comparison, start, end));
  },
  
  addCallRecord : function(callRecord)
  {
    callRecord.profileId = this.deviceProfile.id;
    this.profileService.addCallRecord(callRecord);
  },
  
  deleteAllCallRecords : function(type)
  {
    this.profileService.deleteAllCallRecords(this.deviceProfile.id, type);
  },
  
  deleteCallRecord : function(type, id)
  {
    this.profileService.deleteCallRecord(type, id);
  },
  
  getCallRecord : function(type, id)
  {
    return(this.profileService.getCallRecord(this.deviceProfile.id, id, type));
  },

  getCallRecordCount : function(type)
  {
    return(this.profileService.getCallRecordCount(this.deviceProfile.id, type));
  },
  
  getMessageFolder : function(folderName)
  {
    return(this.profileService.getMessageFolder(this.deviceProfile.messageProfileId, folderName));
  },
  
  updateMessage : function(message)
  {
    message.msgProfileId = this.deviceProfile.messageProfileId;
    this.profileService.updateMessage(message);
  },
  
  addMessage : function(message)
  {
    this.profileService.addMessage(message);
  },
  
  addMessageFolder : function(folderType, messageType, folderName)
  {
    var defAccountId = this.profileService.getMessagingProfile(this.deviceProfile.messageProfileId).defaultEmailId;
    var pFolder = 
    {
      type : folderType,
      name: folderName,
      emailAccountId : defAccountId,
      messageType : messageType,
    };
    this.profileService.addMessageFolder(pFolder);
  },
  
  deleteAllMessagesForFolder : function(messageType, pFolder)
  {
    this.profileService.deleteAllMessagesForFolder(messageType, pFolder);
  },
  
  deleteEmailAccount : function(accountId)
  {
    this.profileService.deleteEmailAccount(this.deviceProfile.messageProfileId, accountId);
  },
  
  deleteFolder : function(messageType, pFolder)
  {
    this.profileService.deleteMessageFolderWithType(pFolder.id, messageType);
  },
  
  deleteMessage : function(messageType, folderName, id)
  {
    this.profileService.deleteMessage(id);
  },
  
  findMessages : function(comparison, folderName, start, end)
  {
    return(this.profileService.findMessages(this.deviceProfile.messageProfileId, comparison, folderName, start, end));
  },
  
  getFolderNames : function(messageType)
  {
    return(this.profileService.getFolderNames(this.deviceProfile.messageProfileId, messageType));
  },
  
  getMessageFolders : function()
  {
    return(this.profileService.getMessageFolders(this.deviceProfile.messageProfileId));
  },

  getMessage : function(messageId)
  {
    return(this.profileService.getMessage(this.deviceProfile.messageProfileId, messageId));
  },
  
  getMessageByIndex : function(type, folder, index)
  {
    return(this.profileService.getMessageByIndex(type, folder, index));
  },
  
  getMessageCount : function(messageType, pFolder)
  {
    return(this.profileService.getMessageCount(messageType, pFolder.id));
  },
  
  moveMessage : function(messageId, pFolder)
  {
    return(this.profileService.moveMessage(messageId, pFolder.id));
  },
  
  // there's an opportunity to do some caching here if needed, look into it.
  getLocalFile : function(fileName)
  {
    TransitCommon.debug("Retrieving file details for file name "+fileName);
    // create a map with the virtual root as the key and local root as the value
    var fsys = this.getDeviceData().fileSystems;
    var fsysMap = new Array();
    for ( var i = 0; i < fsys.length; i++ )
      fsysMap[fsys[i].rootPath] = fsys[i].localPath;
    
    // find the filesystem this file is supposed to be on by finding the 
    // longest root path that is still a substring of the full file path
    var candidate = null;
    var score = 0;
    for ( var root in fsysMap )
    {
      TransitCommon.debug("Checking if fileName "+fileName+" is in root "+root);
      if ( (fileName.indexOf(root) > -1) && (root.length > score) )
      {
        score = root.length;
        candidate = root;
      }
    }
    
    TransitCommon.debug("Best candidate: "+candidate+", with score: "+score);
    
    // remove the root path from the full file path to get the relative path
    // for the local file
    var relativePath = fileName.substr(score, fileName.length);
    
    // the real path to the mapped drive 
    // if local path doesnt have a trailing slash and relative path doesn't have a trailing slash, add one
    var realPath = fsysMap[candidate]+relativePath;
    if ( (fsysMap[candidate].charAt(fsysMap[candidate].length-1) != "/") &&
         (relativePath.charAt(0) != "/")
       )
      realPath = fsysMap[candidate]+ TransitCommon.getFileSeparator() +relativePath;
    
    var localFile = Components.classes["@mozilla.org/file/local;1"].createInstance(Components.interfaces.nsILocalFile);  
    localFile.initWithPath(realPath);
    
    var jilFile = TransitCommon.convertToJILFile(localFile, fileName);

    var vFile = new VirtualFile();
    vFile.mozFile = localFile;
    vFile.jilFile = jilFile;
    vFile.localFullPath = realPath;
    vFile.jilFullPath = fileName;
    
    TransitCommon.debug("Final file details, local path: "+realPath+", virtual path: "+fileName);
    
    return(vFile);
  },

  getFileByLocalPath : function(fileName)
  {
    TransitCommon.debug("Retrieving file details for local file path "+fileName);
    // create a map with the local root as the key and virtual root as the value
    var fsys = this.getDeviceData().fileSystems;
    var fsysMap = new Array();
    for ( var i = 0; i < fsys.length; i++ )
      fsysMap[fsys[i].localPath] = fsys[i].rootPath;
    
    // find the filesystem this file is supposed to be on by finding the 
    // longest root path that is still a substring of the full file path
    var candidate = null;
    var score = 0;
    for ( var root in fsysMap )
    {
      TransitCommon.debug("Checking if fileName "+fileName+" is in root "+root);
      if ( (fileName.indexOf(root) > -1) && (root.length > score) )
      {
        score = root.length;
        candidate = root;
      }
    }
    
    TransitCommon.debug("Best candidate: "+candidate+", with score: "+score);
    
    // remove the root path from the full file path to get the relative path
    // for the local file
    var relativePath = fileName.substr(score, fileName.length);
    
    TransitCommon.debug("Relavite path: "+relativePath);
    
    // the real path to the mapped drive 
    // if local path doesnt have a trailing slash and relative path doesn't have a trailing slash, add one
    var virtualPath = fsysMap[candidate]+relativePath;
    if ( (fsysMap[candidate].charAt(fsysMap[candidate].length-1) != "/") &&
         (relativePath.charAt(0) != "/")
       )
      virtualPath = fsysMap[candidate]+ TransitCommon.getFileSeparator() +relativePath;
    
    // check for double slash at the beginning
    if ( virtualPath.indexOf("//") == 0 )
      virtualPath = virtualPath.substr(1, virtualPath.length);
    
    var localFile = Components.classes["@mozilla.org/file/local;1"].createInstance(Components.interfaces.nsILocalFile);  
    localFile.initWithPath(fileName);
    
    var jilFile = TransitCommon.convertToJILFile(localFile, fileName);

    var vFile = new VirtualFile();
    vFile.mozFile = localFile;
    vFile.jilFile = jilFile;
    vFile.localFullPath = fileName;
    vFile.jilFullPath = virtualPath;
    
    TransitCommon.debug("Final file details, local path: "+fileName+", virtual path: "+virtualPath);
    
    return(vFile);
  },
  
  copyFile : function(from, to, removeFromFile)
  {
    try
    {
      var fromFile = this.getLocalFile(from);
      var toFile = this.getLocalFile(to);
      
      var toName = "";
      var toPath = null;
      
      // see if the destination is a directory, if it is, dont specify the new file name, use the original name
      // if the jilfile of the destination is null, that means mozilla reported the file as not existing
      // a directory should exist, safe to assume this path is to a file with a new name
      if ( toFile.jilFile == null )
      {
        toName = to.substr(to.lastIndexOf("/")+1, to.length); 
        toPath = this.getLocalFile(to.substr(0, to.lastIndexOf("/")));
      }
      else
        toPath = this.getLocalFile(to);
      
      fromFile.mozFile.copyTo(toPath.mozFile, toName);
      
      // if the remove flag was set, delete the original (essentially performs a move)
      if ( removeFromFile )
        fromFile.mozFile.remove(false);
    }   
    catch(ex)
    {
      this.logAction("EmulatorRuntime.copyFile(): failed to copy file "+from+" to "+to+". Reason: "+ex.message);
      return(false);
    }
    return(true);
  },
  
  deleteFile : function(file)
  {
    try
    {
      var delFile = this.getLocalFile(file);

      if ( delFile.jilFile == null )
      {
        this.logAction("EmulatorRuntime.deleteFile(): file "+file+" does not exist, nothing to delete.");
        return(false);
      }
      
      // always set recursive to fals, JIL spec says not to delete a directory if it's not empty
      delFile.mozFile.remove(false);
    }   
    catch(ex)
    {
      if ( ex.name == "NS_ERROR_FILE_DIR_NOT_EMPTY" )
        this.logAction("EmulatorRuntime.deleteFile(): failed to delete non-empty directory "+file);
      else
        this.logAction("EmulatorRuntime.deleteFile(): failed to delete file or directory "+file+". Reason: "+ex.message);
      
      return(false);
    }
    return(true);
  },
  
  getDirectoryFileNames : function(source)
  {
    var sourceFile = this.getLocalFile(source);
    var fileList = new Array();

    if ( sourceFile.mozFile.isDirectory() )
    {
      var results = sourceFile.mozFile.directoryEntries;
      
      while ( results.hasMoreElements() )
        fileList.push(results.getNext().QueryInterface(Components.interfaces.nsIFile).leafName);
    }
    return(fileList);
  },
  
  getRecursiveFileList : function(mozDirectory, withPath)
  {
    try
    {
      var fileList = new Array();
      var fileEnum = mozDirectory.directoryEntries;
      
      while ( fileEnum.hasMoreElements() )
      {
        var aFile = fileEnum.getNext().QueryInterface(Components.interfaces.nsIFile);
       
        if ( aFile.isDirectory() )
           fileList = fileList.concat(this.getRecursiveFileList(aFile, withPath));
        else 
        {
          if ( withPath )
            fileList.push(aFile.path);
          else
            fileList.push(aFile.leafName);
        }
      }
    }
    catch(ex)
    {
      // probably a permissions issue, return an empty array
      this.logAction("EmulatorRuntime.getRecursiveFileList(): Error reading directory "+mozDirectory.leafName+", likely a permissions issue. Message: "+ex.message);
      return(new Array());
    }
    
    return(fileList);
  },
  
  getCrossSellUrl : function()
  {
    return(this.profileService.getDefaultValue("cross-sell-url"));
  },

  QueryInterface: function(aIID)
  {
    if (!aIID.equals(Components.interfaces.nsIClassInfo) &&
        !aIID.equals(Components.interfaces.nsISupports) ) 
      throw Components.results.NS_ERROR_NO_INTERFACE;
    return this;
  },

  // nsIClassInfo
  flags: Components.interfaces.nsIClassInfo.DOM_OBJECT,

  implementationLanguage: Components.interfaces.nsIProgrammingLanguage.JAVASCRIPT,

  classDescription: CLASS_NAME,
  classID: CLASS_ID,
  contractID: CONTRACT_ID,

  getInterfaces: function(aCount) {
    var aResult = [
      Components.interfaces.nsISupports
      , Components.interfaces.nsIClassInfo
    ];
    aCount.value = aResult.length;
    return aResult;
  },

  getHelperForLanguage: function(count) { return null; },
};

/***********************************************************/

var JILEmulatorRuntimeFactory = { //#
  createInstance: function (aOuter, aIID)
  {
    if (aOuter != null)
      throw Components.results.NS_ERROR_NO_AGGREGATION;
    
    if ( service == null )
      return(new JILEmulatorRuntime()).QueryInterface(aIID);
    else 
      return(service);
  }
};

/***********************************************************/

var JILEmulatorRuntimeModule = { //#
  registerSelf: function(aCompMgr, aFileSpec, aLocation, aType)
  {
    aCompMgr = aCompMgr.
        QueryInterface(Components.interfaces.nsIComponentRegistrar);
    aCompMgr.registerFactoryLocation(CLASS_ID, CLASS_NAME, 
        CONTRACT_ID, aFileSpec, aLocation, aType);

    var catman = Components.classes["@mozilla.org/categorymanager;1"].
              getService(Components.interfaces.nsICategoryManager);
    // Register Global Property, make object accessible to any window
    catman.addCategoryEntry(
      "JavaScript global property"
      , "JILEmulator"
      , CONTRACT_ID
      , false
      , true
    );
    catman = null;
    aCompMgr = null;
  },

  unregisterSelf: function(aCompMgr, aLocation, aType)
  {
    var catman = Components.classes["@mozilla.org/categorymanager;1"].
            getService(Components.interfaces.nsICategoryManager);
    catman.deleteCategoryEntry(
      "JavaScript global property"
      , "JILEmulator"
      , true
    );

    aCompMgr = aCompMgr.
        QueryInterface(Components.interfaces.nsIComponentRegistrar);
    aCompMgr.unregisterFactoryLocation(CLASS_ID, aLocation);    

    aCompMgr = null;        
    catman = null;    
  },
  
  getClassObject: function(aCompMgr, aCID, aIID)
  {
    if (!aIID.equals(Components.interfaces.nsIFactory))
      throw Components.results.NS_ERROR_NOT_IMPLEMENTED;

    if (aCID.equals(CLASS_ID))
      return JILEmulatorRuntimeFactory; //#

    throw Components.results.NS_ERROR_NO_INTERFACE;
  },

  canUnload: function(aCompMgr) { return true; }
};

/***********************************************************/

function NSGetModule(aCompMgr, aFileSpec) { return JILEmulatorRuntimeModule; } //#

function VirtualFile() {}
VirtualFile.prototype =
{
  mozFile : null,
  jilFile : null,
  localFullPath: null,
  jilFullPath : null,
};