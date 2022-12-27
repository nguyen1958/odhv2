package fr.analogon.utils;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@NoArgsConstructor  @Getter @Setter
public class FileInfo {
    private String name;
    //Représente l'url du chargement du chier sur le serveur
    private String url;

    public FileInfo(String name, String url){
        this.name=name;
        this.url=url;
    }
}
