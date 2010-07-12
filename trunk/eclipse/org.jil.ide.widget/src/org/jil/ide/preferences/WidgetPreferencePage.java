package org.jil.ide.preferences;

import org.eclipse.jface.preference.BooleanFieldEditor;
import org.eclipse.jface.preference.DirectoryFieldEditor;
import org.eclipse.jface.preference.FieldEditorPreferencePage;
import org.eclipse.jface.preference.FileFieldEditor;
import org.eclipse.jface.preference.RadioGroupFieldEditor;
import org.eclipse.jface.preference.StringFieldEditor;
import org.eclipse.ui.IWorkbench;
import org.eclipse.ui.IWorkbenchPreferencePage;
import org.jil.ide.Activator;

public class WidgetPreferencePage extends FieldEditorPreferencePage implements
		IWorkbenchPreferencePage {

	@Override
	protected void createFieldEditors() {
		addField(new FileFieldEditor("CERT_PATH", "&Publisher Certificate Path:",
				getFieldEditorParent()));
		
		
		/*addField(new BooleanFieldEditor("BOOLEAN_VALUE",
				"&An example of a boolean preference", getFieldEditorParent()));
		addField(new RadioGroupFieldEditor("CHOICE",
				"An example of a multiple-choice preference", 1,
				new String[][] { { "&Choice 1", "choice1" },
						{ "C&hoice 2", "choice2" } }, getFieldEditorParent()));*/
		
		addField(new StringFieldEditor("DEVELOPER_ID", "JIL Developer ID:",
				getFieldEditorParent()));
		/*addField(new StringFieldEditor("MySTRING2", "A &text preference:",
				getFieldEditorParent()));*/


	}

	@Override
	public void init(IWorkbench arg0) {
		setPreferenceStore(Activator.getDefault().getPreferenceStore());
		setDescription("A demonstration of a preference page implementation");


	}

}
