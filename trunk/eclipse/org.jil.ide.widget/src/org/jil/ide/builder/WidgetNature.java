package org.jil.ide.builder;

import org.eclipse.core.resources.ICommand;
import org.eclipse.core.resources.IProject;
import org.eclipse.core.resources.IProjectDescription;
import org.eclipse.core.resources.IProjectNature;
import org.eclipse.core.runtime.CoreException;
import org.eclipse.core.runtime.IProgressMonitor;
import org.eclipse.core.runtime.NullProgressMonitor;
import org.eclipse.core.runtime.SubProgressMonitor;
import org.jil.ide.libraries.WidgetLibInitializer;

public class WidgetNature implements IProjectNature {
	private IProject mProject;

	public void configure() throws CoreException {

		configureWidgetBuilder(this.mProject);
	}

	public void deconfigure() throws CoreException {
		removeBuilder(this.mProject, "org.jil.builder.widgetBuilder");
	}

	public IProject getProject() {
		return this.mProject;
	}

	public void setProject(IProject project) {
		this.mProject = project;
	}

	public static synchronized void setupProjectNatures(IProject project,
			IProgressMonitor monitor) throws CoreException {
		if ((project == null) || (!project.isOpen()))
			return;
		if (monitor == null)
			monitor = new NullProgressMonitor();

		String natureId = "org.jil.ide.widgetNature";

		if (!project.hasNature(natureId)) {
			IProjectDescription description = project.getDescription();
			String[] natures = description.getNatureIds();
			String[] newNatures = new String[natures.length + 1];

			System.arraycopy(natures, 0, newNatures, 1, natures.length);
			newNatures[0] = natureId;

			description.setNatureIds(newNatures);
			project.setDescription(description, new SubProgressMonitor(monitor,	10));
		}

		JavaScriptNature jsNature = new JavaScriptNature(project, monitor);
		jsNature.configure();
		
		
	}

	public static void configureWidgetBuilder(IProject project)
			throws CoreException {
		IProjectDescription desc = project.getDescription();
		ICommand[] commands = desc.getBuildSpec();
		for (int i = 0; i < commands.length; ++i) {
	        System.out.println("builder name -->" + commands[i].getBuilderName());
			if (commands[i].getBuilderName()
					.equals("org.jil.ide.widgetBuilder")) {
				return;
			}
		}

		ICommand[] newCommands = new ICommand[commands.length + 1];
		System.arraycopy(commands, 0, newCommands, 0, commands.length);
		ICommand command = desc.newCommand();
		command.setBuilderName("org.jil.ide.widgetBuilder");
		newCommands[(newCommands.length - 1)] = command;
		desc.setBuildSpec(newCommands);
		project.setDescription(desc, null);
	}

	public static boolean removeBuilder(IProject project, String id)
			throws CoreException {
		IProjectDescription description = project.getDescription();
		ICommand[] commands = description.getBuildSpec();
		for (int i = 0; i < commands.length; ++i) {
			if (id.equals(commands[i].getBuilderName())) {
				ICommand[] newCommands = new ICommand[commands.length - 1];
				System.arraycopy(commands, 0, newCommands, 0, i);
				System.arraycopy(commands, i + 1, newCommands, i,
						commands.length - i - 1);
				description.setBuildSpec(newCommands);
				project.setDescription(description, null);
				return true;
			}
		}

		return false;
	}
}
