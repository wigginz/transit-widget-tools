var EXPORTED_SYMBOLS = ["UpgradeService"];

Components.utils.import("resource://transit-emulator/TransitCommon.jsm");

var Target_1_2_2_20100722 = 
{
  depends : null,
  
  version : "1_2_2_20100722",
  
  upgrade : function(connection)
  {
    var stmt = connection.createStatement("CREATE TABLE jwe_runtime (version TEXT PRIMARY KEY NOT NULL)");

    try
    {
      stmt.executeStep();
    }
    catch(exception)
    {
      TransitCommon.alert("Error during upgrade to version "+this.version+". Message: "+exception);
      return(false);
    }
    finally 
    {
      stmt.reset();
    }
    
    // now add a row
    stmt = connection.createStatement("insert into jwe_runtime (version) values (:version)");
    stmt.params.version = this.version;
    
    try
    {
      stmt.executeStep();
    }
    catch(exception)
    {
      TransitCommon.alert("Error during upgrade to version "+this.version+". Message: "+exception);
      return(false);
    }
    finally 
    {
      stmt.reset();
    }
    
    return(true);
  },
};

var Target_1_2_2_20100729 = 
{
  depends : Target_1_2_2_20100722,
  
  version : "1_2_2_20100729",
  
  upgrade : function(connection)
  {
    var stmt = connection.createStatement("ALTER TABLE jwe_device_profile add jil_spec TEXT DEFAULT '1.2.2' NOT NULL");

    try
    {
      stmt.executeStep();
    }
    catch(exception)
    {
      TransitCommon.alert("Error during upgrade to version "+this.version+". Message: "+exception);
      return(false);
    }
    finally 
    {
      stmt.reset();
    }
    return(true);
  },
};

var Target_Current = Target_1_2_2_20100729;

/***********************************************************/

var UpgradeService = 
{  
  currentVersion : null,
  
  checkUpgrade : function(sqlFile)
  {    
    // get the current version of the db, if none, need to do all upgrades
    var upgradeAll = false;
    var currentVersion = null;
    var connection = this.getConnection(sqlFile);
    
    try
    {
      var stmt = connection.createStatement("SELECT count(*) as table_count FROM sqlite_master where tbl_name = 'jwe_runtime';");
      
      while ( stmt.step() )
      {
        if ( stmt.row.table_count > 0 )
        {
          TransitCommon.debug("Current database contains a jwe_runtime table, checking current version.");
          var stmt_ver = connection.createStatement("SELECT version from jwe_runtime");
          
          try
          {
            while ( stmt_ver.step() )
              this.currentVersion = stmt_ver.row.version;
          }
          catch(exception)
          {
            TransitCommon.alert("Unrecoverable error, could not detect current database version. Error: "+exception);
          }
          finally
          {
            stmt_ver.reset();
          }
        }
        else
        {
          TransitCommon.debug("Current database does not contain a jwe_runtime table, adding one.");
          upgradeAll = true;
        }
      }
    }
    catch(exception)
    {
      TransitCommon.alert("Unrecoverable error, could not detect current database version. Error: "+exception);
    }
    finally 
    {
      stmt.reset();
    }
    
    TransitCommon.debug("Current database version is "+this.currentVersion+" (if null, will upgrade all).");

    if ( (Target_Current.version != this.currentVersion) || upgradeAll )
    {
      if ( upgradeAll )
        TransitCommon.alert("Your profile database requires an upgrade to DB "+Target_Current.version+" to use this version of the Transit Emulator. Will be upgrading from very first patchable DB.");
      else
        TransitCommon.alert("Your profile database requires upgrade to DB "+Target_Current.version+" to use this version of the Transit Emulator. Will be upgrading from DB "+this.currentVersion+". If an error occurs, your profile database will not be changed.");
      
      connection.beginTransaction();
      
      try
      {
        this.upgradeVersion(Target_Current, connection);
        
        TransitCommon.debug("Upgrades done, updating current version to latest.");
        
        // now set the current version in the database
        var stmt = connection.createStatement("update jwe_runtime set version = :version");
        stmt.params.version = Target_Current.version;
        
        try
        {
          stmt.executeStep();
        }
        catch(exception)
        {
          TransitCommon.alert("Error setting current version to "+Target_Current.version+". Message: "+exception);
        }
        finally 
        {
          stmt.reset();
        }
        
        connection.commitTransaction();
        
        TransitCommon.alert("Your profile database has been successfull upgraded to the current version.");  
      }
      catch(ex)
      {
        TransitCommon.alert("Your profile database has been rolled back and no changes have been made. Please seek assistance from the Transit project home page with the error messages received. Error: "+ex);     
        
        connection.rollbackTransaction();
      }
    }
    else
       TransitCommon.debug("Your profile database does not require an upgrade, already at current version ("+this.currentVersion+")");
  },
  
  upgradeVersion : function(target, connection)
  {
    // first see if this is the current version, if so, nothing to do
    if ( target.version == this.currentVersion )
    {
      TransitCommon.debug("Upgrade to "+target.version+" called on current version, nothing to do.");
      return;
    }
    
    if ( target.depends )
    {
      TransitCommon.debug("Upgrade "+target.version+" is dependent on another version, upgrading to that version.");
      this.upgradeVersion(target.depends, connection);
    }
    
    TransitCommon.debug("Upgrading to "+target.version);
    target.upgrade(connection);
  },
  
  getConnection : function(sqlFile)
  {
    var storageService = Components.classes["@mozilla.org/storage/service;1"]  
                        .getService(Components.interfaces.mozIStorageService);  
    return(storageService.openDatabase(sqlFile));
  },
};

