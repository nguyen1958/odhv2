import React, { useEffect, useState, useRef } from 'react';
import { useLocation, Link } from 'react-router-dom';
import { Formik, Form } from 'formik';
import * as yup from 'yup'
import Requetes from '../../commons/Requetes'
import api from '../../commons/api'
import FormControl from '../../formik/FormControl';
import images from '../../constantes/images';

const EditLot = () => {
    const {state}=useLocation()
    //get reference to formik component
    const formikRef = useRef();
    //initialiser les liste des select
    const [listes,setListes]=useState([]);
    //Spread liste into each select list avec ordre à respecter
    const [activites,typesLot,info]=listes;
    const radioOptions=[{key:"Oui",value:"true"},{key:"Non",value:"false"}]
    const initialValues={
        lot:{
	        odlotId:"",
            odlotType:"",
            odlotActiv:"",
            odlotCodebat:"",
            odlotCodeesc:"",
            odlotCodeniv:"",
            odlotCodeimm:"",
            odlotSitu:"",//surperficie
            odlotImmeuble:"",
            odlotAvgarage:"false",
            odlotAvcave:"false",
            odlotCom:"",
            odlotInfo1:"",
            odlotInfo2:"",
            odlotInfo3:"",
        },
        sanitaire:{
            odetLot:"",
            odetTermite:"false",
            odetMoisissure:"false",
            odetSalpetre:"false",
            odetHumidite:"false",
            odetCommentaire:"",
            odetPlomb:"",
            odetAmiante:""
        },
        cadastre:"",//A titre info pour afficher dans le formulaire

    }

    const validationSchema = yup.object({
        lot:yup.object({
            odlotCodebat:yup.string().required("Obligatoire").max(2,"2 car. maxi"),
            odlotCodeimm:yup.number().typeError("Numérique").required("Obligatoire").max(5,"5 car. maxi"),
            odlotCodeesc:yup.string().max(2,"2 car. maxi"),
            odlotCodeniv:yup.number().typeError("Numérique").nullable().max(2,"2 car. maxi"),
            odlotType:yup.string().required("Obligatoire"),
            odlotActiv:yup.string().required("Obligatoire")           
        }),
    });

    useEffect(() => {
        const getData = async () => {
            //Cas où le lot est sélectionné
            //Noter il faut convertir en Objet Date la date reçu au format string 
            //sinon la date sera affectée "01/01/1970" par défaut au lieu de espace si la date est nulle
            if (state?.id){              
                try {
                    const result= await api.requestSql(Requetes.lotById(state.id))
                    console.log("lot dans EditLot",result.data[0])
                    const {lot,sanitaire} =result.data[0];                   
                    formikRef.current.setValues(prev => ({...prev,lot:{...lot},sanitaire:{...sanitaire}}));
                }
                catch (error) {
                    alert(error)
                }                
            }
            else formikRef.current.resetForm();
            
            try {
                const [r1,r2,r3]= await api.requestManySql(Requetes.listeActivites,
                                                            Requetes.listeTypeLot, 
                                                            Requetes.infoImmeuble(state.immId))
                setListes([r1.data,r2.data,r3.data[0]])
                console.log("info",r3.data[0])
                formikRef.current.setFieldValue("lot.odlotImmeuble",state.immId)
                formikRef.current.setFieldValue("cadastre",r3.data[0].cadastre)
                console.log(state.immId,formikRef.current.values)
            }
            catch (error) {
                alert(error)
            }
            
        }
        getData();       
        console.log("state",state)
        return ()=>{}

    }, []);

    const onSubmit= async (values) => {
        try{  
            console.log("values updated",values)
            const result=await api.post("/saveLot",values)
            formikRef.current.setValues((prev)=>({...prev,lot:result.data}));
            alert("Enregistrement effectué et actualisé ...")
            console.log("retour resultat",result)
        }
        catch(error){
           alert(error) 
        }
    };

    return (
        <div>
            <div className="bold mb-1">
                <span><img src={images.procedure}alt="logoProcedure"/></span>{` Immeuble `}
                <Link to="/immeubles/edit" state={{id:info?.id}}>{info?.cadastre}</Link> {"/ "}
                <Link to="/immeubles/detail" state={{id:info?.id}}>Global</Link> {"/ "}
                {
                    state?.id ?(<><span>Modification lot</span> {"/ "} 
                                <Link to="/lots/historique" state={{id:state?.id,immId:info?.id}}>Historique</Link> {"/ "}                              
                                <Link to="/lots/edit" state={{immId:info?.id}}>Ajouter un lot</Link>
                            </>)
                            : <span>Ajouter un lot</span>
                }                           
            </div>    
            <Formik innerRef={formikRef}
                   initialValues={initialValues}
                   validationSchema={validationSchema}
                   onSubmit={ onSubmit } >
            {
            ({isSubmitting,isValid}) => (
                <div className="card editLot text-center">
                    <div className="card-header">
                        <h5 className="header">{ state?.id ? "Modification lot": "Creation lot"}</h5>
                    </div>
                    <div className="card-body">
                        <Form >                                
                            <h6>Données générales</h6>                                             
                            <div className="row form-group">
                                <FormControl control="input" className="col" label="ID" name="lot.odlotId" readOnly />                               
                                <FormControl control="input" className="col" label="Batiment*" name="lot.odlotCodebat" /> 
                                <FormControl control="input" className="col" label="Escalier" name="lot.odlotCodeesc" />
                                <FormControl control="input" className="col" label="Niveau" name="lot.odlotCodeniv" />
                                <FormControl control="input" className="col" label="Num. lot*" name="lot.odlotCodeimm" />                                                                                         
                                <FormControl control="select" className="col-2" label="Type de propriété*" name="lot.odlotType" >
                                    <option value=""></option>
                                    {
                                        typesLot?.map((item,index)=><option key={index} value={item.odntId}>{item.odntNom}</option>)
                                    }                                       
                                </FormControl>                                                              
                                <FormControl control="select" className="col-2" label="Activité*" name="lot.odlotActiv" >
                                    <option value=""></option>
                                    {
                                        activites?.map((item,index)=><option key={index} value={item.odntId}>{item.odntNom}</option>)                                       
                                    }
                                </FormControl>
                                <FormControl control="input" className="col-2" label="Immeuble" name="cadastre" disabled />
                                <FormControl control="input" className="col-2" label="Superficie" name="lot.odlotSitu" />
                            </div>                                               
                            <div className="row form-group">
                                <div className="col-3">
                                    <div className="row form-group">
                                        <FormControl control="radio" className="col" label="Garage" name="lot.odlotAvgarage" options={radioOptions}/>
                                        <FormControl control="radio" className="col" label="Cave" name="lot.odlotAvcave" options={radioOptions}/>
                                    </div>                                  
                                </div>          
                                <FormControl control="input" className="col-3" label="Information1" name="lot.odlotInfo1" />
                                <FormControl control="input" className="col-3" label="Information2" name="lot.odlotInfo2" />
                                <FormControl control="input" className="col-3" label="Information3" name="lot.odlotInfo3" />
                            </div> 
                            <div className="row form-group">
                                <FormControl control="textarea" className="col" label="Commentaire" name="lot.odlotCom" />
                            </div>
                            <h6>Etat parasitaire</h6>
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
            )}
        </Formik> 
        </div>
    );
}

export default EditLot;
