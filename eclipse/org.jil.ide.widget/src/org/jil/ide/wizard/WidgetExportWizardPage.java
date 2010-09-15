package org.jil.ide.wizard;

import java.io.File;
import java.security.cert.X509Certificate;

import org.eclipse.jface.preference.IPreferenceStore;
import org.eclipse.jface.viewers.IStructuredSelection;
import org.eclipse.swt.SWT;
import org.eclipse.swt.events.FocusAdapter;
import org.eclipse.swt.events.FocusEvent;
import org.eclipse.swt.events.SelectionAdapter;
import org.eclipse.swt.events.SelectionEvent;
import org.eclipse.swt.layout.GridData;
import org.eclipse.swt.layout.GridLayout;
import org.eclipse.swt.widgets.Button;
import org.eclipse.swt.widgets.Combo;
import org.eclipse.swt.widgets.Composite;
import org.eclipse.swt.widgets.Event;
import org.eclipse.swt.widgets.FileDialog;
import org.eclipse.swt.widgets.Group;
import org.eclipse.swt.widgets.Label;
import org.eclipse.swt.widgets.Listener;
import org.eclipse.swt.widgets.Text;
import org.eclipse.ui.dialogs.WizardExportResourcesPage;
import org.jil.ide.Activator;
import org.jil.ide.security.SigningUtil;
import org.jil.ide.util.PluginConstants;

public class WidgetExportWizardPage extends WizardExportResourcesPage {

	private Combo fDestinationNamesCombo;
	private Button fDestinationBrowseButton;
	private Text pwd;
	private static Text subjectText;
	private static Group grpCeritificateDetails;
	private static boolean validPwd;
	
	private IPreferenceStore prefStore;
	private String certPath;

	private Listener pwdModifyListener = new Listener() {
		public void handleEvent(Event e) {
			boolean valid = validatePage();
			setPageComplete(valid);
			

		}
	};

	public WidgetExportWizardPage(String pageName,
			IStructuredSelection selection) {
		super(pageName, selection);
		prefStore= Activator.getPreference();
		certPath = prefStore.getString("CERT_PATH");
	}

	@Override
	public void createControl(Composite parent) {
		// super.createControl(parent);

		initializeDialogUnits(parent);

		Composite composite = new Composite(parent, SWT.NONE);
		GridLayout layout = new GridLayout();
		layout.numColumns = 3;
		composite.setLayout(layout);
		composite.setLayoutData(new GridData(GridData.HORIZONTAL_ALIGN_FILL
				| GridData.VERTICAL_ALIGN_FILL));

		// destination name entry field
		fDestinationNamesCombo = new Combo(composite, SWT.SINGLE | SWT.BORDER);
		fDestinationNamesCombo.addListener(SWT.Modify, this);
		fDestinationNamesCombo.addListener(SWT.Selection, this);
		GridData data = new GridData(GridData.HORIZONTAL_ALIGN_FILL
				| GridData.GRAB_HORIZONTAL);
		data.widthHint = SIZING_TEXT_FIELD_WIDTH;
		fDestinationNamesCombo.setLayoutData(data);
		
		data.horizontalSpan = 2;

		// destination browse button
		fDestinationBrowseButton = new Button(composite, SWT.PUSH);
		fDestinationBrowseButton.setText("Browse");
		fDestinationBrowseButton.setLayoutData(new GridData(
				GridData.HORIZONTAL_ALIGN_FILL));
		//SWTUtil.setButtonDimensionHint(fDestinationBrowseButton);
		fDestinationBrowseButton.addSelectionListener(new SelectionAdapter() {
			public void widgetSelected(SelectionEvent e) {
				handleDestinationBrowseButtonPressed();
			}
		});
		
		
		
		String message ;
		
		String certPath =  prefStore.getString("CERT_PATH");
		if( certPath == null || certPath.trim().length() == 0   ){
			message = "please  add the valid certificate in the prefreeces";
		}else{
			message = "Please enter password the following certificate\n";
			message = message + certPath;
		}

		GridData grid = new GridData(GridData.FILL, GridData.BEGINNING,
				true, false);
		grid.horizontalSpan = 3;
		Label  msg = new Label(composite, SWT.NULL);
		msg.setText(message);
		msg.setLayoutData(grid);
		
		
		Label label = new Label(composite, SWT.NULL);
		label.setText("&Password:");
		label.setLayoutData(new GridData(GridData.FILL, GridData.BEGINNING,
				true, false));
		pwd = new Text(composite, SWT.BORDER | SWT.SINGLE);
		pwd.setLayoutData(new GridData(GridData.FILL, GridData.BEGINNING,
				true, false));
		pwd.addListener(SWT.Modify, pwdModifyListener);
		pwd.addFocusListener(new FocusAdapter(){
//	           boolean ignore;
	             public void focusLost(FocusEvent evt) {
	                 if( !pwd.getText().equals("")) {
	                	 displaySubject(pwd.getText());
	                 }
	             }
	         });

		pwd.setEchoChar('*');
		
		grpCeritificateDetails = new Group(composite, SWT.NONE);
		grpCeritificateDetails.setText("Ceritificate Details");
		GridData gd_grpCeritificateDetails = new GridData(SWT.LEFT, SWT.CENTER, false, false, 3, 1);
		gd_grpCeritificateDetails.heightHint = 118;
		gd_grpCeritificateDetails.widthHint = 435;
		grpCeritificateDetails.setLayoutData(gd_grpCeritificateDetails);
		
		Label lblNewLabel = new Label(grpCeritificateDetails, SWT.NONE);
		lblNewLabel.setBounds(10, 23, 61, 13);
		lblNewLabel.setText("Subject DN");
		
		subjectText = new Text(grpCeritificateDetails, SWT.BORDER | SWT.READ_ONLY);
		subjectText.setBounds(10, 42, 421, 19);

		showCertificateGroup(false);

		setPageComplete(validatePage());
		setControl(composite);
		
		

	}

	@Override
	protected void createDestinationGroup(Composite arg0) {
		// TODO Auto-generated method stub

	}

	@Override
	public void handleEvent(Event arg0) {
		// TODO Auto-generated method stub

	}

	protected String getDestinationValue() {
		String destinationText = fDestinationNamesCombo.getText().trim();
		if (destinationText.indexOf('.') < 0)
			destinationText += getOutputSuffix();
		return destinationText;
	}

	protected void handleDestinationBrowseButtonPressed() {
		FileDialog dialog = new FileDialog(getContainer().getShell(), SWT.SAVE);
		dialog.setFilterExtensions(new String[] { "*.wgt" }); //$NON-NLS-1$ //$NON-NLS-2$

		String currentSourceString = getDestinationValue();
		int lastSeparatorIndex = currentSourceString
				.lastIndexOf(File.separator);
		if (lastSeparatorIndex != -1) {
			dialog.setFilterPath(currentSourceString.substring(0,
					lastSeparatorIndex));
			dialog.setFileName(currentSourceString.substring(
					lastSeparatorIndex + 1, currentSourceString.length()));
		} else
			dialog.setFileName(currentSourceString);
		String selectedFileName = dialog.open();
		if (selectedFileName != null)
			fDestinationNamesCombo.setText(selectedFileName);
	}

	protected String getOutputSuffix() {
		return "." + PluginConstants.WIDGET_EXTENSION; //$NON-NLS-1$
	}

	protected boolean ensureTargetFileIsValid(File targetFile) {
		if (targetFile.exists() && targetFile.isDirectory()
				&& fDestinationNamesCombo.getText().length() > 0) {
			setErrorMessage("");
			fDestinationNamesCombo.setFocus();
			return false;
		}
		if (targetFile.exists()) {
			if (!targetFile.canWrite()) {
				setErrorMessage("");
				fDestinationNamesCombo.setFocus();
				return false;
			}
		}
		return true;
	}

	protected boolean validatePage() {
		boolean validateFlag = false;
		if (pwd.getText() != null && pwd.getText().trim().length() > 0 
				&&  validPwd) {
			validateFlag = true;
		} else {
			validateFlag = false;
		}
		return validateFlag;
	}

	public Text getPwd() {
		return pwd;
	}

	public void setPwd(Text pwd) {
		this.pwd = pwd;
	}
	
	public void  displaySubject(String pwd){
		String subjectDN ="";
		try{
			X509Certificate  cert  = SigningUtil.getCertificate(certPath,pwd);
			subjectDN = cert.getSubjectDN().getName();
			subjectText.setText(subjectDN);
			showCertificateGroup(true);
			validPwd = true;
			setPageComplete(validatePage());
		}catch(Exception ex){
			//ex.printStackTrace();
			showCertificateGroup(false);
			validPwd = false;
			setPageComplete(validatePage());
		}
	}
	
	private void showCertificateGroup(boolean flag){
		if(grpCeritificateDetails != null)
			grpCeritificateDetails.setVisible(flag);
	}
	
	

}
