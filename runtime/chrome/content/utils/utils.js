var jwe_utils =
{
  create: function(type, id)
  {
    var elem = document.createElement(type);
    elem.setAttribute("id", id);
    return(elem);
  },
};

// borrowing some inspiration from jquery to simplify things a bit
function $(id)
{
  return {
  
    nodeId: id,
    
    node : document.getElementById(id),

    attr : function(key, value)
    {
      this.node.setAttribute(key, value);
    },

    css : function(name, value)
    {
      try
      {
        this.node.style[name] = value;
      }
      catch(exception)
      {
        dump(this.nodeId+"\n");
      }
    },

    sel : function(index)
    {
      if ( index == null )
        return(this.node.selectedIndex);
      else
        this.node.selectedIndex = index;
    },

    selValue : function(index)
    {
      if ( index == null )
        return(this.node.getItemAtIndex(this.sel()).value);
      else
        return(this.node.getItemAtIndex(index).value);
    },

    selLabel : function(index)
    {
      if ( index == null )
        return(this.node.getItemAtIndex(this.sel()).getAttribute("label"));
      else
        return(this.node.getItemAtIndex(index).getAttribute("label"));
    },
    
    selLabelVal : function(value)
    {
      return(this.node.getItemAtIndex(this.sel()).setAttribute("label", value));
    },

    add : function(child)
    {
      this.node.appendChild(child);
    },

    val : function(newVal)
    {
      if ( newVal == null )
        return(this.node.value);
      else
        this.node.value = newVal;
    },

    chk : function(isChecked)
    {
      if ( isChecked == null )
        return(this.node.checked);
      else
        this.node.checked = isChecked;
    },

    disable : function(isDisabled)
    {
      if ( isDisabled == null )
        return(this.node.disabled);
      else
        this.node.disabled = isDisabled;
    },

    hide : function()
    {
      this.node.style.display = "none";
    },

    show : function()
    {
      this.node.style.display = "block";
    },
    
    addClass : function(class)
    {
      this.node.className = this.node.className+" "+class;
    },
  };
}



function jwe_getFileName(path)
{
  var path = path.substring(0, (path.indexOf("#") == -1) ? path.length : path.indexOf("#"));
  //this removes the query after the file name, if there is one
  path = path.substring(0, (path.indexOf("?") == -1) ? path.length : path.indexOf("?"));
  //this removes everything before the last slash in the path
  path = path.substring(path.lastIndexOf("/") + 1, path.length);
  
  return path;
}