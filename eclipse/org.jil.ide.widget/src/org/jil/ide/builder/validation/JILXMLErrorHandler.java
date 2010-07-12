package org.jil.ide.builder.validation;

import org.eclipse.core.resources.IFile;
import org.jil.ide.ui.MarkerUtility;
import org.xml.sax.SAXException;
import org.xml.sax.SAXParseException;
import org.xml.sax.helpers.DefaultHandler;

public class JILXMLErrorHandler extends DefaultHandler {
	private boolean validationError = false;
	private SAXParseException saxParseException = null;
	
	private IFile file;
	
	public JILXMLErrorHandler(IFile file ){
		this.file = file;
		MarkerUtility.deleteMarkers(file);
	}
	
	public void error(SAXParseException ex) throws SAXException {
		System.out.println(" ERROR :" + ex.getLineNumber() + " Message"
				+ ex.getMessage());
		validationError = true;
		saxParseException = ex;
		MarkerUtility.addMarker(file, ex.getMessage(), ex.getLineNumber(), 2);
		System.out.println(ex.getLineNumber());

	}

	public void fatalError(SAXParseException ex) throws SAXException {
		System.out.println("Fatal  ERROR :" + ex.getLineNumber()
				+ " Message" + ex.getMessage());
		validationError = true;
		saxParseException = ex;
		MarkerUtility.addMarker(file, ex.getMessage(), ex.getLineNumber(), 2);
	}

	public void warning(SAXParseException ex) throws SAXException {
		System.out.println("Warning :" + ex.getLineNumber() + " Message"
				+ ex.getMessage());
		MarkerUtility.addMarker(file, ex.getMessage(), ex.getLineNumber(), 1);
	}
}
