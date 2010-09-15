package org.jil.ide.builder;

import java.io.File;
import java.io.FilenameFilter;
import java.util.ArrayList;
import java.util.regex.Matcher;
import java.util.regex.Pattern;

import org.eclipse.core.resources.IFile;
import org.eclipse.core.resources.IProject;
import org.eclipse.core.resources.IWorkspace;
import org.eclipse.core.resources.ResourcesPlugin;
import org.eclipse.core.runtime.CoreException;
import org.eclipse.core.runtime.IPath;
import org.eclipse.core.runtime.Path;
import org.jil.ide.feature.APIGroup;
import org.jil.ide.feature.FeatureAPI;
import org.jil.ide.feature.FeatureAPIFactory;
import org.jil.ide.ui.MarkerUtility;
import org.jil.ide.ui.ProjectProperties;
import org.jil.ide.util.Common;

public class ConfigEditor {

	private ProjectProperties properties;

	public ConfigEditor(IProject proj) {
		this.properties = new ProjectProperties(proj);
	}

	public void checkJSfilesFromDir(File fileDir) {
		FileFilter fileFilder = new FileFilter("js");

		ArrayList<APIGroup> apiGroup = null;

		try {
			System.out.println("  JIL Widget Verion "
					+ properties.getJilVersion());

			FeatureAPI featureAPI = FeatureAPIFactory.getFeatureAPI(properties
					.getJilVersion());
			apiGroup = featureAPI.getApiList();

		} catch (CoreException e) {
			e.printStackTrace();
		}

		File[] jsfiles = fileDir.listFiles(fileFilder);
		Pattern pattern1 = Pattern.compile(
				"[.[^\\n]]*(/\\*(.|[^\\*]*(\\*[^/][^\\*]*)*)\\*/)[.[^\\n]]*",
				32);
		Pattern pattern2 = Pattern
				.compile("//[[\\s*\\w*\\n$][\\p{Punct}*\\n$]][^\\n]*");
		Pattern pattern4 = Pattern.compile("(\")([^\"]*)(\")");
		for (File jsf : jsfiles) {

			String jsfileString = Common.convertFile2String(jsf);
			Matcher m4 = pattern4.matcher(jsfileString);
			jsfileString = m4.replaceAll("");
			Matcher m1 = pattern1.matcher(jsfileString);
			jsfileString = m1.replaceAll("");
			Matcher m2 = pattern2.matcher(jsfileString);
			jsfileString = m2.replaceAll("");
			checkFeatureGroup(jsfileString, jsf, apiGroup);
		}
		for (File f : fileDir.listFiles())
			if (f.isDirectory()) {
				checkJSfilesFromDir(f);
			}

	}

	public void checkFeatureGroup(String jsfileString, File file,
			ArrayList<APIGroup> apiGroup) {

		IWorkspace workspace = ResourcesPlugin.getWorkspace();
		IPath location = Path.fromOSString(file.getAbsolutePath());
		IFile iFile = workspace.getRoot().getFileForLocation(location);
		MarkerUtility.deleteMarkers(iFile);

		for (APIGroup g : apiGroup) {
			if (g != null && !g.isFeatureUsed()) {
				for (String api : g.getApiList())
					if (jsfileString.contains(api)) {
						g.setFeatureUsed(true);
						System.out.println(" using feature " + api + " \t "
								+ g.getCategory().toString());
						MarkerUtility.addMarker(iFile, g.getCategory()
								.toString(), 0, 0);
					}
			}
		}
	}

	class FileFilter implements FilenameFilter {
		private String extent;

		public FileFilter(String extent) {
			this.extent = ("." + extent);
		}

		public boolean accept(File directory, String fileName) {
			return fileName.endsWith(this.extent);
		}

	}

}
