package org.jil.ide.builder;

import java.util.Arrays;
import java.util.Vector;

import org.eclipse.core.resources.IProject;
import org.eclipse.core.resources.IProjectDescription;
import org.eclipse.core.resources.IProjectNature;
import org.eclipse.core.runtime.CoreException;
import org.eclipse.core.runtime.IPath;
import org.eclipse.core.runtime.IProgressMonitor;
import org.eclipse.core.runtime.NullProgressMonitor;
import org.eclipse.core.runtime.OperationCanceledException;
import org.eclipse.core.runtime.Path;
import org.eclipse.wst.jsdt.core.IIncludePathEntry;
import org.eclipse.wst.jsdt.core.JavaScriptCore;
import org.eclipse.wst.jsdt.core.LibrarySuperType;
import org.eclipse.wst.jsdt.internal.core.JavaProject;


public class JavaScriptNature implements IProjectNature {

	private static final String[] NATURE_IDS = { "org.eclipse.wst.jsdt.core.jsNature" };

	public static final IPath VIRTUAL_BROWSER_CLASSPATH = new Path(
			"org.eclipse.wst.jsdt.launching.baseBrowserLibrary");
	public static final String VIRTUAL_FIREFOX_CONTAINER = "org.eclipse.wst.jsdt.launching.FireFoxBrowserLibrary";
	public static final IIncludePathEntry VIRTUAL_FIREFOX_CLASSPATH = JavaScriptCore
			.newContainerEntry(new Path("org.eclipse.wst.jsdt.launching.FireFoxBrowserLibrary"));
	public static final String VIRTUAL_WIDGET_CONTAINER = "org.jil.ide.libraries.widgetLibrary";
	public static final IIncludePathEntry VIRTUAL_WIDGET_CLASSPATH = JavaScriptCore
			.newContainerEntry(new Path("org.jil.ide.libraries.widgetLibrary"));
	public static final String VIRTUAL_WEBKIT_CONTAINER = "org.eclipse.wst.jsdt.core.compiler.libraries.webkitLibrary";
	public static final IIncludePathEntry VIRTUAL_WEBKIT_CLASSPATH = JavaScriptCore
			.newContainerEntry(new Path("org.eclipse.wst.jsdt.core.compiler.libraries.webkitLibrary"));
	
	
	private static final String SUPER_TYPE_NAME = "Window";
	private static final String SUPER_TYPE_LIBRARY = "org.eclipse.wst.jsdt.launching.baseBrowserLibrary";
	private static final String DEFAULT_JRE_PATH = "org.eclipse.wst.jsdt.launching.JRE_CONTAINER";
	private Vector<IIncludePathEntry> classPathEntries = new Vector();
	private boolean DEBUG = true;
	private IProject fCurrProject;
	@SuppressWarnings("restriction")
	private JavaProject fJavaProject;
	
	private IPath fOutputLocation;
	private IProgressMonitor monitor;

	public JavaScriptNature() {
		this.monitor = new NullProgressMonitor();
	}

	public JavaScriptNature(IProject project, IProgressMonitor monitor) {
		this.fCurrProject = project;
		if (monitor != null)
			this.monitor = monitor;
		else
			monitor = new NullProgressMonitor();
	}

	public static void addJsNature(IProject project, IProgressMonitor monitor)
			throws CoreException {
		if ((monitor != null) && (monitor.isCanceled())) {
			throw new OperationCanceledException();
		}
		if (!hasNature(project)) {
			IProjectDescription description = project.getDescription();
			String[] prevNatures = description.getNatureIds();
			String[] newNatures = new String[prevNatures.length
					+ NATURE_IDS.length];
			System.arraycopy(prevNatures, 0, newNatures, 0, prevNatures.length);

			for (int i = 0; i < NATURE_IDS.length; ++i) {
				newNatures[(prevNatures.length + i)] = NATURE_IDS[i];
			}
			description.setNatureIds(newNatures);
			project.setDescription(description, monitor);
		} else if (monitor != null) {
			monitor.worked(1);
		}
	}

	public static boolean hasNature(IProject project) {
		try {
			for (int i = 0; i < NATURE_IDS.length; ++i)
				if (!project.hasNature(NATURE_IDS[i]))
					return false;
		} catch (CoreException localCoreException) {
			return false;
		}
		return true;
	}

/*	public static void removeJsNature(IProject project, IProgressMonitor monitor)
			throws CoreException {
		if ((monitor != null) && (monitor.isCanceled())) {
			throw new OperationCanceledException();
		}
		if (hasNature(project)) {
			IProjectDescription description = project.getDescription();
			String[] prevNatures = description.getNatureIds();
			String[] newNatures = new String[prevNatures.length
					- NATURE_IDS.length];
			int k = 0;
			for (int i = 0; i < prevNatures.length; ++i) {
				for (int j = 0; j < NATURE_IDS.length; ++j) {
					if (prevNatures[i] == NATURE_IDS[j]) {
						break;
					}
				}

				// label109: newNatures[(k++)] = prevNatures[i];
			}
			description.setNatureIds(newNatures);
			project.setDescription(description, monitor);
		} else if (monitor != null) {
			monitor.worked(1);
		}
	}*/

	@SuppressWarnings("restriction")
	@Override
	public void configure() throws CoreException {
		initOutputPath();
		createSourceClassPath();
		initJREEntry();
		initLocalClassPath();

		if (hasProjectClassPathFile()) {
			IIncludePathEntry[] entries = getRawClassPath();
			if ((entries != null) && (entries.length > 0)) {
				this.classPathEntries.removeAll(Arrays.asList(entries));
				this.classPathEntries.addAll(Arrays.asList(entries));
			}
		}

		addJsNature(this.fCurrProject, this.monitor);
		this.fJavaProject = ((JavaProject) JavaScriptCore
				.create(this.fCurrProject));
		this.fJavaProject.setProject(this.fCurrProject);
		try {
			if (!hasProjectClassPathFile())
				this.fJavaProject.setRawIncludepath(
						(IIncludePathEntry[]) this.classPathEntries
								.toArray(new IIncludePathEntry[0]),
						this.fOutputLocation, this.monitor);
			else
				this.fJavaProject.setRawIncludepath(
						(IIncludePathEntry[]) this.classPathEntries
								.toArray(new IIncludePathEntry[0]),
						this.monitor);
		} catch (Exception e) {
			System.out.println(e);
		}

		LibrarySuperType superType = new LibrarySuperType(new Path(
				"org.eclipse.wst.jsdt.launching.baseBrowserLibrary"),
				getJavaProject(), SUPER_TYPE_NAME);
		getJavaProject().setCommonSuperType(superType);

		this.fCurrProject.refreshLocal(2, this.monitor);

	}

	private void createSourceClassPath() {
		if (hasAValidSourcePath()) {
			return;
		}
		IPath projectPath = this.fCurrProject.getFullPath();
		this.classPathEntries.add(JavaScriptCore.newSourceEntry(projectPath));
	}

	@SuppressWarnings({ "unchecked", "restriction" })
	@Override
	public void deconfigure() throws CoreException {
		/*Vector badEntries = new Vector();
		IIncludePathEntry defaultJRELibrary = getJreEntry();
		IIncludePathEntry[] localEntries = initLocalClassPath();
		badEntries.add(defaultJRELibrary);
		badEntries.addAll(Arrays.asList(localEntries));
		IIncludePathEntry[] entries = getRawClassPath();
		Vector goodEntries = new Vector();
		for (int i = 0; i < entries.length; ++i) {
			if (!badEntries.contains(entries[i])) {
				goodEntries.add(entries[i]);
			}
		}

		IPath outputLocation = getJavaProject().getOutputLocation();
		getJavaProject().setRawIncludepath(
				(IIncludePathEntry[]) goodEntries
						.toArray(new IIncludePathEntry[0]), outputLocation,
				this.monitor);
		getJavaProject().deconfigure();
		//removeJsNature(this.fCurrProject, this.monitor);
		this.fCurrProject.refreshLocal(2, this.monitor);*/

	}

	@SuppressWarnings("restriction")
	public JavaProject getJavaProject() {
		if (this.fJavaProject == null) {
			this.fJavaProject = ((JavaProject) JavaScriptCore
					.create(this.fCurrProject));
			this.fJavaProject.setProject(this.fCurrProject);
		}
		return this.fJavaProject;
	}

	@SuppressWarnings("restriction")
	private IIncludePathEntry[] getRawClassPath() {
		JavaProject proj = new JavaProject();
		proj.setProject(this.fCurrProject);
		return proj.readRawIncludepath();
	}

	private boolean hasAValidSourcePath() {
		if (hasProjectClassPathFile()) {
			try {
				IIncludePathEntry[] entries = getRawClassPath();
				for (int i = 0; i < entries.length; ++i)
					if (entries[i].getEntryKind() == 3)
						return true;
			} catch (Exception e) {
				if (this.DEBUG) {
					System.out.println("Error checking sourcepath:" + e);
				}
			}
		}
		return false;
	}

	@Override
	public IProject getProject() {
		return this.fCurrProject;
	}

	@Override
	public void setProject(IProject arg0) {
		this.fCurrProject = arg0;

	}

	private boolean hasProjectClassPathFile() {
		if (this.fCurrProject == null) {
			return false;
		}
		return this.fCurrProject.getFolder(".settings").getFile(".jsdtscope")
				.exists();
	}

	private IIncludePathEntry getJreEntry() {
		return JavaScriptCore.newContainerEntry(new Path(
				"org.eclipse.wst.jsdt.launching.JRE_CONTAINER"));
	}

	private void initJREEntry() {
		IIncludePathEntry defaultJRELibrary = getJreEntry();
		try {
			IIncludePathEntry[] entries = getRawClassPath();
			for (int i = 0; i < entries.length; ++i) {
				if (entries[i] == defaultJRELibrary) {
					return;
				}
			}
			this.classPathEntries.add(defaultJRELibrary);
		} catch (Exception e) {
			if (this.DEBUG)
				System.out.println("Error checking sourcepath:" + e);
		}
	}

	private IIncludePathEntry[] initLocalClassPath() {
		this.classPathEntries.add(VIRTUAL_FIREFOX_CLASSPATH);
		this.classPathEntries.add(VIRTUAL_WIDGET_CLASSPATH);
		this.classPathEntries.add(VIRTUAL_WEBKIT_CLASSPATH);
		IIncludePathEntry browserLibrary = JavaScriptCore
				.newContainerEntry(VIRTUAL_BROWSER_CLASSPATH);
		this.classPathEntries.add(browserLibrary);

		return new IIncludePathEntry[] { VIRTUAL_FIREFOX_CLASSPATH,
				VIRTUAL_WIDGET_CLASSPATH, VIRTUAL_WEBKIT_CLASSPATH,
				browserLibrary };
	}

	private void initOutputPath() {
		if (this.fOutputLocation == null)
			this.fOutputLocation = this.fCurrProject.getFullPath();
	}

}
