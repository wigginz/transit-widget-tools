var EXPORTED_SYMBOLS = ["Device"];

var Device =
{
  DeviceInfo           : Components.classes["@jil.org/jilapi-deviceinfo;1"].createInstance(Components.interfaces.jilDeviceInfo),
  File                 : Components.classes["@jil.org/jilapi-file;1"].createInstance(Components.interfaces.jilFile),
  DataNetworkInfo      : Components.classes["@jil.org/jilapi-datanetworkinfo;1"].createInstance(Components.interfaces.jilDataNetworkInfo),
  DeviceStateInfo      : Components.classes["@jil.org/jilapi-devicestateinfo;1"].createInstance(Components.interfaces.jilDeviceStateInfo),
  AccountInfo          : Components.classes["@jil.org/jilapi-accountinfo;1"].createInstance(Components.interfaces.jilAccountInfo),
  ApplicationTypes     : Components.classes["@jil.org/jilapi-applicationtypes;1"].createInstance(Components.interfaces.jilApplicationTypes),
  RadioInfo            : Components.classes["@jil.org/jilapi-radioinfo;1"].createInstance(Components.interfaces.jilRadioInfo),
  PowerInfo            : Components.classes["@jil.org/jilapi-powerinfo;1"].createInstance(Components.interfaces.jilPowerInfo),
  PositionInfo         : Components.classes["@jil.org/jilapi-positioninfo;1"].createInstance(Components.interfaces.jilPositionInfo),

  onFilesFound         : null,

  clipboardString      : null,
  widgetEngineName     : null,
  widgetEngineProvider : null,
  widgetEngineVersion  : null,

  runtime : Components.classes["@jil.org/jilapi-emulatorruntime;1"].getService().wrappedJSObject,
  
  fileCache : null,

  copyFile : function(originalFile, destinationFullName)
  {
    if ( this.runtime.copyFile(originalFile, destinationFullName, false) )
    {
       this.runtime.logAction("Device.copyFile(): successfully copied file "+originalFile+" to "+destinationFullName);
      return(true);
    }
    else
    {
      this.runtime.logAction("Device.copyFile(): failed to copy file "+originalFile+" to "+destinationFullName);
      return(false);
    }
  },

  deleteFile : function(destinationFullName)
  {
    if ( this.runtime.deleteFile(destinationFullName) )
    {
       this.runtime.logAction("Device.deleteFile(): successfully deleted file or directory  "+destinationFullName);
      return(true);
    }
    else
    {
      this.runtime.logAction("Device.deleteFile(): failed to delete file or directory "+destinationFullName);
      return(false);
    }
  },

  findFiles : function(matchFile, startInx, endInx)
  {
    var tm = Components.classes["@mozilla.org/thread-manager;1"].getService(Components.interfaces.nsIThreadManager);

    tm.mainThread.dispatch(
    {
      run: function()
      {
        var fsys = service.runtime.getDeviceData().fileSystems;

        var allFiles = new Array();
        for ( var i = 0; i < fsys.length; i++ )
          allFiles = allFiles.concat(service.runtime.getRecursiveFileList(service.runtime.getLocalFile(fsys[i].rootPath).mozFile));
        
        // now search 'em
        var results = new Array();
        for ( var i = 0; i < allFiles.length; i++ )
        {
          var toTest = service.escapeString(matchFile.fileName);
          toTest = toTest.replace("*", ".*");
          if ( allFiles[i].search(toTest) > -1 )
            results.push(allFiles[i]);
        }
        
        service.runtime.logAction("Device.findFiles(): found "+results.length+" files from search");
            
        if ( service.onFilesFound == null )
          Components.classes["@jil.org/jilapi-emulatorruntime;1"].getService().wrappedJSObject.logAction("Device.findFiles(): No callback function set, no where to send results.");
        else
        {
          var count = {value: results.length};
          service.onFilesFound.invoke(results, results.length);
        }
      }
    }, Components.interfaces.nsIThread.DISPATCH_NORMAL);
  },
  
  escapeString : function(toEscape)
  {
    //escape all but *
    return toEscape.replace(REGEXP_SPECIALS, "\\$&");
  },

  getAvailableApplications : function(count, retv)
  {
    var availApps = this.runtime.getDeviceData().availableApps;
    count.value = availApps.length;

    this.runtime.logAction("Device.getAvailableApplications(): available applications requested and returned "+count.value+" applications.");

    return(availApps);
  },

  getDirectoryFileNames : function(sourceDirectory, count, retv)
  {
    var fileList = this.runtime.getDirectoryFileNames(sourceDirectory);
    
    count.value = fileList.length;
    
    this.runtime.logAction("Device.getDirectoryFileNames(): found "+count.value+" files and/or sub-directories for directory "+sourceDirectory);
    
    return(fileList);
  },

  getFile : function(fullName)
  {
    return(this.runtime.getLocalFile(fullName).jilFile);
  },

  getFileSystemRoots : function(count, retv)
  {
    var fsys = this.runtime.getDeviceData().fileSystems;
    count.value = fsys.length;

    var rootPaths = new Array();
    for ( var i = 0; i < fsys.length; i++ )
      rootPaths.push(fsys[i].rootPath);

    this.runtime.logAction("Device.getFileSystemRoots(): file system requested and returned "+count.value+" root paths.");

    return(rootPaths);
  },
  
  getFileSystemSize : function(fileSystemRoot)
  {
    // meh, not in the mood to write a new runtime method
    var fsys = this.runtime.getDeviceData().fileSystems;

    var size = 0;
    for ( var i = 0; i < fsys.length; i++ )
    {
      if ( fsys[i].rootPath == fileSystemRoot )
        size = fsys[i].size;
    }
    
    return(size);
  },

  launchApplication : function(application, startParameter)
  {
    this.runtime.logAction("Device.launchApplication(): simulated launch of application "+application+" with start parameters: "+startParameter);

    this.alert("Device.launchApplication(): simulated launch of application: "+application+", with start parameters: "+startParameter);
  },

  moveFile : function(originalFile, destinationFullName)
  {
    if ( this.runtime.copyFile(originalFile, destinationFullName, true) )
    {
       this.runtime.logAction("Device.moveFile(): successfully moved file "+originalFile+" to "+destinationFullName);
      return(true);
    }
    else
    {
      this.runtime.logAction("Device.moveFile(): failed to move file "+originalFile+" to "+destinationFullName);
      return(false);
    }
  },

  setRingtone : function(ringtoneFileUrl, addressBookItem)
  {
    var pContact = this.convertJILToContact(addressBookItem);
    pContact.ringtoneFileUrl = ringtoneFileUrl;
    
    this.runtime.updateAddressBookItem(pContact);

    this.runtime.logAction("Device.setRingtone(): updated address book item Id: "+addressBookItem.addressBookItemId+" to ringtone: "+ringtoneFileUrl);
  },

  vibrate : function(durationSeconds)
  {
    this.alert("Simulating device vibration for "+durationSeconds+" seconds.");
    this.runtime.logAction("Device.vibrate(): simulating device vibration for "+durationSeconds+" seconds.");
  },
  
  convertJILToContact : function(jilContact)
  {
    var profileContact = 
    {
      id: jilContact.addressBookItemId,
      address: jilContact.address,
      company: jilContact.company,
      email: jilContact.eMail,
      fullName: jilContact.fullName,
      homePhone: jilContact.homePhone,
      mobilePhone: jilContact.mobilePhone,
      title: jilContact.title,
      workPhone: jilContact.workPhone,
      ringtoneFileUrl: jilContact.ringtone,
      attributes: jilContact.attributes,
    };
    return(profileContact);
  },
  
  getNewFile : function()
  {
    return(Components.classes["@jil.org/jilapi-file;1"].createInstance(Components.interfaces.jilFile));
  },
  
  constructor : function()
  {
    alert("in constructor");
    var deviceData = this.runtime.getDeviceData();
    
    this.clipboardString = deviceData.clipboardString;
    this.widgetEngineName = deviceData.engineName;
    this.widgetEngineProvider = deviceData.engineProvider;
    this.widgetEngineVersion = deviceData.engineVersion;
    
    this.onFilesFound = null;
  },
};