import React, { useEffect, useState, useRef } from 'react';
import { useNavigate, useLocation, Link } from 'react-router-dom';
import { Formik, Form, FieldArray } from 'formik';
import * as yup from 'yup'
import Requetes from '../../commons/Requetes'
import api from '../../commons/api'
import FormControl from '../../formik/FormControl';
import { civilites, formatTel, regTel } from '../../constantes/constante';
import images from '../../constantes/images';

const EditProprietaire = () => {
    const navigate=useNavigate();
    const {state}= useLocation();
    //get reference to formik component
    const formikRef = useRef();
    const [nblots,setNblots]=useState(0)
    const initialValues = {               
        odproId:"",
        odproRaison:"",
        odproCivil:"",
        odproPren:"",
        odproNom:"",
        odproNum:"",
        odproAdr1:"",
        odproAdr2:"",
        odproCpost:"",
        odproVille:"",
        odproFisc:"",
        odproCom:"",
        odproTelfix:"",
        odproTelport:"",
        odproFax:"",
        odproMail:"",
    };
    
    const validationSchema = yup.object({
        odproNom:yup.string().required("Obligatoire"),
        odproAdr1:yup.string().required("Obligatoire"),
        odproMail:yup.string().email("Format incorrect ----@---.--"),
        odproTelfix:yup.string().matches(regTel,"Format incorrect"),
        odproTelport:yup.string().matches(regTel,"Format incorrect"),
        odproFax:yup.string().matches(regTel,"Format incorrect"),
    });
    useEffect(() => {
         //Cas où le proprietaire est sélectionné
         if (state){
            const getData= async () => {
                try {
                    const [r1,r2]= await api.requestManySql(Requetes.proprietiareById(state.id),
                                                            Requetes.nbLotProprietaire(state.id))
                    formikRef.current.setValues(prev => ({...prev,...r1.data[0]}))
                    setNblots(r2.data[0])
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
           const result=await api.post("/saveProprietaire",values);
           if(state) formikRef.current.setValues((prev)=>({...prev,...result.data}));
           else formikRef.current.resetForm();
           alert("Enregistrement effectué et actualisé ...")
        }
        catch(error){
           alert(error) 
        }
    };

    const voir=()=>{
        const {values}=formikRef.current;
        console.log("values",values)
        navigate("/lots",{state:{id:state.id,
                            of:"proprietaire",
                            sujet:`${values.odproCivil} ${values.odproPren} ${values.odproNom}`}})
    }

    return <Formik innerRef={formikRef}
                   initialValues={initialValues}
                   validationSchema={validationSchema}
                   onSubmit={ onSubmit } >
            {
            ({values,isSubmitting,isValid}) => (
            <div>
                <div className="bold mb-1">
                    <span><img src={images.logoImmeuble} alt="immeuble" /></span>{`Immeuble / `}
                    <Link to="/proprietaires">Propriétaires</Link> {" / "}  
                    { state ? "Modification propriétaire": "Création propriétaire"}                                                                                      
                </div>
                <div>
                    <div className="card text-center">
                        <div className="card-header">
                            <h5 className="header">{ state ? "Modifier propriétaire": "Créer propriétaire"}
                                {" "} 
                                {nblots>0 ? <button type="button" className='btn btn-small btn-success ml-2' onClick={voir}>Voir les lots</button>:null}
                            </h5>
                        </div>
                        <div className="card-body">
                            <Form >     
                                <div className="row form-group">
                                    <FormControl control="input" className="col-1" label="ID" name="odproId" readOnly /> 
                                    <FormControl control="input" className="col-4" label="Raison social" name="odproRaison" />
                                    <FormControl control="select" className="col-1" label="Civilité" name="odproCivil">
                                        <option value=""></option>
                                        {
                                            civilites?.map((item,index)=><option key={index} value={item}>{item}</option>)                                        
                                        }
                                    </FormControl>                                                             
                                    <FormControl control="input" className="col" label="Nom*" name="odproNom" ci="text-uppercase"/>
                                    <FormControl control="input" className="col" label="Prénom" name="odproPren"/>                               
                                </div>
                                <div className="row form-group">
                                    <FormControl control="input" className="col-1" label="No rue" name="odproNum"/>
                                    <FormControl control="input" className="col" label="Adresse1*" name="odproAdr1" />
                                    <FormControl control="input" className="col" label="Adresse2" name="odproAdr2" />
                                    <FormControl control="input" className="col-1" label="CPostal" name="odproCpost" />
                                    <FormControl control="input" className="col-2" label="Ville" name="odproVille" />                               
                                </div>
                                <div className="row form-group">
                                    <FormControl control="input" className="col-2" label="Fiscalité" name="odproFisc" />                               
                                    <FormControl control="input" className="col-2" label="Tel. fixe" name="odproTelfix" placeholder={formatTel}/>
                                    <FormControl control="input" className="col-2" label="Tel. portable" name="odproTelport" placeholder={formatTel}/>
                                    <FormControl control="input" className="col-2" label="Fax" name="odproFax" placeholder={formatTel}/>
                                    <FormControl control="input" className="col" label="Email" name="odproMail" />                                    
                                </div>
                                <div className="row form-group">
                                    <FormControl control="textarea" className="col" label="Commentaire" name="odproCom" />
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

export default EditProprietaire;
