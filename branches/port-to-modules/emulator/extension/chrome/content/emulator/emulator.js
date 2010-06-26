function jwe_injectScripts()
{
  var iframeEl = document.getElementById("jwe-emulator-content");   
  
//   var element = iframeEl.contentDocument.createElement("widget-reference"); 
//   element.setAttribute("id", "widget-reference-data");
//   element.setAttribute("device", Components.classes["@jil.org/jilapi-device;1"].createInstance(Components.interfaces.jilDevice));
//   iframeEl.contentDocument.documentElement.appendChild(element);
  
  var script = iframeEl.contentDocument.createElement('script');
  script.id = 'apiWrapper';
  script.type = 'text/javascript';
  script.src = "chrome://transit-emulator/content/emulator/JIL122aWrapper.js";
  iframeEl.contentDocument.documentElement.appendChild(script);
}

var jwe_emulator = 
{
  emulator : Components.classes["@jil.org/jilapi-emulatorruntime;1"].getService().wrappedJSObject,
  deviceWidth : null,
  deviceHeight : null,
  widgetWidth : null,
  widgetHeight : null,
  roomForDragBorder : true,
  eventpanels : null,
  eventContexts : null,
  fileSystemMap : new Array(),

  init : function()
  {
    this.deviceWidth = this.emulator.getDeviceInfo().screenWidth;
    this.deviceHeight = this.emulator.getDeviceInfo().screenHeight;
    this.widgetWidth = this.emulator.getWidget().maxWidth;
    this.widgetHeight = this.emulator.getWidget().maxHeight;

    this.resizeScreen();

    $("jwe-emulator-widget-name").attr("value", this.emulator.getWidget().name);
    $("jwe-emulator-widget-name-version").attr("value", this.emulator.getWidget().version);
     
    $("jwe-emulator-content").attr("src", this.emulator.getWidget().contentSrc);

    $("jwe-emulator-content").hide();

    $("jwe-emulator-loadedprofile").node.removeAllItems();
    var menupopup = document.createElement("menupopup");
    menupopup.setAttribute("id", "jwe-emulator-loadedprofile-list");
    var profiles = this.emulator.getAllDeviceProfiles();
    var profileIndex = 0;
    for ( var i = 0; i < profiles.length; i++ )
    {
      var menuitem = document.createElement("menuitem");
      menuitem.setAttribute("label", profiles[i].name);
      menuitem.setAttribute("value", profiles[i].id);
      menupopup.appendChild(menuitem);
      if ( profiles[i].id == this.emulator.deviceProfile.id )
        profileIndex = i;
    }
    $("jwe-emulator-loadedprofile").add(menupopup);
    $("jwe-emulator-loadedprofile").sel(profileIndex);

    $("jwe-log").val(this.emulator.getLog());
    
    
  },
   
  loadWidgetEvents : function()
  {
    this.eventPanels = new Array("widget", "device", "devicestate", "power", "network", "radio", "messaging", "audio", "video", "camera", "pim", "telephony");
    
    this.eventContexts = new Array("onfocus", "onmaximize", "onrestore", "onwakeup", "onfilesfound", "onflip", "onposition", "onscreenchange", "onchargelevel", "onchargestate", "onlowbattery", "onnetworkchange", "onsignalchange", "onmessagearrived", "onmessagesendingfailure", "onmessagesfound", "audioonstatechange", "videoonstatechange", "oncameracaptured", "onaddressbookitemsfound", "oncalendaritemalert", "oncalendaritemsfound", "onvcardexportingfinish", "oncallevent", "oncallrecordsfound");
    
    $("jwe-emulator-subtab-widget-event-list").sel(0);
    
    this.switchEventPanel("widget");

    // pre-populate position event data
    var positionInfo = this.emulator.getPositionInfo();
    $("jwe-emulator-subtab-event-context-onposition-accuracy").val(positionInfo.accuracy);
    $("jwe-emulator-subtab-event-context-onposition-altitude").val(positionInfo.altitude);
    $("jwe-emulator-subtab-event-context-onposition-altitudeaccuracy").val(positionInfo.altitudeAccuracy);
    $("jwe-emulator-subtab-event-context-onposition-cellid").val(positionInfo.cellId);
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
  },
    
  startEmulation : function()
  {
    // inject scripts into the iframe
    jwe_injectScripts();
    
    $("jwe-emulator-content").show();
    
    // set the event listener
    var iframeEl = document.getElementById("jwe-emulator-content");
    iframeEl.addEventListener("load", jwe_injectScripts, true);
    
    $("jwe-emulator-reload").disable(false);
    $("jwe-emulator-start").disable(true);
    
    $("jwe-emulator-widget-press-start").hide();
    $("jwe-emulator-widget-started").show();
  },
  
  resizeScreen : function()
  {
    $("jwe-emulator-workspace").attr("maxheight", this.deviceHeight);
    $("jwe-emulator-workspace").attr("minheight", this.deviceHeight);

    $("jwe-emulator-workspace").attr("maxwidth", this.deviceWidth);
    $("jwe-emulator-workspace").attr("minwidth", this.deviceWidth);

    var containerHeight = this.widgetHeight+25;
    var containerWidth = this.widgetWidth+25;
    $("jwe-emulator-container").css("height", containerHeight+"px");
    $("jwe-emulator-container").css("width", containerWidth+"px");

    var contentHeight = this.widgetHeight;
    var contentWidth = this.widgetWidth;

    // if the drag container is larger than the screen size, don't show it
    if ( (contentHeight >= this.deviceHeight) ||
         (contentWidth >= this.deviceWidth) )
    {
      this.removeDragBorder();
      this.roomForDragBorder = false;
    }

    $("jwe-emulator-content").css("height", contentHeight+"px");
    $("jwe-emulator-content").css("width", contentWidth+"px");
  },

  switchEventPanel : function(switchTo)
  {
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

  dragBorder : null,

  toggleFullScreen : function()
  {
    // detatch drag border
    if ( $("jwe-emulator-settings-fullscreen").chk() )
    { 
      this.removeDragBorder();

      $("jwe-emulator-content").css("height", this.deviceHeight+"px");
      $("jwe-emulator-content").css("width", this.deviceWidth+"px");
    }
    else
    {
      this.restoreDragBorder();

      $("jwe-emulator-content").css("height", this.emulator.getWidget().maxHeight+"px");
      $("jwe-emulator-content").css("width", this.emulator.getWidget().maxWidth+"px");
    }
  },

  restoreDragBorder : function()
  {
    if ( this.roomForDragBorder == false )
      return;

    var contentNode = $("jwe-emulator-content").node;
    $("jwe-emulator-workspace").node.removeChild(contentNode);
    $("jwe-emulator-workspace").node.appendChild(this.dragBorder);
    this.dragBorder.appendChild(contentNode);

    this.dragBorder = null;

    $("jwe-emulator-settings-dragborder").chk(false);
    $("jwe-emulator-settings-dragborder").disable(false);
  },

  removeDragBorder : function()
  {
    if ( this.dragBorder != null )
      return;

    this.dragBorder = $("jwe-emulator-container").node;
    $("jwe-emulator-settings-dragborder").chk(true);
    $("jwe-emulator-settings-dragborder").disable(true);

    var contentNode = $("jwe-emulator-content").node;

    $("jwe-emulator-workspace").node.removeChild($("jwe-emulator-container").node);
    $("jwe-emulator-workspace").node.appendChild(contentNode);
  },

  toggleDragBorder : function()
  {
    if ( $("jwe-emulator-settings-dragborder").chk() )
    {
      $("jwe-emulator-container").css("background", "url(chrome://transit-emulator/skin/images/border-bg-none.png)");
      $("jwe-emulator-container").css("border", "none");
    }
    else
    {
      $("jwe-emulator-container").css("background", "url(chrome://transit-emulator/skin/images/border-bg.png)");
      $("jwe-emulator-container").css("border", " 2px solid #444444");
    }
  },

  reload: function()
  {
    $("jwe-log").val(this.emulator.getLog());
    $("jwe-emulator-content").attr("src", "about:blank");
    $("jwe-emulator-content").attr("src", this.emulator.getWidget().contentSrc);
    
    this.clearLog();

    this.emulator.reload($("jwe-emulator-loadedprofile").selValue());
    this.init();
    
    this.startEmulation();
  },

  clearLog : function ()
  {
    $("jwe-log").val("");
    this.emulator.clearLog();
  },

  unload : function()
  {
  },

  readConfig : function(inTab)
  {
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
          this.removeDragBorder();
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
        positionInfo = {};

      this.emulator.invokeDSOnPositionRetrieved(positionInfo);
    }
    else if ( $("jwe-emulator-subtab-devicestate-event").val() == "onScreenChangeDimensions" )
    {
      var newHeight = $("jwe-emulator-subtab-event-context-onscreenchange-newheight").val();
      var newWidth = $("jwe-emulator-subtab-event-context-onscreenchange-newwidth").val();

      if ( $("jwe-emulator-subtab-event-context-onscreenchange-resize").chk() )
      {
        this.deviceWidth = newWidth;
        this.deviceHeight = newHeight;
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
};




