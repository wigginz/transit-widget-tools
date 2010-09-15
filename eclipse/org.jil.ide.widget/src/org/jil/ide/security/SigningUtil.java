package org.jil.ide.security;

import java.io.ByteArrayInputStream;
import java.io.File;
import java.io.FileInputStream;
import java.io.FileOutputStream;
import java.io.IOException;
import java.io.InputStream;
import java.io.OutputStream;
import java.security.KeyStore;
import java.security.PrivateKey;
import java.security.KeyStore.PrivateKeyEntry;
import java.security.cert.Certificate;
import java.security.cert.CertificateFactory;
import java.security.cert.X509Certificate;
import java.util.Enumeration;

import javax.xml.transform.Transformer;
import javax.xml.transform.TransformerFactory;
import javax.xml.transform.dom.DOMSource;
import javax.xml.transform.stream.StreamResult;

import org.apache.xml.security.c14n.Canonicalizer;
import org.apache.xml.security.keys.KeyInfo;
import org.apache.xml.security.keys.content.X509Data;
import org.apache.xml.security.signature.SignedInfo;
import org.apache.xml.security.signature.XMLSignature;
import org.apache.xml.security.utils.Constants;
import org.eclipse.core.resources.IContainer;
import org.eclipse.core.resources.IFile;
import org.eclipse.core.resources.IFolder;
import org.eclipse.core.resources.IProject;
import org.eclipse.core.resources.IResource;
import org.eclipse.core.runtime.CoreException;
import org.eclipse.core.runtime.IPath;
import org.eclipse.core.runtime.Path;



public class SigningUtil {
	
	 private static final String  KEYSTORE_TYPE =  "PKCS12";
	 
	 static IProject selectedProject;
	 
	 static{ org.apache.xml.security.Init.init();	}
	 
	 public static  boolean signWidget(String certPath, String password, IProject project) throws Exception{
		  /*
		   *  step1 : get the certificate path from Pref
		   *  step2 : get the widget from bin 
		   *  				get the Project handle
		   *  step3: identify  weather its jil1.0 or jil.12 project  
		   *  step3 : create auth-signature.xml 
		   */
		   Constants.setSignatureSpecNSprefix("");
		   selectedProject = project;
		   String keystoreFile = certPath ;
		   String keystorePass = password ;
		   OutputStream os = null;
		   
			try{ 
			KeyStore ks =  loadKeystore(keystoreFile, keystorePass);

			String keyAliase = getAlaiase(ks);
			PrivateKeyEntry keyEntry = getPrivateKeyEntry(keystoreFile, keystorePass,
					keyAliase, KEYSTORE_TYPE);

			PrivateKey privateKey = keyEntry.getPrivateKey();

			javax.xml.parsers.DocumentBuilderFactory dbf = javax.xml.parsers.DocumentBuilderFactory
					.newInstance();

			dbf.setNamespaceAware(true);
			javax.xml.parsers.DocumentBuilder db = dbf.newDocumentBuilder();
			org.w3c.dom.Document doc = db.newDocument();

			
			IPath srcPath  =   new Path("src");
			IPath signPath =  srcPath.append("author-signature.xml");
			IFolder srcFolder  = project.getFolder(srcPath);
			IFile  signFile    = project.getFile(signPath);
			File signatureFile = signFile.getLocation().toFile();
			String BaseURI = signatureFile.toURI().toString();

			System.out.println(BaseURI);

			org.apache.xml.security.signature.XMLSignature signature = null;
			try{
				signature = 	new org.apache.xml.security.signature.XMLSignature(doc, BaseURI,		XMLSignature.ALGO_ID_SIGNATURE_RSA_SHA256,
						Canonicalizer.ALGO_ID_C14N11_OMIT_COMMENTS);
			}catch(Exception ex){
				ex.printStackTrace();
				throw ex;
			}
			
			/*System.out.println(" BaseLocalName " + signature.getBaseLocalName());
			System.out.println(" BaseNamespace " + signature.getBaseNamespace());
			System.out.println(XMLSignature.getDefaultPrefix(signature
					.getBaseNamespace()));
			System.out.println("  DefaultPrefixBindings  =="
					+ XMLSignature.getDefaultPrefixBindings(signature
							.getBaseNamespace()));
			System.out.println(signature.getBaseLocalName());*/
			
			

			signature.setId("AuthorSignature");
			KeyInfo ki = signature.getKeyInfo();

			Certificate[] certificates = ks.getCertificateChain(keyAliase);
			System.out.println(" \n\n\n Certifiate chain  length  "
					+ certificates.length);

			X509Data x509Data = new X509Data(doc);
			ki.add(x509Data);
			// x509Data.addSubjectName(cert.getSubjectDN().getName());
			for (int j = 0; j < certificates.length; j++) {
				x509Data.addCertificate((X509Certificate) certificates[j]);
			}
			doc.appendChild(signature.getElement());

			System.out.println(" NamespaceURI  " + doc.getNamespaceURI());
			
			String filepath ="";
			
			addDocuments(signature, srcFolder);
			
			/*SignedInfo s = signature.getSignedInfo();*/
			signature.sign(privateKey);
			
			
			//new File(filepath + "/signature.xml");
			os = new FileOutputStream(signatureFile);
			TransformerFactory tf = TransformerFactory.newInstance();
			Transformer trans = tf.newTransformer();
			trans.transform(new DOMSource(doc), new StreamResult(os));

			os.close();
			System.out.println("Wrote signature to " + BaseURI);
			}catch(Exception ex){
				ex.printStackTrace();
				return false;
			}finally{
				if( os != null)	os.close();
				
			}
		  
		    return true;
		 
	 }
	 
	 
	 private static PrivateKeyEntry getPrivateKeyEntry(String ketstore,
				String password, String alias, String keystoreType) {

			PrivateKeyEntry keyEntry = null;
			InputStream stream = null;
			try {
				// Load the KeyStore and get the signing key and certificate.
				KeyStore ks = KeyStore.getInstance(keystoreType);
				stream = new FileInputStream(ketstore);
				ks.load(stream, password.toCharArray());
				keyEntry = (KeyStore.PrivateKeyEntry) ks.getEntry(alias,
						new KeyStore.PasswordProtection(password.toCharArray()));
			} catch (Exception ex) {
				ex.printStackTrace();
			}finally{
				if( stream != null){
					try {
						stream.close();
					} catch (IOException e) {
								e.printStackTrace();
					}
				}
			}
			return keyEntry;
		}
	 
	 private static String getAlaiase(KeyStore keystore ){
		 
		 String keyAliase = null;
		 
		 try{
	     Enumeration<String> aliasEnum = keystore.aliases(); 
	     for (; aliasEnum.hasMoreElements(); ) {
	    	 String alias = aliasEnum.nextElement();
	    	 // Does alias refer to a private key? 
	    	 boolean b = keystore.isKeyEntry(alias);
	    	 System.out.println(alias + "\t" +  b);
	    	 if(b) keyAliase = alias;
	    	 
	     }
		 }catch(Exception ex){
			 ex.printStackTrace();
		 }
		 
		 return keyAliase;
	 }
	 
	 
	 
	 private  static void addDocuments(XMLSignature signature , IContainer resource) {
			IResource projectMembers[];
			try {
				projectMembers = resource.members();

				for(int i=0; i<projectMembers.length; i++){

					IResource projectMember = projectMembers[i];
					if(projectMember instanceof IFile){
						java.io.File file= new java.io.File(projectMember.getLocation().toOSString());
						if(!projectMember.getName().equals("author-signature.xml") && !projectMember.getName().startsWith("signature"))
						{
							if(file.exists() == true && file.isHidden()==false && !file.getName().endsWith("~") )
									//&& !checkForWgtPackage(projectMember))
							{

								String path = ((IFile)projectMember).getProjectRelativePath().toOSString();
								if( path.startsWith("src")){
									path = path.substring(4);
								}
								try {
//									signature.addDocument(path);
									signature.addDocument( path.replace("\\", "/"), null,"http://www.w3.org/2001/04/xmlenc#sha256");
								} catch (org.apache.xml.security.signature.XMLSignatureException e) {
									
									 e.printStackTrace();
								}
							}
						}
					}
					else if(projectMember instanceof IFolder){
						java.io.File file= new java.io.File(projectMember.getLocation().toOSString());
						if(file != null && file.exists()==true && file.isHidden() == false)
							addDocuments(signature,(IContainer) projectMember);
					}
				}
			} catch (CoreException e) {
				e.printStackTrace();
			}
	 }
	 
	 
	 public static X509Certificate  getCertificate(String keystoreFile, String keystorePass) throws Exception{
		 
		 CertificateFactory cf = CertificateFactory.getInstance("X.509");
			X509Certificate x509cert =  null;
		 
		 Certificate  cert = null;
		 KeyStore  ks = loadKeystore(keystoreFile, keystorePass);
		 String keyAliase = getAlaiase(ks);
		 cert = ks.getCertificate(keyAliase);
		 
		 if (cert instanceof X509Certificate) {
			 x509cert = (X509Certificate) cert;
		 } else {
			 ByteArrayInputStream   bio = new ByteArrayInputStream(cert.getEncoded());
			 x509cert = (X509Certificate)cf.generateCertificate(bio);
		 }
		 return x509cert;
	 }
	 
	 private static  KeyStore loadKeystore(String keystoreFile, String keystorePass) throws Exception{
		 KeyStore ks = KeyStore.getInstance(KEYSTORE_TYPE);
		 InputStream stream=  null;
	 	 try{
	 		 stream = new FileInputStream(keystoreFile);
	 		 ks.load(stream, keystorePass.toCharArray());
	 	 }catch(Exception ex){
	 		 ex.printStackTrace();
	 		 throw ex;
	 	 }finally{
	 		if( stream != null){
				try {
					stream.close();
				} catch (IOException e) {
							e.printStackTrace();
				}
			}
	 	 }
		 return ks;
	 }

}
