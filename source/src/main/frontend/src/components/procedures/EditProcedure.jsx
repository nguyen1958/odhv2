import React, { useEffect, useState, useRef } from 'react';
import { useLocation, Link, useNavigate } from 'react-router-dom';
import { Formik, Form } from 'formik';
import * as yup from 'yup'
import Requetes from '../../commons/Requetes'
import api from '../../commons/api'
import FormControl from '../../formik/FormControl';
import { stringToDate } from '../../commons/Utils';
import images from '../../constantes/images';
import ListePiecesJointes from '../piecesJointes/ListePiecesJointes';


const EditProcedure = () => {

    const {state}= useLocation();
    const navigate=useNavigate()
    //get reference to formik component
    const formikRef = useRef();
    //Pour gérer les listes nature intervention et expert
    const naturesrcRef=useRef();
    const naturedestRef=useRef();
    const expertsrcRef=useRef();
    const expertdestRef=useRef();
    //initialiser les liste des select
    const [listes,setListes]=useState([]);
    //Spread liste into each select list avec ordre à respecter
    const [typeProcedures,natures,suiveurs,experts,immeubles,info]=listes;
    const [documents,setDocuments]=useState([])
    const [photos,setPhotos]=useState([])

    const initialValues = {
        procedure:{
            odimrId:"",
            odimrDate:"",
            odimrDatefin:"",
            odimrPeril:"114",
            odimrRelog:"",
            odimrImmeuble:state?.immId,
            odimrSuiveur:"",
            odimrCommentaire:"",
        },                     
        naturedest:[],
        expertdest:[]          
    };
    const validationSchema = yup.object({
        procedure:yup.object({
            odimrPeril:yup.string().required("Obligatoire"),
            odimrImmeuble:yup.string().required("Obligatoire"),
        })
    });
    
    useEffect(() => {
        //Initialiser les liste de select pour rues et syndics
        //variables locales servant pour constituer la liste des afffectations
        let natureIntervion=null; let experts=null;
        const getListe = async () => {
            try {
                const [r1,r2,r3,r4,r5,r6]= await api.requestManySql(Requetes.listeTypeProcedures,
                                                        Requetes.listeTypeInterventions, 
                                                        Requetes.suiveurs,
                                                        Requetes.experts,
                                                        Requetes.listeImmeubles,
                                                        Requetes.infoImmeuble(state.immId))
                setListes([r1.data,r2.data,r3.data,r4.data,r5.data,r6.data[0]])
                natureIntervion=r2.data;experts=r4.data;
            }
            catch (error) {
                alert(error)
            }
            //Cette procédure est placée exprès à l'intérieure de getListe pour bénéficier des listes natureIntervention et experts 
            //pour rebâtir la liste des affectations
            //Cas où la procedure est sélectionné
            //Noter il faut convertir en Objet Date la date reçu au format string 
            //sinon la date sera affectée "01/01/1970" par défaut au lieu de espace si la date est nulle
            if (state?.id){
                    try {
                        const [r1,r2,r3]= await api.requestManySql(Requetes.procedureById(state.id),
                                                                    Requetes.natureprocEltByProcId(state.id),
                                                                    Requetes.expprocEltByProcId(state.id))
                        console.log("procedures dans EditProcedure",r1.data[0])
                        const procedure=r1.data[0];                      
                        formikRef.current.setValues(prev => ({...prev,
                                                                procedure:{...procedure,
                                                                            odimrDate:stringToDate(procedure.odimrDate),
                                                                            odimrDatefin:stringToDate(procedure.odimrDatefin)},
                                                                naturedest:r2.data,
                                                                expertdest:r3.data  
                                                                }));
                        console.log("natureproc,expproc",r2.data,r3.data)
                        //Créer les éléments de naturedest et expertdest
                        natureIntervion.forEach(nature => {
                            //console.log("nature",nature)
                            if(r2.data.includes(nature.odntId)){
                                naturedestRef.current.options.add(new Option(nature.odntNom,nature.odntId))                                   
                            }
                                
                        });
                        experts.forEach(expert => {
                            if(r3.data.includes(expert.odexpId)){
                                expertdestRef.current.options.add(new Option(`${expert.odexpPren} ${expert.odexpNom}`,expert.odexpId))                                   
                            }                               
                        });
                        //documents et photos
                        const r7=await api.post("/getListFiles",{type:"document",immId:state.immId,procId:state.id})
                        const r8=await api.post("/getListFiles",{type:"photos",immId:state.immId,procId:state.id})
                        setDocuments(r7.data)
                        setPhotos(r8.data)
                    }
                    catch (error) {
                        alert(error)
                    }
            }
            else formikRef.current.resetForm();

        };
        getListe();       

        return ()=>{}

    }, []);
    //Rebâtir values en introduisant les liste naturedest et expertdest
    //Sélectionner toutes les lignes poour qu'elles soient dans le formulaire (values) avant de soumettre au serveur
    //les liste naturedest et expertdest
    const onSubmit= async (values,helpers) => {
        try{  
           const resultat={...values,
                            naturedest:Array.from(naturedestRef.current.options).map(o=>o.value),
                            expertdest:Array.from(expertdestRef.current.options).map(o=>o.value)}
            console.log("values updated",resultat)
           const result=await api.post("/saveProcedure",resultat)
           formikRef.current.setValues((prev)=>({...prev,...result.data,
                                                    odimrDate:stringToDate(result.data.odimrDate),
                                                    odimrDatefin:stringToDate(result.data.odimrDatefin)}));
           alert("Enregistrement effectué et actualisé ...")
           console.log("resultat",result)
        }
        catch(error){
           alert(error) 
        }
        helpers.setSubmitting=false
    };

    const removeOption=(items)=>{
        //console.log("select",items)
        items.options[items.selectedIndex].remove()      
    }

    const addOption=(src,dest)=>{
        const selection=src.options[src.selectedIndex];      
        const exist=Array.from(dest.options).map(o=>o.value).includes(selection.value)
        if(exist) {
            alert("Ce choix est déjà affecté ...")
            return
        }
        const option= new Option(selection.text,selection.value)
        //console.log("selection",selection)
        dest.options.add(option)
    }


    console.log("formik.values",formikRef?.current?.values);

    return <div>
        <div className="bold mb-1">
            <span><img src={images.procedure} alt="logoProcedure"/></span>{` Procédures / Immeuble `}
            <Link to="/immeubles/edit" state={{id:info?.id}}>{info?.cadastre}</Link> {"/ "}                                
            <Link to="/immeubles/detail" state={{id:info?.id}}>Global</Link> {"/ "} 
            {
                state?.id ?(<><span>Modification procédure</span> {"/ "}                                
                            <Link to="/procedures/edit" state={{immId:info?.id}}>Ajouter une procédure</Link></>)
                        : <span>Ajouter une procédure</span>
            }              
        </div>     
        <Formik innerRef={formikRef}
                   initialValues={initialValues}
                   validationSchema={validationSchema}
                   onSubmit={ onSubmit } >
            {
            ({isSubmitting,isValid}) => (
                <div className="card editProcedure text-center">
                    <div className="card-header">
                        <h5 className="header">{ state?.id ? "Modification procédure": "Creation procédure"}</h5>
                    </div>
                    <div className="card-body">
                        <Form >
{/*==========Donnée générales ================*/}                      
                            <div>
                                <h6>Données générales</h6>
                                <div className="row form-group">
                                    <FormControl control="input" className="col-1" label="ID" name="procedure.odimrId" readOnly /> 
                                    <div className="col-3">
                                        <div className="row">
                                            <FormControl control="select" className="col" label="Type de procédure*" name="procedure.odimrPeril" >
                                                <option value=""></option>
                                                {
                                                    typeProcedures?.map((item,index)=>{
                                                        return <option key={index} value={item.odntId}>{item.odntNom}</option>
                                                    })
                                                }                                       
                                            </FormControl>
                                            <FormControl control="checkbox" className="col-2 justify-content-center" label="Reloger"  name="procedure.odimrRelog"/>                                         
                                        </div>                                     
                                    </div>                                  
                                    <FormControl control="date"  label="Date procédure" name="procedure.odimrDate"/>
                                    <FormControl control="date"  label="Date fin procédure " name="procedure.odimrDatefin"/>
                                    <FormControl control="select" className="col" label="Suiveur" name="procedure.odimrSuiveur" >
                                        <option value=""></option>
                                        {
                                            suiveurs?.map((item,index)=><option key={index} value={item.odsuId}>{item.odsuPren} {item.odsuNom}</option>)                                        
                                        }
                                    </FormControl>
                                    <FormControl control="select" className="col-3" label="Immeuble*" name="procedure.odimrImmeuble" >
                                        <option value=""></option>
                                        {
                                            immeubles?.map((item,index)=><option key={index} value={item.id}>{item.cadastre} | {item.adresse}</option>)                                        
                                        }
                                    </FormControl>
                                </div>
                                {/* Nature d'intervention */}
                                <div className="row form-group">
                                    <div className="col-6">
                                        <div className="row mt-2">
                                            <div className="col">
                                                <FormControl innerRef={naturesrcRef}  control="select" label="Nature d'interventions" name="naturesrc" multiple style={{height:'7rem'}}>
                                                    {
                                                        natures?.map((item,index)=><option key={index} value={item.odntId}>{item.odntNom}</option>)                                        
                                                    }
                                                </FormControl>
                                            </div>
                                            <div className="d-flex flex-column justify-content-around">
                                                <div style={{height:'15px'}}></div>
                                                <img src={images.flecheD} alt="" className="cursor" onClick={()=>addOption(naturesrcRef.current,naturedestRef.current)}/>
                                                <img src={images.flecheG} alt="" className="cursor" onClick={()=>removeOption(naturedestRef.current)}/>
                                            </div>
                                            <div className="col">
                                                <FormControl innerRef={naturedestRef} control="select" label="Nature d'interventions affectées"  name="procedure.naturedest" multiple style={{height:'7rem'}}>                                        
                                                </FormControl>
                                            </div>
                                        </div>
                                    </div>
                                    {/* Experts */}
                                    <div className="col-6">
                                        <div className="row mt-2">
                                            <div className="col">
                                                <FormControl innerRef={expertsrcRef} control="select" label="Experts" name="expertsrc" multiple style={{height:'7rem'}}>
                                                    {
                                                        experts?.map((item,index)=><option key={index} value={item.odexpId}>{item.odexpPren} {item.odexpNom}</option>)                                       
                                                    }
                                                </FormControl>
                                            </div>
                                            <div className="d-flex flex-column justify-content-around">
                                                <div style={{height:'15px'}}></div>
                                                <img src={images.flecheD} alt="" className="cursor" onClick={()=>addOption(expertsrcRef.current,expertdestRef.current)}/>
                                                <img src={images.flecheG} alt="" className="cursor" onClick={()=>removeOption(expertdestRef.current)}/>
                                            </div>
                                            <div className="col">
                                                <FormControl innerRef={expertdestRef} control="select" label="Experts affectés"  name="procedure.expertdest" multiple style={{height:'7rem'}}>                                                 
                                                </FormControl>
                                            </div>
                                        </div>
                                    </div>
                                </div>                   
                                <div className="row form-group">
                                    <FormControl control="textarea" className="col" label="Description" name="procedure.odimrCommentaire" />
                                </div>
                            </div>
                            {/*=======Documents et photos======= */}   
                            {
                                state?.id ? <>
                                    <div className="row align-items-center mb-1">
                                        <h6 className="col-3">Documents et Photos</h6>
                                        <div className="col-1">
                                            <button type="button" className="btn btn-success btn-sm bold"
                                                onClick={()=>{navigate("/piecesjointes",{state:{immId:state.immId,
                                                                                                procId:state.id,
                                                                                                cadastre:info.cadastre}})}}>
                                                Modifier
                                            </button>
                                        </div>
                                    </div>        
                                    <ListePiecesJointes documents={documents} photos={photos} immId={state.id}  />
                                </>
                                : null
                            }                                                         
                            <hr />              
                            <div className="row form-group justify-content-center">
                                <div className="col-4">
                                    <button type="submit" className="btn btn-primary btn-block"
                                     disabled={isSubmitting || !isValid}>Enregistrer</button>
                                </div>
                            </div>
                        </Form>
                    </div>
                </div>
            )}
        </Formik>
    </div>
}

export default EditProcedure;

