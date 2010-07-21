var EXPORTED_SYMBOLS = ["SecurityManager"];

var SecurityManager =
{
  sessionConfirmed : new Array(),

  securityContext : null,

  showYesNoDialog : null,

  OP_ONE_SHOT : 0,

  OP_SESSION : 1,

  OP_BLANKET : 1, // session and blanket are treated the same in the emulator, no point in emulating blanket

  OP_ALLOWED : 2,

  OP_DISALLOWED : 3,

  checkSecurity : function(apiKey, unidentifiedOp, identifiedOp, operatorOp, executeIfYes)
  {
    // this is an ugly function
    //dump("context: "+this.securityContext+", api: "+apiKey+"conf: "+SecurityManager.sessionConfirmed[apiKey]+", "+identifiedOp+", "+unidentifiedOp+", "+operatorOp);
    if ( this.securityContext == "identified" )
    {
      if ( identifiedOp == this.OP_ALLOWED )
      {
        executeIfYes();
        return;
      }
      if ( (identifiedOp == this.OP_SESSION) )
      {
        if ( !this.sessionConfirmed[apiKey] )
        {
          this.showPrompt(executeIfYes, apiKey);
          return;
        }
        else
        {
          executeIfYes();
          return;
        }
      }
      if ( (identifiedOp == this.OP_ONE_SHOT) )
      {
        this.showPrompt(executeIfYes, apiKey);
        return;
      }
    }
    
    else if ( this.securityContext == "unidentified" )
    {
      if ( identifiedOp == this.OP_DISALLOWED )
        return;
      if ( unidentifiedOp == this.OP_ALLOWED )
      {
        executeIfYes();
        return;
      }
      if ( (unidentifiedOp == this.OP_SESSION) )
      {
        if ( !this.sessionConfirmed[apiKey] )
        {
          this.showPrompt(executeIfYes, apiKey);
          return;
        }
        else
        {
          executeIfYes();
          return;
        }
      }
      if ( (unidentifiedOp == this.OP_ONE_SHOT) )
      {
        this.showPrompt(executeIfYes, apiKey);
        return;
      }
    }
    
    else if ( this.securityContext == "operator" )
    {
      if ( operatorOp == this.OP_ALLOWED )
      {
        executeIfYes();
        return;
      }
      if ( (operatorOp == this.OP_SESSION) )
      {
        if ( !this.sessionConfirmed[apiKey] )
        {
          this.showPrompt(executeIfYes, apiKey);
          return;
        }
        else
        {
          executeIfYes();
          return;
        }
      }
      if ( (operatorOp == this.OP_ONE_SHOT) )
      {
        this.showPrompt(executeIfYes, apiKey);
        return;
      }
    }
  },

  showPrompt : function(executeIfYes, apiKey)
  {
    this.showYesNoDialog("Priviledged Resource Access", "This application is attempting to use the following priviledged resource: \n\n"+apiKey+"\n\nWould you like to allow the application to proceed?", function()
    {
      SecurityManager.sessionConfirmed[apiKey] = true;
      executeIfYes();
    }, function(){});
  },

  reset : function()
  {
    this.sessionConfirmed = new Array();  
    this.securityContext = null;
  },
};