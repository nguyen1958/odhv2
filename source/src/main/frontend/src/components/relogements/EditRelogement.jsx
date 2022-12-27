import React, { useEffect, useState, useRef } from 'react';
import { useNavigate, useLocation, Link } from 'react-router-dom';
import { Formik, Form, FieldArray } from 'formik';
import * as yup from 'yup'
import Requetes from '../../commons/Requetes'
import api from '../../commons/api'
import FormControl from '../../formik/FormControl';
import { civilites, formatTel, regTel } from '../../constantes/constante';
import images from '../../constantes/images';

const EditRelogement = () => {
    const navigate=useNavigate();
    const {state}= useLocation();
    //get reference to formik component
    const formikRef = useRef();
    const [types,setTypes]=useState([])
    const initialValues = {               
        odreId:"",
        odreNom:"",
        odreType:"",            
        odreAdr1:"",
        odreAdr2:"",
        odreCpost:"",
        odreVille:"",
        odreTel:"",
        odreFax:"",
        odreMail:"",
        odrePrix:"",
        odreCom:"",

        odreGerciv:"",
        odreGernom:"",
        odreGerprenom:"",
    };
    const validationSchema = yup.object({
        odreType:yup.string().required("Obligatoire"),
        odreNom:yup.string().required("Obligatoire"),
        odreAdr1:yup.string().required("Obligatoire"),
        odreMail:yup.string().email("Format incorrect ----@---.--"),
        odreTel:yup.string().matches(regTel,"Format incorrect"),
        odreFax:yup.string().matches(regTel,"Format incorrect"),
       
    });

    const getData= async () => {
        try {
            const r1= await api.requestSql(Requetes.relogementById(state.id))
            formikRef.current.setValues(prev => ({...prev,...r1.data[0]}))
        }
        catch (error) {
            alert(error)
        }
    }
    const getTypes= async () => {
        try {
            const r1= await api.requestSql(Requetes.listeTypeRelogements)
            setTypes(r1.data)
        }
        catch (error) {
            alert(error)
        }
    }

    useEffect(() => {
        getTypes()
         //Cas où le Relogement est sélectionné
         if (state){           
            getData()
        }
        else 
            formikRef.current.resetForm(); //Effacer les données affichées

        return ()=>{}

    }, []);

    const onSubmit= async (values,helpers) => {
        try{
           const result=await api.post("/saveRelogement",values);
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
                    <Link to="/Relogements">Relogements</Link> {" / "}  
                    { state ? "Modification Relogement": "Création Relogement"}                                                                                      
                </div>
                <div className="container">
                    <div className="card text-center">
                        <div className="card-header">
                            <h5 className="header">{ state ? "Modifier Relogement": "Créer Relogement"}</h5>
                        </div>
                        <div className="card-body">
                            <Form >     
                                <div className="row form-group">
                                    <FormControl control="input" className="col-1" label="ID" name="odreId" readOnly />
                                    <FormControl control="input" className="col" label="Nom*" name="odreNom" />
                                    <FormControl control="select" className="col-4" label="Type*" name="odreType"> 
                                        <option value=""></option>
                                        {
                                            types?.map((item,index)=><option key={index} value={item.odntId}>{item.odntNom}</option>)                                        
                                        }
                                    </FormControl>  
                                    <FormControl control="input" className="col-2" label="Prix" name="odrePrix" />                                                                                                                 
                                </div>
                                <div className="row form-group">                                  
                                    <FormControl control="input" className="col" label="Adresse1*" name="odreAdr1" />
                                    <FormControl control="input" className="col" label="Adresse2" name="odreAdr2" />
                                    <FormControl control="input" className="col-1" label="CPostal" name="odreCpost" />
                                    <FormControl control="input" className="col-2" label="Ville" name="odreVille" />  
                                </div>
                                <div className="row form-group">                                                               
                                    <FormControl control="input" className="col-3" label="Tel. fixe" name="odreTel"  placeholder={formatTel}/>
                                    <FormControl control="input" className="col-3" label="Fax" name="odreFax"  placeholder={formatTel}/>
                                    <FormControl control="input" className="col" label="Email" name="odreMail" />                                    
                                </div>
                                <h5 className="text-left bold text-primary">Gérant</h5>
                                <div className="row form-group">
                                    <FormControl control="select" className="col-2" label="Civilité" name="odreGerciv">
                                        <option value=""></option>
                                        {
                                            civilites?.map((item,index)=><option key={index} value={item}>{item}</option>)                                        
                                        }
                                    </FormControl>                                                             
                                    <FormControl control="input" className="col" label="Nom" name="odreGernom" 
                                            onChange={(e)=> setFieldValue(e.target.name,e.target.value.toUpperCase())}/>
                                    <FormControl control="input" className="col" label="Prénom" name="odreGerprenom"/> 
                                </div>
                                <div className="row form-group">
                                    <FormControl control="textarea" className="col" label="Commentaire" name="odreCom" />
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

export default EditRelogement;
