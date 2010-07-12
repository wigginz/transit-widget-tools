package org.jil.ide.feature;

import org.jil.ide.util.JILConstants;

public class FeatureAPIFactory {

	public static FeatureAPI getFeatureAPI(String version){
		
		FeatureAPI featureAPI = null;
		if( JILConstants.JIL12.equals(version)){
			featureAPI =  JIL12FeatureAPI.getInstance();
		}else if(JILConstants.JIL10.equals(version) ){
			featureAPI = new  JIL10FeatureAPI().getInstance();;
		}
		return featureAPI;
	}
	
}
