package org.jil.ide.feature;

public class JIL10FeatureAPI extends FeatureAPI {
	
	private static JIL10FeatureAPI featureAPI ;
	
	public static JIL10FeatureAPI getInstance(){
		if( featureAPI == null){
			featureAPI = new JIL10FeatureAPI();
		}
		return featureAPI;
	}
	 
	

}
