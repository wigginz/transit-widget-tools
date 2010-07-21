var EXPORTED_SYMBOLS = ["Widget", "WidgetManager", "SecurityManager"];

Components.utils.import("resource://transit-emulator/TransitCommon.jsm");

Components.utils.import("resource://transit-emulator/1.2.2/Multimedia.jsm");
Components.utils.import("resource://transit-emulator/1.2.2/Device.jsm");
Components.utils.import("resource://transit-emulator/1.2.2/PositionInfo.jsm");
Components.utils.import("resource://transit-emulator/1.2.2/File.jsm");
Components.utils.import("resource://transit-emulator/1.2.2/Exception.jsm");
Components.utils.import("resource://transit-emulator/1.2.2/Messaging.jsm");
Components.utils.import("resource://transit-emulator/1.2.2/Account.jsm");
Components.utils.import("resource://transit-emulator/1.2.2/MessageQuantities.jsm");
Components.utils.import("resource://transit-emulator/1.2.2/Message.jsm");
Components.utils.import("resource://transit-emulator/1.2.2/Attachment.jsm");
Components.utils.import("resource://transit-emulator/1.2.2/AddressBookItem.jsm");
Components.utils.import("resource://transit-emulator/1.2.2/CalendarItem.jsm");
Components.utils.import("resource://transit-emulator/1.2.2/PIM.jsm");
Components.utils.import("resource://transit-emulator/1.2.2/Telephony.jsm");
Components.utils.import("resource://transit-emulator/1.2.2/CallRecord.jsm");

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
  Device : new Device(),
  
  Exception : function() {},
  
  ExceptionTypes : new ExceptionTypes(),
  
  Messaging : new Messaging(),
  
  Multimedia : new Multimedia(),
  
  PIM : new PIM(),
  
  Telephony : new Telephony(),
  
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
    this.test1234 = new Date().getTime();
    
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
      Widget.Device.DeviceStateInfo.onPositionRetrieved = newValue;
      _DeviceStateInfo_122a.onPositionRetrieved = function(position, method)
      {
        var jilPosition = new Widget.Device.PositionInfo();
        if ( position.failure == true )
          jilPosition = {};
        else
          jilPosition.setJIL(position);
      
        newValue(jilPosition, method);
      };
      TransitCommon.debug(Widget.Device.DeviceStateInfo.onPositionRetrieved);
    });
    
    Widget.Device.DeviceStateInfo.watch("onScreenChangeDimensions", function(id, oldValue, newValue) {
      _DeviceStateInfo_122a.onScreenChangeDimensions = newValue; });
      
    Widget.Device.PowerInfo.watch("onChargeLevelChange", function(id, oldValue, newValue) {
      _PowerInfo_122a.onChargeLevelChange = newValue; });
      
    Widget.Device.PowerInfo.watch("onChargeStateChange", function(id, oldValue, newValue) {
      Widget.test1234 = newValue;
      _PowerInfo_122a.onChargeStateChange = newValue; 
      Widget.Device.PowerInfo.onChargeStateChange = _PowerInfo_122a.onChargeStateChange;
    });
      
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
      
    Widget.PIM.watch("onAddressBookItemsFound", function(id, oldValue, newValue) 
    {
      _PIM_122a.onAddressBookItemsFound = function(results)
      {
        // convert to wrapped class
        var jilResults = new Array();
        for ( var i = 0; i < results.length; i++ )
        {
          var jilContact = new Widget.PIM.AddressBookItem();
          jilContact.setJIL(results[i]);
          jilResults.push(jilContact);
        }
        newValue(jilResults);
      };
    });
      
    Widget.PIM.watch("onCalendarItemAlert", function(id, oldValue, newValue) {
      _PIM_122a.onCalendarItemAlert = newValue; });
      
    Widget.PIM.watch("onCalendarItemsFound", function(id, oldValue, newValue) 
    {      
      _PIM_122a.onCalendarItemsFound = function(results)
      {
        // convert to wrapped class
        var jilResults = new Array();
        for ( var i = 0; i < results.length; i++ )
        {
          var jilItem = new Widget.PIM.CalendarItem();
          jilItem.setJIL(results[i]);
          jilResults.push(jilItem);
        }
        newValue(jilResults);
      };
    });
      
    Widget.PIM.watch("onVCardExportingFinish", function(id, oldValue, newValue) {
      _PIM_122a.onVCardExportingFinish = newValue; });
      
    Widget.Telephony.watch("onCallEvent", function(id, oldValue, newValue) {
      _Telephony_122a.onCallEvent = newValue; });
      
    Widget.Telephony.watch("onCallRecordsFound", function(id, oldValue, newValue) {
      _Telephony_122a.onCallRecordsFound = newValue; });

    _Multimedia_122a.monitor = function(currentAudioPlaying, currentVideoPlaying)
    {
      Widget.Multimedia.isAudioPlaying = currentAudioPlaying;
      Widget.Multimedia.isVideoPlaying = currentVideoPlaying;
    };
  },
};

Widget.Device.File.prototype = new File();

Widget.Device.Exception.prototype = new Exception();

Widget.Device.PositionInfo.prototype = new PositionInfo();

Widget.Messaging.prototype.Account = new Account();

Widget.Messaging.prototype.MessageQuantities = new MessageQuantities();

Widget.Messaging.prototype.Message = new Message();

Widget.Messaging.prototype.Attachment = new Attachment();

Widget.PIM.AddressBookItem = new AddressBookItem();

Widget.PIM.CalendarItem = new CalendarItem();

Widget.Telephony.prototype.CallRecord = new CallRecord();

Widget.init();