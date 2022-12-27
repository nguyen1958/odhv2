package fr.analogon.dao;

import java.sql.SQLException;
import java.sql.SQLIntegrityConstraintViolationException;
import java.util.Collection;
import java.util.List;

import javax.persistence.EntityExistsException;
import javax.persistence.EntityManager;
import javax.persistence.NoResultException;
import javax.persistence.PersistenceContext;
import javax.persistence.PersistenceException;
import javax.persistence.Query;

import org.hibernate.exception.ConstraintViolationException;
import org.hibernate.persister.entity.AbstractEntityPersister.CacheEntryHelper;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.dao.DuplicateKeyException;
import org.springframework.stereotype.Repository;

import fr.analogon.exception.DaoException;

@Repository
public class Dao {
    private Logger log= LoggerFactory.getLogger(Dao.class);
    @PersistenceContext(name="jpa") 
    private EntityManager em;
  
    public Dao(){}

    //Obtenir un enregistrement d'une table par son id 
	public Object getOne(Class<?> entity,int id) {
		// TODO Auto-generated method stub
		return em.find(entity, id);		
	}
    
    public Object getOne(String req) throws DaoException {
        // TODO Auto-generated method stub
        try {
            return em.createQuery(req).getSingleResult();
        }
        catch(NoResultException ex) {//entry not found
            return null;
        }
        catch(Exception e) {
            throw new DaoException(e,"Echec à la requête ...");
        }
    }

    public Object getOne(String req, List args) throws DaoException {
		try{
			Object[] obj = args.toArray();
			Query query=em.createQuery(req);
			for(int i=0;i<obj.length;i++){
				query.setParameter(i+1, obj[i]);
			}
			return query.getSingleResult();
		}
        catch(NoResultException ex) {//entry not found
            return null;
        }
		catch (Exception e){
			throw new DaoException(e,"Echec à la requête ...");
		}
	}
        
    public Collection query(String req) throws DaoException {
        // TODO Auto-generated method stub
        try{
            return em.createQuery(req).getResultList();
        }
        catch (Exception e){
            throw new DaoException(e, "Echec à la requête ...");
        }
    }
    /*
    * Query query = em.createQuery("UPDATE Employee e SET e.salary = e.salary = :increment "
    *           + "WHERE e.dept = :dept");
    *   query.setParameter("increment", 500d);
    *   query.setParameter("dept", "IT"); 
    */
    public int updateSql(String req) throws DaoException {
        // TODO Auto-generated method stub
        try{
            return em.createQuery(req).executeUpdate();
        }
        catch (Exception e){
            throw new DaoException(e,"Echec à la mise à jour ...");
        }
    }

    public Object save(Object objet) throws DaoException {
		// TODO Auto-generated method stub
		Object result=null;
		try {
			result=em.merge(objet);
		}
        //Duplicate entry
		catch (EntityExistsException e){
            log.info("EntityExistsException");
			throw new DaoException(e,"Echec à l'enregistrement ...");
		}
		catch (PersistenceException e){
            log.info("PersistenceException");
			throw new DaoException(e,"Echec à l'enregistrement ...");
		}
		
		return result;
	}

    public void remove(Class<?> entity,int id) throws DaoException{
        System.out.println("in dao remove");
        try{
                Object obj = em.find(entity, id);
                //Eviter cas appuyer 2fois suppression
                if(obj!=null) em.remove(obj);
        }
        catch (PersistenceException e){
            log.info("PersistenceException");
			throw new DaoException(e,"Echec à la suppression ...");
		}
        catch (Exception e){
            log.info("removeException");
			throw new DaoException(e,"Echec à la suppression ...");
        };

    }
}
