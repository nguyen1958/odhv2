import React, { useEffect, useState, useRef } from 'react';
import { useNavigate, useLocation, Link } from 'react-router-dom';
import { Formik, Form, FieldArray } from 'formik';
import * as yup from 'yup'
import Requetes from '../../commons/Requetes'
import api from '../../commons/api'
import FormControl from '../../formik/FormControl';
import { civilites, formatTel, regTel, typeUtilisateur } from '../../constantes/constante';
import images from '../../constantes/images';

const EditUtilisateur = () => {
    const navigate=useNavigate();
    const {state}= useLocation();
    //get reference to formik component
    const formikRef = useRef();
    const niveaux=[1,2,3,4,5,6,7,8,9]
    const initialValues = {               
        odutiId:"",
        odutiUtilisateur:"",
        odutiPassword:"",
        odutiValide:"n",
        odutiType:"l",
        odutiModule:"1",
        odutiLect:"1",
        odutiCrea:"1",
        odutiModif:"1",
        odutiCivil:"M.",
        odutiPrenom:"",
        odutiNom:"",
        odutiAdresse1:"",
        odutiAdresse2:"",
        odutiAdresse3:"",
        odutiCodeposte:"",
        odutiVille:"",
        odutiTel:"",
        odutiFax:"",
        odutiMail:"",
        odutiLibelle:""
    };
    const validationSchema = yup.object({
        odutiUtilisateur:yup.string().required("Obligatoire"),
        odutiPassword:yup.string().required("Obligatoire"),
        odutiNom:yup.string().required("Obligatoire"),
        odutiPrenom:yup.string().required("Obligatoire"),
        odutiMail:yup.string().email("Format incorrect ----@---.--").nullable(),
        odutiTel:yup.string().matches(regTel,"Format incorrect").nullable(),
        odutiFax:yup.string().matches(regTel,"Format incorrect").nullable(),
        
    });
    useEffect(() => {
         //Cas où le utiert est sélectionné
         if (state){
            const getData= async () => {
                try {
                    const r1= await api.requestSql(Requetes.utilisateurById(state.id))
                    formikRef.current.setValues(prev => ({...prev,...r1.data[0]}))
                }
                catch (error) {
                    alert(error)
                }
            }
            getData()
        }
        else 
            formikRef.current.resetForm(); //Effacer les données affichées

        return ()=>{}

    }, []);

    const onSubmit= async (values,helpers) => {
        try{
           const result=await api.post("/saveUtilisateur",values);
           if(state) formikRef.current.setValues((prev)=>({...prev,...result.data}));
           else formikRef.current.resetForm();
           alert("Enregistrement effectué et actualisé ...")
        }
        catch(error){
           alert(error) 
        }
    };

    return <Formik innerRef={formikRef}
                   initialValues={initialValues}
                   validationSchema={validationSchema}
                   onSubmit={ onSubmit } >
            {
            ({values,isSubmitting,isValid,setFieldValue}) => (
            <div>
                <div className="bold mb-1">
                    <span><img src={images.logoMaintenance} alt="maintenance" /></span>{`Référentiel / `}
                    <Link to="/Utilisateurs">Utilisateurs</Link> {" / "}   
                    { state ? "Modification Utilisateur": "Création Utilisateur"}                                                                                     
                </div>
                <div className="container">
                    <div className="card text-center">
                        <div className="card-header">
                            <h5 className="header">{ state ? "Modifier Utilisateur": "Créer Utilisateur"}</h5>
                        </div>
                        <div className="card-body">
                            <Form >
                                <div className="row form-group">
                                    <FormControl control="input" className="col-1" label="ID" name="odutiId" readOnly />
                                    <FormControl control="input" className="col-2" label="Code Accès*" name="odutiUtilisateur"/> 
                                    <FormControl control="input" className="col-2" label="Mot de Passe*" name="odutiPassword" />    
                                    <FormControl control="select" className="col-2" label="Type utilisateur" name="odutiType">
                                        <option value=""></option>
                                        {
                                            typeUtilisateur?.map((item,index)=><option key={index} value={item.value}>{item.key}</option>)                                        
                                        }
                                    </FormControl> 
                                    <FormControl control="select" className="col-1" label="Valide" name="odutiValide">
                                        <option value=""></option>
                                        <option value="o">Oui</option>
                                        <option value="n">Non</option>
                                    </FormControl>                                                                                                              
                                </div>     
                                <div className="row form-group">
                                    <FormControl control="select" className="col-1" label="Civilité" name="odutiCivil">
                                        <option value=""></option>
                                        {
                                            civilites?.map((item,index)=><option key={index} value={item}>{item}</option>)                                        
                                        }
                                    </FormControl>                                                             
                                    <FormControl control="input" className="col" label="Nom*" name="odutiNom" 
                                            onChange={(e)=> setFieldValue(e.target.name,e.target.value.toUpperCase())}/>
                                    <FormControl control="input" className="col" label="Prénom*" name="odutiPrenom"/> 
                                    <FormControl control="input" className="col-1" label="CPostal" name="odutiCodeposte" />
                                    <FormControl control="input" className="col-2" label="Ville" name="odutiVille" />                                
                                </div>
                                <div className="row form-group">
                                    <FormControl control="input" className="col" label="Adresse1*" name="odutiAdresse1" />
                                    <FormControl control="input" className="col" label="Adresse2" name="odutiAdresse2" />
                                    <FormControl control="input" className="col" label="Adresse3" name="odutiAdresse3" />                              
                                </div>
                                <div className="row form-group">                            
                                    <FormControl control="input" className="col-2" label="Téléphone" name="odutiTel" placeholder={formatTel}/> 
                                    <FormControl control="input" className="col-2" label="Fax" name="odutiFax" placeholder={formatTel}/> 
                                    <FormControl control="input" className="col" label="Email" name="odutiMail" />                                    
                                </div>
                                <div className="row form-group">
                                    <FormControl control="textarea" className="col" label="Commentaire" name="odutiLibelle" />
                                </div>
                                <h5 className="text-left bold text-primary">Niveau de sécurité</h5>
                                <div className="row form-group">                            
                                    <FormControl control="select" className="col-2" label="Fonction" name="odutiModule">
                                        {
                                            niveaux?.map((item,index)=><option key={index} value={item}>{item}</option>)                                        
                                        }
                                    </FormControl>
                                    <FormControl control="select" className="col-2" label="Lecture" name="odutiLect">
                                        {
                                            niveaux?.map((item,index)=><option key={index} value={item}>{item}</option>)                                        
                                        }
                                    </FormControl>
                                    <FormControl control="select" className="col-2" label="Création" name="odutiCrea">
                                        {
                                            niveaux?.map((item,index)=><option key={index} value={item}>{item}</option>)                                        
                                        }
                                    </FormControl>
                                    <FormControl control="select" className="col-2" label="Modification" name="odutiModif">
                                        {
                                            niveaux?.map((item,index)=><option key={index} value={item}>{item}</option>)                                        
                                        }
                                    </FormControl>                                  
                                </div>
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
                </div>
            </div>
            )}           
        </Formik>
}

export default EditUtilisateur;
