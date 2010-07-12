package org.jil.ide.libraries;


import org.eclipse.core.runtime.IPath;
import org.eclipse.core.runtime.Path;
import org.eclipse.jface.resource.ImageDescriptor;
import org.eclipse.wst.jsdt.core.IJavaScriptProject;
import org.eclipse.wst.jsdt.internal.ui.IJsGlobalScopeContainerInitializerExtension;

@SuppressWarnings("restriction")
public class WidgetLibraryContainerUIExtension implements IJsGlobalScopeContainerInitializerExtension {

	@Override
	public ImageDescriptor getImage(IPath arg0, String arg1,
			IJavaScriptProject arg2) {
		if (arg0 == null) {
		      return null;
		    }

		    String requestedContainerPath = new Path(arg1).lastSegment();

		    if ((requestedContainerPath != null) && (requestedContainerPath.equalsIgnoreCase("js"))) return null;
		    return ImageDescriptor.createFromFile(super.getClass(), "");
	}

	
	
}
