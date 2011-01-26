const INTERFACE = Components.interfaces.jilDeviceInfo; //#
const CLASS_ID = Components.ID("a5361d70-bace-11de-8a39-0800200c9a66"); //#
const CLASS_NAME = "JIL API DeviceInfo"; //#
const CONTRACT_ID = "@jil.org/jilapi-deviceinfo;1"; //#

/***********************************************************/

var service = null;

function JILDeviceInfo() //#
{
  this.runtime = Components.classes['@jil.org/jilapi-emulatorruntime;1'].getService().wrappedJSObject;

  this.reload();
  
  service = this;
}

/***********************************************************/

JILDeviceInfo.prototype = //#
{
  ownerInfo : null,
  phoneColorDepthDefault : null,
  phoneFirmware : null,
  phoneManufacturer : null,
  phoneModel : null,
  phoneOS : null,
  phoneScreenHeightDefault : null,
  phoneScreenWidthDefault : null,
  phoneSoftware : null,
  totalMemory : null,
  
  getOwnerInfo : function()
  {
    return(this.ownerInfo);
  },
  
  reload : function()
  {
    var deviceInfo = this.runtime.getDeviceInfo();
    
    this.phoneColorDepthDefault = deviceInfo.colorDepth;
    this.phoneFirmware = deviceInfo.firmware;
    this.phoneManufacturer = deviceInfo.manufacturer;
    this.phoneModel = deviceInfo.model;
    this.phoneOS = deviceInfo.os;
    this.phoneScreenHeightDefault = deviceInfo.screenHeight;
    this.phoneScreenWidthDefault = deviceInfo.screenWidth;
    this.phoneSoftware = deviceInfo.software;
    this.totalMemory = deviceInfo.totalMemory;
    
    this.ownerInfo = Components.classes["@jil.org/jilapi-addressbookitem;1"].createInstance(Components.interfaces.jilAddressBookItem);
    this.ownerInfo.address = deviceInfo.ownerAddress;
    this.ownerInfo.addressBookItemId = "owner";
    this.ownerInfo.company = deviceInfo.ownerCompany;
    this.ownerInfo.eMail = deviceInfo.ownerEmail;
    this.ownerInfo.fullName = deviceInfo.ownerFullName;
    this.ownerInfo.homePhone = deviceInfo.ownerHomePhone;
    this.ownerInfo.mobilePhone = deviceInfo.ownerMobilePhone;
    this.ownerInfo.title = deviceInfo.ownerTitle;
    this.ownerInfo.workPhone = deviceInfo.ownerWorkPhone;
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

var JILDeviceInfoFactory = { //#
  createInstance: function (aOuter, aIID)
  {
    if (aOuter != null)
      throw Components.results.NS_ERROR_NO_AGGREGATION;
    
    if ( service == null )
      return(new JILDeviceInfo()).QueryInterface(aIID);
    else 
      return(service);
  }
};

/***********************************************************/

var JILDeviceInfoModule = { //#
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
      , "_DeviceInfo_122a"
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
      , "_DeviceInfo_122a"
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
      return JILDeviceInfoFactory; //#

    throw Components.results.NS_ERROR_NO_INTERFACE;
  },

  canUnload: function(aCompMgr) { return true; }
};

/***********************************************************/

function NSGetModule(aCompMgr, aFileSpec) { return JILDeviceInfoModule; } //#