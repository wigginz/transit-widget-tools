const INTERFACE = Components.interfaces.jilPIM; //#
const CLASS_ID = Components.ID("a6793ed0-bb5d-11de-8a39-0800200c9a66"); //#
const CLASS_NAME = "JIL API PIM"; //#
const CONTRACT_ID = "@jil.org/jilapi-pim;1"; //#

/***********************************************************/

var service = null;

function JILPIM() //#
{
  this.AddressBookItem  = Components.classes["@jil.org/jilapi-addressbookitem;1"].createInstance(Components.interfaces.jilAddressBookItem);
  this.EventRecurrenceTypes  = Components.classes["@jil.org/jilapi-eventrecurrencetypes;1"].createInstance(Components.interfaces.jilEventRecurrenceTypes);
  this.CalendarItem  = Components.classes["@jil.org/jilapi-calendaritem;1"].createInstance(Components.interfaces.jilCalendarItem);
  
  this.runtime = Components.classes['@jil.org/jilapi-emulatorruntime;1'].getService().wrappedJSObject;
  
  service = this;
}

/***********************************************************/

JILPIM.prototype = //#
{
  AddressBookItem : null,
  EventRecurrenceTypes : null,
  CalendarItem : null,

  onAddressBookItemsFound : null,
  onCalendarItemAlert : null,
  onCalendarItemsFound : null,
  onVCardExportingFinish : null,
  
  runtime : null,

  addAddressBookItem : function(contact)
  {
    var profileContact = this.convertJILToContact(contact);
    this.runtime.addAddressBookItem(profileContact);
  },

  addCalendarItem : function(item)
  {
    var profileItem = this.convertJILToCalendar(item);
    
    this.runtime.addCalendarItem(profileItem);
    
    this.runtime.logAction("PIM.addCalendarItem(): added new calendar item for event: "+item.eventName);
  },

  createAddressBookGroup : function(groupName)
  {
    this.runtime.addAddressBookGroup(groupName);
  },

  createAddressBookItem : function()
  {
    return(Components.classes["@jil.org/jilapi-addressbookitem;1"].createInstance(Components.interfaces.jilAddressBookItem));
  },
  
  getNewCalendarItem : function()
  {
    return(Components.classes["@jil.org/jilapi-calendaritem;1"].createInstance(Components.interfaces.jilCalendarItem));
  },

  deleteAddressBookGroup : function(groupName)
  {
    this.runtime.deleteAddressBookGroup(groupName);
    
    this.runtime.logAction("PIM.deleteAddressBookGroup(): deleted address book group: "+groupName);
  },

  deleteAddressBookItem : function(id)
  {
    this.runtime.deleteAddressBookItem(id);
    
    this.runtime.logAction("PIM.deleteAddressBookItem(): deleted address book item: "+id);
  },

  deleteCalendarItem : function(calendarId)
  {
    this.runtime.deleteCalendarItem(calendarId);
    
    this.runtime.logAction("PIM.deleteCalendarItem(): deleted calendar item: "+calendarId);
  },

  exportAsVCard : function(addressBookItems, count)
  {
    throw Exception(Components.classes["@jil.org/jilapi-exceptiontypes;1"].createInstance(Components.interfaces.jilExceptionTypes).UNSUPPORTED);
//     // get the thread manager and tell it to use the callback 
//     var tm = Components.classes["@mozilla.org/thread-manager;1"].getService(Components.interfaces.nsIThreadManager);
// 
//     tm.mainThread.dispatch(
//     {
//       run: function()
//       {
//                 
//       }
//     }, Components.interfaces.nsIThread.DISPATCH_NORMAL);    
  },

  findAddressBookItems : function(comparisonContact, startInx, endInx)
  {
    // get the thread manager and tell it to use the callback 
    var tm = Components.classes["@mozilla.org/thread-manager;1"].getService(Components.interfaces.nsIThreadManager);

    tm.mainThread.dispatch(
    {
      run: function()
      {
        var rtContacts = Components.classes["@jil.org/jilapi-emulatorruntime;1"].getService().wrappedJSObject.findAddressBookItems(comparisonContact, startInx, endInx);
        
        var jilContacts = new Array();
        for ( var i = 0; i < rtContacts.length; i++ )
          jilContacts.push(service.convertContactToJIL(rtContacts[i]));

        if ( service.onAddressBookItemsFound == null )
          Components.classes["@jil.org/jilapi-emulatorruntime;1"].getService().wrappedJSObject.logAction("PIM.findAddressBookItems(): No callback function set, no where to send results.");
        else
        {
          var count = {value: jilContacts.length};
          service.onAddressBookItemsFound.invoke(jilContacts, jilContacts.length);
        }
      }
    }, Components.interfaces.nsIThread.DISPATCH_NORMAL);    
  },

  findCalendarItems : function(itemToMatch, startInx, endInx)
  {
    // get the thread manager and tell it to use the callback 
    var tm = Components.classes["@mozilla.org/thread-manager;1"].getService(Components.interfaces.nsIThreadManager);

    tm.mainThread.dispatch(
    {
      run: function()
      {
        var rtItems = Components.classes["@jil.org/jilapi-emulatorruntime;1"].getService().wrappedJSObject.findCalendarItems(itemToMatch, startInx, endInx);
        
        var jilItems = new Array();
        for ( var i = 0; i < rtItems.length; i++ )
          jilItems.push(service.convertCalendarToJIL(rtItems[i]));
        
        if ( service.onCalendarItemsFound == null )
          Components.classes["@jil.org/jilapi-emulatorruntime;1"].getService().wrappedJSObject.logAction("PIM.findCalendarItems(): No callback function set, no where to send results.");
        else
        {
          var count = {value: jilItems.length};
          service.onCalendarItemsFound.invoke(jilItems, jilItems.length);
        }
      }
    }, Components.interfaces.nsIThread.DISPATCH_NORMAL);    
  },

  getAddressBookGroupMembers : function(groupName, count, retv)
  {
    var profileContacts = this.runtime.getAddressBookGroupMembers(groupName);
    
    var jilContacts = new Array();
    for ( var i = 0; i < profileContacts.length; i++ )
      jilContacts.push(this.convertContactToJIL(profileContacts[i]));
    
    count.value = jilContacts.length;
    return(jilContacts);
  },

  getAddressBookItem : function(id)
  {
    var profileContact = this.runtime.getAddressBookItem(id);    
    var jilContact = service.convertContactToJIL(profileContact);
    
    this.runtime.logAction("PIM.getAddressBookItem(): Retrieved address book item id: "+jilContact.addressBookItemId);
    
    return(jilContact);
  },

  getAddressBookItemsCount : function()
  {
    var count = this.runtime.getAddressBookItemsCount();
    
    this.runtime.logAction("PIM.getAddressBookItemsCount(): Retrieved address book item count of: "+count);
    
    return(count);
  },

  getAvailableAddressGroupNames : function(count, retv)
  {
    var names = this.runtime.getAddressBookGroupNames();
    count.value = names.length;

    this.runtime.logAction("PIM.getAvailableAddressGroupNames(): retrieved "+names.legnth+" available address group names");

    return(names);
  },

  getCalendarItem : function(calendarId)
  {
    var profileItem = this.runtime.getCalendarItem(calendarId);    
    var jilItem = service.convertCalendarToJIL(profileItem);
    
    this.runtime.logAction("PIM.getCalendarItem(): Retrieved calendar item id: "+jilItem.calendarItemId);
    
    return(jilItem);
  },

  getCalendarItems : function(startTime, endTime, count, retv)
  {
    var profileItems = this.runtime.getCalendarItemsStartingBetween(startTime, endTime);
    
    // convert them
    var jilItems = new Array();
    for ( var i = 0; i < profileItems.length; i++ )
      jilItems.push(this.convertCalendarToJIL(profileItems[i]));
    
    count.value = jilItems.length;
    
    this.runtime.logAction("PIM.getCalendarItems(): retrieved "+jilItems.legnth+" calendar items from start "+startTime+" and end "+endTime);
    
    return(jilItems);
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
  
  convertContactToJIL : function(contact)
  {
    var jilAddressBookItem = Components.classes["@jil.org/jilapi-addressbookitem;1"].createInstance(Components.interfaces.jilAddressBookItem);
    jilAddressBookItem.addressBookItemId = contact.id;
    jilAddressBookItem.address = contact.address;
    jilAddressBookItem.company = contact.company;
    jilAddressBookItem.eMail = contact.email;
    jilAddressBookItem.fullName = contact.fullName;
    jilAddressBookItem.homePhone = contact.homePhone;
    jilAddressBookItem.mobilePhone = contact.mobilePhone;
    jilAddressBookItem.title = contact.title;
    jilAddressBookItem.workPhone = contact.workPhone;
    jilAddressBookItem.ringtone = contact.ringtoneFileUrl;
    
    for ( var i in contact.attributes )
      jilAddressBookItem.setAttribute(i, contact.attributes[i]);
    
    return(jilAddressBookItem);
  },
  
  convertJILToCalendar : function(jilItem)
  {
    var item = 
    {
      alarmDatetime: jilItem.alarmDate,
      alarmFlag: jilItem.alarmed,
      id: jilItem.calendarItemId,
      endDatetime: jilItem.eventEndTime,
      name: jilItem.eventName,
      notes: jilItem.eventNotes,
      recurType: jilItem.eventRecurrence,
      startDatetime: jilItem.eventStartTime,
    }; 
    return(item);
  },
  
  convertCalendarToJIL : function(item)
  {
    var jilItem = Components.classes["@jil.org/jilapi-calendaritem;1"].createInstance(Components.interfaces.jilCalendarItem);    
    jilItem.alarmDate = item.alarmDatetime;
    jilItem.alarmed = item.alarmFlag;
    jilItem.calendarItemId = item.id;
    jilItem.eventEndTime = item.endDatetime;
    jilItem.eventName = item.name;
    jilItem.eventNotes = item.notes;
    jilItem.eventRecurrence = item.recurType;
    jilItem.eventStartTime = item.startDatetime;    
    return(jilItem);
  },
  
  convertJILtoVCard : function(jilContact)
  {
//     BEGIN:VCARD
//     VERSION:3.0
//     N:
//     ORG:
//     TITLE:
//     TEL;TYPE=WORK,VOICE:
//     TEL;TYPE=HOME,VOICE:
//     TEL;TYPE=MOBILE,VOICE:
//     ADR:
//     EMAIL;TYPE=PREF,INTERNET:
//     END:VCARD
  },
  
  reload : function()
  {
    this.onAddressBookItemsFound = null;
    this.onCalendarItemAlert = null;
    this.onCalendarItemsFound = null;
    this.onVCardExportingFinish = null;
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

var JILPIMFactory = { //#
  createInstance: function (aOuter, aIID)
  {
    if (aOuter != null)
      throw Components.results.NS_ERROR_NO_AGGREGATION;
    
    if ( service == null )
      return(new JILPIM()).QueryInterface(aIID);
    else 
      return(service);
  }
};

/***********************************************************/

var JILPIMModule = { //#
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
      , "_PIM_122a"
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
      , "_PIM_122a"
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
      return JILPIMFactory; //#

    throw Components.results.NS_ERROR_NO_INTERFACE;
  },

  canUnload: function(aCompMgr) { return true; }
};

/***********************************************************/

function NSGetModule(aCompMgr, aFileSpec) { return JILPIMModule; } //#


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