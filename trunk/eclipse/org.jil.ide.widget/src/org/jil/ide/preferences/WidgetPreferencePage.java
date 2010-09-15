package org.jil.ide.preferences;

import org.eclipse.jface.preference.FieldEditorPreferencePage;
import org.eclipse.jface.preference.FileFieldEditor;
import org.eclipse.jface.preference.StringFieldEditor;
import org.eclipse.ui.IWorkbench;
import org.eclipse.ui.IWorkbenchPreferencePage;
import org.jil.ide.Activator;

public class WidgetPreferencePage extends FieldEditorPreferencePage implements
		IWorkbenchPreferencePage {

	@Override
	protected void createFieldEditors() {
		addField(new FileFieldEditor("CERT_PATH", Messages.pref_cert_path_lable, //$NON-NLS-1$
				getFieldEditorParent()));
		
		
		addField(new StringFieldEditor("DEVELOPER_ID", Messages.pref_developer_lable, //$NON-NLS-1$
				getFieldEditorParent()));
		


	}

	@Override
	public void init(IWorkbench arg0) {
		setPreferenceStore(Activator.getDefault().getPreferenceStore());
		setDescription(Messages.pref_page_descripetion);


	}

}
