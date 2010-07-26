// progress listener to inject the widget script as quickly as possible for the widget's browser
var jweInjector =
{
  isLoaded : false,
  
  QueryInterface: function(aIID)
  {
   if (aIID.equals(Components.interfaces.nsIWebProgressListener) ||
       aIID.equals(Components.interfaces.nsISupportsWeakReference) ||
       aIID.equals(Components.interfaces.nsISupports))
     return this;
   throw Components.results.NS_NOINTERFACE;
  },

  onStateChange: function(aWebProgress, aRequest, aFlag, aStatus)
  {
    if (aFlag & Components.interfaces.nsIWebProgressListener.STATE_START)
      jwe_emulator.injectScripts();
  },
  onProgressChange: function(aWebProgress, aRequest, curSelf, maxSelf, curTot, maxTot) {},
  onStatusChange: function(aWebProgress, aRequest, aStatus, aMessage) {},
  onSecurityChange: function(aWebProgress, aRequest, aState) {}
};

function jwe_setScrollArea()
{
  var windowHeight = window.innerHeight;
  var windowWidth = window.innerWidth;
  
  var workspaceHeight = $("jwe-scroll-container").node.clientHeight;
  var workspaceWidth = $("jwe-scroll-container").node.clientWidth;
  
  $("jwe-scroll-container").attr("maxheight", windowHeight-21);
  $("jwe-scroll-container").attr("minheight", windowHeight-21);
}

var jwe_emulator = 
{
  emulator : Components.classes["@jil.org/jilapi-emulatorruntime;1"].getService().wrappedJSObject,
  deviceWidth : null,
  deviceHeight : null,
  widgetWidth : null,
  widgetHeight : null,
  eventpanels : null,
  eventContexts : null,
  fileSystemMap : new Array(),
  eventsLoaded : false,
  currentPanel : null,

  init : function()
  {
    Components.utils.import("resource://transit-emulator/TransitCommon.jsm");  

    this.emulator.setEmulatorWindow(window);
    
    try
    {
      document.getElementById("jwe-emulator-content").addProgressListener(jweInjector);
    }
    catch(ex)
    {
      // ignore, probably already registered
      //dump("Could not load progress listener. Message: "+ex.message);
    }

    this.deviceWidth = this.emulator.getDeviceInfo().screenWidth;
    this.deviceHeight = this.emulator.getDeviceInfo().screenHeight;
    this.widgetWidth = this.emulator.getWidget().maxWidth;
    this.widgetHeight = this.emulator.getWidget().maxHeight;

    this.resizeScreen();

    $("jwe-emulator-widget-name").attr("value", this.emulator.getWidget().name);
    $("jwe-emulator-widget-version").attr("value", this.emulator.getWidget().version); 
    $("jwe-emulator-widget-author").attr("value", this.emulator.getWidget().author);  
    $("jwe-emulator-widget-heightwidth").attr("value", this.widgetWidth+" x "+this.widgetHeight);
    $("jwe-emulator-widget-description").attr("value", this.emulator.getWidget().description);    
    $("jwe-emulator-widget-icon").attr("src", this.emulator.getWidget().iconSrc);
        
    $("jwe-emulator-content").attr("src", this.emulator.getWidget().contentSrc);
    
    $("jwe-emulator-tools-box-profiles-list").node.parentNode.removeChild($("jwe-emulator-tools-box-profiles-list").node);
    var menupopup = document.createElement("menupopup");
    menupopup.setAttribute("id", "jwe-emulator-tools-box-profiles-list");
    var profiles = this.emulator.getAllDeviceProfiles();
    var profileIndex = 0;
    for ( var i = 0; i < profiles.length; i++ )
    {
      var menuitem = document.createElement("menuitem");
      menuitem.setAttribute("label", profiles[i].name);
      menuitem.setAttribute("value", profiles[i].id);
      menuitem.setAttribute("type", "radio");
      menuitem.setAttribute("name", "jwe-device-profiles");
      menuitem.setAttribute("oncommand", "jwe_emulator.reload(this);");
      if ( profiles[i].id == this.emulator.deviceProfile.id )
        menuitem.setAttribute("checked", "true");
      menupopup.appendChild(menuitem);
    }
    $("jwe-emulator-tools-box-profiles").add(menupopup);
    //$("jwe-emulator-tools-box-profiles").sel(profileIndex);

    $("jwe-log").val(this.emulator.getLog());
    
    Components.utils.import("resource://transit-emulator/1.2.2/Widget.jsm");
    Components.utils.import("resource://transit-emulator/1.2.2/WidgetManager.jsm");
    Components.utils.import("resource://transit-emulator/1.2.2/SecurityManager.jsm");
    
    jwe_setScrollArea();
    
    window.onresize = jwe_setScrollArea;
  },

  loadWidgetEvents : function()
  {
    if ( this.eventsLoaded == true )
      return;
    
    this.eventPanels = new Array("widget", "device", "devicestate", "power", "network", "radio", "messaging", "audio", "video", "camera", "pim", "telephony");
    
    this.eventContexts = new Array("onfocus", "onmaximize", "onrestore", "onwakeup", "onfilesfound", "onflip", "onposition", "onscreenchange", "onchargelevel", "onchargestate", "onlowbattery", "onnetworkchange", "onsignalchange", "onmessagearrived", "onmessagesendingfailure", "onmessagesfound", "audioonstatechange", "videoonstatechange", "oncameracaptured", "onaddressbookitemsfound", "oncalendaritemalert", "oncalendaritemsfound", "onvcardexportingfinish", "oncallevent", "oncallrecordsfound");

    // pre-populate position event data
    var positionInfo = this.emulator.getPositionInfo();
    $("jwe-emulator-subtab-event-context-onposition-accuracy").val(positionInfo.accuracy);
    $("jwe-emulator-subtab-event-context-onposition-altitude").val(positionInfo.altitude);
    $("jwe-emulator-subtab-event-context-onposition-altitudeaccuracy").val(positionInfo.altitudeAccuracy);
    $("jwe-emulator-subtab-event-context-onposition-cellid").val(positionInfo.cellID);
    $("jwe-emulator-subtab-event-context-onposition-latitude").val(positionInfo.latitude);
    $("jwe-emulator-subtab-event-context-onposition-longitude").val(positionInfo.longitude);

    // populate screen dimensions
    var deviceInfo = this.emulator.getDeviceInfo();
    $("jwe-emulator-subtab-event-context-onscreenchange-newheight").val(deviceInfo.screenHeight);
    $("jwe-emulator-subtab-event-context-onscreenchange-newwidth").val(deviceInfo.screenWidth);

    // populate charge levels
    var powerInfo = this.emulator.getPowerInfo();
    $("jwe-emulator-subtab-event-context-onchargelevel-newlevel").val(powerInfo.percentRemaining);
    $("jwe-emulator-subtab-event-context-onlowbattery-remaining").val(powerInfo.percentRemaining);

    // populate the data network types
    var dataNetworks = this.emulator.getDataNetworkInfo();
    $("jwe-emulator-subtab-event-context-onnetworkchange-type").node.removeAllItems();
    var dnMenupopup = document.createElement("menupopup");
    dnMenupopup.setAttribute("id", "jwe-emulator-subtab-event-context-onnetworkchange-type-list");
    for ( var i = 0; i < dataNetworks.length; i++ )
    {
      var menuitem = document.createElement("menuitem");
      menuitem.setAttribute("label", dataNetworks[i].nickname+" ("+dataNetworks[i].type+")");
      menuitem.setAttribute("value", dataNetworks[i].nickname);
      dnMenupopup.appendChild(menuitem);
    }
    $("jwe-emulator-subtab-event-context-onnetworkchange-type").add(dnMenupopup);
    $("jwe-emulator-subtab-event-context-onnetworkchange-type").sel(0);

    // populate the list of messages
    var allMessages = this.emulator.getAllMessages();
    $("jwe-emulator-subtab-event-context-onmessagearrived-messages").node.removeAllItems();
    var msgMenupopup = document.createElement("menupopup");
    msgMenupopup.setAttribute("id", "jwe-emulator-subtab-event-context-onmessagearrived-messages-list");
    for ( var i = 0; i < allMessages.length; i++ )
    {
      var menuitem = document.createElement("menuitem");
      menuitem.setAttribute("label", allMessages[i].subject+" (Source: "+allMessages[i].sourceAddress+")");
      menuitem.setAttribute("value", allMessages[i].id);
      msgMenupopup.appendChild(menuitem);
    }
    $("jwe-emulator-subtab-event-context-onmessagearrived-messages").add(msgMenupopup);
    $("jwe-emulator-subtab-event-context-onmessagearrived-messages").sel(0);
    
    var msgfailMenupopup = document.createElement("menupopup");
    msgfailMenupopup.setAttribute("id", "jwe-emulator-subtab-event-context-onmessagefailure-messages-list");
    for ( var i = 0; i < allMessages.length; i++ )
    {
      var menuitem = document.createElement("menuitem");
      menuitem.setAttribute("label", allMessages[i].subject+" (Source: "+allMessages[i].sourceAddress+")");
      menuitem.setAttribute("value", allMessages[i].id);
      msgfailMenupopup.appendChild(menuitem);
    }
    $("jwe-emulator-subtab-event-context-onmessagefailure-messages").add(msgfailMenupopup);
    $("jwe-emulator-subtab-event-context-onmessagefailure-messages").sel(0);
    
    // populate file systems        
    var fileSystems = this.emulator.getFileSystems();
    $("jwe-emulator-subtab-event-context-oncameracaptured-rootpaths").node.removeAllItems();
    var fsMenupopup = document.createElement("menupopup");
    fsMenupopup.setAttribute("id", "jwe-emulator-subtab-event-context-oncameracaptured-rootpaths-list");
    for ( var i = 0; i < fileSystems.length; i++ )
    {
      var menuitem = document.createElement("menuitem");
      menuitem.setAttribute("label", fileSystems[i].rootPath);
      menuitem.setAttribute("value", fileSystems[i].id);
      fsMenupopup.appendChild(menuitem);
      this.fileSystemMap[fileSystems[i].id] = fileSystems[i].localPath;
      
      if ( i == 0 )
        $("jwe-emulator-subtab-event-context-oncameracaptured-localpath").val(fileSystems[i].localPath);
    }
    $("jwe-emulator-subtab-event-context-oncameracaptured-rootpaths").add(fsMenupopup);   
    $("jwe-emulator-subtab-event-context-oncameracaptured-rootpaths").sel(0);
    
    // populate calendar items
    var calItems = this.emulator.getCalendarItems();
    $("jwe-emulator-subtab-event-context-oncalendaritemalert-calitems").node.removeAllItems();
    var ciMenupopup = document.createElement("menupopup");
    ciMenupopup.setAttribute("id", "jwe-emulator-subtab-event-context-oncalendaritemalert-calitems-list");
    for ( var i = 0; i < calItems.length; i++ )
    {
      var menuitem = document.createElement("menuitem");
      menuitem.setAttribute("label", calItems[i].name);
      menuitem.setAttribute("value", calItems[i].id);
      ciMenupopup.appendChild(menuitem);
    }
    $("jwe-emulator-subtab-event-context-oncalendaritemalert-calitems").add(ciMenupopup);
    $("jwe-emulator-subtab-event-context-oncalendaritemalert-calitems").sel(0);
    
    this.eventsLoaded = true;
  },

  resizeScreen : function()
  {
    $("jwe-emulator-workspace").attr("maxheight", this.deviceHeight+2);
    $("jwe-emulator-workspace").attr("minheight", this.deviceHeight+2);

    $("jwe-emulator-workspace").attr("maxwidth", this.deviceWidth+2);
    $("jwe-emulator-workspace").attr("minwidth", this.deviceWidth+2);

    var contentHeight = this.widgetHeight;
    var contentWidth = this.widgetWidth;

    $("jwe-emulator-content").css("height", contentHeight+"px");
    $("jwe-emulator-content").css("width", contentWidth+"px");
  },

  switchEventPanel : function(switchTo, menuItem)
  {
    if ( this.eventsLoaded == false )
      this.loadWidgetEvents();
    
    menuItem.setAttribute("checked", "true");    
    this.currentPanel = menuItem.getAttribute("value");
    
    for( var i = 0; i < this.eventPanels.length; i++ )
      $("jwe-emulator-subtab-"+this.eventPanels[i]).css("display", "none");
    
    $("jwe-emulator-subtab-"+switchTo).css("display", "block");
  },

  toggleOverflow : function()
  {
    if ( $("jwe-emulator-settings-overflow").chk() )
      $("jwe-emulator-content").css("overflow", "hidden");
    else
      $("jwe-emulator-content").css("overflow", "auto");
  },

  toggleFullScreen : function()
  {
    if ( $("jwe-emulator-settings-fullscreen").chk() )
    { 
      $("jwe-emulator-content").css("height", this.deviceHeight+"px");
      $("jwe-emulator-content").css("width", this.deviceWidth+"px");
    }
    else
    {
      // if the widget size is larger than the screen size, size the widget to fit
      if ( this.emulator.getWidget().maxHeight > this.deviceHeight )
        $("jwe-emulator-content").css("height", this.deviceHeight-2+"px");
      else
        $("jwe-emulator-content").css("height", this.emulator.getWidget().maxHeight+"px");
      
      if ( this.emulator.getWidget().maxWidth > this.deviceWidth )
        $("jwe-emulator-content").css("width", this.deviceWidth-2+"px");
      else
        $("jwe-emulator-content").css("width", this.emulator.getWidget().maxWidth+"px");
    }
    
    // resizing the widget reloads page scope, need to re-inject widget API
    // actually I dont think it does anymore, need to double check
    this.injectScripts();
  },
  
  toggleLandscape : function()
  {
    // swap height and width
    var curWidth = this.deviceWidth;
    var curHeight = this.deviceHeight;
    
    this.deviceWidth = curHeight;
    this.deviceHeight = curWidth;
    this.resizeScreen();
    
    this.emulator.invokeDSOnScreenChangeDimensions(this.deviceWidth, this.deviceHeight);
    
    // to maintain full screen mode if it's checked
    this.toggleFullScreen();
  },

  reload: function(element)
  {
    $("jwe-log").val(this.emulator.getLog());
    $("jwe-emulator-content").attr("src", "about:blank");
    $("jwe-emulator-content").attr("src", this.emulator.getWidget().contentSrc);
    
    this.clearLog();   

    if ( element != null )
      this.emulator.reload(element.value);
    else
      this.emulator.reload(this.emulator.deviceProfile.id);
      
    SecurityManager.reset();
    this.init();
    // will keep the widget in full screen mode if the checkbox is checked.
    this.toggleFullScreen();
    
    // switch to portrait mode by default
    $("jwe-emulator-settings-landscape").chk(false);
    
    // have the window reload events too, in the case that values have been changed by the user
    this.eventsLoaded = false;
    
    // tell the widget module in the widget's scope to reset itself and re-read all device profile values
    $("jwe-emulator-content").node.contentWindow.window["Widget"].reset();
  },

  clearLog : function ()
  {
    $("jwe-log").val("");
    this.emulator.clearLog();
  },

  unload : function()
  {
  },

  readConfig : function(inTab, event)
  {
    if ( (event != null) && (event.button != 0) )
      return;
    
    if ( inTab )
    {
      this.emulator.emulateWidget(content.location.pathname, content.document.documentElement, null, false);
      gBrowser.selectedTab = gBrowser.addTab("chrome://transit-emulator/content/emulator/emulator.xul");
    }
    else
      this.emulator.emulateWidget(content.location.pathname, content.document.documentElement, null, true);
  },

  logViewer : function()
  {
    this.emulator.showLogViewer();
  },

  launchProfiles : function()
  {
    this.emulator.showProfiles();
  },

  launchControls : function()
  {
    this.emulator.showControls();
  },

  showEventContext : function(context)
  {
    for( var i = 0; i < this.eventContexts.length; i++ )
      $("jwe-emulator-subtab-event-context-"+this.eventContexts[i]).css("display", "none");
    
    $("jwe-emulator-subtab-event-context-"+context).css("display", "block");
    
    this.currentContext = context;
  },
  
  triggerEvent : function()
  {
    var selected = this.currentPanel;
    var delay = $("jwe-emulator-subtab-event-context-delay").val();
    
    // if there is a delay, disable the trigger button until the event is executed
    if ( delay > 0 )
      $("jwe-emulator-subtab-event-trigger-button").disable(true);
    
    // wait x milliseconds before triggering the event
    jwe_waitForDelay(delay);
    
    if ( selected == "widget" )
      this.triggerWidgetEvent();
    else if ( selected == "device" )
      this.triggerDeviceEvent();
    else if ( selected == "devicestate" )
      this.triggerDeviceStateEvent();
    else if ( selected == "power" )
      this.triggerPowerInfoEvent();
    else if ( selected == "network" )
      this.triggerDataNetworkEvent();
    else if ( selected == "radio" )
      this.triggerRadioEvent();
    else if ( selected == "messaging" )
      this.triggerMessagingEvent();
    else if ( selected == "audio" )
      this.triggerAudioEvent();
    else if ( selected == "video" )
      this.triggerVideoEvent();
    else if ( selected == "camera" )
      this.triggerCameraEvent();
    else if ( selected == "pim" )
      this.triggerPIMEvent();
    else if ( selected == "telephony" )
      this.triggerTelephonyEvent();
    
    if ( delay > 0 )
      $("jwe-emulator-subtab-event-trigger-button").disable(false);
  },

  triggerWidgetEvent : function()
  {
    if ( $("jwe-emulator-subtab-widget-event").val() == "onFocus" )
      this.emulator.invokeWOnFocus();

    else if ( $("jwe-emulator-subtab-widget-event").val() == "onMaximize" )
    {
      if ( $("jwe-emulator-subtab-event-context-onmaximize-forcemax").chk() )
      {
        if ( ! $("jwe-emulator-settings-fullscreen").chk() )
        {
          $("jwe-emulator-content").css("height", this.deviceHeight+"px");
          $("jwe-emulator-content").css("width", this.deviceWidth+"px");
          $("jwe-emulator-settings-fullscreen").chk(true);
        }
      }
      this.emulator.invokeWOnMaximize();
    }

    else if ( $("jwe-emulator-subtab-widget-event").val() == "onRestore" )
      this.emulator.invokeWOnRestore();

    else if ( $("jwe-emulator-subtab-widget-event").val() == "onWakeup" )
      this.emulator.invokeWOnWakeup();
  },

  triggerDeviceEvent : function()
  {
    if ( $("jwe-emulator-subtab-device-event").val() == "onFilesFound" )
      this.emulator.invokeDOnFilesFound();
  },

  triggerDeviceStateEvent : function()
  {
    if ( $("jwe-emulator-subtab-devicestate-event").val() == "onFlipEvent" )
      this.emulator.invokeDSOnFlipEvent($("jwe-emulator-subtab-event-context-onflip-fliptrue").chk());

    else if ( $("jwe-emulator-subtab-devicestate-event").val() == "onPositionRetrieved" )
    {
      var positionInfo = Components.classes["@jil.org/jilapi-positioninfo;1"].createInstance(Components.interfaces.jilPositionInfo);

      if ( !$("jwe-emulator-subtab-event-context-onposition-failure").chk() )
      {
        positionInfo.accuracy = $("jwe-emulator-subtab-event-context-onposition-accuracy").val();
        positionInfo.altitude = $("jwe-emulator-subtab-event-context-onposition-altitude").val();
        positionInfo.altitudeAccuracy = $("jwe-emulator-subtab-event-context-onposition-altitudeaccuracy").val();
        positionInfo.cellID = $("jwe-emulator-subtab-event-context-onposition-cellid").val();
        positionInfo.latitude = $("jwe-emulator-subtab-event-context-onposition-latitude").val();
        positionInfo.longitude = $("jwe-emulator-subtab-event-context-onposition-longitude").val();
        positionInfo.timeStamp = new Date();
      }
      else
        positionInfo.failure = true;

      this.emulator.invokeDSOnPositionRetrieved(positionInfo);
    }
    else if ( $("jwe-emulator-subtab-devicestate-event").val() == "onScreenChangeDimensions" )
    {
      var newHeight = $("jwe-emulator-subtab-event-context-onscreenchange-newheight").val();
      var newWidth = $("jwe-emulator-subtab-event-context-onscreenchange-newwidth").val();

      if ( $("jwe-emulator-subtab-event-context-onscreenchange-resize").chk() )
      {
        this.deviceWidth = parseInt(newWidth);
        this.deviceHeight = parseInt(newHeight);
        this.resizeScreen();
      }
      this.emulator.invokeDSOnScreenChangeDimensions(newWidth, newHeight);
    }
  },

  togglePositionContext : function()
  {
    if ( $("jwe-emulator-subtab-event-context-onposition-failure").chk() )
    {
      $("jwe-emulator-subtab-event-context-onposition-accuracy").disable(true);
      $("jwe-emulator-subtab-event-context-onposition-altitude").disable(true);
      $("jwe-emulator-subtab-event-context-onposition-altitudeaccuracy").disable(true);
      $("jwe-emulator-subtab-event-context-onposition-cellid").disable(true);
      $("jwe-emulator-subtab-event-context-onposition-latitude").disable(true);
      $("jwe-emulator-subtab-event-context-onposition-longitude").disable(true);
    }
    else
    {
      $("jwe-emulator-subtab-event-context-onposition-accuracy").disable(false);
      $("jwe-emulator-subtab-event-context-onposition-altitude").disable(false);
      $("jwe-emulator-subtab-event-context-onposition-altitudeaccuracy").disable(false);
      $("jwe-emulator-subtab-event-context-onposition-cellid").disable(false);
      $("jwe-emulator-subtab-event-context-onposition-latitude").disable(false);
      $("jwe-emulator-subtab-event-context-onposition-longitude").disable(false);
    }
  },

  triggerPowerInfoEvent : function()
  {
    if ( $("jwe-emulator-subtab-power-event").val() == "onChargeLevelChange" )
      this.emulator.invokePOnChargeLevelChange($("jwe-emulator-subtab-event-context-onchargelevel-newlevel").val());

    if ( $("jwe-emulator-subtab-power-event").val() == "onChargeStateChange" )
      this.emulator.invokePOnChargeStateChange($("jwe-emulator-subtab-event-context-onchargestate-state").val());

    if ( $("jwe-emulator-subtab-power-event").val() == "onLowBattery" )
      this.emulator.invokePOnLowBattery($("jwe-emulator-subtab-event-context-onlowbattery-remaining").val());
  },

  triggerDataNetworkEvent : function()
  {
    if ( $("jwe-emulator-subtab-network-event").val() == "onNetworkConnectionChanged" )
      this.emulator.invokeDNOnNetworkConnectionChanged($("jwe-emulator-subtab-event-context-onnetworkchange-type").val());
  },

  triggerRadioEvent : function()
  {
    if ( $("jwe-emulator-subtab-radio-event").val() == "onSignalSourceChange" )
      this.emulator.invokeROnSignalSourceChange($("jwe-emulator-subtab-event-context-onsignalchange-source").val(), $("jwe-emulator-subtab-event-context-onsignalchange-roaming").chk());
  },
  
  triggerMessagingEvent : function()
  {
    if ( $("jwe-emulator-subtab-messaging-event").val() == "onMessageArrived" )
      this.emulator.invokeMOnMessageArrived($("jwe-emulator-subtab-event-context-onmessagearrived-messages").selValue());
    
    else if ( $("jwe-emulator-subtab-messaging-event").val() == "onMessageSendingFailure" )
      this.emulator.invokeMOnMessageSendingFailure($("jwe-emulator-subtab-event-context-onmessagefailure-messages").selValue(), $("jwe-emulator-subtab-event-context-onmessagefailure-error").val());
  },
  
  triggerAudioEvent : function()
  {
    if ( $("jwe-emulator-subtab-audio-event").val() == "onStateChange" )
      this.emulator.invokeAOnStateChange($("jwe-emulator-subtab-event-context-audioonstatechange-state").selValue());
  },
  
  triggerVideoEvent : function()
  {
    if ( $("jwe-emulator-subtab-video-event").val() == "onStateChange" )
      this.emulator.invokeVOnStateChange($("jwe-emulator-subtab-event-context-videoonstatechange-state").selValue());
  },
    
  triggerCameraEvent : function()
  {
    if ( $("jwe-emulator-subtab-camera-event").val() == "onCameraCaptured" )
      this.emulator.invokeCOnCameraCapture($("jwe-emulator-subtab-event-context-oncameracaptured-sentfile").val());
  },
  
  triggerPIMEvent : function()
  {
    if ( $("jwe-emulator-subtab-pim-event").val() == "onCalendarItemAlert" )
      this.emulator.invokePOnCalendarItemAlert($("jwe-emulator-subtab-event-context-oncalendaritemalert-calitems").selValue());
  },  
  
  triggerTelephonyEvent : function()
  {
    if ( $("jwe-emulator-subtab-telephony-event").val() == "onCallEvent" )
      this.emulator.invokeTOnCallEvent($("jwe-emulator-subtab-event-context-oncallevent-type").selValue(), $("jwe-emulator-subtab-event-context-oncallevent-number").val());
  },  
  
  changeCameraPaths : function()
  {
    var localPath = this.fileSystemMap[$("jwe-emulator-subtab-event-context-oncameracaptured-rootpaths").selValue()];
    var devicePath = $("jwe-emulator-subtab-event-context-oncameracaptured-rootpaths").selLabel();
    var enteredFile = $("jwe-emulator-subtab-event-context-oncameracaptured-filename").val();

    $("jwe-emulator-subtab-event-context-oncameracaptured-localpath").val(localPath);
    if ( enteredFile != "" )
    {
      var sentFile = devicePath + enteredFile;
      sentFile = sentFile.replace("//", "/");
      
      var localFile = localPath + enteredFile;
      localFile = localFile.replace("//", "/");
        
      $("jwe-emulator-subtab-event-context-oncameracaptured-localfile").val(localFile);
      $("jwe-emulator-subtab-event-context-oncameracaptured-sentfile").val(sentFile);
    }
  },
  
  launchErrorConsole : function()
  {
    window.open("chrome://global/content/console.xul", "_blank",  "chrome,extrachrome,menubar,resizable,scrollbars,status,toolbar");
  },
  
  copyLog : function()
  {
    Components.classes["@mozilla.org/widget/clipboardhelper;1"].getService(Components.interfaces.nsIClipboardHelper).copyString($("jwe-log").val());  
  },
  
  injectScripts : function()
  {
    // pass the show yes/no dialog to the widget wrapper so it can activate the prompt
    SecurityManager.showYesNoDialog = jwe_emulator.showYesNoDialog;
    SecurityManager.securityContext = $("jwe-emulator-settings-security-level").val();

    Components.utils.import("resource://transit-emulator/1.2.2/Widget.jsm", $("jwe-emulator-content").node.contentWindow.window);
    Components.utils.import("resource://transit-emulator/1.2.2/WidgetManager.jsm", $("jwe-emulator-content").node.contentWindow.window);
    Components.utils.import("resource://transit-emulator/1.2.2/XMLHttpRequest.jsm", $("jwe-emulator-content").node.contentWindow.window);
  },
  
  toggleSecurityLevel : function()
  {
    SecurityManager.reset();
    SecurityManager.securityContext = $("jwe-emulator-settings-security-level").val();
  },
  
  showYesNoDialog : function(title, body, yesCallback, noCallback)
  {
    $("jwe-runtime-dialog-yes").node.onclick = function()
    {
      $("jwe-runtime-dialog-bg").css("display", "none");
      
      yesCallback.call();
    };
        
    $("jwe-runtime-dialog-no").node.onclick = function()
    {
      $("jwe-runtime-dialog-bg").css("display", "none");
      
      noCallback.call();
    };
    
    $("jwe-runtime-dialog-title-text").val(title);
    $("jwe-runtime-dialog-body-text").val(body);
    
    $("jwe-runtime-dialog-bg").css("display", "block");
        
    $("jwe-runtime-dialog-bg").css("height", jwe_emulator.deviceHeight+"px");
    $("jwe-runtime-dialog-bg").css("width", jwe_emulator.deviceWidth+"px");
  },
  
  openWidgetFile : function()
  {
    var nsIFilePicker = Components.interfaces.nsIFilePicker;
    var fp = Components.classes["@mozilla.org/filepicker;1"].createInstance(nsIFilePicker);
    fp.init(window, "Select a JIL Widget config.xml", nsIFilePicker.modeOpen);
    fp.appendFilter("JIL Widget config.xml File (*.xml)","*.xml");
    
    var res = fp.show();
    // accept an OK 
    if ( res == nsIFilePicker.returnOK )
    {
      var req = new XMLHttpRequest();
      req.open("GET", "file://"+fp.file.path, false); 
      req.send(null);
      this.emulator.emulateWidget(fp.file.path, req.responseXML.documentElement, null, true);
    }
  },
  
  openProjectPage : function()
  {
    var wm = Components.classes["@mozilla.org/appshell/window-mediator;1"].getService(Components.interfaces.nsIWindowMediator);
    var mainWindow = wm.getMostRecentWindow("navigator:browser");
    mainWindow.gBrowser.selectedTab = mainWindow.gBrowser.addTab("http://code.google.com/p/transit-widget-tools");
  },
  
  openIssuesPage : function()
  {
    var wm = Components.classes["@mozilla.org/appshell/window-mediator;1"].getService(Components.interfaces.nsIWindowMediator);
    var mainWindow = wm.getMostRecentWindow("navigator:browser");
    mainWindow.gBrowser.selectedTab = mainWindow.gBrowser.addTab("http://code.google.com/p/transit-widget-tools/issues/list");
  },
  
  openDiscussPage : function()
  {
    var wm = Components.classes["@mozilla.org/appshell/window-mediator;1"].getService(Components.interfaces.nsIWindowMediator);
    var mainWindow = wm.getMostRecentWindow("navigator:browser");
    mainWindow.gBrowser.selectedTab = mainWindow.gBrowser.addTab("http://groups.google.com/group/transit-widget-tools-discuss");
  },
  
  openJILPage : function()
  {
    var wm = Components.classes["@mozilla.org/appshell/window-mediator;1"].getService(Components.interfaces.nsIWindowMediator);
    var mainWindow = wm.getMostRecentWindow("navigator:browser");
    mainWindow.gBrowser.selectedTab = mainWindow.gBrowser.addTab("http://www.jil.org");
  },
  
  openAboutDialog: function()
  {
    var em = Components.classes["@mozilla.org/extensions/manager;1"].getService(Components.interfaces.nsIExtensionManager);
    openDialog("chrome://mozapps/content/extensions/about.xul", "", "chrome,centerscreen,modal", "urn:mozilla:item:{0bdb2530-7a5e-11df-93f2-0800200c9a66}", em.datasource);
  },
  
  pageDeck : function(index, button)
  {
    $("jwe-emulator-tools-box-gen").chk(false);
    $("jwe-emulator-tools-box-events").chk(false);
    $("jwe-emulator-tools-box-log").chk(false);
    //$("jwe-emulator-tools-box-state").chk(false);
    
    button.checked = true;
    
    $("jwe-emulator-tools-deck").node.selectedIndex = index;
  },
  
  showCallbackValue : function()
  {
    if ( ! this.emulator.getFromCache(this.currentContext) )
      $("jwe-emulator-callback-panel-source").val("Callback function for this event is not currently set.");
    else
      $("jwe-emulator-callback-panel-source").val(this.emulator.getFromCache(this.currentContext));

    $("jwe-emulator-callback-panel").node.openPopup(document.getElementById('jwe-emulator-subtab-event-trigger-button'), 'after_end', 0, -5, false, false);
  },
};

function jwe_waitForDelay(delay) 
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