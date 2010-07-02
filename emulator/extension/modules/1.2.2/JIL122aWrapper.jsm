var EXPORTED_SYMBOLS = ["Widget_122", "WidgetManager_122", "SecurityManager"];

var SecurityManager = 
{
  sessionConfirmed : new Array(),
  
  securityContext : null,
  
  showYesNoDialog : null,
  
  OP_ONE_SHOT : 0,
  
  OP_SESSION : 1, 
  
  OP_BLANKET : 1, // session and blanket are treated the same in the emulator, no point in emulating blanket
  
  OP_ALLOWED : 2,
  
  OP_DISALLOWED : 3,
  
  checkSecurity : function(apiKey, unidentifiedOp, identifiedOp, operatorOp, executeIfYes)
  {
    // this is an ugly function
    //dump("context: "+this.securityContext+", api: "+apiKey+"conf: "+SecurityManager.sessionConfirmed[apiKey]+", "+identifiedOp+", "+unidentifiedOp+", "+operatorOp);
    if ( this.securityContext == "identified" )
    {
      if ( identifiedOp == this.OP_ALLOWED )
      {
        executeIfYes();
        return;
      }
      if ( (identifiedOp == this.OP_SESSION) )
      {
        if ( !this.sessionConfirmed[apiKey] )
        {
          this.showPrompt(executeIfYes, apiKey);
          return;
        }
        else
        {
          executeIfYes();
          return;
        }
      }
      if ( (identifiedOp == this.OP_ONE_SHOT) )
      {
        this.showPrompt(executeIfYes, apiKey);
        return;
      }
    }
    
    else if ( this.securityContext == "unidentified" )
    {
      if ( identifiedOp == this.OP_DISALLOWED )
        return;
      if ( unidentifiedOp == this.OP_ALLOWED )
      {
        executeIfYes();
        return;
      }
      if ( (unidentifiedOp == this.OP_SESSION) )
      {
        if ( !this.sessionConfirmed[apiKey] )
        {
          this.showPrompt(executeIfYes, apiKey);
          return;
        }
        else
        {
          executeIfYes();
          return;
        }
      }
      if ( (unidentifiedOp == this.OP_ONE_SHOT) )
      {
        this.showPrompt(executeIfYes, apiKey);
        return;
      }
    }
    
    else if ( this.securityContext == "operator" )
    {
      if ( operatorOp == this.OP_ALLOWED )
      {
        executeIfYes();
        return;
      }
      if ( (operatorOp == this.OP_SESSION) )
      {
        if ( !this.sessionConfirmed[apiKey] )
        {
          this.showPrompt(executeIfYes, apiKey);
          return;
        }
        else
        {
          executeIfYes();
          return;
        }
      }
      if ( (operatorOp == this.OP_ONE_SHOT) )
      {
        this.showPrompt(executeIfYes, apiKey);
        return;
      }
    }
  },
  
  showPrompt : function(executeIfYes, apiKey)
  {
    this.showYesNoDialog("Priviledged Resource Access", "This application is attempting to use the following priviledged resource: \n\n"+apiKey+"\n\nWould you like to allow the application to proceed?", function()
    {
      SecurityManager.sessionConfirmed[apiKey] = true;
      executeIfYes();
    }, function(){});
  },
  
  reset : function()
  {
    this.sessionConfirmed = new Array();  
    this.securityContext = null;
  },
};

var _WidgetManager_122a = Components.classes["@jil.org/jilapi-widgetmanager;1"].getService(Components.interfaces.jilWidgetManager);
var _Device_122a = Components.classes["@jil.org/jilapi-device;1"].getService(Components.interfaces.jilDevice);
var _AccountInfo_122a = Components.classes["@jil.org/jilapi-accountinfo;1"].getService(Components.interfaces.jilAccountInfo);
var _ApplicationTypes_122a = Components.classes["@jil.org/jilapi-applicationtypes;1"].getService(Components.interfaces.jilApplicationTypes);
var _DataNetworkConnectionTypes_122a = Components.classes["@jil.org/jilapi-datanetworkconnectiontypes;1"].getService(Components.interfaces.jilDataNetworkConnectionTypes);
var _DataNetworkInfo_122a = Components.classes["@jil.org/jilapi-datanetworkinfo;1"].getService(Components.interfaces.jilDataNetworkInfo);
var _DeviceInfo_122a = Components.classes["@jil.org/jilapi-deviceinfo;1"].getService(Components.interfaces.jilDeviceInfo);
var _AccelerometerInfo_122a = Components.classes["@jil.org/jilapi-accelerometerinfo;1"].createInstance(Components.interfaces.jilAccelerometerInfo);
var _Config_122a = Components.classes["@jil.org/jilapi-config;1"].getService(Components.interfaces.jilConfig);
var _DeviceStateInfo_122a = Components.classes["@jil.org/jilapi-devicestateinfo;1"].getService(Components.interfaces.jilDeviceStateInfo);
var _PowerInfo_122a = Components.classes["@jil.org/jilapi-powerinfo;1"].getService(Components.interfaces.jilPowerInfo);
var _RadioSignalSourceTypes_122a = Components.classes["@jil.org/jilapi-radiosignalsourcetypes;1"].createInstance(Components.interfaces.jilRadioSignalSourceTypes);
var _RadioInfo_122a = Components.classes["@jil.org/jilapi-radioinfo;1"].getService(Components.interfaces.jilRadioInfo);
var _ExceptionTypes_122a = Components.classes["@jil.org/jilapi-exceptiontypes;1"].createInstance(Components.interfaces.jilExceptionTypes);
var _MessageFolderTypes_122a = Components.classes["@jil.org/jilapi-messagefoldertypes;1"].createInstance(Components.interfaces.jilMessageFolderTypes);
var _MessageTypes_122a = Components.classes["@jil.org/jilapi-messagetypes;1"].createInstance(Components.interfaces.jilMessageTypes);
var _Multimedia_122a = Components.classes["@jil.org/jilapi-multimedia;1"].getService(Components.interfaces.jilMultimedia);
var _EventRecurrenceTypes_122a = Components.classes["@jil.org/jilapi-eventrecurrencetypes;1"].createInstance(Components.interfaces.jilEventRecurrenceTypes);
var _CallRecordTypes_122a = Components.classes["@jil.org/jilapi-callrecordtypes;1"].createInstance(Components.interfaces.jilCallRecordTypes);
var _AudioPlayer_122a = Components.classes["@jil.org/jilapi-audioplayer;1"].getService(Components.interfaces.jilAudioPlayer);
var _Camera_122a = Components.classes["@jil.org/jilapi-camera;1"].getService(Components.interfaces.jilCamera);
var _Messaging_122a = Components.classes["@jil.org/jilapi-messaging;1"].getService(Components.interfaces.jilMessaging);
var _Telephony_122a = Components.classes["@jil.org/jilapi-telephony;1"].getService(Components.interfaces.jilTelephony);
var _VideoPlayer_122a = Components.classes["@jil.org/jilapi-videoplayer;1"].getService(Components.interfaces.jilVideoPlayer);
var _Widget_122a = Components.classes["@jil.org/jilapi-widget;1"].getService(Components.interfaces.jilWidget);
var _PIM_122a = Components.classes["@jil.org/jilapi-pim;1"].getService(Components.interfaces.jilPIM);

var WidgetManager = 
{
  checkWidgetInstallationStatus: function(widgetId, widgetName, widgetVersion)
  {
    return(_WidgetManager_122a.checkWidgetInstallationStatus(widgetId, widgetName, widgetVersion));
  },
};

var Widget = 
{
  Device : 
  {
    clipboardString : _Device_122a.clipboardString,
    widgetEngineName : _Device_122a.widgetEngineName,
    widgetEngineProvider : _Device_122a.widgetEngineProvider,
    widgetEngineVersion : _Device_122a.widgetEngineVersion,
    onFilesFound : null,
    
    copyFile : function(originalFile, destinationFullName)
    {
      SecurityManager.checkSecurity("Copy File (Device.copyFile)", SecurityManager.OP_ONE_SHOT, SecurityManager.OP_BLANKET, SecurityManager.OP_ALLOWED, function()
      {
        return(_Device_122a.copyFile(originalFile, destinationFullName));
      });
    },
    
    deleteFile : function(destinationFullName)
    {
      SecurityManager.checkSecurity("Delete File (Device.deleteFile)", SecurityManager.OP_ONE_SHOT, SecurityManager.OP_BLANKET, SecurityManager.OP_ALLOWED, function()
      {
        return(_Device_122a.deleteFile(destinationFullName));
      });
    },
    
    findFiles : function(matchFile, startInx, endInx)
    {
      SecurityManager.checkSecurity("File Search (Device.findFiles)", SecurityManager.OP_SESSION, SecurityManager.OP_BLANKET, SecurityManager.OP_ALLOWED, function()
      {
        _Device_122a.findFiles(matchFile.updateJIL(), startInx, endInx);
      });
    },
    
    getAvailableApplications : function()
    {
      SecurityManager.checkSecurity("Get Available Applications (Device.getAvailableApplications)", SecurityManager.OP_BLANKET, SecurityManager.OP_ALLOWED, SecurityManager.OP_ALLOWED, function()
      {
        return(_Device_122a.getAvailableApplications());
      });
    },
    
    getDirectoryFileNames : function(sourceDirectory)
    {
      SecurityManager.checkSecurity("List Files in a Folder (Device.getDirectoryFileNames)", SecurityManager.OP_BLANKET, SecurityManager.OP_BLANKET, SecurityManager.OP_ALLOWED, function()
      {
        return(_Device_122a.getDirectoryFileNames(sourceDirectory));
      });
    },
    
    getFile : function(fullName)
    {
      SecurityManager.checkSecurity("Access a File (Device.getFile)", SecurityManager.OP_ONE_SHOT, SecurityManager.OP_BLANKET, SecurityManager.OP_ALLOWED, function()
      {
        var jilFile = _Device_122a.getFile(fullName);
        
        if ( jilFile == null )
        {
          var exc = new Widget.Exception();
          exc.message = "Invalid file name";
          exc.type = Widget.ExceptionTypes.INVALID_PARAMETER;
          throw(exc);
        }
        
        var wrappedFile = new Widget.Device.File();
        wrappedFile.setJIL(jilFile);
        
        return(wrappedFile);
      });
    },
    
    getFileSystemRoots : function()
    {
      SecurityManager.checkSecurity("List File Systems (Device.getFileSystemRoots)", SecurityManager.OP_BLANKET, SecurityManager.OP_ALLOWED, SecurityManager.OP_ALLOWED, function()
      {
        return(_Device_122a.getFileSystemRoots());
      });
    },
    
    getFileSystemSize : function(fileSystemRoot)
    {
      return(_Device_122a.getFileSystemSize(fileSystemRoot));
    },
    
    launchApplication : function(application, startParameter)
    {
      SecurityManager.checkSecurity("Launch Application (Device.launchApplication)", SecurityManager.OP_ONE_SHOT, SecurityManager.OP_BLANKET, SecurityManager.OP_ALLOWED, function()
      {
        _Device_122a.launchApplication(application, startParameter);
      });
    },
    
    moveFile : function(originalFile, destinationFullName)
    {
      SecurityManager.checkSecurity("Move File (Device.moveFile)", SecurityManager.OP_ONE_SHOT, SecurityManager.OP_BLANKET, SecurityManager.OP_ALLOWED, function()
      {
        return(_Device_122a.moveFile(originalFile, destinationFullName));
      });
    },
    
    setRingtone : function(ringtoneFileUrl, addressBookItem)
    {
      if ( (ringtoneFileUrl == null) || (ringtoneFileUrl.constructor != String) )
        Widget.throwIPException("Invalid argument type for ringtoneFileUrl in Device.setRingtone");

      if ( (addressBookItem == null) || !(addressBookItem instanceof Widget.PIM.AddressBookItem) )
        Widget.throwIPException("Invalid argument type for addressBookItem in Device.setRingtone");
    
      SecurityManager.checkSecurity("Set Contact Ringtone (Device.setRingtone)", SecurityManager.OP_ONE_SHOT, SecurityManager.OP_BLANKET, SecurityManager.OP_ALLOWED, function()
      {
        _Device_122a.setRingtone(ringtoneFileUrl, addressBookItem.updateJIL());
      });
    },
    
    vibrate : function(durationSeconds)
    {
      if ( (durationSeconds == null) || !(durationSeconds > -1) )
        Widget.throwIPException("Invalid argument type for durationSeconds in Device.vibrate");
      
      _Device_122a.vibrate(durationSeconds);
    },

    AccountInfo : 
    {
      phoneMSISDN : _AccountInfo_122a.phoneMSISDN,
      phoneOperatorName : _AccountInfo_122a.phoneOperatorName,
      phoneUserUniqueId : _AccountInfo_122a.phoneUserUniqueId,
      userAccountBalance : _AccountInfo_122a.userAccountBalance,
      userSubscriptionType : _AccountInfo_122a.userSubscriptionType,
    },
    
    ApplicationTypes : 
    {
      ALARM : _ApplicationTypes_122a.ALARM,
      BROWSER : _ApplicationTypes_122a.BROWSER,
      CALCULATOR : _ApplicationTypes_122a.CALCULATOR,
      CALENDAR : _ApplicationTypes_122a.CALENDAR,
      CAMERA : _ApplicationTypes_122a.CAMERA,
      CONTACTS : _ApplicationTypes_122a.CONTACTS,
      FILES : _ApplicationTypes_122a.FILES,
      GAMES : _ApplicationTypes_122a.GAMES,
      MAIL : _ApplicationTypes_122a.MAIL,
      MEDIAPLAYER : _ApplicationTypes_122a.MEDIAPLAYER,
      MESSAGING : _ApplicationTypes_122a.MESSAGING,
      PHONECALL : _ApplicationTypes_122a.PHONECALL,
      PICTURES : _ApplicationTypes_122a.PICTURES,
      PROG_MANAGER : _ApplicationTypes_122a.PROG_MANAGER,
      SETTINGS : _ApplicationTypes_122a.SETTINGS,
      TASKS : _ApplicationTypes_122a.TASKS,
      WIDGET_MANAGER : _ApplicationTypes_122a.WIDGET_MANAGER,
    },
    
    DataNetworkInfo : 
    {
      DataNetworkConnectionTypes : 
      {
        BLUETOOTH : _DataNetworkConnectionTypes_122a.BLUETOOTH,
        EDGE : _DataNetworkConnectionTypes_122a.EDGE,
        EVDO : _DataNetworkConnectionTypes_122a.EVDO,
        GPRS : _DataNetworkConnectionTypes_122a.GPRS,
        IRDA : _DataNetworkConnectionTypes_122a.IRDA,
        LTE : _DataNetworkConnectionTypes_122a.LTE,
        ONEXRTT : _DataNetworkConnectionTypes_122a.ONEXRTT,
        WIFI : _DataNetworkConnectionTypes_122a.WIFI,
      },
      
      isDataNetworkConnected : _DataNetworkInfo_122a.isDataNetworkConnected,
      networkConnectionType : _DataNetworkInfo_122a.getNetworkConnectionTypes(),
      
      onNetworkConnectionChanged : null,
      
      getNetworkConnectionName : function(networkConnecionType)
      {
        if ( ! this.testDataNetworkConnectionTypes(networkConnecionType) )
          Widget.throwIPException("Invalid argument type for networkConnecionType in DataNetworkInfo.getNetworkConnectionName");      
        
        return(_DataNetworkInfo_122a.getNetworkConnectionName(networkConnecionType));
      },
      
      testDataNetworkConnectionTypes : function(type)
      {
        if ( (type != Widget.Device.DataNetworkInfo.DataNetworkConnectionTypes.BLUETOOTH ) &&
             (type != Widget.Device.DataNetworkInfo.DataNetworkConnectionTypes.EDGE ) &&
             (type != Widget.Device.DataNetworkInfo.DataNetworkConnectionTypes.EVDO ) &&
             (type != Widget.Device.DataNetworkInfo.DataNetworkConnectionTypes.GPRS ) &&
             (type != Widget.Device.DataNetworkInfo.DataNetworkConnectionTypes.IRDA ) &&
             (type != Widget.Device.DataNetworkInfo.DataNetworkConnectionTypes.LTE ) &&
             (type != Widget.Device.DataNetworkInfo.DataNetworkConnectionTypes.ONEXRTT ) &&
             (type != Widget.Device.DataNetworkInfo.DataNetworkConnectionTypes.WIFI )
          )
          return(false);
        else
          return(true);
      },
    },
    
    DeviceInfo : 
    {
      ownerInfo : _DeviceInfo_122a.getOwnerInfo(),
      
      phoneColorDepthDefault : _DeviceInfo_122a.phoneColorDepthDefault, 
      phoneFirmware : _DeviceInfo_122a.phoneFirmware, 
      phoneManufacturer : _DeviceInfo_122a.phoneManufacturer, 
      phoneModel : _DeviceInfo_122a.phoneModel, 
      phoneOS : _DeviceInfo_122a.phoneOS, 
      phoneScreenHeightDefault : _DeviceInfo_122a.phoneScreenHeightDefault, 
      phoneScreenWidthDefault : _DeviceInfo_122a.phoneScreenWidthDefault, 
      phoneSoftware : _DeviceInfo_122a.phoneSoftware, 
      totalMemory : _DeviceInfo_122a.totalMemory, 
    },
    
    DeviceStateInfo : 
    {
      AccelerometerInfo : 
      {
        xAxis : _AccelerometerInfo_122a.xAxis,
        yAxis : _AccelerometerInfo_122a.yAxis,
        zAxis : _AccelerometerInfo_122a.zAxis,
      },
      
      Config : 
      {
        msgRingtoneVolume : _Config_122a.msgRingtoneVolume,
        ringtoneVolume : _Config_122a.ringtoneVolume,
        vibrationSetting : _Config_122a.vibrationSetting,

        setAsWallpaper : function(wallpaperFileUrl)
        {
          if ( (wallpaperFileUrl == null) || (wallpaperFileUrl.constructor != String) )
            Widget.throwIPException("Invalid argument type for wallpaperFileUrl in Config.setAsWallpaper");
          
          SecurityManager.checkSecurity("Set Wallpaper (Config.setAsWallpaper)", SecurityManager.OP_ONE_SHOT, SecurityManager.OP_BLANKET, SecurityManager.OP_BLANKET, function()
          {
            _Config_122a.setAsWallpaper(wallpaperFileUrl);
          });
        },
        
        setDefaultRingtone : function(ringtoneFileUrl)
        {
          if ( (ringtoneFileUrl == null) || (ringtoneFileUrl.constructor != String) )
            Widget.throwIPException("Invalid argument type for ringtoneFileUrl in Config.setDefaultRingtone");

          SecurityManager.checkSecurity("Set Default Ringtone (Config.setDefaultRingtone)", SecurityManager.OP_ONE_SHOT, SecurityManager.OP_BLANKET, SecurityManager.OP_BLANKET, function()
          {
            _Config_122a.setDefaultRingtone(ringtoneFileUrl);
          });
        },
      },
      
      onFlipEvent : null,
      onPositionRetrieved : null,
      onScreenChangeDimensions : null,

      audioPath : _DeviceStateInfo_122a.audioPath,
      availableMemory : _DeviceStateInfo_122a.availableMemory,
      backLightOn : _DeviceStateInfo_122a.backLightOn,
      keypadLightOn : _DeviceStateInfo_122a.keypadLightOn,
      language : _DeviceStateInfo_122a.language,
      processorUtilizationPercent : _DeviceStateInfo_122a.processorUtilizationPercent,
      positionMethod : _DeviceStateInfo_122a.positionMethod,

      requestPositionInfo : function(method)
      {
        if ( ! this.testPositionInfoMethods(method) )
          Widget.throwIPException("Invalid argument type for method in DeviceStateInfo.requestPositionInfo");
        
        SecurityManager.checkSecurity("Determine Location (DeviceStateInfo.requestPositionInfo)", SecurityManager.OP_ONE_SHOT, SecurityManager.OP_SESSION, SecurityManager.OP_ALLOWED, function()
        {
          _DeviceStateInfo_122a.requestPositionInfo(method);
        });
      },
      
      testPositionInfoMethods : function(type)
      {
        if ( (type != "cellid" ) &&
             (type != "gps" ) &&
             (type != "agps" )
          )
          return(false);
        else
          return(true);
      },
    },
    
    File : function() //object
    {
      this._jilFile = null;
      
      this.createDate = null;
      this.fileName = null;
      this.filePath = null;
      this.fileSize = null;
      this.isDirectory = null;
      this.lastModifyDate = null;
      
      this.setJIL = function(jilFile)
      {
        this.createDate = jilFile.createDate;
        this.fileName = jilFile.fileName;
        this.filePath = jilFile.filePath;
        this.fileSize = jilFile.fileSize;
        this.isDirectory = jilFile.isDirectory;
        this.lastModifyDate = jilFile.lastModifyDate;
        this._jil = jilFile;
      };
      
      this.updateJIL = function()
      {
        if ( this._jilFile == null )
          this._jilFile = _Device_122a.getNewFile();

        this._jilFile.createDate = this.createDate;
        this._jilFile.fileName = this.fileName;
        this._jilFile.filePath = this.filePath;
        this._jilFile.fileSize = this.fileSize;
        this._jilFile.isDirectory = this.isDirectory;
        this._jilFile.lastModifyDate = this.lastModifyDate;
        return(this._jilFile);
      };
    },
    
    PositionInfo : function() //object
    {
      this._jilPositionInfo = null;
      
      this.accuracy = null;
      this.altitude = null;
      this.altitudeAccuracy = null;
      this.cellID = null;
      this.latitude = null;
      this.longitude = null;
      this.timeStamp = null;
      
      this.setJIL = function(jilPositionInfo)
      {
        this.accuracy = jilPositionInfo.accuracy;
        this.altitude = jilPositionInfo.altitude;
        this.altitudeAccuracy = jilPositionInfo.altitudeAccuracy;
        this.cellID = jilPositionInfo.cellID;
        this.latitude = jilPositionInfo.latitude;
        this.longitude = jilPositionInfo.longitude;
        this.timeStamp = jilPositionInfo.timeStamp;
        this._jilPositionInfo = jilPositionInfo;
      };
      
      this.updateJIL = function()
      {
        this._jilPositionInfo.accuracy = this.accuracy;
        this._jilPositionInfo.altitude = this.altitude;
        this._jilPositionInfo.altitudeAccuracy = this.altitudeAccuracy;
        this._jilPositionInfo.cellID = this.cellID;
        this._jilPositionInfo.latitude = this.latitude;
        this._jilPositionInfo.longitude = this.longitude;
        this._jilPositionInfo.timeStamp = this.timeStamp;
        return(this._jilPositionInfo);
      };
    },
    
    PowerInfo : 
    {
      isCharging : _PowerInfo_122a.isCharging,
      percentRemaining : _PowerInfo_122a.percentRemaining,

      onChargeLevelChange : null,
      onChargeStateChange : null,
      onLowBattery : null,
    },
    
    RadioInfo : 
    {
      RadioSignalSourceTypes :
      {
        CDMA : _RadioSignalSourceTypes_122a.CDMA,
        GSM : _RadioSignalSourceTypes_122a.GSM,
        LTE : _RadioSignalSourceTypes_122a.LTE,
        TDSCDMA : _RadioSignalSourceTypes_122a.TDSCDMA,
        WCDMA : _RadioSignalSourceTypes_122a.WCDMA,
      },
      
      isRadioEnabled : _RadioInfo_122a.isRadioEnabled,
      isRoaming : _RadioInfo_122a.isRoaming,
      radioSignalSource : _RadioInfo_122a.radioSignalSource,
      radioSignalStrengthPercent : _RadioInfo_122a.radioSignalStrengthPercent,

      onSignalSourceChange : null,
    },
  },
  
  Exception : function() //object
  {
    this._jilException = null;
    
    this.message = null;
    this.type = null;
    
    this.setJIL = function(jilException)
    {
      this.message = jilException.message;
      this.type = jilException.type;
      this._jilException = jilException;
    };
    
    this.updateJIL = function()
    {
      this._jilException.message = this.message;
      this._jilException.type = this.type;
      return(this._jilException);
    };
  },
  
  ExceptionTypes :
  {
    INVALID_PARAMETER : _ExceptionTypes_122a.INVALID_PARAMETER,
    SECURITY : _ExceptionTypes_122a.SECURITY,
    UNKNOWN : _ExceptionTypes_122a.UNKNOWN,
    UNSUPPORTED : _ExceptionTypes_122a.UNSUPPORTED,
  },
  
  Messaging :
  {
    Account : function()
    {
      this.accountId = null;
      this.accountName = null;
    },
    
    MessageQuantities : function() //object
    {
      this._jilMsgQuantities = null;
      
      this.totalMessageCnt = null;
      this.totalMessageReadCnt = null;
      this.totalMessageUnreadCnt = null;
      
      this.setJIL = function(jilMsgQuantities)
      {
        this.totalMessageCnt = jilMsgQuantities.totalMessageCnt;
        this.totalMessageReadCnt = jilMsgQuantities.totalMessageReadCnt;
        this.totalMessageUnreadCnt = jilMsgQuantities.totalMessageUnreadCnt;
        this._jilMsgQuantities = jilMsgQuantities;
      };
      
      this.updateJIL = function()
      {
        this._jilMsgQuantities.totalMessageCnt = this.totalMessageCnt;
        this._jilMsgQuantities.totalMessageReadCnt = this.totalMessageReadCnt;
        this._jilMsgQuantities.totalMessageUnreadCnt = this.totalMessageUnreadCnt;
        return(this._jilMsgQuantities);
      };
    },
    
    MessageFolderTypes :
    {
      DRAFTS : _MessageFolderTypes_122a.DRAFTS,
      INBOX : _MessageFolderTypes_122a.INBOX,
      OUTBOX : _MessageFolderTypes_122a.OUTBOX,
      SENTBOX : _MessageFolderTypes_122a.SENTBOX,
    },
    
    Message : function() //object
    {
      this._jilMessage = null;
      
      this.attachments = null;
      this.bccAddress = null;
      this.body = null;
      this.callbackNumber = null;
      this.ccAddress = null;
      this.destinationAddress = null;
      this.isRead = null;
      this.messageId = null;
      this.messagePriority = null;
      this.messageType = null;
      this.sourceAddress = null;
      this.subject = null;
      this.time = null;
      this.validityPeriodHours = null;
      
      this.updateAddress = function(type, address)
      {
        if ( type == "cc" )
          this.ccAddress = this._jilMessage.getCcAddress();
        else if ( type == "bcc" )
          this.bccAddress = this._jilMessage.getBccAddress();
        else if ( type == "destination" )
          this.destinationAddress = this._jilMessage.getDestinationAddress();
      };

      this.addAddress = function(type, address)
      {
        this.updateJIL();
        this._jilMessage.addAddress(type, address);
        this.updateAddress(type);
      };
      
      this.addAttachment = function(fileFullName)
      {
        this.updateJIL();
        this._jilMessage.addAttachment(fileFullName);
        this.attachments = this._jilMessage.getAttachments();
      };
      
      this.deleteAddress = function(type, address)
      {
        SecurityManager.checkSecurity("Remove Message Recipient (Message.deleteAddress)", SecurityManager.OP_DISALLOWED, SecurityManager.OP_ONE_SHOT, SecurityManager.OP_ALLOWED, function()
        {
          this.updateJIL();
          this._jilMessage.deleteAddress(type, address);
          this.updateAddress(type);
        });
      };
      
      this.deleteAttachment = function(attachment)
      {
        SecurityManager.checkSecurity("Remove Message Attachment (Message.deleteAttachment)", SecurityManager.OP_DISALLOWED, SecurityManager.OP_ONE_SHOT, SecurityManager.OP_ALLOWED, function()
        {
          this.updateJIL();
          this._jilMessage.deleteAttachment(attachment.updateJIL());
          this.attachments = this._jilMessage().getAttachments();
        });
      };
      
      this.saveAttachment = function(fileFullName, attachment)
      {
        SecurityManager.checkSecurity("Save Message Attachment (Message.saveAttachment)", SecurityManager.OP_ONE_SHOT, SecurityManager.OP_SESSION, SecurityManager.OP_BLANKET, function()
        {
          this.updateJIL();
          this._jilMessage.saveAttachment(fileFullName, attachment.updateJIL());
          this.attachments = this._jilMessage.getAttachments();
        });
      };
      
      this.update = function()
      {
        this.updateJIL().update();
      };
      
      this.setJIL = function(jilMessage)
      {
        this.attachments = jilMessage.getAttachments();
        this.bccAddress = jilMessage.getBccAddress();
        this.ccAddress = jilMessage.getCcAddress();
        this.destinationAddress = jilMessage.getDestinationAddress();
        
        this.body = jilMessage.body;
        this.callbackNumber = jilMessage.callbackNumber;
        this.isRead = jilMessage.isRead;
        this.messageId = jilMessage.messageId;
        this.messagePriority = jilMessage.messagePriority;
        this.messageType = jilMessage.messageType;
        this.sourceAddress = jilMessage.sourceAddress;
        this.subject = jilMessage.subject;
        
        this.time = new Date();
        this.time.setTime(jilMessage.time);
        
        this.validityPeriodHours = jilMessage.validityPeriodHours;
        this._jilMessage = jilMessage;
      };
      
      this.updateJIL = function()
      {               
        if ( this._jilMessage == null )
          this._jilMessage = _Messaging_122a.getNewMessage();
        
        if ( this.attachments != null )
          this._jilMessage.setAttachments(this.attachments.length, this.attachments);
        if ( this.bccAddress != null )
          this._jilMessage.setBccAddress(this.bccAddress.length, this.bccAddress);
        if ( this.ccAddress != null )
          this._jilMessage.setCcAddress(this.ccAddress.length, this.ccAddress);
        
        if ( this.destinationAddress != null )
          this._jilMessage.setDestinationAddress(this.destinationAddress.length, this.destinationAddress);
        
        this._jilMessage.body = this.body;
        this._jilMessage.callbackNumber = this.callbackNumber;        
        this._jilMessage.isRead = this.isRead;
        this._jilMessage.messageId = this.messageId;
        this._jilMessage.messagePriority = this.messagePriority;
        this._jilMessage.messageType = this.messageType;
        this._jilMessage.sourceAddress = this.sourceAddress;
        this._jilMessage.subject = this.subject;
        
        if ( this.time != null )
          this._jilMessage.time = this.time.getTime();
        
        this._jilMessage.validityPeriodHours = this.validityPeriodHours;
        return(this._jilMessage);
      };
    },
    
    Attachment : function() //object
    {
      this._jilAttachment = null;
      
      this.fileName = null;
      this.MIMEType = null;
      this.size = null;
      
      this.setJIL = function(jilAttachment)
      {
        this.fileName = jilAttachment.fileName;
        this.MIMEType = jilAttachment.MIMEType;
        this.size = jilAttachment.size;
        this._jilAttachment = jilAttachment;
      };
      
      this.updateJIL = function()
      {
        if ( this._jilAttachment == null )
          this._jilAttachment = _Messaging_122a.getNewAttachment();
        
        this._jilAttachment.fileName = this.fileName;
        this._jilAttachment.MIMEType = this.MIMEType;
        this._jilAttachment.size = this.size;
        return(this._jilAttachment);
      };
    },
    
    MessageTypes : 
    {
      EmailMessage : _MessageTypes_122a.EmailMessage,
      MMSMessage : _MessageTypes_122a.MMSMessage,
      SMSMessage : _MessageTypes_122a.SMSMessage,
    },

    onMessageArrived : null,
    onMessageSendingFailure : null,
    onMessagesFound : null,

    copyMessageToFolder : function(msg, destinationFolder)
    {
      SecurityManager.checkSecurity("Copy Message to Folder (Messaging.copyMessageToFolder)", SecurityManager.OP_SESSION, SecurityManager.OP_BLANKET, SecurityManager.OP_ALLOWED, function()
      {
        _Messaging_122a.copyMessageToFolder(msg.updateJIL(), destinationFolder);
      });
    },
    
    createFolder : function(messageType, folderName)
    {
      SecurityManager.checkSecurity("Create Message Folder (Messaging.createFolder)", SecurityManager.OP_ONE_SHOT, SecurityManager.OP_BLANKET, SecurityManager.OP_ALLOWED, function()
      {
        _Messaging_122a.createFolder(messageType, folderName);
      });
    },
    
    createMessage : function(messageType)
    {
      var jilMessage = _Messaging_122a.createMessage(messageType);
      var wrappedMessage = new Widget.Messaging.Message();
      wrappedMessage.setJIL(jilMessage);
      return(wrappedMessage);
    },
    
    deleteAllMessages : function(messageType, folderName)
    {
      SecurityManager.checkSecurity("Delete All Messages in Folder (Messaging.deleteAllMessages)", SecurityManager.OP_DISALLOWED, SecurityManager.OP_ONE_SHOT, SecurityManager.OP_ALLOWED, function()
      {
        _Messaging_122a.deleteAllMessages(messageType, folderName);
      });
    },
    
    deleteEmailAccount : function(accountId)
    {
      SecurityManager.checkSecurity("Delete Email Account (Messaging.deleteEmailAccount)", SecurityManager.OP_DISALLOWED, SecurityManager.OP_ONE_SHOT, SecurityManager.OP_ALLOWED, function()
      {
        _Messaging_122a.deleteEmailAccount(accountId);
      });
    },
    
    deleteFolder : function(messageType, folderName)
    {
      SecurityManager.checkSecurity("Delete Message Folder (Messaging.deleteFolder)", SecurityManager.OP_DISALLOWED, SecurityManager.OP_ONE_SHOT, SecurityManager.OP_ALLOWED, function()
      {
        _Messaging_122a.deleteFolder(messageType, folderName);
      });
    },
    
    deleteMessage : function(messageType, folderName, id)
    {
      SecurityManager.checkSecurity("Delete Message (Messaging.deleteMessage)", SecurityManager.OP_DISALLOWED, SecurityManager.OP_ONE_SHOT, SecurityManager.OP_ALLOWED, function()
      {
        _Messaging_122a.deleteMessage(messageType, folderName, id);
      });
    },
    
    findMessages : function(comparisonMsg, folderName, startInx, endInx)
    {
      SecurityManager.checkSecurity("Search Messages (Messaging.findMessages)", SecurityManager.OP_SESSION, SecurityManager.OP_BLANKET, SecurityManager.OP_ALLOWED, function()
      {
        _Messaging_122a.findMessages(comparisonMsg.updateJIL(), folderName, startInx, endInx);
      });
    },
    
    getCurrentEmailAccount : function()
    {
      SecurityManager.checkSecurity("Access Current Email Account (Messaging.getCurrentEmailAccount)", SecurityManager.OP_SESSION, SecurityManager.OP_BLANKET, SecurityManager.OP_ALLOWED, function()
      {
        var jilAccount = _Messaging_122a.getCurrentEmailAccount();
        var wrappedAccount = new Widget.Messaging.Account();
        wrappedAccount.setJIL(jilAccount);
        return(wrappedAccount);
      });
    },
    
    getEmailAccounts : function()
    {
      SecurityManager.checkSecurity("Access All Email Accounts (Messaging.getEmailAccounts)", SecurityManager.OP_SESSION, SecurityManager.OP_BLANKET, SecurityManager.OP_ALLOWED, function()
      {
        return(_Messaging_122a.getEmailAccounts());
      });
    },
    
    getFolderNames : function(messageType)
    {
      SecurityManager.checkSecurity("Access All Message Folders (Messaging.getFolderNames)", SecurityManager.OP_SESSION, SecurityManager.OP_BLANKET, SecurityManager.OP_ALLOWED, function()
      {
        return(_Messaging_122a.getFolderNames(messageType));
      });
    },
    
    getMessage : function(messageType, folderName, index)
    {
      SecurityManager.checkSecurity("Access Message (Messaging.getMessage)", SecurityManager.OP_SESSION, SecurityManager.OP_BLANKET, SecurityManager.OP_ALLOWED, function()
      {
        var jilMessage = _Messaging_122a.getMessage(messageType, folderName, index);
        var wrappedMessage = new Widget.Messaging.Message();
        wrappedMessage.setJIL(jilMessage);
        return(wrappedMessage);
      });
    },
    
    getMessageQuantities : function(messageType, folderName)
    {
      var jilQuantities = _Messaging_122a.getMessageQuantities(messageType, folderName);
      var wrappedQuantities = new Widget.Messaging.MessageQuantities();
      wrappedQuantities.setJIL(jilQuantities);      
      return(wrappedQuantities);
    },
    
    moveMessageToFolder : function(msg, destinationFolder)
    {
      SecurityManager.checkSecurity("Move Message to Folder (Messaging.moveMessageToFolder)", SecurityManager.OP_SESSION, SecurityManager.OP_BLANKET, SecurityManager.OP_ALLOWED, function()
      {
        _Messaging_122a.moveMessageToFolder(msg.updateJIL(), destinationFolder);
      });
    },
    
    sendMessage : function(msg)
    {
      SecurityManager.checkSecurity("Send Message (Messaging.sendMessage)", SecurityManager.OP_ONE_SHOT, SecurityManager.OP_BLANKET, SecurityManager.OP_ALLOWED, function()
      {
        _Messaging_122a.sendMessage(msg.updateJIL());
      });
    },
    
    setCurrentEmailAccount : function(accountId)
    {
      SecurityManager.checkSecurity("Set Current Email Account (Messaging.setCurrentEmailAccount)", SecurityManager.OP_SESSION, SecurityManager.OP_ALLOWED, SecurityManager.OP_ALLOWED, function()
      {
        _Messaging_122a.setCurrentEmailAccount(accountId);
      });
    },
  },
  
  Multimedia : 
  {
    Camera : 
    {
      onCameraCaptured : null,

      captureImage : function(fileName, lowRes)
      {
        SecurityManager.checkSecurity("Capture Camera Image (Camera.captureImage)", SecurityManager.OP_ONE_SHOT, SecurityManager.OP_BLANKET, SecurityManager.OP_ALLOWED, function()
        {
          return(_Camera_122a.captureImage(fileName, lowRes));
        });
      },
      
      startVideoCapture : function(fileName, lowRes, maxDurationSeconds, showDefaultControls)
      {
        SecurityManager.checkSecurity("Capture Camera Video (Camera.startVideoCapture)", SecurityManager.OP_ONE_SHOT, SecurityManager.OP_BLANKET, SecurityManager.OP_ALLOWED, function()
        {
          return(_Camera_122a.startVideoCapture(fileName, lowRes, maxDurationSeconds, showDefaultControls));
        });
      },
      
      setWindow : function(domObj)
      {
        _Camera_122a.setWindow(domObj);
      },
      
      stopVideoCapture : function()
      {
        _Camera_122a.stopVideoCapture();
      },
    },
    
    AudioPlayer :
    {
      onStateChange : null,
      
      open : function(fileUrl)
      {
        _AudioPlayer_122a.open(fileUrl);
      },
      
      pause : function()
      {
        _AudioPlayer_122a.pause();
      },
      
      play : function(repeatTimes)
      {
        _AudioPlayer_122a.play(repeatTimes);
      },
      
      resume : function()
      {
        _AudioPlayer_122a.resume();
      },
      
      stop : function()
      {
        _AudioPlayer_122a.stop();
      },
    },
    
    VideoPlayer :
    {
      onStateChange : null, 
      
      source : null,
      
      video : null,
      
      open : function(fileUrl)
      {
        _VideoPlayer_122a.open(fileUrl);
      },
      
      pause : function()
      {
        _VideoPlayer_122a.pause();
      },
      
      play : function(repeatTimes)
      {
        _VideoPlayer_122a.play(repeatTimes);
      },
      
      resume : function()
      {
        _VideoPlayer_122a.resume();
      },
      
      stop : function()
      {
        _VideoPlayer_122a.stop();
      },
      
      setWindow : function(domObj)
      {
        _VideoPlayer_122a.setWindow(domObj, document.createElement("video"));
      },
    },

    isAudioPlaying : _Multimedia_122a.isAudioPlaying,
    isVideoPlaying : _Multimedia_122a.isVideoPlaying,

    getVolume : function()
    {
      return(_Multimedia_122a.getVolume());
    },
    
    stopAll : function()
    {
      _Multimedia_122a.stopAll();
    },
  },
  
  PIM :
  {
    onAddressBookItemsFound : null,
    onCalendarItemAlert : null,
    onCalendarItemsFound : null,
    onVCardExportingFinish : null,

    addAddressBookItem : function(contact)
    {
      SecurityManager.checkSecurity("Add Contact (PIM.addAddressBookItem)", SecurityManager.OP_ONE_SHOT, SecurityManager.OP_BLANKET, SecurityManager.OP_ALLOWED, function()
      {
        _PIM_122a.addAddressBookItem(contact.updateJIL());
      });
    },
    
    addCalendarItem : function(item)
    {
      SecurityManager.checkSecurity("Add Calendar Entry (PIM.addCalendarItem)", SecurityManager.OP_ONE_SHOT, SecurityManager.OP_BLANKET, SecurityManager.OP_ALLOWED, function()
      {
        _PIM_122a.addCalendarItem(item.updateJIL());
      });
    },
    
    createAddressBookGroup : function(groupName)
    {
      SecurityManager.checkSecurity("Add Contact Group (PIM.createAddressBookGroup)", SecurityManager.OP_ONE_SHOT, SecurityManager.OP_BLANKET, SecurityManager.OP_ALLOWED, function()
      {
        _PIM_122a.createAddressBookGroup(groupName);
      });
    },
    
    createAddressBookItem : function()
    {
      var item = new Widget.PIM.AddressBookItem();
      item.setJIL(_PIM_122a.createAddressBookItem());
      return(item);
    },
    
    deleteAddressBookGroup : function(groupName)
    {
      SecurityManager.checkSecurity("Remove Contact Group (PIM.deleteAddressBookGroup)", SecurityManager.OP_DISALLOWED, SecurityManager.OP_ONE_SHOT, SecurityManager.OP_ALLOWED, function()
      {
        _PIM_122a.deleteAddressBookGroup(groupName);
      });
    },
    
    deleteAddressBookItem : function(id)
    {
      SecurityManager.checkSecurity("Remove Contact (PIM.deleteAddressBookItem)", SecurityManager.OP_DISALLOWED, SecurityManager.OP_ONE_SHOT, SecurityManager.OP_ALLOWED, function()
      {
        _PIM_122a.deleteAddressBookItem(id);
      });
    },
    
    deleteCalendarItem : function(calendarId)
    {
      SecurityManager.checkSecurity("Remove Calendar Entry (PIM.deleteCalendarItem)", SecurityManager.OP_DISALLOWED, SecurityManager.OP_ONE_SHOT, SecurityManager.OP_ALLOWED, function()
      {
        _PIM_122a.deleteCalendarItem(calendarId);
      });
    },
    
    exportAsVCard : function(addressBookItems)
    {
      SecurityManager.checkSecurity("Export Contact VCard (PIM.exportAsVCard)", SecurityManager.OP_ONE_SHOT, SecurityManager.OP_BLANKET, SecurityManager.OP_ALLOWED, function()
      {
        _PIM_122a.exportAsVCard(addressBookItems, addressBookItems.length);
      });
    },
    
    findAddressBookItems : function(comparisonContact, startInx, endInx)
    {
      SecurityManager.checkSecurity("Search Contacts (PIM.findAddressBookItems)", SecurityManager.OP_SESSION, SecurityManager.OP_BLANKET, SecurityManager.OP_ALLOWED, function()
      {
        var jilContact = null;
        if ( comparisonContact instanceof Widget.PIM.AddressBookItem )
          jilContact = comparisonContact.updateJIL();
        else
          jilContact = comparisonContact;
          
          _PIM_122a.findAddressBookItems(jilContact, startInx, endInx);
      });
    },
    
    findCalendarItems : function(itemToMatch, startInx, endInx)
    {
      SecurityManager.checkSecurity("Search Calendar Entries (PIM.findCalendarItems)", SecurityManager.OP_SESSION, SecurityManager.OP_BLANKET, SecurityManager.OP_ALLOWED, function()
      {
        _PIM_122a.findCalendarItems(itemToMatch.updateJIL(), startInx, endInx);
      });
    },
    
    getAddressBookGroupMembers : function(groupName)
    {
      SecurityManager.checkSecurity("Add Contact Group Members (PIM.getAddressBookGroupMembers)", SecurityManager.OP_ONE_SHOT, SecurityManager.OP_BLANKET, SecurityManager.OP_ALLOWED, function()
      {
        return(_PIM_122a.getAddressBookGroupMembers(groupName));
      });
    },
    
    getAddressBookItem : function(id)
    {
      SecurityManager.checkSecurity("Get Contact (PIM.getAddressBookItem)", SecurityManager.OP_SESSION, SecurityManager.OP_BLANKET, SecurityManager.OP_ALLOWED, function()
      {
        var jilItem = _PIM_122a.getAddressBookItem(id);
        var wrappedItem = new Widget.PIM.AddressBookItem();
        wrappedItem.setJIL(jilItem);
        return(wrappedItem);
      });
    },
    
    getAddressBookItemsCount : function()
    {
      SecurityManager.checkSecurity("Count Contacts (PIM.getAddressBookItemsCount)", SecurityManager.OP_SESSION, SecurityManager.OP_BLANKET, SecurityManager.OP_ALLOWED, function()
      {
        return(_PIM_122a.getAddressBookItemsCount());
      });
    },
    
    getAvailableAddressGroupNames : function()
    {
      SecurityManager.checkSecurity("Get Contact Groups (PIM.getAvailableAddressGroupNames)", SecurityManager.OP_SESSION, SecurityManager.OP_BLANKET, SecurityManager.OP_ALLOWED, function()
      {
        return(_PIM_122a.getAvailableAddressGroupNames());
      });
    },
    
    getCalendarItem : function(calendarId)
    {
      SecurityManager.checkSecurity("Get Calendar Entry (PIM.getCalendarItem)", SecurityManager.OP_SESSION, SecurityManager.OP_BLANKET, SecurityManager.OP_ALLOWED, function()
      {
        var jilItem = _PIM_122a.getCalendarItem(calendarId);
        var wrappedItem = new Widget.PIM.CalendarItem();
        wrappedItem.setJIL(jilItem);
        return(wrappedItem);
      });
    },
    
    getCalendarItems : function(startTime, endTime)
    {
      SecurityManager.checkSecurity("Get Calendar Entries (PIM.getCalendarItems)", SecurityManager.OP_SESSION, SecurityManager.OP_BLANKET, SecurityManager.OP_ALLOWED, function()
      {
        var jilArray = _PIM_122a.getCalendarItems(startTime, endTime);
        var wrappedArray = new Array();
        for ( var i = 0; i < jilArray.length; i++ )
        {
          var wrappedItem = new Widget.PIM.CalendarItem();
          wrappedItem.setJIL(jilArray[i]);
          wrappedArray.push(wrappedItem);
        }
        return(wrappedArray);
      });
    },
    
    AddressBookItem : function() //object
    {      
      this._jilAddrItem = null;
      
      this.address = null;
      this.addressBookItemId = null;
      this.company = null;
      this.eMail = null;
      this.fullName = null;
      this.homePhone = null;
      this.mobilePhone = null;
      this.title = null;
      this.workPhone = null;
      this.ringtone = null;

      this.getAddressGroupNames = function()
      {
        this.updateJIL();
        return(this._jilAddrItem.getAddressGroupNames());
      };
      
      this.getAttributeValue = function(attr)
      {
        this.updateJIL();
        return(this._jilAddrItem.getAttributeValue(attr));
      };
      
      this.getAvailableAttributes = function()
      {
        this.updateJIL();
        return(this._jilAddrItem.getAvailableAttributes());
      };
      
      this.setAddressGroupNames = function(groups)
      {
        this.updateJIL();
        this._jilAddrItem.setAddressGroupNames(groups, groups.length);
      };
      
      this.setAttributeValue = function(attr, value)
      {
        this.updateJIL();
        this._jilAddrItem.setAttributeValue(attr, value);
      };
      
      this.update = function()     
      {
        SecurityManager.checkSecurity("Update Contact (AddressBookItem.update)", SecurityManager.OP_ONE_SHOT, SecurityManager.OP_BLANKET, SecurityManager.OP_ALLOWED, function()
        {
          this.updateJIL();
          this._jilAddrItem.update();
        });
      };
      
      this.setJIL = function(jilAddrItem)
      {
        this.address = jilAddrItem.address;
        this.addressBookItemId = jilAddrItem.addressBookItemId;
        this.company = jilAddrItem.company;
        this.eMail = jilAddrItem.eMail;
        this.fullName = jilAddrItem.fullName;
        this.homePhone = jilAddrItem.homePhone;
        this.mobilePhone = jilAddrItem.mobilePhone;
        this.title = jilAddrItem.title;
        this.workPhone = jilAddrItem.workPhone;
        this.ringtone = jilAddrItem.ringtone;
        this._jilAddrItem = jilAddrItem;
      };
      
      this.updateJIL = function()
      {
        if ( this._jilAddrItem == null )
          this._jilAddrItem = _PIM_122a.createAddressBookItem();
        
        this._jilAddrItem.address = this.address;
        this._jilAddrItem.addressBookItemId = this.addressBookItemId;
        this._jilAddrItem.company = this.company;
        this._jilAddrItem.eMail = this.eMail;
        this._jilAddrItem.fullName = this.fullName;
        this._jilAddrItem.homePhone = this.homePhone;
        this._jilAddrItem.mobilePhone = this.mobilePhone;
        this._jilAddrItem.title = this.title;
        this._jilAddrItem.workPhone = this.workPhone;
        this._jilAddrItem.ringtone = this.ringtone;
        return(this._jilAddrItem);
      };
    },
    
    EventRecurrenceTypes :
    {
      DAILY : _EventRecurrenceTypes_122a.DAILY,
      EVERY_WEEKDAY : _EventRecurrenceTypes_122a.EVERY_WEEKDAY,
      MONTHLY_ON_DAY : _EventRecurrenceTypes_122a.MONTHLY_ON_DAY,
      MONTHLY_ON_DAY_COUNT : _EventRecurrenceTypes_122a.MONTHLY_ON_DAY_COUNT,
      NOT_REPEAT : _EventRecurrenceTypes_122a.NOT_REPEAT,
      WEEKLY_ON_DAY : _EventRecurrenceTypes_122a.WEEKLY_ON_DAY,
      YEARLY : _EventRecurrenceTypes_122a.YEARLY,
    },
    
    CalendarItem : function() //object
    {
      this._jilCalItem = null;
      
      this.alarmDate = null;
      this.alarmed = null;
      this.calendarItemId = null;
      this.eventEndTime = null;
      this.eventName = null;
      this.eventNotes = null;
      this.eventRecurrence = null;
      this.eventStartTime = null;

      this.update = function()
      {
        SecurityManager.checkSecurity("Update Calendar Entry (CalendarItem.update)", SecurityManager.OP_ONE_SHOT, SecurityManager.OP_BLANKET, SecurityManager.OP_ALLOWED, function()
        {
          this.updateJIL();
          this._jilCalItem.update();
        });
      };
      
      this.setJIL = function(jilCalItem)
      {
        this.alarmDate = jilCalItem.alarmDate;
        this.alarmed = jilCalItem.alarmed;
        this.calendarItemId = jilCalItem.calendarItemId;
        this.eventEndTime = jilCalItem.eventEndTime;
        this.eventName = jilCalItem.eventName;
        this.eventNotes = jilCalItem.eventNotes;
        this.eventRecurrence = jilCalItem.eventRecurrence;
        this.eventStartTime = jilCalItem.eventStartTime;
        this._jilCalItem = jilCalItem;
      };
      
      this.updateJIL = function()
      {
        if ( this._jilCalItem == null )
          this._jilCalItem = _PIM_122a.getNewCalendarItem();
          
        this._jilCalItem.alarmDate = this.alarmDate;
        this._jilCalItem.alarmed = this.alarmed;
        this._jilCalItem.calendarItemId = this.calendarItemId;
        this._jilCalItem.eventEndTime = this.eventEndTime;
        this._jilCalItem.eventName = this.eventName;
        this._jilCalItem.eventNotes = this.eventNotes;
        this._jilCalItem.eventRecurrence = this.eventRecurrence;
        this._jilCalItem.eventStartTime = this.eventStartTime;
        return(this._jilCalItem);
      };
    },
  },
  
  Telephony :
  {
    CallRecordTypes : 
    {
      MISSED : _CallRecordTypes_122a.MISSED,
      OUTGOING : _CallRecordTypes_122a.OUTGOING,
      RECEIVED : _CallRecordTypes_122a.RECEIVED,
    },
    
    CallRecord : function() //object
    {
      this._jilCallRecord = null;
      
      this.callRecordAddress = null;
      this.callRecordId = null;
      this.callRecordName = null;
      this.callRecordType = null;
      this.durationSeconds = null;
      this.startTime = null;
      
      this.setJIL = function(jilCallRecord)
      {
        this.callRecordAddress = jilCallRecord.callRecordAddress;
        this.callRecordId = jilCallRecord.callRecordId;
        this.callRecordName = jilCallRecord.callRecordName;
        this.callRecordType = jilCallRecord.callRecordType;
        this.durationSeconds = jilCallRecord.durationSeconds;
        this.startTime = jilCallRecord.startTime;
        this._jilCallRecord = jilCallRecord;
      };
      
      this.updateJIL = function()
      {
        if ( this._jilCallRecord == null )
          this._jilCallRecord = _Telephony_122a.createCallRecord();

        this._jilCallRecord.callRecordAddress = this.callRecordAddress;
        this._jilCallRecord.callRecordId = this.callRecordId;
        this._jilCallRecord.callRecordName = this.callRecordName;
        this._jilCallRecord.callRecordType = this.callRecordType;
        this._jilCallRecord.durationSeconds = this.durationSeconds;
        this._jilCallRecord.startTime = this.startTime;
        return(this._jilCallRecord);
      };
    },

    onCallEvent : null,
    onCallRecordsFound : null,

    deleteAllCallRecords : function(callRecordType)
    {
      SecurityManager.checkSecurity("Remove Call Records (Telephony.deleteAllCallRecords)", SecurityManager.OP_DISALLOWED, SecurityManager.OP_ONE_SHOT, SecurityManager.OP_ALLOWED, function()
      {
        _Telephony_122a.deleteAllCallRecords(callRecordType);
      });
    },
    
    deleteCallRecord : function(callRecordType, id)
    {
      SecurityManager.checkSecurity("Remove Call Record (Telephony.deleteCallRecord)", SecurityManager.OP_DISALLOWED, SecurityManager.OP_ONE_SHOT, SecurityManager.OP_ALLOWED, function()
      {
        _Telephony_122a.deleteCallRecord(callRecordType, id);
      });
    },
    
    findCallRecords : function(comparisonRecord, startInx, endInx)
    {
      if ( !(comparisonRecord instanceof Widget.Telephony.CallRecord) )
        Widget.throwIPException("Invalid argument type for comparisonRecord in Telephony.findCallRecords");
      if ( !(startInx > -1) )
        Widget.throwIPException("Invalid argument type for startIdx in Telephony.findCallRecords");
      if ( !(endInx > -1) )
        Widget.throwIPException("Invalid argument type for endIdx in Telephony.findCallRecords");
      
      SecurityManager.checkSecurity("Search Call Records (Telephony.findCallRecords)", SecurityManager.OP_SESSION, SecurityManager.OP_BLANKET, SecurityManager.OP_ALLOWED, function()
      {
        _Telephony_122a.findCallRecords(comparisonRecord.updateJIL(), startInx, endInx);
      });
    },
    
    getCallRecord : function(callRecordType, id)
    {
      if ( ! this.testCallRecordType(callRecordType) )
        Widget.throwIPException("Invalid argument type for callRecordType in Telephony.getCallRecord");
      
      if ( id == null )
        Widget.throwIPException("Invalid argument type for id in Telephony.getCallRecord");
      
      SecurityManager.checkSecurity("Search Call Records (Telephony.findCallRecords)", SecurityManager.OP_ONE_SHOT, SecurityManager.OP_BLANKET, SecurityManager.OP_ALLOWED, function()
      {
        var jilRecord = _Telephony_122a.getCallRecord(callRecordType, id);
        var wrappedRecord = new Widget.Telephony.CallRecord();
        wrappedRecord.setJIL(jilRecord);
        return(wrappedRecord);
      });
    },
    
    getCallRecordCnt : function(callRecordType)
    {
      if ( ! this.testCallRecordType(callRecordType) )
        Widget.throwIPException("Invalid argument type for callRecordType in Telephony.getCallRecordCnt");
      
      SecurityManager.checkSecurity("Count Call Records (Telephony.getCallRecordCnt)", SecurityManager.OP_SESSION, SecurityManager.OP_ALLOWED, SecurityManager.OP_ALLOWED, function()
      {
        return(_Telephony_122a.getCallRecordCnt(callRecordType));
      });
    },
    
    initiateVoiceCall : function(phoneNumber)
    {
      if ( !(phoneNumber > -1) )
        Widget.throwIPException("Invalid argument type for phoneNumber in Telephony.initiateVoiceCall");
      
      var phoneNumberPattern = /^\(?(\d{3})\)?[- ]?(\d{3})[- ]?(\d{4})$/;
      if ( !(phoneNumberPattern.test(phoneNumber)) )
        Widget.throwIPException("Invalid argument type (format) for phoneNumber in Telephony.initiateVoiceCall");
        
      SecurityManager.checkSecurity("Initiate Phone Call (Telephony.initiateVoiceCall)", SecurityManager.OP_ONE_SHOT, SecurityManager.OP_ONE_SHOT, SecurityManager.OP_ALLOWED, function()
      {
        _Telephony_122a.initiateVoiceCall(phoneNumber);
      });
    },
    
    createCallRecord : function()
    {
      return(_Telephony_122a.createCallRecord());
    },   
    
    testCallRecordType : function(type)
    {
      if ( (type != Widget.Telephony.CallRecordTypes.MISSED ) &&
           (type != Widget.Telephony.CallRecordTypes.OUTGOING ) &&
           (type != Widget.Telephony.CallRecordTypes.RECEIVED )
         )
        return(false);
      else
        return(true);
    },
  },
  
  // events //

  onFocus : null,
  onMaximize : null,
  onRestore : null,
  onWakeup : null,
  
  // regular methods //
  
  openURL : function(url) 
  {
    if ( (url == null) || (url.constructor != String) )
      Widget.throwIPException("Invalid argument type for url in Widget.openUrl");
    
    _Widget_122a.openURL(url);
  },
  
  preferenceForKey : function(key) 
  {
    return(_Widget_122a.preferenceForKey(key));
  },
  
  setPreferenceForKey : function(preference, key) 
  {
    _Widget_122a.setPreferenceForKey(preference, key);
  },
  
  throwIPException : function(message)
  {
    var exc = new Widget.Exception();
    exc.message = message;
    exc.type = Widget.ExceptionTypes.INVALID_PARAMETER;
    throw(exc);
  },
  
  init : function()
  {
    Widget.watch("onFocus", function(id, oldValue, newValue) {
      _Widget_122a.onFocus = newValue; });
      
    Widget.watch("onMaximize", function(id, oldValue, newValue) {
      _Widget_122a.onMaximize = newValue; });
      
    Widget.watch("onRestore", function(id, oldValue, newValue) {
      _Widget_122a.onRestore = newValue; });
      
    Widget.watch("onWakeup", function(id, oldValue, newValue) {
      _Widget_122a.onWakeup = newValue; });
      
    Widget.Device.watch("onFilesFound", function(id, oldValue, newValue) {
      _Device_122a.onFilesFound = newValue; });

    Widget.Device.DataNetworkInfo.watch("onNetworkConnectionChanged", function(id, oldValue, newValue) {
      _DataNetworkInfo_122a.onNetworkConnectionChanged = newValue; });
      
    Widget.Device.DeviceStateInfo.watch("onFlipEvent", function(id, oldValue, newValue) {
      _DeviceStateInfo_122a.onFlipEvent = newValue; });
      
    Widget.Device.DeviceStateInfo.watch("onPositionRetrieved", function(id, oldValue, newValue) 
    {
      _DeviceStateInfo_122a.onPositionRetrieved = function(position, method)
      {
        var jilPosition = new Widget.Device.PositionInfo();

        if ( position.failure == true )
          jilPosition = {};
        else
          jilPosition.setJIL(position);
      
        newValue(jilPosition, method);
      };
    });
    
    Widget.Device.DeviceStateInfo.watch("onScreenChangeDimensions", function(id, oldValue, newValue) {
      _DeviceStateInfo_122a.onScreenChangeDimensions = newValue; });
      
    Widget.Device.PowerInfo.watch("onChargeLevelChange", function(id, oldValue, newValue) {
      _PowerInfo_122a.onChargeLevelChange = newValue; });
      
    Widget.Device.PowerInfo.watch("onChargeStateChange", function(id, oldValue, newValue) {
      _PowerInfo_122a.onChargeStateChange = newValue; });
      
    Widget.Device.PowerInfo.watch("onLowBattery", function(id, oldValue, newValue) {
      _PowerInfo_122a.onLowBattery = newValue; });
      
    Widget.Device.RadioInfo.watch("onSignalSourceChange", function(id, oldValue, newValue) {
      _RadioInfo_122a.onSignalSourceChange = newValue; });
      
    Widget.Messaging.watch("onMessageArrived", function(id, oldValue, newValue) {
      _Messaging_122a.onMessageArrived = newValue; });
      
    Widget.Messaging.watch("onMessageSendingFailure", function(id, oldValue, newValue) {
      _Messaging_122a.onMessageSendingFailure = newValue; });
      
    Widget.Messaging.watch("onMessagesFound", function(id, oldValue, newValue) {
      _Messaging_122a.onMessagesFound = newValue; });
      
    Widget.Multimedia.watch("onCameraCaptured", function(id, oldValue, newValue) {
      _Multimedia_122a.onCameraCaptured = newValue; });
      
    Widget.Multimedia.AudioPlayer.watch("onStateChange", function(id, oldValue, newValue) {
      _AudioPlayer_122a.onStateChange = newValue; });
      
    Widget.Multimedia.VideoPlayer.watch("onStateChange", function(id, oldValue, newValue) {
      _VideoPlayer_122a.onStateChange = newValue; });
      
    Widget.PIM.watch("onAddressBookItemsFound", function(id, oldValue, newValue) {
      _PIM_122a.onAddressBookItemsFound = newValue; });
      
    Widget.PIM.watch("onCalendarItemAlert", function(id, oldValue, newValue) {
      _PIM_122a.onCalendarItemAlert = newValue; });
      
    Widget.PIM.watch("onCalendarItemsFound", function(id, oldValue, newValue) {
      _PIM_122a.onCalendarItemsFound = newValue; });
      
    Widget.PIM.watch("onVCardExportingFinish", function(id, oldValue, newValue) {
      _PIM_122a.onVCardExportingFinish = newValue; });
      
    Widget.Telephony.watch("onCallEvent", function(id, oldValue, newValue) {
      _Telephony_122a.onCallEvent = newValue; });
      
    Widget.Telephony.watch("onCallRecordsFound", function(id, oldValue, newValue) {
      _Telephony_122a.onCallRecordsFound = newValue; });
  },
};

Widget.init();

// another wrapper :(
var Widget_122 = Widget;
var WidgetManager_122 = WidgetManager;


