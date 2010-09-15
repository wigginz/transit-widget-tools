package org.jil.ide.libraries;

import org.eclipse.core.runtime.Path;
import org.eclipse.jface.dialogs.Dialog;
import org.eclipse.swt.widgets.Composite;
import org.eclipse.wst.jsdt.core.IIncludePathEntry;
import org.eclipse.wst.jsdt.core.IJavaScriptProject;
import org.eclipse.wst.jsdt.core.JavaScriptCore;
import org.eclipse.wst.jsdt.internal.ui.wizards.dialogfields.DialogField;
import org.eclipse.wst.jsdt.internal.ui.wizards.dialogfields.LayoutUtil;
import org.eclipse.wst.jsdt.ui.wizards.IJsGlobalScopeContainerPage;
import org.eclipse.wst.jsdt.ui.wizards.IJsGlobalScopeContainerPageExtension;
import org.eclipse.wst.jsdt.ui.wizards.IJsGlobalScopeContainerPageExtension2;
import org.eclipse.wst.jsdt.ui.wizards.NewElementWizardPage;

public class WidgetLibraryWizardPage extends NewElementWizardPage implements
		IJsGlobalScopeContainerPage, IJsGlobalScopeContainerPageExtension,
		IJsGlobalScopeContainerPageExtension2 {

	private static final String CONTAINER_ID = "org.jil.ide.libraries.widgetLibrary";
	
	public WidgetLibraryWizardPage() {
		super("wgtLib");
	}


	@Override
	public boolean finish() {
		return true;
	}

	@Override
	public IIncludePathEntry getSelection() {
		System.out.println("getSelection");
		return null;
	}

	@Override
	public void setSelection(IIncludePathEntry arg0) {
		
	}

	@SuppressWarnings("restriction")
	@Override
	public void createControl(Composite parent) {
		Composite composite = new Composite(parent, 0);
	    composite.setFont(parent.getFont());
	    DialogField field = new DialogField();

	    field.setLabelText("Widget Library added to Project.\n\n  - This library supports JavaScript elements provided by wgt.");

	    LayoutUtil.doDefaultLayout(composite, new DialogField[] { field }, false, -1, -1);

	    Dialog.applyDialogFont(composite);
	    setControl(composite);
	    setDescription("Widget Support");

	}

	@Override
	public void initialize(IJavaScriptProject arg0, IIncludePathEntry[] arg1) {
		// TODO Auto-generated method stub

	}

	@Override
	public IIncludePathEntry[] getNewContainers() {
		 IIncludePathEntry library = JavaScriptCore.newContainerEntry(new Path(CONTAINER_ID));
		 return new IIncludePathEntry[] { library };
	}

}
