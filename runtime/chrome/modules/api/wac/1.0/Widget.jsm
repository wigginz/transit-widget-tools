var EXPORTED_SYMBOLS = ["Widget"];

Components.utils.import("resource://transit-runtime/TransitCommon.jsm");

Components.utils.import("resource://transit-runtime/api/wac/1.0/WidgetCommon.jsm");
Components.utils.import("resource://transit-runtime/api/wac/1.0/Multimedia.jsm");
Components.utils.import("resource://transit-runtime/api/wac/1.0/Device.jsm");
Components.utils.import("resource://transit-runtime/api/wac/1.0/PositionInfo.jsm");
Components.utils.import("resource://transit-runtime/api/wac/1.0/Exception.jsm");
Components.utils.import("resource://transit-runtime/api/wac/1.0/ExceptionTypes.jsm");
Components.utils.import("resource://transit-runtime/api/wac/1.0/Messaging.jsm");
Components.utils.import("resource://transit-runtime/api/wac/1.0/Message.jsm");
Components.utils.import("resource://transit-runtime/api/wac/1.0/AddressBookItem.jsm");
Components.utils.import("resource://transit-runtime/api/wac/1.0/PIM.jsm");

var _Device_122 = Components.classes["@jil.org/jilapi-device;1"].getService(Components.interfaces.jilDevice);
var _DeviceStateInfo_122 = Components.classes["@jil.org/jilapi-devicestateinfo;1"].getService(Components.interfaces.jilDeviceStateInfo);
var _Multimedia_122 = Components.classes["@jil.org/jilapi-multimedia;1"].getService(Components.interfaces.jilMultimedia);
var _AudioPlayer_122 = Components.classes["@jil.org/jilapi-audioplayer;1"].getService(Components.interfaces.jilAudioPlayer);
var _Messaging_122 = Components.classes["@jil.org/jilapi-messaging;1"].getService(Components.interfaces.jilMessaging);
var _Widget_122 = Components.classes["@jil.org/jilapi-widget;1"].getService(Components.interfaces.jilWidget);
var _PIM_122 = Components.classes["@jil.org/jilapi-pim;1"].getService(Components.interfaces.jilPIM);

var emulator = Components.classes["@jil.org/jilapi-emulatorruntime;1"].getService().wrappedJSObject;

var Widget =
{
  Device : new Device(),

  ExceptionTypes : new ExceptionTypes(),

  Messaging : new Messaging(),

  Multimedia : new Multimedia(),

  PIM : new PIM(),
  
  // events //

  onFocus : null,

  onMaximize : null,

  onRestore : null,

  onWakeup : null,

  // regular methods //

  openURL : function(url) 
  {
    if ( (url == null) || (url.constructor != String) )
      WidgetCommon.throwIPException("Invalid argument type for url in Widget.openUrl");
    
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

  reset : function()
  {
    this.Device = new Device();
    this.Messaging = new Messaging();
    this.Multimedia = new Multimedia();
    this.PIM = new PIM();
    
    this.onFocus = null;
    this.onMaximize = null;
    this.onRestore = null;
    this.onWakeup = null;
    
    this.init();
  },
  
  loadConstructors : function()
  {
    Widget.Exception = function() {};
    Widget.Exception.prototype = new Exception();

    Widget.Device.PositionInfo = function() {};
    Widget.Device.PositionInfo.prototype = new PositionInfo();

    Widget.Messaging.Message = function() {};
    Widget.Messaging.Message.prototype = new Message();

    Widget.PIM.AddressBookItem = function() {};
    Widget.PIM.AddressBookItem.prototype = new AddressBookItem();
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

    Widget.Messaging.watch("onMessageSendingFailure", function(id, oldValue, newValue) {
      emulator.setInCache("onmessagesendingfailure", newValue);
      _Messaging_122.onMessageSendingFailure = newValue; });
      
    Widget.Multimedia.watch("onCameraCaptured", function(id, oldValue, newValue) {
      emulator.setInCache("oncameracaptured", newValue);
      _Multimedia_122.onCameraCaptured = newValue; });
      
    Widget.Multimedia.AudioPlayer.watch("onStateChange", function(id, oldValue, newValue) {
      emulator.setInCache("audioonstatechange", newValue);
      _AudioPlayer_122.onStateChange = newValue; });
      
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

    _Multimedia_122.monitor = function(currentAudioPlaying, currentVideoPlaying)
    {
      Widget.Multimedia.isAudioPlaying = currentAudioPlaying;
    };
  },
};

Widget.init();