package org.jil.ide.util;

import java.io.File;
import java.io.FileInputStream;
import java.io.FileOutputStream;
import java.io.IOException;
import java.util.zip.ZipEntry;
import java.util.zip.ZipOutputStream;

public class ZipUtil {

	public static void packageSource(String projectSrcPath, String pkgName,String zipPath ){
		
		ZipOutputStream zos = null
		;
		try{
			zos = new ZipOutputStream(new FileOutputStream(pkgName));
			File file = new File(projectSrcPath);
		    File[] files = file.listFiles();
		      for (int i = 0; i < files.length; ++i) {
		        ZipUtil.zip(zos, files[i], zipPath);
		      }
		}catch(IOException iex){
			 iex.printStackTrace();
		}catch (Exception e) {
			e.printStackTrace();
		}finally{
			try{
				if( zos != null ) zos.close();
			}catch(IOException ex){ ex.printStackTrace();}
				
		}
		      
		      

	}
	
	public static void zip(ZipOutputStream zos, File file, String zipPath) throws IOException {
	    String name = file.getName();

	    if (name.startsWith(".")) {
	      return;
	    }

	    if (file.isDirectory())
	    {
	      if (name.equals("bin")) {
	        return;
	      }

	      zipPath = zipPath + name + "/";
	      zos.putNextEntry(new ZipEntry(zipPath));

	      File[] files = file.listFiles();
	      for (int i = 0; i < files.length; ++i)
	        zip(zos, files[i], zipPath);
	    }
	    else {
	      FileInputStream fis = new FileInputStream(file);
	      zos.putNextEntry(new ZipEntry(zipPath + name));

	      byte[] buffer = new byte[8192];
	      int len;
	      while ((len = fis.read(buffer)) > 0)
	      {
	        zos.write(buffer, 0, len);
	      }

	      zos.closeEntry();
	      fis.close();
	    }
	  }
}
