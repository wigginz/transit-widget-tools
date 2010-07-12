package org.jil.ide.builder.validation;

import org.eclipse.core.resources.IProject;
import org.jil.ide.util.JILConstants;

public class ValidatorFactory {

	
	public static  JILValidator getJILValidator(String ver, IProject project){
		JILValidator validator = null;
		if( JILConstants.JIL12.equals(ver)){
			validator = new JIL12Validator(project);
		}else if(JILConstants.JIL10.equals(ver) ){
			validator = new JIL10Validator(project);
		}
		return validator;
	}
	
	
}
