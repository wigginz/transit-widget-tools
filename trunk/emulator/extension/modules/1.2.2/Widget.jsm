var EXPORTED_SYMBOLS = ["Widget", "WidgetManager", "SecurityManager"];

Components.utils.import("resource://transit-emulator/TransitCommon.jsm");

Components.utils.import("resource://transit-emulator/1.2.2/Multimedia.jsm");
Components.utils.import("resource://transit-emulator/1.2.2/Device.jsm");
Components.utils.import("resource://transit-emulator/1.2.2/PositionInfo.jsm");
Components.utils.import("resource://transit-emulator/1.2.2/File.jsm");
Components.utils.import("resource://transit-emulator/1.2.2/Exception.jsm");
Components.utils.import("resource://transit-emulator/1.2.2/ExceptionTypes.jsm");
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
Components.utils.import("resource://transit-emulator/1.2.2/WidgetManager.jsm");
Components.utils.import("resource://transit-emulator/1.2.2/SecurityManager.jsm");

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
    
    _Widget_122.openURL(url);
  },
  
  preferenceForKey : function(key) 
  {
    return(_Widget_122.preferenceForKey(key));
  },
  
  setPreferenceForKey : function(preference, key) 
  {
    _Widget_122.setPreferenceForKey(preference, key);
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
      _Widget_122.onFocus = newValue; });
      
    Widget.watch("onMaximize", function(id, oldValue, newValue) {
      _Widget_122.onMaximize = newValue; });
      
    Widget.watch("onRestore", function(id, oldValue, newValue) {
      _Widget_122.onRestore = newValue; });
      
    Widget.watch("onWakeup", function(id, oldValue, newValue) {
      _Widget_122.onWakeup = newValue; });
      
    Widget.Device.watch("onFilesFound", function(id, oldValue, newValue) {
      _Device_122.onFilesFound = newValue; });

    Widget.Device.DataNetworkInfo.watch("onNetworkConnectionChanged", function(id, oldValue, newValue) {
      _DataNetworkInfo_122.onNetworkConnectionChanged = newValue; });
      
    Widget.Device.DeviceStateInfo.watch("onFlipEvent", function(id, oldValue, newValue) {
      _DeviceStateInfo_122.onFlipEvent = newValue; });
      
    Widget.Device.DeviceStateInfo.watch("onPositionRetrieved", function(id, oldValue, newValue) 
    {
      //Widget.Device.DeviceStateInfo.onPositionRetrieved = newValue;
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
      _DeviceStateInfo_122.onScreenChangeDimensions = newValue; });
      
    Widget.Device.PowerInfo.watch("onChargeLevelChange", function(id, oldValue, newValue) {
      _PowerInfo_122.onChargeLevelChange = newValue; });
      
    Widget.Device.PowerInfo.watch("onChargeStateChange", function(id, oldValue, newValue) {
      _PowerInfo_122.onChargeStateChange = newValue; 
      //Widget.Device.PowerInfo.onChargeStateChange = _PowerInfo_122.onChargeStateChange;
    });
      
    Widget.Device.PowerInfo.watch("onLowBattery", function(id, oldValue, newValue) {
      _PowerInfo_122.onLowBattery = newValue; });
      
    Widget.Device.RadioInfo.watch("onSignalSourceChange", function(id, oldValue, newValue) {
      _RadioInfo_122.onSignalSourceChange = newValue; });
      
    Widget.Messaging.watch("onMessageArrived", function(id, oldValue, newValue) {
      _Messaging_122.onMessageArrived = newValue; });
      
    Widget.Messaging.watch("onMessageSendingFailure", function(id, oldValue, newValue) {
      _Messaging_122.onMessageSendingFailure = newValue; });
      
    Widget.Messaging.watch("onMessagesFound", function(id, oldValue, newValue) {
      _Messaging_122.onMessagesFound = newValue; });
      
    Widget.Multimedia.watch("onCameraCaptured", function(id, oldValue, newValue) {
      _Multimedia_122.onCameraCaptured = newValue; });
      
    Widget.Multimedia.AudioPlayer.watch("onStateChange", function(id, oldValue, newValue) {
      _AudioPlayer_122.onStateChange = newValue; });
      
    Widget.Multimedia.VideoPlayer.watch("onStateChange", function(id, oldValue, newValue) {
      _VideoPlayer_122.onStateChange = newValue; });
      
    Widget.PIM.watch("onAddressBookItemsFound", function(id, oldValue, newValue) 
    {
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
      _PIM_122.onCalendarItemAlert = newValue; });
      
    Widget.PIM.watch("onCalendarItemsFound", function(id, oldValue, newValue) 
    {      
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
      _PIM_122.onVCardExportingFinish = newValue; });
      
    Widget.Telephony.watch("onCallEvent", function(id, oldValue, newValue) {
      _Telephony_122.onCallEvent = newValue; });
      
    Widget.Telephony.watch("onCallRecordsFound", function(id, oldValue, newValue) {
      _Telephony_122.onCallRecordsFound = newValue; });

    _Multimedia_122.monitor = function(currentAudioPlaying, currentVideoPlaying)
    {
      Widget.Multimedia.isAudioPlaying = currentAudioPlaying;
      Widget.Multimedia.isVideoPlaying = currentVideoPlaying;
    };
  },
};

Widget.Device.File.prototype = new File();

Widget.Exception.prototype = new Exception();

Widget.Device.PositionInfo.prototype = new PositionInfo();

Widget.Messaging.prototype.Account = new Account();

Widget.Messaging.prototype.MessageQuantities = new MessageQuantities();

Widget.Messaging.prototype.Message = new Message();

Widget.Messaging.prototype.Attachment = new Attachment();

Widget.PIM.AddressBookItem = new AddressBookItem();

Widget.PIM.CalendarItem = new CalendarItem();

Widget.Telephony.prototype.CallRecord = new CallRecord();

Widget.init();