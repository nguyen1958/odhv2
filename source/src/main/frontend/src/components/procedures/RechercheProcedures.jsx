import React, { useEffect, useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import api from '../../commons/api';
import Requetes from '../../commons/Requetes';
import images from '../../constantes/images';
import ListeProcedures from './ListeProcedures';

const RechercheProcedures = () => {
    const {state}=useLocation()
    const navigate = useNavigate()
    const [procedures, setprocedures] = useState(null);
    const [info, setInfo] = useState(null);
    useEffect(() => {
        const getData = async () => {
            try {
                const [r1,r2]= await api.requestManySql(Requetes.infoImmeuble(state.id),
                                                        Requetes.proceduresOfImmeuble(state.id))
                setInfo(r1.data[0])
                setprocedures(r2.data)
                console.log("ds rechercheprocedure",state,r1.data,r2.data)
            }
            catch (error) {
                alert(error)
            }
        }
        getData()
        return () => {};
    }, []);

    return (
        <div>
            <div className="bold mb-1">
                <span><img src={images.logoImmeuble} alt="immeuble" /></span>{`Immeuble `}
                <Link to="/immeubles/edit" state={{id:info?.id}}>{info?.cadastre}</Link> {"/ "}                                
                <Link to="/immeubles/detail" state={{id:info?.id}}>Global</Link> {"/ "}               
                <span>procédures {info?.nbprocedure}</span> {"/ "}
                <Link to="/procedures/edit" state={{immId:info?.id}}>Ajouter une procédure</Link>
            </div>           
            <div className="card">
                <div className="card-header">
                    <h5 className="text-uppercase bold">Procedures de l'immeuble  {" "}
                        <span className="text-danger">{state?.cadastre}</span> {" "} 
                    </h5>
                </div>
                { procedures && procedures.length==0 && <div style={{border:'1px solid',padding:'2px 0'}}>Aucune procédure pour cet immeuble</div>}              
                { procedures && procedures.length >0 && <ListeProcedures data={procedures}/>}
            </div>
        </div>
    );
}

export default RechercheProcedures;
