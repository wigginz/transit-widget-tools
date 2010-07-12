package org.jil.ide.libraries;

import org.eclipse.core.runtime.IPath;
import org.eclipse.core.runtime.Path;
import org.eclipse.wst.jsdt.core.IJavaScriptProject;
import org.eclipse.wst.jsdt.core.IJsGlobalScopeContainer;
import org.eclipse.wst.jsdt.core.JavaScriptCore;
import org.eclipse.wst.jsdt.core.JsGlobalScopeContainerInitializer;
import org.eclipse.wst.jsdt.internal.ui.wizards.buildpaths.CPListElement;
import org.eclipse.wst.jsdt.internal.ui.wizards.buildpaths.CPUserLibraryElement;

@SuppressWarnings("restriction")
public class CPWidgetLibraryElement extends CPUserLibraryElement {

	 protected static final String CONTAINER_ID = "org.jil.ide.libraries.widgetLibrary";
	 
	public CPWidgetLibraryElement(String name, CPListElement[] children) {
		super(name, children);
		
		JsGlobalScopeContainerInitializer initializer = JavaScriptCore.getJsGlobalScopeContainerInitializer(CONTAINER_ID);
		
		
		
		//initializer.requestJsGlobalScopeContainerUpdate(containerPath, project, containerSuggestion)
		
		
	}

	public CPWidgetLibraryElement(String name,
			IJsGlobalScopeContainer container, IJavaScriptProject project) {
		super(name, container, project);
	}

	@Override
	public IPath getPath() {
		return new Path(CONTAINER_ID);
	}

	
	
	

}
