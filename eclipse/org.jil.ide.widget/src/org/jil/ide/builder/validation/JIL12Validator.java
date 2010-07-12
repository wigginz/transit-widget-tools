package org.jil.ide.builder.validation;

import java.io.File;
import java.io.IOException;
import java.net.URL;

import javax.xml.XMLConstants;
import javax.xml.parsers.DocumentBuilder;
import javax.xml.parsers.DocumentBuilderFactory;
import javax.xml.parsers.ParserConfigurationException;
import javax.xml.transform.sax.SAXSource;
import javax.xml.transform.stream.StreamSource;
import javax.xml.validation.Schema;
import javax.xml.validation.SchemaFactory;

import org.eclipse.core.resources.IFile;
import org.eclipse.core.resources.IProject;
import org.eclipse.core.runtime.FileLocator;
import org.eclipse.core.runtime.IPath;
import org.eclipse.core.runtime.IPluginDescriptor;
import org.eclipse.core.runtime.Path;
import org.eclipse.core.runtime.Platform;
import org.eclipse.core.runtime.Plugin;
import org.eclipse.osgi.baseadaptor.bundlefile.BundleEntry;
import org.eclipse.osgi.baseadaptor.bundlefile.FileBundleEntry;
import org.jil.ide.util.Common;
import org.jil.ide.util.JILConstants;
import org.jil.ide.util.PluginConstants;
import org.osgi.framework.Bundle;
import org.w3c.dom.Document;
import org.xml.sax.InputSource;
import org.xml.sax.SAXException;
import org.xml.sax.SAXParseException;
import org.xml.sax.helpers.DefaultHandler;


public class JIL12Validator extends  JILValidator {
	
	public JIL12Validator(IProject project){
		super(project);
	}

	@Override
	public boolean validate(IFile file) {
		
		DocumentBuilderFactory factory =     DocumentBuilderFactory.newInstance();
		factory.setNamespaceAware(true);
		factory.setValidating(true);
		
		try {
		
			Schema schema  =  loadSchema(JILConstants.JIL12_SCHEMA_PATH);
			validateXml(schema ,file );
			
			
			
		} catch (ParserConfigurationException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		} catch (SAXException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		} catch (IOException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}catch (Exception e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
		
		return false;
	}
	
	
	public  void validateXml(Schema schema, IFile xmlFile) {
	    try {
	      
	      javax.xml.validation.Validator  validator = schema.newValidator();
          //set ErrorHandle on this validator
	      
	      validator.setErrorHandler(new JILXMLErrorHandler(xmlFile));
          //Validate this instance document against the instance document supplied
          File srcFile =  xmlFile.getLocation().toFile();
          validator.validate(new StreamSource(srcFile));
	      
	      System.out.println("Validation passed.");
	    } catch (Exception e) {
	      // catching all validation exceptions
	      System.out.println(" Validation Exception " + e.toString());
	    }
	  }

	
	public Schema loadSchema(String name) throws Exception {
		    Schema schema = null;
		    try {
		      String language = XMLConstants.W3C_XML_SCHEMA_NS_URI;
		      SchemaFactory factory = SchemaFactory.newInstance(language);
		      String path =  Common.getResource(name);
		      File schFile = new File(path);
		      System.out.println(schFile.getPath());
		      schema = factory.newSchema(schFile);
		    } catch (Exception e) {
		    	System.out.println(e.toString());
		      throw e;
		    }
		    return schema;
	}
	
	
	

	  
	

}
