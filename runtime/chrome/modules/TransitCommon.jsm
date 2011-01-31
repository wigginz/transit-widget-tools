var EXPORTED_SYMBOLS = ["TransitCommon"];

var TransitCommon = 
{
  fileSep : null,

  getDomDocFromFile : function(fileUrl)
  {
    var req = Components.classes["@mozilla.org/xmlextras/xmlhttprequest;1"].createInstance(Components.interfaces.nsIXMLHttpRequest);
    req.open("GET", fileUrl, false); 
    req.send(null);
    // print the name of the root element or error message
    var dom = req.responseXML;
    return(dom.documentElement);
  },
  
  getStringSearchStatement : function(column, value)
  {
    var statement = null;
    if ( value )
    {
      value = value.toLowerCase();
      column = "LOWER("+column+")";
      if ( value == "" )
        statement = column+" = ''";
      
      else if ( value.indexOf("*") > -1 )
        statement = column+" like '"+value.replace(/\*/g, "%")+"'";
      
      else if ( value != null )
        statement = column+" = '"+value+"'";
    }
    return(statement);
  },
  
  getContainsSearchStatement : function(column, value)
  {
    var statement = null;
    if ( value )
    {
      value = value.toLowerCase();
      column = "LOWER("+column+")";
      
      // remove *'s
      value = value.replace(/\*/g, "");      
      
      if ( value == "" )
        statement = column+" = ''";
      
      else
        statement = column+" like '%"+value+"%'";
    }
    return(statement);
  },
  
  getBooleanSearchStatement : function(column, value)
  {
    var statement = null;

    if ( value == null )
      return(null);
    
    if ( value )
      statement = column+" = 1";
    
    else if ( !value )
      statement = column+" = 0";
      
    return(statement);
  },
  
  concatSearchArray : function(search)
  {
    if ( !search )
      return;
    
    var searchSql = "";
    for ( var i = 0; i < search.length; i++ )
    {
      if ( !search[i] )
        continue;
        
      if ( searchSql.length > 0 )
        searchSql += " and "+search[i];
      else
        searchSql += "and ("+search[i];
    }
    if ( searchSql.length > 0 )
      searchSql += ")";
    
    return(searchSql);
  },
  
  getFileSeparator : function()
  {
    if ( this.fileSep == null )
    {
      var profDir = Components.classes["@mozilla.org/file/directory_service;1"].getService(Components.interfaces.nsIProperties).get("ProfD", Components.interfaces.nsIFile).path;
      
      if ( profDir.search(/\\/) != -1 )
        this.fileSep = "\\";
      
      else
        this.fileSep = "/";
    }    
    return(this.fileSep);
  },  
  
  debug : function(logEntry)
  {
    var tstamp = new Date().getTime();
    dump("\n[Transit/"+tstamp+"]: "+logEntry);
  },
  
  convertMessageToJIL : function(message)
  {
    // convert address arrays to semi colon separated strings 
    var toArray = this.getAsArray(message.toAddress);
    var ccArray = this.getAsArray(message.ccAddress);
    var bccArray = this.getAsArray(message.bccAddress);
    
    // attachments to file paths
    var attachmentArray = this.getAsArray(message.attachments);
    
    var jilMessage = Components.classes["@jil.org/jilapi-message;1"].createInstance(Components.interfaces.jilMessage);

    jilMessage.messageId = message.id;
    jilMessage.setDestinationAddress(toArray.length, toArray);
    jilMessage.sourceAddress = message.sourceAddress;
    jilMessage.subject = message.subject;
    jilMessage.setCcAddress(ccArray.length, ccArray);
    jilMessage.setBccAddress(bccArray.length, bccArray);
    jilMessage.messagePriority = message.priority;
    jilMessage.isRead = message.isRead;
    jilMessage.callbackNumber = message.callback;
    jilMessage.time = message.date;
    jilMessage.validityPeriodHours = message.validity;
    jilMessage.body = message.body;
    jilMessage.messageType = message.type;
    jilMessage.setAttachments(attachmentArray.length, attachmentArray);    
    return(jilMessage);
  },
  
  convertJILToMessage : function(jilMessage)
  {
    // convert address arrays to semi colon separated strings 
    var toString = this.getAsString(jilMessage.getDestinationAddress());
    var ccString = this.getAsString(jilMessage.getCcAddress());
    var bccString = this.getAsString(jilMessage.getBccAddress());
    
    // attachments to file paths
    var attachmentString = this.getAsString(jilMessage.getAttachments());
    
    var profileMessage = 
    {
      id : jilMessage.messageId,
      toAddress : toString,
      sourceAddress : jilMessage.sourceAddress,
      subject : jilMessage.subject,
      ccAddress : ccString,
      bccAddress : bccString,
      priority : jilMessage.messagePriority,
      isRead : jilMessage.isRead,
      callback : jilMessage.callbackNumber,
      date : jilMessage.time,
      validity : jilMessage.validityPeriodHours,
      body : jilMessage.body,
      type : jilMessage.messageType,
      attachments : attachmentString,
    };
    return(profileMessage);
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
  
  convertToJILFile : function(localFile, jilPath)
  {
    var jilFile = Components.classes["@jil.org/jilapi-file;1"].createInstance(Components.interfaces.jilFile);

    var fileName = jilPath.substr(jilPath.lastIndexOf("/")+1, jilPath.length);
    var filePath = jilPath.substr(0, jilPath.lastIndexOf("/"));

    try
    {
      jilFile.lastModifyDate = localFile.lastModifiedTime;
      jilFile.fileSize = localFile.fileSize;
      jilFile.createDate = localFile.lastModifiedTime;
      jilFile.fileName = fileName;
      jilFile.filePath = filePath+"/"; // path to have trailing slash, always? per 1.2.2 spec, their example has a trailing slash
      jilFile.isDirectory = localFile.isDirectory();
    }
    catch(ex)
    {
      // might be a copy destination rather than actual file
      return(null);
    }
    
    return(jilFile);
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
  
  convertRecordToJIL : function(record)
  {
    var jilRecord = Components.classes["@jil.org/jilapi-callrecord;1"].createInstance(Components.interfaces.jilCallRecord);
    
    jilRecord.callRecordAddress = record.address;
    jilRecord.callRecordId = record.id;
    jilRecord.callRecordName = record.name;
    jilRecord.callRecordType = record.type;
    jilRecord.durationSeconds = record.durationSeconds;
    jilRecord.startTime = record.startTime;
    
    return(jilRecord);
  },
  
  convertJILToRecord : function(jilRecord)
  {
    var record = 
    {
      id : jilRecord.callRecordId,
      address : jilRecord.callRecordAddress,
      name : jilRecord.callRecordName,
      type : jilRecord.callRecordType,
      durationSeconds : jilRecord.durationSeconds,
      startTime : jilRecord.startTime,
    };
    return(record);
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
      jilAddressBookItem.setAttributeValue(i, contact.attributes[i]);
    
    return(jilAddressBookItem);
  },
  
  getAsArray : function(list)
  {
    if ( list == null )
      return(new Array());
    
    return(list.split(";"));
  },
  
  getAsString : function(list)
  {
    if ( list == null )
      return(null);
    
    var asString = "";
    for ( var i = 0; i < list.length; i++ )
      asString += list[i]+";";
    
    // remove the last char
    if ( asString.length > 0 )
      asString = asString.substr(0, asString.length-1);
    
    return(asString);
  },  
  
  alert: function(aMsg)
  {
    var promptService = Components.classes["@mozilla.org/embedcomp/prompt-service;1"].getService(Components.interfaces.nsIPromptService);
    promptService.alert(null, "Transit Emulator Alert", aMsg);
    promptService = null; 
  },
  
  confirm: function(aMsg)
  {
    var promptService = Components.classes["@mozilla.org/embedcomp/prompt-service;1"].getService(Components.interfaces.nsIPromptService);
    var result = promptService.confirm(null, "Transit Emulator Alert", aMsg);
    promptService = null; 
    return(result);
  },
  
  dumpall : function(name,obj,niv) 
  {
    if (!niv) niv=1;
    var dumpdict=new Object();

    dump ("\n\n-------------------------------------------------------\n");
    dump ("Dump of the objet: " + name + " (" + niv + " levels)\n");
    dump ("Address: " + obj + "\n");
    dump ("Interfaces: ");
    for (var i in Components.interfaces) 
    {
      try 
      {
        obj.QueryInterface(Components.interfaces[i]);
        dump(""+Components.interfaces[i]+", ");
      } catch (ex) {}
    }
    dump("\n");
    this._dumpall(dumpdict,obj,niv,"","");
    dump ("\n\n-------------------------------------------------------\n\n");
    
    for (i in dumpdict)
      delete dumpdict[i];
  },
  
  _dumpall : function(dumpdict, obj, niv, tab, path) 
  {
    if (obj in dumpdict)
      dump(" (Already dumped)");
    else 
    {
      dumpdict[obj]=1;
      
      var i,r,str,typ;
      for (i in obj) 
      {
        try 
        {
          str = String(obj[i]).replace(/\n/g,"\n"+tab);
        } 
        catch (ex) 
        {
          str = String(ex);
        }
        try 
        {
          typ = ""+typeof(obj[i]);
        } 
        catch (ex) 
        {
          typ = "unknown";
        }
        dump ("\n" + tab + i + " (" + typ + (path?", " + path:"") +"): " + str);
        
        if ((niv>1) && (typ=="object"))
          this._dumpall(dumpdict,obj[i],niv-1,tab+"\t",(path?path+"->"+i:i));
      }
    }
  },
};

