package org.jil.ide.libraries;

import org.eclipse.wst.jsdt.core.ast.IScriptFileDeclaration;
import org.eclipse.wst.jsdt.core.infer.IInferenceFile;
import org.eclipse.wst.jsdt.core.infer.InferEngine;
import org.eclipse.wst.jsdt.core.infer.InferrenceProvider;
import org.eclipse.wst.jsdt.core.infer.RefactoringSupport;
import org.eclipse.wst.jsdt.core.infer.ResolutionConfiguration;

public class WidgetInferenceProvider implements InferrenceProvider {

	@Override
	public int applysTo(IInferenceFile arg0) {
		return 0;  
	}

	@Override
	public String getID() {
		return "org.eclipse.wst.jsdt.infer";
	}

	@Override
	public InferEngine getInferEngine() {
		InferEngine engine = new WidgetInferEngine();
	    engine.inferenceProvider = this;
	    return engine;
	}

	@Override
	public RefactoringSupport getRefactoringSupport() {
			return null;
	}

	@Override
	public ResolutionConfiguration getResolutionConfiguration() {
			return null;
	}
	
	public int applysTo(IScriptFileDeclaration scriptFile)
	{
	    return 3 ;//IScriptFileDeclaration.ALLOCATION_EXPRESSION;  //3
	}

}
