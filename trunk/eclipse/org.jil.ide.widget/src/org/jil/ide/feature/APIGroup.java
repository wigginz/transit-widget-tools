package org.jil.ide.feature;

import java.util.ArrayList;

public class APIGroup {
	
	
	public APIGroup() {
		super();
	}
	
	public APIGroup(ArrayList<String> apilist, String featureURI,FeatureCategory  category ) {
		super();
		this.apiList = apilist;
		this.featureURI = featureURI;
		this.category = category;
	}
	

	ArrayList<String> apiList;
	String featureURI;
	boolean featureUsed = false;
	FeatureCategory  category;
	
	
	
	public ArrayList<String> getApiList() {
		return apiList;
	}
	public void setApiList(ArrayList<String> apilist) {
		this.apiList = apilist;
	}
	public String getFeatureURI() {
		return featureURI;
	}
	public void setFeatureURI(String featureURI) {
		this.featureURI = featureURI;
	}
	public boolean isFeatureUsed() {
		return featureUsed;
	}
	public void setFeatureUsed(boolean featureUsed) {
		this.featureUsed = featureUsed;
	}
	
	
	ArrayList<String> featureURIlist;
	String api;
	public ArrayList<String> getFeatureURIlist() {
		return featureURIlist;
	}

	public void setFeatureURIlist(ArrayList<String> featureURIlist) {
		this.featureURIlist = featureURIlist;
	}

	public String getApi() {
		return api;
	}

	public void setApi(String api) {
		this.api = api;
	}

	public FeatureCategory getCategory() {
		return category;
	}

	public void setCategory(FeatureCategory category) {
		this.category = category;
	}
	
	
	
	
	

}
