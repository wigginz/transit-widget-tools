package org.jil.ide.builder.validation;

import java.io.File;

import org.eclipse.core.resources.IFile;
import org.eclipse.core.resources.IProject;

public abstract class JILValidator {
	
	private IProject project;
	JILValidator(IProject project){
		this.project = project;
	}
	
	public IProject getProject() {
		return project;
	}



	public void setProject(IProject project) {
		this.project = project;
	}



	public abstract boolean validate(IFile file);
}
