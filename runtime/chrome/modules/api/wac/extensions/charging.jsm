//   URL : GET http://<<host:port>>/opco-sandbox/store/catalog/id/<<SHA1 or SHA256 of widget id>>/version/<<version>>
// 
//   Response
// 
//   {
//   "id":"widget id ",
//   "version":"1.2Beta",
//   "title":"helloworld widget title",
//   "description":"this is helloworld widget, that mkes you happy",
//   "price":[
//   {"pid": "PP00X1","currency": "USD", "value": 1.99  },
//   {"pid": "PP00X2","currency": "USD", "value": 2.99 }
//   ],
//   "cid":"catalog id ",
//   }
// 
// 
// 
//   Purchase : POST http://<<host:port>>/opco-sandbox/store/purchase/id/<<SHA1 or SHA256 of widget id>>/pid/<<price id>>
// 
//   Response : HTTP code

// TODO to clarify:
// 
//   - everything but a 200 would be an error?


var EXPORTED_SYMBOLS = ["OpCoStore"];

Components.utils.import("resource://transit-runtime/TransitCommon.jsm");

Components.utils.import("resource://transit-runtime/api/wac/1.0/Widget.jsm");

var runtime = Components.classes["@jil.org/jilapi-emulatorruntime;1"].getService().wrappedJSObject;

var OpCoStore =
{
  showStoreDialog : null,
};

var Billing =
{
  crossSellUrl : runtime.getCrossSellUrl(),
  
  // failures: (itemId, ErrorDescription, CSGErrorCode, CSGErrorDescription)  
  // successes: (itemId, Success, CSGStatusCode)
  
  initiatePurchase : function(itemId, onSuccessCallback, onFailureCallback)
  {
    var storeDialog = runtime.getFromCache("store-dialog");
    
    var req = Components.classes["@mozilla.org/xmlextras/xmlhttprequest;1"].createInstance(Components.interfaces.nsIXMLHttpRequest);
    
    var widHash = this.getHash(itemId);    
    var realUrl = this.crossSellUrl.replace(/\{widgetId\}/, widHash);
    req.open("GET", realUrl, true);
    
    req.onreadystatechange = function () 
    {
      if ( (req.readyState == 4) && (req.status == 200) )
      {
        var response = JSON.parse(req.responseText);
        storeDialog(response.title, response.description, response.price[0].value, 
          function()
          {
            onSuccessCallback(true);
          },
          function()
          {
            onFailureCallback(false);
          });
      }
      else
      {
      }
    };
    req.send(null);
  },
  
  CancelSubscription : function(itemId, onSuccessCallback, onFailureCallback)
  {    
  },
   
  checkItemAuthorization : function(itemId, onSuccessCallback, onFailureCallback)
  {
  },
  
  getPricePoints : function(itemId, onSuccessCallback, onFailureCallback)
  {
    
  },
  
  requestPurchase : function(itemId, description, onSuccessCallback, onFailureCallback)
  {
  },
  
  getHash : function(toHash)
  {
    var converter = Components.classes["@mozilla.org/intl/scriptableunicodeconverter"].createInstance(Components.interfaces.nsIScriptableUnicodeConverter);

    converter.charset = "UTF-8";
    
    // result is an out parameter,
    // result.value will contain the array length
    var result = {};
    // data is an array of bytes
    var data = converter.convertToByteArray(toHash, result);
    var ch = Components.classes["@mozilla.org/security/hash;1"]
                       .createInstance(Components.interfaces.nsICryptoHash);
    ch.init(ch.SHA1);
    ch.update(data, data.length);
    var hash = ch.finish(false);

    // return the two-digit hexadecimal code for a byte
    function toHexString(charCode)
    {
      return ("0" + charCode.toString(16)).slice(-2);
    }

    // convert the binary hash data to a hex string.
    var hashed = [toHexString(hash.charCodeAt(i)) for (i in hash)].join("");    
    return(hashed);
  },
};

Widget.Billing = Billing;