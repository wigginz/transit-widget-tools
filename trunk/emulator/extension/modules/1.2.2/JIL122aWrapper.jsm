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
      var jilItems = null;
      SecurityManager.checkSecurity("Add Contact Group Members (PIM.getAddressBookGroupMembers)", SecurityManager.OP_ONE_SHOT, SecurityManager.OP_BLANKET, SecurityManager.OP_ALLOWED, function()
      {
        var results = _PIM_122a.getAddressBookGroupMembers(groupName);
        jilItems = new Array();
        for ( var i = 0; i < results.length; i++ )
        {
          var wrappedItem = new Widget.PIM.AddressBookItem();
          wrappedItem.setJIL(results[i]);
          jilItems.push(wrappedItem);
        }
      });
      return(jilItems);
    },
    
    getAddressBookItem : function(id)
    {
      var wrappedItem = null;
      SecurityManager.checkSecurity("Get Contact (PIM.getAddressBookItem)", SecurityManager.OP_SESSION, SecurityManager.OP_BLANKET, SecurityManager.OP_ALLOWED, function()
      {
        var jilItem = _PIM_122a.getAddressBookItem(id);
        wrappedItem = new Widget.PIM.AddressBookItem();
        wrappedItem.setJIL(jilItem);
      });
      return(wrappedItem);
    },
    
    getAddressBookItemsCount : function()
    {
      var result = null;
      SecurityManager.checkSecurity("Count Contacts (PIM.getAddressBookItemsCount)", SecurityManager.OP_SESSION, SecurityManager.OP_BLANKET, SecurityManager.OP_ALLOWED, function()
      {
        result = _PIM_122a.getAddressBookItemsCount();
      });
      return(result);
    },
    
    getAvailableAddressGroupNames : function()
    {
      var result = null;
      SecurityManager.checkSecurity("Get Contact Groups (PIM.getAvailableAddressGroupNames)", SecurityManager.OP_SESSION, SecurityManager.OP_BLANKET, SecurityManager.OP_ALLOWED, function()
      {
        result = _PIM_122a.getAvailableAddressGroupNames();
      });
      return(result);
    },
    
    getCalendarItem : function(calendarId)
    {
      var wrappedItem = null;
      SecurityManager.checkSecurity("Get Calendar Entry (PIM.getCalendarItem)", SecurityManager.OP_SESSION, SecurityManager.OP_BLANKET, SecurityManager.OP_ALLOWED, function()
      {
        var jilItem = _PIM_122a.getCalendarItem(calendarId);
        wrappedItem = new Widget.PIM.CalendarItem();
        wrappedItem.setJIL(jilItem);
      });
      return(wrappedItem);
    },
    
    getCalendarItems : function(startTime, endTime)
    {
      var wrappedArray = null;
      SecurityManager.checkSecurity("Get Calendar Entries (PIM.getCalendarItems)", SecurityManager.OP_SESSION, SecurityManager.OP_BLANKET, SecurityManager.OP_ALLOWED, function()
      {
        var jilArray = _PIM_122a.getCalendarItems(startTime, endTime);
        wrappedArray = new Array();
        for ( var i = 0; i < jilArray.length; i++ )
        {
          var wrappedItem = new Widget.PIM.CalendarItem();
          wrappedItem.setJIL(jilArray[i]);
          wrappedArray.push(wrappedItem);
        }
      });
      return(wrappedArray);
    },
    
    AddressBookItem : function() {},
    
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
      
      var result = null;
      SecurityManager.checkSecurity("Search Call Records (Telephony.findCallRecords)", SecurityManager.OP_ONE_SHOT, SecurityManager.OP_BLANKET, SecurityManager.OP_ALLOWED, function()
      {
        var jilRecord = _Telephony_122a.getCallRecord(callRecordType, id);
        var wrappedRecord = new Widget.Telephony.CallRecord();
        wrappedRecord.setJIL(jilRecord);
        result = wrappedRecord;
      });
      return(result);
    },
    
    getCallRecordCnt : function(callRecordType)
    {
      if ( ! this.testCallRecordType(callRecordType) )
        Widget.throwIPException("Invalid argument type for callRecordType in Telephony.getCallRecordCnt");
      
      var result = null;
      SecurityManager.checkSecurity("Count Call Records (Telephony.getCallRecordCnt)", SecurityManager.OP_SESSION, SecurityManager.OP_ALLOWED, SecurityManager.OP_ALLOWED, function()
      {
        result = _Telephony_122a.getCallRecordCnt(callRecordType);
      });
      return(result);
    },
    
    initiateVoiceCall : function(phoneNumber)
    {
      if ( !(phoneNumber > -1) )
        Widget.throwIPException("Invalid argument type for phoneNumber in Telephony.initiateVoiceCall");
      
      //var phoneNumberPattern = /^\(?(\d{3})\)?[- ]?(\d{3})[- ]?(\d{4})$/;
      //if ( !(phoneNumberPattern.test(phoneNumber)) )
      //  Widget.throwIPException("Invalid argument type (format) for phoneNumber in Telephony.initiateVoiceCall");
        
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
  
    
  test1234 : null,
    
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
      TransitCommon.debug("test1234: "+Widget.test1234);
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

Widget.init();

