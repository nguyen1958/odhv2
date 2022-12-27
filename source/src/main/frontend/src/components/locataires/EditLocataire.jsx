import React, { useEffect, useState, useRef } from 'react';
import { useNavigate, useLocation, Link } from 'react-router-dom';
import { Formik, Form } from 'formik';
import * as yup from 'yup'
import Requetes from '../../commons/Requetes'
import api from '../../commons/api'
import FormControl from '../../formik/FormControl';
import { civilites, formatTel, regTel } from '../../constantes/constante';
import images from '../../constantes/images';

const EditLocataire = () => {
    const navigate=useNavigate();
    const {state}= useLocation();
    const [listeActivites,setListeActivites]=useState([])
    //get reference to formik component
    const formikRef = useRef();
    const [nblots,setNblots]=useState(0)
    const initialValues = {               
        odlocId:"",
        odlocBienloue:"",
        odlocCivil:"",
        odlocPren:"",
        odlocNom:"",
        odlocNum:"",
        odlocAdr1:"",
        odlocAdr2:"",
        odlocCpost:"",
        odlocVille:"",
        odlocCom:"",
        odlocTelfix:"",
        odlocTelport:"",
        odlocFax:"",
        odlocMail:"",
    };
    const validationSchema = yup.object({
        odlocNom:yup.string().required("Obligatoire"),
        odlocAdr1:yup.string().required("Obligatoire"),
        odlocMail:yup.string().email("Format incorrect ----@---.--"),
        odlocTelfix:yup.string().matches(regTel,"Format incorrect"),
        odlocTelport:yup.string().matches(regTel,"Format incorrect"),
        odlocFax:yup.string().matches(regTel,"Format incorrect"),
    });

    useEffect(() => {
        const getListe= async () => {
            try {
                const result= await api.requestSql(Requetes.listeActivites)
                setListeActivites(result.data)
            }
            catch (error) {
                alert(error)
            }
        }
        getListe();
        //Cas où le Locataire est sélectionné
        if (state){
            const getData= async () => {
                try {
                    const [r1,r2]= await api.requestManySql(Requetes.locataireById(state.id),
                                                            Requetes.nbLotLocataire(state.id))
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
           const result=await api.post("/saveLocataire",values);
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
        navigate("/lots",{state:{id:state?.id,
                            of:"locataire",
                            sujet:`${values.odlocCivil} ${values.odlocPren} ${values.odlocNom}`}})
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
                    <Link to="/locataires">Locataires</Link>  {" / "}  
                    { state ? "Modification locataire": "Création locataire"}                                                                                     
                </div>
                <div>
                    <div className="card text-center">
                        <div className="card-header">
                            <h5 className="header">{ state ? "Modifier locataire": "Créer locataire"}
                                {" "} 
                                {nblots>0 ? <button type="button" className='btn btn-small btn-success ml-2'onClick={voir}>Voir les lots</button>:null}
                            </h5>
                        </div>
                        <div className="card-body">
                            <Form >     
                                <div className="row form-group">
                                    <FormControl control="input" className="col-1" label="ID" name="odlocId" readOnly /> 
                                    <FormControl control="select" className="col-1" label="Civilité" name="odlocCivil">
                                        <option value=""></option>
                                        {
                                            civilites?.map((item,index)=><option key={index} value={item}>{item}</option>)                                        
                                        }
                                    </FormControl>                                                             
                                    <FormControl control="input" className="col" label="Nom*" name="odlocNom" ci="text-uppercase"/>
                                    <FormControl control="input" className="col" label="Prénom" name="odlocPren"/>
                                    <FormControl control="select" className="col-4" label="Bien loué" name="odlocBienloue">
                                        <option value=""></option>
                                        {
                                            listeActivites?.map((item,index)=><option key={index} value={item.odntId}>{item.odntNom}</option>)                                        
                                        }
                                    </FormControl>                             
                                </div>
                                <div className="row form-group">
                                    <FormControl control="input" className="col-1" label="No rue" name="odlocNum"/>
                                    <FormControl control="input" className="col" label="Adresse1*" name="odlocAdr1" />
                                    <FormControl control="input" className="col" label="Adresse2" name="odlocAdr2" />
                                    <FormControl control="input" className="col-1" label="CPostal" name="odlocCpost" />
                                    <FormControl control="input" className="col-2" label="Ville" name="odlocVille" />                               
                                </div>
                                <div className="row form-group">                             
                                    <FormControl control="input" className="col-2" label="Tel. fixe" name="odlocTelfix" placeholder={formatTel}/>
                                    <FormControl control="input" className="col-2" label="Tel. portable" name="odlocTelport" placeholder={formatTel}/>
                                    <FormControl control="input" className="col-2" label="Fax" name="odlocFax" placeholder={formatTel}/>
                                    <FormControl control="input" className="col" label="Email" name="odlocMail" />                                    
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

export default EditLocataire;

