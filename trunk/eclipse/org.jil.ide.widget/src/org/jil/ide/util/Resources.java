package org.jil.ide.util;

import java.util.MissingResourceException;
import java.util.ResourceBundle;

public class Resources {

	
	 /**
	    * the ResourceBundle for this project
	    */
	   public static final ResourceBundle resources =
	      ResourceBundle.getBundle("org.jil.ide.util.Strings");

	   /**
	    * returns the resource string associated with the key
	    * @param key the resource key
	    * @return the resource string
	    * @throw MissingResourceException if the resource is missing
	    */
	   public static final String getString(String key)
	      throws MissingResourceException
	   {
	      return resources.getString(key);
	   }
}
