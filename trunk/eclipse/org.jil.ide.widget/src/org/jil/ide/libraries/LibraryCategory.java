package org.jil.ide.libraries;

import java.util.HashMap;
import java.util.Map;

import org.jil.ide.util.JILConstants;

public class LibraryCategory {

	private static Map<String, String> libCategoryMap = new HashMap<String, String>();
	
	
	private void initLibCategory(){
		libCategoryMap.put("", JILConstants.BRONZE);
		libCategoryMap.put("", JILConstants.BRONZE);
		libCategoryMap.put("", JILConstants.BRONZE);
		libCategoryMap.put("", JILConstants.BRONZE);
		libCategoryMap.put("", JILConstants.BRONZE);
		libCategoryMap.put("", JILConstants.BRONZE);
		libCategoryMap.put("", JILConstants.BRONZE);
		libCategoryMap.put("", JILConstants.BRONZE);
		libCategoryMap.put("", JILConstants.BRONZE);
		libCategoryMap.put("", JILConstants.BRONZE);
		libCategoryMap.put("", JILConstants.BRONZE);
		libCategoryMap.put("", JILConstants.BRONZE);
		libCategoryMap.put("", JILConstants.BRONZE);
	}
	
	private LibraryCategory(){
		initLibCategory();
	}
	
	private LibraryCategory  libCategory;
	
	public LibraryCategory getInstance(){
		if( libCategory == null){
			libCategory= new LibraryCategory(); 
		}
		return libCategory;
	}
	
	public static Map<String,String> getLibraryCategoryMap(){
		return libCategoryMap;
	}
	
	
	
}
