package org.jil.ide.util;

import javax.xml.transform.TransformerException;

import org.eclipse.core.resources.IProject;
import org.eclipse.core.resources.IResource;
import org.eclipse.core.runtime.CoreException;
import org.eclipse.core.runtime.IStatus;
import org.eclipse.core.runtime.Status;
import org.eclipse.jface.viewers.StructuredSelection;
import org.eclipse.ui.views.navigator.ResourceNavigator;
import org.xml.sax.SAXException;

/**
 * Utility methods for the project. This is where I place methods that are not
 * tied to a specific class.
 * 
 * @author Khullar
 */
public class PluginTools {
	/**
	 * Create an IStatus object from an exception.
	 * 
	 * @param x
	 *            exception to process
	 * @return IStatus status object for the above exception
	 */
	public static IStatus makeStatus(Exception x) {
		Throwable t = popThrowables(x);
		if (t instanceof CoreException)
			return ((CoreException) t).getStatus();
		else
			return new Status(IStatus.ERROR, PluginConstants.PLUGIN_ID,
					IStatus.ERROR, x.getMessage(), t);
	}

	/**
	 * A helpful method . It walks through exceptions chains until it reaches
	 * the original one. Indeed it's not uncommon for TransformerException or
	 * SAXException to hold another exception that itself may hold another
	 * exception. The result? Unreadable error messages where the original error
	 * (say ArrayOutOfBoundsException) is lost in a sea of TransformerException.
	 * 
	 * @param t
	 *            exception to process
	 * @return original exception, if any
	 */
	public static Throwable popThrowables(Throwable t) {
		/*
		 * if(t instanceof JILException) { if(((JILException)t).getException()
		 * != null) return popThrowables(((JILException)t).getException());
		 * return t; } else
		 */if (t instanceof TransformerException) {
			if (((TransformerException) t).getCause() != null)
				return popThrowables(((TransformerException) t).getCause());
		} else if (t instanceof SAXException) {
			if (((SAXException) t).getException() != null)
				return popThrowables(((SAXException) t).getException());
		}
		return t;
	}

	@SuppressWarnings("restriction")
	public static IProject getActiveProject(){
	   
			org.eclipse.ui.IViewPart[] parts =   org.jil.ide.Activator.getDefault().getWorkbench()
						.getActiveWorkbenchWindow().getActivePage().getViews();
			IProject activeProject = null;

			for(int i=0;i< parts.length;i++ ){
			if(parts[i] instanceof ResourceNavigator){
				ResourceNavigator navigator = (ResourceNavigator)parts[i] ;
				StructuredSelection sel =
						(StructuredSelection)navigator.getTreeViewer().getSelection();
				IResource resource = (IResource)sel.getFirstElement();
				activeProject = resource.getProject();
				break;
				}
			} 
			
			return activeProject;
   }
}