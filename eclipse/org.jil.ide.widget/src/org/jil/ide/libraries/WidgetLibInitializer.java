package org.jil.ide.libraries;

import java.io.File;

import org.eclipse.core.resources.IProject;
import org.eclipse.core.runtime.CoreException;
import org.eclipse.core.runtime.IPath;
import org.eclipse.core.runtime.Path;
import org.eclipse.wst.jsdt.core.IJavaScriptProject;
import org.eclipse.wst.jsdt.core.IJsGlobalScopeContainer;
import org.eclipse.wst.jsdt.core.IJsGlobalScopeContainerInitializer;
import org.eclipse.wst.jsdt.core.JsGlobalScopeContainerInitializer;
import org.eclipse.wst.jsdt.core.compiler.libraries.LibraryLocation;
import org.eclipse.wst.jsdt.core.compiler.libraries.SystemLibraryLocation;
import org.jil.ide.Activator;

public class WidgetLibInitializer extends JsGlobalScopeContainerInitializer
		implements IJsGlobalScopeContainerInitializer {

	 protected static final String CONTAINER_ID = "org.jil.ide.libraries.widgetLibrary";
	 protected static final String ContainerDescription = "Widget Support Library";
	 protected static final String PLUGIN_ID = Activator.PLUGIN_ID;
	
	 protected IProject project ;
	 
	 
	 
	 
	public WidgetLibInitializer() {
		super();
		// TODO Auto-generated constructor stub
	}

	
	@Override
	public LibraryLocation getLibraryLocation() {
		System.out.println(" getLibraryLocation ");
		return WidgetLibLocationNew.getInstance(project);
	}
	
	@Override
	public void initialize(IPath containerPath, IJavaScriptProject project)
			throws CoreException {
		this.project = project.getProject();
		super.initialize(containerPath, project);
	}


	public String getDescription(IPath containerPath, IJavaScriptProject project) {
		return ContainerDescription;
	}

	public String getDescription() {
		return ContainerDescription;
	}

	public IPath getPath() {
		return new Path(CONTAINER_ID);
	}

	public int getKind() {
		return IJsGlobalScopeContainer.K_SYSTEM;
	}

	public boolean canUpdateJsGlobalScopeContainer(IPath containerPath,
			IJavaScriptProject project) {
		return true;
	}
	
	 public String[] containerSuperTypes()
	  {
	    return new String[] { "window" };
	  }
	 
	public String getInferenceID() {
		    return "org.eclipse.wst.jsdt.core.infer.DefaultInferrenceProvider";
	}

	/*static class WidgetLibLocation extends SystemLibraryLocation {
		
		private static LibraryLocation fInstance;
		
		
		public char[][] getLibraryFileNames() {
			String  libPath =  getLibraryPathInPlugin().toString();
			return getAllFilesInPluginDirectory(libPath);
		}

		protected String getPluginId() {
			return PLUGIN_ID;
		}

		public static LibraryLocation getInstance() {
			if (fInstance == null) {
				fInstance = new WidgetLibLocation();
			}
			return fInstance;
		}
	}*/
}
