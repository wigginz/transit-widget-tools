var Issues = 
{
    test_6 : function()
    {
      var msg = Widget.Messaging.createMessage("SMSMessage");
      msg.addAddress("destination", "123456789");
      msg.addAddress("destination", "11111");
            
      showResult("Issue 6", "msg.addAddress called. value for msg.destinationAddress: "+msg.destinationAddress);
    },
    
    test_7 : function()
    {
      var apps = Widget.Device.getAvailableApplications();
      showResult("Issue 7", "Widget.Device.getAvailableApplications() returns: "+apps);
    },
    
    test_8 : function()
    {
      var count = Widget.PIM.getAddressBookItemsCount();
      var count2 = count+10;
      showResult("Issue 8", "Widget.PIM.getAddressBookItemsCount() returns: "+count2);
    },
    
    test_9 : function()
    {
      Widget.setPreferenceForKey(null,"smth");
      showResult("Issue 9", "Widget.setPreferenceForKey() with null value called");
    },
    
    test_10a : function()
    {
      try
      {
        Widget.Multimedia.AudioPlayer.open();
      }
      catch(exception)
      {
        showResult("Issue 10a", "Exception caught when calling Widget.Multimedia.AudioPlayer.open() with NO parameter. Type: "+exception.type);
      }
    },
    
    test_10b : function()
    {
      try
      {
        Widget.Multimedia.AudioPlayer.open(null);
      }
      catch(exception)
      {
        showResult("Issue 10b", "Exception caught when calling Widget.Multimedia.AudioPlayer.open() with NULL parameter. Type: "+exception.type);
      }
    },
}

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