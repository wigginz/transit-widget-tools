package org.jil.ide.ui;

import org.eclipse.core.resources.IProject;
import org.eclipse.core.runtime.CoreException;
import org.eclipse.core.runtime.IAdaptable;
import org.eclipse.swt.SWT;
import org.eclipse.swt.events.SelectionEvent;
import org.eclipse.swt.events.SelectionListener;
import org.eclipse.swt.layout.FillLayout;
import org.eclipse.swt.layout.FormAttachment;
import org.eclipse.swt.layout.FormData;
import org.eclipse.swt.layout.FormLayout;
import org.eclipse.swt.layout.GridData;
import org.eclipse.swt.layout.GridLayout;
import org.eclipse.swt.layout.RowData;
import org.eclipse.swt.layout.RowLayout;
import org.eclipse.swt.widgets.Button;
import org.eclipse.swt.widgets.Composite;
import org.eclipse.swt.widgets.Control;
import org.eclipse.swt.widgets.Group;
import org.eclipse.swt.widgets.Label;
import org.eclipse.swt.widgets.Table;
import org.eclipse.swt.widgets.TableColumn;
import org.eclipse.swt.widgets.Text;
import org.eclipse.ui.dialogs.PropertyPage;
import org.jil.ide.util.JILConstants;
import org.jil.ide.util.PluginConstants;

/**
 * This code was edited or generated using CloudGarden's Jigloo SWT/Swing GUI
 * Builder, which is free for non-commercial use. If Jigloo is being used
 * commercially (ie, by a corporation, company or business for any purpose
 * whatever) then you should purchase a license for each developer using Jigloo.
 * Please visit www.cloudgarden.com for details. Use of Jigloo implies
 * acceptance of these licensing terms. A COMMERCIAL LICENSE HAS NOT BEEN
 * PURCHASED FOR THIS MACHINE, SO JIGLOO OR THIS CODE CANNOT BE USED LEGALLY FOR
 * ANY CORPORATE OR COMMERCIAL PURPOSE.
 */
public class JILPropertyPage extends PropertyPage implements PluginConstants {

	private ProjectProperties properties;
	private Button silverBt;
	private Button goldBt;
	private Button bronzeBt;

	private Label jilversion;

	private Control buildUI(Composite parent) {

		Composite composite = new Composite(parent, SWT.NULL);

		GridLayout gridLayout = new GridLayout();
		gridLayout.numColumns = 2;
		composite.setLayout(gridLayout);

		
		Label label = new Label(composite, SWT.NULL);
		label.setText("JIL Widget Version");
		label.setLayoutData(new GridData(GridData.FILL, GridData.BEGINNING,	true, false));

		GridData gridData = new GridData(GridData.FILL,
				GridData.BEGINNING, true, false);
		jilversion = new Label(composite, SWT.SINGLE);
		jilversion.setLayoutData(gridData);

		GridData sepData = new GridData(GridData.VERTICAL_ALIGN_END);
		sepData.horizontalSpan = 2;
		sepData.horizontalAlignment = GridData.FILL;
		Label sep = new Label(composite, SWT.SEPARATOR | SWT.HORIZONTAL);
		sep.setLayoutData(sepData);

		GridData apiGridData = new GridData(GridData.FILL, GridData.BEGINNING,
				true, false);

		Label label1 = new Label(composite, SWT.NULL);
		label1.setText("API Category");
		label1.setLayoutData(apiGridData);

		gridData = new GridData();
	    gridData.horizontalAlignment = GridData.FILL;
	    gridData.grabExcessHorizontalSpace = true;
	    gridData.widthHint=100;
	    gridData.heightHint=90;
	    
		Group g = new Group(composite, SWT.NONE);
		g.setLayout(new GridLayout());
		g.setLayoutData(gridData);
		
		{
			gridData = new GridData();
		    gridData.horizontalAlignment = GridData.FILL;
		    gridData.grabExcessHorizontalSpace = true;
		    
			bronzeBt = new Button(g, SWT.RADIO | SWT.LEFT);
			bronzeBt.setLayoutData(gridData);
			bronzeBt.setText("Bronze");
		}
		
		
		{
			gridData = new GridData();
		    gridData.horizontalAlignment = GridData.FILL;
		    gridData.grabExcessHorizontalSpace = true;
		    
			silverBt = new Button(g, SWT.RADIO | SWT.LEFT);
			silverBt.setLayoutData(gridData);
			silverBt.setText("Silver");
		}
		
		
		{
			gridData = new GridData();
		    gridData.horizontalAlignment = GridData.FILL;
		    gridData.grabExcessHorizontalSpace = true;
		    
			goldBt = new Button(g, SWT.RADIO | SWT.LEFT);
			goldBt.setLayoutData(gridData);
			goldBt.setText("Gold");
		}

		
				
		/*
		 * bronzeBt = new Button(composite, SWT.RADIO | SWT.LEFT);
		 * bronzeBt.setLayoutData(apiGridData); bronzeBt.setText("Bronze");
		 * 
		 * Label label2 = new Label(composite, SWT.NULL); label2.setText("" );
		 * label2.setLayoutData(apiGridData);
		 * 
		 * silverBt = new Button(composite, SWT.RADIO | SWT.LEFT);
		 * silverBt.setLayoutData(apiGridData); silverBt.setText("Silver");
		 * 
		 * Label label3 = new Label(composite, SWT.NULL); label3.setText("" );
		 * label3.setLayoutData(apiGridData);
		 * 
		 * goldBt = new Button(composite, SWT.RADIO | SWT.LEFT);
		 * goldBt.setLayoutData(apiGridData); goldBt.setText("Gold");
		 */

		return composite;
	}

	@Override
	protected Control createContents(Composite parent) {

		Control control = buildUI(parent);
		
		try {
			IAdaptable adaptable = getElement();
			if (adaptable instanceof IProject) {
				properties = new ProjectProperties((IProject) adaptable);
				readProperties();
			}
		} catch (CoreException x) {
			x.printStackTrace();
		}

		return control;
	}

	public void readProperties() throws CoreException {
		jilversion.setText(properties.getJilVersion());

		if (JILConstants.BRONZE.equals(properties.getAPICategory())) {
			bronzeBt.setSelection(true);
		} else if (JILConstants.SILVER.equals(properties.getAPICategory())) {
			silverBt.setSelection(true);
		} else if (JILConstants.GOLD.equals(properties.getAPICategory())) {
			goldBt.setSelection(true);
		}

	}

	public void writeProperties() throws CoreException {
		properties.setJilVersion(jilversion.getText());

		if (bronzeBt.getSelection()) {
			properties.setAPICategory(JILConstants.BRONZE);
		} else if (silverBt.getSelection()) {
			properties.setAPICategory(JILConstants.SILVER);
		} else if (goldBt.getSelection()) {
			properties.setAPICategory(JILConstants.GOLD);
		}

	}

}
