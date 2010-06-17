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

  },

  deleteFile : function(destinationFullName)
  {
    this.alert("Device.deleteFile()");
  },

  findFiles : function(matchFile, startInx, endInx)
  {
    this.alert("Device.findFiles()");
  },

  getAvailableApplications : function(count, retv)
  {
    var availApps = this.runtime.getDeviceData().availableApps;
    count.value = availApps.length;

    this.runtime.logAction("Device.getAvailableApplications(): available applications requested and returned "+count.value+" applications.");

    return(availApps);
  },

  getDirectoryFileNames : function(sourceDirectory)
  {
    this.alert("Device.getDirectoryFileNames()");
  },

  getFile : function(fullName)
  {
    return(this.getLocalFile(fullName).jilFile);
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

  launchApplication : function(application, startParameter)
  {
    this.runtime.logAction("Device.launchApplication(): simulated launch of application "+application+" with start parameters: "+startParameter);

    this.alert("Device.launchApplication(): simulated launch of application: "+application+", with start parameters: "+startParameter);
  },

  moveFile : function(originalFile, destinationFullName)
  {
    this.alert("Device.launchApplication()");
  },

  setRingtone : function(ringtoneFileUrl, addressBookItem)
  {
    var pContact = convertJILToContact(addressBookItem);
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
  
  convertToJILFile : function(localFile, jilPath)
  {
    var jilFile = Components.classes["@jil.org/jilapi-file;1"].createInstance(Components.interfaces.jilFile);

    var fileName = jilPath.substr(jilPath.lastIndexOf("/")+1, jilPath.length);
    var filePath = jilPath.substr(0, jilPath.lastIndexOf("/"));

    jilFile.lastModifyDate = localFile.lastModifiedTime;
    jilFile.fileSize = localFile.fileSize;
    jilFile.createDate = localFile.lastModifiedTime;
    jilFile.fileName = fileName;
    jilFile.filePath = filePath;
    jilFile.isDirectory = localFile.isDirectory();

    return(jilFile);
  },
  
  getLocalFile : function(fileName)
  {
    // create a map with the virtual root as the key and local root as the value
    var fsys = this.runtime.getDeviceData().fileSystems;
    var fsysMap = new Array();
    for ( var i = 0; i < fsys.length; i++ )
      fsysMap[fsys[i].rootPath] = fsys[i].localPath;
    
    // find the filesystem this file is supposed to be on by finding the 
    // longest root path that is still a substring of the full file path
    var candidate = null;
    var score = 0;
    for ( var root in fsysMap )
    {
      if ( (fileName.indexOf(root) > -1) && (root.length > score) )
      {
        score = root.length;
        candidate = root;
      }
    }
    
    // remove the root path from the full file path to get the relative path
    // for the local file
    var relativePath = fileName.substr(score, fileName.length);
    
    // the real path to the mapped drive 
    var realPath = fsysMap[candidate]+relativePath;
    
    var localFile = Components.classes["@mozilla.org/file/local;1"].createInstance(Components.interfaces.nsILocalFile);  
    localFile.initWithPath(realPath);
    
    var jilFile = this.convertToJILFile(localFile, fileName);

    var vFile = new VirtualFile();
    vFile.mozFile = localFile;
    vFile.jilFile = jilFile;
    vFile.localFullPath = realPath;
    vFile.jilFullPath = fileName;
    
    return(vFile);
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


function VirtualFile() {}
VirtualFile.prototype =
{
  mozFile : null,
  jilFile : null,
  localFullPath: null,
  jilFullPath : null,
};


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