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

var EXPORTED_SYMBOLS = [];

Components.utils.import("resource://transit-emulator/TransitCommon.jsm");

Components.utils.import("resource://transit-emulator/api/wac/1.0/Widget.jsm");

var Billing =
{
  catalogHost : "http://example.com",
  
  // failures: (itemId, ErrorDescription, CSGErrorCode, CSGErrorDescription)
  CancelSubscription_onFailureCallback : null,
  checkItemAuthorization_onFailureCallback : null,
  getPricePoints_onFailureCallback : null,
  requestPurchase_onFailureCallback : null,
  
  // successes: (itemId, Success, CSGStatusCode)
  CancelSubscription_onSuccessCallback : null,
  checkItemAuthorization_onSuccessCallback : null,
  getPricePoints_onSuccessCallback : null,
  requestPurchase_onSuccessCallback : null,
  
  CancelSubscription : function(itemId, onSuccessCallback, onFailureCallback)
  {
    var req = Components.classes["@mozilla.org/xmlextras/xmlhttprequest;1"].createInstance(Components.interfaces.nsIXMLHttpRequest);

    var widHash = this.getHash(itemId);
    req.open("GET", this.catalogHost+"/opco-sandbox/store/catalog/id/"+widHash+"{", true);
    req.onreadystatechange = function () 
    {
      if ( (req.readyState == 4) && (req.status == 200) )
      {
        req.responseText
      }
    };
    req.send(null);
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
    ch.init(ch.SHA256);
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