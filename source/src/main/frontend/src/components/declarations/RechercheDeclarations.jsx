import React, { useEffect, useState, useRef } from 'react';
import { useLocation } from 'react-router-dom';
import { Formik, Form, FieldArray } from 'formik';
import * as yup from 'yup'
import api from '../../commons/api';
import FormControl from '../../formik/FormControl';
import { stringToDate } from '../../commons/Utils';
import Requetes from '../../commons/Requetes';

const RechercheDeclarations = () => {
    const {state}=useLocation()
    const {id,cadastre}=state;
    const [listes,setListes]=useState([]);
    //Spread liste into each select list avec ordre à respecter
    const [declarants,experts,typeTraits]=listes;
    const formikRef=useRef()
    const arrayHelpersRef=useRef(null);
    //Objet declaration
    const uneDeclaration= {
        oddeDeclid:"",
        oddeEtatpar:id,
        oddeDatedec:"",
        oddeDatevis:"",
        oddeDatetrait:"",
        oddeTypedecl:"",
        oddeExpert:"",
        oddeTypetrait:"",
        oddeBois:false,
        oddeSter:false,
        oddeBati:false,
        oddeNbati:false
    }

    const initialValues={
        declarations:[]
    }

    const validationSchema = yup.object({
        declarations:yup.array().of(
            yup.object({
            oddeDatedec:yup.date().nullable().required("Obligatoire"),
            oddeTypedecl:yup.string().required("Obligatoire"),
            oddeDatevis:yup.date().nullable().required("Obligatoire"),
        })),
    });

    useEffect(() => {
        //Initialiser les liste de select pour rues et syndics
        const getListe = async () => {
        try {
            const [r1,r2,r3]= await api.requestManySql(
                                                    Requetes.listeDeclarants,
                                                    Requetes.experts,
                                                    Requetes.listeTypeTraitements)
            setListes([r1.data,r2.data,r3.data])
        }
        catch (error) {
            alert(error)
        }
        };
        getListe();
        const getData = async () => {
            try {
                const result= await api.requestSql(Requetes.declarationsOfEtatpar(id))
                //Convertir les dates string en objet date pour DatePicker
                const declarations=result.data.map(item => ({...item,
                                        oddeDatedec:stringToDate(item.oddeDatedec),
                                        oddeDatevis:stringToDate(item.oddeDatevis),
                                        oddeDatetrait:stringToDate(item.oddeDatetrait)
                                    }))
                formikRef.current.setValues(prev => ({...prev,declarations:declarations}))
                console.log("ds rechercheDeclarations",id,result.data)
            }
            catch (error) {
                alert(error)
            }
        }
        getData()
        console.log("uneDeclaration",uneDeclaration)
        return () => {};
    }, []);

    const onSubmit= async (values,helpers) => {
        try{
           console.log("values",values);
           await api.post("/saveDeclarations",values.declarations);
           alert("Enregistrement effectué et actualisé ...")
           //navigate vers detail immeuble 
           //navigate("/immeubles/detail",{state:{id:result.data.odimId}})
        }
        catch(error){
           alert(error) 
        }
        helpers.setSubmitting=false
    };

    console.log("values",formikRef?.current?.values)

    return (
        
            <Formik innerRef={formikRef}
                    initialValues={initialValues}
                    validationSchema={validationSchema}                   
                    onSubmit={ onSubmit } >
            {
                ({values,isSubmitting,isValid}) =>
                <div>
                    <div className="row alert alert-secondary align-items-center" role="alert">
                        <div className="col text-uppercase">
                            <h5 className=" font-weight-bold">Immeuble <span className="text-danger">{cadastre}</span> - Déclarations termites </h5>                           
                        </div>
                        <div className="col-3 text-right">
                            {
                            values.declarations.length<4 && 
                            <button type="button" className="btn btn-success btn-sm font-weight-bold ml-auto"
                                onClick={()=>arrayHelpersRef.current.push(uneDeclaration)}>
                                Ajouter une déclaration
                            </button>
                            }
                        </div>                  
                    </div>
                    <Form>
                        <FieldArray name="declarations">
                        { 
                            (ArrayHelpers)=> {
                                arrayHelpersRef.current=ArrayHelpers;                               
                                return values.declarations.map((x,index)=>(
                                    <div className="card pr-2 mt-2" key={index}>
                                        <div className="row form-group text-center" >
                                            { console.log(index,x)}
                                            <FormControl control="date" className="col-2" label="Date déclaration*" name={`declarations.${index}.oddeDatedec`} />
                                            <FormControl control="select" className="col" label="Déclarant*" name={`declarations.${index}.oddeTypedecl`}>
                                                <option value=""></option>
                                                {
                                                    declarants?.map((item,index)=><option key={index} value={item.odntId}>{item.odntNom}</option>)                                        
                                                }
                                            </FormControl>
                                            <FormControl control="select" className="col" label="Expert" name={`declarations.${index}.oddeExpert`} >
                                                <option value=""></option>
                                                {
                                                    experts?.map((item,index)=><option key={index} value={item.odexpId}>{item.odexpPren} {item.odexpNom}</option>)                                        
                                                }
                                            </FormControl> 
                                            <FormControl control="date" className="col-2" label="Date visite*" name={`declarations.${index}.oddeDatevis`} />
                                        </div>
                                        <div className="row form-group text-center" >                                            
                                            <FormControl control="checkbox" className="col" label="Bois ext." name={`declarations.${index}.oddeBois`} />
                                            <FormControl control="checkbox" className="col" label="Sous terrain" name={`declarations.${index}.oddeSter`} />
                                            <FormControl control="checkbox" className="col" label="Non bâti" name={`declarations.${index}.oddeNbati`} />
                                            <FormControl control="checkbox" className="col" label="Bâti" name={`declarations.${index}.oddeBati`} />                                            
                                            <FormControl control="date" className="col-2" label="Date traitement" name={`declarations.${index}.oddeDatetrait`} />
                                            <FormControl control="select" className="col-3" label="Type traitement" name={`declarations.${index}.oddeTypetrait`} >
                                                <option value=""></option>
                                                {
                                                    typeTraits?.map((item,index)=><option key={index} value={item.odntId}>{item.odntNom}</option>)                                        
                                                }
                                            </FormControl>
                                            </div>
                                    </div>))
                            }                                              
                        }
                        </FieldArray>
                        {values.declarations.length === 0 && <h5 className="text-center">Aucune déclaration trouvée</h5>}
                        {values.declarations.length > 0 &&              
                            <div className="row form-group justify-content-center mt-2">
                                <div className="col-4">
                                    <button type="submit" className="btn btn-primary btn-block"
                                     disabled={isSubmitting || !isValid}>Enregistrer</button>
                                </div>
                            </div>
                        }
                    </Form>
                </div>           
            }
            </Formik>
    );
}

export default RechercheDeclarations;
