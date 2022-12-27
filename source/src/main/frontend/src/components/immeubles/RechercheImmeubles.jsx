import React, { useState,useEffect } from 'react';
import { Formik,Form } from 'formik'
import FormControl from '../../formik/FormControl'
import { useNavigate } from 'react-router-dom';
import api from '../../commons/api'
import Requetes from '../../commons/Requetes'
import ListeImmeubles from './ListeImmeubles';
import { dateToStringSql } from '../../commons/Utils';


const RechercheImmeubles = () => {
    const navigate=useNavigate()
    const [immeubles, setImmeubles]= useState(null)
    //initialiser les liste des select
    const [listes,setListes]=useState([])
    //Spread liste into each select list avec ordre à respecter
    const [rues,typeProcedures,natureInterventions,proprietaires,locataires]=listes;
    const [options,setOptions]=useState([])
    const [initialValues,setInitialValues] = useState({
        odimId:'',
        odimCanton: '',
        odimCadsct: '',
        odimCadp1: '',
        odimRue:'',
        proprietaire:"",
        locataire:"",
        natureIntervention:"",
        typeProcedure:"",
        dateApres:"",
        dateAvant:"",
        procedure:"",
        etat:"",
    })

    const radioProcedures=[
        {key:"Oui",value:"oui"},
        {key:"Non",value:"non"},
        {key:"Toutes",value:""}
    ]
    const radioEtats=[
        {key:"En cours",value:"encours"},
        {key:"Clôturés",value:"clos"},
        {key:"Toutes",value:""}
    ]

    useEffect(() => {
        //Initialiser les liste de select
        const getListe = async () => {
            try {
                const [r1,r2,r3,r4,r5]= await api.requestManySql(Requetes.listeRues,
                                                     Requetes.listeTypeProcedures,
                                                     Requetes.listeTypeInterventions,
                                                     Requetes.listeProprietaires,
                                                     Requetes.listeLocatiares)
                setListes([r1.data,r2.data,r3.data,r4.data,r5.data])
                setOptions(r1.data)
                //console.log("procedures",r2.data,r3.data)
            }
            catch (error) {
                alert(error)
            }
        }
        getListe()

        const requestImmeuble=JSON.parse(sessionStorage.getItem("requestImmeuble"))
        console.log("requestImmeuble",requestImmeuble)
        //Remettre requête de recherche précédente
        if (requestImmeuble) {
            executeRequest(requestImmeuble)
        }

        return ()=>{}

    }, []);

    const executeRequest=async (reqSql)=>{
        try {
            const result= await api.requestSql(reqSql)
            setImmeubles(result.data) 
            console.log("Resultat recherche immeuble",result.data)          
        }
        catch (error) {
            alert(error)
        }
    }


    const onSubmit= async (values,helpers)=> {
        console.log("submit callback ...",values)
        //id besoin avoir unique key dans datatable
        let reqSql=`select distinct new map(i.odimId as id,
                                            concat(i.odimCadsct,'-',i.odimCadp1) as cadastre,
                                            concat(i.odimNum,' ',r.odrueType,' ',r.odrueLiaison,' ',r.odrueNom) as nomrue,
                                            i.odimNom as nom,
                                            (select count(odimrId) from OdhProceduresimr where odimrImmeuble=i.odimId) as nbprocedure,
                                            (select count(odlotId) from OdhLots where odlotImmeuble=i.odimId) as nblot)
        from OdhImmeubles i
        left join OdhRues r on i.odimRue=r.odrueId
        left join OdhLots l on i.odimId=l.odlotImmeuble
        left join OdhProceduresimr p on i.odimId=p.odimrImmeuble
        left join OdhNatproc np on np.id.odnpProc=p.odimrId`;   
        let where=" Where";
        if (values.odimCanton !== "") where += " and i.odimCanton='" + values.odimCanton+"'";
        if (values.odimCadsct !== "") where += " and i.odimCadsct= '" + values.odimCadsct + "'";
        if (values.odimCadp1 !== "") where += " and i.odimCadp1='" + values.odimCadp1 + "'";
        if (values.odimRue !== "") where += " and i.odimRue="+values.odimRue;
        //proprietaire
        if (values.proprietaire !== "") where += " and l.odlotProprietaire="+values.proprietaire;
        //locataire
        if (values.locataire !== "") where += " and l.odlotLocataire="+values.locataire;
        //date apres et avant
        if (values.dateApres !== "") where += " and p.odimrDate>='" + dateToStringSql(values.dateApres)+"'";
        if (values.dateAvant !== "") where += " and p.odimrDate<= '" + dateToStringSql(values.dateAvant) + "'";
        //procedure
        if (values.procedure == "oui") where += " and p.odimrPeril is not null";
        if (values.procedure == "non") where += " and p.odimrPeril is null";
        //état procedure
        if (values.etat == "clos") where += " and p.odimrDatefin is not null";
        if (values.etat == "encours") where += " and p.odimrDatefin is null";
        //type procedure
        if (values.typeProcedure !== "") where += " and p.odimrPeril='" + values.typeProcedure + "'";
        //nature d'intervention
        if (values.natureIntervention !== "") where += " and np.id.elt="+values.natureIntervention;
        
        //retirer le premier and
        where = where.replace("and", "");
        if (where.length > 6) reqSql += where;
        executeRequest(reqSql)
        //Mémoriser la requête de recherche pour la prochaine connexion
        sessionStorage.setItem("requestImmeuble",JSON.stringify(reqSql))  
    }

    return (
        <Formik enableReinitialize 
        initialValues={initialValues} 
        onSubmit={onSubmit}>
        {
            ({values,setFieldValue,isSubmitting,resetForm}) => (
            <Form >
                <div className="card text-center">
                    <div className="card-header">
                        <h5 className="header">Immeubles</h5>
                    </div>
                    <div className="card-body">                  
                            <div className="row form-group">                                                                
                                <FormControl control="input" className="col-1" label="Canton" name="odimCanton" />       
                                <FormControl control="input" className="col-1" label="Secteur"name="odimCadsct" /> 
                                <FormControl control="input" className="col-1" label="Parcelle" name="odimCadp1" />
                                <FormControl control="autoSelect" className="col" label="Rue" name="odimRue" 
                                        options={options} 
                                        renderOption={(props, option) => (
                                            <li {...props} key={option.id}> {option.nomrue}</li>)}
                                        getOptionLabel={(option) => option.nomrue || ""}                                     
                                        onChange={(e,item)=>{setFieldValue("odimRue",item?item.id:"")}}
                                        isOptionEqualToValue={(option,value)=>option.id===value.id}
                                        value={options.find(option=>option.id==values.odimRue) || null}
                                    />        
                                {/*
                                <FormControl control="select" className="col" label="Rue" name="odimRue" >
                                    <option value=""></option>
                                    {
                                        rues?.map((rue,index)=><option key={index} value={rue.id}>{rue.nomrue}</option>)
                                    }         
                                </FormControl>
                                */}
                                <FormControl control="select" className="col" label="Propriétaire" name="proprietaire" >
                                    <option value=""></option>
                                    {
                                        proprietaires?.map((p,index)=><option key={index} value={p.id}>{p.nom}</option>)
                                    }         
                                </FormControl>
                                <FormControl control="select" className="col" label="Locataire" name="locataire" >
                                    <option value=""></option>
                                    {
                                        locataires?.map((l,index)=><option key={index} value={l.id}>{l.nom}</option>)
                                    }         
                                </FormControl>                                                                                 
                            </div>
                            <div className="row form-group">                                                                
                                <FormControl control="select" className="col" label="Nature d'intervention" name="natureIntervention" >
                                    <option value=""></option>
                                    {
                                        natureInterventions?.map((o,index)=><option key={index} value={o.odntId}>{o.odntNom}</option>)
                                    }         
                                </FormControl>
                                <FormControl control="select" className="col" label="Type de procédure" name="typeProcedure" >
                                    <option value=""></option>
                                    {
                                        typeProcedures?.map((o,index)=><option key={index} value={o.odntId}>{o.odntNom}</option>)
                                    }         
                                </FormControl>                           
                                <FormControl control="date" label="Date procédure après" className="col-2" name="dateApres"/> 
                                <FormControl control="date" label="Date procédure avant" className="col-2" name="dateAvant"/>                          
                                <FormControl control="radio" className="col-2" label="Procédures" name="procedure" options={radioProcedures}/>
                                <FormControl control="radio"  label="Etat procédure" name="etat" options={radioEtats}/>                                                                          
                            </div>
                            <hr />
                            <div className="row">
                                <div className="col-3 ">
                                    <button type="button" className="btn btn-warning btn-block" 
                                            onClick={()=>resetForm()}>
                                        <i className="fa fa-recycle mr-2"></i> Réinitialiser paramètres recherche
                                    </button>
                                </div>
                                <div className="col-4 offset-1 mr-auto">
                                    <button type="submit" className="btn btn-primary btn-block">
                                        <i className="fa fa-search mr-2"></i> Rechercher 
                                        { isSubmitting && <i className="fa fa-spinner fa-spin ml-2"></i> }
                                    </button>
                                </div>
                                <div className="col-2 ">
                                    <button type="button" className="btn btn-success" 
                                        onClick={()=>navigate("/immeubles/edit")} >
                                        <i className="fa fa-plus"></i> Ajouter un immeuble
                                    </button>
                                </div>
                            </div>                       
                    </div>
                </div>
                <div> 
                    { immeubles && immeubles.length===0 && <h5 className="text-center">Aucune donnée trouvée !</h5> }
                    { immeubles && immeubles.length >0 && <ListeImmeubles data={immeubles} ajouter="immeubles" /> } 
                </div>  
            </Form>)
        }         
        </Formik> 
    );
}

export default RechercheImmeubles;
