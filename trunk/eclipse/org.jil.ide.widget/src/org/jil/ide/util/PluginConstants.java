package org.jil.ide.util;

import org.eclipse.core.runtime.QualifiedName;

public interface PluginConstants {
	
	
	 /**
	    * plugin id from plugin.xml
	    */
	   public static final String PLUGIN_ID = "org.jil.ide.widget";
	   
	   public static final String DEFAULT_SOURCE_DIR = "src";
	   
	   public static final String DEFAULT_BIN_DIR = "bin";
	   
	   
	   public static final String WIDGET_EXTENSION ="wgt";
	   
	   /**
	    * JIL project nature (for .project)
	    */
	   public static final String NATURE_ID = "org.jil.ide.widgetNature";
	   
	   public static final String PROJECT_NAME = "PROJECT_NAME";
	   public static final String PROJECT_DESCRIPTION = "PROJECT_DESCRIPTION";
	   public static final String LICENCE_URL = "LICENCE_URL";
	   public static final String AUTHER_EMAIL = "AUTHER_EMAIL";
	   public static final String AUTHER_NAME = "AUTHER_NAME";
	   public static final String DEVELOPER_NAME = "DEVELOPER_NAME";
	   
	   
	   public static final String JIL12_CONFIG_TEMPLATE = "/templates/jil12";
	   public static final String JIL11_CONFIG_TEMPLATE = "/templates/jil11";
	   
	   public static final String PROPERTY_NAMESPACE = "jil";
	   
	   public static final String JIL_VERSION= "JIL_VERSION";
	   
	   public static final String API_CATEGORY= "API_CATEGORY";
	   
	   
	   public static final QualifiedName JIL_WIDGET_VERSION =
		      new QualifiedName(PROPERTY_NAMESPACE,JIL_VERSION);
	   
	   public static final QualifiedName JIL_API_CATEGORY =
		      new QualifiedName(PROPERTY_NAMESPACE,API_CATEGORY);
	   
	   
	   

}
