import React, { useEffect, useRef } from 'react';
import { useLocation, Link } from 'react-router-dom';
import { Formik, Form, FieldArray } from 'formik';
import * as yup from 'yup'
import Requetes from '../../commons/Requetes'
import api from '../../commons/api'
import FormControl from '../../formik/FormControl';
import { civilites, formatTel, regTel } from '../../constantes/constante';
import images from '../../constantes/images';

const EditSuiveur = () => {
    const {state}= useLocation();
    //get reference to formik component
    const formikRef = useRef();
    const initialValues = {               
        odsuId:"",
        odsuCivil:"",
        odsuPren:"",
        odsuNom:"",
        odsuAdr1:"",
        odsuAdr2:"",
        odsuCpost:"",
        odsuVille:"",
        odsuLibelle:"",
        odsuTelfix:"",
        odsuTelport:"",
        odsuMail:"",
    };
    const validationSchema = yup.object({
        odsuPren:yup.string().required("Obligatoire"),
        odsuNom:yup.string().required("Obligatoire"),
        odsuMail:yup.string().email("Format incorrect ----@---.--"),
        odsuTelfix:yup.string().matches(regTel,"Format incorrect"),
        odsuTelport:yup.string().matches(regTel,"Format incorrect"),
        odsuFax:yup.string().matches(regTel,"Format incorrect"),
    });
    useEffect(() => {
         //Cas où le Suiveur est sélectionné
         if (state){
            const getData= async () => {
                try {
                    const r1= await api.requestSql(Requetes.suiveurById(state.id))
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
           const result=await api.post("/saveSuiveur",values);
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
                    <Link to="/Suiveurs">Recherche suiveurs</Link>  {" / "} 
                    { state ?  "Modification suiveur" : "Création suiveur"}                                                                                      
                </div>
                <div className="container">
                    <div className="card text-center">
                        <div className="card-header">
                            <h5 className="header">{ state ?  "Modifier suiveur" : "Créer suiveur"} </h5>
                        </div>
                        <div className="card-body">
                            <Form >     
                                <div className="row form-group">
                                    <FormControl control="input" className="col-1" label="ID" name="odsuId" readOnly /> 
                                    <FormControl control="select" className="col-1" label="Civilité" name="odsuCivil">
                                        <option value=""></option>
                                        {
                                            civilites?.map((item,index)=><option key={index} value={item}>{item}</option>)                                        
                                        }
                                    </FormControl>                                                             
                                    <FormControl control="input" className="col" label="Nom*" name="odsuNom" 
                                            onChange={(e)=> setFieldValue(e.target.name,e.target.value.toUpperCase())}/>
                                    <FormControl control="input" className="col" label="Prénom" name="odsuPren"/>                             
                                </div>
                                <div className="row form-group">
                                    <FormControl control="input" className="col" label="Adresse1*" name="odsuAdr1" />
                                    <FormControl control="input" className="col" label="Adresse2" name="odsuAdr2" />
                                    <FormControl control="input" className="col-1" label="CPostal" name="odsuCpost" />
                                    <FormControl control="input" className="col-2" label="Ville" name="odsuVille" />                               
                                </div>
                                <div className="row form-group">                              
                                    <FormControl control="input" className="col-3" label="Tel. fixe" name="odsuTelfix" placeholder={formatTel}/>
                                    <FormControl control="input" className="col-3" label="Tel. portable" name="odsuTelport" placeholder={formatTel}/>
                                    <FormControl control="input" className="col" label="Email" name="odsuMail" />                                    
                                </div>
                                <div className="row form-group">
                                    <FormControl control="input" className="col" label="Libellé" name="odsuLibelle" />
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

export default EditSuiveur;
