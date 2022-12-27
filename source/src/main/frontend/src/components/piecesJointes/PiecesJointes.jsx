import React, { useState,useRef, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Form, Formik } from 'formik';
import api from '../../commons/api'
import images from '../../constantes/images';
import Select from '../../formik/Select'

const PiecesJointes = () => {
    const {state:{immId,cadastre,procId}}=useLocation()
    const [documents,setDocuments]=useState([])
    const [photos,setPhotos]=useState([])
    const formikRef=useRef();
    const documentsRef=useRef();
    const photosRef=useRef()
    const initialValues={
        immId:immId,
        procId:procId,
        document:"",
        photo:"",
    }

    useEffect(()=>{
        const getData=async ()=>{
            try{
                //documents et photos
                const r5=await api.post("/getListFiles",{type:"document",immId,procId})
                const r6=await api.post("/getListFiles",{type:"photos",immId,procId})
                setDocuments(r5.data)
                setPhotos(r6.data)
                console.log("result getliste",r5,r6)
            }
            catch(error){
                alert(error)
            }
        }
        getData()
    },[immId,procId])
    
    const ajouter= async (type)=>{
        console.log(formikRef?.current?.values)
        if(type=="document" && formikRef.current.values.document=="") return
        if(type=="photo" && formikRef.current.values.photo=="") return
        let formdata=new FormData();
        formdata.append("immId",formikRef.current.values.immId)
        formdata.append("procId",formikRef.current.values.procId)
        if(type=="document"){
            formdata.append("type","document")
            formdata.append("file",formikRef.current.values.document)
        }
        if(type=="photo"){
            formdata.append("type","photo")
            formdata.append("file",formikRef.current.values.photo)
        } 
        const result=await api.post("/uploadFile",formdata,{headers: {"Content-Type": "multipart/form-data"}})
        console.log("resultat",result.data)
        if(type=="document"){
            //Pour éviter afficher plusieurs fois le même fichier (cas ajouter le même fichier)
            const exist=Array.from(documentsRef.current.options).map(o=>o.text).includes(result.data.name)
            if(exist) return;
            const option= new Option(result.data.name,result.data.url)
            //console.log("selection",selection)
            documentsRef.current.options.add(option)
        }
        if(type=="photo"){
             //Pour éviter afficher plusieurs fois le même fichier (cas ajouter le même fichier)
             const exist=Array.from(photosRef.current.options).map(o=>o.text).includes(result.data.name)
             if(exist) return;
            const option= new Option(result.data.name,result.data.url)
            //console.log("selection",selection)
            photosRef.current.options.add(option)
        }
        console.log(result.data)
    }

    const visualiser= (type)=>{
        const select=formikRef.current.values;
        console.log("documentsRef",documentsRef.current)
        console.log("photosRef",photosRef.current)
        if(type=="document" && documentsRef.current.selectedIndex<0) return
        if(type=="photo" && photosRef.current.selectedIndex<0) return
        if(type=="document") window.open(documentsRef.current.value)
        if(type=="photo") window.open(photosRef.current.value)
    }

    const retirer= async (type)=>{
        const select=formikRef.current.values;
        console.log("documentsRef",documentsRef.current)
        console.log("photosRef",photosRef.current)
        if(type=="document" && documentsRef.current.selectedIndex<0) return
        if(type=="photo" && photosRef.current.selectedIndex<0) return
        await api.post("/removeFile",{file:type=="document"?documentsRef.current.value:photosRef.current.value});
        if(type=="document") documentsRef.current.options[documentsRef.current.selectedIndex].remove();
        if(type=="photo") photosRef.current.options[photosRef.current.selectedIndex].remove();
    }


    return (
        <div>
            <div className="bold mb-3">
                <span><img src={images.logoImmeuble}alt="logoImmeuble"/></span>{` Immeuble `}
                <Link to="/immeubles/edit" state={{id:immId}}>{cadastre}</Link> {"/ "}  
                {
                  procId ?<><Link to="/procedures/edit" state={{immId:immId,id:procId}}>{`Procédure ${procId} `}</Link> {"/ "}</>:null
                }                              
                <span>Pièce(s) jointe(s)</span>         
            </div>
            <Formik innerRef={formikRef}
                   initialValues={initialValues}>
                <Form> 
                <div className="row justify-content-center">
                    <div className="col-5">
                        <h5>Documents</h5>
                        <div className="row">                           
                            <div className="col">
                                <Select innerRef={documentsRef} style={{width:'100%',height:200}} name="documents" multiple>
                                {
                                    documents.map((item)=><option key={item.name} value={item.url}>{item.name}</option>)                           
                                }
                                </Select>
                                <input name="document" type="file" multiple onChange={(e)=>formikRef.current.setFieldValue("document",e.target.files[0])}/>
                            </div>
                            <div className="col-3">
                                <div className="link bold my-3" onClick={()=>ajouter("document")}>Ajouter</div>
                                <div className="link bold my-3" onClick={()=>retirer("document")}>Retirer</div>
                                <div className="link bold my-3" onClick={()=>visualiser("document")}>Visualiser</div>
                            </div>
                        </div>
                    </div>
                    <div className="col-5">
                        <h5>Photos</h5>
                        <div className="row">                           
                            <div className="col">
                                <Select innerRef={photosRef} style={{width:'100%',height:200}} name="photos" multiple >
                                {
                                    photos.map((item)=><option key={item.name} value={item.url}>{item.name}</option>)
                                }
                                </Select>
                                <input name="photo" type="file" multiple onChange={(e)=>formikRef.current.setFieldValue("photo",e.target.files[0])}/>
                            </div>
                            <div className="col-3">
                                <div className="link bold my-3" onClick={()=>ajouter("photo")}>Ajouter</div>
                                <div className="link bold my-3" onClick={()=>retirer("photo")}>Retirer</div>
                                <div className="link bold my-3" onClick={()=>visualiser("photo")}>Visualiser</div>
                            </div>
                        </div>
                    </div>
                </div>
                </Form>
            </Formik>  
        </div> 
    );
}

export default PiecesJointes;
