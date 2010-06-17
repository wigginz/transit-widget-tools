var jwe_workspace = 
{
  previousX : null,
  previousY : null,

  mouseClick : function(event)
  {
    if ( event.target.id != "jwe-emulator-container" )
      return(false);
    $("jwe-emulator-content").hide();
  },

  mouseUnClick : function(event)
  {
    if ( event.target.id != "jwe-emulator-container" )
      return(false);
    $("jwe-emulator-content").show();
  },

  contentObserver : 
  {
    onDragStart: function (event, transferData, action) 
    {
      jwe_workspace.previousX = event.layerX;
      jwe_workspace.previousY = event.layerY;
      
      var node = event.target;
      transferData.data = new TransferData();
      transferData.data.addDataForFlavour("application/x-moz-node", node);
    }
  },

  workspaceObserver :
  {
    getSupportedFlavours : function () 
    {
      var flavours = new FlavourSet();
      flavours.appendFlavour("application/x-moz-node");
      return flavours;
    },

    onDragOver: function (event, flavour, session) {},

    onDrop: function (event, dropdata, session) 
    {
      if (dropdata.data != null) 
      {    
        var elem = dropdata.data;
        var offsetX = event.pageX - jwe_workspace.previousX;
        var offsetY = event.pageY - jwe_workspace.previousY;

        elem.style.top = "" + offsetY+"px";
        elem.style.left = "" + offsetX+"px";  
      }
      $("jwe-emulator-content").show();
    }
  },
};