package org.jil.ide.feature;

import java.util.ArrayList;

public abstract class FeatureAPI {
  
	 ArrayList<APIGroup> apiList = new ArrayList<APIGroup>();

	public ArrayList<APIGroup> getApiList() {
		return apiList;
	}

	public void setApiList(ArrayList<APIGroup> apiList) {
		this.apiList = apiList;
	}
	   
}
