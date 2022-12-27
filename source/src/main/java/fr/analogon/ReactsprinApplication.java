package fr.analogon;

import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

import org.springframework.core.env.Environment;
import org.springframework.core.io.ClassPathResource;
import org.springframework.core.io.Resource;

import fr.analogon.dao.Dao;
import fr.analogon.utils.Utils;

@SpringBootApplication
public class ReactsprinApplication implements CommandLineRunner {

    @Autowired
	private Dao dao;
	@Autowired
	private Environment env;
	

	public static void main(String[] args) {
		SpringApplication.run(ReactsprinApplication.class, args);
	}
	
    @Override
    public void run(String... args) throws Exception {
		/*
		String sql="select new map(i as immeuble,r as rue) from OdhImmeubles i join OdhRues r on i.odimRue = r.odrueId where i.odimRue=1121";
		System.out.println("sql="+sql);
		Collection result=dao.query(sql);
		System.out.println("count="+result.size()); */
		String path="data/1/procedures/2108/documents";
		Path path2=Paths.get(path);
		System.out.println("path2=>"+path2);
		Resource res=new ClassPathResource("/");
		Path path3=Paths.get(res.getFile().toPath().toString(),path);
		System.out.println("path3=>"+path3);
		Files.createDirectories(path3);
		/* 
		Resource res=new ClassPathResource(path);
		System.out.println("=====Resource======");
		System.out.println("url=>"+res.getURL().toString());
		System.out.println("uri=>"+res.getURI().toString());
		System.out.println("fileName=>"+res.getFilename());
		System.out.println("path=>"+res.getFile().toPath().toString());
		Path p=Paths.get(path);
		System.out.println("=====Path======");
		System.out.println("absolutepath=>"+p.toAbsolutePath());
		System.out.println("pathString=>"+p.toString());
		System.out.println("fileName=>"+p.getFileName().toString());
		System.out.println("=====Path resolve file======");
		p=p.resolve("CH-775-BF-txt");
		System.out.println("absolutepath=>"+p.toAbsolutePath());
		System.out.println("pathString=>"+p.toString());
		System.out.println("fileName=>"+p.getFileName().toString());
		*/
    }
    
}
