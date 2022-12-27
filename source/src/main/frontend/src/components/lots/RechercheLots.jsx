import React, { useEffect, useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import api from '../../commons/api';
import Requetes from '../../commons/Requetes';
import images from '../../constantes/images';
import ListeLots from './ListeLots';

const RechercheLots = () => {
    const {state}=useLocation()
    const navigate = useNavigate()
    const [lots, setLots] = useState(null);
    const [info, setInfo] = useState(null);
    console.log("state of recherche lots",state)

    useEffect(() => {
        const getData = async () => {
            const sql=state.of==="proprietaire"?Requetes.lotsOfProprietaire(state.id):
                      state.of==="locataire"?Requetes.lotsOfLocataire(state.id):
                      Requetes.lotsOfImmeuble(state.id)
            try {
                const [r1,r2]= await api.requestManySql(Requetes.infoImmeuble(state.id),sql)
                setInfo(r1.data[0])
                setLots(r2.data)
                console.log("lots",r1.data,r2.data)
            }
            catch (error) {
                alert(error)
            }
        }
        getData()
        return () => {};
    }, []);

    //Ce composant est invoqué depuis le contexte immeuble, proprietaire ou locataire
    //le titre doit correspondre au contexte 
    const titre=state?.of==="immeuble"?`Lots de l'immeuble`:
                state?.of==="proprietaire"?`Lots du propriétaire`:               
                state?.of==="locataire"?`Lots du locataire`:`Recherche lots`; 
    return (
        <div>
            <div className="bold mb-1">
                <span><img src={images.logoImmeuble} alt="logoImmeuble"/></span>{`Immeuble `}
                {
                    state?.of==="immeuble" ? 
                        <>
                            <Link to="/immeubles/edit" state={{id:info?.id}}>{info?.cadastre}</Link> {"/ "}                                
                            <Link to="/immeubles/detail" state={{id:info?.id}}>Global</Link> {"/ "}               
                            <span>Lots {info?.nblot}</span> {"/ "}
                            <Link to="/lots/edit" state={{immId:info?.id}}>Ajouter un lot</Link>
                        </> : null
                }
                
            </div>   
            <div className="card">
                <div className="card-header">
                    <h5 className="text-uppercase bold">{titre}</h5>
                    {/*
                    <h5 className="text-uppercase bold">{titre}  {" "}
                        <span className="text-danger">{state?.sujet}</span> {" "}
                    </h5>
                    */}
                </div>
                { lots && lots.length===0 && <div className="dataNotFound">Aucun lot trouvé</div>}              
                { lots && lots.length >0 && <ListeLots data={lots}/>}
            </div>
        </div>
        
    );
}

export default RechercheLots;
