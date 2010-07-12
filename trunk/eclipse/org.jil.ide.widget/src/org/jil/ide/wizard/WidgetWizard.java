package org.jil.ide.wizard;

import java.io.ByteArrayInputStream;
import java.io.File;
import java.io.IOException;
import java.io.InputStream;
import java.io.UnsupportedEncodingException;
import java.lang.reflect.InvocationTargetException;
import java.security.MessageDigest;
import java.util.HashMap;
import java.util.Map;

import org.eclipse.core.resources.IContainer;
import org.eclipse.core.resources.IFile;
import org.eclipse.core.resources.IFolder;
import org.eclipse.core.resources.IProject;
import org.eclipse.core.resources.IProjectDescription;
import org.eclipse.core.resources.ResourcesPlugin;
import org.eclipse.core.runtime.CoreException;
import org.eclipse.core.runtime.IPath;
import org.eclipse.core.runtime.IProgressMonitor;
import org.eclipse.core.runtime.NullProgressMonitor;
import org.eclipse.core.runtime.Path;
import org.eclipse.core.runtime.Platform;
import org.eclipse.core.runtime.SubProgressMonitor;
import org.eclipse.jface.dialogs.ErrorDialog;
import org.eclipse.jface.resource.ImageDescriptor;
import org.eclipse.jface.viewers.IStructuredSelection;
import org.eclipse.jface.wizard.Wizard;
import org.eclipse.ui.INewWizard;
import org.eclipse.ui.IWorkbench;
import org.eclipse.ui.actions.WorkspaceModifyOperation;
import org.jil.ide.builder.WidgetNature;
import org.jil.ide.libraries.WidgetLibLocationNew;
import org.jil.ide.ui.ProjectProperties;
import org.jil.ide.util.Common;
import org.jil.ide.util.JILConstants;
import org.jil.ide.util.PluginConstants;
import org.jil.ide.util.PluginTools;
import org.jil.ide.util.Resources;
import org.jil.ide.wizard.WidgetWizardPage.DevelopeName;

public class WidgetWizard extends Wizard implements INewWizard, PluginConstants {
	/**
	 * The main page on the wizard: collects the project name and location.
	 */
	// private WizardNewProjectCreationPage namePage;

	private WidgetWizardPage namePage;

	protected IProject project;
	private String lastProjectName;
	private IPath lastProjectLocation;

	/**
	 * @see org.eclipse.ui.IWorkbenchWizard#init(org.eclipse.ui.IWorkbench,
	 *      org.eclipse.jface.viewers.IStructuredSelection)
	 */
	@Override
	public void init(IWorkbench workbench, IStructuredSelection selection) {
		setNeedsProgressMonitor(true);
	}

	/**
	 * @see org.eclipse.jface.wizard.IWizard#addPages()
	 */
	public void addPages() {
		try {
			super.addPages();
			namePage = new WidgetWizardPage("JIL Widget Project");
			namePage.setTitle(Resources.getString("eclipse.newprojectname"));
			namePage.setDescription(Resources
					.getString("eclipse.newprojectdescription"));
			namePage.setImageDescriptor(ImageDescriptor.createFromFile(
					getClass(), "/org/jil/ide/resources/jil.png"));

			addPage(namePage);

		} catch (Exception x) {
			reportError(x);
		}
	}

	/**
	 * Displays an error that occured during the project creation.
	 * 
	 * @param x
	 *            details on the error
	 */
	private void reportError(Exception x) {
		ErrorDialog.openError(getShell(), Resources
				.getString("eclipse.dialogtitle"), Resources
				.getString("eclipse.projecterror"), PluginTools.makeStatus(x));
	}

	@Override
	public boolean performFinish() {
		try {

			getContainer().run(false, true, new WorkspaceModifyOperation() {
				protected void execute(IProgressMonitor monitor) {
					createProject(monitor != null ? monitor
							: new NullProgressMonitor());
				}
			});
		} catch (InvocationTargetException x) {
			reportError(x);
			return false;
		} catch (InterruptedException x) {
			reportError(x);
			return false;
		}
		return true;
	}

	protected void createProject(IProgressMonitor monitor) {
		monitor.beginTask(Resources.getString("eclipse.creatingproject"), 50);

		IProject project = namePage.getProjectHandle();
		IProjectDescription description = ResourcesPlugin.getWorkspace()
				.newProjectDescription(project.getName());
		InputStream configIS = null;
		try {
			if (!Platform.getLocation().equals(namePage.getLocationPath()))
				description.setLocation(namePage.getLocationPath());
			
			System.out.println(" create project ");
			project.create(description, monitor);
		} catch (CoreException e1) {
			e1.printStackTrace();
		}

		try {
			project.open(128, new SubProgressMonitor(monitor, 20));
		} catch (CoreException e1) {
			e1.printStackTrace();
		}

		try {
//			WidgetLibLocation.getInstance(1);
			System.out.println(" create project : setupProjectNatures ");
			WidgetNature.setupProjectNatures(project, monitor);
		} catch (CoreException e1) {
			e1.printStackTrace();
		}

		try {

			monitor.worked(10);
			project.open(monitor);
			description = project.getDescription();
			project.setDescription(description, new SubProgressMonitor(monitor,
					10));

			IPath projectPath = project.getFullPath(), srcPath = new Path(
					DEFAULT_SOURCE_DIR), binPath = new Path(DEFAULT_BIN_DIR);

			IFolder srcFolder = namePage.getProjectHandle().getFolder(srcPath), binFolder = namePage
					.getProjectHandle().getFolder(binPath);

			createFolderHelper(srcFolder, monitor);
			createFolderHelper(binFolder, monitor);

			System.out.println(namePage.getDeveloperName().getText());
			System.out.println("Jil11 -->" + namePage.getJil11().getSelection());
			System.out.println("Jil12 -->" + namePage.getJil12().getSelection());

			IPath configPath = srcPath.append("config.xml");
			IFile configFile = namePage.getProjectHandle().getFile(configPath);

			String templateFilePath = "";
			ProjectProperties property = new ProjectProperties(namePage.getProjectHandle());
			if (namePage.getJil12().getSelection()) {
				templateFilePath = JIL12_CONFIG_TEMPLATE;
				property.setJilVersion(JILConstants.JIL12);
			} else if (namePage.getJil11().getSelection()) {
				templateFilePath = JIL11_CONFIG_TEMPLATE;
				property.setJilVersion(JILConstants.JIL10);
			}
			
			// set project property 
			if (namePage.getBronzeBt().getSelection()) {
				property.setAPICategory(JILConstants.BRONZE);
			} else if (namePage.getSilverBt().getSelection()) {
				property.setAPICategory(JILConstants.SILVER);
			} else if (namePage.getGoldBt().getSelection()) {
				property.setAPICategory(JILConstants.GOLD);
			}
			
			configIS = getClass().getResourceAsStream(templateFilePath + "/config.template" );

			Map<String, String> replaceParam = new HashMap<String, String>();
			replaceParam.put(PROJECT_NAME, project.getName());
			replaceParam.put(PROJECT_DESCRIPTION, project.getName());
			replaceParam.put( DEVELOPER_NAME ,  getSha256(namePage.getDeveloperName().getText()));

			String configStr = null;
			InputStream stream = null;
			try {
				configStr = Common.convertStreamToString(configIS);

				String configTemplate = replaceParameters(configStr,
						replaceParam);
				stream = new ByteArrayInputStream(configTemplate
						.getBytes("UTF-8"));

			} catch (Exception ex) {
				ex.printStackTrace();
			}

			configFile.create(stream, false,new SubProgressMonitor(monitor, 10));
			
			copySampleFiles(srcPath, templateFilePath);
			

		} catch (CoreException ex) {
			reportError(ex);
		} finally {
				if( configIS !=  null)
					try {
						configIS.close();
					} catch (IOException e) {
						e.printStackTrace();
					}
			monitor.done();
		}
	}

	private void createFolderHelper(IFolder folder, IProgressMonitor monitor)
			throws CoreException {
		if (!folder.exists()) {
			IContainer parent = folder.getParent();
			if (parent instanceof IFolder && (!((IFolder) parent).exists()))
				createFolderHelper((IFolder) parent, monitor);
			folder.create(false, true, monitor);
		}

		/*
		 * namePage.getProjectHandle().getName();
		 * namePage.getProjectHandle().getDescription()
		 */
	}

	private String replaceParameters(String configStr,
			Map<String, String> parameters) {
		for (String key : parameters.keySet()) {
			configStr = configStr.replaceAll(key, (String) parameters.get(key));
		}

		return configStr;
	}

	
	private String getSha256(String nickname){
	 
	 if( nickname == null) return null;
	 String returnVal = null;
	 try
     {
       MessageDigest mMessageDigest = MessageDigest.getInstance("SHA-256");
       mMessageDigest.reset();
       String str = nickname.toLowerCase();
       try
       {
         mMessageDigest.update(str.getBytes("UTF-8"));
       }
       catch (UnsupportedEncodingException localUnsupportedEncodingException1)
       {
         mMessageDigest.update(str.getBytes());
       }
       
       byte[] b = mMessageDigest.digest();
       returnVal =  Common.getHexString(b);
       
     }catch(Exception ex){
    	 ex.printStackTrace();
     }
     
     return returnVal;
	}
	
	private void copySampleFiles(IPath srcPath, String  templateFilePath){
		InputStream is = null;
		try{
			
			IPath sampleFileath = srcPath.append("Default.png");
			File dfile = namePage.getProjectHandle().getFile(sampleFileath).getLocation().toFile();
			is = getClass().getResourceAsStream(templateFilePath + "/Default.png" );
			Common.writeToFile(is, dfile);
			
			
			sampleFileath = srcPath.append("inc.js");
			dfile = namePage.getProjectHandle().getFile(sampleFileath).getLocation().toFile();
			is = getClass().getResourceAsStream(templateFilePath + "/inc.js" );
			Common.writeToFile(is, dfile);
			
			sampleFileath = srcPath.append("index.html");
			dfile = namePage.getProjectHandle().getFile(sampleFileath).getLocation().toFile();
			is = getClass().getResourceAsStream(templateFilePath + "/index.html" );
			Common.writeToFile(is, dfile);
			
			sampleFileath = srcPath.append("main.css");
			dfile = namePage.getProjectHandle().getFile(sampleFileath).getLocation().toFile();
			is = getClass().getResourceAsStream(templateFilePath + "/main.css" );
			Common.writeToFile(is, dfile);
			
			
			
		}catch(Exception ex){
			ex.printStackTrace();
			// Copy exception  not cretical
		}finally{
			if( is != null )
				try {
					is.close();
				} catch (IOException e) {
					e.printStackTrace();
				}
		}
	}
	
}
