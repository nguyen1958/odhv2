package fr.analogon.controllers;

import java.io.File;
import java.io.FileFilter;
import java.io.FileNotFoundException;
import java.io.IOException;
import java.net.URL;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.nio.file.StandardCopyOption;
import java.security.NoSuchAlgorithmException;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.Collection;
import java.util.List;
import java.util.Map;


import javax.servlet.http.HttpServletRequest;
import javax.sql.DataSource;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.env.Environment;
import org.springframework.core.io.ClassPathResource;
import org.springframework.core.io.Resource;
import org.springframework.http.HttpHeaders;
import org.springframework.http.ResponseEntity;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import fr.analogon.dao.Dao;
import fr.analogon.dto.DtoImmeuble;
import fr.analogon.dto.DtoLot;
import fr.analogon.dto.DtoProcedure;
import fr.analogon.entities.OdhUtilisateurs;
import fr.analogon.exception.DaoException;
import fr.analogon.service.Service;
import fr.analogon.utils.FileInfo;
import fr.analogon.utils.Utils;
import fr.analogon.entities.OdhDeclarations;
import fr.analogon.entities.OdhEntreprises;
import fr.analogon.entities.OdhExperts;
import fr.analogon.entities.OdhImmeubles;
import fr.analogon.entities.OdhLocataires;
import fr.analogon.entities.OdhLocslot;
import fr.analogon.entities.OdhLots;
import fr.analogon.entities.OdhNatures;
import fr.analogon.entities.OdhProceduresimr;
import fr.analogon.entities.OdhProprietaires;
import fr.analogon.entities.OdhPropslot;
import fr.analogon.entities.OdhRelogements;
import fr.analogon.entities.OdhRues;
import fr.analogon.entities.OdhSuiveurs;
import fr.analogon.entities.OdhSyndics;

@RestController
public class MyRestController {
    private Logger log= LoggerFactory.getLogger(MyRestController.class);
	
	@Autowired
	private Environment env;
	@Autowired
	private Dao dao;
	@Autowired
	private Service service;
	@Autowired
	private DataSource bds;
	
@GetMapping("/hello")
public String hello(Model model) throws DaoException {
	String sql="select o from OdhImmeubles o";
	Collection immeubles=dao.query(sql);
	System.out.println(immeubles);
	for(Object obj:immeubles) {
		System.out.println(obj+ "\n");
	}
	return "hello ! welcome to my project";
}
//Gestion document et photo
private String getpath(String type,String immId,String procId){
	log.info("type="+type);log.info("immId="+immId);log.info("procId="+procId);
	String path="";
	if(type.equalsIgnoreCase("document"))
		if(procId!=null && !procId.equalsIgnoreCase("undefined"))
		path=Utils.replace(env.getProperty("path.procedure.documents"),immId,procId);
		else
		path=Utils.replace(env.getProperty("path.immeuble.documents"),immId);
	else//photo
		if(procId!=null && !procId.equalsIgnoreCase("undefined"))
		path=Utils.replace(env.getProperty("path.procedure.photos"),immId,procId);
		else
		path=Utils.replace(env.getProperty("path.immeuble.photos"),immId);

	return path;
}

@GetMapping("/loadFile")
public ResponseEntity<Resource> loadFile(@RequestParam String path, HttpServletRequest request) throws IOException{
	System.out.println("load method is called with "+path);
	Resource resource = new ClassPathResource(path);
	System.out.println("path="+resource.getFile().getPath());
	System.out.println(resource.isReadable());
	System.out.println(resource.exists());
	 // Try to determine file's content type
	 String contentType = null;
	 try {
		 contentType = request.getServletContext().getMimeType(resource.getFile().getAbsolutePath());
	 } catch (IOException ex) {
		 log.info("Could not determine file type.");
	 }

	 // Fallback to the default content type if type could not be determined
	 if(contentType == null) {
		 contentType = "application/octet-stream";
	 }

	 System.out.println("mime="+contentType);

	 return ResponseEntity.ok()
	 		 .header("content-type", contentType)
			 .header("content-disposition", "attachment; filename=\"" + resource.getFilename() + "\"")
			 .body(resource);
}

@PostMapping("/removeFile")
public void removeFile(@RequestBody Map<String,String> map) throws IOException{
	String file=map.get("file");
	System.out.println("removefile method is called with "+file);
	URL url=new URL(file);
	String query=url.getQuery(); //path=realpath
	String[] pairs = query.split("=");
	System.out.println("query="+query);
	System.out.println("pairs="+pairs[0]+":"+pairs[1]);
	String path=pairs[1];
	Resource res=new ClassPathResource(path);
	if(res.exists()) Files.delete(res.getFile().toPath());
}

//Get list documents or photos of immeuble and procedures
@PostMapping("/getListFiles")
public List<FileInfo> getListFiles(@RequestBody Map<String,String> map,HttpServletRequest request) throws IOException,FileNotFoundException {
	// TODO Auto-generated method stub	
	List<FileInfo> listOfFiles=new ArrayList<FileInfo>();			
	//parametres
	String type = map.get("type");
	String immId = map.get("immId");
	String procId = map.get("procId");
	String path=getpath(type, immId, procId);
	Resource resource = new ClassPathResource(path);
	if(resource.exists()){
		File[] files = resource.getFile().listFiles(new FileFilter(){
			//filtrer uniquement les fichiers
			public boolean accept(File file) {
				// TODO Auto-generated method stub
				return file.isFile();
			} 					
		}   			    		
		);
		
		if(files!=null){
			//preparer la requete pour chaque fichier
			//Changer url "http://.../getListFiles" to "http://.../loadFile?path=..../fileName"
			for(File f:files){			
				listOfFiles.add(new FileInfo(f.getName(),
											request.getRequestURL().toString()
											.replaceAll("getListFiles","loadFile?path="+path+"/"+f.getName())));
			}
		}

	}		
	return listOfFiles;	
}

//Upload file
@PostMapping("/uploadFile")
public FileInfo uploadFile(@RequestParam String immId,@RequestParam String procId,@RequestParam String type,
							@RequestParam MultipartFile file,
							HttpServletRequest request) throws IOException,FileNotFoundException{
	System.out.println("==> uploadFile");
	//Contextpath
	String path=getpath(type, immId, procId);
	log.info(immId+":"+procId);
	log.info(file.getOriginalFilename());
	//path data/..../documents
	//Se positionner au root 
	//On ne peut pas se positionner directement sur le path qui n'existe pas
	//il va se planter lors de l'obtention l'objet path dans resource.getFile().toPath() 
	Resource resource = new ClassPathResource("/");
	Path rootpath=resource.getFile().toPath();
	//Constituer le path /data/....
	Path absolutePath=Paths.get(rootpath.toString(),path);
	//Créer directories
	log.info("path="+absolutePath);
	Files.createDirectories(absolutePath); //créer directory et directory parent s'ils n'existent pas (se plante pas si directory existe déjà)
	log.info("createdirectory");
	//Copier fichier source vers la directory
	Files.copy(file.getInputStream(),absolutePath.resolve(file.getOriginalFilename()),StandardCopyOption.REPLACE_EXISTING);
	log.info("copy");
	//Retour objet FileInfo
	return new FileInfo(file.getOriginalFilename(),
						request.getRequestURL().toString()
						.replaceAll("uploadFile", "loadFile?path="+path+"/"+file.getOriginalFilename()));
}
	
@PostMapping(value="/authentifier")
public OdhUtilisateurs authentifier(@RequestBody Map<String,Object> map) throws NoSuchAlgorithmException, DaoException{
	System.out.println("authentifier :"+map.get("login")+"/"+map.get("password"));
	String sql="select o from OdhUtilisateurs o where o.odutiUtilisateur=?1";
	OdhUtilisateurs user=(OdhUtilisateurs) dao.getOne(sql, Arrays.asList(map.get("login")));
	String password=(String) map.get("password");
	if (user!= null && user.getOdutiPassword().equalsIgnoreCase(password)) {          	
		return user;	
	}
	else 
		return null;		
}
	
/*
 * Poster n'importe quelle requête jpa de type select++++
 */
@PostMapping(value="/requestSql")
public Collection execQuery(@RequestBody String req) throws DaoException{
	log.info(req);
	return dao.query(req);
}

@PostMapping(value="/saveImmeuble") 
public OdhImmeubles saveImmeuble(@RequestBody DtoImmeuble data) throws DaoException{
	return service.saveImmeuble(data);
}

@PostMapping(value="/saveProprietaire") 
public OdhProprietaires saveProprietaire(@RequestBody OdhProprietaires data) throws DaoException{		
	return service.saveProprietaire(data);
}
@PostMapping(value="/removeProprietaire") 
public void removeProprietaire(@RequestBody Map<String,Integer> map) throws DaoException{	
	service.removeProprietaire(map.get("id"));
}

@PostMapping(value="/saveLocataire") 
public OdhLocataires saveLocataire(@RequestBody OdhLocataires data) throws DaoException{	
	return service.saveLocataire(data);
}
@PostMapping(value="/removeLocataire") 
public void removeLocataire(@RequestBody Map<String,Integer> map) throws DaoException{	
	service.removeLocataire(map.get("id"));
}

@PostMapping(value="/saveRue") 
public OdhRues saveRue(@RequestBody OdhRues data) throws DaoException{	
	return service.saveRue(data);
}
@PostMapping(value="/removeRue") 
public void removeRue(@RequestBody Map<String,Integer> map) throws DaoException{	
	service.removeRue(map.get("id"));
}

@PostMapping(value="/saveExpert") 
public OdhExperts saveExpert(@RequestBody OdhExperts data) throws DaoException{	
	return service.saveExpert(data);
}
@PostMapping(value="/removeExpert") 
public void removeExpert(@RequestBody Map<String,Integer> map) throws DaoException{	
	service.removeExpert(map.get("id"));
}

@PostMapping(value="/saveSuiveur") 
public OdhSuiveurs saveSuiveur(@RequestBody OdhSuiveurs data) throws DaoException{	
	return service.saveSuiveur(data);
}
@PostMapping(value="/removeSuiveur") 
public void removeSuiveur(@RequestBody Map<String,Integer> map) throws DaoException{	
	service.removeSuiveur(map.get("id"));
}

@PostMapping(value="/saveSyndic") 
public OdhSyndics saveSyndic(@RequestBody OdhSyndics data) throws DaoException{	
	return service.saveSyndic(data);
}
@PostMapping(value="/removeSyndic") 
public void removeSyndic(@RequestBody Map<String,Integer> map) throws DaoException{	
	service.removeSyndic(map.get("id"));
}

@PostMapping(value="/saveEntreprise") 
public OdhEntreprises saveEntreprise(@RequestBody OdhEntreprises data) throws DaoException{	
	return service.saveEntreprise(data);
}
@PostMapping(value="/removeEntreprise") 
public void removeEntreprise(@RequestBody Map<String,Integer> map) throws DaoException{	
	service.removeEntreprise(map.get("id"));
}

@PostMapping(value="/saveRelogement") 
public OdhRelogements saveRelogement(@RequestBody OdhRelogements data) throws DaoException{	
	return service.saveRelogement(data);
}
@PostMapping(value="/removeRelogement") 
public void removeRelogement(@RequestBody Map<String,Integer> map) throws DaoException{	
	service.removeRelogement(map.get("id"));
}

@PostMapping(value="/saveUtilisateur") 
public OdhUtilisateurs saveUtilisateur(@RequestBody OdhUtilisateurs data) throws DaoException{	
	return service.saveUtilisateur(data);
}
@PostMapping(value="/removeUtilisateur") 
public void removeUtilisateur(@RequestBody Map<String,Integer> map) throws DaoException{	
	service.removeUtilisateur(map.get("id"));
}

@PostMapping(value="/saveOption") 
public OdhNatures saveOption(@RequestBody OdhNatures data) throws DaoException{	
	return service.saveOption(data);
}
@PostMapping(value="/removeOption") 
public void removeOption(@RequestBody Map<String,Integer> map) throws DaoException{	
	service.removeOption(map.get("id"));
}

@PostMapping(value="/saveDeclarations") 
public void saveDeclarations(@RequestBody OdhDeclarations[] data) throws DaoException{	
	service.saveDeclarations(data);
}

@PostMapping(value="/saveProcedure") 
public OdhProceduresimr saveProcedure(@RequestBody DtoProcedure data) throws DaoException{	
	return service.saveProcedure(data);
}

@PostMapping(value="/saveLot") 
public OdhLots saveLot(@RequestBody DtoLot data) throws DaoException{	
	return service.saveLot(data);
}

@PostMapping(value="/savePropslot") 
public void savePropslot(@RequestBody OdhPropslot data) throws DaoException{	
	service.savePropslot(data);
}
@PostMapping(value="/removePropslot") 
public void removePropslot(@RequestBody Map<String,Integer> map) throws DaoException{	
	service.removePropslot(map.get("id"));
}

@PostMapping(value="/saveLocslot") 
public void saveLocslot(@RequestBody OdhLocslot data) throws DaoException{	
	service.saveLocslot(data);
}
@PostMapping(value="/removeLocslot") 
public void removeLocslot(@RequestBody Map<String,Integer> map) throws DaoException{	
	service.removeLocslot(map.get("id"));
}

}
