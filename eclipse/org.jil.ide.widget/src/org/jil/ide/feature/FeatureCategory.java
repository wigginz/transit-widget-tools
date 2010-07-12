package org.jil.ide.feature;

public enum FeatureCategory {
  
	   GOLD,
	   SILVER,
	   BRONZE;

	public String value() {
        return name();
    }

    public static FeatureCategory fromValue(String v) {
        return valueOf(v);
    }	
	   
}
