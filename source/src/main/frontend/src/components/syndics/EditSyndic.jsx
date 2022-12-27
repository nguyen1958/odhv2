import React, { useEffect, useState, useRef } from 'react';
import { useNavigate, useLocation, Link } from 'react-router-dom';
import { Formik, Form, FieldArray } from 'formik';
import * as yup from 'yup'
import Requetes from '../../commons/Requetes'
import api from '../../commons/api'
import FormControl from '../../formik/FormControl';
import { civilites, formatTel, regTel } from '../../constantes/constante';
import images from '../../constantes/images';

const EditSyndic = () => {
    const navigate=useNavigate();
    const {state}= useLocation();
    //get reference to formik component
    const formikRef = useRef();
    const initialValues = {               
        odsynId:"",
        odsynRaison:"",            
        odsynAdr1:"",
        odsynAdr2:"",
        odsynCpost:"",
        odsynVille:"",
        odsynTelfix:"",
        odsynFax:"",
        odsynMail:"",
        odsynCom:"",

        odsynRcivil:"",
        odsynRpren:"",
        odsynRnom:"",
        odsynRtelfix:"",
        odsynRtelport:"",
        odsynRfax:"",
        odsynRmail:"",
    };
    const validationSchema = yup.object({
        odsynCode:yup.string().required("Obligatoire"),
        odsynAdr1:yup.string().required("Obligatoire"),
        odsynMail:yup.string().email("Format incorrect ----@---.--"),
        odsynRmail:yup.string().email("Format incorrect ----@---.--"),
        odsynTelfix:yup.string().matches(regTel,"Format incorrect"),
        odsynFax:yup.string().matches(regTel,"Format incorrect"),
        odsynRtelfix:yup.string().matches(regTel,"Format incorrect"),
        odsynRtelport:yup.string().matches(regTel,"Format incorrect"),
        odsynRfax:yup.string().matches(regTel,"Format incorrect"),
    });

    const getData= async () => {
        try {
            const r1= await api.requestSql(Requetes.syndicById(state.id))
            formikRef.current.setValues(prev => ({...prev,...r1.data[0]}))
        }
        catch (error) {
            alert(error)
        }
    }

    useEffect(() => {
         //Cas où le Syndic est sélectionné
         if (state){
            getData()
        }
        else 
            formikRef.current.resetForm(); //Effacer les données affichées

        return ()=>{}

    }, []);

    const onSubmit= async (values,helpers) => {
        try{
           const result=await api.post("/saveSyndic",values);
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
                    <Link to="/Syndics">Syndics</Link>  {" / "}  
                    { state ? "Modification syndic": "Création syndic"}                                                                                     
                </div>
                <div className="container">
                    <div className="card text-center">
                        <div className="card-header">
                            <h5 className="header">{ state ? "Modifier syndic": "Créer syndic"}</h5>
                        </div>
                        <div className="card-body">
                            <Form >     
                                <div className="row form-group">
                                    <FormControl control="input" className="col-1" label="ID" name="odsynId" readOnly /> 
                                    <FormControl control="input" className="col-1" label="Code*" name="odsynCode" />   
                                    <FormControl control="input" className="col" label="Raison social" name="odsynRaison" />
                                    <FormControl control="input" className="col-1" label="CPostal" name="odsynCpost" />
                                    <FormControl control="input" className="col-2" label="Ville" name="odsynVille" />                                                          
                                </div>
                                <div className="row form-group">                                  
                                    <FormControl control="input" className="col" label="Adresse1*" name="odsynAdr1" />
                                    <FormControl control="input" className="col" label="Adresse2" name="odsynAdr2" />
                                </div>
                                <div className="row form-group">                                                               
                                    <FormControl control="input" className="col-3" label="Tel. fixe" name="odsynTelfix"  placeholder={formatTel}/>
                                    <FormControl control="input" className="col-3" label="Fax" name="odsynFax"  placeholder={formatTel}/>
                                    <FormControl control="input" className="col" label="Email" name="odsynMail" />                                    
                                </div>
                                <div className="row form-group">
                                    <FormControl control="textarea" className="col" label="Commentaire" name="odsynCom" />
                                </div>
                                <h5 className="text-left bold text-primary">Responsable</h5>
                                <div className="row form-group">
                                    <FormControl control="select" className="col-2" label="Civilité" name="odsynRcivil">
                                        <option value=""></option>
                                        {
                                            civilites?.map((item,index)=><option key={index} value={item}>{item}</option>)                                        
                                        }
                                    </FormControl>                                                             
                                    <FormControl control="input" className="col" label="Nom" name="odsynRnom" 
                                            onChange={(e)=> setFieldValue(e.target.name,e.target.value.toUpperCase())}/>
                                    <FormControl control="input" className="col" label="Prénom" name="odsynRpren"/> 
                                </div>
                                <div className="row form-group">                                                               
                                    <FormControl control="input" className="col-3" label="Tel. fixe" name="odsynRtelfix" placeholder={formatTel}/>
                                    <FormControl control="input" className="col-3" label="Tel. portable" name="odsynRtelport" placeholder={formatTel}/>
                                    <FormControl control="input" className="col" label="Email" name="odsynRmail" />                                    
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

export default EditSyndic;
