var Issues = 
{
    test_6 : function()
    {
      var msg = Widget.Messaging.createMessage("SMSMessage");
      msg.addAddress("destination", "123456789");
      msg.addAddress("destination", "11111");
            
      showResult("Issue 6", "msg.addAddress called. value for msg.destinationAddress: "+msg.destinationAddress);
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