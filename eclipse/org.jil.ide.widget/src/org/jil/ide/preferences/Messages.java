package org.jil.ide.preferences;

import org.eclipse.osgi.util.NLS;

public class Messages extends NLS {
	private static final String BUNDLE_NAME = "org.jil.ide.preferences.messages"; //$NON-NLS-1$
	public static String pref_cert_path_lable;
	public static String pref_developer_lable;
	public static String pref_page_descripetion;
	static {
		// initialize resource bundle
		NLS.initializeMessages(BUNDLE_NAME, Messages.class);
	}

	private Messages() {
	}
}
