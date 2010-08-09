var EXPORTED_SYMBOLS = ["SecurityManager"];

Components.utils.import("resource://transit-emulator/TransitCommon.jsm");

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

  checkInlineSecurity : function(apiKey, unidentifiedOp, identifiedOp, operatorOp)
  {
    if ( this.securityContext == "identified" )
    {
      if ( identifiedOp == this.OP_ALLOWED )
        return(true);
      
      if ( (identifiedOp == this.OP_SESSION) )
      {
        if ( !this.sessionConfirmed[apiKey] )
          return(this.showInlinePrompt(apiKey));
        
        else
          return(true);
      }
      if ( (identifiedOp == this.OP_ONE_SHOT) )
        return(this.showInlinePrompt(apiKey));
    }
    
    else if ( this.securityContext == "unidentified" )
    {
      if ( identifiedOp == this.OP_DISALLOWED )
        return(false);

      if ( unidentifiedOp == this.OP_ALLOWED )
        return(true);

      if ( (unidentifiedOp == this.OP_SESSION) )
      {
        if ( !this.sessionConfirmed[apiKey] )
          return(this.showInlinePrompt(apiKey));

        else
          return(true);
      }
      if ( (unidentifiedOp == this.OP_ONE_SHOT) )
        return(this.showInlinePrompt(apiKey));
    }
    
    else if ( this.securityContext == "operator" )
    {
      if ( operatorOp == this.OP_ALLOWED )
        return(true);

      if ( (operatorOp == this.OP_SESSION) )
      {
        if ( !this.sessionConfirmed[apiKey] )
          return(this.showInlinePrompt(apiKey));
        
        else
          return(true);
      }
      if ( (operatorOp == this.OP_ONE_SHOT) )
        return(this.showInlinePrompt(apiKey));
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
  
  showInlinePrompt : function(apiKey)
  {
    var result = TransitCommon.confirm("This application is attempting to use the following priviledged resource: \n\n"+apiKey+"\n\nWould you like to allow the application to proceed?");
    
    SecurityManager.sessionConfirmed[apiKey] = result;
    
    return(result);
  },

  reset : function()
  {
    this.sessionConfirmed = new Array();  
    this.securityContext = null;
  },
  
  AccelerometerInfo_1_1    : "http://jil.org/jil/api/1.1/accelerometerinfo",
  Account_1_1              : "http://jil.org/jil/api/1.1/account",
  AccountInfo_1_1          : "http://jil.org/jil/api/1.1/accountinfo",
  AddressBookItem_1_1      : "http://jil.org/jil/api/1.1/addressbookitem",
  Attachment_1_1           : "http://jil.org/jil/api/1.1/attachment",
  AudioPlayer_1_1          : "http://jil.org/jil/api/1.1/audioplayer",
  CalendarItem_1_1         : "http://jil.org/jil/api/1.1/calendaritem",
  CallRecord_1_1           : "http://jil.org/jil/api/1.1/callrecord",
  Config_1_1               : "http://jil.org/jil/api/1.1/config",
  Device_1_1               : "http://jil.org/jil/api/1.1/device",
  DeviceInfo_1_1           : "http://jil.org/jil/api/1.1/deviceinfo",
  DeviceStateInfo_1_1      : "http://jil.org/jil/api/1.1/devicestateinfo",
  EventRecurrenceTypes_1_1 : "http://jil.org/jil/api/1.1/eventrecurrencetypes",
  Message_1_1              : "http://jil.org/jil/api/1.1/message",
  MessageQuantities_1_1    : "http://jil.org/jil/api/1.1/messagequantities",
  MessageTypes_1_1         : "http://jil.org/jil/api/1.1/messagetypes",
  Messaging_1_1            : "http://jil.org/jil/api/1.1/messaging",
  Multimedia_1_1           : "http://jil.org/jil/api/1.1/multimedia",
  PositionInfo_1_1         : "http://jil.org/jil/api/1.1/positioninfo",
  PowerInfo_1_1            : "http://jil.org/jil/api/1.1/powerinfo",
  Widget_1_1               : "http://jil.org/jil/api/1.1/widget",
  
  CallRecordTypes_1_1_1 : "http://jil.org/jil/api/1.1.1/callrecordtypes",
  DataNetworkInfo_1_1_1 : "http://jil.org/jil/api/1.1.1/datanetworkinfo",
  File_1_1_1            : "http://jil.org/jil/api/1.1.1/file",
  PIM_1_1_1             : "http://jil.org/jil/api/1.1.1/pim",
  RadioInfo_1_1_1       : "http://jil.org/jil/api/1.1.1/radioinfo",
  Telephony_1_1_1       : "http://jil.org/jil/api/1.1.1/telephony",
  WidgetManager_1_1_1   : "http://jil.org/jil/api/1.1.1/widgetmanager",
  
  Camera_1_1_2      : "http://jil.org/jil/api/1.1.2/camera",
  VideoPlayer_1_1_2 : "http://jil.org/jil/api/1.1.2/videoplayer",
  
  MessageFolderTypes_1_1_4 : "http://jil.org/jil/api/1.1.4/messagefoldertypes",
  
  ApplicationTypes_1_1_5           : "http://jil.org/jil/api/1.1.5/applicationtypes",
  DataNetworkConnectionTypes_1_1_5 : "http://jil.org/jil/api/1.1.5/datanetworkconnectiontypes",
  Exception_1_1_5                  : "http://jil.org/jil/api/1.1.5/exception",
  ExceptionTypes_1_1_5             : "http://jil.org/jil/api/1.1.5/exceptiontypes",
  RadioSignalSourceTypes_1_1_5     : "http://jil.org/jil/api/1.1.5/radiosignalsourcetypes",
};