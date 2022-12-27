package fr.analogon.exception;

public class ExceptionResponse {
    private String type="";
	private String message="";
	private String erreur="";
	
	public ExceptionResponse() {}

	public ExceptionResponse(String message, String type,String erreur) {
		this.message = message;
		this.type = type;
		this.erreur=erreur;
	}

	public ExceptionResponse(String message, String type) {
		this.message = message;
		this.type = type;
	}
	public String getMessage() {
		return message;
	}
	public void setMessage(String message) {
		this.message = message;
	}
	public String getType() {
		return type;
	}
	public void setType(String type) {
		this.type = type;
	}

	public String getErreur() {
		return erreur;
	}

	public void setErreur(String erreur) {
		this.erreur = erreur;
	}
	
}
