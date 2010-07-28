var EXPORTED_SYMBOLS = ["Widget"];

Components.utils.import("resource://transit-emulator/TransitCommon.jsm");

// use the 1.2.2 security manager since it wasn't different in 1.0
Components.utils.import("resource://transit-emulator/1.2.2/SecurityManager.jsm");

Components.utils.import("resource://transit-emulator/1.0/Multimedia.jsm");
Components.utils.import("resource://transit-emulator/1.0/Device.jsm");
Components.utils.import("resource://transit-emulator/1.0/PositionInfo.jsm");
Components.utils.import("resource://transit-emulator/1.0/File.jsm");
Components.utils.import("resource://transit-emulator/1.0/Messaging.jsm");
Components.utils.import("resource://transit-emulator/1.0/Account.jsm");
Components.utils.import("resource://transit-emulator/1.0/MessageQuantities.jsm");
Components.utils.import("resource://transit-emulator/1.0/Message.jsm");
Components.utils.import("resource://transit-emulator/1.0/Attachment.jsm");
Components.utils.import("resource://transit-emulator/1.0/AddressBookItem.jsm");
Components.utils.import("resource://transit-emulator/1.0/CalendarItem.jsm");
Components.utils.import("resource://transit-emulator/1.0/PIM.jsm");
Components.utils.import("resource://transit-emulator/1.0/Telephony.jsm");
Components.utils.import("resource://transit-emulator/1.0/CallRecord.jsm");

var _Device_122 = Components.classes["@jil.org/jilapi-device;1"].getService(Components.interfaces.jilDevice);
var _DataNetworkInfo_122 = Components.classes["@jil.org/jilapi-datanetworkinfo;1"].getService(Components.interfaces.jilDataNetworkInfo);
var _DeviceStateInfo_122 = Components.classes["@jil.org/jilapi-devicestateinfo;1"].getService(Components.interfaces.jilDeviceStateInfo);
var _PowerInfo_122 = Components.classes["@jil.org/jilapi-powerinfo;1"].getService(Components.interfaces.jilPowerInfo);
var _RadioInfo_122 = Components.classes["@jil.org/jilapi-radioinfo;1"].getService(Components.interfaces.jilRadioInfo);
var _Multimedia_122 = Components.classes["@jil.org/jilapi-multimedia;1"].getService(Components.interfaces.jilMultimedia);
var _AudioPlayer_122 = Components.classes["@jil.org/jilapi-audioplayer;1"].getService(Components.interfaces.jilAudioPlayer);
var _Messaging_122 = Components.classes["@jil.org/jilapi-messaging;1"].getService(Components.interfaces.jilMessaging);
var _Telephony_122 = Components.classes["@jil.org/jilapi-telephony;1"].getService(Components.interfaces.jilTelephony);
var _VideoPlayer_122 = Components.classes["@jil.org/jilapi-videoplayer;1"].getService(Components.interfaces.jilVideoPlayer);
var _Widget_122 = Components.classes["@jil.org/jilapi-widget;1"].getService(Components.interfaces.jilWidget);
var _PIM_122 = Components.classes["@jil.org/jilapi-pim;1"].getService(Components.interfaces.jilPIM);

var emulator = Components.classes["@jil.org/jilapi-emulatorruntime;1"].getService().wrappedJSObject;

var Widget =
{
  Device : new Device(),

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

    SecurityManager.checkSecurity("Open Internet Address (Widget.openURL)", SecurityManager.OP_SESSION, SecurityManager.OP_ALLOWED, SecurityManager.OP_ALLOWED, function()
    {
      _Widget_122.openURL(url);
    });
  },

  preferenceForKey : function(key) 
  {
    return(_Widget_122.preferenceForKey(key));
  },

  setPreferenceForKey : function(key, preference) 
  {
    _Widget_122.setPreferenceForKey(preference, key);
  },

  throwIPException : function(message)
  {
//     var exc = new Widget.Exception();
//     exc.message = message;
//     exc.type = Widget.ExceptionTypes.INVALID_PARAMETER;
//     throw(exc);
  },

  reset : function()
  {
    this.Device = new Device();
    this.Messaging = new Messaging();
    this.Multimedia = new Multimedia();
    this.PIM = new PIM();
    this.Telephony = new Telephony();
    
    this.onFocus = null;
    this.onMaximize = null;
    this.onRestore = null;
    this.onWakeup = null;
    
    this.init();
  },
  
  loadConstructors : function()
  {
    Widget.Device.File = function() {};
    Widget.Device.File.prototype = new File();

    Widget.Device.PositionInfo = function() {};
    Widget.Device.PositionInfo.prototype = new PositionInfo();

    Widget.Messaging.Account = function() {};
    Widget.Messaging.Account.prototype = new Account();

    Widget.Messaging.Attachment = function() {};
    Widget.Messaging.Attachment.prototype = new Attachment();

    Widget.Messaging.Message = function() {};
    Widget.Messaging.Message.prototype = new Message();

    Widget.Messaging.MessageQuantities = function() {};
    Widget.Messaging.MessageQuantities.prototype = new MessageQuantities();

    Widget.PIM.AddressBookItem = function() {};
    Widget.PIM.AddressBookItem.prototype = new AddressBookItem();

    Widget.PIM.CalendarItem = function() {};
    Widget.PIM.CalendarItem.prototype = new CalendarItem();

    Widget.Telephony.CallRecord = function() {};
    Widget.Telephony.CallRecord.prototype = new CallRecord();
  },
      
  init : function()
  {   
    this.loadConstructors();
    
    Widget.watch("onFocus", function(id, oldValue, newValue) {
      emulator.setInCache("onfocus", newValue);
      _Widget_122.onFocus = newValue; });
      
    Widget.watch("onMaximize", function(id, oldValue, newValue) {
      emulator.setInCache("onmaximize", newValue);
      _Widget_122.onMaximize = newValue; });
      
    Widget.watch("onRestore", function(id, oldValue, newValue) {
      emulator.setInCache("onrestore", newValue);
      _Widget_122.onRestore = newValue; });
      
    Widget.watch("onWakeup", function(id, oldValue, newValue) {
      emulator.setInCache("onwakeup", newValue);
      _Widget_122.onWakeup = newValue; });
      
    Widget.Device.watch("onFilesFound", function(id, oldValue, newValue) {
      emulator.setInCache("onfilesfound", newValue);
      _Device_122.onFilesFound = newValue; });

    Widget.Device.DataNetworkInfo.watch("onNetworkConnectionChanged", function(id, oldValue, newValue) {
      emulator.setInCache("onnetworkchange", newValue);
      _DataNetworkInfo_122.onNetworkConnectionChanged = newValue; });
      
    Widget.Device.DeviceStateInfo.watch("onFlipEvent", function(id, oldValue, newValue) {
      emulator.setInCache("onflip", newValue);
      _DeviceStateInfo_122.onFlipEvent = newValue; });
      
    Widget.Device.DeviceStateInfo.watch("onPositionRetrieved", function(id, oldValue, newValue) 
    {
      emulator.setInCache("onposition", newValue);
      _DeviceStateInfo_122.onPositionRetrieved = function(position, method)
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
      emulator.setInCache("onscreenchange", newValue);
      _DeviceStateInfo_122.onScreenChangeDimensions = newValue; });
      
    Widget.Device.PowerInfo.watch("onChargeLevelChange", function(id, oldValue, newValue) {
      emulator.setInCache("onchargelevel", newValue);
      _PowerInfo_122.onChargeLevelChange = newValue; });
      
    Widget.Device.PowerInfo.watch("onChargeStateChange", function(id, oldValue, newValue) {
      emulator.setInCache("onchargestate", newValue);
      _PowerInfo_122.onChargeStateChange = newValue; 
      //Widget.Device.PowerInfo.onChargeStateChange = _PowerInfo_122.onChargeStateChange;
    });
      
    Widget.Device.PowerInfo.watch("onLowBattery", function(id, oldValue, newValue) {
      emulator.setInCache("onlowbattery", newValue);
      _PowerInfo_122.onLowBattery = newValue; });
      
    Widget.Device.RadioInfo.watch("onSignalSourceChange", function(id, oldValue, newValue) {
      emulator.setInCache("onsignalchange", newValue);
      _RadioInfo_122.onSignalSourceChange = newValue; });
      
    Widget.Messaging.watch("onMessageArrived", function(id, oldValue, newValue) {
      emulator.setInCache("onmessagearrived", newValue);
      _Messaging_122.onMessageArrived = newValue; });
      
    Widget.Messaging.watch("onMessageSendingFailure", function(id, oldValue, newValue) {
      emulator.setInCache("onmessagesendingfailure", newValue);
      _Messaging_122.onMessageSendingFailure = newValue; });

    Widget.Messaging.watch("onMessagesFound", function(id, oldValue, newValue) {
      emulator.setInCache("onmessagesfound", newValue);
      _Messaging_122.onMessagesFound = newValue; });
      
    Widget.Multimedia.watch("onCameraCaptured", function(id, oldValue, newValue) {
      emulator.setInCache("oncameracaptured", newValue);
      _Multimedia_122.onCameraCaptured = newValue; });
      
    Widget.Multimedia.AudioPlayer.watch("onStateChange", function(id, oldValue, newValue) {
      emulator.setInCache("audioonstatechange", newValue);
      _AudioPlayer_122.onStateChange = newValue; });
      
    Widget.Multimedia.VideoPlayer.watch("onStateChange", function(id, oldValue, newValue) {
      emulator.setInCache("videoonstatechange", newValue);
      _VideoPlayer_122.onStateChange = newValue; });
      
    Widget.PIM.watch("onAddressBookItemsFound", function(id, oldValue, newValue) 
    {
      emulator.setInCache("onaddressbookitemsfound", newValue);
      _PIM_122.onAddressBookItemsFound = function(results)
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
      emulator.setInCache("oncalendaritemalert", newValue);
      _PIM_122.onCalendarItemAlert = newValue; });
      
    Widget.PIM.watch("onCalendarItemsFound", function(id, oldValue, newValue) 
    {      
      emulator.setInCache("oncalendaritemsfound", newValue);
      _PIM_122.onCalendarItemsFound = function(results)
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
      emulator.setInCache("onvcardexportingfinish", newValue);
      _PIM_122.onVCardExportingFinish = newValue; });
      
    Widget.Telephony.watch("onCallEvent", function(id, oldValue, newValue) {
      emulator.setInCache("oncallevent", newValue);
      _Telephony_122.onCallEvent = newValue; });
      
    Widget.Telephony.watch("onCallRecordsFound", function(id, oldValue, newValue) {
      emulator.setInCache("oncallrecordsfound", newValue);
      _Telephony_122.onCallRecordsFound = newValue; });

    _Multimedia_122.monitor = function(currentAudioPlaying, currentVideoPlaying)
    {
      Widget.Multimedia.isAudioPlaying = currentAudioPlaying;
      Widget.Multimedia.isVideoPlaying = currentVideoPlaying;
    };
  },
};

Widget.init();