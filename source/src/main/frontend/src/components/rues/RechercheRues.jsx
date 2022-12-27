import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../../commons/api';
import Requetes from '../../commons/Requetes';
import ListeRues from './ListeRues';


const RechercheRues = () => {
    const navigate = useNavigate()
    const [rues, setrues] = useState([]);

    const getData = async () => {
        try {
            const result= await api.requestSql(Requetes.rues)
            setrues(result.data)
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
                <h5 className="header">Rues
                    <button type="button" className="btn btn-success pull-right" 
                        onClick={()=>{navigate("/rues/edit")}}>
                        <i className="fa fa-plus mr-2"></i>Ajouter une rue
                    </button>
                </h5>            
            </div>
            { rues && rues.length >0 && <ListeRues data={rues} getData={getData} />}
        </div>
    );
}

export default RechercheRues;
