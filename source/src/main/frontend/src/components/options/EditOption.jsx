import React, { useEffect, useState, useRef } from 'react';
import { useNavigate, useLocation, Link } from 'react-router-dom';
import { Formik, Form, FieldArray } from 'formik';
import * as yup from 'yup'
import Requetes from '../../commons/Requetes'
import api from '../../commons/api'
import FormControl from '../../formik/FormControl';
import images from '../../constantes/images';
import { natures } from '../../constantes/constante';

const EditOption = () => {
    const navigate=useNavigate();
    const {state}= useLocation();
    //get reference to formik component
    const formikRef = useRef();
    const [typeOptions,setTypeOptions]=useState([])
    const initialValues = {               
        odntId:"",
        odntType:"A",
        odntNom:"",
        odntNiveau:"",            
    };
    const validationSchema = yup.object({
        odntNom:yup.string().required("Obligatoire"),
        odntType:yup.string().required("Obligatoire"),
    });

    const getData= async () => {
        try {
            //Cas où l'Option est sélectionné
            if (state){
                const r2= await api.requestSql(Requetes.optionById(state.id))
                formikRef.current.setValues(prev => ({...prev,...r2.data[0]}))
            }
            else 
                formikRef.current.resetForm(); //Effacer les données affichées
        }
        catch (error) {
            alert(error)
        }
    }

    useEffect(() => {
        
        getData()

        return ()=>{}

    }, []);

    const onSubmit= async (values,helpers) => {
        try{
            console.log(values)
            const result=await api.post("/saveOption",values);
            if(state) formikRef.current.setValues((prev)=>({...prev,...result.data}));
            else formikRef.current.resetForm();
            alert("Enregistrement effectué et actualisé ...")
            console.log("result",result.data)
        }
        catch(error){
           alert(error) 
        }
    };

    console.log("state",state)
    console.log("formikRef",formikRef?.current?.values)

    return <Formik innerRef={formikRef}
                   initialValues={initialValues}
                   validationSchema={validationSchema}
                   onSubmit={ onSubmit } >
            {
            ({isSubmitting,isValid}) => (
            <div>
                <div className="bold mb-1">
                    <span><img src={images.logoMaintenance} alt="maintenance" /></span>{`Référentiel / `}
                    <Link to="/options">Options</Link>  {" / "}    
                    { state ? "Modification Option": "Création Option"}                                                                                   
                </div>
                <div className="container">
                    <div className="card text-center">
                        <div className="card-header">
                            <h5 className="header">{ state ? "Modifier Option": "Créer Option"}</h5>
                        </div>
                        <div className="card-body">
                            <Form >     
                                <div className="row form-group">
                                    <FormControl control="input" className="col-1" label="ID" name="odntId" readOnly />
                                    <FormControl control="select" className="col-3" label="Type*" name="odntType" disabled={state?true:false}>
                                        {
                                             natures?.map((item,index)=><option key={index} value={item.value}>{item.key}</option>)                                       
                                        }
                                    </FormControl>    
                                    <FormControl control="input" className="col" label="Nom*" name="odntNom" />                                                          
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

export default EditOption;
