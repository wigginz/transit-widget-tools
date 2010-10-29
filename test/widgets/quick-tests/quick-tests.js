var testWAC = 
{
  testWAC : function()
  {
    Widget.Billing.initiatePurchase("1",
      function(ret)
      {
        showResult("Widget.Billing.", "Purchase successful.");
      },
      function(ret)
      {
        showResult("Widget.Billing.", "Purchase cancelled.");
      });         
  },
};

var testSamsung = 
{
  openURL : function()
  {
    widget.openURL("http://www.jil.org");
    showResult("Samsung widget.openURL", "widget.openURL() called for www.jil.org.");
  },
};

var testXMLHttpRequest = 
{
  testAsync : function()
  {
    var req = new XMLHttpRequest();
    req.open('GET', 'http://example.com/', true);
    req.onreadystatechange = function () 
    {
      if ( (req.readyState == 4) && (req.status == 200) )
        response(req);
    };
    req.send(null);
  },
};

function response(req)
{
  showResult("asdXMLHttpRequest", "Status: "+req.status+"<pre>"+req.responseText+"</pre>");
}

var testCamera = 
{
  onCameraCaptured : function()
  {
    Widget.Multimedia.Camera.onCameraCaptured = function()
    {
      alert("Hello!");
    };
    alert(Widget.Multimedia.Camera.onCameraCaptured);
  },
};

var testWidgetManager =
{
  checkWidgetInstallationStatus : function()
  {
    var result = WidgetManager.checkWidgetInstallationStatus("0df9f49e-c46d-4300-9ea4-e1c0f1f8398a", "APISample", "01.00.Beta");
    
    showResult("WidgetManager.checkWidgetInstallationStatus", "checking status for this widget<br>id: 0df9f49e-c46d-4300-9ea4-e1c0f1f8398a<br>name: APISample<br>version: 01.00.Beta<br><br>result: "+result);
  },
};

var testMultimedia = 
{
  isAudioPlaying : function()
  {
    alert("Audio will start playing and test will be made five seconds in, then stopped.");
    
    var result = "starting audio test, isAudioPlaying should be true:<br>";
    
    Widget.Multimedia.AudioPlayer.open("test.ogg");
    Widget.Multimedia.AudioPlayer.play(1);
    
    // pause 5 seconds
    waitForDelay(5000);
    
    var test1 = Widget.Multimedia.isAudioPlaying;
    
    result += "value five seconds in for isAudioPlaying: "+test1+"<br>";
    
    // stop
    Widget.Multimedia.AudioPlayer.stop();
    
    var test2 = Widget.Multimedia.isAudioPlaying;
    
    result += "value after stopped for isAudioPlaying: "+test2+"<br>";
    
    showResult("Multimedia.isAudioPlaying", result);
  },
  
  isVideoPlaying : function()
  {
    alert("Video will start playing and test will be made three seconds in, then stopped.");
    
    var result = "starting video test, isVideoPlaying should be true:<br>";
    
    Widget.Multimedia.VideoPlayer.open("http://v2v.cc/~j/theora_testsuite/320x240.ogg");
    Widget.Multimedia.VideoPlayer.setWindow(document.getElementById("video-container"));
    Widget.Multimedia.VideoPlayer.play(1);
    
    // pause 5 seconds
    waitForDelay(3000);
    
    var test1 = Widget.Multimedia.isVideoPlaying;
    
    result += "value five seconds in for isVideoPlaying: "+test1+"<br>";
    
    // stop
    Widget.Multimedia.VideoPlayer.stop();
    
    var test2 = Widget.Multimedia.isVideoPlaying;
    
    result += "value after stopped for isVideoPlaying: "+test2+"<br>";
    
    showResult("Multimedia.isVideoPlaying", result);
  },
  
  getVolume : function()
  {
    showResult("Multimedia.getVolume", "volume: "+Widget.Multimedia.getVolume());
  },
  
  stopAll : function()
  {
    alert("Audio and video will start playing and stopAll will be made two seconds in");
    
    Widget.Multimedia.VideoPlayer.open("http://v2v.cc/~j/theora_testsuite/320x240.ogg");
    Widget.Multimedia.VideoPlayer.setWindow(document.getElementById("video-container"));
    Widget.Multimedia.VideoPlayer.play(3);
    
    Widget.Multimedia.AudioPlayer.open("test.ogg");
    Widget.Multimedia.AudioPlayer.play(1);
    
    var result = "taking current state before stopAll. isAudioPlaying: "+Widget.Multimedia.isAudioPlaying+", isVideoPlaying: "+Widget.Multimedia.isVideoPlaying;
    
    // pause 5 seconds
    waitForDelay(3000);
    
    Widget.Multimedia.stopAll();
    
    showResult("Multimedia.stopAll", result+"<br><br>stopAll has been called, isAudioPlaying: "+Widget.Multimedia.isAudioPlaying+", isVideoPlaying: "+Widget.Multimedia.isVideoPlaying);
  },
  
};

var testAudioPlayer = 
{
  open : function()
  {
    Widget.Multimedia.AudioPlayer.open("test.ogg");
    
    showResult("AudioPlayer.open", "Opened audio file 'test.ogg'");
  },
  
  pause : function()
  {
    Widget.Multimedia.AudioPlayer.pause();
    
    showResult("AudioPlayer.pause", "Paused playback.");
  },
  
  play : function()
  {
    Widget.Multimedia.AudioPlayer.play(3);
    
    showResult("AudioPlayer.play", "Playing opened audio file with three repeat times.");
  },
  
  resume : function()
  {
    Widget.Multimedia.AudioPlayer.resume();
    
    showResult("AudioPlayer.resume", "Resumed playback.");
  },
  
  stop : function()
  {
    Widget.Multimedia.AudioPlayer.stop();
    
    showResult("AudioPlayer.open", "Stopped playback.");
  },
  
  onStateChange : function()
  {
    Widget.Multimedia.AudioPlayer.onStateChange = function(state)
    {
      alert("AudioPlayer state changed to "+state);
    };
  },
};

var testRadioInfo = 
{
  isRadioEnabled : function()
  {
    showResult("RadioInfo.isRadioEnabled", "isRadioEnabled: "+Widget.Device.RadioInfo.isRadioEnabled);
  },
  
  isRoaming : function()
  {
    showResult("RadioInfo.isRoaming", "isRoaming: "+Widget.Device.RadioInfo.isRoaming);
  },
  
  radioSignalSource : function()
  {
    showResult("RadioInfo.radioSignalSource", "radioSignalSource: "+Widget.Device.RadioInfo.radioSignalSource);
  },
  
  radioSignalStrengthPercent : function()
  {
    showResult("RadioInfo.radioSignalStrengthPercent", "radioSignalStrengthPercent: "+Widget.Device.RadioInfo.radioSignalStrengthPercent);
  },
  
  onSignalSourceChange : function()
  {
    Widget.Device.RadioInfo.onSignalSourceChange = function(source, isRoaming)
    {
      showResult("RadioInfo.onSignalSourceChange", "onSignalSourceChange caught, source: "+source+", roaming: "+isRoaming);
    };
  },
  
  tRadioSignalSourceTypes : function()
  {
    var t = Widget.Device.RadioInfo.RadioSignalSourceTypes;
    
    var result = 
      "<br>RadioSignalSourceTypes.CDMA: "+t.CDMA +
      "<br>RadioSignalSourceTypes.GSM: "+t.GSM +
      "<br>RadioSignalSourceTypes.LTE: "+t.LTE +
      "<br>RadioSignalSourceTypes.TDSCDMA: "+t.TDSCDMA +
      "<br>RadioSignalSourceTypes.WCDMA: "+t.WCDMA;
    
    showResult("RadioSignalSourceTypes", "Testing RadioSignalSourceTypes, <br>"+result);
  },
};

var testPowerInfo =
{
  isCharging : function()
  {
    showResult("PowerInfo.isCharging", "isCharging: "+Widget.Device.PowerInfo.isCharging);
  },
  
  percentRemaining : function()
  {
    showResult("PowerInfo.percentRemaining", "isCharging: "+Widget.Device.PowerInfo.percentRemaining);
  },
  
  onChargeLevelChange : function()
  {
    Widget.Device.PowerInfo.onChargeLevelChange = function(percent)
    {
      showResult("PowerInfo.onChargeLevelChange", "onChargeLevelChange caught, new percent: "+percent);
    };
  },
  
  onChargeStateChange : function()
  {
    Widget.Device.PowerInfo.onChargeStateChange = function(state)
    {
      showResult("PowerInfo.onChargeStateChange", "onChargeStateChange caught, new state: "+state);
    };
    alert(Widget.Device.PowerInfo.onChargeStateChange);
  },
  
  onLowBattery : function()
  {
    Widget.Device.PowerInfo.onLowBattery = function(percent)
    {
      showResult("PowerInfo.onLowBattery", "onLowBattery caught, new percent: "+percent);
    };
  },  
};

var testConfig = 
{
  msgRingtoneVolume : function()
  {
    showResult("Config.msgRingtoneVolume", "msgRingtoneVolume: "+Widget.Device.DeviceStateInfo.Config.msgRingtoneVolume);
  },
  
  ringtoneVolume : function()
  {
    showResult("Config.ringtoneVolume", "ringtoneVolume: "+Widget.Device.DeviceStateInfo.Config.ringtoneVolume);
  },
  
  vibrationSetting : function()
  {
    showResult("Config.vibrationSetting", "vibrationSetting: "+Widget.Device.DeviceStateInfo.Config.vibrationSetting);
  },
  
  setAsWallpaper : function()
  {
    Widget.Device.DeviceStateInfo.Config.setAsWallpaper("file://wallpaper.png");
    
    showResult("Config.setAsWallpaper", "Setting wallpaper to file://wallpaper.png");
  },
  
  setDefaultRingtone : function()
  {
    Widget.Device.DeviceStateInfo.Config.setDefaultRingtone("file://ringtone.mp3");
    
    showResult("Config.setAsWallpaper", "Setting ringtone to file://ringtone.mp3");
  },  
};

var testDeviceStateInfo = 
{
  tAccelerometerInfo : function()
  {
    var accel = Widget.Device.DeviceStateInfo.AccelerometerInfo;
    
    showResult("DeviceStateInfo.AccelerometerInfo", "xAxis: "+accel.xAxis+", yAxis: "+accel.yAxis+", zAxis: "+accel.zAxis);
  },
  
  audioPath : function()
  {
    showResult("DeviceStateInfo.audioPath", "audioPath: "+Widget.Device.DeviceStateInfo.audioPath);
  },
  
  availableMemory : function()
  {
    showResult("DeviceStateInfo.availableMemory", "availableMemory: "+Widget.Device.DeviceStateInfo.availableMemory);
  },
  
  backLightOn : function()
  {
    showResult("DeviceStateInfo.backLightOn", "backLightOn: "+Widget.Device.DeviceStateInfo.backLightOn);
  },
  
  keypadLightOn : function()
  {
    showResult("DeviceStateInfo.keypadLightOn", "keypadLightOn: "+Widget.Device.DeviceStateInfo.keypadLightOn);
  },
  
  language : function()
  {
    showResult("DeviceStateInfo.language", "language: "+Widget.Device.DeviceStateInfo.language);
  },
  
  processorUtilizationPercent : function()
  {
    showResult("DeviceStateInfo.processorUtilizationPercent", "processorUtilizationPercent: "+Widget.Device.DeviceStateInfo.processorUtilizationPercent);
  },
  
  onFlipEvent : function()
  {
    Widget.Device.DeviceStateInfo.onFlipEvent = function(isNowClosed)
    {
      showResult("DeviceStateInfo.onFlipEvent", "onFlipEvent caught, value for isNowClosed: "+isNowClosed);
    };
  },
  
  onPositionRetrieved : function()
  {
    Widget.Device.DeviceStateInfo.onPositionRetrieved = function(locationInfo, method)
    {
      var result =
         "<br>PositionInfo.accuracy: "+locationInfo.accuracy
        +"<br>PositionInfo.altitude: "+locationInfo.altitude
        +"<br>PositionInfo.altitudeAccuracy: "+locationInfo.altitudeAccuracy
        +"<br>PositionInfo.cellID: "+locationInfo.cellID
        +"<br>PositionInfo.latitude: "+locationInfo.latitude
        +"<br>PositionInfo.longitude: "+locationInfo.longitude
        +"<br>PositionInfo.timeStamp: "+locationInfo.timeStamp
        +"<br>method: "+method;
        
      showResult("DeviceStateInfo.onPositionRetrieved", "onPositionRetrieved caught, value for location and method: "+result);
    };
    alert("Position callback set, test requestPositionInfo or manually trigger event to complete test.");
  },
  
  onScreenChangeDimensions : function()
  {
    Widget.Device.DeviceStateInfo.onScreenChangeDimensions = function(width, height)
    {
      showResult("DeviceStateInfo.onScreenChangeDimensions", "onScreenChangeDimensions caught, value for height: "+height+", width: "+width);
    };
  },
  
  requestPositionInfo : function()
  {
    Widget.Device.DeviceStateInfo.requestPositionInfo("gps");
  },
};

var testException = 
{
  tExceptionTypes : function()
  {
    var result = 
      "<br>ExceptionTypes.INVALID_PARAMETER: "+Widget.ExceptionTypes.INVALID_PARAMETER +
      "<br>ExceptionTypes.SECURITY: "+Widget.ExceptionTypes.SECURITY +
      "<br>ExceptionTypes.UNKNOWN: "+Widget.ExceptionTypes.UNKNOWN +
      "<br>ExceptionTypes.UNSUPPORTED: "+Widget.ExceptionTypes.UNSUPPORTED;
    
    showResult("ExceptionTypes", "Testing ExceptionTypes, <br>"+result);
  },
  
  tException : function()
  {
    var result = "Throwing and catching Widget.Exception<br>";
    var tException = new Widget.Exception();
    tException.message = "Thrown Widget.Exception test";
    tException.type = Widget.ExceptionTypes.SECURITY;
    
    try
    {
      throw tException;
    }
    catch(ex)
    {
      result += "Caught exception, message: "+ex.message+", type: "+ex.type;
    }
    
    showResult("Exception", "Testing Exception, <br>"+result);
  },
};

var testWidget = 
{
  tDevice : function()
  {
    var t = Widget.Device;
    showResult("Widget.Device", "Testing Widget.Device, value: "+t);
  },

  tException : function()
  {
    var t = new Widget.Exception();
    var result = t instanceof Widget.Exception;
    showResult("Widget.Exception", "Testing Widget.Exception, value: "+t+", instanceof Widget.Exception: "+result);
  },

  tExceptionTypes : function()
  {
    var t = Widget.ExceptionTypes;
        
    showResult("Widget.ExceptionTypes", "Testing Widget.ExceptionTypes, value: "+t);
  },

  tMessaging : function()
  {
    var t = Widget.Messaging;
    showResult("Widget.Messaging", "Testing Widget.Messaging, value: "+t);
  },

  tMultimedia : function()
  {
    var t = Widget.Multimedia;
    showResult("Widget.Multimedia", "Testing Widget.Multimedia, value: "+t);
  },

  tPIM : function()
  {
    var t = Widget.PIM;
    showResult("Widget.PIM", "Testing Widget.PIM, value: "+t);
  },

  tTelephony : function()
  {
    var t = Widget.Telephony;
    showResult("Widget.Telephony", "Testing Widget.Telephony, value: "+t);
  },
  
  onFocus : function()
  {
    Widget.onFocus = function()
    {
      showResult("Widget.onFocus", "Widget.onFocus() callback function called.");
    };
  },
  
  onMaximize : function()
  {
    Widget.onMaximize = function()
    {
      showResult("Widget.onMaximize", "Widget.onMaximize() callback function called.");
    };
  },
  
  onRestore : function()
  {
    Widget.onRestore = function()
    {
      showResult("Widget.onRestore", "Widget.onRestore() callback function called.");
    };
  },
  
  onWakeup : function()
  {
    Widget.onWakeup = function()
    {
      showResult("Widget.onWakeup", "Widget.onWakeup() callback function called.");
    };
  },
  
  openURL : function()
  {
    Widget.openURL("http://www.jil.org");
    showResult("Widget.openURL", "Widget.openURL() called for www.jil.org.");
  },
  
  preferenceForKey : function()
  {
    var result = "Setting value 'test successful' for key 'result'";
    Widget.setPreferenceForKey("test successful", "result");
    var value = Widget.preferenceForKey("result");
    result += "<br>Retrieved value for key result: "+value;
    
    showResult("Widget.preferenceForKey", result);
  },
  
  setPreferenceForKey : function()
  {
    this.preferenceForKey();
  },
};

var testDevice =
{
  tAccountInfo : function()
  {
    var t = Widget.Device.AccountInfo;
     
    var result = 
      "<br>AccountInfo.phoneMSISDN: "+t.phoneMSISDN +
      "<br>AccountInfo.phoneOperatorName: "+t.phoneOperatorName +
      "<br>AccountInfo.phoneUserUniqueId: "+t.phoneUserUniqueId +
      "<br>AccountInfo.userAccountBalance: "+t.userAccountBalance +
      "<br>AccountInfo.userSubscriptionType: "+t.userSubscriptionType;
         
    showResult("Device.AccountInfo", "Testing Device.AccountInfo, value: "+t+"<br>"+result);
  },
   
  tApplicationTypes : function()
  {
    var t = Widget.Device.ApplicationTypes;
     
    var result = 
      "<br>ApplicationTypes.ALARM: "+t.ALARM +
      "<br>ApplicationTypes.BROWSER: "+t.BROWSER +
      "<br>ApplicationTypes.CALCULATOR: "+t.CALCULATOR +
      "<br>ApplicationTypes.CALENDAR: "+t.CALENDAR +
      "<br>ApplicationTypes.CAMERA: "+t.CAMERA +
      "<br>ApplicationTypes.CONTACTS: "+t.CONTACTS +
      "<br>ApplicationTypes.FILES: "+t.FILES +
      "<br>ApplicationTypes.MAIL: "+t.MAIL +
      "<br>ApplicationTypes.MEDIAPLAYER: "+t.MEDIAPLAYER +
      "<br>ApplicationTypes.MESSAGING: "+t.MESSAGING +
      "<br>ApplicationTypes.PHONECALL: "+t.PHONECALL +
      "<br>ApplicationTypes.PICTURES: "+t.PICTURES +
      "<br>ApplicationTypes.PROG_MANAGER: "+t.PROG_MANAGER +
      "<br>ApplicationTypes.SETTINGS: "+t.SETTINGS +
      "<br>ApplicationTypes.TASKS: "+t.TASKS +
      "<br>ApplicationTypes.WIDGET_MANAGER: "+t.WIDGET_MANAGER;      
         
    showResult("Device.ApplicationTypes", "Testing Device.ApplicationTypes, value: "+t+"<br>"+result);
  },
   
  tDataNetworkInfo : function()
  {
    var t = Widget.Device.DataNetworkInfo;
    showResult("Device.DataNetworkInfo", "Testing Device.DataNetworkInfo, value: "+t);
  },
   
  tDeviceInfo : function()
  {
    var t = Widget.Device.DeviceInfo;
    showResult("Device.DeviceInfo", "Testing Device.DeviceInfo, value: "+t);
  },
   
  tDeviceStateInfo : function()
  {
    var t = Widget.Device.DeviceStateInfo;
    showResult("Device.DeviceStateInfo", "Testing Device.DeviceStateInfo, value: "+t);
  },
   
  tFile : function()
  {
    var t = new Widget.Device.File();
    var result = t instanceof Widget.Device.File;
     
    showResult("Device.File", "Testing Device.File, value: "+t+", instanceof Widget.Device.File: "+result);
  },
   
  tPositionInfo : function()
  {
    var t = new Widget.Device.PositionInfo();
    var result = t instanceof Widget.Device.PositionInfo;
     
    showResult("Device.PositionInfo", "Testing Device.PositionInfo, value: "+t+", instanceof Widget.Device.PositionInfo: "+result);
  },
   
  tPowerInfo : function()
  {
    var t = Widget.Device.PowerInfo;
    showResult("Device.PowerInfo", "Testing Device.PowerInfo, value: "+t);
  },
   
  tRadioInfo : function()
  {
    var t = Widget.Device.RadioInfo;
    showResult("Device.RadioInfo", "Testing Device.RadioInfo, value: "+t);
  },
  
  clipboardString : function()
  {
    showResult("Device.clipboardString", "Value: "+Widget.Device.clipboardString);
  },
   
  widgetEngineName : function()
  {
    showResult("Device.widgetEngineName", "Value: "+Widget.Device.widgetEngineName);
  },
   
  widgetEngineProvider : function()
  {
    showResult("Device.widgetEngineProvider", "Value: "+Widget.Device.widgetEngineProvider);
  },
   
  widgetEngineVersion : function()
  {
    showResult("Device.widgetEngineVersion", "Value: "+Widget.Device.widgetEngineVersion);
  },
   
  copyFile : function()
  {
    var result = Widget.Device.copyFile("/sdcard/to-copy.txt", "/sdcard/copy-destination.txt");
    
    var toFile = Widget.Device.getFile("/sdcard/destination.txt");
    
    showResult("Device.copyFile", "Copied '/sdcard/original.txt' with result "+result+" and new file name is "+toFile.fileName+" with path "+toFile.filePath+" and size "+toFile.fileSize);
  },
  
  deleteFile : function()
  {
    var result = Widget.Device.deleteFile("/sdcard/to-delete.txt");
    
    showResult("Device.copyFile", "Deleted file /sdcard/to-delete.txt, result: "+result);
  },
  
  findFiles : function()
  {
    Widget.Device.onFilesFound = function(filesFound) 
    {
      var result = "Searching for files with '*.html'<br><br>";
      for ( var i = 0; i < filesFound.length; i++ )
        result += filesFound[i].fileName+"<br>";
      showResult("Widget.Device.findFiles() [callback]", result);
    };
    
    var match = new Widget.Device.File();
    match.fileName = "*.html";
    Widget.Device.findFiles(match, 0, 20);
  },
  
  getDirectoryFileNames : function()
  {
    var results = "List of files in directory: /sdcard<br>";
    
    var fileList = Widget.Device.getDirectoryFileNames("/sdcard");
    
    for ( var i = 0; i < fileList.length; i++ )
      results += fileList[i]+"<br>";
    
    showResult("Device.getDirectoryFileNames", results);
  },
  
  getFile : function()
  {
    var jilFile = Widget.Device.getFile("/sdcard/get-file.txt");
    
    showResult("Device.getFile", "Retrieved file "+jilFile.fileName+" with size "+jilFile.fileSize+", last modified on "+jilFile.lastModifyDate);
  },
  
  getFileSystemRoots : function()
  {
    var roots = Widget.Device.getFileSystemRoots();
    
    var result = "";
    for ( var i = 0; i < roots.length; i++ )
      result += roots[i]+"<br>";
    
    showResult("Device.getFileSystemRoots", "File system roots :<br>"+result);
  },
  
  getFileSystemSize : function()
  {
    var fileSize = Widget.Device.getFileSystemSize("/");
    
    showResult("Device.getFileSystemSize", "File system size for / is "+fileSize+" bytes");
  },
  
  moveFile : function()
  {
    var result = Widget.Device.moveFile("/sdcard/to-move.txt", "/sdcard/destination.txt");
    
    showResult("Device.moveFile", "Moved file /sdcard/to-move.txt to /sdcard/move-destination.txt result: "+result);
  },
  
  onFilesFound : function()
  {
    this.findFiles();
  },
  
  getAvailableApplications : function()
  {
    var results = Widget.Device.getAvailableApplications();
    var result = "";
    for ( var i = 0; i < results.length; i++ )
      result += "<br>"+results[i];
    
    showResult("Device.getAvailableApplications", "Available applications: <br>"+result);
  },
  
  launchApplication : function()
  {
    Widget.Device.launchApplication(Widget.Device.ApplicationTypes.MEDIAPLAYER, "/home/user1/a.mp4");
    
    showResult("Device.launchApplication", "Launched application Widget.Device.ApplicationTypes.MEDIAPLAYER with param '/home/user1/a.mp4'");
  },
  
  setRingtone : function()
  {
    common.createTestGuy("Test setRingtone");
    
    Widget.PIM.onAddressBookItemsFound = function(results) 
    {
      try {
      var result = "Creating contact called 'Test setRingtone<br>";

      for ( var i = 0; i < results.length; i++ )
      {
        result += "Contact id: "+results[i].addressBookItemId+"<br>";
        Widget.Device.setRingtone("/sdcard/set-ringtone.mp3", results[i]);
        result += "Set contact's ringtone to /sdcard/set-ringtone.mp3<br>";
      }
      } catch(ex) {alert(ex.message);}
      
      showResult("Device.setRingtone", result);
    };
    
    var comparison = Widget.PIM.createAddressBookItem();
    comparison.fullName = "Test setRingtone";
    Widget.PIM.findAddressBookItems(comparison, 0, 10);
  },
  
  vibrate : function()
  {
    Widget.Device.vibrate(5);
    
    showResult("Device.vibrate", "Called vibrate for five seconds");
  },
};

var testVideoPlayer =
{
  setWindow : function()
  {
    Widget.Multimedia.VideoPlayer.setWindow(document.getElementById("video-container"));
  },
  
  open : function()
  {
    Widget.Multimedia.VideoPlayer.open("http://v2v.cc/~j/theora_testsuite/320x240.ogg");
  },
  
  play : function()
  {
    Widget.Multimedia.VideoPlayer.play(3);
  },
  
  stop : function()
  {
    Widget.Multimedia.VideoPlayer.stop();
  },
  
  pause : function()
  {
    Widget.Multimedia.VideoPlayer.pause();
  },
  
  resume : function()
  {
    Widget.Multimedia.VideoPlayer.resume();
  },
  
  onStateChange : function()
  {
    Widget.Multimedia.VideoPlayer.onStateChange = function(state)
    {
      alert("VideoPlayer state changed to "+state);
    };
  },
};

var testMessage =
{
  addAddress : function()
  {
    var message = new Widget.Messaging.Message();
    message.addAddress("cc", "cc1-noreply@jil.org");
    message.addAddress("cc", "cc2-noreply@jil.org");
    message.addAddress("bcc", "bcc1-noreply@jil.org");
    message.addAddress("destination", "destination1-noreply@jil.org");
    message.addAddress("destination", "destination2-noreply@jil.org");
    message.addAddress("destination", "destination3-noreply@jil.org"); 
    
    showResult("Message.addAddress", "cc values: "+message.ccAddress+", bcc values: "+message.bccAddress+", dest: "+message.destinationAddress);
  },
  
  saveAttachment : function()
  {
    var attach = new Widget.Messaging.Attachment();
    attach.fileName = "/var/log/orig.txt";
    
    var message = new Widget.Messaging.Message();
    message.saveAttachment("/var/log/new.txt", attach);
    
    showResult("Message.saveAttachment", "Saved attachment with path "+attach.fileName+" to /var/log/new.txt");
  },
  
  addAttachment : function()
  {
    
  },
  
  deleteAddress : function()
  {
    var message = new Widget.Messaging.Message();
    message.addAddress("cc", "cc1-noreply@jil.org");
    message.addAddress("cc", "cc2-noreply@jil.org");
    message.addAddress("bcc", "bcc1-noreply@jil.org");
    message.addAddress("destination", "destination1-noreply@jil.org");
    message.addAddress("destination", "destination2-noreply@jil.org");
    message.addAddress("destination", "destination3-noreply@jil.org"); 
    
    message.deleteAddress("cc", "cc1-noreply@jil.org");
    message.deleteAddress("destination", "destination3-noreply@jil.org");
    
    var result = "Dest: <br>";
    for ( var i = 0; i < message.destinationAddress.length; i++ )
      result += "<br>"+message.destinationAddress[i];
    
    result += "<br>CC: <br>";
    for ( var i = 0; i < message.ccAddress.length; i++ )
      result += "<br>"+message.ccAddress[i];
    
    showResult("Message.deleteAddress", result);
  },
  
  deleteAttachment : function()
  {
    
  },
};

function testWrapper()
{
  var testException = new Widget.Exception();
  alert(testException instanceof Widget.Exception);
}

var testDataNetworkInfo = 
{
  isDataNetworkConnected : function()
  {
    var result = Widget.Device.DataNetworkInfo.isDataNetworkConnected;
    showResult("DataNetworkInfo.isDataNetworkConnected", "isDataNetworkConnected value: "+result);
  },
  
  networkConnectionType : function()
  {
    var result = "networkConnectionType values are: ";
    
    for ( var i = 0; i < Widget.Device.DataNetworkInfo.networkConnectionType.length; i++ )
      result += Widget.Device.DataNetworkInfo.networkConnectionType[i]+", ";
    
    showResult("DataNetworkInfo.networkConnectionType", result);
  },
  
  tDataNetworkConnectionTypes : function()
  {
    var t = Widget.Device.DataNetworkInfo.DataNetworkConnectionTypes;
    
    var result = 
      "<br>DataNetworkConnectionTypes.BLUETOOTH: "+t.BLUETOOTH +
      "<br>DataNetworkConnectionTypes.EDGE: "+t.EDGE +
      "<br>DataNetworkConnectionTypes.EVDO: "+t.EVDO +
      "<br>DataNetworkConnectionTypes.GPRS: "+t.GPRS +
      "<br>DataNetworkConnectionTypes.IRDA: "+t.IRDA +
      "<br>DataNetworkConnectionTypes.LTE: "+t.LTE +
      "<br>DataNetworkConnectionTypes.ONEXRTT: "+t.ONEXRTT +
      "<br>DataNetworkConnectionTypes.WIFI: "+t.WIFI;      
         
    showResult("DataNetworkInfo.DataNetworkConnectionTypes", "Testing DataNetworkInfo.DataNetworkConnectionTypes, value: "+t+"<br>"+result);
  },
  
  getNetworkConnectionName : function()
  {
    var result = Widget.Device.DataNetworkInfo.getNetworkConnectionName(Widget.Device.DataNetworkInfo.DataNetworkConnectionTypes.BLUETOOTH);
    showResult("DataNetworkInfo.getNetworkConnectionName", "Value for DataNetworkConnectionTypes.BLUETOOTH: "+result);
  },
  
  onNetworkConnectionChanged : function()
  {
    Widget.Device.DataNetworkInfo.onNetworkConnectionChanged = function(connectionName)
    {
      showResult("DataNetworkInfo.onNetworkConnectionChanged", "Connection change event caught, new connection name: "+connectionName);
    };    
  },
};

var testDeviceInfo = 
{
  ownerInfo : function()
  {
    showResult("DeviceInfo.ownerInfo", "value for DeviceInfo.ownerInfo.fullName: "+Widget.Device.DeviceInfo.ownerInfo.fullName);
  },
  
  phoneColorDepthDefault : function()
  {
    showResult("DeviceInfo.phoneColorDepthDefault", "value for DeviceInfo.phoneColorDepthDefault: "+Widget.Device.DeviceInfo.phoneColorDepthDefault);
  },
  
  phoneFirmware : function()
  {
    showResult("DeviceInfo.phoneFirmware", "value for DeviceInfo.phoneFirmware: "+Widget.Device.DeviceInfo.phoneFirmware);
  },
  
  phoneManufacturer : function()
  {
    showResult("DeviceInfo.phoneManufacturer", "value for DeviceInfo.phoneManufacturer: "+Widget.Device.DeviceInfo.phoneManufacturer);
  },
  
  phoneModel : function()
  {
    showResult("DeviceInfo.phoneModel", "value for DeviceInfo.phoneModel: "+Widget.Device.DeviceInfo.phoneModel);
  },
  
  phoneOS : function()
  {
    showResult("DeviceInfo.phoneOS", "value for DeviceInfo.phoneOS: "+Widget.Device.DeviceInfo.phoneOS);
  },
  
  phoneSoftware : function()
  {
    showResult("DeviceInfo.phoneSoftware", "value for DeviceInfo.phoneSoftware: "+Widget.Device.DeviceInfo.phoneSoftware);
  },
  
  totalMemory : function()
  {
    showResult("DeviceInfo.totalMemory", "value for DeviceInfo.totalMemory: "+Widget.Device.DeviceInfo.totalMemory);
  },

  phoneScreenHeightDefault : function()
  {
    showResult("DeviceInfo.phoneScreenHeightDefault", "value for DeviceInfo.phoneScreenHeightDefault: "+Widget.Device.DeviceInfo.phoneScreenHeightDefault);
  },
  
  phoneScreenWidthDefault : function()
  {
    showResult("DeviceInfo.phoneScreenWidthDefault", "value for DeviceInfo.phoneScreenWidthDefault: "+Widget.Device.DeviceInfo.phoneScreenWidthDefault);
  },
};

var testMessaging = 
{
  tMessageFolderTypes : function()
  {
    var t = Widget.Messaging.MessageFolderTypes;
    
    var result = 
      "<br>MessageFolderTypes.DRAFTS: "+t.DRAFTS +
      "<br>MessageFolderTypes.INBOX: "+t.INBOX +
      "<br>MessageFolderTypes.OUTBOX: "+t.OUTBOX +
      "<br>MessageFolderTypes.SENTBOX: "+t.SENTBOX;   
      
    showResult("Messaging.MessageFolderTypes", "Testing Messaging.MessageFolderTypes, value: "+t+"<br>"+result);
  },
  
  tMessageQuantities : function()
  {
    var test = new Widget.Messaging.MessageQuantities();
    var result = test instanceof Widget.Messaging.MessageQuantities;
    
    showResult("Messaging.MessageQuantities", "Testing Messaging.MessageQuantities, value: "+test+"<br>Instanceof Widget.Messaging.MessageQuantities: "+result);
  },
  
  tMessageTypes : function()
  {
    var t = Widget.Messaging.MessageTypes;
    
    var result = 
      "<br>MessageTypes.EmailMessage: "+t.EmailMessage +
      "<br>MessageTypes.MMSMessage: "+t.MMSMessage +
      "<br>MessageTypes.SMSMessage: "+t.SMSMessage;   
      
    showResult("Messaging.MessageTypes", "Testing Messaging.MessageTypes, value: "+t+"<br>"+result);
  },
  
  tAccount : function()
  {
    var t = new Widget.Messaging.Account();
    var result = t instanceof Widget.Messaging.Account;
    
    showResult("Messaging.Account", "value for Account: "+t+", instanceof Widget.Messaging.Account: "+result);
  },
  
  tAttachment : function()
  {
    var t = new Widget.Messaging.Attachment();
    var result = t instanceof Widget.Messaging.Attachment;
    
    showResult("Messaging.Attachment", "value for Attachment: "+t+", instanceof Widget.Messaging.Attachment: "+result);
  },

  getCurrentEmailAccount : function()
  {
    showResult("Messaging.getCurrentEmailAccount", "current email account: "+Widget.Messaging.getCurrentEmailAccount().accountName);
  },
  
  getEmailAccounts : function()
  {
    var result = "";
    var results = Widget.Messaging.getEmailAccounts();
    for ( var i = 0; i < results.length; i++ )
      result += "<br>"+results[i].accountName;
    
    showResult("Messaging.getEmailAccounts", "all email accounts: "+result);
  },
  
  createMessage : function()
  {
    var message = Widget.Messaging.createMessage(Widget.Messaging.MessageTypes.SMSMessage);
    var result = message instanceof Widget.Messaging.Message;
    
    showResult("Messaging.createMessage", "message created: "+message+", instanceof Widget.Messaging.Message? "+result+", type: "+message.messageType);
  },
  
  onMessageArrived : function()
  {
    Widget.Messaging.onMessageArrived = function(message) 
    {
      showResult("Widget.Messaging.onMessageArrived [callback]", "Received message with subject: "+message.subject);
    };
  },

  sendMessage : function()
  {
    var message = Widget.Messaging.createMessage(Widget.Messaging.MessageTypes.EmailMessage);
    message.subject = "Test Subject";
    message.body = "Test Body";
    message.callbackNumber = "+4400000000001";
    message.destinationAddress = ["to@jil.org"];
    message.sourceAddress = "from@jil.org";
    
    Widget.Messaging.sendMessage(message);
    
    showResult("Messaging.createMessage()", "Created and sent message with subject: "+message.subject);
  },
  
  copyMessageToFolder : function()
  {
    var message = Widget.Messaging.createMessage(Widget.Messaging.MessageTypes.EmailMessage);
    var result = "Created email message.<br>";
    message.subject = "Test Subject";
    message.body = "Test Body";
    message.callbackNumber = "+4400000000001";
    message.destinationAddress = ["to@jil.org"];
    message.sourceAddress = "from@jil.org";
    
    result += "Populated fields and saved email message.<br>";
    message.update();
    
    Widget.Messaging.createFolder(Widget.Messaging.MessageTypes.EmailMessage, "Test 2");
    result += "Created new folder called 'Test 2'<br>";
    
    Widget.Messaging.copyMessageToFolder(message, "Test 2");
    result += "Copied message to new folder 'Test 2'<br>";
    
    showResult("Messaging.createMessage()", result);
  },
  
  createFolder : function()
  {
    Widget.Messaging.createFolder(Widget.Messaging.MessageTypes.EmailMessage, "Test 1");
    showResult("Messaging.createFolder()", "Created EmailMessage folder with name: 'Test 1'");
  },
  
  deleteAllMessages : function()
  {
    var message = Widget.Messaging.createMessage(Widget.Messaging.MessageTypes.EmailMessage);
    var result = "Created email message.<br>";
    message.subject = "Test Subject";
    message.body = "Test Body";
    message.callbackNumber = "+4400000000001";
    message.destinationAddress = ["to@jil.org"];
    message.sourceAddress = "from@jil.org";
    
    result += "Populated fields and saved email message.<br>";
    message.update();
    
    Widget.Messaging.createFolder(Widget.Messaging.MessageTypes.EmailMessage, "Test 3");
    result += "Created new folder called 'Test 3'<br>";
    
    Widget.Messaging.copyMessageToFolder(message, "Test 3");
    result += "Copied message to new folder 'Test 3'<br>";
    
    Widget.Messaging.deleteAllMessages(Widget.Messaging.MessageTypes.EmailMessage, "Test 3");
    result += "Deleted all messages with type EmailMessage in folder 'Test 3'";
    
    showResult("Messaging.deleteAllMessages()", result);
  },
  
  deleteEmailAccount : function()
  {
    Widget.Messaging.deleteEmailAccount(20);
    
    showResult("Messaging.deleteEmailAccount()", "Deleted email with account id 20");
  },
  
  deleteFolder : function()
  {
    Widget.Messaging.createFolder(Widget.Messaging.MessageTypes.EmailMessage, "Test 4");
    var result = "Created new folder called 'Test 4'<br>";
    
    Widget.Messaging.deleteFolder(Widget.Messaging.MessageTypes.EmailMessage, "Test 4");
    result +="Deleted message folder 'Test 4'for EmailMessage type.";
    
    showResult("Messaging.deleteFolder()", result);
  },
  
  deleteMessage : function()
  {
    Widget.Messaging.deleteMessage(Widget.Messaging.MessageTypes.EmailMessage, "Test 2", 321);
    
    showResult("Messaging.deleteMessage()", "Deleted message with id 321");
  },
  
  findMessages : function()
  {
    Widget.Messaging.onMessagesFound = function(results, folderName) 
    {
      var result = "Searching for messages with '3*' in the messageId in folder "+folderName;
      for ( var i = 0; i < results.length; i++ )
        result += results[i].messageId+": "+results[i].subject+"<br>";
      showResult("Widget.Messaging.findMessages() [callback]", result);
    };
    
    var message = new Widget.Messaging.Message();
    message.isRead = false;
    message.destinationAddress = ["*jil.org*"];
    Widget.Messaging.findMessages(message, "inbox", 0, 10);
  },
  
  getFolderNames : function()
  {
    var result = "Retrieving all folder names for message type EmailMessage<br>";
    var names = Widget.Messaging.getFolderNames(Widget.Messaging.MessageTypes.EmailMessage);
    
    for ( var i = 0; i < names.length; i++ )
      result += "Name: "+names[i]+"<br>";
    
    showResult("Messaging.getFolderNames()", result);
  },
  
  getMessage : function()
  {
    var message = Widget.Messaging.getMessage(Widget.Messaging.MessageTypes.EmailMessage, "Test 2", 0);
    
    showResult("Messaging.deleteMessage()", "Retrieved message with index 0, subject: "+message.subject);
  },
  
  getMessageQuantities : function()
  {
    var result = "Getting quantities for folder named 'Test 22'<br>";
    var quantities = Widget.Messaging.getMessageQuantities(Widget.Messaging.MessageTypes.EmailMessage, "Test 22");
    
    result+= "Read: "+quantities.totalMessageReadCnt+"<br>";
    result+= "Unread: "+quantities.totalMessageUnreadCnt+"<br>";
    result+= "Total: "+quantities.totalMessageCnt+"<br>";
    
    showResult("Messaging.getMessageQuantities()", result);
  },
  
  moveMessageToFolder : function()
  {
    var message = Widget.Messaging.getMessage(Widget.Messaging.MessageTypes.EmailMessage, "Test 2", 0);
    
    Widget.Messaging.moveMessageToFolder(message, "Test 1");
    
    showResult("Messaging.moveMessageToFolder()", "Moved message with index 0 to folder 'Test 1'");
  },
};

var testTelephony = 
{
  tCallRecord : function()
  {
    var test = new Widget.Telephony.CallRecord();
    var result = test instanceof Widget.Telephony.CallRecord;
    
    showResult("CallRecord", "Testing CallRecord, object: "+test+"<br>Instanceof Widget.Telephony.CallRecord: "+result);
  },
  
  tCallRecordTypes : function()
  {
    var t = Widget.Telephony.CallRecordTypes;

    var result = 
      "<br>CallRecordTypes.MISSED: "+t.MISSED +
      "<br>CallRecordTypes.OUTGOING: "+t.OUTGOING +
      "<br>CallRecordTypes.RECEIVED: "+t.RECEIVED;
    
    showResult("CallRecordTypes", "Testing CallRecordTypes, value: "+t+"<br>"+result);
  },
    
  initiateVoiceCall : function()
  {
    Widget.Telephony.initiateVoiceCall("+19255551234");
    
    showResult("Telephony.initiateVoiceCall()", "Initiated voice call to number +19255551234");
  },
  
  findCallRecords : function()
  {
    Widget.Telephony.onCallRecordsFound = function(results) 
    {
      var result = "Searching for call record with name 'Bob*', 0-10<br>";
      for ( var i = 0; i < results.length; i++ )
        result += results[i].callRecordId+": "+results[i].callRecordName+"<br>";
      showResult("Widget.Telephony.findCallRecords() [callback]", result);
    };
    
    var comparison = new Widget.Telephony.CallRecord();
    comparison.callRecordName = "Bob*";
    Widget.Telephony.findCallRecords(comparison, 0, 10);
  },
  
  deleteAllCallRecords : function()
  {
    Widget.Telephony.deleteAllCallRecords(Widget.Telephony.CallRecordTypes.OUTGOING);
    showResult("Telephony.deleteAllCallRecords()", "Deleted all OUTGOING call records.");
  },
  
  deleteCallRecord : function()
  {
    var id = "8";
    Widget.Telephony.deleteCallRecord(Widget.Telephony.CallRecordTypes.RECEIVED, id);
    showResult("Telephony.deleteCallRecord()", "Deleted RECEIVED call record with id "+id);
  },
  
  getCallRecord : function()
  {
    var id = "7";
    var record = Widget.Telephony.getCallRecord(Widget.Telephony.CallRecordTypes.RECEIVED, id);
    showResult("Telephony.getCallRecord()", "Retrieved call record type RECEIVED with id "+record.callRecordId+", duration seconds: "+record.durationSeconds);
  },
  
  getCallRecordCnt : function()
  {
    var count = Widget.Telephony.getCallRecordCnt(Widget.Telephony.CallRecordTypes.RECEIVED);
    showResult("Telephony.getCallRecordCnt()", "Retrieved count "+count+" of call record type RECEIVED");
  },
  
  onCallEvent : function()
  {
    Widget.Telephony.onCallEvent = function(type, number) 
    {
      showResult("Widget.Telephony.onCallEvent() [callback]", "Call event received, type: "+type+", number: "+number);
    };
  },
};


var testPIM = 
{
  tEventRecurrenceTypes : function()
  {
    var t = Widget.PIM.EventRecurrenceTypes;
    
    var result = 
      "<br>EventRecurrenceTypes.DAILY: "+t.DAILY +
      "<br>EventRecurrenceTypes.EVERY_WEEKDAY: "+t.EVERY_WEEKDAY +
      "<br>EventRecurrenceTypes.MONTHLY_ON_DAY: "+t.MONTHLY_ON_DAY +
      "<br>EventRecurrenceTypes.MONTHLY_ON_DAY_COUNT: "+t.MONTHLY_ON_DAY_COUNT +
      "<br>EventRecurrenceTypes.NOT_REPEAT: "+t.NOT_REPEAT +
      "<br>EventRecurrenceTypes.WEEKLY_ON_DAY: "+t.WEEKLY_ON_DAY +
      "<br>EventRecurrenceTypes.YEARLY: "+t.YEARLY;
    
    showResult("EventRecurrenceTypes", "Testing EventRecurrenceTypes, value: "+t+"<br>"+result);
  },
  
  onAddressBookItemsFound : function()
  {
//     Widget.PIM.onAddressBookItemsFound = function(results)
//     {
//       var result = "";
//       for ( var i = 0; i < results.length; i++ )
//         result += "<br>"+results[i].fullName;
//       
//       showResult("Widget.PIM.onAddressBookItemsFound() [callback]", "Address book item names found: <br>"+result);
//     };
    this.findAddressBookItems();
  },
  
  onCalendarItemAlert : function()
  {
    Widget.PIM.onCalendarItemAlert = function(item)
    {
      showResult("Widget.PIM.onCalendarItemAlert() [callback]", "calendar item alert caught, event name: "+item.eventName);
    };
  },
  
  onCalendarItemsFound : function()
  {
//     Widget.PIM.onCalendarItemsFound = function(results)
//     {
//       var result = "";
//       for ( var i = 0; i < results.length; i++ )
//         result += "<br>"+results[i].eventName;
//       
//       showResult("Widget.PIM.onAddressBookItemsFound() [callback]", "calendar items found: <br>"+result);
//     };
    this.findCalendarItems();
  },
    
  // complete
  createAddressBookItem : function()
  {
    var abi = Widget.PIM.createAddressBookItem();
    var result = abi instanceof Widget.PIM.AddressBookItem;
    
    showResult("PIM.createAddressBookItem()", "value of created address book item: "+abi+", instanceof Widget.PIM.AddressBookItem: "+result);
  },
  
  // complete
  addAddressBookItem : function()
  {
    common.createTestGuy("Test Guy 1");
    
    showResult("PIM.addAddressBookItem()", "Created address book item 'Test Guy 1'");
  },
  
  // complete
  createAddressBookGroup : function()
  {
    common.createTestGroup("Test Group 1");
    showResult("PIM.createAddressBookGroup()", "Created group: 'Test Group 1'");
  },
  
  getAddressBookGroupMembers : function()
  {
    common.createTestGuy("Test Guy G1-1");
    common.createTestGuy("Test Guy G1-2");
    
    common.createTestGroup("Test Group G1");
    
    Widget.PIM.onAddressBookItemsFound = function(results) 
    {
      var result = "Created new address book item 'Test Guy G1-1'<br>";
      var result = "Created new address book item 'Test Guy G1-2'<br>";
      result += "Created new address book group 'Test Group G1'<br>";
      
      var addrItem = results[0];
      result += "Found address item with id: "+addrItem.addressBookItemId+"<br>";
      
      for ( var i = 0; i < results.length; i++ )
      {
        result += "Added address book item id: "+results[i].addressBookItemId+" to group 'Test Group G1'<br>";
        results[i].setAddressGroupNames(["Test Group G1"], 1);
      }
      
      result += "Getting members for group 'Test Group G1'<br>";      
      var searchResults = Widget.PIM.getAddressBookGroupMembers("Test Group G1");
      for ( var i = 0; i < searchResults.length; i++ )
        result += "Member address book item id: "+searchResults[i].addressBookItemId;      
  
      showResult("Widget.PIM.getAddressBookGroupMembers()", result);
    };
    
    var comparison = new Widget.PIM.AddressBookItem();
    comparison.fullName = "Test Guy G1*";
    Widget.PIM.findAddressBookItems(comparison, 0, 10);
  },  
  
  // complete
  findAddressBookItems : function()
  {
    Widget.PIM.onAddressBookItemsFound = function(results) 
    {
      var result = "Searching for address book item 'Test*', 0-10<br>";
      for ( var i = 0; i < results.length; i++ )
        result += results[i].addressBookItemId+": "+results[i].fullName+"<br>";
      showResult("Widget.PIM.findAddressBookItems() [callback]", result);
    };
    
    var comparison = new Widget.PIM.AddressBookItem();
    comparison.fullName = "Test*";
    Widget.PIM.findAddressBookItems(comparison, 0, 2);
  },

  deleteAddressBookItem : function()
  {
    common.createTestGuy("Test Guy 5");

    Widget.PIM.onAddressBookItemsFound = function(results) 
    {
      var result = "Created new address book item 'Test Guy 5'<br>";
      
      var addrItem = results[0];
      result += "Found address item with id: "+addrItem.addressBookItemId+"<br>";
      
      Widget.PIM.deleteAddressBookItem(addrItem.addressBookItemId);
      result += "Deleted address item.<br>";
      showResult("Widget.PIM.deleteAddressBookItem()", result);
    };
    
    var comparison = Widget.PIM.createAddressBookItem();
    comparison.fullName = "Test Guy 5";
    Widget.PIM.findAddressBookItems(comparison, 0, 10);
  },  
  
  getAddressBookItem : function()
  {
    common.createTestGuy("Test Guy 7");

    Widget.PIM.onAddressBookItemsFound = function(results) 
    {
      //alert(results[0].addressBookItemId);
      var result = "Created new address book item 'Test Guy 7'<br>";
      
      var addrItem = results[0];
      result += "Found address item with id: "+addrItem.addressBookItemId+"<br>";
      
      var item = Widget.PIM.getAddressBookItem(addrItem.addressBookItemId);
      result += "Retrieved address item: "+item.addressBookItemId+"<br>";
      showResult("Widget.PIM.getAddressBookItem()", result);
    };
    
    var comparison = Widget.PIM.createAddressBookItem();
    comparison.fullName = "Test Guy 7";
    Widget.PIM.findAddressBookItems(comparison, 0, 10);
  },  
  
  getAddressBookItemsCount : function()
  {
    var count = Widget.PIM.getAddressBookItemsCount();
    showResult("PIM.getAddressBookItemsCount()", "Address book item count is: "+count);
  },
  
  getAvailableAddressGroupNames : function()
  {
    var result = "";
    var names = Widget.PIM.getAvailableAddressGroupNames();
    for ( var i = 0; i < names.length; i++ )
      result += names[i]+", ";
    showResult("PIM.getAvailableAddressGroupNames()", result);
  },
  
  addCalendarItem : function()
  {
    common.createTestCalendarItem("Test Event 1");
    showResult("PIM.addCalendarItem()", "Created calendar item 'Test Event 1'");
  },
  
  deleteAddressBookGroup : function()
  {
    common.createTestGroup("Test Group G5");
    var result = "Created group 'Test Group G5'<br>";
    
    Widget.PIM.deleteAddressBookGroup("Test Group G5");
    showResult("PIM.deleteAddressBookGroup()", result+"Deleted group 'Test Group G5'");
  },
  
  findCalendarItems : function()
  {
    common.createTestCalendarItem("Test Event 2");
    
    Widget.PIM.onCalendarItemsFound = function(results) 
    {
      var result = "Created new calendar item 'Test Event 2'<br>";
      
      result += "Found "+results.length+" calendar items with name 'Test Event 2'<br>";

      showResult("Widget.PIM.findCalendarItems()", result);
    };
    
    var comparison = new Widget.PIM.CalendarItem();
    comparison.eventName = "Test Event 2";
    Widget.PIM.findCalendarItems(comparison, 0, 2);
  },
  
  deleteCalendarItem : function()
  {
    common.createTestCalendarItem("Test Event 3");
    
    Widget.PIM.onCalendarItemsFound = function(results) 
    {
      var result = "Created new calendar item 'Test Event 3'<br>";
      
      result += "Found calendar item with id: "+results[0].calendarItemId+"<br>";
      
      Widget.PIM.deleteCalendarItem(results[0].calendarItemId);

      showResult("Widget.PIM.deleteCalendarItem()", result+"Deleted calendar item with id: "+results[0].calendarItemId);
    };
    
    var comparison = new Widget.PIM.CalendarItem();
    comparison.eventName = "Test Event 3";
    Widget.PIM.findCalendarItems(comparison, 0, 10);
  },
  
  getCalendarItem : function()
  {
    common.createTestCalendarItem("Test Event 4");
    
    Widget.PIM.onCalendarItemsFound = function(results) 
    {
      var result = "Created new calendar item 'Test Event 4'<br>";
      
      result += "Found calendar item with id: "+results[0].calendarItemId+"<br>";
      
      var item = Widget.PIM.getCalendarItem(results[0].calendarItemId);

      showResult("Widget.PIM.getCalendarItem()", result+"Retrieved calendar item with id: "+item.calendarItemId);
    };
    
    var comparison = new Widget.PIM.CalendarItem();
    comparison.eventName = "Test Event 4";
    Widget.PIM.findCalendarItems(comparison, 0, 10);
  },
  
  getCalendarItems : function()
  {
    var result = "Searching for calendar items between 2010-05-01 10:00:54 and 2010-05-31 10:00:54<br>";
    var items = Widget.PIM.getCalendarItems("2010-05-01 10:00:54", "2010-05-31 10:00:54");
    
    for ( var i = 0; i < items.length; i++ )
      result += "Item id found: "+items[i].calendarItemId+"<br>";
    
    showResult("Widget.PIM.getCalendarItems()", result);
  },
  
  update : function()
  {
    common.createTestCalendarItem("Test Event 5");
    
    Widget.PIM.onCalendarItemsFound = function(results) 
    {
      var result = "Created new calendar item 'Test Event 5'<br>";
      
      result += "Found calendar item with id: "+results[0].calendarItemId+"<br>";
      
      results[0].eventName = "Test Event 5 Updated";
      
      results[0].update();

      showResult("Widget.PIM.getCalendarItem()", result+"Updated calendar item id: "+results[0].calendarItemId+" with new name 'Test Event 5 Updated'");
    };
    
    var comparison = Widget.PIM.createCalendarItem();
    comparison.eventName = "Test Event 5";
    Widget.PIM.findCalendarItems(comparison, 0, 10);
  },
};

var testABI = 
{
  getAttributeValue : function()
  {
    Widget.PIM.onAddressBookItemsFound = function(results) 
    {
      var result = "Got address book item 'Test Guy 9'<br>";
      
      var addrItem = results[0];
      result += "Found address item with id: "+addrItem.addressBookItemId+"<br>";
      
      var val = addrItem.getAttributeValue("PICTURE");
      result += "Got attribute PICTURE value: "+val+"<br>";
      showResult("Widget.PIM.getAttributeValue()", result);
    };
    
    var comparison = Widget.PIM.createAddressBookItem();
    comparison.fullName = "Test Guy 9";
    Widget.PIM.findAddressBookItems(comparison, 0, 10);
  },
  
  setAttributeValue : function()
  {
    common.createTestGuy("Test Guy 9");
    
    Widget.PIM.onAddressBookItemsFound = function(results) 
    {
      var result = "Created new address book item 'Test Guy 9'<br>";
      
      var addrItem = results[0];
      result += "Found address item with id: "+addrItem.addressBookItemId+"<br>";
      
      addrItem.setAttributeValue("PICTURE", "set value test");
      addrItem.update();
      result += "Set attribute PICTURE value 'set value test'<br>";
      showResult("Widget.PIM.setAttributeValue()", result);
    };
    
    var comparison = Widget.PIM.createAddressBookItem();
    comparison.fullName = "Test Guy 9";
    Widget.PIM.findAddressBookItems(comparison, 0, 10);
  },
  
  getAvailableAttributes : function()
  {
    Widget.PIM.onAddressBookItemsFound = function(results) 
    {
      var result = "";
      var attribs = results[0].getAvailableAttributes();
      for ( var i = 0; i < attribs.length; i++ )
        result += attribs[i]+", ";
      
      showResult("Widget.PIM.AddressBookItem.getAvailableAttributes()", result);
    };
    
    var comparison = Widget.PIM.createAddressBookItem();
    comparison.fullName = "Test Guy 7";
    Widget.PIM.findAddressBookItems(comparison, 0, 10);
  },
  
  update : function()
  {
    var result = "";
    
    common.createTestGuy("Test Guy 6");
    
    Widget.PIM.onAddressBookItemsFound = function(results) 
    {
      var result = "Created new address book item 'Test Guy 6'<br>";
      
      var addrItem = results[0];
      result += "Found address item with id: "+addrItem.addressBookItemId+"<br>";
      
      addrItem.fullName = "Test Guy 6-updated";
      addrItem.update();
      result += "Set full name to 'Test Guy 6-updated'<br>";
      showResult("Widget.PIM.update()", result);
    };
    
    var comparison = Widget.PIM.createAddressBookItem();
    comparison.fullName = "Test Guy 6";
    Widget.PIM.findAddressBookItems(comparison, 0, 10);
  },
  
  setAddressGroupNames : function()
  {
    common.createTestGuy("Test Guy G2-1");
    common.createTestGuy("Test Guy G2-2");
    
    common.createTestGroup("Test Group G2");
    
    Widget.PIM.onAddressBookItemsFound = function(results) 
    {
      var result = "Created new address book item 'Test Guy G2-1'<br>";
      var result = "Created new address book item 'Test Guy G2-2'<br>";
      result += "Created new address book group 'Test Group G2'<br>";

      for ( var i = 0; i < results.length; i++ )
      {
        result += "Added address book item id: "+results[i].addressBookItemId+" to group 'Test Group G2'<br>";
        var groupList = new Array();
        groupList.push("Test Group G2");
        results[i].setAddressGroupNames(groupList, 1);
      } 
      
      showResult("Widget.PIM.AddressBookItem.setAddressGroupNames()", result);
    };
    
    var comparison = Widget.PIM.createAddressBookItem();
    comparison.fullName = "Test Guy G2*";
    Widget.PIM.findAddressBookItems(comparison, 0, 10);
  },
  
  getAddressGroupNames : function()
  {
    common.createTestGuy("Test Guy G3-1");
    
    common.createTestGroup("Test Group G3");
    common.createTestGroup("Test Group G4");
    
    Widget.PIM.onAddressBookItemsFound = function(results) 
    {
      var result = "Created new address book item 'Test Guy G3-1'<br>";
      result += "Created new address book group 'Test Group G3'<br>";
      result += "Created new address book group 'Test Group G4'<br>";
      
      var addrItem = results[0];
      result += "Found address item with id: "+addrItem.addressBookItemId+"<br>";
      
      var groupList = new Array();
      groupList.push("Test Group G3");
      groupList.push("Test Group G4");
      addrItem.setAddressGroupNames(groupList, groupList.length);
      
      result += "Added address book item id: "+addrItem.addressBookItemId+" to group 'Test Group G3' and 'Test Group 4'<br>";
      
      var searchResults = addrItem.getAddressGroupNames();
      for ( var i = 0; i < searchResults.length; i++ )
        result += "Address book item is a member of group: "+searchResults[i]+"<br>";
      
      showResult("Widget.PIM.AddressBookItem.getAddressGroupNames()", result);
    };
    
    var comparison = new Widget.PIM.AddressBookItem(); 
    comparison.fullName = "Test Guy G3*";
    Widget.PIM.findAddressBookItems(comparison, 0, 10);
  },
};

var common =
{
  createTestGuy : function(name)
  {
    var abi = new Widget.PIM.AddressBookItem();    
    abi.address = "123 Fake Street";
    abi.company = "Vodafone";
    abi.eMail = "fake@jil.org";
    abi.fullName = name;
    abi.homePhone = "+19255551233";
    abi.mobilePhone = "+19255551234";
    abi.title = "Some Fake Guy";
    abi.workPhone = "+19255551235";
    Widget.PIM.addAddressBookItem(abi);
  },
  
  createTestGroup : function(name)
  {
    Widget.PIM.createAddressBookGroup(name);
  },
  
  createTestCalendarItem : function(eventName)
  {
    var ci = new Widget.PIM.CalendarItem();
    ci.alarmDate = new Date();
    ci.alarmed = false;
    ci.eventEndTime = new Date();
    ci.eventName = eventName;
    ci.eventNotes = "Some event notes.";
    ci.eventRecurrence = Widget.PIM.EventRecurrenceTypes.DAILY;
    ci.eventStartTime = new Date();    
    Widget.PIM.addCalendarItem(ci);
  },
};

function showResult(title, result)
{
  document.getElementById("results").style.display = "block";
  document.getElementById("results-title").innerHTML = title;
  document.getElementById("results-detail").innerHTML = result;
}

function closeResults()
{
  document.getElementById("results").style.display = "none";
  document.getElementById("results-title").innerHTML = "";
  document.getElementById("results-detail").innerHTML = "";
}

function waitForDelay(delay) 
{
  try
  {
    netscape.security.PrivilegeManager.enablePrivilege("UniversalXPConnect");

    // Get the current thread.
    var thread = Components.classes["@mozilla.org/thread-manager;1"].getService(Components.interfaces.nsIThreadManager).currentThread;

    // Create an inner property to be used later as a notifier.
    this.delayed = true;

    setTimeout("this.delayed = false;", delay);

    while (this.delayed)
      thread.processNextEvent(true);
  }
  catch(e) 
  {  
  } 
}







