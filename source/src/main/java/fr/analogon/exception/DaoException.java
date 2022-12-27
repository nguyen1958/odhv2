package fr.analogon.exception;

public class DaoException extends RuntimeException {
    private String erreur="";
    public DaoException(Exception e){
        super(e);
    } 
    public DaoException(Exception e,String erreur){
        super(e);
        this.erreur=erreur;
    }
    public String getErreur() {
        return erreur;
    }
    public void setErreur(String erreur) {
        this.erreur = erreur;
    }

}
