const INTERFACE = Components.interfaces.jilAddressBookItem; //#
const CLASS_ID = Components.ID("bc546390-bace-11de-8a39-0800200c9a66"); //#
const CLASS_NAME = "JIL API AddressBookItem"; //#
const CONTRACT_ID = "@jil.org/jilapi-addressbookitem;1"; //#

/***********************************************************/

function JILAddressBookItem() //#
{
  Components.utils.import("resource://transit-emulator/TransitCommon.jsm");
  
  this.runtime = Components.classes["@jil.org/jilapi-emulatorruntime;1"].getService().wrappedJSObject;
}

/***********************************************************/

JILAddressBookItem.prototype = //#
{
  address : null,
  addressBookItemId : null,
  company : null,
  eMail : null,
  fullName : null,
  homePhone : null,
  mobilePhone : null,
  title : null,
  workPhone : null,
  ringtone : null,
  attributes : new Array(),
  
  runtime : null,

  getAddressGroupNames : function(count, retv)
  {
    var names = this.runtime.getGroupNamesForAddressBookItem(this.addressBookItemId);
    
    count.value = names.length;
    
    return(names);
  },

  getAttributeValue : function(attribute)
  {
    return(this.attributes[attribute]);
  },

  getAvailableAttributes : function(count, retv)
  {
    var attribs = this.runtime.getAddressAvailableAttributes();
    count.value = attribs.length;
    
    var availAttribs = new Array();
    for ( var i = 0; i < attribs.length; i++ )
      availAttribs.push(attribs[i].key);
    
    this.runtime.logAction("AddressBookItem.getAvailableAttributes(): returned a list of all "+count.value+" attributes available for address book items.");
    
    return(availAttribs);
  },

  setAddressGroupNames : function(groups, count)
  {
    for ( var i = 0; i < groups.length; i++ )
    {
      var addSuccess = this.runtime.addAddressBookItemToGroup(this.addressBookItemId, groups[i]);
      
      if ( addSuccess == false )
        this.runtime.logAction("AddressBookItem.setAddressGroupNames(): address book item id: "+this.addressBookItemId+" already in group: "+groups[i]+", or group does not exist. Nothing to do. "); 
      else
        this.runtime.logAction("AddressBookItem.setAddressGroupNames(): put address book item id: "+this.addressBookItemId+" into group: "+groups[i]); 
    }
  },

  setAttributeValue : function(attribute, value)
  {
    this.attributes[attribute] = value;
  },

  update : function()
  {
    var profileContact = TransitCommon.convertJILToContact(this);
    
    this.runtime.updateAddressBookItem(profileContact);
    
    this.runtime.logAction("AddressBookItem.update(): updated address book item."); 
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

var JILAddressBookItemFactory = { //#
  createInstance: function (aOuter, aIID)
  {
    if (aOuter != null)
      throw Components.results.NS_ERROR_NO_AGGREGATION;
    return (new JILAddressBookItem()).QueryInterface(aIID); //#
  }
};

/***********************************************************/

var JILAddressBookItemModule = { //#
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
      , "_AddressBookItem_122a"
      , CONTRACT_ID
      , true
      , false
    );
  },

  unregisterSelf: function(aCompMgr, aLocation, aType)
  {
    var catman = Components.classes["@mozilla.org/categorymanager;1"].
            getService(Components.interfaces.nsICategoryManager);
    catman.deleteCategoryEntry(
      "JavaScript global property"
      , "_AddressBookItem_122a"
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
      return JILAddressBookItemFactory; //#

    throw Components.results.NS_ERROR_NO_INTERFACE;
  },

  canUnload: function(aCompMgr) { return true; }
};

/***********************************************************/

function NSGetModule(aCompMgr, aFileSpec) { return JILAddressBookItemModule; } //#