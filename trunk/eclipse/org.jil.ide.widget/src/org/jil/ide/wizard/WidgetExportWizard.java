package org.jil.ide.wizard;

import java.io.File;
import java.lang.reflect.InvocationTargetException;

import org.eclipse.core.resources.IFile;
import org.eclipse.core.resources.IProject;
import org.eclipse.core.runtime.IAdaptable;
import org.eclipse.core.runtime.IPath;
import org.eclipse.core.runtime.IProgressMonitor;
import org.eclipse.core.runtime.NullProgressMonitor;
import org.eclipse.core.runtime.Path;
import org.eclipse.jface.dialogs.MessageDialog;
import org.eclipse.jface.preference.IPreferenceStore;
import org.eclipse.jface.resource.ImageDescriptor;
import org.eclipse.jface.viewers.IStructuredSelection;
import org.eclipse.jface.wizard.Wizard;
import org.eclipse.swt.widgets.Display;
import org.eclipse.ui.IExportWizard;
import org.eclipse.ui.IWorkbench;
import org.eclipse.ui.actions.WorkspaceModifyOperation;
import org.jil.ide.Activator;
import org.jil.ide.security.SigningUtil;
import org.jil.ide.util.PluginConstants;
import org.jil.ide.util.Resources;
import org.jil.ide.util.ZipUtil;

public class WidgetExportWizard extends Wizard implements IExportWizard,PluginConstants {

	private WidgetExportWizardPage namePage;
	
	private IStructuredSelection wizardSelection;
	
	private IPreferenceStore prefStore;
	
	@Override
	public boolean performFinish() {
		try {
			System.out.println("  Export Signed Widget ...WidgetExportWizard"); //$NON-NLS-1$
			getContainer().run(false, true, new WorkspaceModifyOperation() {
				protected void execute(IProgressMonitor monitor) {
					exportProject(monitor != null ? monitor
							: new NullProgressMonitor());
				}
			});
		} catch (InvocationTargetException x) {
			x.printStackTrace();
			return false;
		} catch (InterruptedException x) {
			// reportError(x);
			return false;
		}
		return true;
	}

	public void addPages() {
		try {
			super.addPages();
			namePage = new WidgetExportWizardPage(Resources.getString("WidgetExportWizard.export.wizard.page"), wizardSelection); //$NON-NLS-1$
			namePage.setTitle(Resources.getString("WidgetExportWizard.export.wizard.page.title")); //$NON-NLS-1$
			namePage.setDescription(Resources
					.getString("eclipse.signedexpodescription")); //$NON-NLS-1$
			namePage.setImageDescriptor(ImageDescriptor.createFromFile(
					getClass(), "/org/jil/ide/resources/jil.png")); //$NON-NLS-1$

			addPage(namePage);

		} catch (Exception x) {
			x.printStackTrace();
			// reportError(x);
		}
	}

	@Override
	public void init(IWorkbench arg0, IStructuredSelection arg1) {
		wizardSelection = arg1;
		prefStore= Activator.getPreference();
		setNeedsProgressMonitor(true);

	}

	protected void exportProject(IProgressMonitor monitor) {
		monitor.beginTask(Resources.getString("eclipse.creatingproject"), 50); //$NON-NLS-1$

		namePage.getDestinationValue();
		
		System.out.println(namePage.getDestinationValue());
		try {
			
			
			
			IProject project = getProject();
			
			System.out.println(project.getName());
			
			
			
			IPath binPath = new Path(DEFAULT_BIN_DIR);
			binPath = 	binPath.append(project.getName() +".wgt"); //$NON-NLS-1$
			/*IPath location = project.getFile(binPath).getLocation();			
			IPath widgetPath = Path.fromOSString(namePage.getDestinationValue());
			File widgetFile =  widgetPath.toFile();
			File binFile  = location.toFile();*/

			System.out.println( prefStore.getString("CERT_PATH")); //$NON-NLS-1$
			
			String certPath =  prefStore.getString("CERT_PATH"); //$NON-NLS-1$
			String password  = namePage.getPwd().getText();	
			
			if( SigningUtil.signWidget(certPath, password,project) ) {
				
				String projectSrcPath = project.getLocation().toOSString()+File.separator + DEFAULT_SOURCE_DIR; //$NON-NLS-1$
				ZipUtil.packageSource(projectSrcPath, namePage.getDestinationValue(), ""); //$NON-NLS-1$
				MessageDialog.openInformation(Display.getDefault().getActiveShell(), Resources.getString("WidgetExportWizard.export.wizard.success.title"), Resources.getString("WidgetExportWizard.export.wizard.success.msg")); //$NON-NLS-1$ //$NON-NLS-2$
				
				IPath  srcPath = new Path(DEFAULT_SOURCE_DIR); //$NON-NLS-1$
				srcPath = srcPath.append("author-signature.xml"); //$NON-NLS-1$
				IFile sigFile =  project.getFile(srcPath);
				sigFile.delete(true, new NullProgressMonitor());
				return;
			}else{
				// TODO: Show error message to user 
			}
			
			
			System.out.println( prefStore.getString("DEVELOPER_ID")); //$NON-NLS-1$
						
			/*if(location != null){
				Common.copyFile(location.toFile(),widgetFile);
			}*/
			
			System.out.println(project.getName());
		} catch (Exception ex) {
			ex.printStackTrace();
		}

	}

	private IProject getProject() {
		IProject project = null;
		if (this.wizardSelection instanceof IStructuredSelection) {
			IStructuredSelection selection = (IStructuredSelection) this.wizardSelection;

			if (selection.size() == 1) {
				Object element = selection.getFirstElement();

				if (element instanceof IProject)
					project = (IProject) element;
				else if (element instanceof IAdaptable) {
					project = (IProject) ((IAdaptable) element)
							.getAdapter(IProject.class);
				}
			}
		}
		return project;
	}
	
	
	/*private IPreferenceStore getPreference(){
		 return  Activator.getDefault().getPreferenceStore();
	}
*/

}
