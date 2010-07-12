package org.jil.ide.builder;

import java.io.File;
import java.io.FileInputStream;
import java.io.FileOutputStream;
import java.io.IOException;
import java.util.Map;
import java.util.zip.ZipEntry;
import java.util.zip.ZipOutputStream;

import javax.xml.validation.Validator;

import org.eclipse.core.resources.IFile;
import org.eclipse.core.resources.IFolder;
import org.eclipse.core.resources.IProject;
import org.eclipse.core.resources.IncrementalProjectBuilder;
import org.eclipse.core.runtime.CoreException;
import org.eclipse.core.runtime.IPath;
import org.eclipse.core.runtime.IProgressMonitor;
import org.eclipse.core.runtime.Path;
import org.eclipse.core.runtime.Status;
import org.jil.ide.builder.validation.JILValidator;
import org.jil.ide.builder.validation.ValidatorFactory;
import org.jil.ide.ui.MarkerUtility;
import org.jil.ide.util.JILConstants;
import org.jil.ide.util.ZipUtil;

public class WidgetBuilder extends  IncrementalProjectBuilder{

	@Override
	protected IProject[] build(int arg0, Map arg1, IProgressMonitor monitor)
			throws CoreException {
		IProject project = getProject();

		String binPath = "bin/";
		String pkgName = project.getName() + ".wgt";

		IFile packageFile = project.getFile(binPath + pkgName);
		packageFile.delete(true, monitor);

		fullBuild(monitor);

		return null;
	}

	protected void fullBuild(IProgressMonitor monitor) throws CoreException {
		IProject project = getProject();
		monitor.beginTask("Build Widget", 100);
		try {
			
            System.out.println("  builing project ...");
			//project.accept(new WidgetResourceVisitor());
			packageWidget();
			project.refreshLocal(2, monitor);
			
			ConfigEditor configEditor = new ConfigEditor(project);
			
			
			String projectPath = project.getLocation().toOSString();
			String projectSrcPath = projectPath + File.separator + "src";
			
			System.out.println("  projectSrcPath  : " + projectSrcPath );
			
			
			configEditor.checkJSfilesFromDir(new File(projectSrcPath));
			
			
		} catch (IOException e) {
			e.printStackTrace();
			Status status = new Status(4, "org.jil.eclipse", 1, e.getMessage(), null);
			throw new CoreException(status);
		} finally {
			monitor.done();
		}
	}
	
	
	
	public void packageWidget() throws IOException {
	      /*IProject project = getProject();
	    
	      String projectPath = project.getLocation().toOSString();
	      
	      
	      String widgetName = project.getName() + ".wgt";

	      String pkgName = projectPath + "/" + "bin" + "/" + widgetName;
	      String zipPath = "";
	      
	      // Validate the config.xml
	      JILValidator vaidator =  ValidatorFactory.getJILValidator(JILConstants.JIL12, project);
	      IPath configPath = new Path("src");
	      configPath = configPath.append("config.xml"); 
	      
	      IFile configFile  = project.getFile(configPath);  
	      
	      //vaidator.validate(configFile);
	      
	      String projectSrcPath = projectPath + File.separator + "src";
	      ZipUtil.packageSource(projectSrcPath, pkgName,zipPath);*/
	      	    
	  }

	  

	  protected void clean(IProgressMonitor monitor) {
	    IProject project = getProject();

	    String binPath = "bin/";
	    String pkgName = project.getName() + ".wgt";

	    IFile packageFile = project.getFile(binPath + pkgName);
	    try {
	      packageFile.delete(true, monitor);
	    } catch (Exception e) {
	      e.printStackTrace();
	    }
	  }
	
	

}
