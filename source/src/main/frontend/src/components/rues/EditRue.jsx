import React, { useEffect, useState, useRef } from 'react';
import { useNavigate, useLocation, Link } from 'react-router-dom';
import { Formik, Form, FieldArray } from 'formik';
import * as yup from 'yup'
import Requetes from '../../commons/Requetes'
import api from '../../commons/api'
import FormControl from '../../formik/FormControl';
import { typesRue } from '../../constantes/constante';
import images from '../../constantes/images';

const EditRue = () => {
    const navigate=useNavigate();
    const {state}= useLocation();
    //get reference to formik component
    const formikRef = useRef();
    const initialValues = {               
        odrueId:"",
        odrueCode:"",
        odrueType:"",
        odrueLiaison:"",
        odrueNom:"",
        odrueVille:"",
        odrueCodeposte:""
    };
    const validationSchema = yup.object({
        odrueCode:yup.number().typeError("Numérique").required("Obligatoire"),
        odrueType:yup.string().required("Obligatoire"),
        odrueNom:yup.string().required("Obligatoire"),
        odrueVille:yup.string().required("Obligatoire"),
        odrueCodeposte:yup.number().typeError("Numérique").nullable(),
    });
    useEffect(() => {
         //Cas où le Rue est sélectionné
         if (state){
            const getData= async () => {
                try {
                    const r1= await api.requestSql(Requetes.rueById(state.id))
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
           const result=await api.post("/saveRue",values);
           formikRef.current.setValues((prev)=>({...prev,...result.data}));
           alert("Enregistrement effectué et actualisé ...")
        }
        catch(error){
           alert(error) 
        }
    };

    //Mettre en majuscule les caractères saisis
    const changeToUpperCase=(e,setFieldValue)=>{
        //console.log("event",e.target.name,e.target.value)
        setFieldValue(e.target.name,e.target.value.toUpperCase())
    }

    return <Formik innerRef={formikRef}
                   initialValues={initialValues}
                   validationSchema={validationSchema}
                   onSubmit={ onSubmit } >
            {
            ({values,isSubmitting,isValid,setFieldValue}) => (
            <div>
                <div className="bold mb-1">
                    <span><img src={images.logoMaintenance} alt="maintenance" /></span>{`Référentiel / `}
                    <Link to="/rues">Rues</Link> {" / "}
                    { state ? <span>Modification rue</span>:<span>Création rue</span>}                                                                                         
                </div>
                <div className="container">
                <div className="card text-center">
                    <div className="card-header">
                        <h5 className="header">
                            { state ? <span>Modifier rue</span>:<span>Créer rue</span>}                         
                        </h5>
                    </div>
                    <div className="card-body">
                        <Form >     
                            <div className="row form-group">
                                <FormControl control="input" className="col-1" label="ID" name="odrueId" readOnly /> 
                                <FormControl control="input" className="col-2" label="Code*" name="odrueCode" /> 
                                <FormControl control="input" className="col-2" label="Code Postal" name="odrueCodeposte"/> 
                                <FormControl control="input" className="col-3" label="Ville*" name="odrueVille" onChange={(e)=>changeToUpperCase(e,setFieldValue)} />                                                            
                            </div>
                            <div className="row form-group">
                                <FormControl control="select" className="col-3" label="Type*" name="odrueType">
                                    <option value=""></option>
                                    {
                                        typesRue?.map((item,index)=><option key={index} value={item}>{item}</option>)                                        
                                    }
                                </FormControl>
                                <FormControl control="input" className="col-2" label="Liaison" name="odrueLiaison" onChange={(e)=>changeToUpperCase(e,setFieldValue)}/>                                                              
                                <FormControl control="input" className="col" label="Nom*" name="odrueNom" onChange={(e)=>changeToUpperCase(e,setFieldValue)}/>                                
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

export default EditRue;
