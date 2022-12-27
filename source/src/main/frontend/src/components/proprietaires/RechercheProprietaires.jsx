import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../../commons/api';
import Requetes from '../../commons/Requetes';
import ListeProprietaires from './ListeProprietaires';


const RechercheProrietaires = () => {
    const navigate = useNavigate()
    const [proprietaires, setProprietaires] = useState(null);
    const getData = async () => {
        try {
            const result= await api.requestSql(Requetes.proprietaires)
            setProprietaires(result.data)
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
                    Proprietaires
                    <button className="btn btn-success pull-right"
                        onClick={()=>{navigate("/proprietaires/edit")}}>
                        <i className="fa fa-plus mr-2"></i>Ajouter un propriétaire
                    </button>
                </h5>
            </div>
            { proprietaires && proprietaires.length===0 && <div style={{border:'1px solid',padding:'2px 0'}}>Aucune donnée trouvée</div>}              
            { proprietaires && proprietaires.length >0 && <ListeProprietaires data={proprietaires} getData={getData}/>}
        </div>
    );
}

export default RechercheProrietaires;
