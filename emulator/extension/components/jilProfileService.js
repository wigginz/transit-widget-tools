const CLASS_ID = Components.ID("c37a7321-3dd3-11df-9879-0800200c9a66"); //#
const CLASS_NAME = "JIL API Profile Service"; //#
const CONTRACT_ID = "@jil.org/jilapi-profileservice;1"; //#

const SQL_FILE = "transit-emulator_1-2-2-20100709.sqlite";
const PROF_DIR = "transit";

/***********************************************************/

var service = null;

function JILProfileService() //#
{
  Components.utils.import("resource://transit-emulator/TransitCommon.jsm");
  Components.utils.import("resource://transit-emulator/UpgradeService.jsm");
    
  this.wrappedJSObject = this;

  // check to see if the sqlite file has been moved to the proper location outside of the extension directory (to make upgrading less destructive)
  var profDir = Components.classes["@mozilla.org/file/directory_service;1"].getService(Components.interfaces.nsIProperties).get("ProfD", Components.interfaces.nsIFile);
    
  var transitDir = Components.classes["@mozilla.org/file/local;1"].createInstance(Components.interfaces.nsILocalFile);  
  transitDir.initWithPath(profDir.path+ TransitCommon.getFileSeparator() +PROF_DIR);
    
  // if it doesnt exist, create the directory
  if ( !transitDir.exists() )
    transitDir.create(Components.interfaces.nsIFile.DIRECTORY_TYPE, 0755);
    
  transitDir.append(SQL_FILE);
  if ( !transitDir.exists() )
  {
    var sqlFile = __LOCATION__.parent.parent;
    sqlFile.append(SQL_FILE);  
    sqlFile.copyTo(transitDir.parent, "");
  }
  
  this.sqlFile = transitDir;

  service = this;
}

/***********************************************************/

JILProfileService.prototype = //#
{
  sqlFile : null,
  
  upgradeChecked : false,
  
  getAllDeviceProfiles : function()
  {
    var stmt = this.getConnection().createStatement("select dev.name as dname, dev.id as did, dev.uuid as duuid, dev.jil_api_spec as jilAPISpec, msg.id as mid, msg.name as mname, pim.id as pid, pim.name as pname from jwe_device_profile dev, jwe_messaging_profile msg, jwe_pim_profile pim where dev.messaging_profile_id = msg.id and dev.pim_profile_id = pim.id");

    var devices = new Array();
    try 
    {  
      while ( stmt.step() )
      {
        var device = new jilDeviceProfile();
        device.name = stmt.row.dname;
        device.id = stmt.row.did;  
        device.uuid = stmt.row.duuid;
        device.jilAPISpec = stmt.row.jilAPISpec;
        device.messageProfileId = stmt.row.mid;
        device.pimProfileId = stmt.row.pid;
        devices.push(device);
      }
    }
    finally 
    {
      stmt.reset();
    }

    return(devices);
  },

  getDeviceProfile : function(profileId)
  {
    var stmt = this.getConnection().createStatement("select dev.name as dname, dev.uuid as duuid, dev.jil_api_spec as jilAPISpec, msg.id as mid, msg.name as mname, pim.id as pid, pim.name as pname from jwe_device_profile dev, jwe_messaging_profile msg, jwe_pim_profile pim where dev.messaging_profile_id = msg.id and dev.pim_profile_id = pim.id and dev.id = :profileId");
    stmt.params.profileId = profileId;

    var device = new jilDeviceProfile();
    try 
    {  
      while ( stmt.step() )
      {
        device.name = stmt.row.dname;
        device.id = profileId;  
        device.uuid = stmt.row.duuid;
        device.jilAPISpec = stmt.row.jilAPISpec;
        device.messageProfileId = stmt.row.mid;
        device.pimProfileId = stmt.row.pid;
      }
    }
    finally 
    {
      stmt.reset();
    }

    return(device);
  },
  
  getMessagingProfile : function(msgProfileId)
  {
    var stmt = this.getConnection().createStatement("select name, default_email_id from jwe_messaging_profile where id = :msgProfileId");
    stmt.params.msgProfileId = msgProfileId;

    var profile = new jilMessagingProfile();
    try 
    {  
      while ( stmt.step() )
      {
        profile.name = stmt.row.name;
        profile.id = msgProfileId; 
        profile.defaultEmailId = stmt.row.default_email_id;
      }
    }
    finally 
    {
      stmt.reset();
    }

    return(profile);
  },
  
  getPIMProfile : function(pimProfileId)
  {
    var stmt = this.getConnection().createStatement("select name from jwe_pim_profile where id = :pimProfileId");
    stmt.params.pimProfileId = pimProfileId;

    var profile = new jilPIMProfile();
    try 
    {  
      while ( stmt.step() )
      {
        profile.name = stmt.row.name;
        profile.id = pimProfileId; 
      }
    }
    finally 
    {
      stmt.reset();
    }

    return(profile);
  },

  getDGeneral : function(deviceId)
  {
    var stmt = this.getConnection().createStatement("select dev.name as dname, msg.id as mid, msg.name as mname, pim.id as pid, pim.name as pname from jwe_device_profile dev, jwe_messaging_profile msg, jwe_pim_profile pim where dev.id = :device_id and dev.messaging_profile_id = msg.id and dev.pim_profile_id = pim.id");
    stmt.params.device_id = deviceId;

    var device = new jilDeviceProfile();
    device.id = deviceId;
    try 
    {  
      while ( stmt.step() )
      {
        device.name = stmt.row.dname;
        device.messageProfileId = stmt.row.mid;
        device.pimProfileId = stmt.row.pid;
      }
    }
    finally 
    {
      stmt.reset();
    }

    return(device);
  },

  saveDGeneral : function(profileId, messageProfileId, pimProfileId, jilAPISpec, extensionKeys)
  {
    var stmt = this.getConnection().createStatement("update jwe_device_profile set messaging_profile_id = :messageProfileId, pim_profile_id = :pimProfileId, jil_api_spec = :jilAPISpec where id = :profileId");
    stmt.params.messageProfileId = messageProfileId;
    stmt.params.pimProfileId = pimProfileId;
    stmt.params.jilAPISpec = jilAPISpec;
    stmt.params.profileId = profileId;
    
    try
    {
      stmt.executeStep();
    }
    catch(exception)
    {
      dump(exception);
      return(false);
    }
    finally 
    {
      stmt.reset();
    }
    
    this.setAPIExtensionsForDevice(profileId, extensionKeys);
    
    return(true);
  },

  getAllMessageProfiles : function()
  {
    var stmt = this.getConnection().createStatement("select name, id from jwe_messaging_profile");

    var messages = new Array();
    try 
    {  
      while ( stmt.step() )
      {
        var message = new jilMessagingProfile();
        message.name = stmt.row.name;
        message.id = stmt.row.id;  
        messages.push(message);
      }
    }
    finally 
    {
      stmt.reset();
    }

    return(messages);
  },

  getAllPIMProfiles : function()
  {
    var stmt = this.getConnection().createStatement("select name, id from jwe_pim_profile");

    var pims = new Array();
    try 
    {  
      while ( stmt.step() )
      {
        var pim = new jilPIMProfile();
        pim.name = stmt.row.name;
        pim.id = stmt.row.id;
        pims.push(pim);
      }
    }
    finally 
    {
      stmt.reset();
    }

    return(pims);
  },
  
  getAllAPIExtensions : function()
  {
    var stmt = this.getConnection().createStatement("select key, name, resource_url from jwe_api_extension");
   
    var extensions = new Array();
    try 
    {  
      while ( stmt.step() )
      {
        var extension = new jilAPIExtension();
        extension.key = stmt.row.key;
        extension.name = stmt.row.name;
        extension.resourceUrl = stmt.row.resource_url;
        extensions.push(extension);
      }
    }
    finally 
    {
      stmt.reset();
    }

    return(extensions);
  },
  
  getAPIExtensionsForDevice : function(profileId)
  {
    var stmt = this.getConnection().createStatement("select ext.key as ext_key, ext.name as ext_name, ext.resource_url as ext_resource_url from jwe_api_extension ext, jwe_api_extension_map extmap where ext.key = extmap.extension_key and extmap.profile_id = :profileId");
    stmt.params.profileId = profileId;

    var extensions = new Array();
    try 
    {  
      while ( stmt.step() )
      {
        var extension = new jilAPIExtension();
        extension.key = stmt.row.ext_key;
        extension.name = stmt.row.ext_name;
        extension.resourceUrl = stmt.row.ext_resource_url;
        extensions.push(extension);
      }
    }
    finally 
    {
      stmt.reset();
    }

    return(extensions);
  },
  
  setAPIExtensionsForDevice : function(profileId, extensionKeys)
  {
    TransitCommon.debug("Enabling "+extensionKeys+" extension keys for device profile "+profileId);
    try
    {
      var conn = this.getConnection();
      conn.beginTransaction();
    
      // first flush existing extension maps    
      var stmt = conn.createStatement("delete from jwe_api_extension_map where profile_id = :profileId");
      stmt.params.profileId = profileId;

      try 
      {  
        stmt.executeStep();
      }
      finally 
      {
        stmt.reset();
      }
      
      for ( var i = 0; i < extensionKeys.length; i++ )
      {
        stmt = conn.createStatement("insert into jwe_api_extension_map (profile_id, extension_key) values (:profileId, :extensionKey)");
        stmt.params.profileId = profileId;
        stmt.params.extensionKey = extensionKeys[i];
        
        try 
        {  
          stmt.executeStep();
        }
        finally 
        {
          stmt.reset();
        }
      }
      
      conn.commitTransaction();
    }
    catch(exception)
    {
      dump(exception);
      conn.rollbackTransaction();
      return(false);
    }
    return(true);
  },

  getEmulatedWidgets : function(profileId)
  {
    var stmt = this.getConnection().createStatement("select id, application_id, name, version, author from jwe_emulated_widget where profile_id = :profileId");
    stmt.params.profileId = profileId;

    var widgets = new Array();
    try 
    {  
      while ( stmt.step() )
      {
        var widget = new jilEmulatedWidget();
        widget.id = stmt.row.id;
        widget.applicationId = stmt.row.application_id;
        widget.name = stmt.row.name;
        widget.version = stmt.row.version;
        widget.author = stmt.row.author;
        widgets.push(widget);
      }
    }
    finally 
    {
      stmt.reset();
    }

    return(widgets);
  },

  getEmulatedWidgetByAppId : function(profileId, appId, version)
  {
    var stmt = this.getConnection().createStatement("select id, name, version, author from jwe_emulated_widget where profile_id = :profileId and application_id = :appId and version = :version");
    stmt.params.profileId = profileId;
    stmt.params.appId = appId;
    stmt.params.version = version;

    var widget = new jilEmulatedWidget();
    try
    {  
      while ( stmt.step() )
      {
        widget.profileId = profileId
        widget.id = stmt.row.id;
        widget.applicationId = appId;
        widget.name = stmt.row.name;
        widget.version = version;
        widget.author = stmt.row.author;
      }
    }
    finally 
    {
      stmt.reset();
    }

    if ( widget.id == null )
      return(null);
    else
      return(widget);
  },

  updateEmulatedWidget : function(widget)
  {
    var stmt = this.getConnection().createStatement("update jwe_emulated_widget set application_id = :appId, version = :version, name = :name, author = :author where profile_id = :profileId and id = :widgetId");
    stmt.params.appId = widget.applicationId;
    stmt.params.version = widget.version;
    stmt.params.name = widget.name;
    stmt.params.author = widget.author;
    stmt.params.profileId = widget.profileId;
    stmt.params.widgetId = widget.id;

    try
    {
      stmt.executeStep();
    }
    catch(exception)
    {
      dump(exception);
      return(false);
    }
    finally 
    {
      stmt.reset();
    }
    return(true);
  },

  addEmulatedWidget : function(widget)
  {
    var stmt = this.getConnection().createStatement("insert into jwe_emulated_widget (id, profile_id, application_id, version, name, author) values (null, :profileId, :appId, :version, :name, :author)");
    stmt.params.profileId = widget.profileId;
    stmt.params.appId = widget.applicationId;
    stmt.params.version = widget.version;
    stmt.params.name = widget.name;
    stmt.params.author = widget.author;

    try
    {
      stmt.executeStep();
    }
    catch(exception)
    {
      dump(exception);
      return(false);
    }
    finally 
    {
      stmt.reset();
    }
    return(true);
  },

  getWidgetPreferences : function(widget)
  {
    var stmt = this.getConnection().createStatement("select key, value from jwe_widget_preference where widget_id = :widgetId");
    stmt.params.widgetId = widget.id;

    var prefs = new Array();
    try 
    {  
      while ( stmt.step() )
      {
        var pref = new jilWidgetPreference();
        pref.profileId = widget.profileId;
        pref.widgetId = widget.id;
        pref.key = stmt.row.key;
        pref.value = stmt.row.value;
        prefs.push(pref);
      }
    }
    finally 
    {
      stmt.reset();
    }

    return(prefs);
  },

  getWidgetPreferenceByKey : function(profileId, widgetId, key)
  {
    var stmt = this.getConnection().createStatement("select value from jwe_widget_preference where widget_id = :widgetId and key = :key");
    stmt.params.widgetId = widgetId;
    stmt.params.key = key;

    var pref = new jilWidgetPreference();
    try 
    {  
      while ( stmt.step() )
      {
        pref.profileId = profileId;
        pref.widgetId = widgetId;
        pref.key = key;
        pref.value = stmt.row.value;
      }
    }
    finally 
    {
      stmt.reset();
    }

    if ( pref.key == null )
      return(null);
    else
      return(pref);
  },

  setWidgetPreferenceByKey : function(profileId, widgetId, key, value)
  {
    var oldValue = this.getWidgetPreferenceByKey(profileId, widgetId, key);
    var widget =
    {
      id: widgetId,
    };

    if ( oldValue == null )
      this.addWidgetPreference(widget, key, value);
    else
      this.updateWidgetPreference(widget, key, value);
  },

  addWidgetPreference : function(widget, key, value)
  {
    var stmt = this.getConnection().createStatement("insert into jwe_widget_preference (widget_id, key, value) values (:widgetId, :key, :value)");
    stmt.params.widgetId = widget.id;
    stmt.params.key = key;
    
    if ( value == null )
      value = "";
    
    stmt.params.value = value;
    
    try
    {
      stmt.executeStep();
    }
    catch(exception)
    {
      dump(exception);
      return(false);
    }
    finally 
    {
      stmt.reset();
    }
    return(true);
  },

  updateWidgetPreference : function(widget, key, value)
  {
    var stmt = this.getConnection().createStatement("update jwe_widget_preference set value = :value where widget_id = :widgetId and key = :key");
    stmt.params.value = value;
    stmt.params.widgetId = widget.id;
    stmt.params.key = key;

    try
    {
      stmt.executeStep();
    }
    finally 
    {
      stmt.reset();
    }
  },

  removeWidgetPreference : function(widget, key)
  {
    var stmt = this.getConnection().createStatement("delete from jwe_widget_preference where widget_id = :widgetId and key = :key");
    stmt.params.widgetId = widget.id;
    stmt.params.key = key;

    try
    {
      stmt.executeStep();
    }
    catch(exception)
    {
      dump(exception);
      return(false);
    }
    finally 
    {
      stmt.reset();
    }
    return(true);
  },

  deleteEmulatedWidget : function(profileId, widgetId)
  {
    var stmt = this.getConnection().createStatement("delete from jwe_emulated_widget where profile_id = :profileId and id = :widgetId");
    stmt.params.profileId = profileId;
    stmt.params.widgetId = widgetId;

    try
    {
      stmt.executeStep();
    }
    catch(exception)
    {
      dump(exception);
      return(false);
    }
    finally 
    {
      stmt.reset();
    }
    return(true);
  },

  getDeviceData : function(profileId)
  {
    // get device state data
    var stmt_dev = this.getConnection().createStatement("select clipboard_string, widget_engine_name, widget_engine_provider, widget_engine_version, ringtone from jwe_software_state where profile_id = :profileId");
    stmt_dev.params.profileId = profileId;

    var deviceData = new jilDeviceData();
    deviceData.profileId = profileId;
    try 
    {  
      while ( stmt_dev.step() )
      {
        deviceData.clipboardString = stmt_dev.row.clipboard_string;
        deviceData.engineName = stmt_dev.row.widget_engine_name;
        deviceData.engineProvider = stmt_dev.row.widget_engine_provider;
        deviceData.engineVersion = stmt_dev.row.widget_engine_version;
        deviceData.ringtone = stmt_dev.row.ringtone;
      }
    }
    finally 
    {
      stmt_dev.reset();
    }

    // get file systems
    var stmt_fs = this.getConnection().createStatement("select id, root_path, local_path, size from jwe_file_system where profile_id = :profileId");
    stmt_fs.params.profileId = profileId;

    deviceData.fileSystems = new Array();
    try 
    {  
      while ( stmt_fs.step() )
      {
        var fsys = new jilFileSystem();
        fsys.rootPath = stmt_fs.row.root_path;
        fsys.localPath = stmt_fs.row.local_path;
        fsys.size = stmt_fs.row.size;
        fsys.profileId = profileId;
        fsys.id = stmt_fs.row.id;
        deviceData.fileSystems.push(fsys);
      }
    }
    finally 
    {
      stmt_fs.reset();
    }

    // get available apps
    var stmt_apps = this.getConnection().createStatement("select type from jwe_available_applications where profile_id = :profileId");
    stmt_apps.params.profileId = profileId;

    deviceData.availableApps = new Array();
    try 
    {  
      while ( stmt_apps.step() )
        deviceData.availableApps.push(stmt_apps.row.type);
    }
    finally 
    {
      stmt_apps.reset();
    }

    return(deviceData);
  },

  saveDeviceData : function(deviceData)
  {
    try
    {
      var conn = this.getConnection();
      conn.beginTransaction();
      
      var stmt = conn.createStatement("update jwe_software_state set clipboard_string = :clip, widget_engine_name = :engineName, widget_engine_provider = :engineProvider, widget_engine_version = :engineVersion, ringtone = :ringtone where profile_id = :profileId");
      stmt.params.clip = deviceData.clipboardString;
      stmt.params.engineName = deviceData.engineName;
      stmt.params.engineProvider = deviceData.engineProvider;
      stmt.params.engineVersion = deviceData.engineVersion;
      stmt.params.ringtone = deviceData.ringtone;
      stmt.params.profileId = deviceData.profileId;

      try
      {
        stmt.executeStep();
      }
      finally 
      {
        stmt.reset();
      }

      stmt = conn.createStatement("delete from jwe_available_applications where profile_id = :profileId");
      stmt.params.profileId = deviceData.profileId;

      try
      {
        stmt.executeStep();
      }
      finally 
      {
        stmt.reset();
      }

      for ( var i = 0; i < deviceData.checkedApps.length; i++ )
      {
        stmt = conn.createStatement("insert into jwe_available_applications (profile_id, type) values (:profileId, :type)");
        stmt.params.profileId = deviceData.profileId;
        stmt.params.type = deviceData.checkedApps[i];

        try
        {
          stmt.executeStep();
        }
        finally 
        {
          stmt.reset();
        }
      }
      conn.commitTransaction();
    }
    catch(exception)
    {
      dump(exception);
      conn.rollbackTransaction();
      return(false);
    }
    return(true);
  },
  
  getFileSystems : function(profileId)
  {
    // get file systems
    var stmt = this.getConnection().createStatement("select id, root_path, local_path, size from jwe_file_system where profile_id = :profileId");
    stmt.params.profileId = profileId;

    var fileSystems = new Array();
    try 
    {  
      while ( stmt.step() )
      {
        var fsys = new jilFileSystem();
        fsys.rootPath = stmt.row.root_path;
        fsys.localPath = stmt.row.local_path;
        fsys.size = stmt.row.size;
        fsys.profileId = profileId;
        fsys.id = stmt.row.id;
        fileSystems.push(fsys);
      }
    }
    finally 
    {
      stmt.reset();
    }
    
    return(fileSystems);
  },

  updateFileSystem : function(fsys)
  {
    // get file systems
    var stmt = this.getConnection().createStatement("update jwe_file_system set root_path = :rootPath, local_path = :localPath, size = :size where profile_id = :profileId and id = :id");
    stmt.params.rootPath = fsys.rootPath;
    stmt.params.localPath = fsys.localPath;
    stmt.params.profileId = fsys.profileId;
    stmt.params.size = fsys.size;
    stmt.params.id = fsys.id;

    try
    {
      stmt.executeStep();
    }
    catch(exception)
    {
      dump(exception);
      return(false);
    }
    finally 
    {
      stmt.reset();
    }
    return(true);
  },

  addFileSystem : function(fsys)
  {
    // get file systems
    var stmt = this.getConnection().createStatement("insert into jwe_file_system (id, profile_id, root_path, local_path, size) values (null, :profileId, :rootPath, :localPath, :size)");
    stmt.params.profileId = fsys.profileId;
    stmt.params.rootPath = fsys.rootPath;
    stmt.params.localPath = fsys.localPath;
    stmt.params.size = fsys.size;

    try
    {
      stmt.executeStep();
    }
    catch(exception)
    {
      dump(exception);
      return(false);
    }
    finally 
    {
      stmt.reset();
    }
    return(true);
  },

  deleteFileSystem : function(profileId, fsId)
  {
    // get file systems
    var stmt = this.getConnection().createStatement("delete from jwe_file_system where profile_id = :profileId and id = :id");
    stmt.params.profileId = profileId;
    stmt.params.id = fsId;

    try
    {
      stmt.executeStep();
    }
    catch(exception)
    {
      dump(exception);
      return(false);
    }
    finally 
    {
      stmt.reset();
    }
    return(true);
  },

  getAccountInfo : function(profileId)
  {
    var stmt = this.getConnection().createStatement("select phone_msisdn, phone_operator_name, phone_unique_user_id, user_account_balance, user_subscription_type from jwe_subscriber_state where profile_id = :profileId");
    stmt.params.profileId = profileId;

    var accountInfo = new jilAccountInfo();
    accountInfo.profileId = profileId;
    try 
    {  
      while ( stmt.step() )
      {
        accountInfo.phoneMSISDN = stmt.row.phone_msisdn;
        accountInfo.phoneOpName = stmt.row.phone_operator_name;
        accountInfo.userId = stmt.row.phone_unique_user_id;
        accountInfo.accountBalance = stmt.row.user_account_balance;
        accountInfo.subscriptionType = stmt.row.user_subscription_type;
      }
    }
    finally 
    {
      stmt.reset();
    }

    return(accountInfo);
  },

  saveAccountInfo : function(accountInfo)
  {
    var stmt = this.getConnection().createStatement("update jwe_subscriber_state set phone_msisdn = :phoneMsisdn, phone_operator_name = :opName, phone_unique_user_id = :uuId, user_account_balance = :balance, user_subscription_type = :subType where profile_id = :profileId");
    stmt.params.phoneMsisdn = accountInfo.phoneMSISDN;
    stmt.params.opName = accountInfo.phoneOpName;
    stmt.params.uuId = accountInfo.userId;
    stmt.params.balance = accountInfo.accountBalance;
    stmt.params.subType = accountInfo.subscriptionType;
    stmt.params.profileId = accountInfo.profileId;

    try
    {
      stmt.executeStep();
    }
    catch(exception)
    {
      dump(exception);
      return(false);
    }
    finally 
    {
      stmt.reset();
    }
    return(true);
  },

  getDeviceInfo : function(profileId)
  {
    var stmt = this.getConnection().createStatement("select sub.owner_address as so_address, sub.owner_company as so_company, sub.owner_email as so_email, sub.owner_full_name as so_name, sub.owner_title as so_title, sub.owner_home_phone as so_hphone, sub.owner_mobile_phone as so_mphone, sub.owner_work_phone as so_wphone, dev.phone_color_depth_default as d_color, dev.phone_firmware as d_firmware, dev.phone_manufacturer as d_manu, dev.phone_model as d_model, dev.phone_screen_height_default as d_height, dev.phone_screen_width_default as d_width, dev.total_memory as d_totalmem, soft.phone_os as s_os, soft.phone_software as s_soft from jwe_subscriber_state sub, jwe_device_state dev, jwe_software_state soft where sub.profile_id = :profileId and dev.profile_id = :profileId and soft.profile_id = :profileId");
    stmt.params.profileId = profileId;

    var deviceInfo = new jilDeviceInfo();
    deviceInfo.profileId = profileId;
    try 
    {  
      while ( stmt.step() )
      {
        deviceInfo.ownerAddress = stmt.row.so_address;
        deviceInfo.ownerCompany = stmt.row.so_company;
        deviceInfo.ownerEmail = stmt.row.so_email;
        deviceInfo.ownerFullName = stmt.row.so_name;
        deviceInfo.ownerTitle = stmt.row.so_title;
        deviceInfo.ownerHomePhone = stmt.row.so_hphone;
        deviceInfo.ownerMobilePhone = stmt.row.so_mphone;
        deviceInfo.ownerWorkPhone = stmt.row.so_wphone;
        deviceInfo.colorDepth = stmt.row.d_color;
        deviceInfo.firmware = stmt.row.d_firmware;
        deviceInfo.manufacturer = stmt.row.d_manu;
        deviceInfo.model = stmt.row.d_model;
        deviceInfo.os = stmt.row.s_os;
        deviceInfo.screenHeight = stmt.row.d_height;
        deviceInfo.screenWidth = stmt.row.d_width;
        deviceInfo.software = stmt.row.s_soft;
        deviceInfo.totalMemory = stmt.row.d_totalmem;
      }
    }
    finally 
    {
      stmt.reset();
    }

    return(deviceInfo);
  },

  saveDeviceInfo : function(deviceInfo)
  {
    try
    {
      var conn = this.getConnection();
      conn.beginTransaction();
      
      stmt = conn.createStatement("update jwe_subscriber_state set owner_address = :ownerAddress, owner_company = :ownerCo, owner_email = :ownerEmail, owner_full_name = :ownerFullName, owner_title = :ownerTitle, owner_home_phone = :ownerHomePhone, owner_mobile_phone = :ownerMobilePhone, owner_work_phone = :ownerWorkPhone where profile_id = :profileId");
      stmt.params.ownerAddress = deviceInfo.ownerAddress;
      stmt.params.ownerCo = deviceInfo.ownerCompany;
      stmt.params.ownerEmail = deviceInfo.ownerEmail;
      stmt.params.ownerFullName = deviceInfo.ownerFullName;
      stmt.params.ownerTitle = deviceInfo.ownerTitle;
      stmt.params.ownerHomePhone = deviceInfo.ownerHomePhone;
      stmt.params.ownerMobilePhone = deviceInfo.ownerMobilePhone;
      stmt.params.ownerWorkPhone = deviceInfo.ownerWorkPhone;
      stmt.params.profileId = deviceInfo.profileId;

      try
      {
        stmt.executeStep();
      }
      finally 
      {
        stmt.reset();
      }

      stmt = conn.createStatement("update jwe_device_state set phone_color_depth_default = :colorDepth, phone_firmware = :firmware, phone_manufacturer = :manufacturer, phone_model = :model, phone_screen_height_default = :height, phone_screen_width_default = :width, total_memory = :totalMemory where profile_id = :profileId");
      stmt.params.colorDepth = deviceInfo.colorDepth;
      stmt.params.firmware = deviceInfo.firmware;
      stmt.params.manufacturer = deviceInfo.manufacturer;
      stmt.params.model = deviceInfo.model;
      stmt.params.height = deviceInfo.screenHeight;
      stmt.params.width = deviceInfo.screenWidth;
      stmt.params.totalMemory = deviceInfo.totalMemory;
      stmt.params.profileId = deviceInfo.profileId;

      try
      {
        stmt.executeStep();
      }
      finally 
      {
        stmt.reset();
      }

      stmt = conn.createStatement("update jwe_software_state set phone_os = :phoneOS, phone_software = :phoneSoftware where profile_id = :profileId");
      stmt.params.phoneOS = deviceInfo.os;
      stmt.params.phoneSoftware = deviceInfo.software;
      stmt.params.profileId = deviceInfo.profileId;

      try
      {
        stmt.executeStep();
      }
      finally 
      {
        stmt.reset();
      }
      conn.commitTransaction();
    }
    catch(exception)
    {
      dump(exception);
      conn.rollbackTransaction();
      return(false);
    }
    return(true);
  },

  getDataNetworkInfo : function(profileId)
  {
    var stmt = this.getConnection().createStatement("select type, name, nickname, enabled from jwe_data_network_connection where profile_id = :profileId and supports_data = 'true'");
    stmt.params.profileId = profileId;

    var connections = new Array();
    try 
    {  
      while ( stmt.step() )
      {
        var dataNetworkInfo = new jilDataNetwork();
        dataNetworkInfo.type = stmt.row.type;
        dataNetworkInfo.name = stmt.row.name;
        dataNetworkInfo.nickname = stmt.row.nickname;
        dataNetworkInfo.enabled = this.getBoolean(stmt.row.enabled);
        dataNetworkInfo.profileId = profileId;
        connections.push(dataNetworkInfo);
      }
    }
    finally 
    {
      stmt.reset();
    }

    return(connections);
  },

  saveDataNetworkInfo : function(connections)
  {
    try
    {
      var conn = this.getConnection();
      conn.beginTransaction();
      
      var stmt = null;
      for ( var i = 0; i < connections.length; i++ )
      {
        stmt = conn.createStatement("update jwe_data_network_connection set enabled = :enabled, nickname = :nickname where type = :type and name = :name and profile_id = :profileId");
        stmt.params.enabled = connections[i].enabled;
        stmt.params.nickname = connections[i].nickname;
        stmt.params.type = connections[i].type;
        stmt.params.name = connections[i].name;
        stmt.params.profileId = connections[i].profileId;

        try
        {
          stmt.executeStep();
        }
        finally 
        {
          stmt.reset();
        }
      }
      conn.commitTransaction();
    }
    catch(exception)
    {
      dump(exception);
      conn.rollbackTransaction();
      return(false);
    }
    return(true);
  },

  getDeviceState : function(profileId)
  {
    var stmt = this.getConnection().createStatement("select soft.audio_path as s_apath, soft.available_memory as s_amem, soft.language as s_lang, dev.processor_utilization_percent as d_proc, dev.backlight_on as d_back, dev.keypadlight_on as d_key from jwe_device_state dev, jwe_software_state soft where dev.profile_id = soft.profile_id and soft.profile_id = :profileId;");
    stmt.params.profileId = profileId;

    var deviceState = new jilDeviceState();
    deviceState.profileId = profileId;
    try 
    {  
      while ( stmt.step() )
      {
        deviceState.audioPath = stmt.row.s_apath;
        deviceState.availableMemory = stmt.row.s_amem;
        deviceState.language = stmt.row.s_lang;
        deviceState.procUtilization = stmt.row.d_proc;
        deviceState.backLight = this.getBoolean(stmt.row.d_back);
        deviceState.keypadLight = this.getBoolean(stmt.row.d_key);
      }
    }
    finally 
    {
      stmt.reset();
    }

    return(deviceState);
  },

  saveDeviceState : function (deviceState)
  {
    try
    {
      var conn = this.getConnection();
      conn.beginTransaction();
      
      var stmt = conn.createStatement("update jwe_software_state set audio_path = :audioPath, available_memory = :availableMem, language = :language where profile_id = :profileId");
      stmt.params.audioPath = deviceState.audioPath;
      stmt.params.availableMem = deviceState.availableMemory;
      stmt.params.language = deviceState.language;
      stmt.params.profileId = deviceState.profileId;

      try
      {
        stmt.executeStep();
      }
      finally 
      {
        stmt.reset();
      }

      stmt = conn.createStatement("update jwe_device_state set processor_utilization_percent = :procPercent, backlight_on = :backlight, keypadlight_on = :keypadlight where profile_id = :profileId");
      stmt.params.procPercent = deviceState.procUtilization;
      stmt.params.backlight = deviceState.backLight;
      stmt.params.keypadlight = deviceState.keypadLight;
      stmt.params.profileId = deviceState.profileId;

      try
      {
        stmt.executeStep();
      }
      finally 
      {
        stmt.reset();
      }
      conn.commitTransaction();
    }
    catch(exception)
    {
      dump(exception);
      conn.rollbackTransaction();
      return(false);
    }
    return(true);
  },

  getAccelerometer : function(profileId)
  {
    var stmt = this.getConnection().createStatement("select accelerometer_xaxis, accelerometer_yaxis, accelerometer_zaxis from jwe_device_state where profile_id = :profileId");
    stmt.params.profileId = profileId;

    var accelerometer = new jilAccelerometer();
    accelerometer.profileId = profileId;
    try 
    {  
      while ( stmt.step() )
      {
        accelerometer.xAxis = stmt.row.accelerometer_xaxis;
        accelerometer.yAxis = stmt.row.accelerometer_yaxis;
        accelerometer.zAxis = stmt.row.accelerometer_zaxis;
      }
    }
    finally 
    {
      stmt.reset();
    }

    return(accelerometer);
  },

  saveAccelerometer : function(accel)
  {
    var stmt = this.getConnection().createStatement("update jwe_device_state set accelerometer_xaxis = :xaxis, accelerometer_yaxis = :yaxis, accelerometer_zaxis = :zaxis where profile_id = :profileId");
    stmt.params.xaxis = accel.xAxis;
    stmt.params.yaxis = accel.yAxis;
    stmt.params.zaxis = accel.zAxis;
    stmt.params.profileId = accel.profileId;

    try
    {
      stmt.executeStep();
    }
    catch(exception)
    {
      dump(exception);
      return(false);
    }
    finally 
    {
      stmt.reset();
    }
    return(true);
  },

  getConfig : function(profileId)
  {
    var stmt = this.getConnection().createStatement("select msg_ringtone_volume, ringtone_volume, vibration_setting from jwe_software_state where profile_id = :profileId");
    stmt.params.profileId = profileId;

    var config = new jilConfig();
    config.profileId = profileId;
    try 
    {  
      while ( stmt.step() )
      {
        config.messageVolume = stmt.row.msg_ringtone_volume;
        config.ringtoneVolume = stmt.row.ringtone_volume;
        config.vibrationOn = this.getBoolean(stmt.row.vibration_setting);
      }
    }
    finally 
    {
      stmt.reset();
    }

    return(config);
  },

  saveConfig : function(config)
  {
    var stmt = this.getConnection().createStatement("update jwe_software_state set msg_ringtone_volume = :msgVolume, ringtone_volume = :ringtoneVolume, vibration_setting = :vibration where profile_id = :profileId");
    stmt.params.msgVolume = config.messageVolume;
    stmt.params.ringtoneVolume = config.ringtoneVolume;
    stmt.params.vibration = config.vibrationOn;
    stmt.params.profileId = config.profileId;

    try
    {
      stmt.executeStep();
    }
    catch(exception)
    {
      dump(exception);
      return(false);
    }
    finally 
    {
      stmt.reset();
    }
    return(true);
  },

  getPositionInfo : function(profileId)
  {
    var stmt = this.getConnection().createStatement("select position_cell_id, position_accuracy, position_latitude, position_longitude, position_altitude, position_altitude_accuracy from jwe_network_state where profile_id = :profileId");
    stmt.params.profileId = profileId;

    var position = new jilPositionInfo();
    position.profileId = profileId;
    try 
    {  
      while ( stmt.step() )
      {
        position.cellID = stmt.row.position_cell_id;
        position.accuracy = stmt.row.position_accuracy;
        position.latitude = stmt.row.position_latitude;
        position.longitude = stmt.row.position_longitude;
        position.altitude = stmt.row.position_altitude;
        position.altitudeAccuracy = stmt.row.position_altitude_accuracy;
      }
    }
    finally 
    {
      stmt.reset();
    }

    return(position);
  },

  savePositionInfo : function(position)
  {
    var stmt = this.getConnection().createStatement("update jwe_network_state set position_cell_id = :cellID, position_accuracy = :accuracy, position_latitude = :lat, position_longitude = :long, position_altitude = :alt, position_altitude_accuracy = :altAccuracy where profile_id = :profileId");
    stmt.params.cellID = position.cellID;
    stmt.params.accuracy = position.accuracy;
    stmt.params.lat = position.latitude;
    stmt.params.long = position.longitude;
    stmt.params.alt = position.altitude;
    stmt.params.altAccuracy = position.altitudeAccuracy;
    stmt.params.profileId = position.profileId;

    try
    {
      stmt.executeStep();
    }
    catch(exception)
    {
      dump(exception);
      return(false);
    }
    finally 
    {
      stmt.reset();
    }
    return(true);
  },

  getPowerInfo : function(profileId)
  {
    var stmt = this.getConnection().createStatement("select is_charging, percent_remaining from jwe_device_state where profile_id = :profileId");
    stmt.params.profileId = profileId;

    var power = new jilPowerInfo();
    power.profileId = profileId;
    try 
    {  
      while ( stmt.step() )
      {
        power.isCharging = this.getBoolean(stmt.row.is_charging);
        power.percentRemaining = stmt.row.percent_remaining;
      }
    }
    finally 
    {
      stmt.reset();
    }

    return(power);
  },

  savePowerInfo : function(power)
  {
    var stmt = this.getConnection().createStatement("update jwe_device_state set is_charging = :charging, percent_remaining = :percentRemaining where profile_id = :profileId");
    stmt.params.charging = power.isCharging;
    stmt.params.percentRemaining = power.percentRemaining;
    stmt.params.profileId = power.profileId;

    try
    {
      stmt.executeStep();
    }
    catch(exception)
    {
      dump(exception);
      return(false);
    }
    finally 
    {
      stmt.reset();
    }
    return(true);
  },

  getRadioInfo : function(profileId)
  {
    var stmt = this.getConnection().createStatement("select is_radio_enabled, is_roaming, radio_signal_source, radio_signal_strength_percent from jwe_network_state where profile_id = :profileId");
    stmt.params.profileId = profileId;

    var radio = new jilRadioInfo();
    radio.profileId = profileId;
    try 
    {  
      while ( stmt.step() )
      {
        radio.isEnabled = this.getBoolean(stmt.row.is_radio_enabled);
        radio.isRoaming = this.getBoolean(stmt.row.is_roaming);
        radio.signalSource = stmt.row.radio_signal_source;
        radio.signalStrength = stmt.row.radio_signal_strength_percent;
      }
    }
    finally 
    {
     stmt.reset();
    }

    return(radio);
  },

  saveRadioInfo : function(radio)
  {
    var stmt = this.getConnection().createStatement("update jwe_network_state set is_radio_enabled = :radioEnabled, is_roaming = :isRoaming, radio_signal_source = :signalSource, radio_signal_strength_percent = :signalPercent where profile_id = :profileId");
    stmt.params.radioEnabled = radio.isEnabled;
    stmt.params.isRoaming = radio.isRoaming;
    stmt.params.signalSource = radio.signalSource;
    stmt.params.signalPercent = radio.signalStrength;
    stmt.params.profileId = radio.profileId;

    try
    {
      stmt.executeStep();
    }
    catch(exception)
    {
      dump(exception);
      return(false);
    }
    finally 
    {
      stmt.reset();
    }
    return(true);
  },

  getMultimedia : function(profileId)
  {
    var stmt = this.getConnection().createStatement("select is_audio_playing, is_video_playing, volume from jwe_software_state where profile_id = :profileId");
    stmt.params.profileId = profileId;

    var multimedia = new jilMultimedia();
    multimedia.profileId = profileId;
    try 
    {  
      while ( stmt.step() )
      {
        multimedia.audioPlaying = this.getBoolean(stmt.row.is_audio_playing);
        multimedia.videoPlaying = this.getBoolean(stmt.row.is_video_playing);
        multimedia.volume = stmt.row.volume;
      }
    }
    finally 
    {
      stmt.reset();
    }

    return(multimedia);
  },

  saveMultimedia : function(multimedia)
  {
    var stmt = this.getConnection().createStatement("update jwe_software_state set is_audio_playing = :audio, is_video_playing = :video, volume = :volume where profile_id = :profileId");
    stmt.params.audio = multimedia.audioPlaying;
    stmt.params.video = multimedia.videoPlaying;
    stmt.params.volume = multimedia.volume;
    stmt.params.profileId = multimedia.profileId;

    try
    {
      stmt.executeStep();
    }
    catch(exception)
    {
      dump(exception);
      return(false);
    }
    finally 
    {
      stmt.reset();
    }
    return(true);
  },

  getCallRecords : function(profileId)
  {
    var stmt = this.getConnection().createStatement("select id, address, name, type, duration_seconds, start_time from jwe_call_record where profile_id = :profileId");
    stmt.params.profileId = profileId;

    var records = new Array();    
    try 
    {  
      while ( stmt.step() )
      {
        var record = new jilCallRecord();
        record.profileId = profileId;
        record.id = stmt.row.id;
        record.address = stmt.row.address;
        record.name = stmt.row.name;
        record.type = stmt.row.type;
        record.durationSeconds = stmt.row.duration_seconds;
        record.startTime = stmt.row.start_time;
        records.push(record);
      }
    }
    finally 
    {
      stmt.reset();
    }

    return(records);
  },
  
  getCallRecord : function(profileId, recordId, type)
  {
    var stmt = null;
    if ( type != null )
    {
      stmt = this.getConnection().createStatement("select address, name, type, duration_seconds, start_time from jwe_call_record where profile_id = :profileId and id = :recordId and type = :type");
      stmt.params.profileId = profileId;
      stmt.params.recordId = recordId;
      stmt.params.type = type;
    }
    else
    {
      stmt = this.getConnection().createStatement("select address, name, type, duration_seconds, start_time from jwe_call_record where profile_id = :profileId and id = :recordId");
      stmt.params.profileId = profileId;
      stmt.params.recordId = recordId;
    }
    
    var record = new jilCallRecord();
    try 
    {  
      while ( stmt.step() )
      {
        record.profileId = profileId;
        record.id = recordId;
        record.address = stmt.row.address;
        record.name = stmt.row.name;
        record.type = stmt.row.type;
        record.durationSeconds = stmt.row.duration_seconds;
        record.startTime = stmt.row.start_time;
      }
    }
    finally 
    {
      stmt.reset();
    }

    return(record);
  },
  
  getCallRecordCount : function(profileId, type)
  {
    var stmt = this.getConnection().createStatement("select count(*) as record_count from jwe_call_record where profile_id = :profileId and type = :type");
    stmt.params.profileId = profileId;
    stmt.params.type = type;
      
    var count = 0;
    try 
    {  
      while ( stmt.step() )
        count = stmt.row.record_count;
    }
    finally 
    {
      stmt.reset();
    }

    return(count);
  },
  
  findCallRecords : function(profileId, comparison, start, end)
  {
    var search = new Array();
    
    if ( comparison.name == "" )
      search.push("name = ''");
    else if ( comparison.name.indexOf("*") )
      search.push("name like '"+comparison.name.replace("*", "%")+"'");
    else if ( comparison.name != null )
      search.push("name = '"+comparison.name+"'");
    
    var stmt = this.getConnection().createStatement("select id from jwe_call_record where "+search);

    var records = new Array();
    try
    {
      while ( stmt.step() )
        records.push(this.getCallRecord(profileId, stmt.row.id));
    }
    finally 
    {
      stmt.reset();
    }
    return(records);
  },

  addCallRecord : function(record)
  {
    var stmt = this.getConnection().createStatement("insert into jwe_call_record (id, profile_id, address, name, type, duration_seconds, start_time) values (null, :profileId, :address, :name, :type, :durationSeconds, :startTime)");
    stmt.params.profileId = record.profileId;
    stmt.params.address = record.address;
    stmt.params.name = record.name;
    stmt.params.type = record.type;
    stmt.params.durationSeconds = record.durationSeconds;
    stmt.params.startTime = record.startTime;

    try
    {
      stmt.executeStep();
    }
    catch(exception)
    {
      dump(exception);
      return(false);
    }
    finally 
    {
      stmt.reset();
    }
    return(true);
  },

  updateCallRecord : function(record)
  {
    var stmt = this.getConnection().createStatement("update jwe_call_record set address = :address, name = :name, type = :type, duration_seconds = :durationSeconds, start_time = :startTime where profile_id = :profileId and id = :id");
    stmt.params.address = record.address;
    stmt.params.name = record.name;
    stmt.params.type = record.type;
    stmt.params.durationSeconds = record.durationSeconds;
    stmt.params.startTime = record.startTime;
    stmt.params.profileId = record.profileId;
    stmt.params.id = record.id;

    try
    {
      stmt.executeStep();
    }
    catch(exception)
    {
      dump(exception);
      return(false);
    }
    finally 
    {
      stmt.reset();
    }
    return(true);
  },

  deleteCallRecord : function(profileId, recordId)
  {
    var stmt = this.getConnection().createStatement("delete from jwe_call_record where profile_id = :profileId and id = :id");
    stmt.params.profileId = profileId;
    stmt.params.id = recordId;

    try
    {
      stmt.executeStep();
    }
    catch(exception)
    {
      dump(exception);
      return(false);
    }
    finally 
    {
      stmt.reset();
    }
    return(true);
  },
  
  deleteAllCallRecords : function(profileId, type)
  {
    var stmt = this.getConnection().createStatement("delete from jwe_call_record where profile_id = :profileId and type = :type");
    stmt.params.profileId = profileId;
    stmt.params.type = type;

    try
    {
      stmt.executeStep();
    }
    catch(exception)
    {
      dump(exception);
      return(false);
    }
    finally 
    {
      stmt.reset();
    }
    return(true);
  },
  
  deleteCallRecord : function(type, recordId)
  {
    var stmt = this.getConnection().createStatement("delete from jwe_call_record where id = :recordId and type = :type");
    stmt.params.recordId = recordId;
    stmt.params.type = type;

    try
    {
      stmt.executeStep();
    }
    catch(exception)
    {
      dump(exception);
      return(false);
    }
    finally 
    {
      stmt.reset();
    }
    return(true);
  },

  getEmailAccounts : function(msgProfileId)
  {
    var stmt = this.getConnection().createStatement("select email.id as e_id, email.name as e_name, profile.default_email_id as p_id from jwe_msg_email_account email, jwe_messaging_profile profile where email.msg_profile_id = profile.id and email.msg_profile_id = :msgProfileId");
    stmt.params.msgProfileId = msgProfileId;

    var accounts = new Array();    
    try 
    {  
      while ( stmt.step() )
      {
        var account = new jilEmailAccount();
        account.msgProfileId = msgProfileId;
        account.id = stmt.row.e_id;
        account.name = stmt.row.e_name;
        if ( account.id == stmt.row.p_id )
          account.isDefault = true;
        else
          account.isDefault = false;
        accounts.push(account);
      }
    }
    finally 
    {
      stmt.reset();
    }

    return(accounts);
  },

  addEmailAccount : function(account)
  {
    var stmt = this.getConnection().createStatement("insert into jwe_msg_email_account (id, msg_profile_id, name) values (null, :msgProfileId, :name)");
    stmt.params.msgProfileId = account.msgProfileId;
    stmt.params.name = account.name;

    try
    {
      stmt.executeStep();
    }
    catch(exception)
    {
      dump(exception);
      return(false);
    }
    finally 
    {
      stmt.reset();
    }
    return(true);
  },

  deleteEmailAccount : function(msgProfileId, accountId)
  {
    var stmt = this.getConnection().createStatement("delete from jwe_msg_email_account where id = :id");
    stmt.params.id = accountId;

    try
    {
      stmt.executeStep();
    }
    catch(exception)
    {
      dump(exception);
      return(false);
    }
    finally 
    {
      stmt.reset();
    }
    return(true);
  },

  updateEmailAccount : function(account)
  {
    var stmt = this.getConnection().createStatement("update jwe_msg_email_account set name = :name where id = :id");
    stmt.params.name = account.name;
    stmt.params.id = account.id;

    try
    {
      stmt.executeStep();
    }
    finally 
    {
      stmt.reset();
    }
  },

  setDefaultEmailAccount : function(account)
  {
    var stmt = this.getConnection().createStatement("update jwe_messaging_profile set default_email_id = :defaultId where id = :msgProfileId");
    stmt.params.defaultId = account.id;
    stmt.params.msgProfileId = account.msgProfileId;

    try
    {
      stmt.executeStep();
    }
    catch(exception)
    {
      dump(exception);
      return(false);
    }
    finally 
    {
      stmt.reset();
    }
    return(true);
  },

  getDefaultEmailAccount : function(msgProfileId)
  {
    var stmt = this.getConnection().createStatement("select email.id as e_id, email.name as e_name from jwe_msg_email_account email, jwe_messaging_profile profile where email.msg_profile_id = profile.id and email.msg_profile_id = :msgProfileId and profile.default_email_id = email.id");
    stmt.params.msgProfileId = msgProfileId;

    var account = new jilEmailAccount(); 
    try 
    {  
      while ( stmt.step() )
      {
        account.msgProfileId = msgProfileId;
        account.id = stmt.row.e_id;
        account.name = stmt.row.e_name;
        account.isDefault = true;
      }
    }
    finally 
    {
      stmt.reset();
    }

    return(account);
  },

  getMessageFolders : function(msgProfileId)
  {
    var stmt = this.getConnection().createStatement("select folder.id as id, folder.type as type, folder.name as name, folder.account_id as account_id, folder.message_type as message_type from jwe_msg_folder folder, jwe_msg_email_account email where email.msg_profile_id = :msgProfileId and email.id = folder.account_id");
    stmt.params.msgProfileId = msgProfileId;

    var folders = new Array();    
    try 
    {  
      while ( stmt.step() )
      {
        var folder = new jilMessageFolder();
        folder.msgProfileId = msgProfileId;
        folder.id = stmt.row.id;
        folder.type = stmt.row.type;
        folder.name = stmt.row.name;
        folder.emailAccountId = stmt.row.account_id;
        folder.messageType = stmt.row.message_type;

        try
        {
          var stmt_count = this.getConnection().createStatement("select count(*) as count from jwe_msg_message where folder_id = :folderId");
          stmt_count.params.folderId = folder.id;
          while ( stmt_count.step() )
            folder.messageCount = stmt_count.row.count;
        }
        finally
        {
          stmt_count.reset();
        }
        folders.push(folder);
      }
    }
    finally 
    {
      stmt.reset();
    }

    return(folders);
  },
  
  getMessageFolder : function(msgProfileId, name)
  {
    var stmt = this.getConnection().createStatement("select folder.id as id, folder.type as type, folder.account_id as account_id, folder.message_type as message_type from jwe_msg_folder folder, jwe_msg_email_account email where email.msg_profile_id = :msgProfileId and folder.name = :name");
    stmt.params.msgProfileId = msgProfileId;
    stmt.params.name = name;

    var folder = new jilMessageFolder();    
    try 
    {  
      while ( stmt.step() )
      {
        folder.msgProfileId = msgProfileId;
        folder.id = stmt.row.id;
        folder.type = stmt.row.type;
        folder.name = name;
        folder.emailAccountId = stmt.row.account_id;
        folder.messageType = stmt.row.message_type;
      }
    }
    finally 
    {
      stmt.reset();
    }

    return(folder);
  },
  
  getMessageFoldersByAccount : function(accountId)
  {
    var stmt = this.getConnection().createStatement("select id, type, name, message_type from jwe_msg_folder where account_id = :accountId");
    stmt.params.accountId = accountId;

    var folders = new Array();    
    try 
    {  
      while ( stmt.step() )
      {
        var folder = new jilMessageFolder();
        folder.id = stmt.row.id;
        folder.type = stmt.row.type;
        folder.name = stmt.row.name;
        folder.emailAccountId = accountId;
        folder.messageType = stmt.row.message_type;
        folders.push(folder);
      }
    }
    finally 
    {
      stmt.reset();
    }

    return(folders);
  },
  
  getFolderNames : function(msgProfileId, messageType)
  {
    var stmt = this.getConnection().createStatement("select folder.name as name from jwe_msg_folder folder, jwe_msg_email_account account where folder.account_id = account.id and account.msg_profile_id = :msgProfileId and folder.message_type = :type");
    stmt.params.msgProfileId = msgProfileId;
    stmt.params.type = messageType;

    var folders = new Array();    
    try 
    {  
      while ( stmt.step() )
        folders.push(stmt.row.name);
    }
    finally 
    {
      stmt.reset();
    }

    return(folders);
  },

  addMessageFolder : function(folder)
  {
    try
    {
      var stmt = this.getConnection().createStatement("insert into jwe_msg_folder (id, type, name, account_id, message_type) values (null, :type, :name, :accountId, :messageType)");
      stmt.params.type = folder.type;
      stmt.params.name = folder.name;
      stmt.params.accountId = folder.emailAccountId;
      stmt.params.messageType = folder.messageType;
    
      stmt.executeStep();
    }
    catch(exception)
    {
      dump(exception);
      return(false);
    }
    finally 
    {
      stmt.reset();
    }
    return(true);
  },

  updateMessageFolder : function(folder)
  {
    try
    {
      var stmt = this.getConnection().createStatement("update jwe_msg_folder set type = :type, name = :name, account_id = :accountId, message_type = :messageType where id = :folderId");
      stmt.params.type = folder.type;
      stmt.params.messageType = folder.messageType;
      stmt.params.name = folder.name;
      stmt.params.accountId = folder.emailAccountId;
      stmt.params.folderId = folder.id;
    
      stmt.executeStep();
    }
    catch(exception)
    {
      dump(exception);
      return(false);
    }
    finally 
    {
      stmt.reset();
    }
    return(true);
  },

  deleteMessageFolder : function(msgProfileId, folderId)
  {
    var stmt = this.getConnection().createStatement("delete from jwe_msg_folder where id = :folderId");
    stmt.params.folderId = folderId;

    try
    {
      stmt.executeStep();
    }
    catch(exception)
    {
      dump(exception);
      return(false);
    }
    finally 
    {
      stmt.reset();
    }
    return(true);
  },
  
  deleteMessageFolderWithType : function(folderId, messageType)
  {
    var stmt = this.getConnection().createStatement("delete from jwe_msg_folder where id = :folderId and message_type = :type");
    stmt.params.folderId = folderId;
    stmt.params.type = messageType;

    try
    {
      stmt.executeStep();
    }
    catch(exception)
    {
      dump(exception);
      return(false);
    }
    finally 
    {
      stmt.reset();
    }
    return(true);
  },
  
  deleteAllMessagesForFolder : function(messageType, folder)
  {
    var stmt = this.getConnection().createStatement("delete from jwe_msg_message where folder_id = :folderId and message_type = :type");
    stmt.params.folderId = folder.id;
    stmt.params.type = messageType;

    try
    {
      stmt.executeStep();
    }
    catch(exception)
    {
      dump(exception);
      return(false);
    }
    finally 
    {
      stmt.reset();
    }
    return(true);
  },
  
  findMessages : function(msgProfileId, comparison, folderName, start, end)
  {
    var search = new Array();
       
    for ( var i = 0; i < comparison.getDestinationAddress().length; i++ )
    {
      TransitCommon.debug("comp: "+comparison.getDestinationAddress()[i]);
      search.push(TransitCommon.getContainsSearchStatement("msg.to_addresses", comparison.getDestinationAddress()[i]));
    }
    
    for ( var i = 0; i < comparison.getCcAddress().length; i++ )
      search.push(TransitCommon.getContainsSearchStatement("msg.cc_addresses", comparison.getCcAddress()[i]));
    for ( var i = 0; i < comparison.getBccAddress().length; i++ )
      search.push(TransitCommon.getContainsSearchStatement("msg.bcc_addresses", comparison.getBccAddress()[i]));
    
    search.push(TransitCommon.getStringSearchStatement("msg.subject", comparison.subject));
    search.push(TransitCommon.getStringSearchStatement("msg.callback_number", comparison.callbackNumber));
    search.push(TransitCommon.getStringSearchStatement("msg.id", comparison.messageId));
    search.push(TransitCommon.getStringSearchStatement("msg.message_type", comparison.messageType));
    search.push(TransitCommon.getStringSearchStatement("msg.body", comparison.body));
    search.push(TransitCommon.getStringSearchStatement("msg.source_address", comparison.sourceAddress));
    search.push(TransitCommon.getStringSearchStatement("msg.time", comparison.time));
    search.push(TransitCommon.getStringSearchStatement("msg.validity_period_hours", comparison.validityPeriodHours));
    search.push(TransitCommon.getBooleanSearchStatement("msg.is_read", comparison.isRead));
    search.push(TransitCommon.getBooleanSearchStatement("msg.message_priority", comparison.messagePriority));
    
    var searchSql = TransitCommon.concatSearchArray(search);
    TransitCommon.debug("Contact'd search string is: "+searchSql);
    
    var stmt = this.getConnection().createStatement("select msg.id as id from jwe_msg_message msg, jwe_msg_folder folder, jwe_msg_email_account account where folder.name = :folderName and folder.account_id = account.id and account.msg_profile_id = :msgProfileId "+searchSql);
    stmt.params.folderName = folderName;
    stmt.params.msgProfileId = msgProfileId

    var messages = new Array();
    try
    {
      while ( stmt.step() )
        messages.push(this.getMessage(msgProfileId, stmt.row.id));
    }
    finally 
    {
      stmt.reset();
    }
    return(messages);
  },

  getMessages : function(msgProfileId)
  {
    var stmt = this.getConnection().createStatement("select msg.id as m_id, msg.source_address as m_addr, msg.subject as m_sub, msg.message_priority as m_priority, msg.is_read as m_isread, msg.callback_number as m_callback, msg.time as m_date, msg.validity_period_hours as m_validity, msg.body as m_body, msg.message_type as m_type, msg.to_addresses as m_to, msg.cc_addresses as m_cc, msg.bcc_addresses as m_bcc, msg.attachments as m_attachments, folder.name as f_name, folder.id as f_id from jwe_msg_message msg, jwe_msg_folder folder, jwe_msg_email_account email where msg.folder_id = folder.id and email.id = folder.account_id and email.msg_profile_id = :msgProfileId");
    stmt.params.msgProfileId = msgProfileId;

    var messages = new Array();    
    try 
    {  
      while ( stmt.step() )
      {
        var message = new jilMessage();
        message.msgProfileId = msgProfileId;
        message.id = stmt.row.m_id;
        message.sourceAddress = stmt.row.m_addr;
        message.subject = stmt.row.m_sub;
        message.priority = this.getBoolean(stmt.row.m_priority);
        message.isRead = this.getBoolean(stmt.row.m_isread);
        message.callback = stmt.row.m_callback;
        message.date = stmt.row.m_date;
        message.validity = stmt.row.m_validity;
        message.body = stmt.row.m_body;
        message.type = stmt.row.m_type;
        message.toAddress = stmt.row.m_to;
        message.ccAddress = stmt.row.m_cc;
        message.bccAddress = stmt.row.m_bcc;
        message.folderName = stmt.row.f_name;
        message.folderId = stmt.row.f_id;
        message.attachments = stmt.row.m_attachments;
        messages.push(message);
      }
    }
    finally 
    {
      stmt.reset();
    }

    return(messages);
  },
    
  getMessageByIndex : function(type, folderName, index)
  {
    var stmt = this.getConnection().createStatement("select msg.id as m_id from jwe_msg_message msg, jwe_msg_folder folder where folder.message_type = :type and folder.name = :name order by msg.time desc limit 1 offset "+index);
    stmt.params.type = type;
    stmt.params.name = folderName;
    //stmt.params.index = index;

    var message = null;
    try 
    {  
      while ( stmt.step() )
        message = this.getMessage(null, stmt.row.m_id);
    }
    finally 
    {
      stmt.reset();
    }

    return(message);
  },
  
  getMessage : function(msgProfileId, messageId)
  {
    var stmt = this.getConnection().createStatement("select msg.id as m_id, msg.source_address as m_addr, msg.subject as m_sub, msg.message_priority as m_priority, msg.is_read as m_isread, msg.callback_number as m_callback, msg.time as m_date, msg.validity_period_hours as m_validity, msg.body as m_body, msg.message_type as m_type, msg.to_addresses as m_to, msg.cc_addresses as m_cc, msg.bcc_addresses as m_bcc, msg.attachments as m_attachments from jwe_msg_message msg where msg.id = :messageId");
    stmt.params.messageId = messageId;

    var message = new jilMessage();
    try 
    {  
      while ( stmt.step() )
      {
        message.msgProfileId = msgProfileId;
        message.id = stmt.row.m_id;
        message.sourceAddress = stmt.row.m_addr;
        message.subject = stmt.row.m_sub;
        message.priority = this.getBoolean(stmt.row.m_priority);
        message.isRead = this.getBoolean(stmt.row.m_isread);
        message.callback = stmt.row.m_callback;
        message.date = stmt.row.m_date;
        message.validity = stmt.row.m_validity;
        message.body = stmt.row.m_body;
        message.type = stmt.row.m_type;
        message.toAddress = stmt.row.m_to;
        message.ccAddress = stmt.row.m_cc;
        message.bccAddress = stmt.row.m_bcc;
        message.attachments = stmt.row.m_attachments;
      }
    }
    finally 
    {
      stmt.reset();
    }

    return(message);
  },
  
  getMessagesByFolder : function(folderId)
  {
    var stmt = this.getConnection().createStatement("select id, source_address, subject, message_priority, is_read, callback_number, time, validity_period_hours, body, message_type, to_addresses, cc_addresses, bcc_addresses, attachments from jwe_msg_message where folder_id = :folderId");
    stmt.params.folderId = folderId;

    var messages = new Array();    
    try 
    {  
      while ( stmt.step() )
      {
        var message = new jilMessage();
        message.sourceAddress = stmt.row.source_address;
        message.subject = stmt.row.subject;
        message.priority = this.getBoolean(stmt.row.message_priority);
        message.isRead = this.getBoolean(stmt.row.is_read);
        message.callback = stmt.row.callback_number;
        message.date = stmt.row.time;
        message.validity = stmt.row.validity_period_hours;
        message.body = stmt.row.body;
        message.type = stmt.row.message_type;
        message.toAddress = stmt.row.to_addresses;
        message.ccAddress = stmt.row.cc_addresses;
        message.bccAddress = stmt.row.bcc_addresses;
        message.attachments = stmt.row.attachments;
        messages.push(message);
      }
    }
    finally 
    {
      stmt.reset();
    }

    return(messages);
  },
  
  getMessageCount : function(messageType, folderId)
  {
    var messageCount =
    {
      read : 0,
      unread : 0,
      total : 0,
    };
    
    var stmt = this.getConnection().createStatement("select count(*) as m_count from jwe_msg_message where folder_id = :folderId and is_read = 0 and message_type = :type");
    stmt.params.folderId = folderId;
    stmt.params.type = messageType;
    
    try 
    {  
      while ( stmt.step() )
        messageCount.unread = stmt.row.m_count;
    }
    finally 
    {
      stmt.reset();
    }
    
    stmt = this.getConnection().createStatement("select count(*) as m_count from jwe_msg_message where folder_id = :folderId and is_read = 1 and message_type = :type");
    stmt.params.folderId = folderId;
    stmt.params.type = messageType;
    
    try 
    {  
      while ( stmt.step() )
        messageCount.read = stmt.row.m_count;
    }
    finally 
    {
      stmt.reset();
    }
    messageCount.total = messageCount.unread + messageCount.read;

    return(messageCount);
  },

  addMessage : function(message)
  {
    var stmt = this.getConnection().createStatement("insert into jwe_msg_message (id, folder_id, body, callback_number, is_read, message_priority, message_type, source_address, subject, time, validity_period_hours, to_addresses, cc_addresses, bcc_addresses, attachments) values (null, :folderId, :body, :callback, :isRead, :priority, :type, :from, :subject, :time, :validity, :to, :cc, :bcc, :attachments)");
    stmt.params.folderId = message.folderId;
    stmt.params.body = message.body;
    stmt.params.callback = message.callback;
    stmt.params.isRead = this.getBoolean(message.isRead);
    stmt.params.priority = this.getBoolean(message.priority);
    stmt.params.type = message.type;
    stmt.params.from = message.sourceAddress;
    stmt.params.subject = message.subject;
    
    if ( (message.date == null) || (message.date == 0) )
      stmt.params.time = new Date();
    else
      stmt.params.time = message.date;
    
    stmt.params.validity = message.validity;
    stmt.params.to = message.toAddress;
    stmt.params.cc = message.ccAddress;
    stmt.params.bcc = message.bccAddress;
    if ( message.attachments == null )
      stmt.params.attachments = "";
    else
      stmt.params.attachments = message.attachments;
    
    try
    {
      stmt.executeStep();
    }
    catch(exception)
    {
      dump(exception);
      return(false);
    }
    finally 
    {
      stmt.reset();
    }
    return(true);
  },

  updateMessage : function(message)
  {
    var stmt = this.getConnection().createStatement("update jwe_msg_message set folder_id = :folderId, body = :body, callback_number = :callback, is_read = :isRead, message_priority = :priority, message_type = :type, source_address = :from, subject = :subject, time = :time, validity_period_hours = :validity, to_addresses = :to, cc_addresses = :cc, bcc_addresses = :bcc, attachments = :attachments where id = :id");
    if ( message.folderId == null )
      stmt.params.folderId = 0;
    else
      stmt.params.folderId = message.folderId;
    stmt.params.body = message.body;
    stmt.params.callback = message.callback;
    stmt.params.isRead = message.isRead;
    stmt.params.priority = message.priority;
    stmt.params.type = message.type;
    stmt.params.from = message.sourceAddress;
    stmt.params.subject = message.subject;
    stmt.params.time = message.date;
    stmt.params.validity = message.validity;
    stmt.params.to = message.toAddress;
    stmt.params.cc = message.ccAddress;
    stmt.params.bcc = message.bccAddress;
    if ( message.attachments == null )
      stmt.params.attachments = "";
    else
      stmt.params.attachments = message.attachments;
    stmt.params.id = message.id;

    try
    {
      stmt.executeStep();
    }
    catch(exception)
    {
      dump(exception);
      return(false);
    }
    finally 
    {
      stmt.reset();
    }
    return(true);
  },
  
  moveMessage : function(messageId, folderId)
  {
    var stmt = this.getConnection().createStatement("update jwe_msg_message set folder_id = :folderId where id = :messageId");
    stmt.params.folderId = folderId;
    stmt.params.messageId = messageId;
    
    try
    {
      stmt.executeStep();
    }
    catch(exception)
    {
      dump(exception);
      return(false);
    }
    finally 
    {
      stmt.reset();
    }
    return(true);
  },

  deleteMessage : function(messageId)
  {
    var stmt = this.getConnection().createStatement("delete from jwe_msg_message where id = :id");
    stmt.params.id = messageId;

    try
    {
      stmt.executeStep();
    }
    catch(exception)
    {
      dump(exception);
      return(false);
    }
    finally 
    {
      stmt.reset();
    }
    return(true);
  },

  getAddressBookItems : function(pimProfileId, groupId, notInGroup)
  {
    var stmt = null;
    if ( groupId != null )
    {
      var query = "select id, address, company, email, full_name, home_phone, mobile_phone, title, work_phone, ringtone_file_url from jwe_pim_address_book_item where pim_profile_id = :pimProfileId and id in (select address_book_item_id from jwe_pim_address_book_item_group_map where group_id = :groupId)";

      if ( notInGroup == true )
        query = "select id, address, company, email, full_name, home_phone, mobile_phone, title, work_phone, ringtone_file_url from jwe_pim_address_book_item where pim_profile_id = :pimProfileId and id not in (select address_book_item_id from jwe_pim_address_book_item_group_map where group_id = :groupId)";

      stmt = this.getConnection().createStatement(query);
      stmt.params.pimProfileId = pimProfileId;
      stmt.params.groupId = groupId;
    }
    else
    {
      stmt = this.getConnection().createStatement("select id, address, company, email, full_name, home_phone, mobile_phone, title, work_phone, ringtone_file_url from jwe_pim_address_book_item where pim_profile_id = :pimProfileId");
      stmt.params.pimProfileId = pimProfileId;
    }

    var items = new Array();
    try 
    {  
      while ( stmt.step() )
      {
        var item = new jilAddressBookItem();
        item.pimProfileId = pimProfileId;
        item.id = stmt.row.id;
        item.address = stmt.row.address;
        item.company = stmt.row.company;
        item.email = stmt.row.email;
        item.fullName = stmt.row.full_name;
        item.homePhone = stmt.row.home_phone;
        item.mobilePhone = stmt.row.mobile_phone;
        item.title = stmt.row.title;
        item.workPhone = stmt.row.work_phone;
        item.ringtoneFileUrl = stmt.row.ringtone_file_url;
        
        var stmt_att = this.getConnection().createStatement("select key, value from jwe_pim_address_book_item_attribute_value where address_book_item_id = :id");
        stmt_att.params.id = item.id;

        item.attributes = new Array();
        try
        {
          while ( stmt_att.step() )
            item.attributes[stmt_att.row.key] = stmt_att.row.value;
        }
        finally 
        {
          stmt_att.reset();
        }

        items.push(item);
      }
    }
    finally 
    {
      stmt.reset();
    }

    return(items);
  },

  getAddressBookItem : function(pimProfileId, addressId)
  {
    var stmt = this.getConnection().createStatement("select address, company, email, full_name, home_phone, mobile_phone, title, work_phone, ringtone_file_url from jwe_pim_address_book_item where pim_profile_id = :pimProfileId and id = :id");
    stmt.params.pimProfileId = pimProfileId;
    stmt.params.id = addressId;

    var item = new jilAddressBookItem();
    try 
    {  
      while ( stmt.step() )
      {        
        item.pimProfileId = pimProfileId;
        item.id = addressId;
        item.address = stmt.row.address;
        item.company = stmt.row.company;
        item.email = stmt.row.email;
        item.fullName = stmt.row.full_name;
        item.homePhone = stmt.row.home_phone;
        item.mobilePhone = stmt.row.mobile_phone;
        item.title = stmt.row.title;
        item.workPhone = stmt.row.work_phone;
        item.ringtoneFileUrl = stmt.row.ringtone_file_url;
      }
    }
    finally 
    {
      stmt.reset();
    }
    
    stmt =  this.getConnection().createStatement("select key, value from jwe_pim_address_book_item_attribute_value where address_book_item_id = :id");
    stmt.params.id = item.id;

    item.attributes = new Array();
    try
    {
      while ( stmt.step() )
      {
        item.attributes[stmt.row.key] = stmt.row.value;
      }
    }
    finally 
    {
      stmt.reset();
    }

    return(item);
  },
  
  getAddressBookItemsCount : function(pimProfileId)
  {
    var stmt = this.getConnection().createStatement("select count(*) as addr_count from jwe_pim_address_book_item where pim_profile_id = :pimProfileId");
    stmt.params.pimProfileId = pimProfileId;

    var count = null;
    try 
    {  
      while ( stmt.step() )
        count = stmt.row.addr_count;
    }
    finally 
    {
      stmt.reset();
    }
    
    return(count);
  },
  
  findAddressBookItems : function(pimProfileId, comparison, start, end)
  {
    var search = new Array();
    
    if ( comparison.fullName == "" )
      search.push("full_name = ''");
    else if ( comparison.fullName.indexOf("*") )
      search.push("full_name like '"+comparison.fullName.replace("*", "%")+"'");
    else if ( comparison.fullName != null )
      search.push("full_name = '"+comparison.fullName+"'");
    
    var stmt = this.getConnection().createStatement("select id from jwe_pim_address_book_item where "+search);

    var items = new Array();
    try
    {
      while ( stmt.step() )
        items.push(this.getAddressBookItem(pimProfileId, stmt.row.id));
    }
    finally 
    {
      stmt.reset();
    }
    return(items);
  },

  addAddressBookItem : function(item)
  {
    try
    {
      var conn = this.getConnection();
      conn.beginTransaction();
      
      var stmt = conn.createStatement("insert into jwe_pim_address_book_item (id, pim_profile_id, address, company, email, full_name, home_phone, mobile_phone, title, work_phone, ringtone_file_url) values (null, :pimProfileId, :address, :company, :email, :fullName, :homePhone, :mobilePhone, :title, :workPhone, :ringtone)");
      stmt.params.pimProfileId = item.pimProfileId;
      stmt.params.address = item.address;
      stmt.params.company = item.company;
      stmt.params.email = item.email;
      stmt.params.fullName = item.fullName;
      stmt.params.homePhone = item.homePhone;
      stmt.params.mobilePhone = item.mobilePhone;
      stmt.params.title = item.title;
      stmt.params.workPhone = item.workPhone;
      stmt.params.ringtone = item.ringtoneFileUrl;
      try
      {
        stmt.executeStep();
      }
      finally 
      {
        stmt.reset();
      } 

      stmt = conn.createStatement("select max(id) as max_id from jwe_pim_address_book_item");
      try 
      {  
        while ( stmt.step() )
          item.id = stmt.row.max_id;
      }
      finally 
      {
        stmt.reset();
      }

      // add attributes
      if ( item.attributes != null )
      {
        for ( var i in item.attributes )
        {
          stmt = conn.createStatement("insert into jwe_pim_address_book_item_attribute_value (address_book_item_id, key, value) values (:itemId, :key, :value)");
          stmt.params.itemId = item.id;
          stmt.params.key = i;
          stmt.params.value = item.attributes[i];

          try
          {
            stmt.executeStep();
          }
          finally 
          {
            stmt.reset();
          }
        }
      }     
      conn.commitTransaction();
    }
    catch(exception)
    {
      dump(exception);
      conn.rollbackTransaction();
      return(false);
    }
    return(true);
  },

  updateAddressBookItem : function(item)
  {
    try
    {
      var conn = this.getConnection();
      conn.beginTransaction();
      
      var stmt = conn.createStatement("update jwe_pim_address_book_item set address = :address, company = :company, email = :email, full_name = :fullName, home_phone = :homePhone, mobile_phone = :mobilePhone, title = :title, work_phone = :workPhone, ringtone_file_url = :ringtone where pim_profile_id = :pimProfileId and id = :id");
      stmt.params.address = item.address;
      stmt.params.company = item.company;
      stmt.params.email = item.email;
      stmt.params.fullName = item.fullName;
      stmt.params.homePhone = item.homePhone;
      stmt.params.mobilePhone = item.mobilePhone;
      stmt.params.title = item.title;
      stmt.params.workPhone = item.workPhone;
      stmt.params.ringtone = item.ringtoneFileUrl;
      stmt.params.pimProfileId = item.pimProfileId;
      stmt.params.id = item.id;

      try
      {
        stmt.executeStep();
      }
      finally 
      {
        stmt.reset();
      }
      
      if ( item.attributes != null )
      {
        // flush any existing attributes
        stmt = conn.createStatement("delete from jwe_pim_address_book_item_attribute_value where address_book_item_id = :id");    
        stmt.params.id = item.id;

        try
        {
          stmt.executeStep();
        }
        finally 
        {
          stmt.reset();
        }

        // add attributes
        for ( var i in item.attributes )
        {
          stmt = conn.createStatement("insert into jwe_pim_address_book_item_attribute_value (address_book_item_id, key, value) values (:id, :key, :value)");
          stmt.params.id = item.id;
          stmt.params.key = i;
          stmt.params.value = item.attributes[i];

          try
          {
            stmt.executeStep();
          }
          finally 
          {
            stmt.reset();
          }
        }
      }
      conn.commitTransaction();
    }
    catch(exception)
    {
      dump(exception);
      conn.rollbackTransaction();
      return(false);
    }
    return(true);
  },

  deleteAddressBookItem : function(pimProfileId, itemId)
  {
    try
    {
      var conn = this.getConnection();
      conn.beginTransaction();
      
      var stmt = this.getConnection().createStatement("delete from jwe_pim_address_book_item where pim_profile_id = :pimProfileId and id = :id");
      stmt.params.pimProfileId = pimProfileId;
      stmt.params.id = itemId;

      try
      {
        stmt.executeStep();
      }
      finally 
      {
        stmt.reset();
      }

      // flush any existing attributes
      stmt = this.getConnection().createStatement("delete from jwe_pim_address_book_item_attribute_value where address_book_item_id = :id");    
      stmt.params.id = itemId;

      try
      {
        stmt.executeStep();
      }
      finally 
      {
        stmt.reset();
      }
      conn.commitTransaction();
    }
    catch(exception)
    {
      dump(exception);
      conn.rollbackTransaction();
      return(false);
    }
    return(true);
  },

  getAddressBookGroups : function(pimProfileId)
  {
    var stmt = this.getConnection().createStatement("select id, name from jwe_pim_address_book_group where pim_profile_id = :pimProfileId");
    stmt.params.pimProfileId = pimProfileId;

    var groups = new Array();    
    try 
    {  
      while ( stmt.step() )
      {
        var group = new jilAddressBookGroup();
        group.pimProfileId = pimProfileId;
        group.id = stmt.row.id;
        group.name = stmt.row.name;

        try
        {
          var stmt_count = this.getConnection().createStatement("select count(*) as count from jwe_pim_address_book_item_group_map where group_id = :groupId");
          stmt_count.params.groupId = group.id;
          while ( stmt_count.step() )
            group.addressBookItemCount = stmt_count.row.count;
        }
        finally
        {
          stmt_count.reset();
        }
        groups.push(group);
      }
    }
    finally 
    {
      stmt.reset();
    }

    return(groups);
  },
  
  deleteAddressBookGroupByName : function(pimProfileId, name)
  {
    var stmt = this.getConnection().createStatement("select id from jwe_pim_address_book_group where pim_profile_id = :pimProfileId and name = :name");
    stmt.params.pimProfileId = pimProfileId;
    stmt.params.name = name;

    var groupId = null;
    try 
    {  
      while ( stmt.step() )
        groupId = stmt.row.id;
    }
    finally 
    {
      stmt.reset();
    }
    
    this.deleteAddressBookGroup(pimProfileId, groupId);
  },
  
  getAddressBookGroupNames : function(pimProfileId)
  {
    var stmt = this.getConnection().createStatement("select name from jwe_pim_address_book_group where pim_profile_id = :pimProfileId");
    stmt.params.pimProfileId = pimProfileId;
    
    var names = new Array();
    try 
    {
      while ( stmt.step() )
        names.push(stmt.row.name);
    }
    finally 
    {
      stmt.reset();
    }

    return(names);
  },
  
  addAddressBookItemToGroup : function(pimProfileId, itemId, groupName)
  {
    var stmt = this.getConnection().createStatement("select id from jwe_pim_address_book_group where pim_profile_id = :pimProfileId and name = :name");
    stmt.params.pimProfileId = pimProfileId;
    stmt.params.name = groupName;
    
    var groupId = null;

    var groups = new Array();    
    try 
    {  
      while ( stmt.step() )
        groupId = stmt.row.id;
    }
    finally 
    {
      stmt.reset();
    }
    
    if ( groupId == null )
      return(false);
    
    // see if user is already in this group
    var alreadyInGroup = false;
    stmt = this.getConnection().createStatement("select address_book_item_id from jwe_pim_address_book_item_group_map where address_book_item_id = :itemId and group_id = :groupId");
    stmt.params.itemId = itemId;
    stmt.params.groupId = groupId;
    
    var alreadyInGroup = false;
    try 
    {  
      while ( stmt.step() )
        alreadyInGroup = true;
    }
    finally 
    {
      stmt.reset();
    }
    
    // is already in group, report back there was no action taken
    if ( alreadyInGroup == true )
      return(false);
    
    stmt = this.getConnection().createStatement("insert into jwe_pim_address_book_item_group_map (address_book_item_id, group_id) values (:itemId, :groupId)");
    stmt.params.itemId = itemId;
    stmt.params.groupId = groupId;

    try
    {
      stmt.executeStep();
    }
    finally 
    {
      stmt.reset();
    }
    
    return(true);
  },
  
  getGroupNamesForAddressBookItem : function(itemId)
  {
    var alreadyInGroup = false;
    var stmt = this.getConnection().createStatement("select g.name as name from jwe_pim_address_book_group g, jwe_pim_address_book_item_group_map map where map.address_book_item_id = :itemId and map.group_id = g.id");
    stmt.params.itemId = itemId;
    
    var names = new Array();
    try 
    {  
      while ( stmt.step() )
        names.push(stmt.row.name);
    }
    finally 
    {
      stmt.reset();
    }
    
    return(names);
  },
  
  getAddressBookGroupMembers : function(pimProfileId, groupName)
  {
    var stmt = this.getConnection().createStatement("select id from jwe_pim_address_book_group where pim_profile_id = :pimProfileId and name = :name");
    stmt.params.pimProfileId = pimProfileId;
    stmt.params.name = groupName;
    
    var ids = new Array();
    try 
    {  
      while ( stmt.step() )
        ids.push(stmt.row.id);
    }
    finally 
    {
      stmt.reset();
    }
    
    if ( ids.length < 1 )
      return;
    
    // now get all members for the first group found
    stmt = this.getConnection().createStatement("select address_book_item_id from jwe_pim_address_book_item_group_map where group_id = :groupId");
    stmt.params.groupId = ids[0];
    
    var members = new Array();
    try 
    {  
      while ( stmt.step() )
        members.push(this.getAddressBookItem(pimProfileId, stmt.row.address_book_item_id));
    }
    finally 
    {
      stmt.reset();
    }
    
    return(members);
  },

  addAddressBookGroup : function(group)
  {
    try
    {
      var conn = this.getConnection();
      conn.beginTransaction();
      
      var stmt = conn.createStatement("insert into jwe_pim_address_book_group (id, pim_profile_id, name) values (null, :pimProfileId, :name)");
      stmt.params.pimProfileId = group.pimProfileId;
      stmt.params.name = group.name;

      try
      {
        stmt.executeStep();
      }
      finally 
      {
        stmt.reset();
      }

      // add group members
      if ( group.members != null )
      {
        for ( var i = 0; i < group.members.length; i++ )
        {
          stmt = conn.createStatement("insert into jwe_pim_address_book_item_group_map (address_book_item_id, group_id) values (:memberId, (select max(id) from jwe_pim_address_book_group))");
          stmt.params.memberId = group.members[i].id;

          try
          {
            stmt.executeStep();
          }
          finally 
          {
            stmt.reset();
          }
        }
      }
      conn.commitTransaction();
    }
    catch(exception)
    {
      dump(exception);
      conn.rollbackTransaction();
      return(false);
    }
    return(true);
  },

  updateAddressBookGroup : function(group)
  {
    try
    {
      var conn = this.getConnection();
      conn.beginTransaction();
      
      var stmt = conn.createStatement("update jwe_pim_address_book_group set name = :name where pim_profile_id = :pimProfileId and id = :id");
      stmt.params.name = group.name;
      stmt.params.pimProfileId = group.pimProfileId;
      stmt.params.id = group.id;

      try
      {
        stmt.executeStep();
      }
      finally 
      {
        stmt.reset();
      }

      // flush any existing users first
      stmt = conn.createStatement("delete from jwe_pim_address_book_item_group_map where group_id = :groupId");
      stmt.params.groupId = group.id;

      try
      {
        stmt.executeStep();
      }
      finally 
      {
        stmt.reset();
      }

      // add group members
      if ( group.members != null )
      {
        for ( var i = 0; i < group.members.length; i++ )
        {
          stmt = conn.createStatement("insert into jwe_pim_address_book_item_group_map (address_book_item_id, group_id) values (:memberId, :groupId)");
          stmt.params.memberId = group.members[i].id;
          stmt.params.groupId = group.id;

          try
          {
            stmt.executeStep();
          }
          finally 
          {
            stmt.reset();
          }
        }
      }
      conn.commitTransaction();
    }
    catch(exception)
    {
      dump(exception);
      conn.rollbackTransaction();
      return(false);
    }
    return(true);
  },

  deleteAddressBookGroup : function(pimProfileId, groupId)
  {
    try
    {
      var conn = this.getConnection();
      conn.beginTransaction();
      
      var stmt = conn.createStatement("delete from jwe_pim_address_book_group where pim_profile_id = :pimProfileId and id = :id");
      stmt.params.pimProfileId = pimProfileId;
      stmt.params.id = groupId;

      try
      {
        stmt.executeStep();
      }
      finally 
      {
        stmt.reset();
      }

      // flush any existing users first
      stmt = conn.createStatement("delete from jwe_pim_address_book_item_group_map where group_id = :groupId");
      stmt.params.groupId = groupId;

      try
      {
        stmt.executeStep();
      }
      finally 
      {
        stmt.reset();
      }
      conn.commitTransaction();
    }
    catch(exception)
    {
      dump(exception);
      conn.rollbackTransaction();
      return(false);
    }
    return(true);
  },

  getAddressAvailableAttributes : function(pimProfileId)
  {
    var stmt = this.getConnection().createStatement("select id, key from jwe_pim_address_book_item_attribute where pim_profile_id = :pimProfileId");
    stmt.params.pimProfileId = pimProfileId;

    var attributes = new Array();    
    try 
    {  
      while ( stmt.step() )
      {
        var attribute = new jilAddressAttribute();
        attribute.pimProfileId = pimProfileId;
        attribute.id = stmt.row.id;
        attribute.key = stmt.row.key;
        attributes.push(attribute);
      }
    }
    finally 
    {
      stmt.reset();
    }

    return(attributes);
  },

  getAttributesForItem : function(item)
  {
    var stmt = this.getConnection().createStatement("select key, value from jwe_pim_address_book_item_attribute_value where address_book_item_id = :itemId");
    stmt.params.itemId = item.id;

    var attributes = new Array();    
    try 
    {  
      while ( stmt.step() )
      {
        var attribute = new jilAddressAttribute();
        attribute.pimProfileId = item.pimProfileId;
        attribute.itemId = item.Id;
        attribute.key = stmt.row.key;
        attribute.value = stmt.row.value;
        attributes.push(attribute);
      }
    }
    finally 
    {
      stmt.reset();
    }

    return(attributes);
  },

  addAttribute : function(attribute)
  {
    var stmt = this.getConnection().createStatement("insert into jwe_pim_address_book_item_attribute (id, pim_profile_id, key) values (null, :pimProfileId, :key)");
    stmt.params.pimProfileId = attribute.pimProfileId;
    stmt.params.key = attribute.key;

    try
    {
      stmt.executeStep();
    }
    catch(exception)
    {
      dump(exception);
      return(false);
    }
    finally 
    {
      stmt.reset();
    }
    return(true);
  },

  updateAttribute : function(attribute)
  {
    var stmt = this.getConnection().createStatement("update jwe_pim_address_book_item_attribute set key = :key where pim_profile_id = :pimProfileId and id = :id");
    stmt.params.key = attribute.key;
    stmt.params.pimProfileId = attribute.pimProfileId;
    stmt.params.id = attribute.id;

    try
    {
      stmt.executeStep();
    }
    catch(exception)
    {
      dump(exception);
      return(false);
    }
    finally
    {
      stmt.reset();
    }
    return(true);
  },

  deleteAttribute : function(pimProfileId, attributeId)
  {
    var stmt = this.getConnection().createStatement("delete from jwe_pim_address_book_item_attribute where pim_profile_id = :pimProfileId and id = :id");
    stmt.params.pimProfileId = pimProfileId;
    stmt.params.id = attributeId;

    try
    {
      stmt.executeStep();
    }
    catch(exception)
    {
      dump(exception);
      return(false);
    }
    finally 
    {
      stmt.reset();
    }
    return(true);
  },

  getCalendarItems : function(pimProfileId)
  {
    var stmt = this.getConnection().createStatement("select id, event_name, event_start_time, event_end_time, alarm_date, alarmed, event_notes, event_recurrence from jwe_pim_calendar_item where pim_profile_id = :pimProfileId");
    stmt.params.pimProfileId = pimProfileId;

    var items = new Array();    
    try 
    {  
      while ( stmt.step() )
      {
        var item = new jilCalendarItem();
        item.pimProfileId = pimProfileId;
        item.id = stmt.row.id;
        item.name = stmt.row.event_name;
        item.startDatetime = stmt.row.event_start_time;
        item.endDatetime = stmt.row.event_end_time;
        item.alarmDatetime = stmt.row.alarm_date;
        item.alarmFlag = this.getBoolean(stmt.row.alarmed);
        item.notes = stmt.row.event_notes;
        item.recurType = stmt.row.event_recurrence;
        items.push(item);
      }
    }
    finally 
    {
      stmt.reset();
    }

    return(items);
  },
  
  getCalendarItem : function(itemId)
  {
    var stmt = this.getConnection().createStatement("select id, event_name, event_start_time, event_end_time, alarm_date, alarmed, event_notes, event_recurrence, pim_profile_id from jwe_pim_calendar_item where id = :itemId");
    stmt.params.itemId = itemId;

    var item = new jilCalendarItem();    
    try 
    {  
      while ( stmt.step() )
      {
        item.id = itemId;
        item.pimProfileId = stmt.row.pim_profile_id;
        item.name = stmt.row.event_name;
        item.startDatetime = stmt.row.event_start_time;
        item.endDatetime = stmt.row.event_end_time;
        item.alarmDatetime = stmt.row.alarm_date;
        item.alarmFlag = this.getBoolean(stmt.row.alarmed);
        item.notes = stmt.row.event_notes;
        item.recurType = stmt.row.event_recurrence;
      }
    }
    finally 
    {
      stmt.reset();
    }

    return(item);
  },
  
  getCalendarItemsStartingBetween : function(pimProfileId, startDate, endDate)
  {
    var stmt = this.getConnection().createStatement("select id from jwe_pim_calendar_item where pim_profile_id = :pimProfileId and event_start_time >= :start and event_start_time <= :end");
    stmt.params.pimProfileId = pimProfileId;
    stmt.params.start = startDate;
    stmt.params.end = endDate;

    var items = new Array();
    try 
    {  
      while ( stmt.step() )
        items.push(this.getCalendarItem(stmt.row.id));
    }
    finally 
    {
      stmt.reset();
    }

    return(items);
  },
  
  findCalendarItems : function(pimProfileId, comparison, start, end)
  {
    var search = new Array();
    
    if ( comparison.eventName == "" )
      search.push("event_name = ''");
    else if ( comparison.eventName.indexOf("*") )
      search.push("event_name like '"+comparison.eventName.replace("*", "%")+"'");
    else if ( comparison.eventName != null )
      search.push("event_name = '"+comparison.eventName+"'");
    
    var stmt = this.getConnection().createStatement("select id from jwe_pim_calendar_item where "+search);

    var items = new Array();
    try
    {
      while ( stmt.step() )
        items.push(this.getCalendarItem(stmt.row.id));
    }
    finally 
    {
      stmt.reset();
    }
    return(items);
  },

  addCalendarItem : function(item)
  {
    var stmt = this.getConnection().createStatement("insert into jwe_pim_calendar_item (id, pim_profile_id, alarm_date, alarmed, event_end_time, event_name, event_notes, event_recurrence, event_start_time) values (null, :pimProfileId, :alarmDate, :alarmFlag, :endDate, :name, :notes, :recurType, :startDate)");
    stmt.params.pimProfileId = item.pimProfileId;
    stmt.params.alarmFlag = item.alarmDatetime;
    stmt.params.alarmDate = item.alarmFlag;
    stmt.params.endDate = item.endDatetime;
    stmt.params.name = item.name;
    stmt.params.notes = item.notes;
    stmt.params.recurType = item.recurType;
    stmt.params.startDate = item.startDatetime;    

    try
    {
      stmt.executeStep();
    }
    catch(exception)
    {
      dump(exception);
      return(false);
    }
    finally 
    {
      stmt.reset();
    }
    return(true);
  },

  updateCalendarItem : function(item)
  {
    var stmt = this.getConnection().createStatement("update jwe_pim_calendar_item set alarm_date = :alarmDate, alarmed = :alarmFlag, event_end_time = :endDate, event_name = :name, event_notes = :notes, event_recurrence = :recurType, event_start_time = :startDate where pim_profile_id = :pimProfileId and id = :id");
    stmt.params.alarmDate = item.alarmDatetime;
    stmt.params.alarmFlag = item.alarmFlag;
    stmt.params.endDate = item.endDatetime;
    stmt.params.name = item.name;
    stmt.params.notes = item.notes;
    stmt.params.recurType = item.recurType;
    stmt.params.startDate = item.startDatetime;  
    stmt.params.pimProfileId = item.pimProfileId;
    stmt.params.id = item.id;

    try
    {
      stmt.executeStep();
    }
    catch(exception)
    {
      dump(exception);
      return(false);
    }
    finally 
    {
      stmt.reset();
    }
    return(true);
  },

  deleteCalendarItem : function(pimProfileId, itemId)
  {
    var stmt = this.getConnection().createStatement("delete from jwe_pim_calendar_item where pim_profile_id = :pimProfileId and id = :id");
    stmt.params.pimProfileId = pimProfileId;
    stmt.params.id = itemId;

    try
    {
      stmt.executeStep();
    }
    catch(exception)
    {
      dump(exception);
      return(false);
    }
    finally 
    {
      stmt.reset();
    }
    return(true);
  },

  updateDefaultValues : function(values)
  {    
    try
    {
      var conn = this.getConnection();
      conn.beginTransaction();
      
      // flush current values
      var stmt = this.getConnection().createStatement("delete from jwe_default_values");

      try
      {
        stmt.executeStep();
      }
      finally 
      {
        stmt.reset();
      }

      for ( var i in values )
      {
        stmt = this.getConnection().createStatement("insert into jwe_default_values (key, value) values (:key, :value)");
        stmt.params.key = i;
        stmt.params.value = values[i];

        try
        {
          stmt.executeStep();
        }
        finally 
        {
          stmt.reset();
        }
      }
      conn.commitTransaction();
    }
    catch(exception)
    {
      dump(exception);
      conn.rollbackTransaction();
      return(false);
    }
    return(true);
  },

  getDefaultValues : function()
  {    
    var stmt = this.getConnection().createStatement("select key, value from jwe_default_values");

    var values = new Array();    
    try 
    {  
      while ( stmt.step() )
      {
        values[stmt.row.key] = stmt.row.value;
      }
    }
    finally 
    {
      stmt.reset();
    }

    return(values);
  },

  exportDeviceProfile : function(profileId)
  {
    return(JSON.stringify(this.getExportableDeviceProfile(profileId)));
  },

  getExportableDeviceProfile : function(profileId)
  {
    var dProfile = this.getDeviceProfile(profileId);

    var ep = new ieDeviceProfile();
    ep.name = dProfile.name;
    ep.uuid = dProfile.uuid;
    ep.jilAPISpec = dProfile.jilAPISpec;

    var dData = this.getDeviceData(profileId);
    ep.availableApps = new Array();
    for  ( var i = 0; i < dData.availableApps.length; i++ )
      ep.availableApps.push(dData.availableApps[i]);

    var dNets = this.getDataNetworkInfo(profileId);
    ep.dataNetworks = new Array();
    for ( var i = 0; i < dNets.length; i++ )
    {
      var net = new ieDataNetworkConnection();
      net.type = dNets[i].type;
      net.name = dNets[i].name;
      net.enabled = dNets[i].enabled;
      net.nickname = dNets[i].nickname;
      ep.dataNetworks.push(net);
    }

    var dInfo = this.getDeviceInfo(profileId);
    ep.colorDepth = dInfo.colorDepth;
    ep.firmware = dInfo.firmware;
    ep.manufacturer = dInfo.manufacturer;
    ep.model = dInfo.model;
    ep.screenHeight = dInfo.screenHeight;
    ep.screenWidth = dInfo.screenWidth;
    ep.memory = dInfo.totalMemory;

    ep.fileSystems = new Array();
    for ( var i = 0; i < dData.fileSystems.length; i++ )
    {
      var fsys = new ieFileSystem();
      fsys.rootPath = dData.fileSystems[i].rootPath;
      fsys.size = dData.fileSystems[i].size;
      ep.fileSystems.push(fsys);
    }

    var pInfo = this.getPositionInfo(profileId);
    ep.accuracy = pInfo.accuracy;
    ep.altitudeAccuracy = pInfo.altitudeAccuracy;

    var dState = this.getDeviceState(profileId);
    ep.availableMemory = dState.availableMemory;
    ep.os = dInfo.os;
    ep.software = dInfo.software;
    ep.audioPath = dState.audioPath;
    ep.language = dState.language;
    ep.engineName = dData.engineName;
    ep.engineProvider = dData.engineProvider;
    ep.engineVersion = dData.engineVersion;
    ep.ringtone = dData.ringtone;

    var aInfo = this.getAccountInfo(profileId);
    ep.operatorName = aInfo.phoneOpName;
    ep.userId = aInfo.userId;
    ep.subscriptionType = aInfo.subscriptionType;

    var export = 
    {
      profile: ep,
      type: "device"
    };
    return(export);
  },

  importProfile : function(jsonString)
  {
    var import = JSON.parse(jsonString);    
    var returnValue = false;

    if ( import.type == "device" )
      returnValue = this.importDeviceProfileObject(import.profile);
    
    else if ( import.type == "messaging" )
      returnValue = this.importMessagingProfileObject(import.profile);
    
    else if ( import.type == "pim" )
      returnValue = this.importPIMProfileObject(import.profile);
    
    return(returnValue);
  },

  importDeviceProfileObject : function(ip)
  {
    var defaults = this.getDefaultValues();
    var conn = this.getConnection();

    // check to see if a device with this uuid already exists
    var stmt = conn.createStatement("select id, uuid from jwe_device_profile where uuid = :uuid");
    stmt.params.uuid = ip.uuid;

    try 
    {  
      while ( stmt.step() )
        return(false);
    }
    finally 
    {
      stmt.reset();
    }

    try
    {
      // start the transaction
      conn.beginTransaction();
      
      // insert the device profile
      stmt = conn.createStatement("insert into jwe_device_profile (id, name, messaging_profile_id, pim_profile_id, is_default, uuid, jil_api_spec) values (null, :name, (select max(id) from jwe_messaging_profile), (select max(id) from jwe_pim_profile), 'false', :uuid, :jilAPISpec)");
      stmt.params.name = ip.name;
      stmt.params.uuid = ip.uuid;
      stmt.params.jilAPISpec = ip.jilAPISpec;

      try
      {
        stmt.executeStep();
      }
      finally 
      {
        stmt.reset();
      }

      // get the id of the profile we just added
      var profileId = null;
      stmt = conn.createStatement("select last_insert_rowid() as profileId");

      try
      {  
        while ( stmt.step() )
          profileId = stmt.row.profileId;
      }
      finally 
      {
        stmt.reset();
      }       

      // insert the available applications
      for ( var i =0; i < ip.availableApps.length; i++ )
      {
        TransitCommon.debug("app: "+ip.availableApps[i]);
        
        stmt = conn.createStatement("insert into jwe_available_applications (profile_id, type) values (:profileId, :type)");      
        stmt.params.profileId = profileId;
        stmt.params.type = ip.availableApps[i];

        try
        {
          stmt.executeStep();
        }
        finally 
        {
          stmt.reset();
        }
      }

      for ( var i = 0; i < ip.dataNetworks.length; i++ )
      {
        stmt = conn.createStatement("insert into jwe_data_network_connection (profile_id, type, name, enabled, supports_data, nickname) values (:profileId, :type, :name, :enabled, 'true', :nickname)");      
        stmt.params.profileId = profileId;
        stmt.params.type = ip.dataNetworks[i].type;
        stmt.params.name = ip.dataNetworks[i].name;
        stmt.params.enabled = ip.dataNetworks[i].enabled;
        stmt.params.nickname = ip.dataNetworks[i].nickname;

        try
        {
          stmt.executeStep();
        }
        finally 
        {
          stmt.reset();
        }
      }

      // insert file systems
      for ( var i = 0; i < ip.fileSystems.length; i++ )
      {
        stmt = conn.createStatement("insert into jwe_file_system (id, profile_id, root_path, local_path, size) values (null, :profileId, :rootPath, :localPath, :size)");      
        stmt.params.profileId = profileId;
        stmt.params.rootPath = ip.fileSystems[i].rootPath;
        stmt.params.size = ip.fileSystems[i].size;
        stmt.params.localPath = defaults["local-filesystem-path"];

        try
        {
          stmt.executeStep();
        }
        finally 
        {
          stmt.reset();
        }
      }

      stmt = conn.createStatement("insert into jwe_device_state (profile_id, phone_color_depth_default, phone_firmware, phone_manufacturer, phone_model, phone_screen_height_default, phone_screen_width_default, total_memory, backlight_on, keypadlight_on, processor_utilization_percent, accelerometer_xaxis, accelerometer_yaxis, accelerometer_zaxis, is_charging, percent_remaining) values (:profileId, :colorDepth, :firmware, :manufacturer, :model, :height, :width, :memory, :backlight, :keypad, :proc, :xaxis, :yaxis, :zaxis, :charging, :remaining)");
      stmt.params.profileId = profileId;
      stmt.params.colorDepth = ip.colorDepth;
      stmt.params.firmware = ip.firmware;
      stmt.params.manufacturer = ip.manufacturer;
      stmt.params.model = ip.model;
      stmt.params.height = ip.screenHeight;
      stmt.params.width = ip.screenWidth;
      stmt.params.memory = ip.memory;
      stmt.params.backlight = defaults["back-light-on"];
      stmt.params.keypad = defaults["keypad-light-on"];
      stmt.params.proc = defaults["processor-utilization-percent"]; 
      stmt.params.xaxis = defaults["x-axis"];
      stmt.params.yaxis = defaults["y-axis"];
      stmt.params.zaxis = defaults["z-axis"];
      stmt.params.charging = defaults["is-charging"];
      stmt.params.remaining = defaults["charge-remaining"];

      try
      {
        stmt.executeStep();
      }
      finally 
      {
        stmt.reset();
      }

      stmt = conn.createStatement("insert into jwe_network_state (profile_id, position_accuracy, position_altitude, position_altitude_accuracy, position_cell_id, position_latitude, position_longitude, is_radio_enabled, is_roaming, radio_signal_source, radio_signal_strength_percent) values (:profileId, :accuracy, :altitude, :altAccuracy, :cellID, :lat, :long, :radio, :roaming, :signal, :strength)");
      stmt.params.profileId = profileId;
      stmt.params.accuracy = ip.accuracy;
      stmt.params.altitude = defaults["altitude"];
      stmt.params.altAccuracy = ip.accuracy;
      stmt.params.cellID = defaults["cell-id"];
      stmt.params.lat = defaults["latitude"];
      stmt.params.long = defaults["longitude"];
      stmt.params.radio = defaults["radio-enabled"];
      stmt.params.roaming = defaults["is-roaming"];
      stmt.params.signal = defaults["signal-source"];
      stmt.params.strength = defaults["signal-strength"];

      try
      {
        stmt.executeStep();
      }
      finally 
      {
        stmt.reset();
      }

      stmt = conn.createStatement("insert into jwe_software_state (profile_id, phone_os, phone_software, available_memory, audio_path, language, msg_ringtone_volume, ringtone_volume, vibration_setting, is_audio_playing, is_video_playing, volume, clipboard_string, widget_engine_name, widget_engine_provider, widget_engine_version, ringtone) values (:profileId, :os, :software, :availMemory, :audioPath, :lang, :msgVol, :ringVol, :vibe, :audioPlay, :videoPlay, :mediaVol, :clip, :engineName, :engineProv, :engineVer, :ringtone)");
      stmt.params.profileId = profileId;
      stmt.params.os = ip.os;
      stmt.params.software = ip.software;
      stmt.params.availMemory = defaults["signal-strength"];
      stmt.params.audioPath = ip.audioPath;
      stmt.params.lang = ip.language;
      stmt.params.msgVol = defaults["msg-ringtone-volume"];
      stmt.params.ringVol = defaults["ringtone-volume"];
      stmt.params.vibe = defaults["vibration-setting"];
      stmt.params.audioPlay = defaults["is-audio-playing"];
      stmt.params.videoPlay = defaults["is-video-playing"];
      stmt.params.mediaVol = defaults["volume"];
      stmt.params.clip = defaults["clipboard"];
      stmt.params.engineName = ip.engineName;
      stmt.params.engineProv = ip.engineProvider;
      stmt.params.engineVer = ip.engineVersion;
      stmt.params.ringtone = ip.ringtone;

      try
      {
        stmt.executeStep();
      }
      finally 
      {
        stmt.reset();
      }

      stmt = conn.createStatement("insert into jwe_subscriber_state (profile_id, phone_msisdn, phone_operator_name, phone_unique_user_id, user_account_balance, user_subscription_type, owner_address, owner_company, owner_email, owner_full_name, owner_title, owner_home_phone, owner_mobile_phone, owner_work_phone) values (:profileId, :msisdn, :opName, :userId, :balance, :subType, :oAddress, :oCompany, :oEmail, :oFullName, :oTitle, :oHPhone, :oMPhone, :oWPhone)");
      stmt.params.profileId = profileId;
      stmt.params.msisdn = defaults["msisdn"];
      stmt.params.opName = ip.operatorName;
      stmt.params.userId = ip.userId;
      stmt.params.balance = defaults["account-balance"];
      stmt.params.subType = ip.subscriptionType;
      stmt.params.oAddress = defaults["owner-address"];
      stmt.params.oCompany = defaults["owner-company"];
      stmt.params.oEmail = defaults["owner-email"];
      stmt.params.oFullName = defaults["owner-full-name"];
      stmt.params.oTitle = defaults["owner-title"];
      stmt.params.oHPhone = defaults["owner-home-phone"];
      stmt.params.oMPhone = defaults["owner-mobile-phone"];
      stmt.params.oWPhone = defaults["owner-work-phone"];

      try
      {
        stmt.executeStep();
      }
      finally 
      {
        stmt.reset();
      }

      conn.commitTransaction();
    }
    catch (exception)
    {
      dump(exception);
      conn.rollbackTransaction();
      return(false);
    }

    return(true);
  },

  createNewDeviceProfile : function(name, uuid, copyId)
  {
    // get the profile object for the profile to copy
    var copyProfile = this.getExportableDeviceProfile(copyId).profile;

    // change the name and UUID
    copyProfile.name = name;
    copyProfile.uuid = uuid;

    // add it, will return false if it failed
    return(this.importDeviceProfileObject(copyProfile));
  },

  deleteDeviceProfile : function(profileId)
  {
    var conn = this.getConnection();
    try
    {
      var stmt = conn.createStatement("delete from jwe_device_profile where id = :profileId");
      stmt.params.profileId = profileId;

      try
      {
        stmt.executeStep();
      }
      finally 
      {
        stmt.reset();
      }
    }
    catch (exception)
    {
      dump(exception);
      return(false);
    }

    return(true);
  },

  exportMessagingProfile : function(msgProfileId)
  {
    return(JSON.stringify(this.getExportableMessagingProfile(msgProfileId)));
  },

  getExportableMessagingProfile : function(msgProfileId)
  {
    var msgProfile = this.getMessagingProfile(msgProfileId);
    
    var ep = new ieMessagingProfile();
    ep.name = msgProfile.name;

    var mAccounts = this.getEmailAccounts(msgProfileId);
    var accounts = new Array();
    for ( var i = 0; i < mAccounts.length; i++ )
    {
      var account = new ieMessagingEmailAccount();
      account.name = mAccounts[i].name;
      if ( mAccounts[i].id == msgProfile.defaultEmailId )
        account.isDefault = true;

      var mFolders = this.getMessageFoldersByAccount(mAccounts[i].id);
      var folders = new Array();
      for ( var j= 0; j < mFolders.length; j++ )
      {
        var folder = new ieMessagingFolder();
        folder.name = mFolders[j].name;
        folder.type = mFolders[j].type;
        folder.messageType = mFolders[j].messageType;
                
        var mMessages = this.getMessagesByFolder(mFolders[j].id);
        var messages = new Array();
        for ( var k = 0; k < mMessages.length; k++ )
        {
          var message = new ieMessagingMessage();
          message.body = mMessages[k].body;
          message.callbackNumber = mMessages[k].callback;
          message.isRead = mMessages[k].isRead;
          message.priority = mMessages[k].priority;
          message.type = mMessages[k].type;
          message.sourceAddress = mMessages[k].sourceAddress;
          message.subject = mMessages[k].subject;
          message.time = mMessages[k].date;
          message.validityPeriodHours = mMessages[k].validity;
          message.toAddresses = mMessages[k].toAddress;
          message.ccAddresses = mMessages[k].ccAddress;
          message.bccAddresses = mMessages[k].bccAddress;            
          messages.push(message);
        }
        folder.messages = messages;
        folders.push(folder);
      }
      account.folders = folders;
      accounts.push(account);
    }
    ep.emailAccounts = accounts;
    
    var export = 
    {
      profile: ep,
      type: "messaging"
    };
    return(export);
  },

  importMessagingProfileObject : function(ip)
  {
    var conn = this.getConnection();

    try
    {
      // start the transaction
      conn.beginTransaction();

      // insert the message profile
      stmt = conn.createStatement("insert into jwe_messaging_profile (id, name) values (null, :name)");
      stmt.params.name = ip.name;

      try
      {
        stmt.executeStep();
      }
      finally 
      {
        stmt.reset();
      }
      
      // get the id of the profile we just added
      var profileId = null;
      stmt = conn.createStatement("select last_insert_rowid() as profileId");
    
      try
      {  
        while ( stmt.step() )
          profileId = stmt.row.profileId;
      }
      finally 
      {
        stmt.reset();
      }

      // insert the accounts
      for ( var i = 0; i < ip.emailAccounts.length; i++ )
      {
        stmt = conn.createStatement("insert into jwe_msg_email_account (id, msg_profile_id, name) values (null, :msgProfileId, :name)");      
        stmt.params.msgProfileId = profileId;
        stmt.params.name = ip.emailAccounts[i].name;

        try
        {
          stmt.executeStep();
        }
        finally 
        {
          stmt.reset();
        }
        
        // get the id of the profile we just added
        var accountId = null;
        stmt = conn.createStatement("select last_insert_rowid() as accountId");
      
        try
        {  
          while ( stmt.step() )
            accountId = stmt.row.accountId;
        }
        finally 
        {
          stmt.reset();
        }
        
        // add the folders
        for ( var j = 0; j < ip.emailAccounts[i].folders.length; j++ )
        {
          stmt = conn.createStatement("insert into jwe_msg_folder (id, account_id, type, name, messageType) values (null, :accountId, :type, :name, messageType)");      
          stmt.params.accountId = accountId;
          stmt.params.type = ip.emailAccounts[i].folders[j].type;
          stmt.params.name = ip.emailAccounts[i].folders[j].name;
          stmt.params.messageType = ip.emailAccounts[i].folders[j].messageType;

          try
          {
            stmt.executeStep();
          }
          finally 
          {
            stmt.reset();
          }
          
          // get the id of the profile we just added
          var folderId = null;
          stmt = conn.createStatement("select last_insert_rowid() as folderId");
        
          try
          {  
            while ( stmt.step() )
              folderId = stmt.row.folderId;
          }
          finally 
          {
            stmt.reset();
          }
          
          // add the messages
          for ( var k = 0; k < ip.emailAccounts[i].folders[j].messages.length; k++ )
          {
            var message = ip.emailAccounts[i].folders[j].messages[k];
            stmt = conn.createStatement("insert into jwe_msg_message (id, folder_id, body, callback_number, is_read, message_priority, message_type, source_address, subject, time, validity_period_hours, to_addresses, cc_addresses, bcc_addresses) values (null, :folderId, :body, :callback, :isRead, :priority, :type, :source, :subject, :time, :validity, :to, :cc, :bcc)");      
            stmt.params.folderId = folderId;
            stmt.params.body = message.body;
            stmt.params.callback = message.callbackNumber;
            stmt.params.isRead = message.isRead;
            stmt.params.priority = message.priority;
            stmt.params.type = message.type;
            stmt.params.source = message.sourceAddress;
            stmt.params.subject = message.subject;
            stmt.params.time = message.time;
            stmt.params.validity = message.validityPeriodHours;
            stmt.params.to = message.toAddresses;
            stmt.params.cc = message.ccAddresses;
            stmt.params.bcc = message.bccAddresses;

            try
            {
              stmt.executeStep();
            }
            finally 
            {
              stmt.reset();
            }
          }
        }
      }
      
      conn.commitTransaction();
    }
    catch (exception)
    {
      dump(exception);
      conn.rollbackTransaction();
      return(false);
    }

    return(true);
  },

  createNewMessagingProfile : function(name, copyId)
  {
    // get the profile object for the profile to copy
    var copyProfile = this.getExportableMessagingProfile(copyId).profile;

    // change the name
    copyProfile.name = name;

    // add it, will return false if it failed
    return(this.importMessagingProfileObject(copyProfile));
  },

  deleteMessagingProfile : function(profileId)
  {
    var conn = this.getConnection();
    try
    {
      var stmt = conn.createStatement("delete from jwe_messaging_profile where id = :profileId");
      stmt.params.profileId = profileId;

      try
      {
        stmt.executeStep();
      }
      finally 
      {
        stmt.reset();
      }
    }
    catch (exception)
    {
      dump(exception);
      return(false);
    }

    return(true);
  },
  
  exportPIMProfile : function(pimProfileId)
  {
    return(JSON.stringify(this.getExportablePIMProfile(pimProfileId)));
  },

  getExportablePIMProfile : function(pimProfileId)
  {
    var pimProfile = this.getPIMProfile(pimProfileId);

    var ep = new iePIMProfile();
    ep.name = pimProfile.name;

    var pCalItems = this.getCalendarItems(pimProfileId);
    var calItems = new Array();
    for ( var i = 0; i < pCalItems.length; i++ )
    {
      var calItem = new iePIMCalendarItem();
      calItem.alarmDate = pCalItems[i].alarmDatetime;
      calItem.alarmed = pCalItems[i].alarmFlag;
      calItem.endTime = pCalItems[i].endDatetime;
      calItem.name = pCalItems[i].name;
      calItem.notes = pCalItems[i].notes;
      calItem.recurrence = pCalItems[i].recurType;
      calItem.startTime = pCalItems[i].startDatetime;
      calItems.push(calItem);
    }
    ep.calendarItems = calItems;

    var pAddressItems = this.getAddressBookItems(pimProfileId);
    var addressItems = new Array();
    for ( var i = 0; i < pAddressItems.length; i++ )
    {
      var addressItem = new iePIMAddressBookItem();
      addressItem.id = pAddressItems[i].id;
      addressItem.address = pAddressItems[i].address;
      addressItem.company = pAddressItems[i].company;
      addressItem.email = pAddressItems[i].email;
      addressItem.fullName = pAddressItems[i].fullName;
      addressItem.homePhone = pAddressItems[i].homePhone;
      addressItem.mobilePhone = pAddressItems[i].mobilePhone;
      addressItem.title = pAddressItems[i].title;
      addressItem.workPhone = pAddressItems[i].workPhone;
      addressItem.ringtone = pAddressItems[i].ringtoneFileUrl;
      
      var pAttributes = this.getAttributesForItem(pAddressItems[i]);
      var attributeValues = new Array();
      for ( var j = 0; j < pAttributes.length; j++ )
      {
        var attributeValue = new iePIMAttributeValue();
        attributeValue.key = pAttributes[j].key;
        attributeValue.value = pAttributes[j].value;
        attributeValues.push(attributeValue);
      }
      addressItem.attributes = attributeValues;
      addressItems.push(addressItem);
    }
    ep.addressBookItems = addressItems;

    var pAttribs = this.getAddressAvailableAttributes(pimProfileId);
    var attribs = new Array();
    for ( var i = 0; i < pAttribs.length; i++ )
    {
      var attrib = new iePIMAttribute();
      attrib.key = pAttribs[i].key;
      attribs.push(attrib);
    }
    ep.attributes = attribs;
 
    var pGroups = this.getAddressBookGroups(pimProfileId);
    var groups = new Array();
    for ( var i = 0; i < pGroups.length; i++ )
    {
      var group = new iePIMAddressBookGroup();
      group.name = pGroups[i].name;
      
      var pMembers = this.getAddressBookItems(pimProfileId, pGroups[i].id, false);
      var memberIds = new Array();
      for ( var j = 0; j < pMembers.length; j++ )
        memberIds.push(pMembers[j].id);
      
      group.addressBookItemIds = memberIds;
      groups.push(group);
    }
    ep.addressBookGroups = groups;

    var export = 
    {
      profile: ep,
      type: "pim"
    };
    return(export);
  },
  
  importPIMProfileObject : function(ip)
  {
    var conn = this.getConnection();

    try
    {
      // start the transaction
      conn.beginTransaction();

      // insert the pim profile
      var stmt = conn.createStatement("insert into jwe_pim_profile (id, name) values (null, :name)");
      stmt.params.name = ip.name;

      try
      {
        stmt.executeStep();
      }
      finally 
      {
        stmt.reset();
      }
      
      // get the id of the profile we just added
      var profileId = null;
      stmt = conn.createStatement("select last_insert_rowid() as profileId");
    
      try
      {  
        while ( stmt.step() )
          profileId = stmt.row.profileId;
      }
      finally 
      {
        stmt.reset();
      }

      // insert the calendar items
      for ( var i = 0; i < ip.calendarItems.length; i++ )
      {
        stmt = conn.createStatement("insert into jwe_pim_calendar_item (id, pim_profile_id, alarm_date, alarmed, event_end_time, event_name, event_notes, event_recurrence, event_start_time) values (null, :pimProfileId, :alarmDate, :alarmed, :endTime, :name, :notes, :recurrence, :startTime)");
        stmt.params.pimProfileId = profileId;
        stmt.params.alarmed = ip.calendarItems[i].alarmed;
        stmt.params.alarmDate = ip.calendarItems[i].alarmDate;        
        stmt.params.endTime = ip.calendarItems[i].endTime;
        stmt.params.name = ip.calendarItems[i].name;
        stmt.params.notes = ip.calendarItems[i].notes;
        stmt.params.recurrence = ip.calendarItems[i].recurrence;
        stmt.params.startTime = ip.calendarItems[i].startTime;
        
        try
        {
          stmt.executeStep();
        }
        finally 
        {
          stmt.reset();
        }
      }
      
      // insert the address book items
      var groupMap = new Array();
      for ( var i = 0; i < ip.addressBookItems.length; i++ )
      {
        stmt = conn.createStatement("insert into jwe_pim_address_book_item (id, pim_profile_id, address, company, email, full_name, home_phone, mobile_phone, title, work_phone, ringtone_file_url) values (null, :pimProfileId, :address, :company, :email, :fullName, :homePhone, :mobilePhone, :title, :workPhone, :ringtone)");
        stmt.params.pimProfileId = profileId;
        stmt.params.address = ip.addressBookItems[i].address;
        stmt.params.company = ip.addressBookItems[i].company;
        stmt.params.email = ip.addressBookItems[i].email;
        stmt.params.fullName = ip.addressBookItems[i].fullName;
        stmt.params.homePhone = ip.addressBookItems[i].homePhone;
        stmt.params.mobilePhone = ip.addressBookItems[i].mobilePhone;
        stmt.params.title = ip.addressBookItems[i].title;
        stmt.params.workPhone = ip.addressBookItems[i].workPhone;
        stmt.params.ringtone = ip.addressBookItems[i].ringtone;
        
        try
        {
          stmt.executeStep();
        }
        finally 
        {
          stmt.reset();
        }
        
        // get the id of the item we just added
        var itemId = null;
        stmt = conn.createStatement("select last_insert_rowid() as itemId");
      
        try
        {  
          while ( stmt.step() )
            itemId = stmt.row.itemId;
        }
        finally 
        {
          stmt.reset();
        }
        
        // add it to the group map so we can reverse lookup and get the correct association
        groupMap[ip.addressBookItems[i].id] = itemId;
        
        // add any attributes
        for ( var j = 0; j < ip.addressBookItems[i].attributes.length; j++ )
        {
          stmt = conn.createStatement("insert into jwe_pim_address_book_item_attribute_value (address_book_item_id, key, value) values (:id, :key, :value)");
          stmt.params.id = itemId;
          stmt.params.key = ip.addressBookItems[i].attributes[j].key;
          stmt.params.value = ip.addressBookItems[i].attributes[j].value;
          
          try
          {
            stmt.executeStep();
          }
          finally 
          {
            stmt.reset();
          }
        }
      }
      
      // insert the address book groups
      for ( var i = 0; i < ip.addressBookGroups.length; i++ )
      {
        stmt = conn.createStatement("insert into jwe_pim_address_book_group (id, pim_profile_id, name) values (null, :pimProfileId, :name)");
        stmt.params.pimProfileId = profileId;
        stmt.params.name = ip.addressBookGroups[i].name;
        
        try
        {
          stmt.executeStep();
        }
        finally 
        {
          stmt.reset();
        }
        
        // get the id of the item we just added
        var groupId = null;
        stmt = conn.createStatement("select last_insert_rowid() as groupId");
      
        try
        {  
          while ( stmt.step() )
            groupId = stmt.row.groupId;
        }
        finally 
        {
          stmt.reset();
        }
        
        // insert all of the members
        for ( var j = 0; j < ip.addressBookGroups[i].addressBookItemIds.length; j++ )
        {
          var newItemId = groupMap[ip.addressBookGroups[i].addressBookItemIds[j]];
          stmt = conn.createStatement("insert into jwe_pim_address_book_item_group_map (address_book_item_id, group_id) values (:itemId, :groupId)");
          stmt.params.itemId = newItemId;
          stmt.params.groupId = groupId;
          
          try
          {
            stmt.executeStep();
          }
          finally 
          {
            stmt.reset();
          }
        }
      }
      
      for ( var i = 0; i < ip.attributes.length; i++ )
      {
        stmt = conn.createStatement("insert into jwe_pim_address_book_item_attribute (id, pim_profile_id, key) values (null, :pimProfileId, :key)");
        stmt.params.pimProfileId = profileId;
        stmt.params.key = ip.attributes[i].key;
        
        try
        {
          stmt.executeStep();
        }
        finally 
        {
          stmt.reset();
        }
      }
      
      conn.commitTransaction();
    }
    catch (exception)
    {
      dump(exception);
      conn.rollbackTransaction();
      return(false);
    }

    return(true);
  },
  
  createNewPIMProfile : function(name, copyId)
  {
    // get the profile object for the profile to copy
    var copyProfile = this.getExportablePIMProfile(copyId).profile;

    // change the name
    copyProfile.name = name;

    // add it, will return false if it failed
    return(this.importPIMProfileObject(copyProfile));
  },

  deletePIMProfile : function(profileId)
  {
    var conn = this.getConnection();
    try
    {
      var stmt = conn.createStatement("delete from jwe_pim_profile where id = :profileId");
      stmt.params.profileId = profileId;

      try
      {
        stmt.executeStep();
      }
      finally 
      {
        stmt.reset();
      }
    }
    catch (exception)
    {
      dump(exception);
      return(false);
    }

    return(true);
  },
  
  getBoolean : function(test)
  {
    if ( test == 1 )
      return(true);
    else if ( test == "true" )
      return(true);
    else
      return(false);
  },
  
  getDate : function(time)
  {
    var newDate = new Date();
    newDate.setTime(time);
    return(newDate);
  },
  
  getConnection : function()
  {
    // check real quick to see if the DB has been checked for an upgrade
    if ( ! this.upgradeChecked )
    {
      UpgradeService.checkUpgrade(this.sqlFile);
      this.upgradeChecked = true;
    }
      
    var storageService = Components.classes["@mozilla.org/storage/service;1"]  
                        .getService(Components.interfaces.mozIStorageService);  
    return(storageService.openDatabase(this.sqlFile));  
  },

  QueryInterface: function(aIID)
  {
    if (!aIID.equals(Components.interfaces.nsIClassInfo) &&
        !aIID.equals(Components.interfaces.nsISupports) ) 
      throw Components.results.NS_ERROR_NO_INTERFACE;
    return this;
  },

  // nsIClassInfo
  flags: Components.interfaces.nsIClassInfo.DOM_OBJECT,

  implementationLanguage: Components.interfaces.nsIProgrammingLanguage.JAVASCRIPT,

  classDescription: CLASS_NAME,
  classID: CLASS_ID,
  contractID: CONTRACT_ID,

  getInterfaces: function(aCount) {
    var aResult = [
      Components.interfaces.nsISupports
      , Components.interfaces.nsIClassInfo
    ];
    aCount.value = aResult.length;
    return aResult;
  },

  getHelperForLanguage: function(count) { return null; },
};

/***********************************************************/

var JILProfileServiceFactory = { //#
  createInstance: function (aOuter, aIID)
  {
    if (aOuter != null)
      throw Components.results.NS_ERROR_NO_AGGREGATION;
    
    if ( service == null )
      return(new JILProfileService()).QueryInterface(aIID);
    else 
      return(service);
  }
};

/***********************************************************/

var JILProfileServiceModule = { //#
  registerSelf: function(aCompMgr, aFileSpec, aLocation, aType)
  {
    aCompMgr = aCompMgr.
        QueryInterface(Components.interfaces.nsIComponentRegistrar);
    aCompMgr.registerFactoryLocation(CLASS_ID, CLASS_NAME, 
        CONTRACT_ID, aFileSpec, aLocation, aType);

    var catman = Components.classes["@mozilla.org/categorymanager;1"].
              getService(Components.interfaces.nsICategoryManager);
    // Register Global Property, make object accessible to any window
    catman.addCategoryEntry(
      "JavaScript global property"
      , "JILProfileService"
      , CONTRACT_ID
      , true
      , true
    );
    catman = null;
    aCompMgr = null;
  },

  unregisterSelf: function(aCompMgr, aLocation, aType)
  {
    var catman = Components.classes["@mozilla.org/categorymanager;1"].
            getService(Components.interfaces.nsICategoryManager);
    catman.deleteCategoryEntry(
      "JavaScript global property"
      , "JILProfileService"
      , true
    );

    aCompMgr = aCompMgr.
        QueryInterface(Components.interfaces.nsIComponentRegistrar);
    aCompMgr.unregisterFactoryLocation(CLASS_ID, aLocation);    

    aCompMgr = null;        
    catman = null;    
  },
  
  getClassObject: function(aCompMgr, aCID, aIID)
  {
    if (!aIID.equals(Components.interfaces.nsIFactory))
      throw Components.results.NS_ERROR_NOT_IMPLEMENTED;

    if (aCID.equals(CLASS_ID))
      return JILProfileServiceFactory; //#

    throw Components.results.NS_ERROR_NO_INTERFACE;
  },

  canUnload: function(aCompMgr) { return true; }
};

/***********************************************************/

function NSGetModule(aCompMgr, aFileSpec) { return JILProfileServiceModule; } //#


/***********************************************************/
/* get rid of these, we dont really need them
/***********************************************************/

function jilDeviceProfile() {} 
jilDeviceProfile.prototype = 
{
  name : null,
  id : null,
  messageProfileId : null,
  pimProfileId : null,
  uuid : null,
  jilAPISpec : null,
};

function jilMessagingProfile() {}
jilMessagingProfile.prototype = 
{
  name : null,
  defaultEmailId: null,
  id : null
};

function jilPIMProfile() {}
jilPIMProfile.prototype = 
{
  name : null,
  id : null
};

function jilEmulatedWidget() {}
jilEmulatedWidget.prototype =
{
  id : null,
  version : null,
  name : null, 
  author : null,
  profileId : null,
  applicationId: null
};

function jilDeviceData() {}
jilDeviceData.prototype =
{
  profileId : null,
  clipboardString : null,
  engineName : null,
  engineProvider : null,
  engineVersion : null,
  fileSystems : null,
  availableApps : null,
  ringtone : null
};

function jilFileSystem() {}
jilFileSystem.prototype =
{
  profileId : null,
  id: null,
  rootPath: null,
  localPath: null,
  size: null,
};

function jilAccountInfo() {}
jilAccountInfo.prototype =
{
  profileId : null,
  phoneMSISDN : null,
  phoneOpName : null,
  userId : null,
  accountBalance : null,
  subscriptionType : null
};

function jilDeviceInfo() {}
jilDeviceInfo.prototype =
{
  profileId : null,
  ownerAddress : null,
  ownerCompany : null,
  ownerEmail : null,
  ownerFullName : null,
  ownerTitle : null,
  ownerHomePhone : null,
  ownerMobilePhone : null,
  ownerWorkPhone : null,
  colorDepth : null,
  firmware : null,
  manufacturer : null,
  model : null,
  os : null,
  screenHeight : null,
  screenWidth : null,
  software : null,
  totalMemory : null
};

function jilDataNetwork() {}
jilDataNetwork.prototype =
{
  profileId : null,
  type : null,
  nickname: null,
  enabled : null
};

function jilDeviceState() {}
jilDeviceState.prototype =
{
  profileId : null,
  audioPath : null,
  availableMemory : null,
  language : null,
  procUtilization : null,
  backLight : null,
  keypadLight : null
};

function jilAccelerometer() {}
jilAccelerometer.prototype =
{
  profileId : null,
  xAxis : null,
  yAxis : null,
  zAxis : null
};

function jilConfig() {}
jilConfig.prototype =
{
  profileId : null,
  messageVolume : null,
  ringtoneVolume : null,
  vibrationOn : null
};

function jilPositionInfo() {}
jilPositionInfo.prototype =
{
  profileId : null,
  cellID : null,
  accuracy : null,
  latitude : null,
  longitude : null,
  altitude : null,
  altitudeAccuracy : null
};

function jilPowerInfo() {}
jilPowerInfo.prototype =
{
  profileId : null,
  isCharging : null,
  percentRemaining : null
};

function jilRadioInfo() {}
jilRadioInfo.prototype =
{
  profileId : null,
  isEnabled : null,
  isRoaming : null,
  signalSource : null,
  signalStrength : null
};

function jilMultimedia() {}
jilMultimedia.prototype =
{
  profileId : null,
  audioPlaying : null,
  videoPlaying : null,
  volume : null
};

function jilCallRecord() {}
jilCallRecord.prototype =
{
  profileId : null,
  id : null,
  address : null,
  name : null,
  type : null,
  durationSeconds : null,
  startTime : null
};

function jilEmailAccount() {}
jilEmailAccount.prototype =
{
  msgProfileId : null,
  id : null,
  name : null,
  isDefault : null
};

function jilMessageFolder() {}
jilMessageFolder.prototype =
{
  msgProfileId : null,
  id : null,
  name : null,
  type : null,
  messageType: null,
  messageCount : null,
  emailAccountId : null
};

function jilMessage() {}
jilMessage.prototype =
{
  msgProfileId : null,
  id : null,
  toAddress : null,
  sourceAddress : null,
  subject : null,
  folderName : null,
  folderId : null,
  ccAddress : null,
  bccAddress : null,
  priority : null,
  isRead : null,
  callback : null,
  date : null,
  validity : null,
  body : null,
  type : null,
  attachments : null,
};

function jilAddressBookItem() {}
jilAddressBookItem.prototype =
{
  pimProfileId : null,
  id : null,
  fullName : null,
  mobilePhone : null,
  email : null,
  address : null,
  company : null,
  homePhone : null,
  workPhone : null,
  title : null,
  attributes: null,
  ringtoneFileUrl: null
};

function jilAddressBookGroup() {}
jilAddressBookGroup.prototype =
{
  pimProfileId : null,
  id : null,
  name : null,
  addressBookItemCount : null
};

function jilCalendarItem() {}
jilCalendarItem.prototype =
{
  pimProfileId : null,
  id : null,
  name : null,
  startDatetime : null,
  endDatetime : null,
  alarmDatetime : null,
  alarmFlag : null,
  recurType : null,
  notes: null,
};

function jilAddressAttribute() {}
jilAddressAttribute.prototype =
{
  pimProfileId : null,
  itemId: null,
  key : null,
  id: null,
  value: null
};

function jilWidgetPreference() {}
jilWidgetPreference.prototype =
{
  profileId : null,
  widgetId : null,
  key : null,
  value : null
};


function jilAPIExtension() {}
jilAPIExtension.prototype =
{
  key : null,
  name : null,
  resourceUrl : null,
};

/** Import/Export objects **/

function ieDeviceProfile() {}
ieDeviceProfile.prototype = 
{
  name: null,
  uuid: null,
  availabelApps: null,
  dataNetworks: null,
  deviceState: null,
  fileSystems: null,
  networkState: null,
  softwareState: null,
  subscriberState: null,
};

function ieFileSystem() {}
ieFileSystem.prototype = 
{
  rootPath: null,
  size: null,
};

function ieAvailableApplication() {}
ieAvailableApplication.prototype = 
{
  type: null,
};

function ieDataNetworkConnection() {}
ieDataNetworkConnection.prototype = 
{
  type: null,
  name: null,
  enabled: null,
  supportsData: null,
  nickname: null
};

function ieDeviceState() {}
ieDeviceState.prototype = 
{
  colorDepth: null,
  firmware: null,
  manufacturer: null,
  model: null,
  screenHeight: null,
  screenWidth: null,
  memory: null,
};

function ieFileSystem() {}
ieFileSystem.prototype = 
{
  rootPath: null
};

function ieNetworkState() {}
ieNetworkState.prototype = 
{
  accuracy: null,
  altitudeAccuracy: null,
};

function ieSoftwareState() {}
ieSoftwareState.prototype = 
{
  availableMemory: null,
  os: null,
  software: null,
  audioPath: null,
  language: null,
  engineName: null,
  engineProvider: null,
  engineVersion: null,
  ringtone: null
};

function ieSubscriberState() {}
ieSubscriberState.prototype = 
{
  operatorName: null,
  userId: null,
  subscriptionType: null,
};


function ieMessagingProfile() {}
ieMessagingProfile.prototype = 
{
  name: null,
  emailAccounts: null,
};

function ieMessagingEmailAccount() {}
ieMessagingEmailAccount.prototype = 
{
  name: null,
  isDefault: null,
  folders: null,
};

function ieMessagingFolder() {}
ieMessagingFolder.prototype = 
{
  name: null,
  type: null,
  messageType : null,
  messages: null,
};

function ieMessagingMessage() {}
ieMessagingFolder.prototype = 
{
  body: null,
  callbackNumber: null,
  isRead: null,
  priority: null,
  type: null,
  sourceAddress: null,
  subject: null,
  time: null,
  validityPeriodHours: null,
  toAddresses: null,
  ccAddresses: null,
  bccAddresses: null,  
  attachments: null,
};

function iePIMProfile() {}
iePIMProfile.prototype = 
{
  name: null,
  calendarItems: null,
  addressBookItems: null,
  addressBookGroups: null,
  attributes: null,
};

function iePIMCalendarItem() {}
iePIMCalendarItem.prototype = 
{
  alarmDate: null,
  alarmed: null,
  endTime: null,
  name: null,
  notes: null,
  recurrence: null,
  startTime: null,
};

function iePIMAddressBookItem() {}
iePIMAddressBookItem.prototype = 
{
  id: null,
  address: null,
  company: null,
  email: null,
  fullName: null,
  homePhone: null,
  mobilePhone: null,
  title: null,
  workPhone: null,
  ringtone: null,
  attributes: null,
};

function iePIMAddressBookGroup() {}
iePIMAddressBookGroup.prototype = 
{
  name: null,
  addressBookItemIds: null,
};

function iePIMAttributeValue() {}
iePIMAttributeValue.prototype = 
{
  key: null,
  value: null,
};

function iePIMAttribute() {}
iePIMAttribute.prototype = 
{
  key: null,
};