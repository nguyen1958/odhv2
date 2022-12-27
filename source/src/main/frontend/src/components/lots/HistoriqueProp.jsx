import { Form, Formik } from 'formik';
import React, { useEffect, useRef, useState } from 'react';
import * as yup from 'yup'
import Requetes from '../../commons/Requetes'
import api from '../../commons/api'
import FormControl from '../../formik/FormControl';
import { dateToString, stringToDate } from '../../commons/Utils';
import { Link } from 'react-router-dom';

const HistoriqueProp = ({lotId}) => {
    const formikRef=useRef()
    //initialiser les liste des select
    const [listes,setListes]=useState([]);
    //Spread liste into each select list avec ordre à respecter
    const [proprietaires,natures]=listes;
    const [lots,setLots]=useState([])
    const initialValues={
        odplId:"",
        odplLot:lotId,
        odplProprietaire:"",
        odplDatede:"",
        odplDatea:"",
        odplNature:"",
        odplObservations:"",
    }

    const validationSchema = yup.object({
        odplProprietaire:yup.string().required("Obligatoire"),
        odplDatede:yup.string().required("Obligatoire"),
    });

    useEffect(() => {
        const getListe = async () => {
            try {
                const [r1,r2]= await api.requestManySql(Requetes.proprietaires,
                                                        Requetes.listeTypePossessions)
                setListes([r1.data,r2.data])
                console.log("resultat",r1.data,r2.data)
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
            const r1= await api.requestSql(Requetes.propslotById(lotId))
            setLots(r1.data)
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
            await api.post("/savePropslot",values);
            formikRef.current.resetForm()
            getData()
        }
        catch(error){
           alert(error) 
        }
    };

    const modifierClick=(lot)=>{
        formikRef.current.setValues({...lot,
                            odplDatede:stringToDate(lot.odplDatede),
                            odplDatea:stringToDate(lot.odplDatea)})
    }

    const deleteClick=async (id)=>{
        try{
            let result = window.confirm("Voulez-vous certain de faire cette suppression ?");
            if(result){
              await api.post("/removePropslot",{id});
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
                                <th colSpan="7">HISTORIQUE DES PROPRIETAIRES</th>
                            </tr>
                            <tr>
                                <th style={{width:'5%'}}>ID</th>
                                <th>Propriétaire*</th>
                                <th>Du*</th>
                                <th>Au</th>
                                <th>Nature</th>
                                <th>Observation</th>
                                <th style={{width:'5%'}}></th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>                               
                                <td>
                                <FormControl control="input" name="odplId" readOnly/> 
                                </td>
                                <td>
                                    <FormControl control="select" name="odplProprietaire" >
                                        <option value=""></option>
                                        {
                                            proprietaires?.map((item,index)=><option key={index} value={item.odproId}>{item.odproPren} {item.odproNom}</option>)
                                        }                                       
                                    </FormControl> 
                                </td>
                                <td>
                                <FormControl control="date" name="odplDatede" />
                                </td>
                                <td><FormControl control="date" name="odplDatea" /></td>
                                <td>
                                    <FormControl control="select" name="odplNature" >
                                        <option value=""></option>
                                        {
                                            natures?.map((item,index)=><option key={index} value={item.odntId}>{item.odntNom} {item.odproNom}</option>)
                                        }                                       
                                    </FormControl> 
                                </td>
                                <td><FormControl control="textarea" rows="1" name="odplObservations" /></td>
                                <td><button className="btn btn-success btn-sm"
                                            disabled={isSubmitting || !isValid}>
                                            {values.odplId?"Modifier":"Créer"}</button>
                                </td>
                            </tr>
                            {
                                lots?.map((lot,index)=>(
                                    <tr key={index}>
                                        <td onClick={()=>deleteClick(lot.odplId)}>
                                            <i className="fa fa-trash cursor text-danger"></i>{"  "}{lot.odplId}
                                        </td>
                                        <td><Link to="/proprietaires/edit" state={{id:lot.odplProprietaire}}>{lot.proprietaire}</Link></td>
                                        <td>{dateToString(lot.odplDatede)}</td>
                                        <td>{dateToString(lot.odplDatea)}</td>
                                        <td>{lot.nature}</td>
                                        <td>{lot.odplObservations}</td>
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

export default HistoriqueProp;
