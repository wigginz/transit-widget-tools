package org.jil.ide.wizard;

import org.eclipse.swt.SWT;
import org.eclipse.swt.layout.FormAttachment;
import org.eclipse.swt.layout.FormData;
import org.eclipse.swt.layout.GridData;
import org.eclipse.swt.layout.GridLayout;
import org.eclipse.swt.widgets.Button;
import org.eclipse.swt.widgets.Composite;
import org.eclipse.swt.widgets.Event;
import org.eclipse.swt.widgets.Group;
import org.eclipse.swt.widgets.Label;
import org.eclipse.swt.widgets.Listener;
import org.eclipse.swt.widgets.Text;
import org.eclipse.ui.dialogs.WizardNewProjectCreationPage;

public class WidgetWizardPage extends WizardNewProjectCreationPage {

	Button jil12;
	Button jil11;

	Button goldBt;
	Button silverBt;
	Button bronzeBt;

	public WidgetWizardPage(String pageName) {
		super(pageName);
	}

	private Text developerName;
	private Listener nameModifyListener = new Listener() {
		public void handleEvent(Event e) {
			boolean valid = validatePage();
			setPageComplete(valid);

		}
	};

	@Override
	public void createControl(Composite parent) {
		super.createControl(parent);

		GridData pgridData = new GridData(GridData.FILL, GridData.BEGINNING,
				true, false);
		pgridData.horizontalSpan = 3;
		getControl().setLayoutData(pgridData);

		Composite composite = (Composite) getControl();
		// Composite composite = new Composite(parent, SWT.NONE);
		composite.setFont(parent.getFont());

		GridLayout layout = new GridLayout();
		composite.setLayout(new GridLayout(2, false));
		composite.setLayout(layout);
		// layout.numColumns = 2;
		layout.verticalSpacing = 9;
		Label label = new Label(composite, SWT.NULL);
		label.setText("&JIL Developer ID:");
		label.setLayoutData(new GridData(GridData.FILL, GridData.BEGINNING,
				true, false));

		developerName = new Text(composite, SWT.BORDER | SWT.SINGLE);
		developerName.setLayoutData(new GridData(GridData.FILL,
				GridData.BEGINNING, true, false));

		developerName.addListener(SWT.Modify, nameModifyListener);

		GridData gridData = new GridData(GridData.FILL, GridData.BEGINNING,
				true, false);
		gridData.horizontalSpan = 2;
		
		Group jilVGroup = new Group(composite, SWT.NONE);
		GridLayout jilVGroupLayout = new GridLayout();
		jilVGroupLayout.makeColumnsEqualWidth = true;
		jilVGroup.setLayout(jilVGroupLayout);
		GridData jilVGroupLData = new GridData();
		jilVGroup.setLayoutData(jilVGroupLData);
		jilVGroup.setText("JIL Widget Version");
		
		jil12 = new Button(jilVGroup, SWT.RADIO | SWT.LEFT);
		jil12.setSelection(true);
		GridData jil12BtLData = new GridData();
		jil12.setLayoutData(jil12BtLData);
		jil12.setText("JIL1.2");
		
		jil11 = new Button(jilVGroup, SWT.RADIO | SWT.LEFT);
		GridData jil11BtLData = new GridData();
		jil11.setLayoutData(jil11BtLData);
		jil11.setText("JIL1.0");

		Group catGroup = new Group(composite, SWT.NONE);
		GridLayout catGroupLayout = new GridLayout();
		catGroupLayout.makeColumnsEqualWidth = true;
		catGroup.setLayout(catGroupLayout);
		GridData catGroupLData = new GridData();
		/*catGroupLData.left = new FormAttachment(0, 1000, 157);
		catGroupLData.top = new FormAttachment(0, 1000, 53);
		catGroupLData.width = 292;
		catGroupLData.height = 89;*/
		catGroup.setLayoutData(catGroupLData);
		catGroup.setText("Select Category");
		
		bronzeBt = new Button(catGroup, SWT.RADIO | SWT.LEFT);
		bronzeBt.setSelection(true);  // default set bronze to true 
		GridData bronzeBtLData = new GridData();
		bronzeBt.setLayoutData(bronzeBtLData);
		bronzeBt.setText("Bronze");
		
		silverBt = new Button(catGroup, SWT.RADIO | SWT.LEFT);
		GridData silverBtLData = new GridData();
		silverBt.setLayoutData(silverBtLData);
		silverBt.setText("Silver");
		
		goldBt = new Button(catGroup, SWT.RADIO | SWT.LEFT);
		GridData goldBtLData = new GridData();
		goldBt.setLayoutData(goldBtLData);
		goldBt.setText("Gold");
		

		// setPageComplete(validatePage());
		setControl(composite);

	}

	@Override
	protected boolean validatePage() {
		boolean validateFlag = false;
		validateFlag = super.validatePage();
		if (validateFlag && developerName.getText() != null
				&& developerName.getText().trim().length() > 0) {
			validateFlag = true;
		} else {
			validateFlag = false;
		}
		return validateFlag;
	}

	public Text getDeveloperName() {
		return developerName;
	}

	public void setDeveloperName(Text developerName) {
		this.developerName = developerName;
	}

	public Button getJil12() {
		return jil12;
	}

	public void setJil12(Button jil12) {
		this.jil12 = jil12;
	}

	public Button getJil11() {
		return jil11;
	}

	public void setJil11(Button jil11) {
		this.jil11 = jil11;
	}
	
	
	public Button getGoldBt() {
		return goldBt;
	}

	public void setGoldBt(Button goldBt) {
		this.goldBt = goldBt;
	}

	public Button getSilverBt() {
		return silverBt;
	}

	public void setSilverBt(Button silverBt) {
		this.silverBt = silverBt;
	}

	public Button getBronzeBt() {
		return bronzeBt;
	}

	public void setBronzeBt(Button bronzeBt) {
		this.bronzeBt = bronzeBt;
	}




	static class DevelopeName extends Composite {
		Label name;
		Text developerName;

		DevelopeName(Composite parent, int style) {
			super(parent, style);
			name = new Label(this, 0);
			developerName = new Text(parent, SWT.BORDER | SWT.SINGLE);
		}
	}

}
