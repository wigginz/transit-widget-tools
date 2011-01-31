var EXPORTED_SYMBOLS = ["Camera"];

Components.utils.import("resource://transit-runtime/api/jil/SecurityManager.jsm");

var _Camera_122 = Components.classes["@jil.org/jilapi-camera;1"].getService(Components.interfaces.jilCamera);

function Camera()
{
  this.onCameraCaptured = null;
}

Camera.prototype = function()
{
};

Camera.prototype.toString = function()
{
  return("Widget.Multimedia.Camera");
};

Camera.prototype.onCameraCaptured = null;

Camera.prototype.captureImage = function(fileName, lowRes)
{
  var result = null;
  SecurityManager.checkSecurity("Capture Camera Image (Camera.captureImage)", SecurityManager.OP_ONE_SHOT, SecurityManager.OP_BLANKET, SecurityManager.OP_ALLOWED, function()
  {
    result = _Camera_122.captureImage(fileName, lowRes);
  });
  return(result);
};
  
Camera.prototype.startVideoCapture = function(fileName, lowRes, maxDurationSeconds, showDefaultControls)
{
  var result = null;
  SecurityManager.checkSecurity("Capture Camera Video (Camera.startVideoCapture)", SecurityManager.OP_ONE_SHOT, SecurityManager.OP_BLANKET, SecurityManager.OP_ALLOWED, function()
  {
    result = _Camera_122.startVideoCapture(fileName, lowRes, maxDurationSeconds, showDefaultControls);
  });
  return(result);
};
  
Camera.prototype.setWindow = function(domObj)
{
  _Camera_122.setWindow(domObj);
};

Camera.prototype.stopVideoCapture = function()
{
  SecurityManager.checkSecurity("Stop Capture Camera Video (Camera.stopVideoCapture)", SecurityManager.OP_ONE_SHOT, SecurityManager.OP_BLANKET, SecurityManager.OP_ALLOWED, function()
  {
    _Camera_122.stopVideoCapture();
  });
};