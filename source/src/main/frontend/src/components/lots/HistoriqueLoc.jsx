import { Form, Formik } from 'formik';
import React, { useEffect, useRef, useState } from 'react';
import * as yup from 'yup'
import Requetes from '../../commons/Requetes'
import api from '../../commons/api'
import FormControl from '../../formik/FormControl';
import { dateToString, stringToDate } from '../../commons/Utils';
import { Link } from 'react-router-dom';

const HistoriqueLoc = ({lotId}) => {
    const formikRef=useRef()
    //initialiser les liste des select
    const [locataires,setLocataires]=useState([]);
    const [lots,setLots]=useState([])
    const initialValues={
        odllId:"",
        odllLot:lotId,
        odllLocataire:"",
        odllDatede:"",
        odllDatea:"",
        odllObservations:"",
    }

    const validationSchema = yup.object({
        odllLocataire:yup.string().required("Obligatoire"),
        odllDatede:yup.string().required("Obligatoire"),
    });

    useEffect(() => {
        const getListe = async () => {
            try {
                const r1= await api.requestSql(Requetes.locataires)
                setLocataires(r1.data)
                console.log("resultat",r1.data)
            }
            catch (error) {
                alert(error)
            }
            
        }
        getListe();       
        console.log("lotId",lotId)
        return ()=>{}

    }, [lotId]);

    const getData = async () => {
        try {
            const r1= await api.requestSql(Requetes.locslotById(lotId))
            setLots(r1.data)
            console.log("data",r1.data)
        }
        catch (error) {
            alert(error)
        }            
    }

    useEffect(()=>{      
        getData();       
        return ()=>{}
    },[])

    const onSubmit= async (values) => {
        try{  
            console.log("values updated",values)
            await api.post("/saveLocslot",values);
            formikRef.current.resetForm()
            getData()
        }
        catch(error){
           alert(error) 
        }
    };

    const modifierClick=(lot)=>{
        formikRef.current.setValues({...lot,
                            odllDatede:stringToDate(lot.odllDatede),
                            odllDatea:stringToDate(lot.odllDatea)})
    }

    const deleteClick=async (id)=>{
        console.log("delete id ",id)
        try{
            let result = window.confirm("Voulez-vous certain de faire cette suppression ?");
            if(result){
              await api.post("/removeLocslot",{id});
              getData()
            }
          }
          catch(error){
            alert(error)
          }
    }

    return (
        <Formik innerRef={formikRef}
                   initialValues={initialValues}
                   validationSchema={validationSchema}
                   onSubmit={ onSubmit } >
            {
            ({values,isSubmitting,isValid}) => (
                <Form>
                <div className="mt-2 mx-2 row justify-content-center">
                    <table className="table table-sm table-bordered">
                        <thead className="bold text-center">
                            <tr>
                                <th colSpan="6">HISTORIQUE DES LOCATAIRES</th>
                            </tr>
                            <tr>
                                <th style={{width:'5%'}}>ID</th>
                                <th>Locataire*</th>
                                <th>Du*</th>
                                <th>Au</th>
                                <th>Observation</th>
                                <th style={{width:'5%'}}></th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>                               
                                <td>
                                <FormControl control="input" name="odllId" readOnly/> 
                                </td>
                                <td>
                                    <FormControl control="select" name="odllLocataire" >
                                        <option value=""></option>
                                        {
                                            locataires?.map((item,index)=><option key={index} value={item.odlocId}>{item.odlocPren} {item.odlocNom}</option>)
                                        }                                       
                                    </FormControl> 
                                </td>
                                <td>
                                <FormControl control="date" name="odllDatede" />
                                </td>
                                <td><FormControl control="date" name="odllDatea" /></td>
                                <td><FormControl control="textarea" rows="1" name="odllObservations" /></td>
                                <td><button className="btn btn-success btn-sm"
                                            disabled={isSubmitting || !isValid}>
                                            {values.odllId?"Modifier":"Créer"}</button>
                                </td>
                            </tr>
                            {
                                lots?.map((lot,index)=>(
                                    <tr key={index}>
                                        <td onClick={()=>deleteClick(lot.odllId)}>
                                            <i className="fa fa-trash cursor text-danger"></i>{"  "}{lot.odllId}
                                        </td>
                                        <td><Link to="/locataires/edit" state={{id:lot.odllLocataire}}>{lot.locataire}</Link></td>
                                        <td>{dateToString(lot.odllDatede)}</td>
                                        <td>{dateToString(lot.odllDatea)}</td>
                                        <td>{lot.odllObservations}</td>
                                        <td><button type="button" className="btn btn-primary btn-sm"
                                            onClick={()=>modifierClick(lot)}>Modifier</button>
                                        </td>
                                    </tr>
                                ))
                            }                                         
                        </tbody>
                    </table>
                </div>
                </Form>)}
        </Formik>
    );
}

export default HistoriqueLoc;
