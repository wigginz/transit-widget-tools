package org.jil.ide.util;

import java.io.BufferedReader;
import java.io.BufferedWriter;
import java.io.File;
import java.io.FileInputStream;
import java.io.FileOutputStream;
import java.io.IOException;
import java.io.InputStream;
import java.io.InputStreamReader;
import java.io.OutputStreamWriter;
import java.io.StringWriter;
import java.nio.channels.FileChannel;

import org.eclipse.core.runtime.Path;
import org.eclipse.core.runtime.Platform;
import org.osgi.framework.Bundle;

public class Common {

	public static String convertStreamToString(InputStream is)
			throws IOException {

		if (is != null) {
			StringBuilder sb = new StringBuilder();
			String line;

			try {
				BufferedReader reader = new BufferedReader(
						new InputStreamReader(is, "UTF-8"));
				while ((line = reader.readLine()) != null) {
					sb.append(line).append("\n");
				}
			} finally {
				is.close();
			}
			return sb.toString();
		} else {
			return "";
		}
	}

	public static String writeToFile(InputStream is, File file) {

		if (is != null) {
			StringBuilder sb = new StringBuilder();
			String line;

			BufferedReader reader = null;
			BufferedWriter writer = null;
			try {
				reader = new BufferedReader(
						new InputStreamReader(is, "UTF-8"));
				writer = new BufferedWriter(
						new OutputStreamWriter(new FileOutputStream(file),
								"UTF-8"));

				while ((line = reader.readLine()) != null) {
					writer.write(line);
					writer.newLine();
				}
				
				
			}catch(IOException iex){
				iex.printStackTrace();
			}finally {
				
				if( is != null ){
					try {
						is.close();
					} catch (IOException e) {
					}
				}
				if( reader != null ){
					try {
						reader.close();
					} catch (IOException e) {
					}
				}
				
				if( writer != null ){
					try {
						writer.close();
					} catch (IOException e) {
					}
				}
				
				
				
			}
			return sb.toString();
		} else {
			return "";
		}
	}

	public static void copyFile(File sfile, File dfile)
			throws IOException {

		
		if(!dfile.exists()) {
			dfile.createNewFile();
		}

		FileChannel source = null;
		FileChannel destination = null;
		 try {
		  source = new FileInputStream(sfile).getChannel();
		  destination = new FileOutputStream(dfile).getChannel();
		  destination.transferFrom(source, 0, source.size());
		 }
		 finally {
		  if(source != null) {
		   source.close();
		  }
		  if(destination != null) {
		   destination.close();
		  }
		}
	}
	
	public static void addToZip(File file, File zipFile){
		
		
	}
	
	public static String getHexString(byte[] b)
	  {
	    String result = "";
	    for (int i = 0; i < b.length; ++i) {
	      result = result + Integer.toString((b[i] & 0xFF) + 256, 16).substring(1);
	    }

	    return result;
	  }
	
	
	@SuppressWarnings("deprecation")
	public static String getResource(String path){
        try {
        	
        	 Bundle bundle = Platform.getBundle(PluginConstants.PLUGIN_ID);
	        return
				new Path(Platform.resolve(Platform.find(bundle, new Path(path))).getFile()).toFile().toString();
		} catch (IOException e) {
			e.printStackTrace();
		}
		return null;
	}
	
	
	public static String convertFile2String(File file)
	   {
	     InputStreamReader reader = null;
	     StringWriter writer = new StringWriter();
	     try {
	       reader = new InputStreamReader(new FileInputStream(file));
	       char[] buffer = new char[1024];
	       int n = 0;
	       while (-1 != (n = reader.read(buffer)))
	         writer.write(buffer, 0, n);
	     }
	     catch (Exception e) {
	       e.printStackTrace();
	       return null;
	     } finally {
	       if (reader != null)
	         try {
	           reader.close();
	         } catch (IOException e) {
	           e.printStackTrace();
	         }
	     }
	     if (writer != null)
	       return writer.toString();
	     return null;
	   }

}
