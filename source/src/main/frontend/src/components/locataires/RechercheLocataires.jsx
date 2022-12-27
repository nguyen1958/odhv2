import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../../commons/api';
import Requetes from '../../commons/Requetes';
import ListeLocataires from './ListeLocataires';


const Recherchelocataires = () => {
    const navigate = useNavigate()
    const [locataires, setLocataires] = useState(null);
    const getData = async () => {
        try {
            const result= await api.requestSql(Requetes.locataires)
            setLocataires(result.data)
        }
        catch (error) {
            alert(error)
        }
    }

    useEffect(() => {
        getData()
        return () => {};
    }, []);

    return (
        <div>
            <div className="alert alert-secondary text-center" role="alert">
                <h5 className="header">
                    Locataires
                    <button className="btn btn-success pull-right"
                        onClick={()=>{navigate("/locataires/edit")}}>
                        <i className="fa fa-plus mr-2"></i>Ajouter un locataire
                    </button>
                </h5>
               
            </div>
            { locataires && locataires.length==0 && <div style={{border:'1px solid',padding:'2px 0'}}>Aucune donnée trouvée</div>}              
            { locataires && locataires.length >0 && <ListeLocataires data={locataires} getData={getData}/>}
        </div>
    );
}

export default Recherchelocataires;
