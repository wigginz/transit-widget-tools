const INTERFACE = Components.interfaces.jilDevice; //#
const CLASS_ID = Components.ID("0b523a10-bac7-11de-8a39-0800200c9a66"); //#
const CLASS_NAME = "JIL API Device"; //#
const CONTRACT_ID = "@jil.org/jilapi-device;1"; //#

/***********************************************************/

var service = null;

function JILDevice() //#
{
  this.DeviceInfo  = Components.classes["@jil.org/jilapi-deviceinfo;1"].createInstance(Components.interfaces.jilDeviceInfo);
  //this.File  = Components.classes["@jil.org/jilapi-file;1"].createInstance(Components.interfaces.jilFile);
  this.DataNetworkInfo  = Components.classes["@jil.org/jilapi-datanetworkinfo;1"].createInstance(Components.interfaces.jilDataNetworkInfo);
  this.DeviceStateInfo  = Components.classes["@jil.org/jilapi-devicestateinfo;1"].createInstance(Components.interfaces.jilDeviceStateInfo);
  this.File  = Components.classes["@jil.org/jilapi-file;1"].createInstance(Components.interfaces.jilFile);
  this.AccountInfo  = Components.classes["@jil.org/jilapi-accountinfo;1"].createInstance(Components.interfaces.jilAccountInfo);
  this.ApplicationTypes  = Components.classes["@jil.org/jilapi-applicationtypes;1"].createInstance(Components.interfaces.jilApplicationTypes);
  this.RadioInfo  = Components.classes["@jil.org/jilapi-radioinfo;1"].createInstance(Components.interfaces.jilRadioInfo);
  this.PowerInfo  = Components.classes["@jil.org/jilapi-powerinfo;1"].createInstance(Components.interfaces.jilPowerInfo);
  this.PositionInfo  = Components.classes["@jil.org/jilapi-positioninfo;1"].createInstance(Components.interfaces.jilPositionInfo);

  this.runtime = Components.classes["@jil.org/jilapi-emulatorruntime;1"].getService().wrappedJSObject;

  this.reload();
  
  service = this;
}

/***********************************************************/

JILDevice.prototype = //#
{
  DeviceInfo           : null,
  File                 : null,
  DataNetworkInfo      : null,
  DeviceStateInfo      : null,
  AccountInfo          : null,
  ApplicationTypes     : null,
  RadioInfo            : null,
  PowerInfo            : null,
  PositionInfo         : null,

  onFilesFound         : null,

  clipboardString      : null,
  widgetEngineName     : null,
  widgetEngineProvider : null,
  widgetEngineVersion  : null,

  runtime : null,
  
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
    var files = this.runtime.getRecursiveFileList(this.runtime.getLocalFile("/app").mozFile);
    this.alert(files.length);
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
  
  reload : function()
  {
    var deviceData = this.runtime.getDeviceData();
    
    this.clipboardString = deviceData.clipboardString;
    this.widgetEngineName = deviceData.engineName;
    this.widgetEngineProvider = deviceData.engineProvider;
    this.widgetEngineVersion = deviceData.engineVersion;
    
    this.onFilesFound = null;
  },

  alert: function(aMsg){
    var promptService = 
      Components.classes["@mozilla.org/embedcomp/prompt-service;1"]
        .getService(Components.interfaces.nsIPromptService);
    promptService.alert(null, "JIL Debug", aMsg);
    promptService = null; 
  },

  QueryInterface: function(aIID)
  {
    if (!aIID.equals(INTERFACE) &&    
        !aIID.equals(Components.interfaces.nsIClassInfo) &&
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
      INTERFACE
      , Components.interfaces.nsIClassInfo
    ];
    aCount.value = aResult.length;
    return aResult;
  },

  getHelperForLanguage: function(count) { return null; },
};

/***********************************************************/

var JILDeviceFactory = { //#
  createInstance: function (aOuter, aIID)
  {
    if (aOuter != null)
      throw Components.results.NS_ERROR_NO_AGGREGATION;
    
    if ( service == null )
      return(new JILDevice()).QueryInterface(aIID);
    else 
      return(service);
  }
};

/***********************************************************/

var JILDeviceModule = { //#
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
      , "_Device_122a"
      , CONTRACT_ID
      , true
      , false
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
      , "_Device_122a"
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
      return JILDeviceFactory; //#

    throw Components.results.NS_ERROR_NO_INTERFACE;
  },

  canUnload: function(aCompMgr) { return true; }
};

/***********************************************************/

function NSGetModule(aCompMgr, aFileSpec) { return JILDeviceModule; } //#


// Utility function, dump an object by reflexion up to niv level
function jwe_dumpall(name,obj,niv) {
  if (!niv) niv=1;
    var dumpdict=new Object();
  
  dump ("\n\n-------------------------------------------------------\n");
  dump ("Dump of the objet: " + name + " (" + niv + " levels)\n");
  dump ("Address: " + obj + "\n");
  dump ("Interfaces: ");
  for (var i in Components.interfaces) {
    try {
      obj.QueryInterface(Components.interfaces[i]);
      dump(""+Components.interfaces[i]+", ");
    } catch (ex) {}
  }
    dump("\n");
    _jwe_dumpall(dumpdict,obj,niv,"","");
    dump ("\n\n-------------------------------------------------------\n\n");
    
    for (i in dumpdict) {
      delete dumpdict[i];
    }
}
function _jwe_dumpall(dumpdict,obj,niv,tab,path) {
  
  if (obj in dumpdict) {
    dump(" (Already dumped)");
  } else {
    dumpdict[obj]=1;
    
    var i,r,str,typ;
    for (i in obj) {
      try {
        str = String(obj[i]).replace(/\n/g,"\n"+tab);
      } catch (ex) {
        str = String(ex);
      }
            try {
              typ = ""+typeof(obj[i]);
            } catch (ex) {
              typ = "unknown";
            }
                  dump ("\n" + tab + i + " (" + typ + (path?", " + path:"") +"): " + str);
                  if ((niv>1) && (typ=="object")) {
                    _jwe_dumpall(dumpdict,obj[i],niv-1,tab+"\t",(path?path+"->"+i:i));
                  }
    }
  }
}