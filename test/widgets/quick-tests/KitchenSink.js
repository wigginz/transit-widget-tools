
var Case = 
{
    testFn : function() 
    {
      alert("1");
      return("hello");
    },
};


var testAccountInfo =
{
  phoneMSISDN : function()
  {
    
    alert(Case.testWatch);
    Case.testWatch = "watch2";
    //showResult("AccountInfo.phoneMSISDN", Widget.Device.AccountInfo.phoneMSISDN);
  },
};

var testDevice =
{
  getFile : function()
  {
    var jilFile = Widget.Device.getFile("/var/system.log");
    
    showResult("Device.getFile", "Retrieved file "+jilFile.fileName+" with size "+jilFile.fileSize+", last modified on "+jilFile.lastModifyDate);
  },
  
  copyFile : function()
  {
    Widget.Device.copyFile("/var/home.sh", "/app/var/tools/green-sauce.sh");
    
    var toFile = Widget.Device.getFile("/app/var/test/home.sh");
    
    showResult("Device.copyFile", "Copied and new file path is "+toFile.fileName+" and size "+toFile.fileSize);
  },
  
  deleteFile : function()
  {
    Widget.Device.deleteFile("/app/var/tools");
    
    showResult("Device.copyFile", "Deleted file /app/var/tools/");
  },
  
  getDirectoryFileNames : function()
  {
    var results = "List of files in directory: <br>";
    
    var fileList = Widget.Device.getDirectoryFileNames("/app/var/");
    
    for ( var i = 0; i < fileList.length; i++ )
      results += fileList[i]+"<br>";
    
    showResult("Device.deleteFile", results);
  },
  
  getFileSystemSize : function()
  {
    var fileSize = Widget.Device.getFileSystemSize("/");
    
    showResult("Device.getFileSystemSize", "File system size for / is "+fileSize+" bytes");
  },
  
  moveFile : function()
  {
    Widget.Device.moveFile("/app/var/tools/green-sauce.sh", "/app/var");
    
    showResult("Device.moveFile", "Moved file /app/var/tools/home.sh to /app/var");
  },
  
  findFiles : function()
  {
    Widget.Device.onFilesFound = function(filesFound) 
    {
      var result = "Searching for files with '*.hmtl'";
      for ( var i = 0; i < filesFound.length; i++ )
        result += filesFound[i]+"<br>";
      showResult("Widget.Device.findFiles() [callback]", result);
    };
    
    var match = new Widget.Device.File();
    match.fileName = "*.html";
    Widget.Device.findFiles(match, 0, 10);
  },
};

var testVideoPlayer =
{
  setWindow : function()
  {
    Widget.Multimedia.VideoPlayer.setWindow(document.getElementById("video-container"));
  },
  
  open : function()
  {
    Widget.Multimedia.VideoPlayer.open("http://v2v.cc/~j/theora_testsuite/320x240.ogg");
  },
  
  play : function()
  {
    Widget.Multimedia.VideoPlayer.play(3);
  },
  
  stop : function()
  {
    Widget.Multimedia.VideoPlayer.stop();
  },
  
  pause : function()
  {
    Widget.Multimedia.VideoPlayer.pause();
  },
  
  resume : function()
  {
    Widget.Multimedia.VideoPlayer.resume();
  },
};

var testMessage =
{
  addAddress : function()
  {
    var message = new Widget.Messaging.Message();
    message.addAddress("cc", "cc1-noreply@jil.org");
    message.addAddress("cc", "cc2-noreply@jil.org");
    message.addAddress("bcc", "bcc1-noreply@jil.org");
    message.addAddress("destination", "destination1-noreply@jil.org");
    message.addAddress("destination", "destination2-noreply@jil.org");
    message.addAddress("destination", "destination3-noreply@jil.org"); 
    
    showResult("Message.addAddress", "cc values: "+message.ccAddress+", bcc values: "+message.bccAddress+", dest: "+message.destinationAddress);
  },
  
  saveAttachment : function()
  {
    var attach = new Widget.Messaging.Attachment();
    attach.fileName = "/var/log/orig.txt";
    
    var message = new Widget.Messaging.Message();
    message.saveAttachment("/var/log/new.txt", attach);
    
    showResult("Message.saveAttachment", "Saved attachment with path "+attach.fileName+" to /var/log/new.txt");
  },
};

function testWrapper()
{
  var testException = new Widget.Exception();
  alert(testException instanceof Widget.Exception);
}

var testDataNetworkInfo = 
{
  isDataNetworkConnected : function()
  {
    var result = Widget.Device.DataNetworkInfo.isDataNetworkConnected;
    showResult("DataNetworkInfo.isDataNetworkConnected", "isDataNetworkConnected value: "+result);
  },
  
  networkConnectionType : function()
  {
    var result = "networkConnectionType values are: ";
    
    for ( var i = 0; i < Widget.Device.DataNetworkInfo.networkConnectionType.length; i++ )
      result += Widget.Device.DataNetworkInfo.networkConnectionType[i]+", ";
    
    showResult("DataNetworkInfo.networkConnectionType", result);
  },
  
  DataNetworkConnectionTypes : function()
  {
    showResult("DataNetworkInfo.DataNetworkConnectionTypes", "value for DataNetworkConnectionTypes.EDGE: "+Widget.Device.DataNetworkInfo.DataNetworkConnectionTypes.EDGE);
  },
};

var testDeviceInfo = 
{
  phoneScreenHeightDefault : function()
  {
    showResult("DeviceInfo.phoneScreenHeightDefault", "value for DeviceInfo.phoneScreenHeightDefault: "+Widget.Device.DeviceInfo.phoneScreenHeightDefault);
  },
  
  phoneScreenWidthDefault : function()
  {
    showResult("DeviceInfo.phoneScreenWidthDefault", "value for DeviceInfo.phoneScreenWidthDefault: "+Widget.Device.DeviceInfo.phoneScreenWidthDefault);
  },
  
  ownerInfo : function()
  {
    showResult("DeviceInfo.ownerInfo", "value for DeviceInfo.ownerInfo.fullName: "+Widget.Device.DeviceInfo.ownerInfo.fullName);
  },
};

var testMessaging = 
{
  createMessage : function()
  {
    var message = Widget.Messaging.createMessage(Widget.Messaging.MessageTypes.SMSMessage);
    showResult("Messaging.createMessage()", "Created message of type: "+message.messageType);
  },
  
  sendMessage : function()
  {
    var message = Widget.Messaging.createMessage(Widget.Messaging.MessageTypes.EmailMessage);
    message.subject = "Test Subject";
    message.body = "Test Body";
    message.callbackNumber = "+4400000000001";
    message.destinationAddress = ["to@jil.org"];
    message.sourceAddress = "from@jil.org";
    
    Widget.Messaging.sendMessage(message);
    
    showResult("Messaging.createMessage()", "Created and sent message with subject: "+message.subject);
  },
  
  copyMessageToFolder : function()
  {
    var message = Widget.Messaging.createMessage(Widget.Messaging.MessageTypes.EmailMessage);
    var result = "Created email message.<br>";
    message.subject = "Test Subject";
    message.body = "Test Body";
    message.callbackNumber = "+4400000000001";
    message.destinationAddress = ["to@jil.org"];
    message.sourceAddress = "from@jil.org";
    
    result += "Populated fields and saved email message.<br>";
    message.update();
    
    Widget.Messaging.createFolder(Widget.Messaging.MessageTypes.EmailMessage, "Test 2");
    result += "Created new folder called 'Test 2'<br>";
    
    Widget.Messaging.copyMessageToFolder(message, "Test 2");
    result += "Copied message to new folder 'Test 2'<br>";
    
    showResult("Messaging.createMessage()", result);
  },
  
  createFolder : function()
  {
    Widget.Messaging.createFolder(Widget.Messaging.MessageTypes.EmailMessage, "Test 1");
    showResult("Messaging.createFolder()", "Created EmailMessage folder with name: 'Test 1'");
  },
  
  deleteAllMessages : function()
  {
    var message = Widget.Messaging.createMessage(Widget.Messaging.MessageTypes.EmailMessage);
    var result = "Created email message.<br>";
    message.subject = "Test Subject";
    message.body = "Test Body";
    message.callbackNumber = "+4400000000001";
    message.destinationAddress = ["to@jil.org"];
    message.sourceAddress = "from@jil.org";
    
    result += "Populated fields and saved email message.<br>";
    message.update();
    
    Widget.Messaging.createFolder(Widget.Messaging.MessageTypes.EmailMessage, "Test 3");
    result += "Created new folder called 'Test 3'<br>";
    
    Widget.Messaging.copyMessageToFolder(message, "Test 3");
    result += "Copied message to new folder 'Test 3'<br>";
    
    Widget.Messaging.deleteAllMessages(Widget.Messaging.MessageTypes.EmailMessage, "Test 3");
    result += "Deleted all messages with type EmailMessage in folder 'Test 3'";
    
    showResult("Messaging.deleteAllMessages()", result);
  },
  
  deleteEmailAccount : function()
  {
    Widget.Messaging.deleteEmailAccount(18);
    
    showResult("Messaging.deleteEmailAccount()", "Deleted email with account id 18");
  },
  
  deleteFolder : function()
  {
    Widget.Messaging.createFolder(Widget.Messaging.MessageTypes.EmailMessage, "Test 4");
    var result = "Created new folder called 'Test 4'<br>";
    
    Widget.Messaging.deleteFolder(Widget.Messaging.MessageTypes.EmailMessage, "Test 4");
    result +="Deleted message folder 'Test 4'for EmailMessage type.";
    
    showResult("Messaging.deleteFolder()", result);
  },
  
  deleteMessage : function()
  {
    Widget.Messaging.deleteMessage(Widget.Messaging.MessageTypes.EmailMessage, "Test 4", 6);
    
    showResult("Messaging.deleteMessage()", "Deleted message with id 6");
  },
  
  findMessages : function()
  {
    Widget.Messaging.onMessagesFound = function(results, folderName) 
    {
      var result = "Searching for messages with 'findme*' in the subject in folder "+folderName;
      for ( var i = 0; i < results.length; i++ )
        result += results[i].messageId+": "+results[i].subject+"<br>";
      showResult("Widget.Messaging.findMessages() [callback]", result);
    };
    
    var message = new Widget.Messaging.Message();
    message.subject = "findme*";  
    Widget.Messaging.findMessages(message, "Test 3", 0, 10);
  },
  
  getFolderNames : function()
  {
    var result = "Retrieving all folder names for message type EmailMessage";
    var names = Widget.Messaging.getFolderNames(Widget.Messaging.MessageTypes.EmailMessage);
    
    for ( var i = 0; i < names.length; i++ )
      result += "Name: "+names[i]+"<br>";
    
    showResult("Messaging.getFolderNames()", result);
  },
  
  getMessage : function()
  {
    var message = Widget.Messaging.getMessage(Widget.Messaging.MessageTypes.EmailMessage, "Test 4", 7);
    
    showResult("Messaging.deleteMessage()", "Retrieved message with id 7, subject: "+message.subject);
  },
  
  getMessageQuantities : function()
  {
    var result = "Getting quantities for folder named 'Inbox'<br>";
    var quantities = Widget.Messaging.getMessageQuantities(Widget.Messaging.MessageTypes.EmailMessage, "Inbox");
    
    result+= "Read: "+quantities.totalMessageReadCnt+"<br>";
    result+= "Unread: "+quantities.totalMessageUnreadCnt+"<br>";
    result+= "Total: "+quantities.totalMessageCnt+"<br>";
    
    showResult("Messaging.getMessageQuantities()", result);
  },
  
  moveMessageToFolder : function()
  {
    var message = Widget.Messaging.getMessage(Widget.Messaging.MessageTypes.EmailMessage, "Test 4", 7);
    
    Widget.Messaging.moveMessageToFolder(message, "Test 3");
    
    showResult("Messaging.moveMessageToFolder()", "Moved message with id 7 to folder 'Test 3'");
  },
};

var testTelephony = 
{
  findCallRecords : function()
  {
    Widget.Telephony.onCallRecordsFound = function(results) 
    {
      var result = "Searching for call record with name 'Em*', 0-10<br>";
      for ( var i = 0; i < results.length; i++ )
        result += results[i].callRecordId+": "+results[i].callRecordName+"<br>";
      showResult("Widget.Telephony.findCallRecords() [callback]", result);
    };
    
    var comparison = Telephony.createCallRecord();
    comparison.callRecordName = "Em*";
    Widget.Telephony.findCallRecords(comparison, 0, 10);
  },
  
  deleteAllCallRecords : function()
  {
    Telephony.deleteAllCallRecords(CallRecordTypes.RECEIVED);
    showResult("Telephony.deleteAllCallRecords()", "Deleted all RECEIVED call records.");
  },
  
  deleteCallRecord : function()
  {
    var id = "6";
    Telephony.deleteCallRecord(CallRecordTypes.RECEIVED, id);
    showResult("Telephony.deleteCallRecord()", "Deleted RECEIVED call record with id "+id);
  },
  
  getCallRecord : function()
  {
    var id = "7";
    var record = Telephony.getCallRecord(CallRecordTypes.RECEIVED, id);
    showResult("Telephony.getCallRecord()", "Retrieved call record type RECEIVED with id "+record.callRecordId+", duration seconds: "+record.durationSeconds);
  },
  
  getCallRecordCnt : function()
  {
    var count = Telephony.getCallRecordCnt(CallRecordTypes.RECEIVED);
    showResult("Telephony.getCallRecordCnt()", "Retrieved count "+count+" of call record type RECEIVED");
  },
  
  onCallEvent : function()
  {
    Widget.Telephony.onCallEvent = function(type, number) 
    {
      showResult("Widget.Telephony.onCallEvent() [callback]", "Call event received, type: "+type+", number: "+number);
    };
  },
};


var testPIM = 
{
  // complete
  createAddressBookItem : function()
  {
    var abi = PIM.createAddressBookItem();
    showResult("PIM.createAddressBookItem()", abi);
  },
  
  // complete
  addAddressBookItem : function()
  {
    common.createTestGuy("Test Guy 1");
    
    showResult("PIM.addAddressBookItem()", "Created address book item 'Test Guy 1'");
  },
  
  // complete
  createAddressBookGroup : function()
  {
    common.createTestGroup("Test Group 1");
    showResult("PIM.createAddressBookGroup()", "Created group: 'Test Group 1'");
  },
  
  getAddressBookGroupMembers : function()
  {
    common.createTestGuy("Test Guy G1-1");
    common.createTestGuy("Test Guy G1-2");
    
    common.createTestGroup("Test Group G1");
    
    Widget.PIM.onAddressBookItemsFound = function(results) 
    {
      var result = "Created new address book item 'Test Guy G1-1'<br>";
      var result = "Created new address book item 'Test Guy G1-2'<br>";
      result += "Created new address book group 'Test Group G1'<br>";
      
      var addrItem = results[0];
      result += "Found address item with id: "+addrItem.addressBookItemId+"<br>";
      
      for ( var i = 0; i < results.length; i++ )
      {
        result += "Added address book item id: "+results[i].addressBookItemId+" to group 'Test Group G1'<br>";
        results[i].setAddressGroupNames(["Test Group G1"], 1);
      }
      
      result += "Getting members for group 'Test Group G1'<br>";      
      var searchResults = Widget.PIM.getAddressBookGroupMembers("Test Group G1");
      for ( var i = 0; i < searchResults.length; i++ )
        result += "Member address book item id: "+searchResults[i].addressBookItemId;      
  
      showResult("Widget.PIM.getAddressBookGroupMembers()", result);
    };
    
    var comparison = PIM.createAddressBookItem();
    comparison.fullName = "Test Guy G1*";
    Widget.PIM.findAddressBookItems(comparison, 0, 10);
  },  
  
  // complete
  findAddressBookItems : function()
  {
    Widget.PIM.onAddressBookItemsFound = function(results) 
    {
      var result = "Searching for address book item 'Test*', 0-10<br>";
      for ( var i = 0; i < results.length; i++ )
        result += results[i].addressBookItemId+": "+results[i].fullName+"<br>";
      showResult("Widget.PIM.findAddressBookItems() [callback]", result);
    };
    
    var comparison = PIM.createAddressBookItem();
    comparison.fullName = "F*";
    Widget.PIM.findAddressBookItems(comparison, 0, 10);
  },

  deleteAddressBookItem : function()
  {
    common.createTestGuy("Test Guy 5");

    Widget.PIM.onAddressBookItemsFound = function(results) 
    {
      var result = "Created new address book item 'Test Guy 5'<br>";
      
      var addrItem = results[0];
      result += "Found address item with id: "+addrItem.addressBookItemId+"<br>";
      
      PIM.deleteAddressBookItem(addrItem.addressBookItemId);
      result += "Deleted address item.<br>";
      showResult("Widget.PIM.deleteAddressBookItem()", result);
    };
    
    var comparison = PIM.createAddressBookItem();
    comparison.fullName = "Test Guy 5";
    Widget.PIM.findAddressBookItems(comparison, 0, 10);
  },  
  
  getAddressBookItem : function()
  {
    common.createTestGuy("Test Guy 7");

    Widget.PIM.onAddressBookItemsFound = function(results) 
    {
      //alert(results[0].addressBookItemId);
      var result = "Created new address book item 'Test Guy 7'<br>";
      
      var addrItem = results[0];
      result += "Found address item with id: "+addrItem.addressBookItemId+"<br>";
      
      var item = Widget.PIM.getAddressBookItem(addrItem.addressBookItemId);
      result += "Retrieved address item: "+item.addressBookItemId+"<br>";
      showResult("Widget.PIM.getAddressBookItem()", result);
    };
    
    var comparison = Widget.PIM.createAddressBookItem();
    comparison.fullName = "Test Guy 7";
    Widget.PIM.findAddressBookItems(comparison, 0, 10);
  },  
  
  getAddressBookItemsCount : function()
  {
    var count = Widget.PIM.getAddressBookItemsCount();
    showResult("PIM.getAddressBookItemsCount()", "Address book item count is: "+count);
  },
  
  getAvailableAddressGroupNames : function()
  {
    var result = "";
    var names = Widget.PIM.getAvailableAddressGroupNames();
    for ( var i = 0; i < names.length; i++ )
      result += names[i]+", ";
    showResult("PIM.getAvailableAddressGroupNames()", result);
  },
  
  addCalendarItem : function()
  {
    common.createTestCalendarItem("Test Event 1");
    showResult("PIM.addCalendarItem()", "Created calendar item 'Test Event 1'");
  },
  
  deleteAddressBookGroup : function()
  {
    common.createTestGroup("Test Group G5");
    var result = "Created group 'Test Group G5'<br>";
    
    Widget.PIM.deleteAddressBookGroup("Test Group G5");
    showResult("PIM.deleteAddressBookGroup()", result+"Deleted group 'Test Group G5'");
  },
  
  findCalendarItems : function()
  {
    common.createTestCalendarItem("Test Event 2");
    
    Widget.PIM.onCalendarItemsFound = function(results) 
    {
      var result = "Created new calendar item 'Test Event 2'<br>";
      
      result += "Found "+results.length+" calendar items with name 'Test Event 2'<br>";

      showResult("Widget.PIM.findCalendarItems()", result);
    };
    
    var comparison = Widget.PIM.createCalendarItem();
    comparison.eventName = "Test Event 2";
    Widget.PIM.findCalendarItems(comparison, 0, 10);
  },
  
  deleteCalendarItem : function()
  {
    common.createTestCalendarItem("Test Event 3");
    
    Widget.PIM.onCalendarItemsFound = function(results) 
    {
      var result = "Created new calendar item 'Test Event 3'<br>";
      
      result += "Found calendar item with id: "+results[0].calendarItemId+"<br>";
      
      Widget.PIM.deleteCalendarItem(results[0].calendarItemId);

      showResult("Widget.PIM.deleteCalendarItem()", result+"Deleted calendar item with id: "+results[0].calendarItemId);
    };
    
    var comparison = Widget.PIM.createCalendarItem();
    comparison.eventName = "Test Event 3";
    Widget.PIM.findCalendarItems(comparison, 0, 10);
  },
  
  getCalendarItem : function()
  {
    common.createTestCalendarItem("Test Event 4");
    
    Widget.PIM.onCalendarItemsFound = function(results) 
    {
      var result = "Created new calendar item 'Test Event 4'<br>";
      
      result += "Found calendar item with id: "+results[0].calendarItemId+"<br>";
      
      var item = Widget.PIM.getCalendarItem(results[0].calendarItemId);

      showResult("Widget.PIM.getCalendarItem()", result+"Retrieved calendar item with id: "+item.calendarItemId);
    };
    
    var comparison = Widget.PIM.createCalendarItem();
    comparison.eventName = "Test Event 4";
    Widget.PIM.findCalendarItems(comparison, 0, 10);
  },
  
  getCalendarItems : function()
  {
    var result = "Searching for calendar items between 2010-05-01 10:00:54 and 2010-05-31 10:00:54<br>";
    var items = Widget.PIM.getCalendarItems("2010-05-01 10:00:54", "2010-05-31 10:00:54");
    
    for ( var i = 0; i < items.length; i++ )
      result += "Item id found: "+items[i].calendarItemId+"<br>";
    
    showResult("Widget.PIM.getCalendarItems()", result);
  },
  
  update : function()
  {
    common.createTestCalendarItem("Test Event 5");
    
    Widget.PIM.onCalendarItemsFound = function(results) 
    {
      var result = "Created new calendar item 'Test Event 5'<br>";
      
      result += "Found calendar item with id: "+results[0].calendarItemId+"<br>";
      
      results[0].eventName = "Test Event 5 Updated";
      
      results[0].update();

      showResult("Widget.PIM.getCalendarItem()", result+"Updated calendar item id: "+results[0].calendarItemId+" with new name 'Test Event 5 Updated'");
    };
    
    var comparison = Widget.PIM.createCalendarItem();
    comparison.eventName = "Test Event 5";
    Widget.PIM.findCalendarItems(comparison, 0, 10);
  },
};

var testABI = 
{
  getAvailableAttributes : function()
  {
    var result = "";
    var attribs = Widget.PIM.AddressBookItem.getAvailableAttributes();
    for ( var i = 0; i < attribs.length; i++ )
    {
      result += attribs[i]+", ";
    }
    showResult("Widget.PIM.AddressBookItem.getAvailableAttributes()", result);
  },
  
  update : function()
  {
    var result = "";
    
    common.createTestGuy("Test Guy 6");
    
    Widget.PIM.onAddressBookItemsFound = function(results) 
    {
      var result = "Created new address book item 'Test Guy 6'<br>";
      
      var addrItem = results[0];
      result += "Found address item with id: "+addrItem.addressBookItemId+"<br>";
      
      addrItem.fullName = "Test Guy 6-updated";
      addrItem.update();
      result += "Set full name to 'Test Guy 6-updated'<br>";
      showResult("Widget.PIM.update()", result);
    };
    
    var comparison = Widget.PIM.createAddressBookItem();
    comparison.fullName = "Test Guy 6";
    Widget.PIM.findAddressBookItems(comparison, 0, 10);
  },
  
  setAddressGroupNames : function()
  {
    common.createTestGuy("Test Guy G2-1");
    common.createTestGuy("Test Guy G2-2");
    
    common.createTestGroup("Test Group G2");
    
    Widget.PIM.onAddressBookItemsFound = function(results) 
    {
      var result = "Created new address book item 'Test Guy G2-1'<br>";
      var result = "Created new address book item 'Test Guy G2-2'<br>";
      result += "Created new address book group 'Test Group G2'<br>";

      for ( var i = 0; i < results.length; i++ )
      {
        result += "Added address book item id: "+results[i].addressBookItemId+" to group 'Test Group G2'<br>";
        var groupList = new Array();
        groupList.push("Test Group G2");
        results[i].setAddressGroupNames(groupList, 1);
      } 
      
      showResult("Widget.PIM.AddressBookItem.setAddressGroupNames()", result);
    };
    
    var comparison = Widget.PIM.createAddressBookItem();
    comparison.fullName = "Test Guy G2*";
    Widget.PIM.findAddressBookItems(comparison, 0, 10);
  },
  
  getAddressGroupNames : function()
  {
    common.createTestGuy("Test Guy G3-1");
    
    common.createTestGroup("Test Group G3");
    common.createTestGroup("Test Group G4");
    
    Widget.PIM.onAddressBookItemsFound = function(results) 
    {
      var result = "Created new address book item 'Test Guy G3-1'<br>";
      result += "Created new address book group 'Test Group G3'<br>";
      result += "Created new address book group 'Test Group G4'<br>";
      
      var addrItem = results[0];
      result += "Found address item with id: "+addrItem.addressBookItemId+"<br>";
      
      var groupList = new Array();
      groupList.push("Test Group G3");
      groupList.push("Test Group G4");
      addrItem.setAddressGroupNames(groupList, groupList.length);
      
      result += "Added address book item id: "+addrItem.addressBookItemId+" to group 'Test Group G3' and 'Test Group 4'<br>";
      
      var searchResults = addrItem.getAddressGroupNames();
      for ( var i = 0; i < searchResults.length; i++ )
        result += "Address book item is a member of group: "+searchResults[i]+"<br>";
      
      showResult("Widget.PIM.AddressBookItem.getAddressGroupNames()", result);
    };
    
    var comparison = new Widget.PIM.AddressBookItem(); 
    comparison.fullName = "Test Guy G3*";
    Widget.PIM.findAddressBookItems(comparison, 0, 10);
  },
};

var common =
{
  createTestGuy : function(name)
  {
    var abi = new Widget.PIM.AddressBookItem();    
    abi.address = "123 Fake Street";
    abi.company = "Vodafone";
    abi.eMail = "fake@jil.org";
    abi.fullName = name;
    abi.homePhone = "+19255551233";
    abi.mobilePhone = "+19255551234";
    abi.title = "Some Fake Guy";
    abi.workPhone = "+19255551235";
    Widget.PIM.addAddressBookItem(abi);
  },
  
  createTestGroup : function(name)
  {
    Widget.PIM.createAddressBookGroup(name);
  },
  
  createTestCalendarItem : function(eventName)
  {
    var ci = new Widget.PIM.CalendarItem();
    ci.alarmDate = new Date();
    ci.alarmed = false;
    ci.eventEndTime = new Date();
    ci.eventName = eventName;
    ci.eventNotes = "Some event notes.";
    ci.eventRecurrence = EventRecurrenceTypes.DAILY;
    ci.eventStartTime = new Date();    
    Widget.PIM.addCalendarItem(ci);
  },
};

function showResult(title, result)
{
  document.getElementById("results").style.display = "block";
  document.getElementById("results-title").innerHTML = title;
  document.getElementById("results-detail").innerHTML = result;
}

function closeResults()
{
  document.getElementById("results").style.display = "none";
  document.getElementById("results-title").innerHTML = "";
  document.getElementById("results-detail").innerHTML = "";
}














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