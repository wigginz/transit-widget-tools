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
    
  test_11a : function()
  {
    try
    {
      Widget.Multimedia.AudioPlayer.play(null);
    }
    catch(exception)
    {
      showResult("Issue 11a", "Exception caught when calling Widget.Multimedia.AudioPlayer.play() with NULL parameter. Type: "+exception.type);
    }
  },  
  
  test_11b : function()
  {
    try
    {
      Widget.Multimedia.AudioPlayer.play();
    }
    catch(exception)
    {
      showResult("Issue 11b", "Exception caught when calling Widget.Multimedia.AudioPlayer.play() with NO parameter. Type: "+exception.type);
    }
  }, 
  
  test_11c : function()
  {
    try
    {
      Widget.Multimedia.AudioPlayer.play("not a number");
    }
    catch(exception)
    {
      showResult("Issue 11c", "Exception caught when calling Widget.Multimedia.AudioPlayer.play() with STRING parameter. Type: "+exception.type);
    }
  }, 
  
  test_11d : function()
  {
    try
    {
      Widget.Multimedia.AudioPlayer.play(-10);
    }
    catch(exception)
    {
      showResult("Issue 11d", "Exception caught when calling Widget.Multimedia.AudioPlayer.play() with NEGATIVE parameter. Type: "+exception.type);
    }
  }, 
  
  test_12 : function()
  {
    try
    {
      Widget.PIM.getAddressBookItem();
    }
    catch(exception)
    {
      showResult("Issue 11d", "Exception caught when calling Widget.PIM.getAddressBookItem() with NULL parameter. Type: "+exception.type);
    }
  }, 
    
  test_13 : function()
  {
    Widget.PIM.onAddressBookItemsFound = function(results)
    {
      alert("Widget.PIM.onAddressBookItemsFound callback function called");
    };
    
    var comparison = Widget.PIM.createAddressBookItem();
    comparison.fullName = "Test setRingtone";
    Widget.PIM.findAddressBookItems(comparison, 0, 10);
  },
  
  test_15 : function()
  {
    Widget.Multimedia.AudioPlayer.open('test-short.ogg'); // consider audio length is 10 seconds.
    Widget.Multimedia.AudioPlayer.play(1);
    alert("isPlaying: " + Widget.Multimedia.isAudioPlaying); // here is true.
    setTimeout('alert("isPlaying: " + Widget.Multimedia.isAudioPlaying)', 15 * 1000); // is still true, should be false.
  },
  
  test_isAudioPlaying : function()
  {
    alert("isPlaying: " + Widget.Multimedia.isAudioPlaying);
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