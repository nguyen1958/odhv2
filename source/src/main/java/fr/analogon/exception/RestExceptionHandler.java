package fr.analogon.exception;

import java.io.IOException;

import org.springframework.dao.DataIntegrityViolationException;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.servlet.NoHandlerFoundException;

@ControllerAdvice
@ResponseBody
public class RestExceptionHandler{
//Gestion d'erreur par type erreur(exception class)	
	@ExceptionHandler(RuntimeException.class)
	public ResponseEntity<?> generalException(Exception ex) {
		System.out.println("in Exception handler");
		ex.printStackTrace();
		return new ResponseEntity<ExceptionResponse>(
				new ExceptionResponse(ex.getMessage(),"Erreur technique globale ..."),
				HttpStatus.INTERNAL_SERVER_ERROR);

	}

	@ExceptionHandler(DataIntegrityViolationException.class)
	public ResponseEntity<?> constraintViolationException(DataIntegrityViolationException ex) {
		System.out.println("in ConstraintViolationException handler");
		String cause=ex.getMessage();
		Throwable t = ex.getCause();
            while (t.getCause() != null) {
				cause=t.getMessage();
                t = t.getCause();          
            }
		return new ResponseEntity<ExceptionResponse>(
				new ExceptionResponse(cause,"Erreur base de données ...","Suppression impossible, suite au problème d'intégrité référentielle"),
				HttpStatus.CONFLICT);

	}

	@ExceptionHandler(DaoException.class)
	public ResponseEntity<?> daoException(DaoException ex) {
		System.out.println("in DaoException handler");
		System.out.println("cause "+ex.getMessage());
		String cause=ex.getMessage();
		Throwable t = ex.getCause();
            while (t.getCause() != null) {
				cause=t.getMessage();
                t = t.getCause();          
            }
		return new ResponseEntity<ExceptionResponse>(
				new ExceptionResponse(cause,"Erreur base de données ...",ex.getErreur()),
				HttpStatus.INTERNAL_SERVER_ERROR);

	}

	@ExceptionHandler(IOException.class)
	public ResponseEntity<?> ioException(IOException ex) {
		System.out.println("in IO Exception handler:"+ex.toString());
		//ex.printStackTrace();
		return new ResponseEntity<ExceptionResponse>(
				new ExceptionResponse(ex.getMessage(),"Erreur d'entrée/sortie du fichier ..."),
				HttpStatus.INTERNAL_SERVER_ERROR);
	}
	
	@ExceptionHandler(NoHandlerFoundException.class)
	public ResponseEntity<?> noHandlerException(NoHandlerFoundException ex) {
		System.out.println("in NoHandlerFoundException handler");
		return new ResponseEntity<ExceptionResponse>(
				new ExceptionResponse(ex.getMessage(),"Requête non définie ..."),
				HttpStatus.NOT_FOUND);
	}
	
	
}
