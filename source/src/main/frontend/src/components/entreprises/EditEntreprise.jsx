import React, { useEffect, useState, useRef } from 'react';
import { useNavigate, useLocation, Link } from 'react-router-dom';
import { Formik, Form, FieldArray } from 'formik';
import * as yup from 'yup'
import Requetes from '../../commons/Requetes'
import api from '../../commons/api'
import FormControl from '../../formik/FormControl';
import { regTel,formatTel } from '../../constantes/constante';
import images from '../../constantes/images';

const EditEntreprise = () => {
    const navigate=useNavigate();
    const {state}= useLocation();
    //get reference to formik component
    const formikRef = useRef();
    const [typeEntreprises,setTypeEntreprises]=useState([])
    const initialValues = {               
        odenId:"",
        odenCode:"",
        odenNom:"",
        odenType:"",            
        odenAddr1:"",
        odenAddr2:"",
        odenCodeposte:"",
        odenVille:"",
        odenTel:"",
        odenFax:"",
        odenMail:"",
        odenComment:"",
    };
    const validationSchema = yup.object({
        odenCode:yup.string().required("Obligatoire"),
        odenNom:yup.string().required("Obligatoire"),
        odenType:yup.string().required("Obligatoire"),
        odenMail:yup.string().email("Format incorrect ----@---.--"),
        odenTel:yup.string().matches(regTel,"Format incorrect").nullable(),
        odenFax:yup.string().matches(regTel,"Format incorrect").nullable(),
    });
    useEffect(() => {
        const getData= async () => {
            try {
                const r1= await api.requestSql(Requetes.listeTypeEntreprises)
                setTypeEntreprises(r1.data)
                //Cas où l'entreprise est sélectionné
                if (state){
                    const r2= await api.requestSql(Requetes.entrepriseById(state.id))
                    formikRef.current.setValues(prev => ({...prev,...r2.data[0]}))
                }
                else 
                    formikRef.current.resetForm(); //Effacer les données affichées
            }
            catch (error) {
                alert(error)
            }
        }
        getData()

        return ()=>{}

    }, []);

    const onSubmit= async (values,helpers) => {
        try{
           const result=await api.post("/saveEntreprise",values);
           if(state) formikRef.current.setValues((prev)=>({...prev,...result.data}));
           else formikRef.current.resetForm();
           alert("Enregistrement effectué et actualisé ...")
           console.log("result",result.data)
        }
        catch(error){
           alert(error) 
        }
    };

    console.log("formik",formikRef?.current)

    return <Formik innerRef={formikRef}
                   initialValues={initialValues}
                   validationSchema={validationSchema}
                   onSubmit={ onSubmit } >
            {
            ({values,isSubmitting,isValid,setFieldValue}) => (
            <div>
                <div className="bold mb-1">
                    <span><img src={images.logoMaintenance} alt="maintenance" /></span>{`Référentiel / `}
                    <Link to="/Entreprises">Entreprises</Link> {" / "} 
                    { state ? "Modification Entreprise": "Création Entreprise"}                                                                                       
                </div>
                <div className="container">
                    <div className="card text-center">
                        <div className="card-header">
                            <h5 className="header">{ state ? "Modifier Entreprise": "Créer Entreprise"}</h5>
                        </div>
                        <div className="card-body">
                            <Form >     
                                <div className="row form-group">
                                    <FormControl control="input" className="col-1" label="ID" name="odenId" readOnly /> 
                                    <FormControl control="input" className="col-1" label="Code*" name="odenCode" />   
                                    <FormControl control="input" className="col" label="Nom*" name="odenNom" />
                                    <FormControl control="select" className="col" label="Type*" name="odenType">
                                    <option value=""></option>
                                    {
                                        typeEntreprises?.map((item,index)=><option key={index} value={item.odntId}>{item.odntNom}</option>)                                        
                                    }
                                </FormControl>  
                                    <FormControl control="input" className="col-1" label="Cpostal" name="odenCodeposte" />
                                    <FormControl control="input" className="col-2" label="Ville" name="odenVille" />                                                          
                                </div>
                                <div className="row form-group">                                  
                                    <FormControl control="input" className="col" label="Adresse1" name="odenAddr1" />
                                    <FormControl control="input" className="col" label="Adresse2" name="odenAddr2" />
                                </div>
                                <div className="row form-group">                                                               
                                    <FormControl control="input" className="col-3" label="Tel. fixe" name="odenTel" placeholder={formatTel}/>
                                    <FormControl control="input" className="col-3" label="Fax" name="odenFax"placeholder={formatTel}/>
                                    <FormControl control="input" className="col" label="Email" name="odenMail" />                                    
                                </div>
                                <div className="row form-group">
                                    <FormControl control="textarea" className="col" label="Commentaire" name="odenComment" />
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

export default EditEntreprise;
