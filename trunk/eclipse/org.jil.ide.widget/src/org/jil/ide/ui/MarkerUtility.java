package org.jil.ide.ui;

import org.eclipse.core.resources.IFile;
import org.eclipse.core.resources.IMarker;
import org.eclipse.core.runtime.CoreException;
import org.jil.ide.util.JILConstants;

public class MarkerUtility {

	public static  void addMarker(IFile file, String message, int lineNumber,
			int severity) {
		try {
			IMarker marker = file
					.createMarker(JILConstants.MARKER_ID);
			marker.setAttribute("message", message);
			marker.setAttribute("severity", severity);
			if (lineNumber == -1) {
				lineNumber = 1;
			}
			marker.setAttribute("lineNumber", lineNumber);
		} catch (CoreException localCoreException) {
		}
	}

	public static void deleteMarkers(IFile file) {
		try {
			file.deleteMarkers(JILConstants.MARKER_ID, false, 0);
		} catch (CoreException localCoreException) {
		}
	}

}
