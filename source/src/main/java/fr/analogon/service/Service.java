package fr.analogon.service;

import java.sql.SQLException;

import javax.transaction.Transactional;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;

import fr.analogon.dao.Dao;
import fr.analogon.dto.DtoImmeuble;
import fr.analogon.dto.DtoLot;
import fr.analogon.dto.DtoProcedure;
import fr.analogon.entities.OdhDeclarations;
import fr.analogon.entities.OdhEntreprises;
import fr.analogon.entities.OdhEtatpar;
import fr.analogon.entities.OdhExperts;
import fr.analogon.entities.OdhExpproc;
import fr.analogon.entities.OdhImmeubles;
import fr.analogon.entities.OdhLocataires;
import fr.analogon.entities.OdhLocslot;
import fr.analogon.entities.OdhLots;
import fr.analogon.entities.OdhNatproc;
import fr.analogon.entities.OdhNatures;
import fr.analogon.entities.OdhProceduresimr;
import fr.analogon.entities.OdhProprietaires;
import fr.analogon.entities.OdhPropslot;
import fr.analogon.entities.OdhRelogements;
import fr.analogon.entities.OdhRues;
import fr.analogon.entities.OdhSuiveurs;
import fr.analogon.entities.OdhSyndics;
import fr.analogon.entities.OdhUtilisateurs;
import fr.analogon.exception.DaoException;


@Transactional
@org.springframework.stereotype.Service
public class Service {
    private Logger log= LoggerFactory.getLogger(Service.class);
    @Autowired
    private Dao dao;
 
    public synchronized  OdhImmeubles saveImmeuble(DtoImmeuble data) throws DaoException {
        log.info("dtoImmeuble\n"+data.toString());
        OdhImmeubles immeuble= (OdhImmeubles) dao.save(data.getImmeuble());
        OdhEtatpar sanitaire=data.getSanitaire();
        sanitaire.setOdetImmeuble(immeuble.getOdimId());
        dao.save(sanitaire);
        return immeuble;
    }
    
    public synchronized  OdhProprietaires saveProprietaire(OdhProprietaires data) throws DaoException {		
        return (OdhProprietaires) dao.save(data);	
    }
    public synchronized void removeProprietaire(int id) throws DaoException{	
        dao.remove(OdhProprietaires.class,id);
    }

    public synchronized  OdhLocataires saveLocataire(OdhLocataires data) throws DaoException {	
        return (OdhLocataires) dao.save(data);
    }
    public synchronized void removeLocataire(int id) throws DaoException{	
        dao.remove(OdhLocataires.class,id);
    }

    public synchronized  OdhRues saveRue(OdhRues data) throws DaoException {	
        return (OdhRues) dao.save(data);
    }
    public synchronized void removeRue(int id) throws DaoException{	
        dao.remove(OdhRues.class,id);
    }

    public synchronized  OdhExperts saveExpert(OdhExperts data) throws DaoException {	
        return (OdhExperts) dao.save(data);
    }
    public synchronized void removeExpert(int id) throws DaoException{	
        dao.remove(OdhExperts.class,id);
    }

    public synchronized  OdhSuiveurs saveSuiveur(OdhSuiveurs data) throws DaoException {	
        return (OdhSuiveurs) dao.save(data);
    }
    public synchronized void removeSuiveur(int id) throws DaoException{	
        dao.remove(OdhSuiveurs.class,id);
    }

    public synchronized  OdhSyndics saveSyndic(OdhSyndics data) throws DaoException {	
        return (OdhSyndics) dao.save(data);
    }
    public synchronized void removeSyndic(int id) throws DaoException{	
        dao.remove(OdhSyndics.class,id);
    }

    public synchronized  OdhRelogements saveRelogement(OdhRelogements data) throws DaoException {	
        return (OdhRelogements) dao.save(data);
    }
    public synchronized void removeRelogement(int id) throws DaoException{	
        dao.remove(OdhRelogements.class,id);
    }

    public synchronized  OdhEntreprises saveEntreprise(OdhEntreprises data) throws DaoException {	
        return (OdhEntreprises) dao.save(data);
    }
    public synchronized void removeEntreprise(int id) throws DaoException{	
        dao.remove(OdhEntreprises.class,id);
    }

    public synchronized  OdhUtilisateurs saveUtilisateur(OdhUtilisateurs data) throws DaoException {	
        return (OdhUtilisateurs) dao.save(data);
    }
    public synchronized void removeUtilisateur(int id) throws DaoException{	
        dao.remove(OdhUtilisateurs.class,id);
    }

    public synchronized  OdhNatures saveOption(OdhNatures data) throws DaoException {	
        return (OdhNatures) dao.save(data);
    }
    public synchronized void removeOption(int id) throws DaoException{	
        dao.remove(OdhNatures.class,id);
    }

    public synchronized  void saveDeclarations(OdhDeclarations[] data) throws DaoException {	
        for (OdhDeclarations element : data) {
            dao.save(element);
        }	
    }

    public synchronized  OdhProceduresimr saveProcedure(DtoProcedure data) throws DaoException {	
        log.info("dtoProcedure\n"+data.toString());
        //Cas modification de lea procedure
        //Supprimer tous les liens natureproc et expproc
        if (data.getProcedure().getOdimrId()!=null) {
            String updateSql="delete from OdhNatproc where id.odnpProc="+data.getProcedure().getOdimrId();
            dao.updateSql(updateSql);
            updateSql="delete from OdhExpproc where id.odepProc="+data.getProcedure().getOdimrId();
            dao.updateSql(updateSql);
        }         
        //Créer ou update procedure  
        OdhProceduresimr procedure=(OdhProceduresimr) dao.save(data.getProcedure());
        //Créer les liens natproc et expproc
        for (int natureId : data.getNaturedest()) {
            dao.save(new OdhNatproc(procedure.getOdimrId(),natureId));
        }
        for (int expertId : data.getExpertdest()) {
            dao.save(new OdhExpproc(procedure.getOdimrId(),expertId));
        }
        return procedure;
    }

    public synchronized  OdhLots saveLot(DtoLot data) throws DaoException {
        log.info("dtoLot\n"+data.toString());
        //Créer ou update lot
        OdhLots lot= (OdhLots) dao.save(data.getLot());
        OdhEtatpar sanitaire=data.getSanitaire();
        //Créer ou update sanitaire
        sanitaire.setOdetLot(lot.getOdlotId());
        dao.save(sanitaire);
        return lot;
    }

    public synchronized  void savePropslot(OdhPropslot data) throws DaoException {
        log.info("OdhPropslot\n"+data.toString());
        dao.save(data);
        //Maj proprietaire dans lot
        OdhLots lot = (OdhLots) dao.getOne(OdhLots.class, data.getOdplLot());
        lot.setOdlotProprietaire(data.getOdplProprietaire()); 
        dao.save(lot); 
    }
    public synchronized void removePropslot(int id) throws DaoException{	
        dao.remove(OdhPropslot.class,id);
    }

    public synchronized  void saveLocslot(OdhLocslot data) throws DaoException {
        log.info("OdhLocslot\n"+data.toString());      
        dao.save(data);
        //Maj locataire dans lot
        OdhLots lot = (OdhLots) dao.getOne(OdhLots.class, data.getOdllLot());
        lot.setOdlotLocataire(data.getOdllLocataire()); 
        dao.save(lot); 
    }
    public synchronized void removeLocslot(int id) throws DaoException{	
        dao.remove(OdhLocslot.class,id);
    }

    
}
