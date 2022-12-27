import React, { useState,useEffect } from 'react';
import { Formik,Form } from 'formik'
import FormControl from '../../formik/FormControl'
import { useNavigate } from 'react-router-dom';
import api from '../../commons/api'
import Requetes from '../../commons/Requetes'
import { dateToStringSql } from '../../commons/Utils';
import ListeListing from './ListeListing';


const RechercheListing = () => {
    const navigate=useNavigate()
    const [resultat,setResultat]= useState(null)
    //initialiser les liste des select
    const [typeProcedures,setTypeProcedures]=useState([])
    const [rues,setRues]=useState([])
    const initialValues = {
        choix:"immeuble",
        cadsct: '',
        cadp1: '',
        rue:'',
        dateProcedure:"",
        typeProcedure:"",
    }

    const options=[
        {key:"immeuble",value:"immeuble"},
        {key:"procedure",value:"procedure"},     
    ]

    useEffect(() => {
        //Initialiser les liste de select
        const getListe = async () => {
            try {
                const [r1,r2]= await api.requestManySql(Requetes.listeRues,
                                                        Requetes.listeTypeProcedures)
                setRues(r1.data)
                setTypeProcedures(r2.data)
                //console.log("procedures",r2.data,r3.data)
            }
            catch (error) {
                alert(error)
            }
        }
        getListe()

        return ()=>{}

    }, []);


    const onSubmit= async (values,helpers)=> {
        const sqlImmeuble=`select distinct new map(i.odimId as id,
            concat(i.odimCadsct,'-',i.odimCadp1) as cadastre,
            concat(i.odimNum,' ',r.odrueType,' ',r.odrueLiaison,' ',r.odrueNom) as adresse,
            concat(s.odsynCode,'-',s.odsynRaison) as syndic,
            us.odntNom as usage,tprop.odntNom as typepropriete)    
        from OdhImmeubles i
        left join OdhRues r on i.odimRue=r.odrueId
        left join OdhProceduresimr p on i.odimId=p.odimrImmeuble
        left join OdhSyndics s on i.odimSyndic=s.odsynId
        left join OdhNatures us on us.odntId=i.odimGroupe
        left join OdhNatures tprop on tprop.odntId=i.odimType`;

        const sqlProcedure=`select distinct new map(p.odimrId as id,
            concat(i.odimCadsct,'-',i.odimCadp1) as cadastre,
            concat(s.odsynCode,'-',s.odsynRaison) as syndic,
            concat(sv.odsuPren,' ',sv.odsuNom) as suiveur,
            tproc.odntNom as typeprocedure,
            p.odimrDate as date,
            p.odimrDatefin as datefin)            
        from OdhProceduresimr p
        left join OdhImmeubles i on i.odimId=p.odimrImmeuble
        left join OdhRues r on i.odimRue=r.odrueId
        left join OdhSyndics s on i.odimSyndic=s.odsynId
        left join OdhSuiveurs sv on p.odimrSuiveur=sv.odsuId
        left join OdhNatures tproc on tproc.odntId=p.odimrPeril`;  
        //cas 2 choix possible
        let reqSql=values.choix==="immeuble"?sqlImmeuble:sqlProcedure;
        let where=" Where";
        if (values.cadsct !== "") where += " and i.odimCadsct= '" + values.cadsct + "'";
        if (values.cadp1 !== "") where += " and i.odimCadp1='" + values.cadp1 + "'";
        if (values.rue !== "") where += " and i.odimRue="+values.rue;
        //date procedure
        if (values.dateProcedure !== "") where += " and p.odimrDate='" + dateToStringSql(values.dateProcedure)+"'";
        //type procedure
        if (values.typeProcedure !== "") where += " and p.odimrPeril='" + values.typeProcedure + "'";
        //retirer le premier and
        where = where.replace("and", "");
        if (where.length > 6) reqSql += where;
        const result= await api.requestSql(reqSql)
        setResultat({choix:values.choix,data:result.data});
        console.log("result req",result.data)
        console.log("values",values)
        console.log("reqsql",reqSql)

        
    }

    return (
        <Formik enableReinitialize 
        initialValues={initialValues} 
        onSubmit={onSubmit}>
        {
            ({values,isSubmitting,setFieldValue,resetForm}) => (
            <Form >
                <div className="card text-center">
                    <div className="card-header">
                        <h5 className="header">
                            Listing
                            <FormControl control="radio" name="choix" options={options}/> 
                        </h5>
                    </div>
                    <div className="card-body">                  
                        <div className="row form-group">
                            <FormControl className="col-1" label="Section" control="input" name="cadsct"/> 
                            <FormControl className="col-1" label="Parcelle1" control="input" name="cadp1"/>
                            <FormControl control="autoSelect" className="col" label="Rue" name="rue" 
                                        options={rues} 
                                        renderOption={(props, option) => (
                                            <li {...props} key={option.id}> {option.nomrue}</li>)}
                                        getOptionLabel={(option) => option.nomrue || ""}                                     
                                        onChange={(e,item)=>{setFieldValue("rue",item?item.id:"")}}
                                        isOptionEqualToValue={(option,value)=>option.id===value.id}
                                        value={rues.find(option=>option.id==values.rue) || null}
                                    />        
                            {/*
                            <FormControl control="select" className="col" label="Rue" name="rue" >
                                <option value=""></option>
                                {
                                    rues?.map((o,index)=><option key={index} value={o.id}>{o.nomrue}</option>)
                                }         
                            </FormControl>
                            */}                                                                 
                            <FormControl control="select" className="col-3" label="Type de procédure" name="typeProcedure" >
                                <option value=""></option>
                                {
                                    typeProcedures?.map((o,index)=><option key={index} value={o.odntId}>{o.odntNom}</option>)
                                }         
                            </FormControl>                              
                            <FormControl className="col-2" label="Date de procédure" control="date" name="dateProcedure"/>                                                                                                         
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
                        </div>
                    </div>
                    <div> 
                        
                    </div>  
                </div>
                <div> 
                    { resultat && resultat.data.length===0 && <h5 className="text-center">Aucune donnée trouvée !</h5> }
                    { resultat && resultat.data.length >0 && <ListeListing resultat={resultat}/> } 
                </div>  
            </Form>)
        }         
        </Formik> 
    );
}

export default RechercheListing;
