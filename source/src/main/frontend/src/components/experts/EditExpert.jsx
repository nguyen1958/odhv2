import React, { useEffect, useState, useRef } from 'react';
import { useNavigate, useLocation, Link } from 'react-router-dom';
import { Formik, Form, FieldArray } from 'formik';
import * as yup from 'yup'
import Requetes from '../../commons/Requetes'
import api from '../../commons/api'
import FormControl from '../../formik/FormControl';
import { civilites, formatTel, regTel } from '../../constantes/constante';
import images from '../../constantes/images';

const EditExpert = () => {
    const navigate=useNavigate();
    const {state}= useLocation();
    //get reference to formik component
    const formikRef = useRef();
    const initialValues = {               
        odexpId:"",
        odexpRaison:"",
        odexpCivil:"",
        odexpPren:"",
        odexpNom:"",
        odexpAdr1:"",
        odexpAdr2:"",
        odexpCpost:"",
        odexpVille:"",
        odexpCode:"",
        odexpCom:"",
        odexpTelfix:"",
        odexpTelport:"",
        odexpFax:"",
        odexpMail:"",
    };
    const validationSchema = yup.object({
        odexpCode:yup.string().max(4,"4 car. max").required("Obligatoire"),
        odexpNom:yup.string().required("Obligatoire"),
        odexpAdr1:yup.string().required("Obligatoire"),
        odexpMail:yup.string().email("Format incorrect ----@---.--"),
        odexpTelfix:yup.string().matches(regTel,"Format incorrect"),
        odexpTelport:yup.string().matches(regTel,"Format incorrect"),
        odexpFax:yup.string().matches(regTel,"Format incorrect"),
        
    });
    useEffect(() => {
         //Cas où le Expert est sélectionné
         if (state){
            const getData= async () => {
                try {
                    const r1= await api.requestSql(Requetes.expertById(state.id))
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
           const result=await api.post("/saveExpert",values);
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
                    <span><img src={images.logoMaintenance} /></span>{`Référentiel / `}
                    <Link to="/experts">Experts</Link> {" / "}    
                    { state ? "Modification expert": "Création expert"}                                                                                    
                </div>
                <div className="container">
                    <div className="card text-center">
                        <div className="card-header">
                            <h5 className="header">{ state ? "Modifier expert": "Créer expert"}</h5>
                        </div>
                        <div className="card-body">
                            <Form >     
                                <div className="row form-group">
                                    <FormControl control="input" className="col-1" label="ID" name="odexpId" readOnly /> 
                                    <FormControl control="select" className="col-1" label="Civilité" name="odexpCivil">
                                        <option value=""></option>
                                        {
                                            civilites?.map((item,index)=><option key={index} value={item}>{item}</option>)                                        
                                        }
                                    </FormControl>                                                             
                                    <FormControl control="input" className="col" label="Nom*" name="odexpNom" 
                                            onChange={(e)=> setFieldValue(e.target.name,e.target.value.toUpperCase())}/>
                                    <FormControl control="input" className="col" label="Prénom" name="odexpPren"/> 
                                    <FormControl control="input" className="col-4" label="Raison social" name="odexpRaison" />                              
                                </div>
                                <div className="row form-group">
                                    <FormControl control="input" className="col" label="Adresse1*" name="odexpAdr1" />
                                    <FormControl control="input" className="col" label="Adresse2" name="odexpAdr2" />
                                    <FormControl control="input" className="col-1" label="CPostal" name="odexpCpost" />
                                    <FormControl control="input" className="col-2" label="Ville" name="odexpVille" />                               
                                </div>
                                <div className="row form-group">
                                    <FormControl control="input" className="col-2" label="Code*" name="odexpCode" />                               
                                    <FormControl control="input" className="col-2" label="Tel. fixe" name="odexpTelfix" placeholder={formatTel}/> 
                                    <FormControl control="input" className="col-2" label="Tel. portable" name="odexpTelport" placeholder={formatTel}/> 
                                    <FormControl control="input" className="col-2" label="Fax" name="odexpFax" placeholder={formatTel}/> 
                                    <FormControl control="input" className="col" label="Email" name="odexpMail" />                                    
                                </div>
                                <div className="row form-group">
                                    <FormControl control="textarea" className="col" label="Commentaire" name="odexpCom" />
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

export default EditExpert;
