import React, { useEffect, useState, useRef } from 'react';
import { useNavigate, useLocation, Link } from 'react-router-dom';
import { Formik, Form } from 'formik';
import * as yup from 'yup'
import Requetes from '../../commons/Requetes'
import api from '../../commons/api'
import FormControl from '../../formik/FormControl';
import { stringToDate } from '../../commons/Utils';
import images from '../../constantes/images';

const EditImmeuble = () => {
    const navigate=useNavigate();
    const {state}= useLocation();
    //initialiser les liste des select
    const [listes,setListes]=useState([]);
    const radioOptions=[{key:"Oui",value:"true"},
                        {key:"Non",value:"false"}]

    //Spread liste into each select list avec ordre à respecter
    const [rues,syndics,quartiers,usages,types,etats]=listes;
    const [options,setOptions]=useState([])
    const initialValues={
                immeuble:{
                    odimId:"",
                    odimNom:"",
                    odimCadsct:"",
                    odimCadp1:"",
                    odimCadp2:"",
                    odimCadp3:"",
                    odimCadp4:"",
                    odimIlsct:"",
                    odimIlilot:"",
                    odimIlbat:"",
                    odimDatecrea:"",
                    odimNum:"",
                    odimRue:"",
                    odimType:"",
                    odimGroupe:"",
                    odimAlignement:"",
                    odimPosition:"",
                    odimCanton:"",
                    odimQuartier:"",
                    odimEtgen:"",
                    odimSyndic:"",
                    odimDesc:"",
                    odimNbap:"",
                    odimNiv:"",
                    odimHaut:"",
                    odimSurfacesol:"",
                    odimSurfacetot:"",
                    odimNcaves:"",
                    odimParking:"",
                    odimAscenseur:"",
                    odimGrenier:"false",
                    odimLocpoub:"false",
                    odimChauffage:"false",
                    odimGaz:"false",
                    odimEau:"false",
                    odimPartscomscom:"",
                    odimPelouse:"false",
                    odimTerjeux:"false",
                    odimEnventr:"false",
                    odimEnvcomment:""
                },
                sanitaire:{
                    odetId:"",
                    odetPlomb:"",
                    odetAmiante:"",
                    odetTermite:"false",
                    odetMoisissure:"false",
                    odetSalpetre:"false",
                    odetHumidite:"false",
                    odetCommentaire:"",
                },
                nblot:"",
                nbprocedure:""
    };
    const validationSchema = yup.object({
        immeuble:yup.object({
            odimCadsct:yup.string().required("Obligatoire").max(2,"2 car. maxi"),
            odimCadp1:yup.string().required("Obligatoire").max(4,"4 car. maxi"),
            odimCadp2:yup.string().max(4,"4 car. maxi"),
            odimCadp3:yup.string().max(4,"4 car. maxi"),
            odimCadp4:yup.string().max(4,"4 car. maxi"),
            odimIlsct:yup.string().max(2,"2 car. maxi"),
            odimIlilot:yup.string().max(3,"3 car. maxi"),
            odimIlbat:yup.string().max(2,"2 car. maxi"),
            odimNum:yup.string().required("Obligatoire"),
            odimRue:yup.string().required("Obligatoire"),
        }),
    });
    const [formValues,setFormValues]=useState(initialValues)
    useEffect(() => {
        //Initialiser les liste de select pour rues et syndics
        const getListe = async () => {
            try {
                const [r1,r2,r3,r4,r5,r6]= await api.requestManySql(Requetes.listeRues, 
                                                        Requetes.listeSyndics,
                                                        Requetes.listeQuartiers,
                                                        Requetes.listeUsages,
                                                        Requetes.listeTypeProprietes,
                                                        Requetes.listeEtatGenerals)
                setListes([r1.data,r2.data,r3.data,r4.data,r5.data,r6.data])
                setOptions(r1.data)
            }
            catch (error) {
                alert(error)
            }
        };
        getListe();
         //Cas où l'immeuble est sélectionné
         //Noter il faut convertir en Objet Date la date reçu au format string 
         //sinon la date sera affectée "01/01/1970" par défaut au lieu de espace si la date est nulle
         if (state){
            const getData= async () => {
                try {
                    const r1= await api.requestSql(Requetes.immeublesById(state.id))
                    console.log("immeuble dans editImmeuble",r1.data[0])
                    const {immeuble,sanitaire,nblot,nbprocedure}=r1.data[0];
                    setFormValues(prev => ({...prev,sanitaire:{...sanitaire},immeuble:{...immeuble,odimDatecrea:stringToDate(immeuble.odimDatecrea)},nblot,nbprocedure}))
                }
                catch (error) {
                    alert(error)
                }
            }
            getData()
        }
        else 
            setFormValues(initialValues) //Effacer les données affichées

        return ()=>{}

    }, [state]);

    const onSubmit= async (values,helpers) => {
        try{
           console.log("values",values)
           console.log("rueId",values.immeuble.odimRue)
           const result=await api.post("/saveImmeuble",values)
           console.log("retour",result.data)
           //navigate vers detail immeuble 
           navigate("/immeubles/detail",{state:{id:result.data.odimId}})
        }
        catch(error){
           alert(error) 
        }
        helpers.setSubmitting=false
    };

     //Mettre en majuscule les caractères saisis
     const changeToUpperCase=(e,setFieldValue)=>{
        setFieldValue(e.target.name,e.target.value.toUpperCase())
    }

    //console.log("formik.values",initialValues)

    return <Formik enableReinitialize
                   initialValues={formValues}
                   validationSchema={validationSchema}
                   onSubmit={ onSubmit } >
            {
            ({values,isSubmitting,isValid,setFieldValue}) => (
            <div>               
                <div className="bold mb-1">
                    <span><img src={images.logoImmeuble} alt="logoImmeuble"/></span>
                    { state ?
                        <>
                        {` Immeuble ${values.immeuble.odimCadsct}-${values.immeuble.odimCadp1} / `}                    
                        <Link to="/immeubles/detail" state={{id:state.id}}>Global</Link> {"/ "}
                        <Link to="/syndics/edit" state={{id:values.immeuble.odimSyndic}}>Syndic</Link> {"/ "}
                        <Link to="/lots" state={{id:state.id,
                                                of:"immeuble",
                                                sujet:`${values.immeuble.odimCadsct}-${values.immeuble.odimCadp1}`}}>Lots {values.nblot}</Link> {"/ "}
                        <Link to="/lots/edit" state={{immId:state.id}}>Ajouter un lot</Link> {"/ "}
                        <Link to="/procedures" state={{id:state.id,
                                                       cadastre:`${values.immeuble.odimCadsct}-${values.immeuble.odimCadp1}`}}>Procédures {values.nbprocedure}</Link> {"/ "}
                        <Link to="/procedures/edit" state={{immId:state.id}}>Ajouter une procédure</Link>
                        </>
                    :
                        <span>{` Immeuble / Création`}</span>
                    }
                </div>               
                <div className="card editImmeuble text-center">
                    <div className="card-header">
                        <h5 className="header">{ state ? `Modification immeuble`: "Creation immeuble"}</h5>
                    </div>
                    <div className="card-body">
                        <Form >
{/*==========Donnée générales ================*/}      
                            <h6 className="cursor"  data-toggle="collapse" data-target="#donneeGenerale" aria-expanded="true" aria-controls="collapseOne">
                                <button type="button" className="btn btn-block bg-warning-light">Données générales</button>    
                            </h6>             
                            <div id="donneeGenerale" className="collapse show">
                                <div className="row form-group">
                                    <FormControl control="input" className="col-1" label="ID" name="immeuble.odimId" readOnly /> 
                                    <FormControl control="input" className="col-3" label="Nom immeuble" name="immeuble.odimNom" size="60"/>                             
                                    <FormControl control="input" className="col-1" label="Section*" name="immeuble.odimCadsct" size="2" 
                                                                                            onChange={(e)=>changeToUpperCase(e,setFieldValue)} />
                                    <FormControl control="input" className="col-1" label="Parcelle1*" name="immeuble.odimCadp1" size="4"/>
                                    <FormControl control="input" className="col-1" label="Parcelle2" name="immeuble.odimCadp2" size="4"/>
                                    <FormControl control="input" className="col-1" label="Parcelle3" name="immeuble.odimCadp3" size="4"/>
                                    <FormControl control="input" className="col-1" label="Parcelle4" name="immeuble.odimCadp4" size="4"/>
                                    <FormControl control="input" className="col-1" label="Section Ilot" name="immeuble.odimIlsct" size="2" 
                                                                                            onChange={(e)=>changeToUpperCase(e,setFieldValue)} />
                                    <FormControl control="input" className="col-1" label="Ilot" name="immeuble.odimIlilot" size="3"/>
                                    <FormControl control="input" className="col-1" label="Bâti" name="immeuble.odimIlbat" size="2"/>
                                </div>
                                <div className="row form-group">
                                    <FormControl control="date" className="col" label="Date construction" name="immeuble.odimDatecrea" placeholder="dd/mm/yyyy"/>
                                    <FormControl control="input" className="col" label="Canton" name="immeuble.odimCanton" />
                                    <FormControl control="select" className="col-2" label="Quartier" name="immeuble.odimQuartier">
                                        <option value=""></option>
                                        {
                                            quartiers?.map((quartier,index)=><option key={index} value={quartier.odntId}>{quartier.odntNom}</option>)                                        
                                        }
                                    </FormControl>
                                    <FormControl control="input" className="col" label="No rue*" name="immeuble.odimNum" />
                                   {/* =============AutoSelect =============*/}
                                    <FormControl control="autoSelect" className="col-3" label="Rue*" name="immeuble.odimRue" 
                                        options={options} 
                                        renderOption={(props, option) => (
                                            <li {...props} key={option.id}> {option.nomrue}</li>)}
                                        getOptionLabel={(option) => option.nomrue || ""}                                     
                                        onChange={(e,item)=>{setFieldValue("immeuble.odimRue",item?item.id:"")}}
                                        isOptionEqualToValue={(option,value)=>option.id===value.id}
                                        value={options.find(option=>option.id==values.immeuble.odimRue) || null}
                                    />                                
                                    {/*
                                    <FormControl control="select" className="col-3" label="Rue*" name="immeuble.odimRue">
                                        <option value="">Veuillez sélectionner une rue</option>   
                                        {
                                            rues?.map((rue,index)=><option key={index} value={rue.id}>{rue.nomrue}</option>)                                        
                                        }
                                    </FormControl>
                                    */}
                                    <FormControl control="select" className="col-3" label="Syndic" name="immeuble.odimSyndic">
                                        <option value=""></option>   
                                        {
                                            syndics?.map((syndic,index)=><option key={index} value={syndic.id}>{syndic.code} - {syndic.nom}</option>)                                        
                                        }
                                    </FormControl>
                                </div>
                                <div className="row form-group">
                                    <FormControl control="select" className="col" label="Type propriété" name="immeuble.odimType" >
                                        <option value=""></option>
                                        {
                                            types?.map((type,index)=><option key={index} value={type.odntId}>{type.odntNom}</option>)                                        
                                        }
                                    </FormControl>
                                    <FormControl control="select" className="col" label="Usage" name="immeuble.odimGroupe" > 
                                        <option value=""></option>
                                        {
                                            usages?.map((usage,index)=><option key={index} value={usage.odntId}>{usage.odntNom}</option>)                                        
                                        }
                                    </FormControl>                            
                                    <FormControl control="input" className="col-1" label="Alignement" name="immeuble.odimAlignement" />
                                    <FormControl control="input" className="col-1" label="Orientation" name="immeuble.odimPosition" />
                                    <FormControl control="select" className="col" label="Etat général" name="immeuble.odimEtgen" >
                                        <option value=""></option>
                                        {
                                            etats?.map((etat,index)=><option key={index} value={etat.odntId}>{etat.odntNom}</option>)                                        
                                        }
                                    </FormControl> 
                                    <FormControl control="input" className="col-1" label="Nbre étages" name="immeuble.odimNiv" />
                                    <FormControl control="input" className="col-1" label="Nbre apparts" name="immeuble.odimNbap" />
                                    <FormControl control="input" className="col-1" label="Hauteur(m)" name="immeuble.odimHaut" />
                                    <FormControl control="input" className="col-1" label="Surf.sol(m2)" name="immeuble.odimSurfacesol" />
                                    <FormControl control="input" className="col-1" label="Surf.totale(m2)" name="immeuble.odimSurfacetot" />
                                </div>
                                <div className="row form-group">
                                    <FormControl control="textarea" className="col" label="Description" name="immeuble.odimDesc" />
                                </div>
                            </div> 
{/*========== Parties communnes ================*/}         
                            <h6 className="cursor"  data-toggle="collapse" data-target="#partieCommune" aria-expanded="true" aria-controls="collapseOne">
                                <button type="button" className="btn btn-block bg-warning-light">Parties communnes</button>    
                            </h6>   
                            <div id="partieCommune" className="collapse">
                                <div className="row form-group">
                                    <FormControl control="input" className="col-1" label="Nbre caves" name="immeuble.odimNcaves" />
                                    <FormControl control="input" className="col-1" label="Nbre parkings" name="immeuble.odimParking" />
                                    <FormControl control="input" className="col" label="Nbre ascenceurs" name="immeuble.odimAscenseur" />
                                    <FormControl control="radio" className="col" label="Grenier" name="immeuble.odimGrenier" options={radioOptions}/>
                                    <FormControl control="radio" className="col" label="Local poubelles" name="immeuble.odimLocpoub" options={radioOptions} />
                                    <FormControl control="radio" className="col" label="Chauffage" name="immeuble.odimChauffage" options={radioOptions}/>
                                    <FormControl control="radio" className="col" label="Gaz" name="immeuble.odimGaz" options={radioOptions} />
                                    <FormControl control="radio" className="col" label="Eau" name="immeuble.odimEau" options={radioOptions} />
                                </div>
                                <div className="row form-group">
                                    <FormControl control="textarea" className="col" label="Commentaire" name="immeuble.odimPartscomscom" />
                                </div>
                            </div>    
{/*========== Environnements ================*/}
                            <h6 className="cursor" data-toggle="collapse" data-target="#environnement" aria-expanded="false" aria-controls="collapseOne">
                                <button type="button" className="btn btn-block bg-warning-light">Environnements</button>   
                            </h6>
                            <div id="environnement" className="collapse">
                                <div className="row form-group">
                                    <FormControl control="radio" className="col-2" label="Terrain de jeux" name="immeuble.odimTerjeux" options={radioOptions}/>
                                    <FormControl control="radio" className="col-2" label="Pelouse" name="immeuble.odimPelouse" options={radioOptions} />
                                    <FormControl control="radio" className="col-3" label="Environnement entretenu" name="immeuble.odimEnventr" options={radioOptions}/>
                                </div>
                                <div className="row form-group">
                                    <FormControl control="textarea" className="col" label="Commentaire" name="immeuble.odimEnvcomment" />
                                </div>
                            </div>
{/*========== Sanitaire / parasitaire================*/}                                                
                                <h6 className="cursor" data-toggle="collapse" data-target="#saniataire" aria-expanded="false" aria-controls="collapseOne">
                                    <button type="button" className="btn btn-block bg-warning-light">
                                        Sanitaire / parasitaire
                                        { values.sanitaire.odetId && values.sanitaire?.odetTermite === "true" &&                                            
                                                <button className="btn btn-success btn-sm bold pull-right text-white"
                                                    onClick={()=>{navigate("/immeubles/declarations",
                                                                            {state:{id:values.sanitaire?.odetId,
                                                                                    cadastre:`${values.immeuble.odimCadsct}-${values.immeuble.odimCadp1}`}})}}>
                                                    Déclaration termites
                                                </button>                                         
                                        }   
                                    </button>
                                </h6>
                                
                            
                            <div id="saniataire" className="collapse"> 
                                <div className="row form-group">
                                    <FormControl control="input" className="col" label="Plomb(mg)" name="sanitaire.odetPlomb" />
                                    <FormControl control="input" className="col" label="Amiante(mg)" name="sanitaire.odetAmiante" />
                                    <FormControl control="radio" className="col" label="Moisissure" name="sanitaire.odetMoisissure" options={radioOptions}/>
                                    <FormControl control="radio" className="col" label="Salpêtre" name="sanitaire.odetSalpetre" options={radioOptions} />
                                    <FormControl control="radio" className="col" label="Humidité" name="sanitaire.odetHumidite" options={radioOptions}/>
                                    <FormControl control="radio" className="col" label="Termite" name="sanitaire.odetTermite" options={radioOptions}/>
                                </div>
                                <div className="row form-group">
                                    <FormControl control="textarea" className="col" label="Commentaire" name="sanitaire.odetCommentaire" />
                                </div>                                         
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
            </div>)}       
        </Formik>
}

export default EditImmeuble;
