package org.jil.ide.ui;

import org.eclipse.core.resources.IProject;
import org.eclipse.core.runtime.CoreException;
import org.eclipse.core.runtime.QualifiedName;
import org.jil.ide.util.JILConstants;
import org.jil.ide.util.PluginConstants;

public class ProjectProperties implements PluginConstants {

	private IProject project;

	public ProjectProperties(IProject project) {
		this.project = project;
	}

	public String getJilVersion() throws CoreException {
		return getProperty(JIL_WIDGET_VERSION, JILConstants.JIL12);
	}
	
	
	public void setJilVersion(String jilVersion) throws CoreException {
		setProperty(JIL_WIDGET_VERSION, jilVersion, JILConstants.JIL12);
	}
	
	public String getAPICategory() throws CoreException {
		return getProperty(JIL_API_CATEGORY, JILConstants.BRONZE);
	}
	
	public void setAPICategory(String jilVersion) throws CoreException {
		setProperty(JIL_API_CATEGORY, jilVersion, JILConstants.BRONZE);
	}
	
	public IProject getProject() {
		return project;
	}

	public void setProject(IProject project) {
		this.project = project;
	}

	protected String getProperty(QualifiedName key, String def)
			throws CoreException {
		String value = project.getPersistentProperty(key);
		if (value == null || value.length() == 0)
			return def;
		else
			return value;
	}

	protected void setProperty(QualifiedName key, String value, String def)
			throws CoreException {
		if (value != null && value.length() != 0 && hasNature()) {
			if (value.equals(def))
				project.setPersistentProperty(key, null);
			else
				project.setPersistentProperty(key, value);
		}
	}

	public boolean hasNature() throws CoreException {
		return project.hasNature(NATURE_ID);
	}

}
