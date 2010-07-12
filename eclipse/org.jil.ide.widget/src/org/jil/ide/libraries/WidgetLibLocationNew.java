package org.jil.ide.libraries;

import java.io.File;

import org.eclipse.core.resources.IProject;
import org.eclipse.core.resources.ResourcesPlugin;
import org.eclipse.core.runtime.CoreException;
import org.eclipse.core.runtime.IPath;
import org.eclipse.wst.jsdt.core.compiler.libraries.LibraryLocation;
import org.eclipse.wst.jsdt.core.compiler.libraries.SystemLibraryLocation;
import org.jil.ide.Activator;
import org.jil.ide.ui.ProjectProperties;
import org.jil.ide.util.JILConstants;
import org.jil.ide.util.PluginTools;

public class WidgetLibLocationNew extends SystemLibraryLocation {

	private static LibraryLocation fInstance;
	private static int level;
	private IProject project;
	private ProjectProperties properties;

	private WidgetLibLocationNew(IProject project) {
		super();
		this.project = project;
	}

	public char[][] getLibraryFileNames() {

		char[][] libFiles = null;

		String libPath = getLibraryPathInPlugin().toString();

		if (project != null) {
			try {
				System.out.println("   WidgetLibLocation  Project Name " + project.getName());
				properties = new ProjectProperties(project);
				try {
					System.out.println("   WidgetLibLocation  "
							+ properties.getAPICategory());
					if (JILConstants.GOLD.equals(properties.getAPICategory())) {
						libFiles = getAllFilesInPluginDirectory(libPath
								.toString());
					}else if ( JILConstants.SILVER.equals(properties.getAPICategory())){
						libFiles = new char[4][100];
						libFiles[0] = "Widget.js".toCharArray() ;
						libFiles[1] = "WidgetManager.js".toCharArray();
						libFiles[2] = "Exception.js".toCharArray() ;
						libFiles[3] = "ExceptionTypes.js".toCharArray();
					}else if ( JILConstants.BRONZE.equals(properties.getAPICategory())){
						libFiles = new char[2][100];
						libFiles[0] = "Exception.js".toCharArray() ;
						libFiles[1] = "ExceptionTypes.js".toCharArray();
					}

				} catch (CoreException e) {
					e.printStackTrace();
				}
			} catch (Exception ex) {
				System.out.println(" project get exception ");
				ex.printStackTrace();
			}
		} else {
			System.out.println(" Project is null");
		}

		return getAllFilesInPluginDirectory(libPath.toString());
		/*
		 * char[][] bronze =
		 * getAllFilesInPluginDirectory(getLibraryPathInPlugin().toString() +
		 * File.separator + "bronze" );
		 * 
		 * for (int i = 0; i < bronze.length; i++) { String lib = new
		 * String(bronze[i]); System.out.println(bronze[i]); lib = "bronze/" +
		 * lib; bronze[i] = lib.toCharArray(); System.out.println(bronze[i]); }
		 * 
		 * System.out.println(" ************************ \n\n SILVER \n\n\n");
		 * 
		 * char[][] silver =
		 * getAllFilesInPluginDirectory(getLibraryPathInPlugin().toString() +
		 * File.separator + "silver" );
		 * 
		 * for (int i = 0; i < silver.length; i++) {
		 * System.out.println(silver[i]); }
		 * 
		 * if( level == 1){ System.out.println(" leveis is 1  retrun silver ");
		 * System.out.println( silver.length); return silver; }else{
		 * System.out.println(" leveis is 2  retrun bronze ");
		 * System.out.println( bronze.length); return bronze; }
		 * 
		 * return bronze; IPath libPath = getLibraryPathInPlugin(); IPath
		 * silverPath = libPath.append("bronze" );
		 * 
		 * System.out.println(silverPath.toString()); return
		 * getAllFilesInPluginDirectory(libPath.toString());
		 */

	}

	protected String getPluginId() {
		return Activator.PLUGIN_ID;
	}

	public static LibraryLocation getInstance(IProject project) {
		if (fInstance == null) {
			fInstance = new WidgetLibLocationNew(project);
		}
		return fInstance;
	}

}
