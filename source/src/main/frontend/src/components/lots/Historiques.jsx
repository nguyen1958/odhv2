import React, { useEffect, useState, useRef } from 'react';
import { useLocation, Link } from 'react-router-dom';
import Requetes from '../../commons/Requetes'
import api from '../../commons/api'
import images from '../../constantes/images';
import HistoriqueProp from './HistoriqueProp';
import HistoriqueLoc from './HistoriqueLoc';

const Historiques = () => {
    const {state}=useLocation()
    const [listes,setListes]=useState([]);
    //Spread liste into each select list avec ordre à respecter
    const [info,lot]=listes;
    useEffect(() => {
        const getData = async () => {
            try {
                const [r1,r2,r3]= await api.requestManySql(Requetes.infoImmeuble(state.immId),
                                                            Requetes.infoLot(state.id))
                setListes([r1.data[0],r2.data[0]])
                console.log("info",r1.data[0],r2.data[0])
                console.log("state in historiques",state)
            }
            catch (error) {
                alert(error)
            }
            
        }
        getData();       
        console.log("state",state)
        return ()=>{}

    }, []);

    return (
        <div>
            <div className="bold mb-1">
                <span><img src={images.logoImmeuble} alt="logoImmeuble"/></span>{` Immeuble `}
                <Link to="/immeubles/edit" state={{id:info?.id}}>{info?.cadastre}</Link> {"/ "} 
                <Link to="/immeubles/detail" state={{id:info?.id}}>Global</Link> {"/ "}
                <Link to="/lots" state={{id:info?.id,
                                        of:"immeuble",
                                        sujet:`${info?.cadastre}`}}>Lots {info?.nblot}</Link> {"/ "}                                              
                <Link to="/lots/edit" state={{immId:info?.id}}>Ajouter un lot</Link>                 
            </div> 
            <div className="bold">LOT <span className="text-danger">{`${lot?.bat}-${lot?.imm}`}</span> {"/ Historique"}</div>   
            <div className="bold">Immeuble <span className="text-danger">{info?.cadastre}</span></div> 
            <div className="bold">Quartier <span className="text-danger">{info?.quartier}</span></div>
            <div className="bold">Adresse <span className="text-danger">{info?.adresse}</span></div>
            <div className="bold">CP / Ville <span className="text-danger">{info?.cp} {info?.ville}</span></div>
            <div className="bold">
                Lot Bat. <span className="text-danger">{lot?.bat}</span>{" "}
                Esc. <span className="text-danger">{lot?.esc}</span>{" "}
                Niv. <span className="text-danger">{lot?.niv}</span>{" "}
                Imm. <span className="text-danger">{lot?.imm}</span>
            </div>
            <HistoriqueProp lotId={state.id} />
            <HistoriqueLoc lotId={state.id} />
        </div>
    );
}

export default Historiques;
