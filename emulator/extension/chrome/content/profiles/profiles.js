
var jwe_Profiles = 
{
  state : new Array(),
  subtabs : new Array(),

  /** initialize the state of the profile window **/
  init : function () 
  {
    Components.utils.import("resource://transit-emulator/TransitCommon.jsm");
    
    this.state["selDevice"] = null;
    this.state["selMessage"] = null;
    this.state["selPIM"] = null;

    this.state["devicesLoaded"] = false;
    this.state["messagesLoaded"] = false;
    this.state["pimsLoaded"] = false;

    this.state["dGeneral"] = new SubTab(this.loadDGeneral, this.resetDGeneral, this.saveDGeneral, "device", "dGeneral");
    this.state["dWidget"] = new SubTab(this.loadDWidget, this.resetDWidget, this.saveDWidget, "device", "dWidget");
    this.state["dDevice"] = new SubTab(this.loadDDevice, this.resetDDevice, this.saveDDevice, "device", "dDevice");
    this.state["dAccount"] = new SubTab(this.loadDAccount, null, this.saveDAccount, "device", "dAccount");
    this.state["dDInfo"] = new SubTab(this.loadDDInfo, null, this.saveDDInfo, "device", "dDInfo");
    this.state["dDNetwork"] = new SubTab(this.loadDDNetwork, this.resetDDNetwork, this.saveDDNetwork, "device", "dDNetwork");
    this.state["dDState"] = new SubTab(this.loadDDState, this.resetDState, this.saveDDState, "device", "dDState");
    this.state["dAccel"] = new SubTab(this.loadAccelerometer, null, this.saveAccelerometer, "device", "dAccel");
    this.state["dConfig"] = new SubTab(this.loadConfig, this.resetConfig, this.saveConfig, "device", "dConfig");
    this.state["dPosition"] = new SubTab(this.loadPositionInfo, null, this.savePositionInfo, "device", "dPosition");
    this.state["dPower"] = new SubTab(this.loadPowerInfo, this.resetPowerInfo, this.savePowerInfo, "device", "dPower");
    this.state["dRadio"] = new SubTab(this.loadRadioInfo, this.resetRadioInfo, this.saveRadioInfo, "device", "dRadio");
    this.state["dMultimedia"] = new SubTab(this.loadMultimedia, this.resetMultimedia, this.saveMultimedia, "device", "dMultimedia");
    this.state["dTelephony"] = new SubTab(this.loadTelephony, this.resetTelephony, this.saveTelephony, "device", "dTelephony");

    this.state["mEmail"] = new SubTab(this.loadEmailAccounts, this.resetEmailAccounts, this.saveEmailAccounts, "messaging", "mEmail");
    this.state["mFolders"] = new SubTab(this.loadMessageFolders, this.resetMessageFolders, this.saveMessageFolders, "messaging", "mFolders");
    this.state["mMessages"] = new SubTab(this.loadMessages, this.resetMessages, this.saveMessages, "messaging", "mMessages");

    this.state["pAddress"] = new SubTab(this.loadAddressBook, this.resetAddressBook, this.saveAddressBook, "pim", "pAddress");
    this.state["pCalendar"] = new SubTab(this.loadCalendar, this.resetCalendar, this.saveCalendar, "pim", "pCalendar");

    this.subtabs = ["dGeneral","dWidget","dDevice","dAccount","dDInfo","dDNetwork","dDState","dAccel","dConfig","dPosition","dPower","dRadio","dMultimedia","dTelephony","mEmail","mFolders","mMessages","pAddress","pCalendar"];

    this.state["CurrentView"] = null;

    this.state["emulatedWidgets"] = new Array();
    this.state["deletedEmulatedWidgets"] = new Array();

    this.state["fileSystems"] = new Array();
    this.state["deletedFileSystems"] = new Array();
    
    this.state["callRecords"] = new Array();
    this.state["deletedCallRecords"] = new Array();

    this.state["emailAccounts"] = new Array();
    this.state["deletedEmailAccounts"] = new Array();
    this.state["defaultEmailAccount"] = null;

    this.state["messageFolders"] = new Array();
    this.state["deletedMessageFolders"] = new Array();

    this.state["messages"] = new Array();
    this.state["deletedMessages"] = new Array();

    this.state["attributes"] = new Array();
    this.state["deletedAttributes"] = new Array();

    this.state["addressBookItems"] = new Array();
    this.state["deletedAddressBookItems"] = new Array();

    this.state["addressBookGroups"] = new Array();
    this.state["deletedAddressBookGroups"] = new Array();

    this.state["calendarItems"] = new Array();
    this.state["deletedCalendarItems"] = new Array();

    this.state["availabeApps"] = ["alarm", "browser", "calculator", "calendar", "camera", "contacts", "files", "games", "mail", "mediaplayer", "messaging", "phonecall", "pictures", "prog_manager", "settings", "tasks", "widget_manager"];

    this.loadDeviceProfiles();
  },

  unsavedChanges : function()
  {
    for ( var i = 0; i < this.subtabs.length; i++ )
    {
      if (this.state[this.subtabs[i]].changed == true )
        return(true);
    }
    return(false);
  },

  reset : function(type)
  {
    // go through all sub tabs and set load to false
    for ( var i = 0; i < this.subtabs.length; i++ )
    {
      if ( (this.state[this.subtabs[i]].load != null) && (this.state[this.subtabs[i]].type == type) )
      {
        this.state[this.subtabs[i]].loaded = false;
        // undo the asterisk change mark
        if ( this.state[this.subtabs[i]].changed == true )
        {
          var keyId = "jwe-subtab-"+this.state[this.subtabs[i]].key;
          var value = document.getElementById(keyId).label;
          document.getElementById(keyId).label = value.substring(0, value.length-2);
          this.state[this.subtabs[i]].changed = false;
        }
        // call the reset function if it has one
        if ( this.state[this.subtabs[i]].reset != null )
          this.state[this.subtabs[i]].reset();
      }
    }
    // re-load the current view
    this.state[this.state["CurrentView"]].loaded = true;
    this.state[this.state["CurrentView"]].load();
  },

  save : function(type, saveMessage)
  {
    try
    {
      // go through all sub tabs and set load to false
      for ( var i = 0; i < this.subtabs.length; i++ )
      {
        if ( (this.state[this.subtabs[i]].type == type) && (this.state[this.subtabs[i]].changed) )
        {
          // try to save it
          
            // save
            this.state[this.subtabs[i]].save();
            
            // reset the tab
            this.state[this.subtabs[i]].loaded = false;
            this.state[this.subtabs[i]].changed = false;

            // clear the asterisk
            var keyId = "jwe-subtab-"+this.state[this.subtabs[i]].key;
            var value = document.getElementById(keyId).label;
            document.getElementById(keyId).label = value.substring(0, value.length-2);
            this.state[this.subtabs[i]].changed = false;

            // call the reset function if it has one
            if ( this.state[this.subtabs[i]].reset != null )
              this.state[this.subtabs[i]].reset();

            // re-load the current view
            this.state[this.state["CurrentView"]].loaded = true;
            this.state[this.state["CurrentView"]].load();
        }
      }
      alert(saveMessage);
    }
    catch(e)
    {
      alert("There was an error saving the profile. Please try again. "+e);
    }
  },

  /** load the device profile list **/
  loadDeviceProfiles : function()
  {
    if ( this.state["devicesLoaded"] == true )
      return;

    var devices = JILProfileService.wrappedJSObject.getAllDeviceProfiles();

    var deviceList = document.getElementById("jwe-profiles-sel-device-list");

    for ( var i = 0; i < devices.length; i++ )
    {
      var deviceItem = this.createListitem({id: "de-"+devices[i].id, label: devices[i].name, value: devices[i].id});
      if ( i == 0 )
      {
        this.state["selDevice"] = devices[i].id;
        $("jwe-profiles-sel-device-api-caption").val(devices[i].name+": ");
      }
      deviceList.appendChild(deviceItem);
    }
    document.getElementById("jwe-profiles-sel-device-list").selectedIndex = 0;

    this.state["devicesLoaded"] = true;

    // load general
    this.state["dGeneral"].load();
    this.state["CurrentView"] = "dGeneral";

    if ( devices.length > 1 )
      $("jwe-profiles-device-remove").disable(false);
    else
      $("jwe-profiles-device-remove").disable(true);
  },

  changeSelectedDeviceProfile : function()
  {
    // find the index of the device in the list
    var profileId = $("jwe-profiles-sel-device-list").selValue();
    var profileName = $("jwe-profiles-sel-device-list").selLabel();

    $("jwe-profiles-sel-device-api-caption").val(profileName+": ");
    this.state["selDevice"] = profileId;

    // load general
    this.state["CurrentView"] = "dGeneral";
    jwe_changeDevicePanel("jwe-profiles-device-panel-general");
    $("jwe-profiles-sel-device-api-list").sel(0);

    this.reset("device");
  },
  
  changeSelectedMessagingProfile : function()
  {
    // if there's nothing in the list, ignore this call
    if ( $("jwe-profiles-sel-messages-list").sel() < 0 )
      return;
    
    // find the index of the device in the list
    var profileId = $("jwe-profiles-sel-messages-list").selValue();
    var profileName = $("jwe-profiles-sel-messages-list").selLabel();

    $("jwe-profiles-sel-messaging-api-caption").val(profileName+": ");
    this.state["selMessage"] = profileId;

    // load general
    this.state["CurrentView"] = "mEmail";
    jwe_changeMessagingPanel("jwe-profiles-messaging-panel-email");
    $("jwe-profiles-sel-messaging-api-list").sel(0);

    this.reset("messaging");
  },
  
  changeSelectedPIMProfile : function()
  {
    // if there's nothing in the list, ignore this call
    if ( $("jwe-profiles-sel-pims-list").sel() < 0 )
      return;
    
    // find the index of the device in the list
    var profileId = $("jwe-profiles-sel-pims-list").selValue();
    var profileName = $("jwe-profiles-sel-pims-list").selLabel();

    $("jwe-profiles-sel-pim-api-caption").val(profileName+": ");
    this.state["selPIM"] = profileId;

    // load general
    this.state["CurrentView"] = "pAddress";
    jwe_changeMessagingPanel("jwe-profiles-pim-panel-address");
    $("jwe-profiles-sel-pim-api-list").sel(0);
    
    this.reset("pim");
  },

  /** load the messages profile list **/
  loadMessageProfiles : function()
  {
    if ( this.state["messagesLoaded"] == true )
        return;

    var messages = JILProfileService.wrappedJSObject.getAllMessageProfiles();
    
    var messagesList = document.getElementById("jwe-profiles-sel-messages-list");

    for ( var i = 0; i < messages.length; i++ )
    {
      var messageItem = this.createListitem({id: "me-"+messages[i].id, label: messages[i].name, value: messages[i].id});
      if ( i == 0 )
      {
        //messageItem.setAttribute("selected", true);
        this.state["selMessage"] = messages[i].id;
        $("jwe-profiles-sel-messaging-api-caption").val(messages[i].name+": ");
      }
      messagesList.appendChild(messageItem);
    }
    this.state["messagesLoaded"] = true;
    $("jwe-profiles-sel-messages-list").sel(0);

    this.state["mEmail"].load();
    this.state["CurrentView"] = "mEmail";
    
    if ( messages.length > 1 )
      $("jwe-profiles-messaging-remove").disable(false);
    else
      $("jwe-profiles-messaging-remove").disable(true);
  },

  /** load the pim profile list **/
  loadPIMProfiles : function()
  {
    if ( this.state["pimsLoaded"] == true )
        return;

    var pims = JILProfileService.wrappedJSObject.getAllPIMProfiles();

    var pimsList = document.getElementById("jwe-profiles-sel-pims-list");

    for ( var i = 0; i < pims.length; i++ )
    {
      var pimItem = this.createListitem({id: "pi-"+pims[i].id, label: pims[i].name, value: pims[i].id});
      if ( i == 0 )
      {
        this.state["selPIM"] = pims[i].id;
        $("jwe-profiles-sel-pim-api-caption").val(pims[i].name+": ");
      }
      pimsList.appendChild(pimItem);
      $("jwe-profiles-sel-pims-list").sel(0);
    }
    this.state["pimsLoaded"] = true;

    this.state["pAddress"].load();
    this.state["CurrentView"] = "pAddress";
    
    if ( pims.length > 1 )
      $("jwe-profiles-pim-remove").disable(false);
    else
      $("jwe-profiles-pim-remove").disable(true);
  },

  /** load the general subtab **/
  loadDGeneral : function()
  {
    var profile = JILProfileService.wrappedJSObject.getDGeneral(jwe_Profiles.state["selDevice"]);
    var device = JILProfileService.wrappedJSObject.getDeviceProfile(jwe_Profiles.state["selDevice"]);
    var messages = JILProfileService.wrappedJSObject.getAllMessageProfiles();
    var pims = JILProfileService.wrappedJSObject.getAllPIMProfiles();

    $("jwe-profiles-device-panel-general-uuid").val("UUID: "+device.uuid);

    // remove the old popup, if there is one
    $("jwe-profiles-device-panel-general-msglist").node.removeAllItems();
    $("jwe-profiles-device-panel-general-pimlist").node.removeAllItems();

    var msgPopup = jwe_Profiles.createMenuPopup("jwe-profiles-device-panel-general-msg");
    var msgIndex = 0;
    for ( var i = 0; i < messages.length; i++ )
    {
      var msgItem = jwe_Profiles.createMenuitem(messages[i].name, messages[i].id);
      msgPopup.appendChild(msgItem);
      if ( messages[i].id == profile.messageProfileId )
        msgIndex = i;
    }
    document.getElementById("jwe-profiles-device-panel-general-msglist").appendChild(msgPopup);
    document.getElementById("jwe-profiles-device-panel-general-msglist").selectedIndex = msgIndex;

    var pimPopup = jwe_Profiles.createMenuPopup("jwe-profiles-device-panel-general-pim");
    var pimIndex = 0;
    for ( var i = 0; i < pims.length; i++ )
    {
      var pimItem = jwe_Profiles.createMenuitem(pims[i].name, pims[i].id);
      pimPopup.appendChild(pimItem);
      if ( pims[i].id == profile.pimProfileId )
        pimIndex = i;
    }
    document.getElementById("jwe-profiles-device-panel-general-pimlist").appendChild(pimPopup);
    document.getElementById("jwe-profiles-device-panel-general-pimlist").selectedIndex = pimIndex;
  },

  saveDGeneral : function()
  {
    var messageProfileId = $("jwe-profiles-device-panel-general-msglist").selValue();
    var pimProfileId = $("jwe-profiles-device-panel-general-pimlist").selValue();

    JILProfileService.wrappedJSObject.saveDGeneral(jwe_Profiles.state["selDevice"], messageProfileId, pimProfileId);
  },
  
  /** load widget subtab **/
  loadDWidget : function()
  {
    jwe_Profiles.clearListBox(document.getElementById("jwe-profiles-device-panel-widgets"));

    var widgets = JILProfileService.wrappedJSObject.getEmulatedWidgets(jwe_Profiles.state["selDevice"]);
    for ( var i = 0; i < widgets.length; i++ )
    {
      var widgetItem = jwe_Profiles.createListitem({id: "ew-"+widgets[i].id, value: widgets[i].id});
      var nameCell = jwe_Profiles.createListCell({id: "ew-"+widgets[i].id+"-name", label: widgets[i].name});
      var authorCell = jwe_Profiles.createListCell({id: "ew-"+widgets[i].id+"-author", label: widgets[i].author});
      var versionCell = jwe_Profiles.createListCell({id: "ew-"+widgets[i].id+"-version", label: widgets[i].version});

      widgetItem.appendChild(nameCell);
      widgetItem.appendChild(versionCell);
      widgetItem.appendChild(authorCell);
      document.getElementById("jwe-profiles-device-panel-widgets").appendChild(widgetItem);
      jwe_Profiles.state["emulatedWidgets"][widgets[i].id] = widgets[i];
    }

    // disabled all buttons except new
    document.getElementById("jwe-profiles-widgets-prefs-modify").disabled = true;
    document.getElementById("jwe-profiles-widgets-prefs-preferences").disabled = true;
    document.getElementById("jwe-profiles-widgets-prefs-delete").disabled = true;
  },

  saveDWidget : function()
  {
    // go through the widgets and add new widgets or update modied widgets
    for ( var i in jwe_Profiles.state["emulatedWidgets"] )
    {
      var widget = jwe_Profiles.state["emulatedWidgets"][i];
      if ( widget.isChanged )
        JILProfileService.wrappedJSObject.updateEmulatedWidget(widget);
      else if ( widget.isNew )
        JILProfileService.wrappedJSObject.addEmulatedWidget(widget);
    }

    // remove any deleted widgets
    for ( var i = 0; i < jwe_Profiles.state["deletedEmulatedWidgets"].length; i++ )
    {
      if ( !jwe_Profiles.state["deletedEmulatedWidgets"][i].isNew )
        JILProfileService.wrappedJSObject.deleteEmulatedWidget(jwe_Profiles.state["selDevice"], jwe_Profiles.state["deletedEmulatedWidgets"][i]);
    }
  },

  /** load device subtab **/
  loadDDevice : function()
  {
    jwe_Profiles.clearListBox(document.getElementById("jwe-profiles-devices-device-filesystems"));

    var deviceData = JILProfileService.wrappedJSObject.getDeviceData(jwe_Profiles.state["selDevice"]);
    document.getElementById("jwe-profiles-devices-device-clip").value = deviceData.clipboardString;
    document.getElementById("jwe-profiles-devices-device-engine-name").value = deviceData.engineName;
    document.getElementById("jwe-profiles-devices-device-engine-prov").value = deviceData.engineProvider;
    document.getElementById("jwe-profiles-devices-device-engine-ver").value = deviceData.engineVersion;

    for ( var i = 0; i < deviceData.fileSystems.length; i++ )
    {
      var fsItem = jwe_Profiles.createListitem({id: "fs-"+deviceData.fileSystems[i].id, value: deviceData.fileSystems[i].id});
      var fsCell = jwe_Profiles.createListCell({id: "fs-"+deviceData.fileSystems[i].id+"-rootPath", label: deviceData.fileSystems[i].rootPath});
      var lpCell = jwe_Profiles.createListCell({id: "fs-"+deviceData.fileSystems[i].id+"-localPath", label: deviceData.fileSystems[i].localPath});
      var szCell = jwe_Profiles.createListCell({id: "fs-"+deviceData.fileSystems[i].id+"-size", label: deviceData.fileSystems[i].size});
      fsItem.appendChild(fsCell);
      fsItem.appendChild(lpCell);
      fsItem.appendChild(szCell);
      document.getElementById("jwe-profiles-devices-device-filesystems").appendChild(fsItem);
      jwe_Profiles.state["fileSystems"][deviceData.fileSystems[i].id] = deviceData.fileSystems[i];
    }

    for ( var i = 0; i < deviceData.availableApps.length; i++ )
    {
      var checkbox = document.getElementById("jwe-profiles-devices-device-app-"+deviceData.availableApps[i].toLowerCase());
      if ( checkbox != null )
        checkbox.checked = true;
    }

    document.getElementById("jwe-profiles-devices-filesystems-modify").disabled = true;
    document.getElementById("jwe-profiles-devices-filesystems-delete").disabled = true;
  },

  saveDDevice : function()
  {
    var deviceData = JILProfileService.wrappedJSObject.getDeviceData(jwe_Profiles.state["selDevice"]);

    deviceData.clipboardString = document.getElementById("jwe-profiles-devices-device-clip").value;
    deviceData.engineName = document.getElementById("jwe-profiles-devices-device-engine-name").value;
    deviceData.engineProvider = document.getElementById("jwe-profiles-devices-device-engine-prov").value;
    deviceData.engineVersion = document.getElementById("jwe-profiles-devices-device-engine-ver").value;

    var checkedApps = new Array();
    for ( var i = 0; i < jwe_Profiles.state["availabeApps"].length; i++ )
    {
      var checkbox = document.getElementById("jwe-profiles-devices-device-app-"+jwe_Profiles.state["availabeApps"][i]);
      if ( checkbox.checked == true )
        checkedApps.push(jwe_Profiles.state["availabeApps"][i]);
    }
    deviceData.checkedApps = checkedApps;

    JILProfileService.wrappedJSObject.saveDeviceData(deviceData);

    for ( var i in jwe_Profiles.state["fileSystems"] )
    {
      var fsys = jwe_Profiles.state["fileSystems"][i];
      if ( fsys.isChanged )
        JILProfileService.wrappedJSObject.updateFileSystem(fsys);
      else if ( fsys.isNew )
        JILProfileService.wrappedJSObject.addFileSystem(fsys);
    }

    for ( var i = 0; i < jwe_Profiles.state["deletedFileSystems"].length; i++ )
    {
      if ( !jwe_Profiles.state["deletedFileSystems"][i].isNew )
        JILProfileService.wrappedJSObject.deleteFileSystem(jwe_Profiles.state["selDevice"], jwe_Profiles.state["deletedFileSystems"][i]);
    }
  },

  loadDAccount : function()
  {
    var accountInfo = JILProfileService.wrappedJSObject.getAccountInfo(jwe_Profiles.state["selDevice"]);
    document.getElementById("jwe-profiles-devices-account-phonemsisdn").value = accountInfo.phoneMSISDN;
    document.getElementById("jwe-profiles-devices-account-opname").value = accountInfo.phoneOpName;
    document.getElementById("jwe-profiles-devices-account-userid").value = accountInfo.userId;
    document.getElementById("jwe-profiles-devices-account-balance").value = accountInfo.accountBalance;

    if ( accountInfo.subscriptionType.toLowerCase() == "prepaid" ) 
      document.getElementById("jwe-profiles-devices-account-type").selectedIndex = 0;
    else if ( accountInfo.subscriptionType.toLowerCase() == "postpaid" ) 
      document.getElementById("jwe-profiles-devices-account-type").selectedIndex = 1;
    else if ( accountInfo.subscriptionType.toLowerCase() == "other" ) 
      document.getElementById("jwe-profiles-devices-account-type").selectedIndex = 2;
  },

  saveDAccount : function()
  {
    var account = 
    {
      phoneMSISDN: document.getElementById("jwe-profiles-devices-account-phonemsisdn").value,
      phoneOpName: document.getElementById("jwe-profiles-devices-account-opname").value,
      userId: document.getElementById("jwe-profiles-devices-account-userid").value,
      accountBalance: document.getElementById("jwe-profiles-devices-account-balance").value,
      subscriptionType: document.getElementById("jwe-profiles-devices-account-type").getItemAtIndex(document.getElementById("jwe-profiles-devices-account-type").selectedIndex).value,
      profileId: jwe_Profiles.state["selDevice"]
    };
    JILProfileService.wrappedJSObject.saveAccountInfo(account);
  },

  loadDDInfo : function()
  {
    var deviceInfo = JILProfileService.wrappedJSObject.getDeviceInfo(jwe_Profiles.state["selDevice"]);
    document.getElementById("jwe-profiles-devices-ownerinfo-address").value = deviceInfo.ownerAddress;
    document.getElementById("jwe-profiles-devices-ownerinfo-company").value = deviceInfo.ownerCompany;
    document.getElementById("jwe-profiles-devices-ownerinfo-email").value = deviceInfo.ownerEmail;
    document.getElementById("jwe-profiles-devices-ownerinfo-fullname").value = deviceInfo.ownerFullName;
    document.getElementById("jwe-profiles-devices-ownerinfo-title").value = deviceInfo.ownerTitle;
    document.getElementById("jwe-profiles-devices-ownerinfo-homephone").value = deviceInfo.ownerHomePhone;
    document.getElementById("jwe-profiles-devices-ownerinfo-mobilephone").value = deviceInfo.ownerMobilePhone;
    document.getElementById("jwe-profiles-devices-ownerinfo-workphone").value = deviceInfo.ownerWorkPhone;
    document.getElementById("jwe-profiles-devices-deviceinfo-colordepth").value = deviceInfo.colorDepth;
    document.getElementById("jwe-profiles-devices-deviceinfo-firmware").value = deviceInfo.firmware;
    document.getElementById("jwe-profiles-devices-deviceinfo-manufacturer").value = deviceInfo.manufacturer;
    document.getElementById("jwe-profiles-devices-deviceinfo-model").value = deviceInfo.model;
    document.getElementById("jwe-profiles-devices-deviceinfo-os").value = deviceInfo.os;
    document.getElementById("jwe-profiles-devices-deviceinfo-height").value = deviceInfo.screenHeight;
    document.getElementById("jwe-profiles-devices-deviceinfo-width").value = deviceInfo.screenWidth;
    document.getElementById("jwe-profiles-devices-deviceinfo-software").value = deviceInfo.software;
    document.getElementById("jwe-profiles-devices-deviceinfo-memory").value = deviceInfo.totalMemory;
  },

  saveDDInfo : function()
  {
    var deviceInfo =
    {
      profileId: jwe_Profiles.state["selDevice"],
      ownerAddress: document.getElementById("jwe-profiles-devices-ownerinfo-address").value,
      ownerCompany: document.getElementById("jwe-profiles-devices-ownerinfo-company").value,
      ownerEmail: document.getElementById("jwe-profiles-devices-ownerinfo-email").value,
      ownerFullName: document.getElementById("jwe-profiles-devices-ownerinfo-fullname").value,
      ownerTitle: document.getElementById("jwe-profiles-devices-ownerinfo-title").value,
      ownerHomePhone: document.getElementById("jwe-profiles-devices-ownerinfo-homephone").value,
      ownerMobilePhone: document.getElementById("jwe-profiles-devices-ownerinfo-mobilephone").value,
      ownerWorkPhone: document.getElementById("jwe-profiles-devices-ownerinfo-workphone").value,
      colorDepth: document.getElementById("jwe-profiles-devices-deviceinfo-colordepth").value,
      firmware: document.getElementById("jwe-profiles-devices-deviceinfo-firmware").value,
      manufacturer: document.getElementById("jwe-profiles-devices-deviceinfo-manufacturer").value,
      model: document.getElementById("jwe-profiles-devices-deviceinfo-model").value,
      os: document.getElementById("jwe-profiles-devices-deviceinfo-os").value,
      screenHeight: document.getElementById("jwe-profiles-devices-deviceinfo-height").value,
      screenWidth: document.getElementById("jwe-profiles-devices-deviceinfo-width").value,
      software: document.getElementById("jwe-profiles-devices-deviceinfo-software").value,
      totalMemory: document.getElementById("jwe-profiles-devices-deviceinfo-memory").value
    };
    JILProfileService.wrappedJSObject.saveDeviceInfo(deviceInfo);
  },

  loadDDNetwork : function()
  {
    var dataNetworkInfo = JILProfileService.wrappedJSObject.getDataNetworkInfo(jwe_Profiles.state["selDevice"]);

    var oneEnabled = false;
    for ( var i = 0; i < dataNetworkInfo.length; i++ )
    {
      var checkbox = document.getElementById("jwe-profiles-devices-datanetwork-"+dataNetworkInfo[i].type.toLowerCase());
      if ( dataNetworkInfo[i].enabled == true )
      {
        checkbox.checked = true;
        oneEnabled = true;
      }
      document.getElementById("jwe-profiles-devices-datanetwork-name-"+dataNetworkInfo[i].type.toLowerCase()).value = dataNetworkInfo[i].nickname;
    }

    if ( oneEnabled )
    {
      document.getElementById("jwe-profiles-devices-datanetwork-connected").style.display = "block";
      document.getElementById("jwe-profiles-devices-datanetwork-disconnected").style.display = "none";
    }
    else
    {
      document.getElementById("jwe-profiles-devices-datanetwork-connected").style.display = "none";
      document.getElementById("jwe-profiles-devices-datanetwork-disconnected").style.display = "block";
    }
  },

  saveDDNetwork : function()
  {
    var dataNetworkInfo = JILProfileService.wrappedJSObject.getDataNetworkInfo(jwe_Profiles.state["selDevice"]);

    for ( var i = 0; i < dataNetworkInfo.length; i++ )
    {
      var checkbox = document.getElementById("jwe-profiles-devices-datanetwork-"+dataNetworkInfo[i].type.toLowerCase());
      if ( checkbox.checked == true )
        dataNetworkInfo[i].enabled = true;
      else
        dataNetworkInfo[i].enabled = false;

      dataNetworkInfo[i].nickname = document.getElementById("jwe-profiles-devices-datanetwork-name-"+dataNetworkInfo[i].type.toLowerCase()).value;
    }
    JILProfileService.wrappedJSObject.saveDataNetworkInfo(dataNetworkInfo);
  },

  loadDDState : function()
  {
    var deviceState = JILProfileService.wrappedJSObject.getDeviceState(jwe_Profiles.state["selDevice"]);
    document.getElementById("jwe-profiles-devices-devicestate-availmem").value = deviceState.availableMemory;
    document.getElementById("jwe-profiles-devices-devicestate-language").value = deviceState.language;
    document.getElementById("jwe-profiles-devices-devicestate-proc").value = deviceState.procUtilization;

    if ( deviceState.backLight == true )
      document.getElementById("jwe-profiles-devices-devicestate-backlight").checked = true;
    if ( deviceState.keypadLight == true )
      document.getElementById("jwe-profiles-devices-devicestate-keypadlight").checked = true;

    if ( deviceState.audioPath.toLowerCase() == "speaker" ) 
      document.getElementById("jwe-profiles-devices-devicestate-audiopath").selectedIndex = 0;
    else if ( deviceState.audioPath.toLowerCase() == "receiver" ) 
      document.getElementById("jwe-profiles-devices-devicestate-audiopath").selectedIndex = 1;
    else if ( deviceState.audioPath.toLowerCase() == "earphone" ) 
      document.getElementById("jwe-profiles-devices-devicestate-audiopath").selectedIndex = 2;
  },

  saveDDState : function()
  {
    var backlight = false;
    var keypadlight = false;

    if ( document.getElementById("jwe-profiles-devices-devicestate-backlight").checked == true )
      backlight = true;
    if ( document.getElementById("jwe-profiles-devices-devicestate-keypadlight").checked == true )
      keypadlight = true;

    var deviceState = 
    {
      availableMemory: document.getElementById("jwe-profiles-devices-devicestate-availmem").value,
      language: document.getElementById("jwe-profiles-devices-devicestate-language").value,
      procUtilization: document.getElementById("jwe-profiles-devices-devicestate-proc").value,
      audioPath: document.getElementById("jwe-profiles-devices-devicestate-audiopath").getItemAtIndex(document.getElementById("jwe-profiles-devices-devicestate-audiopath").selectedIndex).value,
      backLight: backlight,
      keypadLight: keypadlight,
      profileId: jwe_Profiles.state["selDevice"]
    };

    JILProfileService.wrappedJSObject.saveDeviceState(deviceState);
  },

  loadAccelerometer : function()
  {
    var accel = JILProfileService.wrappedJSObject.getAccelerometer(jwe_Profiles.state["selDevice"]);
    document.getElementById("jwe-profiles-devices-accelerometer-x").value = accel.xAxis;
    document.getElementById("jwe-profiles-devices-accelerometer-y").value = accel.yAxis;
    document.getElementById("jwe-profiles-devices-accelerometer-z").value = accel.zAxis;
  },

  saveAccelerometer : function()
  {
    var accel = 
    {
      xAxis: document.getElementById("jwe-profiles-devices-accelerometer-x").value,
      yAxis: document.getElementById("jwe-profiles-devices-accelerometer-y").value,
      zAxis: document.getElementById("jwe-profiles-devices-accelerometer-z").value,
      profileId: jwe_Profiles.state["selDevice"]
    };

    JILProfileService.wrappedJSObject.saveAccelerometer(accel);
  },

  loadConfig : function()
  {
    var config = JILProfileService.wrappedJSObject.getConfig(jwe_Profiles.state["selDevice"]);
    document.getElementById("jwe-profiles-devices-config-msgvol").value = config.messageVolume;
    document.getElementById("jwe-profiles-devices-config-ringvol").value = config.ringtoneVolume;

    if ( config.vibrationOn == true ) 
      document.getElementById("jwe-profiles-devices-config-vibe").checked = true;
  },

  saveConfig : function()
  {
    var vibrate = false;
    if ( document.getElementById("jwe-profiles-devices-config-vibe").checked == true )
      vibrate = true;

    var config =
    {
      messageVolume: document.getElementById("jwe-profiles-devices-config-msgvol").value,
      ringtoneVolume: document.getElementById("jwe-profiles-devices-config-ringvol").value,
      vibrationOn: vibrate,
      profileId: jwe_Profiles.state["selDevice"]
    };

    JILProfileService.wrappedJSObject.saveConfig(config);
  },

  loadPositionInfo : function()
  {
    var position = JILProfileService.wrappedJSObject.getPositionInfo(jwe_Profiles.state["selDevice"]);
    document.getElementById("jwe-profiles-devices-position-cellid").value = position.cellID;
    document.getElementById("jwe-profiles-devices-position-accuracy").value = position.accuracy;
    document.getElementById("jwe-profiles-devices-position-lat").value = position.latitude;
    document.getElementById("jwe-profiles-devices-position-long").value = position.longitude;
    document.getElementById("jwe-profiles-devices-position-altaccuracy").value = position.altitudeAccuracy;
    document.getElementById("jwe-profiles-devices-position-altitude").value = position.altitude;
  },

  savePositionInfo : function()
  {
    var position =
    {
      cellID: document.getElementById("jwe-profiles-devices-position-cellid").value,
      accuracy: document.getElementById("jwe-profiles-devices-position-accuracy").value,
      latitude: document.getElementById("jwe-profiles-devices-position-lat").value,
      longitude: document.getElementById("jwe-profiles-devices-position-long").value,
      altitudeAccuracy: document.getElementById("jwe-profiles-devices-position-altaccuracy").value,
      altitude: document.getElementById("jwe-profiles-devices-position-altitude").value,
      profileId: jwe_Profiles.state["selDevice"]
    };
    JILProfileService.wrappedJSObject.savePositionInfo(position);
  },

  loadPowerInfo : function()
  {
    var power = JILProfileService.wrappedJSObject.getPowerInfo(jwe_Profiles.state["selDevice"]);
    document.getElementById("jwe-profiles-devices-power-remaining").value = power.percentRemaining;

    if ( power.isCharging == true ) 
      document.getElementById("jwe-profiles-devices-power-charging").checked = true;
  },

  savePowerInfo : function()
  {
    var charging = false;
    if ( document.getElementById("jwe-profiles-devices-power-charging").checked == true )
      charging = true;

    var power =
    {
      percentRemaining: document.getElementById("jwe-profiles-devices-power-remaining").value,
      isCharging: charging,
      profileId: jwe_Profiles.state["selDevice"]
    };

    JILProfileService.wrappedJSObject.savePowerInfo(power);
  },

  loadRadioInfo : function()
  {
    var radio = JILProfileService.wrappedJSObject.getRadioInfo(jwe_Profiles.state["selDevice"]);
    if ( radio.isEnabled == true ) 
      document.getElementById("jwe-profiles-devices-radio-enabled").checked = true;

    if ( radio.isRoaming == true ) 
      document.getElementById("jwe-profiles-devices-radio-roaming").checked = true;

    if ( radio.signalSource.toLowerCase() == "cdma" ) 
      document.getElementById("jwe-profiles-devices-radio-signalsource").selectedIndex = 0;
    else if ( radio.signalSource.toLowerCase() == "gsm" ) 
      document.getElementById("jwe-profiles-devices-radio-signalsource").selectedIndex = 1;
    else if ( radio.signalSource.toLowerCase() == "lte" ) 
      document.getElementById("jwe-profiles-devices-radio-signalsource").selectedIndex = 2;
    else if ( radio.signalSource.toLowerCase() == "tdscdma" ) 
      document.getElementById("jwe-profiles-devices-radio-signalsource").selectedIndex = 3;
    else if ( radio.signalSource.toLowerCase() == "wcdma" ) 
      document.getElementById("jwe-profiles-devices-radio-signalsource").selectedIndex = 4;

    document.getElementById("jwe-profiles-devices-radio-strength").value = radio.signalStrength;
  },

  saveRadioInfo : function()
  {
    var enabled = false;
    var roaming = false;
    if ( document.getElementById("jwe-profiles-devices-radio-enabled").checked == true )
      enabled = true;
    if ( document.getElementById("jwe-profiles-devices-radio-roaming").checked == true )
      roaming = true;

    var radio = 
    {
      isEnabled: enabled,
      isRoaming: roaming,
      signalSource: document.getElementById("jwe-profiles-devices-radio-signalsource").getItemAtIndex(document.getElementById("jwe-profiles-devices-radio-signalsource").selectedIndex).value,
      signalStrength: document.getElementById("jwe-profiles-devices-radio-strength").value,
      profileId: jwe_Profiles.state["selDevice"]
    };

    JILProfileService.wrappedJSObject.saveRadioInfo(radio);
  },

  loadMultimedia : function()
  {
    var multimedia = JILProfileService.wrappedJSObject.getMultimedia(jwe_Profiles.state["selDevice"]);

    if ( multimedia.audioPlaying == true ) 
      document.getElementById("jwe-profiles-devices-multimedia-audioplaying").checked = true;
    if ( multimedia.videoPlaying == true ) 
      document.getElementById("jwe-profiles-devices-multimedia-videoplaying").checked = true;

    document.getElementById("jwe-profiles-devices-multimedia-volume").value = multimedia.volume;
  },

  saveMultimedia : function()
  {
    var audio = false;
    var video = false;
    if ( document.getElementById("jwe-profiles-devices-multimedia-audioplaying").checked == true )
      audio = true;
    if ( document.getElementById("jwe-profiles-devices-multimedia-videoplaying").checked == true )
      video = true;

    var multimedia =
    {
      audioPlaying: audio,
      videoPlaying: video,
      volume: document.getElementById("jwe-profiles-devices-multimedia-volume").value,
      profileId: jwe_Profiles.state["selDevice"]
    };

    JILProfileService.wrappedJSObject.saveMultimedia(multimedia);
  },

  loadTelephony : function()
  {
    jwe_Profiles.clearListBox(document.getElementById("jwe-profiles-devices-telephony-records"));

    var records = JILProfileService.wrappedJSObject.getCallRecords(jwe_Profiles.state["selDevice"]);

    for ( var i = 0; i < records.length; i++ )
    {
      var recordItem = jwe_Profiles.createListitem({id: "cr-"+records[i].id, value: records[i].id});

      var addressCell = jwe_Profiles.createListCell({id: "cr-"+records[i].id+"-address", label: records[i].address});
      var typeCell = jwe_Profiles.createListCell({id: "cr-"+records[i].id+"-type", label: records[i].type});
      var idCell = jwe_Profiles.createListCell({id: "cr-"+records[i].id+"-id", label: records[i].id});

      recordItem.appendChild(addressCell);
      recordItem.appendChild(typeCell);
      recordItem.appendChild(idCell);

      document.getElementById("jwe-profiles-devices-telephony-records").appendChild(recordItem);
      jwe_Profiles.state["callRecords"][records[i].id] = records[i];
    }

    document.getElementById("jwe-profiles-devices-telephony-modify").disabled = true;
    document.getElementById("jwe-profiles-devices-telephony-delete").disabled = true;
  },

  saveTelephony : function()
  {
    for ( var i in jwe_Profiles.state["callRecords"] )
    {
      var record = jwe_Profiles.state["callRecords"][i];
      if ( record.isChanged )
        JILProfileService.wrappedJSObject.updateCallRecord(record);
      else if ( record.isNew )
        JILProfileService.wrappedJSObject.addCallRecord(record);
    }

    for ( var i = 0; i < jwe_Profiles.state["deletedCallRecords"].length; i++ )
    {
      if ( !jwe_Profiles.state["deletedCallRecords"][i].isNew )
        JILProfileService.wrappedJSObject.deleteCallRecord(jwe_Profiles.state["selDevice"], jwe_Profiles.state["deletedCallRecords"][i]);
    }
  },

  adjustNetwork : function() 
  {
    if ( document.getElementById("jwe-profiles-devices-datanetwork-bluetooth").checked ||
         document.getElementById("jwe-profiles-devices-datanetwork-edge").checked ||
         document.getElementById("jwe-profiles-devices-datanetwork-evdo").checked ||
         document.getElementById("jwe-profiles-devices-datanetwork-gprs").checked ||
         document.getElementById("jwe-profiles-devices-datanetwork-irda").checked ||
         document.getElementById("jwe-profiles-devices-datanetwork-lte").checked ||
         document.getElementById("jwe-profiles-devices-datanetwork-onexrtt").checked ||
         document.getElementById("jwe-profiles-devices-datanetwork-wifi").checked )
    {
      document.getElementById("jwe-profiles-devices-datanetwork-connected").style.display = "block";
      document.getElementById("jwe-profiles-devices-datanetwork-disconnected").style.display = "none";
    }
    else
    {
      document.getElementById("jwe-profiles-devices-datanetwork-connected").style.display = "none";
      document.getElementById("jwe-profiles-devices-datanetwork-disconnected").style.display = "block";
    }
  },

  loadEmailAccounts : function()
  {
    jwe_Profiles.clearListBox(document.getElementById("jwe-profiles-messaging-emailaccounts"));

    var accounts = JILProfileService.wrappedJSObject.getEmailAccounts(jwe_Profiles.state["selMessage"]);

    for ( var i = 0; i < accounts.length; i++ )
    {
      var accountItem = jwe_Profiles.createListitem({id: "em-"+accounts[i].id, value: accounts[i].id});

      var nameCell = jwe_Profiles.createListCell({id: "em-"+accounts[i].id+"-name", label: accounts[i].name});

      var defaultCell = null;
      if ( accounts[i].isDefault == true )
        defaultCell = jwe_Profiles.createListCell({id: "em-"+accounts[i].id+"-default", label: "*"});
      else
        defaultCell = jwe_Profiles.createListCell({id: "em-"+accounts[i].id+"-default", label: ""});

      accountItem.appendChild(nameCell);
      accountItem.appendChild(defaultCell);

      document.getElementById("jwe-profiles-messaging-emailaccounts").appendChild(accountItem);
      jwe_Profiles.state["emailAccounts"][accounts[i].id] = accounts[i];
    }

    document.getElementById("jwe-profiles-messaging-email-modify").disabled = true;
    document.getElementById("jwe-profiles-messaging-email-makedefault").disabled = true;
    document.getElementById("jwe-profiles-messaging-email-delete").disabled = true;
  },

  saveEmailAccounts : function()
  {
    for ( var i in jwe_Profiles.state["emailAccounts"] )
    {
      var account = jwe_Profiles.state["emailAccounts"][i];
      if ( account.isChanged )
        JILProfileService.wrappedJSObject.updateEmailAccount(account);
      else if ( account.isNew )
        JILProfileService.wrappedJSObject.addEmailAccount(account);
    }

    for ( var i = 0; i < jwe_Profiles.state["deletedEmailAccounts"].length; i++ )
    {
      if ( !jwe_Profiles.state["deletedEmailAccounts"][i].isNew )
        JILProfileService.wrappedJSObject.deleteEmailAccount(jwe_Profiles.state["selMessage"], jwe_Profiles.state["deletedEmailAccounts"][i]);
    }

    if ( jwe_Profiles.state["defaultEmailAccount"] != null )
      JILProfileService.wrappedJSObject.setDefaultEmailAccount(jwe_Profiles.state["defaultEmailAccount"]);
  },

  loadMessageFolders : function()
  {
    jwe_Profiles.clearListBox(document.getElementById("jwe-profiles-messaging-folders"));

    var folders = JILProfileService.wrappedJSObject.getMessageFolders(jwe_Profiles.state["selMessage"]);

    for ( var i = 0; i < folders.length; i++ )
    {
      var folderItem = jwe_Profiles.createListitem({id: "mf-"+folders[i].id, value: folders[i].id});

      var nameCell = jwe_Profiles.createListCell({id: "mf-"+folders[i].id+"-name", label: folders[i].name});
      var typeCell = jwe_Profiles.createListCell({id: "mf-"+folders[i].id+"-type", label: folders[i].type});
      var messagesCell = jwe_Profiles.createListCell({id: "mf-"+folders[i].id+"-messages", label: folders[i].messageCount});

      folderItem.appendChild(nameCell);
      folderItem.appendChild(typeCell);
      folderItem.appendChild(messagesCell);

      document.getElementById("jwe-profiles-messaging-folders").appendChild(folderItem);
      jwe_Profiles.state["messageFolders"][folders[i].id] = folders[i];
    }

    document.getElementById("jwe-profiles-messaging-folders-modify").disabled = true;
    document.getElementById("jwe-profiles-messaging-folders-delete").disabled = true;
  },

  saveMessageFolders : function()
  {
    for ( var i in jwe_Profiles.state["messageFolders"] )
    {
      var folder = jwe_Profiles.state["messageFolders"][i];
      if ( folder.isChanged )
        JILProfileService.wrappedJSObject.updateMessageFolder(folder);
      else if ( folder.isNew )
        JILProfileService.wrappedJSObject.addMessageFolder(folder);
    }

    for ( var i = 0; i < jwe_Profiles.state["deletedMessageFolders"].length; i++ )
    {
      if ( !jwe_Profiles.state["deletedMessageFolders"][i].isNew )
        JILProfileService.wrappedJSObject.deleteMessageFolder(jwe_Profiles.state["selMessage"], jwe_Profiles.state["deletedMessageFolders"][i]);
    }
  },

  loadMessages : function()
  {
    jwe_Profiles.clearListBox(document.getElementById("jwe-profiles-messaging-messages"));

    var messages = JILProfileService.wrappedJSObject.getMessages(jwe_Profiles.state["selMessage"]);

    for ( var i = 0; i < messages.length; i++ )
    {
      var messageItem = jwe_Profiles.createListitem({id: "ms-"+messages[i].id, value: messages[i].id});

      var folderCell = jwe_Profiles.createListCell({id: "ms-"+messages[i].id+"-folder", label: messages[i].folderName});
      var toCell = jwe_Profiles.createListCell({id: "ms-"+messages[i].id+"-to", label: messages[i].toAddress});
      var subjectCell = jwe_Profiles.createListCell({id: "ms-"+messages[i].id+"-subject", label: messages[i].subject});
      var fromCell = jwe_Profiles.createListCell({id: "ms-"+messages[i].id+"-from", label: messages[i].sourceAddress});

      messageItem.appendChild(folderCell);
      messageItem.appendChild(toCell);
      messageItem.appendChild(subjectCell);
      messageItem.appendChild(fromCell);

      document.getElementById("jwe-profiles-messaging-messages").appendChild(messageItem);
      jwe_Profiles.state["messages"][messages[i].id] = messages[i];
    }

    document.getElementById("jwe-profiles-messaging-messages-modify").disabled = true;
    document.getElementById("jwe-profiles-messaging-messages-delete").disabled = true;
  },

  saveMessages : function()
  {
    for ( var i in jwe_Profiles.state["messages"] )
    {
      var message = jwe_Profiles.state["messages"][i];
      if ( message.isChanged )
        JILProfileService.wrappedJSObject.updateMessage(message);
      else if ( message.isNew )
        JILProfileService.wrappedJSObject.addMessage(message);
    }

    for ( var i = 0; i < jwe_Profiles.state["deletedMessages"].length; i++ )
    {
      if ( !jwe_Profiles.state["deletedMessages"][i].isNew )
        JILProfileService.wrappedJSObject.deleteMessage(jwe_Profiles.state["selMessage"], jwe_Profiles.state["deletedMessages"][i]);
    }
  },

  loadAddressBook : function()
  {
    jwe_Profiles.clearListBox(document.getElementById("jwe-profiles-pim-attributes"));
    jwe_Profiles.clearListBox(document.getElementById("jwe-profiles-pim-addressbook"));
    jwe_Profiles.clearListBox(document.getElementById("jwe-profiles-pim-addressgroups"));

    var attributes = JILProfileService.wrappedJSObject.getAddressAvailableAttributes(jwe_Profiles.state["selPIM"]);

    for ( var i = 0; i < attributes.length; i++ )
    {
      var attrItem = jwe_Profiles.createListitem({id: "aa-"+attributes[i].id, value: attributes[i].id});

      var keyCell = jwe_Profiles.createListCell({id: "aa-"+attributes[i].id+"-key", label: attributes[i].key});

      attrItem.appendChild(keyCell);

      document.getElementById("jwe-profiles-pim-attributes").appendChild(attrItem);
      jwe_Profiles.state["attributes"][attributes[i].id] = attributes[i];
    }
    document.getElementById("jwe-profiles-pim-attributes-modify").disabled = true;
    document.getElementById("jwe-profiles-pim-attributes-delete").disabled = true;

    var items = JILProfileService.wrappedJSObject.getAddressBookItems(jwe_Profiles.state["selPIM"]);

    for ( var i = 0; i < items.length; i++ )
    {
      var addrItem = jwe_Profiles.createListitem({id: "ai-"+items[i].id, value: items[i].id});

      var fullNameCell = jwe_Profiles.createListCell({id: "ai-"+items[i].id+"-name", label: items[i].fullName});
      var mobileCell = jwe_Profiles.createListCell({id: "ai-"+items[i].id+"-mobile", label: items[i].mobilePhone});
      var emailCell = jwe_Profiles.createListCell({id: "ai-"+items[i].id+"-email", label: items[i].email});
      
      addrItem.appendChild(fullNameCell);
      addrItem.appendChild(mobileCell);
      addrItem.appendChild(emailCell);

      document.getElementById("jwe-profiles-pim-addressbook").appendChild(addrItem);
      jwe_Profiles.state["addressBookItems"][items[i].id] = items[i];
    }
    document.getElementById("jwe-profiles-pim-address-modify").disabled = true;
    document.getElementById("jwe-profiles-pim-address-delete").disabled = true;    

    var groups = JILProfileService.wrappedJSObject.getAddressBookGroups(jwe_Profiles.state["selPIM"]);

    for ( var i = 0; i < groups.length; i++ )
    {
      var groupItem = jwe_Profiles.createListitem({id: "ag-"+groups[i].id, value: groups[i].id});

      var nameCell = jwe_Profiles.createListCell({id: "ag-"+groups[i].id+"-name", label: groups[i].name});
      var countCell = jwe_Profiles.createListCell({id: "ag-"+groups[i].id+"-count", label: groups[i].addressBookItemCount});

      groupItem.appendChild(nameCell);
      groupItem.appendChild(countCell);

      document.getElementById("jwe-profiles-pim-addressgroups").appendChild(groupItem);
      jwe_Profiles.state["addressBookGroups"][groups[i].id] = groups[i];
    }
    document.getElementById("jwe-profiles-pim-groups-modify").disabled = true;
    document.getElementById("jwe-profiles-pim-groups-delete").disabled = true;
  },

  saveAddressBook : function()
  {
    // attributes
    for ( var i in jwe_Profiles.state["attributes"] )
    {
      var attribute = jwe_Profiles.state["attributes"][i];
      if ( attribute.isChanged )
        JILProfileService.wrappedJSObject.updateAttribute(attribute);
      else if ( attribute.isNew )
        JILProfileService.wrappedJSObject.addAttribute(attribute);
    }

    for ( var i = 0; i < jwe_Profiles.state["deletedAttributes"].length; i++ )
    {
      if ( !jwe_Profiles.state["deletedAttributes"][i].isNew )
        JILProfileService.wrappedJSObject.deleteAttribute(jwe_Profiles.state["selPIM"], jwe_Profiles.state["deletedAttributes"][i]);
    }

    // items
    for ( var i in jwe_Profiles.state["addressBookItems"] )
    {
      var item = jwe_Profiles.state["addressBookItems"][i];
      if ( item.isChanged )
        JILProfileService.wrappedJSObject.updateAddressBookItem(item);
      else if ( item.isNew )
        JILProfileService.wrappedJSObject.addAddressBookItem(item);
    }

    for ( var i = 0; i < jwe_Profiles.state["deletedAddressBookItems"].length; i++ )
    {
      if ( !jwe_Profiles.state["deletedAddressBookItems"][i].isNew )
        JILProfileService.wrappedJSObject.deleteAddressBookItem(jwe_Profiles.state["selPIM"], jwe_Profiles.state["deletedAddressBookItems"][i]);
    }

    // groups
    for ( var i in jwe_Profiles.state["addressBookGroups"] )
    {
      var group = jwe_Profiles.state["addressBookGroups"][i];
      if ( group.isChanged )
        JILProfileService.wrappedJSObject.updateAddressBookGroup(group);
      else if ( group.isNew )
        JILProfileService.wrappedJSObject.addAddressBookGroup(group);
    }

    for ( var i = 0; i < jwe_Profiles.state["deletedAddressBookGroups"].length; i++ )
    {
      if ( !jwe_Profiles.state["deletedAddressBookGroups"][i].isNew )
        JILProfileService.wrappedJSObject.deleteAddressBookGroup(jwe_Profiles.state["selPIM"], jwe_Profiles.state["deletedAddressBookGroups"][i]);
    }
  },

  loadCalendar : function()
  {
    jwe_Profiles.clearListBox(document.getElementById("jwe-profiles-pim-calendaritems"));

    var items = JILProfileService.wrappedJSObject.getCalendarItems(jwe_Profiles.state["selPIM"]);

    for ( var i = 0; i < items.length; i++ )
    {
      var calendarItem = jwe_Profiles.createListitem({id: "ci-"+items[i].id, value: items[i].id});

      var nameCell = jwe_Profiles.createListCell({id: "ci-"+items[i].id+"-name", label: items[i].name});
      var startCell = jwe_Profiles.createListCell({id: "ci-"+items[i].id+"-start", label: items[i].startDatetime});
      var endCell = jwe_Profiles.createListCell({id: "ci-"+items[i].id+"-end", label: items[i].endDatetime});

      calendarItem.appendChild(nameCell);
      calendarItem.appendChild(startCell);
      calendarItem.appendChild(endCell);

      jwe_Profiles.state["calendarItems"][items[i].id] = items[i];
      document.getElementById("jwe-profiles-pim-calendaritems").appendChild(calendarItem);
    }

    document.getElementById("jwe-profiles-pim-calendar-modify").disabled = true;
    document.getElementById("jwe-profiles-pim-calendar-delete").disabled = true;
  },

  saveCalendar : function()
  {
    for ( var i in jwe_Profiles.state["calendarItems"] )
    {
      var item = jwe_Profiles.state["calendarItems"][i];
      if ( item.isChanged )
        JILProfileService.wrappedJSObject.updateCalendarItem(item);
      else if ( item.isNew )
        JILProfileService.wrappedJSObject.addCalendarItem(item);
    }

    for ( var i = 0; i < jwe_Profiles.state["deletedCalendarItems"].length; i++ )
    {
      if ( !jwe_Profiles.state["deletedCalendarItems"][i].isNew )
        JILProfileService.wrappedJSObject.deleteCalendarItem(jwe_Profiles.state["selPIM"], jwe_Profiles.state["deletedCalendarItems"][i]);
    }
  },

  resetDDevice : function()
  {
    jwe_Profiles.state["fileSystems"] = new Array();
    jwe_Profiles.state["deletedFileSystems"] = new Array();

    document.getElementById("jwe-profiles-devices-device-app-alarm").checked = false;
    document.getElementById("jwe-profiles-devices-device-app-browser").checked = false;
    document.getElementById("jwe-profiles-devices-device-app-calculator").checked = false;
    document.getElementById("jwe-profiles-devices-device-app-calendar").checked = false;
    document.getElementById("jwe-profiles-devices-device-app-camera").checked = false;
    document.getElementById("jwe-profiles-devices-device-app-contacts").checked = false;
    document.getElementById("jwe-profiles-devices-device-app-files").checked = false;
    document.getElementById("jwe-profiles-devices-device-app-games").checked = false;
    document.getElementById("jwe-profiles-devices-device-app-mail").checked = false;
    document.getElementById("jwe-profiles-devices-device-app-mediaplayer").checked = false;
    document.getElementById("jwe-profiles-devices-device-app-messaging").checked = false;
    document.getElementById("jwe-profiles-devices-device-app-phonecall").checked = false;
    document.getElementById("jwe-profiles-devices-device-app-pictures").checked = false;
    document.getElementById("jwe-profiles-devices-device-app-prog_manager").checked = false;
    document.getElementById("jwe-profiles-devices-device-app-settings").checked = false;
    document.getElementById("jwe-profiles-devices-device-app-tasks").checked = false;
    document.getElementById("jwe-profiles-devices-device-app-widget_manager").checked = false;
  },

  resetDGeneral : function()
  {
    document.getElementById("jwe-profiles-device-panel-general-msglist").removeAllItems();
    document.getElementById("jwe-profiles-device-panel-general-pimlist").removeAllItems();
  },

  resetTelephony : function()
  {
    jwe_Profiles.state["callRecords"] = new Array();
    jwe_Profiles.state["deletedCallRecords"] = new Array();
  },

  resetCalendar : function()
  {
    jwe_Profiles.state["calendarItems"] = new Array();
    jwe_Profiles.state["deletedCalendarItems"] = new Array();
  },

  resetAddressBook : function()
  {
    jwe_Profiles.state["attributes"] = new Array();
    jwe_Profiles.state["deletedAttributes"] = new Array();

    jwe_Profiles.state["addressBookItems"] = new Array();
    jwe_Profiles.state["deletedAddressBookItems"] = new Array();

    jwe_Profiles.state["addressBookGroups"] = new Array();
    jwe_Profiles.state["deletedAddressBookGroups"] = new Array();
  },

  resetMessages : function()
  {
    jwe_Profiles.state["messages"] = new Array();
    jwe_Profiles.state["deletedMessages"] = new Array();
  },

  resetMessageFolders : function()
  {
    jwe_Profiles.state["messageFolders"] = new Array();
    jwe_Profiles.state["deletedMessageFolders"] = new Array();
  },

  resetEmailAccounts : function()
  {
    jwe_Profiles.state["emailAccounts"] = new Array();
    jwe_Profiles.state["deletedEmailAccounts"] = new Array();
    jwe_Profiles.state["defaultEmailAccount"] = null;
  },

  resetDWidget : function()
  {
    jwe_Profiles.state["emulatedWidgets"] = new Array();
    jwe_Profiles.state["deletedEmulatedWidgets"] = new Array();
  },

  resetDDNetwork : function()
  {
    document.getElementById("jwe-profiles-devices-datanetwork-bluetooth").checked = false;
    document.getElementById("jwe-profiles-devices-datanetwork-edge").checked = false;
    document.getElementById("jwe-profiles-devices-datanetwork-evdo").checked = false;
    document.getElementById("jwe-profiles-devices-datanetwork-gprs").checked = false;
    document.getElementById("jwe-profiles-devices-datanetwork-irda").checked = false;
    document.getElementById("jwe-profiles-devices-datanetwork-lte").checked = false;
    document.getElementById("jwe-profiles-devices-datanetwork-onexrtt").checked = false;
    document.getElementById("jwe-profiles-devices-datanetwork-wifi").checked = false;
  },

  resetDState : function()
  {
    document.getElementById("jwe-profiles-devices-devicestate-backlight").checked = false;
    document.getElementById("jwe-profiles-devices-devicestate-keypadlight").checked = false;
  },

  resetConfig : function()
  {
    document.getElementById("jwe-profiles-devices-config-vibe").checked = false;
  },

  resetPowerInfo : function()
  {
    document.getElementById("jwe-profiles-devices-power-charging").checked = false;
  },

  resetRadioInfo : function()
  {
    document.getElementById("jwe-profiles-devices-radio-enabled").checked = false;
    document.getElementById("jwe-profiles-devices-radio-roaming").checked = false;
  },

  resetMultimedia : function()
  {
    document.getElementById("jwe-profiles-devices-multimedia-audioplaying").checked = false;
    document.getElementById("jwe-profiles-devices-multimedia-videoplaying").checked = false;
  },

  /** generic change **/
  change : function(target)
  {
    if ( this.state[target].changed )
      return;
    document.getElementById("jwe-subtab-"+target).label = document.getElementById("jwe-subtab-"+target).label + " *"; 
    this.state[target].changed = true;
  },

  /** load given subtab **/
  loadSubTab : function(subtab)
  {
    if ( this.state[subtab].changed || this.state[subtab].loaded )
      return;
    this.state[subtab].load();
    this.state[subtab].loaded = true;

    this.state["CurrentView"] = subtab;
  },

  /** utility function to create list items **/
  createListitem : function(params) 
  {
    var listitem = document.createElement("listitem");

    if ( params.label != null )
      listitem.setAttribute("label", params.label);

    listitem.setAttribute("id", params.id);
    listitem.setAttribute("value", params.value);

    return(listitem);
  },

  /** utility function to create labels **/
  createListCell : function(params) 
  {
    var cell = document.createElement("listcell");
    cell.setAttribute("id", params.id);
    cell.setAttribute("label", params.label);
    return(cell);
  },

  /** utility function to create labels **/
  createLabel : function(value) 
  {
    var label = document.createElement("label");
    label.setAttribute("value", value);
    return(label);
  },

  /** utility function to create menu items **/
  createMenuitem : function(label, value) 
  {
    var menuitem = document.createElement("menuitem");

    menuitem.setAttribute("label", label);
    menuitem.setAttribute("value", value);

    return(menuitem);
  },

  createMenuPopup : function(id)
  {
    var menupopup = document.createElement("menupopup");
    menupopup.setAttribute("id", id);
    return(menupopup);
  },

  clearListBox : function(listbox)
  {
    var row = listbox.getItemAtIndex(0);
    while ( row != null )
    {
      listbox.removeItemAt(0);
      row = listbox.getItemAtIndex(0);
    }
  }
};

function SubTab(loadFn, resetFn, saveFn, type, key)
{
  this.load = loadFn;
  this.reset = resetFn;
  this.save = saveFn;
  this.type = type;
  this.key = key;
}

SubTab.prototype = 
{
  load : null,
  loaded : null,
  changed : null,
  type : null,
  key : null,
  reset : null,
  save : null
};

window["jwe_Profiles"] = jwe_Profiles;



var jwe_devicePanels = new Array(
  "jwe-profiles-device-panel-general", 
  "jwe-profiles-device-panel-widget", 
  "jwe-profiles-device-panel-device",
  "jwe-profiles-device-panel-account",
  "jwe-profiles-device-panel-deviceinfo",
  "jwe-profiles-device-panel-datanetwork",
  "jwe-profiles-device-panel-devicestate",
  "jwe-profiles-device-panel-accelerometer",
  "jwe-profiles-device-panel-config",
  "jwe-profiles-device-panel-position",
  "jwe-profiles-device-panel-power",
  "jwe-profiles-device-panel-radio",
  "jwe-profiles-device-panel-multimedia",
  "jwe-profiles-device-panel-telephony"
);

function jwe_changeDevicePanel(panel)
{
  for( var i = 0; i < jwe_devicePanels.length; i++ )
    document.getElementById(jwe_devicePanels[i]).style.display = "none";
    
  document.getElementById(panel).style.display = "block";
}

var jwe_messagingPanels = new Array(
  "jwe-profiles-messaging-panel-email", 
  "jwe-profiles-messaging-panel-folders", 
  "jwe-profiles-messaging-panel-messages"
);

function jwe_changeMessagingPanel(panel)
{
  for( var i = 0; i < jwe_messagingPanels.length; i++ )
    document.getElementById(jwe_messagingPanels[i]).style.display = "none";
    
  document.getElementById(panel).style.display = "block";
}

var jwe_pimPanels = new Array(
  "jwe-profiles-pim-panel-address",
  "jwe-profiles-pim-panel-calendar"
);

function jwe_changePIMPanel(panel)
{
  for( var i = 0; i < jwe_pimPanels.length; i++ )
    document.getElementById(jwe_pimPanels[i]).style.display = "none";
    
  document.getElementById(panel).style.display = "block";
}

function jwe_modifyEmulatedWidget()
{
  var widget = jwe_Profiles.state["emulatedWidgets"][document.getElementById("jwe-profiles-device-panel-widgets").getItemAtIndex(document.getElementById("jwe-profiles-device-panel-widgets").selectedIndex).value];

  var params = {inn:{profileId: jwe_Profiles.state["selDevice"], widget: widget}, out:null};       
  window.openDialog("chrome://transit-emulator/content/profiles/profilesWidgetPopup.xul", "jwe-emulated-widget-popup", "dialog, modal", params).focus();

  if (params.out) 
  {
    document.getElementById("ew-"+params.out.widget.id+"-name").setAttribute("label", params.out.widget.name);
    document.getElementById("ew-"+params.out.widget.id+"-version").setAttribute("label", params.out.widget.version);
    document.getElementById("ew-"+params.out.widget.id+"-author").setAttribute("label", params.out.widget.author);
    jwe_Profiles.state["emulatedWidgets"][params.out.widget.id] = params.out.widget;
    jwe_Profiles.change("dWidget");
  }
}

function jwe_newEmulatedWidget()
{
  var params = {inn:{profileId: jwe_Profiles.state["selDevice"], widget: null}, out:null};       
  window.openDialog("chrome://transit-emulator/content/profiles/profilesWidgetPopup.xul", "jwe-emulated-widget-popup", "dialog, modal", params).focus();

  if (params.out) 
  {
    var newItem = jwe_Profiles.createListitem({id: "ew-"+params.out.widget.id, value: params.out.widget.id});    
    
    var nameCell = jwe_Profiles.createListCell({id: "ew-"+params.out.widget.id+"-name", label: params.out.widget.name});
    var authorCell = jwe_Profiles.createListCell({id: "ew-"+params.out.widget.id+"-author", label: params.out.widget.author});
    var versionCell = jwe_Profiles.createListCell({id: "ew-"+params.out.widget.id+"-version", label: params.out.widget.version});

    newItem.appendChild(nameCell);
    newItem.appendChild(versionCell);
    newItem.appendChild(authorCell);

    document.getElementById("jwe-profiles-device-panel-widgets").appendChild(newItem);
    jwe_Profiles.state["emulatedWidgets"][params.out.widget.id] = params.out.widget;
    
    jwe_Profiles.change("dWidget");
  }
}

function jwe_deleteEmulatedWidget()
{
  var widgetId = document.getElementById("jwe-profiles-device-panel-widgets").getItemAtIndex(document.getElementById("jwe-profiles-device-panel-widgets").selectedIndex).value;
 
  jwe_Profiles.state["deletedEmulatedWidgets"].push(widgetId);
  delete jwe_Profiles.state["emulatedWidgets"][widgetId];

  document.getElementById("jwe-profiles-device-panel-widgets").removeItemAt(document.getElementById("jwe-profiles-device-panel-widgets").selectedIndex);

  jwe_Profiles.change("dWidget");
}

function jwe_selectEmulatedWidget()
{
  document.getElementById("jwe-profiles-widgets-prefs-modify").disabled = false;
  document.getElementById("jwe-profiles-widgets-prefs-preferences").disabled = false;
  document.getElementById("jwe-profiles-widgets-prefs-delete").disabled = false;
}

function jwe_openWidgetPrefs()
{
  var widget = jwe_Profiles.state["emulatedWidgets"][document.getElementById("jwe-profiles-device-panel-widgets").getItemAtIndex(document.getElementById("jwe-profiles-device-panel-widgets").selectedIndex).value];

  var params = {inn:{profileId: jwe_Profiles.state["selDevice"], widget: widget}, out:null};       
  window.openDialog("chrome://transit-emulator/content/profiles/profilesWidgetPreferences.xul", "jwe-widget-preferences-popup", "dialog, modal", params).focus();
}

function jwe_selectFileSystem()
{
  document.getElementById("jwe-profiles-devices-filesystems-modify").disabled = false;
  document.getElementById("jwe-profiles-devices-filesystems-delete").disabled = false;
}

function jwe_modifyFileSystem()
{
  var fsys = jwe_Profiles.state["fileSystems"][document.getElementById("jwe-profiles-devices-device-filesystems").getItemAtIndex(document.getElementById("jwe-profiles-devices-device-filesystems").selectedIndex).value];

  var params = {inn:{profileId: jwe_Profiles.state["selDevice"], filesystem: fsys}, out:null};       
  window.openDialog("chrome://transit-emulator/content/profiles/profilesFileSystem.xul", "jwe-widget-fsys-popup", "dialog, modal", params).focus();

  if (params.out) 
  {
    document.getElementById("fs-"+params.out.filesystem.id+"-rootPath").setAttribute("label", params.out.filesystem.rootPath);
    document.getElementById("fs-"+params.out.filesystem.id+"-localPath").setAttribute("label", params.out.filesystem.localPath);
    document.getElementById("fs-"+params.out.filesystem.id+"-size").setAttribute("label", params.out.filesystem.size);
      
    jwe_Profiles.state["fileSystems"][params.out.filesystem.id] = params.out.filesystem;
    jwe_Profiles.change("dDevice");
  }
}

function jwe_newFileSystem()
{
  var params = {inn:{profileId: jwe_Profiles.state["selDevice"], filesystem: null}, out:null};       
  window.openDialog("chrome://transit-emulator/content/profiles/profilesFileSystem.xul", "jwe-widget-fsys-popup", "dialog, modal", params).focus();

  if (params.out) 
  {
    var newItem = jwe_Profiles.createListitem({id: "fs-"+params.out.filesystem.id, value: params.out.filesystem.id});
    
    var pathCell = jwe_Profiles.createListCell({id: "fs-"+params.out.filesystem.id+"-rootPath", label: params.out.filesystem.rootPath});
    var lpathCell = jwe_Profiles.createListCell({id: "fs-"+params.out.filesystem.id+"-localPath", label: params.out.filesystem.localPath});
    var szCell = jwe_Profiles.createListCell({id: "fs-"+params.out.filesystem.id+"-size", label: params.out.filesystem.size});

    newItem.appendChild(pathCell);
    newItem.appendChild(lpathCell);
    newItem.appendChild(szCell);

    document.getElementById("jwe-profiles-devices-device-filesystems").appendChild(newItem);
    jwe_Profiles.state["fileSystems"][params.out.filesystem.id] = params.out.filesystem;
    
    jwe_Profiles.change("dDevice");
  }
}

function jwe_deleteFileSystem()
{
  var fsId = document.getElementById("jwe-profiles-devices-device-filesystems").getItemAtIndex(document.getElementById("jwe-profiles-devices-device-filesystems").selectedIndex).value;
 
  jwe_Profiles.state["deletedFileSystems"].push(fsId);
  delete jwe_Profiles.state["fileSystems"][fsId];

  document.getElementById("jwe-profiles-devices-device-filesystems").removeItemAt(document.getElementById("jwe-profiles-devices-device-filesystems").selectedIndex);

  jwe_Profiles.change("dDevice");
}



/** !!! ***/

function jwe_selectCallRecord()
{
  document.getElementById("jwe-profiles-devices-telephony-modify").disabled = false;
  document.getElementById("jwe-profiles-devices-telephony-delete").disabled = false;
}

function jwe_modifyCallRecord()
{
  var record = jwe_Profiles.state["callRecords"][document.getElementById("jwe-profiles-devices-telephony-records").getItemAtIndex(document.getElementById("jwe-profiles-devices-telephony-records").selectedIndex).value];

  var params = {inn:{profileId: jwe_Profiles.state["selDevice"], record: record}, out:null};       
  window.openDialog("chrome://transit-emulator/content/profiles/profilesCallRecord.xul", "jwe-widget-crec-popup", "dialog, modal", params).focus();

  if (params.out) 
  {
    document.getElementById("cr-"+params.out.record.id+"-address").setAttribute("label", params.out.record.address);
    document.getElementById("cr-"+params.out.record.id+"-type").setAttribute("label", params.out.record.type);
    document.getElementById("cr-"+params.out.record.id+"-id").setAttribute("label", params.out.record.id);
    jwe_Profiles.state["callRecords"][params.out.record.id] = params.out.record;
    jwe_Profiles.change("dTelephony");
  }
}

function jwe_newCallRecord()
{
  var params = {inn:{profileId: jwe_Profiles.state["selDevice"], record: null}, out:null};       
  window.openDialog("chrome://transit-emulator/content/profiles/profilesCallRecord.xul", "jwe-widget-crec-popup", "dialog, modal", params).focus();

  if (params.out) 
  {
    var newItem = jwe_Profiles.createListitem({id: "cr-"+params.out.record.id, value: params.out.record.id});
    
    var addrCell = jwe_Profiles.createListCell({id: "cr-"+params.out.record.id+"-address", label: params.out.record.address});
    var typeCell = jwe_Profiles.createListCell({id: "cr-"+params.out.record.id+"-type", label: params.out.record.type});
    var idCell = jwe_Profiles.createListCell({id: "cr-"+params.out.record.id+"-id", label: ""});

    newItem.appendChild(addrCell);
    newItem.appendChild(typeCell);
    newItem.appendChild(idCell);

    document.getElementById("jwe-profiles-devices-telephony-records").appendChild(newItem);
    jwe_Profiles.state["callRecords"][params.out.record.id] = params.out.record;
    
    jwe_Profiles.change("dTelephony");
  }
}

function jwe_deleteCallRecord()
{
  var recordId = document.getElementById("jwe-profiles-devices-telephony-records").getItemAtIndex(document.getElementById("jwe-profiles-devices-telephony-records").selectedIndex).value;
 
  jwe_Profiles.state["deletedCallRecords"].push(recordId);
  delete jwe_Profiles.state["callRecords"][recordId];

  document.getElementById("jwe-profiles-devices-telephony-records").removeItemAt(document.getElementById("jwe-profiles-devices-telephony-records").selectedIndex);

  jwe_Profiles.change("dTelephony");
}



/** !!! ***/

function jwe_modifyEmailAccount()
{
  var account = jwe_Profiles.state["emailAccounts"][document.getElementById("jwe-profiles-messaging-emailaccounts").getItemAtIndex(document.getElementById("jwe-profiles-messaging-emailaccounts").selectedIndex).value];

  var params = {inn:{msgProfileId: jwe_Profiles.state["selMessage"], account: account}, out:null};       
  window.openDialog("chrome://transit-emulator/content/profiles/profilesEmailAccount.xul", "jwe-widget-email-popup", "dialog, modal", params).focus();

  if (params.out) 
  {
    document.getElementById("em-"+params.out.account.id+"-name").setAttribute("label", params.out.account.name);
    jwe_Profiles.state["emailAccounts"][params.out.account.id] = params.out.account;
    jwe_Profiles.change("mEmail");
  }
}

function jwe_newEmailAccount()
{
  var params = {inn:{msgProfileId: jwe_Profiles.state["selMessage"], account: null}, out:null};       
  window.openDialog("chrome://transit-emulator/content/profiles/profilesEmailAccount.xul", "jwe-widget-email-popup", "dialog, modal", params).focus();

  if (params.out) 
  {
    var newItem = jwe_Profiles.createListitem({id: "em-"+params.out.account.id, value: params.out.account.id});
    
    var nameCell = jwe_Profiles.createListCell({id: "em-"+params.out.account.id+"-name", label: params.out.account.name});
    var defaultCell = jwe_Profiles.createListCell({id: "em-"+params.out.account.id+"-default", label: ""});

    newItem.appendChild(nameCell);
    newItem.appendChild(defaultCell);

    document.getElementById("jwe-profiles-messaging-emailaccounts").appendChild(newItem);
    jwe_Profiles.state["emailAccounts"][params.out.account.id] = params.out.account;
    
    jwe_Profiles.change("mEmail");
  }
}

function jwe_deleteEmailAccount()
{
  var accountId = document.getElementById("jwe-profiles-messaging-emailaccounts").getItemAtIndex(document.getElementById("jwe-profiles-messaging-emailaccounts").selectedIndex).value;
 
  jwe_Profiles.state["deletedEmailAccounts"].push(accountId);
  delete jwe_Profiles.state["emailAccounts"][accountId];

  // if they are removing an account that is being set as new default, remove it from the default to do list
  if ( (jwe_Profiles.state["defaultEmailAccount"] != null) && (accountId == jwe_Profiles.state["defaultEmailAccount"].id) )
    jwe_Profiles.state["defaultEmailAccount"] = null;

  document.getElementById("jwe-profiles-messaging-emailaccounts").removeItemAt(document.getElementById("jwe-profiles-messaging-emailaccounts").selectedIndex);

  jwe_Profiles.change("mEmail");
}

function jwe_setDefaultEmailAccount()
{
  var account = jwe_Profiles.state["emailAccounts"][document.getElementById("jwe-profiles-messaging-emailaccounts").getItemAtIndex(document.getElementById("jwe-profiles-messaging-emailaccounts").selectedIndex).value];

  for ( var i in jwe_Profiles.state["emailAccounts"] )
    document.getElementById("em-"+jwe_Profiles.state["emailAccounts"][i].id+"-default").setAttribute("label", "");

  document.getElementById("em-"+account.id+"-default").setAttribute("label", "*");
 
  jwe_Profiles.state["defaultEmailAccount"] = account;
  jwe_Profiles.change("mEmail");

  document.getElementById("jwe-profiles-messaging-email-delete").disabled = true;
  document.getElementById("jwe-profiles-messaging-email-makedefault").disabled = true;
}

function jwe_selectEmailAccount()
{
  if ( document.getElementById("jwe-profiles-messaging-emailaccounts").selectedIndex < 0 )
  {
    document.getElementById("jwe-profiles-messaging-email-delete").disabled = true;
    document.getElementById("jwe-profiles-messaging-email-makedefault").disabled = true;
    document.getElementById("jwe-profiles-messaging-email-modify").disabled = true;
    return;
  }

  var account = jwe_Profiles.state["emailAccounts"][document.getElementById("jwe-profiles-messaging-emailaccounts").getItemAtIndex(document.getElementById("jwe-profiles-messaging-emailaccounts").selectedIndex).value];

  // dont allow setting default to new accounts
  if ( account.isNew )
    document.getElementById("jwe-profiles-messaging-email-makedefault").disabled = true;
  else
    document.getElementById("jwe-profiles-messaging-email-makedefault").disabled = false;

  // dont allow delete for default accounts
  if ( account.isDefault == true )
  {
    document.getElementById("jwe-profiles-messaging-email-delete").disabled = true;
    document.getElementById("jwe-profiles-messaging-email-makedefault").disabled = true;
  }
  else
    document.getElementById("jwe-profiles-messaging-email-delete").disabled = false;

  document.getElementById("jwe-profiles-messaging-email-modify").disabled = false;
}




/** !!! ***/

function jwe_newMessageFolder()
{
  var params = {inn:{msgProfileId: jwe_Profiles.state["selMessage"], folder: null}, out:null};       
  window.openDialog("chrome://transit-emulator/content/profiles/profilesMessageFolder.xul", "jwe-widget-mfolder-popup", "dialog, modal", params).focus();

  if (params.out) 
  {
    var newItem = jwe_Profiles.createListitem({id: "mf-"+params.out.folder.id, value: params.out.folder.id});
    
    var nameCell = jwe_Profiles.createListCell({id: "mf-"+params.out.folder.id+"-name", label: params.out.folder.name});
    var typeCell = jwe_Profiles.createListCell({id: "mf-"+params.out.folder.id+"-type", label: params.out.folder.type});
    var messagesCell = jwe_Profiles.createListCell({id: "mf-"+params.out.folder.id+"-messages", label: ""});

    newItem.appendChild(nameCell);
    newItem.appendChild(typeCell);
    newItem.appendChild(messagesCell);

    document.getElementById("jwe-profiles-messaging-folders").appendChild(newItem);
    jwe_Profiles.state["messageFolders"][params.out.folder.id] = params.out.folder;
    
    jwe_Profiles.change("mFolders");
  }
}

function jwe_modifyMessageFolder()
{
  var folder = jwe_Profiles.state["messageFolders"][document.getElementById("jwe-profiles-messaging-folders").getItemAtIndex(document.getElementById("jwe-profiles-messaging-folders").selectedIndex).value];

  var params = {inn:{msgProfileId: jwe_Profiles.state["selMessage"], folder: folder}, out:null};       
  window.openDialog("chrome://transit-emulator/content/profiles/profilesMessageFolder.xul", "jwe-widget-mfolder-popup", "dialog, modal", params).focus();

  if (params.out) 
  {
    document.getElementById("mf-"+params.out.folder.id+"-name").setAttribute("label", params.out.folder.name);
    document.getElementById("mf-"+params.out.folder.id+"-type").setAttribute("label", params.out.folder.type);
    jwe_Profiles.state["messageFolders"][params.out.folder.id] = params.out.folder;
    jwe_Profiles.change("mFolders");
  }
}

function jwe_deleteMessageFolder()
{
  var folderId = document.getElementById("jwe-profiles-messaging-folders").getItemAtIndex(document.getElementById("jwe-profiles-messaging-folders").selectedIndex).value;
 
  jwe_Profiles.state["deletedMessageFolders"].push(folderId);
  delete jwe_Profiles.state["messageFolders"][folderId];

  document.getElementById("jwe-profiles-messaging-folders").removeItemAt(document.getElementById("jwe-profiles-messaging-folders").selectedIndex);

  jwe_Profiles.change("mFolders");  
}

function jwe_selectMessageFolder()
{
  document.getElementById("jwe-profiles-messaging-folders-modify").disabled = false;
  document.getElementById("jwe-profiles-messaging-folders-delete").disabled = false;
}




/** !!! ***/

function jwe_newMessage()
{
  var params = {inn:{msgProfileId: jwe_Profiles.state["selMessage"], message: null}, out:null};       
  window.openDialog("chrome://transit-emulator/content/profiles/profilesMessage.xul", "jwe-widget-message-popup", "dialog, modal", params).focus();

  if (params.out) 
  {
    var newItem = jwe_Profiles.createListitem({id: "ms-"+params.out.message.id, value: params.out.message.id});
    
    var folderCell = jwe_Profiles.createListCell({id: "ms-"+params.out.message.id+"-folder", label: params.out.message.folderName});
    var toCell = jwe_Profiles.createListCell({id: "ms-"+params.out.message.id+"-to", label: params.out.message.toAddress});
    var subjectCell = jwe_Profiles.createListCell({id: "ms-"+params.out.message.id+"-subject", label: params.out.message.subject});
    var fromCell = jwe_Profiles.createListCell({id: "ms-"+params.out.message.id+"-from", label: params.out.message.sourceAddress});

    newItem.appendChild(folderCell);
    newItem.appendChild(toCell);
    newItem.appendChild(subjectCell);
    newItem.appendChild(fromCell);

    document.getElementById("jwe-profiles-messaging-messages").appendChild(newItem);
    jwe_Profiles.state["messages"][params.out.message.id] = params.out.message;
    
    jwe_Profiles.change("mMessages");
  }
}

function jwe_modifyMessage()
{
  var message = jwe_Profiles.state["messages"][document.getElementById("jwe-profiles-messaging-messages").getItemAtIndex(document.getElementById("jwe-profiles-messaging-messages").selectedIndex).value];

  var params = {inn:{msgProfileId: jwe_Profiles.state["selMessage"], message: message}, out:null};       
  window.openDialog("chrome://transit-emulator/content/profiles/profilesMessage.xul", "jwe-widget-message-popup", "dialog, modal", params).focus();

  if (params.out) 
  {
    document.getElementById("ms-"+params.out.message.id+"-folder").setAttribute("label", params.out.message.folderName);
    document.getElementById("ms-"+params.out.message.id+"-to").setAttribute("label", params.out.message.toAddress);
    document.getElementById("ms-"+params.out.message.id+"-subject").setAttribute("label", params.out.message.subject);
    document.getElementById("ms-"+params.out.message.id+"-from").setAttribute("label", params.out.message.sourceAddress);
    jwe_Profiles.state["messages"][params.out.message.id] = params.out.message;
    jwe_Profiles.change("mMessages");
  }
}

function jwe_deleteMessage()
{
  var messageId = document.getElementById("jwe-profiles-messaging-messages").getItemAtIndex(document.getElementById("jwe-profiles-messaging-messages").selectedIndex).value;
 
  jwe_Profiles.state["deletedMessages"].push(messageId);
  delete jwe_Profiles.state["messages"][messageId];

  document.getElementById("jwe-profiles-messaging-messages").removeItemAt(document.getElementById("jwe-profiles-messaging-messages").selectedIndex);

  jwe_Profiles.change("mMessages");  
}

function jwe_selectMessage()
{
  document.getElementById("jwe-profiles-messaging-messages-modify").disabled = false;
  document.getElementById("jwe-profiles-messaging-messages-delete").disabled = false;
}




/** !!! ***/

function jwe_newAddressAttribute()
{
  var params = {inn:{pimProfileId: jwe_Profiles.state["selPIM"], attribute: null}, out:null};       
  window.openDialog("chrome://transit-emulator/content/profiles/profilesAddressAttribute.xul", "jwe-widget-addrattr-popup", "dialog, modal", params).focus();

  if (params.out) 
  {
    var newItem = jwe_Profiles.createListitem({id: "aa-"+params.out.attribute.id, value: params.out.attribute.key});
    
    var keyCell = jwe_Profiles.createListCell({id: "aa-"+params.out.attribute.id+"-key", label: params.out.attribute.key});

    newItem.appendChild(keyCell);

    document.getElementById("jwe-profiles-pim-attributes").appendChild(newItem);
    jwe_Profiles.state["attributes"][params.out.attribute.id] = params.out.attribute;
    
    jwe_Profiles.change("pAddress");
  }
}

function jwe_modifyAddressAttribute()
{
  var attribute = jwe_Profiles.state["attributes"][document.getElementById("jwe-profiles-pim-attributes").getItemAtIndex(document.getElementById("jwe-profiles-pim-attributes").selectedIndex).value];

  var params = {inn:{pimProfileId: jwe_Profiles.state["selPIM"], attribute: attribute}, out:null};       
  window.openDialog("chrome://transit-emulator/content/profiles/profilesAddressAttribute.xul", "jwe-widget-addrattr-popup", "dialog, modal", params).focus();

  if (params.out) 
  {
    document.getElementById("aa-"+params.out.attribute.id+"-key").setAttribute("label", params.out.attribute.key);
    jwe_Profiles.state["attributes"][params.out.attribute.id] = params.out.attribute;
    jwe_Profiles.change("pAddress");
  }
}

function jwe_deleteAddressAttribute()
{
  var attribId = document.getElementById("jwe-profiles-pim-attributes").getItemAtIndex(document.getElementById("jwe-profiles-pim-attributes").selectedIndex).value;
 
  jwe_Profiles.state["deletedAttributes"].push(attribId);
  delete jwe_Profiles.state["attributes"][attribId];

  document.getElementById("jwe-profiles-pim-attributes").removeItemAt(document.getElementById("jwe-profiles-pim-attributes").selectedIndex);

  jwe_Profiles.change("pAddress");  
}

function jwe_selectAddressAttribute()
{
  document.getElementById("jwe-profiles-pim-attributes-modify").disabled = false;
  document.getElementById("jwe-profiles-pim-attributes-delete").disabled = false;
}




/** !!! ***/

function jwe_newAddressBookItem()
{
  var params = {inn:{pimProfileId: jwe_Profiles.state["selPIM"], item: null}, out:null};       
  window.openDialog("chrome://transit-emulator/content/profiles/profilesAddressBookItem.xul", "jwe-widget-addr-popup", "dialog, modal", params).focus();

  if (params.out) 
  {
    var newItem = jwe_Profiles.createListitem({id: "ai-"+params.out.item.id, value: params.out.item.id});
    
    var nameCell = jwe_Profiles.createListCell({id: "ai-"+params.out.item.id+"-name", label: params.out.item.fullName});
    var mobileCell = jwe_Profiles.createListCell({id: "ai-"+params.out.item.id+"-mobile", label: params.out.item.mobilePhone});
    var emailCell = jwe_Profiles.createListCell({id: "ai-"+params.out.item.id+"-email", label: params.out.item.email});

    newItem.appendChild(nameCell);
    newItem.appendChild(mobileCell);
    newItem.appendChild(emailCell);

    document.getElementById("jwe-profiles-pim-addressbook").appendChild(newItem);
    jwe_Profiles.state["addressBookItems"][params.out.item.id] = params.out.item;
    
    jwe_Profiles.change("pAddress");
  }
}

function jwe_modifyAddressBookItem()
{
  var item = jwe_Profiles.state["addressBookItems"][document.getElementById("jwe-profiles-pim-addressbook").getItemAtIndex(document.getElementById("jwe-profiles-pim-addressbook").selectedIndex).value];

  var params = {inn:{pimProfileId: jwe_Profiles.state["selPIM"], item: item}, out:null};       
  window.openDialog("chrome://transit-emulator/content/profiles/profilesAddressBookItem.xul", "jwe-widget-addr-popup", "dialog, modal", params).focus();

  if (params.out) 
  {
    document.getElementById("ai-"+params.out.item.id+"-name").setAttribute("label", params.out.item.fullName);
    document.getElementById("ai-"+params.out.item.id+"-mobile").setAttribute("label", params.out.item.mobilePhone);
    document.getElementById("ai-"+params.out.item.id+"-email").setAttribute("label", params.out.item.email);

    jwe_Profiles.state["addressBookItems"][params.out.item.id] = params.out.item;
    jwe_Profiles.change("pAddress");
  }
}

function jwe_deleteAddressBookItem()
{
  var itemId = document.getElementById("jwe-profiles-pim-addressbook").getItemAtIndex(document.getElementById("jwe-profiles-pim-addressbook").selectedIndex).value;
 
  jwe_Profiles.state["deletedAddressBookItems"].push(itemId);
  delete jwe_Profiles.state["addressBookItems"][itemId];

  document.getElementById("jwe-profiles-pim-addressbook").removeItemAt(document.getElementById("jwe-profiles-pim-addressbook").selectedIndex);

  jwe_Profiles.change("pAddress"); 
}

function jwe_selectAddressBookItem()
{
  document.getElementById("jwe-profiles-pim-address-modify").disabled = false;
  document.getElementById("jwe-profiles-pim-address-delete").disabled = false;
}




/** !!! ***/

function jwe_newAddressBookGroup()
{
  var params = {inn:{pimProfileId: jwe_Profiles.state["selPIM"], group: null}, out:null};       
  window.openDialog("chrome://transit-emulator/content/profiles/profilesAddressGroup.xul", "jwe-widget-addrgrp-popup", "dialog, modal", params).focus();

  if (params.out) 
  {
    var newItem = jwe_Profiles.createListitem({id: "ag-"+params.out.group.id, value: params.out.group.id});
    
    var nameCell = jwe_Profiles.createListCell({id: "ag-"+params.out.group.id+"-name", label: params.out.group.name});
    var countCell = jwe_Profiles.createListCell({id: "ag-"+params.out.group.id+"-count", label: params.out.group.members.length});

    newItem.appendChild(nameCell);
    newItem.appendChild(countCell);

    document.getElementById("jwe-profiles-pim-addressgroups").appendChild(newItem);
    jwe_Profiles.state["addressBookGroups"][params.out.group.id] = params.out.group;
    
    jwe_Profiles.change("pAddress");
  }
}

function jwe_modifyAddressBookGroup()
{
  //var members = 
  var group = jwe_Profiles.state["addressBookGroups"][document.getElementById("jwe-profiles-pim-addressgroups").getItemAtIndex(document.getElementById("jwe-profiles-pim-addressgroups").selectedIndex).value];

  var params = {inn:{pimProfileId: jwe_Profiles.state["selPIM"], group: group}, out:null};
  window.openDialog("chrome://transit-emulator/content/profiles/profilesAddressGroup.xul", "jwe-widget-addrgrp-popup", "dialog, modal", params).focus();

  if (params.out) 
  {
    document.getElementById("ag-"+params.out.group.id+"-name").setAttribute("label", params.out.group.name);
    document.getElementById("ag-"+params.out.group.id+"-count").setAttribute("label", params.out.group.members.length);

    jwe_Profiles.state["addressBookGroups"][params.out.group.id] = params.out.group;
    jwe_Profiles.change("pAddress");
  }
}

function jwe_deleteAddressBookGroup()
{
  var groupId = document.getElementById("jwe-profiles-pim-addressgroups").getItemAtIndex(document.getElementById("jwe-profiles-pim-addressgroups").selectedIndex).value;
 
  jwe_Profiles.state["deletedAddressBookGroups"].push(groupId);
  delete jwe_Profiles.state["addressBookGroups"][groupId];

  document.getElementById("jwe-profiles-pim-addressgroups").removeItemAt(document.getElementById("jwe-profiles-pim-addressgroups").selectedIndex);

  jwe_Profiles.change("pAddress"); 
}

function jwe_selectAddressBookGroup()
{
  document.getElementById("jwe-profiles-pim-groups-modify").disabled = false;
  document.getElementById("jwe-profiles-pim-groups-delete").disabled = false;
}




/** !!! ***/

function jwe_newCalendarItem()
{
  var params = {inn:{pimProfileId: jwe_Profiles.state["selPIM"], item: null}, out:null};       
  window.openDialog("chrome://transit-emulator/content/profiles/profilesCalendarItem.xul", "jwe-widget-calitem-popup", "dialog, modal", params).focus();

  if (params.out) 
  {
    var newItem = jwe_Profiles.createListitem({id: "ci-"+params.out.item.id, value: params.out.item.id});
    
    var nameCell = jwe_Profiles.createListCell({id: "ci-"+params.out.item.id+"-name", label: params.out.item.name});
    var startCell = jwe_Profiles.createListCell({id: "ci-"+params.out.item.id+"-start", label: params.out.item.startDatetime});
    var endCell = jwe_Profiles.createListCell({id: "ci-"+params.out.item.id+"-end", label: params.out.item.endDatetime});

    newItem.appendChild(nameCell);
    newItem.appendChild(startCell);
    newItem.appendChild(endCell);

    document.getElementById("jwe-profiles-pim-calendaritems").appendChild(newItem);
    jwe_Profiles.state["calendarItems"][params.out.item.id] = params.out.item;
    
    jwe_Profiles.change("pCalendar");
  }
}

function jwe_modifyCalendarItem()
{
  var item = jwe_Profiles.state["calendarItems"][document.getElementById("jwe-profiles-pim-calendaritems").getItemAtIndex(document.getElementById("jwe-profiles-pim-calendaritems").selectedIndex).value];

  var params = {inn:{pimProfileId: jwe_Profiles.state["selPIM"], item: item}, out:null};
  window.openDialog("chrome://transit-emulator/content/profiles/profilesCalendarItem.xul", "jwe-widget-calitem-popup", "dialog, modal", params).focus();

  if (params.out) 
  {
    document.getElementById("ci-"+params.out.item.id+"-name").setAttribute("label", params.out.item.name);
    document.getElementById("ci-"+params.out.item.id+"-start").setAttribute("label", params.out.item.startDatetime);
    document.getElementById("ci-"+params.out.item.id+"-end").setAttribute("label", params.out.item.endDatetime);

    jwe_Profiles.state["calendarItems"][params.out.item.id] = params.out.item;
    jwe_Profiles.change("pCalendar");
  }
}

function jwe_deleteCalendarItem()
{
  var itemId = document.getElementById("jwe-profiles-pim-calendaritems").getItemAtIndex(document.getElementById("jwe-profiles-pim-calendaritems").selectedIndex).value;

  jwe_Profiles.state["deletedCalendarItems"].push(itemId);
  delete jwe_Profiles.state["calendarItems"][itemId];

  document.getElementById("jwe-profiles-pim-calendaritems").removeItemAt(document.getElementById("jwe-profiles-pim-calendaritems").selectedIndex);

  jwe_Profiles.change("pCalendar"); 
}

function jwe_selectCalendarItem()
{
  document.getElementById("jwe-profiles-pim-calendar-modify").disabled = false;
  document.getElementById("jwe-profiles-pim-calendar-delete").disabled = false;
}









function jwe_loadDefaults()
{
  var defaultValues = JILProfileService.wrappedJSObject.getDefaultValues();

  for ( var i in defaultValues )
  {
    var hboxContainer = document.createElement("hbox");
    hboxContainer.setAttribute("align", "center");
    hboxContainer.setAttribute("class", "jwe-profiles-defaults-row");
  
    var label = document.createElement("label");
    label.setAttribute("value", i+": ");
    label.setAttribute("class", "jwe-profiles-defaults-key");

    var textbox = document.createElement("textbox");
    textbox.setAttribute("size", "25");
    textbox.setAttribute("id", "jwe-profiles-defaults-key-"+i);
    textbox.setAttribute("value", defaultValues[i]);

    hboxContainer.appendChild(label);
    hboxContainer.appendChild(textbox);
    $("jwe-profiles-defualts-container").add(hboxContainer);
  }
}

function jwe_saveDefaults(saveMessage, successMessage)
{
  if ( confirm(saveMessage) )
  {
    var defaultValues = JILProfileService.wrappedJSObject.getDefaultValues();
    var newDefaultValues = new Array();

    for ( var i in defaultValues )
      newDefaultValues[i] = $("jwe-profiles-defaults-key-"+i).val();

    JILProfileService.wrappedJSObject.updateDefaultValues(newDefaultValues);

    alert(successMessage);
  }
}

function jwe_exportProfiles()
{
  window.openDialog("chrome://transit-emulator/content/profiles/profilesExportProfiles.xul", "jwe-widget-export-popup", "dialog, modal").focus();
}

function jwe_newDeviceProfile()
{
  window.openDialog("chrome://transit-emulator/content/profiles/profilesNewDevice.xul", "jwe-widget-newdevice-popup", "dialog, modal").focus();

  jwe_refreshDeviceList();
}

function jwe_newMessagingProfile()
{
  window.openDialog("chrome://transit-emulator/content/profiles/profilesNewMessaging.xul", "jwe-widget-newmessaging-popup", "dialog, modal").focus();
  
  jwe_refreshMessagingList();
}

function jwe_newPIMProfile()
{
  window.openDialog("chrome://transit-emulator/content/profiles/profilesNewPIM.xul", "jwe-widget-newpim-popup", "dialog, modal").focus();
  
  jwe_refreshPIMList();
}

function jwe_RenameProfile(type, listId)
{  
  var profileId = $(listId).selValue();
  var profileName = $(listId).selLabel();
  
  var params = {inn:{pimProfileId: jwe_Profiles.state["selPIM"], profileName: profileName}, out:null};
  window.openDialog("chrome://transit-emulator/content/profiles/profilesRenameProfile.xul", "jwe-widget-renameprofile-popup", "dialog, modal", params).focus();
  
  if (params.out) 
  {
    $(listId).selLabelVal(params.out.profileName);
  }
}

function jwe_deleteDeviceProfile(confirmMessage)
{
  if ( confirm(confirmMessage) )
  {
    var id = $("jwe-profiles-sel-device-list").selValue();

    JILProfileService.wrappedJSObject.deleteDeviceProfile(id);
  }
  else
    return;

  jwe_refreshDeviceList();
}

function jwe_deleteMessagingProfile(confirmMessage)
{
  if ( confirm(confirmMessage) )
  {
    var id = $("jwe-profiles-sel-messages-list").selValue();
    
    JILProfileService.wrappedJSObject.deleteMessagingProfile(id);
  }
  else
    return;
    
  jwe_refreshMessagingList();
}

function jwe_deletePIMProfile(confirmMessage)
{
  if ( confirm(confirmMessage) )
  {
    var id = $("jwe-profiles-sel-pims-list").selValue();
    
    JILProfileService.wrappedJSObject.deletePIMProfile(id);
  }
    else
      return;
    
    jwe_refreshPIMList();
}

function jwe_importProfiles(importSuccessful, importFailed)
{
  var nsIFilePicker = Components.interfaces.nsIFilePicker;
  var fp = Components.classes["@mozilla.org/filepicker;1"].createInstance(nsIFilePicker);
  fp.init(window, "Select a File", nsIFilePicker.modeOpen);
  fp.appendFilter("Transit Widget Emulator File (*.json)","*.json");
  
  var res = fp.show();
  // accept an OK 
  if ( res == nsIFilePicker.returnOK )
  {
    //alert(fp.file.path);
    
    var jsonString = "";
    var fstream = Components.classes["@mozilla.org/network/file-input-stream;1"].createInstance(Components.interfaces.nsIFileInputStream);
    var cstream = Components.classes["@mozilla.org/intl/converter-input-stream;1"].createInstance(Components.interfaces.nsIConverterInputStream);
    fstream.init(fp.file, -1, 0, 0);
    cstream.init(fstream, "UTF-8", 0, 0);

    var str = {};
    cstream.readString(-1, str);
    jsonString = str.value;
    cstream.close();      
        
    if ( JILProfileService.wrappedJSObject.importProfile(jsonString) )
      alert(importSuccessful);
    else
    {
      alert(importFailed);
      return;
    }
  }
  jwe_refreshDeviceList();
  jwe_refreshMessagingList();
  jwe_refreshPIMList();
}

function jwe_refreshDeviceList()
{
  // refresh the device profile list
  // save the currently selected item so we can set it later
  var oldSelection = $("jwe-profiles-sel-device-list").sel();

  var devices = JILProfileService.wrappedJSObject.getAllDeviceProfiles();
  jwe_Profiles.clearListBox($("jwe-profiles-sel-device-list").node);

  for ( var i = 0; i < devices.length; i++ )
  {
    var deviceItem = jwe_Profiles.createListitem({id: "de-"+devices[i].id, label: devices[i].name, value: devices[i].id});
    $("jwe-profiles-sel-device-list").add(deviceItem);
  }
  if ( devices.length < 2 )
    $("jwe-profiles-sel-device-list").sel(0);
  else
    $("jwe-profiles-sel-device-list").sel(oldSelection);

  // if there's more than one device, allow them to delete
  if ( devices.length > 1 )
    $("jwe-profiles-device-remove").disable(false);
  else
    $("jwe-profiles-device-remove").disable(true);
}

function jwe_refreshMessagingList()
{
  var oldSelection = $("jwe-profiles-sel-messages-list").sel();
  
  var messaging = JILProfileService.wrappedJSObject.getAllMessageProfiles();
  jwe_Profiles.clearListBox($("jwe-profiles-sel-messages-list").node);

  for ( var i = 0; i < messaging.length; i++ )
  {
    var msgItem = jwe_Profiles.createListitem({id: "me-"+messaging[i].id, label: messaging[i].name, value: messaging[i].id});
    $("jwe-profiles-sel-messages-list").add(msgItem);
  }
  if ( messaging.length < 2 )
    $("jwe-profiles-sel-messages-list").sel(0);
  else
    $("jwe-profiles-sel-messages-list").sel(oldSelection);

  if ( messaging.length > 1 )
    $("jwe-profiles-messaging-remove").disable(false);
  else
    $("jwe-profiles-messaging-remove").disable(true);
}

function jwe_refreshPIMList()
{
  var oldSelection = $("jwe-profiles-sel-pims-list").sel();
  
  var pims = JILProfileService.wrappedJSObject.getAllPIMProfiles();
  jwe_Profiles.clearListBox($("jwe-profiles-sel-pims-list").node);

  for ( var i = 0; i < pims.length; i++ )
  {
    var pimItem = jwe_Profiles.createListitem({id: "pi-"+pims[i].id, label: pims[i].name, value: pims[i].id});
    $("jwe-profiles-sel-pims-list").add(pimItem);
  }
    if ( pims.length < 2 )
    $("jwe-profiles-sel-pims-list").sel(0);
  else
    $("jwe-profiles-sel-pims-list").sel(oldSelection);

  if ( pims.length > 1 )
    $("jwe-profiles-pim-remove").disable(false);
  else
    $("jwe-profiles-pim-remove").disable(true);
}